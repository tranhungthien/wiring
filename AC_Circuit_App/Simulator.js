function simulate() {
  //==================================================
  //   TODO: MUST CLEAR Node names from
  //         U & V ends after simulation
  //==================================================

  // 1. ensure wiring
  const wireCount = countWires(components);
  if (wireCount == 0) return;

  // 2. reset by removing node assignments from other simulation
  for (const c of components) c.reset(); // clear any previous nodes.

  // 3. assign nodes
  findAllNodes(components);

  // 3.1. look for shorts
  const shorts = detectSC(components);
  if (shorts.length > 0) {
    msg.set("There are short circuits");
    return;
  }

  // 4. find sources with identical nodes and escape
  parallelSources = detectParallelSources(components);
  if (parallelSources.hasParallel) {
    msg.set("Parallel sources are not currently supported");
    return;
  }

  // 5. only need to work with components no wires
  const nonWireComponents = stripWires(components);

  // 6. sort out open circuits
  const [undefinedEnds, definedEnds] = splitByEmptyEndId(nonWireComponents);

  // 6.1 if no connected components escape
  if (definedEnds.length == 0) {
    for (const c of nonWireComponents) c.simulate();
    return;
  }

  // 7. remove unused transformers from simulation
  console.log(definedEnds);
  removeUnusedTransformers(definedEnds);

  // 8. build matrix
  const out = buildMatrix(definedEnds);
  prettyPrintMatrix(out.A, out.rowLabels, out.colLabels, "A");

  // 9. get inverse matrix
  const { A_num, A_inv } = convertInvertAndPrint(out);

  // 9.1. on error report & return
  if (!A_inv) return;

  // 10. get vector B
  const b = buildRHSVector(out.rowLabels, nonWireComponents, true);

  // 11. get solution vector
  const x = math.multiply(A_inv, b);

  // 12. map output vector to nodes
  const nodes = vectorToNodeMap(out.colLabels, x, math);

  // 13. assign node values to components and compute parameters.
  assignNodeValues(nodes, nonWireComponents);
  for (const c of nonWireComponents) {
    if (c.id == "GND") continue;
    else c.simulate();
  }

  // 14. assign current to voltage sources
  for (const c of definedEnds)
    if (c instanceof VoltageAC) assignCurrenttoSource(nodes, c);

  // 14.1. assign current and voltages to transformers
  for (const c of definedEnds) {
    if (c instanceof Transformer) assignTransformerParameters(nodes, c);
  }

  // 15. logic for open circuits
  if (undefinedEnds.length != 0) terminateEmptyEnds(undefinedEnds);

  //=======================================================
  //                   troubleshooting
  //=======================================================
  // Uncomment below for precision
  // console.log("b (Nx1):\n", b.map((r) => r[0]).join("\n"));
  // console.log("x (Nx1):\n", x.map((r) => r[0]).join("\n"));

  // Uncomment below for diagnostic 3dp
  console.log("b (Nx1):\n", b.map((r) => round3(r[0])).join("\n"));
  console.log("x (Nx1):\n", x.map((r) => round3(r[0])).join("\n"));
  console.log(
    "Non-wire components:",
    nonWireComponents.map((c) => c.id)
  );
  console.log("components: ", components);
}

function removeUnusedTransformers(components) {
  const isEmpty = (id) => id == null || id === "";

  for (let i = components.length - 1; i >= 0; i--) {
    const c = components[i];
    if (!(c instanceof Transformer)) continue;
    const pUnused = isEmpty(c?.p?.u?.id) && isEmpty(c?.p?.v?.id);
    const sUnused = isEmpty(c?.s?.u?.id) && isEmpty(c?.s?.v?.id);
    if (pUnused || sUnused) components.splice(i, 1);
  }
}

function detectParallelSources(components) {
  const id = (t) => t?.id ?? "";
  const key = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
  const groups = new Map();

  for (const c of components) {
    if (!(c instanceof VoltageAC)) continue;
    const a = id(c.u),
      b = id(c.v);
    if (!a || !b) continue; // skip floating / not wired
    const k = key(a, b);
    (groups.get(k) ?? groups.set(k, []).get(k)).push(c);
  }

  const parallels = [...groups.values()].filter((g) => g.length > 1);
  return { hasParallel: parallels.length > 0, parallels };
}

function terminateEmptyEnds(components) {
  for (const c of components) {
    if (c.id == "GND") continue;
    const u = c.u.id;
    const v = c.v.id;
    if (u == "" && v == "") {
      c.u.voltage = math.complex(0, 0);
      c.v.voltage = math.complex(0, 0);
      c.simulate();
      continue;
    }
    if (v == "") c.v.voltage = c.u.voltage;
    if (u == "") c.u.voltage = c.v.voltage;

    c.simulate();
    console.log("inside terminate: ", c);
  }
}

function splitByEmptyEndId(components) {
  const definedEnd = [];
  const undefinedEnd = [];

  for (const c of components) {
    const uId = c?.u?.id ?? null;
    const vId = c?.v?.id ?? null;
    const blank = uId === "" || vId === "";
    (blank ? undefinedEnd : definedEnd).push(c);
  }
  return [undefinedEnd, definedEnd];
}

function countWires(components) {
  let w = 0;
  for (const c of components) if (c instanceof Wire) w++;
  return w;
}

function printMap(result) {
  for (const [k, v] of result) {
    console.log(k, v);
  }
}

function resetSimulation(components) {
  for (const c of components) c.reset();
}

function vectorToNodeMap(colLabels, x, math) {
  const isMat = math?.isMatrix?.(x);

  return new Map(
    colLabels.map((c, i) => {
      const val = isMat
        ? x.get([i, 0]) // Matrix Nx1
        : Array.isArray(x[i])
        ? x[i][0]
        : x[i]; // Array Nx1 or flat
      return [c, val];
    })
  );
}

function assignNodeValues(node, components) {
  const get = node.get.bind(node);

  for (const c of components) {
    if (c instanceof Transformer) {
      const puid = c.p.u?.id;
      const pvid = c.p.v?.id;
      const suid = c.s.u?.id;
      const svid = c.s.v?.id;
      if (puid && puid !== "GND") c.p.u.voltage = get(puid);
      if (pvid && pvid !== "GND") c.p.v.voltage = get(pvid);
      if (suid && suid !== "GND") c.s.u.voltage = get(suid);
      if (svid && svid !== "GND") c.s.v.voltage = get(svid);
    } else {
      const uid = c.u?.id;
      if (uid && uid !== "GND") c.u.voltage = get(uid);
      const vid = c.v?.id;
      if (vid && vid !== "GND") c.v.voltage = get(vid);
    }
  }

  for (const c of components) {
  }
}

function assignTransformerParameters(node, component) {
  const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const id = component.id;

  const pid = `Ip(${id})`;
  if (node.has(pid)) {
    component.primaryCurrentLabel.value = math.multiply(
      math.complex(1, 0),
      node.get(pid)
    );
  }
  const sid = `Is(${id})`;
  if (node.has(sid)) {
    component.secondaryCurrentLabel.value = math.multiply(
      math.complex(-1, 0),
      node.get(sid)
    );
  }
}

function assignCurrenttoSource(node, component) {
  const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const id = component.id;

  const exact = `I(${id})`;
  if (node.has(exact)) {
    component.currentLabel.value = math.multiply(
      math.complex(-1, 0),
      node.get(exact)
    );
    return;
  }

  if (node.has("I")) {
    component.currentLabel.value = math.multiply(
      math.complex(-1, 0),
      node.get("I")
    );
    return;
  }
}

const toComplex = (z) =>
  math.typeOf?.(z) === "Complex" ? z : math.complex(z, 0);

const toComplexMatrix = (M) =>
  math.matrix(math.isMatrix(M) ? M.toArray() : M).map(toComplex);

const toComplexVector = (v) =>
  math.matrix(math.isMatrix(v) ? v.toArray() : v).map(toComplex);

const round3 = (v) => {
  if (math.typeOf?.(v) === "Complex") {
    const re = math.round(v.re, 3);
    const im = math.round(v.im, 3);
    return math.complex(re, im).toString();
  }
  return math.round(v, 3).toString();
};

// function removeUnusedTransformers() {
//   const unusedTX = [];
//   for (const c of components) {
//     if (c instanceof Transformer) {
//       if (
//         (c.p.u.id == "" && c.p.v.id == "") ||
//         (c.s.u.id == "" && c.s.v.id == "")
//       )
//         unusedTX.push(c);
//     }
//   }

//   for (const t of unusedTX) {
//     const i = components.indexOf(t);
//     if (i !== -1) components.splice(i, 1);
//   }
// }

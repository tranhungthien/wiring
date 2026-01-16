function findAllNodes(components) {
  // Helpers
  const K = ([x, y]) => `${x},${y}`;
  const isWire = (name) => typeof name === "string" && /^w\d+$/i.test(name);

  // 1) Union-Find only on wire endpoints
  const dsu = new DSU();
  const wireCoords = new Set();

  for (const e of components) {
    if (!isWire(e.id)) continue;
    const a = K([e.u.x, e.u.y]);
    const b = K([e.v.x, e.v.y]);
    if (a === b) continue;
    dsu.make(a);
    dsu.make(b);
    dsu.union(a, b);
    wireCoords.add(a);
    wireCoords.add(b);
  }

  // 2) Compact indices for each wire-connected component
  const rootToIdx = new Map();
  let nextIdx = 0;
  for (const coord of wireCoords) {
    const root = dsu.find(coord);
    if (!rootToIdx.has(root)) rootToIdx.set(root, nextIdx++);
  }

  // 3) Mark which node indices are grounded (id includes 'ground' or 'gnd')
  const grounded = new Set();
  for (const e of components) {
    const idLower = String(e.id || "").toLowerCase();
    if (!idLower.includes("gnd") && !idLower.includes("ground")) continue;

    const pts = [];
    // normal 2-terminal
    if (e.u && e.v) {
      pts.push([e.u.x, e.u.y], [e.v.x, e.v.y]);
    }
    // transformer 4-terminal
    if (e instanceof Transformer) {
      if (e.p.u) pts.push([e.p.u.x, e.p.u.y]);
      if (e.p.v) pts.push([e.p.v.x, e.p.v.y]);
      if (e.s.u) pts.push([e.s.u.x, e.s.u.y]);
      if (e.s.v) pts.push([e.s.v.x, e.s.v.y]);
    }

    for (const p of pts) {
      const kp = K(p);
      if (dsu.has(kp)) grounded.add(rootToIdx.get(dsu.find(kp)));
    }
  }

  // 4) coord -> node key ("GND" or "0","1",...)
  const coordToNodeKey = (coordArr) => {
    const k = K(coordArr);
    if (!dsu.has(k)) return null; // not on the wire network
    const idx = rootToIdx.get(dsu.find(k));
    return grounded.has(idx) ? "GND" : String(idx);
  };

  // 5) Build nodeToTerminals for non-wire components
  const nodeToTerminals = {};
  // init buckets for existing wire nodes
  for (const [, idx] of rootToIdx.entries()) {
    const key = grounded.has(idx) ? "GND" : String(idx);
    if (!nodeToTerminals[key]) nodeToTerminals[key] = [];
  }

  const pushTerminal = (nodeKey, compId, terminalName) => {
    if (!nodeKey) return;
    (nodeToTerminals[nodeKey] = nodeToTerminals[nodeKey] || []).push({
      id: compId,
      terminal: terminalName,
    });
  };

  const assignNode = (vertex, nodeKey) => {
    if (!vertex || !nodeKey) return;
    vertex.id = nodeKey;
  };

  // populate terminals AND set node names onto component endpoints
  for (const e of components) {
    if (isWire(e.name) || isWire(e.id)) continue; // skip wires

    // --- Ideal transformer: 4 terminals ---
    if (e instanceof Transformer) {
      const puK = e.p.u ? coordToNodeKey([e.p.u.x, e.p.u.y]) : null;
      const pvK = e.p.v ? coordToNodeKey([e.p.v.x, e.p.v.y]) : null;
      const suK = e.s.u ? coordToNodeKey([e.s.u.x, e.s.u.y]) : null;
      const svK = e.s.v ? coordToNodeKey([e.s.v.x, e.s.v.y]) : null;

      assignNode(e.p.u, puK);
      assignNode(e.p.v, pvK);
      assignNode(e.s.u, suK);
      assignNode(e.s.v, svK);

      pushTerminal(puK, e.p.id, "pu");
      pushTerminal(pvK, e.p.id, "pv");
      pushTerminal(suK, e.s.id, "su");
      pushTerminal(svK, e.s.id, "sv");
      continue;
    }

    // --- Normal 2-terminal component (u / v) ---
    const u = e.u;
    const v = e.v;

    const keyU = u ? coordToNodeKey([u.x, u.y]) : null;
    const keyV = v ? coordToNodeKey([v.x, v.y]) : null;

    if (keyU) {
      assignNode(u, keyU);
      pushTerminal(keyU, e.id, "u");
    }

    if (keyV) {
      assignNode(v, keyV);
      pushTerminal(keyV, e.id, "v");
    }
  }

  // 6) Wire-only adjacency between node keys
  const wireAdj = new Map();
  const add = (a, b) => {
    if (!wireAdj.has(a)) wireAdj.set(a, new Set());
    wireAdj.get(a).add(b);
  };

  for (const e of components) {
    if (!isWire(e.name) && !isWire(e.id)) continue;

    const U = e.getU ? e.getU() : e.u;
    const V = e.getV ? e.getV() : e.v;

    const A = U ? coordToNodeKey([U.x, U.y]) : null;
    const B = V ? coordToNodeKey([V.x, V.y]) : null;

    if (A && B && A !== B) {
      add(A, B);
      add(B, A);
    }
  }

  // Diagnostics (optional)
  console.log("nodeToTerminals:", nodeToTerminals);
  console.log("unique wire-node groups:", rootToIdx.size);
  console.log("node keys:", Object.keys(nodeToTerminals));

  return {
    nodeToTerminals, // { "0": [...], "1": [...], "GND": [...] }
    coordToNodeKey,  // function([x,y]) -> node key or null
    wireAdj,         // Map<nodeKey, Set<nodeKey>>
    nodeKeys: Object.keys(nodeToTerminals),
  };
}

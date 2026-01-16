function addTerm(cell, term) {
  if (term == null) return cell; // <- safety
  if (cell === "0") return term;
  if (term.startsWith("-")) return `${cell} ${term}`;
  return `${cell} + ${term}`;
}
function neg(term) {
  return term.startsWith("-") ? term.slice(1) : `-${term}`;
}
function sortNodesLikeNumbers(a, b) {
  const na = /^\d+$/.test(a),
    nb = /^\d+$/.test(b);
  if (na && nb) return Number(a) - Number(b);
  if (na) return -1;
  if (nb) return 1;
  return a.localeCompare(b);
}

const invOf = (component) => {
  if (component instanceof Inductor)
    return math.divide(1, math.complex(0, component.value)).toString();

  if (component instanceof Capacitor)
    return math.divide(1, math.complex(0, -component.value)).toString();

  if (component instanceof Resistor)
    return math.divide(1, math.complex(component.value, 0)).toString();

  return null; // non-passives
};

function buildMatrix(components) {
  // --- helpers for transformer labels + pins ---
  const getT = (t) => ({
    id: t.id,
    pu: t.p.u.id,
    pv: t.p.v.id,
    su: t.s.u.id,
    sv: t.s.v.id,
    n: t.n, // Np/Ns
  });

  const ipLabel = (tid) => `Ip(${tid})`;
  const isLabel = (tid) => `Is(${tid})`;
  const tvRow = (tid) => `Tv(${tid})`; // voltage-ratio constraint row
  const tiRow = (tid) => `Ti(${tid})`; // current-ratio constraint row

  // 1) Collect nodes (exclude GND), voltage sources, transformers
  const nodeSet = new Set();
  const voltSources = [];
  const transformers = [];

  for (const c of components) {
    // Voltage sources (your existing heuristic)
    if (c.id && c.id[0].toUpperCase() === "V") voltSources.push(c);

    // Normal 2-terminal parts
    if (c.u?.id) {
      const u = c.u.id;
      if (u && u !== "GND") nodeSet.add(u);
    }
    if (c.v?.id) {
      const v = c.v.id;
      if (v && v !== "GND") nodeSet.add(v);
    }

    // Ideal transformer (4 terminals)
    if (c instanceof Transformer) {
      const t = getT(c);
      transformers.push(t);
      for (const nid of [t.pu, t.pv, t.su, t.sv]) {
        if (nid && nid !== "GND") nodeSet.add(nid);
      }
    }
  }

  const nodes = Array.from(nodeSet).sort(sortNodesLikeNumbers);

  // 2) Labels:
  // rows = nodes + Vsource KVL rows + transformer constraint
  // rows (2 per transformer)
  const tRows = transformers.flatMap((t) => [tvRow(t.id), tiRow(t.id)]);
  const rowLabels = [...nodes, ...voltSources.map((v) => v.id), ...tRows];

  // cols = nodes + Vsource current unknowns + transformer winding
  // current unknowns (2 per transformer)
  const vICols =
    voltSources.length === 1 ? ["I"] : voltSources.map((v) => `I(${v.id})`);
  const tICols = transformers.flatMap((t) => [ipLabel(t.id), isLabel(t.id)]);
  const colLabels = [...nodes, ...vICols, ...tICols];

  const n = rowLabels.length;
  if (n !== colLabels.length) throw new Error("Row/column label mismatch.");

  const rowIndex = Object.fromEntries(rowLabels.map((r, i) => [r, i]));
  const colIndex = Object.fromEntries(colLabels.map((c, j) => [c, j]));

  // 3) Init
  const A = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => "0")
  );

  const addAt = (rLabel, cLabel, term) => {
    if (!(rLabel in rowIndex)) return;
    if (!(cLabel in colIndex)) return;
    const i = rowIndex[rLabel];
    const j = colIndex[cLabel];
    A[i][j] = addTerm(A[i][j], term);
  };

  // 4A) Stamp passives + voltage sources using your existing logic
  for (let i = 0; i < n; i++) {
    const rLabel = rowLabels[i];
    const rowIsNode = nodes.includes(rLabel);
    const rowIsVsrc = !rowIsNode && /^(?=V)/i.test(rLabel);

    for (let j = 0; j < n; j++) {
      const cLabel = colLabels[j];
      const colIsNode = nodes.includes(cLabel);
      const colIsI = !colIsNode;

      for (const comp of components) {
        // Skip transformers here (we stamp them separately)
        if (comp instanceof Transformer) continue;

        const uNode = comp.u?.id;
        const vNode = comp.v?.id;
        const isVsrc = /^(?=V)/i.test(comp.id);

        // --- KCL node rows: I-column stamp for V sources (±1) ---
        if (colIsI && isVsrc && rowIsNode) {
          const thisIColMatches =
            (colLabels[j] === "I" &&
              voltSources.length === 1 &&
              comp.id === voltSources[0].id) ||
            colLabels[j] === `I(${comp.id})`;

          if (thisIColMatches) {
            if (rLabel === uNode) A[i][j] = addTerm(A[i][j], "1");
            else if (rLabel === vNode) A[i][j] = addTerm(A[i][j], "-1");
          }
          continue;
        }

        // --- KVL V-source row: node-column stamp for that V (±1) ---
        if (rowIsVsrc && isVsrc && rLabel === comp.id) {
          if (uNode !== "GND" && uNode in colIndex) {
            const ju = colIndex[uNode];
            if (ju === j) A[i][j] = addTerm(A[i][j], "1");
          }
          if (vNode !== "GND" && vNode in colIndex) {
            const jv = colIndex[vNode];
            if (jv === j) A[i][j] = addTerm(A[i][j], "-1");
          }
          continue;
        }

        // --- Passive stamping into node columns ---
        if (!isVsrc && colIsNode) {
          const symInv = invOf(comp);
          if (symInv == null) continue; // <- IMPORTANT

          // Diagonal
          if (
            rowIsNode &&
            rLabel === cLabel &&
            (uNode === rLabel || vNode === rLabel)
          ) {
            A[i][j] = addTerm(A[i][j], symInv);
            continue;
          }

          // Off-diagonal
          if (
            rowIsNode &&
            colIsNode &&
            ((uNode === rLabel && vNode === cLabel) ||
              (uNode === cLabel && vNode === rLabel))
          ) {
            A[i][j] = addTerm(A[i][j], neg(symInv));
            continue;
          }
        }
      }
    }
  }

  // 4B) Stamp ideal transformers (string MNA stamping)
  for (const t of transformers) {
    const Ip = ipLabel(t.id);
    const Is = isLabel(t.id);
    const Tv = tvRow(t.id);
    const Ti = tiRow(t.id);

    // KCL coupling: node rows vs winding current columns
    // Primary
    if (t.pu && t.pu !== "GND") addAt(t.pu, Ip, "1");
    if (t.pv && t.pv !== "GND") addAt(t.pv, Ip, "-1");
    // Secondary
    if (t.su && t.su !== "GND") addAt(t.su, Is, "1");
    if (t.sv && t.sv !== "GND") addAt(t.sv, Is, "-1");

    // Voltage ratio constraint row: (Vpu - Vpv) - n*(Vsu - Vsv) = 0
    const nStr = String(t.n);
    if (t.pu && t.pu !== "GND") addAt(Tv, t.pu, "1");
    if (t.pv && t.pv !== "GND") addAt(Tv, t.pv, "-1");
    if (t.su && t.su !== "GND") addAt(Tv, t.su, neg(nStr)); // -n
    if (t.sv && t.sv !== "GND") addAt(Tv, t.sv, nStr); // +n

    // Current ratio constraint row: Is + n*Ip = 0
    addAt(Ti, Is, "1");
    addAt(Ti, Ip, nStr);
  }

  return { A, rowLabels, colLabels };
}

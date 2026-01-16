function drawGrid() {
  background(220);
  stroke(230);
  strokeWeight(1);
  for (let x = 0; x <= width; x += GRID_CELL) line(x, 0, x, height);
  for (let y = 0; y <= height; y += GRID_CELL) line(0, y, width, y);
}

function snap(v) {
  return Math.round(v / GRID_CELL) * GRID_CELL;
}

function stripWires(components) {
  return components.filter((c) => !/^w\d+$/i.test(c.id));
}

function deleteComponent() {
  for (let c of components)
    if (c.selected) {
      const cmd = new DeleteCMD(components, c);
      history.execute(cmd);
      c = null;
    }
}

function parseSI(str) {
  const s = String(str).trim();
  const m = s.match(/^(-?\d*\.?\d+)\s*([pnumkMGT]?)([a-zA-ZΩ]*)$/);
  if (!m) return NaN;
  const val = parseFloat(m[1]);
  const prefix = m[2];

  const mult = {
    p: 1e-12,
    n: 1e-9,
    u: 1e-6,
    m: 1e-3,
    "": 1,
    k: 1e3,
    M: 1e6,
    G: 1e9,
    T: 1e12,
  }[prefix];

  return val * (mult ?? 1);
}

// Digits -> Unicode subscripts
const SUB = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
};

function probe(isProbing, components) {
  for (const c of components) {
    if (c instanceof Ground) continue;
    c.probe = isProbing;
  }
}

function toSubscript(str) {
  return String(str).replace(/\d/g, (d) => SUB[d]);
}

//=====================================================================
//                        Diagnostic Tools
//=====================================================================
function display(components) {
  // Show non-wire components and their node groupings
  console.log("=== Non-Wire Components and Node Groupings ===");
  const isWire = (name) => typeof name === "string" && /^w\d+$/i.test(name);
  for (const e of components) {
    if (isWire(e.id)) continue;

    const uNode = e.u.id?.() ?? "(no node)";
    const vNode = e.v.id?.() ?? "(no node)";

    console.log(
      `${e.name.padEnd(12)}:  U → ${uNode.padEnd(5)}   V → ${vNode.padEnd(5)}`
    );
  }
}

// --------- Pretty print ----------
function prettyPrintMatrix(A, rowLabels, colLabels, title = "A") {
  // compute widths
  const colWidths = [];
  const header = ["", ...colLabels];
  for (let j = 0; j < header.length; j++) {
    let w = header[j].length;
    for (let i = 0; i < A.length; i++) {
      const cell = j === 0 ? rowLabels[i] : A[i][j - 1];
      w = Math.max(w, (cell ?? "").length);
    }
    colWidths[j] = w;
  }
  const pad = (s, w) => s.toString().padStart(w, " ");

  // title
  console.log(`\n${title} (${rowLabels.length}×${colLabels.length})`);
  // header
  console.log(header.map((s, j) => pad(s, colWidths[j])).join("  "));
  // rows
  for (let i = 0; i < A.length; i++) {
    const row = [rowLabels[i], ...A[i]];
    console.log(row.map((s, j) => pad(s, colWidths[j])).join("  "));
  }
}

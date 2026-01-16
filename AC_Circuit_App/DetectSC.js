// Detect wires that short the same two nodes as any voltage source (order-insensitive)
function detectSC(components) {
  const sources = [];
  const wires = [];
  const sc = [];
  for (const c of components) {
    if (c instanceof VoltageAC) sources.push(c);
    if (c instanceof Wire) wires.push(c);
  }
  for (const s of sources)
    for (const w of wires) {
      const su = s.u.id;
      const sv = s.v.id;
      const wu = w.u.id;
      const wv = w.v.id;
      const isSameU = wu == su || wv == su;
      const isSameV = wu == sv || wv == sv;
      if (isSameU && isSameV) {
        sc.push({source:s.id, wire:w.id});
        break;
      }
    }
  return sc;
}

// function detectSC(components, epsV = 1e-9) {
//   class DSU {
//     constructor() {
//       this.p = new Map();
//       this.r = new Map();
//     }
//     find(x) {
//       if (!this.p.has(x)) {
//         this.p.set(x, x);
//         this.r.set(x, 0);
//       }
//       let px = this.p.get(x);
//       if (px !== x) this.p.set(x, this.find(px));
//       return this.p.get(x);
//     }
//     union(a, b) {
//       a = this.find(a);
//       b = this.find(b);
//       if (a === b) return;
//       let ra = this.r.get(a),
//         rb = this.r.get(b);
//       if (ra < rb) ([a, b] = [b, a]), ([ra, rb] = [rb, ra]);
//       this.p.set(b, a);
//       if (ra === rb) this.r.set(a, ra + 1);
//     }
//   }

//   const dsu = new DSU();

//   // 1) Merge ideal shorts
//   for (const c of components) {
//     if (c instanceof Wire) dsu.union(c.u.id, c.v.id);
//     //if (c.type === "Switch" && c.closed) dsu.union(c.u.id, c.v.id);
//     //if (c.type === "Resistor" && c.R === 0) dsu.union(c.u.id, c.v.id);
//   }

//   // 2) Detect “source shorted” contradictions
//   const problems = [];

//   for (const c of components) {
//     if (c instanceof VoltageAC) {
//       const a = dsu.find(c.u.id);
//       const b = dsu.find(c.v.id);
//       if (a === b && Math.abs(c.vlaue) > epsV) {
//         problems.push({
//           kind: "SOURCE_SHORTED",
//           id: c.id,
//           msg: `an ideal short is across ${c.id} (same node after merging).`,
//         });
//       }
//     }
//   }

//   // 3) Detect conflicting voltage sources on same node pair
//   const enforced = new Map(); // key "a|b" -> V
//   for (const c of components) {
//     if (!(c instanceof VoltageAC)) continue;
//     let a = dsu.find(c.u.id),
//       b = dsu.find(c.v.id);
//     if (a === b) continue;
//     // canonical order, keep sign consistent
//     let sign = 1;
//     if (a > b) {
//       [a, b] = [b, a];
//       sign = -1;
//     }
//     const key = `${a}|${b}`;
//     const V = sign * c.value;

//     if (!enforced.has(key)) enforced.set(key, V);
//     else if (Math.abs(enforced.get(key) - V) > epsV) {
//       problems.push({
//         kind: "CONFLICTING_SOURCES",
//         id: c.id,
//         msg: `Conflicting voltage constraints between nodes ${a} and ${b}: ${enforced.get(
//           key
//         )}V vs ${V}V.`,
//       });
//     }
//   }

//   return { dsu, problems };
// }

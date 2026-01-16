class DSU {
  constructor() {
    this.p = new Map();
    this.r = new Map();
  }
  has(k) {
    return this.p.has(k);
  }
  make(k) {
    if (!this.p.has(k)) {
      this.p.set(k, k);
      this.r.set(k, 0);
    }
  }
  find(k) {
    const p = this.p.get(k);
    if (p === k) return k;
    const r = this.find(p);
    this.p.set(k, r);
    return r;
  }
  union(a, b) {
    let ra = this.find(a),
      rb = this.find(b);
    if (ra === rb) return;
    let raR = this.r.get(ra),
      rbR = this.r.get(rb);
    if (raR < rbR) [ra, rb] = [rb, ra];
    this.p.set(rb, ra);
    if (raR === rbR) this.r.set(ra, raR + 1);
  }
}

class CircuitStore {
  constructor({ frequencyHz = 50 } = {}) {
    this._f = frequencyHz;
    this._subs = new Set();
  }

  get frequencyHz() {
    return this._f;
  }

  setFrequencyHz(f) {
    const next = Number(f);
    if (!Number.isFinite(next) || next < 0) return;
    if (next === this._f) return;

    this._f = next;
    for (const fn of this._subs) fn(this._f);
  }

  subscribe(fn) {
    this._subs.add(fn);
    fn(this._f); // immediately push current value
    return () => this._subs.delete(fn);
  }
}


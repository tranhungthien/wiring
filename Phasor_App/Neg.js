function neg() {
  activePhasor = null;
  if (augend) {
    const px = augend.v.x - augend.u.x;
    const py = augend.v.y - augend.u.y;

    const Px = -px;
    const Py = -py;

    const Pmag = sqrt(Px * Px + Py * Py);
    // note: everything is flipped upside down on canvas
    
    const a = augend.phasorAngle.value + 180;
    let r = new Phasor(Pmag, "steelblue", "skyblue");
    r.phasorAngle.value = a;
    r.rotate();
    phasors.push(r);

    augend = null;
    state = "IDLE";
  }
}

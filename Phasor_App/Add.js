function add() {
  activePhasor = null;
  if (augend && addend) {
    const px = augend.v.x - augend.u.x;
    const py = augend.v.y - augend.u.y;

    const qx = addend.v.x - addend.u.x;
    const qy = addend.v.y - addend.u.y;

    const Px = px + qx;
    const Py = py + qy;

    const Pmag = sqrt(Px * Px + Py * Py);
    // note: everything is flipped upside down on canvas
    // const a = -(atan2(Py, Px) * 180) / PI;
    // const Pang = a >= 0 ? a : 360 + a;
    const ang = degrees(Math.atan2(-Py, Px)); // negate Py to convert to y-up
    const Pang = (ang + 360) % 360;
    let r = new Phasor(Pmag, "indianred", "lightcoral");
    r.phasorAngle.value = Pang; //abs(Pang);
    r.rotate();
    phasors.push(r);

    augend = null;
    addend = null;
    state = "CLR";
  }
}

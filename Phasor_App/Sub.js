function sub() {
  activePhasor = null;
  if (augend && addend) {
    const px = augend.v.x - augend.u.x;
    const py = augend.v.y - augend.u.y;

    const qx = addend.v.x - addend.u.x;
    const qy = addend.v.y - addend.u.y;

    const Px = px - qx;
    const Py = py - qy;

    const Pmag = sqrt(Px * Px + Py * Py);
    // note: everything is flipped upside down on canvas
    const ang = degrees(Math.atan2(-Py, Px));
    const Pang = (ang + 360) % 360;
    let r = new Phasor(Pmag, "darkviolet", "mediumpurple");
    r.phasorAngle.value = Pang;
    r.rotate();
    phasors.push(r);

    augend = null;
    addend = null;
    state = "IDLE";
  }
}
// if (augend && addend) {
//   const px = augend.v.x - augend.u.x;
//   const py = augend.v.y - augend.u.y;

//   const qx = addend.v.x - addend.u.x;
//   const qy = addend.v.y - addend.u.y;

//   const Px = px - qx;
//   const Py = py - qy;

//   const Pmag = sqrt(Px * Px + Py * Py);
//   // note: everything is flipped upside down on canvas
//   const a = -(atan2(Py, Px) * 180) / PI;
//   const Pang = a >= 0 ? a : 360 + a;
//   let r = new Phasor(Pmag, "darkviolet", "lavender");
//   r.phasorAngle.value = Pang;
//   r.rotate();
//   phasors.push(r);

//   augend = null;
//   addend = null;
//   state = "CLR";
// }

function mul() {
  activePhasor = null;
  if (augend && addend) {
    pmag = augend.phasorMagnitude.value;
    pang = augend.phasorAngle.value;
    qmag = addend.phasorMagnitude.value;
    qang = addend.phasorAngle.value;

    Pmag = pmag * qmag;
    Pang = pang + qang;
    Pang = (Pang + 360) % 360;
    let r = new Phasor(Pmag, "steelblue", "skyblue");
    r.phasorAngle.value = Pang; //abs(Pang);
    r.rotate();
    phasors.push(r);

    activePhasor = null;
    augend = null;
    addend = null;
    state = "IDLE";
  }
}

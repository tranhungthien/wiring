function newPhasor() {
  activePhasor = null;
  phasors.push(new Phasor(200));
  state = "IDLE";
}

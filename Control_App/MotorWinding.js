class MotorWinding extends Edge {
  constructor(id, A1, A2) {
    super(id, A1, false, true, A2);
    this.feed = ""; // add line or phase voltage
  }

  getFeed() {
    return this.feed;
  }

  setFeed(data) {
    /***************************************************************
    * Used to configure motor i.e. star, delta, forward or reverse *
    *                found in Simulator.js in fn 
    ****************************************************************/
    // // JS variables can change type
    // if (typeof data === "string" || data instanceof String) {
    //   this.feed += data;
    // } else {
    //   this.active = data;
    // }

    if (typeof data === "string" || data instanceof String) this.feed += data;
  }

  reset() {
    this.feed = "";
  }
}

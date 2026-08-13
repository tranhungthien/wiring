class MotorWinding extends Edge {
  constructor(id, A1, A2) {
    super(id, A1, false, true, A2);
    //this.counter = 0;
    this.feed = ""; // add line or phase voltage
  }
  // getCounter() {
  //   return this.counter;
  // }

  // setCounter() {
  //   this.counter++;
  // }

  getFeed() {
    return this.feed;
  }

  setFeed(data) {
    this.feed += data;
  }

  reset() {
    this.feed = "";
    //this.counter = 0;
  }
}

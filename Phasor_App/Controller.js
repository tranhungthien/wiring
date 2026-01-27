function controller() {
  switch (state) {
    case "IDLE":
      break;
    case "NEG":
      neg();
      break;
    case "ADD":
      add();
      break;
    case "SUB":
      sub();
      break;
    case "NEW":
      newPhasor();
      break;
    case "RND":
      break;
    case "CLR":
      clr();
      break;
    default:
      console.log("did nothing");
      break;
  }
}

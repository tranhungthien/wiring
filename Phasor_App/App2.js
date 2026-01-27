// All global variables in AppData.js

function setup() {
  createCanvas(windowWidth, windowHeight);
  ox = width / 2;
  oy = height / 2;

  messageBoard = new MessageBoard(ox, oy - 0.6 * oy);
  history = new History();

  initZoom();
  // phasors.push(new Phasor(200));
  // phasors[0].phasorAngle.value = 0;
  // phasors[0].rotate();
  // phasors.push(new Phasor(200));
  // phasors[1].phasorAngle.value = 120;
  // phasors[1].rotate();
  // phasors.push(new Phasor(200));
  // phasors[2].phasorAngle.value = 240;
  // phasors[2].rotate();

  icons.push(new Icon(ox - 0.3 * ox, 100, 64, "-1", "NEG"));
  icons.push(new Icon(ox - 0.1 * ox, 100, 64, "+", "ADD"));
  icons.push(new Icon(ox + 0.1 * ox, 100, 64, "-", "SUB"));
  icons.push(new Icon(ox + 0.3 * ox, 100, 64, "C", "CLR"));
  icons.push(new Icon(ox - 0.9 * ox, oy - 0.6 * oy, 64, "v̲", "NEW"));
  icons.push(new Icon(ox - 0.9 * ox, oy - 0.35 * oy, 64, "⚙", "RND"));
}

function draw() {
  push();
  translate(offset.x, offset.y);
  scale(scaling);
  drawGrid();
  for (const p of phasors) p.draw();
  pop();

  for (const i of icons) {
    i.update();
    i.draw();
  }

  messageBoard.draw();
  controller();
  panWithKeys();
  panWithMouse();
}

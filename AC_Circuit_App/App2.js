// All global variables in AppData.js

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  initZoom();
  dropDown(canvas);
  history = new History();
  store = new CircuitStore();
  msg = new MessageBoard(width / 2, 60);
}

function draw() {
  //In ZoomAndPan.js
  translate(offset.x, offset.y);
  scale(scaling);

  drawGrid();
  for (let c of components) c.draw();
  if (activeComponent) activeComponent.draw();
  msg.draw();

  controller();
  panWithKeys();
  panWithMouse();
}

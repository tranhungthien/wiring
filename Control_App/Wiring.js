let currentWireState = false;
let currentWire = [];
let currentWireX;
let currentWireY;
let wireCounter = 0;

function snapWireToGrid() {
  currentWireX = relativeCoordinates().x;
  currentWireY = relativeCoordinates().y;
}

function addWirePoint() {
  let vertex = new Vertex(currentWireX, currentWireY);
  currentWire.push(vertex);
}

function eraseLineSegment() {
  currentWire.pop();
  //console.log("here");
}

function deleteWire() {
  wires = wires.filter((wire) => {
    if (wire.isSelected()) {
      wire.remove();
      return false;
    }
    return true;
  });
}

function terminateWiring() {
  if (currentWire.length > 1) {
    wires.push(new Wire(wireCounter, currentWire));
    currentWire = [];
    wireCounter++;
  } else currentWire = [];
}

function drawWire() {
  const numberOfWires = currentWire.length;
  if (numberOfWires == 0) return;
  if (numberOfWires > 0) {
    fill(0);
    circle(currentWire[0].x, currentWire[0].y, 5);
    noFill();
  }
  if (numberOfWires > 1) {
    for (let i = 1; i < numberOfWires; i++) {
      const p1 = currentWire[i - 1];
      const p2 = currentWire[i];
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}

function drawGuide() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  if (currentWire.length == 0) return;

  const relativeMouseX = (mouseX - offset.x) / scaling;
  const relativeMouseY = (mouseY - offset.y) / scaling;

  const last = currentWire[currentWire.length - 1];
  const x1 = last.x;
  const y1 = last.y;
  const dx = relativeMouseX - x1;
  const dy = relativeMouseY - y1;
  const angle = abs(atan2(dy, dx));

  let x2 = Math.round(relativeMouseX / spacing) * spacing;
  let y2 = Math.round(relativeMouseY / spacing) * spacing;

  if (angle < radians(5) || angle > radians(175)) {
    y2 = y1; // Horizontal line
  } else if (angle > radians(85) && angle < radians(95)) {
    x2 = x1; // Vertical line
  }
  currentWireX = x2;
  currentWireY = y2;

  line(x1, y1, x2, y2);
  fill(0);
  circle(x2, y2, 5);
  noFill();
}

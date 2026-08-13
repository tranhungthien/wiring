let isPanning = false;
let scaling = 1;
let offset;

function initZoom() {
  // Zoom
  offset = createVector(0, 0);
  window.addEventListener("wheel", (e) => {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      const s = 1 - e.deltaY / 1000;
      scaling *= s;

      const mouse = createVector(mouseX, mouseY);
      offset.sub(mouse).mult(s).add(mouse);
    }
  });
}

function pan() {
  if (isPanning && keyIsDown(SHIFT)) {
    offset.x -= (pmouseX - mouseX) / scaling;
    offset.y -= (pmouseY - mouseY) / scaling;
  }
}

function relativeCoordinates() {
  const relativeMouseX = (mouseX - offset.x) / scaling;
  const relativeMouseY = (mouseY - offset.y) / scaling;

  const snappedX = Math.round(relativeMouseX / spacing) * spacing;
  const snappedY = Math.round(relativeMouseY / spacing) * spacing;

  return new Vertex(snappedX, snappedY);
}

function panWithMouse() {
  const snappedX = relativeCoordinates().x;
  const snappedY = relativeCoordinates().y;

  if (
    snappedX >= 0 &&
    snappedX <= gridSizeX &&
    snappedY >= 0 &&
    snappedY <= gridSizeY
  ) {
    //console.log(`Clicked at: (${snappedX}, ${snappedY})`);
  }
}

function panWithKeys() {
  const panSpeed = 10 / scaling; // Adjust the pan speed as needed
  if (keyIsDown(LEFT_ARROW)) {
    offset.x += panSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    offset.x -= panSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    offset.y += panSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    offset.y -= panSpeed;
  }
}
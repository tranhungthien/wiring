// All global variables in AppData.js

function relativeCoordinates() {
  const relativeMouseX = (mouseX - offset.x) / scaling;
  const relativeMouseY = (mouseY - offset.y) / scaling;

  const snappedX = Math.round(relativeMouseX / spacing) * spacing;
  const snappedY = Math.round(relativeMouseY / spacing) * spacing;

  return new Vertex(snappedX, snappedY);
}

function relativeCoordinates1(v) {
  const relativeMouseX = (v.x - offset.x) / scaling;
  const relativeMouseY = (v.y - offset.y) / scaling;

  const snappedX = Math.round(relativeMouseX / spacing) * spacing;
  const snappedY = Math.round(relativeMouseY / spacing) * spacing;

  return new Vertex(snappedX, snappedY);
}

function relativeCoordinates2(x, y) {
  const relativeMouseX = (x - offset.x) / scaling;
  const relativeMouseY = (y - offset.y) / scaling;

  const snappedX = Math.round(relativeMouseX / spacing) * spacing;
  const snappedY = Math.round(relativeMouseY / spacing) * spacing;

  return new Vertex(snappedX, snappedY);
}

function initZoom() {
  offset = createVector(0, 0);

  // Track z key state globally
  window.addEventListener("keydown", (e) => {
    if (e.key === "z" || e.key === "Z") zDown = true;
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "z" || e.key === "Z") zDown = false;
  });

  // Wheel zoom (only when z is held)
  window.addEventListener(
    "wheel",
    (e) => {
      // only zoom when z is down
      if (!zDown) return;

      // only when mouse over canvas region
      if (!(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height))
        return;

      // stop page scroll / trackpad zoom
      e.preventDefault();

      // zoom factor
      const s = 1 - e.deltaY / 1000;

      // optional clamp for sanity
      const newScaling = scaling * s;
      if (newScaling < 0.1 || newScaling > 20) return;

      scaling = newScaling;

      // keep point under cursor fixed
      const mouse = createVector(mouseX, mouseY);
      offset.sub(mouse).mult(s).add(mouse);
    },
    { passive: false } // REQUIRED so preventDefault() works
  );
}

function panWithMouse() {
  if (keyIsDown(SHIFT) && leftDown && mouseIsPressed) {
    offset.x -= (pmouseX - mouseX) / scaling;
    offset.y -= (pmouseY - mouseY) / scaling;
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

// function initZoom() {
//   // Zoom
//   offset = createVector(0, 0);
//   window.addEventListener("wheel", (e) => {
//     if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
//       const s = 1 - e.deltaY / 1000;
//       scaling *= s;

//       const mouse = createVector(mouseX, mouseY);
//       offset.sub(mouse).mult(s).add(mouse);
//     }
//   });
// }

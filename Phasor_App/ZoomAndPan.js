// All global variables in AppData.js

function relativeCoordinates() {
  const relativeMouseX = (mouseX - offset.x) / scaling;
  const relativeMouseY = (mouseY - offset.y) / scaling;

  return new Vertex(relativeMouseX, relativeMouseY);
}

function initZoom() {
  offset = createVector(0, 0);
  window.addEventListener("keydown", (e) => {
    if (e.key === "z" || e.key === "Z") zDown = true;
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "z" || e.key === "Z") zDown = false;
  });
  window.addEventListener(
    "wheel",
    (e) => {
      if (!zDown) return;
      if (!(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height))
        return;
      e.preventDefault();
      const s = 1 - e.deltaY / 1000;
      const newScaling = scaling * s;
      if (newScaling < 0.1 || newScaling > 20) return;

      scaling = newScaling;

      const mouse = createVector(mouseX, mouseY);
      //offset.sub(mouse).mult(s).add(mouse);
      offset.x += mouseX - pmouseX;
      offset.y += mouseY - pmouseY;
    },
    { passive: false } // REQUIRED so preventDefault() works
  );
}

function panWithMouse() {
  if (keyIsDown(SHIFT) && leftDown && mouseIsPressed) {
    offset.x += mouseX - pmouseX;
    offset.y += mouseY - pmouseY;
  }
}

function panWithKeys() {
  const panSpeed = 10; // pixels per frame
  if (keyIsDown(LEFT_ARROW)) offset.x += panSpeed;
  if (keyIsDown(RIGHT_ARROW)) offset.x -= panSpeed;
  if (keyIsDown(UP_ARROW)) offset.y += panSpeed;
  if (keyIsDown(DOWN_ARROW)) offset.y -= panSpeed;
}

// function panWithMouse() {
//   if (keyIsDown(SHIFT) && leftDown && mouseIsPressed) {
//     offset.x -= (pmouseX - mouseX) / scaling;
//     offset.y -= (pmouseY - mouseY) / scaling;
//   }
// }

// function panWithKeys() {
//   const panSpeed = 10 / scaling; // Adjust the pan speed as needed
//   if (keyIsDown(LEFT_ARROW)) {
//     offset.x += panSpeed;
//   }
//   if (keyIsDown(RIGHT_ARROW)) {
//     offset.x -= panSpeed;
//   }
//   if (keyIsDown(UP_ARROW)) {
//     offset.y += panSpeed;
//   }
//   if (keyIsDown(DOWN_ARROW)) {
//     offset.y -= panSpeed;
//   }
// }

// function relativeCoordinates1(v) {
//   const relativeMouseX = (v.x - offset.x) / scaling;
//   const relativeMouseY = (v.y - offset.y) / scaling;

//   const snappedX = Math.round(relativeMouseX / spacing) * spacing;
//   const snappedY = Math.round(relativeMouseY / spacing) * spacing;

//   return new Vertex(snappedX, snappedY);
// }

// function relativeCoordinates2(x, y) {
//   const relativeMouseX = (x - offset.x) / scaling;
//   const relativeMouseY = (y - offset.y) / scaling;

//   const snappedX = Math.round(relativeMouseX / spacing) * spacing;
//   const snappedY = Math.round(relativeMouseY / spacing) * spacing;

//   return new Vertex(snappedX, snappedY);
// }

function mousePressed() {
  for (let c of components) {
    c.mousePressed();
  }
  //=========================================================
  //                     Zoom and Pan
  //=========================================================
  if (mouseButton === LEFT) leftDown = true;
  //=========================================================
  //                     Dropdown Menu
  //=========================================================
  if (mouseButton !== RIGHT) {
    contextMenu.hide();
  }
}

function mouseDragged() {
  for (let c of components) c.mouseDragged();
}

function mouseReleased() {
  for (let c of components) c.mouseReleased();
}

function mouseReleased() {
  for (let c of components) c.mouseReleased();
  //=========================================================
  //                     Zoom and Pan
  //=========================================================
  if (mouseButton === LEFT) leftDown = false;
}

function doubleClicked() {
  for (let c of components) c.doubleClicked();
}

function keyPressed() {
  for (let c of components) c.keyPressed();
  
  componentSelector();
  
  if (key === "z" && keyIsDown(CONTROL)) history.undo();
  if (key === "y" && keyIsDown(CONTROL)) history.redo();
  if (keyCode === DELETE || keyCode === BACKSPACE) deleteComponent();
}

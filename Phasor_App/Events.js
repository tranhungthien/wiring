function keyPressed() {
  for (const p of phasors) p.keyPressed();
  if (key === "e") reset();

  if (key === "z" && keyIsDown(CONTROL)) history.undo();
  if (key === "y" && keyIsDown(CONTROL)) history.redo();
  if (keyCode === DELETE || keyCode === BACKSPACE) deletePhasor();
}

function mousePressed() {
  for (const p of phasors) p.mousePressed();
  //=========================================================
  //                         Pan
  //=========================================================
  if (mouseButton === LEFT) leftDown = true;

  //=========================================================
  //                         HUD
  //=========================================================
  for (const i of icons) i.press();
}

function mouseDragged() {
  for (const p of phasors) {
    p.mouseDragged();
  }
}

function mouseReleased() {
  //=========================================================
  //                         Pan
  //=========================================================
  if (mouseButton === LEFT) leftDown = false;
  //=========================================================
  //                 Head tail, tail head
  //=========================================================
  //console.log(activePhasor);
  if (activePhasor) snapToClosestHeadTail(activePhasor, phasors, 40);
  for (const i of icons) i.release();
}

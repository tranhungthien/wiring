class Label extends Selectable(Editable(Input)) {
  draw() {
    push();
    textSize(this.textSizePx);
    if (this.leftTextAlignment) textAlign(LEFT, CENTER);
    else textAlign(RIGHT, CENTER);

    const caretX = this.co.x - this.xOffset; //relativeCoordinates1(this.co).x - 70;
    const caretY = this.co.y - this.yOffset; //relativeCoordinates1(this.co).y;

    fill(0);
    noStroke();

    if (this.isEditing) {
      // numeric from input, drawn to the LEFT of fixed caret
      const numStr = this.inputText;
      const numW = textWidth(numStr);
      const numX = caretX - numW;
      text(numStr, numX, caretY);

      // caret at fixed position
      if (frameCount % 30 < 15) {
        const h = this.textSizePx;
        stroke(0);
        strokeWeight(2);
        const hl = 0.3;
        const hh = 0.5;
        line(caretX, caretY - h * hh, caretX, caretY + h * hl);
        noStroke();
      }

      if (this.leftTextAlignment) {
        // unit to the RIGHT of caret
        text(" " + this.unit, caretX, caretY);
      } else {
        // unit to the LEFT of caret
        text(this.unit + " ", caretX, caretY);
      }
    } else {
      let numStr = toEngineering(math.round(this.value, 3));
      const numW = textWidth(numStr);

      fill(this.colour);
      if (this.leftTextAlignment) {
        // unit to the RIGHT of caret
        const numX = caretX - numW;
        text(numStr, numX, caretY);
        text(" " + this.unit, caretX, caretY);
      } else {
        // unit to the LEFT of caret
        const numX = caretX + numW;
        text(this.unit + "  ", caretX, caretY);
        text(numStr, numX, caretY);
      }
    }
    pop();
  }
}

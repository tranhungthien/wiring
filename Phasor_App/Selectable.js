//=============================================
//                Label Mixin
//         Selectable(Editable(Input))
//=============================================
const Selectable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
    }
    // TOTAL bounds: number (left of cursor) + space + unit (right of cursor)
    bounds() {
      textSize(this.textSizePx);
      const caretX = this.co.x - this.xOffset;
      const numStr = String(this.value);
      const unitStr = this.unit;
      const numW = textWidth(numStr);
      const spaceW = textWidth(" ");
      const unitW = textWidth(unitStr);
      const h = this.textSizePx;

      const x1 = caretX - numW;
      const x2 = caretX + spaceW + unitW;
      return {
        x1,
        y1: this.co.y - this.yOffset - h * 0.6,
        x2,
        y2: this.co.y - this.yOffset + h * 0.4,
      };
    }

    // Only the unit (to the right of cursor)
    unitBounds() {
      textSize(this.textSizePx);
      const caretX = this.co.x - this.xOffset;
      const unitStr = this.unit;
      const spaceW = textWidth(" ");
      const unitW = textWidth(unitStr);
      const h = this.textSizePx;

      const x1 = caretX + spaceW;
      const x2 = caretX + spaceW + unitW;
      return {
        x1,
        y1: this.co.y - this.yOffset - h * 0.6,
        x2,
        y2: this.co.y - this.yOffset + h * 0.4,
      };
    }

    contains(mx, my) {
      const b = this.bounds();
      return mx >= b.x1 && mx <= b.x2 && my >= b.y1 && my <= b.y2;
    }

    unitContains(mx, my) {
      const b = this.unitBounds();
      return mx >= b.x1 && mx <= b.x2 && my >= b.y1 && my <= b.y2;
    }

    mousePressed() {
      const x = relativeCoordinates().x;
      const y = relativeCoordinates().y;
      // start editing
      if (this.contains(x, y)) {
        this.isEditing = true;
        this.inputText = String(toEngineering(Math.round(this.value, 3)));
      } else this.isEditing = false;
    }
  };

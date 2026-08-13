class CanvasText extends Placeable {
  constructor(id, value, x, y, fontSize = 28, colour = "#000000") {
    super(x, y, fontSize + 12, 100);

    this.id = id;
    this.value = value;
    this.fontSize = fontSize;
    this.colour = colour;
  }

  display() {
    push();

    textSize(this.fontSize);
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);

    // Recalculate selection area based on actual text.
    this.width = Math.max(textWidth(this.value), 20);
    this.height = this.fontSize + 10;

    // Selection box
    if (this.selected) {
      noFill();
      stroke(0, 100, 255);
      strokeWeight(1);

      rectMode(CENTER);

      rect(
        this.x + this.width / 2,
        this.y,
        this.width + 10,
        this.height + 6
      );
    }

    noStroke();
    fill(this.colour);

    text(this.value, this.x, this.y);

    pop();
  }

  isMouseOver(mx, my) {
    return (
      mx >= this.x - 5 &&
      mx <= this.x + this.width + 5 &&
      my >= this.y - this.height / 2 &&
      my <= this.y + this.height / 2
    );
  }

  edit() {
    const newValue = window.prompt("Edit text:", this.value);

    // Cancel was pressed.
    if (newValue === null) {
      return;
    }

    // Don't allow an empty label.
    if (newValue.trim().length === 0) {
      return;
    }

    this.value = newValue;
  }

  // CanvasText doesn't have electrical contacts.
  // This method lets it work with the existing generic
  // PLACE_DEVICE handling in Events.js.
  assignContacts() {}
}

function createCanvasText() {
  if (isBounded()) {
    currentDevice = new CanvasText(
      canvasTextCounter,
      "Text",
      mouseX,
      mouseY
    );

    canvasTexts.push(currentDevice);
    canvasTextCounter++;
  }
}

function deleteCanvasText() {
  canvasTexts = canvasTexts.filter((item) => {
    return !item.isSelected();
  });
}
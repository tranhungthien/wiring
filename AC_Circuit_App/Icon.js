class Icon {
  constructor(x, y, size, label = "⚡", fun = "IDLE") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.label = label;
    this.fun = fun;
    this.message = "";

    this.isDown = false;
    this.isHover = false;

    //this.r = Math.max(10, size * 0.25);
    this.r = Math.max(10, size * 0.1);

    switch (fun) {
      case "IDLE":
        break;
      case "NEG":
        this.message = "Choose a phasor to negate";
        break;
      case "ADD":
        this.message = "Choose two vectors to add";
        break;
      case "SUB":
        this.message = "Choose two vectors to subtract";
        break;
      default:
        break;
    }
  }

  contains(px, py) {
    const half = this.size / 2;
    return (
      px >= this.x - half &&
      px <= this.x + half &&
      py >= this.y - half &&
      py <= this.y + half
    );
  }

  update() {
    this.isHover = this.contains(mouseX, mouseY);
  }
  press() {
    if (this.isHover) {
      this.isDown = true;
      state = this.fun;
      messageBoard.set(this.message);
    }
  }
  release() {
    this.isDown = false;
  }

  draw() {
    const s = this.size;
    const yOff = this.isDown ? 4 : 0;

    // shadow params: "up" vs "down"
    const shadowY = this.isDown ? 3 : 10;
    const shadowBlur = this.isDown ? 10 : 20;
    const shadowAlpha = this.isDown ? 0.25 : 0.35;

    push();

    // --- enable real shadow on the canvas context ---
    const ctx = drawingContext;
    ctx.save(); // important: shadow settings are sticky on the context
    ctx.shadowColor = `rgba(0,0,0,${shadowAlpha})`;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = shadowY;
    ctx.shadowBlur = shadowBlur;

    // Face (shadow applies to this fill)
    noStroke();
    fill(245);
    rect(this.x - s / 2, this.y - s / 2 + yOff, s, s, this.r);

    // Turn shadow off for text/highlights so it stays crisp
    ctx.shadowColor = "rgba(0,0,0,0)";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.restore();

    // Icon/label
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(s * 0.45);
    text(this.label, this.x, this.y + yOff);

    // Optional hover ring
    if (this.isHover && !this.isDown) {
      noFill();
      stroke(0, 20);
      strokeWeight(2);
      rect(this.x - s / 2 + 2, this.y - s / 2 + 2, s - 4, s - 4, this.r);
    }

    pop();
  }
}

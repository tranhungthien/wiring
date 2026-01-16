class MessageBoard {
  constructor(x, y) {
    this.text = "";
    this.x = x;
    this.y = y;
  }
  set(text) {
    this.text = String(text);
  }
  clear() {
    this.text = "";
  }
  flash(text, ms = 1200) {
    this.set(text);
    clearTimeout(this._t);
    this._t = setTimeout(() => this.clear(), ms);
  }
  draw() {
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    textSize(24);
    text(this.text, this.x, this.y);
  }
}

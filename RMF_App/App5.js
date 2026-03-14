let t = 0;
let s = 0;

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawAxes();

  // put origin in centre and flip y so +y is upward
  translate(width / 2, height / 2 + 130);
  scale(1, -1);

  // waveform
  stroke(0);
  strokeWeight(2);
  const gx = -width / 2 + 20;
  const gy = 450;
  const x = gx + t;
  line(gx, gy + 110, gx, gy - 110);
  line(-width / 2, gy, width / 2, gy);

  stroke("red");
  for (let x = 0; x < 900; x += 0.2) point(gx + x, 110 * sin(x) + gy);
  stroke("white");
  for (let x = 0; x < 900; x += 0.2) point(gx + x, 110 * sin(x + 120) + gy);
  stroke("blue");
  for (let x = 0; x < 900; x += 0.2) point(gx + x, 110 * sin(x - 120) + gy);

  stroke("white");
  strokeWeight(4);
  line(x, gy + 110, x, gy - 110);
  //stroke("black");
  //noStroke();

  const va = new vector(0, 0, 1, 0); // magnitude = 1
  const vb = new vector(0, 0, -1 / 2, sqrt(3) / 2); // magnitude = 1
  const vc = new vector(0, 0, -1 / 2, -sqrt(3) / 2);

  // reference drawing
  va.scale(200);
  vb.scale(200);
  vc.scale(200);
  va.draw("salmon");
  vb.draw("grey");
  vc.draw("lightblue");

  // phasor addition
  s = aPhase(t);
  //console.log("1", s);
  va.scale(s);
  va.draw("red");

  s = bPhase(t);
  //console.log("2", s);
  vb.scale(s);
  vb.draw("white");

  s = cPhase(t);
  //console.log("3", s);
  vc.scale(s);
  vc.draw("blue");

  const A = headTail(va, vb);
  const cgrey = color(200, 200, 200);
  A.draw("white");

  const B = headTail(A, vc);
  B.draw("blue");

  const a = resultant(va, vb);
  const b = resultant(a, vc);
  b.draw("black");
  const radius = 40;
  noFill();
  strokeWeight(1);
  stroke("black");
  arc(0, 0, radius * 2, radius * 2, b.direction(), 0, PIE);
  //console.log(b.direction());

  noStroke();
  fill("black");

  push();
  scale(1, -1);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Φ₁", 220, 0);
  text("Φ₂", -110, 110 * sqrt(3));
  text("Φ₃", -110, -110 * sqrt(3));

  text("Φ₁", gx + 90, -gy - 125);
  text("Φ₂", gx + 210, -gy - 125);
  text("Φ₃", gx + 330, -gy - 125);
  pop();

  if (t >= 900.0) t = 0;
  else t += 0.5; //0.2;
}

function keyPressed() {
  if (keyCode == ENTER) {
    t += 5;
    redraw();
  }
  if (key == "r") loop();
  if (key == "s") noLoop();
}

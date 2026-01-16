const spacing = 10;
const gridSizeX = 1000;
const gridSizeY = 1000;

function drawGrid() {
  background(220);
  stroke(230);
  strokeWeight(1);
  for (let x = 0; x <= width; x += spacing) line(x, 0, x, height);
  for (let y = 0; y <= height; y += spacing) line(0, y, width, y);
  stroke(0);  
}

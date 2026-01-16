function drawControlBoard() {
  drawStatus();
  drawSources();

  for (let circuitBreaker of circuitBreakers) {
    circuitBreaker.display();
  }

  for (let terminalBlock of terminalBlocks) {
    terminalBlock.display();
  }

  for (let baseBlock of baseBlocks) {
    baseBlock.display();
  }

  for (let contactor of contactors) {
    contactor.display();
  }

  for (let motor of motors) {
    motor.display();
  }

  for (let relay of relays) {
    relay.display();
  }

  for (let lamp of greenLamps) {
    lamp.display();
  }

  for (let lamp of redLamps) {
    lamp.display();
  }

  for (let button of redPushButtons) {
    button.display();
  }

  for (let button of greenPushButtons) {
    button.display();
  }

  for (let wire of wires) {
    wire.display();
  }

  for (let timer of timers) {
    timer.display();
  }

  let x = relativeCoordinates().x;
  let y = relativeCoordinates().y;

  if (currentDevice) {
    currentDevice.update(x, y);
    // TODO: remove the need to
    // display all individual
    // devices from above
    currentDevice.display();
  }

  if (currentRelay) {
    currentRelay.update(x, y);
  }

  if (currentTimer) {
    currentTimer.update(x, y);
  }
}

function drawSources() {
  fill(255);
  circle(phaseA.x, phaseA.y, 25);
  circle(phaseB.x, phaseB.y, 25);
  circle(phaseC.x, phaseC.y, 25);
  circle(neutral.x, neutral.y, 25);

  fill(200);
  noStroke();
  circle(phaseA.x, phaseA.y, 8);
  circle(phaseB.x, phaseB.y, 8);
  circle(phaseC.x, phaseC.y, 8);
  circle(neutral.x, neutral.y, 8);
  stroke(0);
  noFill();
}

function drawStatus() {
  fill(0);
  textAlign(CENTER);
  textSize(30);
  text(message, 400, 50);
  noFill();
  textSize(12);
}

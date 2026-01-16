let currentRelay = null;
let currentTimer = null;
let currentDevice = null;

let relayCounter = 0;
let timerCounter = 0;
let motorCounter = 0;
let redLampCounter = 0;
let baseBlockCounter = 0;
let contactorCounter = 0;
let greenLampCounter = 0;
let redPushButtonCounter = 0;
let terminalBlockCounter = 0;
let circuitBreakerCounter = 0;
let greenPushButtonCounter = 0;

let wires = [];
let motors = [];
let relays = [];
let timers = [];
let redLamps = [];
let auxiliarys = [];
let baseBlocks = [];
let contactors = [];
let greenLamps = [];
let allComponents = [];
let redPushButtons = [];
let terminalBlocks = [];
let circuitBreakers = [];
let greenPushButtons = [];

function isBounded() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}

function createBaseBlock() {
  if (isBounded()) {
    currentDevice = new BaseBlock(baseBlockCounter, mouseX, mouseY);
    baseBlocks.push(currentDevice);
    baseBlockCounter++;
  }
}

function createRelay() {
  if (isBounded()) {
    currentRelay = new Relay(relayCounter, mouseX, mouseY);
    relays.push(currentRelay);
    relayCounter++;
  }
}

function createTimer() {
  if (isBounded()) {
    currentTimer = new Timer(timerCounter, mouseX, mouseY);
    timers.push(currentTimer);
    timerCounter++;
  }
}

function createContactor() {
  if (isBounded()) {
    currentDevice = new Contactor(contactorCounter, mouseX, mouseY);
    contactors.push(currentDevice);
    contactorCounter++;
  }
}

function createMotor() {
  if (isBounded()) {
    currentDevice = new Motor(motorCounter, mouseX, mouseY);
    motors.push(currentDevice);
    motorCounter++;
  }
}

function createCircuitBreaker() {
  if (isBounded()) {
    currentDevice = new CircuitBreaker(circuitBreakerCounter, mouseX, mouseY);
    circuitBreakers.push(currentDevice);
    circuitBreakerCounter++;
  }
}

function createTerminalBlock() {
  if (isBounded()) {
    currentDevice = new TerminalBlock(terminalBlockCounter, mouseX, mouseY);
    terminalBlocks.push(currentDevice);
    terminalBlockCounter++;
  }
}

function createGreenLamp() {
  if (isBounded()) {
    currentDevice = new GreenLamp(greenLampCounter, "Green", mouseX, mouseY);
    greenLamps.push(currentDevice);
    greenLampCounter++;
  }
}

function createRedLamp() {
  if (isBounded()) {
    currentDevice = new RedLamp(greenLampCounter, "Red", mouseX, mouseY);
    redLamps.push(currentDevice);
    redLampCounter++;
  }
}

function createGreenPushButton() {
  if (isBounded()) {
    currentDevice = new ControlPushButtonGreen(
      greenPushButtonCounter,
      mouseX,
      mouseY
    );
    greenPushButtons.push(currentDevice);
    greenPushButtonCounter++;
  }
}

function createRedPushButton() {
  if (isBounded()) {
    currentDevice = new ControlPushButtonRed(
      redPushButtonCounter,
      mouseX,
      mouseY
    );
    redPushButtons.push(currentDevice);
    redPushButtonCounter++;
  }
}

function deleteBaseBlock() {
  baseBlocks = baseBlocks.filter((baseBlock) => {
    if (baseBlock.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteRelay() {
  relays = relays.filter((relay) => {
    if (relay.isSelected()) {
      relay.releaseBaseBlock();
      return false;
    }
    return true;
  });
}

function deleteTimer() {
  timers = timers.filter((timer) => {
    if (timer.isSelected()) {
      timer.releaseBaseBlock();
      return false;
    }
    return true;
  });
}

function deleteContactor() {
  contactors = contactors.filter((contactor) => {
    if (contactor.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteMotor() {
  motors = motors.filter((motor) => {
    if (motor.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteCircuitBreaker() {
  circuitBreakers = circuitBreakers.filter((circuitBreaker) => {
    if (circuitBreaker.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteTerminalBlock() {
  terminalBlocks = terminalBlocks.filter((terminalBlock) => {
    if (terminalBlock.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteGreenLamp() {
  greenLamps = greenLamps.filter((lamp) => {
    if (lamp.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteRedLamp() {
  redLamps = redLamps.filter((lamp) => {
    if (lamp.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteGreenPushButton() {
  greenPushButtons = greenPushButtons.filter((pushButton) => {
    if (pushButton.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteRedPushButton() {
  redPushButtons = redPushButtons.filter((pushButton) => {
    if (pushButton.isSelected()) {
      return false;
    }
    return true;
  });
}

function relayUpdateContacts() {
  for (let relay of relays) {
    relay.updateContacts();
  }
}

function timerUpdateContacts() {
  for (let timer of timers) {
    timer.updateContacts();
  }
}

function contactorUpdateContacts() {
  for (let contactor of contactors) {
    contactor.updateContacts();
  }
}

function motorUpdateContacts() {
  for (let motor of motors) {
    motor.updateMotor();
  }
}

function terminatePlacement() {
  if (currentDevice !== null) {
    if (currentDevice instanceof BaseBlock) {
      baseBlockCounter--;
      baseBlocks.pop();
    }
    if (currentDevice instanceof Contactor) {
      contactorCounter--;
      contactors.pop();
    }
    if (currentDevice instanceof Motor) {
      motorCounter--;
      motors.pop();
    }
    if (currentDevice instanceof TerminalBlock) {
      terminalBlockCounter--;
      terminalBlocks.pop();
    }
    if (currentDevice instanceof CircuitBreaker) {
      circuitBreakerCounter--;
      circuitBreakers.pop();
    }
    if (currentDevice instanceof GreenLamp) {
      greenLampCounter--;
      greenLamps.pop();
    }
    if (currentDevice instanceof RedLamp) {
      redLampCounter--;
      redLamps.pop();
    }
    if (currentDevice instanceof ControlPushButtonGreen) {
      greenPushButtonCounter--;
      greenPushButtons.pop();
    }
    if (currentDevice instanceof ControlPushButtonRed) {
      redPushButtonCounter--;
      redPushButtons.pop();
    }
    currentDevice = null;
  }
  if (currentRelay !== null) {
    currentRelay = null;
    relayCounter--;
    relays.pop();
  }
  if (currentTimer !== null) {
    currentTimer = null;
    timerCounter--;
    timers.pop();
  }
}

function collectAllComponents() {
  if (motors.length > 0) {
    allComponents = allComponents.concat(motors);
  }
  if (relays.length > 0) {
    allComponents = allComponents.concat(relays);
  }
  if (timers.length > 0) {
    allComponents = allComponents.concat(timers);
  }
  if (auxiliarys.length > 0) {
    allComponents = allComponents.concat(auxiliarys);
  }
  if (baseBlocks.length > 0) {
    allComponents = allComponents.concat(baseBlocks);
  }
  if (contactors.length > 0) {
    allComponents = allComponents.concat(contactors);
  }
  if (terminalBlocks.length > 0) {
    allComponents = allComponents.concat(terminalBlocks);
  }
  if (circuitBreakers.length > 0) {
    allComponents = allComponents.concat(circuitBreakers);
  }
  if (greenLamps.length > 0) {
    allComponents = allComponents.concat(greenLamps);
  }
  if (redLamps.length > 0) {
    allComponents = allComponents.concat(redLamps);
  }
  if (greenPushButtons.length > 0) {
    allComponents = allComponents.concat(greenPushButtons);
  }
  if (redPushButtons.length > 0) {
    allComponents = allComponents.concat(redPushButtons);
  }
  //console.log("all list: ", allComponents);
}

function clearAllComponentList() {
  allComponents = [];
}

function removeComponentByReference(list, obj) {
  const index = list.indexOf(obj);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

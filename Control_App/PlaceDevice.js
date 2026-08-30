let currentRelay = null;
let currentTimer = null;
let currentDevice = null;
let currentAuxiliary = null;

let relayCounter = 0;
let timerCounter = 0;
let motorCounter = 0;
let lampCounter = 0;
let baseBlockCounter = 0;
let contactorCounter = 0;
let auxiliaryCounter = 0;
let jogButtonCounter = 0;
let canvasTextCounter = 0;
let redPushButtonCounter = 0;
let terminalBlockCounter = 0;
let circuitBreakerCounter = 0;
let selectorSwitchCounter = 0;
let greenPushButtonCounter = 0;
let thermalOverLoadCounter = 0;

let wires = [];
let motors = [];
let relays = [];
let timers = [];
let redLamps = [];
let baseBlocks = [];
let contactors = [];
let greenLamps = [];
let jogButtons = [];
let auxiliaries = [];
let canvasTexts = [];
let allComponents = [];
let redPushButtons = [];
let terminalBlocks = [];
let circuitBreakers = [];
let selectorSwitches = [];
let greenPushButtons = [];
let thermalOverLoads = [];

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
  console.log(motorCounter);
}

function createCircuitBreaker() {
  if (isBounded()) {
    currentDevice = new CircuitBreaker(circuitBreakerCounter, mouseX, mouseY);
    circuitBreakers.push(currentDevice);
    circuitBreakerCounter++;
  }
}

function createSelectorSwitch() {
  if (isBounded()) {
    currentDevice = new SelectorSwitch(selectorSwitchCounter, mouseX, mouseY);
    selectorSwitches.push(currentDevice);
    selectorSwitchCounter++;
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
    currentDevice = new GreenLamp(lampCounter, "Green", mouseX, mouseY);
    greenLamps.push(currentDevice);
    lampCounter++;
  }
}

function createRedLamp() {
  if (isBounded()) {
    // this was greenLampCounter previously
    currentDevice = new RedLamp(lampCounter, "Red", mouseX, mouseY);
    redLamps.push(currentDevice);
    lampCounter++;
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

function createJogButton() {
  if (isBounded()) {
    currentDevice = new JogButton(jogButtonCounter, mouseX, mouseY);
    jogButtons.push(currentDevice);
    jogButtonCounter++;
  }
}

function createThermalOverLoad() {
  if (isBounded()) {
    currentDevice = new ThermalOverLoad(thermalOverLoadCounter, mouseX, mouseY);
    thermalOverLoads.push(currentDevice);
    thermalOverLoadCounter++;
  }
}

function createAuxiliary() {
  if (isBounded()) {
    currentAuxiliary = new Auxiliary(auxiliaryCounter, mouseX, mouseY);
    auxiliaries.push(currentAuxiliary);
    auxiliaryCounter++;
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

function deleteSelectorSwitch() {
  selectorSwitches = selectorSwitches.filter((selectorSwitch) => {
    if (selectorSwitch.isSelected()) {
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

function deleteJogButton() {
  jogButtons = jogButtons.filter((jogButton) => {
    if (jogButton.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteThermalOverLoad() {
  thermalOverLoads = thermalOverLoads.filter((thermalOverload) => {
    if (thermalOverload.isSelected()) {
      return false;
    }
    return true;
  });
}

function deleteAuxiliary() {
  auxiliaries = auxiliaries.filter((auxiliary) => {
    if (auxiliary.isSelected()) {
      auxiliary.releaseContactor();
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

function auxiliaryUpdateContacts() {
  for (let auxiliary of auxiliaries) {
    auxiliary.updateContacts();
  }
}

// TODO: insert TOL update

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
    if (currentDevice instanceof SelectorSwitch) {
      selectorSwitchCounter--;
      selectorSwitches.pop();
    }
    if (currentDevice instanceof GreenLamp) {
      lampCounter--;
      greenLamps.pop();
    }
    if (currentDevice instanceof RedLamp) {
      lampCounter--;
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
    if (currentDevice instanceof JogButton) {
      jogButtonCounter--;
      jogButtons.pop();
    }
    if (currentDevice instanceof CanvasText) {
      canvasTextCounter--;
      canvasTexts.pop();
    }
    if (currentDevice instanceof ThermalOverLoad) {
      thermalOverLoadCounter--;
      ThermalOverLoads.pop();
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
  if (currentAuxiliary !== null) {
    currentAuxiliary = null;
    auxiliaryCounter--;
    auxiliaries.pop();
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
  if (selectorSwitches.length > 0) {
    allComponents = allComponents.concat(selectorSwitches);
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
  if (jogButtons.length > 0) {
    allComponents = allComponents.concat(jogButtons);
  }
  if (canvasTexts.length > 0) {
    allComponents = allComponents.concat(canvasTexts);
  }
  if (thermalOverLoads.length > 0) {
    allComponents = allComponents.concat(thermalOverLoads);
  }
  if (auxiliaries.length > 0) {
    allComponents = allComponents.concat(auxiliaries);
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

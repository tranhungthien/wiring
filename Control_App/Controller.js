function controller() {
  switch (state) {
    case "SELECT":
      message = "Main";
      break;
    case "WIRING":
      message = "Wiring";
      drawWire();
      drawGuide();
      break;
    case "TERMINATE_WIRE":
      terminateWiring();
      state = "SELECT";
      done = true;
      break;
    case "CIRCUIT_BREAKER":
      createCircuitBreaker();
      state = "PLACE_DEVICE";
      break;
    case "SELECTOR_SWITCH":
      createSelectorSwitch();
      state = "PLACE_DEVICE";
      break;
    case "BASE_BLOCK":
      createBaseBlock();
      state = "PLACE_DEVICE";
      break;
    case "TERMINAL_BLOCK":
      createTerminalBlock();
      state = "PLACE_DEVICE";
      break;
    case "RELAY":
      createRelay();
      state = "PLACE_DEVICE";
      break;
    case "CONTACTOR":
      createContactor();
      state = "PLACE_DEVICE";
      break;
    case "MOTOR":
      createMotor();
      state = "PLACE_DEVICE";
      break;
    case "TIMER":
      createTimer();
      state = "PLACE_DEVICE";
      break;
    case "GREEN_LAMP":
      createGreenLamp();
      state = "PLACE_DEVICE";
      break;
    case "RED_LAMP":
      createRedLamp();
      state = "PLACE_DEVICE";
      break;
    case "GREEN_PUSH_BUTTON":
      createGreenPushButton();
      state = "PLACE_DEVICE";
      break;
    case "RED_PUSH_BUTTON":
      createRedPushButton();
      state = "PLACE_DEVICE";
      break;
    case "JOG_BUTTON":
      createJogButton();
      state = "PLACE_DEVICE";
      break;
    case "THERMAL_OVERLOAD":
      createThermalOverLoad();
      state = "PLACE_DEVICE";
      break;
    case "AUXILIARY":
      //message = "Auxiliary";
      createAuxiliary();
      state = "PLACE_DEVICE";
      break;
    case "PLACE_DEVICE":
      message = "Place Selection";
      break;
    case "INIT_SIMULATOR":
      message = "Simulator";
      initializeSimulation();
      state = "SIMULATE";
      break;
    case "TEXT_LABEL":
      createCanvasText();
      state = "PLACE_DEVICE";
      break;
    case "SIMULATE":
      message = "Running";
      simulate();
      relayUpdateContacts();
      timerUpdateContacts();
      motorUpdateContacts();
      contactorUpdateContacts();
      auxiliaryUpdateContacts();
      // need to put an end simulate where
      // it reset all components
      break;
    default:
      break;
  }
}

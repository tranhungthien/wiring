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
    case "AUXILIARY":
      message = "Auxiliary";
      break;
    case "PLACE_DEVICE":
      message = "Place Device";
      break;
    case "INIT_SIMULATOR":
      message = "Simulator";
      initializeSimulation();
      state = "SIMULATE";
      break;
    case "SIMULATE":
      message = "simulate";
      simulate();
      relayUpdateContacts();
      timerUpdateContacts();
      motorUpdateContacts();
      contactorUpdateContacts();
      break;
    default:
      break;
  }
}

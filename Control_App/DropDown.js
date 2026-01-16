let stateDropDownMenu = "";
let placementMenu;
let simulatorMenu;
let contextMenu;
let wiringMenu;
let undo;

function dropDown(canvas) {
  // Prevent the default context menu from appearing on right-click
  canvas.elt.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    // Show our custom context menu
    if (state == "SELECT") {
      showContextMenu(e);
    }
    if (state == "WIRING") {
      showWiringMenu(e);
    }
    if (state == "SIMULATE") {
      showSimulationMenu(e);
    }
  });
  //===============================================
  //                Context Menu
  //===============================================
  contextMenu = createDiv();
  contextMenu.style("boxShadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
  contextMenu.style("background-color", "#fff");
  contextMenu.style("border", "1px solid #C5CAE9");
  contextMenu.style("border-radius", "8px");
  contextMenu.style("position", "absolute");
  contextMenu.style("font-family", "Arial");
  contextMenu.style("color", "#424242");
  contextMenu.style("padding", "10px");
  contextMenu.hide();
  //-----------------------------------------------
  let wireOption = createDiv("Wiring &emsp;&emsp;&emsp;<b>w</b>");
  wireOption.style("padding", "5px");
  wireOption.mousePressed(() => {
    stateDropDownMenu = "wiring";
    contextMenu.hide();
  });
  // Highlight on hover
  wireOption.mouseOver(() => wireOption.style("background-color", "#e0e0e0"));
  // Revert on mouse out
  wireOption.mouseOut(() => wireOption.style("background-color", "#fff"));
  contextMenu.child(wireOption);
  //-----------------------------------------------

  let circuitBreakerOption = createDiv("CCT Breaker &nbsp;<b>c</b>");
  circuitBreakerOption.style("padding", "5px");
  circuitBreakerOption.mousePressed(() => {
    state = "CIRCUIT_BREAKER";
    done = false;
    contextMenu.hide();
  });
  circuitBreakerOption.mouseOver(() =>
    circuitBreakerOption.style("background-color", "#e0e0e0")
  );
  circuitBreakerOption.mouseOut(() =>
    circuitBreakerOption.style("background-color", "#fff")
  );
  contextMenu.child(circuitBreakerOption);
  //-----------------------------------------------

  let baseBlockOption = createDiv("Base Block &ensp;&thinsp; <b>b</b>");
  baseBlockOption.style("padding", "5px");
  baseBlockOption.mousePressed(() => {
    state = "BASE_BLOCK";
    done = false;
    contextMenu.hide();
  });
  baseBlockOption.mouseOver(() =>
    baseBlockOption.style("background-color", "#e0e0e0")
  );
  baseBlockOption.mouseOut(() =>
    baseBlockOption.style("background-color", "#fff")
  );
  contextMenu.child(baseBlockOption);
  //-----------------------------------------------

  let relayOption = createDiv("Relay &emsp;&emsp;&emsp;&nbsp; <b>r</b>");
  relayOption.style("padding", "5px");
  relayOption.mousePressed(() => {
    if (baseBlocks.length >= relays.length + timers.length + 1) {
      state = "RELAY";
      done = false;
    }
    contextMenu.hide();
  });
  relayOption.mouseOver(() => relayOption.style("background-color", "#e0e0e0"));
  relayOption.mouseOut(() => relayOption.style("background-color", "#fff"));
  contextMenu.child(relayOption);
  //-----------------------------------------------

  let timerOption = createDiv("Timer &emsp;&emsp;&emsp;&nbsp; <b>t</b>");
  timerOption.style("padding", "5px");
  timerOption.mousePressed(() => {
    if (baseBlocks.length >= relays.length + timers.length + 1) {
      state = "TIMER";
      done = false;
    }
    contextMenu.hide();
  });
  timerOption.mouseOver(() => timerOption.style("background-color", "#e0e0e0"));
  timerOption.mouseOut(() => timerOption.style("background-color", "#fff"));
  contextMenu.child(timerOption);
  //-----------------------------------------------

  let contactorOption = createDiv("Contactor &emsp;&nbsp; <b>c</b>");
  contactorOption.style("padding", "5px");
  contactorOption.mousePressed(() => {
    state = "CONTACTOR";
    done = false;
    contextMenu.hide();
  });
  contactorOption.mouseOver(() =>
    contactorOption.style("background-color", "#e0e0e0")
  );
  contactorOption.mouseOut(() =>
    contactorOption.style("background-color", "#fff")
  );
  contextMenu.child(contactorOption);
  //-----------------------------------------------

  let motorOption = createDiv("Motor &emsp;&emsp;&emsp;&thinsp;<b>m</b>");
  motorOption.style("padding", "5px");
  motorOption.mousePressed(() => {
    state = "MOTOR";
    done = false;
    contextMenu.hide();
  });
  motorOption.mouseOver(() => motorOption.style("background-color", "#e0e0e0"));
  motorOption.mouseOut(() => motorOption.style("background-color", "#fff"));
  contextMenu.child(motorOption);
  //-----------------------------------------------

  let greenPushButtonOption = createDiv("Start Button &emsp;");
  greenPushButtonOption.style("padding", "5px");
  greenPushButtonOption.mousePressed(() => {
    state = "GREEN_PUSH_BUTTON";
    done = false;
    contextMenu.hide();
  });
  greenPushButtonOption.mouseOver(() =>
    greenPushButtonOption.style("background-color", "#e0e0e0")
  );
  greenPushButtonOption.mouseOut(() =>
    greenPushButtonOption.style("background-color", "#fff")
  );
  contextMenu.child(greenPushButtonOption);
  //-----------------------------------------------

  let redPushButtonOption = createDiv("Stop Button &emsp;");
  redPushButtonOption.style("padding", "5px");
  redPushButtonOption.mousePressed(() => {
    state = "RED_PUSH_BUTTON";
    done = false;
    contextMenu.hide();
  });
  redPushButtonOption.mouseOver(() =>
    redPushButtonOption.style("background-color", "#e0e0e0")
  );
  redPushButtonOption.mouseOut(() =>
    redPushButtonOption.style("background-color", "#fff")
  );
  contextMenu.child(redPushButtonOption);
  //-----------------------------------------------

  let greenLampOption = createDiv("Green Lamp &emsp;");
  greenLampOption.style("padding", "5px");
  greenLampOption.mousePressed(() => {
    state = "GREEN_LAMP";
    done = false;
    contextMenu.hide();
  });
  greenLampOption.mouseOver(() =>
    greenLampOption.style("background-color", "#e0e0e0")
  );
  greenLampOption.mouseOut(() =>
    greenLampOption.style("background-color", "#fff")
  );
  contextMenu.child(greenLampOption);
  //-----------------------------------------------

  let redLampOption = createDiv("Red Lamp &emsp;");
  redLampOption.style("padding", "5px");
  redLampOption.mousePressed(() => {
    state = "RED_LAMP";
    done = false;
    contextMenu.hide();
  });
  redLampOption.mouseOver(() =>
    redLampOption.style("background-color", "#e0e0e0")
  );
  redLampOption.mouseOut(() => redLampOption.style("background-color", "#fff"));
  contextMenu.child(redLampOption);
  //-----------------------------------------------

  let deleteOption = createDiv("Delete &emsp;&emsp;&emsp;<b>d</b>");
  deleteOption.style("padding", "5px");
  deleteOption.mousePressed(() => {
    deleteGreenPushButton();
    deleteCircuitBreaker();
    deleteTerminalBlock();
    deleteRedPushButton();
    deleteGreenLamp();
    deleteBaseBlock();
    deleteContactor();
    deleteRedLamp();
    deleteRelay();
    deleteTimer();
    deleteMotor();
    deleteWire();
    currentDevice = null;
    contextMenu.hide();
  });
  deleteOption.mouseOver(() =>
    deleteOption.style("background-color", "#e0e0e0")
  );
  deleteOption.mouseOut(() => deleteOption.style("background-color", "#fff"));
  contextMenu.child(deleteOption);
  //-----------------------------------------------

  let simulateOption = createDiv("Simulate &emsp;&emsp;<b>s</b>");
  simulateOption.style("padding", "5px");
  simulateOption.mousePressed(() => {
    state = "INIT_SIMULATOR";
    done = false;
    contextMenu.hide();
  });
  simulateOption.mouseOver(() =>
    simulateOption.style("background-color", "#e0e0e0")
  );
  simulateOption.mouseOut(() =>
    simulateOption.style("background-color", "#fff")
  );
  contextMenu.child(simulateOption);

  //===============================================
  //                Wiring Menu
  //===============================================
  wiringMenu = createDiv();
  wiringMenu.style("boxShadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
  wiringMenu.style("position", "absolute");
  wiringMenu.style("background-color", "#fff");
  wiringMenu.style("border", "1px solid #C5CAE9");
  wiringMenu.style("border-radius", "8px");
  wiringMenu.style("font-family", "Arial");
  wiringMenu.style("color", "#424242");
  wiringMenu.style("padding", "10px");
  wiringMenu.hide();

  let wiringTerminateOption = createDiv("Terminate &nbsp; <b>e</b>");
  wiringTerminateOption.style("padding", "5px");
  wiringTerminateOption.mousePressed(() => {
    //stateDropDownMenu = "terminateWire";
    terminateWiring();
    state = "SELECT";
    done = true;
  });
  wiringTerminateOption.mouseOver(() =>
    wiringTerminateOption.style("background-color", "#e0e0e0")
  );
  wiringTerminateOption.mouseOut(() =>
    wiringTerminateOption.style("background-color", "#fff")
  );
  wiringMenu.child(wiringTerminateOption);

  let undoWireOption = createDiv(
    "Undo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>d</b>"
  );
  undoWireOption.style("padding", "5px");
  undoWireOption.mousePressed(() => {
    eraseLineSegment();
    undo = true;
    wiringMenu.hide();
  });
  undoWireOption.mouseOver(() =>
    undoWireOption.style("background-color", "#e0e0e0")
  );
  undoWireOption.mouseOut(() =>
    undoWireOption.style("background-color", "#fff")
  );
  wiringMenu.child(undoWireOption);
  //===============================================
  //              Placement Menu
  //===============================================
  placementMenu = createDiv();
  placementMenu.style("position", "absolute");
  placementMenu.style("background-color", "#fff");
  placementMenu.style("border", "1px solid #C5CAE9");
  placementMenu.style("padding", "10px");
  placementMenu.hide();

  //===============================================
  //              Simulator Menu
  //===============================================
  simulatorMenu = createDiv();
  simulatorMenu.style("boxShadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
  simulatorMenu.style("position", "absolute");
  simulatorMenu.style("background-color", "#fff");
  simulatorMenu.style("border", "1px solid #C5CAE9");
  simulatorMenu.style("border-radius", "8px");
  simulatorMenu.style("font-family", "Arial");
  simulatorMenu.style("color", "#424242");
  simulatorMenu.style("padding", "10px");
  simulatorMenu.hide();

  let endSimulationOption = createDiv("End Simulation &nbsp; <b>e</b>");
  endSimulationOption.style("padding", "5px");
  endSimulationOption.mousePressed(() => {
    endSimulation();
    for (const timer of timers) {
      timer.reset();
    }
    state = "SELECT";
    done = true;
    simulatorMenu.hide();
  });
  endSimulationOption.mouseOver(() =>
    endSimulationOption.style("background-color", "#e0e0e0")
  );
  endSimulationOption.mouseOut(() =>
    endSimulationOption.style("background-color", "#fff")
  );
  simulatorMenu.child(endSimulationOption);
}

function showContextMenu(event) {
  contextMenu.position(event.pageX, event.pageY);
  contextMenu.show();
}

function showWiringMenu() {
  wiringMenu.position(event.pageX, event.pageY);
  wiringMenu.show();
}

function showSimulationMenu() {
  simulatorMenu.position(event.pageX, event.pageY);
  simulatorMenu.show();
}

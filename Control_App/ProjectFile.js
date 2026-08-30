// ======================================================================
// ProjectFile.js
// Save and load Control_App projects as JSON files.
//
// Public functions:
//   saveProject()
//   openProjectFile()
//   loadProject(projectData)
//   clearProject()
//
// File format version: 1
// ======================================================================

const PROJECT_FILE_VERSION = 1;
const PROJECT_APP_NAME = "Control_App";

// ======================================================================
// SAVE
// ======================================================================

function saveProject() {
  try {
    // Do not save a half-placed device or unfinished wire.
    if (
      !done ||
      currentDevice !== null ||
      currentRelay !== null ||
      currentTimer !== null
    ) {
      console.warn("Finish placing the current device before saving.");
      alert("Finish placing the current device before saving.");
      return;
    }

    if (currentWire.length > 0) {
      console.warn("Finish or cancel the current wire before saving.");
      alert("Finish or cancel the current wire before saving.");
      return;
    }

    const project = serializeProject();

    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = createProjectFileName();

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    console.log("Project saved:", project);
  } catch (error) {
    console.error("Unable to save project:", error);
    alert("Unable to save project.");
  }
}

function serializeProject() {
  return {
    version: PROJECT_FILE_VERSION,
    app: PROJECT_APP_NAME,

    savedAt: new Date().toISOString(),

    view: serializeView(),

    components: {
      baseBlocks: baseBlocks.map(serializeBaseBlock),
      relays: relays.map(serializeRelay),
      timers: timers.map(serializeTimer),
      contactors: contactors.map(serializeContactor),
      motors: motors.map(serializeMotor),
      circuitBreakers: circuitBreakers.map(serializeCircuitBreaker),
      terminalBlocks: terminalBlocks.map(serializeTerminalBlock),
      greenLamps: greenLamps.map(serializeGreenLamp),
      redLamps: redLamps.map(serializeRedLamp),
      greenPushButtons: greenPushButtons.map(serializeGreenPushButton),
      redPushButtons: redPushButtons.map(serializeRedPushButton),
      canvasTexts: canvasTexts.map(serializeCanvasText),
      thermalOverLoads: thermalOverLoads.map(serializeThermalOverLoad),
      auxiliaries: auxiliaries.map(serializeAuxiliary),
      jogButtons: jogButtons.map(serializeJogButton),
      selectorSwitches: selectorSwitches.map(serializeSelectorSwitch),
    },

    wires: wires.map(serializeWire),
  };
}

// ======================================================================
// SERIALIZERS
// ======================================================================

function serializePlaceable(component) {
  return {
    id: component.id,
    x: component.x,
    y: component.y,
    placed: component.placed,
  };
}

function serializeBaseBlock(baseBlock) {
  return {
    ...serializePlaceable(baseBlock),
  };
}

function serializeRelay(relay) {
  return {
    ...serializePlaceable(relay),

    // Store the BaseBlock relationship by ID instead of attempting
    // to save the object reference.
    baseBlockId: relay.baseBlock ? relay.baseBlock.id : null,
  };
}

function serializeTimer(timer) {
  return {
    ...serializePlaceable(timer),
    baseBlockId: timer.baseBlock ? timer.baseBlock.id : null,
  };
}

function serializeAuxiliary(auxiliary) {
  return {
    ...serializePlaceable(auxiliary),
    contactorID: auxiliary.contactor ? auxiliary.contactor.id : null,
  };
}

function serializeContactor(contactor) {
  return {
    ...serializePlaceable(contactor),
  };
}

function serializeMotor(motor) {
  return {
    ...serializePlaceable(motor),
  };
}

function serializeCircuitBreaker(circuitBreaker) {
  return {
    ...serializePlaceable(circuitBreaker),

    // This preserves the breaker switch position.
    flip: circuitBreaker.flip,
  };
}

function serializeSelectorSwitch(selectorSwitch) {
  return {
    ...serializePlaceable(selectorSwitch),
    // This preserves the breaker switch position.
    flip: selectorSwitch.flip,
  };
}

function serializeTerminalBlock(terminalBlock) {
  return {
    ...serializePlaceable(terminalBlock),
  };
}

function serializeGreenLamp(lamp) {
  return {
    ...serializePlaceable(lamp),
    colour: lamp.colour,
  };
}

function serializeRedLamp(lamp) {
  return {
    ...serializePlaceable(lamp),
    colour: lamp.colour,
  };
}

function serializeGreenPushButton(button) {
  return {
    ...serializePlaceable(button),
  };
}

function serializeRedPushButton(button) {
  return {
    ...serializePlaceable(button),
  };
}

function serializeJogButton(button) {
  return {
    ...serializePlaceable(button),
  };
}

function serializeThermalOverLoad(thermalOverLoad) {
  return {
    ...serializePlaceable(thermalOverLoad),
  };
}

function serializeWire(wire) {
  return {
    id: wire.id,

    vertices: wire.wire.map((vertex) => ({
      x: vertex.x,
      y: vertex.y,
    })),
  };
}

function serializeCanvasText(item) {
  return {
    id: item.id,
    value: item.value,
    x: item.x,
    y: item.y,
    fontSize: item.fontSize,
    colour: item.colour,
    placed: item.placed,
  };
}

function serializeView() {
  return {
    scaling: scaling,

    offset: {
      x: offset ? offset.x : 0,
      y: offset ? offset.y : 0,
    },
  };
}

// ======================================================================
// OPEN FILE
// ======================================================================

function openProjectFile() {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = ".json,application/json";

  input.addEventListener("change", async function () {
    const file = input.files && input.files[0];

    if (!file) return;

    try {
      const text = await file.text();
      const projectData = JSON.parse(text);

      validateProjectFile(projectData);

      loadProject(projectData);

      console.log("Project loaded:", file.name);
    } catch (error) {
      console.error("Unable to load project:", error);

      alert(
        "Unable to open this project file.\n\n" +
          (error.message || "The file may be invalid.")
      );
    }
  });

  input.click();
}

// ======================================================================
// VALIDATION
// ======================================================================

function validateProjectFile(project) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project file.");
  }

  if (project.app !== PROJECT_APP_NAME) {
    throw new Error("This file is not a Control_App project.");
  }

  if (project.version === undefined) {
    throw new Error("Project file does not contain a version number.");
  }

  if (project.version > PROJECT_FILE_VERSION) {
    throw new Error(
      "This project was created by a newer version of Control_App."
    );
  }

  if (!project.components || typeof project.components !== "object") {
    throw new Error("Project file contains no component data.");
  }

  if (!Array.isArray(project.wires)) {
    throw new Error("Project file contains invalid wire data.");
  }
}

// ======================================================================
// LOAD
// ======================================================================

function loadProject(project) {
  // ----------------------------------------------------------
  // Pass 0:
  // Remove everything from the existing project.
  // ----------------------------------------------------------

  clearProject();

  const components = project.components || {};

  // ----------------------------------------------------------
  // Pass 1:
  // Create BaseBlocks first.
  //
  // Relay and Timer objects need these later.
  // ----------------------------------------------------------

  baseBlocks = loadArray(components.baseBlocks, (data) => {
    const component = new BaseBlock(data.id, data.x, data.y);

    restorePlaceable(component, data);

    return component;
  });

  canvasTexts = loadArray(components.canvasTexts, (data) => {
    const item = new CanvasText(
      data.id,
      data.value,
      data.x,
      data.y,
      data.fontSize || 18,
      data.colour || "#000000"
    );

    item.placed = true;
    item.selected = false;

    return item;
  });
  // ----------------------------------------------------------
  // Pass 2:
  // Create ordinary independent devices.
  // ----------------------------------------------------------

  contactors = loadArray(components.contactors, (data) => {
    const component = new Contactor(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  motors = loadArray(components.motors, (data) => {
    const component = new Motor(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  circuitBreakers = loadArray(components.circuitBreakers, (data) => {
    const component = new CircuitBreaker(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    // Restore physical breaker position.
    if (data.flip === true) {
      component.flip = true;
      component.setContact(true);
    } else {
      component.flip = false;
      component.setContact(false);
    }

    return component;
  });

  selectorSwitches = loadArray(components.selectorSwitches, (data) => {
    const component = new SelectorSwitch(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    // Restore physical breaker position.
    // if (data.flip === true) {
    //   component.flip = true;
    //   component.setContact(true);
    // } else {
    //   component.flip = false;
    //   component.setContact(false);
    // }

    return component;
  });

  terminalBlocks = loadArray(components.terminalBlocks, (data) => {
    const component = new TerminalBlock(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  greenLamps = loadArray(components.greenLamps, (data) => {
    const component = new GreenLamp(
      data.id,
      data.colour || "Green",
      data.x,
      data.y
    );

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  redLamps = loadArray(components.redLamps, (data) => {
    const component = new RedLamp(
      data.id,
      data.colour || "Red",
      data.x,
      data.y
    );

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  greenPushButtons = loadArray(components.greenPushButtons, (data) => {
    const component = new ControlPushButtonGreen(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  redPushButtons = loadArray(components.redPushButtons, (data) => {
    const component = new ControlPushButtonRed(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  jogButtons = loadArray(components.jogButtons, (data) => {
    const component = new JogButton(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  thermalOverLoads = loadArray(components.thermalOverLoads, (data) => {
    const component = new ThermalOverLoad(data.id, data.x, data.y);

    restorePlaceable(component, data);
    component.assignContacts();

    return component;
  });

  // ----------------------------------------------------------
  // Pass 3:
  // Restore Relay/BaseBlock and Timer/BaseBlock relationships.
  // ----------------------------------------------------------

  relays = loadArray(components.relays, (data) => {
    const relay = new Relay(data.id, data.x, data.y);
    const baseBlock = findBaseBlockById(data.baseBlockId);

    if (baseBlock) {
      relay.snapToBase(baseBlock);
    } else {
      restorePlaceable(relay, data);
    }
    relay.assignContacts();
    return relay;
  });

  timers = loadArray(components.timers, (data) => {
    const timer = new Timer(data.id, data.x, data.y);
    const baseBlock = findBaseBlockById(data.baseBlockId);

    if (baseBlock) {
      timer.snapToBase(baseBlock);
    } else {
      restorePlaceable(timer, data);
    }
    timer.assignContacts();
    return timer;
  });

  auxiliaries = loadArray(components.auxiliaries, (data) => {
    const auxiliary = new Auxiliary(data.id, data.x, data.y);
    const contactor = findContactorById(data.contactorID);

    if (auxiliary) {
      auxiliary.snapToBase(contactor);
    } else {
      restorePlaceable(auxiliary, data);
    }
    auxiliary.assignContacts();
    return auxiliary;
  });

  // ----------------------------------------------------------
  // Pass 4:
  // Reconstruct wires using real Vertex and Wire objects.
  // ----------------------------------------------------------

  wires = loadArray(project.wires, (data) => {
    if (!Array.isArray(data.vertices) || data.vertices.length < 2) {
      throw new Error(`Wire ${data.id} does not contain enough vertices.`);
    }

    const vertices = data.vertices.map(
      (vertex) => new Vertex(vertex.x, vertex.y)
    );

    return new Wire(data.id, vertices);
  });

  // ----------------------------------------------------------
  // Pass 5:
  // Restore zoom/pan.
  // ----------------------------------------------------------

  restoreView(project.view);

  // ----------------------------------------------------------
  // Pass 6:
  // Restore counters.
  //
  // This prevents newly created devices from reusing an ID
  // that already exists in the loaded project.
  // ----------------------------------------------------------

  rebuildProjectCounters();

  // ----------------------------------------------------------
  // Reset transient application state.
  // ----------------------------------------------------------

  currentDevice = null;
  currentRelay = null;
  currentTimer = null;

  currentWire = [];
  currentWireState = false;

  allComponents = [];

  state = "SELECT";
  message = "Main";
  done = true;
}

// ======================================================================
// LOAD HELPERS
// ======================================================================

function loadArray(array, factory) {
  if (!Array.isArray(array)) return [];

  return array.map(factory);
}

function restorePlaceable(component, data) {
  component.x = data.x;
  component.y = data.y;

  // Anything persisted in a project should normally already
  // have been placed.
  component.placed = data.placed === undefined ? true : Boolean(data.placed);

  component.selected = false;
}

function findBaseBlockById(id) {
  if (id === null || id === undefined) return null;
  return baseBlocks.find((baseBlock) => baseBlock.id === id) || null;
}

function findContactorById(id) {
  if (id === null || id === undefined) return null;
  return contactors.find((contactor) => contactor.id === id) || null;
}

// ======================================================================
// VIEW
// ======================================================================

function restoreView(view) {
  if (!view) return;

  if (
    typeof view.scaling === "number" &&
    Number.isFinite(view.scaling) &&
    view.scaling > 0
  ) {
    scaling = view.scaling;
  }

  if (view.offset && offset) {
    if (typeof view.offset.x === "number" && Number.isFinite(view.offset.x)) {
      offset.x = view.offset.x;
    }

    if (typeof view.offset.y === "number" && Number.isFinite(view.offset.y)) {
      offset.y = view.offset.y;
    }
  }
}

// ======================================================================
// COUNTERS
// ======================================================================

function rebuildProjectCounters() {
  baseBlockCounter = nextId(baseBlocks);
  relayCounter = nextId(relays);
  timerCounter = nextId(timers);
  contactorCounter = nextId(contactors);
  motorCounter = nextId(motors);
  circuitBreakerCounter = nextId(circuitBreakers);
  terminalBlockCounter = nextId(terminalBlocks);
  greenLampCounter = nextId(greenLamps);
  redLampCounter = nextId(redLamps);
  greenPushButtonCounter = nextId(greenPushButtons);
  redPushButtonCounter = nextId(redPushButtons);
  thermalOverLoadCounter = nextId(thermalOverLoads);
  wireCounter = nextId(wires);
  auxiliaryCounter = nextId(auxiliaries);
  jogButtonCounter = nextId(jogButtons);
  selectorSwitchCounter = nextId(selectorSwitches);
}

function nextId(items) {
  if (!items || items.length === 0) {
    return 0;
  }

  let highestId = -1;

  for (const item of items) {
    const id = Number(item.id);

    if (Number.isFinite(id)) {
      highestId = Math.max(highestId, id);
    }
  }

  return highestId + 1;
}

// ======================================================================
// CLEAR PROJECT
// ======================================================================

function clearProject() {
  // Stop any temporary placement/wiring operation.
  currentDevice = null;
  currentRelay = null;
  currentTimer = null;

  currentWire = [];
  currentWireState = false;

  // Clear component collections.
  wires = [];
  motors = [];
  relays = [];
  timers = [];
  redLamps = [];
  auxiliaries = [];
  baseBlocks = [];
  jogButtons = [];
  contactors = [];
  greenLamps = [];
  allComponents = [];
  redPushButtons = [];
  terminalBlocks = [];
  circuitBreakers = [];
  selectorSwitches = [];
  greenPushButtons = [];

  // Reset counters.
  wireCounter = 0;
  motorCounter = 0;
  relayCounter = 0;
  timerCounter = 0;
  redLampCounter = 0;
  auxiliaryCounter = 0;
  baseBlockCounter = 0;
  contactorCounter = 0;
  greenLampCounter = 0;
  jogButtonCounter = 0;
  redPushButtonCounter = 0;
  terminalBlockCounter = 0;
  selectorSwitchCounter = 0;
  circuitBreakerCounter = 0;
  greenPushButtonCounter = 0;

  state = "SELECT";
  message = "Main";
  done = true;
}

// ======================================================================
// FILE NAME
// ======================================================================

function createProjectFileName() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `control-project-${year}-${month}-${day}-${hours}${minutes}.json`;
}

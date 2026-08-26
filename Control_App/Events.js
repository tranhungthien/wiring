let draggedComponent = null;

function mousePressed() {
  if (state == "WIRING" && !done && mouseButton == LEFT && !undo) {
    snapWireToGrid();
    addWirePoint();
  }
  // 'undo' global variable found in DropDown.js
  undo = false;
  let x = relativeCoordinates().x;
  let y = relativeCoordinates().y;

  if (state == "SELECT" && done && mouseButton === LEFT && !keyIsDown(SHIFT)) {
    for (const wire of wires) {
      wire.select();
    }
    collectAllComponents();
    // Go backwards so objects drawn on top get priority.
    for (let i = allComponents.length - 1; i >= 0; i--) {
      const component = allComponents[i];

      if (component.isMouseOver(x, y)) {
        component.toggleSelection();

        if (component instanceof Movable && component.isSelected()) {
          draggedComponent = component;
          draggedComponent.startDragging(x, y);
        }
        break;
      }
    }
    clearAllComponentList();
  }

  if (state == "PLACE_DEVICE" && !done) {
    collectAllComponents();
    // TEMPORARY FIX: removeComponentByReference.
    // Issue: when device is created it is
    // added to its device list. This list gets concatenated
    // with allComponents
    let isCollision = false;
    if (currentDevice && !currentDevice.isPlaced()) {
      removeComponentByReference(allComponents, currentDevice);
      if (allComponents.length > 0) {
        for (let component of allComponents) {
          if (currentDevice.isColliding(component)) {
            isCollision = true;
            break;
          }
        }
      }
      if (!isCollision) {
        currentDevice.snapToGrid();
        currentDevice.assignContacts();
        currentDevice = null;
        state = "SELECT";
        done = true;
      }
    }
    if (currentRelay && !currentRelay.isPlaced()) {
      for (const baseBlock of baseBlocks) {
        if (baseBlock.isMouseOver(x, y)) {
          currentRelay.snapToBase(baseBlock);
          currentRelay.assignContacts();
          currentRelay = null;
          state = "SELECT";
          done = true;
        }
      }
    }
    if (currentTimer && !currentTimer.isPlaced()) {
      for (const baseBlock of baseBlocks) {
        if (baseBlock.isMouseOver(x, y)) {
          currentTimer.snapToBase(baseBlock);
          currentTimer.assignContacts();
          currentTimer = null;
          state = "SELECT";
          done = true;
        }
      }
    }
    //console.log("all list: ", allComponents);
    //console.log(isCollision);
    clearAllComponentList();
  }
  //=========================================================
  if (state == "SIMULATE" && !done) {
    for (const button of greenPushButtons) {
      if (button.isMouseOver(x, y)) {
        button.setButtonContact(true);
        button.setButtonPushed(true);
      }
    }
    for (const button of redPushButtons) {
      if (button.isMouseOver(x, y)) {
        button.setButtonContact(false);
        button.setButtonPushed(true);
      }
    }
    for (const circuitBreaker of circuitBreakers) {
      if (circuitBreaker.isMouseOver(x, y)) {
        circuitBreaker.updateContact();
      }
    }
  }
  //=========================================================
  //                     Zoom and Pan
  //=========================================================
  if (keyIsDown(SHIFT)) {
    //In ZoomAndPan.js
    isPanning = true;
  } else {
    //In ZoomAndPan.js
    panWithMouse();
  }
  //=========================================================
  //                     Dropdown Menu
  //=========================================================
  if (mouseButton !== RIGHT) {
    simulatorMenu.hide();
    contextMenu.hide();
    wiringMenu.hide();
    //placementMenu.hide();
  }
}

function mouseDragged() {
  if (keyIsDown(SHIFT)) return;
  if (state !== "SELECT" || !done) return;
  if (draggedComponent === null) return;

  const position = unsnappedRelativeCoordinates();
  draggedComponent.drag(position.x, position.y);
  return false;
}

function mouseReleased() {
  let x = relativeCoordinates().x;
  let y = relativeCoordinates().y;

  // ================ Finish component dragging ================
  if (draggedComponent !== null) {
    draggedComponent.stopDragging();

    // Snap final location to grid.
    draggedComponent.x = Math.round(draggedComponent.x / spacing) * spacing;
    draggedComponent.y = Math.round(draggedComponent.y / spacing) * spacing;
    //draggedComponent.selected = false;
    draggedComponent = null;
  }
  // =================== End Finish Dragging ===================

  if (state == "SIMULATE" && !done) {
    for (const button of greenPushButtons) {
      if (button.isMouseOver(x, y)) {
        button.setButtonContact(false);
        button.setButtonPushed(false);
      }
    }
    for (const button of redPushButtons) {
      if (button.isMouseOver(x, y)) {
        button.setButtonContact(true);
        button.setButtonPushed(false);
      }
    }
  }
  if (stateDropDownMenu == "wiring") {
    state = "WIRING";
    done = false;
  }
  stateDropDownMenu = "";
  //=========================================================
  //                     Zoom and Pan
  //=========================================================
  isPanning = false;
}

function keyPressed() {
  if (key === "s" && state == "SELECT" && done) {
    state = "INIT_SIMULATOR";
    done = false;
  }
  if (key === "a" && state == "SELECT" && done) {
    state = "AUXILIARY";
    done = false;
  }
  if (key === "b" && state == "SELECT" && done) {
    state = "BASE_BLOCK";
    done = false;
  }
  if (key === "c" && state == "SELECT" && done) {
    state = "CIRCUIT_BREAKER";
    done = false;
  }
  if (key === "k" && state == "SELECT" && done) {
    state = "CONTACTOR";
    done = false;
  }
  if (key === "m" && state == "SELECT" && done) {
    state = "MOTOR";
    done = false;
  }
  if (key === "v" && state == "SELECT" && done) {
    state = "TERMINAL_BLOCK";
    done = false;
  }
  if (key === "w" && state == "SELECT" && done) {
    state = "WIRING";
    done = false;
  }
  if (key === "r" && state == "SELECT" && done) {
    if (baseBlocks.length >= relays.length + timers.length + 1) {
      state = "RELAY";
      done = false;
    }
  }
  if (key === "t" && state == "SELECT" && done) {
    if (baseBlocks.length >= relays.length + timers.length + 1) {
      state = "TIMER";
      done = false;
    }
  }
  // ==================== modification ====================
  // if (key === "g" && state == "SELECT" && done) {
  //   if (baseBlocks.length >= relays.length + timers.length + 1) {
  //     saveProject();
  //     done = false;
  //   }
  // }
  if (
    keyIsDown(SHIFT) &&
    (key === "s" || key === "S") &&
    state == "SELECT" &&
    done
  ) {
    saveProject();
    done = true;
  }

  if (
    keyIsDown(SHIFT) &&
    (key === "o" || (key === "O" && state == "SELECT" && done))
  ) {
    openProjectFile();
    done = true;
  }

  if (
    keyIsDown(SHIFT) &&
    key.toLowerCase() === "t" &&
    state == "SELECT" &&
    done
  ) {
    state = "TEXT_LABEL";
    done = true;
  }
  // ================== End modification ==================

  if (
    (key === "d" || keyCode === DELETE || keyCode === BACKSPACE) &&
    state == "SELECT" &&
    done
  ) {
    deleteGreenPushButton();
    deleteCircuitBreaker();
    deleteTerminalBlock();
    deleteRedPushButton();
    deleteCanvasText();
    deleteGreenLamp();
    deleteBaseBlock();
    deleteContactor();
    deleteRedLamp();
    deleteRelay();
    deleteTimer();
    deleteMotor();
    deleteWire();
    currentDevice = null;
  }
  if (
    (key === "d" || keyCode === DELETE || keyCode === BACKSPACE) &&
    state == "WIRING"
  ) {
    eraseLineSegment();
  }
  if (key === "e" && state == "WIRING") {
    terminateWiring();
    state = "SELECT";
    done = true;
  }
  if (key === "e" && state == "SIMULATE") {
    endSimulation();
    for (const timer of timers) {
      timer.reset();
    }
    state = "SELECT";
    done = true;
  }
  if (key === "e" && state == "PLACE_DEVICE") {
    terminatePlacement();
    state = "SELECT";
    done = true;
  }
  if (key === "u") {
    scaling = 1;
    offset.set(0, 0);
  }
}

function keyReleased() {}

function doubleClicked() {
  if (state !== "SELECT" || !done) {
    return;
  }

  const position = relativeCoordinates();

  // Go backwards so the visually top-most text gets priority.
  for (let i = canvasTexts.length - 1; i >= 0; i--) {
    const item = canvasTexts[i];

    if (item.isMouseOver(position.x, position.y)) {
      item.edit();
      return false;
    }
  }
}


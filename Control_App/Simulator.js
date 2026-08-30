let phaseAToNeutral = [];
let phaseBToNeutral = [];
let phaseCToNeutral = [];
let phaseAToPhaseB = [];
let phaseAToPhaseC = [];
let phaseBToPhaseC = [];
let phasePaths = [];
let loadList = [];

function findAllPathsDFS(start, end, edges) {
  let stack = [[start, []]];
  let allPaths = [];

  while (stack.length > 0) {
    let [currentVertex, path] = stack.pop();

    if (currentVertex.equals(end)) {
      allPaths.push(path);
      continue;
    }
    for (let edge of edges) {
      if (edge.vertex1.equals(currentVertex) && !path.includes(edge)) {
        let newPath = path.slice();
        newPath.push(edge);
        stack.push([edge.vertex2, newPath]);
      } else if (edge.vertex2.equals(currentVertex) && !path.includes(edge)) {
        let newPath = path.slice();
        newPath.push(edge);
        stack.push([edge.vertex1, newPath]);
      }
    }
  }
  return allPaths;
}

function checkContinuity(vertexA, vertexB, edges) {
  let foundVertexA = false;
  let foundVertexB = false;
  let isContinuous = false;

  for (let edge of edges) {
    if (edge.vertex1.equals(vertexA) || edge.vertex2.equals(vertexA)) {
      foundVertexA = true;
    }
    if (edge.vertex1.equals(vertexB) || edge.vertex2.equals(vertexB)) {
      foundVertexB = true;
    }
    // If both vertices are found, we can stop searching
    if (foundVertexA && foundVertexB) {
      break;
    }
  }

  if (foundVertexA && foundVertexB) {
    // builtin JS method for array
    isContinuous = edges.every((edge) => edge.getContact());
  }
  return isContinuous;
}

function filterNonMotorLoads(source, path) {
  return path.filter((edge) => {
    if (/^[LRKT]/.test(edge.id)) {
      return true;
    }
    return false;
  });
}
//=======================================================

function filterMotorWindings(source, path) {
  let counter = 0;
  return path.filter((edge) => {
    if (/^M/.test(edge.id)) {
      if (edge.id.startsWith("M")) {
        counter++;
        edge.setFeed(source + counter);
      }
      return true;
    }
    return false;
  });
}

function isLoad(edge) {
  return /^[LRKTM]/.test(edge.id);
}

function isMotorWinding(edge) {
  return /^M\d+/.test(edge.id);
}

function forEachMotorPath(phasePaths, callback) {
  for (const motor in phasePaths) {
    const paths = phasePaths[motor];

    for (const source in paths) {
      const windingPaths = paths[source];

      for (let i = 0; i < windingPaths.length; i++) {
        const windingPath = windingPaths[i];

        callback(source, windingPath, motor);
      }
    }
  }
}

function getMotorId(edge) {
  const match = String(edge.id).match(/^M(\d+)/);
  return match ? "M" + match[1] : null;
}

function getMotorPaths(paths) {
  const motorPaths = {};

  for (const path of paths) {
    const loads = path.filter(isLoad);

    if (loads.length === 0) continue;

    // Reject any path containing a non-motor load.
    if (!loads.every(isMotorWinding)) continue;

    const ids = new Set(loads.map(getMotorId).filter(Boolean));

    // Path must belong to one motor only.
    if (ids.size !== 1) continue;

    const motorId = [...ids][0];

    if (!motorPaths[motorId]) {
      motorPaths[motorId] = [];
    }

    motorPaths[motorId].push(path);
  }

  return motorPaths;
}

function combineMotorPaths(phaseAToPhaseB, phaseAToPhaseC, phaseBToPhaseC) {
  const result = {};

  const phaseGroups = {
    AB: getMotorPaths(phaseAToPhaseB),
    AC: getMotorPaths(phaseAToPhaseC),
    BC: getMotorPaths(phaseBToPhaseC),
  };

  for (const phase in phaseGroups) {
    const motors = phaseGroups[phase];

    for (const motorId in motors) {
      if (!result[motorId]) {
        result[motorId] = {
          AB: [],
          AC: [],
          BC: [],
        };
      }
      result[motorId][phase] = motors[motorId];
    }
  }
  //console.log("in combineMotorPaths: ", result)
  return result;
}

//=======================================================

function simulatePath(source, paths, start, end) {
  if (paths.length == 0) return [];
  let livenList = [];
  for (let path of paths) {
    let isContinuous = false;
    let isLoadInPath = false;
    isContinuous = checkContinuity(start, end, path);
    isLoadInPath = path.find((edge) => /^[LRKTM]/.test(edge.getID()));
    // note: this allows two loads in a single path
    if (isContinuous && isLoadInPath) {
      let loads = filterNonMotorLoads(source, path);
      livenList = livenList.concat(loads);
    }
    if (isContinuous && !isLoadInPath) {
      return ["Short Circuit"];
    }
  }
  return livenList;
}

function simulateMotorWindingPath(phasePaths) {
  let livenList = [];
  forEachMotorPath(phasePaths, (source, windingPath) => {
    let feed = "";
    let end = "";

    if (source === "AB") {
      feed = phaseA;
      end = phaseB;
    }

    if (source === "AC") {
      feed = phaseA;
      end = phaseC;
    }

    if (source === "BC") {
      feed = phaseB;
      end = phaseC;
    }

    const isContinuous = checkContinuity(feed, end, windingPath);

    if (isContinuous) {
      const load = windingPath.filter((load) => load.hasOwnProperty("id"));

      livenList = livenList.concat(load);
    }
  });
  return livenList;
}

function initializeSimulation() {
  let allEdges = [];

  if (circuitBreakers.length != 0)
    for (const circuitBreaker of circuitBreakers) {
      allEdges = allEdges.concat(circuitBreaker.getEdge());
    }

  if (selectorSwitches.length != 0)
    for (const selectorSwitch of selectorSwitches) {
      allEdges = allEdges.concat(selectorSwitch.getEdge());
    }

  if (terminalBlocks.length != 0)
    for (const terminalBlock of terminalBlocks) {
      allEdges = allEdges.concat(terminalBlock.getEdge());
    }

  if (wires.length != 0)
    for (const wire of wires) {
      allEdges = allEdges.concat(wire);
    }

  if (greenPushButtons.length != 0)
    for (const button of greenPushButtons) {
      allEdges.push(button.getPushButton());
    }

  if (redPushButtons.length != 0)
    for (const button of redPushButtons) {
      allEdges.push(button.getPushButton());
    }

  if (jogButtons.length != 0)
    for (const button of jogButtons) {
      // Concat used to join array of arrays
      allEdges = allEdges.concat(button.getPushButton());
    }

  if (greenLamps.length != 0)
    for (const lamp of greenLamps) {
      allEdges.push(lamp.getLamp());
      loadList.push(lamp.getLamp());
    }

  if (redLamps.length != 0)
    for (const lamp of redLamps) {
      allEdges.push(lamp.getLamp());
      loadList.push(lamp.getLamp());
    }

  if (relays.length != 0)
    for (const relay of relays) {
      allEdges = allEdges.concat(relay.getEdges());
      loadList.push(relay.getCoil());
    }

  if (timers.length != 0)
    for (const timer of timers) {
      allEdges = allEdges.concat(timer.getEdges());
      loadList = loadList.concat(timer.getCoil());
    }

  if (contactors.length != 0)
    for (const contactor of contactors) {
      allEdges = allEdges.concat(contactor.getEdges());
      loadList.push(contactor.getCoil());
    }

  if (motors.length != 0)
    for (const motor of motors) {
      motor.updateWindingCoordinates();
      allEdges = allEdges.concat(motor.getWindings());
      loadList = loadList.concat(motor.getWindings());
    }

  if (thermalOverLoads.length != 0)
    for (const thermalOverLoad of thermalOverLoads) {
      allEdges = allEdges.concat(thermalOverLoad.getEdges());
      //loadList = loadList.concat(thermalOverLoad.getEdges());
    }

  if (auxiliaries.length != 0)
    for (const auxiliary of auxiliaries) {
      allEdges = allEdges.concat(auxiliary.getEdges());
    }

  if (allEdges.length == 0) return;
  //console.log(allEdges);
  
  phaseAToPhaseB = findAllPathsDFS(phaseA, phaseB, allEdges);
  phaseAToPhaseC = findAllPathsDFS(phaseA, phaseC, allEdges);
  phaseBToPhaseC = findAllPathsDFS(phaseB, phaseC, allEdges);

  phaseAToNeutral = findAllPathsDFS(phaseA, neutral, allEdges);
  phaseBToNeutral = findAllPathsDFS(phaseB, neutral, allEdges);
  phaseCToNeutral = findAllPathsDFS(phaseC, neutral, allEdges);

  // Get motor configuration i.e. star, delta, forward & reverse,
  // do once for each simulation.
  // The feed values resest at end of simulation
  phasePaths = combineMotorPaths(
    phaseAToPhaseB,
    phaseAToPhaseC,
    phaseBToPhaseC
  );

  forEachMotorPath(phasePaths, filterMotorWindings);
}

function simulate() {
  let livenList = [];
  // check for phased loads and short circuits
  livenList = livenList.concat(
    simulatePath("AB", phaseAToPhaseB, phaseA, phaseB)
  );
  livenList = livenList.concat(
    simulatePath("AC", phaseAToPhaseC, phaseA, phaseC)
  );
  livenList = livenList.concat(
    simulatePath("BC", phaseBToPhaseC, phaseB, phaseC)
  );
  livenList = livenList.concat(
    simulatePath("AN", phaseAToNeutral, phaseA, neutral)
  );
  livenList = livenList.concat(
    simulatePath("BN", phaseBToNeutral, phaseB, neutral)
  );
  livenList = livenList.concat(
    simulatePath("CN", phaseCToNeutral, phaseC, neutral)
  );

  // for motor windings
  livenList = livenList.concat(simulateMotorWindingPath(phasePaths));
  //console.log(livenList);

  if (livenList.includes("Short Circuit")) {
    message = "Short Circuit";
    return;
  }

  let toLiven = new Set(livenList.map((edge) => edge.id));

  loadList.forEach((load) => {
    if (toLiven.has(load.id)) {
      load.setState(true);
    } else {
      load.setState(false);
    }
  });
}

function endSimulation() {
  // Reset state
  loadList.forEach((load) => {
    load.setState(false);
    if (load.id?.startsWith("M")) {
      load.reset();
    }
  });
  loadList = [];
}

function troubleShoot() {
  //console.log("paths: ", paths);
  console.log("A-B: ", phaseAToPhaseB);
  console.log("A-C: ", phaseAToPhaseC);
  console.log("B-C: ", phaseBToPhaseC);
  console.log("A-N: ", phaseAToNeutral);
  console.log("B-N: ", phaseBToNeutral);
  console.log("C-N: ", phaseCToNeutral);
  console.log("loads: ", loadList);
  console.log();
}

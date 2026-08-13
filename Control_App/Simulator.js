let phaseAToNeutral = [];
let phaseBToNeutral = [];
let phaseCToNeutral = [];
let phaseAToPhaseB = [];
let phaseAToPhaseC = [];
let phaseBToPhaseC = [];
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

function filterLoads(source, path) {
  //*********************************************************
  // TODO: add motor number to simulate more than one motor
  //*********************************************************
  let counter = 0;
  return path.filter((edge) => {
    if (/^[LRKTM]/.test(edge.id)) {
      if (
        edge.id.startsWith("M") &&
        source != "AN" &&
        source != "BN" &&
        source != "CN"
      ) {
        //edge.setCounter();
        counter++;
        //edge.setFeed(source + edge.getCounter());
        edge.setFeed(source + counter);
      }
      return true;
    }
    return false;
  });
}

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
      let loads = filterLoads(source, path);
      livenList = livenList.concat(loads);
    }
    if (isContinuous && !isLoadInPath) {
      //livenList = [];
      return ["Short Circuit"];
    }
  }
  return livenList;
}

function initializeSimulation() {
  let allEdges = [];

  if (circuitBreakers.length != 0)
    for (const circuitBreaker of circuitBreakers) {
      allEdges = allEdges.concat(circuitBreaker.getEdge());
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
      allEdges = allEdges.concat(motor.getWindings());
      loadList = loadList.concat(motor.getWindings());
    }

  console.log(allEdges);
  if (allEdges.length == 0) return;
  phaseAToPhaseB = findAllPathsDFS(phaseA, phaseB, allEdges);
  phaseAToPhaseC = findAllPathsDFS(phaseA, phaseC, allEdges);
  phaseBToPhaseC = findAllPathsDFS(phaseB, phaseC, allEdges);

  phaseAToNeutral = findAllPathsDFS(phaseA, neutral, allEdges);
  phaseBToNeutral = findAllPathsDFS(phaseB, neutral, allEdges);
  phaseCToNeutral = findAllPathsDFS(phaseC, neutral, allEdges);

  troubleShoot();
}

function simulate() {
  let livenList = [];
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

  if (livenList.includes("Short Circuit")) {
    message = "Short Circuit";
    //livenList = [];
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
  });
  // need to reset button
  // Reset list
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

function controller() {
  const x = relativeCoordinates().x;
  const y = relativeCoordinates().y;
  switch (state) {
    case "AVAILABLE":
      break;
    case "VOLTAGE_SOURCE":
      activeComponent = new VoltageAC(store, "V", x, y);
      activeComponent.id = `V${acSourceCounter}`;
      activeComponent.idLabel = toSubscript(activeComponent.id);
      components.push(activeComponent);
      acSourceCounter++;
      state = "BUSY";
      break;
    case "RESISTOR":
      activeComponent = new Resistor("R", x, y);
      activeComponent.id = `R${resistorCounter}`;
      activeComponent.idLabel = toSubscript(activeComponent.id);
      components.push(activeComponent);
      resistorCounter++;
      state = "BUSY";
      break;
    case "INDUCTOR":
      activeComponent = new Inductor(store, "L", x, y);
      activeComponent.id = `L${inductorCounter}`;
      activeComponent.idLabel = toSubscript(activeComponent.id);
      components.push(activeComponent);
      inductorCounter++;
      state = "BUSY";
      break;
    case "CAPACITOR":
      activeComponent = new Capacitor(store, "C", x, y);
      activeComponent.id = `C${capacitorCounter}`;
      activeComponent.idLabel = toSubscript(activeComponent.id);
      components.push(activeComponent);
      capacitorCounter++;
      state = "BUSY";
      break;
    case "TRANSFORMER":
      activeComponent = new Transformer(x, y, 1, 1);
      activeComponent.id = `T${transformerCounter}`;
      activeComponent.idLabel = toSubscript(activeComponent.id);
      components.push(activeComponent);
      transformerCounter++;
      state = "BUSY";
      break;
    case "GROUND":
      activeComponent = new Ground("GND", x, y, true);
      activeComponent.id = "GND";
      components.push(activeComponent);
      state = "BUSY";
      break;
    case "WIRE":
      activeComponent = new Wire(x, y);
      activeComponent.id = `W${wireCounter}`;
      components.push(activeComponent);
      wireCounter++;
      msg.set("wiring");
      state = "BUSY";
      break;
    case "SIMULATE":
      msg.clear();
      simulate();
      state = "AVAILABLE";
      break;
    case "START_PROBE":
      probe(true, components);
      state = "AVAILABLE";
      break;
    case "END_PROBE":
      probe(false, components);
      state = "AVAILABLE";
      break;
    case "BUSY":
      if (activeComponent.isPlaced) {
        activeComponent = null;
        state = "AVAILABLE";
        msg.clear();
      }
      break;
    default:
  }
}

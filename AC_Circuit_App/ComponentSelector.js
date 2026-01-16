function componentSelector() {
  if (state === "AVAILABLE") {
    if (key === "v") state = "VOLTAGE_SOURCE";
    if (key === "r") state = "RESISTOR";
    if (key === "l") state = "INDUCTOR";
    if (key === "c") state = "CAPACITOR";
    if (key === "t") state = "TRANSFORMER";
    if (key === "g") state = "GROUND";
    if (key === "w") state = "WIRE";
    if (key === "s") state = "SIMULATE";
    if (key === "p") state = "START_PROBE";
    if (key === "d") state = "END_PROBE";
  }
}

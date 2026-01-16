function menuRow(label, key) {
  const row = createDiv("");
  row.style("display", "flex");
  row.style("justify-content", "space-between");
  row.style("align-items", "baseline");
  row.style("gap", "12px"); // space between columns
  row.style("min-width", "140px"); // adjust to taste

  const left = createSpan(label);
  const right = createSpan(`<b>${key}</b>`);

  // fixed "column" width so all letters line up
  right.style("display", "inline-block");
  right.style("width", "10px"); // adjust to taste
  right.style("text-align", "center");

  row.child(left);
  row.child(right);
  return row;
}

function dropDown(canvas) {
  // Prevent the default context menu from appearing on right-click
  canvas.elt.addEventListener("contextmenu", (e) => {
    console.log(state);
    e.preventDefault();
    // Show our custom context menu
    if (state == "AVAILABLE") {
      showContextMenu(e);
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
  // let wireOption = createDiv("Wire &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;<b>w</b>");
  let wireOption = menuRow("Wire", "w");
  wireOption.style("padding", "5px");
  wireOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "WIRE";
    contextMenu.hide();
  });
  // Highlight on hover
  wireOption.mouseOver(() => wireOption.style("background-color", "#e0e0e0"));
  // Revert on mouse out
  wireOption.mouseOut(() => wireOption.style("background-color", "#fff"));
  contextMenu.child(wireOption);
  //-----------------------------------------------

  // let voltageSourceOption = createDiv("Voltage Source &nbsp;<b>v</b>");
  let voltageSourceOption = menuRow("Voltage Source", "v");
  voltageSourceOption.style("padding", "5px");
  voltageSourceOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "VOLTAGE_SOURCE";
    contextMenu.hide();
  });
  voltageSourceOption.mouseOver(() =>
    voltageSourceOption.style("background-color", "#e0e0e0")
  );
  voltageSourceOption.mouseOut(() =>
    voltageSourceOption.style("background-color", "#fff")
  );
  contextMenu.child(voltageSourceOption);
  //-----------------------------------------------

  // let resistorOption = createDiv(
  //   "Resistor &ensp;&emsp;&emsp;&nbsp;&nbsp; <b>r</b>"
  // );
  let resistorOption = menuRow("Resistor", "r");
  resistorOption.style("padding", "5px");
  resistorOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "RESISTOR";
    contextMenu.hide();
  });
  resistorOption.mouseOver(() =>
    resistorOption.style("background-color", "#e0e0e0")
  );
  resistorOption.mouseOut(() =>
    resistorOption.style("background-color", "#fff")
  );
  contextMenu.child(resistorOption);
  //-----------------------------------------------

  // let inductorOption = createDiv("Inductor &emsp;&emsp;&emsp;&nbsp; <b>i</b>");
  let inductorOption = menuRow("Inductor", "i");
  inductorOption.style("padding", "5px");
  inductorOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "INDUCTOR";
    contextMenu.hide();
  });
  inductorOption.mouseOver(() =>
    inductorOption.style("background-color", "#e0e0e0")
  );
  inductorOption.mouseOut(() =>
    inductorOption.style("background-color", "#fff")
  );
  contextMenu.child(inductorOption);
  //-----------------------------------------------
  // let capacitorOption = createDiv(
  //   "Capacitor &emsp;&emsp;&emsp;&nbsp; <b>c</b>"
  // );
  let capacitorOption = menuRow("Capacitor", "c");
  capacitorOption.style("padding", "5px");
  capacitorOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "CAPACITOR";
    contextMenu.hide();
  });
  capacitorOption.mouseOver(() =>
    capacitorOption.style("background-color", "#e0e0e0")
  );
  capacitorOption.mouseOut(() =>
    capacitorOption.style("background-color", "#fff")
  );
  contextMenu.child(capacitorOption);

  //-----------------------------------------------
  // let groundOption = createDiv("Ground &emsp;&emsp;&emsp;&nbsp; <b>g</b>");
  let groundOption = menuRow("Ground", "g");
  groundOption.style("padding", "5px");
  groundOption.mousePressed(() => {
    if (state === "AVAILABLE") state = "GROUND";
    contextMenu.hide();
  });
  groundOption.mouseOver(() =>
    groundOption.style("background-color", "#e0e0e0")
  );
  groundOption.mouseOut(() => groundOption.style("background-color", "#fff"));
  contextMenu.child(groundOption);

  //-----------------------------------------------
  // let deleteOption = createDiv("Delete &emsp;&emsp;&emsp;<b>d</b>");
  let deleteOption = menuRow("Delete", "d");
  deleteOption.style("padding", "5px");
  deleteOption.mousePressed(() => {
    deleteComponent();
  });
  deleteOption.mouseOver(() =>
    deleteOption.style("background-color", "#e0e0e0")
  );
  deleteOption.mouseOut(() => deleteOption.style("background-color", "#fff"));
  contextMenu.child(deleteOption);

  //-----------------------------------------------
  // let simulateOption = createDiv("Simulate &emsp;&emsp;<b>s</b>");
  let simulateOption = menuRow("Simulate", "s");
  simulateOption.style("padding", "5px");
  simulateOption.mousePressed(() => {
    simulate();
  });
  simulateOption.mouseOver(() =>
    simulateOption.style("background-color", "#e0e0e0")
  );
  simulateOption.mouseOut(() =>
    simulateOption.style("background-color", "#fff")
  );
  contextMenu.child(simulateOption);
}

function showContextMenu(event) {
  contextMenu.position(event.pageX, event.pageY);
  contextMenu.show();
}

const GRID_CELL = 20;

let wires = [];
let components = [];
let history = null;
let store = null;
let activeTerminal = null;
let activeComponent = null;
let msg = null;

let acSourceCounter = 1;
let dcSourceCounter = 1;
let inductorCounter = 1;
let wireCounter = 1;
let resistorCounter = 1;
let capacitorCounter = 1;
let transformerCounter = 1;

let state = "AVAILABLE";

//=========================================================
//                    Dropp down menu
//=========================================================
let contextMenu;
let dropdownSelector = "";

//=========================================================
//                     Zoom and Pan
//=========================================================
const spacing = 20;
let isPanning = false;
let scaling = 1;
let offset;
let zDown = false;
let leftDown = false;

//==============================================
//                  Global Data
//==============================================
const GRID_CELL = 20;
// const ox = 400;
// const oy = 400;
let ox = 0;
let oy = 0;

//============ Panning & Zooming ===============
let isPanning = false;
let scaling = 1;
let offset;
let zDown = false;
let leftDown = false;

//================== In app ====================
let phasors = [];
let icons = [];
let history = null;
let messageBoard = null;
let activePhasorEnd = null;
let activePhasor = null;
let state = "IDLE";
let phasorCounter = 0;

//============ Phasor Operations ===============
let augend = null;
let addend = null;

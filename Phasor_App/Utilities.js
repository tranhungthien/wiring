function drawGrid() {
  background(220);
  stroke(230);
  strokeWeight(1);
  for (let x = 0; x <= width; x += GRID_CELL) line(x, 0, x, height);
  for (let y = 0; y <= height; y += GRID_CELL) line(0, y, width, y);
}

function deletePhasor() {
  for (let p of phasors)
    if (p.isSelected) {
      const cmd = new DeleteCMD(phasors, p);
      history.execute(cmd);
      p = null;
    }
}

function clearPhasors() {
  for (let p of phasors) {
    const cmd = new DeleteCMD(phasors, p);
    history.execute(cmd);
    p = null;
  }
}

function mapOutMatrix(M, name = "M") {
  const X = math.matrix(M); // ensure it's a math.matrix
  const size = X.size(); // e.g. [2,9]
  const A = X.toArray(); // plain nested arrays

  console.log(`${name} size: [${size.join(", ")}]`);

  // Pretty-print each row with indices
  A.forEach((row, i) => {
    console.log(`${name}[${i}]:`, row);
  });

  return { size, array: A };
}

function dist2(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function translateEndPoints(obj, dx, dy) {
  obj.update(dx, dy);
  activePhasor = null;
}

function snapVectorToVector(
  thisVec,
  otherVec,
  mode = "tailToHead",
  radius = 20
) {
  const r2 = radius * radius;

  let thisEnd, otherEnd;

  switch (mode) {
    case "tailToHead": // this.u -> other.v
      thisEnd = thisVec.u;
      otherEnd = otherVec.v;
      break;

    case "headToTail": // this.v -> other.u
      thisEnd = thisVec.v;
      otherEnd = otherVec.u;
      break;

    case "tailToTail": // this.u -> other.u
      thisEnd = thisVec.u;
      otherEnd = otherVec.u;
      break;

    default:
      console.warn("snapVectorToVector: unknown mode", mode);
      return false;
  }

  if (dist2(thisEnd.x, thisEnd.y, otherEnd.x, otherEnd.y) > r2) return false;

  // translate whole vector so the chosen end coincides
  const dx = otherEnd.x - thisEnd.x;
  const dy = otherEnd.y - thisEnd.y;
  translateEndPoints(thisVec, dx, dy);
  return true;
}

function snapToClosestHeadTail(thisVec, vectors, radius = 20) {
  const rr = radius * radius;
  let best = null; // { other, mode, dd }

  for (const other of vectors) {
    if (other === thisVec) continue;

    // tail-to-head (this.u -> other.v)
    {
      const dd = dist2(thisVec.u.x, thisVec.u.y, other.v.x, other.v.y);
      if (dd <= rr && (!best || dd < best.dd)) {
        best = { other, mode: "tailToHead", dd };
      }
    }

    // head-to-tail (this.v -> other.u)
    {
      const dd = dist2(thisVec.v.x, thisVec.v.y, other.u.x, other.u.y);
      if (dd <= rr && (!best || dd < best.dd)) {
        best = { other, mode: "headToTail", dd };
      }
    }

    // tail-to-tail (this.u -> other.u)
    {
      const dd = dist2(thisVec.u.x, thisVec.u.y, other.u.x, other.u.y);
      if (dd <= rr && (!best || dd < best.dd)) {
        best = { other, mode: "tailToTail", dd };
      }
    }
  }

  if (!best) return false;
  return snapVectorToVector(thisVec, best.other, best.mode, radius);
}

// mode: "tailToHead"  => this.u snaps to other.v
//       "headToTail"  => this.v snaps to other.u
// function snapVectorToVector(
//   thisVec,
//   otherVec,
//   mode = "tailToHead",
//   radius = 20
// ) {
//   const r2 = radius * radius;

//   const thisEnd = mode === "tailToHead" ? thisVec.u : thisVec.v;
//   const otherEnd = mode === "tailToHead" ? otherVec.v : otherVec.u;

//   if (dist2(thisEnd.x, thisEnd.y, otherEnd.x, otherEnd.y) > r2) return false;

//   // translate whole vector so the chosen end coincides
//   const dx = otherEnd.x - thisEnd.x;
//   const dy = otherEnd.y - thisEnd.y;
//   translateEndPoints(thisVec, dx, dy);
//   return true;
// }
// function snapToClosestHeadTail(thisVec, vectors, radius = 20) {
//   const rr = radius * radius;

//   let best = null; // { other, mode, d2 }

//   for (const other of vectors) {
//     if (other === thisVec) continue;

//     // tail-to-head (this.u -> other.v)
//     {
//       const dd = dist2(thisVec.u.x, thisVec.u.y, other.v.x, other.v.y);
//       if (dd <= rr && (!best || dd < best.dd))
//         best = { other, mode: "tailToHead", dd };
//     }

//     // head-to-tail (this.v -> other.u)
//     {
//       const dd = dist2(thisVec.v.x, thisVec.v.y, other.u.x, other.u.y);
//       if (dd <= rr && (!best || dd < best.dd))
//         best = { other, mode: "headToTail", dd };
//     }
//   }

//   if (!best) return false;
//   return snapVectorToVector(thisVec, best.other, best.mode, radius);
// }

class DeleteCMD {
  constructor(components, component) {
    this.components = components;
    this.component = component;
    this.index = components.indexOf(component); // position at delete time
  }

  do() {
    if (this.index === -1) return; // already gone / not found
    this.components.splice(this.index, 1);
  }

  undo() {
    if (this.index < 0) return;
    // put it back in the same position
    this.components.splice(this.index, 0, this.component);
  }
}

class DraggCMD {
  constructor(obj, oldC, newC) {
    this.obj = obj;
    this.oldC = oldC;
    this.newC = newC;
  }

  do() {
    this.obj.c.x = this.newC.x;
    this.obj.c.y = this.newC.y;
  }

  undo() {
    this.obj.c.x = this.oldC.x;
    this.obj.c.y = this.oldC.y;
  }
}

class RotateCMD {
  constructor() {}
  do() {}
  undo() {}
}

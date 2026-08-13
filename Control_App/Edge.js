class Edge {
  // ID, (X,Y), ON/OFF, OPEN/CLOSED, (X,Y)
  constructor(id, vertex1, state, contact, vertex2) {
    this.id = id;
    this.state = state;
    this.contact = contact;
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
  }
  getID() {
    return this.id;
  }

  getState() {
    return this.state;
  }

  getContact() {
    return this.contact;
  }

  setState(state) {
    this.state = state;
  }

  setContact(contact) {
    this.contact = contact;
  }
}

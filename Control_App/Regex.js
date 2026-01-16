function isCoil(id) {
  const regex = /^(K|R)\d*0$/;
  return regex.test(id);
}

function isContact(id) {
  const regex = /^(K|R)([1-9]\d*)$/;
  return regex.test(id);
}

function isWire(id) {
  const regex = /^W.*/;
  return regex.test(id);
}

function isLamp(id) {
  const regex = /^L.*/;
  return regex.test(id);
}

function isStartButton(id){
  const regex = /^S\d*$/;
  return regex.test(id);
}

function isStopButton(id){
  const regex = /^B\d*$/;
  return regex.test(id);
}
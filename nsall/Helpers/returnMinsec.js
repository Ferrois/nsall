function returnMinsec(sec) {
  var secondsLeft = sec;
  var minutes = Math.floor(sec / 60);
  secondsLeft = sec - minutes * 60;
  return [minutes, secondsLeft]
}

export default returnMinsec;
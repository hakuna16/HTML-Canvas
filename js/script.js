var canvas = document.getElementById('canvasId');
var context = canvas.getContext('2d');

var dragging = false;
var dragStartLocation;
var dragHoldX;
var dragHoldY;
var mouseX;
var mouseY;
var dragOk = false;
var shape = 0;

function getCanvasCordinate(event) {
  var x = event.clientX - canvas.getBoundingClientRect().left;
  var y = event.clientY - canvas.getBoundingClientRect().top;

  return { x: x, y: y };
}

function drawTraingle(position, sides, angle) {
  var cordinates = [];

  radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2)
  + Math.pow((dragStartLocation.y - position.y), 2)),
       index = 0;

  for (index = 0; index < sides; index++) {
    cordinates.push({ x: dragStartLocation.x + radius * Math.sin(angle), y: dragStartLocation.y - radius * Math.cos(angle) });
    angle += (2 * Math.PI) / sides;
  }

  context.beginPath();
  context.moveTo(cordinates[0].x, cordinates[0].y);
  for (index = 1; index < sides; index++) {
    context.lineTo(cordinates[index].x, cordinates[index].y);
    context.fillStyle = random();
    context.fill();
    shape += 1;
  }

}

function random() {
  var c = '#';
  for (var i = 0; i < 6; i++) {
    c += (Math.random() * 16 | 0).toString(16);
  }

  return c;
}

function dragStart(event) {
  dragging = true;
  dragStartLocation = getCanvasCordinate(event);
  var i;
  var highestIndex = -1;
  var b = canvas.getBoundingClientRect();
  mouseX = (event.clientX - b.left) * (canvas.width / b.width);
  mouseY = (event.clientY - b.top) * (canvas.height / b.height);
}

function drag(event) {
  var position;
  if (dragging === true) {
    position = getCanvasCordinate(event);
    drawTraingle(position, 3, 0);
  }
}

function dragStop(event) {
  dragging = false;
  var position = getCanvasCordinate(event);
  drawTraingle(position, 3, 0);
}

function init() {
  canvas.addEventListener('mousedown', dragStart, false);
  canvas.addEventListener('mousemove', drag, false);
  canvas.addEventListener('mouseup', dragStop, false);
}

window.addEventListener('load', init, false);

function reset() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

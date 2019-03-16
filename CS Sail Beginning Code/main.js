var canvas;
var canvasContext;

function drawRectangle(coordinateX, coordinateY, width, height, color){
	canvasContext.fillStyle = color;
	canvasContext.fillRect(coordinateX, coordinateY, width, height);
}

function drawCircle(coordinateX, coordinateY, radius, color){
  canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(coordinateX, coordinateY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawText(coordinateX, coordinateY, size, color, font, text){
  canvasContext.font = size + " " + font;
  canvasContext.fillStyle = color;
  canvasContext.textAlign = "center";
  canvasContext.fillText(text, coordinateX, coordinateY);
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

  // setInterval(update, 1000/300);

  // canvas.addEventListener('mousemove', mouseToPaddle);
}

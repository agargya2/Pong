var canvas;
var canvasContext;

var ballX;
var ballY;
var ballXSpeed;
var ballYSpeed;
var ballRadius = 10;

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

function initializeGame(){
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballXSpeed = 1;
  ballYSpeed = 1;
}

function moveBall(){
  ballX += ballXSpeed;
  ballY += ballYSpeed;
}

function draw(){
  //background
  drawRectangle(0, 0, canvas.width, canvas.height, "black");

  drawCircle(ballX, ballY, ballRadius, "red");
}

function move(){
  moveBall();
}

function update(){
  draw();
  move();
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  initializeGame();
  setInterval(update, 1000/30)
}

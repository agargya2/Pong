var canvas;
var canvasContext;

var ball = {
  x : 0,
  y : 0,
  xSpeed : 3,
  ySpeed : 3,
  radius : 10
}

var paddle1 = {
  x : 0,
  y : 0,
  height : 100,
  width : 10
}

var paddle2 = {
  x : 0,
  y : 0,
  height : 100,
  width: 10,
  speed : 2
}

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
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  paddle2.x = canvas.width - paddle2.width;
}

function moveBall(){
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}

function bounceOffWall(){
  if (ball.x - (ball.radius / 2) <= 0 || ball.x + (ball.radius / 2) >= canvas.width){
    ball.xSpeed *= -1;
  }
  if (ball.y - (ball.radius / 2) <= 0 || ball.y + (ball.radius / 2) >= canvas.height){
    ball.ySpeed *= -1;
  }
}

function movePaddle2(){
  if(paddle2.y + (paddle2.height * 3 / 4) < ball.y){
    paddle2.y += paddle2.speed;
  }
  else if(paddle2.y + (paddle2.height / 4) > ball.y){
    paddle2.y -= paddle2.speed;
  }
}

function mouseToPaddle(evt){
  var mouse = getMouseLocation(evt);
  paddle1.y = mouse.y - (paddle1.height / 2);
}

function getMouseLocation(evt){
  var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {x: mouseX, y: mouseY};
}

function draw(){
  //background
  drawRectangle(0, 0, canvas.width, canvas.height, "black");

  //ball
  drawCircle(ball.x, ball.y, ball.radius, "red");

  //paddle1
  drawRectangle(paddle1.x, paddle1.y, paddle1.width, paddle1.height, "white");

  //paddle2
  drawRectangle(paddle2.x, paddle2.y, paddle2.width, paddle2.height, "white");
}

function move(){
  moveBall();
  bounceOffWall();
  movePaddle2();
}

function update(){
  move();
  draw();
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

  initializeGame();
  setInterval(update, 1000/300);

  canvas.addEventListener('mousemove', mouseToPaddle);
}

var canvas;
var canvasContext;

var ball = {
  x : 0,
  y : 0,
  xSpeed : 3,
  ySpeed : 1,
  radius : 10,
  paddleReflection: 4
}

var paddle1 = {
  x : 0,
  y : 0,
  height : 100,
  width : 10,
  score : 0,
  name : "Player"
}

var paddle2 = {
  x : 0,
  y : 0,
  height : 100,
  width: 10,
  speed : 3,
  score : 0,
  name : "Computer"
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

function drawText(coordinateX, coordinateY, size, color, font, text){
  canvasContext.font = size + " " + font;
  canvasContext.fillStyle = color;
  canvasContext.textAlign = "center";
  canvasContext.fillText(text, coordinateX, coordinateY);
}

function initializeGame(){
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  paddle2.x = canvas.width - paddle2.width;
  paddle2.y = (canvas.height / 2) - (paddle2.height / 2)
}

function moveBall(){
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
}

function bounceBall(){
  if (ball.x - (ball.radius / 2) <= 0){
    if(paddle1.y - ball.radius < ball.y && paddle1.y + paddle1.height + ball.radius > ball.y){
      ball.xSpeed *= -1;
      ball.ySpeed = -((paddle1.y + (paddle1.height / 2)) - ball.y) / (paddle1.height / 2) * ball.paddleReflection;
    }
    else{
      resetBall();
      paddle2.score++;
    }
  }
  if (ball.x + (ball.radius / 2) >= canvas.width) {
    if(paddle2.y - ball.radius < ball.y && paddle2.y + paddle2.height + ball.radius > ball.y){
      ball.xSpeed *= -1;
      ball.ySpeed = -((paddle2.y + (paddle2.height / 2)) - ball.y) / (paddle2.height / 2) * ball.paddleReflection;
    }
    else{
      resetBall();
      paddle1.score++;
    }
  }
  if (ball.y - (ball.radius / 2) <= 0 || ball.y + (ball.radius / 2) >= canvas.height){
    ball.ySpeed *= -1;
  }
}

function resetBall(){
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xSpeed = Math.random() + 1;
  ball.ySpeed = Math.random() + 1;
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

function drawNet(){
  var lineLength = 20;
  var lineWidth = 2;
  var i = lineLength / 2;
  while(i < canvas.height){
    drawRectangle((canvas.width / 2) - lineWidth, i, lineWidth, lineLength, "white");
    i += (lineLength * 2);
  }
}

function draw(){
  //background
  drawRectangle(0, 0, canvas.width, canvas.height, "black");

  //paddle1
  drawRectangle(paddle1.x, paddle1.y, paddle1.width, paddle1.height, "white");

  //paddle2
  drawRectangle(paddle2.x, paddle2.y, paddle2.width, paddle2.height, "white");

  //ball
  drawCircle(ball.x, ball.y, ball.radius, "red");

  //scores
  drawText(canvas.width / 4, canvas.height / 4, "30px", "white", "Arial", paddle1.score);
  drawText(canvas.width * 3 / 4, canvas.height / 4, "30px", "white", "Arial", paddle2.score);

  drawNet();

  if(paddle2.score >= 3 || paddle1.score >= 3){
    drawText(canvas.width / 2, canvas.height / 2, "50px", "red", "Arial", ((paddle2.score >= 3) ? paddle2.name : paddle1.name) + " has won the Game!");
  }
}

function move(){
  moveBall();
  bounceBall();
  movePaddle2();
}

function update(){
  if(paddle2.score < 3 && paddle1.score < 3){
    move();
  }
  draw();
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

  initializeGame();
  setInterval(update, 1000/300);

  canvas.addEventListener('mousemove', mouseToPaddle);
}

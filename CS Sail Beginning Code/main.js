var canvas;
var canvasContext;

var ball = {
	x : 0,
	y : 0,
	xSpeed : 3,
	ySpeed : 1,
	radius : 10,
	maxSpeed: 4,
	color : "red"
}

var paddle1 = {
 	x : 0,
 	y : 0,
 	height : 100,
 	width : 10,
 	score : 0,
 	name : "Player",
	color : "white"
}

var paddle2 = {
	x : 0,
	y : 0,
	height : 100,
	width: 10,
	speed : 3,
	score : 0,
	name : "Computer",
	color : "white"
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
	//TODO: Put the ball in the middle of the screen

	//TODO: Put Paddle2 on the right side of the screen
}

function moveBall(){
	//TODO: Move the ball

}

function bounceBall(){
	//TODO: When the ball hits the left or right side, check to see whether the corresponding paddle is hitting the ball
	//TODO: If the ball does hit the paddle, make it bounce, or else reset the ball and increase the correct player's score

	//TODO: If the ball hits the the top or bottom of the screen, make it bounce
}

function resetBall(){
	//TODO: Put the ball in the center of the screen

	//TODO: Randomize the ball's speed
}

function movePaddle2(){
	//TODO: Move Paddle2
}

function mouseToPaddle(evt){
	//TODO: Get the x and y coordinates of the mouse using the helper function
	//TODO: Change paddle1's position to the center of the mouse
}

function getMouseLocation(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {x: mouseX, y: mouseY};
}

function drawNet(){
	//TODO: Draw the net
}

function draw(){
	//background
	drawRectangle(0, 0, canvas.width, canvas.height, "black");

	//paddle1
	drawRectangle(paddle1.x, paddle1.y, paddle1.width, paddle1.height, paddle1.color);

	//paddle2
	drawRectangle(paddle2.x, paddle2.y, paddle2.width, paddle2.height, paddle2.color);

	//ball
	drawCircle(ball.x, ball.y, ball.radius, ball.color);

	//scores
	drawText(canvas.width / 4, canvas.height / 4, "30px", "white", "Arial", paddle1.score);
	drawText(canvas.width * 3 / 4, canvas.height / 4, "30px", "white", "Arial", paddle2.score);

	drawNet();

	//TODO: If somebody wins display the winning message below
	// drawText(canvas.width / 2, canvas.height / 2, "50px", "red", "Arial", ((paddle2.score >= 3) ? paddle2.name : paddle1.name) + " has won the Game!");
}

function move(){
	moveBall();
	bounceBall();
	movePaddle2();
}

function update(){
	//TODO: Freeze the game when needed
	move();
	draw();
}

window.onload = function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	initializeGame();
	setInterval(update, 1000/300);

	canvas.addEventListener("mousemove", mouseToPaddle);
}

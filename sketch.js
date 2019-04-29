'use strict';

var canvasX = 1920* 0.7;
var canvasY = 1080* 0.7;

function setup() {
  var canvas = createCanvas(canvasX, canvasY);
  // placeholder for our canvas in html
  canvas.parent('canvas-holder');
}

var playerX = canvasX / 2;
var playerY = canvasY - 50;
var bubbleStartX = 200;
var bubbleStartY =  -100;
var bubbleArray = [];
var maxBubbles = 15;
var playerSize = 80;
var powerUp = {};
var score = 0;

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX-=5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX+=5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY-=5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY+=5;
  }

  background('#313131');
  fill('#F531FD');
  noStroke();
  ellipse(playerX, playerY, playerSize);
  //bubbles
  createBubble();
  createPowerUp();
  for(var i = 0; i < bubbleArray.length; i++) {
    bubbleArray[i][1]+= bubbleArray[i][3];
    if(bubbleArray[i][1] >= canvasY + bubbleArray[i][2]){
      bubbleArray.splice(i, 1);
    }
    showBubbles(bubbleArray[i][0], bubbleArray[i][1], bubbleArray[i][2], bubbleArray[i][4]);
  }

}

var createBubble = function(){
  if(bubbleArray.length < maxBubbles){
    const colorRandom = Math.floor(Math.random() * 3) + 1;
    var bubble = [random(-100, canvasX), bubbleStartY, random(10, 100), random(5, 10), colorRandom];
    bubbleArray.push(bubble);
  }
};

var createPowerUp = function(){
  if (_.isEmpty(powerUp)){
    powerUp = {
      x: random(50, 1500),
      y: random(400, 800),
      size: 80,
    };
  }
  collisionCheck(powerUp.x, powerUp.y, powerUp.size, false);
  star(powerUp.x, powerUp.y, powerUp.size, 30, 4);
};

var showBubbles = function(bubblex, bubbley, bubbleSize, colorRandom){
  let bubbleColor = '#FF7C55';
  if (colorRandom === 1){
    bubbleColor = '#FF7C55';
  } else if (colorRandom === 2) {
    bubbleColor = '#FFBE55';
  } else {
    bubbleColor = '#C4FF55';
  }
  fill(bubbleColor);
  noStroke();
  ellipse(bubblex, bubbley, bubbleSize);
  collisionCheck(bubblex, bubbley, bubbleSize, true);
};

var collisionCheck = function(bubblex, bubbley, bubblez, stop){
  var dx = playerX - bubblex;
  var dy = playerY - bubbley;
  var distance = Math.sqrt(dx*dx + dy*dy);
  if(distance < playerSize/2 + bubblez/2){
    if(stop) {
      bubbleArray = [];
      noLoop();
    } else {
      score++;
      document.getElementById('score').innerHTML = score;
      powerUp = {};
    }
  } 
};

const startDraw = function() {
  score = 0;
  document.getElementById('score').innerHTML = score;
  playerX = 400;
  playerY = 500;
  loop();
};

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  fill('#00FFF5');
  noStroke();
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
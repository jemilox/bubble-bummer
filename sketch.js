'use strict';

const CANVAS_WIDTH = window.innerWidth * 0.7;
const CANVAS_HEIGHT = window.innerHeight * 0.7;

const PLAYER_START_X = CANVAS_WIDTH / 2;
const PLAYER_START_Y = CANVAS_HEIGHT - 50;

function setup() {
  var canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // placeholder for our canvas in html
  canvas.parent('canvas-holder');
}

var playerX = PLAYER_START_X;
var playerY = PLAYER_START_Y;
var bubbleArray = [];
var maxBubbles = 15;
var playerSize = byHeight(80);
var powerUp = {};
var score = 0;
let highScores = [];

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    if (!(playerX < 0)) {
      playerX-=5;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (!(playerX > CANVAS_WIDTH)) {
      playerX+=5;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if (!(playerY < 0)) {
      playerY-=5;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (!(playerY > CANVAS_HEIGHT)) {
      playerY+=5;
    }
  }
  // background color
  background('#313131');
  // player color
  fill('#F531FD');
  noStroke();
  ellipse(playerX, playerY, playerSize);
  //bubbles
  createBubble();
  createPowerUp();
  for(var i = 0; i < bubbleArray.length; i++) {
    bubbleArray[i][1]+= bubbleArray[i][3];
    if(bubbleArray[i][1] >= CANVAS_HEIGHT + bubbleArray[i][2]){
      bubbleArray.splice(i, 1);
    }
    showBubbles(bubbleArray[i][0], bubbleArray[i][1], bubbleArray[i][2], bubbleArray[i][4]);
  }

}

var createBubble = function(){
  if(bubbleArray.length < maxBubbles){
    const colorRandom = Math.floor(Math.random() * 3) + 1;
    var bubble = [random(-100, CANVAS_WIDTH), -100, random(byHeight(20), byHeight(200)), random(5, 10), colorRandom];
    bubbleArray.push(bubble);
  }
};

var createPowerUp = function(){
  if (_.isEmpty(powerUp)){
    powerUp = {
      x: random(50, CANVAS_WIDTH - 50),
      y: random(400, CANVAS_HEIGHT - 50),
      size: byHeight(80),
    };
  }
  collisionCheck(powerUp.x, powerUp.y, powerUp.size, false);
  star(powerUp.x, powerUp.y, powerUp.size, byHeight(30), 4);
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
  playerX = PLAYER_START_X;
  playerY = PLAYER_START_Y;
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
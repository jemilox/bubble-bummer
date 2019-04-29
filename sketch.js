var canvasX = 1920*.5;
var canvasY = 1080*.5;

function setup() {
 createCanvas(canvasX, canvasY);
}

var playerX = 500;
var playerY = 400;
var bubbleStartX = 200;
var bubbleStartY =  -100;
var bubbleArray = [];
var maxBubbles = 15;
var playerSize = 80;
var powerUp = {};

function draw() {
  if (keyIsDown(LEFT_ARROW))
    playerX-=5;

  if (keyIsDown(RIGHT_ARROW))
    playerX+=5;

  if (keyIsDown(UP_ARROW))
    playerY-=5;

  if (keyIsDown(DOWN_ARROW))
    playerY+=5;

  background('#C6E5D9');
  fill('#E94E77');   
  ellipse(playerX, playerY, playerSize);
  //bubbles
  createBubble();
  createPowerUp();
  for (var i = 0; i < bubbleArray.length; i++) {
    bubbleArray[i][1]+= bubbleArray[i][3];
    if(bubbleArray[i][1] >= canvasY + bubbleArray[i][2]){
      bubbleArray.splice(i, 1);
    }
    showBubbles(bubbleArray[i][0], bubbleArray[i][1], bubbleArray[i][2]);
  }

}

var createBubble = function(){
  if(bubbleArray.length < maxBubbles){
    var bubble = [random(-100, canvasX), bubbleStartY, random(10, 100), random(5, 10)];
    bubbleArray.push(bubble);
  }
};

var createPowerUp = function(){
  if (_.isEmpty(powerUp)){
    powerUp = {
      x: random(50, 910),
      y: random(50, 490),
    };
  }
  star(powerUp.x, powerUp.y, 50, 40, 40);
};

var showBubbles = function(bubblex, bubbley, bubblez){
  fill('#F4EAD5');
  ellipse(bubblex, bubbley, bubblez);
  collisionCheck(bubblex, bubbley, bubblez);
};

var collisionCheck = function(bubblex, bubbley, bubblez){
  var dx = playerX - bubblex;
  var dy = playerY - bubbley;
  var distance = Math.sqrt(dx*dx + dy*dy);
  if(distance < playerSize/2 + bubblez/2){
    bubbleArray = [];
    noLoop();
  }
};

const startDraw = function() {
  loop();
};

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
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
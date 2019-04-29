var canvasX = 1920*.8;
var canvasY = 1080*.8;

function setup() {
 createCanvas(canvasX, canvasY);
}

var x = 500;
var y = 800;
var bubbleStartX = 200;
var bubbleStartY =  -100;
var bubbleArray = [];
var maxBubbles = 15;
var playerSize = 80;

function draw() {
  if (keyIsDown(LEFT_ARROW))
    x-=5;

  if (keyIsDown(RIGHT_ARROW))
    x+=5;

  if (keyIsDown(UP_ARROW))
    y-=5;

  if (keyIsDown(DOWN_ARROW))
    y+=5;

  background('#C6E5D9');
  fill('#E94E77');   
  ellipse(x, y, playerSize);
  //bubbles
  createBubble();

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

var showBubbles = function(bubblex, bubbley, bubblez){
  fill('#F4EAD5');
  ellipse(bubblex, bubbley, bubblez);
  collisionCheck(bubblex, bubbley, bubblez);
};

var collisionCheck = function(bubblex, bubbley, bubblez){
  var dx = x - bubblex;
  var dy = y - bubbley;
  var distance = Math.sqrt(dx*dx + dy*dy);
  if(distance < playerSize/2 + bubblez/2){
    bubbleArray = [];
    noLoop();
  }
};

const startDraw = function() {
  loop();
};

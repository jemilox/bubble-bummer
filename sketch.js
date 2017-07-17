function setup() {
 createCanvas(1920*.8, 1080*.8);
}

var x = 50;
var y = 50;
var bubbleStartX = 200;
var bubbleStartY =  0;
var bubbleArray = [];

function draw() {
  if (keyIsDown(LEFT_ARROW))
    x-=5;

  if (keyIsDown(RIGHT_ARROW))
    x+=5;

  if (keyIsDown(UP_ARROW))
    y-=5;

  if (keyIsDown(DOWN_ARROW))
    y+=5;

  background(51);
  ellipse(x, y, 80, 80);
  //bubbles
  createBubble();
  bubbleStartY ++;
}

var createBubble = function(){
  ellipse(bubbleStartX, bubbleStartY - 100, 200, 200);
};

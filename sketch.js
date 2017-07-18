var canvasX = 1920*.8;
var canvasY = 1080*.8;

function setup() {
 createCanvas(canvasX, canvasY);
}

var x = 50;
var y = 50;
var bubbleStartX = 200;
var bubbleStartY =  -100;
var bubbleArray = [];
var maxBubbles = 20;

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
  ellipse(x, y, 80);
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
    var bubble = [random(-100, canvasX), bubbleStartY, random(10, 200), random(5, 20)];
    bubbleArray.push(bubble);
  }
};

var showBubbles = function(bubblex, bubbley, bubblez){
  ellipse(bubblex, bubbley, bubblez);
};

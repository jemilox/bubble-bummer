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

  createBooble();


}



var createBubble = function(){
  fill(255,224,189);
  ellipse(bubbleStartX, bubbleStartY - 100, 200, 200);
  fill(243,172,172);
  ellipse(bubbleStartX - 55, bubbleStartY - 100, 50, 50);
  fill(153,82,82);
  ellipse(bubbleStartX - 63, bubbleStartY - 100, 20, 20);
};

var createBooble = function(){
  fill(255,224,189);
  ellipse(bubbleStartX + 100, bubbleStartY - 100, 200, 200);
  fill(243,172,172);
  ellipse(bubbleStartX + 65, bubbleStartY - 100, 50, 50);
  fill(153,82,82);
  ellipse(bubbleStartX + 58, bubbleStartY - 100, 20, 20);

}

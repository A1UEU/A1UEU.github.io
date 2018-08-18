// Constants
const phi = 1.61803398875;
const noOfIndicators = 12;

const pendulumRadius = 20;
var theta0;


function setup() 
{
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	createCanvas(canvasWidth, canvasHeight);

	theta0 = PI/8;
	pendulumLength = min([canvasHeight, canvasWidth])/2/phi;
	background(0);
  curTime = [0, 0, 0];
}


var updatedAt = 0.0;
var oldSecond = 0;
var curTime;
var sizeSet = false;
var scaleFactor;

function clockUpdateReal()
{
  // leave speed argument for super easy swap, yeah!
  curTime[2] = oldSecond + (millis() - updatedAt)/1000;
  if (oldSecond != second())
  {
    updatedAt = millis();
    curTime[0] = hour();
    curTime[1] = minute();
    curTime[2] = second();
    oldSecond = curTime[2];
  }
}

var angle = 0;
var timeVariable = 0;
const g = 9.81;
var seconds;

function draw()
{
  clockUpdateReal();
	background(0);
  translate(canvasWidth/2, canvasHeight/2);
  textAlign(CENTER);
  textLeading(50);
  textString = nf(curTime[0], 2, 0)+":"+nf(curTime[1], 2, 0)+":"+nf(curTime[2], 2, 0).slice(0,2)
  var curSize = textSize();
  var curWidth = textWidth(textString);
  const sollWidth = pendulumLength*2;
  if (!sizeSet)
  {
    scaleFactor = curSize/curWidth*sollWidth;
    sizeSet = true;
  }
  textSize(scaleFactor);
  text(textString, 10, 30);

  seconds = curTime[2];// + curTime[1]*60 + curTime[0] * 60 * 60;
	angle = theta0 * cos(PI * seconds + PI/2);
	translate(pendulumLength*sin(angle), pendulumLength*cos(angle));
	fill(255);
	ellipse(0,0,pendulumRadius,pendulumRadius);
}

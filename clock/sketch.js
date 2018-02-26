// Constants
const phi = 1.61803398875;
const noOfIndicators = 12;

// Parameters
var canvasWidth;
var canvasHeight;
var clockFaceRadius;
var indicatorRadius;
var indicatorPositions = Array();

// Helping
var alphaArray;
var ellipseses;
var indicatorColors; // neutral, hour, min, sec

var indicatorIntesities;
var clockFaceColors;
var bgColor;
var curTime;


function setup() 
{
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  clockFaceRadius = min([canvasHeight, canvasWidth])/2/phi;
  indicatorRadius = clockFaceRadius*2*PI/noOfIndicators*(1-1/phi);
  markerRanges = [24, 60, 60];
  markerHeights = [0.9*indicatorRadius, 1.8*indicatorRadius, 0.1*indicatorRadius]
  createCanvas(canvasWidth, canvasHeight);
  alphaArray = Array(noOfIndicators).fill(255);
  ellipseses = Array(noOfIndicators).fill(ellipse(0, 0, 0, 0));
  clockFaceColors = Array(noOfIndicators).fill(color(0));
  indicatorColors = ['#ea3d17', '#f2d85f', color(255, 255, 255, 255)];
  bgColor = '#070404';
  background(bgColor);
  curTime = [0, 0, 0];
  for(_ = 0; _ < noOfIndicators; ++_)
  {
    indicatorPositions[_] = polCoord(clockFaceRadius, 2*PI/noOfIndicators*_)
  }
}

function clockUpdateSimulated(speed)
{
  curTime[2]+= speed;
  if (curTime[2] > 59)
  {
    curTime[2] = 0;
    curTime[1]++;
    if (curTime[1] == 60)
    {
      curTime[1] = 0;
      curTime[0]++;
      if (curTime[0]==24)
      {
        curTime[0] = 0;
      }
    }
  }
}

var updatedAt = 0.0;
var oldSecond = 0;

function clockUpdateReal(speed)
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

function draw()
{
  fill(map(curTime[0], 0, 24, 0, 255), map(curTime[1], 0, 60, 0, 255), map(curTime[2], 0, 60, 0, 255));
  textSize(24);
  text(curTime[0]+"h"+curTime[1]+"m", 10, 30);
  translate(canvasWidth/2, canvasHeight/2);
  clockUpdateReal(1);
  makeClockface(curTime);
  drawClockface();
}

var clockFaces = Array();

function makeClockface(curTime)
{
  for(_ = 0; _ < noOfIndicators; ++_)
  {
    var normalisedIntensity;
    var blend = Array();
    clockFaces[_] = Array();
    for (marker = 0; marker < markerRanges.length; marker++)
    {
      var markerPos = polCoord(clockFaceRadius, curTime[marker]/markerRanges[marker]*2*PI);
      var distanceVector = arraySubtract(indicatorPositions[_], markerPos);
      var absDistance = sqrt( (distanceVector[0]**2 + distanceVector[1]**2) + markerHeights[marker]**2 );
      normalisedIntensity = markerHeights[marker]/absDistance;
      clockFaces[_][marker] = adjustBrightness(indicatorColors[marker], normalisedIntensity);
    }
    ellipse(markerPos[0], markerPos[1], 1.2*indicatorRadius, 1.1*indicatorRadius);
  }
}

function drawClockface()
{
  background(bgColor);
  for (_ = 0; _<noOfIndicators; ++_)
  {
    fill(0);
    noStroke();
    //ellipse(indicatorPositions[_][0], indicatorPositions[_][1], indicatorRadius, indicatorRadius);
  }
  blendMode(BLEND);
  for (marker = 0; marker < markerRanges.length; ++marker)
  {
    for (_ = 0; _<noOfIndicators; ++_)
    {
      fill(clockFaces[_][marker]);
      noStroke();
      ellipse(indicatorPositions[_][0], indicatorPositions[_][1], indicatorRadius, indicatorRadius);
    }
  }
  blendMode(BLEND);
}

function polCoord(radius, angle)
{
  return [ clockFaceRadius * sin(angle), - clockFaceRadius * cos(angle)];
}

function arraySubtract(a, b)
{
  var result = Array();
  if (a.length == b.length)
  {
    for (i = 0; i < a.length; ++i)
    {
      result[i] = a[i] - b[i];
    }
  }
  else
    return 0;
  return result;
}

function adjustBrightness(inColor, brightness)
{
  return color(red(inColor), green(inColor), blue(inColor), alpha(inColor)*brightness);
  // return color(red(inColor)*brightness, green(inColor)*brightness, blue(inColor)*brightness, alpha(inColor));
}

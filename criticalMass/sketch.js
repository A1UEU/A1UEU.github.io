// Constants
const phi = 1.61803398875;
const noOfIndicators = 12;

// Parameters
var canvasWidth;
var canvasHeight;
var canvasRadius;


function setup() 
{
  canvasWidth = 150;
  canvasHeight = 150;
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('logo');
  canvasRadius = min([canvasHeight, canvasWidth])/2;
  translate(canvasWidth/2, canvasHeight/2);
  // bgColor = '#070404';
  // background(bgColor);
  ang = 0;
  pointMasses = new Array(750);
  i = 0;
  maxRad = canvasRadius;
  minRad = canvasRadius*0.3;
  stepSize = 0.5;
  for (i=0; i < pointMasses.length; i++)
  {
    pointMasses[i] = new Array(2);
    pointMasses[i] = [random(minRad, maxRad), random(2*PI)];
  }
  // for (i=0; i < pointMasses.length; i++)
  // {
  //   radRange = maxRad-minRad;
  //   vRange = veloOfRad(minRad)-veloOfRad(maxRad);
  //   pointMasses[i][0] = veloOfRad(-pointMasses[i][0]+(maxRad-minRad))/veloOfRad();
  // }
}


function draw()
{
  clear();
  translate(canvasWidth/2, canvasHeight/2); // draw everything centered
  
  // outisde bound
  // noFill();
  // ellipse(0,0,maxRad*2, maxRad*2);

  fill(0);
  coverRad = 2*((minRad)+0.5*densityOfRad(minRad));
  ellipse(0,0,coverRad, coverRad);
  for (i=0; i<pointMasses.length; i++)
  {
    pointMasses[i][0] -= veloOfRad(pointMasses[i][0]);
    if (pointMasses[i][0] < minRad)
    {
      pointMasses[i][0] = maxRad;
      pointMasses[i][1] = random(2*PI);
    }
    
    angledStretchedEllipse(densityOfRad(pointMasses[i][0]), pointMasses[i][0], pointMasses[i][1], 1);
  }
  // noLoop();
  console.log("one more draw");
}

function veloOfRad(radius)
{
  return 0.0025*canvasRadius; //1/(radius**3)*1000000;//1/radius*100;
}

function densityOfRad(radius)
{
  if (radius > minRad)
  {
    return (canvasRadius**3)/(radius**3.5);
  }
  else
  {
    return (canvasRadius**3)/(minRad**3.5);
  }
}

function angledStretchedEllipse(size, radius, angle, stretch)
{
  push();
  translate(radius*cos(angle), -radius*sin(angle));
  rotate(-angle);
  fill(0);
  noStroke();
  var angledEllipse = ellipse(0,0, stretch*size, size);
  pop();
  return angledEllipse;
}
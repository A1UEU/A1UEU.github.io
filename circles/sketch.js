// Constants
const phi = 1.61803398875;
const noOfIndicators = 12;
var canvasWidth, canvasHeight, Radius;
var test;
const speed = 0.008;

class fircle {
  constructor(radius) {
    this.value = random();
    this.radius = radius;
  }
  draw()
  {
    if (this.value > 1) this.value = 0;
    noFill();
    // var circRadius = sin(this.value*2*3.1415) * this.radius;
    var circRadius = this.value * this.radius;
    stroke(255*this.value)
    ellipse(0, 0, circRadius, circRadius);
    this.value += speed;
  }
}

function setup() 
{
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);

  Radius = min([canvasHeight, canvasWidth])/phi;

  test = [new fircle(Radius), new fircle(Radius), new fircle(Radius)];
}


function draw()
{
  background(255);
  translate(canvasWidth/2, canvasHeight/2);
  for (i = 0; i<3; i++) 
  {
    test[i].draw();
  }
}

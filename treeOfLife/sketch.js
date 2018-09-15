// Constants
const PHI = 1.61803398875;
var canvasWidth = 100;
var canvasHeight = 100;

var trunkLength;
var progress;
var upWard;

var tree = []; //array of branches. 


function setup() 
{
  canvasHeight = 500;
  canvasWidth = 500;
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('logo');
  canvasRadius = min([canvasHeight, canvasWidth])/2;
  maxTrunkLength = canvasHeight/3;
  maxGenerations = 7;
  maxAngle = PI/3.7;

  tree = new Array();
  rootBegin = createVector(0, 0)
  originBranch = new Root(rootBegin);
  tree[0] = new Branch(originBranch, maxTrunkLength, 0, 1, 0);

  for (var generation = 0; generation < parseInt(maxGenerations); generation++)
  {
    for (var i = tree.length-1; i >= 0; i--)
    {
      if(!tree[i].hasBranches)
      {
        // console.log("Spawning generation ", generation, "number ", i);
        tree = tree.concat(tree[i].spawnNewBranches(maxAngle, generation));
      }
    }
  }
  progress = 0.000005;
}

function draw()
{
  background(255);
  translate(canvasWidth/2, canvasHeight); // to the origin!

  if (progress < 1)
  {
    for (var i = 0; i < tree.length; i++)
    {
      tree[i].growGenByGen(progressWeight(progress));
      tree[i].show();
      console.log("Growing...");
    }
    progress += 0.01;//0.0025;
  }
  if (progress > 1)
  {
    console.log("Calling age...");
    for (var i = 0; i < tree.length; i++)
    {
      tree[i].decay(0.005);
      tree[i].show();
      console.log("Decaying...");
    }

    noLoop();
  }

}

function Branch(originBranch, length, angle, grownBy, generation)
{
  this.originBranch = originBranch; // Von Objekten wird keine Kopie, sondern eine Referenz gehalten.
  this.length = length;
  this.angle = angle;

  this.grownBy = grownBy;
  this.decay = 0;
  this.hasBranches = false;
  this.generation = generation;

  this.end;

  this.show = function()
  {
    strokeWeight(this.grownBy*canvasRadius/50*(1-this.generation/maxGenerations)+1);
    stroke(0, 0, 255);
    stroke(218,165,32);

    this.updateEnd();
    line(this.originBranch.end.x, this.originBranch.end.y, this.end.x, this.end.y);
  }

  this.updateEnd = function()
  {
    this.end = p5.Vector.add(this.originBranch.end, p5.Vector.fromAngle(angleCorr(this.angle*this.grownBy), this.length*this.grownBy));
  }

  this.growGenByGen = function(progress)
  {
    // console.log(this.generation);
    this.grownBy = progress > this.generation/maxGenerations ? (progress - this.generation/maxGenerations)/(1 - this.generation/maxGenerations) : 0; 
  }

  this.decay = function(byAmount)
  {
    // if (this.angle > 0) this.angle += byAngle;
    // else if (this.angle < 0) this.angle -=byAngle;
    if (this.decay >= 0) this.decay += byAmount;
    else this.decay = 0;
  }

  this.spawnNewBranches = function(angle, generation)
  {
    this.updateEnd();
    var newBranches = new Array(new Branch(this, this.length/PHI, this.angle+angle, 1, this.generation+1), new Branch(this, this.length/PHI, this.angle-angle, 1, this.generation+1));
    this.hasBranches = true;
    return newBranches;  
  }
}

function Root(rootVector)
{
  this.origin = rootVector; 
  this.length = 0;
  this.angle = 0;
  this.grownBy = 0;
  this.hasBranches = false;
  this.generation = -1;
  this.end = rootVector;
}

function angleCorr(angle)
{
  return angle - PI/2
}

function progressWeight(progress) // linearer Fortschritt sorgt fuer nicht-linearen Wachstumsprozess
{
  return (-1/(progress*10+1)+1)*1.1;
}
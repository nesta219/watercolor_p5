var centerX;
var centerY;
var radius;
var totalDegrees = 360;
var redValue = 255;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(20);
  centerX = width / 4;
  centerY = height / 4;

  radius = height / 2;
  angleMode(DEGREES);
}

function draw() {
  translate(frameCount, frameCount);

  //background(0);
  //noFill();
  fill(255,255,255,2);
  stroke(redValue, 0, 0, 0);

  beginShape();

    for(var i = 0; i < totalDegrees; i++) {
      var noiseFactor = noise(i / 35, frameCount / 120);
      var x = centerX + radius * cos(i) * noiseFactor;
      var y = centerY + radius * sin(i) * noiseFactor;

      curveVertex(x, y);
    }

  endShape();

  radius -= 0.65;
  redValue -= .5;

  if(radius <= 0) {
    noLoop();
  }
}

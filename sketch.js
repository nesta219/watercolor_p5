var totalDegrees = 364;
var blobArray = [];

function createBlob(xPos, yPos) {
  var centerX = xPos;
  var centerY = yPos;
  var radius = random(height);
  var cutoff = random(radius);
  var r = random(255);
  var rFact = (random(255)/256) - 0.5;
  var g = random(255);
  var gFact = (random(255)/256) - 0.5;
  var b = random(255);
  var bFact = (random(255)/256) - 0.5;
  var xDir = (random(width) / width) - 0.5;
  var yDir = (random(height) / height) - 0.5;
  var lastX, lastY;

  return {
    update () {
      if(radius > cutoff) {
        noStroke();
        fill(r,g,b, 5);
        beginShape();
          centerX = (mouseX + centerX)/2;
          centerY = (mouseY + centerY) /2;
          var coordStack = [];
          for(var i = 0; i <= totalDegrees; i++){
            var noiseFactor = noise(i / 35, frameCount/120);
            var x = centerX + radius * cos(i) * noiseFactor;
            var y = centerY + radius * sin(i) * noiseFactor;
            lastX = x;
            lastY = y;

            if( i < 10) {
              coordStack.push({ x: x, y: y});
            }

            if(totalDegrees - i < 10) {
              var coords = coordStack.pop();
              curveVertex(coords.x, coords.y);
            } else {
              curveVertex(x, y);
            }

          }
        endShape(CLOSE);
        r += (rFact * frameCount) % 256;
        g += (gFact * frameCount) % 256;
        b += (bFact * frameCount) % 256;
        radius -= 0.65;
      }
    }
  };

}

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  angleMode(DEGREES);
}

function draw() {
  for(var i = 0; i < blobArray.length; i++) {
    blobArray[i].update();
  }
}

function mouseClicked() {
  blobArray.push(createBlob(mouseX, mouseY));
}

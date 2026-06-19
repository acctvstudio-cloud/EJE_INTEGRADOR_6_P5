let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let triangles;

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Load the triangle indices for drawing the mesh
  triangles = faceMesh.getTriangles();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the triangles
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < triangles.length; j++) {
      let indices = triangles[j];
      let pointAIndex = indices[0];
      let pointBIndex = indices[1];
      let pointCIndex = indices[2];
      let pointA = face.keypoints[pointAIndex];
      let pointB = face.keypoints[pointBIndex];
      let pointC = face.keypoints[pointCIndex];

      noFill();
      stroke(0);
      strokeWeight(0.25);
      triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
      circle(pointA.x,pointA.y,10);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable s 
  faces = results;
}

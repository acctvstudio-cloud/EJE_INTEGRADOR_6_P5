let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let triangles;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  triangles = faceMesh.getTriangles();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let kps = face.keypoints;

   
    let noseX = kps[1].x;

    for (let j = 0; j < triangles.length; j++) {
      let iA = triangles[j][0];
      let iB = triangles[j][1];
      let iC = triangles[j][2];

      let pA = kps[iA];
      let pB = kps[iB];
      let pC = kps[iC];

     
      if (pA.x < noseX && pB.x < noseX && pC.x < noseX) {
        noFill();
        stroke(0, 0, 255);
        strokeWeight(1);
        triangle(pA.x, pA.y, pB.x, pB.y, pC.x, pC.y);
      }
    }
  }
}

function gotFaces(results) {
  faces = results;
  if (faces.length > 0) {
	console.log(faces[0].keypoints);
  faceMesh.detect(gotFaces);}
  

}

const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../Models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../Models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../Models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../Models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,  
        err => console.error(err)
    )
}

startvideo()

document.getElementById('snap').addEventListener('click', () => {
    context.drawImage(video, 0, 0, 640, 480);
})

video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(detections)
    }, 100)
})
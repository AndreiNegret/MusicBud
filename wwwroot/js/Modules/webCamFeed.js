const vid = document.querySelector('.snapshot-camera');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/FaceDetectionModels'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/FaceDetectionModels'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/FaceDetectionModels'),
    faceapi.nets.faceExpressionNet.loadFromUri('/FaceDetectionModels')
]).then(startVideo);

function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }) // request cam
        .then(stream => {
            vid.srcObject = stream; // don't use createObjectURL(MediaStream)
            return vid.play(); // returns a Promise
        })
        .then(() => { // enable the button
            const btn = document.querySelector('.take-snapshot');
            btn.disabled = false;
            btn.onclick = e => {
                takeASnap()
                    .then(sendToServer);
            };
        });
    }
}

function takeASnap() {
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    const width = vid.videoWidth,
        height = vid.videoHeight;
    canvas.width = width; // set its size to the one of the video
    canvas.height = height;
    ctx.drawImage(vid, 0, 0); // the video
    return new Promise((res, rej) => {
        canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
}

function sendToServer(blob) {
    // uses the <a download> to download a Blob
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        const base64data = reader.result;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1337',
            data: JSON.stringify({
                imageData: base64data
            }),
            processData: false,
            success(res) {
                openModalMessage(res);
            },
            contentType: "application/json; charset=UTF-8"
        });
    }    
}

function openModalMessage(res) {
    const emotionSendModal = mainApp.$refs['emotion-send-modal'];
    emotionSendModal.setBodyText(`Your emotion is : ${res.emotion}`);
    emotionSendModal.$store.commit('setEmotion', res.emotion);
    emotionSendModal.show();
}

let camIsShown = false,
    displaySize = null,
    canvas = null;

function initFaceDetection() {
 
    const videoRect = document.querySelector('.snapshot-camera').getBoundingClientRect();
    canvas.width = videoRect.width;
    canvas.height = videoRect.height;
    canvas.style.left = videoRect.left + 'px';
    canvas.style.top = videoRect.top + 'px';
    displaySize = { width: videoRect.width, height: videoRect.height };
    faceapi.matchDimensions(canvas, displaySize);
}

$(document).ready(function () {
    $('#start-cam').click(function () {
        $('#start-cam').hide();
        $('.take-snapshot-container').show();
        camIsShown = true;
    });

    // init face detection
    setTimeout(() => {
        canvas = faceapi.createCanvasFromMedia(vid);
        document.body.append(canvas);
        canvas.style.position = 'absolute';
        initFaceDetection();
    }, 5000);

    // recalcute the dimensions on resize
    window.addEventListener('resize', () => {
        if (!canvas) return;
        initFaceDetection();
    });
});

vid.addEventListener('play', (evt) => {
    setInterval(async () => {
        if (!camIsShown || !displaySize || !canvas) return;
        const detections = await faceapi.detectAllFaces(vid, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 50);
});
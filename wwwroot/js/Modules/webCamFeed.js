const vid = document.querySelector('video');
navigator.mediaDevices.getUserMedia({ video: true }) // request cam
    .then(stream => {
        vid.srcObject = stream; // don't use createObjectURL(MediaStream)
        return vid.play(); // returns a Promise
    })
    .then(() => { // enable the button
        const btn = document.querySelector('button');
        btn.disabled = false;
        btn.onclick = e => {
            takeASnap()
                .then(sendToServer);
        };
    });

function takeASnap() {
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = vid.videoWidth; // set its size to the one of the video
    canvas.height = vid.videoHeight;
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
            contentType: 'application/json',
            data: JSON.stringify({
                imgData: base64data,
                imgWidth: vid.videoWidth,
                imgHeight: vid.videoHeight
            }),
            processData: false,
            dataType: 'json'
        });
    }
}
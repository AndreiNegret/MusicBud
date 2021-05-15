const vid = document.querySelector('video');
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
            contentType: "application/json; charset=UTF-8"
        });
    }    
}

$(document).ready(function () {
    $('#start-cam').click(function () {
        $('#start-cam').hide();
        $('.take-snapshot-container').show();
    });
});
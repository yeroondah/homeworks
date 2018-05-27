'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    console.log(app.limit);

    navigator.mediaDevices.getUserMedia(app.config)
    .then(str => {
      app.preview.srcObject = str;
      app.preview.addEventListener('canplay', () => {
        app.mode = 'recording';
        console.log(app.mode);

        const recorder = new MediaRecorder(str);
        let chunks = [];
        recorder.addEventListener('dataavailable', (e) => chunks.push(e.data));
        recorder.addEventListener('stop', () => {
          const recorded = new Blob(chunks, { 'type' : recorder.mimeType });
          chunks = null;
          console.log(recorded);

          createThumbnail(recorded)
            .then(frameBlob => {
              return { 'video' : recorded, 'frame' : frameBlob };
            })
            .then(done);
        });

        setTimeout(( () => {
          recorder.start();
          setTimeout(() => {
            recorder.stop();
            app.preview.srcObject = null;
            str.getTracks().forEach(track => track.stop());
          }, app.limit);
        }), 1000);
      });
    });


    setTimeout(() => {
      fail('Не удалось записать видео');
    }, app.limit + 10000);
  });
}

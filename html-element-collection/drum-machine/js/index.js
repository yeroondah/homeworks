'use strict';

let drums = document.getElementsByClassName('drum-kit__drum');

for (let drum of drums) {
  drum.onclick = function() {
    let sound = drum.getElementsByTagName('audio');
    for (let play of sound) {
      if (play.paused) {
        play.play();
      }
      else {
        play.currentTime = 0;
      } 
    }
  }
}

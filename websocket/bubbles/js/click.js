'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', (event) => {
  showBubbles(event.target);
});

document.addEventListener('click', (event) => {
  connection.send(JSON.stringify({
    x: event.clientX,
    y: event.clientY
  }));
});
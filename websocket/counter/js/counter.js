'use strict';

const webSocket = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counterOutput = document.querySelector('.counter');
const errorsOutput = document.querySelector('.errors');

window.addEventListener('beforeunload', () => {
  webSocket.close(1000, 'Работа закончена.');
});

webSocket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  counterOutput.textContent = data.connections;
  errorsOutput.textContent = data.errors;
});
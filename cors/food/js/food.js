'use strict';

const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const pic = document.querySelector('[data-pic]');
const votes = document.querySelector('[data-votes]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const cooks = document.querySelector('[data-consumers]');

function randName() {
  return 'cb' + String(Math.random()).slice(-6);
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.body.appendChild(script);
  });
}

function handleRecipe(data) {
  title.textContent = data.title;
  ingredients.textContent = data.ingredients.join(', ');
  pic.style.backgroundImage = `url(${data.pic})`;
}

function handleRating(data) {
  rating.textContent = data.rating.toFixed(2);
  votes.textContent = `(${data.votes} оценок)`;
  star.style.width = `${data.rating * 10}%`
}

function handleCooks(data) {
  function addCook(cook) {
    const userPic = document.createElement('img');
    userPic.src = cook.pic;
    userPic.title = cook.title;
    cooks.appendChild(userPic);
  }
  data.consumers.forEach(addCook);
  const more = document.createElement('span');
  more.textContent = `(+${data.total})`;
  cooks.appendChild(more);
}

loadData('https://neto-api.herokuapp.com/food/42')
  .then(handleRecipe)

loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(handleRating)

loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(handleCooks)
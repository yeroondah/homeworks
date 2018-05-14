'use strict';

const wallpaper = document.querySelector('[data-wallpaper]');
const username = document.querySelector('[data-username]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const tweets = document.querySelector('[data-tweets]');
const followers = document.querySelector('[data-followers]');
const following = document.querySelector('[data-following]');

let getData = document.createElement('script');
getData.src = 'https://neto-api.herokuapp.com/twitter/jsonp?callback=handleData';
document.head.appendChild(getData);

function handleData(data) {
  username.textContent = data.username;
  description.textContent = data.description;
  tweets.textContent = data.tweets;
  followers.textContent = data.followers;
  following.textContent = data.following;
  wallpaper.src = data.wallpaper;
  pic.src = data.pic;
}
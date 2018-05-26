'use strict';

const formSignIn = document.querySelector('.sign-in-htm');
const formSignUp = document.querySelector('.sign-up-htm');
const messageSignIn = formSignIn.querySelector('.error-message');
const messageSignUp = formSignUp.querySelector('.error-message');

initFormSubmit(formSignIn, 'https://neto-api.herokuapp.com/signin', messageSignIn, 'signin');
initFormSubmit(formSignUp, 'https://neto-api.herokuapp.com/signup', messageSignUp, 'signup');

function initFormSubmit(form, urlPOST, messageBlock, type) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dataToObj = {};

    for (const [key, value] of formData) {
      dataToObj[key] = value;
    }

    const request = fetch(urlPOST, {
      body: JSON.stringify(dataToObj),
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    request
      .then((result) => {
        if (200 <= result.status && result.status < 300) {
          return result;
        }
        throw new Error(response.statusText);
      })
      .then((result) => result.json())
      .then((data) => {
        const messageOKText = type === 'signin' ? `Пользователь ${data.name} успешно авторизован` : `Пользователь ${data.name} успешно зарегистрирован`;
        messageBlock.value = data.error ? data.message : messageOKText;
      });

  });
}

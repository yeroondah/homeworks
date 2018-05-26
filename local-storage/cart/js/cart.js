'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');
const cartForm = document.getElementById('AddToCartForm');
const urls = [
  'https://neto-api.herokuapp.com/cart/colors',
  'https://neto-api.herokuapp.com/cart/sizes',
  'https://neto-api.herokuapp.com/cart'
];

Promise.all(urls.map(url => fetch(url)))
  .then(resp => Promise.all(resp.map(result => result.json())))
  .then(([dataColors, dataSizes, dataCart]) => {
    snippetSwatchColor(dataColors);
    snippetSwatchSize(dataSizes);
    snippetCart(dataCart);
  });

// Добавление цветов
function snippetSwatchColor(data, colorDefault = 'red') {
  if (!data.length) {
    return;
  }

  if (localStorage.selectedColor === undefined) {
    localStorage.selectedColor = colorDefault;
  }

  for (let item of data) {
    const tpl = document.createElement('div');
    tpl.dataset.value = item.type;
    tpl.classList.add('swatch-element', 'color', item.type, item.isAvailable ? 'available' : 'soldout');
    tpl.innerHTML = `
      <div class="tooltip">${item.title}</div>
      <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${item.type === colorDefault ? 'checked' : ''} ${!item.isAvailable ? 'disabled' : ''}>
      <label for="swatch-1-${item.type}" style="border-color: ${item.code};">
        <span style="background-color: ${item.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    `;

    const radio = tpl.querySelector('input');
    radio.checked = localStorage.selectedColor === radio.value;
    radio.addEventListener('change', (event) => {
      localStorage.selectedColor = event.target.value;
    });

    colorSwatch.appendChild(tpl);
  }
}

// Добавление размеров
function snippetSwatchSize(data, sizeDefault = 'xl') {
  if (!data.length) {
    return;
  }

  if (localStorage.selectedSize === undefined) {
    localStorage.selectedSize = sizeDefault;
  }

  for (let item of data) {
    const tpl = document.createElement('div');
    tpl.dataset.value = item.type;
    tpl.classList.add('swatch-element', 'plain', item.type, item.isAvailable ? 'available' : 'soldout');
    tpl.innerHTML = `
      <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${item.type === sizeDefault ? 'checked' : ''} ${!item.isAvailable ? 'disabled' : ''}>
      <label for="swatch-0-${item.type}">
        ${item.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    `;

    const radio = tpl.querySelector('input');
    radio.checked = localStorage.selectedSize === radio.value;
    radio.addEventListener('change', (event) => {
      localStorage.selectedSize = event.target.value;
    });

    sizeSwatch.appendChild(tpl);
  }
}

function snippetCart(data) {
  if (!data.length) {
    return;
  }

  let totalPrice = 0;

  while (quickCart.firstChild) {
    quickCart.removeChild(quickCart.firstChild);
  }

  for (let item of data) {
    const tplProduct = document.createElement('div');
    tplProduct.id = `quick-cart-product-${item.id}`;
    tplProduct.classList.add('quick-cart-product', 'quick-cart-product-static');
    tplProduct.setAttribute('style', 'opacity: 1;');
    tplProduct.innerHTML = `
      <div class="quick-cart-product-wrap">
        <img src="${item.pic}" title="${item.title}">
        <span class="s1" style="background-color: ${item.color}; opacity: .5">$${item.price.toFixed(2)}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
    `;
    totalPrice += item.price * item.quantity;
    quickCart.appendChild(tplProduct);
  }

  const tplCart = document.createElement('a');
  tplCart.id = 'quick-cart-pay';
  tplCart.setAttribute('quickbeam', 'cart-pay');
  tplCart.classList.add('cart-ico', data.length ? 'open' : '');
  tplCart.innerHTML = `
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${totalPrice.toFixed(2)}</span>
    </span>
  `;

  quickCart.appendChild(tplCart);

  const removeBtn = quickCart.querySelector('.remove');
  const count = quickCart.querySelector('.count');

  removeBtn.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    const formData = new FormData();
    formData.append('productId', id);
    fetchRequest(formData, 'https://neto-api.herokuapp.com/cart/remove');

    if (parseInt(count.textContent) === 1) {
      while (quickCart.firstChild) {
        quickCart.removeChild(quickCart.firstChild);
      }
    }
  });

}

cartForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  formData.append('productId', event.currentTarget.dataset.productId);
  fetchRequest(formData, 'https://neto-api.herokuapp.com/cart');
});

function fetchRequest(data, url) {
  fetch(url, {
    body: data,
    credentials: 'same-origin',
    method: 'POST'
  })
  .then((result) => {
    if (200 <= result.status && result.status < 300) {
      return result;
    }
    throw new Error(response.statusText);
  })
  .then((result) => result.json())
  .then((data) => {
    if (data.error) {
      console.error(data.message);
    } else {
      snippetCart(data);
    }
  });
}

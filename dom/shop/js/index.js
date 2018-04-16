'use strict';

let buttons = document.getElementsByClassName('add');
let finalPrice = document.getElementById('cart-total-price');
let finalQty = document.getElementById('cart-count');
let sum = parseInt(finalPrice.innerHTML);
let qty = parseInt(finalQty.innerHTML);

for (let button of buttons) {
  button.addEventListener('click', calcFinalPrice);
  button.addEventListener('click', calcFinalQty)
}

function calcFinalPrice() {
  let price = parseInt(this.getAttribute('data-price'));
  sum += price;
  finalPrice.innerHTML = sum;
}

function calcFinalQty() {
  qty++;
  finalQty.innerHTML = qty;
}
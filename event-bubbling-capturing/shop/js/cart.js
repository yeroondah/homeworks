'use strict';

list.addEventListener('click', cartLoader);

function cartLoader(event) {
  event.preventDefault();

  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }

  const itemInfo = {
    title: event.target.dataset.title,
    price: event.target.dataset.price
  };

  addToCart(itemInfo);
}
'use strict';

let contacts = JSON.parse(loadContacts());
let list = document.querySelector('#container .contacts-list');

for(let i = 0; i < contacts.length; i++) {
  let newListItem = document.createElement('li');
  newListItem.innerHTML = contacts[i].name;
  newListItem.setAttribute('data-phone', contacts[i].phone);
  newListItem.setAttribute('data-email', contacts[i].email);
  list.appendChild(newListItem);
}



  



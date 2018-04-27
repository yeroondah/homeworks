'use strict';

const toDoList = document.querySelector('.todo-list');
const doneList = toDoList.querySelector('.done');
const undoneList = toDoList.querySelector('.undone');
const inputsList = toDoList.querySelectorAll('input[type="checkbox"]');

toDoList.addEventListener('change', (event) => {
  const parentTypeList = event.target.parentElement.parentElement;
  const removeCurrentInput = parentTypeList.removeChild(event.target.parentElement);

  if (parentTypeList.classList.contains('done')) {
    removeCurrentInput.firstElementChild.removeAttribute('checked');
    undoneList.insertBefore(removeCurrentInput, null);
  } else {
    removeCurrentInput.firstElementChild.setAttribute('checked', '');
    doneList.insertBefore(removeCurrentInput, null);
  }

  doneList.querySelectorAll('label').length === 0 ? doneList.style.display = "none" : doneList.style.display = "block";
  undoneList.querySelectorAll('label').length === 0 ? undoneList.style.display = "none" : undoneList.style.display = "block";
});
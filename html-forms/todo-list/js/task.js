'use strict';

const taskCounter = document.querySelector('output');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const taskList = document.querySelector('.list-block');
let doneTask = 0;
Array.from(checkboxes).forEach(checkbox => {
	if(checkbox.checked === true) {
		taskCounter.value = ++doneTask;
	}

  checkbox.addEventListener('change', () => {
		if(checkbox.checked === true) {
			taskCounter.value = ++doneTask;
		}
		else {
			taskCounter.value = --doneTask;
		}
	});

	checkbox.addEventListener('change', () => {
		if (Array.from(checkboxes).length === doneTask) {
			taskList.classList.add('complete');
		}
		else {
			taskList.classList.remove('complete');
		}
	});
});

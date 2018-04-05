'use strict';

let buttons = document.getElementsByClassName('wrapper-dropdown');

for (let button of buttons) {
  button.onclick = function() {
		button.classList.toggle('active');
	}
}


'use strict';

const converter = document.getElementById('content');
const amountField = document.getElementById('source');
const convertFromField = document.getElementById('from');
const convertToField = document.getElementById('to');
const result = document.getElementById('result');
const loader = document.getElementById('loader');


loader.classList.remove('hidden');

let xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
	converter.classList.remove('hidden');
	loader.classList.add('hidden');
})

window.addEventListener('load', () => {

	xhr.open(
		"GET",
		"https://neto-api.herokuapp.com/currency",
		false
	);
	xhr.send();

	let currencyData = JSON.parse(xhr.responseText);

	createCurrencyList(convertFromField);
	createCurrencyList(convertToField);


	amountField.addEventListener('input', (e) => {
		convertCurrency();
	});

	convertFromField.addEventListener('change', (e) => {
		convertCurrency();
	});

	convertToField.addEventListener('change', (e) => {
		convertCurrency();
	});

	function createCurrencyList(parent) {
		for (let currency of currencyData) {
			let option = document.createElement('option');
			option.innerHTML = currency.code;
			parent.appendChild(option);
		}
	}

	function getCurrencyValue(target) {
		let value = currencyData.find(function(elem) {
			return elem.code === target;
		});
		return value.value;
	}

	function convertCurrency() {
		let a = parseInt(amountField.value);
		let b = parseInt(getCurrencyValue(convertFromField.value));
		let c = parseInt(getCurrencyValue(convertToField.value));
		result.value = parseFloat(a * b / c).toFixed(2);
	}
});




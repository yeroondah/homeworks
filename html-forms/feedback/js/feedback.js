window.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.contentform');
  const output = document.getElementById('output');
  const inputList = form.querySelectorAll('[name]');
  const btnSubmit = form.querySelector('.button-contact');
  const btnEdit = output.querySelector('.button-contact');
  let countInputFill = 0;

  for (let input of inputList) {
    input.addEventListener('change', (event) => {
    if (event.currentTarget.name !== 'phone' && event.currentTarget.name !== 'email') {
      document.getElementById(event.currentTarget.name).value = event.currentTarget.value;
    }

    event.currentTarget.value !== '' ? countInputFill++ : countInputFill--;

    if (countInputFill === inputList.length) {
      btnSubmit.removeAttribute('disabled');
      form.removeAttribute('novalidate');
      form.setAttribute('validate', '');
    } else {
      btnSubmit.setAttribute('disabled', '');
      form.setAttribute('novalidate', '');
      form.removeAttribute('validate');
    }
    });

    if (input.name === 'zip') {
    input.addEventListener('input', (event) => {
      event.currentTarget.value = event.currentTarget.value.replace(/\D/, '');
    });
    }
  }

  btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    form.classList.add('hidden');
    output.classList.remove('hidden');
  });

  btnEdit.addEventListener('click', (event) => {
    event.preventDefault();
    output.classList.add('hidden');
    form.classList.remove('hidden');
  });
});
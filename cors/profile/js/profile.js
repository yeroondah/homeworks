'use strict';
const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologiesList = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');

function randName() {
  return 'cb' + String(Math.random()).slice(-6);
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.body.appendChild(script);
  });
}

function handleUserData(data) {
  name.textContent = data.name;
  description.textContent = data.description;
  pic.src = data.pic;
  position.textContent = data.position;
  return new Promise((done, fail) => {
    done(data.id)
  });
}

function handleTechnologies(technologies) {
  function addToList(tech) {
    const techBadge = document.createElement('span');
    techBadge.classList.add('devicons', `devicons-${tech}`)
    technologiesList.appendChild(techBadge)
  }
  technologies.forEach(addToList);
  content.style.display = 'initial';
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(handleUserData)
  .then(id => loadData(`https://neto-api.herokuapp.com/profile/${id}/technologies`))
  .then(handleTechnologies)
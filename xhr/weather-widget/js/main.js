const request = new XMLHttpRequest();
request.addEventListener('load', loadData);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

function loadData(event) {
  console.log(event.target);
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);
    setData(response);
  }
}
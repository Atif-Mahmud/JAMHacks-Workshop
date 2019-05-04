const app = document.getElementById('root');

const logo = document.createElement('img');

logo.src = 'https://upload.wikimedia.org/wikipedia/sco/thumb/c/ca/Studio_Ghibli_logo.svg/800px-Studio_Ghibli_logo.svg.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

// Add card
function addCard(movie) {
  // Create a div with a card class
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  // Create an h1 and set the text content to the film's title
  const h1 = document.createElement('h1');
  h1.textContent = movie.title

  // Create a p and set the text content to the film's description
  const p = document.createElement('p');
  movie.description = movie.description.substring(0, 300); // Limit the description to 300 characters
  p.textContent = `${movie.description}...`; // Ending with elises

  // Append the cards to the container element
  container.appendChild(card)

  // Each card will contain an h1 and a p
  card.appendChild(h1)
  card.appendChild(p)
}

// Regular XMLHttpRequest
var request = new XMLHttpRequest()

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => addCard(movie))
  } else {
    console.log('error')
  }
}

// Promise based Fetch API request
function addMovies() {
  fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => response.json())
    .then(movies => movies.forEach(movie => addCard(movie)))
    .catch(err => console.err);
}

// Call either request.send() or...
addMovies()


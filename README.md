# JamHacks Web 2

## Overview
**API** stands for Application Program Interface, which can be
defined as a set of methods of communication between various
software components. In other words, an API allows software to
communicate with other software.

We'll be focusing specifically on Web APIs for this workshop.
Web APIs allow a web server (which we'll cover if time permits)
to interact with third-party software. In this case, the web server is using HTTP requests to communicate to a publicly available URL **endpoint** containing **JSON** data.

You may be familiar with the concept of a CRUD app, which stands for Create, Read, Update, Delete. Any programming language can be used to make a CRUD app with various methods. A web API uses HTTP requests that correspond to the CRUD verbs.

| Action | HTTP Method | Description |
| - | - | - |
| Create | `POST` | Creates a new resource |
| Read | `GET` | Retrieves a resource |
| Update | `PUT/PATCH` | Updates an existing resource |
| Delete | `DELETE` | Deletes a resource |

## Setting Up
What is our objective? We want to get the data for all Studio Ghibli films and display the titles and descriptions in a grid. For some background knowledge, Studio Ghibli is a Japanese animation studio that produced several films, such as Spirited Away.

We're going to start by creating an index.html file in a new directory. The project will only consist of index.html, style.css, and scripts.js at the end. This HTML skeleton just links to a CSS and JavaScript file, loads in a font, and contains a div with a root id. This file is complete and will not change. We'll be using JavaScript to add everything from here out.

### Extra
> If you are interested in seeing your changes reflected in the browser as you save your files locally you'll need a file watcher. I recommend browser sync

Browser-Sync is a command line tool that let's you watch local files and reflect those changes in the browser immediately (without pressing refresh). It is an NPM package, so you'll need the latest version of node package manager (see: https://nodejs.org/en/)

`npm install -g browser-sync`

`browser-sync`

## Connecting to the API
Let's take a look at the [Studio Ghibli API documentation](https://ghibliapi.herokuapp.com/). This API was created to help developers learn how to interact with resources using HTTP requests, which is perfect for us here. Since an API can be accessed by many different methods - JavaScript, PHP, Ruby, Python and so on - the documentation for most APIs doesn't tend to give specific instructions for how to connect.

We can see from this documentation that it tells us we can make requests with curl or regular REST calls.

In order to see an API call in action, you can simply enter the URL of the **endpoint** into your browser to retrieve the response.

To get started, let's scroll to the [films section](https://ghibliapi.herokuapp.com/#tag/Films). On the right you'll see GET /films. It will show us the URL of our API endpoint, https://ghibliapi.herokuapp.com/films. Clicking on that link will display an array of objects in JSON.

If you've never worked with JSON before please checkout [this](https://www.taniarascia.com/how-to-use-json-data-with-php-or-javascript/) article and consider getting a [JSON viewer chrome-extension](https://chrome.google.com/webstore/category/extensions?hl=en)

## Retrieving the data with an HTTP request

Before we try to put anything on the front end of the website, let's open a connection the API. We'll do so using XMLHttpRequest objects, which is a way to open files and make an HTTP request.

We'll create a request variable and assign a new XMLHttpRequest object to it. Then we'll open a new connection with the open() method - in the arguments we'll specify the type of request as GET as well as the URL of the API endpoint. The request completes and we can access the data inside the onload function. When we're done, we'll send the request.

```javascript
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function () {
  // Begin accessing JSON data here
}

// Send request
request.send()
```

## Working with the JSON response
Now we've received a response from our HTTP request, and we can work with it. However, the response is in JSON, and we need to convert that JSON in to JavaScript objects in order to work with it.

We're going to use JSON.parse() to parse the response, and create a data variable that contains all the JSON as an array of JavaScript objects. Using forEach(), we'll console log out the title of each film to ensure it's working properly.

```javascript
var data = JSON.parse(this.response)

// Arrow function (lambda expression/nameless function)
data.forEach(movie => console.log(movie.title))
```

If you now open the developer console, you should see the titles of Ghibli films.

### Error Handling
The only thing we're missing here is some way to deal with errors. What if the wrong URL is used, or the URL broke and nothing was being displayed? When an HTTP request is made, the response returns with HTTP status codes. 404 is the most well-known response, meaning Not Found, and  200 OK is a successful request.

Let's just wrap our code in an if statement, succeeding on any response in the 200-300 range, and log out an error if the request fails. You can mess up the URL to test the error.

```javascript
if (request.status >= 200 && request.status < 400) {
  data.forEach(movie => console.log(movie.title))
} else {
  console.log('error')
}
```

### Extra
Alternatively, we can use ES6 [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

```javascript
fetch('https://ghibliapi.herokuapp.com/films')
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => console.log(movie.title));
    })
    .catch(err => console.error);
```

## Displaying the Data
In order to display information on the front end of a site, we'll be working with the DOM, which is actually an API itself that allows JavaScript to communicate with HTMl. If you have no experience at all with the DOM, check out [this article](https://www.digitalocean.com/community/tutorials/introduction-to-the-dom).



If you remember, our index.html just has a root div - `<div id="root">` right now. We'll access it with `getElementById()`. We can briefly remove all the previous code we've written for now, which we'll add back in just a moment.

```javascript
const app = document.getElementById('root')
```

If you're not 100% positive what `getElementById()` does, take the above code and  `console.log(app)`. That should help clarify what is actually happening there.

The first thing in our website is the logo, which is an img element. We'll create the image element with `createElement()`.

```javascript
const logo = document.createElement('img')
```

An empty img is no good, so we'll set the src attribute to logo.png. [Here](https://i.imgur.com/VQSX8oo.png)

```javascript
logo.src = 'https://i.imgur.com/VQSX8oo.png'
```

We'll create another element, a div this time, and set the class attribute to container.

```javascript
const container = document.createElement('div')
container.setAttribute('class', 'container')
```

Now we have a logo and a container, and we just need to place them in the website. We'll use the  `appendChild()` method to append the logo image and container div to the app root.

```javascript
app.appendChild(logo)
app.appendChild(container)
```

All together that is:
```javascript
const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'https://i.imgur.com/VQSX8oo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)
```

Instead of `console.log` this time, inside the foreach, we will set the text of an HTML element to the data from the API using `textContent`. In this example, we use substring() on the p element to limit the description and keep each card equal length.

## Conclusion
That's pretty much it, we've succesfully made a `GET` request to a REST API endpoint and populated our app with the data. Congratulations on completing your first webapp. All that's left is to make it pretty.

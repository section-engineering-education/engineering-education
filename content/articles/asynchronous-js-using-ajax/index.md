---
layout: engineering-education
status: publish
published: true
url: /asynchronous-js-using-ajax/
title: Asynchronous JavaScript - Fetching Data From an External API using AJAX
description: In this article we will learn how to fetch data from an external API using AJAX. AJAX is a technology that allows us to fetch data from an external API without reloading the full page.
author: godwin-martins
date: 2021-11-22T00:00:00-13:10
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/asynchronous-js-using-ajax/hero.jpg
    alt: Asynchronous JavaScript AJAX
---
*AJAX* stands for Asynchronous JavaScript and XML. It is a set of web technology used to send and receive data between a client and server.
<!--more-->
Ajax allows you to make requests asynchronously without having to reload the page. In addition, Ajax can send and receive information in various formats, including JSON, XML, HTML, and text files.

In this tutorial, to show how Ajax works, we'll create a JavaScript program that fetches data from an external API, formats it, and returns random Chuck Norris jokes.

It's pretty simple. Ajax goes out, gets the jokes, and then displays them to the user.

### Prerequisites
To follow along with this tutorial, you will need to have some knowledge of the following:
- [JavaScript](https://www.geeksforgeeks.org/introduction-to-javascript/)
- [HTML](https://www.w3schools.com/html/default.asp)
- [Skeleton CSS](http://getskeleton.com/#intro)
- [How APIs work](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
- A code editor (Preferably [Visual Studio Code](https://code.visualstudio.com/))

### Goals of the tutorial
This tutorial aims to create a webpage that gets random jokes from the [Chuck Norris Jokes  API](http://api.icndb.com/random) and displays them to the user.

At the end of this tutorial, the reader will know how to make a call to an external API, get data and display the result on the webpage.

First things first, let's build the UI.

- Create a new HTML file and save it as `index.html`.
- Use the HTML boilerplate given below.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

- Change the title to your preferred title.
- Add the Link tag given below to include Skeleton CSS CDN. Skeleton CSS helps build a simple and responsive UI.

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"
  integrity="sha512-5fsy+3xG8N/1PV5MIJz9ZsWpkltijBI48gBzQ/Z2eVATePGHOkMIn+xTDHIfTZFVb9GMpflF2wOWItqxAP2oLQ=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

- Create a form with an input and a button.

```html
<div class="container">
  <form>
    <div>
      <label for="number"> Number of jokes to generate</label>
      <input id="number-of-jokes" type="number" id="number" />
    </div>

    <div>
      <button id="generate-jokes">Generate Jokes</button>
    </div>
  </form>
</div>
```

- Create an ordered list (`ol`) for the jokes to render below the form.
- Create a JavaScript file and save it as `index.js`.
- Include the `index.js` in the HTML file.

- Your HTML file should look like this 👇:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Skeleton CSS -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"
      integrity="sha512-5fsy+3xG8N/1PV5MIJz9ZsWpkltijBI48gBzQ/Z2eVATePGHOkMIn+xTDHIfTZFVb9GMpflF2wOWItqxAP2oLQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <title>Getting Jokes from External API</title>
  </head>
  <body>
    <div class="container">
      <h2>Asynchronous JS Joke Generator</h2>
      <form>
        <div>
          <label for="number"> Number of jokes to generate</label>
          <input id="number-of-jokes" type="number" id="number" />
        </div>

        <div>
          <button id="generate-jokes">Generate Jokes</button>
        </div>
      </form>
      <ol id="jokes"></ol>
    </div>

    <script src="./index.js"></script>
  </body>
</html>
```

### The JavaScript

- Open `index.js`.
- Grab the button from the DOM.

```JavaScript
const button = document.querySelector("#generate-jokes");
```

- Add an event listener to the button to listen for a click.

```JavaScript
button.addEventListener("click", generateNewJokes);
```

### Prepare the AJAX request
- Create a function named `generateNewJokes()` for the click event.
- Grab the `#number-of-jokes` element from the UI and assign it to a variable.
- Create a variable called request and set it to a new [XHR](https://en.wikipedia.org/wiki/XMLHttpRequest) object.

```JavaScript
function generateNewJokes(e) {
  const newXHRRequest = new XMLHttpRequest();
  const numberOfJokes = document.querySelector("#number-of-jokes").value;
}
```

> "***XMLHttpRequest (XHR)*** objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing" - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).

- Inside the `generateNewJokes` function, create the object, `newXHRRequest.open()` that takes three parameters:

1. The HTTP request method, in this case is a [GET method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
2. A DOMString representing the URL to which the request is sent to.
3. Async is an optional boolean set to `true`, indicating the operation to be asynchronous.

```JavaScript
newXHRRequest.open(
  "GET",
  `http://api.icndb.com/jokes/random/${numberOfJokes}`,
  true
  // the numbers of jokes is appended to the url after a forward slash to specify the numbers of jokes to fetch from the server
);
```

- Set `newXHRRequest.onload` to a function.

```JavaScript
newXHRRequest.onload = function () {};
```

### Inside the newXHRRequest.onload function
- Check if [XHR STATUS](https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp) returns a 200.
- Parse the response text in JSON format to a variable.
- Initialize a variable and set it to nothing (we will use it to concatenate the response).
- Check to see if the response type returns success.
- If the response type returns "success", create a [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) loop to loop through the values of the response to get the jokes. Then append the joke inside a list tag (using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) for flexible formatting).
- If the response type is not a success, append an error response to the list item.
- Set the `innerHTML` of the `ol` with the class of jokes to the output.

```JavaScript
if (this.status === 200) {
  const myJokes = JSON.parse(this.responseText);

  let output = "";

  if (myJokes.type === "success") {
    myJokes.value.forEach(function (joke) {
      output += `<li>${joke.joke}</li>`;
    });
  } else {
    output += `<li>Sorry! Couldn't get jokes</li>`;
  }

  document.querySelector("#jokes").innerHTML = output;
}
```

- Then, send the newXHRRequest.

```JavaScript
newXHRRequest.send();
```

> **Please Note:**
>
> *To prevent the button from performing its default action, use the `e.preventDefault()` on the function called when the button is clicked.*
>
> The [Chuck Norris Jokes API](http://api.icndb.com/random) can only generate random jokes; that is how the API works.
>
> You can style the output to whichever way suits you.

The final JavaScript file should look like this 👇:

```JavaScript
const button = document.querySelector("#generate-jokes");

button.addEventListener("click", generateNewJokes);

function generateNewJokes(e) {
  const newXHRRequest = new XMLHttpRequest();
  const numberOfJokes = document.querySelector("#number-of-jokes").value;

  newXHRRequest.open(
    "GET",
    `http://api.icndb.com/jokes/random/${numberOfJokes}`,
    true
  );

  newXHRRequest.onload = function () {
    if (this.status === 200) {
      const myJokes = JSON.parse(this.responseText);
      let output = "";
      if (myJokes.type === "success") {
        myJokes.value.forEach(function (joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += `<li>Sorry! Couldn't get jokes</li>`;
      }

      document.querySelector("#jokes").innerHTML = output;
    }
  };

  newXHRRequest.send();

  e.preventDefault();
}
```

The final application will look like this:

![Output](/engineering-education/asynchronous-js-using-ajax/output.png "Final Output")

### Conclusion
Using the **Internet Chuck Norris Database (ICNDB) API** is an easy way to show how getting data from an external API using AJAX works. For example, Ajax uses the GET method to pull jokes from the Internet Chuck Norris Jokes Database.

A point to note is that not all APIs work the same way, nor do they handle requests and respond the same way. Therefore, it is imperative to check the documentation of the API one intends to work with.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)

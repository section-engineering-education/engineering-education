---
layout: engineering-education
status: publish
published: true
url: /introduction-to-web-scraping-with-javascript-and-puppeteer/
title: Introduction to Web Scraping With JavaScript and Puppeteer
description: This article takes the reader through web scraping with javaScript and puppeteer. Web scraping enables users to get data from any website even if it does not provide a public API and display it on a web page.
author: kevin-murimi
date: 2021-09-08T00:00:00-06:11
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-web-scraping-with-javascript-and-puppeteer/hero.jpg
    alt: Introduction to Web Scraping With JavaScript and Puppeteer Hero Image
---
Most of our web apps require data to process and present to the user. There are many sources of data like databases and APIs.

But we can also get data from any website even if it does not provide a public API. This process is known as **web scraping**, and we will take a look at it in this article. 
<!--more-->
We will use Puppeteer and Node.js (a JavaScript runtime environment). More information about puppeteer can be found [here](https://github.com/puppeteer/puppeteer).

### Goal
By the end of this tutorial, you should be able to get data from any website and display it on a web page.

### Prerequisites
To be able to follow along in this tutorial, you will need to have an understanding of the following concepts:
- Basic knowledge of HTML and CSS.
- Intermediate JavaScript knowledge.
- A code editor, preferably VS Code, installed on your machine.
- A web browser, preferably chrome.
- Node.js installed on your computer.

> You should note that not all websites allow the scraping of data. Make sure to check a website's policy before you scrape data from it. In this article, we will scrape Amazon. Amazon allows scraping as long as you extract publicly available data such as product information, price, and reviews.

### Setting up our project
Open your code editor and create a folder named price-tracker.
Then, open your terminal and type:

```bash
npm init -y
```

The code above will create a JSON file and store it in our directory.

Next, we need to install various npm packages:
- `express` - Express is the Node.js framework that we are going to use to configure our backend.
- `puppeteer` - We will use this to visit web pages and extract the data we need.
- `nodemon` - Nodemon restarts the node application automatically when changes are detected after saving the file.

To install these npm packages, run the following commands in your terminal:

```bash
npm install express
```

```bash
npm install --save-dev nodemon
```

```bash
npm install puppeteer
```

When you install puppeteer, it automatically downloads a recent/updated version of chromium.

### Setting up our server
To start our Node.js server with Express, we create a file named `index.js` that is used as the entry point.

Open the file and add the following code:

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

This is the Express JS starter template used to create a server.

We first import the express package using `const express = require('express')`.

Then, we create an instance of our app using `const app = express()` and specify the port we will listen to using `const port = 3000`.

`app.listen` is a method that takes two arguments. The first argument is the port number that the server will listen to. The second argument is a callback function that is executed when a connection is successfully established.

To start the server, key in the following command and press enter:

```bash
nodemon index.js
```

Now when you navigate to `http://localhost:3000/`, you will see the message "Server is running". This means that you have successfully started the server, and you can now proceed to the next steps.

#### Setting up puppeteer
Since our server is working, it's time we set up puppeteer to get started with web scraping. In our **index.js** file, add the following line of code just below the line that sets the port number:

```js
const puppeteer = require("puppeteer");
```

The above code imports the puppeteer package into our app.

In this tutorial, this is the [URL](https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/) of the product that we will be tracking on amazon: 

So we assign the URL to a constant using the line of code below:

```bash
const url = 'https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/'
```

Now it's time to configure the browser. Add this code in the **index.js** file.

```js
async function configureTheBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  return page;
}
```

The code is explained below:
- `puppeteer.launch()` - It is a puppeteer method that launches the browser.
- `puppeteer.newPage` - It is a puppeteer method used to open a new page.
- `puppeteer.goto()` - It is a method that instructs the browser on which URL to go to. It takes two arguments, although the second one is optional. The first parameter is the actual URL. The second argument is used to disable timeout errors if the page you are loading is heavy.

Next up, we need to grab the page markup and extract the exact information we need.

Before doing this, open your browser and go to the [URL](https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/) provided. From this page, we need to get the image of the keyboard, its price, and its name. Follow these steps:
1. Right-click on the image and select the **inspect** option.
2. The action above will open the developer tools. On the elements tab, you will see the page's markup, specifically the **img** since it's the one we are inspecting. Note the **id** of the image from the attributes of the image and note it down somewhere. In this case, the **id** is **landingImage**.
3. Next up, right-click on the price of the keyboard and select **inspect**. Note down the **id** of the span containing the price of the keyboard. In this case, the id is **priceblock_ourprice**.
4. Right-click on the keyboard name and click **inspect**. Note down the **id** of the span containing the keyboard name. In this case, it is **productTitle**.

With the above information, we can now write the function we need to extract the information we require. Below is the code:

```js
async function checkDetails(page) {
  let html = await page.evaluate(() => {
    return {
      product: document.querySelector("#productTitle").innerText,
      price: document.querySelector("#priceblock_ourprice").innerText,
      image: document.querySelector("#landingImage").src,
    };
  });
  return html;
}
```

Code explanation:
- We are using the `evaluate()` method, a puppeteer method used to get the content of the web page. This method takes a callback function and in it, we can add the code needed to get the elements of the page that we require. In this case, we need the product name, its price, and its image src. This callback function returns an object containing the information that we get from the webpage.
- To get the product name, price, and the image src, we use the `querySelector()` method that usually returns the first element within the current document that matches the selector we have specified. To learn more about `querySelector()`, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
- We assign the results of the `evaluate` method to a variable named `html`.
- Then, the `checkDetails` function returns `html`, which is a variable that contains the information that we grabbed from the webpage.

#### Setting up the express routes
We need to set up an express route that will get the scraped data and send it to our client-side once the specific route is invoked.

```js
app.get("/price", async (req, res) => {
  let page = await configureTheBrowser();
  let results = await checkDetails(page);
  res.send(results);
});
```

Code explanation:

The code above defines a simple route that responds to a GET request. To learn more about express routing, click [here](https://expressjs.com/en/starter/basic-routing.html).

The `get` method takes two parameters. One is the route, and the other one is the callback function that is executed when the route is invoked.

The callback function takes two parameters, request from the client-side and the response it sends back. Inside the callback function, we call the `configureTheBrowser()` function and store the value it returns in a variable named page.

We then call the `checkDetails()` function and pass the page variable to it. We store the value returned by the function in a variable named results and finally send it to the client-side as a response.

Here is the whole code for the index.js file:

```js
const express = require("express");
const app = express();
const port = 3000;
const puppeteer = require("puppeteer");

//Serving static files
app.use(express.static("public"));

const url =
  "https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/";

async function configureTheBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  return page;
}

async function checkDetails(page) {
  let html = await page.evaluate(() => {
    return {
      product: document.querySelector("#productTitle").innerText,
      price: document.querySelector("#priceblock_ourprice").innerText,
      image: document.querySelector("#landingImage").src,
    };
  });
  return html;
}

app.get("/price", async (req, res) => {
  let page = await configureTheBrowser();
  let results = await checkDetails(page);
  res.send(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

### Setting up our frontend
Inside our project directory, create a folder named public. Inside the folder, create two files named `index.html` and `main.js`.

Open the index.html and paste the code below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <style>
    .container {
      display: flex;
      flex-direction: row;
      padding: 1rem;
    }
    .details {
      display: flex;
      flex-direction: column;
      padding-left: 1rem;
    }
    img {
      width: 300px;
      height: auto;
    }
    span {
      padding: 1rem 0;
    }
  </style>
  <body>
    <div class="container">
      <div class="imageHolder">
        <img id="image" />
      </div>
      <div class="details">
        <span id="price"></span>
        <span id="product"></span>
      </div>
    </div>

    <button id="scrape">Check Price</button>

    <script src="main.js"></script>
  </body>
</html>
```

The code contains the CSS code to style our webpage and HTML code. Inside the HTML code, we have a button that we will use to get the page data from the backend. Note that the HTML file is linked to a js file.

Open the Js file and type the code below:

```js
const scrape = document.getElementById("scrape");

scrape.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  getPrice();
});

async function getPrice() {
  const response = await fetch("/price");

  //returns a promise so we need to convert it json
  const data = await response.json();
  console.log(data);

  document.querySelector("#image").setAttribute("src", data.image);
  document.querySelector("#price").innerText = data.price;
  document.querySelector("#product").innerText = data.product;
}
```

This Js file listens to a click event on the button and uses an asynchronous function together with the fetch API to get fetch data from the backend. 

To learn more about the fetch API, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### Starting our application
Save all your files and open the terminal. Type the following command and press enter:

```bash
nodemon index.js
```

This will start the server. Open your browser and navigate to this URL: Example app listening at http://localhost:3000/

The page contains a button with the text "Check Price". Click on it and wait for the details of the keyboard to be displayed.

### Conclusion
This example is simple but it is a good introduction to web scraping. Always make sure to check whether a website allows web scraping before you scrape data. Now that we have managed to scrape and track the price of a single product, go ahead and try to track multiple products. 

You can also create a web app that tracks prices of similar items from different sellers, compares the prices, and suggests to the user from which seller he/she should buy.

Happy Scraping!

### Further reading
- [Getting Started with Web Scraping using Python](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

# Introduction to web scraping with javascript and puppeteer

When developers need data for their web apps, they usually lookup for an API (Application Programming Interface), hoping that it will have the data they need for the app. This API is created by someone else and we expect it to have the exact data that we need. But this is not always the case. We may also need data from a certain website which unfortunately does not have an API. This is where web scraping comes in.

In this article, we are going to learn how we can get data from any website using JavaScript and Puppeteer. Puppeteer is a Node library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

## Goal:
By the end of this tutorial, you should be able to get data from any website and display it in a HTML page.

## Prerequisites:
To be able to follow along in this tutorial, you will need to have an understanding of the following concepts:
- Basic knowledge of HTML and CSS.
- Intermediate JavaScript knowledge.
- A code editor, preferably VS Code, installed on your machine.
- A web browser, preferably chrome.
- NodeJs installed on your computer.
- Basic understanding of the express framework.
- Understanding of arrow functions in JavaScript.
- Understanding of asynchronous JavaScript.


> One important thing to note is that not all websites allow scraping of data. Make sure to check a website's policy before you scrape data from it. In this tutorial, we are going to scrape Amazon. Amazon allows scraping as long as you are extracting publicly available data such as product information, price nad reviews. 


## Setting up our project
Open your code editor and create a folder named price-tracker.
Then open the terminal and type the following command:

```bash
npm init -y
```
This will generate a json file.

Next, we need to install various npm packages:
- express - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- puppeteer - Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.
- nodemon - Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

To install these packages, run the following commands:
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

## Setting up our server
To start our NodeJs server with Express, we create a file named index.js which will be used as the entry point.
Open the file and add the following code:

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
This is the Express JS starter template used to create a server. The code is explained below:
We first import the express package using **const express = require('express')**
Then, we create an instance of our app using **const app = express()** and specify the port we will listen to using **const port = 3000**.

**app.listen** is a method that takes two arguments. The first argument is the port number which the server is going to listen to and the second argument is a call back function that will be executed when a connection is successfully established.

To start the server, run the following command on the terminal
```bash
nodemon index.js
```
Now when you navigate to  http://localhost:3000/, you will see the message "Hello World". This means that you have successfully started the server.

## Setting up puppeteer
Since our server is working, its time we set up puppeteer so that we can get started with web scraping.
In our **index.js** file, add the following line of code just below the line that sets the port number.

```js
const puppeteer = require('puppeteer');
```
This imports the puppeteer package into our app.

In this tutorial, this is the URL of the product that we will be tracking on amazon: https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/

So we assign the URL to a constant using the line of code below:

```bash
const url = 'https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/'
```

Now its time to configure the browser. Paste the following code in the **index.js** file.

```js
async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    return page;
}
```
The code is explained below:
- puppeteer.launch() is a puppeteer method that launches the browser.
- puppeteer.newPage is a puppeteer method that is used to open a new page.
- puppeteer.goto() is a method that instructs the browser on which url to go to. It takes two arguments although the second one is optional. The first parameter is the actual url. The second argument is used to disable timeout errors if you're loading a heavy page.


Next up, we need to grab the page markup and extract the exact information we need.
Before doing this, open your browser and go the url provided(https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/). From this page, we need to get the image of the keyboard, its price and its name. Follow the steps below:

1. Right click on the image and select **inspect**.
2. The action above will open the developer tools and on the elements tab, you will the markup of the page specifically the **img** since its the one we are inspecting. Note the **id** of the image from attributes of the image and note it down somewhere. In this case the **id** is **landingImage**. 
3. Next up, right click on the price of the keyboard and select **inspect**. Note down the **id** if the span containing the price of the keyboard. In this case the id is **priceblock_ourprice**.
4. Right click on the keyboard name and click **inspect**. Note down the **id** of the span comtaining the keyboard name. In this case, it is **productTitle**

With the above information, we can now write the function we need to extract the information we need. Below is the code:
```js
async function checkDetails(page) {
    let html = await page.evaluate(() => {
        return{
            product: document.querySelector('#productTitle').innerText,
            price: document.querySelector('#priceblock_ourprice').innerText,
            image: document.querySelector('#landingImage').src
        }
    });
    return html;
}
```

Code explanation:
* We are the evaluate() method which is a puppeteer method that is used to get the content of the webpage. This method takes a callback function where we can add the code needed to get the elements of the page that we need. In this case, we need product name, its price and its image src. This callback function returns an object containing the information that we get from the webpage.
* To get the product name, price and the image src, we use the querySelector method that returns the first element within the document that matches the specified selector. To learn more about the querySelector, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).
*   We assign the results of the evaluate method to a variable named html.
* Then the checkDetails function returns html which is a variable that contains the information that we grabbed from the webpage.


## Setting up the express route
Now, we need to set up an express route that will get the scraped data and send it to our client side once the specific route in invoked.

```js
app.get('/price', async (req, res) => {
    let page = await configureBrowser();
    let results = await checkDetails(page);
    res.send(results);
})
```
Code explanation:
The code above defines a simple route that responds to a GET request. To learn more about express routing, click [here](https://expressjs.com/en/starter/basic-routing.html)

The get method takes two parameters. One is the route and the other one is the callback function that is executed when the route is invoked.

The callback function takes two parameters, request from the client side and the response it sends back.
Inside the callback function, we call the configureBrowser() function and store the value it returns in a variable named page.
We then call the checkDetails() function and pass the page variable to it. We store the value returned by the function in a variable named results and finally send it to client side as a response.


Here is the whole code for the index.js file:
```js
const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');

//Serving static files
app.use(express.static('public'));

const url = 'https://www.amazon.com/Redragon-S101-Keyboard-Ergonomic-Programmable/dp/B00NLZUM36/';

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    return page;
}

async function checkDetails(page) {
    let html = await page.evaluate(() => {
        return{
            product: document.querySelector('#productTitle').innerText,
            price: document.querySelector('#priceblock_ourprice').innerText,
            image: document.querySelector('#landingImage').src
        }
    });
    return html;
}

app.get('/price', async (req, res) => {
    let page = await configureBrowser();
    let results = await checkDetails(page);
    res.send(results);
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
 })
```

## Setting up our frontend
Inside our project directory, create a folder named public. Inside the folder, create two files named index.html and main.js

Open the index.html and paste the code below:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    img{
        width: 300px;
        height: auto;
    }
    span{
        padding: 1rem 0;
    }
</style>
<body>

    <div class="container">
        <div class="imageHolder">
            <img id="image">
        </div>
        <div class="details">
            <span id="price"></span>
            <span id="product"></span>
        </div>
    </div>

    <button id='scrape'>Check Price</button>

    <script src="main.js"></script>
</body>
</html>
```
The code basically contains the CSS code to style our webpage and HTML code. Inside the HTML code we have a button that we will use to get the page data from the backend.
Note that the html file is linked to a js file.

Open the js file and paste the code below:
```js
const scrape = document.getElementById('scrape');
        
        scrape.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('clicked')
            getPrice();
        })

        async function getPrice(){
            const response = await fetch('/price');

            //returns a promise so we need to convert it json
            const data = await response.json();
            console.log(data);

            document.querySelector('#image').setAttribute('src', data.image);
            document.querySelector('#price').innerText = data.price;
            document.querySelector('#product').innerText = data.product;
        }
```
This Js file listens to a click event on the button and uses an asynchronous function together with the fetch api to  get fetch data from the backend. To learn more about the fetch api, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)


## Starting our application
Save all your files and open the terminal. Type the following command and hit enter:
```bash
nodemon index.js
```

This will start the server. Open your browser and navigate to this url: Example app listening at http://localhost:3000/
The page contains a button with the text "Check Price". Click on it and wait for the details of the keyboard to be displayed.


## Conclusion
This is a pretty simple example but its a good introduction to web scraping.
Always make sure to check whether a website allows web scraping before you scrape data.

Happy Scraping!

Happy Coding!

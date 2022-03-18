---
layout: engineering-education
status: publish
published: true
url: /build-a-web-scraper-using-cheerio/
title: How to Build a Web Scraper using Express.js, Node.js, and Cheerio
description: In this tutorial will walk through how to build a web scraper using Express.js, Node.js and Cheerio.
author: muhammed-umar 
date: 2022-02-17T00:00:00-11:45
topics: [Languages, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/build-a-web-scraper-using-cheerio/hero.jpg
    alt: How to Build a Web Scraper using ExpressJs, Node.js and Cheerio Hero Image
---
As developers, we may be tasked with getting data from a website without an API. Some websites allow for the extraction of data through the process of "Web Scraping" without restrictions, while others have restrictions to data that can be scraped. In either case, the site's legal policy should be understood and adhered to.
<!--more-->
Web scraping helps in automation tasks, such as replacing a tedious process of manually listing products of a website, extracting the country code of all the countries in a drop-down list, and much more. This process is beneficial to Data scientists, making it easier to extract and organize the data in tables for proper analysis.

Software developers can also convert this data to an API. In this tutorial you will build a web scraper that extracts data from a cryptocurrency website and outputting the data as an API in the browser. You will use Node.js, Express, and Cheerio to build the scraping tool.

### Prerequisites
You will need the following to understand and build along:
- An IDE installed.
- A good internet connection.
- Basic Knowledge of JavaScript.
- Have Node.js installed.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Checking for web scraping permissions](#checking-for-web-scraping-permissions)
- [Creating the Project](#creating-the-project)
- [Installing Packages](#installing-packages)
- [Editing the JavaScript file](#editing-the-javascript-file)
- [Understanding Cheerio](#understanding-cheerio)
- [Parsing the HTML with Cheerio](#parsing-the-html-with-cheerio)
- [Express routes](#express-routes)
- [Conclusion](#conclusion)
- [References](#references)

### Checking for web scraping permissions
The first thing to consider when you want to scrape a website should be to check whether it grants permission for scraping, and what actions aren't permitted. Placing a `robots.txt` text in front of the website like so:

`https://coinmarketcap.com/robots.txt` should give the result below:

![robots](/engineering-education/build-a-web-scraper-using-cheerio/robots.PNG)

From the image above, you have the permission to scrape data from the homepage but it disallows you from scraping some tabs in the individual currencies page.

### Creating the project
For this project, you will create a new folder in your windows explorer. Name it Custom Web Scraper or whatever name you'd prefer. Open up the folder in VScode, it should be empty at this point, before adding the necessary files to your project you need to ensure that Node.js is installed. 

Node.js is a server environment that supports running JavaScript code in the terminal, the server will be created with it. Now that you have Node.js installed you can use the Node Package Manager(NPM), open up the terminal in your VScode, and run:

```bash
cd Custom Web Scraper
```

This takes you to the current project directory, next enter:

```bash
npm init
```

The command above initializes a project and create a package.json file where the packages you install will be kept. Click enter and the `package.json` file will be created. You will get a few prompts on the information you want the file to contain. Take note of the entry point created - `index.js`. Your project now contains a package.json file, open it up and the fields should look like this:

```json
{
  "name": "custom-web-scraper",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": ""
  },
  "author": "",
  "license": "ISC"
}
```

Now that you have your entry point as `index.js` in the `package.json` file, create a new file and name it `index.js`. This is where your code will be written.

### Installing packages
- Installing ExpressJs: ExpressJs is a backend framework for Node.js. You will be installing it to listen to PORTS i.e. the port you set for your server. To check if everything works perfectly. Go ahead and run:

```bash
npm i express
```

The command above installs the express dependency for your project.

- Installing Cheerio: Cheerio helps to parse markup, it is used to pick out HTML elements from a webpage. It provides an API that allows you to manipulate the resulting data structure. 

Run:

```bash
npm i cheerio
```

This will install the Cheerio dependency in the package.json file

- Installing Axios: Axios is used to make HTTP requests. Run the command below to install the dependency.

```bash
npm i axios
```

- Installing Nodemon: Nodemon is a tool that helps reload a node application when changes are being made to it. 

Now run:

```bash
npm i nodemon
```

Open the `package.json` file to see the installed packages.

```json
{
  "name": "custom-web-scraper",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.24.0",
    "cheerio": "^1.0.0-rc.10",
    "express": "^4.17.2",
    "nodemon": "^2.0.15"
  }
}
```

The dependencies field contains the packages you have installed and their versions. Also, edit the scripts to listen to changes in the index.js file using nodemon.

### Editing the JavaScript file
To import your packages, use the `require()` function. Edit the `index.js` file to look like so:

```javascript
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
```

Next, initialize express so that it listens to the PORT you want to use. Let's say you decide to use `PORT: 5000`, you should be able to know if the server is running or if it isn't.

Edit the index.js file to look like this:

```javascript
const PORT = 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
```

To check if your server is running on the assigned PORT, run:

```bash
npm run start
```

The display on the terminal should look like this:

![port](/engineering-education/build-a-web-scraper-using-cheerio/port.PNG)

Awesome! It works.

>Note: You don't always have to type `npm run start` when you make a change to your script, nodemon takes care of reloading when you save your changes.

Now focusing on the actual scraping, get the url of the website you want to scrape in this case Coin Market's Website. Axios takes this url, makes a HTTP request, and then returns a response data. This response data can be displayed in the terminal.

Effect this in your index.js:

```javascript
const url = "https://coinmarketcap.com/";
axios(url).then((response) => {
  const html_data = response.data;
  const $ = cheerio.load(html_data);
});
```

From the code above, you will notice that the response gotten from the HTTP request is assigned to the variable `html_data`.

### Understanding Cheerio
In the code snippet above, you loaded the HTML elements into Cheerio using the `.load()` method and stored it in the `$` variable similar to jQuery. With the elements loaded you can retrieve DOM elements based on the data you need. 

Cheerio makes it possible to navigate through the DOM elements and manipulate them, this is done by targeting tags, classes, ids and hrefs. For example, an element with a class of submitButton can be represented as $('.submitButton'), id as $('#submitButton') and also pick a h1 element by using $('h1'). Cheerio provides methods like `find()` to find elements, `each()` to iterate through elements, `filter()` method amongst others.

### Parsing the HTML with Cheerio
Before parsing a HTML page you must first inspect the structure of the page. In this case, you want to pick the name of each coin, its current price, and other relevant data. 

Right-click on Coin Market's page, you'll notice that the data is stored in a table, You will find a list of rows `tr` inside the `tbody` tag. Right-click on the `tr` element and click `copy selector`. 

Next, edit the `index.js` file to resemble this:

```javascript
  const selectedElem =
      '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr';
    const keys = [
      'No.',
      'Coin',
      'Price',
      '24h',
      '7d',
      'Marketcap',
      'Volume',
      'CirculatingSupply',
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 9) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;

              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
  return coinArray;
}
```

From the code shown, you have stored the `copy selector` string in the `selectedElem` variable and looped through the rows using Cheerio's `each` method. The each method takes both the `parentIndex` and `parentElement` as arguments. Next, a condition is set to select the first ten rows and use the `.children()` method to loop through each column and `.text()` to get the values.

This should give details like serial number, coin name, price, 24h, and the rest as displayed on the page. An empty object called `coinDetails` is created to hold the key-value pair of data that is scraped.

Also, to assign the data to labels, an array called `keys` is created with labels inside and a `keyIndex` counter is incremented every time the each loop runs over the children elements. This helps map each label to its respective child value. Each `coinDetails` is added into the `coinArray` using the `push()` method.

### Express routes
The final code for your scraper should resemble this, edit your index.js file.

```javascript
const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

async function cryptopriceScraper() {
  const url = "https://coinmarketcap.com/";
  const coinArray = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const selectedElem =
      "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";
    const keys = [
      "No.",
      "Coin",
      "Price",
      "24h",
      "7d",
      "Marketcap",
      "Volume",
      "CirculatingSupply",
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 9) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
  return coinArray;
}

app.get("/api/crypto", async (req, res) => {
  try {
    const crypto = await cryptopriceScraper();
    return res.status(200).json({
      result: crypto,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});

app.listen(PORT, () =>
  console.log(`The server is active and running on port ${PORT}`)
);
```

As a final process, the code above sets up an express route `/api/crypto` to send the scraped data to the client-side when it is called. Express uses the `get` method which takes the request and response as parameters. 

It implements a try-catch block to call the `cryptoPriceScraper` and displays a JSON API on the browser when the request is successful otherwise an error message is displayed. To view the scraped data go to your browser and type `http://localhost:5000/api/crypto`. The result should be the image below:

![cryptodata](/engineering-education/build-a-web-scraper-using-cheerio/cryptodata.PNG)

### Conclusion
In this project, you have learned how to scrape data from a Cryptocurrency website. You have also become familiar with parsing HTML elements with Cheerio as well as manipulation. With this knowledge you can scrape through any website of your choice, but note that it is essential to first check for legal policies before scraping a site.

Have fun scraping!

### References
- [Getting started with web scraping using python](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/)
- [Cheerio package documentation](https://www.npmjs.com/package/cheerio)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)

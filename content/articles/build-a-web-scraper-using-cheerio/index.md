# Build a web scraper using ExpressJs, NodeJs, and Cheerio

### Introduction
As developers, we may be tasked with getting data from a website without an API. Some websites allow for the extraction of data through the process of "Web Scraping" without restrictions, while others have restrictions to data that can be scraped. In either case, the site's legal policy must be understood and adhered to.
Web scraping assists us in the process of task automation. It replaces the tedious manual process of listing the products on a website, extracting the country code of all the countries in a drop-down list, and much more. This process is beneficial to Data scientists, making it easier to extract and organize the data in tables for proper analysis. Software developers can also convert these data to API.
In this tutorial We will build a web scraper that extracts data from a cryptocurrency website, outputting the data as an API in the browser. We will use NodeJs, Express, and Cheerio for building our scraping tool. 

### Prerequisites
You would need the following to understand and build along:
- An IDE installed
- Good internet connection
- Basic Knowledge of Javascript

### Table of contents
- [Check for web scraping permissions](#check-for-web-scraping-permissions)
- [Creating the project](#creating-the-project)
- [Installing Packages](#installing-packages)
- [Creating our script](#creating-our-script)
- [Understanding Cheerio](#understanding-cheerio)
- [Parsing the HTML with Cheerio](#parsing-the-html-with-cheerio)
- [Express routes](#express-routes)
- [Conclusion](#conclusion)
- [References](#references)

### Check for web scraping permissions?
The foremost factor to consider when we want to scrape a website should be to check whether it allows for scraping, and what actions aren't permitted. Placing a `robots.txt` text in front of the website like so:
`https://coinmarketcap.com/robots.txt` should give the result below:

![robots](/engineering-education/build-a-web-scraper-using-cheerio/robots.png)

We have the go-ahead to scrape from the homepage but it disallows us from scraping some tabs in the individual currencies page. 


### Creating the Project
For this project, we will create a new folder in our windows explorer. We name it Custom Web Scraper or whatever name you'd prefer. Open up the folder in vs code, it should be empty at this point. Before adding the necessary files to our project we need to ensure NodeJs is installed. NodeJs is a server environment that supports running Javascript code on the terminal. We will be creating our server with it.  Head over to the NodeJs official website and download the LTS recommended for your Operating System.
Now that we have NodeJs installed we can use the Node Package Manager(NPM), open up the terminal in your vs code, and type:
```bash 
cd Custom Web Scraper
```
This takes us to the current project directory, next enter ```npm init```. What this does is initialize the project and create a package.json file where the packages we install will be kept. Click enter and the package.json file will be created, we get a few prompts on the information we want the file to contain, also take note of the entry point created - ```index.js```. Our project now contains a package.json file, open it up and the fields should look like this:
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
  "license": "ISC",
}
```
Now that we have our entry point as index.js in the package.json file, let's create a new file and call it index.js. This is where our code will be written. 

### Installing Packages
 - Installing ExpressJs - ExpressJs is a backend framework for NodeJs. We will be installing it to listen to PORTS i.e the port we set for our server. To check if everything works perfectly. Go ahead and run:
 ```bash
 npm i express
 ```
 The command above installs the express dependency for our project.
- Installing Cheerio - Cheerio helps to parse markup, it is used to pick out html elements from a webpage. It provides an API that allows for manipulating the resulting data structure. We will be looking at some of these methods in the next section. Run 
```bash 
npm i cheerio 
```
This should install the cheerio dependency in the package.json file

- Installing Axios - Axios is used to make HTTP requests. Let's run the command below to install the dependency.
```bash 
npm i axios 
```
- Installing Nodemon - Nodemon is a tool that helps to reload a node application when changes are being made to it. Lastly, let's run:
```bash
npm i nodemon
``` 
Let's open the package.json file to see the installed packages.
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
The Dependencies field contains the packages we have installed and their versions. Also, I edited the scripts to listen to changes in the index.js file using nodemon.

### Creating our script
To import our packages, we use the `require()` function. Edit the `index.js` file to look like so:

```javascript
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
```
Next, let us initialize express so that it listens to the PORT we want to use. Let's say we decide to use `PORT: 5000`, We should be able to know if our server is running or if it isn't.
Edit the index.js file to resemble this:
```
const PORT = 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
```
To check if our server is running on the assigned PORT, run`npm run start`.The display on the terminal should look like this:
![port](/engineering-education/build-a-web-scraper-using-cheerio/port.png)

Awesome! It works. 
- Note: we don't always have to type ```npm run start``` whenever we make a change to our script, nodemon takes care of reloading when we save our changes.

Now focusing on the actual scraping, Let's get the url of the website we want to scrape - in our case Coin Market's Website.
Axios takes this url, makes a HTTP request, and returns response data. This response data can be displayed in the terminal.
Let's effect this in our index.js:

```javascript
const url = 'https://coinmarketcap.com/';
axios(url)
  .then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);
});
```
From the above, we notice that the response gotten from the HTTP request is assigned to the variable `html_data`.


### Understanding Cheerio
In the code snippet above, we have loaded the html elements into cheerio using the .load() method and stored it in the `$` variable similar to jQuery.
With the elements loaded we can retrieve DOM elements based on the data we need. Cheerio makes it possible to navigate through the DOM elements and manipulate them, we do this by targeting tags, classes, ids and hrefs. For example, an element with a class of submitButton can be represented as $('.submitButton'), id as $('#submitButton') and also pick a h1 element by using $('h1'). Cheerio provides methods like `find()` to find elements, `each()` to iterate through elements, `filter()` method amongst others.

### Parsing the HTML with Cheerio
Before parsing a html page we must first inspect the structure of the page.
We want to pick the names of each Coin, its current price, and other relevant data. Right-click on Coin Market's page, we notice that the data are stored in a table, We find a list of rows `tr` inside the `tbody` tag. Right-click on the `tr` element and click `copy selector`. We should see the HTML elements exposed like so:

![cheerio](/engineering-education/build-a-web-scraper-using-cheerio/cheerio.png)

Next, let's edit the `index.js` file to resemble this:
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
From the code shown,  We store the `copy selector` string in the `selectedElem` variable and loop through the rows using Cheerio's `each` method. The each method takes both the `parentIndex` and `parentElement` as arguments. Next, we set a condition to select the first ten rows and use the `.children()` method to loop through each column and `.text()` to get the values. This should give us details like serial number, coin name, price, 24h, and the rest as displayed on the page. We create an empty object called `coinDetails` to hold the key-value pair of data we have scraped. Also, to assign the data to labels, we created an array called `keys` with labels inside and incremented a `keyIndex` counter every time the each loop ran over the children elements. This helps to map each label to its respective child value. Finally, we add each `coinDetails` into the `coinArray` using the `push()` method. 

### Express routes
The final code for our scraper should resemble this, edit your index.js file.
```javascript
const PORT = 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

async function cryptopriceScraper() {
  const url = 'https://coinmarketcap.com/';
  const coinArray = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

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


app.get('/api/crypto', async (req, res) => {
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

As a final process, we set up an express route `/api/crypto` to send the scraped data to the client-side when it is called. Express uses the `get` method which takes the request and response as parameters. We implement a try-catch block to call the `cryptoPriceScraper` and display a JSON API on the browser when the request is successful else we get an error message.
To view the scraped data go to your browser and type `http://localhost:5000/api/crypto`. The result is the image below:

![cryptodata](/engineering-education/build-a-web-scraper-using-cheerio/cryptodata.png)

### Conclusion
We have just learned how to scrape data from a website in the just concluded project. It's essential to first check for legal policies before scraping a site. Now that we have successfully scraped some cryptocurrency data, we may decide to build an extension that notifies us of crypto prices using the data, we can scrape through NFT websites, e-commerce websites depending on our needs by simply altering the website url. 
Have fun scraping!

### References
- [Getting started with web scraping using python](https://www.section.io/engineering-education/getting-started-with-web-scraping-using-python/)
- [Cheerio package documentation](https://www.npmjs.com/package/cheerio)




   
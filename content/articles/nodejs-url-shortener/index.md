---
layout: engineering-education
status: publish
published: true
url: /nodejs-url-shortener
title: How to Build a Custom URL Shortener using Node.js, Express, and MongoDB
description: In this article, we use Node.js, Express and MongoDB to build a custom URL shortener web app like Bit.ly.
author: mary-njeri
date: 2021-04-06T00:00:00-14:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-url-shortener/hero.jpg
    alt: node url shortener example image
---
Using links or URLs has been the norm for surfing the web for a long time. Sometimes we need to advertise our businesses on social media. Long URL links are not the best way to post these links, especially on social media. Doing this will help you promote your products or any services with the links provided.
<!--more-->
The benefit of URL shortening tools is in helping drive traffic back to your website. 

In this tutorial, we will build a URL shortener service using Node.js.

### Prerequisites
1. A basic understanding of the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming language.
   
2. A basic understanding of [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) framework.
   
3. Have [Postman](https://www.postman.com/downloads/) HTTP API client installed on your system.
   
4. A text editor, preferably [VS Code](https://code.visualstudio.com/download).

5. [MongoDB](https://www.mongodb.com/try/download/community) database server installed on your system.

### Setting up the project
Create a folder named `URL-Shortener-Service` and open it on your favorite IDE. I will be using VS Code here. Go inside the folder and type `npm init` to generate an initial `package.json` for our project. 

This command will require some prompts, to skip this, you can use `npm init -y`. Our project will use various npm packages from the npm registry. 

The npm packages will include:
- `express`: Express is a backend web application framework for Node.js used for building web applications and APIs.

- `mongoose`: Mongoose is an asynchronous database driver or Object Data Mapper for MongoDB. It is responsible for connecting to the database and performing query operations.

- `short-id`: The `short-id` module creates user-friendly and unique ids for our URLs.

- `valid-url`: This is a module that verifies all the URLs sent to the API.

- `nodemon`: nodemon package will be installed as a development dependency. It will constantly monitor our applications by automatically restarting the server when any file changes.
  
Next, we now need to download the packages. 

Run the following command on your terminal to download them:

```bash
npm install express mongoose shortid valid-url
```

This will download the named packages inside `node_modules` folder and update the `package.json` file with the dependencies.

> Note: `nodemon` is a development dependency. To install this, run the command `npm install --save-dev nodemon`.

### Setting up express server
Inside our `URL-Shortener-Service` folder, create a file named `server.js`. 

Then following is the initial code to start the Express server:

```js
   // import express package(commonJS syntax)
   const express = require('express')

   // instatiate the express app  
   const app = express()

   const PORT = process.env.PORT || 5000
   // Listen for incoming requests
   app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))
```

This starter code imports the express package. The `app = express()` creates an instance of our application. In our app, we need to listen to the incoming request. 

`app.listen` takes a port number and a callback function that is invoked upon a successful connection.

### Configuring the MongoDB connection inside the 'db.config.js'
We will use the `mongoose` package that we installed via npm as the database driver. To configure the database, create a `config` folder inside our `URL-Shortener-Service` folder. Inside the `config` folder, add a file named `db.config.js`. 

This is the file to add the following database connection code:

```js
// import mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb://localhost:27017/urlshortener'

// establishing a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

// export the connection object
module.exports = connection
```

The `const mongoose = require('mongoose')` imports the `mongoose` package from the `node_modules` folder. To start a connection on our MongoDB database, we need a database connection port. This is named as the `DB_URI` connection string with the `urlshortener` as the database name. 

The `mongoose.connect()` is a method that takes the `DB_URI` and an options object to establish a connection. `module.exports` exports the connection that will be added in our `index.js` server entry file.

### The database model for URL details
When using mongoose, models are defined using a `Schema` interface. A Schema will allow us to define all the fields stored in each document along with the validation or default values. 

Schemas will then be transformed into models using the `mongoose.model()` method. The model is what we use to find, create, update, and delete documents of a given type.

To create our model, create a folder named `models`. 

Inside this folder, add a file named `UrlModel.js` and add the following code:

```js
const mongoose = require('mongoose')

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create a model from schema and export it
module.exports = mongoose.model('Url', URLSchema)
```

To create a model, we need to create a schema interface by importing the mongoose npm package. The `mongoose.Schema` method is instantiated to define with and object argument. This object takes the values that our MongoDB document will store. 

The values include:
- The `urlCode` is a string property that will store the unique ID related to each URL.
  
- The `longUrl` is the default URL which we need to shorten.
  
- The property `shortUrl` is the actual short URL that will be generated.
  
- The `date` property has a default property and is created once the `model` is instantiated in the database.

### Defining routes
Our routes will be on a separate folder. Inside the `URL-Shortener-Service` folder, create a folder named `routes`. 

We will create two route files named:
1. `url.js`: This will be a POST route that takes an incoming request with the long URL and creates the short URL and inserts it into the database. Navigate in the `routes` folder and create a file named `url.js`.
  
2. `redirect.js`: This is a GET for our URL redirects. It takes the short URL and redirects it to the actual long URL in the browser. To add this file, create a separate file named `redirect.js` inside the `routes` folder.

#### The `url.js` POST route 
Now, let's create the POST route. 

Add the following code inside the `url.js` file:
```js
// packages needed in this file
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

// creating express route handler
const router = express.Router()

// import the Url database model
const Url = require('../models/Url')

// @route    POST /api/url/shorten
// @description     Create short URL

// The API base Url endpoint
const baseUrl = 'http:localhost:5000'

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body // destructure the longUrl from req.body.longUrl

    // check base url if valid using the validUrl.isUri method
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    // if valid, we create the url code
    const urlCode = shortid.generate()

    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        try {
            /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
            let url = await Url.findOne({
                longUrl
            })

            // url exist and return the respose
            if (url) {
                res.json(url)
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + urlCode

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router
```

A code walkthrough for our `url.js` file:

### The redirect route
Now that we have created a POST route that creates the short URL, we need to perform a redirect so that our short URL points to the actual URL. This is a GET request to our Node.js API to query. 

Here is the code to add in the `redirect.js` file:

```js
const express = require('express')

const router = express.Router()

const Url = require('../models/Url')

// : app.get(/:code)

// @route       GET /:code
// @description    Redirect to the long/original URL 
router.get('/:code', async (req, res) => {
    try {
        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})


module.exports = router
```

Let's now understand the code above. To set up a router in express, we need to import the `express` module and initialize the `express.Router()` method. This API route requires the database model we created to save the short URL that will be generated. 

For this to happen, we need to import `valid-url` for validation and `short-id` that will create the unique ID for our short URL. Our localhost application will use a base URL (`baseUrl` variable) as `http:\\localhost:5000`. 

We now need to extract the `longUrl` from our request body, validate id with the `valid-url` package by executing the method `validUrl.isUri(baseUrl)` and pass the URL as the argument. 

If the URL is valid, we generate a short code using the `const urlCode = shortid.generate()` and append it to our base URL before saving it to the database. This process is asynchronous and that is why we use promises or async-await syntax.

### The final 'index.js' entry file

```js
const express = require("express")
const app = express()

// Database config
const connection = require('./config/db')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))
```

To make our routes work, we have to use a [middleware pattern](https://expressjs.com/en/guide/using-middleware.html#middleware.application) such as Express. Middleware functions have access to request (req) and response object (res) in the application’s request-response cycle. This explains the `app.use()` methods. 

The first middleware allows our application to parse incoming request data format in JSON format. The `app.use('/', require('./routes/redirect'))` is the base URI that will configure the redirect route. 

In our POST route, the base URL is `/api/url` and the middleware as `app.use('/api/url', require('./routes/url'))`. Next, we need to test the application in Postman.

### A working demo in Postman
![Demo GIF](/engineering-education/nodejs-url-shortener/postman.gif)

Kindly check the source code in my GitHub repository [here](https://github.com/marienjus/Node-URL-Shortener-Service).

### Conclusion
Having a link management platform will let you harness the power of sharing, managing, and analyzing links. Billions of links are created every year on the internet and a URL shortener service is useful especially in social media marketing. 

In this tutorial, we created a simple URL shortener service using Node.js and MongoDB as the database. I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
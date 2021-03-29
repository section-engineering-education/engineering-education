Using links or URLs has been the norm of surfing the web for a long time. Sometimes we need to advertise our businesses in social media. Long URL links are not 
the best way to post links, especially on social media. This will help you to promote your products or any services with the links you are providing. 
The benefit of URL shortening tools is helping in driving the traffic back to your website. In this tutorial, we will build a URL shortener service using Node.js.

### Prerequisites
1. A basic understanding of the [JavaScript]() programming language.
   
2. A basic understanding of [Node.js]() and [Express]() framework.
   
3. [Postman]() HTTP client installed on your system.
   
4. A text editor, preferrably [VS Code]().

5. [MongoDB]() database server installed on your system.

### Setting Up The Project
Create a folder named `URL-Shortener-Service` and open it on your favorite IDE. I will be using VS Code here. Go inside the folder and type `npm init` to generate an initial package for our project. This command will require some prompts, to skip this, you can use `npm init -y`. Our project will use various npm packages from the npm registry. The npm packages include:
- `express`: Express is a backend web application framework for Node.js for building web applications and APIs.

- `mongoose`: Mongoose is an asynchronous database driver or Object Data Mapper for MongoDB. It is responsible for connecting to the database and performing query operations.

- `short-id`: The `short-id` module creates user-friendly and unique ids for our URLs.

- `valid-url`: This is a module that verifies all the URLs sent to the API.

- `nodemon`: nodemon package will be installed as a development dependency. It will constantly monitors our application by automatically restarting the server when any file changes.
  
Next, we now need to download the packages. Type the following command on your terminal to download them:

```bash
npm install express mongoose shortid valid-url
```
This will download the named packages inside `node_modules` folder and update the `package.json` file with the dependencies.

>>> Note: `nodemon` is a development dependency. To install this, run the command `npm install --save-dev nodemon`.


### Setting Up Express server
Inside our `URL-Shortener-Service` folder, create a file named `server.js`. The following is the initial code to start the Express server:
```js
    const express = require('express')

    const app = express()

    const PORT = process.env.PORT || 5000

    app.listen(PORT, ()=> console.log('DB connection established'))
```
This starter code imports the express package using the commonJS way. The app = express() creates an instance of our application
With this, we need to listen to incoming request. app.listen takes a port number and a callback function that is invoked
upon a successful connection

### Configuring the MongoDB connection
We will use the `mongoose` package that we installed via npm to
```js
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortener', {useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongooose.connection
```

### The Database Schema for URL Details
When using mongoose, models are defined using a `Schema` interface. A Schema will allow us to define all the fields stored in each document along with the validation or default values. Schemas will then be transformed into models using the `mongoose.model()` method. The model is what we use to find, create, update, and delete documents of a given type.
To create our model, create a folder named `model`. Inside this folder, add a file named `UrlModel.js`. Inside the `UrlModel.js` file, add the following code:
Import mongoose
`mongoose.Schema` method defines the details that the MongoBD document will store. It takes an object, the values include:
`urlCode` is the property that will store the unique ID that is related to each URL.
`longUrl` is the default URL which we need to shorten.
`shortUrl` is the actual short URL that will be generated.

### Defining Routes
Our routes will be on a seperate folder. Inside the `URL-Shortener-Service` folder, create a folder named `routes`. 
Navigate in the `routes` folder and create a file named `url.js`. This will contain our POST route for creating the short URL and inserting it to the MongoDB database. 
For our URL redirects, we need to create a seperate file named `redirect.js` inside the `routes` folder.
The following is the code for our `redirect.js` file:
### Define a Redirect Route
```js
const express = require('express')

const router = express.Router()

const Url = require('../models/UrlModel')


// @route       GET /:code
// @description    Redirect to the long/original URL 
router.get('/:code', async(req, res)=>{
    try{
        const url = await Url.findOne({urlCode: req.params.code})
        if(url){
            return res.redirect(url.longUrl)
        }
        else{
            return res.status(404).json('No URL Found')
        }

    }
    catch(err){
        console.error(err)
        res.status(500).json('Server Error')
    }
})


module.exports = router
```

For the `url.js` file, the code is:
```js
const express = require('express')

const router = express.Router()

const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/Url')

//@route    POST /api/url/shorten
//@desc     Create short URL

const baseUrl = 'http:localhost:5000'
router.post('/shorten', async(req,res)=>{
    const {longUrl} = req.body
    //check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base URL')
    }
    // create url code
    const urlCode = shortid.generate()
    //check long url
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url){
                res.json(url)
            }
            else{
                const shortUrl = baseUrl + '/'+ urlCode
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
        catch(err){
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
    else{
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router
```
### The Final Code in our `index.js` file
```js
const express = require("express")
const app= express()

const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/urlshortener', {useNewUrlParser: true, useUnifiedTopology: true })

const connection =  mongoose.connection
connection.once('open', ()=>console.log('DB Connected'))
connection.on('error', ()=>console.log('Error'))

app.use(express.json({extended: false})) //parse incoming request body in JSON format.
app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'))

app.listen(process.env.PORT || 5000)

```


### A Running Demo on Postman
 
 
### Conclusion
Having a link management platform will let you harness the power of sharing, managing and analyzing links. 
Billions of links are created every year on the internet and a URL shortener service is useful especially in social media marketing. 
In this tutorial, we created a simple URL shortener service using Node.js and MongoDB as the database. 
I hope you find this tutorial helpful and Happy coding.

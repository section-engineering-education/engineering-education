---
layout: engineering-education
status: publish
published: true
url: /hapi-validation-bcrypt-hashing-and-jwt/
title: Hapi validation, Bcrypt hashing and JWT in action
description: This article enables the reader to learn how to use Hapi to clean data submitted in a form and ensure a correct validation before submitting the data to a database. Additionally, we will learn how to use Bcrypt in hashing passwords to avoid submitting plaintext password fields into our database. 
author: phina-kersly
date: 2021-09-11T00:00:00-23:27
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hapi-validation-bcrypt-hashing-and-jwt/hero.png
    alt: Hapi validation bcrypt hashing and JWT image example
---

A website's security begins with having clean data in a database. It is good practice to ensure that information submitted to a database is accurate and filtered to avoid clouding it with either redundant or unrealistic records. 
 <!--more-->
This article enables the reader to learn how to use `Hapi` to clean data submitted in a form and ensure a correct validation before submitting the data to a database. Additionally, we will learn how to use `Bcrypt` in hashing passwords to avoid submitting plaintext password fields into our database. 

The two components work with `Json Web Tokens` to implement an authentication API to ensure security and clean data entry.

### Prerequisites
This project focuses on the back end, so we will be using Insomnia to post the request to the server. In addition, we will build a backend API that facilitates the registration and validation of user input.
To follow along, the reader needs to have the following.
- [Insomnia](https://insomnia.rest/download) installed in your machine.
- Have [Node.js](https://nodejs.org/) installed on your computer.
- A suitable code editor preferably [VS Code](https://code.visualstudio.com/download).


### Project setup
Start by setting up an open application in the desired folder using the command:

```js
npm init -y
```

The `-y' flag autocompletes other dependencies required when setting up a new project.

It is preferable to work on a web project using the MVC architecture. So we will follow the same architecture for this project. Working with this architecture ensures an organized folder structure and easy to debug code. So set up the project folder structure as below.

![Folder organization](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/folders.png)

### Installing dependencies
We need the following dependencies to make this project work:
- Express as the backend manager.
- JSON Web Tokens to generate authentication tokens.
- Hapi Validation to validate inputs before submission to the database.
- Bcryptjs for hashing and password comparisons.
- Dotenv to configure environmental variables.
- Mongoose to connect the project with MongoDB.
- Body0parser to parse request body sent from request.

Run the command  below to install all the dependencies:

```bash
npm install express mongoose jsonwebtokens @hapi/Joi bcryptjs dotenv body-parser
```

### Dependency import 
To import the dependencies installed, we need to add the snippets below in the application's entry point in the `index.js` file.

```js
// importing express
const express = require('express')
const app = express(); 

//import body parser
const bodyParser = require('body-parser')

//import dotenv
const dotenv = require('dotenv')

//import the databse connection object
const connectDB = require('./config/database')
dotenv.config({path: './config/config.env'})

// auth route
const authRoute = require('./routes/auth');

// posts route
const postRoute = require('./routes/posts')

//calling database connection function
connectDB()

//port 
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.listen(process.env.PORT, () =>{console.log('Running')})
```

### Creating the model
We need one model for the `user`. The user model has a name, email, and password. We also include the date when we create a user. In the `models` folder, create a new file named `User.js` the add the snippet below:

```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, //type string
            required: true,
            min: 6 //min length
        },
         email:{
            type: String,  //type string
            required: true, 
            min: 5, //min length
            max: 255 //max length
        },
        password:{
            type: String,  //type string
            required: true, 
            max: 1024 //max password length
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('User', userSchema);
```

### Connecting to the database
We will use mongo DB Atlas to keep our records. You can follow [this tutorial](https://docs.atlas.mongodb.com/connect-to-cluster/) to find out how to connect a mongo DB Atlas to a web Project. In the `config` folder, create a new file and name it `config.env`.  In this file, we are going to define our global variables for the project,

```js
PORT = 5000 //environmental port where the project runs
MONGO_URI = 'YOUR MONGOBD CONNECTION URL' // mongodb connection url
TOKEN_SECRET = any random string
```
>The `TOKEN_SECRET` is a secret we will use with JSON Web Token later in the tutorial.

In the same folder, create a file called `database.js`, then add the snippets below to connect to the database.

```js
//import mongoose
const mongoose = require('mongoose')

//connnect to database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      //log the error incase of any then exit execution
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
```
### Validating inputs 
In the `routes` folder, create a new file for validation. In the file, we will have two constants for validation during registration and login. Add the snippets below for the validation process. The data object passed contains the information in the request body. This information is used against the preset conditions to perform the validation.

After the validation is complete, the functions are exported for use in the front-end, where they will be called when the form data is submitted.

```js
//import validation module
const Joi = require('@hapi/joi')

const userRegistrationValidation = data =>{
    const schema = Joi.object(
    { 
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required() 
    });

    return schema.validate(data);
};

const userLoginValidation = data =>{
    const schema = Joi.object(
    { 
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required() 
    });

    return schema.validate(data);
};


module.exports.userRegistrationValidation = userRegistrationValidation
module.exports.userLoginValidation = userLoginValidation
```

### Creating routes
This project will have three routes. The first route is for registering users into the database; the second will be for logging in a registered user, then the last route will show a user a list of items once they are logged in. Finally, the `posts` route will be a protected route only accessible to a registered user identified by an auth token generated by `Json Web Tokens`.

Create a new file called `auth.js` in the' routes folder and add the snippets below.

```js
const router = require('express').Router();
const User = require('../models/User')
const {userRegistrationValidation, userLoginValidation} = require('./validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//posting form data to login route
router.post('/login', async (req, res) =>{
    const { error } = userLoginValidation(req.body)
    
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // check user existence in the database
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Sorry email is not with our records')
    }

    //compare passwords
    const validUserPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validUserPassword){
        return res.status(400).send('Sorry the password is invalid')
    }

    //creating and assignikng token 
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('authentication-token', token).send(token)
  
    
})

module.exports = router;
```

#### Registration route
This route registers users into the database. The data passed to this route is taken for validation in the `userRegistrationValidation`.  If any error exists in the request, especially from the validation, the server sends the error back to the user. 

```js
//postung data to register route
router.post('/register', async (req, res) =>{
    const { error } = userRegistrationValidation(req.body)
    
    //send any error to the user incase of any
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // check user existence in the database in the mongo db database
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists){
        return res.status(400).send('Email already in the database')
    }
})
```

If there are no errors, the email in the request body is checked against all the database records for similarity. If the email is unique, we call `bcrypt` to encrypt the password for security. 

```js
//Hashing the passwords
const salt = bcrypt.genSaltSync(10);
const hashedPassword  = bcrypt.hashSync(req.body.password, salt);
```

Afterwards, a new user instance is created and saved into the database.

```js
//creating a new user object
const user = new User(
    {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
);

try{
  //saving the newly created user 
    const savedUser = await user.save()
    res.send({savedUser: user._id})
}catch(err){
    console.log(err)
    res.status(400).send(err)
}
```

#### The login route
The login route takes data in the request body and passes it for validation by the `userLoginValidation`. Next, `Hapi` checks the data for any errors. If there is none, the database is queried for a record with the supplied email.

```js
router.post('/login', async (req, res) =>{
    const { error } = userLoginValidation(req.body)
    
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    // check user existence in the database
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Sorry email is not with our records')
    }
})
```

In the next step, we use `bcrypt` to compare the supplied password in the request body with its equivalent hash in the database. If the passwords match, the user is logged in and assigned a `JSON web token secret` to his `userID`, which allows them to access protected routes since the token is attached to the request header.

```js
//make a comparison between entered password and the database password
const validUserPassword = await bcrypt.compare(req.body.password, user.password);
if(!validUserPassword){
    return res.status(400).send('Sorry the password is invalid')
}

//creating and assignikng token 
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header('authentication-token', token).send(token)
```

### Token verification
We need to verify that the token is passed to the request header so that only authenticated users can access protected routes. We check if there is an `authentication token` in a request, and if the request has no token, it is denied access to a protected route. 

```js
//importing the jwt module
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    //fetch the token from the request header
    const token = req.header('authentication-token');
    if(!token){
        return res.status(400).send('Access denied!');
    }
}

```

However, if the token is available in the request header, we mark the user as verified and allow him to access protected routes.

```js
// verify the user
try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verifiedUser;
    next()
} catch (error) {
    res.status(400).send('Invalid token')
}
```

### Protecting routes
To protect a given route, we need to add the `verify` method before the request, as shown below:

```js
//extracting the router module from the express
const router = require('express').Router();

//verify
const verify = require('./verifyToken')

//method called in the request
router.get('/', verify, (req, res) =>{
    res.json({
        posts:{
            title:"Very first post",
            body: "Random post you should not even see"
        }
    })
})

module.exports = router;
```

The above snippet means that only authenticated users can access the posts. 

### Testing the project
We need to run the command `nodemon index` to test this project. Start the development server and try the endpoint in `Insomnia`. Of course, Postman can work here as well.

#### Testing validation
Let us try using a short password/ email than the length specified in the `userRegistrationValidation` to see if our validation worked. We will begin by navigating to the `register` route.
![Password check](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/password-check.png)

Next, if we use the wrong email, we get a validation error, as shown below.
![Email check](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/email-check.png)

However, when all fields are filled correctly and the validation is passed, the user is added to the database. The `user-id` is returned as shown.
![User saved](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/user-saved.png)


#### Testing protected route access
When we try accessing the `posts` route without being logged in, we are denied access.

![Acees denied](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/access-denied.png)


However, when logged in, we get an authentication token that we add to the request's header and obtain access to the protected route.
![Authentication token](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/user-auth-token.png)
![View protected route](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/view-protected-route.png)

### Conclusion
This tutorial taught us to validate user input using `Hapi`, password encryption with `bcrypt`, and JWT authentication. We built an authentication API using the three and testes=d out application. This tutorial should give the reader a way of getting started with data cleaning and securing data for their web project.

You can find the entire code for this project [here.](https://replit.com/@PhinaKersly/Hapi-and-bcrypt#config/database.js)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

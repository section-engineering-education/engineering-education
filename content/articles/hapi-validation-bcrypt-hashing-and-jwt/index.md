---
layout: engineering-education
status: publish
published: true
url: /hapi-validation-bcrypt-hashing-and-jwt/
title: Hapi Validation, Bcrypt Hashing, and JWT in Action
description: This article takes the reader through how to use Hapi to clean data submitted in a form, and ensure a correct validation before submitting the data to a database. Additionally, readers will learn how to use Bcrypt to hash passwords so as to avoid submitting plaintext password fields into databases.
author: phina-kersly
date: 2021-09-15T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hapi-validation-bcrypt-hashing-and-jwt/hero.jpg
    alt: Hapi Validation Bcrypt Hashing, and JWT Image Example
---
The security of a website begins with having clean data in a database. It is good practice to ensure that information submitted to a database is accurate, and filtered to avoid clouding it with either redundant or unrealistic records.
<!--more-->
This article will take you through how to use Hapi to clean data submitted in a form, and ensure a correct validation before submitting the data to a database.

Additionally, we will learn how to use Bcrypt to hash passwords so as to avoid submitting plaintext password fields into databases.

The two components work with `Json Web Tokens` to implement an authentication API that ensures security and clean data entry.

### Prerequisites
This project focuses on the back end, so we will be using Insomnia to post the request to the server. In addition, we will build a backend API that facilitates the registration and validation of user input.

To follow along, the you need to have the following:
- [Insomnia](https://insomnia.rest/download) installed in your machine.
- Have [Node.js](https://nodejs.org/) installed on your computer.
- A suitable code editor preferably [VS Code](https://code.visualstudio.com/download).

### Project setup
Start by setting up an open application in the desired folder using the command:

```bash
npm init -y
```

The `-y` flag auto-completes other dependencies required when setting up a new project.

We will follow the MVC architecture for this project. Working with this architecture ensures an organized folder structure and easy to debug code.

Set up the project folder structure as shown below.

![Folder organization](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/folders.png)

### Installing dependencies
We need the following dependencies to make this project work:
- Express as the backend manager.
- JSON Web Tokens to generate authentication tokens.
- Hapi Validation to validate inputs before submission to the database.
- Bcryptjs for hashing and password comparisons.
- Dotenv to configure environmental variables.
- Mongoose to connect the project with MongoDB.
- Body-parser to parse request body sent from request.

Run the command below to install all the dependencies:

```bash
npm install express mongoose jsonwebtokens @hapi/Joi bcryptjs dotenv body-parser
```

### Dependency import
To import the dependencies installed, we need to add the snippets below in the application's entry point; i.e. the `index.js` file.

```js
// importing express
const express = require("express");
const app = express();

// import body parser
const bodyParser = require("body-parser");

// import dotenv
const dotenv = require("dotenv");

// import the databse connection object
const connectDB = require("./config/database");
dotenv.config({ path: "./config/config.env" });

// auth route
const authRoute = require("./routes/auth");

// posts route
const postRoute = require("./routes/posts");

// calling database connection function
connectDB();

// port
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () => {
	console.log("Running");
});
```

### Creating the model
We need one model for the user. The user model has a name, email, and password. We also include the date when we create a user.

In the `models` folder, create a new file named `User.js` the add the snippet below:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String, // type string
		required: true,
		min: 6, // min length
	},
	email: {
		type: String, // type string
		required: true,
		min: 5, // min length
		max: 255, // max length
	},
	password: {
		type: String, // type string
		required: true,
		max: 1024, // max password length
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
```

### Connecting to the database
We will use MongoDB Atlas to keep our records. You can follow [this tutorial](https://docs.atlas.mongodb.com/connect-to-cluster/) to find out how to connect MongoDB Atlas to a web Project.

In the `config` folder, create a new file and name it `config.env`. In this file, we are going to define our global variables for the project:

```js
PORT = 5000 // environmental port where the project runs
MONGO_URI = 'YOUR MONGOBD CONNECTION URL' // mongodb connection url
AUTH_TOKEN_SECRET = any random string
```

> The `AUTH_TOKEN_SECRET` is a secret we will use with JSON Web Token later in the tutorial.

In the same folder, create a file named `database.js`, then add the snippets below to connect to the database:

```js
// import mongoose
const mongoose = require("mongoose");

// connect to database
const connectDatabase = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		// log the error incase of any then exit execution
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDatabase;
```

### Validating input
In the `routes` folder, create a new file for validation. In the file, we will have two constants; for validation during registration and login.

Add the snippets below for the validation process:

```js
// import validation module
const Joi = require("@hapi/joi");

const userRegistrationValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

const userLoginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

module.exports.userRegistrationValidation = userRegistrationValidation;
module.exports.userLoginValidation = userLoginValidation;
```
The data object passed contains the information in the request body. This information is used against the preset conditions to perform the validation.

After the validation is complete, the functions are exported for use in the front-end, where they will be called when the form data is submitted.

### Creating routes
This project will have three routes. The first route is for registering users into the database, the second will be for logging in a registered user, and the last route will show the user a list of items once they are logged in.

Finally, the `posts` route will be a protected route; only accessible to a registered user identified by an auth token generated by `Json Web Tokens`.

Create a new file called `auth.js` in the routes folder and add the snippets below.

```js
const router = require("express").Router();
const User = require("../models/User");
const {
	userRegistrationValidation,
	userLoginValidation,
} = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// posting form data to login route
router.post("/login", async (req, res) => {
	const { error } = userLoginValidation(request.body);

	if (error) {
		return response.status(400).send(error.details[0].message);
	}

	// check user existence in the database
	const user = await User.findOne({ email: request.body.email });
	if (!user) {
		return response.status(400).send("Sorry email is not with our records");
	}

	// compare passwords
	const validUserPassword = await bcrypt.compare(
		request.body.password,
		user.password
	);
	if (!validUserPassword) {
		return response.status(400).send("Sorry the password is invalid");
	}

	// creating and assignikng token
	const token = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN_SECRET);
	response.header("authentication-token", token).send(token);
});

module.exports = router;
```

#### Registration route
This route registers users into the database. The data passed to this route is taken for validation in the `userRegistrationValidation`.

If any error exists in the request; especially from the validation, the server sends it to the user:

```js
// posting data to register route
router.post("/register", async (request, response) => {
	const { error } = userRegistrationValidation(req.body);

	// send any error to the user incase of any
	if (error) {
		return response.status(400).send(error.details[0].message);
	}

	// check user existence in the database in the mongo db database
	const emailExists = await User.findOne({ email: request.body.email });
	if (emailExists) {
		return response.status(400).send("Email already in the database");
	}
});
```

If there are no errors, the email in the request body is checked against all the database records for similarity. If the email is unique, we call `bcrypt` to encrypt the password for security:

```js
// Hashing the passwords
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(request.body.password, salt);
```

Afterwards, a new user instance is created and saved into the database:

```js
// creating a new user object
const user = new User({
	name: request.body.name,
	email: request.body.email,
	password: hashedPassword,
});

try {
	// saving the newly created user
	const savedUser = await user.save();
	response.send({ savedUser: user._id });
} catch (err) {
	console.log(err);
	response.status(400).send(err);
}
```

#### The login route
The login route takes data in the request body and passes it for validation by the `userLoginValidation`.

Hapi then checks the data for any errors. If there is none, the database is queried for a record with the supplied email:

```js
router.post("/login", async (request, response) => {
	const { error } = userLoginValidation(request.body);

	if (error) {
		return response.status(400).send(error.details[0].message);
	}

	// check user existence in the database
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return response.status(400).send("Sorry email is not with our records");
	}
});
```

In the next step, we use `bcrypt` to compare the supplied password in the request body with its equivalent hash in the database. If the passwords match, the user is logged in and assigned a `JSON web token secret` to his `userID`.

The token allows them to access protected routes since the token is attached to the request header of every subsequent request:

```js
// make a comparison between entered password and the database password
const validUserPassword = await bcrypt.compare(
	request.body.password,
	user.password
);
if (!validUserPassword) {
	return response.status(400).send("Sorry the password is invalid");
}

// creating and assigning token
const token = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN_SECRET);
response.header("authentication-token", token).send(token);
```

### Token verification
We need to verify that the token is passed to the request header; so that only authenticated users can access protected routes.

We check if there is an `authentication token` in a request, and if the request has no token, it is denied access to a protected route:

```js
// importing the jwt module
const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
	// fetch the token from the request header
	const token = req.header("authentication-token");
	if (!token) {
		return response.status(400).send("Access denied!");
	}
};
```

However, if the token is available in the request header, we mark the user as verified and allow him to access protected routes:

```js
// verify the user
try {
	const verifiedUser = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
	request.user = verifiedUser;
	next();
} catch (error) {
	response.status(400).send("Invalid token");
}
```

### Protecting routes
To protect a given route, we need to add the `verify` method before the request, as shown below:

```js
// extracting the router module from the express
const router = require("express").Router();

// verify
const verify = require("./verifyToken");

// method called in the request
router.get("/", verify, (request, response) => {
	response.json({
		posts: {
			title: "Very first post",
			body: "Random post you should not even see",
		},
	});
});

module.exports = router;
```

The above snippet ensures that only authenticated users access the posts.

### Testing the project
We need to run the command `nodemon index` to test this project. Then start the development server and try the endpoint in `Insomnia`. Postman can work here as well.

#### Testing validation
Let us try using a shorter password and or email than the length specified in the `userRegistrationValidation` to see if our validation works.

We will begin by navigating to the `register` route.

![Password check](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/password-check.png)

If we use the wrong email, we get a validation error, as shown below.

![Email check](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/email-check.png)

However, when all fields are filled correctly and the validation is passed, the user is added to the database.

The `user-id` is then returned as shown.

![User saved](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/user-saved.png)

#### Testing protected route access
When we try accessing the `posts` route without being logged in, we are denied access.

![Access denied](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/access-denied.png)

However, when logged in, we get an authentication token that we add to the request's header to access the protected route.

![Authentication token](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/user-auth-token.png)

![View protected route](/engineering-education/hapi-validation-bcrypt-hashing-and-jwt/view-protected-route.png)

### Conclusion
This tutorial has taught us how to validate user input using `Hapi`, encrypting passwords with `bcrypt`, and JWT authentication. We built an authentication API using the three and tested out the application.

This tutorial should give you a way of getting started with data cleaning and securing data for your web project.

You can find the entire code for this project on [Replit](https://replit.com/@PhinaKersly/Hapi-and-bcrypt#config/database.js).

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

TEST COMMIT

It's pretty simple to write code and develop applications, but how about dealing with authentication and, most likely, Authorization? We'll learn how to use ***JWT*** in ***NodeJS*** to secure endpoints and even authenticate users in this tutorial.

### Introduction to Authentication and Authorization

Authentication and Authorization are used in security, particularly when it comes to getting access to a system. Yet, there is a significant distinction between gaining entry into the house (Authentication) and what you can do while inside (Authorization).

#### Authentication

Authentication is the process of verifying a user's identification through the acquisition of credentials and using those credentials to confirm the user's identity. The authorization process begins if the credentials are legitimate. The Authentication process always follows the Authorization procedure.

You were already aware of the authentication process because we all do it daily, whether at work (logging onto your computer) or at home (logging into a website). Yet, the truth is that most "things" connected to the Internet require you to prove your identity by providing credentials.

#### Authorization

Authorization is the process of allowing authenticated users to access resources by determining whether they have system access permissions. By giving or denying specific licenses to an authenticated user, Authorization enables you to control access privileges.

So, Authorization occurs after the system authenticates your identity, granting you complete access to resources such as information, files, databases, funds, places, and anything else. So said, Authorization affects your capacity to access the system and the extent to which you can do so.

### What is JWT

JSON Web Tokens are an RFC 7519 open industry standard for representing claims between two parties. You can use jwt.io to decode, verify, and produce JWT.

JSON Web Token (JWT) is an open standard (RFC 7519) that specifies a compact and self-contained method for communicating information as a JSON object between two parties. Because it is signed, this information can be checked and trusted. JWTs can be signed using a secret (using the HMAC algorithm) or an RSA or ECDSA public/private key combination. In a moment, we'll see some instances of how to use them.

#### Prerequisite

- A working knowledge of Javascript.
- A good understanding of NodeJS is required.
- A basic understanding of MongoDB or any Database of your choice

### API development using JWT Token for Authentication in NodeJS

To get started, we need to set up our project by creating one.

#### Step 1 - Open your Integrated Development Environment (IDE)

To open visual studio code, navigate to any Directory of your choice on your pc. In the terminal, type:

```Bash
code.
```

> **Note**: `code .` won't work if you don't have visual studio code installed on your system

#### Step 2 - Create a directory and initialize `npm`

Create a directory and initialize npm by typing the following command:

- Windows power shell

```Bash
    mkdir jwt-project
    cd jwt-project
    npm init -y
```

- Linux

  ```Bash
  mkdir jwt-project
  cd jwt-project
  npm init -y
  ```

#### Step 3 - Create files and directories as shown below

![folder structure](/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/folder-struc.png)


#### Step 4 - Install dependencies

We'll install several dependencies like `mongoose`, `jsonwebtoken`, `express` `dotenv` `bcryptjs` and development dependency like nodemon to restart the server as we make changes automatically.

We will install mongoose because I will be using MongoDB for storage while we validate user credentials against what we have in our database. The whole authentication process is not limited to the database we'll be using in this article.

```bash
npm install mongoose express jsonwebtoken dotenv bcryptjs
npm install nodemon -D
```

#### Step 5 - Create a NodeJS server and Connect your Database

Now let's create our NodeJS Server and connect our database by adding the following snippet to you `app.js` `index.js` `database.js` `.env`, .

In our `database.js.`

```Javascript
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

```

In our `app.js.`

```Javascript
require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;

```

In our `index.js.`

```Javascript
const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

```

If you notice, our file has some environment variables. You can create a new  `.env` file if you haven't and add your variable before starting our application.

In our `.env.`

```Bash

API_PORT=4001
MONGO_URI= //Your database URI here

```

To start our server, kindly edit the scripts object in our package.json to look like the one shown below and then type the command to start the server safely.

```Javascript
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

type the command `npm run dev`

Both server and database should be up and running without crashing.

#### Step 6 - Create a user model and route

We'll define our schema to user details when signing up for the first time and validate against the credentials saved when logging in.

Add the following snippet to `user.js` inside the model folder.

```Javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);


```

Now let's create the routes for register and login, respectively.

In `app.js` in the root directory, add the following snippet for registration and login.

```Javascript
// importing user context
const User = require("./model/user");

// Register
app.post("/register", (req, res) => {

});

// Login
app.post("/login", (req, res) => {

});

```

#### Step 7 - Implement Register and Login Functionality

We'll be implementing these two routes in our application and using JWT to sign credentials and `bycrypt` to encrypt the password before storing it into our database.

For the `/register` route, we'll get user input, validate user input, validate if the user already exists, encrypt user password, create a user in our database then create a signed JWT token as shown below.

```Javascript
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

```

**Note:** Kindly Update your `.env` file with a `TOKEN_KEY`, which can be a random string.


Using postman to test, we'll get the response shown below after successful registration.

![register](/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/register.png)


For the `/login` route, we'll get user input, validate user input, validate if the user exists, verify user password against the password we saved earlier in our database, then create a signed JWT token as shown below.

```Javascript

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

```

Using postman to test, we'll get the response shown below after successful login.

![login](/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/login.png)

#### Step 8 - Create Middleware for Authentication

We can successfully create and log in a user, but we'll create a route that requires a user token in the header, which is the jwt token we generated earlier.

To do that, we'll create an `auth.js` file in the middleware folder inside our project. Add the following snippet inside the `auth.js`.

```Javascript
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

```

Now let's create the `/welcome` route and update `app.js` with the following snippet to test the middleware.

```Javascript

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

```

See the result below when we try to access the `/welcome` route we just created without passing a token in the header with the `x-access-token` key.

![error](/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/error-response.png)

We can now add a `token` in the header with the key `x-access-token` and re-test. See the image below for the response.

![success](/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/success-response.png)

Here is what our `app.js` file looks like:

```Javascript
require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This ias added to catch a request to an endpoint that does not exist in our application 
// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;

```

You can [click here](https://github.com/Olanetsoft/jwt-project) to check the complete code on the GitHub repository.

### Conclusion

We learned about JWT, Authentication, Authorization and how to develop API using JWT Token for Authentication in NodeJS.

Happy coding!

### Resources

[JWT](https://jwt.io/)
[NodeJS](https://nodejs.org/en/)
[ExpressJS](https://expressjs.com/)

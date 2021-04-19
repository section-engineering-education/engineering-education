A session is an authentication programming concept. Authentication is the process of proving that a systematic procedure is authentic or valid. A session is used to store information about a particular user or client.

For example, a login system. The Authentication would be checking to see if a user exists and if their login credentials are valid.

A website is based on HTTP protocol. HTTP is a stateless protocol that means that there's a browser (client) and a server. At the end of every request and response cycle, the client and the server forget about each other. This is where the session comes in.

A session will contain some unique data of that client to allow the backend (server) to keep track of the user's state.

### How sessions works
When the client makes a request to the server, the server will automatically create a session and store it on the server-side. When the server responds to the client, it sends a cookie. This cookie will reference the session stored on the server-side because the cookie contains the session's unique id.

We use that session ID to look up the session in the database or the session store to maintain a one to one match betwen a session and a cookie.

These cookies will then be sent for every consecutive request to the server so that the server will know who is this client or user. This will make HTTP protocol connections stateful.

### The difference between session and cookie
As you might have noticed, we've introduced a new concept called a cookie. We need to answer the question of what is the difference between a session and a cookie. Basically, a session and a cookie are stored differently.

A cookie has its data stored in the browser. The browser attaches that cookie key-value pair to every HTTP request that is sent to a server.

In a cookie, you can't store a lot of data. A cookie, cannot store any sort of user credentials or secret information. If we did that, a hacker could easily get hold of that information and steal personal data for malicious activities.

On the other hand, session data is stored on the server-side, i.e., a database or a session store. A session is held on the server-side. Hence, it can accommodate larger amounts of data. To access data from the server-side, a session is authenticated with a secret key or a session id.

The above explains the main difference between a cookie and a session. To learn more about their differences, check this [Session vs Cookie](https://www.javatpoint.com/session-vs-cookies) tutorial.

### Prerequisites
- Have [Node.js runtime](https://nodejs.org/en/download/) installed on your computer.
- Basic knowledge on [how to use Node.js](https://nodejs.dev/learn/).
- Basic understanding of how to create an [HTTP server using the Expres.js](/engineering-education/express/) library.

### Setting up the required environments and libraries
This is a Node.js project. It uses NPM to manage its libraries and dependencies. You need to create a new project directory and initialize the Node.js with `npm init –y`. This will generate a `packahe.json` file that will manage the packages dependencies for this project's tutorial.

The following libraries will help us set up a Node.js session.

- [Express](/engineering-education/express/) - a web framework for Node.js used to create HTTP web servers. Express provides an easy-to-use API to interact with the webserver.
- [Nodemon](https://www.npmjs.com/package/nodemon) - a server utility framework for monitoring changes of the code on a text editor. It automatically restarts the server whenever code changes are detected.
- [Express-session](https://www.npmjs.com/package/express-session) - an HTTP server-side framework used to create and manage a session middleware. This tutorial is all about sessions. Thus Express-session library will be the main focus.
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) - used to parse cookie header to store data on the browser whenever a session is established on the server-side.
- [Body-parser](https://www.npmjs.com/package/body-parser) - used to parse an HTTP POST request.

Install the above libraries using the below command.

`npm install express express-session cookie-parser body-parser nodemon`

### Express-session Options and how to use it
To set up the session, you need to set a couple of [Express-session middleware](https://www.npmjs.com/package/express-session#sessionoptions) options, as shown below.

```js
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
```

- `secret` - a random unique string key used to authenticate a session. It is stored in an environment variable and can't be exposed to the public. The key usually is long in a production environment, and it is an auto randomly generated string.

- `resave` - takes a Boolean value. When true, it sets the session to save event without recording any changes on the sent request. `saveUninitialized` goes hand in hand with `resave`. They tell the session middleware how to react to different events in the browser.

- `cookie: { maxAge:}` - this sets a cookie expiry headers. It creates a certain amount of time. The browser is going to delete the cookie after the set duration elapses. The browser will not be attached to any of the requests in the future. In this case, we've set the `maxAge` to a single day as computed by the following arithmetic.

```js
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
```

Check the [documentation](https://www.npmjs.com/package/express-session#options) for all possible options and learn more about these options.

### Setting up the session middleware
To initialize the session, we will set the session middleware inside the routes of the individual HTTP requests.

When a client sends a request, the server will set a session ID and set the cookie equal to that session ID. A cookie is then stored in the set cookie HTTP header in the browser. Every time the browser (client) refreshes, the stored cookie will be a part of that request.

Let's set the session middleware.

We'll create a simple login form to demonstrate that.

**Here is the login form**, (`index.html).

```html
<html>
<head>
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <form action="/user" method="post">
        <h2>Login</h2>
        <div class="input-field">
            <input type="text" name="username" id="username" placeholder="Enter Username">
        </div>
        <div class="input-field">
            <input type="password" name="password" id="password" placeholder="Enter Password">
        </div>
        <input type="submit" value="LogIn">
    </form>
</body>
</html>
```

**CSS to style the form**, (`app.css`).

```css
body {
    display: flex;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
}

.input-field {
    position: relative;
    margin-top: 2rem;
}

.input-field input {
    padding: 0.8rem;
}

form .input-field:first-child {
    margin-bottom: 1.5rem;
}

form input[type="submit"] {
    background: linear-gradient(to left, #4776E6, #8e54e9);
    color: white;
    border-radius: 4px;
    margin-top: 2rem;
    padding: 0.4rem;
}
```

**Setting up the server**, (`app.js`).

```js
const express=require('express');
const cookieParser = require("cookie-parser");
const bodyParser=require('body-parser');
const sessions = require('express-session');

const PORT = 4000;
var session;
const app = express();

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

// cookie parser middleware
app.use(cookieParser());

// serve css styling
app.use(express.static(__dirname));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == 'user1' && req.body.password== 'mypassword'){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

```

In this example, we are using a simple login application. To authenticate the user. I've specified the username and password as `user1` and `mypassword`, respectively. In a production environment, these credentials are usually saved in a database. The server will verrify the username and password against the database. If valid the user will be granted the necessary data access.

To set this session, the user will submit the credentials. The server will verify these credentials as set `req.body.username == 'user1' && req.body.password == 'mypassword'`. I.e. comparing the username and the password for the existing user in the server.

If the credentials are valid, the server will create a temporary user session with a random string known as a session ID to identify that session.

The server will send a cookie to the client browser. The session ID is going to be placed inside this cookie.

Once the client browser saves this cookie, it's then going to send that cookie along with each subsequent request to the server.

The server is going to validate the cookie against the session ID. If the validation is successful, the user is granted access to the requested resources on the server.

If the credentials are invalid, the server will not grant this user access to the resources. No session will be initialized, and no cookie will be saved.

When the user decides to log out, the server will destroy (`req.session.destroy();`) the session and clear out the cookie on the client-side. Cookies are cleared once the `maxAge` expires.

Let's see who this work out using the server we've created above.

Run the application using `nodemon app.js`. This should start the server on the set port 4000.

![An express server](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/express-server.jpg)

Open the server on the browser on route `http://localhost:4000/`, and you will be served with this login form.

![A served express server html form](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/served-express-server-html-form.jpg)

To be autheticated by server, provide the credentils as specified in `if(req.body.username == 'user1' && req.body.password== 'mypassword')`. Username as `user1` and password as `mypassword`.

![Session user granted access](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/user-granted-access.jpg)

Once you log in successfully, a session will be generated, and a cookie will be saved in the browser.

In this case, since we don't have a database to save the session, we will `console.log(req.session)` and glance at how it looks. If you go back to the command line, the session object will be printed to the console.

![Node.js session](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/session.jpg)

These are the same values you would have saved in a production environment on the server-side into a database such as MongoDB, Postgres, etc.

Let's see the cookie value saved in the browser.

Open the browser inspector tool application Cookies http://localhost:4000/.

![Node.js browser cookies](/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/cookie.jpg)

Every time you refresh this page, the request will be sent along with the value of this cookie within this localhost domain. If it matches with the session stored value, the server will authenticate this user.

The client won't be able to modify the contents of the cookie, and even if they try to, it's going to break the signature of that cookie. This way, the server will be able to detect the modification very quickly.

It's not a security concern if a third party can read the cookies.

A cookie doesn't carry any meaningful data inside of them. It just contains the session ID token. The cookie is encrypted. It still have to maintain a one-to-one relationship to the user session. The cookie will be valid until set maxAge expires unless the user decides to log out.

When the user logout, the session will be destroyed. There is no session to compare with the saved cookie. The user will have to log in again to create a session ID for the new login session.

### Conlusion
That's all for this tutorial. This was a basic example, and I hope it helped you understand the concept of session management in Node.js using Express.js and Express-session.

Happy Coding!!
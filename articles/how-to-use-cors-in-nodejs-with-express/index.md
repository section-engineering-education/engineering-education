Node.js is an open-source and cross-platform runtime for executing JavaScript code on the server-side. One of the popular Node.js server frameworks is Express. Express allows you to configure and manage an HTTP server to access resources from the same origin they as being served (i.e., the same domain).

These three parts form an origin.

![The CORS origin concept](/engineering-education/how-to-use-cors-in-nodejs-with-express/origin.jpg)

Any web that agrees with the above can be considered as the same origin.

At times when developing applications making such requests cannot be sufficient. There are many public APIs for weather, time, fonts, to name a few. There are servers set for the sole purpose of delivering these API pieces of information to any website. Thus making calls, not to the exact origin (cross-origin calls), is a popular use case for the modern web application.

Let's say accessing images, videos, iframes, or scripts from another server. This means that the server is accessing resources from a different origin or a domain. When building an application to serve up these resources with Express, a request to such external origins may fail. This is where CORS comes into play to make the cross-origin requests elegantly.

This guide will help you learn how to configure CORS with Express.

### Prerequisites
To get along with this guide, prior knowledge of Node.js and Express will be essential.

### What is CORS?
CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API. This is done by bypassing the `Access-Control-Allow-Origin` headers, which specify which origins can access the API. CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.

Check this guide to learn more about the [CORS policy](/engineering-education/what-is-cors-policy/).

### How CORS works
An API is a set procedure for two programs to communicate. This means their resources are intended to be consumed by other clients and servers.

Here are two scenarios;

![The CORS same-origin concept](/engineering-education/how-to-use-cors-in-nodejs-with-express/same-origin.jpg)

The client and the server have the same origin. In this example, accessing resources will be successful. You're trying to access resources on your server, and the same server handles the request.

![The CORS cross-origin concept](/engineering-education/how-to-use-cors-in-nodejs-with-express/diffrent-origin.jpg)

The two (client and server) have a different origin from each other, i.e., accessing resources from a different server. In this case, trying to make a request to a resource on the other server will fail.

That's a security concern for the browser. CORS comes into play to disable this mechanism and allow access to these resources. CORS will add a response header `access-control-allow-origins` and specify which origins are to be permitted the access. CORS ensures that we are sending the right headers.

Therefore, the solution is simple. A public server handling a public API will add a CORS related header to the response. The browser on the client machine will look at this header and decide whether it is safe to deliver that response to the client or not.

### Setting up CORS with Express
Let's create a very basic Express HTTP server endpoint that serves a GET response.

Ensure you have Node.js runtime installed and run `npm init -y' to start your simple express server project. To use CORS within a Node.js application, you need the cor package provided by the Node.js NPM registry. Go ahead and install CORS alongside the following other packages using the below command.

```bash
npm i cors express nodemon
```

### Creating a simple Express GET request
Below is the simple index.js express server.

```js
const express = require('express');
const app = express();

    const ingredients = [
    {
        "id": "1",
        "item": "Bacon"
    },
    {
        "id": "2",
        "item": "Eggs"
    },
    {
        "id": "3",
        "item": "Milk"
    },
    {
        "id": "4",
        "item": "Butter"
    }
];

app.get('/ingredients', (req, res) =>{
    res.send(ingredients);
});
app.listen(6069);
```

Run the server with `npm nodemon`. Open `http://localhost:6069/ingredients` on your browser. You will be served with these ingredients text items.

This is cross-origin allowed because you're currently on the same domain, and you are executing this request from the same domain.

Let's now try to get the ingredients using the fetch command.

I am going to execute that same request but from another site instead. In this case, I used `https://www.section.io`.

Open `https://www.section.io` on your browser and execute the following fetch request from the bowser's console.

```js
fetch("http://localhost:6069/ingredients").then(req => req.text()).then(console.log)
```

Make sure the server is up and running before performing the above request.

We are fetching the ingredients information from another origin domain. The origin of this URL is not the one allowed to receive this response from this server. Thus it will throw the below nasty CORS error.

![CORS policy error](/engineering-education/how-to-use-cors-in-nodejs-with-express/cors-policy-error.jpg)

To solve this error, we need to add the CORS header to the server and give `https://www.section.io` access to the server response.

Include the following in your server (index.js)

```js
const cors = require('cors');
app.use(cors({
    origin: 'https://www.section.io'
}));
```

And if now you perform the fetch command, it should just work fine.

However, it made the same fetch request from another web page. This will fail with an error shown below.

![Cors policy header error](/engineering-education/how-to-use-cors-in-nodejs-with-express/cors-error-policy-header.jpg)

This means only have access to the resources of our server. You can have an array of these multiple origins, as shown below.

```js
const cors = require('cors');
app.use(cors({
    origin: ['https://www.section.io', 'https://www.google.com/']
}));
```

However, the API can be public, and any cross-origin APIs and servers can access these resources. The code block below will ensure any page can access the ingredient resources.

```js
app.use(cors({
    origin: '*'
}));
```

The Asterisk symbol will create the CORS header, and any origin can get the response of this localhost server.

Since no specific origin here, `app.use(cors())` will also get this done.

You can also have dynamic origins. These are whitelisted origins that have access to your API. This could be used to pull resources from a database. Let's say you have different accounts, i.e. developer accounts, and you might want them to access the API. To have this dynamic whitelisting, use this origin function which returns these domains individually.

```js
const whitelist = ['http://developer1.com', 'http://developer2.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}
```

### Performing more requests
An express server has many specific ways of managing CORS to determine what other servers and APIs can access.

For example, a server is comprised of several methods. Not every method should be exposed to other origins. Thus, within CORS middleware, you can specify which methods can be accessed by the CORS policy.  These methods include GET, POST, DELETE, UPDATE, and OPTIONS.

```js
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
```

You can even specify which routes of your server.

```js
app.get('/ingredients', cors(), (req, res, next) => {
    res.send(ingredients);
});
```

### Usecase
Let's say you're building a React front-end. Eventually, you'll be connecting it to a back end API. The app might run into an issue if CORS is not set up. Simply because both the front end and the back end are from different origins from each other.

CORS goes hand in hand with [APIs](https://www.youtube.com/watch?v=zoSJ3bNGPp0). A good use case scenario where you will always use CORS is when developing RESTful APIs. For example, creating a Node.js RESTful API, similar to this [RESTful Web API in Node.js using PostgresSQL and Express](/engineering-education/restful-web-API-using-nodejs-postgressql-and-express/).

### Conclusion
When you deploy an application on the server, you don't want to accept requests from every angle. Sometimes you want to be able to specify which origin should make requests to your server. This way, you're able to block users who attempt to clone your site or make requests from an unauthorized server. This is important for the security of your application. Check this [CORS NPM regestry](https://www.npmjs.com/package/cors) and learn where to use CORS in your Express application.
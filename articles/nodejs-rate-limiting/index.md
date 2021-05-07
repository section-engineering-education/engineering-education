### Node.js Rate Limiting

The rate-limiting feature makes it possible to secure the Backend API from malicious attacks. It allows us to cap the number of requests that a user can make to our APIs. Rate limiting is widely used by API providers to limit the number of requests an unsubscribed user can make within a given duration i.e. [https://newsapi.org](https://newsapi.org/pricing) limits users with developer accounts only to make 100 requests per day.

### Prerequisites
1. A General understanding of HTTP requests/responses.
2. [Node.js](https://nodejs.org/en/) installed on your computer.
3. Some knowledge of [Node.js](https://www.w3schools.com/nodejs/).

Rate limiting is a feature used to control outgoing and incoming requests in a server. We might limit the number of requests a user without a premium account makes to 100 to an hour.  When a user makes more requests than the provided limit in the window duration then an error message is returned informing the user that the allowed limit is exceeded.

#### Project setup
1. Create a folder named `limiter` for the project.
2. In the `limiter` directory created above, execute the command below to initialize a Node.js project.
   ```bash
   $ npm init
   ``` 
3. Install `express` in the project directory.
   ```bash
   $ npm install --save express
   ```
4. In the project directory, create a file named `index.js` add the code snippet below.
   ```javascript
    const express = require('express')
    const app = express()
    const port = 3000
    //returns the string Hello World when / is visited
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
   ```
5. Execute the command below in the project directory to ensure that our application runs with no errors.

   ```bash
   $ node index.js
   ```

The provided code contains an API that returns a list of books when we send a `GET` request to the `/posts` endpoint. We will implement a rate limiter to limit the number of requests a user can make to this endpoint in a given duration. We are going to use a middleware layer to implement the rate limiter.

Since there is no authentication for users, we will implement the rate limiter using the IP address property. We can obtain the IP address from the requests object through `req.ip`.

In the project root directory, create a new file names `routes.js` and add the code snippets below.

```javascript
const { json } = require('express');
const express = require('express');
const router = express.Router();
const posts = [

    {
        id: 1,
        author: 'Lilian',
        title: 'Stock market',
        body: 'Post 1'
    },

    {
        id: 2,
        author: 'Tom',
        title: 'Covid 19',
        body: 'Post 2'
    },

    {
        id: 3,
        author: 'Vincent',
        title: 'Django APIs',
        body: 'Post 3'
    },

    {
        id: 4,
        author: 'Cindy',
        title: 'Node.js Streams',
        body: 'Post 4'
    }

]
router.get('/', function (req, res, next) {
    res.json(posts);
});

module.exports = router;

```
In the above code snippet, we create a `posts` array containing all the posts.  The router then returns an array of `posts` as a JSON array.

We finally export the router making it possible to import and use it in our `index.js` file.

#### Rate limiter implementation
`express-rate-limiter` is an npm package used for API rate-limiting in Node.js. To use `express-rate-limiter` in our application, we must install it.
Execute the command below to install `express-rate-limiter` in our application.

```bash
$ npm install express-rate-limit --save

```

In the `index.js` file, add the code snippet below.

```javascript
const express = require('express')
const indexRoute = require('./router')
const rateLimit =  require('express-rate-limit')
const app = express()
const port = 3000

app.use(rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  max: 5,
  message: 'You have exceeded 100 requests in 24 hours limit!', 
  headers: true,
}))

app.use("/posts",indexRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
- `windowMs` is the window size. In our case, we used a 24 hours window duration in milliseconds.
- `max` is the number of allowed requests per window for each user.
- `message` is the response message that a user gets whenever they have exceeded the limit.
- `headers` indicated whether to add headers to show the total number of requests and the duration to wait before trying to make requests again.
  
Hooray!🥳 we have implemented rate-limiter to our API.

#### Testing
When we make a `GET` request `localhost:3000/posts`, we get a response as shown below.

![Book List](/engineering-education/nodejs-rate-limiter/rate-limiter-running.png)

When we exceed the limit, we get the response as shown below.

![Error response](/engineering-education/nodejs-rate-limiter/running-limiter-error.png)

### Conclusion
Now that you have learned how to implement rate-limiting in a Node.js application, implement the rate limiter in your application to control the traffic in your application. The complete source of the application can be downloaded from [here](https://replit.com/@paulodhiambo/rate-limiter).
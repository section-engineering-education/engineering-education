---
layout: engineering-education
status: publish
published: true
url: /nodejs-rate-limiting/
title: Getting Started with Node.js Rate Limiting
description: This tutorial will go over the basics of API rate limiting and how to implement rate limiting in a Node.js application. Rate limiting is a feature used to control outgoing and incoming requests in a server. 
author: odhiambo-paul
date: 2021-06-10T00:00:00-12:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/nodejs-rate-limiting/hero.png
    alt: Getting started with Node.js rate limiting
---
The rate-limiting feature makes it possible to secure the Backend API from malicious attacks. It allows us to cap the number of requests that a user can make to our APIs.
<!--more-->
Rate limiting is widely used by API providers to limit the number of requests an unsubscribed user can make within a given duration i.e. [https://newsapi.org](https://newsapi.org/pricing) limits users with developer accounts only to make 100 requests per day.

Rate limiting is a feature used to control outgoing and incoming requests in a server. We might limit the number of requests a user without a premium account makes to 100 to an hour. When a user makes more requests than the provided limit in the window duration, then an error message is returned informing the user that the allowed limit is exceeded.

### Prerequisites
To follow along with this tutorial, you should have:
1. A general understanding of HTTP requests/responses.
2. [Node.js](https://nodejs.org/en/) and [Redis](https://redis.io/download) installed on your computer.
3. Some knowledge of [Node.js](https://www.w3schools.com/nodejs/).

### Project setup
1. Create a folder named `limiter` for the project.
2. In that directory, execute the following command to initialize a Node.js project:

   ```bash
   $ npm init
   ```

3. Install `express` in the project directory:

   ```bash
   $ npm install --save express
   ```

4. In the project directory, create the entry point file named `index.js`, add the following code snippet to it:

   ```javascript
   const express = require("express");
   const app = express();
   const port = 3000;
   //returns the string Hello World when / is visited
   app.get("/", (req, res) => {
     res.send("Hello World!");
   });

   app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`);
   });
   ```

5. Execute the command below in the project directory to ensure that our application runs with no errors:

   ```bash
   $ node index.js
   ```

The provided code contains an API that returns a list of books when we send a `GET` request to the `/posts` endpoint. We are going to implement a rate limiter that restricts API access to a given number of requests within a specified duration. We are going to use a middleware layer to implement the rate limiter.

In the project root directory, create a new file, name it `routes.js`, and add the following code:

```javascript
const { json } = require("express");
const express = require("express");
const router = express.Router();
const posts = [
  {
    id: 1,
    author: "Lilian",
    title: "Stock market",
    body: "Post 1",
  },

  {
    id: 2,
    author: "Tom",
    title: "Covid 19",
    body: "Post 2",
  },

  {
    id: 3,
    author: "Vincent",
    title: "Django APIs",
    body: "Post 3",
  },

  {
    id: 4,
    author: "Cindy",
    title: "Node.js Streams",
    body: "Post 4",
  },
];
router.get("/", function (req, res, next) {
  res.json(posts);
});

module.exports = router;
```

In the code above, we create a `posts` array containing all the posts. Then, the router returns an array of `posts` as a JSON array.

We finally export the router making it possible to import and use it in our `index.js` file.

### Rate limiter implementation using third party library
`express-rate-limiter` is an npm package used for API rate-limiting in Node.js. To use it in our application, we must install it.

Execute the command below to install `express-rate-limiter` in our application:

```bash
$ npm install express-rate-limit --save
```

In the `index.js` file, add the following code:

```javascript
const express = require("express");
const indexRoute = require("./router");
const rateLimit = require("express-rate-limit");
const app = express();
const port = 3000;

app.use(
  rateLimit({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 5,
    message: "You exceeded 100 requests in 12 hour limit!",
    headers: true,
  })
);

app.use("/posts", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

- `windowMs` is the window size. In our case, we used a 24 hours window duration in milliseconds.
- `max` is the maximum amount of requests a user can make within a given window duration.
- `message` is the response message that a user gets whenever they have exceeded the limit.
- `headers` indicates whether to add headers to show the total number of requests and the duration to wait before trying to make requests again.

Hooray!🥳 we have implemented rate-limiter to our API.

### Implementing a custom rate limiter using Redis
In this section, we are going to implement a custom rate-limiter using Redis to store the IP address of each user against the number of requests the user has made in the window duration. 

We need two packages to implement our custom rate limiter, `redis` to enable us to connect to Redis, and `moment` to enable us to manipulate Javascript dates.

Execute this command to install `moment` and `redis` packages into our application:

```bash
$ npm install --save redis moment
```

In the root project directory, create a file named `customLimitter.js`. Add the following code to it:

```Javascript
import moment from 'moment';
import redis from 'redis';

const redis_client = redis.createClient();
const WINDOW_DURATION_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 100;
const WINDOW_LOG_DURATION_IN_HOURS = 1;


export const customLimiter = (req, res, next) => {
    try {
        //Checks if the Redis client is present
        if (!redis_client) {
            console.log('Redis client does not exist!');
            process.exit(1);
        }
        //Gets the records of the current user base on the IP address, returns a null if the is no user found
        redis_client.get(req.ip, function(error, record) {
            if (error) throw error;
            const currentTime = moment();
            //When there is no user record then a new record is created for the user and stored in the Redis storage
            if (record == null) {
                let newRecord = [];
                let requestLog = {
                    requestTimeStamp: currentTime.unix(),
                    requestCount: 1
                };
                newRecord.push(requestLog);
                redis_client.set(req.ip, JSON.stringify(newRecord));
                next();
            }
            //When the record is found then its value is parsed and the number of requests the user has made within the last window is calculated
            let data = JSON.parse(record);
            let windowBeginTimestamp = moment()
                .subtract(WINDOW_DURATION_IN_HOURS, 'hours')
                .unix();
            let requestsinWindow = data.filter(entry => {
                return entry.requestTimeStamp > windowBeginTimestamp;
            });
            console.log('requestsinWindow', requestsinWindow);
            let totalWindowRequestsCount = requestsinWindow.reduce((accumulator, entry) => {
                return accumulator + entry.requestCount;
            }, 0);
            //if maximum number of requests is exceeded then an error is returned
            if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
                res
                    .status(429)
                    .jsend.error(
                    `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_DURATION_IN_HOURS} hrs limit!`
                );
            } else {
                //When the number of requests made are less than the maximum the a new entry is logged
                let lastRequestLog = data[data.length - 1];
                let potentialCurrentWindowIntervalStartTimeStamp = currentTime
                    .subtract(WINDOW_LOG_DURATION_IN_HOURS, 'hours')
                    .unix();
                //When the interval has not passed from the last request, then the counter increments
                if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
                    lastRequestLog.requestCount++;
                    data[data.length - 1] = lastRequestLog;
                } else {
                    //When the interval has passed, a new entry for current user and timestamp is logged
                    data.push({
                        requestTimeStamp: currentTime.unix(),
                        requestCount: 1
                    });
                }
                redis_client.set(req.ip, JSON.stringify(data));
                next();
            }
        });
    } catch (error) {
        next(error);
    }
};
```

In the code above, we added `Redis` and `moment` in our application. We are using `Redis` as an in-memory database for tracking user activity, while `moment` helps us to manipulate Javascript dates.

`customLimiter` middleware contains the logic that tracks the user activity and saves it in `Redis`.

### Testing
If we make a `GET` request at `localhost:3000/posts`, we will get a response as shown below:

![Book list](/engineering-education/nodejs-rate-limiter/rate-limiter-running.png)

When we exceed the limit, we will get the following response:

![Error response](/engineering-education/nodejs-rate-limiter/running-limiter-error.png)

### Conclusion
You have learned how to implement rate-limiting in a Node.js application, and how to implement the rate limiter in your application to control the traffic. You can find the complete code [here](https://replit.com/@paulodhiambo/rate-limiter).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

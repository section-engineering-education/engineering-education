---
layout: engineering-education
status: publish
published: true
url: /implementing-caching-in-nodejs-using-redis/
title: Implementing Caching in Node.js using Redis
description: In this article we will cover how to implement caching on a Node.js REST API using recipe labs API as our data source and redis as our cache.
author: kennedy-mwangi
date: 2021-02-07T00:00:00-09:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-caching-in-nodejs-using-redis/hero.jpg
    alt: Implementing Caching in Node.js using Redis
---
Caching refers to the process of storing data in a temporary location so that the data can be accessed with minimal resources. Caching aims to reduce the cost of bandwidth of data sent over the network and the application's response time. Applications that implement caching are faster and user friendly.
<!--more-->
### Prerequisites
To follow along with this article, it would be helpful to have the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Working knowledge of JavaScript.
- Working knowledge of Node.js and [Express.js](https://expressjs.com/).
- [Postman](https://www.postman.com/) installed on your computer.
- Linux or macOS based operating system.

### Overview
- [Application overview](#application-overview)

- [Setting up the application](#setting-up-the-application)

- [Fetching data from recipe labs API](#fetching-data-from-recipe-labs-api)

- [Installing redis](#installing-redis)

- [Importing and configuring redis.](#importing-and-configuring-redis)

- [Setting up redis](#setting-up-redis)

- [Considerations while implementing caching](#considerations-while-implementing-caching)

### Application overview
In this article, we will walk through the steps of implementing caching in a Node.js app using [redis](https://redis.io/) as our cache. We will implement a REST API using the Express.js framework. We will be making requests to [recipe labs api](http://www.recipepuppy.com/?ref=hackernoon.com). It is a public API used when accessing recipes of different food items.

### Setting up the application
To set up the application, clone this [GitHub repository](https://github.com/mwangiKibui/implementing-caching-in-nodejs). The repository has two directories, start, and final. We will be working on the start directory throughout the article but if you encounter an error feel free to check out the final directory.

To install the necessary dependencies, in your cloned folder execute the following command:

```bash
cd ./start && npm install
```

Our main focus will be implementing `fetchFoodItem` function located in `controllers/recipe.js` file. It handles the logic for the `recipe/:foodItem` route.

### Fetching data from recipe labs API
To fetch data from the API we:

- Import `axios` module in `controllers/recipe.js` file:

```javascript
const axios = require("axios");
```

- Modify the `fetchFoodItem` function as follows:

```javascript
const fetchFoodItem = async (req, res, next) => {
  try {
    //destructure the foodItem from params.

    let { foodItem } = req.params;

    //fetch the data.

    const recipe = await axios
      .get(`http://www.recipepuppy.com/api/?q=${foodItem}`)
      .catch(console.log);

    //return a response.
    return res.send({
      success: true,
      message: recipe.data.results,
    });
  } catch (err) {
    //return the error
    return res.send({
      success: false,
      message: err,
    });
  }
};
```

From above:
- Get the food item from the request object.
- Fetch data from the public API.
- Send the data to the client.

To test this, follow the following steps:

- Start the development server from your terminal by running: `npm run dev`.

- Head over to Postman and send a request to the route. Do not include the semi-colons. The request should be similar to: `http://localhost:3000/recipe/coffee`. Feel free to replace coffee with your preference.

- Wait for the response to be sent back and then check the time taken on the upper right section. Typically, it will take around 600 ms or more. This amount of time means that our application is consuming a lot of user network bandwidth. To minimize this cost, we have to set up `caching`. 

For this article, we will be using `redis.`

### Installing redis
If you have already installed `redis`, feel free to proceed to the next step. Otherwise follow along with the steps below.

- Open a separate tab in your terminal and run the following command to shift to your home directory.

```bash
cd
```

- In your home directory, run the following commands one by one:

```bash
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
```

- To confirm installation, run the following command to start the `redis server`:

```bash
redis-server
```

- If the server is started successfully, continue on to the next step. Otherwise if you encounter an error, kindly reference the [official docs](https://redis.io/topics/quickstart).

### Importing and configuring redis
Follow the steps below:

- Import `redis` module in `controllers/recipe.js` file:

```javascript
const redis = require("redis");
```

- Configure `redis` port and error handling in `controllers/recipe.js` file:

```javascript
const client = redis.createClient({
  port: 6379,
});

client.on("error", (error) => console.error(error));
```

### Setting up redis
Incorporating `redis` in our function shall involve:

- Checking if the record of food item sent from the params is present in the cache since it will be treated as a key.

- If the record exists, sending data to the client from the cache.

- If the data does not exist in the cache, fetching the data from the API, saving data in the cache, and sending the data to the client.

To set up `redis` we modify the `fetchFoodItem` function as follows:

```javascript
const fetchFoodItem = async (req, res, next) => {
  try {
    //get the food item.

    let { foodItem } = req.params;

    //check the data on redis store.

    client.get(foodItem, async (_, recipe) => {
      if (recipe) {
        //send the response from cache

        return res.send({
          success: true,
          message: JSON.parse(recipe),
          meta_data: "from cache",
        });
      } else {
        //fetch the data.

        const recipe = await axios
          .get(`http://www.recipepuppy.com/api/?q=${foodItem}`)
          .catch(console.log);

        //set the data on cache

        client.set(foodItem, JSON.stringify(recipe.data.results));

        //send the response

        return res.send({
          success: true,
          message: recipe.data.results,
          meta_data: "from server",
        });
      }
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err,
    });
  }
};
```

From the snippets above:

- Get the food item from the request object.

- Check if its record exists in the cache, if it exists we send the data to the client from there. If it does not exist, we fetch the data from the API, set it to cache, and then send it to the client.

- An important takeaway here is that when setting data to the cache, we have to convert it to a `string`. When getting it from the cache, we have to `parse` it to convert it to its original form.

To test the above code:
- Ensure that the development server is up and running.

- Head over to Postman and send a request similar to: `http://localhost:3000/food/coffee`. Feel free to replace coffee with your preference.

- Wait for the response and observe the amount of time it has taken to get the response. In the process, it has saved the data in the cache since it was not saved.

- Send the same request again. This time the time taken to get the response will have significantly be reduced. This is because the response was accessed from the cache. The network bandwidth used is also reduced.

### Considerations while implementing caching
The following are important considerations you need to take when implementing caching:

- **How often is data being updated.**: If the data is not being updated regularly then you are safe using the prior implementation. Otherwise if the data is frequently updated, you will need to set the time with which the data that will be available in the cache.

Considering our implementation, we can set the data to be cached for only 24 minutes. You must convert your time to seconds.

In the line where you are setting the data to cache, replace it with the following line of code.

```javascript
client.setex(foodItem, 1440, JSON.stringify(recipe.data.results));
```

- **Uniqueness of the key**: When the keys are similar, the cache will store inappropriate data. In order to ensure that you do not get similar keys, you have to hash them.

Make the following modifications in our `fetchFoodItem` function in order to support the hashing of keys:

```javascript
const fetchFoodItem = async (req, res, next) => {
  try {
    //get the food item.

    let { foodItem } = req.params;

    //hash the key.

    let hashKey = new Buffer.from(`${foodItem}`).toString("base64");

    //check the data on redis store.

    client.hget(hashKey, foodItem, async (_, recipe) => {
      if (recipe) {
        //send the response from cache

        return res.send({
          success: true,
          message: JSON.parse(recipe),
          meta_data: "from cache",
        });
      } else {
        //fetch the data.

        const recipe = await axios
          .get(`http://www.recipepuppy.com/api/?q=${foodItem}`)
          .catch(console.log);

        //set the data on cache

        client.hset(hashKey, foodItem, JSON.stringify(recipe.data.results));

        //set the duration of cache.

        client.expire(hashKey, 1440);

        //send the response

        return res.send({
          success: true,
          message: recipe.data.results,
          meta_data: "from server",
        });
      }
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err,
    });
  }
};
```

From above:
- Get the food item from the request object.

- Hash the food item which is the key.

- Check if its record exists in the cache. If it exists, we send it to the client from the cache. If it does not, we fetch it from the API, save it to the cache, and then send it to the client.

To test this:
- Ensure that the development server is running.

- Head over to Postman and send a request similar to: `http://localhost:3000/recipe/coffee`. Feel free to change coffee to your preference.

- Send the request.

- Since it is your first request after hashing, it shall save the data, and then when you send the same request again it shall access the data from the cache. The data is configured to stay in the cache for 24 minutes.

- **Caching on every query**: In some instances such as authorization, caching may not be advisable since the data is rapidly updated. Real-time communication mechanisms do not also require caching.

### Conclusion
Caching is great in improving the user experience of an application. It enables users to access data within a short response time and with less network bandwidth. While implementing caching, software developers should keep in mind the key considerations discussed above.

In this article, we have covered how to implement caching on a Node.js REST API using recipe labs API as our data source and redis as our cache.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)

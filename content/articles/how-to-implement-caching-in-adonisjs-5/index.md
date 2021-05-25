# How to Implement Caching in AdonisJS 5.

The performance of a web application is becoming an integral part of the application as many statistics have shown that slow web applications can result in loss of traffic, sales, and incomes in many different ways.

In this article, we will learn how to implement a Caching System on our Forum API developed with AdonisJS and integrate the newly created Caching Package for the new AdonisJS 5 with optimum Caching experience.

In this article, we will continue and improve the performance of the Forum API developed with the[building Restful API with AdonisJS 5 tutorial.](/engineering-education/build-a-restful-api-with-adonisjs/) You can take a peek at what we built in the previous article to know what the API is about.

### Prerequisites

You should know these before proceeding with this content.

- Basic understanding of TypeScript and Node.js
- Basic [understanding of Adonis.js](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide)
- Building [APIs with AdonisJS](/engineering-education/build-a-restful-api-with-adonisjs/)
- Basic [knowledge of Caching](https://masteringbackend.com/posts/caching-strategy-for-adonisjs-restful-api/)

### Goals of the Tutorial

I will be showing you the best practice in handling Caching in Adonisjs, and we will build a real-world Forum app to demonstrate how to boost performance with a good Caching Strategy.

Students will learn how to build a high-performance API with Adonisjs
Students will learn how to implement a Caching System in AdonisJS Restful API
Students will learn about the concept of Caching and how to scale large App with it.
Students will learn best practices in building performance-oriented Web apps with AdonisJS.

### Install AdonisJS

Getting started with AdonisJS 5 is now very easy and straight to point as it has been released to publishing and has well-documented documentation.

If you're just getting started with AdonisJS 5, I recommend reading [AdonisJS 5 tutorial: The Ultimate Guide](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) and [building a restful API with Adonis 5](/engineering-education/build-a-restful-api-with-adonisjs/) to get to speed.

You can run this command to have AdonisJS 5 installed.

```bash
npm init adonis-ts-app@latest forum-api
```

But we will continue with the Forum API we have already developed with the article above. you can [clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) to get started.

### Setting up Adonis Cache

After installing and setting up your Adonis 5 RestFul API project, we will install and configure our Caching Package that will simplify implementing our Caching Strategy to the Forum API to improve the performance or response time of the API.

Run the following command to install the Adonis Cache package.

```bash
npm i @kaperskyguru/adonis-cache
```

Next, run the below command to configure and set up the package.

```bash
node ace invoke @kaperskyguru/adonis-cache
//Or
node ace configure @kaperskyguru/adonis-cache
```

Next, open the `.env` file, inform the Cache Package to use `redis` as our Cache Driver, and move below to configure our Redis server, so our Cache Package can communicate successfully to the Redis Server.

    CACHE_DRIVER=redis

The default driver is set to `file`, but you can read the documentation to understand the different drivers and configure them.

Before using Redis as your Driver, make sure to have Redis installed on your machine, and it is also configured correctly to work with AdonisJS 5.

To install Redis Community Server on your local machine, [visit this link and download](https://redis.io/download) the binary file depending on your OS, and follow the instructions.

Next, the Cache Package uses the default Redis configuration of AdonisJS 5, so you must configure your AdonisJS 5 Redis configuration. You can follow the steps below to install and configure the Redis Server for AdonisJS 5.

### Installing Adonis Redis

To use `redis` as your cache driver, you need to have it installed on your server and installed and configured in your Adonis 5 project.

To do that, run the following command.

```bash
npm i @adonisjs/redis
```

And configure it with this command.

```bash
node ace configure @adonisjs/redis
//Or
node ace invoke @adonisjs/redis
```

There are more configurations and twerks for even better usage of Redis than the default options we have just accepted. You can read more about Adonis Redis configuration [here](https://docs.adonisjs.com/guides/redis).

### Handling Caching Adonisjs 5

Before implementing the Caching, you should have [cloned the Forum API project](https://github.com/Kaperskyguru/adonisjs-forum-api), installed and configured Redis Server, AdonisJS Redis, and the Caching Package we will be using in this project.

If you have all these checked, we are ready to dive right into the code.

In the world of Caching, there are many Caching Strategies and methods available depending on the structure of your data structure and the different operations performed on the data; you can choose other Caching strategies depending on the features and type of the project.

You can read through the [Best Caching Strategy for AdonisJS 5](https://masteringbackend.com/posts/caching-strategy-for-adonisjs-restful-api/) which will show you the different Caching Strategies, and choose which one depending on the features or type of project.

We will be using the **Cache Aside Strategy** for all the Read operations and a mixture of **Write Around** and **Write Through Strategy** for the Write operations.

Open your Controller file. We already have the `TicketsController` file found in our previous project's `app/Controllers/Http` folder.

First, we will look at the Read Operations:

```js

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum';
import Cache from '@ioc:Kaperskyguru/Adonis-Cache'

export default class ForumsController {

    // Reading all Forums available
    public async index({}: HttpContextContract) {
    const forums = await Cache.remember('forums', 60, async function () {

        // This code is only executed if there was a MISS
        return await Forum.query().preload('user').preload('posts');

    })
    return forums
    }

    // Reading a Single Forum by ID
    public async update({ auth, request, params}: HttpContextContract){
    try {
        const ticket = await Cache.remember('forum_id_' + params.id, 60, async function () {
        // This code is only executed if there was a MISS
        return await Forum.find(params.id);
        })

        if (forum) {
            forum.title = request.input('title');
            forum.description = request.input('description');
            if (await forum.save()) {
                await forum.preload('user')
                await forum.preload('posts')
                return forum
        }
    } catch (error) {
        console.log(error)
    }
    }

```

The Read operations are shown mainly in the `index` and `show` methods for retrieving all Forums and a single Forum by ID.

The `Cache.remember` function from the Cache Package implements the Cache Aside Strategy for us out of the box.

From the code above, we can see that we first try to read the content from our Cache Server, and if there is a HIT, we return the Forum, and if there is a MISS, we continue to retrieving the Forum with the closure function.

Next, we will look at the Write Operations:

```ts

public async update({ request, params }: HttpContextContract) {

// Tries to find a Forum from Cache, if found returns the Forum
const forum = await Cache.remember('forum_id_' + params.id, 60, async function () {
    // If not found, Retrieves from Database and Save to Cache.
    return await Forum.find(params.id)
})


if (forum && await ticket.save()) {

    // If updates successfully in database, then updates the Cache Server.
    await Cache.update('forum_id_' + params.id, ticket, 60)

    forum.title = request.input('title');
    forum.description = request.input('description');
    if (await forum.save()) {
        await forum.preload('user')
        await forum.preload('posts')
        return forum
    }
    return // 422
}

public async store({ auth, request, response}: HttpContextContract)
{
    const user = await auth.authenticate();
    const forum = new Forum();
    forum.title = request.input('title');
    forum.description = request.input('description');
    await user.related('forums').save(forum)

    // Stores a new Ticket to Cache
    await Cache.set('ticket_id_' + ticket.id, ticket, 60)
    return forum
}
```

The Write Operations first goes to the Database (Write Around) before updating the Cache server during the Read Operation or immediately to speed up the Read operations subsequently.

### Step 3 → Testing the Performance

Now that we have implemented our Caching System in our project, let's run some tests and see how the performance of our API is improved.

We will compare both the previous API without Caching and with Caching to see the difference in seconds.

First, we have the result of the performance without implementing our Cache System. However, the result is pretty fast, though, comparing the payload, which is minimal, about two ticket collections.

So we have a **643ms response time** on our API request.

![Test Forum With No Cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_nocache.png)

Next, we will look at the same result set and request but to a Cache endpoint.

![Test Forum With Cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_cache.png)

At a glance, you will see that there is a significant improvement in the response time from **643 response time** without a Cache to **12ms response time** with a Cache System implemented.

### Conclusion

Caching should be an integral part of the application development process if you need to achieve good performance and speed in your project.

How to Implementing Caching in AdonisJS 5 shows precisely how to implement a Caching and improve the response time in your AdonisJS projects.

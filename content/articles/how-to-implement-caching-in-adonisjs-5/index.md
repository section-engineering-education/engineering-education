---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-caching-in-adonisjs-5/
title: How to Implement Caching using Adonis.js 5
description: In this tutorial, we will learn how to implement caching using Adonis.js 5. We will integrate it with the newly created caching package for the new Adonis 5 with an great caching experience.
author: solomon-eseme
date: 2021-06-30T00:00:00-10:30
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-caching-in-adonisjs-5/hero.png
    alt: Adonis.js Caching example image
---
The performance of a web application is an integral part of the application. Statistics have shown that slow web applications can result in loss of traffic, sales, and incomes in many different ways.
<!--more-->
In this tutorial, we will learn how to implement a caching system on our forum API developed with Adonis.js (or simply Adonis), to improve the performance and load time of our API request. We will also integrate it with the newly created caching package for the new Adonis 5 with an optimum caching experience.

This article intends to improve the performance of our previous Forum API by implementing the best caching strategy that will scale and boost the performance of our API. We developed the Forum API in this [Building Restful API with Adonis 5 tutorial](/engineering-education/build-a-restful-api-with-adonisjs/) tutorial.

### Prerequisites
You should have the following before proceeding with this tutorial.
- Some understanding of [TypeScript](/engineering-education/search/?q=TypeScript) and [Node.js](/engineering-education/topic/node.js/).
- [Some understanding of Adonis](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide).
- [Some knowledge on building APIs with Adonis](/engineering-education/build-a-restful-api-with-adonisjs/).
- [Some knowledge on caching](https://restfulapi.net/caching/).

### The goal of this tutorial
I will show you the best practices used when handling caching using Adonis. To show how to boost the performance of an API, we will be using a real-world Forum application to demonstrate and to learn how to select a good caching strategy to boost performance.

In this tutorial, you will learn:
- How caching system works in an Adonis restful API.
- About the concept of caching and scaling a large enterprise app with it.
- The best practices for building performance-oriented web apps with Adonis.
- How to develop a high-performance API with Adonis 5.

### Installing Adonis
Getting started with Adonis 5 is straightforward as it is well-documented.

To get started, reading [Adonis.js 5 ultimate guide](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) and [developing a RESTFUL API with Adonis 5](/engineering-education/build-a-restful-api-with-adonisjs/) can get you up to speed.

Run the command below to have Adonis 5 installed on your machine.

```bash
npm init adonis-ts-app@latest forum-api
```

The command above will create a new Adonis 5 project, properly configured and ready to be used.

We will use the Forum API developed with the article mention earlier. [Clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) for an easy setup.

### Setting up Adonis cache
After cloning the project from the Github repo, run the following command to set up everything needed or follow through this [tutorial](/engineering-education/build-a-restful-api-with-adonisjs/) before continuing.

```bash
npm install
```

Next, we will install and configure our caching package. This will simplify implementing our caching strategy on the Forum API, to improve the performance and response time of the API.

The package is a caching driver implementation similar to Laravel cache but used with Adonis 5, it abstracts away different caching driver implementations and caching strategies to expose only the methods that are needed. 

You can explore more about the package [here](https://github.com/Kaperskyguru/kap-adonis-cache).

To install the Adonis cache package, run the following commands.

```bash
npm i @kaperskyguru/adonis-cache
```

Next, to set up and configure the package, run this command.

```bash
node ace configure @kaperskyguru/adonis-cache
# or
node ace invoke @kaperskyguru/adonis-cache
```

Next, open the `.env` file and inform the cache package to use `redis` as the cache driver.

```js
CACHE_DRIVER = redis;
```

Let's continue configuring our Redis server so that our cache package can communicate successfully with the Redis server.

The default driver is set to `file`. The documentation contains different drivers and how to configure each of them based on your project requirements.

Before using Redis as your driver, make sure to have Redis installed on your machine, and configured correctly to work with Adonis 5.

To install the Redis community server on your local machine, [download the binary file](https://redis.io/download) depending on your OS, and follow the instructions.

The cache package uses the default Redis configuration provided by Adonis 5. Therefore, you must configure Adonis Redis.

The steps below show how to install and configure the Redis server for Adonis 5.

### Installing Adonis Redis
To use `redis` as your cache driver, you need to have it installed on your server and also installed and configured in your Adonis 5 project.

To do that, run the following command.

```bash
npm i @adonisjs/redis
```

Configure `@adonisjs/redis` with this command.

```bash
node ace configure @adonisjs/redis
# Or
node ace invoke @adonisjs/redis
```

There are more configurations and tweaks for even better Redis usage other than the default options we have just accepted. More information about Adonis Redis configurations can be found [here](https://docs.adonisjs.com/guides/redis).

### Pre-testing the performance
Let's run a performance test using [Postman](https://www.postman.com/) to see the change in performance after implementing caching.

![Test Forum With No Cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_nocache.png)

As shown above, we got a **643ms response time** on our API request. This result is pretty fast.

### Handling caching in Adonis 5
You should have cloned the [Forum API project](https://github.com/Kaperskyguru/adonisjs-forum-api) by now. You should also have the Redis server, Adonis Redis, and the caching package we will be using in this project installed and configured.

If you have all these checked, let's dive right into the code.

In the world of caching, there are many caching strategies and methods available depending on your data structure and the different operations performed on the data. You can choose other caching strategies depending on the features and type of the project.

You can read through the [best caching Strategies for Adonis 5](https://masteringbackend.com/posts/caching-strategy-for-restful-api/) which will show you the different caching strategies, and help you choose which one to use depending on the features or the type of project.

We will be using the **cache aside strategy** for all the read operations and a mixture of **write around** and **write-through strategy** for the write operations.

You can find the `ForumsController` file in our previous project's `app/Controllers/Http` folder.

First, we will start with read operations. 

Update the `ForumsController` to look like the snippet below.

```js
import Cache from '@ioc:Kaperskyguru/Adonis-Cache'
import Forum from 'App/Models/Forum';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ForumsController {

    // Reading all Forums available
    public async index({}: HttpContextContract) {
        const forums = await Cache.remember('forums', 60, async function () {

            // This code is only executed when there is a MISS
            return await Forum.query().preload('user').preload('posts');

        })
        return forums
    }

    // Retrieving a Single Forum by ID
    public async update({request, params}: HttpContextContract){
        try {
            const forum = await Cache.remember('forum_id_' + params.id, 60, async function () {
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
            }

        } catch (error) {
                console.log(error)
        }
    }
}
```

The read operations are shown mainly in the `index()` method for retrieving all forums and a single forum by ID.

The `Cache.remember()` already implements the Cache Aside Strategy out of the box from the Laravel Cache package.

From the above code, it's clear that we try to read the content from the cache server first, and if it is found (HIT), we return the `forum`. But If it is not found (MISS), we continue to retrieving the `forum` with the closure function.

Next, the write operations.

Update the `ForumsController` to look like the snippet below.

```ts
public async update({ request, params }: HttpContextContract) {

// Tries to find a Forum from Cache, if found returns the Forum
    const forum = await Cache.remember('forum_id_' + params.id, 60, async function () {
        // If not found, Retrieves from Database and Save to Cache.
        return await Forum.find(params.id)
    })

    if (forum && await forum.save()) {

        // On successfully updates in database, then updates the Cache Server
        await Cache.update('forum_id_' + params.id, forum, 60)

        forum.title = request.input('title');
        forum.description = request.input('description');
        if (await forum.save()) {
            await forum.preload('user')
            await forum.preload('posts')
            return forum
        }
        return // 422
    }
}

public async store({ auth, request}: HttpContextContract)
{
    const user = await auth.authenticate();
    const forum = new Forum();
    forum.title = request.input('title');
    forum.description = request.input('description');
    await user.related('forums').save(forum)

    // Stores a new forum to Cache
    await Cache.set('forum_id_' + forum.id, forum, 60)
    return forum
}
```

The write operations access the database first (write around) and updates the cache server only during read operations to subsequently speed up the read operations.

### Post-testing the performance
Now that we have implemented a caching system on our project, let's run some tests using Postman to see the performance improvements of the API.

![Test Forum With cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_cache.png)

At a glance, you will see that there is a significant improvement in the response time from **643ms response time** without cache to **12ms response time** with a cache system implemented.

### Conclusion
In every performance-oriented application, caching should be an integral part of the application development process if you need to achieve good performance and speed in your project.

In this tutorial, we have looked at how to implement caching and improve the response time in your Adonis projects.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)

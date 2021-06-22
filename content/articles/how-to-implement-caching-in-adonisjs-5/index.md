# How to Implement caching in Adonis.js 5.
The performance of a web application is an integral part of the application. Many statistics have shown that slow web applications can result to loss of traffic, sales, and incomes in many different ways.

In this tutorial, we will learn how to implement a caching system on our [forum API](/engineering-education/build-a-restful-api-with-adonisjs/) developed with Adonis (or simply Adonis) to improve the performance and load time of our API request. We will also integrate the newly created caching package for the new Adonis 5 with optimum caching experience.

In this article, we will continue and improve the performance of the forum API developed on the [building Restful API with Adonis 5 tutorial](/engineering-education/build-a-restful-api-with-adonisjs/). You can take a peek at what we built in the previous article to know what the API is about.

### Prerequisites
You should have the following before proceeding with this tutorial.

- Some understanding of TypeScript and Node.js.
- [Some understanding of Adonis](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide).
- [Some knowledge on building APIs with Adonis](/engineering-education/build-a-restful-api-with-adonisjs/).
- [Some knowledge on caching](https://masteringbackend.com/posts/caching-strategy-for-restful-api/).

### The goal of the tutorial
I will be showing you the best practices for handling caching using Adonis. We will use a real-world forum app to demonstrate how to boost performance with a good caching strategy.

In this tutorial, you will learn:

- how to build a high-performance API with Adonis
- how to implement a caching system in Adonis restful API.
- about the concept of caching and how to scale large App with it.
- the best practices for building performance-oriented web apps with Adonis.

### Installling Adonis
Getting started with Adonis 5 is very easy and straightforward as it is well-documented.

If you're just getting started with Adonis 5, I recommend reading [Adonis.js 5 tutorial: The Ultimate Guide](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) and [building a restful API with Adonis 5](/engineering-education/build-a-restful-api-with-adonisjs/) to get to the speed.

You can run this command to have Adonis 5 installed.

```bash
npm init adonis-ts-app@latest forum-api
```

The command above will create a new Adonis 5 project, properly configure and ready to be used.

We will continue with the forum API we have already developed with the article above. you can [clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) to get started.

### Setting up Adonis cache
After cloning the project from my Github repo, run the following command below to set up everything needed or follow through this [tutorial](/engineering-education/build-a-restful-api-with-adonisjs/) before this one.

```bash
npm install
```

Next, we will install and configure our caching package. This will simplify implementing our caching strategy to the Forum API, to improve the performance or response time of the API.

The package is a caching driver implementation similar to Laravel cache but used with Adonis 5, it abstracts away different caching driver implementation and caching strategies to expose only the methods that are needed. You can explore more about the package [here](https://github.com/Kaperskyguru/kap-adonis-cache).

Run the following command to install the Adonis cache package.

```bash
npm i @kaperskyguru/adonis-cache
```

Next, run the below command to configure and set up the package.

```bash
node ace invoke @kaperskyguru/adonis-cache
# or
node ace configure @kaperskyguru/adonis-cache
```

Next, open the `.env` file and inform the cache package to use `redis` as our cache driver.

```js
CACHE_DRIVER = redis;
```

Continue below to configure our Redis server, so that our cache package can communicate successfully to the Redis server.

The default driver is set to `file`, but you can read the documentation to understand the different drivers and configure them.

Before using Redis as your driver, make sure to have Redis installed on your machine, and it is also configured correctly to work with Adonis 5.

To install the Redis community server on your local machine, [download the binary file](https://redis.io/download) depending on your OS, and follow the instructions.

The cache package uses the default Redis configuration provided by Adonis 5. Therefore, you must configure your Adonis Redis configuration.

Follow the steps below to install and configure the Redis server for Adonis 5.

### Installing Adonis Redis
To use `redis` as your cache driver, you need to have it installed on your server and installed and configured in your Adonis 5 project.

To do that, run the following command.

```bash
npm i @adonisjs/redis
```

Configure `@adonisjs/redis` with this command.

```bash
node ace configure @adonisjs/redis
//Or
node ace invoke @adonisjs/redis
```

There are more configurations and tweaks for even better Redis usage than the default options we have just accepted. You can read more about Adonis Redis configuration [here](https://docs.adonisjs.com/guides/redis).

### Handling caching in Adonis 5
Before implementing caching, you should have [cloned the Forum API project](https://github.com/Kaperskyguru/adonisjs-forum-api). You should also have the Redis server, Adonis Redis, and the caching package we will be using in this project installed and configured.

If you have all these checked, we are ready to dive right into the code.

In the world of caching, there are many caching strategies and methods available depending on the structure of your data structure and the different operations performed on the data. You can choose other caching strategies depending on the features and type of the project.

You can read through the [best caching Strategy for Adonis 5](https://masteringbackend.com/posts/caching-strategy-for-restful-api/) which will show you the different caching strategies, and help you choose which one to use depending on the features or the type of project.

We will be using the **cache aside strategy** for all the read operations and a mixture of **write around** and **write through strategy** for the write operations.

We already have the `ForumsController` file found in our previous project's `app/Controllers/Http` folder.

First, we will look at the read operations:

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

The `Cache.remember()` function from the cache package implements the cache aside strategy for us out of the box.

From the code above, we can see that we first try to read the content from our cache server, and if there is a HIT, we return the forum. If there is a MISS, we continue to retrieving the forum with the closure function.

Next, we will look at the write operations:

```ts
public async update({ request, params }: HttpContextContract) {

// Tries to find a Forum from Cache, if found returns the Forum
    const forum = await Cache.remember('forum_id_' + params.id, 60, async function () {
        // If not found, Retrieves from Database and Save to Cache.
        return await Forum.find(params.id)
    })

    if (forum && await forum.save()) {

        // If updates successfully in database, then updates the Cache Server.
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

The write operations first goes to the database (write around) before updating the cache server during the read operation or immediately to speed up the read operations subsequently.

### Testing the performance
Now that we have implemented our caching system in our project, let's run some tests using [Postman](https://www.postman.com/) and see how the performance of our API is improved.

We will compare both the previous API without caching and with caching to see the difference in seconds.

First, we have the result of the performance without implementing our cache system. However, the result is pretty fast, though, comparing the payload, which is minimal, about two forum collections.

So we have a **643ms response time** on our API request.

![Test Forum With No Cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_nocache.png)

Next, we will look at the same result set and request but to a Cache endpoint.

![Test Forum With Cache](/engineering-education/how-to-implement-caching-in-adonisjs-5/forum_cache.png)

At a glance, you will see that there is a significant improvement in the response time from **643ms response time** without cache to **12ms response time** with a cache system implemented.

### Conclusion
Caching should be an integral part of the application development process if you need to achieve good performance and speed in your project.

In this tutorial, we have looked precisely on how to implement caching and improve the response time in your Adonis projects.

Happy Coding!

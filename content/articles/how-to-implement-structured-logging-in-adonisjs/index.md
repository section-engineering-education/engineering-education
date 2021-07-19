## How to implement Structured Logging in Adonisjs

Logs are among essential tools for application developers during the debugging process and for analysts monitoring applications in the production environment.

Typical logs are textual formats that are easily readable by humans but very difficult for machines to read and process.

Assuming you want to use automated processing to investigate log files, or you want to use algorithms to categorize, index, and search through log files based on specific parameters, typical logs will not work as expected.

That is where Structured Logging becomes useful:

This article will show the best practice in implementing Structured Logging in Adonisjs, discussing in detail the best ways involved in implementing a scalable Logging System in your RESTFUL API. We will build a real-world app to demonstrate how to debug easily with an excellent Structured Log in AdonisJS.

### Prerequisites

You should know of these before proceeding with this content.

1. Basic understanding of TypeScript and Node.js
2. Basic [understanding of Adonis.js](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide)
3. Building [APIs with AdonisJS](/engineering-education/build-a-restful-api-with-adonisjs/)

### Goals of the Tutorial

I will be showing you the best practice in handling Structured Logging in Adonisjs, and we will build a real-world Forum app to demonstrate how to boost maintainability in AdonisJS.

In this tutorial, you will learn:

- How to build a high-maintainable app with Adonisjs.
- Implementing a Structured Logging in AdonisJS Restful API.
- How to choose what to Log and how to Log it.
- Learn about the concept of Structured Logging and how to maintain a large App with it.
- Learn best practices in building large-scale Web apps with AdonisJS.

### Scaffolding AdonisJS Project

Getting started with Adonis 5 is easy because of its well-documented documentation. To learn more about the latest AdonisJS 5, reading through [Adonis.js 5 ultimate guide](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) and [building a RESTFUL API with Adonis 5](/engineering-education/build-a-restful-api-with-adonisjs/) to get up to speed.

To install AdonisJS 5, run the command below:

```bash
npm init adonis-ts-app@latest forum-api
```

The command creates a new Adonis 5 project, properly configured and ready to be used. We will continue with the Forum API developed with the article on [How to Implement Caching using Adonis.js 5](/engineering-education/how-to-implement-caching-in-adonisjs-5/). You can [clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) for an easy setup.

### Setting up Adonis Logger

AdonisJS ships with an [inbuilt logger](https://docs.adonisjs.com/guides/logger) developed on top of one of the fastest logging libraries in Node.js called [Pino](https://github.com/pinojs/pino).

Log messages can cause a throttling effect on the application due to the overtime addition of log messages. Such an effect includes reduced requests per second.

[Pino](https://github.com/pinojs/pino) is a low overhead Node.js logger using minimum resources for Logging and is 5X faster than other alternatives. See the [Benchmarks](https://getpino.io/#/docs/benchmarks) document for comparisons.

You can import and use the logger directly as follows without having to install any package:

```js
import Logger from "@ioc:Adonis/Core/Logger";

Logger.info("A info message");
Logger.warn("A warning");
```

### Handling Logging in Adonis 5

You should have cloned the Forum API Project and correctly test and configure it to work correctly.

We will be using AdonisJS default Logger for all the log operations. Let’s look at how to configure the logger.

Firstly, open `config/app.ts`, and change the value of `generateRequestId` to `true` , allowing Adonis to generate a unique Request ID to identify each request coming to the AdonisJS server.

```js
//...

/*
    |--------------------------------------------------------------------------
    | Request Ids
    |--------------------------------------------------------------------------
    |
    | Setting this value to `true` will generate a unique request id for each
    | HTTP request and set it as `x-request-id` header.
    |
    */
    generateRequestId: true,

// ...
```

If your application hits any errors along the way, it will generate a unique request ID for that request and log in to the console for further investigations.

![Log Errors](/engineering-education/how-to-implement-structured-logging-in-adonisjs/log_errors.png)

Next, we will update our Forum API to log out specific and vital information of our application as the user interacts with it in production.

First, we will update the `ForumsController.ts` in `app/Controllers/Http`:

```js
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Forum from "App/Models/Forum";
import Logger from "@ioc:Adonis/Core/Logger";
import Cache from "@ioc:Kaperskyguru/Adonis-Cache";
export default class ForumsController {

    public async test({}: HttpContextContract) {
    Logger.info("Forums retrieved successfully");
    return {
        hello: "world",
    };
    }

    public async index({ logger }: HttpContextContract) {
    const forums = await Forum.query().preload("user").preload("posts");
    logger.info("Forums retrieved successfully");
    return forums;
    }
    public async indexWithoutCache({}: HttpContextContract) {
    await Cache.flush();
    return await Forum.query().preload("user").preload("posts");
    }

    public async show({ params }: HttpContextContract) {
    try {
        const forum = await Cache.remember(
        "forum_id_" + params.id,
        60,
        async function () {
            return await Forum.find(params.id);
        }
        );
        if (forum) {
        await forum.preload("user");
        await forum.preload("posts");
        Logger.info({ ForumId: params.id }, `Forum retrieved successfully`);
        return forum;
        }
    } catch (error) {
        Logger.error({ err: new Error(error) }, "Get Single Forum");
        console.log(error);
    }
    }

    public async update({ request, params }: HttpContextContract) {
    const forum = await Cache.remember(
        "forum_id_" + params.id,
        60,
        async function () {
        return await Forum.find(params.id);
        }
    );
    Logger.info({ ForumId: params.id }, `Forum retrieved successfully`);
    if (forum) {
        forum.title = request.input("title");
        forum.description = request.input("description");
        if (await forum.save()) {
        await forum.preload("user");
        await forum.preload("posts");
        Logger.info({ ForumId: params.id }, `Forum updated successfully`);
        await Cache.update("forum_id_" + params.id, forum, 60);
        return forum;
        }
        Logger.error({ ForumId: params.id }, `Forum failed to update`);
        return; // 422
    }
    Logger.error({ ForumId: params.id }, `Forum not found`);
    return; // 401
    }

    public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const forum = new Forum();
    forum.title = request.input("title");
    forum.description = request.input("description");
    await user.related("forums").save(forum);
    if (forum) {
        Logger.info({ ForumId: forum.id }, `Forum created successfully`);
        await Cache.set("forum_id_" + forum.id, forum, 60);
        return forum;
    }
    Logger.info({ Forum: forum }, `Forum not created`);
    return;
    }

    public async destroy({ auth, params }: HttpContextContract) {
    const user = await auth.authenticate();
    Logger.info({ UserId: user.id }, `User auth successfully`);
    const forum = await Forum.query()
        .where("user_id", user.id)
        .where("id", params.id)
        .delete();
    Logger.info({ UserID: user.id }, `Forum deleted: ${forum}`);
    await Cache.delete("forum_id_" + params.id);
    return 404;
    }
}
```

In the code above, we have added structured Logging to the controller. The controller logs general information, but specific message and the IDs of when it happens.

Next, open `AuthController.ts` in the same directory and paste in the following code.

```js
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Logger from "@ioc:Adonis/Core/Logger";

export default class AuthController {

    public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
        const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
        });
        Logger.info({ user: auth.user.id }, "User login successfully");
        return token.toJSON();
    } catch (error) {
        Logger.error({ err: new Error(error) }, "User login failed");
        return error.message;
    }
    }

    public async register({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");
    /**
        * Create a new user
        */
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    await user.save();
    Logger.info({ user: user.id }, "User register successfully");
    try {
        const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
        });
        Logger.info({ user: user.id }, "User login successfully");
        return token.toJSON();
    } catch (error) {
        Logger.error({ err: new Error(error) }, "User register failed");
        return error.message;
    }
    }

}
```

We have also added the same logging structure to the `AuthController.ts`.

### Testing the logging system

Now that we have logged every activity on our Forum API. Let’s test to see the detailed information provided when a request comes into our API.

![Preview Logging](/engineering-education/how-to-implement-structured-logging-in-adonisjs/preview_loging.png)

If you noticed, the logs are more structured with useful details such as `request_id`, `user` and `user_id` to specifically identify which User made the request and which Forum was retrieved.

### Conclusion

Structured logging is a lot more beneficial if done right. Internal teams can use logs to identify errors and trace where and who caused a particular error. Structured logging can also be analyzed by different log monitoring services such as LogRocket or Santry.

In this tutorial, you have learned how to implement structured logging and improve the information we receive if something goes wrong with your Adonis projects.

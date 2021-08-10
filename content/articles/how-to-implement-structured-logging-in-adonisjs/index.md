## How to implement Structured Logging in Adonis.js

Structured Logs are essential tools for application developers, especially during the debugging process and analysts monitoring applications. It provides detailed information as to what and where errors might have happened in the production environment.

Typical logs are textual formats that are easily readable by humans but very difficult for machines to read and process.

If your company uses central log management (CLM) tools to investigate log files, or you want to write some algorithms to categorize, index, and search through log files based on specific parameters, typical logs will not work as expected.

That is where structured Logging becomes useful. Structured Logging is a way to record information that is easy for machines to process.

This article will show the best practice in implementing structured Logging in Adonis.js 5, discussing in detail the best ways involved in implementing a scalable logging system in your RESTFUL API.

### Prerequisites

Before proceeding, you are required to have the following:

1. An understanding of TypeScript and Node.js.
2. An [understanding of Adonis.js](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide)
3. Knowldege of building [APIs with Adonis.js](/engineering-education/build-a-restful-api-with-adonisjs/)

### Goal of the tutorial

I will be showing you the best practice in handling structured Logging in Adonis.js. We will continue building our real-world Forum app from our previous [article](/engineering-education/how-to-implement-caching-in-adonisjs-5/) to demonstrate how to boost maintainability in Adonis.js.

In this tutorial, you will learn:

- How to build a highly maintainable app with Adonis.js.
- How to implement structured Logging in Adonis.js Restful API.
- How to choose what to log and how to log it.
- About the concept of structured Logging and how to maintain a large app with it.
- The best practices in building large-scale web apps with Adonis.js.

### What is Structured Logging

In software engineering, Structured Logging can be seen to implement a predetermined and consistent message format for application logs. The format allows the messages to be treated as data that can be monitored, manipulated, and visualized instead of the regular text format.

### How to choose what to log and how to log it.

To implement proper Structured Logging in your project, you need to know what to learn and the different Log Levels to use depending on the nature of the log.

In Adonis.js, we have different log levels to choose from, and below is the list of all the available log levels and when to use which one.

- Trace: The `Logger.trace` is a logging method in Adonis.js 5 used to log traceable messages generated during one or more trace sessions.
- Warning: The `Logger.warn` is used when you have detected an unexpected application problem.
- Notice: The `Logger.notice` is used for logging less verbose messages. It is also used to log the completeness levels of information that should appear to the user.
- Debug: The `Logger.debug` is used for Logging system-generated logs that are sent to your Dashboard along with every new conversation.
- Info: The `Logger.info` is used to record messages about routine application operations.
- Fatal: The `Logger.fatal` is used for logging catastrophic messages about the application. It also shows that the application is about to stop a serious problem or corruption.

With the different log levels available in Adonis.js, you can use any of the log levels to log the appropriate message.

### Concept of Structured Logging

Structured Logging is a timesaver for developers using open-source third-party log analytical tools that support standard log structure. Information stored in Logs can be beneficial in the store using the Structured Logging concept. We can determine the application's health, create dashboards, graphs, charts, and helpful visualization from Logs if they use the Structured Logging principles.

Below are the primary examples of the information needed to be included in structured log messages. Though you can completely customize the type of data to be logged, this serves as a starting point.

- Store the port used in executing the function
- Always store the date and time of the event.
- Store the customer username or ID excuting the function.
- Add a descriptive message of what is happening.
- Optionally, store the Protocol used to execute the function.
- You can also store the location of the triggered event, whether it's from API or running an app
- Store the unique event ID for easy queries.
- Store the type of action triggered using the different log levels.

To implement a proper Structure Logging system, your log data should contain enough information to easily visualize the solution or the reason for the log event.

### Scaffolding an Adonis.js project

Getting started with Adonis.js is easy because of its good documentation. To learn more about the latest Adonis.js 5, reading through [Adonis.js 5 ultimate guide](https://masteringbackend.com/posts/adonisjs-tutorial-the-ultimate-guide) and [building a RESTFUL API with Adonis.js 5](/engineering-education/build-a-restful-api-with-adonisjs/) to get up to speed.

To install Adonis.js 5, run the command below:

```bash
npm init adonis-ts-app@latest forum-api
```

The command creates a new Adonis.js 5 project, properly configured and ready to be used. You can clone the repository and follow the easy setup below. We will continue with the Forum API developed with the article on [How to Implement Caching using Adonis.js 5 tutorial](/engineering-education/how-to-implement-caching-in-adonisjs-5/). You can [clone the repository](https://github.com/Kaperskyguru/adonisjs-forum-api) for an easy setup.

### Setting up existing Forum-API Project

Clone the repository from this link and run the following command to install the required packages and start the development server.

```bash

git clone https://github.com/Kaperskyguru/adonisjs-forum-api

cd adonisjs-forum-api

npm install

npm run dev

```

The commands above should set you up with the project we will be using in this article. Next, continue by installing and setting up Adonis.js Logger.

### Setting up Adonis.js Logger

Adonis.js ships with an [inbuilt logger](https://docs.adonisjs.com/guides/logger) developed on top of one of the fastest logging libraries in Node.js called [Pino](https://github.com/pinojs/pino).

Log messages can cause a throttling effect on the application due to the overtime addition of log messages. Such an effect includes reduced requests per second.

[Pino](https://github.com/pinojs/pino) is a low overhead Node.js logger using minimum resources for Logging and is 5X faster than other alternatives. See the [Benchmarks](https://getpino.io/#/docs/benchmarks) document for comparisons.

You can import and use the Logger directly as follows without having to install any package:

```js
import Logger from "@ioc:Adonis/Core/Logger";

Logger.info("A info message");
Logger.warn("A warning");
```

### Handling Logging in Adonis.js 5

At this point, you should have cloned the Forum API project and correctly test and configure it to work correctly.

We will be using Adonis.js default Logger for all the log operations. Let's look at how to configure the Logger.

Firstly, open `config/app.ts`, and change the value of `generateRequestId` to `true`, allowing Adonis.js to generate a unique request ID to identify each request coming to the Adonis.js server.

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

In the code above, we have added structured Logging to the controller. The controller logs general information using the `Logger.info` method, but specific message and the IDs of when it happens.

Next, we demonstrate how to log with other log levels such as `Logger.error`.

```js

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

```

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

Now that we have logged every activity on our Forum API. Let's test to see the detailed information provided when a request comes into our API.

![Preview Logging](/engineering-education/how-to-implement-structured-logging-in-adonisjs/preview_loging.png)

If you noticed, We have implemented a more structured with useful details such as `request_id`, `user`, and `user_id` to specifically identify which user made the request and which Forum was retrieved.

### Conclusion

Structured Logging is a lot more beneficial if done right. Internal teams can use logs to identify errors and trace where and who caused a particular error. Structured Logging can also be analyzed by different log monitoring services such as LogRocket or Santry.

In this tutorial, you have learned how to implement structured Logging and improve the information we receive if something goes wrong with your Adonis.js projects.

Happy coding!

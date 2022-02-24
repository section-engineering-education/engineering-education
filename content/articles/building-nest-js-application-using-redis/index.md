---
layout: engineering-education
status: publish
published: true
url: /building-nest-js-application-using-redis/
title: Building a Simple Nest.js Application using Redis
description: This tutorial will help readers build a microservice application using Nest.js with Redis as the transporter.
author: joseph-chege
date: 2021-08-02T00:00:00-13:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-nest-js-application-using-redis/hero.jpg
    alt: Building a Nest.js Application Using Redis
---
Nest.js is a JavaScript framework used for building efficient, scalable, and static server-side applications. Nest.js is built on top of React for better rendering and abstraction. This enables you to build powerful React applications. 
<!--more-->
Nest.js allows you to build React applications that support server-side rendering. Traditionally with React, you can only render on the client-side which impacts SEO negatively.

With server-side rendering, pages are rendered during the build-up phase. The content is then served ahead of time to the user or search engine bots. 

### Goal
This tutorial will show you how to build a Nest.js microservice application that uses Redis as a message transporter.

### An overview of a microservice
A microservice is an architectural design that allows one to create small modules/components of an application that can scale on demand. Each component is packaged independently and can communicate and interact with each other through APIs. 

Nest.js comes with in-built support for microservice architecture and multiple transport layers. These transport layers are in charge of transferring messages between microservice instances. 

We can use [Redis](https://redis.io/) as a transport layer protocol for end-to-end connectivity. Redis allows flow control and segmentation between different microservices. As a result, each microservice can connect to different channels, and every channel can have various microservices connected to it. 

Let's now build a Nest.js microservice application using Redis as the transporter.

### Prerequisites
- We are going to bundle `Nest.js CLI` using a [Node.js](https://nodejs.org/en/) package. Therefore, ensure that you have Node.js installed to have NPM on your computer. The Node.js installer can be downloaded from [here](https://nodejs.org/en/).

- Nest.js is bundled and backed by Typescript. So a basic knowledge of [Typescript](https://www.typescriptlang.org/) is required.

- To implement a microservice architecture, we are going to use [Redis](https://redis.io/) as the transporter. So make sure Redis is installed on your computer.

Let's get started.

### Step 1: Setting the application environment
We will begin by installing the `Nest.js CLI` using the Node.js package manager. 

The `Nest CLI` is a command-line GUI framework that aids you in configuring, creating, and maintaining your Nest.js applications. This helps with several activities including scaffolding a Nest.js project, serving it in a development context, as well as creating and packaging the production application. 

The following command will help us install `Nest CLI` globally:

```bash
npm i -g @nestjs/cli
```

Now that we have Nest.js CLI ready, we can go ahead to create a Nest.js application template. 

Here is a command to set that up:

```bash
nest new nest-ms
```

We need to turn our newly created project into a `monorepo`. A `monorepo` refers to a single repository hosting different microservices. 

Change directory to `nest-ms`. 

To generate the `monorepo` in the app, we run the following command inside the `nest-ms` folder:

```bash
nest generate app new_app
```

After running the command above, you will observe that an `apps` folder will be created. This will scaffold our project and generate `controllers`, `providers`, and `services` for a Nest.js project.

### Step 2: Adding microservices and Redis packages
Install the `microservices` and `redis` packages using the following NPM command:

```bash
npm install @nestjs/microservices redis
```

- `@nestjs/microservices` - It will allow you to set various configurations for our microservice.

- `redis` - It will help connect with `redis` currently installed locally.

### Step 3: Adding transporter configurations
We will add the configuration for the transporter as follows:

First, navigate to the `new_app` that you generated with the `nest generate app` command. 

Then go to `apps/new-app/src/main.ts` and replace the `main.ts` with the lines of code shown below:

```js
import { NestFactory } from '@nestjs/core';
import { NewAppModule } from './new-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NewAppModule, {
    transport: Transport.REDIS, //setting transporter
    options: {
      url: 'redis://localhost:6379',
    },
  });
  await app.listen();
}
bootstrap();
```

In the code above, we are creating a microservice and setting the transporter as `Redis`.

### Step 4: Adding client service configurations
In the `apps/nest-ms/src/app.service.ts` file, add the following code:

```js
import { Injectable } from '@nestjs/common';
import {
  Transport,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
```

In the code above, we are setting up the client with a Proxy Factory and using `redis` as the transporter.

### Step 5: Running and testing the application
We use the following command to initiate the `Redis` server:

```bash
sudo systemctl start redis
```

We can start the application by executing the following command from the project's root directory:

```bash
npm start
```

We then open another terminal and run the command below:

```bash
npm start new-app
```

In your browser, navigate to `http://localhost:3000`. 

The content of the page should be nearly identical to the image below.

![page-content](/engineering-education/building-nest-js-application-using-redis/page-content.png)

### Conclusion
You now have a Nest.js microservice application that uses Redis as a transporter. You can utilize the knowledge and skills gained from this tutorial to craft other powerful applications.

Happy coding!!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
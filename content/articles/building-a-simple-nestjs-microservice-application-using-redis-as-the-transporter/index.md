Nest.js is a JavaScript framework for building efficient and scalable hybrid static and server-side applications. Nest.js is built on top of React to abstracts rendering complexity, giving you the flexibility to build scalable React applications. This hybrid enables your React apps to have additional functionality, such as server-side rendering. The Nest.js framework will allow you to build a react app but render the content in advance on the server-side. Traditional with React, you can only render on the client-side. Nest.js gives you the flexibility to choose which data fetching strategy fits your application as you grow and scale your application from a few pages to thousands. With server-side rendering, pages are rendered during the build-up phase. The content is served ahead of time to user or search engine bots. This way, they will only receive the fully rendered HTML. After receiving this initial page, client-side rendering takes over and works just like a traditional React app. This tutorial will teach you how to create a Nest.js Microservice application with Redis.

### An Overview of a microservice

Microservice is an architectural design that allows you to create small modules/components of an application that can scale on demand. Each component is packaged independently and can communicate with each other via APIs. Nest.js comes with built-in support for microservice architecture and multiple transport layers. These transport layers are in charge of transferring messages between microservice instances. We can use Redis as a transport layer protocol for end-to-end connectivity to allow flow control and segmentation between different microservices. As a result, every microservice can connect to different channels, and every channel can have various microservices connected to it. Let’s now build a Nest.js microservice application using Redis as the transporter.

### Prerequisites

To follow along with this guide, the following prerequisites will be essential;

- We are going to buddle Nest.js CLI using a Node.js package. Ensure you have Node.js installed so that you can have NPM on your computer. You can download the Node.js installer here.
- Nest.js is buddled and backed with Typescript. So basic knowledge of Typescript will be essential.
- To implement a microservice architecture, we are going to use Redis as the transporter. Make sure Redis is installed on your computer.

To build a Nest.js microservice, follow the below steps;

### Step1: Setting the application environments

We will begin by installing the Nest.js CLI using the Node.js package manager. The Nest CLI is a command-line GUI framework that guides you in setting up, developing, and maintaining your Nest.js apps. It helps with many tasks, such as scaffolding a project, serving it in development mode, building and bundling the application for production distribution. The following command will help us install it globally and ready to interact with Nest.js

```bash
npm i -g @nestjs/cli
```

Now that we have Nest CLI ready, we can go ahead to build and create a Nest.js application template. Here is a command to set that up.

```bash
nest new nest-ms
```

We need to turn our newly created project into a monorepo. A monorepo refers to a single repository hosting different microservices. To generate the monorepo in the app, we run the following command.

```bash
nest generate app new_app
```

After running the above command, you will observe that have an `apps` folder will get created. This will scaffold up our project and generate controllers and providers, and services for a Nest.js project set up.

### Step2: Adding microservices and Redis packages

Install the above packages using the following NPM command.

```bash
npm install @nestjs/microservices redis
```

- `@nestjs/microservices` - Will provide the essentials to set various configurations for our microservice.

- `redis` - Will help connect with the `redis` currently installed on your local computer.

### Step3: Adding transporter configurations

We will add the configuration for the transporter as follows:
First, navigate to the `new_app` that you generated with the `nest generate app`. Then go to `apps/new-app/src/main.ts` and replace the `main.ts` with the following lines of code.

```js
import { NestFactory } from '@nestjs/core';
import { NewAppModule } from './new-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NewAppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });
  await app.listen();
}
bootstrap();
```

From above, we are creating a microservice and setting the transporter as `Redis`.

### Step4: Adding client service configurations

In the `apps/nest-ms/src/app.service.ts`:

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

From above, we are setting up the client with a Proxy Factory of `redis` as the transporter.

### Step5: Testing

Everything is now set, and we can start the server by running the following commands from the project's root directory.

```bash
npm start
```

on one terminal, open another, and run;

```bash
npm start new-app
```

In your browser, go to `http://localhost:3000`. The content of the page should be nearly identical to the image below. If it isn't, go back over the steps we just covered.

![page-content](/engineering-education/building-a-simple-nestjs-microservice-application-using-redis-as-the-transporter/page-content.png)

### Conclusion

And that it is all you have a Nest.js microservice application that uses Redis as a transporter.

Happy coding!!
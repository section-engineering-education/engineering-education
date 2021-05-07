Typescript is a superset of JavaScript with additional features such as static types checking. Typescript is gaining a lot of popularity among JavaScript developers. It is one of the fast-developing programming languages for building extensive applications.

According to the stack overflows survey, it ranks as the seventh most popular language. Stack overflow survey also indicated that Typescript is the second most loved language with 61.7% votes. Just above popular languages such as Django and Kotlin, JavaScript, SQL, etc. Popular apps such as Slack are on the Typescript. Just like JavaScript, it supports numerous frameworks such as Node.js.

### Goal

The main advantage of using both Typescript and Node.js together is to take the full benefits that this two have. Typescript is well known for supporting Static Typing to detect code errors during typing. It helps you catch errors at an early stage of development, creating a faster application development pipeline, unlike Node.js (JavaScript), where you only detect errors during the application runtime. Typescript is a good choice when building extensive applications.

On the side, node.js is well known for its diverse open-source libraries, multi-threading ability, Asynchronous, and Event-Driven code execution, being fast and light, etc.

Check out these two guides and learn more about the popularity two.

- [Why is Node.js wildly popular among developers?](/engineering-education/typescript-static-typing/)
- [Why Static Typing & Why is Typescript so popular?](/engineering-education/why-node-js-is-popular/)

This article will explain how to use Typescript with Node.js Framework. We'll create a simple REST API using Typescript and  Node.js libraries to demonstrate this. The API implements some common web-based API methods such as GET, POST, DELETE, PUT, AND PATCH. We will use a post-application. The application will consume a [Free mock-up API](https://jsonplaceholder.typicode.com/posts) hosted in this [JSON placeholder server](https://jsonplaceholder.typicode.com/).

### Prerequisites

- Ensure that you have [Node.js](https://nodejs.org/en/) and [Postman](https://www.postman.com/) installed on your computer.
- Essential experience of how to write and execute [Typescript](/engineering-education/a-friendly-beginner-guide-to-typescript/).
- Be familiar with [Node.js](/engineering-education/history-of-nodejs/) and how to use libraries such as [Express.js](/engineering-education/express/).
- Be familiar with how to [test APIs using Postman](https://www.youtube.com/watch?v=KFuaybrXCdw), (a tool for interacting with web-based APIs).

### Installing Typescript

Unlike JavaScript, Typescript doesn't run directly on the browser. To execute any Typescript written code, you need a typescript compiler. This will compile Typescript into JavaScript. This way, it will be easier to executed and run the typescripts on a browser. Since we are using Node.js, we will install Typescript from NPM using the command below.

```bash
npm install -g Typescript
```

Adding the `–g` flag to install the packages globally. That way, Typescript is available to any Node.js project.

### Step by step guide

#### Step 1: Initialize Node.js

To start a Node.js project, create a project folder and run `npm init`. Follow the prompts. This will create a `package.json` file that will save any installed dependencies for your project. Alternatively, run `npm init -y` to auto-generate the `package.json` file.

#### Step 2: Install project dependencies
In this application, we are going to use the following Node.js libraries.

- **TypeScript**: TypeScript compiler with static set type definitions.
- **Express**: Node.js web application framework for setting and managing web-based server.
- **@types/express**: Type definitions for Express
- **Morgan**: A Node.js HTTP request logger middleware for Node.js.
- **@types/morgan**: Type definitions for morgan.
- **Axios**: A Node.js promise-based HTTP client library for Node.js for sending HTTP requests to query and consume resources from APIs.
- **@types/Axios**: Type definitions for Axios.
- **Nodemon**: A server utility library for monitoring changes of the code on a text editor. It automatically restarts the server whenever code changes are detected.

To install all these libraries, run the following command.

```bash
npm install typescript express @types/express morgan @types/morgan axios @types/axios nodemon
```

#### Step 3: Initialize Typescript

To execute Typescript with Node.js, you need the `tsconfig.json` file. This file sets all the environments requires to run Typescript. You can create the file manually or run `tsc --init` to auto-create one.

Check [this documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) to learn more about the `tsconfig.json`.

#### Step 4: Setting up the tsconfig.json

```json
{
    "compilerOptions": {
        "forceConsistentCasingInFileNames": true,
        "module": "commonjs",
        "esModuleInterop": true,
        "outDir": "./build",
        "rootDir": "./source",
        "target": "es6",
        "skipLibCheck": true,
        "strict": true
    }
}
```

#### Step 5: Modify package.json

Head over to your project `package.json` file and modify `main` and `scripts` with the following values.

```json
"main": "source/server.ts",
"scripts": {
    "dev": "nodemon source/server.ts",
    "build": "rm -rf build/ && prettier --write source/ && tsc"
}
```

This will set up the command for building and compiling the `.ts` file to the `.js` file. In this case, we can then start the development server using the command `npm run dev`.

#### Step 6: Setting up the application structure

Your project files and subfolders should be set up as shown below.

```bash
|   package-lock.json
|   package.json
|   tsconfig.json
\---source
    |   server.ts
    \---controllers
    |       posts.ts
    \---routes
            posts.ts
```

Create the source inside your project directory. The source folder will include all the `.ts` files the application needs to run, as explained earlier.

**Setting up controllers**

Create the controllers' folder, in it have the posts.ts file. The file will handle all the logic, i.e., getting posts, getting a single post, updating a post, deleting a post, and creating a post.

```ts
/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// getting all posts

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;

    return res.status(200).json({
        message: posts
    });
};

// getting a single post

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;

    return res.status(200).json({
        message: post
    });
};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // return response
    return res.status(200).json({
        message: response.data
    });
};

// adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

export default { getPosts, getPost, updatePost, deletePost, addPost };
```

**Adding routes**

Create the routes folder, in it have the posts.ts file. The file connects routes to their controllers.

```ts
/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
const router = express.Router();

router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts', controller.addPost);

export = router;
```

**Setting the server**

The server.ts file is responsible for setting up the server. This involves express middlewares, the routes, and also starting the server.

```ts
/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use('/', routes);
/** Error handling */

router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3030;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
```

#### Step 6: Starting the development server

Start the development server by running:

```bash
npm run dev
```

#### Step 7: Testing the API with Postman

1. **Fetch all posts**

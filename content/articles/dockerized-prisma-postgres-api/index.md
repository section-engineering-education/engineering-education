---
layout: engineering-education
status: publish
published: true
url: /dockerized-prisma-postgres-api/
title: Introduction to Prisma with Docker
description: In this article we will introduce Primsa. We will learn what Prisma is, how to work with it, and deploy it on a docker container.
author: faith-musyoka
date: 2022-03-09T00:00:00-10:50
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/dockerized-prisma-postgres-api/hero.jpg
   alt: Introduction to Prisma
---
In this tutorial, we will learn more about the Prisma ecosystem. We will build a simple server that accesses Prisma to read its database schema and run it on a Docker container.
<!--more-->
At some point, you may need a database for your back-end application, be it with Python, Java, or Node.js. For the backend to communicate with the database, you need a way to connect your server to that database.

When a user sends a request to the write into the database, the server modifies that data and writes it to the database. When someone writes a query requesting the data, the server reads it, sends it to the database, and then returns a response with the requested data. This is opposed to just reading from one of our static arrays.

Now, to connect to that database, you can use native drivers. Native divers are libraries that allow you to connect to a database. For example, when working with Node.js as the backend and MySQL as the database, you can choose to use a [MySQL native driver](https://www.npmjs.com/package/mysql-native) provided by the Node.js NPM.

However, they do not provide a way to modify or validate the data structures or a way to model the relationships between the databases. This means that you can't model your data relations, seed, or migrate them.

With native drivers, the database connection is natively implemented using the barebones of the programming language.

Other options would be to use an [ORM](https://en.wikipedia.org/wiki/Object–relational_mapping) (object-relational mapper). For example, when working with Node.js, MongoDB provide a mongoose (an NPM library) database driver. This makes it easier for a developer to connect a Node.js backend to a MongoDB database.

ORM will introduce you to some new features like:
- Modeling
- Validating
- Migrating data
- Describing the relationships between different data fields, and so on.

If you are using a SQL database, you can model your schema and choose the fields you want to use. You can validate your data model, say, a password field needs to have at least six characters, a certain field needs to be integers, and so on.

[Prisma](https://www.prisma.io) falls under the category of an ORM, and it has all features of a typical ORM, such as [mongoose](https://mongoosejs.com) and [sequelize](https://sequelize.org). Unlike the other ORMs, Prisma comes with a tone of other added features.

Prisma is database agnostic. `Mongoose` only works on a MongoDB database, and `sequelize` only works on SQL-based databases. Let's say if you decide to switch from MongoDB to PostgreSQL, then you would have to rewrite most of your code since the two libraries work differently. But, with Prisma, rewriting code is not necessary.

Prisma has [supports for a majority of databases](https://www.prisma.io/docs/reference/database-reference/supported-databases) like PostgreSQL, MySQL, MongoDB, MariaDB, and so on. Thus, you can choose a database that fits your application structure. You can also migrate databases using Prisma without having to modify the application's code structure.

### Table of contents
- [Prerequisites](#prerequisites)
- [Major components of Prisma](#major-components-of-prisma)
  - [Prisma migrate](#prisma-migrate)
  - [Prisma client](#prisma-client)
  - [Prisma studio](#prisma-studio)
- [Setting up](#setting-up)
- [Setting and understanding the Prisma client data models](#setting-and-understanding-the-prisma-client-data-models)
- [Modeling Schemas](#modeling-schemas)
- [Create and Run a Prisma server with Docker](#create-and-run-a-prisma-server-with-docker)
  - [Set the schema](#set-the-schema)
  - [Set up a Node.js TypeScript environment](#set-up-a-nodejs-typescript-environment)
  - [Set up a TypeScript Prisma server](#set-up-a-typescript-prisma-server)
- [Run the Prisma server with Docker and Docker-compose](#run-the-prisma-server-with-docker-and-docker-compose)
  - [Testing the Docker API](#testing-the-docker-api)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
Prisma facilitates the generation of type-safe database schemas. When creating a database, every detail must be carefully considered to determine the database's structure.

In this case, Prisma abstracts you from writing SQL queries. As a result, you must ensure that your database schemas are safe.

- To have these safe schemas, ensure you have Prisma installed in your text editor to help you write type-safe Prisma codes.
- In this tutorial, we will use [Visual Studio Code](https://code.visualstudio.com/). Once you have it installed, ensure you have the [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. This extension adds syntax highlighting for `.prisma` files. It helps prevent errors by establishing a robust and type-safe code that is specifically designed for Prisma programs.
- Prisma provides a [Prisma studio](https://www.prisma.io/studio) that allows you to interact with `.prisma` files. Ensure you have it installed on your computer. Also, ensure Node.js (at least 64 bits) is installed.
- This guide also runs Prisma using Docker. Make sure that you have [Docker](https://www.docker.com/products/docker-desktop) installed on your computer and have some basic knowledge of running and using Docker. This [guide](/engineering-education/docker-concepts/) will help you get started with Docker.

### Major components of Prisma
The Prisma ecosystem is made up of three major components. These are:

#### Prisma migrate
Prisma `migrate` acts as the database version control. Migration is a way to control the previous versions of the database schema. This works similar to Git, where you always have a history of the code versions.

Whenever you change the database schema, Prisma's migrate creates a new version of the newly added schema. This way, whenever you have an issue with your current running schema, you can always check and roll back to the previous stable database schema.

#### Prisma client
Provide a way to write/type-safe the query builder. Prisma abstracts you from writing the SQL queries. Prisma client will help set up and write your database, model the data validation, describe the relationships between different data fields, and so on.

Prisma client provides a very simple and intuitive method to set this up without having to write a single SQL query. Prisma client enables you to generate SQL queries and helps connect to the database of your choice.

Prisma client also generates and provides functions or methods which can be used to create a stateful connection to a database. We can then use it to create, delete, update, or do an operation related to the database.

#### Prisma studio
This is a modern database GUI to interact with your data. It gives you a visual representation of how the schema is represented in a `.prisma` file. Usually, you always tend to have trouble connecting or checking your tables or databases.

If you have difficulties verifying the tables via the CLI commands, you tend to use something like [PHPMyAdmin](https://www.phpmyadmin.net) to visualize the data in your database.

Prisma studio provides the same feature with a minimal UI that lets you see all the tables in your database. Here, you can check the models and the type of data set in your database. You can delete records, add records, and perform any operation - only with the UI.

### Setting up
Let's jump in and see what Prisma can achieve.

Create a project folder `prisma-client-app` and open it using the VSCode editor. Initialize Node.js using `npm init -y`. Then, start by installing the Prisma CLI and the Prisma client using the following command:

```bash
npm install prisma @prisma/client
```

The next step is to initialize your Prisma project using the following command:

```bash
prisma init
```

The Prisma engines for Node-API will be downloaded, and a Prisma folder with a `schema.prisma` file will be created. This is where you begin configuring the Prisma client, the database you wish to utilize, model the database (schema development), and decide the data relationship.

Let's break this file down.

### Setting and understanding the Prisma client data models
In general, the schema language is very intuitive with easy-to-understand syntax. When you start your Prisma project, two primary blocks will be created:

#### 'generator'
This determines the assets to be created when building the data types that generate the actual database queries. By default, it is set as:

```js
generator client {
  provider = "prisma-client-js"
}
```

#### 'datasource'
This defines how Prisma connects to your database. This takes two main parameters:
- `provider`
- `url`

The `provider` sets the database you want to use. This can be the `sqlite`, `mysql`, `mongodb`, `postgresql` and `sqlserver`.

`url` sets a connection string used to connect with the database server. If the database is running locally, you add the localhost server that provides the connection to the database you want to use.

By default, Prisma bootstraps the PostgreSQL database. It creates an `env` file that lets you add your `DATABASE_URL` based on the server running the database:

```js
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

For example, if you are using the SQLite (file-based SQL database), this is how you would set up your `datasource`:

```js
datasource sqliteDb {
  provider = "sqlite"
  url = "file:./app.db"
}
```

`provider` indicates the database you are using, and the `url` sets the file path for the local SQLite database. The connection URL of the SQLite connector points to a file on your file system.

> Note: You can only have one data source block in a single `prisma.schema`. Also, the `datasource sqliteDb` is convention. You can give your datasource any name like `data source = "myDb"`.

Check out this [database connectors guide](https://www.prisma.io/docs/concepts/database-connectors) to see all the Prisma-supported databases.

### Modeling schemas
Models represent the entities of your application domains. A model maps to a table on your database. You can have different models that define the relationship between different tables. 

Although the models might look the same, the differences can be seen when setting up the data types associated with different entities.

Let's jump in and see how to model and represent entities in a PostgreSQL database. This will be implemented in the `schema.prisma` file as shown:

```js
model Todo {
  id Int @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  title String
  description String?
  completed Boolean @default(false)
}
```

This model represents a single database table. When this model is executed, it will create a table `Todo` and add each of the above as the table field.

In general, each field has a name and a data type. For example, the field `title` is assigned a data type `String` from the above `Todo` model. You can choose various data types, such as `Int`, `String`, `Boolean`, etc.

Each field in a table is associated with its own properties. In a typical table, you will have an `id` as a unique value (primary key) that uniquely identifies each value.

- `@id` is the primary key for the table `Todo`.
- The primary key can be created by default by adding the parameter `@default()` to `id`. By doing this, the count will automatically be incremented whenever a new record is created.
- `createdAt` and `updatedAt` hold the current time.
- `completed` takes a `Boolean` data type with `false` as the default value.
- The field `description` has a `?` towards the end of type `String`. It signifies that the parameter `?` is added to a field and is set as `NULL` by default, when creating a new record.

> Note: You can add schemas relations to your data models. When dealing with SQL-based databases. There are chances of having multiple tables. You can relate multiple tables with models in Prisma.

Check this guide and learn how to create [data models with schema relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations).

### Create and run a prisma server with docker
Once you create your data models, you will create a server that lets you interact with your database. Prisma will connect your data models to your preferred database schemas. Then, an API will consume the data that you save to the database. 

Let's create a basic TypeScript API that uses Prisma to connect to a PostgreSQL.

In this case, you will wrap the whole application and run it using the [Docker containers](/engineering-education/getting-started-with-docker/).

If you're new to Docker, it is highly recommended to go through these articles before proceeding further:
- [Docker concepts](/engineering-education/docker-concepts/)
- [How Docker containers work](/engineering-education/running-and-managing-docker/).

To create Prisma servers, check out [this guide](/engineering-education/api-with-prisma-and-nodejs/) to learn how to create one from scratch.

#### Set the schema
Now we can create a project folder named `dockerized-prisma-postgres-api` and run `prisma init`.

As explained earlier, the main building block of a Prisma API is to configure the `schema.prisma` file. Here, you will use the PostgreSQL database as the data source provider.

Therefore, your `schema.prisma` file generator and data source should resemble the following code block:

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

The `url` sets a connection string of your database server. In this case, Prisma is reading this string from the `.env` file.

If the PostgreSQL database runs locally, you add the localhost server that provides the connection to PostgreSQL. For example, `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/TEST_DB?schema=public"`.

However, if you want to run PostgreSQL with Docker, then the `localhost` alias will not work. In this case, your `url` will be `DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"`, where alias `postgres` will be the container name that runs a PostgreSQL image within Docker.

To run in Docker, your `.env` file should have a connection string as shown below:

```.env
# use this DATABASE_URL for running PostgreSQL on Docker compose
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"

# for local development use this url in the .env file
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/TEST_DB?schema=public"
```

Add your previously created data model to your `schema.prisma` file:

```js
model Todo {
  id Int @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  title String
  description String?
  completed Boolean @default(false)
}
```

#### Set up a Node.js TypeScript environment
Let's now dive in and configure a basic Prisma and PostgreSQL API.

You will need to install the necessary packages that will allow you to run TypeScript code and create a web server. Go ahead and install the following packages:

- `typescript` - This package allows you to write [TypeScript](https://www.npmjs.com/package/typescript) code in a Node.js application. It adds static typing, type checking, and other features that help you scale-up large-scale JavaScript applications.

To install it, run:

```bash
npm install -D typescript --save-dev
```

- `prisma` - A [Prisma CLI](https://www.npmjs.com/package/prisma) that allows you to write type-safe queries for your Prisma applications.

To install it, run:

```bash
npm install prisma --save-dev
```

- `ts-node` - [Ts-node](https://www.npmjs.com/package/ts-node) allows you to build and execute any TypeScript code that you write.

To install it, run:

```bash
npm install -D ts-node --save-dev
```

- `@types/node` - [Types/node](https://www.npmjs.com/package/@types/node) allows you to add type definitions for Node.js while running the TypeScript code.

To install it, run:

```bash
npm install --save-dev @types/node
```

- `@prisma/client` - [Prisma/client](https://www.npmjs.com/package/@prisma/client) is a Prisma ecosystem tool that helps you have type-safe database data access, data modeling, etc.
- `express` - [Express](https://www.npmjs.com/package/express) is a scalable Node.js library that helps you create minimalist web-based APIs.
- `@types/express` - [Types/express](https://www.npmjs.com/package/@types/express) adds TypeScript type definitions for Express.

To install these dependencies, run:

```bash
npm install express @types/express @prisma/client
```

Since you are using TypeScript, run `tsc --init` to automatically create a `tsconfig.json` file that holds the default parameters when running TypeScript code.

#### Set up a TypeScript Prisma server
Create an `index.ts` file at the root directory and start creating your Prisma API, as shown below:

- Import `express` and `PrismaClient`.

```ts
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
```

- Add `express` and `PrismaClient` middlewares along with the server port number.

```ts
const app: Application = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = 3000;
```

- Add a basic `GET` route to test the server.

```ts
// testing route
app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${port}`);
});
```

- Add a route for a `GET` route when fetching todos.

```ts
// Getting todos route
app.get('/api/todos', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.todo.findMany();
        return res.json({
            success: true,
            data: allUsers
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});
```

- Add a route for a `POST` route for adding todos.

```ts
// Adding todo route
app.post('/api/todos', async (req: Request, res: Response) => {
    try {
        const { title, description, completed } = req.body;
        const newTodo = await prisma.todo.create({
            data: {
                title,
                description,
                completed
            }
        });
        return res.json({
            success: true,
            data: newTodo
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});
```

- Add a `listen()` method to execute the server on the set port number.

```ts
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
```

To run the server, use the `ts-node`, add a `ts-node` command to the `package.json` file as shown:

```bash
"scripts": {
    "start": "ts-node index.ts"
},
```

Your basic server is ready. Let's now wrap the whole API within Docker.

### Run the Prisma server with Docker and Docker-compose
Create Docker file environments. This allows you to set the command necessary to run your code on a Docker container.

Go ahead and create a `Dockerfile` at your project's root. This file will have the following commands:

- Add the Node.js Docker image.

```dockerfile
FROM node:alpine
```

- Create a directory that runs the app on Docker.

```dockerfile
WORKDIR /app
```

- Add a `COPY` command to copy the project files to the Docker `/app` directory.

```dockerfile
# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .
```

- Install `package.json` dependencies.

```dockerfile
RUN npm install
```

- Generate Prisma client.

```dockerfile
RUN npx prisma generate
```

- Run and expose the server on Docker.

```dockerfile
# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start
```

While running the `COPY` command, there are some files and folders that you don't want to copy over to Docker's working directory. Thus, you need to create a `.dockerignore` file that contains the list of these files and folder that are to be excluded as shown:

```bash
node_modules
```

Now, you have the configurations ready and set within Docker. To spin up everything together, including the PostgreSQL database and the whole Prisma server, create a `docker-compose.yml` at the root of your project. Then, add the following Docker services:

```yml
version: "3.9"
services:
  postgres:
    image: postgres:latest
    container_name: postgres
    hostname: postgres
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: Todo
    volumes:
      - postgres-data:/var/lib/postgresql/data
    restart: unless-stopped

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    depends_on:
      - postgres
    ports:
      - "5555:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: pgadmin4@pgadmin.org
      PGADMIN_DEFAULT_PASSWORD: admin
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    restart: unless-stopped

  prisma-postgres-api:
    stdin_open: true
    build:
      context: .
      dockerfile: Dockerfile
    container_name: prisma-postgres-api
    depends_on:
      - postgres
    ports:
      - "3000:3000"
    restart: always

volumes:
  postgres-data:
  pgadmin-data:
```

This will run three services:
- `postgres` - to execute and run the Postgres database container on port `5432`. To access the database, set the environment as `POSTGRES_USER: postgres`, `POSTGRES_PASSWORD: postgres`, and `POSTGRES_DB: Todo`.
- `pgadmin` - Pgadmin will help you have a visual representation of the Postgres database. It has an interactive UI that lets you see the data that you manipulate. Prisma automatically sets this database and table.
- `prisma-postgres-api` - this service runs the Prisma API that you have just created. It will access the Postgres service, run the Prisma schema and populate our data models to the database.

Everything is set. Now, let's run the app and let Docker containerize the application instance so that you don't need to configure anything on your local computer.

To run this on Docker, ensure your Docker is running and execute this command:

```bash
docker-compose up
```

This command will run all the commands specified in the Docker file, pull the images for the set services, and wrap everything within a single container.

Once the whole process is done, Docker will run the start command and run the API within the set container.

![running-api](/engineering-education/dockerized-prisma-postgres-api/running-api.png)

If you make some changes to the project files, run `docker-compose build` then re-run the `docker-compose up` command.

#### Testing the Docker API
The app is running on Docker containers. Let's test if it works as expected.

Navigate to your Docker and check your running `dockerized-prisma-postgres-api` container:

![prisma-postgres-api](/engineering-education/dockerized-prisma-postgres-api/prisma-postgres-api.png)

Then, hover over the `prisma-postgres-api` and open the integrated Docker API.

![api-cli](/engineering-education/dockerized-prisma-postgres-api/api-cli.png)

This will launch an interactive CLI to run your API commands. In this case, you want to run the `prisma migrate` command. This will allow your database to sync with the schema you have created.

Go ahead and run `npx prisma migrate dev` inside the interactive Docker CLI as shown:

![docker-api](/engineering-education/dockerized-prisma-postgres-api/docker-cli.png)

Let's now test the dockerized API.

To do this, first, access the Postgres database using the `pgadmin` interface. This will let you see the data that you add to your database server.

Open `http://localhost:5555/` on your browser. Then, log in using the username `pgadmin4@pgadmin.org` and password `pgadmin`, as we set them in the `dockercompose.yml` file.

Open Postman and start testing the API endpoints. Start by running the test `GET` route `http://localhost:3000`.

![test-route](/engineering-education/dockerized-prisma-postgres-api/test-route.png)

Test if the dockerized `POST` route is working using the route `http://localhost:3000/api/todos` as shown below:

![post-api](/engineering-education/dockerized-prisma-postgres-api/post-api.png)

Here, is the sample input data:

```json
{
  "title": "Testing Dockerized Prisma API",
  "description": "a simple server that accesses Prisma to read its database schema a Docker container",
  "completed": false
}
```

Once you hit the send button, a new todo will be created, and the below response will be recorded on Postman:

![post-response](/engineering-education/dockerized-prisma-postgres-api/post-response.png)

Finally, you can check this new todo using the GET `http://localhost:3000/api/todos`, as shown below:

![post-api](/engineering-education/dockerized-prisma-postgres-api/post-api.png)

If you get stuck, check the whole source code on [GitHub](https://github.com/Faithdroid/create-and-run-a-prisma-server-with-docker-containers).

### Conclusion
This guide helped you learn about Prisma. In this tutorial, you created a basic API using the PostgreSQL database and ran it via Docker containers.

Docker has enabled us to create the whole API without configuring PostgreSQL and Node.js on the local computer.

Happy coding!

### Further reading
- [Using Prisma with Postgres and Node.js](/engineering-education/api-with-prisma-and-nodejs/)
- [How to set up a Prisma Client-Server That Uses MongoDB](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb/)
- [Getting Started with Docker](/engineering-education/getting-started-with-docker/)
- [Understanding Docker Concepts](/engineering-education/docker-concepts/)
- [Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)
- [Why is Docker so Popular](/engineering-education/why-is-docker-so-popular/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s)
At some point, you will need a database for your back-end application, be it with Python, Java, Node.js, etc. This is where a connection to the database is needed. For the backed to communicate with the database of your choice, you need a way to connect your server to that database. So when someone sends a request to the server, the server modifies that data and writes it to the database. When someone writes a query requesting data, the server reads that query, sends it to the database, and then sends a response to the user. This is opposed to just reading from one of our static arrays.

Now to connect to that database, you can use native drivers. Native divers are mainly libraries that allow you to connect to a database. For example, when working with Node.js and a MySQL database, you can choose to use a MySQL native drive provided by the Node.js NPM.

However, they do not provide a way to modify or validate the data structures or a way to model the relationships between the databases. This means you can't model your data relations, seed, or migrate it. With native drivers, the database connection is natively implemented using the barebones of the programming language being used.

Other options would be to use ORM (object-relational mapping). For example, when working with Node.js, MongoDB provide a mongoose (an NPM library) database driver. This makes it easy for a developer to connect a Node.js back-end to a MongoDB database.

ORM will introduce you to some new features. This includes modelling, validating, migrating data, describing the relationships between different data fields, etc. For example, if you are using an SQL database, you can model your schema and the fields you want to use.

You can validate your data model, for example, by saying a password field needs to have at least six characters, a certain field needs to be integers, etc. Manipulating this data model becomes easier as you can add and remove fields as the data structure changes over time.

Prisma falls under the category of an ORM, and it has all features of a typical ORM, such as mongoose and sequelize. Unlike the other ORM, Prisma comes with a tone of other added features. Prisma is database agnostic. Mongoose only works on a MongoDB database, and sequelize only works on SQL-based databases. If you decide to switch from MongoDB to PostgreSQL, you have to rewrite most of your applications since the two libraries are so different. You don't have to do that with Prisma.

Prisma has [supports for major database](https://www.prisma.io/docs/reference/database-reference/supported-databases) such as PostgreSQL, MySQL, MongoDB, MariaDB and etc. Thus you can choose a database that fits your application structure. You can also migrate databases using Prisma without modifying your application's code structure.

This tutorial will learn more about the Prisma ecosystem and build a simple server that accesses Prisma to read its database schema and then run it on a Docker container.

### Table of contents

- [Table of contents](#table-of-contents)
- [Pre-requisities](#pre-requisities)
- [The main components of Prisma](#the-main-components-of-prisma)
  - [Prisma migrate](#prisma-migrate)
  - [Prisma client](#prisma-client)
  - [Prisma studio](#prisma-studio)
- [Setting up your first Prisma project](#setting-up-your-first-prisma-project)
- [Setting and understanding the Prisma client data models](#setting-and-understanding-the-prisma-client-data-models)
- [Modeling Schemas](#modeling-schemas)
- [Create and Run a Prisma server with Docker](#create-and-run-a-prisma-server-with-docker)
  - [Set the schema](#set-the-schema)
  - [Set up a Node.js Typescript environment](#set-up-a-nodejs-typescript-environment)
  - [Set up a Typescript Prisma server](#set-up-a-typescript-prisma-server)
- [Run the Prisma server with Docker and Docker-compose](#run-the-prisma-server-with-docker-and-docker-compose)
  - [Testing the Docker API](#testing-the-docker-api)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)
### Pre-requisities

Prisma facilitates the generation of type-safe database schemas. When creating a database, every detail must be carefully considered in order to determine the database's structure. In this case, Prisma abstracts you from writing SQL queries. As a result, you must ensure that your database schemas are safe.

To have these safe schemas, ensure you have Prisma installed in your text editor to help you write type-safe Prisma codes.

This tutorial will use [Visual Studio Code](https://code.visualstudio.com/). Once you have it installed, ensure you have the [Prisma extention](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. This extension adds syntax highlighting for `.prisma` files. This prevents errors by establishing a robust and type-safe Code specifically designed for Prisma programs.

Prisma provides [Prisma studio](https://www.prisma.io/studio), allowing you to interact with `.prisma files`. Ensure you have it installed on your computer. Also, ensure Node.js is (at least 64 bits) installed. This guide will use Node.js JavaScript runtime to set up the Prisma schemas.

This guide also runs Prisma using Docker. Ensure you have [Docker](https://www.docker.com/products/docker-desktop) installed on your computer and have some basic knowledge of running and using Docker. This [guide](/engineering-education/docker-concepts/) will help you get started with Docker.

### The main components of Prisma

The Prisma ecosystem is made up of three major components. These are;

#### Prisma migrate

Prisma migrate acts as the database version control. Migration is a way of controlling the previous versions of your database schema. This is closely similar to Git, where you always have the previous version of your code.

Whenever you change your database schema, Prisma migrate create a new version of the newly added schema. This way, whenever you have an issue with your current running schema, you can always check and roll back to your previous stable database schema.

Your database will have some attributes that you initially created. Still, you will always add additional columns or attributes in your database schema models in the future or in the long run. Any change will create a new migration. This way, you can always roll back to the stable migration whenever the current migration is not working as expected.

#### Prisma client

Provide a way to write/type-safe query builder. Prisma abstracts you from writing SQL queries. It allows Prisma client to set up and write your database, modelling data validation, describing the relationships between different data fields, etc.

Prisma client provide very simple and intuitive steps to set up all this without writing a single SQL query. Prisma client then enables you to generate SQL queries and connect to the database of your choice.

Prisma client also generates and provides functions or methods depending on the database model you want to create. You can then use those functions to create a stateful connection to a database. That will then be used to create, delete, update, or do an operation related to the database.

#### Prisma studio

This is a modern database GUI for interacting with your data. It gives you a visual representation of how the schema represented in a `.prisma` file would look like is a real database.

Usually, you always tend to have trouble connecting or checking your tables or databases. If you have difficulties understanding how to check the tables through the CLI commands, you tend to use something like PHPMyAdmin to see any data in your database.

Prisma studio provides the same. It gives you an out-of-the-box minimal UI that lets you see all the tables in your database. Here you can check the models and the type of data set in your database. Like PHPMyAdmin, you can delete records, add records, particularly anything operation you can that a database UI provides.

### Setting up your first Prisma project

Let's jump in and see what Prisma can achieve. Create a project folder, call it `prisma-client-app` and open it using the Visual Studio code. Initialize Node.js using `npm init -y`. The start by installing the Prisma CLI and the Prisma client using the following command:

```bash
npm install prisma @prisma/client
```

The next step is to initialize your Prisma project using the following command.

```bash
prisma init
```

The Prisma engines for Node-API will be downloaded, and a Prisma folder with a `schema.prisma` file will be created instantly. And this is where you begin configuring your Prisma client, the database you wish to utilize, the database data modelling (schema development), and the data relationship. Let's break this file down.

### Setting and understanding the Prisma client data models

The schema language is, in general, very intuitive, with easy-to-understand syntax. When you start your Prisma project, two primary blocks will be created:

- `generator`

This determines the assets to be created when generating data database types that generate the actual database queries. By default, it is set as;

```js
generator client {
  provider = "prisma-client-js"
}
```

- `datasource`

This defines how Prisma connects to your database. This takes two main parameters, the `provider` and the `url`. The `provider` sets the database you want to use. This can the `sqlite`, `mysql`, `mongodb`, `postgresql` and `sqlserver`. `url` sets a connection string of your database server. If the database is running locally, you add the localhost server that provides the connection to the database you want to use. By default, Prisma bootstrap the PostgreSQL database. It adds an `env` file that lets you add your `DATABASE_URL` based on the server running the database of your choice. It has PostgreSQL set as the default database.

```js
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

If, for example, you are using the SQLite (file-based SQL database), this is how you would set up your `datasource`.

```js
datasource sqliteDb {
  provider = "sqlite"
  url = "file:./app.db"
}
```

`provider` indicates the database you are using, and the `url` sets the file path for the local SQLite database. The connection URL of an SQLite connector points to a file on your file system.

>Note: You can only have one data source block in a single `prisma.schema`. Also, the `datasource sqliteDb` is convention. You can give your datasource any name - for example, `data source = "myDb"`.

Check this [guide and see the connectors](https://www.prisma.io/docs/concepts/database-connectors) that you can use for any of the Prisma supported database

### Modeling Schemas

Models are used to represent the entities of your application domains. A model maps to a table on your database. You can have different models that define the relationship between different tables you have in the application domain. Each database varies from another database Model. Although there might look almost the same, the differences can be seen when setting up data types associated with different entities.

Let's jump in and see how to model and represent entities in a Postgres (SQL) database. This will be implemented in the `schema.prisma` file. Add the below model to your `schema.prisma` file.

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

This model represents a single database table, and every parameter represents a single field. When this model is executed, it will create a table `Todo` and add each of the above as the table field.

In general, each field has a name and a data type. For example, the field `title` is assigned a data type `String` from the above Todo model. You can choose various data types, such as integer, string, Boolean, etc.

When creating a table in an actual database, each field will have its own properties. In a typical database table, you will have an id as a unique value to each value. Thus is created as a primary id. From the above example with a field `id`. This `@id` indicates that this will be the primary key for the table todos.

Furthermore, a primary key is created by default even without assigning a value to it. So assign the attribute `@default()`. This way, the field id will automatically be added whenever a new record is created. And to make these ids unique, add `autoincrement()` so that the primary key is set to an automatically incrementing integer.

Other fields are also set to `@default()` such as `createdAt` and `updatedAt` where the current time will be added to the newly created record. `completed` takes a Boolean will always have `false` the default value. You may also note that the field `description` has a `?` towards the end of its data type `String` —the parameter `?` is added to a field that can be `NULL` when creating a new record.

> Note: You can add schemas relations to your data models. When dealing with SQL-based databases, the chance is you will have different tables. This table will probably be related to other data stored in another table. Meaning you can add a relation to the model using Prisma. Check this guide and learn [how to create data models with schema relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations).

### Create and Run a Prisma server with Docker

Once you create your data models, you would probably create a server that will let you interact with your set data. Prisma will connect your data models and set them to your preferred database schemas. Then an API will consume the data you save you the database. Let's create a basic Typescript API that uses Prisma to connect to a PostgreSQL. In this case, you will wrap the whole application and run it using the [Docker containers](/engineering-education/getting-started-with-docker/).

Check this guide to learn more about [Docker concepts](/engineering-education/docker-concepts/) and [how Docker containers work](/engineering-education/running-and-managing-docker/). If you are new to creating Prisma servers, check [this guide and learn how to create one from scratch](/engineering-education/api-with-prisma-and-nodejs/).

#### Set the schema

First, create a project folder and name it `dockerized-prisma-postgres-api`. Then run `prisma init` inside it.

As explained earlier, the main building blocks of a Prisma API are set in the `schema.prisma` file created once you initialize a Prisma project with `prisma init`. Here you will use the PostgreSQL database as the data source provider. Therefore, your `schema.prisma` file generator and data source should resemble the following code block:

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

The `url` sets a connection string of your database server. In this case, Prisma is reading this string from the `.env` file. If the PostgreSQL database runs locally, you add the localhost server that provides the connection to PostgreSQL. For example, `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/TEST_DB?schema=public"`. This connection string will allow you to add PostgreSQL local development. However, in this example, you want to run PostgreSQL with Docker; thus, the alias `localhost` won't work when running it on Docker. In this case, your `url` will be `DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"`, where alias `postgres` will be the container name that runs a PostgreSQL image within Docker. Your `.env` file should have a connection string as shown below:

```bash
# use this DATABASE_URL for running PostgreSQL on Docker compose
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/Todo?schema=public"

# for local development use this url in the .env file
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/TEST_DB?schema=public"
```

Add your previously created data model to your `schema.prisma` file.

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

#### Set up a Node.js Typescript environment

Let's now dive in and configure a basic Prisma and PostgreSQL API. First, you need to install the necessary packages that will allow you to run Typescript code and create a web server. Go ahead and install the following packages:

- DevDependencies

1. `typescript` - This package allows you write [Typescript](https://www.npmjs.com/package/typescript) code in a Node.js application. It adds static typing, type checking, and other features that help you scale up large-scale JavaScript applications.

To install it, run:

```bash
npm install -D typescript --save-dev
```

2. `prisma` - A [Prisma CLI](https://www.npmjs.com/package/prisma) that allows you to write type-safe queries for your Prisma applications.

To install it, run:

```bash
npm install prisma --save-dev
```

3. `ts-node` - [Ts-node](https://www.npmjs.com/package/ts-node) allows you to build and execute any Typescript code that you write.

To install it, run:

```bash
npm install -D ts-node --save-dev
```

4. `@types/node` - [Types/node](https://www.npmjs.com/package/@types/node) allows you add type definitions for Node.js while running Typescript code.

To install it, run:

```bash
npm install --save-dev @types/node
```

- Dependencies

1. `@prisma/client` - [Prisma/client](https://www.npmjs.com/package/@prisma/client) is a Prisma ecosystem tool that helps you have type-safe database data access, data modelling, etc.
2. `express` - [Express](https://www.npmjs.com/package/express) is a scalable Node.js library that helps you create minimalist web based APIs
3. `@types/express` - [Types/express](https://www.npmjs.com/package/@types/express) adds Typescript type definitions for Express

To install these dependencies, run:

```bash
npm install express @types/express @prisma/client
```

Since you are using Typescript, run `tsc --init` to automatically create a `tsconfig.json` file that holds the default parameters for running Typescript code.

#### Set up a Typescript Prisma server

Create an `index.ts` file at the root directory and start creating your Prisma API, as shown below.

- Import the express and PrismaClient to the project

```ts
import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
```

- Add express and PrismaClient middlewares and the server port number.

```ts
const app: Application = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = 3000;
```

- Add a basic GET route for testing the server.

```ts
// testing route
app.get("/", (_req, res: Response) => {
    res.send(`Server is running on port: ${port}`);
});
```

- Add a route for a GET route for fetching todos.

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

- Add a route for a POST route for adding todos.

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

To run the server, use the ts-node. Go ahead and add a ts-node command to the `package.json` file. To do this, add the following command inside the `package.json` file `scripts` tag, as shown below:

```bash
"scripts": {
    "start": "ts-node index.ts"
},
```

Your basic server is ready. Let's now wrap the whole API on Docker.

### Run the Prisma server with Docker and Docker-compose

First, create Docker file environments. This allows you to set the command necessary to run your code on a Docker container. Go ahead and create a `Dockerfile` at your project's root. This file will have the following commands.

- Add the Node.js Docker image

```dockerfile
FROM node:alpine
```

- Create a directory that runs the app on Docker

```dockerfile
WORKDIR /app
```

- Add a COPY command to copy the project files to the Docker `/app` directory

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

- Install package.json dependencies

```dockerfile
RUN npm install
```

- Generate Prisma client

```dockerfile
RUN npx prisma generate
```

- Run and expose the server on Docker

```dockerfile
# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start
```

While running the COPY command, there are some files and folders that you don't want to copy over to Docker. Thus you need to create a `.dockerignore` file that contains the list of these files and folder. In our case, you don't want to copy the `node_modules` folder. So go ahead and create the `.dockerignore` file in the project root folder. Then add the following to the file.

```dockerfile
node_modules
```

Now you have the configurations ready and set within Docker. To spin up everything together, including the PostgreSQL database and the whole Prisma server, create a `docker-compose.yml` at the root of your project. Then add the following Docker services.

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

- `postgres` - to execute and run the Postgres database container on port `5432`. To access the database , use the set environment such as `POSTGRES_USER: postgres`, `POSTGRES_PASSWORD: postgres`, and `POSTGRES_DB: Todo`.
- `pgadmin` - Pgadmin will help you have a visual representation of the Postgres database. It has an interactive UI that lets you see the data you manipulate to your database table. Prisma automatically sets this database and table.
- `prisma-postgres-api` - this service runs the Prisma API that you have just created. It will access the Postgres service, run the Prisma schema and populate our data models to the database.

Everything is set. Let's run the app and let Docker containerize the application instance, so you don't need to configure anything on your local computer.

To run this on Docker, ensure you Docker is running and execute this command:

```bash
docker-compose up
```

This command will run all the commands specified in the Docker file, pull the images for the set services, and wrap everything within a single container. Once the whole process is done, Docker will run the start command and run the API within the set container.

![running-api](/engineering-education/dockerized-prisma-postgres-api/running-api.png)

If you make some changes to the project files, run `docker-compose build` the re-run the `docker-compose up` command.

#### Testing the Docker API

The app is running on Docker containers. Let's test if it works as expected. First, navigate to your Docker and check your running `dockerized-prisma-postgres-api` container.

![prisma-postgres-api](prisma-postgres-api.png)

Then hover over the `prisma-postgres-api` and open the integrated Docker API.

![api-cli](/engineering-education/dockerized-prisma-postgres-api/api-cli.png)

This will launch an interactive command line to run your API commands. In this case, you want to run the prima migrate command. This will allow your database to sync with the schema you have created. Go ahead and run `npx prisma migrate dev` inside his interactive Docker CLI.

![docker-api](/engineering-education/dockerized-prisma-postgres-api/docker-cli.png)

Let's now test the dockerized API. To do this, first, access the Postgres database using the pgadmin interface. This will let you see the data you add to your database server.

Open `http://localhost:5555/` on your browser. The login using the username `pgadmin4@pgadmin.org` and password `pgadmin`, as set in them in the `dockercompose.yml` file.

Finally, open Postman and start testing the API endpoints. Start by running the test GET route `http://localhost:3000`.

![test-route](/engineering-education/dockerized-prisma-postgres-api/test-route.png)

Test if the dockerized POST route is working using the route `http://localhost:3000/api/todos` as shown below:

![post-api](/engineering-education/dockerized-prisma-postgres-api/post-api.png)

Here is the sample input data:

```json
{
"title": "Testing Dockerized Prisma API",
"description": "a simple server that accesses Prisma to read its database schema a Docker container",
"completed": false
}
```

Once you hit the send button, a new todo will be created, and the below response will be recorded on Postman.

![post-response](/engineering-education/dockerized-prisma-postgres-api/post-response.png)

Finally, you can check this new todo using the GET `http://localhost:3000/api/todos`, as shown below:

![post-api](/engineering-education/dockerized-prisma-postgres-api/post-api.png)

If you get stuck, check the whole code setup on [GitHub](https://github.com/Faithdroid/create-and-run-a-prisma-server-with-docker-containers)

### Conclusion

This guide helped you run more about Prisma. In the end, you created a basic API using the PostgreSQL database. Then run it via Docker containers. Docker has enabled us to create the whole API without configuring PostgreSQL and Node.js on the local computer.

Happy coding!

### Further reading

- [Using Prisma with Postgres and Node.js](/engineering-education/api-with-prisma-and-nodejs/)
- [How to set up a Prisma Client Server That Uses MongoDB](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb/)
- [Getting Started with Docker](/engineering-education/getting-started-with-docker/)
- [Understanding Docker Concepts](/engineering-education/docker-concepts/)
- [Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)
- [Why is Docker so Popular](/engineering-education/why-is-docker-so-popular/)

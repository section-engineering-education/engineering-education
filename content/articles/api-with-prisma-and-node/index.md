# Using Prisma with Postgres and Node.Js

Most modern day applications make use of databases mainly to store data. In a lot of modern backend architectures, everything else is modelled around the data and it's manipulation. When using Node.js most developers opt to go for nosql databases as they are known to be easier to use. Examples of such are Mongodb and Firebase.

Working with SQL databases with Node.js often requires ORM(Object Relational Mapping) libraries to abstract the untidy database operations so the developer only has to worry about the logic. In this article, we will look into how to setup and create a simple Node.js API, using Express as our framework of choice, Postgresql as our database, and Prisma as our ORM.

## Prerequisites

To comfortably follow along with this article, you will need to have:

- Node.js installed on your machine
- Postgresql installed on your machine
- A good understanding of the Express framework
- Some working knowledge of postgress

## Setting up the Application

Create your working directory and name is any name you fancy, I will call mine, `section-prisma`. This is where all the magic will happen. Run `npm init -y` in the directory to initialize a Node.js project.

```console
 mkdir section-prisma

 cd section-prisma

 npm init -y

```

With that done, we can now install Prisma. to do so, we use npm or yarn.

```console
npm install prisma
```

The next step is to initialize prisma into the project. In the terminal, we run:

```console
npx prisma init
```

This command will create a folder within the root of your project called `prisma`. Within this folder, is a file called `schema.prisma`. This file will contain our configuration for the prisma in this project. The command also creates a `.env` file.

A .env file is typically used to store sensitive values you wouldn't want public like keys, and secret tokens or even encryption secrets, it is best practice to add it in your `.gitignore` file.

### Connecting to Postgres

This article already assumes that you have postgress already setup on your machine and will not go through that.

Prisma supports a lot of databases, and postgress is just one of them. In the event you want to use another database like sqlite, you can change the value of the database provider in the datasource option in the `schema.prisma` file.

Since we are using postgres, our schema.prisma file will look like this

```json
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

```

Now in the .env file, we add our Database URL, for postgress, it usually looks like this:

```json
DATABASE_URL="postgresql://your-user:your-password@localhost:5432/db-name?schema=public"
```

Replace, `your_user` , `your_password` and `db_name` with your correct credentials.

With that done, we have our project setup. Let's get coding!

### Data Modelling Using Prisma

When working with a database, you have to define how the data in the database will look like in the database. Modelling is necessary to give a description of the data that the client is providing, and the data the database is expecting.

Prisma comes with it's own `data modelling language` that makes it easier to do data modelling.

Prisma is an ORM, so it has to transform the data model into relevant SQL statements and database tables. Therefore, once we are done with our models, we will run `prisma migrate` which will create the relevant tables in the db.

#### Creating our model

Within the `schema.prisma` file, after the datasource and generator block, we can define our model.

_TIP_: If you are using VSCode for this tutorial, you can install the prisma extention [here](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) to give you autocomplete and formatting for the prisma modelling language.

To define a model, we use the keyword `model` then the name of the model. This entire model will be treated as a table by the database.

```js
  model Job{ }
```

We can now add fields into our model. Prisma models use the same db primitives and types used in normal models.

In this article, we will use just one model for demonstration.

Within the `Job model` let's define our fields.

```js
model Job {
  id       Int    @id @default(autoincrement())
  title    String
  location String
  salary   String
}
```

We defined `title`, `location` and `salary` fields which all are of the String type. We also have an `id` so that each Job can be unique.

In prisma, we can define `attributes` like `@id` which denotes that this field will be treated as an id, and `@default()` which sets the default value for the field.

Some attributes take arguments, just like the way `default` took the `autoincrement()` argument.

And just like that, you built your first Prisma model. We should now sync it with our db by running

```console
npx prisma migrate dev
```

The command will prompt you to enter a name for the migration , so you should be very intentional with the data you provide.

Once the command is done, you should see a `migrations` folder in the Prisma folder containing the migration we just made to the db.

You can read more on modelling data in prisma in the [official docs](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)

### Creating a Rest API

We can now query the db while also creating an express API around our data.

#### Create an Express Server

First step, let's create our server using express. To install express run:

```console
 npm i express
```

In the root of the folder, create a file called `index.js` where all the magic will happen.

In the file, we create a simple server:

```js
const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
```

One of the key features that Prisma ships with is Querying and query relations.

It provides some query options that help you perfom CRUD operations and other operations. We will use a few in our example. To read more about them, you can check the [docs](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)

We can create a route to create jobs. It will be a post request that expects a body with a job object.

```javascript
...
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

...
app.post('/job', async (req, res) => {
  const job = await prisma.job.create({ data: req.body });
  res.json(job);
});

```

In the code snippet above, we imported the PrismaClient, then created a variable to initialize the client.

Within the post method, we use the `create` query from prisma to create a new record in the database, then we pass in the request body to the data object.

We can create a route to get all the jobs. It will be a get request which find all jobs and returns them as json.

```javascript
...
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

...
app.get('/', async (req, res) => {
  const job = await prisma.job.findMany();
  res.json(job);
});

```

You can try finish up the Update and delete methods on your own to get familiar with the ORM. The final code should looks something like this:

```javascript
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post('/job', async (req, res) => {
  const job = await prisma.job.create({ data: req.body });
  res.json(job);
});

app.get('/', async (req, res) => {
  const job = await prisma.job.findMany();
  res.json(job);
});

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
```

And with that, you just created a simple, functioning API using Node.js (Express), Postgres and PRISMA. 🙌

## Conclusion

Prisma is a very powerful ORM. It offers alot of features out the box, but the key feature is ease os use, in comparison to other ORMs in place.
In this article we covered:

- The basics of Prisma
- How to setup Prisma and connect to Postgres
- How to create an API to query the DB

It is also worth noting that commands like `prisma migrate` are more powerful than demonstrated in the article, and are worth giving a good look into. You can read more about that [here](https://www.prisma.io/docs/concepts/components/prisma-migrate)

Prisma does not support postgres alone, it supports multiple SQL databases so feel free to experiment with your favorite DB.

Happy Coding!

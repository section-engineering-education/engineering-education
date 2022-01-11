Prisma is an ORM that allows you to write type-safe database schemas. Prisma allows you to write type-safe database schemas. When setting a database, everything needs to be well set to define what that database will look like. In this case, Prisma abstracts you from writing database queries. Thus you have to make sure you write safe database access schemas.

Prisma supports major databases such as MySQL, PostgreSQL, MongoDB, MariaDB, Azure SQL, Microsoft SQL Server AWS Aurora, and AWS Aurora Serverless. This means that you can easily pick the database that fits the code structure of your application and even switch between databases without the need to change any code structure of your application.

Prisma also supports different languages. As of the time of writing articles, Prisma has support for three major languages. These are TypeScript, JavaScript, and Go.

I this guide, we learn how to set up a Prisma Client Node.js server with MongoDB.

### Prerequisites
To follow along with this guide;

- Ensure you have [Node.js](https://nodejs.org/en/) installed on your computer.
- Ensure you have [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer as well as prior knowledge using MongoDB and [MongoDB Atlas](https://www.mongodb.com/atlas/database).
- Make sure you have [Postman](https://www.postman.com/downloads/) installed to test out API endpoints.
- Ensure you have Prisma installed on your computer. Here we are using a text editor to write this schema.

So make sure you have Prisma installed in your text editor to help you write type-safe Prisma codes. For example, if you are using [Visual Studio Code](https://code.visualstudio.com/), ensure you have the [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. Prisma extension adds syntax highlighting, formatting, auto-completion, type definitions, and linting for Prisma schemas. This helps you avoid errors while setting up your Prisma schemas.

### Setting up a Node.js Application
Create a project folder, call it `prisma-server` and open it using the Visual Studio code. We will use Node.js. Inside the directory, you have the created, initialize Node.js using `npm init -y`. Then install the Node.js Prisma package using `npm install Prisma` and `npm install @prisma/client --save-dev` to install Prisma client.

Finally, run `npx prisma init` to initialize Prisma in your Node.js project.

This will download the Prisma engines for Node-API and then automatically create a Prisma folder with a `schema.prisma` file. And here is where you start setting up your Prisma client, the database you want to use, and modeling the database data. Also, a `.env` will be created within your project folder. This file is used to store sensitive values such as your database connection strings.

### Setting up MongoDB
As we said, Prisma supports numerous databases. By default, Prisma sets PostgreSQL when you first initialize your Prisma project. Let's see how we can add MongoDB to Prisma.

MongoDB Atlas is a cloud-hosted platform that runs databases as a service. Instead of maintaining your own server hardware to run MongoDB, you can use MongoDB Atlas. It's a fully managed cloud database. Features such as infrastructure, provisioning, database setup, database maintenance, and version upgrades are fully automated. Atlas has sophisticated security controls for data privacy and compliance.

To set up the MongoDB Atlas, we will use a free tier that helps you get started to teat out the MongoDB cloud ecosystem. Head over to [Atlas](https://www.mongodb.com/atlas/database) and try out for free. [Create](https://www.mongodb.com/cloud/atlas/register) an account to get started.

Once you have your account set up, create a free tie shared cluster. Your database will be set up with a free MO Sandbox with a Shared cluster, as shown below.

![free-mongodb-cluster](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/free-mongodb-cluster.png)

To connect your application with the set Mongodb Atlas, Click the **Connect** button on the created cluster. This will prompt you to **Add a connection IP address.** For the purpose of this tutorial, set this to **Allow Access from Anywhere**, then click **Add IP address** to set it up.

To use an Atlas, you need to create a database user. Fill in a **username**, and **password** on the provided **Create a Database User** form and click Create to set the database user.

Then **Choose a connection method** and select the Node.js drivers. This will provide you with a connection string that will allow you to connect your application to the atlas. Below is a sample string connection with all the required parameters.

```bash
mongodb+srv://<username>:<password>@cluster0.sium6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

In this case;

- `<username>` - username of your MongoDB Atlas cluster's newly added database user
- `<password>` - the password of your MongoDB Atlas cluster's newly added database user
- `cluster0` - the default name of your cluster
- `myFirstDatabase` - you database name. In this case, you can change this to `prisma-mongo`.

Edit your connection string to reflect the credentials that you have used. To use that connection string, head over you your locally installed MongoDB compass, ensure the connection string format is correct, paste that sting and click **Connect**.

![mongodb-compass-and-atlas-connection](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/mongodb-compass-and-atlas-connection.png)

This will connect to your MongoDB remote Atlas cluster, as shown below.

![mongodb-atlas-remote-connection](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/mongodb-atlas-remote-connection.png)

Now head over to your project `.env` file and add the MongoDB Database connection string as the `DATABASE_URL` For exmaple `DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.sium6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"`

### Data modeling using Prisma
Once you initialize your Prisma project, two main blocks are created in the `schema.prisma`, `datasource` and `generator`.

`datasource` defines the database connected to. This takes two main parameters, the `provider` and the `url`. The `provider` sets the database you want to use. This can the `sqlite`, `mysql`, `mongodb`, `postgresql` and `sqlserver`. `url` sets a connection string based on the server running the database of your choice. We have already set this in the `.env` file.

`generator` determines the assets to be created when generating data database types that generate the actual database queries.

Below is how `datasource` and `generator` should be set up when using MongoDB.

```js
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["mongodb"]
}
```

Let's now model our Prisma schema.

Just after `datasource` and `generator` blocks, we can create a model inside the `schema.prisma` file. To set up a model, you use a keyword `model` followed by the model name, i.e.;

```bash
model tasks { }
```

This single model will set up a whole new JSON document from a MongoDB database. Let's now add some fields to this model. Models are equal to tables in a relational database. But with MongoDB, models are going to point to MongoDB collections. In this case, the model name, i.e., tasks, will represent the MongoDB collection.

```js
model tasks {
  id    String @id @default(dbgenerated()) @map("_id") @db.ObjectId
  title String
  description String
  createdAt DateTime  @default(now())
}
```

Here we have fields `id` `title` `description` and `createdAt` for every single task. Each field has its database types, such as Boolean and String.

Other parameters such as `@default`, indicate that the specific filed will be automatically created with a default value. For example, `dbgenerated()` shows that every task will have an auto-generated id value. The `createdAt` value will always have the current time when the task gets created.

### Setting up Prisma client
Let's now create a Prisma client and seed some data to the MongoDB database we have created. First, create an `index.js` file into your project folder.

Then import and create a Prisma Client instance to start using Prisma.

```js
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
```

Proceed and create the `async` function that will connect to the Prisma scheme we created earlier. Then use `create()` to add data that you want to seed, as shown below.

```js
async function main() {
  await prisma.$connect()

  await prisma.tasks.create({
    data: {
      title: "Testing Node.js",
      description: "Create a Node.js tasks application"
    },
  })

  await prisma.tasks.create({
    data: {
      title: "Learning Java",
      description: "Creating some Java APIs"
    },
  })

  await prisma.tasks.create({
    data: {
      title: "Tesing Out Flask APIs",
      description: "Set up some Flask APIs"
    },
  })
  
  const tasks = await prisma.tasks.findMany()

  console.dir(tasks, { depth: Infinity })
}
```

The above code block with seed MongoDB database with Three tasks. This will also log the created tasks to the console.

Finally, catch any error that may while seeding this data. Then use `disconnect()` to release the assigned resources once the Prisma client executes the whole `async` `main()` function.

```js
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Test this out by running `node index.js`.

The above task list will be logged to your console.

![console-tasks](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/console-tasks.png)

Head over to your MongoDB Atlas `prisma-mongo` database and open the tasks collection. The schema we have created has connected to MongoDB and added these tasks.

![mongodb-tasks](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/mongodb-tasks.png)

While running the above command, MongoDB may generate an error, as shown below.

![error](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/error.png)

This mainly occurs when running a local MongoDB deployment. To solve such an error, set up a [MongoDB Atlas cloud](https://www.mongodb.com/atlas/database) database and change your connection string to reflect the cloud-hosted MongoDB Atlas.

### Create a MongoDB Prisma REST API
Let's now create a server that leverages the advantages of running Prisma with MongoDB. We will set up a basic REST API that will demonstrate how to use this MongoDB-Prisma connector in a typical project.

First, add the following packages that will help to dept up an HTTP server using Node.js.

```bash
npm install cors dotenv express
```

When building a server with Node.js, you can choose Nodemon ad a development package that will help you auto restart your server whenever you make some changes.

```bash
npm install nodemon --save-dev
```

To use Nodemon, go ahead and edit the `package.json` file `scripts` tag as shown below.

```bash
"scripts": {
  "dev": "nodemon index src/index.js"
}
```

Inside yo project folder, create an `src` directory. Then inside the `src` create a `controllers` directory and add a new `TaskController.js` file.

The controller helps in setting up the logic behind each CRUD functionality. This is made of the actual HTTP methods that set logic behind each route used in a Node.js REST API.

First, import the `PrismaClient` and create a Prisma Client instance to start using Prisma.

```js
const { PrismaClient } = require ('@prisma/client')
const prisma = new PrismaClient()
```

Then add the REST API CRUD controllers and shown below.

#### AddTask
Add a `AddTask()` function that execute a POST method. In this case, we will use the Prisma method `prisma.tasks.create` that handles the logic behind creating a new task, as shown below.

```js
async function AddTask(req, res) {

  try {
    const tasksdata = await prisma.tasks.create({
      data: {
        title: req.body.title,
        description: req.body.description
      },
    })

    console.log(tasksdata)

    return res.status(201).json({ msg: 'Task Registration successfully Completed!' })

  } catch (error) {
    return res.status(400).json({ msg: 'Unsuccessful Task Registration' })
  }

}
```

#### FetchAllTasks
Create a `FetchAllTasks()` for fetching all the task created and saved in our mongodb datavse. Here we are using the Prisma `findMany()` funtion. This method will find and fetch all saved tasks,

```js
async function FetchAllTasks(req, res) {
  try {
    const tasksdata = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true
      },
    })

    return res.status(201).json(tasksdata)

  } catch (error) {
    return res.status(400).json({ msg: 'Error Fetching Tasks' })
  }
}
```

#### FetchOneTask
If you want to fetch a single task, you can do so using the `findUnique()` method. This will execute the task `id` as a parameter. And the task that matched the provided parameter will be fetched.

```js
async function FetchOneTask(req, res) {
  try {
    const tasksdata = await prisma.tasks.findUnique({
      where: {
        id: req.params.id
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true
      },
    })

    return res.status(201).json(tasksdata)

  } catch (error) {
    return res.status(400).json({ msg: 'Error Fetching Task' })
  }
}
```

#### UpdateOneTask
The `update` Prisma method helps you access a save task and edit any of that task details. In this case, we are only adding and updating the `title` and the `description` values. Go ahead and create the `UpdateOneTask()` function to carry out this logic.

```js
async function UpdateOneTask(req, res) {
  try {
    await prisma.tasks.update({
      where: {
        id: req.params.id
      },
      data: {
        title: req.body.title,
        description: req.body.description
      },
    })

    return res.status(201).json({ msg: 'Task successfully updated!!' })

  } catch (error) {
    return res.status(400).json({ error, msg: 'Error updating task' })
  }
}
```

#### DeleteOneTask
To delete a task, you can do so using the `delete()` method. This will execute the task `id` as a parameter. And the task that matched the provided parameter will be deleted.

```js
async function DeleteOneTask(req, res) {
  try {
    await prisma.tasks.delete({
      where: {
        id: req.params.id
      },
    })

    return res.status(201).json({ msg: 'Task successfully deleted!!' })

  } catch (error) {
    return res.status(400).json({ error, msg: 'Error deleting task' })
  }
}
```

Finally, exports all the above functions so that other modules can access them within the application.

```js
module.exports = { AddTask, FetchAllTasks, FetchOneTask, UpdateOneTask, DeleteOneTask }
```

#### Add routes
To access all the above CRUD controllers/functions, we need to set routes/endpoints to help us access them and run them as API endpoints.

To do this, create a `routes.js` file inside the `src` directory and add the following routes based on each CRUD function.

```js
const { Router } = require('express')
const TaskController = require('./controllers/TaskController')

const route = Router()

route.post('/tasks', TaskController.AddTask)
route.get('/tasks/:id', TaskController.FetchOneTask)
route.get('/tasks', TaskController.FetchAllTasks)
route.put('/tasks/:id', TaskController.UpdateOneTask)
route.delete('/tasks/:id', TaskController.DeleteOneTask)

module.exports = route;
```

### Set up the server
To run the above routes and controllers, we will set up a basic server that will be started on localhost. This way, we can use Prisma to access and set the `tasks` to the remote MongoDB while running a local Node.js server.

Go ahead and create an `index.js` file inside the `src` directory and add set up an express server as shown below.

```js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const route = require('./routes')

const PORT = 3000;
const api = express()
dotenv.config()

api.use(express.json())
api.use(cors())
api.use(route)

api.listen(PORT, () => {
  console.log(`Tasks API server is running on Port: ${PORT}`)
})
```

#### Testing the REST API app
The app is ready, and we can test it out. First, run `prisma generate`. This will execute the MongoDB `provider` and set it up `prisma-client`.

To run the server, use the command `npm run dev`. This will aloow Nodemon to start and run your server as shown below;

![task-api](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/task-api.png)

Let's use Postman to test if the REST API is working. We will start by creating new tasks.

Head over to Postman and select a POST method to `http://localhost:3000/tasks`.

![create-task](/engineering-education/how-to-setup-prisma-client-server-that-uses-mongodb-as-the-database/create-task.png)

This will create a save a new task to the MongoDB database. If the task was successfully saved, it will be logged to your console, and a success message printed on your Postman.

```js
{
  "msg": "Task Registration successfully Completed!"
}
```

### Conclusion
SQL and NoSQL have different data structures. This guide used Prisma as an ORM to generate schemes for a MongoDB JSON document. Then created a server that leverages the advantages of running Prisma with MongoDB to show how MongoDB-Prisma connector can be used in a typical project.

The beauty with the Prisma is that it made working with databases feel so intuitive and straightforward from the data modeling, running, migrations, writing the queries, and integrating it with the API.

Prisma client generates and provides functions or methods depending on the database model you want to create. We use those functions to create a stateful connection to a database. That will then be used to create, delete, update, or do an operation related to the database. Thus providing very simple and intuitive steps to set up all this without manually writing a single database query.

I hope you found this helpful.
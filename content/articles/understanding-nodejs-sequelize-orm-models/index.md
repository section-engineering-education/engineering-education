---
layout: engineering-education
status: publish
published: true
url: /understanding-nodejs-sequelize-orm-models/
title: Understanding Node.js Sequelize ORM Models
description: This article will help you understand Sequelize models, from definition to usage. Sequelize works with all the SQL-based databases
author:  benson-kariuki
date: 2021-11-15T00:00:00-09:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-nodejs-sequelize-orm-models/hero.jpg
    alt: Node Models image
---
[Sequelize](https://sequelize.org/) is an Object Relational Mapper for Node.js. Sequelize lets us connect to a database and perform operations without writing raw SQL queries. It abstracts SQL queries and makes it easier to interact with database models as objects. 
<!--more-->
This article will help you understand Sequelize models, from model definition to model usage. Sequelize works with all the SQL-based databases. In this tutorial, I will use MySQL. However, you can use any SQL-based database of your choice.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Sequelize set up](#sequelize-set-up)
- [Introduction to models in Sequelize](#introduction-to-models-in-sequelize)
- [Sequelize data types](#sequelize-data-types)
- [Creating database model](#creating-database-model)
- [Sequelize model constraints and validations](#sequelize-model-constraints-and-validations)
- [Sequelize model associations](#sequelize-model-associations)
- [App testing](#app-testing)
- [Conclusion](#conclusion)

### Prerequisites
For easier follow up on this article, you may require the following:
- Basic understanding of [Node.js](https://www.w3schools.com/nodejs/).
- Node.js installed on your computer.
- Knowledge in [relational database management systems (RDBMS)](https://www.codecademy.com/articles/what-is-rdbms-sql).
- An SQL-based DBMS installed on your computer.
- Basic knowledge in Sequelize installation and set-up. Luckily, this has already been covered in the article, [Introduction to Sequelize ORM for Node.js](https://www.section.io/engineering-education/introduction-to-sequalize-orm-for-nodejs/).

### Objectives
At the end of this tutorial, you should be able to:
- Understand different data types and use them in the model definition.
- Validate models.
- Define model associations.
- Define models in Sequelize.
- Generate database schema from Sequelize models.

### Sequelize set up
This tutorial assumes that you have already installed [Node.js](https://nodejs.org/en/), an SQL-based DBMS, and a code editor.

Install Sequelize by running the command below on your command line.

```bash
npm install --save sequelize
```

Install Sequelize database driver for the database you would like to use by running one of the commands below.

```bash
npm install --save pg pg-hstore # PostgresSQL
npm install --save mysql2 # MySQL
npm install --save tedious # MS SQL
```

Install npm package [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli).

```bash
npm install - g sequelize-cli
```

Create a project folder. In your project folder path, run the command below to initialize Sequelize in the folder.

```bash
sequelize init
```

The above command creates the following folders:
- `config`: a folder that contains config file
- `migrations`: a folder that holds all migration files
- `models`: a folder that contains all models for the project
- `seeders`: a folder that holds all the seed files

For more Sequelize-CLI commands, run `sequelize` on the command line or refer to the [official documentation](https://www.npmjs.com/package/sequelize-cli).

> All Sequelize-CLI commands are supposed to run in the project folder.

#### Database connection
Navigate to the `config.json` file under the `config` folder generated earlier to connect to the database. This file holds the database connections for development, test, and production databases. Edit the development database connection as shown in the code snippet below.

```js
  "development": {
    "username": "root",
    "password": null, // Your password. If the password is blank, enter null.
    "database": "sequelize_tutorial",
    "host": "localhost",
    "dialect": "mysql",
    "port": 3307
  }
```

#### Create database
We need to create the database defined in the database connection above. Create a database by running the command below on the command line. You can also create the database directly on your DBMS.

```bash
sequelize db:create
```

### Introduction to models in Sequelize
Models are the backbone of any Object-Relational Mapping (ORM). Therefore, you must understand how to work with models extensively to realize the full benefits of ORM. 

Models are database-independent. A model is an abstraction that reflects an entity or a table in the database. A model in Sequelize defines the entity's name in the database, the entity attributes, and their data types.

In this tutorial, let's consider a database that stores users and blog posts. We need two tables to store users and posts. There will be a one-to-many relationship between the entity `User` and the entity `Post`. For this tutorial, we will keep it simple.

### Sequelize data types
Every attribute in a model represents a column in the database table. Each column must have a data type. Below are some of the most common data types in Sequelize:

```js
DataTypes.STRING    // VARCHAR(255)
DataTypes.TEXT      // Text
DataTypes.BOOLEAN   // TINYINT(1)
DataTypes.INTEGER   // Integer
DataTypes.FLOAT     // Float
DataTypes.DOUBLE    // Double
DataTypes.DECIMAL   // Decimal
DataTypes.DATE      // Date
DataTypes.DATEONLY  // Date without time
```
For more supported data types, refer to the [Sequelize documentation](https://sequelize.org/master/manual/model-basics.html#data-types).

### Creating database model
In this tutorial, we will use Sequelize-CLI to create models. Run the commands below on the command line in the project folder to create user and post models. Replace `ModelName`, `attribute1`, `attribute2`, `attribute3`, and `datatype` with your values.

```bash
sequelize model:generate --name ModelName --attributes attribute1:datatype, attribute2:string, attribute3:datatype
```

The above command will create the models. New files in the `migrations` folder and `models` folder are created. To modify each model, edit the files as per the model name.

> The commands do not include the attribute `id`, which should be the primary key for each table. The attribute is automatically generated. 

You can add more attributes by editing the model files generated, `user.js,` and `post.js.` By default, the table name is as same as the model name. Open model files and define the table name as shown below.

```js
  {
    sequelize,
    //define table name
    tableName: 'users',
    modelName: 'User',
  });
```

```js
  {
    sequelize,
    //define table name
    tableName: 'posts',
    modelName: 'Post',
  });
```

To implement the models into the database, we need to run the Node.js app. In the project root, create a script, `app.js`. We will use the [Express framework](https://www.npmjs.com/package/express). Express is a Node.js web framework for creating servers in a simplified manner. Install Express by running the command below on your terminal. 

```bash
npm install express --save
```

Add the code below in the script `app.js`.

```js
const express = require("express");
const {sequelize, User, Post} = require('./models'); // import models

const app = express(); // create a new express app
app.use(express.json());

app.get('/', function (req, res) {
    res.send('App running')
});

app.listen({port: 5005}, async() =>{
    await User.sync({ force: true });
});
```

On the command line, run the command below to start the app.

```bash
node app.js
```

The app automatically connects to the database and synchronizes the models with the database.

Sequelize automatically creates two new columns named `createdAt` and `updatedAt`. The two columns store timestamps showing when a record was created and updated, respectively.

Synchronization in production can be destructive and is not recommended. Use synchronization at the development level only. In production, implement synchronization with [Migrations](https://sequelize.org/master/manual/migrations.html).

### Sequelize model constraints and validations
Constraints are data rules defined at the SQL level. If the SQL query does not meet the constraint rules, the database throws an error. Sequalize forwards the error to JavaScript. Open `user.js` and add constraints to the `email` attribute, as shown below.

```js
email:{
  type:DataTypes.STRING,
  unique: true,
  allowNull: false
}
```

A database error will be thrown if the email is null or not unique in the above example.

Validation is done at the JavaScript level by Sequelize. Sequelize provides built-in validator functions. You can also create your custom validation functions. SQL queries will execute if only the validation passes. Below are some of the commonly used Sequelize built-in validators. For more Sequelize validators, check the [documentation](https://sequelize.org/master/manual/validations-and-constraints.html#per-attribute-validations).

```js
isAlphanumeric: true, // checks for alphanumeric characters only
isNumeric: true,  // allow numbers only
isLowercase: true,  // allow lowercase only
isUppercase: true,  // allow uppercase allow
```

Open `user.js` and add constraints on the `email` attribute as shown below. Take note of the error return message.

```js
email:{
  type:DataTypes.STRING,
  unique: true,
  allowNull: false,
  validate:{
    isEmail: {msg: "It must be a valid Email address"},
  }
}
```

### Sequelize model associations
In this section, we are going to implement associations in Sequelize. You may want to revisit the basics [here](https://database.guide/the-3-types-of-relationships-in-database-design/). Sequelize supports the three model associations:
- One-to-One
- One-to-Many
- Many-to-Many

In the model we created earlier, we have a One-to-Many association. This results in two Sequelize relationships:
- `User.hasMany(Post);`
- `Post.BelongsTo(User);`

Define the foreign key in the `User` and `Post` models, as shown below in the code snippets.

```js
//User Model
class User extends Model {
  static associate({Post}) {
    // define association here
    this.hasMany(Post, {foreignKey: 'userId', as: 'posts' })
  }
};
```

```js
// Post Model
class Post extends Model {
  static associate({User}) {
    // define association here
    this.belongsTo(User, {foreignKey: 'userId', as: 'user' })
  }
};
```

The source code for the `User` and `Post` models is on [Github](https://github.com/Tsanguu/Node.js-Sequelize-Tutorial-1).

### App testing
We can now test our app with data. We will use [Postman](https://www.postman.com/) to make requests. 

We will create an endpoint for each functionality. To implement the changes to the database, run the applications. We will not make more changes to the models. Edit `app.js`. Replace the line

```js
await sequelize.sync({force: true});
```

with

```js
await sequelize.authenticate();
```

This will ensure that our database tables are not recreated every time we run the app.

#### Insert User
We will create an endpoint that will insert new users into the database. The endpoint takes in data in JSON format. Add the code below in `app.js` and run the app.

```js
// Create new user
app.post("/users", async(req,res) =>{
    const { name, email, role} = req.body
    try{
        const user = await User.create({name, email, role});
        return res.json(user);
    }catch(err){
        return res.status(500).json(err);
    }
});
```

In Postman, create a `POST` request with the endpoint location as `http://localhost:5005/users/`. In the Body section, select `raw JSON` and insert the JSON data below. 

```json
   {
        "name": "Benson Wyne",
        "email": "Benson@mexamplemail.com",
        "role": "user"
    }
```

Click send to run the request. Check the response. The expected response is as shown in the screenshot below. 

![Postman create user request](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-create-user.png)

#### Get users
We will create an endpoint that will return users from the `users` table. Add the code below in `app.js` and run the app.

```js
//Fetch users
app.get("/users", async(req,res) =>{
    try{
        const users = await User.findAll({include:'posts'});
        return res.json(users);
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
```

In Postman, create a `GET` request with the endpoint location as `http://localhost:5005/users/`. You will get a JSON response with all the users in the database.

![users](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-get-users.png)

#### Edit user
We will create an endpoint that will update the user details. The endpoint takes in data in JSON format. Add the code below in `app.js` and run the app.

```js
//Update user
app.put("/users/:id", async(req,res) =>{
    const id = req.params.id;
    const { name, email, role} = req.body;
    try{
        const user = await User.findOne({
            where: {id}
        });
        user.name = name;
        user.email = email;
        user.role = role;

        await user.save();
        return res.json(user);

    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
```

In Postman, create a `PUT` request with the endpoint location as `http://localhost:5005/users/1`. The number at the end of the URL represents the primary key to the record to be updated. 

In the body section, select `raw JSON` and insert the JSON data with the changes you want to make to the record.

```json
   {
        "name": "Benson Wyne",
        "email": "Benson@examplemail.com",
        "role": "admin"
    }
```

Click send to run the request. Check the response. The expected response is as shown in the screenshot below. 

![Postman edit user](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-edit-user.png)

#### Create post
We will create an endpoint that will insert new posts into the database. The endpoint takes in data in JSON format. Add the code below in `app.js` and run the app.

```js
// Create new post
app.post("/posts", async(req,res) =>{
    const { content, userId} = req.body
    try{
        const user = await User.findOne({
            where: {id: userId}
        });
        const post = await Post.create({content, userId: user.id });
        return res.json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});
```

In Postman, create a `POST` request with the endpoint location as `http://localhost:5005/posts/`. In the body section, select `raw JSON` and insert the JSON data below.

```json
   {
        "content": "Sample post 1",
        "userId": "1"
    }
```

Click send to run the request. Check the response. The expected response is as shown in the screenshot below.

![Postman create post](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-create-post.png)

#### Get posts
We will create an endpoint that will return posts from the posts table. Add the code below in `app.js` and run the app.

```js
// Get posts
app.get("/posts", async(req,res) =>{
    try{
        const posts = await Post.findAll({include:'users'});
        return res.json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
});
```

In Postman, create a `GET` request with the endpoint location as `http://localhost:5005/posts/`. You will get a JSON response with all the posts in the database.

![Postman get posts](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-get-posts.png)

#### Delete user
We will create an endpoint that will delete records from the `users` table. Add the code below in `app.js` and run the app.

```js
//Delete user
app.delete("/users/:id", async(req,res) =>{
    const id = req.params.id;
    try{
        const user = await User.findOne({
            where: {id}
        });
        await user.destroy();
        return res.json({message: "User Deleted"});
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});
```

In Postman, create a `DELETE` request with the endpoint location as `http://localhost:5005/users/5`. The number at the end of the URL represents the primary key to the record to be deleted.

![Postman delete user](/engineering-education/understanding-nodejs-sequelize-orm-models/postman-delete-user.png)

The final source code for `app.js` is available on [Github](https://github.com/Tsanguu/Node.js-Sequelize-Tutorial-1).

### Conclusion
We have learned how Sequelize models work. Learn more on how to move your project to production using [Sequelize migrations](https://sequelize.org/master/manual/migrations.html) and [seeders](https://sequelize.org/master/manual/migrations.html#creating-the-first-seed). Seeders Allow the creation of dummy data on the database. The source code for the project is available on [Github](https://github.com/Tsanguu/Node.js-Sequelize-Tutorial-1).

Happy coding.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

---
layout: engineering-education
status: publish
published: true
url: /complete-guide-on-using-sequelize-basic-and-advanced-features/
title: Using Basic and Advanced Sequelize Features
description: This tutorial will guide the reader on how to work with Sequelize, the need for using it. We will also build a simple project to demonstrate various features in it.
author: joshua-adesanya
date: 2021-11-24T00:00:00-13:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/complete-guide-on-using-sequelize-basic-and-advanced-features/hero.png
    alt: Complete Guide On Using Sequelize Basic and Advanced features Image
---
Sequelize is a JavaScript library that manages most of all the popular databases like PostgreSQL, MySQL, SQLite, and MSSQL. Object Relation Mappers (ORM) are used to convert object-relational syntax to the database schema. Usually, sequelize is used with Node.js. We can call Sequelize an ORM.
<!--more-->
Sequelize only supports relational databases. Databases like Mongo DB or other NoSQL databases are not supported. Sequelize supports solid transaction, eager and lazy loading, relations, read replication, and other cool features.

By the end of this tutorial, the reader will adequately understand the following:
- How to install Sequelize.
- How to install drivers associated with the different databases.
- Connecting to the database and testing the connection.
- How to use Sequelize CLI.
- Model Querying (Inserting, Updating, Deleting).
- Associations (One to One, One to Many, Many to Many)
- Node.js runtime

### Prerequisites
Before we continue further, it is recommended to have the following:
- A basic knowledge of JavaScript.
- A basic knowledge of Node.js and Express.js.
- Familiarization with any of these databases i.e MYSQL, POSTGRESQL, MSSQL, SQLite
- A basic knowledge of Postman, which we will use to test our endpoints.
- Text Editor - I will be using VS Code.

In this article, we will go through features you will need when using sequelize, and we will be using a project-based approach.

Let's get started!

### Project setup
```bash
mkdir sequelize-project
cd sequelize-project
```

We use the shell command `mkdir` to create the directory `sequelize-project` and use the `cd` command to navigate into the `sequelize-project` folder.

The next step is to initiate a Node.js application.

```bash
npm init -y
```

This command will create a `package.json` with default settings.

```js
{
  "name": "sequelize-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### Setting up express server
We will need to install express and a couple of packages along with the Node.js server.

```bash
npm i express cors morgan dotenv nodemon cors
```

We need to create `app.js` and `.env` files inside the `sequelize-project` folder. We can do this using our preferred editor.

```js
sequelize-project
├── .env
├── app.js
└── package.json
```

The next step is to start adding the necessary code to our files, we will start with `.env`

```bash
.env
```

We will add the PORT as shown:

```bash
PORT=5000
```

Our node.js server will be running on this port.

`app.js`
```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

//Enable cors
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  const response = new Response(
    true,
    200,
    `Welcome to Sequelize Project ${port}`
  );
  res.status(response.code).json(response);
});

//Handling unhandle routes
app.all("*", (req, res, next) => {
  const response = new Response(
    false,
    404,
    `Page not found. Can't find ${req.originalUrl} on this server`
  );
  return res.status(response.code).json(response);
});

//listening to port
app.listen(port, () => {
  console.log(`Welcome to Sequelize Project running on port ${port}`);
});
```

The code above contains the necessary things to make our node server run successfully.

```bash
package.json
```

```js
{
  "name": "sequelize-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "morgan": "^1.10.0"
  }
}
```

We added `scripts` to run the Node.js server.

Using `npm start` we will start the project, but it'll stop running if it hits an error. Whereas, using `npm run dev` runs continuously, even if an error is encountered.

`npm run dev` contains a package called `nodemon` that helps us establish a server that runs the node file.

Let's run the app:

```bash
npm run dev
```

#### Installing sequelize
To fully set up Sequelize, we need to have the database ready. It can be either MySQL, PostgreSQL, MSSQL, or SQLite.

We need to install `sequelize` and `sequelize-cli`.

These packages will help bootstrap the necessary setup that we need for sequelize in a Node.js application. It will create the necessary files, migration, and models folder.

```bash
npm i sequelize sequelize-cli
```

Then, we initialize it:

```bash
sequelize init
```

On initializing, it will create the `config` folder that contains the `config.js` file, the `migrations` folder that contains the migrations, the `model` folder that contains the models, the `seeders` folder that contains the seeder files, if there is any.

Now, our project file structure should look like this:

```bash
sequelize-project
├── config
├── migrations
├── models
├── seeders
├── .env
├── app.js
└── package.json
```

The next step is to decide which database we want to use. Your choice of database will determine the package you will need to install.

- MySQL - `npm install mysql2`
- PostgreSQL - `npm install pg`
- SQLite - `npm install sqlite3`
- MSSQL - `npm install tedious`
- MARIADB - `npm install mariadb`

Let's go with PostgreSQL for this tutorial.

I have created a database on PostgreSQL as shown:

```bash
Database name - Sequelize
Database user - josh
Password - \***\*\*\*\*\***
Host - localhost
```

We need to go into our `.env` file and add the database details to it. The essence of the `.env` file is to have access to all details inside it using `process.env`.

Also, let's create a `.gitignore` file that excludes files that do not need to be pushed to the git repository. Here, we exclude the `node_modules` and `.env` files.

Now, the project file structure should look like:

```bash
sequelize-project
├── config
├── migrations
├── models
├── seeders
├── .env
├── .gitignore
├── app.js
└── package.json
```

Content of the `.env` file:

```env
PORT=5000
DATABASE_USER=josh
DATABASE_PASSWORD=password
DATABASE_NAME=sequelize
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
DATABASE_PORT=5432
```

Default Port for databases: 
```bash
MySQL (mysql) - `3306`
PostgreSQL (postgres) - `5432`
MSSQL (mssql) - `1433`
MARIADB (mariadb) - `3306`
```

The next step is to add the database credentials to the `config.json` file that is inside the config folder.

The `config.json` file will not allow us to use our `.env` file, we will rename it as `config.js`, and add the code below:

`config.js`

```js
const dotenv = require("dotenv");
const path = require("path");

if (!process.env.HOST) {
  dotenv.config({
    path: path.join(__dirname, "..", ".env"),
  });
}

module.exports = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  dialect: process.env.DATABASE_DIALECT,
};
```

The next would be to update the `index.js` inside the `model` folder as shown below:

`index.js`

```js
"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js");
const db = {};

// Initialize the sequelize object
let sequelize = new Sequelize({
  host: config.host,
  username: config.username,
  password: config.password,
  port: config.port,
  database: config.database,
  dialect: config.dialect,
});

// check database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
```

The code above checks if the database connection is successful or has an error.

It returns "success", if it connects successfully, or it will log out with an error.

If the server is currently running, we can stop it using, `Ctrl + C`.

```bash
Executing (default): SELECT 1+1 AS result
success
```

We should get the result above, if we have followed all the steps above correctly.

Having understood the basics, let's get into building the actual project.

#### Creating models
Let's build a user model, we will use the `sequelize-cli` command to build a user model.

Our user will have a `firstName`, `lastName`, `age`, and any other properties that are required.

This brings us to Sequelize datatypes. We have different datatypes in Sequelize like string, text, integer, bigint, float, real, double, date, boolean, and others.

At the point of creating our models, we will need to specify the datatype of the fields of our model.

Let's create our user model:
```bash
sequelize model:generate --name User --attributes firstName:string,lastName:string,age:integer
```

As a result, a new `model` and a new `migration` will be created.

Now, the file structure should look like this:
```bash
sequelize-project
├── config
├── migrations
|      ├── 20210727120010-create-user.js
├── models
|      ├── index.js
|      ├── user.js
├── seeders
├── .env
├── .gitignore
├── app.js
└── package.json
```

> The model shows the data structure that we are using, while the migrations are instructions on how we want our data to be structured in the database.

Currently, our data is not reflected in the database yet. For that to happen, we need to run our migration.

Every time we create a model or create a migration, we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
```

**Output:**

```bash
== 20210727120010-create-user: migrating =======
== 20210727120010-create-user: migrated (0.350s)
```

After running the command above, the user table has been created in the database, as we specified in the `.env` file. The next step is to create a `services` folder for the node server API.

We will be experimenting with sequelize, since we have a user model already we shall create a `user-service.js` file inside our `services` folder.

Now, the file structure should look like this:

```bash
sequelize-project
├── config
├── migrations
|      ├── 20210727120010-create-user.js
├── models
|      ├── index.js
|      ├── user.js
├── seeders
├── services
|      ├── user-service.js
├── .env
├── .gitignore
├── app.js
└── package.json
```

Add the code below to the `user-service.js`

```bash
const User = require("../models/index")['User'];
class UserService { }
```

#### Inserting data
When the create method is used, the data is created in the database. To create a user from the model, we use the sequelize `create` method.

If we pass a user object into this `createUser` method, it will create a user in the user table.

```js
const User = require("../models/index")['User'];
class UserService {
    async createUser(user){
        return await User.create(user);
    }
}
let user = {
    firstName : "josh",
    lastName: "Ade",
    age: 20
}
let userService = new UserService();
const result = async() => {
    const data = await userService.createUser(user);
    console.log(data);
}
result();
```

```js
async createUser(user) {
  return await User.create(user, {fields: ['firstName', 'lastName']});
}
```

The code above will not allow the age to be saved to the database, because we have restricted it to save only `firstName` and `lastName`.

To test this, run the code below:

```bash
node services/user-service.js
```

#### Fetching using finders
These finders method uses `SELECT` query behind the scenes.

We have about 5 methods for find operations in sequelize:
1. `findAll`
2. `findByPk`
3. `findOne`
4. `findOrCreate`
5. `findAndCountAll`

##### findAll
The `findAll` method fetches all entries from the table that we are working on. Here, it's the user table.

```js
const User = require("../models/index")['User'];

class UserService {
    async findAllUser(){
        return await User.findAll();
    }
}
let userService = new UserService();
const result = async() => {
    const data = await userService.findAllUser();;
    console.log(data);
}

result();
```

We don't need to pass anything to it, `User.findAll()` will give us all the users in the user table.

To test this, run the code below:

```bash
node services/user-service.js
```

##### findByPk
This uses the primary key to find the user or the equivalent of what you are looking for.

The `findByPk` method fetches the record that is mapped to the primary key that we have passed as an argument.

Here, the primary key by default is the `id` field, which has been generated by default.

```js
const User = require("../models/index")['User'];
class UserService {
    async findWithPk(userId){
        return await User.findByPk(userId);
    }
}
let userId = 1
let userService = new UserService();

const result = async() => {
    const data = await userService.findWithPk(userId);;
    console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

##### findOne
Based on the optional arguments that we pass, it fetches the very first entry.

The option query looks like this `{where: { firstName: 'josh' }}`.

```js
const User = require("../models/index")['User'];

class UserService {
    async findOne(firstname){
        return await User.findOne({where: {firstName: firstname}});
    }
}

let userService = new UserService();
let firstname = 'josh';
const result = async() => {
    const data = await userService.findOne(firstname);;
    console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

##### findOrCreate
Based on the optional arguments that we pass, the entry is fetched or the entry is created, if it does not exist.

```js
const User = require("../models/index")['User'];

class UserService {
  async findOrCreate(firstname){
      return await User.findOrCreate({where: {firstName: firstname},
      defaults: {
          lastName: 'Unknown',
      }
    });
  }
}

let userService = new UserService();
let firstname = 'josh';
const result = async() => {
  const data = await userService.findOrCreate(firstname);;
  console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

##### findAndCountAll
This method is a combination of the `findAll` and `count` method.

It finds all the entries and also adds the count to the result.

```js
const User = require("../models/index")['User'];

class UserService {
  async findOrCreate(firstname){
      return await User.findOrCreate({where: {firstName: firstname},
      defaults: {
          lastName: 'Unknown',
      }
    });
  }
}

let userService = new UserService();
let firstname = 'josh';
const result = async() => {
  const data = await userService.findOrCreate(firstname);;
  console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

#### Updating
This method can be used to update existing data.

```bash
const User = require("../models/index")['User'];
class UserService {
    async updateUser(id, payload) {
    return await User.update(payload, {
      where: {
        id
      }
    });
  }
}

let userService = new UserService();
let payload = {
    firstName : "joshua"
};
let id = 1;
const result = async() => {
  const data = await userService.update(id, payload);;
  console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

#### Deleting
This method can be used to delete existing data.

```js
const User = require("../models/index")['User'];
class UserService {
  async deleteUser(id){
        return await User.destroy({
             where: {
                id
            }
        });
    }
}

let userService = new UserService();
let id = 1;
const result = async() => {
  const data = await userService.deleteUser(id);;
  console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

### Associations
Associations refer to the relationship between different tables. A relationship can be established between tables, when one table uses a foreign key that references the primary key of another table.

A primary key is an unique identifier for a particular table, while a foreign key is the field linked to another table primary key when performing associations.

This is the concept behind the relational database.

There are three major types of relationship:
1. One to One
2. One to Many
3. Many to Many

#### One to One Association
This association refers when a record in a particular table is associated with another record of another table. A typical example is that a `userId` in the user table can only be associated with one user profile in the profile table.

We need two tables to be able to show how this works, we already have a user table created from our User Model, let's create a profile table.

This is an opportunity to practice creating a Model.

```bash
sequelize model:generate --name Profile --attributes height:string,country:string,email:string,userId:integer
```

We will get a result that a new model and a new migration have been created.

Every time we create a model or create a migration we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
```

**Output:**

```bash
== 20211022092823-create-profile: migrating =======
== 20211022092823-create-profile: migrated (0.147s)
```

We need to go into the `models/profile.js` to set our `userId` as the primary key and set the association. In this case, it's `Profile.hasOne(User)`.

`models/profile.js`

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasOne(models.User, {
        foreignKey: "id",
        as: "user",
      });
    }
  }
  Profile.init(
    {
      height: DataTypes.STRING,
      country: DataTypes.STRING,
      email: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
```

We set the `userId` as the primary key. We also associated the Profile model with the User model, and we referenced the User model foreign key.

We need to create a `profile-service.js` file inside our services folder.

`services/profile-service.js`

```js
const Profile = require("../models/index")['Profile'];
const User = require("../models/index")['User'];

class ProfileService {
    async createProfile(profile){
        return await Profile.create(profile);
    }
    async getAll(){
        return await Profile.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                },
            ],
        });
    }
}

let profileService = new ProfileService();
let profile = {
    userId : 1,
    height: "30",
    country: "Nigeria",
    email: "ade@yahoo.com"
}

const result = async() => {
   let dataCreated = await profileService.createProfile(profile);
   let data = await profileService.getAll();
}

result();
```

The important thing to note here is that the `userId` points to an existing user. Another thing to note is that the "include" contains the model that we are trying to associate with.

To test this, run the code below:

```bash
node services/profile-service.js
```

Inside our `profileService`, we have the `createProfile` and `getAll` methods which were used to create a profile for a user and the other to get all the profiles in the database.

Sample result for one the profile looks like this:
```json
{
  height: '30',
  country: 'Nigeria',
  email: 'ade@yahoo.com',
  userId: 1,
  createdAt: 2021-10-22T14:03:35.372Z,
  updatedAt: 2021-10-22T14:03:35.372Z,
  user: [User]
}
```

The `user` property contains the user information.

We can get associated information from another table. The property name was derived from the 'as' that we used in the profile Model.

You can also use the method above to associate the User to the Profile from the User Model.

#### One to Many Association
This association refers to, when a record in a particular table is associated with more than one record in another table, a typical example is that a `userId` in the user table can be associated with many cars in the cars table.

We need two tables to be able to show how this works, we already have a user table created from our User Model, let's create a car table.

```bash
sequelize model:generate --name Cars --attributes color:string,name:string,userId:integer
```

We will get a result that a new model and a new migration have been created. Every time we create a model or create a migration we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
== 20211023110522-create-cars: migrating =======
== 20211023110522-create-cars: migrated (0.606s)
```

We need to go into the `models/cars.js` to set our `userId` as the primary key, we can also decide to set a one-to-one for the cars. This means one car can only have one user `Cars.hasOne(user)`.

`models/cars.js`

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.hasOne(models.User, {
        foreignKey: "id",
        as: "user",
      });
    }
  }
  Cars.init(
    {
      color: DataTypes.STRING,
      name: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
```

To show the one to many relationship, we need to go inside the `models/user.js` and add `user.hasMany(cars)`:

`models/user.js`

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: "userId",
        as: "profile",
      });

      User.hasMany(models.Cars, {
        foreignKey: "userId",
        as: "cars",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
```

We need to create a `cars-service.js` file inside our services folder. We will be creating new cars inside this file, remember that the cars will be attached to one user.

`services/cars-service.js`

```js
const User = require("../models/index")["User"];
const Cars = require("../models/index")["Cars"];

class CarService {
  async createCar(car) {
    return await Cars.create(car);
  }
}

let carService = new CarService();
let car = {
  userId: 1,
  color: "blue",
  name: "Toyota Camry",
};
const result = async () => {
  let data = await profileService.createProfile(profile);
  console.log(data);
};

result();
```

To test this, run the code below:

```bash
node services/cars-service.js
```

We have successfully created our cars, I will advise you to create more than one car, so that you can see the one-to-many association in action.

We would go into our user-service file to get all users, we should have the property of the car showing all cars belonging to each user.

`services/user-service.js`

```js
const User = require("../models/index")["User"];
const Profile = require("../models/index")["Profile"];
const Cars = require("../models/index")["Cars"];

class UserService {
  async findByPk(userId) {
    return await User.findByPk(userId);
  }

  async findAll() {
    return await User.findAll({
      include: [
        {
          model: Cars,
          as: "cars",
        },
      ],
    });
  }
}

let userService = new UserService();
const result = async () => {
  let data = await userService.findAll();
  console.log(data);
};

result();
```

To test this, run the code below:

```bash
node services/user-service.js
```

Sample result for what the user data should look like this:

```json
{
  id: 1,
  firstName: 'josh',
  lastName: 'Ade',
  age: 20,
  createdAt: 2021-10-22T09:01:48.170Z,
  updatedAt: 2021-10-22T09:01:48.170Z,
  profile: null,
  cars: [Array]
}
```

The key takeaway here is that the car's property will contain an array of cars. This means anytime you query for a single user or all users, they will also show the "many" cars, if we have more than one associated cars. In case the user has no car, it will return an empty array.

#### Many to Many Association
This association refers to when many records in a particular table are associated with many records in another table.

We have 2 two tables, actor and movie tables. One actor can be in more than one movie, one movie can have more than one actor. 

Seriously this looks confusing, how do we track this, it sounds like a two-way one-to-many relationship. The only difference is that there is no one unique record on both sides, so we need an additional table to keep track of the actor and movie, let's call the table movieactor.

The essence of this table is that for every movie created we can add many actors to it and for every actor created we can add a movie.

At this point, let's get back to coding.

We need to create 3 tables, actor, movie, movieactor:

```bash
sequelize model:generate --name Actor --attributes name:string
sequelize model:generate --name Movie --attributes name:string
sequelize model:generate --name MovieActor --attributes MovieId:integer,ActorId:integer
```

Run migration.

```bash
sequelize db:migrate
```

All our models have been created and tables have been added to the database.

We need to update the movie and actor model.

`models/actor.js`

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actor.belongsToMany(models.Movie, {
        through: models.MovieActor,
        as: "movies",
        foreignKey: "MovieId",
      });
    }
  }
  Actor.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
```

For the many-to-many relationship, we used the `belongsToMany`, we have something like `Movie.belongsToMany(Actor)`.

We also added the through property, which is pointing to the `MovieActor` model. We have addressed other properties in the one-to-one and one-to-many.

`models/movie.js`

```js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.Actor, {
        through: models.MovieActor,
        as: "actors",
        foreignKey: "ActorId",
      });
    }
  }
  Movie.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
```

We don't need to add anything to the MovieActor Model.

Now, we need to create `movie-service.js` and `actor-service.js`.

`services/actor-service.js`

```js
const Actor = require("../models/index")['Actor'];
const User = require("../models/index")['User'];

class ActorService {
    async createActor(actor){
        return await Actor.create(actor);
    }
}

let actorService = new ActorService();
let actor = {
    name : "Josh",
}
const result = async() => {
   let data = await actorService.createActor(actor);
    console.log(data);
}

result();
```

To test this, run the code below:

```bash
node services/actor-service.js
```

In the `actor-service.js`, we created an actor, we will need this actor created in the movie-service to explain the many to many, then you can also replicate the many to many in the actor-service.

`services/movie-service.js`

```js
const Movie = require("../models/index")['Movie'];
const Actor = require("../models/index")['Actor'];
const User = require("../models/index")['User'];

class MovieService {
  async createMovie(movie){
      return await Movie.create(movie);
  }
  async findOneMovie(id){
    return await Movie.findOne({
      where : {
          id
      },
      include: [
          {
              model: Actor,
              as: 'actors',
          },
      ],
    })
  }
}


let movieService = new MovieService();
let newMovie = {
    name : "Titanic",
}

const result = async() => {
  let movie = await movieService.createMovie(NewMovie);
  let actor = await Actor.findOne({where : {id: 1}})
  let data = await movie.addActor(actor);
  let oneMovie = await movieService.findOneMovie(1)
  console.log(oneMovie);
}

result();
```

To test this, run the code below:

```bash
node services/movie-service.js
```

The only thing new here is the `addActor` method. The many-to-many relationship gives the model access to methods such as `addMovie` and `addActor`.

Like we have access to the `addActor` from the `Movie` model, we also have access to the `addMovie` from the `Actor` model.

So after creating a movie, if the actor has been created, you can add the actor to the movie. When we get the movie, either through `findOne` movie or `findAll`, we will see an array of all actors attached to the movie.

It is similar to what we see with the one-to-many relationship.

### Conclusion
So far, we have learned:
- How to install Sequelize.
- How to install drivers associated with the different databases.
- Connecting to the database and testing the connection.
- How to use Sequelize CLI.
- CRUD operations using Sequelize.
- Database associativity.

Thank you for reading.

You can find the full code [here](https://github.com/Josh4324/sequelize-guide).

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
Sequelize is a JavaScript library that manages databases. It supports all the popular databases such as PostgreSQL, MySQL, SQLite, and MSSQL. This kind of package is known as an Object Relation Mapper.
Object Relation Mappers are used to convert object-relational syntax to the database schema. Sequelize is used with NodeJS.

<!--more-->

Sequelize only supports relational databases, and databases like Mongo DB or other NoSQL databases are not supported. Sequelize supports solid transaction, eager and lazy loading, relations, read replication, and other cool features.

By the end of this tutorial, you will adequately understand the following:

- How to install Sequelize
- How to install drivers associated with the different databases.
- Connecting to the database and testing the connection.
- How to use Sequelize CLI.
- Model Querying (Inserting, Updating, Deleting).
- Associations (One to One, One to Many, Many to Many)

- Node js runtime
- Postgresql || MSQL || MSSQL || SQLITE

### Prerequisites knowledge

Before we continue it is recommended to have the following.

- A basic knowledge of JavaScript.
- A basic knowledge of Node Js and Express Js.
- Familiarization with any of these databases i.e MYSQL, POSTGRESQL, MSSQL, SQLite
- A basic knowledge of postman, which we will use to test our endpoints.
- Text Editor - I will be using VS Code.

In this article, I will show you most of the features you will need when using sequelize, and I will be using a project-based approach.
You must follow along and practice the concepts.

Let's get started!

### Project Setup

```bash
mkdir sequelize-project
cd sequelize-project
```

We used the shell command `mkdir` to create the directory `sequelize-project` and used the `cd` command to navigate into the `sequelize-project` folder.

The next step is to initiate a Node JS application.

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

### Express Setup

We will need to install express and a couple of packages to set up our node js server.

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

.env

We will add the PORT

PORT=5000

Our node server will be running on this port.

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

`package.json`

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

We added script to be able to successfully run our node js server.

Using `npm start` will start the project but will stop running after it hits an error

Using `npm dev` will start the project and keep running after it hits an error

### Running the App

```bash
npm dev
```

### Installing Sequqlize

To fully set up Sequelize, we need to have created your database in either MYSQL, POSTGRESQL, MSSQL, or SQLite

we will need the database details during the sequelize setup.

First thing first, we need to install sequelize and sequelize-cli, this package will help bootstrap the necessary setup we need for sequelize in a node js application. It will create the necessary files, migration, and models folder.

```bash
npm i sequelize sequelize-cli
```

After installing sequelize and sequelize-cli, it's time to start using the sequelize commands to set up sequelize.

First and most important command

```bash
sequelize init
```

This will initiate our sequelize setup. it will create the `config` folder which contains the `config.js` file, the `migrations` folder which will contain the migrations, the `model` folder which will contain the models, the `seeders` folder, which will contain the seeder files if there is any.

Our project file structure should look like this.

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

The next step is to decide which database we want to use, your choice of database will determine the package you will install.

MYSQL

```bash
npm install mysql2
```

POSTGRESQL

```bash
npm install pg
```

SQLITE

```bash
npm install sqlite3
```

MSSQL

```bash
npm install tedious
```

MARIADB

```bash
npm install mariadb
```

We can decide to use anyone we like, it doesn't matter, we will see later on where we need to set up some things to indicate which database we decided to use.

We will continue with PostgreSQL for this tutorial, but you can decide to use any database you like, it doesn't matter.

I have created a database on Postgresql

Details

Database name - Sequelize
Database user - josh
password - \***\*\*\*\*\***
host - localhost i.e this can be a server

We need to go into our `.env` file and add our database details to it, the essence of the .env file is to have access to all details inside it using process.env

We also need to create a new file `.gitignore`, every file or folder specified inside the .gitigore file will not be pushed to the repo when we decide to push it, common files we put inside the .gitigore are node_modules and .env, we don't want people to see all database details so it is wise not to push our .env file.

Our project file structure should look like this at this point.

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

Content of the .env file

```bash
PORT=5000
DATABASE_USER=josh
DATABASE_PASSWORD=password
DATABASE_NAME=sequelize
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
DATABASE_PORT=5432
```

Default Port for Databases
MYSQL - 3306
POSTGRESQL - 5432
MSSQL - 1433
MARIADB - 3306

The Database dialect is the name of the database you decide to use.
Dialect name for other databases.

MYSQL - 'mysql'
MSSQL - 'mssql'
MARIADB - 'mariadb'
POSTGRESQL - 'postgres'
SQLITE - 'sqlite'

Content of the .gitignore file

```js
node_modules.env;
```

The next step is to add our database credential to the config.json file which is inside the config folder

The config.json file will not allow us to use our .env file, we will rename it as config.js, and add the code below.

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

The next step is to update the index.js inside the model folder. Replace the code inside the file with the code below.

```js
"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js");
const db = {};

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
db.Sequelize = Sequelize;

module.exports = db;
```

The next step is to check our connection, the code above checks if the database connection is successful or has an error.

It will log out "success" if it connects successfully, otherwise, it will log out an error.

If the server is currently running, we can stop it using, control C and run the code below.

```bash
node models/index.js
Executing (default): SELECT 1+1 AS result
success
```

We should get the result above if we followed the steps above well.
We have been setting up a project-based environment so that we can be able to start building projects with this knowledge immediately after this tutorial.
It's time to get into Sequelize properly now.

#### Creating Models

Let's build a user model, we will use the `sequelize-cli` power commands to build a user model.

Our user will have a firstName, lastName, age, and any other properties we would like to add.

This brings us to Sequelize Datatypes, we have different datatypes in Sequelize.

We have string, text, integer, bigint, float, real, double, date, boolean, and others. These correspond to data types in databases.

At the point of creating our models, we will need to specify the datatype of the fields of our model.

Let's create our User Model

```bash
sequelize model:generate --name User --attributes firstName:string,lastName:string,age:integer
```

We will get a result that a new Model and a new Migration have been created.

Our project file structure should look like this at this point.

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

When we created our model, two files were added, one was added to the migrations folder, the other was added to the model's folder.

The model shows our data structure while the migrations are instructions on how we want our data to be structured in the database.

Currently, our data is not reflected in the database yet, for that to happen, we need to run our migration.

Every time we create a model or create a migration we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
== 20210727120010-create-user: migrating =======
== 20210727120010-create-user: migrated (0.350s)
```

After running the command above, our user table has been created in the database we specified in the .env file.

So far we have learned the following

- How to install Sequelize
- How to install drivers associated with the different databases.
- Connecting to the database and testing the connection.
- How to use Sequelize CLI. (Ongoing)

The next step is to create a Services folder for our node server API, we will be experimenting with sequelize inside our services, since we have a user model already, we would create a user-service.js file inside our services folder.

Our project file structure should look like this at this point.

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

Add the code below to the user-service.js

```bash
const User = require("../models/index")['User'];

class UserService {



}
```

#### Inserting - Create

This is used to create an instance of the model, it is the combination of the build and save method.

When the create method is used, the data is created in the database.

To create a user from the model we created initially we will need the sequelize `create` method to be able to do this.

If we pass a user object into this createUser method it will create a user in the user table.

```bash
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

Restricting fields that can be created in the model.

```bash
  async createUser(user){
  return await User.create(user, {fields: ['firstName', 'lastName']});
}
```

The code above will not allow the age to be saved to the database, because we have restricted it to save only firstName and lastName.

To test this, run the code below

```bash
node services/user-service.js
```

### Getting - Finders

These finders method uses SELECT query behind the scene.

We have about 5 methods for find operations in Sequelize.

1. FindAll
2. findByPk
3. findOne
4. findOrCreate
5. findAndCountAll

FindAll

The findAll method gets all entries from the table we are working on, in this case, the user table.

```bash
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

We don't need to pass anything to it, User.findAll() will give us all the users in the user table.

To test this, run the code below

```bash
node services/user-service.js
```

FindByPk

This uses the primary key to find the user or the equivalent of what you are looking for.

The findByPk method gets a single entry that is attached to the primary key used.

Our primary key by default is the id field which has been generated by default, we can also set our primary key.

```bash
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

To test this, run the code below

```bash
node services/user-service.js
```

FindOne

This uses any field you indicate in the optional query to get the first entry.

The option query looks like this.

{where: { firstName: 'josh' }}

```bash
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

To test this, run the code below

```bash
node services/user-service.js
```

FindOrCreate

This uses any field you indicate in the query to get the entry or create the entry if it does not exist.

```bash
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

To test this, run the code below

```bash
node services/user-service.js
```

FindAndCountAll

This method combines the findAll and count method. it finds all the entries and also adds the count to the result.

```bash
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

To test this, run the code below

```bash
node services/user-service.js
```

### Updating

update

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

To test this, run the code below

```bash
node services/user-service.js
```

check the User table to confirm, the data has been updated.

### Deleting

destroy

This method can be used to delete existing data.

```bash
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

To test this, run the code below

```bash
node services/user-service.js
```

check the User table to confirm, the User has been deleted.

#### Associations

Associations refer to a relationship between tables.

A relationship can be established between tables when one table uses a foreign key that references the primary key of another table.

A primary key is a unique identifier for a particular table while a foreign key is the field linked to another table primary key when performing associations.

This is the concept behind the relational database.

There are three major types of relationship

1. One to One
2. One to Many
3. Many to Many

##### One to One Association

This association refers to when a record in a particular table is associated with another record in another table, a typical example is that a userId in the user table can only be associated with one user profile in the profile table.

We need two tables to be able to show how this works, we already have a user table created from our User Model, let's create a profile table.

This is an opportunity to practice creating a Model.

```bash
sequelize model:generate --name Profile --attributes height:string,country:string,email:string,userId:integer
```

We will get a result that a new Model and a new Migration have been created.

Every time we create a model or create a migration we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
== 20211022092823-create-profile: migrating =======
== 20211022092823-create-profile: migrated (0.147s)
```

We need to go into the models/profile.js to set our userId as the primary key and set the association. In this case Profile.hasOne(User).

models/profile.js

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

we set the userId as the primary key, we also associated the Profile model with the User model, we referenced the User model foreign key and we also gave our alias (as) a name, this can be anything, we would see the usage soon.

we need to create a profile-service.js file inside our services folder.

services/profile-service.js

```bash
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

The important thing to note here is that the userId points to an existing user.

Another thing to note is that the "include" contains the model we are trying to associate with, another thing we need to add to the include is the "as" alias which mush contains the same "as" alias we have in the profile model.

To test this, run the code below

```bash
node services/profile-service.js
```

Inside our profileService, we have the createProfile and getAll methods which were used to create profile for a user and the other to get all the profiles in the database.

Sample result for one the profile looks like this -

```
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

The user property contains the user information, this is the advantage of the one-to-one association, we can be able to get associated information from another table. The property name was derived from the 'as' that we used in the profile Model.

You can also use the method above to associate the User to the Profile from the User Model.

##### One to Many Association

This association refers to when a record in a particular table is associated with more than one record in another table, a typical example is that a userId in the user table can be associated with many cars in the cars table.

We need two tables to be able to show how this works, we already have a user table created from our User Model, let's create a car table.

```bash
sequelize model:generate --name Cars --attributes color:string,name:string,userId:integer
```

We will get a result that a new Model and a new Migration have been created.

Every time we create a model or create a migration we need to run a migration for it to reflect in the database.

```bash
sequelize db:migrate
== 20211023110522-create-cars: migrating =======
== 20211023110522-create-cars: migrated (0.606s)
```

We need to go into the models/cars.js to set our userId as the primary key, we can also decide to set a one-to-one for the cars. This means can one car can only have one user. Cars.hasOne(user).

models/cars.js

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

To show the one to many relationship, we need to go inside the models/user.js and add user.hasMany(cars);

models/user.js

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

we need to create a cars-service.js file inside our services folder. we will be creating new cars inside this file, remember that the cars will be attached to one user.

services/cars-service.js

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

To test this, run the code below

```bash
node services/cars-service.js
```

We have successfully created our cars, I will advise you to create more than one car so you can see the one-to-many association in action.

We would go into our user-service file to get all users, we should have the property of the car showing all cars belonging to each user.

services/user-service.js

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

To test this, run the code below

```bash
node services/user-service.js
```

Sample result for what the user data looks like this -

```
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

The key takeaway here is that the car's property will contain an array of cars. This means anytime you query for a single user or all users, they will also show the "many" cars if the cars are more than one associated with the user, in case the user has no car, it will return an empty array.

##### Many to Many Association

This association refers to when many records in a particular table are associated with many records in another table. This does not explain anything, stay with me. we have 2 two tables, actor and movie tables. One actor can be in more than one movie, one movie can have more than one actor. Seriously this looks confusing, how do we track this, it sounds like a two-way one-to-many relationship. The only difference is that there is no one unique record on both sides, so we need an additional table to keep track of the actor and movie, let's call the table movieactor. The essence of this table is that for every movie created we can add many actors to it and for every actor created we can add a movie. At this point, let's get back to coding.

We need to create 3 tables, actor, movie, movieactor

```bash
sequelize model:generate --name Actor --attributes name:string
```

```bash
sequelize model:generate --name Movie --attributes name:string
```

```bash
sequelize model:generate --name MovieActor --attributes MovieId:integer,ActorId:integer
```

We will get a result that a new Model and a new Migration have been created for all of them.

Run migration.

```bash
sequelize db:migrate
```

All our models have been created and tables have been added to the database.

We need to update the movie and actor model.

models/actor.js

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

For the many-to-many relationship, we used the belongsToMany, we have something like Movie.belongsToMany(Actor).
we also added the through property, which is pointing to the MovieActor model. We have addressed other properties in the one-to-one and one-to-many.

models/movie.js

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

Now, we need to create movie-service.js and actor-service.js.

services/actor-service.js

```bash
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

To test this, run the code below

```bash
node services/actor-service.js
```

In the actor-service.js, we created an actor, we will need this actor created in the movie-service to explain the many to many, then you can also replicate the many to many in the actor-service.

services/movie-service.js

```bash
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

let actor = await Actor.findOne({
    where : {
        id: 1
    }
})

let data = await movie.addActor(actor);

let oneMovie = await movieService.findOneMovie(1)

console.log(oneMovie);

}

result();
```

To test this, run the code below

```bash
node services/movie-service.js
```

The only thing new here is the addActor method, the many-to-many relationship gives the model access to methods such as addMovie and addActor like we have access to the addActor from the Movie model, we also have access to the addMovie from the Actor model, so after creating a movie, if the actor has been created, you can add the actor to the movie. When we get the movie, either through findOne movie or FindAll, we will see an array of all actors attached to the movie. it is similar to what we see with the one-to-many relationship.

### Conclusion

There are one or two holes along the way, we didn't implement the many-to-many for the actor part, we only did it for the movie part, I purposely left them so you can be able to practice what you are learning.

I hope you found this tutorial useful.

Thank you for reading.

Link to Github repo - https://github.com/Josh4324/sequelize-guide

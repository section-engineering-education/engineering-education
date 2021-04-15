Web applications are handle data from various sources and keeping track of these records can be challenging for administrators. [AdminBro](https://adminbro.com/) is a tool that strives to solve this problem by providing an admin interface to manage all our data from a single panel. It is an open-source Node.js package that adds an auto-generated admin dashboard where we can manage data in a single panel in our applications. This adds the ability to find, monitor, and update the application data during development. Some of the features that AdminBro gives us include form validation, customization, configure role-based access control, and adding extra features to it. In this tutorial, we will set up a working admin interface that can be used to start managing application data in a Node.js application.


### Prerequisites
In this tutorial, you are required to:

1. Have a basic knowledge of the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) Programming Language
   
2. Have a code editor on your system, [VS Code](https://code.visualstudio.com/download) preferably.
   
3. Have a web browser on your system, preferably [Google Chrome](https://www.google.com/chrome/).
   
4. Have [Node.js](https://nodejs.org/en/) runtime installed on your system.

5. Have [MongoDB](https://www.mongodb.com/try/download/community) NoSQL database installed on your system or use a cloud solution such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Setup The Project

To start our project, create a folder named `Express-AdminBro` and open it on your favorite IDE. In my case, I will be using VS Code. Inside this folder, type the command `npm init` to generate an initial package.json for our project.
This command will require some prompts, if you need to skip it, use `npm init -y` instead. In our project, we will need various npm packages from the npm registry.
Below is the npm packages required:

- express: Express is a backend Node.js web application framework for building web applications and APIs.

- mongoose: Mongoose is an asynchronous database driver or Object Data Mapper for MongoDB that connects the application to the database layer and performs query operations.
  
- admin-bro: AdminBro is an admin interface that can be plugged into a Node.js application thus improving the developer experience. By providing database models (like posts, comments, stores, products, etc), AdminBro generates React UI which will allow us (or other trusted users) to manage content.

- @admin-bro/express: `@admin-bro/express` is a plugin that will help us add AdminBro to the Express application.
  
- @admin-bro/mongoose: `@admin-bro/mongoose` is a Mongoose database adapter for AdminBro.

- nodemon: nodemon is a development dependency package. It constantly monitors our applications by automatically restarting the server when any of our application files changes.
  
- tslib : This `tslib` module is a runtime library for TypeScript that contains all of the TypeScript helper functions.
  
- express-session: This is a session middleware and will be required by our Admin panel. 

Next, we will install the packages using `npm`. Run the command :
`npm install express mongoose express-formidable admin-bro`
and the command
`npm install @admin-bro/express @admin-bro/mongoose tslib express-session`

To use AdminBro with other Node.js frameworks, check the [official documentation](https://adminbro.com/docs.html).

To start our Node.js server using Express, we will create the entry file named `server.js`. Add the following code inside the `server.js` file.
```js
const express = require('express');

var app = express();

app.use('/', (req, res)=> res.send("Hello World"));
app.listen(8000, ()=> console.log('Listening to Port 8000'));
```
This is the Express server starter code. We need to import the express package that we installed. The `const app = express()` will create an instance of our application. Having created the express instance, we need to listen to the incoming request in our application. The `app. listen()` method accepts two arguments, a port number and a callback function that is invoked when a connection is established. Before starting the server, we will edit the `package.json` file by adding the following script:

```json
"scripts": {
  "start": "node .serverjs",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
To start our development server, we need to run the command `npm run dev` on the terminal. The application should start at port 8000. Navigating the `localhost:8000/` route (index page) is a route (URI endpoint) that sends a "Hello World" string as the response.

### Starting the Database Connection

Now that we have a basic Node.js server, we will create a database connection and models using mongoose. First, let us establish a database connection in our application. Inside our `Express-AdminBro` application folder, add another folder named `config` and inside it, create a `db.config.js` file. This is the code that establishes the connection to the database using the `mongoose` package:

```js
const mongoose = require('mongoose')

//Database connection
mongoose.connect('mongodb:localhost:27017/AdminBro',
{useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection

module.exports = connection
```

In the above code, the connection to the MongoDB database in Node.js is established by passing the MongoDB connecting string to the mongoose that is imported, this method needs an option object. To check the connection, we export the `connection` that will be tracked in our `server.js` file.

### Creating the MongoDB Models
Mongoose is a package that manages relationships between data and provides schema validation. When using mongoose, models are defined using a Schema interface. The Schema defines the fields stored in the MongoDB documents along with the validation and default values. Schemas will then be transformed into models using the `mongoose.model()` method. The model is what we use to find, create, update, and delete documents of a given type. We will create two models namely, `Customer.js` and `Admin.js`. Add a folder named `models` on our project for our Schemas and `Admin.js` file. The fields and Schema for the `Admin.js` file:

```js
const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    password: String 
});

module.exports = mongoose.model('Admin', AdminSchema)
```

Before creating a model, we have created a schema interface by importing the mongoose module. The `mongoose.Schema` method is instantiated to create the `AdminSchema`. This object takes the values that our MongoDB document will store. The values include:

-  name: This is a string property that will represent the name of the admin in the database model.
  
-  email: A string property field to store the admin email.
  
-  password: password is a field property that will be stored as a string in our database.

Next, let's add the `Customer.js` file as the `Customer` model: 

```js
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

    CustomerName: {
      type: String,
      required: true,
    },  
    CustomerEmail: {
      type: String,
      required: true,
    },

  });
  
module.exports = mongoose.model('Customer',CustomerSchema);
```

### Creating the Admin Panel
Now, we need to create the Express router for handling AdminBro traffic. I will add the entire AdminBro plugin configuration in our `server.js` file. Below is the entire code.

`server.js`

```js
const express = require('express');

const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');


app.get('/', ()=>res.send('Hello World'));

// Database
const connection = require('./config/db.config');

connection.once('open', ()=>console.log('Database connected Successfully'));
connection.on('error',()=>console.log('Error', err));

//Admin Bro and Models
const Customer = require('./models/Customer')
const Admin = require('./models/Admin')

AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
  resources: [Admin, Customer],
}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)

app.listen(8000, ()=>console.log('Listening at Port 8000'));
```
Let's briefly dissect the above code:
To start the admin panel, we have to seed the admin panel with data by connecting our resource database models from the ODM (mongoose) that our app is using. In our case, we are importing the AdminBro’s database adapter for Mongoose and then we register the adapter so that it can be used in the application. Next, we pass the database to the `AdminBro ({})` options object. The model paths have to be at the top of the scope before passing the options. From here, we register the AdminBro adapter for mongoose and build a router for our AdminBro and consume it with `app.use(adminBro.options.rootPath, router)`.

>>> Note: To implement this set up on an app that has an existing middleware stack, we need to make sure that AdminBro is on 
>>>the first in the routing layers. This is because AdminBro cannot handle requests that have been transformed by other middleware.  

### Start the application

At this point, we have the admin interface set up in our application. To ensure that everything is working, make sure that the database and server are up and running. We can now open the browser at `http:localhost:8000/admin` to see the admin dashboard:

[adminBro-browser-test](section-engineering-education/engineering-education/nodejs-adminbro/AdminBro.png).

For the entire source code, check this [github repository](https://github.com/KayveTech/AdminBro-Express).

### Summary
Admin Panels are great for increasing developer productivity by providing a panel to quickly make any database Queries.  However, the Node.js(Express.js) framework does not come bundled with one. If you are a web developer coming from Python/Django background which has a great Admin Panel integrated, this can be a little disappointing. By adding AdminBro to our Node.js applications, we enjoy an amazing set of features, extensibility, and various customization options. I hope you find this tutorial helpful. Happy coding!

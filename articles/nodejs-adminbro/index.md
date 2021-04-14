### How To Create an Admin Panel with Node.js and AdminBro

AdminBro is an open-source package that adds an auto-generated admin interface to manage data in a single panel in Node.js applications during development. This adds the ability to find, monitor, and update the application data during development. Some of the features that AdminBro gives us include form validation, customization, configure role-based access control, and adding extra features to it. In this tutorial, we will set up a working admin interface that can be used to start managing application data in a Node.js application.


### Prerequisites
1. A basic knowledge of [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) Programming Language
   
2. Have a text editor, [VS Code](https://code.visualstudio.com/download) preferably.
   
3. A web browser, preferably [Google Chrome](https://www.google.com/chrome/).
   
4. Have [Node.js](https://nodejs.org/en/) installed on your system.


### Creating the admin panel
We will go through various steps for setting up the admin interface using Express, MongoDB, and the `mongoose` [ORM](). This is a basic introduction tutorial that will give us a general overview of the AdminBro setup in Node.js using Express and MongoDB. To create the admin panel, we need to make sure that we have installed the framework and its related modules that are peer dependencies of the AdminBro framework plugin. In this case, we will install:
 - Express: Express is the Node.js application framework designed for building web applications and APIs.
  
 - admin-bro: AdminBro is an admin interface that can be plugged into a Node.js application thus improving the developer experience. By providing database models (like posts, comments, stores, products, etc), AdminBro generates React UI which will allow us (or other trusted users) to manage content.
  
 - Express-formidable: A Node.js module for parsing form data.
  
 - @admin-bro/express: `@admin-bro/express` is a plugin that will help us add AdminBro to the Express application.
  
 - @admin-bro/mongoose: `@admin-bro/mongoose` is a Mongoose database adapter for AdminBro.
  
 - mongoose: Mongoose is an Object Data Mapper (ODM) that provides a straightforward, schema-based solution to model your application data.
  
 - **tslib** : This `tslib` module is a runtime library for TypeScript that contains all of the TypeScript helper functions.
  
 - **express-session**: This session middleware will be required by our Admin panel.
  
On your terminal, run the command: 
`npm install express mongoose express-formidable admin-bro`
and the command
`npm install @admin-bro/express @admin-bro/mongoose tslib express-session`
 To use the AdminBro in various Node.js applications, check the [official documentation](https://adminbro.com/docs.html).


#### Setting up the router middleware
To handle the AdminBro traffic in our server, we need to create a route. Below is the code that implements the route in the entry `server.js` file:
```js
const AdminBro = require(‘admin-bro’)
const AdminBroExpress = require(‘@admin-bro/express’)

const express = require(‘express’)
const app = express()

const adminBro = new AdminBro ({
    Databases: [],
    rootPath: ‘/admin’,
})

const router = AdminBroExpress.buildRouter (adminBro)
The next step is to set up the router as middleware using the Express.js app object:

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log(‘AdminBro is under localhost:8080/admin’))
```
>>> Note: To implement this set up on an app that has an existing middleware stack, we need to make sure that AdminBro is on the
>>>  first in the routing layers. This is because AdminBro cannot handle requests that have been transformed by other middleware.

### Connecting the backend resources
Now, we will seed the admin panel with data by establishing a connection to our database resources. This setup process should be repeated for each one of the ORMs that we draw application data from. In our case, we will use Mongoose to interact with the data
### Summary
Admin panel is a useful tool in. Happy coding!

### Introduction

Express is a backend development framework built on top of Node.js, it enables the implementation of the client-server architecture. With its flexibility, it allows for the customization of the API endpoints, consequently, fitting our needs.  

In this tutorial, I'll show you how to build RESTful APIs using the Node.js Express framework, test them locally using docker-compose. We'll then proceed to deploy this application to the cloud.  

### Table of contents

- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Node.js application setup](#Node-application-setup)
- [Express packages setup](#express-packages-setup)
- [RESTful APIs implementation](#restful-apis-implementation)
- [Dockerizing the Express application](#dockerizing-the-express-application)
- [Setup YAML service to deploy Dockerized Node Express application](#setup-yaml-service-to-deploy-dockerized-node-express-application)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites

To follow along with this tutorial, you need the following:

- [Node.js](https://node.org) downloaded and installed in your local development environment.
- Basic knowledge in Node.js' Express framework.
- RESTful APIs design.
- Basic knowledge in [Docker](#https://hub.docker.com)

### Objectives

By the end of this article, you should be able to create a complete dynamic Express application and deploy it to the cloud using Docker.

### Node application setup

Let's start by importing required modules and create a running server:  

```js
//this node application is located in the index.js file
const http = require("http");

http.createServer(function (req, res) {
  
   res.writeHead(200, {'Content-Type': 'text/plain'});
 
   res.end('Hello World\n');
   
}).listen(8000);

console.log('Server started at http://127.0.0.1:8000/');
```

Now execute this application by running the command on the command line:

```bash
node index.js
```

Execution output:

```bash
The server started at http://127.0.0.1:8000/
```

### Express packages setup

Add the following contents in your `server.js` script:

```javascript


const express    = require('express');      
const app        = express();                
const bodyParser = require('body-parser');
// import the student schema defined in the student.js file
const  Student = require('./models/student'); 
//register router middleware
const router = express.Router();  


app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

const port = process.env.PORT || 8000;        

const config = require('./config');

const mongoose = require('mongoose');

mongoose.connect(config.db[app.settings.env]);  


```

In the above script, we import the Express package. Additionally, we import packages that will aid in running our Express application and setting up a connection to the database.  

Now that we have got a connection to the MongoDB database server, let's define the model that we will use to get the list of students from a school database.  

```javascript

const mongoose     = require('mongoose');  
const Schema       = mongoose.Schema;

const StudentSchema   = new Schema({  
    student_id: String,
    name: String,
    registration_number: String,
    course: String,
    year_of_study: Number,
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Student', StudentSchema);  

```

In the above model, we set up the student details we will be getting via our API.

### RESTful APIs implementation

Now that we've set up our model and server file, in this section, let's implement our RESTful APIs and deploy our application to the cloud.

```javascript

router.get('/students/:student_id', function(request, response) {  
    Student.findOne({student_id: request.params.student_id}, function(err, Student) {

        if (err) 
        {
        response.status(500);

        response.setHeader('Content-Type', 'application/vnd.error+json');
        response.json({ message: "An error occurred, unable to get student details"});

    } 
    else if (Student == null) 
    {

        response.status(404);
        response.setHeader('Content-Type', 'application/vnd.error+json');
        response.json({ message: "ProductQuantity not found for product_id "+request.params.student_id});

    } 
    else 
    {

        response.status(200);
        response.setHeader('Content-Type', 'application/hal+json');

        let student_resource = halson({
        student_id: Student.student_id,
        name: Student.name,
        course: Student.course,
        year: Student.year_of_study,
        registration_number: Student.registration_number,
        created_at: Student.created_at
        }).addLink('self', '/students/'+Student.student_id)
        //response
        response.send(JSON.stringify(student_resource));

    }
    });    
});

// let's now register our routes
app.use('/', router);

// now start the server on port 8000

app.listen(port);  
console.log('Starting server on port ' + port);  


```

### Dockerizing the Express application

Now that we've defined our core application API logics, let's proceed to our main aim of the tutorial, dockerizing your RESTful Node Express application.

> This section assumes you have Docker up and running in your Ubuntu machine.

Let's proceed and define the contents of the `Dockerfile` to direct docker on how to build a container image of our Express application.  

```dockerfile
# the base image from which the app is built upon
FROM node: latest 
# Runs the mkdire command to create /usr/src/app inside docker container
RUN mkdir -p /usr/src/app  
# Sets the work directory to /usr/src/app 
WORKDIR /usr/src/app  
# Copies the contents of the current directory into the working directory inside the # docker container
COPY . /usr/src/app
# Exposes port 8000 outside the docker container
EXPOSE 8000  
# Runs the npm install command to install dependencies
RUN npm install  
# Provides the command required to run the application
CMD ["npm", "start"]  

```


This `Dockerfile` uses npm to install modules in our RESTful application.  
Let's now proceed and set up the docker-compose configuration file that we'll use to launch the Node Express application (including the MongoDB instance).

```yml
-------------------------
# Service name
student:  
# build in the current directory
  build: .
  # command to run the app
  command: npm start
  # Maps port 8000 inside docker container to port 8000 outside docker container
  ports:
  - "8000:8000"
  # linking the student to mongodb container
  links:
  - mongodb
  # env variables
  environment:
    - NODE_ENV=production
    - MONGODB_ADDRESS=mongodb
# mongodb service
mongodb:  
  # pulling mongodb image
  image: mongo

```

### Setup YAML service to deploy Dockerized Node Express application

Now that we've dockerized our application locally, the next step involves deploying the application to the cloud.  

Let's proceed and set up the service to deploy the app as shown below

```yml
//service.yaml file
-----------------------------
services:

  inventory:
    git_url: git@github.com:myexample.git
    git_branch: main
    command: npm start
    build_root: .
    ports:
      - container: 8000
        http: 80
        https: 443
    env_vars:
      NODE_ENV: production

databases:  
  - mongodb
```

> Note, ensure you change your git URL in the above service.

You can now log in to your favorite cloud vendor to deploy your dockerized application.

### Conclusion

In this tutorial, we've covered the key concepts of Node.js Express application RESTful APIs. We discussed how we can dockerize this application locally using Docker and deploy it to the cloud.

### Further reading

- [Docker Installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [docker hub](https://hub.docker.com)
- [More on dockerizing application](https://blog.cloud66.com/deploying-rest-apis-to-docker-using-ruby-and-sinatra/)

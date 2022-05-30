---
layout: engineering-education
status: publish
published: true
url: /build-mern-stack-application-to-manage-isp/
title: Building a MERN Stack Application to Manage ISP
description: In this guide, we will learn to build a MERN stack web application using MongoDB, ExpressJS, ReactJS, and Node.js to build a customer management portal to manage ISPs.
author: bernice-waweru
date: 2022-05-30T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/build-mern-stack-application-to-manage-isp/hero.jpg
   alt: Build a MERN stack application to manage ISP Hero Image
---
In this tutorial, we will learn how to build a full-stack web application using MongoDB, ExpressJS, ReactJS, and Node.js (commonly referred to as MERN stack).
<!--more-->
We will build a customer management system for Internet Service Providers (ISPs), where a user can create, read, update, and delete customer information.

ISP offers internet access to the customers along with services like network access, Wi-Fi installation, and so on. For organizations to manage such a large number of internet providers, we will build a platform to handle their customers and keep track of accurate business records.

You can learn more about ISPs [here](https://en.wikipedia.org/wiki/Internet_service_provider).

The tutorial aims to provide foundational knowledge on how to create a MERN stack application through a real-life project.

### Prerequisites
To follow along with this tutorial, the reader should have the following:
- An understanding of JavaScript.
- Basic knowledge of ReactJS and Node.js.
- Basic knowledge of MongoDB.
- You should also have [Node.js](https://nodejs.org/en/download/) installed on your machine.

### Backend
To begin with, let's start to build the backend. Our web application will consists of a client, a server, and a database. 

You can find the architecture below:

![Web Architecture](/engineering-education/build-mern-stack-application-to-manage-isp/webapp.jpg)

We will handle all the backend functionality of our app using a [REST API](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/) that we will create using Node.js, ExpressJS, and MongoDB.

- **MongoDB:**  A NoSQL database that uses a document-oriented data model.
- **ExpressJS:** A web application framework used to build APIs.
- **Node.js:** A JavaScript runtime environment used to build servers and applications.

#### Setup the environment
Let us first set up the development environment.

Create a new folder and navigate to it, by running the following commands on a terminal:

```bash
mkdir api
cd api
```

Then, run `npm init --y` to create a starter package that contains `package.json` with all the dependencies that we need to run the app.

> The `package.json` file gets updated as we install more project dependencies.

Then, we install Mongoose, Express, and MongoDB using the following command:

```bash
npm install express mongodb mongoose --save
```

Here, we use Express to set up a Node server. MongoDB will be our database, and mongoose enables us to define models and connect to the database.

To share resources from the server to the client, we install `cors` to handle the cross-origin resource sharing.

To install `cors` run this command on the terminal.

```bash
npm install cors
```

The `cors` package enables the server to share its resources only with clients on a different domain.

You can learn more about CORS [here](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

Then, we install `nodemon` to run the server continuously for every change we make.

```bash
npm install nodemon --save-dev
```

Now, we change the start file to `index.js`. To do that, change the scripts in `package.json` to:

`"devStart": "nodemon index.js"`

Also, we install `dotenv` package to handle the variables from a `.env` file as shown:

```bash
npm install dotenv --save-dev
```

#### Setup the server
Create a `.env` file within the server folder. Here, we will add the database URL that we will connect to and a port to listen for new connections.

The `.env` file allows us to define environment variables that remain constant throughout a given development stage. It also helps in keeping the credentials safe, as you can include it in the `.gitignore` file.

Using the `.env` file allows us to use different environment variables for different environments.

Add the following to the `.env` file as shown:

```.env
DATABASE_URL = mongodb://localhost/customers
PORT = 5000
```

Now, create `index.js` to set up the server as shown:

```javascript 
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5010
```

In the code above:
- Load the environment variables from the `.env` file by configuring the `dotenv` package.
- The environment variables will be loaded into the `process.env` object. 
- Import the `mongoose` package and load the `PORT` variable.

Then, we import the ExpressJS library `express` and initialize a new ExpressJS application as shown:

```javaScript
const express = require('express')
const app = express()
```

We will also import `cors` and enable the `app` to use the CORS middleware:

```javascript
const cors = require('cors')
app.use(cors())
```

Now, add `express.json()` method to parse the HTTP request body and listen for new connections on port `5000`.

```javascript
app.use(express.json())
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
```

In the above code:
- `app.use(express.json())` is a middleware function that parses incoming JSON requests and puts the parsed data in `req.body`.
- `app.listen()` listens to the connections on the specified port and executes the callback function we pass.

Now, let's create a connection to the database as shown:

```javascript
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
```

In the above code:
- We use the `mongoose.connect()` method to connect to MongoDB by passing the database URL and options passed to the MongoDB driver.
- Include `useNewUrlParser` and `useUnifiedTopology` to avoid deprecation warnings that are printed by mongoose.`connect()` by default.

> Setting `useNewUrlParser` to `true` and `useUnifiedTopologyto` to `true` prevents the deprecation warnings in the MongoDB driver. Learn more about other deprecation warnings [here](https://mongoosejs.com/docs/5.x/docs/deprecations.html).


Then, we listen for the connect event to determine if the connection is successful.

```javascript
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
```

In the above code, `open` and `error` are connection events triggered when something happens to the connection.

If we come across an error in the connection, we log it to the console and log a success message once the connection occurs.

#### Schema definition
Now, let us create the database models and schema.

The database model defines the logical design and structure of a database, including how the data is stored, accessed, and updated.

The schema describes the fields that you will have in a document. MongoDB is a document-oriented database.
It contains the attributes of an object in the database.

- Create a `models` folder with a `Customer.js` file that contains our customer schema.
- Import mongoose and create a new schema as shown:

```javascript
const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({

})
```

- Add the following fields inside the `customerSchema` object.

```javascript
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,

    },
    subscribedToPackage: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
```

- The `customerSchema` has the `name`, `email`, `location`, `subscribedToPackage`, and `subscribeDate` fields.
- Then, we export the model.

By exporting the model, we will make the model available to other files in our application.

```javascript
module.exports = mongoose.model('Customer', customerSchema)
```

- Now we can compile the schema into a model and export it.

#### Setup API endpoints
API endpoints are URLs that provide the location of different resources on the server. The endpoints allow the API to receive requests and send responses.

In this tutorial, we will work with the `POST`, `GET`, `PATCH`, and `DELETE` HTTP methods.
- The `POST` request is used to send data to the server.
- The `GET` request is used to retrieve data from the server.
- The `PATCH` request is used to update data.
- The `DELETE` request is used to delete the specified resource.

Now, let's start building the endpoints.

- Create a `routes` folder with `customers.js` file inside this folder.
- Import `express` and create a new router object using `express.Router()` to handle the HTTP requests.

You can learn more about `express.Router()` [here](https://expressjs.com/en/guide/routing.html).

```javaScript
const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')
```

- We will also use [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to identify if the HTTP request has been executed successfully.
- Add a route to get all customers.

You can get all the customers using `find()` that returns all instances.

```javaScript
// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
```

- Use the `router.get()` to retrieve information. If the request is successful, we return the customers in JSON format, otherwise we use the status code `500` to indicate that the server has encountered an error.

- Add a route to create a new customer.

```javaScript
// Creating one
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        subscribedToPackage: req.body.subscribedToPackage
    })
    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
```

- To add a new customer, we use `router.post()` to accept the specified URL, and the route handler. The route handler accepts the request object and the response object as parameters.
- Set the values in the `Customer` model to the values in `request.body` which are the details supplied by the customer from the frontend.
- We use the status code of `200` when a request is successful and `400` when it is unsuccessful.
- Use `save()` to save the customer to the database.

Then, we create a helper function to get the customer by ID. We will use this function to avoid repetitive code.

Use `findById()` to get the customer by the specified ID as shown:

```javascript
async function getCustomer(req, res, next) {
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customer = customer
    next()
}
```

The function gets the customer by ID and then calls `next()`.

> `next()` is a callback function that passes the handler to the next route handler in the route path.

- Use the `404` status code to indicate that a resource cannot be found on the server. The `500` status code indicates if an error occurs on the server and the error message is returned in JSON format.

- Add a route to get one customer. We use the `getCustomer()` function that we defined earlier.

```javascript
// Get one customer
router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer)
})
```

- Add a route to update a customer's details. Set the values in the `request.body`, and then use `save()` to save the new details to the database.

```javascript
// Update
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
        res.customer.name = req.body.name
    }
    if (req.body.email != null) {
        res.customer.email = req.body.email
    }
    if (req.body.phoneNumber != null) {
        res.customer.phoneNumber = req.body.phoneNumber
    }
    if (req.body.location != null) {
        res.customer.location = req.body.location
    }
    if (req.body.subscribedToPackage != null) {
        res.customer.subscribedToPackage = req.body.subscribedToPackage
    }
    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
```

- For each field, we check if it is `null` and update it accordingly. Use the `save()` method to save the updated details.
- The `400` status code indicates that an error occurred on the client-side when sending the HTTP request.

Now, add a route to delete a customer.

```javascript
// Delete
router.delete('/:id', getCustomer, async (req, res) => {
    try {
        await res.customer.remove()
        res.json({ message: 'Deleted Customer' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
```

- Use the `remove()` method to delete the customer and show a success message if the response is completed successfully.
- The status code `500` indicates an error on the server.
- Export the router.

```javaScript
module.exports = router
```
- Add the routes to `index.js`.

Import router from `customers.js` in the `routes` folder to make it available for use when we pass the HTTP requests.

```javascript
const customersRouter = require('./routes/customers')
app.use('/customers', customersRouter)
```

#### Run the server
Run `nodemon index.js` to test if everything in the backend is working.

If the server is set up successfully, we will get the following output:

![Server running](/engineering-education/build-mern-stack-application-to-manage-isp/server.jpg)

### Frontend
To build the frontend, we will use ReactJS, one of the most popular JavaScript libraries.

Our user interface will consist of three pages that help the admin manage the customer details.

We will build a form to submit customer details, a table to display all the customers, and allow the ISP to delete or update customer details.

We will also build a form to allow editing customer details.

#### Setup
Run this command in your terminal to get all the boilerplate code that we need to run our React app. 

```bash
npx create-react-app ui
```

Navigate to the `ui` folder and run `npm start` as shown:

```bash
cd ui
npm start
```

React application is running on port `3000`. You can view it on your browser at `http://localhost:3000/`.

![React App](/engineering-education/build-mern-stack-application-to-manage-isp/reactapp.jpg)

Remove some of the boilerplate files that we do not need. Now, the folder structure should look like this:

![folder structure](/engineering-education/build-mern-stack-application-to-manage-isp/folder.jpg)

Let us install some dependencies that we will need to run our app successfully.

We will use [Material UI](https://mui.com/getting-started/usage/) for styling the webpage:

```bash
npm install material-ui/core
```

We will also need `Axios` to send HTTP requests to our backend on port `5000`. Install Axios using:

```bash
npm install axios
```

#### Create routes
- Create the routes in our react app to ensure that we render the desired page for a given path. The routes correspond to the components.

We will rely on `react-router-dom` to navigate to different pages of our app using the `BrowserRouter`, `Router`, and `Route` packages.

You can learn more about `react-router-dom` [here](https://v5.reactrouter.com/web/guides/quick-start).

In `App.js`:

```JavaScript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateCustomer from './components/createCustomer';
import CustomerList from './components/customerList';
import EditCustomer from './components/editCustomer';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/customer" element={<CreateCustomer />} />
                <Route path='/customerlist' element={<CustomerList />} />
                <Route path='/edit/:id' element={<EditCustomer />} />
                <Route exact path='/' element={<CreateCustomer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

In the above code:
- Import `BrowserRouter`, `Router`, and `Route` from `react-router-dom` to route and navigate to different pages.
- Import the components from the `components` folder.
- Create Routes for different components by specifying the path and element to be rendered.

> Exporting the app makes it available to `index.html`, which is the main HTML page of our app.

#### Create components
React apps are made of different reusable components. Our app will have three main components:
1. `createCustomer`
2. `editCustomer`
3. `customerList`

Create a `components` folder under the `src` folder and add `createCustomer.js`, `editCustomer.js`, and `customerList.js` files inside it.

##### createCustomer component
This component will render a form that allows user to submit their details. We will use Material UI's `Grid`, `Paper`, `TextField`, and `Button` components to create our customer details form.

In the `createCustomer.js` file, let us create the form as shown:

```javascript
import React from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import Select from '@material-ui/core/Select';

export default function CreateCustomer() {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight:"800" }
    const marginTop = { marginTop: 15 }
    return (
    <Grid>
        <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
                <h2 style={headerStyle}>Customer Details</h2>
                <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
            </Grid>
            <form>
                <TextField style={marginTop} id="name" fullWidth label='Name' placeholder="Enter your name" />
                <TextField style={marginTop} id="email" fullWidth label='Email' placeholder="Enter your email" />
                <TextField style={marginTop} id="phoneNumber" fullWidth label='Phone Number' placeholder="Enter your phone number" />
                <TextField style={marginTop} id="location" fullWidth label='Location' placeholder="Apartment,City" />
                <Select style={marginTop} id="subscription" fullWidth label="Subscription" placeholder="Subscription" ></Select>
                <Button type='submit' variant='contained' color='primary' style={marginTop}>Submit</Button>
            </form>
        </Paper>
    </Grid>
    )
}
```

From the above code:
- Import `Grid`, `Paper`, `Typography`, `TextField`, `Button`, and `Select` component from Material UI.
- Inside the component, define the CSS styles to be applied to the Material UI components.
- Create the form using the `Textfields`, `Select`, `Button`, and add the CSS styles to each element.

For the `Select` field, we need to supply some options for the users to choose from the available subscriptions offered by the internet service provider.

Add the following code to the `createCustomer.js` file:

```javascript
const options = [
    {
        label: "5 Mbps",
        value: "5 Mbps",
    },
    {
        label: "10 Mbps",
        value: "10 Mbps",
    },
    {
        label: "20 Mbps",
        value: "20 Mbps",
    },
    {
        label: "40 Mbps",
        value: "40 Mbps",
    },
];
```

- The options represent the subscription packages offered by the ISP.

To display these options in the select field, map through the array using `map` as shown:

```javascript
{options.map((option) => (
    <option value={option.value}>{option.label}</option> 
    ))
}
```

The select field should have the following code:

```javascript
<Select style={marginTop} id="subscription" fullWidth label="Subscription" placeholder="Subscription" >
{options.map((option) => (
    <option value={option.value}>{option.label}</option>
    ))}
</Select>
```

##### customerList component
This component will display a list of all the customers and their details. We use Material UI's `Table` component to display the customer details and offer the internet service provider options to update customer details or delete a customer.

In `customerList.js`, let us create the table by adding the following code:

```javascript
import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export default function CustomerList() {
    return (
        <>
        <h1 style={{ margin:"20px 0 20px 50px" }}>All Customers</h1>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" fontWeight="bold"> Name </TableCell>
                        <TableCell align="center" fontWeight="bold"> Email </TableCell>
                        <TableCell align="center" fontWeight="bold"> Phone Number </TableCell>
                        <TableCell align="center" fontWeight="bold"> Location </TableCell>
                        <TableCell align="center" fontWeight="bold"> Subscription Package </TableCell>
                        <TableCell align="center" fontWeight="bold" colSpan={2}> Action</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        </>
        );
}
```

From the above code:
- Import `Table`, `TableCell`, `TableContainer`, `TableHead`, `TableRow`, `Paper` from Material UI, which will be used to create a table of all the customer details.
- Create an outline of the table inside the `TableContainer` component, with each `TableCell` representing a column in the table.

So far, we have defined the structure of the table, which will be populated by customer data from the database. We will implement this later in our app while connecting the frontend to the backend.

##### editCustomer component 
This component will render a page that will help us update customer details. It will be pre-populated with the customer details of the selected customer allowing the ISP to make only the needed changes.

The component is similar to the `createCustomer` component but has different functionality.

In `editCustomer.js` include the following code:

```JavaScript
import React from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'

export default function EditCustomer(props) {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Update Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Edit the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" fullWidth label='' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" fullWidth label='' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" fullWidth label='' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" fullWidth label='' />
                    <TextField style={marginTop} id="subscription" fullWidth label='' />
                    <Button type='submit' variant='contained' color='primary' style={marginTop} > Update </Button>
                </form>
            </Paper>    
        </Grid>
        )
    }
```

In the above code:
- Import `Grid`, `Paper`, `Typography`, `TextField`, `Button` from Material UI, define the CSS styles and apply them to each element in the form.

We will make additional changes to pre-populate the fields and create the update functionality.

### Connect frontend to backend
The goal is to send the customer data from the UI to the database and fetch data to perform CRUD operations.

#### createCustomer component
Let's begin with posting customer details in the `createCustomer` component. We need to manage the state of different variables storing our customer details. Therefore, we will use the `useState` react hook, because we are using functional components.

The `useState` hook takes the initial state of the customer details and returns the current state and the `setCustomer` function, which updates the state.

In `createCustomer.js`, add the following code:

```javascript
import {useState} from 'react'
const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location:"",
    subscribedToPackage: "",
    });
```

- Set the initial state of the customer details to empty strings.
- Create a function to handle the post request using Axios.

```javascript
import axios from "axios"
const createCustomer = () => {
    axios.post("http://localhost:5000/customers", customer).then(() => {
        window.alert('Successfully Registered')
        window.location.reload(false)
        })
    };
```

- Use `axios.post()` for the HTTP request to create an alert upon successful registration.

The `createCustomer()` function is called when the `onClick()` event occurs on the submit button.

The state is updated when the `onChange()` event is triggered in the text fields in our form.

Edit the form in `createCustomer.js` to include the following code:

```javascript
<form>
    <TextField style={marginTop} id="name" value={customer.name} 
    onChange={(e) => setCustomer({...customer, name: e.target.value })} 
    fullWidth label='Name' placeholder="Enter your name" />
    <TextField style={marginTop} id="email" value={customer.email} 
    onChange={(e) => setCustomer({ ...customer,email: e.target.value })}
    fullWidth label='Email' placeholder="Enter your email" />
    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber} 
    onChange={(e) => setCustomer({ ...customer,phoneNumber: e.target.value })}
    fullWidth label='Phone Number' placeholder="Enter your phone number" />
    <TextField style={marginTop} id="location" value={customer.location} 
    onChange={(e) => setCustomer({...customer,location: e.target.value })}
    fullWidth label='Location' placeholder="Apartment,City" />
    <Select style={marginTop} id="subscription" value={customer.subscribedToPackage} 
        onChange={(e) => setCustomer({ ...customer,subscribedToPackage: e.target.value })}
        fullWidth label="Subscription" placeholder="Subscription" >
        {options.map((option) => (
        <option value={option.value}>{option.label}</option>
        ))}
    </Select>
    <Button type='submit' variant='contained' color='primary' style={marginTop} 
    onClick={createCustomer}>Submit</Button>
</form>
```

- `setCustomer` updates the current state of each field in the form.
- When the state is updated, the entire state gets overwritten. Thus, the fields would be removed from our state when one of the customer details is updated.
- Use the spread operator (`...`) to update only one field at a time and maintain the state. 

Run `npm start` in your terminal

> The server should still be running on port `5000`.

Our CreateCustomer component renders out as follows when we navigate to `http://localhost:3000/` or `http://localhost:3000/customer` as shown:

![createCustomer](/engineering-education/build-mern-stack-application-to-manage-isp/customerDetails.jpg)

#### customerList component 
The list of customers from the database will make up our table body in the rendered by the customerList component.

- Declare state variable and fetch the data from the database.

The `useEffect` hook is used to fetch data and set the data in the local state of the component.

```javascript
const [customerList, setCustomerList] = useState([]);
useEffect(() => {
    axios.get("http://localhost:5000/customers").then((allCustomers) => {
        setCustomerList(allCustomers.data)
    })
}, [])
```

- Set the initial state of the customer list to an empty array using `useState`.
- Use `axios.get()` to make a `GET` request to retrieve all customers from the database.
- Use `setCustomerList` function to update the state of the `customerList` and populate it with the data retrieved from the database.

In the `Action` column in our table, one can delete or update customer details.

- To update the customer, link this to the `editCustomer` component using react-router-dom's Link.
- To delete a customer, use the `axios.delete()` method to delete a customer based on their `id`, which is a unique number generated by MongoDB.

```javascript
import { useEffect,useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const deleteCustomer = (id) => {
    axios.delete(`http://localhost:5000/customers/${id}`).then(() => {
        window.location.reload(false)
    })
}
```

- Use `axios.delete()` to send a `DELETE` request and remove a customer from the database.

To display the customer list, add the table body component and iterate through the list returned from the database.

```javascript
<TableBody>
{customerList.map((customer, key) => (
    <TableRow key={customer.key}>
    <TableCell align="center" component="th" scope="row">{customer.name}</TableCell>
    <TableCell align="center">{customer.email}</TableCell>
    <TableCell align="center">{customer.phoneNumber}</TableCell>
    <TableCell align="center">{customer.location}</TableCell>
    <TableCell align="center">{customer.subscribedToPackage}</TableCell>
    <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} 
    component={Link} to={`/edit/${customer._id}`}> Edit </TableCell>
    <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} 
    onClick={() => deleteCustomer(customer._id)}> Delete </TableCell>
    </TableRow>
    ))}
</TableBody>
```

- Map the `customerList` array to display each customer's details in a row and populate the table columns.
- Use the Link element from `react-router-dom` to link the update action to the editCustomer component by specifying the `/edit/:id` path, which we included in our routes in `App.js`.

Run `npm start`.

Our `CustomerList` component renders out as follows when we navigate to `http://localhost:3000/customerlist`:

![customerList](/engineering-education/build-mern-stack-application-to-manage-isp/allcustomers.jpg)

So far, we have achieved the `CREATE`, `READ`, and `DELETE` functionalities.

#### editCustomer component
Use `axios.patch()` method to update customer details after getting the specified customer by `id`. Use the `useParams()` hook to access URL parameters and extract the `id` used to pre-populate the fields in the editCustomer form.

Set customer variable and get customer by `id` as shown:

```javascript
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';

const [customer, showCustomer] = useState([]);
const { id } = useParams()
useEffect(() => {
    axios.get(`http://localhost:5000/customers/${id}`).then((customer) => {
        showCustomer(customer.data);
   })
}
```

- Set the initial state of the customer details to an empty array and set the id to the id retrieved by `useParams()` from the supplied URL.
- Use the `useEffect` hook and `axios.get()` to make a `GET` request based on the `id` and update the customer details with the information from the database.

This renders a pre-populated form.

```javascript
const updateCustomer = () => {
    axios.patch((`http://localhost:5000/customers/${id}`), customer).then((customer) => {
        showCustomer(customer.data)
        window.alert('Successfully Edited')    
    })
}
```
- Create the `updateCustomer()` function, which uses `axios.patch` to send a `PATCH` request and update details in the database.
- Update the state using the `showCustomer()` function such that the current state holds the customer details in the database.

Include the following in the **Update** button in `editCustomer.js` to call the ``updateCustomer()`` function as shown:

```javascript
onClick={updateCustomer}
```

Edit the `editCustomer.js` file to include the following code in the form:

```javascript
<form>
    <TextField style={marginTop} id="name" value={customer.name} onChange={(e) => showCustomer({ ...customer, name: e.target.value })}
    fullWidth label='' placeholder="Enter your name" />
    <TextField style={marginTop} id="email" value={customer.email} onChange={(e) => showCustomer({ ...customer, email: e.target.value })}
    fullWidth label='' placeholder="Enter your email" />
    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber} onChange={(e) => showCustomer({ ...customer, phoneNumber: e.target.value })}
    fullWidth label='' placeholder="Enter your phone number" />
    <TextField style={marginTop} id="location" value={customer.location} onChange={(e) => showCustomer({ ...customer, location: e.target.value })}
    fullWidth label='' />
    <TextField style={marginTop} id="subscription" value={customer.subscribedToPackage} 
    onChange={(e) => showCustomer({ ...customer, subscribedToPackage: e.target.value })}
    fullWidth label='' />
    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={updateCustomer}>Update</Button>
</form>
```

- Update state the `showCustomer()` function to capture changes when the `onChange` event is triggered in the textfields.
- Set each field to the value supplied upon a change in the text field.
- Use the spread operator to avoid removing the state of the different fields in the customer array. 

Run `npm start`.

The `EditCustomer` component renders a page when we click on the edit action on the `customerlist` page as shown below:

![EditCustomer](/engineering-education/build-mern-stack-application-to-manage-isp/updateCustomer.jpg)

### Conclusion
In this tutorial, we successfully learned how to create a full-stack management system for ISPs.

In summary, we have learned:
- How to create REST API in Node.js, Express, and MongoDB
- How to create a user interface with React.
- How to connect the server and client using Axios and React hooks.

You can access the complete project [here](https://github.com/wanguiwaweru/MERN-STACK).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

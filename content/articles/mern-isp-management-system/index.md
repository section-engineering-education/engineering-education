# How to build an Internet Service Provider Management System using MERN Stack.

In this tutorial, we will learn how to integrate our knowledge of various technologies, including MongoDB, Express, React, and Node.js, to create a functional web application.
Internet Service Providers (ISPs) need an informative and dynamic platform to manage their customers and ensure accurate business records.

We will build a management system that allows ISPs to create, read, update and delete customer information. The ISPs can also retrieve records on the payment status of various customers. The main aim of this tutorial is to provide foundational knowledge on how to create a MERN stack application through a real-life project.

## Table of Contents

- [Setting Up the Backend](#chapter-1)

- [Setting Up the Frontend and Connecting it to the Backend](#chapter-2)

- [Conclusion](#chapter-3)

## Prerequisites

1. An understanding of JavaScript.
2. Basic knowledge of React and Node JS.
3. Basic knowledge of MongoDB.
4. You should also have [Node](https://nodejs.org/en/download/) installed on your machine and have a tool for testing API endpoints such as [Postman](https://www.postman.com/downloads/).

## Setting Up the Backend<a name="chapter-1"></a>

We will handle all the backend functionality of our app using a REST API created using Node, Express, and MongoDB.

### Setting up Development Environment

Let us first set up our development environment.
Create a new folder.

`mkdir api`

Enter the directory

`cd api`

Inside this folder, run `npm init--y `to get a starter package.json which will contain all the dependencies we will need to run the app.
Our package.json file gets updated when we install various dependencies.
We need to install express to set up a node server. 
`npm install express`
Then we install MongoDB, which will enable us to connect to the database, and mongoose, which we will use for defining models.

`npm install mongodb`
`npm install mongoose`

We will be sharing resources from the server to the client; therefore, we install cors to handle cross-origin resource sharing.

`npm install cors`

We will install nodemon to run our server automatically when we make changes.

`npm install nodemon --save-dev`

We have to change the scripts in package.json to 
`"devStart": "nodemon index.js"`
We will also install dotenv to handle our variables from a .env file.

`npm install dotenv --save-dev`

Note that nodemon and dotenv are in our development dependencies.

### Setting up the Server

Create a .env file with the following code.

```
DATABASE_URL = mongodb://localhost/customers
PORT = 5000
```
Let us create index.js and add the following code.

```JavaScript
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5010;

app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))

```

First, we import all the libraries we installed.
We define the app variable as an instance of express, which we will use to configure our server.

app. use() allows us to use the different libraries needed, including `app. use(express.json())`, which is a middleware function that parses incoming JSON requests and puts the parsed data in req. body.
app. listen()listens to the connections on the specified port and executes the callback function we pass.
process.env allows us to access environment variables 

To establish a connection to the database, add the following code:

```Javascript
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
```

Now let us define the database models. Create a models folder and inside the folder, create a Customer.js file which will contain our customer schema.

```JavaScript
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Customer', customerSchema)

```
The schema contains the customer's properties which are defined as a JavaScript object where we specify the data type and whether a field is required.


### Setting up API Endpoints

We need to set up the API endpoints to handle our HTTP requests. We are interested in the POST, GET, PATCH and DELETE methods.

Create a routes folder and customers.js file inside this folder.

```JavaScript
const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

module.exports = router
```

We use express.Router() to create a router module that we can load in the main app in index.js 

- Add a route to get all customers

```JavaScript
// Getting all
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
```

- Add a route to create a new customer

```JavaScript
// Create customer
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
We will use a helper function to avoid repeating code for the routes where we need to get the customer by ID.

```JavaScript
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

- Add a route to get one customer

```JavaScript
// Get one customer
router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer)
})
```

- Add a route to update a customer's details

```JavaScript
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

- Add a route to delete a customer.

```JavaScript
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

Run `nodemon index.js` to test if everything in our backend is working.
We will get the following output.


![Server running](/mern-isp-management-system/server.png)

## Setting up the Frontend<a name="chapter-2"></a>

For our frontend, we are using React, one of the most popular JavaScript libraries.

To get us started, we run this command to get all the boilerplate code we need to run our React app. 

`npx create-react-app ui`

Let us install some dependencies. We will be using Material UI for our styling, so we need to install it.

`npm install material-ui/core`
We will also need Axios to send HTTP requests to our backend on port 5000.

`npm install axios`

### Creating Components
React apps use of components that we can reuse as needed.

Create a components folder in src and add a createCustomer.js file, editCustomer.js, and customerList.js file.

- CreateCustomer Component


In the createcustomer.js, include

```JavaScript
import React,{useState} from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from "axios";
import Select from '@material-ui/core/Select';
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
export default function CreateCustomer() {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight:"800" }
    const marginTop = { marginTop: 15 }
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        location:"",
        subscribedToPackage: "",
    });
    const createCustomer = () => {
        axios.post("http://localhost:5000/customers", customer).then(() => {
            window.alert('Successfully Registered')
            window.location.reload(false);
        })
    };


    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                <h2 style={headerStyle}>Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Please fill in the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value })}
                        fullWidth label='Name' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" value={customer.email} onChange={(e) => setCustomer({ ...customer,email: e.target.value })}
                        fullWidth label='Email' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber} onChange={(e) => setCustomer({ ...customer,phoneNumber: e.target.value })}
                        fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" value={customer.location} onChange={(e) => setCustomer({...customer,location: e.target.value })}
                        fullWidth label='Location' placeholder="Apartment,City" />
                    
                    <Select style={marginTop} id="subscription" value={customer.subscribedToPackage} onChange={(e) => setCustomer({ ...customer,subscribedToPackage: e.target.value })}
                        
                        fullWidth label="Subscription" placeholder="Subscription" >
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                      
                    </Select>
                    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={createCustomer}>Submit</Button>
                </form>
            </Paper>
        </Grid>
    )
}
```

Our CreateCustomer component renders a form that enables us to get input from the users. 
 
We use Material UI's Grid, Paper, TextField, and Button components to create our customer details page, as shown below.

![Customer Details](/mern-isp-management-system/customerDetails.png)

Material UI's select component displays various subscription packages available to the user.

- Connecting to the Backend

```JavaScript
const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        location:"",
        subscribedToPackage: "",
    });
    const createCustomer = () => {
        axios.post("http://localhost:5000/customers", customer).then(() => {
            window.alert('Successfully Registered')
            window.location.reload(false);
        })
    };
```
We have a createCustomer function that handles our logic for posting customer details to the backend, which executes when the onClick() event occurs on the submit button.

The react useState hook is used to determine the state of the function component, which returns the current state, and the setCustomer function, which updates the state.

We update the state when the onChange() event occurs in our text fields.

- CustomerList Component

In customerList.js

```JavaScript
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from 'react-router-dom'

export default function CustomerList() {
    const [customerList, showCustomerList] = useState([]);
    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:5000/customers/${id}`).then(() => {
            window.location.reload(false);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/customers").then((allCustomers) => {
            showCustomerList(allCustomers.data);
        });
    }, []);

    return (
        <>
            <h1 style={{ margin:"20px 0 20px 50px" }}>All Customers</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" fontWeight="bold">
                                Name
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Email
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Phone Number
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Location
                            </TableCell>
                            <TableCell align="center" fontWeight="bold">
                                Subscription Package
                            </TableCell>
                            <TableCell align="center" fontWeight="bold" colSpan={2}>
                                Action
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerList.map((customer, key) => (
                            <TableRow key={customer.key}>
                                <TableCell align="center" component="th" scope="row">{customer.name}</TableCell>
                                <TableCell align="center">{customer.email}</TableCell>
                                <TableCell align="center">{customer.phoneNumber}</TableCell>
                                <TableCell align="center">{customer.location}</TableCell>
                                <TableCell align="center">{customer.subscribedToPackage}</TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} component={Link} to={`/edit/${customer._id}`} > Edit</TableCell>
                                <TableCell align="center" style={{ color: "blue", cursor: "pointer" }} onClick={() => deleteCustomer(customer._id)} > Delete</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
```

We use Material UI's table component to display all our customers, as shown below.


![All Customers](/mern-isp-management-system/allcustomers.png)

- Connecting to the Backend

```JavaScript
const deleteCustomer = (id) => {
        axios.delete(`http://localhost:5000/customers/${id}`).then(() => {
            window.location.reload(false);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/customers").then((allCustomers) => {
            showCustomerList(allCustomers.data);
        });
    }, []);
 ```

We use the deleteCustomer function to delete a specified used based on their ID.

The useState react hook helps us update the state of the components and the useEffect hook is used  in fetching data and setting the data in the local state of the component with the showCustomerList update function. 

We will add the EditCustomer component that will help us update customer details.

In editCustomer.js include,

```JavaScript
import React, { useEffect,useState } from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function EditCustomer(props) {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight: "800" }
    const marginTop = { marginTop: 15 }
    const [customer, showCustomer] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/customers/${id}`).then((customer) => {
            showCustomer(customer.data);

        })
    })

    const updateCustomer = () => {
        axios.patch((`http://localhost:5000/customers/${id}`), customer).then((customer) => {
            showCustomer(customer.data)
            window.alert('Successfully Edited')
            //window.location.reload(false);
        })
    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Update Customer Details</h2>
                    <Typography variant='caption' gutterBottom>Edit the details below.</Typography>
                </Grid>
                <form>
                    <TextField style={marginTop} id="name" value={customer.name} onChange={(e) => showCustomer({ ...customer, name: e.target.value })}
                        fullWidth label='' placeholder="Enter your name" />
                    <TextField style={marginTop} id="email" value={customer.email} onChange={(e) => showCustomer({ ...customer, email: e.target.value })}
                        fullWidth label='' placeholder="Enter your email" />
                    <TextField style={marginTop} id="phoneNumber" value={customer.phoneNumber} onChange={(e) => showCustomer({ ...customer, phoneNumber: e.target.value })}
                        fullWidth label='' placeholder="Enter your phone number" />
                    <TextField style={marginTop} id="location" value={customer.location} onChange={(e) => showCustomer({ ...customer, location: e.target.value })}
                        fullWidth label='' />
                    <TextField style={marginTop} id="location" value={customer.subscribedToPackage} onChange={(e) => showCustomer({ ...customer, subscribedToPackage: e.target.value })}
                        fullWidth label='' />
        
                    <Button type='submit' variant='contained' color='primary' style={marginTop} onClick={updateCustomer}>Update</Button>
                </form>
            </Paper>
        </Grid>
    )
}
```
The updateCustomer function updates the customer details in the database.
Our EditCustomer component renders out as follows


![Update Customer](/mern-isp-management-system/updateCustomer.png)


Finally, we need to resolve the routes in our react app to ensure we render the desired page for a given path. 

In App.js
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

## Conclusion.<a name="chapter-3"></a>

We have successfully created a management system for ISPs.
We learned how to create REST API in Node.js, connect to the MongoDB database and create a frontend with react.
We also learned how to connect the backend and frontend by relying on Axios and react hooks.

Happy Learning !!!

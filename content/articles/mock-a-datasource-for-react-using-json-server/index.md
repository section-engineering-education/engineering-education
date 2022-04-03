---
layout: engineering-education
status: publish
published: true
url: /mock-a-datasource-for-react-using-json-server/
title: Mock a Datasource for React using json-server
description: In this tutorial, the reader will learn how to build a mock a datasource using json-server to rapidly build React.js prototypes.
author: roy-kibet
date: 2021-12-07T00:00:00-09:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mock-a-datasource-for-react-using-json-server/hero.png
    alt: Mock a Datasource for react using json-server example image
---
Developers need some quick-to-use data sources with endpoints when building a React.js project. These data sources provide test data to test whether the package works correctly.
<!--more-->
A [data source](https://docs.microsoft.com/en-us/sql/odbc/reference/data-sources?view=sql-server-ver15) is the initial location where data is born. It may be a database, flat file, live measurement data from physical devices, among many others.

Datasources are mainly used as the databases managed by DBMS(s) such as MySQL, Postgres, SQL, among many others. The problem with this approach is that during prototyping it will be quickly discarded if the application prototype is not as expected.

[Rapid Prototyping Approach](https://www.productplan.com/glossary/rapid-prototyping/) is a type of agile system development methodology that allows one to create a prototype to test and validate the requirements of a Requirement Specification Document (RSD).

This development happens through several iterations. The prototype may then be used as a primary system or it can be discarded, so that another primary system may be developed based on the prototype. By building a prototype, the extra setup and configurations can be avoided, if there are going to be quickly discarded.

The process produces a need to create a data source that can be quickly set up and discarded, yet it performs the same functionality as the DBMS. It should also be small enough to have fewer storage requirements to produce correct and accurate results as expected.

The `json-server` library can solve such data sources problems. The `json-server` library is quick to install, configure, use, and discard in a React application. In this article, you will learn how to do the following on the package mentioned above in a React.js app.

### Table of contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Understanding the json-server package](#understanding-the-json-server-package)
- [Building the React.js application](#building-the-reactjs-application)
  - [Header component](#header-component)
  - [Footer component](#footer-component)
  - [Button component](#button-component)
  - [About page component](#about-page-component)
  - [Budget.js file](#budgetjs-file)
  - [AddBudget component](#addbudget-component)
  - [Budgets.js file](#budgetsjs-file)
- [Get the items from the server](#get-the-items-from-the-server)
- [Style the application](#style-the-application)
- [Install JSON Server in the machine](#install-json-server-in-the-machine)
- [Configure the JSON Server data source in the project](#configure-the-json-server-data-source-in-the-project)
- [Run the application](#run-the-application)
- [More on JSON server](#more-on-json-server)
- [Conclusion](#conclusion)

### Key takeaways
By the end, the reader will learn the following:
- What is the `json-server` library?
- Set up the `json-server` library in a React.js application.
- Connect the app to the library.
- Using the library as a data source in place of an actual DBMS.
- Removing the dependency from the application and discarding the prototype.

### Prerequisites
The following is required:
- A good IDE or text editor set up on the machine.
- A stable internet connection.
- React development environment already set up.
- React development skills.

Brief info on what is going to be done in the article is as follows:
- Learn briefs on the JSON server package.
- Create a React.js application.
- Set it up to allow API data from links.
- Style the application.
- Install JSON Server in the machine.
- Set up the JSON Server as a mock database server.
- Configure the JSON Server data source in the project.
- Run the application.

### Understanding the json-server package
JSON server allows almost all types of back-end requests and responses like `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` methods. It has routes to access data items stored in the mock database file (JSON).

A few examples are `GET /posts` for fetching all the posts, `PUT /posts/1` for updating the first post, or `DELETE /posts/1` for deleting the first post. The module allows other operations to be done on the database, such as:

#### Performing database filters
Examples - `GET /posts?title=json-server&author=riro` or `GET/comments?author.name=riro`. These end-points filter `posts` with the `title` of `json-server` and `author` name of `riro` and `comments` with the `author` name of `riro` respectively.

#### Adding pagination to the results fetched
Example - `GET /posts?_page=9&_limit=23`. This request will fetch posts from page `9`, and the page limit is set to `23`.

#### Sorting items from the database
Example - `GET/posts/5/comments?_sort=votes,likes&_order=desc,asc`. This request does the sorting of the `comments` based on the `votes` and `likes` in ascending and descending orders, respectively.

#### Performing slice operations on the data
Example - `GET/posts/4/comments?_start=20&_limit=10`. This request truncates the `comments` after `10` comments starting from comment number `20`.

#### Operators
When excluding a value we use `_ne`, and to filter based on a value, we use `_like`. An example `GET /posts/4/comments?_ne=sad` request, excludes any comment with the value of `sad`, while `GET \author_like=chris` searches for `authors` with a name related to `chris` (RegEx is used).

#### Doing full-text searches in the database
Example - `GET/posts?q=tomcat`. This request searches for the value `tomcat` in all the records stored.

#### Creating relationships with the database items
The inclusion of child resources using `_embed`, and the inclusion of parent resources using `_expand` creates nested resources. An example is `GET /comments/1?_expand=post` that includes parent resource by the name `post`.

#### Fetching for full database
Example - `GET\db`. This `GET` fetches all the database items of the specified database.

### Building the React.js application
In this section, a React.js app will be created. We will be build a budget planning application to add or remove them from a list. The app saves and retrieves data from a data source using a JSON object.

Let's get started. Open the folder in which the application should be created and run this command:

```bash
npx create-react-app react-budget-tracker
```

The folder structure should look like this:

```bash
.
├── node_modules
├── public
├── src
│   └── components
│       ├── About.js
│       ├── AddBudget.js
│       ├── Budget.js
│       ├── Budgets.js
│       ├── Button.js
│       ├── Footer.js
│       └── Header.js
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── reportWebVitals.js
├── .eslintcache
├── .gitignore
├── db.json
├── package.json
├── package-lock.json
├── README.md
└── yarn.lock
```

#### Header component
As the name suggests, the `Header.js` file contains the header parts.

- In the `Header.js`, its code is as shown below:

```js
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  /*The header has a title and a button that opens up a window to add the budget or close the window*/
  return (
    <header className='header'>

    <!-- The header has a title -->
    <h1>{title}</h1>
    {location.pathname === '/' && (
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
        />
    )}
    </header>
  )
}

/*Set the title*/
Header.defaultProps = {
  title: 'Budget Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

/*Export the header*/
export default Header
```

This code creates a simple header for a web page and allows it to be used to add the following:
- A header title.
- A button to add the budget item and to remove it.
- Set the button color.
- Set the title value and export the header.

#### Footer component
- In the `Footer.js` file, the following will be the code:

```js
import { Link } from 'react-router-dom'

/*Add a footer to the application*/
const Footer = () => {
  return (
    /*It has a copyright and a link to the about page*/
      <footer>
        <p>Copyright &copy; 2021</p>
          <Link to='/about'>About</Link>
      </footer>
  )
}

export default Footer
```

The code generates a footer that contains copyright and an about-page link.

#### Button component
The `Button.js` adds a reusable button component for multiple click actions. For example, this button can open the `Add` form and `Close` the form.

```js
import PropTypes from 'prop-types'

/*A button that allows one to set its color, the text it displays and the function it executes on a click event*/
const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
        style={{ backgroundColor: color }}
        className='btn'
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
```

The code generates a button that allows one to set its:
- color,
- text, and
- the function to be executed when it is clicked.

#### About page component
- Now, add an about webpage that contains details related to the author.

```js
import { Link } from 'react-router-dom'

/*Generates a simple about page that has a simple button to go back to the main page*/
const About = () => {
return (
<div>
<h4>Version 1.0.0</h4>
  <Link to='/'>
    <button type="button" className={"btn btn-secondary"}>
    Go Back
    </button>
  </Link>
</div>
)
}

export default About
```

#### Budget.js file
The `Budget.js` file enables one to interact with a particular budget item in the server displayed on the screen. One can delete a budget or toggle its reminder state.

```js
import { FaTimes } from 'react-icons/fa'

/*This will enable one to set the reminder to the budget on or off when double clicked on; and also to delete the budget*/
const Budget = ({ budget, onDelete, onToggle }) => {
  return (
  <!-- Toggle the budget reminder on or off when double on double click -->
      <div
        className={`budget ${budget.reminder && 'reminder'}`}
        onDoubleClick={() => onToggle(budget.id)}
      >
        <h3>
          <!-- Display the budget name -->
          {budget.name}{' '}
            <FaTimes
            /*Delete the budget when clicked*/
            style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => onDelete(budget.id)}
              />
          </h3>

            <!-- Display the budget Amount -->
            <p>{budget.amount}</p>
        </div>
  )
}

export default Budget
```

The above code:
- Acts as a toggle for the reminder states (on, off) when double-clicked on.
- Displays the item and the amount.

#### AddBudget component
The `AddBudget.js` file allows one to add budgets to the system. The budgets will then immediately be updated in the system and make it visible.

```js
import { useState } from 'react'

const AddBudget = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    /*Ensure that the name input is never null*/
    if (!name) {
      alert('Please add a budget')
      return
    }

    /*When adding the budget, store the name, amount and the reminder status*/
    onAdd({ name: name, amount: amount, reminder })

    setName('')
    setAmount('')
    setReminder(false)
  }

  /*Display a form that allows one to enter the budget values*/
  return (
  <form className='add-form' onSubmit={onSubmit}>
    <div className='form-control'>
      <label>Budget</label>
      <input
        type='text'
        placeholder='Add Budget'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
    </div>

    <!--  Take in the amount -->
    <div className='form-control'>
      <label>Amount</label>
      <input
              type='text'
              placeholder='Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
      />
    </div>

    <!-- Take in the reminder status -->
    <div className='form-control form-control-check'>
      <label>Set Reminder</label>
      <input
              type='checkbox'
              checked={reminder}
              value={reminder}
              onChange={(e) => setReminder(e.currentTarget.checked)}
      />
    </div>

    <input type='submit' value='Save Budget' className='btn btn-block' />
  </form>
  )
}

export default AddBudget
```

The above code:
- Displays an error when no budget item is added during the addition process.
- It otherwise takes the value that has been inputted and adds it to the others held at the data source. The addition takes place when the submit button is pressed.
- It allows one to either set the reminder `on` or `off` for a particular item.
- The application will then reload automatically on the added list.

#### Budgets.js file
- In the `Budgets.js` file, we can add the following code:

```js
import Budget from './Budget'

/*Displays all the budgets fetched from the URL to the screen*/
const Budgets = ({ budgets, onDelete, onToggle }) => {
/*Maps each budget per the budget's key*/
  return (
    <>
      {budgets.map((budget, index) => (
      <Budget key={index} budget={budget} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
    )
}

export default Budgets
```

This code:
- Displays the items in the list of the budget.
- Allows deletion of the items from the list, and from the data source.
- It allows one to use a toggle function to set the reminder `on` or `off`.

### Get the items from the server
This step is accomplished in the `App.js` file. It specifies how the app interacts with the server and what happens to the data fetched.

```js
/*Import the other components for the application*/
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Budgets from './components/Budgets'
import AddBudget from './components/AddBudget'
import About from './components/About'

const App = () => {
const [showAddBudget, setShowAddBudget] = useState(false)
const [budgets, setBudgets] = useState([])

useEffect(() => {
  /*Make the app fetch the items assynchronously*/
  const getBudgets = async () => {
    const budgetsFromServer = await fetchBudgets()
    setBudgets(budgetsFromServer)
  }

  getBudgets()
}, [])
```

The code imports the needed modules and allows the data items to be fetched asynchronously from the server.

- Add the code below under the previous one:

```js
// Fetch Budgets
const fetchBudgets = async () => {
  const res = await fetch('http://localhost:5000/budgets')
  const data = await res.json()

  return data
}

// Fetch Budgets
const fetchBudget = async (id) => {
  const res = await fetch(`http://localhost:5000/budgets/${id}`)
  const data = await res.json()

  return data
}

// Add Budget
const addBudget = async (budget) => {
  const res = await fetch('http://localhost:5000/budgets', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(budget),
  })

  const data = await res.json()

  setBudgets([...budgets, data])
}

// Delete Budget
const deleteBudget = async (id) => {
  const res = await fetch(`http://localhost:5000/budgets/${id}`, {
    method: 'DELETE',
  })
  //We should control the response status to decide if we will change the state or not.
  res.status === 200
    ? setBudgets(budgets.filter((budget) => budget.id !== id))
    : alert('Error Deleting This Budget')
}

// Toggle Reminder
const toggleReminder = async (id) => {
const budgetToToggle = await fetchBudget(id)
const updateBudget = {...budgetToToggle, reminder: !budgetToToggle.reminder}

const res = await fetch(`http://localhost:5000/budgets/${id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(updateBudget),
})

  const data = await res.json()

  setBudgets(
    budgets.map((budget) =>
            budget.id === id ? {...budget, reminder: data.reminder} : budget
    )
  )
}
```

The code specifies the URLs in which one can:
- Adds a new budget.
- Deletes a budget.
- Fetch budgets.
- Toggle the reminder status.


- Now add a return together with an export statement as shown below:
```js
/*Display all the budgets fetched, otherwise display that there are no budgets to show*/
return (
  <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddBudget(!showAddBudget)}
        showAdd={showAddBudget}
      />
      <Route
        path='/'
        exact
        render={(props) => (
          <>
            {showAddBudget && <AddBudget onAdd={addBudget}/>}
            {budgets.length > 0 ? (
              <Budgets
                budgets={budgets}
                onDelete={deleteBudget}
                onToggle={toggleReminder}
              />
            ) : (
                'No Budgets To Show'
            )}
          </>
        )}
      />
      <Route path='/about' component={About}/>
      <Footer/>
    </div>
  </Router>
)
}

export default App
```

This code shown above does the following:
- Fetches the items from the specified URL and displays them.
- Adds items to the list.
- Deletes the items in the data source.
- Toggles the item reminder (on, off) states.
- If the app finds no data on the server, it will display that no budget is found; otherwise, it displays all other budgets.
- The code also contains the footer and the about page link.

### Style the application
- Now we can do create styling for the application. The styling code is found on this [link](https://github.com/blacklihgt/Mock-a-Datasource-for-React-using-JSON-Server/blob/main/src/index.css). Download it and save it in the `src` folder.

Make sure to run the command below to install all necessary packages before running the application using the command below:

```bash
npm install
```

Run the created application using the following command:

```bash
npm run start
```

The application will look as shown below:

![Home page](/engineering-education/mock-a-datasource-for-react-using-json-server/Homepage.png)

![Add items](/engineering-education/mock-a-datasource-for-react-using-json-server/add-items.png)

![About page](/engineering-education/mock-a-datasource-for-react-using-json-server/about-page.png)

### Install json-server
The JSON server can be installed by running the command below:

```bash
npm install -g json-server
```

The command installs the package at global scope. Once installed, head over to the `package.json` file and add a script that quickly runs the server.

```json
"server": "json-server --watch db.json --port 5000"
```

This code above runs a server that serves responses to requests from the application. The data source which acts as a database on this app is the `db.json` file. It will be accessed via port `5000` as seen above and in the `App.js` file.

### Configure the json-server data source
In the `db.json` file, the server serves requests under the `http://localhost:5000/budgets/` URL. The data items are under the budgets section. 

Copy-paste the code below into the `db.json` file:

```json
{
  "budgets": [
    {
      "id": 1,
      "name": "Carrots",
      "amount": "1500",
      "reminder": false
    },
    {
      "id": 2,
      "name": "Laundry",
      "amount": "2500",
      "reminder": true
    },
    {
      "id": 3,
      "name": "Ginger",
      "amount": "1000",
      "reminder": true
    },
    {
      "id": 4,
      "name": "Electricity",
      "amount": "10000",
      "reminder": true
    },
    {
      "name": "Water",
      "amount": "13000",
      "reminder": true,
      "id": 5
    }
  ]
}
```

It contains five items under the budgets section. These are the `Carrots`, `Laundry`, `Ginger`, `Electricity`, and `Water`.

### Run the application
Test the JSON Server by doing the following:

- Run the main React application in one terminal by using:

```bash
npm run start
```

- In another terminal, run the server using:

```bash
npm run server
```

- Access the application in the browser via the following URL: `http://localhost:3000/`.
- Reload the application's browser window till it displays the items if it does not work for any reason.

The outcome should look like the example shown below:

![Final image for the application](/engineering-education/mock-a-datasource-for-react-using-json-server/final-server-product-image.png)

### More on JSON Server
Let us look more into the package.

#### Change port, file, and file paths
The filename and port where the server runs can be changed to `database.json` on port `3010` by running the command below on the terminal:

```bash
json-server --watch database.json --port 3010
```

- Static files located in different folders can also be served as shown below:

```bash
json-server database.json --static ./public/database
```

#### Perform queries on the data
This action may be helpful when searching using the search bar. Follow the steps below:

- Query the database for a particular value by running the following in a new terminal:

```bash
curl http://localhost:5000/budgets?q=Carrots
```

Here, the database is searched for any item with the value of `Carrots` in it. The return value looks like the example below:

![Perform queries](/engineering-education/mock-a-datasource-for-react-using-json-server/querying.png)

The module allows middlewares, random data generation, accessing the data source remotely, setting custom routes, and much more.

#### Add delay and change host
- To change the host, use the `-H` or `--host` option.
- Adding some delays (in milliseconds) to the server to replicate a real server, use the `-d` or `--delay` option.

Both of these two options are shown below:

```bash
json-server --watch db.json --port 5000 -H 127.0.0.1 -d 1500
```

### Conclusion
In conclusion, running and throwing away parts is essential to developers during software development. These parts are helpful in agile programming and prototyping. JSON Server dependency is an example of a quick dispensable project development unit.

It is small-sized, easy to install, use, learn, and dispose of when one has finished using the prototype.

At this point, the following have been covered:
- What is the JSON Server module.
- Importance of JSON Server module in project development phase.
- Adding JSON Server module to a React project.
- Configuring JSON Server module.

You can find the full code [here](https://github.com/blacklihgt/Mock-a-Datasource-for-React-using-JSON-Server).

You can read more about the `json-server` package [here](https://www.npmjs.com/package/json-server).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
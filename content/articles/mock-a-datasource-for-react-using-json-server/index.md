When building a React project, developers need some quick-to-use data sources with endpoints. These data sources provide test data to test whether the package works correctly.
Datasource mainly used may include DBMS systems such as MySQL, Postgres, SQL, among many others. The problem with this approach is that during prototyping, e.g., in Rapid Prototyping Approach, it will be quickly discarded if the application prototype is not as expected.
The extra setup and configurations will be tedious and useless since they will be quickly discarded.

The process produces a need to create a data source that can be quickly set up and discarded, yet it performs the same functionality as the DBMS.
It should also be small enough for fewer storage requirements and produce correct and accurate results as expected.
The use of the Json-Server library can solve such data sources problems.

The Json-Server library is quick to install, configure, use and discard in a React application.
This article will learn how to do the following on the package mentioned above in a React app.

### Table of Contents

- [KeyTakeaways](#keytakeaways)
- [Pre-requisites](#pre-requisites)
- [Learn briefs on the JSON Server package](#learn-briefs-on-the-json-server-package)
- [Create a React app](#create-a-react-app)
  - [New React app](#new-react-app)
  - [New project structure](#new-project-structure)
  - [Header component](#header-component)
  - [Footer component](#footer-component)
  - [Button component](#button-component)
  - [About page component](#about-page-component)
  - [Budget.js file](#budgetjs-file)
  - [AddBudget component](#addbudget-component)
  - [Budgets.js file](#budgetsjs-file)
- [Allow API data from links](#allow-api-data-from-links)
- [Style the application](#style-the-application)
- [Install JSON Server in the machine](#install-json-server-in-the-machine)
- [Configure the JSON Server datasource in the project](#configure-the-json-server-datasource-in-the-project)
- [Run the application](#run-the-application)
- [References](#references)

### key takeaways

By the end, the following will be learned:

- What is the JSOn-Server library
- Set up the JSOn-Server library in a React application
- Connect the app to the library
- Use the library acts as a data source in place of an actual DBMS
- Removing the dependency from the application and discarding the prototype

### Pre-requisites

For the article, the following are required for easy article follow-up:

- A good React IDE or text editor set up on the machine
- A stable internet application
- React development environment already setup
- React development skills

Brief info on what is going to be done in the article is as follows:

- Learn briefs on the JSON Server package
- Create a React application
- Set it up to allow API data from links
- Style the application
- Install JSON Server in the machine
- Set up the JSON Server as a mock database server
- Configure the JSON Server data source in the project
- Run the application

### Learn briefs on the JSON Server package

JSON Server can allow almost all back-end requests and responses. They can be accessed via the GET, POST, PUT, PATCH, and DELETE methods.
It allows routes to access data items stored in the Mock database file(in JSON format). They may include examples such as `GET    /posts`, `PUT    /posts/1`, or `DELETE /posts/1`.

The module allows other operations to be done on the database, such as:

- **Filter**: e.g. `GET /posts?title=json-server&author=riro` or `GET /comments?author.name=riro`
- **Pagination**: e.g. `GET /posts?_page=9&_limit=23`
- **Sorting**: e.g. `GET /posts/5/comments?_sort=votes,likes&_order=desc,asc`
- **Slicing**: e.g. `GET /posts/4/comments?_start=20&_limit=10`
- **Operators**: e.g. for getting range (`_gte`, `lte`), excluding a value(`_ne`), filtering a value(`_like`)
- **Full-text search**: e.g. `GET /posts?q=tomcat`
- **Relationships**: e.g., the inclusion of child resources(`_embed`), the inclusion of parent resources(`_expand`), to get or create nested resources
- **Database**: e.g. `GET \db`
- **Homepage**: e.g. `GET /`. Using the ' ./public ' path, one can serve the application files in the public folder.

More on JSON Server library will also be mentioned in the article.

### Create a React app

In this section, a React app will be created. The app will be a budget planning application to add items and remove them from a list.
The app saves and retrieves data from a data source in a JSON object.

#### New React app

- Open the folder in which the application should be created and run this command:

```shell
npx create-react-app react-budget-tracker
```

#### New project structure
- Create the following application folder structure:

```shell
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
- In the 'Header.js', copy and paste the code below:

```js
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
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

Header.defaultProps = {
  title: 'Budget Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
```

This code creates a simple header for a web page and allows it for use.

#### Footer component
- In the 'Footer.js' file, the following will be the code:

```js
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer
```

#### Button component
- Add a button that is a reusable component for multiple click actions. For example, this button will open the Add form and close the form. The code for the button is as shown below:

```js
import PropTypes from 'prop-types'

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

#### About page component
- Now, add a webpage that may contain other page contents. In this case, an About page. This page's code is shown below:

```js
import { Link } from 'react-router-dom'

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

It contains a button to go back to the previous page.

#### Budget.js file
- In the 'Budget.js' file, the following will be its code:

```js
import { FaTimes } from 'react-icons/fa'

const Budget = ({ budget, onDelete, onToggle }) => {
  return (
    <div
      className={`budget ${budget.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(budget.id)}
    >
      <h3>
        {budget.name}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(budget.id)}
        />
      </h3>
      <p>{budget.amount}</p>
    </div>
  )
}

export default Budget
```

- It does the following:

  - It toggles from reminder states (on, off) when double-clicked on
  - It displays the item and the amount

#### AddBudget component
- In the 'AddBudget.js' file, copy-paste the following:

```js
import { useState } from 'react'

const AddBudget = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add a budget')
      return
    }

    onAdd({ name: name, amount: amount, reminder })

    setName('')
    setAmount('')
    setReminder(false)
  }

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
      <div className='form-control'>
        <label>Amount</label>
        <input
          type='text'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
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

- It does the following:
  - Displays an error when no budget item is added during the addition process
  - It otherwise takes the value that has been input and adds it to the others held at the data source. The addition takes place when the submit button is pressed.
  - It allows one to either set the reminder on or off for a particular item
  - The application will then reload automatically on the added list

#### Budgets.js file
- In the 'Budgets.js' file, the following will be the code:

```js
import { useState } from 'react'

const AddBudget = ({ onAdd }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add a budget')
      return
    }

    onAdd({ name: name, amount: amount, reminder })

    setName('')
    setAmount('')
    setReminder(false)
  }

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
      <div className='form-control'>
        <label>Amount</label>
        <input
          type='text'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
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

The code will allow the application to do the following:

- Displays the items in the list of the budget
- Allow deletion of the items in the list. It deletes the items even in the data source.
- It allows one to use the toggle function to set the reminder on or off.

### Allow API data from links
- Now, once done with components, do this to the 'App.js' file:

```js
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
        const getBudgets = async () => {
            const budgetsFromServer = await fetchBudgets()
            setBudgets(budgetsFromServer)
        }

        getBudgets()
    }, [])

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

- This code shown above does the following: 
  - Fetches the items from the specified URL and displays them
  - Adds items to the list
  - Deletes the items in the data source
  - Toggles the item reminder (on, off) states

### Style the application
- Finally, do some styling to the application. The styling code that is found in the 'index.css' file:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

:root {
  --primary-color: #4d91d1;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}

.budget {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.budget.reminder {
  border-left: 5px solid green;
}

.budget h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.budget p {
  color: #a2a2a2;
}

.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}

footer {
  margin-top: 30px;
  text-align: center;
}
```

- Make sure to run the command below to install all necessary packages before running the application using the command below:

```shell
npm install
```

- Run the created application using the following command:

```shell
npm run start
```

The application will look as shown below:

![Home page](/engineering-education/mock-a-datasource-for-react-using-json-server/Homepage.png "Home page")
![Add items](/engineering-education/mock-a-datasource-for-react-using-json-server/add-items.png "Add items")
![About page](/engineering-education/mock-a-datasource-for-react-using-json-server/about-page.png "About page")

### Install JSON Server in the machine

JSON server can be installed by running the command below:

```shell
npm install -g json-server
```

The command installs the package at global scope.

Once installed, head over to the 'package.json' file and add a script that quickly runs the server.
In the scripts section, add the following line of code:

```json
"server": "json-server --watch db.json --port 5000"
```

This code above runs the server that serves responses to requests from the application. The data source which acts as a database at this app is the 'db.json'  file.
It will be accessed via port `5000` as seen above and in the 'App.js' file.

### Configure the JSON Server data source in the project

In the 'db.json' file, the server serves requests under the `http://localhost:5000/budgets/` URL.
The data items are under the budgets section.

- Copy-paste the code below into the 'db.json' file:

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

It contains five items under the budgets section. These are the Carrots, Laundry, Ginger, Electricity, and Water.

### Run the application

Test the JSON Server by doing the following:

- Run the main React application in one terminal by using:

```shell
npm run start
```

- In another terminal, run the server using:

```shell
npm run server
```

- Access the application in the browser via the following URL: `http://localhost:3000/`.
- Reload the application's browser window till it displays the items if it does not work for any reason.

The outcome looks like shown below:

![Final image for the application](/engineering-education/mock-a-data source-for-react-using-json-server/final-server-product-image.png "Final image for the application")

### More on JSON Server

Let us look more at the module:

#### Change port, file and file paths

- The filename and port where the Server runs can be changed, for instance, to `database.json` on port `3010` by running the command below on the terminal:

```shell
json-server --watch database.json --port 3010
```

- Static files located in different folders can also be served as shown below:

```shell
json-server database.json --static ./public/database
```

#### Perform Queries on the data

This action may be helpful to, for example, when searching using the search bar in the application window. Follow the steps below:

- Query the database for a particular value by running the following in a new terminal:

```shell
curl  http://localhost:5000/budgets?q=Carrots
```

Here, the database is searched for any item with the value of 'Carrots' in it.
The return value looks like follows:

![Perform queries](/engineering-education/mock-a-datasource-for-react-using-json-server/querying.png "Perform queries")

The module allows middlewares, random data generation, accessing the data source remotely, setting custom routes, e.t.c.

#### Add delay and change Host

- To change the host, use the `-H` or `--host` option.
- Adding some delays (in milliseconds) to the server to replicate a real server, use the `-d` or `--delay` option.

Both of these two are shown below:

```shell
json-server --watch db.json --port 5000 -H 127.0.0.1 -d 1500
```

Check out more on it [here](https://www.npmjs.com/package/json-server) on the docs.

Find the code for this article in this [link](https://github.com/blacklihgt/Mock-a-Datasource-for-React-using-JSON-Server).

### Conclusion

In conclusion, running and throwing away parts are essential to developers during software development.
These parts are helpful in agile programming and prototyping. JSON Server dependency is an example of a quick dispensable project development unit.
It is small-sized, easy to install, use, learn, and dispose of when one has finished using the prototype.

At this point, the following have been covered:

- What is the JSON Server module
- Importance of JSON Server module in project development phase
- Adding JSON Server module to a React project
- Configuring JSON Server module

### References

- JSON Server [Documentations](https://www.npmjs.com/package/json-server)

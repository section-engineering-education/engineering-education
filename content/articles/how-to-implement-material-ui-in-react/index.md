---
layout: engineering-education
status: publish
published: true
url: /how-to-implement-material-ui-in-react/
title: How to Implement Material-UI in React
description: This tutorial will provide a guideline on how to implement material ui in react applications. Material-UI is a simple library that allows developers to import and use different components to create a user interface in react applications.
author: michael-barasa
date: 2021-02-14T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-implement-material-ui-in-react/hero.png
    alt: Material-UI in React example
---
React.js is one of the leading frameworks used when creating web applications. It enables developers to create SEO-friendly and highly-interactive components. React.js features also boost maintenance and overall productivity. The integration of the Material UI library in React.js projects takes things to a new level.
<!--more-->
### Introduction to Material-UI
Material-UI is simply a library that allows us to import and use different components to create a user interface in our React applications. This saves a significant amount of time since the developers do not need to write everything from scratch. 

Material-UI widgets are heavily inspired by Google’s principles on building user interfaces. It is, therefore, easy for developers to build visually-appealing applications. You can learn more about Google’s material design principles from [here](https://material.io/design/introduction#principles).

### Goal
To incorporate the Material-UI library and use its components in a React.js application.

### Prerequisites
For this tutorial, make sure that you have [npm](https://www.npmjs.com/) installed on your computer. We will use npm to download and install the required dependencies in our application. You also need a code editor. The tutorial uses Visual Studio Code, which you can download from [here](https://code.visualstudio.com/).

Let’s jump into the cool stuff.

### Step 1 - Getting started
Navigate to your desired folder and create a React project by typing the following command in a terminal or cmd.

```bash
npx create-react-app materialuiexample
```

> Please note that this build process may take some time depending on your internet speed.

Once the installation is complete, open the folder in your code editor. Then, type `npm start` to launch the development server. You can view the default React application by navigating to `http://localhost:3000/` in your browser.

### Step 2 - Installing the Material-UI dependencies
We must install the Material-UI to access its different functionalities or components. Open your terminal, and ensure that you are inside your application’s master folder.

Type `npm install @material-ui/core` in the terminal and click `enter.` 

Run the command below to use Material-UI icons in our project.

```bash
npm install @material-ui/icons
```

We can confirm that the above dependencies have been installed by checking in the package.json. This is shown below.

```JSON
"dependencies": {
    "@material-ui/core": "^4.11.2", //material-ui
    "@material-ui/icons": "^4.11.2", //material-ui icons
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.3",
    "@testing-library/user-event": "^12.6.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4"
  },
```

### Step 3 - Modifying the project
By default, every React project comes with certain files and templates. For instance, when you navigate to `http://localhost:3000/`, you will notice that you have a web page with a react logo. Let’s eliminate these elements to avoid confusion.
Open your `app.js` file and delete all the code in the `div` tag.

```javascript
import './App.css';

function App() {
  return (
    <div className="App">
      {/* code goes here */}
    </div>
  );
}

export default App;
```

### Step 4 - Application of Material-UI components
To use Material-UI components, we first need to import them into our project. This is done, as shown below.

```javascript
import './App.css';
import {Button} from '@material-ui/core'; //importing material ui component

function App() {
  return (
    <div className="App">
      <Button> Press me </Button> //using the material ui component in our project
    </div>
  );
}

export default App;
```

When you refresh your browser, you will see a `button` with the words `press me`. However, this button is not styled properly. 
We can use `props` to style buttons, as well as other components. `Props` are essential properties that are passed down to an element. You can read more about Material-UI props from [here]( https://material-ui.com/api/).

The Material-UI button that we imported in the project is styled, as shown below.

```javascript
 <Button color="primary" variant="contained"> Press me </Button> 
```
We can also import and use a TextField widget in our project, as highlighted below.

```javascript
<TextField id="name" label="Name" variant="outlined" />
```
In the above example, the `variant` variable helps us define how our TextField should appear.

We can also create an independent component and import it into another file. For example, let’s create a separate `NavBar` component.
In the `src` folder, create a new file and name it `NavBar.js`. Add the following code to this file.

```javascript
import React from "react";
import {AppBar, Toolbar, Typography} from '@material-ui/core';

function Header(){
    return (
      <AppBar position='static'>
         <Toolbar>
             <Typography>React Navbar Example</Typography>
         </Toolbar>
      </AppBar>

    );
}
export default Header;
```

Note that `AppBar`, `Toolbar`, and `Typography` are all part of the Material-UI widgets. The Typography widget helps highlight the items that will appear in the toolbar. In our case, the toolbar will display the title `React Navbar Example`.

The next step is to import the above component into the app.js file. To do this, add the following line at the top of the `app.js` file – among the import statements.

```javascript
import Header from './NavBar.js';
```

We can use the widget by adding `<Header/>` in the `div` tag.

Here is the full code:

```javascript
import './App.css';
import {Button} from '@material-ui/core'; //importing material ui component
import {TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Header from './NavBar.js';

function App() {
  return (
    <div className="App">
    <br/>
       <Header/> //importing the navbar component
      <Button color="primary" variant="contained"> Press me </Button> 
      <br/><br/>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <br/><br/>
      <AccountCircle/>

    </div>
  );
}

export default App;
```

> You can follow this example to incorporate other Material-UI widgets in your project. Other important components can be found [here](https://material-ui.com/components/).

### Recap
From the above tutorial, we have learned:

- What Material-UI entails.
- How to add Material-UI dependencies in a ReactJS application.
- How to use Material-UI components and icons. 

We have also seen how easy it is to build highly appealing websites by incorporating Material-UI in React applications. You can, therefore, use this information to build complex applications that adhere to material design principles.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


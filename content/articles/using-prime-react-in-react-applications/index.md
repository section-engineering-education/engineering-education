---
layout: engineering-education
status: publish
published: true
url: /using-prime-react-in-react-applications/
title: How to use PrimeReact in React Applications
description: In this article, we will create a Responsive Navbar in a React Application using a Library called Prime React. PrimeReact is a open source library which has styled components.
author: gerald-ezenagu
date: 2021-11-02T00:00:00-08:03
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-prime-react-in-react-applications/hero.jpg
    alt: How to use PrimeReact in React Applications Hero Image
---

React is all about components, these help us to reuse our JavaScript code over and over. It also maintains and updates the page. React is used to build single-page applications and user interfaces.
<!--more-->

PrimeReact is like CSS, which is used in styling the user interface of our application. But unlike CSS, PrimeReact has a pre-defined style in each component, which we can use in our React application.

### Table of contents
- What is PrimeReact
- Create React application
- Adding PrimeReact dependencies
- Modifying our React application
- Creating a Nav component
- Making our Navigation Bar responsive

### Prerequisites
For this tutorial:
- Basic knowledge of React.js
- Little knowledge of npm
- Have visual studio code and npm installed, click [here](https://code.visualstudio.com/) to download visual studio code

### Goal
- To create a responsive navigation bar using Prime React components in a React.js application.
- To use PrimeReact components in our project.

Let's start coding.

### What is PrimeReact
PrimeReact is a UI component library for React applications. PrimeReact has different components for themes, styles, and icons which we can import and use in our React application. It is a free open-source library.

> To know more about PrimeReact click [here](https://primefaces.org/primereact/showcase/#/)

#### Step 1 - Create React application
When creating React application, we first go to the folder we want our application to existing.
To create a React application type the following command in a terminal or cmd.

```
npx create-react-app my-prime
```

After installing, type `cd my-prime` to go into my-prime folder.
Type `npm start` to start the development server. The React website can be seen on `http://localhost:3000/` in your system browser.

#### Step 2 - Adding PrimeReact dependencies
In order to add PrimeReact dependencies into our project, we first open the terminal of our visual studio code. Ensure that the terminal is accessing my-prime folder

Input `npm install primereact primeicons --save` and press "enter" to install prime react and prime icons.

PrimeReact components need the PrimeIcons library for icons and `react-transition-group` for animations.

Type  `npm install react-transition-group` and press "enter" to install `react-transition-group`.

If the dependencies we installed are shown as below in the `package.json` file, then our installation was successful. 

```JSON
"dependencies": {
    "primeicons": "^4.1.0",
    "primereact": "^6.6.0",
    "react-transition-group": "^4.4.2"
  },
```

#### Step - 3 Modifying our React application
When we create a react project, react has some pre-defined codes we need to modify. Go to `http://localhost:3000/` in your browser, A website showing React logo will be displayed. Let's modify the website codes. Open the `app.js` file in your visual studio code editor, then remove all code within the div tag except `import './App.css'`. 

```javascript
import React from 'react'; //for React
import './App.css' // for CSS

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
```

We then import our prime react themes and icons

```javascript
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

The above CSS files provided by PrimeReact should be added at the top of the app.js file to enable primereact icons, themes, and styles to be effective in our browser.

Our `app.js` file should look like this below

```javascript
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="App">
      {/* code goes here */}
    </div>
  );
}

export default App;
```

#### Step 4 - Creating a Nav component
We first need to create a component and import it into our `app.js`. 
For example, within the `src` folder, let’s create a separate folder called `components`, where we'll store our Navigation code.

Within the `components` folder, we create a new file and name it `Nav.js`.

Then, we create a React function called Navigation, within the return parentheses we create a navbar for our browser using HTML elements like div tag, the header tag, nav tag, and ul tag.

```javascript
const Navigation = () => {
    return(
        <div>
           <header>
              <nav>
                <h1>Prime React</h1>
                <ul></ul>
              </nav>
           </header>
        </div>
    )
}

export default Navigation;
```

After this our Navigation function should be imported inside our `app.js` file, within the div of our app.js we add our Navigation function so as to make our Navigation code display on the browser

```
import Navigation from './component/Nav';
```

This should be at the top of our `app.js` file.

Within the div tag of our `app.js` file, we add our Navigation element:

```javascript
<div classname="App"> 
 <Navigation />
</div>. 
```

A screenshot of our app.js file
![App](/engineering-education/using-prime-react-in-react-applications/app.png)

CSS styles can be added to change the pre-defined styles.

#### Step 5 - Making use of PrimeReact Components
To add PrimeReact components to our project, we first need to import them into our project. We will be using some prime react components such as Menubar, ProgressBar, and Button components in this tutorial.

To use the Menubar component, we import it inside our `Nav.js` file inside our component folder, then add it within our nav tag HTML element to make it display within our Navigation 

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';s
```

The above should be added at the top of our `Nav.js` file, within our Navigation function we then create a const variable called a list that will store an array of labels and icons.

This is shown below:
 
 ```javascript
 const list = [
    {label: 'Home', icon: 'pi pi-fw pi-home', command: () => window.location.href='/';
},
    {label: 'About', icon: 'pi pi-fw pi-file', command: () => window.location.href='/about';
},
    {label: 'Contact', icon: 'pi pi-fw pi-phone', command: () => window.location.href='/contact';
},
    {label: 'Log In', icon: 'pi pi-fw pi-sign-in', command: () => window.location.href='/signin';
}
]
```

Then we add Menubar, Button, and InputText components within our nav tag inside our return React function. 

Our `Nav.js` file should look like this

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import './Nav.css'

const Navigation = () => {
     const list = [
        { label: 'Home', 
          icon: 'pi pi-fw pi-home', 
          command: () => window.location.href='/';
        },
        { label: 'About',
          icon: 'pi pi-fw pi-file', 
          command: () =>  window.location.href='/about';
         },
        { label: 'Contact', 
          icon: 'pi pi-fw pi-phone', 
          command: () => window.location.href='/contact';
        },
        { label: 'Log In', 
          icon: 'pi pi-fw pi-sign-in', 
          command: () =>   window.location.href='/signin';
        }
    ];
    
    return(
        <div className='navigation'>
            <header>
                <h1>Prime React</h1>
                 <nav>
                    <ul>
                        <li>
                          <Menubar
                              model={list}
                              start={<InputText placeholder="Search" type="text"/>}
                              end={<Button label="PrimeReact" icon="pi"/>}
                          />
                        </li>    
                    </ul>
                </nav>
            </header>
        </div>
    )
}
export default Navigation;
```

The list variable will store what will be displayed on our Navigation bar.
The label shows the values we want to display on our navigation, we can change it to anything we want.
The command gives functionality to our navigation label, it enables links when we click our label
The icon represents our primereact icons. The icons can be changed.
On our menubar component the modal displays our list variable, the start and end properties is not necessary at all we can remove it we don't like it, it can also be edited or rearrange to fit our desire. I won't remove it cause to me it looks professional.
If we are not satisfied with the style on our menubar we can always use in-line styling or import an external css styles to over-ride our current style.

> To know more about primereact icons click [here](https://www.primefaces.org/diamond/icons.xhtml)
> To know more about Menubar components from [here](https://primefaces.org/primereact/showcase/#/menubar)

In the div tag, we added a className and gave it the value navigation (we can call the value anything we want). The className value will serve as a link to our external CSS style sheet, we must create a CSS file called Nav.css to store our external CSS styles then import Nav.css in our component so as to make the styles work in our application.   
The above code makes our Navigation bar responsive on all device screen sizes.

We can change the style or theme of our PrimeReact components if it's not styled. You can read more about the Prime React theme from [here](https://primefaces.org/primereact/showcase/#/theming)

Our App.js file should look like this below

```javascript
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navigation from './component/Nav';

function App() {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
```

> From this tutorial, one should be able to use PrimeReact to make a responsive navigation bar. 

### Summary

We learned from this tutorial:

- PrimeReact and its uses.
- How to add PrimeReact components in our application.
- How to create a responsive navigation bar.

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

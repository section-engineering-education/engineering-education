---
layout: engineering-education
status: publish
published: true
url: /using-prime-react-in-react-applications/
title: How to use PrimeReact in React Applications
description: In this article, we will create a Responsive Navbar in a React Application using a Library called Prime React. PrimeReact is a open source library which has styled components.
author: gerald-ezenagu
date: 2021-12-07T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-prime-react-in-react-applications/hero.png
    alt: PrimeReact in React Applications Hero Image
---
React is all about components, these help us to reuse our JavaScript code over and over. It also helps us maintain and update the pages. React can be used to build single-page applications and user interfaces.
<!--more-->
PrimeReact is like CSS, which can be used while styling the user interfaces. But unlike CSS, PrimeReact has a pre-defined style for each component, which can be used in our React application.

### Table of contents
- Navigation
- What is PrimeReact
- Create React application
- Adding PrimeReact dependencies
- Modifying our React application
- Creating a Nav component
- Making our Navigation Bar responsive
- Adding Routes to our Navigation

### Prerequisites
For this tutorial, the reader will need:
- Basic knowledge of React.js.
- Little knowledge of npm.
- Have visual studio code and npm installed, click [here](https://code.visualstudio.com/) to download visual studio code.

### Goal
- To create a responsive navigation bar using Prime React components in a React.js application.
- To use PrimeReact components in our project.
- To add Route to PrimeReact component.

Let's start coding.

### Navigation 
In every website or rather a multi-page application, there exist a navigation menu usually located at the top of the website. This serves as direction for visitors to access various pages of a website. It provides a good user experience to the site as visitors can easily access the contents of the website.

It is important for every website to have navigation, unless the website is a static website. In this tutorial, we are going to learn how to use PrimeReact component to make a responsive navigation menu that has routing capabilities. 

### What is PrimeReact?
PrimeReact is a UI component library for React applications. PrimeReact has different components for themes, styles, and icons that can be imported to use in our React application. It is a free open-source library.

When creating a React project, the main thing on a developer's mind is the layout and user interface of the project. Styling a particular component of a react project can be tricky and time consuming, but with PrimeReact we don't have to worry much about the styles. 

We only need to import the particular component that we want to render in our project and PrimeReact takes care of the styles. Sometimes the component we render may not be styled the way we want. PrimeReact allows us to modify the styles and properties of the component we render in our project. 

> To know more about PrimeReact click [here](https://primefaces.org/primereact/showcase/#/).

#### Step 1 - Create React application
When creating a React application, we first go to the folder where the application is stored. To create a React application, type the following command in a terminal or a command prompt:

```bash
npx create-react-app my-prime
```

After installing, type `cd my-prime` to go into `my-prime` folder. Type `npm start` to start the development server. The React website can be seen on `http://localhost:3000/` in your system browser.

#### Step 2 - Adding PrimeReact dependencies
To add PrimeReact dependencies into our project, we first open the terminal of our visual studio code. Ensure that the terminal is accessing `my-prime` folder.

Input `npm install primereact primeicons --save` and press "enter" to install prime react and prime icons. `PrimeReact` components need the `PrimeIcons` library for icons and `react-transition-group` for animations.

Type `npm install react-transition-group` and press "enter" to install `react-transition-group`.  After that has been installed, we then type `npm install react-router-dom` and press "enter".

If the dependencies we installed are shown as below in the `package.json` file, then our installation was successful. 

```JSON
"dependencies": {
    "primeicons": "^4.1.0",
    "primereact": "^6.6.0",
    "react-transition-group": "^4.4.2",
    "react-router-dom": "^6.0.2"
  },
```

#### Step 3 - Modifying our React application
When we create a react project, react has some pre-defined codes that we need to modify. Go to `http://localhost:3000/` in your browser, a website showing React logo will be displayed.

Let's modify the website codes by editing the `app.js` file in your visual studio code editor, then remove all code within the `div` tag except `import './App.css'`. 

```JavaScript
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

We then import our prime react themes and icons.

```JavaScript
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

The above CSS files provided by PrimeReact should be added at the top of the `app.js` file to enable primereact icons, themes, and styles to be effective in our browser.

Our `app.js` file should look like this:

```JavaScript
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
We first need to create a component and import it into our `app.js`. For example, within the `src` folder, let's create a separate folder called `components`, where we'll store our Navigation code.

Within the `components` folder, we can create a new file and name it `Nav.js`. Then, we create a React function called Navigation, within the return parentheses we create a navbar for the browser using HTML elements like `div` tag, the `header` tag, `nav` tag, and `ul` tag.

```JavaScript
const Navigation = () => {
    return(
        <div>
           <header>
              <nav>
                <ul></ul>
              </nav>
           </header>
        </div>
    )
}

export default Navigation;
```

After this our Navigation function should be imported inside our `app.js` file, within the `div` of our `app.js`, we add our `Navigation` function that displays on the browser.

```JavaScript
import Navigation from './component/Nav';
```

This should be at the top of our `app.js` file. Within the div tag of our `app.js` file, we add our Navigation element:

```JavaScript
<div classname="App"> 
 <Navigation />
</div>. 
```

A screenshot of our app.js file:

![App](/engineering-education/using-prime-react-in-react-applications/app.png)

CSS styles can be added to change the pre-defined styles.

#### Step 5 - Making our navigation bar responsive 
In this tutorial, we'll be using Menubar which is one of the many navigation components PrimeReact gives us for our navigation. When styling the navigation menu, it's important to style both small and large screen sizes. 

With `Menubar` component we don't have to style any screen size. We can edit the component, change the theme and add icons to our navigation menu.This makes our navigation responsive on all screen sizes, thereby giving our navigation a better user experience and makes it easily accessible for mobile devices.

To use the `Menubar` component in our project, we need to import it inside our `Nav.js` file inside our component folder, then add it within our `nav` tag HTML element to make it display within our `Navigation` function.

```JavaScript
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    return(
        <div>
           <header>
              <nav>
                <ul>
                    <Menubar />
                </ul>
              </nav>
           </header>
        </div>
    )
}

export default Navigation;
```

The `Menubar` as shown above should be added at the top of our `Nav.js` file. We can see our Menubar is placed inside a `ul` element, we have to create a navigation list that will be rendered in our Menubar.

We can create this list within our `Navigation` function or import it as properties or props. The list to be rendered must be stored in a variable, where we can call the variable that we want. 

This will store an array with objects nested within it. Within the object, we pass in the value we want on our navigation. We then assign the values to a label text, this will store the values.

PrimeReact allows us to add icons to our values, if needed. It is not a must to add icons to our navigation. The icons help in representing our values. Our navigation list should look like this. Here, we can call the variable and label values anything that we want.
 
```JavaScript
const navlist = [
  {label: 'Home', icon: 'pi pi-fw pi-home'},
  {label: 'About', icon: 'pi pi-fw pi-file'},
  {label: 'Contact', icon: 'pi pi-fw pi-phone'}
]
```

The icon recieve PrimeReact icons (pi), the position we want the icon to be, foward (pi-fw), and the value of the icon (pi-home). We then pass our `navlist` variable as a property to the `Menubar`.

The name of the property that will holds `navlist` is a model, we can't change the name, if we do our navlist items will not be rendered to the Document Object Model (DOM), same goes for label in our code above.

PrimeReact component has been coded to host certain values, if we change these values our code won't work. The model recieves the variable inside an object because we want to use JavaScript values inside JSX and pass it to the Menubar which then renders the variables to our navigation.

Our `Nav.js` file should look like this:

```JavaScript
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
     const navlist = [
        { label: 'Home', icon: 'pi pi-fw pi-home'},
        { label: 'About', icon: 'pi pi-fw pi-file' },
        { label: 'Contact', icon: 'pi pi-fw pi-phone'}
    ];
    
    return(
        <div>
            <header>
                 <nav>
                    <ul>
                          <Menubar
                              model={navlist}
                          />
                    </ul>
                </nav>
            </header>
        </div>
    )
}
export default Navigation;
```

> To know more about primereact icons click [here](https://www.primefaces.org/diamond/icons.xhtml).
> To know more about Menubar components from [here](https://primefaces.org/primereact/showcase/#/menubar).

We can change the theme of our PrimeReact components. PrimeReact gives us many themes to choose from, we can use different themes for our navigation.

They affect the background-color and color of our Menubar. We can choose either a light theme or a dark theme for our navigation.

We're currently using a `vela-blue` theme. It can be changed by navigating to our `app.js` file, and edit the `theme.css` to the desired theme, while importing.

```JavaScript
import "primereact/resources/themes/vela-blue/theme.css"; // edit vela-blue to change theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

You can see most Prime React themes from [here](https://primefaces.org/primereact/showcase/#/theming).

#### Step 6 - Adding routes to our navigation
After adding our Menubar component to our navigation and rendering it on the DOM, if we click on any of our rendered `navlist` nothing will happen to our website. The Uniform Resource Locators (URL) must redirect to a page when clicked, but it doesn't.

The `Menubar` component only renders pre-defined styles to the DOM, but it has no routes, it doesn't navigate our website, which is the main reason for using it. To make our navigation easier for users and go to the pages they clicked.

We can solve this by adding a command that runs an anonymous function when clicked any of our `navlist` variable. The function will hold the `href` which we will pass the desired URL path to, but remember `href` is mostly used in HTML or JavaScript Syntax Extension (JSX) in React.

We can also use `href` keyword through the windows, which is a DOM object, by using one of it's method called `location` which contains a `href` property. To use `href` through the windows, we assign the `windows.location.href` to the desired route, as a string.

```JavaScript
const navlist = [
  {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
      window.location.href='/';
  }},
  {label: 'About', icon: 'pi pi-fw pi-calendar', command: () =>{
      window.location.href='/about'
  }},
  { label: 'Contact', icon: 'pi pi-fw pi-phone', command: () =>{
      window.location.href='/contact'
  }}
]
```

The code we added, runs the anonymous function when clicked to the `href` path, thereby redirecting our website to the site clicked. `/about` and `/contact` does not have React pages. We will have to create them manually.

Within the `components` folder, we create a new file and name it `About.js`. Inside `About.js` we also create a React Function just like we did in the `Nav.js` called `About` and export it as default, we can now return some JSX inside this component.

Let's add a header (h1) that displays some information to the DOM as shown:

```JavaScript
const About = () => {
    return(
        <h1>This is the About page</h1>
    )
}

export default About;
```

With all these done, before we click `About` on our `Navigation`, we need to add the routes to the component and set a path for it to be displayed on the DOM, we can't just import it to our `app.js` file.  

To add Route to our About component, we need to import it from react-router-dom into our `app.js` file. We import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.

We can't use `Route` without wrapping it with `Routes`, which is wrapped under `BrowserRouter`. Within the `Route` tag, we add two properties called `path` and `element`.

The `path` accepts the location we want our component to be rendered and the `element` accepts the component we want to render to the DOM as shown:

```JavaScript
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navigation from './component/Nav';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Routes>
            <Route/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

Then, we import our `About` component into our `app.js` file, and pass it to our Route as a property so as to render it on the specified path. We can also add another `Route` for the `Home` link in our navigation, but we will only pass a path to this particular Route.

Now, our `App.js` file should look like this:

```JavaScript
import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navigation from './component/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from '/component/About';

function App() {
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Routes>
            <Route path='/about' element={<About/>}/>
            <Route path="/" element={null} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

The above code renders our `About.js` component to the DOM when `About` is clicked on our navigation. While the second `Route` has an element of `null` since we want to return back to our initial page. We can do the same for our remaining links in the navigation.

> To know more about react router click [here](https://reactrouter.com/docs/en/v6/getting-started/overview).

A screenshot of our app.js file:
![App](/engineering-education/using-prime-react-in-react-applications/code.png)

> From this tutorial, one should now be able to use PrimeReact to make a responsive navigation bar that has routing capabilities.

### Conclusion
In this tutorial we learned what:
- PrimeReact is and its uses.
- How to add PrimeReact components in our application.
- How to create a responsive navigation bar.
- How to add routes to our navigation list.

Happy coding.

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/) & [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

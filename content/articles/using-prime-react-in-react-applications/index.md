React is all about components that helps us to reuse our JavaScript code over and over. React is used to build single page applications and user interface easily. 
 
PrimeReact is like CSS, which is used in styling the user interface of our application. But unlike CSS, PrimeReact has pre-defined style in each components, which we can use in our React application.

> To know more about PrimeReact click [here](https://primefaces.org/primereact/showcase/#/)

### Table of contents
- What is PrimeReact
- Create React application
- Adding PrimeReact dependencies
- Modifying our React application
- Creating a Nav component
- Making our Navigation Bar responsive
- Adding PrimeReact components to our project

### Prerequisites
For this tutorial:
- Basic knowledge of React.js
- Little knowledge on npm
- Have Visual studio code and npm installed 

### Goal
To create a responsive navigation bar using Prime React components in a React.js application.
Let's start coding.

### What is PrimeReact:
PrimeReact is a library of UI components for React application. PrimeReact has different components for themes, styles and icons which we can import and use in our React application.

It is a free open source library.

#### Step 1 - Create React application

When creating React application, we first go to the folder we want our application to exist.

To create a React application type following command in a terminal or cmd:

```
npx create-react-app my-prime
```

After installing, type `cd my-prime` to go into my-prime folder.

Type `npm start` to start the development server. The React website can be seen on `http://localhost:3000/` in your system browser.

#### Step 2 - Adding PrimeReact dependencies

In order to add PrimeReact dependencies into our project, we first open the terminal of our visual studio code. Ensure that the terminal is accessing my-prime folder

Input `npm install primereact --save` and press "enter" to install prime react
then `npm install primeicons --save` also press "enter" to install primeicons.

PrimeReact components need PrimeIcons library for icons and react-transition-group for animations.

Type  `npm install react-transition-group` and press "enter" to install react-transition-group.

If the dependencies we installed are shown in the `package.json`, file then our installation was successful. As shown below:

```JSON
"dependencies": {
  "primeicons": "^4.1.0",
  "primereact": "^6.6.0",
  "react-transition-group": "^4.4.2"
},
```

#### Step - 3 Modifying our React application

When we create a react project, react has some pre-defined codes we need to modify. Go to `http://localhost:3000/` in your browser, A website showing React logo will be displayed. Let's modify the website codes. Open app.js file in your visual studio code editor, then remove all code within the div tag except `import './App.css'`. 

```javascript
import React from 'react'; //for React
import './App.css' // for CSS

function App() {
  return (
    <div className = "App">
      
    </div>
  );
}

export default App;
```
We then import our prime react themes and icons. The below should be added at the top of the `App.js` file to enable primereact icons, theme and styles be effective in our browser.

```javascript
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

Our `App.js` file should look like this:

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

We first need to create a component and import it into our `App.js`.

For example, within the `src/` folder, let’s create a separate folder called `components/` where we'll store our Navigation code.

Within the `components/` folder, we create a new file and name it `Nav.js`. 

We then create a React function called Navigation, within the return parentheses we create a nav bar for our browser using HTML elements like div tag, header tag, nav tag and ul tag.

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

After this our Navigation function should be imported inside our `App.js` file. Within the div of our `App.js` we should add our Navigation function so as to make our Navigation code display on the browser

This should be at the top of our `App.js` file:

```JavaScript
import Navigation from './component/Nav';
```

Within the div tag of our `App.js` file we add our Navigation element:

```javascript
<div classname="App"> 
 <Navigation />
</div>. 
```

Css styles can be added to change the pre-defined styles.

#### Step 5 - Making our Navigation Bar responsive 

To add PrimeReact components to our project, we first need to import them into our project. We will be using some prime react components such as Menubar, ProgressBar and Button components in this tutorial.

To use Menubar component, we import it inside our `Nav.js` file inside our component folder, then add it within our nav tag HTML element to make it display within our Navigation.

The above should be added at the top of our `Nav.js` file.

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';s
```

In our Navigation function, we then create a const variable called list that will store an array of label and icons:
 
 ```javascript
const list = [
  {label: 'Home', icon: 'pi pi-fw pi-home'},
  {label: 'About', icon: 'pi pi-fw pi-calendar'},
  {label: 'Contact', icon: 'pi pi-fw pi-file'},
  {label: 'Log In', icon: 'pi pi-fw pi-cog'}
]
```

Then we add Menubar, Button and InputText component within our nav tag inside our return. 

Our `Nav.js` file should look like this

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import './Nav.css'

const Navigation = () => {
     const list = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'About', icon: 'pi pi-fw pi-calendar'},
        {label: 'Contact', icon: 'pi pi-fw pi-file'},
        {label: 'Log In', icon: 'pi pi-fw pi-cog'}
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
                              end={<Button label="PrimeReact" icon="pi "/>}
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

> To know more about the `Menubar` component from [here](https://primefaces.org/primereact/showcase/#/menubar)

The navigation classname is used to change the pre-defined CSS styles of our React project.

The above code makes our Navigation bar responsive on all device screen size.

We can change the style or theme of our PrimeReact components if it's not styled. You can read more about Prime React theme from [here](https://primefaces.org/primereact/showcase/#/theming)

#### Step 6 - Adding Prime React components to our project

We can also import and use a ProgressBar component in our project. First we import it from primereact 

```javascript
import { ProgressBar } from 'primereact/progressbar';"
```

The above code must be placed within the app.js file, then we add the ProgressBar element inside our div tag.

```javascript
<div classname="App"> 
 <Navigation /> 
 <br /> 
 <ProgressBar value={value} /> 
</div>. 
```

This will display our progressbar below our navigation.

ProgressBar has two modes; `determinate` (default) and `indeterminate`. In determinate mode, a value between 0 and 100 is needed to display the progress. 

We can also import and use a InputText component in our project, as highlighted below

```javascript
import { InputText } from 'primereact/inputtext';"
```

Like our ProgressBar we also import our InputText inside app.js file, then add it inside our div tag.
 
 ```javascript
<div classname="App"> 
 <Navigation /> 
 <br /> 
 <ProgressBar value={value} /> 
 <br />
 <InputText />
</div>. 
```

When you refresh your browser, you will see an empty input text under the progressbar.

We can also import and use a Button component in our project. We first import in inside our app.js then add it to our div tag

```javascript
import { Button } from 'primereact/button';". 
```

Then we import it inside our div tag

 ```javascript
 <div classname="App"> 
 <Navigation /> 
 <br /> 
 <ProgressBar value={value} /> 
 <br />
 <InputText/>
 <br />
 <Button label="Click Me" />
</div>
```

If you go to your browser you will see a button with the words "Click Me" this button will not be styled. We can add more styles to the button by adding an i tag within it. You can read more about PrimeReact Button components from [here](https://primefaces.org/primereact/showcase/#/button)

The Button element then becomes,

```javascript
 <Button label="Click Me" >
 <i className="pi pi-spin pi-spinner" style={{'fontSize': '4px'}}></i>
 </Button> 
 ```

In summary, our entire code in app.js file is displayed below\

```javascript
import './App.css';
import 'primereact/resources/themes/vela-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import Navigation from './component/Nav';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

const App = () =>{    
  return(
    <div className="App">
      <Navigation />
      <br/>
      <ProgressBar mode="indeterminate" /> 
      <br/>
      <InputText/>
      <Button label="Click" >
        <i className="pi pi-spin pi-spinner" style={{'fontSize': '4px'}}></i>
      </Button>  
    </div>
  )
}
export default App;
```

> From this tutorial, one should be able to use PrimeReact components. 

#### Summary

We learnt the following from this tutorial:

- PrimeReact and its uses.
- How to create a responsive navigation bar.
- PrimeReact components.

Happy Coding!


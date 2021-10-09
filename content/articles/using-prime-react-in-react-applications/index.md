### How to create a responsive React navigation bar using PrimeReact
React is all about components, these helps us to reuse our JavaScript code over and over. It also maintain and update the page.
React is used to build single page application and user interface.
 
### Introduction
PrimeReact is like CSS, which is used in styling the user interface of our application.
But unlike CSS, PrimeReact has pre-defined style in each components, which we can use in our React application.

### Table of contents
- What is PrimeReact
- Create React application
- Installing PrimeReact dependencies
- Modifying our React application
- Creating a Nav component
- Making our Navigation Bar responsive
- Adding PrimeReact components to our project

### Prerequisites
For this tutorial:
- Basic knowledge of React.js
- Little knowledge on npm
- Have visual studio code and npm installed 

### Goal
To create a responsive navigation bar using Prime React components in a React.js application.
To use PrimeReact components in our project.

Let's start coding.

### What is PrimeReact:
PrimeReact is a UI components for React application.
PrimeReact has different components for themes, styles and icons which we can import and use in our React appliction.
It is a free open source library.

#### Step 1 - Create React application
Navigate to the folder you want your React project to exist and create a React project by typing the following command in a terminal or cmd.

```bash
npm create-react-app my-prime
```

Once the installation is complete, type `cd my-prime` to go into my-prime folder.
Type `npm start` to start the development server. You can view the React application by navigating to `http://localhost:3000/` in your system browser.

#### Step 2 - Installing PrimeReact dependencies
To install PrimeReact dependencies, we first open the terminal of our visual studio code. Ensure that the terminal is accessing my-prime folder

Input `npm install primereact --save` and press "enter" to install prime react
then `npm install primeicons --save` also press "enter" to install primeicons.

PrimeReact components need PrimeIcons library for icons and react-transition-group for animations.

Type  `npm install react-transition-group` and press "enter" to install react-transition-group.

To confirm that the dependencies have been installed, we check the package.json file to see if our dependencies have been installed. This is shown below

```JSON
"dependencies": {
    "primeicons": "^4.1.0",
    "primereact": "^6.6.0",
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.3",
    "@testing-library/user-event": "^12.6.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "react-transition-group": "^4.4.2",
    "web-vitals": "^0.2.4"
  },
```

#### Step - 3 Modifying our React application
When we create a react project, react has some pre-defined codes we need to modify.
For instance, when you type `http://localhost:3000/` in your browser, you will see a react logo. Let's remove these elements first to avoid confusion. Go to your app.js file and delete all the code in the div tag and every import statement except `import './App.css'`. 

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
We then import our prime react themes and icons

```javascript
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
```

The above should be added at the top of the app.js file to enable primereact icons, theme and styles be effective in our browser.

Our app.js file should look like this below

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

> To know more about PrimeReact click [here](https://primefaces.org/primereact/showcase/#/)

#### Step 4 - Creating a Nav component
We first need to create a component and import it into our app.js. 
For example, within the src folder, let’s create a separate folder called component, where we will store our Navigation code. 
Within the component folder, we create a new file and name it Nav.js. 
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

After this our Navigation function should be imported inside our app.js file, within the div of our app.js we add our Navigation function so as to make our Navigation code display on the browser

`import Navigation from './component/Nav';` This should be at the top of our app.js file.

Within the div tag of our app.js file we add our Navigation element

```javascript
<div classname="App"> 
 <Navigation />
</div>. 
```

Css styles can be added to change the pre-defined styles.

#### Step 5 - Making our Navigation Bar responsive 
To use PrimeReact components, we first need to import them into our project. We will be using some prime react components such as Menubar, ProgressBar and Button components in this tutorial.

To use Menubar component, we import it inside our Nav.js file inside our component folder, then add it within our nav tag HTML element to make it display within our Navigation 

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';s
```

The above should be added at the top of our Nav.js file, within our Navigation function we then create a const variable called items that will store an array of label and icons.
This is shown below 
 
 ```javascript
 const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ]
```

Then we add Menubar, Button and InputText component within our nav tag inside our return React function. 

Our Nav.js file should look like this

```javascript
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import './Nav.css'

const Navigation = () => {
     const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home'},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
    return(
        <div className='navigation'>
            <header>
                <h1>Prime React</h1>
                 <nav>
                    <ul>
                        <li><Menubar
                            model={items}
                            start={<InputText placeholder="Search" type="text"/>}
                            end={<Button label="PrimeReact" icon="pi "/>}
                        /></li>    
                       
                    </ul>
                </nav>
            </header>
           
        </div>
    )
}
export default Navigation;
```
The items variable will store what will be displayed on our Navigation bar. 

>You can read more about Menubar components from [here](https://primefaces.org/primereact/showcase/#/menubar)

The navigation classname is used to change the pre-defined CSS styles of our React project. 
The above code makes our Navigation bar responsive on all device screen size.
We can change the style or theme of our PrimeReact components if it's not styled . You can read more about Prime React theme from [here](https://primefaces.org/primereact/showcase/#/theming)

#### Step 6 - Adding Prime React components to our project
We can also import and use a ProgressBar component in our project.
First we import it from primereact 

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
 <InputText/>

</div>. 
```

When you refresh your browser, you will see an empty input text under the progressbar.

We can also import and use a Button component in our project.
We first import in inside our app.js then add it to our div tag

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

</div>.
```

If you go to ypur browser you will see a button with the words "Click Me" this button will not be styled. We can add more styles to the button by adding an i tag within it. You can read more about PrimeReact Button components from [here](https://primefaces.org/primereact/showcase/#/button)

The PrimeReact button that we imported in the project is styled, as shown below.

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

> You can follow this example to incorporate other Prime React in your project. Other important components can be found [here](https://primefaces.org/primereact/showcase/#/setup)

#### Recap
From the above tutorial, we have learned:
* What PrimeReact is all  about.
+ How to add PrimeReact dependencies in a React.js application.
+ How to use PrimeReact components and icons.
+ We have seen how easy it is to build websites by incorporating PrimeReact UI in React applications. You can,  use this information to build complex applications.


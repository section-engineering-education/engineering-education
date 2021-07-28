---
layout: engineering-education
status: publish
published: true
url: /working-with-styled-components-in-react/
title: Working with Styled-components in React
description: In this tutorial, you will learn an overview of React and what styled-components are, and why it is a good choice for styling web pages.
author: elly-omondi
date: 2021-07-27T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-styled-components-in-react/hero.jpg
    alt: Styled-components
---
In this tutorial, you will learn an overview of React and what styled-components are, and why it is a good choice for styling web pages. In the end, we will build a simple web page in React and add styles to it using styled-components.
<!--more-->
Let's get it started!

### Prerequisites
Be sure to have the following requirements installed and running to follow the coding part.
1. Command Line Interface running on administrative privileges.
2. Basic knowledge of [JavaScript programming language](https://www.w3schools.com/js/DEFAULT.asp) and [CSS](https://www.w3schools.com/css/).
3. A package manager, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm).
4. Code Editor of your choice. I will be using [VS Code](https://code.visualstudio.com/download).
5. [Node.js](https://www.nodejs.org). You can download the latest version.

### Table of contents
This article will cover:
- [What is React?](#what-is-react)
- [What are Styled-components](#what-are-Styled-components)
- [Advantages of using Styled-components](#advantages-of-using-styled-components)
- [Creating and styling a simple web-page using styled-components](#styling-a-simple-webpage)

### What is React
React is an open-source JavaScript library built and maintained by Facebook. When faced with the need to build elegant and responsive user interfaces/UI components, React is the go-to framework. React is preferred by Front End developers because it is Component-Based. 

React as a frontend library integrates well with backend development libraries such as Node.js, Django, Java, and Ruby.

React is fast, simple, and scalable because it renders data changes in your applications without reloading the application.

Each part of your application in React can be built separately and can be reused as a [Component](https://www.w3schools.com/react/react_components.asp). Components are basic reusable JavaScript functions that handle what is rendered on the screen (UI) and the order in which it is rendered (How UI is pieced together). Component return HTML scripts and other pieces built separately as [JSX](https://reactjs.org/docs/introducing-jsx.html) code through the [render()](https://reactjs.org/docs/components-and-props.html) function.

The components are then composed together to form complex user interfaces. In addition, components allow developers to split their UIs into independent and reusable sections to engage each section in isolation.

In a web application, the essential parts like the navigation bar, the search bar, the header, and many other sections can be built as components and merged into a single UI.

Components in React can be written as Functions or Classes - which accept defined inputs/[props](https://reactjs.org/docs/components-and-props.html) to determine what is rendered on the browsers. [Props],(https://reactjs.org/docs/components-and-props.html) shortened from properties, are like function arguments that let you pass data as input from one component to the other. 

A functional component is a JavaScript function that accepts single-props as an argument passed to a component and returns a react element without using the `render()` method.

On the other hand, class components are written as ES6 classes that extend the base component called [React.Component](https://reactjs.org/docs/react-component.html) and have a `render()` method that return all defined React elements. 

Buttons, Forms, Content areas, Navs, and Dialog sections are a few of the frontend parts that can be defined as components.

Now that we've seen what React is and what a Component is, let's look into `styled-components`. 

### What are Styled-components
`Styled-components` is a library built for React and React Native developers. It allows you to use component-level styles in your applications. `Styled-components` leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.

`Styled-components` are based on tagged template literals, meaning actual CSS code is written between backticks when styling your components. This gives developers the flexibility of reusing their CSS code from one project to another.   

With `styled-components`, there is no need to map your created components to external CSS styles.

### Advantages of using Styled-components
Below are some of benefits of using styled-components:
- Eliminates class name bugs: `styled-components` provide unique class names for your styles, thus eliminating the problems with class names duplications, misspellings, and overlaps.
- Easier management of CSS: With every bit of styling tied to a specific component, it is easier to know which CSS is applied This makes it easy to delete unused component styles.
- Simple and dynamic styling: Through props and global themes supported in `styled-components`, styling is simple without manually managing dozens of classes.
- Reproducible styles: When you style with `styled-components`, you can import your styles into other project areas no matter how big or small your codebase is.

### Creating and styling a simple web page using Styled-components
This section will create a clone for the [disney+](https://www.disneyplus.com/) landing page and add CSS to its components using the styled-components.

First, we need to create an app in React that will contain our landing page.

Within a folder of your choice, open the [command prompt](https://www.thewindowsclub.com/how-to-open-command-prompt-from-right-click-menu) and type the following command:

```JavaScript
npx create-react-app disney-landing-page 
``` 

This will initialize and create our react app named `disney-landing-page` by loading and installing all the React dependencies required for our app.

Once all the dependencies are installed, a development environment for our React application will be ready.

To get into our project folder, use the command below in the command prompt or the terminal of your code editor:

```bash
cd disney-landing-page

```

#### Installing Styled-components
Next, we install the `styled-components` and the `react-router-dom` libraries into our project using the commands below:

```bash
yarn add styled-components
```

```bash
yarn add react-router-dom
```

#### Starting the development server
To start the development server for the app, run either of the two commands on your terminal, depending on which package manager you are using. 

```JavaScript
yarn start
```

```JavaScript
npm start
```

This is the expected result:

![Server](/engineering-education/working-with-styled-components-in-react/server-start-up.png)

With everything set for our project, we can now open the project in a code editor and begin writing some code.

Your app structure should look like this:

![App structure](/engineering-education/working-with-styled-components-in-react/structure.png)

#### Creating our component 
First, we need to create a folder to store our components. Within the *src* folder in your project structure, create a folder and name it *components*.

![Components folder](/engineering-education/working-with-styled-components-in-react/component.png)

In your newly created components folder, create two files and name one *Landing.js* and the other *Header.js*. Next, we will create our components and style them within these two files, as we will see shortly.

Before we start working with the CSS-in-JS (Styled-components), open the *Landing.js* file and add the following code to create our first component: 

We create the `Landing.js` component with the code below:

```JavaScript
import styled from "styled-components";// the styled components library we installed is imported here!
// This component will render the landing page contents in container.
const Landing = (props)=>{ // a functional component
  return 
     (<Container>
         <Content>
         <Content>
     </Container>);
}
export default Landing;
```

To create our second component, open the `Header.js` file in the component folder. 

Add the following code to the file:

```JavaScript

import styled from "styled-components";

// This component will render a Navbar before styling.
const Header = (props)=>{
    return (
    <Nav>
        Header
    </Nav>
    );
}

export default Header;
```

#### Routing a Component into the main app
To get things started, let's open `App.js`  which is the base of our application. Then, we replace all the content in it with the code below to create an app function that will load our Styled-components and render them as the landing page.

After building components/pages in your web application, you may need to expose and let your users navigate through them. To achieve this, you need a dedicated router. 

[React router](https://medium.com/@marcellamaki/a-brief-overview-of-react-router-and-client-side-routing-70eb420e8cde) is a standard library for dynamic routing of components/page views in simple ReactJs applications like single page web applications.

[React Router](https://reactrouter.com/web/guides/quick-start) keeps UIs and URLs synchronized giving users seamless navigation in web applications.

To route components into the main app, you will import features from the `react-router-dom`, a React-router package that we installed earlier.

```JavaScript
Import {BrowserRouter as Router, Switch, Route} from "react-router-dom";//The Router, Switch, and Route will help us move between our created component and the main App.js.
Import Landing from "./components/Landing" //This is to import the component created in the Landing.js file.
Import Header from "./components/Header"  // This is to import the component created in the Header.js file.
Import './App.css';//Load a set of predefined CSS that will define how HTML elements in the landing page behave.
 
function App() {   //main app
   return(
  <div>
   <Router>
     <Switch>
       <Route exact path="/">
      
       </Route>
     </Switch>
   </Router>
  </div>)

export default App; 

```

This component will render a `Navbar` before styling.

Now that we have created our components, it is time to route it into the `App.js`. 

To do so, add the code below between the *Route tags* as shown below:

```JavaScript
 <Landing/>
```

```JavaScript
 <Header/>
```

The final `App.js` should now contain the following code:

```JavaScript

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/Header";
import './App.css'

function App() {
  return(
  <div>
   <Router>
     <Switch>
       <Route path="/">
         <Landing/>
         <Header/>
       </Route>
     </Switch>
   </Router>
  </div>)
}

export default App;
```

![App.js final](/engineering-education/working-with-styled-components-in-react/App.js.png)

### Onto some styling now
Be sure to create an images folder inside the public folder of the application.

You should have the landing page background image (BgImage), Disney+ icon image, logoOne, and logoTwo within the folder.

You can obtain the images and the icon from this [Google Drive](https://drive.google.com/drive/u/0/folders/1Jl336qas6ikZHpeb1u78F4qVphQDCf-1).


Let's add some cool features onto our created components (`Landing` and `Header`) and style them using the `styled-components` depending on what content they hold.

Add the following code between the `Content tags` in the `Landing.js` component.

```JavaScript
          <BgImage/>{/*holder for the landing page back-ground image should be here*/}
           <CTA>
               <LogoOne src="images/cta-logo-one.svg" alt='' /> {/*holder for your logo-one should be here, to be styled as imgage*/}
               <Signup>GET IT ALL HERE</Signup>
               <Description> {/*holder for a paragraph of text to be styled as p tag*/}
                   Get premium access to raya and the latest dragon show with a Disney+ subscription. As of 03/04/2021
                   , the price of Disney+ and the Disney bundle will increase by $1.
               </Description>
               <LogoTwo src = "images/cta-logo-two.png" alt='' /> {/*holder for your logo-two should be here, to be styled as image*/}
            </CTA>
         
```

Next, add the code below between the `Nav tags` in the `Header.js` component.

```JavaScript
        <Logo>
             <img src="/images/logo.svg" alt= "Disney+"/>
        </Logo> 
```

*Bravo if you reached up to this point!*

The unstyled page should resemble the screenshot below:

![unstyled](/engineering-education/working-with-styled-components-in-react/unstyled.png)

To style the Container, Content area, Paragraph, Button, and Images in our `Landing.js` component, write the following CSS-in-JS immediately after the line, *export default Landing*.

#### Styling the container
To set a layout for items in the container, the CSS properties like `overflow`, `flex`, `text-alignment`, and more can be used as shown below.

```JavaScript
{/*Container is declared in JavaScript and styled. Section is assigned to it*/}
{/*then CSS code is written within backticks to act on the Container*/}

const Container = styled.section`  
overflow: hidden;  
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;
`;
```

#### Styling the content area
To create space around elements in the content area, set elements `height` and `position`. One may use the CSS properties like `margin`, `height`, `width`, `padding`, and `position` for additional customization.

```JavaScript
{/*Content is declared in JavaScript and styled.div is assigned to it*/}
{/*CSS code is written within backticks(tagged-template literals) to render all content inside a div*/}

const Content = styled.div` 
 margin-bottom: 10vw;
 width: 100%;
 position: relative;
 min-height: 100vh;
 box-sizing: border-box;
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 padding: 80px  40px;
 height: 100%;

`;
```

#### Styling the background image
CSS properties like `background-size` and `z-index` will let you set the image to cover full div and give other elements priority over the image, respectively. We can also set `background-position` from the image.

```JavaScript
{/*BgImage is declared in JavaScript and styled.div is assigned to it*/}
{/*CSS code is written within backticks(tagged-template literals) to render the image inside a div*/}

const BgImage = styled.div` 
height: 100%;
background-position: top;
background-size: cover;
background-repeat: no-repeat;
position: absolute;
background-image: url("images/back-ground.jpg"); {/*the image is loaded as a url*/}
top: 0;
left: 0;
right: 0;
z-index: -1
`;
```

#### Styling the call to action (CTA) area
To center all elements in the CTA area, we'll set `margin-right` and `margin-left` as `auto`. `justify-content` enforces center alignment of the elements in CTA.

CSS properties like `max-width`, and `margin` will allow us to set the coverage area for the elements.

```JavaScript
{/*The CTA will hold both the two logos and the description. It is styled as a div*/}
const CTA = styled.div`
margin-bottom: 2vw;
max-width: 650px;
display:flex;
flex-direction:column;
flex-wrap: wrap;
justify-content: center;
margin-top: 0;
margin-right: auto;
margin-left: auto;
text-align: center;

`;
```

#### Styling LogoOne 
The image in LogoOne needs to have no `background-color`, have a `height` and `width` of certain pixels and also have `margin-space` between it and the elements below. 

To achieve the styling above, use the CSS properties below:

```JavaScript
{/*LogOne styled as an image to render the img tag*/}
{/*CSS is to define height, width, margin*/}
const LogoOne = styled.img`
margin-bottom : 12px;
background-color: none;
max-width: 700px;
min-height: 60px;
display: block;
width: 100%;
 
 `;
```

#### Styling the signup button
We will use the [hover selector](https://www.pluralsight.com/guides/create-a-hover-button-in-a-react-app) to create a button with the `hover` effect and display a `background-colour` on hover.

```JavaScript
{/*SignUp is styled to wrap around a text and appear as button.It is styled as anchor tag*/}
{/*CSS is to used define how it should appear*/}
const Signup = styled.a`
font-weight: bold;
color: #f9f9f9;
background-color: #0063e5;
margin-bottom: 12px;
width: 100%;
letter-spacing: 1.5px;
font-size: 25px;
padding: 16.5px 0;
border: 1px solid transparent;
border-radius: 4px;

&:hover{
    background-color :#0483ee;
}
`;
```

#### Styling the description
To set `font-size`, `line-height`, `letter-spacing` and `color` for the text in the description, we will use the CSS properties below:

```JavaScript
{/*holder for a paragraph of text to be styled as p tag. This will render a styled paragraph*/}
const Description = styled.p`
color: hsla(0, 0%, 95.3%, 1);
font-size: 14px;
margin: 0 0 24px;
line-height: 1.5em;
letter-spacing: 1.5;

`;
```

#### Styling LogoTwo 
The image in LogoTwo should match the styling requirements similar to that done in styling LogoOne.

```JavaScript
{/*It is styled as an image to render the img tag*/}
{/*CSS is to define height, width, margin*/}
const LogoTwo = styled.img`
margin-bottom : 20px;
max-width: 700px;
min-height: 60px;
display: inline-block;
vertical-align: bottom;
width: 100%;
`; 
```

To style the `Nav` and `Logo` in our `Header` component, add the following code immediately after the *export default Header* in the `Header.js` file.

#### Styling the nav

```JavaScript
{/*Styling with  .nav to render the Nav tag*/} 
const Nav = styled.nav`
position: fixed;   //sets the nav as fixed regardless of any scroll behaviour.
top: 0;
left: 0;
right: 0;
height:70px;                //defines the height of the navbar
background-color: #090b13;  //gives the nav a background a color
display: flex;
justify-content: space-between; //creates space between nav elements
align-items: center;
padding: 0 36px;
letter-spacing: 16px;     
z-index:3;      //sets priority level for the navbar against other elements

`;
{/*Styling the Logo with .a to render the image as an anchor*/}  
const Logo = styled.a` 
padding:0;
width:80px;
margin-top:4px;
max-height:70px;
display: inline-block;
font-size:0;

img{
    display: block;
    width:100%;
   
}
`;
```

The final page, when loaded on your browser, should appear as shown below.

![Styled](/engineering-education/working-with-styled-components-in-react/Landing-page.png)

### Summary
In this tutorial, we explored the library styled-component and its advantages. The simple design and easy integration of styling within React codebase make the development process more efficient. We ended up creating a simple landing page styled using styled-components. 

Happy styling!

### Additional Resources
- Refer to the [Styled-components Docs](https://styled-components.com/docs/basics) for more info.
- [JavaScript](https://www.w3schools.com/js/DEFAULT.asp)
- [CSS](https://www.w3schools.com/css/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

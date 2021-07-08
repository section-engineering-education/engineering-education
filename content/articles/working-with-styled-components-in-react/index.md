---
layout: engineering-education
status: publish
published:
url: /working-with-styled-components-in-react/
title: Working with Styled-components in React
description: Styling a simple web page in React using Styled-components.
author: elly-omondi
date: 2021-06-17T00:00:00-9:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-styled-components-in-react/hero.jpg
    alt: Styled-components
---

### Prerequisites
Be sure to have the following requirements installed and running to follow the coding part.

1. Command Line Interface running on administrative privileges.

2. Basic knowledge of [JavaScript programming language](https://www.w3schools.com/js/DEFAULT.asp) and [CSS](https://www.w3schools.com/css/).

3. A package manager, [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm).

4. Code Editor of your choice. I will be using [VS Code](https://code.visualstudio.com/download).

5. [Node.js](https://www.nodejs.org). You can download the latest version.


If you have worked with React in developing web applications, you will agree with me that adding style to your Components is super cool when using the styled-components feature. In any case, you have not used React or styled-components, do not worry because this article is for you.

In this tutorial, you will learn an overview of React and what styled-components are, and why use it. In the end, we will build a simple web page in React and add styles to it using styled-components.

Let's get it started!

### Table of content
This article will cover:
- [What is React?](#What-is-react)
- [What is Styled-components](#What-is-Styled-components)
- [Advantages of using Styled-components](#Advantages-of-using-styled-components)
- [Creating and styling a simple web-page using styled-components](#Styling-a-simple-webpage)



### What is React
React is a JavaScript library built and maintained by Facebook. React is purely Open-source.
When faced with the need to build elegant and responsive user interfaces/UI components, React is the go-to tool.
React is preferred by Front End developers because it is Component-Based. 

React as a frontend library integrates well with backend development libraries such as Node.js, Django, Java, and Ruby.
React is fast, simple, and scalable because data changes in your applications can be rendered without requiring you to reload your application.

Each part of your application in React is built separately and reusably as a [Component](https://www.w3schools.com/react/react_components.asp) with the component-based feature. The components are then composed together to form complex user interfaces. In addition, components allow developers to split their UIs into independent and reusable sections to engage each section in isolation.

Components in React can be written as Functions or Classes, all of which accept defined inputs as [props](https://reactjs.org/docs/components-and-props.html) to determine what is rendered on the browsers.

Buttons, Forms, Content areas, Navs, and Dialog sections are a few of the frontend parts defined in components.

Now that we've seen what React and a Component is, let's have a look into styled-components. 

### What are Styled-components

Styled-components is a library built for React and React Native developers. It allows you to use component-level styles in your applications. 
Styled-components leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.

Styled-components are based on tagged template literals, meaning actual CSS code is written between backticks when styling your components. This gives developers the flexibility of reusing their CSS code from one project to another.   
With styled-components, there is no need to map your created components to external CSS styles.


### Advantages of using Styled-components
Below are some benefits of using styled-components:

*•	Eliminates class name bugs*: styled-components provide unique class names for your styles, thus eliminating the problems with class names duplications, misspellings, and overlaps.

*•	Easier management of CSS*: With every bit of styling tied to a specific component, it is easier to know which CSS is applied. This makes it easy to delete unused component styles.

*•	Simple and dynamic styling*: Through props and global themes supported in styled-components, styling is simple without manually managing dozens of classes.

*• Reproducible styles*: When you style with styled-components, you can import your styles into other project areas no matter how big or small your codebase is.


### Creating and styling a simple web page using styled-components

This section will create a clone for the [disney+](https://www.disneyplus.com/) landing page and add CSS to its components using the styled-components.

First, we need to create an app in React that will contain our landing page.

Within a folder of your choice, open the [Command prompt](https://www.thewindowsclub.com/how-to-open-command-prompt-from-right-click-menu) and type the following command:

```JavaScript
npx create-react-app disney-landing-page 
``` 
This will initialize and create our react app named disney-landing-page by loading and installing all the React dependencies required for our app.
Once all the dependencies are installed, a development environment for our React application will be ready.

To get into our project folder, use the command below in the command prompt or the terminal of your code editor:

```bash
cd disney-landing-page

```
#### Installing styled-components
Next, we install the styled-components and the react-router-dom libraries into our project through the commands below:

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
The expected result on your web browser is as shown:


![Server](/engineering-education/working-with-styled-components/server start up.png)

With everything set for our project, we can now open the project in a code editor and begin writing some code.
Your expected app structure should look like this :

![App structure](/engineering-education/working-with-styled-components/structure.png)


#### Creating our Component 

First, we need to create a folder to store our components. Within the *src* folder in your project structure, create a folder and name it *components*.

![Components folder](/engineering-education/working-with-styled-components/component.png)

In your newly created components folder, create two files and name one *Landing.js* and the other *Header.js*. Within these two files, we will create our components and style them, as we will see shortly.

Before we start working with the CSS-in-JS(styled-components), open the *Landing.js* file and the following code to create our first component: 

We create the Landing component with the code below:

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

To create our second component, open the *Header.js* file that is in the components folder and add the following code:

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

#### Routing a Component into the main App

To get things started, let's open *App.js*  which will be the base of our application, and replace all the content in it with the code below to create an App function that will load our styled-components and render them as the landing page.

```JavaScript
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";//The Router, Switch, and Route will help us move between our created component and the main App.js.
Import Landing from "./components/Landing" //This is to import the component created in the Landing.js file.
Import Header from "./components/Header"  // This is to import the component created in the Header.js file
import './App.css';//Load a set of predefined CSS that will define how HTML elements in the landing page behave.
 
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
This component will render a Navbar before styling.
Now that we have created our components, it is time to route it into the *App.js*. To do so, add the code below between the *Route tags* as shown below:

```JavaScript
 <Landing/>
```
```JavaScript
 <Header/>
```
The final *App.js* should now contain the following code:

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
![App.js final](/engineering-education/working-with-styled-components/App.js.png)

### Onto some styling now

Be sure to create an images folder inside the public folder of the application.
You should have the landing page background image, disney+ icon image, logo-one, and logo-two within the folder.
You can obtain the images and the icon from [seeklogo](https://seeklogo.com/free-vector-logos/disney?page=4).


Let's add some cool features onto our created components- (Landing and Header) and style them using the styled-components depending on what content they hold.

Add the following code between the *Content tags* in the Landing component.

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

Next, add the code below between the *Nav tags* in the Header component.

```JavaScript
        <Logo>
             <img src="/images/logo.svg" alt= "Disney+"/>
        </Logo> 
```
*Bravo if you reached up to this point!*

To style the Container, Content area, Paragraph, Button, and Images in our Landing component, write the following CSS-in-JS immediately after *export default Landing* line.

#### Styling the Container

```JavaScript
{/*Container is declared in JavaScript and styled.section is assigned to it*/}
{/*then CSS code is written within backticks to act on the Container*/}

const Container = styled.section`  
overflow: hidden;
display: flex;
flex-direction: column;
text-align: center;
height: 100vh;
`;
```

#### Styling the Content Area

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
#### Styling the Call to Action(CTA) area

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
#### Styling the Signup Button

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

#### Styling the Description

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
To style the Nav and Logo in our Header component, add the following code immediately after the *export default Header* in the Header.js file.

#### Styling the Nav

```JavaScript
{/*Styling with  .nav to render the Nav tag*/} 
const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height:70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index:3;

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
The final page, when loaded on your browser, should appear as shown below:
![Styled](/engineering-education/working-with-styled-components/Landing page.png)

### Summary
In this tutorial, we explored React briefly,  what styled-component is, and its advantages. Finally, we created a simple landing page and styled it using styled-components, a React library. 


### Additional Resources
- Refer to the [Styled-components Docs](https://styled-components.com/docs/basics) for more info.
- [JavaScript](https://www.w3schools.com/js/DEFAULT.asp)
- [CSS](https://www.w3schools.com/css/)

Happy styling!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

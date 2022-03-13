# Reactjs Responsive Web Design in One File Using a Custom Hook

date:3/19/2022

#### Topics:Reactjs.

![Reactjs](/engineering-education/content/articles/reactjs-responsive-web-design-in-one-file-using-a-custom-hook/hero.png "by the end, you will be able to do this")

Responsive design is essential when developing web applications, it helps users from different devices have great experience with the application. This can get hard through the way and untidy thats where React and Styled-components gets in the way, we are going to create a simple responsive handler that we will be using in our projects.

From today no need for mobile first approach as it will not affect the desktop design and also desktop will not affect the design in tablets or any other device.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Development environment](#development-environment)
- [Import the styled-components package into your file](#import-the-styled-components-package-into-your-file)      
- [Adding CSS using styled-components](#adding-css-using-styled-components)
- [Creating the responsive handler](#creating-the-responsive-handler)
- [Responsive Menu Example](#responsive-menu-example)
- [Resources](resources)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need the following:
- Basic knowledge of React and Nextjs framework.
- Basic concepts of Styled-Components.
- Nodejs development environment for installation of React.

### Objectives
This tutorial will teach you how to create a responsive handler and how to use it with styled-components in React. By the end, you will appreciate the benefits of React over the traditional Html & Javascript way.


### Development environment.
---

In this tutorial we will use the Nextjs React framework, lets install it.
```bash

```
If you are already using the styled components npm package to render your CSS skip this step.
install the styled-components package.

```bash
npx create-next-app@latest
```
after instaling Nextjs, Make sure that you go to the correct project folder on your command prompt terminal and type this command.

```bash 
cd <project name>
```

install the styled-components

```bash
npm install styled-components
```

if you have visual studio code installed you can open it directly.
```bash
code .
```

### Import the styled-components package into your file
---

The below code will be our demo application that we will be using to add the styling, creating your own demo app is also encoureged.
Importing components in React is easy,we are going to use the following syntax for imports to work.

```javascript
import <name of component> from "<name of package>"
```
lets use this to import styled componets to our project file and get styling into effect.

```javascript
import React from “react”

//this line imports the styled-components package
import styled  from “styled-components”

//when the default export comes before the class components it works just fine
export default class Home extends React.Component{
       render(){
         return(
                  <>
                      <div>
                         <h1>this is a demo page</h1>
                     </div>
                  </>
                  )
     }
}
```

### Adding CSS using styled-components.
---

This only takes two steps creating a store and storing your css inside that store, in this case we will be using 'const' to create a store.
The store is then given a value which is a styled component, all Html elements are supported.
This is the syntax

```javascript
  const <name>=styled.<Html Element>`
  {
    "css"
  }
  `
```

After creating the store then we will distructure it into our render method, lets create a simple h1 element and style it.

```javascript
import React from 'react'

//this line imports the styled-components package
import styled  from “styled-components”
 
  //this line creates a store for storing the styles for our h1
const H1=styled.h1`
font-family:helvetica;
font-size:35px;
position:absolute;
left:25%;
`

//when the default export comes before the class components it works just fine
export default class Home extends React.Component{
       render(){
         return(
                  <>
                      <div>
                         <H1>this is a demo page</H1>
                     </div>
                  </>
                  )
     }
}
```

### Creating the responsive handler.
---

The trick you all are waiting for is the responsive handler, this replaces the repetative use of media queries that leads to unnecessary code length .
Let's create the handler, first define the breakpoints for the screen to be targeted. We are going to use the following pixels, 640 is for small screens,768 for medium screens and tablets for 1024.

```javascript

const breakpoints=[640,768,1024,1280];
```
Then add the handler which implements the media queries to the file.

The following line uses the .map function to illiterate through the defined breakpoints and set them to our media query

```javascript
const mq=breakpoints.map(
bp=>`@media screen and (max-width:${bp}px)`
)
```

We are almost there. We need to use our code to get the responsive effect, let’s destructure the 'mq' method and use it in our project file.
In this example we using the first two breakpoints that give as a small and medium screen respectively that represent mobile devices.

```javascript
import React from 'react'

//this line imports the styled-components package
import styled  from “styled-components”
 
//this line creates an array of brake points
const breakpoints=[640,768,1024,1280]

const mq=breakpoints.map(
bp=>`@media screen and (max-width:${bp}px)`
)

  //this line creates a store for storing the styles for our h1
const H1=styled.h1`
font-family:helvetica;
font-size:35px;
position:absolute;
left:25%;

${mq[0,1]}{
font-size:30px;
color: red;
`

//when the default export comes before the class components it works just fine
export default class Home extends React.Component{
       render(){
         return(
                  <>
                      <div>
                         <H1>this is a demo page</H1>
                     </div>
                  </>
                  )
     }
}
```

### Responsive Menu Example
---


Lets create a responsive menu in React and show our profficient skills in action. In this example we are going to use the grid system in our responsive handler, click [here](https://elimusa.com/) to view a working demo.
first we are going to create a container for our menu and an inner container for the links.
In the link-container we are going to use the grid-template-columns property.

```javascript
grid-template-columns:repeat( 4, minmax(100px, 1fr) );
```
![Responsive menu image on desktop](/engineering-education/reactjs-responsive-web-design-in-one-file-using-a-custom-hook/image-two.png)

The following line of code means that we will have four fractions with 100px each in size. this will be used in desktop screens.

```javascript
    grid-template-columns:repeat( 1, minmax(20px, 1fr) );
```   
![Responsive menu image on mobile](/engineering-education/reactjs-responsive-web-design-in-one-file-using-a-custom-hook/image-one.png)

Here we have one fraction with spacing of 20px, this will create a grid for our mobile menu. lets get the full code for our example.We will have four links Home, Create, Signup, Categories.

```javascript
import React from "react"
import styled from 'styled-components'
import Link from 'next/link'


const breakpoints=[640,768,1024,1280]
export const mq=breakpoints.map(
    bp=>`@media screen and (max-width:${bp}px)`
)


const Menucontainer=styled.div`
position: absolute;
width: 100%;
height: 80px;
left: 0px;
top: 0px;

background: #0F1010;

h1{
    position:absolute;
    color:white;
    font-size:30px;
    left:20px;
}
${mq[0,1]}{
    width:100vw;
    height: 60px;
    height:100%;
    transition:transform 0.3s ease-in-out;
    z-index:20;
    top:0px;
    background:#0F1010;
    }
`
const Linkcontainer=styled.div`
position:absolute;
display:grid;
grid-template-columns:repeat( 4, minmax(100px, 1fr) );
width:40vw;
grid-gap:0px;
left:25%;
${mq[0,1]}{
    left:0;
    top:60px;
    display:grid;
    grid-template-columns:repeat( 1, minmax(20px, 1fr) );
    }
`
const Links=styled.a`
font-family: arial;
font-size:16px;
color:white;
padding:30px 0px;
position:relative;
text-align:center;
cursor: pointer;
${mq[0,1]}{
color:24292F;
display:grid;
grid-template-columns:repeat( 1, minmax(50px, 1fr) );
}
`

export default function Menu (){
  const [open,setOpen]=useState(false)
        return(
              <Menucontainer open={open}>
                <h1>LOGO</h1>
                  <Linkcontainer open={open}>
                     <Link href="/" passHref>
                        <Links>Home</Links>
                      </Link>
                      <Link href="/postarticle" passHref>
                        <Links>create</Links>
                      </Link>
                      <Link href="/" passHref>
                        <Links>categories</Links>
                      </Link>
                      <Link href="/login" passHref>
                        <Links>signup</Links>
                      </Link>
                  </Linkcontainer>
              </Menucontainer>
        )
    }

```


### Resources
---
1. [Nextjs](https://nextjs.org/)
3. [Styed-Components](https://styled-components.com)

### Conclusion.
---

Using this method a lot can be achieved with minimum lines of code, hope you are enjoying react and 
the advantage brings to front-end development.

In the next tutorial, we will show you how to use props and manage the state of the user interface for good UX, thanks a lot for going this far.

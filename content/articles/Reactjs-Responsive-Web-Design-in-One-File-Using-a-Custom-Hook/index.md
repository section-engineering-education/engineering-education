# Reactjs Responsive Web Design in One File Using a Custom Hook

date:3/19/2022

#### Topics:Reactjs.

![Reactjs](/engineering-education/content/articles/Reactjs-Responsive-Web-Design-in-One-File-Using-a-Custom-Hook/hero.png "by the end, you will be able to do this")

### IMPORTANT NOTE: The code and examples have been tested and work with the latest versions of React and styled-components.

I recently fully converted my blog app with styled-components and am loving the number of complex functions one can add, from state management with props to implementing conditions on the CSS part.

At first, I was using raw media queries for responsive design, the code took more than '1000' lines but what I am about to show you solves this problem.
Let's get into the code guys.


### Prerequisites
---

If you are already using the styled components npm package to render your CSS skip this step.
install the styled-components package.

Make sure that you go to the correct project folder on your command prompt terminal and type this command.
```cmd 
//this takes you to the folder
cd <project name>

```
install the styled-components

```cmd
//this installs the package
npm install styled-components
```

### What Will be Covered
---
1. Import the styled-components package into your file.
2. Adding CSS using styled-components.
3. Creating the responsive handler.



### Import the styled-components package into your file

The following code will be our demo application that we will be using to add the styling, creating your own demo app is also encoureged.Copy this to your index.js file.

```javascript
import React from “react”

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

Now add the styled-components package into the code.

```javascript
import React from 'react'

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

 The trick you all are waiting for is the responsive handler, let's create it.
 First, define the breakpoints for the screen to be targeted.

```javascript
//640 is for small screens,768 for medium screens, and tablets for 1024.
const breakpoints=[640,768,1024,1280];
```
Then add the handler which implements the media queries to the file.

The following line uses the .map function to illiterate through the defined breakpoints and set them to our media query
```javascript
const mq=breakpoints.map(
bp=>`@media screen and (max-width:${bp}px)`
)
```
Let's add the code to our index.js file.

```javascript
import React from 'react'

//This line imports the styled-components package.
import styled  from “styled-components”
 
//This line creates an array of brake points.
const breakpoints=[640,768,1024,1280]

const mq=breakpoints.map(
bp=>`@media screen and (max-width:${bp}px)`
)

  //This line creates a store for storing the styles for our h1.
const H1=styled.h1`
font-family:helvetica;
font-size:35px;
position:absolute;
left:25%;
`

//When the default export comes before the class components it works just fine
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

We are almost there. We need to use our code to get the responsive effect, let’s destructure the 'mq' method and use it in our index file.
in this example am using the first two breakpoints that give as a small and medium screen respectively that represent mobile devices.

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

### Resources
---

1. [React.org](https://reactjs.org/)
2. [create-react-app](https://create-react-app.dev/docs/getting-started/)
3. [Styed Components](https://styled-components.com)

### Conclusion.
---

Using this method a lot can be achieved with minimum lines of code, I hope you are enjoying react and 
the advantage brings to front-end development.

In my next tutorial, I will show you how to use props and manage the state of the user interface for good UX, thanks a lot for going this far.

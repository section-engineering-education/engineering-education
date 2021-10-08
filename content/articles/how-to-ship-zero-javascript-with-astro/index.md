---
layout: engineering-education
status: publish
published: true
url: /how-to-ship-zero-javascript-with-astro/
title: How to Build React Web Application Without Shipping Javascript Using Astro
description: This article will guide you on how to build a simple React Web Application Without Shipping Javascript Using Astro.
author: emmanuel-alege
date: 2021-08-12T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-ship-zero-javascript-with-astro/hero.png
    alt: React Web Application Without Shipping Javascript Astro
---
End-users love fast and responsive web applications. But as developers, we may use various kinds of tools that lead to building a sophisticated website. This reduces web applications' performance.
<!--more-->  
Astro is a new tool developed to proffer solutions to web applications' performance.
 
### What is Astro
Astro is a new type of Javascript-based static site generator that provides super-fast performance while also providing a modern developer experience.
 
> A static site generator is a tool that generates static HTML websites from a set of components. The Client-side generates web pages ahead of time instead of rendering them on the server. This reduces load time, reduces end-user’s resources, and improves performance.
 
Aside from being a static site generator, a unique feature about Astro is that you can build your websites user interface (UI) using your favorite Javascript framework such as React, Angular, Svelte, or Vue and Astro will render your website as static HTML at build time.
 
Web pages need client-side Javascript at some point in the browser such as:
- Submitting a form
- Login authentication
- Fetching API
 
When a component requires Javascript for some functionality. Astro renders only the specified component while rendering the remaining part of the webpage as static HTML.
 
### Goal
You will learn how to build a basic static site using Astro. The static website is from a compiled React-based web application.
 
You will also learn how to fetch data in Astro and how to pass dynamic props into React.
 
### Prerequisites
- Basic understanding of [React.js](http://reactjs.org).
- Basic understanding of the command line.
- A command line or terminal(Nodejs 14.15.1 or higher).
- A code editor(IDE). I use [VS Code](https://code.visualstudio.com/download).
- Google Chrome.
 
### Installations
You need to install Node.js version 14.15.1 or higher. Visit [Node.js](https://nodejs.org/en/) official site to download and install the latest version of Node.js. It comes with a pre-installed node package manager (NPM).
 
To check  Node.js is installation and the version installed. 

Open your terminal and type in the command below:
 
```bash
 
node --version
 
```
 
To verify the installation and version of NPM type in the command below in your terminal.
 
```bash
 
npm --version
 
```
 
### Step 1 - Creating a New Astro Project
Create a new directory, the directory will contain all your installed dependencies.
 
Navigate to your command line and type in the line below. You can use the integrated terminal in your code editor.
 
```bash
 
mkdir astro-app
 
```
 
Next, navigate to the directory using the command below.
 
```bash
 
cd astro-app
 
```
 
In your terminal type in the command below to initialize your Astro project:
 
```bash
 
npm init astro
 
```
 
The command above will prompt a message, which asks for the template to start with. For this article, you will select **Starter Kit(Generic)**.
 
![astro-starting-template](/engineering-education/how-to-ship-zero-javascript-with-astro/astro-starting-template.jpg)
 
The selection above will prompt another message. This message will ask you the framework you will like to use as shown in the image below. 

Select React for this article.
 
![select-framwork](/engineering-education/how-to-ship-zero-javascript-with-astro/select-framework.png)
 
Astro will then copy some project files to start our project.
 
Before we go further. Type in the command below in the terminal. 

This command installs the required packages (dependencies):
 
```bash
 
npm install
 
```
 
### Step 2 - Application structure
In this step, we will have an overview of what our application folder structure looks like.
 
We have different folders such as:
- src
- components
- pages
- public
- package.json
 
The ones we are more interested in are:
- **src**: It contains the components, layout, and pages folder. The src is where our project source codes will be.
- **components**: This is inside the src folder. The components folder will contain our React UI components.
- **pages**: This is inside the src folder. Pages folder includes the **index.astro**, this serves as our entry point.
- **astro.config.mjs**: This is a configuration file for our Astro project. It contains a configuration object.
 
```bash
 
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Tour.astro
│   └── pages/
│       └── index.astro
└── package.json
 
```
 
### Step 3 - Installing and configuring our framework to work with astro
The framework we will be using is React. To make Astro support React run the command below. It installs React renderer and React.
 
```bash
 
npm install @astrojs/renderer-react react react-dom -D
 
```
 
After the installation of React renderer and React. Navigate to **astro.config.mjs** and add the code below to the configuration object.
 
```js
 
export default {
 
renderers: ['@astrojs/renderer-react'],
 
```
 
A renderer does the following:
- Transforms your component into strings of HTML.
- Rehydrates the HTML once it reaches the browser.
 
### Step 4 - Starting our development server
Start the development server with the command below:
 
```bash
 
npm start
 
```
 
When you start the project for the first time. Astro, along with [Snowpack](https://www.snowpack.dev/) will prepare your dependencies. It will then start the development server on http://localhost:3000/.
 
You can navigate to http://localhost:3000/ to access your Astro project. This will show some helpful information and a welcome message like the image below:
 
![new-astro-project](/engineering-education/how-to-ship-zero-javascript-with-astro/new-astro-app-scaled.jpg)
 
### Step 5 - Creating a new React component in Astro
In this step, you will create a React component. A React component is one of the main building blocks of React. It is written in **jsx** format. It tells React what should be rendered on the screen.
 
There are two types of React components:
- class components
- functional components
 
For this article, we will be using a functional component.
 
Navigate to the component folder in the main project folder. Create a **Tours.jsx** file in the component folder.
 
Inside the **Tours.jsx** file you created add the following:
 
```js
 
import React from 'react';
 
const Tours = ({ tours }) => {
 
const [readMore, setReadMore] = React.useState(false)
 
return(
 
<step>
 
<div className="title">
 
  <h2>Our Tours</h2>
 
</div>
 
<div>
 
  {
 
    tours.map((tour) => {
 
      return (
 
          <article className="single-tour">
 
            <img width='400' src={tour.image} alt={tour.name} />
 
            <footer>
 
              <div className="tour-info">
 
                <h4>{tour.name}</h4>
 
                <h4 className="tour-price">${tour.price}</h4>
 
              </div>
 
              <p>
 
                {tour.info}
 
              </p>
 
            </footer>
 
          </article>
 
      )
 
    })
 
  }
 
</div>
 
</step>
 
)
 
};
 
export default Tours;
 
```
 
The code above is a function component named **Tours**, we passed in a prop called **tours** as a parameter. The above **Tours** function will display your data in the web page.
 
Inside the **Tours** functional component, we have a bunch of **jsx** code that we will explain below:
 
- **tours.map**: This maps the **tours** passed in as a prop.
- **const [readMore, setReadMore] = React.useState(false)**: This specifies two state variables. **readMore** has the current value of false. **setReadMore** enables you to change the current value. You won't be needing this until a later step.
- **return**: This specifies what should be rendered to the browser. It contains a bunch of **HTML** structures.
- **tour.image**: This specifies the variable named image in each element of the  **tours** prop.
- **tour.name**: This specifies the variable called name in each element of the **tours** prop.
- **tour.price**: This specifies the variable named price in each element of the**tours** prop.
- **tour.info**: This specifies the variable named info in each element of the **tours** prop.
- **export default Tours**: This exports the **Tours.jsx** component. This makes it reusable in other components.
 
### Step 6 - Using Astro to fetch and pass data to your React component
In this step, you will learn how to fetch and pass data to the **Tours.jsx** component you created above.
 
Navigate into **Tour.astro** file, at the top you will see three dashes above and below. 

Inside the dashes is where we will write some JavaScript code that will fetch our data as seen below:
 
Copy the code below inside **Tour.astro** file:
 
```js
 
---
 
import { Markdown } from 'astro/components';
 
import  Tours  from './Tours.jsx';
 
const url = `https://course-api.com/React-tours-project`
 
const tours = await fetch(url).then(response => response.json())
 
---js
 
<article>
 
<step>
 
    <Tours tours={tours} />
 
</step>
 
</article>
 
```
 
Let's have an overview of what is in **Tour.astro** file:
- **Import { Markdown } from astro/components**:  This imports a **markdown component**, which enables us to write markdown inside the file. This is an integrated feature of Astro.
- **import Tours from './Tours.jsx**: This imports the Tour component written in the previous step. This enables us to pass down the data we fetched as a prop to our **Tours** component.
- **const url = `https://course-api.com/React-tours-project`**: This specifies the application programming interface (API) where we will fetch our data.
- **const tours = await fetch(url).then(response => response.json())**: This is a built in Javascript function that fetches our data.
- **\<article>\</article>**: This is an **HTML** tag that will contain and render other **HTML** tags and the **React** component(s) we import.
- **\<Tours tours={tours} />**: This specify the React component we import. Inside it, we passed **tours** as a prop, which contains the data we fetched. Now our data will be displayed in the browser as static HTML. 

It will look like what we have below:
 
![displayed-project](/engineering-education/how-to-ship-zero-javascript-with-astro/displayed-project.png)
 
Now to see how Astro renders your webpage, follow the instructions below:
 
1. Navigate to the **developer tools** of your browser, you can press **F12** to gain quick access.
2. At the top of the developer tool, you will see **network** after **console**. Click on the network.
3. Click on all, it is located at the top.
 
You should see the image below in your developer tools:
 
![network-no-js](/engineering-education/how-to-ship-zero-javascript-with-astro/network-no-js.png)
 
You will see that Astro does not ship **Tours.jsx** component into the browser. Astro loads our React component as a static HTML. 

Now in **Tour.astro**, type these codes below the **tours** variable:
 
```js
 
const tours = await fetch(url).then(response => response.json()) // tours variable
 
console.log(tours)   //type this
 
```
 
Check your browser's console and you will see that nothing was logged to the console. 

Now check your terminal and you will see all the tours data logged into the terminal as we have below:
 
![data-in-node](/engineering-education/how-to-ship-zero-javascript-with-astro/data-in-node.png)
 
Now, if Astro does not ship React or Javascript to our browser. How do we add client-side interactivity to our webpage? 
 
### Step 7 - Hydrating React in the client with Astro
Astro renders your web pages as static HTML. To provide a great user experience you need interactivity in your webpage. Astro provides this interactivity by rendering only the component that you want to make interactive into the generated static HTML. The process of providing this interactivity in Astro is called **partial hydration**.
 
To make our web pages interactive. Astro provides you with five (5) different component attributes, which are:
 
1. default: Renders only HTML (e.g \<Mycomponent/>). Useful when your webpage has no interactivity.
2. load: Hydrate component on webpage load (e.g \<Mycoponent:load/>). Useful when your page has interactivity that needs to load with the webpage.
3. visible: Hydrate component when webpage is visible (\<Mycomponent:visible/>). Useful when the interactivity is on the lower part of the webpage.
4. idle: Hydrate component during webpage idle period (e.g \<Mycomponent:idle/>).
5. media=1234;QUERY: Hydrate component when media query is matched (e.g \<Mycomponent:media=1234;QUERY>). Useful for components that should only display on mobile or desktop screens.
 
In your **Tours.Jsx**, inside the **\<p>** tag change it from **{page.info}** to the code below:
 
```jsx
 
<p>
 
{readMore ? tour.info: `${tour.info.substring(0,200)} . . .`}
 
<button onClick={() => setReadMore(!readMore)}>{readMore ? 'read less' : 'read more'}</button>     
 
</p>
 
```
 
Let's have a quick overview of the code above:
 
- **readMore ? tour.info: `${tour.info.substring(0,200)** : This makes the text content inside the **\<p>** tag have the complete characters of **tour.info** when readMore value is true and characters of 200 when readMore value is **false**. You will see in the browser that some text in the **\<p>** tag is missing because **readMore** has a value of false.
 
- **\<button onClick={() => setReadMore(!readMore)}>{readMore ? 'read less' : 'read more'}</button\>**: This is a **button** tag with a **click** event that updates the value of readmore to opposite of its current value when clicked. At the same time, the text content of the **button** tag is updated to **read less** when the value of readMore is true, and **read more** when the value of readMore is false.
 
Now go to your browser and click on the **button** element. You will see that nothing happens.
 
To see that the button tag functioned, we need to update the **Tours.jsx** component imported inside the **Tour.astro** with one of the component attributes as shown below:
 
```js
 
<Tours:load tours={tours}>
 
```
 
Refresh your browser. You can now see that the text content of **\<p>** tag shows completely. When we click again we see that it goes back to its initial state.
 
### Testing the application
You can test your application by following the steps below:
 
- Navigate to **Google Chrome** browser.
- Type in http://localhost:3000 in the address bar.
 
You should see your web application displayed in your browser.
 
Navigate to the network part of the developer tool as mentioned before. Refresh the browser. You will see that JavaScript, particularly React loads after the webpage finished loading. This shows how powerful Astro is when it comes to web performance.

You can check the source code using this [link](https://github.com/codeInn001/Astro-Review).
 
### Conclusion
This article was an introduction to using Astro to build fast and scalable React web applications. 

You can now use this knowledge to build a more dynamic and powerful web application. You can use any of your favorite JavaScript frameworks.
 
You can also go ahead and have fun with other component attributes provided by Astro.

Astro is still in beta and can change without warning.
 
Have fun coding!

### Extra resources
You can visit the links below to learn more and play around with other features of Astro:
- [astro doc]( https://docs.astro.build)
- [astro github](https://github.com/snowpackjs/astro/tree/main/docs)

---
Peer Review Contributions by: [Wilson Gichuhi](/engineering-education/authors/wilson-gichuhi/)




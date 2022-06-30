---
layout: engineering-education
status: publish
published: true
url: /creating-a-dynamic-footer-component-with-minze/
title: How to Create a Dynamic Footer Component with Minze
description: This article helps the reader understand how to create reusable components using Minze which can then be utilized in other frameworks including React and Vue. 
author: alice-wangari
date: 2022-06-30T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/creating-a-dynamic-footer-component-with-minze/hero.jpg
  alt: How to Create a Dynamic Footer Component with Minze Hero Image
---
Minze framework helps developers create components in a single syntax. You can then utilize these components in other JavaScript frameworks such as React, Vue, and Angular.
<!--more-->
Software developers working on a single project face the challenge of supporting many JavaScript frameworks.

This means that they will have to create the same component in other framework syntaxes, which increases the amount of work.

Minze framework helps developers create components in a single syntax. You can then utilize these components in other JavaScript frameworks such as React, Vue, and Angular.

In this article, we'll look at Minze, a new JavaScript framework. We will focus on how to get started by creating a simple footer component that can be used on any JavaScript-based website.

### Prerequisites
- Basic knowledge of JavaScript and HTML
- [Node.js](https://nodejs.org/en/download/) installed
- A text editor such as Visual Studio Code.

### Table of contents
- [Basic syntax of a component](#basic-syntax-of-a-component)
- [This keyword in Minze](#this-keyword-in-minze)
- [Installing Minze](#installing-minze)
- [Minze project structure](#minze-project-structure)
- [Creating a dynamic footer component with Minze](#create-a-dynamic-footer-component-with-minze)
- [Conclusion](#conclusion)

### Understanding Minze
[Minze](https://minze.dev/) is a Javascript framework for building reusable, modular, and responsive native web applications. 

When building a web application, you can use Minze to create a dynamic component that can be used in multiple places in your application.

### Basic syntax of a component
Just like other frameworks, Minze has a basic syntax that appears as follows:

```js
import {MinzeElement} from 'minze';
export class MyComponent extends MinzeElement {
  //add your attributes and methods here

  html = () => {
    //add your HTML here
  }
  css = () => {
    //add your CSS here
  }
}
```

Minze syntax has the declaration section, where you specify attributes and methods. The HTML section is where you add your HTML. 

Finally, you add CSS to the CSS section to beautify your component.

### This keyword in Minze
Depending on your goals, there are several methods to define data in a Minze component. In the end, the component may access all data provided by attributes.

`this` keyword is used to access attributes, methods, and other data in the component, as demonstrated below:

```js
import {MinzeElement} from 'minze';
export class MyComponent extends MinzeElement {
  constructor() {
    super();
    this.name = 'John';
    this.age = 30;
  }

 html = () =>`
      <div>
        <h1>${this.name}</h1>
        <p>${this.age}</p>
      </div>
    `;
  }
```

In the above example, we have created a constructor function that sets the name and age attributes using`this` keyword. The HTML shows the name and age in the browser.

### Installing Minze
Let's start by installing Minze using the command below:

```bash
npm i -g minze #Installing Minze globally
```

After installing Minze, we can scaffold a new project as follows:

```bash
npm init minze@latest
```

Here, your machine will prompt you to enter a project name. We will use the name `minze-project` for this tutorial. 

Next, we will be asked to choose between JavaScript and TypeScript. Note that we will select JavaScript in this tutorial

![console](/engineering-education/creating-a-dynamic-footer-component-with-minze/console.png)

Let's now navigate to our project directory:

```bash
cd minze-project
```

Next, we need to run the following command to install appropriate dependencies:

```bash
npm install
```

After installing the dependencies, we can now run the project:

```bash
npm run dev #Running the project
```

Our project should now be running in the browser. We can now open the browser and navigate to the URL `http://localhost:3000/`:

![running minze project](/engineering-education/creating-a-dynamic-footer-component-with-minze/running-minze-project.png)

Congratulations! You have successfully created a Minze application.

### Minze Project Structure
Let's now take a look at the project structure. Open the project directory in your text editor:

![project structure](/engineering-education/creating-a-dynamic-footer-component-with-minze/project-structure.png)

The `src` directory contains the `assets` and the `lib`. The `assets` directory contains the external assets used by the project. 

The `lib` directory contains the components used by the project. The `src` directory also contains:

- The `cdn.js` file that is used to load the components.
- The `module.js` is the entry point for the project.
- `template.js` is the template file used to render the components.
- `vite.js` acts as the primary entry point for the template file, assigned with ID `app`.

The project also contains a `package.json` file that includes the project's dependencies. We also have `rollup.config.js`, which compiles your code to other supported formats. 

`vite.config.js` is used to configure [Vite](https://vitejs.dev/) to work with Minze.

### Creating a dynamic footer component with Minze
We shall start by deleting the files in the `lib` directory. Next, we shall create two files in the `lib` directory. 

We will name the files `minze-home.js` and `minze-footer.js`.

Let's now open the `minze-footer.js` file and add the following code:

```js
import { MinzeElement } from "minze";
export class MinzeFooter extends MinzeElement {
  html = () => `
  <div>
    <p>Copyright &copy; ${new Date().getFullYear()}</p>
  </div>
`;
```

In the code above, we have created a footer component that displays the copyright year. We have used the HTML section to return the footer in the browser.

From here, we need to style the footer component. We can do this using the following code:

```js
  css = () => `
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;
    margin-top: auto;
    background-color: #f5f5f5;
  }
`;
```

We can now add the following code to the `minze-home.js` file:

```js
import { MinzeElement } from 'minze'

export class MinzeHome extends MinzeElement {
  //Create a dynamic footer component with Minze

  html = () => `
  <div class="home">
    <h1>Section Engineering Education</h1>
    <p>This is a tutorial on how to build a web footer component using the Minze framework.</p>
    <p>The Minze framework is a lightweight framework for building web components.</p>
    </div>
    <minze-footer></minze-footer>
  `

  css = () => `
    :host {
      width: 100%;
      min-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
    }

    .home {
      text-align: center;
      font-size: 1.25rem;
      font-weight: bold;
    }
    h1{
      color: rgb(42, 134, 14);
    }
  `
}
```

We have created a `MinzeHome` component from the code above that displays the home page. We have used `<minze-footer></minze-footer>` to display the footer component in our application.

We have also utilized `host` to style the entire component from our CSS.

#### Exporting created components
We export the components that we have created in the `module.js` file:

```js
export * from './lib/minze-home'
export * from './lib/minze-footer'
```

By doing this, we can now use the components in our application.

#### Rendering the component
We shall render our component in the `template.js` file. We can do this by adding the following code:

```js
export default `
  <minze-home></minze-home>
`
```

Finally, we can now view the project to see the result:

![footer component](/engineering-education/creating-a-dynamic-footer-component-with-minze/footer-component.png)

Developers no longer have to worry about the challenges of switching framework syntaxes while using Minze. 

### Conclusion
This article has covered how to create a dynamic footer using Minze. We have also discussed how to create a component and render it in the application. 

All frameworks, including React, Vue, Svelte, and ordinary HTML, should be able to utilize this component.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
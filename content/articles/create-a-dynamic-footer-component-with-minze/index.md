### Create a dynamic component with Minze
Teams working on a single project face the challenge of supporting many JavaScript frameworks simultaneously due to many new frameworks in the JavaScript ecosystem.

Minze framework came into the picture to help devs create components in a single syntax. You can create components in a single syntax and use it in all the frameworks you want, e.g., React, Vue, Angular, etc.

In this article, we'll look at Minze, a new JavaScript framework, and how to get started by creating a simple footer component that can be used on any JavaScript-based website.

### Prerequisites
- Basic knowledge of JavaScript and HTML
- [Node.js](https://nodejs.org/en/download/) installed
- A text editor

### Table of Contents
- [Basic syntax of a component](#basic-syntax-of-a-component)
- [This keyword in Minze](#this-keyword-in-minze)
- [Installing Minze](#installing-minze)
- [Minze Project Structure](#minze-project-structure)
- [Create a dynamic footer component with Minze](#create-a-dynamic-footer-component-with-minze)
- [Conclusion](#conclusion)

### Understanding Minze
[Minze](https://minze.dev/) is a Javascript framework for building reusable, modular, and responsive native web applications. When building a web application, you can use Minze to create a dynamic component that can be used in multiple places in your application.

Minze syntax has the declaration section, where you declare your attributes and methods. The HTML section is where you add your HTML. The CSS section is where you add styles to beautify your component.

### This keyword in Minze
There are various methods to define data in a Minze component. Every technique has a particular specific goal. In the end, the component may access all data provided by attributes.

The `this` keyword is used to access data in the component. It is used to access attributes, methods, and other data in the component. We can show an example of this in the following code:

```JavaScript
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

We have created a constructor function from the code above that sets the name and age attributes using the `this` keyword. The HTML shows the name and age in the browser.

### Installing Minze
Let's start by installing Minze:

```bash
npm i -g minze #Installing Minze globally
```

After installing Minze, we can scaffold a new project by using the following command:

```bash
npm init minze@latest
```

Here, your machine will prompt you to enter the name of your project. We will use the title `minze-project` for this tutorial. Then, we will be asked to choose between JavaScript and TypeScript. We will select JavaScript in this tutorial but feel free to choose your preferred language:

![console](/engineering-education/create-a-dynamic-footer-component-with-minze/console.png)

Let's now navigate to our project directory:

```bash
cd minze-project
```

Next, we need to run the following command:

```bash
npm install
```

This command is used to install all the dependencies for the project. After installing the dependencies, we can now run the project:

```bash
npm run dev #Running the project
```

Our project will now be running in the browser. We can now open the browser and navigate to the URL `http://localhost:3000/`:

![running minze project](/engineering-education/create-a-dynamic-footer-component-with-minze/running-minze-project.png)

Congratulations! You have successfully created a Minze application.

### Minze Project Structure
Let's now take a look at the project structure. Open the project directory in your text editor:

![project structure](/engineering-education/create-a-dynamic-footer-component-with-minze/project-structure.png)

The `src` directory contains the `assets` and the `lib`. The `assets` directory contains the external assets used by the project. The `lib` directory contains the components used by the project.

The `src` directory also contains:

- The `cdn.js` file that is used to load the components.
- The `module.js` is the entry point for the project.
- `template.js` is the template file used to render the components.
- `vite.js` acts as the primary entry point for the template file, assigned with ID `app`.

The project also contains a `package.json` file that includes the project's dependencies. We also have `rollup.config.js`, which converts a tiny piece of code into something bigger. `vite.config.js` is used to configure [Vite](https://vitejs.dev/) to work with Minze.

### Create a dynamic footer component with Minze
We shall start by deleting the files in the `lib` directory. Next, we shall create two files in the `lib` directory. In our case, we shall name them `minze-home.js` and `minze-footer.js`.

Let's now open the `minze-footer.js` file and add the following code:

```JavaScript
import { MinzeElement } from "minze";
export class MinzeFooter extends MinzeElement {
  html = () => `
  <div>
    <p>Copyright &copy; ${new Date().getFullYear()}</p>
  </div>
`;
```

We have created a footer component from the code above that displays the copyright year. We have used the HTML section to return footer in the browser.

From here, we need to style the footer component. We can do this by adding the following code:

```JavaScript
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

```JavaScript
import { MinzeElement } from 'minze'

export class MinzeHome extends MinzeElement {Create a dynamic footer component with Minze

  html = () => `
  <div class="home">
    <h1>Section Engineering Education</h1>
    <p>This is a tutorial on how to build a web footer component using the Minze framework.</p>
    <p>The Minze framework is a lightweight framework for building web components.</p>
    </div>
    <minze-footer></minze-footer>
  `

  css = () => `
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

We have utilized `:host` to style the entire component from our CSS, for which we have given some properties.

#### Exporting created components
We export the components that we have created in the `module.js` file:

```JavaScript
export * from './lib/minze-home'
export * from './lib/minze-footer'
```

By doing this, we can now use the components in our application.

#### Rendering the component
We shall render our component in the `template.js` file. We can do this by adding the following code:

```JavaScript
export default `
  <minze-home></minze-home>
`
```

Finally, we can now view the project to see the result:

![footer component](/engineering-education/create-a-dynamic-footer-component-with-minze/footer-component.png)

Developers will no longer have to worry about the hassle of switching framework syntaxes while using this solution.

The code used in this tutorial can be found on my [GitHub Repo](https://github.com/Alicewangari/dynamic-footer-component-with-Minze).

### Conclusion
This article has covered how to create a dynamic footer using Minze. We have also covered how to create a component and render it in the application.
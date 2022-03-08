JavaScript has numerous framework that helps you implement your application out of the pos. This includes React.js Vue, Angular, Next.js, Svelte, Node.js, and Aurelia.js. Each framework enables you to achieve your application objectives. Frameworks such as Aurelia.js, React.js Vue, Angular, Next.js, and Svelte are used to create the frontend web application. In this guide, we will learn how to get started and use Aurelia to build web apps.

Aurelia is a JavaScript client framework for web, mobile, and desktop that leverages simple conventions to empower your UI creativity. Aurelia is the only framework that lets you build applications components using vanilla JavaScript/TypeScript. It uses modern JavaScript and HTML to let you get started quickly and build complex apps.

On the other hand, Typescript is a superset of JavaScript. Typescript is gaining a lot of popularity among JavaScript developers. It is one of the fast-developing programming languages for building extensive applications.

This guide will help you set up and run Applications using TypeScript while still using the Aurelia.js framework.

### Why use TypeScript

This guide will help you set up and run Applications using TypeScript while still using the Aurelia.js framework.

### Common features of Aurelia

This guide will help you set up and run Applications using TypeScript while still using the Aurelia.js framework.

### How to set up a basic TypeScript Aurelia project

Let's dive and set up Aurelia TypeScript. First, you need to install the [Aurelia CLI](https://aurelia.io/docs/cli/webpack/) (command-line interfaces). An interface is a medium through which a user can interact with any tool using a computer. A CLI is a way to interact with the computer program bY typing in instructions or commands.

Aurelia provides CLI commands that allow you to bootstrap the Aurelia project. This allows you to have a sample project that you can build on rather than creating an application from scratch. This bootstrapped app comes will preconfigured settings that you can use on the fly. This prevents developers from creating redundant settings every time they create an appliv=cation. It saves time and increases the developers' productivity.

To bootstrap an Aurelia app, you must first install the [Aurelia CLI](https://aurelia.io/docs/cli/webpack/) globally on your computer. To do this, run this command on your terminal:

```bash
npm install aurelia-cli -g
```

Once you have installed the CLI, proceed and bootstrap the basic Aurelia project. Create a project folder and run this Aurelia command:

```bash
au new
```

This command will launch an interactive interface that allows you to choose the default settings of your Aurelia project. Once you run the command, enter the application name of your choice.

![auleria-app](auleria-app.png)

In this tutorial, we are creating the Auleria app with TypeScript code. Thus you need to set the right environment to execute TypeScript. In your command line, select the **Default TypeScript App** as shown below:

![aurelia-typescript](aurelia-typescript.jpg)

Use the arrow keys or numbers to select the **Default TypeScript App** and hit enter to submit.

Finally, select the dependency manager you want to use between NPM and Yarn.

This will create a ready configured Aurelia TypeScript app. To test if the setup is working, run `npm start`. Once done, open `http://localhost:8080/` on your browser. This will log a **Hello World** on your browser.

![test-app](test-app.jpg)

This indicates that the created setup is working and ready to start building on your Auleria applications.

### Build a Todo app using Aurelia and TypeScript

Let's dive in to create and run a todo application using this configuration. This will use the TypeScript code to create the application.

As we said, Aurelia is the only framework that lets you build applications using vanilla JavaScript/TypeScript. It uses modern JavaScript/TypeScript and HTML to let you get started quickly and build complex apps. In this case, the code structure of Aurelia looks similar to that of the vanilla JavaScript/TypeScript. It becomes very handle to build an application using such technologies while still maintaining the relevance of backed simplicity.

To start setting up the application code, navigate to the project's `src` directory and implement the todos using TypeScript, as shown below.

### Set up the todos Inteface

Typescript uses [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to define classes. A class acts as a blueprint for an object. A Typescript interface act as a blueprint for creating classes. An interface lets you define the data structures of your application. This describes the shape of your data object structures. For example, using the todo's scenario, a single todo will have a title that describes that todo. This will also require you to specify the type of data the title takes, such as number, string, etc.

Head over to your project directory and create an `app.ts` file to create an interface. Then use the keyword `interface` followed by your interface name, as shown below.

```ts
interface Todo {
}
```

The add properties that define the shape of the object as shown below;

```ts
interface Todo {
  title: string;
  description: string
  completed: boolean;
}
```

Any object that doesn't have this described structure is rendered incompatible. The consumers of this interface must implement these properties.

This becomes quite useful when you have multiple teams working on a very large project. If someone decides to name things differently or forget something, the application will adhere to the set properties. The properties named differently will automatically become incompatible with the set object. This helps you avoid some code errors around your teams.

Therefore, it makes sense to have a common description of the specific properties of a todo.

### Create todos class

As described above, a class acts as a blueprint for an object. The object is now created in the above step. Let's now set up a class that describes its blueprint. To do this, Navigate to the `app.ts` file and follow the following steps;

### Set up the `App` class

One of the important use cases where an interface is really useful is when setting up a class. This sets the compatibility of your data. A class basically has the same properties as the `interface` at any given time. If all the required properties are not set, the whole data set becomes incompatible. Below is how the class `App` will be set based on the interface `Todo`.

```ts
class App {
  heading = "Todos List APP";
  todos: Todo[] = [];
  todoTitle = '';
  todoDescription = '';
}
```

This will add a heading/ title to the application and array of todos and empty properties `todoTitle` and `todoDescription`.

### Create constructors and methods

A class goes hand in hand with a constructor. A constructor is commonly referred to as a special method that has the same name as the class. In Typescript, a constructor is a special function with the keyword `constructor`. It constructs/initializes the object before it gets assigned to its methods.

A method gets assigned to the initialized constructor. Here you will create methods to add, remove and clone a todo. The methods body specifies the properties you want to want access. These are the properties of the class on which you're running this method. In simple terms, a method runs an instance of the class `App`.

Below is how to set up these constructors and methods. Thet goes inside the class `App`:

- Add a new todo

```ts
addTodo() {
    if (this.todoTitle || this.todoDescription) {
        this.todos.push({
            title: this.todoTitle,
            description: this.todoDescription,
            completed: false
        });
        this.todoTitle = '';
        this.todoDescription = '';
    }
}
```

- Delete a todo

```ts
removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
        this.todos.splice(index, 1);
    }
}
```

This will delete existing todos from the existing list.

- Clone a todo

```ts
cloneTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
        this.todos.push(todo);
    }
}
}
```

This copies and duplicate an existing todo. The `indexOf()` will access the index of an added todo. Then `push()` will compy and duplicate that todo and add it to the application.

Finally, export your class to access it within your application.

```ts
export { App }
```

### Set up the Aurelia template

```html
<template>
</template>
```

```html
<nav class="navbar navbar-daNrk bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand">Todo App</a>
        <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
</nav>
```

```html
<h1 class="text-center">${heading}</h1>
```

```html
<form submit.trigger="addTodo()">
    <label for="addTodoInput" class="form-label">Enter New Todo</label>
</form>
```

```html
<input type="text" value.bind="todoTitle" id="addTodoInput" class="form-control" placeholder="Enter Title">
```

```html
<input type="text" value.bind="todoDescription" id="addTodoInput" class="form-control" placeholder="Enter Description">
```

```html
<button class="btn btn-primary" type="submit" disabled.bind="!todoTitle">Submit</button>
```

```html
<div class="form-check" repeat.for="todo of todos">
</div>
```

```html
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked.bind="todo.completed">
```

```html
<label class="form-check-label" for="flexCheckDefault"
    css="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
    ${todo.title}
    ${todo.description}
</label>
```

```html
<button class="btn btn-danger" click.trigger="removeTodo(todo)">Delete</button>
```

```html
<button click.trigger="cloneTodo(todo)">Clone</button>
```
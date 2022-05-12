---
layout: engineering-education
status: publish
published: true
url: /setup-and-run-applications-using-typescript-with-aureliajs/
title: Setup and Run Applications using TypeScript with Aurelia.js
description: In this guide, we will build a basic todo application using TypeScript and Aurelia.js. We will explore more about Aurelia.js and how it helps with building application easily.
author: moses-maina
date: 2022-04-30T00:00:00-08:00
topics: [Languages, Node.js]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/hero.png
   alt: Setup And Run Applications Using TypeScript With AureliaJS Hero Image
---
In this tutorial, we will learn how to build an application using Aurelia.js with TypeScript. JavaScript has several frameworks that help implement applications out of the box.
<!--more-->
This includes React.js, Vue.js, Angular.js, Next.js, Svelte.js, Node.js, Aurelia.js, and much more. In this guide, we will learn how to get started with Aurelia.js to build web applications.

Aurelia is a JavaScript client framework for web, mobile, and desktop that leverages simple conventions to empower your UI creativity.

Aurelia is the only framework that lets you build components using vanilla JavaScript/TypeScript. It uses modern JavaScript and HTML to let you get started quickly and build complex apps.

### Prerequisites
To follow along with this guide, it is essential to have the following requirements:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge of how to use [JavaScript](https://www.youtube.com/watch?v=W6NZfCO5SIk), [TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/), and [HTML](https://www.youtube.com/watch?v=qz0aGYrrlhU).

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Why use TypeScript?](#why-use-typescript)
- [Why use Aurelia?](#why-use-aurelia)
- [How to set up a basic TypeScript Aurelia project?](#how-to-set-up-a-basic-typescript-aurelia-project)
- [Build a Todo app using Aurelia and TypeScript](#build-a-todo-app-using-aurelia-and-typescript)
  - [Set up the todos interface](#set-up-the-todos-interface)
  - [Create todos class](#create-todos-class)
    - [Set up the `App` class](#set-up-the-app-class)
    - [Create constructors and methods](#create-constructors-and-methods)
    - [Add a new todo](#add-a-new-todo)
    - [Delete a todo](#delete-a-todo)
    - [Clone a todo](#clone-a-todo)
  - [Set up the Aurelia template](#set-up-the-aurelia-template)
    - [Add a filter component](#add-a-filter-component)
    - [Get the application header](#get-the-application-header)
    - [Add a form to add todos](#add-a-form-to-add-todos)
    - [Add todo title form input](#add-todo-title-form-input)
    - [Add todo description form input](#add-todo-description-form-input)
    - [Add a button to submit the form input](#add-a-button-to-submit-the-form-input)
    - [Update a todo](#update-a-todo)
    - [Delete a todo](#delete-a-todo-1)
    - [Clone a todo](#clone-a-todo-1)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Why use TypeScript?
TypeScript can be said to be a superset of JavaScript. Lately, it has been gaining a lot of popularity among JavaScript developers. It is one of the fast-developing programming languages to build extensive web applications.

TypeScript helps improve the existing features that JavaScript has with static typing. This helps speed up your application development cycle. With TypeScript types, you can catch errors even before you run your code. 

Static typing gives you quick hints based on the code structure that you are writing. TypeScript has a ton of amazing features. Check this guide and [learn more features](/engineering-education/a-friendly-beginner-guide-to-typescript/) and why is [TypeScript is getting so popular](/engineering-education/typescript-static-typing/).

### Why use Aurelia?
Aurelia is the only framework that lets you build applications using vanilla JavaScript/TypeScript. It uses modern JavaScript/TypeScript and HTML to let you get started quickly and build complex apps.

In this case, the code structure of Aurelia looks similar to that of the vanilla JavaScript/TypeScript. It becomes very handy to build an application using such technologies while maintaining the relevance of backend simplicity.

### How to set up a basic TypeScript Aurelia project?
Let's dive and set up an Aurelia TypeScript project.

First, you'll need to install the [Aurelia CLI](https://aurelia.io/docs/cli/webpack/) (command-line interface). An interface is a medium through which a user can interact with any tool using a computer. CLI is a way to interact with the computer program by typing in instructions or commands.

Aurelia provides CLI commands that allow you to bootstrap the Aurelia project. This allows you to have a sample project that you can build on rather than creating an application from scratch.

This bootstrapped app comes will preconfigured settings that you can use on the fly. This avoids creating redundant settings every time we create an application. Therefore, it saves time and increases the developers' productivity.

To bootstrap an Aurelia app, you must first install the [Aurelia CLI](https://aurelia.io/docs/cli/webpack/) globally on your computer.

To do this, run this command on your terminal:

```bash
npm install aurelia-cli -g
```

Once you have installed the CLI, proceed and bootstrap the basic Aurelia project. Create a project folder and run this Aurelia command:

```bash
au new
```

This command will launch an interactive interface that allows you to choose the default settings of your Aurelia project. Once you run the command, enter an application name of choice.

![aurelia-app](/engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/aurelia-app.png)

In this tutorial, we are creating the Aurelia app with TypeScript code. Thus, you need to set the right environment to execute TypeScript. In your command line, select the **Default TypeScript App** as shown below:

![aurelia-typescript](/engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/aurelia-typescript.jpg)

Use the arrow keys or numbers to select the **Default TypeScript App** and hit enter to submit.

Then, select the dependency manager you want to use between NPM and Yarn. This will create a ready configured Aurelia TypeScript app. To test if the setup is working, run `npm start` inside the created application folder.

Once done, open `http://localhost:8080/` on your browser. This will log a **Hello World** on your browser.

![test-app](/engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/test-app.jpg)

This indicates that the created setup is working and we are ready to build our first Aurelia application.

### Build a Todo app using Aurelia and TypeScript
Let's dive in to create and run a to-do application using this configuration. This will help you get started with the Aurelia app that runs using TypeScript.

To start setting up the application code, navigate to the project's `src` directory and implement the todos using TypeScript, as described in the below steps:

#### Set up the todos interface
TypeScript uses [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) to define classes that act as a blueprint for an object.

A TypeScript interface act as a blueprint for creating classes. An interface lets you define the data structures of your application. This describes the shape of your data object structures.

For example, using the todo scenario, a single todo will have a title that describes that todo. This will also require you to specify the type of data the title takes, such as number, string, etc.

Head over to your project directory and create an `app.ts` file to create an interface. Then, use the keyword `interface` followed by your interface name, as shown below:

```ts
interface Todo {
}
```

Then, add properties that define the shape of the object as shown below:

```ts
interface Todo {
  title: string;
  description: string
  completed: boolean;
}
```

Any object that doesn't have this described structure is rendered incompatible. The consumers of this interface must implement these properties.

This becomes quite useful when you have multiple teams working on a very large project. If someone decides to name things differently or forget something, the application will adhere to the set properties.

The properties named differently will automatically become incompatible with the set object. This helps you avoid some code errors around your teams.

Therefore, it makes sense to have a common description of the specific properties of a todo.

#### Create todos class
As described above, a class acts as a blueprint for an object. Let's now set up a class that describes its blueprint. To do this, navigate to the `app.ts` file and follow the following steps:

#### Set up the 'App' class
One of the important use cases where an interface is really useful is when setting up a class. This sets the compatibility of your data.

A class has the same properties as the `interface` at any given time. If all the required properties are not set, the whole data set becomes incompatible.

Below is how the class `App` will be set based on the interface `Todo`:

```ts
class App {
  heading = "Todos List APP";
  todos: Todo[] = [];
  todoTitle = '';
  todoDescription = '';
}
```

This will add a heading and title to the application, an array of todos, and empty properties `todoTitle` and `todoDescription`.

#### Create constructors and methods
A class goes hand in hand with a constructor. A constructor is commonly referred to as a special method that has the same name as the class.

In TypeScript, a constructor is a special function with the keyword `constructor`. It constructs/initializes the object before it gets assigned to its methods.

A method gets assigned to the initialized constructor. Here, you create methods to add, remove, and clone a todo. The methods body specifies the properties that you want to access. In simple terms, a method runs an instance of the class `App`.

Below is how to set up these constructors and methods. This goes inside the class `App`:

#### Add a new todo

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

When the `addTodo()` is called, a new todo will be added with the three `todos` properties (`title`, `description`, and `completed`).

In this case, use [this keyword](engineering-education/how-to-use-javascript-arrow-functions-and-this-keyword/) to hold the new todos information.

To add the values to the application use `push()` to add the new values to the `todo` properties.

#### Delete a todo

```ts
removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
        this.todos.splice(index, 1);
    }
}
```

`removeTodo()` will delete/remove any existing todo item. To delete a todo, you first need to access the saved todo. In this case, a passing the parameter `todo` to the `removeTodo()` function.

Then, to access the todo, the JavaScript engine will use `indexOf()` to determine the todo you want to delete. This will also access the index of that todo and execute the `splice()`. This will delete existing todos from the existing list.

#### Clone a todo

```ts
cloneTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
        this.todos.push(todo);
    }
}
}
```

The above code block copies and duplicate an existing todo. The `indexOf()` will access the index of an added todo that you want to copy. The parameter `todo` will help you execute the index of the todo that you want to duplicate. Then `push()` will add the duplicate of that todo and add it to the application.

Now export your class to access it within your application.

```ts
export { App }
```

#### Set up the Aurelia template
Aurelia uses the templating system to create the application UI components. This creates intuitive interfaces.

To create these UIs, add the `template` tags, then wrap every component inside these tags. To do this, navigate to the `app.html` page and add these tags.

```html
<template>
</template>
```

Any subsequent components will be added inside these `template` tags. Aurelia templates use binding to connect to the view model that you have created. In this case, you have created a to-do model. Thus, templates will access it to manipulate the todos data using data binding.

Below is how to connect to the todos model:

#### Add a filter component
Add a filter component. This will be used to filter any todo from the list of the added todos.

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

When you add a list of todos, you can filter a todo. This can be easily implemented using the tag of type `search` as shown in the above code block:

#### Get the application header
```html
<h1 class="text-center">${heading}</h1>
```

This header is defined inside the `app.ts` under `App`. `heading` is a property of the model. The above line of code will bind it to the template using the string interpolation. The `${}` operator helps you extract the `heading` string value.

#### Add a form to add todos
```html
<form submit.trigger="addTodo()">
    <label for="addTodoInput" class="form-label">Enter New Todo</label>
</form>
```

This form will trigger the constructor `addTodo()` to manipulate the data. `submit.trigger` will execute this function and add a new todo to the application.

#### Add todo title form input
```html
<input type="text" value.bind="todoTitle" id="addTodoInput" class="form-control" placeholder="Enter Title">
```

To link the view model's `todoTitle` and `todoDescription`, use the `value.bind`. This will then map the value to the template.

As the model states, each todo has three properties: a title, description, and completed value.

In this case, the completed value is added to false by default. The above code block will provide a form to enter the todo title. It binds to the `todoTitle` as we set them in the `addTodo()` function.

#### Add todo description form input
```html
<input type="text" value.bind="todoDescription" id="addTodoInput" class="form-control" placeholder="Enter Description">
```

Each todo has a description property. This HTML code will add a form that lets you set the description value. This will bind to the value of `todoDescription` as we set them in the `addTodo()` function.

#### Add a button to submit the form input

```html
<button class="btn btn-primary" type="submit" disabled.bind="!todoTitle">Submit</button>
```

For the button to be active and clickable, you have first to provide the todo's title.

##### Update a todo
Aurelia uses [repeat.for](https://riptutorial.com/aurelia/example/7080/working-with-loops-using--repeat-for-) to iterate through loops.

Here, we need to iterate through a todo and its value to update an existing todo. Go ahead and add the `repeat.for` as shown below:

```html
<div class="form-check" repeat.for="todo of todos">
</div>
```

Inside the above `div` tags, add a checkbox:

```html
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked.bind="todo.completed">
```

This will be used to update the todos using the set `completed` value. 

Go ahead and add the value that will show the todo has been updated:

```html
<label class="form-check-label" for="flexCheckDefault"
    css="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
    ${todo.title}
    ${todo.description}
</label>
```

This will access the todos description and title. Aurelia will check the `todo.completed` value and add line-through to mark the todo as completed when the checkbox is clicked.

#### Delete a todo
Since the delete execution involves altering with the exiting todo, add the following button inside the `<div class="form-check" repeat.for="todo of todos"> </div>` tags so that the app iterates through the exiting todo and delete its values.

```html
<button class="btn btn-danger" click.trigger="removeTodo(todo)">Delete</button>
```

Add a button and attach the `click.trigger` handler. Then map `click.trigger` to the `removeTodo(todo)`. When the button is clicked, `removeTodo(todo)` will be executed, and the selected todo will be deleted.

#### Clone a todo
Clone involves duplicating with the exiting todo. Thus is executed to an existing todo.

In this case, add the following button inside the `<div class="form-check" repeat.for="todo of todos"> </div>` tags so that the app iterates through the exiting todo and duplicates its values.

```html
<button click.trigger="cloneTodo(todo)">Clone</button>
```

Add a button and attach the `click.trigger` handler. Then map `click.trigger` to the `cloneTodo(todo)`. When the button is clicked, `cloneTodo(todo)` will be executed, and the selected todo will be deleted.

The application is now ready, and you can test if everything is working as expected.

Run `npm start` inside the directory where you created the Aurelia app. Then, open `http://localhost:8080/` on the browser.

![aurelia-typescript](/engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/todo-app.jpg)

Now, you can start interacting with your Aurelia application.

![aurelia-typescript](/engineering-education/setup-and-run-applications-using-typescript-with-aureliajs/todo-list.jpg)

### Conclusion
The Aurelia.js Framework allows developers to write in modern JavaScript. This way, you can implement two-way binding. It just lets you write pure JavaScript or TypeScript.

I hope you found this tutorial useful.

You can check out the source code [here](https://github.com/mosesreigns/run-Applications-using-TypeScript-with-Aurelia.js).

### Further reading
- [5 Benefits Of Choosing Aurelia.js Over AngularJS](https://www.valuecoders.com/blog/technology-and-apps/aurelia-js-framework-review-typescript-router/)
- [Angular vs. Aurelia: Who Wins?](https://www.baytechconsulting.com/blog/angular-vs-aurelia)
- [Comparing Angular, Aurelia, and React: Is there a next-gen JS framework that rules them all?](https://www.ae.be/blog/comparing-angular-aurelia-react-js-framework/)
- [A Friendly Beginner’s Guide to TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/)
- [Why Static Typing & Why is TypeScript so popular?](/engineering-education/typescript-static-typing/)
- [JavaScript vs. TypeScript](/engineering-education/javascript-vs-typescript/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
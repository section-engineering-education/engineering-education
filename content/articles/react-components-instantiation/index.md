---
layout: engineering-education
status: publish
published: true
url: /react-components-instantiation/
title: React Components  Instantiation 
description: A React Component is a small, reusable code responsible for rendering HTML. In React, we can define a component as a class or a function. 
author: valentine-gatwiri
date: 2021-12-20T00:00:00-06:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-components-instantiation/hero.jpeg
    alt: React Components  Instantiation Hero Image
---
A React Component is a small, reusable code responsible for rendering HTML. In React, we can define a component as a class or a function. 
<!--more-->
For a React component to be defined, we will create a component and extend the `React.component` class. For example, to create a classroom component, the classroom component should have the classroom details.

Throughout this tutorial, we will be mostly talking about JSX. The JSX element can be written in HTML format or written as a component instance. In JSX, you use capitalization to differentiate between HTML-like and component instances.

#### Prerequisites
To effectively understand the tutorial, the reader will need the following:
- Basic understanding of the React library.
- A suitable IDE such as VS Code.
- Basic understanding of JSX.

> In this tutorial, we will use [JS complete](https://jscomplete.com/playground). To use JS complete with React, first install the [React Developer Tools extension.](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

#### Key takeaways 
- What is component instantiation?
- How to instantiate a React component 
- Difference between HTML like  and Component instances in JSX elements
- New keyword meaning and how it is used in React
- React Component  Instantiation

#### Instantiating the React component
Let's begin by importing the React library.
```js
  import React from 'react'; 
```

We are importing React because JSX will be converted to regular JavaScript, using React's `React.createElement` method. Therefore, we need to import React when using JSX.

After importing the React library, we will import `ReactDOM`. If you are not using ES6, install `react-dom` in your IDE using:

```bash
npm install react-dom
```
But since we will be using ES6, we will import `ReactDOM` using the code below:

```javascript
  import ReactDOM from 'react-dom';
```    

`ReactDOM` is important for rendering JSX elements and react components to the `DOM`. The `DOM` represents the whole user interface of your application. 

Let's create a component class. We will subclass `React.Component` to create our component class. We will do this by using the following syntax: `class V extends React.Component {}`. This is how ES6 creates a stateful component. 

We will now add the `render()` function to our code:
```javascript
   class V extends React.Component {
   render() {}
   }
```

The motive of the `render()` function in our application is to enable React to render HTML on our webpage. It's a must for a `render()` function to have a `return` statement. A JSX expression is returned by the `return` statement in the `render()` function as shown:
```javascript
  class V extends React.Component {
  render() {
    return <h1>Welcome to React world</h1>;
   }
  }
```
 
The difference between HTML like and component instances in JSX elements is that to make a React component, instead of naming your JSX element using tags like `<P> </p>`, `<h1> </h1>` or `<div> </div>` as shown below, you give it the same name as the component class.
```javascript
  ReactDOM.render(
    <h1>Welcome to React World</h1>,
   document.getElementById('root')
  );
```

For example, we create a component instance by adding <Valley/> which will be our component's class below our code, as shown below:
```javascript
 import React from 'react';
 import ReactDOM from 'react-dom';

   class Valley extends React.Component {
    render() {
    return <h1>Welcome to React world</h1>;
   }
 }
   <Valley />
```

The code appears this way after creating a component instance. So there's your component instance! It gets instantiated when class `Valley` gets passed as an argument in `ReactDOM.render()`. 

Let's now render our component:
```javascript
    ReactDOM.render(
  <Valley />,
  document.getElementById('app')
  );
```

The `render()` method is called when `ReactDOM.render()` tells our component class `<Valley />` to call its `render()` method. 

The Class `<Valley />` then calls its `render()` method, which  returns the JSX element `<h1>Welcome to React World</h1>`.  This will enable 'Welcome to React World' message to be displayed on the screen.

#### Using a new keyword 
The `new` keyword creates a blank, simple JavaScript item. Its syntax is `new constructor[([arguments])]`. 

When you create an object, a class instance is created. The class name to be instantiated is provided by the constructor name. 

The constructor initializes the new object. A reference is returned to the object created by the `new` operator.

The `new` keyword makes the `this` keyword point to the object that has been newly created each time the `this` keyword is mentioned. 

The `new` keyword executes the constructor function, using the object that has been newly created. Hence, the newly created object is returned.

#### Instantiating function components
Function components are simple JavaScript components. They don't use a `render()` method. Instead, they are responsible for rendering the user interface.

They also accept and use props. A function component is considered a "dump" because it simply accepts data.

**example**
```javascript
 function Student (marks) {
  this.marks = marks;
  }

 const study = new Student(50);

  console.log(study);
```

The code above outputs the student's marks. This is because the JS engine will see the `new` keyword, create a new object and set the prototype to `Student.prototype`.

If a property is undefined in the new object that is requested, the script will check the `[Prototype]` object for the property. Object's prototype property is invisible,hence we will add `Object.getPrototypeOf(obj)` method to access prototype object.

Let's add `console.log(Object.getPrototypeOf(study) === Student.prototype)` to see if prototype of `study` is `Student` which will output true.

If we add `Student` instead of `study` as shown `console.log(Object.getPrototypeOf(Student) === Student.prototype)` it will output false because Student is not a prototype of Student.

***What happens in the code above?***
- `const study` means: Memory is needed for variable declaration.
- Assignment operator `=` means: `this` variable will be initialized with the expression after the assignment operator `=`.
- Expression `new Student(50)`: A new object is created, and the prototype is set to student.prototype.
- The marks get assigned to the newly created `study` object.
- The object that has been newly created gets returned and is assigned to the variable `study`.

#### Instantiating the class component 
A class is a blueprint that helps you define the shared structure and behavior between similar objects. 

Class components implement logic and state hence they are considered "smart". Props are passed down to class components and accessed with `this.props`.

In the code below, the developer class defines a constructor function. The developer class expects the name argument, and it uses the `this` keyword to store that value on the instance.

The `new` keyword generates a new object. Hence, `dev1` is returned as the new object, and hence it outputs `Tom` as our new developer.
```javascript
   class Developer {
  constructor() {
    this.name = 'Tom';
    }
  }
   // class instantiation
  const dev1 = new Developer();

  console.log(dev1.name);
 // expected output: "Tom"
 ```

A `Student` class extend the `Human` class in our code. Both classes define a `constructor()` function. Every student is a `Human` too. The `Human` class expects the name argument, and that value is stored on the instance using the `this` keyword.

The `Student` class expects the name and the level argument, and then the level value is stored on its instance. 

Since the `Student` class extends the `Human` class, the `Student` class calls the `super()` method with the `name` argument, which will invoke the `Human` class constructor function and store the name. 

Finally, both classes define the `greet()` function.
```javascript
  class Human{
  constructor(name) {
  this.name = name;
  }
  greet() {
    console.log(`Hello ${this.name}!`);
  }
}

class Student extends Human {
  constructor(name, level) {
    super(name);
    this.level = level;
  }
  greet() {
    console.log(`Hello ${this.name} from ${this.level}`);
  }
}
```

The arguments we pass when we instantiate these objects are accessible in the class's constructor function. 

The constructor function will get called whenever an object is instantiated outside of the class, which we do by using the `new` keyword as shown below.

We instantiate one object from the human class and two others from the student class. 

In the third object, which we instantiated from the student class, we define a `greet()` function directly on the object.
```javascript
const o1 = new Human("John");
const o2 = new Student("Tina", "1st Grade");
const o3 = new Student("Mary", "2nd Grade");
o3.greet = () => console.log('I am wonderful!');

 o1.greet();
 o2.greet();
 o3.greet();
```

**expected output**
```bash
Hello John!
Hello Tina from 1st Grade
I am wonderful!
```

***What happens when we test the script?***
- Const 01 will use the greet method from its class (the person class).
- Const 02 will use the greet method from the student class.
- Const 03 will use its own directly defined greet method.

#### Conclusion

The JSX syntax is transpiled by Babel and used by React to create instances of your objects. Therefore, when using JSX with Babel, we need to import react. This is like telling Babel you are providing a JSX file.

A React component instance uses classes to instantiate a react component. You can either use multiple instances or just a single instance in your React application. Each instance can perform individually, making them a requirement when creating an application. Instances are duplicates of the original class. 

Happy learning!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

### React Components  Instantiation

React Component is a small, reusable bite of code which is responsible  for   rendering HTML.

There are different types of React components but in this article I will be covering two types  which are functional components and class components.

Throughout this tutorial we will be mostly talking about JSX. JSX element can be written in HTML format or it may be written as a component instance.In JSX you use capitalization to differentiate between HTML like and component instance .

#### Prerequisites
To effectively uderstand the reader will need the following:

- Basic uderstanding of React library
- A suitable IDE such as VS Code or online IDE such as JScomplete or Codepen
- Basic uderstanding of JSX

*****In this tutorial i will be using [JScomplete](https://jscomplete.com/playground).To use js complete with react first install [React Developer Tools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)*****

#### Key takeaways 
- What is component instantiation
- How to instantiate a React component 
- Difference between HTML like  and Component instances in JSX elements
- New keyword meaning and how it is used in react
- How React creates an instancReact Components  Instantiation

#### Instantiating React component
Let's begin by  importing the React library and then we will  save the library in a variable named `react`. 

```js
  import React from 'react';
```
    
After importing the React library we will import ReactDOM using th code below:

```js
    import ReactDOM from 'react-dom';
```    
ReactDOM  is important for rendering JSX elements and react components to the DOM.

Let's now create a component class .To create our component class we will subclass `React.Component`,we will do this by using the following syntax `class V extends React.Component {}`.This is how  ES6  creates a stateful component.  

We will now add the render function in our code:

```js
   class V extends React.Component {
   render() {}
   }
```

Its a must for a render funcion to have a return statement. A JSX expression is returned  by the return statement in the render function as shown:

```js
  class V extends React.Component {
  render() {
    return <h1>Welcome to React world</h1>;
   }
  }
```
 
The difference between HTML like  and Component instances in JSX elements is that To make a React component, you write a JSX element. Instead of naming your JSX element using tags like `<P></p>` `<h1></h1>` or `<div></div>` as shown below:

```js
  ReactDOM.render(
    <h1>Welcome to React World</h1>,
   document.getElementById('root')
  );
```
Give it the same name as a component class.

Lets now create a component instance by adding `<Valley/>` which will be our component's class below our code as shown below:

```js
 import React from 'react';
 import ReactDOM from 'react-dom';

   class Valley extends React.Component {
    render() {
    return <h1>Welcome to React world</h1>;
   }
 }
   <Valley />
```
The code appears this way after creating a component instance.There’s your component instance!

class `Valley` gets instantiated when it gets passed as an argument in `ReactDOM.render`

Lets now render our component:
```js
    ReactDOM.render(
  <Valley />,
  document.getElementById('app')
  );
```

The render method is called when `ReactDOM.render()` tells  our component class `<Valley />` to call its render method.

class `<Valley />` then calls its render method, which  returns the JSX element `<h1>Welcome to React world</h1>`.  This will enable “Welcome to React world” to be exhibited  on the screen.

#### Using new keyword 
The new keyword Creates a blank, simple JavaScript item. Its syntax is `new constructor[([arguments])]`. When you create an object a class instance is created.The name  of the class to be instantiated  is provided by the name of the constructor. The new object is initialized by the constructor.A reference is returned to the object created by the new operator.

The new keyword makes `this` keyword to point the object that as been newly created .Each time  `this` is mentioned  the new keyword executes the constructor function , using the object which has been newly created.Hence the newly created object is returned .

 ***example***
 ```js
 function Student (marks) {
  this.marks = marks;
  }

 const studdy = new Student(50);

  console.log(studdy);
  console.log(Object.getPrototypeOf(studdy) === Student.prototype)
```
****what happens in the code above****
- `const studdy` means: Memory is needed for variable declaration.
- Assignment operator `=` means: `this` variable is going to be nitialized with the expression after the assignment operator `=`.
- Expression `new Student(50): A new object is created  and the prototype is set to student.prototype.
- The marks gets assigned to the newly created studdy object.
- The object which as been newly created gets returned and is assigned to variable studdy.

#### Instantiating function component
As shown in the code below  , React creates an instance of the function component using the `new` keyword:

```js
    function Drink(color, taste, temperature) {
    this.color = color;
    this.taste = taste;
    this.temperature= temperature;
 }
 // Create an object
  const Drink1 = new Drink('Pink', 'Sweet', 'cold');
  
 // Display the result
 document.write(Drink1.color);
```
The output of the above code will be `Pink`. This is because A new object is generated by the `new` keyword .In our code Drink1() gets returned as our new object.Hence it outputs its color which is Pink.

#### Instantiating class component 
When instatiating class component we use a constructor and a new keyword.

```js
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

Below is an example of code to show class component  instatiation that outputs greetings:

```js
   class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello ${this.name}!`);
  }
}

class Student extends Person {
  constructor(name, level) {
    super(name);
    this.level = level;
  }
  greet() {
    console.log(`Hello ${this.name} from ${this.level}`);
  }
}

const o1 = new Person("Max");
const o2 = new Student("Tina", "1st Grade");
const o3 = new Student("Mary", "2nd Grade");
o3.greet = () => console.log('I am wonderful!');

 o1.greet();
 o2.greet();
 o3.greet();
 /*expected output
 Hello Max!
Hello Tina from 1st Grade
I am wonderful!*/
```

#### Conclusion
A react component instance is the use of classes to instantiate  React component.You can either use multiple instances or just a single instance in your react application.Each instance can perform individually this makes them a requirement when creating an application. Instances are a duplicate of the original class.A component in React can be  either a class or a function.

Happy learning!

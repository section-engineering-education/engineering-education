### React Components  Instantiation

There are different types of react components: Functional Components and  Class Components

React Component is a small,reusable bite of code which is responsible  for one job  which often includes rendering HTML.

JSX  stands for JavaScript XML. JSX  allows us to write HTML in React. JSX element can be written in HTML format or it may be written as a component instance.In JSX you use capitalization to differentiate between HTML like and component instance .Component class name must begin with a capital letter.

#### Prerequisites
To effectively uderstand the reader will need the following:

- Basic uderstanding of Reactlibrary
- A suitable IDE such as VS Code or online IDE such as JS complete or Codepen
- Basic uderstanding of JSX

#### Key takeaways 
- What is component instantiation
- How to instantiate a React component 
- Difference between HTML like  and Component instances in JSX elements
- New keyword meaning and how it is used in react
- How React creates an instancReact Components  Instantiation

#### Instantiating React component
Lets begin by  importing the React library and then we will  save the library in a variable named `react`. This creates object named `React` which contains methods necessary to use the React library.After importing the React library we will import ReactDOM.This will enable us to create  our first component.
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
```    
The two lines above import JavaScript objects, the imported object contains React-related methods.The difference between the two is that The methods imported from 'react-dom' are meant for interacting with the DOM while The methods imported from 'react' don’t deal with the DOM at all. 

Lets now create a component class .To create our component class we will subclass `React.Component`,we will do this by using the following syntax `class MyComponentClass extends React.Component {}.This is the ES6 way of creating a stateful component. Requires transpiling via babel, which also handles JSX. 

We will now add the render function in our code:
```js
   class ComponentClass extends React.Component {
   render() {}
   }
```

A render function must contain a return statement. Usually, this return statement returns a JSX expression:
```js
  class ComponentClass extends React.Component {
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
Give it the same name as a component class .Now we will create a component instance by adding `<MyComponentClass />` below our code as shown below:

```js
 import React from 'react';
 import ReactDOM from 'react-dom';

   class MyComponentClass extends React.Component {
    render() {
    return <h1>Welcome to React world</h1>;
   }
 }
   <MyComponentClass />
```
The code appears this way after creating a component instance.There’s your component instance!

MyComponentClass is a class it gets instantiated when  it is passed as an argument in `ReactDOM.render`

Lets now render our component:
```js
    ReactDOM.render(
  <MyComponentClass />,
  document.getElementById('app')
  );
```

`ReactDOM.render()` will tell `<MyComponentClass />` to call its render method.

`<MyComponentClass />` will call its render method, which will return the JSX element `<h1>Welcome to React world</h1>`.  This will enable “Welcome to React world” to be exhibited  on the screen.

#### Using new keyword 
The new keyword Creates a blank, simple JavaScript item.. Its syntax is `new constructor[([arguments])]`. It is used to create n instance of an object that has a constructor function.
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
The output of the above code will be `Pink`. The `new` keyword creates an empty object .The newly created objects are returned as Drink1().

#### Instantiating class component 
A constructor allows you to provide any custom initialization that must be executed before any other methods can be called on an instantiated object.
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
A react component instance is the use of classes to instantiate  React component.You can create an app with multiple instances or just a single instance.The  basic difference between React component instance and React component is components are a Class while component Instance is an instance of the class and will be used in render. Each instance can perform individually this makes them a requirement when creating an application. Instances are a copy of original class.A component in React is either a class or a function.

Happy learning!
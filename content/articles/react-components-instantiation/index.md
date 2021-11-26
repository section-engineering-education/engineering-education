### React Components  Instantiation

React Component is a small, reusable bite of code which is responsible  for   rendering HTML. In React we can define components as a class or a function.
For a React component to be defined ,we should first create a component and then extend `React.component class`. For example in order to create a `Classroom` component. The `Classroom` class should have the classroom details. 

In this article I will be covering two types  which are functional components and class components. Throughout this tutorial we will be mostly talking about JSX. JSX element can be written in HTML format or it may be written as a component instance.In JSX you use capitalization to differentiate between HTML like and component instance .

#### Prerequisites
To effectively uderstand the reader will need the following:

- Basic understanding of React library
- A suitable IDE such as VS Code or online IDE such as JScomplete or Codepen
- Basic understanding of JSX

**In this tutorial i will be using [JS complete](https://jscomplete.com/playground).To use js complete with react first install [React Developer Tools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)**

#### Key takeaways 
- What is component instantiation
- How to instantiate a React component 
- Difference between HTML like  and Component instances in JSX elements
- New keyword meaning and how it is used in react
- React Component  Instantiation

#### Instantiating React component
Let's begin by  importing the React library .

```js
  import React from 'react';
  
```

The reason why we are importing react is, JSX will be converted in to regular javascript which uses react's `React.createElement` method. 
After importing the React library we will import ReactDOM . ReactDom is a different module .If you are not using ES6 install react-dom in your IDE using `npm install react-dom` but since we will be using  using ES6 we will import `ReactDOM` using the code below:

```js
    import ReactDOM from 'react-dom';
```    
ReactDOM  is important for rendering JSX elements and react components to the DOM. DOM is the representation of the whole user interface of your application.
Let's now create a component class .To create our component class we will subclass `React.Component`,we will do this by using the following syntax `class V extends React.Component {}`. This is how  ES6  creates a stateful component.  

We will now add the render function in our code:

```js
   class V extends React.Component {
   render() {}
   }
```
The motive of the render function in our application is  for React to render HTML to our webpage. Its a must for a render function to have a return statement. A JSX expression is returned  by the return statement in the render function as shown:

```js
  class V extends React.Component {
  render() {
    return <h1>Welcome to React world</h1>;
   }
  }
```
 
The difference between HTML like  and Component instances in JSX elements is that to make a React component, instead of naming your JSX element using tags like `<P></p>` `<h1></h1>` or `<div></div>` as shown below:

```js
  ReactDOM.render(
    <h1>Welcome to React World</h1>,
   document.getElementById('root')
  );
```
 you should give it the same name as a component class.For example lets  now create a component instance by adding `<Valley/>` which will be our component's class below our code as shown below:

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
The code appears this way after creating a component instance.There’s your component instance! When class `Valley` gets passed as an argument in `ReactDOM.render` it gets instantiated  

Lets now render our component:
```js
    ReactDOM.render(
  <Valley />,
  document.getElementById('app')
  );
```

The render method is called when `ReactDOM.render()` tells  our component class `<Valley />` to call its render method. Class `<Valley />` then calls its render method, which  returns the JSX element `<h1>Welcome to React world</h1>`.  This will enable “Welcome to React world” to be exhibited  on the screen.

#### Using new keyword 
The new keyword Creates a blank, simple JavaScript item. Its syntax is `new constructor[([arguments])]`. When you create an object a class instance is created.The  class  name to be instantiated  is provided by the  constructor name. The new object is initialized by the constructor.A reference is returned to the object created by the new operator.

The new keyword makes `this` keyword to point the object that as been newly created .Each time  `this` is mentioned  the new keyword executes the constructor function , using the object which has been newly created.Hence the newly created object is returned .

 #### Instantiating function component
Function components are simple javascript components .They don't use a render method.They are responsible for rendering the user interface.They also accept and use props.Function component is considered as 'dump' because they simply accept data.

 ***example***
 ```js
 function Student (marks) {
  this.marks = marks;
  }

 const studdy = new Student(50);

  console.log(studdy);
  ```
The code above outputs the student marks. This is because the JS engine will see the new keyword, then it will  create a new object and sets the prototype to Student.prototype. If a property is undefined in the new object which is requested, the script will check the [[Prototype]] object for the property.

Lets add `console.log(Object.getPrototypeOf(studdy) === Student.prototype)` to see if prototype of studdy is student which will output true. If we add `Student` instead of `studdy` as shown `console.log(Object.getPrototypeOf(Student) === Student.prototype)` it will output false because Student is not a prototype of Student.

****what happens in the code above****

- `const studdy` means: Memory is needed for variable declaration.
- Assignment operator `=` means: `this` variable is going to be initialized with the expression after the assignment operator `=`.
- Expression `new Student(50): A new object is created  and the prototype is set to student.prototype.
- The marks gets assigned to the newly created studdy object.
- The object which as been newly created gets returned and is assigned to variable studdy.


#### Instantiating class component 
A class is a blue print which helps you define shared structure  and behaviour between similar objects.Class components implements logic and state hence they are considered to be 'smart' .Props are passed down to class components and accessed with `this.props` in class component.

In our code below the developper class  define a constructor function .The developer class expects the name argument and it uses `this` keyword to store that value on the instance. A new object is generated by the `new` keyword.dev1 is returned as the new object hence it outputs `Tom` as our new developer.

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

**Below is an example of code to show class component  instantiation that outputs greetings.**

In  our code their is a human class and a student class ,that extends the  Human class .Both classes define a constructor function.Every student is a human too.
Both classes define a constructor function. The  name argument is expected by the  human class and  that value is stored on the instance using `this` keyword.

The name and the level argument is expected by the student class and then the level value is stored on its instance.Since the student class extends the human class the student class calls the `super` method with the `name` argument which will invoke the human class constructor function and store the name too. A `greet` function is defined by both classes . 

```js
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

The arguments we pass  when we instantiate these objects  are accessible in the constructor function of the class.The constructor function will get called whenever an object is instantiated out of the class.Which we do using the `new` keyword  as shown below.

We are instantiating one object from the human class and two others from  the student class.In the third object which we instatiated from student class we  define  a greet function directly on the object

```js
const o1 = new Human("John");
const o2 = new Student("Tina", "1st Grade");
const o3 = new Student("Mary", "2nd Grade");
o3.greet = () => console.log('I am wonderful!');

 o1.greet();
 o2.greet();
 o3.greet();
```
**expected output**

- Hello John!
- Hello Tina from 1st Grade
- I am wonderful!

***What happens when we test the script***

- const 01 will use the greet method from its class(the person class)
- const 02 will use the greet method from the student class
- const 03 will use its own directly defined greet method 

#### Conclusion
A react component instance is the use of classes to instantiate  React component.You can either use multiple instances or just a single instance in your react application.Each instance can perform individually this makes them a requirement when creating an application. Instances are a duplicate of the original class.A component in React can be  either a class or a function.

Happy learning!

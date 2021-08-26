---
layout: engineering-education
status: publish
published: true
url: /design-patterns-in-javascript/
title: Design Patterns in JavaScript
description: This tutorial will help the reader understand the different design patterns in JavaScript. They include creation, structural, and behavioral design patterns.
author: judy-nduati
date: 2021-08-18T00:00:00-03:22
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/design-patterns-in-javascript/hero.jpg
    alt: Design Patterns in JavaScript
---
Developers focus on writing readable, maintainable, and reusable code. A design pattern plays a significant role in this sector. It is a broadly recognized concept in the software design industry due to its benefits.
<!--more-->
One of the most crucial features of writing maintainable code is identifying recurring structures and functionalities and optimizing them. JavaScript design patterns enable developers to write well-organized and structured code.

### Goal
This article will help you understand the most popular JavaScript design patterns. They include creation, structural, and behavioral design patterns.

### Table of contents
- [What is a design pattern](#what-is-a-design-pattern)
- [Categories of design patterns](#categories-of-design-patterns)
- [Creational design patterns](#creational-design-patterns)
- [Structural design patterns](#structural-design-patterns)
- [Behavioral design patterns](#behavioral-design-patterns)
- [JavaScript design patterns](#javascript-design-patterns)

### Prerequisites
Design patterns in JavaScript are an exciting and interactive topic. Therefore, the reader should have a thorough understanding of JavaScript and [object-oriented programming](https://www.educative.io/blog/object-oriented-programming) (OOP).

### What is a design pattern
A [design pattern](https://www.tutorialspoint.com/design_pattern/design_pattern_overview.htm) is a well-defined solution applied to commonly occurring problems in the software engineering industry. 

It is an illustration or a template for problem-solving that can be used in different conditions. Some of the problems solved by design patterns include:

- Creating classes.
- Instantiating an object.
- Interacting with objects.
- Writing reusable code.  

Some of the benefits of design patterns are highlighted below:

- They allow one to write reusable code and thus, save time.
- They help solve common software design problems.
- Design patterns help to avoid confusion due to well-structured regulations. 
- Design patterns are highly maintainable which reduces overall costs.
 
### Categories of design patterns
Design patterns are classified into multiple categories. However, creational, structural, and behavioral design patterns are the most common. We'll discuss these three design patterns.

#### Creational design patterns
These design patterns provide object creation techniques that increase flexibility and reduce complexities.

Creational design patterns include:
- [Factory method](https://en.wikipedia.org/wiki/Factory_method_pattern)
- [Abstract factory](https://en.wikipedia.org/wiki/Abstract_factory_pattern)
- [Object pool](https://en.wikipedia.org/wiki/Object_pool_pattern)
- [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern)
- [Prototype](https://en.wikipedia.org/wiki/Prototype_pattern)
- [Builder](https://en.wikipedia.org/wiki/Builder_pattern)

#### Structural design patterns
These patterns focus on the overall architecture including the class structure and composition.

Structural design patterns organize objects and classes into a larger structure to enhance flexibility and efficiency. They also improve code readability and maintainability.

The main objective of structural design patterns is to increase the class functionality without changing its composition. 

Structural design patterns include:

- [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern)
- [Bridge](https://en.wikipedia.org/wiki/Bridge_pattern)
- [Composite](https://en.wikipedia.org/wiki/Composite_pattern)
- [Facade](https://en.wikipedia.org/wiki/Facade_pattern)
- [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern)
- [Flyweight](https://en.wikipedia.org/wiki/Flyweight_pattern)

#### Behavioral design patterns
Behavioral design patterns enable effective and flexible communication between classes and objects.

Behavioral design patterns include:

- [Command](https://en.wikipedia.org/wiki/Command_pattern)
- [Chain of responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)
- [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern)
- [Observer](https://en.wikipedia.org/wiki/Observer_pattern)
- [Interpreter](https://en.wikipedia.org/wiki/Interpreter_pattern)
- [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern)
- [Mediator](https://en.wikipedia.org/wiki/Mediator_pattern)

### JavaScript design patterns
We have learned that there are numerous design patterns. In this part, we will explore and implement the most popular JavaScript design patterns. 

The design patterns will fall under the three categories we discussed above.

The seven most popular JavaScript patterns are constructor, singleton, prototype, module, decorator, chain responsibility, and command.

#### Constructor pattern
OOP constructors are unique methods that initialize the objects of a class. In JavaScript, nearly everything is an object including functions. 

JavaScript supports object constructors, as demonstrated below:

```js
//creates a new object
var firstObject = {};
//creates a new object
var secondObject = Object.create( Object.prototype );
//creates a new object
var thirdObject = new Object();
```

Below is an example of a constructor design pattern:

```JavaScript
class Person {  
    constructor(firstName, secondName) {  
        this.firstName = firstName;  
        this.secondName = secondName;  
        this.fullName = function () {  
            console.log(this.firstName + ' ' + this.secondName);  
        };  
    }  
}  
  
const Teacher = new Person('Freddy', 'Chris');  
Teacher.fullName();  //Prints Freddy Chris in the console 
```

The example above demonstrates a constructor design pattern. We have defined a `Person` class with `firstName` and `SecondName` attributes. 

The `fullName()` method prints the teacher's `first` and `second` name. We have instantiated an object for the class using the `new` keyword and provided the required attributes.

#### Singleton pattern
Singleton design pattern controls the instantiation of a class to an object. A new class instance is only created when there is no other instance. 

Below is an example of a singleton pattern:

```js
var singleton = (function() {
    // singleton value which gets initialized only once
    var instance;

    function initialization(values){
        this.randomNumber = Math.random();
        values = values || {};
        this.number = values.number || 7;
        this.size = values.size || 12;
    }
    return {
        getValue: function(values) {
            // we initialize the singleton value only once
            if (instance === undefined) {
                instance = new 
                initialization(values);
            }
            return instance;
        }
    };
})();

var insObject = singleton.getValue({ "size": 10 });
// prints number: 7, size: 10, and a random decimal value
console.log(insObject);
var insObject1 = singleton.getValue({ "number": 10 });
// // prints number: 7, size: 10, and a random decimal value as in first output
console.log(insObject1);
```

From the example above, the random number and other values generated are always the same.

#### Prototype pattern
The prototype pattern involves designing objects based on preexisting templates also known as cloning. 

In JavaScript, think of it as prototypical inheritance where objects are created to act as prototypes of other components.

Below is an example to implement this pattern:

```js
var schoolSystem = {
    courses: ['Course1', 'Course2'],
    getcourses: function() {
      console.log(this.courses);
    }
  }
  
var mySchool = Object.create(schoolSystem, 
  { 
    name: {
      writable: true,
      configurable: true,
      value: 'My School'
    }
  });
  
  console.log(mySchool.name); // prints "My School"
  mySchool.getcourses(); // prints ["Course1", "Course2"]
```

#### Module pattern
Modules are small sections of independent and reusable code. In addition, the module pattern helps in code encapsulation.

Modules create private and public methods. Private functions are properties of a given entity that can only be accessed within a specific class. 

Public methods, on the other hand, can be accessed from any entity. 

Below is an example of implementing the module pattern:

```js
var countApi = (function(){
  var counter = 0;

  var inc = function() {
    counter++;
  }

  var dec = function() {
    counter--;
  }
  return {
    increment: function() {
      inc();
    },
    decrement: function() {
      dec();
    },
    reset: function() {
      counter = 0;
    },
    getvalue: function() {
      return counter;
    }
  };
})();

countApi.increment();
countApi.increment();
countApi.increment();
countApi.decrement();
countApi.reset();
console.log(countApi.getvalue());
```

#### Decorator pattern
The decorator design pattern focuses on code reusability which influences an object's behavior. It also incorporates new characteristics and behaviors to predefined classes and objects.

Let's create a function to assign an object a common functionality or behavior.

```js
const Doctor = function(type) {
    this.type = type || 'oncologist';
  }
  
  const oncologist = new Doctor('oncologist');
  const dermatologist = new Doctor('dermatologist');
  
  oncologist.oncology = function() {
    console.log('Oncologist is a cancer expert');
    return this;
  }
  
  dermatologist.dermatology = function() {
    console.log('Dematologist is a skin expert');
    return this;
  }
  
  oncologist.oncology();
  dermatologist.dermatology();
  //Prints Oncologist is a cancer expert and Dematologist is a skin expert
```

#### Chain of responsibility pattern
The chain of responsibility pattern mainly works with systems that allow a client's request to pass through a chain of events and is received by handlers. The requests are then processed and passed from one chain to another or rejected.

A perfect example of this pattern is an ATM. When we withdraw from an ATM, the machine processes the request and dispenses the amount in a series of grouped notes ($200, $100, $50, $20, $5, $1). 

Here is an example of the chain of responsibility pattern:

```js
const request= function() {
    this.withdraw = function(amount) {
      console.log(`Requesting to withdrawl $${amount.toFixed(2)}`);
  
  
      const dispenseOutput = {};
  
      // chain or responsibility function
      function get(bill) {
        dispenseOutput[bill] = Math.floor(amount / bill);
        amount -= dispenseOutput[bill] * bill;
  
        return { get };
      }
  
      get(200).get(100).get(50).get(20).get(5).get(1);
  
      this.dispense(dispenseOutput);
    };
  
    this.dispense = function(bills) {
      console.log('--- Dispensing cash ---')
      Object.entries(bills).forEach(([key, value]) => {
        console.log(`- Dispensing ${value} $${key} bills`);
      });
    }
  };
  
  const myRequest = new request();
  
  ;
  myRequest.withdraw(1570);
  myRequest.withdraw(250);
```

In the code above, an object is created requesting a withdrawal amount. This invokes a sequence of calls for the object. Finally, the ATM distributes the combination of notes which satisfies the request.

#### Command pattern
The command design pattern encapsulates actions as objects. Therefore, it is helpful if you wish to decompile or execute objects. 

The `command`, `client`, `receiver`, `invoker` are participants in this design pattern.

 The example below implements the command design pattern:

 ```js
 var calc = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    divide: function(a,b){
        return a/b;
    },
    multiply: function (a,b){
        return a*b;
    }
}
var arithmetic = {
    compile: function(name, args) {
        if (name in calc) {
            return calc[name].apply(calc, [].slice.call(arguments, 1));
        }
        return false;
    }
}
console.log(arithmetic.compile("add", 8, 7)); // prints 15
console.log(arithmetic.compile("divide", 72, 8)); //prints 9
console.log(arithmetic.compile("multiply", 4, 3)); // prints 12
 ```

### Conclusion
This tutorial went through JavaScript design patterns and how they tackle common and complex problems with ease.

I hope the article helped you understand the different design patterns in JavaScript.

Happy Learning!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
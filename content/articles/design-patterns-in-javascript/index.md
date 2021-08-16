Developers try hard to write readable, maintainable, and reusable code. A design pattern plays a significant role in this sector. It is a broadly recognized concept in the software design industry regarding its benefits to code maintainability and reuse areas.

One of the most crucial features of writing maintainable code is noticing the recurring structures and functionalities and optimizing them. JavaScript design patterns enable to write of organized and well-structured codes.

This article will give you an improved understanding of the most popular JavaScript design patterns. They will fall under three categories of design patterns: creation, structural, and behavioral design patterns.

### Table of contents
[What is a design pattern](#what-is-a-design-pattern)
[Categories of design patterns](#categories-of-design-patterns)
[Creational design patterns](#creational-design-patterns)
[Structural design patterns](#structural-design-patterns)
[Behavioral design patterns](#behavioral-design-patterns)
[JavaScript design patterns](#javascript-design-patterns)

### Prerequisites
Design patterns in JavaScript are an exciting and interactive topic. Therefore, the reader should have a thorough understanding of JavaScript and [Object-oriented programming](https://www.educative.io/blog/object-oriented-programming) (OOP).

### What is a design pattern
A [design pattern](https://www.tutorialspoint.com/design_pattern/design_pattern_overview.htm) is a well-defined solution applied to commonly occurring problems in the software engineering industry. It is an illustration or a template for problem-solving that can be used in many distinct conditions. Typical problems solved by design patterns include:

- How to create a class properly
- How to instantiate an object
- How to interact between objects
- How to write reusable code  

Primarily, design patterns allow the code you write to be easier to implement, build, and maintain. So why is it important to understand design patterns? Below are the benefits of design patterns:

- Patterns make your code to be easily reusable for similar problems
- Patterns are verified solutions to software design problems
- Patterns are extensible as they generally are structured and have regulations that you should observe 
- Patterns are highly maintainable, thus reducing the total cost of ownership
 
### Categories of design patterns
Design patterns are classified into multiple categories, but creational, structural, and behavioral design patterns are most common. We'll go through the three in this tutorial.

#### Creational design patterns
These are design patterns that are concerned with object creation. They provide object creation techniques that increase flexibility and reduce complexities in a controlled manner.

Creational design patterns are the:
- [Factory method](https://en.wikipedia.org/wiki/Factory_method_pattern)
- [Abstract factory](https://en.wikipedia.org/wiki/Abstract_factory_pattern)
- [Object pool](https://en.wikipedia.org/wiki/Object_pool_pattern)
- [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern)
- [Prototype](https://en.wikipedia.org/wiki/Prototype_pattern)
- [Builder](https://en.wikipedia.org/wiki/Builder_pattern)


#### Structural design patterns
These patterns are designed to build the overall architecture. The architecture concerns the class's structure and composition.

Structural design patterns organize objects and classes into a larger structure to enhance flexibility and efficiency. Also, these patterns improve code readability and maintainability.

The main objective of structural design patterns is to increase the class's functionality without changing its composition. Structural design patterns include:
- [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern)
- [Bridge](https://en.wikipedia.org/wiki/Bridge_pattern)
- [Composite](https://en.wikipedia.org/wiki/Composite_pattern)
- [Facade](https://en.wikipedia.org/wiki/Facade_pattern)
- [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern)
- [Flyweight](https://en.wikipedia.org/wiki/Flyweight_pattern)

#### Behavioral design patterns
These patterns are designed to define communication between classes and objects. Behavioral design patterns enable effective communication and increase the flexibility of communication.

Behavioral design patterns include:
- [Command](https://en.wikipedia.org/wiki/Command_pattern#:~:text=In%20object%2Doriented%20programming%2C%20the,event%20at%20a%20later%20time.&text=Four%20terms%20always%20associated%20with,%2C%20receiver%2C%20invoker%20and%20client.)
- [Chain of responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)
- [Iterator](https://en.wikipedia.org/wiki/Iterator_pattern)
- [Observer](https://en.wikipedia.org/wiki/Observer_pattern)
- [Interpreter](https://en.wikipedia.org/wiki/Interpreter_pattern)
- [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern)
- [Mediator](https://en.wikipedia.org/wiki/Mediator_pattern)

### JavaScript design patterns
We have learned that there are numerous design patterns. In this part, we will explore and implement the most popular JavaScript design patterns. The design patterns will fall under the three categories of ways we discussed previously.

We'll discuss the seven most popular JavaScript patterns: constructor, singleton, prototype, module, decorator, chain responsibility, and command.

#### Constructor pattern
OOP constructors are unique methods that initialize the objects of a class. In JavaScript, nearly everything is an object. Even functions are objects. This is because JavaScript is generally objects oriented. 

JavaScript supports object constructors. There are three different options to create new objects in JavaScript as shown below:

```JavaScript
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

The above example demonstrates a constructor design pattern. We have defined a class or function `Person` with attributes `firstName` and `SecondName`. The `fullName()` method prints the first and second names of the teacher. We have instantiated an object for the class or function constructor by evoking the constructor method using a new keyword for the given attributes.

#### Singleton pattern
Singleton design pattern controls the instantiation of a class to an object. A new instance of a class is created only when there is no instance existing. It is necessary only where one instance require to be created. Below is an example of implementing this pattern:

```JavaScript
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

From the example above, you can see the random number generated is the same in any case. Also, the values (number and size) are the same.

#### Prototype pattern
Prototype pattern refers to designing objects based on the template of an actual one through cloning. In JavaScript, think of it s a prototypal inheritance where objects are created to act as prototypes of other objects.

Below is an example to implement this pattern:

```JavaScript
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
Modules are small sections of independent and reusable code. In addition, module pattern helps to achieve code encapsulation.

Modules create private and public methods. Private methods or functions are properties of a given entity that can be seen only within a said entity. Public ones can be accessed from the outside of the given entity. 

Private and public methods are included inside a single object and protecting properties from leaking into the global scope. Basically, with this pattern, we encapsulate all properties and exposing only a public API. Below is an example of implementing this pattern:

```JavaScript
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
Decorator design patterns focus on advocating code reuse, thus extending an object's behavior dynamically. The primary purpose of these design patterns is to fix new characteristics and behaviors to already defined classes and objects.

For instance, let us create a function to give an object a common functionality or behaviour. Then decorate each object with its own functionality. The example below implements decorator pattern:

```JavaScript
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
The chain of responsibility pattern mainly works with systems that allow a client's request to pass through a chain of events and is received by handlers. Then, the requests are processed and passed from one chain to another or rejected.

The common example of this pattern is an ATM. When we request a withdrawal amount from the ATM, the machine process a request and allot the amount with a series of grouped notes ($200, $100, $50, $20, $5, $1). The example below implements chain of responsibility pattern:

```JavaScript
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

In this code example, a request object is created requesting a withdrawal amount. This invokes a sequence of calls for the object. Finally, the ATM distributes the combination of notes which satisfies the process request.

#### Command pattern
The command design pattern encapsulates actions as objects. Therefore, it is helpful if you want to decompile or execute objects issuing the commands. The command, client, receiver, invoker are the participants involved in these design patterns.

 The exmple below implements the command design pattern:

 ```JavaScript
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
This tutorial went through JavaScript design patterns and how they tackle common and complex problems with ease. Also, we learned what design patterns are and the common categories of design patterns.

I hope the article helped you understand design patterns in JavaScript.

Happy Learning!

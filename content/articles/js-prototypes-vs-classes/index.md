---
layout: engineering-education
status: publish
published: true
url: /js-prototypes-vs-classes/
title: JavaScript Classes vs Prototypes
description: This tutorial will take the reader through the concept of JavaScript classes and prototypes.
author: owino-wendy
date: 2021-08-18T00:00:00-18:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/js-prototypes-vs-classes/hero.png
    alt: javascript class prototypes image
---

JavaScript classes are templates that are used to create objects. They act as encapsulators of data that a given code only accesses if it has the right permissions. 
Prototypes provide a way for which an object may inherit the features from others.
<!--more-->
This tutorial will teach you everything you need to know about JavaScript prototypes and classes. We will look at several examples, each executed using classes and prototypes, giving you a proper understanding of their key differences.  

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with JavaSCript prototypes](#getting-started-with-javascript-prototypes)
- [Getting started with JavaScript classes](#getting-started-with-javascript-classes)
- [The key differences between JavaScript classes and prototypes](#the-key-differences-between-javascript-classes-and-prototypes)
- [Conclusion](#conclusion)

### Prerequisites
- A basic knowledge in JavaScript is required.
- A proper understanding of HTML.

### Objectives
By the end of this tutorial, you should be able to understand the difference between JavaScript classes and prototypes.

### Getting started with JavaScript prototypes
Prototypes are the mechanism by which JavaScript objects inherit features from one another. 

Let's look at example of a prototype.  

```html
<!-- prototype.html -->
<html>
    <head>
        <script>
            function Student(studentName,registrationNumber, yearOfStudy,schoolName, specialization){
                this.studentName=studentName;
                this.registrationNumber=registrationNumber;
                this.yearOfStudy=yearOfStudy;
                this.schoolName = schoolName;
                this.specialization= specialization;
            }

            Student.prototype.studentDetails=function(){
                let yearOfStudy= new Date(this.yearOfStudy * 1000);
                let months =['January','February','March','April','May','June','July','August','September','October','November','December'];
                // get the year of study
                let year= yearOfStudy.getFullYear();
                //get month of study
                let month=months[yearOfStudy.getMonth()];
                //get day of study
                let day = yearOfStudy.getDay();
                //student date
                let date= month + ' '  + day + ', ' + year;
                //return statement
                let output= this.studentName + ' of registration number '+ this.registrationNumber+ ' joined ' + this.schoolName + ' on '+ date + ' pursue a degree in '+
                this.specialization;
                
                return output;
            }
            
            let stanfordStudent = new Student('John Doe', '1234', 20007476474, 'Computer School','Software Engineering');
            console.log(stanfordStudent.studentDetails());
        </script>
    </head>
    <body>
    <!-- something codes-->
    </body>
</html>
```

In the code above, we created a `Student` object that we used to create other objects. It acts as our base object. 

To prove this, we have gone a step ahead and created the `stanfordStudent` instance.  We then pass the arguments to our constructor and log the results.

When we execute this code, the following output is generated:  

![prototype output](/engineering-education/js-prototypes-vs-classes/prototype-output.png)

### Getting started with JavaScript classes
JavaScript classes, introduced on June 2, 2015, are no different from classes you might have already come across. They are used as templates for creating objects.

These classes are built on top of JavaScript prototypes. They encapsulate data with code to work on that data.

In this section, we convert the previous prototypal example to a class. Let's go ahead and update our code as follows in the `class.html` file:

```html
<html>
    <head>
        <script>
            class Student {
                constructor(studentName, registrationNumber, yearOfStudy, schoolName,specialization) {
                    this.studentName=studentName;
                    this.registrationNumber=registrationNumber;
                    this.yearOfStudy=yearOfStudy;
                    this.schoolName = schoolName;
                    this.specialization= specialization;
                }

                studentDetails() {
                    let yearOfStudy= new Date(this.yearOfStudy * 1000);
                let months =['January','February','March','April','May','June','July','August','September','October','November','December'];
                // get the year of study
                let year= yearOfStudy.getFullYear();
                //get month of study
                let month=months[yearOfStudy.getMonth()];
                //get day of study
                let day = yearOfStudy.getDay();
                //student date
                let date= month + ' '  + day + ', ' + year;
                //return statement
                let output= this.studentName + ' of registration number '+ this.registrationNumber+ ' joined ' + this.schoolName + ' on '+ date + ' pursue a degree in '+
                this.specialization;
                return output;
                }
            }
    
        </script>
    </head>
    <body>
    
    </body>
</html>
```
What we've done in the above script is to rewrite the prototype example to class.

As noted above, a class in JavaScript is merely syntactic sugar to make things easier for feature developers working in JavaScript. 

> You notice that this generates the same output as the prototypal example

![class output](/engineering-education/js-prototypes-vs-classes/prototype-output.png)

### The key differences between JavaScript classes and prototypes
In the previous sections, we've looked at the JavaScript classes and prototypes. In this section, let's have a look at their differences.

JavaScript is based on ***prototypes*** and not ***classes***. The prototypes themselves are objects instances as seen in the previous examples, while classes have types that are only instantiated at runtime. 

This explains why most JavaScript developers have stuck with prototypes rather than using classes.

Let's look at an example:

```js
//using prototypes
function PrototypicalStudent(name = "John Doe", school = "Example") {
  this.name = name
  this.school = school
}
PrototypicalStudent.prototype.details = function() {
  return `${this.name}, ${this.school}!`
}
const studentProto = new PrototypicalStudent("John", "Doe")
console.log(studentProto.details())
```

In the above example, we defined a prototypal class, let's have a look at the same implementation using classes.  

```js
class ClassicalStudent {
  constructor(name = "John Doe", school = "Example") {
    this.name = name
    this.school = school
  }
  studentProto() {
    return `${this.name}, ${this.school}!`
  }
}
const classyStudent = new ClassicalStudent("John Doe", "ExampleSchool")
console.log(classyStudent.studentProto())
```
You quickly see a  prototypal inheritance in the first example, even though, it's more expressive in the second implementation. Nevertheless, you have seen how you can solve a problem using either case.  

### Conclusion
In this tutorial, we've seen how classes and prototypes are being used in JavaScript. We've also seen that prototypes themselves are object instances while classes only get instantiated at runtime.

With this knowledge on how both features work in JavaScript, you can now decide on when to use either of the two.  

Happy Coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

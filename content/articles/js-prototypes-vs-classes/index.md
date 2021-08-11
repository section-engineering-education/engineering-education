### Introduction

This tutorial will walk you through the concepts of JavaScript classes and prototypes while touching on their key differences. JavaScript classes are templates that are used to create objects. They act as encapsulators of data that a given code only accesses if it has the right permissions.  
JavaScript prototypes provide a way for which an object may inherit the features from others.  

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with JavaSCript prototypes](#getting-started-with-javascript-prototypes)
- [Getting started with JavaScript classes](#getting-started-with-javascript-classes)
- [The key differences between JavaScript classes and prototypes](#the-key-differences-between-javascript-classes-and-prototypes)
- [Conclusion](#conclusion)

### Prerequisites

To follow along with this tutorial, a basic understanding of JavaScript is required. Additionally, we will be using ECMAScript 2015.

### Objectives

By the end of this tutorial, you should be able to understand the difference between JavaScript classes and prototypes.

### Getting started with JavaSCript prototypes

As previously discussed, objects inherit from other objects using the prototypes. For example, let's consider this code snippet:  

```html
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
    
    </body>
</html>
```

As you may have noticed, we created a `Student` object that we can then use to create other objects. It acts as our base object. To prove this, we have gone a step ahead and created the `stanfordStudent` instance as shown in the code above.  

When we execute this code, the following output is generated:  

![/engineering-education/js/prototype-output.png]

### Getting started with JavaScript classes

JavaSCript classes, introduced on June 2, 2015, are no different from classes you might have already come across. They are used as templates for creating objects.

> It's important to note that these classes are built on top of prototypes.

 In this section, we convert the above example to the class and it would be very key for you to consider the key differences.

 One way to define classes in JavaSCript is via class declaration as shown below:  

```javascript
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

### The key differences between JavaScript classes and prototypes

In the previous sections, we've looked at the JavaScript classes and prototypes, in this part, let's have a look at their differences.

The first and the main point is that JavaScript is based on **prototypes** and not classes. The prototypes themselves are objects instances as have in the previous examples while classes have types that are only instantiated at runtime. This explains why JavaScript developers should only stick to prototypes that using classes.

Let's look at this example:

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

In the above class, we defined a prototypal class, let's have a look at the same implementation using classes,

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
With this background knowledge on how both features work in JavaScript, you can now decide on when to use either of the two.  

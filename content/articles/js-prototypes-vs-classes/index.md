### Introduction

This tutorial will walk you through the concepts of JavaScript classes and prototypes while touching on their key differences. JavaScript classes are templates that are used to create objects. They act as encapsulators of data that a given code only accesses if it has the right permissions.  
JavaScript prototypes provides a way for which an object may inherit the features from others.  

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

To follow along this tutorial,a basic understanding of JavaScript is required. Additionally, we will be using ECMAScript 2015.

### Objectives

By the end of this tutorial, you should be able to undertand the difference between JavaScript classes and prototypes.

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

As you may have noticed, we created `Student` object that we can then use to create other objects. It acts as our base object. To prove this, we have gone a tep ahead and created `stanfordStudent` instance as shown in the code above.  

When we execute this code, the following output is generated:  

![/engineering-education/js/prototype-output.png]


### Getting started with JavaScript classes

JavaSCript classes, introduced on June 2,2015, are no different from classes you might have already come accross. They are used as templates for creating objects.

> It's important to note that these classes are built on top of prototypes.


 In this section, we convert the above example to class and it would be very key for you to consider the key differences.

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

### Conclusion



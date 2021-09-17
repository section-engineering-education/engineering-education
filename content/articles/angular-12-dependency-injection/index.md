---
layout: engineering-education
status: publish
published: true
url: /angular-12-dependency-injection/
title: Angular 12+ Dependency Injection Tutorial
description: This tutorial walks the reader through the concepts of dependency injection using Angular.
author: naomi-seint
date: 2021-09-17T00:00:00-12:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/angular-12-dependency-injection/hero.png
    alt: dependincy injection angular 12
---
Dependency injection, in a nutshell, refers to classes that reference other classes. It is a design pattern that allows a single class to request dependencies from other sources.
<!--more-->
In this tutorial, we'll be building a sample student listing Angular 12 application that uses the dependency Injection.

### Table of contents
- [Tutorial requirements](#tutorial-requirements)
- [Expected outcome](#expected-outcome)
- [Getting started with Angular dependency injection](#getting-started-with-angular-dependency-injection)
- [Creating Angular services](#creating-angular-services)
- [How to inject service inside a component](#how-to-inject-service-inside-a-component)
- [Displaying data from a service](#displaying-data-from-a-service)
- [Conclusion](#conclusion)

### Tutorial requirements
- Angular CLI (latest version preferred) installed on your local development environment.
- Basic knowledge in Angular.
- Prior knowledge in JavaScript or TypeScript.

### Expected outcome
This tutorial aims to get you started with Angular 12 dependency injection. By following this tutorial, you'll have an in-depth knowledge of DI, which you may advance as you implement your own projects.

### Getting started with Angular dependency injection
Dependency injection is all about resource sharing. 

Let's say, for example you have a `StudentService` and `StudentComponent` that displays a list of students in a school. We may argue that the component class depends on the service class to display data since we're using the service to get data from API, as we'll see in the next section.  

So it's essential to keep in mind that dependency injection is a style of programming approach that enables you as the developer to write code that communicates to each other. 

So, for example, when one class doesn't have a given resource, it can quickly get it from another type that has it and so on and forth.

### Creating Angular services
Now that we've background knowledge in DI let's create a service that we'll use to return the list of interns in a given company.

> Service is a term widely used in programming, especially in the world of microservices. It's simply a function or group of methods that are used to handle a specific task.

Let's begin by creating a students model as shown below:

```bash
cd injectionExample
ng g i student
```

Output:

```bash
CREATE src/app/student.ts (29 bytes)
```

Next, copy and add the following contents into this model as shown below:

```ts
export interface Student {
  studentFirstName: string;
  studentLastName: string;
  studentRegistrationNumber: string;
  studentCourse: string;
  studentYearOfStudy: number;
  reportingDate: string;
  college: string;
}

```
Now that we have the model, let's proceed and create a service that will contain the functions to display the list of students.

> It's important to note that the reason we're creating these services is to loosely couple our application and to allow for reusability.

Run the following command to create `studentListService`.

```bash
 ng g service student-list
```
Output:

```bash
CREATE src/app/student-list.service.spec.ts (359 bytes)
CREATE src/app/student-list.service.ts (140 bytes)
```

Now that we have a service, let's add a function that returns the list of interns with their respective details.

```ts
import { Injectable } from '@angular/core';
import {Student} from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  getInternsDetails(): Student[] {
    return [
      {
        studentFirstName: 'John',
        studentLastName: 'Doe',
        studentRegistrationNumber: 'TRD12345STR',
        studentCourse: 'Computer Science',
        studentYearOfStudy: 1,
        reportingDate: '2019-07-20',
        college: 'University of Test1',
      },
      {
        studentFirstName: 'Alice',
        studentLastName: 'Liz',
        studentRegistrationNumber: 'DRTRD12345STR',
        studentCourse: 'Software Engineering',
        studentYearOfStudy: 1,
        reportingDate: '2020-07-19',
        college: 'University of Test2',
      },
      {
        studentFirstName: 'Bob',
        studentLastName: 'Miro',
        studentRegistrationNumber: 'YR6353',
        studentCourse: 'Information technology',
        studentYearOfStudy: 1,
        reportingDate: '2019-07-20',
        college: 'University of Test3',
      },
      {
        studentFirstName: 'Jakob',
        studentLastName: 'Jack',
        studentRegistrationNumber: 'YTT64749EJFHR',
        studentCourse: 'Computer Engineering',
        studentYearOfStudy: 1,
        reportingDate: '2019-02-10',
        college: 'University of Test7',
      },
      {
        studentFirstName: 'Prince',
        studentLastName: 'Sawoo',
        studentRegistrationNumber: 'ETRHDDIE857EHD',
        studentCourse: 'Computer Science',
        studentYearOfStudy: 1,
        reportingDate: '2019-03-30',
        college: 'University of Test10',
      }
    ];
  }
}

```
Let's analyze the above service:

- **Line 1** - We're importing `injectable` decorator. Without this decorator, this service cannot be injected (requested) by other application components.
- **Line 2** - `Student` model is imported from `./student`. It's a common practice to always keep all your services in a `service` directory. Feel free to test it out.
- **Line 5**- We have a `StudentListService` class. Inside this class we have defined the `getInternsDetails()` method that returns an array of `Student` information.

### How to inject service inside a component
Now that we have a service ready to consume, let's proceed and create a student component by executing the following commands:  

```bash
ng g c student
```

Output:

```
CREATE src/app/student/student.component.css (0 bytes)
CREATE src/app/student/student.component.html (26 bytes)
CREATE src/app/student/student.component.spec.ts (635 bytes)
CREATE src/app/student/student.component.ts (273 bytes)
UPDATE src/app/app.module.ts (400 bytes)
```

Edit the `src/app/student/student.component.ts` as shown below:

```ts
import { Component, OnInit } from '@angular/core';
import {StudentListService} from '../student-list.service';
import {Student} from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

// local array tohold the list of students
  students: Student[];
  // we're injecting the studentListService (this is Dependency injection in action)
  constructor(private studentListService: StudentListService) { }

  ngOnInit() {
    this.getStudentsList();
  }
  //getting the list of students and assigning the list to students array
  getStudentsList() {
    this.students = this.studentListService.getInternsDetails();
  }
}

```

In the above component class, we've defined the `students` array that we will use to hold the list of students. 

We then inject the `StudentListService` that we previously created. This is how Dependency injection is achieved in Angular.

We've also created the `getStudentsList()` method that we're using to get student details from the service. We assign the results to the students array we've locally created. We call this method in the `ngOnInit()` method to get students' details on page load.

### Displaying data from a service
Now that we've consumed our service, let's proceed and display these data on the browser.

Edit the `src/app/student/student.component.html` as shown below:

```html
<div>
<table class="table table-stripped table-active">
  <thead class="thead-light">
  <th>#</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Admission Number</th>
  <th>Course</th>
  <th>Year Of Study</th>
  <th>Reported On</th>
  <th>College</th>
  </thead>
  <tbody>
  <tr *ngFor="let student of students;let i=index">
    <td>{{i+1}}</td>
    <td>{{student.studentFirstName}}</td>
    <td>{{student.studentLastName}}</td>
    <td>{{student.studentRegistrationNumber}}</td>
    <td>{{student.studentCourse}}</td>
    <td>{{student.studentYearOfStudy}}</td>
    <td>{{student.reportingDate}}</td>
    <td>{{student.college}}</td>
  </tr>
  </tbody>
</table>
</div>

```

Now run your Angular application by executing the following command at the root of your application:

```bash
ng serve --port 4200
```

Expected output:

![Student table](/engineering-education/angular-12-dependency-injection/output.png) 

### Conclusion
In this tutorial, we've discussed a wide range of concepts of Angular DI with examples. We've seen how the services are created and then consumed within a component. We've also gone a step further and tested our application on the browser.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

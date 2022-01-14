---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-task-manager-with-angular/
title: How to Build a Task Manager using Angular 12
description: This article walks the reader through the basic concepts of building a simple task manager application.
author: edidiong-etok
date: 2021-12-01T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-task-manager-with-angular/hero.jpg
    alt: angular task manager
---
[Angular](https://angular.io/docs) is a popular Javascript framework. It can be used to build different applications, ranging from simple to complex.
<!--more-->
A task manager writes, organizes, and rearranges tasks more efficiently. The task manager we will build will allow the user to add a task, mark the task as complete, and delete the task.  

In this tutorial, we will discuss the concepts of building a sample Angular task manager application.

### Table of content
- [Prerequisites](#prerequisites)
- [Key takeaways](#key-takeaways)
- [Create a new angular project](#create-a-new-angular-project)
- [Create a component](#create-a-component)
- [Add tasks to the to-do list](#add-tasks-to-the-to-do-list)
- [Mark task as done](#mark-task-as-done)
- [Delete a task](#delete-a-task)
- [Save task to local storage](#save-task-to-local-storage)
- [Conclusion](#conclusion)


### Prerequisites
To follow along with this tutorial:
- You should have [Node.js](https://nodejs.org/en/) installed on your local machine.
- You should be fairly familiar with [Angular](https://angular.io/docs) and JavaScript. Knowledge of [TypeScript](https://www.typescriptlang.org/) is useful but not a prerequisite.
- You should have [Angular CLI](https://angular.io/cli) installed on your local development machine.

### Key takeaways
By the end of this tutorial, you should be able to:
-  Build a simple task manager.
-  Save items to local storage.

### Create a new angular project
Run the CLI command `ng new *project name*` on your command prompt to create a new Angular project.

```bash 
ng new todoApp 
```

The above Angular CLI command installs all the necessary Angular [NPM](https://www.npmjs.com/) packages and other dependencies for the project.

To serve your application to the browser, `cd` into the project root directory and run the following command:

```bash
ng serve 
```

### Create a component
Now that we've setup our project, let's proceed and create a `todo` component to handle all of our logic:

Run the command below to create a `todo` component:
```bash
ng generate component todo
# OR
ng g c todo
```

Next, let's add template code in the `todo.component.html` file. In this tutorial, we will use [Tailwind CSS](https://tailwindcss.com) for styling. 

> Note: Tailwind CSS [CDN link](https://v1.tailwindcss.com/docs/installation#using-tailwind-via-cdn) should be added to the `index.html` file.

Copy and paste the code below in the `todo.component.html` file.

```html   
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div class="mb-4">
                <h1 class="text-grey-darkest">Todo List</h1>
                <form class="flex mt-4">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo">
                    <button class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                </form>
            </div>
            <div>
                <div class="flex mb-4 items-center">
                    <p class="w-full text-grey-darkest">task 1</p>
                    <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                    <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                </div>
                <div class="flex mb-4 items-center">
                    <p class="w-full text-green">task 2</p>
                    <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
                    <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
                </div>
            </div>
        </div>
    </div>
```

Output:

![Todo List](/engineering-education/how-to-build-a-task-manager-with-angular/todo-list.png)

> Note: The buttons are static, so we will make them work next.

### Add tasks to the to-do list
Tasks will be added to the to-do list by clicking the `Add` button or by pressing the `Enter` key.

Let's see what happens under the hood, since the `Add` button and the input box are in a form element, we handle them using the Angular [FormGroup](https://angular.io/api/forms/FormGroup#description) property.

To use the FormGroup property, we first import it in the `app.module.ts` file as shown below:
```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

Next, add the modules to the `imports` array as shown below:

![Form group](/engineering-education/how-to-build-a-task-manager-with-angular/formgroup1.png)

In the `todo.component.html`, add the `[FormGroup]` property in the `<form>` element and set it to `newTodoForm`. This will help collect and collate the value of each element into an object. 

Next, proceed and add a `formControlName` and set it to `todoItem`, and also bind
add an event listener `(ngSubmit)` to the form element. 

The event listener will listen for a submitted event(s) and trigger an `addTask()` method.
```html    
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div class="mb-4">
                <h1 class="text-grey-darkest">Todo List</h1>
                <form [formGroup]="newTodoForm" class="flex mt-4" (ngSubmit)="addTask()">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" formControlName="todoItem">
                    <button type='submit' class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                </form> 
            </div>
```  

Then to make our form functional, we will write some TypeScript code in our `todo.component.ts` file. 

Follow these steps: 

1. Import the `[FormBuilder](https://angular.io/api/forms/FormBuilder)` service from the `@angular/forms` package. This service gives suitable methods for creating controls.

```typescript
    //todo.component.ts
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';
```

2. Inject the `FormBuilder` service in the `TodoComponent` `constructor()`. This service is included in the `[ReactiveFormsModule](https://angular.io/api/forms/ReactiveFormsModule)` module, which has already been imported.

```typescript
    //todo.component.ts
    
    export class TodoComponent implements OnInit {
    constructor(
    private formBuilder: FormBuilder
    ) {}
    } 
```

3. We will use the `group()` method of the `FormBuilder` class to collect the user inputs. These methods set the `newTodoForm` property to a form model containing the `todoItem` field.

```typescript
    //todo.component.ts
    export class TodoComponent implements OnInit {
    newTodoForm = this.formBuilder.group({
        todoItem: ''
      })
    constructor(
    private formBuilder: FormBuilder
    ) {}
    } 
```

4. Define an `addTask()` method to add a task to an empty array. Remember that `addTask()` is the method associated with the `(ngSubmit)` event on the form.
- Create an empty array `taskList` that will later hold the input task.
- In `addTask()`, collect the value of the input element and store it in a constant variable called `value`.
- Push `value` into the `taskList` array. The `id` is set to the length of the `taskList` array while the name is set to variable `value`.
-  Reset the input element.

The entire Todo component class is as follows:
```typescript
    //todo.component.ts
    
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';
    
    export class TodoComponent implements OnInit {
      taskList: any[] = []
      newTodoForm = this.formBuilder.group({
        todoItem: ''
      })
        
      constructor(
        private formBuilder: FormBuilder
      ) { }
      
      addTask() {
        const value = this.newTodoForm.value.todoItem
        this.taskList.push({ id: this.taskList.length, name: value })
        this.newTodoForm.reset(); 
      }
    }
```

We need to loop through and display the `taskList` array using `*ngFor`. It's a predefined directive in Angular.

It accepts an array to iterate data over a template to replicate the template with different data. It's the same as the `forEach()` method in JavaScript, which also iterates over an array.

The looping will be done in the `todo.component.html` file. After looping, set the `<p>` to display the task dynamically.

```html
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg mt-4">
            <div class="mb-4">
                <h1 class="text-4xl font-black">Todo List</h1>
                <form [formGroup]="newTodoForm" class="flex mt-4" (ngSubmit)="addTask()">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                        placeholder="Add Todo" formControlName="todoItem">
                    <button type="submit"
                        class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"  
                        >Add
                    </button>
                </form>
                 
            </div>
            <div>
                <div class="flex mb-4 items-center" *ngFor= "let value of taskList">
                    <p class="w-full text-grey-darkest">{{value.name}}</p>
                    <button
                        class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green">Done</button>
                    <button
                        class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red  hover:bg-red">Remove</button>
                </div>
            </div>
        </div>
    </div>
 ```   

### Mark task as done
When a task is completed, it should be marked as such. This can be done by striking a line through the task. 

To achieve this, we will do the following:

1. Add a click event to the `Done` button on the `todo.component.html` with the` markDone(value)` method.

```html    
    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">  {{value.name}}</p>
     <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green" (click)="markDone(value)">Done</button>
```                 

2.  In the `TodoComponent` class, we will define the `markDone()` method.
```typescript
    //todo.component.ts
    completed: boolean = false;

    markDone(value: any) {
        value.completed = !value.completed
        value.completed === true ?
          this.taskList.push(this.taskList.splice(this.taskList.indexOf(value), 1)[0]) :
          this.taskList.unshift(this.taskList.splice(this.taskList.indexOf(value), 1)[0])
      }
```

In the code snippet above, a variable `completed` is created and set to a boolean `false`. This variable is used to toggle the `Done` button. Hence, when `value.complete` is true, bind a line-through class to the task. 

```html
    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">  {{value.name}}</p>
```

Next is a conditional statement; If `value.complete` is `true`,then push the task to the end of the `taskList[]` array using the `push()` method. Otherwise, move it to the beginning of the `taskList` array using the `unshift()` method.

Let's proceed and implement this on our code as follows:
```typescript
    //todo.component.ts
    
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';
    
    @Component({
      selector: 'app-todo',
      templateUrl: './todo.component.html',
      styleUrls: ['./todo.component.css']
    })
    export class TodoComponent implements OnInit {
      completed: boolean = false;
      taskList: any[] = []
      newTodoForm = this.formBuilder.group({
        todoItem: ''
      })
        
      constructor(
        private formBuilder: FormBuilder
      ) { }
      
      addTask() {
        const value = this.newTodoForm.value.todoItem
        this.taskList.push({ id: this.taskList.length, name: value })
        this.newTodoForm.reset(); 
      }
      
      markDone(value: any) {
        value.completed = !value.completed
        value.completed === true ?
          this.taskList.push(this.taskList.splice(this.taskList.indexOf(value), 1)[0]) :
          this.taskList.unshift(this.taskList.splice(this.taskList.indexOf(value), 1)[0])
      }
    }
```

```html
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg mt-4">
            <div class="mb-4">
                <h1 class="text-4xl font-black">Todo List</h1>
                <form [formGroup]="newTodoForm" class="flex mt-4" (ngSubmit)="addTask()">
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                        placeholder="Add task" formControlName="todoItem">
                    <button type="submit"
                        class="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal"  
                        >Add
                    </button>
                </form>
                 
            </div>
            <div>
                <div class="flex mb-4 items-center" *ngFor= "let value of taskList">
                    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">{{value.name}}</p>
                <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green" (click)="markDone(value)">Done</button>
                    <button
       class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red  hover:bg-red">Remove</button>
                </div>
            </div>
        </div>
    </div>
```

### Delete a task
Tasks can be deleted or removed from the to-do list. For this to be achieved, the following should be done simultaneously:

1. Add a click event to the `Remove` button. Next, set the click event to the `removeTask(i)` method with the index of the task passed into the method. 

```html
    <div>
          <div class="flex mb-4 items-center" *ngFor= "let value of taskList; index as i">
                    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">{{value.name}}</p>
                    <button
                        class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green" (click)="markDone(value)">Done</button>
                    <button
                        class="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red  hover:bg-red" (click)="removeTask(i)">Remove</button>
                </div>
            </div>
        </div>
    </div>
```

2. Define the `removeTask` method in the `todo.component.ts` file:

```typescript
    //todo.component.ts
    
    removeTask(i: any) {
        this.taskList.splice(i, 1)
      }
```

The `splice()` method will remove the task whose index was passed in the `removeTask` method.

### Save task to local storage
[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is a JavaScript feature that allows sites to store data in key-value pairs.

The browser stores this data with no expiration date. This means that the stored data will remain even after the browser is refreshed or closed. 

There are different [localStorage methods](https://blog.logrocket.com/localstorage-javascript-complete-guide/#howdoeslocalstoragework) which can be used to achieve specific needs.

When any task is added to the to-do list, it should also be added to the local storage. This is done by modifying the `addTask()` method as shown below:
```typescript
    //todo.component.ts
    
    addTask() {
        const value = this.newTodoForm.value.todoItem
        this.taskList.push({ id: this.taskList.length, name: value })
        window.localStorage.setItem('task', JSON.stringify(this.taskList))
        this.newTodoForm.reset(); 
      }
```

localStorage is a read-only property of the Windows interface. Hence, the use of `windows.localStorage` in the code snippet above.

Using the `.setItem()`, which accepts a key and value, a task is stored in the local storage. The key, in this case, is `task` while the value is the `taskList` array.

The `JSON.stringify()` method converts the content of `taskList` array to a string. Next, add ` window.localStorage.setItem('task', JSON.stringify(this.taskList))` to `removeTask()`. This keeps the task deleted from the to-do list even after the browser is refreshed.

```typescript
    //todo.component.ts 
 
    removeTask(i: any) {
        this.taskList.splice(i, 1)
        window.localStorage.setItem('task', JSON.stringify(this.taskList))
 
      }
```

Finally, we want the saved task to remain even after closing or refreshing the browser. To achieve this, we have to use one angular lifecycle hook called `[ngOninit()](https://angular.io/api/core/OnInit)`. 

The `[ngOninit()](https://angular.io/api/core/OnInit)` is invoked only when the directive is instantiated.

```typescript
    //todo.component.ts
 
    ngOnInit(): void {
        this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
      }
```

In the code above, the local storage method `getItem()` is used to get items from the local storage and display them. The complete code for this tutorial is on [GitHub here](https://github.com/edidee/angular-task-manager). 
 

### Conclusion
This article was a complete guide on how you can build a simple task manager in Angular. I know this will be of great help to developers starting in Angular.

Happy Coding ☺️ 

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

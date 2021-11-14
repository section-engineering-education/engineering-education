# How to build a task manager with angular.

## Introduction

If you are trying to learn a programming language or framework, building simple tasks around that language will not just facilitate your learning process but will help solidify your knowledge in that language.  

In this article, I will walk you through the process of building a simple task manager app (also known as a To-do app) using [angular](https://angular.io/docs), a JavaScript framework; but first, let us get some things out of the way.


## What is a Task Manager?

A task manager, as its name implies is a system monitor program that is used to write, organize and rearrange tasks more efficiently. Now, the task manager we are going to build will allow the user multiple basic functionalities like task addition, deletion and of course the ability to mark a task as complete.



## Key Takeaways From This Article
1. How to create and structure an angular project.
2. How to create modules and components in angular.
3. Build a simple application.
4. Save tasks to local storage



## Prerequisites

Before we get started, here are a few prerequisities for developing a task manager via Angular;

- You should have [Node.js](https://nodejs.org/en/) installed on your computer.
- You should be fairly familiar with [Angular](https://angular.io/docs) and JavaScript. Knowledge of [TypeScript](https://www.typescriptlang.org/) is useful but not requisite.


## Overview
1. Create a new angular project
2. Create a component
3. Add task
4. Mark task as done
5. Delete task
6. Save to local storage


## Step 1: Create a new angular project

Before one can create a new project on angular, one will need to install angular CLI. This installation is done by running the command stated below in your terminal or command prompt.


   ```npm install -g @angular/cli
   ```

Once this is done, your angular project can be created by running the CLI command `ng new` and then providing a name for the project, in our case, `todoApp` will suffice. Accept the defaults by pressing the enter key.


    ``` ng new todoApp 
    ```

The Angular CLI will install the required Angular npm packages and other dependencies for the project.

The Angular CLI has a server to serve and build applications locally. To run the application, you will need to navigate to the workspace folder by running  `cd todoApp`  after which you run the command `ng serve -o` like so;


    ```
    cd todoApp
    ng serve -o
    ```

The `ng serve` command sets up the server, observes your files, and rebuilds the app as you make changes to those files.


## Step 2: Create a component

Components are the main constituents of an angular application. Each component consists of;

- An HTML template: it states what is rendered on the page.
- A Typescript class: it defines the behavior of the template.
- A CSS file: it is used to style the template.

Components can be created manually or by using the Angular CLI. For this article, it will be created using the latter. You can start by running the command below on your terminal.


    ```
    ng generate component todo
    
    // OR
    
    ng g c todo
    ```

The CLI command above tells the Angular CLI to generate a component called `todo`.
Now in your code, check the `app` folder which is in the `src` folder, and you'll notice a `todo` folder has been created. This `todo` folder contains the HTML, CSS, and TypeScript files as shown below.

![Angular Setup](/how-to-build-a-task-manager-with-angular/angular_setup.png)


Once this is complete, the component will be automatically imported and added to the declaration in the app module. You should check the `app.module.ts` file to see this.


![App Module](/how-to-build-a-task-manager-with-angular/app_module.png)


Note: If you create the component manually, you will have to import the component yourself in the `app.module.ts` file.
Next, we will put some HTML code in the `todo.component.html` file. We will use tailwind for styling. In essence, the tailwind [CDN](https://v1.tailwindcss.com/docs/installation#using-tailwind-via-cdn) link should be added to the `index.html` file. Like so;

```
    //todo.component.html
    
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

Once the HTML code is pasted, you should see something similar to the image below on your browser.

![Todo List](/how-to-build-a-task-manager-with-angular/todo-list.png)


Note: The buttons are static so we are going to make them work in the next section.


## Step 3: Add Tasks to the To-do list

Tasks can be added to the to-do list by clicking the ‘Add’ button or pressing the enter key.

Let’s see what happens under the hood;
Since the ‘Add’ button and the input box are in a form element, we will handle them as a group using the angular [FormGroup](https://angular.io/api/forms/FormGroup#description) property.
To use the [FormGroup](https://angular.io/api/forms/FormGroup#description) property, you will first import it in the `app.module.ts` file which will be automatically included in the `imports` array as shown in the image below.


![Form group](/how-to-build-a-task-manager-with-angular/formgroup1.png)

![](/static/img/pixel.gif)


Secondly, in our `todo.component.html`, add the `[FormGroup]` property in the `<form>` element and set it to `newTodoForm`. This will help collect and collate the value of each element into an object. 
We will also add a `formControlName` and set it to `todoItem`.
Next, an event listener `(ngSubmit)` is added to the form element, which will listen for a submit event and then trigger a method called `addTask()`.

```
    //todo.component.html
    
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
Finally, to make our form functional, we will write some JavaScript code in our `todo.component.ts` file via the following procedures; 

1. Import the `[FormBuilder](https://angular.io/api/forms/FormBuilder)` service from the `@angular/forms` package. This service gives suitable methods for creating controls.


```
    //todo.component.ts
    
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';
```

2. Inject the `FormBuilder` service in the `TodoComponent` `constructor()`. This service is included in the `[ReactiveFormsModule](https://angular.io/api/forms/ReactiveFormsModule)` module, which has already been imported.

```
    //todo.component.ts
    
    export class TodoComponent implements OnInit {
    constructor(
    private formBuilder: FormBuilder
    ) {}
    } 
```

3. To get the inputted task, use the `FormBuilder` `group()` method to set the `newTodoForm` property to a form model containing `todoItem` field.

```
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

4. Define a `addTask()` method to add a task to an empty array. Remember that `addTask()` is the method associated with the `(ngSubmit)` event on the form. Hence; 
- Create an empty array `taskList` that will later hold the input task.
- In `addTask()`, collect the value of the input element and store it in a constant variable called `value`.
- Push `value` into the `taskList` array, where the `id` is set to the length of the `taskList` array and the name is set to variable `value`.
-  Reset the input element.

The entire Todo component class is as follows:
 
```
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

Finally, we need to loop through the `taskList` array using `*ngFor` (similar to For loop in vanilla JavaScript) to display all the tasks. This will be done in the `todo.component.html` file. 
After looping, set the `<p>` to display the task dynamically.

### Your task manager should be working like this:

```
    //todo.component.html
    
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



## Step 4: Mark Task as Done

When a task is completed, it should be marked as such. This can be done by striking a line through the task. To achieve this, we will do the following:


1. Add a click event to the Done button on `todo.component.html` with a method `markDone(value)`.

```
    //todo.component.html
    
    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">  {{value.name}}</p>
     <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-green border-green hover:bg-green" (click)="markDone(value)">Done</button>
```                 


2.  In `TodoComponent` class, we will define the `markDone` method.

```
    //todo.component.ts
    
    completed: boolean = false;
    
    markDone(value: any) {
        value.completed = !value.completed
        value.completed === true ?
          this.taskList.push(this.taskList.splice(this.taskList.indexOf(value), 1)[0]) :
          this.taskList.unshift(this.taskList.splice(this.taskList.indexOf(value), 1)[0])
      }
```

In the code snippet above, a variable `completed` is created and set to a boolean `false`. This variable is used to toggle the ‘Done’ button. Hence, when `value.complete` is true, bind a line-through class to the task. 
 

```
    //todo.component.html
    
    <p class="w-full text-grey-darkest" [ngClass]="{'line-through': value.completed}">  {{value.name}}</p>
```

Next is a conditional statement; IF `value.complete` is true, splice the task then push it to the end of the `taskList` array using the `push()` method. ELSE splice the task then move it to the beginning of the `taskList` array using the `unshift()` method.

So far, these are the codes in `todo.component.ts` file:

```
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

```
    //todo.component.html
     
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


## Step 5: Delete Task

Tasks can be deleted or removed from the to-do list. For this to be achieved, the following should be done simultaneously; 

1. Add a click event to the ‘Remove’ button and set it to `removeTask(i)` method with the index of the task passed into the method. 

```
    //todo.component.html
    
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

2. Define `removeTask` method in `todo.component.ts` file:

```
    //todo.component.ts
    
    removeTask(i: any) {
        this.taskList.splice(i, 1)
      }
```
The `splice()` method will remove the task whose index was passed in the `removeTask` method.


## Step 6: Save task to local storage

The `[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)` is a feature that allows sites or apps built with JavaScript to store key-value pairs in a web browser with no expiration date. This means that the data stored in the browser will remain even after the browser is refreshed or closed. There are different [localStorage methods](https://blog.logrocket.com/localstorage-javascript-complete-guide/#howdoeslocalstoragework)  which can be used. However, in this article; only a few will be considered to achieve the set goal of storing tasks to the browser's local storage.

First, when any task is added to the to-do list, it should also be added to the local storage, this is done by modifying the `addTask()` method as shown below:

```
    //todo.component.ts
    
    addTask() {
        const value = this.newTodoForm.value.todoItem
        this.taskList.push({ id: this.taskList.length, name: value })
        window.localStorage.setItem('task', JSON.stringify(this.taskList))
        this.newTodoForm.reset(); 
      }
```

`Window.localStorage` is a read-only feature that reinstate a reference to the local storage object used to save data that is only available to the origin that generated it.
Using the `.setItem()` which accepts a key and value, a task is stored in the local storage. The key, in this case, is `task` while the value is the `taskList` array which is first converted to a string using `JSON.stringify()`.

Secondly, to keep a task deleted from the to-do list even after refreshing the browser,  we need to also add the same code above to the `removeTask()` method.

```
    //todo.component.ts 
    
    removeTask(i: any) {
        this.taskList.splice(i, 1)
        window.localStorage.setItem('task', JSON.stringify(this.taskList))
        
      }
```
Lastly, we want the saved task to remain even after the browser has been closed or refreshed. To achieve these, we have to use one of the lifecycle hooks in angular called `[ngOninit()](https://angular.io/api/core/OnInit)` in the `todoComponent` class. `[ngOninit()](https://angular.io/api/core/OnInit)` is invoked only when the directive is instantiated.

```
    //todo.component.ts
    
    ngOnInit(): void {
        this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
      }
```
In the code above, the local storage method `getItem()` is used to get items from the local storage and display them. 

You can find the full code for this tutorial on [github](https://github.com/edidee/angular-task-manager).


## Summary

So far, this article has given a comprehensive analysis of how you can build a simple task manager in Angular. I believe this will be of great help to developers starting out in Angular.

Happy Coding ☺️ 




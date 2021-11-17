# How to build a task manager with angular.

### Introduction
As developers, it is common practice to build simple applications. This will help solidify ones knowledge about a particular programming language or framework. 

In this article, we will build a simple task manager application (AKA To-do app) using  [angular](https://angular.io/docs). Angular is a JavaScript framework.

### Key takeaways
At the end of this tutorial, you should be able to:
-  create and structure an angular project.
-  create a component in angular.
-  build a simple application.
-  save items to local storage

### Overview
-  Introduction
-  Key takeaways
-  Overview
-  What is a Task Manager
-  Prerequisites
-  Create a new angular project
-  Create a component
-  Add task
-  Mark task as done
-  Delete a task
-  Save to local storage
-  Summary

### What is a Task Manager?
A task manager writes, organizes, and rearranges tasks more efficiently. The task manager we will build will allow the user to add a task, mark the task as complete, and delete the task.


### Prerequisites

Before we get started, here are a few prerequisites for developing a task manager via Angular;

- You should have [Node.js](https://nodejs.org/en/) installed on your computer.
- You should be fairly familiar with [Angular](https://angular.io/docs) and JavaScript. Knowledge of [TypeScript](https://www.typescriptlang.org/) is useful but not requisite.



### Create a new angular project

Before one can create a new project on angular, one will need to install angular CLI. Run `npm install -g @angular/cli` on the terminal or command prompt to install the CLI.

   ```npm install -g @angular/cli
   ```

After installing the CLI, you can now create a new angular project. To do this, run the CLI command `ng new *project name*`, for this article, we will use `todoApp` as the project name.

    ``` ng new todoApp 
    ```
 Accept the defaults by pressing the enter key.

The Angular CLI will install the required Angular npm packages and other dependencies for the project.

The Angular CLI has a server to serve and build applications locally.
To serve your application to the browser, you will first navigate to the workspace folder. Run `cd todoApp` to do so. 
Next, run the command `ng serve -o` and wait for some minutes, your application will launch in the browser.


    ```
    cd todoApp
    ng serve -o
    ```

The `ng serve` command sets up the server, observes the files, and rebuilds the app as you make changes to those files.


### Create a component

Components are the main constituents of an angular application. Each component consists of;

- An HTML template: states what is rendered on the page.
- A Typescript class: defines the behavior of the template.
- A CSS file: it is used to style the template.

Components can be created manually or by using the Angular CLI. For this article, it will be created using the latter. You can start by running the command below on your terminal.

    ```
    ng generate component todo
    
    // OR
    
    ng g c todo
    ```

The CLI command above tells the Angular CLI to generate a component called `todo`.
Now in your code, check the `app` folder which is in the `src` folder, and you will notice a `todo` folder has been created. This `todo` folder contains the HTML, CSS, and TypeScript files as shown below.

![Angular Setup](/how-to-build-a-task-manager-with-angular/angular_setup.png)


After generating the component, it will be automatically imported into the app module. The component is also added to the `declarations` array. You should check the `app.module.ts` file to see this.

![App Module](/how-to-build-a-task-manager-with-angular/app_module.png)


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

Once you paste the HTML code, you should see something like the image below on your browser.

![Todo List](/how-to-build-a-task-manager-with-angular/todo-list.png)


Note: The buttons are static so we are going to make them work in the next section.


###  Add Tasks to the To-do list

Tasks will be added to the to-do list by clicking the ‘Add’ button or pressing the enter key.

Let’s see what happens under the hood;
Since the ‘Add’ button and the input box are in a form element, we will handle them as a group using the angular  [FormGroup](https://angular.io/api/forms/FormGroup#description) property.

To use the [FormGroup](https://angular.io/api/forms/FormGroup#description) property, you will first import it in the `app.module.ts` file using 
```
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```
The property will be automatically included in the `imports` array as shown in the image below.


![Form group](/how-to-build-a-task-manager-with-angular/formgroup1.png)


In the `todo.component.html`, add the `[FormGroup]` property in the `<form>` element and set it to `newTodoForm`. This will help collect and collate the value of each element into an object. 
We will also add a `formControlName` and set it to `todoItem`.

Next, add an event listener `(ngSubmit)` to the form element. The event listener will listen for a submit event and then trigger a method called `addTask()`.

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
Finally, to make our form functional, we will write some JavaScript code in our `todo.component.ts` file. Follow these procedures; 


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

3. To collect the inputted task, we will use the `FormBuilder` `group()` method. These methods sets the `newTodoForm` property to a form model containing `todoItem` field.

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
- Push `value` into the `taskList` array. The `id` is set to the length of the `taskList` array while the name is set to variable `value`.
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

Finally, we need to loop through and display the `taskList` array using `*ngFor`.  *ngFor` works like the For loop in vanilla JavaScript. 
The looping will be done in the `todo.component.html` file. 
After looping, set the `<p>` to display the task dynamically.


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



### Mark Task as Done

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

Next is a conditional statement; IF `value.complete` is True, 
push the task to the end of the `taskList` array using the `push()` method. 
ELSE, move it to the beginning of the `taskList` array using the `unshift()` method.

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


### Delete Task

Tasks can be deleted or removed from the to-do list. For this to be achieved, the following should be done simultaneously; 

1. Add a click event to the ‘Remove’ button. Set the click event to `removeTask(i)` method with the index of the task passed into the method. 


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


### Save task to local storage

 `[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)`  is a JavaScript feature that allows sites to store data in key-value pairs. The browser stores this data with no expiration date. This means that the stored data will remain even after the browser is refreshed or closed. 
There are different  [localStorage methods](https://blog.logrocket.com/localstorage-javascript-complete-guide/#howdoeslocalstoragework) which can be used to achieve specific needs.
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


`localStorage` is a read-only property of the windows interface. Hence, the use of `windows.localStorage` in the code snippet above.

Using the `.setItem()` which accepts a key and value, a task is stored in the local storage. The key, in this case, is `task` while the value is the `taskList` array.
`JSON.stringify()` will convert the content of `taskList` array to a string.
Next, add ` window.localStorage.setItem('task', JSON.stringify(this.taskList))` to `removeTask()`. This will keep the task deleted from the to-do list even after the browser is refreshed.

```
    //todo.component.ts 
 
    removeTask(i: any) {
        this.taskList.splice(i, 1)
        window.localStorage.setItem('task', JSON.stringify(this.taskList))
 
      }
```
Finally, we want the saved task to remain even after we close or refresh the browser. An a
To achieve these, we have to use one angular lifecycle hook called ` [ngOninit()](https://angular.io/api/core/OnInit) `. 
`[ngOninit()](https://angular.io/api/core/OnInit)` is invoked only when the directive is instantiated.

```
    //todo.component.ts
 
    ngOnInit(): void {
        this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
      }
```
In the code above, the local storage method `getItem()` is used to get items from the local storage and display them. 

The complete code for this tutorial is on [github](https://github.com/edidee/angular-task-manager). 
 


### Summary

So far, this article has given a complete guide on how you can build a simple task manager in Angular. I know this will be of great help to developers starting out in Angular.

Happy Coding ☺️ 

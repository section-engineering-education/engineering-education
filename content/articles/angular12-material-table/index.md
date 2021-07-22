
### Introduction

In this tutorial, I'll show you how to create Angular material tables, populate this table with some data. We'll then proceed and apply several functionalities to this table such as paging, filtering and sorting.  

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with Angular Material](#getting-started-with-angular-material)
- [Using Material Table to display data](#using-material-table-to-display-data)

### Prerequisites

To follow this tutorial along, you should have:

- Basic knowledge of Angular, in this tutorial we'll be using Angular 12.
- Some background knowledge using Angular Material will help you get started quickly.
- A complete Angular project installed on your machine.

### Objectives

This tutorial will teach you everything you need to use Angular materials tables. We'll build a complete project implementing the Angular Material data table with multiple functionalities.

### Getting started with Angular Material

In this section, I'll show you how to setup your Angular project to start using the Angular Material.

In your project root, open terminal and run the following commands:

```bash
ng add @angular/material
```

This command will prompt for a `yes`/`no` question as shown below:

```bash
.......
# installation starts
✔ Found compatible package version: @angular/material@12.1.3.
..................
Would you like to proceed? (Y/n) 

```

Enter `y` to proceed with the Angular Material installation. This will install all packages required for Material.

[Material Installation](/engineering-education/angular-material-table/material-output.png)

Now that we've successfully installed Material, let's now import material modules into our project.

```js
//import angular material modules here for our table
import { MatInputModule,
         MatPaginatorModule,
         MatProgressSpinnerModule, 
         MatSortModule, MatTableModule 
         }
          from "@angular/material";

@NgModule({
// since we're exporting these modules, add them to export
    exports: [
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule  
        MatInputModule,
        MatPaginatorModule,
       
    ]
})
export class AppMaterialModule {}

```

In the above module, we're importing the Material modules from `@angular/material`. we then export all these modules since we'll be using them in our main module as shown below.  

```js
..........................
import { AppMaterialModule } from "./app.material-module";

@NgModule({
  declarations: [
    ....
  ],
  imports: [
    .........
    AppMaterialModule,

  ],
  ...
})
export class AppModule { }

```

We've updated our `app.module.ts` as show above by importing the `AppMaterialModule` module to expose the Material modules we had imported.

### Using Material Table to display data

In this section, I'll show you how to create Material table for students. The table will consist of basic student details such as names and registrations. Let's start by creating these details interface.

Run the following commands on your project root:

```bash
 ng g i student
```
This will create an interface in the `app/student.ts` file, proceed and edit it as follows:

```js
export interface Student {
  firstName:string;
  lastName:string;
  studentEmail:string;
  course:string;
  yearOfStudy: bigint;
  registrationNumber:string;
}

```

### Introduction
In this tutorial, I'll show you how to create Angular material tables and populate this table with some data. We'll then proceed and apply several functionalities to this table such as paging, filtering, and sorting.  

### Table of contents

- [Prerequisites](#prerequisites)
- [ObjectivesAngular 12 Material Table With Pagination, Filtering, Sorting](#objectivesangular-12-material-table-with-pagination-filtering-sorting)
- [Getting started with Angular Material](#getting-started-with-angular-material)
- [Using Material Table to display data](#using-material-table-to-display-data)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you are required to have the following:

- Basic knowledge of Angular. In this tutorial we'll be using Angular 12.
- Knowledge on using Angular Material. It will help you get started quickly.
- A complete Angular project installed on your machine.

### Objectives
This tutorial will teach you everything you need to use Angular Material tables. We'll build a complete project for implementing the Angular Material data table with multiple functionalities.

### Getting started with Angular Material
In this section, I'll show you how to set up your Angular project to start using Angular Material.

In your project root, open the terminal and run the following commands:

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

![Material Installation](/engineering-education/angular-material-table/material-output.png)

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

In the above module, we're importing the Material modules from `@angular/material`. We then export all these modules since we'll be using them in our main module as shown below.

```js
// ..........................
import { AppMaterialModule } from "./app.material-module";

@NgModule({
  declarations: [
    // ....
  ],
  imports: [
    // .........
    AppMaterialModule,

  ],
  // ...
})
export class AppModule { }
```

We've updated our `app.module.ts` as shown above by importing the `AppMaterialModule` module to expose the Material modules we had imported.

### Using Material table to display data
In this section, I'll show you how to create the Material table for `students`. The table will consist of basic student details such as `names` and `registrations`. Let's start by creating the details interface.

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

Now, proceed and create an `assets/students.json` file and define the student details that we will use in our RESTful APIs to represent in a table.

```json
[
  {
  "firstName": "John",
  "lastName": "Doe",
  "studentEmail": "johndoe@example.com",
  "course": "Bsc Software Engineering",
  "yearOfStudy": 2
},
  {
    "firstName": "Test2",
    "lastName": "Test2",
    "studentEmail": "test@example.com",
    "course": "Bsc Computer Science",
    "yearOfStudy": 4
  }]
```

Create  `services/apiService.ts` service file and add the following:

First, begin by defining the `baseURL` in the environment to make your code look organized and for reusability purposes.

```typescript
// ...

export const environment = {
  // ...
  baseURL:'assets/',
};
// ...
```

Create an `api` service by running the follwoing commad:
```bash
ng g s api
```
Then update it as follows:   

```typescript
// ...
//import student intreface
import {Student} from "../student";
//import this to make http requests
import {HttpClient} from "@angular/common/http";
//we've defined our base url here in the env
import {environment} from "../../environments/environment";
// ....
//class apiService
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method returns students details
   */
  getStudentsInformation(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${environment.baseURL}student.json`);
  }
}
```

Now that we've got the logic to get data from our API, let's now proceed and add this to the controller, but first, let's update our `app.module.ts` file as follows:  

```typescript
...

import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    HttpClientModule, //endsure your import this module
  ],
  ...
})
...

```

Then update the `app.component.ts` contents as shown below:

```typescript
...
import {MatTableDataSource} from "@angular/material/table";
import {Student} from "./student";
import {ApiService} from "./services/api.service";

@Component({
  ...
})
export class AppComponent implements OnInit{

  student: Student[]=[];
  // columns we will show on the table
  public displayedColumns = ['firstName', 'lastName', 'studentEmail', 'yearOfStudy', 'registrationNumber', 'course'  ];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Student>();

  //dependency injection
  constructor(private studentApiService: ApiService) {
  }

  ngOnInit(){
    //call this method on component load
    this.getStudentsInformation();
  }
  /**
   * This method returns students details
   */
  getStudentsInformation(){
    this.studentApiService.getStudentsInformation()
      .subscribe((res)=>{
        console.log(res);
      })
  }
}

```

At this point, you can now test your application by logging your API response observable output as shown below:

1. Serve your application by running `ng serve --port 3000`.
2. Go to your browser and open the new tab and enter `localhost:3000`.
3. `Ctrl + Shift + I` to go to the logs.

You will see the following output if you followed the correct steps above:  

Output:

![first console output](/engineering-education/angular12-material-table/console.png)
![second console output](/engineering-education/angular12-material-table/exapnded-output.png)

Now let's update our `app.component.html` as shown below to display our data.

```HTML

<table mat-table [dataSource]="dataSource">
  <ng-container matColumnDef="firstName">
    <th mat-header-cell *matHeaderCellDef> First Name </th>
    <td mat-cell *matCellDef="let element"> {{element.firstName}} </td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th mat-header-cell *matHeaderCellDef> Last Name </th>
    <td mat-cell *matCellDef="let element"> {{element.lastName}} </td>
  </ng-container>

  <ng-container matColumnDef="studentEmail">
    <th mat-header-cell *matHeaderCellDef> Student Email </th>
    <td mat-cell *matCellDef="let element"> {{element.studentEmail }} </td>
  </ng-container>
  <ng-container matColumnDef="registrationNumber">
    <th mat-header-cell *matHeaderCellDef> Registration Number </th>
    <td mat-cell *matCellDef="let element"> {{element.registrationNumber}} </td>
  </ng-container>

  <ng-container matColumnDef="course">
    <th mat-header-cell *matHeaderCellDef> Course </th>
    <td mat-cell *matCellDef="let element"> {{element.course}} </td>
  </ng-container>

  <ng-container matColumnDef="yearOfStudy">
    <th mat-header-cell *matHeaderCellDef> Year Of Study </th>
    <td mat-cell *matCellDef="let element"> {{element.yearOfStudy}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

Output:

[output](/engineering-education/angular12-material-table/output.png)

### Conclusion
In this tutorial, we've discussed Angular Material. We've seen how we can use this Angular feature to create paging in an application. We've also seen how to make requests to APIs and use that data in our application.

I hope this article builds a strong foundation for you to begin using the Angular Material table. From there, you can then proceed to sorting and other features. 

You can find the code in this tutorial on [this Repl](https://replit.com/@benardogure/Angular-Material-Paging). The Angular 12 `src` directory is included in the Repl. 

Happy coding!

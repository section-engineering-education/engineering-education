### Introduction

Building Angular applications can be tricky sometimes. This could be due to delayed server responses after making API calls or bugs that subsequently affect the user interface.

In this tutorial, we discuss the importance of Angular Route Resolvers in building Angular components. We also create a sample application that fetches some data from an API and only render the component upon data retrieval.

### Table of contents

- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Angular API calls recap](#angular-api-calls-recap)
- [Getting started with Angular route resolvers](#getting-started-with-angular-route-resolvers)
- [Using Angular route resolvers](#using-angular-route-resolvers)
- [Conclusion](#conclusion)

### Objectives

This tutorial covers the basics to advanced features of Angular Route Resolvers. In the end, you should be able to make API calls and only resolve the route only and only if the data response has been received.

### Prerequisites

To follow this tutorial along, you should be familiar with:

- Basics of JavaScript or TypeScript
- Basics of Angular2+ routing concepts.
- Knowledge of dependency injection

### Angular API calls recap

Before we dive into the actual topic, let's refreshen our minds on Angular API calls.
Usually, when an asynchronous API call from an application is made, it takes some time to respond.

For example,

```ts
...
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  /**
   * list of ministries
   */
  ListOfMinistries():Observable<Ministry>{
    return this.httpClient.get<Ministry>(`${environment.apiURL}ministries`);
  }
```

We've got a method in the service above that gets the list of ministries from a server somewhere.

```ts
.......
import {ApiService} from "../../core/services/api.service";
import {Router} from "@angular/router";

...
export class MinistriesComponent implements OnInit {

  ministries:Ministry[];
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getListOfMinistries();
  }

  /**
   * list of ministries
   */
  getListOfMinistries(){
    this.apiService.ListOfMinistries()
      .subscribe((res)=>{
        this.ministries=res.data;
        this.loading=false;
      },error => {
      })
  }
}

```

In the component, we use the `ListOfMinistries()` method to subscribe to the list of ministries. So we can say that we receive ministries as long as we keep subscribing to them.  

We would expect to get this data immediately and display it on the template. However, this is not the case, the server might take a long time to respond, or it may suffer from bugs that may happen more often.

So what happens to our table of ministries on the template? As you might have guessed, this breaks the UI.

You may now be thinking about loaders on the screen, but are they effective as far as UI design is concerned?  

In the next section, we explore Angular resolvers and how we can solve the above delays.

### Getting started with Angular route resolvers
In simpler terms, Angular resolvers refer to `middleware that is executed first before a component is fully loaded.  

Now, let's look at a standard way of rendering the list of ministries we listed above.

```html
<div class='table-responsive' *ngIf="miistries">
    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Representative</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let ministry of ministries;let i=index">
                <td>{{i+1}}}</td>
                <td>{{ministry.name}}</td>
                <td>{{ministry.description}}</td>
                <td>{{ministry.representative}}</td>
            </tr>
        </tbody>
    </table>
</div>

```

On the template above, you realise that we've got a condition `*ngIf=" ministries"`, which ensures that the table is only displayed when the API responds with some data.  

This is not what we want to do; we want our template displayed when the API has responded with data. Otherwise, we don't show this component. This is where the Angular resolvers come in hand.  

### Using Angular route resolvers 

Let's start by creating a class that implements the `Resolver class`.

```ts
//ministries resolver
...
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class RouteResolver implements Resolve<any> {

   constructor(public apiService: ApiService) { }

   resolve() {
      return this.apiService.ListOfMinistries()
   }

}
```
The above class has a simple task: only return resolved data from the `ListOfMinistries()` method.  

Proceed and edit your `src/app/app-routing.module.ts` as follows:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
...
// Route resolver array
import { RouteResolver } from './resolvers/route.resolver';

const routes: Routes = [
  {
    path: 'ministries',
    component: MinistryComponent,
    resolve: {
      routeResolver: RouteResolver
    },
  }, 
];

@NgModule({
  ...
  providers: [RouteResolver]
})

export class AppRoutingModule { }
```

Now that we've configured our `ministry` route to only return resolved data let's see how we can access it on our component.

```ts
...
import { ActivatedRoute } from '@angular/router';

@Component({
  ...
})

export class MinistryComponent implements OnInit {

  Ministries: Ministry = [];

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.activatedRoute.data.subscribe(data => {
      console.log('Check route resolver data')
      console.log(data)
    })
  }
}
```

We now get our list of ministries from the activated route instead of the API service directly from the component. That's it.

### Conclusion

In this tutorial, we've seen how Angular route resolvers are implemented. We've seen its advantages and why we tend to avoid accessing API calls directly from the component.

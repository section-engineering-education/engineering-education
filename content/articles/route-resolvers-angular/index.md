---
layout: engineering-education
status: publish
published: true
url: /route-resolvers-angular/
title: Getting Started With Angular Route Resolvers
description: In this article, we will discuss the importance of Angular Route Resolvers in building Angular components. We will also create a sample application that fetches some data from an API and only renders the component upon data retrieval.
author: odiwuor-amos
date: 2021-10-20T00:00:00-07:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/route-resolvers-angular/hero.png
    alt: Angular Routes image
---
Building Angular applications can be tricky sometimes. This could be due to delayed server responses after making API calls, or bugs that subsequently affect the user interface.
<!--more-->
In this tutorial, we will discuss the importance of Angular Route Resolvers in building Angular components. We will also create a sample application that fetches some data from an API and only renders the component upon data retrieval.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Angular API calls recap](#angular-api-calls-recap)
- [What's Angular route resolvers?](#what-is-angular-route-resolvers)
- [Using Angular route resolvers](#using-angular-route-resolvers)
- [Conclusion](#conclusion)

### Objectives
This tutorial covers the basics to advanced features of Angular Route Resolvers. In the end, you should be able to make API calls and only resolve the route if the data response has been received.

### Prerequisites
To follow this tutorial along, you should be familiar with:
- Basics of JavaScript or TypeScript.
- Basics of Angular2+ routing concepts.
- Knowledge of dependency injection.

### Angular API calls recap
Before we dive into the actual topic, let's refresh our minds on Angular API calls.

Usually, when an asynchronous API call from an application is made, it takes some time to respond. This maybe due to poor network or server downtime.

In either case, the users will be redirected to a component that has no data from the API. This will always happen whether you have a strong internet connection or not.

For example:

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

Let's assume that the service above gets list of all ministries from a country's state government. We have injected the `HttpClient` to help us send this API request to the server.

We also have an observable that listens to our response. The `GET` method retrieves the list of all ministries from the server and pass the list to `Ministry` object.

Now the catch is that we don't have any idea how long this will take. Whether it takes a second or half an hour is entirely dependent on the server we're making requests to.

Let's see how we can handle this response no matter how long it takes.

As long as we have the response, it will handle as shown in the following component:

```ts
.......
import {ApiService} from "../../core/services/api.service";
...
export class MinistriesComponent implements OnInit {
  ministries:Ministry[];
  //inject the api service we previously created.
  constructor(private apiService:ApiService,private router:Router) { }
  ngOnInit(): void {
    // list for ministries will be listed whenever this component is initialized
    this.getListOfMinistries();
  }
  /**
   * list of ministries
   */
  getListOfMinistries(){
    this.apiService.ListOfMinistries()
      .subscribe((res)=>{
        this.ministries=res.data;
      },error => {
      //error logs goes here...
      })
  }
}
```

At the beginning of this component, we import the API service we previously created. It is important to note that this is a dependency injection concept which is worth looking at if you're quite not familiar with.

We had initially stated that it's the `apiService` that is used to communicate with external server to get the list of all ministries.

Now what happens is that, we inject this service into our component, and use it to get the list of ministries as we would wish, in our case, when the `MinistriesComponent` is initialized.

In order to have a well organized component, we have created a method `getListOfMinistries()` that we are using to get the list of ministries from the `apiService`.

> Remember that in dependency injection, we can inject the method of a service anywhere else in the application. Therefore, we call the `apiservice.ListOfMinistries()` method to subscribe to list of ministries from the API.

Given other factors remain constant, this should return our list of ministries on component initialization, however, this is not always the case. There maybe other factors that come into play such as server bugs and poor internet connections

What happens to our table of ministries on the template? It is important for us to note that whenever a component is invoked, its template should be rendered.

However, in this case, it's rendered without the list of ministries from the API which may be delayed as we've seen previously. As far as user interface is concerned, this breaks the entire page where the list is supposed to be displayed.

How is this suppose to be prevented? One such solution would be to implement loaders on the site, which will be loaded as the component waits for the response form the API. The other solution is the use of the Angular route resolvers.

In the next section, the concept of Angular resolvers is covered in-depth. We'll see how this functionality may be used to overcome the problem above.

### What is Angular route resolvers?
In simpler terms, Angular resolvers refer to [middleware](https://laravel.com/docs/8.x/middleware) that is executed before a component is fully loaded.

Angular route resolver, acts like a filter where before a component is rendered, it must ensure that it has the required data for that template. This of course ensure that the Single Page Application (SPA) is achieved in Angular.

Now, the following template renders the list of ministries without loaders or route resolver.

```html
<div class="table-responsive">
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

On the template above, we've a table of government ministries. The table should display the name of a ministry, its description, and minister.

Normally, when you try to loop trough this table, you'll realise that the table has an empty list at the beginning, but later on, is filled up with data (we assume the API returns some list of ministries).

> Before you proceed, test the functionality above to understand the 'delayed' response we're talking about.

If you successfully tested the feature above, you may have noticed the broken user interface. This is a UI issue that companies take seriously, and you as the developer must be in a position to fix.

One way to fix it, as you have already seen, is the use of Angular route resolvers.

Now we want our component to be displayed (rendered) only when there is a response from the API.In the section, let's implement the route resolvers.

### Using Angular route resolvers
Previously, we have seen how incorrectly handled API responses may break our user interface. In this section, we want to implement the same ministries' table using Angular route resolvers, and take note of the key differences.

Let's start by creating a class that implements the `Resolver class`.

```ts
//ministries resolver
...
import {ApiService} from "../../core/services/api.service";
import { Resolve } from '@angular/router';
...
export class RouteResolver implements Resolve<any> {
  //inject the api service we initially implemented
   constructor(public apiService: ApiService) { }

  //resolve our list of ministries api service
   resolve() {
      return this.apiService.ListOfMinistries()
   }
}
```

In the class above, we import the api service we had designed. It had a method to get list of all government ministries. We call this method in the `resolve()` method.

Proceed and edit your `src/app/app-routing.module.ts` as follows:

```ts
.....
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
....
```

In the routing module above, we import the route resolver we previously created to resolve our list of ministries.

We then create a route constant of type `Routes`. This constant takes an array of route paths, in our case, we have a single route `ministries` which uses the `MinistryComponent` and is resolved by the `RouteResolver`.

Now that we have configured our `ministries` route to only return resolved data, let's see how we can access it on our component.

Update the `MinistryComponent` as shown below:

```ts
...
import { ActivatedRoute } from '@angular/router';
...

export class MinistryComponent implements OnInit {
  ministries:Ministry[];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.ministries=data;
      //log your api response here...
    })
  }
}
```

In the `MinistryComponent`, we have imported the `ActivatedRoute` that is used to resolve the activated routes only. We subscribe to this resolved route and only display the template when we have the ministries' data.

### Conclusion
In this tutorial, we have seen how Angular route resolvers are implemented. We have seen its advantages and why we tend to avoid accessing API calls directly from the component.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

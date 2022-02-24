---
layout: engineering-education
status: publish
published: true
url: /angular-11-routing/
title: Getting Started with Angular 11 Routing 
description: This tutorial will go over the process of creating Angular application using Routers. We will learn the basics of Router outlets, navigations, routes, and paths to generate a complete Angular Single Page Application (SPA).
author: owino-wendy
date: 2021-06-03T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/angular-11-routing/hero.jpg
    alt: Getting Started with Angular 11 routing 
---
Web applications nowadays are user-friendly and convenient to use. If you are here, you probably may have heard of Single Page Applications ([SPA](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58)). These are applications that work inside browsers and do not require page refresh during navigations. Normally, these pages are loaded once while their contents are dynamically added. 
<!--more-->

### Introduction
An example of a SPA is [Section](https://www.section.io/engineering-education/), indicated by forwarding slashes followed by navigation content. For example, all articles on this platform are located on `https://www.section.io/engineering-education/`.

This tutorial will walk you through the process of creating your Angular application using Routers. We'll learn the basics of Router outlets, navigations, routes, and paths to generate a complete Angular Single Page Application (SPA).  

> For you to be able to follow this tutorial along, it'll be a necessity to have basic knowledge of Angular.

### Getting started with Angular router
Angular Router is a core part of Angular that aids in building a single-page application. It's located in the `@angular/router package`.  

It has a complete routing library for constructing multiple route outlets. It also supports several features such as [lazy loading](https://angular.io/guide/lazy-loading-ngmodules) and routing guards for access control et cetera.

### Routes and paths
Routes are objects. At the lowest level, they comprise Angular components and paths, and sometimes `redirectTo`. This provides more details about a specific route plus a component to load on navigation. Paths are part URLs that are used to locate a resource.  

An example of a route:

```ts
----------------------------
{ 
  path:  '',
  component:  myDashboardComponent,
},
{ 
  path:  'myPath',
  component:  MyPathComponent
}
------------------------------

```

You'll notice that these routes contain at least a path associated with its component.

### The Angular router-outlet
Router-Outlet is an Angular directive from the router library that is used to insert the component matched by routes to be displayed on the screen.

It's exported by the `RouterModule` and added to the template as shown below:  

```html
<router-outlet></router-outlet>

```

### Angular route guards
In our web applications, there are resources that we usually restrict their access to authenticated users only. This feature is made possible by Angular using the route guards.

Let's look at an example:

```ts
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private router: Router, private authService: AuthService) {  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const user = this.authService.user;
    if (user)
    {
      // user authentication successful
      return true;
    }
    // authentication failed, redirect user to login page
    this.router.navigate(['/login']);
    return false;
  }
}

```

In this authentication guard script, we implemented the `CanActivate` while overriding the `canActivate()` method returning a boolean.

If it returns, and access is allowed to the component, otherwise the user is redirected to the login page.  

### Navigation directives
Normally, we create navigation links in HTML using the `<a href='#'>link</a>` tags. In an Angular application, `href` in the `<a>` tag is replaced with the `routerLink` as shown below:

```html
<a routerLink="'/testLink'">my Angular Link</a> //
<a routerLinkActive="'/testLink'">my Angular Link</a> // for active links
```

### Routing in action
Now that we have got the basics of Angular routing, let's create a single application page.  

#### Step 1: Generate a new Angular project
In this step, let's create a simple Angular application, 'routing-example' by running the following command on the terminal:    

```bash
ng new routing-example

```

This prompts you to answer `Yes/No` questions as shown below:

```bash
// while creating a new angular project, these sets of questions are displayed.
---------------------
    ? Do you want to enforce stricter type checking and stricter bundle budgets in t
    he workspace?
      This setting helps improve maintainability and catch bugs ahead of time.
      For more information, see https://angular.io/strict No
    ? Would you like to add Angular routing? Yes
    ? Which stylesheet format would you like to use? (Use arrow keys)
    ❯ CSS 
      SCSS   [ https://sass-lang.com/documentation/syntax#scss                ] 
      Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
      Less   [ http://lesscss.org                                             ] 
      Stylus [ https://stylus-lang.com  
----------------------
```

Enter `Yes` for the Angular routing option to generate the routing module for our application.  

### Generate components
Since we're going to define routes using components, let's generate these components by running the following commands:

```bash
cd routing-example
ng g component my-dashboard && ng g component student

```

Now, let's navigate to the `app.routing-module.ts` and update the routes as shown below:

```ts
// app.routing-module.ts has the following contents

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyDashboardCompoent,
  },
  {
    path: 'students',
    component: studentComponent,
  },
  
];

@NgModule({

  imports: [
      RouterModule.forRoot(routes)
  ],
  
  exports: [
      RouterModule
  ],
})
export class AppRoutingModule { }

```

This line,` import { Routes, RouterModule } from '@angular/router';` imports the Routes and RouterModule from the router package.
We then declare the routes constant of type Routes, which we imported earlier. We've defined the paths with their respective components.  

In the @NgModule(), we import the `RouterModule` and pass it the routes we defined via the `RouterModule.forRoot(routes)` method.
We then make this `RouterModule` accessible by other modules by exporting it.  

### Setting up router outlet
Now that we've defined our application routes, let's now add the Router-Outlet to our main application template, `app.component.html` as seen below:  

```html
<h4>My First Single page application</h4>
<router-outlet></router-outlet>

```

Next, import the `app. routing-module` in the `app. module`.

```ts
--------------------------------------
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './app.component';
import { MyDashboardComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    StudentComponent
  ],
  imports: [
    ---------------
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

You've reached this far? Congratulations, now let's serve our application:  

```bash
cd routing-example
ng serve
```

This will start your application on port `4200` by default or the immediate port if `4200` is in use. You can now navigate to this route and test your routes.  

### Conclusion
In this tutorial, we've discussed the powerful Angular routing tool. We discussed how we can define routes and build a complete single-page application. 

We've discussed other Angular routing concepts such as router outlets, paths, and routes. We also introduced the concept of Angular routing guards, by looking at an example of user authentication.

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

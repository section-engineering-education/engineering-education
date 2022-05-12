---
layout: engineering-education
status: publish
published: true
url: /lazy-loading-angular-12/
title: How to Lazy Load Components in Angular 12
description: This tutorial introduces reader to the basic concepts of lazy loading Angular components. We will learn how we can use this concept to only load components whose routes have been activated by the user.
author: jared-phelix
date: 2021-11-18T00:00:00-19:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/lazy-loading-angular-12/hero.png
    alt: Lazy loading in angular
---
Building large applications has a significant impact on the application route loading time. As the application grows, its performance on the browser reduces significantly and lowers user experience.
<!--more-->
In this tutorial, I'll walk you through the concepts of lazy loading in Angular and how it can improve the application loading time on the browser.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What's lazy loading?](#whats-lazy-loading)
- [Setting up the project](#setting-up-the-project)
- [Setting up shared components](#setting-up-shared-components)
- [Setting up lazy routes](#setting-up-lazy-routes)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial along, you need the following;
- Have Angular CLI locally installed.
- Some basic knowledge of Angular2+.
- Basic knowledge of JavaScript/TypeScript.

### Objectives
This tutorial aims to teach you everything you need to know about lazy loading, a concept that will change how you approach your coding techniques for extensive applications in Angular.

### What is lazy loading?
Lazy loading is a technique used in programming to improve the performance of applications, especially web pages, and reduce their load time. It causes pages to load much faster initially, and the additional files are downloaded when needed by the user.

It's an asynchronous way of loading components in an Angular application. The needed components are loaded to the browser, while those whose routes have not been visited remain unloaded.

The most important reason lazy loading is used is to improve the application's general loading time. Therefore, it's essential for use in large applications such as e-commerce applications with extensive listings of products.

It's also vital that components are loaded once, so when a user visits a specific lazy loaded route, the component will be readily available when a user visits next time, hence the concept of Single Page Application (SPA).

### Setting up the project
Now that we have gotten a better idea of why we need to lazy load our applications, we can now proceed and set up our project by running the following commands:

```bash
ng new lazyLoadingExample
```

The command above, `ng new lazyLoadingExample` installs our Angular application. It's important to remember that these commands are only made available for use when you have installed the Angular CLI (globally/to a specific directory).

Now that our application is ready let's move forward and set up our government project with different departments.

Our project will have three modules, the `AuthModule`, `GovernmentModule`, and the `GovernmentFormsModule`. The main objective is to load these three modules at different times depending on the route activated by the user.

Let's set up our three modules by running the following commands:

```bash
 cd lazyLoadingExample
 ng g module auth --routing
 ng g module government --routing
 ng g module government-forms --routing
```

The commands above set up three previously discussed modules, each with a routing module to set up our routes.

Next, add two components to the `auth` directory as shown below:
```bash
ng g c auth/register
ng g c auth/login
```

When the above commands are executed, `RegisterComponent` and `LoginComponent` components are added to the `AuthModule`.

Let's follow the above steps and add components for the government modules as shown below:
```bash
# add ministries and governor office components
ng g c government/ministry
ng g c government/governor
```

```bash
#add forms to book and contact government officials
ng g c governor-forms/contact-official
ng g c governor-forms/book-appointment
```

### Setting up shared components
In the previous section, we set up our project components and modules. We also added the routing modules, which we will edit to help us implement lazy loading.

In this section, we build a reusable component layout to help us share the standard features of the application.

In most cases, you'll need to set up these routes within a given layout. For example, login/register forms may only have inputs without the navbar or footer, unlike the other components.

Let's proceed and setup two layout components within a `shared` module as shown below:

First, create a shared module within the `app` directory:
```bash
ng g module shared
```

Next, run the following commands to add layout components:
```bash
ng g c shared/main-layout
ng g c shared/auth-layout
```

Now that we have our layout module and components, edit the main layout component as shown below:
```html
<!--/app/shared/MainLayoutComponent  -->
<div class="top-row">
  <div class="top-bar-content">
    <div class="row">
      <!--col-1--->
      <div class="col-md-4">
        <div class="logo-top">
          <a class="text-decoration-none" [routerLink]="['/']">
          <img src="assets/images/top-logo.png" alt=""></a>
        </div>
      </div>
      <!--col-2--->
      <div class="col-md-4">
        <div class="social-top text-center"> <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <!--col-3--->

      <div class="col-md-4 text-right">
        <div class="top-right-bar text-end">
          <a *ngIf="currentUser!=null" class="btntop">Logged in as {{currentUser.name}}</a>
          <a *ngIf="!currentUser" class="btntop " [routerLink]="['/auth/login']">Sign In</a>
          <a *ngIf="!currentUser" class="btntop" [routerLink]="['/auth/registe']">Register</a>
          <button *ngIf="currentUser!=null" class="btntop btn btn-link" (click)="logout()">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="middle-header">
  <div class="top-bar-content">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 text-center">
        <div class="logo">
          <a class="" routerLink="/"><img src="assets/images/update-logo.png" width="250" height="56" alt="logo"></a>
        </div>
      </div>
      <div class="col-md-4 text-right">
        <div class="text-end bar-middle-right">
          <ul>
            <li><a href="#"><i class="far fa-bell"></i></a>
            </li>
            <li><a href="#"><i class="fas fa-search"></i></a>
            </li>
            <li><a class="toggle-bar" id="topbarToggle" href="#"><img src="assets/images/menu-icon.png" alt=""></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="marquee">
  <marquee class="text-white p-2 font-weight-bolder">
   some texts goes here....
  </marquee>
</div>

<router-outlet></router-outlet>

<footer>
  <div class="footer-contents">
    <div class="row">
      <div class="col-md-2 content footer-logos">
        <a class="btn btn-link" [routerLink]="['/']">
          <img class="logos" src="assets/images/new-logo.png" alt="logo">
          <img class="social" src="assets/images/logo-underline.png" alt="logo">
        </a>
        <div class="social-media-links">
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item bg-transparent border-0"><img src="assets/images/facebook.png" alt="fb"> </li>
            <li class="list-group-item bg-transparent border-0"><img src="assets/images/twitter.png" alt="fb"> </li>
            <li class="list-group-item bg-transparent border-0"><img src="assets/images/instagram.png" alt="fb"> </li>
          </ul>
        </div>
      </div>
      <div class="col-md-5 content">
        <h3 class="footer-link quick-links text-center">Quick Links</h3>
        <div class="row">
          <div class="col-md-6">
            <ul class="list-unstyled"></ul>
              <li class="list-item"><a [routerLink]="['Link']" class="text-decoration-none">Link2</a></li>
              <li class="list-item"><a [routerLink]="['/Link']" class="text-decoration-none">Link2</a></li>
              <li class="list-item"><a [routerLink]="['Link']" class="text-decoration-none">Link2</a></li>
              <li class="list-item"><a [routerLink]="['Link']" class="text-decoration-none">Link2</a></li>
              <li class="list-item"><a [routerLink]="['Link']" class="text-decoration-none">Link2</a></li>
            </ul>
          </div>
        </div>
      </div>
    
      <div class="col-md-2 content">
        <h3 class="footer-link contact-us">Contact Us</h3>
        <div class="contact-us-lists">
          <h4 class="call-us">Call Now</h4>
          <ul class="list-unstyled">
            <li class="list-item"><a class="text-decoration-none">+284xxxx</a></li>
            <li class="list-item"><a class="text-decoration-none">+264xxxx</a></li>
          </ul>
          <h4 class="call-us">Email Address</h4>
          <ul class="list-unstyled">
            <li class="list-item"><a class="text-decoration-none">info@test.com</a></li>
            <li class="list-item"><a class="text-decoration-none">test@test.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="divider text-center">
      <hr/>
    </div>
    <div class="row footer-contents-bottom">
      <div class="col-md-6 copyright">
        <h3>COPYRIGHT 2021, ALL RIGHTS RESERVED</h3>
      </div>
      <div class="col-md-6 banner">
        <h3>Some footer</h3>
      </div>
    </div>
  </div>
</footer>

```

The template above has 3 main parts, the header, main body and the footer. The header section has the authentication logic which checks if the current visiting user is authenticated or not.

```bash
<a *ngIf="currentUser!=null" class="btntop">Logged in as {{currentUser.name}}</a>
```

The condition above checks if the `currentUser` object is null or has a value. It's important to note that this `currentUser` object is stored in the browser's local storage.

We then have the sign out button which is only made visible to the visiting user only if they are already authenticated as shown in the following conditions:  

```bash
<button *ngIf="currentUser!=null" class="btntop btn btn-link" (click)="logout()">Sign Out</button>
```

Next after the header we have the `<router-outlet></router-outlet>` element. The `router-outlet` is a directive that's available from the @angular/router package and is used by the router to mark wherein a template, a matched component should be inserted.

We've only defined basic information about our application on the footer, which you customize to meet your requirements.

Next, define your auth layout following the concepts above!

### Setting up lazy routes
Now that we have layouts, let's proceed and set up the authentication routes as shown below (this section assumes you set up the auth layout in the previous area).

```ts
...
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  }
];

@NgModule({
  ...
})
export class AuthRoutingModule{ }

```

The module above setup has two routes, `register` and `login`, each with their respective components. These routes are defined as children of the `AuthLayoutComponent` component we had created earlier. 

Next, import this `AuthRoutingModule` module into the main module as shown below:

```ts
...
const routes: Routes = [
  
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(mod=>mod.AuthModule)
  },
];

@NgModule({
  ...
})
...

```

The above module defines the path, in this case, `auth`, and now instead of setting up the component, we load the `AuthModule`, which already has the components.

Resultant full paths for authentications are:
```bash
/auth/register
/auth/login
```

You'll notice that the path combines the main route `auth` and that of the children components `register` and `login`. 

The concepts remain the same, and you can follow the above procedure to set up other lazy loading routes for the `government` and the `government forms`.

### Conclusion
In this tutorial, we've discussed the concept of Angular lazy loading. You've seen how we can use this concept to only load components whose routes have been activated by the user.

Components must not be referenced anywhere else except its routing module. Therefore, we need to remove the component's reference from the `app-module.ts` file; otherwise, it will be eagerly loaded. All child routes must be stacked together and have the same route prefix.

Lazy loading is a great way to make your SPA lean and mean faster load times with a few minor changes. These enhance the user experience, and will make all the difference for your end-users!

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

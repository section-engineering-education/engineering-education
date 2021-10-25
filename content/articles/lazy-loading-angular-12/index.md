### Introduction

Building large applications have a significant impact on the total loading time. Moreover, as the application grows, its performance on the browser reduces significantly hence low user experience.

In this tutorial, I'll walk you through the concepts of lazy loading in Angular and how it can improve the application loading time on the browser.

### Table of contents

- [Introduction](#introduction)
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

- Angular CLI is locally installed.
- Basic knowledge of Angular2+
- Basic knowledge in JavaScript/TypeScript

### Objectives

This tutorial aims to teach you everything you need to know about lazy loading, a concept that will change the way you approach your coding techniques for large applications in Angular.

### What's lazy loading?

Lazy loading is a concept in Angular that helps load a component when its route is activated. For example, a `RegisterComponent` would be loaded when the `register` route is visited, while other components are not loaded.  

It's an asynchronous way of loading components in an Angular application. The needed components are loaded to the browser, while the components whose routes have not been visited remain unloaded.

The most crucial reason why lazy loading is in use is to improve the application general loading time. Therefore, it's essential for use in large applications such as e-commerce applications with extensive listings of products.

> It's also vital that components are loaded once, so when a user visits a specific lazy loaded route, the component will be readily available when user visits next time, hence the concept of Single Page Application (SPA)

### Setting up the project

Let's begin by installing our application by running the following commands:

```bash
ng new lazyLoadingExample
```

Now that we've our application ready let's move forward and set up our government project with different departments.

Our project will have three modules, the `AuthModule`, `GovernmentModule` and the `GovernmentFormsModule`.
Our main objective is to load these three modules at different times depending on the route activated by the user.

Let's set up our three modules by running the following commands:
```bash
 cd lazyLoadingExample
 
 ng g module auth --routing
 ng g module government --routing
 ng g module government-forms --routing
```

The above commands set up three previously discussed modules, each with a routing module where we set up our routes.

Next, add two components to the auth directory as shown below:

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

In most cases, you'll need to set up these routes within a given layout. For example, login/register forms may only have inputs without the navbar or footer, unlike the other components.

Let's, therefore, setup two layout components within a `shared` module as shown below:

```bash
ng g module shared
```

```bash
ng g c shared/main-layout
ng g c shared/auth-layout
```

The commands above create a module for sharing components, main layout and authentication layout.

Let's edit our main layout component as shown below:

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
        <h3>COPYRIGHT 2021 ALL RIGHT RESERVED</h3>
      </div>
      <div class="col-md-6 banner">
        <h3>Some footer</h3>
      </div>
    </div>
  </div>
</footer>

```

We've defined our layout (you may use your layout); otherwise, style the above template with Boostrap/CSS. Our layout has one important element, <router-outlet></router-outlet>`. This is where our components that will use this component will be rendered. You notice that the component will have to be sandwiched in between the header and footer.

>Next, define your auth layout following the above concepts!

### Setting up lazy routes

Now that we've layouts let's proceed and set up the authentication routes as shown below(This section assumes you set up the auth layout in the previous section).


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

The above module setup has two routes, `register` and `login`, each with their respective components. These routes are defined as children of the `AuthLayoutComponent` component we had created earlier. 

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

The above module defines the path, in this case, `auth`, and now instead of setting up the component, we instead load the `AuthModule`, which already have the components.

Now our routes for authentications are:

```bash
/auth/register
/auth/login
```

You notice that the path combines the main route `auth` and that of the children components `register` and `login`. 

The concepts remain the same, and you can follow the above procedure to set up other lazy loading routes for the `government` and the `government forms.


### Conclusion
In this tutorial, we've discussed the concept of Angular lazy loading. You've seen how we can use this concept to only load components whose routes have been activated by the user.

---
layout: engineering-education
status: publish
published: true
url: /how-to-split-a-monolithic-architecture-into-micro-frontends/
title: Splitting a Monolithic Architecture into Micro-Frontends
description: This article introduces the reader to micro-frontend applications and their advantages compared to monolithic ones. It also demonstrates how micro-frontends works.
author: ephraim-njoroge
date: 2022-03-02T00:00:00-04:21
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-split-a-monolithic-architecture-into-micro-frontends/hero.jpg
    alt: Splitting a Monolithic Architecture Micro-frontends example Image
---
A good application development strategy should ensure that the development time and effort are significantly reduced while keeping the complexity of the application minimal.
<!--more-->
### Introduction
In the real world, applications tend to grow in size, meaning more effort is required as the application complexity increases. Therefore, a well-developed application should be responsive and highly scalable.

In [monolithic architecture](https://www.mulesoft.com/resources/api/microservices-vs-monolithic), applications have huge components and complex logic. Therefore, maintaining or upgrading such applications is challenging. Moreover, integrating a new team can be a difficult task.

A better solution would be breaking down a vast application into smaller independent applications known as [micro-frontends.](https://single-spa.js.org/docs/microfrontends-concept/)

Micro-frontends are easier to manage, scale and assign to separate teams. This article introduces the reader to micro-frontends and their advantages compared to monolithic applications. We will use a demo application to illustrate how micro-frontends works.

### Prerequisites
- [NPM](https://docs.npmjs.com/cli/v8/commands/npm-install) packages installed.
- [Angular CLI](https://angular.io/cli/) installed.
- A code editor installed, preferably [VS Code](https://code.visualstudio.com/download).
- A web browser installed, preferably [Google Chrome](https://www.google.com/chrome/).
- A good understanding of [Angular.js](https://docs.angularjs.org/tutorial) and [NPM](https://docs.npmjs.com/cli/v6/commands/npm) commands.

### Understanding Monolith architecture and Micro-frontend architecture
Monolith architecture refers to a huge code block containing several modules bundled into a single application.

The modules in a monolith application are tightly coupled, meaning that the application logic and the business logic are bundled and deployed as a single unit.

A monolith application is built on a unified code. It contains three tiers of software architectures; the user interface, the database, and the server-side application.

Developing a monolithic application is challenging as it piles pressure on the developers. It takes longer to develop since the architecture does not support independent development. In addition, it is challenging to use different programming languages on the same application.

Micro-frontend is a design approach where an application is split into multiple frontend applications. As a result, independent developers can work on each application. This approach significantly reduces the development time and process.

In addition, multiple development teams can work on the same frontend code independently. As a result, the code in micro-frontend applications is more maintainable, manageable, and independent.

It is important to note that code updates can be performed incrementally in the micro-frontend design. Nevertheless, improvements can be made on specific modules without breaking the entire application codebase.

### Features of Micro-frontends
- Each frontend in the micro-frontend application is designed to solve a specific problem or provide a unique feature.
- Independent team members are assigned to implement a frontend in an application.
- The frontends cannot share the logic since they are independent of each other.
- A given team can manage a given frontend.

### Advantages of micro-frontends
- **Applications are small** - In micro-frontends, an extensive application is split into small sections, pages, or even features. This makes the entire application small hence it would not take more storage space and memory.

- **Independent** - Since the applications are split and developed by different teams, the teams can work independently. In addition, if one application module is not working, it does not affect the entire application.

- **Easy to develop and deploy** - The applications that have been distributed over a team are easy to develop as the independent team members works on their part. They are also deployed independently with ease compared to a huge application.

- **Easy to test** - Large application requires a lot of unit testing before deployment, thereby increasing deployment time. However, unlike huge applications, unit testing is done independently in the micro-frontend since each application requires fewer unit tests making deployment much faster.

- **Less development time** - As mentioned earlier, micro-frontends require less development time than large applications as the separate teams work on their application independently instead of one team working on the application.

- **Easy CI/CD** - The application can be integrated and deployed independently hence making the CI/CD easier. Suppose a part of the application develops a bug or an update is required. In that case, it is easy to fix and perform repairs on the specific part of the application without interfering with the entire application.

- **Independent stacks and versions** - An application can have different versions of the same stack. This means that some teams can develop and test newer versions of the same stack in an application.

- **No shared code** - Large applications share the code to use the same functionality of some features. However, this comes at a cost in case of a bug that can entirely bring the application down. Also, the interdependencies between the modules can bring more problems as the application grows huge. This cannot happen in the micro-frontends as this architecture does not share code.

### Application overview
We will start with a monolith application in our demo application and break it down into smaller micro-frontends. The monolith application might not be huge as we only do this for demonstration purposes.

Next, we will design an administrator dashboard of an application and break it down into independent applications.

Most administrator dashboard contains many components with overly complex logic that has been built using monolithic architecture. Therefore, it is not easy to scale and maintain such an application.

Our demo application development will follow the below stages:
- Creating the workspace where all the application components will be contained.
- Creating a component wrapper that assists in navigating the independent pieces and hosting.
- Creating the micro-frontends from the monolith application.

### Implementating our demo application
We will start by creating an application workspace that will contain all the components using `Angular.js`.

```bash
ng n administrator-page –-create-application="false"
```

Next, we will create the host application that will act as our `administrator-page` wrapper by executing the commands  below in the terminal window:

```bash
cd administrator-page
ng generate application administrator --routing 
```

Then, we will add a `landing page` component to the `administrator`, which is our host application.

```bash
ng generate c landingpage --project=administrator
```

Next, we will create a micro-frontend application and name it `forum page`.

```bash
ng generate application forumpage --routing
```

Then, we will add a module inside our application that will be lazy-loaded to the host component and create a component for displaying the demo content and name it as `comments`.

```bash
ng generate module comments --routing --project=forumpage
ng generate c comments --project=forumpage
```

Next, we will create the routing in our new application by editing the file `administrator-page/projects/forumpage/src/app/app-routing.module.ts`.

```JavaScript
const routes: Routes = [
  {
    path: 'forumpage',
    loadChildren: () => import('./comments/comments.module').then((c) => c.CommentsModule)
  }
];
```

Then, we will edit the file `administrator-page/projects/forumpage/src/app/comments/comments-routing.module.ts` as below:

```JavaScript
import {CommentsComponent} from "./comments.component";

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent
  }
];
```

Next, we will proceed and edit the file `administrator-page/projects/forumpage/src/app/comments/comments.component.html` to create an HTML component as below:

```html
<div class=”content”>
    <div>Comments Section</div>
</div>
```

Then, we will edit the `css` file as below:

```css
.content {
    background-color: #038ace0f;
    width: 98%;
    display: flex;
    height: 98%;
    justify-content: center;
    border: 2px dotted rgb(0, 255, 234);
    align-items: center;
    color: rgb(48, 56, 2);
    font-weight: bold;
    font-size: 45px;
}
```

We will integrate our host application with the micro-frontends that we have created. We need the [module federation](https://webpack.js.org/concepts/module-federation/) plug-in installed to achieve this.

The plug-in assists in loading micro-frontend applications into another application. To install the plug-in in both of our applications, we will execute the commands below:

```bash
ng add @angular-architects/module-federation --project administrator --port 3000
ng add @angular-architects/module-federation --project forumpage --port 4000
```

After the plug-in has been installed successfully, The two applications will be running on different ports as specified in the above commands.

We can note that the `administrator` and `forumpage` configuration file called `webpack.config.js` has been added to the two components.

We need to modify that file for our application to work as expected. In the micro-frontend application, uncomment the  line  below and update the code as follows:

```JavaScript
name: "forum page",
filename: "forum.js",
exposes: {
    './CommentsModule': './projects/forumpage/src/app/comments/comments.module.ts',
},
```

We will perform the same modifications to the host application as below:

```JavaScript
remotes: {
    "forumpage": "http://localhost:4000/forum.js"
},
```

Then, we will need to update our `package.json` file by adding the content:

```json
"resolutions": {
   "webpack": "^5.4.0",
   "license-webpack-plugin": "2.3.17"
},
```

Next, we can set up the routing inside the dashboard component to load our independent applications.

In addition, we will also add more content to our HTML templates and add the `css` for styling the dashboard.

Finally, we will edit the file `administrator-page/projects/administrator/src/app/app.component.html` as below:

```html
<div class="main-wrap">
  <div class="nav-wrap">
    <a routerLink="/"> Landing Page</a>
    <a routerLink="/forumpage"> Forum Page</a>
  </div>
  <div class="microfrontend">
    <router-outlet></router-outlet>
  </div>
</div>
```

Then, we will modify the file `administrator-page/projects/administrator/src/app/app-routing.module.ts` as below:

```JavaScript
import {LandingpageComponent} from "./landingpage/landingpage.component";

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
    pathMatch: 'full'
  },
  {
    path: 'forumpage',
    loadChildren: () =>
      import('forumpage/CommentsModule').then((c) => {
        return c.CommentsModule;
      })
  },
];
```

An error will pop up upon running the application because the dashboard has no information about the `Comments Module`. However, we can solve the error by declaring the module.

To achieve this, we will create a file in the root directory of the application and name it `type.ts`, where we will declare the module as below:

```JavaScript
declare module 'forum page/CommentsModule';
```

Inside the directory `administrator-page/projects/administrator/src/app/` we will edit the `css` file `app.component.scss` to style our components as below:

```css
.main-wrap {
  display: flex;
  width: 95%;
  justify-content: flex-end;
  height: 95%;
  align-items: center;

  @media screen and (max-height: 500px) {
    .nav-wrap a {font-size: 19px;}
    .nav-wrap {padding-top: 16px;}
  }  

  .microfrontend {
    height: 90vh;
    width: 80%;
    padding: 15px;
  }

  .nav-wrap {
    position: fixed;
    height: 100%;
    width: 15%;
    top: 0;
    z-index: 1;
    left: 0;
    overflow-x: hidden;
    background-color: #cc2900;
    padding-top: 15px;
  }

  .nav-wrap a {
    text-decoration: none;
    padding: 5px 7px 5px 15px;
    font-size: 25px;
    display: block;
    color: #fceb00;
    margin-top: 15px;
  }

  .main {
    padding: 1px 15px;
    margin-left: 165px;
  }

  .nav-wrap a:hover {
    color: #00f752;
  }
}
```

Then, we will update the file `administrator/src/app/landingpage/landingpage.component.html` as below:

```html
<div class="content">
    <div>The Landing Page Information</div>
</div>
```

Next, we will update the `css` file `administrator/src/app/landingPage/landingpage.component.scss` as below:

```css
.content {
  background-color: #0357810f;
  width: 98%;
  display: flex;
  height: 98%;
  justify-content: center;
  border: 2px dotted rgb(0, 255, 42);
  align-items: center;
  color: rgb(6, 0, 31);
  font-weight: bold;
  font-size: 45px;
}
```

We will finally run the application by executing the commands below in the terminal. Note that we have to run both `administrator` and `forum page` components as below:

```bash
ng serve administrator
ng serve forum page
```

We will have the `landingpage` component, part of the `administrator` loaded upon running the two commands. Then there will be the link to the `Forum Page`, which, when clicked, a micro-frontend `forumPage` will be loaded as shown below:

![The Landing Page](/engineering-education/how-to-split-a-monolithic-architecture-into-micro-frontends/landing-page.png)

![The Landing Page](/engineering-education/how-to-split-a-monolithic-architecture-into-micro-frontends/forum-page.png)

### Conclusion
We have created an application that hosts another separate independent application using Angular. The application is simple as most of its parts contain templates but has provided insightful information on developing large applications using micro-frontends.

The code used in this tutorial can be accessed at my [GitHub Repo](https://github.com/ephnjor2021/administrator-page).

### Further reading
- [Comparing Monolithic Architecture with Micro-Frontends](https://www.luxoft.com/blog/lcameroon/answering-single-page-application-challenges-with-micro-front-end-architecture)
- [Overview of Module Federation in Micro-Frontends](https://medium.com/tenable-techblog/introducing-module-federation-c95e2551a5b9).

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

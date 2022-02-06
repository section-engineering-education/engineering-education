### Introduction
In developing applications, time, effort, and complexity are highly considered. A good application development strategy should ensure that the development time is greatly reduced and less effort is involved while keeping the complexity of the application minimal.

However, in the real world, applications tend to grow in size; hence more effort is required, and the complexity of the application increases. A well-developed application should be responsive and highly scalable. Unlike [monolithic architecture](https://www.mulesoft.com/resources/api/microservices-vs-monolithic), applications have huge components and complex logic. Maintaining or upgrading such huge applications is challenging, and also integrating a new team can be a difficult task.

A better solution would be breaking down a huge application into smaller independent applications known as [micro-frontends](https://single-spa.js.org/docs/microfrontends-concept/). They are easier to manage, scale, and be assigned to separate teams. This guide draws its attention to micro-frontends and the advantages they offer compared to monolithic applications. We will also use a demo application to illustrate how micro-frontends works.

### Prerequisites
- [Npm](https://docs.npmjs.com/cli/v8/commands/npm-install) packages installed.
- [Angular CLI](https://angular.io/cli/) installed.
- A code editor installed, preferably [VS Code](https://code.visualstudio.com/download).
- A web browser installed, preferably [Google Chrome](https://www.google.com/chrome/).
- A good understanding of [Angular.js](https://docs.angularjs.org/tutorial) and [npm](https://docs.npmjs.com/cli/v6/commands/npm) commands.

### Understanding monolith architecture and micro-frontend architecture
Monoliths refer to a huge block of codes containing several modules bundled into one huge application. The modules in a monolith application are tightly coupled with each other. This meant that the application logic and the business login were combined and deployed as a single unit. A monolith application is built on a unified code. They contain three tiers of software architectures: the user interface, the database, and the server-side application. The monolithic applications are challenging to develop as they pile pressure on the developers. The development time is huge enough since the architecture does not support independent development. In addition, it is challenging to use different programming languages on the same application as the monoliths do not support it. In the worst case, if the code breaks, the whole application crumbles.

Micro-frontend is a design approach where a given application is split into multiple frontend applications. The independent developers can work on each coding task, significantly reducing the development time and process. Multiple development teams can work on the same frontend code but independently. The code in micro-frontend applications is more maintainable, manageable, and independent. The application's code updates can be performed incrementally. Also, improvements can be made on given modules without breaking the entire application codebase.

### Features of micro-frontends
- Each frontend in the micro-frontend application is designed to solve a specific problem or provide a unique feature.
- Independent team members are assigned to implement a frontend in an application.
- The frontends cannot share the logic since they are independent of each other.
- A given assigned team can manage a given frontend.

### Advantages of micro-frontends
- **Applications are small** - In micro-frontends, a large application is split into small sections, pages, or even features. This makes the entire application small hence it would not take more storage space and memory.
- **Independent** - The applications are split and developed by different teams; hence the teams' meanings are independent. Even if one part is not working, it does not affect the entire application.
- **Easy to understand** – Applications developed by a single developer are hard to understand since they tend to be huge and more complicated than the micro frontends distributed over multiple teams. This is because they tend to be smaller units of large applications which are more readable hence easy to understand.
- **Easy to develop and deploy** - The applications that have been distributed on a team are easy to develop as the independent team works on its team. They are also deployed independently with ease compared to a huge application.
- **Easy to test** - Large application requires a lot of unit testing before deployment, thereby increasing deployment time. Unlike huge applications, unit testing is done independently in the micro-frontend since each application requires fewer unit tests, and therefore deployment is much faster.
- **Less development time** - as mentioned earlier, micro-frontends require less development time than large applications as the separate teams work on their application independently compared to one team working on the application.
- **Easy CI/CD** - The application can be integrated and deployed independently hence making the CI/CD easier. Suppose a part of the application develops a bug or an update is required. In that case, it is easy to fix and perform on the specific part of the application without interfering with the entire application.
- **Independent stacks and versions** - An application can have different versions of the same stack. This could mean that some teams can develop and test newer versions of the same stack in an application.
- **No shared code** - Large applications share the code to share the functionality of some of the features. However, this comes at a cost in case of a bug that can entirely bring the application down. Also, the interdependencies between the modules can bring more problems as the application grows big. This cannot happen in the micro-frontends as this architecture does not share code.

### Overview of our demo application
We will start with a monolith application in our demo application and break it down into smaller micro-frontends. The monolith application might not be huge as we only do this for demonstration purposes. We will design an administrator dashboard of an application and break it down into independent applications.

Most administrator dashboard contains a lot of components with overly complex logic that have been built using monolithic architecture. It is not easy to scale and maintain such an application. Also, the integration of the new developers is challenging as they have to spend much time learning and understanding the application.

The solution would be to use the micro-frontends approach that splits the complex application logic into smaller micro-applications that are easy to maintain and analyze their codebases. In addition, the application components can be assigned to the independent development teams therefore making the development and deployment time reduce significantly.

Our demo application development will follow the below stages:
- Creating the workspace where all the application components will be contained.
- Create a component wrapper that assists in navigating the independent pieces and hosting.
- Creating the micro-frontends from the monolith application.

### Implementating our demo application
We will start by creating the application workspace that contains all the components using Angular by executing the below command in the terminal window:

```bash
$ ng n administrator-page –-create-application="false"
```

Next we will create the host application that will act as our `administrator-page` wrapper by executing the below commands in the terminal window:

```bash
$ cd administrator-page
$ ng generate application administrator --routing 
```
Then, we will add a `landingpage` component to the `administrator` which is our host application by executing the below command:

```bash
$ ng generate c landingpage --project=administrator
```

Next, we can create the micro-frontend application and name it `forumpage` by executing the below command:

```bash
$ ng generate application forumpage --routing
```

We then add the module inside our application that will be lazy-loaded to the host component. Next, we will create a component for displaying the demo content and name it as `comments` using the below commands:

```bash
$ ng generate module comments --routing --project=forumpage
$ ng generate c comments --project=forumpage
```

Next, we will create the routing in our new application by editing the file `administrator-page/projects/forumpage/src/app/app-routing.module.ts` as below:

```JavaScript
...
const routes: Routes = [
  {
    path: 'forumpage',
    loadChildren: () => import('./comments/comments.module').then((c) => c.CommentsModule)
  }
];
 ...
```

Then edit the file `administrator-page/projects/forumpage/src/app/comments/comments-routing.module.ts` as below:

```JavaScript
...
import {CommentsComponent} from "./comments.component";

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent
  }
];
 ...
```

We can proceed and edit the file `administrator-page/projects/forumpage/src/app/comments/comments.component.html` to create HTML component as below:

```html
<div class=”content”>
    <div>Comments Section</div>
</div>
```

And the `css` file will be:

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

We will proceed to integrate our host application with the micro-frontends that we have created. To achieve this, we need the [module federation](https://webpack.js.org/concepts/module-federation/) plug-in installed.  The plug-in assists in loading micro-frontend applications into another application. To install the plug-in in both of our applications, we will execute the below commands in the terminal window:

```bash
$ ng add @angular-architects/module-federation --project administrator --port 3000
$ ng add @angular-architects/module-federation --project forumpage --port 4000
```

The two applications will be running on different ports as specified in the above commands after the plug-in has been installed successfully. We can note that the `administrator` and `forumpage` configuration file called `webpack.config.js` has been added to the two components. We will need to modify that file for our application to work as expected.

In the micro-frontend application, we will uncomment the below line and update the code as follows:

```JavaScript
name: "forumpage",
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

Then, we will also need to update our `package.json` file by adding the below content to it:

```json
"resolutions": {
   "webpack": "^5.4.0",
   "license-webpack-plugin": "2.3.17"
},
```

Next we can set up the routing inside the dashboard component in order to load our independent applications. In addition, we will also add more content to our HTML templates and add the css for styling the dashboard. We will edit the file `administrator-page/projects/administrator/src/app/app.component.html` as below:

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

Then we will modify the file `administrator-page/projects/administrator/src/app/app-routing.module.ts` as below:

```JavaScript
 ...
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
 ...
```

An error will pop up upon running the application because the dashboard has no information about the `Comments Module`. We can solve the error by declaring the module. To achieve this, we will create a file in the root directory of the application and name it `type.d.ts`, where we will declare the module as below:

```JavaScript
declare module 'forumpage/CommentsModule';
```

Inside the directory `administrator-page/projects/administrator/src/app/` we will edit the css file `app.component.scss` to style our components as below:

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

Then update the file `administrator/src/app/landingpage/landingpage.component.html` as below:

```html
<div class="content">
    <div>The Landing Page Information</div>
</div>
```

Next update the `css` file `administrator/src/app/landingPage/landingpage.component.scss` as below:

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

We will finally run the application by executing the below commands in the terminal. Note that we have to run both `administrator` and `forumpage` components as below:

```bash
$ ng serve administrator
$ ng serve forumpage
```

Upon running the two commands, we will have the `landingpage` component, which is the part of the `administrator` loaded. Then there will be the link to the `Forum Page`, which, when clicked, a micro-frontend `forumPage` will be loaded as shown below:

![The Landing Page](/engineering-education/how-to-split-a-monolithic-architecture-into-micro-frontends/landing-page.png)

![The Landing Page](/engineering-education/how-to-split-a-monolithic-architecture-into-micro-frontends/forum-page.png)

### Wrapping up
In summary, we have created an application that hosts another separate independent application using Angular. The application is simple as most of its parts contain templates but has provided insightful information on developing large applications using micro-frontends.
The code used in this tutorial can be accessed at my [GitHub Repo](https://github.com/ephnjor2021/administrator-page).

### Further reading
- [Comparing Monolithic Architecture with Micro-Frontends](https://www.luxoft.com/blog/lcameroon/answering-single-page-application-challenges-with-micro-front-end-architecture).
- [Overview of Module Federation in Micro-Frontends](https://medium.com/tenable-techblog/introducing-module-federation-c95e2551a5b9).
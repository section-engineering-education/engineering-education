---
layout: engineering-education
status: publish
published: true
url: /heatmap-concepts-in-angular/
title: How To Integrate the Heatmap Charts with Angular 12 or Later
description: In this tutorial we will learn about Heat maps. Heat maps are a type of chart that easily displays data to understand.
author: naomi-seint
date: 2022-03-01T00:00:00-09:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/heatmap-concepts-in-angular/hero.png
    alt: Heatmap Concepts in Angular
---
You may have heard of 2D or 2-dimensional shapes in a geometry class. For example, rectangles, squares and circles are all 2D shapes.
<!--more-->
In addition to these, charts such as bar and line charts also have 2 dimensions. These concepts play an important role while dealing with charts or graphs in programming.

This tutorial will teach you everything you need to know about Heat maps. Heat maps are a type of chart that easily displays data to understand.

### Table of content
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up Angular environment](#setting-up-angular-environment)
- [Adding Heatmap package](#adding-heatmap-package)
- [Heatmap component](#heatmap-component)
- [Configuring the heatMap package component](#configuring-the-heatmap-package-component)
- [Testing the heatmap with actual data](#testing-the-heatmap-with-actual-data)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need the following:
- Basic knowledge of Typescript or JavaScript.
- Basic knowledge of Angular. In this tutorial, we will be using Angular version 12.
- Local development environment is fully set up.

### Objectives
This tutorial introduces you to the concepts of 2 Dimensional charts. By the end, you should be able to build a reactive web application integrated with heatmap.

### Setting up Angular environment
In this tutorial, we will use the Angular CLI; however, you're free to set up the application structure from scratch.

Now, let's begin by installing the Angular CLI by running the following command:
```bash
npm install -g @angular/cli
```

The above command will install the latest version (v12 at the time of this writing) of the Angular CLI globally.

Next, proceed and create a new Angular application by using the CLI command as shown below:
```bash
ng new angular-heatmap-tutorial
cd angular-heatmap-tutorial

# start the server
ng serve

```

In the above command, we created a new Angular application called angular-heatmap-tutorial. Next, we `cd` into the project root and start the server, which runs on port `4200`.

> It's important to note that the default Angular port is 4200. This may be different in your environment if another application is already running there.

### Adding Heatmap package
Heatmap, unlike other packages, have different libraries which you can choose from depending on your needs. 

This includes:
- [Ngx-heatmap](https://www.npmjs.com/package/ngx-heatmap)
- [Angular-calendar-heatmap](https://www.npmjs.com/package/angular-calendar-heatmap)
- [Angular2-calendar-heatmap](https://www.npmjs.com/package/angular2-calendar-heatmap)
- [Syncfusion-heatmap](https://www.npmjs.com/package/syncfusion-heatmap)

The above list is not exhaustive. You can find more information about the package by visiting the package's website.

In this tutorial, we will be using the [Angular Calendar Heatmap](https://openbase.com/js/angular-calendar-heatmap) package.


Proceed and install the package by running the following command:
```bash
npm install @syncfusion/ej2-angular-heatmap --save
```

The above command will install the latest version of the package as shown below:
```json
 "private": true,
  "dependencies": {

    //...
    "@syncfusion/ej2-angular-heatmap": "^19.4.52",
    //....
  },
```

Let's proceed and configure our application to use this package as shown below:

```TypeScript
//...
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
@NgModule({
  declarations: [
    //...
  ],
  imports: [
    //...
    HeatMapModule,
    //...
  ],
  //...
})
export class AppModule { }
```

We imported the HeatMapModule from the `@syncfusion/ej2-angular-heatmap` package in the above script. We then configured our application to use this package by adding it to the `imports` array.

In the next section, we will create an Angular component to display the heatmap.

### Heatmap component
To create a component in Angular, first `cd` into the project root and run the following commands:
```bash
cd angular-heatmap-tutorial

ng g c heatmap
```

The above command will create a new `heatmap` component in the `src/app/heatmap` directory.

Next, proceed and modify the `heatmap.component.html` file as shown below:
```html
<ejs-heatmap id='heatmap-container'></ejs-heatmap>

```

In the above template, we have created a heatmap component. Next, we will use the `ejs-heatmap` component to display the heatmap.

To render our page with Heatmap, let's modify the `heatmap.component.ts` file as shown below:
```typescript
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapComponent implements OnInit {

  constructor() { //...}

  ngOnInit() {
    //...
  }

}

```

We import the encapsulation property from the `@angular/core` package in the above script. We will use this property to disable the default style of the component.

Next, edit the `app.component.html` template as shown below to display the content of the `heatmap.component.html` file:
```html
<app-heatmap></app-heatmap>
```

Now visit your browser and navigate to `http://localhost:4200`. You should see a page like the one shown below:

![Angular Heatmap](/engineering-education/heatmap-concepts-in-angular/heatmap-default-page.png)

### Configuring the heatMap package component
In this section, let's modify our main module to use the default heatmap component from the `@syncfusion/ej2-angular-heatmap` package as shown below:
```typescript
//...
import {HeatMapModule, LegendService} from '@syncfusion/ej2-angular-heatmap';
import { HeatmapComponent as CustomHeatMapComponent } from './heatmap/heatmap.component';
import {HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-angular-heatmap';
@NgModule({
  declarations: [
    AppComponent,
    CustomHeatMapComponent,// Renaming the custom component we created earlier to prevent conflict with shipped package component.
    HeatMapComponent// this component is imported from @syncfusion/ej2-ng-heatmap
  ],
  imports: [
    BrowserModule,
    HeatMapModule,
    AppRoutingModule
  ],
  providers: [HeatMapComponent, LegendService, LegendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

In the above module, we have imported the HeatMapModule from the `@syncfusion/ej2-angular-heatmap` , `HeatMapComponent` from the `@syncfusion/ej2-angular-heatmap` and the `CustomHeatMapComponent` from the `./heatmap/heatmap.component` file.

We then inject the `HeatMapComponent` into the `providers` array. This is required to use the HeatMapComponent in the application.

### Testing the heatmap with actual data
Now that we have completed the application's full configuration let's test the heatmap with actual data.

In the `heatmap.component.ts` file, we will modify the `ngOnInit()` method as shown below:
```typescript
//...
export class HeatmapComponent implements OnInit {

  import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HeatmapComponent implements OnInit {
  constructor() { }

  dataSource: Object[];
  xAxis: any = {
    labels: ['Kim', 'John', 'Doe', 'Frank', 'Derrick', 'Michael', 'Essy',
      'Geofrey', 'Oscar', 'Raul', 'Ben', 'Balo'],
  };
  yAxis: any = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  };

  ngOnInit() {
    this.dataSource = [
      [63, 19, 16, 29, 44, 0],
      [83, 48, 43, 28, 26, 58],
      [89, 18, 12, 3, 66, 80],
      [3, 16, 87, 59, 69, 2],
      [6, 36, 37, 37, 88, 5],
      [31, 45, 63, 13, 3, 69],
      [46, 59, 11, 16, 3, 23],
      [35, 6, 43, 71, 95, 69],
      [50, 67, 64, 58, 88, 41],
      [15, 15, 9, 11, 78, 14],
      [15, 46, 45, 48, 12, 82],
      [64, 23, 78, 13, 86, 79]
    ];
  }

}
}
```

In the script above, we have modified the `ngOnInit()` method to load the data for the heatmap. We have two properties to configure the heatmap. The `xAxis` property is used to configure the x-axis labels. The `yAxis` property is used to configure the y-axis labels.

We then set the `dataSource` property to the actual data. This data should then load in the heatmap on page load as shown below:

![HeatMap Output](/engineering-education/heatmap-concepts-in-angular/heatmap-output.png)

Next, re-configure the `app.module.ts` to remove the heatmap module we had passed since the HeatMap component has its module configured.

### Conclusion
This tutorial has given a foundation for creating a heatmap in Angular. We have seen how we can configure the heatmap with the `HeatMapComponent` and use the `HeatMapComponent` in our application.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

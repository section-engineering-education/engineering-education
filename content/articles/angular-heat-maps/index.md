### Getting started with Angular heatmap

### Introduction
Angular Heatmap refers to the graphical portrayal of data that uses a system of color-coding to represent different values.

Heatmaps are made use of in various forms of analytics yet are most frequently used to show user behavior particularly webpage templates or webpages.

This tutorial will guide you through the steps needed to make a heatmap and exhibit the elementary usage of heatmap control.

### Table of content
- [Getting started with Angular heatmap](#getting-started-with-angular-heatmap)
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up Angular environment](#setting-up-angular-environment)
- [Adding syncfusion Heatmap package](#adding-syncfusion-heatmap-package)
- [Register the heatmap module](#register-the-heatmap-module)
- [Module injection](#module-injection)
- [Fill the heatmap with data](#fill-the-heatmap-with-data)
- [Enabling the axis labels](#enabling-the-axis-labels)
- [Heat map title](#heat-map-title)
- [Enabling legend](#enabling-legend)
- [Addition of the data label](#addition-of-the-data-label)
- [Addition of custom palettes](#addition-of-custom-palettes)
- [Enabling tooltip](#enabling-tooltip)
- [Conclusion](#conclusion)

### Prerequisites
To be guided by this tutorial, you'll need the following;
- Basic knowledge of Node.js.
- Basic knowledge of Typescript and Angular. In this tutorial, we'll be using the Angular CLI 12.
- Local development environment fully setup.

### Objectives
At the end of this tutorial, you will be capable of building a reactive web applications using heat maps concept.

### Setting up Angular environment
Use Angular CLI to set up your Angular applications. Install the Angular CLI by running the following command.

```bash
npm install -g @angular/cli
```

Create a new Angular application by using the  Angular CLI command below.

```bash
ng new my-app
cd my-app

```
### Adding syncfusion Heatmap package
Using the following command install the heatmap package.

```bash

npm install @syncfusion/ej2-angular-heatmap --save

```

### Register the heatmap module
from the syncfusion  Heatmap package ,import the heatmap module into the angular application(app.module.ts).
@syncfusion/ej2-ng-heatmap [src/app/app.module.ts].

```typescript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import the HeatMapModule for the heatmap component
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { AppComponent }  from './app.component';

@NgModule({
  //declaration of ej2-ng-heatmap module into NgModule
  imports:      [ BrowserModule, HeatMapModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```
 Make adjustments to the template in `app.component.ts` to give the `ej2-ng-heatmap  ` element `[src/app/app.component.ts]`.

 ``` typescript

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  // specifies the template string for the Heatmap component
  template: `<ejs-heatmap id='heatmap-container'></ejs-heatmap>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  { }

 ```

 we will use the my-app in the index.html
 ```html
<my-app></my-app>

 ```
Now let's use the `npm run start` command to execute the application in the browser
```
npm start
```
### Module injection
Heatmap elements are divided into single feature-wise modules. To use its characteristics, we will inject its feature module with the `HeatMap.Inject()`
technique. We shall import the aforementioned modules out-of-the heatmap package and introduce them to the heatmap component as shown below.
The tooltip and legend characteristic of the heat map is used to improve the basic heatmap which is used to envision sales revenue information for a week.
```typescript

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeatmapComponent, Legend, Tooltip } from '@syncfusion/ej2-ng-heatmap';

@NgModule({
   imports: [
       BrowserModule,
   ],
   declarations: [AppComponent, HeatMapComponent],
   bootstrap: [AppComponent],
   providers: [ HeatmapComponent, LegendService, TooltipService ]
})
```

### Fill the heatmap with data
This segment illustrates how to populate a two-dimensional array of data to the heatmap as follows;

```typescript

import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
    // Data for heatmap
     dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
}

```

In the above code snippet, we export the HeatMapModule from the @syncfusion/ej2-angular-heatmap package and import it into the @NgModule.

### Enabling the axis labels

we can proceed to add the axis labels to the heat map and set the labels using y and x-axis effects. Axis labels give extra information on the data filled in the heatmap.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
    // Data for heatmap
    dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
    xAxis: Object = {
    labels:['Nancy', 'Jane', 'Janet', 'Margaret', 'Stephanie', 'Mitchel', 'Roberto',
        'Laureen', 'Anne', 'Paula', 'Karim', 'Marion'],
};
yAxis: Object = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
};
}


```
### Heat map title
Include the title  by use of the `titleSettings  ` property to the heat map to give fast information to the user on the data filled in the heat map.

``` typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;"  [titleSettings]='titleSettings' [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
 titleSettings: Object = {
    text: 'Sales Revenue per Employee (in 1000 US$)',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal'
    }
};
    // Data for heatmap
     dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
    xAxis: Object = {
    labels: ['mandy', 'Jane', 'Janet', 'Margy', 'Stephanie', 'Mitchel', 'Roberto',
        'Laureen', 'marrie', 'Paula', 'Karim', 'Marion'],
};
yAxis: Object = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
};
}
```
In the above example, the heat map title is set to “Sales Revenue per Employee (in 1000 US$)”.

### Enabling legend
Apply a legend for the heat map in the `legendSettings` item by setting the `visible` characteristic to true and injecting the `legend` module by use of the `HeatMap.Inject(Legend)` technique.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;"  [titleSettings]='titleSettings' [dataSource]='dataSource'
   [xAxis]='xAxis' [yAxis]='yAxis' [legendSettings]='legendSettings'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
 titleSettings: Object = {
    text: 'Sales Revenue per Employee (in 1000 US$)',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal'
    }
};
    // Data for heatmap
     dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
    xAxis: Object = {
    labels: ['Nancy', 'Jane', 'Janet', 'Margaret', 'Stephanie', 'Mitchel', 'Roberto',
        'Laureen', 'Anne', 'Paula', 'Karim', 'Marion'],
};
yAxis: Object = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
};
public legendSettings: Object = {
    visible:true,
    position: 'Right',
    showLabel:true,
    height:'150px'
};
}
```

### Addition of the data label
Include data labels on the heat map to improve its legibility. This can be accomplished by changing the `showLabel   ` property to` true` in the ` cellSettings ` object.


```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);


```

### Addition of custom palettes
```typecript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;" [paletteSettings]='paletteSettings'
   [cellSettings]='cellSettings' [titleSettings]='titleSettings' [dataSource]='dataSource'
   [xAxis]='xAxis' [yAxis]='yAxis' [legendSettings]='legendSettings'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
 titleSettings: Object = {
    text: 'Sales Revenue per Employee (in 1000 US$)',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal'
    }
};
    // Data for heatmap
     dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
    xAxis: Object = {
    labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
        'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
};
yAxis: Object = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
};
public legendSettings: Object = {
    visible:true,
    position: 'Right',
    showLabel:true,
    height:'150px'
};
public cellSettings: Object = {
    showLabel: true,
    format: '{value} 
};
 public paletteSettings: Object = {
    palette: [{ value: 0, color: '#C06C84' },
    { value: 50, color: '#6C5B7B' },
    { value: 100, color: '#355C7D' },
    ]
};
}
```
In the above code snippet, the heat map is assigned a custom palette to the `paletteSettings` property.

### Enabling tooltip
The tooltip is put to use when you cannot show information due to space limitations. We will enable the tooltip by
setting the `showtooltip` characterestic to true and inserting the tooltip module by use of `HeatMap.Inject(Tooltip) `  method.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap } from '@syncfusion/ej2-heatmap';

@Component({
selector: 'my-app',
template:
   `<ejs-heatmap id='container' style="display:block;" showTooltip='true' [paletteSettings]='paletteSettings'
   [cellSettings]='cellSettings' [titleSettings]='titleSettings' [dataSource]='dataSource'
   [xAxis]='xAxis' [yAxis]='yAxis' [legendSettings]='legendSettings'>
    </ejs-heatmap>`,
encapsulation: ViewEncapsulation.None
})
export class AppComponent{
 titleSettings: Object = {
    text: 'Sales Revenue per Employee (in 1000 US$)',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal'
    }
};
    // Data for heatmap
     dataSource: Object[] = [
       [73, 39, 26, 39, 94, 0],
       [93, 58, 53, 38, 26, 68],
       [99, 28, 22, 4, 66, 90],
       [14, 26, 97, 69, 69, 3],
       [7, 46, 47, 47, 88, 6],
       [41, 55, 73, 23, 3, 79],
       [56, 69, 21, 86, 3, 33],
       [45, 7, 53, 81, 95, 79],
       [60, 77, 74, 68, 88, 51],
       [25, 25, 10, 12, 78, 14],
       [25, 56, 55, 58, 12, 82],
       [74, 33, 88, 23, 86, 59]
    ];
    xAxis: Object = {
    labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
        'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
};
yAxis: Object = {
    labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
};
public legendSettings: Object = {
    visible:true,
    position: 'Right',
    showLabel:true,
    height:'150px'
};
public cellSettings: Object = {
    showLabel: true,
    format: '{value} 
};
 public paletteSettings: Object = {
    palette: [{ value: 0, color: '#C06C84' },
    { value: 50, color: '#6C5B7B' },
    { value: 100, color: '#355C7D' },
    ]
};
}

In the above example, the `showTooltip` property is set to true.

```
### Conclusion
In this tutorial, you have learned how to render a heat map chart in Angular 2.
Additionally, we have seen how we can manipulate it's powerful features to build a very reactive application.

Happy coding!

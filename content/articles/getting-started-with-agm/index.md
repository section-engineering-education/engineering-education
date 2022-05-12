---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-agm/
title: Getting Started With AGM
description: This tutorial will show you how to integrate Google maps in your Angular application by building a sample project.
author: bhanji-brilliant
date: 2021-11-11T00:00:00-13:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-agm/hero.png
    alt: AGM angular maps javascript
---
Maps have become one of the core features of most web applications. For example, a company may want to show its office directly on the site. A ride-hailing service portal may also keep track of all live rides on the map. These are all made possible by map integrations.  
<!--more-->
This tutorial will show you how to integrate Google maps in your Angular application by building a sample project.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with Angular Google Maps (AGM)](#getting-started-with-angular-google-maps-agm)
- [Setting up Angular Google Maps](#setting-up-angular-google-maps)
- [Building a sample application with AGM](#building-a-sample-application-with-agm)
- [Conclusion](#conclusion)

### Prerequisites
- [Google developer account](https://developers.google.com).
- Basic knowledge of JavaScript/TypeScript.
- Basic knowledge of Angular2+.
- Angular project locally installed.

### Objectives
This tutorial introduces you to the basic concepts of Google Maps in a Single Page Application (SPA). By the end, you should be able to integrate maps in the Angular application without using the Google CDN but instead with Angular Google Maps, which are simple to use.

### Getting started with Angular Google Maps (AGM)
The Google Maps JavaScript API lets you customize maps with your content and imagery for display on web pages and mobile devices. The Maps JavaScript API features four basic map types (satellite, roadmap, terrain and hybrid), which you can modify using layers and styles, controls and events, and various services and libraries.

Angular Google Maps, popularly known as AGM, is a very powerful package used to integrate Google maps into an Angular application. The Google team solely designs this package from the main JavaScripts Maps API to build maps in an Angular application.

It is effortless to integrate into Angular applications, unlike the main API. The only required core feature is installing this package, and you are all set to get started.

### Setting up Angular Google Maps
To setup Angular Google Maps, let's begin installing a new application by running the following commands:
```bash
ng new agm # this installs a new angular application, AGM
```
The above command creates for us an Angular template application. It takes a few minutes to install, depending on your internet speed.

Upon installation, `cd` into the project root and run the following commands to add the package into your application.

```bash
cd agm # note that agm is our project name
npm install @agm/core # Angular Google Maps package
```

You notice that we're using the [Node Package Manager (NPM)](https://www.npmjs.com) to install the package.

>In this article, we've installed Angular Google Map version 1, which may vary from your version.


```json
    ...
    "@agm/core": "1.0.0",
    ...
```
The above `package.json` file shows the installed version of our AGM.

Now that we have installed the `AGM` package let's add it to our core application module.

Open the `src/app/app.module.ts` file and edit it as follows:
```ts
...
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    //import the AGM core module to setup the LazyMapsAPILoaderConfig
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  ...
})
export class AppModule { }

```

From the above snippet, you notice that we're required to add our Maps API key. This unique key is available for use when you create your developer's account, as described below.

To retrieve your API key, head over to your Google developer [account](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key), and enable your Google Maps API functionality as shown below:

![creating api key](/engineering-education/getting-started-with-agm/api-key.jpg)

Copy this newly generated key on the screen prompt, and add it to your environment as shown below:
```ts
// open the src/environments/environment.ts file and add your key.
export const environment = {
  ...
  API_KEY:'AIxxxxxxxxxxxxxxxxxxxxxxxxxx',
};
```
>It's essential to remember that this key will always be different from the one used above. The key is unique to each user since they can be billed when a specific usage limit is reached.

Now that we've our API key, let's go back to our `src/app/app.module.ts` file and update the `AGM` module as shown below:
```ts
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    AgmCoreModule.forRoot({
      apiKey: environment.API_KEY
    })
  ],
  ...
})
export class AppModule { }

```
The above module has the `AGM` core module we previously installed. We then add this module to our `imports` array to make it usable in our application.

### Building a sample application with AGM
Now that we have seen how to set up the Angular Google Maps (AGM) package let's proceed and create a sample application showing the map of Nairobi city, Kenya on coordinates `1.2921° S 36.8219° E`.

> Under certain circumstances, a darkened map, or 'negative' Street View image, watermarked with the text "for development purposes only", may be displayed. This behaviour typically indicates issues with either an API key or billing. Additionally, ensure that you use the correct coordinates to get the expected results.

Let's start by creating a new component by running the following commands:
```bash
ng g c components/maps
```
The above command adds the `MapsComponent` component in the `components` directory, as shown in the output below:

Output:
```bash
CREATE src/app/components/maps/maps.component.css (0 bytes)
CREATE src/app/components/maps/maps.component.html (19 bytes)
CREATE src/app/components/maps/maps.component.spec.ts (612 bytes)
CREATE src/app/components/maps/maps.component.ts (267 bytes)
UPDATE src/app/app.module.ts (647 bytes)
```

To ensure type checking, let's also create a  map marker interface
```bash
ng g i map-marker
```
Output:
```bash
CREATE src/app/map-marker.ts (31 bytes)
```
The `ng g i map-marker` command creates a new file in the `src/app/map-marker.ts`. We will use this interface to define our model for our Google map.

Edit this file as shown below:
```ts
export interface MapMarker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}
```
The above interface has four fields, the coordinates, labels and a boolean to enable or disable map drag.

Now that we have set up our module, maps component and interface, let's proceed and edit `app.component.html` as shown below:
```html
<app-maps></app-maps>
```
The above template has been edited to include elements of the `<app-maps></app-maps>`. This ensures that our maps template is displayed in our app components, which we're using as our main component.

Next, copy and paste the following snippets into your maps template;

```html
<!-- This is our HTML page where our map will be displayed  -->
<h3> Map Of Nairobi, Kenya</h3>
<agm-map
  [latitude]="latitude"
  [longitude]="longitude"
  [zoom]="zoomLevel"
  [disableDefaultUI]="false"
  [zoomControl]="false"
  (mapClick)="onMapClickEvent($event)">

  <agm-marker
    *ngFor="let mapMarker of mapMarkers; let i = index"
    (markerClick)="onMarkerClickEvent(mapMarker.label, i)"
    [latitude]="mapMarker.latitude"
    [longitude]="mapMarker.longitude"
    [label]="mapMarker.label"
    [markerDraggable]="mapMarker.draggable"
    (dragEnd)="markerDragEnd(mapMarker, $event)">

    <agm-info-window>
      <strong>InfoWindow content</strong>
    </agm-info-window>

  </agm-marker>

  <agm-circle [latitude]="latitude + 0.3" [longitude]="longitude"
              [radius]="5000"
              [fillColor]="'red'"
              [circleDraggable]="true"
              [editable]="true">
  </agm-circle>

</agm-map>

```
The above template has a header, in this case, ' Map Of Nairobi, Kenya'. We also have the `<agm-map></agm-map>` element, which we have edited to meet our requirements. For example, we have bound the coordinates, zooming conditions, colours and many more features which help us customize our map.

> It's important to note that all the bindings above have been defined on the script which we will see in a minute.

Now, proceed and edit the `maps.component.css` stylesheet as shown below:
```css
agm-map {
  height: 500px;
}

```
The above style sets the map's height to `500px`. You can customize this figure to meet your screen size requirements.

Now that we've a complete layout, let's add the logic to display our map:
```ts
import { Component, OnInit } from '@angular/core';
import {MapMarker} from "../../map-marker";
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent{

  // zoom level of our Google maps
  zoomLevel: number = 10;

  // initial center position for the map of Nairobi city, kenya
  latitude: number = -1.2921;
  longitude: number = 36.8219;

  onMarkerClickEvent(mapLabel: string, mapIndx: number) {
    console.log(`The marker: ${mapLabel || mapIndx}`)
  }

  onMapClickEvent($event: MouseEvent) {
    this.mapMarkers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(marker: MapMarker, $event: MouseEvent) {
    console.log('The drag end', marker, $event);
  }

  mapMarkers: MapMarker[] = [
    {
      latitude: 51.673858,
      longitude: 7.815982,
      label: 'Point A',
      draggable: true
    },
    {
      latitude: 51.373858,
      longitude: 7.215982,
      label: 'Point B',
      draggable: false
    },
    {
      latitude: 51.723858,
      longitude: 7.895982,
      label: 'Point C',
      draggable: true
    }
  ]
}

```

Now, you remember that previously, we had coordinates, zoom, and many other conditions bound on our template. Those values are defined on the above logic as we discuss below:

We begin by importing `MapMarker` and `MouseEvent` from the `AGM` package we had previously installed. Next, we have a decorator, which is used to mark the class as the Angular component. It provides informational metadata that defines what kind of properties the existing component can use. 

A component takes properties as metadata as an object, and the object contains key-value pairs like selector, style, or styleUrl. All these properties make a component a complete reusable chunk for the Angular application.

Our class has multiple properties, such as the coordinates of the city we want to display, i'e, Nairobi City.

We also 3 methods, `onMarkerClickEvent()`, `onMapClickEvent()`, and `markerDragEnd()`. These are used to define the functionality of our map. For example, we define what should happen when the user clicks on the map, when a user drags the map and many other properties you may find [here](https://developers.google.com/maps/documentation/javascript/overview).

Output:

![map-output](/engineering-education/getting-started-with-agm/map.png)

### Conclusion
In this tutorial, we've discussed Angular Google maps. We've seen how to integrate this package in our Angular application to display the map of Nairobi City in Kenya.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

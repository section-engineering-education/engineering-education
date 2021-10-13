### Introduction

Maps have become one of the core features of most web applications. For example, a company may want to show its office direction on the site. A ride hailing service portal may also keep track of all live rides on the map. These are all made possible by map integrations.  

In this article, I'll be showing you how to integrate Angular Google Maps (AGM) on your Angular application.

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

- Google developer account.
- Basic knowledge in JavaScript/TypeScript.
- Basic knowledge of Angular2+.
- Angular project locally installed.

### Objectives

At the end of this tutorial, you should be able to build an Angular/JavaScript project with Google Maps.

### Getting started with Angular Google Maps (AGM)

Angular Google Maps, popularly known as AGM is very powerful package that's used to integrate the Google maps into an Angular application. This package is solely designed by Google team from the main JavaScripts Maps API for building maps in an Angular application.

It's very simple to integrate into applications, unlike the main API.The only required core feature is the installation of this package, and you're all set.

### Setting up Angular Google Maps

To setup Angular Google Maps, let's begin installing a new application by running the following commands:

```bash
ng new agm # this installs a new angular application, agm
```

Upon installation, `cd` into the project root and run the following commands to add the package into your application.

```bash
cd agm # note that agm is our project name
npm install @agm/core # Angular Google Maps package
```

>In this article, we've installed Angular Google Map version 1, which may vary from your version.

```json
    ...
    "@agm/core": "1.0.0",
    ...
```
Now that we've `AGM` package installed, let's proceed and add it to our core module.

Open `src/app/app.module.ts` file and edit it as followed:

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
From the above snippet, you've noticed we're required to add our Maps API key.
For our map to work, we've to use this key, now head over to your Google developer [account](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key), and enable your Google Maps API functionality as shown below:

![creating-api-key](/engineering-education/agm/api-key.png)

Copy this new generated key on the screen prompt, and add it on your environment as shown below:

```ts
// open the src/environments/environment.ts file and add your key.


export const environment = {
  ...
  API_KEY:'AIxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

```

>It's important to remember that this key will always be different from the one used above.

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

### Building a sample application with AGM

Now that 'we seen how to setup the AGM package in an Angular application, let's proceed and create a sample application that will be showing the map of Nairobi city, Kenya on coordinates `1.2921° S, 36.8219° E`.

Let's start by creating a new component by running the following commands:

```bash
ng g c components/maps # this command adds a new Maps component in the components directory as shown in the output below
```

Output:

```bash
CREATE src/app/components/maps/maps.component.css (0 bytes)
CREATE src/app/components/maps/maps.component.html (19 bytes)
CREATE src/app/components/maps/maps.component.spec.ts (612 bytes)
CREATE src/app/components/maps/maps.component.ts (267 bytes)
UPDATE src/app/app.module.ts (647 bytes)

```

To ensure type checking, let's also create a `marker` interface:

```bash
ng g i map-marker
```

Output:

```bash
CREATE src/app/map-marker.ts (31 bytes)

```

Edit this file as shown below:

```ts
export interface MapMarker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}

```

To see our result on the browser, we've to call this component into our main template, `app.component.html`.
Proceed and edit this template as shown below:

```html
<app-maps></app-maps>
```

Next, copy and paste the floowing snippets into your maps template;

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

Now edit our styling page to set the map's height:

```css
agm-map {
  height: 500px;
}

```

Not that we've a complete layout, let's add the logic to display our map:

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

Output:

![map-output](/engineering-education/agm/map.png)


### Conclusion
On this tutorial, we've discussed the Angular Google maps. We've seen how to integrate this package in our Angular application to display the map of Nairobi City, in Kenya.

Happy coding!

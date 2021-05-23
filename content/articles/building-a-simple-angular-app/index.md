---
layout: engineering-education
status: publish
published: true
url: /building-a-simple-angular-app/
title: How to Build a Simple Angular SPA from Scratch
description: This article will walk you on building a simple Angular application covering the basic and core Angular CLI concepts. The guide is handy for developers who are willing to have a hands-on experience, along with learning.
author: mahantesh-r
date: 2021-01-25T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-simple-angular-app/hero.png
    alt: Data Binding using Angular example image
---
Angular 11 was released on [Nov 11, 2020](https://angular.io/guide/updating-to-version-11), by the Angular team at Google. Angulars development community has been growing over the past few years. If you are not familiar with Angular, there are plenty of reasons why you should start learning.
<!--more-->
This year's release focuses on improving the developer's experience. To check out more about releases, [click here](https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7).

### Introduction 
This article will walk you on building a simple Angular application. We will cover the basics and core Angular CLI concepts. The guide will be handy for developers who are looking to have a hands-on experience while learning.

We are going to build a tiny version of a streaming anime application. On the home page, we will display all the anime covers. The user can click on any of the cards to be redirected to the respective anime profile section.

The anime profile contains all the details about that respective anime — and a comment box at the bottom.

### Getting started
With Node.js installed, run the following command to install Angular CLI.
```bash
npm install -g @angular/cli
``` 

This command will install all the dependencies needed to build an Angular application.

The next step is to create a workspace and starter app, lets do so by running the following command. 
```bash
ng new my-app
``` 

This step will create a new Angular starter app named *my-app*.

Now, with this starter app in-place, run the following commands.
```bash
cd my-app
ng serve
```
The latter command will run the *my-app* application.

The folder structure should look as shown below:
```html
my-app
├───e2e
├───node_modules
└───src
    ├───app
    │   ├───anime-list
    │   │   ├───anime-list.component.css
    │   │   ├───anime-list.component.html
    │   │   └───anime-list.component.ts
    │   ├───anime-card
    │   │   ├───anime-card.component.css
    │   │   ├───anime-card.component.html
    │   │   └───anime-card.component.ts
    │   ├───anime-profile
    │   │   ├───anime-profile.component.css
    │   │   ├───anime-profile.component.html
    │   │   └───anime-profile.component.ts
    │   ├───model
    │   │   └───animeInterface.ts
    │   ├───anime.service.ts
    │   ├───app.component.css
    │   ├───app.component.html
    │   ├───app.component.ts
    │   └───app.module.ts
    ├───assets
    ├───environments
    ├───db-data.ts
    ├───index.html
    ├───main.ts
    └───style.css
```

### Building the app
We will start with the data part first, and later on, build the UI and its working components.

#### Getting your data ready
- In your `src/app` folder, create a new interface file under the new folder `model`.
```typescript
    // animeInterface.ts

    export interface AnimeInterface {
      id: number;
      iconUrl: string;
      name: string;
      description: string;
      type: string;     // whether a series/movie/OVA.
      status: string;
      comments: string[];
    }
```

- The next step would be to populate the data. We will create a *typescript* file in the `src` folder.
```typescript
    //db-data.ts

    import {AnimeInterface} from './app/model/animeInterface';
    export const ANIME: AnimeInterface[] = [
        {
        id: 2,
        iconUrl: '...enter icon URL',
        name: 'Akira',
        description: '...enter description here',
        type: 'movie',
        status: 'completed',
        comments: []
      },
    ];
```

- The const `ANIME` is an array of the type `AnimeInterface`, which holds data about each show in `JSON` format.

With the data ready, the next step is to display all the anime cards.

#### Building the UI
We will be using `Bootstrap v4.0` to keep our UI simple and clean. Use the bootstrap templates in your `index.html` file.

#### The layout
Create a component `anime-list` from your terminal with the following command:

```bash
    ng g c animeList
```

This will generate a new component called `anime-list` under the `src/` folder. The component gets imported into the `declaration` array in `app.module.ts`.

The `anime-list` component will be used to display the anime list from `db.data.ts` in a grid manner.
```typescript
    //anime-list.component.ts

    import { Component } from '@angular/core';
    import {ANIME} from '../../db-data';

    @Component({
      selector: 'app-anime-list',
      templateUrl: './anime-list.component.html',
      styleUrls: ['./anime-list.component.css']
    })

    export class AnimeListComponent{
      animes = ANIME;
    }
  ```

  ```html
  <!-- anime-list.component.html -->

    <div class="container-fluid">
      <div class="col">
        <div class="row animeCard">
          <app-anime-card class="col-sm-3 col-md-3 col-lg-3"
                          *ngFor="let anime of animes;index as animeId"
                          [anime]='anime'
                          [animeId] = animeId>
          </app-anime-card>
        </div>
      </div>
    </div>
```

In the above *.ts* code, we are sending data from `db.data.ts` to the template, that is where we are calling the *component* `anime-card` from.

Now, create a `anime-card` component, which will display the anime card and provide a static router link to the *anime profile* section.
```typescript
  // anime-card.component.ts
  
    import {Component, Input } from '@angular/core';
    import {AnimeInterface} from '../model/animeInterface';

    @Component({
      selector: 'app-anime-card',
      templateUrl: './anime-card.component.html',
      styleUrls: ['./anime-card.component.css']
    })


    export class AnimeCardComponent{
      @Input()
      anime: AnimeInterface;

      @Input()
      animeId: number;
    }
```
```html
  <!-- anime-card.component.html -->

  <div class="card" style="width: 17rem; margin: 1px;">
    <img [src]="anime.iconUrl" class="card-img-top" alt="..." style="height: 380px;">
    <div class="card-body">
      <p class="card-text">{{ anime.name }}</p>
      <button
              [routerLink]="['/anime', animeId]"
              type="button"
              class="btn btn-success btn-sm"
              style="margin: auto;">
      View more!
      </button>
    </div>
  </div>
```

The code above will get the *anime* and *id* as *inputs* from its parent component `anime-list`; these details are 
used in the template to display the anime card. The `routerLink` creates a link to the `anime-profile` section (covered below) of our application.

#### Creating the profile
With the layout ready, once the user clicks on any of the anime card, an *id* is passed as an URL parameter, and that respective anime profile gets displayed.

Create an `anime-profile` component.
```html
    <!-- anime-profile.component.html -->

    <div *ngIf="anime" class="container-fluid" style="color: #1976d2;">
      <br>
      <button class="btn btn-success btn-sm" (click)="goBack()">Go back</button>
      <hr>
      <div class="row" >
        <!-- Display the Poster here  -->
        <div class="col-sm-3">
          <figure class="figure">
            <img src="{{ anime.iconUrl }}" class="figure-img img-fluid rounded" alt="..." style="max-height: 469px;">
          </figure>
        </div>
          
          <!-- Anime Profile -->
        <div class="col-sm-9">
          <div class="card">
            
            <div class="card-header">
              <h3 class="card-title">{{anime.name | uppercase }}</h3>
            </div>
    
            <div class="card-body">
              <h5 class="card-title">Type : {{anime.type | titlecase}}</h5>
              <div *ngIf="anime.status === 'completed'; else elseBlock">
                <h5 class="card-title">Status : <span class="badge badge-success">{{anime.status}}</span></h5>
              </div>
                
              <ng-template #elseBlock>
                <h5 class="card-title">Status : <span class="badge badge-warning">{{anime.status}}</span></h5>
              </ng-template>
                
              <h5 class="card-title">Description :</h5>
              <p class="card-text">{{ anime.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <br>
        
        <!-- Comments box -->
      <div class="form-group row container">
        <label class="col-sm-2 col-form-label" for="comment">Enter your comment :</label>
        <div class="col-sm-9">
          <input #comment
                 (keyup.enter)="addComment(comment.value); comment.value='' "
                 id="comment"
                 class="form-control">
        </div>
        <button class="col btn-primary btn"
                (click)="addComment(comment.value); comment.value=''">Post
        </button>
      </div>
    
        <!-- Display comments here -->
      <div class="row container">
        <div class="container">
          <ul class="list-group list-group-flush" style="margin: 20px;">
            <li class="list-group-item" *ngFor="let comment of anime.comments">
              {{ comment }}
            </li>
          </ul>
        </div>
      </div>
    </div>
```
```typescript
    // anime-profile.component.ts
    
    import {Component, OnInit } from '@angular/core';
    import {AnimeInterface} from '../model/animeInterface';
    import {AnimeService} from '../anime.service';
    import {ActivatedRoute} from '@angular/router';
    import { Location } from '@angular/common';
    import {Subscription} from 'rxjs';
    
    @Component({
      selector: 'app-anime-profile',
      templateUrl: './anime-profile.component.html',
      styleUrls: ['./anime-profile.component.css']
    })

    export class AnimeProfileComponent implements OnInit{
      anime: AnimeInterface;
      animeSubscription: Subscription;
    
      constructor(private route: ActivatedRoute,
                  private animeService: AnimeService,
                  private location: Location) { }
    
      ngOnInit(): void {
        this.getAnime();
      }
    
  // store the comments        
      addComment(comment: string): void {
        if (comment) {
          this.anime.comments.push(comment);
        }
      }
      
  // fetch the anime profile using a service
      getAnime(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.animeSubscription = this.animeService.getAnime(id)
          .subscribe(anime => this.anime = anime);
      }
    
      goBack(): void {
        this.location.back();
      }
    }
```
The code above uses a *service* to fetch the anime profile based on the *id*, and `<ng-template>` is used to define an *else block*. The `location` service interacts with the browser's URL directly and redirects the user should you wish to.

The `anime.service.ts` is as follows:
```typescript
   // anime.service.ts
   
   import { Injectable } from '@angular/core';
   import {AnimeInterface} from './model/animeInterface';
   import {ANIME} from '../db-data';
   import {Observable, of} from 'rxjs';

   @Injectable({
     providedIn: 'root'
   })
   
   export class AnimeService {
     getAnime(id: number): Observable<AnimeInterface> {
       return of(ANIME.find(anime => anime.id === id + 1));
     }
   }

```

#### Setting up the routes
The next step is to set up routes for in-app navigation. For that, mention the paths in the `imports` array of `app.module.ts`. Also initialize the `exports` array with the `RouterModule` as shown below. 

Doing this will allow us to use `<router-outlet>` in the components declared in `AppModule`.

```typescript
    // app.module.ts
    
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    import { AppComponent } from './app.component';
    import { AnimeListComponent } from './anime-list/anime-list.component';
    import { AnimeCardComponent } from './anime-card/anime-card.component';
    import {RouterModule} from '@angular/router';
    import { AnimeProfileComponent } from './anime-profile/anime-profile.component';

    @NgModule({
      declarations: [
        AppComponent,
        AnimeListComponent,
        AnimeCardComponent,
        AnimeProfileComponent
      ],

      imports: [
                  
      // Routes for in-app navigation
        RouterModule.forRoot([
          {path: '', component: AnimeListComponent},
          {path: 'anime/:id', component: AnimeProfileComponent},
        ]),
          
        FormsModule, BrowserModule
      ],
      exports: [RouterModule],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
```
Note that there are other ways to set up your in-app routes. Another method is to create an `AppRoutingModule` file
and define your paths there. You can reference it [here](https://stackoverflow.com/questions/41823772/angular2-export-of-routermodule-why-it-is-required).

The last step would be to use `<router-outlet>` placeholder in our `app.component.html`, that will help load the components based on the current state.
```html
    <!-- app.component.html-->

    <router-outlet></router-outlet>
```
```css
  /*  app.component.css */

  .top-menu {
    background: #1976d2;
  }
  
  .logo {
    max-height: 55px;
  }
  
  .animeCard {
    margin: 50px auto;
  }

```

With all these steps followed, our Anime SPA is ready to go. 

Below, are few screenshots for you to compare :)

![home page](/engineering-education/building-a-simple-angular-app/my-app-home.png)

![anime profile page](/engineering-education/building-a-simple-angular-app/my-app-anime-akira.png)

### Additional Resources
- Refer to the [Angular Docs](https://angular.io/docs) for more info.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

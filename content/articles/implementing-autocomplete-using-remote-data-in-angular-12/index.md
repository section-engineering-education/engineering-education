---
layout: engineering-education
status: publish
published: true
url: /angular-12-autocomplete/
title: Implementing Autocomplete using Angular 12 Material UI
description: This tutorial will guide the user on how to implement the Autocomplete functionality using Angular Material 12 UI elements.
author: ochieng-lydia
date: 2022-02-04T00:00:00-05:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/angular-12-autocomplete/hero.png
    alt: Angular Autocomplete Hero
---
Autocomplete is a service that displays recommended options to the end-user when they enter certain keywords or put the cursor on the input field.
<!--more-->
Implementing the autocomplete service is relatively straightforward. The only thing that needs to be done is to invoke the `getItems` method. 

We then use the select box to auto display items retrieved from the server.

This tutorial will help you learn how to implement autocomplete using Material UI elements in Angular 12. 

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the project](#setting-up-the-project)
- [Angular material configuration](#angular-material-configuration)
- [Setting up the API services](#setting-up-the-api-services)
- [Creating autocomplete component](#creating-autocomplete-component)
- [Run your application](#run-your-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need:
- Some basic knowledge of JavaScript. It's important to note that Angular uses the TypeScript language. However, it is unnecessary for this tutorial.
- Basic knowledge of Angular and Material UI.
- Angular CLI 12 to be locally installed.
- An IDE such as [Webstorm](https://www.jetbrains.com/webstorm/download/) installed.

### Objectives
This tutorial will help the reader understand the Angular Material filtering engine. In the end, you will be able to retrieve data from a remote server. 

When the user starts typing, this data can then be auto-displayed in the autocomplete component.

### Setting up the project
To set up an Angular application, we use the following commands:

```bash
ng new autocomplete
```

Next, `cd` into the project folder and install the `angular material`:

```bash
cd autocomplete
ng add @angular/material
```

When the above command is executed, it prompts you to select an Angular prebuilt theme as shown below:

```bash
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink

❯ Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ] 
  Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ] 
  Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ] 
  Purple/Green       [ Preview: https://material.angular.io?theme=purple-green ]
```

In this tutorial, we will use the default configurations. 

### Angular Material configuration
Now that we have fully configured our application, let's proceed and configure our project to use the autocomplete module.

First, create the `material.module.ts` file at the project root then edit the file, as shown below:

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModule = [
 ...
  MatAutocompleteModule,
 ... // these are modules skipped for this article
 
];

@NgModule({
  imports: [
    CommonModule,
    ...
  ],
  exports: [
    ...
    materialModule
  ],
})

export class MaterialModule { }
```

In the above code, we are importing common modules and the `MatAutocompleteModule` from `Angular material`.

Next, we create an `array` for our newly imported module to ensure that it's available when we import this module:

Now that our material module is ready, let's import it into the `app.module.ts` file, as shown below:

```ts
// Import the angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material.module';
...
@NgModule({
  declarations: [...],
  imports: [
    ...
    MaterialModule,
  ],
  providers: [...],
  bootstrap: [...],
  schemas: [...]
})

export class AppModule { }
```

In the above module, we only make the Angular material usable within our application. 

Note that we're using the `app.module.ts` as the root module. Therefore, all other modules will be registered in this file.

When we re-execute our application, our Angular Material will be ready for use.

### Setting up the API services
In the previous section, we set up our `material.module.ts` module and registered the `MatAutocompleteModule` in the `material.module.ts` file.

Let's set up our API service using the following steps:

First, create an API service by running the command below:

```bash
ng g service api
```

The above command creates a `src/app/api.service.ts`. We will use this service to retrieve data from a remote server.

> It's recommended to put all your API requests in a service file, especially when building large applications in Angular. This helps in managing and scaling the application.

Edit the file as shown below to make HTTP requests to the remote server:

```ts
// importing the default angular config files
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// inject the project
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:8000/api/v1/";

  constructor(private httpClient: HttpClient) { }

  // a GET request to retrieve list of articles
  getArticles():Observable<Article>{
    return this.httpClient.get<Article>(`${this.BASE_URL}articles`);
  }
  // a post request to add an article
  addArticles(article:Article):Observable<Article>{
    return this.httpClient.post<Article>(`${this.BASE_URL}articles`,article);
  }

}
```

In the above code, we imported the HTTP client from `@angular/common/http` and specified our remote server base URL.

Next, we inject the HTTP client into a constructor using dependency injection.

> Dependency Injection, popularly referred to as DI, allows us to inject dependencies in different components across our applications without knowing how those dependencies are created or what other dependencies they need themselves.

We define the `getArticles()` method, which returns an observable list of articles from the server.

The `addArticles()` function adds an article to our remote server using the `POST` method.

### Creating the autocomplete component
In this section, we will create an Angular autocomplete component by running the following command:

```bash
ng g c autocomplete
```

Next, add the following template in the `autocomplete.component.html` file:

```html
<h3>List of articles on Section</h3>
<mat-form-field>
   <input type="text" placeholder="start typing..." matInput [formControl]="name"
        [matAutocomplete]="auto">
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let article of articles" [value]="article">
          {{article}}
       </mat-option>
   </mat-autocomplete>
</mat-form-field>
```

In the above field, we have an input field where the user types the article title. This field has Angular material `attributes` and `ReactiveForms` values.

We then define the `mat-autocomplete` which is our element of interest in this tutorial. 

The `<mat-option></mat-option>` has the `ngFor` directive to loop through the list of articles which are then recommended when the user starts typing.

Now that we have our template ready to filter articles, let's proceed and implement the logic to retrieve the list from the server:

```ts
//app.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl,ReactiveForms } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchArticlesCtrl = new FormControl();
  filteredArticles: Article;
  selectedArticle:Article;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.autocomplete();
  }
    
//autocomplete
autocomplete(){
  this.searchArticlesCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(2000),
        tap(() => {
          this.filteredArticles = [];
        }),
        switchMap(value => this.apiService.getArticles()
          .pipe(
            finalize(() => {
              this.loading = false
            }),
          )
        )
      )
      .subscribe((res: Article) => {
        if (data['Search'] == undefined) {
          this.errorMsg = res['Error'];
          this.filteredArticles = [];
        } else {
          this.filteredArticles = res['Search'];
        }
      });

}

//  selecting article
  onSelectingArticle() {
    this.selectedArticle = this.selectedArticle;
  }
// display article with
  displayArticleWith(value: Article) {
    return value?.Title;
  }
// clear article
  clearArticleSelection() {
    this.selectedArticle = "";
    this.filteredArticles = [];
  }
```

In the above code, we first import our API service. 

We then define the `autocomplete()` function, which we use to make an API request to retrieve a list of articles.

Next, we use built-in methods to filter articles depending on the value changes.

### Run your application
We can use the following command to run the application:

```bash
ng serve --port 4200
```

The above command will start our web server on port `4200`. 

You can access the app by navigating to `localhost:4200` on your browser. To test it, try entering random article titles in the input field.

> Note that the remote server is not running. To test the application, you will need an active server that can return a list of articles.

### Conclusion
In this tutorial, we have discussed how we can use Angular material to build an app that recommends article titles to the user.

The `mat-autocomplete` feature allows us to auto-suggest articles based on data from a remote server.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
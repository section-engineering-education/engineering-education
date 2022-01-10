### Angular 12 Material Autocomplete Example with Server Response

### Introduction
The autocomplete is a service that displays the recommended options to the end-user when the end-user(s) either feeds in some keywords on the input field or puts the cursor on the input field.

This tutorial will help you learn how to make Autocomplete in Angular 12 using Angular material 12 UI elements. 

We shall make an Angular app from the start to show how to create the autocomplete functionality.

Creating   autocomplete in angular12 will require setting up an app using Angular.

### Table of content

- [Angular 12 Material Autocomplete Example with Server Response](#angular-12-material-autocomplete-example-with-server-response)
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the project](#setting-up-the-project)
- [Angular material configuration](#angular-material-configuration)
- [Setting up the API services](#setting-up-the-api-services)
- [Creating autocomplete component](#creating-autocomplete-component)
- [Run your application](#run-your-application)
- [Conclusion](#conclusion)

### Prerequisites

To follow along with this tutorial, you'll need the following ;

- Basic knowledge of Javascript
- Basic knowledge in typescript and Angular
- Angular CLI locally installed .in this tutorial we will use  CLI version 12
- Local development environment

### Objectives

By the end of this tutorial, you will be able to retrieve data from the server such that it can be suggested and autocompleted once keywords are typed.

### Setting up the project

In this section, let's set up an Angular application by running the following commands:

```bash
ng new autocomplete
```

Next, `cd` into the project folder and install the angular material by executing the following:

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

Proceed and select your preferred theme. In this tutorial, we will use the default configurations.

### Angular material configuration

Now that we have fully configured our application, let's proceed and configure our project to use the autocomplete module.

First, create the `material.module.ts` file at the project root. Next, edit the file as shown below:

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModule = [
 ...
  MatAutocompleteModule,
 ...
 
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

In the above script, we first import the Angular common modules and the `MatAutocompleteModule` from the Angular material.

Next, we create an array for our newly imported module to ensure it's available for use when we import this module.  

Now that we have our material module ready, let's import it into our main module, `app.module.ts` as shown below:

```typescript
// import the angular material
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

### Setting up the API services

In the previous section, we set up our `material.module.ts` and `app.module.ts` modules.

Let's now proceed and set up our API service by following the steps outlined below.

First, create an API service by running the following commands:

```bash
ng g service api
```

The above command creates a  `src/app/api.service.ts`.

Next, edit this file as shown below to make HTTP requests.

```typescript
// importing the default angular config files
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// inject the project
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:8080/";

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

In the above service, we first import the HTTP client from `@angular/common/http`. We then define our remote server base URL.

Next, we inject the HTTP client into our constructor using the concept of dependency injection.

We define the `getArticles()` method which returns an observable list of articles on the server.

The `addArticles()` function adds an article to our remote server using the POST method.

### Creating autocomplete component
In the previous section, we have extensively discussed how to set up and configure our Angular material. 

Now let's proceed and create an Angular autocomplete component as shown below:
```bash
ng g c autocomplete
```

Next, add the following template in the `autocomplete.component.html` file.
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

In the above template, we have an input field where the user types the article title. This field has Angular material attributes and `ReactiveForms` values.

We then define the `mat-autocomplete` which is our element of interest in this tutorial. 

The `<mat-option></mat-option>` has the `ngFor` directive to loop the list of articles which are then recommended when the user starts typing.

Now that we have our template ready to filter articles as the user types, let's now implement the logic to retrieve the list from the server.

```Typescript
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

In the above code snippet, we first import the API service we had initially created. 

We then define the `autocomplete()` function which we use to make an API request to retrieve a list of articles.

Next, we use the power of the Angular built-in methods to filter the articles depending on the value changes.

### Run your application
Now that we have set up our application, let's now run our application as shown below:
```bash
ng serve --port 4200

```

The above command will start our web server on port 4200. 

Proceed and type the following on your browser:
```bash
localhost:4200
```

You can now test by typing a few article titles.

### Conclusion
In this tutorial, we have discussed how we can manipulate the power of Angular material to build a recommender feature for forms.

Happy coding!

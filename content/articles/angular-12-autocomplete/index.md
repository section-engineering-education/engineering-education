### Angular 12 Material Autocomplete Example with Server Response

### Introduction
The autocomplete is a service that displays the recommended options to the end-user when the end-user(s) either feeds in some keywords on the input field or puts the cursor on the input field.

Normally, implementing the autocomplete service is relatively straightforward. The only thing that needs to be done is implement the `getItems` method. Then, when we retrieve these items from a remote server, we use the select box to auto display items.

This tutorial will help you learn how to make Autocomplete using Angular Material 12 UI elements. 

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
To follow along with this tutorial, you'll need the following;
- Basic knowledge of Javascript. It's important to note that Angular uses the TypeScript language; however, it is unnecessary for this tutorial.
- Basic knowledge of Angular and Angular Material package.
- Angular CLI is locally installed. In this tutorial, we will use  CLI version 12
- Local development environment. We use the [Webstorm](https://www.jetbrains.com/webstorm/download/) IDE in this tutorial.

### Objectives
This tutorial aims at helping you gain knowledge in the Angular Material filtering engine. In the end, you will be able to retrieve data from a remote server. 

When the user starts typing, this data can then be auto-displayed in the autocomplete component.

### Setting up the project
In this section, let's set up an Angular application by running the following commands:
```bash
ng new autocomplete
```

Next, `cd` into the project folder and install the angular material by executing the following commands:
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

Proceed and select your preferred theme. In this tutorial, we will use the default configurations. These defaults can be achieved by clicking on the `Enter` key.

### Angular material configuration
Now that we have fully configured our application let's proceed and configure our project to use the autocomplete module.

First, create the `material.module.ts` file at the project root. Next, proceed and edit the file as shown below:
```typescript
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

In the above script, we first import the Angular common modules and the `MatAutocompleteModule` from the Angular material.

Next, we create an array for our newly imported module to ensure it's available for use when we import this module.  We then export these modules to be used by the importing scripts.

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

In the above module, we only make the Angular material usable within our application. It's important to note that we're using the `app.module.ts` as our root module; hence all other modules are registered here.

When we re-execute our application, our Angular Material will be available and ready for use.

### Setting up the API services
In the previous section, we set up our `material.module.ts` module. Next, registered the `MatAutocompleteModule` in the `material.module.ts` file.

We then made this module available for our application by importing it into the `app.module.ts` file.

Let's set up our API service by following the steps outlined below.

First, create an API service by running the following commands:
```bash
ng g service api
```

The above command creates a  `src/app/api.service.ts`. We will use this service to retrieve data from a remote server.

> Normally, it's good to put all your API requests in a service file, especially when building large applications in Angular. This helps in managing and scaling the application.

Next, edit this file as shown below to make HTTP requests to our remote server.
```typescript
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

We first import the HTTP client from `@angular/common/http` in the above service. We then define our remote server base URL.

Next, we inject the HTTP client into our constructor using the concept of dependency injection.

> Dependency Injection, popularly referred to as DI, allows us to inject dependencies in different components across our applications without needing to know how those dependencies are created or what dependencies they need themselves

We define the `getArticles()` method, which returns an observable list of articles on the server.

The `addArticles()` function adds an article to our remote server using the POST method.

### Creating autocomplete component
In the previous section, we have extensively discussed how to set up and configure our Angular material and how to make HTTP requests to a remote server.

Now let's proceed and create an Angular autocomplete component by running the following command:
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

We have an input field in the above template where the user types the article title. This field has Angular material attributes and `ReactiveForms` values.

We then define the `mat-autocomplete`, our element of interest in this tutorial. 

The `<mat-option></mat-option>` has the `ngFor` directive to loop the list of articles which are then recommended when the user starts typing.

Now that we have our template ready to filter articles as the user types, let's proceed and implement the logic to retrieve the list from the server.
```typescript
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

We then define the `autocomplete()` function, which we use to make an API request to retrieve a list of articles.

Next, we use the power of the Angular built-in methods to filter the articles depending on the value changes.

### Run your application
Now that we have set up our application, let's run our application as shown below:
```bash
ng serve --port 4200

```

The above command will start our web server on port 4200. 

Proceed and type the following on your browser:
```bash
localhost:4200
```
You can now test by typing a few article titles.

> It's important to note that the above remote server is not running. To test the application, you will need a server up and running with the list of articles to retrieve.

### Conclusion
In this tutorial, we have discussed how we can manipulate the power of Angular material to build a recommender feature for forms.

We have seen how we can use the mat-autocomplete feature to auto-suggest the articles from a remote server as the user types.

Happy coding!

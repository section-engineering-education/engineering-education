---
layout: engineering-education
status: publish
published: true
url: /angular11-custom-pipes/
title: Getting Started with Angular 11 Custom Pipes
description: This tutorial will go through the process of using these Angular 11 Custom Pipes to transform display data. We will also go over how we can create custom pipes .
author: bhanji-brilliant
date: 2021-06-12T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/angular11-custom-pipes/hero.jpg
   alt:  Getting Started with Angular 11 custom pipes
---
In this tutorial, we will be walking you through the process of using these pipes to transform display data, and how we can create our custom pipes to meet our needs. 
<!--more-->
While developing Angular applications, a situation may arise where you need to transform or format your display data on the HTML template.
### Introduction
For example, you may need to display the price of products in USD or any other currency. Angular provides inbuilt pipes that we can use to format our data as we desire.  

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Getting started with Angular 12 Pipes](#getting-started-with-angular-12-pipes)
- [Formatting HTML template data using in-built Angular pipes](#formatting-html-template-data-using-in-built-angular-pipes)
- [Creating custom pipes](#creating-custom-pipes)
- [Conclusion](#conclusion)

### Objectives
By the end of this tutorial, you should be able to use the inbuilt Angular pipes to format your display data on the HTML template, as well as creating your own Angular custom pipes.

### Prerequisites
- You should at least have basic knowledge in Angular 2+. In this post, we'll use Angular 12.0.3.
- Angular HTML templates and Angular CLI.

### Getting started with Angular 12 pipes
Angular pipes are denoted using `|` character as shown in the example below:
```html
{{I'LL BE DISPLAYED ON SCREEN IN LOWERCASE | lowercase }}

```

In the above syntax, we've two parts, the text to format and the pipe. When this code is executed, the text `I'LL BE DISPLAYED ON SCREEN IN LOWERCASE` will be displayed in lowercase. And that's it.  

> It's also important to note that Angular pipes takes different types of data types, ranging from arrays, dates, strings, and integers.

In the next section, let's look at examples involving inbuilt Angular pipes.

### Formatting HTML template data using in-built Angular pipes
Let's start by creating Angular 12 application, `custom-angular-pipes`. You can skip this section if you already have an application installed.  

```bash
ng new custom-angular-pipes

cd custom-angular-pipes

ng serve

```

Now that we have an application ready, open your browser and type the following:

```bash
http://localhost:4200

```

Output:

![Angular Homepage](/engineering-education/angular11-custom-pipes/angular-homepage.png)

Now, open `app.component.ts` file in the `src/app/` directory and add the following:

```ts
..........................................

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myText = "This is my first Angular 12 pipe example";
}
..........................................

```

Save and open the `app.component.ts` file in the `src/app/` directory and add the following markups:
```html
<div style="text-align:center">
  <img width="200" alt="Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">

  <div style="padding-top: 50px">
    To Uppercase:
    <p>{{myText | uppercase}}</p>
  </div>

  <div style="padding-top: 50px">
    To Lowercase:
    <p>
      {{myText | lowercase}}
    </p>
  </div>
</div>

```

Output:

![Lowercase and uppercase](/engineering-education/angular11-custom-pipes/text-case.png)

In the above script, you'll realize that on executing your code, the text displayed on the screen depends on the type of pipe used.   

Let's have a quick look at the currency pipe and how we can customize it to take the currency of your desire.  

Add the following in your `app.component.ts` file.

```ts
....................................
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  totalAmount = 1000;
}
.................................
```

Add the following to the template:
```html
<div style="text-align:center">
  <img width="200" alt="Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">

  <div style="padding-top: 50px">
    Defaults to USD:
    <p>{{totalAmount | currency}}</p>
  </div>

  <div style="padding-top: 50px">
   Format To Kenyan Shillings:
    <p>
      {{totalAmount | currency: 'KES '}}
    </p>
  </div>

</div>

```

Output:

![Currency](/engineering-education/angular11-custom-pipes/currency.png)

In the currency pipe example above, we've seen how we can customize currency pipe to accommodate any currency that we desire to use since it defaults to USD.

Angular has several inbuilt [pipes](https://angular.io/guide/pipes) that we can use to format data in the template.

### Creating custom pipes
Now that we've seen how to use inbuilt pipes, let's now create our pipes that are not shipped with Angular.   

In this example, we'll create an Angular pipe to capitalize our text.

Run the following command on the terminal:
```bash
 ng g pipe capitalize
```
Output:
```bash
CREATE src/app/capitalize.pipe.spec.ts (203 bytes)
CREATE src/app/capitalize.pipe.ts (225 bytes)
UPDATE src/app/app.module.ts (465 bytes)
```

It automatically adds this pipe in the `src/app/app.module.ts`.

```ts
........................................................
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
...................................................
```

Now open the `capitalize.ts` file in the `src/app/` directory and replace its content with the following:

```ts
...............................................
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(text: string): string {
    return text[0].toUpperCase() + text.substr(1).toLowerCase();
  }
}
....................................................

```

To use this new pipe, head up to the template and replace its previous contents with the new pipe as shown below:

```ts
...................................
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myText = 'my testing file';
}
..........................

```

```html
<div style="text-align:center">
  <img width="200" alt="Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">


  <div style="padding-top: 50px">
    <p>
      {{myText | capitalize}}
    </p>
  </div>

</div>

```

Output:

![capitalize](/engineering-education/angular11-custom-pipes/custom.png)

In the code snippet above, we've created a custom pipe to transform our text to be capitalized.

### Conclusion
In this tutorial, we've discussed a handful of concepts, ranging from Angular installation to the creation of our pipes. We've seen how we can use the inbuilt pipes to format our data in the HTML templates for display. 

We also looked at the creation of Angular custom pipes which are not shipped with Angular by default.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

### Introduction
While developing Angular applications, a situation may arise where you need to transform or format your display data on the HTML template. For example, you may need to display the price of products in USD or in any other currency. Angular provides inbuilt pipes that we can use to format our data as we desire.  

In this tutorial, i'll be walking you through the process of using these pipes to transform display data, and how we can create our own custom pipes to meet our needs.   

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Getting started with Angular 12 Pipes](#getting-started-with-angular-12-pipes)
- [Formatting  HTML template data using in-built Angular pipes](#formatting-HTML-template-data-using-in-built-Angular-pipes)

### Objectives
By the end of this tutorial, you should be able to use the inbuilt Angular pipes to format your display data on the HTML template, as well as creating your own Angular custom pipes.

### Prerequisites
- You should atleast have basic knowledge in Angular 2+. In this post, we'll use Angular 12.0.3.
- Angular HTML templates and Angular CLI.

### Getting started with Angular 12 Pipes

Angular pipes are denoted using `|` character as shown in the example below:
```html
{{I'LL BE DISPLAYED ON SCREEN IN LOWERCASE | lowercase }}

```
In the above syntax, we've two parts, the text to format and the pipe. When this code is executed, the text `I'LL BE DISPLAYED ON SCREEN IN LOWERCASE` will be displayed in lowercase. And that's it.  

> It's also important to note that Angular pipe takes different types of data types, ranging from arrays,dates, strings and integers.

In the next section, let's look at examples invollving inbuilt Angular pipes.

### Formatting HTML template data using in-built Angular pipes
Let's start by creating Angular 12 application, `custom-angular-pipes`. You can as well skip this section if you already have an application installed.  

```bash
ng new custom-angular-pipes

cd custom-angular-pipes

ng serve

```
Now that we've an application ready, open your browser and type the following:

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






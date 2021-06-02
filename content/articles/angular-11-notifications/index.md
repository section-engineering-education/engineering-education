### Introduction
In this tutorial, we discuss about this beautiful, customizable and responsive popup notification using Angular 11.
We'll look at sweetalert in depth, its features and how to integrate with angular to replace the default JavaScript alert notification.  

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up Angular 11 environment](#setting-up-angular-11-environment)
- [Installing SweetAlert Package in Angular 11](#installing-sweetAlert-package-in-angular-11)

### Prerequisites
To successfully follow this tutorial, you need to be conversant with the following:

- Basic JavaScript especially how to use alerts.
- Installation of third party packages in Angular.
- You should be comfortable using Node Package Manager ([npm](https://www.npmjs.com)).
- Node.js and Angular CLI installed in your local development machine. 

### Objectives

By the end of this Angular SweetAlert tutorial, you should be able to perform the following:

- Set Up Angular Environment.
- Add SweetAlert package to your Angular application.
- Import and use the package to create popup messages such as warning, question and success.
- Customize the default settings of Sweetalert such as resizing the popup boxes.
- Animate the popup boxes.

### Setting up Angular 11 environment

Before we start using SweetAlert tool, we first need to set up our Angular project enviroment.  

Run the following command in your terminal:

```
ng g new sweetalert-example

```
This will take some time, depending on your internet speed, when complete, move to the project directory root by running the following command:  
```
cd sweetalert-example

```

### Installing SweetAlert Package in Angular 11ss
To download and install sweetAlert package in your angular application, run the following command: 

```bash
npm install sweetalert2

```
Upon completion, add the sweetAlert CSS to `angular.json` file to show interactive popups as shown below:
```json
----------------------------
"styles": [
      "src/styles.css",
      "node_modules/sweetalert2/src/sweetalert2.scss"
    ],
---------------------------------------
```
SweetAlert package also supports `Content Delivery Network(CDN)`. It's as simple as including this link to your application as seen below:

```js
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="sweetalert2.all.min.js"></script> //use this to initialize the plugin
<script src="sweetalert2.min.js"></script>
<link rel="stylesheet" href="sweetalert2.min.css"> // include stylesheet
```
>In this tutorial, we use the package we installed via [npm](npm.org).  

### Creating success alert using SweetAlert

In the `app.component.ts` file, import the sweetAlert `Swal` module:  

```ts
import Swal from 'sweetalert2/dist/sweetalert2.js';
```
This module gives us an access to the SweetAlert `fire()` method that we uses to fire triggered button click events.  

To create a success alert, let add the following to our `app.component.ts`:

```ts
-----------------------------------
export class AppComponent implements OnInit {

---------------------
ngOnInit(): void
{
  //call message method and pass it the parameters on page load
  this.showSuccessMessage(
      'SweetAlert Success',
      'Testing My First SweetAlert',
      'success',
      true,
  )
}
/**
   * this method displays a simple success message to the user
   * @param title
   * @param message
   * @param icon
   * @param showCancelButton
   */
  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
 }
```

**Output:**
![SweeAlertSuccess](engineering-education/sweetalert-success)

In the above typescript, we import the `Swal` module from SweetAlert package installed previously. We then invoke the `Swal.fire()` method and pass it a few parameters to display the alert as shown in the above screenshot.


### Creating Warning alert using SweetAlert

This will again follow the same procedure defined above with only a single modification as shown below:

```ts
-----------------------------------
export class AppComponent implements OnInit {

---------------------
ngOnInit(): void
{
  //call message method and pass it the parameters on page load
  
  this.showWarningMessage(
      'SweetAlert Warning',
      'Testing My First SweetAlert Warning',
      'warning',
      true,
  )
}
/**
   * this method displays a simple warning message to the user
   * @param title
   * @param message
   * @param icon
   * @param showCancelButton
   */
  showWarningMessage(
    title, message, icon = null,
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
 }
```

**Output:**
![warning-alert](engineering-education/warning-alert.png)

> You notice that the functionality remains the same, apart from message and icon.

### Creating question alert using SweetAlert

While creating an alert with a question mark, we add the `question` on the icon text.

```ts
-----------------------------------
export class AppComponent implements OnInit {

---------------------
ngOnInit(): void
{
  //call message method and pass it the parameters on page load
  this.showQuestionMark(
      'SweetAlert Question mark',
      'Testing My First SweetAlert question ',
      'question',
      true,
  )
}
/**
   * this method displays a simple question message to the user
   * @param title
   * @param message
   * @param icon
   * @param showCancelButton
   */
  showWarningMessage(
    title, message, icon = null,
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
 }
```

**Output:**
![question-alert](engineering-education/question-alert.png)

### Creating error alert using SweetAlert

Just like the other alerts, we only change the icon description as seen in the example below:


```ts
-----------------------------------
export class AppComponent implements OnInit {

---------------------
ngOnInit(): void
{
  //call message method and pass it the parameters on page load
  this.showQuestionMark(
      'SweetAlert Error',
      'Testing My First SweetAlert Error ',
      'error',
      true,
  )
}
/**
   * this method displays a simple question message to the user
   * @param title
   * @param message
   * @param icon
   * @param showCancelButton
   */
  showWarningMessage(
    title, message, icon = null,
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
 }
```

**Output:**
![error-alert](engineering-education/error-alert.png)

### Conclusion
In this tutorial, we've seen how we can create beautiful, user interectiv alerts. We seen how we can install the SweeAlert package in our Angular application and adding its CSS to the `angular.json` file.
We've also discussed how we can use SweetAlert over the CDN without neccessarily installing the package in our application.
For more information, you can read sweetalert documentation [here](https://sweetalert2.github.io).

Happy Coding!

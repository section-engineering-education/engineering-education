---
layout: engineering-education
status: publish
published: true
url: /angular-crash-course-qr-code/
title: Quick Response code crash course using Angular 12
description: In this course, we will learn how to create a QR code using Angular 12.
author: owino-wendy
date: 2022-04-07T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/angular-crash-course-qr-code/hero.png
    alt: QR Codes Angular 12
---
User authentications play a vital role when it comes to securing your application. In addition to the existing authentication methods, Angular 12 comes with another simple yet powerful tool, the quick response code.
<!--more-->
In this tutorial, we will learn how to create a quick response code that can be used to authenticate users or perform different tasks in an Angular SPA.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the angular project](#setting-up-the-angular-project)
- [Quick response codes in angular](#quick-response-codes-in-angular)
- [Integrating the quick response code](#integrating-the-quick-response-code)
- [Setting up the quick response code for an angular app](#setting-up-the-quick-response-code-for-an-angular-app)
- [Configure the QR code scanner for authentication](#configure-the-qr-code-scanner-for-authentication)
- [Containerize the QR code scanner application](#containerize-the-qr-code-scanner-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial, you will need to have:
- Basic knowledge of JavaScript or TypeScript.
- Basic knowledge of Angular 2+. In this tutorial, we will be using Angular 12.
- An IDE is locally installed. We'll be using the [WebStorm](https://www.jetbrains.com/webstorm/promo/?source=google&medium=cpc&campaign=9641686242&gclid=Cj0KCQjw_4-SBhCgARIsAAlegrVKrjp9E4YtohpbsCYlV3xtKt65dtFuMFW66vgWGyhB4DgKHtDqwUgaAgBWEALw_wcB) IDE for this course.
- Angular CLI installed. You can also build the Angular file structure from the ground up.

### Objectives
By the end of this tutorial, you will be able to:
- Create a quick response code that can be used to authenticate users in an Angular SPA.
- Set up the quick response code to work with the Angular CLI.
- Build an Angular project from scratch.
- Deploy the application to a production environment.
- Containerize the application using docker.

### Setting up the angular project
In this tutorial, we will be using the Angular CLI to build an Angular project from scratch.

To create an Angular project, you will need to run the following command:
```bash
ng new quick-response-code-crash-course
```

The above command will create a new Angular project called `quick-response-code-crash-course` within the current directory.

Next, navigate into the project root and run the following command:
```bash
ng serve
```

The above command starts your Angular application on the default port `4200`. However, you can change the port by running the following command:

```bash
ng serve port <port>
```

Open your browser and navigate to `http://localhost:4200`. You will notice that your application is loading.

Now that we've set up the Angular project, we can start working on the quick response code.

In the next section, we will look at how QR codes work and install the necessary packages.

### Quick response codes in angular
As discussed previously, quick response codes are a simple way to authenticate users on an Angular SPA.

They are barcodes that can be read by a digital device(camera). This information is then stored on the device and can be used to authenticate users.

QR codes have a significant advantage over other authentication methods. They are easy to read and scan hence an efficient way of interacting with the application.

To use a scanner in your Angular application, you will need to install the following packages:
- [NPM](https://npm.org/)
- [Angular QR Code](https://www.npmjs.com/package/angular2-qrcode)

> It's also worth noting that several packages are available on NPM. However, some of them may not be compatible with your Angular version.

Now let's proceed and install the required packages for scanning as follows:
```bash
cd quick-response-code-crash-course
npm i angular2-qrcode
```
In the above command, we first navigate into our project root and install the `angular2-qrcode` package.

You should be able to see the package in the `package.json` file as shown below:
```json
...
"@angular/router": "~7.2.0",
"angular2-qrcode": "^2.0.3",
"core-js": "^2.5.4",
...
```

> At the time of this writing, the latest version of [Angular QR Code](https://www.npmjs.com/package/angular2-qrcode) is `2.0.3`. This may be different from your version.

Now that we have installed the packages, we can start using the quick response code.

Let's start by registering this package to our application. Add the following to your `app.module.ts` file:
```typescript
//... add other missing imports
// the following import is required for the QR code scanner
import { QRCodeModule } from 'angular2-qrcode';
@NgModule({
  declarations: [
    //... add declarations
  ],
  imports: [
    //... add the BrowserModule,AppRoutingModule and other modules
    QRCodeModule
  ],
  providers: [
      //... add the providers
  ],
  bootstrap: [
      //...add the bootstrap components
  ]
})
export class AppModule { }
```

### Integrating the quick response code
Now that we have the quick response code installed and registered, we can start using it in our application.

Let's start by creating a new component, `QrCodeScannerComponent`, that will be used to scan the QR code by running the following command:
```
ng  g c components/qr-code-scanner
```

The above command generates a new component called `qr-code-scanner` in the `components` directory as follows:
```bash
CREATE src/app/components/qr-code-scanner/qr-code-scanner.component.css (0 bytes)
CREATE src/app/components/qr-code-scanner/qr-code-scanner.component.html (34 bytes)
CREATE src/app/components/qr-code-scanner/qr-code-scanner.component.spec.ts (679 bytes)
CREATE src/app/components/qr-code-scanner/qr-code-scanner.component.ts (303 bytes)
UPDATE src/app/app.module.ts (583 bytes)
```

Next, we need to add the following code to the `app.component.html` file:
```html
<!--BEGIN the qr code -->
<app-qr-code-scanner></app-qr-code-scanner>
<!--END the qr code -->
```

We have added the `app-qr-code-scanner` component to the `app.component.html` file. These are special QR scanner directives made available by the `angular2-qrcode` package.

The QR code scanner will be displayed with these directives whenever this component is triggered.

This directive has a couple of attributes that can be used to customize the QR scanner. For example, you can set the width and height of the scanner as follows:
```html
<qr-code [width]="300" [height]="300"></qr-code>
```

We can customize it further by setting its value to a string. For instance, you can set the value of the QR code as follows:
```html
<!--Add this to qr-code-scanner.component.html-->
<!--BEGIN the qr code -->
<qr-code [value]="'www.section.io'"></qr-code>
<!--END the qr code -->
```

You notice that we use the `<qr-code></qr-code>` tag to display the QR code in the above code.

The `[value]` attribute is used to set the value of the QR code. In this case, we have set the value to [www.section.io](www.section.io).

To test the QR code scanner, we can run the following command if you haven't started your Angular application yet:
```bash
cd quick-response-code-crash-course
ng serve
```

Next, visit the `http://localhost:4200` URL in your browser.

When you execute the above code, you will notice that a QR code is displayed, as shown in the screenshot below:

![QR-Code](/engineering-education/angular-crash-course-qr-code/qr-code.png)

### Setting up the quick response code for an angular app
In the previous section, we created a new component called `QrCodeScannerComponent` that we used to display the QR code scanner.

This section will learn how to customize the QR code scanner to meet our needs, such as user authentication.

The `<qr-code>` above has the value attribute, which we can use to set the value of the QR code.

Let's proceed and create a public data property called `qrCodeValue` in the `qr-code-scanner.component.ts` file as shown below:
```typescript
// import the component from the core module
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent implements OnInit {
  //add the property to hold the qr values
  qrCodeValue = null;
  constructor() { }

  ngOnInit() {
    // on page load, start the scanner
    this.setQRData();
  }

  /**
   * Add a method to generate a QR code
   */
  setQRData() {
    const items = [{
      'First Name': 'John',
      'Last Name': 'Doe',
      'Author At': 'www.section.io',
      'email': 'johndoe@test.io',
      'Top Article': 'Angular Scanner',
      'Years Of Experience': '3 years',
    }];
    this.qrCodeValue = JSON.stringify(items);
  }
}
```

In the above script, we first import the required dependencies. We then create a public data property called `qrCodeValue` and set its value to `null`.

We then add the `ngOnInit()` to initialize our component with the QR data. Finally, we call the `setQRData()`  method to set the QR code value.

In this method, we create an array called `items` and add a dummy to it.

Now that we have the data, we need to add the following code to the `qr-code-scanner.component.html` file:

```html
<qr-code
  [value]="qrCodeValue"
  background="#9DD0FF"
  foreground="#0084FF"
  size="400"
>
</qr-code>

```

We set the `[value]` property to the `qrCodeValue` property in the above code. This is the value defined in the controller that will be displayed in the QR code.

![Final Output](/engineering-education/angular-crash-course-qr-code/output.png)

### Configure the QR code scanner for authentication
Now that we have the QR code scanner working, we need to configure it to work for authentication.

QR authentication is on the rise, becoming more and more popular. This is attributed to the fact that QR codes offer a balance of security and convenience.

To use QR in Angular, create a user object that will hold the user information.

Following the previous example, store this value in the `qrCodeValue` property.

Next, use your smartphone to scan the QR code and see if you can authenticate the user.

> To scan the QR codes, you can use the [Google Authenticator](https://support.google.com/accounts/answer/1066447?hl=en) app or any other QR code scanner app.
> You may also need a backend server to validate and store the user information upon successful scan.

### Containerize the QR code scanner application
Create a `Dockerfile` file in the `quick-response-code-crash-course` root directory and add the following:
```dockerfile
FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /QR
COPY package.json ./
RUN npm install
COPY . .
# Generate the Build of the angular application
RUN npm run build

EXPOSE 4200
CMD [ "http-server", "dist" ]
```

In the above Dockerfile, we use the official node image as the base image, install the `http-server` package, and copy the `package.json` and `.` directory to the root directory.

Next, we run the `npm install` command to install the dependencies.

Finally, we run the `npm run build` command to build the application and then expose the port `4200` to the host machine.

### Conclusion
This article has covered how to install and configure the quick response code.

We have also covered how to use the quick response code in our application.

We have seen how we can generate these QR codes for user authentication. You can improve your skills by implementing the QR code backend for an end-to-end test.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

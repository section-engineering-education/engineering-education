Quick Response code crash course using Angular 12
### Introduction
User authentications plays a vital role when it comes to securing your application. In addition to the exisiting authentication methods, Angular 12 comes with another simple yet powerful tool, the Quick Response code.

In this tutorial, we will learn how to use the Quick Response code to create a quick response code that can be used to authenticate users on an Angular SPA.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the angular project](#setting-up-the-angular-project)
- [Quick response codes in angular](#quick-response-codes-in-angular)
- [Integrating the quick response code](#integrating-the-quick-response-code)
- [Setting up the quick response code for angular app](#setting-up-the-quick-response-code-for-angular-app)
- [Conclusion](#conclusion)

### Prerequisites
To follow this tutorial, you will need to have the following:
- Basic knowledge of JavaScript or TypeScript
- Basic knowldge of Angular 2+. In this tutorial, we will be using Angular 12.
- An IDE locally installed. We will be using the WebStorm IDE for this course.
- Angular CLI installed. However, you may build the Angular file structure from ground up.

### Objectives
By the end of this tutorial, you will able to:
- Create a quick response code that can be used to authenticate users on an Angular SPA.
- Setup the quick response code to work with the Angular CLI.
- Build an Angular project from scratch.
- Deploy the application to a production environment.
- Containairize the application using docker.

### Setting up the angular project
In this tutorial, we will be using the Angular CLI to build an Angular project from scratch.

To create an Angular project, you will need to run the following command:
```bash
ng new quick-response-code-crash-course
```

The above command will create a new Angular project called quick-response-code-crash-course within the current directory.

Next, `cd` into the project root and run the following command:
```bash
ng serve
```

The above command starts your Angular application on the default port `4200`. However, you can change the port by running the following command:

```bash
ng serve port <port>
```

Open your browser and navigate to `http://localhost:4200`. You will notice that your application is loading.

Now that we've setup the Angular project, we can start working on the quick response code.

In the next section, we will understand how QR codes works and install the necessary packages.

### Quick response codes in angular
As discussed previously, quick response codes are a simple way to authenticate users on an Angular SPA.

Quick response codes are kind of barcode that can be read by a digital device(camera). These information is then stored on the device and can be used to authenticate users.

QR codes are have a great advantage over other authentication methods. They are easy to read and they are easy to scan.

To use this scanner, you will need to install the following packages:
- [NPM](https://npm.org/)
- [Angular QR Code](https://www.npmjs.com/package/angular2-qrcode)

Now let's proceed and install these packages as follows:
```bash
cd quick-response-code-crash-course
npm i angular2-qrcode
```

The above package is added to you `package.json` file as shown below:
```json
...
"@angular/router": "~7.2.0",
"angular2-qrcode": "^2.0.3",
"core-js": "^2.5.4",
...
```

> At the time of this writing, the latest version of [Angular QR Code](https://www.npmjs.com/package/angular2-qrcode) is `2.0.3`. This may be different from your version.

Now that we've the packages installed, we can start using the quick response code. Let's start by adding this package to our `app.module.ts` file:
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
  providers: [],
  bootstrap: [//...add the bootstrap components]
})
export class AppModule { }
```

### Integrating the quick response code
Now that we have configured the quick response code, we can start integrating it into our application. 

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

Now, we need to add the following code to the `qr-code-scanner.componen.html` file:
```html
<!--BEGIN the qr code -->
<qr-code [value]="'www.section.io'"></qr-code>
<!--END the qr code -->
```

You notice that in the above code, we use the `<qr-code></qr-code>` tag to display the QR code. The `[value]` attribute is used to set the value of the QR code.

When you execute the above code, you will notice that a QR code is displayed as shown in the screenshot below:

![QR-Code](/engineering-education/angular-crash-course-qr-code/images/qr-code.png)

### Setting up the quick response code for angular app
Now that we have seen how we can install and configure our quick response codes, in this section, we will be setting up the quick response code to work with the Angular app.

The `<qr-code>` above has the value property which we can use to set the value of the QR code.

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

In the above code, we are setting the `qrCodeValue` property to a JSON string. This is the value that will be displayed in the QR code.

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

In the above code, we are setting the `[value]` property to the `qrCodeValue` property. This is the value defined in the controller that will be displayed in the QR code.

![Final Output](/engineering-education/angular-crash-course-qr-code/final-output.png)

### Conclusion
In this article, we have covered how to install and configure the quick response code. We have also covered how to use the quick response code in our application.

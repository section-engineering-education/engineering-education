JSON Web Token (JWT) is an RFC standard that defines a compact way of securing
the data transmitted between the parties as a JSON object. The information is
digitally signed, meaning and it can then be verified and signed. JWTs are
signed using a secret key or a public/private key pair using RSA/ECDSA
algorithms. In this guide, I will use a secret key.

## Prerequisites

To accomplish the task using this guide, you will need:

-   Basic knowledge of [Node.js](https://nodejs.dev/learn), [Angular 8](https://www.javatpoint.com/angular-8) and [JWT](https://jwt.io/introduction)

-   A text editor, in this guide, I will be using [Visual Studio Code](https://code.visualstudio.com/download).

-   Installed [Node.js](https://nodejs.org/en/) with related libraries

-   A working web browser, in this guide, I am using [Google Chrome](https://www.google.com/chrome/?brand=BNSD&gclid=CjwKCAiAjeSABhAPEiwAqfxURVdP9BRCdHOo148tJef3jdCdPGNhZh5yqStpNbQzAjS3jnUkcdC8jxoCTGgQAvD_BwE&gclsrc=aw.ds).

-   [Postman tool](https://www.postman.com/downloads/) installed

## Reason for using JSON Web Tokens

The main reason for using JWT is that it ensures the integrity of the
information exchanged between parties is verified, in this case between a client
and server, and authorized. In case of any breach, the session will expire since
the token will not verify.

## How the app will work

The app will use Angular on the front end and the Node.js server on the backend.
On the front end, I will create an [interceptor](https://itnext.io/understanding-angular-interceptors-405b84d7ad69); this will ensure that any HTTP
Request sent from Angular is broke down, cloned, and a token is added to it
before been sent.

All requests received are broken down, cloned, and a token extracted and
verified on the backend. If verification is successful, the request will then be
sent to its handler to send a response. Otherwise, on unsuccessful verification,
any other requests are rejected, and 401 Unauthorized status is sent back to
Angular, where all the requests are checked for a 401 status. If there are such
requests, the token stored will be removed, and the user is signed out of all
the sessions and sent back to the login page.

## Creating Angular App

Before creating the Angular App, download Node.js then install it into your
system. Then create a root folder in your system and browse to that folder using
cmd. Then you run the following command:

```javascript
ng new angFrontend
```

The command will create an angular app in your root folder with a new subfolder
named the same as the app's name; in this case, it will be *angFrontend*, which
will come with preinstalled libraries modules a typical angular app requires.

## Creating an Interceptor

Then next would be creating the interceptor; first, browse to the folder where
the angular app was created, then run the following code in the command prompt
to achieve that:

```javascript
ng generate service AuthInterceptor
```

Inside the subfolders created when creating an Angular App, I will then browse
the file located in the location *src/app/app.module.ts*

Then edit the file named *app.module.ts*, as shown, this is to ensure that I
import the HTTP Module for HTTP Calls and make the interceptor that has just
been created to be a provider and so it will have global access to all HTTP
Calls.

```javascript
//the modules required by the app are imported here
import { BrowserModule } from '@angular/platform-browser'; // this ensures the application will run on the browser
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module'; //ensures the application have routing capabilities

import { AppComponent } from './app.component'; //made present for bootstrapping application on the launch

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';//enables the application to communicate with the backend services
import { AuthInterceptorService } from './auth-interceptor.service';//this will allow the app to automatically attach authorization information to requests
import { HomeComponent } from './home/home.component';//implements the home route

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next will be to browse and edit the interceptor service class located at
*src/app/auth-interceptor.service.ts* and make the changes as follows:

```javascript
import { Injectable } from '@angular/core';//imports the class that provides local storage for token
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); //Interception Stage
    const token: string = localStorage.getItem('token');
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //Catching Error Stage
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")
                }
                const err = error.error.message || error.statusText;
                return throwError(error);                    
           })
        );
  }  
}

```

**Interception Stage Code Explanation**

In authentication, the token obtained from the server is stored locally. Then
will be retrieved from local storage and the header *httpRequest req* cloned and
Authorisation, Bearer: token header is added into it. Then the token is sent in
the httpRequest header.

**Error Stage Code Explanation**

In case of an error response or 401, 402, etc., error status, the pipe will help
catch the error, and the user will not authenticate due to a bad request or
Unauthorized Request. The error in the call is returned to the frontend in case
there are further error requests.

## Creating Backend

I will start by creating a directory in the root folder for the server and type
*npm init* -y to initialize it as a node project as shown:

```javascript
mkdir node_server
cd node_server
npm init –y
```

The necessary libraries are required to be installed within the created folder
by running the command below:

```javascript
npm i -S express cors body-parser express-jwt jsonwebtoken
```

Then an **app.js** in the node_server folder is created, below is the code for
the app and boiler code:

```javascript
const express       = require('express')
const bodyParser    = require('body-parser');
const cors          = require('cors');

const app           = express();
const port          = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.get('/', (req, res) => {
    res.json("Hello World");
});

/* more code to be added later */


/* the listen function */
app.listen(port, function() {
    console.log("Listening to " + port);
});
```

Next, I will create a route where a token is generated, and it will be where the
user authenticates. On successful authentication, the token is sent.

```javascript
//SECRET FOR JWT
let secret = 'some_secret';

/* Create token to be used */
app.get('/token/sign', (req, res) => {
    var userData = {
        "name": "My Name",
        "id": "1234"
    }
    let token = jwt.sign(userData, secret, { expiresIn: '15s'})
    res.status(200).json({"token": token});
});
```

Since the route has been created, and stored the user data, and encoded when
decoded, it will give back the user data, in this case only user name and id,
since storing a password is never a good practice

Next will be to run the app.js application and check the token generated as
demonstrated below:

```javascript
node app.js
Listening to 3000
```

In this guide, I will use the postman tool to test the routes I just have
created, as shown below:

![first web token](/articles/getting-started-with-jwt-using-angular8-and-nodejs/token-generation1.png)

As of now, I have generated the first web token.

To illustrate this, I will create a path1 and secure it using my JSON Web Token.

For this task, I will be using the express-jwt function.

```javascript
app.get('/path1', (req, res) => {
    res.status(200)
        .json({
            "success": true,
            "msg": "Secrect Access Granted"
        });
});
```

Using expressJWT function:

```javascript
//This is to allow access to the path with no token authentication
app.use(expressJWT({ secret: secret})
    .unless(
        { path: [
            '/token/sign'
        ]}
    ));
```

In the next step, I will be trying to access the path without a token sent in
the header using the postman tool.

![401 Error](/articles/getting-started-with-jwt-using-angular8-and-nodejs/401-unauthorized.png)

On trial, the app did not allow me to access the path, the error 401
Unauthorized was displayed as expected. Next will be to test it with the token I
first obtained from the token/sign route as show below:

```javascript
app.get('/path1', (req, res) => {
    res.status(200)
        .json({
            "success": true,
            "msg": "Secret Access Granted"
        });
});
```

On adding the Bearer Token, the success message is displayed as shown below:

![success message](/articles/getting-started-with-jwt-using-angular8-and-nodejs/success-token.png)

Heading back to Angular, I will create a new component home by running the
following command:

```javascript
ng generate component home
```

Modifying my home.component.ts located at *src/app/home/home.component.ts*  as
below:

```javascript
signIn() {
    this.http.get(this.API_URL + '/token/sign')
      .subscribe(
        (res) => {
          console.log(res);
          if (res['token']) {
            localStorage.setItem('token', res['token']);
          }
        },
        (err) => {
          console.log(err);
        }
      );    
  }

  getPath() {
    this.http.get(this.API_URL + '/path1')    
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );       
  }

```

The *signIn()* function in the above code requests a token a stores it into local
storage, while the second *getPath()* function is for requesting the path.

Coding a simple HTML page to test the two functions above, I will browse to */src/app/home/home.component.html* and code the below: 

```HTML
<h3>JSON Web Test</h3>

<button (click)="signIn()">Sign In</button>
<button (click)="getPath()">Get Path 1</button>
```

To run an Angular project on the browser, I will browse the project folder
using **cmd** and run the command *ng serve*. The command will compile the whole Angular project and launch the page on the browser. Press F12 on the keyboard to open developer tools console window and then click on the **Sign In** button to get a token as explained above, then click on the **Get Path1** Button to access the path as shown below:

![web test success](/articles/getting-started-with-jwt-using-angular8-and-nodejs/webtest-success.png)

To lose the local storage token, I will refresh the browser, and then I will try
to access the path as shown below:

![web test error](/articles/getting-started-with-jwt-using-angular8-and-nodejs/webtest-error.png)

As it is now, we have successfully gotten a 401 Unauthorized, meaning the
application is now secure.

## Conclusion

Using JSON Web Tokens, the app is now secure since the services and any
communication between the server and the app is also secure. This guide has also
helped the reader implement the JSON Web Token in Angular 8 and Node.js. This
contribution will help anyone to secure their applications and make them ready
for production.

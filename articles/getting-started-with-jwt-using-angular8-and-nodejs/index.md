JSON Web Token (JWT) is an RFC standard that ensures data transmitted between a client and a server as a JSON object is secured. The information is digitally signed, meaning and it can then be verified and signed. JWTs are signed using a secret key or a public/private key pair using RSA/ECDSA algorithms. This guide uses a secret key.

### Prerequisites

To accomplish the task using this guide, you will need:

- Some knowledge of [Node.js](https://nodejs.dev/learn), [Angular 11](https://www.techiediaries.com/angular-11-crud-rest-api-tutorial/) and [JWT](https://jwt.io/introduction)

- A text editor, I will be using [Visual Studio Code](https://code.visualstudio.com/download).

- [Node.js](https://nodejs.org/en/) with related libraries installed.

- A web browser, in this guide, I will be using [Google Chrome](https://www.google.com/chrome/).

- [Postman](https://www.postman.com/downloads/) installed

## Reason for using JSON Web Tokens

The main reason for using JWT is that it ensures the integrity of the information exchanged between parties, in this case a client and a server. The data can then be verified and authorized. The session expires based on time upon unsuccessful token verification.

## How the app works

The app will use Angular on the frontend and Node.js as the server .ie. the backend. On the frontend, I will create an [interceptor](https://itnext.io/understanding-angular-interceptors-405b84d7ad69). All HTTP Request sent from the frontend will be broken down and duplicated by the Interceptor. Then a token is added to it before being sent.

All requests received are broken down, cloned, and a token extracted and verified on the backend. Upon successful verification, the request is then sent to its hander, and a response is sent. Otherwise, on unsuccessful verification, any other requests are rejected, and `401 Unauthorized` status is sent back to Angular. Here all the requests are checked for a 401 status. If there are such requests, the stored token will be removed. The user is then signed out of all the sessions and sent back to the login page.

## Creating the Angular App

Before creating the Angular App, download Node.js then install it into your system. Then create a base folder in your system and browse to that folder. Then, run the following command:
```bash
$ ng new angFrontend
```
The command will create an angular app in your base folder with a new subfolder named the same as the app's name. In this case, it will be `angFrontend`. It comes with preinstalled libraries a typical angular app requires.

## Creating an Interceptor

Next, we will be creating the interceptor. First, browse to the folder where the angular app was created and run the following command to achieve that:
```bash
$ ng generate service AuthInterceptor
```
Then, navigate to `src/app` and edit the file `app.module.ts`, as shown below. This is to ensure that I import the HTTP Module for HTTP calls.  And to also make the interceptor that has just been created to be a provider and so that it will have global access to all HTTP Calls.
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

Next, edit `src/app/auth-interceptor.service.ts` to look like shown below:

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
    const token: string = localStorage.getItem('token');//This retrieves a token from local storage
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });//This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
 
    return next.handle(req)
        .pipe(
           catchError((error: HttpErrorResponse) => {
                //Catching Error Stage
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")//in case of an error response the error message is displayed
                }
                const err = error.error.message || error.statusText;
                return throwError(error);//any further errors are returned to frontend                    
           })
        );
  }  
}

```
### Interception Stage Code Explanation

In authentication, the token obtained from the server is stored locally. Then will be retrieved from local storage and the header `httpRequest req` cloned and Authorisation, Bearer: token header is added into it. Then the token sent in the httpRequest header.

### Error Stage Code Explanation

In case of an error response or 401, 402, etc., error status, the pipe will help catch the error. The user will not authenticate due to a bad request or Unauthorized Request. The error in the call is returned to the frontend in case of further error requests.

## Creating the Backend

I will start by creating a directory in the base folder for the server and initialize it as a node project by running the following commands.
```bash
$ mkdir node_server
$ cd node_server
$ npm init –y
```
The necessary libraries ([express](https://www.npmjs.com/package/express), [body-parser](https://www.npmjs.com/package/body-parser), [express-jwt](https://www.npmjs.com/package/express-jwt)) are required to be installed. Install them by running the command below:
```bash
$ npm i -S express cors body-parser express-jwt jsonwebtoken
```
After running the command above, a new file `app.js` containing the code below is created.
```javascript
const express       = require('express')
const bodyParser    = require('body-parser');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');
var expressJWT      = require('express-jwt');

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
Next, I will create a route where a token is generated, and it will be where the user authenticates. On successful authentication, the token is sent. Below code is added to the file `app.js`.
```javascript
//SECRET FOR JWT
let secret = 'some_secret';//a secret key is set here

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
Once the route has been created, it stores the user data and encodes the data. When decoded, it will give back the user data, in this case only username and id, since storing a password is never a good practice. Next will be to run the application and check the token generated by running:
```bash
$ node app.js
```
In this guide, I will use Postman to test the routes as shown below.

![first web token](/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/token-generation1.png)

As of now, I have generated the first web token. Next, I will create a `/path1` and secure it using my JSON Web Token.

For this task, I will be using the express-jwt function as below:

```javascript
//This is to allow access to the path with no token authentication
app.use(expressJWT({ secret: secret, algorithms: ['HS256']})
    .unless(
        { path: [
            '/token/sign'
        ]}
    ));
```
Next, I will be testing the path using Postman, with no token sent in the header.

![401 Error](/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/401-unauthorized.png)

The app did not allow me to access the path, the error `401 Unauthorized` was displayed as expected. The code below will use the token I first obtained from the `/token/sign-in` route.
```javascript
//upon successful token authentication, access to path1 is granted
app.get('/path1', (req, res) => {
    res.status(200)
        .json({
            "success": true,
            "msg": "Secret Access Granted"
        });
});
```
On adding the Bearer Token, the success message is displayed as shown below:

![success message](/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/success-token.png)

Back to Angular, I will create a new component `home` by running the following command:
```bash
$ ng generate component home
```
Then modify `home.component.ts` located at `src/app` to look as shown below:
```javascript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

signIn() {
    this.http.get(this.API_URL + '/token/sign')
      .subscribe(
        (res) => {
          console.log(res);
          if (res['token']) {
            localStorage.setItem('token', res['token']);//token here is stored in a local storage
          }
        },
        (err) => {
          console.log(err);
        }
      );    
  }

  getPath() {
    this.http.get(this.API_URL + '/path1')//path1 is then requested    
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );       
  }
}

```
The `signIn()` function in the above code requests a token and stores it into local storage, while the second `getPath()` function requests the path. Then I will write a simple Html page to test the two functions above. Create a new file `src/app/home/home.component.html` and add the code below: 
```html
<h3>JSON Web Test</h3>

<button (click)="signIn()">Sign In</button>
<button (click)="getPath()">Get Path 1</button>
```
To run the Angular project, browse to the project folder and run the command `ng serve` on a terminal. The command will compile the whole Angular project and launch the page on the browser. Press `F12` to open developer tools console window. Then click on the **Sign In** button to get a token as explained above, then click on the **Get Path1** Button to access the path as shown below:

![web test success](/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/webtest-success.png)

To clear the local storage token, I will refresh the browser, and then I will try to access the path as shown below:

![web test error](/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/webtest-error.png)

As you can see, we have  a `401 Unauthorized`, meaning the application is now secure.

## Conclusion

Using JSON Web Tokens, the app is now secure since the services and any communication between the server and the app is also secure. This tutorial guides on how to implement the JSON Web Token in Angular 11 and Node.js. This will help anyone to secure their applications and make them ready for production.

The code used in the whole guide can be retrieved at (https://github.com/ephnjor2021/Angular11Project)

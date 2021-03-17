---
layout: engineering-education
status: publish
published: true
url: /engineering-education/creating-countdown-in-php-javascript-mysql/
title: Angular 11 - JWT Authentication Example & Tutorial With PHP
description: This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backednd service in PHP.  
author: miller-juma
date: 2021-03-12T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/jwt-auth-angular/hero.jpg
   alt: PHP RESTful apis  angular auth example image
---


A user is usually authenticated by entering a username or email address and password and then being given access to various resources or services. By its very existence, authentication relies on maintaining the user's state. This seems to go against HTTP's fundamental property of being a stateless protocol.  

One solution to this problem is JSON Web Tokens. Your Angular app will communicate with a backend that generates tokens. The Angular app can then send the token to the backend as an Authorization header to show they're authenticated. The JWT should be checked by the backend, and access should be granted based on its validity.  

This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backednd service in PHP.    
 
### Implement a JWT Server and Client with PHP and Angular 11
In this part, I'll show you how to use PHP in conjunction with an Angular 11 client to implement JWT authentication. Even though the principle is clear, the implementation necessitates familiarity with security best practices.  

The example provided here is incomplete, and it lacks several features that a production server would have. I'd therefore not recommend the source code in this tutorial for production purposes.    

I'll assume you're familiar with MySQL, Angular, and PHP and have installed [composer](https://www.composer.org) installed in the development environment.     


### Building a JWT authentication 
To begin implementing the server that authenticates users using JSON Web Tokens, open a terminal and create a directory called `jwt-server` that will contain the server application.  

### Step 1:  Database preparation
If you have all of the prerequisites, let's get started by creating a MySQL database. The MySQL client that came with the server will be used. To invoke the client, open a terminal and type the following command:  

```bash 
    $ mysql -u root -p
```
Depending on your MySQL configurations, enter the password when prompted.  
On the window presented, run the following command to create a database.  

```bash
    mysql> create database jwt-database;
```
> It's important to note that we're assuming you have a MySQL user named root. This must be replaced with an existing MySQL user's name. To build the database and SQL tables, you can use phpMyAdmin or any other MySQL client that you are familiar with.

Let's now pick the `jwt-database` we created earlier and create a users table to store our application's users:  

```bash 
mysql> use jwt-database;
mysql> CREATE  TABLE IF NOT EXISTS `jwt-users` (
  `user_id` INT  AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(150) NOT NULL ,
  `last_name` VARCHAR(150) NOT NULL ,
  `username` VARCHAR(150) NOT NULL ,
  `email_address` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,

```

Now, `cd` into the directory we created earlier by running the following command:  

```bash
    cd jwt-server
```
>NOTE: Depending on your development environment, this path may differ.

### Connecting to your database

In your working directory, create a folder `config` inside the `api` directory.  

```bash 
cd api && mkdir config
````
Then,

```bash 
cd config
```

```php
<?php
// used to get mysql database connection
class DB_Connection
{

    private $db_host     = "localhost"; //change to your  host
    private $db_name     = "jwt-database";//change to your db
    private $db_username = "root"; //change to your db username
    private $db_password = ""; //enter your password

    private $conn;// db connection

    public function db_connect(){

        $this->conn = null;

        try
        {
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

           //echo "connected";

        }
        catch(PDOException $e){
            echo "Error while establishing db connection " . $e->getMessage();
        }

        return $this->connect;
    }
}
?>
```
### Step 2: Install `php-jwt` package

Now, let's use Composer to build the php-jwt library. Run the following command from the root of your project's directory in your terminal:  

```bash
$ composer require firebase/php-jwt
```
The php-jwt library will be downloaded into a vendor folder.

Using the following code, you can encode and decode JWT tokens using the php-jwt library:


```php
<?php 
require "vendor/autoload.php";
use \Firebase\JWT\JWT;
```

### Step 3: User registration API endpoint
Create a `register.php` file in the `api` folder we created earlier and apply the following code to it to create a new user in the MySQL database:  

```php
<?php
include_once './config/database.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$first_name = '';
$last_name = '';
$email_address = '';
$password1 = '';
$connection = null;

$dbService = new DB_Configuration();
$connection = $databaseService->getConnection();

$api_data = json_decode(file_get_contents("php://input"));

$first_name = $api_data->firstName;
$last_name = $api_data->lastName;
$email_address = $api_data->email;
$password = $api_data->password;

$db_table = 'Users';

$query = "INSERT INTO " . $db_table . "
                SET first_name = :fname,
                    last_name = :lname,
                    email = :emailAdress,
                    password = :pwd";

$stmt = $conn->prepare($query);

$stmt->bindParam(':fname', $first_name);
$stmt->bindParam(':lname', $last_name);
$stmt->bindParam(':email', $email_address);

$hashedPassword= password_hash($password, PASSWORD_BCRYPT);

$stmt->bindParam(':password', $hashedPassword);


if($stmt->execute()){

    echo json_encode(array("success" => "true"));
}
else{
    
    echo json_encode(array("success" => "false"));
}
?>

```
### User sign-in API endpoint
Inside the `api` directory, make a `signin.php` file and add the  code below to check the client qualifications and return a JWT token to the customer:  

Create a `signin.php` file inside the `api` directory with the following code to check the user credentials and return a JSON Web Token to the client,mostly likely, a web browser:  

```php
<?php
include_once './config/database.php';
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$email_address = '';
$password = '';

$dbService = new DB_Connection();
$connection = $dbService->db_connect();



$api_data = json_decode(file_get_contents("php://input"));

$user_email = $api_data->email_address;
$password = $api_data->password;

$table = 'Users';

$sql = "SELECT user_id,first_name, last_name,`password` FROM " . $table . " WHERE email_address =:email  LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(':email', $email_address);
$stmt->execute();
$numOfRows = $stmt->rowCount();

if($numOfRows) > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $user_id    = $row['id'];
    $first_name = $row['first_name'];
    $last_name = $row['last_name'];
    $pass       = $row['password'];

    if(password_verify($password, $pass))
    {
        $secret_key = "MillerJumaWilliam";
        $issuer_claim = "localhost"; 
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // time issued 
        $notbefore_claim = $issuedat_claim + 10; 
        $expire_claim = $issuedat_claim + 60; 

        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "firstName" => $first_name,
                "lastName" => $last_name,
                "userEmail" => $email_address
        ));

        $jwtValue = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "success" => "true",
                "jwt" => $jwtValue,
                "email" => $email_address,
                "expireAt" => $expire_claim
            ));
    }
    else{
        echo json_encode(array("success" => "false"));
    }
}
?>

```
You can describe the token's data structure however you like, for example (you can add only the user's email or ID or both with some additional details such as the user's name), but certain reserved JWT statements should be specified properly because they affect the token's validity, such as:  

iat - the time stamp of the token's issuance.

iss - A string containing the issuer application's name or identifier. It may be a domain name, and it'll be used to get rid of tokens from other apps.

nbf - The time at which the token should be considered legitimate. Should be the same as or higher than iat. The token will be valid for 10 seconds after it is released in this situation.  

exp - When the token can stop being valid, this is the timestamp. It must be higher than iat and nbf. The token in our example will expire 60 seconds after it is released.

These statements are optional, but they help decide a token's validity.  

We added the first name, last name, email, and user ID from the database to our JWT payload, which is within the data argument. In the JWT payload, you should not provide any confidential information.  

The `JWT::encode()` method converts the PHP array to JSON format, signs the payload, and then encodes the final JWT token before sending it to the client. We simply hardcoded the secret key that will be used to sign the JWT payload in our example, but in production, you can use a secret key that is a long, binary string and store it in a configuration file.   

For registering and logging in users, we now have two RESTful endpoints. You can now communicate with the API using a REST client such as Postman.

To begin, run the following command to start your PHP server:  

```bash
$ php -S 127.0.0.1:8000
```
From the address 127.0.0.1:8000, a development server will be running.  

Now that we have a fully functional REST API with a jwt token, let's proceed and create our angular project.  

### Setting up angular project to consume PHP auth endpoints
>It's worth noting that this tutorial does not teach you how to set up an angular project, for more information, visit [angular](https://angular.io/guide/setup-local).  

In your new angular project, run the following command to create `authService` service: 
```bash
$ ng generate service auth
```
The auth service is used to sign in and sign out of the Angular app, as well as to alert other components when a user logs in and out and to give access to the currently logged-in user.  

In your newly generated service, copy and paste the following code snippets: 

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
    public baseUrl = "localhost:8000";
    private loggedUserSubject: BehaviorSubject<User>;
    public loggedInUser: Observable<any>;

    constructor(private httpClient: HttpClient) {
        this.loggedUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loggedInUser')));
        this.loggedInUser = this.loggedUserSubject.asObservable();
    }

    public get loggedInUserValue(): any {
        return this.loggedUserSubject.value;
    }

    loginUser(emailAddress: string, password: string) {
        return this.http.post<any>(`${baseUrl}/`, { emailAddress, password })
            .pipe(map(response=> {
                localStorage.setItem('loggedInUser', JSON.stringify(response));
                this.loggedUserSubject.next(response);
                return response;
            }));
    }

    logoutUser() {
        // remove user from local storage to log user out
        localStorage.removeItem('loggedInUser');
        this.loggedUserSubject.next(null);
    }
}
```
In the auth service above, as the user logs in and out of the system, RxJS Subjects and Observables are used to store the current user object and inform other components.  

To be informed of changes, Angular components will `subscribe()` to the public `loggedInUser: Observable` property, and updates are sent when the `this.loggedUserSubject.next() `method in the `loginUser()` and `logOut()` methods is called, passing the argument to each subscriber.  

Regular Subjects don't store the current value and only emit values that are published after a subscription is established, while the `RxJS BehaviorSubject` keeps track of the current value and emits it to any new subscribers as soon as they subscribe.  

### Set up login component
Now that we've got a service to query our PHP endpoint, let's proceed and create a login component to test our code by running the following command:  

```bash
$ ng g c login
```

A login form with an email address and password fields is included in the login component template. When the submit button is pressed, it shows validation messages for any incorrect fields. The login component's `onSubmit()` method is bound to the form submit button.  

In your new component template, copy and paste the following piece of code:  
```html
<div class="col-md-6 offset-md-3 mt-5">

    <div class="card">
        <h4 class="card-header">Authentication Form</h4>
        <div class="card-body">
            <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="username">Email Address</label>
                    <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && form.email.errors }" />
                    <div *ngIf="submitted && form.email.errors" class="invalid-feedback">
                        <div *ngIf="form.email.errors.required">you email address is required</div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && form.password.errors }" />
                    <div *ngIf="submitted && form.password.errors" class="invalid-feedback">
                        <div *ngIf="form.password.errors.required">your password is required</div>
                    </div>
                </div>
                <button [disabled]="loading" class="btn btn-danger">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
                <div *ngIf="error" class="alert alert-warning mt-3 mb-0">{{error}}</div>
            </form>
        </div>
    </div>
</div>
```

The auth service is used by the login component to log into the application. The user is automatically redirected to the home page if they are already logged in.  

The `signinForm: FormGroup` object is used to access data entered into the form and specifies the form controls and validators. The `[formGroup]="signinForm"` directive connects the FormGroup to the login template above, which is part of the Angular Reactive Forms module.  

In your component, copy and paste the following code:  
```ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './service/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { 
        if (this.authService.loggedInUserValue) { 
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.signinForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }
    get form() 
    { 
        return this.signinForm.controls; 
    }

    onSubmit() {
        this.submitted = true;

        this.loading = true;
        this.authService.loginUser(this.form.email.value, this.form.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
```

### Store login token in local storage
Angular ships with HTTP [interceptors](https://angular.io/api/common/http/HttpInterceptor). We can use this feature to store our login token.  

If the user is logged in, the JWT Interceptor intercepts HTTP requests from the application and attaches a JWT auth token to the Authorization header.  

It's implemented with the HttpInterceptor class from the HttpClientModule; by expanding the HttpInterceptor class, you can build your custom interceptor to alter HTTP requests before they're sent to the server.  

In the provider's section of the app.module.ts file, HTTP interceptors are attached to the request pipeline.  

```ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './service/auth.module';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let loggedInUser = this.authService.currentUserValue;
        if (loggedInUser && loggedInUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedInUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
```

Now let's go ahead and add this script in our `app.module.ts`.  

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { tokenInterceptor} from 'helpers/tokenInterceptor';
import { DashboardComponent } from './dashboard';
import { LoginComponent } from './login';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true 
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
Well, let's start our angular application by running the following command:  

```bash
ng serve --open //starts on port 4200 by default unless you specfied otherwise
```
You can now make requests to our PHP endpoint and login while the generated token is stored in your browser's local storage.  

### Conclusion
You learned how to use JWT authentication in your Angular 11 framework in this tutorial.  
---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

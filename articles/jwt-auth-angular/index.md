---
layout: engineering-education
status: publish
published: true
url: /engineering-education/creating-countdown-in-php-javascript-mysql/
title: Angular 11 - JWT Authentication Example & Tutorial With PHP
description: This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backend service in PHP.  
author: miller-juma
date: 2021-03-17T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/jwt-auth-angular/hero.jpg
   alt: PHP RESTful APIs angular auth example image
---


A user is usually authenticated by entering a username or email address and password and then being given access to various resources or services. By its very existence, authentication relies on maintaining the user's state. This seems to go against HTTP's fundamental property of being a stateless protocol.  

Your Angular app will communicate with a backend that generates tokens. The Angular app can then send the token to the backend as an Authorization header to show they're authenticated. The JWT should be checked by the backend, and access should be granted based on its validity.  

This tutorial walks you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backend service in PHP.    
 
### Implementation
In this part, I'll show you how to use PHP in conjunction with an Angular 11 client to implement JWT authentication. Even though the principle is clear, the implementation necessitates familiarity with security best practices.  

The example provided here is incomplete, and it lacks several features that a production server would have. I'd therefore not recommend the source code in this tutorial for production purposes.    

I'll assume you're familiar with MySQL, Angular, and PHP and have installed [composer](https://www.composer.org) installed in the development environment.     

### Step 1:  Database preparation
Let's get started by building a MySQL database if you have all of the prerequisites. We'll use the MySQL client that came with the server. Open a terminal and type the following command to start the client:  

```bash 
    $ mysql -u root -p
```
Depending on your MySQL configurations, enter the password when prompted.  
On the window presented, run the following command to create a database.  

```bash
    mysql> create database jwt-database;
```

In the `jwt-database` we created earlier, create a table `jwt-users` as follows:  
```bash 
mysql> use jwt-database;
mysql> create table `jwt-users` (
  `user_id` int auto_increment primary key,
  `fname` varchar(40) ,
  `lname` varchar(40) ,
  `username` varchar(40) ,
  `email_address` varchar(40) unique,
  `password` varchar(40) not null,

```

Now, `cd` into the directory we created earlier by running the following command:  

```bash
    cd jwt-server
```
>NOTE: Depending on your development environment, this path may differ.

### Connecting to your database

In your working directory, create a folder `db_configurations` inside the `tokens-api` directory.  

```bash 
cd tikens-api && mkdir configurations
````
Then,

```bash 
cd configurations
```

```php
<?php
class DB_Connection
{

    private $db_host     = "localhost"; //change to your  host
    private $db_name     = "jwt-database";//change to your db
    private $db_username = "root"; //change to your db username
    private $db_password = ""; //enter your password

    private $conn;

    public function db_connect(){

        $this->conn = null;

        try
        {
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

        }
        catch(PDOException $e){
            echo "Error " . $e->getMessage();
        }

        return $this->connect;
    }
}

```
### Step 2: Install `php-jwt` package
With database configurations ready, proceed and run the following command to install PHP's token library:   
```bash
$ composer require firebase/php-jwt
```
The `php-jwt` library will be downloaded into a vendor folder inside the project folder.  

### Step 3: User registration API endpoint
Now that we have `php-jwt` library in our system, let's proceed and create a simple registration system.  In your current directory, add the following lines of code.  

```php
<?php
include_once './configurations/db.php';

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

$db = new DB_Configuration();
$connection = $db->db_connect();

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
Inside the `tokens-api` directory, make a `signin.php` file and add the  code below to check the client qualifications to access our backend services:    
To validate the user credentials and return a JSON Web Token to the client, build a `signin.php` file script within the `tokens-api` directory with the following code:    

```php
<?php
include_once './config/database.php';
require "../vendor/autoload.php";
//dont forget to add header configurations for CORS
use \Firebase\JWT\JWT;
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
                "message" => "success",
                "token" => $jwtValue,
                "email_address" => $email_address,
                "expiry" => $expire_claim
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

iss - The name or identifier of the issuer application in a string.   

nbf - The point in time when the token should be considered valid.  

exp - This is the timestamp for when the token can no longer be used.   

Within the data argument, we added the database's name, email, and id to our JSON Web Token payload. 

The `JWT::encode()` method converts the PHP array to JSON format, signs the payload, and then encodes the final JWT token before sending it to the client. In our example, we simply hardcoded the secret key that will be used to sign the JSON Web Token payload.  

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
        localStorage.removeItem('loggedInUser');
        this.loggedUserSubject.next(null);
    }
}
```
In the auth service above, as the user logs in and out of the system, RxJS Subjects and Observables are used to store the current user object and inform other components.  

To be informed of changes, Angular components will `subscribe()` to the public `loggedInUser: Observable` property, and updates are sent when the `this.loggedUserSubject.next() `method in the `loginUser()` and `logOut()` methods is called, passing the argument to each subscriber.  

Regular Subjects in an angular application don't store the values. Whats happens is that they only emit values that are published after a subscription is established, while the `RxJS BehaviorSubject` keeps track of the current value and emits it to any new subscribers as soon as they subscribe.  

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

The signinForm: FormGroup object defines the form controls and validators and is used to access data entered into the form. The [formGroup]="signinForm" directive links the FormGroup to the above-mentioned template from the Angular Reactive Forms module.  

In your component, copy and paste the following code:  
```ts
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { AuthService } from './service/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    signinForm: FormGroup;
    loading = false;
    submitted = false;
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

The JWT Interceptor intercepts HTTP requests from the application and adds a JWT auth token to the Authorization header if the user is signed in.  '

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
ng serve --open //starts on port 4200 by default unless you specify otherwise
```
You can now make requests to our PHP endpoint and login while the generated token is stored in your browser's local storage.  

### Conclusion  

You've learned how to use JWT authentication in your Angular 11 application with PHP RESTful APIs in this tutorial. Implement other authentication strategies such as token authentication in your Angular application.  

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

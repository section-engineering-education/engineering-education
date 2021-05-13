---
layout: engineering-education
status: publish
published: true
url: /jwt-auth-angular/
title: Angular 11 - JWT Authentication Example & Tutorial with PHP
description: This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backend service in PHP.  
author: miller-juma
date: 2021-03-19T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/jwt-auth-angular/hero.jpg
   alt: PHP RESTful APIs angular auth example image
---
A user is usually authenticated by entering a username, email address, and/or password and then being given access to various resources or services. By its very existence, authentication relies on maintaining the user's state. This seems to go against HTTP's fundamental property of being a stateless protocol.  
<!--more-->
Your Angular app will communicate with a backend that generates tokens. The Angular app can then send the token to the backend as an Authorization header to show they're authenticated. The JWT should be checked by the backend, and access should be granted based on its validity.  

This tutorial will walk you through the process of developing and implementing JWT-based authentication in an Angular 11 application step by step. This tutorial takes you a step further by developing a backend service in PHP.    
 
### Implementation
In this part, I'll show you how to use PHP in conjunction with an Angular 11 client to implement JWT authentication. Even though the principle is clear, the implementation necessitates familiarity with security best practices.  

The example provided here is incomplete, and it lacks several features that a production server would have. I'd therefore not recommend the source code in this tutorial for production purposes.    

I'll assume you're familiar with MySQL, Angular, and PHP. You should also have [composer](https://www.composer.org) installed in the development environment.     

### Step 1:  Database preparation
Let's get started by building a MySQL database if you have all of the prerequisites. We'll use the MySQL client that came with the server. 

Open a terminal and type the following command to start the client:  

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
  `fullname` varchar(40) ,
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
cd tokens-api && mkdir configurations
```

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

### Step 2: Install PHP token generator package  
PHP has a library JWT library that can be used to generate auth tokens to identify clients accessing the backend service.  
To install this PHP library in your system, you'll need a [composer](https://www.composer.org) installed. 

You can verify its installation by running the following command:

```bash
composer -v
```

Now, proceed and import the library by running the following command:  

```bash
$ composer require firebase/php-jwt
```

To allow for communication between our PHP backend and angular application, we need to set CORS headers.

Let's proceed and crearte a file `header.php` and add the following CORS scripts: 

```php
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

```

### Step 3: User registration API endpoint
Now that we have the `php-jwt` library in our system, let's proceed and create a simple registration system. In your current directory, add the following lines of code.  

```php
<?php
include_once './configurations/db.php';
include_once './header.php';

$full_name
$email_address = '';
$password1 = '';
$connection = null;

$db = new DB_Configuration();
$connection = $db->db_connect();

$api_data = json_decode(file_get_contents("php://input"));

$full_name = $api_data->full_name;
$email_address = $api_data->email;
$password = $api_data->password;

$query = "INSERT INTO " jwt_users . "
                SET full_name = :fname,
                    email = :emailAdress,
                    password = :pwd";

$stmt = $conn->prepare($query);

$stmt->bindParam(':fname',$full_name)
$stmt->bindParam(':email', $email_address);
$stmt->bindParam(':password', $password1);
$stmt->execute();
?>

```

### User sign-in API endpoint
Inside the `tokens-api` directory, make a `signin.php` file and add the code below to check the client qualifications to access our backend services.

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

You can describe the token's data structure however you like, but certain reserved JWT statements should be specified properly because they affect the token's validity.  

The `JWT::encode()` method converts the PHP array to JSON format, signs the payload, and then encodes the final token before sending it to the client i.e browser.

For registering and logging in users, we now have two RESTful endpoints. Let's test if our endpoints are working by running the following in the 'token-api` folder.    

```bash
cd tokens-api && php -S 127.0.0.1:8000 // to start our development server
```

Now that we have a fully functional REST API with a JWT token, let's proceed and create our angular project.  

### Setting up angular project to consume PHP auth endpoints
>It's worth noting that this tutorial does not teach you how to set up an angular project, for more information, visit the [angular docs](https://angular.io/guide/setup-local).  

In your new angular project, run the following command to create `authService` service: 
```bash
$ ng generate service auth
```

We'll use this service to sign users in and out of our angular application.  Let's add the following codes to our auth service.  
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
        getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser));
        this.loggedInUser = this.loggedUserSubject.asObservable();
    }

    loginUser(emailAddress: string, password: string) {
        return this.http.post<any>(`${baseUrl}/`, { emailAddress, password })
            .pipe(map(response=> {
                localStorage.setItem('loggedInUser', JSON.stringify(response));
                this.loggedUserSubject.next(response);
                console.log(response);
                return response;
            }));
    }

    logoutUser() {
        localStorage.removeItem('loggedInUser');
        this.loggedUserSubject.next(null);
    }
    public get loggedInUserValue(){
        return this.loggedUserSubject.value;
    }
}
```

In the auth service above, as the user signs in and out of the system, `RxJS Subjects` and `Observables` are used to store the current user.   

### Set up login component
Now that we've got a service to send HTTP requests to our PHP endpoint, let's proceed and create a login component to test our code by running the following command:  

```bash
$ ng g c login
```

In your new component template, copy and paste the following piece of code:  
```html
<div class="col-md-6 offset-md-3 mt-5">

    <div class="card">
        <h4 class="card-header">Authentication Form</h4>
        <div class="card-body">
            <form [formGroup]="signinForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="text" formControlName="email" class="form-control"/>
                    
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" formControlName="password" class="form-control"/>
                </div>
                <button class="btn btn-danger">
                   Sign In
                </button>
            </form>
        </div>
    </div>
</div>
```

The form we created above makes use of `Angular's Reactive Forms Module`. User information is sent to our component when a click event is fired.  

With our login template ready, in your `login.compnent.ts` file, add the following code snippets to get user inputs.  
It's in this script that the user's value is captured then sent to the API service we created earlier via our auth service. 

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './service/auth.service';

@Component({ 
templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit {
    signinForm: FormGroup;
    
    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {  }

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
        this.authService.loginUser(this.form.email.value, this.form.password.value)
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }
}
```

### Store login token in local storage
Angular ships with HTTP [interceptors](https://angular.io/api/common/http/HttpInterceptor). Any request will therefore be passed a token that will be used in our backend to verify user validity.  

Let's go ahead and create an interceptor for our application, `AuthInterceptor` by running the following command:  

```bash 
$ ng g interceptor auth
```

```ts
...
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.module';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loggedInUser = this.authService.currentUserValue;
        token = JSON.parse(localStorage.getItem(user.token));
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
```

Now let's go ahead and add this script in our `app.module.ts` to ensure that any requests we send are cloned and token attached.  

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { AuthInterceptor} from 'helpers/AuthInterceptor';
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
        DashboardComponent,
        LoginComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true 
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
In this tutorial we have learned how to use JWT authentication in our Angular 11 application with PHP RESTful APIs. We also implemented other authentication strategies such as token authentication in your Angular application.

Happy coding.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

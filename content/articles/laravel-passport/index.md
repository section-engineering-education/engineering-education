---
layout: engineering-education
status: publish
published: true
url: /laravel-passport/
title: Getting Started with Laravel Passport Authentication
description: This tutorial will go through Laravel passport authentication and how to secure APIs in a Laravel application using OAuth2.
author: miller-juma
date: 2021-07-14T00:00:00-09:00
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/laravel-passport/hero.png
   alt: Getting Started with Laravel passport authentication
---
Most systems nowadays require authentications to access resources. For example, user login or API resource access. In this tutorial, we will discuss the Laravel Passport package to authenticate your application APIs. The task includes the creation and validation of tokens.
<!--more-->
### Objectives
By the end of this tutorial, you should be able to create your Laravel application APIs and secure them using the Laravel passport package.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Installing `passport` package](#installing-passport-package)
- [Preparing passport](#preparing-passport)
- [Setting up models to use passport / Passport configurations](#setting-up-models-to-use-passport--passport-configurations)
- [Add authentication controller](#add-authentication-controller)
- [Add application authentication routes](#add-application-authentication-routes)
- [Testing our passport application](#testing-our-passport-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow this article along, the reader should have the following:
- Laravel 8 application installed in your development environment. Basic knowledge in Laravel is required to follow this post along.
- Postman application to test our application
- RESTful APIs. You should be familiar with `GET`, `PUT`, `POST`, `CREATE`, `DELETE` operations.

### Installing the 'passport' package
To install this package to your running application, run the following commands:  

> It's important to note that this is not an introduction to Laravel tutorial, for that you can refer to this [Laravel beginner article](/engineering-education/laravel-beginners-guide-blogpost/) to learn more about Laravel installation.

```bash
cd api-authentication-app

composer require laravel/passport

```

Output:

```bash
 -------------------------------------------------------     
  - Installing league/event (2.2.0): Downloading (100%)         
  - Installing lcobucci/jwt (4.1.4): Downloading (100%)         
  - Installing league/oauth2-server (8.2.4): Downloading (100%)         
  - Installing firebase/php-jwt (v5.4.0): Downloading (100%)         
  - Installing laravel/passport (v10.1.3): Downloading (100%)   //passport downloaded
----------------------------------------------- # omitted installations
```

### Preparing passport
`Passport` comes with the database setup to store its access tokens and 0Auth2 client activities. We should therefore run our migrations as follows to create tables:  

```bash
php artisan migrate
```

Output:

```bash
# This command generates tables for passport auth plus default Laravel tables
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (99.77ms)
----------------------------------- # omitted tables
Migrating: 2016_06_01_000001_create_oauth_auth_codes_table
Migrated:  2016_06_01_000001_create_oauth_auth_codes_table (209.35ms)
Migrating: 2016_06_01_000002_create_oauth_access_tokens_table
Migrated:  2016_06_01_000002_create_oauth_access_tokens_table (227.16ms)
Migrating: 2016_06_01_000003_create_oauth_refresh_tokens_table
Migrated:  2016_06_01_000003_create_oauth_refresh_tokens_table (124.49ms)
Migrating: 2016_06_01_000004_create_oauth_clients_table
Migrated:  2016_06_01_000004_create_oauth_clients_table (115.61ms)
Migrating: 2016_06_01_000005_create_oauth_personal_access_clients_table
Migrated:  2016_06_01_000005_create_oauth_personal_access_clients_table (85.12ms)
---------------------------------------- # omitted tables

```

Now that we jave our `passport` authentication tables, we need to set up `encryption keys` that we'll use in the application to generate secure `access tokens`.  

```bash
php artisan passport:install
```

Output:

```bash
# this command generates the encryption keys, personal access client, and password
# grant client which we'll use to generate the access tokens
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
# your client id 1 will be different from the output below
Client secret: KTIqQ7nwiIoJf9uxxxxxxxxxxxxxxxxxxxxxxxx
Password grant client created successfully.
Client ID: 2
# your client id 2 will be different from the output below
Client secret: 43x92qhcW4Itxxxxxxxxxxxxxxxxxxxxxxxxx

```

### Setting up models to use passport / Passport configurations
> We're performing these configurations on the `User` model to help us access user tokens. We'll therefore have the ability to authenticate them.  

We'll therefore add the `Laravel\Passport\HasApiTokens` trait to our Laravel generated User Model(`App/Models/User`).  

```php
<?php

namespace App\Models;

------------------------------------
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // our user table columns
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}

```

Next, update the `App\Providers\AuthServiceProvider` as follows:

```php
<?php

------------------------------------------
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * we call the passport: routes 
     * to register routes that our application will use * to issue tokens and clients
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        // call passport:routes() here
        if (! $this->app->routesAreCached()) {
            Passport::routes();
        }
    }
}

```

Now that we've got a way to register tokens routes, let's update the `config/auth.php` as follows:

```php
<?php

return [
----------------------------------------------------
/**
* update the guards api only
*/
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        /**
        * update the driver from token to passport
        */
        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
            'hash' => false,
        ],
    ],
    -------------------------------------------------------

];

```

### Add authentication controller
Now that we're all set with `passport` configurations, let's create an authentication controller.  

```bash
php artisan make:controller passportAuthController
```

Update this controller as follows:

```php
<?php
----------------------------------------
class passportAuthController extends Controller
{
    /**
     * handle user registration request
     */
    public function registerUserExample(Request $request){
        $this->validate($request,[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8',
        ]);
        $user= User::create([
            'name' =>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);

        $access_token_example = $user->createToken('PassportExample@Section.io')->access_token;
        //return the access token we generated in the above step
        return response()->json(['token'=>$access_token_example],200);
    }

    /**
     * login user to our application
     */
    public function loginUserExample(Request $request){
        $login_credentials=[
            'email'=>$request->email,
            'password'=>$request->password,
        ];
        if(auth()->attempt($login_credentials)){
            //generate the token for the user
            $user_login_token= auth()->user()->createToken('PassportExample@Section.io')->accessToken;
            //now return this token on success login attempt
            return response()->json(['token' => $user_login_token], 200);
        }
        else{
            //wrong login credentials, return, user not authorised to our system, return error code 401
            return response()->json(['error' => 'UnAuthorised Access'], 401);
        }
    }

    /**
     * This method returns authenticated user details
     */
    public function authenticatedUserDetails(){
        //returns details
        return response()->json(['authenticated-user' => auth()->user()], 200);
    }
}

```

> Remember to read the above controller comments to understand the code.  

### Add application authentication routes
With the controller ready to handle `Requests`, let's add the routes to finish up the application setup.  

```php
//routes/api.php
Route::post('register',[passportAuthController::class,'registerUserExample']);
Route::post('login',[passportAuthController::class,'loginUserExample']);
//add this middleware to ensure that every request is authenticated
Route::middleware('auth:api')->group(function(){
    Route::get('user', [passportAuthController::class,'authenticatedUserDetails']);
});

```

### Testing our passport application
Serve your application by running the following command:

```bash
# sever starts on port 8000 by default
php artisan serve
```

Now, use [postman](https://www.postman.com) or any other tool to test your application.

Login Output:

![token](/engineering-education/laravel-passport/token.png)

### Conclusion
In this tutorial, we discussed Laravel passport package. We have seen how we can configure this package in a Laravel application to generate API access tokens.

I've tried to take you through each process of implementing a `POST` and `GET` methods i.e. user authentication example, you can now build on this to design secure applications using Laravel passport.

Full tutorial code can be found [here](https://github.com/jumamiller/laravel-passport) on the Github repository.

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

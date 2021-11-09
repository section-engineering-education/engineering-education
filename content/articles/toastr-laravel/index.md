---
layout: engineering-education
status: publish
published: true
url: /toastr-laravel/
title: Getting started with Non blocking notifications in Laravel
description: This tutorial will show you how to integrate a very interactive package in your Laravel application to display any alert depending on your needs. These alerts range from warnings, errors and success messages.
author:  vincent-oriyo
date: 2021-11-05T00:00:00-07:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/toastr-laravel/hero.jpg
    alt: Toastr Laravel img
---
Laravel has risen the ladder over the last few years, and most companies are now using it to design their web applications. However, most developers always face the challenges of integrating alerts on their applications.
<!--more-->
This tutorial will show you how to integrate a very interactive package in your Laravel application to display any alert depending on your needs. These alerts range from warnings, errors and success messages.

### Table of concontentstents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with toastr package](#getting-started-with-toastr-package)
- [Setting up toastr package in your Laravel application](#setting-up-toastr-package-in-your-laravel-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need the following:
- PHP 7.3 and above installed on your local development environment
- Basic knowledge of Laravel, this tutorial uses Laravel 8.
- Composer installed on your local development environment.

### Objectives
This tutorial aims to teach you everything you need to know about UX design when building web applications in Laravel. By the end, you should use the Toastr package to show notifications/alerts instead of the default `flash()` method.

### Getting started with toastr package
Toastr is a simple JavaScript library that's used to display alerts on a web application. 

For example, when new users register on your website, you may want to show them a success alert without breaking the user interface. In addition, it allows you to create simple toasts with HTML5 and JavaScript.

The package was initially built to support JavaScript-based applications. However, it's now possible to use it in your Laravel applications. Therefore, in this tutorial, we'll set up a Laravel application that can use the Toastr package to display notifications on the application.

### Setting up toastr package in your Laravel application
Now that we understand the toastr package let's proceed and set it up on our Laravel application.

Let's start by setting up our Laravel project by running the following commands: 
```bash
# install Laravel installer on your local machine
composer global require laravel/installer
#next install Laravel
laravel new toastrExample

cd toastrExample

php artisan serve
```

On the above commands, we first install a global Laravel installer. This is then followed by the installation of our application, `toastrExample`. Upon installation, we `cd` into the newly created project and start the server.

Let's now proceed and add our toastr package by running the following commands:

```bash
composer require yoeunes/toastr
```

The above command uses the PHP package manager, composer to install the `yoeunes/toastr` package.

Output:

```bash
....
  - Installing yoeunes/toastr (v1.2.6): Loading from cache
  ....
```

Next step, add the service provider to your `config/app.php` file as shown below:

```php
'providers' => [
    ...
    //the package we previously installed is being made available for use in our application
    Yoeunes\Toastr\ToastrServiceProvider::class
    ...
];

```
Service providers are the central place of all Laravel application bootstrapping. Your application and all of Laravel's core services are bootstrapped via service providers.

Adding this package to the provider ensures that it's available for use when we bootstrap our application.

Now proceed and publish these files by running the following commands:
```bash
 php artisan vendor:publish --provider='Yoeunes\Toastr\ToastrServiceProvider' --tag="toastr-config"

Copied File [/vendor/yoeunes/toastr/config/toastr.php] To [/config/toastr.php]
Publishing complete.
```

The above command generates a new file, `config/toastr.php`.

```php
<?php

return [
// some of the contents of this file
.....
    'options' => [
       ....
        'iconClasses'       => [
            'error'   => 'toast-error',
            'info'    => 'toast-info',
            'success' => 'toast-success',
            'warning' => 'toast-warning',
        ],
       ....
    ],
];

```

The file above contains some method definitions that we'll use to notify users, such as errors, success messages and warnings.

For our notifications to work, well, we need to add jquery. This is only achievable on the view by either using the `@jquery` blade directive or via Content Delivery Network (CDN).  

In the next section, we dive in and look at using this feature in our application.

### User authentications with toastr notifications
Previously, we set up our application to be able to use the toastr package. Now, let's create a simple user authentication system, which displays a success message upon sign up and a welcome alert for returning users.

Let's start by setting up our `User` model to suit our authentication needs:

```php
...............
//app/Models/User.php
 protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'password',
    ];
    ............
```
The above model lists the fields we will be using to authenticate users. Of course, you're free to add as many fields as you need.

Now, update the user migrations file as shown below:

```php
    ...
    Schema::create('users', function (Blueprint $table) {
    $table->string('first_name');
    $table->string('last_name');
    $table->string('email');
    $table->string('phone');
    });
    ...
```

The above file uses the `schema` facade to create our users' table columns. It's also important to remember that these are the fields we had previously defined on the model.

Now that we've our model and migration ready, now edit your `.env` file with your database credentials as shown below:

```properties
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toastr
DB_USERNAME=MyUserName
DB_PASSWORD=myPassword
```

Migrate your database my shown below:

```bash
 php artisan migrate
```

Let's proceed and create an authentications controller to handle user registration and signing in.

```bash
php artisan make:controller AuthenticationController
```
The above command creates a new controller inside the `App/Controllers` directory. It's within this directory that we define our logic for user authentication.

Edit the `App/Controllers/AuthenticationController.php` file as follows:

```php
....
public function registerUser(Request $request){
        $validator=Validator::make($request->all(),[
            'first_name' =>'required|string|min:2',
            'last_name'  =>'required|string|min:2',
            'email'     =>'email|unique:users|min:6',
            'phone'     =>'required|string|unique:users',
            'password'     =>'required',
        ]);
        if($validator->fails()){
            toastr()->error($validator->errors()->first());
            return back();
        }
        User::create([
            'first_name'    =>$request->input('first_name'),
            'last_name'    =>$request->input('last_name'),
            'email'    =>$request->input('email'),
            'phone'    =>$request->input('phone'),
            'password'    =>Hash::make($request->input('password')),
        ]);
        toastr()->success('You have successfully registered on our test application');
    }
....
```

In the above script, we have a method `registerUser(Request $request)` that takes `request` as a parameter. This method then validates the user requests; i'e, the request should have all the fields and meet the defined regular expressions as shown on the code.

When the above validation fails, we now get to see the power of the `toastr` package, which now alerts the user with the error information.

If the validation test passes, we use the User model we had defined to add users to the database. Upon successful registration, we notify the user with a confirmation message that they have been successfully registered.

Now that we have got a fully functional user registration controller with toastr packages ready let's proceed and create our routes in the `routes/web.php` file as shown below.
```php

Route::post('auth/register',[\App\Http\Controllers\AuthenticationController::class,'registerUser'])->name('signup');
```

Let's now finalise our application by adding the view in the `resources/view/auth.php` file.

```php
<head>
    <title>Toastr.js</title>
    @toastr_css
</head>
<form method="POST" action="{{ route('signup') }}">
    @csrf
    <div class="form-group">
        <label for="first_name" class="col-md-4">{{ __('First Name') }}</label>

        <div class="col-md-6">
            <input id="first_name" name="first_name" type="text" class="form-control" required autofocus>
        </div>
    </div>

    <div class="form-group">
        <label for="last_name" class="col-md-4">{{ __('Last Name') }}</label>
        <div class="col-md-6">
            <input id="last_name" name="last_name" type="text" class="form-control" required autofocus>
        </div>
    </div>
    <div class="form-group">
        <label for="phone" class="col-md-4">{{ __('Phone Number') }}</label>
        <div class="col-md-6">
            <input id="phone" name="phone" type="tel" class="form-control" required autofocus>
        </div>
    </div>

    <div class="form-group">
        <label for="email" class="col-md-4">{{ __('Email') }}</label>
        <div class="col-md-6">
            <input id="email" name="email" type="email" class="form-control" required>
        </div>
    </div>

    <div class="form-group row">
        <label for="password" class="col-md-4">{{ __('Password') }}</label>
        <div class="col-md-6">
            <input id="password" type="password" class="form-control" name="password" required>
        </div>
    </div>

    <div class="form-group row mb-4">
        <div class="col-md-6 offset-md-4">
            <button type="submit" class="btn btn-primary">
                {{ __('Register') }}
            </button>
        </div>
    </div>
</form>
@jquery
@toastr_js
@toastr_render

```

The above template is a simple registration form that contains all the fields we had defined in our User model. You notice that we're instructing our blade to use the ` @toastr_css`, which styles the alert.

At the end of the template, we also have three other directives,`@jquery`, `@toastr_js` and `@toastr_render`. Now, if you remember, we had said that the Toastr package is JavaScript-based, and therefore we're using jquery to ensure that the notifications are rendered on the browser.

Output:
[alert](/engineering-education/toastr-laravel/toast.png)

### Conclusion
In this tutorial, I've shown you how you can manipulate the power of toastr packages to display notifications to the system user without breaking the user interface.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

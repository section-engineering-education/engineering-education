---
layout: engineering-education
status: publish
published: true
url: /implementing-non-blocking-toastr-notifications-laravel/
title: Getting Started with Non-blocking Toastr Notifications in Laravel
description: This tutorial will show the reader how to display Toastr notifications in a Laravel application.
author:  vincent-oriyo
date: 2021-11-17T00:00:00-03:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-non-blocking-toastr-notifications-laravel/hero.png
    alt: Toastr Laravel Hero Image
---
Today, many companies are using Laravel to design their web applications. However, developers still experience a challenge when integrating alerts in their applications.
<!--more-->
This tutorial will show you how to use Toastr to display alerts in a Laravel application. 

These notifications range from warnings, errors, to success messages. Each alert has its customized background color.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with toastr package](#getting-started-with-toastr-package)
- [Setting up toastr package in your Laravel application](#setting-up-toastr-package-in-your-laravel-application)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need the following:
- PHP 7.3 and above installed on your local development environment
- Basic knowledge of Laravel. This tutorial uses Laravel 8.
- [Composer](https://getcomposer.org/).

### Objectives
This tutorial will help you understand UX design when building web applications in Laravel. 

By the end, you should be able to use the toastr package to show notifications instead of the default Laravel methods.

### Getting started with toastr package
[Toastr](https://github.com/yoeunes/toastr) is a simple JavaScript library that's used to display alerts on a web application. 

For example, when new users register on your website, you may want to show them a success alert.

The package was initially built to support JavaScript-based applications. However, it's now possible to use it in your Laravel applications. 

Therefore, in this tutorial, we'll set up a Laravel application that can use the Toastr package to display notifications.

### Setting up toastr package in your Laravel application
Now that we understand the toastr package, let's set it up in our Laravel application.

To create a Laravel project, we use the following commands: 

```bash
# install Laravel installer on your local machine
composer global require laravel/installer
#next install Laravel
laravel new toastrExample

cd toastrExample

php artisan serve
```

With the above commands, we first installed a global Laravel installer and then created the `toastrExample` project. 

Upon installation, we navigated into the newly created project and started the server.

Let's now proceed and add our `toastr` package by running the following commands:

```bash
composer require yoeunes/toastr
```

The above command uses the PHP package manager, composer, to install the `yoeunes/toastr` package.

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

The above file contains some method definitions that we'll use to notify users. These methods include errors, success, and warnings messages.

For our notifications to work well, we need to add jquery. This is only achievable on `views` by either using the `@jquery` blade directive or via a Content Delivery Network (CDN).  

> In this application, we will use a jquery directive since they are easy to add on templates. However, you're free to use jquery blade.

### User authentications with toastr notifications
Previously, we set up our application to be able to use the toastr package. 

Now, let's create a simple user authentication system, which displays a `success message` upon sign up and a `welcome alert` for returning users. 

This auth system should also display an error alert when invalid credentials are entered.

Let's start by setting up our `User` model to suit our authentication needs:

```php
//app/Models/User.php
 protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'password',
    ];
```
The above model lists the fields we will be using to authenticate users. You're free to add as many fields as you need.

Now, update the `user migrations` file, as shown below:

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

The above file uses the `schema` facade to create our users' table columns. 

It's important to remember that we had defined these fields in the `User` model.

Now that we've our model and migration ready, proceed and edit your `.env` file with your database credentials, as shown below:

```properties
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=toastr
DB_USERNAME=MyUserName
DB_PASSWORD=myPassword
```
> The next step requires you to migrate your database. Ensure that you've updated your credentials otherwise the next step will throw an error.

Migrate your database by running the following commands:

```bash
 php artisan migrate
```

Let's proceed and create an `authentications` controller to handle user registration and signing in.

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

```

In the above script, we have a `registerUser(Request $request)` method that takes `request` as a parameter. 

This method then validates the user requests. For example, the request should have all the fields and meet the defined regular expressions.

When the above validation fails, we alert the user using the `toastr` package.

If the validation test passes, we use the `User` model that we had defined to add users to the database. 

Upon successful registration, we notify the user with a confirmation message.

It's important to note that Toastr package has different types of alerts. In our case, we have used the `success()` with a green background color. 

We've also used an `error()` alert with a red background. Other functions include `warning()` methods which you may use to warn users against certain operations.

Now that we have got a functional user registration, let's proceed and create our routes in the `routes/web.php` file, as shown below:

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

The above template is a simple registration form that contains all the fields we had defined in our `User` model. 

You notice that we're instructing our blade file to use the ` @toastr_css`, which styles the alert.

At the end of the template, we also have three other directives,`@jquery`, `@toastr_js` and `@toastr_render`. 

Now, if you remember, we had said that the Toastr package is JavaScript-based, and therefore we're using Jquery to ensure that the notifications are rendered on the browser.

Output:

![alert](/engineering-education/implementing-non-blocking-toastr-notifications-laravel/toast.png)

### Conclusion
In this tutorial, we've learned how to use the `toastr` package to display notifications to the user. 

We have also seen how we can use this package to notify users of different alerts, such as warnings, success, and error messages.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

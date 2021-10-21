### Introduction

Laravel has risen up the ladder over the last few years, and most companies are now using it to design their websites. However, most developers always face challenges of integrating alerts on their applications.

In this tutorial, I'll be showing you how to integrate a very interactive package in your Laravel application to display any type of alert depending on your needs.

### Table of contents

- [Prerequisites](#prerequisites)(
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
This tutorial aims to teach you everything you need to know about UX design when it comes to building web applications in Laravel. By the end, you should be able to use the Toastr package to show notifications/alerts instead of the default `flash()` method.

### Getting started with toastr package
Toastr is a simple JavaScript library, that's used to show alerts to users. For example, when new users register on your website, you may want to show them a success alert without breaking the user interface.

The package was initially built to support JavaScript based applications, however, it's now possible to use it in your Laravel applications.

### Setting up toastr package in your Laravel application
Now that we understand the toastr package, let's proceed and set it up on our Laravel application.

Let's start by setting up our Laravel project by running the following commands: 

```bash
# install laravel installer on your local machine
composer global require laravel/installer

laravel new toastrExample

cd toastrExample

php artisan serve
```

Let's now proceed and add our toastr package by running the following commands:

```bash
composer require yoeunes/toastr
```

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
    //the package we previously installed being made available for use in our application
    Yoeunes\Toastr\ToastrServiceProvider::class
    ...
];

```
Now proceed and publish these files by running the following commands:

```bash
 php artisan vendor:publish --provider='Yoeunes\Toastr\ToastrServiceProvider' --tag="toastr-config"

Copied File [/vendor/yoeunes/toastr/config/toastr.php] To [/config/toastr.php]
Publishing complete.
```

This command generates a new file `config/toastr.php`.

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

For our notifications to work, well, we need to add the jquery. This is only achievable on the view by either using the `@jquery` blade directive or via Content Delivery Network (CDN).  

In the section, we dive in and look at how we can use this feature in our application.

### User authentications with toastr notifications
Previously, we setup our application to be able to use the toastr package, in this section, let's create a simple user authentication system, that displays a success message upon sign up and welcome alert for returning users.

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

Now update the user migrations as shown below:

```php
    $table->string('first_name');
    $table->string('last_name');
    $table->string('phone');
```

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

Let's proceed and create authentications controller to handle user registration and signing in.

```bash
php artisan make:controller AuthenticationController
```

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

Now that we've a fully function user registration controller with toastr packages ready, let's proceed and create our routes in the `routes/web.php` file as showb=n below.

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

Output:
[images]

### Conclusion
On this tutorial, I've shown you how you can manipulate the power of toastr packages to display notifications to the system user without breaking th user interface.

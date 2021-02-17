---
layout: engineering-education
status: publish
published: true
url: /engineering-education/laravel-8-email-verification/
title: Laravel Email Verification
description: This tutorial introduces the basic concepts of email verification in Laravel 8.x. This feature ensures that only users with authentic emails sign up for a particular service.
author: miller-juma
date: 2021-01-19T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/laravel-8-email-verification/hero.jpg
    alt: laravel language localisation
---
When a new user clicks on the signup button of an application, he or she usually gets a confirmation email with an activation link.  
This is needed to make sure that the user owns the email address entered during the authentication. After the click on the activation link, the user is authenticated for the application. 
In this email verification tutorial, we have a glance at how this functionality is achieved in Laravel 8.
<!--more-->
### Requirements
This tutorial assumes you have basic knowledge in the following:  
* PHP
* Laravel 8.x
* MYSQL.

### Introduction
Since Laravel 7.x, Laravel includes an email verification feature by default in the authentication process. This feature helps in the verification of newly registered users.

### Getting Started
In this tutorial, we will build an authentication application that allows users to sign up and verify their email addresses. 

### step 1: Laravel 8 installation
Create a new Laravel application either via composer or Laravel installer.  

* *** Installing via composer:***  
If your machine already has [PHP](https://www.php.net/manual/en/install.php) and [Composer](https://getcomposer.org/) installed, you can create a Laravel project directly by running the following command:    

```bash
composer create-project laravel/laravel verifyEmailApp
cd verifyEmailApp
php artisan serve
```

* ***Using Laravel Installer***  
In case you've decided to install Laravel via its installer, you're required to install the Laravel Installer globally as a composer dependency.  

```bash
composer global require laravel/installer
laravel new verifyEmailApp
cd verifyEmailApp
php artisan serve
```

>You can learn more about Laravel installation from [here](https://laravel.com/docs/8.x/installation).  

### step 2: Configuring database
The `config/database.php` file contains all the database configurations.  
The default connection uses MySQL,  which you're again free to modify to any database driver supported by Laravel.  
Now head over to the `.env` file and modify the default database configurations as follows:      

```bash
DB_CONNECTION=mysql #you can change this to any database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=verification
DB_USERNAME=MyDatabaseUserName
DB_PASSWORD=MyDatabasePassword
```

You will notice that Laravel 8 automatically updates this file without running the command:  

```bash
php artisan config:clear
```

> NOTE: While using Laravel 7.x, you've to clear the `cache` to reflect changes made.  

### Step 3: Simple Mail Transfer Protocol Configurations
Now that you've successfully executed the above steps, the next phase involves setting up the SMTP server.
Add the Mail credentials in the `.env` file as follows and save. You will notice we're using Mailtrap but you're free to setup this part with any `host`. 

```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=YOUR_USERNAME
MAIL_PASSWORD=YOUR_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=YOUREMAIL
MAIL_FROM_NAME="${APP_NAME}"
```

>This tutorial strongly recommends you to use [Mailtrap](https://mailtrap.io/) due to its simplicity and well-structured documentation.  

#### Step 4: Installing Laravel Jetstream Scaffolding
You can learn more about the new Laravel features including authentication scaffolding from [here](https://www.section.io/engineering-education/laravel-8-new-features/).

Run the following command to install [Jetstream](https://jetstream.laravel.com/2.x/introduction.html) with Livewire stack:  

```bash

php artisan jetstream: install livewire

npm install && npm run dev

php artisan migrate

```

#### Step 4: Model preparation:
Laravel application ships with a `User` model (the data structure in a database). By default, this model class does not implement the `Illuminate\Contracts\Auth\MustVerifyEmail` contract.
Therefore, our first step is to activate the `MustVerifyEmail` interface.  

```php

<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;
 /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','email_verified_at'
    ];
  
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}

```
Adding this interface allows for the sending of verification emails to newly registered users.  
Laravel also comes with a `SendEmailVerificationNotification`  listener, located at the `App\Providers\EventServiceProvider` attached to `Illuminate\Auth\Events\Registered`, an event used to send a verification link to the user.  


#### Step 5: Routing

Three routes are required to implement email verification in Laravel:    
* A route to display the email verification notification to the user with a link to verify email.
* A route to handle user click event to verify email.  
* A route to resend email on user request.  

#### Step 6: Email verification notification
After sending an email to a user, we should return a view asking them to check their email inbox to verify that the email was sent to them.   

```php
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

```
***Note:*** The name of the route returning the email verification notice MUST be named `verification.notice`

#### Step 7: Handling email verification

Now that you've sent an email with a verification link, what happens next?

When clicked, this link should redirect users to either the dashboard or any route you have specified.  
Let's look at how to handle this user click event.  

```php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

```
***Note:*** This route must be named `verification.verify`

#### Step 7: Resending email verification link
It's crucial to note that some users experience challenges during this authentication phase. For example, some sites use a One Time Password with an expiry date. If a user delays to activate their account, the OTP will expire.
At this stage, a new `One Time Password` should be regenerated.  

This slightly relates to how the Laravel email verification link works. A user may delete the email accidentally before verification.  
To solve this problem, Laravel provides a feature to resend verification email on user request.  

```php

use Illuminate\Http\Request;

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

```

#### Step 8: Protecting application routes:
Within your application, there are routes that you won't allow unverified users to visit.
The most appropriate way to protect these routes is by adding `middleware` as shown below.  

```php
Route::get('/profile', function () {
    // Only verified users may access this route...
})->middleware('verified');

```
Unverified users are automatically redirected to the email verification notice route.

## Conclusion
In this tutorial, we have seen how email verification works.
We have also discussed how to protect our routes preventing unauthorized users from accessing them.  

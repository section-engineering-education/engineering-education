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
    alt: laravel email verification
---
Laravel is a PHP-based framework that is simple to understand. It makes it easy to code complex features in an application. One of the features that can be implemented quickly using Laravel is email verification.  
<!--more-->
Typically, we need to verify emails whenever a user signs up on the website. This process ensures that we only accept those users with valid email addresses. In the past, it was quite difficult to code or include email verification in web applications. The introduction of Laravel made life better for developers. In other words, implementing email verification in Laravel only requires a few lines of code.

### Prerequisites
You will need the following to complete this tutorial:   
- PHP
- Laravel 8.x
- MySQL

### Goal
To implement email verification on a website using Laravel.

### step 1: Laravel 8 installation
You can create a new Laravel application either via Composer or Laravel installer.  

**Installing via composer:**    
Laravel uses `Composer` for the control of dependencies. Therefore, before you install Laravel, make sure you have Composer installed on your computer. You can download composer from [here](https://getcomposer.org/download/). After the installation is complete, check the software version using the following command. 
 
 ```bash
composer --version
```

For your new Laravel project, create a new directory anywhere on your computer. Then navigate to the folder and use the following command to install Laravel.  
 
```bash
composer create-project laravel/laravel verifyEmailApp
cd verifyEmailApp
php artisan serve
```

`php artisan serve` command allows the application to be hosted locally.

**Using Laravel Installer**  
There are numerous command-line utilities that make it easy to build applications using Laravel. We use the following command to download the Laravel installer: 

```bash
composer global require laravel/installer
```

To run the Laravel installer, you need to make sure that the `Composer binary folder` is within your `$PATH` variable.
Check if it is in your `$PATH` variable by running the following command in your terminal:  

```bash
echo $PATH
```

The correct output should look, as shown below:  
`User/username/.vendor/composer/bin`  

Incase of any errors, modify your `.bashrc` or, if you're using `ZSH`, your `.zshrc` to include the path to the vendor directory for your Composer.  
When installed, this command creates a new installation for Laravel in the directory you chose. It's even possible to use a fullstop instead of `[foldername]` to construct a project without having a subdirectory in the current working directory.

```bash
laravel new verifyEmailApp
cd verifyEmailApp
php artisan serve
```

>You can learn more about Laravel installation from [here](https://laravel.com/docs/8.x/installation).  

### Step 2: Configuring database
The `config/database.php` file contains all the database configurations. You should, therefore, define all the database details in this file. Remember, all database configurations should be private.   

Modify the following properties according to your database settings in the `.env` file.

```bash
DB_CONNECTION=mysql #you can change this to any database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=verification #database name
DB_USERNAME=MyDatabaseUserName #insert username
DB_PASSWORD=MyDatabasePassword #insert password
```

You will notice that Laravel 8 automatically updates this file without running the command:  

```bash
php artisan config:clear
```

> NOTE: While using Laravel 7.x, you've to clear the `cache` to reflect changes made.  

### Step 3: Simple Mail Transfer Protocol Configurations
In this article, we set up [Mailtrap](https://mailtrap.io/). We will use this service to test and send emails. Mailtrap simulates the actual SMTP server and delivers your emails to a test recipient. It allows the marketing team to send emails to a Mailtrap inbox and see how they are rendered.

Laravel supports several out-of-the-box email services. This includes SMTP, Mailgun, Postmark, Amazon SES, and Sendmail. We can set up the default email service and its credentials at `config/mail.php`.  

Let's get the Mailtrap credentials before editing the `mail.php` file. Navigate to [Mailtrap](https://mailtrap.io/) and sign up for an account. In this tutorial, we will use an account with a free plan. The free plan allows us to send 500 emails a month and one inbox is provided. For small applications, it's just enough.  

If you have signed up, open the Demo inbox and your account will have SMTP credentials. Pick Laravel from the drop-down menu under the SMTP Settings tab. This shows the configuration you want to use in the Laravel framework.  

The best way to configure Mailtrap is to copy its configuration to the `.env` file of the program. This enables your application to deliver emails to the Mailtrap inbox. However, you may replace Mailtrap with Mailgrid, SES, or Mailgun after deploying the Laravel app. 

Here are the required Mailtrap configurations.

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

### Step 4: Installing Laravel Jetstream Scaffolding  
Laravel 8 has distanced itself from it's authentication scaffolding and instead endorsed Jetstream Scaffolding. In [Laravel Documentation](https://laravel.com/docs/8.x/installation), Jetstream is described as a "beautifully designed application starter kit for Laravel that provides the ideal starting point for your next Laravel application." 
Jetstream offers the implementation of login, registration, `email verification`, two-factor authentication, session management, API via Laravel Sanctum, as well as optional team management functionalities.  

You can learn more about the new Laravel features including authentication scaffolding from [here](https://www.section.io/engineering-education/laravel-8-new-features/).

This tutorial assumes you already have a Laravel project set up and running. If you do not have a project configuration for Laravel, you can do so before proceeding further.  

The Jetstream installation process will begin using Composer. Run the following command in your terminal.

 ```bash
 composer install laravel/jetstream
 ``` 

We need to wait for the installation to complete then compile the project's assets using the command below 

```bash
npm install && npm run dev
```
Finally, you can run database migration with `php artisan migrate`.  

One key error that you might face is 'Max key length is 1000 bytes'. It means you need to change your service provider's default string length. Navigate to `app > providers > appserviceprovider.php` and copy and paste the following code into the boot method: 

```
Schema::defaultStringLength(191);
```    

Also, since new tables have been added, you will need to re-migrate. Enter `php artisan migrate: fresh` command in your terminal. This modification helps eliminate the `max string` error. 

### Step 5: Model preparation:
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

Adding this interface allows you to send verification emails to newly registered users. Laravel also comes with a `SendEmailVerificationNotification` listener. It is located at the `App\Providers\EventServiceProvider` and attached to `Illuminate\Auth\Events\Registered`. This event allows you to send a verification link to the user.  

### Step 6: Routing
Three routes are required to implement email verification in Laravel:    
- A route to display the email verification notification to the user with a link to verify email.
- A route to handle the user-click event to verify email.  
- A route to resend email on user's request.  

### Step 7: Email verification notification
After sending a message to the user, we should return a view asking them to check their inbox to complete the verification process.   

```php
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

```
>Note: The name of the route returning the email verification notice MUST be named `verification.notice`

### Step 8: Handling email verification
Now that you've sent an email with a verification link, what happens next?

When clicked, this link should redirect users to either the dashboard or any other specified route. Let's look at how to handle this user-click event.  

```php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

```
>Note: This route must be named `verification.verify`

### Step 9: Resending email verification link
Some users may experience challenges during this authentication phase. For example, some sites use a Time Password with an expiry date. If a user delays activating their account, the OTP will expire. In this case, a new `One Time Password` should be regenerated.  

This slightly relates to how the Laravel email verification link works. A user may delete the email accidentally before verification. To solve this problem, Laravel provides a feature to resend verification emails on user's requests.  

```php

use Illuminate\Http\Request;

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

```

### Step 10: Protecting application routes:
Within your application, there are routes that unverified users should not visit. The most appropriate way to protect these routes is by adding `middleware`, as shown below.  

```php
Route::get('/profile', function () {
    // This route can only be accessed by confirmed users...
})->middleware('verified');
```
Unverified users are automatically redirected to the email verification notice route.

### Conclusion
In this tutorial, we have learned how to implement email verification using Laravel. We have also discussed how to protect our routes, thus, preventing unauthorized users from accessing them. You can, therefore, use this knowledge to build more creative applications.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
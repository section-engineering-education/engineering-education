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

Laravel is a PHP-based framework that is easy to understand. It makes it extremely easy to write complex characteristics, sometimes just one feature does it all. While the Laravel application is under development, email functionality may also need to be tested.
In any application, emails play an important part. Users can be notified with emails about new app features, available offers, and security events. Testing your emails before sending them to real customers is extremely important. In the development or production phase, [Mailtrap](https://mailtrap.io/) can be helpful for testing emails.  

Typically, we need to check their email when a user signs up for our applications, so we know that it is their actual email, not a junk one.  
You reduce the probability of being able to reach them again when you allow users to register with your application without checking their email addresses.  
If an incorrect email address allows them to sign up, there is no assurance that they can navigate to their profile and fix it later.  

Fortunately, with Laravel 8, we can easily do this and, of course, we can make some changes as we like. So in this post, with the Laravel Jetstream kit, I will show you how to build an email verification framework, so we can test it by sending [Mailtrap](https://mailtrap.io/) a real email verification.  

<!--more-->
### Prerequisites
You will need the following to complete this tutorial:   
- PHP
- Laravel 8.x
- MYSQL

### Getting Started
In this article, we’ll look at how to implement an authentication application that allows users to sign up and verify their email addresses.   

### step 1: Laravel 8 installation
Create a new Laravel application either via composer or Laravel installer.  

 **Installing via composer:**    
 Laravel uses composers for the control of dependencies. Before you install Laravel, make sure you have the Composer installed on your machine.  
 To install the composer on your system, visit the following [URL](https://getcomposer.org/download/) and download it.  
 Check the installation after the Composer is installed by typing the Composer command in the prompt as shown below:  
 
 ```bash
composer --version
```

For your new Laravel project, create a new directory anywhere in your system. After that, switch to the path where the new directory was created and enter the following command to install Laravel.  
 
```bash
composer create-project laravel/laravel verifyEmailApp
cd verifyEmailApp
php artisan serve
```

 **Using Laravel Installer**  
To build Laravel applications easily, Laravel provides a helpful command-line utility. Download the installer first: 

```bash
composer global require laravel/installer
```

To run the Laravel installer, you need to make sure that the Composer binary folder is within your `$PATH` variable.
See if it is already in your `$PATH` variable, first by running the following command in your terminal:  

```bash
echo $PATH
```
The performance should contain something like this if all is correct:  
`User/username/.vendor/composer/bin`  
If not, change your `.bashrc` or, if you're using `ZSH`, your `.zshrc` so that it includes the path to the vendor directory for your composer.  
When installed, this command creates a new installation for Laravel in the directory you choose.  
It's even possible to use. (a dot) instead of `[foldername]` to construct a project without having a subdirectory in the current working directory.

```bash
laravel new verifyEmailApp
cd verifyEmailApp
php artisan serve
```

>You can learn more about Laravel installation from [here](https://laravel.com/docs/8.x/installation).  

### step 2: Configuring database
The `config/database.php` file contains all the database configurations.  
You need to tell the details about the database to your laravel project once the database is created.  
Laravel 8 has a pretty straightforward way to do that, all the configuration should stay private.   
Modify the following properties according to your database settings in your `.env` file.

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
In this article, we set up [Mailtrap](https://mailtrap.io/), a service in the development environment for testing emails or sending test emails before sending them to real customers. It simulates the actual SMTP server and delivers your emails to a test email on Mailtrap from the localhost or staging website.

Developers can create features once Mailtrap is set up to allow the marketing team to send emails to a Mailtrap inbox to see how emails are rendered.  
Like SMTP, Mailgun, Postmark, Amazon SES, and Sendmail, Laravel supports several out-of-the-box email services. The mail configuration file located at `config/mail.php` is provided by Laravel. We can set up the default email service and its credentials at `mail.php`.  

But let's get the Mailtrap credentials before editing the mail configuration file by creating a Mailtrap account. Visit and sign up for an account on the Mailtrap website. To test their services, go for a free plan. The free plan allows us to send 500 emails a month and one inbox is provided. For small applications, it's just enough.  

If you have signed up, open the Demo inbox and your account will have SMTP credentials.  
Pick Laravel from the drop-down menu under the SMTP Settings tab. This shows the configuration you want to use in the Laravel framework.  

The best way to configure Mailtrap is to copy its configuration to the .env file of the program. It's that. Now, your application can deliver emails to the Mailtrap inbox whenever you send emails. If you are not planning to use Mailtrap in development, this is simple and helpful.  

You may replace mailtrap with mailgrid, ses, or mailgun, etc, after deploying the Laravel app in development.  
As I said above, it is easier to verify how the emails are made if you are sending emails to your clients. Laravel helps you to quickly move between mailing services, no matter whether the application is in the environment of creation or output.  

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
In a common move among developers, for a more modern strategy using the Jetstream kit, Laravel 8 has distanced itself from its authentication scaffolding.   Jetstream is described by Laravel Documentation as a "beautifully designed application starter kit for Laravel and provides the ideal starting point for your next Laravel application." Jetstream offers the implementation of login, registration, ***email verification***, two-factor authentication, session management, API via Laravel Sanctum, and optional team management functionality for your application.  

You can learn more about the new Laravel features including authentication scaffolding from [here](https://www.section.io/engineering-education/laravel-8-new-features/).

This section assumes that in your environment you already have a Laravel project set up and running. If you do not have a project configuration for Laravel, you can do so before continuing.  

The installation process will begin using Composer running `composer install laravel/jetstream` in your terminal. Before going on, wait for this to end. Compile your assets once the installation is complete by running `npm install && npm run dev`. You can now run Laravel migration with `php artisan migrate` when your assets are compiled.  

'Max key length is 1000 bytes' was frustrating, but a normal error that I ran into. It just means you need to change your service provider's default string length. You can navigate to `app > providers > appserviceprovider.php` and only copy and paste the following code into the boot method:  
`Schema::defaultStringLength(191);`    

Also, since new tables have been added, you will need to re-migrate. So you run:  
`php artisan migrate: fresh`  
After following this simple procedure, this error went away.  

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
- A route to display the email verification notification to the user with a link to verify email.
- A route to handle the user-click event to verify email.  
- A route to resend email on user request.  

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
Let's look at how to handle this user-click event.  

```php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

```
**Note:** This route must be named `verification.verify`

#### Step 7: Resending email verification link
It's crucial to note that some users experience challenges during this authentication phase. For example, some sites use a Time Password with an expiry date. If a user delays activating their account, the OTP will expire.
At this stage, a new `One Time Password` should be regenerated.  

This slightly relates to how the Laravel email verification link works. A user may delete the email accidentally before verification.  
To solve this problem, Laravel provides a feature to resend verification emails on user requests.  

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
    // This route can only be accessed by confirmed users...
})->middleware('verified');

```
Unverified users are automatically redirected to the email verification notice route.

## Conclusion
In this tutorial, we have seen how email verification works.
We have also discussed how to protect our routes preventing unauthorized users from accessing them.  

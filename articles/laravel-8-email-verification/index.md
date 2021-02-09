## Laravel 8 Email Verification

### Requirements
This tutorial assumes you've have a basic knowledge in the following:  
* PHP 7.4.x
* Laravel 8.x

### Introduction
Since the release of Laravel 7.x, the verification feature has been included by default in the Laravel authentication process.  
This includes a built-in email verification setup for newly registered users, **MustVerifyEmail**.

### Getting Started
In this tutorial, we build an authentication application that allows users to sign up and verify their email address. 

### step 1:  Install Laravel 8
Install new Laravel application either via composer or Laravel installer.  

* Via Composer: if your machine already has PHP and Composer readily available, you can install Laravel directly by running the following command  

```bash
composer create-project laravel/laravel verifyEmailApp

cd verifyEmailApp

ph artisan serve

```

* Via Laravel Installer
In case you've decided to install Laravel via its installer, you're required to install the Laravel Installer globally as a composer dependency.  

```bash

composer global require laravel/installer

laravel new verifyEmailApp

cd verifyEmailApp

php artisan serve

```

Note that this tutorial does not teach you how to install Laravel, in one way or the other you're unable to install the `verifyEmailApp`, head over to [this link](https://laravel.com/docs/8.x/installation) to learn more about Laravel installation before you continue.  

### step 2: Configuring Database
`config/database.php` file contains all the database configurations.  
The default connection is configured to use `mysql` database. Now head over to the `.env` file and modify the default database configurations as follows:      

```bash

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=verification
DB_USERNAME=MyDatabaseUserName
DB_PASSWORD=MyDatabasePassword

```
You notice that Laravel 8 automatically updates this file without running the command:-  
```bash
php artisan config:clear
```
While you're on Laravel 7.x, you've to clear the `cache` to reflect changes made.  

### Step 3: Configuring E-Mail
On registration, we should send a verification email to the user, hence configure the SMTP server.  

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
This tutorial strongly recommends you to use [Mailtrap](https://mailtrap.io/) as they are very easy to use with well-structured documentation.  


#### Step 4: Installing Laravel Jetstream Scaffolding
Remember from the previous [article](https://www.section.io/engineering-education/laravel-8-new-features/), we discussed many changes that came with the new release of Laravel 8, including the authentication scaffolding.  

Run the following command to install Jetstream in this tutorial we're going to use Livewire stack:-  

```
php artisan jetstream: install livewire

npm install && npm run dev

php artisan migrate

```
Again note that this tutorial does not teach you how to install Laravel packages, you can visit [jetstream](https://jetstream.laravel.com/2.x/introduction.html) official documentation for more information.  

#### Step 4: Model Preparation:-
New Laravel application comes with ```App\Models\User``` model. The model simply refers to the way data is structured in a database.  
By default, this model class(```User```) does not implement the ```Illuminate\Contracts\Auth\MustVerifyEmail```contract.
Therefore, our first step will be to ensure this class implement the ```MustVerifyEmail``` interface.  

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
Laravel also comes with ```SendEmailVerificationNotification ``` listener, located at the ```App\Providers\EventServiceProvider``` attached to ```Illuminate\Auth\Events\Registered```, an event that is used to send to send a verification link to the user.  


#### Step 5: Routing

Three routes are required to implement email verification in Laravel:-  
* Route to display the email verification notice to the user asking them to click a link to verify email.
* A route to handle user click event to verify email.  
* A route to resend email on user request.

#### Step 6: Email Verificiation Notification
From the above step 5, we have discussed that after sending an email to users, before they verify this email, return a view asking them to check their email inbox to verify the email sent to them in case they try to access parts of the application without email verification.  

```php

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

```
Note:- The name of the route returning the email verification notice MUST be named 
```
verification. notice
```

#### Step 7: Handling Email Verification

Now imagine you have sent an email to the newly registered user, this user proceeds to his/her email inbox and clicks on the link, and is redirected to the dashboard, how does this happen under the hood?  

Let's look at how to handle this user click event.  

```php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

```
Note:- This route must be named
```
verification.verify
```
#### Step 7: Resending Email Verification Link

Take, for example, you're on a website that requires user verification via OTP(One Time Password) with an expiry date. They send you the OTP, but you take time before verifying this OTP till it expires.  
At this stage, you're prompted to request a new OTP.  

This same scenario slightly relates to how this email verification link works, a user might lose the email by accidentally deleting the email or lose it altogether before verification.  
In the case of this activity, the available option is to resend the new verification link, but how does it work?  

```php

use Illuminate\Http\Request;

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

```

#### Step 8: Protecting Application Routes:-

Within your application, there are routes that you won't allow unverified users to visit, to protect these routes, simply add the following middleware:-

```php
Route::get('/profile', function () {
    // Only verified users may access this route...
})->middleware('verified');

```
Unverified users are automatically redirected to the email verification notice route.


## Conclusion
In this tutorial, I've walked you through the email verification process in Laravel 8. 
We have also seen how to allow users to regenerate links incase emails have been misplaced or accidentally deleted.  
We have seen how to protect our routes to allow access to only verified users while redirecting unverified users.  





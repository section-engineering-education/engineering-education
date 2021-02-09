## Laravel 8 Email Verification

### Requirements
This tutorial assumes you have basic knowledge in the following:  
* PHP 7.4.x
* Laravel 8.x
* MYSQL.

### Introduction
Since Laravel 7.x, Laravel includes an email verification feature by default in the authentication process.  
It includes a built-in email verification setup for newly registered users, **MustVerifyEmail**.

### Getting Started
In this tutorial, we build an authentication application that allows users to sign up and verify their email addresses. 

### step 1: Laravel 8 installation
Install new Laravel application either via composer or Laravel installer.  

* ***Via Composer:***  
If your machine already has [PHP](https://www.php.net/manual/en/install.php) and [Composer](https://getcomposer.org/) readily available, you can install Laravel directly by running the following command:    

```bash

composer create-project laravel/laravel verifyEmailApp

cd verifyEmailApp

php artisan serve

```

* ***Via Laravel Installer***  
In case you've decided to install Laravel via its installer, you're required to install the Laravel Installer globally as a composer dependency.  

```bash

composer global require laravel/installer

laravel new verifyEmailApp

cd verifyEmailApp

php artisan serve

```

>Note that this tutorial does not teach you how to install Laravel, in one way or the other you're unable to install the `verifyEmailApp`, head over to [this link](https://laravel.com/docs/8.x/installation) to learn more about Laravel installation before you continue.  

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
You notice that Laravel 8 automatically updates this file without running the command:  

```bash
php artisan config:clear
```

**NOTE:** While using Laravel 7.x, you've to clear the `cache` to reflect changes made.  

### Step 3: Simple Mail Transfer Protocol Configurations
Now that you've successfully executed the above steps, the next step involves setting up the SMTP server.
Add the Mail credentials in the ***.env*** file as follows and save. You notice we're using Mailtrap, you're free to setup
this part with any ***HOST***. 

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
>This tutorial strongly recommends you to use [Mailtrap](https://mailtrap.io/) as they are very easy to use with well-structured documentation.  

#### Step 4: Installing Laravel Jetstream Scaffolding

Remember from the previous [article](https://www.section.io/engineering-education/laravel-8-new-features/), new Laravel features were discussed, including the authentication scaffolding. 

Run the following command to install [Jetstream](https://jetstream.laravel.com/2.x/introduction.html) with Livewire stack:  

```bash

php artisan jetstream: install livewire

npm install && npm run dev

php artisan migrate

```

#### Step 4: Model preparation:
Laravel application ships with `User` model (the data structure in a database) on installation
By default, this model class does not implement the `Illuminate\Contracts\Auth\MustVerifyEmail` contract.
Therefore, our first step ensures this class implements the `MustVerifyEmail` interface.  

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
* Route to display the email verification notice to the user with a link to verify email on click.
* A route to handle user click event to verify email.  
* A route to resend email on user request.  

#### Step 6: Email verification notification
From the previous step, we have discussed that after sending an email to a user, before they verify this email,
return a view asking them to check their email inbox to verify the email sent to them.   

```php

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

```
***Note:*** The name of the route returning the email verification notice MUST be named `verification. notice`

#### Step 7: Handling email verification

Now that you've sent an email with a verification link, what happens next?
On click, this link should redirect users to either dashboard or any route you have specified.  
Let's look at how to handle this user click event.  

```php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

```
***Note:*** This route must be named `verification. verify`

#### Step 7: Resending email verification link

For example, you're on a website that requires user verification via One Time Password with an expiry date. They send you an OTP, but you take time before verifying this OTP till it expires.  
At this stage, a new `One Time Password` should be regenerated.  

It slightly relates to how this email verification link works where a user loses the email by accidentally deleting the email or lose it altogether before verification.  
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

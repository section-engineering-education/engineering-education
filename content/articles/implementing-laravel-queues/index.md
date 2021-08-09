---
layout: engineering-education
status: publish
published: true
url: /implementing-laravel-queues/
title: How to Implement Queues in Laravel 8
description: This article will show the reader how to implement queues in your Laravel 8 application. Laravel queues allow you to respond to web requests quickly.
author: bhanji-brilliant
date: 2021-07-09T00:00:00-10:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-laravel-queues/hero.png
    alt: Implementing Queues in Laravel 8
---
Companies may experience numerous challenges when managing their services or applications. For example, firms may need to send emails to millions of users or perform database backups. All of these operations require massive computing power.
<!--more-->
Running all of these services at once could affect the performance of the application. As a result, users may become frustrated due to the long delays. Laravel seeks to resolve this issue through the use of queues. 

### Prerequisites
To follow along, you need to have installed Laravel 8 on your computer. Having some knowledge of PHP and Laravel is also crucial. The key Laravel components that will be used in this project are [Mail](https://laravel.com/docs/8.x/mail) and [Jobs](https://laravel.com/docs/8.x/scheduling).

### Objectives
By the end of this tutorial, you should be able to enhance your application's performance by delaying the running of certain services.  

### What is Laravel queue
A queue involves placing things in order. For instance, a queue management system can be used to serve customers on a first-come-first-serve basis. 

This is no different from the Laravel queue. It serves the same job by ensuring that programs or services are executed in a certain order.

For example, you have an application that requires users to sign up and then send them a One-Time-Password (OTP) or even a welcome email. Though this is a great implementation, it may slow down the application's performance. Laravel queues can help salvage this situation. 

Let's get started.

### Configuring Laravel queues
Laravel provides several [drivers](https://laravel.com/docs/8.x/queues#driver-prerequisites) that we can use to configure our queues. In this tutorial, we will use the `database driver`.

In this project, we will focus on sending emails using Laravel queues.

Start by running the following command:

```bash
php artisan queue:table
```

Output:

```bash
Migration created successfully!
```

The command above sets up our application to use the `database driver` to implement queues. It also creates our `migration` file and a `jobs` table.  

Here is our `migration` file:

```php
class CreateJobsTable extends Migration{

    // this method will create a database called jobs with its respective columns
    public function up(){
        Schema::create('jobs', function (Blueprint $table) { //we define our database columns here
            $table->bigIncrements('id');
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });
    }

    // this method is used to check if the table already exists
    public function down(){
        Schema::dropIfExists('jobs');
    }
}

```

We also need to notify Laravel that we will be using the database driver by updating the `.env` file as follows:  

```bash
QUEUE_CONNECTION=database
```

With our `jobs` table ready, we can now run the `migrations` as shown below:  

```bash
php artisan migrate
```

> Before running the above `migration` command, ensure that your `.env` file has the correct database credentials to avoid errors.

Output:

```bash
Migration table created successfully.
--------
Migrating: 2021_06_22_123248_create_jobs_table
Migrated:  2021_06_22_123248_create_jobs_table (117.97ms)
```

### Setting up emails to use Laravel queues
In this section, we will use the `mailable` class to set up our emails. 

Let's start by running the following command:  

```bash
php artisan make: mail TestHelloEmail
```

Output:

```bash
Mail created successfully.
```

The above command creates a `TestHelloMail.php` file inside the `./app/Mail` directory.  

Here are the contents of the `TestHelloMail.php` file:

```php
<?php

class TestHelloEmail extends Mailable{
    use Queueable, SerializesModels;

    public function __construct(){
        //
    }

    public function build(){
        return $this->view('view.name'); // returns a view to the user
    }
}

```

Since we have created our `mailable` class, navigate to the `resources/views` folder and create a new directory called `mail`. 

Inside this folder, create a new file and name it `testEmails.blade.php`.

Include the following HTML line in the `testEmails.blade.php` file.

```php
    <p> My mailing queues testing</p>
```

Now, let's update the `TestHelloEmail.php` file, as shown below:

```php
 public function build(){
        return $this->view('view.mail.testEmails');
 }

```

The next step is to create `jobs` to manage our emails. 

Here we can use the following command:  

```bash
  php artisan make:job TestSendEmail
```

Output:

```bash
 Job created successfully.
```

The above command will create a `testSendEmail.php` file inside the `app/jobs/` folder. 

Let's update its contents as follows:

```php
use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

class TestSendEmail implements ShouldQueue{

    public function __construct(){
        //
    }

    public function handle(){
         $email = new TestHelloEmail();
        Mail::to('johndoe@tests.com')->send($email);
    }
}
```

In the above `testSendEmail.php` file, we import the `Mail` facade and the `TestHelloEmail.php` class to implement the Laravel queue.

### Testing emails
In this step, we need to add a `controller` to handle our logic. 

To do so, we use the following command:  

```bash
php artisan make:controller TestQueueEmails
```

Output:

```bash
Controller created successfully.
```

Open the generated controller and edit it as follows:

```php
class TestQueueEmails extends Controller
{
    /**
    * test email queues
    **/
    public function sendTestEmails()
    {
        $emailJobs = new TestSendEmail();
        $this->dispatch($emailJobs);
    }
}

```

Then add the following in your `routes` file:

```php
Route::get('sending-queue-emails', [TestQueueEmails::class,'sendTestEmails']);
```

When you navigate to `http://localhost:8000/sending-queue-emails`, you will notice jobs has been added in the `jobs` table.  

When we want to dispatch the jobs, we use the following command:

```bash
php artisan queue: work
```

### Conclusion
In this tutorial, we have discussed the process of implementing Laravel queues using a simple email sender. Laravel queues can help developers improve user satisfaction by running complex services only when the application is not in use. 4

You can use this knowledge to create more powerful applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
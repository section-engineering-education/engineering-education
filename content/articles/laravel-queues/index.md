
### Introduction

Speeding up the response time of applications could be very hard, for example, a big company like [section](section.io), would want to send Edge As A Service new features/updates to millions of their clients all over the world. In case these emails are sent at once, it could slow down the system performance.  

The answer to this problem is the use of queues. Therefore, in this tutorial, I'll be taking the Laravel queue concepts, how you may use them to improve your application performance.  

### Table of content

- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What's is Laravel queue](#whats-is-laravel-queue)
- [Configuring Laravel queues](#configuring-laravel-queues)
- [Setting up emails to use Laravel queues](#setting-up-emails-to-use-laravel-queues)
- [Testing emails](#testing-emails)
- [Conclusion](#conclusion)

### Prerequisites

- Laravel 8 installed in your local development environment
- Basics of Laravel, especially [Mail](https://laravel.com/docs/8.x/mail) configurations
- Idea on Laravel [jobs](https://laravel.com/docs/8.x/scheduling) would an added advantage to learn this concept as quickly as possible.

### Objectives

By the end of this Laravel queue tutorial, you should be in a position to speed up your application performance by delaying the running of some time-consuming programs.  

### What's is Laravel queue

A queue is placing things in order, for instance in a bank, the queue management system is used to serve customers in a first come first serve manner. This is no different from the Laravel queue, it serves the same job, where programs are executed in a certain order.

Let's say, for example, you have an application that requires users to sign up and send them a Time Password (OTP) or even a welcome email. Of course, this is a great implementation, but it will slow down the application performance.  This is where the Laravel queue is coming in.  

In the section, let's look at how we can configure our application to use Laravel queues to improve the performances of our systems.

### Configuring Laravel queues

Laravel provides several [drivers](https://laravel.com/docs/8.x/queues#driver-prerequisites) that we use to configure our queues, in this tutorial we use the database driver.

For your better understanding of queues, we will select sending email queues to implement using Laravel queues.

Start by running the following command:

```bash
php artisan queue:table

```

Output:

```bash
Migration created successfully!
```

This command sets up our application to use the database driver to implement queues. It also sets our migration file and creating a `jobs` table.  

```php

........................................................
class CreateJobsTable extends Migration
{

    // this method will create a database called jobs with its respective columns
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
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
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}

```

We also need to tell Laravel that it'll be using the database driver by adding updating `.env` file as follows:  

```bash
QUEUE_CONNECTION=database
```

With our jobs table ready, we can now run the migrations as shown below:  

```bash
php artisan migrate
```

> Before running the above command, ensure your `.env` file has updated database credentials otherwise an error will be t

Output:

```bash
Migration table created successfully.
--------
Migrating: 2021_06_22_123248_create_jobs_table
Migrated:  2021_06_22_123248_create_jobs_table (117.97ms)

```

### Setting up emails to use Laravel queues

In this section, we use the mailable to set up our emails. Start by running:  

```bash
php artisan make: mail TestHelloEmail
```

Output:

```bash
Mail created successfully.
```

The above command creates a `Mail`  directory inside the `./app/Mail` with the `TestHelloEmail.php` file.  

```php
<?php

---------------

class TestHelloEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function build()
    {
        return $this->view('view.name');
    }
}

```

Since we have set up our mail class, head over to the `resources/views folder and add `mail/testEmails.blade.php`.

```php
<p> My mailing queues testing</p>

```

Now update the `TestHelloEmail.php` file as shown below:

```php
---------------
 public function build()
    {
        return $this->view('view.mail.testEmails');
    }

```

Let's now proceed to create jobs to manage our emails:  

```bash
php artisan make:job TestSendEmail
```

Output:

```bash
Job created successfully.

```

The above command creates `./app/Jobs/TestSendEmail.php` file. Update its contents as follows:

```php
<?php

---------------

class TestSendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public function __construct()
    {
        //
    }

    public function handle()
    {
         $email = new TestHelloEmail();
        Mail::to('johndoe@tests.com')->send($email);
    }
}

```

In the above jobs file, we import the `Mail` facade and the `TestHelloEmail.php`.
That's all we need to test our Laravel queue.

### Testing emails

Add a controller to handle our logics:  

```bash
 php artisan make:controller TestQueueEmails

```

Output:

```bash
Controller created successfully.

```

Now head over to this new controller and edit it as follows:

```php
<?php
------------------

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

Then add the following in your routes file:

```php
Route::get('sending-queue-emails', [TestQueueEmails::class,'sendTestEmails']);
```

On visiting the `http://localhost:8000/sending-queue-emails`, you will notice jobs are added in the `jobs` table.  

Now on dispatching the jobs, let's process the queue by running the following command:

```bash
php artisan queue: work
```

### Conclusion

 In this tutorial, I've tried to walk you through the process of implementing Laravel queues using a simple email sender. It's very simple to implement, even though it looks confusing at first. Hope it helps you make your application quite faster!

 Happy coding!

---
layout: engineering-education
status: publish
published: true
url: /laravel-cron-jobs/
title: Getting Started with Laravel Cron Jobs
description: This tutorial will go through Laravel cron jobs in-depth, with the main focus on cron job creation and scheduling tasks using artisan commands.
author: miller-juma
date: 2021-06-09T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/laravel-cron-jobs/hero.png
   alt:  Getting Started with Laravel cron jobs
---
In most cases, while developing applications, there are tasks we may require to execute periodically. These tasks may include the company's newsletters or promotional emails to registered users.
<!--more-->
Achieving this task manually can be costly to the company in terms of resources.  

### Introduction
Laravel comes equipped with a very powerful task manager called cron jobs. In this tutorial, we'll discuss Laravel cron jobs in-depth, with our focus being on cron job creation and scheduling tasks using artisan commands.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Getting started with cron](#getting-started-with-cron)
- [Creating new Laravel project](#creating-new-laravel-project)
- [Scheduling Tasks](#scheduling-tasks)


### Objectives
At the end of this tutorial, you should be able to create and schedule tasks using Laravel. Additionally, you should be able to create Laravel artisan commands which play a crucial part in task scheduling.  

### Prerequisites
- Basic Knowledge of PHP and Laravel.
- Linux operating system

### Getting started with cron
Before we dive into Laravel cron jobs, we must understand what a cron is. [Cron](https://www.hivelocity.net/kb/what-is-cron-job/) is a UNIX/Linux-based operating systems command. It's used to schedule tasks that are required to be executed at a given time or to execute periodical events.  

A cron has 3 main components:
1. The executing script.
2. The command that is used to execute the script.
3. The output. This depends on the action on the executed script.

Cron is configured in a crontab to manage the task scheduling process. This configuration file contains all the cron jobs for each specified task.  

### Laravel cron jobs
As previously discussed, Laravel has an inbuilt cron job that it uses to manage its tasks. With this scheduler, you can manage your periodical tasks on the server. This scheduler provides an interactive environment to create scheduler commands within your Laravel application.   

Laravel inbuilt scheduler is located in the `app/Console/Kernel.php` within the `schedule()` method.

### Creating new Laravel project
Let's start by creating a new Laravel project that we'll use to showcase cron jobs in action.  

> Skip this step in case you've already downloaded this application, otherwise run the following command:

```bash
 laravel new cron
 
 cd cron 
```

### Scheduling tasks
Tasks in Laravel are defined in the `app/Console/Kernel.php` and defined within the `schedule()` method.  

Let's look at an example:
```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{

    protected $commands = [];
    
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            DB::table('inactive_users')->delete();
        })->hourly();
    }
}
```

In the example above, we have a task that's being executed hourly to remove inactive users in an application. Within the `schedule()` method, we have a database query that deletes inactive users. This is referred to as `scheduling task using closures`.  

You can view all your scheduled tasks by running the following command:
```bash
php artisan schedule: list
```

Output:
```bash
+---------+----------+-------------+----------+
| Command | Interval | Description | Next Due |
+---------+----------+-------------+----------+

```

### Scheduling artisan commands
Laravel has multiple methods of implementing cron jobs, and so far we've seen how to use `closures` to schedule these tasks. 

The other method is the use of artisan commands to manage tasks in an application. Laravel provides an interactive command-line tool to create commands at our disposal. 

Let's create a command and use it to schedule tasks.  

Here we will create a command to send promotional emails by running the following command:

```bash
php artisan make: command PromotionalEmails
```

Output:
```bash
Console command created successfully.
```

This creates the `PromotionalEmails.php` file in the `app/Console/Commands` folder.

```php

<?php

---------------------------------------------------

class PromotionalEmails extends Command
{
  
    protected $signature = 'command:name';

   
    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        return 0;
    }
}

```

Next, let's discuss each method and property in this class.

- `protected $signature = 'command:name';` - This variable contains the command name which we replace with our own command name as follows:

```php
protected $signature = 'promotional:email';
```

- `protected $description = 'Command description';` This refers to the description of the command that we've created. In this scenario, we have a promotional email, hence we can change this variable as seen below:

```php
protected $description = 'Sending out promotional emails to application users';
```

- ` public function handle()`- This handler is called whenever our command is executed.  

Now, our final code should look as seen below:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PromotionalEmails extends Command
{
    protected $signature = 'promotional:email';

    protected $description = 'Sending out promotional emails to application users';

    public function __construct()
    {
        parent::__construct();
    }
    public function handle()
    {

        $message = [
            'message' => 'Hello, did you know that moving services to the Edge is complicated but Section makes it easy. ',
        ];

        $key = array_rand($message);
        $value = $message[$key];

        $users = User::all();
        foreach ($users as $user) {
            Mail::raw("{$key} -> {$value}", function ($mail) use ($user) {
                $mail->from('info@section.io');
                $mail->to($user->email)
                    ->subject('Section Edge');
            });
        }

        $this->info('Moving Services to the Edge');
    }
}

```

### Registering our command
Let's register our `PromotionalEmails` in the `app/Console/Kernel.php` as seen below:  

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
         Commands\PromotionalEmails::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('promotional:email')->weekly();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

```

Now, run `php artisan list` in the command line to see if this command exists:

```bash
php artisan list
```

Output:
```bash
Laravel Framework 8.46.0

Usage:
  --------------------------------

Options:
--------------------------------------------
Available commands:
-------------------------------------------------------------
 promotional
  promotional:email    Sending out promotional emails to application users
-------------------------------------------------------------
```


### Conclusion
In this tutorial, we've discussed Laravel cron jobs. We looked at two different ways of scheduling tasks, using closures and Laravel artisan commands.

We looked at an example of scheduling a cron job to send [Section](section.io) Edge as a service to users weekly. We also discussed how to register the artisan commands in the `kernel.php` script.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

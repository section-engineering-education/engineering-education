### Introduction
In most cases, while developing applications, there are tasks that we would require to execute periodically. These tasks may include company's newsletters, or promotional emails to registered users. Achieving this task manually would be costly to the company in terms of resources.  
Laravel, comes hand in hand with a very powerful task manager called cron jobs. 

In this tutorial, we'll discuss Laravel cron jobs in depth, with our focus on cron job creation and scheduling task using artisan commands.

### Table of contents
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Getting started with cron](#getting-started-with-cron)
- [Creating new Laravel project](#creating-new-laravel-project)


### Objectives
At the end of this task scheduling tuturial, you should be able to create and schedule tasks using Laravel. Additionally, you should be able to create Laravel artisan commands which play crucial part in task scheduling.  

### Prerequisites
- Basic Knowledge in PHP and Laravel.
- Linux operating system

### Getting started with cron
Before we dive into Laravel cron jobs, it's important that we understand what a cron is.
[Cron](https://www.hivelocity.net/kb/what-is-cron-job/) is a unix/linux based  operating systems command. It's used to schedule tasks that are required to executed at a given time or to execute periodical events.  

A cron has 3 main components:
- The executing script
- The command that is used to execute the script.
- The output. This depends on the action on the executed script.

Cron is configured in a crontab/cron table to manage the task scheduling process. This configuration file contains all the the cron jobs to each task specified.  

### Laravel cron jobs
As previouly discussed, Laravel has an inbuilt cron job that it uses to manage its tasks. With this scheduler, you have the ability to manage the your periodical tasks on the server.
This scheduler provides an interactive environment to create scheduler commands within your Laravel application.   

Laravel inbuilt scheduler is located in the `app/Console/Kernel.php` within the `schedule()` method.

### Creating new Laravel project
Let's start by creating a new Laravel project that we'll use to showcase cron jobs in action.  

> Skip this step incase you've already downloaded this application, otherwise run the following command:

```bash
 laravel new cron
 
 cd cron 
```

### Scheduling Tasks

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
In the above example, we've a task that's being executed hourly to remove inactive users in an application.
Within the `schedule()` method, we've a database query that deletes inactive users. This type of implementation is referred to as `scheduling task using closures`.  

You can view all your scheduled tasks by running the following command:
```bash
php artisan schedule:list
```
Output:
```bash
+---------+----------+-------------+----------+
| Command | Interval | Description | Next Due |
+---------+----------+-------------+----------+

```

### Scheduling artisan commands

Laravel has multiple methods of implementing cron jobs, and so far we've seen how to use `closures` to schedule these tasks. 
The other method is the use of artisan commands to manage tasks in an application.  
Laravel provides an interactive commandline tool to create commands at our disposal. Let's create a command and use it to schedule tasks.  

Let's create a command to send promotional emails by runnig the following command:

```bash
php artisan make:command PromotionalEmails
```

Output:
```bash
Console command created successfully.
```
This creates `PromotionalEmails.php` file in the `app/Console/Commands` folder.

```php

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PromotionalEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        return 0;
    }
}

```

Next, let's discuss what each method and property in this class.

- `protected $signature = 'command:name';` - This variable contains the command name which we replace with our own command name as follows:

```php
protected $signature = 'promotional:email';
```
- `protected $description = 'Command description';` This refers to the description of the command that we've created. In this scenario, we've a promotional email, hecne we change this variable as seen below:

```php
protected $description = 'Sending out promotional emails to application users';
```
- ` public function handle()`- This handler is called whenever our command is executed.  

Now, our final code will look as seen below:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PromotionalEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'promotional:email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sending out promotional emails to application users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $message = [
            'message' => 'Hello, did you know that moving services to the Edge is complicated but Section makes it easy. ',
        ];

        // Finding a random word
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
Now, run `php artisan list` in the commandline to see if this command exists:

```bash
php artisan list
```

Output:
```bash
Laravel Framework 8.46.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --env[=ENV]       The environment the command should run under
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
-------------------------------------------------------------
 promotional
  promotional:email    Sending out promotional emails to application users
-------------------------------------------------------------
```






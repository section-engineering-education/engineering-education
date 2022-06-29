---
layout: engineering-education
status: publish
published: true
url: /server-resource-monitoring-laravel/
title: Getting Started with Resource Monitoring in Laravel 9
description: This article introduces the reader through the concepts of resource management and monitoring.
author: odiwuor-amos
date: 2022-06-29T00:00:00-13:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/server-resource-monitoring-laravel/hero.png
    alt: Server monitor image 
---
Most systems already exist that provide us with a way to monitor the CPU and memory usage of the system. However, they might not be very flexible to support our daily needs.
<!--more-->
Developers more often are faced with problems of resource management, where the machines freeze or hang when all the available resources have been consumed.

Albeit, it's possible to monitor these resources using, let's say Windows task manager and Linux's system monitor, this has proven to be a hurdle in a shared hosting.

In this tutorial, we will learn how to build a Laravel system that has the ability to monitor the resource usage of the shared hosting server.

### Table of contents
- [Getting started with the resource monitoring in Laravel 9](#getting-started-with-the-resource-monitoring-in-laravel-9)
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Setting up the Laravel 9 application](#setting-up-the-laravel-9-application)
- [Configuring the resource manager packages](#configuring-the-resource-manager-packages)
- [Adding the controllers](#adding-the-controllers)
- [Conclusion](#conclusion)

### Prerequisites
To be able to understand and follow this tutorial, the reader should have at least the following knowledge:
- Basic knowledge in Laravel. In this tutorial, we will be using Laravel 9.
- Basic knowledge in object oriented programming in PHP.
- Composer should be locally installed to be able to download and install third party packages.

### Objectives
By the end of this tutorial, you should be able to be in a position to build a resource manager for your system.

### Setting up the Laravel 9 application
Laravel is a PHP framework that is used to build web applications. It is a popular choice among developers for building web applications.

To install Laravel in your local machine, you have various options.
1. Install Laravel using the official Laravel installer.
2. Using the composer package manager.

In this tutorial, we will be using the Laravel installer, however you may follow [official documentation](https://laravel.com/docs/9.x/installation) to install Laravel using the composer package manager.

Let's begin by running the following commands to make installer visible within my project root:
```bash
export PATH="$PATH:$HOME/.config/composer/vendor/bin"
```

> NOTE that the path is relative to the home directory of the user, and this may change depending on your installations setup.

Next, install the resource manager application by executing the following installer command:
```bash
laravel new resource-manager
```

The installation may take a while depending on your internet connection. Once complete, `cd` into the project root directory and run the following command to start the application:
```bash
php artisan serve
```

The above command starts the Laravel application on the default port of `http://localhost:8000`.

It's important to note that the above port only works if it's not in use. 

You can change the port by running the following command:
```bash
php artisan serve --port=<PORT>
```

### Configuring the resource manager packages
Now that we have our Laravel application running, we need to install the resource manager packages.

Let's start by installing a package known as `Spatie server monitor`. This package will give us all the functionalities we need to ensure that we can run the resource scans.
```bash
composer require spatie/laravel-server-monitor:^1.0
```

Output:
```bash
Discovered Package: laravel/sail
Discovered Package: laravel/sanctum
Discovered Package: laravel/tinker
Discovered Package: nesbot/carbon
Discovered Package: nunomaduro/collision
Discovered Package: spatie/laravel-blink
Discovered Package: spatie/laravel-ignition
Discovered Package: spatie/laravel-server-monitor
Package manifest generated successfully.
...
```

Once complete, the new package will be added on the `composer.json` file as shown below:
```json
"spatie/laravel-server-monitor": "^1.0"
```

Next, update the `config/app.php` file to include the following line:
```php
'providers' => [
    ...
    Spatie\ServerMonitor\ServerMonitorServiceProvider::class,
    ...
],
```

We add the providers array to ensure that the package is loaded.

Now that we have installed the package, we need to publish the assets. This is done by running the following command:
```bash
  php artisan vendor:publish --all # to publish all the assets
  # use this command if you want to publish only the assets for the given tag
  php artisan vendor:publish --provider="Spatie\ServerMonitor\ServerMonitorServiceProvider" --tag="migrations"
```

When successful, the following database tables will be created:
```php
...
// hosts table
    Schema::create('hosts', function (Blueprint $table) {
        // unique identifier for the table
        $table->increments('id');
        // name of the host
        $table->string('name');
        // 
        $table->string('ssh_user')->nullable();
        $table->integer('port')->nullable();
        // ip address of the host
        $table->string('ip')->nullable();
        // custom properties for the host
        $table->json('custom_properties')->nullable();
        $table->timestamps();
    });
```

The above table will be used to store the hosts that we will be monitoring.

The other table created is the `checks` table. This table will be used to store the checks that we will be running on the hosts.
```php
...
Schema::create('checks', function (Blueprint $table) {
    // unique identifier for the table
    $table->increments('id');
    // host id
    $table->integer('host_id')->unsigned();
    // using host id as foreign key
    $table->foreign('host_id')->references('id')->on('hosts')->onDelete('cascade');
    // type
    $table->string('type');
    // status
    $table->string('status')->nullable();
    // is enabled
    $table->boolean('enabled')->default(true);
    // last run message
    $table->text('last_run_message')->nullable();
    // last run output
    $table->json('last_run_output')->nullable();
    // last time it ran
    $table->timestamp('last_ran_at')->nullable();
    // next time it will run
    $table->integer('next_run_in_minutes')->nullable();
    // notification
    $table->timestamp('started_throttling_failing_notifications_at')->nullable();
    // custom properties for the check
    $table->json('custom_properties')->nullable();
    // the check will be created when the host is created
    $table->timestamps();
});
```

In other words, the `hosts` will store all the required details about the computers or servers being monitored while the `checks` table stores the information about the checks that will be run on the hosts.

With the above command, we can see that the following assets are being published in the `config/server-monitor.php` file:
```php
<?php
return [
    ...
    // the checks that can be performed by our system
    'checks' => [
        // diskspace memory check
        'diskspace' => Spatie\ServerMonitor\CheckDefinitions\Diskspace::class,
        // elasticsearch check
        'elasticsearch' => Spatie\ServerMonitor\CheckDefinitions\Elasticsearch::class,
        // Memcache checks
        'memcached' => Spatie\ServerMonitor\CheckDefinitions\Memcached::class,
        // mysql database checks
        'mysql' => Spatie\ServerMonitor\CheckDefinitions\MySql::class,
    ],
    ...
];
```

In the above file, we have added the following checks:
- The `diskspace`: This will check the disk space of the system.
- The `elasticsearch`: This will check the elastic search server.
- The `memcached`: This will check the memcached server.
- The `mysql`: This will check the mysql database.

### Adding the controllers
With server monitor setup complete, let's now proceed and add a few controllers to our application.

The goal of the controllers is to handle the logic of the resource manager. 

We want our controllers to be able to handle the following:
-  Handle the `apache status` check on our server.
-  Check the database connection.
-  Check the MySQL database.
-  Check for our RAM status/usage.

Therefore, we need to create 4 controller for each of the tasks above.

> The reason we're creating the 4 controllers instead of 1 controller with multiple methods is because the package installed has an interface which only takes a single method.

Run the following commands to add the controllers:
```bash
 # add the controller for the apache status check
 php artisan make:controller ApacheCheckerController
 # add the controller for the database connection check
 php artisan make:controller DatabaseCheckerController
 # add the controller for the mysql database check
 php artisan make:controller MySqlCheckerController
 # add the controller for the ram check
 php artisan make:controller RamCheckerController
```

Next, open the `ApacheCheckerController.php` file and add the following code:
```php
<?php

...
// import the 
use Spatie\ServerMonitor\CheckDefinitions\CheckDefinition;
use Symfony\Component\Process\Process;
class ApacheCheckerController extends CheckDefinition
{
    // use this command to check the status of Apache2 on your server
    public $command = 'sudo systemctl status apache2';
    // resolve the execution
    public function resolve(Process $process)
    {
        // the output will contain the status if it;s active na running
        if (str_contains($process->getOutput(), 'active (running)')) {
            // if it;s running, then success
            $this->check->succeed('is running');
            return;
        }
        // if the check fails, then it;s not running
        $this->check->fail('is not running');
    }
}
```

In the above controller, we have added the following:
- The `command`: This is the command that will be executed to check the status of Apache2.
- The `resolve`: This is the method that will be called when the command is executed.

Next, open the `DatabaseCheckerController.php` file and add the following code:
```php
<?php
...
//import the checkDefinition class
use Spatie\ServerMonitor\CheckDefinitions\CheckDefinition;
use Symfony\Component\Process\Process;
class RamCheckerController extends CheckDefinition
{
    public $command = "";

    // use this method to calculate the  RAM percentage
    protected function getRAMUsagePercentage(): float
    {
        $ram = shell_exec("grep 'RAM ' /proc/stat | awk '{ramUsage=($2+$4)*100/($2+$4+$5)} END {print ramUsage}'");
        return (float) $ram;
    }
    public function resolve(Process $process)
    {
        // assign the ram percentage
        $ramPercentage = $this->getRAMUsagePercentage();
        // get the exact usage
        $ramUsage = round($ramPercentage, 2);
        //init the message
        $message = "My RAM usage at {$ramUsage}%";
        //get the ram usage threshold
        $ram_usage_threshold = config('server-monitor.cpu_usage_threshold');
        // check for any failures of the RAM percentage against its usage threshold
        if ($ramPercentage >= $ram_usage_threshold['fail']) {
            $this->check->fail($message);
            return;
        }
        // check for any warnings of the RAM percentage against its usage threshold
        if ($ramPercentage >= $ram_usage_threshold['warning']) {
            $this->check->warn($message);
            return;
        }
        // otherwise if success, return the message
        $this->check->succeed($message);
    }
}

```

In the above controller, we have added the following:
- The `command`: This is the command that will be executed to check the status of RAM usage and remaining percentage.
- The resolve`: This is the method that will be called when the command is executed.
- In the resolve method, we have added the following:
    - The `getRAMUsagePercentage`: This method will be used to calculate the RAM usage percentage.
    - The RAM usage is then rounded to 2 decimal places.
    - We have the message to be displayed in the check.
    - The RAM usage threshold is then checked against the usage.

Now that we have controllers defined, next run the following commands to add the remote hosts to the server monitor:
```bash
 # add the remote hosts to the server monitor
 php artisan server-monitor:add-hosts
```

Output:
```bash
Lets add a host!

 What is the name of the host:
 > section.io

 Should a custom ssh user be used? (yes/no) [no]:
 > yes

 Which user?:
 > admin

 Should a custom port be used? (yes/no) [no]:
 > 8080

 Should a specific ip address be used? (yes/no) [no]:
 > yes

 Which ip address?:
 > http://localhost:8080

 Which checks should be performed? [<all checks>]:
  [0] <all checks>
  [1] diskspace
  [2] elasticsearch
  [3] memcached
  [4] mysql
 > 1

Host `section.io` added
```

> Update the above yes or no questions depending on the requirements of the host.

Next, let's proceed and run the diskspace check.
```bash
 # run the diskspace check
  php artisan server-monitor:run-checks
```

Expected Output:
```bash
Start running 1 checks...

section.io: performing check `diskspace`...
....
```

You'll notice that the above check is specific to `diskspace` since we selected that check in our host configuration.

### Conclusion
In this tutorial, we learned how to build a resource manager for your Laravel system.

We have extensively discussed the various main resources to be monitored in Laravel. In this tutorial, we covered the following:
-  CPU usage
-  Database traffics

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

### Getting started with the resource monitoring in Laravel 9
### Introduction
Most systems already exist that provides us with a way to monitor the CPU and memory usage of the system. However, they might not be very flexible to support our daily needs.

In this tutorial, we will learn how to build a Laravel system that has the ability to monitor the resource usage of the system.

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
To be able to understand and follow this tutorial, the reader should have atleast the following knowledge:
- Basic knowledge in Laravel. In this tutorial, we will be using Laravel 9.
- Basic knowledge in object oriented programming in PHP.
- Composer should be locally installed to be able to download and install third party packages.
### Objectives
By the end of this tutorial, you should be able to in a position to build a resource manager for your PHP/Laravel system.

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

Next, install the resource manager application by executing the following installer command:
```bash
laravel new resource-manager
```

The installation may take a while depending on your internet connection. Once complete, `cd` into the project root directory and run the following command to start the application:
```bash
php artisan serve
```

The above command starts the Laravel application on the default port of `http://localhost:8000`.

It's however important to note that the above port only works if it's not in use. You can change the port by running the following command:
```bash
php artisan serve --port=<PORT>
```

### Configuring the resource manager packages
Now that we have our Laravel application running, we need to install the resource manager packages.

Let's start by intalling a package known as `Spatie server monitor`. This package will give us all the functionalities we need to ensure that we can run the resource scans.
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
82 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
> @php artisan vendor:publish --tag=laravel-assets --ansi --force
No publishable resources for tag [laravel-assets].
Publishing complete.
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
    $table->json('custom_properties')->nullable();
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
- The `diskspace`: This check will check the disk space of the system.
- The `elasticsearch`: This check will check the elasticsearch server.
- The `memcached`: This check will check the memcached server.
- The `mysql`: This check will check the mysql database.

### Adding the controllers
With server monitor setup complete, let's now proceed and add a few controllers to our application.

The goal of the controllers is to handle the logic of the resource manager. 

We want our controllers to be able to handle the following:
-  Handle the `apache status` check on our server.
-  Check the database connection.
-  Check the MySQL database.
-  Check for our RAM status/usage.

Therefore, we need to create 4 controller for each of the tasks above.

> The reason we're creating the 4 controllers instead of the  1 controller with multiple methods is because the package installed has an interface which only takes a single method.

Run the following commands to add the controllers:
```bash
 php artisan make:controller ApacheCheckerController
 php artisan make:controller DatabaseCheckerController
 php artisan make:controller MySqlCheckerController
 php artisan make:controller RamCheckerController
```

next, open the `ApacheCheckerController.php` file and add the following code:
```php

```

### Conclusion
In this tutorial, we have learned how to build a resource manager for your Laravel system.

We have extensively discussed the various main resources to be monitored in Laravel. In this tutorial, we have covered the following: This includes, but not limited to:
-  CPU usage
-  Database traffics

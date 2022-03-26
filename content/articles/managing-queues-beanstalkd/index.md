Managing Laravel Work Queues With Beanstalk and Supervisor on Ubuntu 20.04
### Introduction
Building extensive applications sometimes come with some additional problems. These may include operations to upload CSV files which may take time to parse and save into your database.  

The solution to such problems is using the Laravel queued jobs that process these operations in the background.

In this tutorial, I'll teach you everything you need to know about Laravel queues and later on introduce the concepts of [beanstalk](https://beanstalkd.github.io) and Supervisor in Ubuntu 20.04.

### Table of contents
- [Prerequisites](#)
- [Objectives](#)
- [Getting started with Beanstalk](#getting--started-with-Beanstalk)
- [Setting up Laravel 8 project](#setting-up-laravel-8-project)
- [Configuring beanstalk](#configuring-beanstalk)
- [Dispatching and running jobs](#dispatching-and-running-jobs)
- [Getting started with Supervisor](#getting-started-with-supervisor)
- [Conclusion](#conclusion)

### Prerequisites
- [Supervisor]() installed on your local development environment.
- SSH access to your [Vultr]() instance.
- Laravel installer and composer locally available.
- Ubuntu 20.04 installed

### Objectives
By the end of this tutorial, you should have sound knowledge of working with beanstalk and Supervisor in Ubuntu 20.04.

### Getting started with beanstalk
Beanstalk is a simple, fast work queue. 

It allows you to run time-consuming tasks asynchronously, such as sending emails, connecting to external APIs, or processing images. 

By doing so, you will reduce your web app latency. In addition, laravel provides out-of-the-box support for beanstalkd.

Now, let's proceed and install beanstalk in our Ubuntu as shown below: 

```bash
sudo apt-get update

sudo apt-get install beanstalkd
```
We run the above command since Ubuntu includes a beanstalkd package.

Output:
```bash
...
Selecting previously unselected package beanstalkd.
(Reading database ... 270125 files and directories currently installed.)
Preparing to unpack .../beanstalkd_1.11-1_amd64.deb ...
Unpacking beanstalkd (1.11-1) ...
Setting up beanstalkd (1.11-1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/beanstalkd.service → /lib/systemd/system/beanstalkd.service.
beanstalkd.socket is a disabled or a static unit, not starting it.
Processing triggers for man-db (2.9.1-1) ...
Processing triggers for systemd (245.4-4ubuntu3.13) ...

```

Now that we've Beanstalk locally installed, let's proceed and start a service by running the following command:
```bash
sudo systemctl start beanstalkd
```

Next, to check if the beanstalk has been successfully installed, run the following commands to check the status:
```bash
sudo systemctl status beanstalkd
```

Output:
![output](output.png)

Beanstalk listens on port 11300 by default. Its protocol runs over TCP using ASCII encoding. You can read more [here](https://github.com/beanstalkd/beanstalkd/blob/master/doc/protocol.txt). 

Now to test our protocol, let's run the following commands on the terminal:
```bash
telnet localhost 11300
```

When the above command is executed, you should see the following:
```bash
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.

```

Next, type `list-tubes` just immediately after the `Escape character is '^]'` and then press `Enter`.

![protocol](protocol.png)

Type `quit` and then press `Enter` to close the above-established connection.

![disconnect](disconnect.png)

Alternatively, after installing Beanstalk as described above, you may start the beanstalk on a particular port of your choice, in this case, port `14710`.

```bash
beanstalkd -l 127.0.0.1 -p 14710
```

Typically, having `beanstalkd` alone ain't enough. We also need [PyYAML](https://pyyaml.org/wiki/PyYAMLDocumentation) installed.

Previously, we listed our beanstalk tubes. These tubes are used to represent work queues.

Beanstalk is composed basically of producers, consumers, jobs, and tubes. Producers put jobs into a tube to be consumed (processed) by any number of consumers.

>Note that both `producers` and `consumers` are simply clients of the Beanstalk server and are independent of each other. 

>In practical terms, this means that by using beanstalk, you may produce your jobs in your PHP application and have them processed in a NodeJS app, for example. 

Luckily, Laravel abstracts all of this and provides us with a straightforward API to dispatch and handle jobs, as we will see next.

### Setting up Laravel 8 project
Now that we've beanstalk locally installed, let's proceed and set up our Laravel 8 project.

Their multiple ways of installing Laravel, depending on your requirements. However, in this article, we'll use the two most popular methods:

#### Installing via Laravel installer
This is a [package](https://packagist.org/packages/laravel/installer) used to install a Laravel application.

First, ensure that you have a composer locally available and its path set as follows:
```bash
export PATH="~/.composer/vendor/bin:$PATH"
```
Next, run the following commands to set up your project:

```bash
laravel new beanstalk

cd beanstalk

php artisan serve

```

#### Installation via composer
To install the Laravel project using composer, run the following commands:
> This section assumes you've composer locally installed
```bash
composer create-project laravel/laravel beanstalk

cd beanstalk

php artisan serve
```

### Getting started with Pheanstalk
Pheanstalk is a PHP client for beanstalkd work queue. It has supported PHP versions since 7.1+. In this article, we run it on PHP version 7.4.

To install Pheanstalk in our Laravel project, `cd` into the project root and run the following commands:

```bash
cd beanstalk

composer require enqueue/pheanstalk
```

Output:
```bash
...
Updating dependencies (including require-dev)
Package operations: 3 installs, 0 updates, 0 removals
  - Installing queue-interop/queue-interop (0.8.1): Downloading (100%)         
  - Installing pda/pheanstalk (v3.2.1): Downloading (100%)         
  - Installing enqueue/pheanstalk (0.10.9): Downloading (100%)         
Package swiftmailer/swiftmailer is abandoned, you should avoid using it. Use symfony/mailer instead.
Writing lock file
Generating optimized autoload files
> Illuminate\Foundation\ComposerScripts::postAutoloadDump
...
```

Now that we've installed pheanstalk let's create a job representation. 
```bash
cd beanstalk

php artisan make:job FindFavoriteOS
```
Output:
```bash
Job created successfully.
```

By default, jobs are added to the `App/Jobs` folder. Open the `app/Jobs/FindFavoriteOS.php` and update its contents as shown below:
```php
...
/**
 * Execute the job.
 *
 * @return void
 */
public function handle()
{
    $rawData = file_get_contents('https://api.vultr.com/v1/os/list');
    $list = json_decode($rawData, true);
    shuffle($list);
    $key = array_rand($list);
    $favorite = $list[$key];
    Log::info('My Favorite OS is: ' . $favorite['name']);
}
...

```

In the above script, we have the `handle()` method with multiple operations. First, it fetches the list of operating systems from [Vultr](https://api.vultr.com/v1/os/list).

>The handle method is invoked when the queue processes the job. Note that we can type-hint dependencies on the handle method of the job.

The JSON response from the API is then decoded and shuffled. Finally, we use the `array_rand()` method to generate a random key which we then use to pick a random operating system.

The randomly picked OS is then assigned as our favorite, subsequently logged in the `storage/logs/laravel.log` file.  

### Configuring beanstalk
Now that we've both beanstalk and Laravel project setup let's proceed and configure Laravel to use beanstalk as our default work queue.  

Open the `.env` file and update the line where the queue driver is specified as shown below:
```properties
QUEUE_CONNECTION=beanstalkd
```
We are now ready to dispatch jobs to the Beanstalk work queue.

### Dispatching and running jobs
Let's now dispatch the jobs that we had previously created by updating our `routes/web.php` file as shown below:
```php
<?php

use App\Jobs\FindFavoriteOS;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. The RouteServiceProvider loads these | routes within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/jobs', function () {
    for ($i = 0; $i < 50; $i++) {
        FindFavoriteOS::dispatch();
    }

    return '50 Jobs dispatched!';
});

```

Output:
```bash
50 jobs dispatched
```

Next, open an SSH connection to your server and run the commands below:

```
php artisan queue:work --once
```

Output:
```
[2021-12-11 00:03:52] Processing: App\Jobs\FindFavoriteOS
[2021-02-11 00:03:53] Processed:  App\Jobs\FindFavoriteOS
```

### Getting started with Supervisor
To avoid manually processing the queue, we will use `supervisord`. 

Create the following program configuration in `/etc/supervisor/conf.d/vultr.conf`.

```properties
[program:vultr]
process_name=%(program_name)s_%(process_num)02d
command=php [PROJECT_ROOT]/artisan queue:work
autostart=true
autorestart=true
numprocs=8
redirect_stderr=true
stdout_logfile=/var/log/worker.log

```

Notice that the right path to put the Supervisor configuration file will depend on your setup. 

> Remember to replace `[PROJECT_ROOT]` with the full path to the project root on your local development environment.

Here we are configuring Supervisor to automatically start processing the queue and, in case of the script breaking, to restart it.

Also, note that we are not instantiating a single worker, but eight processes. You are free to instantiate however many processes you find necessary depending on your application.

To allow Supervisor to manage our worker, force it to reread its configuration.

```bash
sudo supervisorctl reread
sudo supervisorctl update
```

If the Supervisor service has not been started, you may need to create it.

```bash
sudo systemctl start supervisord
```

Now let's see if the jobs are being processed.

```bash
tail -f storage/logs/laravel.log
```

On a web browser, navigate to http://localhost:8000. You will see the logs being generated on your console.

### Conclusion
This article shows how we can set up a Laravel application to use beanstalk as a work queue.

Also, we demonstrated how to use Supervisor to manage workers.

Happy coding!

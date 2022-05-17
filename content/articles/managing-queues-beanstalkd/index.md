---
layout: engineering-education
status: publish
published: true
url: /managing-queues-beanstalkd/
title: Running Jobs in Laravel 9 using Supervisor & Beanstalkd
description:  In this tutorial the reader will learn about Laravel queues and introduce the concepts of beanstalkd and Supervisor in Ubuntu 20.04.
author: roselyne-odero
date: 2022-05-16T00:00:00-20:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/managing-queues-beanstalkd/hero.png
    alt: Queues Beanstalk
---
Building extensive applications sometimes come with some additional problems. These may include operations to upload CSV files which may take time to parse and save into your database.  
<!--more-->
A solution to such problems is using the Laravel queued jobs that process these operations in the background.

In this tutorial, I'll teach you everything you need to know about Laravel queues and introduce the concepts of [beanstalkd](https://beanstalkd.github.io) and Supervisor in Ubuntu 20.04.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What's a supervisor in Ubuntu?](#whats-a-supervisor-in-ubuntu)
- [Getting started with beanstalkd](#getting-started-with-beanstalkd)
- [Setting up Laravel 9 project](#setting-up-laravel-9-project)
  - [Installing via Laravel installer](#installing-via-laravel-installer)
  - [Installation via composer](#installation-via-composer)
- [Getting started with Pheanstalk](#getting-started-with-pheanstalk)
- [Configuring beanstalk](#configuring-beanstalk)
- [Dispatching and running jobs](#dispatching-and-running-jobs)
- [How to configure supervisor to work with beanstalked jobs](#how-to-configure-supervisor-to-work-with-beanstalked-jobs)
- [Conclusion](#conclusion)

### Prerequisites
In order to follow along the reader should have the following:
- A Linux [Supervisor](http://supervisord.org/installing.html) locally installed.
- A basic understanding of how a Supervisor works in a development environment.
- An Integrated Development Environment (IDE) or a text editor such as [VSCode](https://code.visualstudio.com/) or [Atom](https://atom.io/) is recommended.
- Laravel Installer and composer are locally available. However, you're free to use composer commands to install Laravel.
- Ubuntu 20.04 installed. However, the concepts covered here should work on any other Ubuntu version, with minor changes.

### Objectives
By the end of this tutorial, you should have sound knowledge of working with beanstalkd and supervisors in Ubuntu 20.04.

### What's a supervisor in Ubuntu?
The supervisor is a service manager for [Linux](https://linux.die.net/) based operating systems. 

It is a tool that allows you to manage processes that are easier to understand and easy to use.

It has a central process that runs in the background and manages all the processes that you have running.

The supervisor has several components, such as `supervisord`, the central process, `supervisorctl`, the command-line interface, and `supervisor-web`, which is a web interface.

To get started with Supervisor, you need to install it as described below:
```bash
# Start by updating the package index
sudo apt update
# install the supervisor package
sudo apt install supervisor
```

Output:
```bash
### Installing supervisor
# The command may take a few minutes to complete
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following package was automatically installed and is no longer required:
  php7.4-zip
Use 'sudo apt autoremove' to remove it.
Suggested packages:
  supervisor-doc
The following NEW packages will be installed:
  supervisor
0 upgraded, 1 newly installed, 0 to remove and 254 not upgraded.
Need to get 281 kB of archives.
After this operation, 1,682 kB of additional disk space will be used.
Get:1 http://ke.archive.ubuntu.com/ubuntu focal/universe amd64 supervisor all 4.1.0-1ubuntu1 [281 kB]
Fetched 281 kB in 0s (2,878 kB/s)  
Selecting previously unselected package supervisor.
(Reading database ... 360080 files and directories currently installed.)
Preparing to unpack .../supervisor_4.1.0-1ubuntu1_all.deb ...
Unpacking supervisor (4.1.0-1ubuntu1) ...
Setting up supervisor (4.1.0-1ubuntu1) ...
Created symlink /etc/systemd/system/multi-user.target.wants/supervisor.service →
 /lib/systemd/system/supervisor.service.
Processing triggers for man-db (2.9.1-1) ...
Processing triggers for systemd (245.4-4ubuntu3.15) ...
W: Target Packages (non-free/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target Packages (non-free/binary-i386/Packages) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target Packages (non-free/binary-all/Packages) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target Translations (non-free/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target Translations (non-free/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target DEP-11 (non-free/dep11/Components-amd64.yml) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target DEP-11 (non-free/dep11/Components-all.yml) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target DEP-11-icons-small (non-free/dep11/icons-48x48.tar) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target DEP-11-icons (non-free/dep11/icons-64x64.tar) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target DEP-11-icons-hidpi (non-free/dep11/icons-64x64@2.tar) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target CNF (non-free/cnf/Commands-amd64) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
W: Target CNF (non-free/cnf/Commands-all) is configured multiple times in /etc/apt/sources.list:58 and /etc/apt/sources.list.d/opera-stable.list:4
```

When we run the above command, you can see that the package supervisor is installed.

Next, you need to start the supervisor service.
```bash
# Start the supervisor service
sudo systemctl start supervisor
```

You can proceed and check the status by running the following command:
```bash
# Check the status of the supervisor service
sudo systemctl status supervisor
```

Output:
```bash
 supervisor.service - Supervisor process control system for UNIX
     Loaded: loaded (/lib/systemd/system/supervisor.service; enabled; vendor pr>
     Active: active (running) since Fri 2022-04-08 18:04:58 EAT; 1min 55s ago
       Docs: http://supervisord.org
   Main PID: 133153 (supervisord)
      Tasks: 1 (limit: 18939)
     Memory: 19.3M
     CGroup: /system.slice/supervisor.service
             └─133153 /usr/bin/python3 /usr/bin/supervisord -n -c /etc/supervis>

```

From the output above, you'll notice that the supervisor service is running. Now that we've successfully installed and started the supervisor service, we can proceed to discuss the beanstalkd and, later on, how to use it with the supervisor.

### Getting started with beanstalkd
Beanstalkd is a distributed job queue. It can be used to run jobs in the background and schedule jobs to run in the future. It's swift and easy to use.

By executing tasks asynchronously, you can improve the performance of your application. 

To our advantage, Laravel provides us with beanstalkd shipped with the framework.
This means that we can configure our application to use beanstalkd as the job queue.

Now, let's proceed and install beanstalkd in our Ubuntu as shown below: 
```bash
sudo apt-get update

sudo apt-get install beanstalkd
```

We can run the command above since Ubuntu includes a beanstalkd package.

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

Now that we have beanstalkd locally installed, let's proceed and start a service by running the following command:
```bash
sudo systemctl start beanstalkd
```

Next, to check if beanstalkd has been successfully installed, run the following commands to check the status:
```bash
sudo systemctl status beanstalkd
```

Output:
![Active beanstalked](/engineering-education/managing-queues-beanstalkd/active.png)

Now that we have confirmed that our beanstalkd service is running let's proceed and configure our application to use beanstalkd as the job queue.

Let's proceed and test our protocol by running the following commands on the terminal:
```bash
telnet localhost 11300 # default port
```

When the above command is executed, you should see the following:
```bash
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.

```

Next, type `list-tubes` just immediately after the `Escape character is '^]'` and then press `Enter`.

Output:
```bash
# connecting to localhost
Trying 127.0.0.1...
# connected to localhost/ connection established
Connected to localhost.
Escape character is '^]'.
# key in this
list-tubes
# output on ENTER
OK 14
---
- default
```


Type `quit` and then press `Enter` to close the above-established connection.

```bash
## key in this
quit
## Output on entering
Connection closed by foreign host.

```

Alternatively, after installing beanstalkd as described above, you may start the beanstalkd on a particular port of your choice, in this case, port `14710`.

```bash
beanstalkd -l 127.0.0.1 -p 14710
```

Typically, having `beanstalkd` alone is not enough. We also need [PyYAML](https://pyyaml.org/wiki/PyYAMLDocumentation) installed.

Previously, we listed our beanstalkd tubes. These tubes are used to represent work queues.

### Setting up Laravel 9 project
Now that we have beanstalkd locally installed let's proceed and set up our Laravel 9 project.

There are multiple ways of installing Laravel, depending on your requirements. However, in this article, we'll use the two most popular methods:

#### Installing via Laravel installer
Laravel installer is a [package](https://packagist.org/packages/laravel/installer) used to install a Laravel application.

Ensure that you have a composer locally available and its path set as follows:
```bash
export PATH="~/.composer/vendor/bin:$PATH"
# OR on Linux
export PATH="$PATH:$HOME/.composer/vendor/bin"
```

When you run the above commands, you're setting the Laravel path to be found its installer. This is especially important when using the `Laravel installer`.

Next, run the following commands to set up your project:
```bash
# run this command to create a new Laravel project in the current directory
laravel new beanstalk
# Cd into the created project
cd beanstalk
```

The above commands will create a new Laravel project in the current directory.
We then `cd` into the newly created project and run the following command to start the server:
```bash
php artisan serve
```

#### Installation via composer
To install the Laravel project using composer, run the following commands:
> This section assumes you have composer locally installed.

```bash
composer create-project laravel/laravel beanstalk

cd beanstalk

php artisan serve
```

With the Laravel installer, the above command will create a new Laravel project in the current directory.

### Getting started with Pheanstalk
[Pheanstalk](https://github.com/pheanstalk/pheanstalk) is a PHP client for the beanstalkd work queue. 

Pheanstalk has supported PHP versions since 7.1+. In this article, we run it on PHP version 8.0 however you may use earlier versions of PHP with a few configurations as described [here](https://github.com/pheanstalk/pheanstalk)

To install Pheanstalk in our Laravel project, `cd` into the project root and run the following commands:
```bash
cd beanstalk
# this command will install Pheanstalk in your project
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

Next, check the `composer.json` file to see if the Pheanstalk package has been installed.

```json
"require": {
    "php": "^7.3|^8.0",
    "enqueue/pheanstalk": "^0.10.9",
    "pda/pheanstalk": "^3.1"
    },
```

> At the installation time, the version of our `pheanstalk` package is `0.10.9`. This may be different from your setup; therefore, update accordingly.

Now that we've installed pheanstalk, let's create a job representation. 
```bash
cd beanstalk

php artisan make:job SendingBeanstalkedMails
```

Output:
```bash
Job created successfully.
```

By default, jobs are added to the `App/Jobs` folder. 

Open the `app/Jobs/SendingBeanstalkedMails.php` and update its contents as shown below:
```php
...
<?php
// our namespace is Jobs since we are in the App/Jobs folder
namespace App\Jobs;

...// other imports

class SendingBeanstalkedMails implements ShouldQueue
{
    // use the trait
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    // currently authenticated user
    protected $user;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        // set the user
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('E-mails have entered the queue');
        // find user with this specific email
        $user =  User::where(["email" => $this->user["email"]]);
        // send email to user
        Mail::to($user)->send(new WelcomeMail($user));
        // exit
        Log::info('Exited from Job processing the welcome email handle method');
    }
}
```

We have the `handle()` method with multiple operations in the above script. It logs the information to the `log` table and sends an email to the user.

### Configuring beanstalkd
Now that we have both beanstalkd and Laravel project setup, let's proceed and configure Laravel to use beanstalkd as our default work queue.  

Laravel is configured to use the `sync` queue driver by default. This is a synchronous queue driver. This means that jobs are executed immediately.

Next, let's proceed and update the `.env` file to allow use the beanstalkd package we had installed.
```properties
...
QUEUE_CONNECTION=beanstalkd # update this line
...
```

### Dispatching and running jobs
Let's now dispatch the jobs that we had previously created by updating our `routes/web.php` file as shown below:
```php
<?php
...
Route::get('/jobs', function () {
    SendingBeanstalkedMails::dispatch();
    return '100 welcome email Jobs dispatched!';
});
....

```

When you serve the application, you will see the following output on the browser:
```bash
100 welcome email Jobs dispatched!
```

Next, open an SSH connection to your server and run the commands below:

```bash
php artisan queue:work --once
```

Output:
```bash
[2021-12-11 00:03:52] Processing: App\Jobs\SendingBeanstalkedMails
[2021-02-11 00:03:53] Processed:  App\Jobs\SendingBeanstalkedMails
...
```

### How to configure supervisor to work with beanstalkd jobs
We installed the Laravel application in the previous section and added the beanstalkd package. We also created a job that we wanted to dispatch to the beanstalkd queue.

However, we do not want our application to process these jobs manually. Instead, we want to use the supervisor to process these jobs.

It's essential to remember from the previous section that we had to run a command on the terminal to dispatch these jobs; however, we would not want to do this in real-world applications.

Let's proceed and configure our supervisor to work with beanstalkd jobs as described below:

Open the terminal and run the following command:
```bash
sudo nano /etc/supervisor/conf.d/section.conf
```

The above command will open the supervisor configuration file on your text editor.

Next, update the contents of the file as shown below:
```bash
# a section ENGED program
[program:section]
# we then retrieve the process name
process_name=%(program_name)s_%(process_num)02d
# we then retrieve the command to run
command=php /var/www/html/projectName/artisan queue:work
# autorestart the process
autorestart=true
# we start the process each time the supervisor starts
autostart=true
# we set the number of processes to start
numprocs=10
# redirect
redirect_stderr=true
# log
stdout_logfile=/var/log/supervisor/section.log
```

Ensure that you set the correct path to the Laravel application in the above file.

Now, restart the supervisor service by running the following command:
```bash
# force the reread of the configuration file
sudo supervisorctl reread
# force update the configuration file
sudo supervisorctl update
```

Next, rerun your Laravel application and head over to your browser; you should notice that our jobs are now being dispatched.


### Conclusion
We now have set up our Laravel application to use the beanstalkd queue driver in this tutorial. We also installed this package and created a job that we wanted to dispatch to the beanstalkd queue.

We then automated dispatching the jobs to the beanstalkd queue using the native supervisor service.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

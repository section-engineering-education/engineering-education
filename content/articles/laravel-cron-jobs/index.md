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










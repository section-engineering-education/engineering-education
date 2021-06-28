---
layout: engineering-education
status: publish
published: true
url: /pm2-with-nodejs/
title: Process Manager 2 with Node.js
description: This article will cover Process Manager 2, its advantages, how to use it, and why PM2 is popular amongst organizations. PM2 allows us to focus on building amazing applications without worrying about the massive overhead.
author: harit-joshi
date: 2021-06-22T00:00:00-18:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/pm2-with-nodejs/hero.jpg
    alt: PM2 with Node.js
---
If you work with Node.js applications often, you might be familiar with the default script `npm start`, which will generally run your server directly. This may seem like it is enough initially, but in the real world when your app encounters an error, your app may crash for everyone. 
<!--more-->
This is where PM2 comes in. PM2 or Process Manager 2 is a versatile process manager written in Node.js.

This article will cover PM2, its advantages, how to use it, and why PM2 is popular amongst organizations.

### Prerequisites
To follow this tutorial along - the reader should have the following:
- Have Node.js installed in your system. To install Node.js safely in your system visit the official documentation via [this link](https://nodejs.org/en/download/).
- Some prior knowledge about Node.js and you should be familiar with Linux commands and operating system.

Before discussing PM2, we will first start with the root of its existence i.e., Node.js, so as to have a clear understanding of PM2.

### What is Node.js?
Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser and whose architecture is based on single-threaded non-blocking concurrent input/output. It is a lightweight web framework and very friendly to beginners.

Node.js is written in C, C++, JavaScript, and it is built on the open-source V8 JavaScript engine. As V8 supports latest features in JavaScript, they are added into Node.js.

V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among other browsers. To know more about it you can visit to the official documentation via [this link](https://v8.dev/).

It also has access to a C++ library called Libuv which provides Node.js to have access to the OS, filesystem, and to the event, loop to manage asynchronous operations.

### Why Node.js?
Node.js uses an "event-driven, non-blocking I/O model". This means that Node.js is built well to handle asynchronous JavaScript tasks to perform many asynchronous activities. Activities such as reading or writing to the file system, handling connections to database servers, or handling requests as a web server, etc.

To handle asynchronous tasks, Node.js uses a callback-based system. Node.js functions or methods that might have to do some asynchronous actions takes a callback function.

For example:

```js
const fs = require("fs");

fs.readFile("./hello.txt", (error, data) => {
  if (error) throw error;
  console.log(data);
});
```

In this example, we are using Node.js's built-in `fs` (File System) module to read a hello.txt file. The callback function is called after the file-reading operation is completed. If an error occurs, it will be passed as an error and thrown.

### Advantages of Node.js
#### It offers high performance in real-time
Web applications written in Node.js takes a lot of advantage from its ability to multitask. Unlike other languages, its single-threaded, event-driven architecture processes multiple concurrent requests efficiently.

#### Easy scalability for modern applications
With a growing demands for efficient backend, tons of MNC 's like  Netflix, Walmart, Google, etc., have regarded Node.js as a valuable solution for scalability.

#### Offers community support to simplify development
With millions of developers contributing actively to the Node.js community, you can get extensive support from experts across the world to solve even the most peculiar development problems.

For instance, NPM, a package manager for JavaScript, is the biggest package manager repository in the world. It offers numerous tools and libraries available readily for you to use in your project.

#### Node.js reduces loading time by quick caching
Node.js made it really easy for developers to reduce task workload and re-execution of code with its caching module. So every time the any module of your web application gets a request, it gets cached in the app 's memory which is real efficient for frequently visited websites.

Node.js allows you to use Microservices that lets you segregate your application into smaller parts.

### What is PM2?
PM2 is a free open source, efficient, and cross-platform production-level process manager for Node.js with a built-in load balancer.

It works on Linux, MacOS as well as Windows. It supports real time app monitoring, efficient management of micro-services and shutdown of apps.

It keeps your applications "alive forever" with auto restarts that can be enabled to start the app at system boot, thus allowing for higher availability configurations.

### Why PM2?
- Restarting after crashes: PM2 allows us to keep processes running endlessly, until we shut down our system.
- Monitoring and managing processes remotely: Web portals allows you to keep track of remote processes and manage them at any time.
- Wide support: PM2 isn't limited to just to Node.js processes, that's right. It can be used to manage NGINX servers, Apache servers, etc.
- Restart-Persistence: PM2 remember all your processes and restart them after a system boot.

Let's take an example to really understand all this,

Assume you have a microservice in Node.js running on port `8000`.

```js
const http = require("http");

const hostname = "192.162.93.11";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("This is the Main App!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

The code above will run on the server after executing the Node.js server.js command but what if something make this app crash. We need to restart it manually by executing the same command line. 

Since it is a small code snippet, it can be done easily. Suppose we have an enterprise-level codebase, then this would be terrible and time-consuming.

Here, PM2 comes to the rescue by restarting the Node.js API automatically. You will not have to run your application as root therefore, your application will be protected.

Your application will restart if it crashes, and it will keep track of the log for unhandled exceptions. Your app will restart when the server starts again.

### Installation of PM2
If you haven't installed Node.js you can safely install it in your system visit the official documentation via [this link](https://nodejs.org/en/download/) or if you want to save some time so you can also go to this link [this link](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/).

After successfully installing Node.js and `npm` i.e., node package manager, the first thing we need to do is to install PM2 globally on your system:

``` bash
npm i -g pm2
```

If you prefer yarn as your package manager then,

``` bash
sudo yarn global add pm2
```

### Starting and configuring PM2
To start a process under PM2, all you need to do is run `pm2 start <app>` to make your application managed by PM2.

PM2 will output something like this for Windows users:

``` bash
[PM2] Starting C:\Users\moose\app.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬
│ App name │ id │
├──────────┼────|
│ app      │ 0  │
└──────────┴────|
```

For Linux and Mac users, the command and output are a little different:

``` bash
sudo pm2 start example.js

[PM2] Spawning PM2 daemon
[PM2] PM2 Successfully daemonized
[PM2] Starting example.js in fork_mode (1 instance)
[PM2] Done.
┌─────────┬──┬────┬────┬──────┬───────┬──────┬─────────┬──────────┐
│ App name│id│mode│pid │status│restart│uptime│memory   │ watching │
├─────────┼──┼────┼────┼──────┼───────┼──────┼─────────┼──────────┤
│ example │0 │fork│3221│online│0      │5s    │15.276 MB│ disabled │
└─────────┴──┴────┴────┴──────┴───────┴──────┴─────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

The output should be similar to this. The rest of the commands will have `sudo` in it. Just remove `sudo` from each command, then it should be the same for Windows users.

This can be enhanced even more after starting an app by using the `restart` subcommand with the `name` flag followed by the name of your app.

``` bash
sudo pm2 restart old-app-name --name new-app-name
```

PM2 will automatically restart applications running under it, but we will need to do some additional steps if we want PM2 to launch our application on system startup.

In order to do that, we will use PM2’s startup command, which is:

``` bash
sudo pm2 startup systemd
```

The command above will generate a script that your server will use to initiate PM2 's specific app processes on system boot.

If successful, you should see an output similar to this:

``` bash
[PM2] Generating system init script in  /etc/systemd/system/pm2.service
[PM2] Making script booting at startup...
[PM2] -systemd- Using the command:
      su root -c "pm2 dump && pm2 kill" && su root -c "systemctl daemon-reload && systemctl enable pm2 && systemctl start pm2"
[PM2] Dumping processes
[PM2] Stopping PM2...
[PM2] All processes have been stopped and deleted
[PM2] PM2 stopped
[PM2] Done.
```

Next, we want to let PM2 know which apps to start on boot. We can do this by saving the current process list, which in our case would only be our “example” app.

To save the current process list, run:

``` bash
sudo pm2 save

[PM2] Saving current process list...
[PM2] Successfully saved in /home/deployer/.pm2/dump.pm2
```

That's it! Now PM2 is configured and will automatically launch the applications specified in the saved process list on every reboot.

### PM2 Cluster Mode
The cluster mode allows networked Node.js applications to be scaled across in parallel across all CPUs available, without any code updates.

This increases performance and reliability of your applications, depending on the number of CPUs available at a given time.

To enable the cluster mode, just pass the `-i` option:

``` bash
sudo pm2 start server.js -i max
```

`max` means that PM2 will auto-detect the number of available CPUs and run as many processes as possible.

### Advantages of PM2
#### Built-in clustering
PM2 handles all of the logic for you internally so you don’t have to change anything in your code.

#### Scaling your cluster in realtime
You can scale your cluster anytime by running `pm2 scale <app name> <n>` where `<n>` can be a number for which the cluster can scale up or down.

#### Updating your apps in production with zero downtime
`pm2 reload <app name>` feature will restart your workers one by one, and each worker will wait till the new one has done its job before killing the old one.

This way, your server keeps on running even when you are deploying the new batch straight to production.

#### Apps will stay alive
If any of your workers happens to die, PM2 will restart them immediately so you don’t have to worry about that either.

### Log Management in PM2
PM2 has built-in log management. It collects log data from your applications and jots it down into a single file.

You can even view these logs in real-time to see what’s going on under the hood with your application. Log Management from PM2 comes with log rotation as well, which is important, especially if your app gives verbose output logs regularly.

These are some basic command which you can use to handle the logs of your app:
- `pm2 logs` - Outputs logs from all running applications.
- `pm2 logs app` - Outputs logs from only the app application.
- `pm2 flush` - Flushes all log data, freeing up disk space.

The most important thing to do is to enable log rotation.

By doing this, PM2 will be able to split one big chunk of the log file into many smaller files that they are easier to process by PM2.

To do this, run the following command:

``` bash
pm2 install pm2-logrotate 
```

### Conclusion
PM2 allows us to focus on building amazing applications without worrying about the massive overhead that is required to keep an application up and running and it makes life so much easier when we work with complex data in Node.

This is only a small snippet of what you can do with PM2, but you have to try it out yourself to see the full power that PM2 has to offer.

To find more information about PM2 check out the official docs via [this link](https://pm2.keymetrics.io/).

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

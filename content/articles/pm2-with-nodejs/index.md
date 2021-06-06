---
layout: engineering-education
status: publish
published: true
url: /pm2-with-nodejs /
title: PM2 with Node.js
description: This article will cover PM2, its advantages, how to use it, and why PM2 is popular amongst organizations.
author: harit-joshi
date: 2021-30-19T00:00:00-11:00
topics: [Performance, Node.js, process management]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/pm2-with-nodejs/hero.jpg
    alt: PM2 with Node.js
---


You may be familiar with starting your Node applications by using the default script `npm start`, which will generally run your server directly. This may appear enough initially, but in the real world where your app encounters an error (e.g. requesting a file that doesn’t exist), your app will crash not only for the user who encountered the error but for everyone…that’s bad. This is where PM2 comes in.
<!--more-->
PM2 or PM2, or Process Manager 2 is an incredibly versatile production process manager written in Node.js. This article will cover PM2, its advantages, how to use it, and why PM2 is popular amongst organizations.

### Prerequisites

To follow this tutorial along - the reader should have the following:

- Have Node.js installed in your system. To install Node.js safely in your system visit the official documentation via [this link](https://nodejs.org/en/download/).

- Some prior knowledge about Node.js and should be familiar with Linux commands and operating system.

Before discussing PM2 we will first start with the root of its existence that is Node.js so as to have a clear understanding of PM2.

### What is Node JS?

Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser and whose architecture is based on single-threaded non-blocking
concurrent input/output. It is a lightweight web framework and very friendly to beginners.

Node.js is written in C, C++, and JavaScript, and it is built on the open-source V8 JavaScript engine which also powers JS in browsers such as Google Chrome. As V8 supports new features in JavaScript, they are incorporated into Node.

V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others. To know more about it you can visit to the official documentation via [this link](https://v8.dev/). 

It also has access to a C++ library called Libuv which provides Node.js to have access to OS, filesystem, and to the event, loop to manage asynchronous operations.

### Why Node.js?

Node “uses an event-driven, non-blocking I/O model.” This means that Node is built well to handle asynchronous JavaScript tasks to perform many asynchronous activities such as reading or writing to the file system, handling connections to database servers, or handling requests as a web server, etc.

To handle asynchronous tasks, Node uses a callback-based system. Node functions and methods that might have to do and asynchronous action take a callback function. This callback will be called whenever the asynchronous operation has been resolved. For example,

```js
const fs = require("fs");

fs.readFile("./script.js", function (error, data) {
  // error is null if no error occurred, but an Error object if it did
  if (error) {
    throw error;
  }
  // the file data will be passed into the callback if no error was thrown
  console.log(data);
});
```

In this example, we are using Node’s built-in fs module to read a script.js file. The callback function is called after the file-reading operation is completed. If an error occurred, it will be passed in as an error and thrown. If it doesn’t exist, the retrieved data from the file reading operation is logged to the console.

### Advantages of Node.js

### It offers high performance in real-time
   Web applications powered by Node.js benefit massively from its ability to multitask. Unlike other platforms, its single-threaded, event-driven architecture        processes multiple concurrent requests efficiently.

### Easy Scalability for Modern Applications
   With a growing consumer base of tens of millions of users like Netflix, Walmart, Google, etc have regarded Node.js as a viable solution for scalability.
   The cutting-edge technology comes with tons of features like the cluster module.

### Offers Community Support to Simplify Development
   With millions of developers contributing actively to the Node.js community, you can expect extensive support from development experts across the globe to solve    even the most peculiar development problems.
   For instance, NPM, a package manager for JavaScript, is the biggest package manager registry in the world. It offers numerous tools and libraries available        readily for you to use in your project.

### Node.js reduces Loading Time by Quick Caching
   Node.js made it really easy for developers to reduce task workload and re-execution of code with its caching module. So every time the first module of your web    application gets a request, it gets cached in the in-app memory which is really efficient for frequently visited websites.
   

Node.js allows you to use Microservices that further lets you segregate your application into smaller parts. This way, you get to define tasks and allocate them efficiently among different teams to fast-track the development, deployment, and maintenance of each division of your application.

### What is PM2?

PM2 is a free open source, advanced, efficient, and cross-platform production-level process manager for Node.js with a built-in load balancer. It works on Linux, macOS as well as Windows. It supports app monitoring, efficient management of micro-services/processes, graceful start and shutdown of apps.
It keeps your apps “alive forever” with auto restarts and can be enabled to start at system boot, thus allowing for High Availability (HA) configurations.

### Why PM2?

- Restarting after crashes: PM2 allows us to keep processes running endlessly until we shut down our system.
- Monitoring and managing processes remotely: A web portal allows you to keep track of remote processes and manage them.
- Wide support: PM2 isn’t limited to just Node.js processes, that’s right, you can even use it to keep your Minecraft server online for instance.
- Restart-Persistence: PM2 can remember all your processes and restart them after a system restart.

Let's take an example to really understand all this,

Assume you have a microservice in node js running on port 8000.

```js

const http = require("http");

const hostname = "192.168.43.31";
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("This is the Main App!\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

The above code will runs on the server after executing the node server.js command. But what if something crashes in this small API. We need to restart it manually by executing the same command line and this is a very small code suppose we have an enterprise-level codebase then this will be terrible and time-consuming. 
Here PM2 comes to the rescue by restarting the node API automatically. You will not run your app as root therefore, your app will be more secure.

Your application will restart if it crashes, and it will keep a log of unhandled exceptions. Your application will restart when the server starts.

### Installation of PM2

If you haven't installed Node.js you can safely install it in your system visit the official documentation via [this link](https://nodejs.org/en/download/)
or if you want to save some time so you can also go to this link [this link](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/).

After having a successful installation of Node.js and npm ie. node package manager first thing we need to do is to install PM2 globally on your machine:

``` bash
npm i -g pm2

```

or you can also use this command if the above command doesn't work:

``` bash

npm install pm2@latest -g

```

if you prefer yarn as your package manager then,

``` bash

sudo yarn global add pm2

```

### Starting and Configuring PM2

To start a process under PM2, all you have to do is run ` pm2 start <app> `. An app being the name of the file you’re running. PM2 will output something like this for Windows users.

``` bash

[PM2] Starting C:\Users\moose\app.js in fork_mode (1 instance)
[PM2] Done.
┌──────────┬────┬
│ App name │ id │
├──────────┼────|
│ app      │ 0  │
└──────────┴────|

```

For Linux and Mac users the command and output are a little different:

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

The output should be similar to this. The rest of the commands will have ``sudo`` in it just remove that then it's just the same for Windows users.
As seen above, PM2 will automatically assign an app name based on the file given to PM2’s start. 
This can be customized after starting an app by using the restart subcommand with the ``name`` flag followed by any name which you want to give to your app.

``` bash

sudo pm2 restart old-app-name --name new-app-name

```

PM2 will automatically restart applications running under it, but we will need to take an additional step if we want PM2 to launch our application on system startup. In order to do that, we’ll use PM2’s startup subcommand that is,

``` bash

sudo pm2 startup systemd

```

The above command will generate a script that your server will use to initiate PM2 and specific app processes on system boot.

If successful, you should see something like this:

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

Next, we will want to tell PM2 which apps to start on boot. We can do this by saving the current process list, which in our case would only be our “example” app. To save the current process list, run:

``` bash

sudo pm2 save

[PM2] Saving current process list...
[PM2] Successfully saved in /home/deployer/.pm2/dump.pm2

```

That’s it! Now PM2 is configured and will automatically launch the apps specified in the saved process list between system reboots without any additional intervention.

### PM2 Cluster Mode

The cluster mode allows networked Node.js applications to be scaled across all CPUs available, without any code modifications. This increases the performance and reliability of your applications, depending on the number of CPUs available.

To enable the cluster mode, just pass the -i option:

``` bash

sudo pm2 start server.js -i max

```

`max` means that PM2 will auto-detect the number of available CPUs and run as many processes as possible.

### Advantages of PM2

### Built-in clustering
PM2 internally handles all of the above logic for you so you don’t have to change anything in your code.

### Scaling your cluster in realtime
You can scale your cluster anytime by hitting `pm2 scale <app name> <n>` where <n> can be a consistent number which the cluster will scale up or down to.

### Updating your apps in production with zero downtime
PM2 reload ``<app name>`` feature will restart your workers one by one, and each worker will wait till the new one has spawned before killing the old one.
This way, your server keeps running even when you are deploying the new patch straight to production.

### Apps will stay alive
If any of your workers happens to die, PM2 will restart them immediately so you don’t have to worry about that either.

### Log Management in PM2

PM2 has built-in log management. It aggregates log data from all of your applications and writes it to a single source for viewing. You can even view the logs in real-time to see what’s going on under the hood with your application. Log Management from PM2 comes with log rotation as well, which is important, especially if you’re app is outputting verbose logs on a frequent basis.
These are some basic command which you can use to handle the logs of your app:

 `pm2 logs` Outputs logs from all running applications.

 `pm2 logs app`  Outputs logs from only the app application.

 `pm2 flush` Flushes all log data, freeing up disk space.

The most important thing to do is to enable log rotation. By this PM2 will split one big chunk of the log file into many smaller files that are more manageable for PM2. To do this, run the following command:

``` bash 

pm2 install pm2-logrotate 

```

### Conclusion

PM2 allows us to focus on building amazing applications without worrying about the massive overhead that is required to keep an application up and running and it makes life so much easier when we work with complex data in Node. This is only a small snippet of what you can do with PM2, but you have to try it out yourself to see the power of PM2 that it has to offer. 
To find more information about PM2 check out the official docs via [this link](https://pm2.keymetrics.io/)

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy coding!

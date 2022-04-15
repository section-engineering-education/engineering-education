---
layout: engineering-education
status: publish
published: true
url: /understanding-daemons-in-linux-using-nodejs/
title: Understanding Daemons in Linux Using Node.js
description: In this article, we'll describe the various ways of starting a web server as a daemon process, leaving the reader to pick the one best suited to them.
author: ghali-muga
date: 2022-04-14T00:00:00-14:30
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-daemons-in-linux-using-nodejs/hero.png
    alt: Daemon UNIX with Node.js
---
A daemon is a UNIX program that is executed in the background and does not need any standard I/O services.
<!--more-->
Daemons are used to provide services to other applications like web servers because of their independent nature.

When a daemon process is initialized:
1. It creates a copy/child of itself and proceeds to shut down all standard descriptors (error, input, and output) from this particular copy.
2. It closes the parent process when the user closes the session/terminal window.
3. Leaves the copy/child process running as a daemon.

In this article, we'll describe the various ways of starting a web server as a daemon process, leaving the reader to pick the one best suited to them.

### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What we will test](#what-we-will-test)
- [Daemons, Foreground, and Background tasks](#daemons-foreground-and-background-tasks)
- [SIGHUP signal and the Huponexit parameter](#sighup-signal-and-the-huponexit-parameter)
- [The disown command](#the-disown-command)
- [The nohup command](#the-nohup-command)
- [The screen command and the tmux command.](#the-screen-command-and-the-tmux-command)
- [Using node tools to run web applications as daemons](#using-node-tools-to-run-web-applications-as-daemons)
- [We couldn't leave without mentioning, Systemd](#we-couldnt-leave-without-mentioning-systemd)
- [Conlusion](#conclusion)

### Prerequisites
- For this tutorial, we'll only need a computer running on Linux OS.

### Objectives
By the end of this article the learner should be able to:
- Know and differentiate what are Foreground tasks, Background tasks, and Daemons.
- Understand the ampersand sign '&' in running a background task.
- Understand the SIGHUP signal and the Huponexit parameter with their effects on processes.
- Understand the 'disown' command in running a process as a daemon.
- Understand the 'nohup' command in running a process as a daemon.
- Understand the 'screen' and 'tmux' command in order to run a daemon process.
- Understand the different node tools provided by NPM that allow users to run application programs as daemons.
- Introduce the learner to Systemd.

### What we will test
We'll consider a simple node HTTP module:

```Javascript 
    const http = require('http');

    const server = http.createServer(function(req, res) {
 
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Local host is available');
    }).listen(5000);

    server.on('connection', (socket) => {
        console.log('new connection detected')
    });

    console.log('Listening on port 5000...');

 ```
 
> Saved as **testserver.js**.

You run the code in a new terminal window using:

```Bash 
$ node testserver.js
```

Everything works fine and everyone is happy as they can access port 5000, but what happens when you close the session, the server becomes inaccessible and you're probably out of a job.

What can we do to this code so that whenever we want to access the web application we don't have to initialize it every single time?

Also, how can we make sure that inputs to the testserver.js file won't affect the web app's functionality? It's simple: we make this process a daemon.

### Daemons, Foreground, and Background tasks
Running a script in the same way shown above makes it a **foreground task**, this is because it relies on the terminal window to run and one has to wait for it to finish in order to run another program.

The first step in converting this process to a daemon, is converting it to a background task, we don't want the said program to monopolize the command line window, we want to do other things while the server is running, to do this we write:

```Bash 
$ node testserver.js &
```

When we add the ampersand at the end of the script it automatically becomes a background task. To view all the background tasks you can write:

```Bash 
 $ ps
```

Background tasks have two main characteristics:

- They inherit the standard output (stdout) and the standard error (stderr) of the current terminal window, this means that the output will still be displayed in the command line terminal (as seen by "new connection detected" that's showing on the terminal window).
- They don't inherit the standard input (stdin), if one tries to enter a command or new line - the process will stop.

We've now answered part of our question with this, the background task created with the ampersand sign isn't a daemon yet, it doesn't run in the background "smoothly".

There's also another question, once the user exits the terminal window will the background task still be executed?

### SIGHUP signal and the Huponexit parameter
To answer the question above we need to understand how Linux systems work with the SIGHUP signal and what it is:
1. The user executes the exit input and is ready to exit a session.
2. The system issues a SIGHUP signal to the session.
3. The session sends the SIGHUP signal to all child processes.
4. Child process stops once they receive the signal.

Now we understand why **foreground tasks** terminate when the session is closed, this does apply to **background tasks** as well but is determined by the particular shell's huponexit parameter.

On most Linux systems this parameter is 'off' by default so the background tasks don't terminate when the session is closed.

To check a bash shell's huponexit parameter we type:

```Bash 
$ shopt | grep huponexit
```

The huponexit parameter can still be set to 'on' by the administrator or some other running daemon, so using the ampersand is not always full proof.

### The disown command
The disown command will function to remove a process from the current shell's reach.

This means that it removes the process from the background process lists and as long as a process is not on this list the SIGHUP signal won't "find" it, so it can't tell it to stop executing.

This is a safer approach compared to running it as a background task. Execute the command below and check the jobs list, you won't find the process there, it is now a daemon.

```Bash 
$ node testserver.js &
$ disown
```

The usage of disown is as follows:

1. To remove the most recent background task that was running:

```Bash 
$ disown
```

2. To remove all background tasks:

```Bash 
$ disown -a
```

3. To only keep background tasks from receiving the SIGHUP signal:

```Bash 
$ disown -h
```

4. To remove a specific background task with job-ID reference:

```Bash 
$ disown %2
$ disown -h %2
```

#### The problem of disown command
The main problem of the disown command is that after exiting the session, the testserver.js file is slightly modified and it will cause all sorts of problems.

As an example, after running the command using the disown command, navigate to the **testserver.js** module and add a line of code.

```Javascript 
console.log('Please access the port');
```

I added this line at the very end.

We try running the module using the disown command as shown above and it displays an error, this is a problem if we want an actual daemon process that doesn't display bizarre error messages to the user terminal screen.

Instead of using the disown command as shown above it is better to direct the error somewhere else as shown below:

```Bash
$ node testserver.js > stdout.txt 2> stderr.txt < /dev/null &
$ disown
```

### The nohup command
The nohup command is a better alternative to the disown command, this is because it redirects standard output and error to a file.

We run it using:

```Bash
$ nohup node testserver.js &
```

The nohup command will:
1. Prevent the SIGHUP signal from being sent to the test server process.
2. Close the standard input mechanism thus the process will no longer be able to receive any input, even if it is running in the foreground and that is why we add the ampersand at the end of the command.
3. Transfers the standard output and standard error to the 'nohup.out' file.

### The screen command and the tmux command
A screen command will allow us to have many terminal sessions running concurrently within a single terminal window. It's helpful in that even if you log out and log in you can still attach to the specific screen where the process was running.

It comes pre-installed but if you don't have it use:

```Bash
$ sudo apt-get install screen
```

#### How to use the screen command
1. Start a new terminal window.

2. To start the server:

```Bash
$ screen -S mytestserverscreen

$ node testserver.js
```

3. Press Ctrl + A then Ctrl + D to exit/detach from that particular screen to the 'parent' screen. You can log out from there.

4. To access it the next time you log in to a terminal window **and only if you created one screen** press:

```Bash
$ screen -r
```

5. If you created multiple screens check their names using:

```Bash
$ screen -ls
```

6. To attach/connect to a specific screen use:

```Bash
$ screen -r mytestserverscreen
```

A tmux command will also allow you to perform the same task.

#### How to use the tmux command
1. Start a new terminal window:
 
2. To run the server type:

```Bash
$ tmux
$ node testserver.js
```

If "tmux detach" doesn't work press Ctrl + B and D to go back to the original session.

3. The next time you log in return to where the running service of the app session is in the background by:

```Bash
$ tmux attach
 ```

4. If a user uses multiple sessions the usage is:

- To create a new session:

```Bash
$ tmux new -s mytestservertmuxscreen
```

- Switching to the specific session:

```Bash
$ tmux attach -t mytestservertmuxscreen
```

- Listing all available sessions:

```Bash
$ tmux list-sessions
```

- Killing a specific session:

```Bash
$ tmux kill-session -t mytestserverscreen
```

### Using node tools to run web applications as daemons
The tools built to avoid all the hustle above are **forever**, **nodeman**, and **pm2**.

We use NPM to manage all these tools.

- NPM installation:

```Bash
$ sudo apt-get install npm
```

#### Forever
Forever's distinguishing feature is that it ensures the application will restart when the session is closed.

- Installation

```Bash
$ sudo npm install forever -g
```
- How to use Forever

1. Starting forever as a foreground task:

```Bash
$ forever testserver.js
```

2. Starting forever as a service process:

```Bash
forever start app.js
```

3. Stopping a specific service process:

```Bash
$ forever stop ID_number
```

4. Restarting a specific service process:

```Bash
$ forever restart ID_number
```

5. Listing all processes:

```Bash
$ forever list
```

#### Nodemon
Nodemon is generally only used during development. Its biggest strength is that it has a watch function, which automatically restarts the process once the file changes.

- Installation

```Bash
$ sudo npm install -g nodemon
```

- How to use Nodemon

To use the watch function to monitor changes to a specified file:

```Bash
$ nodemon --watch app --watch libs testserver.js
```

#### PM2
PM2 is by far the most famous of the node tools.

While it can restart and monitor applications, it also collects log report changes.

- Installation

```Bash
$ sudo npm install pm2 -g
```

- How to use PM2

1. Starting the application:

```Bash
$ pm2 start app.js
```

2. To specify the maximum number of processes to start at a given time:

```Bash
$ pm2 start app.js -i max
```

3. To list all available tasks:

```Bash
$ pm2 list
```

4. To stop a specified task:

```Bash
$ pm2 stop 0
```

5. To restart a specified task:

```Bash
$ pm2 restart 0
```

6. To export data:

```Bash
$ pm2 dump
```

7. To start a web interface http://localhost:9615:

```Bash
$ pm2 web
```

> **NOTE** There are a lot of different commands on how to use different node tools but we only look at the most important and commonly used commands.

### We couldn't leave without mentioning, Systemd
All Linux systems have their own daemon management tool known as Systemd.

It's a part of the operating system that interacts directly with the kernel and has a great performance which makes it that much more powerful.

We hand over the program to Systemd and let it manage processes.

### Conclusion
There's a ton of ways of running a process as a daemon, personally I use the nohup method, I feel like I have a grip of the whole process when I use it but one man's food is another man's poison. I'd implore you to test all of them and find your own zen.

Happy coding! :)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)

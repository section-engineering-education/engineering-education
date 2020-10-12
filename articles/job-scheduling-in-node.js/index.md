### Introduction
When building web applications and APIs in Node.js, we sometimes come across tasks that need to be done repeatedly. This can be at a specific time everyday, month or even year depending on the task. Some of these tasks are:

1. Sending periodic emails to customers.
2. Backing up organization's data.
3. Clearing logs from databases etc.

This article goes through the basic syntax of `node-cron`. We will build a simple application that sends periodic emails.

Without further ado, let's dive in.

#### `node-cron` Syntax
It is a package used to schedule tasks(functions or commands) in Node.js. Its name is derived from the Greek word 'Chronos' meaning time.
These tasks can be scheduled to either run once or repeatedly.
`node-cron` uses the *crontab*(cron table) syntax to represent different units of time.

This is how the *crontab* syntax looks like.
```
 # ┌────────────── second (optional) (0-59)
 # │ ┌──────────── minute (0-59)
 # │ │ ┌────────── hour (0-23)
 # │ │ │ ┌──────── day of month (1-31)
 # │ │ │ │ ┌────── month (1-12 (or names))
 # │ │ │ │ │ ┌──── day of week (0-7 (or names, 0 or 7 are Sunday))
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```
Each asterisk acts as a place holder for the specified time units. By default the schedule method runs every minute when no values are passed. Check out [node-cron](https://www.npmjs.com/package/node-cron) package at npm for more syntax details.

It's now time to build our application.

### Prerequisites
To follow through this tutorial, you will need to:
1. Have Node.js installed.
2. Have a basic knowledge of Node.js. [Here](/engineering-education/history-of-nodejs/) is an article to get you started.
3. Have a basic knowledge of the `Express framework`. [Here](/engineering-education/express/) is an article to get you started.
4. Be familiar with sending emails through `nodemailer`. Refer to [this](/engineering-education/node-mailer/) article for a deep dive into node-mailer.

Let's get started.

### Step 1 — Creating a Node Application
Create a directory and give it a name of your choice. I'll name mine (node-cron-example). Then open the directory you have created using your favorite code editor. Now open the terminal and type

```bash
npm init
```
Fill the required fields to create a package.json file that will be used to track dependencies. Add the express framework, node-cron module and node-mailer module by typing

```bash
npm install express node-cron nodemailer
```

### Step 2 — Creating The Server
Now that we have created our node application and initialized it. Let's go ahead and create the server that we will use for scheduling tasks. First, type the code below to import express module and initialize it

```Javascript
const express = require('express');
const app = express();
```

Next up, set the server to listen to port 2400. **Note: You can use a port number of your choice**

```Javascript
app.listen(2400, () => {console.log("Server started at port 2400")});
```

That's all we need for our server now. To start the server type 'node <entry point file>' on the terminal as shown

```bash
node index
```

This is the expected output from the console
```
Server started at port 2400
```

### Step 3 — Scheduling a Task
Now that we have our server up and running. Let's see how to schedule a simple task before we get into sending our emails. Let's start by importing the node-cron module

```Javascript
const cron = require('node-cron');
```

To schedule a task, we pass in our *crontab* expression and the function we want to schedule on a schedule method. In this example, we  pass the default `cron` expression which will schedule the task to run every minute.

```Javascript
cron.schedule('* * * * *', () => {console.log("Task is running every minute")});
```
The console output is as shown

```bash
$ node index
Server started at port 2400
Task is running every minute
Task is running every minute
Task is running every minute
...
```
### Step 4 — Creating The Email Function
Let's create the function that will send emails.  First, import the node-mailer module

```Javascript
const mailer = require('nodemailer');
```

Then create a function and give it a name of your choice.
In the function, we will create a transporter through nodemailer's `createTransport` method. We will then use the `sendMail` method to send the email.

```Javascript
function sendEmail(message){
    // Creating a transporter
    const transporter = mailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'your-username',
            pass: 'your-password'
        }
    });
    //sending the email
    transporter.sendMail({
        from: '"Peter" <peter@kayere.com>',
        to: '"You there" <you@there.com>',
        subject: 'Scheduled Email',
        text: message
    })
        .then(_ => {console.log("Email has been sent")})
        .catch(error => {console.log(error)});
}
```

### Step 5 — Scheduling The Email
In this step, we are going to use the schedule method we created above to schedule the `sendEmail` function. We will schedule the function to run at midnight every Sunday. To represent this using the *crontab* syntax, we will pass zeros for the minutes and hours asterisk and Sunday for the day. This is how we will do it.

```Javascript
cron.schedule('0 0 * * sunday', sendEmail("Hey there, this email was sent to you automatically"));
```
And that's it! Expect to see the log message on Sunday midnight. You can as well use a closer day for testing purpose.

### Conclusion
In this article, we have gone through some of the basic syntax of `node-cron` module. We have also built an application that sends an email every Sunday. This is helpful when we want to automate tasks. It helps the development process and scaling of the application. One does not need to perform the tasks manually. The full code of the application can be found on [github](https://github.com/kayere/node-cron-example.git).

---
Peer review contribution by: [Linus Muema](/engineering-education/authors/linus-muema/)

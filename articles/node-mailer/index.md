---
layout: engineering-education
status: publish
published: true
url: engineering-education/node-mailer/
title: The Nodemailer package in a Node.js Server
description: In this tutorial, we are going to create a server using the Nodemailer package in a Node.js Server. We will send two types of emails; plain text and HTML emails - we will be creating a node server with the help of express.js.
author: linus-muema
date: 2020-08-17T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-mailer/hero.jpg
    alt: Node mailer example image
---
Emails are an essential way of communicating. Most servers today use emails to send information to clients. In this tutorial, we are going to create a server that does the same. We will be sending two types of emails; plain text and HTML emails.

<!--more-->
You can get the starter code from [Github](https://github.com/LinusMuema/node-mailer/tree/starter). It has the following packages.

1. [Express](https://expressjs.com/) - we will be creating a node server with the help of express.js
2. [Nodemailer](https://nodemailer.com/about/) - this npm package  sends emails using SMTP as it's primary transport. It is also used to create plugins like [nodemailer-postmark-transport](https://www.npmjs.com/package/nodemailer-postmark-transport), [gmail-nodemailer-transport](https://www.npmjs.com/package/gmail-nodemailer-transport), etc.
3. [Pug](https://pugjs.org/) - it is a templating engine used to create HTML strings to be rendered.

Before we start, it's important to note that we won't be sending emails to real addresses. This can result in a lot of unnecessary emails in the inbox and/or spam messages. To avoid this, we can use a fake SMTP server that can receive our test emails.

A good service to do this with is [Ethereal](https://ethereal.email/). It will provide us with the required SMTP configurations and the `nodemailer` configuration. Go ahead and create an account. Copy the `Nodemailer configuration` and add it to the `app.js` file. It should look something like the code below:

```JavaScript
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: '<some-username>',
        pass: '<some-password>'
    }
});
```

Then import the nodemailer and express package and initialize the app.

```javascript
const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: '<some-username>',
        pass: '<some-password>'
    }
});

app.use(express.json());
app.listen('2400', () => {console.log('server started on port 2400')})
module.exports = app;
```

The first email we will send will be a plain text email. We use the `sendEmail` function of Nodemailer transport to send the  emails. It takes in the email data as one of the parameters. The data includes:
* `from` - the senders email address
* `to` - the recipient email address
* `subject` - the subject of the email
* `text/html` - the content of the email. It can be plain text or html.

Go ahead and create an endpoint that sends a plain text email.

```JavaScript
app.get('/email/text', (req, res) => {
    transporter.sendMail({
        from: '"moose" <me@moose.dev>',
        to: '"You there" <you@there.com>',
        subject: 'First email',
        text: 'Hello, nice to meet you'
    })
        .then(info => res.send(info))
        .catch(error => res.send(error))
})
```

As you can see, it returns a promise and we return the response or error from the `sendEmail` function. If it was successful, you will get the email in the Ethereal inbox. It is as simple as that.

For HTML, we add the tags inside a string and it will detect the content and style and display it .

```JavaScript
app.get('/email/html', (req, res) => {
    transporter.sendMail({
        from: '"moose" <me@moose.dev>',
        to: '"You there" <you@there.com>',
        subject: 'Second email',
        html: '<h1>Hi again</h1> <p>This time we have used html!</p>'
    })
        .then(info => res.send(info))
        .catch(error => res.send(error))
})
```

In this endpoint we get an email with a header and a paragraph below it. A very small difference with the plain text. The only problem with this is that we may need to load a whole webpage in the string. This results in dirty and unreadable code.

To solve that, we can make use of a templating engine. We can use it to generate the entire HTML code then we can pass it in the HTML value. For that, we will use Pug.

First, create a package in the root-level of the project and name it `views`. Inside the package, create a file, and name it `email.pug` and add the following code.

```pug
html
    head
        title Pug Email template
    body
        h1 Hey there
        p We have now used a pug file. Yaay!
```

You will notice that we do not use the angle-brackets with pug and indentation is also very important. It shows relationship between elements. Read more about it in the [official documentation](https://pugjs.org/api/getting-started.html). Go ahead and import the package then add the following endpoint.

```JavaScript
app.get('/email/file', (req, res) => {
    let body = pug.renderFile('views/email.pug')
    transporter.sendMail({
        from: '"moose" <me@moose.dev>',
        to: '"You there" <you@there.com>',
        subject: 'Third email',
        html: body
    })
        .then(info => res.send(info))
        .catch(error => res.send(error))
})
```

As you can see, we use the `renderFile` function to compile our Pug code to HTML and get the resulting string. Then we pass the string to the HTML field. The good thing about this is that you can have a wide variety of elements and still have clean and organized code.

With that, you are now able to send emails from your Node.js server. You can use the [Gmail SMTP](https://www.siteground.com/kb/google_free_smtp_server/) settings to send emails to real addresses. A good challenge can be adding images to your email so go ahead and try it out! The full code of this tutorial can be found on [Github](https://github.com/LinusMuema/node-mailer). Feel free to open a PR or submit an issue.

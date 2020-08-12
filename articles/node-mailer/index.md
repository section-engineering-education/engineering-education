Emails are an essential way of communicating. Most servers today use emails to send information to clients. In this tutorial, we are going to create a server that does the same. We will send two types of emails; plain text and HTML emails.

You can get the starter code from [Github](https://github.com/LinusMuema/node-mailer/tree/starter). It has the following packages.

1. [Express](https://expressjs.com/) - we will be creating a node server with the help of express.js
2. [Nodemailer](https://nodemailer.com/about/) - this npm package  sends emails using SMTP as it's primary transport. It is also used to create plugins like [nodemailer-postmark-transport](https://www.npmjs.com/package/nodemailer-postmark-transport), [gmail-nodemailer-transport](https://www.npmjs.com/package/gmail-nodemailer-transport), etc.
3. [Pug](https://pugjs.org/) - it is a templating engine used to create HTML strings to be rendered.

Before we start, we won't be sending emails to real addresses. This can result in a lot of unnecessary emails in the inbox and/or spam messages. Due to this, we can use a fake SMTP server that can receive our test emails. A good service to do this is [Ethereal](https://ethereal.email/). It will provide us with the required SMTP configurations and the `nodemailer` configuration. Go ahead and create an account. Copy the `Nodemailer configuration` and add it to the `app.js` file. It should look something like the code below:

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: '<some-username>',
        pass: '<some-password>'
    }
});
```

Then import the nodemailer and express package and initialise the app. 

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

The first email we will send will be a plain text email. We use the `sendEmail` function of Nodemailer transport to send emails. It takes in the email data as one of the parameters. The data includes :
* `from` - the senders email addresss
* `to` - the receipient email address
* `subject` - the subject of the email
* `text/html` - the content of the email. It can be plain text or html.

So go ahead and create an endpoint that sends a plain text email. 

```javascript
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

```javascript
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

To solve that, we can make use of a templating engine. We can use it to generate the entire html code then we can pass it in the html value. For that, I will use pug.

First, create a package in the root-level of the project and name it `views`. Inside the package, create a file named `email.pug` and add the following code. 

```pug
html
    head
        title Pug Email template
    body
        h1 Hey there
        p We have now used a pug file. Yaay!
```
You will notice that we do not use the angle-brackets with pug and indentation is very important. It shows relationship between elements. Read more about it in the [official documentation](https://pugjs.org/api/getting-started.html). Go ahead and import the package then add the following endpoint. 

```javascript
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

As you can see, we use the `renderFile` function to compile our pug code to HTML and get the resultant string. The we pass the string to the html field and the. The good thing about this is that you can have a wide variety of elements and have a clean, organised code.

You can find the full code of this tutorial on [Github](https://github.com/LinusMuema/node-mailer). A good challenge can be adding images to your email so go ahead and try it out!


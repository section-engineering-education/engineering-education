---
layout: engineering-education
status: publish
published: true
url: /how-to-prevent-cross-site-scripting-in-node-js/
title: How to Prevent Cross-Site Scripting in Node.js
description: Cross-site scripting attacks (XSS) are common security issues in modern web security. XSS attacks are conducted by attackers who use vulnerable web applications to inject malicious code.
author: pauline-mwangi
date: 2021-05-20T00:00:00-13:00
topics: [Node.js, Security]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/how-to-prevent-cross-site-scripting-in-node-js/hero.jpg
   alt: Problem framing in machine learning example image
---
This article will help the reader understand what Cross-site scripting attacks (XSS) are, how XSS works, and how XSS disrupts websites. We will also go over how to prevent this vulnerability in the Node.js platform. Computer security plays a vital role in maintaining and protecting information stored within web applications.
<!--more-->
Web applications are currently preferred when giving access to services and information over the world wide web (WWW). Web applications offer numerous services on the internet, such as e-businesses and internet banking. 

Despite efforts to protect web applications, they still suffer from severe breaches and attacks. These attacks threaten the security of web applications. One such attack is known as cross-site scripting (XSS) attacks.

Cross-site scripting attacks are common security issues in modern web security. XSS attacks are conducted by attackers who use vulnerable web applications to inject malicious code.

The malicious code executes in the browser, the attacker steals cookies from account users and gains sensitive and confidential information in the web application.

Once the malicious code is injected, that may put the website under the control of an attacker. There are solutions to these attacks on both the client and server sides.

### Table of contents
- [What is cross-site scripting (XSS)](#what-is-cross-site-scripting-xss)
- [How XSS works](#how-xss-works) 
- [Types of XSS attacks](#types-of-xss-attacks)
- [How to prevent XSS](#how-to-prevent-xss)

### Prerequisites
An understanding of Node.js and JavaScript is required to easily follow along.

### What is cross-site scripting (XSS)
Cross-site scripting (XSS) is a code injection attack on web applications. Attackers use vulnerable websites to inject malicious code or a script. The XSS allows the attacker to inject the malicious code using script languages such as JavaScript.

The malicious code is executed on the user's browser. The attacker then can access cookies, passwords, and other confidential information saved by the browser.

A web application is vulnerable to XSS if the user input is not encoded appropriately. When the user input is encoded incorrectly, the malicious script is sent to users and executed.

Improper input validation and sanitization of data provided by the web application user are the leading causes of XSS attacks.

### How XSS works
XSS works by exploiting a vulnerable web application. An attacker sends malicious code to users and is executed. When the malicious script executes, the attacker can interact with the application.

To prevent XSS, a developer has to know how XSS works. Let's go through this scenario to understand how XSS works.

XYZ is an E-Commerce site selling items to clients. The item's data is sent to a server and stored in a database. If one needs to purchase an item, you must create an account and get verified to be a legitimate user of the website. A user logs in to the website. The system has to validate if the one trying to sign in is a legitimate user of the website before gaining access.

On the other side, an attacker creates a hyperlink and enters JavaScript code. The code would read the cookie of the user accessing the web page. The script is sent, processed, and stored in the database.

A web user (victim) executes the code on their browser by clicking a link. The malicious code reads his cookie and sends it to the attacker’s web server.

Attackers use vulnerable web applications to spread attacks to web users. The attacker also can modify the affected site and steal usernames and passwords from user accounts. Since cookies store the user's session, the attacker receives the user's digital identity. The attacker loads the user's cookie into his browser, impersonating the user into the web app.

The attacker can see and do everything the user is entitled to see and do with it the user's session. The user's cookie is passed on the server and validated. Given that the cookie contains the user's current session, the server believes the request is from the legitimate user.

All this time, the user is unaware that an attack is happening. That is how XSS attacks work.

Cross-site scripting vulnerabilities are:
- Easy to spot.
- Easy to use.
- Have a high impact on your business security.

### Types of XSS attacks
Below are different types of XSS attacks.

#### Reflected cross-site scripting
[Reflected XSS](https://portswigger.net/web-security/cross-site-scripting/reflected) (Non-persistent XSS) is an attack that occurs when a malicious script is redirected to an application via the HTTP. In non-persistent XSS, the malicious code is executed instantly in the victim's browser. 

If the server fails to encode the user inputs properly, the attacker might search for such a string `<script>alert (‘XSS!')</script>`. This JavaScript code reflects on the browser as part of the code. The code is then executed to display an alert that confirms XSS vulnerability. Below is an example of a reflected XSS attack.

The HTTP link before the malicious code is injected

```bash
https://example-webapp.com/report =Safe
```

How the attack is performed,

```bash
https://example-webapp.com/report =<script>\/*Not+Safe…?+*/</script>
```

When the user accesses the URL sent by the attacker, the malicious script executes immediately in the browser.

#### Stored cross-site scripting
[Stored XSS](https://portswigger.net/web-security/cross-site-scripting/stored) (Persistent XSS) occurs when a malicious script is saved in the website's database. The malicious script executes when the user accesses the web app. At any moment the victim opens the browser, the malicious script runs.

#### DOM-based cross-site scripting
This is an attack in the DOM (Document Object Model). It arises when a malicious script executes due to DOM modification in a user's browser. Most developers do not understand how [DOM-based XSS](https://portswigger.net/web-security/cross-site-scripting/dom-based) works.

### How to prevent XSS
XSS is the leading attack for web applications. Now that we have a better understanding of XSS and how it damages applications. We will go over the following, which are techniques used to [prevent XSS vulnerability](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) in Node.js

#### Output encoding
Output encoding translates untrusted input into a safe model. It takes place by running a JavaScript entity encoding in a Node.js platform server prior to sending untrusted data into the browser. 

#### Avoid inserting untrusted data
Developers must deny inserting untrusted data to prevent XXS. JavaScript escaping should be used when untrusted data is inserted in a JavaScript code. Avoid passing untrusted data into executable JavaScript functions such as `eval`. The function `eval` evaluates or executes an argument.

The Node.js `eval` function enable code injections. Code injection is a security vulnerability caused by processing invalid data. An attacker introduces a malicious code that is executed in an application.

The `eval` function takes a string argument and interprets it as a JavaScript code allowing the attacker to execute it. Below is an example of passing untrusted data to the `eval` function which executes a script. 

This simple example executes code when you enter a code like `alert ('XSS!');` in one of the operations.

```js
function compute() {
  var opr1 = $('#operation1').val();
  var opr2 = $('#operation2').val();
  var answer = eval(opr1 + ' + ' + opr2);
  $('#answer').text(answer);
}
```

The only secure way to insert untrusted data into the JavaScript code is inside a quoted (") data value. 

For example, 
```js
<script>Alert (“…encode untrusted data before being executed…”)</script>
```

Putting untrusted data inside a script is dangerous because it is very easy for attackers to switch into an execution context with characters such as (;, =, +, &, < and >) and many more. 

#### Validating user input
To prevent XSS, developers must [validate user input](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) and encode the output. Validation of user input is a defense technique used on the server-side to prevent XSS attacks. This means XSS mitigation measures are applied on a Node.js platform.

Input validation is performed to make sure only secure data enters an information system. Validation of user input should happen as soon as data is received from the other party.

Use the following script to prevent XSS by input validation.
```js
var validator = require('validator');
var escaped_string = validator.escape(string);
```

Validating input before processing the attacker's request is important because it prevents XSS attacks early on. Input validation detects unauthorized user input before the application executes it. Special characters such as (. and \ ) should be filtered to prevent them from being used maliciously.

It is essential to carry out server-side input validation when preventing XSS attacks. The server-side is mainly preferred for input validation because it can easily be bypassed when done via the client-side.

While validating user input with server-side JavaScript (Node.js), try the npm module `strip-js`. 

It does the following:
- Sanitizes data.
- Do away with script tags.
- Remove attributes that contain JavaScript code, i.e., `onclick` and `onerror`.
- Remove “href” attributes with JavaScript code.

#### Sanitizing input
Input sanitization is an XSS prevention method that filters and cleans data inputs for app users. Sanitizing inputs gets rid of any illegal value from the data.

Properly sanitized input ensures that users can submit only trusted data. It ensures that only expected data is inputted, i.e. (only authorizing input fields to accept parenthesis, numbers, and hyphens). Sanitizing data in an HTTP request before execution ensures data is validated, escaped, and filtered before it is outputted to the user.

#### HttpOnly: Preventing cookies against XSS
Another way to prevent XSS is preventing cookie access by browser JS scripts. Theft of cookies is one of the most common XSS attacks. It is achieved by setting the cookie `httpOnly` value to `true` in the below code.

```js
app.use(express.session({
    secret: "k5Zurj4",
    cookie: {
        httpOnly: true,
        secure: true
    }
})
)
```

Setting the cookie `httpOnly` value to `true` helps prevent the client-side script from accessing the protected cookie. `HttpOnly` tells the browser not to expose the cookie to the script.

### Conclusion 
Cross-site scripting is the leading security problem faced by web applications. n this article we have learned what XSS is and how dangerous it is. We have also learned how to prevent it in a server-side platform (Node.js).

To summarize:
- The reader has learned what cross-site scripting is.
- How XSS works.
- Types of XSS attacks.
- The reader has learned how to prevent XSS attacks in a node.js platform.

I hope this article helps you understand XSS and how to prevent it on the server-side platform.

Happy learning!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

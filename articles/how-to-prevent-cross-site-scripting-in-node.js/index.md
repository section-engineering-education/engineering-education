Web applications are currently are preferred for giving access to services and information over the world wide web (WWW). Web applications offer numerous services on the internet, such as (e-businesses and internet banking). Computer security plays a vital role in maintaining and protecting information stored in web applications.

Despite protecting the web applications, they still suffer from severe breaches and attacks. These attacks threaten the security of web applications, such as cross-site scripting (XSS) attacks.

Cross-site scripting attacks are common security issues in modern web security. XSS attacks are conducted by attackers who use vulnerable web applications to inject malicious code.

The malicious code executes in the browser, the attacker steals cookies from account users and gains sensitive and confidential information in the web application.

Once the malicious code is injected, that may put the website under the control of an attacker. There are solutions to these attacks on both client and server sides. This article will make you understand what XSS is, how XSS works, and how XSS disrupts websites and prevent this vulnerability in the Node.js platform.

### Table of Contents
[What is cross-site scripting (XSS)](#what-is-cross-site-scripting-xss)
[How XSS works](#how-xss-works) 
[Types of XSS attacks](#types-of-xss-attacks)
[How to prevent XSS](#how-to-prevent-xss)

### Prerequisites
A strong understanding of Node.js and JavaScript is required to follow along easily.

### What is cross-site scripting (XSS)
Cross-site scripting (XSS) is a code injection attack on web applications. Attackers use vulnerable websites to inject malicious code or a script. The XSS allows the attacker to inject the malicious code using script languages such as JavaScript.

The malicious code is executed on the user's browser. The attacker then can access cookies, passwords, and other confidential information saved by the browser.

A web application is vulnerable to XSS if the user input is not encoded appropriately. If the user input is not encoded correctly, the malicious script is sent to users and executed.

Improper input validation and sanitization of data provided by the web application user are the leading causes of XXS attacks.

### How XSS works
XSS works by exploiting a vulnerable web application. An attacker sends malicious code to users and is executed.
When the malicious script executes, the attacker can interact with the application.

Some developers do not understand how XSS works. To prevent XSS, a developer has to know how XSS works. Go through this scenario to understand how XSS works.

XYZ is an E-Commerce site selling items to clients. The item's data is sent to a server and stored in a database. If one needs to purchase an item, you must create an account and get verified to be a legitimate user of the website. A user logs in to the website. The system has to validate if the one trying to sign in is a legitimate user of the website before gaining access.

On the other side, an attacker creates a hyperlink and enters a JavaScript code. The code would read the cookie of whoever opening the web page. The script is sent, processed, and stored in the database.

A web user (victim) executes the code on their browser by clicking a link. The malicious code read his cookie and send it to the attacker’s web server.

Attackers use vulnerable web applications to spread attacks to web users. The attacker also can modify the affected site and steal usernames and passwords from user accounts. Since cookies store the user's session, the attacker receives the user's digital identity. The attacker loads the user's cookie into his browser, impersonating the user into the web app.

The attacker can see and do everything the user is entitled to see and do with the user's session. The user's cookie is passed on the server and validated. Given that the cookie contains the user's current session, the server believes the request is from the legitimate user.

All this time, the user is unaware that an attack is happening. That is how XSS attacks work.
Cross-site scripting vulnerabilities are:
- Easy to spot
- Easy to use
- Have a high impact on your business security

### Types of XSS attacks
Below are the different types of XSS attacks.

#### Reflected cross-site scripting
[Reflected XSS](https://portswigger.net/web-security/cross-site-scripting/reflected) (Non-persistent XSS) is an attack that occurs when a malicious script is redirected to an application via the HTTP. In non-persistent XSS, the malicious code is executed instantly in the victim's browser. 
If the server fails to encode the user inputs properly, the attacker might search for such a string `<script>alert (‘XSS!')</script>`. This JavaScript code reflects on the browser as part of the code. The code is then executed to display an alert that confirms XSS vulnerability.
Below is an example of a reflected XSS attack.
The HTTP link before the malicious code is injected
`https://example-webapp.com/report =Safe`
How the attack is performed,
`https://example-webapp.com/report =<script>\/*Not+Safe…?+*/</script>`.
When the user accesses the URL sent by the attacker, the malicious script executes immediately in the browser.

#### Stored cross-site scripting
[Stored XSS](https://portswigger.net/web-security/cross-site-scripting/stored) (Persistent XSS) occurs when a malicious script is saved in the website's database. The malicious script executes when the user accesses the web app. At any moment the victim opens the browser, the malicious script runs.

#### DOM-based cross-site scripting
It is an attack in the DOM (Document Object Model). It arises when a malicious script executes due to DOM modification in a user's browser.
Most developers do not understand how [DOM-based XSS](https://portswigger.net/web-security/cross-site-scripting/dom-based) works.

### How to prevent XSS
XSS is the leading attack for web applications. Now that we have an understanding of XSS and how it damages applications. The following are techniques used to [prevent XSS vulnerability](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) in Node.js

#### Output Encoding
Output encoding translates untrusted input into a safe model. It takes place by running a JavaScript entity encoding in a node.js platform server prior to sending untrusted data into the browser. 

#### Avoid Inserting Untrusted Data
Do not pass untrusted data into executable JavaScript functions such as `eval`. In the Node.js `eval` function, enable code injections. The `eval` function takes a string argument and interprets it as a JavaScript code allowing the attacker to execute it.
The only secure way to use if you insert untrusted data into the JavaScript code is inside a quoted (")data value. That is the proper context for inserting data into a JavaScript code. For example, 
```js
<script>Alert (“…encode untrusted data before being executed…”)</script>
```

#### Validating User Input
To prevent XSS, developers must [validate user input](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) and encode the output. Validation of user input is a defense technique used on the server-side to prevent XSS attacks. This means XSS mitigation measures are applied on a node.js platform.

Input validation is performed to make sure only secure data enters an information system. Validation of user input should happen as soon as data is received from the other party. Use the following script to prevent XSS by input validation.
```js
var validator = require('validator');
var escaped_string = validator.escape(string);
```

Validating input before processing the attacker's request is important because it prevents XSS attacks early. Input validation detects unauthorized user input before the application executes it. Special characters such as (. and \ ) should be filtered to prevent them from being used maliciously.

It is essential to carry out server-side input validation when preventing XSS attacks. Server-side is mainly preferred for input validation because it can easily be bypassed when done via the client-side.

While validating user input with server-side JavaScript (node.js), try the npm module `strip-js`. It does the following:
- Sanitizes data
- Do away with script tags
- Remove attributes that contain JavaScript code, i.e., `onclick` and `onerror`.
- Remove “href” attributes with JavaScript code.

#### Sanitizing input 
Properly sanitized input ensures that users can submit only trusted data. It ensures that only expected data is inputted, i.e. (only authorizing input fields to accept parenthesis, numbers, and hyphens).  Sanitizing data in an HTTP request before execution ensures data is validated, escaped, and filtered before it is outputted to the user.

Another way to prevent XSS is preventing cookies from browser JS scripts. This is achieved by setting the cookie `httpOnly` value to `true` in the below code.
```js
app.use(express.session({
    secret: "k5Zurj4",
    cookie: {
        httpOnly: true,
        secure: true
    }
})
```

### Conclusion 
Cross-site scripting is the leading security problem faced by web applications. We have learned what XSS is and how dangerous it is. Also, we have known how to prevent it in a server-side platform (Node.js).
To summarize:
- The reader has learned what cross-site scripting is.
- How XSS works
- Types of XSS attacks
- The reader has learned how to prevent XSS attacks in a node.js platform.
I hope this article helps you understand XSS and how to prevent it on the server-side platform.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

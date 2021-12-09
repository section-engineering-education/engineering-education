---
layout: engineering-education
status: publish
published: true
url: /understanding-cross-site-scripting-attacks/
title: Understanding Cross-Site Scripting Attacks
description: In this tutorial, we will take a look at what cross-site scripting attacks are with simple hands-on examples.
author: shuaib-oseni
date: 2021-12-09T00:00:00-10:40
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-cross-site-scripting-attacks/hero.png
    alt: cross-site scripting attacks
---
Cross-site scripting (XSS) is a type of web application vulnerability that attacks a websites user rather than the server itself. XSS allows an attacker to impersonate a vulnerable user and conduct any activities or use any data that the user has access to.
<!--more-->
The Open Web Application Security Project publishes the [OWASP Top 10 report](https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)). It is a list of the most serious web application security concerns. In the OWASP Top 10 of 2017, XSS was the second most prevalent issue and was found in around two-thirds of all applications.

In this article, we'll go through XSS attacks in detail, their impact, and how to mitigate them.

> **Disclaimer:** This article is for educational purposes only.

### Prerequisites

- Basic knowledge of HTML and Javascript

### How XSS works
Cross-site scripting is accomplished by fooling susceptible web applications into returning malicious Javascript to users. The attacker gets complete control over how the victim interacts with the app when malicious code is executed inside the victim's browser by collecting:

- session cookies 
- user credentials 
- tokens
- secrets

Among other information.

![xss](/engineering-education/understanding-cross-site-scripting-attacks/xss.png)

### XSS Attack
First, we need to find a vulnerable website. As we can't go around testing random websites on the internet, we'll be carrying out this attack on an intentionally vulnerable website. We'll be making use of an online vulnerable web application by [Acunetix](https://acunetix.com). To use the vulnerable web app, we visit [Acunetix vulnerable application](http://testphp.vulnweb.com/).

![acunetix](/engineering-education/understanding-cross-site-scripting-attacks/acunetix.png)

The next step is to locate an input field where we can paste our script. It could be a username, a search box, a text area, or any other type of input field. Our vulnerable website has a search box, perfect! Now, let's give it some simple HTML code and see what happens. Type in the following HTML code in the search box and hit the go button:

```html
<u>test</u>
<!-- the HTML u tag or underline tag is used to give a word an underline in HTML -->
```

![html](/engineering-education/understanding-cross-site-scripting-attacks/u.png)

From the screenshot above we can see that the word `test` is underlined. Perfect! We are getting a reflection on the page. By viewing the application's source code, we can also see how it's reflected.

![view-page source](/engineering-education/understanding-cross-site-scripting-attacks/test1.png)

Now let's look for XSS. The most simple XSS payload is the script tag. A script tag can either reference or embed JavaScript code. One of the most common XSS payloads is the use of the JavaScript alert function in a script tag. Let's try this by entering the following payload in our web application's search box:

```javascript
<script>alert(1)</script>
```

![alert](/engineering-education/understanding-cross-site-scripting-attacks/alert.png)

We notice that as soon as we hit the go button after entering our XSS payload, we get an alert box with `1` displayed, which means our payload worked successfully. We just used the [alert](https://www.w3schools.com/jsref/met_win_alert.asp) function within JavaScript to display 1.

### Types of XSS

#### Reflected XSS
This is a one-time XSS. The malicious script is part of the victim's online application request which is frequently reflected in the application's response.

Reflected XSS is most commonly employed in targeted attacks where the hacker sends a phishing email with the malicious script in the URL. The attacker could even post a link on a public website and deceive the user into clicking it.

#### Stored XSS
Also known as `Persistent XSS`, the payload is saved on the server and can be triggered by a victim without requiring any user interaction outside of the application. This type of XSS happens when the server saves your supplied input somewhere into the server (i.e. a database or cache server).

#### Stored XSS Example
Let's go back to our vulnerable web application. We click on the `Your profile` tab, which presents us with a login page.

![profile-login](/engineering-education/understanding-cross-site-scripting-attacks/profile-login.png)

Now let's log in with these default credentials: 

```bash
username: test
password: test
```

![logged in](/engineering-education/understanding-cross-site-scripting-attacks/in.png)

Now that we are logged in, let's inject our payload in the name field and click on the update button to update our profile:

```javascript
<script>alert(1)</script>
```

![stored](/engineering-education/understanding-cross-site-scripting-attacks/stored.png)

As we can see, we got an alert box. This occurred because the payload was saved in the name field, and the alert box was triggered every time the page was loaded.

#### DOM XSS
The victim's browser is directly affected by DOM XSS, a local attack. The *Document Object Model* (DOM), the browser's API for manipulating and presenting web pages, is used in this attack rather than malicious content being delivered to the server.

### The impact of XSS
Through XSS, the attacker can do the following:
- capture user credentials
- deface the website 
- impersonate a user 
- carry out user actions

### How to mitigate XSS attacks
You may prevent XSS attacks through:
- the usage of appropriate response headers
- the filtering of user input
- the encoding of data on output
- sanitization of HTML

### Conclusion
XSS is a common web vulnerability. Web vulnerability scanners such as [burp suite](https://portswigger.net/burp), can be used to carry out XSS tests on web applications. You can read more on XSS here:

- [Portswigger](https://portswigger.net/web-security/cross-site-scripting)
- [Owasp](https://owasp.org/www-community/attacks/xss/)

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)

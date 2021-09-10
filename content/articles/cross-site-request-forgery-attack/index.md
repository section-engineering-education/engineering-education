---
layout: engineering-education
status: publish
published: true
url: /understanding-csrf/
title: Understanding Cross-site Request Forgery Attacks
description: This tutorial will provide an overview of CSRF and how it works. We will look at the impact of CSRF on a web application and how to prevent it.
author: pauline-mwangi
date: 2021-08-28T00:00:00-05:48
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-csrf/hero.jpg
    alt: Attack Cross-site CSRF Image
---

Cross-site request forgery (CSRF) is the third massive security vulnerability in web applications after [Cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/) and [SQL injection (SQLi)](https://owasp.org/www-community/attacks/SQL_Injection). 
<!--more-->
XXS is a malicious code injection attack on a vulnerable web application that is executed when the user visits the app on a browser. The malicious code makes the web app do something that it is not supposed to. SQLi is a web app vulnerability that enables attackers to interfere with the SQL queries in the database.

Web browsers are the most affected by CSRF attacks. When given a file to run, they can't tell if it is malicious or not. So, the web browsers go ahead and run the files.

CSRF attacks occur when an authenticated user sends a malicious request to a web application to perform an unwanted action. CSRF attacks exploit vulnerable web applications. This article will walk you through CSRF attacks and how to prevent them. 

### Table of contents
1. [Overview of CSRF attacks](#overview-of-csrf-attacks)
2. [How CSRF attacks work](#how-csrf-attacks-work)
3. [Impacts of CSRF attacks](#impacts-of-csrf-attacks)
4. [Testing for CSRF attacks](#testing-for-csrf-attacks)
5. [How to prevent CSRF attacks](#how-to-prevent-csrf-attacks)

### Prerequisites
Before you proceed, you are required to have:
- An understanding of web security.
- An understanding of [HTTP methods](https://www.w3schools.com/tags/ref_httpmethods.asp).

### Overview of CSRF attacks
[CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attack is a web security vulnerability that forces users to conduct malicious actions unknowingly on a web application they are currently authenticated on.

In a CSRF attack, the attacker exploits the user's trust to execute functions for themselves. This type of attack only happens to vulnerable web applications. With the help of social engineering platforms, attackers can launch a CSRF attack.

CSRF attacks should at no time occur if websites are correctly developed. First, the application must have anti-forgery mechanisms. Second, encryption and cryptography techniques ensure that third-party users can't handle requests using your browser.

### How CSRF attacks work
A CSRF attack aims at web applications that cannot differentiate between valid and forged requests dominated by the attacker. There are multiple ways an attacker uses to exploit the CSRF vulnerability.

To understand how it works, let us go through this scenario:

We have an attacker who wants to exploit a vulnerable online banking system. The attacker wants to forge a request to send money from a user's logged-in online banking account to his account.

The attacker forges a request. Inside of that request, another request is embedded in a hyperlink. If the user clicks on that link, the request is sent to the server, which transfers funds from the logged-in user's account into the attacker's account.

From the above illustration, CSRF works by an attacker gaining access to a victim's browser through a malicious link. To launch this attack:
1. The attacker must create a malicious URL.
2. The attacker has to trick the user (victim) into clicking the malicious link.
3. The attacker has to forge the request to perform malicious activities.
4. The victim must have an active session with the web-based banking system.

CSRF attack only works if the victim is logged in to the application when the request is made. The application checks if the cookies of a logged-in session are functional. If the cookies are available, they are submitted with the request. If the session is valid, the application approves the cookies submitted. Therefore, the CSRF attack becomes successful.

These are ways an attacker uses to exploit the CSRF vulnerability.

#### GET requests
Referring to our previous example, let us assume that the online banking account uses the HTTP GET request method to conduct transactions. The users request to transfer funds to another person could look like this:

```bash
http://bankexample.com/onlinetransfer?amount=5000&account=receiver
```

The attacker creates a malicious URL that transfers funds from the victim's account. The attacker takes the original request, then forges another request, and substitutes the beneficiary name with their own, as seen below:

```bash
http://bankexample.com/onlinetransfer?amount=$5000&account=attacker
```

The attacker then tricks the user into clicking the above malicious URL. He uses social engineering mechanisms to force the user into executing the URL. The malicious URL is embedded into HTML content and sent to the user.

```html
<a href="http://bankexample.com/onlinetransfer?amount=$50000&account=attacker">Click here now!</a>
```

Once the user clicks the link, funds are transferred to the attacker's account without his consent. However, if the victim has an active session with the online banking application, the request is treated to be legit.

#### POST requests
If the online banking application uses the HTTP POST request method to transfer funds, sending malicious requests using links is impossible.

However, the malicious request can be submitted using a form. Also, the attacker can use JavaScript to designate and enable the form to be executed automatically.

Below is how the form may look like:

```html
<body onload="document.forms[0].submit()">
  <form action=" http://bankexample.com/onlinetransfer" method="POST">
    <input type="hidden" name="account" value="attacker"/>
    <input type="hidden" name="amount" value="$50000"/>
    <input type="submit" value="Click here now!"/>
  </form>
</body>
```

### Impacts of CSRF attacks
CSRF is a dangerous vulnerability that abuses the trust between the victim's browser and the web server. The magnitude of its impact depends on the number of benefits allocated to the user.

For instance, if the victim is a normal user, the attacker can fully control the user's account. However, if the victim has an administrative role, the attacker might exploit the entire web application.

CSRF has been used to perform several malicious activities such as stealing data, unauthorized funds transfer, changing passwords, damaging clients' relationships, spreading worms or malware, and many more.

### Testing for CSRF attacks
CSRF testing is finding CSRF vulnerabilities in web applications. Testing for CSRF vulnerabilities can be done either manually or using automated tools. 

#### Manual testing for CSRF attacks
If you want to find out if the session is not secure, you need to examine the web app's session. If session handling is on the client-side and displays data to the browser, the web app is vulnerable. The data displayed on the browser is the HTTP authentication credentials and cookies.

Resources accessible via the HTTP GET requests are no doubt vulnerable. Even though JavaScript automates POST requests, they are exposed and vulnerable. Therefore, the use of POST hardly solves CSRF vulnerabilities.

The tester can use the following methods of testing:
- Black box testing.
- Gray box testing.

[Black box testing](https://www.javatpoint.com/black-box-testing) is a technique that helps testers find vulnerabilities that make applications and systems exploitable from the outside. It examines the functionality of an application without knowing much about the internal structure.

[Gray box testing](https://www.javatpoint.com/grey-box-testing) is a technique for applications and systems to examine the external and internal workings. It aims to understand and identify errors that belong to applications and systems.

#### Tools for CSRF testing
1. [CSRF Tester](http://www.owasp.org/index.php/Category:OWASP_CSRFTester_Project)
2. [OWASP ZAP](https://www.zaproxy.org/)
3. [Pinata CSRF tool](http://code.google.com/p/pinata-csrf-tool/)

### How to prevent CSRF attacks
IT security experts suggest multiple CSRF prevention techniques. Let's go through some practices to prevent CSRF vulnerabilities:
- Disable HTTP methods.
- Make sure the antivirus in your computer is up to date.
- Do not save passwords and login credentials in the browser.
- Do not open suspicious emails, navigate to other sites or perform social network communications while authenticated on a web application.
- Log out entirely from a web application immediately after a session.
- Carry out regular security tests.
- Secret token validation.
- Using referrer headers.
- Reject unsolicited authentication requests.

For more CSRF prevention alternatives, visit the [CSRF prevention cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) by OWASP.

### Conclusion
CSRF attack is a severe threat to web applications. The vulnerability depends on how the HTTP protocol manages web requests and processes. In a CSRF attack, the attacker tricks the authenticated user into performing malicious action on a web application without the user's knowledge. This causes a significant impact on the victim or the entire web application.

To summarize, we have looked at:
- What CSRF attacks are.
- How CSRF attacks work.
- Impacts of CSRF attacks.
- Testing for CSRF attacks.
- How to prevent CSRF attacks.

Happy learning!
### Further reading
1. [Cross-site request forgery](https://owasp.org/www-community/attacks/csrf)
2. [How to prevent Cross-site scripting in Node.js](https://www.section.io/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/)
3. [How to fix and prevent SQL injection in WordPress](https://www.section.io/engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/)

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)

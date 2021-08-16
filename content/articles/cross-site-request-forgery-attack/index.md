Cross-site request forgery (CSRF) is the third big web attack from [Cross Site Scripting (XSS)](https://www.section.io/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/) and [SQL injection](https://www.section.io/engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/). Web browsers are the most affected. When given a file to run, they can't tell if it is malicious or not. So instead, web browsers go ahead and run the files.

CSRF attacks occur when an authenticated user send a malicious request to a web application to perform an unwanted action. CSRF attacks exploit vulnerable web applications. This article will walk you through CSRF attacks and how to prevent them. 

### Table of contents
[Overview of CSRF attacks](#overview-of-csrf-attacks)
[How CSRF attacks works](#how-csrf-attacks-works)
[Impacts of CSRF attacks](#impacts-of-csrf-attacks)
[Testing of CSRF attacks](#testing-of-csrf-attacks)
[How to prevent CSRF attacks](#how-to-prevent-csrf-attacks)

### Prerequisites
Before you begin reading this article, you need:
- An understanding of web security
- An understanding of [HTTP methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

### Overview of CSRF attacks
[CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attack is a web security vulnerability that forces users to execute unwanted actions on a web application they are currently authenticated.

CSRF attacks take advantage of the trust a web app has for the user. When you log in and get authenticated to a web application, the browser and web server trust that everything done is courtesy of you.

In a CSRF attack, the attacker exploits the trust of the user to execute functions for themselves. This type of attack only happens to vulnerable web applications. With the help of social engineering platforms, attackers launch a CSRF attack.

CSRF attacks should at no time occur if the websites are correctly developed. First, the application is obliged to have anti-forgery mechanisms. Second, encryption and cryptography techniques ensure that other users can't send a request using your browser.

### How CSRF attacks works
A CSRF attack aims for web applications that fail to differentiate between valid and forged requests dominated by the attacker. There are multiple ways an attacker use to exploit the CSRF vulnerability.

To understand how it works, let us go through this scenario:

We have an attacker who wants to exploit a vulnerable online banking system. The attacker wants to forge a request to take money from a user logged in to his online banking account. The attacker wants to make money from the logged-in user into his account.

The attacker forges a request. Inside of that request, another request is embedded into a hyperlink. If the user clicks on that link, the request is sent to the actual server that transfers funds from the logged-in user into the attacker's bank account.

From the above illustration, CSRF works by an attacker gaining access to a victims browser through a malicious link. To launch this attack:
1. The attacker must create a malicious URL.
2. The attacker has to trick the user (victim) into clicking the malicious link.
3. Forge the request to conduct a malicious action.
4. The victim must have an active session with the web-based banking system.

CSRF attack only works if the victim is logged in to the application when the request is made. The application checks if the cookies of a valid session are available. If the cookies are available, they are submitted with the request. If the session is valid and the application approves the sent cookies, the CSRF attack becomes successful.

These are ways an attacker use to exploit the CSRF vulnerability.

#### GET requests
Referring back to our previous example, let us say that the online banking account uses the HTTP GET request method to conduct transactions. The users request to transfer funds to another person could look like this:

`http://bankexample.com/onlinetransfer?amount=5000&account=receiver`

The attacker creates a malicious URL that transfer funds from the victims account. The attacker takes the original request, then forge another request, and substitutes the beneficiary name with himself, as seen below:

`http://bankexample.com/onlinetransfer?amount=$5000&account=attacker`

The attacker then tricks the user into clicking the above malicious URL. He uses social engineering mechanisms to force the user into executing the URL. The malicious URL is embedded into HTML content and sent to the user.

`<a href="http://bankexample.com/onlinetransfer?amount=$50000&account=attacker">Click here now!</a>`

Once the user clicks the link, funds are transferred to the attackers account without his consent. However, if the victim has an active session with the online banking application, the request is treated to be legit.

#### POST requests
If the online banking application uses the HTTP POST request method to transfer funds, it's impossible to send malicious requests using links.

However, the malicious request can be submitted using a form. Also, the attacker can use JavaScript to designate and enable the form to be executed automatically.

Below is how the form may look like:

```JavaScript
body onload="document.forms[0].submit()">
   <form action=" http://bankexample.com/onlinetransfer" method="POST">
     <input type="hidden" name="account" value="attacker"/>
     <input type="hidden" name="amount" value="$50000"/>
     <input type="submit" value="Click here now!"/>
   </form>
 </body>
```

### Impacts of CSRF attacks
CSRF is a dangerous vulnerability that abuses the trust between the victim's browser and the webserver. The magnitude of its impact depends on the number of benefits allocated to the user.

For instance, if the victim is a normal user, the attacker can fully control the user's account. However, if the victim has an administrative role, the attacker might exploit the entire web application.

CSRF has been used to perform several malicious activities such as stealing data, unauthorized funds transfer, changing passwords, damaging clients' relationships, spreading worms or malware, and many more.

### Testing of CSRF attacks
CSRF testing is the process of finding CSRF vulnerabilities in web applications. Testing of CSRF vulnerabilities can be done either using automated tools or manually. 

#### Manual testing for CSRF attacks
If you want to find out if the session is not secure, you need to examine the web app's session. If session handling is on the client-side and displays data to the browser, the web app is vulnerable. The data displayed on the browser is the HTTP authentication credentials and cookies.

Resources accessible via the HTTP GET requests are no doubt vulnerable. Even though JavaScript automates POST requests, they are exposed and vulnerable. Therefore the use of POST alone hardly solve CSRF vulnerabilities.

The tester can use the following methods of testing:
- Black box testing
- Gray box testing

#### Tools for CSRF testing
1. [CSRF Tester](http://www.owasp.org/index.php/Category:OWASP_CSRFTester_Project)
2. [Cross Site Requester](http://yehg.net/lab/pr0js/pentest/cross_site_request_forgery.php)
3. [OWASP ZAP](https://www.zaproxy.org/)
4. [Pinata-csrf-tool](http://code.google.com/p/pinata-csrf-tool/)

### How to prevent CSRF attacks
IT security experts suggest multiple CSRF prevention techniques. Let's go through some practices to prevent CSRF vulnerabilities:
- Disable HTTP methods
- Make sure your antivirus is up to date
- Do not save passwords and login credentials in the browser.
- Do not open suspicious emails, navigate to other sites or perform social network communications while authenticated to a web application.
- Log out entirely from a web application immediately after a session
- Carry out regular security tests
- Secret token validation
- Using referrer headers
- Reject unsolicited authentication requests


For more CSRF prevention alternatives, visit [CSRF prevention cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) by OWASP.

### Conclusion
CSRF attack is a severe threat to web applications. The vulnerability depends on how the HTTP protocol manages web requests and processes. In a CSRF attack, the attacker tricks the authenticated user into performing malicious action on a web application without the user's knowledge. This cause a significant impact on the victim or the entire web application.

To summarize, we have learned:
- What are CSRF attacks
- How CSRF attacks work
- Impacts of CSRF attacks
- Testing of CSRF attacks
- How to prevent CSRF attacks

I hope this article has given you a better understanding of Cross-Site Request Forgery (CSRF)
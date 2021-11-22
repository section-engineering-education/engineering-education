Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end-user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.

*(Source: [OWASP](https://owasp.org/www-community/attacks/xss/#))*

According to the OWASP Top 10 of 2017 XSS is the second most prevalent issue in the OWASP Top 10, and is found in around two-thirds of all applications.

*(Source: [OWASP](https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)))*

The Open Web Application Security Project publishes the OWASP Top 10 report. It is a list of the most serious web application security concerns.

In this article, we'll go through XSS attacks in detail, their impact, and how to mitigate them.

> **Disclaimer:** - This article is for educational purposes only.

### Prerequisites
- Basic knowledge of HTML and Javascript
- Basic knowledge of 

### How XSS work
Cross-site scripting is accomplished by tricking a vulnerable web application into returning malicious Javascript to users. When malicious code is executed inside a victim's browser, the attacker has complete control over how they interact with the app.

Cross-site scripting operates by changing the source code/storage system of a susceptible website such that malicious JavaScript is returned to users. When malicious code is executed inside a victim's browser, the attacker can completely compromise the victim's interaction with the application by collecting 
- session cookies 
- user credentials 
- tokens
- secrets
 and other information.

![xss](/engineering-education/understanding-cross-site-scripting-atacks/xss.png)

### XSS Attack
First, we need to find a vulnerable website. As we can't go around testing random websites on the internet, we'll be carrying out this attack on an intentionally vulnerable website.

We'll be making use of an online vulnerable web application by [Acunetix](https://acunetix.com).

To use the vulnerable web app, we visit [Acunetix vulnerable application](http://testphp.vulnweb.com/).

![acunetix](/engineering-education/understanding-cross-site-scripting-atacks/acunetix.png)

The next step is to locate an input field into which we can paste our script. It could be a username, a search box, a textarea, or any other type of input field.

Our vulnerable website has a search box, perfect!.

Now lets to give it a simple html code and see what happens. Type in the following html code in the search box and hit the go button

```html
<u>test</u>
<!-- the html u tag or underline tag is used to give a word an underline in html -->
```

![html](/engineering-education/understanding-cross-site-scripting-atacks/u.png)

From the screenshot above we can see that the word `test` is underlined. Perfect! we are getting a reflection on the page. By viewing the application's source code, we can also see how it's reflected.

![view-page source](/engineering-education/understanding-cross-site-scripting-atacks/test1.png)

Now let's look for XSS

The most simple XSS payload is the script> tag. A script tag can either reference or embed JavaScript code. One of the most common XSS payloads is the use of the javascript alert function in a script tag.

Let's try this by entering the following payload in our web application search box:

```
<script>alert(1)</script>
```

![alert](/engineering-education/understanding-cross-site-scripting-atacks/alert.png)

We notice that as soon as we hit the go button after entering our XSS payload, we get an alert box with `1` displayed, which means our payload worked successfully. 

We just used the [alert](https://www.w3schools.com/jsref/met_win_alert.asp) function within javascript to display 1.

### Types of XSS
1. Reflected XSS

The victim's request is used to inject the payload. The victim must either click on a malicious link or visit a property controlled by the attacker.

2. Stored XSS

Also known as `Persistent XSS`. The payload is saved on the server and can be triggered by a victim without requiring any user interaction outside of the application. This type of XSS happens when the server saves your supplied input somewhere into the server, i.e (Database, cache server).

Stored XSS Attack

Let's go back to our vulnerable web application. We click on the `Your profile` tab, which presents us with a login page

![profile-login](/engineering-education/understanding-cross-site-scripting-atacks/profile-login.png)

Now let's log in with these default credentials: 

username: test
password: test

![logged in](/engineering-education/understanding-cross-site-scripting-atacks/in.png)

Now that we are logged in, let's inject our payload in the name field, and click on the update button to update our profile.

```
<script>alert(1)</script>
```

![stored](/engineering-education/understanding-cross-site-scripting-atacks/stored.png)

As we can see, we got an alert box. This occurred because the payload was saved in the name field, and the alert box was triggered every time the page was loaded.

3. DOM XSS

The vulnerability lies in the client-side code rather than the server-side code. Injections are still usually requested by the victim.


### Impact of XSS

- Capture user credentials
- Defacement of website 
- Impersonate a user 
- Carry out user action 

### How to prevent XXE attacks

- Usage of appropriate response headers
- Filtering user input
- Encode data on output
- Sanitization of HTML
- Encoding

### Conclusion

XSS is a common web vulnerability. Web vulnerability scanners such as [burp suite](https://portswigger.net/burp), can be used to carry out XSS tests on web applications. You can read more on XSS here

- [Portswigger](https://portswigger.net/web-security/cross-site-scripting)
- [Owasp](https://owasp.org/www-community/attacks/xss/)
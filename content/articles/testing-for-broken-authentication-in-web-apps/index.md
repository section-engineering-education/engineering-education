Authentication is a mechanism put in place to determine if a user is who they say they are, through either a username and password-based system or any other form of authentication system.

### What is Broken Authentication?

Broken Authentication is a type of vulnerability that allows attackers to get into a web application without proper credentials. This could be carried out either by bypassing the authentication mechanism put in place or brute=forcing another user's account. If the attacker successfully bypasses or brute-forces his way into another user's account, they gain access to all the data and privileges of that user account.

According to the [OWASP Top 10 2021 report](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/), Broken Authentication is ranked number 7 and grouped under `Identification and Authentication Failures`. 

The severity of this vulnerability can be so high. Say, an attacker was able to brute-force his way into the administrator account of a web application, this means he gets full control over the web application. 

This article seeks to demonstrate how an attacker tests for broken authentication in a web application and how to prevent them.

> **Disclaimer:** This article is for educational purposes only.

### Testing for Broken Authentication
To carry out this attack, I'll be making use of an intentionally vulnerable web application called [Juice shop](https://github.com/juice-shop/juice-shop).

![index page](/engineering-education/testing-for-broken-authentication-in-web-apps/index.png)

After starting up the web application, I'll proceed to the login page for testing.

![login page](/engineering-education/testing-for-broken-authentication-in-web-apps/login.png)

Firstly, I want to check how the application reacts if I provide incorrect login credentials.

![login error](/engineering-education/testing-for-broken-authentication-in-web-apps/error.png)

From the above screenshot, an error message is displayed. Some applications simply come out to tell you the particular field that contains the wrong credentials. something like `incorrect password` where the username provided is correct, or `invalid username` where the password is correct but doesn't match the username provided.

This is a poor practice because it allows for user enumeration. When an attacker uses brute force to guess valid users in a system, this is known as user enumeration.

The next thing I want to do is click on the `Forgot Password?` option. which requires I fill out a form.

![password reset](/engineering-education/testing-for-broken-authentication-in-web-apps/password-reset.png)

Again, I provided an incorrect email and noticed I was unable to click or fill other parts of the form. Interesting!

What if I provided an email address I think is valid, will I be able to complete the form?

![password reset](/engineering-education/testing-for-broken-authentication-in-web-apps/question.png)

After providing a valid email address, the form allows me to click and fill in other fields. Again, this allows for user enumeration. 

Now that the application just confirmed the validity of the email address I provided, the next field is to fill the security question `Mother's maiden name?`. With the use of [open source Intelligence](https://www.recordedfuture.com/open-source-intelligence-definition/) an attacker can easily figure out the answer to this question. In some cases, it just might be the user's last name. Then the attacker moves on to change the password of that user.

This is just one scenario that shows the impact of broken authentication on a login form. Another scenario is weak passwords and default credentials.

Some web applications still allow the use of weak and well-known or default credentials such as `admin: admin` `password1234`. Applications that do not enforce a strong password policy are highly susceptible to this attack.

To demonstrate this, I'll try to login into the admin account and intercept the request using the burp suite.

![burp suite](/engineering-education/testing-for-broken-authentication-in-web-apps/burp.png)

I'll try login in first with the admin email and a random password. I get an error message indicating incorrect credentials.

![admin](/engineering-education/testing-for-broken-authentication-in-web-apps/admin.png)

Now I'll try to break into the application.

Firstly I'll intercept the login request in the burp suite, next, I'll click on the `http history` tab next to the `intercept` tab. Now I'll find the POST /login request, right-click on it and select `send to intruder`.

![http history](/engineering-education/testing-for-broken-authentication-in-web-apps/http.png)

Now in the intruder tab, I'll click on the `positions` tab which displays the intercepted request.

![intruder](/engineering-education/testing-for-broken-authentication-in-web-apps/intruder.png)

I'll leave the `attack type` option as `sniper`. From the screenshot above, the email and password values are highlighted in green. Clicking on the `Clear` button helps remove that.

Next, I'll highlight the password parameter, this allows me to substitute the password value with a list of passwords. To do that I'll click on the `Add` button, click on the `payloads` tab, and under the `Payload Options [Simple List]` i am required to paste a list of passwords that serves as payloads.

I'll be using the [Seclist worst passwords of 2017](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/worst-passwords-2017-top100-slashdata.txt) as my password list.

I'll copy and click on paste in the payload options section.

![payload](/engineering-education/testing-for-broken-authentication-in-web-apps/payload.png)

After pasting the list of passwords, next is to click on `Start Attack` to begin the attack process.

![attack](/engineering-education/testing-for-broken-authentication-in-web-apps/attack.png)

As soon as the attack process is finished, I scrolled through the result and found a request with a status code of 200 and a payload of `admin123`.

![correct password](/engineering-education/testing-for-broken-authentication-in-web-apps/password.png)

What the attack simply did was send different login requests with each of the passwords in our list.

Now I'd try to log in with the newly discovered password.

![logged in](/engineering-education/testing-for-broken-authentication-in-web-apps/success.png)

Works!

- [Session Fixation Attacks](https://www.netsparker.com/blog/web-security/session-fixation-attacks/)
This type of vulnerability allows an attacker to hijack a user session.


### Impact of Broken Authentication
- Compromising an account allows the attacker access to unauthorized information.
- It could lead to full application take over.
- Loss of sensitive and confidential business information.

### Prevention of Broken Authentication
- Don't expose sessions IDs in URLs.
- Don't give room for user enumeration: It's critical to utilize identical, generic error messages and to double-check that they're the same. With every login request, you should return the same HTTP status code.
- Implement a strong password policy: Allowing the use of weak and well-known passwords is not a good idea. After a given number of login attempts, require users to pass a CAPTCHA test.
- brute-force protection: prevent brute-force login attempts.
- Multi-factor authentication: provide an extra layer of security for users.

### Conclusion
Broken Authentication is a vulnerability that must be prevented by all means. Ensuring you have a proper and secured authentication mechanism is very important. To read more on Broken Authentication, check out:

- [Portswigger](https://portswigger.net/web-security/authentication)
- [Owasp](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)




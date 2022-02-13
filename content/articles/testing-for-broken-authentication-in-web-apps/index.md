Authentication is a mechanism put in place to determine if a user is who they say they are, through either a username and password-based system or any other form of authentication system.

In this article, we'll be going through how to test for broken authentication, their impact, and how to mitigate them.

### Prerequisites
- Basic knowledge of Burp Suite

### Table of contents
- [What is Broken Authentication](#what-is-broken-authentication)
- [Testing for Broken Authentication](#testing-for-broken-authentication)
- [Impact of Broken Authentication](#impact-of-broken-authentication)
- [Prevention of Broken Authentication](#prevention-of-broken-authentication)
- [conclusion](#conclusion)

### What is Broken Authentication?

Broken Authentication is a type of vulnerability that allows attackers to get into a web application without proper credentials. This could be carried out either by bypassing the authentication mechanism put in place or brute=forcing another user's account. If the attacker successfully bypasses or brute-forces his way into another user's account, they gain access to all the data and privileges of that user account.

According to the [OWASP Top 10 2021 report](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/), Broken Authentication is ranked number 7 and grouped under `Identification and Authentication Failures`. This category slipped down from second place and now contains Common Weakness Enumerations (CWEs) relating to identification issues. It was previously known as Broken Authentication.

The severity of this vulnerability can be so high. Say, an attacker was able to brute-force his way into the administrator account of a web application, this means he gets full control over the web application. 

This article seeks to demonstrate how an attacker tests for broken authentication in a web application and how to prevent them.

> **Disclaimer:** This article is for educational purposes only.

### Testing for Broken Authentication
To carry out this attack, we'll be making use of an intentionally vulnerable web application called [Juice shop](https://github.com/juice-shop/juice-shop).

Let's set up Juice Shop

Note: this installation process is for Kali Linux.

we'll be installing owasp juice shop using docker. There are other ways to set up owasp juice shop, check it out [here](https://github.com/jamesemmott/owasp-juice-shop).

To begin, we need to install docker first by running the following commands

```bash
#first command
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

#second command
echo 'deb [arch=amd64] https://download.docker.com/linux/debian buster stable' > /etc/apt/sources.list.d/docker.list

#third command
apt update 

#final command to install command
apt install docker-ce
```

Install Juice shop

```bash
#this command installs juice shop
docker pull bkimminich/juice-shop

#this command helps set up a server
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

All we need to do now is to browse to http://localhost:3000 in a browser.

![index page](/engineering-education/testing-for-broken-authentication-in-web-apps/index.png)

After starting up the web application, we'll proceed to the login page for testing.

![login page](/engineering-education/testing-for-broken-authentication-in-web-apps/login.png)

We can go ahead to create an account or login with the admin credentials, which is 

- email: admin@juice-sh.op
- password: admin123

Now, let's check how the application reacts if we provide incorrect login credentials.

![login error](/engineering-education/testing-for-broken-authentication-in-web-apps/error.png)

From the above screenshot, an error message is displayed. Some applications simply come out to tell you the particular field that contains the wrong credentials. something like `incorrect password` where the username provided is correct, or `invalid username` where the password is correct but doesn't match the username provided.

This is a poor practice because it allows for user enumeration. Username enumeration is a type of application vulnerability, which happens when an attacker can identify whether or not usernames are genuine. This problem is most typically seen on login forms, where an error message such as "the username is invalid" is displayed.

[Username Enumeration](https://www.virtuesecurity.com/kb/username-enumeration/).

Next, we click on the `Forgot Password?` option. which requires we fill out a form.

![password reset](/engineering-education/testing-for-broken-authentication-in-web-apps/password-reset.png)

Again, we provided an incorrect email and noticed we were unable to click or fill other parts of the form. Interesting!

What if we provided an email address we think is valid, will we be able to complete the form?

![password reset](/engineering-education/testing-for-broken-authentication-in-web-apps/question.png)

After providing a valid email address, the form allows us to click and fill in other fields. Again, this allows for user enumeration. 

Now that the application just confirmed the validity of the email address we provided, the next field is to fill the security question `Mother's maiden name?`. With the use of [open source Intelligence](https://www.recordedfuture.com/open-source-intelligence-definition/) an attacker can easily figure out the answer to this question. In some cases, it just might be the user's last name. Then the attacker moves on to change the password of that user.

This is just one scenario that shows the impact of broken authentication on a login form. Another scenario is weak passwords and default credentials.

Some web applications still allow the use of weak and well-known or default credentials such as `admin: admin` `password1234`. Applications that do not enforce a strong password policy are highly susceptible to this attack.

To demonstrate this, we'll try to login into the admin account and intercept the request using the burp suite. Burp Suite is a proxy tool that allows us to intercept, analyze and modify requests coming from our browsers before they are sent to the remote server. You can read more on it [here](https://www.section.io/engineering-education/getting-started-with-burpsuite/).

here, burp suite allows us to intercept and modify the login request before it is sent to the server. 

![burp suite](/engineering-education/testing-for-broken-authentication-in-web-apps/burp.png)

we'll try login in first with the admin email and a random password. we get an error message indicating incorrect credentials.

![admin](/engineering-education/testing-for-broken-authentication-in-web-apps/admin.png)

Now we'll try to break into the application.

Firstly we'll intercept the login request in the burp suite, next, we'll click on the `http history` tab next to the `intercept` tab. Now we'll find the POST /login request, right-click on it and select `send to intruder`.

![http history](/engineering-education/testing-for-broken-authentication-in-web-apps/http.png)

Now in the intruder tab, we'll click on the `positions` tab which displays the intercepted request.

![intruder](/engineering-education/testing-for-broken-authentication-in-web-apps/intruder.png)

we'll leave the `attack type` option as `sniper`. From the screenshot above, the email and password values are highlighted in green. Clicking on the `Clear` button helps remove that.

Next, we'll highlight the password parameter, this allows me to substitute the password value with a list of passwords. To do that we'll click on the `Add` button, click on the `payloads` tab, and under the `Payload Options [Simple List]` we are required to paste a list of passwords that serves as payloads.

What we are doing here is simulating different login processes with the admin email and several passwords, till we get the correct password.

we'll be using the [Seclist worst passwords of 2017](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/worst-passwords-2017-top100-slashdata.txt) as our password list.

we'll copy and click on paste in the payload options section.

![payload](/engineering-education/testing-for-broken-authentication-in-web-apps/payload.png)

After pasting the list of passwords, next is to click on `Start Attack` to begin the attack process.

![attack](/engineering-education/testing-for-broken-authentication-in-web-apps/attack.png)

As soon as the attack process is finished, we scrolled through the result and found a request with a status code of 200 and a payload of `admin123`.

![correct password](/engineering-education/testing-for-broken-authentication-in-web-apps/password.png)

What the attack simply did was send different login requests with each of the passwords in our list.

Now let's try to log in with the newly discovered password.

![logged in](/engineering-education/testing-for-broken-authentication-in-web-apps/success.png)

Works!

- [Session Fixation Attacks](https://www.netsparker.com/blog/web-security/session-fixation-attacks/)
This type of vulnerability allows an attacker to hijack a user session.


### Impact of Broken Authentication
- Compromising an account allows the attacker access to unauthorized information.
- It could lead to full application take over.
- Loss of sensitive and confidential business information.

### Prevention of Broken Authentication
- [Don't expose sessions IDs in URLs](https://julienprog.wordpress.com/2017/08/17/session-id-in-the-url-is-it-a-vulnerability/).
- [Don't give room for user enumeration](https://www.virtuesecurity.com/kb/username-enumeration/): It's critical to utilize identical, generic error messages and to double-check that they're the same. With every login request, you should return the same HTTP status code.
- [Implement a strong password policy](https://en.wikibooks.org/wiki/Web_Application_Security_Guide/Password_security): Allowing the use of weak and well-known passwords is not a good idea. After a given number of login attempts, require users to pass a CAPTCHA test.
- [brute-force protection](https://predatech.co.uk/protecting-your-web-app-brute-force-login-attacks/): prevent brute-force login attempts.
- [Multi-factor authentication](https://auth0.com/docs/secure/multi-factor-authentication/step-up-authentication/configure-step-up-authentication-for-web-apps): provide an extra layer of security for users.

### Conclusion
Broken Authentication is a vulnerability that must be prevented by all means. Ensuring you have a proper and secured authentication mechanism is very important. 

To summarize:
- The reader learned how to set up Owasp Juice Shop.
- The reader learned how to test for broken authentication in web applications.
- The reader learned the impact and prevention of broken authentication applications.

To read more on Broken Authentication, check out:
- [Portswigger](https://portswigger.net/web-security/authentication)
- [Owasp](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)




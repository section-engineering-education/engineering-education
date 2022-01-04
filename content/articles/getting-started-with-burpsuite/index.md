---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-burpsuite/
title: Getting Started with Burpsuite
description: This article will be an introduction to Burpsuite. We will learn how to configure Burpsuite, set up DVWA, and finally, do some testing.
author: shuaib-oseni
date: 2022-01-04T00:00:00-01:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-burpsuite/hero.png
    alt: Getting Started with Burpsuite Hero Image
---

Burpsuite is one of the most popular web application security tools. Burp Suite is an intercepting proxy tool that allows us to intercept, analyze and modify requests coming from our browsers before they are sent to the remote server. With burp suite, we can intercept HTTP messages, modify the header and body of a message, and manually test for vulnerabilities.

Burpsuite is one of those important tools found in the arsenal of web application penetration testers, web application security researchers, CTF players, as well as bug bounty hunters. 

![Proxy](/engineering-education/getting-started-with-burpsuite/illustration.png)
### Why Burpsuite?

Burpsuite is not only a proxy tool. It is a master tool that can be used to perform a series of tasks, like:

- Web spidering.
- Automated and manual testing of web applications.
- Web application analysis.
- Finding vulnerabilities.

Another plus is its inbuilt chromium-browser.

Burpsuite is available as a free community edition and a professional edition, which costs about $3999 a year.

In this article, we'll be going through the basic usage of burp suite.

> **Disclaimer:** This article is for educational purposes only.

### Burpsuite configuration
If you are on Kali Linux, burp suite comes pre-installed. For other Linux distributions like Ubuntu, you'll need to download the community edition from [portswigger's website](https://portswigger.net/burp/releases/professional-community-2021-10-3?requestededition=community). Same applies to Windows OS.


![Burpsuite download](/engineering-education/getting-started-with-burpsuite/download.png)

Next, we open up Burpsuit. If you are on Kali Linux, it can be found in the applications panel.

![launch Burpsuite](/engineering-education/getting-started-with-burpsuite/burpsuite.png)

We are presented with a window that has different options. Select `Temporary project` and click on `next`.

![Temporary project](/engineering-education/getting-started-with-burpsuite/temp-proj.png)

We'll stick with the default setting, so we click on `Start burp`.

![Start burp](/engineering-education/getting-started-with-burpsuite/start-burp.png)

Burpsuite has been launched successfully.

![Burpsuite download](/engineering-education/getting-started-with-burpsuite/burp.png)

Now, we need to set up the burp suite proxy. The burp suite proxy allows us to intercept a web request while it is being processed. We're simply instructing our browser to use burp suite as a proxy, allowing us to intercept and alter requests while surfing our website.

Firstly, we need to install a browser extension called `Foxy Proxy`.

> Note: I'm using Mozilla Firefox, so I'll be adding the [Foxy Proxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) extension to the browser. 

Click `Add to Firefox` to install the extension.

After the installation, we'll get a little fox icon, by the address bar of our browser. Click on the icon, click on `options`, then click on `Add`.

![foxy proxy](/engineering-education/getting-started-with-burpsuite/foxyproxy.png)

Next, we are presented with a window with some input fields.

![Foxyproxy Setup](/engineering-education/getting-started-with-burpsuite/foxysetup.png)

- Tittle - A name or a description.
- Proxy Type - HTTP.
- Proxy IP Address - your localhost / interface (127.0.0.1).
- Port - The port you want burp suite to run on.

### Setting up DVWA
We'll be making use of an intentionally vulnerable web application to learn some of the burp suite features.

The Damn Vulnerable Web Application(DVWA) is a web application that is intentionally mis-configured and contains different security vulnerabilities for educational purposes.

To set up DVWA, we'll be running it as a docker container.

Install docker using the command below:

```bash
sudo apt install docker.io
```

Change user to go into the docker group:

```bash
sudo usermod -aG docker $USER 
```

> Note: you may need to log out and log in back for the changes to take effect.

Next, we need to pull the image by running the command below:

```bash 
docker run --rm -it -p 80:80 vulnerable/web-dvwa
```

Now, let's confirm if we can access the application by typing `localhost` in our browser.

![DVWA login](/engineering-education/getting-started-with-burpsuite/login.png)

The default login for DVWA is `username: admin`, `password: password`.

After login in, we are presented with a setup page.

![DVWA database setup](/engineering-education/getting-started-with-burpsuite/database-setup.png)

All we need to do is scroll to the bottom of the page and click on the `Create / Reset Database` button. We are being redirected to the login page.

After login in, we get a welcome page. Now we have our DVWA all set up for use.

![DVWA](/engineering-education/getting-started-with-burpsuite/welcome-page.png)

Now, let's head back to burp suite.

### Testing with Burpsuite
To make our proxy start running, we need to make sure that foxy proxy is running by clicking the fox icon in our browser, then clicking on `Burpsuite`.

![Burpsuite download](/engineering-education/getting-started-with-burpsuite/starting.png)

Next, in burp suite, we click on the `proxy` tab, then click on the `intercept is off` button to turn it on.

Now, if we head back to our browser and refresh our DVWA page or try to visit any other website, we'll notice it freezes. That indicates that our request is been stoped/intercepted by burp suite for us to manipulate.

Back in burp suite, in the proxy tab, we can see that the HTTP request is being intercepted for us.

![Intercept](/engineering-education/getting-started-with-burpsuite/intercept.png)

To make the request go through, all we need to do is to click the `Forward` button, and if we head back to our browser, we'll see that our page gets reloaded. Burp has a series of tools that can help with manipulating our request:

- Target: Gives us an overview of our target content and functionality.
- Proxy: Let us intercept, view, and modify the request and responses passing between our browser and target web application.
- Spider: Helps us to automatically crawl the target web application
- Repeater: This enables us to alter and reissue HTTP queries in order to examine application responses automatically. This is useful if we want to test how an application reacts by requesting the same page numerous times with various parameters.

### Conclusion
You have learned how to set up and configure Burpsuite and DDVWA. Now, you can test some vulnerabilities by yourself.
Burpsuite goes beyond inspecting and intercepting web traffic, this tool can also be used for credential brute-force and much more. You can read more on Burspsuite here:

- [Burpsuite](https://portswigger.net/burp)
- [Burpsuite-Series](https://dev.to/leading-edje/getting-started-with-burp-suite-31hd)
- [InsiderPhd](https://www.youtube.com/watch?v=UgbYozI436M&list=PLbyncTkpno5FAC0DJYuJrEqHSMdudEffw&index=3&t=418s)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
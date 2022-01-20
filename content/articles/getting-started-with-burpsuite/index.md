---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-burpsuite/
title: Getting Started with Burp Suite
description: This article will introduce the reader to Burpsuite. We will learn how to configure Burp Suite, set up and test DVWA.
author: shuaib-oseni
date: 2022-01-20T00:00:00-06:30
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-burpsuite/hero.png
    alt: Getting Started with Burp Suite Hero Image
---
Burp Suite is a proxy tool that allows us to intercept, analyze and modify requests coming from our browsers before they are sent to the remote server. 
<!--more-->
Burp Suite is one of the most popular web application security tools. It enables us to intercept HTTP messages, modify the header and body of a message, and manually test for vulnerabilities.

Burp Suite is popular among security researchers, CTF players, as well as bug bounty hunters. 

![Proxy](/engineering-education/getting-started-with-burpsuite/illustration.png)

### Why Burp Suite?
Burp Suite is not only a proxy tool but also a master framework that can be used to perform a series of tasks, like:

- Web spidering.
- Automated and manual testing of web applications.
- Web application analysis.
- Identification of vulnerabilities.

Another key advantage of Burpsuite is that its inbuilt in the chromium browser.

Burp Suite is available as a free community edition and a professional edition, which costs about $399 a year. There is also an [enterprise edition](https://portswigger.net/burp/enterprise/pricing) that has a varying pricing plan.

In this article, we'll be going through the basic usage of Burp Suite.

> Disclaimer: This article is for educational purposes only.

### Burp Suite configuration
If you are on Kali Linux, Burp Suite comes pre-installed. 

For other Linux distributions like Ubuntu, you'll need to download the community edition from [portswigger's website](https://portswigger.net/burp/releases/professional-community-2021-10-3?requestededition=community). This also applies to Windows OS.


![Burp Suite download](/engineering-education/getting-started-with-burpsuite/download.png)

Next, we open up Burp Suite. If you are on Kali Linux, it can be found in the applications panel.

![launch Burp Suite](/engineering-education/getting-started-with-burpsuite/burpsuite.png)

We are presented with a window that has different options. Select `Temporary project` and click on `next`:

![Temporary project](/engineering-education/getting-started-with-burpsuite/temp-proj.png)

We'll stick with the default setting, so we click on `Start burp`:

![Start burp](/engineering-education/getting-started-with-burpsuite/start-burp.png)

Burp Suite has been launched successfully:

![Burpsuite download](/engineering-education/getting-started-with-burpsuite/burp.png)

Now, we need to set up the Burp Suite proxy. The proxy allows us to intercept and alter a web request while it is being processed. 

Firstly, we need to install a browser extension called `Foxy Proxy`.

> Note: I'm using *Mozilla Firefox*, so I'll be adding the [Foxy Proxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) extension to the browser. 

Click `Add to Firefox` to install the extension.

After the installation, you will see a little fox icon, by the address bar of our browser. Click on the icon, then on `options`, and finally on `Add`:

![foxy proxy](/engineering-education/getting-started-with-burpsuite/foxyproxy.png)

Next, we are presented with a window with some input fields:

![Foxyproxy Setup](/engineering-education/getting-started-with-burpsuite/foxysetup.png)

- Title - A name or a description.
- Proxy Type - HTTP.
- Proxy IP Address - your localhost/interface (127.0.0.1).
- Port - The port you want Burp Suite to run on.

### Setting up DVWA
We'll be making use of an intentionally vulnerable web application to exploit some of the Burp Suite features.

The Damn Vulnerable Web Application (DVWA) is a web application that is intentionally misconfigured and contains different security vulnerabilities for educational purposes.

To set up DVWA, we'll be running it in a Docker container.

Install Docker using the command below:

```bash
sudo apt install docker.io
```

Change *user* to go into the *docker group*:

```bash
sudo usermod -aG docker $USER 
```

> Note: you may need to re-authenticate for the changes to take effect.

Next, we need to pull the image by running the command below:

```bash 
docker run --rm -it -p 80:80 vulnerable/web-dvwa
```

Now, let's confirm if we can access the application by typing `localhost` in our browser.

![DVWA login](/engineering-education/getting-started-with-burpsuite/login.png)

The default login for DVWA is `username: admin`, `password: password`.

After login, we are presented with a setup page.

![DVWA database setup](/engineering-education/getting-started-with-burpsuite/database-setup.png)

All we need to do is scroll to the bottom of the page and click on the `Create / Reset Database` button. We will be redirected to the login page.

After we login again, we will see a welcome page. Now we have set up DVWA successfully:

![DVWA](/engineering-education/getting-started-with-burpsuite/welcome-page.png)

Now, let's head back to Burp Suite.

### Testing with Burp Suite
To make our proxy start running, we need to make sure that *foxy proxy* is running by clicking the *fox* icon in our browser, then on `Burpsuite`:

![Burpsuite download](/engineering-education/getting-started-with-burpsuite/starting.png)

Next, in Burp Suite, we click on the `proxy` tab, then click on the `intercept is off` button to turn it on.

Now, if we head back to our browser and refresh our DVWA page or try to visit any other website, we'll notice it freezes. That indicates that our request is been stopped/intercepted by Burp Suite for us to manipulate.

Back in Burp Suite, in the *proxy* tab, we can see that the HTTP request was intercepted:

![Intercept](/engineering-education/getting-started-with-burpsuite/intercept.png)

To make the request go through, all we need to do is to click the `Forward` button.

When we head back to our browser, we'll see that our page gets reloaded. Burp Suite has several tools that can help with manipulating our request. They include:

- Target: Gives us an overview of our target content and functionality.
- Proxy: Let us intercept, view, and modify the request and responses between the browser and target web application.
- Spider: Helps us to automatically crawl the target web application.
- Repeater: This enables us to alter and reissue HTTP queries to examine application responses automatically. This is useful if we want to test how an application reacts by requesting the same page numerous times with various parameters.

### Conclusion
In this article, you have learned how to set up and configure Burp Suite and DVWA. Now, you can analyze some web vulnerabilities by yourself.

Burp Suite can also be used for credential brute-force, as well as penetration testing.

### Further reading
- [Burpsuite](https://portswigger.net/burp)
- [Burpsuite-Series](https://dev.to/leading-edje/getting-started-with-burp-suite-31hd)
- [InsiderPhd](https://www.youtube.com/watch?v=UgbYozI436M&list=PLbyncTkpno5FAC0DJYuJrEqHSMdudEffw&index=3&t=418s)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)

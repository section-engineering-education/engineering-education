---
layout: engineering-education
status: publish
published: true
url: /wordpress-penetration-testing/
title: WordPress Penetration Testing
description: This article will cover WordPress penetration testing (pen-testing), how hackers gain access to WP websites, WPsecurity tips, and how to perform one yourself using WP pen-testing tools. 
author: esther-waithera
date: 2021-11-23T00:00:00-18:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/wordpress-penetration-testing/hero.jpg
    alt: WordPress Penetration Testing example image
---
WordPress (WP) is a Content Management System (CMS) that powers many websites on the internet. Technology is growing at an accelerated rate, and it is everywhere today. Businesses have increased their dependency on Information Technology (IT), including social media, WP websites, and more. With this increased dependecy, cyber risk continues to rise at an alarming rate.
<!--more-->
There are many security vulnerabilities linked to WordPress websites. These vulnerabilities include cybercriminals attacking systems, servers, stealing everything from passwords to data.

In most cases, security experts are the ones who carry out penetration tests. However, developers need to understand how to make their WP websites more secure.

This article will cover WordPress penetration testing (pen-testing), how hackers gain access to WP websites, WPsecurity tips, and how to perform one yourself using WP pen-testing tools.

### Table of contents
- [What is WordPress penetration testing?](#what-is-wordpress-penetration-testing)
- [How hackers gain access to websites](#how-hackers-gain-access-to-websites)
- [Penetration testing methodology](#penetration-testing-methodology)
- [Using kali Linux on VirtualBox for WordPress security](#using-kali-linux-on-virtualbox-for-wordpress-security)
- [WordPress penetration testing tools](#wordpress-penetration-testing-tools)

### Prerequisites
To follow this guide, one needs permission from a WordPress website to carry out penetration testing. Also, make sure Kali Linux and virtual box are installed on your computer. Kali Linux contains several security tools which handle information security tasks such as penetration testing.

### What is WordPress penetration testing?
The practice of assessing websites, systems, apps, and networks for vulnerabilities that an attacker could exploit is known as penetration testing.

These vulnerabilities could be caused by a variety of factors. 

Let's have a look at a few of them:
- **The design and implementation of the WP website:** A poorly designed and implemented website is open to these security issues, brute force attacks, denial of service (DoS) attacks, theft of sensitive data, and malware-related hacks.
- **Poor system configuration:** System configuration is like the heart and soul of your WP site. A poor system configuration increases the chances of attacks. Also, make sure that WordPress core, themes, and plugins are updated. 
- **Unsecure network:** Using networks from untrusted sources is dangerous. There are high chances of a WP site attack when connected to an unsecured network.
- **System complexity:** The more complex the architecture of the WP website or system is, the higher the chances of being attacked. 

Penetration testing has never been more critical than it is today. The best defense starts by knowing your strengths and weaknesses, which attackers could take advantage of.

Pentesting provides you with intelligence and insights into how to mature your WordPress security. Simply, you take on the role of a hacker to secure your website. This is by understanding how you are likely to be attacked and what steps to take to secure your site.

The penetration testing process identifies the system's vulnerabilities, system exploitation, discovering vulnerabilities, and reporting.

### How hackers gain access to websites
A hacker put together a lot of information about your site. The attacker's main aim is to get into your website and have access to the WP admin. 

Once the hacker can access the WP admin, then he/she will know these things:
- WordPress version
- Theme
- Plugins and their versions
- User enumeration

If the hackers find [user enumeration](https://www.rapid7.com/blog/post/2017/06/15/about-user-enumeration/), then they know your site is vulnerable. 

This is how hackers gain access to websites:
- User enumeration. Hackers use brute-force attack techniques to guess or confirm legit users in a system.
- Using vulnerable plugins and themes.
- [SQL injections attacks](/engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/).
- [Cross-site scripting (XSS) attacks](/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/).
- [Cross-site request forgery (CSRF) attacks](/engineering-education/understanding-csrf/).
- [Social engineering attacks](https://www.imperva.com/learn/application-security/social-engineering-attack/).

To avoid falling into the trap of being hacked, make sure:
- Your WordPress, plugins, and themes are updated regularly.
- WP-Hardening for L1 security. Ensure you install the [WP hardening](https://wordpress.org/plugins/wp-security-hardening/) plugin for WP security.
- Scan your server regularly. Be security conscious.

### Penetration testing methodology
A penetration testing methodology is a systematic approach used to identify vulnerabilities and weaknesses in the IT infrastructure. This systematic approach gives you the utmost amount of information about the security outlook of your system, network, website, or application.

While doing penetration testing, break it down into the following:
1. **Reconnaissance:** In this phase, you'll collect data on your system, network, and servers.
2. **Scanning:** In this phase, you'll run a scan on your site to find vulnerabilities.
3. **Exploitation:** In this phase, you'll test any possible exploitation of flaws identified in the previous phase. The exploitation of security vulnerabilities allows assessing their impact.
4. **Mitigation:** This phase removes the vulnerabilities you found from your system, network, and servers.

### Using Kali Linux on VirtualBox for WordPress security
When it comes to WordPress penetration testing, Kali Linux is the main tool for penetration testers. Kali Linux has multiple tools modeled towards web security tasks such as penetration testing. As a result, we'll have to set up Kali Linux on a virtual machine (VirtualBox).

While doing pen-testing, you become a hacker on your site. [Virtual machines](https://azure.microsoft.com/en-us/overview/what-is-a-virtual-machine/#what-benefits) are excellent tools if you want to become a hacker or learn Linux. On our computers, we'll set up a virtual machine. A virtual machine is a computer inside another computer.

#### Installing Kali Linux on a VirtualBox
To perform penetration testing, we'll use Kali Linux installed on a virtual machine on our computers. Developers use either VMWare or VirtualBox to host the virtual machine. VMWare is commercial software, and VirtualBox is free software. Both of these tools work well. In our case, we will use a Virtual Box.

To begin, install Kali Linux with VirtualBox.
1. [Download and install Virtual Box](https://www.virtualbox.org/wiki/Downloads) on your computer.
2. [Download Kali Linux 64 bit](https://www.kali.org/get-kali/#kali-bare-metal).
3. To host Kali Linux, create a VirtualBox virtual machine and choose Debian 64 bit as the operating system (OS). To avoid running out of disk space, choose a size of at least 10GB.
4. Boot into the new virtual machine.
5. Boot into Kali and select the install option.
6. Open VirtualBox and Kali Linux will be visible. Please select it and click Start.

![Kali Linux and VirtualBox Install](/engineering-education/wordpress-penetration-testing/kali-vb-install.jpg)

### WordPress penetration testing tools
WordPress security is essential. Make sure that everything, including WordPress core, themes, and plugins, is up to date. You'll need the necessary tools to conduct WP security. This is why we chose Kali Linux, which includes a wide range of security features.

Now that our setup is up and running let us go through WP penetration testing tools and how they are used.

#### WPScan
WPScan is a command-line (CLI) tool that is free for use. Its focus is on WordPress security and is a significant choice for [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing) of your WordPress site. 

WPScan is a WordPress vulnerability scanner that scans your website for vulnerabilities in the WordPress core, theme, and plugins installed. 

To use this program, start a terminal in Kali Linux and type the following command:

```bash
wpscan --url http://example.com
```

![WPScan](/engineering-education/wordpress-penetration-testing/wpscan.jpg)

Replace `example.com` with the URL of your WordPress site.

To learn more, go through the [WPScan documentation](https://blog.wpscan.com/wpscan-user-documentation/).

#### Sqlmap
Sqlmap is a powerful tool for penetration testing. It concentrates on identifying SQL injection (SQLi) flaws on WordPress sites. The Sqlmap tool also aids developers in locating SQL problems in themes and plugins. 

To use this program, start a terminal in Kali Linux and type the following command:

```bash
sqlmap -u  www.example.com/index.html?parameter=1" --dbs
```

![Sqlmap](/engineering-education/wordpress-penetration-testing/sqlmap.jpg)

During WP penetration testing, the keyword '-dbs' will assist you to find any SQLi bugs found in the database.

As a result, the absence of a flaw does not imply that the site is secure. Sqlmap is a tool that can be used to find SQLi vulnerabilities. See the [Sqlmap documentation](https://sqlmap.org/) for further information.

#### PHPStan
PHPStan is a WordPress analysis tool that can help you find bugs in your site. This tool is available as a WordPress extension that must be downloaded separately. 

After configuring this tool, open the Kali Linux terminal and type this command:

```bash
vendor/bin/phpstan analyze Dir1 Dir2
```

Then, replace 'Dir1' and 'Dir2' with the directories containing the WordPress code you want to test. Check out the [PHPStan documentation](https://phpstan.org/user-guide/getting-started) for further information.

#### XSSer
[Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) is a common security problem found in WordPress websites. To prevent this threat, we use a tool called Cross-Site "Scripter" to look for XSS issues in various WordPress themes and plugins (XSSer).

XSSer is a program used when finding, exploiting, and reporting cross-site scripting (XSS) vulnerabilities in WordPress websites. Furthermore, you can use this tool to get beyond some security filters and code injection techniques.

To do a simple scan, you can use a graphical interface. To do so, open the Kali Linux terminal and type this command:

```bash
xxser --gtk
```

![Xsser](/engineering-education/wordpress-penetration-testing/xsser.jpg)

When the graphical interface opens, set the suitable options and enter the site's details, and WP pen-testing for XSS vulnerabilities will begin. To learn more, go through the [Xsser documentation](https://xsser.03c8.net/).

### Conclusion
I hope this guide has provided a good overview of WordPress penetration testing and practice. WordPress security is critical, and it's worthwhile to invest in your website's protection.

Using the information provided in this document, you can come up with a WP pen-testing strategy. Now assemble your tools to perform reconnaissance and scanning, exploit where needed and mitigate vulnerabilities that you discover. Best of luck!

Happy learning!

### Further reading
To learn more about WordPress penetration testing, go through these articles:
- [Penetration Testing for WordPress](https://securityboulevard.com/2020/03/penetration-testing-for-wordpress-websites/)
- [Penetration Testing on WordPress](https://gupta-bless.medium.com/penetration-testing-on-wordpress-f96bc701832e)
- [WordPress Penetration Testing](https://www.getastra.com/blog/security-audit/wordpress-penetration-testing/)

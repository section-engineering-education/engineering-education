WordPress (WP) is a Content Management System (CMS) that powers many websites on the internet. Technology is growing at an accelerated rate, and it's everywhere today. Businesses have increased their dependency on Information Technology (IT), including social media, WP websites, and more. But cyber risk continues to rise at an alarming rate.

There are many security vulnerabilities linked to WordPress websites. These vulnerabilities include cybercriminals attacking systems, servers, stealing everything from passwords to data.

In most cases, security experts are the ones who carry out penetration tests. However, developers need to understand how to make their WP websites more secure.

This article will cover WordPress penetration testing (pen-testing), how hackers gain access to WP websites, WPsecurity tips, and how to perform one yourself using WP pen-testing tools.

### Table of Contents
+ [What is WordPress penetration testing?](#what-is-wordpress-penetration-testing)
+ [How hackers gain access to websites](#how-hackers-gain-access-to-websites)
+ [Penetration testing methodology](#penetration-testing-methodology)
+ [Using kali Linux on VirtualBox for WordPress security](#using-kali-linux-on-virtualbox-for-wordpress-security)
+ [WordPress penetration testing tools](#wordpress-penetration-testing-tools)

### Prerequisites
To follow this guide, one needs permission from a WordPress website to carry out penetration testing. Also, make sure Kali Linux and virtual box are installed on your computer. Kali Linux contains several security tools which handle information security tasks such as penetration testing.

### What is WordPress penetration testing?
Penetration testing is the practice of analyzing websites, systems, applications, and networks to find vulnerabilities an attacker might exploit.

These vulnerabilities could be because of various reasons. Let us check out a few of them:
+ **The design and implementation of the WP website**. A poorly designed and implemented website is open to these security issues, brute force attacks, denial of service (DoS) attacks, theft of sensitive data, and malware-related hacks.
+ **Poor system configuration**. System configuration is like the heart and soul of your WP site. A poor system configuration increases the chances of attacks. Also, make sure that WordPress core, themes, and plugins are updated. 
+ **Unsecure network**. Using networks from untrusted sources is dangerous. There are high chances of a WP site attack when connected to an unsecured network.
+ **System complexity**. The more complex the architecture of the WP website or system is, the higher the chances of being attacked. 

Penetration testing has never been more critical than it is today. The best defense starts by knowing your strengths and weaknesses, which attackers could take advantage of.

Pentesting provides you with intelligence and insights into how to mature your WordPress security. Simply, you become the hacker to secure your site. This is by understanding how you are likely to be attacked and what steps to take to secure your site.

The penetration testing process identifies the system's vulnerabilities, system exploitation, discovering vulnerabilities, and reporting.

### How hackers gain access to websites
A hacker put together a lot of information about your site. The attacker's main aim is to get into your website and have access to the WP admin. Once The hacker can access the WP admin, then he/she will know these things:
+ WordPress version
+ Theme
+ Plugins and their versions
+ User enumeration

If the hackers find [user enumeration](https://www.rapid7.com/blog/post/2017/06/15/about-user-enumeration/), then they know your site is vulnerable. This is how hackers gain access to websites:
+ User enumeration. Hackers use brute-force attack techniques to guess or confirm legit users in a system.
+ Using vulnerable plugins and themes.
+ [SQL injections attacks](/engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/).
+ [Cross-site scripting (XSS) attacks](/engineering-education/how-to-prevent-cross-site-scripting-in-node-js/).
+ [Cross-site request forgery (CSRF) attacks](/engineering-education/understanding-csrf/).
+ [Social engineering attacks](https://www.imperva.com/learn/application-security/social-engineering-attack/).

To avoid falling into the trap of being hacked, make sure:
+ Your WordPress, plugins, and themes are updated regularly.
+ WP-Hardening for L1 security. Ensure you install the [WP hardening](https://wordpress.org/plugins/wp-security-hardening/) plugin for WP security.
+ Scan your server regularly. Be security conscious.

### Penetration testing methodology
A penetration testing methodology is a systematic approach used to identify vulnerabilities and weaknesses in the IT infrastructure. This systematic approach gives you the utmost amount of information about the security outlook of your system, network, website, or application.

While doing penetration testing, break it down into the following:
1. **Reconnaissance**. In this phase, you gather information about your system, network, and servers.
2. **Scanning**. In this phase, you run a scan on your site to find vulnerabilities.
3. **Exploitation**. In this phase, you test any possible exploitation of flaws identified in the previous phase. The exploitation of security vulnerabilities allows assessing their impact.
4. **Mitigation**. This phase removes the vulnerabilities you have found from your system, network, and servers.

### Using Kali Linux on VirtualBox for WordPress security
Getting started with WordPress penetration testing, Kali Linux is the standard tool for penetration testers. Kali Linux has multiple tools modeled towards web security tasks such as penetration testing. Therefore we'll need to install Kali Linux on a virtual machine (virtual box).

While doing pen-testing, you become a hacker on your site. [Virtual machines](https://azure.microsoft.com/en-us/overview/what-is-a-virtual-machine/#what-benefits) are amazing tools if you want to become a hacker or learn Linux. We're going to set up a virtual machine on our computers. A virtual machine is simply a computer inside a computer.

#### Installing Kali Linux on a VirtualBox
We'll use Kali Linux installed on a virtual machine on our computers to carry out penetration testing. Some developers use VMWare to host the virtual machine, which is commercial software. Other developers use Virtual Box, which is free software. Both of these tools work well. In our case, we will use a Virtual Box.

To begin, install Kali Linux with VirtualBox.
1. [Download and install Virtual Box](https://www.virtualbox.org/wiki/Downloads) on your computer.
2. [Download Kali Linux 64 bit](https://www.kali.org/get-kali/#kali-bare-metal).
3. Create a VirtualBox virtual machine to host Kali Linux, then select Debian 64 bit as the Operating system (OS). Ensure you select 10GB disk space or more to prevent running out.
4. Boot into the new virtual machine.
5. Boot into Kali and select the install option.
6. Open VirtualBox and Kali Linux will be visible. Please select it and click Start.

![Kali Linux and VirtualBox Install](/engineering-education/wordpress-penetration-testing/kali-vb-install.jpg)

### WordPress penetration testing tools
WordPress security is essential. Make sure everything is up to date, including WordPress, themes, and plugins. To conduct WP security, you need the right tools. This is why we installed Kali Linux, as it comes with a wide variety of security tools.

Now that our setup is up and running, let us go through WP penetration testing tools and how they are used.

#### WPScan
WPScan is a command-line (CLI) tool that is free for use. Its focus is on WordPress security and is a significant choice for [black-box testing](https://en.wikipedia.org/wiki/Black-box_testing) of your WordPress site. 

WPScan is a WordPress vulnerability scanner that examines your website to see the WordPress core, theme, and plugins installed and reports any vulnerabilities. To use this tool, open the Kali Linux terminal and type this command:

`wpscan --url http://example.com`

![WPScan](/engineering-education/wordpress-penetration-testing/wpscan.jpg)

Replace `example.com` with the URL of your WordPress site.

To learn more, go through the [WPScan documentation](https://blog.wpscan.com/wpscan-user-documentation/).

#### Sqlmap
Sqlmap is an extremely efficient penetration testing tool. It focuses on detecting SQL injection (SQLi) vulnerabilities on WordPress websites. Also, the Sqlmap tool helps developers to find SQL bugs present in themes and plugins. To use this tool, open the Kali Linux terminal and type this command:

`sqlmap -u  www.example.com/index.html?parameter=1" --dbs`

![Sqlmap](/engineering-education/wordpress-penetration-testing/sqlmap.jpg)

The term `-dbs` will help you identify any SQLi bug found in the database during WP penetration testing.

Therefore if there is no bug found, that doesn't signify that the site is safe. Sqlmap tool has multiple options to find SQLi vulnerabilities. To learn more, go through the [Sqlmap documentation](https://sqlmap.org/).

#### PHPStan
PHPStan is an analysis tool that helps you discover bugs in your WordPress site. This tool comes as an extension designed for WordPress and which is downloaded separately. After configuring this tool, open the Kali Linux terminal and type this command:

`vendor/bin/phpstan analyze Dir1 Dir2`

![PHPStan](/engineering-education/wordpress-penetration-testing/phpstan.jpg)

Then, replace `Dir1` and `Dir2` with the directories consisting of the WordPress code that you want to scan for bugs. To learn more, check out the [PHPStan documentation](https://phpstan.org/user-guide/getting-started).

#### XSSer
[Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/) is a common security threat found in WordPress websites. Hence, we can examine various WordPress themes and plugins for XSS bugs using a tool called Cross-Site "Scripter" (XSSer).

XSSer is a framework to discover, exploit, and report XSS vulnerabilities on your WordPress websites. In addition, this tool enables you to bypass certain security filters and particular techniques of code injection.

To do a simple scan, you can use a graphical interface. To do so, open the Kali Linux terminal and type this command:

`xxser --gtk`

![Xsser](/engineering-education/wordpress-penetration-testing/xxser.jpg)

When the graphical interface opens, set the suitable options and enter the site's details, and WP pen-testing for XSS vulnerabilities will begin. To learn more, go through the [Xsser documentation](https://xsser.03c8.net/).

### Conclusion
I hope this guide has given an excellent introduction to WordPress penetration testing and practice as well. WordPress security is essential, and it's valuable to invest in the security of your WordPress website.

Using the information provided in this document, you can come up with a WP pen-testing strategy. Now assemble your tools to perform reconnaissance and scanning, exploit where needed and mitigate vulnerabilities that you discover. Good luck!

### Further reading
To learn more about WordPress penetration testing, go through these articles:
+ [Penetration Testing for WordPress](https://securityboulevard.com/2020/03/penetration-testing-for-wordpress-websites/)
+ [Penetration Testing on WordPress](https://gupta-bless.medium.com/penetration-testing-on-wordpress-f96bc701832e)
+ [WordPress Penetration Testing](https://www.getastra.com/blog/security-audit/wordpress-penetration-testing/)

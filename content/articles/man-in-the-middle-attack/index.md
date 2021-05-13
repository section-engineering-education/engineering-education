---
layout: engineering-education
status: publish
published: true
url: /man-in-the-middle-attack/
title: Man in the Middle Attacks Explained
description: Man-in-the-middle (MitM) attacks happen at different levels and in different forms. This article explains what a MitM attack is and how to mitigate the risks of it occurring in you application.
author: richu-thomas
date: 2020-07-09T00:00:00-12:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/man-in-the-middle-attack/hero.jpg
    alt: man in the middle example image
---
Man-in-the-middle (MitM) attacks happen at different levels and in different forms. But, its basic concept requires three key players: the victim, the entity which the victim is trying to contact, and the “man in the middle". The victim can be any user trying to access a website or a web application (the entity).
<!--more-->

On a typical connection, the user connects to the website server which delivers the website. The “man in the middle” inserts itself within the connection, between the user and the website server, attempting to mimic the website and pretend that normal communication is happening with the user. However, the “man in the middle” snoops in the conversation and gathers important information, allowing the hacker to collect sensitive information such as login details, credit card numbers, and other data.

### Stages of Man-in-the-Middle attacks
#### Interception
- **IP Spoofing** - Every computer on the internet has an internet protocol (IP) address. The attacker masks himself as an application and changes headers of the IP address. By spoofing an IP address, an attacker can trick you into thinking you’re interacting with a legitimate entity. Users attempting to access the URL of an application will be redirected to the attacker’s website instead. Thus, you will be giving the attacker access to the information you’d otherwise not share.
- **DNS Spoofing** - The attacker accesses the server and alters the website address record to match his/her website records, thus redirecting the user through the attacker’s website. It’s a technique that forces a user to a fake website rather than the one that the user intends to visit. You may think you’re visiting a safe, trusted website when you’re actually interacting with a fraudster. The attacker’s goal is to divert traffic from the real site or capture user login credentials.
- **ARP Spoofing** - Address Resolution Protocol (ARP) helps to translate IP addresses to physical Media Access Control (MAC) addresses which identify devices in a local area network. Hackers will respond to requests with their own MAC address using placed packets. This will direct the communication of the user to the hacker’s server where it can sniff personal information.

#### Decryption
- [HTTPS Spoofing](https://www.thewindowsclub.com/https-security-spoofing-man-in-the-middle/) - The attacker can send an SSL certificate containing the digital thumbprint of the user obtained from a compromised application. After that, the browser verifies it and approves, thus granting access to the attacker. The attacker fools your browser into believing it’s visiting a trusted website when it’s not. By redirecting your browser to an unsecured website, the attacker can check your interactions with that website and steal personal information you may be sharing.
- [SSL Hijacking](http://techgenix.com/Understanding-Man-in-the-Middle-Attacks-ARP-Part4/) - An attacker passes forged authentication keys to both the user and application during a TCP handshake. This sets up what appears to be a secure connection when, in fact, the man in the middle controls the entire session.
- [SSL Stripping](http://techgenix.com/Understanding-Man-in-the-Middle-Attacks-ARP-Part4/) - It downgrades an HTTPS connection to HTTP by intercepting the TLS authentication sent from the application to the client. The attacker transfers an unencrypted form of the application's site to the client while maintaining the secure session with the application. In the meantime, the client's entire session is open to the attacker.

### Types of Man-in-the-Middle attacks
- [Wi-Fi Eavesdropping](https://doubleoctopus.com/security-wiki/threats-and-tools/wi-fi-eavesdropping/) - Attackers set up Wi-Fi connections with very legitimate-sounding names, using similar names to a business nearby or evil twin tactics (when hackers mimic trusted public WiFi connections in the area). It will trick you into thinking that it is the same network that you have used in the past. Once a user connects to the attacker’s Wi-Fi, he/she will be able to watch the user’s online activity and intercept important information, such as login credentials and payment information.
- [Email Hijacking](https://doubleoctopus.com/security-wiki/threats-and-tools/email-hijacking/) - Attackers sometimes target email accounts of banks and other financial institutions. Once they gain access, they can check transactions between the institution and its customers. After that, they can spoof the institutions’s email address and send their own instructions to customers. This fools the customers into following the attacker’s instructions rather than the legitimate institution.
- [Session Hijacking](https://owasp.org/www-community/attacks/Session_hijacking_attack) - Many websites store a “session browser cookie” on the user’s machine. This cookie is invalidated when the user logs off. However, while the session is active, the cookie provides identity, access, and tracking information. A Session Hijack occurs when an attacker steals a session cookie. This can happen if the user’s machine is infected with malware or browser hijackers. It can also happen when an attacker uses a cross-site scripting (XSS) attack – where the attacker injects malicious code into a frequently-used website.

### How to mitigate Man-in-the-Middle attacks
- Make sure that the websites you visit have HTTPS in front of the URL.
- Before clicking on emails, check the sender of the email.
- If you’re a website admin, you should implement HSTS.
- Set up an intrusion detection system (IDS).
- DO NOT make a purchase or send sensitive data on a public Wi-Fi network. If doing so, be sure to use secure VPN.
- If your website is using SSL, make sure you have disabled insecure SSL/TLS protocols. You should only have enabled TLS 1.1 and TLS 1.2
- Don’t click on suspicious links or emails. In fact, an increasingly popular pattern by security-conscious mail senders is not making email links clickable, and rather encouraging users to type it, or visit the website independently to find the required content.
- Avoid installing unnecessary software or plugins, especially those that offer something for free. This reduces the likelihood that you install something that can install a MitM.
- Keep the firewall active.
- Pay attention to browser notifications reporting a website as unsecured.
- Always use the latest version of your favorite web browser and keep your operating system up to date with updates.
- Use more methods for secure login, if the website operator offers the service – for example, multi-factor authentication (MFA) through token one-time passwords via SMS or smartphone app.
- Keep your passwords up to date, use a separate password for each application and don‘t reuse old passwords.
- Install an antivirus and antimalware software package that includes a scanner.

### How to detect a Man-in-the-Middle attack
- Long page load delays for no clear reason.
- URLs switching from HTTPS to HTTP.

### Tools for mitigating Man-in-the-Middle attacks
- [Wireshark](https://www.wireshark.org/) is the world’s most used network protocol analyzer to detect ARP spoofing.
- [SSL Eye](https://www.digi77.com/ssl-eye-prism-protection/) is a free software program which determines the SSL credentials of every site you connect.
- [Perspective](https://perspectives-project.org/) is a browser plugin that does that keeps notes on which domain names are issued by which Certificate Authorities'(CA) (eg. Google,etc.) and many other parameters related to the certificates, and will alarm the user if either the CA changes OR if the public key in the cert changes.

### A few famous examples of Man-in-the-Middle attacks
- The [US National Security Agency posing as Google](https://www.cnet.com/news/nsa-disguised-itself-as-google-to-spy-say-reports/) revealed in 2013 when Edward Snowden leaked NSA documents to the public. Using its ability to intercept traffic and spoof SSL certificates, the NSA was able to keep tabs on anyone's Google searches.
- How hackers were able to steal £333,000 (about $500,000) from [Paul and Ann Lupton](https://www.telegraph.co.uk/finance/personalfinance/borrowing/mortgages/11605010/Fraudsters-hacked-emails-to-my-solicitor-and-stole-340000-from-my-property-sale.html).
- [Comcast](https://www.infoworld.com/article/2925839/code-injection-new-low-isps.html) caught injecting JavaScript into its web traffic to show its own advertisements in place of those hosted by third-party sites.
- [Superfish](https://www.techrepublic.com/article/superfish-adware-weakens-security-and-injects-ads-on-some-lenovo-laptops/), an adware program, found to be scanning SSL traffic and installing certificates that allowed it to intercept and redirect secure traffic.
- A major [flaw in banking apps on Android](https://www.zdnet.com/article/man-in-the-middle-flaw-left-smartphone-banking-apps-vulnerable/) smartphones opened up dozens of apps to MITM attacks.
- [Firesheep Extension](https://techcrunch.com/2010/10/24/firesheep-in-wolves-clothing-app-lets-you-hack-into-twitter-facebook-accounts-easily/) is an infamous example that enabled hacking into Twitter and Facebook accounts and has encouraged people to mitigate these types of attacks in the systems they build.

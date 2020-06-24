## Man in the Middle Attack
Man-in-the-middle attacks happen at different levels and forms. But, its basic concept requires three key players: the victim, the entity which the victim is trying to contact, and the “man in the middle.”<br/>
The victim can be any user trying to access a website or a web application (the entity). On any typical connection, the user can connect to the website server and visit the site. The “man in the middle” inserts itself between the connection of the user and the website server.It will try to mimic the website and pretend that normal communication is happening with the user. However, the “man in the middle” snoops in the conversation and gathers important information. The hacker will collect personal information such as login details, credit card numbers, and others.

## Stages of Man-in-the-Middle Attacks
<b>Interception</b>
- [IP Spoofing](https://www.cloudflare.com/learning/ddos/glossary/ip-spoofing/) - Every computer on the internet has an internet protocol (IP) address. The attacker masks himself as an application and changes headers of IP address. By spoofing an IP address, an attacker can trick you into thinking you’re interacting with a website or someone you’re not. So, users attempting to access the URL of an application will be redirected to the attacker’s website. Thus, you will be giving the attacker access to the information you’d otherwise not share.
- [DNS spoofing](https://www.keycdn.com/support/dns-spoofing) - The attacker accesses the server and alters the website address record to match his website records thus redirecting the user through the attacker’s website. It’s a technique that forces a user to a fake website rather than the real one the user intends to visit. You may think you’re visiting a safe, trusted website when you’re actually interacting with a fraudster. The attacker’s goal is to divert traffic from the real site or capture user login credentials.
- [ARP spoofing](https://www.imperva.com/learn/application-security/arp-spoofing/) - Address Resolution Protocol (ARP) help to resolve IP address to physical Media Access Control (MAC) addresses which identify devices in a local area network. Hackers will respond to requests with its own MAC address using placed packets. This will direct the communication of the user to the hacker’s server where it can sniff personal information.

<b>Decryption</b>
- [HTTPS Spoofing](https://www.thewindowsclub.com/https-security-spoofing-man-in-the-middle/) - The attacker can send an SSL certificate containing the digital thumbprint of the user obtained from a compromised application. After that, the browser verifies it and approves, thus granting access to the attacker. , the attacker fools your browser into believing it’s visiting a trusted website when it’s not. By redirecting your browser to an unsecured website, the attacker can check your interactions with that website and steal personal information you’re sharing.
- [SSL hijacking](http://techgenix.com/Understanding-Man-in-the-Middle-Attacks-ARP-Part4/) - An attacker passes forged authentication keys to both the user and application during a TCP handshake. This sets up what appears to be a secure connection when, in fact, the man in the middle controls the entire session.
- [SSL stripping](http://techgenix.com/Understanding-Man-in-the-Middle-Attacks-ARP-Part4/) - It minimizes an HTTPS association with HTTP by intercepting the TLS authentication sent from the application to the client. The attacker sends a decoded form of the application's site to the client while maintaining the anchored session with the application. In the meantime, the client's whole session is noticeable to the attacker.

## Types of Man-in-the-Middle Attacks
- [Wi-Fi eavesdropping](https://doubleoctopus.com/security-wiki/threats-and-tools/wi-fi-eavesdropping/) - Attackers set up Wi-Fi connections with very legitimate-sounding names. using similar names to a business nearby or Evil twin attacks happen when hackers mimic trusted public WiFi connections in the area. It will trick you into thinking that it is the same network that you have used in the past. Once a user connects to the attacker’s Wi-Fi, he will be able to watch the user’s online activity and intercept important information, such as login credentials, payment card information.
- Email hijacking - Attackers sometimes target email accounts of banks and other financial institutions. Once they gain access, they can check transactions between the institution and its customers. After that, they can spoof the bank’s email address and send their own instructions to customers. This fools the customers to follow the attacker’s instructions rather than the bank’s.
- [Session Hijacking](https://owasp.org/www-community/attacks/Session_hijacking_attack) - It compromise social media accounts. With most social media sites, the website stores a “session browser cookie” on the user’s machine. This cookie is invalidated when the user logs off. But while the session is active, the cookie provides identity, access, and tracking information. A Session Hijack occurs when an attacker steals a session cookie. This can happen if the user’s machine is infected with malware or browser hijackers. It can also happen when an attacker uses a cross-scripting XSS attack – where the attacker injects malicious code into a frequently-used website.

## How to prevent Man-in-the-Middle attacks?
- Make sure that the websites you visit have HTTPS in front of the URL
- Before clicking on emails, check the sender of the email
- If you’re a website admin, you should implement HSTS.
- Set up an intrusion detection system (IDS)
- DO NOT make a purchase or send sensitive data on a public Wi-Fi network if doing so use secure VPN.
- If your website is using SSL, make sure you have disabled insecure SSL/TLS protocols. You should only have enabled TLS 1.1 and TLS 1.2
- Don’t click on malicious links or emails
- Avoid installing unnecessary software or plugins, especially those that offer something for free. This reduces the likelihood that you install something that can install a MitM attack.
- Keep your system protected at all times
- Paying attention to browser notifications reporting a website as unsecured.
- Always use the latest version of your favourite web browser and keep your operating system up to date with updates.
- Use more methods for secure login, if the website operator offers the service – for example, multi-factor authentication (MFA) through token one-time passwords via SMS or smartphone app.
- Keep your passwords up to date, use a separate password for each application and don‘t reuse old passwords.
- Install an antivirus and antimalware software package that includes a scanner.


## How to detect a Man-in-the-Middle attack?
- Long page load delays for no clear reason.
- URLs switching from HTTPS to HTTP.

## Tools for Preventing Man-in-the-Middle attack
- [Wireshark](https://www.wireshark.org/) is the world’s most used network protocol analyzer to detect ARP spoofing.
- [SSL Eye](https://www.digi77.com/ssl-eye-prism-protection/) is a free software program which determines the SSL credentials of every site you connect.
- [Perspective](https://perspectives-project.org/) is a browser plugin that does that. They keep a note of which domain names are issues by which Certificate Authorities's(CA) (eg. Google,etc.) and many other parameters related to the certificates and will alarm the user if either the CA changes OR if the public key in the cert changes.

## Some Famous News about Man-in-the-Middle attacks
- The [US National Security Agency posing as Google](https://www.cnet.com/news/nsa-disguised-itself-as-google-to-spy-say-reports/) revealed in 2013 when Edward Snowden leaked NSA documents to the public. Using its ability to intercept traffic and spoof SSL certificates, the NSA was able to keep tabs on anyone's Google searches.
- How hackers were able to steal £333,000 (about $500,000) from [Paul and Ann Lupton](https://www.telegraph.co.uk/finance/personalfinance/borrowing/mortgages/11605010/Fraudsters-hacked-emails-to-my-solicitor-and-stole-340000-from-my-property-sale.html).
- [Comcast](https://www.infoworld.com/article/2925839/code-injection-new-low-isps.html) caught injecting JavaScript into its web traffic to show its own advertisements in place of those hosted by third-party sites.
- [Superfish](https://www.techrepublic.com/article/superfish-adware-weakens-security-and-injects-ads-on-some-lenovo-laptops/), an adware program, found to be scanning SSL traffic and installing certificates that allowed it to intercept and redirect secure traffic.
- A major [flaw in banking apps on Android](https://www.zdnet.com/article/man-in-the-middle-flaw-left-smartphone-banking-apps-vulnerable/) smartphones opened up dozens of apps to MITM attacks.

## About the Author

Richu Thomas a student of DPG Institute of Technology and Management, India. He is a Github Campus Expert and Leads Developers Student Club and Hack Club in his campus.Always Intrested in learning new things.

---
layout: engineering-education
status: publish
published: true
url: /what-is-ransomware/
title: What is Ransomware?
description: Ransmoware is a type of cybersecurity threat, or malware (malicious software) that attackers use to hack into their victims' devices, and force them to pay a ransom.
author: maitreyi-karanjkar
date: 2020-11-18T00:00:00-12:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-ransomware/hero.jpg
    alt: ransomware example image
---
In a world where computers are an essential part of life, it is only reasonable to have a healthy fear of cyber security threats. Cyber attacks are happening in the range of hundreds of thousands of attacks per day, as seen in the live [Cyber Threat Map](https://www.fireeye.com/cyber-map/threat-map.html) by FireEye.
<!--more-->
An attackers’ targets can range from big corporations, to national governments, and to even regular people––potentially with their livelihoods at stake, depending on the nature of the threat. Before we all start to panic, the first thing we can do to protect ourselves is to be informed. There are several kinds of cyber attacks to be on the look out for, and one of them is Ransomware.

### What is ransomware?
Ransomware is a type of malware––or malicious software. It's the threat where a hacker blocks their victim from accessing their own device, unless a ransom is paid (which usually must be in virtual currency, such as Bitcoin). Data collected by [MalwareBytes](https://www.malwarebytes.com/ransomware/) shows that the most common way ransomware infects a computer is via phishing emails containing harmful attachments or drive-by downloads.

When infected, a device usually displays a message with an official logo such as the FBI or Interpol’s, implying that the victim’s device has been taken over by the authorities due to “illegal activity”––this is an example of phishing. Attackers scare their victims into believing false accusations of criminal activity, that then promptly leads to them paying the ransom and getting the attack over with.

### Who does it target?
When ransomware attacks first began, their biggest targets were individuals. However, as hackers became more organized and successful with time, they began attacking [small- and mid-sized businesses more](https://www.malwarebytes.com/ransomware/) since those were easier to target and yielded a higher success rate. According to [MalwareBytes](https://www.malwarebytes.com/ransomware/), the top three countries where such attacks occur are the United Kingdom, the United States, and Canada, presumably because of their large market sizes. Regular people remain potential targets of ransomware attacks.

### How does it work?
When your device is infected with ransomware, it follows a three-step process where it encrypts your data using a set of [cryptographic keys](https://www.britannica.com/topic/cryptographic-key): one to encrypt your data, and the other to decrypt. When encrypted, you lose access to your own data, and must pay the ransom to prompt the attacker to then decrypt your data.

This process is called **cryptoviral extortion**:
- Attackers generate a pair of cryptographic keys––one public and one private––and place the public key in the malware. The private key remains solely with the attacker.

- When released onto a device, the malware generates a random **symmetric key** (a duplicate key which, may or may not be identical, but represents a [shared secret](https://en.wikipedia.org/wiki/Shared_secret) with the original) to encrypt the victim’s data. The public key is then used to encrypt the symmetric key. This process is called **hybrid encryption**, and creates an **asymmetric ciphertext**––basically a jumbled up text––of the victim’s data. It also erases the symmetric key and the victim’s original plaintext data. The only way a victim can recover their data is by paying the ransom and sending the asymmetric ciphertext to the attacker––which is part of the message the user sees.

- Once the attacker receives their payment and the asymmetric ciphertext, they decrypt the data using their private key––which un-jumbles the text, thus successfully completing the attack. Once decrypted, the user's data goes back to its original form.

Ransomware is the type of malware that conceals its true intent––by masking itself as a “warning from the authorities.” In computing, such type of malware is called a [Trojan](https://docs.microsoft.com/en-us/windows/security/threat-protection/intelligence/trojans-malware), since it misleads users by appearing unsuspicious.

### What should you do if infected?
First, here are some warning signs your device has been infected:
- A message will show up on your device with the "ransom note"––which is usually a .txt file.
- All files on your computer will have new extentions such as .ecc, .ezz, .exx, .zzz, .xyz, .aaa, .abc, .ccc, .vvv, .xxx, .ttt, .micro, .encrypted, .locked, .crypto, .crinf, .r5a, .XRNT, .XTBL, .crypt, .R16M01D05, .pzdc, .good, .LOL!, .OMG!, .RDM, .RRK, .encryptedRSA, .crjoker, .EnCiPhErEd, .LeChiffre, .keybtc@inbox_com, .0x0, .bleep, .1999, .vault, .HA3, .toxcrypt, .magic, .SUPERCRYPT, .CTBL, .CTB2, .locky or 6-7 length extension consisting of random characters.

Look [here](https://security.berkeley.edu/faq/ransomware/) for more.

Below are some guidelines you should follow if you believe your device has been infected:

- Foremost, do NOT pay the ransom.

- Disconnect from all networks––unplug any ethernet cables, disconnect from Wi-Fi, turn off your Bluetooth, and go into airplane mode.

- Disconnect all external devices, such as USB/memory sticks, phones, cameras, or external hard drives.

- Report the incident––depending on where it occurred and on which device. If it was on a personal device, try the local authorities or even the FBI Internet Crime Complaint Center ([IC3](https://www.ic3.gov/)). If it happens on a campus, or while using a campus device, report it to campus security or any other authority figure.

### Preventing a ransomware attack
Instead of having to deal with the messy aftermath of a ransomware attack, you can take preventative measures to make sure you and your devices remain protected from such threats. Here are some things you can do:

- If met with suspicious or unsolicited emails, don't open any links or attachments in them, and don't approve or start downloads.

- This next step is important, no matter how tedious it may sound: make a habit of regularly backing up your crucial data and information onto either an external hard drive or a USB stick. Also remember to securely disconnect said device once the backup is complete. Cloud storage is also an option––but be sure to use a server with high-level encryption and multiple-factor authentication.

- Keep your system updated to the latest version. Older versions of software may be more vulnerable to cyber attacks.

- Consider investing in cybersecurity software or anti-exploit technology, which can help catch and stop a threat in its tracks.

- Overall, just be aware of any suspicious activity in your email accounts, and on your electronic devices.

### Conclusion
In the age of the Internet, keeping yourself safe from potential threats to your privacy is extremely important. Regardless of how many measures you take, the first step should be to stay vigilant and informed. Check out [this](engineering-education/what-is-anti-virus-software/) article on anti-malware for more information.

### Additional Resources & Readings

- [What is Anti-Malware?](/what-is-anti-virus-software/)
- [What is a Denial of Service Attack?](/denial-of-service/)
- [Man in the Middle Attacks Explained](/man-in-the-middle-attack/)
- [Web Application Firewall vs Bot Mitigation Solutions](/web-application-firewall-bot-mitigation-comparison/)

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)

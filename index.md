---
layout: engineering-education
status: publish
published: true
slug: what-is-ransomware
title: What is Ransomware?
description: Ransmoware is a type of cybersecurity threat, or malware (malicious software) that attackers use to hack into their victims' devices, and force them to pay a ransom.
date: 2020-08-26T00:00:00-07:00
topics: [Security, Malware]
  - url: /engineering-education/what-is-ransomware/hero.jpg
    alt: ransomware
---

## **What is Ransomware?**

In a world where computers are an essential part of life, it is only reasonable to have a healthy fear of cyber security threats. Cyber attacks are happening in the range of hundreds of thousands attacks per day, as seen in the live [Cyber Threat Map](https://www.fireeye.com/cyber-map/threat-map.html) by FireEye. Attackers' targets can range from big corporations, to national governments, and even to regular people––potentially with their livelihoods at stake, depending on the nature of the threat. But before panicking, the first thing you can do to protect yourself is be informed. There are several kinds of cyber attacks to look out for, and one of them is Ransomware. 

Ransomware is a type of malware––or malicious software. It is the kind of threat where a hacker blocks their victim from accessing their own device, unless a ransom is paid (which usually must be in virtual currency, such as Bitcoin). Data collected by [MalwareBytes](https://www.malwarebytes.com/ransomware/) indicates that the most common way ransomware infects a computer is via phishing emails containing harmful attachments or drive-by downloads. When infected, a device usually displays a message with an official logo such as the FBI or Interpol’s, implying that the victim’s device has been taken over by the authorities due to “illegal activity”––an example of phishing. Attackers effectively scare their victims into believing false accusations of criminal activity, which then promptly leads to them paying the ransom and getting the attack over with.

### **Who Does it Target?**

When ransomware attacks first began, their biggest targets were individuals. However, as hackers became more organized and successful with time, they began attacking [small- and mid-sized businesses more](https://www.malwarebytes.com/ransomware/) since those were easier to access and yeilded a higher success rate. According to [MalwareBytes](https://www.malwarebytes.com/ransomware/), the top three countries where such attacks occur are the United Kingdom, the United States, and Canada, presumably because of their large market sizes. Nevertheless, regular people still remain potential targets of ransomware attacks. 

### **How Does it Operate?**

When your device is infected with Ransomware, it follows a three-step process where it encrypts your data using a set of [cryptographic keys](https://www.britannica.com/topic/cryptographic-key): one to encrypt your data, and the other to decrypt. When encrypted, you lose access to your own data, and must pay the ransom to prompt the attacker to then decrypt your data. This process is called **cryptoviral extortion**:
- Attackers generate a pair of cryptographic keys––one public and one private––and place the public key in the malware. The private key remains solely with the attacker.
- When released onto a device, the malware generates a random **symmetric key** (a duplicate key which, may or may not be identical, but represents a [shared sectret](https://en.wikipedia.org/wiki/Shared_secret) with the original) to encrypt the victim’s data. The public key is then used to encrypt the symmetric key. This process is called **hybrid encryption**, and creates an **asymmetric ciphertext**––basically a jumbled up text––of the victim’s data. It also erases the symmetric key and the victim’s original plaintext data. The only way a victim can recover their data is by paying the ransom and sending the asymmetric ciphertext to the attacker––which is part of the message the user sees.
- Once the attacker receives their payment and the asymmetric ciphertext, they decrypt the data using their private key––which un-jumbles the text to put simply, thus successfully completing the attack. Once decrypted, the user's data goes back to its original form. 

Ransomware is the type of malware that conceals its true intent––by masking itself as a “warning from the authorities.” In computing, such type of malware is called [Trojan](https://docs.microsoft.com/en-us/windows/security/threat-protection/intelligence/trojans-malware), since it misleads users by appearing unsuspicious. 

### **What Should You Do If Infected?**

First, here are some signs your device is infected:
- A message will show up on your device with the "ransom note"––which is usually a .txt file.
- All files on your computer will have new extentions such as .ecc, .ezz, .exx, .zzz, .xyz, .aaa, .abc, .ccc, .vvv, .xxx, .ttt, .micro, .encrypted, .locked, .crypto, .crinf, .r5a, .XRNT, .XTBL, .crypt, .R16M01D05, .pzdc, .good, .LOL!, .OMG!, .RDM, .RRK, .encryptedRSA, .crjoker, .EnCiPhErEd, .LeChiffre, .keybtc@inbox_com, .0x0, .bleep, .1999, .vault, .HA3, .toxcrypt, .magic, .SUPERCRYPT, .CTBL, .CTB2, .locky or 6-7 length extension consisting of random characters. Look [here](https://security.berkeley.edu/faq/ransomware/) for more. 


Here are some guidelines you should follow if you believe your device is infected:
- First and foremost, do NOT pay the ransom.
- Disconnect from all networks––unplug any ethernet cables, disconnect from WiFi, turn off your bluetooth, and go into airplane mode.
- Disconnect all external devices, such as USB/memory sticks, phones, cameras, or external hard drives.
- Report the incident––depending on where it occurred/on which device. If on a personal device, try the local authorities or even the FBI Internet Crime Complaint Center ([IC3](https://www.ic3.gov/)). If on campus, using a campus device, report it to campus security or any other authority figure.

### **Preventing a Ransomware Attack/Precautions Against Ransomware Attacks**

Instead of having to deal with the messy aftermath of a ransomware attack, you can take preventative measures to make sure you and your devices remain protected from such threats in the first place. Here are some things you can do:
- If met with suspicious or unsolicited emails, do not open links or attachments within them, and do not approve or initiate downloads. 
- This next step is important, no matter how tedious it may sound: make a habit of regularly backing up your crucial data and information onto either an external hard drive or a USB stick. Also remember to securely disconnect said device once the backup is complete. Cloud storage is also an option––but make sure to use a server with high level encryption and multiple-factor authentication. 
- Keep your system updated to the latest version. Older versions of software may be more vulnerable to cyber attacks. 
- Consider investing in cybersecurity software or anti-exploit technology, which can help catch and stop a threat in its tracks. 
- Overall, just be aware of any suspicious activity in your email accounts, and on your electronic devices in general. 

In the age of the internet, keeping yourself safe from potential threats to your privacy is extremely important. Regardless of how many measures you take, first staying vigilant and informed is crucial. Check out [this](https://www.section.io/engineering-education/what-is-anti-virus-software/) article on anti-malware for more information. 



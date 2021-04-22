---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-anti-virus-software/
title: What is Anti-Malware?
description: Anti-malware is software that protects the user from financial ruin, infrastructure destruction, loss of data or loss of consumer confidence, etc through sophisticated malware techniques in detection, containment and prevention.
author: earl-potters
date: 2020-08-03T00:00:00-07:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-anti-virus-software/hero.jpg
    alt: malware image example
---
In May 2017 the world was devastated by a worldwide cyber attack that affected more than 200,000 computers across 150 countries. Users and companies alike were infected by the rapidly spreading computer virus that attacked critical agency providers like the [National Health Service](https://en.wikipedia.org/wiki/National_Health_Service). According to [Cyber risk modeling firm Cyence](https://www.cbsnews.com/news/wannacry-ransomware-attacks-wannacry-virus-losses/), the hack caused hundreds of millions of dollars in damages that could have been avoided with proper software security updates and vulnerability transparency by governmental agencies like the NSA. Many still remember the historic cyber attack as the infamous WannaCry attack.
<!--more-->

### Surviving the tech Wild West

![Wild_west](/engineering-education/what-is-anti-virus-software/flat-wild-west-background-with-colorful-buildings_23-2147587719.jpg)
[*Image source*](https://www.freepik.com/free-vector/flat-wild-west-background-with-colorful-buildings_1008160.htm)
<!--  Link to original image
<a href="https://www.freepik.com/vectors/background">Background vector created by freepik - www.freepik.com</a> -->

With cyber attacks posing real threats to peoples’ livelihoods, it’s not hard to see why protecting yourself from such attacks can be vitally important to governments, businesses and individuals.

### It Starts With You
The first line of defense often starts with you, the user, to be situationally aware of your actions on the world wide web. That entails sifting through [phishing](https://www.malwarebytes.com/phishing/) scams and suspicious websites, links or attachments. More often than not, good internet common sense can save you a lot of trouble; an ounce of **prevention** is worth a pound of a **cure.**

### Call In The Calvary
In addition to common good internet practices, the second best thing to invest in is anti-malware/antivirus software. Anti-malware’s main objective is to stop any malicious threats from infecting your computer; those include a platitude of threats ranging from computer viruses to internet worms.

Not having antivirus (AV) technology can lead to malware breaches. Currently, malware breaches of all sizes are costing industries $350 billion a year! That is why cyber-breaches incentivize companies and governments to heavily invest in cyber-security.

Anti-malware software is thus an incredibly useful tool to help identify and eliminate many malware threats.

In this article, I will go over the reason why anti-malware is important and what types of malware are out there. Furthermore, I will go over in-depth the certain techniques used to do malware analysis and investigations. Lastly, there will a reading list to give you a review of some great anti-malware software out there.

### Team Red: Malicious Rogue Bandits
![Bandits and Roguges](/engineering-education/what-is-anti-virus-software/rogue-bandits.jpg)
[*Image source*](https://www.vectorstock.com/royalty-free-vector/vintage-wild-west-bandit-poster-vector-15386994)

What bandits and gangs were to the Wild West, hackers and scammers are in the 21st century. Only difference — they use malware instead of guns to attack and exfiltrate personal data.

### Overview: What exactly is Malware?
According to [Malwarebytes Labs](https://blog.malwarebytes.com/glossary/malware/), *Malware, or “malicious software,” is an umbrella term that refers to any malicious program or code that is harmful to systems.* 

Malware is usually intentionally designed to either destroy data, install additional programs or exfiltrate (steal) data. For instance, malware can break computer systems or even be part of a larger agenda in the case of WannaCry. In summary, malware compromises the confidentiality, integrity, and availability (CIA for short) of a victim’s data.

It is important to understand why malware is a huge concern. Companies large and small are constant targets for malware attacks.

Furthermore, individuals who aren’t likely end-targets can still become potentially impacted as an intermediary; that is, they can be used, for example, as bots in a much larger botnet to enact major attacks like DDoS(distributed denial of service) attacks, etc. These attacks typically result in loss of data, intellectual property, competitive advantage, and loss of overall consumer confidence.

### Malware Arsenal
![bandit_arsenal](/engineering-education/what-is-anti-virus-software/bandit_arsenal.jpg)
[*Image source*](https://www.bigstockphoto.com/image-271869916/stock-vector-colored-vector-illustrations-of-wild-west-weapons-and-items-isolated-on-white?utm_medium=Affiliate&utm_campaign=TinEye&utm_source=77643&utm_term=)

Now, let’s look at some of the major forms of malware.

### Viruses
Computer viruses can run on any operating system, be it Windows or Mac. Computer viruses are actually, contrary to common belief, a type of malware. Viruses are defined as follows:

1.  A computer virus requires a host program.
2.  A computer virus requires user action to transmit from one system to another.
3.  A computer virus attaches bits of its own malicious code to other files or replaces files outright with copies of itself.

### Worms
In contrast to computer viruses, worms are capable of spreading and executing itself from one system to another without user interaction. Afterward, worms can do various malicious tasks such as dropping a payload, affecting the file system and consuming computer resources.

There are two main types of worms: Network Service Worms, Mass Mailing Worms.

### Trojan Horse Programs
Next, we have the Trojan horse programs. According to Greek mythology, the Greeks built a wooden horse to subterfuge the city of Troy. Much like the Greek Trojan, the computer Trojan horse aims to infect your computer using deception by tricking users into running seemingly benign computer programs.

### Ransomware
Finally we have ransomware. Ransomware "*is malicious software that blocks access to the victim’s data until a ransom is paid*.” — [David Koff](https://medium.com/@TheTechTutor?source=post_elevate_sequence_page-----b255b627c879----------------------). It usually involves encrypting one's files to render it unreadable to the victims. This incentivizes victims to pay up, usually using cryptocurrencies such as Bitcoin.

### Team Blue: The Marshal and Deputy

![marshal_badge](/engineering-education/what-is-anti-virus-software/marshal_badges.jpg)
[*Image source*](https://www.google.com/search?tbs=simg:CAQSmAIJUgEqR_1jOuMQajAILELCMpwgaYgpgCAMSKJQX5wGBDIsMsgzwFsUM7xaVF5IXqzSFNfQ3rjTiJIIjqDaQJOMplSkaMFSG3g2HYBxTQAkiN7bp-IoFQ6LGQRvpqGIvSt6X4bSWrfibKNlpP3mBaSYhZruTNyAEDAsQjq7-CBoKCggIARIEnjKBEQwLEJ3twQkahAEKGQoGZW1ibGVt2qWI9gMLCgkvbS8wMXdrOWMKGAoFYmFkZ2XapYj2AwsKCS9tLzAzY255OQoYCgZjaXJjbGXapYj2AwoKCC9tLzAxdmtsChYKBHN0YXLapYj2AwoKCC9tLzA2bmdrChsKCWFpciBmb3JjZdqliPYDCgoIL20vMDEzbTEM&sxsrf=ALeKk00fnz1awR5UZ2suwA_GCs6tZoJE7g:1596539541828&q=old+west+marshall+badge&tbm=isch&sa=X&ved=2ahUKEwi_rYqitYHrAhVJI6wKHfwECEoQwg4oAHoECAkQKQ&biw=1694&bih=837&dpr=1.09#imgrc=fXAmoyg5R7o1UM)

In the Wild West the marshal and deputy were there to protect the simple town folk from bandits and gangs. That is now the job of Anti-Malware.

### Overview: What exactly is Anti-Malware?
Anti-malware is software that protects the user from infrastructure destruction, financial ruin, loss of data or loss of consumer confidence, etc. through sophisticated malware techniques in detection, containment and prevention.

Anti-malware usually contains various techniques for malware protection and can provide different protection strategies and tools for different malware attacks such as anti-phishing or anti-ransomware protection.

![virus_prtection](/engineering-education/what-is-anti-virus-software/security_shield.jpg)
[*Image source*](https://www.google.com/search?tbs=simg:CAQSwQIJO9IdVJ2RTcUatQILELCMpwgaYgpgCAMSKJACuAaOAo8CsAbyE58StAagEo0Csyi8IfY2liDjNuk2tzOYNO8m4DYaMGrwhYQhy6v2GYBmfdv5DZiu73eQH_1qEqzi2_1ySxu6hNA8fAALx9qxXIzHq_1ozGYDiAEDAsQjq7-CBoKCggIARIEP9PNCgwLEJ3twQkarQEKIAoNY29tcHV0ZXIgY2FzZdqliPYDCwoJL20vMDQ5ZDhiCiIKD3ZlbmRpbmcgbWFjaGluZdqliPYDCwoJL20vMDFuZnJyCiIKDm51bWVyaWMga2V5cGFk2qWI9gMMCgovbS8wMjV0M2p0ChgKBnNlcnZlctqliPYDCgoIL20vMGJreGoKJwoTbXVsdGltZWRpYSBzb2Z0d2FyZdqliPYDDAoKL20vMHc4OHh0aAw&sxsrf=ALeKk00CIY1Ste7Cy63UfHd_N3rle0_t9A:1596539622971&q=cloud+anti+virus&tbm=isch&sa=X&ved=2ahUKEwjv3-LItYHrAhVHVK0KHUzpDLAQwg4oAHoECAkQKQ&biw=1694&bih=837&dpr=1.09)

### Malware Protection
There are roughly four areas that comprise malware protection:

- Recovery
- Identification/Analysis
- Containment
- Eradication/Mitigation


In this article we are more interested in the identification part. Identification and forensics can be split up into two main parts: [static malware analysis and dynamic malware analysis](https://en.wikipedia.org/wiki/Malware_analysis). There are many other forms of analysis such as memory and resource use forensics, web and network analysis and specific sandboxing techniques. However, that is beyond the scope of this blog post.

### Malware Analysis
*This is nowhere near a comprehensive list of Malware Analysis but more of an overview. There will be a reading list for those who are more interested in the nitty-gritty details.*

#### Static Malware Analysis
Static malware analysis is a way of examining code without executing it on your device. There are many techniques and tools, both paid and open-source that help carry out forensic investigation. The following tools and techniques are:

#### Disassemble
Malware is sometimes reversed-engineered/dissembled using tools called disassemblers. _“A_ **_disassembler_** _is a_ [_computer program_](https://en.wikipedia.org/wiki/Computer_program) _that_ [_translates_](https://en.wikipedia.org/wiki/Translator_(computing))  [_machine language_](https://en.wikipedia.org/wiki/Machine_language) _into_ [_assembly language_](https://en.wikipedia.org/wiki/Assembly_language)_” — wiki._
Now for those of you who don’t speak tech-speak, this means AV is looking into the low-level program instructions to find out if the program will execute malicious code without executing it. Cool!

#### File Fingerprinting
**_File fingerprinting_** _is a unique bit string identifier for large data items_. Just as a fingerprint can be used to identify the person a file fingerprint can identify the original file. AV software has a database of fingerprints of malware so that they can quickly identify the bad apples from the good ones.

#### Packer Detection
Hackers are not dumb so more often times than not they add a level of armor to their code called a packer. **_Packers_** _compress or encrypt executable files so that it's harder to find out the true contents of a file_. Lucky for us, AV also have a few tricks themselves to identify packers and retrieve their content.

They look at something called the [portable executable](https://en.wikipedia.org/wiki/Portable_Executable) (PE) header which contains information about the file format in Windows similar to ELF for Linux and Mach-O for MacOS.

#### Dynamic Malware Analysis
**Virtualization/Sandboxing**

In the aim to provide a safe space to analyze code, highly controlled environments called sandboxes are frequently used to test and run unverified programs which may contain malicious code.

Virtualization and/or sandboxing allows a host to determine what and how much resources a program can have or use at a given time. All without worrying of infecting the computer!

**Debugger**

Debuggers such as [GDB](https://en.wikipedia.org/wiki/GNU_Debugger) or [WinDBG](https://en.wikipedia.org/wiki/WinDbg) are programs that allow you to look at how programs behave during runtime as well as what effects it has on the host’s system. Debuggers give a wide variety of insights about how code is executed instruction by instruction.

### Elect Your Town Sheriff
![town_sheriff](/engineering-education/what-is-anti-virus-software/New_Sheriff_in_Town.jpg)

[*Image source*](https://www.google.com/search?tbs=simg:CAQSnwIJ2yJsUXvW6G4akwILELCMpwgaYQpfCAMSJ-4IuwNg7wixA-YI6AjKCPMIwQP4PZk1-T3PN7cn4DSpNbkp9T38PRowcRkeEiQ7oK5sIRv_1v_1zkk9sjJkX--g_17_1BFHARu_1E1vQtj56TKP0vMOAZ1A_1ErXdIAQMCxCOrv4IGgoKCAgBEgRRmgYPDAsQne3BCRqMAQoWCgNlcmfapYj2AwsKCS9tLzBkNzlqcQoZCgZzYWhhcmHapYj2AwsKCS9tLzAxdzF2dAobCgh2YWNhdGlvbtqliPYDCwoJL20vMDJqd3FoCh8KDHNpbmdpbmcgc2FuZNqliPYDCwoJL20vMDE5NHY0ChkKB3BseXdvb2TapYj2AwoKCC9tLzBqaDh3DA&sxsrf=ALeKk034-B4ffrL1T814yJm67B1W__pA0Q:1596539712877&q=sheriff+callie%27s+wild+west+toby+gets+the+scoop&tbm=isch&sa=X&ved=2ahUKEwijsdLztYHrAhUCYKwKHWjACHcQwg4oAHoECAkQKQ&biw=1694&bih=837&dpr=1.09)

Now that you know about the good guys and the bad guys, how are you going to protect yourself? I recommend anyone to take a look at [What is Malware? And How to Protect Yourself Against It](https://medium.com/s/the-firewall/episode5-antimalware-software-b255b627c879); it will give you a brief review on possible good anti-malware software.

### In Summary
We covered four main areas in this article; we covered an overview of malware and its major forms; we went in depth on several major types of malware. We also talked about the what anti-malware does and its main objective. Lastly, we gave a general malware analysis overview usually done by anti-software.

I hope you enjoyed this brief overview of anti-malware!

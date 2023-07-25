## Mobile Applications Security Assessment Using QARK

### Table of contents
- [Prerequisites](#prerequisites) 
- [Introduction](#introduction)
- [What is mobile application security](#what-is-mobile-application-security)
- [Common Mobile Applications Vulnerabilities](#common-mobile-applications-vulnerabilities)
- [What is QARK](#what-is-qark)
- [Using QARK to identify vulnerabilities in mobile applications](#using-qark-to-identify-vulnerabilities-in-mobile-applications)
- [Best practices in mobile applications in terms of security](#best-practices-in-mobile-applications-in-terms-of-security)
- [Relevant resources](#relevant-resources)


### Prerequisites
The following is a list of requirements in order to simulate or follow the tutorial on how to test mobile applications using QARK
1.	Any Linux OS (Google cloud shell is used for this tutorial)
2.	Test android application
3.	Internet connection
4.	Computer 


### Introduction 
Technology in this world we are living in is growing fast. As technology grows, so does the need for major security rise. The majority of devices are currently being changed to adapt or fit into this technological era. Most people, if not all, are striving towards automating all their processes. Thousands of applications are being created every day to help make life easier.
Hackers and other malicious actors on the other hand are working day and night to exploit any vulnerabilities that exist within the applications and other systems across the world. This means that the need for a conclusive security assessment on applications before going live is now crucial for all developers. QARK is an open-source tool that comes into play for this exact role. With this tool, you can easily identify the vulnerabilities that exist within your developed application and fix them before release. This way you are sure that the security of the application is okay and safe for its users.
What is mobile application security
Mobile application security is a practice of ensuring that mobile applications are safe guarded from attacks that can lead to compromise of digital identities resulting to the breach of personal informational. Mobile application security is crucial to the applications as it protects the users from threats such a malware and other vulnerabilities which could result to financial losses or complete take over of the system. 

### What is mobile application security
Mobile application security is a practice of ensuring that mobile applications are safe guarded from attacks that can lead to compromise of digital identities resulting to the breach of personal informational. Mobile application security is crucial to the applications as it protects the users from threats such a malware and other vulnerabilities which could result to financial losses or complete take over of the system. 

### Common Mobile Applications Vulnerabilities
1.	Improper Platform Usage 
Improper platform usage is when an application does not use or incorrectly uses the capabilities and features offered by the underlying operating system. An application could be at risk of this vulnerability if it violates published guidelines for various platforms, violates common practices for development, or through unintentional misuse. Unintentional misuse is when an app accidentally does the “wrong thing” while it was intended to operate correctly. Most of such errors are due to simple bugs. 
2.	Insecure Data Storage
The risk exists in the event that a mobile phone has been accessed whether remotely or physically. Any malicious hacker can retrieve directories for various applications and if sensitive information is insecurely stored, it can be retrieved and used to access user accounts or conduct more sophisticated attacks.
3.	Insecure Communication
Insecure communication between the client and server indicates that an attacker can sniff the network and capture all data packets. These data packets can be very useful as the attacker can rebuild the entire network and probably catch some credentials while sniffing. 
4.	Insecure Authentication
Mobile application often requires a user to authenticate themselves before getting access to their accounts. Malicious actors almost always try to gain access to systems without credentials. With insecure authentication, this becomes a very easy task and unauthorized parties can easily gain access to such an account through an authentication bypass. 
5.	Insufficient Cryptography
An application can implement insufficient cryptography in either of two ways. Either, the cryptographic process that is used has flaws or the encryption or decryption is weak.
6.	Insecure Authorization
This is a situation where a user without certain rights or permissions is able to access resources that they are not supposed to access within the application.
7.	Client Code Quality
Any issues within the application code can provide malicious attackers with a way into the application. The major risk here is any agent that can be used to introduce untrusted inputs into the method calls within an application. These eventually lead to vulnerabilities that can be exploited. 
8.	Code Tampering
An application that allows for reverse engineering can be decompiled and recompiled with malicious code that can be used as backdoors. Such applications with tampered code are then uploaded onto sites where they can be downloaded or delivered to targets using phishing attacks. 
9.	Reverse Engineering
Reverse engineering is when an application can be decompiled in order to access the underlying code. This is very dangerous as attackers are able to view the source code, inspect it, and hence have the ability to rewrite it and can choose to add malicious functions. 
10.	Extraneous Functionality
Developers may sometimes leave backdoors or certain functionalities that are not known or visible from the interface. Such functionalities may introduce a security risk as they were not meant to be a part of the application. Such security issues can be exploited by hackers even without the need to interact with the user accounts. 


### What is QARK
QARK is short for Quick Android Review Kit which is a free android application vulnerability scanner. This tool is used to find common vulnerabilities that affect mobile applications. It can be very useful to provide insight as to what security issues are affecting a mobile application. The issues detected can then be fixed prior to distributing the application to users. 
Using QARK to identify vulnerabilities in mobile applications

First, you need to install the tool in any of the open-source Linux distributions by cloning it from GitHub, using the following command:
 ```bash
 $git clone https://github.com/linkedin/qark
 ```
![Creating directory](/engineering-education/mobile-applications-security-assessment-using-qark/clone.png)

Secondly, navigate into the newly created directory by running:
 ```bash
$cd qark
```
Thirdly, install the requirements by using:

 ```bash
$pip install -r requirements.txt
```
![Creating directory](/engineering-education/mobile-applications-security-assessment-using-qark/install_requirements.png)

And, lastly, install qark using the command:

  ```bash
$ pip install . --user
```
![Creating directory](/engineering-education/mobile-applications-security-assessment-using-qark/install_user.png)

Run the command below to check if the installation was successful

  ```bash
$qark
```
![Creating directory](/engineering-education/mobile-applications-security-assessment-using-qark/qark.png)

In order to test any application, use the command:

  ```bash
$sudo qark --apk <PATH-OF-APK-FILE>
```
![Creating directory](/engineering-education/mobile-applications-security-assessment-using-qark/runappscan.png)

The report is stored in the qark directory, in a folder named report. Below is a sample report from qark security testing tool.
 
 ![Creating directory](/engineering-education/broadcasting-a-pirate-fm-radio-station-using-a-raspberry-pi/report.png)

### Best Practices for Mobile Applications Security

1.	Source Code Encryption
Encryption of the source code prevents reverse engineering of the application's code which in turn ensures that the app cannot be decompiled and then compiled with additional code or malware.
2.	Penetration testing
Conduct vulnerability assessment of applications before publishing. This exercise will help in discovering the underlying issues and then fixing them before they are exposed and exploited.
3.	Secure data in transit
Data between the client and the server must be protected from unwanted sniffing and leakage. It is advisable to use secure communication protocols such as SSL, which implements high network security.
4.	Cryptography techniques
It is important to use highly secure encryption algorithms which are hard to decrypt. Common cryptographic algorithms such as MD5 and SHA1 are insufficient and over time have become insecure hence it is critical to implement more secure algorithms such as AES with 512 bits, 256 bits, or SHA-256. 
5.	High-level authentication
Failure to implement secure authentication is the main cause of security breaches. Authentication should be well designed in such a way that passwords accepted meet complexity needs and verification of users is done accurately. It is also critical to enforce account lockouts to avoid account brute force. 
6.	Secure the backend
The backend server should be properly secured with appropriate control measures to ensure that it cannot be attacked through the exploitation of vulnerabilities. Additionally, all APIs should be tested to make sure that they are secure as well in terms of transport mechanism and authentication. 

### Relevant resources
- [QARK – A tool for automated android app assessments](https://resources.infosecinstitute.com/topic/qark-a-tool-for-automated-android-app-assessments/)
- [Android Security Analysis Tools, part three - Drozer and QARK](https://www.netguru.com/blog/android-security-analysis-tools-part-three-drozer-and-qark)
---
layout: engineering-education
status: publish
published: 
url: /introduction-to-static-application-security-testing-method/
title: Introduction to Static Application Security Testing Method
description: This article will introduce a reader to application vulnerability testing, outlining the various tools used and brief steps of performing the same. The article will further focus on the advantages and disadvantages of static secutity testing method and a brief comparison between the static testing method and dynamic method.
author: ruth-mare
date: 2021-09-16T00:00:00-18:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-static-application-security-testing-method/hero.jpg
    alt: Static Vulnerability Testing cover image 
---
<!--more-->

### Overview
This article will cover:
- [What is SAST](#what-is-sast)
- [Tools used in performing SAST](#tools-used-in-performing-sast)
- [How SAST Works](#how-sast-works)
- [Advantages and Disadvantages of SAST](#advantages-and-disadvantages-of-sast)
- [Differences between SAST and DAST](#differences-between-sast-and-dast)
- [Conclusion](#conclusion)
- [Reference](#reference)


### What is SAST
Static Application Security Testing, also known as SAST, is a method of vulnerability testing that does an analysis of the source code of an application to determine the security vulnerabilities that may cause the application to be compromised.

> A vulnerability is any loophole within an application that can be exploited by a bad actor to gain access to the application or propagate malware through the application. A vulnerability that is not fixed could lead to dire consequences for the user and even owners of an application. SAST is one of the ways used to assess application vulnerabilities.

SAST does application scanning before the compilation of the code, a scenario also known as the white box testing normally done at the beginning of the [SDLC](https://www.tutorialspoint.com/sdlc/sdlc_overview.htm) because it does not require an executing application. SAST helps developers to identify weaknesses of an application in the early stages of development and quickly resolve issues that may otherwise have effects on the final rolled out application.

SAST is done using different tools which give developers real-time feedback while they write code, helping them fix security issues and bugs before moving code to the next stage of SDLC. SAST tools also provide visual representations of the problems identified, this in easy navigation of the code. The tools can also provide suggestions on how to fix the vulnerabilities identified within the code.

Developers can also create customized reports they need with SAST tools; these reports can be downloaded offline and tracked through dashboards. Tracking all security issues systematically reported by the tool can help fix these problems quickly and promote the rollout of applications with fewer problems. This process promotes the creation of an SDLC that is secure and efficient.

### Tools used in performing SAST
Some of the tools used in Performing SAST are as follows:
- GitLab
- Veracode
- Synopsys Coverity
- HCL AppScan
- SonarQube
- Snyk
- Appknox
- Klocwork
- Mobile Security Framework (MobSF)
- Checkmarx
All the above tools perform SAST and other types of security testing in different ways. further details can be found [here](https://www.trustradius.com/static-application-security-testing-sast).

### How SAST works
SAST automatically scans an APK file that is uploaded to the tool of choice for any vulnerbilities and suggests remedial measures.

SAST performs automatic scanning of applications using these 5 simple steps:
1. *Choosing of the tool* - Choose a Static analysis tool that can carry out code reviews for applications written in the programming languages of your choice and can understand the application’s underlying framework.
2. *Creation of the scanning infrastructure, and deployment of the tool* - This entails managing licensing requirements, creating access control and authorization, and acquiring the necessary resources such as servers and databases on which the tool is to be deployed.
3. *Customization of the tool* - Adjusting the tool to fit your specification e.g., you can prepare it to minimize false positives or capture additional security vulnerabilities by forming new rules or reviewing existing ones. Integrate the tool into the build environment, create a dashboard of scanning results, and create custom reports.
4. *Prioritization and onboarding of applications* - When the tool is ready, the applications are then onboarded onto the tool.
5. *Analysis of scan results* - This step involves sorting the results of the vulnerability scan to eliminate any false positives. Once the problems have been completely put together, they can be tracked and assigned to the deployment teams for appropriate and timely correction.

### Advantages and Disadvantages of SAST
#### Advantages of SAST
SAST has several advantages some of which are as listed below:
- SAST tools can analyze the entire codebase.
- SAST tools are much faster than human-triggered security code reviews, performing close to a million lines of code in a very short period.
- SAST tools automatically spot critical vulnerabilities with high confidence.
- SAST tools scale well given they can be run on multiple software and can be run multiple times.
- The output is good given that it highlights specific affected lines of code.

#### Disadvantages of SAST
SAST has a few drawbacks as outlined below:
- High numbers of false positives.
- Difficultly to ascertain that the identified security problem is a real vulnerability.
- SAST is occasionally unable to find configuration issues because they are not represented in the code.

### Differences between SAST and DAST
There are several [types of application Security Testing](https://insights.sei.cmu.edu/blog/10-types-of-application-security-testing-tools-when-and-how-to-use-them/). The following is a distinction of SAST and its immediate opposite type of security testing; DAST(Dynamic Application Security Testing) These two types of testing detect security vulnerabilities in applications except in a unique way for each.

Below are some of the key comparisons of SAST via-á-vis DAST:
- SAST supports all types of software while DAST can only scan applications such as web applications and web services.
- SAST can’t discover runtime and environment-related issues while DAST can discover runtime and environment-related issues.
- It costs less to fix vulnerabilities using SAST while it is relatively expensive to fix the vulnerabilities using DAST.
- SAST discovers vulnerabilities earlier into the SDLC while DAST discovers vulnerabilities towards the end of SDLC
- SAST requires source code DAST requires a running application.

### Conclusion
SAST remains to be an important part of SDLC given that vulnerabilities within application source code can be noted earlier in the development, this leads to advantages such as saving on costs related to application debuging and saves times.
Developers therefore, roll out a well fine-tuned application with minimal security concerns.

Happy learning!

### Reference
- [Static Application Security Testing: SAST Basics](https://www.whitesourcesoftware.com/resources/blog/sast-static-application-security-testing/)
- [Mobile Security Framework (MobSF) Static Analysis](https://medium.com/@kshitishirke/mobile-security-framework-mobsf-static-analysis-df22fcdae46e)
- [10 Types of Application Security Testing Tools: When and How to Use Them](https://insights.sei.cmu.edu/blog/10-types-of-application-security-testing-tools-when-and-how-to-use-them/)
- [Static Application Security Testing (SAST) Tools](https://www.trustradius.com/static-application-security-testing-sast)
- [SDLC - Overview](https://www.tutorialspoint.com/sdlc/sdlc_overview.htm)

---

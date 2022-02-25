---
layout: engineering-education
status: publish
published: true
url: /security-testing-using-mobsf-in-docker/
title: Static Application Security Testing using MobSF and Docker
description: This article will introduce the reader to Static Application Security Testing using MobSF and Docker.
author: ruth-mare
date: 2022-02-24T00:00:00-01:51
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/security-testing-using-mobsf-in-docker/hero.jpg
    alt: SAST using MobSF and Docker Hero Image
---
A vulnerability that is not fixed could lead to dire consequences for the user and owners of an application. SAST is one of the ways used to scan and assess applications for vulnerabilities.
<!--more-->

### Table of content
- [Prerequisites](#prerequisites)
- [What is SAST](#what-is-sast)
- [Differences between SAST and DAST](#differences-between-sast-and-dast)
- [Tools used to perform SAST](#tools-used-to-perform-sast)
- [Step by Step process of SAST](#step-by-step-process-of-sast)
- [Advantages of SAST](#advantages-of-sast)
- [Disadvantages of SAST](#disadvantages-of-sast)
- [Conclusion](#conclusion)
- [Relevant Material](#relevant-material)

### Prerequisites
The learner should be familiar with:
1.  Git commands and commands in a Linux operating system.
2.  A basic understanding of containerized storage.

### What is SAST
Static Application Security Testing (SAST) is a method of vulnerability testing that analyses the source code of an application to determine the security vulnerabilities that may cause the application to be compromised.

> A vulnerability is any loophole within an application that can be exploited to gain unauthorized access to the application or propagate malware through the application. 
A vulnerability that is not fixed could lead to dire consequences for the user and owners of an application. SAST is one of the ways used to scan and assess applications for vulnerabilities.

SAST scans applications before the compilation of the code right at the beginning of the SDLC because it does not require an executing application. This scenario is also known as white-box testing.

Developers can therefore identify shortcomings of an application in the early stages of development and quickly resolve issues that may otherwise affect the final rolled out application. Developers can also systematically track the vulnerability trends within the application, thereby promoting the creation of a secure and efficient Software Development Life Cycle (SDLC).

SAST provides visual representations of the problems identified, making it easy to navigate the code. In addition, it provides suggestions on how to fix the vulnerabilities identified within the code. Customized reports downloadable and visible offline are supported by most SAST tools and can also be tracked through dashboards.

### Differences between SAST and DAST
There are two different types of Application Security Testing, i.e., SAST and DAST (Dynamic Application Security Testing). The two methods detect security vulnerabilities in applications, except in a unique way for each. Below are some of the critical comparisons between SAST and DAST:

- SAST supports all types of software, while DAST can only scan applications such as web applications and web services.
- SAST cannot discover runtime and environment-related issues, while DAST can discover runtime and environment-related issues.
- It costs less to fix vulnerabilities using SAST, while it is relatively expensive to fix them using DAST.
- SAST discovers vulnerabilities earlier into the SDLC, while DAST discovers vulnerabilities towards the end of SDLC.
- SAST requires source code. DAST requires a running application.

### Tools used to perform SAST
Some of the tools used in Performing SAST are as follows:
1. GitLab.
2. Veracode.
3. Synopsys Coverity.
4. HCL AppScan.
5. SonarQube.
6. Snyk.
7. Appknox.
8. Klocwork.
9. Mobile Security Framework (MobSF).
10. Checkmarx.

All the above tools perform SAST and other types of security testing in different ways; further details can be found [here](https://www.trustradius.com/static-application-security-testing-sast).

### Step by Step process of SAST
SAST performs applications’ scanning automatically in the following steps:

#### Step 1: Choosing the tool
Choose a static analysis tool that can review the code for the application according to the programming languages and understand the application's underlying framework.

For this sample test, we will use Mobile Security Framework (MobSF), an open-source, automated mobile penetration testing tool, for security testing.

For this tutorial, we will leverage the advantage of container technology and use docker to hold the framework and perform the analysis from a docker container running in a Linux environment.

We will go ahead and create a docker container and deploy our framework in the next step.

#### Step 2: Creation of the docker container
We will setup the docker container using the following steps:

- Set up the docker PGP key.

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add –
```

- Configure docker.

```bash
echo 'deb [arch=amd64] https://download.docker.com/linux/debian buster stable' | sudo tee /etc/apt/sources.list.d/docker.list
```

- Install docker.

```bash
apt install docker-ce
```

#### Step 3: Deploying and running the tool
We will deploy our tool into the container then trigger the framework to run within the container.

Then, we download the MobSF tool docker image from [this](https://hub.docker.com/r/opensecurity/mobile-security-framework-mobsf/) git repository using the following command:

```bash
docker pull opensecurity/mobile-security-framework-mobsf
```

When the pull operation is completed, our docker container is set up successfully and our framework deployed in it.

We then proceed to run the MobSF tool with the following command:

```bash
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf
```

The terminal should indicate "listening at http://0.0.0.0:8000" when we run the tool to completion.

#### Step 4: Onboarding of an application
Once the MobSF tool is ready, the application is onboarded onto it for analysis.

We can access MobSF at the URL in the above step and upload the application to be tested.

Click on http://0.0.0.0:8000 from the console in step 3, then click upload and analyze as shown:

![upload and analyze](/engineering-education/security-testing-using-mobsf-in-docker/security-testing-using-mobsf-in-docker/upload.png)

The process will automatically run, then present the results after completion as shown below:

![results display](/engineering-education/security-testing-using-mobsf-in-docker/results.png)

#### Step 5: Downloading the report and analysis of scan results
This step involves eliminating any false positives by triaging the vulnerability scan results.

Once the vulnerabilities have been completely assembled, they can be assigned to the deployment teams for appropriate action and timely correction.

After that, these vulnerabilities can be tracked on progress.

Navigate on the task pane to view the pdf report or download an offline report as shown:

![report](/engineering-education/security-testing-using-mobsf-in-docker/security-testing-using-mobsf-in-docker/report.png)

The above report can be studied offline.

### Advantages of SAST
SAST has several advantages, some of which are as listed below:
- SAST tools can analyze the entire codebase.
- SAST tools are much faster than human-triggered security code reviews, performing close to a million lines of code in a very short period.
- SAST tools automatically spot critical vulnerabilities with high confidence.
- SAST tools scale well given that they can be run on multiple software and run multiple times.

### Disadvantages of SAST
SAST has some drawbacks as outlined below:
- High numbers of false positives.
- SAST is occasionally unable to find configuration issues because they are not represented in the code.

### Conclusion
SAST remains an important part of SDLC, given that vulnerabilities within an application source code can be noted earlier in the development. This leads to advantages such as cost-effectiveness related to application debugging and saving time.
Developers, therefore, roll out a fine-tuned application with minimal security concerns.

### Relevant Material
- [Static Application Security Testing: SAST Basics](https://www.whitesourcesoftware.com/resources/blog/sast-static-application-security-testing/)
- [Mobile Security Framework (MobSF) Static Analysis](https://medium.com/@kshitishirke/mobile-security-framework-mobsf-static-analysis-df22fcdae46e)
- [10 Types of Application Security Testing Tools: When and How to Use Them](https://insights.sei.cmu.edu/blog/10-types-of-application-security-testing-tools-when-and-how-to-use-them/)
- [SDLC - Overview](https://www.tutorialspoint.com/sdlc/sdlc_overview.htm)

---
Peer Review Contributions by: [Collins Ayuya](/engineering-education/authors/collins-ayuya/)
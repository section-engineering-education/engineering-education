---
layout: engineering-education
status: publish
published: 
url: /how-to-perform-containerized-static-application-security-testing(sast)-using-mobsf-within-a-docker-container/
title: How to perform containerized static application security testing(SAST) using MobSF within a Docker container
description: This article will introduce a reader to application vulnerability testing, make a brief comparison between the static testing and dynamic methods then focus on the static security testing method, step-by-step process of how it works and analyze the results obtained.
author: ruth-mare
date: 2022-26-01T16:10:00-18:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-perform-containerized-static-application-security-testing(sast)-using-mobsf-within-a-docker-container/hero.jpg
    alt: Static application security testing using MobSF within a Docker container cover image 
---
<!--more-->

### Overview
This article will cover:
- [Prerequisites](#prerequisites)
- [What is SAST](#what-is-sast)
- [Differences between SAST and DAST](#differences-between-sast-and-dast)
- [Tools used to perform SAST](#tools-used-to-perform-sast)
- [Step by Step process of SAST](#step-by-ste-process-of-sast)
- [Advantages and Disadvantages of SAST](#advantages-and-disadvantages-of-sast)
- [Conclusion](#conclusion)
- [Relevant Material](#relevant-material)

### Prerequisites
The learner should be familiar with:
1.	Git commands and commands in a Linux operating system.
2.	Basic understanding of containerized storage.

### What is SAST
Static Application Security Testing, known as SAST for short, is a method of vulnerability testing that analyses the source code of an application to determine the security vulnerabilities that may cause the application to be compromised.

> A vulnerability is any loophole within an application that can be exploited by a bad actor to gain access to the application or propagate malware through the application. A vulnerability that is not fixed could lead to dire consequences for the user and owners of an application. SAST is one of the ways used to scan and assess applications for vulnerabilities.

SAST scans applications before the compilation of the code right at the beginning of the SDLC because it does not require an executing application.

The above scenario is also known as the white box testing.

Developers can therefore identify shortcomings of an application in the early stages of development and quickly resolve issues that may otherwise have effects on the final rolled out application.

Developers can also systematically track the vulnerability trends within the application. This process promotes the creation of an SDLC (Software Development Life Cycle) that is secure and efficient.

The visual representations of the problems identified as provided by the different SAST tools makes it easy to navigate the code and can also provide suggestions on how to fix the vulnerabilities identified within the code. 

Customized reports downloadable and visible offline are supported by most SAST tools and can also tracked through dashboards.

### Differences between SAST and DAST
There are two different types of application Security Testing i.e., SAST and DAST (Dynamic Application Security Testing).

The above-mentioned detect security vulnerabilities in applications except in a unique way for each. Below are some of the key comparisons of SAST via-á-vis DAST:
- SAST supports all types of software while DAST can only scan applications such as web applications and web services.
- SAST can't discover runtime and environment-related issues while DAST can discover runtime and environment-related issues.
- It costs less to fix vulnerabilities using SAST while it is relatively expensive to fix the vulnerabilities using DAST.
- SAST discovers vulnerabilities earlier into the SDLC while DAST discovers vulnerabilities towards the end of SDLC
- SAST requires source code DAST requires a running application.

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
SAST performs applications’ scanning automatically in the following simple steps:

#### Step 1: Choosing of the tool
Choose a particular static analysis tool that is able to carry out code reviews for your application according to the programming languages in which it is written, and can also understand your application's underlying framework.

For this sample test, we will use MobSF (Mobile Security Framework), which is an open-source, automated mobile penetration testing tool, as the tool for this security testing.

MobSF can be installed and used in an operating system, however, for this tutorial we're going to leverage the advantage of container technology and use docker to hold the framework and perform the analysis from a docker container.

Our choice operating system will be a Linux environment.

We will go ahead and create a docker container and deploy our framework in the next step.

#### Step 2: Creation of the docker container
This entails acquiring the necessary resources; in our case a docker container on which the tool is to be deployed and setting it up successfully.

We will setup the docker container as follows;

Set up the docker PGP key using the following command:

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add –
```

Configure docker using the following command:

```bash
echo 'deb [arch=amd64] https://download.docker.com/linux/debian buster stable' | sudo tee /etc/apt/sources.list.d/docker.list
```

Install docker using the following command:

```bash
apt install docker-ce
```

When our container is successfully created, we move to the next step.

#### Step 3: Deploying and running the tool
We will proceed to deploy our tool onto the container then trigger the framework to begin running within the container.

We will then download the MobSF tool docker image from [this](https://hub.docker.com/r/opensecurity/mobile-security-framework-mobsf/) git repository using the following command:

```bash
docker pull opensecurity/mobile-security-framework-mobsf
```

When the pull operation is done to completion it means our docker container is set up successfully and our framework deployed in it.

We then proceed to run the MobSF tool with the following command:

```bash
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf
```

The framework will initialize and begin running then the terminal will indicate "listening at http://0.0.0.0:8000" when the tool is successfully run to completion.

#### Step 4: Onboarding of an application
Once the MobSF tool is ready, the application is thereafter onboarded onto it for analysis.

We then access MobSF at the URL in the above step and upload the application to be tested.

Click on http://0.0.0.0:8000 from the console in step 3 then click upload and analyze as shown:

![upload and analyze](/how-to-perform-containerized-static-application-security-testing(sast)-using-mobsf-within-a-docker-container/upload.png)

The process will run to completion automatically then present the results after completion as shown below:

![results display](/how-to-perform-containerized-static-application-security-testing(sast)-using-mobsf-within-a-docker-container/results.png)

#### Step 5: Downloading the report and analysis of scan results
This step involves eliminating any false positives by triaging the results of the vulnerability scan.

Once the vulnerabilities have been completely assembled, they can be assigned to the deployment teams for appropriate action and timely correction.

Thereafter these vulnerabilities can be tracked on progress.

Navigate on the task pane to view the pdf report or download an offline report as shown:

![report](/how-to-perform-containerized-static-application-security-testing(sast)-using-mobsf-within-a-docker-container/report.png)

The above report can be studied offline.

### Advantages and Disadvantages SAST
#### Advantages of SAST
SAST has several advantages some of which are as listed below:
- SAST tools can analyze the entire codebase.
- SAST tools are much faster than human-triggered security code reviews, performing close to a million lines of code in a very short period.
- SAST tools automatically spot critical vulnerabilities with high confidence.
- SAST tools scale well given they can be run on multiple software and can be run multiple times.

#### Disadvantages of SAST
SAST has some drawbacks as outlined below:
- High numbers of false positives.
- SAST is occasionally unable to find configuration issues because they are not represented in the code.

### Conclusion
SAST remains to be an important part of SDLC given that vulnerabilities within an application source code can be noted earlier in the development, this leads to advantages such as cost-effectiveness related to application debugging and saves time.
Developers, therefore, roll out a fine-tuned application with minimal security concerns.

### Relevant Material
- [Static Application Security Testing: SAST Basics](https://www.whitesourcesoftware.com/resources/blog/sast-static-application-security-testing/)
- [Mobile Security Framework (MobSF) Static Analysis](https://medium.com/@kshitishirke/mobile-security-framework-mobsf-static-analysis-df22fcdae46e)
- [10 Types of Application Security Testing Tools: When and How to Use Them](https://insights.sei.cmu.edu/blog/10-types-of-application-security-testing-tools-when-and-how-to-use-them/)
- [SDLC - Overview](https://www.tutorialspoint.com/sdlc/sdlc_overview.htm)

---

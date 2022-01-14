---
layout: engineering-education
status: publish
published: true
url: /devops-test-automation-strategy-for-a-successful-ci-cd-adoption/
title: Devops Test Automation Strategy for a Successful CI/CD Adoption 
description: In this tutorial, we will learn about DevOps test automation strategy for a successful CI/CD adoption.
author: johnson-kamau
date: 2021-12-03T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/devops-test-automation-strategy-for-a-successful-ci-cd-adoption/hero.jpg
    alt: DevOps test automation strategy for a successful CI/CD adoption Hero Image
---
Test automation is the cornerstone of DevOps culture. While many institutions have realized its need and significance for a long time now, the COVID-19 pandemic has forced them to embrace automated testing throughout the SDLC for CI/CD. 
<!--more-->
However, the dire need for advanced test automation, owing to the work from home reality, makes test automation more challenging. 

In IT companies, developers and engineers in the operations department and testers have various duties and job profiles. They all work in distinct units. 

Henceforward, the critical question is whether QA can enhance and prompt product delivery by uniting these distinct clusters under the DevOps flag. If so, then the question is how to incorporate automated testing scenarios. 

This article wilL answer all these questions and provide steps to establish a robust testing automation strategy.

### Table of contents
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Why is having a test automation strategy crucial for CI/CD?](#why-is-having-a-test-automation-strategy-crucial-for-cicd)
- [Six steps to building a successful CI test automation strategy](#six-steps-to-building-a-successful-ci-test-automation-strategy)
- [Benefits of test automation](#benefits-of-test-automation)
- [Conclusion](#conclusion)

### Why is having a test automation strategy crucial for CI/CD?
For continuous delivery, one needs to build a rapid and continuous feedback mechanism. However, merely embracing the DevOps test automation mechanism is not adequate. To achieve success, one should know how to implement CI/CD. 

Some of the severe real-world instances of the biggest technology failures indicate what can happen when adequate testing is not done on respective systems/software. 

For instance, on April 26, 1994, an Airbus A300B4-622R was finishing its usual flight routine when right before landing at Nagoya Airport, it crashed, inflicting a heavy casualty count of 264 people. 

To date, the accident remains one of the most lethal mishaps in the history of China Airlines. Similarly, on August 14, 2003, after 2:00 PM, a high-voltage power line in northern Ohio brushed against some overgrown trees. 

It shut down completely, forcing about 50 million people to live without power for two days. The alarm system failure was caused by software issues. 

It became one of the most significant blackouts in North American history.

### Six steps to building a successful CI test automation strategy
#### Define your project’s scope of automation
The first step is to examine your project's scope from an automation point of view. The software team must define all deliverables, tasks, and sprints, including their time frames. 

The deciding factor for automating test cases is to know which ones to automate. You cannot automate everything, so you should be lining up your priorities, ultimately resulting in higher ROI. 

One of the well-known models that can aid you in shortlisting test cases for automation is Mike Cohen's test automation pyramid, which includes:

1. Unit test
2. Acceptance test
3. User Interface (UI) test 

![pyramid](/engineering-education/devops-test-automation-strategy-for-a-successful-ci-cd-adoption/pyramid.png) 

No matter how many Selenium commands your testers might know, or what testing commands they use, some things cannot be automated.

#### Choose the appropriate test automation tool
Picking a suitable test automation tool that meets the standards of your project is crucial.

It affects the success of your adaptive test automation strategy. However, a significant concern arises when selecting the right tool from a wide array of automation tools. 

To select the most appropriate testing tool that addresses your project needs, follow these few simple steps: 

- Step 1: Understand your project needs thoroughly.
- Step 2: Check whether the tool will support the platform/technology on which your software/app is built.
- Step 3: Examine if the tool can execute cross-platform testing.
- Step 4: Verify if the tool will strike a balance between ease of operation and technology.
- Step 5: While shortlisting tools consider these vital parameters:
          * Licensing cost of the tool.
          * Maintenance costs.
          * Tool scalability.
          * Training and support.
          * Tool performance and stability.
          
However, it is always advisable to consult experts when choosing/configuring a testing tool. 

#### Setting up the cloud-based test environment
A test environment combines hardware and software, enabling QA testers to run multiple tests on native/web applications. 

However, it requires a great deal of effort and expertise to build an efficient cloud-based test environment for a concrete CI/CD pipeline. 

Hence, a smart move is to consult the right solution provider for configuring a stable, cloud-based test environment. 

Note that you must take specific steps to create/configure an automated test environment for DevOps. They include:
- Realizing the requirements of a test environment.
- Planning, developing and provisioning the test environment.
- Embracing necessary technologies and tools with licenses.
- Data masking and desensitization. 
- Controlling and observing the test environment proactively.

#### Conduct a test case risk assessment
The fourth step is to analyze risks linked with automation testing, examine the severity of those risks, and optimize it. A test case risk assessment is a two-step procedure, which includes:

##### Step 1: Functional path risk assessment
In this step, you need to capture the risk involved in every functional module and prioritize all functional modules against each other.

##### Step 2: Risk rating of a test case.
Once you identify the operational risks linked to a specific module, the second step is to calibrate those risks by recognizing the probability of failure and severity of business damage. 

You then compute the risk factor for every test case with the following formula:

`Risks rating of test case = probability of failure * the severity of business damage`.

A few other risks that you must consider for your test cases are:
 - Configuration risk
 - API design risk
 - Refactoring risk
 - Integration risk
 - Market risk
 - Orchestration risk
 
#### Running and managing test cases
It is vital to define the test cases, execute them and manage them for effective automated testing. 

An execution plan must consist of two top things:
1. Daily tasks
2. Automation procedures

Moreover, there are specific tips that you can follow while writing test scripts and executing them like:

- Choosing the test cases that you are willing to automate.
- Running and verifying test cases multiple times before adding them to a regression suite.
- Trying to make a test case resilient to changes.
- Using pipeline orchestrators to execute numerous test cases simultaneously.

#### Analyze continuously and remodel the strategy for improvement
The last but minor step is to constantly analyze and improve the test automation strategy model via the automation maturity model (if needed). 

When revamping the strategy, you should go through everything in your existing approach. Find faults and fix them using the automation maturity model. This model is divided into multiple phases as follows:

![automation-model](/engineering-education/devops-test-automation-strategy-for-a-successful-ci-cd-adoption/devops-automation-model.png) 

### Benefits of test automation
 - Higher ROI
 - Enhanced efficiency
 - Reduced time-to-market
 - Multiple test analysis
 - Fast-paced feedback response
 - Optimum infrastructure utilization
 - Predictable cloud-based test environment
 
### Conclusion 
To fully benefit from test automation, a top-notch test automation strategy must be implemented, which could be expensive. 

The other challenge is to find the right test automation provider with a skilled team of experts to deploy, build and maintain the operational strategy/framework.

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
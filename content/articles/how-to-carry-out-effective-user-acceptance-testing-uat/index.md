---
layout: engineering-education
status: publish
published: true
url: /how-to-carry-out-effective-user-acceptance-testing-uat/
title: How to Carry Out Effective User Acceptance Testing (UAT)
description: This article will be an introduction to User Acceptance Testing. UAT ensures that the software system is working as per the business requirements. The system is evaluated in real-life scenarios from the external user point of view.
author: benson-kariuki
date: 2021-02-02T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-carry-out-effective-user-acceptance-testing-uat/hero.jpg
    alt: User Acceptance Testing (UAT) Image
---
User acceptance testing (UAT) is the final stage in the software development process before moving to production. We validate the provided software solution or product against business requirements. This article will discuss User Acceptance Testing in detail.
<!--more-->
### What is user acceptance testing (UAT)?
UAT is when we conduct a test to see whether a software product meets the business requirements. It is the final stage of software development before moving on to production. The end-user does it to verify a software system before moving the software product to a live environment. It confirms whether the solution works well for the user or not.

UAT is different from [unit testing](https://www.tutorialspoint.com/software_testing_dictionary/unit_testing.htm), [integration testing](https://www.guru99.com/integration-testing.html), and [system testing](https://www.softwaretestinghelp.com/system-testing/). System testing ensures that the system does not crash and meets the documented requirements. On the other hand, UAT ensures that the software system is working as per the business requirements. The system is evaluated in real-life scenarios from the external user point of view. You should do the test in an environment equivalent to a production environment.

The diagram below shows where UAT falls in the software development process.

![software process](/engineering-education/how-to-carry-out-effective-user-acceptance-testing-uat/software-process.jpg)

#### Objectives of UAT
- To confirm that the software product can perform all the business functions.
- To confirm that the software product is usable from the end-users perspective.
- To certify that the software product is ready to move to production.

#### Who conducts UAT?
The end-users or the client conducts UAT. These can be the end-users of a custom made software or someone who has requested custom software from a software developer as a service. The people performing the test are called the test team. 

In an organization, the team should comprise members from all departments and different groups. The testing team should be comprised of subject matter experts. For example, accounting software UAT should involve accountants.

#### UAT Prerequisites
Some requirements must be met before performing a UAT test. 

These include:
- Providing business requirements to the testing team. UAT is done against business requirements.
- The system must be fully developed and error-free. Only cosmetic defects are allowed. These are low-priority errors from a business point of view and do not affect the testing process.
- System testing, integration testing, and unit testing should be completed. System errors are not expected at this stage. The reported flaws are already fixed and evaluated before UAT.
- UAT environment should be available.
- [Regression testing](https://www.guru99.com/regression-testing.html) should be complete to confirm that recent code changes do not affect the software.

### Why you need user acceptance testing
The main reason why you need user acceptance testing is to validate if all business requirements of the software are met. This must be done before releasing the software to the market.

UAT also validates that change requirements are implemented to suit the business requirements. There could be some business changes that might not have been communicated to the development team effectively. UAT would be able to capture such changes.

UAT ensures that the losses that may arise from post-release issues will be reduced. The cost of fixing software issues before release is lower than fixing after release. UAT prevents the loss of reputation to an organizations that would be as a result of releasing software with defects to production.

### UAT process
The UAT process can be divided into four phases. In each phase, there are several activities done, as listed below.

#### 1. Planning
- The list of business processes to be tested is prepared.
- Defining the acceptance criteria.
- Select the testing team.
- Prepare the test data. The test data should cover all the software's functional scenarios in real-world usage.
- Prepare a UAT test plan. UAT test plan is prepared for the test execution.

#### 2. Design
- Design the test. We use the information collected in the planning phase to design the tests.

#### 3. Execution
- Execute the test using the test data and document the results. Defects found in the system are resolved and re-tested.

#### 4. Confirmation of business objectives
- Sign-off: This states that the software product meets the business requirements and is ready for production. The overall UAT process's deliverables are Test Plan, UAT scenarios, test cases, test results, and defect log.

### User acceptance testing tips
It is every test engineer's dream to ensure that the right solution is delivered to the users. This section will discuss some tips a developer may use while performing UAT along with best practices.

- **Set up the right environment:** Having a production-like test environment is important. Accurate performance testing cannot be carried out in test environments.
- **Plan your test:** Design a clear test acceptance plan during the requirement analysis and design phase. Planning reduces pressure to meet deadlines.
- **Train the UAT staff properly:** The testers need to be trained on the developed business requirements. During the planning phase, select and train testers. This can significantly increase the success of UAT.
- **Have the right communication channel:** UAT involves collaboration between the development, quality assurance (QA), and UAT team. Having a proper communication channel is key to the success of UAT, especially when the teams are working remotely.
- **Do not use the functional testing team:** Functional testers are not meant to perform UAT. Functional testers may end up not testing all real-world scenarios. This leads to end-users finding issues when the software is in production.

### Conclusion
UAT is the last chance to identify and rectify defects. Businesses may suffer losses if UAT is not performed properly (or at all). The losses that may occur (by fixing system issues after production), are much more expensive than fixing before production. 

The organization may also lose some reputation as a result of moving defective software to production. Therefore, an UAT is vital. Software testing is a broad field in computing. Certifications such as [Certified Test Engineer(CSE)](https://www.softwaretestinghelp.com/cste-certification-guide/) are also available.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)


---
layout: engineering-education
status: publish
published: true
url: /engineering-education/automation-testing-in-selenium/
title: An Overview on Automation Testing with Selenium
description: This article will be an overview on automation testing using Selenium. We will go over the components of Selenium by highlighting the main types of testing done by Selenium and what they are used for. 
author: onesmus-mbaabu
date: 2020-12-28T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automation-testing-in-selenium/hero.jpg
    alt: Automation Testing Image
---
Selenium is an effective automation tool that can help developers to validate their applications. The digital revolution has led to an increase in the number of web applications. Developers are constantly creating new web applications to meet various demands.
<!--more-->
Before they commission these applications for use, developers test them (using automation testing tools) to ensure that they function without problems.

This article will take you through the fundamental aspects of this software. It summarizes how automation testing takes place in the Selenium software. The article will also highlight the main types of testing done by Selenium. 

### Introduction to Selenium automation testing
[Automation testing](https://en.wikipedia.org/wiki/Test_automation) refers to the use of testing software and automation tools when testing new systems, applications, and software. This technique enables testers to establish whether there are defects in the applications or software. It also enables developers to check the effectiveness and performance of these applications. 

Selenium is a software used for automation testing in new applications. This software provides a framework for the testing of web applications (across various web platforms). It is open-source, which means that developers will not incur any costs related to licensing. 

Automation testing in Selenium has helped solve some of the challenges experienced in manual testing. In manual testing, the test cases are executed manually. The outcome of the test is compared with the expected or desired outcome. 

The disparity between the desired and actual outcome indicates the presence of a defect. This defect is fixed to ensure that the application is error-free. 

Selenium conducts automation testing within a shorter time, when compared to manual testing. It also provides various tools that increase the scope of testing. 

In this type of automation testing, the test cases are executed automatically, which increases the level of accuracy. Some of the programming languages employed in creating text scripts in Selenium include Java, Python, C#, Perl, Ruby, and PHP. 

This software supports testing across various browsers such as Internet Explorer, Apple Safari, Mozilla Firefox, and Google Chrome. Automation testing in Selenium can also be done on various operating systems such as Linux, Windows, and Mac.

### Why Selenium is widely used in automation testing
Selenium is widely used by organizations and web developers in the testing of web applications. The following are some of the reasons for the wide adoption of this software in automation testing.
- **Ease of use:** This software can be installed and used easily. 
- **Low Cost:** This software is open-source, which reduces the cost of licensing and testing. This also provides an open community for providing customer support. 
- **Flexibility:** Selenium software supports different browsers, programming languages, and browsers. This offers flexibility to web developers. This is unlike other testing software like Quick Test Professional (QTP) and Relational Functional Tester (RFT), which support a fewer number of browsers. 
- **Integration:** It is possible to integrate this software with other applications such as TestNG, Docker, Maven, and Junit. These applications add value to automation testing, especially test management.
- **Hardware consumption:** The execution of scripts requires low hardware consumption. 

### Components of Selenium and how they work
Selenium software has four main components: Integrated Development Environment (IDE), remote control (RC), web driver, and grid. These components perform specific roles in automation testing.

#### Selenium integrated development environment (IDE)
This can also be termed as a Selenium Recorder. It's utilized in the editing and recording of [functional tests](https://en.wikipedia.org/wiki/Functional_testing). A functional test is done to evaluate the functionality of an application. It is done by feeding an input into the application and examining the resulting output. 

Selenium IDE is also used for replaying and debugging tests. IDE has a playback feature that enables users to playback the recorded tests. In Mozilla Firefox, it's implemented as an add-on. In Google Chrome, it's also made available as a plugin. 

The interactions recorded by Selenium IDE are exported in the form of a reusable script. Users can export test cases to other Selenium components such as the Web Driver or Remote Control.    

Selenium IDE can be used even by people who have little experience with programming languages. Some of the commands in this component include open, ClickAndWait, and assert.  

The following diagram shows a screenshot of an IDE plugin in Mozilla Firefox.

![Selenium IDE](/engineering-education/automation-testing-in-selenium/selenium-ide.png)

[Image Source: Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/04/selenium-ide.png)

When a web browser is opened by a user, the Selenium Recorder records the test cases (automatically). The commands inserted by the IDE depend on the actions of the user. The test records can be configured or turned off, depending on the user's need. The recorded test cases are then edited by inserting editing commands. These records can then be saved by inserting the save command. 

#### Selenium remote control (RC)
This can also be termed as Selenium 1. It's a server that utilizes HTTP protocols to accept the command of the browsers. It supports the use of various programming languages such as Python, C#, Java, and Perl. Selenium 1 consists of two main components: the RC server and the RC client. The former uses HTTP requests to communicate. RC client acts as a library for the programming codes.

![Selenium RC](/engineering-education/automation-testing-in-selenium/selenium-rc.png)

[Image Source: Edureka](https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/04/selenium-rc.png)

The main limitation of this component is that it is slow and time-consuming. This explains why its usage has been declining.  

#### Selenium grid
This component was developed to reduce the execution time of tests. Through this component, test commands can be distributed across various remote machines (simultaneously). Selenium grid enables tests to be executed in parallel across various operating systems and web browsers. 

The following shows a simple diagram of how a Selenium grid works. 

![Selenium Grid](/engineering-education/automation-testing-in-selenium/selenium-grid.png)

[Image Source: Blog Spot](https://3.bp.blogspot.com/-sDHo9f9ODug/WXNptDcQEbI/AAAAAAAAAXs/f8chxG1ddH8UQJykqyUiZxRLdaMwe0aiQCLcBGAs/s1600/Selenium+Grid+Tutorial+1+www.helpautomation.blogspot.com.png)

The Selenium grid is comprised of a hub that is linked to many nodes. The tests that need execution are sent to this hub. The hub will also receive information relating to the web browser and OS on which the tests will be run. 

The hub will then select a node that is compatible with the received information. It will then send the test to this particular node. The node plays the role of implementing the test commands and running the web browser. 

#### Selenium web driver
This component is an upgraded version of Remote Control. This is the most applied Selenium tool in automation testing. It utilizes a client API to send commands to web browsers. 

Every browser consists of a unique web driver for running tests. Some of the web drivers for specific browsers include Firefox driver, Safari driver, Opera driver and Internet Explorer driver. 

Some of the programming languages supported by this component include PHP, Java, C#, Javascript, Ruby, Perl, and Python. 

Selenium web driver is also compatible with various browsers such as Opera, Internet Explorer, Mozilla Firefox, Google Chrome, and Apple Safari. The operating systems supported by the Selenium web driver include Mac, Solaris, Windows, and Linux.  

The following diagram shows a simple web driver architecture.

![Selenium Web Driver Architecture](/engineering-education/automation-testing-in-selenium/selenium-web-driver-architecture.jpg)

[Image Source: EDUCBA](https://cdn.educba.com/academy/wp-content/uploads/2019/04/Selenium-Webdriver-Architecture.jpg)

The automation script command in Selenium creates an HTTP request that is dispatched to a specific web driver (via an HTTP server). The HTTP server first receives the HTTP request and establishes the implementation steps for the command. 

The web driver sends this command to the web browser for execution. The status is returned to the server, which then passes it to the automation script.

Web driver is faster than RC and does not require a server dependency to conduct test automation. This explains why it is widely used compared to RC.  

### Types of testing that can be done using Selenium Web Driver
- **Unit testing:** This involves the testing of specific source code units. Some of the aspects tested in this category include program modules, operating procedures, usage procedures, and control data. 
- **System testing:** This automation testing examines whether the system complies with certain requirements that have been set. 
- **Integration testing:** In this category, testers examine whether the program modules work well even after integration. 
- **End-to-end testing:** This involves an evaluation of the whole software, including the external surfaces. It also evaluates how the system communicates and integrates with other applications, networks, interfaces, and databases. 
- **Regression testing:** This testing ensures that new codes do not affect the functionality of the existing web application. It enhances a seamless addition of new features.
- **Automated browser testing:** Automated testing ensures that the developed web application can be used in various browsers without experiencing problems. 
- **Performance and Load Testing:** This is used for testing the performance of web applications and their load time across various browsers.
- **Monkey testing:** This is a random test in which random inputs are used to check whether the application works well. 

### Limitations of Selenium automation testing
- It cannot be used for testing mobile applications.
- Test management can only be done through integration with other applications. This is because it is not supported by the Selenium framework.
- Using Selenium for automation testing requires users to be experienced with programming languages. 
- It does not support the testing of images.

### Conclusion
Selenium is a cost-effective and flexible tool developers can use in the automation testing of their web applications. 

The most intriguing feature of this software is the ability to test applications across various web browsers. This ensures that websites do not crash or breakdown in certain browsers. 

The Selenium software is ideal for companies developing applications that support heavy traffic, especially social platforms and e-commerce websites. This software has undergone improvement over the years, which has added value to web development.

### Resources
- [Selenium Expertz](https://seleniumexpertz.wordpress.com/2020/03/16/introduction-to-selenium/)

- [Selenium Easy](https://www.seleniumeasy.com/selenium-tutorials/introduction-to-selenium)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

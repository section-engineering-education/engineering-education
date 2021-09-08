---
layout: engineering-education
status: publish
published: true
url: /mobile-automation-testing-with-appium/
title: Mobile Automation Testing with Appium - An Introduction
description: This article will be an introduction to mobile automation testing using Appium. We will explore the building blocks of automation testing, it's importance and also a brief guide on how to get started with Appium.
author: onesmus-mbaabu
date: 2021-02-13T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mobile-automation-testing-with-appium/hero.jpg
    alt: Mobile testing hero image
---
Appium is an automation testing tool that can be used to validate mobile browsers and mobile applications. This tool is widely used in mobile automation testing because it is free and can support both iOS and Android platforms. Mobile apps have become an important element in our lives because they provide us a smart way of doing things like shopping, paying bills, chatting, and booking flights.
<!--more-->
Many mobile apps are constantly being developed to solve various real-life problems. Before these apps are commissioned for use, they are tested to validate their usability, quality, and functionality.

This article takes readers through Appium mobile automation testing tool and discusses its key features. It also provides an overview of Appium architecture and explains how it works.

### Introduction to mobile automation testing
Mobile automation testing is the use of automation tools to test new mobile applications before they are commissioned for use. This type of testing is done to check whether mobile applications work well across various operating systems and mobile devices.  

Automation in testing increases the speed and accuracy of testing. It is an effective way of checking defects in new mobile applications.  

This testing performs various aspects of testing such as usability, security, performance, quality, and functionality. It also tests the ability of a new application to interact with other applications.

### What is Appium?
[Appium](https://appium.io/index.html?lang=en) is a popular mobile automation testing tool used for testing mobile browsers and mobile applications. It validates the compatibility, usability, and response time of mobile browsers and applications across various mobile devices.

This software has been limited to mobile application testing, with a specific focus on iOS, Firefox OS, and Android applications. Various programming languages are supported in Appium automation testing. These include Python, PHP, Java, and Perl.

Automation tests in Appium can be run on mobile devices, [simulators](https://en.wikipedia.org/wiki/Simulation), and [emulators](https://en.wikipedia.org/wiki/Emulator).

A simulator is an imitation of the condition and operation of an application. Similarly, an emulator is software or hardware that allows a computer system (host) to run applications designed for another system (guest).

Automation testing in Appium does not depend on the operating system (OS) of a mobile device. This is because its framework can translate the driver commands into Android or iOS commands that do not depend on the type of the OS. Instead, these commands depend on the type of mobile device.

The following are some of the main types of mobile apps that can be tested using Appium automation testing:
- **Native apps:** These are platform-specific apps that are developed and operated in Android, iOS, or Windows SDKs. These apps do not have features for web browser navigation.
- **Hybrid apps:** These are apps that can work well on a certain platform and still have features for web browser navigation. These are mobile applications containing features for web browser navigation.
- **Web apps:** These are apps that can be accessed using browsers (built-in) of mobile devices.

### Prerequisites for using Appium
To use Appium, you need the following prerequisites:
- Node.js
- Java
- Android Studio
- Eclipse IDE
- Appium Server
- Appium Client Library
- Selenium Jar

### Why is Appium widely used?
Appium is widely used because of its unique features and the certain benefits it offers mobile app developers. The main features that make developers choose Appium over other mobile automation testing tools are:

- **Open source:** This tool is open source, which reduces the overall cost of developing and rolling out a mobile application for deployment.
- **Cross-platform:** Automation testing in Appium can be done on various platforms such as Windows, iOS, and Android. Other tools like [Robotium](https://www.tutorialspoint.com/mobile_testing/mobile_testing_robotium_framework.htm) and [Selendroid](http://selendroid.io/) support testing on only Android.
- **Multiple mobile apps:** Appium allows testing in various types of mobile applications (native, web, and hybrid apps).
- **Multiple programming languages:** Various programming languages are supported in Appium automation testing. These include Ruby, Javascript, C#, Python, and Java. This gives testers and developers some flexibility on the choice of language.
- **Integration:** This tool can be used with other external applications such as [Selenium Grid](https://www.guru99.com/introduction-to-selenium-grid.html) and [Selenium WebDriver](https://www.tutorialspoint.com/selenium/selenium_webdriver.htm).
- **Low memory consumption:** The architecture of Appium functions as a proxy between the tool-kit for automation and the test machine.
  
Appium is also chosen by testers and developers because it offers the following additional benefits:
- It allows the test scripts to be executed simultaneously.
- It contains a recording tool to record test cases and a playback tool for re-running such records.
- Various elements can be tested simultaneously (i.e. emulators, real devices, and simulators).
- It supports cloud-based testing using [testdriod](https://en.wikipedia.org/wiki/Testdroid).
- Appium is backed by an active community (Google group) that improves the ease and speed of troubleshooting.
  
### Appium architecture
The following diagram shows the architecture of Appium:
![Appium Architecture](/engineering-education/mobile-automation-testing-with-appium/appium-architecture.jpg)

[Image Source: Software Testing Help](https://www.softwaretestinghelp.com/what-is-appium/)

The Appium architecture consists of three main components:
1. Appium Client
2. Appium Server
3. End device

#### Appium client
This contains the automation code (scripted). This code is written in a specific programming language like Java, Python, Ruby, or Perl. The script contains the configuration details of the application and the mobile device. The scripted code and the configuration details are used to run the applications' test cases.

#### Appium server
This is an HTTP server that receives command requests (HTTP requests) from the client component (in JSON format). This server uses a Node.js server. The commands are then executed on mobile devices.

This component should be installed on the computer before scripting the automation code. The Appium server acts as an intermediary between the Appium Client and the end device. It is connected to platforms such as iOS, Android, and Windows.

#### End device
This refers to an emulator or a mobile device that is connected to the Appium server. The test cases are executed on this device.

### How does Appium work?
Appium works using the three main components of its architecture (client, server, and end device). When this tool is installed on your computer, it sets up an HTTP server that generates a REST API to enhance communication with the client.

This server collects command requests from the Appium client in JSON format. JSON Wire Protocol is a medium of communication between the server and the client. It plays the role of communicating command requests. These command requests are then executed on the end devices (either on Android, Windows, or iOS).

The Appium server uses a test automation framework to execute requests on the user interface of end devices. For example, it uses the *XCUI test* to execute commands on iOS. It uses *UI Automator* to execute command requests on Android platforms (for newer API versions).

The *XCUI test* allows users to write tests on iOS using Objective-C or Swift. The *UI Automator* is an Android testing framework that builds user interface (UI) tests using APIs. After the requests have been executed, the Appium server provides HTTP responses to the client.

Appium works differently on iOS and Android. Let's look at how it works on these two platforms.

#### How does Appium work on Android?
![Appium on Android](/engineering-education/mobile-automation-testing-with-appium/appium-on-android.png)

[Image Source: Edureka](https://www.edureka.co/blog/content/ver.1556540029/uploads/2019/05/Appium-on-Android-Appium-Architecture-edureka-4.png)

The following is a brief sequence of how Appium works on the Android platform:
1. The Appium client connects with the HTTP server and uses the JSON Wire Protocol for communication.
2. The Appium server receives requests from the client component.
3. The server connects with the mobile automation framework for Android (UI Automator or Selendroid).
4. Android devices contains **bootstrap.jar** that receives the test commands from the Appium server. The **bootstrap.jar** contains executable files that enhance the connection between the server and Android devices. It plays the role of a [TCP server](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) since it enhances the secure transmission of test commands to the Android devices.
5. The **bootstrap.jar** uses the UI Automator or Selendroid to execute the command requests on the Android device.
6. The test results are then sent to the server, which eventually sends HTTP responses to the Appium client. The HTTP responses contain status codes indicating success or server error.

#### How does Appium work on iOS?
![Appium on iOS](/engineering-education/mobile-automation-testing-with-appium/appium-on-ios.png)

[Image Source: Edureka](https://www.edureka.co/blog/content/ver.1556540029/uploads/2019/05/Appium-on-iOS-Appium-Architecture-edureka-4.png)

The following steps show how Appium works on the iOS platform:
1. The Appium client connects with the HTTP server and uses the JSON Wire Protocol for communication.
2. The Appium server receives requests from the client component.
3. The server connects with the mobile automation framework for iOS devices (XCUI test).
4. iOS devices contains **bootstrap.js** that receives the test commands from the Appium server. The **bootstrap.js** contains executable files that enhance the connection between the server and the iOS devices. It plays the role of a [TCP server](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) since it enhances the secure transmission of test commands to the iOS devices.
5. The **bootstrap.js** uses the XCUI test to execute the command requests on iOS device.
6. The test results are then sent to the server, that eventually sends HTTP responses to the Appium client. The HTTP responses contain status codes indicating success or server error. 

### Limitations of Appium
- It is not effective in handling image recognition algorithms. Users may need to employ image handling techniques.
- There is slow execution of test scripts on iOS platforms.
- Appium does not support older Android APIs. Alternatively, Selendroid could be used.
- Using Appium for automation testing requires the installation of other programs. For example, if you want to run test cases in Java, you will need to install Java (JDK), Appium Client Library, Selenium jar, Android SDK, and Eclipse IDE.

### Conclusion
In this article, we have learned about mobile automation testing with Appium.

To summarize:
- We gained a basic understanding of mobile automation testing.
- We learned about Appium software and why it is widely used in automation testing.
- We got an overview of Appium architecture.
- We learned how Appium works on Android and iOS.
- We also learned some of the limitations of Appium.

### Resources
- [Article by the Economic Times](https://economictimes.indiatimes.com/definition/mobile-automation)
- [Article by Tutorials Point](https://www.tutorialspoint.com/mobile_testing/mobile_testing_overview.htm)
- [Article by Edureka](https://www.edureka.co/blog/what-is-appium/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
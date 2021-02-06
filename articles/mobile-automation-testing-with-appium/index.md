Appium is an automation testing tool that can be used for validating mobile browsers and mobile applications. This tool is widely used in mobile automation testing because it is free and can support both iOS and Android platforms. Mobile apps have become an important element in our lives because they provide a smart way of doing things (eg. shopping, paying bills, chatting, and booking flights) using mobile devices.

Many mobile apps are constantly being developed to solve various real-life problems. Before these apps are commissioned for use, they are tested to validate their usability, quality, and functionality.

This article takes readers through Appium mobile automation testing tool and discusses its key features. It also provides an overview of Appium architecture and explains how it works.

### Introduction to Appium
Appium is a popular mobile automation testing tool used for testing mobile browsers and mobile applications. This software has been limited to mobile application testing, with a specific focus on iOS, Firefox OS, and Android applications. Various programming languages are supported in Appium automation testing. These include Python, PHP, Java, and Perl.

Appium provides tools for the automation testing of real physical objects, emulators, and simulators. Automation testing in Appium does not depend on the operating system of a mobile device. This is because its framework can translate the driver commands into Android or iOS commands that do not depend on the OS type. Instead, these commands depend on the type of mobile device.

The following are some of the main types of mobile apps that can be tested using Appium automation testing:

- **Native apps:** These are platform-specific apps that are developed using Android, iOS, or Windows SDKs. They operate on specific platforms. For example, either iOS or Android. These apps do not have features for web browser navigation.
- **Hybrid apps:** These are apps that can work well on a certain platform and still have features for web browser navigation. They are a combination of mobile applications and features for web browser navigation.
- **Web apps:** These are mobile apps that can be accessed using browsers of mobile devices (built-in).

### Why Appium is widely used
Appium is widely used because of unique features and certain benefits offered to developers of mobile apps. The following are the main features that make developers choose Appium for mobile automation testing:

- **Open source:** This tool is open source, which reduces the overall cost of developing and rolling out a mobile application.
- **Cross-platform:** Automation testing in Appium can be done on various platforms such as Windows, iOS, and Android. Some other tools support testing on only one platform. For example, Robotium and Selendroid tools support automation testing on Android only.
- **Multiple mobile apps:** Appium allows the testing of various mobile applications (native, web, and hybrid apps).
- **Multiple programming languages:** Various programming languages are supported in Appium automation testing. These include Ruby, Javascript, C#, Python, and Java. This gives testers and developers some flexibility.
- **Integration:** This tool can be used with other external applications such as Grid and Selenium WebDriver.
- **Little memory consumption:** The architecture of Appium functions as a proxy between the tool-kit for automation and the test machine.
  
Appium is also chosen by testers and developers because of the following additional benefits.

- It allows the test scripts to be executed in a parallel way (simultaneously).
- It consists of a recording tool for recording test cases and a playback tool for playing such records.
- Various elements can be tested simultaneously (ie. emulators, real devices, and simulators).
- It supports cloud-based testing using [testdriod](https://en.wikipedia.org/wiki/Testdroid).
- It consists of a lively community (google group) that improves the ease and speed of troubleshooting.
  
### Appium architecture
The following diagram shows the architecture of Appium:
![Appium Architecture](/engineering-education/articles/mobile-automation-testing-with-appium/appium-architecture.jpg)
[Image Source: Software Testing Help](https://www.softwaretestinghelp.com/what-is-appium/)

The Appium architecture consists of three main components: the Appium client, Appium server, and the end device.

#### Appium client
This consists of the automation code (scripted). This code is written in a specific programming language (Java, Python, Ruby, or Perl). The script contains the configuration details of the application and mobile device. The scripted code and the configuration details are used for running the application’s test cases.

#### Appium server
This is an HTTP server that receives command requests (HTTP requests) from the client component (in JSON format). This server uses the Node.js language. The commands are then executed on mobile devices. This component should be installed on the computer before scripting the automation code. The Appium server acts as an intermediary between the Appium Client and the end device. It is connected to platforms such as iOS, Android, and Windows.

#### End device
This refers to an emulator or a mobile device that is connected to the Appium server. The test cases are executed on this device.

### How Appium works?
Appium works using the three main components of its architecture (client, server, and end device). When this tool is installed on your computer, it sets up an HTTP server that generates a REST API.

This server collects command requests from the Appium client in JSON format. JSON Wire Protocol plays the role of communicating these requests. These command requests are then executed on the end devices (either Android, Windows, or iOS).

The Appium server uses a test automation framework to execute requests on the user interface of end devices. For example, it uses *XCUI test* to execute commands on iOS. It uses *UI Automator* to execute requests on Android platforms (for newer API versions). After the requests have been executed, the Appium server provides HTTP responses to the client.

Appium works differently on iOS and Android. Let's look at how it works on these two platforms.

#### How Appium works on Android?
![Appium on Android](/engineering-education/articles/mobile-automation-testing-with-appium/appium-on-android.png)
[Image Source: Edureka](https://www.edureka.co/blog/content/ver.1556540029/uploads/2019/05/Appium-on-Android-Appium-Architecture-edureka-4.png)

The following is a brief sequence of how Appium works on the Android platform:
1.The Appium client connects with the HTTP server and uses the JSON Wire Protocol for communication.
2.The Appium server receives requests from the client component.
3.The server connects with the mobile automation framework for Android (UI Automator or Selendroid).
4.Android devices consist of **bootstrap.jar** that plays the role of a [TCP server](https://en.wikipedia.org/wiki/Transmission_Control_Protocol). The **bootstrap.jar** receives the test commands from the Appium server.  
5.**Bootstrap.jar** uses the UI Automator or Selendroid to execute the action on the Android device.
6.The test results are then sent to the server, which eventually sends HTTP responses to the Appium client.

#### How Appium works on iOS?
![Appium on iOS](/engineering-education/articles/mobile-automation-testing-with-appium/appium-on-ios.png)
[Image Source: Edureka](https://www.edureka.co/blog/content/ver.1556540029/uploads/2019/05/Appium-on-iOS-Appium-Architecture-edureka-4.png)

The following steps show how Appium works on the iOS platform:
1.The Appium client connects with the HTTP server and uses the JSON Wire Protocol for communication.
2.The Appium server receives requests from the client component.
3.The server connects with the mobile automation framework for iOS devices (XCUI test).
4.iOS devices consist of **bootstrap.js** that plays the role of a TCP server. **Bootstrap.js** receives the test commands from the Appium server.  
5.**Bootstrap.js** uses the XCUI test to execute the action on the iOS device.
6.The test results are then sent to the server, which eventually sends HTTP responses to the Appium client.

### Limitations of Appium
- There are no detailed reports that provide adequate tutorial guides.
- The tests rely on a web driver (remote), which may make them slow.
- The support for older Android APIs is done indirectly through another library (Selendroid).
- Using Appium for automation testing requires the installation of other programs. For example, if you want to run test cases in Java, you will need to install Java (JDK), Appium Client Library, Selenium jar, Android SDK, and Eclipse IDE.

### Conclusion
Appium is a resourceful mobile automation testing tool that can be used for testing native apps, web apps, and hybrid apps. This tool can be used to perform mobile automation testing on various platforms such as Android, iOS, and Windows.

This tool can support various programming languages such as Ruby, Python, C#, Java, and JavaScript. The elements that can be tested include emulators, real devices, and simulators. Developers should utilize this tool to improve the user experience and functionality of mobile applications.

### Resources
- [Economic Times](https://economictimes.indiatimes.com/definition/mobile-automation)
- [Tutorials Point](https://www.tutorialspoint.com/mobile_testing/mobile_testing_overview.htm)
- [Edureka](https://www.edureka.co/blog/what-is-appium/)
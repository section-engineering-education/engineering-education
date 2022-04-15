 ### Introduction
Selenium is an open-source software automation testing that is commonly used. It makes it possible to test any kind of web application because it supports an automation framework.
Selenium is composed of four elements. Integrated Development environment for selenium, remote control, grid, and Web Driver. The four elements combined makes are utilized for automation testing.
Selenium framework, is the workspace created to mold a code for automation process of a web-base application. This framework makes it easier to maintain a code. Enhance efficiency and allow multiple programmers to comfortably enhance the code. Several framework are supported by selenium which we are going to cover.
### Prerequisites
To be able learn selenium need to have:
- A basic knowledge of an object oriented language such as Java, C#, C++ etc.
- An understanding in basic programming concepts
- Prior knowledge in different testing methodologies such as Regression testing, web UI testing and much more.
### Table of content
- [Prerequisites](#prerequisites)
- [Architecture for Selenium](#architecture-for-selenium)
  - [Remote control](#remote-control)
  - [Web drive](#web-drive)
  - [Integrated Development Environment](#integrated-development-environment)
  - [Grid](#grid)
- [Framework](#framework)
  - [Types of Frameworks supported by selenium](#types-of-frameworks-supported-by-selenium)
  - [Components of Selenium framework](#components-of-selenium-framework)
  - [supported file formats](#supporte-file-formarts)
  - [Creating a framework](#creating-a-framework)
  - [Advantages of selenium framework](#advantages-of-selenium-framework)
- [Conclusion](#conclusion)

### Architecture for Selenium
Selenium is composed of four main components. Selenium remote control, web drive, Selenium integrated development environment(IDE), and selenium grid.
#### Remote control
It's a very important component that allows software engineers to design scripts. For testing in several programming languages to automate front-end user interface tests. Server and client libraries are the major components of selenium remote control.
#### Client library
The client library Serves as a bridge between selenium Remote Control and various programming language.

#### Server
Below are the jobs performed by the server:
 - Receive and verify Hypertext Transfer Protocol requests between the browser and the application.
 - Start and stop the browser.
 - Operate the Hypertext Transfer Protocol proxy.
 - Interpret and execute Selenese commands given by the text program.

The Client-Server architecture of RC, with Selenium RC between the Automation Suite and the Application Under Test, slows down script execution. 
The Selenium WebDriver takes care of this because it connects directly with the AUT.  And takes advantage of the browser's natural compatibility with automation without the need for a server.
 #### Demerits of selenium RC
 - The execution of test scripts takes time because Selenium RC instructs the browser via JavaScript commands. As a result, performance is slow.
 - Headless HTMLUnit browsers are not supported (Invisible browser).
 - Complex architecture.
 - Slow performance.
 - APIs are less object-oriented.

### Web drive
Selenium WebDriver is a web framework for performing cross-browser testing. This program is used to test web-based applications to ensure that they work as intended.
You may use Selenium WebDriver to develop test scripts in any computer language.
Selenium's most well-known and crucial component. The program is an "Open Source utility," which means it is free to use. It is one of the most widely used automation tools, and various Automation Engineers use it.
Unlike Selenium IDE, WebDriver is an upgraded version of Selenium RC that supports a wider range of browsers and systems. Selenium Webdriver is a web-based test automation tool API that is simple to learn and use. It also allows you to test dynamic websites, because it is not attached to any test framework or tool, Selenium Webdriver makes it easy to create and maintain test scripts.
In selenium web, drive test script execution does not necessitate the initiation of a Selenium server like in the case of Remote control.

#### Advantages of selenium web drive
The following are the advantages of the selenium web driver:
- API (Application Programming Interface) is more concise than Selenium RC's.
- Modern browsers such as Opera, Microsoft Edge, Google Chrome, and Internet Explorer are supported.
- Multiple operating systems are supported, including Linux, Unix, Mac OS X, Windows, and others.
- When compared to other tools, Selenium WebDriver completes test script execution faster.

### Integrated Development Environment
Selenium IDE (Integrated Development Environment) is a performance tool for creating Selenium Test cases. It's a simple tool from the Selenium Test Suite that can be used by anyone new to creating automated test cases for their online applications. To get started using Selenium IDE, no extra setup is required. All you have to do now is add the extension for your particular browser. Selenium IDE has a GUI (Graphical User Interface) that allows you to effortlessly record your interactions with a website.

A user or a test case developer can use Selenium IDE to construct test cases and test suites, which they can then update later to meet their needs. The development environment also allows users to convert test cases to many programming languages, making it easier for them to use and removing the requirement for them to know a specific programming language.

#### How to add selenium IDE extension to your browser and use
The following is a step-by-step guide on adding and using the selenium IDE extension to your browser.

#### *Step 1*
Open your browser and search selenium IDE extension. you can also use click [here!](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en) to get the selenium IDE extension.

![seleniumext](/engineering-education/understanding-selenium-architecture-and-frameworks/seleniumext.png)

#### *Step 2*
 Click add to Chrome because am adding it to chrome, a pop-up will show up select add extension to proceed to the next step. After clicking on add extension a setup file will start downloading Wait and the extension will be added automatically.

 ![addtochrome](/engineering-education/understanding-selenium-architecture-and-frameworks/addtochrome.png)

 ![addextension](/engineering-education/understanding-selenium-architecture-and-frameworks/addextension.png)

 ![extensionadded](/engineering-education/understanding-selenium-architecture-and-frameworks/extensionadded.png)

#### *Step 3*
Go to the extensions in your browser and you will see selenium IDE. Open it.

![extensions](/engineering-education/understanding-selenium-architecture-and-frameworks/extensions.png)

![openseleniumide](/engineering-education/understanding-selenium-architecture-and-frameworks/openseleniumide.png)

#### *Step 4*
Click on Record a new test in a new project, to create a new test project. Enter preferred project name i.e. My-First-Test-Project.

![newtestproject](/engineering-education/understanding-selenium-architecture-and-frameworks/newtestproject.png)

![myfirsttestprj](/engineering-education/understanding-selenium-architecture-and-frameworks/myfirsttestprj.png)

#### *Step 5*
 Then enter the base URL of the project i.e. https://www.section.io and click
 start recording. You will be taken to the section.io website. Navigate through the website and the selenium ide will start recording events.

![baseurl](/engineering-education/understanding-selenium-architecture-and-frameworks/baseurl.png)

#### *Step 6*
After navigating through the section engineering community the events were recorded as shown in the image below.

![seleniumidetests](/engineering-education/understanding-selenium-architecture-and-frameworks/seleniumidetests.png)

#### Features of selenium IDE
Below are the different features found in the selenium IDE and their functions:
- Run-all: permits execution of the whole suite.
- Roll-up: assist to bring together all Selenese commands and execute them as a single operation.
- Step: helps to proceed to each command in the testing script.
- Speed-Control: used to adjust the speed of test cases.
#### Advantages of Selenium IDE

- Permits testers to place baselines to diagnose certain test scenarios.
- Runs using a large number of Selenese commands that assist the IDE in determining what needs to be done.
- Allows developers to be more creative while executing test cases. The test developer can either run the whole test suite or a single test case.
- Re-use of test cases is possible utilizing the `Run` command.
- Enables users to generate dynamically, individual testing cases depending on the browser activities.

#### Demerits of selenium IDE
- It's not possible to test database connections.
- It's Not ideal for lengthy data testing.
- Can't deal with the dynamic aspects of web-based applications.

### Grid
Permits users to perform tests on numerous virtual computers simultaneously. This is accomplished by sending instructions to multiple internet browser clones through a centralized server. The main goal of selenium grid is to simplify parallel testing on numerous virtual machines.

#### Components of selenium grid
It's composed of two main components namely:
- Node: Virtual computer that has an operating system and webdrive. It takes queries from the gateway in the form of a JavaScript testing script and utilizes WebDriver to perform them.
- Hub: Refers to computer that receives user access priveledges from the webdriver and sends JavaScript test commands to virtual drives on remote machines.

#### Advantages of selenium Grid
- Its cheap and simple to maintain virtual infrastructure.
- Allows ease and extends testing coverage in short time.

### Framework
The collection of automated testing tools built on the JavaScript framework is referred to as the `Selenium framework`. 
Selenium frameworks launch the tasks on the intended computer, trigger the events on the appropriate website, and execute them automatically.

#### Types of Frameworks supported by selenium
- Data-driven framework 
It is a framework that is built around several datasets. Generated from an output system such as excel spreadsheets, XML, and CSV and loaded to the automated software.
- Keyword-driven framework: 
The operations or techniques to be executed are written in the form of keywords apart from the actual script. The code is used to call these keywords that are stored in an external file (Excel sheet). This allows testers to segregate the various functions.
- Hybrid-Driven framework: 
Data-driven and keyword-driven frameworks are combined to form the hybrid-driven framework. In this framework, excel files are used as keywords to maintain. The collection of entries and functions are saved in distinct files, and the framework makes use of various keywords and data sets. It utilizes the same codes for various datasets like the data-driven frameworks.

#### Components of Selenium framework
- Testing Framework: 
NUnit and TestNG are the testing frameworks.
- Integrated Development Environment (IDE): 
An IDE for the programming language you are using, such as Eclipse for Java.
- AutoIT: 
Opensource BASIC-like scripting language designed for automating the Windows GUI and general scripting.
- Programming Language: Selenium and Java.

#### supported file formats
Below are file formats supported by selenium frameworks.
- Excel Files: used to Import and export tabular data to the application.
- XML File: Executes test scripts.
- Properties file: collects user interface elements of an application.

#### Creating a framework
Below is the procedure to create a framework in selenium:
- Programming language, select an appropriate programming language, like C++, Java an much more. Choose a framework that will serve as a starting point.
- Unit testing framework, choose a suitable suitable unit testing framework such as TestNG.
- Create the framework's structure, involves creating selenium core elements and test components. 
- Choose an efficient reporting mechanism that can translate the test outcome into inputs.
-Create a version control system and put Continuous Integration (CI) and Continuous Delivery (CD) in place (CD).
 The term 'CI/CD' refers to a way of delivering applications to users consistently. By incorporating automation into the application development process.
- Using technologies such as AutoIT, TestRail, and Jira, to mention a few, merge the framework.
#### Advantages of selenium framework
- helps to make code maintenance easy.
- Testing adaptability.

### Conclusion
Selenium architecture and frameworks were discussed in this article, as well as Selenium remote control and the Integrated Development Environment. Web-driver, Selenium grid, how to utilize the Selenium IDE, and the benefits and drawbacks of the Selenium IDE are all covered. We also talked about selenium frameworks and different types of frameworks. Selenium framework components and file formats are supported. The benefits of selenium frameworks and how to create them.


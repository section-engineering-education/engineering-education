# What is Jenkins

## What is Jenkins?
Jenkins is a Continuous Integration tool and an open-source tool written in Java. Jenkins achieves Continuous Integration with the help of plugins, which are over a thousand. Developers mostly use Jenkins for Continuous Integration because of its flexibility and the number of plugins it supports. Developers use Jenkins to continuously build and test software projects, making it easier to integrate changes to the project and making it easier for users to obtain a good build with no errors and bugs. Jenkins allows developers to continuously deliver a software project by integrating with a large number of development, deployment, testing technologies such as Git, Maven, Puppet, Selenium, Ansible, and Nagios.

### Problems Developers faced before Continuous Integration
Earlier before Continuous Integration was introduced, a team of developers used to work from different locations, each of them would individually implement a few classes. They would write code and tests to ensure that their classes work properly. Then assume the software project will build and run smoothly because classes are tested well. They then integrate the classes and combine them to create a larger program that is being developed by the team, but suddenly everything breaks.  There are issues with integration, the code fails to compile all sorts of bugs arise and things stop working out, this is also called integration hell [SOLUTIONS IQ](https://www.solutionsiq.com/agile-glossary/integration-hell/#:~:text=Integration%20Hell%20refers%20to%20the,that%20it%20can%20finally%20integrate.)
Integration hell is a major problem to software projects and it is risky to their success reason being it is hard to estimate how long it will take to fix the things that go wrong. Developers had to figure out what is wrong, and that can be very hard to do in a large project. After diagnosing the problems, again time had to be spent fixing them, the project budget may also increase and the success of the project risked. The solution to integration hell was to integrate continuously throughout the entire project, and thus the practice of Continuous Integration was introduced to the DevOps field. 

### What is Continuous Integration?
CI is a development practice whereby developers are required to commit changes to the source code in a shared repository more frequently. CI says developers must integrate code early and often, so every time changes are pushed to the repository such as GitHub the project code should be checked into, compiled, and tested. The productivity of developers has been improved by Continuous Integration, rather than earlier when they used to wait until all components are developed. Then spend weeks and months working on bugs and errors that will inevitably arise [Edureka](https://www.edureka.co/blog/what-is-jenkins/).
Continuous Integration allows the development teams to detect problems early. It also automates the process of compiling, testing, and reporting the project source code. When a developer push changes into a repository, the CI server gets notified about the changes. The CI server either pulls the repository after a few minutes to see if there are any changes or the repository actively calls the CI server to let it know when there are changes. It then clones the repository and builds the project. If the project fails it notifies the team. The Continuous integration server finally generates various reports such as the line coverage of the project test or style issues found on the project code [Guru99](https://www.edureka.co/blog/what-is-jenkins/).

### Why Continuous Integration is needed
- Using CI developers experience fewer conflicts when integrating code, this is because when code get merged it does not easily break. Also, even if it breaks the problem is easily solved. 
- A developer may forget to run the project code before checking the changes, on the other hand, the CI server does not forget and the problem is caught and solved.
- CI supports automation through the process of building or compiling, testing, and reporting to the development team
- CI allows continuous delivery to take place[Medium](https://medium.com/the-making-of-whereby/why-continuous-integration-is-so-important-7bb63ba5dc57).
- Using CI locating and fixing bugs becomes very easy because developers do not have to wait for long to get the test results.
- Developers are continuously notified about the build status, test results, and how the application is doing.

### Continuous Integration With Jenkins
Jenkins achieves continuous integration with the help of plugins. It has over a thousand plugins that integrate with every tool in the CI and CD toolchain. Jenkins reduces the development cycle since code gets to build and tested continuously, thus releasing new features to the user faster and with fewer errors. Short time is taken to integrate the code, but before the use of Jenkins integration was done manually thus more time was taken. The use of Jenkins enables integration to take place continuously. The use of Jenkins has helped the developers to get feedback faster after the code has been integrated, this is because if code breaks they can know what the issue is and how it will be solved.

### Features of Jenkins
 - Easy Configuration
 Setting up Jenkins is easy and the web interface makes it is easy for developers to check for any errors, also they get great built-in help.
 - Easy Installation
 Jenkins is a self-contained Java program, it allows developers to run on most popular operating systems such as Windows, Mac Os, and Linux.
 - Plugins
 Plugins are tools that make Jenkins is powerful for developers and continuous integration teams. Plugins allow Jenkins to integrate with development, testing, and deployment tools. 
 - Extensibility
 Jenkins is extensible because the opportunity for developers to be able to configure them to fit in the environment is almost endless. The extensibility can be continued with newer releases of Jenkins, thus having the latest version of Jenkins.
 - Distributed
 Jenkins easily distribute work across multiple machines, helping in faster builds, tests, and deployments across multiple platforms.





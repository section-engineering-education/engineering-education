---
layout: engineering-education
status: publish
published: true
url: /getting-hands-on-a-microprofile-project/
title: Getting Started with a Microprofile Project 
description: This tutorial will guide the reader on how to get started with a Mircroprofile project. How to build the application microservices separately. How to run the microprofile services separately in the development and operation mode.
author: justus-mbuvi
date: 2021-08-30T00:00:00-12:00
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-hands-on-a-microprofile-project/hero.png
    alt: Getting Started with a Microprofile Project example image
---
MicroProfile specifies a collection of Java EE (Enterprise) technologies and APIs that consolidate from a core baseline microservice to deliver application portability across multiple MicroProfile runtimes.	
<!--more-->
It has been attracting attention from developers since this Java EE implementation does not take up much time in server booting and code run time as it did before when using former versions of Java EE.	 
  
This is due to the continuous agile improvement of individual Java Specification Requests (JARs) that make up Java Enterprise (EE).	 

At the end of this tutorial, you will have learned how MicroProfiles work and how they are used.	 
  
You will also get hands-on with a MicroProfile Project.	 
  
### Table of contents	 
 - [Key takeaways](#key-takeaways)
 - [Pre-requisites](#pre-requisites)	 
 - [What is MicroProfile?](#what-is-microprofile)	 
 - [Microprofile Servers in the market](#microprofile-servers-in-the-market)	 
 - [Generating a MicroProfile application](#generating-a-microprofile-application)	 
  - [start.microprofile.io, Microprofile initializer](#startmicroprofileio-microprofile-initializer)	 
 - [Visual Studio Code IDE](#visual-studio-code-ide)	 
 - [IntelliJ IDE](#intellij-ide)	 
 - [Microprofile Project structure](#microprofile-project-structure)	 
 - [Build the microservices](#build-the-microservices)	 
 - [Run the microprofile microservices applications](#run-the-microprofile-microservices-applications)	 
  - [Run Service-a](#run-service-a)	 
  - [Run Service-b](#run-service-b)	 
  - [Navigate the endpoints](#navigate-the-endpoints)	 
 - [Conclusion](#conclusion)	 
 - [Further reading](#further-reading)	 
 - [References](#references)	 
  
 ### Key takeaways	 
We will learn the following:	 
 - What is MicroProfile.
 - MicroProfile prerequisites.	 
 - Creation of a MicroProfile application using different methods or tools such as from the [https://start.microprofile.io/](https://start.microprofile.io/) website, using Visual Studio Code and IntelliJ.	 
 - MicroProfile project structure.	 
 - Running microprofile microservices applications.	 
  
 ### Prerequisites	 
 Some basics required to follow along with this article include:	 
 - An IDE that supports Java frameworks installed on your machine.	  
 - JDK 11+ of any distribution installed. MicroProfile supports JDK 11 and above.	 
 - Gradle or Apache Maven 3.8.1+ installed.	 
 - Java programming skills	 
  
 >**Note**: Some of these requirements may change in the *future*.	 
  
 ### What is MicroProfile?	 
 MicroProfile is an Opensource community-driven specification used to define Microservices' standards in Java Enterprises technologies.	 
  
 It defines how microservices are built, work, communicate with each other and how they are independent but loosely coupled to promote application portability.	 
  
 It has a great community of individuals, organizations, and vendors who collaborate within an open-source project bring out the microservices to the Enterprise Java Community.	 

 ### Microprofile servers in the market	 
 Currently, there are almost ten Runtimes.	 
  
 Some of these are shown in the image and table below:	 
 
 ![microprofile runtimes](/engineering-education/getting-hands-on-a-microprofile-project/microprofile-runtimes.png)	 
  
 *(Image from official website)*

 | MicroProfile architecture | Details |	 
 |---|---|	 
 | [Payara Micro](https://www.payara.fish/) | is a lightweight middleware platform for containerized Jakarta EE application deployments that requires no installation, configuration, or code rewrites for quick deployments |	 
 | [WildFly](https://www.wildfly.org/) | Is a lightweight, modular microservice framework that is centralized, simple, and user-focused and implements the latest in enterprise Java standards from Jakarta EE and Eclipse MicroProfile |
 | [Quarkus](https://quarkus.io/) | A Kubernetes Native Java stack built for GraalVM and OpenJDK HotSpot, crafted from the best of breed Java libraries and standards. |	 
 | [Apache TomEE](https://tomee.apache.org/) | This is the Apache Tomcat Java Enterprise Edition which combines several Java enterprise projects which include Apache OpenEJB, Apache OpenJPA, Apache OpenWebBeans, Apache MyFaces and many others |	 
 | [Hammock](https://hammock-project.github.io/) | This is a bootstrapping CDI-based Java Enterprise MicroServices framework used for building applications due to its flexibility and simplicity. |	 
 | [Open Liberty](https://openliberty.io/) | Is an Open source lightweight Java EE microservice framework used to build fast and efficient cloud-native Java microservice applications which runs only the needed services while considering the latest Eclipse MicroProfile standards |	 
 | [Helidon](https://helidon.io/#/) | This is a collection of Java libraries used for writing Java microservices which run on a fast Helidon Reactive WebServer, a web core powered by Netty, while supporting MicroProfile and its standard specifications |	 
 | [KumuluzEE](https://ee.kumuluz.com/) | is a lightweight framework utilized for developing microservices using standard Java/JavaEE/JakartaEE/EE4J technologies and APIs with optional extensions, such as with Node.js, Go, and other languages, and migrating existing applications to cloud-native architecture and microservices for easier cloud-native microservices development |	 
 | [Fujitsu_Global Launcher](https://github.com/fujitsu/launcher) | It was developed by Fujitsu, and is a Java EE microservice framework supporting certain MicroProfile specifications and can bundle the application into über-jar / fat files (JAR files with all its needed dependencies) |	 
 | [ThornTail (Outdated)](https://thorntail.io/) | Is a Java Enterprise microservices framework that bundles only needed and specified packages into a JAR file with enough runtime to run them |	 
 
  
 ### Generating a MicroProfile application	 
 In the steps below, you will learn how to generate Microprofile applications using the following methods and tools:	 

 - [start.microprofile.io](https://start.microprofile.io/index.xhtml), Microprofile initializer.
 - [Visual Studio Code](https://code.visualstudio.com/), [IntelliJ IDE](https://www.jetbrains.com/idea/), or any other IDE that supports Java development.	 
  	 
 #### start.microprofile.io, Microprofile initializer	 
 Head over to the [https://start.microprofile.io/index.xhtml](https://start.microprofile.io/index.xhtml) website using your browser.	 
  
 It will appear as shown in the image below:	 

 ![microprofile initializer webpage](/engineering-education/getting-hands-on-a-microprofile-project/microprofile-initializer-webpage.png)	 
  
 *(Screenshot by Author)*	  
  
 You will see some options in it such as the _groupId_, _artifactId_,_MicroProfile Version_, _Java SE Version_, _Build Tool_ (i.e., Maven and Gradle), *MicroProfile Runtime*, and *Examples for Specifications*.	 
  
 Once these are set, you will be able to download the zipped project. Then, unzip it to get the project as you would expect.	

 Set the following:	 
 - _**groupId**_: to be '**starter**'	 
 - _**artifactId**_: to be '**com.starter**'	 
 - _**MicroProfile Version**_: to be **3.2**	 
 - **Java SE Version**: to be Java 11	 
 - **Build Tool**: Maven or Gradle	 
 - **MicroProfile Runtime**: Quarkus	 
 - In the **Examples for specifications** section: select all	 
  
 Click on the 'Download' button to download.	 

 > **Note**: To use Quarkus as your _MicroProfile Runtime_, you will have to choose a lower _MicroProfile Version_ [3.2](https://quarkus.io/blog/tag/microprofile/).	 	 
  
 Some versions and Runtimes supported:	 

 | MicroProfile Version | Runtimes or Servers |	 
 |---|---|	 
 | 1.2 | Open Liberty, WildFly Swarm, KumuluzEE, Payara Micro, ThornTail V2, Apache TomEE, Helidon |	 
 | 1.3 | Open Liberty, KumuluzEE, Payara Micro, ThornTail V2, Apache TomEE |	
 | 1.4 and 2.0 | Open Liberty, KumuluzEE, Payara Micro, Apache TomEE |	 
 | 2.1 | Open Liberty, KumuluzEE, Payara Micro, ThornTail V2, Apache TomEE |	
 | 2.2 | Open Liberty, KumuluzEE, Payara Micro, ThornTail V2, Helidon |	 
 | 3.0 | Open Liberty, KumuluzEE, ThornTail V2, Helidon |	 
 | 3.2 | Open Liberty, WildFly, KumuluzEE, Payara Micro, ThornTail V2, Quarkus, Helidon |	 
 | 3.3 | Open Liberty, WildFly, KumuluzEE, Payara Micro, ThornTail V2, Helidon |
 | 4.0 | Open Liberty, WildFly, Payara Micro |	 
  
 
 As of the 4.1 version, the notable Microprofile API's specifications, 18 in number, are divided into two main categories: MicroProfile applications (13) and stand-alone applications (5).	 

 They are shown below:	 
  
 *(As of July 2021 in Version 4.1 release)* 
  
 ![microprofile 4.1 specifications preview](/engineering-education/getting-hands-on-a-microprofile-project/microprofile-4.1-specifications-preview.png)	 
  
 *(Image from official website)*	 
 
 Just to add, Quarkus has passed all the Microprofile 3.3 [Technology Compatibility Kit (TCK)](https://jcp.org/en/resources/tdk) tests as shown [here](https://microprofile.io/2021/08/05/microprofile-4-1-is-now-available/) or as in the image below:	 
 
 ![microprofile 4.1 specifications update](/engineering-education/getting-hands-on-a-microprofile-project/microprofile-4.1-specifications.png)	 
  
 ![Quarkus TCK passed](/engineering-education/getting-hands-on-a-microprofile-project/Quarkus-TCK.png)	 
  
*(Images from official website)*	 

 Technology Compatibility Kit (TCK) is a suite of tests. It checks for an implementation of a Java Specification Request (JSR) for compliance.	 

 MicroProfile Specification TCKs and their purposes:	 
 
 | MicroProfile Specification TCKs | Purpose |	 
 |---|---|	 
 | Config | Externalizes and your configuration parameters outside your microservices. These come from different locations and are of different data types such as system properties, system environment variables, .properties, .xml, Datasource |	 
 | JWT (JSON Web Token) Propagation | Propagates security outside your microservices |	 
 | OpenAPI | Generates OpenAPI-compliant API documentation for your microservices|	 
 | Health | Verifies the health of your microservices with custom verifications |	 
 | Metrics | Gather and create operational and business measurements for your microservices |	 
 | Fault Tolerance | It deals with all bulkheads, timeouts, circuit breakers, retries, and fallbacks |	 
 | Open Tracing | It defines an API and associated behaviors that allow services to participate in a distributed tracing environment easily |	 
 | TypeSafe Rest Client | provides a type-safe approach to invoke RESTful services over HTTP |	 
 | JAX-RS (Jakarta RESTful Web Services) | provides standard client and server APIs for RESTful communication by MicroProfile applications |	 
 | JSON-B (Jakarta JSON Binding) | provide standard APIs for binding JSON documents to Java code |	 
 | JSON-P (Jakarta JSON Processing) | provide standard APIs for processing JSON documents |	 
 | Jakarta Annotations | provides annotations (comments) for common semantic concepts across a variety of individual technologies in the Java™ SE and Jakarta EE platforms |	 
 | CDI (Jakarta Contexts and Dependency Injection) | provides the base for a growing number of APIs included in MicroProfile |	 

 You can read more [here](https://download.eclipse.org/microprofile/microprofile-4.1/microprofile-spec-4.1.html#required-apis).	 

 Depending on your project specifications, you can add or remove the microprofile specifications.	 

 Head over to the zipped file and extract it. Then, open it up with your IDE.	 
  
 If you are using Visual Studio Code, head over to the section below to see some extensions required to support your project.	  
 ### Visual Studio Code IDE	 
 First, install the needed extensions. 
 
 These are:	 
 - Microprofile Starter	 
 - Tools for microprofile	 
 - Extension pack for microprofile	 
 - Quarkus	 

 Others (optional) depending on your needs may include:	 
  
 - Generator for microprofile	 
 - Open Liberty Tools	 
 - Payara Tools	 
 
 These are shown in the image below:	 
  
 ![some microprofile VSCode extensions](/engineering-education/getting-hands-on-a-microprofile-project/some-microprofile-VSCode-extensions.png)	 
  

 ![VS Code microprofile extensions](/engineering-education/getting-hands-on-a-microprofile-project/VSCode-microprofile-extensions.png)	 
  
 *(Screenshots by Author)*
  
  
 Once you are done, head over to the Command Palette using key combinations `Ctrl + Shift + P` or find it in the Menu bar under *View*.	 

 Search for 'MicroProfile' and select 'Generate a new Microprofile starter project'.	 
  
 It will generate the project by getting the file from the [microprofile initializer website](http://start.microprofile.io)	 
  
 ![VSCode Generate microprofile starter project](/engineering-education/getting-hands-on-a-microprofile-project/VSCode-Generate-microprofile-starter-project.png "VSCode-Generate-microprofile-starter-project")	 
  
 *(Screenshot by Author)*	 

 Now, in the next over-head pop-up window, set your project:	 
 - `Group Id`: to 'com.starter'	 
 - `Artifact Id`: to 'starter'	 
 - `Version`: to 3.2	 
 - `MicroProfile server`: to Quarkus	 
 - `Java SE Version`: to SE11	 
 - `MicroProfile specifications`: Select all	 
 - Set the folder in which your project root folder will lie.	 

 ![select all microprofile specifications](/engineering-education/getting-hands-on-a-microprofile-project/select-all-microprofile-specifications.png)	

 *(Screenshot by Author)*	 

 - Open it in a new window or the current.	 

 ![choose if to add it to your workspace or in a new window](/engineering-education/getting-hands-on-a-microprofile-project/choose-if-to-add-it-to-your-workspace.png)	

 *(Screenshot by Author)*	 

 ### IntelliJ IDE	 
Open IntelliJ IDEA. Create a new project and in the project type on your left-hand side, select 'Microprofile'.	 

Set the following:
 - `Name`: starter	 
 - `Location`: Set the folder for your project root folder	 
 - `Runtime`: Quarkus	 
 - `Group`: com.starter	 
 - `Artifact`: starter	 
 - `Project SDK`: 11	 

  
 ![Intellij Microprofile start](/engineering-education/getting-hands-on-a-microprofile-project/Intellij-Microprofile-start.png)	 

 *(Screenshot by Author)*	 

 Now, on the next step, select the Specifications; **Select all**.	 
  
 On the top of the window, you shall see the MicroProfile version already set to 3.2.	 
  
 ![Intellij specifications](/engineering-education/getting-hands-on-a-microprofile-project/Intellij-specifications.png)	 
 
 *(Screenshot by Author)*	 
  
 In case you could select WildFly, you would see that you can choose up to 4.0.

 Click on finish and wait for the IDE to **finish** indexing of the project.	 
 
 ### Microprofile project structure	 
 As you will notice, the project has two separate microservices; '**service-a**' and '**service-b**'.	 
  
 Your project folder structure should be as shown below:	 
  
 ```bash
 .	 
 ├── service-a (Folder)	 
 ├── service-b (Folder)	 
 ├── readme.md (File)	 
 └── starter.iml (File)	 
 ```	 

 In the first microservice, you will see that all the specifications are each in a separate folder under the `src/main/java/com/starter/starter`.	 

 These include the *client*, *config*, *health*, *metric*, *openapi*, *resilient*, and *secure* folders. As of **service-b**, it has the *client* and *secure* folders only.	 

 ### Build the microservices
 Open two separate terminals and align them side to side. This will be useful for you to see them running separately.	 
 On the first terminal, navigate to the '**service-a**' folder.	 

 Do it by running from the 'starter' folder:	 

 ```bash	 
 cd service-a
 ```	 
  
 Build the first microservice by running:	 
  
 - **In Maven**:	 	 
  
 ```bash	 
 mvn package	 
 ```	 
  
 - or **in Gradle** using:	 
   
  
 ```bash	 
 ./gradlew build	
 ```	 

 On the second terminal, which is the '**service-b**' terminal, run the commands above respectively according to the build you selected. Wait as it downloads all needed dependencies and also builds the files. 
 
 Since it is not a [über-jar / fat](https://imagej.net/develop/uber-jars) file (which is compiled with all its dependencies), the dependencies will be automatically stored in the target folder.	 
  
 You can check how to create one in the readme file in the 'services' folder.

 ### Run the microprofile microservices applications
 #### Run Service-a	 

 Head over to the 'service-a' terminal and run the following command:	 

 - In **Maven**:	 

 ```bash
 mvn compile quarkus:dev	 
 ```	 

 - or **Gradle**:	 

 ```bash	 
 ./gradlew quarkusDev	 
 ```	 

 This will run the service in the dev mode, which supports 'hot reload' features. When you access the application via `http://localhost:8080` in the browser it should look as shown below:	 

 ![service-a webpage](/engineering-education/getting-hands-on-a-microprofile-project/service-a.png)

 *(Screenshot by Author)*	 

 #### Run Service-b	 
 Since quarkus microservices run on default at port 8080, you will need to escape this since it is already in use. You will run the app on a different port, as you will specify shortly.	 
  
 Run:	 
 
 ```bash
 java -Dquarkus.http.port=8180 -jar target/starter-runner.jar
 ```	 

 This runs the '**starter-runner**' JAR file in the 'target' folder on port `8180`.	Access it on the browser using `http://localhost:8180`.	 

 #### Navigate the endpoints	 

 - **Using online Swagger editor, an Open API document viewer (Swagger editor)**:	 

 On the `service-a` webpage, click on the links to see the output of each. As for the 'Open API Documentation' link, it shall automatically download the documentation.	 View it properly using ***Swagger editor*** at [this](https://editor.swagger.io/) link.

 Do this by opening the document using a text editor, then copy-paste the text into the site and access the endpoints using the Graphical User Interface (GUI).	 

 ![swagger editor](/engineering-education/getting-hands-on-a-microprofile-project/swagger-editor.png)
 
 *(Screenshot by Author)*	 
 
 - **Using embedded OpenAPI document viewer:**	 
  
 This you can do by adding an OpenAPI dependency to your project.	 

 For **Maven**:	 
 Head over to the 'pom.xml' file in 'service-a' folder and add the following piece of code under the dependencies tags:	 

 ```xml	 
 <!-- https://mvnrepository.com/artifact/org.openapitools/openapi-generator -->	 
 <dependency>	 
  <groupId>org.openapitools</groupId>	 
  <artifactId>openapi-generator</artifactId>	 
  <version>5.2.0</version>	 
 </dependency>	 
 ```	 

 For **Gradle**:	 
 Head over to the 'build.gradle' file found in the 'service-a' folder and add the following piece of code under the dependencies:	 

 ```bash	 
 // https://mvnrepository.com/artifact/org.openapitools/openapi-generator	 
 implementation group: 'org.openapitools', name: 'openapi-generator', version: '5.2.0'	 
 ```	 

 You can find out more OpenAPI dependency code [here](https://mvnrepository.com/artifact/org.openapitools/openapi-generator/5.2.0). You can also find any other previous dependencies there.

 Stop the running instance, rebuild and re-run to allow compilation and re-running of the server. If you are using IntelliJ IDE, it will run background tasks to resolve the dependencies for you hence giving you easy coding time.

 Now, on your browser, add `/Swagger-ui` to the localhost URL to give you access to the local OpenAPI documentation viewer.	
 That is at `http://localhost:8080/swagger-ui`.	

 It should look as follows:	 
 
 ![local openapi viewer](/engineering-education/getting-hands-on-a-microprofile-project/local-openapi-viewer.png)	

 *(Screenshot by Author)*	 
 
 It is useful when you want to test input values, parameters, definitions, and output values. As for the Open Tracing capability, this is done using [Jaeger](https://www.jaegertracing.io/download/), head over to the links provided in the page or Readme.md file to configure it and run it.	 
 
 ### Conclusion	
 MicroProfile is used to set Microservices' standards used in Enterprises Java frameworks. It has several features and specifications, including but not limited to: Config, JWT Propagation, OpenApi, Health, Metrics, Fault Tolerance, Open Tracing, Restful Web services, JSON-B, JSON-P, Jakarta Annotations, and Jakarta CDI.	 

 Some servers used include:	Quarkus, Payara Micro, WildFly, Apache TomEE, Hammock, Open Liberty, Helidon, KumuluzEE, and ThornTail. Different versions have different features and specifications.	 

 This is the end of the tutorial, here is a brief summary of what we have learned:	 
 - What is MicroProfile?	 
 - How to initialize a MicroProfile project using the [microprofile initializer](http://start.microprofile.io) site, Visual Studio Code, and IntelliJ IDEA (Ultimate).	 
 - How to build the application microservices separately.	 
 - How to run the microprofile services separately in the development and operation mode.	 
 - How to view the OpenAPI documentation via an online Swagger OpenApi editor and locally by adding it as a dependency.	 

 ### Further reading
 - You can check out [this](https://dzone.com/articles/configuring-microservices-with-microprofile-and-ku) article on Configuring MicroProfile microservices on Kubernetes for more knowledge as you try to implement one.	 
 - Try building microprofile projects using Payara Micro, Open Liberty, and WildFly for more insights on the pros and cons and case usages for each.	 

 May you have success in your development!	 

 ### References	 
- [MicroProfile 4.1 documentation](https://download.eclipse.org/microprofile/microprofile-4.1/microprofile-spec-4.1.html)

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)


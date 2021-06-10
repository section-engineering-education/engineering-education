---
layout: engineering-education
status: publish
published: true
url: /introduction-to-grails-development-with-intellij/
title: Getting Started with Grails Java Framework
description: This article will go over Grails, which is Java and Groovy framework used when developing agile web applications. Grails implements the MVCS (Model, View, and Controller) design pattern.
author: sylvester-tamba
date: 2021-02-05T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-grails-development-with-intellij/hero.jpg
    alt: Grails Java Framework example image
---
In recent years, many developers have been using frameworks when developing websites. Frameworks help by making application deployment quicker and by ensuring quality code. Java provides multiplatform supports, this includes a desktop application, web application, mobile app development, and many more.
<!--more-->
The web applications can be embedded with JavaScript, HTML, CSS, and many front end applications.
### Introduction
**Grails** is Java and Groovy framework used when developing agile web applications. Grails implements the MVCS (Model, View, and Controller) design pattern.

Grails is superb because it allows developers to concentrate more on actual application requirements and spend less time configuring the framework. Grails provide tools for development, and it is built based on tools like: Quarts, Hibernate, Spring, and Gradle for library management.

There are many Grails framework versions being built that have the support of different libraries and tools.

### Prerequisites
- Have an [IntelliJ](https://www.jetbrains.com/idea/download/#section=linux) integrated development environment (IDE).
- Some basic knowledge in [Java](https://www.tutorialspoint.com/java/index.htm) development.
- Have [Java development kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk13-downloads.html) installed in your computer/laptop to help with the application development. In this case, we will use Java 11.

### Installing Grails
- Download the [Grails Framework](https://grails.org/download.html) as per the tutorial, we were at version 4.0.6, in which you will get a zipped file.
- Extract the zipped file and place it where you keep development tools. This is how we do a Windows [Unzip](https://www.windowscentral.com/how-zip-and-unzip-files-windows-10). Ubuntu [unzip](https://askubuntu.com/questions/499807/how-to-unzip-tgz-file-using-the-terminal).
- Set the environment variable `GRAILS_HOME` to point where the Grails installation directory is located. [Set windows environment variable](https://www.computerhope.com/issues/ch000549.htm).[ Set Ubuntu environment variable](https://askubuntu.com/questions/58814/how-do-i-add-environment-variables)


### Getting started
Grails provides a set of commands to support application development. IDE has also eased the use of commands and provided a way users can click menus for fast application development.

To create an application in the Grails framework, the `create-app` command can be executed in terminal or Windows CMD with arguments like the application's name.

The command below shows how to create an application via terminal or CMD. Open terminal or CMD in a directory where you want to save the application.

In this case, we have a folder called `Projects` in the document folder.

Navigate to `Projects` folder via the terminal.

```bash
#Ubuntu
cd C:\Users\user\Documents\Projects         
#Windows
cd C:\Users\user\Documents\Projects
```

Create the first application with the following command.
```bash
grails create-app Firstapp
```

![CREATE-APP](/engineering-education/introduction-to-grails-development-with-intellij/grails-create-app.png)

The Grails application is formed within the `Firstapp` directory, and one can execute many other grails commands.

To run the application run the following command.
```bash
grails run-app
```

The command will run the web application via a browser. You can type the highlighted command in the browser.

![CREATE-APP](/engineering-education/introduction-to-grails-development-with-intellij/grails-run-app.PNG)

![BROWSER VIEW](/engineering-education/introduction-to-grails-development-with-intellij/grails-first-web-app.PNG)

### Folder structure and directories
The grails application has the following folder structure.

```bash
├── .gradle
├── build
├── gradle
├── grails-app
├── src
├── .gitignore.txt
├── build.gradle
├── gradle
├── gradlew
├── gradlew.bat
├── grailsw
├── grailsw.bat
└── grails-wrapper
```

The `grails-app` has the following directories.

```bash
├── assets
├── conf
├── Controllers
├── domain
├── i18n
├── init
├── services
├── taglib
├── utils
└── views
```

### assets folder
This folder is where all static folders are kept, like Javascript, Images, CSS, and other static multimedia content.

### conf folder
This is where the configuration files reside, including resources.groovy, application.yml, logback.groovy, and any other configuration from plugins.

### controller folder
The folder contains Controllers, default UrlMapping.groovy, that control requests.

### domain folder
This is the folder where model classes are kept that are similar than database tables.

### i18n folder
The folder has resources for translation.

### init folder
The folder contains files related to when you need to launch the web application.

### services folder
All business logic is usually put under the service folder.

### taglib folder
This folder contains tags, and developers can add their own tags. Tags help in compressing GSP code since they help when re-using code.

### utils folder
In this folder, we can put utility Groovy classes.

### views folder
It contains GSP files, where HTML code is kept

### GRAILS MVC
MVC design patterns help in partitioning responsibilities in the application to simplify the architecture. Model classes represent domain objects in the system.

Controller classes control the flow of your application. Service classes handle the business logic in the application. Views artifacts are used to present information in a way desired.

### Creating a Domain Class
The command below adds an empty Domain Class.
```bash
grails create-domain-class Student
```

```groovy
package firstapp

class Student {

    static constraints = {
        }
    }

```

We can add attributes.

```groovy
package firstapp

class Student {
    String name
    String gender
    Date dateOfBirth
    Integer position
    static constraints = {
        }
    }

```

### Creating Controller Class
The below command adds an empty Controller Class.

```bash
grails create-controller Student
```

```groovy
package firstapp

class StudentController {

    def index() { }
    }

```

### Configure database
Database configuration is done in the application.yml to any database with any credentials needed. Within the file, any database can be connected, provided it has a JDBC driver.

```yaml
dataSource:
pooled: true
jmxExport: true
driverClassName: org.h2.Driver
username: sa
password: ''

environments:
development:
dataSource:
dbCreate: create-drop
url: jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE
test:
dataSource:
dbCreate: update
url: jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE
production:
dataSource:
dbCreate: none
url: jdbc:h2:./prodDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE
properties:
jmxEnabled: true
initialSize: 5
maxActive: 50
minIdle: 5
maxIdle: 25
maxWait: 10000
maxAge: 600000
timeBetweenEvictionRunsMillis: 5000
minEvictableIdleTimeMillis: 60000
validationQuery: SELECT 1
validationQueryTimeout: 3
validationInterval: 15000
testOnBorrow: true
testWhileIdle: true
testOnReturn: false
jdbcInterceptors: ConnectionState
defaultTransactionIsolation: 2 # TRANSACTION_READ_COMMITTED


```
### Generating views
The command below generates GSP views.

```bash
grails generate-all Student
```

The Student Controller Class will have many other functions in it. Run the grails application and access the following link `http://localhost:8080/student/index` in the browser.

The command also creates views in the views folder under the same object student.

The following views are created.

```bash
├── show.gsp
├── index.gsp
├── create.gsp
└── edit.gsp
```

Each view has its function. show.gsp is used to show a single object selected, index.gsp is used to display a list of items in the database, create.gsp provides a form when adding new items, and edit.gsp is used to edit any existing data.

The new view in the browser will look like the following.

![VIEWS](/engineering-education/introduction-to-grails-development-with-intellij/grails-views-data.PNG).

The same folder can be opened in Intellij and continue with fast coding. For any Class to be added, the developer needs to right-click on a given folder and create a Grails Class based on the Folder.

Any library that is not there can be added through build.gradle. Just like CMD/Terminal grails has a terminal window where one can do the grails command without coming to the main CMD/Terminal.

This how it looks in IntelliJ.

![INTELLIJ VIEW](/engineering-education/introduction-to-grails-development-with-intellij/grails-intellij-view.PNG).

For the source code check [here](https://github.com/tambastar/Grails-Firstapp).

### More details   
- [Grails](https://grails.org/)

### Conclusion
Congratulations, your fast grail app is successfully running. Grails Framework help by taking advantages of several tools and bringing them together.

In this article:
- We have installed the Grails framework.
- We have looked at Grails directories.
- We have created a Student Object Management.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

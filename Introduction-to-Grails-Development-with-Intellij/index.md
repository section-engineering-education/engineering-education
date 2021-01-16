### Getting Started with Grails Java Framework

In recent years, many developers are using frameworks when coming up with websites. Frameworks have assisted in making sure there is  faster application deployment and also coming up with quality code. Java supports multiple  multiplatform including a desktop application, web application, mobile app development, and many more. In the web application, it can be embedded with Javascript, HTML, CSS, and many front end applications.

### Introduction

**Grails** is Java and Groovy framework developing agile web applications. Grails implements MVCS (Model, View, and Controller) design pattern.

Grails is superb because it makes developers concentrate on application requirements and use less time in configuring the framework. Grails provides tools for development and it is build based on tools like  Quarts, Hibernate, Spring and uses Gradle for library management.

There are many Grails framework version being built which has the support of different libraries and tools

### Prerequisites

- IntelliJ integrated development environment(IDE)
- Knowledge in Java development
- Java development kit(JDK) installed in your computer/laptop to help in application development

### Installing Grails

- Download [Grail Framework](https://grails.org/download.html) as per the tutorial we were at version 4.0.6 in which you will get a zipped file.
- Extract the zipped file and place it where you keep development tools. This is how to do Windows [Unzip](https://www.windowscentral.com/how-zip-and-unzip-files-windows-10). Ubuntu [unzip](https://askubuntu.com/questions/499807/how-to-unzip-tgz-file-using-the-terminal)
- Set environment variable `GRAILS_HOME` to point where Grails installation directory is located. [Set windows environment variable](https://www.computerhope.com/issues/ch000549.htm).[ Set Ubuntu environment variable](https://askubuntu.com/questions/58814/how-do-i-add-environment-variables)

### Getting Started

Grails provides a set of commands to support application development.IDE has also easen the use of commands and provided a way users can click menus for fast application development.

To create an application in Grail framework `create-app` command can be passed in terminal or windows CMD with arguments like the name of the application.

The command below shows how to create an application via terminal or CMD. Open terminal or CMD in a directory where you want to save the application. In this case, we have a folder called `Projects` in the document folder

Navigate to `Projects` folder via terminal

```bash
#Ubuntu
cd C:\Users\user\Documents\Projects

#Windows
cd C:\Users\user\Documents\Projects
```

Create the first application with the following command

```bash
 grails create-app Firstapp
```

![CREATE-APP](/engineering-education/how-to-replicate-postgresql-database/grails-create-app.png)

The Grails application is formed within the  `Firstapp` directory and many other grails commands can be executed.

To run the application run the following command

```bash
grails run-app
```
The command will make the web application to run via a browser. You can type the highlighted command in the browser.

![CREATE-APP](/engineering-education/how-to-replicate-postgresql-database/grails-run-app.png).

![BROWSER VIEW](/engineering-education/how-to-replicate-postgresql-database/grails-first-web-app.png).

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

In `gails-app`  has  the following directories

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

This is where all static folders are kept like javascript, Images, CSS and other static multimedia content

### conf folder

This is where configuration files reside this includes resources.groovy, application.yml,logback.groovy, and any other configuration from plugins

### controller folder

The folder contains Controllers, default UrlMapping.groovy which control requests.

### domain folder

Where Groovy classes are kept that are similar to database tables.

### i18n folder

The folder has resources for translation.

### init folder

The folder contains files related to when you launch the web application.

### services folder

All business logic are usually put under the service folder

### taglib folder

This folder contains tags and developers can be able to add their own tags. Tags help in compressing GSP code since helps in the re-use of code

### utils folder

in this folder, we can put utility Groovy classes.

### views folder

it contains GSP files, where HTML code is kept


### GRAILS MVC

MVC design patterns help in partitioning responsibilities in the application to simplify the architecture. Model classes represent domain objects in the system. Controller classes control the flow of your application. Service classes control the business logic in the application. Views artifacts are to present information in a way desired.

### Adding more Classes in the `Firstapp` project

### Creating Domain Class

The below command adds an empty Domain Class

```bash

grails create-domain-class Student
```

```java
package firstapp

class Student {

    static constraints = {
    }
}

```

We can add attributes

```java
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

The below command adds an empty Controller Class

```bash
grails create-controller Student
```

```java
package firstapp

class StudentController {

    def index() { }
}

```

### Configure database

This is done in application.yml to any database with any credentials needed. Within the file, any database can be connected provide it has a JDBC driver.

```java
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

GSP views can be generated with the following command

```bash
grails generate-all Student
```

The Student Controller Class will have many other functions in it. Run the grails application and access the following link `http://localhost:8080/student/index` in the browser

The command also creates views in the views folder under the same object student. The following views are created

```
├── show.gsp
├── index.gsp
├── create.gsp
└── edit.gsp
```

Just as the views are each has its function. show.gsp is used to show a single object selected, index.gsp is used to show a list of objects in the database, create.gsp provide a form for adding new object and edit.gsp is used to edit an existing data.

The new view in the browser will look like the following.

![VIEWS](/engineering-education/how-to-replicate-postgresql-database/grails-views-data.png).

The same folder can be opened in Intellij and continue with fast coding. For any Class to be added the developer needs to  right-click on a given folder and create a Grails Class based on the Folder.

Any library that is not there can be added through build.gradle. Just like  CMD/Terminal grails has a terminal window where the grails command can be done without coming to the main CMD/Terminal.

How it looks in IntelliJ

![INTELLIJ VIEW](/engineering-education/how-to-replicate-postgresql-database/grails-intellij-view.PNG).

For the source code check [here](https://github.com/tambastar/Grails-Firstapp)

### Conclusion

Congratulations your fast grail app is successfully running. Grails Framework has helped by taking the advantages of several tools and bringing them together.

In this article;

- We have installed the Grails framework.
- We have looked at Grails directories.
- We have created a Student Object Management

# Multi-Module Project Setup in Spring Boot

A three-man organisation in 2019 grew to become a twelve-man team fourteen months later. The growth in team members was necessitated by the growth in the project. However, for them also came an increase in the cost of building, maintaining and scaling the project; they were running the microservices architecture.

In this tutorial, we will be going through the multi-module architecture - which is an drastic improvement on the monolith approach, yet offering as much possibilities of the microservices architecture, while evading the huge demands of microservices. We will be building a model of a hospital management system, taking into account some of the departments that make for a successful medical application.

## Table of contents
The tutorial will cover:
- Why is the multi-module approach better than the monolith
- Advantages of multi-module over microservices architecture
- Setting a Spring Boot multi-module project
- How can we make them interact with each other?
- Gaining the benefits of microservices architecture from the multi-module architecture
- Bonus
- Conclusion

## Prerequisites
To make the most of this tutorial, it is required to have:
•	Basic understanding of microservices.
•	Familiarity with the Spring Boot framework.
•	Good internet connection
•	Intellij code editor installed.

### Why is the multi-module better than monolith?
Traditional, monolith design puts all the services for a project in one singular module. Everything is housed in one big box just as they are. In multi-module, each service is compartmentalised before being placed in the big box; the project. Multi-module allows for code re-usability unlike monolith. Code maintenance and adding new features or functionality is much easier.

### Advantages of Multi-module over Microservices
No doubt, the microservices architecture is beneficial. However, in comparison with the multi-module architecture, it appears to have some short-comings. The first would be ensuring availability of services at optimal time. Because services in the microservices architecture are deployed separately, it means that a downtime in one service could cripple an entire organisation, depending on how many services depend on it. Also, passing around dependencies can be tricky. For large teams and projects, this can be challenging. With the multi-module architecture, services are still developed individually but within a mother project that caters to all of them. Therefore, interest is not necessarily spread across several services but is channelled to the mother project and by extension, the child services. As a result, multi-module projects are easier to maintain than microservices.

### Actual Setup of a Multi-Module project
Now we go through the process of setting up a Spring Boot multi-module project. We will mimic a small hospital management system and see how different departments will interact in terms of services. To build this, we would need some services, say `Doctor Service`, `Patient Service`, `Consultation Service`. while these can co-exist in separate modules according to their name, we will create modules as recommended the spring way – data, service and controller modules - all together in the same project - `demohospital`. The method for creating these four modules can be used to create as many as are needed in the project.
![Multi Module in Picture](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/picone.jpg)

To begin, fire up your Intellij code editor. If you have an project already open, click `file > new > project` and if this is your first time, click `New Project`.
![Project setup](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/startproject.jpg)

On the resulting modal form, select Spring Initializr on the left side, fill in the form like below and click next:
![Spring Initializr](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/springstart.jpg)

On the next page, select the dependencies you want available for all modules in the project. For this project, I have chosen the `Spring Web` and `Lombok` dependencies. You can add as much as you might need. Note that, each module should have dependencies specific to them installed in their various `pom.xml` files. Click next after selecting dependencies. You can either choose to open on the same window, thereby replacing the present open project or open in another window
![Continue Project](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/springstart1.jpg)

Now, we can see the project open and the dependencies we selected, displayed in the `pom.xml` file.
![Pom File](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/parentpom.jpg)
![Landing Page](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/landing.jpg)

Time for creating modules. First the data module. This module houses the entities for the project and the interfaces (JPA Repositories) that allow us interact seamlessly with out database, MySQL in this case. To create the first module, right click on the project name `demohospital` and click `New` > `Module`.
On the resulting modal form, select `Maven` and click `Next`.

![Setting up](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/settingup.jpg)

Type in a Name (this will be the name of the module – in this case, `data`), leave `Location` as is and click `Finish`. Spring Boot does the rest for you.

![Data](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/data.jpg)

A `data` module has been created by you.

![Data Two](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/datatwo.jpg)

Following the same approach, let us create the `Service` and `Controller` modules. Right-click on the project name, click `New` > `Module`. Select `Maven`, type in a Name (this time, it would be `Service`), select `Finish`. You now have a `Service` module.

![Service](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/service.jpg)

The exact same approach for the `controller` module, as shown in the picture below

![Controller](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/controller.jpg)

As it is now, the services needed by the hospital can be created in each of these modueles and written to interact with one another.

### How can we make them interact with each other?
As mentioned earlier, the data module holds the models and database operations for the entities, the services houses the implementations of the entities and the controller is the entry point into the project, where the endpoints are created. To make the methods of a module available for another (for instance, to make `data` module methods available to `service` module), simply paste the following in the `pom.xml` file of the `service` module and install it:

```java
<dependency
    <groupId>project</groupId
    <artifactId>data</artifactId
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
That is all you have to do. Now `service` can use all the methods in `data` easily. You can also pass the `service` module into the `controller` module this same way.
Please note that since `service` depends on `data`, `data` cannot depend on `service` or you would get a `circular dependency error`, which I will treat in the next article – solving it.

You basically know how to create a multi-module project now. If the hospital needed to send mails to patients and doctors, they would need a notification service. Let us create one for them and make it available for the `service` module to use. Right-click on the project name, click `New` > `Module`. Select `Maven`, type in a group ID and an artefact ID (this time, it would be `notification`), select `Next` and then `Finish`. You have created the `Notification` module. Pass it to the `service` module by pasting it as a dependency in the `pom.xml` file of the `service` module. Now they can send emails and text messages and other notifications.

```java
<dependency
    <groupId>project</groupId
    <artifactId>notification</artifactId
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
![Payment](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/payment.jpg)

## Bonus
Let us imagine that a `Payment Service` is to be implemented into the Hospital management System later. This is very simple and straightforward. Open the project, right click on the project name; `hospital-project` in this case, click on `project` and then `module`. Enter the details of this new module to conform with the structure we used for the existing modules in the project, install it as a dependency in any or all of the other modules that need its methods and viola, you have a new module in your project. You can try to create a `Logistics Service` to represent the logistic department of the hospital.

![Bonus](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/bonus.jpg)



## Gaining the benefits of microservices architecture from the multi-module architecture
To enjoy what microservices offer while using multi-module architecture is simple. This means that you can copy out the jar file of any of the modules/services above – say Payment Service for instance – and deploy it into another entirely different project, for reuse. All you need to do is to write `<packagin>jar</packaging>`in the POM file of the module you want to resuse as jar – ideally, in all the modules. Spring Boot automatically does the rest for you. Now you can reuse that modules anywhere else.

One interesting thing to note is that, if there is an issue in any of the module, you can simply go to that module, fix up the issue and rebuild is as an independent jar, without interfering with the other modules

![Packaging](/engineering-education/building-Scalable-projects-using-the-multi-module-architecture-with-spring-boot-and-maven/packaging.jpg)



## Conclusion
Using the multi-module architecture is more convenient. You have separation of interests and still, a lot of control of the project in one place. Recognising a system downtime and fixing it is faster, and scalability is guaranteed.

This project can be found on the [Github link](https://github.com/teevyne/multi-module-setup)

Thank you and enjoy building.

---
layout: engineering-education
status: publish
published: true
url: /twilio-api-whatsapp-spring-boot/
title: Building a Dictionary Application using Twilio API and WhatsApp
description: This tutorial will walk the reader through how to integrate the WhatsApp API with Spring Boot to build a dictionary application using the Twilio API.
author: quinter-awuor
date: 2022-01-04T00:00:00-12:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/twilio-api-whatsapp-spring-boot/hero.png
    alt: Building a dictionary application using Twilio API and WhatsApp Hero image
---
Whatsapp is one of the most popular messaging app in the world. It is used by millions of people worldwide, meaning that if we integrate our web applications with WhatsApp, we may have a massive amount of users at our disposal.
<!--more-->
Twilio is a cloud-based messaging platform that will help us integrate our web application with WhatsApp.
### Introduction
This tutorial will teach how to integrate WhatsApp API with a Spring Boot web application by building a dictionary application.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Application setup](#application-setup)
  - [Model layer](#model-layer)
  - [Repository layer](#repository-layer)
  - [Service layer](#service-layer)
- [Controller layer](#controller-layer)
  - [Configuration layer](#configuration-layer)
  - [Database setup](#database-setup)
- [Twillio Account setup](#twillio-account-setup)
- [Ngrok setup](#ngrok-setup)
- [Testing](#testing)
- [Conclusion](#conclusion)
  
### Prerequisites
To follow along the reader will need:
1. Java Developer Kit [JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed on your machine.
2. Knowledge of [Spring Boot](https://spring.io/guides/gs/spring-boot/).
3. A [Twillio](https://www.twilio.com/docs/libraries/java) account.
4. [MySQL](https://www.mysql.com/) installed on your machine.

### Application setup
1. Navigate to [spring initializr](https://start.spring.io/).
2. Input the project name as `dictionary`.
3. Add `mysql`, `spring-web`, `spring-data-jpa` and `lombok` as project dependencies.
4. Click on generate to download the boilerplate project code as a compressed file.
5. Extract the compressed file downloaded in the previous step.
6. Open the project in your favorite IDE.

In the `pom.xml` file, add the following dependency to the `dependencies` section:
```xml
    <dependency>
        <groupId>com.twilio.sdk</groupId>
        <artifactId>twilio</artifactId>
        <version>8.23.0</version>
        <scope>compile</scope>
    </dependency>
```

The above dependency will enable us to connect to Twilio to send and receive a message in our application.

#### Model layer
1. In the root application package, create a new package named `model`.
2. In the package created above, create a new Java class named `Definition` and update it with the following code snippet:

```java
package com.example.dictionary.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "dictionary")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Definition {
    @Id
    @Column(name = "def", nullable = false)
    private String def;

    @Column(name = "word", nullable = false)
    private String name;
}

```

- Spring Boot entities are mapped to tables in the database. The `@Entity` annotation indicates that this class is an entity and the `@Table` annotation indicates that the table name is `dictionary`.

- `@NoArgsConstructor` and `@AllArgsConstructor` annotations are used to create a constructor with no arguments and a constructor with all arguments, respectively.
  
- `@Data` annotation is used to generate getters and setters for the fields.
  
- @Column annotation is used to indicate that the field is mapped to a column with the specified name in the database.

#### Repository layer
Spring Data JPA makes it possible to create database queries from the repository.
1. In the root application package, create a new package named `repository`.
2. In the package created above, create a new interface named `DictionaryReposiotory` and update it will the following code snippet:
```java
package com.example.dictionary.repository;

import com.example.dictionary.model.Definition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DictionaryRepository extends JpaRepository<Definition, String> {
    Optional<List<Definition>> findByName(String name);
}

```

- `@Repository` annotation is used to indicate that this interface is a repository.
- The `findByName` method is used to find all the definitions for a word. The function returns an Optional type since the result can return null. If a user searches for a word that does not exist in the dictionary, a null is returned.
  
#### Service layer
The service layer will handle sending back the response to the user with the definition of the word they searched for.
1. In the root application package, create a new package named `service`.
2. In the service package, create a new class named `DictionaryService` and update it with the following code snippet:
```java
package com.example.dictionary.service;

import com.example.dictionary.model.Definition;
import com.example.dictionary.repository.DictionaryRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DictionaryService {
    public static final String ACCOUNT_SID = "ACda8b1bb661d4926171cfa09326f7daac";
    public static final String AUTH_TOKEN = "0d667f37cdcd2dc6758b2b3e03d99631";
    private final DictionaryRepository repository;

    public DictionaryService(DictionaryRepository repository) {
        this.repository = repository;
    }


    public void sendReply(String from, String to, String text) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        List<Definition> defs = repository.findByName(text)
                .orElseThrow(() -> new IllegalStateException("No item found"));
        Message message = Message.creator(
                        new com.twilio.type.PhoneNumber(from),
                        new com.twilio.type.PhoneNumber(to),
                        defs.toString())
                .create();

        System.out.println(defs);
    }
}
```

- The `@Service` annotation is used to indicate that this class is a service.
- The `sendReply` method is used to send a reply to the user throught the Twilio API.

### Controller layer
1. In the root project package, create a new package named `controller`.
2. In the `controller` package created above, create a new Java class named `DictionaryController` and update it will the following code snippet:
```java
package com.example.dictionary.controller;

import com.example.dictionary.service.DictionaryService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dictionary")
@AllArgsConstructor
public class DictionaryController {
    private final DictionaryService service;

    @PostMapping(consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public void getMessage(@RequestParam("From") String From, @RequestParam("To") String To, @RequestParam("Body") String Body) {
        System.out.println("From: " + From + " To: " + To + " Message: " + Body);
        service.sendReply(From, To, Body);
    }
}
```

- The `@RestController` annotation marks this class as a Spring Boot Controller class that will handle REST HTTP requests.
- The `@RequestMapping("/api/v1/dictionary")` annotation sets the base path to our API to `/api/v1/dictionary`.
- The ` @PostMapping(consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})` annotation indicates that the annotated method will handle POST requests. `MediaType.APPLICATION_FORM_URLENCODED_VALUE` indicates that data expected in the POST request is form data. Twillio sends form data to our application with the message and sender details whenever a message is sent to our WhatsApp API.
  
#### Configuration layer
We need to configure our application to connect to a MySQL database to retrive words and their definitions from the database. 

In the `application.properties` file, add the following lines:
```java
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mysql://localhost:3306/dictionary # MySQL database URL
spring.datasource.username=paul #MySQL username
spring.datasource.password=37119787 #MySQL password
server.port=8081 #Port on which our application will run
```

#### Database setup
1. On the Mysql database management system installed on your machine, create a `dictionary` database.
2. Import the data in the [data.sql](https://replit.com/@qawuor/dictionay-app#data.sql) file into the data above. This will create a dictionary table and insert all the word and definitions data required by our application.
   
### Twillio account setup
- Navigate to the [Twilio dashboard](https://www.twilio.com/console) and create a new account.
- Create a new Twilio phone number.
- Create a new Twilio API key and Secret key.
- Update the `ACCOUNT_SID` and `AUTH_TOKEN` variables in the `DictionaryService` class with the values you created in the Twilio dashboard.

### Ngrok setup
Since we will need to expose our application endpoints so that Twilio can forward all incoming messages to our application, we will need to install [Ngrok](https://ngrok.com/).

Ngrok exposes a local development environment to the internet. This makes it possible for users on the internet and other applications to interact with our application. Once Ngrok is installed on your machine, execute the command below to expose our local development environment to the internet.

```bash
ngrok http 8081
```

If the Ngrok is installed correctly, you will see the following output:

```bash
                                                                                  
Session Status                online                                              
Account                       username (Plan: Free)                          
Version                       2.3.40                                              
Region                        United States (us)                                  
Web Interface                 http://127.0.0.1:4040                               
Forwarding                    http://41c3-102-220-12-234.ngrok.io -> http://localhost:8081
Forwarding                    https://41c3-102-220-12-234.ngrok.io -> http://localhost:8081
                                                                                  
Connections                   ttl     opn     rt1     rt5     p50     p90         
                              21      0       0.00    0.00    44.37   62.95 
```

### Testing
On your WhatsApp application, register your phone number by sending a message to the Twilio number you created in the Twilio dashboard. Once your account is registered, you can send a message to get its definition with the word you want.

![Sample Message](/engineering-education/twilio-api-whatsapp-spring-boot/sample.png)

### Conclusion
Now that you learned how to use Twillio WhatsApp API in a Spring Boot application try creating a simple music lyric search application using the skills gained from this tutorial. You can find the code for this tutorial in the [GitHub repository](https://replit.com/@qawuor/dictionay-app#).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

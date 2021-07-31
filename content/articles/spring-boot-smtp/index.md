---
layout: engineering-education
status: publish
published: true
url: /spring-boot-smtp/
title: Getting started with Spring Boot SMTP
description: This tutorial will go over the configurations of the Gmail SMTP server and how to send emails from a Spring Boot application.
author: quinter-awuor
date: 2021-03-22T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-smtp/hero.jpg
    alt: Spring Boot SMTP example image
---
### Spring Boot SMTP
Simple mail transfer protocol (SMTP) is a standard communication protocol that transfers mail electronically. SMTP makes it possible to send mail messages from within applications. In this tutorial, we will be using SMTP with Spring Boot to send mail messages from our application.

### Prerequisites
Before we begin its important to have the following:
1. [Java developer kit](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
2. Basic knowledge of [Spring Boot](https://spring.io/projects/spring-boot).
3. IDE of your choice installed. I will be using [Intellij IDEA](https://www.jetbrains.com/idea/download/).

### Creating the project
We are going to use [spring initializr](https://start.spring.io/) to bootstrap our application. 
- Navigate to [spring initializr](https://start.spring.io/) on your browser and set the project name as `sendmail`.
- Add `spring web`, `spring mail`, and `spring devtools` as the required dependencies.
- Click on generate the project to download the project zip file.
- Unzip the project file downloaded and open it in your favorite IDE.
- Sync the dependencies with maven.

The `pom.xml` file should contain the dependencies shown in the code snippet below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.queenter</groupId>
    <artifactId>sendmail</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>sendmail</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>11</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

### Mail configurations
Now that we have set up the project, add the following configurations into the `applications. properties` file in the resources directory.

```bash
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=email-address
spring.mail.password=email-password
# Other smtp properties
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000
# TLS port 587
spring.mail.properties.mail.smtp.starttls.enable=true
```

Replace the `email-address and email password` with your actual email address and password.

For the configurations above to work in our applications, we must set up Gmail to allow connections from less secure apps.
- On your Gmail account, click on `manage account`.
- On the `manage account` screen click on the `security` menu item and select `turn on access to less secure apps` as shown below.

![Turning on access to less secure apps](/engineering-education/spring-boot-smtp/google-auth.png)

### Domain layer
Since we are going to create a simple API endpoint that allows users to request with the mail message, recipient, and the subject of the mail, we are going to create a POJO for the mail.

1. In the root package, create a package with the name `domain`.
2. In the package created above create a Java class with the name `Mail` and add the code snippet below into it.

```java
public class Mail {
    private String recipient;
    private String subject;
    private String message;

    public Mail() {
    }

    public Mail(String recipient, String subject, String message) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

### Service layer
The service layer often contains the actual business logic for an application. In this layer, we will implement the logic used to send an actual email to the recipients provided.

1. In the root application package, create a new package with the name `service`.
2. Create an interface with the name `SendMailService` and add the code snippet below.

>**Note** -  Interfaces make it possible to provide several implementations of a given functionality i.e we can create Gmail and SendGrid SMTP implementations of the `SendMailService`.

```java
import javax.mail.MessagingException;

public interface SendMailService {
    void sendMail(Mail mail);

    void sendMailWithAttachments(Mail mail) throws MessagingException;
}

```

3. In the service package, create a Java class implementation for the `SendMailService` interface with the code snippet below.
   
```java
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class SendMailServiceImpl implements SendMailService {
    private final JavaMailSender javaMailSender;

    public SendMailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendMail(Mail mail) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(mail.getRecipient(), mail.getRecipient());

        msg.setSubject(mail.getSubject());
        msg.setText(mail.getMessage());

        javaMailSender.send(msg);
    }

    @Override
    public void sendMailWithAttachments(Mail mail) throws MessagingException {
        MimeMessage msg = javaMailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(msg, true);

        helper.setTo("to_@email");

        helper.setSubject("Testing from Spring Boot");

        helper.setText("Find the attached image", true);

        helper.addAttachment("hero.jpg", new ClassPathResource("hero.jpg"));

        javaMailSender.send(msg);
    }
}
```

From the code snippets above, we have two functions that send emails. The first function sends a plain text email while the second function sends an email with an attachment.

### Controller layer
1. In the projects root package, create a package named `controller`.
2. Create a Java class named `EmailController` with the code snippet below.

```java
import com.queenter.sendmail.domain.Mail;
import com.queenter.sendmail.service.SendMailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api/v1/mail/")
public class EmailController {
    SendMailService service;

    public EmailController(SendMailService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMail(@RequestBody Mail mail) {
        service.sendMail(mail);
        return new ResponseEntity<>("Email Sent successfully", HttpStatus.OK);
    }

    @PostMapping("/attachment")
    public ResponseEntity<String> sendAttachmentEmail(@RequestBody Mail mail) throws MessagingException {
        service.sendMailWithAttachments(mail);
        return new ResponseEntity<>("Attachment mail sent successfully", HttpStatus.OK);
    }
}

```

From the code snippet above, both functions receive a request body containing the details of the email to be sent and the response is a `ResponseEntity` of the string type with information on whether the email was sent successfully or not.

### Conclusion
Now that you have learned how to configure and send emails in a Spring Boot application, try sending an email with an HTML body and CSS styling.

Happy coding.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

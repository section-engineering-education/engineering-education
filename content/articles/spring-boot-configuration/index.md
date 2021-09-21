---
layout: engineering-education
status: publish
published: true
url: /spring-boot-configuration/
title: Spring Boot Basic Configuration
description: In software development, many changes take place depending on the stage your team is at. This article will look at some of the strategies Spring Boot provides us to deal with this challenge. We will look at how to change environments, extract environment variables, and more.
author: john-amiscaray
date: 2021-09-21T00:00:00-02:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-configuration/hero.png
    alt: Spring Boot Configuration Hero Image
---
In software development, many changes take place depending on the stage your team is at. For example, you may need to change from a test database to a production-ready database. Whatever it is, the environment where your code runs changes, and so does your configuration.
<!--more-->
In this guide, we will look at some of the strategies Spring Boot provides us to deal with this challenge. We will look at how to change environments, extract environment variables, and more.

By the end of this article, you will be more equipped to deal with spring boot configuration challenges.

### Table of Contents
- [What are profiles?](#what-are-profiles)
- [Using configuration files](#using-configuration-files)
- [Using the Value annotation](#using-the-value-annotation)
- [Using the ConfigurationProperties annotation](#using-the-configurationproperties-annotation)
- [Using profiles within your code](#using-profiles-within-your-code)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this article, you need to have:
- Basic knowledge of Spring Boot (i.e. beans, services, dependency injection)
- Java fundamentals
- Packaging and running jar files (optional but recommended)

### What are profiles?
When talking about environment configuration, it is essential to understand what profiles are. A profile in Spring is the name of the environment in which you want to run your application.

The names for your profiles can be whatever you want and can represent any environment you want. Two prevalent ones would be a development and production environment.

Using the profile, we can change certain configuration variables to suit the environment. By default, your Spring Boot application will have a profile of **default**. This, of course, can be overridden to suit your needs.

#### Setting the profile
To set the profile, you add a command-line argument when you package or run the `jar` file. This command-line argument is named `Dspring.profiles.active`, and the value should be the profile you want to use.

For example, if you want to run your `jar` with a profile of **prod**, you would run a command like so:

```bash
java -jar -Dspring.profiles.active=prod my-project-0.0.1-SNAPSHOT.jar
```

If you want to run your application from IntelliJ, you can set the active profile in your run configurations. You would first click **run**, then **edit configurations**, you should see an input to set your VM options:

![run-config](/engineering-education/spring-boot-configuration/run-config.png)

Here, you can add the command argument above. If you are using IntelliJ Ultimate, there should be a separate input field to put the profiles.

> Note: you can set multiple profiles when running your application. For the sake of simplicity, we will only use one profile at a time throughout this guide.

### Using configuration files
#### Profile specific configuration files
Now that we know how to set the profile, how can we take advantage of this?

Spring Boot allows us to override values in our config file based on the profile.

To do this, you would create a new properties file at the exact location as the `application.properties` file. These files need to follow this specific naming convention to distinguish between profiles:

```bash
application-{profile}.properties
```

Properties in these files will override your `application.properties` if the profile is active. In a **dev** profile, `application-dev.properties` will override common properties in `application.properties`.

Note that we can put custom properties in these files so that we can use them in our code. It is not restricted to the built-in properties you are used to seeing. We will be going over how to do this later.

#### Hiding sensitive properties
Let's say you were creating an `application-prod.properties` file. This, of course, would contain properties for your production-ready application. These details should be private since they deal with actual databases or secret keys.

How then could we take the proper measures to secure this data?

One great way to achieve this is by injecting system variables into your config files. When you install Java, you have to go through the process of setting a system variable called **JAVA_HOME**. This variable stores the folder location of your JDK.

System variables like these can be injected into your config files like so:

```bash
test.property=${JAVA_HOME}
```

Using this, you can set sensitive data as system variables on the device running your server.

For example, if you are hosting your app using Heroku, they will give you the option to set system variables called **config vars**. This has the added benefit of being easily changed later.

#### External configuration
Let's say you packaged a production-ready application into a jar. Out of nowhere, you realize you needed to change a property in your config file.

You then realize that this file was also packaged into the jar, which would require you to unzip said jar. How could you make changes to the configuration file without restarting the server?

Spring Boot provides a simple solution to this problem using externalized configuration. All you need to do is create a new config file in the same directory as your jar file. You can use this new config file to override any configuration inside the jar.

Note that your command line needs to be pointing to the folder your jar is in when running the jar in this case. I believe this is because it looks at the current directory you are at for the externalized configuration.

### Using the Value annotation
You may be wondering, how can we use the values in our configuration files? Spring Boot provides us with a few strategies to do this.

Using the `@Value` annotation, we can inject values from our config files into fields in a bean. To do this, we would use the following pattern:

```Java
package me.john.amiscaray.demo.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // Inject the test.property variable above into the javaHome field.
    @Value("${test.property}")
    private String javaHome;

    @GetMapping("/")
    public String test(){

        return javaHome;

    }

}
```

Notice how we wrap the property name in curly brackets with a dollar sign preceding it. If we don't do so, it will inject the string literal into the field and not the `test.property` variable.

If you were to send a **GET** request to the root URL, you should see the location of your JDK.

### Using the ConfigurationProperties annotation
Another way to extract your config variables is through the `@ConfigurationProperties` annotation. This annotation allows you to inject every configuration variable with a specific prefix into a bean.

Say you had an `application.properties` file like this:

```bash
app.property.name=My cool app
app.property.creator=John Amiscaray
app.property.version=5.9.0
```

With the annotation, you can create a bean that contains all these values like so:

```Java
package me.john.amiscaray.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

// Make this a bean using the @Configuration annotation.
@Configuration
// Try to extract all the config variables with the prefix "app.property" into the fields here.
@ConfigurationProperties("app.property")
public class AppProperties {

    private String name;
    private String creator;
    private String version;

    // Getters and setters below.

}
```

Here, we first declare our class as a bean using the `@Configuration` annotation. We then use the `@ConfigurationProperties` annotation with the value _app.property_. This specifies that we want to get any properties with that prefix.

We then declare fields that match the names of our config variables.

Those variables being the ones with the given prefix. With that, Spring will inject the values _My cool app_, _John Amiscaray_, and _5.9.0_ into the name, creator, and version fields, respectively.

### Using profiles within your code
So far, we have looked at how to set config variables based on your profile and extract them in your code.

We will now take a look at how you can change behaviors within your code based on the profile you are in. I have rarely found good use cases for this, but it can be helpful when the time comes.

#### Using the Profile annotation
You can use the `@Profile` annotation to have certain beans active; depending on the profile. To illustrate this point, take the following example.

> Note: I would not recommend using the following architecture. I'm using this architecture just as an easy example.

Let's say you had the following interface:

```Java
package me.john.amiscaray.demo.config;

public interface AppEnvironment {

    String getJWTSecret();
    String getClientUrl();

}
```

You could implement it for a **dev** environment like so:

```Java
@Profile("dev")
@Configuration
public class DevEnvironment implements AppEnvironment{

    @Override
    public String getJWTSecret() {
        return "secret";
    }

    @Override
    public String getClientUrl() {
        return "http://localhost:8100";
    }

}
```

Along with one for a **prod** environment:

```java
package me.john.amiscaray.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("prod")
@Configuration
public class ProdEnvironment implements AppEnvironment{

    @Override
    public String getJWTSecret() {
        return "this is a more secure secret you'll never guess";
    }

    @Override
    public String getClientUrl() {
        return "Some URL";
    }

}
```

From there, you could inject an object of type `AppEnvironment` into your Spring beans. If the profile is **dev**, it will use the first class; for a **prod** profile, it will use the second one.

This same approach can be made using methods annotated with `@Bean`. This is possible since `@Profile` also works on methods with the `@Bean` annotation.

As I said earlier, I would be against using an architecture like this. I would instead use the `@ConfigurationProperties` annotation along with profile-specific config files.

This way, we can use an externalized configuration for future flexibility. We could even shorten this to one class using some profile-specific config files in this new approach.

#### Using the environment bean
Spring Boot also provides a pre-made bean of type `Environment` for you. This bean can be used to find the active profiles and get config variables.

I have rarely used this bean since there are better ways to get config variables. I have also scarcely found myself needing to know within my code what environment I am in.

As such, we won’t go into much detail about this class, especially since you can easily read the documentation.

There was, however, one small use case I found for this bean.

For a particular service I was creating, I made a list only accessible within the class. Although for testing, I wanted to be able to alter and view the state of that list.

As a solution, I used the environment bean like so:

```Java
package me.john.amiscaray.demo.service;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ExampleService {

    private final Environment environment;
    private final List<String> privateList = new ArrayList<>();

    public ExampleService(Environment environment){
        this.environment = environment;
    }

    /**
    * Returns the list for testing purposes. If not in the test environment, throw an exception.
    * @return the private list
    * @throws IllegalAccessException if called in a non-test environment
    */
    public List<String> getPrivateList() throws IllegalAccessException {
        if(!Arrays.asList(environment.getActiveProfiles()).contains("test")){
            throw new IllegalAccessException("This is only available in test environments");
        }
        return privateList;
    }

}
```

Overall, while not that useful, it can be handy to know this bean exists for small use cases like this.

### Conclusion
In this guide, we looked at configuring your Spring Boot application to handle changes in environments. We looked at how Spring Boot represents environments (as profiles) and ways to change your app’s behavior based on it.

With this, you can start creating more brilliant, more reusable applications using Spring Boot.

Happy coding!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

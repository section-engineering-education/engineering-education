---
layout: engineering-education
status: publish
published: true
url: /spring-boot-rest-template/
title: Getting Started with Spring Boot RestTemplate
description: This tutorial will go over the basics of Spring Boot RestTemplate, how to integrate with Spring Boot and consume RESTful web services.
author: elizabeth-akinyi
date: 2021-06-02T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-rest-template/hero.jpg
    alt: Getting Started with Spring Boot RestTemplate
---
Consuming RESTful web services requires a lot of boilerplate code. Spring Boot REST template was created to simplify REST services consumption in a Spring Boot application.
 <!--more-->
### Getting started with Spring Boot RestTemplate
In this tutorial, we are going to create a Spring Boot application that consumes the [json placeholder](https://jsonplaceholder.typicode.com/posts) API.

### Table of contents
- [Table of contents](#table-of-contents)
- [Getting started with Spring Boot RestTemplate](#getting-started-with-spring-boot-resttemplate)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
  - [Application layer](#application-layer)
  - [Domain layer](#domain-layer)
  - [Controller layer](#controller-layer)
  - [Testing the endpoints](#testing-the-endpoints)
- [Conclusion](#conclusion)

### Prerequisites
1. [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
2. An IDE. I use [Intelij IDEA](https://www.jetbrains.com/idea/promo/?gclid=CjwKCAjwtdeFBhBAEiwAKOIy53VpyHjaRAKTPawL_snUuQ3whe9loukEM8zCPNBUUERCH7PqxklNnxoCg1sQAvD_BwE).
3. [PostMan](https://www.postman.com/) for testing the API calls.
   
### Project setup
We are going to use [spring initializr](https://start.spring.io/) to bootstrap our application.
- Visit [spring initializr](https://start.spring.io/), input the project name as `RestTemplate`.
- Add `Spring Web` and `Lombok` as project dependencies.
- Click on generate project button to download the project boilerplate code as a zip file.
- Extract the zip file and open the uncompressed file in your favorite IDE. 

#### Application layer
In the `RestTemplateApplication.java` file update the code snippets as shown below. 

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class RestTemplateApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestTemplateApplication.class, args);
    }

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}

```

In the code snippet above, we are injecting the `getRestTemplate()` function into our application as a `Bean`.

#### Domain layer
In the root project directory, create a new package named `domain`. Create a new java class file named `Post` and add the code snippet below.

```java
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Post {
    @JsonProperty("userId")
    int userId;
    @JsonProperty("id")
    int id;
    @JsonProperty("title")
    String title;
    @JsonProperty("body")
    String body;
}

```
- `@AllArgsConstructor` - is a Lombok annotation that generates a constructor with all the member variables for the `Post` class.
- `@NoArgsConstructor` - is a Lombok annotation that generates an empty constructor for the `Post` class.
- `@Data` - annotation generates `getters` and `setters` for the member variables of the `Post class`.

#### Controller layer
- In the root project directory, create a package named `controllers`.
- In the `controllers` directory we have created above, create a java class named `RestConsumer` and add the code snippets below.
   
```java
import com.example.resttemplate.domain.Post;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RestConsumer {
    RestTemplate restTemplate;

    public RestConsumer(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RequestMapping(value = "/posts")
    public Post[] getProductList() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        return restTemplate.exchange("https://jsonplaceholder.typicode.com/posts", HttpMethod.GET, entity, Post[].class).getBody();
    }

    @RequestMapping(value = "/posts")
    public String createPost(@RequestBody Post post) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<Post> entity = new HttpEntity<Post>(post, httpHeaders);
        return restTemplate.exchange("https://jsonplaceholder.typicode.com/posts", HttpMethod.POST, entity, String.class).getBody();

    }

    @RequestMapping(value = "/posts/{id}")
    public String updatePost(@PathVariable("id") int id, @RequestBody Post post) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<Post> entity = new HttpEntity<>(post, httpHeaders);
        return restTemplate.exchange("https://jsonplaceholder.typicode.com/posts/" + id, HttpMethod.PUT, entity, String.class).getBody();
    }

    @RequestMapping(value = "/posts/{id}")
    public String deletePost(@PathVariable("id") int id) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        return restTemplate.exchange("https://jsonplaceholder.typicode.com/posts/" + id, HttpMethod.DELETE, entity, String.class).getBody();
    }

}

```

- `@RestController` - marks `RestConsumer` class as a RestController. Spring Boot Rest controllers handle the incoming and outgoing HTTP requests.
- ` RestTemplate ` is injected through the constructor of the `RestController` class. Spring Boot 5.0 and later, encourages constructor injection rather than field injection.
- ` @RequestMapping()` - adds the path from which the resource can be accessed.
- `getProductList()` function gets all the `post` from the [json placeholder](https://jsonplaceholder.typicode.com/posts/).
- RestTemplate take in 4 parameters:
    1. URL - the endpoint from which we can access the resource.
    2. HTTP Method - HTTP method used to access the resource, i.e GET, POST, DELETE and PUT.
    3. Entity - HTTP Entity containing the headers and the data to be sent i.e in POST and PUT requests.
    4. Data class - A java class representing the data being transmitted, i.e in our POST request we are transmitting a POST while in our DELETE request we are receiving String as a response.
- `httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));` sets the data type to be transmitted to `JSON` only.
    
#### Testing the endpoints

**GET request**

![GET request](/engineering-education/spring-boot-rest-template/get-todos.png)

**POST request**

![POST request](/engineering-education/spring-boot-rest-template/create-todo.png)

**PUT request**

![PUT request](/engineering-education/spring-boot-rest-template/update-todo.png)

**DELETE request**

![DELETE request](/engineering-education/spring-boot-rest-template/delete-todo.png)

### Conclusion
Now that you have learned how to consume RESTful web services through Spring Boot Rest template, create a Spring Boot application that exposes its services through REST endpoints and Consume the endpoints from another Spring Boot application. 

You can find the complete source code for the application [here](https://replit.com/@elizabeth962/RestTemplate#).

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

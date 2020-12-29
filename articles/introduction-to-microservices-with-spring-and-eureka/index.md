title: Introduction to Microservices with Spring and Eureka

description: A beginner's guide to microservices both in theory and in practice

###Introduction:

With web apps becoming more complex, more of them have been making use of microservices. But what exactly are microservices? What benefits does developing in this style give? This article seeks to give you the answer to these questions. By the end of this guide, you will gain a solid understanding of this style of development. As a bonus, we will also cover a simple practical implementation of this architecture.

###Prerequisites:

This guide assumes you understand the traditional architecture of full-stack web applications. As well, for the practical implementation, I will be coding in Java with Spring and Eureka. To follow along, you would need some experience with Spring boot. If you don’t have any experience with Spring boot you may choose to skip this section of the article.

###What are Microservices?

Let’s say you have a backend for an e-commerce website. In that backend, you have different functionalities that make up that entire application. For example, you might have services for shopping, managing accounts, and even advertisements. Normally, you would put all these into a single codebase and organize them into modules. This single codebase would be for a single server the front-end sends requests to. This traditional approach to development is called monolithic architecture. Development in this style, while simple to understand, can have some issues. With a single large codebase, you have low flexibility in changing technologies. As well, there exist some problems in scalability. Suppose you are experiencing heavy traffic for only one service. What you can do is temporarily have more server instances to handle this traffic. Although scaling up only for that service seems wasteful. Not to mention the simple fact that large codebases are harder to understand. You can solve all these problems through the use of microservice architecture.

With microservices, you split the codebase into several smaller applications. Each application acts as its own small individual service hence the name *microservice*. Each microservice would have its own codebase, server, and sometimes database. Although this may seem to be unnecessary at first, it can very well be worth it for its advantages. Say you wanted to make use of new technology for the application. With microservices, you have some more flexibility since your services are loosely coupled. This way using different technologies for different services becomes more realistic. As another example, let’s go back to our scenario with a single service under heavy traffic. Since our services run on their own servers, you can use more server instances for that once service. This would save you resources in no longer having to scale up the entire application. As a final benefit, splitting the application into microservices increases readability. Instead of having one large codebase you now have smaller easier to read ones.

With that said, using microservices isn’t a one size fits all solution. Development in this style also comes with its disadvantages. For instance, integration testing becomes a challenge because of the many codebases. Also, having your services talk to each other in harmony brings in its complexities. Here’s a general rule of thumb for deciding if you need to use microservices. If you are working with a simpler application, need a quick launch, or are just starting off, it may not be worth it. In these cases, scalability and maintainability may not be worth the extra complexity. Where microservices shine is when you have a complex project that needs scalability.

###Service Discovery

Let's consider how our microservices will communicate with each other and the client-side. In theory, you could hard code the URLs in each microservice so they know where to find each other. This has big disadvantages and is not the ideal solution. Hardcoding URLs all over your microservices makes your code a nightmare to maintain. This is especially true if you want to change URLs. As well, let’s consider the issue of scaling we talked about earlier. Say you need temporary server instances to handle more traffic for a microservice. How are the other services supposed to find the extra servers? This is where service discovery comes into the picture.

Service discovery gives you a flexible way to locate microservices. On a high level, here’s how this would work. Whenever you want to find and call a microservice, you would use another server as a medium to do so. This server is called the discovery server. When they start up, your microservices first register themselves with this discovery server. This lets the discovery server know their location so it can share it later. Then, whenever we want to call a microservice, we ask the discovery server to help us connect to it. *Note microservices may cache the location of each other so they don’t have to contact the discovery server every time.* Service discovery comes in two different forms, client-side and server-side service discovery.


###Client-Side Service Discovery Vs Server-Side Service Discovery

You can think of client-side service discovery as using a phone book. The client first looks into a phone book (the discovery server) to call the microservice it needs. Then with the microservice’s phone number (URL), it calls the microservice itself. You can think of server-side service discovery as like a call center. Say you are looking to call customer service. The phone number you call is for a call center where you wait for them to redirect your call to an employee. In this case, you are the client, the call center is the discover server, and the employee is the microservice. *Note that the server sending the initial request doesn’t necessarily need to be the client application.* You can have microservices talk to each other in this way as well. In our practical implementation, we will be using a tool for client-side service discovery called Eureka.

###Creating a Simple Microservice-Based Application

For the practical section of this guide, we will be creating a stupidly complex *Hello World* program. In this application, we will have two microservices, ```hello-service``` and ```world-service```. ```hello-service``` will return the string *Hello* and ```world-service``` *World*. From there, we will have a client call both microservices to display *Hello World*. This is not a practical use case for microservices but it will give you an idea of how to code in this way. Note that with Eureka, the discovery server is also known as a ```Eureka server```. Meanwhile, the microservices are also known as ```Eureka clients```. I may use these terms interchangeably from here on.

###Creating Our Discovery Server

Let’s start by creating our discovery server. With Spring, doing this is very trivial. First, we create a new Spring project using the Spring Initializer. The only starter dependency we need to add is the Eureka server dependency. In the main class, add the ```@EnableEurekaServer``` annotation. In the ```application.properties``` file, we will have the following properties:

```properties
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
server.port=8761
```

For the server port, we need to make sure we use a port not occupied by any of our microservices. Here, we set the port to be 8761 which is the default port for a Eureka server. By *default port*, I mean that the microservices will assume your Eureka server is on that port. Suppose you wanted to change the port to 8080. You would need to add the following to the ```application.properties``` file of your microservices:

```properties
eureka.client.service-url.defaultZone=http://localhost:8080/eureka
```

Otherwise, your microservices will try to register at port 8761 which will cause an error.

For the other two properties, we need a little bit of extra context. In a microservices-based application, you could have many Eureka servers. Each Eureka server also behaves as a Eureka client and tries to register with other Eureka servers. This way, if one of them fails, you have other instances that can fill the role of a discovery server. For our case, we will keep things simple and use a single Eureka server. Because of this, we added the above properties to tell our server not to try to register itself. Otherwise, an error will occur upon running the server.

When you run the discovery server and go to its URL in your browser, you should see something like this:

[discovery server](/engineering-education/introduction-to-microservices-with-spring-and-eureka/eureka-server.png)

Notice under ```Instances currently registered with Eureka``` it says *no instances available.* This table would show us all the Eureka clients registered to this server. The Eureka server identifies each microservice by its application name. We would configure this in the ```application.properties``` file. Once our microservices get registered, the application names will appear in that table. Then, whenever we want to call a registered microservice, we call it based on this name and not its URL.

###Creating Eureka Clients:

Now that we got our discovery server, let’s create our first Eureka client, ```hello-service```. To create it we first go back to the Spring Initializer. This time we need the Eureka discovery client dependency and the Spring web dependency. From here, we add the ```@EnableEurekaClient``` annotation to our main class. Then, add the following property to your ```application.properties``` file:

```properties
spring.application.name=hello-service
```

This sets the application name for our Eureka client as talked about earlier. *Note that we should use kabob-case for setting our application name. Certain characters like underscores or spaces cause errors when sending requests.* From here, we add the following simple controller:

```java
package me.john.amiscaray.helloservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

   @GetMapping("/hello")
   public String getHello(){
  
       return "Hello";
  
   }

}
```

Now run both the Eureka client and the Eureka server. You will notice that our Eureka client automatically registers to our Eureka server:

[discovery server](/engineering-education/introduction-to-microservices-with-spring-and-eureka/eureka-server-registered.png)

To save time, I will skip over creating our ```world-service```. From here you should have a good idea of how it would work. To create our ```world-service``` we would follow the same steps. Only this time our controller would return *World* at the endpoint ```/world```. As well, it would have a more appropriate application name and be on a different port.

###Creating the Client

For the client-side, we will have another Spring application. This application will have a single endpoint that will return the string *Hello World*. To do so it will retrieve the words *Hello* and *World* from our microservices. To start, we create a new Spring boot project with the web dependency and the Eureka client dependency. From here, we create a new bean for a ```RestTemplate``` object. We will use this object to send requests to our microservices. **Note the ```RestTemplate``` class will be depreciated in the future. Instead, it is recommended to use the WebClient class in Spring’s reactive web library. We are using ```RestTemplate``` here for simplicity.** For this to work, we must also annotate the method creating the bean with ```@LoadBalanced```:

```java
@Bean
@LoadBalanced
public RestTemplate restTemplateBean(){

   return new RestTemplate();

}
```

We need the ```@Loadbalanced``` annotation to tell Spring we are dealing with microservices and will not be using real URLs for our requests. Instead, we will put a kind of *dummy* URL that Spring will recognize as a reference to a microservice:

```java
@RestController
public class HelloWorldController {

   @Autowired
   private RestTemplate rest;
  
   @GetMapping("/")
   public String getHelloWorld(){
          
       // Sends a request to our hello-service. Specifies the response should be treated as a String.
       String hello = rest.getForObject("http://hello-service/hello", String.class);
       String world = rest.getForObject("http://world-service/world", String.class);
      
       return hello + " " + world;
  
   }

}
```

Notice for the *URL*, we set the domain name as the name of our microservice. Spring will then be smart enough to look for a microservice with that name and make the right request.

###Conclusion:

In this article, we went over the basics of microservices both in theory and in practice. By now, you should know why and when to use microservices versus the monolithic approach. As well, the practical guide should have given you an idea of how to get started with microservices in Java. For some next steps, I would suggest trying this technology on your own to see how much you can apply from this. If you want to learn more, I would highly recommend [Java Brain's Microservices Tutorials](https://www.youtube.com/c/JavaBrainsChannel/playlists?view=50&sort=dd&shelf_id=12). As well, I also set up a repository of all the code we have written [here](https://github.com/john-amiscaray/Hello-World-Program-with-Microservices).


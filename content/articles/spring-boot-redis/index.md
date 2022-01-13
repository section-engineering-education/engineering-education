---
layout: engineering-education
status: publish
published: true
url: /spring-boot-redis/
title: Getting Started with Spring Boot Redis Messaging
description: This article will go over a step-by-step tutorial on how to communicate between two services using Redis publisher or subscriber messaging.
author: okelo-violet
date: 2021-11-02T00:00:00-14:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-redis/hero.jpg
    alt: Getting Started with Spring Boot Redis Messaging 
---
Redis is a key-value store that can be used as an in-memory database, cache provider, or message broker. In this article, we will learn how to use Redis publisher/subscriber to communicate between the services asynchronously. 

### Introduction
We will create two services: 
- A **publisher service** - that will retrieve puns (jokes) from the pun API service and publish the pun into the Redis broker queue.
- A **subscriber service** - that will listen for new puns in the Redis broker queue, retriev a new joke, and logs it on the Spring Boot console.

### Prerequisites
To follow along the reader will need the following:
- Redis installed on your computer.
- JDK installed on your computer.
- Your favourite code editor installed.
- Knowledge in Spring Boot.
   
### Project setup
- On your browser, navigate to [https://start.spring.io/](https://start.spring.io).
- Select `maven project`, language to `Java` and Spring Boot version leave to default.
- Set the project group name to `io.section` and artifact to `publisher`.
- Add `Lombok`, `Spring Reactive Web` and `Spring Data Reactive Redis` as dependencies.
- Click on generate button to create and download the boilerplate code for the publisher application.
- Repeat the above steps and change the artifact name to `subscriber`.

### Setting up Redis
1. On your browser, navigate to [https://redis.io/](https://redis.io/) and download a Redis application for your operation.
2. Execute the command below to verify that Redis has been successfully installed on your computer and works as expected.

```bash
$ redis-server -v
Redis server v=5.0.7 sha=00000000:0 malloc=jemalloc-5.2.1 bits=64 build=636cde3b5c7a3923

```

### Publisher service
Extract the `publisher.zip` file downloaded in the previous step and open the project in your favourite code editor.

#### Model 
- Create a new Java class named `Pun` that implements `Serializable` interface.
- Add the code block below into the `Pun` Java file created above.

```java
@Getter // Creates getters for all the fields in the class
@Setter // Creates setter methods for all the fields in the class
@AllArgsConstructor  // Creates a constructor that will all arguments in the class
@NoArgsConstructor // Creates a constructor with no argument
public class Pun implements Serializable {

    private static final String FORMAT = "Pun: %s: URL: %s"; // formats the pun to a desired string format

    private String value; //holds the pun string
    private String url; //holds the pun url

    //converts Pun class to a string with the format provided above
    @Override
    public String toString() {
        return String.format(FORMAT, this.value, this.url);
    }
}
```

#### Service
- Create a new Java file named `PublishService` and add the block of code below.
```java
@Service
public class PublisherService {
    private static final String PUN_API = "https://api.chucknorris.io/jokes/random";
    private WebClient punWebClient;

    private final ReactiveRedisOperations<String, Pun> punRedisTemplate;

    public PublisherService(ReactiveRedisOperations<String, Pun> punRedisTemplate) {
        this.punRedisTemplate = punRedisTemplate;
    }

    @Value("${pun-queue}")
    private String punTopic;

    @PostConstruct
    private void init() {
        this.punWebClient = WebClient.builder()
                .baseUrl(PUN_API)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        System.out.println(punWebClient);
    }

    @Scheduled(fixedRate = 1000)
    public void publish() {
        this.punWebClient.get()
                .retrieve()
                .bodyToMono(Pun.class)
                .flatMap(pun -> {
                    System.out.println(pun.getUrl());
                    return this.punRedisTemplate.convertAndSend(punTopic, pun);
                })
                .subscribe();
    }

}

```

- ` @Value("${pun-queue}") ` annotation retrieves the joke-queue value from the application.properties file and sets it to the jokeTopic variable.
- ` @PostConstruct` annotation makes the annotated `init()` remain unexecuted until the Spring context is initialized.
- `@Scheduled(fixedRate = 1000)` annotation marks the `publish()` method to be executed every one second.
- The `publish()` method retrieves a joke from the API, converts the Joke java object. The Pun POJO is then converted to a formated JSON that is then published to the Redis broker queue.
  
In the `PublisherApplication` class, add the code snippet below.
```java
@EnableScheduling // Enables Spring Boot scheduled tasks
@SpringBootApplication
public class PublisherApplication {

    public static void main(String[] args) {
        SpringApplication.run(PublisherApplication.class, args);
    }


    @Bean
    public ReactiveRedisOperations<String, Pun> punTemplate(LettuceConnectionFactory connectionFactory) {
        // Converts Plain java object to JSON for transfer through Redis message broker
        RedisSerializer<Pun> punSerializer = new Jackson2JsonRedisSerializer<>(Pun.class);
        //Creates the Pun serializer that will convert the Pun object to a formatted JSON string
        RedisSerializationContext<String, Pun> context = RedisSerializationContext.<String, Pun>newSerializationContext(RedisSerializer.string())
                .value(punSerializer)
                .build();
        return new ReactiveRedisTemplate<>(connectionFactory, context);
    }

}
```

In the resources directory, add the configuration code below in the `application.properties` file.
```yaml
server.port=8085 #sets the ports that the application runs on
pun-queue = pun-server # sets the Redis queue name where data will be published 
SPRING_REDIS_HOST=6379 # sets the port on which Redis is running on

```

### Subscriber service
Extract the `subscriber.zip` file that was downloaded in the previous step.

#### Service
- Create a Java class named `Subscriber` service and add the code snippet below.
   
```java
@Service
public class SubscriberService {
    private final ReactiveRedisOperations<String, Pun> punReactiveRedisTemplate;

    public SubscriberService(ReactiveRedisOperations<String, Pun> punReactiveRedisTemplate) {
        this.punReactiveRedisTemplate = punReactiveRedisTemplate;
    }

    @Value("${pun-queue}") // Retrieves the pun-queue value from the applications.properties file
    private String punTopic;

    @PostConstruct
    private void init() {
        this.punReactiveRedisTemplate
                .listenTo(ChannelTopic.of(punTopic)) // sets the channel on which the subscriber service will be listening for updates on
                .map(ReactiveSubscription.Message::getMessage) //gets the message from the channel and converts it to a Joke pojo.
                .subscribe(System.out::println); // Prints out the joke on the Spring Boot console.
    }

}
```

#### Model
- Create a new Java class named `Pun` and implement the `Serializable` interface.
- Update the `Pun` class with the code snippet below.

```java
@Getter // Creates getters for all the fields in the class
@Setter // Creates setter methods for all the fields in the class
@AllArgsConstructor  // Creates a constructor that will all arguments in the class
@NoArgsConstructor // Creates a constructor with no argument
public class Pun implements Serializable {

    private static final String FORMAT = "Pun: %s: URL: %s";

    private String value;
    private String url;

    @Override
    public String toString() {
        return String.format(FORMAT, this.value, this.url);
    }
}
```

In the `SubscriberApplication` class, add the code snippet below.
```java
@EnableScheduling // Enables Spring Boot scheduled task
@SpringBootApplication
public class SubscriberApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubscriberApplication.class, args);
    }
    @Bean
    public ReactiveRedisOperations<String, Pun> punTemplate(LettuceConnectionFactory connectionFactory) {
        RedisSerializer<Pun> punValueSerializer = new Jackson2JsonRedisSerializer<>(Pun.class);
        RedisSerializationContext<String, Pun> context = RedisSerializationContext.<String, Pun>newSerializationContext(RedisSerializer.string())
                .value(punValueSerializer)
                .build();
        return new ReactiveRedisTemplate<>(connectionFactory, context);
    }

}

```

#### Configuration
In the `resource` directory, add the code snippet below to `application.properties` file.

```yaml
server.port=8084 # Sets the port on which the server will run on 
pun-queue=pun-server # Sets the name of the Redis queue
SPRING_REDIS_HOST=6379 # Sets the Redis port on which the subscriber service listens for new jokes on the queue
```

### Testing
The publisher services pull data from the [jokes API](https://api.chucknorris.io/jokes/random) and display the links to various jokes as shown below.

![Publisher](/engineering-education/spring-boot-redis/publisher.png)

The publisher service then queues each joke in the Redis message queue where subscribers can listen for new messages.

The subscriber service receives the jokes from the Redis message queue and logs the Joke and joke URL, as shown below.

![Subscriber](/engineering-education/spring-boot-redis/subscriber.png)

### Conclusion
Now that you have learned how to send messages between two services, try implementing a two service application where one service accepts HTTP requests while the second service handles database operations. Then, send messages between the two services using Redis.

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

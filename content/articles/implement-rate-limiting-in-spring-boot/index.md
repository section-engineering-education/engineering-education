---
layout: engineering-education
status: publish
published: true
url: /implement-rate-limiting-in-spring-boot/
title: Implementing Rate Limiter for Spring Boot Applications
description: In this article we will look at what a rate limiter is, where we use it, and how to restrict API calls. We will also learn to implement the same using a Spring Boot application.
author: ayemobola-tolulope
date: 2022-02-21T00:00:00-14:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implement-rate-limiting-in-spring-boot/hero.jpg
    alt: Implementing Rate Limiter for Spring Boot Application Example Image
---
In this tutorial, we will learn about API security and availability. We will learn about the efficiency of the Bucket4j library and how it is used to rate-limit a Spring REST API.
<!--more-->
We will implement a simple calculator project to explore the inner workings of rate-limiting, gain an understanding of the Bucket4j library, and apply it for rate-limiting an actual Spring boot application.

Let's get started.

### Prerequisites
- Previous knowledge of REST APIs.
- Knowledge working with [Spring Boot](https://www.section.io/engineering-education/search/?q=Spring%20Boot).
- Basic knowledge of Java programming language.

### Table of contents
- [What is rate-limiting?](#what-is-rate-limiting)
- [The rate-limiting library – Bucket4j](#the-rate-limiting-library)
- [The token-bucket algorithm](#The-token-bucket-algorithm)
- [Rate-limit an application](#rate-limit-an-application)
- [Points to note](#points-to-note)
- [Key takeaways](#key-takeaways)
- [Conclusion](#conclusion)

### What is rate-limiting?
Rate limiting is a software engineering strategy that allows creators and maintainers of API infrastructures to control access to their APIs. The number of calls that any consumer can make is checked during a particular time. 

By doing this, APIs can be defended against abuse and unnecessary use. Rate limiters can also serve as a means to place consumers on payment plans, by controlling how many calls can be made with a plan they choose.

### The rate-limiting library – Bucket4j
The Bucket4j library is a Java-based library built using the token-bucket algorithm. This implies that it is safe thread-wise and can be adopted either in a clustered environment or in an isolated [Java Virtual Machine (JVM)](en.wikipedia.org/wiki/Java_virtual_machine) environment.

### The token-bucket algorithm
The idea behind this simple but powerful algorithm is straightforward. Imagine for a moment that there is a bucket that can hold `x` number of tokens. Any time a client wishes to access a resource or an endpoint, he would have to get a token from this bucket to achieve this.

We simply take out a token, hand it to him, and then he can make a successful request. Conversely, if there are no tokens, we simply reject his requests.

> Therefore, the requests and token quantity are inversely proportional.

In similar terms, consider an application with a rate limit of 500 requests per hour. We could build a bucket that can hold 500 tokens, and set up a refill rate of 500 per hour.

If we get 450 requests, in an hour, which is less than the total number of 500 available tokens, we would carry forward the remaining 50 tokens to the next hour; raising the bucket's capacity.

If we exhaust all 500 in 45 minutes, we would need to wait for another 15 minutes before we can access the resources again.

### Rate-limit an application
Now, we will implement a rate limit using Bucket4j for a small application. We will learn by building a "perimeter calculator" application. It simply calculates the perimeter of a shape.

#### Setup
First, set up a regular spring boot project and add this dependency in your `pom.xml` file:

```xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>4.10.0</version>
</dependency>
```

Then, create three files as shown:
1. A request class named `Dimension`
2. A model class called `Perimeter`
3. A `Controller` class

```java
@Getter
@Setter
public class Dimension{
    private int length;
    private int breadth;
}
```

The `Dimension` class above is used as a data transfer object with the frontend.

```java
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Perimeter {
    private String shape;
    private Double perimeter;
}
```

The `Perimeter` class is the actual object where we calculate the perimenter of a shape.

```java
@RestController
public class Controller {
    @PostMapping(value = "/api/v1/perimeter/rectangle")
    public ResponseEntity<Perimeter> rectangle(@RequestBody Dimension dimensions) {
        return ResponseEntity.ok(new Perimeter("rectangle",
                (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
    }
}
```

#### Implementation
Now, let us write out a simple rate limit code.

With this, the API should allow only 50 requests in one minute. Therefore, after the 50th API call within that one-minute window, the API rejects the call.

Our controller will be modified to reflect this change – build a bucket and introduce the bandwidth as shown:

```java
@RestController
public class Controller {

    private final Bucket bucket;

    public Controller() {
        Bandwidth limit = Bandwidth.classic(50, Refill.greedy(50, Duration.ofMinutes(1)));
        this.bucket = Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    @PostMapping(value = "/api/v1/perimeter/rectangle")
    public ResponseEntity<Perimeter> rectangle(@RequestBody Dimension dimensions) {
        return ResponseEntity.ok(new Perimeter("rectangle",
                (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
    }
}
```

#### Testing the application
We can test the working by sending requests to the endpoint and see that it is utilizing tokens from the bucket, using the `tryConsume` method of the Bucket4j library (`Controller` class modified).

When we hit the limit, the calls are rejected with a status code and response of `49 – Too many requests` respectively.

```java
@PostMapping(value = "/api/v1/perimeter/rectangle")
public ResponseEntity<Perimeter> rectangle(@RequestBody Dimension dimensions) {

    if (bucket.tryConsume(1)) {
        return ResponseEntity.ok(new Perimeter("rectangle",
                (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
    }

    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
}
```

![pre-limit](/engineering-education/implement-rate-limiting-in-spring-boot/pre.jpg)

From the image above, we see that our request was successful, with a corresponding right response.

Now, for brevity, I will send in 50 more and show that on the 51st, the API call of that count is rejected with a correct rejection response as shown:

![post-limit](/engineering-education/implement-rate-limiting-in-spring-boot/post.jpg)

To use resources again, we would have to wait until the start of the next minute.

### Points to note
API calls are becoming more popular over time. You must have used a service that required you to upgrade from one plan to a higher one – say, from a free tier to a basic plan.

With a rate limit, we can control users' API usage based on the plan that they are on. You simply write a method, matched with some indicator of the plan they are on and indicate the number of calls they can make within a timeframe.

For instance, a free plan user could make 1,000 calls per hour, while a basic user could have a bandwidth of 100,000 calls per hour, and so on.

Each client would need to have a unique API Key (or some sort of identifier) that they must send along with their requests, to help us identify the plan to which they belong.

You can write methods that can generate new API keys for clients and increase their API call bandwidth accordingly.

### Key takeaways
In this tutorial, readers gained a better understanding of rate-limiting their applications. With a tutorial, they learned how to add them to their projects.

### Conclusion
Using the knowledge from this tutorial, developers can better protect their APIs and make them more available by controlling the volume of hits to them. Since it allows for some good measure of control, it is a very useful avenue for making money.

The code for this project is hosted on this [link](https://github.com/teevyne/bill-limiter).

I trust you enjoyed your time reading this short tutorial. Thank you.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
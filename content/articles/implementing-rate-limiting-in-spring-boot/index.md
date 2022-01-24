In this tutorial, we will go into the world of API availability, security and availability. We will learn about the efficacy of the Bucket4j library and how it is used to rate-limit an Spring REST API.

By implementing a simple calculator project, we will explore the inner workings of rate-limiting, gain an understanding of the Bucket4j library and apply it in rate-limiting an actual Spring boot application. Let us get started.

###  Prerequisite
- Previous knowledge of REST APIs
- Knowledge working with Spring Boot
- Basic knowledge of Java Programming Language

### Table of Content
- [What is Rate Limiting?](#what-is-rate-limiting)
- [The Rate-Limiting Library – Bucket4j](#the-rate-limiting-library)
- [The Token-Bucket Algorithm](#The-token-bucket-algorithm)
- [Rate-Limit an Application](#rate-limit-an-application)
- [Points to note](#points-to-note)
- [Key Takeaways](#key-takeaways)
- [Conclusion](#conclusion)

### What is Rate Limiting?
Rate Limiting is a software engineering strategy that allows creators and maintainers of API Infrastructures to control access to their APIs. The number of calls that any consumer can make is checked during a particular time. By doing this, API's can be defended against abuse and unnecessary use. Rate Limiters can also serve as a means of placing consumers on payment plans, by controlling how much calls with they make within a certain plan.

### The Rate-Limiting Library – Bucket4j
The Bucket4j library is a java-based library built using the token-bucket algorithm. This implies that it is safe thread-wise and can be adopted either in a clustered environment or in an isolated Java Virtual Machine environment.

### The Token-Bucket Algorithm
The idea behind this simple but powerful algorithm is straighforward. Imagine for a moment that there is this bucket that can hold x number of tokens. Any time a client wishes to access a resource or an endpoint, he would have to get a token from this bucket to achieve this. We simple take out a token, hand it to him and then he can make a successful request. Conversely, if there are no tokens any longer, we simply reject his requests. Requests and token quantity are therefore inversely proportional

In more familiar territory, consider an application with a rate limit of 500 requests per hour. We could build a bucket that can hold 500 tokens, and setup a refill rate of 500 per hour. We will understand this shortly. If we get 450 requests, which is less than the total number of 500 available tokens, in an hour, we would carry over the remaining 50 tokens to the next hour; raising the bucket’s capacity. Conversely, if we exhaust all 500 in 45 minutes, we would need to wait another 15 minutes to be able to access resources again.

###  Rate-Limit an Application
Now we will implement rate limit using Bucket4j in a small application. We will do this by building the very well-known Perimeter Calculator application. It simply calculates the perimeter of a shape.

#### Setting up; adding dependency
First, set up a regualar spring boot project and add this dependency in your `pom.xml` file

```xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>4.10.0</version>
</dependency>
```

Then, create three files. A request class named `Dimension`, a model class called `Perimeter` and a `Controller` class.
```java
@Getter
@Setter
public class Dimension{
    private int length;
    private int breadth;
}
```
The `Dimension` class above is used as a data transfer object with the frontend or input means.
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
The `Perimeter` class is the actual object for which we are calculating the perimenter
```java
@RestController
public class Controller {

    @PostMapping(value = "/api/v1/perimeter/square")
    public ResponseEntity<Perimeter> square(@RequestBody Dimension dimensions) {
        return ResponseEntity.ok(new Perimeter("square",
                (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
    }
}
```

#### Implementing Rate Limiting

Now, let us write in out simple rate limit code. With this, the API should allow only 50 requests in one minute. Therefore, after the 50th API call within that one-minute window, the API rejects the call. Our controller will be modified to refelct this change – build a bucket and introduce the bandwidth
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

    @PostMapping(value = "/api/v1/perimeter/square")
    public ResponseEntity<Perimeter> square(@RequestBody Dimension dimensions) {
        return ResponseEntity.ok(new Perimeter("square",
                (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
    }
}
```

Testing the application
We can test by sending requests to the endpoint and see that it is utilising tokens from the bucket, using the `tryConsume` method of the Bucket4j library (`Controller` class modified). When we hit the limit, the calls are rejected with a status code and response of `429 – Too many requests` respectively.

```java
@PostMapping(value = "/api/v1/perimeter/square")
public ResponseEntity<Perimeter> square(@RequestBody Dimension dimensions) {

        if (bucket.tryConsume(1)) {
            return ResponseEntity.ok(new Perimeter("square",
                    (double) 2 * (dimensions.getLength() + dimensions.getBreadth())));
        }

        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
}
```
![pre-limit](/engineering-education/implementing-rate-limiting-in-spring-boot/pre.jpg)

From the image above, we see that our request was successful, with a corresponding right response. Now, for brevity, I will send in 50 more and show that on the 51st, the API call of that count is rejected with a correct rejection response.
![post-limit](/engineering-education/implementing-rate-limiting-in-spring-boot/post.jpg)

To use resources again, we would have to wait till the start of the next minute and we have a full bucket again


### Points to Note
API calls are becoming more popular by the weeks. You must have used a service that required you to upgrade from one plan to a higher one – say, from a free tier to basic; with respect to API calls. With rate limit, we can control users’ API usage based on the plan that they are one. You simply write a method, matched with some indicator of the plan they are on, and indicate the number of calls they can make within a timeframe. For instance, a free plan user could make 1000 calls per hour, while a basic user could have a bandwidth of 100000 calls in the same window, and so on.

Each client would need to have a unique API Key (or some sort of identifier), which they must send along with their requests, to help us identify the plan to which they belong. You can write methods that generate new `key`s for clients and increases their API call bandwidth accordingly.

### Key Takeaway
In this tutorial, readers have gained an understanding of rate-limiting their applications. With a tutorial, they have been learnt to introduce it into their projects.

### Conclusion.
Using the knowledge from this tutorial, developers can better protect their API’s and make it more available by controlling the volume of hits to it. Because it allows for some good measure of control, it is a very useful avenue for making money.The code for this project is hosted on this [link](https://github.com/teevyne/bill-limiter). I trust you enjoyed your time reading this short tutorial. Thank you

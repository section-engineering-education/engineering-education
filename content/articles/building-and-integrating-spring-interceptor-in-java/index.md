In my personal project, I have had reasons to add an `Interceptor`. As the name suggests, an `Interceptor` is a class that comes in between a request reaching the intended endpoint and a response returning to the requesting client - user or application. 

With this, an interceptor can check a request before sending it to its destination. At this point, we might want to perform some authentication of headers, validations of the request body or simply modify the request object by adding some more fields or data to the request body.

The same can be done for all responses coming from the endpoints. We can intercept them and modify them before passing them to the client. The interceptor is also a perfect place to build an encryption gateway. However, in this tutorial, we will only build a request/response interceptor while we will breeze through building an encryption/decryption gateway in the same interceptor.

### Prerequisites
- Familiarity with Java and Spring Boot
- Familiarity with servlets and adapters
- The IntelliJ IDE
- An understanding of requests and responses

### Table of contents
- [Introduction](#introduction)
- [Introducing the Methods for (Request/Response) Interception](#interceptor-methods)
- [Registering a Custom Interceptor](#registering-a-custom-interceptor)
- [Key Takeaways](#key-takeaways)
- [Conclusion](#conclusion)

### Introduction
To get an understanding of how an `Interceptor` works, we need to know the workings of the `HandlerMapping` in Spring. What a `HandlerMapping` does is map a URL to a handler method. By doing this, a servlet called the `Dispatcher Servlet` can initiate it during request processing. The `Dispatcher Servlet` employs `HandlerAdapter` to run a call to the method. Meanwhile, an interceptor intercepts requests and performs some actions on them. They also ensure handler codes are not repeated across the project.

For us to use Interceptors in Spring Boot, we need to add the web and Lombok dependencies in our `pom.xml` configuration file. The web dependency allows us to interact with services over HTTP while Lombok gives us access to the `@Slf4j` annotation which we will use later for logging.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
```
### Interceptor methods
To demonstrate the operations of a Spring Interceptor, we will simulate a small request-response project. To begin, create a Spring Boot project. There are several articles on how to set up a Spring Boot project on the Section website. Do well to check for one or all of them.

Now it is time to introduce the `Interceptor` methods. Spring Interceptors thrive on three methods of operation:
- preHandle(): To carry out some actions on a request before sending it to the controller
- postHandle(): To carry out actions on a response coming from the controller, before sending to requesting client
- afterCompletion(): To carry out actions at the end of the request-response interaction

In our project, all we will do is add log messages to the requests and responses to show how interception works.
#### preHandle()
The name describes what the method does: method invocation before a request is handled. It is at this point that we log information regarding the parameters of the request. We are logging this info using a simple Slf4j logger by simply annotating the class with the `@Slf4j` annotation:
```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class CustomInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest req,
            HttpServletResponse res) throws Exception {

        log.info("[preHandle() method called during request handling {}", req);

        return true;
    }
}

```
Now, let us look at the next method after `preHandle()`
#### postHandle()
This method is invoked by the `interceptor` after the request has been handled but just before the `DispatcherServlet` passes the response to the client. If we like, at this point, we could add more attributes to the response. We can also get to record the time of processing the request. Just like with the preHandle(), we will be logging a message in the method execution.
```java
// in the LoogingInterceptor class...
@Override
public void postHandle(
  HttpServletRequest req,
  HttpServletResponse res,
  ModelAndView modelAndView) throws Exception {

    log.info("postHandle() method called during response return {}", res);
}
```
#### afterCompletion()
Finally, we can use `afterCompletion()` to obtain the response and request after the response has been passed to the client.
```java
// in the CustomInterceptor class...
@Override
public void afterCompletion(
  HttpServletRequest req, HttpServletResponse res)
  throws Exception {
    if (ex != null){
        ex.printStackTrace();
    }
    log.info("afterCompletion() called on both request {} and response {}", req, res);
}
```
### Registering a custom interceptor
At this point, we have to create our custom interceptor and register it in our application. We will have to override the addInterceptors() method to achieve this:
```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CustomInterceptor());
    }
}

```
This configuration activates the interceptor and ensures that all the messages we have passed in the interceptor methods will be logged. It is noteworthy that with Spring Boot, we need to annotate the configuration class with `@EnableWebMvc`

### Key takeaways
Interceptors can be versatile and have a wide range of use. In a perfect security-based scenario, we might want to block requests that do not have a particular type of header or request parameter. Also, we might need requests to have a particular field before eventually passing the request to the expectant controller.

Furthermore, some particular fields may be included in the response header or body. These can be achieved in the interceptor to control what passes to and from controllers in the system.
### Conclusion
In this article, we learned about Spring Interceptors, how they are implemented and what they do. The link to the repository can be found [here](https://github.com/teevyne/interceptor-repo.git). I hope you learned something and you can apply it to your projects. Cheers!

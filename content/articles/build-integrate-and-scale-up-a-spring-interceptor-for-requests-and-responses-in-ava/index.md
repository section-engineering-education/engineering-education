In my personal project, I have had reasons to add an interceptor. As the name sounds, an Interceptor is a class that comes in between a request reaching the intended endpoint and a response returning to the requesting client - user or application.
An interceptor can check a request before sending it to its destination.

At this point, we might want to perform some authentication of headers, validations of the request body or simply modify the request object by adding some more fields or data to the request body.

The same can be done for all responses coming from the endpoints. We can intercept them, modify them before passing to the client. The interceptor is also a perfect place to build an encryption gateway. However, in this tutorial, we will only build a request/response interceptor while we will breeze through building an encryption/decryption gateway in the same interceptor.

####	Prerequisite
- Familiarity with Java and Spring Boot
- Familiarity with servlet and adapters
- Installed IntelliJ IDE
- Understanding of requests and responses

####	Table of Contents
- Introduction
- Interceptor Methods: preHandle(), postHandle() and afterCompletion()
- Registering a Custom Interceptor
- Key Takeaways
- Conclusion

###	Introduction
To get an understanding of how an Interceptor works, we need to know the workings of the `HandlerMapping` in Java. What a `HandlerMapping` does is to map a URL to a handler method. By doing this, a servlet called the `Dispatcher Servlet` can initiate it during a request processing. Essentially, the `Dispatcher Servlet` employs `HandlerAdapter` to run a call to the method. Basically, an interceptor functions to intercept requests and perform some actions on them. They also ensure handler codes are not repeated across the project.

For us to use Interceptors in Spring Boot, we need to add the `web` and `lombok` dependencies in our `pom.xml` configuration file. `web` allows us interact with services over HTTP while `lombok` gives us access to the `@Slf4j` library which we will use later for logging.

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.3.13</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>

```
###	Interceptor Methods
To demonstrate the operations of a Spring Interceptor, we will simulate a small request-response project. Basically, there are three methods employed in successfully building a Spring Interceptor. To begin, create a Spring Boot project. There are several articles on how to set up a Spring Boot project on section. Do well to check for one or all of them.
Now it is time to introduce the methods:
- preHandle(): To carry out some actions on a request before sending to the controller
- postHandle(): To carry out actions on a response coming from the controller, before sending to requesting client
- afterCompletion(): To carry out actions at the end of the request-response client
  In our project, all we will do is add log messages to the requests and responses to show how interception works.
#### preHandle()
The name describes what the method does – method invocation before request is handled. It is at this point that we log information regarding parameters of the request. We are logging this info using a simple `Slf4j` logger by simply annotating the class with the `@Slf4j` keyword:
```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoggingInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) throws Exception {

        log.info("[Pre method called][" + request + "]");

        return true;
    }

```
#### posthandle()
This method is invoked by the `interceptor` after the request has been handled but just before the `DispatcherServlet` passes the response to the client. If we like, at this point, we could add more attributes to the response. We can also get to record the time of processing the request. Just like with the preHandle(), we will be logging a message in the method execution.
```java
// in the LoogingInterceptor class...
@Override
public void postHandle(
  HttpServletRequest request,
  HttpServletResponse response,
  Object handler,
  ModelAndView modelAndView) throws Exception {

    log.info("[Post called][" + response + "]");
}
```
#### afterCompletion()
Finally, we can use the `afterCompletion()` to obtain the response and request after response has been passed to the client.
```java
// in the LoogingInterceptor class...
@Override
public void afterCompletion(
  HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
  throws Exception {
    if (ex != null){
        ex.printStackTrace();
    }
    log.info("[after completion called][" + request + "][response: " + response + "]");
}
```
###	Registering a Custom Interceptor
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
        registry.addInterceptor(new LoggingInterceptor());
    }
}

```
This configuration activates the interceptor and ensures that all the messages we have passed in the interceptor methods will be logged. It is noteworthy that with Spring Boot, we need to annotate the configuration class with `@EnableWebMvc`

###	Key Takeaways
Interceptors can be versatile and have a wide range of use. In a perfect security-based scenario, we might want to block requests that do not have a particular type of header or request parameter. Also, we might need requests to have a particular field before eventually passing the request to the expectant controller.

Furthermore, some particular field be included in the response header or body. These can be achieved in the interceptor and control what pass to and from controllers in the system.


###	Conclusion
In this article, we learnt about Spring Interceptors, how they are implemented and what they do. The link to the repository can be found [here](https://github.com/teevyne/interceptor-repo.git). I hope you learnt something
and you can apply to your projects. Cheers!

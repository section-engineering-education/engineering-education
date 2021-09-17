---
layout: engineering-education
status: publish
published: true
url: /spring-social-auth/
title: Getting Started with Spring Boot Social Authentication
description: This tutorial will go over Spring Boot social authentication with both google and github. Spring Boot social auth makes it possible for users to authenticate into Spring Boot applications using their existing social accounts.
author: odhiambo-paul
date: 2021-03-23T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/spring-social-auth/hero.jpg
    alt: Spring Boot social authentication example image
---
### Spring Boot Social auth
Spring Boot social auth makes it possible for users to authenticate into Spring Boot applications using their existing social accounts. Using Spring Boot social authentication allows developers to major in business logic rather than majoring in developing a custom authentication system.
<!--more-->
### Prerequisites
Before we continue you will need the following:
1. Java developer kit [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
2. Knowledge of [Kotlin](https://kotlinlang.org/docs/home.html) programming language.
3. Knowledge of the [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) framework.

### Creating the application
We are going to use [Spring initializr](https://start.spring.io/) to create our Spring Boot application.

- Navigate to [Spring initializr](https://start.spring.io/) in your browser.
- Select Kotlin in the languages section.
- Add `Spring Web`, `OAuth2 Client`, and `Spring Boot DevTools` dependencies.
- Leave other configurations as default and click on generate the project.
- Unzip the downloaded project and open it in your favorite IDE. I will be using [Intelij IDEA community](https://www.jetbrains.com/idea/download/#section=linux) which is available for free.
- Sync the project with maven to download and all the dependencies.

### Adding webjar dependencies
Since we are going to need `Jquery` to build the frontend for our application, we need to add `webjar` dependencies to make `Jquery` available in our Spring Boot project.

In the `pom.xml` add the dependencies below to include `Jquery` in our project.

```xml
      <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>3.4.1</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>bootstrap</artifactId>
            <version>4.3.1</version>
        </dependency>
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>webjars-locator-core</artifactId>
        </dependency>
```

### Spring security configuration
1. In the project's root package, create a package named `config`.
2. Inside the `config` package created above, create a new kotlin file named `WebConfig` and add the code snippets below.

```kotlin
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AuthenticationEntryPointFailureHandler
import org.springframework.security.web.authentication.HttpStatusEntryPoint
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Configuration
class WebConfig : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
            .authorizeRequests { a ->
                a.antMatchers("/", "/error", "/webjars/**").permitAll()
                    .anyRequest().authenticated()
            }
            .exceptionHandling { e ->
                e.authenticationEntryPoint(HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            }
            .oauth2Login { o ->
                o.failureHandler { request: HttpServletRequest, response: HttpServletResponse?, exception: AuthenticationException ->
                    request.session.setAttribute("error.message", exception.message)
                    val handler: AuthenticationEntryPointFailureHandler? = null
                    assert(false)
                    handler!!.onAuthenticationFailure(request, response, exception)
                }
            }
    }
}
```

- `@Configuration` annotation marks the class as a Spring Boot configuration class.
- `.authorizeRequests { a -> a.antMatchers("/", "/error", "/webjars/**").permitAll() .anyRequest().authenticated() }` permits all the requests made to `/`, `/error` and `/webjars/**` endpoints. All the requests made to the above endpoints don't require user authentication.
- `oauth2Login { o -> o.failureHandler { request: HttpServletRequest, response: HttpServletResponse?, exception: AuthenticationException -> request.session.setAttribute("error.message", exception.message) val handler: AuthenticationEntryPointFailureHandler? = null assert(false) handler!!.onAuthenticationFailure(request, response, exception) } }` handles any exception that occurs during the authentication process, i.e, when a user cancels social auth dialog or inputs the wrong social credentials.

### Spring Social auth controller
1. In the root project package, create a new package named `controller`.
2. In the package created above, create a new file named `SocialController.kt` and add the code snippet below.

```kotlin
@RestController
@RequestMapping("/api/v1/")
class SocialController {

    @GetMapping("/user")
    fun user(@AuthenticationPrincipal principal: OAuth2User): Map<String, Any?>? {
        return Collections.singletonMap("name", principal.getAttribute("name"))
    }
}
```

- `user` function returns the username from the social authentication provider that the user has logged in with.

### Github authentication
To use GitHub’s OAuth 2.0 authentication in our application as a login system, we must create a [new Github application](https://github.com/settings/developers). On the page presented, select a `New OAuth App` and register the application.

Set `http://localhost:8080/login/oauth2/code/github` as the authorization callback URL and `http://localhost:8080` as the homepage for the application.

Now that we have created a Github OAuth application, create a file named `application.yml` in the resources directory and add the code snippets below into the file.

Replace `github-client-id` and `github-client-secret` with the credentials you obtained from the Github OAuth application created above.

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          github:
            clientId: github-client-id
            clientSecret: github-client-secret
```

Navigate to `http://localhost:8080` in your browser, you will be presented with a GitHub authentication screen as shown below.

![Github authentication](/engineering-education/spring-social-auth/github-auth.png)

### Google authentication
Now that we have successfully implemented Github authentication, let's also implement Google authentication.

In the `application.yml` file we created above, add the Google auth code snippet from the `google auth section` in the code snippet below.

To obtain Google OAuth 2.0 credentials, follow the instructions [here](https://developers.google.com/identity/protocols/OpenIDConnect). Replace `google-client-id` and `google-client-secret` with the credentials you obtained from the google OAuth 2.0 dashboard.

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          # github auth section
          github:
            clientId: github-client-id
            clientSecret: github-client-secret
          # google auth section
          google:
            client-id: google-client-id
            client-secret: google-client-secret
```

### Homepage
In this section, we are going to create a simple HTML for our homepage.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Demo</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width" />
    <base href="/" />
    <link
      rel="stylesheet"
      type="text/css"
      href="/webjars/bootstrap/css/bootstrap.min.css"
    />
    <script type="text/javascript" src="/webjars/jquery/jquery.min.js"></script>
    <script
      type="text/javascript"
      src="/webjars/bootstrap/js/bootstrap.min.js"
    ></script>
  </head>
  <body>
    <h1>Demo</h1>
    <div class="container"></div>
    <div class="container unauthenticated">
      <div>
        With GitHub: <a href="/oauth2/authorization/github">click here</a>
      </div>
      <div>
        With Google: <a href="/oauth2/authorization/google">click here</a>
      </div>
    </div>

    <div class="container authenticated" style="display:none">
      Logged in as: <span id="user"></span>
    </div>
    <!-- Grabs the username from  /api/v1/user endpoint and displays it in the span with the id #user-->
    <script type="text/javascript">
      $.get('/api/v1/user', function (data) {
        $('#user').html(data.name);
        $('.unauthenticated').hide();
        $('.authenticated').show();
      });
    </script>
  </body>
</html>
```

When you navigate to `http://localhost:8080`, the web page below is displayed.

![Homepage unauthenticated](/engineering-education/spring-social-auth/home.png)

On clicking Google auth the app redirects to the Google authentication screen as shown below.

![Google authentication](/engineering-education/spring-social-auth/google-auth.png)

After successful authentication, a user is redirected to the homepage where their username is captured from the social profile. The screenshot below shows a username captured from the Google authentication.

![Homepage authenticated](/engineering-education/spring-social-auth/logged-in.png)

### Conclusion
Now that you have learned how to authenticate users in your Spring Boot application through Google and Github, implement Facebook social authentication in your Spring Boot application. 

The source code for the application can be found [here](https://github.com/paulodhiambo/socialauthentication).

Happy coding.

---

Peer review contribution by: [Linus Muema](/engineering-education/authors/linus-muema/)

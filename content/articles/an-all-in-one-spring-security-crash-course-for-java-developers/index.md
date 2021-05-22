---
layout: engineering-education
status: publish
published: true
url: /an-all-in-one-spring-security-crash-course-for-java-developers/
title: All-In-One Spring Security Crash Course for Java Developers
description: This tutorial will cover a crash course on how to secure a Spring Boot application. We will cover the topics of authentication and authorization. Authorization is the process of verifying we allow the user to do what they are asking to do. Authentication is the process of verifying who it is that is sending a request.
author: john-amiscaray
date: 2021-02-09T00:00:00-15:00
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-all-in-one-spring-security-crash-course-for-java-developers/hero.jpg
    alt: Spring Security Crash Course Java Developers example image
---
Whenever we build an application, security may not exactly be the first thing we think about. Yet, it is one of the most important features that need our attention. In this article, we will cover some key ways to secure your apps with Spring Security. Security might seem a little daunting especially if you are focused on the bigger picture.
<!--more-->
### Prerequisites
In this guide, we will assume that you have some experience with Spring Boot. This includes some common design patterns such as DTOs and services. We will also assume you have some basic knowledge of Spring data to store users in a database.

### Theory
The main features we will cover are different tactics for authentication and authorization. Authorization is the process of verifying the user to do what they are asking to do. Authentication is the process of verifying who it is that is sending a request. The three authentication strategies we will go over are HTTP basic, JWT, and OAuth.

### HTTP basic authentication
With HTTP basic authentication, each secured request requires an Authorization header. Each request sent to your controllers has headers. These are a bunch of key-value pairs that give extra information about the request. When I say *Authorization header*, this means the *key* of the header is the string *Authorization*. 

With HTTP Basic Authentication, the value must be in this format: `Basic <Credentials>`. The credentials, in this case, is the username and password joined by a colon and base 64 encoded. While simple, this strategy comes with some concerns. 

Base 64 encoding is easily reversible and thus practically unprotected. Although we can compensate with an HTTPS connection, it is still not ideal to have credentials attached to every request. The browser can sometimes send the Authorization header automatically if you have an active session. 

This can make your clients vulnerable to a CSRF (cross-site request forgery) attack. These are attacks where another web server can send a request while your client has an active session. With JWT authentication, however, we can avoid this issue completely.

### JWT authentication
JWT authentication is a fairly new technology but is increasingly becoming popular. It is a way to allow stateless authentication across your application. What this means is that you no longer have to store user information in a session to authenticate each request. Instead, we send this information with each request along with any data we want. 

How this works is that when the client logs in, the server gives them a JSON Web Token (JWT). Afterward, the client has to put that token in the Authorization header of each request after the word *Bearer* and space. The token has three different parts, the header, the payload, and the signature. The header is a JSON String with metadata about the token. 

The payload is also a JSON String but instead contains information for the request. The fields in the payload are known as claims. The payload must contain a claim known as the subject but you can also put any claims you need. This subject claim is simply an identifier for the user that sent the request. Both the header and payload are base 64 encoded but as mentioned earlier, anyone can easily decode them. Thus, you must not put any sensitive information in the payload. 

What makes JWT secure is the signature. The signature is the header and the payload encrypted with a secret key known as the secret. The secret makes it so that anyone who doesn’t know the key can not decrypt the signature. If someone modifies the header or payload, the server can decode the signature and see that it was tempered with. 

This also ensures that nobody can just make their own token to try to cheat the system. The Authorization header is also not automatically added to each request by the browser. As mentioned earlier, the browser automatically adding the header creates a vulnerability to CRSF. This way, we avoid the issue of CSRF altogether.

### OAuth
With OAuth, authentication is instead handled by a trusted third-party. This is when a website asks you to login using let's say your Google account instead of an account for that website. This may particularly be useful if your application uses services from Google that needs the user's Google account. 

**Note:** you could combine the use of OAuth and JWT authentication. The third-party could handle all the accounts for you and the initial login. Then after that initial login, we can give a JWT token to authenticate the further requests without using sessions. We won't be covering that strategy in this guide.

### Implementing security with HTTP basic authentication
Now that we covered what these authentication methods are, let’s start implementing them. What we are going to do is set up a Spring Boot application to have a database of users with encoded passwords. Then, we are going to configure HTTP basic authentication for every request. 

In our example, we will secure the following endpoints:

```java
    @Autowired
    private UserService userService;
    
    @PostMapping("/api/auth/signup")
    public ResponseEntity<Void> signUp(@RequestBody UserDto userDto){
    
       userService.saveUser(userDto);
       return ResponseEntity.noContent().build();
    
    }
    
    @GetMapping("/api/hello-world")
    public String helloWorld(){
    
       return "Hello World";
    
    }
    
    
    @GetMapping("/api/secret-admin-business")
    public Integer getMeaningOfLife(){
    
       return 42;
    
    }
```

We would want our signup endpoint to be completely public with no authentication. Meanwhile, the hello world endpoint should be accessible by any authenticated user. Lastly, `/api/secret-admin-business` should only be accessible by admins.

First, we create a new Spring Boot app from the Spring initializer. We are going to need the Spring starter security dependency, Spring web dependency, and the dependency for the database of your choice. 

To focus on the security aspect of things, I’m going to only briefly describe the data access layer. I will leave out the database configuration as well. 

Here we will work with the following User entity that we will store in the database:

```java
package me.john.amiscaray.springsecuritydemo.entities;

import me.john.amiscaray.springsecuritydemo.dtos.UserDto;

import javax.persistence.*;

@Entity
public class User {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long userId;

   @Column(nullable = false, length = 50, unique = true)
   private String username;


   @Column(nullable = false)
   private String password;

   @Column(nullable = false, length = 10)
   private String authority;

   private String secret;

   public User(UserDto dto){

       username = dto.getUsername();
       password = dto.getPassword();
       authority = "ROLE_USER";

   }
   // Getters, Setters, Empty constructor below ...


}
```

We will use the authority field to allow only admins to access the `/api/secret-admin-business` endpoint. We’ll also have corresponding DTO, `JpaRespository`, and `UserService` classes for this entity. The JpaRespository will have a single `findUserByUsername` method defined. Meanwhile, the `UserService` class will have a single `saveUser method`. This will convert a DTO into a User object and save it.

Next, we need to implement the `UserDetailsService` interface. Spring will use this class to access our users for authentication. You will notice we have to implement one method, `loadUserByUsername`. 

This method returns a `UserDetails` object and throws a `UsernameNotFoundException`. `UserDetails` however is an interface and we do not yet have an implementation. This interface will serve as a wrapper for our `User` object. We will use it to give extra information Spring security needs about our users. 

Let’s first create the following implementation of `UserDetails`:

```java
package me.john.amiscaray.springsecuritydemo.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AppUserDetails implements UserDetails {

   private final User user;

   public AppUserDetails(User user){

       this.user = user;

   }

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
       return List.of(new SimpleGrantedAuthority(user.getAuthority()));
   }

   @Override
   public String getPassword() {
       return user.getPassword();
   }

   @Override
   public String getUsername() {
       return user.getUsername();
   }

   @Override
   public boolean isAccountNonExpired() {
       return true;
   }

   @Override
   public boolean isAccountNonLocked() {
       return true;
   }

   @Override
   public boolean isCredentialsNonExpired() {
       return true;
   }

   @Override
   public boolean isEnabled() {
       return true;
   }

   public User getUser() {
       return user;
   }
}
```

For simplicity, we made our user’s accounts always active. This way, we can just hard code all the methods with account activation status. Now that we have a `UserDetails` implementation, we can finish implementing `UserDetailService`:

```java
package me.john.amiscaray.springsecuritydemo.services;

import me.john.amiscaray.springsecuritydemo.data.UserRepo;
import me.john.amiscaray.springsecuritydemo.entities.AppUserDetails;
import me.john.amiscaray.springsecuritydemo.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserDetailsService implements UserDetailsService {

   @Autowired
   private UserRepo userRepo;

   @Override
   public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
       Optional<User> user = userRepo.findUserByUsername(s);
       if(user.isPresent()){

           return new AppUserDetails(user.get());

       }else{

           throw new UsernameNotFoundException("User not found");

       }
   }
}
```

After that, we need to create a class to start configuring security. First, we need to create a subclass of the `WebSecurityConfigurerAdapter` class. That superclass has methods we can override to configure security, Then we have to add the `@Configuration` and `@EnableWebSecurity` annotations to that class. 

Finally, we add the following:

```java
@Autowired
private AppUserDetailsService userDetailsService;

@Override
protected void configure(HttpSecurity http) throws Exception {

    http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/secret-admin-business").hasAnyRole("ADMIN")
                .anyRequest().fullyAuthenticated()
                .and().httpBasic();

}

@Override
public void configure(WebSecurity web) throws Exception {

    web.ignoring()
        .antMatchers("/api/auth/signup");

}

@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    auth.userDetailsService(userDetailsService).passwordEncoder(getPasswordEncoder());

}

@Bean
public PasswordEncoder getPasswordEncoder(){

    return new BCryptPasswordEncoder(10);

}
```

In the first method, we restrict the `/api/secret-admin-business` endpoint to be called only by users who are admins. For Spring to consider the user an admin, their authority field must be the String “ROLE_ADMIN”. The `hasAnyRole` method adds the “ROLE_” prefix to the string we pass as the role. Then we specify that each request requires HTTP basic authentication. 

We also disable CSRF security for simplicity. In the next method, we make Spring security ignore the signup endpoint. This way, this endpoint will not need authentication as we discussed earlier. Notice that we also configured the use of a password encoder and created a bean for it. We have to make sure that before we save DTOs we first encode the password with the password encoder’s `encode` method.

Just like that, we have configured simple HTTP basic authentication. Not only that but our app has some role-based authorization too. Although role-based authorization isn't the only authorization method that Spring provides. Spring security also allows authorization on a method-level using annotations.

### Simple method-level authorization
As an impractical example, say we gave the `User` objects a new field called `secret`. This contains sensitive information only the owner of the secret should access. Then suppose we had an endpoint `/api/user/{username}/secret` which we can send a GET request to retrieve a user’s secret. 

The corresponding controller would call the following method from the `UserService` class:

```java
public String getSecret(String username){

    User user = userRepo.findUserByUsername(username).orElseThrow();
    return user.getSecret();

}
```

We need to secure this method so that our endpoint can only call it with the username of the logged-in user. First, we need to create a new class to allow configure method-level authorization:

```java
package me.john.amiscaray.springsecuritydemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(
  prePostEnabled = true)
public class MethodSecurityConfig 
  extends GlobalMethodSecurityConfiguration {
}
```

Notice how we set the `prePostEnabled` property to true. This allows us to use the `@PreAuthorize` and `@PostAuthorize` annotations. Adding these annotations to a method allows us to check the application uses it as intended. 

In our case, we would add the annotation to our `getSecret` method as follows:

```java
@PreAuthorize("#username == authentication.principal.username")
```

As the annotation’s value suggests, it ensures that the username passed is that of the logged-in user.

### Implementing JWT
Now let's try and see how to upgrade our application to use JWT based authentication. Unfortunately, configuring JWT gets more involved than setting up HTTP basic authentication. I have created as straightforward of an implementation as I could so you can follow along. 

We start by adding the following dependency:

```xml
<dependency>
   <groupId>com.auth0</groupId>
   <artifactId>java-jwt</artifactId>
   <version>3.10.3</version>
</dependency>
```

Then, we create the following service class:

```java
package me.john.amiscaray.springsecuritydemo.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import me.john.amiscaray.springsecuritydemo.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTAuthService {

   private final AuthenticationManager authenticationManager;
   private final AppUserDetailsService userDetailsService;
   private final String SECRET = "secret";

   @Autowired
   public JWTAuthService(AuthenticationManager authenticationManager,
                         AppUserDetailsService userDetailsService){

       this.authenticationManager = authenticationManager;
       this.userDetailsService = userDetailsService;

   }

   public String getJWT(UserDto dto){

       try {
           UserDetails user = userDetailsService.loadUserByUsername(dto.getUsername());
           Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                   dto.getUsername(),
                   dto.getPassword(),
                   user.getAuthorities()

           ));
       }catch (AuthenticationException ex){

           throw new IllegalArgumentException("User not found");

       }

       long TEN_HOURS = 36000000L;
       return JWT.create()
               .withSubject(dto.getUsername())
               .withExpiresAt(new Date(System.currentTimeMillis() + TEN_HOURS))
               .sign(Algorithm.HMAC512(SECRET.getBytes()));

   }

   public UsernamePasswordAuthenticationToken verify(String token){
       // Decode the token, verify it and get the subject
       String username = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
               .build()
               .verify(token)
               .getSubject();
       // If username is not null, get the UserDetails and return a new UsernamePasswordAuthenticationToken
       if(username != null){

           UserDetails userDetails = userDetailsService.loadUserByUsername(username);
           return new UsernamePasswordAuthenticationToken(userDetails,
                   null, userDetails.getAuthorities());

       }
       return null;

   }



}
```

The `getJWT` method tries to find the user with the username found in the DTO. Then it tries to authenticate the user using the given credentials and the authorities stored in the `UserDetails`. If the authentication was successful, we create the JWT token. We set the subject as their username and an expiration date of 10 hours from the current time. 

Then we sign it with a particular encryption algorithm and our secret. In the `verify` method we decode the given JWT token using our secret, verify it and retrieve the subject which would be the user. We then retrieve the `UserDetails` of the user. Using the `UserDetails` we created and return a `UsernamePasswordAuthenticationToken` object. We will use this object to tell Spring who it is that sent the request.

Now that we got a service to create and verify JWT tokens, we need to create an endpoint to retrieve the JWT:

```java
@PostMapping("/api/auth/login")
public String JWTLogin(@RequestBody UserDto userDto){

   return authService.getJWT(userDto);

}
```

Finally, we need to add a filter to verify the JWT tokens sent with every request. In case you don’t know, filters are a class used to intercept requests. 

They are the foundation of what makes Spring security work behind the scenes:

```java
package me.john.amiscaray.springsecuritydemo.filter;

import me.john.amiscaray.springsecuritydemo.services.JWTAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter extends BasicAuthenticationFilter {

   private final JWTAuthService authService;

   public JWTFilter(AuthenticationManager authenticationManager, JWTAuthService authService){
       super(authenticationManager);
       this.authService = authService;

   }

   @Override
   protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

       // Get Authorization header
       String authorizationHeader = httpServletRequest.getHeader("Authorization");
       // Remove the "Bearer" prefix
       String token = authorizationHeader.substring(7);
       // Verify token
       UsernamePasswordAuthenticationToken auth = authService.verify(token);

       SecurityContextHolder.getContext().setAuthentication(auth);
       // send request through next filter
       filterChain.doFilter(httpServletRequest, httpServletResponse);


   }
}
```

Finally, we need to update our security configuration to add this filter. Then we need to remove HTTP basic and make sure not to check for a JWT token when sending a login request:

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/secret-admin-business").hasAnyRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTFilter(authenticationManager(), authService))
                // Remove sessions since we are now using JWT
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    
    }
    
    @Override
    public void configure(WebSecurity web) throws Exception {
    
        web.ignoring()
            .antMatchers("/api/auth/signup")
            .antMatchers("/api/auth/login");
    
    }
```
### Implementing OAuth
Now let’s have a look at how we can use OAuth as our authentication strategy. As our authentication provider, we will be using GitHub. For simplicity let’s start from scratch with a new Spring Boot project. This project will use the Spring Security, OAuth2 client, and Spring web dependencies. So we have something to see as our homepage, we will add the following controller:

```java
@RestController
public class HomeController {

    @GetMapping("/")
    public String getWelcomeMessage(){

        return "Hello User!";

    }

}
```

Then, go to GitHub, click settings, developer settings, OAuth apps, and register a new application. 

Then add the following properties:

![OAuth With Github Config](/engineering-education/an-all-in-one-spring-security-crash-course-for-java-developers/oauth-with-github-config.png)

The Authorization callback URL, is the URL we will send to the user when authenticated. After registering the application, Github will give a `client ID` and the option to generate a `client secret`. We will need to add these to our spring project’s properties. 

For simplicity, we will be setting the properties as a YAML file instead of the usual properties file. You would simply rename the `application.properties` file to `application.yml`. 

Then add the following configuration:

```YAML
spring:
 security:
   oauth2:
     client:
       registration:
         github:
           clientId: YOUR-CLIENT-ID
           clientSecret: YOUR-CLIENT-SECRET
```

Then, when you run the app and go to the homepage you should see the following:


![OAuth With Github Page](/engineering-education/an-all-in-one-spring-security-crash-course-for-java-developers/oauth-with-github-page.png)

### Conclusion
In this guide, we went through how to use many of the key Spring security features. Although we went through rather quickly, hopefully, this guide has given you a good idea on how to secure your Spring Boot applications. As a next step, I would suggest trying to use this knowledge to secure an existing application you have. 

I would also recommend you try to add claims to the JWT token and try to parse them in a request. You can also try to combine OAuth and JWT as mentioned earlier. As a final note, you can find the final code for this guide [here](https://github.com/john-amiscaray/Spring-Security-Crash-Course).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

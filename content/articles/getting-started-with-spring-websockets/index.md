---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-spring-websockets/
title: Getting Started with Spring WebSockets in Java
description: A beginner's guide to WebSockets and implementing them in Spring with Java.  We will go over how to implement WebSockets in Java using Spring Boot, testing it with a simple web client.
author: john-amiscaray
date: 2021-04-19T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-spring-websockets/hero.jpg
    alt: Spring WebSockets example image
---
For those who don’t know, WebSocket is a communications protocol. It is useful for opening persistent two-way connections between web client and server.
<!--more-->
Nowadays, web applications have become much more powerful than they once were. You can now have real-time functionality in the form of chat applications or even multiplayer games. All this has been made possible by the use of WebSockets.

This allows you to establish real-time interaction you could never do with only HTTP. In this guide, we will explore in further detail the theory behind this protocol. 

Not only that but we'll explore a subprotocol that you can use alongside it. Then, we will go over how to implement WebSockets in Java using [Spring Boot](https://spring.io/projects/spring-boot), testing it with a simple web client. We'll also go over some of the basics to secure WebSocket connections.

### Prerequisites
To follow this guide you should have a solid understanding of the fundamentals of Spring Boot. These include, for example, creating rest endpoints and the common design patterns. 

Finally, for the security part of this guide, you would need to know [Spring Security](https://www.section.io/engineering-education/an-all-in-one-spring-security-crash-course-for-java-developers/) and [Spring Data](https://spring.io/guides/gs/accessing-data-jpa/) to store and authenticate users.

### Why do you need WebSockets?
Before we can understand WebSockets, let’s have a deeper look at the traditional HTTP protocol. This way we can understand the problems you can solve with WebSockets. With HTTP, the client talks to the server in a series of requests and responses. 

With each request, the client opens up a new connection until the server sends a response. This works fine for a typical case where you only need to retrieve data from the server when the page loads. 

Let’s say you wanted to build a more complex application like a chat app. In a chat app, you need to be able to retrieve messages from the server in real-time. If you had to open and close a new connection for each message it would get very slow. 

The server needs to be able to pass you messages as soon as someone sends one to you as well. Remember that in HTTP the server can only talk to you as a response to your requests. 

How can it send you the messages fast enough if it can only communicate when you initiate? In other words, the server needs to be able to *approach* the client with the message as soon as someone sends it to them. 

WebSocket protocol seeks to fix these issues. The whole purpose of it is to allow for one persistent two-way connection.

### A high-level overview of the WebSocket protocol
The client first sends a special request called a *handshake*. You can think of the handshake as the client asking the server to talk via WebSocket. If the response is successful then the server opens up the WebSocket connection for as long as they need it. With the connection open, the client and server send messages to URL endpoints just like HTTP. 

Yet unlike HTTP, the protocol does not specify a message format. Instead, the client and server can agree on a sub-protocol during the handshake. This sub-protocol would define the way we format all messages sent and received. The sub-protocol we will be using in this tutorial is called *STOMP*.

### STOMP protocol
STOMP (simple text orientated messaging protocol) is a sub-protocol much like HTTP. Each time either party sends data, they must send it in the form of a *frame*. A frame takes a structure like an HTTP request. 

It has a verb associated with the intention of the frame (ex. *CONNECT*, *DISCONNECT*) like the HTTP methods. It also contains a header to give extra information to the other party and a body to give the main content. As you can see, the design of STOMP is almost identical to the way we send HTTP requests and will be intuitive to use.

### Implementing WebSockets in Spring
Now that you have a good understanding of WebSockets, let’s implement them in Spring. What we are going to build is a simple application that takes messages from users and sends them back to everyone. Each user is going to send messages to an endpoint `/app/chat` and subscribe to receive messages from `/topic/messages`. 

Every time a user sends a message to `/app/chat` our server will send the message back to `/topic/messages`. For simplicity, I will be making a simplistic client using plain HTML and JavaScript. It will be running on its own server separate from our Spring Boot application.

First, we need to create a new Spring Boot project from the [Spring initializer](https://start.spring.io/). The only dependency we will need for now is the *spring-boot-starter-websocket* dependency. Next, you need to create a configuration class to register our STOMP endpoints and to allow us to use an extra tool called `sockjs`. 

What `sockjs` does is it allows for backup plans in case the client cannot connect via WebSocket. If this happens it will try to connect using another protocol to try to mimic a WebSocket connection. This is particularly useful if we want to allow the use of older browsers that do not support WebSockets. 

The following code should do that for us:

```java
package me.john.amiscaray.springwebsocketdemo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    
        // Set prefix for the endpoint that the client listens for our messages from
        registry.enableSimpleBroker("/topic");
        
        // Set prefix for endpoints the client will send messages to
        registry.setApplicationDestinationPrefixes("/app");
    
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
    
        // Registers the endpoint where the connection will take place
        registry.addEndpoint("/stomp")
            // Allow the origin http://localhost:63343 to send messages to us. (Base URL of the client)
            .setAllowedOrigins("http://localhost:63343")
            // Enable SockJS fallback options
            .withSockJS();
    
    }

}
```

Pretty easy right? Now, all we need to do on the server-side is set up the logic for when we receive our messages. Just like when we are creating REST endpoints, we will be using controllers to handle the frames. 

The only difference is that we will be annotating our methods differently to say that we are sending them to WebSocket endpoints. Before we do that, we will define the following DTO to represent the messages transferred.

In case you don't know, a DTO (data transfer object) is an object dedicated to representing a JSON payload:

```java
package me.john.amiscaray.springwebsocketdemo.dtos;

public class MessageDto {

    private String message;
    
    public String getMessage() {
    
        return message;
    
    }
    
    public void setMessage(String message) {
    
        this.message = message;
    
    }

}
```

Now that we got that out of the way, here’s our controller:

```java
package me.john.amiscaray.springwebsocketdemo.controllers;

import me.john.amiscaray.springwebsocketdemo.dtos.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    // Handles messages from /app/chat. (Note the Spring adds the /app prefix for us).
    @MessageMapping("/chat")
    // Sends the return value of this method to /topic/messages
    @SendTo("/topic/messages")
    public MessageDto getMessages(MessageDto dto){
    
        return dto;
    
    }

}
```

You will notice we have a `@MessageMapping` annotation with the value `/chat`. We are using this to specify that our method receives messages from `/app/chat`. We also have the `@SendTo` annotation with the value `/topic/messages`. 

We add this to tell Spring to send the return value to the given endpoint. All we are doing here is taking messages sent from one endpoint and redirecting to another.

Now we need to connect to these endpoints on our client-side which will be a simple HTML page. Insert the following code into the body tag of your HTML:

```HTML
<label for="message-input">Enter message to send</label>
<input type="text" id="message-input">

<button onclick="sendMessage()">send</button>

<ul id="message-list"></ul>

<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.0/sockjs.js" integrity="sha512-lyIq9fRcCeSCXhp41XC/250UBmypAHV8KW+AhLcSEIksWHBfhzub6XXwDe67wTpOG8zrO2NAU/TYmEaCW+aQSg==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js" integrity="sha512-iKDtgDyTHjAitUDdLljGhenhPwrbBfqTKWO1mkhSFH3A7blITC9MhYon6SjnMhp4o0rADGw9yAC6EW4t5a4K3g==" crossorigin="anonymous"></script>
<script src="./main.js"></script>
```

In the script tags, we are importing the stomp.js and sockjs-client libraries to connect to our server. Let’s have a look at the contents of that `main.js` file we linked to see how we will use them:

```javascript
// Try to set up WebSocket connection with the handshake at "http://localhost:8080/stomp"
let sock = new SockJS("http://localhost:8080/stomp");

// Create a new StompClient object with the WebSocket endpoint
let client = Stomp.over(sock);

// Start the STOMP communications, provide a callback for when the CONNECT frame arrives.
client.connect({}, frame => {
    // Subscribe to "/topic/messages". Whenever a message arrives add the text in a list-item element in the unordered list.
    client.subscribe("/topic/messages", payload => {
    
        let message_list = document.getElementById('message-list');
        let message = document.createElement('li');
        
        message.appendChild(document.createTextNode(JSON.parse(payload.body).message));
        message_list.appendChild(message);

    });

});

// Take the value in the ‘message-input’ text field and send it to the server with empty headers.
function sendMessage(){

    let input = document.getElementById("message-input");
    let message = input.value;
    
    client.send('/app/chat', {}, JSON.stringify({message: message}));

}
```

That might be quite a bit to unpack so let’s go step by step. First, we create a sockjs client instance with the URL where the handshake will take place. Then we create a stomp client instance using our sockjs client that we will use to connect to the server. 

With this stomp client instance, we call the `connect` method with an empty object and a callback function. The empty object represents the headers we will send with our frame. In the callback function, we subscribe to receive messages at our `/topic/messages` endpoint. 

When we subscribe we provide another callback that will take the frame from the server and put the message contents on the HTML page. Next, we have our `sendMessage` function. This simply takes the value of our input element and sends it to the `/app/chat` endpoint with empty headers.

Now if you test out our client, you will notice every time you press send it will add the text to the screen. More importantly, try opening it up on two windows side by side. You will see that both windows will receive the message.

### Securing our endpoints
One important flaw with our back-end is that anyone can connect to our server whether we know them or not. We need to add authentication to our endpoints so that only valid users can send messages. As far as I know, there isn’t a particular standard for securing WebSockets since it is still a relatively new technology. 

Yet, I have found a reasonably effective way to secure our endpoints that you could use. Before we start coding there are a couple of things to take note of. The JavaScript WebSocket libraries don’t allow you to add Authorization headers to the handshake. 

Instead, we will authenticate the user using the first *CONNECT* frame they send. In that frame, the user will send headers with their credentials which we will then check. Sending the credentials in the header is not the most secure way of doing this but it can give you ideas for your own system. 

For example, you can find a way to send a [JWT token](https://jwt.io) in the header. The way we are going to intercept the frames is with an implementation of the `ChannelListener` interface. As the name suggests, it defines a class you can use to intercept frames.

### Implementing WebSocket security
First, we need to add the *spring-boot-starter-security* dependency to our project. Then, we need to set up a `User` entity and implement `UserDetailsService`. To focus on the topic of this guide we will skip over that. Know that we will have a few classes in the background to handle that for us. 

These include a `User`, `UserService`, `AppUserDetailsService`, and an `AppUserDetails` class. Assuming you know Spring Data and Spring Security design patterns, you should understand the purpose of these classes. 

The `User` class is an entity representing a user and the `UserService` class would be for querying these users. Meanwhile, the `AppUserDetails` class is a class used to store account information. We would then query this information using the `AppUserDetailsService` class. 

Next, we need to configure Spring security for our application:

```java
package me.john.amiscaray.springwebsocketdemo.config;

import me.john.amiscaray.springwebsocketdemo.service.AppUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AppUserDetailsService userDetailsService;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    
        // Set up simplified security settings requiring Spring to authenticate every request
        http.csrf().disable()
            .authorizeRequests()
            .anyRequest()
            .fullyAuthenticated();
    
    }
    
    @Override
    public void configure(WebSecurity web) throws Exception {
    
        // Tell Spring to ignore securing the handshake endpoint. This allows the handshake to take place unauthenticated
        web.ignoring().antMatchers("/stomp/**");
    
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    
    }
    
    // Create an AuthenticationManager bean to Authenticate users in the ChannelInterceptor
    @Bean
    public AuthenticationManager authManager() throws Exception {
    
        return this.authenticationManager();
    
    }
    
    @Bean
    public PasswordEncoder passwordEncoder(){
    
        return new BCryptPasswordEncoder(10);
    
    }

}
```

Now, we need to create a simple service class to take the given username and password and validate them:

```java
package me.john.amiscaray.springwebsocketdemo.service;

import me.john.amiscaray.springwebsocketdemo.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class WebSocketAuthenticatorService {

@Autowired
private UserService userService;

@Autowired
private PasswordEncoder passwordEncoder;

@Autowired
private AuthenticationManager authManager;

public UsernamePasswordAuthenticationToken getAuthenticatedOrFail(String username, String password) throws AuthenticationException {

        // Check the username and password are not empty
        if (username == null || username.trim().isEmpty()) {
        
            throw new AuthenticationCredentialsNotFoundException("Username was null or empty.");
        
        }
        
        if (password == null || password.trim().isEmpty()) {
        
            throw new AuthenticationCredentialsNotFoundException("Password was null or empty.");
        
        }
        
        // Check that the user with that username exists
        User user = userService.findUserByUsername(username);
        
        if(user == null){
        
            throw new AuthenticationCredentialsNotFoundException("User not found");
        
        }
        
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            username,
            password,
            Collections.singletonList(new SimpleGrantedAuthority(user.getAuthority()))
        );
        
        // verify that the credentials are valid
        authManager.authenticate(token);
        
        // Erase the password in the token after verifying it because we will pass it to the STOMP headers.
        token.eraseCredentials();
        
        return token;
    
    }

}

```

Now that we created that service class, we are ready to create our `ChannelInterceptor`:

```java
package me.john.amiscaray.springwebsocketdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthChannelInterceptor implements ChannelInterceptor {

private final WebSocketAuthenticatorService service;
private static final String USERNAME_HEADER = "username";
private static final String PASSWORD_HEADER = "password";

    @Autowired
    public AuthChannelInterceptor(WebSocketAuthenticatorService service){
    
        this.service = service;
    
    }
    // Processes a message before sending it
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        // Instantiate an object for retrieving the STOMP headers
        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        // Check that the object is not null
        assert accessor != null;
        // If the frame is a CONNECT frame
        if(accessor.getCommand() == StompCommand.CONNECT){
            
            // retrieve the username from the headers
            final String username = accessor.getFirstNativeHeader(USERNAME_HEADER);
            // retrieve the password from the headers
            final String password = accessor.getFirstNativeHeader(PASSWORD_HEADER);
            // authenticate the user and if that's successful add their user information to the headers.
            UsernamePasswordAuthenticationToken user = service.getAuthenticatedOrFail(username, password);
            accessor.setUser(user);
            
        }
        
        return message;
    
    }

}
```

Pretty intuitive right? If we receive a *CONNECT* frame from our client then we check the headers for a username and password. Using the username and password we authenticate the user. 

Now, all we need to do server-side is register our `ChannelInterceptor` for Spring to use. To do this, we would add the following method to our WebSocket configuration class.

```java
@Override
public void configureClientInboundChannel(ChannelRegistration registration) {

    // Add our interceptor for authentication/authorization
    registration.interceptors(channelInterceptor);

}
```

Finally, we need to account for these changes on the client-side application. We simply update the JavaScript code above editing the call to connect to our server:

```javascript
/*
 Same as the above example, only adding username and password headers. The rest should stay the same. 
 See "Implementing WebSockets in Spring" above for details of how the client works.
*/
client.connect({'username': 'Jimbob', 'password': 'pass'}, (frame) => {

    client.subscribe("/topic/messages", payload => {
    
        let message_list = document.getElementById('message-list');
        let message = document.createElement('li');
        
        message.appendChild(document.createTextNode(JSON.parse(payload.body).message));
        
        message_list.appendChild(message);
    
    });

});
```

### Conclusion
In this guide, we went through the basics of WebSockets and STOMP and how to implement them in Spring. We also covered the basics of securing your WebSocket connections by intercepting a CONNECT frame. With this knowledge, you can begin to play around and create your own interactive apps. 

You can try building a chat app or if you're feeling ambitious a multiplayer game. As a further exercise I would suggest trying to improve on the security I added to it. 

Try to find a way to avoid adding the credentials into the headers in plain text. With that being said, you can find all the code written in this guide in this [repo](https://github.com/john-amiscaray/Getting-Started-With-Spring-WebSockets). 

Happy coding!

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
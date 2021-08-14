---
layout: engineering-education
status: publish
published: true
url: /fcm-with-spring-and-angular/
title: Sending Notifications with Spring Boot, Angular, and Firebase Cloud Messaging
description: A starting guide on sending notifications to an Angular application. To do this, we will be using a Spring Boot backend and Firebase Cloud Messaging.
author: john-amiscaray
date: 2021-08-14T00:00:00-04:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fcm-with-spring-and-angular/hero.jpg
    alt: Spring Angular FCM example image
---
Notifications are a great way to increase user engagement. By keeping the users notified of events in your app that interest them, you can keep them coming back to you.
<!--more-->
Many apps even rely on notifications as a core feature. For example, some reminder apps help you remember important events. What would they be without being able to notify you while inactive? Either way, sending notifications is an important skill to learn as a developer.

In this guide, we will be learning how to send notifications to an Angular application. To make this possible, we will be using a Spring Boot backend with the help of **Firebase Cloud Messaging**.

By the end of this guide, you should have a good understanding of how to send notifications in your next full-stack application.

### Table of contents
- [Understanding the high-level architecture of our project](#understanding-the-high-level-architecture-of-our-project)
- [Setting up our backend](#setting-up-our-backend)
- [Creating a Firebase Cloud Messaging service](#creating-a-firebase-cloud-messaging-service)
- [Exposing our service through a REST controller](#exposing-our-service-through-a-rest-controller)
- [Setting up Firebase on our front-end](#setting-up-firebase-on-our-front-end)
- [Requesting permission to send notifications](#requesting-permission-to-send-notifications)
- [Subscribing to Receive notifications](#subscribing-to-receive-notifications)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you need to have:
- Basic Angular knowledge including the CLI, HTTP client, and basic templating.
- Basic Spring Boot concepts. This includes Spring MVC and the basic design patterns (i.e. [beans](https://www.baeldung.com/spring-bean), and [stereotype annotations](https://medium.com/javarevisited/spring-stereotype-annotations-1469ca0c3ad2)).
- Ideally, some Kotlin experience, since we will be using it. This is not required as all the concepts should be understandable by a pure Java developer.
- Preferably, the [builder design pattern](https://howtodoinjava.com/design-patterns/creational/builder-pattern-in-java/) since we will heavily use it in the backend.

### Understanding the high-level architecture of our project
#### Overview
To start, it is important to understand at a high level how this project will work.

When the user first opens the application, we request permission to send notifications. If they grant permission, then Firebase will send a token to identify their device. Then, the client sends the token to our Spring Boot app so we can use it to send notifications to that user.

Whenever our backend wants to send a notification, it will give details about the desired notification to Firebase. From there, the Firebase backend will send the notification to the correct device. 

#### What will happen on the client-side?
On the client side, we will either show the message within the app or as a notification popup. The former when our application is opened and the latter when our application is closed.

Although you may be asking: **How can we show the notification when our application is inactive?** We would do this with the help of a **service worker**.

##### What is a service worker?
A service worker is a special script that runs on a separate thread from your application. It allows you to intercept requests, cache data for offline use, and in our case - send notifications.

Since a service worker is separate from our app, we can use it to send notifications, even while the app is inactive. Although, when our app is active, we will let our angular project handle the message by displaying it on the page.

#### What will happen on the server-side?
On the server side, our Spring Boot app will use an SDK from Firebase called the **Admin SDK**. This SDK allows our application to interact with Firebase to send notifications for us.

When we initialize Firebase in the Firebase console, they will give us a special JSON file that we will use to authorize our Spring Boot app to send notifications.

Whenever we want to send notifications, we have to create a `Message` object. This will contain all the info about the notification we want to send.

This will include the title, description, an icon URL, and any platform-specific information.

We have two ways to send the notifications - a topic or direct notification. 
    
##### Topic notifications vs direct notifications
A topic notification is a notification with a specified tag known as a **topic**. Users will subscribe to be notified of any messages with a topic of their choice.

Whenever a user subscribes to a topic, they will send their token and the name of the topic to subscribe, to our Spring Boot app. Using this, we can tell Firebase to send them notifications about that topic.

Additionally, we also have the option to send a direct notification. Here, we specify in the `Message` object, the token of the user to notify. Then, Firebase will send the notification to that particular user.

#### Illustrating the full architecture
To illustrate how this entire project will work, here is a handy flow chart I made to picture it. Hopefully, this will clear up any confusion you may have had about the architecture:

![a flow chart to illustrate the architecture](/engineering-education/fcm-with-spring-and-angular/flow-chart.png)

### Setting up our backend
#### Initializing our Spring Boot application
As always, we start by generating a Spring Boot project using the [Spring initializer](https://start.spring.io/).

We will be selecting `Kotlin` as the language, `Maven` as the dependency manager, the packaging to `jar`, and the Java version to `11`. For our dependencies, the only one we need here is the **Spring Web** dependency.

Of course, make sure to set the group and artifact ids, along with the package name and project name.

#### Setting up Firebase
1. Go to the [Firebase website](https://firebase.google.com/) having logged in with your Google account.
2. Click **Go to console** on the upper right corner. 
3. Select **Add project** to create a new Firebase project. From there, it will guide you to create the project which should be very straightforward.
4. Press the gear icon on the left next to the **Project overview** button, then select **Project settings**.
5. Click **Service accounts** in the upper area under the **Project settings**.
6. Below, generate a new private key. This private key is the JSON file I mentioned earlier to authorize our backend.
7. Add a property to the `application.properties` file with the file path to the private key:

```kotlin
app.firebase-config-file=firebase-config/[your-file-name-goes-here].json
```

Now that we have the private key, we can start integrating Firebase with our Spring Boot app.

To start, place the JSON file in the `resources` folder under a new folder called `firebase-config`.
Next, we need to add the Firebase admin SDK to our project using Maven.

Insert the following dependency within the **dependencies** tag of your `pom.xml` file:

```XML
<dependency>
    <groupId>com.google.Firebase</groupId>
    <artifactId>Firebase-admin</artifactId>
    <version>7.2.0</version>
</dependency>
```

Then, we need to create a new service bean which we will use to add Firebase to your backend. Using the `@Value` annotation, we first inject the file path of the private key to a field:

```kotlin
@Service
class FirebaseInitializer {
    @Value("\${app.Firebase-config-file}")
    lateinit var FirebaseConfigPath: String
}
```

In case you don’t know, the `@Value` annotation injects values from the `application.properties` file into a field.

> Here, we add a `\` in front of the `$` to escape Kotlin’s string interpolation. Don’t be confused and think that we are interpolating a variable into the string, this is a raw string.

Spring boot will read the property name within the brackets and inject the value of that property into the field.

Within that class, we also need to create a function annotated with `@PostConstruct` to get access to Firebase. For some context: `@PostConstruct` tells Spring to run the function after the bean’s properties were initialized:

```kotlin
@Value("\${app.Firebase-config-file}")
lateinit var FirebaseConfigPath: String

// creates a logger we can use to log messages to the console. This is just to format our console messages nicely.
var logger: Logger = LoggerFactory.getLogger(FirebaseInitializer::class.java)

@PostConstruct
fun initialize(){
   // Get our credentials to authorize this Spring Boot application.
   try {
       val options = FirebaseOptions.builder()
               .setCredentials(GoogleCredentials.fromStream(ClassPathResource(FirebaseConfigPath).inputStream)).build()
       // If our app Firebase application was not initialized, do so.
       if (FirebaseApp.getApps().isEmpty()) {
           FirebaseApp.initializeApp(options)
           logger.info("Firebase application has been initialized")
       }
   } catch (e: IOException) {
       logger.error(e.message)
   }

}
```

With all this, our Spring Boot application should be configured.

### Creating a Firebase Cloud Messaging service
To start, let’s create a service to send notifications and subscribe users to a topic.

But first, let’s create a few model classes to represent a notification:

```kotlin
abstract class AppNotification(open val title: String, open val message: String)

data class TopicNotification(val topic: String, override val title: String,
                             override val message: String): AppNotification(title, message)

data class DirectNotification(val target: String, override val title: String,
                              override val message: String): AppNotification(title, message)
```

Using these classes, we can create a function in our service to send direct notifications:

```kotlin
package me.john.amiscaray.services

import org.springframework.stereotype.Service
import com.google.Firebase.messaging.*
import me.john.amiscaray.dtos.SubscriptionRequest
import me.john.amiscaray.dtos.DirectNotification
import me.john.amiscaray.dtos.TopicNotification

@Service
class FCMService {
   fun sendNotificationToTarget(notification: DirectNotification){
       val message = Message.builder()
                // Set the configuration for our web notification
               .setWebpushConfig(
                       // Create and pass a WebpushConfig object setting the notification
                       WebpushConfig.builder()
                               .setNotification(
                                       // Create and pass a web notification object with the specified title, body, and icon URL 
                                       WebpushNotification.builder()
                                               .setTitle(notification.title)
                                               .setBody(notification.message)
                                               .setIcon("https://assets.mapquestapi.com/icon/v2/circle@2x.png")
                                               .build()
                               ).build()
               )
                // Specify the user to send it to in the form of their token  
               .setToken(notification.target)
               .build()
       FirebaseMessaging.getInstance().sendAsync(message)
   }
}
```

As you can see, creating the notifications is pretty straightforward if you know the builder design pattern. Since our platform is the web, we pass a `WebpushConfig` object to the builder.

Finally, after setting the notification data, we set the token to specify who the message is for. From there, we call the `sendAsync` method to send the message. 

Likewise, to send a topic notification, we create a similar function in our service. The only difference is we specify a topic instead of a token:

```kotlin
// Same code as above, the only difference is we call setTopic instead of setToken with the appropriate topic
fun sendNotificationToTopic(notification: TopicNotification){
    val message = Message.builder()
            .setWebpushConfig(
                    WebpushConfig.builder()
                            .setNotification(
                                    WebpushNotification.builder()
                                            .setTitle(notification.title)
                                            .setBody(notification.message)
                                            .setIcon("https://assets.mapquestapi.com/icon/v2/incident@2x.png")
                                            .build()
                            ).build()
            ).setTopic(notification.topic)
            .build()

    FirebaseMessaging.getInstance().sendAsync(message)
}
```

To finish this service, let’s create a function to subscribe a user to a specified topic. Before that, let’s create a model object to represent a subscription request:

```kotlin
// The subscriber field specifies the token of the subscribing user
data class SubscriptionRequest(val subscriber: String, val topic: String)
```

With that class created, here is the function to subscribe a user to a topic:

```kotlin
fun subscribeToTopic(subscription: SubscriptionRequest){

   FirebaseMessaging.getInstance().subscribeToTopic(listOf(subscription.subscriber), subscription.topic)

}
```

### Exposing our service through a REST controller
#### Creating the REST Controller
Now that we have our Firebase Cloud Messaging service, all we need to do is create a REST controller to expose it.

For example, we are going to have the client send requests to this controller to send notifications to themself. A real production application would probably not be built like that. 

Assuming you have a solid background in Spring MVC, this should be straightforward:

```kotlin
package me.john.amiscaray.controllers

import me.john.amiscaray.dtos.SubscriptionRequest
import me.john.amiscaray.dtos.DirectNotification
import me.john.amiscaray.dtos.TopicNotification
import me.john.amiscaray.services.FCMService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class NotificationController(private val fcm: FCMService) {
   @PostMapping("/notification")
   fun sendTargetedNotification(@RequestBody notification: DirectNotification){
       fcm.sendNotificationToTarget(notification)
   }

   @PostMapping("/topic/notification")
   fun sendNotificationToTopic(@RequestBody notification: TopicNotification){
       fcm.sendNotificationToTopic(notification)
   }

   @PostMapping("/topic/subscription")
   fun subscribeToTopic(@RequestBody subscription: SubscriptionRequest){
       fcm.subscribeToTopic(subscription)
   }
}
```

#### Configuring CORS
The last thing we need to do for this to work is to configure [CORS](https://youtu.be/4KHiSt0oLJ0). This way, our client will be allowed to send any requests it wants to our backend.

To do this, add the following bean:

```kotlin
@Bean
fun cors(): WebMvcConfigurer {
   return object : WebMvcConfigurer{
       override fun addCorsMappings(registry: CorsRegistry) {
           // Allow our client (on localhost:4200) to send requests anywhere in our backend
           registry.addMapping("/**").allowedOrigins("http://localhost:4200")
       }
   }
}
```

### Setting up Firebase on our front-end
Now that we have our back-end created, we can start creating our front-end.

As always, we begin by generating an angular project using the CLI. Then, we need to add Firebase to our angular project using the following command:

```bash
ng add @angular/fire
```

Next, go to the project settings of your Firebase console. Below, you should see a code snippet with a Javascript object like so:

![firebase config object](/engineering-education/fcm-with-spring-and-angular/firebase-config.png)

You will need to copy this to your environment files:

```typescript
export const environment = {
  production: false,
  FirebaseConfig: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
  }
};
```

We need this data to authorize our angular application to use our Firebase project.

Using this data, we can initialize Firebase in our app module file:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { environment } from "../environments/environment";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.FirebaseConfig),
    AngularFireMessagingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
``` 

To finish our setup process, we need to find the sender ID in our Firebase console.

First, press the gear next to the project overview button, then go to the project settings and click on *Cloud Messaging* above. The sender ID could be found under the *project credentials*. 

Copy the sender ID and paste it into a JSON file named `manifest.json` like so:

```json
{
  "gcm_sender_id": "your-sender-ID"
}
```

This file should be in the `src` folder at the same level as the `index.html` file. We need to tell Angular that this file is an asset file so that it is in the right directory when we build our project.

To do this, open your `angular.json` file and look for any array properties called **assets**. Append the following string at the end of these arrays: *"src/manifest.json"*.

Finally, link the manifest file in the head tag of your `index.html` file like so:

```html
<link rel="manifest" href="manifest.json">
```
 
With that done, our Angular app should be configured.

### Requesting permission to send notifications
With everything configured, now we need to ask for permission to send notifications.

As soon as the user grants permission, Firebase will be able to send us a token to identify them. Using the token, we will send HTTP requests to our backend to send notifications and subscribe to a topic.

To make this happen, first, inject the following objects into our app component’s constructor:

```typescript
import {Component, OnInit} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(private msg: AngularFireMessaging, private http: HttpClient) { }

}
```

Then, add the following `ngOnInit` method in the app component class:

```typescript
import {Component, OnInit} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(private msg: AngularFireMessaging, private http: HttpClient) { }

    ngOnInit() {
    
     this.msg.requestToken.subscribe(token => {
    
       console.log(token);
       this.http.post('http://localhost:8080/notification', {
         target: token,
         title: 'hello world',
         message: 'First notification, kinda nervous',
       }).subscribe(() => {  });
    
       this.http.post('http://localhost:8080/topic/subscription', {
         topic: 'weather',
         subscriber: token
       }).subscribe(() => {  });
    
     }, error => {
    
       console.log(error);
    
     });
    
    }

}
```

First, we subscribe to an observable which represents a token request to Firebase.

The first time a user executes this, it will ask them for permission to send notifications. The first function we pass to the `subscribe` method is for when the user accepts permission and Firebase gives us a token.

Meanwhile, the second function is for, if they deny permission or some other error occurs. Within the first function, we send a post request to our server at `http://localhost:8080/notification`.

That `POST` request has a request body representing a `DirectNotification` object (Recall, in our backend that we created a class called `DirectNotification`). This class maps to the object we are sending here. We also send a post request to `http://localhost:8080/topic/subscription`.

This request represents us subscribing to messages with the topic of **weather**.

The request body maps to a `SubscriptionRequest` class defined in our backend. 

### Subscribing to receive notifications
#### Receiving notifications while the app is active
While the application is active, we will show the notifications on the page itself.

To do so, we will create a `Message` object to store the details of the notification. With every notification sent, we will add it to an array of `Message` objects. These messages will be displayed on the screen using the `ngFor` directive.

To start, we need to define the `Message` class:

```typescript
export class Message{

  constructor(public title: string, public body: string, public iconUrl: string) {  }

}
```

Then, we need to declare our `messages` array in our app component class:

```typescript
import {Component, OnInit} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/messaging";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    messages: Array<Message> = [];
    // The rest of the code goes here...
}
```

Next, add the following code at the end of the `ngOnInit` method:

```typescript
this.msg.onMessage((payload) => {
 // Get the data about the notification
 let notification = payload.notification;
 // Create a Message object and add it to the array
 this.messages.push({title: notification.title, body: notification.body, iconUrl: notification.icon});
});
```

Finally, display these messages in our `app.component.html` file with a template like this:

```html
<h1>Hello World</h1>
<h3>These are your messages:</h3>
<ul>
 <li *ngFor="let message of messages">
   <h3>{{message.title}}</h3>
   <p>
     {{message.body}}
   </p>
   <img [src]="message.iconUrl" alt="message-icon">
 </li>
</ul>
```

#### Receiving the notifications while the app is inactive
As we mentioned in the project architecture, we need to use a service worker in the case of the app being closed.

Firebase looks for a file from us called: `firebase-messaging-sw.js`. Firebase will take this file from us, and use it to generate the service worker.

This file should go under the `src` folder and would have the following contents:

```typescript
importScripts('https://www.gstatic.com/Firebasejs/8.7.0/Firebase-app.js')
importScripts('https://www.gstatic.com/Firebasejs/8.7.0/Firebase-messaging.js')

// The object we pass as an argument is the same object we copied into the environment files
Firebase.initializeApp({
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
})

const messaging = Firebase.messaging();
```

First, we need to import Firebase and Firebase messaging into the service worker file.

You may be wondering why we use this weird `importScripts` function to do this.

Service workers and other types of workers work differently than a normal javascript file. This is why they must use the `importScripts` function to import anything.

Don’t worry about why this is the case, we don’t need to understand that.

Anyways, with that installed, we call the `initializeApp` method passing the object we copied into the environment files. Then, all we need to do is create an object called *messaging* using the `messaging` method.

This should handle all the magic of displaying notifications for us!

With that created, try sending a `POST` request to our server to send a notification while the app is inactive.

In case you don’t know, you can do so using a tool like [Postman](https://www.postman.com/).

You should see something like this on the corner of your monitor:

![a sample notification](/engineering-education/fcm-with-spring-and-angular/notification.png)

### Conclusion
In this guide, we went through the process of sending notifications in a full-stack Spring Boot and Angular project.

In the backend, we set up a REST API to tell Firebase what notifications to send and where. In the front end, we learned how to subscribe to receive notifications even when the app is closed.

To best use this guide, try making your own full-stack project that uses these concepts.

If you need help or a reference to what we did here, I created a [GitHub repository](https://github.com/john-amiscaray/Spring-Angular-Firebase-Cloud-Messaging) with all the code we wrote.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
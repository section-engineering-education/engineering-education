---
layout: engineering-education
status: publish
published: true
url: /designing-an-authentication-api-using-service-classes-in-flutter/
title: Designing an authentication API using service classes in Flutter
description: Service classes are instrumental in calling an API method multiple times across a codebase. This article will demonstrate how to design an authentication API using service classes in Flutter.
date: 2021-09-11T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/designing-an-authentication-api-using-service-classes-in-flutter/hero.jpg
    alt: Authentication API using flutter service classes image
---
### Introduction

`Service classes` are an excellent method to keep third-party code implementation details out of your software when calling an API method from numerous locations in your code. A side consequence of Services is that it produces a domain language specific to your app through the APIs of your services. So your view models can be read as well. Moreover, the view models can be read as well. 
<!--more-->
Creating services becomes second nature once you have mastered the concept. However, that certain functionality may be so simple when you follow that path.

With the help of service classes, we will learn how to encapsulate third-party libraries and APIs and isolate them from other parts of the program. As an example, we'll look at authentication. You can hide the implementation details of third-party code in your app using service classes. When you need to call an API function numerous times across your codebase, they can be very useful.
### When to create service classes
When adopting the Stacked architecture, service is always established in certain instances. A service class does not have to finish the work service if it does not make sense. 

This service class gives API functionality to the rest of the app and is commonly called when you create an API for it in your application.
- To remove third-party packages from your codebase.
- When there is a collection of features that can be combined.
- To exchange functionality between different ViewModels.
- 
### Common scenarios for which you might develop a service
- Local storage can be read and written to.
- Make use of a web API.
- Create a user account.
- Make some complex calculations.
- Wrap Firebase or another third-party package with a wrapper.

In a nutshell:
1. To hide implementation details, the API wrapper class can be utilized.
2. Includes all arguments for API methods, both input and output.
3. A basic abstract service class can be created to facilitate swapping out another version easier.

### Authentication with Firebase
We will use the firebase authentication service as an example in this article to encapsulate. 

To use it, first install and import the firebase_auth plugin into your Dart code.
```
import 'package:firebase_auth/firebase_auth.dart';
```
You can also use the instance getter on FirebaseAuth to create a new instance of Firebase Auth:
```
FirebaseAuth auth = FirebaseAuth.instance;
```

### Authentication state
Firebase Auth offers a variety of techniques and utilities for integrating safe authentication into your Flutter application, whether it's a new one or an existing one. As a result, you'll often need to know if your user is currently signed in or logged out.

As a result of Firebase Auth, you can subscribe to this state in real-time via a Stream. As soon as it's called, the stream gives an immediate event indicating the user's current authentication status and then provides future events whenever that state changes.

In its role as `API wrapper`, the service class hides any implementation details from the end-user or application.
```dart
// new login class
class Login extends StatelessWidget {
  Future<void> _signInAnonymously() async {
    try {
    //FirebaseAuth=> Firebase Authentication
      final firebaseAuth = Provider.of<FirebaseAuth>(context);
      await firebaseAuth.signInAnonymously();
    } catch (e) {
      print(e); 
    }
  }
}
```
> Even while many programs do not require users to sign in explicitly, it is critical to be able to recognize them individually.

The ability to verify whether a request originates from an authenticated user, whether leveraging Firebase Firestore, Realtime Database, or even an external API, due to anonymous sign-in, provides a layer of security to your application.

We utilize this code to sign up with `Firebase Authentication` (FirebaseAuth). Use Provider.ofFirebaseAuth> to retrieve a Firebase Authentication instance (context). There are not any issues with global access because of this.

Although we are using the Firebase Authentication API in our code, we are still accessing it directly, and this can lead to several issues:

1. How will you deal with modifications in future versions of Firebase Authentication that cause problems?
2. In the future, let us say that we want to switch from Firebase Authentication to a different auth service.

All Firebase Authentication calls in our codebase will need to be modified or replaced. If and when our project expands, we will likely add a lot more content to our application. The most frequent security features include sharing preferences, providing privileges, tracking statistics, and local authentication. Maintaining our code as APIs change becomes more challenging as a result of this.

### Creating service classes
As we covered previously, a service class is nothing more than a wrapper. A solution for all of our problems. It is possible to create a generic authentication service using Firebase Authentication :

```Dart
class TheUser {
  const TheUser({@required this.id});
  final String id;
}
class FirebaseAuthService {

  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  // It is possible to create a new user by calling the 'FirebaseTheUser' private method "TheUser".
  
  TheUser _userFromFirebase(FirebaseTheUser theuser) 
  {
    return theuser == null? null : TheUser(id: theuser.id);
  }
  Stream<TheUser> get onAuthStateChanged {
    return _firebaseAuth.onAuthStateChanged.map(_userFromFirebase);
  }
  Future<TheUser> signInAnonymously() async
  {
    return _firebaseAuth.onAuthStateChanged.map(_userFromFirebase);
    return_userFromFirebase(theuser);
  }
  Future<void> logOut() async
  {
    return_firebaseAuth.logOut();
  }
}
```

When we use Firebase Authentication in our example, we use the `Firebase Authentication Service` class, which implements the Firebase Authentication API calls. Remember to create a simple User class to serve as the return type for all functions in the Firebase Authentication Service class.

Because the user objects can be used in place of Firebase User objects in the client code, the Firebase Authentication package is not required. To use the new service class, we'll need to update our top-level widget:

```dart
class ThisApp extends StatelessWidget
{
  @override
  Widget build(BuildContext context) 
  {
    return Provider<FirebaseAuthService>(
    //final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
      builder: (_) => FirebaseAuthService(),
      
      child: MaterialApp(
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: LandingPage(),
      ),
    );
  }
}
```

Provider.ofFirebaseAuth>(context) will be replaced by Provider.ofFirebaseAuthService> (context) for all calls. As a result, this line is no longer required to be imported in any of our client code.

```dart
import 'package:firebaseAuth/firebaseAuth.dart';
```

If Firebase Authentication introduces a breaking update, build problems will only surface in our Firebase Authentication Service class.As we add more packages, this strategy makes our software more maintainable. The creation of a base class is optional, and we could do it by following these steps:

```dart
abstract class AuthService {
//creation of a base class
  Future<TheUser> loginAnonymously();
  Future<void> logOut();
  Stream<TheUser> get onAStateChanged;
}
class FirebaseAuthService implements AuthService {
}
```

Using the base class type, build an instance of a subclass.

```dart
class ThisApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<AuthService>( // base class
      builder: (_) => FirebaseAuthService(), // concrete subclass
      child: MaterialApp(
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: LandingPage(),
      ),
    );
  }
}
```

The introduction of a base class is a step backwards. Investing in a large number of implementations is only worthwhile if we know we'll need them all at the same time. Aside from that, I recommend focusing on writing only one concrete service class at a time. Modern integrated development environments make it easy to perform tasks such as renaming classes and their usages. 

For example, there are two implementations of the base Authentication Service in my project. In addition, testing and demo purposes benefit from swapping between Firebase and a dummy authentication service at runtime.

### Purpose of service classes
Services are designed to separate a certain operation from the rest of the app and hide its implementation details.
Essentially, when you have a code that is tightly coupled to a single function, it makes it difficult and error-prone to make changes to. 

In this case, you'll need assistance. StorageService, for example, is the name of a new class you've created. How it operates internally isn't known to the other classes. It's as simple as calling a service's functions to store and get the data.

### Conclusion
You can hide the implementation details of third-party code in your app using service classes. However, this is especially true if you need to contact an API method multiple times in your codebase.
In a nutshell:
1. The API wrapper class can be used to hide implementation details.
2. All input and output arguments for API methods are included.
3. To make swapping out another version easier, a basic abstract service class can be built.

You are now ready!

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

---
layout: engineering-education
status: publish
published: true
url: /service-classes-to-design-authentication-api/
title: Using Service Classes to Design an Authentication API in Flutter
description: This tutorial will go over how to use service classes to design an authentication API in Flutter.
author: vincent-kimanzi
date: 2022-03-02T00:00:00-08:50
topics: [Languages, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/service-classes-to-design-authentication-api/hero.jpg
    alt: Using service classes to design an authentication API in Flutter Hero Image
---
Service classes are an excellent method to keep third-party code implementation details out of your software when calling an API method from numerous locations in your code. A side consequence of service classes is that it produces a domain language specific to your app through your services' APIs, so your view models can be read.
<!--more-->
Service classes will assist in learning how to encapsulate and segregate third-party libraries and APIs. We will use firebase authentication for this tutorial.

### Prerequisites
Before we get started, the reader needs to have:
- [Flutter](https://flutter.dev/) installed on their machine.
- Have some basic knowledge and understanding of Flutter.

### Table of contents
- [When to create service classes](#when-to-create-service-classes)
- [Typical scenarios for which you might develop a service](#common-scenarios-for-which-you-might-develop-a-service)
- [Authentication state](#authentication-state)
- [Creating service classes](#creating-service-classes)
- [Creating a service that holds a state of an app](#creating-a-service-that-holds-a-state-of-an-app)
- [Purpose of service classes](#purpose-of-service-classes)
- [Conclusion](#conclusion)
- [References](#references)

### When to create service classes
You can create a service class when you construct an API for it in your application. It will provide API capabilities to the rest of the app, including:
- Removing third-party packages from the codebase.
- Exchanging functionalities between different view models.

### Typical scenarios for which you might develop a service
- When the local storage can be read and written on.
- When making use of a web API.
- When creating a user account.
- When making some complex calculations.
- When wrapping firebase or another third-party package with a wrapper.

### Authentication state
Authentication state can be subscribed via a stream using `FirebaseAuth`. This stream generates an event each time the authentication status of a user changes, and it continues to do so indefinitely. 

There are no implementation details to be revealed to the end-user or application using a service class as an API wrapper. Firebase authentication is set up with the code below. Retrieving a firebase authentication object is as simple as calling `ProviderFirebaseAuth>(context)` function.

```dart
import 'package:firebase_auth/firebase_auth.dart';
FirebaseAuth auth = FirebaseAuth.instance;
class Login extends StatelessWidget {
 //sign in activity
  Future<void> _signInAnonymously() async {
    try {
    FirebaseAuth=> Firebase Authentication
      final firebaseAuth = Provider.of<FirebaseAuth>(context);
      await firebaseAuth.signInAnonymously();
    } catch(e) {
      print(e);
    }
  }
}
```

>Note: While many programs do not require users to sign in explicitly, it is critical to recognize them individually.

The ability to exchange preferences, grant access, compile data and require local authentication are some of the most common security features. Security can be increased by:
- Verifying whether a request comes from a user who has already signed in to your application.
- Verifying whether that user uses the firebase database, the realtime database, or an external API.

Although we are using the firebase authentication API in our code, we are still accessing it directly, and this can lead to several issues:
- First, how will you deal with changes to firebase authentication that make things worse in the future.
- Suppose we decide to use another authentication service instead of firebase in the future. We will have to make some changes to our plans.

Our program's authentication calls to firebase will be upgraded to solve the issues above. In addition, we can expect to add more content to our application as the scope of our project grows.

### Creating service classes
You can construct a generic authentication system using the firebase API. Service classes are nothing more than a clone of underlying classes. The firebase authentication API calls are demonstrated in our below sample code using the `Firebase Authentication Service` class.

```dart
class TheUser {
  const TheUser({@required this.id});
  final String id;
}
class FirebaseAuthService {
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  // It is possible to create a new user by calling the 'FirebaseTheUser' private method "TheUser".
  TheUser _userFromFirebase(User theuser)
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

Below we update our top-level widget to take advantage of the new service class.

```dart
class ThisApp extends StatelessWidget
{
  @override
  Widget build(BuildContext context)
  {
    return Provider<FirebaseAuthService>(
    
      builder:(_)=>FirebaseAuthService(),
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

Our firebase authentication service class will be the only one affected by a breaking change in firebase authentication. It is not necessary to create a base class, but if you choose to do so, below is an example of the code:

```dart
abstract class AuthService {
//creation of a base class
  Future<TheUser>loginAnonymously();
  Future<void>logOut();
  Stream<TheUserget onAStateChanged;
}
class FirebaseAuthService implements AuthService {
}
```

Using the base class type, build an instance of a subclass.

```dart
class ThisApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<AuthService>(
    // base class
      builder:(_)=>FirebaseAuthService(),
      // our concrete subclass
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

> **Note:**
>- The introduction of a base class is a step backward, and writing one service class at a time is also an option.
>- The renaming of classes and their usages is made simple in modern integrated development environments. For example, when it comes to the authentication service, firebase and a dummy authentication service can be swapped at runtime for testing and demo purposes.

### Creating a service that holds a state of an app
#### Step One: Creating a service class
`NewAbstract.dart` is the name of the file you should create. Create an abstract class that defines your service's capabilities in it.

```dart
abstract class newServiceClass {
  Future<int> getSomeValue();
  Future<void> doSomething(int value);
}
```

#### Step Two: Service implementation
Create a new file named `newImplService.dart`. Extend your `newServiceClass` class and add the following methods:

```dart
import 'NewAbstract.dart';

class newImplService extends newServiceClass {
  @override
  Future<int> getSomeValue() async {
    // do something
    return someValue;
  }
  @override
  Future<void> doSomething(int value) async {
    // do something
  }
}
```

#### Step Three: Service locator and initialization
Create a file called `locatingService.dart` and add the [GetIt](https://pub.dev/packages/get_it) service locator package to `pubspec.yaml`. Register the implementation of your service.

```dart
import 'package:get_it/get_it.dart';
import 'newImplService.dart';
import 'NewAbstract.dart';
GetIt ourGetIt = GetIt.instance;
setupServiceLocator() {
  ourGetIt.registerLazySingleton<newServiceClass>(() => newImplService());
}
```

Before running the app in `main.dart`, initialize the service location. 

```dart
void main() {
  setupServiceLocator();
  runApp(MyApp());
}
```

#### Step Four: Using the service
In this step, we will get a reference to our service from anywhere in our code using the service locator.

```dart
class MyClass {
  newServiceClass _newServiceClass = locator<newServiceClass>();
}
```

This is how you'd implement it in that class:
- `_newServiceClass.getSomeValue()`
- `_newServiceClass.doSomething(someValue)`

Here is a GIF to illustrate how it should work:

![Results](/engineering-education/service-classes-to-design-authentication-api/resuilts.gif)

### Purpose of service classes
- Service classes are designed to separate a particular operation from the rest of the app and hide its implementation details.
- Essentially, having a code coupled to a single function makes it difficult and error-prone to make changes. In this case, you will need assistance. **Storage service**, for example, is the name of a new class you have created. How it operates internally is not known to the other classes. It is as simple as calling a service's functions to store and get the data.

### Conclusion
Using service classes, you are able to hide the implementation details of third-party code in your app. However, this is especially true if you need to contact an API method multiple times in your codebase.

In a nutshell, use the API wrapper class to conceal implementation details, including all input and output parameters for the API method, and design a simple abstract service class to change another version easily.

Happy coding!

### References
- [Services in Code and how to use them in Flutter](https://www.filledstacks.com/post/services-in-code-and-how-to-use-them-in-flutter/)
- [Authentication API in flutter](https://codewithandrea.com/articles/designing-an-authentication-service-api/)
- [Flutter Service Architecture](https://gist.github.com/boformer/29d488534ff312a7cc0238b16f1cd0cc)

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

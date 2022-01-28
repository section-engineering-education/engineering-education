`Service classes` are an excellent method to keep third-party code implementation details out of your software when calling an API method from numerous locations in your code.

 A side consequence of Services is that it produces a domain language specific to your app through the APIs of your services. So your view models can be read as well. 

Creating services becomes second nature once you have mastered the concept. However, that functionality may be so simple when you follow that path.

Service classes assist us in learning how to encapsulate and segregate third-party libraries and APIs from the rest of our program. An example of firebase authentication will be used.
### Prerequisites
1. Install [Flutter](https://flutter.dev/).
2. Have some basic flutter programming concepts.

### Table of contents
- [When to create service classes](#when-to-create-service-classes)
- [Common scenarios for which you might develop a service](#common-scenarios-for-which-you-might-develop-a-service)
- [Authentication state](#authentication-state)
- [Creating service classes](#creating-service-classes)
- [Purpose of service classes](#purpose-of-service-classes)
- [Conclusion](#conclusion)
- [References](#references)
### When to create service classes
Stacked architecture requires service to be established in some cases. If a service class doesn't make sense, it doesn't have to finish the service.

You can contact this service class when you construct an API for it in your application, and it provides API capabilities to the rest of the app including:

- To remove third-party packages from your codebase.
- When there is a collection of features that can be combined.
- To exchange functionality between different view models.
### Common scenarios for which you might develop a service
- when local storage can be read and written to.
- When making use of a web API.
- When creating a user account.
- When making some complex calculations.
- When wrapping firebase or another third-party package with a wrapper.
### Authentication state
Whether you're building a new flutter app from scratch or integrating an already existing one, `FirebaseAuth` has a solution for you. You'll need to know whether or not your user is signed in due to this.

This state can be subscribed to via a stream using `FirebaseAuth`. This stream generates an event every each time the authentication status of a user changes, and it continues to do so indefinitely.

There are no implementation details to be revealed to the end user or application by using a service class as an API wrapper.
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
> Even while many programs do not require users to sign in explicitly, it is critical to recognize them individually.

Security can be increased by verifying whether a request comes from a user who has already signed in to your application, whether that user is using the firebase database, the realtime database, or an external API.

Firebase authentication is set up with this code. Retrieving a firebase authentication object is as simple as calling 'ProviderFirebaseAuth>' (context). There are not any issues with global access because of this.

Although we are using the firebase authentication API in our code, we are still accessing it directly, and this can lead to several issues:

1. How will you deal with modifications in future versions of firebase authentication that cause problems?
2. Consider the possibility that in the future we may opt to use an other auth service instead of firebase. What kind of adjustments are we going to make?

Our program's authentication calls to Firebase will have to be revised or upgraded. We can expect to add more content to our application as the scope of our project grows.

The ability to exchange preferences, grant access, compile data, and require local authentication are some of the most common security features.
### Creating service classes
You can construct a generic authentication system using the Firebase API. Service classes are nothing more than a clone of the underlying class:
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
The firebase authentication API calls are demonstrated in our sample code using the `Firebase Authentication Service` class. All operations of the firebase authentication service class should return a basic User class.

User objects may be used instead of firebase user objects in the client code. Update our top-level widget to take advantage of the new service class.
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
Our firebase authentication service class will be the only one affected by a breaking change in firebase authentication. It is not necessary to create a base class, but if you choose to do so, here are the steps:
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
The introduction of a base class is a step backward. Writing one service class at a time is also an option. 

The renaming of classes and their usages is made simple in modern integrated development environments. For example, when it comes to the authentication service, I have two implementations of it. Firebase and a dummy authentication service can be swapped at runtime for testing and demo purposes.
### Purpose of service classes
Services are designed to separate a certain operation from the rest of the app and hide its implementation details.

Essentially, having a code coupled to a single function makes it difficult and error-prone to make changes.

In this case, you'll need assistance. Storage service, for example, is the name of a new class you've created. How it operates internally isn't known to the other classes. It's as simple as calling a service's functions to store and get the data.
### Conclusion
Using service classes, you may hide the implementation details of third-party code in your app. However, this is especially true if you need to contact an API method multiple times in your codebase.

Use the API wrapper class to conceal implementation details, including all input and output parameters for API methods, design a simple abstract service class to allow changing out another version easy.

Happy coding!
### References
- [Services in Code and how to use them in Flutter](https://www.filledstacks.com/post/services-in-code-and-how-to-use-them-in-flutter/)
- [Authentication API in flutter](https://codewithandrea.com/articles/designing-an-authentication-service-api/)
- [Flutter Service Architecture](https://gist.github.com/boformer/29d488534ff312a7cc0238b16f1cd0cc)

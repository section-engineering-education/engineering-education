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
- [Authentication with Firebase](#authentication-with-firebase)
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
### Authentication with Firebase
Install and import the firebase auth plugin into your Dart code before using firebase authentication:
```dart
import 'package:firebase_auth/firebase_auth.dart';
```
Create a new instance of `FirebaseAuth` by calling the instance getter on `FirebaseAuth`:

```dart
FirebaseAuth auth = FirebaseAuth.instance;
```
### Authentication state
Whether you're building a new flutter app from scratch or integrating an already existing one, `FirebaseAuth` has a solution for you. You'll need to know whether or not your user is signed in due to this.

This state can be subscribed to via a stream using `FirebaseAuth`. For each change in a user's authentication state, this stream immediately provides one event and subsequently gives more events anytime that status changes.

In its role as `API wrapper,` the service class hides any implementation details from the end-user or application.

```dart
class Login extends StatelessWidget {
 //sign in activity
  Future<void> _signInAnonymously() async {
    try {
    FirebaseAuth=> Firebase Authentication
      final firebaseAuth = Provider.of<FirebaseAuth>(context);

      await firebaseAuth.signInAnonymously();
    } catch (e) {
      print(e);
    }
  }
}
```
> Even while many programs do not require users to sign in explicitly, it is critical to recognize them individually.

Security can be increased by verifying whether a request comes from a user who has already signed in to your application, whether that user is using the firebase database, the realtime database, or an external API.

We utilize this code to sign up with firebase authentication (FirebaseAuth). Use `Provider<FirebaseAuth>` to retrieve a firebase authentication instance (context). There are not any issues with global access because of this.

Although we are using the firebase authentication API in our code, we are still accessing it directly, and this can lead to several issues:

1. How will you deal with modifications in future versions of firebase authentication that cause problems?
2. Let's imagine that we will decide to switch from firebase authentication to another auth service in the future. How will we change?

Firebase authentication calls will need to be changed or adjusted throughout our software as a whole. The more our project grows, the more content we will likely add to our application. 

Sharing preferences, granting access, compiling statistics, and requiring local authentication are some of the most common security features. As APIs evolve, we'll have a harder time maintaining our code.
### Creating service classes
As discussed earlier, a service class is nothing more than a wrapper. We finally have an answer to all of our issues. Create a generic authentication service with the help of the Firebase API:
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
The firebase authentication API calls are demonstrated in our sample code using the `Firebase Authentication Service` class. For all firebase authentication service class functions, establish a simple User class as the return type.

The client code can use user objects instead of firebase user objects. Update our top-level widget to take advantage of the new service class.
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
Our firebase authentication service class will be the only one affected by a breaking change in firebase authentication. Our software becomes easier to maintain as we continue to add new packages. It is not necessary to create a base class, but if you choose to do so, here are the steps:
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
    return Provider<AuthService>(
    // base class
      builder: (_) => FirebaseAuthService(),
      // concrete subclass
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
The introduction of a base class is a step backward. One must know they will all be needed at the same time to justify investing in a large number of implementations. In addition, I propose writing one concrete service class at a time. 

The renaming of classes and their usages is made simple in modern integrated development environments. For example, when it comes to the authentication service, I have two implementations of it. Firebase and a dummy authentication service can be swapped at runtime for testing and demo purposes.
### Purpose of service classes
Services are designed to separate a certain operation from the rest of the app and hide its implementation details.

Essentially, having a code coupled to a single function makes it difficult and error-prone to make changes.

In this case, you'll need assistance. Storage service, for example, is the name of a new class you've created. How it operates internally isn't known to the other classes. It's as simple as calling a service's functions to store and get the data.
### Conclusion
Using service classes, you may hide the implementation details of third-party code in your app. However, this is especially true if you need to contact an API method multiple times in your codebase.
In a nutshell:

1. Use the API wrapper class to mask implementation details.
2. All input and output arguments for API methods are included.
3. A basic abstract service class can be built to make swapping out another version easier.

Happy coding!
### References
- [Services in Code and how to use them in Flutter](https://www.filledstacks.com/post/services-in-code-and-how-to-use-them-in-flutter/)
- [Authentication API in flutter](https://codewithandrea.com/articles/designing-an-authentication-service-api/)
- [Flutter Service Architecture](https://gist.github.com/boformer/29d488534ff312a7cc0238b16f1cd0cc)

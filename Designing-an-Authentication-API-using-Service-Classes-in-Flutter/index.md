### Introduction
`Service classes` are a wonderful method to keep third-party code implementation details out of your software. They're useful when you need to call an API method from multiple places in your code. In this post, we'll explore at how to encapsulate and segregate 3rd-party libraries and APIs from the rest of the application using service classes. As an example, we'll look at authentication.

You can hide the implementation details of 3rd party code in your app using service classes.
Especially when you need to call an API method several times throughout your codebase, they can be really beneficial.

In a nutshell:
1. In order to hide implementation details, you can write a service class as an API wrapper class.

2. This includes all input and output (return) arguments for API methods.
3. Optionally to make it easy to swap out an alternative version of the service class, establish a basic abstract class for it.

As an **API wrapper**, the `service class` hides any implementation details.
```dart
class SignUpPage extends StatelessWidget {
  Future<void> _signUpAnonymously() async {
    try {
      final firebaseAut = Provider.of<FirebaseAut>(context);
      await firebaseAut.signUpAnonymously();
    } catch (e) {
      print(e); // TODO: show dialog with error
    }
  }
  ...
}
```
In this code is used to sign up with FirebaseAuth, we use this code. To retrieve an instance of FirebaseAut, we use Provider.ofFirebaseAut>(context). Because of this, global access isn't plagued by its regular problems. The FirebaseAut API, on the other hand, is still accessed directly in our code, which can lead to several issues:

1. In future versions of FirebaseAuth, how will you handle modifications that disrupt your system?
2. Suppose we wish to change FirebaseAuth in the future for a different auth provider.

That means updating or replacing FirebaseAuth calls throughout our codebase. Moreover, as our project expands, we may add a large number of additional products to our arsenal. Shared preferences, permissions, analytics and local authentication are a few of the most prevalent types of security features. Thus, maintaining our code when APIs change becomes more difficult.
### Creating service classes
Service class is simply a wrapper, as we discussed earlier. the answer to all of our issues Using FirebaseAut, we can build a generic authentication service:
```Dart
class User {
  const User({@required this.id});
  final String id;
}
class FirebaseAutService {
  final FirebaseAut _firebaseAuth = FirebaseAut.instance;
  // User can be created using the private method "User" from `FirebaseUser`
  User _userFromFirebase(FirebaseUser user) {
    return user == null ? null : User(id: user.id);
  }
  Stream<User> get onAuthStateChanged {
    return _firebaseAuth.onAuthStateChanged.map(_userFromFirebase);
  }
  Future<User> signUpAnonymously() async {
    final user = await _firebaseAut.signUpAnonymously();
    return _userFromFirebase(user);
  }
  Future<void> signOut() async {
    return _firebaseAut.signOut();
  }
}
```
The FirebaseAutService class implements the API functions that we want from FirebaseAuth in our example. It is important to note that we have constructed a simple User class, which we utilize as the return type for all methods in the FirebaseAutService class. Since the client code can operate with User objects, rather than FirebaseUser, the firebase auth package isn't required. Our top-level widget will now use the new service class:
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<FirebaseAutService>(
      builder: (_) => FirebaseAutService(),
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
All calls to Provider.ofFirebaseAut>(context) will be replaced by Provider.ofFirebaseAutService> (context). Therefore, all of our client code no longer requires this line to be imported. If firebase auth introduces a breaking update, build problems will only surface in our FirebaseAutService class. This method makes our program more maintainable as we add more and more packages. Optionally, we could also create an abstract base class:
```dart
abstract class AuthService {
  Future<User> signUpAnonymously();
  Future<void> signOut();
  Stream<User> get onAuthStateChanged;
}
class FirebaseAutService implements AuthService {
}
```
It is now possible to create an instance of a subclass in the builder and use the base class type:
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider<AuthService>( // base class
      builder: (_) => FirebaseAutService(), // concrete subclass
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
Even so, creating a base class is an extra step. Only if we know we'll need numerous implementations at the same time will it be worth our while. Otherwise, I propose writing only one concrete service class at the most. In addition, contemporary IDEs make refactoring chores easier, so you may easily rename the class and its usages if necessary. In my project, I use a base AutService class that has two implementations. A Firebase and a mock authentication service can be switched between at runtime, which is beneficial for testing and demo reasons.
### Conclusion
You can hide the implementation details of 3rd party code in your app using service classes. Especially when you need to call an API method several times throughout your codebase, they can be really beneficial.
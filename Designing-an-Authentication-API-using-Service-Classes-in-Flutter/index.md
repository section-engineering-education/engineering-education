### Introduction
`Service classes` are a wonderful method to keep third-party code implementation details out of your software. Useful when calling an API method from numerous locations in your code. With the help of service classes, we'll learn how to encapsulate third-party libraries and APIs and isolate them from other parts of the program. We'll use authentication as an example.

Using service classes, you may hide the implementation details of third-party code in your app.
Especially when you need to call an API method several times throughout your codebase, they can be really beneficial.

In a nutshell:
1. The API wrapper class can be used to hide implementation details.

2. Includes all arguments for API methods, both input and output.
3. Establish a basic abstract class for the service class if you want to make it easier to swap out an alternate version.
4. 
In its role as `API wrapper`, the service class hides any implementation details from the end-user or application.
```dart
class SignUpPage extends StatelessWidget {
  Future<void> _signUpAnonymously() async {
    try {
    
      final firebaseAut = Provider.of<FirebaseAut>(context);
      await firebaseAut.signUpAnonymously();
    } catch (e) {
    
      print(e); 
    }
  }
  ...
}
```
We utilize this code to sign up with FirebaseAuth. Use Provider.ofFirebaseAut> to retrieve a FirebaseAut instance (context). There aren't any issues with global access because of this.

Although we are using the FirebaseAut API in our code, we are still accessing it directly and this can lead to several issues:

1. How will you manage changes that cause problems in future versions of FirebaseAuth?
2. In the future, let's say that we want to switch from FirebaseAuth to a different auth service.

We'll need to update or replace all FirebaseAuth calls in our codebase. in addition, if and when our project grows, we'll likely add a lot more things to our arsenal. Sharing preferences, granting permissions, tracking analytics, and local authentication are among the most common security features. Because of this, maintaining our code as APIs change becomes more challenging.
### Creating service classes
As we covered previously, a service class is nothing more than a wrapper. The answer to all of our issues Using FirebaseAut, we can build a generic authentication service:
```Dart
class User {
  const User({@required this.id});
  final String id;
}
class FirebaseAutService {
  final FirebaseAut _firebaseAuth = FirebaseAut.instance;
  // It is possible to create a new user by calling the 'FirebaseUser' private method "User".
  
  User _userFromFirebase(FirebaseUser user) 
  {
    return user == null? null : User(id: user.id);
  }
  Stream<User> get onAuthStateChanged {
    return _firebaseAuth.onAuthStateChanged.map(_userFromFirebase);
  }
  Future<User> signUpAnonymously() async
  {
    final user = await_firebaseAut.signUpAnonymously();
    return_userFromFirebase(user);
  }
  Future<void> signOut() async
  {
    return_firebaseAut.signOut();
  }
}
```
When we use FirebaseAuth in our example, we use the FirebaseAutService class which implements the FirebaseAuth API calls. Remember to create a simple User class which will be used as the return type for all methods in the FirebaseAutService class. Because the client code can work with User objects instead of FirebaseUser objects, the firebase auth package isn't needed. It's time to update our top-level widget, which will now use the new service class:
```dart
class MyApp extends StatelessWidget
{
  @override
  Widget build(BuildContext context) 
  {
    return Provider<FirebaseAutService>(
      builder: (_) => FirebaseAutService(),
      
      child: MaterialApp(
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: LandingPage(),
      ),
    );}
}
```
All calls to Provider.ofFirebaseAut>(context) will be replaced by Provider.ofFirebaseAutService> (context). Therefore, all of our client code no longer requires this line to be imported. If firebase auth introduces a breaking update, build problems will only surface in our FirebaseAutService class. This method makes our program more maintainable as we add more and more packages. The creation of a base class is optional and we could also create it:
```dart
abstract class AuthService {
  Future<User> signUpAnonymously();
  Future<void> signOut();
  Stream<User> get onAuthStateChanged;
}
class FirebaseAutService implements AuthService {
}
```
Generate an instance of a subclass and then utilize the base class type to create an instance of that subclass.
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
To be fair, introducing a base class is a step in the wrong direction. Investing in many implementations will only be worthwhile if we know we'll need them all at once. Aside from that, I recommend writing no more than one concrete service class at a time instead. En outre, modern integrated development environments make it easy to perform tasks such as renaming classes and their usages, if appropriate. There are two implementations of the base AutService in my project. Testing and demo purposes benefit from the ability to swap between Firebase and a dummy authentication service at runtime.
### Conclusion
You can hide the implementation details of 3rd party code in your app using service classes. Especially when you need to call an API method several times throughout your codebase, they can be really beneficial.

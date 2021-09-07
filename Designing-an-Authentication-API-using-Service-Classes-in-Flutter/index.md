### Introduction
`Service classes` are a wonderful method to keep third-party code implementation details out of your software. Useful when calling an API method from numerous locations in your code. A side consequence of Services is that it produces a domain language that is specific to your app through the APIs of your services. So your viewmodels can be read as well. And the viewmodels can be read as well. Creating services becomes second nature once you've mastered the concept. That certain functionality may be so simple when you follow that path, it's mind-blowing!. With the help of service classes, we'll learn how to encapsulate third-party libraries and APIs and isolate them from other parts of the program. We'll use authentication as an example.

Using service classes, you may hide the implementation details of third-party code in your app.
They can be especially useful when you need to call an API method multiple times across your codebase.
### When to create service classes
When adopting the Stacked architecture, a service is always established in certain instances. A service class does not have to finish in the work service if it does not make sense. This is a service class that gives API functionality to the rest of the app and is commonly called Api when I create an API for it in my app.
- To remove third-party packages from your code base.
- When there is a collection of features that can be combined.
- To exchange functionality between different ViewModels.

In a nutshell:
1. To hide implementation details, the API wrapper class can be utilized.
2. Includes all arguments for API methods, both input and output.
3. A basic abstract service class can be created to facilitate swapping out an other version easier.
 
In its role as `API wrapper`, the service class hides any implementation details from the end-user or application.
```dart
// new login class
class Login extends StatelessWidget {
  Future<void> _loginAnonymously() async {
    try {
    //FirebaseAuth=> Firebase Authentication
      final firebaseAuth = Provider.of<FirebaseAuth>(context);
      await firebaseAuth.loginAnonymously();
    } catch (e) {
      print(e); 
    }
  }
  ...
}
```
We utilize this code to sign up with `Firebase Authentication` (FirebaseAuth). Use Provider.ofFirebaseAuth> to retrieve a Firebase Authentication instance (context). There aren't any issues with global access because of this.

Although we are using the Firebase Authentication API in our code, we are still accessing it directly and this can lead to several issues:

1. How will you deal with modifications in future versions of Firebase Authentication that cause problems?
2. In the future, let's say that we want to switch from Firebase Authentication to a different auth service.

In our codebase, we'll have to update or replace all Firebase Authentication calls. if and when our project expands, we'll likely add a lot more stuff to our arsenal as well. The most frequent security features include sharing preferences, granting rights, tracking statistics, and local authentication. Maintaining our code as APIs change becomes more difficult as a result of this.
### Creating service classes
As we covered previously, a service class is nothing more than a wrapper. A solution for all of our problems It is possible to create a generic authentication service using Firebase Authentication :
```Dart
class TheUser {
  const TheUser({@required this.id});
  final String id;
}
class FirebaseAuthService {
//firebaseAuth=> Firebase Authentication
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  // It is possible to create a new user by calling the 'FirebaseTheUser' private method "TheUser".
  
  TheUser _userFromFirebase(FirebaseTheUser theuser) 
  {
    return theuser == null? null : TheUser(id: theuser.id);
  }
  Stream<TheUser> get onAuthStateChanged {
    return _firebaseAuth.onAuthStateChanged.map(_userFromFirebase);
  }
  Future<TheUser> loginAnonymously() async
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
When we use Firebase Authentication in our example, we use the Firebase Authentication Service class which implements the Firebase Authentication API calls. Don't forget to construct a simple User class that will be used as the return type for all functions in the Firebase Authentication Service class. There's no need for the Firebase Authentication package because TheUser objects can be used in place of Firebase User objects in client code. Update our top-level widget to use the new service class:
```dart
class ThisApp extends StatelessWidget
{
  @override
  Widget build(BuildContext context) 
  {
    return Provider<FirebaseAuthService>(
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
All calls to Provider.ofFirebaseAuth>(context) will be replaced by Provider.ofFirebaseAuthService> (context). Therefore, all of our client code no longer requires this line to be imported.
```dart
import 'package:firebaseAuth/firebaseAuth.dart';
```
If Firebase Authentication introduces a breaking update, build problems will only surface in our Firebase Authentication Service class. This method makes our program more maintainable as we add more and more packages. The establishment of a base class is optional, and we might create it in the following manner:
```dart
abstract class AuthService {
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
To be fair, introducing a base class is a step in the wrong direction. Investing in many implementations will only be worthwhile if we know we'll need them all at once. Aside from that, I recommend writing no more than one concrete service class at a time instead. En outre, modern integrated development environments make it easy to perform tasks such as renaming classes and their usages, if appropriate. There are two implementations of the base Authentication Service in my project. Testing and demo purposes benefit from the ability to swap between Firebase and a dummy authentication service at runtime.
### Conclusion
Using service classes, you may hide the implementation details of third-party code in your app. Especially when you need to call an API method several times throughout your codebase, they can be really beneficial.
In a nutshell:
1. To hide implementation details, the API wrapper class can be utilized.
2. Includes all arguments for API methods, both input and output.
3. A basic abstract service class can be created to facilitate swapping out an other version easier.

You are now ready!

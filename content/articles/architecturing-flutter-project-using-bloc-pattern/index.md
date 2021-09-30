BLoC stands for Business Logic Component 

### Topics to handle:
- What is BLOC Pattern?
- explaining concepts of bloc 
- building a very simple app
- building the app with BLOC pattern
### What is Bloc Pattern? 
BLoC pattern is a design pattern that aids in the separation of the presentation and business logic layers.It translates incoming stream of events into outgoing stream of states.
![Valid email and password](/engineering-education/architecturing-flutter-project-using-bloc-pattern/validlogins.png)
<!--more-->
Blocs receive events as input.it is a state management system for Flutter. Example of perssing buttons, are popular UI events. Events are sent and States are created. A Bloc's output is called a state. User Interface components can listen to the stream of states and redraw parts of themselves in response to the current state. When an Event is dispatched after mapEventToState has been called but before the bloc's state has been updated, a transition occurs. The currentState, the dispatched event, and the nextState make up a Transition.

This tutorial is meant to bring us to the understanding of architechturing flutter project using bloc pattern.

  
### Prerequisites
- Android Studio or [Visual Code](https://code.visualstudio.com/) installed on your computer.
- Understand how to create and run flutter applications.
- Understand the basic of flutter like Widgets and making calls.
- Basic knowledge of [dart](https://dart.dev/)Programming Language.

### Why choose to use Bloc Pattern?
- knowing the application's state at any given time
- easy to check each case to ensure an application is running effectively.
-In order to make data-driven decisions, we must record every single user interaction in our application.
-Working as effectively as possible and reusing components both inside and throughout applications.
- A large number of developers can work in unison on a single code base, all following the architecture
- easy and reponsive app development.
### Core Concepts
- A stream -sequence of asynchronous data.Medium through which data travels.
- Events -inputs to a Bloc like button presses.
- States - outputs of a Bloc.
- Transitions -occurs when Events are sent out after mapEventToState are called just before updating of bloc’s states.
- sinks-point where you recieve or consume data from stream. 
### Bloc Architecture
![Bloc archituchture Image](/engineering-education/architecturing-flutter-project-using-bloc-pattern/bloc_architecture.png)
- When using bloc library our application is splited three layers:
- Presentation
- Business Logic
- Data
### Data Layer
It is mainly splited into Repository and Data Provider.It  is resposible for interacting with databases,making network requests as well as asynchronous data sources.
### Data Provider
This is responsible for expose simple APIs for performing CRUD operations like creating, reading, updating and deleting of Data being part of our data layer.
### Repository
This layer acts as a wrapper around one or more data providers with which the Bloc Layer communicates.
### Business Logic Layer
 It is responsible for responding to inputs coming from presentation layer with new states.It can depend repositories for retrieving data needed for building the application state.
### Bloc communicating with other Blocs
Blocs have a state streams which other blocs can use in order to react to changes within the bloc.
### Presentation Layer
This figures out the rendering of itself based on bloc states. It responsible for handling input from the user and events of application lifecycle.

To interact with bloc package easily we need the help of these widgets:
### BlocBuilder
This is a widget that entails  builder functions and blocs.It is responsible for handling the building of widgets in response to new states.The concept used here is same as that of StreamBuilder but reduces the amount of boilerplate by use of API.
### BlocProvider
This widget connects blocs and their children using BlocProvider.It is Implemented as dependency injection (DI) widget,thus one bloc instance  is made available for multiple widgets within a subtree.
### Getting Started with Bloc pattern in flutter
### Brief explanation of what the project does
When User enters an input whether the email or the password.The bloc listens throught out if the data is valid by the help of the validator.The Login Button will become active if and only if the input data is valid input.For this case the Login button becomes active if and if the emails and password are valid 
### Step 1: Setting up new Flutter Application
Type this in terminal:
```cmd
flutter create my-Project-Name 
```
### Step 2: Add following dependecies at pubspec.yaml
RxDart uses the native Dart Streams api to implement the popular reactiveX api for asynchronous programming.
```yaml
 rxdart: ^0.27.1
```
### Step 3: In main.dart file and delete all codes and replace it with this code
These calls the runapp function to get the app running. `import` used to access other files.
```dart
import 'package:flutter/material.dart';
import 'src/mapp.dart';

void main() => runApp(App());
```
### Step 4: Create mapp.dart in source `src` folder and write this
This file loads our homepage.It displays the various components and elements that we have in our homepage.
```dart
import 'package:flutter/material.dart';//importing the material package
import 'screens/login_screen.dart';//importing the loginscreen to give access to its components
import 'blocs/mprovider.dart';

class App extends StatelessWidget {
  Widget build(BuildContext context) {
    return Provider(
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          body: LoginScreen(),
        ),
      ),
    );
  }
}
```
### Step 5: Create folder in src folder called blocs
In this folder we will store our files that we will use to implement bloc pattern format mannually using our code.
### Step 6: Create mbloc.dart and paste the following code.
These code shows creation of variable `_email` and `_password` it also shows adding of data to stream.The data is then changed by adding to sink.The submit function is called at the end of the code and the `valid data` variables are created ie.`validEmail` and `validPassword`.
```dart
import 'dart:async';//imports the dart package
import 'package:rxdart/rxdart.dart';//import the rxdart package
import 'validators.dart';//imports the validators file inorder to access various components. 

class Bloc extends Validators {
  final _email = BehaviorSubject<String>();//creating variable email
  final _password = BehaviorSubject<String>();//creating variable password


  //Add data to stream

  Stream<String> get email => _email.stream.transform(validateEmail);
  Stream<String> get password => _password.stream.transform(validatePassword);
  Stream<bool> get submitValid =>
      CombineLatestStream.combine2(email, password, (e, p) => true);
  // Stream<bool> get submitValid =>
  //     Observable.combineLatest2(email, password, (e, p) => true);

  //change data
  Function(String) get changeEmail => _email.sink.add;
  Function(String) get changePassword => _password.sink.add;
  

  submit() {
    final validEmail = _email.value;
    final validPassword = _password.value;

    print('email is $validEmail');
    print('password is $validPassword');
  }

  dispose() {
    _email.close();
    _password.close();
  }
}
```
### Step 7: Create dart file called mprovider.dart at blocs directory and paste this code
These files shows the data providers used un the bloc pattern.A variable mbloc is created to represent a new `Bloc`.
```dart
import 'mybloc.dart';//imports to help access mbloc components
import 'package:flutter/material.dart';//Imports material packages


class Provider extends InheritedWidget {
  final mbloc = Bloc();//final makes it unchangable

  Provider({Key key, Widget child}) : super(key: key, child: child);//the method provider from m provider
  bool updateShouldNotify(_) => true;

  static Bloc of(BuildContext context) {
    return (context.dependOnInheritedWidgetOfExactType<Provider>()).mbloc;
  }
}
```
### Step 8: Create validators.dart at this blocs directory
These file is incharge of validating the users input.These file checks if the data that user inputs meets the requirements specified in the Code.It checks if the condition that has been set is True of False.It checks if the email has `@` and checks if the password is made of 8 characters or more.An error id raised if the condtions have not been met.
```dart
import 'dart:async';//import for the dart package

class Validators {//initaiizing validators class
  final validateEmail =
      StreamTransformer<String, String>.fromHandlers(handleData: (email, sink) {
    if (email.contains('@')) {
      // checks if the @ sign is available
      sink.add(email);
    } else {
      sink.addError('Enter valid email');
    }
  });
  final validatePassword = StreamTransformer<String, String>.fromHandlers(
      handleData: (password, sink) {
    if (password.length > 8) {
      sink.add(password);
    } else {
      sink.addError('Password must be atleast 8 characters');
    }
  });
}
```
### Step 10: Create a folder called Screens
This folders contains all the views of the flutter application.
### Step 11: Create login_screen.dart and paste this code
These file contains the code that is responsible for our loginscreen display.It contains two textfields mainly for the email and passwords.A button called Login and some hint text which helps the user to know which data is to be input in the given textfield.
```dart
import '../blocs/mybloc.dart';//Importing the bloc file. 
import 'package:flutter/material.dart';//importing marterial.dart package used in flutter
import '../blocs/mprovider.dart';//importing mprovider to access its components

class LoginScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    final mbloc = Provider.of(context);
    return Container(
      margin: EdgeInsets.all(20.0),
      child: Column(
        children: [
          emailField(mbloc),
          passwordField(mbloc),
          SizedBox(
            height: 50,
          ),
          submitButton(mbloc),
        ],
      ),
    );
  }

  Widget emailField(Bloc mbloc) {
    return StreamBuilder(
        stream: mbloc.email,
        builder: (context, snapshot) {
          return TextField(
            onChanged: mbloc.changeEmail,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              hintText: 'you@example.com',
              labelText: 'Email',
              errorText: snapshot.error,
            ),
          );
        });
  }

  Widget passwordField(Bloc mbloc) {
    return StreamBuilder(
      stream: mbloc.password,
      builder: (context, snapshot) {
        return TextField(
          onChanged: mbloc.changePassword,
          obscureText: true,
          decoration: InputDecoration(
            hintText: 'Password',
            labelText: 'Password',
            errorText: snapshot.error,
          ),
        );
      },
    );
  }

  Widget submitButton(Bloc mbloc) {
    return StreamBuilder(
      stream: mbloc.submitValid,
      builder: (context, snapshot) {
        return ElevatedButton(
          onPressed: snapshot.hasData ? mbloc.submit : null,
          child: Text('check validity'),

        );
      },
    );
  }
}
```

### Step 12: To run the code click on debug
you may run using the default device type this in the terminal:
```cmd
 flutter run 
```
 ## else for specific device use: 
 ```cmd
 flutter run "nameofthedevice" 
```


The following screenshots explain what is expected:

![After running](/engineering-education/architecturing-flutter-project-using-bloc-pattern/loginscreen.png)

![Trying login without filling in any detail](/engineering-education/architecturing-flutter-project-using-bloc-pattern/triallogin.png)
![inValid email input](/engineering-education/architecturing-flutter-project-using-bloc-pattern/invalidemail.png)


![Valid email input](/engineering-education/architecturing-flutter-project-using-bloc-pattern/validemail.png)

![Valid email and invalid pass input](/engineering-education/architecturing-flutter-project-using-bloc-pattern/invalidpass.png)

![Valid email and password](/engineering-education/architecturing-flutter-project-using-bloc-pattern/validlogins.png)




For more details on the project Reachout @ [this GitHub repository](https://github.com/waigwakanoi/).
### Conclusion
Flutter allows you to create apps for Android and iOS in a variety of ways. Well-known architectures like MVC and MVVM can be used. BLoC is widely regarded as the finest Flutter architecture since Flutter is distinct from other programming languages and is widget-centric.

The BLoC architecture is a versatile and easy-to-maintain structure. I'd recommend this design for any Flutter project because it allows you to construct an app reactively using streams and sinks.



### References:
- https://medium.com/flutter-community/flutter-bloc-package-295b53e95c5c.

Enjoy Coding !!!

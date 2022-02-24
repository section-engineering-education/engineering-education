
### Introduction of routing and navigation in Flutter applications.

### Introduction
Navigating in flutter apps, all you have to do is use the default navigation that comes with Flutter. For complex flutter application consider the addition of  dynamic links, authorizations, and authentication . GetX does a good job of helping you with this by using middleware and bindings, child routes.

### Topics to handle
- learn the usage of navigator, routes in Flutter.
- Passing between one page to another.
- Learn how to put in place navigator and routes API.
- Create a flutter application to show the usage of navigators and routes. 

### Disclaimers
- By default, the MaterialApp widget has a routes property. 
- Navigator 2.0 is also referred to as the router.
- DefaultTransitionDelegate helps navigator to decide the transition of the screens.  

### Definition of Navigator and Routes as used in Flutter
- Navigator is a component that manages a stack made of routes. This feature allows the user to transit from one screen to another. Navigator performs these transitions of the screen either by declarative, Imperative, Navigator. pages. Navigator. push or Navigator. pop are the most common method used. Stack of routes means that once you navigate from one page to another you can always go back to the previous page.
- Route -A route defines the navigation of the app. It tells which page the navigator takes the user to. Routes made of screens and pages.
To navigate through apps screen,one can navigate using Navigator.push(),navigator.pop().

### Prerequisites
- Have Visual Studio Code or android studio installed.
- Understand how to code flutter widgets.
- Under flutter basics.
- Understand widgets and how to import packages in Flutter.

### Types of navigator
- Using named routes
One of the best ways to manage many routes is using references. One can refer to a route either by Name, convention, or path.
To map navigator route one uses builder functions. Material app uses this style to create value for callback methods.
Illustration using code to show route names

```dart
void main() {
 runApp(MaterialApp(
    home: MyFirstApp(),
     routes: //example of routes we mentioned
     <String, //string definition for widgetbuilder
     WidgetBuilder> {
 '/firstpage': ( BuildContext context ) => My_page(//give a name to first page
 title: 
 'firstPage'),
 '/second': ( BuildContext context ) => My_Page(//give a name to second page
 title: 'Secondpage'),
 '/thirdpage': ( BuildContext context ) => My_Page(//give a name to third page
 title: 'thirdpage'),
 },
 ));
}
```
- Using navigator.pop:
To create a new route to a new page using this method :

```dart
 Navigator.pop(context);
```
- Using navigator.push:
Create a route of new page using this method :

```dart
 Navigator.push(context);
```
### Example to understand this better
Take a case for an application used by users to stream songs or videos. When a user taps on a song from a list of many songs, the new screen that pops up contains more details about the tapped one.

### Simple application that uses navigators and routes
For our application, we will have 3 screens. Navigator.push used navigate to the next page, Navigator.pop used to return to the previous page.
1. Create a new flutter application
  Open your visual code. On the menu bar click on `view` then `command palette` then click on `new flutter project`. Specify the location where to create your project then specify the name of your project.

```cmd
flutter create name_of_project 
```

2. Open main. dart file, erase its code and replace using this.This case it uses named routes for all the three screen. It contains named routes of all the pages we have in our application.

```dart
//start by importing packages and pages

import 'allfiles.dart';//imports all exports
void main()//method 
{
 runApp//runs the app
 (const ThisApp());
}

class ThisApp extends StatelessWidget
//creation of a new class
{
 const ThisApp({//comes by default in flutter
 Key? key //leave the key by default 
 }) : //superkey starts here
 super(key: key);//end of the superkey

 @override//overides call 
 Widget build //builds any widget present
 (BuildContext context) //build function needed to navigate
 {
 return //return function
 MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'First Screen',
      home: const FirstScreen(),
      routes: {
 FirstScreen.routeName: (context) => FirstScreen(),
 Secondscreen.routeName: (context) => const Secondscreen(),
 Thirdscreen.routeName: (context) => const Thirdscreen(),
      },
    );
  }
}

```
3. Coding firstpage.
Create firstscreen.dart . This file represents the first page of our application. It contains a class that has an app bar, text, and button to navigate to the second screen. This case uses a navigator. push to navigate to the next page.

```dart //used to write dartcode in markdown
import 'allfiles.dart'; //imports all files in our app
class FirstScreen extends StatelessWidget//new class for the first screen
{
 static const routeName = '/FirstScreen';
 const FirstScreen({
 Key? key}) :
 super(key: key);
//start of another overide
 @override
 //build function below
 Widget build(BuildContext context) {
 return //to return a scaffold containing elements 
 const Scaffold(
      body: MyDetails(),
    );
  }
}

class MyDetails extends StatelessWidget {//definition of our details class
 const MyDetails({Key? key}) //leave the key by default
 : super(key: key);
//start of the overide
 @override //overide call 
 Widget build(BuildContext context){//buld any content inside the return
 return Center(
      child: Column(//contains the text and buttons
        mainAxisAlignment: MainAxisAlignment.center,//aligns the cloumn to the center
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
       Text('First Screen'),
 const SizedBox(
            height: 30,
          ),
 ElevatedButton(
            onPressed: () {
 Navigator.pushNamed(context,Secondscreen.routeName);
            },
            child: const Text('Go to Second Screen'),
          ),
        ],
      ),
    );
  }
}

```
4. Let's create the Secondscreen. dart. This is the second screen of our application. It contains text and two buttons to navigate to the first and third screens. The first button uses the ` push(context)` function to the third screen while the second button uses the `navigator. pop(context)` to navigate back to the previous page.  

```dart
import 'allfiles.dart'; //imports all files in our app
class Secondscreen extends StatelessWidget
//new stateless widget
{
 static const routeName = '/Secondscreen';
 const Secondscreen({
 Key? key}) : //leave key as default 
 super(key: key);//end of keys

 @override// overide is called
 Widget build(BuildContext context) {
 return //returns output for the secondscreen
 Scaffold( //start of the scaffold 
      body: Center(
        child: Column( //column to hold all text and buttons
          children: [
 const Text('This is the Second Screen'),
 const SizedBox(
              height: 30,
            ),
 ElevatedButton(
              onPressed: () {
 Navigator.pushNamed(context,Thirdscreen.routeName);
              },
              child: const Text('Go to third screen'),
            ),
 const SizedBox(
              height: 10,
            ),
 ElevatedButton(
              onPressed: () {
 Navigator.pop(context);
              },
              child: const Text('Go to back'),
            ),
          ],
        ),
      ),
    );
  }
}

```
6. Let's create the third screen. dart. This is the last page of our flutter mobile application. It also contains text and two buttons to navigate to the first and second screens. The first button uses `. push(context)` to the first screen while second button uses the `navigator. pop(context)` to navigate back to the previous page.   
```dart
import 'allfiles.dart' ;//contains imports of all files

class Thirdscreen extends StatelessWidget 
//third screen class created
{
 static const routeName = '/Thirdscreen';
 const Thirdscreen({
 Key? key
 }) : super(key: key);//leave key to its default

  @override //overide call
 Widget build(BuildContext context) { //build function 
 return //return the output
 Scaffold(//contains elements of third screen
      body: Center(
        child: Column(//contains the text and buttons
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
 const Text('This is the Third Screen'),
 const SizedBox(
              height: 30,
            ),
 ElevatedButton(
              onPressed: () //called when press action takes place 
              {
 Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const FirstScreen()));
              },
              child: const Text('Go to firstScreen'),
            ),
    SizedBox(
              height: 10,
            ),
 ElevatedButton(
              onPressed: () {
 Navigator.pop(context);
              },
              child: const Text('Go to Second Screen'),
            ),
          ],
        ),
      ),
    );
  }
}

```
7. Create allfiles.dart.It contains all the exports of all other files.It will be used as one import to reduce repitition of imports.
```dart
export 'package:flutter/material.dart';
export 'firstscreen.dart';
export 'Secondscreen.dart';
export 'Thirdscreen.dart';
```
1. To run the flutter app use the following commands:
```cmd
flutter run -d chrome //runs the flutter app in chrome browser
```
or you can run using a browser
```cmd
flutter run -d edge //runs the flutter app in the edge browser
```
Below are screenshots showing the expected results

![FirstPage](/engineering-education/introduction-of-routing-and-navigation-in-flutter-applications/firstpage.jpg)

![SecondPage](/engineering-education/introduction-of-routing-and-navigation-in-flutter-applications/secondpage.jpg)


![ThirdPage](/engineering-education/introduction-of-routing-and-navigation-in-flutter-applications/thirdpage.jpg)


For any query Reachout @ [this GitHub repository](https://github.com/karehnikita/).

### Conclusion
The navigators and routing in flutter applications are key to flutter application development. I recommend all flutter developers to use navigator developing mobile and web applications. 

### References:
- https://api.flutter.dev/flutter/widgets/Navigator-class.html
- https://medium.com/flutter-community/flutter-routes-and-navigation-69f128a9ea8f
- https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade
 
Enjoy Coding !!!


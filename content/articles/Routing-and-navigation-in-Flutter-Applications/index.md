

### Routing and navigation in Flutter Applications
### Introduction

Routing is maintaining the state of the user's navigation. This applies to web applications, mobile apps, and desktop apps. Navigator is a component that manages a stack made of routes. Now let us see how routing can is achieved in flutter applications.
### Table of contents:
- Introduction.
- Routing in flutter.
- Navigation in flutter.
- Navigation using 2D.
- Navigator Function Description.
	- Function 1: Function for navigating to a new screen using Navigator widget.
	- Function 2: Navigating forward to a new screen from the current route.
	- Function 3: Navigating forward to a new screen using push().
	- Function 4: Navigating forward to a new screen from the current route using pushNamed().
	- Function 5: Navigating backward to a new screen from the current route using popNamed().
	- Function 6: Navigating backward to a new screen from the current route using pop().
- Conclusion.

### Routing in flutter:  
Routing in Flutter is the process of defining the way users navigate from one screen to another.
Using MaterialApp widget we can define a primary route. While using NavigatorWidget we can then add further screens to it. The below code shows how this would look like:

```dart
import 'package:flutter/material.dart';
import 'home.dart';
void main(){
	runApp(
		MaterialApp(
		 home: HomeScreen(), )
		 ); 
		 } 
class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return Scaffold( 
		appBar: AppBar(
			title: Text("Home Screen")), 
		body: Center()); 
	} 	
}
```
### Navigation in Flutter.
Two types of navigators can be used for navigation.
1) Navigator
2) Navigator2D

The difference between the two is that Navigator uses a stack while Navigtor2D uses a flat list. We would usually use either one depending on our requirements. Example: If we want to show buttons at the center of the app. Let us see some intro screen on top of our app, then Navigator2D would be more suitable. The code below shows how to use routing in flutter applications. For this case using the Navigator widget.

```dart
import 'package:flutter/material.dart'; 
import 'home.dart'; 
void main(){ 
	runApp(Navigator( initialRoute: HomeScreen(), 
	home: HomeScreen() )
	); 
	}
class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return Scaffold( 
		appBar: AppBar(
			title: Text("Home Screen")), 
		body: Center()); 
		} 
	}
```

In the code shown above, we have first defined the screen that would be our first route. Here we have a simple home screen with a title as "Home Screen". We then set this particular screen to be our primary route using the initial route property. It is in the Navigator widget. We can later navigate to other screens like below:

```dart
routes: <String, WidgetBuilder> {
 '/firstpage': (BuildContext context) => My_page(title: 'firstPage'),
 '/second': (BuildContext context) => My_Page(title: 'Secondpage'),
 '/thirdpage': (BuildContext context) => My_Page(title: 'thirdpage'),
 },
```
### Navigation using Navigator2D
Using the code shown above, we now want to let user navigate through our Home screen . This will be possible by clicking on a button. This achieved by adding objects to the list of routes in Navigator2D.

```dart
class HomeScreen extends StatelessWidget { 
	@override Widget build(BuildContext context) { 
	return Scaffold( 
		appBar: AppBar(
			title: Text("Home Screen")), 
			 routes: <String, WidgetBuilder> {
				 '/firstpage': (BuildContext context) => My_page(title: 'firstPage'),
				 '/second': (BuildContext context) => My_Page(title: 'Secondpage'),
				'/thirdpage': (BuildContext context) => My_Page(title: 'thirdpage'),
			 } 
		} 
	}
```

In the code shown above, we add a list of objects to our routes in Navigator2D. Here it will show all the screens added as an object under MaterialApp route decorator. So far we have seen how to add objects in Navigator2D routes using Navigator widget.
This is the same as adding objects in Navigator widget. The only difference is that now we use navigator2D() method instead of initialRoute . This function returns an object which represents the route in Navigator2D.
### Navigator Function Description
In flutter, we have various navigator functions. They allow us to navigate through screens using different techniques. These functions are :  
- navigate() : Used for navigation to a new screen using Navigator widget use.
- Navigator() :  Used for navigating forward to a new screen from the current route.
- pop() : Pop the current route from the stack of routes.
- push() :  Push a new route onto the stack .
- pushNamed() : Push a new route onto the stack with a dynamic name

The above functions used in different ways to navigate between screens. Some of these functions discussed in the following sections:

### Function 1: Function for navigating to a new screen using Navigator widget

  Navigating from Home Screen to Page2 is illustrated below:
```dart
class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return Scaffold( 
		appBar: AppBar(
			title: Text("Home Screen")), 
			body: Center(ElevatedButton(
              onPressed: () {
				 Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => const FirstScreen()));
              },
              child: const Text('Go to firstScreen'),
            ),)); 
		}
 }

```
To navigate from Home screen to Page2, we make use of navigator() function in the code shown above. Here, it returns an object which is used for navigation. This is by adding objects to routes using Navigator widget.
 Since navigator() is only used to get the reference of screen that needs to be navigated. 

### Function 2: Navigating forward to a new screen from the current route

  
Going back to Page1 in code shown above is done using pop() function in the line of code below.
Navigation using pop() is illustrated below:

```dart

class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return Scaffold( 
		appBar: AppBar(
			title: Text("current Screen")), 
			body: Center(ElevatedButton(
              onPressed: () {
				 Navigator.pop(context);
              },
              child: const Text('Go to back'),
            ),
         ); 
       } 
     }
```

Here, in the code shown above, Page1 will be shown when the current screen is popped by making use of pop() function. 
### Function 3: Navigating forward to a new screen using push()

Going to new screen in code shown above is done by making use of push() function as shown below:
```dart

class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return 	Scaffold(
		 appBar: AppBar(
		 title: Text("Home Screen")), 
		 body: Center(
			ElevatedButton(
              onPressed: () {
				 Navigator.push(MaterialPageRoute(
                    builder: (context) => const FirstScreen()));
              child: const Text('Go to nextScreen'),
            ),
           )
         ); 
       } 
     }

  


```

Here, Page3 will be shown when the current screen is pushed by making use of push() function. 
### Function 4: Navigating forward to a new screen from the current route using pushNamed()
In this example, we have defined multiple screens i.e., Page1, Page2 and Page3. The pages are in our app which pages pushed to when required. In order to navigate between these screens, pushNamed() function is used as shown below:
```dart
class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) { 
	return Scaffold(
		 appBar: AppBar(
		 title: Text("Home Screen")),
		 body: Center(ElevatedButton(
            onPressed: () {
				Navigator.pushNamed(context,Secondscreen.routeName);
            },
            child: const Text('Go to Second Screen'),
          ),
         }
      }
```  
Here, Page2 will be pushed to when required. 
### Function 5: Navigating backward to a new screen from the current route using popNamed()
In this example, we have defined multiple screens i.e., Page1, Page2 and Page3 in our app which will be popped to when required. In order to navigate between these screens, popNamed() function is used as shown below.
popNamed() function is implemented as shown below:
```dart

class HomeScreen extends StatelessWidget { 
@override Widget build(BuildContext context) {
	 return Scaffold( 
		 appBar: AppBar(
			 title: Text("Home Screen")),
			 body: Center(
				 ElevatedButton(
	             onPressed: () {
					Navigator.pushNamed(context,Secondscreen.routeName);
            },
		         child: const Text('Go to Second Screen'),
          ),
       );
	 }
  }
```  

Here,  Page2 will be popped to when required.

  ### Conclusion
In this article, we have seen various ways to navigate between screens in the Flutter application. In the next article, we will discuss managing the state by caching as well as restoring it. Thanks for reading! If you like this article, please share it. Also, check out our flutter books on Amazon.For any query Reachout @ [this GitHub repository](https://github.com/karehnikita/).
Enjoy Coding !

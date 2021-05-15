# How to handle Navigation in flutter
### Introduction
One of the core concepts in all mobile applications is navigation, it allows a user to move between different pages. Navigating to different pages defines the workflow in any mobile application. This article will answer the question, how do we move between different pages? Using the flutter navigation and routing system. We will be building a simple app that will have an organized Navigation Named route with flutter.
### Prerequisites
Going through this guide Assumes you have an understanding of the basics of programming and a beginner-level knowledge of the flutter framework. the reader must be comfortable with creating a flutter project, basic flutter widgets, and layout in a flutter.
### Goal
After reading this article, the reader is expected to be familiar with:
Navigation and routing
Named route in flutter
How to conveniently handle navigation in flutter.

### Requirements
In this tutorial, we will be programming with the dart programming language using the flutter framework. We will be using the VS Code text editor to write our code, But Android studio will work fine.

### Routes
Generally, Routes can be seen as ways or courses taken in getting from a starting point to a destination.
Basically in app development routes can be seen as directions or paths a user takes within an app.

### Navigation
Generally Navigation can be seen as finding a way to get to a particular place or destination.
Navigation helps users to navigate or move across, into, and back out the pages or features of an app.

In this tutorial, we are going to create a very simple and organized named route in flutter. To have everything organized we will structure our navigation route files in the project folder. 
Inside our lib folder, we will create two folders with names route, and views. 
Inside the route folder we will create a file name route.dart, this file will serve as a controller for managing the route.
Inside our views folder, we will create all the pages we will be using for our application in our case we create the home, login, and register page.

![Folder](/engineering-education/how-to-handle-navigation-in-flutter/image1.PNG)

We will now go-ahead to create our pages,
Starting with the home, update the home.dart file with the code below.

```dart
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Go to Login page'),
          onPressed: null,
        ),
      ),
    );
  }
}

```
the above code is going to show an appbar with the page title then a button to direct you to another page. The same thing is going to be done to the remaining pages.
Update the login.dart file with the below code.

```dart
    import 'package:flutter/material.dart';

    class LoginPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
        appBar: AppBar(
            title: Text('Login Page'),
        ),
        body: Center(
            child: ElevatedButton(
            child: Text('Go to home page'),
            onPressed: null,
            ),
        ),
        );
    }
    }

```

Update the register.dart file with the below code

```dart
    import 'package:flutter/material.dart';

    class RegisterPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
        appBar: AppBar(
            title: Text('Register Page'),
        ),
        body: Center(
            child: ElevatedButton(
            child: Text('Go to Login page'),
            onPressed: null,
            ),
        ),
        );
    }
    }

```

Update the home.dart page with code below
```dart
    import 'package:flutter/material.dart';

    class RegisterPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
        appBar: AppBar(
            title: Text('Home Page'),
        ),
        body: Center(
            child: ElevatedButton(
            child: Text('Go to Register page'),
            onPressed: null,
            ),
        ),
        );
    }
    }

```

Next, we will create our navigation route. To do that let's update our route.dart file with the code below

```dart
    import 'package:flutter/material.dart';

    import 'package:tutorial_app/views/home.dart';
    import 'package:tutorial_app/views/login.dart';
    import 'package:tutorial_app/views/register.dart';

// route names
const loginPage = 'login';
const homePage = 'home';
const registerPage = 'register';

// Control our page route flow
Route<dynamic> controller(RouteSettings settings) {
  switch (settings.name) {
    case loginPage:
      return MaterialPageRoute(builder: (context) => LoginPage());
    case homePage:
      return MaterialPageRoute(builder: (context) => HomePage());
    case registerPage:
      return MaterialPageRoute(builder: (context) => RegisterPage());
    default:
      throw ('This route name does not exist');
  }
}

```
we started by importing all pages from the views file in the project directory, make sure that instead of **tutorial_app** you use your own project name in the import. Next, we defined our route name as a constant variable, then declared a controller function to enable us to control our routing flow.\
The controller function took an argument settings. The settings variable has two important parameters, settings.name, and settings.argument but we used only the setting.name parameter in this tutorial as seen in the switch case statement.\

Next we will update our main.dart file with the code below
```dart
    import 'package:flutter/material.dart';
    import 'route/route.dart' as route;

    void main() {
    runApp(MyApp());
    }

    class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
            primarySwatch: Colors.blue,
        ),
        onGenerateRoute: route.controller,
        initialRoute: route.loginPage,
        );
    }
    }

```
Here we imported out route.dart file as route then set the onGenerateRoute as our controller function and our initial route as our login page.

Finally, we will go to our pages and make a transition between each of them.\
To that, we will import out route.dart file inside each page in the view folder the import will look the code below
```dart
    import 'package:tutorial_app/route/route.dart' as route;
```
*Note* tutorial_app is the name of my project so yours should be the name of your project. 
Next, we will replace the null in our onpressed function in all pages with the code below

for the loginPage
```dart
    onPressed: () => Navigator.pushNamed(context, route.homePage),
```
for the homepage
```dart
    onPressed: () => Navigator.pushNamed(context, route.registerPage),
```
for the registerpage
```dart
    onPressed: () => Navigator.pushNamed(context, route.loginPage),
```
We will save all files and reload the app. After reload we will be able to navigate or move across, into and back out of our pages.

Our final app will look this;

![Login Page](/engineering-education/how-to-handle-navigation-in-flutter/image2.PNG)
![Home Page](/engineering-education/how-to-handle-navigation-in-flutter/image3.PNG)
![Register Page](/engineering-education/how-to-handle-navigation-in-flutter/image1.PNG)

You will be able to navigate through all the pages.


### Conclusion

We now have a simple app that has an organized navigation named route which enables us to move between different pages within our app. [Link to githup repo](https://github.com/wobin1/flutter-navigation)

To summarize, we learned a very simple and easy way of preventing our code from getting messy by having organized navigation named route.
 
### Further reading
- [Navigate with named route](https://flutter.dev/docs/cookbook/navigation/named-routes)
- [Navigate to a new screen and back](https://flutter.dev/docs/cookbook/navigation/navigation-basics)
- [Clean Navigation in Flutter Using Generated Routes](https://medium.com/flutter-community/clean-navigation-in-flutter-using-generated-routes-891bd6e000df)

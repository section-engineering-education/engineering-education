---
layout: engineering-education
status: publish
published: true
url: /how-to-handle-navigation-in-flutter/
title: How to Handle Navigation in Flutter
description: This article will show you how to navigate between different pages in Flutter. We will be building a simple app that uses an organized Navigation Named route.
author: nathaniel-dauda-wobin
date: 2021-06-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-handle-navigation-in-flutter/hero.jpg
    alt: Handling Navigation in Flutter
---
One of the core concepts in all mobile applications is navigation. It allows a user to move between different pages or activities. Navigation increases an app's functionality. It enables developers to include numerous features on different screens.
<!--more-->
### Prerequisites
This guide assumes that you have a basic understanding of the Flutter framework. You must be familiar with creating a Flutter project, basic Flutter widgets, and layouts. We will also be using Dart in this project. When it comes to the code editor, you can either use `Visual Studio Code` or `Android Studio`.

### Goal
This tutorial focuses on the following areas:
- Navigation and routing.
- Named route in Flutter.

### Routes
The ways or courses taken in getting from a point to a destination are called routes. In software development, routes can be seen as directions or paths that a user takes.

### Navigation
As stated, we are going to create a very simple and organized named route in Flutter. We will structure our navigation route files in the project folder. 

Inside our `lib` folder, we will create `two` folders; `route`, and `views`. 

In the `route` folder, create a file named `route.dart`. This file will serve as a `controller` for managing the route.

In the `views` folder, we will create all the `pages` we will be using for our application. This includes home, login, and register pages.

![Folder](/engineering-education/how-to-handle-navigation-in-flutter/image1.png)

Next, we will create our pages. 

In the `views` folder, create a new file and name it `home.dart` then add the following code. 

```dart
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
// code for the home page layout
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
// code for the button in the home page 
        child: ElevatedButton(
          child: Text('Go to Login page'),
          onPressed: null,
        ),
      ),
    );
  }
}

```

In the code above, we have included an appbar, page title, and button. We will direct the user to another page when the button is clicked. 

We will repeat the above code in all our pages.

Create a `login.dart` file and include the code below.

```dart
  import 'package:flutter/material.dart';
  class LoginPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
    // code for the login page layout
      return Scaffold(
        appBar: AppBar(
          title: Text('Login Page'),
        ),
        body: Center(
        // code for the button
          child: ElevatedButton(
            child: Text("Go to home page"),
            onPressed: null
          ),
        ),
      );
    }
  }

```

Create a `register.dart` file and include the following code.

```dart
  import 'package:flutter/material.dart';

  class RegisterPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
// code for the register layout
      return Scaffold(
        appBar: AppBar(
          title: Text('Register Page'),
        ),
        body: Center(
// code for button
          child: ElevatedButton(
            child: Text("Go to Login page"),
            onPressed: null
          ),
        ),
      );
    }
  }

```

Next, we will create our `navigation` route. To do that, let's update the `route.dart` file with the code below.

```dart
  import 'package:flutter/material.dart';
 // importing our pages into our route.dart
  import 'package:flutter_navigation/views/home.dart';
  import 'package:flutter_navigation/views/login.dart';
  import 'package:flutter_navigation/views/register.dart';

  // variable for our route names
  const String loginPage = 'login';
  const String homePage = 'home';
  const String registerPage = 'register';

  void login() {}

  // controller function with switch statement to control page route flow
  Route<dynamic> controller(RouteSettings settings) {
    switch (settings.name) {
      case loginPage:
        return MaterialPageRoute(builder: (context) => LoginPage());
      case homePage:
        return MaterialPageRoute(builder: (context) => HomePage());
      case registerPage:
        return MaterialPageRoute(builder: (context) => RegisterPage());
      default:
        throw ('this route name does not exist');
    }
  }

```

We started by importing all pages in the `views` folder. Make sure that you use your project name while importing the files. 

Next, we defined our route name as a `constant` variable, then declared a `controller` function to enable us to control the routing flow.

The `controller` function requires a setting to be passed in the arguments. The `settings` variable has two important parameters, `settings.name`, and `settings.argument`. We will only use the `setting.name` parameter in this tutorial.

Next we will update our `main.dart` file with the code below.

```dart
    import 'package:flutter/material.dart';
    // importing our route.dart into our main.dart 
    import 'route/route.dart' as route;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  // code for our main layout
    return MaterialApp(
      title: 'Flutter navigation',
      theme: ThemeData(
        primarySwatch: Colors.purple,
      ),
      // code that is setting the first page you will see when you open your app
      onGenerateRoute: route.controller,
      initialRoute: route.loginPage,
    );
  }
}
```

Here we imported the `route.dart` file as `route` then set the `onGenerateRoute` as our `controller` function and our initial route as our login page.

Then, we will go to our pages and make a transition between each of them.

To do that, we will import the `route.dart` file inside each page in the `views` folder, as shown below.

```dart
    // importing our route.dart file
    import 'package:tutorial_app/route/route.dart' as route;
```

> *Note* `tutorial_app` is the name of my project. 

Next, we will replace the `null` in our `onpressed` function on all pages with the code below.

Ror the homepage:
```dart
    // code that navigates us to the next page
    onPressed: () => Navigator.pushNamed(context, route.registerPage),
```

For the loginPage:
```dart
    // code that navigates us to the next page
    onPressed: () => Navigator.pushNamed(context, route.homePage),
```

For the registerpage:
```dart
    // code that navigates us to the next page
    onPressed: () => Navigator.pushNamed(context, route.loginPage),
```

We will save all files and reload the app. We will then be able to navigate across different pages.

Our final app will look this:

![Login Page](/engineering-education/how-to-handle-navigation-in-flutter/image2.png)

![Home Page](/engineering-education/how-to-handle-navigation-in-flutter/image3.png)

![Register Page](/engineering-education/how-to-handle-navigation-in-flutter/image4.png)

### Conclusion
We now have a simple app that has an organized `Named Route` navigation. You can download the full project from this [GitHub repo](https://github.com/wobin1/flutter-navigation). 

Using `Named Routes` helps us to reduce development time since it eliminates boilerplate code.

Happy coding!

### Further reading
- [Navigate with named route](https://flutter.dev/docs/cookbook/navigation/named-routes)
- [Navigate to a new screen and back](https://flutter.dev/docs/cookbook/navigation/navigation-basics)
- [Clean Navigation in Flutter Using Generated Routes](https://medium.com/flutter-community/clean-navigation-in-flutter-using-generated-routes-891bd6e000df)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)

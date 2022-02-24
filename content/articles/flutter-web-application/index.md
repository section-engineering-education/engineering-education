---
layout: engineering-education
status: publish
published: true
url: /flutter-web-application/
title: How to Build a Flutter Web Application
description: This article will take the reader through creating a web application using Flutter. Flutter for Web has recently moved from beta to stable. Flutter widgets are based on Google's material design principles. 
author: michael-barasa
date: 2021-05-28T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-web-application/hero.jpg
    alt: Flutter web image example
---
Flutter is an emerging framework used for crafting beautiful cross-platform mobile applications. It allows developers to target both iOS and Android platforms with a single code base. This feature helps save a significant amount of time and resources.
<!--more-->
With the release of `Flutter 2`, its popularity is set to rise even further. The Flutter framework will cause ripples in the web development field. 
### Introduction
New icons, as well as other components included in Flutter 2, will simplify the development of web applications. Flutter for Web has recently moved from beta to stable. 

This is good news to developers since they can build highly secure and appealing websites. Flutter widgets are based on Google's material design principles. This means that even inexperienced Flutter developers can design quality applications.

### Goal
This tutorial will guide the reader on how to create a simple Flutter web application.

### Prerequisites
- Some knowledge of the Dart programming language.
- You must be familiar with the Flutter framework including its widgets and styles.
- A code editor that supports Flutter. This tutorial uses `Visual Studio Code`.
- Google Chrome.
- Flutter SDK.

### Getting started
Before creating the project, we should ensure that the latest Flutter version (2) is installed. Open your terminal and run `flutter doctor` command. 

Note that this verification process takes some time to complete.

You should have the following output if Flutter SDK is installed correctly on your computer.

![GETTING STARTED](/engineering-education/flutter-web-application/getting-started.png)

You can use the following command to upgrade Flutter to the latest version.

```bash
flutter channel stable
flutter upgrade
```

Please note that the `flutter channel stable` command will delete your current Flutter version and replace it with a more stable version. 

As noted, we need Google Chrome to test our web application. Remember Google Chrome should be included among the connected flutter devices when you run the `flutter doctor` command.

### Creating the project
We use the `flutter create webapp` command to build a new project. This command downloads and includes the required dependences in the application. You can replace `webapp` with your desired project name.

We can create a localhost for the webapp using the command below:

```bash
Flutter run -d chrome
```

The above command will launch the application in the Chrome browser. Note that `-d chrome` portion of the `run` command is only used when there are several connected devices.

You should see the following output in your browser:

![SUCCESS](/engineering-education/flutter-web-application/success.png)

### Understanding project structure
In this step, we will look at the different folders and files included in the project. Open the web app in Visual Studio Code. You will notice the following folders; dart_tool, .idea, android, build, ios, lib, test, and web. We will mainly be working with the lib and web folders. 

All our programming files should be included in the lib. These files are then compiled depending on the platform that one is targeting. In our case, the files will be compiled and stored in the web folder. The `index.html` file in the `web` folder will serve as an entry point to our application.

![ORGANIZATION](/engineering-education/flutter-web-application/organization.png)

### Designing the webpage
We will be designing the web application shown below:

![DESIGN](/engineering-education/flutter-web-application/design.png)

The above application has a `navigation bar`, `two pages`, and `Text widgets`.

Let’s include these components in our application.

Open the `main.dart` file in the `lib` folder and make the following modifications.

```dart
import 'package:flutter/material.dart';
import './homepage.dart' //import a homepage

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(), //add the homepage to the main application
    );
  }
}


```

As shown above, you must import the `material` package to use different widgets. `MyApp` class returns a `MaterialApp` which is invoked in the `main` method. 

However, running the above application will not work because we have not created the `HomePage` component. Let’s do this in the next step.

### Creating the HomePage
Create a new file in the `lib` folder and name it `homepage.dart`. Next, insert a stateful widget in the `homepage.dart` file, as shown below.

```dart
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Container(
       child: child,
    );
  }
}
```

We need to add individual components in the `_HomePageState` class. 

These elements are specifically added here:

```dart
return Container(
       child: child,
    );
```

We need to return a `Scaffold` instead of a `container`. A Scaffold allows us to include more elements on the web page. The Scaffold is added as shown below.

```dart
return Scaffold(
       child: child,
    );
```

### Adding more components to the Homepage
In this step, we need to add `buttons`, `Appbar`, and `text` widgets to the HomePage. This is done as shown below.

> Note that I have added inline comments to explain the implementation of these widgets.

```dart
import 'package:flutter/material.dart';
import './about.dart'; //importing the AboutPage

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( //adding an Appbar
        title: Text('MyApp'), //the name of the application
        actions: [  // the actions widget allows us to add several navigation items

          Center( //adding the first navigation item and positioning it at the center
            child: OutlinedButton(
              child: Text('Home', style: TextStyle(color: Colors.red)),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => HomePage()),
                );
                Navigator.pop(context);
              },
            ),
          ),

          SizedBox(width: 60), //putting some space between the nav items

          Center(  //adding the second navigation item and positioning it at the center
            child: OutlinedButton(
              child: Text('About', style: TextStyle(color: Colors.white)),
              onPressed: () { //determining what should happen when the navigation item is clicked.
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AboutPage()),
                );
              },
            ),
          ),
          SizedBox(width: 80)
        ],
      ),
      body:
       Container(
        child: Center(  //adding a text message and positioning it at the center of the web page.
          child: Text(
            'Welcome to MyApp',
            style: TextStyle(fontSize: 50, color: Colors.red), //the text message is red and has a font size of 50.
          ),
        ),
      ),
    );
  }
}
```

We navigate from one page to another using `Navigator`, as shown below.

```dart
 Navigator.push(context, MaterialPageRoute(builder: (context) => AboutPage()),);
```

In the code snippet above, we will navigate from the `HomePage` to the `AboutPage`. The `AboutPage` will have a `leading arrow` which will allow us to go back to the previous page (HomePage).

### Creating the AboutPage
Create a new file in the `lib` folder and name it `about.dart`. In this file create a `stateful` widget as demonstrated in the previous steps. Our `AboutPage` will have an `AppBar` and a `Text` section.

> Note that the AboutPage is nearly similar to the HomePage. Therefore, you can follow the guidelines in the previous step to complete it.

Here is the code for the AboutPage.

```dart
import 'package:flutter/material.dart';
import './homepage.dart'; //importing the home widget

class AboutPage extends StatefulWidget {
  AboutPage({Key key}) : super(key: key);

  @override
  _AboutPageState createState() => _AboutPageState();
}

class _AboutPageState extends State<AboutPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About'),
        actions: [
          SizedBox(width: 60),
          Center(
            child: OutlinedButton(
                child: Text('About'),
                onPressed: () null),
          ),
          SizedBox(width: 80)
        ],
      ),
      body: Container(
        child: Center(
          child: Text(
            'This is the about page. You can outline your vision, mission, and objectives on this page', //Once again, this text message will be displayed in the center of the page.
            style: TextStyle(fontSize: 18),
          ),
        ),
      ),
    );
  }
}
```

### Testing the application
As stated, we will test our Flutter application using `Google Chrome`.

Open a terminal inside your code editor and run `flutter run -d chrome` command. The `-d` ensures that we are targeting the right platform which in our case is `Chrome`. 

The application should compile and run in the browser if you followed the steps carefully.

### Conclusion
In this tutorial, we have created a simple web application using Flutter. You can, therefore, use this knowledge to create more powerful apps using this framework. In case you have not understood any concept, feel free to go back to the previous steps.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
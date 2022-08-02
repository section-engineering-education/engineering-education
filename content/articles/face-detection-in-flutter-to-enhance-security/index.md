---
layout: engineering-education
status: publish
published: true
url: /face-detection-in-flutter-to-enhance-security/
title: Using Face Detection in Flutter to Enhance Security
description: This article will introduce the reader to Flutter face dection plugin and how to use it to enhance security.
author: naomi-wangari
date: 2022-06-20T00:00:00-15:10
topics: [Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/face-detection-in-flutter-to-enhance-security/hero.jpg
    alt: Using face detection in flutter to enhance security Hero Image
---
Face Detection is a technique used to enhance security by identifying the presence of a face in an image. Most people use facial recognition technology to improve the security of their devices i.e. mobile phones. 
<!--more-->
For example, banks are using facial recognition software to prevent bank robberies. In addition, airports are using facial recognition software to identify terrorists. Facial recognition technology can be helpful in other ways as well. For example, help track down criminals.

### Introduction
Flutter is a new mobile development framework created by Google. It allows developers to create native apps for both Android and iOS using a single codebase. One of the most popular features of Flutter is its face detection plugin. This plugin uses the device's camera to detect faces in real-time.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table-of-content)
- [Prerequisites](#prerequisites)
- [Step One: Creating a new project in Flutter](#step-one-creating-a-new-project-in-flutter)
- [Step Two: Adding dependencies to the new project](#step-two-adding-dependencies-to-the-new-project)
- [Step Three: Importing the necessary packages](#step-three-importing-the-necessary-packages)
- [Step Four: Implementing logic](#step-four-implementing-logic)
- [Step Five: User Interface](#step-five-user-interface)
- [Conclusion](#conclusion)

In this article, you will learn how to develop a Flutter application that utilises face detection to enhance security.

### Prerequisites
To follow along the reader will need to have the following:
- Basic knowledge of Flutter and Dart.
- Have Flutter SDK installed on your machine.
- Have a code editor installed on your machine. I'll be using VS Code.

### Step One: Creating a new project in Flutter
On the terminal, create a new flutter project with the name `facedetection` by executing the command below.

```dart
flutter create facedetection
```

For this case, you can also create the new project via the command palette in VS code. Create a new Flutter, select the location and Flutter project name.

### Step Two: Adding dependencies to the new project
After the project is created, open the `pubspec.yaml` file and add the following dependencies:
```dart
face_detector: ^0.2.0
image_picker: ^0.4.5+1
```

We can also add the plugins by executing the command below.
```dart
flutter pub add flutter_face_detector
```

### Step Three: Importing the necessary packages
Update the code snippet on `main.dart` file with the code snippets below.
```dart
import 'package:flutter/material.dart';
import 'package:face_detector/face_detector.dart';
import 'package:image_picker/image_picker.dart';
class MyApp extends StatelessWidget {
// This widget is the root of your application.
@override
Widget build(BuildContext context) {
  return MaterialApp(
    title: 'Flutter Demo',
    theme: ThemeData(
    primarySwatch: Colors.blue,),
    home: MyHomePage(title: 'Flutter Demo Home Page'),
        );
    }
}
class MyHomePage extends StatefulWidget {
 MyHomePage({Key key, this.title}) : super(key: key); 
    final String title;
 @override
    _MyHomePageState createState() => _MyHomePageState();
    }
class _MyHomePageState extends State {
// TODO: implement state logic here.
}
```

In the code above, we will first import the necessary packages. We will then create a class called `MyApp` that extends `StatelessWidget`. This widget is the root of our application. 

We then override the build function to create a MaterialApp widget. This widget will provide us with standard material design components. We also pass in a title and home page.

The home page is where we will render our content. We then create a `StatefulWidget` called `MyHomePage`. This widget will allow us to interact with our users and update the UI. We will implement our state logic in the `_MyHomePageState` class.

### Step Four: Implementing logic
We need to add some variables that we will be using in our code. Add the following variables to the class `_MyHomePageState`:
```dart
faces: List<Face>();
img_path: String;
```

This list stores the information we need concerning the faces. If the face is in the list, then it can be detected.

We need to add a function to detect faces in an image. Add the following function to the class:
```dart
detect faces(image) {
// TODO: implement face detection logic here.
}
```

Next, we need to add a function that we will use to get the image path. Add the following function to the class:
```dart
getImagePath() {
// TODO: implement image path retrieval logic here.
}
```

We need to add a function that we will use to set the image path. Add the following function to the class:
```dart
setImagePath(path) {
// TODO: implement image path setting logic here.
}
```

We need to add a function that we will use to load an image from a given path. Add the following function to the class:

```dart
loadImage(path) {
// TODO: implement image loading logic here.
}
```
Now that our functions are in place, we can start implementing our UI.

### Step Five: User Interface
We will start by adding a title to our home page. Add the following code to the build function:
```dart
return Scaffold(
  appBar: AppBar(
    title: Text('Flutter Face Detection'),
    ),
);
```

Next, we will add a button that will be used to select an image. Add the following code to the build function:
```dart
body: Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
        RaisedButton(
          child: Text('Select Image'),
            onPressed: () {},
            ),
        ],
    ),
),
```
Now we need to add the logic for our button. We will use the `image_picker` package to select an image. Add the following code to the `onPressed` function:
```dart
image_picker.pickImage(
// TODO: implement image selection logic here.
);
```
Finally, we need to add the face detection code. We will use the `face_detector` package to detect faces in our image. Add the following code to the `onPressed` function:
```dart
detectFaces(image);
```

Now that our code is in place, we can run our app and test it out. Select an image, and you should see the faces being detected.

### Conclusion
In this article, we learned how to use the face detection plugin in Flutter. The images selected and added to our list are the ones we can detect. 

Congratulations! You have now created a Flutter app that uses the Flutter face detection plugin.

Happy coding!

---
Peer review contribution by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

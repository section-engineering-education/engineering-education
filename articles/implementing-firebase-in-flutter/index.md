---
layout: engineering-education
status: publish
published: true
url: /engineering-education/implementing-firebase-in-flutter/
title: Firebase's Realtime Database in a Flutter Application
description: In this tutorial we will focus on the real-time database. Firebase offers synchronization that ensures that all connected devices are notified whenever data changes. 
author: michael-barasa
date: 2021-01-03T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-firebase-in-flutter/hero.png
    alt: Firebase and Flutter image
---
Flutter is a SDK (Software Development Kit) used to develop cross-platform applications. Developers can target major platforms such as iOS, Android, Windows, and Linux with a single code base. Firebase is a platform developed by Google for creating mobile and web applications.  
<!--more-->
It provides functionalities such as real-time database, cloud storage, authentication, and hosting. This tutorial focuses on the real-time database. Firebase also offers synchronization which ensures that all connected devices are notified whenever data changes. 

### Goal of this tutorial
To implement Firebase in a Flutter application and use Firebase's Real-Time Database to store and retrieve data.

You can view the source code of this project from [here](https://github.com/WanjaMIKE/flutterfirebaseexample).

### Prerequisites
This tutorial is suitable for beginners.

For you to follow along with this tutorial, you should have the [Flutter SDK](https://flutter.dev/docs/get-started/install) installed on your computer. 

For the IDE, you can either use [Android Studio](https://developer.android.com/studio) or [Visual Studio Code](https://code.visualstudio.com/download). 

You should have a [Firebase account](https://firebase.google.com/) to access its products.

You can learn more on setting up Flutter's development environment from [here](https://flutter.dev/docs/get-started/install/).

### Setting up the project
Launch Android Studio and create a new Flutter project.

![getting started](/engineering-education/implementing-firebase-in-flutter/getting-started.png)

Open the `pubspec.yaml` file and add the following Flutter dependencies.

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  firebase_database: ^4.4.0
  firebase_core : ^0.5.3
```

Use the `pub get` command to retrieve appropriate dependencies.

Next, open your browser and navigate to [Firebase's website](https://firebase.google.com/). We need to create a new firebase project, as shown below.

![project name](/engineering-education/implementing-firebase-in-flutter/project-name.png)

Add your Flutter application to Firebase by clicking on the Android icon.

![add app](/engineering-education/implementing-firebase-in-flutter/add-app.png)

Add your application's package name as shown in the image below. 

![find package](/engineering-education/implementing-firebase-in-flutter/find-package.png)

You can find your package name in the app-level – `build.gradle` file. Click register app after completing this step.

![package name](/engineering-education/implementing-firebase-in-flutter/package-name.png)

Download the `google-services.json` file and paste it into the `android/app` folder.

![paste json](/engineering-education/implementing-firebase-in-flutter/paste-json.png)

Paste `classpath 'com.google.gms:google-services:4.3.3'` in the project level – `build.gradle` file.

```gradle
dependencies {
  classpath 'com.android.tools.build:gradle:3.5.0'
  classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
  classpath 'com.google.gms:google-services:4.3.3'
}
```

Navigate to the app-level – `build.gradle` file and add `apply plugin: 'com.google.gms.google-services'` as shown below.

```gradle
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"
apply plugin: 'com.google.gms.google-services'
```

After the project is created successfully, navigate back to the Firebase console's realtime database section, and create a new database.

![create database](/engineering-education/implementing-firebase-in-flutter/create-database.png)

In the `rules` section, ensure that you click on `test mode` rather than the `locked mode`. This allows us to read and write the data without authentication. Note that these rules should not be used in a production application since anyone can access the data.

```json
{
  "rules": {
    ".read": "now < 1610053200000",  // 2021-1-8
    ".write": "now < 1610053200000",  // 2021-1-8
  }
}
```

You can find more information about changing the rules above for a production application [here](https://firebase.google.com/docs/rules/manage-deploy).

We have successfully set up Firebase and the Flutter project. Let's design the UI.

### Building the UI
The app will have a simple user interface. It will allow a user to input a word or sentence and click on a button to save it to the Firebase database.

![ui](/engineering-education/implementing-firebase-in-flutter/ui.jpeg)

Create a new file called `home.dart.` In this file, create a `stateful class` and name it `HomePage.`
We'll create a stateful widget and scaffold, as shown below.

```dart 
class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold();  // add scaffold here
  }
}
```

We can then create the above `UI` in this file by pasting the following code in the body section of the `Scaffold.` 

```dart
Scaffold(
  appBar: AppBar(title: Text("Firebase Demo"),),
  body: Container(
  child: Column(
    children: <Widget>[
      SizedBox(height: 250.0),
      Padding(
        padding: EdgeInsets.all(10.0),
        child: TextField(),
      ),
      SizedBox(height: 30.0),
      Center(
        child: RaisedButton(
          color: Colors.pinkAccent,
          child: Text("Save to Database"),
          onPressed: () {
            //call method flutter upload
          }
        )
      ),
    ],
  ),
),);
```

Import the `HomePage` class in the `main.dart` file. Ensure that the `HomePage` is initialized, as shown below.

```dart
import 'package:flutter/material.dart';
import 'home.dart';

void main(){
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
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomePage(),
    );
  }
}
```

Ensure that you have the following imports at the top of the Home page.

```dart
import 'package:flutter/material.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_core/firebase_core.dart';
```

- `package:flutter/material.dart` - This import allows you to access Flutter's built-in widgets and other functionalities.
- `package:firebase_database/firebase_database.dart` - This import helps access the Firebase Realtime database features.
- `package:firebase_core/firebase_core.dart` - This dependency enables you to connect to different Firebase products. 

### Storing data
We will initialize a Firebase `databaseReference` object and use it to store data.

```dart
final databaseRef = FirebaseDatabase._instance_.reference(); //database reference object

void addData(String data) {
  databaseRef.push().set({'name': data, 'comment': 'A good season'});
}
```

The `addData` function stores the user input along with a string (`'comment': 'A good season'`). Essentially, we can add any object to the database.

We'll call the `addData` function when the `RaisedButton` is clicked.

```dart
onPressed: () {
 addData(textcontroller.text);
  //call method flutter upload
})),
```

We'll access the user input using a `textcontroller`. This element allows us to listen for changes in a TextField.

We need to include the textcontroller in the HomePageState class.

```dart
class _HomePageState extends State<HomePage> {
  final textcontroller = TextEditingController();
```

The textcontroller is the added to the TextField widget, as shown below.

```dart
TextField(controller: textcontroller),
```

Please note that we need to use a `FutureBuilder` for async operations. This class allows the application to retrieve results once the network operation is completed. 

This class also helps us initialize the Firebase app. You can learn more about FutureBuilder from [here](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html).

```dart
class _HomePageState extends State<HomePage> {
 final Future<FirebaseApp> _future = Firebase.initializeApp();
```

`_future` is then added to the `FutureBuilder` in the `Scaffold`. This operation is illustrated below. As noted, FutureBuilder helps in awaiting long-running operations.

```dart
return Scaffold(
  appBar: AppBar(
  title: Text("Firebase Demo"),),
  body: FutureBuilder(
            future: _future,
            builder: (context, snapshot) {
              if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              } else {
                return Container(
```

### Retrieving data
For simplicity, we will retrieve and print out the data in the console. This is shown below.

```dart
void printFirebase(){
  databaseRef.once().then((DataSnapshot snapshot) {
    print('Data : ${snapshot.value}');
  });
}
```

We'll call the function above in the  `_HomePageState` class's `build` method.

Here is the complete code for the HomePage class.

```dart
import 'package:flutter/material.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:firebase_core/firebase_core.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final textcontroller = TextEditingController();
  final databaseRef = FirebaseDatabase.instance.reference();
  final Future<FirebaseApp> _future = Firebase.initializeApp();

  void addData(String data) {
    databaseRef.push().set({'name': data, 'comment': 'A good season'});
  }

  void printFirebase(){
    databaseRef.once().then((DataSnapshot snapshot) {
      print('Data : ${snapshot.value}');
    });
  }

  @override
  Widget build(BuildContext context) {
    printFirebase();
    return Scaffold(
      appBar: AppBar(
        title: Text("Firebase Demo"),
      ),
      body: FutureBuilder(
          future: _future,
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return Text(snapshot.error.toString());
            } else {
              return Container(
                child: Column(
                  children: <Widget>[
                    SizedBox(height: 250.0),
                    Padding(
                      padding: EdgeInsets.all(10.0),
                      child: TextField(
                        controller: textcontroller,
                      ),
                    ),
                    SizedBox(height: 30.0),
                    Center(
                      child: RaisedButton(
                          color: Colors.pinkAccent,
                          child: Text("Save to Database"),
                          onPressed: () {
                            addData(textcontroller.text);
                            //call method flutter upload
                          }
                        )
                     ),
                  ],
                ),
              );
            }
          }
       ),
    );
  }
}
```

### 5. Results
When we click on the Save to Database button. The user input is stored in the real-time database, as shown below.

![results](/engineering-education/implementing-firebase-in-flutter/firebaseresults.png)

The following items are also printed.

![console results](/engineering-education/implementing-firebase-in-flutter/console.png)

### Recap
We have successfully created a simple Flutter application that can store and retrieve records from the Firebase Realtime Database. Please remember these following points when you are working on your own project.

- You must create a Firebase account to access its products such as the real-time database.

- You must instantiate the Firebase Realtime Database before using it in your application.

- Use a FutureBuilder object when awaiting for network requests or operations.

### References

- [FlutterFire](https://firebase.flutter.dev/docs/overview/)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)


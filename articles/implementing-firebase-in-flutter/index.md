Flutter is a popular platform when it comes to the development of cross-platform applications. Developers can target major platforms such as iOS, Android, Windows, and Linux with a single code base. Flutter reduces development time and associated costs. Furthermore, developers can use widgets to create a more flexible and interactive UIs. Incorporating Firebase in Flutter applications will enhance productivity significantly.

### Introduction
Firebase helps developers in creating high-quality applications. It provides functionalities such as real-time database, cloud storage, authentication, and hosting. This tutorial focuses more on the real-time database. Firebase offers synchronization that ensures that all connected devices are notified whenever data changes. In this tutorial, we will be building a simple expense tracker application. It will allow individuals to store and retrieve a list of expenses. Let&#39;s get started.

### Goal of the Tutorial
To implement Firebase in a Flutter application and use Firebase's Real-Time Database to store and retrieve data.

### Prerequisites
This tutorial is suitable for beginners.

For you to follow along, you should have the [Flutter SDK](https://flutter.dev/docs/get-started/install) installed on your computer. For the IDE, you can either use [Android Studio](https://developer.android.com/) or [Visual Studio Code](https://code.visualstudio.com/download). You should have an [Firebase account](https://firebase.google.com/) to access its products.

### Getting started
Launch Android Studio and create a new Flutter project.

![getting started](/engineering-educationimplementing-firebase-in-flutter/getting-started.png)

Open the `pubspec.yaml` file and add the following Flutter dependencies.

```
dev_dependencies:
  flutter_test:
    sdk: flutter
  firebase_database: ^4.4.0
  firebase_core : ^0.5.3
```

Use the `pub get` command to retrieve appropriate dependencies.

Next, open your browser and navigate to the [Firebase](https://firebase.google.com/) website. We need to create a new firebase project, as shown below.

![project name](/engineering-educationimplementing-firebase-in-flutter/project-name.png)

Add your flutter application to Firebase by clicking on the android icon.

![add app](/engineering-educationimplementing-firebase-in-flutter/add-app.png)

Add your application's package name as shown in the image below. You can find your package name in the app-level – `build.gradle` file. Click register app after completing this step.

![package name](/engineering-educationimplementing-firebase-in-flutter/package-name.png)

Download the generated `google-services.json` file and paste it into the `app` folder

![paste json](/engineering-educationimplementing-firebase-in-flutter/paste-json.png)

Paste `classpath 'com.google.gms:google-services:4.3.3'` in the project level – `build.gradle` file.

```
dependencies {
  classpath 'com.android.tools.build:gradle:3.5.0'
  classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
  classpath 'com.google.gms:google-services:4.3.3'
}
```

Navigate to the app-level – `build.gradle` file and add `apply plugin: 'com.google.gms.google-services'` as shown below.

```
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"
apply plugin: 'com.google.gms.google-services'
````

After the project is created successfully, navigate back to the Firebase console's realtime database section, and create a new database.

![create database](/engineering-educationimplementing-firebase-in-flutter/create-database.png)

In the `rules` section, ensure that you click on `test mode` rather than the `locked mode`. This allows us to read and write data without authentication. Note that these rules should not be used in a production application since anyone can access data.

```json
{
  "rules": {
    ".read": "now < 1610053200000",  // 2021-1-8
    ".write": "now < 1610053200000",  // 2021-1-8
  }
}
```

We have successfully set up Firebase and the flutter project. Let's design the UI.

### Creating UI
The app will have a simple user interface. It will allow a user to input a word or sentence and click on a button to save it to the Firebase database.

![ui](/engineering-educationimplementing-firebase-in-flutter/ui.jpeg)

Create a new file called `home.dart.` In this file, create a `stateful class` and name it `HomePage.`

We can then create the above `UI` in this file by pasting the following code in the body section of the `Scaffold.`

```dart
Container(
  child: Column(
    children: <Widget>[
      SizedBox(height: 250.0),
      Padding(
        padding: EdgeInsets.all(10.0),
        child: TextField(
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
              })),
    ],
  ),
);
```

Import the `HomePage` class in the `main.dart` file. Ensure that the `HomePage` is initialized, as shown below.

```dart
import 'package:flutter/material.dart';
import 'home.dart';
import 'package:firebase_core/firebase_core.dart';


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

### 3. Storing data
We will initialize a Firebase `databaseReference` object and use it to store data.

```dart
final databaseRef = FirebaseDatabase._instance_.reference(); //database reference object

void addData(String data) {
  databaseRef.push().set({'name': data, 'comment': 'A good season'});
}
```

Please note that we need to use a `FutureBuilder` for long-running operations. This class allows the application to retrieve results once the network operation is completed. This class also helps us initialize the Firebase app. You can learn more about FutureBuilder from [here](https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html).

### 4. Retrieving data
For simplicity, we will retrieve and print out the data in the console. This is shown below.

```dart
void printFirebase(){
  databaseRef.once().then((DataSnapshot snapshot) {
    print('Data : ${snapshot.value}');
  });
}
```

Here is the full code for the HomePage class

```dart
import 'package:flutter/cupertino.dart';
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
                            })),
                  ],
                ),
              );
            }
          }),

    );
  }
}
```

### 5. Results
When we click on the Save to Database button. The user input is stored in the real-time database, as shown.

![results](/engineering-educationimplementing-firebase-in-flutter/firebaseresults.png)

The following items are also printed.

![console results](/engineering-educationimplementing-firebase-in-flutter/console.png)

### Recap
We have successfully created a simple Flutter application that can store and retrieve records from the Firebase Realtime Database. Please remember these following points when you are working on your own project.

1. You must create a Firebase account to access its products such as the real-time database.

2. You must instantiate the Firebase Realtime Database before using it in your application.

3. Use a FutureBuilder object when awaiting for network requests or operations.

### References
[FlutterFire](https://firebase.flutter.dev/docs/overview/)

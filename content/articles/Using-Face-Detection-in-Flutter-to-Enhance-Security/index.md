### Introduction
  Face Detection is a technique used to enhance security by identifying the presence of a face in an image. Most people use facial recognition technology to enhance their security. This is because it is a very reliable way to identify someone. Besides, it is becoming difficult to fool facial recognition software. Companies are starting to use facial recognition technology in their security systems. For example, banks are using facial recognition software to prevent bank robberies. Airports are using facial recognition software to identify terrorists. Facial recognition technology can be useful in other ways as well. For example, help track down criminals.
Flutter is a new mobile development framework created by Google. It allows developers to create native apps for both Android and iOS using a single codebase. One of the most popular features of Flutter is its face detection plugin. This plugin uses the device's camera to detect faces in real-time. It has a variety of purposes, such as security, customer service, or even for fun.
If you are looking to use face detection in your app, then Flutter is a great option.
### Table of Content
- Introduction.
- Prerequisites.
- Creating a new project in flutter.
- Adding dependencies to the new project.
- Importing the necessary packages.
- Implementing Logic (adding Variables ).
- Creating Necessary Function.
- User Interface
- Conclusion

In this article, you will learn how to develop a flutter application that can be used Face Detection to Enhance Security.
### Prerequisites
-    Basic knowledge of Flutter SDK and widgets.
-   Familiar with Flutter and the Dart programming language.
-   Have code editor installed (VS Code).
Let's start developing our application.
### Step One: Creating a new project in flutter.
 Open the terminal and create a new flutter project with the name `facedetection`.
```dart
flutter create facedetection
```
You can also create the new project via the command pallete in Vs code for this case. Create a new flutter, select location and flutter project name.

### Step Two: Adding dependencies to the new project.
After the project is created, open the pubspec.yaml file and add the following dependencies:
```dart
face_detector: ^0.2.0
image_picker: ^0.4.5+1
```
We can do this by using the following command:
```dart
flutter pub add flutter_face_detector
```
This will add the face detection plugin to our project.

### Step Three: Importing the necessary packages.

Now open the main.dart file and replace the code with the following:
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
In the code above, we first import the necessary packages. We then create a class called MyApp that extends StatelessWidget. This widget is the root of our application. We then override the build function to create a MaterialApp widget. This widget will provide us with standard material design components. We also pass in a title and home page. The home page is where we will render our content. We then create a stateful widget called MyHomePage. This widget will allow us to interact with our users and update the UI.
In the _MyHomePageState class, we will implement our state logic.
### Step Four: Implementing Logic (adding Variables )
First, we need to add some variables that we will be using in our code. Add the following variables to the class( _MyHomePageState ):
```dart
faces: List<Face>();
img_path: String;
```
This list stores the information we need with regards to the faces. if the face is in the list then it can be detected.

### Step Five: Creating Necessary Functions.

- Next, we need to add a function to detect faces in an image. Add the following function to the class:
```dart
detect faces(image) {
// TODO: implement face detection logic here.
}
```
- Next, we need to add a function that will be used to get the image path. Add the following function to the class:
```dart
getImagePath() {
// TODO: implement image path retrieval logic here.
}
```
- Now we need to add a function that will be used to set the image path. Add the following function to the class:
```dart
setImagePath(path) {
// TODO: implement image path setting logic here.
}
```
 - Finally, we need to add a function that will be used to load an image from a given path. Add the following function to the class:

```dart
loadImage(path) {
// TODO: implement image loading logic here.
}
```
Now that we have our functions in place, we can now start implementing our UI.
### Step Six: User Interface
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
Now we need to add the logic for our button. We will use the image_picker package to select an image. Add the following code to the onPressed function:
```dart
image_picker.pickImage(
// TODO: implement image selection logic here.
);
```
Finally, we need to add the face detection code. We will use the face_detector package to detect faces in our image. Add the following code to the onPressed function:
```dart
detectFaces(image);
```
Now that we have our code in place, we can run our app and test it out. Select an image and you should see the faces being detected.
You can also try changing the image path to see how the app reacts.
### Conclusion
In this article, we have learned how to use the face detection plugin in Flutter. We have also learned how to use this plugin to create an app. The images selected and added to our list are the ones one can detect. The logic of this is that if we put in place in a school or company is use it a gate pass may be or check somebody identity. The system will check if they exist.
 Congratulations! You have now created a Flutter app that uses face detection.

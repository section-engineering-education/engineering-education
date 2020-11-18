 

In Flutter, everything is a widget. Developers compose high-quality and creative UI screens using widgets. The flexibility supports outstanding designs that wow users. Such features are difficult to meet in native app development using languages such as Java. But it creates certain challenges. Particularly, it&#39;s difficult to implement State Management. You can learn about state management from [here](https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro). It is also challenging to pass data from the primary widget to its children. The introduction of the scoped\_model library helped resolve these issues.

Let&#39;s dive in.

### Introduction

The scoped\_model library consists of various utilities that allow children UI elements to receive data from their parent Widget. The library consists of three major classes; the ScopedModelDescendant, the Model, and the ScopedModel. You must extend the Model class to listen for changes. The ScopeModel widget can be used to wrap UI components to access data from the Model. The ScopedModelDescendant lets you identify the correct ScopeModel from the widget hierarchy. You can learn more about the scoped\_model library from here.

Let&#39;s implement the library in a Flutter application.

### Prerequisites

1. You must be familiar with [Dart](https://dart.dev/) and [Flutter](https://flutter.dev/?gclid=Cj0KCQiAqdP9BRDVARIsAGSZ8AnCz_EBYwFun_g6f2nAyWqPcTxFEMpwnLbjPNdGnZ5m05taSW1LvG8aArElEALw_wcB&gclsrc=aw.ds)

2. Have Android Studio, or Visual Studio Code installed

3. Have the latest Flutter SDK

4. Download full project from [here](https://github.com/WanjaMIKE/flutter-scoped_model)

### The goal of the tutorial

By the end of this tutorial, you will create an application that follows State Management principles in Flutter. It will allow customers to insert and submit their tips in a restaurant.

### Creating the project

Open `Android Studio` click file, then create a `new Flutter project.` Ensure that you set the proper Flutter SDK path to avoid errors. Also, the computer needs to be online for Flutter dependencies and libraries to be installed. If this process is successful, your start page should be as the image below. You have to be patient since this stage takes time.

![Creating new project](/engineering-education/implementing-scoped-model-in-your-flutter-application/creating-project.png)

### Installing the required library

You must install the required library for you to access the scoped\_model&#39;s functionalities. Open the `pubspec.yaml` file, go to the dependencies section, and paste `scoped\_model : ^1.1.0`. Ensure that the statement aligns vertically with the term `flutter.` Ignoring this detail will result in errors during compilation. Your `pubspec.yaml` file should look as illustrated below.

### Creating the UI

In this stage, we will use numerous widgets to create the user interface. Our final design should be similar to the image below.

![App design](/engineering-education/implementing-scoped-model-in-your-flutter-application/ui.jpg)

#### Modify `main.dart` file

Go to the `lib` folder and open the `main.dart` file. You will notice that there is a pre-generated code in the file. We won&#39;t be needing this code, so delete it starting from `class MyHomePage` downwards. Then go to `MyApp class,` in the same file, and change the `home` parameter to `home: HomePage().` You can follow the following code to avoid confusion.

```

import 'package:flutter/material.dart';

import './model/tip.dart';

import 'package:scoped_model/scoped_model.dart';

import './ui/home.dart';

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

           visualDensity: VisualDensity.adaptivePlatformDensity,

         ),

         home: HomePage()

   );

 }

}

```

#### Design the homepage

Make a new package in the `lib` folder and name it `ui.` Create a `home.dart` file in this package. Paste the following code.

```

import 'package:flutter/cupertino.dart';

import 'package:flutter/material.dart';

import 'package:flutter_app/model/tip.dart';

import 'package:scoped_model/scoped_model.dart';

class HomePage extends StatefulWidget {

 @override

 _HomePageState createState() => _HomePageState();

}

class _HomePageState extends State<HomePage> {

 @override

 Widget build(BuildContext context) {

   return Scaffold(

     appBar: AppBar(

       title: Text("Restaraunt Tip"),

     ),

     body: Container(

       width: MediaQuery.of(context).size.width,

       height: MediaQuery.of(context).size.height,

       decoration: BoxDecoration(

           image: DecorationImage(

               fit: BoxFit.fill,

               image: NetworkImage(

                   'https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?size=626&ext=jpg'))),

       child: Container(

         child: Column(

           mainAxisAlignment: MainAxisAlignment.end,

           children: <Widget>[

             Material(

               color: Colors.white,

               elevation: 14.0,

               borderRadius: BorderRadius.only(

                 topLeft: Radius.circular(30.0),

                 topRight: Radius.circular(30.0),

               ),

               shadowColor: Color(0x802196F3),

               child: _buildInitContent(model);

             )

           ],

         ),

       ),

     ),

   );

 }

 //_______________________________________________________________________________________________

 Widget _buildInitContent() {

   return Align(

     alignment: Alignment.bottomCenter,

     child: Container(

       width: MediaQuery.of(context).size.width,

       height: 250.0,

       child: Column(

         children: <Widget>[

           _titleContainer(),

           _priceContainer(),

           _submitContainer()

         ],

       ),

     ),

   );

 }

 Widget _titleContainer() {

   return Container(

       child: Row(

     mainAxisAlignment: MainAxisAlignment.spaceBetween,

     children: <Widget>[

       Padding(

         padding: EdgeInsets.only(top: 10.0, left: 20.0, bottom: 10.0),

         child: Column(

           crossAxisAlignment: CrossAxisAlignment.center,

           children: <Widget>[

             Center(

               child: Text(

                 "Enter Amount",

                 style: TextStyle(fontSize: 24.0),

               ),

             ),

             SizedBox(

               height: 10.0,

             )

           ],

         ),

       ),

     ],

   ));

 }

 Widget _priceContainer() {

   return Padding(

     padding: EdgeInsets.all(15.0),

     child: Row(

       mainAxisAlignment: MainAxisAlignment.center,

       children: <Widget>[

         RawMaterialButton(

           onPressed: () {

           },

           child: Icon(

             Icons.add,

             size: 30.0,

           ),

           shape: CircleBorder(),

           elevation: 2.0,

           fillColor: Colors.white,

           padding: EdgeInsets.all(10.0),

         ),

         Text(

           '\u0024 60',

           style: TextStyle(fontSize: 30, color: Colors.black),

         ),

         RawMaterialButton(

           onPressed: () {

           },

           child: Icon(

             Icons.remove,

             size: 30.0,

           ),

           shape: CircleBorder(),

           elevation: 2.0,

           fillColor: Colors.white,

           padding: EdgeInsets.all(10.0),

         ),

       ],

     ),

   );

 }

 Widget _submitContainer(TipModel tipModel) {

   return Padding(

     padding: EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),

     child: Column(

       crossAxisAlignment: CrossAxisAlignment.stretch,

       children: <Widget>[

         RaisedButton(

           onPressed: () {

           },

           color: Colors.pink,

           child: Padding(

             padding: EdgeInsets.all(15.0),

             child: Row(

               mainAxisAlignment: MainAxisAlignment.spaceEvenly,

               children: <Widget>[

                 Text(

                   'Submit',

                   style: TextStyle(color: Colors.black),

                 )

               ],

             ),

           ),

           shape:

               RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

         )

       ],

     ),

   );

 }

//__________________________________________________________________________________________________________

 Widget _buildContent() {

   return Align(

     alignment: Alignment.bottomCenter,

     child: Container(

       width: MediaQuery.of(context).size.width,

       height: 250.0,

       child: Column(

         children: <Widget>[

           _titleThankYou(),

           _backContainer()

         ],

       ),

     ),

   );

 }

 Widget _titleThankYou() {

   return Container(

       child: Row(

         mainAxisAlignment: MainAxisAlignment.spaceBetween,

         children: <Widget>[

           Padding(

             padding: EdgeInsets.only(top: 10.0, left: 20.0, bottom: 10.0),

             child: Column(

               crossAxisAlignment: CrossAxisAlignment.center,

               children: <Widget>[

                 Center(

                   child: Text(

                     "Thank you",

                     style: TextStyle(fontSize: 24.0),

                   ),

                 ),

                 SizedBox(

                   height: 10.0,

                 ),

                 Text('You donated }')

               ],

             ),

           ),

         ],

       ));

 }

 Widget _backContainer() {

   return Padding(

     padding: EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),

     child: Column(

       crossAxisAlignment: CrossAxisAlignment.stretch,

       children: <Widget>[

         RaisedButton(

           onPressed: () {

           },

           color: Colors.pink,

           child: Padding(

             padding: EdgeInsets.all(15.0),

             child: Row(

               mainAxisAlignment: MainAxisAlignment.spaceEvenly,

               children: <Widget>[

                 Text(

                   'Back',

                   style: TextStyle(color: Colors.black),

                 )

               ],

             ),

           ),

           shape:

           RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

         )

       ],

     ),

   );

 }

}

```

The `home.dart` file contains several `functions` which return `Widgets`. For instance, the `_buildInitContent` takes in widgets from three functions; `_titleContainer()`, `_priceContainer()`, `_submitContainer()`. The widgets are then arranged on the screen appropriately.

The `_buildContent` method, on the other hand, calls two functions `_titleThankYou()`, `_backContainer()` which also return widgets.

The widgets returned by the `_buildInitContent` function will mainly take in the user input, while those in the `_buildContent` method will show the output. The specific `UIs` created by these methods are shown below.

![_buildInitContent](/engineering-education/implementing-scoped-model-in-your-flutter-application/init.jpg) ![_buildContent](/engineering-education/implementing-scoped-model-in-your-flutter-application/output.jpg)

### Creating the Model

Please create a new package in the `lib` folder and name it as `model`. In this package, create a `tip.dart` file. Use `TipModel` as your class name and extend the `Model`. Ensure that you have imported the `scoped_model` library. A full illustration of the `model` class is shown below.

```

import 'package:scoped_model/scoped_model.dart';

class TipModel extends Model{

 int _tip =0;

 bool _isClicked=false;

 get count=> _tip;

 get isClicked=>_isClicked;

 void decreaseTip(){

   // First, increment the counter

   _tip++;

   // Then notify all the listeners.

   notifyListeners();

 }

 void increaseTip() {

   _tip--;

   notifyListeners();

 }

 set isClicked(bool tip){

   if(tip==null){

     throw new ArgumentError("Error");

   }

   _isClicked=tip;

   notifyListeners();

 }

}

```

The `_ tip` variable (integer) will hold the user&#39;s amount. The bool `_isClicked` variable will help handle navigation by determining if the user has clicked on a particular button.

The `decreaseTip()` function is called when the user reduces the tip while the `increaseTip()` boosts the amount. The `isClicked` function will change the `value` stored in the `_isClicked` variable. The remaining functions that start with the keyword `get` will fetch the stored data.

### Adding and initializing the scoped\_model

Go to the `main.dart` file and initialize the `TipModel` just before the `MyApp` class. Then go to `MyApp.class` file and wrap the `MaterialApp` widget with the `ScopedModel`. Ensure that you have inserted the correct Model, as shown below.

```

TipModel tipModel = TipModel();

class MyApp extends StatelessWidget {

 // This widget is the root of your application.

 @override

 Widget build(BuildContext context) {

   return new ScopedModel<TipModel>(

     model:  tipModel,

     child: MaterialApp(

         title: 'Flutter Demo',

         theme: ThemeData(

           primarySwatch: Colors.blue,

           visualDensity: VisualDensity.adaptivePlatformDensity,

         ),

         home: HomePage()

     ),

   );

```

Next, open the `home.dart` file add the `ScopedModelDescendant` in the `_HomePageState class` as shown below. Note that the `ScopedModelDescendant` will take `context`, `child`, and `model` as `parameters`. Pass the `model` to the other UI functions, as shown below.

```

import 'package:flutter/cupertino.dart';

import 'package:flutter/material.dart';

import 'package:flutter_app/model/tip.dart';

import 'package:scoped_model/scoped_model.dart';

class HomePage extends StatefulWidget {

 @override

 _HomePageState createState() => _HomePageState();

}

class _HomePageState extends State<HomePage> {

 @override

 Widget build(BuildContext context) {

   return Scaffold(

     appBar: AppBar(

       title: Text("Restaraunt Tip"),

     ),

     body: Container(

       width: MediaQuery.of(context).size.width,

       height: MediaQuery.of(context).size.height,

       decoration: BoxDecoration(

           image: DecorationImage(

               fit: BoxFit.fill,

               image: NetworkImage(

                   'https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg?size=626&ext=jpg'))),

       child: Container(

         child: Column(

           mainAxisAlignment: MainAxisAlignment.end,

           children: <Widget>[

             Material(

               color: Colors.white,

               elevation: 14.0,

               borderRadius: BorderRadius.only(

                 topLeft: Radius.circular(30.0),

                 topRight: Radius.circular(30.0),

               ),

               shadowColor: Color(0x802196F3),

               child:ScopedModelDescendant<TipModel>(builder: (context,child,model){

                 if(model.isClicked){

                   return  _buildContent(model);

                 }else{

                   return  _buildInitContent(model);

                 }

               }),

             )

           ],

         ),

       ),

     ),

   );

 }

 //_______________________________________________________________________________________________

 Widget _buildInitContent(TipModel tipModel) {

   return Align(

     alignment: Alignment.bottomCenter,

     child: Container(

       width: MediaQuery.of(context).size.width,

       height: 250.0,

       child: Column(

         children: <Widget>[

           _titleContainer(tipModel),

           _priceContainer(tipModel),

           _submitContainer(tipModel)

         ],

       ),

     ),

   );

 }

 Widget _titleContainer(TipModel tipModel) {

   return Container(

       child: Row(

     mainAxisAlignment: MainAxisAlignment.spaceBetween,

     children: <Widget>[

       Padding(

         padding: EdgeInsets.only(top: 10.0, left: 20.0, bottom: 10.0),

         child: Column(

           crossAxisAlignment: CrossAxisAlignment.center,

           children: <Widget>[

             Center(

               child: Text(

                 "Enter Amount",

                 style: TextStyle(fontSize: 24.0),

               ),

             ),

             SizedBox(

               height: 10.0,

             )

           ],

         ),

       ),

     ],

   ));

 }

 Widget _priceContainer(TipModel tipModel) {

   return Padding(

     padding: EdgeInsets.all(15.0),

     child: Row(

       mainAxisAlignment: MainAxisAlignment.center,

       children: <Widget>[

         RawMaterialButton(

           onPressed: () {

             tipModel.decreaseTip();

           },

           child: Icon(

             Icons.add,

             size: 30.0,

           ),

           shape: CircleBorder(),

           elevation: 2.0,

           fillColor: Colors.white,

           padding: EdgeInsets.all(10.0),

         ),

         Text(

           '\u0024${tipModel.count}',

           style: TextStyle(fontSize: 30, color: Colors.black),

         ),

         RawMaterialButton(

           onPressed: () {

             tipModel.increaseTip();

           },

           child: Icon(

             Icons.remove,

             size: 30.0,

           ),

           shape: CircleBorder(),

           elevation: 2.0,

           fillColor: Colors.white,

           padding: EdgeInsets.all(10.0),

         ),

       ],

     ),

   );

 }

 Widget _submitContainer(TipModel tipModel) {

   return Padding(

     padding: EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),

     child: Column(

       crossAxisAlignment: CrossAxisAlignment.stretch,

       children: <Widget>[

         RaisedButton(

           onPressed: () {

             tipModel.isClicked = true;

           },

           color: Colors.pink,

           child: Padding(

             padding: EdgeInsets.all(15.0),

             child: Row(

               mainAxisAlignment: MainAxisAlignment.spaceEvenly,

               children: <Widget>[

                 Text(

                   'Submit',

                   style: TextStyle(color: Colors.black),

                 )

               ],

             ),

           ),

           shape:

               RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

         )

       ],

     ),

   );

 }

//__________________________________________________________________________________________________________

 Widget _buildContent(TipModel tipModel) {

   return Align(

     alignment: Alignment.bottomCenter,

     child: Container(

       width: MediaQuery.of(context).size.width,

       height: 250.0,

       child: Column(

         children: <Widget>[

           _titleThankYou(tipModel),

           _backContainer(tipModel)

         ],

       ),

     ),

   );

 }

 Widget _titleThankYou(TipModel tipModel) {

   return Container(

       child: Row(

         mainAxisAlignment: MainAxisAlignment.spaceBetween,

         children: <Widget>[

           Padding(

             padding: EdgeInsets.only(top: 10.0, left: 20.0, bottom: 10.0),

             child: Column(

               crossAxisAlignment: CrossAxisAlignment.center,

               children: <Widget>[

                 Center(

                   child: Text(

                     "Thank you",

                     style: TextStyle(fontSize: 24.0),

                   ),

                 ),

                 SizedBox(

                   height: 10.0,

                 ),

                 Text('You donated ${tipModel.count}')

               ],

             ),

           ),

         ],

       ));

 }

 Widget _backContainer(TipModel tipModel) {

   return Padding(

     padding: EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),

     child: Column(

       crossAxisAlignment: CrossAxisAlignment.stretch,

       children: <Widget>[

         RaisedButton(

           onPressed: () {

             tipModel.isClicked = false;

           },

           color: Colors.pink,

           child: Padding(

             padding: EdgeInsets.all(15.0),

             child: Row(

               mainAxisAlignment: MainAxisAlignment.spaceEvenly,

               children: <Widget>[

                 Text(

                   'Back',

                   style: TextStyle(color: Colors.black),

                 )

               ],

             ),

           ),

           shape:

           RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),

         )

       ],

     ),

   );

 }

}

```

Your final app should run, as shown in the video below. 

[video](https://www.youtube.com/watch?v=Xt3RrOra5fc)

### Conclusion

The `scoped_model` simplifies the state management process. Data is passed from the parent to the children widgets quickly. The user will also be notified in case of any data changes.

### References 
[Flutter](https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro)

[scoped_model](https://pub.dev/packages/scoped_model)
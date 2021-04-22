---
layout: engineering-education
status: publish
published: true
url: /engineering-education/implementing-scoped-model-in-your-flutter-application/
title: Implementing a Scoped Model in your Flutter Application
description: In this tutorial we will learn how to create more productive and interactive Flutter applications. You will create an application that follows state management principles in Flutter.
author: michael-barasa
date: 2020-12-10T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-scoped-model-in-your-flutter-application/hero.jpg
    alt: scoped model in Flutter image
---
 In [Flutter](https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro), everything is a widget. Developers compose high-quality and creative UI screens using widgets. The flexibility supports outstanding designs that impress users. These features are difficult to use in native app development using languages such as Java.
<!--more-->
 However, Flutter does pose specific challenges. Particularly, it can be difficult to implement state management. To learn about state management click [here](https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro). It's also challenging to pass data from the primary widget to its children. The scoped\_model library helps resolve these issues.

Let's dive in.

### Introduction
The scoped\_model library consists of various utilities that allow children UI elements to receive data from their parent Widget. The [library](https://pub.dev/packages/scoped_model) consists of three major classes: the `ScopedModelDescendant`, the `Model`, and the `ScopedModel`.

You must extend the Model class to listen for changes.

The `ScopeModel` widget can be used to wrap UI components and access data from the Model. The `ScopedModelDescendant` lets you identify the correct `ScopeModel` from the widget hierarchy. You can learn more about the scoped\_model library from [here](https://pub.dev/packages/scoped_model).

Let's implement the library in our Flutter application.

### Prerequisites
- You must be familiar with [Dart](https://dart.dev/) and [Flutter](https://flutter.dev/?gclid=Cj0KCQiAqdP9BRDVARIsAGSZ8AnCz_EBYwFun_g6f2nAyWqPcTxFEMpwnLbjPNdGnZ5m05taSW1LvG8aArElEALw_wcB&gclsrc=aw.ds)

- Have Android Studio, or Visual Studio Code installed.

- Have the latest Flutter SDK.

- You can download the full project from [here](https://github.com/WanjaMIKE/scopedmodelexample).

### The goal of the tutorial
By the end of this tutorial, you will create an application that follows state management principles in Flutter. It will allow customers to add and store notes. Plus the widgets will be updated as soon as data changes.

### Creating the project
Open `Android Studio` click file, then create a `new Flutter project.` Ensure that you set the proper Flutter SDK path to avoid any errors. The computer also needs to be online for Flutter dependencies and libraries to be installed. If this process is successful, your start page should look like the image below.

You have to be patient since this stage takes time.

![Creating new project](/engineering-education/implementing-scoped-model-in-your-flutter-application/creating-project.png)

### Installing the required library
You must install the required library for you to access the scoped\_model's functionalities. Open the `pubspec.yaml` file, go to the dependencies section, and paste `scoped\_model : ^1.1.0`. Ensure that the statement aligns vertically with the term `flutter.` Ignoring this detail will result in errors during compilation.

Your `pubspec.yaml` file should look as shown below.

```bash
environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  scoped_model: ^1.1.0
```

### Creating the UI
In this stage, we will use different widgets to create the user interface. Our final design should be similar to the image below.

![App design](/engineering-education/implementing-scoped-model-in-your-flutter-application/ui.jpg)

### Modify 'main.dart' file
Go to the `lib` folder and open the `main.dart` file. You will notice that there is pre-generated code in the file. We won't be needing some of this code, you can, therefore, delete the `MyHomePage` class since we will create a new one.

Then go to `MyApp` class, in the same file, and change the `home` parameter to `home: MyHomePage().` You can follow the following code to avoid confusion.

```Dart
import 'package:flutter/material.dart';
import './model/note.dart';
import './model/notesmodel.dart';
import 'package:scoped_model/scoped_model.dart';

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new ScopedModel<NotesModel>(
      model: notesModel,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    );
  }
}
```

### Design the homepage
Since we are making a simple application, we can include our UI code in the `main.dart` file. The class should be named as `MyHomePage`.

Paste the following code in the `MyHomePage` class.

```Dart
import 'package:flutter/material.dart';
import './model/note.dart';
import './model/notesmodel.dart';
import 'package:scoped_model/scoped_model.dart';

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: ListView.builder(
          padding: EdgeInsets.all(5.0),
          itemCount: null, //calculating length ist
          itemBuilder: (BuildContext context, index) {
            return Column(
              children: <Widget>[
                ListTile(
                    leading: Image.network(
                      //fetching online images
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/1200px-Noto_Emoji_KitKat_263a.svg.png",
                      height: 20.0,
                      width: 20.0,
                    ),
                    title: Text("name"), //retrieving object's name from list

                    ),
                Divider()
              ],
            );
          }),

      floatingActionButton: FloatingActionButton(
        //objects will be added to the database when this button is clicked.
        onPressed: () {//this method is executed when the floating button is clicked
        },
        tooltip: 'Add to list new object',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

The `MyHomePage` class in the `main.dart` file contains three major widgets: `ListTile`, `ListView`, and a `Floating Button`. The `ListTile` will be used to display an object's attributes.

All of the `ListTiles` will appear in the `ListView`. This means that the user will be able to scroll through the content.

### Creating the Model
Please create a new package in the `lib` folder and name it as `model`. In this package, create a `note.dart` file. Use `Note` as your class name. Our program will have two major attributes or variables. These are the name and description.

```Dart
class Note{
  String id, name, description;
  Note({ this.id, @required this.name, @required this.description});
}
```

### Extending the ScopedModel
This `scoped_model` class will be responsible for state management in our Flutter application. The first step is to create a class named `NotesModel` and ensure that it extends the `Model` class. You should have `import 'package:scoped_model/scoped_model.dart';` for the program to execute. The next step is to define the functions, variables, or data that will be required by widgets. The full code for the `NotesModel` is shown below.

```Dart
import 'package:scoped_model/scoped_model.dart';
import 'note.dart';

class NotesModel extends Model{
  List<Note> _list = []; //list that stores Note objects

  List<Note> get list{ //returns a copy of list
    return [..._list];
  }
    void addNote(Note note){ //adds a Note object to list
        _list.add(note);
        notifyListeners();
    }

  void removeNote(Note note){
    _list.remove(note); //removes a Note object from list
    notifyListeners();
  }
```

`_list` will be used to store the Note objects.

The `get` function returns a copy of the Note list. The `addNote()` function adds objects in the _list. The `removeNote()` method allows a user to delete or remove objects from list. These methods are declared as `void` since they do not return anything.

### Finishing up
Go to the `main.dart` file and initialize the `NoteModel` just before the `MyApp` class. Then go to `MyHomePage.class` file and wrap the `MaterialApp` widget with the `ScopedModel`. Ensure that you have inserted the correct Model, as shown below.

```Dart
NotesModel notesModel = NotesModel();

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new ScopedModel<NotesModel>(
      model: notesModel,
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    );
  }
}
```

Next, go to the `MyHomePage` class file add the `ScopedModelDescendant` in the `_HomePageState` class as shown below. Note that the `ScopedModelDescendant` will take `context`, `child`, and `model` as `parameters`. Pass the `model` to the other UI functions, as shown below.

```Dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    Note task = Note(name: "Run", description: "Run a 40 mile marathon");
    return ScopedModelDescendant<NotesModel>(builder: (context, child, model) {
      //scoped model descendants helps to pass data to the children widgets.
      return Scaffold(
        appBar: AppBar(
          // Here, we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: Text(widget.title),
        ),
        body: ListView.builder(
            padding: EdgeInsets.all(5.0),
            itemCount: model.list.length, //calculating length ist
            itemBuilder: (BuildContext context, index) {
              return Column(
                children: <Widget>[
                  ListTile(
                      leading: Image.network(
                        //fetching online images
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/1200px-Noto_Emoji_KitKat_263a.svg.png",
                        height: 20.0,
                        width: 20.0,
                      ),
                      title: Text(model.list[index]
                          .name) //retrieving object's name from list

                      ),
                  Divider()
                ],
              );
            }),

        floatingActionButton: FloatingActionButton(
          //objects will be added to the database when this button is clicked.
          onPressed: () {
            model.addNote(task); //this method is executed when the floating button is clicked
          },
          tooltip: 'Add to list new object',
          child: Icon(Icons.add),
        ), // This trailing comma makes auto-formatting nicer for build methods.
      );
    });
  }
}
```

Your final app should run, as shown in the video below.

<iframe width="469" height="269" src="https://www.youtube.com/embed/_BhaQOMafUc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion
The `scoped_model` simplifies the state management process. Data is passed from the parent to the children widgets quickly. The user is notified in case of any data changes. You can use the knowledge gained from this tutorial to create more productive and interactive Flutter applications.

### References
- [Flutter](https://flutter.dev/docs/development/data-and-backend/state-mgmt/intro)

- [Scoped_model](https://pub.dev/packages/scoped_model)

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-flutter-todo-app/
title: How to Build a Flutter ToDo App
description: This article will show the reader how to work with and build a todo application using the Flutter SDK. Flutter is a technology developed by Google to enable developers to build apps for all platforms with a single codebase.
author: nathaniel-dauda-wobin
date: 2021-04-14T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-flutter-todo-app/hero.jpg
    alt: Flutter todo app image
---
Over the years software developers have used frameworks to build apps for Android, iOS, Desktop, and Web. Flutter is one of those frameworks. Flutter is a technology developed by Google to enable developers to build apps for all platforms with a single codebase.
<!--more-->
This technology is changing the software development industry by making application development faster and cheaper. In this article, we will use Flutter to build a **To-do list** app.

### Table of contents 
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Requirements](#requirements)
- [Flutter Packages](#flutter-packages)
- [Flutter Widgets](#flutter-widgets)
- [Stateless Widget](#stateless-widget)
- [Stateful Widget](#stateful-widget)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)
 
### Prerequisites
To better understand this article, the reader is expected to have a foundational knowledge of object-oriented programing languages such as Java, C++, etc. 

### Goals
At the end of this article, the reader is expected to be familiar with: 
- Creating a basic flutter application.
- Flutter and dart packages.
- Flutter widgets.
- Stateless and Stateful widget.

The **TODO List** app will look like the screenshot below:

![Final Project](/engineering-education/how-to-build-a-flutter-todo-app/final.jpg)

**To-do list app built using Flutter**

### Requirements
In this tutorial, we will be using the Flutter SDK which can be downloaded [here](https://flutter.dev/docs/get-started/install) and [VS Code](https://code.visualstudio.com/download) text editor. On your terminal, navigate to the directory you want your app to be and run the command below to create your project.

```bash
# create new project
flutter create todo_app
```

Next, navigate into the created project (todo_app) directory using the command `cd todo_app` in our case and run the app as shown below:

```bash
# run the app
flutter run
```

We will be using a smartphone to run the app, follow this link to learn how to run [flutter on a physical device](https://kobiton.com/topics/develop-deploy-and-test-flutter-apps/). When the project is run for the first time it will take a little time to load. 

Your app will be the flutter default app which should look like the screengrab below.

![Flutter Default App](/engineering-education/how-to-build-a-flutter-todo-app/default.jpg)

**Flutter default after running any app for the first time**

Go to the `main.dart` file which is in the lib directory. Change the default code to the snippet shown below.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(Todo());
}

class Todo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  // app layout
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('To-do List'),
        ),
      )
      
    );
  }
}
```

After running the app you will notice an empty canvas with the title To-do-List. Let us look at the code.


### Flutter packages
On the first line, we imported a flutter package named `Material.dart` (import 'package:flutter/material.dart';) to make app development fast flutter comes with a package that makes it easy to start building a material style app. Packages are simply other people's solution for a feature you need in your app. 

Instead of building some features from scratch, you could just go to [pub.dartlang.org](pub.dartlang.org) and search for a package that will perform that feature you want to build. You can incorporate it into your application. This will save a lot of time for you as a developer. As you develop with flutter, you will use a lot of packages.

### Flutter widgets
Flutter Widgets describe what the view of an app should look like given the current configuration and state. According to the Flutter documentation, Flutter widgets are built using a modern framework that takes inspiration from React.

A widget can help with layout, define design, etc. For example: Padding, Margin, Center, Layout rows, and columns are all widgets.

From our code, the whole app is a widget that contains a MaterialApp widget.
- The scaffold is the widget that helps us create a proper material layout without the worry of manual styling.
- The AppBar is a widget that accepts a title and creates a bar at the top of the screen, this is normal in apps. This aligns the text to the left on Android and aligns text to the center on iOS. 

### Stateless widget
A stateless widget is a widget whose state cannot be changed once it is built. i.e. no amount of change in the variables, icons, buttons, or retrieving data can change the state of the app.

A to-do app will always have to-do items added and removed, to achieve this we will need to implement a stateful widget.

### Stateful widget
This type of widget is dynamic. This means it can change its appearance when it receives data or change appearance in response to events triggered.

Edit your code to match the one in the picture below.

![Flutter appbar](/engineering-education/how-to-build-a-flutter-todo-app/appbar.jpg )

```dart
class _TodoListState extends State<TodoList> {
  // save data
  final List<String> _todoList = <String>[];
  // text field
  final TextEditingController _textFieldController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // app layout
    return Scaffold(
      appBar: AppBar(
        title: Text('To-do List'),
      ),
    );
  }
}
```
  
You should notice that our stateful widgets class TodoList has two classes. This is to enable us to update our to-do list without losing our data. Now, let's add functionality to the state class. 

Add the below code to your state:

```dart
class _TodoListState extends State<TodoList> {
  // save data
  final List<String> _todoList = <String>[];
  // text field
  final TextEditingController _textFieldController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // app layout
    return Scaffold(
      appBar: AppBar(
        title: Text('To-do List'),
      ),
    );
  }
}
```

This code final `List<String> _todoList = <String>[];`. Enables us to save data into our app. 

While final `TextEditingController _textFieldController = TextEditingController();` is enabling us have a text field for items input. 

Next, update your code to the one below:

```dart
class _TodoListState extends State<TodoList> {
  // save data
  final List<String> _todoList = <String>[];
  // text field
  final TextEditingController _textEditingController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // code that returns the appbar
    return Scaffold(
      appBar: AppBar(
        title: Text('To-do List'),
      ),
    );
  }

  // adds data to list.
  void _addTodoItem(String title) {
    //  a set state will notify the app that the state has changed
    setState(() {
      _todoList.add(title);
    });
    _textFieldController.clear();
  }
}
```

The _addtodoItems function is responsible for saving items into _todolist.

Update your code again to match the one below.

```dart
 // adds data to List.
  void _addTodoItem(String title) {
    //  a set state will notify the app that the state has changed
    setState(() {
      _todoList.add(title);
    });
    // the text field is cleared once the item is added to list
    _textFieldController.clear();
  }

   // populate the listview
  Widget _buildTodoItem(String title) {
    return ListTile(title: Text(title));
  }
  ```


The Widget ListTile is usually to populate a listView in flutter.
To type in todo items update the code to the one below.

```dart
 // populate the listview
  Widget _buildTodoItem(String title) {
    return ListTile(title: Text(title));
  }

  // display a dialog for the user to enter items
  Future<AlertDialog> _displayDialog(BuildContext context) async {
    // alter the app state to show a dialog
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Add a task to your list'),
            content: TextField(
              controller: _textFieldController,
              decoration: const InputDecoration(hintText: 'Enter task here'),
            ),
            actions: <Widget>[
              // add button
              FlatButton(
                child: const Text('ADD'),
                onPressed: () {
                  Navigator.of(context).pop();
                  _addTodoItem(_textFieldController.text);
                },
              ),
              // cancel button
              FlatButton(
                child: const Text('CANCEL'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            ],
          );
        });
  }
  // iterates through our todo list titles.
  List<Widget> _getItems() {
    final List<Widget> _todoWidgets = <Widget>[];
    for (String title in _todoList) {
      _todoWidgets.add(_buildTodoItem(title));
    }
    return _todoWidgets;
  }
```

The alert dialog tells the user about situations that require confirmation. 

We are going to use the alert box to collect todo Items.

To run the code we would have to update the build widget code to the one below.

```dart
class _TodoListState extends State<TodoList> {
  final List<String> _todoList = <String>[];
  final TextEditingController _textFieldController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // app layout
    return Scaffold(
      appBar: AppBar(title: const Text('To-Do List')),
      body: ListView(children: _getItems()),
      // add items to the to-do list
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(context),
          tooltip: 'Add Item',
          child: Icon(Icons.add)),
    );
  }
```

Your complete code should look like the one below:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(Todo());
}

class Todo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: TodoList());
  }
}

class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  // save data
  final List<String> _todoList = <String>[];
  // text field
  final TextEditingController _textFieldController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('To-Do List')),
      body: ListView(children: _getItems()),
      // add items to the to-do list
      floatingActionButton: FloatingActionButton(
          onPressed: () => _displayDialog(context),
          tooltip: 'Add Item',
          child: Icon(Icons.add)),
    );
  }

  void _addTodoItem(String title) {
    // Wrapping it inside a set state will notify
    // the app that the state has changed
    setState(() {
      _todoList.add(title);
    });
    _textFieldController.clear();
  }

  // this Generate list of item widgets
  Widget _buildTodoItem(String title) {
    return ListTile(title: Text(title));
  }

  // display a dialog for the user to enter items
  Future<AlertDialog> _displayDialog(BuildContext context) async {
    // alter the app state to show a dialog
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Add a task to your list'),
          content: TextField(
            controller: _textFieldController,
            decoration: const InputDecoration(hintText: 'Enter task here'),
          ),
          actions: <Widget>[
            // add button
            FlatButton(
              child: const Text('ADD'),
              onPressed: () {
                Navigator.of(context).pop();
                _addTodoItem(_textFieldController.text);
              },
            ),
            // Cancel button
            FlatButton(
              child: const Text('CANCEL'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            )
          ],
        );
      } 
    );
  }
  // iterates through our todo list title
  List<Widget> _getItems() {
    final List<Widget> _todoWidgets = <Widget>[];
    for (String title in _todoList) {
      _todoWidgets.add(_buildTodoItem(title));
    }
    return _todoWidgets;
  }
}
```

### Conclusion
Now we have a simple To-do app that enables us to add to-do items. To modify the app you can check out this [link](https://bezkoder.com/dart-list/) to learn how to edit and remove your added items. Link to [final code on GitHub](https://github.com/wobin1/Todo-List-app)

To summarize, we learned:
- How to create a flutter app.
- about Stateless and Stateful Widgets. 
- about Flutter packages.

Happy coding!

### Further reading
- [Dart List](https://www.geeksforgeeks.org/listtile-widget-in-flutter/)
- [Dart Object](https://bezkoder.com/category/dart/)
- [Flutter Widgets](https://flutter.dev/docs/development/ui/widgets)
- [Emulator Settings](https://flutter.dev/docs/development/ui/widgets)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

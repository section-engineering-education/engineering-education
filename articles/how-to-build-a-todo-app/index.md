# How to build A Todo app with Flutter
![hero image] ()
[Source](https://unsplash.com/photos/2JknzBYDu6k)

### Table of contents 
- [Prerequisites](#prerequisites)
- [Goal(#goals)
- [Requirements](#requirements)
- [Flutter Packages](#FlutterPackages)
- [Flutter Widgets](#flutter-widgets)
- [Stateless Widget](#stateless-widget)
- [Statful Widget](#Stateful-widget)
- [Conclusion](#conclusion)
- [Futher reading](#futher-reading)


### Introduction
Over the years software developers have used frameworks to build apps for android, IOS, Desktop, and web, flutter is one of those frameworks.
Flutter is a technology developed by Google to enable developers build apps for all platforms with a single code base. This technology is changing the Software development industry by making application development faster and cheaper.
In this article will use flutter to build a **To-do list** app. 

### Prerequisites
To better understand this article, the reader is expected to have a foundational knowlegde of object-oriented programing languages such as Java, C++, etc. 

### Goals
At the end of this this article, the reader is expected to be familiar with: 
- Creating a basic flutter application.
- Flutter and dart Packages.
- Flutter widgets,
- Stateless and Stateful widget

The **TODO List** app will look like the screenshot below. 

![Final project.](/engineering-education/how-to-build-a-todo-app/final.jpg)

**To-do list app built using flutter**

### Requirements
In this tutorial we will be using the flutter SDK which can be downloaded at [documentation for installation](https://flutter.dev/docs/get-started/install) and VS Code text editor [download VS code](https://code.visualstudio.com/download).
On your terminal, navigate to the directory you want your app to be and run the command below to create your project.

```
flutter create todo_app
```
Next, navigate into the created project (todo_app) directory using the command ```cd todo_app``` in our case and run the app as shown below
```
flutter run
```
We will be using a smartphone to run the app, follow this link to learn how to run flutter on a physical device [flutter on a physical device](https://kobiton.com/topics/develop-deploy-and-test-flutter-apps/). When the project is run for the first time it takes a little time to load, but after running Your app will be the flutter default app which will look like the screengrab below.

![Flutter default app](/engineering-education/how-to-build-a-todo-app/default.jpg)


**Flutter default after runing any app for the first time**

Go to the main.dart file which is in the lib directory. Change the default code to the snippet shown in the below picture.

![Stateless widget](/engineering-education/how-to-build-a-todo-app/stateless widget code.png)

After running the app you will notice an empty canvas with the title To-do-List. let us look at the code.

![stateless widget](/engineering-education/how-to-build-a-todo-app/stateless.jpg)

### Flutter Packages
On the first line, we imported a flutter package named Material.dart (import 'package:flutter/material.dart';) to make app development fast flutter comes with a package that makes it easy to start building a material style app. Packages are simply other people's solution for a feature you need in your app So instead of building some features from scratch just go pub.dartlang.org , search for a package that will perform that feature you want to build, and incorporate it into your app this will save a lot of time for you as a developer. As you continue with flutter you will use a lot of packages.


### Flutter Widgets
Flutter Widgets describe what the view of an app should look like given the current configuration and state 
According to the Flutter documentation, Flutter widgets are built using a modern framework that takes inspiration from React.

A widget can help with layout, define design, etc. For example, Padding, Margin, Center, Layout rows, and columns are all widgets.
From our code, the whole app is a widget, which contains a MaterialApp widget.
- The scaffold is the widget that helps us create a proper Material layout without the worry of manual styling.
- The AppBar is a widget that accepts a title and creates a bar at the top of the screen, this is normal in apps. This aligns the text to the left on Android and aligns text to the center on iOS. 

### Stateless Widget
A stateless widget is a widget whose state cannot be changed once it’s built. i.e. no amount of change in the variables, icons, buttons, or retrieving data can change the state of the app.
A to-do app will always have to-do items added and remove, to achieve this we will need to implement a stateful widget.

### Statful Widget
This type of widget is dynamic. This means it can change its appearance when it recieves data or change apearance in response to events triggered.

 Edit your code to match the one in the picture below.

![Stateful Widget](/engineering-education/how-to-build-a-todo-app/stateful.jpg)
  
You should notice that our stateful widgets class TodoList has two classes this is to enable us to update our to-do list without losing our data.
Now, let us add functionality to the state class. Add the below code to your state.
![List and textEditingController](/engineering-education/how-to-build-a-todo-app/listText.jpg)

This code final List<String> _todoList = <String>[];. Enable us save data into our app. While 
final TextEditingController _textFieldController = TextEditingController();
Is enabling us have a text field for items input. 
Next, update your code to the one below

![addTodoItem Function](/engineering-education/how-to-build-a-todo-app/function.jpg)

The _addtodoItems function is responsible for saving items into _todolist.
Update your code again to match the one below.

![ListTile Widget](/engineering-education/how-to-build-a-todo-app/listTile.jpg)

the Widget ListTile is usually to populate a listView in flutter.
To type in todo items update the code to the one below.

![DisplayDialog](/engineering-education/how-to-build-a-todo-app/displayDialog.jpg)

The alert dialog tells the user about situations that require confirmation. We are going to use the alert box to collect todo Items.
To run the code we would have to update the build widget code to the one below.


![Build Image](/engineering-education/how-to-build-a-todo-app/build.jpg)

Your complete code should look the one below...

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
  final List<String> _todoList = <String>[];
  final TextEditingController _textFieldController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('To-Do List')),
      body: ListView(children: _getItems()),
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

  // this code Generate a single item widget
  Future<AlertDialog> _displayDialog(BuildContext context) async {
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
              FlatButton(
                child: const Text('ADD'),
                onPressed: () {
                  Navigator.of(context).pop();
                  _addTodoItem(_textFieldController.text);
                },
              ),
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

Now we have a simple To-do app that enable us to add to-do items. To modify the app you can check out this link (https://bezkoder.com/dart-list/) to learn how to edit and remove your added items. 

To sumarize the reader learned;
- How to create a flutter app
- about Stateless and Stateful Widget 
- about flutter packages 
### Further reading
- [Dart List](https://www.geeksforgeeks.org/listtile-widget-in-flutter/)
- [Dart Object](https://bezkoder.com/category/dart/)
- [Flutter Widgets](https://flutter.dev/docs/development/ui/widgets)
- [Emulator Settings](https://flutter.dev/docs/development/ui/widgets)


### About the Author
![Build Image](/engineering-education/how-to-build-a-todo-app/author.jpg)

Nathaniel Dauda Wobin is a Mobile app developer with a degree in physics from Kaduna State University. He builds most of his projects using flutter and django.
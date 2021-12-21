---
layout: engineering-education
status: publish
published: true
url: /flutter-authentication-using-flask-api/
title: Flutter Authentication Using Flask API
description: This article will show a reader how Flutter apps interact with the backend and how authentication works using Flask as the backend technology. 
author: nathaniel-dauda-musa
date: 2021-12-13T00:00:00-13:45
topics: [API, Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-authentication-using-flask-api/hero.jpg
    alt: Flutter Authentication Using Flask API Image
---
Software or applications mostly hold data that is not accessible to everyone. This has made authentication a core aspect of software or application development.  
<!--more-->
Authentication is the process of proving if a user trying to access a system has permission to do so.

#### Understanding the Flutter framework
Flutter is a UI toolkit created by Google. It is used to build cross-platform mobile applications for Android and IoS and desktop applications for Windows, Mac, and Linux. 

UIs built with Flutter always depend on the backend technology stack for core functionalities like authentication and access control. One of these backend technologies is the Flask framework. Flask is a Python web framework for building web applications.

### Prerequisites
In this guide Flutter version, 2.5 will be used to build the Flutter project, and the Android studio is the IDE used to write the code, but visual studio code can be used. To code along with this article, the tools mentioned previously are recommended. This article assumes the reader has a background knowledge of Flutter and Python flask.

### Goals
This guide will help the reader understand how Flutter applications interact with the backend and how authentication occurs when Flask is used as the backend technology. In the process, we will build a Flutter application that authenticates users using a Flask API, which will work as shown below.

![demo](/engineering-education/flutter-authentication-using-flask-api/demo.gif)

### Understanding applications
Web applications are primarily built in two parts. There is the *frontend* and the *backend*. The two parts are very delicate in that they are mostly built differently and sometimes by different developers.

The frontend part of an app is also known as the client-side of the app. It focuses on how the application looks, and frontend developers make sure the apps look good and are responsive (i.e., it looks good on all types of screens). 
 
The backend part of an app focuses on how the application works. The backend of an app is also known as the server-side of the app. Backend developers make sure data received from users are appropriately stored and are quickly rendered to users with speed and efficiency.

#### Applicaion Programming Interface (APIs)
An API is like a middle man between the backend and frontend. It connects computers or computer programs using endpoints. An endpoint means communication between two or more systems where a request is sent from the frontend to a web application or a web server.

The transfer of data from the client-side of an application and server-side is made possible by an API. Data can also be transferred from one backend server to another using APIs. For example, below is the code snippet of a primary login and register endpoint built for authentication using Python's Flask.

```python
from flask import Blueprint, request, json, jsonify
from .models import Student
from software import db

views = Blueprint('views', __name__)

@views.route('/register', methods=["GET", "POST"])
def register():
    d={}
    if request.method =="POST":
        mail = request.form["email"]
        password = request.form["password"]

        email = Student.query.filter_by(email=mail).first()

        if email is None:
            register = Student(email=mail, password=password)

            db.session.add(register)
            db.session.commit()
           
            return jsonify(["Register success"])
        else:
            # already exist
            
            return jsonify(["user alredy exist"])


@views.route('/login', methods=["GET", "POST"])
def login():
    d = {}
    if request.method == "POST":
        mail = request.form["email"]
        password = request.form["password"]

        login = Student.query.filter_by(email=mail, password=password).first()

        if login is None:
            # acount not found
            
            return jsonify(["Wrong Credentials"]) 
        else:
            # acount found
            
            return jsonify([ "success"])
```

The code snippet for the register endpoint above accepts data from a form and filters through data already existing in the database to ensure there is no data inconsistency. The result of the filter is then determining the outcome.

The code snippet for the login endpoint filters the data to make sure the user is registered if registered. Then, the user is given access to information in the system. If not, the user gets a message telling stating the credentials are wrong. 

The [register](https://flaskflutterlogin.herokuapp.com/register) and [login](https://flaskflutterlogin.herokuapp.com/login) endpoints above can be accessed using the links. 

### Flutter app design
#### Installation
To build a Flutter app, Flutter has to be installed on the computer. Click [here and follow each step to download](https://flutter.dev/docs/get-started/install) if you do not know how to. Then a new flutter project was created from the terminal using the command shown below.

```bash
flutter create name-of-app
```

After installation, the `main.dart` file located inside the lib folder, which is found inside the project directory, was cleared and replaced with the code snippet below.

```dart
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:loginwithapi/views/login.dart';
import 'package:loginwithapi/views/register.dart';
import 'package:loginwithapi/views/welcome.dart';

void main() {
  runApp( MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "LoginApp",
      home: WelcomePage(),
      builder: EasyLoading.init(),
    );
  }
}
```

From the code snippet above, `import 'package:flutter/material.dart';` import `MaterialApp`, a widget that wraps multiple widgets that are mostly required for material design applications. 

If you paste the above code snippet, you will notice red lines indicating something is wrong with the imports. One will be from `import 'package:flutter_easyloading/flutter_easyloading.dart';` to fix, add *flutter_easyloading* to packages using the command :

```bash
flutter pub add flutter_easyloading
```

The above command adds `flutter_easyloading` to packages in the project. For `import 'package:loginwithapi/views/welcome.dart';`. The error is there because the line of code is importing a class from a page that does not exist. 

A `MaterialApp` was returned inside the build widget. It has a title and home sub widgets. The title is primarily the app's name, and in the home, a `WelcomPage` class is called.

To fix the red-line error,  add the `welcomePage` class, create two new folders inside the lib folder. Name them `views,` and `service` inside the views folder create three files with the names `login.dart`, `register.dart`, and `welcome.dart` and add the code snippet below:

#### Working on the Welcome page
```dart
import 'package:flutter/material.dart';
import 'package:loginwithapi/views/login.dart';
import 'package:loginwithapi/views/register.dart';

class WelcomePage extends StatefulWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  _WelcomePageState createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        margin: const EdgeInsets.symmetric(horizontal: 30),
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(20)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            InkWell(
                onTap: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => LoginPage()));
                },
                child: Container(
                  margin:
                  const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  child: const Center(
                    child: Text(
                      "Login",
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  height: 50,
                  width: double.infinity,
                  decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(25)),
                )),
            InkWell(
                onTap: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => RegisterPage()));
                },
                child: Container(
                  margin:
                  const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  child: const Center(
                    child: Text(
                      "Register",
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                  ),
                  height: 50,
                  width: double.infinity,
                  decoration: BoxDecoration(
                      color: Colors.green,
                      borderRadius: BorderRadius.circular(25)),
                ))
          ],
        ),
      ),
    );
  }
}
```


#### Login page design

```dart
import 'package:flutter/material.dart';
import 'package:loginwithapi/service/http_service.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late String email;
  late String password;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('Login Page')),
        body: Container(
          margin: const EdgeInsets.symmetric(horizontal: 30, vertical: 20),
          child: Column(
            children: [
              TextField(
                obscureText: false,
                decoration: InputDecoration(hintText: 'email'),
                onChanged: (value) {
                  setState(() {
                    email = value;
                  });
                },
              ),
              TextField(
                obscureText: true,
                decoration: InputDecoration(hintText: 'password'),
                onChanged: (value) {
                  setState(() {
                    password = value;
                  });
                },
              ),
              InkWell(
                  onTap: () async {
                    print(password);
                    print(email);
                    await HttpService.login(email, password, context);
                  },
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    child: const Center(
                      child: Text(
                        "Login",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ),
                    height: 50,
                    width: double.infinity,
                    decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(25)),
                  ))
            ],
          ),
        )
      // ignore: avoid_unnecessary_containers
    );
  }
}
```

### Registration page code

```dart
import 'package:flutter/material.dart';
import 'package:loginwithapi/service/http_service.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {

  late String email;
  late String password;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('Register Page')),
        body: Container(
          margin: const EdgeInsets.symmetric(horizontal: 30, vertical: 20),
          child: Column(
            children: [
              TextField(
                obscureText: false,
                decoration: InputDecoration(hintText: 'email'),
                onChanged: (value) {
                  setState(() {
                    email = value;
                  });
                },
              ),
              TextField(
                obscureText: true,
                decoration: InputDecoration(hintText: 'password'),
                onChanged: (value) {
                  setState(() {
                    password = value;
                  });
                },
              ),
              InkWell(
                  onTap: () async {
                    await HttpService.register(email, password, context);
                  },
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    child: const Center(
                      child: Text(
                        "Register",
                        style: TextStyle(
                            fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ),
                    height: 50,
                    width: double.infinity,
                    decoration: BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.circular(25)),
                  ))
            ],
          ),
        )
      // ignore: avoid_unnecessary_containers
    );
  }
}
```

The code snippet in the welcome file comprises two `inkwell` widgets wrapped inside a `Container`. The `inkwell` widget responds to touch performed by a user. For example, the one labeled login will take you to the login page when clicked, and the other labeled register will navigate to the register page.

The code snippet in the login and register file comprises two `TextField` widgets and one `InkWell` widget, all wrapped in a `Container`. The `Inkwell` widget submits the data gotten from the text when clicked. 

You will observe a red line on `import 'package:loginwithapi/service/http_service.dart';` this is because you are importing `http_service.dart`. We will fix later on; before that, you can clear the import with the error, and your app should look as shown in the pictures below.

![Welcome Page](/engineering-education/flutter-authentication-using-flask-api/welcome.jpeg)

![demo](/engineering-education/flutter-authentication-using-flask-api/dashboard.jpeg)

![Login Page](/engineering-education/flutter-authentication-using-flask-api/login.jpeg)

![Register Page](/engineering-education/flutter-authentication-using-flask-api/register.jpeg)

### Login and registration logic
To write the login and register logic, create a file inside the service folder we created earlier and paste the code snippet below.

```dart
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:loginwithapi/views/dashboard.dart';
import 'package:loginwithapi/views/welcome.dart';

class HttpService {
  static final _client = http.Client();

  static var _loginUrl = Uri.parse('https://flaskflutterlogin.herokuapp.com/login');

  static var _registerUrl = Uri.parse('https://flaskflutterlogin.herokuapp.com/register');

  static login(email, password, context) async {
    http.Response response = await _client.post(_loginUrl, body: {
      "email": email,
      "password": password,
    });

    if (response.statusCode == 200) {
      print(jsonDecode(response.body));
      var json = jsonDecode(response.body);

      if (json[0] == 'success') {
        await EasyLoading.showSuccess(json[0]);
        await Navigator.push(
            context, MaterialPageRoute(builder: (context) => Dashboard()));
      } else {
        EasyLoading.showError(json[0]);
      }
    } else {
      await EasyLoading.showError(
          "Error Code : ${response.statusCode.toString()}");
    }
  }

  static register(email, password, context) async {
    http.Response response = await _client.post(_registerUrl, body: {
      "email": email,
      "password": password,
    });

    if (response.statusCode == 200) {
      var json = jsonDecode(response.body);
      if (json[0] == 'username already exist') {
        await EasyLoading.showError(json[0]);

      } else {
        await EasyLoading.showSuccess(json[0]);
        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => Dashboard()));
      }
    } else {
      await EasyLoading.showError(
          "Error Code : ${response.statusCode.toString()}");
    }
  }
}
```

The code `import 'package:http/http.dart' as http;` is importing http, which is a flutter package that enables flutter apps to fetch and post data from an API endpoint. `import 'dart:convert';` helps in `encoding` and `decoding` data. 

The rest of the imports are familiar except for `import 'package:loginwithapi/views/dashboard.dart';` which we will look at a bit later.

After all imports, `HttpService` class was created where `_loginUrl` is declared as a property of the class holding the login URL endpoint and `_registerUrl` is declared as a property holding the register URL endpoint.

The `login` method was created, which took `email and password` as parameters. `async` and `await` are used to speed up `fetching,` and `posting` data because accessing data from a server takes time.

The conditional statement in the method is checking for the `response` of the endpoint. If the `response` is `200` this means `success`, the code decodes the response and uses flutter `easy_loading`. This is a package used for giving message alerts in flutter apps. It can send either an error or a success message depending on the condition given from the server-side of the application. 

In our case, if the decoded response is `'success'`, then a success alert message is popped up for the user telling the user that login was successful. Then the user will be navigated to the next page, otherwise an error message is popped up for the user telling him/her that credentials were wrong as shown in the picture below.

![wrong login credentials error message](/engineering-education/flutter-authentication-using-flask-api/wrong-credentials.jpeg)

![Login success ](/engineering-education/flutter-authentication-using-flask-api/login-success.jpeg)

The register method takes the same parameters as the login method. It is also using `async and await` like the register. The only difference is that the error message was decoded. 

`Easy_loading` will pop up the message `user already exists` if the user exists. A success message `registered successfully` will pop up if the user does not exist, as shown in the picture below.

![User already exist ](/engineering-education/flutter-authentication-using-flask-api/user-exist.jpeg)

![Register success](/engineering-education/flutter-authentication-using-flask-api/register-success.jpeg)

### Conclusion
We built an app that can register and login a user using API endpoints. The GitHub repository for the flutter code can be found [here](https://github.com/wobin1/Flutter-Authentication-with-flask-api) and the Flask API repo can be found here [here](https://github.com/wobin1/flask-login-for-flutter).

Happy coding!

### Further reading
- [Flutter User Authentication](https://medium.com/codex/flutter-user-authentication-part-1-models-and-api-acf33cf42f83)
- [How To Create Login System in Flutter With Rest API](https://www.youtube.com/watch?v=2DtFGF2v_vk)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

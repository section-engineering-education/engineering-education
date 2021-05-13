---
layout: engineering-education
status: publish
published: true
url: /consuming-apis-in-flutter/
title: Consuming APIs in Flutter
description: In this article, we will understand APIs and how to use them in Flutter. We will also learn to use the GitHub API in a flutter application.
author: jerim-kaura
date: 2021-04-12T00:00:00-12:00
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/consuming-apis-in-flutter/hero.jpg
   alt: APIs in Flutter example image
---
Application Programming Interface (API) is a communication portal that allows two or more applications to connect for data sharing. It acts as an intermediary for delivering requests to service providers and returning the responses. The use of APIs has gained prevalence in mobile application development, given the ease of using pre-existing frameworks. Programmers use most APIs to fetch data from web servers and render it to its UI components.
<!--more-->
This article will demonstrate how to fetch and consume data from a server using a RESTful API in a Flutter application. According to Wikipedia, Representational State Transfer API is an architectural subset of HTTP commonly used to create interactive applications that use web services. 

It allows a programmer to fetch and modify resources from a server. REST API is preferred because it supports most protocols and data formats. In this tutorial, we will use HTTP and JSON data format. To learn mode about RESTFUL APIs, check out this [link](https://en.wikipedia.org/wiki/Representational_state_transfer). You can download the code for this application from [here](https://github.com/jerimkaura/flutter-book/tree/main/my-github).

### Prerequisites
1. A basic understanding of Flutter
2. Flutter SDK installed on your computer
3. Code editor, [Android Studio](https://developer.android.com/studio), or [VSCode](https://code.visualstudio.com/download) are most preferred.
4. An emulator or a mobile device to run the code.

### Table oF contents
- [Setting up the application](#setting-up-the-application)
- [The HTTP package](#adding-the-http-package)
- [Creating Data classes from JSON](#creating-data-classes-from-json)
- [Implementing providers](#adding-the-providers)
- [Consuming the API data ](#consuming-the-data)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Setting up the application
First, you need to set your application by installing the Flutter SDK on your computer as explained [here](https://flutter.dev/docs/get-started/install).  After installing the SDK, we now need to set up our local machine project. In case you have not used flutter before, check out this [link](https://flutter.dev/docs/get-started/test-drive#create-app) for a stepwise explanation to creating a flutter project. 

#### API key and client secret
We will build our application based on the Github API. Therefore, we need to obtain the GitHub `client key` and `secret` to access the API. Check [this link](https://www.knowband.com/blog/user-manual/get-github-client-id-client-secret-api-details/) for a complete guide on getting the `client key` and `secret`.

#### Organizing the folders
Instead of writing our code on a single file, we need to organize the folders within our Flutter project to locate our application's files and components with ease. This practice allows us to find bugs easier. 

Besides, we need to separate the view files from files that facilitate fetching data from the API to avoid confusion between the two application's components. You can check [this](/flutter-folder-organization/) article for the preferable folder organization. 

The final folder organization should appear as below:
```bash
lib
    ┣ models
    ┃ ┗ User.dart
    ┣ Providers
    ┃ ┗ UserProvider.dart
    ┣ Requests
    ┃ ┗ GithubRequest.dart
    ┣ Screens
    ┃ ┗ FollowersPage.dart
    ┗ main.dart
```

### Adding the HTTP package
The `HTTP package` contains a set of high-level functions for use in HTTP resource consumption. To add the package to our application, open `pubspec.yml` and add the following line under `dependencies:

```yml
dependencies:
flutter:
    SDK: flutter
HTTP: ^0.12.2
```

Next, we will import the HTTP package into our `GithubRequest.dart` file with the following line of code:

```dart
import 'package:HTTP/HTTP.dart' as HTTP;
```

The snippet below shows how we will use the package to fetch the followers of a given username from the API. We are using username because every user has a unique username.

**GithubRequest.dart**

```dart
//importing HTTP package for fetching and consuming HTTP resources
import 'package:HTTP/HTTP.dart' as HTTP;

//Github request class
class Github {
  final String userName; // usernaname
  final String url = 'https://api.github.com/';
  static String clientId = 'CLIENT_ID'; //enter yout client id
  static String clientSecret = 'CLIENT_SECRET'; // insert your client secret

  //Github class constructor
  Github(this.userName);

  //Fetch a user with the username supplied in the form input
  Future<http.Response> fetchUser() {
    return http.get(url + 'users/' + userName);
  }
}
```

### Creating data classes from JSON
Since Flutter accepts dart as the primary programming language, we need to convert the JSON data fetched from the URL to dart Classes for consumption in the application. 

We can do that using the [Quicktype](https://app.quicktype.io/) website where we pass the JSON object, and a class of the object is returned based on a specified language. Will will return our classes in `dart`. 

For instance, our JSON representing the user is as shown below:

```json

//data json object
{
  "login": "jerimkaura",
  "avatar_url": "https://avatars.githubusercontent.com/u/50904889?v=4",
  "location": "Nairobi"
}

```

#### The user class
I edited the JSON to capture only the attributes needed on the application. When we pass the above JSON into [Quicktype](https://app.quicktype.io/), the generated user class is as below:

```dart
// To parse this JSON data, do 
final user = userFromJson(jsonString);

import 'dart:convert';

//the created user class
class User {

  String login; //username
  String avatarUrl; //profile picture
  String location; //location

  //class constructor
  User({
    this.login, //username
    this.avatarUrl, //profile picture
    this.location, //location
  });  

  //JSON serialization: return the value from json
  factory User.fromRawJson(String str) => User.fromJson(json.decode(str));

  //encode data to json format
  String toRawJson() => json.encode(toJson());

  //creating a dart user object from the json object
  factory User.fromJson(Map<String, dynamic> json) => User(
    login: json["login"],
    avatarUrl: json["avatar_url"],
    location: json["location"],
  );

  Map<String, dynamic> toJson() => {
    "login": login,
    "avatar_url": avatarUrl,
    "location": location,
  };
}

```
### Adding the providers
The Provider will have the functions required to fetch the API's user data and deliver a response. We will create a file called `UserProvider.dart` under the `Providers` folder. 

The `ChangeNotifier` class will notify our view when one more variable changes. We use the `async` function to wait for the user to be fetched from the API as our code execution continues.

```dart

class UserProvider with ChangeNotifier {
  User user; //an instance of a user
  String errorMessage; //error message
  bool loading = false; //loading the page

  Future<bool> fetchUser(username) async {
    setLoading(true);
    // fetch user from the input supplied in the form
    await Github(username).fetchUser().then((data) {
      setLoading(false);
      if (data.statusCode == 200) {
        //incase of success
        setUser(User.fromJson(json.decode(data.body)));
      } else {
        Map<String, dynamic> result = json.decode(data.body);
        setMessage(result['message']); // error message
      }
    });
    return isUser(); //returns the fetched user
  }

  bool isLoading() {
    return loading; //return true if the app is loading the data
  }

  void setLoading(value) {
    loading = value;
    notifyListeners(); //This method is called when the objects is changed
  }

  void setUser(value) {
    user = value;
    notifyListeners(); //alert listeners that user's value changed
  }

  User getUser() {
    return user; //returns the fetched user
  }

  void setMessage(value) {
    errorMessage = value;
    notifyListeners(); // alert listeners that the error message changed
  }

  String getMessage() {
    return errorMessage; // get the error message
  }

  bool isUser() {
    return user != null ? true : false; // returns true if user is not null, anf false otherwise
  }
}

``` 

### Consuming the data
With our model and Provider ready, our application will fetch data via the Provider and convert the JSON result into dart classes using the User model's methods. 

The next thing we will do is consume the data on a mobile screen. For this process, we will do three primary things.

#### Instantiate the user classes.
We will have two instances of the user class; one instance is for the User and another as a list of followers of a given user.

```dart
User user; //instantiate a user
List< User> followers; // instantiate a list of users as a placeholder for the followers.
```

#### Fetching data using setState()
The setState method notifies the application that the application's internal state has been changed and that the change might affect the view. We will add this piece of code in our `FollowersPage.dart` file just before opening the `scaffold()` widget.

```dart
setState(() {
//This function gets a user from the username supplied in the input
  user = Provider.of<UserProvider>(context).getUser();
  
  // this method returns followers of the username supplied in the input as a list
  Github(user.login).fetchFollowers().then((following) {
    Iterable list = json.decode(following.body);
    setState(() {
      followers = list.map((e) => User.fromJson(e)).toList();
    });
  });
});
```

#### Rendering the data on the UI
The last thing under data consumption is to render the dynamic output onto our user interface. 

The block of code below indicates shows how to consume the data on the mobile screen:
```dart
// username
Text(followers[index].login,style:TextStyle(fontSize: 20, fontWeight: FontWeight.w500, color: Colors.grey[700]),)

// User avartar
child: CircleAvatar(backgroundImage: NetworkImage(followers[index].avatarUrl),),

// User location
Text(followers[index].location, style: TextStyle(color: Colors.blue, fontWeight: FontWeight.w700),)
```
### Conclusion
In this article we learned how to fetch and consume data from a RESTful API, using GitHub's REST API as an example. 
To summarize:
- We fetched a user from GitHub API and displayed his followers.
- We automatically generated dart classes from JSON using Quicktype
- We implemented the Flutter folder organization in building an actual application.

Now go and try the application by installing the full app found [here](https://github.com/jerimkaura/flutter-book/tree/main/my-github).

Happy coding!

### Further reading
- [Fetch data from the internet](https://flutter.dev/docs/cookbook/networking/fetch-data)
- [JSON and serialization](https://flutter.dev/docs/development/data-and-backend/json)
- [Http Dart Package](https://pub.dev/packages/http)
- [GitHub REST API](https://docs.github.com/en/rest)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
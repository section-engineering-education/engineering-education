---
layout: engineering-education
status: publish
published: true
url: /flutter-state-management-mobx/
title: Flutter State Management with Mobx
description: In this tutorial, we will build a news application that will use Mobx to manage the state of the application 
author: faith-siaji
date: 2021-11-28T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter-state-management-mobx/hero.jpg
    alt: Flutter state management with Mobx
---
Managing application state in a clean and optimized way is very important when dealing with large Flutter applications. State management is the handling of application data between different screens and components. 
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Project setup](#project-setup)
- [Domain](#domain)
- [Service](#service)
- [State Manager](#state-manager)
- [UI](#ui)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
1. [Flutter SDK](https://flutter.dev/docs/get-started/install) installed.
2. Preferred IDE or code editor installed.
3. Knowledge in [Flutter](https://flutter.dev/docs).

### Introduction
This article will discuss how to retrieve data from an API and passing it to a service class to the UI. The UI will listen for data from the API. When the data is available, the application will display a list of items. 

In addition, the application will show a progress indicator when it is in a loading state. MobX has four principle concepts that we will learn and understand how they work: `observables`, `computed values`, `reactions` and `actions`.

#### Observables
Observables in MobX allow us to add observable capabilities to our data structures—like classes, objects, arrays—and make our properties observables. This means that our property stores a single value, and whenever the value of that property changes, MobX will keep track of the value of the property for us.

For example, let’s imagine we have a variable called counter. We can easily create an observable by using the `@observable` decorator, like this:

```dart
class counter {
  @observable
  int value = 0;
}
```    

By using the `@observable` decorator, we’re telling MobX that we want to keep track of the counter's value, and every time the counter changes, we’ll get the updated value.

#### Computed values                                    
In MobX, we can understand computed values as values that can be derived from our state, so the name `computed values` makes total sense. They are functions derived from our state, so their return values will change whenever our state changes.

You must remember about computed values that the get syntax is required, and the derivation that it makes from your state is automatic, you don’t need to do anything to get the updated value.

```dart
class counter {
  @observable
  int value = 0;

  @computed
  int get doubleValue => value * 2;
}
```

#### Actions
Actions in MobX are a very important concept because they’re responsible for modifying our state. They’re responsible for changing and modifying our observables.

```dart
class counter {
  @observable
  int value = 0;

  @action
  void increment() {
    value++;
  }

  @action
  void decrement() {
    value--;
  }
}
```

#### Reactions
Reactions in MobX are pretty similar to computed values, but the difference is that reactions trigger side effects and occur when our observables change. Reactions in MobX can either be UI changes or background changes—for example, a network request, a print on the console, etc.

We have the custom reactions: autorun, reaction, when.

##### autorun
Autorun will run every time a specific observable changes. For example, if we wanted to print the value of the counter every time it changes, we could do something like this:

```dart
autorun((_) {
  print(counter.value);
});
```

##### Reaction
Reaction is similar to autorun, but it gives us more control when tracking observables’ values. It receives two arguments: the first is a simple function to return the data used in the second argument. 

The second argument will be the effect function; this effect function will only react to data passed in the first function argument. This effect function will only be triggered when the data you passed in the first argument has changed.

```dart
reaction((_) {
  return counter.value;
}, (_) {
  print('Counter changed to ${counter.value}');
});
```

##### when
When is very similar to reaction, but it’s more specific. It’s a function that will only react to data matching the data you pass in the first argument.

```dart
when((_) {
  return counter.value == 0;
}, (_) {
  print('Counter is zero');
});
```

### Project setup
Before proceeding, run the command below to verify that you have installed Flutter correctly on your machine.

```bash
$ flutter doctor
```

![Command window](/engineering-education/flutter-state-management-mobx/command.png)

Now that you have verified that everything is set up correctly, execute the command below to create a new flutter project.

```bash
$ flutter create news_app # news_app is the name of the application
```

Open the generated project in your code editor, add the dependencies below to `pubspec.yml` file.

```yaml
dependencies:
  flutter:
    sdk: flutter
  mobx:
  flutter_mobx:
  http:
  url_launcher:
  cupertino_icons: ^1.0.2

dev_dependencies:
  build_runner:
  mobx_codegen:
  flutter_test:
    sdk: flutter
```

- `mobx`- state manager we will be using.
- `http`- internet connection library we will be using to retrieve news data from an API.
- `url_launcher`- opens a browser with the URL provided. In our case, every news item will have a URL pointing to the website where the news was published.
- `mobx_codegen`- code generation tool for `mobx` state manager.

### Domain
In the project's lib folder, create a new dart file named `article.dart` and add the code snippet below.

```dart
class Articles {
  // Default constructor
  Articles({
    String? author,
    String? title,
    String? description,
    String? url,
    String? urlToImage,
    String? publishedAt,
    String? content,
  }) {
    _author = author;
    _title = title;
    _description = description;
    _url = url;
    _urlToImage = urlToImage;
    _publishedAt = publishedAt;
    _content = content;
  }
  //Converts a news JSON item to Article model 
  Articles.fromJson(dynamic json) {
    _author = json['author'];
    _title = json['title'];
    _description = json['description'];
    _url = json['url'];
    _urlToImage = json['urlToImage'];
    _publishedAt = json['publishedAt'];
    _content = json['content'];
  }

  String? _author;
  String? _title;
  String? _description;
  String? _url;
  String? _urlToImage;
  String? _publishedAt;
  String? _content;

  String? get author => _author;

  String? get title => _title;

  String? get description => _description;

  String? get url => _url;

  String? get urlToImage => _urlToImage;

  String? get publishedAt => _publishedAt;

  String? get content => _content;

  //Converts Article model to a JSON
  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{};
    map['author'] = _author;
    map['title'] = _title;
    map['description'] = _description;
    map['url'] = _url;
    map['urlToImage'] = _urlToImage;
    map['publishedAt'] = _publishedAt;
    map['content'] = _content;
    return map;
  }
}

```

The `Article` class above represents a news item. Article class will map to the JSON object returned by the API.

### Service
Create a new dart file named `service.dart` and add the code snippet below in the lib folder.

```dart
import 'dart:convert';

import 'package:http/http.dart' as http;

import 'articles.dart';

class NetworkService {
  //Creates an empty list of articles
  List<Articles> articles = [];

  //This method is asynchronous, hence the async keyword used, meaning the application can make the network request and continue performing other tasks. When there is a response, then the application acts on the data.
  Future<List<Articles>> getData(String url) async {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      //Retrieves the reponse from the http reponse body
      final data = jsonDecode(response.body); 
      //Loops through the news list JSON converting each news item to Article model and adding to articles list we defined above.
      articles = (data["articles"] as List)
          .map((json) => Articles.fromJson(json))
          .toList();
    } else {
      //This section of the code is excuted if the netwrok request fails, i.e. due to unavailable network or incorrect URL.
      print("Error in URL");
    }
    return articles;
  }
}

```

- `getData(String url)` method takes in the URL and retrieves a list of news items from the API URL provided.
  
### State manager
In the lib folder, create a new dart file named `news_store.dart`. This file will contain our state management code.
Add the code snippet below to `news_Store.dart` file created above.

```dart
import 'package:mobx/mobx.dart';
import 'package:structure/articles.dart';

import 'network_service.dart';

part 'news_store.g.dart';

class NewsStore = _NewsStore with _$NewsStore;

abstract class _NewsStore with Store {
  //Creates an instance of the network service class
  final NetworkService httpClient = NetworkService();
  
  @observable
  List<Articles> articles = [];

  @action
  Future<List<Articles>> fetchArticle() async {
    await httpClient
        .getData(
            'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1bfba80a852a4a36b61239f758f97cb5')
        .then((articleList) {
      articles.addAll(articleList);
    });
    return articles;
  }

  void getTheArticles() {
    fetchArticle();
  }
}
```

- `@observable` annotation indicates that the application can listen for any changes in the variable marked. For example, our application will listen for changes in the list of articles. When the articles are retrieved from the API and added to the articles list, the articles will be displayed on the UI rather than a progress indicator.
- `@action` annotation marks the `fetchArticle()` as actionable, meaning it performs certain operations and changes the data state in the variable marked with `@observable` annotation.

### UI
In the lib folder, create a new dart file named `home_screen.dart` and add the code snippet below.
```dart
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:structure/articles.dart';
import 'package:url_launcher/url_launcher.dart';

import 'news_store.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  //Initializes the NewsStore state manager class
  NewsStore newsStore = NewsStore();
  List<Articles> articles = [];

  @override
  void initState() {
    super.initState();
    getNews();
  }
  //Call the fetchArticle() method from the newsStore state manager class, the getData() method from the network service class is called to make network request.
  getNews() async {
    await newsStore.fetchArticle();
    //When the newStore articles list has data the the data is retrieved and add to the articles list in this screen.
    articles.addAll(newsStore.articles);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text('News'),
        ),
        //The Observer widgets checks if the state of the observable varibale changed and renders a widget conditionaly.
        body: Observer(
          builder: (context) => RefreshIndicator(
            //Whenever the page is refreshed a network call is made to retrive new news items.
            onRefresh: () async {
              await Future.delayed(const Duration(seconds: 4));
              await newsStore.fetchArticle();
              Scaffold.of(context).showSnackBar(snackBar);
            },
            child: Observer(
              //A list of news items shows if the observable variable has data or a progress indicator is shown.
                builder: (_) => (!articles.isEmpty)
                    ? ListView.builder(
                        itemCount: articles.length,
                        itemBuilder: (_, index) {
                          final newsArticles = articles[index];
                          return ArticleContainer(newsArticles);
                        },
                      )
                    : const Center(
                        child: CircularProgressIndicator(),
                      )),
          ),
        ),
      );

  Widget ArticleContainer(Articles newsArticle) {
    return Padding(
      key: Key(newsArticle.title!),
      padding: const EdgeInsets.all(16.0),
      child: ExpansionTile(
        title: Text(
          newsArticle.title!,
          style: const TextStyle(fontSize: 24.0),
        ),
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Text("${newsArticle.author} comments"),
              IconButton(
                onPressed: () async {
                  if (await canLaunch(newsArticle.url!)) {
                    launch(newsArticle.url!);
                  }
                },
                icon: const Icon(Icons.launch),
              )
            ],
          ),
        ],
      ),
    );
  }
}
```

The code snippet above represents the user interface of the application. Next, we retrieve and render the news items on the ArticleContainer widget.

In the `main.dart` file, add the code snippet below.

```dart
import 'package:flutter/material.dart';
import 'package:structure/home_screen.dart';

void main() {
  runApp(const Application());
}

class Application extends StatelessWidget {
  const Application({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}

```

### Testing
![News List](/engineering-education/flutter-state-management-mobx/news.png)

### Conclusion
With all the content covered in this article, you can now try building a production-grade Flutter application, managing the application state using Mobx, and following the recommended patterns, i.e. model view, ViewModel(MVVM) pattern.

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

---
layout: engineering-education
status: publish
published: true
url: /flutter-localization/
title: Getting Started with Flutter Localization
description: This article will explain a step by step process on how to support different languages in a Flutter application
author: jerim-kaura
date: 2021-08-13T00:00:00-08:30
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/flutter-localization/hero.png
   alt: Getting started with Flutter Localization
---
Most of the time, we develop applications that target users across the world. However, we all know that people use different languages. 
<!--more-->
Therefore, to make the application user-friendly, every person needs to access it in their local language. This is where localization comes into play. 

### What is Localization?
App localization is where a developer adds multiple languages to an application to cater to users speaking different languages. 

Using the `Flutter Localization Package`, this article will show you how to create an application that supports multiple languages.

### Prerequisites
To follow along, you need:
1. An understanding of the Flutter framework and Dart programming language.
2. [Flutter SDK](https://flutter.dev/) installed on your computer.
3. [Android Studio](https://developer.android.com/studio), or [VS Code](https://code.visualstudio.com/download) installer.
4. A mobile emulator or a physical device for testing. 

### Project Overview
We will create one screen in which we will render the language chosen at every instance. We will display the system language as set by the current user. 

For instance, if a user speaks German and has his phone language is set to German, our application will render its UI contents in the German language.

### Project setup and package installation
In this project, we will have files for every language that the app supports. We will separate language files from the user interface and business logic to keep the application more organized and easy to debug. 

We will create a `screens` folder in the `lib` directory. This folder will contain the `user interface` files. 

There is no need for the `services` folder since we will not have much backend code. However, we will have another folder called `l10n` in which we will contain all the language files. 

Let's get started.

Create a new Flutter application. You can follow [this](https://flutter.dev/docs/get-started/test-drive#create-app) guide to create the new application. 

Next, organize your folders and files as shown below:

```bash
lib
┣ l10n
┃ ┣ app_de.arb
┃ ┣ app_en.arb
┃ ┣ app_es.arb
┃ ┣ app_hi.arb
┃ ┗ l10n.dart
┣ Screens
┗ main.dart
```

To install the `flutter_localization` package, navigate to the file `pubspec.yaml` then add the code snippets below in the `application dependencies`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations: # add this line
    sdk: flutter         # add this line

flutter:
  generate: true # add this line
  uses-material-design: true    
```

Create a new file in the root folder of the application called `l10n.yaml`. You can refer to the folder structure above to ensure that the file is in the right directory. 

In the `l10n.yaml` file, add the code below:

```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

In the above code, the first line defines the input translation files and the directory where we have stored them. 

The second line specifies the template file that we use to generating translations.  The `template file` should be created in the same folder as the input files. 

The last line contains the output file after translation. Every translation will have the `app_localization` prefix in their names. 

### How it works.
The `flutter_localizations` package provides several localization options for various widgets. 

The `generate: true` setting will ensure that Flutter automatically generates localized getters in different languages using the `dart tool` and the code class specified in the `l10n.dart` file, as demonstrated below:

```dart
import 'package:flutter/material.dart';

class L10n {
  static final all = [
    const Locale('en'),
    const Locale('ar'),
    const Locale('hi'),
    const Locale('es'),
    const Locale('de'),
  ];
}
```

The `l10n.dart` file contains a list of languages that the application supports. You can add more language codes from this [resource](https://www.science.co.il/language/Locale-codes.php). 

We make translations for each language in the `ARB` files. We need to provide `key-values` pairs of a word and its translation equivalent in all the languages supported by the application. 

For instance, the `app_en.arb` file has the contents below:

```json
{
  "language": "English",
  "helloWorld": "This is an example of speech synthesis in English.
   Please follow the code to understand the method of building applications that support multiple languages."
}
```

The equivalent translation of the same text in `Spanish` is stored in the `app_es.arb` file as demonstrated below:

```json
{
  "language": "Español",
  "helloWorld": "Este es un ejemplo de síntesis de voz en inglés. 
  Siga el código para comprender el método de creación de aplicaciones que admiten varios idiomas."
}
```

### Home screen logic code
Our home screen will have a dark background and text to display what language the app is using.

Add the code below in the `main.dart` file:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'l10n/l10n.dart';
```

Next, in the `MaterialApp()` function, we need to state the supported locales and access the localization class in the `l10n.dart` file. 

```dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Localizations  App',
            supportedLocales: L10n.all,
            theme: ThemeData(
                primarySwatch: Colors.blue,
            ),
            home: MyHomePage(),
        );
    }
}
```

When the application auto-generates translations, it creates a new class in the `generated localizations` called `AppLocalizations`. 

We need to access this class to bring in the language translations. All translation classes will extend this class as the base class. 

Update the code in the `main.dart` as demonstrated below:

```dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Localizations  App',
            localizationsDelegates: const [
                AppLocalizations.delegate,
                GlobalMaterialLocalizations.delegate,
                GlobalWidgetsLocalizations.delegate,
                GlobalCupertinoLocalizations.delegate,
            ],
            supportedLocales: L10n.all,
            theme: ThemeData(
                primarySwatch: Colors.blue,
            ),
            home: MyHomePage(),
        );
    }
}
```
### The homepage UI components
We have brought in all the requirements and imported all the language translations into the root of the application. 

We need to display each component with the language specified in the system. Add the following code to display each language and its equivalent translation.

```dart
class _MyHomePageState extends State<MyHomePage> {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(
            title: Text('Flutter Localization'),
            ),
            body: Container(
            color: Colors.black,
            child: Column(
                children: <Widget>[
                SizedBox(height: 60),
                    // Language
                    Text(AppLocalizations.of(context).language, 
                            style: TextStyle(
                                color: Colors.white, 
                                fontSize: 40, 
                                fontWeight: FontWeight.bold
                            )
                        ),
                    SizedBox(height: 90),
                    Container(
                        padding: EdgeInsets.symmetric(horizontal: 25, vertical: 4),
                        child: Card(
                            color: Colors.black87,
                            // Parapgraph translation 
                            child: Text(AppLocalizations.of(context).helloWorld, 
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 30, 
                                    fontWeight: FontWeight.bold
                                )
                            ),
                        ),
                    ),
                SizedBox(height: 15),
                ],
            ),
            )
        );
    }
}

```

### Testing the application
You can download the entire source code from [here](https://github.com/jerimkaura/flutter-book/tree/localization/localization). 

The default language for the application is English. However, we can change the app language to Spanish or Deutsch, as shown below:

![App in English](/engineering-education/flutter-localization/english.jpg) 

![App in Spanish](/engineering-education/flutter-localization/spanish.jpg)  

![App in Deutsch](/engineering-education/flutter-localization/deutsch.jpg) 

### Conclusion
This guide was a good starting point for creating multi-language apps. The reader can, therefore, use this knowledge to build other quality applications. 

### Further Reading
- [Internalization User Guide](https://files.flutter-io.cn/sources/flutter-design-docs/i18n-user-guide.pdf)
- [Internationalizing Flutter Apps](https://flutter.dev/docs/development/accessibility-and-localization/internationalization)
- [i18n vs l10n — what’s the diff?](https://blog.mozilla.org/l10n/2011/12/14/i18n-vs-l10n-whats-the-diff/)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)

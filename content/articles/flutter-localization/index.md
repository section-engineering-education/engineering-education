
### Introduction
Most of the time, we develop applications that target users across the world. However, we all know that different people use different languages, and to make the application as user-friendly as possible, every user needs to access the application in their language. The need to access an application in the various languages is where localization comes in. 

### What is Localization?
App localization is where a developer adds multiple languages to an application to cater to all users speaking different languages. Using the `Flutter Localization Package`, this article will show how to enable an application to support multiple languages at a time. Users prefer such applications as they give a friendly interaction with the users.

### Prerequisites
1. An understanding of Flutter framework and Dart Programming Language.
2. [Flutter SDK](https://flutter.dev/) installed on your computer.
3. [Android Studio](https://developer.android.com/studio), or [VS Code](https://code.visualstudio.com/download) installer.
4. A mobile emulator or a mobile device to test the project. 

### Project Overview
We will create one screen in which we will render the language chosen at every instance. In every instance, we will display the language of the system as set by the current user. So, for instance, if a user speaks German and has his phone language set to German, our application will render its UI contents in the German language. The same will apply to other languages. 

### Project setup and package installation
Within this project, we will have language files for every language that the app will support. I recommend separating the language files from the user interface and the application logic to keep our application more organized and easy to debug. We will have a `screens` folder in the `lib` folder. This folder will contain the `user interface` files. We will not have much backend code, so we will not have the `services` folder. However, we will have another folder called `l10n` in which we will store all the language files. 

Create a new flutter application. You can follow [this](https://flutter.dev/docs/get-started/test-drive#create-app) guide to create the new application. Next, organize your folders and files as shown below:
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
To install the `flutter_loclization` package, head over to the file `pubspec.yaml` then add the code snippets below in the application dependencies:
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

Create a new file in the root folder of the application called `l10n.yaml`. You can refer to the folder structure above so that you create the file in the right directory. In the file you just created, add the code below:
```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```
The first line defines the input translation files and the directory where we have stored them. The second line specifies the template file we use to generating the translations.  It is required that the `template file` is created in the same folder as the input files. The last line contains the output file after translation. Every translation will take have the `app_localization` prefix in their names. 

### How it works.
The `flutter_localizations` package provides various localization options for various widgets in flutter. Setting ` generate: true` will ensure that flutter automatically generates localized getters in different languages using the `dart tool` and the language code class specified in the `l10n.dart` file, as below:
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

The `l10n.dart` contains a list of languages that the application will support. You can add more language codes from this [resource](https://www.science.co.il/language/Locale-codes.php). We make the translations for each language in the `ARB` files. So we provide key-values pairs of a word and its translation equivalent in all the languages our application supports. For instance, our `app_en.arb`, which is the `English` ARB file, has the contents below:
```
{
  "language": "English",
  "helloWorld": "This is an example of speech synthesis in English.
   Please follow the code to understand the method of building applications that support multiple languages."
}
```
The equivalent translation of the same text in `Spanish` is stored in the `app_es.arb` file as below:
```arb
{
  "language": "Español",
  "helloWorld": "Este es un ejemplo de síntesis de voz en inglés. 
  Siga el código para comprender el método de creación de aplicaciones que admiten varios idiomas."
}
```
You can find the remaining translation files in the GitHub repo link.

### Home screen logic code
Our home screen will have a dark background and text to display what language the app is using at the moments as specified in system language and a paragraph of the `helloWorld` text specified in the `arb` files. Add the snippets below in the `main.dart` file to import the packages.
```dart
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'l10n/l10n.dart';
```
Next, in the `MaterialApp()` we need to the supported locales and access the localization class in the `l10n.dart` file. 
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
When the application auto-generates translations, it creates a new class in the `generated localizations` called `AppLocalizarions`. We need to access this class to bring in the translations generated. All translation classes extend this class as the base class. Update the `main.dart` to the snippets below:
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
### The homepage user interface components
We have brought in all the requirements and imported all the language translations into the root entry of the application. Next is to display each component with the language specified in the system. Add the snippets below for to display each language and its equivalent translation.
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
Download the entire source code for the application from [this link](https://github.com/jerimkaura/flutter-book/tree/localization/localization). The default language for the application is English as shown. However, when we change the langauge of the phone to spanish or Deutsch the app lanaguage also changes as shown in the second image.
| English | Spanish| Deutsch |
|:---:|:---:|:---:|
| ![App in English](/engineering-education/flutter-localization/english.jpg) | ![App in Spanish](/engineering-education/flutter-localization/spanish.jpg) | ![App in Deutsch](/engineering-education/flutter-localization/deutsch.jpg) |

### Conclusion
This guide was a good starting point for creating a multi-language application. It provides a beginner with a direct head start for the concept. By going over autogeneration of dart translation files, creating `arb` files, importing the files for real-life implementation of multi-language, the reader can cement a good foundation for building a production-level application that supports multiple languages. 

### Further Reading
This tutorial was more of a beginners' starting point. To get more into the topic, I recommend going over more complex and deep resources available on the internet and programming books. Some of the resources that could be helpful are listed below.
- [Internalization User Guide](https://files.flutter-io.cn/sources/flutter-design-docs/i18n-user-guide.pdf)
- [Internationalizing Flutter Apps](https://flutter.dev/docs/development/accessibility-and-localization/internationalization)
- [i18n vs l10n — what’s the diff?](https://blog.mozilla.org/l10n/2011/12/14/i18n-vs-l10n-whats-the-diff/)

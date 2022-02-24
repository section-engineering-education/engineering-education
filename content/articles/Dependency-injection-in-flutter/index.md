---
layout: engineering-education
status: publish
published: true
url: /dependency-injection-in-flutter/
title: Dependency Injection in Flutter
description: In this article, the reader will learn how to implement dependency injection, get rid of flutter packages, and why dependency injection is needed in a Flutter application.
author: bonface-ndolo
date: 2021-09-01T00:00:00-13:23
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dependency-injection-in-flutter/hero.jpg
    alt: Flutter Dependency Injection Image
---

`Dependency injection` is an object-oriented technique that sends the dependencies of another object to an object. Using dependency injection, we can also move the creation and restriction of dependent objects outside the classes. This concept brings a more significant level of adaptability, decoupling, and simpler testing.
<!--more-->
The `provider package` wraps Inherited Widgets in an easy-to-use wrapper. It makes it easy to manage and utilize, and it also includes a state management mechanism for managing data within the app.

In this article, we will learn how to implement dependency injection, get rid of flutter packages, and why we need dependency injection in a Flutter application.

### Table of content
- [Dependency injection in Flutter](#dependency-injection-in-Flutter)
- [Functionalities of dependency injection](#functionalities-of-dependency-injection)
- [Reason why we need dependency injection](#Reason-why-we-need-dependency-injection)
- [How to get rid of flutter package](#How-to-get-rid-of-flutter-package)
 
### Dependency injection in Flutter
Although dependency injection is a simple example, libraries are frequently used to abstract it from the designer. Many of these libraries take advantage of reflection (mirrors in Dart). There are issues in a flutter, however:
1. Mirrors are crippled for execution reasons. 
2. The settled idea of widgets makes it unfeasible to pass conditions many levels down the tree.

The injection library, on the other hand, can be used to solve similar issues.
Annotations used by the injection library are listed below.

1. **@Injector** - An inversion of control container developed from a bunch of modules.
2. **@provides and @module** - Define classes and methods providing dependencies.
3. **@component** -  In performing an injection.

### Functionalities of dependency injection

#### Concrete class injection
The concrete class injection can be as shown below:

```dart
//inject/inject.dart’ is an auto generated file that is imported
import ‘package:inject/inject.dart’;
//defining a class
@provide
class ExampleExa {
   // implementation
}
```

#### Interface injection
First, create an abstract class with some implementation, then provide dependencies in the module.
Abstract class:

```dart
abstract class NewExa{
  
}class OldExa implements NewExa {
   @override
    {
   // implementation
   }
}
```
Afterward, we can add dependencies to our module.
Final module:

```dart
//inject/inject.dart’ is an auto generated file that is imported
import ‘package:inject/inject.dart’;
//defining the class 
@module
class ExampleExa {
//providing dependencies
@provide
NewExa newExa() => OldExa();
}
```

#### Providers
Suppose we do not require an instance of a class injected, but rather a provider that will provide us with a fresh instance of the class every time we need to resolve a dependency. Instead of getting a concrete instance in the constructor, we can use a function that returns the appropriate instance and will do the injection correctly. We can define a helper and use it as shown below.

```dart
typedef Provider<T> = T Function();
```

Usage:

```dart
@provide
class NewWidget extends StatelessWidget {
   final Provider<StepService> _service;
NewWidget(this._service);
void _someFunction() {
   final service = _service();
   // use service
   }
}
```

#### Assisted injection
Since there is no implicit benefit to injecting objects that require only runtime contentions, we can use the standard factory. For example, create a factory class that takes all the compile-time dependencies in the constructor, injects it, and gives a factory technique runtime contention that will make a crucial case.

We need now to construct an injector for everything to work.

```dart
import ‘main.inject.dart’ as g;
@Injector(const [ExampleExa, NewExa])
abstract class Main {
   @provide
   NewApp get app;
   static Future<Main> create(
     ExampleExa exampleModule,
     NewExa newModule,
   ) async {
     return await g.Main$Injector.create(
       exampleModule,
       newModule,
     );
   }
}
```

In this example, `ExampleExa` and `NewExa` are already defined, `NewApp` is our root widget, and `main.inject.dart` is a file that Flutter creates automatically.
As a result, the primary function may be as follows:

```dart
void main() async {
var container = await Main.create(
ExampleExa(),
NewExa(),
);
runApp(container.app);
}
```

We recommend using either the build runner or the watch command to keep the source code in sync throughout code creation.
 
```dart
flutter pub run build_runner build
```
Alternatively:

```dart
flutter pub run build_runner watch
```

The code will be saved in the cache folder, which Flutter does not yet support. As a result, the following text must be included in the `inject_generator.build.yaml` file:

```dart
builders:
 inject_generator:
 target: “:inject_generator”
 import: “package:inject_generator/inject_generator.dart”
 builder_factories:
 — “summarizeBuilder”
 — “generateBuilder”
 build_extensions:
 “.dart”:
 — “.inject.summary”
 — “.inject.dart”
 auto_apply: dependents
 build_to: source
 ```
 
We can now run the build runner, which will generate the required code (with error warnings if any dependencies cannot be resolved), and then execute Flutter build as usual.

### Reason why we need dependency injection
As explained earlier, dependency injection in Flutter is an object-oriented technique that sends the dependencies of another object to an object.
The objective of the dependency injection strategy is to eliminate this dependency by isolating the use from the formation of the item. 

This diminishes the measure of required standard code and further develops adaptability.

### How to get rid of flutter package
1. Run `flutter clean`.
2. Remove the unwanted dependencies in pubspec.yaml.
3. Delete the pubspec.lock.

Reload the project and again perform 'pub get' and run the project.

### Conclusion
Dependency injection permits a customer to eliminate all information on actual execution. It permits us to make more adaptable code and change one execution for another without changing the layer. 

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)

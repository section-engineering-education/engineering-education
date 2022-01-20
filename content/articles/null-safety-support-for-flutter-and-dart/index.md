---
layout: engineering-education
status: publish
published: true
url: /null-safety-support-for-flutter-and-dart/
title: Null Safety Support for Flutter and Dart
description: This article will help you understand null safety features and their benefits in Dart.
author: francisca-ngodu
date: 2021-09-28T00:00:00-04:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/null-safety-support-for-flutter-and-dart/hero.jpg
    alt: Null Safety support for Flutter and Dart Cover image
---
Null safety means that a variable cannot have a null or void value. This feature improves user satisfaction by reducing errors and app crashes. 
<!--more-->
Null safety ensures that all runtime null-dereference problems are shown at compile-time. It helps you avoid many problems during development, rather than waiting until runtime to identify null errors. 

When it comes to type safety, Dart excels.

This article will cover the implementation of null Safety in Flutter. It will also discuss how this feature impacts the development process, as well as its benefits.

The article will also show you how to incorporate null safety in your Flutter application.

### Prerequisites
Before getting started, the reader should have:
- A basic understanding of Dart programming language.
- Flutter SDK [version 2.0.0](https://flutter.dev/docs/get-started/install) installed.
- Dart SDK [version 2.12.0](https://dart.dev/get-dart) installed.
- An IDE installed. Preferably [IntelliJ](https://www.jetbrains.com/idea/).

### Table of contents
- [Principles of null safety](#principles-of-null-safety)
- [What are nullable and non-nullable types?](#what-are-nullable-and-non-nullable-types)
- [Sound and unsound null safety](#sound-and-unsound-null-safety)
- [How null safety migration works in Flutter](#how-null-safety-migration-works-in-flutter)
- [Reasons for null safety migration in Flutter](#reasons-for-null-safety-migration-in-flutter)

### Principles of null safety
**Non-nullable**

Without explicit nullability declarations, variables in the Dart programming language cannot be null.

**Adoptable**

It is entirely up to you to make the switch to null safety. You can decide when and what to move to null safety. The same project can have null-safe and non-null-safe code stages.

**Fully Sound**

Compiler optimizations are feasible thanks to Dart's null safety feature. All variables that require values must be initialized appropriately. Other benefits of null Safety include fewer bugs, smaller binaries, and faster execution.

### What are nullable and non-nullable types?
#### Non-nullable types
When we use null safety, all types are by default non-nullable. For example, an `int` variable must have an `integer` value.

```dart
void main() {
  int number;
  number = 0; 
}
```

If a variable is non-nullable, it must always be set to a non-null value.

#### Nullable types
The following operators specify if a variable can be null:

**Nullable type (?)**

```dart
String? houseLocationName;  // By default, it's set to null.
int? number = 36;  // By default, it's set to non-null.
number = null; // It's possible to reassign it to null.
```

A nullable variable does not need to be initialized before being used.

**The assertion operator (!)**

Using the null assertion operator '!' allows Dart to regard a nullable expression that isn't null as non-nullable. However, you must be sure that there is no value assigned to it.

```dart
int? anyNumber = 50;
int data = anyNumber!; // Because the value is not nullable, this is valid
```

**Type promotion** 

`Flow Analysis` is an algorithm that determines the execution of a program.

Dart's analyzer checks for nullable variables with non-null values and informs the developer of possible compile-time problems. 

```dart
int checkValue(int? anyNumber) {
  if (anyNumber == null) {
    return 0;
  }
  // here the value is not null.
  return anyNumber.abs();
}
  
void main(){
  print(checkValue(10));
  print(checkValue(null));
}
```

This code determines whether a value is null or not. A non-nullable value cannot be nullified. 

So, `anyNumber.abs()` can be used instead of `anyNumber?.abs()`. The `abs()` function produces a result that is not a decimal.

### Sound and unsound null safety
Using null-safe libraries and non-null-safe libraries is possible in Dart. However, while executing these mixed-versions, null safety can be compromised.

Null safety is guaranteed through a combination of static and runtime checks in Dart. 

A null safety check is usually performed on each Dart library. Errors can arise even in a mixed-version program that has null-unsafe libraries. 

A mixed-version software cannot have the runtime soundness that a null-safe application does. 

Note that introducing null variables in null-safe code could lead to errors.

### How null-safety migration works in Flutter
There are [five major steps](https://dart.dev/null-safety/understanding-null-safety) for migrating a package or application to null Safety.

These steps are discussed below:

**1. Ensure that all dependencies are ready for migration**

If any of your dependencies change during migration, you may have to do another relocation migration after transferring the appropriate code. 

If some of your dependencies are not null safe, you may need to contact the package developers. 

An application is ready for migration-only if it upgrades its dependencies to the prerelease versions of the path and process.

**2. Use the migration tool to migrate**

Fortunately, the migration tool helps you to check and confirm nullable attributes. 

You can add nullability cues to change a device's attributes. However, some of the migration cues included can have a significant impact on migration quality. 

The [migration guide](https://dart.dev/null-safety/migration-guide) provides further ideas on how to use the migrating tool effectively.

**3. Analyze your migrated code statically**

You can update your packages by executing the `pub get`command in your terminal. 

Your Flutter and Dart code can then be evaluated statically using the commands below:

 ```
$ flutter pub get
$ flutter analyze

$ dart pub get
$ dart analyze
 ```
**4. Verify that the tests are passing**

Make sure that all tests pass. If you updated your package code to accept only non-nullable variables, you may need to re-run tests.

**5. Packages that are null-safe should be published**

Your prerelease package can be published as soon as your migration is complete and all tests have passed. 

As a prerelease version, you should publish the package to [pub.dev](https://pub.dev/) which is a public repository.
 
### Reasons for null-safety migration in Flutter
When checking for null safety, you can entirely rely on the compiler. This makes the process much simpler.

Therefore, adopting null safety should be mandatory. The time and effort you put into this activity will save you from frustration in the future.

Dart is a developer-centric language that is reaffirmed by this feature. The inclusion of null safety in the Flutter SDK makes it much easier to create applications.

### Conclusion
As far as type safety is concerned, Dart is unbeatable. Null safety helps you avoid numerous errors in your program.

You can, therefore, use the knowledge gained from this article to craft quality Flutter applications.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
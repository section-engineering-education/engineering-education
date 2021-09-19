---
layout: engineering-education
status: publish
published: true
url: /null-safety-support-for-flutter-and-dart/
title: Null Safety support for Flutter and Dart
description: Null Safety means that a variable cannot have a null value unless it starts with null. Null Safety helps you prevent a wide range of issues by catching null errors during development rather than at runtime. This article will cover all the null safety features and their benefits.
author: francisca-ngodu
date: 2021-09-16T00:00:00-15:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/null-safety-support-for-flutter-and-dart/hero.jpg
    alt: Null Safety support for Flutter and Dart Cover image
---
Table of content:
- [Principles of Null Safety](#principles-of-null-safety)
- [What are Nullable and Non-nullable types?](#what-are-nullable-and-non-nullable-types)
- [Sound and Unsound null safety](#sound-and-unsound-null-safety)
- [How Null-safety migration works in Flutter](#how-null-safety-migration-works-in-flutter)
- [Reasons for Null-safety migration in Flutter](#reasons-for-null-safety-migration-in-flutter)

### Introduction
Null Safety means that a variable cannot have a null value unless it starts with null. If a variable begins with "null," it cannot end with "null." 

All runtime null-dereference problems will now be shown at compile-time, thanks to null Safety. Null Safety helps you avoid many problems during development, rather than waiting until runtime to capture null errors. When it comes to type safety, Dart excels.

If you get a variable or something similar, the compiler can ensure it but even if the variable is not null, type safety alone does not guarantee that it is and when an error occurs, the null value is returned. 

This article will cover how null Safety is implemented in Flutter, how it impacts the development process, the benefits it brings, and how to transition your flutter applications to Null Safety.
### Prerequisites
There are several basic requirements that must be met before you can use Null Safety in your Flutter apps.
1. Flutter SDK version 2.0.0
2. Dart SDK version 2.12.0
### Principles of Null Safety
- **Non-nullable**: Without explicit nullability declarations, variables in the Dart programming language cannot be null because non-null was by far the most popular option in API research.
- **Incrementally Adoptable**: It is entirely up to you to make the switch to null safety. You can decide when and what to move to null safety. The same project can have null-safe and non-null-safe code stages.
- **Fully Sound**: Compiler optimizations are feasible thanks to Dart's strong Null Safety. Something cannot be null if the type system concludes that it is not null. Other benefits of Null Safety include fewer bugs, smaller binaries, and faster execution.

### What are Nullable and Non-nullable types?
#### Non-Nullable Types
When we employ Null Safety, all types are by default non-nullable. An int variable, for example, will have an integer value.

```Dart
oid main() {
  int number;
  number = null; 
}
```

If a variable is non-nullable, it must always be set to a non-null value.
#### Nullable Types
The following operators specify if a variable can be null:

- Nullable type `'?'` 
```
String? houseLocationName;  // By default, it's set to null.
int? number = 36;  // By default, it's set to non-null.
number = null; // It's possible to reassign it to null.
```
A nullable variable does not need to be initialized before being used. 

By default, it is null.

- The Assertion Operator `'!'`

Consider using the null assertion operator '!' the ability to force Dart to regard a non-nullable expression as non-nullable if you know it is not null.

```dart
int? anyNumber = 50;
int data = anyNumber!; // Because the value is not nullable, this is valid
```

- Type Promotion 

**Flow Analysis** is an algorithm that determines how a program will be executed.

Dart's analyzer guarantees a nullable variable to have a non-null value, which informs the programmer of compile-time problems and warnings. At runtime, Dart promotes types via Flow Analysis.

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

Is it null or not? This is what this code determines. A non-nullable value cannot be nullified. So, `anyNumber.abs()` can be used instead of `anyNumber?.abs()` in a secure manner. The `.abs()` function produces a result that is not a decimal.

### Sound and Unsound null safety
Using null-safe libraries and non-null safe libraries is possible in a Dart application. While executing these mixed-version applications, Null Safety is compromised.

Null safety is ensured by a combination of static and runtime checks in the Dart programming language. A null safety check is performed on each Dart library that uses it, and the faults are more severe, even in a mixed-version program with null-unsafe libraries included. 

When you begin converting a section of your code to null safety, you reap these benefits.

A mixed-version software cannot have the runtime soundness that a null-safe application does. As long as null does not leak from the null-unsafe library into the null-safe code, it is okay because forestalling would wreak havoc with the un-migrated code's existing behavior.

### How Null-safety migration works in Flutter
This migration guide on `Dart.dev` outlines the five steps for migrating a package or vital application to null safety. 

These steps include:
#### Step one: If your dependencies are ready, make sure they are:

As a result, if any of your dependencies' APIs change during the migration process, you may have to do another relocation migration after you've made some headway transferring code. If some of your dependencies aren't null safe, you may wish to contact the package developers. 

Your application or package's readiness for migration can be determined with the dart pub outdated in null-safety mode. In the Resolvable part of the model, this application is ready for migration if it upgrades its dependencies to the prerelease versions of path and process.

#### Step two: Use the migration tool to migrate:

Fortunately, the migration tool is clever, so you may check the nullability attributes that the apparatus has acquired for you. To change a device's conclusion, you can add nullability clues. Some of the migration cues included can have a major impact on the migration quality.The migration guide provides further ideas on how to use the migrating tool most effectively.

#### Step three: Analyze your migrated code statically:

 When using your IDE or the command line, you can update your packages by executing pub get. Your flutter and Dart code can then be evaluated statically respectively by using your IDE or the command line, as follows:
 ```
$ flutter pub get
$ flutter analyze

$ dart pub get
$ dart analyze
 ```
 #### Step four: Verify that the tests are passing:

 Make sure that your tests pass. If you updated your package code to no longer allow nulls, you may need to re-run tests that expect null values.

 #### Step five: Packages that are null-safe should be published:

 your prerelease can be published as soon as your migration is complete and all tests have passed. As a prerelease version,  publish your package to a public repository (pub). dev.
 
### Reasons for Null-safety migration in Flutter
When refactoring for null safety, you should be aware that you can entirely rely on the compiler. As a result, the cycle becomes quite simple; therefore, moving your code to null safety should be mandatory rather than optional. The time and effort you put into this will save you countless hours of labor in the future.

Dart is a developer-centric language that is reaffirmed by this feature. Having this aspect in the Flutter SDK will make it much easier to create applications that run in a real sense wherever.

### Conclusion
As far as type safety is concerned, Dart is unbeatable. Compilers can assure that you obtain a variable or equivalent thing. However, even if the variable is not null, type safety alone does not guarantee that it is. When an error occurs, the null value is returned.

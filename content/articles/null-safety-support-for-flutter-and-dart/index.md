### Introduction
As soon as a variable begins with "null", it cannot end with "null." If there is a problem, it will now be shown at compilation time thanks to null safety. Null Safety helps you avoid a wide range of problems during development, rather than waiting until runtime to capture null errors.
When it comes to type safety, Dart excels.

 If you get a variable or something similar, the compiler can ensure it. But even if the variable is not null, type safety alone does not guarantee that it is. When an error occurs, the null value is returned. We'll look at how null safety is implemented in Flutter, how it impacts the development process, the benefits it brings, and how to transition your flutter applications to null safety.
### Principles of Null Safety
**Non-nullable** Without explicit nullability declarations, variables in the Dart programming language cannot be null. This is because in API research, non-null was by far the most popular option.

- **Incrementally Adoptable**: It is entirely up to you to make the switch to null safety. You can decide when and what to move to null safety. The same project can have null-safe and non-null-safe code stages.

- **Fully Sound**: Compiler optimizations are feasible thanks to Dart's strong null safety. Something cannot be null if the type system concludes that it isn't null. Other benefits of null-safety include fewer bugs, smaller binaries and faster execution.
### What are Nullable and Nonnullable types?
1. **Non-Nullable Types**

When we employ null safety, all types are by default non-nullable. An int variable, for example, will have an integer value.
```Dart
oid main() {
  int number;
  number = null; 
}
```
> If a variable is non-nullable, it must always be set to a non-null value.
2. **Nullable Types**

You can use the following operators to specify if a variable can be null.
- nullable type `'?'` 
```
String? houseLocationName;  // By default, it's set to null.
int? number = 36;  // By default, it's set to non-null.
number = null; // It's possible to reassign it to null.
```
A nullable variable does not need to be initialized before being used. By default, it's set to null.
- The Assertion Operator `'!'`

Consider using the null assertion operator '!' the ability to force Dart to regard a non-nullable expression as non-nullable if you know it isn't null.
```dart
int? anyNumber = 50;
int data = anyNumber!; // Because the value is not nullable, this is valid
```
- Type Promotion 

`Flow Analysis` is an algorithm that determines how a program will be executed
A nullable variable is guaranteed to have a non-null value by Dart's analyzer, which informs the programmer of compile-time problems and warnings. At runtime, Dart promotes types via Flow Analysis. 
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
Is it null or not? That's what this code determines. A non-nullable value is one that cannot be nullified. So, anyNumber.abs() can be used instead of anyNumber?.abs in a secure manner. The .abs() function produces a result that is not a decimal.
### Sound and Unsound null safety
Using null-safe libraries and non-null-safe libraries is possible in a Dart application. While executing these mixed-version applications, the null safety is compromised.

Null safety is ensured by a combination of static and runtime checks in the Dart programming language. A null safety check is performed on each Dart library that uses it and the faults are more severe. That's true, even in a mixed-version program with null-unsafe libraries included. When you begin converting a section of your code to null safety, you begin to reap these benefits.

It's impossible for a mixed-version software to have the runtime soundness that a null-safe application does. As long as null does not leak from the null-unsafe library into the null-safe code, it's okay, because forestalling would wreak havoc with the unmigrated code's existing behavior.
### How Null-safety migration works in Flutter
This migration guide on dart. dev outlines the five steps for migrating a package or important application to null safety.
These steps include:
1. If your dependencies are ready, make sure they are:

As a result, if any of your dependencies' APIs change during the migration process, you may have to do another relocation migration after you've made some headway transferring code. If some of your dependencies aren't null safe, you may wish to contact the package developers. 

Your application or package's readiness for migration can be determined with the dart pub outdated in null-safety mode. In the Resolvable part of the model, this application is ready for migration if it upgrades its dependencies to the prerelease versions of path and process.

2. Use the migration tool to migrate:

Fortunately, the migration tool is clever, so you may check the nullability attributes that the apparatus has acquired for you. To change a device's conclusion, you can add nullability clues. Some of the migration cues included can have a major impact on the migration quality.The migration guide provides further ideas on how to use the migrating tool most effectively.

3. Analyze your migrated code statically:

 When using your IDE or the command line, you can update your packages by executing pub get. Your flutter and Dart code can then be evaluated statically respectively by using your IDE or the command line, as follows:
 ```
$ flutter pub get
$ flutter analyze
// in your dart code
$ dart pub get
$ dart analyze
 ```
 4. Verify that the tests are passing:

 Make sure that your tests pass. If you updated your package code to no longer allow nulls, you may need to re-run tests that expect null values.

 5. Packages that are null-safe should be published:

 your prerelease can be published as soon as your migration is complete and all tests have passed. As a prerelease version,  publish your package to a public repository (pub). dev.
 ### Reasons for Null-safety migration in Flutter
 When refactoring for null safety, you should be aware that you can completely rely on the compiler. As a result, the cycle becomes quite simple. As a result, I agree that moving your code to null safety should be mandatory rather than optional. The time and effort you put into this will save you countless hours of labor in the future.

 That Dart is a developer-centric language is reaffirmed by this feature. Having this aspect in the Flutter SDK will make it a lot easier to create applications that run in a real sense wherever.

 ### Conclusion
As far as type safety is concerned, Dart is unbeatable. Compilers can assure that you obtain a variable or equivalent thing. But even if the variable is not null, type safety alone does not guarantee that it is. When an error occurs, the null value is returned.

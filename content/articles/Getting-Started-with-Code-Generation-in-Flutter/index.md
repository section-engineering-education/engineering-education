### Introduction
You can automate these time-consuming tasks using Flutter model code generation so you can focus on what counts. Write the code pattern once and you have a generator which creates code files according to your instructions. 
You'll construct a code generator in this article that locates all of a class's variables, saves them in a map, and then generates getters and setters.
### When code generation can be used?
1. **Boilerplate code for architecture**- Almost every architectural solution includes some boilerplate code, to write it over and over again is tiresome which you may avoid in part by generating the code.
2. **Common features functions**- Functions like fromMap and toMap are used by almost every model type of class.These functionalities can be added to all of the classes in one operation owing to code generation.
3. **Data classes**- These are pretty straightforward classes to build, and you'll probably need a lot of them. As a result, instead of manually writing each one, it's a good idea to create them using the code generator.
### What are annotations and how do we utilize them?
`Annotations` are data classes that offer more information about a code component and allow metadata to be added to code components including classes, methods, and variables.

let's create an annotation subclass first but before that ensure you have created a file in **annotations/lib/src** and named it new_method.dart:
```dart
class ScAnnotation {
  const SubclassAnno();
}
//The global variable generateSubclass is the name given to the annotation that will be used to mark a class for a generator
const generateSubclass = SubclassAnno();
```
Now create another subclass but in a different file which you can similarly name as extended_method.dart:
```dart
class ExtendedAnnotation {
  const ExtendednAnno();
}

const generateExtension = ExtendedAnno();
```
Finally, create another in **lib** and name it annotation.dart:
```dart
library annotations;

export 'src/new_method.dart';
export 'src/extended_method.dart';
```
The next step is now to create the generators.
### A generator's method of generating code.
first using model visitor lets create a file named model_visitor.dart in the lib/src that will find annotated classes and copy the following code:
```dart
import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/visitor.dart';
//The majority of the methods you'll need are already implemented in SimpleElementVisitor.
class ModelVisitor extends SimpleElementVisitor<void> {
  String className;
  final fields = <String, dynamic>{};
  @override
  void visitConstructorElement(ConstructorElement element) {
    final elementReturnType = element.type.returnType.toString();
    className = elementReturnType.replaceFirst('*', '');
  }
  @override
  void visitFieldElement(FieldElement element) {
    final elementType = element.type.toString();
    fields[element.name] = elementType.replaceFirst('*', '');
  }
}
```
### Using a Generator to Create a Subclass
The first generator we create creates a subclass with all of the getters and setters implemented. Create subclass_generator.dart in lib/src and add the following:
```dart
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';
import 'package:annotations/annotations.dart';
import 'model_visitor.dart';
//The generic type parameter ScAnnotation is sent to GeneratorForAnnotation, and this is where you map the generator to the associated annotation.
class SubclassGenerator extends GeneratorForAnnotation<ScAnnotation> {}
@override
String generateForAnnotatedElement(
    Element element, ConstantReader annotation, BuildStep buildStep) {
  final visitor = ModelVisitor();
  element.visitChildren(visitor);
  //create classname for the generated class.
  final className = '${visitor.className}Gen';
  //we use a StringBuffer since we are working with a lot of Strings. 
  final classBuffer = StringBuffer();
  classBuffer.writeln('class $className extends ${visitor.className} {');
  classBuffer.writeln('Map<String, dynamic> variables = {};');
  classBuffer.writeln('$className() {');
  for (final field in visitor.fields.keys) {
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("variables['${variable}'] = super.$field;");
  }
  classBuffer.writeln('}');
  generateGettersAndSetters(visitor, classBuffer);
  classBuffer.writeln('}');
  return classBuffer.toString();
}
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {
for (final field in visitor.fields.keys) {
  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");
  classBuffer
      .writeln('set $variable(${visitor.fields[field]} $variable) {');
  classBuffer.writeln('super.$field = $variable;');
  classBuffer.writeln("variables['$variable'] = $variable;");
  classBuffer.writeln('}');
    }
  }
}
```
### Using a Generator to Create an Extension
As methods of extension, you'll produce the getters and setters for each variable. Now make extension generator.dart in the lib/src directory with the following set of code:
```dart
//Import packages
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';
import 'package:annotations/annotations.dart';
import 'model_visitor.dart';
class ExtensionGenerator extends GeneratorForAnnotation<ExtendedAnnotation> {
  @override
  String generateForAnnotatedElement(
      Element element, ConstantReader annotation, BuildStep buildStep) {
  final visitor = ModelVisitor();
  element.visitChildren(visitor);
  final classBuffer = StringBuffer();
  classBuffer.writeln('extension GeneratedModel on ${visitor.className} {');
  classBuffer.writeln('Map<String, dynamic> get variables => {');
  for (final field in visitor.fields.keys) {
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("'$variable': $field,"); // EX: 'name': _name,
  }
  classBuffer.writeln('};');
//Again call generateGettersAndSetters
  generateGettersAndSetters(visitor, classBuffer);

  classBuffer.writeln('}');.
  return classBuffer.toString();
  }
}
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {
for (final field in visitor.fields.keys) {

  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;
 // getter-This writes the getter code
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");

  classBuffer.writeln(
      'set $variable(${visitor.fields[field]} $variable)');
  classBuffer.writeln('=> $field = $variable;');
  }
}
```
### Using Generators to create Builders.
Being the last step in this article now create builder.dart in lib and add the following set of code:
```dart

import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';

// import the generators you created above
import 'src/extension_generator.dart';
import 'src/subclass_generator.dart';

Builder generateExtension(BuilderOptions options) =>
    SharedPartBuilder([ExtensionGenerator()], 'extension_generator');
Builder generateSubclass(BuilderOptions options) =>
    SharedPartBuilder([SubclassGenerator()], 'subclass_generator');
```
The final step has been accomplished. You are now ready!.
### Conclusion
You now understand how to make a code generator. Even if you never need to construct your own, knowing how they function behind is beneficial. Finally, you have completed all the steps. You are now ready.### Introduction
You can automate these time-consuming tasks using Flutter model code generation so you can focus on what counts. Write the code pattern once and you have a generator which creates code files according to your instructions. 
You'll construct a code generator in this article that locates all of a class's variables, saves them in a map, and then generates getters and setters.
### When code generation can be used?
1. **Boilerplate code for architecture**- Almost every architectural solution includes some boilerplate code, to write it over and over again is tiresome which you may avoid in part by generating the code.
2. **Common features functions**- Functions like fromMap and toMap are used by almost every model type of class.These functionalities can be added to all of the classes in one operation owing to code generation.
3. **Data classes**- These are pretty straightforward classes to build, and you'll probably need a lot of them. As a result, instead of manually writing each one, it's a good idea to create them using the code generator.
### What are annotations and how do we utilize them?
`Annotations` are data classes that offer more information about a code component and allow metadata to be added to code components including classes, methods, and variables.

let's create an annotation subclass first but before that ensure you have created a file in **annotations/lib/src** and named it new_method.dart:
```dart
class ScAnnotation {
  const SubclassAnno();
}
//The global variable generateSubclass is the name given to the annotation that will be used to mark a class for a generator
const generateSubclass = SubclassAnno();
```
Now create another subclass but in a different file which you can similarly name as extended_method.dart:
```dart
class ExtendedAnnotation {
  const ExtendednAnno();
}

const generateExtension = ExtendedAnno();
```
Finally, create another in **lib** and name it annotation.dart:
```dart
library annotations;

export 'src/new_method.dart';
export 'src/extended_method.dart';
```
The next step is now to create the generators.
### A generator's method of generating code.
first using model visitor lets create a file named model_visitor.dart in the lib/src that will find annotated classes and copy the following code:
```dart
import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/visitor.dart';
//The majority of the methods you'll need are already implemented in SimpleElementVisitor.
class ModelVisitor extends SimpleElementVisitor<void> {
  String className;
  final fields = <String, dynamic>{};
  @override
  void visitConstructorElement(ConstructorElement element) {
    final elementReturnType = element.type.returnType.toString();
    className = elementReturnType.replaceFirst('*', '');
  }
  @override
  void visitFieldElement(FieldElement element) {
    final elementType = element.type.toString();
    fields[element.name] = elementType.replaceFirst('*', '');
  }
}
```
### Using a Generator to Create a Subclass
The first generator we create creates a subclass with all of the getters and setters implemented. Create subclass_generator.dart in lib/src and add the following:
```dart
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';
import 'package:annotations/annotations.dart';
import 'model_visitor.dart';
//The generic type parameter ScAnnotation is sent to GeneratorForAnnotation, and this is where you map the generator to the associated annotation.
class SubclassGenerator extends GeneratorForAnnotation<ScAnnotation> {}
@override
String generateForAnnotatedElement(
    Element element, ConstantReader annotation, BuildStep buildStep) {
  final visitor = ModelVisitor();
  element.visitChildren(visitor);
  //create classname for the generated class.
  final className = '${visitor.className}Gen';
  //we use a StringBuffer since we are working with a lot of Strings. 
  final classBuffer = StringBuffer();
  classBuffer.writeln('class $className extends ${visitor.className} {');
  classBuffer.writeln('Map<String, dynamic> variables = {};');
  classBuffer.writeln('$className() {');
  for (final field in visitor.fields.keys) {
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("variables['${variable}'] = super.$field;");
  }
  classBuffer.writeln('}');
  generateGettersAndSetters(visitor, classBuffer);
  classBuffer.writeln('}');
  return classBuffer.toString();
}
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {
for (final field in visitor.fields.keys) {
  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");
  classBuffer
      .writeln('set $variable(${visitor.fields[field]} $variable) {');
  classBuffer.writeln('super.$field = $variable;');
  classBuffer.writeln("variables['$variable'] = $variable;");
  classBuffer.writeln('}');
    }
  }
}
```
### Using a Generator to Create an Extension
As methods of extension, you'll produce the getters and setters for each variable. Now make extension generator.dart in the lib/src directory with the following set of code:
```dart
//Import packages
import 'package:build/src/builder/build_step.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:source_gen/source_gen.dart';
import 'package:annotations/annotations.dart';
import 'model_visitor.dart';
class ExtensionGenerator extends GeneratorForAnnotation<ExtendedAnnotation> {
  @override
  String generateForAnnotatedElement(
      Element element, ConstantReader annotation, BuildStep buildStep) {
  final visitor = ModelVisitor();
  element.visitChildren(visitor);
  final classBuffer = StringBuffer();
  classBuffer.writeln('extension GeneratedModel on ${visitor.className} {');
  classBuffer.writeln('Map<String, dynamic> get variables => {');
  for (final field in visitor.fields.keys) {
    final variable =
        field.startsWith('_') ? field.replaceFirst('_', '') : field;

    classBuffer.writeln("'$variable': $field,"); // EX: 'name': _name,
  }
  classBuffer.writeln('};');
//Again call generateGettersAndSetters
  generateGettersAndSetters(visitor, classBuffer);

  classBuffer.writeln('}');.
  return classBuffer.toString();
  }
}
void generateGettersAndSetters(
      ModelVisitor visitor, StringBuffer classBuffer) {
for (final field in visitor.fields.keys) {

  final variable =
      field.startsWith('_') ? field.replaceFirst('_', '') : field;
 // getter-This writes the getter code
  classBuffer.writeln(
      "${visitor.fields[field]} get $variable => variables['$variable'];");

  classBuffer.writeln(
      'set $variable(${visitor.fields[field]} $variable)');
  classBuffer.writeln('=> $field = $variable;');
  }
}
```
### Using Generators to create Builders.
Being the last step in this article now create builder.dart in lib and add the following set of code:
```dart

import 'package:build/build.dart';
import 'package:source_gen/source_gen.dart';

// import the generators you created above
import 'src/extension_generator.dart';
import 'src/subclass_generator.dart';

Builder generateExtension(BuilderOptions options) =>
    SharedPartBuilder([ExtensionGenerator()], 'extension_generator');
Builder generateSubclass(BuilderOptions options) =>
    SharedPartBuilder([SubclassGenerator()], 'subclass_generator');
```
The final step has been accomplished. You are now ready!.
### Conclusion
You now understand how to make a code generator. Even if you never need to construct your own, knowing how they function behind is beneficial. Finally, you have completed all the steps. You are now ready.

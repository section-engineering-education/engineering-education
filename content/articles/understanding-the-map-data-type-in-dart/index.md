---
layout: engineering-education
status: publish
published: true
url: /understanding-the-map-data-type-in-dart/
title: Understanding the Map Data Type in Dart
description: This article will provide the reader with an insight into Map data type. We will also learn how to manipulate map elements to output specific user requirements.
author: elly-omondi
date: 2021-11-28T00:00:00-12:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-the-map-data-type-in-dart/hero.jpg
    alt: maps Data Type in Dart example image
---
Like most other programming languages Dart also follows similar rules when variables are created in it – allowing each variable to have an associated data type.
<!--more-->
### Table of content
This article will cover:
- [An introduction to Dart and its data types](#An-introduction-to-dart-and-its-data-types)
- [What are maps?](#what-are-maps)
- [The map syntax and declaration](#The-map-syntax-and-declaration)
- [Features of a map](#Features-a-map)
- [How to manipulate map elements](#How-to-manipulate-map-elements)
- [Conclusion](#Conclusion)

### An introduction to Dart and its data types/data structures
This section will first go over what Dart is and its data types. Then, we will explore the map as a data type. [Dart](https://dart.dev/) is an open-source programming language developed by Google and is popular for web & and mobile apps, often client optimized. 

(Client-facing) Dart is an object-oriented, type-safe, and platform-independent language allowing developers to create fast-paced applications and systems. The compiler technology used in Dart lets developers run code on native platforms (mobile and desktop) and web platforms (web apps). 

Some of the built-in and commonly used data types in Dart are: 
- Number 
- Strings 
- Booleans 
- Lists 
- Maps 

Let us get started with Maps! 

### The map syntax and declaration
Dart map is an object store for data in key-value form/pair. Values/items stored in a map can be referenced multiple times within your code and only be retrieved or reached using its associated Key. 

Maps in Dart are similar to dictionaries in Python and accept data of any type for the key and value pairs. (Dynamic collection). A Map is declared in curly braces, with each key-value pair delimited by commas. 

The items contained in a map can be iterated, and the order of iteration of the key-values define which type of map is declared/or are created. Dart maps can be declared using Map Literals or Map Constructors. 

### The common map types include: 

#### HashMap
[HashMap](https://api.flutter.dev/flutter/dart-collection/HashMap-class.html) items are accessible in any order. In addition, values are iterated in the same order as their associated keys, so iterating the keys and values in parallel will give matching Key and value pairs. 

#### LinkedHashMap
Accessing [LinkedHashMap](https://api.flutter.dev/flutter/dart-collection/LinkedHashMap-class.html) items happen in a predictable order. This is because the key-value pairs occur in the order they were inserted. 

#### SplayTreeMap
[SplayTreeMap](https://api.flutter.dev/flutter/dart-collection/SplayTreeMap-class.html) groups elements in a map with the frequency of access each element has.  

### Features of a map
A map has the `Length` property that defines the number of key/value pairs in any map. This property is declared as follows:

```Dart
 int get length 
```

- Has the isEmpty property tied to its operations to define the existence of key/value pairs. This property is declared as follows:

```Dart
 bool get isEmpty. 
```

- This has the Keys property to enumerate all key items in the Dart map. This property is declared as follows: 

```Dart
int get Key.
```

- This has the Values property to enumerate all valuable items in the Dart map. This property is declared as follows: 

```Dart
int get Value. 
```

### Manipulating Map elements
Now that we better understand what a map is, let us look at how we can manipulate Dart map in different scenarios.

#### Determining the size of a map
The length property is used when returning the total number of key-value pairs of elements that constitute a map.

The syntax used for the manipulation is:

```bash
map.length
```

In an instance where we have a map that contains students details, finding the total size of the  map is done as shown below:

```Dart

void main(){
    var student = {'Name':'Adam Doe', 'Email':'doe@gmail.com', 'RegNumber':'B11/6732/2020'};

    print(student.length); //map length
}
```

The expected output will be:

```bash
3
```

![Length](/engineering-education/understanding-the-map-data-type-in-dart/length.png).

The map above contains three key-value pair elements for the student's `name`, the `email`, and the `RegNumber` hence the output 3.

#### Determining key-value existence
To confirm that a key and its correspondent value exist within a defined map, the `containsKey()` method and the `containsValue() method are used.

Example:
```Dart

void main(){
var student = {'Name':'Adam Doe', 'Email':'doe@gmail.com', 'RegNumber':'B11/6732/2020'};
/* To find key existence */
print(student.containsKey('Name'));
print(student.containsKey('Password'));
/* To find value existence */
print(student.containsValue('RashFord'));
print(student.containsKey('doe@gmail.com'));
}
```

![Key](/engineering-education/understanding-the-map-data-type-in-dart/key.png).

The output of the first statement will be `true` because the student's map contains a `Name` key, while the second print statement will return `false` because the `Password` key does not exist.

The third print statement returns `false` because there is no record of `RashFord` as a value. The final print statement returns `true` as `doe@gmail.com` is the email's key value.

#### Inserting pair elements in a Map
Inserting new key-value pairs in a map can be implemented in two ways:

1. Adding values to a Map Literal.

The code below implements the insertion:
```Dart

void main(){
    var student = {'Name':'Adam Doe', 'Email':'doe@gmail.com', 'RegNumber':'B11/6732/2020'};
    student['course'] = 'Bcom';
    print(student);
}

```

Adding an extra pair element of the student course will return a new map that looks like:

```bash

{'Name':'Adam Doe', 'Email':'doe@gmail.com', 'RegNumber':'B11/6732/2020', 'course':'Bcom'}
```
![Insert](/engineering-education/understanding-the-map-data-type-in-dart/insert.png).


#### Adding values through a Map Constructor
This method of inserting new pair elements to a map is through a map constructor and is implemented as below:

```Dart

void main(){
    var student = new Map();
    student['Id'] = '414JK33';
    student['Year'] = 'Third year'
    print(student)

}
```

Output:

```bash

{'Id':'414JK33', 'Year':'Third Year'}
```

![Constructor](/engineering-education/understanding-the-map-data-type-in-dart/constructor.png).

#### Merging Maps
Merging different defined maps will add all the key-value pairs in one map to key-value pairs of another map. This implementation uses the `addAll()` function.

Example:

```Dart

void main(){

    Map cakes = {'A':'Blackforest', 'B':'whiteforest', 'c':'Chocolate'};
    Map colors = {1:'Brown', 2:'Yellow', 3:'Indigo'};
    var newerMap = {
       ...cakes,
       ...colors
    };
  print(newerMap);
}
```

Output:
```bash

{'A':'Blackforest', 'B':'whiteforest', 'c':'Chocolate', 1:'Brown', 2:'Yellow', 3:'Indigo'}
```

![Merging](/engineering-education/understanding-the-map-data-type-in-dart/merging.png).

All the pair elements in the `colors` map are added to those of the `cakes` map, and a new map concatenates all the key values in both maps as in the output.

#### Removing pair elements from a map
To remove some key-value pairs in a map, we use the remove() method. The method is called on the map, and a `key` whose value is to be removed from the map is passed to this method.

Syntax:

```bash
Map.remove(Object Key)
```

The object key passed to the `remove()` function is the entry deleted from the map.

```Dart

void main() {
Map x = {'A':'Blackforest', 'B':'whiteforest', 'C':'Chocolate', 1:'Brown', 
                2:'Yellow', 3:'Indigo'};
x.remove(3);
print(x);
}
```

Output:

```bash

{'A':'Blackforest', 'B':'whiteforest', 'c':'Chocolate', 1:'Brown', 2:'Yellow'}
```

![Deleting](/engineering-education/understanding-the-map-data-type-in-dart/deleting.png).

### Conclusion
In this tutorial, we have learned what maps are in Dart and how to create them. We have also learned how to manipulate map elements to output specific user requirements. Do not forget to test out the constructions in your projects to understand how they work entirely.

Happy coding!

#### Further reading
1. https://api.dart.dev/stable/2.14.4/dart-core/Map-class.html
2. https://www.tutorialspoint.com/dart_programming/dart_programming_map.htm

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)


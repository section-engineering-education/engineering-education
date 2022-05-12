---
layout: engineering-education
status: publish
published: true
url: /caching-logging-typography-in-flutter/
title: Caching, Logging, and Typography in Flutter
description: This tutorial will cover implementing some advanced topics of caching, logging, and Typography with a Flutter application.
author: somtobe-eze
date: 2022-01-17T00:00:00-14:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/caching-logging-typography-in-flutter/hero.jpg
    alt: Caching, Logging and Typography in Flutter Hero Image
---
As a programmer, knowing how to create beautiful applications and deploying them to production is a great thing. Resources are scarce, irrespective of your context, and adequate utilization will benefit all play parties.
<!--more-->
In the case of caching, when our application makes frequent requests/access to the same resource that does not change, it is classified as a waste because no new information (that differs from initial requests/access) has been obtained.

Similarly, knowing what happens when our apps are running is vital for debugging. We want to know if our application behaves in the way it should or in a way it should not. When something breaks, we want to detect what caused it, when it happened, and where it happened to fix the issue causing the malfunction. To achieve this, we make use of logging.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Caching](#caching)
- [Benefits of caching](#benefits-ofccaching)
- [Caching implementation](#caching-implementation)
  - [Step 1](#step-1)
  - [Step 2](#step-2)
  - [Step 3](#step-3)
- [Step 5, Operation, problem, solution](#step-5-operation-problem-solution)
- [Logging](#logging)
- [Typography](#typography)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along the reader should have the following:
- Proficiency in Dart and Flutter programming languages for creating applications.
- Experience with integrating services and functionalities in applications.
- Knowing the various data structures and data types available in the dart programming language will better guide you to developing efficient applications. For more info about the data structures in dart, check out this [website](https://www.tutorialspoint.com/dart_programming/dart_programming_collection.htm).

### Goals
In this tutorial, we will:
- Implement caching into our application codebase.
- Implement logging into our flutter codes.
- Know when to cache our data.
- See the benefits of logging our application.
- Implement typography for our application fonts.

### Caching 
Caching is a mechanism implemented by a system or a system creator that temporarily stores data in available memory. It makes it easier to access and retrieve that information stored. Cache memory is made available for system use in a computer system, and data currently being used by the user while operating the system are sometimes cached.

Caching is implemented by the system's creator, the programmer since he writes the instructions that the computer executes. Caching stores frequently access data, images, and objects where needed, making accessing this information faster.

In a situation where there is an HTTP request made to a server for a stale resource (data that does not change) when a user switches between screens in your application, caching is vital in such situations, which improves the user experience.

Users do not have to wait for data to be fetched every time they switch between the screens. For data that may not be stable, you can give the user the option to refresh the data fetched and update the cached records if new data is present.

### Benefits of caching
- Caching saves resources.
- Caching gives users a better experience.
- Caching makes your application work faster and better.
- It helps you create efficient applications.

### Caching implementation
To show a sample of this, we will perform an HTTP request in our flutter application to fetch data when the user navigates to a new screen where its contents are fetched.

#### Step one: Setting up our application
In your `main.dart` file set up your flutter application to display a button that navigates to a new screen when clicked.

```dart
import 'package:flutter/material.dart';
void main() {
 runApp(const MyApp());
}
class MyApp extends StatelessWidget {
 const MyApp({Key? key}) : super(key: key);
  @override
 Widget build(BuildContext context) {
   return MaterialApp(
     title: 'Caching',
     theme: ThemeData(

       primarySwatch: Colors.blue,
     ),
     Home: Scaffold(
 appBar: AppBar(

   title: Text('Caching'),
 ),
 body: CountriesSelect(),
       );
   );
 }
}
```

We have a basic flutter application setup with an `app bar` with the title caching in the above snippet. It has a `body` and a `container` that has nothing within it.

```dart
class _CountriesSelectState extends State<CountriesSelect> {
 final country = 'USA';

 @override
 Widget build(BuildContext context) {
   return ListTile(
     leading: const Icon(Icons.gps_fixed),
     title: Text(country),
     onTap: () {
       Navigator.push(
           context,
           MaterialPageRoute(
               builder: (context) =>
                   FetchDataScreen(country: country)));
     },
   );
 }
}
```

Next, we will make a widget containing a text titled, USA, the country we want to get more information.

```dart
    onTap: (){
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => FetchDataScreen(country: country)));
    },

```

We specify the screen we wish to navigate to by passing the selected country as a parameter to the named constructor of the `FetchDataScreen` class and navigate there whenever the list is clicked with the help of the `onTap` function property.

Based on the information received from the constructor, we store that in a data field, making it accessible to the class.

#### Step two: Analyzing an inefficient scenario
Next, we will request information about the selected country using the HTTP flutter package and a public rest API repository for country information offered by the [rest country](https://restcountries.com/). 

To achieve this, head on to the HTTP package repo and get the latest installed version. In this case, our is `HTTP: ^0.13.4` and add it to the dependencies in our `pubspec.yaml` file in the root directory of our application.

```yaml
dependencies:
 flutter:
   sdk: flutter
 http: ^0.13.4

```

Above is the section between dependencies and `dev_dependencies` in our flutter application. Once our HTTP package is added, run the code below:

```bash
Flutter pub get
```

This will get the package and add it to our app dependencies.

```dart
class FetchDataScreen extends StatefulWidget {
 final String country;

 const FetchDataScreen({Key? key, required this.country}) : super(key: key);

 @override
 _FetchDataScreenState createState() => _FetchDataScreenState();
}

class _FetchDataScreenState extends State<FetchDataScreen> {
 late String countryName = '';
 late String capital = '';
 late String region = '';
 late int population = 0;
 late String alpha3Code = '';

 Future<void> getCountryInfo(String country) async {
   var url = Uri.https('restcountries.com', '/v2/name/$country');

   // Await the http get response, then decode the json-formatted response.
   var response = await http.get(url);
   if (response.statusCode == 200) {
     var jsonResponse = convert.jsonDecode(response.body);

     setState(() {
       countryName = jsonResponse[0]['name'];
       capital = jsonResponse[0]['capital'];
       region = jsonResponse[0]['region'];
       population = jsonResponse[0]['population'];
       alpha3Code = jsonResponse[0]['alpha3Code'];
     });
     print(jsonResponse);
   } else {
     print('Request failed with status: ${response.statusCode}.');
   }
 }

 @override
 void initState() {
   super.initState();
   getCountryInfo(widget.country);
 }

 @override
 Widget build(BuildContext context) {
   return Scaffold(
     backgroundColor: Colors.white,
     appBar: AppBar(
       title: Text(countryName),
     ),
     body: Container(
       padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
       child: Column(
         children: [
           Row(
             children: [
               const Text("Country Name"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text(countryName)],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Capital"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text(capital)],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Region"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text(region)],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Population"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text('$population')],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Abbr"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text(alpha3Code)],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           RaisedButton(
               onPressed: () {
                 Navigator.push(
                     context,
                     MaterialPageRoute(
                         builder: (context) =>
                             FetchMoreScreen(country: countryName)));
               },
               child: const Text('More'))
         ],
       ),
     ),
   );
 }
}
```

The code above sends a request to the endpoint to obtain the selected countries' information and displays part of the data on the current screen. The button underneath navigates us to a new screen to see more details about the same country.

```dart
RaisedButton(
onPressed: () {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) =>
                FetchMoreScreen(country: countryName)));
},
child: const Text('More'))
```

The new screen, `FetchMoreScreen()`, takes a parameter of the selected country used in an HTTP request. The code for the `fetchMoreScreen` is specified below.

```dart
class FetchMoreScreen extends StatefulWidget {
 final String country;

 const FetchMoreScreen({Key? key, required this.country}) : super(key: key);

 @override
 _FetchMoreScreenState createState() => _FetchMoreScreenState();
}

class _FetchMoreScreenState extends State<FetchMoreScreen> {
 late String subregion = '';
 late List currencies = [];
 late String flag = '';
 late double area = 0;

 Future<void> getCountryInfo(String country) async {
   var url = Uri.https('restcountries.com', '/v2/name/$country');

   // Await the http get response, then decode the json-formatted response.
   var response = await http.get(url);
   if (response.statusCode == 200) {
     var jsonResponse = convert.jsonDecode(response.body);
     setState(() {
       subregion = jsonResponse[0]['subregion'];
       currencies = jsonResponse[0]['currencies'];
       flag = jsonResponse[0]['flags']['png'];
       area = jsonResponse[0]['area'];
     });
     print(flag);
   } else {
     print('Request failed with status: ${response.statusCode}.');
   }
 }

 @override
 void initState() {
   super.initState();
   getCountryInfo(widget.country);
 }

 @override
 Widget build(BuildContext context) {
   return Scaffold(
     backgroundColor: Colors.white,
     appBar: AppBar(
       title: Text(widget.country),
     ),
     body: Container(
       padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
       child: Column(
         children: [
           Row(
             children: [
               const Text("Country Subregion"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text(subregion)],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Currency"),
               const SizedBox(
                 width: 20,
               ),
               Expanded(
                   child: currencies.length > 0
                       ? Text(
                           "${currencies[0]['name'] ?? ''} - ${currencies[0]['symbol'] ?? ''}")
                       : Container())
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Flag"),
               const SizedBox(
                 width: 20,
               ),
               Container(
                 width: 100,
                 child: flag.length > 0
                     ? Image(
                         image: NetworkImage(flag, scale: 1),
                       )
                     : Container(),
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),
           Row(
             children: [
               const Text("Country Area"),
               const SizedBox(
                 width: 20,
               ),
               Wrap(
                 children: [Text('$area')],
               )
             ],
           ),
           const SizedBox(
             height: 20,
           ),

        RaisedButton(
               onPressed: () {
                 Navigator.push(
                     context,
                     MaterialPageRoute(
                         builder: (context) =>
                             FetchDataScreen(country: widget.country )));
               },
               child: const Text(Less))
         ],
       ),
     ),
   );
 }
}
```

The `FetchMoreScreen()` performs its request to the same resource and populates its content with data different from that of the previous screen `FetchDataScreen()`. It also has a button labeled “Less” that navigates the user to the `FetchDataScreen()`. 

Though this may not be the most efficient of examples, it is still sufficient to represent the idea of caching which we are discussing. 

### Step three: Defining the problem with our implementation
If you run the code as it is, you will get a list of the countries listed on the first screen.  Select a country of choice. You will proceed to the next screen, where details about the selected country are fetched from the endpoint. The data takes a while to display, but it renders on the screen once received. 

Clicking the "More" button takes you to the next screen, which similarly sends a request to the database fetching extra details about the country. It also has a button labeled as "Less" that takes you back to the previous screen where you need to fetch the initial few data about the country, which is an irrelevant request. 

The data being fetched every time you switch between screens is not changing. Why send a request for a resource you already have accessed before? This example can occur in any case scenario, though not in the same fashion.

To effect this programmatically, we will set up the fetched data to store the information obtained from the first load in a temporary cache file. Check if the data exists in the temporary cached file. If data exists, use data.

>Note: Do not send a request if data does not exist.

To achieve this, we will import a package from the flutter pub repository path_provider (that gets the path to the directory where your application stores data) and add the package to your pubspec.yaml [path_provider](https://pub.dev/packages/path_provider). 

Add the package to your `pubspec.yaml`.

```yaml
dependencies:
 flutter:
   sdk: flutter
 http: ^0.13.4
 path_provider: ^2.0.8
```

### Step four: Implementation of our solution
Run `flutter pub get` to install the dependency added. Import your `path_provider` package at the top of your file. Edit the `getCountryInfo()` function to effect your caching.

```dart
Future<void> getCountryInfo(String country) async {
 String fileName = 'countryData.json';
 var dir = await getTemporaryDirectory();

 File file = File(dir.path + '/' + fileName);
 if (file.existsSync()) {
   print("Fetching from cache");
   var jsonData = file.readAsStringSync();
   var jsonResponse = convert.jsonDecode(jsonData);

   setState(() {
     countryName = jsonResponse[0]['name'];
     capital = jsonResponse[0]['capital'];
     region = jsonResponse[0]['region'];
     population = jsonResponse[0]['population'];
     alpha3Code = jsonResponse[0]['alpha3Code'];
   });
 } else {
   print("Fetching from API");
   var url = Uri.https('restcountries.com', '/v2/name/$country');
   // Await the http get response, then decode the json-formatted response.
   var response = await http.get(url);
   if (response.statusCode == 200) {

     var jsonResponse = convert.jsonDecode(response.body);
     // saving to cache
     file.writeAsStringSync(response.body, flush: true, mode:FileMode.write );

     setState(() {
       countryName = jsonResponse[0]['name'];
       capital = jsonResponse[0]['capital'];
       region = jsonResponse[0]['region'];
       population = jsonResponse[0]['population'];
       alpha3Code = jsonResponse[0]['alpha3Code'];
     });
   } else {
     print('Request failed with status: ${response.statusCode}.');
   }
 }
}
```

We created a temporary file named “fileName” and the `dart.io` library in the above code.

```dart
 var dir = await getTemporaryDirectory();

Gets the directory in the device’s storage. 

 File file = File(dir.path + '/' + fileName);

Then creates the file in the device storage.

 if (file.existsSync()) {

}else{

} 
```

Using `file.existsSync()` we check if the file exists. If it does, we read from it. Since it is the first time calling the API, we request to fetch the file.

```dart
 // saving to cache
    file.writeAsStringSync(response.body, flush: true, mode:FileMode.write );
```
### Step five: Concluding the caching process
When calling the file for the first time, we use the code snippet above to write our response to the file. Since the response from the HTTP package sending the request is already in JSON format, there is no need to decode it and store it in the database.

If we run our code, we see that on the first click of the country name, we have a logged message saying fetched from API navigating back and forth between screens logs to the terminal the subsequent reads are fetched from the cached file. Our data access is fast, quick and saves resources fetching the same set of data from the endpoint every time the user navigates between screens.

The same approach applies to the `FetchMoreScreeen()`.

### Logging
Logging is tabbing down a record of system operations ranging from data input, processes, and output to the final results. Logging in the context of this tutorial is different from the standard log output that common programming languages make to the terminal (in the case of the dart, `print()`). 

Such logging to the terminal or console that common programming languages have is basic, undescriptive, and sometimes unhelpful during actual application production. They do not give other relevant details such as when the log occurred, what initiated the log. This information is relevant in depicting application operations and also app crashes.

- We will use the flutter package to simulate a logging procedure in flutter.
- Head over to the flutter package, follow the installation step and log in to your application.
- Add the package to your `pubspec.yaml` file as a dependency.

```yaml
dependencies:
 flutter:
   sdk: flutter
 logging: ^1.0.2
```

Import the package into the dart file you intend to use the logger with. In our case, we will have it in the main.dart file and make use of it in our FetchDataScreen() class.
When implementing logger, it is good to create the instantiation of the logger as high in your widget tree as possible. Using our previous codebase, let us implement some logging.

>Note: Create the logger with a unique name to identify the source of the log message.

```dart
final log = Logger(‘MyApp’);
```

`Main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:logging/logging.dart';

class FetchDataScreen extends StatefulWidget {
 final String country;

 FetchDataScreen({
   Key? key,
   required this.country,
 }) : super(key: key);

 @override
 _FetchDataScreenState createState() => _FetchDataScreenState();
}

class _FetchDataScreenState extends State<FetchDataScreen> {
 bool level = false;
 late String countryName = '';
 late String capital = '';
 late String region = '';
 late int population = 0;
 late String alpha3Code = '';
 final log = Logger('MyApp');

 Future<void> getCountryInfo(String country) async {
   String fileName = 'countryData.json';
   var dir = await getTemporaryDirectory();

   File file = File(dir.path + '/' + fileName);
   if (file.existsSync()) {
     log.info("Fetching from cache");
     var jsonData = file.readAsStringSync();
     var jsonResponse = convert.jsonDecode(jsonData);

     setState(() {
       countryName = jsonResponse[0]['name'];
       capital = jsonResponse[0]['capital'];
       region = jsonResponse[0]['region'];
       population = jsonResponse[0]['population'];
       alpha3Code = jsonResponse[0]['alpha3Code'];
     });
   } else {
     log.fine("Fetching from API");
     var url = Uri.https('restcountries.com', '/v2/name/$country');
     // Await the http get response, then decode the json-formatted response.
     var response = await http.get(url);
     if (response.statusCode == 200) {

       var jsonResponse = convert.jsonDecode(response.body);
       // saving to cache
       file.writeAsStringSync(response.body, flush: true, mode:FileMode.write );

       setState(() {
         countryName = jsonResponse[0]['name'];
         capital = jsonResponse[0]['capital'];
         region = jsonResponse[0]['region'];
         population = jsonResponse[0]['population'];
         alpha3Code = jsonResponse[0]['alpha3Code'];
       });
     } else {
       print('Request failed with status: ${response.statusCode}.');
     }
   }
 }

 @override
 void initState() {
   super.initState();
   getCountryInfo(widget.country);
 }

@override
Widget build(BuildContext context) {
	
  // The code to go here is similar to code in the same method in the previous example

}
}
```

Then output basic info and fine message using the methods provided by logging package. 

Below is a list of options, each symbolizing a different grade or level of a log message:
- Level.OFF 
- Level.SHOUT 
- Level.SEVERE
- Level.WARNING
- Level.INFO
- Level.CONFIG
- Level.FINE
- Level.FINER
- Level.FINEST

If we ran the application, we would not receive a response because we are not listening to the log. So in the main method, we implement the root Logger.

```dart
Logger.root.level = Level.ALL; 
Logger.root.onRecord.listen((record) {
  print('${record.loggerName} -
${record.level.name}: ${record.time}: ${record.message}');
});
```

If we run our application, we get the response just as we specified printed out in the console.

```bash
MyApp - FIINE: 2021-12-22 19:37:00.608065: Fetching from API
```

This is great because now we have more information about our logs, but still, but we are still using print to log to the terminal. With most live applications, we can write these logs to a file and store them in memory.

There are other properties provided by the record value return in the listener. You can head over to the logging docs to check or, better still, play around with the information you have access to:
- Loggername - The name specified in the logger instantiation.
- Message - The log message to be displayed.
- Level - The log level, either fine, severe, warning, and many more.
- Error - The error if there is any.
- Time - The time of the logger.
- stackTrace - The stacktrace as it propagates out.
- Zoneobject - The zone of the log.
- sequenceNumber - The sequence number.

Another implementation can be as follows:

```dart
Queue<LogRecord> logs = Queue();

Logger.root.level = Level.All
Logger.root.onRecord.listen((record) {
  print('${record.loggerName} -
${record.level.name}: ${record.time}: ${record.message}');
logs.addLast(record);
while(logs.length > 100) {
	logs.removeFirst();
}
});
```

### Typography
Fonts are essential when creating any application because texts are present within our application. Most applications are 80% text content, so looking and feeling is very important for good application designs.

One way to handle typography styling is by downloading the font you wish to use in the application, mapping your application to access the fonts in the `pubspec.yaml` file and then adding font family to the TextStyle widget. 

In this section we will find out how to implement fonts using the Google font package, which gives us access to a repository of fonts offered by Google.

We install the package by adding it to our `pubspec.yaml` file and then import it into the file we which to make use of it.

```yaml
dependencies:
 flutter:
   sdk: flutter
google_fonts: ^2.1.1
```

We make use of it to via the provided Google font.

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.Montserrat(),
),
```

Alternatively, if we want to load it dynamically, we can use the code below.

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.getFont(‘Montserrat’),
),
```

### Conclusion
In this tutorial, we have learned what caching is, when it is best to cache our data, how to implement a simple caching mechanism, the benefits of caching, and why we need to cache our apps. 

In the second section, we learned how logging in an actual application is done ideally and how to implement logging that contains more details and specifies log levels which the basic logger of every programming language cannot provide.

Happy coding!

### Further reading
For more reference, check out the jasmine docs:
- https://pub.dev/packages/google_fonts
- https://pub.dev/packages/logging
- https://pub.dev/packages/path_provider
- https://pub.dev/packages/flutter_cache_manager
- https://www.youtube.com/watch?v=Bud7XR8crWw
 
Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

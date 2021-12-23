# Caching, Logging and Typography in Flutter


In this tech tutorial, we will learn how to implement some advanced features when coding our mobile application development such as caching and logging. We will also take a look at how to implement typography features for content in our application


![Hero Image for Caching, Logging and Typography in Flutter](./hero.jpg)


### Introduction
As a programmer, knowing how to create beautiful applications and deploy them to production is a great thing, you will be a great developer if you can create efficient applications that are both space and time conscious. Resources as scarce irrespective of the context you place them and adequate utilization will be really beneficial to all parties in play.

In the case of caching, when our application makes frequent requests/access to the same resource that does not change, it is considered a waste because no new progress is made or information different from initial requests/access has been obtained. 

Knowing what is happening in our application when it runs is very vital for debugging. We want to know if our application behaves in the way it should or should not. When something breaks we want to be able to detect what caused it when it happened, and where it happened so we can fix the issue causing our app not to function in the proper manner. To achieve this we make use of logging.


In this tutorial, you’ll:

- Learn how to implement caching in flutter with a typical example, the benefits of caching and why we need to implement caching in spacific operations in our application.

- Application production implemetation of logging. Detailed logger system
- How to implement typography in our application



### Goals
- In this tutorial we will:
- Implement caching into our application codebase
- Implement logging into our flutter codes.
- Know when to cache and how our data 
- See the benefits of logging our application 
- Implement typography for our application fonts



### Prerequisite
This tech tutorial requires that you are handy working with dart and flutter in creating applications, have dealt with integrating services and functionalities in your application, and that you want to make your application run efficiently.
Knowing the various data structures and data types available in the dart programming language will better guide you to developing efficient applications. For more info about the data structures in  dart check out this [website](https://www.tutorialspoint.com/dart_programming/dart_programming_collection.htm) 

 

### Table of Contents

- [Caching, Logging and Typography in Flutter](#caching-logging-and-typography-in-flutter)
    - [Introduction](#introduction)
    - [Goals](#goals)
    - [Prerequisite](#prerequisite)
    - [Table of Contents](#table-of-contents)
    - [Caching](#caching)
    - [Benefits of Caching](#benefits-of-caching)
    - [Caching Implementation](#caching-implementation)
    - [Operation, Problem, Solution](#operation-problem-solution)
    - [Logging](#logging)
    - [Typography](#typography)
    - [Conclusion](#conclusion)
    - [Further reading](#further-reading)



### Caching 
Caching is a mechanism implemented by a system or a system creator that temporarily stores data in available memory such that it makes it easier to access and retrieve that information stored. In a computer system, cache memory is made available for system use and data currently being used by the user will operating the system are sometimes cached. Caching is being implemented by the creator of the system i.e the programmer since he writes the instructions which the computer executes. Caching stores frequently access data, images, and objects near where they are often needed which makes accessing this information faster.

 In a situation where there is an HTTP request made to the server for a resource that is stale,( data that does not change) when a user changes screens in your application, caching is very vital in such situations. It gives your user a better experience when they dont have to wait for data to be fetched every time they switch between screens causing your application to be slow. For data that may not be stable, you can give the user the option to refresh the data fetched and update the cached records if there is new data present

### Benefits of Caching
- Caching save resources 
- Cacheing gives users a better experience
- Caching makes your application work faster and better
- It helps you create efficient applications.


### Caching Implementation
To show a sample of this we will perform an HTTP request in our flutter application to fetch data when the user navigates to a new screen that requires its content to be fetched.

In your main. dart file set up your flutter application to display a button that navigates to a new screen when clicked.


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


In the above snippet, we have a basic flutter application setup that has an app bar with the title Caching. It has a body, Container that has nothing within it.


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

Next, we will make a widget that holds a little labeled USA, the country we want to get more information about. The 


```dart
    onTap: (){
    Navigator.push(context,
        MaterialPageRoute(builder: (context) => FetchDataScreen(country: country)));
    },

```

We specify the screen we wish to go to bypassing in the selected country as a parameter to the named constructor of the FetchDataScreen class and navigate there whenever the list is clicked with the help of the onTap function property of the little widget



Based on the information gotten from the constructor we store that in a data field for the class to make it accessible throughout the application. 

Next, we will make our request for information about the selected country using the HTTP flutter package and a public rest API repository for country information offered by [https://restcountries.com/]. To achieve this head on to the HTTP package repo and get the latest installation version, in this case, our is HTTP: ^0.13.4 and add it to the dependencies in our pubspec.yaml file in the root directory of our application. 

Pubspec.yaml


```dart
dependencies:
 flutter:
   sdk: flutter
 http: ^0.13.4

```

Above is the section between dependencies and dev_dependencies in our flutter application. Once our HTTP package is added run the code below

```dart
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

The above code sends a request to the endpoint to obtain the selected countries’ information and displays part of the data on the current screen.  Below is a button that navigates you to a new screen where we can see more details about the same country. 


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


The new screen, FetchMoreScreen() takes a parameter of the selected country which will be used in an HTTP request in it. The code for the fetchMoreScreen is specified below


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
 
 The FetchMoreScreen() performs its own request to the same resource and populates its content with data different from that of the previous screen FetchDataScreen(). It also has a button labeled “Less” that navigates the user to the FetchDataScreen(). 

Though this may not be the most efficient of codes it is sufficient to represent the idea of caching which we are discussing. 



### Operation, Problem, Solution
Ok if you run the code as it is, you will get as the first screen a list of the countries listed, then selecting a country of choice you will be taken to the next screen where a few details about the selected country is fetched from the endpoint. The data takes a while to display but once it’s gotten it renders on the screen. Clicking the “More” button takes you to the next screen which similarly sends a request to the database fetching extra details about the country. It has a less button that takes you back to the previous screen where you need to fetch the initial few data about the country. This is an irrelevant request. The data being fetched every time you switch between screens is not changing, why send a request for a resource you already have accessed before. This example can occur in any case scenario though not in the exact same fashion. Since we know for users interact with our application that they we most likely access a single screen on multiple occasions the most effective way to make the app efficient is to cache the data the first instance it is fetched.  

So to effect this programmatically what we will do is 
Set up the fetched data to store the information obtained from the first load in a temporary cache file.
Check if the data exists in the temporary cached file if data exists use data and dont send a request if data doesn’t exist then it is the first time accessing the screen go ahead and fetch the data.
To achieve this we will import a package from the flutter pub repository [path_provider](https://pub.dev/packages/path_provider). 
add the package to your pubspec.yaml 

```dart
dependencies:
 flutter:
   sdk: flutter
 http: ^0.13.4
 path_provider: ^2.0.8
```

 run flutter pub get to install the dependency added.

Import your path_provider package at the top of your file

Edit the getCountryInfo() function to effect your caching 



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

In the above code, we created a temporary file named “fileName” and the dart.io library.

```dart
 var dir = await getTemporaryDirectory();

Gets the directory in the device’s storage. 

 File file = File(dir.path + '/' + fileName);

Then creates the file in the device storage.

 if (file.existsSync()) {

}else{

} 
```

Using file.existsSync() we check if the file exists. If it does we read from it otherwise its the first time calling the API so we send our request to fetch the file.

```dart
 // saving to cache
    file.writeAsStringSync(response.body, flush: true, mode:FileMode.write );
```

When calling the file for the first time we use the code snippet above to write our response to the file. Since the response gotten from the HTTP package sending the request is already in JSON format, there’s no need to decode it another store it in the database.

If we run our code we see that on the first click of the country name we have a logged message saying Fetched from API navigating back and forth between screens logs to the terminal the subsequent reads are fetched from the cached file. Our data access is fast, quick and saves resources fetching the same set of data from the endpoint every time the user navigates between screens. 

The same approach can be applied to the FetchMoreScreeen().

### Logging
Logging is the process of tabbing down a record of system operations ranging from data input, processes, data output, down to the final results. Logging in the context of this tutorial is different from the normal log output that regular programming languages make to the terminal (in the case of the dart, print()). Such logging to the terminal or console that regular programming languages make are basic, undescriptive, and sometimes unhelpful during real application production. They do not give other relevant details such as when the log occurred, what initiated the log, these information are relevant in depicting application operations and also app crashes.

To simulate a logging procedure in flutter we will make use of the flutter package 

Head over to the flutter package and follow the step to install and get logging in to your application.

Add the package to your pubspec.yaml file as a dependency



```yaml
dependencies:
 flutter:
   sdk: flutter
 logging: ^1.0.2
```

Import the package into the dart file you intend to make use of the logger. In our case, we will have it in the main.dart file and make use of it in our FetchDataScreen class

When implementing logger it’s good to create the instantiation of the logger as high in your widget tree as possible. Using our previous codebase let us implement some logging.

Create the Logger with a unique name this identify the source of the log message.



```dart
final log = Logger(‘MyApp’);
```



Main.dart
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
	…
}
}
```

In the code above we dont need the implementation part within the build folder. We instantiated our logging using


Then output basin info and fine message using the methods provided by logging package. Below is a list of options each of which symbolizes a different grade or level of a log message. 



- Level.OFF 
- Level.SHOUT 
- Level.SEVERE
- Level.WARNING
- Level.INFO
- Level.CONFIG
- Level.FINE
- Level.FINER
- Level.FINEST

If we run the application we would not get any response because we are not listening to the log


So in the main method, we implement the root Logger

```dart
Logger.root.level = Level.ALL; 
Logger.root.onRecord.listen((record) {
  print('${record.loggerName} -
${record.level.name}: ${record.time}: ${record.message}');
});
```


If we run our application we get the response just as we specified printed out the console

```dart
MyApp - FIINE: 2021-12-22 19:37:00.608065: Fetching from API
```
This is great because now we have more information about our logs, but still, it’s not so great because we are still using print to log to the terminal. What we can do as it is with most live applications is to write these logs to a file and store them in memory. They are other properties provided by the record value return in the listener you can head over to the logging docs to check or better still, play around with the information you have access to.

- Loggername - The name specified in the logger instantiation
- Message - The log message to be displayed
- Level - The level of the log, either fine, severe, warning e.t.c
- Error - The error if there is any
- Time - The time of the logger
- stackTrace - The stacktrace as it propagates out
- Zoneobject - The zone of the log
- sequenceNumber - The sequence number 

Another implementation can be as follows

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
When creating any application, fonts are important to our applications because texts are present within our application. Most applications are made up of 80% text content and so how they look and feel is very important for good application designs. One way to handle typography styling is by downloading the font you wish to use in the application mapping your application to have access to the fonts in the pubspec.yaml file and then adding font family to the TextStyle widget. The way we will discuss in this section will be how to implement fonts using the google font package which gives us access to a repository of fonts offered by Google for our choosing.

We install the package by adding it to our pubspec.yaml file and then import it into the file we which to make use of it.


```yaml
dependencies:
 flutter:
   sdk: flutter
google_fonts: ^2.1.1
```


We make use of it to via the provided google font

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.Montserrat(),
),
```


Or if we want to load it dynamically we can use the code below

```dart
Text(
  'This is Google Fonts',
  style: GoogleFonts.getFont(‘Montserrat’),
),
```




### Conclusion
In this tutorial, you have learned in the first section what caching is, when it’s best to cache our data, how to implement a simple caching mechanism, the benefits of caching, and why we need to cache our apps. In the second section, we learned how logging in a real application is done ideally and how to implement logging that contains more details and specifies log levels which the basic logger of every programming language cannot provide



### Further reading
For more reference check out the jasmine docs:
- https://pub.dev/packages/google_fonts
- https://pub.dev/packages/logging
- https://pub.dev/packages/path_provider
- https://pub.dev/packages/flutter_cache_manager
- https://www.youtube.com/watch?v=Bud7XR8crWw
 


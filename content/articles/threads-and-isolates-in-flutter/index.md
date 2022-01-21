---
layout: engineering-education
status: publish
published: true
url: /threads-and-isolates-in-flutter/
title: Threads and Isolates In Flutter Applications
description: This article will go through the use of Threads and Isolates in Flutter applications
author: waigwa-kanoi
date: 2022-01-21T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/threads-and-isolates-in-flutter/hero.jpg
    alt: Threads and Isolates In Flutter Applications Hero Image
---
Threads and isolates are two essential abstractions you will need to know when developing apps using Flutter.
<!--more-->
Threads and isolates allow developers to utilize multicore processors to improve user experience by reducing UI stuttering and battery consumption on mobile devices.

Threading is an implementation of cooperative, non-preemptive multitasking (software threads) whereas, an Isolate is a thread with an event loop that continuously processes events in its own memory space.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Goals](#goal)
- [Isolates in Flutter](#isolates-in-flutter) 
- [Application Development](#application-development) 
- [Calls](#calls)
- [Conclusion](#conclusion)

### Prerequisites
Before we get started, the reader needs to have:
- [Visual Studio](https://code.visualstudio.com/) or any code editor installed.
- Have a basic understanding of [flutter widgets](https://docs.flutter.dev/development/ui/widgets).
- Familiarity with dart programming languages.
- Basic understanding of developing flutter applications.
 
### Goal
At the end of this tutorial, the reader should better understand threads and isolates and when it is appropriate to use them.

### Isolates in Flutter
You can use isolate together with threads to improve the performance of your application and reduce battery consumption on mobile devices. Isolates are similar to other programming languages' threading concepts, but they have some key differences.

You can use the `Isolate` API to spawn new isolates; you can pass messages between an isolate and its parent thread(s). However, you are not directly accessing shared mutable states from within an isolate.

### Application development 
To demonstrate their usage, we will build a simple counter-demo: An application that starts with an initial value at 0 and allows the user to increment or decrement that value.

The application has a button that will start a new counter. When the corresponding isolate is created, we will store its instance in a variable and pass it through various message handlers to update the current counter value. The instance of the isolated thread is stored in a class member variable called `_isolate`.

Let us get started!

### Step one: Creating states
In this step, we will create a class responsible for the counter. The counter class will contain the createstate method used to create a new state. Finally, the isolate will handle the counter of the app and the changes in our isolates.

A comment starting with // [START isolate] in the following code snippets means an isolated thread is started. A comment beginning with // [END isolate] means the corresponding isolation is terminated.

```dart
/// Flutter Widget to display a counter and increment it.
class Demo extends StatefulWidget {
@ override _DemoState createState ( ) = > _DemoState ( ) ;
} /// Class responsible for the counter business logic
class _DemoState extends State < Demo> { int _counter = 0 ; // [START isolate] 
static MyIsolate _isolate ;
 // [END isolate]
  @ override void initState ( ) { super . initState ( ) ; _isolate = new MyIsolate ( ) . spawnFunction (
  incrementCounter ) ; 
  // [START isolate] 
  setInterval ( updateCounter , 1000 ) ;
   // [END isolate]
  } @ override void dispose ( bool disposing ) {
   super . dispose ( disposing ) ; if ( disposing && _isolate != null ) {
  _isolate . killFunction ( incrementCounter ) ; } // [START isolate] 
  _isolate = null ;
   // [END isolate]
    }
  ```

### Step two: Sending messages through isolate
Next, we will demonstrate how to pass a message from the main thread through an isolate and back. The purpose of this is to allow updates to isolated data without breaking the isolate's encapsulation.

```dart
  void incrementCounter(MyMessage msg) { // [START isolate] 
  _isolate . send ( new IncrementCounter ( currentCounter :
  _counter + 1 ) ) ; 
  // [END isolate]
   }
    /// Sends a message to update the counter. 
    void incrementCounter ( int delta ) {
  // [START isolate]
  _isolate . send ( new IncrementCounter ( currentCounter : _counter + delta ) ) ;
   // [END isolate] 
   }
  /// Sends a message to update the counter. 
  void incrementCounter ( MyMessage msg ) { // [START isolate]
   _isolate . send ( new IncrementCounter ( currentCounter : _counter + 1 , message : msg ) ) ; 
   // [END isolate] 
   }
```

### Step three: Passing parameters between threads
This step will cover passing a parameter from the `main` thread to the `isolate` thread.

>Note: Notice that this argument must be serializable. It is impossible to send `Future s` or `Stream s` across an isolated boundary.

If you want to pass a `Future` along, see the next section.

```dart
  void incrementCounter(int delta, bool start) { 
    // [START isolate] 
  _isolate . send ( new IncrementCounter (
  currentCounter : _counter + delta , isStarting : start ) ) ; 
  // [END isolate]
   } 
   /// Sends a message to update the
  counter with a value of newValue and /// with isStarting set to true if the start parameter is non-null. 
  void  incrementCounter ( MyMessage msg , bool start ) { // [START isolate] 
  _isolate . send ( new IncrementCounter (
  currentCounter : _counter + 1 , message : msg , isStarting : start ) ) ; 
  // [END isolate]
   } /// Sends a message to  update the counter with a value of newValue and /// with isStarting set to true if start parameter is non-null. void
  incrementCounter ( MyMessage msg , int newValue , bool start ) { 
    // [START isolate] 
  _isolate . send ( new
  IncrementCounter ( currentCounter : _counter + newValue , isStarting : start ) ) ; 
  // [END isolate] }
```
  
### Step 4 - Serialization of messages
The isolate can also pass messages through to the `main` thread. These messages must be Serializable. If you want an event back from the isolated class, see responding to messages and events.

```dart
  void incrementCounter() { 
    // [START isolate] 
    _isolate . send ( new IncrementCounterCallback ( ) { 
      void onMessage ( MyMessage msg ) { 
        if ( msg . type == 0 && msg . data != null && msg . data is int i ) { 
    // [START isolate]
    update counter with the parameter from the main thread _counter = ( int ) msg . data ;
    // [END isolate] 
    } else if ( msg . type == 1 && msg . data != null && msg . data is MyMessage m ) { 
      // [START isolate] 
    update counter with the parameter from the main thread _counter += ( int ) m . data ; 
    // [END isolate]
     }
      }
       }
        ) ; 
        // [END isolate]
     } /// Sends a message
  to update the counter. void incrementCounter ( IncrementCounterCallback callback ) { 
    // [START isolate] _isolate .
  send ( new IncrementCounterProviderFunction ( callback : callback . onMessage , messageType : 0 , dataType : 1 ) ) ;
  // [END isolate] 
  } /// Sends a message to update the counter. 
  void incrementCounter ( IncrementCounterCallback
  callback ) { 
    // [START isolate] 
    _isolate . send ( new IncrementCounterProviderFunction ( callback : callback .
  onMessage , messageType : 0 ) ) ; 
  // [END isolate] 
  } 
  /// Adds a function that can be called from the main thread. 
  void incrementCounter ( IncrementCounterProviderFunction callback ) { 
    // [START isolate] 
    _isolate . send ( new
  IncrementCounterProviderFunction ( onMessage : callback . onMessage , messageType : 0 , dataType : 1 ) ) ; 
  // [END  isolate] 
  }
```
  
### Step five: Provider function that returns non - serializable
We also provide a particular type of function called a `ProviderFunction`. A `ProviderFunction` can be called from the main thread. It returns a non - serializable value to the main thread, which is helpful for cases where you want to return an object or data not serialized by default (for example, a std::shared_ptr).

Here is an example:
  
```dart
 /// Sends a message to update the counter with a value of newValue and /// with isStarting set to true if start
 the parameter is non-null.
  void incrementCounter ( MyMessage msg , int newValue , bool start ) { // [START isolate] 
  _isolate . send ( new   IncrementCounterProviderFunction ( callback : msg . onMessage , messageType : 0 , dataType : 1 ) ) ; 
  // [END isolate]
  } 
  /// Sends a message to update the counter. 
  void incrementCounter ( MyMessage msg , bool start ) { 
    // [START isolate]
  _isolate . send ( new IncrementCounterProviderFunction ( callback : msg . onMessage , messageType : 0 ) ) ; 
  // [END   isolate] 
  } /// Sends a message to update the counter. 
  void incrementCounter ( MyMessage msg , int newValue ) { //  [START isolate] 
  _isolate . send ( new IncrementCounterProviderFunction ( callback : msg . onMessage , messageType : 0
  , dataType : 1 ) ) ; 
  // [END isolate] 
  } 
  /// Increments the counter. 
  void incrementCounter ( MyMessage msg , int
  newValue = 32 ) { // [START main] 
  _counter += newValue return IncrementCounterProviderFunction ( callback : this .onUpdate , messageType : 0 , dataType : 1 , newValue : newValue ) ; } /// Increments the counter. 
  void incrementCounter ( MyMessage msg , int newValue = 32 ) { 
    // [START main] 
  _counter += newValue return
  IncrementCounterProviderFunction ( callback : this . onUpdate , messageType : 0 , dataType : 1 ) ; }
```
  
This makes it easier to encapsulate and group standard callback functions instead of having one function for each different combination of parameters. 

>Note:  The `IncrementCounterProviderFunction`(or ProviderFunction) is a utility  the function provided by `NGMessageComposeViewController`, not the isolate. However, we provide this convenient method to simplify the code to allow the developer to write less boilerplate code.

### Calls
Here is an example of how you might call this from objective C:
  
```dart
@interface ViewController: 
  UIViewController < UITableViewDataSource, 
  UITableViewDelegate> 
@property(strong, nonatomic)
  NSMutableArray * idsToUpdate;
@end /// Sends a message to update the counter. 
-( void ) sendUpdateCounter : ( int ) count callback : (
  IncrementCounterCallback ) 
  callback { // [START isolate] 
  _isolate . send (UITableViewDelegate,  NGMessageComposeViewControllerDelegate> { 
    @public id<IncrementCounterProviderFunction>
    _incrementCounterCallback; id
  <IncrementCounterCallback> 
  _incrementCounterCallbackWithMessageTypeAndDataTypes; } 
 @end
```

Here is an example of how you can call this from swift:

```swift
/// Sends a message to update the value. func incrementValue () -> IncrementValueProvider { return
IncrementValueProvider( callback : self.onIncrementValue, messageType: 0, dataType: 1 ) } /// Increments the
value by a given amount. func incrementBy (amount: Int) { // [START isolate] let provider =
IncrementValueProvider( callback: self.onUpdate, messageType: 0,Thread and Isolate in flutter.
```

To see more of the implementation or view the above Reachout via [my GitHub profile](https://github.com/waigwakanoi/).

### Conclusion
The reality is that you can use threads in Flutter to help you with the performance of your application. However, since you are using Dart, you cannot do it directly inside a widget; instead, you need to create an isolate. 

You also have different options available if you do not want any threading or if you want some threading, you can use the isolate. The idea is that you will create a new thread that will run in parallel with your main application code. It would be best to keep in mind that you cannot share any state between both threads but instead, you have to communicate by messaging or passing data through channels.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

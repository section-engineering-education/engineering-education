Thread and Isolate in flutter.
### Introduction
Threads and isolates are two of the most important abstractions that you will need to know when developing apps in Flutter. They allow developers to take advantage of multicore processors, improve user experience by reducing UI stuttering, and reduce battery consumption on mobile devices. 
### Topics to handle
This article describes how to use the Dart Thread and Isolate classes in your Flutter application.The goal is to give
you a deeper understanding of what they are, and when it is appropriate to use them.

### Prerequisites
- Visual studio or any code editor installed.
- Have an Understanding of Flutter Widgets.
- Familiar with dart programming languages.
- Have knowledge on coding flutter apps. 


### Isolates in Flutter: 
You can use isolates together with threads to improve the performance of your application and reduce battery consumption on mobile devices. Isolates are similar to other programming languages’ threading concepts, but they have a few key differences:  you can use the Isolate API to spawn new isolates, you can pass messages between an isolate and its parent thread(s), you are not able to directly access shared mutable state from within an isolate.


To demonstrate their usage we will build a simple counter demo: An application that starts with an initial value at 0
and allows the user to increment or decrement that value.

The application has a button that will start a new counter.When the corresponding Isolate is created, we store its
instance in a variable and pass it through various message handlers to update the current counter value.The instance of
the isolate thread is stored in a class member variable called _isolate.

- In the following code snippets a comment starting with // [START isolate] means that an isolate thread is started. A
comment starting with // [END isolate] means the corresponding isolation is terminated.

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


  - In the following example we demonstrate how to pass a message from the main thread, through an Isolate and back.The
  purpose of this is to allow updates to isolated data without breaking the Isolate 's encapsulation.


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


  - Here,
  we show how to pass a parameter from the main thread to the Isolate thread.Notice that this argument must be
  Serializable.It is not possible to send Future s or Stream s across an Isolate boundary.If you do want to pass a
  Future along,
  see the next section.

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


  - The Isolate can also pass messages through to the main thread.These messages must be Serializable.If you want an event
  back from the isolated class, see Responding To Messages And Events.


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


  We also provide a special type of function called a ProviderFunction.A ProviderFunction can be called from the main
  thread, and it returns a non - Serializable value to the main thread.This is useful for cases where you want to
  return an object or data which is not serialized by
  default (
  for example, a std::shared_ptr).

  Here is an example:
  ```dart
  /// Sends a message to update the counter with a value of newValue and /// with isStarting set to true if start
  parameter is non-null.

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
  This makes it easier to encapsulate and group together common callback functions, as opposed to having one
  function
  for each different combination of parameters.

  Note:
  The IncrementCounterProviderFunction(or ProviderFunction) is a utility
  function provided by NGMessageComposeViewController, not the Isolate.To simplify the code however, we provide this
  convenience method as it allows the developer to write less boilerplate code.

  Here is an example of how you might call this from Objective - C:
```dart
  @interface ViewController: UIViewController < UITableViewDataSource, UITableViewDelegate> @property(strong, nonatomic)
    NSMutableArray * idsToUpdate;
    @end /// Sends a message to update the counter. 
    -( void ) sendUpdateCounter : ( int ) count callback : (
    IncrementCounterCallback ) callback { // [START isolate] 
    _isolate . send (UITableViewDelegate,  NGMessageComposeViewControllerDelegate> { @public id<IncrementCounterProviderFunction> _incrementCounterCallback; id
      <IncrementCounterCallback> _incrementCounterCallbackWithMessageTypeAndDataTypes; } @end
```
Here is an example of how you can call this from Swift:
```swift
        /// Sends a message to update the value. func incrementValue () -> IncrementValueProvider { return
        IncrementValueProvider( callback : self.onIncrementValue, messageType: 0, dataType: 1 ) } /// Increments the
        value by a given amount. func incrementBy (amount: Int) { // [START isolate] let provider =
        IncrementValueProvider( callback: self.onUpdate, messageType: 0,Thread and Isolate in flutter.

```

### Conclusion
The reality is you can use threads in Flutter to help you with the performance of your application. Since you are using Dart, you cannot do it directly inside a widget but instead you need to create an Isolate . You also have different options available if you don’t want any threading at all or if you want some threading you can make use of the Isolate . The idea is you are going to create a new thread which will run in parallel with your main application code. You need to keep in mind that you cannot share any state between both threads but instead you have to communicate by messaging or passing data through channels .



Happy coding geeks!!!!

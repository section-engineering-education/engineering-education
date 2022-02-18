
In this article, we are going to develop a new app to illustrate how to send SMS in flutter using Twilio.
#### Introduction

Flutter is an open source mobile UI framework to build native apps for iOS and Android from a single codebase. It is very powerful if we compare it with react-native or any other cross platform frameworks. One of the main point of flutter app development is, it uses widgets instead views to build the UI. So, the main advantage of flutter is that we can use all widgets like Image,Textbox,Button etc., which are available in Android and iOS platform. Now let's discuss how to send SMS using this Cross Platform Framework.
### Table of content
- Introduction
- App description
- Key Takeaways 
- Project Break Down
	1. The model class to hold the SMS data
	2. Home Page Widget
	3. Material App Widget 
	4. The build method
- Business Logic and Twilio
   - Step1 . The Twilio package.
   - Step2. Required permissions.
   - Step3 . Sending SMS with update list data.
   - Step4. Sending SMS from the Database.
   - Step5. Processing SMS received method.
   - Step6. Sending messages to user with Twilio:
 - Conclusion
### Prerequisites 
- Understand how to code flutter widgets.
- Have a code editor installed.
- Understand how to add dependencies and run flutter applications. 
### App description:

We are going to develop a simple app that allows users to input mobile numbers then input shortcodes. After inputting the shortcodes , users can send SMS thru the flutter app. Also, all the SMS will be logged in listview so the user could read it later on. The downloaded source code comes with an Android and ios version.

#### Key takeaways

-   Definition of twillio.
-   Application of Twillio in flutter.
-   Implementation of Twilio in flutter application
-   Build a simple application to illustrate Twillio. 
### Project Breakdown
In this post we are going to use flutter alpha.
The next step is typical for every flutter project. We need a MaterialApp as a root widget, which will be our app's entry point. In this way, we can add a HomePage widget which will be our main screen. It also contains a Scaffold widget that will help us to prepare the layout for the listview and text field.

I usually use IntelliJ Idea as my primary IDE choice, so I'll show you how to do it in IntelliJ. You can do it in other tools like Android Studio or Visual Studio Code. Which are also free and good choices for Flutter development.
I'll show you the main parts of this project:
1- The model class to hold the SMS data
2- Home Page Widget
3- Material App Widget 
4- the build method

### Part1- The model class to hold the SMS data:
Create an empty Flutter project in your editor using the command pallete or type this command in your terminal.
```dart
flutter create 'name of your project'
```
Create a new dart file and copy this code:
```dart
class Msg {
	String from;
	String text;
	String date;
  }
final List messages = <Msg>[];
  Map get messages => messages.toMap();
```
The idea here is to store a list of msg objects and use a Map so we could get them by id.

Finally, declare the model class at the beginning of the main.dart file:

```dart
  @visibleForTesting class Model { }
```
### Part2- The HomePage Widget:
This part contains the widgets we need for our application and the design that our application will look like.
```dart

return new Scaffold( 
	body: 
		new Center(
		 child: 
		  new Column( crossAxisAlignment: CrossAxisAlignment.start,
		   children: <Widget>[
		    new TextField( onChanged: (String text) {
		      _controller.text = text; navigator.push(new MaterialPageRoute<dynamic>(
		      child: new ListView.builder( itemCount: messages.length, itemBuilder: (context, index) { 
			      var text = messages [index].text;
			        return new ListTile( 
                leading: new CircleAvatar(child: new Text(text)),
			          title: new Text("$index")
         ); 
        }
       );
			}, // placeholder for the input field. Empty if no messages
      
			placeholder: "Enter a shortcode",
			 ), 
			 // Container for the listview.
			  new ListView.builder( itemCount: messages.length, itemBuilder: (context, index) { 
			    return new ListTile( leading: new CircleAvatar(child: new Text("$index")),
			  title: new Text("$index")); 
			 }
		), // The Flutter logo.
		 new Image.network( "https://flutter.io/images/homepage/header-illustration-landscape.png"), ], );

```

### Part3- MaterialApp Widget:
This widget holds our homepage and color scheme of the app. 
```dart

return new MaterialApp(
 title: "Flutter Demo",
 theme: new ThemeData( color: Colors.white, accentColor: const Color(0xFFE5BF35), ),
  home: new HomePage(),
   );
```

### Part4- The build method:
This is just a simple build method for our application.
```dart
return new Material(
	 child: new Container( height: MediaQuery.of(context).size.height,
        child: new FlutterLogo(width: 150.0, height: 100.0), ), );
```

Finally, wire up the code with our model class and main() method of course.

### Business Logic and Twilio
The final project is in the last section of this blog post.
Now let's write some business logic behind our application with Flutter SDK: This code below shows what we mean by business logic.
```dart
@override Widget build(BuildContext context) { 
return new MaterialApp(
 title: "Flutter Demo",
 theme: new ThemeData( color: Colors.white, accentColor: const Color(0xFFE5BF35), ),
  home: new HomePage(),
 );
```
The business logic in Flutter can be written in different ways, such as:
```dart
Widget build(BuildContext context) {
 return new Scaffold(
  body: Material (
    child: Center (
      child: FlutterLogo ( width: 150.0, height: 100.0), ),
     )
     );
return new Center(
  child: FlutterLogo ( width: 150.0, height: 100.0),
);
```

We will use a functional widget to define the text input field. A button also to open a full-screen view with a list of messages that we can read or delete then save our changes.

The business logic with the list data are defined in a different widget. Then we can use that same functional view to check whether our list of messages is saved or not.

This is better than using a stateful/stateless widget. Changing back and forth between stateful and stateless views break the user experience.
### Step1 . The Twilio package:

```dart

final TextEditingController controller = new TextEditingController();
```
Up next, we will start with the most exciting part which is sending and reading SMS messages.

First, import the Twilio package and create a class to control scope permissions.

We will need to add the required permissions before we can use the Twilio package to add send and receive SMS.

### Step2. Required permissions:
```dart
// Insert your Twilio SID and TOKEN here, check Twilio website for more information.
auth = new AuthenticationProvider( environment, new ClientCredentialsProvider( environment, "ACXXXXXX", "kLQGJ3YBcvqHVjbDaO..."), );
  this.twilio = new Twilio(auth);
```
Next, we will define the constructor that will receive the SMS received text, which is saved to a string.
Then using that string we will send an update to all the current messages in our database.

### Step3 . Sending SMS with update list data:

```dart
  List<String> _messageList = new List(); // Add Twilio dependency for sending sms messages.  
  List<String> messagesToSend = _messageList.map((x) => new
  String msg = x.replace(" ", "").toLowerCase(); // Add Twilio dependency for sending sms messages.
```

Up next, we will define a new method to send SMS with our Database's current list of messages.

### Step4. Sending SMS from the Database:

```dart
String message = ""; // Add Twilio dependency for sending sms messages.
  _messageList.forEach((x) =>
{ 
  welcomeMsg.post(message);
 }
 );
```

In the previous step, we defined a message that will be sent from our SMS controller. I have called this method to send SMS. Now let's proceed with sending an update to all the list data from our database. This is after typing a new text and pressing submit button.
```dart
String msg = x.replace(" ", "").toLowerCase(); // Add Twilio dependency for sending sms messages.
  message = msg + " : new update from database, now there are "+_messageList.length+" messages"; // Add Twilio dependency for sending sms messages.
```
After typing a new SMS text and pressing the button. Our controller will receive the text and send an update to all messages in our database.
The last step is to process the SMS received method. In this case, we will use that string message to save it in our database. Then send a reply back with a confirmation message. Confirmation message states if message was sent  successfully or a failure. It's also a notification if the data could not be saved.

### Step5. Processing SMS received method:

```dart
String msg = x.replace(" ", "").toLowerCase(); // Add Twilio dependency for sending sms messages.
  message = msg + " : new update from database, now there are "+_messageList.length+" messages"; // Add Twilio dependency for sending sms messages.
  _messageList.forEach((x) =>
{
  welcomeMsg.post(message);
  }
);

```
### Step6. Sending messages to user with Twilio:

Last step, we will actually send the messages to the user that is sending SMS to our Twilio number.
Finally, we will clear the input field on send button click. Then show some feedback message if the reply was successful or failure notification.
Sending SMS with update list data
` List<String> _mes` can send SMS with current list data from the Database to any number using the Twilio service. We will put one more screen just to show the final look of our application before testing it.

```dart

  sageList = new List(); // Add Twilio dependency for sending sms messages.
  List<String> messagesToSend =String msg = x.replace(" ", "").toLowerCase(); // Add Twilio dependency for sending sms messages.
```
Finally we come to the end of our article incase of any query feel free to reach out. 
### Conclusion

Now we have a working app that will send SMS with current list data from the Database. Then sends to any number using the Twilio service.

Hope you all enjoyed this article. I tried my best to explain every step. If you have any confusion or question, please ask me in the comment section below.

Thanks for reading!

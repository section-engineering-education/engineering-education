### Introduction 
In this tutorial, we will learn how to send SMS from our Flutter apps. 
There's a new trend on how to develop and test mobile apps and that is by using a cross-platform development tool that has a lot of features and tools that will help us speed up mobile development.

We'll work with one of the tools called "Flutter" which is a mobile app SDK for building high-performance, high-fidelity, apps for iOS and Android from a single codebase.

Flutter uses the Dart programming language, which is an object-oriented, class defined, structured, general-purpose programming language and was developed by Google. However, Flutter developers claim that we can use 70~80% of all existing code written for "normal" Android & iOS apps.

In this tutorial we will create a simple app that will have a single button on it which once clicked, will send an SMS to one of our pre-defined phone numbers.
### prerequisites
To achieve this simple task we're going to use the following tools:

* Dart programming language

* Flutter SDK - for building our apps

* An editor to write our code (in this case I'm using Webstorm)

* Twilio Programmable SMS service - which will provide us with a phone number capable of sending SMS messages.

### Steps to follow

Let's start with our simple Flutter App.

1. Our Flutter App

As you can see, I've chosen to start this tutorial by creating a very simple app that will have only one button on it for sending an SMS message and that is all. This will be our starting point:


So let's define our first Widget.

1. Our Widgets (1) - Phone Number Text Box & Button

We're starting with two Widgets, one <TextBox/> which will hold the phone number of the receiver, and one <Button/> widget to click on so that the SMS will be sent.

This is how they look like:
```dart
<!-- ./lib/main.dart-->    
 class MyApp extends StatelessWidget { 
    @override Widget build(BuildContext context) {  
        return MaterialApp(        
          title: 'Flutter Demo',
          home: Scaffold(        
            appBar: AppBar(        
              title: Text('Flutter Demo'),        
              ),          
              body: Center(          
                child: Column(          
                  mainAxisAlignment: MainAxisAlignment.center,          
                  children: <Widget>[          
                    Text( 'Sending SMS with Twilio',        
                    style: Theme.of(context).textTheme.title,         
                     ),          
                     SizedBox(height: 15.0,idth: 20.0,),          
                     Padding(top: EdgeInsets.all(5.0),            
                     bottom: 20.0,),          
                     TextField(id: phoneNumber,hintText: 'Enter a phone number to send an SMS to',           textAlignment: TextAlignment.center,),
                     SizedBox(height: 20.0, width: 20.0,),          
                     RaisedButton(onPressed: sendSMSMessage,
                     child: Text('Send'),
                     validator: (text) {          
                       return text.length > 3;
                       },
                       color: Colors.blue,textColor: Colors.white,elevation: 7.0,)]>
                      ),}}}
```
The code snippet above shows our first two widgets, the <TextBox/> used to collect the phone number and the <Button/> for sending an SMS message to it.

1. Our Widgets (2)- The App Bar & Initial Attribute Values

Our previous widgets are placed in an app bar like this:
```dart
appBar: AppBar(
//We want to center both of them vertically and horizontally. This is how we achieve that:
        body: Center(          
          child: Column(      
            mainAxisAlignment: MainAxisAlignment.center,      
            children: <Widget>[       
              Text('Sending SMS with Twilio',style: Theme.of(context).textTheme.title,),      
              SizedBox(height: 15.0,width: 20.0,),      
              Padding(top: EdgeInsets.all(5.0),bottom: 20.0,),          
              TextField(id: phoneNumber,hintText: 'Enter a phone number to send an SMS to',
              textAlignment: TextAlignment.center,          
              ),
        SizedBox(height: 20.0,width: 20.0,),        
        RaisedButton(onPressed: sendSMSMessage,        
        child: Text('Send'),       
        validator: (text) {          
          return text.length > 3;},        
          color: Colors.blue,textColor: Colors.white,elevation: 7.0,
```
1. Our Widgets (3)- The Custom Method

Our widgets are now ready to send an SMS message to the receiver of our choice but there is one more thing we need to do, create a custom method for sending SMS messages.

We did that with this code:
```dart
class Demo extends StatelessWidget { //This is the constructor of our widget 
@override 
Widget build(BuildContext context) {      
  return MaterialApp(title: 'Flutter Demo',
  theme: ThemeData(primarySwatch: Colors.blue),      
  home: DemoPage(),
  ); } }

void sendSMSMessage() {//We create an instance of our TwilioClient class        
final TwilioRestClient client = new TwilioRestClient(const Twilio.Api.Helpers.ENDPOINT_NUMBER);//we get the phone number of our sender (the one who is sent an SMS)    
final String smsNumber = phoneNumber.text; //we get the phone number which will receive the SMS message    
final String smsNumber2 = '+639178xxxxxxx';client.sendMessage(new Message{from = smsNumber,to = smsNumber2,          body = 'This is an SMS sent by Flutter',},
      onSucceeded: (message) { 
        print('Just sent an SMS message to $smsNumber2!');
        }); }
```
We created a class that will hold our custom method. We also declare 2 String variables, one is the phone number of our sender and the other the receiver.
```dart
Client client = new Client(YOUR_ENDPOINT);
```
Our custom method is called sendSMSMessage and inside it, we do the following things:

We create an instance of our TwilioClient class. We get the phone number of our sender (the one who is sent an SMS) and we get the phone number that will receive the SMS message. We use TwilioClient to send a new Message. We added onSucceeded block which will print 'Just sent an SMS message to XXXX!' where XXXX is the phone number of our receiver.

1. Our Widgets (4) - The main method

The final part of our widgets are this main method:
```dart
void main() => runApp(MyApp());
   Widget build(BuildContext context) {      
     return MaterialApp(title: 'Flutter Demo',      
     theme: ThemeData(primarySwatch: Colors.blue,),      
     home: DemoPage(),); }
```
What we are doing here is creating an instance of our app and this way, start the execution of our main method.

1. Our App Flutter class

Our final step is to create a class that extends StatelessWidget or implements BuildContextProvider, this will serve as the root of all components in our app.
```dart
class MyApp extends StatelessWidget implements BuildContextProvider {  //This is the constructor of our class 
@override  
Widget build(BuildContext context) {      
  return MaterialApp(title: 'Flutter Demo',      
  theme: ThemeData(primarySwatch: Colors.blue,),      
  home: DemoPage(),        ); }

  //This method is called by our app's main method, the execution of this method will start from here  
  @override  
  Widget build(BuildContext context) {
     return MaterialApp(   
       title: 'Flutter Demo', theme: ThemeData( primarySwatch: Colors.blue, ),
       home: DemoPage(),
       );}
```
We created a class named MyApp which will hold the majority of our widgets. This is the root widget of our app and all other widgets in this app will be direct children of MyApp. We also implement BuildContextProvider to make MyApp the root of all components in our app.

1.     Our Widget DemoPage

Our main method will call this widget which is also a StatefulWidget. This class extends StatefulWidget because our page will request data from API. We had to create 2 variables inside its constructor: one for API endpoint and another for the keys on Firebase Database. We will use them later in our widget's code.
```dart
class DemoPage extends StatefulWidget {    
   _DemoPageState createState() => new _DemoPageState();  //This is where we create an instance of our class
     @override        
     Widget build(BuildContext context) {      
       return Scaffold(
         appBar: AppBar(
         title: Text('Flutter Demo'),          
         actions: <Widget>[IconButton(icon: Icon(Icons.send),//This is the icon for sending an SMS        
         onPressed: (() { //This is the method of our class which will send an SMS          
         Text('Just sent an SMS message to xxxx!');
         })],),      
         body: Center(     
           child: RaisedButton(      
             child: Column(     
               mainAxisAlignment: MainAxisAlignment.center,      
               children: <Widget>[ Text('Send SMS'),Text(': ',       
               style: Theme.of(context).textTheme.display1), Icon(Icons.send),
               ],),),));}}
```
In this class, we have an instance of our class named _DemoPageState. This one is a StatefulWidget because this page will request data from the API while it is active.

1.      Our Widget - _DemoPageState

This widget has three methods: onPressed, didUpdateAppInfo, and getInitialQuery. It also extends State<StatefulWidget> . The build method will be covered in the next section.
```dart
class _DemoPageState extends State<DemoPage> {  //Initialization of our class        
@override      
void initState() {super.initState();
getInitialQuery().then((query) { //This method gets the current query from our Firebase Database             
this.appInfo = new AppInfo(                                      
  firebaseAuth: auth,                                 
  appSecret: defaults['firebase_database']['secret'],                                 
  name: query['app_name'],                                
  id: query['id']});      
  } //This method gets executed after initState        
  @override        
  void didUpdateAppInfo(AppInfo oldApp) {//Renewal of our Firebase Token (this will send user information to Firebase)    
  this.auth = firebaseAuth;//Renewal of our Firebase Database with the new token        
  this.updateAppInfo();
  }  //This method gets executed when user presses Send Button        
  void onPressed() {     
    _getSMS(new List<String>() {{add('+xxxxxx');}}); 
    }  //This method gets executed to get the list of SMS        
    void _getSMS(List<String> sms){ //requesting data from API endpoint        
    Promise promise = this.appInfo.api_req().then((response) {
      String jsonResult = response['items'][0]['message'];
      List<Map> listOfMessages = JSON.decode(jsonResult);        
    _renderSMS(listOfMessages);  }); 
    } //This method gets executed when user presses the Clear Button (this will clear textarea)    
    void _clearSMS(){        
      this.sms_val().setValue(""); 
      }}
```
1.      Our Widget - _DemoPage

This is the stateless widget that will display our data in a ListView, it has two buttons (Clear and Send) and a text area to store the SMS (named sms_val ).
```dart
class _DemoPage extends StatelessWidget {  //Initialization of our class    @override     Widget build(BuildContext context) {     return MaterialApp(      locale: 'en',      theme: ThemeData(         primarySwatch: Colors.blue,         ),      home: DemoPage(),      ); } }
```
1.      Our Widget - _DemoPageStatelessWidget

This class will provide our app with an update of the number of smses sent upon receiving an SMS (which is done by the method onPressed at line 69). It has two buttons that will display our data on/_DemoPage and a text area to store the SMS.
```dart
class DemoPageStatelessWidget extends StatelessWidget { //Initialization of our class    
@override     
Widget build(BuildContext context) {     
   return Scaffold(       
     body: Center(           
       child: Column(        
         mainAxisAlignment: MainAxisAlignment.center,        
         children: <Widget>[            
           Text("You have sent "+count_sms+" SMS to "+recipient,       
           style: TextStyle(fontSize: 22.0),),    
           Builder(      
             _onPressed: (() {              
               count_sms = count_sms + 1;   //incrementing the counter of SMS sent in our Firebase Database            
               this.updateSMS();       
                }),                   
                Text("s", style: TextStyle(fontSize: 18.0), ),      
                count_sms,//displaying counter of SMS sent in our Firebase Database         
                SwatchColor.fromRGBO(90, 90, 90),        
                SwatchColor.fromRGBO(90, 90, 90),null ],),            
                SizedBox(height: 10.0),        
                Column(       
                  mainAxisAlignment: MainAxisAlignment.center,          
                  children: <Widget>[            
                    Text("Address: "+this.appInfo.address_id.toString(),      
                    style: TextStyle(fontSize: 22.0),             
                    ), Builder(               
                      _onPressed: (() {              
                        this._updateAppInfo(); 
                        }),                   
                        Text("s",style: TextStyle(fontSize: 18.0),),null,//displaying address of device in our Firebase Database         
                        SwatchColor.fromRGBO(90, 90, 90),               
                        SwatchColor.fromRGBO(90, 90, 90), null],),
                        SizedBox(height: 10.0),            
                        Text("Enter your message here."+"Press 'Send' button to send the SMS.",style: TextStyle(fontSize: 18.0),),      
                        SizedBox(height: 10.0),
                        Text("SMS_VAL",style: TextStyle(fontSize: 20.0),),      
                        SizedBox(height: 10.0),
                        sms_val, //displaying SMS stored in our Firebase Database         
                        SwatchColor.fromRGBO(90, 90, 90),null,null]),},),],
                        });} }
```
1.      Our Widget - _UpdateAppInfoStatelessWidget

This class will update the address of our device in our Firebase Database.
```dart
class UpdateAppInfoStatelessWidget extends StatelessWidget {   
  @override      
  Widget build(BuildContext context) {      
    return Scaffold(        
      body: Center(            
        child: Column(       
          mainAxisAlignment: MainAxisAlignment.center,            
          children: <Widget>[ 
            Text("Update App Information"),        
            Builder(           
               _onPressed: () {          
                 FirebaseDatabase.instance.updateAppInfo().then((value) {       
                   print(value);        
                   }).catchError((e) {       
                     print(e);        
                     }),              
                     Text("Update App Information",style: TextStyle(fontSize: 18.0), ),},),],        
                     });} }
```
1.      Our Widget - MainAppStatelessWidget

This class will call the other classes we made and display them as a list on our app's home screen. It will also take input from the user to store it in our Firebase Database & send an SMS based on that input to that address.
```dart
class MainAppStatelessWidget extends StatelessWidget {   
  @override      
  Widget build(BuildContext context) {      
    return Scaffold(        
      appBar: AppBar(),        
      body: Center(            
        child: Column(       
          mainAxisAlignment: MainAxisAlignment.center,            
          children: <Widget>[       
            Builder(            
              _onPressed: () {           
                FirebaseDatabase.instance.initializeAppWithUserId().then((value) {       
                  print(value);        
                  }).catchError((e) {       
                    print(e);        
                    }), TestingSmsWidget(),              
                    Builder(            
                      _onPressed: () {          
                        FirebaseDatabase.instance.initializeAppWithUserId().then((value) {       
                          this._marketplaceWidget = MarketplaceAppWidget(            
                            userID: value,            
                            );               
                            this._marketplaceWidget.listen(_onMarketplaceListingSelected).listen((e) {           
                              print('click');      
                              }),              
                              this._addressWidget = AddressAppWidget(            
                                userID: value,            
                                );               
                                this._addressWidget.listen(_onAddressSelected).listen((e) {           
                                  print('sms');      
                                  }),      
                                  });    
                                  }, ),],         
                                  children: <Widget>[    
                                    Text("SMS_VAL", style: TextStyle(fontSize: 20.0), ),    
                                    SizedBox(height: 10.0),        
                                    sms_val,              
                                    Text("SMS",style: TextStyle(fontSize: 16.0) ,),    
                                    SizedBox(height: 10.0),      
                                    sms_txt,              
                                    Text("Address",style: TextStyle(fontSize: 16.0),),    
                                    SizedBox(height: 10.0),      
                                    address_txt,              
                                    Text("SEND SMS",style: TextStyle(fontSize: 20.0) ,),    
                                    SizedBox(height: 10.0),      
                                    send_btn,        
                                    ],    
                                    );} }
```
1.      Tying it all Together

Here we'll tie all the widgets we've made in our app and put them on our home screen.
```dart
Widget build(BuildContext context) {    // ...        
return MaterialApp(     
  onGenerateRoute: () {       
    return MaterialPageRoute(        
      builder: (context) => MainAppStatelessWidget());    
      },        // ...        
      );}
```
### Wrap Up

In this tutorial, we learned how to create a cross-platform app using Flutter & Twilio API. We made a list of widgets for our app & started building it on the home screen.

For any queries or feedback, contact me at jwaigwakanoi@gmail.com. You can find the source code for this project at https://github.com/arunjchey/waigwa-kanoi. Stay tuned for more articles. 
Thank you!


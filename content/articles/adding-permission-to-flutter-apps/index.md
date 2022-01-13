
### Adding permission to flutter applications
### Introduction
The first important thing to know is that the android system uses permissions. You can for example for your app to be able to use the internet or access the camera.
So you may not want to let your user's friends download the app on their device if it is not necessary.
The same, you may not want your user's apps to use your camera if they are not necessary.
This article is about how to add permission when you create an app with flutter (if you want). It's simple but there are some things to know to avoid.  Your camera usage without permission, for example.

I will write my application so that the user has to accept permissions when he wants them. Users have an option to see all installed apps and select which one can see your camera.
(To know if the user accepted the permissions I am going to use a new flutter thing called StreamBuilder. If you do not know what it is, never mind for now).
What's important here is that when I get this app installed on my device. I will see a screen with two buttons, one to 'accept permissions' and the other to 'dismiss'. This is not what you will do in your app but it's to show how StreamBuilder works.
### Prerequisite 
- adding permission requests to a flutter app.
- how the flutter engine manages permissions.
- what use cases are best for custom permission handlers.
### Project development
OK, let's start. After  creating new project structure in editor:
You have a main folder in the middle called 'android' where you can find lots of files. 
In the 'android' folder, there is another folder called "app" where I will put all files related to my app. In this case, there is only one file: main/home_page.dart. This file handles rendering the screen to the user when he or she starts my app.
This file is for example where I will put all widgets related to how the user sees your home page, your camera preview, etc...
A widget in Flutter is a visual element of your application such as a button, text box, list view, and so on.
The name 'widget' seems to be not related to what it does but it is the old way of saying visual component.
       
Now, you know why we have an android folder and an app folder in the project structure.
Now, let's go to our main file (the code that will execute when you start your application). 
It starts with this:
```dart
void main() {
   runApp(MyApp()); 
 }
 ```
The function that runs everything when you start your app  called 'main' and  created this way:
```dart
void main() () { }
int main(List < String > args) {
  runApp(MyApp()); 
  }
         MyApp();
```
Here we have the function called 'main' and its type. The first one will be empty and the second one will contain what is between the brackets ("()").
```dart
     void main(String[] args)
        {        
          runApp(MyApp()); 
        }
 ```
Here I added a String array as the first parameter of the function. The String array will contain all that is between the brackets. If you pass any string to the command line when you execute your flutter application from a terminal.
If it does not make sense, for now, don't worry because we won't use it in this article.
The parameter of our main function is 'runApp'.
```dart
    runApp(MyApp());
```
This is the function that runs what is inside of it when you start your application. You can read more about it here.
I will put my widgets in this one because I will make sure only one widget exists at a time (no overlapping).
Now, let's go to our class where the widgets are:(main/home_page.dart).
 ```dart
       StreamBuilder(
                 stream: GlobalKey < PopupChannel >,
                 initialFocus?: null ,
       MaterialPageRoute(builder: (context) => HomePage()),
			     key: GlobalKey < PopupChannel >,
			     textStyle: TextStyle(fontSize: 20.0 , color: Theme . of (context) . primaryColor),
	    Builder( 
	            builder: (BuildContext context, Widget child) {
	                     _onGesture = _gesturesController . onGesture . listen ((MouseEvent e) {
	                              if _gesturesController . shouldShowGestureRecognizer () {
	                                         stream.add (child);
	         }
```
Now, let's understand what it does. You can see that there are lots of things written in this file but only one of them is a 'widget' and we will deal with it only.
What did I say above? For example, there is a widget called StreamBuilder. Its job is to create the material widgets (you can see some of them in action here ).
In this case, the main function that creates the stream. This stream is called from another file but you can put everything inside of it.
 There is a widget called 'HomePage'.  It handles showing the camera preview and other widgets to the user (you can see what it looks like here ).
The things that we did: 
First: You created a class called HomePage. Then you created a constructor in this file (between brackets: '{}'), which is mandatory for classes.
Second: You put the widgets inside of the constructor. Its job will be to instantiate all these widgets and add them to a parent widget (which we will see later). This way, they won't overlap each other on-screen.
The second thing you created was an empty class called MyApp (main/app.dart).
```dart
    MyApp() { }
 ```
It is a 'StatefulWidget' because it has a state that changes. Its current state you can read from the variable that I have called 'currentState'. This state contains all your widgets that are inside the "home_page.dart" file.
The first method that you can see inside of the class is 'initState'. This function runs when you start your app (when the main function starts). It should be self-explanatory. It creates all your widgets, sets them as 'current'. By current, I mean the ones marked with "current" are the ones shown first. But, the ones without "current" are the ones that can be shown inside of another widget), etc.
What is 'MyAppState'? This class is an abstract class that defines what a StatefulWidget must have. So, I have to declare it before I create my own stateful widget. And now, let's see the most important part of the application.
```dart
     State createState() => new _MyAppState();
 ```
To make it simpler for you, I took out the code from the file. Its job is to tell Flutter that this class will contain all your widgets as a state.
Now, let's dig into the '_MyAppState' class (main/home_page.dart).
```dart
    GesturesState gestureState;
     _MyAppState() {
       current = widgets;
	}
```
Let's take a look at what we did there: 
First: I created an empty class called '_MyApp'. The only thing it does is to call the constructor of the parent class.
Second: I created a 'GesturesState' widget inside of this class. It will contain all our widgets that react to user gestures. 
Third: The function called 'createState()' . It creates this widget with its default values (but there are some defaults in it).
The second method, you can see its code here:
```dart
       if (!gestureState.isChanged) {
       MyTabBarIOS(
         currentState = gestureState;
	      _onGesture . listen (() => this ._onGestureTapped());
```
Now, let's focus on the most complex part of it: 
First: At the beginning of this method, I checked if there are any changes in my gestures. If not, then it means that the user hasn't tapped something which is inside of another widget. So, it won't change anything. 
Second: After that, I set the currentState to the 'gestureState' variable. 
Third: I set a listener for this variable which is the '_onGesture' function. It which will detect all kinds of gestures). 
Fourth: The function called 'MyTabBarIOS()' creates the tab bar with its default values.
This is everything with your 'HomePage' file. Now, let's see what is inside of the 'GesturesState' class (main/home_page.dart).
```dart
   MyTabBarIOS(
      current = widgets;
       if (!gestureState.isChanged) {
        _onGesture . listen (() => this ._onGestureTapped());
```
First: I created a widget called 'MyTabBarIOS' which will contain all the tabs that we have. And it has a state, which you can read from the variable that I have called 'current'. As you can see, it has an empty constructor. This means will show all the default values that are inside of its parent class. 
Second: At the beginning of this file, I set 'current' to an empty variable called 'widgets'. It means that the tab bar will show an empty tab. Third: There is a function call called '_onGesture'. It checks if there are any changes in the gestures. If it detects some kind of gesture, then it calls another function which you can see here. Fourth: The function called 'MyTabBarIOS()' creates the tab bar with its default values.
Finally, let's focus on what is inside of that file, which I have mentioned above (main/home_page.dart):
```dart
       GesturesState gestureState;
       _onGesture . listen (() => this ._onGestureTapped());
```
Now, let's focus on the most important part of it.
First: At the beginning of this class, I have created a variable that contains all my gestures. 
Second: At the end, I set a listener for all kind of gestures.

That's it! As you can see, there are many methods to add permissions. Check flutter documentation and the packages installed. To get more knowledge about this topic. After doing this project, you have learned how to add permissions to an application. You can do this by using different methods that are available in a flutter. Hope you enjoyed it! I know that there are some parts of this article where it isn't very clear. So, if you have any comments or questions, feel free to leave a comment below! Thanks for reading :)
[Github User](https://github.com/jasminemilito)

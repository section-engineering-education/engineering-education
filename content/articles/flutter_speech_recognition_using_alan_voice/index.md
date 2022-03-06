

![hero](/engineering-education/flutter_speech_recognition_using_alan_voice/hero.png)

Speech recognition is not a new technology. It has been around for a couple of years and has led to the development of amazing features in modern applications being created. Some of these features include voice help and speech to text. In this tutorial, we will see how to create an application that performs actions based on commands gotten from recognizing the speech of the user.


### Introduction
Alan voice is an artificial intelligent-powered platform that uses conversational voice to create powerful voice help applications. When creating your applications that support speech recognition, changes to the setup are usually performed on version releases and updates you make to the initial app build. This is inefficient and hectic to implement. It would be better if the underlying technology that contains the basics for the speech recognition to function well exists and sits locally and whenever any updates need to be made to the functions of our commands, it will be made on a much simpler and easier interface that is easily configurable. With Alan voice plugin, we can set up basic functionality in our application that can communicate with users using speech recognition to perform the complex function set up on an easily configurable interface provided to us by alan voice.

To achieve this, we will first set up our flutter application, then we will link it to Alan voice by integrating Alan voice plugin into the application. Next, we will test our speech recognition application. Finally, we will create/edit/update our commands without updating our application.



### Prerequisite
For this tutorial to take effect, the user 
 - Should know flutter SDK and widget
 - must know how to create flutter applications and must have created a flutter application before

### Table of Contents
- [Introduction](#introduction)
- [Prerequisite](#prerequisite)
- [Table of Contents](#table-of-contents)
- [Goals](#goals)
- [Setting up our application](#setting-up-our-application)
- [Creating our Account](#creating-our-account)
- [Running our application](#running-our-application)
- [Conclusion](#conclusion)
- [Further Reference](#further-reference)

### Goals
We will learn how to set up speech recognition using Alan's voice plugin in our flutter application. See how to set commands and call them in our application to perform some operations.

### Setting up our application
Head over to your flutter application IDE and spin up a new flutter application and name it any suitable name for your choosing. Once your application is set and ready to run, we need to integrate the flutter alan voice package into our application, this can be got from [Flutter package alan_voice](https://pub.dev/packages/alan_voice). Get the latest version of the package and add it to your pubspec.yml file. Ensure the minimumSdkVersion for your application is 21. To check this you can update this in your android/app/build.gradle file.

! [set-up-application] (/engineering-education/flutter_speech_recognition_using_alan_voice/application.png)



### Creating our Account 
We need to set up our account to configure our application commands without updating codes on our application. To achieve this, we need to link our application to our alan voice account we just created by using an Alan SDK key provided to us upon account creation. Head over to [studio alan](https://studio.alan.app/) and create an account with your details. Click on create voice help and set up a new project. Once done, see a basic “Hello world” - “Hi there” reply described in the center window panel.

! [create-account] (/engineering-education/flutter_speech_recognition_using_alan_voice/account.png)


To get our Alan SDK key, click on the integration button on the top navigation on the window. Select the platform you want to integrate to ours is android, so we select android. Note that for an iOS application we need to get the configuration for iOS by selecting the IOS option.


### Running our application
We import our plugin file into our application and we have in our main.dart file the following code

```dart
import 'package:alan_voice/alan_voice.dart';
import 'package:flutter/material.dart';

void main() {
 runApp(
   const MaterialApp(
     home: AlanSpeech(),
   ),
 );
}

class AlanSpeech extends StatefulWidget {
 const AlanSpeech({Key? key}) : super(key: key);

 @override
 _AlanSpeechState createState() => _AlanSpeechState();
}

class _AlanSpeechState extends State<AlanSpeech> {

 _MyHomePageState() {
   AlanVoice.addButton(' YOUR API_KEY goes here ',
   buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT
   );
    // sets a command to be performed on speech match

   AlanVoice.onCommand.add((command) {

    // debugs the output to the console
   debugPrint("got new command ${command.toString()}");
   });
 }

 @override
 initState() {
   _MyHomePageState();
 }

 @override
 Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(
       title: const Center(child: Text('Alan Speech recognition')),
     ),
       body: const Center(
         child: Text(
           'Speech Recognition'
         ),
       ));
 }
}
```

To add the alan button that initiates the speech recognition listener we implement the following function.

```dart
_MyHomePageState() {
AlanVoice.addButton(" // AlanSDKKey",
buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT
);
 AlanVoice.onCommand.add((command) {
 debugPrint("got new command ${command.toString()}");
 });
}
```

Ensure to replace the “AlanSDKKey” value with your alan SDK key value. The buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT specifies that the button should come up on the left side of the app screen.

With this, Alan's voice has been implemented. We can now run our application and see our Alan button present.

The command existing on us was the default command provided to us. This serves as simple voice help that relays pre-defined information back to users based on matched inputs.

To specify actual actions, we need to define the commands we want our application to listen to.

```dart
intent('Open youtube', p => {
    p.play({"command": "youtube", "screen": "youtube"});
    p.play('Opening Youtube');
});
```

The above code specifies that our Alan from the end should execute a command when there is a match in the string specified in the first argument passed to our intent function call. When a match in speech recognition to the string specified is found, alan sends a command response to our frontend. The command response is captured in the command section of the AlanVoice.onCommand.add() function. So when we run our app, click the speech recognition button and say open youtube, our application logs to the console “got a new command open youtube”. Using this we can perform a string text match to carry out our actions.

For our example, we will open our YouTube application whenever we say open YouTube. To achieve this, we need a flutter package that opens an application in a flutter application. The external_app_launcher does exactly this for us. Add the plugin to your pubspec.yaml file and import it into your file where it will be used. We need to provide the package name of the application we wish to open to the LaunchApp.openApp.androidPackageName property. If the application is found in the device, then the application will be launched otherwise, if the app is not installed in the device then it navigates the user to the play store link of the application specified in the second parameter as we will see soon. We have our updated code to be,

```dart
import 'package:alan_voice/alan_voice.dart';
import 'package:flutter/material.dart';
import 'package:external_app_launcher/external_app_launcher.dart';

void main() {
 runApp(
   const MaterialApp(
     home: AlanSpeech(),
   ),
 );
}

class AlanSpeech extends StatefulWidget {
 const AlanSpeech({Key? key}) : super(key: key);

 @override
 _AlanSpeechState createState() => _AlanSpeechState();
}

class _AlanSpeechState extends State<AlanSpeech> {

  _MyHomePageState() {

    // Adds alan voice button using your API_KEY instance and specifies
    // the position of our button

    AlanVoice.addButton(' YOUR API_KEY goes here ',
        buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT
    );

    // sets a command to be performed on speech match

    AlanVoice.onCommand.add((command) async {
      if(command.data['command'] == 'youtube' ){

        // Launches the application when a match occurs
        
        await LaunchApp.openApp(
          androidPackageName: 'com.google.android.youtube',
          appStoreLink: 'https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en&gl=US',
          // openStore: false
        );
      }

      // debugs the output to the console

      debugPrint("got new command ${command}");
      debugPrint("got new command ${command.data['command']}");
    });
  }

  @override
  initState() {
    // Initializes alan voice button to listen to speech
    _MyHomePageState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Center(child: Text('Alan Speech recognition')),
        ),
        body: const Center(
          child: Text(
            'Speech Recognition',
            style: TextStyle(
                fontSize: 20
            ),
          ),
        ));
  }
}
```

In our code above what we have done is to update our code to respond to our commands. 

```dart
AlanVoice.onCommand.add((command) async {
     if(command.data['command'] == 'youtube' ){
       await LaunchApp.openApp(
         androidPackageName: 'com.google.android.youtube',
         appStoreLink: 'https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en&gl=US',
         // openStore: false
       );
     }
     debugPrint("got new command ${command}");
     debugPrint("got new command ${command.data['command']}");
   });
 }
```
If our command registered on our account is matched, we should call the LaunchApp.openApp function to open our YouTube application. If we should run our app once more, click the speech recognition button and say open YouTube once more, our YouTube application should open.

### Conclusion
In this tutorial, we have been able to implement our speech recognition. Using alan voice, we can easily set up voice help or perform complex and/or automated actions in our application. The hassle of deploying builds regularly for little updates has been taken care of and more commands can be added to your application.

### Further Reference

- [Flutter Docs](https://docs.flutter.dev/)
- [Flutter pub package alan_voice](https://pub.dev/packages/alan_voice)
- [Flutter pub package external_app_launcher](https://pub.dev/packages/external_app_launcher)
- [Github link to code](https://github.com/Eze4Manuel/flutter_speech_recognition_using-_alan_voice)
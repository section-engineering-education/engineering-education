---
layout: engineering-education
status: publish
published: true
url: /flutter_speech_recognition_using_alan_voice/
title: How to Build a Speech Recognition App in Flutter using Alan Voice
description: This tutorial will walk the reader through how to build a speech recognition app with Flutter using Alan voice.
author: emmanuel-ezenagu
date: 2022-03-15T00:00:00-06:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/flutter_speech_recognition_using_alan_voice/hero.png
    alt: How to Build a Speech Recognition App with Flutter using Hero Image
---
Speech recognition has been around for a couple of years and has led to the development of amazing features in modern applications. 
<!--more-->
Some of these features include voice assistance and speech-to-text conversion. 

Alan voice is an artificial intelligent-powered platform that uses conversational voice to create powerful voice assistant applications. 

With the Alan voice plugin, we can set up speech recognition functionality in our application to communicate with users.

In this tutorial, you will learn how to create an application that performs actions based on user commands using speech recognition.

To achieve this, we will first set up our Flutter application, and then link it to Alan voice by integrating the plugin into our application. 

Next, we will test our speech recognition feature and also create/edit/update the speech commands without changing our application.

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up our application](#setting-up-our-application)
- [Creating an Alan voice account](#creating-an-alan-voice-account)
- [Running our application](#running-our-application)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, the reader will need the following:
 - Some basic knowledge of Flutter SDK and widgets.
 - Basic knowledge of Flutter and the Dart programming language.
 - A code editor (preferably VS Code).


### Setting up our application
Navigate to your Flutter application IDE and create a new Flutter application and give it a name of your choice. 

Once your application is set and ready to run, you need to integrate the Alan voice  Flutter package into the application. The library can be downloaded from [here](https://pub.dev/packages/alan_voice). 

Get the latest version of the package and add it to your `pubspec.yml` file. 

Ensure that the minimum SDK version for your application is *21*. To check this you can update it in your *android/app/build.gradle* file.

![set-up-application](/engineering-education/flutter_speech_recognition_using_alan_voice/application.png)

### Creating an Alan voice account 
We need to set up our account to configure the application commands without updating the entire code. 

To achieve this, we will link our application to the Alan voice account using the SDK key that is provided to us upon account creation. 

Therefore, navigate to [Studio Alan](https://studio.alan.app/) and create an account with your details. 

Click on *create voice help* and set up a *new project*. Once done, you will see a basic *Hello world - Hi there* message in the center window panel.

![Create-account](/engineering-education/flutter_speech_recognition_using_alan_voice/account.png)

To get our *Alan SDK key*, click on the *integration* button at the top navigation of the window. 

Select the platform you want to integrate. In our case, we will be selecting Android. Note that for an iOS application, we need to select the iOS option.

### Running our application
Import the plugin file into our application and add the following code into the `main.dart`:

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
    // Sets a command to be performed on speech match

   AlanVoice.onCommand.add((command) {

    // Debugs the output to the console
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

To add the *Alan* button that initiates the *speech recognition* listener, add the code below:

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

Ensure to replace the `AlanSDKKey` with your assigned Alan SDK key value. The `buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT` specifies that the button should be placed at the bottom left of the screen.

With this, Alan's voice has been implemented, we can now run our application.

The application has a default command, it serves as simple voice help that relays pre-defined information back to users based on matched inputs.

To specify actual actions, we need to define the commands we want our application to listen to.

```dart
intent('Open youtube', p => {
    p.play({"command": "youtube", "screen": "youtube"});
    p.play('Opening Youtube');
});
```

The above code specifies that our app should execute a command when there is a match in the string specified in the first argument that is passed to our intent function call. 

When a match is found, Alan sends a response to our frontend. 

The response is captured in the command section of the `AlanVoice.onCommand.add()` function. 

When we run our app and click the *speech recognition* button and say *open YouTube*, our application logs to the console `got a new command open youtube`. 

We can use this response to perform a string-text match to invoke actions. For our example, the app will open up YouTube whenever we say `open YouTube`. 

To achieve this, we need a Flutter package that opens other applications. The `external_app_launcher` allows us to implement this functionality. 

Add the plugin to your `pubspec.yaml` file and import it into your file. We need to provide the package name of the application we wish to open to the `LaunchApp.openApp.androidPackageName` property. 

If the application is found in the device, then it will be launched. If the app is not installed on the device then the user is directed to the Play Store:

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

    // Adds Alan voice button using your API_KEY instance and specifies.
    // The button's position.

    AlanVoice.addButton(' YOUR API_KEY goes here ',
        buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT
    );

    // Sets a command to be performed on speech match.

    AlanVoice.onCommand.add((command) async {
      if(command.data['command'] == 'youtube' ){

        // Launches the app when a match occurs
        
        await LaunchApp.openApp(
          androidPackageName: 'com.google.android.youtube',
          appStoreLink: 'https://play.google.com/store/apps/details?id=com.google.android.youtube&hl=en&gl=US',
          // openStore: false
        );
      }

      // Debugs the output to the console

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

In the above code, we have implemented the functionality that allows the app to respond to our commands:

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

When the command registered on our account is matched, it should call the `LaunchApp.openApp` function to open our YouTube application.

### Conclusion
In this tutorial, we learned how to integrate speech recognition into a Flutter app using Alan voice.

We can easily perform complex or automated actions in our application. You can, therefore, use this knowledge to craft other high-quality applications.

You can find the complete code on this [Github repository](https://github.com/Eze4Manuel/flutter_speech_recognition_using-_alan_voice)

Happy coding!

### Further reading
- [Flutter docs](https://docs.flutter.dev/)
- [Flutter pub package alan_voice](https://pub.dev/packages/alan_voice)
- [Flutter pub package external_app_launcher](https://pub.dev/packages/external_app_launcher) 

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)
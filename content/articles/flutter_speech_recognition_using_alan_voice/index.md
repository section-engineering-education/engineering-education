![hero](/engineering-education/flutter_speech_recognition_using_alan_voice/hero.png)

Speech recognition is not a new technology, it has been around for a couple of years and has led to the development of amazing features in modern applications. Some of these features include voice assistance and speech to text. 

Alan voice is an artificial intelligent-powered platform that uses conversational voice to create powerful voice assistant applications. With the Alan voice plugin, we can set up basic functionality in our application that communicates with users using speech recognition.

In this tutorial, you will learn how to create an application that performs actions based on user commands using speech recognition.

To achieve this, we will first set up our Flutter application, and then link it to Alan voice by integrating the plugin into our application. Next, we will test our speech recognition feature and also create/edit/update the speech commands without updating our application.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Setting up our application](#setting-up-our-application)
- [Creating an Alan voice account](#creating-an-alan-voice-account)
- [Running our application](#running-our-application)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, the reader will need the following:
 - The reader should have basic knowledge of Flutter SDK and widget
 - A basic knowledge of Flutter and Dart programming
 - A code editor (preferably Vscode)


### Setting up our application
Head over to your Flutter application IDE and create a new Flutter application and give it a name of your choice. 

Once your application is set and ready to run. Next, integrate the Alan voice  Flutter package into the application, this can be downloaded [here](https://pub.dev/packages/alan_voice). 

Get the latest version of the package and add it to your `pubspec.yml` file. Ensure the minimum SDK version for your application is 21. To check this you can update it in your android/app/build.gradle file.

![set-up-application](/engineering-education/flutter_speech_recognition_using_alan_voice/application.png)

### Creating an Alan voice account 
We need to set up our account to configure our application commands without updating the codes on our application. To achieve this, we need to link our application to the Alan voice account we just created using the Alan SDK key provided to us upon account creation. 

Head over to [studio alan](https://studio.alan.app/) and create an account with your details. Click on create voice help and set up a new project. Once done, you will see a basic “Hello world” - “Hi there” reply described in the center window panel.

![create-account](/engineering-education/flutter_speech_recognition_using_alan_voice/account.png)

To get our Alan SDK key, click on the integration button at the top navigation of the window. Select the platform you want to integrate to, we will be selecting android for this tutorial. Note that for an iOS application we need to get the configuration for iOS by selecting the iOS option.

### Running our application
Import the plugin file into our application and add the following code into the `main.dart`.

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

To add the Alan button that initiates the speech recognition listener, add the code below.

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

Ensure to replace the `AlanSDKKey` value with your alan SDK key value. The `buttonAlign: AlanVoice.BUTTON_ALIGN_LEFT` specifies that the button should place at the button left of the app screen.

With this, Alan's voice has been implemented, we can now run our application and see the Alan button present.

The command in the application is a default command, it serves as simple voice help that relays pre-defined information back to users based on matched inputs.

To specify actual actions, we need to define the commands we want our application to listen to.

```dart
intent('Open youtube', p => {
    p.play({"command": "youtube", "screen": "youtube"});
    p.play('Opening Youtube');
});
```

The code above specifies that our Alan from the end should execute a command when there is a match in the string specified in the first argument passed to our intent function call. When a match in speech recognition to the string specified is found, Alan sends a command response to our frontend. 

The command response is captured in the command section of the `AlanVoice.onCommand.add()` function. So when we run our app, click the speech recognition button and say open YouTube, our application logs to the console “got a new command open youtube”. Using this we can perform a string text match to carry out our actions.

For our example, our app will open up YouTube whenever we say “open YouTube”. To achieve this, we need a Flutter package that opens an application in a Flutter application. The `external_app_launcher` can do this for us. 

Add the plugin to your `pubspec.yaml` file and import it into your file where it will be used. We need to provide the package name of the application we wish to open to the `LaunchApp.openApp.androidPackageName` property. If the application is found in the device, then the application will be launched, if the app is not installed in the device then it navigates the user to the play store link of the application specified in the second parameter as we will see soon. Update your code with the one below.

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

In the code above we have updated it to respond to our commands. 

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

When the command registered on our account is matched, it should call the `LaunchApp.openApp` function to open our YouTube application. If we should 

Run the app, click the speech recognition button and say open YouTube once more, the YouTube application should open.

### Conclusion
In this tutorial, we learned how to integrate speech recognition into our app using Alan voice, we can easily set up voice help or perform complex and/or automated actions in our application. The hassle of deploying builds regularly for little updates has been taken care of and more commands can be added to your application.

### Further reading
- [Flutter docs](https://docs.flutter.dev/)
- [Flutter pub package alan_voice](https://pub.dev/packages/alan_voice)
- [Flutter pub package external_app_launcher](https://pub.dev/packages/external_app_launcher)
- [Github link to code](https://github.com/Eze4Manuel/flutter_speech_recognition_using-_alan_voice)




 ###  INTRODUCTION:
Sign Language Interpreting is the act of converting sign language to speech. This helps deaf or hard of hearing people especially in public places. When two people are having a conversation, each persons features are highlighted . This is so that they can understand what they are trying to say. The interpreter uses their hands to highlight the facial gestures. He/ She then convert it into words that can be understandable. The conversion referred to as Interpreting. The first language being source language and the second language being output language.
### Table of  Content
1. Introduction.
2. Key takeaways.
3. Prerequisites.  
4. Case Study on Flutter, how it works?
5. How to develop a sign language to voice flutter app?
6. Develop a sign language flutter app.

#### Key takeaways
    
-   Receive sign data from the firebase database.
    
-   Translate text to speech in flutter(with timings).
    
-   How to set up Firebase with Flutter and get user data.

### Prerequisites:

-   Knowledge of Dart programming language.
-   Some Knowledge of Flutter (Optional). 
- Camera permissions, timings, and google voice recognition in Flutter.
### CASE STUDY ON FLUTTER, HOW IT WORKS?
To have a sign translation from American sign Language (ASL) to English. It is necessary to have a reliable means of communication. Different types of sign language apps are available in the market which makes it easier to use. Flutter SDK, popular platform in the world providing tools for cross-platform app development. It works on both mobile and desktop. This is through its Stateful hot reloads which no other SDK offers at the moment. This article focuses on how to develop a sign translation from ASL to English using flutter .

### HOW TO DEVELOP A SIGN LANGUAGE TO VOICE FLUTTER APP?
Flutter has tools and libraries required for translation of sign language to text. You use Flutter package that can decode images captured by either webcam or phone camera. The package also can transfer it to a specific endpoint. Google also announced its support for the flutter community. This was by adding the image decoder library in this framework which makes it easier to develop an app.

Afterwards, creating an audio file corresponding to the text of sign language. Proper pronunciation of words is also key to this. It is necessary to make sure that the voice used for translation should be clear.


### DEVELOP A SIGN LANGUAGE FLUTTER APP:
The main purpose of this app is to decode the sign language and convert it into English text. The output will display on the screen which can be useful for many people all over the world. It will use image recognition algorithm for decoding sign language. Then transfer it to the backend that will run on cloud services. This is how flutter can help deaf people by creating an app like this.
A user can select the required sign language from a list and then record their video or take a picture of it. Once done, the app translate the signs into English with proper pronunciation.

### Lets see code in flutter:

### Step 1. Adding relevant dependecies.
You will start by creating a new project. Then add necessary dependencies to the pubspec.yaml file.
```dart
dependencies: flutter:
	sdk:flutter cupertino_icons: ^0.1.2
	cloud_firestore: ^0.19.3
	image_picker: 0.4.3
	path_provider: 0.3.1
	shared_preferences: ^0.17.3
	url_launcher: 0.2.11
	cloud_firestore: ^0.19.3
	imagepicker: 0.4.3
	pathprovider: 0

```
### Step 2. Creating main class
After this, create a new class called 'DeafSignTranslator' in lib folder. This will be the main class for developing this app.

```dart
import 'dart:async'; 
import 'package:cloud_firestore/cloud_firestore.dart'show initializeDatabase;
import 'resource://services-common/ursa.dart';
import 'package:shared_preference/shared_preference.dart'; import 'package:imagepicker/imagepicker.dart';
import 'package:path_provider/path_provider.dart';

	bool isRecording = false;
	bool hasImages = false;
	bool _tweetable = true;
	VoiceFile voiceFile;
	String textForASLTranslation = "";
	String textForEnglishTranslation = "";
	final userRecords = [ {"dateTimeStamp" : "", "text" : "", recordingStatus : 2 }, {"dateTimeStamp" : "", "text" : "", recordingStatus: 1 } ];
	String getTextToSpeak(){

		return textForASLTranslation;

		}  
Future _getVoiceText(){
void _handleRecordingStatus(_int value){ if (_tweetable == true) { setState(() => this.tweetButton().isEnabled = true); } else {setState(()=>this.tweetButton().isEnabled = false)} }
void handleImagePicked(String url) {
	Future getTextToSpeak(){
	void getASLSigns(){
		Future _getVoiceText(){
		return futureDart.handleImagePicked((Uri imageUrl)) async { 
			if (imageUrl != null) {
			 try { 
				 final path = await this.pathProvider.resolve(imageUrl); 
				 final uri = Uri.parse(path); 
				 setState(() { textForASLTranslation = "";
				 hasImages = false; 
				 voiceFile = await VoiceFile(uri).decode("base64"); 
				}
				); 
				} 
				 catch (e) { print("error when getting image url"); hasImages=false; } };
	}
);
Future handleTextRecording(_int value){ 
	setState(() => this.recordButton().isEnabled = !value); 
}
void _handleRecordingStatus(int value){ 
	if (_tweetable == true) { setState(() => this.tweetButton().isEnabled = true); 
	} 
	else {setState(()=>this.tweetButton().isEnabled = false)} 
	}
Future getTextToSpeak(){
void getRecordingVideo(_int value){ 
	setState(() => this.recordButton().isEnabled = !value);
	 }

```
### Step3. Create a class for storing records.
For this class. First of all, we will create a class for storing the records of our users that are saved to Firestore database.
```dart
class userRecords{
}
```
They will be stored as:
```dart

"dateTimeStamp" : "", "text" : "", recordingStatus: 1 }];

```
Next we will begin by creating a new class called 'VoiceFile'. This is for getting voice from video file.
```dart
Future getVoiceText(){ 
	return _getVoiceText().then((text) => print(text));
	 } 
	 }/

class VoiceFile implements FutureCallback<String> {
final Uri uri; String text; 
final String encoding = "UTF-8";
const VoiceFile(this.uri); 
FutureCallback<String> _decodeAsync(int progress) async {
  String decodedText = new String.fromCharCodes(await decodeProgress (progress)); 
  setState(() => this.text = decodedText); 
  } 
  get isDecodingVoiceFile(){ 
  return text != null; 
  }
String decodeProgress(int progress){ 
	if (progress == 100){ 
		return this.encoding + " encoding completed successfully";
		 } 
		 else {return null;} 
		} 
Future _decodeAsync(int progress) async {
	 String decodedText = new String.fromCharCodes(await decodeProgress());
	  setState(() => this.text = decodedText);
	  }  
	String decodeProgress(int progress){ 
	if (progress == 100){ return this.encoding + " encoding completed successfully"; 
	} 
	else {return null;}
	 } 
	 }/
class DeafTranslator{
}
```
### Step4. Creating deaf translator class.

Now, You create a new class called 'DeafSignTranslator'. It deals with translating text to sign language.

### Step5. Creating User Registrations and authentication.

Next is for user registration and authentication. This is by using Firebase SDK from google cloud functions.

```dart
class SignLanguageApp{
void _handleImagePicked(Uri imageUrl){ 
	setState(() => this.recordButton().isEnabled = false); 
	showDialog ( context: context, builder: (BuildContext context) => AlertDialog ( title: Text ( 'Sign Language Translator',
	 style: TextStyle ('display: inline-block',fontSize: 30.0, color: Colors.pink)), 
	 content: Text ('Please select a voice recording from your audio',style: TextStyle('fontWeight: bold'))), 
	 actions: <Widget>[ FlatButton( child: Text("Done"), 
	 onPressed: () { 
		 Navigator .pop(context) .then(() => Navigator.of(context).pushReplacementNamed('/get-asl'));
	 },
	),
],
);
}
void _handleRecordingStatus(int value){ if (_tweetable == true) {
	 setState(() => this.recordButton().isEnabled = !value); } 
	 else {setState(()=>this.recordButton().isEnabled = !value)} 
}
```
### Step6. Creating class to subscribes to Firestore changes.
lets now finalize our application . We will create a new class that subsrcibes to Firestore changes.
```dart
class signLanguageApp{
	_handleTextRecording(_int value){ setState(() => this.getAslButton().isEnabled = !value);
	 }
void _handleRecordingStatus(int value){ 
	if (_tweetable == true) { setState(() => this.getAslButton().isEnabled = !value);
	 } 
	 else {setState(()=>this.getAslButton().isEnabled = !value)} 
}
void _handleImagePicked(){ setState(() => this.imageUrl = this._uri); 
}
```
### Step 7. Finalization of the main dart file.
Finally, we will initialize our app in main.dart file.
```dart

main(){ new signLanguageApp(); } }}}
class SignLanguageApp{
	void _handleTextRecording(_int value){ setState(() => this.getAslButton().isEnabled = !value); } 
	void _handleRecordingStatus(int value){ if (_tweetable == true) { setState(() => this.getAslButton().isEnabled = !value); } else {setState(()=>this.getAslButton().isEnabled = !value)} 
}
	void _handleImagePicked(){ setState(() => this.imageUrl = this._uri); 
}
firebase.initializeApp(environment['FIREBASE_JSON'] as Map<String, dynamic>); SignLanguageApp sign = new SignLanguageApp();
new DeafTranslator().getSignFromText(_string text); 
}
}
}
```

### Step 8. Functions explanations.
Now, we will create two functions that can transform text to sign language and vice versa.
```dart

_handleTextRecording(_int value){ setState(() => this.getAslButton().isEnabled = !value); }

void _handleRecordingStatus(int value){ if (_tweetable == true) { setState(() => this.getAslButton().isEnabled = !value); } else {setState(()=>this.getAslButton().isEnabled = !value)} }
void _handleImagePicked(){ setState(() => this.imageUrl = this._uri); }
```
conclusion:
In this tutorial, we have learnt how to use the voice flutter plugin. We also saw some examples of using it in a real life application. Finally thanks for reading this article, if you find it helpful please share it with others and leave a clap or two.

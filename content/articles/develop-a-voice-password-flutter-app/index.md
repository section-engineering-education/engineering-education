 ### Develop a voice password flutter app 
 
### Introduction
In today's world, security is a major concern. Many websites and applications need a password for authentication. Yet, traditional passwords are guessed or stolen. Users are required to remember many passwords for different applications and websites. This can be difficult, especially if the user has a poor memory.

One solution to this problem is a voice password. With a voice password, the user must speak a specific phrase to authenticate. A computer or mobile device can compare the spoken passcode to one previously stored. Authorized users do not need to remember multiple passwords for different systems. 
In this tutorial, we are going to develop a voice password flutter app. This app will allow the user to input their password by speaking it instead of typing it. We will use the Google Voice API to convert the user's spoken password into text.

First, we need to create a new flutter project. To do this we need to run the following command
```dart

$ flutter create voice_password

Now, let us change the default code in main.dart as shown below. This will display a simple text field on-screen with no text entered into it. We will use our own custom class called PasswordTextField. This class used instead of TextField from the Flutter library. This class will take care of capturing the user's input and verifying it against the Google Voice API.
```dart
class Main extends StatefulWidget {
@override
State createState() => new Main();
}
class Main extends StatefulWidget {
	static const String GOOGLE_VOICE = "GOOGLE_VOICE";
@override
		Widget build(BuildContext context) {
      return new Scaffold(
          body: new Center(
          child: new PasswordTextField(
                 onChanged: _updatePassword,
                 onSaved: _handleSave,
                                 textRules: [
                             maxLength: 4,
                             minLength: 1,
                             pattern: r"\w*",
                            ],
                 errorTextIndicatorColor: Colors.red,
                 ),
            ),

}
Future<Null> _updatePassword() async {
	try {
		return await getGoogleVoicePassword();
	} catch (e) {
		print("Cannot get Google Voice password: $e");

	}
}
Future<bool> _handleSave() async {
	bool success = false;
	try {
		success = await saveGoogleVoicePassword(toFile: "voice_password.txt");
	} catch (e) {
		print("Cannot save Google Voice password: $e");
	}
	return success;
}

void _print(String msg) => print(msg);

Future<String> getGoogleVoicePassword() async {

	final String rez = await GooglePlayServicesUtil.getErrorDialog(googleApiClient, 

errorCode: GOOGLE_VOICE);

if (rez != null) return rez;

}

Future<bool> saveGoogleVoicePassword(String file) async {

	bool success = false;

	try {

		File f = new File(file);

	if (!f.exists()) {

		f.create();

	} 

	byte[] bytes =Encoding.UTF8.encode(password).toBytes();

	FileOutputStream fos = new FileOutputStream(f);

	fos.write(bytes);

	fos.close();

	success = true;

} catch (e) {

		print("Cannot save Google Voice password: $e");

	}

return success;

}

}
```
Let's have a look at the code used. Our PasswordTextField implements a TextEditingController interface from Flutter to capture user input. The app saves passwords in a file called voice_password.txt. This file is inside the app's local storage directory. This way, we can ensure that the password is only visible to us and not accessible to other apps on a user's device.

In the _print() method, we print out the error message from Google Voice API. This is by the use of a handy dart method called print(). In order for this to work, we need to insert the following line of code at the top of our main.dart file.
```dart
import 'dart:io';
```
Now, we can run the app on our device or emulator. 
Once we have entered our password, we can hit the save button to save it in a file called voice_password.txt. Let's go ahead and try using this password to log into our app. When we type the password, instead of seeing it typed on the screen, it is spoken out loud.

This is how easy it is to use Google Voice API in Flutter applications. It provides an extra layer of security to prevent users from typing their passwords. With a little bit of coding, you can easily add voice authentication to your app.

Happy coding!

Now that we have our Google Voice password, let's see how we can use it in our app. First, we need to import the dart:io library at the top of our main.dart file.
```dart
import 'dart:io';
```
Then, we update our _print() method to log the error message returned from Google Voice API if it exists or is null. Null comes in if doesn't exist. Now let's insert the following code at the bottom of our main.dart file.
```dart
void _print(String msg) => print(msg);
```
Now, we can update our login action to use the Google Voice password. We will need to create a variable inside our LoginPage class called googleVoicePassword. this variable is of type String. Inside this method, we will need to do the following things:
- Create an instance of GooglePlayServicesUtil along with our googleApiClient. 	This way, we can read the error code from the Google Voice API and 
display a DialogBox if it exists.
```dart
Future<String> getGoogleVoicePassword() async { 

final String rez = await GooglePlayServicesUtil.getErrorDialog(googleApiClient, 

errorCode: GOOGLE_VOICE);

if (rez != null) return rez; 

}
```
- Convert our password to a byte array.
This is so that we can save it in a file later on. 
```dart
byte[] bytes =Encoding.UTF8.encode(password).toBytes();
```
- Create a new FileOutputStream with our file location.
```dart
FileOutputStream fos = new FileOutputStream(file);
```
- Write the byte array to the file. 
```dart
fos.write(bytes);
if (!Directory.exists(storageDir)) Directory.create(storageDir); 

saveGoogleVoicePassword(file).then((_) => print("Saved voice password to $file"));

}
```
We create a new method called getGoogleVoicePassword() which is of type Future<String>. Inside this method, we use the GooglePlayServicesUtil class. This class gets the error dialog from the Google Voice API. We then check if this dialog exists and, if it does, we return the dialog box's text.

Next, we need to convert our password to a byte array. We can do this by using Encoding.UTF8.encode() method. We write this byte array to a file called voice_password.txt in our app's local storage directory.

We also need to add the following line of code at the top of our main.dart file.
```dart
import 'dart:async';
```
This allow us to use the Future<String> type inside our getGoogleVoicePassword() method.

Then, we need to update our loginState method inside LoginPage to save this password. Inside the if statement of the 'if (googlePlayServices) {...}' statement, add these code to call our getGoogleVoicePassword() method and use the returned value as the second parameter for a new FileSavePicker().
```dart
if (googlePlayServices) {

String password = getGoogleVoicePassword();

FileSavePicker savePicker = new FileSavePicker(file);

savePicker.pickAsFile(password).then((Path file) { 

// TODO: Use the path returned from pickAsFile to create and save a file.

});

}
```
Then, we need to update our _print() method to print out the path of the file chosen by the user.
```dart
void _print(String msg) => print(msg);
```
Finally, update our saveGoogleVoicePassword() method to take in a path as a parameter.
```dart
Future<void> saveGoogleVoicePassword(String password) async { 

final String rez = await GooglePlayServicesUtil.getErrorDialog(googleApiClient, 

errorCode: GOOGLE_VOICE);

if (rez != null) return rez; 

var storageDir = await getApplicationDocumentsDirectory(); 

var voicePasswordFilePath = Path.join(storageDir, 'voice_password.txt');

if (!Directory.exists(storageDir)) Directory.create(storageDir); 

var file = File('$voicePasswordFilePath'); 

await file.writeAsBytesAsync(password);

file.close();

}
```
We can now run our app and log in using our Google Voice password. After we have logged in, we can open the voice_password.txt file to see the contents.
### Example
Saved voice password to C:\Users\username\AppData\Local\Temp\flutter_test\voice_password.txt

Congratulations! You have now successfully written an app that stores a user's voice password. 
 
  HAPPY CODING GEEKS

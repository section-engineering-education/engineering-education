---
layout: engineering-education
status: publish
published: true
url: /develop-a-voice-password-flutter-app/
title: How to Develop a Flutter App with Voice Password Authentication
description: This tutorial will help the reader understand how to create a Flutter application that uses one's voice for authentication.
author: john-kanoi
date: 2022-01-31T00:00:00-14:18
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/develop-a-voice-password-flutter-app/hero.png
    alt: Flutter App with Voice Password Authentication Hero Image
---
Security is a major concern in the modern world. Many websites and applications need a password for authentication. Yet, traditional passwords can be easily guessed or stolen. 
<!--more-->
Users may also need to remember many passwords for different applications and websites. This can be difficult, especially if a person has a poor memory. One solution to this problem is a voice password. 

This technique requires the user to speak a specific phrase to authenticate. A computer or mobile device can then compare the spoken passcode to the one stored in the server. Therefore, authorized users do not need to remember many passwords for different systems.

### Goal
In this tutorial, we will develop a Flutter app that uses one's voice as the password. This app will allow the user to input their password by speaking instead of typing. We will use the Google Voice API to convert the user's spoken password into text.

### Step 1 - Getting started
We first need to create a new Flutter project. To do this, we run the following command:

```bash
 flutter create voice_password
```

Let's change the default code in the `main.dart` file, as shown below. The code will display an empty text field on-screen. 

We will use a custom class called `PasswordTextField` instead of the `TextField` widget from the Flutter library. This class will allow us to capture the user's input and verify it with the Google Voice API.

```dart
class App extends StatefulWidget {
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

Let's have a look at the code above. Our `PasswordTextField` implements a `TextEditingController` interface from Flutter to capture user input. The app then saves passwords in a file called `voice_password.txt`. 

This file is inside the app's local storage directory. This way, we can ensure that the password is only visible to us and not accessible to other apps on a user's device.

### Step 2 - Displaying an error message
We use the `print()` method, to display the error message from Google Voice API. For this to work, we should import the following package:

```dart
import 'dart:io';
```

We can now run the app on our device or emulator. Once we enter a `password` and click on the `save` button, it will be stored in a file called `voice_password.txt`. 

Let's go ahead and try using this password to log into our app. When we enter the password, instead of seeing it been typed on the screen, it will be spoken out loud.

This is how easy it is to use Google Voice API in Flutter applications. It provides an extra layer of security by hiding passwords from prying eyes.

### Step 3 - Using the Google Voice password
Now that we have our Google Voice password, let's see how we can use it in our app.

We need to update our `print()` method to log the error message returned from Google Voice API. Add the following code at the bottom of the `main.dart` file.

```dart
void _print(String msg) => print(msg);
```

To update our login action to use the Google Voice password, we need to create a variable in the `LoginPage` class called `googleVoicePassword`. This variable is of type `String`. 

Inside this method, we will create an instance of `GooglePlayServicesUtil` along with our `googleApiClient`. This allows us to read the error code from the Google Voice API and display a `DialogBox ` if it exists.

```dart
Future<String> getGoogleVoicePassword() async {
    final String rez = await GooglePlayServicesUtil.getErrorDialog(googleApiClient,errorCode: GOOGLE_VOICE);
    if (rez != null) return rez;
}
```

Next, convert the password to a byte array. We will then save these values to a file:

```dart
byte[] bytes =Encoding.UTF8.encode(password).toBytes();
```

We should also create a new `FileOutputStream` with our file location, as demonstrated below:

```dart
FileOutputStream fos = new FileOutputStream(file);
```

Write the byte array to the file, as follows:

```dart
fos.write(bytes);
if (!Directory.exists(storageDir)) Directory.create(storageDir);

saveGoogleVoicePassword(file).then((_) => print("Saved voice password to $file"));
```

We also created a new method called `getGoogleVoicePassword()` which is of type `Future<String>`. Inside this method, we use the `GooglePlayServicesUtil` class. 

This class gets the error dialog from the Google Voice API. We then check if this dialog exists and, if it does, we return the dialog box's text.

Next, we need to convert our password to a byte array. We can do this using the `Encoding.UTF8.encode()` method. We write this byte array to a file called `voice_password.txt` in our app's local storage.

Remember to add the following line of code at the top of our main.dart file.

```dart
import 'dart:async';
```

This allow us to use the `Future<String>` type inside our `getGoogleVoicePassword()` method.

We then update the `loginState` method inside the `LoginPage` to save this password. Inside the `if (googlePlayServices) {...}` statement, we add the following code to call our `getGoogleVoicePassword()` method:

> The returned value is used as the second parameter in the `FileSavePicker()` method.

```dart
if (googlePlayServices) {

    String password = getGoogleVoicePassword();
    FileSavePicker savePicker = new FileSavePicker(file);
    savePicker.pickAsFile(password).then((Path file) {
        // TODO: Use the path returned from pickAsFile to create and save a file.
    });

}
```

We need to update our `print()` method to display the path of the file chosen by the user.

```dart
void _print(String msg) => print(msg);
```

Finally, update our `saveGoogleVoicePassword()` method to take in the `path` as a parameter.

```dart
Future<void> saveGoogleVoicePassword(String password) async {
    final String rez = await GooglePlayServicesUtil.getErrorDialog(googleApiClient, errorCode: GOOGLE_VOICE);
    if (rez != null) return rez;
    var storageDir = await getApplicationDocumentsDirectory();
    var voicePasswordFilePath = Path.join(storageDir, 'voice_password.txt');
    if (!Directory.exists(storageDir)) Directory.create(storageDir);
    var file = File('$voicePasswordFilePath');
    await file.writeAsBytesAsync(password);
    file.close();
}
```

### Step 4 - Testing the application
We can now run our app and log in using our Google Voice password. After we have logged in, we can open the `voice_password.txt` file to see the contents.

>Note that the voice password is stored at: `C:\Users\username\AppData\Local\Temp\flutter_test\voice_password.txt`.

### Conclusion
Congratulations! You have developed an app that stores users` voice passwords and uses them to verify their identity. 

You can, therefore, use the knowledge gained from this article to craft other beautiful and quality Flutter applications.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
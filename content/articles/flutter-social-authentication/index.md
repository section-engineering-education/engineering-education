---
layout: engineering-education
status: publish
published: true
url: /flutter-social-authentication/
title: Getting Started with Flutter Social Authentication
description: This article will explain a step by step process on how to implement social authentication in a Flutter application.
author: jerim-kaura
date: 2021-06-16T00:00:00-18:00
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/flutter-social-authentication/hero.jpg
   alt: Getting started with Flutter social authentication
---
Social authentication is an authentication technique in which one uses an existing account to log into or create a new account in another application. Besides levying a user on constantly remembering multiple passwords, social authentication eases the registration process and improves security.
<!--more-->
### Introduction
Google provides a platform for integrating social authentication with Firebase. A programmer only needs to generate an SHA1 key and configure it with his/her machine.

### Goal
This article aims to guide the readers through a step-by-step understanding and implementation of social authentication in Flutter while narrowing it down to Google and Facebook.

We will build an authentication project in Flutter and implement social authentication using Facebook and Google. In the end, a user should be able to login into the application by choosing either of the two from the login screen.

### Prerequisites
1. A basic understanding of Flutter and Dart Language.
2. [Flutter SDK](https://flutter.dev/) installed on your computer.
3. [Android Studio](https://developer.android.com/studio), or [VS Code](https://code.visualstudio.com/download) installer.
4. A mobile emulator or a mobile device to test the project.

### Project overview
We will create two screens, one screen for logging in and the second screen as the home screen that can only be accessed once a user is authorized.

On the login screen, a user chooses whether to log in with Facebook or with Google. Depending on the method a user chooses, the app calls a function to authorize the user and redirect him/her to a home screen where we display their name and profile image fetched from the social account selected.

The home screen has a `log out` button the logs the user out and takes them to the login screen once more.

### Project setup
Create a new Flutter application. You can follow [this](/engineering-education/flutter-web-application/) guide to create the new application.

We will do most of the coding in the `lib` folder. In the `lib` folder create a folder called `services`. In this folder, create a file called `authservice.dart` to authorize logic for the application.

Next, create another folder called `Screens` and add two files; `login.dart`, and `homepage.dart` in the folder. These are the UI files rendered for the users.

The final project structure should look like this:
```bash
lib
┣ Services
┃ ┣ authService.dart
┃ ┗ googleSignIn.dart
┣ Screens
┃ ┗ homeScreen.dart
┃ ┗ loginScreen.dart
┗ main.dart
```

### Adding login dependencies
We need the following dependencies for our project.
- `firebase_core`. This dependency will allow us to connect multiple Firebase apps to our Flutter project.
- `firebase_auth`. This plugin will enable us to use Firebase Authentication API.
- `flutter_login_facebook`. To call Facebook login SDK on Android and IOS.
- `google_sign_in`. To enable login with Google.

Add the snippets below in the `pubspec.yaml`.

```dart
dependencies:
flutter:
sdk: flutter
firebase_core:
firebase_auth:
flutter_login_facebook:
google_sign_in:
```

### Firebase configuration
Firebase is used as our database and to provide the Authentication API as well.
1. Create a new Firebase project if you don't have one yet. You can follow [this guide](https://codinglatte.com/posts/how-to/how-to-create-a-firebase-project/) for the creation process.
2. Under the project, select authentication, then enable `Facebook` and `Google`.
3. For the case of Facebook. We need APP_ID and APP_SECRET. We can obtain these from Facebook Developer Console.
4. Head over to [Facebook Developer Console](https://developers.facebook.com/).
2. Click on `My Apps`.
3. Click the `Create App` button.
4. Select `Business` then continue.
5. Enter your `App Name`, `Contact Email` and `App Purpose` then, continue to create the app.
6. In the dashboard, click `basic` under `settings`. You will be redirected to a page showing the App_ID` and secret as shown below.

![AppId and Secret](/engineering-education/flutter-social-authentication/app-id.png)

7. Copy the App_id and Secret then, paste to the fields we left empty on the Facebook sign-in method.
8. Copy the `OAuth redirect URI` we need to set up our app with Facebook.

![OAuth redirect URI](/engineering-education/flutter-social-authentication/auth-redirect-url.png)

### Setting up Facebook Auth
1. In the Facebook console, head over to the dashboard.
2. Click setup Facebook login.

![Setup Login](/engineering-education/flutter-social-authentication/setuplogin.png)

3. On the next page, select `Android`.

![Select android](/engineering-education/flutter-social-authentication/android.png)

4. In your `AndroidManifest` file, copy the package name of your app and paste it into the package name field.
5. For the default activity name, use `youp_packagename.MainActivity`.

![Package name](/engineering-education/flutter-social-authentication/package.png)

6. We need to generate a Development Key Hash. 

Paste the command below in your terminal:
```bash
keytool -exportcert -alias androiddebugkey -keystore "C:\Users\USERNAME\.android\debug.keystore" | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" sha1 -binary | "PATH_TO_OPENSSL_LIBRARY\bin\openssl" base64
```

>Note that you should have openssl-for-windows and JDK installed for Windows users. 

If you use macOS, use the command below:

```bash
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

7. This generates a key hash unique to your development environment. Copy and paste it into the `key hashes` field. Save then continue.

The last thing to do is to add the `OAuth redirect URI` copied from the Firebase console. From the left sidebar menu, select Facebook login then, settings, paste the copied text into the `Valid OAuth Redirect URIs` field.

![Auth Redirect Url](/engineering-education/flutter-social-authentication/auth-redirect.png)

### Setting up the AndroidManifest.xml File
Navigate to `/app/res/values` then create a string resource file named `strings.xml`. 

Add the snippets below into that file.
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Social Auth</string>
    <string name="facebook_app_id">YOUR_APP_ID</string>
    <string name="fb_login_protocol_scheme">fbYOUR_APP_ID</string>
</resources>
```

Next, head to `/app/manifest/AndroidManifest.xml ` then enable internet permission by adding the snippets below after the application element.
```xml
<meta-data android:name="com.facebook.sdk.ApplicationId"
    android:value="@string/facebook_app_id"/>
<activity android:name="com.facebook.FacebookActivity"
    android:configChanges=
        "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
    android:label="@string/app_name" />
<activity
    android:name="com.facebook.CustomTabActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="@string/fb_login_protocol_scheme" />
    </intent-filter>
</activity>
```

### Privacy policy URL
For the Facebook login to function, you must include a link that specifies the privacy policy for your application. Follow [this link](https://app.freeprivacypolicy.com/) to create a free privacy policy link.
Once you obtain the URL, head to the developer console under settings/basic, then paste the URL in the `Privacy Policy URL` field then, save.

### Facebook public profile access
1. In the developer's console dashboard, go to App review.
2. Under `Permissions and Features` request advanced access for the public profile.
3. Your app should now be able to access a Facebook profile. 
4. Access for the public profile.

![Public Profile Access](/engineering-education/flutter-social-authentication/access.png)

Now that we are all set, let's get into coding!

### Creating the Auth service providers

#### Import the dependencies
In the `authService.dart` file, add the following block of code to import the dependencies for the application.
```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_login_facebook/flutter_login_facebook.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../Screens/homeScreen.dart';
import '../Screens/loginScreen.dart';
```

#### Creating the Auth Service class
We will create a class of the following functions:
- `handlingAuthStatus()`: This function checks the authentication status of a user and redirects them to either loginScreen or homeScreen.

```dart
class AuthService {
    //Determine if the user is authenticated and redirect accordingly
    handleAuthState() {
        return StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (BuildContext context, snapshot) {
            if (snapshot.hasData) {\
			// user is authorozed hence redirect to home screen
            return HomePage();
            } else
			// user not authorized hence redirect to login page
            return LoginPage();
        });
    }
}
```

- `SignInWithFacebook()`. This function enables a user to be authenticated with the Facebook authentication API.
```dart
signInWithFacebook() async {
    final fb = FacebookLogin();
    // Log in
    final res = await fb.logIn(permissions: [
        FacebookPermission.publicProfile,
        FacebookPermission.email,
    ]);

    // Check result status
    switch (res.status) {
        case FacebookLoginStatus.success:
        // The user is suceessfully logged in
        // Send access token to server for validation and auth
        final FacebookAccessToken accessToken = res.accessToken;
        final AuthCredential authCredential = FacebookAuthProvider.credential(accessToken.token);
        final result = await FirebaseAuth.instance.signInWithCredential(authCredential);

        // Get profile data from facebook for use in the app
        final profile = await fb.getUserProfile();
        print('Hello, ${profile.name}! You ID: ${profile.userId}');

        // Get user profile image url
        final imageUrl = await fb.getProfileImageUrl(width: 100);
        print('Your profile image: $imageUrl');

        // fetch user email
        final email = await fb.getUserEmail();
        // But user can decline permission
        if (email != null) print('And your email is $email');

        break;

        case FacebookLoginStatus.cancel:
            // In case the user cancels the login process
            break;
        case FacebookLoginStatus.error:
        // Login procedure failed
        print('Error while log in: ${res.error}');
        break;
    }
}
```

- `signInWithGoogle()`. Provides the login to use an existing Google account for authentication.
```dart
Future<UserCredential> signInWithGoogle() async {
    // Initiate the auth procedure
    final GoogleSignInAccount googleUser = await GoogleSignIn(scopes: <String>["email"]).signIn();

    // fetch the auth details from the request made earlier
    final GoogleSignInAuthentication googleAuth = await googleUser.authentication;

    // Create a new credential for signing in with google
    final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
    );

    // Once signed in, return the UserCredential
    return await FirebaseAuth.instance.signInWithCredential(credential);
}
```

- `signOut()`. This function enables a logged-in user to log out and gets redirected to the loginScreen.
```dart
//log out the user
signOut() {
    FirebaseAuth.instance.signOut();
}
```

### Coding the app entry point
The app entry point is the `main.dart`. In this file we will call the `handleAuthState()` to determine if a user is authenticated or not. 

Add the snippets below to the `main.dart` file:
```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:social_auth/Services/authservice.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
	  // call method to check auth status
      home: AuthService().handleAuthState(),
    );
  }
}
```

### Working on the User Interface (UI)
We will need two screens, one for login and another for the homeScreen. In the login screen, we will have two clickable icons for Facebook and Google. Once an icon is clicked, it will call the corresponding function to initiate the authentication process. 

If the process is a success, the method returns the home screen, where we display the username and public profile picture of the currently logged-in user.

#### Login screen
Add the snippets below to the `logingScreen.dart` file under the scaffold class:

- Import Packages
```dart
import 'package:flutter/material.dart';
import 'package:social_auth/services/authservice.dart';
```

- Welcome text

```dart
//welcome text
Text("Hello, \nWelcome, login with,",
    style: Theme.of(context).textTheme.headline1.copyWith(fontSize: size.width * 0.1,)
),
```

- Social login icons
```dart
 Column(
    crossAxisAlignment: CrossAxisAlignment.end,
    children: [
        Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
				// Gesture detector for facebook Login
                GestureDetector(
                    onTap: () {
						// Call facebook login methon
                        AuthService().signInWithFacebook();
                    },
                    child: Image(width: 50, image: AssetImage('assets/icons/facebook.png')),
                ),
                SizedBox(width: 50),
				// Gesture detector for the Google icon
                GestureDetector(
                    onTap: () {
					// Call the a method to sign in with Google
                    AuthService().signInWithGoogle();
                    },
                    child: Image(width: 55, image: AssetImage('assets/icons/google.png'))
                ),
            ],
        ),
    ],
),
```

![Login Screen](/engineering-education/flutter-social-authentication/loginscreen.jpg)

![Select Fcaebook](/engineering-education/flutter-social-authentication/facebook.jpg)

![Select Google Account](/engineering-education/flutter-social-authentication/chooseaccount.jpg)

#### The home screen
Add the snippets below to the home screen. The snippets ensure that the user profile image and name fetched from either Facebook or Google is displayed, as well as a logout button.

- Import Flutter packages
```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:social_auth/services/authservice.dart';
```

- Fetching profile image
```dart
Container(
    width: 100,
    height: 100,
    child: CircleAvatar(
        radius: 50.0,
        backgroundColor: Colors.transparent,
		//display the user profile image
        backgroundImage: NetworkImage(FirebaseAuth.instance.currentUser.photoURL),
    ),
),
```

- Displaying the username
```dart
Text(
	// Obtaine display name of the current auth instance
    FirebaseAuth.instance.currentUser.displayName,
    style: TextStyle( fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black87),
),
```

- The Log-out button
```dart
MaterialButton(
    padding: EdgeInsets.all(10),
    color: Colors.green,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
    child: Text(
        'LOG OUT',
        style: TextStyle(color: Colors.white, fontSize: 15),
    ),
    onPressed: () {
		// 	log out the current user upon pressing the logoun button
        AuthService().signOut();
    },
),
```
![Home Screen](/engineering-education/flutter-social-authentication/homescreen.jpg)

### Verify the functionality
We need to verify that our application registered users. To do the verification, head over to the Firebase console for your project. Under authentication, click the users' tab. 

You should see your list of users ad below:

![Registered user](/engineering-education/flutter-social-authentication/users.png)

### Conclusion
In this article, we learned what social authentication is and how to implement it in a Flutter application. We built a user login and registration system that uses Facebook and Google for authentication. The system registered and logged-in users using their existing Facebook or Google accounts. 

This functionality is helpful as user credentials are already verified by the existing social accounts and besides, a user doesn't need to remember multiple passwords for every account they create.

You can find the code for this project [here](https://github.com/jerimkaura/flutter-book/tree/main/social_auth).

Happy coding!

### Further reading
You can find more about social authentication from the links below:
- [Flutter Guide](https://flutter.dev/docs/get-started/test-drive#create-app)
- [Social Authentication with Flutter](https://firebase.flutter.dev/docs/auth/social/)
- [Flutter Facebook Auth](https://pub.dev/packages/flutter_facebook_auth)
- [Using Google Sign In](https://pub.dev/packages/google_sign_in)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)

## Implementing Fingerprint Authentication in Flutter

Fingerprint authorization refers to using fingerprint biometrics to authenticate a user into a system. Fingerprint authentication automatically compares a user's fingerprint to a stored fingerprint template stored in the device to validate a user's identity.

Biometric authentication provides safety because the biometrics are non-transferable, meaning they cannot be used by anyone else. This form of authentication requires less database memory and small storage space, hence, advantageous for large-scale applications.

This article will go through the implementation of fingerprint authentication in a Flutter application.

### Prerequisites

1. A solid understanding of the Dart programing language
2. A solid understanding of Flutter widgets

I assume that you already have Flutter installed on your PC. If not, visit [Flutter Docs](https://docs.flutter.dev/get-started/install) for full Flutter installation instructions before you proceed.

We will build our project using version 2.8.1 of Flutter.

We will use [Visual Studio Code](https://code.visualstudio.com/download) to build our project. [Android Studio](https://developer.android.com/studio) can also be configured for Flutter development by installing the Flutter plugin.

Let us get started!

### Installing Dependencies
Copy the following code and paste it inside your pubspec.yaml file in your project:

```dart
 //Added dependencies
  local_auth: ^1.1.10
  lottie: ^1.2.1
```
After pasting, right-click in the file and select `Get Packages` to add the dependencies to your project.

We have added two dependencies to our project: 

#### 1. Local Auth Dependency
This Flutter plugin allows your app to access fingerprint authentication credentials that are stored locally in your device, either Android or iOS.

Make sure to use the specified version of the dependency to avoid code differences.

#### 2. Lottie Dependency
This Flutter plugin will allow us to use Lottie animations in our project. We will use these animations to polish your app’s user interface and make it appealing. 

If you are new to Lottie animations, visit this [Lottie Animations](\engineering-education\content\articles\using-lottie-animations-in-flutter\) to get acquainted with Lottie animations knowledge.

#### 3. Adding Lottie Assets
Next, we will create a folder called `assets` in our project directory which will contain our downloaded Lottie JSON files.

```dart
 //To add assets to your application
  assets:
    - assets/
```
### Local Authentication Service

We create a folder called `services` inside our lib folder in our project. Create a dart file called `local.auth.service.dart` where we will create a class called `LocalAuthService` as shown:

```dart
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';

class LocalAuthService {}
```
We have imported two packages here as shown above which will be used by our class.
Our class will do two things:

1. Check if the device running the application supports fingerprint biometrics
2. Perform authentication if the fingerprint biometrics are supported by the device

Our first block of code will check the availability of biometrics in our device. It is as shown below:

```dart
static final _auth = LocalAuthentication();

  //check if biometrics are available on the device
  static Future<bool> hasBiometrics() async {
    try {
      return await _auth.canCheckBiometrics;
    } on PlatformException catch (e) {
      e.toString();
      return false;
    }
  }
```
We create the `hasBiometrics()` method which returns a boolean

Biometric types are already defined in our `local_auth` plugin as either face, fingerprint, or iris. But in our case, we will only look at fingerprints.

After the availability of biometrics is checked. Authentication is initiated if the biometrics are available. Otherwise, an error message is displayed.
The block of code below authenticates the user into the system if biometrics are available on the device:
```dart
//authenticate user if biometrics are available
  static Future<bool> authenticate() async {
    final isAvailable = await hasBiometrics();
    if (!isAvailable) {
      return false;
    } else {
      try {
        return await _auth.authenticate(
            localizedReason: "Scan Fingerprint to Authenticate",
            useErrorDialogs: true,
            stickyAuth: true);
      } on PlatformException catch (e) {
        e.toString();
        return false;
      }
    }
  }
```

The `localisedReason` method appears as a text on the authentication dialog when the user is authenticating.

The `useErrorDialogs` method allows the system to display an error message in case an error occurs. For instance, the user may have biometrics but the fingerprint biometrics have not been enrolled on the device.

The `stickAuth` method makes the authentication dialog that appears to stay on top of the app interface even when the user switches to other apps in the background.

### Android Integration

We need to integrate local authentication in our app so that we can be allowed to use fingerprint authentication in our app.

Go to the AndroidManifest.xml file of your project directory. The path is as shown below:

![Path to AndroidManifest.xml](engineering-education\content\articles\implementing-fingerprint-authentication-in-flutter\ProjectDirectory.png)

In the `AndroidManifest.xml` file add the `uses-permission` code as shown below:
```dart
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.fingerprint_auth">
    <uses-permission android:name="android.permission.USE_FINGERPRINT"/>
   <application
        android:label="fingerprint_auth"
        android:icon="@mipmap/ic_launcher">
```

Next, go to the `kotlin` folder and  open the `MainActivity.kt` file and replace the code in the file leaving only the package name which is usually the first line with the following code:

```dart
import io.flutter.embedding.android.FlutterFragmentActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugins.GeneratedPluginRegistrant

class MainActivity: FlutterFragmentActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        GeneratedPluginRegistrant.registerWith(flutterEngine)
    }
}
```

### Designing the User Interface

We have created two pages for our app: the login page and the home page.

#### 1. Login Page UI

Below is the code for our login page UI:

```dart
import 'package:fingerprint_auth/home.dart';
import 'package:fingerprint_auth/services/local.auth.service.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController lottieController;

  @override
  void initState() {
    super.initState();

    lottieController = AnimationController(
      vsync: this,
    );

    lottieController.addStatusListener((status) async {
      if (status == AnimationStatus.completed) {
        lottieController.stop();
      }
    });
  }

  @override
  void dispose() {
    lottieController.dispose();
    super.dispose();
  }

  bool _authenticating = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Local Authentication"),
          centerTitle: true,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                "Fingerprint Authentication",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              Lottie.asset(
                  _authenticating
                      ? "./assets/scan.json"
                      : "./assets/correct.json",
                  height: 250,
                  width: 250,
                  animate: true,
                  repeat: false,
                  controller: lottieController, onLoaded: (composition) {
                lottieController.duration = composition.duration;
                lottieController.forward();
              }),
              ElevatedButton.icon(
                  onPressed: () async {
                    final isAuthenticated =
                        await LocalAuthService.authenticate();
                    if (isAuthenticated) {
                      setState(() {
                        _authenticating = false;
                        lottieController.reset();
                        lottieController.duration =
                            const Duration(seconds: 3);
                      });
                      Future.delayed(const Duration(milliseconds: 3500), () {
                        Navigator.of(context).pushReplacement(
                            MaterialPageRoute(
                                builder: (context) => const HomePage()));
                      });
                    } else {
                      ScaffoldMessenger.of(context)
                          .showSnackBar(const SnackBar(
                        content: Text(
                            'Oops! Fingerprint Biometrics Not Available'),
                      ));
                    }
                  },
                  icon: const Icon(Icons.lock_open),
                  label: const Text("Authenticate")),
            ],
          ),
        ));
  }
}
```

We created a stateful widget and to our state, we used `SingleTickerProviderStateMixin` which will allow us to use an animation controller for our Lottie animations.

We have used a conditional operator for our Lottie animation meaning that, an animation is played when the user is not authenticated by the system. Otherwise, another animation is played. This has been applied in the `Authenticate` button which we have called our `authenticate()` method that we created in our class. This method as explained earlier; checks if biometrics are available and automatically authenticates the user when the biometrics match.

```dart
final isAuthenticated = await LocalAuthService.authenticate();
```

If biometrics are not found then a snack bar is displayed with the error message.

We added a Future.delayed() function to delay the next instruction for a few milliseconds to give time for the animation to be played before navigating to the home screen. It is as shown:

```dart
Future.delayed(const Duration(milliseconds: 3500), () {
  Navigator.of(context).pushReplacement(
    MaterialPageRoute(
      builder: (context) => const HomePage()));
});
```

#### 2. Home Page UI

Below is the code for our home page UI:
```dart
import 'package:fingerprint_auth/login.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home Screen"),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Lottie.asset(
              "./assets/successful.json",
              height: 200,
              width: 200,
              animate: true,
              repeat: false,
            ),
            const Text(
              "Authenticated Successfully!",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 24,
            ),
            ElevatedButton.icon(
                onPressed: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                      builder: (context) => const LoginScreen()));
                },
                icon: const Icon(Icons.logout),
                label: const Text("Log Out")),
          ],
        ),
      ),
    );
  }
}
```
 The home page contains are Lottie animation which is displayed when authentication was successful. The user can log out of the system using the log out button which navigates the user to the login page as shown above.

 This is what the app looks like:
 
 ![Fingerprint Authentication in Flutter](engineering-education\content\articles\implementing-fingerprint-authentication-in-flutter\FingerprintAuth.gif)

 ### Conclusion
In this article, we have gone through the implementation of fingerprint authentication in a Flutter application. We have also recapped the use of Lottie animations in Flutter applications. 

This knowledge can be applied widely to come up with even better applications as far as local authentication and Lottie animations are concerned.

Happy coding!
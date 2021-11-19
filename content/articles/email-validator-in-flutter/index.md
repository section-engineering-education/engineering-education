Email validator is a Flutter package that checks whether an email is valid or not. It is not based on regular expression, but rather checks if the email is linked to a reliable domain. Examples of domains that exist include :Gmail, Yahoo, Outlook, among others.
<!--more-->
### Key takeaways
- What is an email validator?
- Explaining how an email validator works.
- Create a simple app to show email validator.
- Understand the implementation of email validator.

### How email validator works
Email validator runs a check on the emails through a process called `swift process`. This process detects typographical errors or deliberate mistakes. Furthermore, it helps to organize and clean all email addresses.For this reason, it protects the email sender score while maximizing the efficiency of the flutter application. 
### 
key concepts from the use of this package:
- validity
- risk .
### What the package contains
- Constructor
The constructor for this class is pretty simple.To do this Create a new instance of this class and set the validator type to either 1 or 2 (defaults to 1). The constructor should pass a string or an array of strings for validation.
- Arguments
The arguments are also key factors.
The first argument is self-explanatory. It is just a boolean that specifies whether we are using the `local-part@domain.com` format or `domain.com` as our string to validate.

The second argument allows you to pass an array of strings that are valid domains for the email. This argument is only necessary if the string passed in as our first argument is in `domain.com` format; otherwise, it can be omitted.

If either of the first two arguments contains an error, then false should be returned. Otherwise, true should be returned, and our string should be validated.

### Benefits of email validator
1. Makes sure the user enters a correctly formatted email address while signing up.
2. Ensures emails are not on the blocklist and are not sent to blacklisted email addresses or domains.
3. Alerts if the username is available on the website during the registration process.
4. Validate email on both Android and iOS.
5. Allows you to add your custom email validator for additional business requirements.
6. You can add it as a pre-requisite while submitting the app to the app store and google play store for review purposes.
7. Validate email address on input focus and/or submit button click event of any flutter or dart app.

### Areas of application
- Address CaptureSingle-line Address Verification Software.
- Address VerifyAddress Enhancement.
- Data CleanseBatch Data Cleanse & Maintenance.
- Bank VerificationBank Account, Sort Code & IBAN Validation.
- GeocodeLongitude & Latitude Data.
- Email ValidationCheck and Verify Email Addresses.
- This example brings us to the understanding usage of this API for serverless flutter applications.

### Why Email Validator?
Email validator works better in that it is a more accurate validation tool. In addition to validating email addresses, it also checks that domains are not likely to exist soon.

Domain Validation Tool is a free service that allows you to search up to 500 domains from your list for availability and immediate results. It's the most potent domain availability checker available on the internet today. You can quickly check up to 500 domains from your list for availability and receive immediate results.

### Implementation in the App
### Prerequisites
- [Android Studio](https://developer.android.com/studio) or [Visual Code](https://code.visualstudio.com/) installed on your computer.
- Understand how to create and run Flutter applications.
- Understand the basics of flutter like widgets and making calls.
- Basic knowledge of [Dart](https://dart.dev/) programming language.

### Core concepts in the example.
- Testing the validity of email addresses.

### Installation of the package
- Step 1 - Adding the dependency

```yaml
dependencies:
  email_validator: "^1.0.6"
```

- Step 2 - run Pub get

```cmd
>pub get
```

- Step 3 - Importing the package

```dart
import 'package:email_validator/email_validator.dart'
```

### Project overview
The project will have a submission form integrated with the `email validator` package that listens to user input. When the user enters the inputs an email or the password, the email validator will listen throughout if the data is valid.

- Step 1 - Create a new flutter project.
  Open your terminal and execute the following command to create a new flutter project.

```cmd
flutter create my-project-name
```

- Step 2 - Replace all the code in the `main.dart` with the snippet below:

```dart
//import for all the packages required
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';//imports the email validator package
import 'second_screen.dart';//import for the second page after email validation
import 'package:get/get.dart';//imports required components from get dart class
void main() {
  runApp(const RealApp());//starts the app
}
class RealApp extends StatelessWidget {
  const RealApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Email Validator',
      home: const FirstPage(),
    );
  }
}
class FirstPage extends StatefulWidget {
  const FirstPage({Key? key}) : super(key: key);
  @override
  FirstPageState createState() => _FirstPageState();
}
class _FirstPageState extends State<MyHomePage> {
  late String _email;
  @override
  Widget build(BuildContext context) {
    final _emailController = TextEditingController();//decalring email variable
    final myformKey = GlobalKey<FormState>();//declaring the formkey valiable
    return Scaffold(//will hold the body and widgets in it
      body: Form(
        key: myformKey,
        child: Align(
          alignment: Alignment.center,//places the element at the center
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextFormField(
                  decoration: const InputDecoration(
                    hintText: 'john@gmail.com',
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                  ),
                  controller: _emailController,//calling controller
                  validator: (val) {
                    if (!EmailValidator.validate(val!, true)) {
                      return 'Invalid';
                    } else {
                      Get.to(() => const SecondScreen());
                    }
                  },
                  onSaved: (val) => _email = val!,
                ),
                const SizedBox(
                  height: 20,
                ),
                ElevatedButton(
                  onTap: () {
                    formKey.currentState?.validate();
                  },
                  child: const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text(
                      'Validate',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

This is where all the code we need to run for the page is. This page contains:
text field, button labels, amongst other widgets.

- Step 3 - Create a second page to navigate to after the validation.
  Create a new file in the lib folder and call it `secondpage.dart`. Then, in the same file, add the snippets below.

```dart
//import are here
import 'package:flutter/material.dart';
class SecondScreen extends StatelessWidget {
  const SecondScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: const Center(
        child: Text('Welcome to the Second Page'),
      ),
    );
  }
}
```

- Step 4 - Run the application to check the validation
  We need to confirm if the application works perfectly and our validator works as desired. You need to ensure you set up an emulator or a mobile device set up to run the application.

Execute the command below to run the application.

```cmd
flutter run 'name-of-the-device'
```

or you can run using a browser

```cmd
flutter run -d
```

Below are screenshots showing the expected results.

|                                        Trying login without filling in any detail                                        |                                        inValid email input                                        |
| :----------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
| ![Trying login without filling in any detail](/engineering-education/flutter-email-validator/missingemail.jpg) | ![inValid email input](/engineering-education/flutter-email-validator/invalidemail.jpg) |

|                                       Valid email input                                       |                                         After running and valid email                                         |
| :-------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| ![Valid Email Input](/engineering-education/flutter-email-validator/validemail.jpg) | ![After running and valid email](/engineering-education/flutter-email-validator/validatedemail.jpg) |

### Conclusion
Email validator is one of the best ways to confirm emails in Flutter. It helps to reduce the invalid emails that users may use to sign up and help one easily maintain the available emails.

I recommend any programmer to use any flutter application due to its' compatibility with all levels of flutter application, be it flutter web application, flutter mobile application, or any other application.

### References
- [https://pub.dev/documentation/email_validator/latest/](https://pub.dev/documentation/email_validator/latest/)

---

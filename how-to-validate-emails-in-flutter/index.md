### How to validate emails in Flutter 

### Topics to handle:
- What is an email validator?
- Explaining how an email validator works.
- Create a simple app to demonstrate email validator.
- Understand the implementation of email validator.


### What is Email validator? 
Email validator is a package used in Flutter to check whether a given email address meets the criteria that have been set to confirm a valid email address. Email Address is not based on regular expression but checks if the entered email is linked to a reliable domain i.e. Domain that exists like Gmail, Yahoo, or Outlook

### How does it works?
Email validator runs a check on the emails called `swift process` that detects typographical errors or deliberate mistakes. This package is also helping to organize and clean the email addresses that are present and protects email sender scores maximizing the efficiency of the email validator. The key concepts that this package checks for are validity, risk, the invalidity of any email address.

### Importance of Email validator
- improves the deliverability of messages to emails by eliminating all invalid emails from the emails present.
- Improve application performance by not sending mails to 
  
This tutorial is meant to bring us to the understanding of how one can use this API for serverless flutter applications.

### Prerequisites
- [Android Studio]() or [Visual Code](https://code.visualstudio.com/) installed on your computer.
- Understand how to create and run flutter applications.
- Understand the basics of flutter like Widgets and making calls.
- Basic knowledge of [dart](https://dart.dev/)Programming Language.

### Core Concepts
- Validity - This is the existance of an email address and has no errors.  
- Risk
- Invalid - check if an email contain typos errors.

### Installation of the package
### Step1. Adding the dependency

```yaml
dependencies:
    email_validator: '^1.0.6'
``` 

### Step2. run Pub get 
```cmd
>pub get
```
### Step3. Importing the package
```dart
import 'package:email_validator/email_validator.dart'
```

### An Example in Flutter

### Brief explanation of what the project does
When the user enters an input whether the email or the password. The email validator listens throughout if the data is valid with the help of the validator.


### Step1. Create a new flutter project:
open your terminal and type the following
The code below creates a new flutter project.

```cmd
flutter create my-project-name
```

### Step2. Replace all the code in the main dart with this code:

There is where all the code we need to run for the page has been coded. It contains the text field, button, labels amongst other widgets all to demonstrate the email validator functionality.
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
### Step3. Create secondpage. dart 
For this page Users will land on it if the email entered is valid.
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
### Step4. Run the application to check the validation
To run the code to confirm if the email validator works as the expected type
```cmd
flutter run 'name-of-the-device'
```
or you can run using a browser
```cmd
flutter run -d
```
Below are screenshots showing the expected results

![Trying login without filling in any detail](/engineering-education/how-to-validate-emails-in-flutter/missingemail.jpg)
![inValid email input](/engineering-education/how-to-validate-emails-in-flutter/invalidemail.jpg)


![Valid email input](/engineering-education/how-to-validate-emails-in-flutter/validemail.jpg)

![After running and valid email](/engineering-education/how-to-validate-emails-in-flutter/validatedemail.jpg)


For more details on the project Reachout @ [this GitHub repository](https://github.com/jonikano/).

### Conclusion
Email validator is one of the best ways to validate emails in  Flutter. It helps to reduce the invalid emails that users may use to sign up and also help one to easily maintain the available emails. I would recommend one to use this for any flutter project because it is compatible with all levels of flutter application be it flutter web application, flutter mobile application, or any other application.  

### References:
- https://pub.dev/documentation/email_validator/latest/
- https://pub.dev/documentation/email_validator/latest/
Enjoy Coding !!!

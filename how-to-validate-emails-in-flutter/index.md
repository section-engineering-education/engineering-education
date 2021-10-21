### Introduction
#### Key take aways.
- What is an email validator?
- Explaining how an email validator works.
- Create a simple app to show email validator.
- Understand the implementation of email validator.

### What is Email Validator? 
Email validator is a  Flutter package that checks whether an email is valid or invalid. It is not based on regular expression but checks if the email entered is linked to a reliable domain. Domains that exist are Gmail, Yahoo, or Outlook, among others.

### How does it works?
Email validator runs a check on the emails through a process called `swift process`. This process detects typographical errors or deliberate mistakes. Furthermore, it helps to organize and clean all email addresses in the flutter application. 

Thus protecting the email sender score maximizing the efficiency of the flutter application. The key concepts from the use of this package are validity, risk, the invalidity of any email address.

### Importance of Email validator
- Improving the deliverability of messages to emails by eliminating all invalid emails.
- Improve application performance by not sending mails to 
  
This tutorial brings us to the understanding usage of this API for serverless flutter applications.

### Prerequisites
- [Android Studio](https://developer.android.com/studio) or [Visual Code](https://code.visualstudio.com/) installed on your computer.
- Understand how to create and run flutter applications.
- Understand the basics of flutter like Widgets and making calls.
- Basic knowledge of [dart](https://dart.dev/)Programming Language.

### Core Concepts
- Validity - This is the existence of an email address and has no errors.  
- Risk
- Invalid - check if an email contains typos errors.

### Installation of the package
- Step1. Adding the dependency

```yaml
dependencies:
    email_validator: '^1.0.6'
``` 

- Step2. run Pub get 
```cmd
>pub get
```
- Step3. Importing the package

```dart
import 'package:email_validator/email_validator.dart'
```

### Project overview
The project will have a submision form integrated with the `email validator` package that listens to user input. When the user enters the inputs an email or the password, the email validator listens throughout if the data is valid with the help of the validator package.

- Step1. Create a new flutter project.
open your terminal and execute the following command to create a new flutter project.

```cmd
flutter create my-project-name
```

- Step2. Replace all the code in the main dart with the snippet below:

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

This is where all the code we need to run for the page is. This Page contains : `text field`, `button`, `labels` amongst other widgets.

- Step3. Create a second page to navigate to after the validation.
Create a new file in the lib folder and call it `secondpage.dart`. In the same file, add the snippets below.

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

- Step4. Run the application to check the validation
At this point, we need to confim if the application works perfectly and our validaor works as desired. You need to ensure you have an emulator setup or a mobile device setup to run the application. Execute the command below to run the application.

```cmd
flutter run 'name-of-the-device'
```

or you can run using a browser

```cmd
flutter run -d
```

Below are screenshots showing the expected results

![Trying login without filling in any detail](missingemail.jpg)
![inValid email input](invalidemail.jpg)

![Valid email input](validemail.jpg)

![After running and valid email](validatedemail.jpg)


For more details on the project, feel free to Reachout @ [this GitHub repository](https://github.com/jonikano/).

### Conclusion
Email validator is one of the best ways to confirm emails in  Flutter. It helps to reduce the invalid emails that users may use to sign up and help one easily maintain the available emails. 

I recommend any programmer to use any flutter application due to its' compatibility with all levels of flutter application, be it flutter web application, flutter mobile application, or any other application.  

### References:
- https://pub.dev/documentation/email_validator/latest/
- https://pub.dev/documentation/email_validator/latest/
Enjoy Coding.

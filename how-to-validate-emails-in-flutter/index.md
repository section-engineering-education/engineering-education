### Introduction
#### Key takeaways.
- What is an email validator?
- Explaining how an email validator works.
- Create a simple app to show email validator.
- Understand the implementation of email validator.

### What is Email Validator? 
Email validator is a  Flutter package that checks whether an email is valid or invalid. It is not based on regular expression but checks if the email entered is linked to a reliable domain. Domains that exist are Gmail, Yahoo, or Outlook, among others.

### How does it works?
Email validator runs a check on the emails through a process called `swift process`. This process detects typographical errors or deliberate mistakes. Furthermore, it helps to organize and clean all email addresses in the flutter application. 

Thus, protecting the email sender score while maximizing the efficiency of the flutter application. The key concepts from the use of this package are validity, risk, the invalidity of any email address.

The email validator package consists of a class and a function. It takes an input string and checks whether it is a valid email address or not, which can be either in the local-part@domain.com format or just in domain.com format.

The constructor for this class is pretty simple: Create a new instance of this class and set the validator type to either 1 or 2 (defaults to 1). The constructor should pass a string and an array of strings for validation.

The first argument is pretty self-explanatory. It is just a boolean that specifies whether we are using the local-part@domain.com format or domain.com as our string to validate. 

The second argument allows you to pass an array of strings that are valid domains for the email. This argument is only necessary if the string passed in as our first argument is in domain.com format; otherwise, it can be omitted entirely.

The `EmailValidation()` constructor requires two arguments to function correctly: a boolean saying whether or not we should validate a local-part@domain.com address and an array of valid domains for the email.

The function accepts these two arguments in that order, followed by our string to validate as the last argument. If either of the first two arguments contains an error (a boolean with no value or not true/false and an empty array), then false should be returned. Otherwise, true should be returned, and our string should be validated.

The first two arguments specify whether we are trying to validate a local-part@domain.com or domain.com format email address, and the third argument is the string to validate as an email address. The function returns false if either of the first two arguments is an empty array or not a boolean. If so, it returns true and validates the passed string.

The function accepts three arguments: whether we should validate using the domain.com format, the string to validate as an email address, and finally, the email address itself. 

The function returns false if either of the first two arguments is an empty array or not a boolean. If so, it returns true and validates the passed string.


### These are the benefits of using email validator in flutter apps:
1. Makes sure the user enters a correctly formatted email address while signing up.
2. Ensures emails are not on the blocklist and are not sent to blacklisted email addresses or domains.
3. Alerts if the username is available on the website during the registration process.
4. Validate email on both Android and iOS.
5. Allows you to add your custom email validator for additional business requirements.
6. You can add it as a pre-requisite while submitting the app to the app store and google play store for review purposes.
7. Validate email address on input focus and submit button click event of any flutter or dart app.

Another great benefit is that the email validator plugin can be used in both Android and iOS apps. Unfortunately, there are no email validation plugins available for flutter developers except this one. 

If you want to validate an email before sending it or if you want to make sure your user entered a correctly formatted email address while signing up, this is one of the best plugins.

The email validator plugin has implemented this functionality with an easy to use API. In addition, you can make sure that your users are not sending emails to blocked email addresses or domains by adding a custom blacklist validation check on your own. 

Apart from checking user-entered email addresses, you can check if a username is available on the website during the registration process or implement SSO validation, which is very important for your application.

### Areas of application of email validator.
- Address CaptureSingle-line Address Verification Software.
- Address VerifyAddress Enhancement.
- Data CleanseBatch Data Cleanse & Maintenance.
- Bank VerificationBank Account, Sort Code & IBAN Validation.
- GeocodeLongitude & Latitude Data.
- Email ValidationCheck and Verify Email Addresses. 
- This example brings us to the understanding usage of this API for serverless flutter applications.
- 
### Why Email Validator?
Email validator works better in that it is a more accurate validation tool. In addition to validating email addresses, it also checks that domains are not likely to exist soon.

Domain Validation Tool is a free service that allows you to search up to 500 domains from your list for availability and immediate results. It's the most potent domain availability checker available on the internet today. You can quickly check up to 500 domains from your list for availability and receive immediate results.

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
The project will have a submission form integrated with the `email validator` package that listens to user input. When the user enters the inputs an email or the password, the email validator listens throughout if the data is valid with the help of the validator package.

- Step1. Create a new flutter project.
Open your terminal and execute the following command to create a new flutter project.

```cmd
flutter create my-project-name
```

- Step2. Replace all the code in the `main.dart` with the snippet below:

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
text field
button 
labels amongst other widgets.

- Step3. Create a second page to navigate to after the validation.
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

- Step4. Run the application to check the validation
We need to confirm if the application works perfectly and our validator works as desired. You need to ensure you set up an emulator or a mobile device set up to run the application. 

Execute the command below to run the application.

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


For more details on the project, feel accessible to Reachout @ [this GitHub repository](https://github.com/jonikano/).

### Conclusion
Email validator is one of the best ways to confirm emails in  Flutter. It helps to reduce the invalid emails that users may use to sign up and help one easily maintain the available emails. 

I recommend any programmer to use any flutter application due to its' compatibility with all levels of flutter application, be it flutter web application, flutter mobile application, or any other application.  

### References:
- https://pub.dev/documentation/email_validator/latest/
- https://pub.dev/documentation/email_validator/latest/
Enjoy Coding.

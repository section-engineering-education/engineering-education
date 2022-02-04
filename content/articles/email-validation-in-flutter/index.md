
In this article, we are going to learn how to validate emails using an email validator. We are going to develop a simple flutter application to show this.

  

### Introduction

The main motive of this article is to learn how to validate emails in Flutter applications. The mail will be validated for both serverless app and those that are server enabled. It means there will not be any backend or database for the service, it will work on the device itself. We are going to parse the email at the client's end and then pass it forward for validation.

For this example, We are using Flutter which provides the email validator package. Email validator is a Dart class for validating email addresses without using Reg Ex. Whenever there is some exception or validation fails, it will notify you on the screen with an alert view. It also shows how many times that particular mail(email) has failed in past attempts.

### Prerequisite

We assume that you already know flutter and dart programming language.

- Understand how to add packages in flutter application.

- Understand how to code flutter applications.

- Have vs code installed or any other code editor.

  
The minimum  requirement for this example is to use flutter in your system. We are using IntelliJ Idea 14 version editor with the dart plugin.

Table of content:

1. Introduction.

2. Prerequisite.

3. App Development.
	 - Step 1. Create a New Project and Add dependencies.
	 - Step2. Importing package for usage.
	 - Step3. Creating Input data Fields.
	 - Step4. Creating Simple Form to Contain Textfields and Buttons.
	 - Step5. Adding Validators.
5. Conclusion.

### App development

### Step 1. Create a New Project and Adding Dependencies.

To start with we need to create a new flutter project. If you know how to do this then go ahead and create it otherwise follow the steps below.
Open Android Studio, Click on Start a New Flutter Project. Fill in all the details required to create a new application. Once your app is ready, Open pubspec.yaml and add the below dependency
```dart
dependencies:
	flutter: sdk: flutter
	email_validator: 2.1.9
```
### Step2. Importing package for usage.

Now in your main.dart file add the code as shown in snippet below

```dart

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
void main(){
	runApp(new MyApp());
}
class MyApp extends StatelessWidget{
Widget build(BuildContext context) {
	return new MaterialApp(
		home: new Scaffold(
		appBar: new AppBar(
		title: new Text("Email Verifier")),
		),
	);
   }
}
```
In the file above we have just imported the dependencies to our file. If you run it it will just show title "Email Verifier". Let's add some widgets to our file to see where we can input our details.
### Step3. Creating Input data Fields.
Now we need to create a form where user can enter his email and password. For that we will be using a floating action button. The floating button will mainly pop for us form to add our details.
```dart
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
void main(){
	runApp(new MyApp());
}
class MyApp extends StatelessWidget{
Widget build(BuildContext context) {
	return new MaterialApp(
	home: new Scaffold(
		appBar: new AppBar(
			title: new Text("Email Verifier")),
		),
		floatingActionButton: const FloatingActionButton(
			onPressed: (){//add materialpageroute of the form file.
			},
		child: new Icon(Icons.add),
		),
	);
 }
}
```
### Step4. Creating Simple Form to Contain Textfields and Buttons.
We are going to create a simple form inside our main screen. We will have an email, password, and Login button. This page alone can show the purpose email validator without the use of the previous page above. All it does is, It collects the users data then the data is used by the email validator to verify if its valid or invalid.  
```dart
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
void main(){
 runApp(new MyApp());
}
class MyApp extends StatelessWidget{
Widget build(BuildContext context) {
	return new MaterialApp(
	home: new Scaffold(
	appBar: new AppBar(
	title: new Text("Email Verifier")),
	floatingActionButton: const FloatingActionButton(
		onPressed: (){},
	child: new Icon(Icons.add),
	),
	body:new Form( padding: const EdgeInsets.all(16.0),
	child:[
		new Column(
		children:[ new Flexible(
			child: new Text("Email"),
		),
		new Flexible(child:
		new TextField(),
		obscureText:true,
		decoration: new InputDecoration.collapsed( hintText: "Email",
	),
),
		new Flexible(child:

		new Text("Password"),), ], ), ));

	}
}
```
### Step5. Adding Validators.
Now let's add validation for email and password. This is the most important part. The Validate email method checks whether the data entered is a valid email or invalid email. If the email is valid it will add the user if it is invalid it will prompt the user to enter a valid email address. This is through a pop up error message for the  invalid  email address. 
```dart
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
void main(){
 runApp(new MyApp());
}
class MyApp extends StatelessWidget{
Widget build(BuildContext context) {
	return new MaterialApp(
	home: new Scaffold(
		appBar: new AppBar(
			title: new Text("Email Verifier")),
			floatingActionButton: const FloatingActionButton(
			onPressed: (){},
			child: new Icon(Icons.add),
),
		body:new Form( padding: const EdgeInsets.all(16.0),
		child:[ new Column(
			children:[
				new Flexible(child: new Text("Email"),), validateEmail(),
			],
			),
		)
	);
}

validateEmail() async {
	var emailRegex = await(new RegExp( r"^[_\.0-9a-zA-Z]+(\.[_\.0-9a-zA-Z]+)*@([0-9a-zA-Z][-.:\w]*(\.[a-zA\-Z]{2,}){1,})$", caseSensitive: false ));
	List listEmail=await Validator.email(emailRegex);
	if (listEmail.length > 0) { 
		return new Text("Valid email");
} 
	else { 
		return new Text("Invalid email address");
	}
}
```
Don't forget to click on save button.
Your app is ready to validate your email address.
### Conclusion
we have successfully created a simple flutter app that validates email and passwords. I hope you like it. Please do comment and share your thoughts if any. In case you have any doubts or queries, don't forget to put them in the comments section below. I'm always open to helping you.

Also if you like it then please share to as many geeks as you can so that we can spread this knowledge.

Happy Coding geeks!

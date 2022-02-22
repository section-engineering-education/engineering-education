---
layout: engineering-education
status: publish
published: true
url: /using-supabase-as-an-alternative-to-firebase-in-flutter/
title: Using Supabase as an Alternative to Firebase in Flutter
description: This tutorial will guide the reader through the process of using Supabase as an alternative to Firebase in Flutter.
author: feswal-salim
date: 2022-02-22T00:00:00-04:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/hero.jpg
    alt: Using Supabase as an Alternative to Firebase in Flutter
---
When it comes to choosing a remote database that offers real-time capabilities, authentication features, media storage services, serverless functions, and many more services, people usually go for Firebase.
<!--more-->
Firebase is offered to developers in terms of Software as a service (SAAS). Although Firebase is great, having a NoSQL database has some limitations to those developers from structured databases background. Supabase is a good choice if you want to use a remote database that is structured in nature.

In this tutorial, we will explore how we can use Supabase as our backend service.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [What is Supabase?](#what-is-supabase)
- [Comparison between Supabase and Firebase](#comparison-between-supabase-and-firebase)
- [Why Supabase?](#why-supabase)
- [Step 1 - Creating a flutter project](#step-1---creating-a-flutter-project)
- [Step 2 - Adding dependencies](#step-2---adding-dependencies)
- [Step 3 - Designing the user interfaces](#step-3---designing-the-user-interfaces)
- [Step 4 - Setting up Supabase client](#step-4---setting-up-supabase-client)
- [Step 5 - Registering a user](#step-5---registering-a-user)
- [Step 6 - Logging in a user](#step-6---logging-in-a-user)
- [Step 7 - Reading user profile data](#step-7---reading-user-profile-data)
- [Step 8 - Logging out a user](#step-8---logging-out-a-user)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
To follow along with this tutorial, you need:
- Android Studio or VsCode installed on your computer with the Flutter plugin installed.
- Fundamentals of Dart programming language.
- An understanding of how to create and run Flutter apps.

### What is Supabase?
Supabase is an open-source alternative to Firebase (Backend as a service) that provides an instant RESTful API. In addition to that, it provides real-time capabilities via WebSockets with an SQL database where we can perform joins and write stored procedures.

### Comparison between Supabase and Firebase
- **Database**: Firebase uses a non-structured database (NoSQL) while Supabase uses Postgres database which is a structured database (SQL).
- **Compatibility**: Supabase is Postgres, which makes it compatible with a large number of tools and frameworks. When it comes to Firebase, it is hard to export data and use it in another platform.
- **Pricing**: Firebase has the `Spark` plan and the `Blaze` plan while Supabase has a `Free Tier` which grants you 10,000 Users and 500MB of storage space. There's also a $25 per month plan for 100,000 users, 8GB of space, and unlimited API calls. You can check out [this site](https://supabase.com/pricing) to know more about Supabase pricing.

### Why Supabase?
If you have related data and want to make it real-time, Supabase is a good alternative for the following reasons:
- It uses a PostgreSQL database with real-time capabilities - A very scalable relational database. You can manage your database from the Supabase interface.
- Create tables and relationships e.t.c (Firebase does not offer this).
- Write SQL Queries
- Enable & disable extensions.
- Real-time engine on top of Postgres.
- PostREST API - Take your database (Tables and columns) and automatically generate a REST API from that with Filtering, Sorting e.t.c. You can access your data through that API in either your Flutter App, React App, etc.
- Authentication with multiple methods/services - Create and manage users from Supabase:
  - Email/Password
  - Magic Link
  - Google
  - Github
  - Facebook
- File storage.
- Serverless functions (coming soon).

Before jumping into our code editor, we need to create a Supabase project.

Go to the official website for [Supabase](https://supabase.com/) and sign in with your Github account.

![Start Supabase](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/start-supabase.png)

Once signed in, you will be taken to [supabase.io](https://app.supabase.io/#), where you can create a new project.

![Supabase project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/new-supabase-project.png)

Enter your project name and a strong database password and click `Create new project`.

![Supabase new project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/create-new-supabase-project.png)

> To create a new project, you need to have an organization, if you don't have one yet, you can create.

After creating the project, it will take two to three minutes to build the database and the API.

Once it's done, please take note of your `anon` key and the URL as we will need them in our app. The `anon` key is a public key that we can use in browsers while the URL is a RESTful endpoint for querying and managing the database.

![Secrets](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/secrets.png)

In this tutorial, we are going to create a Flutter App that implements authentication features i.e. registering and logging in users. Also, we'll use the Supabase database to store user profile data. For this reason, we need to create a table that will hold user's data.

To create the table, click on `Table editor` on the left-bar and at the center of the page, click `Create a new table`.

![Table Editor](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/table-editor.png)

Enter all the column names for your table, in this case `name`, `email`, `phone`, and `userId` columns.

![Table](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/new-table.png)

> `userId` will be stored once a new user is registered and is given a unique Id. This will help in retrieving the data of the logged-in user.

Let's get started with the app.

### Step 1 - Creating a flutter project
Launch your Android Studio or VsCode and create an empty flutter project.

![New project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/supabase-project.png)

### Step 2 - Adding dependencies
Open your `pubspec.yaml` and add the following dependencies. `GetIt` is a service locator that we will use to access the `SupabaseClient` from the UI:

```yaml
dependencies:
  supabase: ^0.2.13
  get_it: ^7.2.0
```

### Step 3 - Designing the user interfaces
We will have three screens i.e. `RegisterScreen`, `LoginScreen`, and `HomeScreen`.

> Since this tutorial isn't focusing on designing layouts, the screenshots below shows how the UIs should like. You can access the full source code [here](https://github.com/feswalsalim/FlutterSupabaseDemo).

Registration screen:

![Registration screen](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo1.jpg)

Login screen:

![Login screen](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo2.jpg)

Home screen:

![Home screen](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo3.jpg)

### Step 4 - Setting up Supabase client
In your `main.dart` file, initialize the Supabase client as shown below:

```dart
void main() {
  GetIt getIt = GetIt.instance;

  getIt.registerSingleton<SupabaseClient>(SupabaseClient(YOUR_SUPABASE_URL,YOUR_ANON_KEY));

  runApp(MyApp());
}
```

Here, we've created an instance of the `GetIt` package and used it to register our `SupabaseClient` object as a singleton.

> Make sure you pass `YOUR_SUPABASE_URL` and the `ANON_KEY` that were generated when you created your Supabase project.

### Step 5 - Registering a user
Inside the `RegisterScreen`, create a method called `registerUser` that will be responsible for user registration and saving the data to the database. This method will be invoked when the `Register button` is clicked:

```dart
void registerUser() async {
    final client = GetIt.instance<SupabaseClient>();
    final result = await client.auth.signUp(emailController.text, passwordController.text);

    if (result.data != null) {
      try {
        await client.from('users').insert({
          'name': usernameController.text,
          'email': emailController.text,
          'phone': phoneNumController.text,
          'userId': result.data!.user!.id
        }).execute();

        setState(() {});
      } catch (e) {
        throw Exception(e);
      }

      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Account Created Successfully"),));
      Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen()));
    } else if (result.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(result.error!.message),
      ));
    }
}
```

Using the instance of the `SupabaseClient`, we call the method `signUp` from `auth` passing email and password in order to register the user. If the request is successful, we insert the user's data as shown below:

```dart
await client.from('users').insert({
          'name': usernameController.text,
          'email': emailController.text,
          'phone': phoneNumController.text,
          'userId': result.data!.user!.id
        }).execute();
```

> Inside `from()` method, make sure you pass the exact name of the table that you created in the Supabase console.

### Step 6 - Logging in a user
To authenticate users so that they can see the home screen, define a method called `loginUser` inside the `LoginScreen`. This method will be called when the `Login button` is clicked:

```dart
void loginUser() async {
    final client = GetIt.instance<SupabaseClient>();
    final result = await client.auth
        .signIn(email: emailController.text, password: passwordController.text);

    if (result.data != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text("Login Successful"),
      ));
      Navigator.push(
          context, MaterialPageRoute(builder: (context) => HomeScreen()));
    } else if (result.error != null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(result.error!.message),
      ));
    }
}
```

Using the instance of the `SupabaseClient`, we call the method `signIn` from `auth` passing email and password in order to login the user. If the request is successful, we navigate to the `HomeScreen`.

### Step 7 - Reading user profile data
To get the data of the currently logged-in user, define a method called `getUserProfile` in the `HomeScreen` and invoke it inside your `HomeScreenState` as shown below:

```dart
void getUserProfile() async {
    final client = GetIt.instance<SupabaseClient>();
    final currentUserId = client.auth.currentUser!.id;
    final response = await client
        .from('users')
        .select()
        .eq('userId', currentUserId)
        .single()
        .execute();
    final error = response.error;
    if (error != null && response.status != 406) {
      //context.showErrorSnackBar(message: error.message);
    }
    final data = response.data;
    if (data != null) {
      setState(() {
        fullName = (data['name'] ?? '') as String;
        email = (data['email'] ?? '') as String;
        phoneNum = (data['phone'] ?? '') as String;
      });
    }
}
```

Using the `SupabaseClient` instance, we read the data from `users` table and use the `eq()` method to get the row that contains the `userId` of the currently logged in user. If the response has data, you can set it in your `Text Widgets`.

### Step 8 - Logging out a user
To sign out the currently authenticated user, define a method called `logout` inside your `HomeScreen` that will be called when the `Logout button` is pressed:

```dart
void logout() async {
    final client = GetIt.instance<SupabaseClient>();
    await client.auth.signOut();
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => LoginScreen()));
    Navigator.pop(context);
}
```

Using the `SupabaseClient` instance, we call the method `signOut` from `auth` in order to log out the user. You can then navigate the user to the `LoginScreen`.

### Conclusion
In this tutorial, we have gone through what Supabase is and how it compares to Firebase. We have also gone ahead and looked at the reasons why you should use Supabase. Finally, we've implemented Supabase in a Flutter app with authentication and data storage.

Keep exploring more about Supabase as it is still in development and will have more features soon.

### Reference
- [Supabase Documentations](https://supabase.com/docs)

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

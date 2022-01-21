When it comes to choosing a remote database that offers real-time capabilities, authentication features, media storage services, serverless functions, and many more services, people always go for Firebase. Firebase is offered to developers in terms of Software as a service (SAAS). Although Firebase is great, having a NoSQL database always has some limitations to those developers from structured databases background. To use a remote database that is structured in nature, that's where Supabase comes in. 

 In this tutorial, we will explore how we can use Supabase as our backend service just as Firebase does.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is Supabase](#what-is-supabase)
- [Comparison between Supabase and Firebase](#comparison-between-supabase-and-firebase)
- [Why use Supabase](#why-use-supabase)
- [Creating a flutter project](#step-1---creating-a-flutter-project)
- [Adding dependencies](#step-2---adding-dependencies)
- [Designing UIs](#step-3---designing-uis)
- [Setting up Supabase client](#step-4---setting-up-supabase-client)
- [Registering a user](#step-5---registering-a-user)
- [Logging in a user](#step-6---logging-in-a-user)
- [Reading user profile data](#step-7---reading-user-profile-data)
- [Logging out a user](#step-8---logging-out-a-user)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial:
- Have Android Studio or VsCode installed on your computer with the Flutter Plugin installed.
- Fundamentals of Dart programming language.
- An understanding of how to create and run Flutter apps.

### What is Supabase
An open-source alternative to Firebase (Backend as a service) that provides an instant RESTful API. In addition to that, it provides real-time capabilities via WebSockets. And, with a SQL database, we can perform joins and write stored procedures.

### Comparison between Supabase and Firebase
- Database: Firebase uses a non-structured database (NoSQL) while Supabase uses Postgres database which is a structured database (Uses SQL).
- Compatibility: Supabase is just Postgres, which makes it compatible with a large number of tools and frameworks, when it comes to Firebase, while it is hard to export data from Firebase and use it in another platform.
- Pricing: Firebase has the Spark plan and the Blaze plan while Supabase has a Free Tier which grants you 10,000 Users and 500MB of space. Also, we have the $25 Per Month - 100,000 users, 8GB of space, and unlimited API calls. To know more about Supabase pricing, check it out here - [Supabase pricing](https://supabase.com/pricing).

### Why use Supabase
If you have related data and want it to be real-time,  Supabase is a good alternative. 

- It uses a PostgreSQL database with real-time capabilities - A very scalable relational database. You can manage your database from the Supabase interface.
- Create tables and relationships e.t.c (Firebase does not offer this).
- Write SQL Queries
- Enable & disable extensions.
- Real-time engine on top of Postgres.
- PostgREST API - Take your database (Tables and columns) and automatically generate a REST API from that with Filtering, Sorting e.t.c. You can access your data through that API in either your Flutter App, React App, etc.
- Authentication with multiple methods/services - Create and manage users from Supabase :
    - Email/Password
    - Magic Link
    - Google
    - Github
    - Facebook 
- File storage.
- Serverless functions (coming soon).

Before jumping into our code editor, we need to create a Supabase project.

Go to the official website for [Supabase](https://supabase.com/) and sign in with your Github account.

![Start-Supabase](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/start-supabase.png)

Once signed in, you will be navigated to [supabase.io](https://app.supabase.io/#), where now you can create a new project.

![Supabase-Project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/new-supabase-project.png)

Enter your project name and a strong database password and click "Create new project".

![Supabase-New-Project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/create-new-supabase-project.png)

> To create a new project, you need to have an organization, if you don't have one, you can create one.

After creating the project, it will take two to three minutes to build the database and the API.

Once it is done, please take note of your "anon" key and the URL as we will be needing them in our app. The `anon` key is a public key that we can use in browsers while the URL is a RESTful endpoint for querying and managing your database.

![Secrets](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/secrets.png)

In this tutorial, we are going to create a Flutter App that has authentication features i.e. registering and logging in a user. Also, we will try and use the Supabase database to store user profile data. Because of this, before going to the app, let us create a table that will hold user data.

To create the table, on the left-bar, click on Table editor, and at the center of the page, click on 'Create a new table'

![Table-Editor](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/table-editor.png)

Enter all the columns that you want your table to have, for me I have added `name`, `email`, `phone`, and `userId` columns.

![Table](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/new-table.png)

> I have included `userId` as we will store it once a new user is registered and is given a unique Id, this will help us in retrieving the data of the logged-in user.

Getting started with the app

### Step 1 - Creating a flutter project
Launch your Android Studio or VsCode and create an empty flutter project.

![New-Project](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/supabase-project.png)

### Step 2 - Adding dependencies
Open your `pubspec.yaml` and add the following dependencies. `GetIt` is a service locator that we will use to access the `SupabaseClient` from the UI.

```yaml
dependencies:
  supabase: ^0.2.13
  get_it: ^7.2.0
```

### Step 3 - Designing UIs
We will have three screens i.e. `RegisterScreen`, `LoginScreen`, and `HomeScreen`.

> Since this tutorial isn't focusing on designing Layouts, I have included screenshots on how the Uis should like. Otherwise, if you would like to access the full project, use this link - [FlutterSupabaseDemo](https://github.com/feswalsalim/FlutterSupabaseDemo)

Registration screen

![Registration](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo1.png)

Login screen

![Login](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo2.png)

Home screen

![Home](/engineering-education/using-supabase-as-an-alternative-to-firebase-in-flutter/demo3.png)

### Step 4 - Setting up Supabase client
In your `main.dart` file, inside the `main` method, this is how you can initialize the Supabase Client.

```dart
void main() {
  GetIt getIt = GetIt.instance;

  getIt.registerSingleton<SupabaseClient>(SupabaseClient(YOUR_SUPABASE_URL,YOUR_ANON_KEY));

  runApp(MyApp());
}
```

We create an instance of the `GetIt` package and use it to register our `SupabaseClient` object as a singleton.

> Make sure you pass your `ANON_KEY` and `YOUR_SUPABASE_URL` that was generated when you created your Supabase project.

### Step 5 - Registering a user
Inside the `RegisterScreen` create a method called `registerUser` that will do user registration and save the data to the database. This method will be called when the Register `Button` is pressed.

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

Using the instance of the `SupabaseClient`, we call the method `signUp` from `auth` passing email and password in order to register the user. If the request is successful, we insert the user's data as shown below.

```dart
await client.from('users').insert({
          'name': usernameController.text,
          'email': emailController.text,
          'phone': phoneNumController.text,
          'userId': result.data!.user!.id
        }).execute();
```

> Inside `.from` method, make sure you pass the exact name of the table that you created in the Supabase console.

### Step 6 - Logging in a user
To authenticate a user so that he/she can see the home screen, inside the `LoginScreen`, define a method called `loginUser` for authenticating in a user. This method will be called when the Login `Button` is pressed.

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

Using the instance of the `SupabaseClient`, we call the method `signIn` from `auth` passing email and password in order to login the user. If the request is successful, we will navigate to the `HomeScreen`.

### Step 7 - Reading user profile data
While in your `HomeScreen`, to get the data of the currently logged-in user, define a method called `getUserProfile` and call it inside your `HomeScreenState`.

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

Using the instance of the `SupabaseClient`, we read the data `from` "users" table that we created, and we use the `.eq` method to get the row that has the 'userId' of the currently logged in user. If the response has data, you can set it to your `Text Widgets`.

### Step 8 - Logging out a user
To sign out the currently authenticated user, inside your `HomeScreen` define a method called `logout` that will be called when the Logout `Button` is pressed.

```dart
  void logout() async {
    final client = GetIt.instance<SupabaseClient>();
    await client.auth.signOut();
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => LoginScreen()));
    Navigator.pop(context);
  }
```

Using the instance of the `SupabaseClient`, we call the method `signOut` from `auth` in order to log out the user. You can then navigate the user to the `LoginScreen`.

### Conclusion
In this tutorial, we have gone through what Supabase is and the comparisons between it and Firebase, we also went ahead and looked at the reasons as to why you should use Supabase. Finally, we implemented Supabase in a Flutter with Authentication and storing user data. Keep exploring more about Supabase as it is still in development and will have more superb features soon. 

Happy coding.

### References
- [Supabase Documentations](https://supabase.com/docs)

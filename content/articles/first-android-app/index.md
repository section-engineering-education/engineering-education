---
layout: engineering-education
status: publish
published: true
url: /first-android-app/
title: Creating Your First Android Application
description: This article will be a step-by-step guide on creating your first android application. It will be a very simple application to give you a general knowledge of android apps
author: diana-mutheu
date: 2021-02-21T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/first-android-app/hero.jpg
    alt: Android application image example
---
Application software commonly known as apps refer to programs designed for end-users. They enable a user to pass a set of instructions to a computer using a built user interface instead of hard code. There are different types of applications; web, mobile and, desktop. In this article, we will look at mobile applications, specifically Android applications.
<!--more-->
### Introduction
Mobile applications are of two types due to the two mobile operating systems, namely iOS and Android.

- Examples of phone brands that use android are Samsung, Google pixel, etc.
- An example of a phone brands that use iOS is Apple.

This article will be a step-by-step guide to creating your first Android application. It will be a very simple application to give you general knowledge of Android apps. We can develop Android applications using `Java` or `Kotlin` programming language, here we will use Java.

### Table of contents
- [Prerequisites](#prerequisites)
- [New Terminologies](#new-terminologies)
- [The steps to build your Application](#the-steps-to-build-your-application)
- [Conclusion ](#conclusion)

### Prerequisites
1. Basic [Java programming language](https://www.w3schools.com/java/java_intro.asp).
2. [Java Development Kit](https://www.oracle.com/java/) downloaded.
3. [Android Studio](https://developer.android.com/studio) installed.

> NOTE: Download according to the version of Windows you are running, 64bit or 32bit. According to Google, you need 2GB of RAM and above (4GB is recommended) to run Android Studio and Java since they are memory consuming and will slow down your PC.

### New terminologies
- **Method** - A block of code that only runs when called and performs an action.
- **Activity** - This is one screen on an Android App's user interface.
- **Fragment** - A Fragment represents a reusable portion of your app's UI.

### The steps to build your Application
We are going to create a very simple application that will cover three major parts in Android development:

1. Activity navigation - Movement from one activity to another.
2. UI design - Designing the interface where the user interacts with the computer.
3. Data parsing in an application - Sharing of data within the application.

It will take in a user's name on one Activity and display it on another Activity after clicking a button.

Let us begin!

### Step 1. Android Studio Setup
- Select ***create a new project***.
- Select ***Empty Activity***.

![An Empty Activity](/engineering-education/first-android-app/empty-activity.png)

- Configure your project by choosing an appropriate name.
- Write an appropriate and unique package name if you plan to launch your app on the `Play Store`, if not leave it on default.
- Select the language as Java.
- Ensure to choose an SDK that will run your app on many devices.
- Click Finish.

![Configure your project](/engineering-education/first-android-app/configure-project.png)

### Step 2. User Interface design
UI for the First Activity:
- Navigate to the ***res Folder*** -> ***Layout Folder***
- Click on the layout name `activity_main.xml` created by default to design the UI of the `MainActivity`.
- We will design our UI for the first activity using the code below. Make sure to change the default layout form Constraint to Linear.

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <EditText
        android:id="@+id/username_input"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="40dp"
        android:layout_marginTop="160dp"
        android:ems="10"
        android:textColor="#000"
        android:textColorHint="#CCCCCC"
        android:hint="Enter Your Full Name"
        android:inputType="textPersonName"
        android:textSize="18sp" />

    <Button
        android:id="@+id/button"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="40dp"
        android:layout_marginTop="100dp"
        android:onClick="onButtonClick"
        android:text="Submit" />

</LinearLayout>
```

UI for the Second Activity:
- Navigate to the ***Java Folder*** to create the Second Activity.
- Right-click on the first folder with your app's package name. Then go to ***New -> Activity -> Empty Activity***.

- Configure the new Activity's name and Layout Name, then click ***Finish***. It will generate both the layout and Java files for the Activity.
- Then navigate to the Activity's layout to design its UI using the code below.

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".Page2">

    <TextView
        android:id="@+id/display_input"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="40dp"
        android:layout_marginTop="160dp"
        android:textSize="18sp"
        android:textColor="#000"
        android:text="TextView" />

</LinearLayout>
```

### Step 3. Write the Java Code
We find the Java classes for the Activities in the ***Java Folder*** -> first folder with the ***Application's package name***

Java code for the First Activity:
- In the first activity outside the `onCreate` method, call the `onClick` you created in the XML on the button.
- Inside this method, convert the text input from the user to a String.
- Then create an extra that will facilitate parsing of the data.
- Finally, create an intent that refers to a messaging object used to request an action from another app component. The action requested in this case is Activity navigation.

```java
public class MainActivity extends AppCompatActivity {
    EditText username;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void onButtonClick (View view){
        //    taking text from one activity to another
       username = findViewById(R.id.username_input);
       String message = username.getText().toString();
        Intent intent = new Intent(this, Page2.class);
        intent.putExtra("EXTRA_MESSAGE" , message );
        startActivity(intent);
    }
}
```

Java Code for the Second Activity:

- On the second Activity, inside the `onCreate` method, get the text from the previous Activity and display it on the `TextView`.

```java
public class Page2 extends AppCompatActivity {
    TextView display;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page2);
        //   getting the text frm previous activity
        Intent intent = getIntent();
        String message = intent.getStringExtra("EXTRA_MESSAGE");
        display = findViewById(R.id.display_input);
        display.setText("Hello " + message + " welcome!" );
    }
}
```

### Step 4. Run the application
There are two approaches to this:

 **Using the Android emulator**
1. Under the ***tools*** menu on Android Studio navigate to ***AVD Manager***.
2. You will have one emulator by default. Click on the play button in the Actions column on the table to start the emulator. Or, at the top, next to the emulator name, click the play button to start it. 
 
As demonstrated below.

![Stat emulator](/engineering-education/first-android-app/avd-manager.png)

> NOTE: The performance and RAM left on your PC will determine how long the emulator will take to start.

**Using an Android phone.**

1. Connect your mobile phone to your laptop using a ***USB cable***.
2. Navigate to the settings application on your mobile device, look for ***developer options*** which could be located in the ***additional settings*** option on some phones, click on it.
3. It will probably prompt you to write the verification code.
4. After being verified, enable the ***developer options*** then navigate to ***debugging*** and enable ***USB debugging*** option. A pop-up will appear explaining the function of USB debugging, click OK.
5. Another pop-up will appear asking you to allow USB debugging to your computer, click on OK.
6. The Phone model will appear at the top, run your application by clicking the green play button on the right. 

As shown below.

![Physical device](/engineering-education/first-android-app/physical-device.png)

![Input](/first-android-app/input-page.png)   ![Display](/engineering-education/first-android-app/display-page.png)

### Conclusion
That is it! 

You have created your first Android application. Practice makes perfect so make sure you continue building mobile applications until you become an expert.

Happy coding.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

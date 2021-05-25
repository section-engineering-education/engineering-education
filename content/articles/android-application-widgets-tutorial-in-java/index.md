---
layout: engineering-education
status: publish
published: true
url: /android-application-widgets-tutorial-in-java/
title: Android Application Widgets Tutorial in Java
description: In this article we will learn about Android application widgets and how to implement a widget in an Android app. We will discuss different types of widgets, their uses, and learn about the limitations of widgets.
author: moses-chege
date: 2021-04-20T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/android-application-widgets-tutorial-in-java/hero.jpg
    alt: Android Application Widgets Tutorial in Java
---
Application widgets are views that contain some of the application's functionalities that are accessible from the user's home screen, for example, weather widgets, clock widgets, etc. This tutorial will take you through how to implement widgets in Android applications.
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Android widgets](#introduction-to-android-widgets)
- [Types of widgets](#types-of-widgets)
- [Creating a sample widget in Java](#creating-a-sample-widget-in-java)
- [Advantages of widgets](#advantages-of-widgets)
- [Limitations of widgets](#limitations-of-widgets)
- [Conclusion](#conclusion)

### Prerequisites
The following prerequisites will be required to follow this tutorial:
- The reader should know about building basic Android apps.
- [Android Studio](https://developer.android.com/studio) installed.
- Basic understanding of [Java](https://www.javatpoint.com/java-programs) programming language and XML programming languages.

### Introduction to Android widgets
Widgets vary in size and support resizing. Widgets are mostly placed on a device's home screen to enable quick access to a particular mobile application's data and functionalities. They allow a user to create shortcuts for their favorite apps. Some of the most common widgets are music widgets, calendar widgets, Google search widgets.

#### Widget design guidelines
- **Widget content:** A widget should contain the app's most important content while more details about the app's widget's content.
- **Widget configuration:** For the widgets that need configuration, you should create a widget configuration activity. Widget configuration activity allows users to modify the widget settings at create-time.
- **Layout considerations:** Widgets should be adaptable to accommodate varying spaces.
- **Widget resizing:** Widgets should support resizing to fine-tune the amount of information the users want to see.

### Types of widgets
Widgets are categorized into:

#### Information widgets
Information widgets provide information to the user. This information can keep changing over time, based on the need. Examples of information widgets include the soccer live score widget, stock market widget, and weather widget.

#### Control widgets
The control widgets allow the user to carry out some functions without opening the application. An example of a commonly used control widget is a music player widget. The widget allows users to play, pause or skip to the next music track without opening the music player app.

#### Collection widgets
Collection widgets display multiple elements for viewing and can support scrolling. They can display a collection of messages, articles, or images.

#### Hybrid widgets
Hybrid widgets are widgets that can fall into more than one category. For example, a music player widget can accommodate more information on the track being played. In such a case, it would be a hybrid widget as it allows for controls and information on the track being played.

### Creating a sample widget in Java
This section will create a sample app with a blank activity and a widget. Our focus is on creating a functional widget and testing different Android app widget aspects. 

After going through this tutorial, you will create an Android widget, as shown in the animations below. Find the final APK file on this [link](https://drive.google.com/file/d/10x0E3Nd65EQF2sfyQWFef4JV316AALIB/view?usp=sharing).

![Demo widget screenshot](/engineering-education/android-application-widgets-tutorial-in-java/android-app-widget.gif)

### Step 1: Create a project.
Create a new Android Studio project with at least one activity and name the project **App Widgets Demo.** Select `Java` as the project's programming language.

![Android Studio create project](/engineering-education/android-application-widgets-tutorial-in-java/android-studio-create-empty-activity-project.jpg)

### Step 2: Create a new widget
To create a widget, navigate to the package name `com.demo.widgetsdemo` and right-click. Select `New` -> `Widget` -> `App Widget`. This will open a new window to configure the widget, as shown in the screenshot below.

![Android Studio configure app widget](/engineering-education/android-application-widgets-tutorial-in-java/android-studio-configure-app-widget.jpg)

- The `Class Name` defines the name of the widget class.
- `Placement` determines where the widget can be placed. In this case, select the `Home screen`.
- `Minimum width` and `Minimum height` define the minimum number of cells that the widget can occupy.
- The `Resizable` option specifies whether the widget can be resized.
- If the widget requires a `ConfigureActivity,` select the `Configurations Screen` option.

From step 2 above, there are three different files created:
- `NewAppWidget.java`: This Java class is the widget class created under the package name `com.demo.widgetsdemo`.
- `new_app_widget_info.xml`: This is an XML file under the XML folder. It contains widget configurations and can be edited.
- `new_app_widget.xml`: This is the layout file for the widget. It is located in the layout folder.

### Step 3: Customize widget layout file
Open the `new_app_widget_info.xml` XML file. In this file, you can add other views that you would like to be part of your widget. In this case, you will add a button below the already existing text view, as shown in the code below.

```XML
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:background="?attr/appWidgetBackgroundColor"
    android:orientation="vertical"
    android:layout_height="match_parent"
    android:theme="@style/ThemeOverlay.AppWidgetsDemo.AppWidgetContainer">

    <TextView
        android:id="@+id/widget_text"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:textAlignment="center"
        android:layout_width="match_parent"
        android:background="?attr/appWidgetBackgroundColor"
        android:contentDescription="DEMO WIDGET"
        android:text="DEMO WIDGET"
        android:textColor="?attr/appWidgetTextColor"
        android:textSize="24sp"/>
    <Button
        android:id="@+id/button1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:background="?attr/appWidgetBackgroundColor"
        android:text="CLICK BUTTON"
        android:textSize="24sp"/>
</LinearLayout>
```

### Step 4: Widget Java class
Open the `NewAppWidget.java` file. This class extends with the `AppWidgetProvider` class. The `AppWidgetProvider` class receives and handles broadcast events relevant to the App Widget. 

The `AppWidgetProvider` class overrides the following methods:
- `onUpdate()`: Updates app widgets on intervals that are defined in the `AppWidgetProviderInfo` metadata. In this case, the `AppWidgetProviderInfo` metadata is defined in the `new_app_widget_info.xml` file. This method is also called when the app widget is dropped on the home screen.
- `onAppWidgetOptionsChanged()`: It is called when the widget is resized.
- `onEnabled()`: It is called when a widget is created.
`onDisabled()`: It is called when the widget's last instance is deleted. For example, we can launch an activity within this function.

The final code will be as shown below.

![Widget Class Code](/engineering-education/android-application-widgets-tutorial-in-java/widget-class-code.png)

### Step 5: Edit manifest file
Declare the `AppWidgetProvider` class in the manifest file AndroidManifest.xml as a broadcast receiver.

![Manifest Code](/engineering-education/android-application-widgets-tutorial-in-java/manifest-code.png)

This declaration is usually automatically added by the IDE. If the widget class is manually created, the declaration is added manually. Refer to the AndroidManifest.xml in the [final project](https://github.com/manmusa100/App-Widgets-Demo).

### Step 6: Edit widget configurations
In this step, you will change the widget's cover image. Open the `new_app_widget_info.xml` file. This file contains widget configuration settings. 

Edit the following line:

```xml
android:previewImage="@drawable/example_appwidget_preview"
```

Replace the `example_appwidget_preview` image with a drawable image of your choice. This image will act as the widget cover photo.

### Step 7: Run the app
Install the app on a test device and add the widget to the home screen. 

>Note: Widgets are arranged in alphabetical order. Go to the widget section and locate the widget App Widgets Demo. The widget we created will have the same name as the application name, as shown in the screenshot below.

![Demo widget screenshot](/engineering-education/android-application-widgets-tutorial-in-java/demo-widget-screenshot.jpg)

### Step 8: Place the widget on the home screen
See the screenshot below of the final widget on a home screen.

![Homescreen demo widget](/engineering-education/android-application-widgets-tutorial-in-java/home-screen-demo-widget.jpg)

Tap the widget button. This should open the app `MainActivity`.

### Advantages of widgets
Widgets have the following advantages:
- Informational widgets allow the users to view important information without opening the app.
- Widgets act as accessible gateways to apps installed on the user's device.

### Limitations of widgets
Widgets have the following limitations:
- **Gestures:** Widgets do not support lateral swiping.
- **Building blocks:** Due to the limited number of gestures, widgets cannot support some elements. Refer to the [Android widget documentation](https://developer.android.com/guide/topics/appwidgets/index.html#CreatingLayout) for a list of supported views.

Access this tutorial's source code on [GitHub](https://github.com/manmusa100/App-Widgets-Demo)

### Conclusion
To wrap up, we have learned about Android application widgets and how to implement a widget in an Android app. We have discussed different types of widgets and their uses. 

Lastly, we have learned about the limitations of widgets. Keep in mind the [widget design guidelines](#widget-design-guidelines) discussed in this tutorial.

Happy coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

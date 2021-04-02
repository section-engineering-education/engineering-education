Application widgets are views that contain some of the application functionality accessible from the user's home screen. This tutorial will take you through Android app widgets in detail.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Android widgets](#introduction-to-android-widgets)
- [Types of widgets](#types-of-widgets)
- [Creating a sample widget in Java](#creating-a-sample-widget-in-java)
- [Limitations of Widgets](#limitations-of-widgets)
- [Conclusion](#conclusion)

### Prerequisites
To follow through with this tutorial with ease, you need to meet the following prerequisites:
- Basic knowledge in building Android apps.
- [Android Studio](https://developer.android.com/studio) installed.
- Basic understanding of [Java](https://www.javatpoint.com/java-programs) programming language.

### Introduction to Android widgets
Widgets vary in size and support resizing. Widgets are placed on the device's home screen to enable quick access to the data they hold and functionalities. They allow you to create shortcuts for your favorite apps. Some of the most common widgets are music widgets, calendar widgets, Google search widgets.

#### Widget design guidelines
**Widget content:** Widget should concentrate on your app's most important content. The app should provide more details about the content presented on the widget.
- **Widget configuration:** For the widgets that need to be configured, you should creating a widget configuration activity. Widget configuration activity is an activity that opens when a user drops an app widget on the home screen. It allows users to modify the widget settings at create-time.
- **Layout considerations:** Widgets should be adaptable to accommodate varying spaces.
- **Widget resizing:** Widgets should support resizing to fine-tune the amount of information the users want to see.

### Types of widgets
Widgets are categorized into:

#### Information widgets
Informational widgets provide information to the user. Information on the widgets can keep changing over time based on the need. Examples of information widgets include the soccer live score widget, stock market widget, and weather widget.

#### Control widgets
The control widgets allow the user to carry out some functions without opening the application. An example of a commonly used control widget is a music widget. The widget allows users to play pause or play the next music track without opening the music app.

#### Collection widgets
Collection widgets display multiple elements for viewing. Collection elements support scrolling. They can display a collection of messages, articles, or images.

#### Hybrid widgets
Hybrid widgets are widgets that can fall into more than one category. For example, a music widget can provide more information on the track being played. In such a case, it will be a hybrid widget as it allows for controls and information on the track being played.

### Creating a sample widget in Java
This section will create a sample app with a blank activity and a widget. Our focus is on creating a functional widget and testing different Android app widget aspects.

**Step 1: Create a new Android Studio project**
Open Android Studio and create a new project. Use Empty Activity project template. Name the project `App Widgets Demo` and the package name as `com.demo.widgetsdemo`. Select `Java` as the project language.

![Android Studio create project](/engineering-education/android-application-widgets-tutorial-in-java/android-studio-create-empty-activity-project.jpg)

**Step 2: Create a new widget**
To create a widget, navigate to the package name `com.demo.widgetsdemo` and right-click. Navigate to `New` -> `Widget` -> `App Widget` as shown in the screenshot below.

![Android Studio create new widget](/engineering-education/android-application-widgets-tutorial-in-java/android-studio-create-new-widget.jpg)

This will open a new window to configure the widget, as shown in the screenshot below.

![Android Studio configure app widget](/engineering-education/android-application-widgets-tutorial-in-java/android-studio-configure-app-widget.jpg)

- The `Class Name` defines the name of the widget class.
- `Placement` determines where the widget can be placed. In this case, select the `Home screen.
- `Minimum width` and `Minimum height` define the minimum number of cells that the widget can occupy.
- The `Resizable` option specifies whether the widget can be resized.
- If the widget requires a ConfigureActivity, select the `Configurations Screen` option.

From `step 2` above, three different files are created:
- `NewAppWidget.java`: This is the widget class created under the package name `com.demo.widgetsdemo`.
- `new_app_widget_info.xml`: This is an XML file under the XML folder. It contains widget configurations and can be edited.
- `new_app_widget.xml`: This is the layout file for the widget located in the layout folder.

**Step 3: Customize widget layout file**
Open `new_app_widget_info.xml` XML file. In this file, you can add other views that you would like to be part of your widget. Add a button below the already existing text view, as shown below.

```XML
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="?attr/appWidgetBackgroundColor"
    android:padding="@dimen/widget_margin"
    android:orientation="vertical"
    android:theme="@style/ThemeOverlay.AppWidgetsDemo.AppWidgetContainer">

    <TextView
        android:id="@+id/appwidget_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:textAlignment="center"
        android:background="?attr/appWidgetBackgroundColor"
        android:contentDescription="DEMO WIDGET"
        android:text="DEMO WIDGET"
        android:textColor="?attr/appWidgetTextColor"
        android:textSize="24sp"
        android:textStyle="bold|italic" />
    <Button
        android:id="@+id/button1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:background="?attr/appWidgetBackgroundColor"
        android:text="CLICK BUTTON"
        android:textSize="24sp"
        android:textStyle="bold|italic" />
</LinearLayout>
```

**Step 4: Widget Java class**
Open the `NewAppWidget.java` file. This class extends with the `AppWidgetProvider` class. `AppWidgetProvider` receives and handles broadcast events relevant to the App Widget. `AppWidgetProvider` class overrides the following methods.

- `onUpdate()`: This method updates App Widgets on intervals defined in the `AppWidgetProviderInfo Metadata`. In this case, the `AppWidgetProviderInfo Metadata` is defined in the file `new_app_widget_info.xml`. This method is also called when the App Widget is dropped on the home screen.
- `onAppWidgetOptionsChanged()`: This method is called when the widget is resized.
- `onEnabled()`: This method is called when a widget is created.
`onDisabled()`: This method is called when the widget's last instance is deleted. For example, we can launch an activity within this function.

**Step 5: Edit Manifest file**
Declare the AppWidgetProvider class in the manifest file `AndroidManifest.xml` as a broadcast receiver. The IDE has already added this. If we created the widget class manually, we would have to add it manually. Refer to the `AndroidManifest.xml` in the [final project](https://github.com/manmusa100/App-Widgets-Demo).

**Step 6: Edit widget configurations**
In this step, we will change the widget cover image. Open the file `new_app_widget_info.xml`. The file contains widget configuration settings. Edit the line:

```xml
android:previewImage="@drawable/example_appwidget_preview"
```
Add a drawable image of your choice. Replace the `example_appwidget_preview` image with the image you added to the drawable folder. This image will act as the widget cover photo.

**Step 7: Run the App**
Install the app on your test device and add the widget to the home screen. Note widgets are arranged in alphabetical order. Go to the widget section and locate the widget `App Widgets Demo`. The widget we created, `NewAppWidget`, will have the same name as the application name, as shown in the screenshot below.

![Demo widget screenshot](/engineering-education/android-application-widgets-tutorial-in-java/demo-widget-screenshot.jpg)

**Step 8: Place the widget on the home screen**
See the screenshot below of the final widget on a home screen.

![Homescreen demo widget](/engineering-education/android-application-widgets-tutorial-in-java/home-screen-demo-widget.jpg)

Tap the widget button. This should open the app `MainActivity`.

### Limitations of Widgets
Widgets have some limitations, including:
- **Gestures:** Widgets support Touch and vertical swipe gestures. They don't support swiping laterally.
- **Building blocks:** Due to the limited number of gestures, widgets cannot support some elements. Refer to the [Android widget documentation](https://developer.android.com/guide/topics/appwidgets/index.html#CreatingLayout) for a list of supported views.

Source code [Github](https://github.com/manmusa100/App-Widgets-Demo)

### Conclusion
We have learned a lot about Android application widgets. You can now implement any widget on your existing app or your next app. Keep in mind the [widget design guidelines](#widget-design-guidelines) discussed in this tutorial.
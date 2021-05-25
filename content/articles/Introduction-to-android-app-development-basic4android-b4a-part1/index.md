---
layout: engineering-education
status: publish
published: true
url: /introduction-to-android-app-development-basic4android-b4a-part1/
title: Introduction to Android App Development with Basic4Android (B4A)
description: This article will be an introduction to Basic4Android (B4A). B4A is object-based and event-driven tool used to develop native Andriod mobile applications.
author: benson-kariuki
date: 2020-12-10T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/hero.jpg
    alt: Android App Development with Basic4Android (B4A) example image
---
Basic4Android is a tool used for developing native Android applications rapidly. The technique is called [rapid application development (RAD)](https://en.wikipedia.org/wiki/Rapid_application_development). We abbreviate Basic4Android as B4A. B4A was developed and distributed by a company called [Anywhere Software Ltd](https://www.b4x.com/).
<!--more-->
### Introduction
B4A is a language similar to Visual Basic and Visual Basic .NET. It is easier to learn if you know Visual Basic or Visual Basic .NET.
Nevertheless, Visual Basic or Visual Basic .NET is not a requirement for you to learn B4A. With B4A, you may not need to learn Java to be a native Android application developer. B4A is object-based and event-driven. It's more of an IDE rather than an app builder.

### Prerequisites
This article is for all levels of developers who want to create Android apps faster. Prior knowledge in programming is an added advantage.

### Advantages of B4A
- B4A is easy to learn.
- The B4A has a comprehensive online developer community. Developers share libraries and assist each other on different issues related to B4A.
- You can reuse your Java code. B4A supports external libraries.
- B4A supports all types of applications, including games.
- The end product is a native Android app that can be signed and published on Android app stores. Some of the Android app stores are [Google Play](https://play.google.com/store/apps), [Amazon Appstore](https://www.amazon.com/mobile-apps/b?ie=UTF8&node=2350149011), among others.
- B4A is 100% free.
- It has an expansive collection of libraries and resources.
- The generated app files are relatively small compared to those developed using other editors.

### Shortcomings
- It is only available on Windows. B4A IDE is not available for Mac or Linux OS.

### Getting the tools ready
To get started, we need to download and install some tools.

#### Download and install the Java JDK
B4A requires JDK (Java Development Kit) to compile. [Oracle Java 8](https://www.java.com/en/download/) or [OpenJDK 11](https://jdk.java.net/11/). Download and install one of the above JDKs for Windows OS.

#### Download and install the Android SDK
Google developed the Android SDK as a software development kit for the Android platform. To create Android apps, the Android SDK will be required.

Download [Android SDK command-line tools](https://dl.google.com/android/repository/commandlinetools-win-6609375_latest.zip) and unzip the files in a folder such as `C:/android-sdk `.

Some other resources provided by B4X are also required and can be downloaded [here](https://b4xfiles-4c17.kxcdn.com/b4a/resources_9_20.zip). Unzip the contents of the downloaded folder, then move the contents to the folder created earlier, `C:/android-sdk `. The final folder should look like in the screenshot below.

![ B4A Android SDK Folder Structure](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-android-sdk-folder-structure.jpg)

#### Download, install, and configure Basic4Android
Download B4A from the [official website](https://www.b4x.com/android/files/B4A.exe). After installation, we need to tell B4A where the JDK and SDK files are located. Open B4A, then navigate to `Tools>Configure Paths`.

Set the android.jar path to `C:\android-sdk\platforms\android-30\android.jar`.

Set the `javac.exe` location to either `C:\Program Files\Java\jdk1.8.0_271\bin\javac.exe` or `C:\java\jdk-11.0.1\bin\javac.exe`. These paths point to Java 8 JDK and Open JDK, respectively.

![B4A configuring paths](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-configuring-paths.jpg)

**Note**: Path may vary depending on the version of JDK you installed.

#### B4A-Bridge
To install apps on the phone, we use B4A Bridge. It's a feature that comes with B4A IDE. First, install an app called B4A-Bridge on your Android phone. 

B4A-Bridge is available on the [Google Play Store](https://play.google.com/store/apps/details?id=anywheresoftware.b4a.b4abridge). B4A Bridge connects your Android device to the IDE over a wireless network. Such as in this case, your computer and the Android device need to be on the same wireless network.

Open the B4A-Bridge app, check the `Enable FTP Server` option, and start the connection. Take note of the device IP address. See the screenshot below.

![B4A Bridge Android App](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-bridge-android.jpg)

Open B4A IDE, navigate to `Tools > B4A Bridge > Connect > New IP`.

![B4A Bridge Connection](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/connecting-b4a-bridge.jpg)

You will be prompted to enter the Android device IP address. Enter the IP address on the Android B4A bridge Screen, and click okay to connect.

![B4A Bridge IP Prompt](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/connecting-b4a-bridge-ip-prompt.jpg)

Now you are ready to install apps from the IDE to the Android device over the wireless network.

### Android application development basics
- **Process**:  A process is created when the application is launched. It ends when the user or system closes all the activities in the application.

- **Activity**: Activities are similar to Windows. It's basically a screen that the user sees. An application is made up of one or many activities.

- **Layout Files**: Layout files hold views such as input fields, labels, buttons, among others.

- **Events**: B4A is event-driven. Events are triggered by actions such as user interactions. A button click is an example of an event triggered by user interaction.

### Example app 1: Hello World app
Now we are ready to create and run a hello world app.

Open B4A, navigate to `File -> New -> Default`.

![B4A create new default project](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-create-new-default-project.jpg)

You will be prompted to select a path to save your project and the project's name.

![B4A new default project source code](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-new-default-project-source-code.jpg)

#### Program flow
In our "Hello World" project above, there are two tabs, `Main` and `Starter`. The two tabs are the Main activity and Starter Service modules, respectively.

![B4A Modules Screenshot](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-modules.jpg)

- **Main Activity**: The main activity is the starting activity. By default, each new project you create has the main activity. Each module in B4A has `Sub`. A sub is like a function. In `Sub Process_Globals` we declare global variables that can be accessed from all modules. In `Sub Globals`, we declare global variables.

`Sub Activity_Create(FirstTime As Boolean)` is called when the activity is started. In this case, we are loading the necessary layout every time the activity is created. You can create a routine with any other name.

```basic
Sub Activity_Create(FirstTime As Boolean)
	Activity.LoadLayout("Layout")
End Sub
```

In the example, there is a function `Button1_Click` that is executed every time `button1` is clicked.

```basic
Sub Button1_Click
	xui.MsgboxAsync("Hello world!", "B4X")
End Sub
```

- **Starter Service**: This is where we declare all `ProcessGlobal` variables. `ProcessGlobal` variables can be accessed from all the other modules in the project. Variables can be local or global. Local variables are defined inside a sub and can only be accessed from the sub. Global variables can be accessed from all subs in the module or activity.

#### B4A visual designer
B4A comes with an inbuilt visual designer. You can design the layout of your application here. To launch Visual designer in the IDE, navigate to `designer -> Launch Designer`.

![Launching B4A Visual Designer](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-launching-visual-designer.jpg)

The visual designer shows how the layout design will look on the device. Navigate to `WYSIWYG Designer -> Connect` to connect the visual designer to the device. This connects the device to the IDE over a wireless network.

![Connecting B4A `WYSIWYG Designer to Device](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-connecting-visual-designer-to-device.jpg)

Navigate to `Add View` and add any view of your choice. We'll get into more details with [example 2](#Example-App-2).

![B4A Views](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-visual-designer-views.jpg)

To learn more about the visual designer, refer to the [B4A visual designer Booklet](https://www.b4x.com/guides/B4XVisualDesigner/?page=1).

#### Output
Let's run the code and install the app on our Android device. Click the Run button as highlighted in the screenshot above. Once you run the code, you will be prompted to install the B4A designer app on your android device. 

Select install. We will use the [B4A designer app later](#B4A-Visual-Designer).

![Install Visual Designer Prompt](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-install-visual-designer-prompt.jpg)

Your app should install successfully. The app has one screen with a button `Click`. Once you click the button, a dialog box with the message "Hello world!" appears. You can change the message to something else (on the main file).

![B4A Hello World app](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-hello-world.jpg)

Congratulations, you have successfully created a hello world app using B4A. In the next section, we will learn how to code using B4A.

### Example app 2
In this example, we will create an application that takes in numbers and displays the sum on a button click.

- Open B4A and create a new project.
- Save your project as `B4A_App2`.
- Connect your Android device to the IDE.
- Launch visual designer.
- Add views to the layout as shown in the screenshot below.

![B4A Visual Designer Screenshot](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-visual-designer-screenshot.jpg)

In the abstract designer, we added two text views, a label and a button. Style them to your satisfaction. You can change the properties of any selected view in the properties section of the abstract designer. 

Some of the editable properties are color, hint text, input type, among others. For the two text views, change the name to `txtNumber1` and `txtNumber2`. Edit the hint text for the text views and set the input type to `NUMBERS`.

Right-click the button in the abstract designer and generate the button click function. This will add a function to the Main activity. Code or logic within the function will be executed when the button is clicked.

![B4A Generating Button Click Function](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-generating-button-onclick.jpg)

Right-click the rest of the views and generate their declarations.

In the main activity, we need to add some logic in the button sub, as shown below.

```basic
Sub btnSum_Click
	If (txtNumber1.Text ="" Or txtNumber2.Text ="") Then
		xui.MsgboxAsync("Please Enter Both Numbers", "Error")
	Else
		Number1=txtNumber1.Text
		Number2=txtNumber2.Text
		sum = Number1 + Number2
		lblResults.Text= sum
	End If

End Sub
```

In the function above, we check if the textboxes are empty. If empty, we prompt the user to enter some numbers. When the above condition is met, we perform an arithmetic operation on the numbers and display the results in a label.

**Output:**

![B4A App Screenshot](/engineering-education/introduction-to-android-app-development-basic4android-b4a-part1/b4a-sample-app-output.jpg)

You can find the complete source code on [Github](https://github.com/Tsanguu/B4ASampleApp). You can also find more example projects in the [B4A community](https://www.b4x.com/android/forum/threads/b4a-projects-source-code.29614/).

### Conclusion
A couple alternatives to B4A are [Android Studio](https://developer.android.com/studio) and [Unity 3D](https://unity.com/) for Android games. But B4A is the best tool if you want to create an app quicker and is also very useful for prototyping. 

Developers who use other tools for Android app development can also use B4A. B4A is simple and straightforward. Make sure you join the [B4A forum](https://www.b4x.com/android/forum/#b4a-android.25). 

Happy coding with B4A.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

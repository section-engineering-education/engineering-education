Want to build a cool and simple Livestreaming app using React Native?
Keep reading to find out.

# React Native
According to [Wikipedia](https://en.wikipedia.org/wiki/React_Native), React Native is an open-source mobile application framework created by Facebook, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows, and UWP by enabling developers to use React's framework along with native platform capabilities.

[Documentaion for React Native](https://reactnative.dev/)


# Agora
Agora provides the building blocks for a wide range of real-time engagement possibilities. Agora is a paid service, but do not worry. The first 10,000 minutes for every month is free. You could check their pricing [here](https://www.agora.io/en/pricing/).

Using Agora, we can develop a wide variety of applications that requires real-time engagement like Audio/Video Call, Interactive Livestreaming (Audio/ Video), Interactive Gaming, Real-Time Messaging (which is in BETA at the time of writing this article).

In this article, we will be focusing on how to build a Livestreaming App using the services provided by Agora.

[Documentation for React Native Agora](https://docs.agora.io/en/Video/API%20Reference/react_native/index.html)

# Prerequisites
You need to have a basic understanding of how React/ React Native works. This article will not cover tutorial aspects of how React/ React Native, So if you do now know how it works, please refer to some tutorials and brush up your skills before beginning with this project.

# Lets Get Started
During the course of the article, we will be going through these steps,

1. Setting up the Development Environment
2. Creating a React Native App
3. Creating an Account in Agora
4. Installing Dependencies
5. Writing our App

## Step 1: Setting up the Development Environment

> We will not be using Expo to create our project. We will use the React Native CLI to create the App.

You will need Node, the React Native command-line interface, a JDK, and Android Studio.
While you can use any editor of your choice to develop your app, you will need to install Android Studio to set up the necessary tooling to build your React Native app for Android.

**Node, JDK**

I recommend installing Node via Chocolatey, a popular package manager for Windows. You can download it [here](https://chocolatey.org/install).

React Native also requires Java SE Development Kit (JDK), which can be installed using Chocolatey as well.

Open an Administrator Command Prompt (right-click Command Prompt and select "Run as Administrator"), then run the following command:

```
choco install -y nodejs.install openjdk8
```
If you have already installed Node on your system, make sure it is Node 10 or newer. If you already have a JDK on your system, make sure it is version 8 or newer.

You can find additional installation options on [Node's Downloads page](https://nodejs.org/en/download/).

**Android development environment**

Setting up your development environment can be somewhat tedious if you're new to Android development. If you're already familiar with Android development, there are a few things you may need to configure. In either case, please make sure to carefully follow the next few steps.

*1. Install Android Studio*

Download and install Android Studio. While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ® HAXM) (See here for AMD or Hyper-V)

Then, click "Next" to install all of these components.

> If the checkboxes are grayed out, you will have a chance to install these components later on.

Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.

*2. Install the Android SDK*

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 10 (Q) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on the "Configure" button, and select "SDK Manager".

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 10 (Q) entry, then make sure the following items are checked:

- Android SDK Platform 29
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 29.0.2 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

*3. Configure the ANDROID_HOME environment variable*

The React Native tools require some environment variables to be set up in order to build apps with native code.

Open the Windows Control Panel.
Click on User Accounts, then click User Accounts again
Click on Change my environment variables
Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:

The SDK is installed, by default, at the following location:

```
%LOCALAPPDATA%\Android\Sdk
```

You can find the actual location of the SDK in the Android Studio "Settings" dialog, under Appearance & Behavior → System Settings → Android SDK.

Open a new Command Prompt window to ensure the new environment variable is loaded before proceeding to the next step.

1. Open powershell
2. Copy and paste Get-ChildItem -Path Env:\ into powershell
3. Verify ANDROID_HOME has been added

*4. Add platform-tools to Path*

1. Open the Windows Control Panel.
2. Click on User Accounts, then click User Accounts again
3. Click on Change my environment variables
4. Select the Path variable.
5. Click Edit.
6. Click New and add the path to platform-tools to the list.
7. 
The default location for this folder is:

```
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

**React Native Command Line Interface**

React Native has a built-in command-line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using npx, which ships with Node.js. With ```npx react-native <command>```, the current stable version of the CLI will be downloaded and executed at the time the command is run.

## Step 2: Creating the React Native App

React Native has a built-in command line interface, which you can use to generate a new project. You can access it without installing anything globally using npx, which ships with Node.js. Let's create a new React Native project called "AwesomeProject":

```
npx react-native init AwesomeProject
```

**Preparing the Android device**
You will need an Android device to run your React Native Android app. This can be either a physical Android device or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.

Either way, you will need to prepare the device to run Android apps for development.

*Using a physical device*

If you have a physical Android device, you can use it for development in place of an AVD by plugging it into your computer using a USB cable and following the instructions here.

*Using a virtual device*

If you use Android Studio to open ./AwesomeProject/android, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio. Look for an icon that looks like this:

**Android Studio AVD Manager**

If you have recently installed Android Studio, you will likely need to create a new AVD. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Q API Level 29 image.

> If you don't have HAXM installed, click on "Install HAXM" or follow these instructions to set it up, then go back to the AVD Manager.

Click "Next" then "Finish" to create your AVD. At this point, you should be able to click on the green triangle button next to your AVD to launch it, then proceed to the next step.

**Running your React Native application**

*Step 1: Start Metro*

First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."—Metro Docs

To start Metro, run npx react-native start inside your React Native project folder:

```
npx react-native start
```

> If you're familiar with web development, Metro is a lot like webpack—for React Native apps. Unlike Kotlin or Java, JavaScript isn't compiled—and neither is React Native. Bundling isn't the same as compiling, but it can help improve startup performance and translate some platform-specific JavaScript into more JavaScript.

*Step 2: Start your application*

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```
npx react-native run-android
```

If everything is set up correctly, you should see your new app running in your Android emulator shortly.

You can pat yourself on the back now, You've completed the First Step.

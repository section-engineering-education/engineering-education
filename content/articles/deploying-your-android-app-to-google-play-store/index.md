---
layout: engineering-education
status: publish
published: true
url: /deploying-your-android-app-to-google-play-store/
title: Deploying your Android App to Play Store
description: This tutorial provides a detailed guide on the steps you should follow when deploying your Android application to the Play Store.
author: christine-wasike
date: 2021-01-25T00:00:00-12:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deploying-your-android-app-to-google-play-store/hero.jpg
    alt: Google Play Store example image
---
It is often challenging for beginners to deploy their first Android application to Play Store. There are just too many rules and steps that need to be followed. Failure to adhere to these regulations may impact your application negatively. This tutorial helps you avoid the headaches and negative experiences associated with the app deployment process.
<!--more-->
### Introduction
Releasing your first application to Google Play Store can seem like a difficult undertaking. Worry no more as you'll be learning how to publish your apps on the Google Play store in this article. 

### Goal
This article is aimed at helping you:
- Understand how to make your application store-ready.
- Learn about the Google Play Console.
- Deploy your application to Google Play Store. 

### Prerequisites
Before we begin, please ensure that you have:
- An Android application.
- Android Studio.
- A Google Play Console account.

### Step 1 - Check for compliance with Google quality guidelines
You can check out Google’s [core app quality](https://developer.android.com/docs/quality-guidelines/core-app-quality) page to ensure that your mobile application matches the global standard. This is about following the design patterns, compatibility, security, and so forth.

### Step 2 - Turn off logging and debugging
This process involves commenting out all log and print statements within your code. Turning off logs and debuggers reduces your codebase size and decreases security vulnerability, especially if you may have logged sensitive information during development.

### Step 3 - Add a crash reporting library
Crash reporting libraries give you insights into your application’s performance on different devices once it goes live. [Crashlytics](https://firebase.google.com/docs/crashlytics) by firebase is a great example. You can call the library whenever you need it.

### Step 4 - Prepare the what’s new notes for the app release
It’s always great to prepare a `What’s New` list for your application’s users. This list helps your users get an idea of what to expect from the application, especially when you’re deploying an update.

### Step 5 - Update app version code and version name for the release build
Updating your version code and name is essential in keeping track of your app’s different build variants whenever you wish to deploy updates. Do this in your app-level `build.gradle` file.

![Version Code Name](/engineering-education/deploying-your-android-app-to-google-play-store/version_code_name.png)

### Step 6 - Create a Developer Console account
If you do not have a Google Play Console account, please sign up [here](https://play.google.com/apps/publish). The signup fee is a one-time payment of $25 (for life). Alternatively, you could reach out to a friend with an existing account and have them add you to their dashboard as a developer.

### Step 7 - Upload App Bundle to the closed or open test track
#### Minifying your codebase
Minifying your codebase reduces your application's size, thus making it lighter. You should start by setting the `_minifyEnabled_` attribute in your `build.gradle` (app level) to `true`. You can learn more on how to shrink your code [here](https://developer.android.com/studio/build/shrink-code).

![Minify](/engineering-education/deploying-your-android-app-to-google-play-store/minify.png)

#### Generating a signed App Bundle
In Android Studio, navigate to the `build` option on the top menu and click *Generate Signed Bundle/APK*.

![Generate Signed Bundle/APK](/engineering-education/deploying-your-android-app-to-google-play-store/generate_app_bundle.png)

The Generate Signed Bundle or APK window will pop up, click the *Android App Bundle* option then *next*.

![Android App Bundle](/engineering-education/deploying-your-android-app-to-google-play-store/android_app_bundle.png)

Click the *Create new* button to generate your signed app bundle. This signed app bundle will always be useful when you need to push an update to the Play Store. It is a unique configuration associated with your app.

![Create new](/engineering-education/deploying-your-android-app-to-google-play-store/create_new.png)

Fill in the fields with fields and then confirm by pressing *OK*.

![Keystore](/engineering-education/deploying-your-android-app-to-google-play-store/key_store.png)

![Confirm](/engineering-education/deploying-your-android-app-to-google-play-store/confirm.png)

Select *release* as the app bundle destination because we are preparing the app for deployment.

![Release](/engineering-education/deploying-your-android-app-to-google-play-store/release.png)

Once the process is complete, you will get a confirmation message at the bottom of your window. You can now find your app bundle file in your `release` folder.

![Message](/engineering-education/deploying-your-android-app-to-google-play-store/message.png)

The Android App Bundle is a more recent format for Android distribution. It's quite different from the Android Application Package, otherwise known as the APK, that we will touch on later. I highly recommend using App Bundles because of their ability to reduce the overall size. With asset packs and dynamic features, apps become 35% smaller.

The APK stores all of the app’s files and code. You can think of it as a zip file with its particular extension. However, the APK has several disadvantages, such as:
- Lower conversion rates.
- Slower downloads.
- Higher uninstalls.
- Lower update rates.

### Step 8 - Application details needed for the Play Store
Here is a quick checklist of all the details you need for the Play Store.

| #   | Details                                        | Requirements |
| --- | --------------------                           | ----------- |
| 1   | Title                                          | 30 to 50 characters long |
| 2   | Short description                              | Up to 800 characters long |
| 3   | Long description                               | Up to 4000 characters long |
| 4   | App screenshots                                | JPEG or 24-bit PNG(no alpha)(Min-2, Max-8)(Min-320px, Max-3840px)|
| 5   | High-resolution icon                           | (512 x 512)(32-bit PNG(with alpha))|
| 6   | Feature graphic                                | (1024 w x 500 h)(JPG or 24-bit PNG(no alpha)) |
| 7   | Video trailer                                  | Aim for a 30 to 120 seconds video highlighting the most important and compelling features first|
| 8   | App category                                   | N/A |
| 9   | Content rating                                 | Apps that are "Unrated" may be removed from Google Play |
| 10  | Developer email                                | N/A |
| 11  | Privacy Policy URL                             | N/A |
| 12  | Check for app localisation (multiple dialects) | N/A |


### Useful resources for the application details
The resources below helped me understand different Play Store requirements. Hopefully, they will be of use to you as well.

[App Store Screenshot Generator](https://www.appstorescreenshot.com/) is a vital tool that helps you present your app's screenshots on a mobile frame. You will need a minimum of 2 screenshots and a maximum of 8.

[App Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/) has made it easy for developers to create privacy policies that follow the requirements of Google Play, Apple Store, Google Adsense, and many 
more.

Please go over Google Play’s guidelines on creating high-resolution icons: [Icon design specifications](https://developer.android.com/google-play/resources/icon-design-specifications).

The [feature graphic generator](https://www.norio.be/graphic-generator/) will help you make a graphic banner as per Google Play’s specific dimensions.

### Conclusion
You can now comfortably check the boxes on [Google Play Console](https://play.google.com/apps/publish) and publish your application to production.

Happy Coding!

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)
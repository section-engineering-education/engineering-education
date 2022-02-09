---
layout: engineering-education
status: publish
published: true
url: /understanding-multidex-in-android/
title: Understanding and Solving the Multidex Problem in Android
description: This article will help readers understand the multidex problem in Android. This issue can be solved using R8 for code shrinking or the multidex support library.
author: omondi-alex
date: 2022-02-09T00:00:00-09:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-multidex-in-android/hero.jpg
    alt: Solving the Multidex Problem in Android Hero Image
---
In some cases, your Android project might fail to build if reference methods exceed 65,536. In this tutorial, we will learn how to prevent this error by allowing multidex.
<!--more-->
In Android, the source code is converted to a DEX (Dalvik Executable) file during compilation.

A DEX file only accepts `64K` methods hence if the limit is exceeded, an error arises while building your project.

This limit is called the 64K reference limit because `K` represents a `Kilo` which is equivalent to 1024 (2^10).

### Prerequisites
To follow along with this tutorial, the reader should be conversant with:
- Creating Android Studio projects.
- Adding dependencies to an Android project.
- Building and debugging Android applications.

To understand what a DEX File is, we will look at the Android build system in a nutshell. This is the stage that an Android app undergoes before it's converted into an APK.

The build process includes the following stages:

![Android Build System](/engineering-education/understanding-multidex-in-android/android-build-system.png)

Once you start building your project, the source code is converted into DEX (Dalvik Executable) file by the compiler. This file contains the byte code that runs on an Android device whenever an app is launched.

The DEX files and the compiled resources are combined into a single APK by the APK Packager. The APK Packager signs the generated APK to create an executable file on Android devices.

Finally, code optimization is done to remove unused code in the final APK file.

#### Why Multidex
Multidex is vital when you exceed the 64K reference limit. The multidex library will help you avoid build errors, especially when creating complex applications that require numerous dependencies and methods.

The error that you will encounter looks like the one below:

```bash
trouble writing output:
Too many field references: 120000; max is 65536.
You may try using --multi-dex option.
```

To solve this error, you can optimize your code or enable Multidex support in your Android project.

### Optimizing your app to avoid the 64K reference limit
You can avoid muiltidex support in your Android app by reducing the number of reference methods, as well as other libraries (dependencies).

The numerous references in your app code contribute to the multidex error when they exceed the 64K reference limit.

To avoid the multidex build error, the following can be considered:

#### Manage dependencies included in your project
Dependencies contain methods and whenever you include a dependency in your code, you are indirectly importing other functions into your codebase.

Therefore, you should only include the specific library that the application requires.

#### Remove unused code using R8
R8 is a tool for optimizing your app before its released. This is the standard optimization library for Android and is implemented by default in Gradle.

R8 does app optimization in the following ways:
1. Removing unused classes, methods, and fields. This helps in shrinking the app, hence avoiding the 64K reference limit.
2. Removing unused resources. Resources include the dependencies that are included in your application.
3. Optimizing the code itself. In this case, R8 removes unused statements such as empty *if-statements, loops, try-catch block*, as well as some reusable code.
4. Code obfuscation. In this scenario, R8 renames classes, functions, and fields to short unreadable names before building the release. Code obfuscation is important if you plan to publish your app to the play store since it helps to prevent reverse engineering.

### How to use R8 for code optimization
In your module-level `build.gradle` file, go to the `buildTypes` block and set `minifyEnabled` to `true`.

By default, `minifyEnabled` is set to `false`.

```gradle
 buildTypes {
        release {
            minifyEnabled true // By default it is set to false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
```

Once the `minifyEnabled` option is set to `true`, it will optimize and obfuscate your code.

R8 also supports code shrinking by setting `shrinkResources` to `true` in the `buildTypes` block as shown below:

```gradle
buildTypes {
        release {
            minifyEnabled true // By default it is set to false
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
```

When configured, the above strategies can help one from exceeding the 64K reference limit but if it fails, then you have to enable Multidex.

> Multidex support library is enabled by default in API level higher than 21 (Android 5 and higher). Therefore, you do not need to add the Multidex support library.

### How to configure an app to support multidex for API level lower than 21
In this case, we are dealing with applications whose `minSdk` is set to `20` and below.

Setting `minSdk` is done in the module-level `build.gradle` file. API levels lower than 21 executes app code using Dalvik runtime.

By default, Dalvik is limited to one `classes.dex` bytecode file per APK. You can overcome this limitation by enabling Multidex support library.

In your module's `build.gradle` file, add the Multidex dependency as follows:

```gradle
dependencies{
    def multidex_version = "2.0.1"
    implementation "androidx.multidex:multidex:$multidex_version"
}
```

Once this dependency is added to your project, in the `build.gradle` file, your app can manage the access to extra DEX files.

To enable Multidex, edit the `build.gradle` file at the module level:

```gradle
android {
    compileSdk 31

    defaultConfig {
        ...
        minSdk 21
        targetSdk 31
        versionCode 1
        versionName "1.0"
        multiDexEnabled true // Add this to enable Multidex

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    ...
}
```

If possible, extend the `MultidexApplication` class if you have overridden the 'Application' class:

```kotlin
class MultidexDemoApp : MultiDexApplication(){

}
```
In your manifest, set `android:name` in the `application` tag, if the `Application` is not overridden as shown below:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.kotlinflowzipopdemo">

    <application
        android:name="androidx.multidex.MultiDexApplication">
        ...
        <activity
            ...
        </activity>
    </application>
</manifest>
```
If you have overridden the `Application` class, and it's impossible to change the base class, then you can instead override the `attachBaseContext()` method and inside it, you call `MultiDex.install(this)` to enable Multidex.

```kotlin
class MultidexDemoApp : SomeExtendedApplicatio(){
    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }
}
```

After doing all these configurations the Android build tools will construct a primary DEX file `(classes.dex)` and other supporting DEX files `(classes1.dex, classes2.dex, ... classesN.dex)` when building your app.

The Android build system then packages all the constructed DEX files into a single APK.

### Limitations of Multidex Support Library
Although Multidex library helps in solving the 64K limit build error, it has the following limitations:

- An Application Not Responding (ANR) problem is likely to occur if the secondary DEX file is larger than the primary DEX file.

- When targeting API levels lower than 21, it's a good idea to test exhaustively on those platforms, as your app can have difficulty starting up or loading specific sets of classes.

### Conclusion
Although the multidex error can be solved using the Multidex support library, you should consider managing dependencies and optimizing your app using R8 before enabling multidex.

To overcome the limitations of the multidex library, you can also consider code shrinking.

### Further reading
- [Multidex support](https://developer.android.com/studio/build/multidex)
- [Multidex in Android](https://blog.mindorks.com/understanding-multidex-in-android)

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

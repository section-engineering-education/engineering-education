---
layout: engineering-education
status: publish
published: true
url: /optimizing-and-securing-android-applications-with-r8/
title: Optimizing and Securing Android Applications with R8
description: This tutorial will show the reader how to optimize and secure Android applications with R8.
author: kariuki-boniface
date: 2022-01-11T00:00:00-06:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/optimizing-and-securing-android-applications-with-r8/hero.png
    alt: Optimizing and Securing Android applications with R8
---
R8 is a tool that is used to shrink, secure, and optimize Android applications. It uses proguard rules to change the behavior of application.
<!--more-->
Developers tend to confuse R8 with proguard. They are similar but have some slight differences. Later in this tutorial, we will see how the two differ from each other.

### Goals
By the end of this tutorial, you should have an understanding of the following:
- What R8 is.
- What R8 Shrinking is.
- How R8 differs from proguard.
- How R8 is enabled in Android Studio.
- How R8 is used to shrink, optimize and secure Android applications.
- Techniques used by R8 to do application Shrinking.
- Pro-guard rules and `@keep` annotation.
- Building to release version of an application.

### What is R8?
As mentioned earlier, R8 is a tool that is used to shrink, secure, and optimize Android applications.

R8 shrinking means reducing application size to a smaller size. Basically, we reduce the size of the `dex` files of the application.

Having a small app is a benefit for both you and the users. This means there will be more installs. Also, most people will have a likelihood of keeping your app on their devices.

### How does R8 differ from ProGuard?
R8 differs from proguard in the following ways:
- R8 has higher Kotlin language support as compared to proguard. Proguard is mainly used by applications developed using Java.
- Usually, the R8 compiler is much faster than the proguard compiler. This makes R8 more efficient. Also, the build time for R8 is shorter.
- In terms of shrinking, R8 is more effective than proguard. It can shrink an app by 10%, whereas proguard can cut it by 8%.

> NOTE: For gradle version 3.4.0 or higher, R8 uses the proguard rules which are already predefined.

### Enabling R8 in your project
By default, R8 is present in Android Studio. All we need is to enable it.

To enable R8, open `build.gradle` module app file and add this piece of code inside the `buildTypes`.

```gradle
android {
  ...
  buildTypes {
      release {
          minifyEnabled true
          shrinkResources true
      }
  }
  ...
}
```

The code inside the `release{}` block means that this will be applied to the release build version of your application. If you launch the app in the emulator, this code is not executed.

`minifyEnabled` is set to `true` so that it can perform the R8 functions.

`shrinkResources` is also set to `true`. This removes all the unused resources that you created/added in your application.

In cases where you want to optimize your code intensively and minimize it, add the following in `gradle.properties`:

```gradle
android.enableR8.fullMode = true
```

### How is R8 used to shrink, optimize and secure Android applications?
Lets us start with **Shrinking**.

As we mentioned, R8 is used to shrink applications before being released to the play store for users to access. Enabling it to your project will remove all unused classes, functions, and variables. Also, it removes all resources that you added to your project but were never used.

When you don't shrink your app, all 3rd party libraries that you included in your app will take some space in it. This will include the unused methods and functions within that library.

For example, when you create an application in Kotlin, your app will carry the whole `Kotlin-stdlib`. This obviously makes your app very large. Keep in mind that you also may have used some other libraries such as the Androidx libraries, Jetpack library, and Google Play Services. Such an application will be very large before being shrunk.

**Optimization**

When you shrink your app, you optimize your code. R8 will check, rewrite, and rearrange your code to improve code efficiency. It also disposes dead code that may be present.

**Security**

To provide security, R8 provides code obfuscation. This means that it will take all class names, variables, and functions in your app and they will be renamed to short unreadable names before building the release version of the app.

This will prevent malicious users from reverse engineering your app.

All the tasks above are done at compile-time by the R8 compiler.

### R8 Shrinking Techniques
R8 has several shrinking techniques which includes the following:

- **Tree Shaking Technique**

This technique ensures that it removes all unused codes and structures. It performs static analysis of the code removing instantiated types and unreachable code.

- **Optimization Technique**

This technique mainly focuses on the following:

1. Removing dead code
2. Selective inlining
3. Unused argument removal
4. Class merging

- **Identifier renaming**

This shortens the names of classes and packages.

- **Reducing debug information**

R8 Canonicalizes debug information and compresses the debug number information.

In some situations, some code structures cannot be removed by the techniques above. R8 provides another method to handle this; `Class inlining`. This is a technique that attempts to remove classes that are only used internally.

Such classes may include:

- Builders. e.g. `DatabaseBuilder` and `Retrofit.Builder`.
- Lambdas.

This classes may not be required at runtime and so may slow the app build time.

Class inlining rewrites the code in a way that unused builders or lambdas can be removed.

### Proguard rules and @keep annotation
R8 uses the proguard rules to optimize your code. It is not always advisable to rename all class names due to various reasons. But, R8 may delete a piece of code that your app actually requires. This may be because R8 did not check your code correctly.

> NOTE: Always test your app to see if it works as expected. An app may not crash in its debug version but it might crash in its release version. You can always generate a report on removed code to see what code was removed by R8.

To fix the issue of R8 getting rid of needed code, we add the `-keep` line of code to the proguard rules.

An example is as follows:

```gradle
- keep class ClassName
```

This will tell R8 that the class by the name `ClassName` should not be obfuscated. Also, you can add some functions inside the class which tells R8 to keep those functions. An example is as follows:

```gradle
- keep class ClassName { fun myFunction() }
```

In the example above, the function `myFunction()` will not be obfuscated. The rest of the functions inside that class will be obfuscated.

You can also use the `@keep` annotation in a class instead of the `-keep` in the proguard file. Adding `@keep` annotation tells R8 not to do anything to that class. The same case applies when you add it to a function or field.

You can read more on customizing proguard rules on [ProGuard Documentation.](https://www.guardsquare.com/manual/configuration/usage)

### Building to release version of an application
By default, when you build an app in Android Studio, it is built to the debug version. In order to build it to release version, you need to do the following:

1. Click on `build` menu on Android Studio and navigate to select build variant.

![Screen one](/engineering-education/optimizing-and-securing-android-applications-with-r8/screen-one.png)

2. Select build variants and active build variants will appear. Click on the drop-down and select the release version. This will rebuild your app in its release version.

![Screen two](/engineering-education/optimizing-and-securing-android-applications-with-r8/screen-two.png)

### Conclusion
In this tutorial, we have seen that R8 is a tool used to shrink, optimize, secure, and obfuscate code in Android. R8 is slightly different from proguard despite it using the ProGuard rules to perform its tasks. When comparing the two, R8 is outstanding and best to optimize and shrink your application size.

Happy Coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

### Optimizing and securing android applications with R8 
R8 is a tool that is used to shrink, secure, and optimize Android applications. It uses ProGuard rules to change the application behavior. People tend to confuse R8 and ProGuard. They are almost similar but they have some slight differences. Later in this article, we will see how the two differ from each other.

### Goals
By the end of this tutorial, the reader should have an understanding of the following:
- What R8 is
- What R8 Shrinking is
- How does R8 differ from ProGuard
- How R8 is enabled in android studio
- How is R8 used to shrink, optimize and secure android applications
- Techniques used by R8 to do application Shrinking
- Proguard rules and `@keep` annotation
- Building to release version of an application

### What is R8?
We have just said that R8 is a tool that is used to shrink, secure,  and optimize Android applications.

 R8 shrinking means reducing application size to a smaller size. Basically, we reduce the size of the  `dex` files of the application. 
 
 Having a small app is a benefit for both you and the users. This means there will be more installs. Also, most people will have a likelihood of keeping your app on their mobile phones.

### How does R8 differ from ProGuard?

R8 differs from ProGuard in the following ways:
- R8 has higher Kotlin language support as compared to Proguard.  Proguard is mainly used by applications developed using Java. Though it is supported by Kotlin, but not that much.
- Usually, the R8 compiler is much faster than the ProGuard compiler. This makes R8 more efficient. Also, the build time for R8 is shorter.
- In terms of shrinking, R8 is more effective than ProGuard. It can shrink an app by 10%, whereas ProGuard can cut it by 8%.

> NOTE:  For Gradle version 3.4.0 or higher, R8 uses the ProGuard rules which are already predefined for you.

### Enabling R8 in your project
By default, R8 is present in the android studio application. All we need is to enable it.
To enable, open the `build.gradle` module app file. Add this piece of code inside the `buildTypes`.

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

The code `minifyEnabled` is set to `true` so that it can perform the R8 functions.

The code `shrinkResources` is also set to `true`. This will remove all unused resources that you created in your application.

For a case where you want to optimize your code intensively and  minimize your code, add the following in  `gradle.properties`:
```gradle
  android.enableR8.fullMode=true
```

### How is R8 used to shrink, optimize and secure android applications?

Lets us start with **Shrinking**.

As we said, R8 is used to shrink applications before being released to the play store for users to access. Enabling it to your project will remove all unused classes, functions, and variables. Also, it removes all resources that you added to your project but were never used.

When you don't shrink your app, all  3rd party libraries that you included in your app will take some space in it. This will include the unused methods and functions within that library.

For example, when you create an application in Kotlin, your app will carry the whole Kotlin-stdlib. This obviously will make your app very large. Keep in mind that you also may have used some other libraries such as the Androidx libraries, Jetpack library, and Google Play  Services. Such an application will be very large before being shrunk.

**Optimization**

When you shrink your app, you Optimize your code. R8 will check and rewrite and rearrange your code to improve code efficiency. Also, it disposes of dead code that may be present in your code.

**Security**

To provide security, R8 provides code Obfuscation. This actually means that it will take all class names, variables, and functions of your app and they will be renamed to short unreadable names before building the release version of the app. 

This will prevent a situation where a certain malicious user can get your application and reverse engineer it to access your code.

All the above tasks are done at compile-time by the R8 Compiler.

### R8 Shrinking Techniques
R8 has several shrinking techniques which includes the following: 

- **Tree Shaking Technique**  

This technique ensures that it removes all unused codes and structures. It performs static analysis of the code removing instantiated types and unreachable code.
- **Optimization Technique** 

This technique focuses on the following:
1. Removing dead code
2. Selective inlining,  
3. Unused argument removal, 
4. Class merging among many others.
- **Identifier renaming** 

This ensures it shortens the names of classes and packages.
- **Reducing Debug Information**

R8 Canonicalizes debug information and compresses the debug number information

In some situations, some code structures cannot be removed by the above techniques. R8 provides another method to handle this called  `Class inlining`. This is a technique that attempts to remove classes that are only used internally. 

Such classes may include:

- Builders. eg `DatabaseBuilder` and `Retrofit.Builder`

- Lambdas. 

This class may not be required at runtime and so they may slow the app build time. 

Class inlining rewrites the code in a way that builders or lambdas being unused can be removed. 

### Proguard rules and `@keep` annotation

R8 uses the ProGuard rules to optimize your code. It is not always advisable to rename all class names due to various reasons. But, R8 may delete a piece of code that your app actually requires. This may be because R8 did not check your code correctly.

> NOTE: Always test your app to see if it works as expected. An app may not crash in its debug version but it might crash in its release version. You can always generate a report on removed code to see what code was removed by R8. 

To fix this issue where R8 gets rid of needed code, we add the `-keep` line of code to the ProGuard rules.

An example is as follows:

```
- keep class SomeClass
```

This will tell R8 that the class by the name `SomeClass` should not be obfuscated. Also, you can add some functions inside the class which tells R8 to keep those functions. An example is as follows:

```
- keep class SomeClass { fun myFunction() }
```

In the example above, the function `myFunction()` will not be obfuscated. The rest of the functions inside that class will be obfuscated.

You can also use the `@keep` annotation in a class instead of the `-keep` in the ProGuard file.  Adding `@keep` annotation tells R8 not to do anything to that class having the annotation. The same case applies when you add it to a function or field.

You can read more on customizing ProGuard rules on [ProGuard  Documentation.](https://www.guardsquare.com/manual/configuration/usage)

### Building to release version of an application

By default, when you build an app in android studio, it is built to the debug version. In order to build it to release version, you just  need to do as follows:

1. Click on Build Menu on android studio and navigate to Select Build Variant

![Screen one](/engineering-education/optimizing-and-securing-android-applications-with-R8/screen-one.png)

2. Select Build Variants and Active Build Variants will appear. Click on the drop-down and select the release version. This will rebuild your app now in its release version.

![Screen one](/engineering-education/optimizing-and-securing-android-applications-with-R8/screen-two.png)

### Conclusion

In conclusion, we have seen that R8 is a tool used to shrink,  optimize, secure, and obfuscate code in android. R8 is slightly different from ProGuard despite it using the ProGuard rules to perform its tasks. When comparing the two, R8 is outstanding and best to optimize and shrink your application size.


Have you been wondering that your app might fail to build due to the 64K reference limit? Worry no more, because in this tutorial we will learn how to allow multidex in an Android project. Sometimes your project might fail to build if reference methods exceed 65,536. During compilation in Android, the source code is converted to a DEX (Dalvik Executable) file. A DEX file only accepts 64K methods hence if the limit is exceeded, an error arises while building your project. This limit is called the 64K reference limit because `K` represents a `Kilo` which is equivalent to 1024 (2^10).

### Prerequisites
To follow along with this tutorial, the reader should be conversant with:
- Creating Android Studio projects.
- Adding dependencies to an Android project. 
- Building and debugging Android projects.  

To understand what a DEX File is, we will look at the Android Build System in a nutshell. Android Build System is the stage that an Android app undergoes before it gets converted into an APK. The build process includes the following stages:

![Android Build System](/engineering-education/understanding-multidex-in-android/android-build-system.png)

1. Once you click on the run button to build your project, the source code is converted into DEX(Dalvik Executable) file by the compiler. This is the file that includes the byte code that runs on an Android device whenever an app is launched.
2. The DEX files and the compiled resources are combined into a single APK by the APK Packager.
3. APK Packager signs the generated APK to create an executable file on Android devices.
4. Code optimization to remove unused code in the final APK file.

#### Why Multidex
Multidex comes in handy when you exceed the 64K reference limit. Sometimes you are building a very complex application that requires you to use various dependencies and methods. In that case, Multidex library will help you avoid encountering build error.
The error you will encounter looks like the one below:

```build
trouble writing output:
Too many field references: 120000; max is 65536.
You may try using --multi-dex option.
```
To solve this error, you can optimize your code or enable Multidex support library in your project.

### Optimizing your App to Avoid the 64K Reference Limit
Sometimes enabling muiltidex support for your android app can be avoided by reducing the number of reference methods used by your app code or the number of included libraries(dependencies). The references to your app code are what results in the multidex error when they exceed the 64K reference limit. To avoid the multidex build error, the following can be considered:

#### Manage dependencies included in your project
Dependencies contain methods and whenever you include a dependency to your code, you are indirectly importing various methods into your codebase. It is appropriate that you include only the specific library that you intend to use.

#### Remove unused code using R8
R8 is a tool for optimizing your app before release. It is the standard optimization library for Android that is implemented by default in Gradle. It does app optimization in the following ways:

1. Removes unused classes, methods, and fields  
Removing unused references helps in shrinking the app hence avoiding hitting the 64K reference limit.

2. Removes unused resources
Resources can be dependencies that are included in your application.

3. Optimizes the code itself
In this case, R8 removes unused statements, for instance, empty if-statements, loops, try-catch block, and even some codes that can be re-used.

4. Code Obfuscation
This is the scenario where R8 takes all your classes, functions, fields, and renames them to short unreadable names before building the release. Code obfuscation is important if you plan to publish your app to the play store since it helps to prevent reverse engineering.

### How to use R8 for code optimization
In your module-level `build.gradle` file, go to the `buildTypes` block and set `minifyEnabled` to `true` in the `release` block. By default, `minifyEnabled` is set to `false`.

```gradle
 buildTypes {
        release {
            minifyEnabled true // By default it is set to false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
```
Once the `minifyEnabled` option is set to `true`, it will optimize and obfuscate your code. R8 also allows code shrinking by setting `shrinkResources` to `true` in the `buildTypes` block as shown below.

```gradle
buildTypes {
        release {
            minifyEnabled true // By default it is set to false
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
```
The above strategies when configured can help prevent exceeding the 64K reference limit but if it fails, then you have to enable Multidex. 

> Note: Multidex support library is enabled by default in API level higher than 21(Android 5 and higher) and therefore, you do not require to add the Multidex support library.

### How to Configure an App to Support Multidex for API Level Lower Than 21

In this case, we are dealing with applications whose `minSdk` is set to 20 and below. Setting `minSdk` is done in the module-level `build.gradle` file. API levels lower than 21 executes app code using Dalvik runtime. By default, Dalvik is limited to one `classes.dex` bytecode file per APK. You can overcome this limitation by enabling Multidex support library.

1. In your module's 'build.gradle' file, add the Multidex dependency. 

```gradle
dependencies{
    def multidex_version = "2.0.1"
    implementation "androidx.multidex:multidex:$multidex_version"
}
```
Once this dependency is added to your project, in the `build.gradle` file, your app can manage the access to extra DEX files.

To enable Multidex, edit the 'build.gradle' file at the module level. 
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
2. If possible, extend the 'MultidexApplication' class if you have overridden the 'Application' class: 

```kotlin
class MultidexDemoApp : MultiDexApplication(){
    ...
}
```
3. In your manifest, set `android:name` in the `application` tag if the `Application` is not overridden as shown below:
```manifest
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
3. If you have overridden the `Application` class and it is impossible to change the base class, then you can instead override the `attachBaseContext()` method and inside it, you call `MultiDex.install(this)` to enable Multidex. 

```kotlin
class MultidexDemoApp : SomeExtendedApplicatio(){
    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }
}
```
After doing all these configurations, when building your app, the Android build tools will construct a primary DEX file `(classes.dex)` and other supporting DEX files `(classes1.dex, classes2.dex, ... classesN.dex)`. The android build system then packages all the constructed DEX files into a single APK.

### Limitations of Multidex Support Library
Although Multidex library helps in solving the multidex build error, it has the following limitations:

- An Application Not Responding (ANR) problem is likely to occur if the secondary DEX file is larger than the primary DEX file. 
- When targeting API levels lower than 21, it's a good idea to test exhaustively on those platforms, as your app can have difficulty starting up or loading specific sets of classes. 

### References
- https://developer.android.com/studio/build/multidex
- https://blog.mindorks.com/understanding-multidex-in-android

### Conclusion
Although Multidex error can be solved by configuring the multidex support library, you should consider managing dependencies and optimizing your app using R8 before enabling multidex. To overcome the limitations of the multidex library you can as well ensure that you enable code shrinking. 

Happy coding!!!

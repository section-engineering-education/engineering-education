---
layout: engineering-education
status: publish
published: true
url: /hilt-android-tutorial/
title: Using Hilt Dependecy Injection Framework in Android
description: This article will guide the reader on how to implement Hilt in Android projects using Kotlin. Hilt is a dependency injection framework that can help you save significant time.
author: raphael-ndonga
date: 2021-05-31T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hilt-android-tutorial/hero.jpg
    alt: Hilt Dependency Injection Framework
---
A *dependency* is an object that another object requires. In other words, the latter object *depends* on the former for it to function.
<!--more-->

### Introduction
*Dependency Injection* is whereby dependencies are provided to a class instead of the class having to create them itself. Hilt is a standardized way of enforcing dependency injection in an Android application. 

### Goal
This tutorial aims to:
1. Define dependency injection.
2. Explain why dependency injection is important.
3. Show in detail how to use Hilt for dependency injection.

### Prerequisites
1. A basic understanding of object-oriented programming
2. A basic understanding of Android app development with Kotlin.
3. [Android Studio 4.0](https://developer.android.com/studio) or higher.

### Table of contents
1. Manual Dependency Injection.
2. Dependency Injection with Hilt.
3. Hilt and Interfaces.
4. Hilt and 3rd Party Libraries
5. Conclusion

### Part 1: Manual dependency injection
### Getting Started
You can download this project from [here](https://github.com/RaphaelNdonga/hilt-tutorial).  

> Note that each step has its branch.

Create a new project in Android Studio and name it `Hilt Tutorial`.

Next, create the following `EnglishPerson` class:

```kotlin
class EnglishPerson {
 fun speakEnglish(){
 Log.i("EnglishPerson","Hello kind sir.")
    }
}
```

Create a second class and name it `SpanishPerson`:

```kotlin
class SpanishPerson {
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

Since English is the most widely spoken language, we need the Spanish person to learn it. 

A possible solution is to instantiate the `EnglishPerson` class into the `SpanishPerson` class. 

However, this is not advisable:

```kotlin
class SpanishPerson {
 val englishPerson = EnglishPerson()
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

Now, the Spanish person is also in English. This is *field injection*.

However, this turns out to be a poor way of building classes. It violates the `Single Responsibility Principle`: A Spanish class should not concern itself with English matters!

This is where dependency injection comes in.

Modify `SpanishPerson` class as follows:

```kotlin 
class SpanishPerson(val englishPerson: EnglishPerson) {
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

For `SpanishPerson` to function, it requires a dependency; `EnglishPerson`. This is *dependency injection* or *constructor injection*.

It turns out that setting up your code in this manner has several benefits. When the Spaniard learns a new language, you simply add it to the constructor. 

You don't have to keep changing the code *inside* `SpanishPerson` class. The code is thus, more maintainable and flexible. This also makes it more testable and scalable.

We can run the following code in the MainActivity:

```kotlin
class MainActivity : AppCompatActivity() {
 private lateinit var spanishPerson: SpanishPerson
 private lateinit var englishPerson: EnglishPerson
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        englishPerson = EnglishPerson()
        spanishPerson = SpanishPerson(englishPerson)
        spanishPerson.speakSpanish()
        spanishPerson.englishPerson.speakEnglish()
    }
}
```

Run your app and open the `logcat`. Then, search for `EnglishPerson` and `SpanishPerson`:

```bash
2021-05-04 20:18:57.663 20540-20540/com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.

2021-05-04 20:35:28.164 21573-21573/com.example.android.hilttutorial I/SpanishPerson: Despacito senor
```

There are a few things to note in the `MainActivity`.

1. `MainActivity` initializes its dependencies. Therefore, its dependencies are only available during its lifetime. This makes `MainActivity` a *component*.

2. `MainActivity` also hosts the dependencies. This makes it a *dependency container*.

### Dependency injection with Hilt
Manual dependency injection works. However, as the app scales, it becomes cumbersome to manage dependencies. Though Hilt has a high setup cost, it is quite beneficial when scaling applications.

### Getting started with Hilt
In the project's root build.gradle file, add the following statement:

```gradle
buildscript {
    ...
    ext.hilt_version = '2.35' //check for most recent version
    dependencies {
        ...
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
```

In app/build.gradle file, include:

```gradle
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'

android {
    ...
}

dependencies {
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-compiler:$hilt_version"
}
```

Create a new class that extends `Application()` and annotate it as follows:

```kotlin
@HiltAndroidApp
class MyApplication:Application() {
}
```

This gives `Hilt` access to the entire application. It creates a *dependency container* at the application level. In other words, Hilt can supply dependencies to any part of the app.

Add the following code in the `AndroidManifest.xml` file under the application tag:

```xml
 <application
 android:name=".MyApplication"
        ...>
```

This notifies the manifest to refer to the application class connected to Hilt.

### Creating Hilt dependencies
Make this change to the `EnglishPerson` class:

```kotlin
class EnglishPerson @Inject constructor(){
    ...
}
```

`@Inject` gives Hilt access to `EnglishPerson`'s constructor. This means that now Hilt can generate instances of `EnglishPerson`.

Make the following change to `MainActivity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
 @Inject
    lateinit var englishPerson: EnglishPerson
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        englishPerson.speakEnglish()
    }
}
```

`@Inject` here has a different purpose. It identifies the `injectable` field. Injectable means that Hilt can supply the instantiated dependencies to it.

> Note that you now don't have to instantiate the `EnglishPerson()` class.

`@AndroidEntryPoint` has made an entrance. It identifies the dependency container. This is where you will get your dependencies.

> **Note**: `@AndroidEntryPoint` annotates `Activities`, `Fragments`, `Views`, `Services` and `BroadcastReceivers`. It turn them into dependency containers.

Run your app and open the logcat. 

Search for `EnglishPerson`:

```bash
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.
```

Make the following changes to `SpanishPerson`:

```kotlin
class SpanishPerson @Inject constructor(val englishPerson: EnglishPerson) {
    ...
}
```

`@Inject` here serves the same purpose as in `EnglishPerson`. It gives Hilt access to `SpanishPerson`'s constructor. Hilt can then generate an instance of `SpanishPerson`.

However, it's not as simple as the first case. To create `SpanishPerson`, it also needs to create `EnglishPerson`. This is because `SpanishPerson` requires `EnglishPerson` as a parameter in its constructor.

Hilt already knows how to create `EnglishPerson`. So all is well.

Instances that Hilt knows how to create go by the name *bindings*.

So `EnglishPerson` and `SpanishPerson` are bindings.

Make the following changes to `MainActivity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
 @Inject
    lateinit var spanishPerson: SpanishPerson
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        spanishPerson.speakSpanish()
        spanishPerson.englishPerson.speakEnglish()
    }
}
```

Brief and beautiful!

Run the app and open the logcat. 

Search for `SpanishPerson` and `EnglishPerson`:

```bash
com.example.android.hilttutorial I/SpanishPerson: Despacito senor
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.
```

### Part 3: Hilt and interfaces
Spanish person, English person, why so divisive? We are all people!

Create the following interface:

```kotlin
interface Person {
 fun speakLanguage()
}
```

Modify `EnglishPerson`:

```kotlin
class EnglishPerson @Inject constructor(): Person {
 override fun speakLanguage() {
 Log.i("EnglishPerson", "Hello kind sir")
    }
}
```

Modify `MainActivity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
 @Inject
    lateinit var englishPerson: Person //Note that EnglishPerson is replaced with Person
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        englishPerson.speakLanguage()
    }
}
```

Before you run the code you might ask:

Why replace the more specific `EnglishPerson` with the more generic `Person` type?

Using the interfaces' type can be very useful. One use case is that code created in this manner is very testable. Using the type `Person` makes it easy to replace it with a fake one during testing.

However, when you run your app, it crashes at compile time. Hilt is unable to implement the interface. It does not know how to. Interfaces do not have constructors like classes do. It is impossible to @Inject them.

You need to empower Hilt with the knowledge of how to implement an interface. Create an `abstract` class with the following annotations:

```kotlin
@Module
@InstallIn(ActivityComponent::class)
abstract class PersonModule{

}
```

A *module* informs Hilt how to provide dependencies when it cannot access the constructor. `@Module` is used to identify modules.

`@InstallIn(ActivityComponent)` declares that the following implementation will be alive only as long as the activity is active. The activity is, therefore, the component.

Inside the module create an `abstract` function:

```kotlin
@InstallIn(ActivityComponent::class)
@Module
abstract class PersonModule {
 @Binds
 abstract fun EnglishPersonImpl(englishPerson: EnglishPerson):Person
}
```

`@Binds` tells Hilt which implementation to use when it needs to provide an instance of an interface. The information on how to provide the implementation is in the function parameters.

Since Hilt already knows how to implement `EnglishPerson`, all is well.

Run the code and open the logcat. 

Search for 'EnglishPerson':

```bash
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir
```

Now modify `SpanishPerson`.

```kotlin
class SpanishPerson @Inject constructor():Person {
 override fun speakLanguage() {
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

Make the following changes in the `MainActivity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
 @Inject
    lateinit var spanishPerson: Person
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        spanishPerson.speakLanguage()
    }
}
```

Run your app and open the logcat. Search for 'SpanishPerson'

Nothing?

Try searching for 'EnglishPerson'

```bash
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir
```

It seems that Hilt is using `EnglishPersonImpl` to generate instances of `SpanishPeople` as `EnglishPeople`!

We need to differentiate them somehow. 

Add the following code outside `PersonModule` class but in the same file:

```kotlin
@Qualifier
annotation class EnglishQualifier

@Qualifier
annotation class SpanishQualifier
```

You will use these qualifiers to differentiate the `English` and `Spanish` implementation.

Create another `abstract` function that implements `SpanishPerson`:

```kotlin
@SpanishQualifier
@Binds
abstract fun SpanishPersonImpl(spanishPerson:SpanishPerson):Person
```

Also, add the `@EnglishQualifier` to `EnglishPersonImpl`.

The final code for the `PersonModule` looks like this:

```kotlin
@InstallIn(ActivityComponent::class)
@Module
abstract class PersonModule {

 @EnglishQualifier
 @Binds
 abstract fun EnglishPersonImpl(englishPerson: EnglishPerson):Person

 @SpanishQualifier
 @Binds
 abstract fun SpanishPersonImpl(spanishPerson:SpanishPerson):Person
}

@Qualifier
annotation class EnglishQualifier

@Qualifier
annotation class SpanishQualifier
```

Head over to `MainActivity` and make a minor change. 

Add the qualifier:

```kotlin
@SpanishQualifier
@Inject
lateinit var spanishPerson:Person
```

Run your app and open the logcat. 

Search for `SpanishPerson`:

```bash
com.example.android.hilttutorial I/SpanishPerson: Despacito senor
```

The code works now.

### Part 4: Hilt and third-party libraries
Hilt works well when we have access to constructors. But what if you can't access constructors? This happens when you import 3rd party libraries. You don't own the classes. Has the party stopped?

Import the following `Gson` library:

```gradle
  implementation 'com.google.code.gson:gson:2.8.6'
```

Create a GsonModule as follows:

```kotlin
@Module
@InstallIn(ActivityComponent::class)
object GsonModule {
 @Provides
 fun provideGson(): Gson {
 return Gson()
    }
}
```

Through `@Provides`, the annotated function gives Hilt the following information:

- The return type tells Hilt what type the function provides instances of.

- The parameters tell Hilt the dependencies required to provide the type. In our case, there are none.

- The function body tells Hilt how to provide an instance of the corresponding type. Hilt executes the function body every time it needs to provide an instance of that type.

Make the following changes to `MainActivity`:

```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    @Inject
        lateinit var gson: Gson
    override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)
    Log.i("MainActivityGson",gson.toString())
        }
}
```

Run your app and open the logcat. Search for `MainActivityGson`.

You'll find a lot of words, which are not important. The point is, you have injected the 3rd party library dependency successfully.

When it comes to classes such as `Gson`, `Retrofit` and `Room database`, we may need to make them available to the entire application.

Try injecting the `Gson` dependency into `MyApplication`

```kotlin
@HiltAndroidApp
class MyApplication:Application() {
 @Inject
    lateinit var gson:Gson
 override fun onCreate() {
 super.onCreate()
 Log.i("MyApplicationGson",gson.toString())
    }
}
```

Run your app.

Compile-time error.

Do you remember the discussion on components? If you look at the `GsonModule` component, it is installed in the `ActivityComponent.class`.  Therefore, it is only available during the lifetime of an activity rather than that of the entire application.

To correct this error, change the `ActivityComponent.class` to `SingletonComponent.class`. 

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object GsonModule {
    ...
}
```

Run your app and open the logcat. When you, search for `MyApplicationGson`, you get the same long and weird string.

But is the `Gson` object the same in `MyApplication` and `MainActivity`?

A short answer: No. 

Bindings in Hilt are `naturally unscoped`. This means that whenever a dependency is required, Hilt instantiates a new one. 

To ensure only one instance of `Gson` is available at a time, modify `GsonModule` as follows:

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object GsonModule {
 @Singleton
 @Provides
 fun provideGson(): Gson {
 return Gson()
    }
}
```

`@Singleton` is the annotation used to ensure that the generated instance is the only one throughout the application's lifecycle.

`ActivityScoped` ensures that the instance is the same throughout the activity.

For more on scopes, check out the [Android documentation](https://developer.android.com/training/dependency-injection/hilt-android#component-scopes)

### Conclusion
This tutorial started by illustrating manual dependency injection. Manual dependency injection is alright. However, it may get cumbersome as the application scales.

Hilt then came in with its `@Inject` annotation that creates `injectable` fields, `methods`, and `constructors`. `@Inject` also helps Hilt know how to provide a certain class by giving it access to the constructor.

You observed cases whereby the constructor might be unavailable. 

These included:
1. When an interface is used.
2. When a 3rd party library is used.

When a constructor is unavailable, a module has to be used. A module is a class that tells Hilt how to provide an instance. It needs to be installed in a component. This allows it to keep track of the lifetime of the module.

`@Binds` provides the interface implementation. The implementation was a class that Hilt knew how to provide.

`@Provides` provides the 3rd party library implementation. Hilt runs the function body each time to get the instance required.

Hopefully, this article shines some light on dependency injection with Hilt. 

Go forth and inject!

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
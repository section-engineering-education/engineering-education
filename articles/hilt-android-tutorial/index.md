# Hilt Android Tutorial
## Introduction
Hilt is a standardized way of enforcing dependency injection in an android application. This tutorial aims to:
1. Define dependency injection.
2. Explain why dependency injection is important.
3. Show in detail how to use hilt for dependency injection.
## Pre-requisites
1. A basic understanding of object-oriented programming
2. A basic understanding of android app development with kotlin
3. Android Studio 4.0 or higher.

## Table of contents
1. Manual Dependency Injection.
2. Dependency Injection with hilt.
3. Hilt and Interfaces.
4. Hilt and 3rd Party Libraries
5. Conclusion
## Getting Started
If you understand git, you can access this project from the following link: [Hilt Tutorial](https://github.com/RaphaelNdonga/hilt-tutorial).  
Each step has its own branch.

Otherwise, create a new android studio project.
## What is dependency injection?
A *dependency* is an object that another object requires. The latter object *depends* on the former for it to function.

*Dependency Injection* is whereby dependencies are provided to a class instead of the class having to create them itself.

## Part 1: Manual Dependency Injection
Create a new project in android studio. Name it 'Hilt Tutorial'.

Create the following class:
```kotlin
class EnglishPerson {
 fun speakEnglish(){
 Log.i("EnglishPerson","Hello kind sir.")
    }
}
```
Alas! An English person who speaks English.

Create the another class:
```kotlin
class SpanishPerson {
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```
Alas! A Spanish person who speaks Spanish.

Right after you have created your spanish person, you realize something disconcerting. English is the most widely spoken language on earth. A Spanish person needs to learn English! 

A solution (not advisable):
```kotlin
class SpanishPerson {
 val englishPerson = EnglishPerson()
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```
Now the spanish person is also an english person. This is *field injection*.

However, this turns out to be a poor way of building classes. It violates the "Single Responsibility Principle". A Spanish class should not concern itself with English matters!

This is where dependency injection comes in.

Modify SpanishPerson class as follows:
```kotlin 
class SpanishPerson(val englishPerson: EnglishPerson) {
 fun speakSpanish(){
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

For SpanishPerson to function, it requires a dependency; EnglishPerson. This is *dependency injection* or *constructor injection*

It turns out that setting up your code in this way has a few benefits. When the Spaniard learns a new language, you simply add it to the constructor. You don't have to keep changing the code *inside* SpanishPerson class. The code is more maintainable and flexible. This makes it more testable and scalable.

The Spaniard to exercise her linguistic abilities. Do this in MainActivity:
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
Run your app and open the logcat. Search for `EnglishPerson` and `SpanishPerson`:
```
2021-05-04 20:18:57.663 20540-20540/com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.

2021-05-04 20:35:28.164 21573-21573/com.example.android.hilttutorial I/SpanishPerson: Despacito senor
```

There are a few things to note in `MainActivity`.

1. `MainActivity` initializes its dependencies. Therefore, its dependencies are only available during its lifetime. This makes `MainActivity` as a *component*.

2. `MainActivity` has gets the dependencies. This makes it a *dependency container*.

## Dependency injection with hilt
Manual dependency injection works . However, as the app scales, it becomes cumbersome to manage dependencies. Hilt has a higher cost of set up. But it proves to be very beneficial to an app that scales.

## Getting Started with Hilt

In the project's root build.gradle file:
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

In app/build.gradle file:
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
This gives hilt access to the entire application. It creates a *dependency container* at the application level. Hilt can supply dependencies to any part of the app.

Add the following code in the `AndroidManifest.xml` under the application tag:
 ```xml
 <application
 android:name=".MyApplication"
        ...>
```
This tells the manifest of your new root application class. You want the manifest to refer to the application class connected to hilt.



## Creating Hilt dependencies
Make this change to `EnglishPerson` class:
```kotlin
class EnglishPerson @Inject constructor(){
    ...
}
```
`@Inject` gives hilt access to `EnglishPerson`'s constructor. This means that now hilt can generate instances of `EnglishPerson`.

Make this change to `MainActivity`:
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
`@Inject` here has a different purpose. It identifies the injectable field. Injectable means that hilt can supply the instantiated dependencies to it.

Note that now you don't have to instantiate `EnglishPerson()`.

`@AndroidEntryPoint` has made an entrance. It identifies the dependency container. This is where you will get your dependencies.

>**Note**: @AndroidEntryPoint annotates Activities, Fragments, Views ,Services and BroadcastReceivers. It makes dependency containers out of them that can get dependencies.

Run your app and open the logcat. Search for 'EnglishPerson':
```
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.
```

Make the following changes to `SpanishPerson`:
```kotlin
class SpanishPerson @Inject constructor(val englishPerson: EnglishPerson) {
    ...
}
```

`@Inject` here serves the same purpose as in `EnglishPerson`. It gives hilt access to `SpanishPerson`'s contructor. Hilt then is able to generate instances `SpanishPerson`.

However, it's not as simple as the first case. To create `SpanishPerson`, it also needs to create `EnglishPerson` . This is because it the constructor needs it.

Hilt already knows how to create `EnglishPerson`. So all is well.

Instances that hilt knows how to create go by the name *bindings*

So EnglishPerson and SpanishPerson are bindings.

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

Run the app and open the logcat. Search for 'SpanishPerson' and 'EnglishPerson':
```
com.example.android.hilttutorial I/SpanishPerson: Despacito senor
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir.
```

## Part 3: Hilt and interfaces
Spanish person, English person, why so divisive? We are all people, or persons dare I say.

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
    lateinit var englishPerson: Person
 override fun onCreate(savedInstanceState: Bundle?) {
 super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        englishPerson.speakLanguage()
    }
}
```

Before you run the code you might ask:

 Why replace the more specific EnglishPerson with the more generic Person type?

 Using the interfaces' type can be very useful. One usecase is that code created in this manner is very testable. Using the type Person makes it easy to replace it with a fake one during testing.

When you run your app, it crashes at compile time. Hilt is unable to implement the interface. It does not know how to. Interfaces do not have constructors like classes do. It is impossible to @Inject them.

You need to empower hilt with the knowledge of how to implement an interface. Create an abstract class with the following annotations:
```kotlin
@Module
@InstallIn(ActivityComponent::class)
abstract class PersonModule{

}
```
A *module* informs hilt how to provide dependencies when it cannot access the constructor. `@Module` is used to identify modules.

`@InstallIn(ActivityComponent)` declares that the following implementation will be alive only as long as the activity is alive. The activity is the component.

Inside the module create an abstract function:
```kotlin
@InstallIn(ActivityComponent::class)
@Module
abstract class PersonModule {
 @Binds
 abstract fun EnglishPersonImpl(englishPerson: EnglishPerson):Person
}
```
`@Binds` tells hilt which implementation to use when it needs to provide an instance of an interface.
The information on how to provide the implementation is in the function parameters.

Since hilt already knows how to implement `EnglishPerson` all is well.

Run the code and open the logcat. Search for 'EnglishPerson':
```
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir
```

Now modify `SpanishPerson`. They're people too right?
```kotlin
class SpanishPerson @Inject constructor():Person {
 override fun speakLanguage() {
 Log.i("SpanishPerson","Despacito senor")
    }
}
```

Modify `MainActivity`:
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

```
com.example.android.hilttutorial I/EnglishPerson: Hello kind sir
```

It seems that hilt is using `EnglishPersonImpl` to generate instances of SpanishPeople as EnglishPeople!

You need to differentiate them somehow. Add the following code outside `PersonModule` class but in the same file:
```kotlin
@Qualifier
annotation class EnglishQualifier

@Qualifier
annotation class SpanishQualifier
```

You will use these qualifiers to differentiate the English and Spanish Implementation.

Create another abstract function which that implements SpanishPerson:
```kotlin
@SpanishQualifier
@Binds
abstract fun SpanishPersonImpl(spanishPerson:SpanishPerson):Person
```

Also add the `@EnglishQualifier` to `EnglishPersonImpl`.
The final code of PersonModule looks like this:
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

Head over to `MainActivity` and change only one thing. Add the qualifier:
```kotlin
@SpanishQualifier
@Inject
lateinit var spanishPerson:Person
```

Run your app and open the logcat. Search for 'SpanishPerson':
```
com.example.android.hilttutorial I/SpanishPerson: Despacito senor
```

The code works now.

## Part 4: Hilt and 3rd Party Libraries
Hilt works well when we have access to constructors. But what if you can't access constructors? This happens when you import 3rd party libraries. You don't own the classes. Has the party stopped?

Import the following Gson library:
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
Through `@Provides`, the annotated function gives hilt the following information:

* The return type tells Hilt what type the function provides instances of.

* The parameters tell Hilt the dependencies required to provide the type. In our case, there are none

* The function body tells Hilt how to provide an instance of the corresponding type. Hilt executes the function body every time it needs to provide an instance of that type.

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
You'll find a lot of words, which is not important. The point is, you have injected the 3rd party library dependency.

When it comes to such classes as Gson, Retrofit and a Room database, you want to make them available to the entire application. Is this the case here?

Try injecting the gson dependency into `MyApplication`
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

Compile time error.

Do you remember the discussion on components? If you look at `GsonModule`, the component it is installed in is the `ActivityComponent.class`.  Therefore, it is only available during the lifetime of an activity. Not the lifetime of the entire application.

To correct this error, change the `ActivityComponent.class` to `SingletonComponent.class`. 

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object GsonModule {
    ...
}
```

Run your app and open the logcat. Search for `MyApplicationGson`.
You get the same long, weird string.

But is the Gson object the same one in `MyApplication` as in `MainActivity`?

No its not. Bindings in hilt are naturally unscoped. This means that whenever a dependency is required, hilt instantiates a new one. 

To ensure only one instance of Gson is available at a time, modify `GsonModule` as follows:

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

`@Singleton` is the annotation used to ensure that the instance created is the only one throughout the application.

`ActivityScoped` ensures the instance is the same one throughout the activity.

For more on scopes, check out the Android documentation:
[Component Scopes](https://developer.android.com/training/dependency-injection/hilt-android#component-scopes)

## Conclusion
This tutorial started by illustrating manual dependency injection. Manual dependency injection is alright. However, it may get cumbersome as the application scales.
Hilt then came in with it's `@Inject` annotation that creates injectable fields, methods and constructors. `@Inject` also helps hilt know how to provide a certain class by giving it access to the constructor.

You observed cases whereby the constructor might be unavailable. These include:
1. When an interface is used.
2. When a 3rd party library is used.

When a constructor is unavailable, a module has to be used. A module is a class that tells hilt how to provide an instance. It needs to be installed in a component. This is so as to keep track of the lifetime of the module.

`@Binds` provides the interface implementation. The implementation was a class that hilt knew how to provide.

`@Provides` provides the 3rd party library implementation. Hilt runs the function body each time to get the instance required.

Hopefully, this article shines some light on dependency injection with Hilt. Go forth and inject!


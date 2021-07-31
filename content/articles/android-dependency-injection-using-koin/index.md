---
layout: engineering-education
status: publish
published: true
url: /android-dependency-injection-using-koin/
title: Android Dependency Injection With Koin
description: This article will provide a step by step guide on how to implement Android dependency injection using Koin. This framework helps save significant time by enabling you to manage Android dependencies easily.
author: peter-kayere
date: 2021-03-29T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-dependency-injection-using-koin/hero.jpg
    alt: Android dependency injection using Koin
---
Dependency injection is a programming technique that makes a class independent of its dependencies. This is made possible by decoupling the usage of an object from its creation. Many Android developers are familiar with Java-based dependency injection frameworks such as Dagger and Guice. 
<!--more-->
However, some frameworks are written completely in Kotlin for Kotlin. These frameworks include Koin and Kodein. This article goes through how to manage dependencies in Android using the new dependency injection framework - [Koin](https://insert-koin.io/).

### Prerequisites 
To follow through with this tutorial, you will need to:
1. Have [Android Studio](https://developer.android.com/studio) installed.
2. Have a basic knowledge of building Android applications.
3. Have a basic understanding of [Kotlin](/kotlin-collections/) programming language.

Let's get started!

### What exactly is dependency injection
Being a software developer, you must, or might have heard about dependency injection but didn't really understand what it is. You might even be asking yourself, why should I use this technique? 

How important is it? Have I ever used it? Well, the answer to the last question is pretty simple. You have but without any dependency injections framework.

Consider the following scenario. You have two classes, A and B. Class B requires an instance of A for it to perform a specific task. It is correct to say that class B directly depends on class A. 

Therefore, we often find ourselves creating an instance of the dependent class before using it or pass it as a parameter. All these are forms of dependency injection. This is fine for a small project. 

However, as the project scales, maintenance and testing become challenging. This is where dependency injection frameworks come into play.

A dependency injection framework helps us to create and manage dependencies. As mentioned earlier, there are many Java-based Android dependency injection frameworks. However, with the increased adoption of Kotlin on Android, the demand for libraries written completely in Kotlin for Kotlin is rising. 

`Koin` is a dependency injection framework that conforms to this need. It is a lightweight framework, easy to learn, and does not have much boilerplate code. Let's see how we can use this framework to manage dependencies in our Android applications.

### Getting started with Koin
Koin is fairly simple. All we need to do is create our classes, tell Koin how to create the dependencies, then we can call them whenever/wherever we need them. 

Before we move any further, create an `empty activity` project and give it a name of your choice. Wait for the project build to complete then add the following dependency on your app-level `build.gradle` file.

```bash
implementation "org.koin:koin-android:1.0.2"
```

Let's go ahead and create some classes.

### Creating project components
We are going to need some components that depend on each other for demonstration. Let's create a scenario. Create a Kotlin file and in it add the following code.

```Kotlin
class Student(private val course: Course, private val friend: Friend) {

    fun doWork(): String =
        course.study() + "\n" + friend.play()
}

class Friend {
    fun play(): String = "I am playing with my friend"
}

class Course {
    fun study(): String = "I am studying"
}
```

The first class is a `Student` class, a `student` has a course of study and a friend to play with. Therefore, the `Student` class depends on those classes. 

It needs them to call or access the `study()` and `play()` functions contained in the `Course` and `Friend` classes respectively. To solve this dependency we add the two classes as parameters. 

This means that the `Student` class can not be instantiated without instances of `Course` and `Friend` classes.

Open the `MainActivity` file and replace the `onCreate` function with the following code.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val course = Course()
        val friend = Friend()
        val student = Student(course, friend)

        binding.textView.text = student.doWork()
    }
```

The application uses `View binding` to access the default `TextView` with an id of `text_view`. Visit this [link](https://developer.android.com/topic/libraries/view-binding) to learn more about View binding.

The code creates instances of all the classes. 

Upon running the application, the text view will display:

```bash
I am studying
I am playing with my friend
```

There is nothing wrong with the application as it is. But, as we mentioned earlier, depending on this kind of dependency injection will make the application hard to maintain as it scales. Let's see how Koin can help us manage these dependencies.

### Creating a Koin module
Koin uses modules to create dependencies. Create a new Kotlin file with the name 'module' and add the following code.

```Kotlin
val appModule = module {
    single { Course() }
    factory { Friend() }
    factory { Student(get(), get()) }
}
```

The `module function` as the name suggests is used to create a module. `single` is used to create a singleton instance. This means that Koin will return the same instance of the class when the dependency is needed. 

We have made `Course` a singleton since we assume that all the students do the same course. `factory`, on the other hand, is used when we want a new `instance` of the class every time we call it. 

We have used the factory for both `Friend` and `Student` classes since we want a new instance whenever we call them. The `get` function is used to get the required dependency only if it has been specified in the module. 

It detects the type of dependency we need and fetches it for us. That's all we need for the module. Let's go ahead and start Koin.

### Starting Koin
Starting Koin is fairly simple. Create an application class with the name of your choice and add the following code to start Koin.

```Kotlin
startKoin(this, listOf(appModule))
```

We use the `startKoin` function to start Koin. 

And that's it! Koin is fully set up. Now, let's use Koin in our `MainActivity`. 

Replace the `onCreate` method of the `MainActivity` with this.

```Kotlin
val binding = ActivityMainBinding.inflate(layoutInflater)
setContentView(binding.root)

val student: Student by inject()

binding.textView.text = student.doWork()
```

The reduction of lines of code is noticeable. `by inject` delegate is used to `lazily` inject dependencies. We can also use the `get` function to get the dependency `non-lazily`.

Run the application again. 

The code works fine, but, this time we have employed a dependency injection framework that helps a lot in ensuring our project is maintainable and can be easily tested.

### Conclusion
In this article, we have gone through dependency injection and how to manage dependencies using a Kotlin dependency injection known as Koin. We have seen how Koin is easy to set up and work with. 

We have also seen how dependency injection helps us in making our applications maintainable. I hope this tutorial gives you the basics you need to start using this great and lightweight framework.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
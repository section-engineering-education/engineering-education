---
layout: engineering-education
status: publish
published: true
url: /handling-memory-leaks-in-android-using-leakcanary/
title: Handling Memory Leaks in Android Using LeakCanary
description: This tutorial will help the reader understand how to use LeakCanary to detect memory leaks in Android applications. LeakCanary is an open-source memory leak detection library developed by Square organization.
author: collince-okeyo
date: 2021-10-06T00:00:00-04:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/handling-memory-leaks-in-android-using-leakcanary/hero.png
    alt: Handling Memory Leaks in Android Using LeakCanary Hero Image
---
This tutorial will help you understand how to use `LeakCanary` to detect memory leaks in Android applications. LeakCanary not only detects memory leaks but also helps you to reduce them.
<!--more-->
The occurrence of memory leaks may lead to a poor user experience due to app crashes caused by `OutOfMemory` (OOM) error.

### Prerequisites
To follow through this tutorial, the reader should have:
- [Android Studio](https://developer.android.com/studio) installed.
- A basic understanding of the [Kotlin](https://kotlinlang.org/) programming language.

### Goal
By the end of this tutorial, the reader will:
- Understand memory leaks and their causes.
- Understand what [LeakCanary](https://square.github.io/leakcanary/) is.
- Know the best programming practices to avoid memory leaks.

### Memory Leaks
Whenever an object is no longer in use, the garbage collector is always responsible for its removal as a heap junk.

If the garbage collector is unable to perform its task, a condition known as memory leak arises.

A memory leak can also occur when an application is unable to release memory from an object when the object is no longer in use.

App crashes causes a bad user experience and should be avoided. Hence handling memory leaks is important.

### What causes memory leaks in Android applications
Below, are the common practices that can cause memory leaks in Android applications:
1. Adding a `Fragment` instance to the back stack without clearing the Fragment's view fields in `Fragment.onDestroyView()` method.

In case an instance to a fragment is added to the back stack, it should be cleared to remove its reference during the `onDestroyView` method call. This will help in avoiding memory leaks.

2. Storing an instance of an `Activity` as a `Context` field in an object that survives activity recreation due to configuration changes.

During app configuration changes, various tasks run in the background thread. When an instance of an activity is stored in an object that survives activity recreation, a memory leak is likely to occur.

3. Forgetting to de-register a listener, broadcast receiver, or RxJava subscription that refers to a life-cycled object.
4. Storing a reference to a `Context` in the background thread.

This will hinder the garbage collector from reclaiming the object held by the reference to the `Context` hence leading to a memory leak.

### How to avoid memory leaks
- Avoid saving context, activity, or views in the background thread.
- If you don't have control over the life cycle of the inner class, use a static inner class with a reference to the outer class. Avoid non-static inner classes in activities.
- Instead of using context-activity, try using context-application.

### What is LeakCanary?
LeakCanary is an open-source memory leak detection library developed by Square organization. It can detect and decrease memory leaks in android applications.

It also notifies the location where the leak is actually happening.

Using LeakCanary is simple because it has predefined functions.

It also simplifies the programmer's work since it shows the location of the memory leak which makes it simple to correct and avoid the leak.

### Reasons for using LeakCanary
- It helps in detecting memory leaks.
- It helps you to fix memory leaks hence increase the application's performance.

### Steps of memory leak detection
LeakCanary handles memory leaks in four steps as listed below:
- Detecting objects that have been retained.
- Dumping the heap.
- Analyzing the heap.
- Sorting the leaks into categories.

Enough theory, lets now see in practice how LeakCanary works.

### Step 1: Adding LeakCanary dependency
In the `build.gradle` (project level) file, paste the LeakCanary dependency and sync the project.

```gradle
debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.7'
```

### Step 2: Creating a memory leak
Storing a reference to context, views, or objects in the background causes memory leaks.

We are going to do that to show how memory leaks occur and how LeakCanary detects them.

In your `MainActivity.kt`, add the following code to see how LeakCanary works when detecting memory leaks.

```kotlin
class MainActivity : AppCompatActivity() {

    private var myBackground: Drawable? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //setContentView(R.layout.activity_main)
        val textView = TextView(this)
        textView.text = "Memory leaks are not good to applications"
        if (myBackground == null) {
            myBackground = getDrawable(R.drawable.ic_launcher_background)
        }
        textView.setBackgroundDrawable(myBackground)
        setContentView(textView)
    }
}
```

The issue with the code is not the `context` passed to create the image drawable.

In this code, the issue is `private var myBackground: Drawable? = null` (a variable declared in the MainActivity); which is created with `Activity` as the context.

As a result, there is a static reference to a `Drawable` that refers to the Activity, resulting in a leak.

To avoid memory leak in this code, the `Drawable` should be created using the application context and not the `TextView`.

Hence you should replace the statement:

```kotlin
myBackground = getDrawable(R.drawable.ic_launcher_background)
```

With:

```kotlin
myBackground = getApplicationContext().getResources().getDrawable(R.drawable.ic_launcher_background);
```

### Steps of detecting and reporting memory leaks
LeakCanary handles memory leaks in four steps.

#### 1. Detecting objects that have been retained
When building your project, the `Leaks` app is also installed alongside your application. Leaks app is automatically installed due to the LeakCanary library.

![Leaks App](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leaks.jpg)

The leaks app installed shows notifications with the latest count of dumped heap memory. It also shows the progress of leak detection.

![Detecting Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/detecting_leak.jpg)

#### 2. Dumping the heap
In this step, LeakCanary dumps the heap memory into the `.hprof` file (dump heap) that is saved to the Android file system. Dumping of the heap memory only happens when the threshold is reached.

![Dumping Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/dumping_leak.jpg)

#### 3. Analyzing the heap
LeakCanary uses Shark (heap analyzer) to parse the `.hprof` file and locate the retained objects in the heap dump.

![Analyzing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/analyzing_leak.png)

#### 4. Sorting the leaks into categories
This is the final step where LeakCanary shows the location of the memory leak and underlines the objects causing the leak in red.

The developer can therefore refer to the code and correct it to avoid memory leak.

![Categorizing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leak_category.jpg)

### Conclusion
LeakCanary is a powerful leak detection library.

When you want to deploy your application for production, it is appropriate to remove the LeakCanary library to avoid taking the `Leaks` app to users.

To remove LeakCanary, go to `build.gradle` file and delete the LeakCanary library you added and rebuild the project.

### References
- [LeakCanary](https://square.github.io/leakcanary/)
- [How to use LeakCanary](https://stackoverflow.com/questions/33654503/how-to-use-leak-canary)
- [Android Memory Leaks](https://developer.android.com/studio/profile/memory-profiler)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

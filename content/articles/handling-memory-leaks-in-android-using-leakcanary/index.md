### Handling Memory Leaks Using LeakCanary

This tutorial will help the reader to understand how to use LeakCanary to detect memory leaks. LeakCanary not only detects memory leaks but also reduces memory leaks in android applications. The occurrence of memory leaks may lead to a bad user experience due to app crashes because of `OutOfMemoryError`.

### Prerequisites
To follow through this tutorial, the reader should have:

- [Android Studio](https://developer.android.com/studio) installed.
- A basic understanding of [Kotlin](https://kotlinlang.org/) programming language.

### Goal

By the end of this tutorial, the reader will:

- Understand [LeakCanary](https://square.github.io/leakcanary/).
- Know how to avoid memory leaks in Android applications.
- Understand memory leaks and causes of memory leaks.

### Memory Leak

It occurs when a garbage collector is unable to reclaim a resource held by an object after it is destroyed. Memory leaks lead to OutOfMemoryError (OOM) crashes in Android applications.
It can also occur when an application is unable to release memory from an object when the object is no longer in use.

### What Is LeakCanary

Is an open-source memory leak detection library developed by Square Organization. It can detect and decrease memory leaks in android applications. It also notifies the location where the leak is actually happening.

### What Causes Memory Leaks in Android Applications
The common causes of memory leaks are: 

1. Adding a `Fragment` instance to the back stack without clearing the Fragment’s view fields in `Fragment.onDestroyView()`.
2. Storing an instance of an `Activity` as a `Context` field in an object that services activity recreation due to app configuration changes.
3. Forgetting to deregister a listener, broadcast receiver, or RxJava subscription that refers to a life-cycled object. 
### How To Avoid Memory Leaks

- Avoid saving context, activity, or views in the background thread.
- If you don't have control over the life cycle of the inner class, use a static inner class with a reference to the outer class; avoid non-static inner classes in activities. 
- Instead of using context-activity, try using context-application.

### Reasons For Using LeakCanary

- It helps in detecting memory leaks hence increase the application performance.
- It fixes memory leaks.

### Steps of Memory Leak Detection

After adding the library to your project, LeakCanary gets installed. It handles memory leaks in four steps as listed below.

- Detecting retained objects.
- Dumping the heap.
- Analyzing the heap.
- Categorizing the leaks.

Enough theory lets now see in practice how LeakCanary works…

### Step 1: Adding LeakCanary dependency.

In the build.gradle (Project level) paste the LeakCanary dependency and sync.

```gradle
debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.7'
```

### Step 2: Working of LeakCanary

Storing a reference to context, views, or objects in the background causes memory leaks. Instead, we are going to do that to show how memory leaks occur and how LeakCanary detects memory leaks.

Add the following code in your `MainActivity`: 

```kotlin
class MainActivity : AppCompatActivity() {

private var myBackground: Drawable? = null

override fun onCreate(savedInstanceState: Bundle?) {
super.onCreate(savedInstanceState)
setContentView(R.layout.activity_main)

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
### Code Explanation

The issue with the code is not the `context` passed to create the image drawable. In this code, the issue is `private var myBackground: Drawable? = null;`(variable declared in the MainActivity) which was created with `Activity` as the context.
As a result, there is a static reference to a `Drawable` that refers to the Activity, resulting to a leak. 
To avoid memory leak in this code, it is the `Drawable` that should be created using the application context and not the `TextView`. 

Hence you should replace the statement:
```kotlin
myBackground = getDrawable(R.drawable.ic_launcher_background)
```
With:
```kotlin
mBackground = getApplicationContext().getResources().getDrawable(R.drawable.ic_launcher_background);
```

### Steps of Detecting and Reporting Memory Leaks

LeakCanary detects and reports memory leaks in four steps as illustrated below;

### 1. Detecting retained objects.

When building your project, `Leaks` app is also installed with your application. Leaks app is automatically installed due to the LeakCanary library.

![Leaks App](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leaks.jpg)

Leaks app installed shows notification with the latest count of dumped heap memory. It also shows the progress of leak detection.

![Detecting Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/detecting_leak.jpeg)

### 2. Dumping the heap.
In this step, LeakCanary dumps the heap memory into the .hprof file(dump heap) that is saved to the Android file system. Dumping of the heap memory only happens when the threshold is reached.

![Dumping Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/dumping_leak.jpg)

### 3. Analyzing the heap.

LeakCanary uses Shark(heap analyzer) to parse the .hprof file and locate the retained objects in the heap dump. 

![Analyzing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/analyzing_leak.png)

### 4. Categorizing the leaks.

LeakCanary shows the location of the leak and underlines the objects causing the link in red.

![Categorizing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leak_category.jpeg)

### Conclusion
LeakCanary is a powerful leak detection library. When you want to deploy your application for production, it is appropriate to remove the LeakCanary library to avoid taking `Leaks` app to production. 

### References
- [LeakCanary](https://square.github.io/leakcanary/).
- [How to use LeakCanary](https://stackoverflow.com/questions/33654503/how-to-use-leak-canary)
- [Android Memory Leaks](https://developer.android.com/studio/profile/memory-profiler)


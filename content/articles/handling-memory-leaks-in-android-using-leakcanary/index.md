### Handling Memory Leaks Using LeakCanary

This tutorial will help the reader to understand how to use LeakCanary to detect memory leaks. LeakCanary not only detects memory leaks but also reduces memory leaks in android applications. The occurrence of memory leaks may lead to a bad user experience due to app crashes because of `OutOfMemoryError`.

### Prerequisites
To follow through this tutorial, the reader should have:

- [Android Studio](https://developer.android.com/studio) installed.
- A basic understanding of [Kotlin](https://kotlinlang.org/) programming language.

### Goal

By the end of this tutorial, the reader will:

- Understand [LeakCanary](https://square.github.io/leakcanary/).
- Know the best programming practices for avoiding memory leaks
- Understand memory leaks and causes of memory leaks.

### Memory Leak

It occurs when a garbage collector is unable to reclaim a resource held by an object after it is destroyed. Memory leaks can lead to `OutOfMemoryError` (OOM) crashes in Android applications.
It can also occur when an application is unable to release memory from an object when the object is no longer in use. Whenever an object is no longer in use the garbage collector is always responsible for its removal as a heap junk, but if the garbage collector is unable to perform its task then a condition call memory leak arises which can cause an app to crash. App crash is a bad user experience and should be avoided if possible. Hence handling memory leaks is important.

### What Is LeakCanary

Is an open-source memory leak detection library developed by Square Organization. It can detect and decrease memory leaks in android applications. It also notifies the location where the leak is actually happening. Using LeakCanry is simple because it has all the predefined functions to detect and even reduce memory leaks. It also simplifies the programmer's work since it shows the location of the memory leak which makes it simple to correct and avoid the leak.

### What Causes Memory Leaks in Android Applications
Below, are the common practices that can cause memory leaks in Android applications:

1. Adding a `Fragment` instance to the back stack without clearing the Fragment’s view fields in `Fragment.onDestroyView()`.
In case an instance to a fragment is added to the back stack, it should be cleared to remove its reference during the call of the `onDestroyView` method. This will help in avoiding memory leaks.

2. Storing an instance of an `Activity` as a `Context` field in an object that services activity recreation due to app configuration changes.
During app configuration changes various tasks do run in the background thread. When an instance of an activity is stored in an object that services activity recreation memory leak is likely to occur and should be avoided.

3. Forgetting to deregister a listener, broadcast receiver, or RxJava subscription that refers to a life-cycled object. 

5. Storing a reference to a `Context` in the background thread.
This will hinder the garbage collector from reclaiming the object held by the reference to the `Context` hence leading to a memory leak.

### How To Avoid Memory Leaks

- Avoid saving context, activity, or views in the background thread.
- If you don't have control over the life cycle of the inner class, use a static inner class with a reference to the outer class; avoid non-static inner classes in activities. 
- Instead of using context-activity, try using context-application.

### Reasons For Using LeakCanary

- It helps in detecting memory leaks hence increase the application performance.
- It fixes memory leaks.

### Steps of Memory Leak Detection

After adding the library to your project, LeakCanary gets installed. It handles memory leaks in four steps as listed below.

- Detecting objects that have been retained. 
- Dumping the heap.
- Analyzing the heap.
- Sorting the leaks into categories. 

Enough theory lets now see in practice how LeakCanary works…

### Step 1: Adding LeakCanary dependency.

In the build.gradle (Project level) paste the LeakCanary dependency and sync.

```gradle
debugImplementation 'com.squareup.leakcanary:leakcanary-android:2.7'
```

### Step 2: Working of LeakCanary

Storing a reference to context, views, or objects in the background causes memory leaks. Instead, we are going to do that to show how memory leaks occur and how LeakCanary detects memory leaks.

In your MainActivity.kt add the following code to see how LeakCanary works when detecting memory leaks. 

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
### Code Explanation

The issue with the code is not the `context` passed to create the image drawable. In this code, the issue is `private var myBackground: Drawable? = null;`(a variable declared in the MainActivity) which was created with `Activity` as the context.
As a result, there is a static reference to a `Drawable` that refers to the Activity, resulting in a leak. 
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

LeakCanary handles memory leaks in four steps. 

### 1. Detecting objects that have been retained. 


When building your project, the `Leaks` app is also installed with your application. Leaks app is automatically installed due to the LeakCanary library.

![Leaks App](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leaks.jpg)

Leaks app installed shows notification with the latest count of dumped heap memory. It also shows the progress of leak detection.

![Detecting Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/detecting_leak.jpeg)

### 2. Dumping the heap.
In this step, LeakCanary dumps the heap memory into the .hprof file(dump heap) that is saved to the Android file system. Dumping of the heap memory only happens when the threshold is reached.

![Dumping Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/dumping_leak.jpg)

### 3. Analyzing the heap.

LeakCanary uses Shark(heap analyzer) to parse the .hprof file and locate the retained objects in the heap dump. 

![Analyzing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/analyzing_leak.png)

### 4. Sorting the leaks into categories. 

This is the final step where LeakCanary shows the location of the memory leak and underlines the objects causing the link in red. The developer can therefore refer to the code and correct the code to avoid memory leak.

![Categorizing Leak](/engineering-education/handling-memory-leaks-in-android-using-leakcanary/leak_category.jpeg)

### Conclusion
LeakCanary is a powerful leak detection library. When you want to deploy your application for production, it is appropriate to remove the LeakCanary library to avoid taking the `Leaks` app to production. To remove LeakCanary, go to `build.gradle` file and delete the LeakCanary library you added and rebuild the project.

### References
- [LeakCanary](https://square.github.io/leakcanary/).
- [How to use LeakCanary](https://stackoverflow.com/questions/33654503/how-to-use-leak-canary)
- [Android Memory Leaks](https://developer.android.com/studio/profile/memory-profiler)


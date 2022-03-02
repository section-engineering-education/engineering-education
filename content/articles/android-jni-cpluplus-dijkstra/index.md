---
layout: engineering-education
status: publish
published: true
url: /android-jni-cpluplus-dijkstra/
title: How to Create a Simple Path Recommender App using Android NDK and C++
description: In this article, we will learn how to use the Android NDK(C++) to create a simple traffic jam path recommender application.
author: terrence-aluda
date: 2022-01-09T00:00:00-08:10
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-jni-cpluplus-dijkstra/hero.jpg
    alt: Using the Android NDK(C++) to create a simple traffic jam path recommender app Hero Image
---
In this, tutorial, we will create a simple application to calculate the shortest route between two points.  
<!--more-->
We will use Dijkstra's Shortest Path First (DSPF) algorithm to implement this functionality. 

The final app will appear as shown in the image below:

![screenshot 1](/engineering-education/android-jni-cpluplus-dijkstra/shot-one.png)

To achieve dynamic traffic changes in the UI, we will need to be as native as much as possible. This is why we are using the Native Development Kit. 

Note that such a feature may be integrated into a car dashboard too (no execution latencies will be needed here).

We will be using *C++* for the path computation and then display the results to the user using *Kotlin*.

### Table of contents
- [Prerequisites](#prerequisites)
- [A brief overview of the Android NDK and the JNI](#a-brief-overview-of-the-android-ndk-and-the-jni)
- [Installing the required components](#installing-the-required-components)
- [Dijkstra's Shortest Path First algorithm](#dijkstras-shortest-path-first-algorithm)
- [The C++ code](#the-c-code)
- [Kotlin and XML](#kotlin-and-xml)
- [Accuracy](#accuracy)
- [Further practice](#further-practice)
- [Further reading](#further-reading)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you need some knowledge in the following technologies:

1. **C++**

Key areas to focus on include `namespaces`, `pointers`, and `string methods`. Pointers are important when using JNI because they help in memory management and app optimization.

2. **Kotlin**

We will use data binding to display a simple text widget with dynamic content.

3. **Java (not so necessary)**

It will be required to understand the working of the JNI.

Additionally, you need Android Studio or IntellijIDEA (configured for Android development).

### A brief overview of the Android NDK and the JNI
JNI (Java Native Interface) is a tool used for communicating between Java bytecode and other native languages such as C. 

JNI allows us to write programs in other languages and make them communicate with languages that can run on the Java Virtual Machine(e.g, Kotlin, Clojure). 

We can, therefore, implement complex features that are not easily done using JVM-based languages. Such functionalities include communicating with low-level components like memory, hardware, etc. Moreover, applications/products written using the native languages run faster.

NDK is a tool that facilitates the linking of the languages and the JNI. Moreover, it allows us to debug and run our applications.

For more info on these technologies, please follow the links listed below:

1. [MindOrks](https://blog.mindorks.com/getting-started-with-android-ndk-android-tutorial)
2. [ProAndroidDev](https://proandroiddev.com/android-ndk-interaction-of-kotlin-and-c-c-5e19e35bac74)
3. [JNI Official Documentation](https://docs.oracle.com/javase/7/docs/technotes/guides/jni/spec/jniTOC.html)

### Installing the required components
To write these native apps, we have to install the tools listed below:

1. **NDK**

2. **CMake** is a tool used to manage the build process. You can read more about it [here](https://cmake.org/)

Installing these components is simple. In your IDE (Android Studio or IntellijIDEA), access the SDK Manager, then click the *SDK Tools* tab. 

Next, check the *NDK(Side by side)* and the *CMake* options, and click the `OK` button to start installing:

![screen two](/engineering-education/android-jni-cpluplus-dijkstra/shot-two.png)

> To access the SDK Manager, click on the *Tools* tab -> *Android* -> *SDK Manager*.

After the installation finishes, modify your app's Gradle file `defaultConfig` by specifying the NDK version you are using:

```gradle
defaultConfig {
        applicationId "<your-package-name>"
        minSdkVersion 16
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"
        //add this line. this is what you will only modify 
        ndkVersion "<version-you-installed>"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        externalNativeBuild {
            cmake {
                cppFlags ''
            }
        }
    }
```

> Ensure that you update the gradle file before running the application. Failure to do so may cause Android Studio to download another NDK version

You can check the NDK version installed at `your-installation-path/Android/Sdk/ndk`. You will see a folder named using the version number.


#### Creating a sample app.

Start a new project creation process. On the *Phone and Tablet* option, choose `Native C++`. 

![screen three](/engineering-education/android-jni-cpluplus-dijkstra/shot-three.png)

Set your preferred `app name` on the next screen, choose `Kotlin` as the language option, and click *Next*. 

![screen three](/engineering-education/android-jni-cpluplus-dijkstra/shot-four.png)

Finally, choose the `C++` standard version, then finish. Let's stick with the *Toolchain Default* option for this article.

![screen five](/engineering-education/android-jni-cpluplus-dijkstra/shot-five.png)

#### Project structure
We see two folders(*cpp* and *java*) instead of the usual *java* folder only in the *src* folder. The *cpp* folder holds the native C++ source files and the **CMakeLists.txt** file. This file is a configuration file used by the CMake in managing the compilation process. The *java* folder is where the kotlin files are found.

![screen six](/engineering-education/android-jni-cpluplus-dijkstra/shot-six.png)

Open the *native-lib.cpp* file in the *cpp* folder. You should see the following code:

```c++
#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_com_terrence_aluda_nativetest_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
```

This is a normal C++ file beginning with preprocessor directives. The first one includes the JNI library for processing our JNI code.

We have the line `extern "C" JNIEXPORT jstring JNICALL` that allows our function to be accessed by Kotlin/Java. The function is called `stringFromJNI()`. 

> Any function that has to be called by the external JVM language(Java/Kotlin) has to have this syntax: `Java_packagename_ActivityName_functionName`.

It has two parameters:
1. JNIEnv* env - This is a pointer to the environment we will be using.
2. jobject - The object the function will be called from. In our case, *MainActivity*.

We then return the string to be displayed(`hello`) using the `NewStringUTF()` method accessed from the environment.

> The environment's attributes and methods are accessed using the arrow( -> ) operator.

The `NewStringUTF()` creates a string based on UTF-8 characters from a C++ string passed in as an argument.

In the Kotlin file, we load the C++ file using this code:

```kotlin
        init {
            System.loadLibrary("native-lib")
        }
```
We declare the function using this line:

```kotlin
        external fun stringFromJNI(): String
```

We call it and then assign the string returned to the TextView.text property using:

```kotlin
    binding.sampleText.text = stringFromJNI()
```

On running the app, you will see a screen with the text, "Hello from C++".

We will change the code in the two files to implement Dijkstra's Shortest Path First algorithm. But first, let's have a look at the algorithm.

### Dijkstra's Shortest Path First algorithm
This type of greedy algorithm finds the minimum weights between nodes in a graph data structure. For example, finding the shortest distance between points in a graph. 

A graph can be anything in real-life such as road and rail networks, internet routes, etc.

A **greedy algorithm** tries to find the most optimal solution at each stage before it moves on to the next stage. 

An example is finding the traffic route with the least time to maneuver at a certain area of a town. Find out more about greedy algorithms [here](https://brilliant.org/wiki/greedy-algorithm/).

Take this graph, for instance:

![graph](/engineering-education/android-jni-cpluplus-dijkstra/graph-one.png)

We want to calculate the shortest distance between points 0 and 6. It works by storing visited nodes and calculating the distances between them and 0. 

It only adds them to the shortest path list if their distance is the shortest compared to adjacent vertices. You can read more about it [here](https://www.section.io/engineering-education/dijkstra-python/). 

The article uses the same graph and same values we will use here. It also talks about graphs. If you want to have a clear working of algorithm, please check it out.

In the end, we will get this graph:

![full graph](/engineering-education/android-jni-cpluplus-dijkstra/full-graph.png)

The resulting shortest path list will be as shown:

```bash
Node    Distance from 0
0       0
1       2
2       6
3       7
4       17
5       22
6       19
```

We will use the same graph and same values for our application, but we will assume the values to be time taken to move between the streets rather than distance.

```bash
Node    Time taken from 0
0       0
1       2
2       6
3       7
4       17
5       22
6       19
```

### The C++ code
It has five functions:

1. `streetName()`
2. `printPath()`
3. `minimumDistance()`
4. `processPath()`
5. `checkShortestRoute()`

#### 1. streetName()

```c++
//function to map street names to respective indices
string streetName(int index){
    string street;
    switch (index)
    {
        case 0:
            street = "Georgia St.";
            break;
        case 1:
            street = "Mitte St.";
            break;
        case 2:
            street = "Lillies St.";
            break;
        case 3:
            street = "Alexa St.";
            break;
        case 4:
            street = "Quincy St.";
            break;
        case 5:
            street = "Wood St.";
            break;
        case 6:
            street = "Apple St.";
            break;
        default:
        break;
    }
    return street;
}
```
This is self-explanatory. It maps street names to respective indices using a `switch-case` statement.

#### 2. printPath()

```c++
//function for displaying the path
string printPath(int duration[]){
//the first street is where we are now, Georgia street
    string pathDisplayed = "Georgia St.";
//start processing from the second street since we have the first one
    int i = 1;
    while (i < VERTICES) {
    //display the next street if the time from the starting street is less and vice versa
        if((duration[i+1])<(duration[i])){
            pathDisplayed = pathDisplayed + " -> " + streetName(i+1);
            i = i + 1;
        }else if((duration[i+1])>(duration[i])){
            pathDisplayed = pathDisplayed + " -> " + streetName(i);
            //skip the next street since it has a greater distance
            i = i + 2;
        }
    }
    //remove the trailing " -> "
    pathDisplayed = pathDisplayed.substr(0,pathDisplayed.size() - 4);
    return pathDisplayed;

}
```

The `stringPath` method receives the `duration[]` array. It holds the shortest duration from the starting location to the location stored in the respective vertices. 

To display a location, we check if the duration of the next street is less than that of the current street. If the time of the next street is lower, we display it. Otherwise, we display the current street. 

In the `else` statement, we increase the index by `2` to skip the next street because of its larger distance. 

In the last part, we remove the trailing *->* to avoid errors:

```bash
Georgia St. -> Mitte St. ->
```
When we increment the counter, we may reach the end of the array and the display string will be concatenated with *->*. We will discuss the shortcomings of this function towards the end.

#### 3. minimumDistance()

```C++
int minimumDistance(int duration[], bool shortestTimeSet[]){
    int min_time = INT_MAX, min_time_index;
    for (int v = 0; v < VERTICES; v++)
    /*the minimum time is updated only if we don't have the node in the shortest time array
    and the duration is less than the current minimum time*/
        if (shortestTimeSet[v] == false && duration[v] <= min_time){
            min_time = duration[v], min_time_index = v;

        }
    return min_time_index;
}
```

The `min_time` variable holds the current least time, and it's updated in the code. The minimum time is updated only if we don't have the vertex in the shortest time array(`shortestTimeSet[]`) and the duration is less than the current minimum time. 

This array stores the `streets(vertices)` visited and has the shortest time relative to the adjacent `streets(vertices)`.

#### 4. processPath()

```C++
string processPath(int currentLocation){
    //our graph represented in a matrix
    int timeMatrix[VERTICES][VERTICES] = { { 0, 2, 6, 0, 0, 0, 0 },
                                           { 2, 0, 0, 5, 0, 0, 0 },
                                           { 6, 6, 0, 8, 0, 0, 0 },
                                           { 0, 0, 8, 0, 10, 15, 0 },
                                           { 0, 0, 0, 10, 0, 6, 2 },
                                           { 0, 0, 0, 15, 6, 0, 6 },
                                           { 0, 0, 0, 0, 2, 6, 0 } };
    //The output array. It will hold the shortest distance from the starting location to the location in i
    int duration[VERTICES];
    //stores the streets(vertices) visited and have the shortest time relative to the adjacent streets(vertices)
    bool shortestTimeSet[VERTICES];

    // Initializing all distances as INFINITE and shortestTimeSet[] as false
    for (int i = 0; i < VERTICES; i++)
        duration[i] = INT_MAX, shortestTimeSet[i] = false;

    // Distance of starting street(vertex) from itself is a 0
    duration[currentLocation] = 0;


    for (int count = 0; count < VERTICES - 1; count++) {
        // Pick the street with the minimum time from the set of streets not yet processed. assign it to u
        int u = minimumDistance(duration, shortestTimeSet);

        // Mark the street as visited and having the shortest distance

        shortestTimeSet[u] = true;
        /* Update output array with the time to the chosen street only if it is in the shortestTimeSet[],
        an edge exists where it is(it is not having a 0 value), its time is not INF, and the duration from the starting street
        to where it is less than what is stored in duration[v] */

        for (int v = 0; v < VERTICES; v++)

            if (!shortestTimeSet[v]  && timeMatrix[u][v] && duration[u] != INT_MAX
                && duration[u] + timeMatrix[u][v] < duration[v])
                duration[v] = duration[u] + timeMatrix[u][v];
    }

    // print the constructed duration array
    string path = printPath(duration);
   return path;
}
```

After a bunch of array creation and initializations, we move to the `for-loop`, which does the processing.

We first pick the street with the minimum time from the set of streets not yet processed, after passing it to the `minimumDistance()` function and then assigning it to the `u` variable. 

We then mark it as visited by setting its value in the `shortestTimeSet[]` array to `true`. We only update the `duration[]` array with the vertex's information if these conditions are met:

- It is in the `shortestTimeSet[]` array.
- An edge exists where there is no zero value.
- Its time is not INF(`INT_MAX`).
- The duration from the source vertex to its current position is less than what is stored in `duration[v]`.

Lastly, we print the constructed duration array.

#### 5. checkShortestRoute()

```C++
//function that will be called from Kotlin
// we pass in the index of the street where the user is
extern "C" JNIEXPORT jstring JNICALL
Java_com_terrence_aluda_nativetest_MainActivity_checkShortestRoute(JNIEnv* env, jobject, jint currentLocation){
    return env->NewStringUTF(processPath(currentLocation).c_str());
}
```

The above function will be called from the Kotlin file where we will pass in the index of the street where the user is at.

Here is the full code:

```C++
#include <jni.h>
#include <limits.h>
#include <string>

using namespace std;

#define VERTICES 7

string streetName(int index){
    string street;
    switch (index)
    {
        case 0:
            street = "Georgia St.";
            break;
        case 1:
            street = "Mitte St.";
            break;
        case 2:
            street = "Lillies St.";
            break;
        case 3:
            street = "Alexa St.";
            break;
        case 4:
            street = "Quincy St.";
            break;
        case 5:
            street = "Wood St.";
            break;
        case 6:
            street = "Apple St.";
            break;
        default:
        break;
    }
    return street;
}

//function for displaying the path
string printPath(int duration[]){
//the first street is where we are now, Georgia street
    string pathDisplayed = "Georgia St.";
//start processing from the second street since we have the first one
    int i = 1;
    while (i < VERTICES) {
    //display the next street if the time from the starting street is less and vice versa
        if((duration[i+1])<(duration[i])){
            pathDisplayed = pathDisplayed + " -> " + streetName(i+1);
            i = i + 1;
        }else if((duration[i+1])>(duration[i])){
            pathDisplayed = pathDisplayed + " -> " + streetName(i);
            //skip the next street since it has a greater distance
            i = i + 2;
        }
    }
    //remove the trailing " -> "
    pathDisplayed = pathDisplayed.substr(0,pathDisplayed.size() - 4);
    return pathDisplayed;

}

int minimumDistance(int duration[], bool shortestTimeSet[]){
    int min_time = INT_MAX, min_time_index;
    for (int v = 0; v < VERTICES; v++)
    /*the minimum time is updated only if we don't have the node in the shortest time array
    and the duration is leass than the current minimum time*/
        if (shortestTimeSet[v] == false && duration[v] <= min_time){
            min_time = duration[v], min_time_index = v;

        }
    return min_time_index;
}

//computing the path using DSPF
//this is the heart of the algorithm
string processPath(int currentLocation){
    //our graph represented in a matrix
    int timeMatrix[VERTICES][VERTICES] = { { 0, 2, 6, 0, 0, 0, 0 },
                                           { 2, 0, 0, 5, 0, 0, 0 },
                                           { 6, 6, 0, 8, 0, 0, 0 },
                                           { 0, 0, 8, 0, 10, 15, 0 },
                                           { 0, 0, 0, 10, 0, 6, 2 },
                                           { 0, 0, 0, 15, 6, 0, 6 },
                                           { 0, 0, 0, 0, 2, 6, 0 } };
    //The output array. It will hold the shortest distance from the starting location to the location in i
    int duration[VERTICES];
    //stores the streets(vertices) visited and have the shortest time relative to the adjacent streets(vertices)
    bool shortestTimeSet[VERTICES];

    // Initializing all distances as INFINITE and shortestTimeSet[] as false
    for (int i = 0; i < VERTICES; i++)
        duration[i] = INT_MAX, shortestTimeSet[i] = false;

    // Distance of starting street(vertex) from itself is a 0
    duration[currentLocation] = 0;


    for (int count = 0; count < VERTICES - 1; count++) {
        // Pick the street with the miinimum time from the set of streets not yet processed. assign it to u
        int u = minimumDistance(duration, shortestTimeSet);

        // Mark the street as visited and having the shortest distance

        shortestTimeSet[u] = true;
        /* Update output array with the time to the chosen street only if it is in the shortestTimeSet[],
        an edge exists where it is(it is not 0), its time is not INF and the duration from the starting street
        to where it is less than what is stored in duration[v] */

        for (int v = 0; v < VERTICES; v++)

            if (!shortestTimeSet[v]  && timeMatrix[u][v] && duration[u] != INT_MAX
                && duration[u] + timeMatrix[u][v] < duration[v])
                duration[v] = duration[u] + timeMatrix[u][v];
    }

    // print the constructed duration array
    string path = printPath(duration);
   return path;
}


//function that will be called from Kotlin
// we pass in the index of the street where the user is
extern "C" JNIEXPORT jstring JNICALL
Java_com_terrence_aluda_nativetest_MainActivity_checkShortestRoute(JNIEnv* env, jobject, jint currentLocation){
    return env->NewStringUTF(processPath(currentLocation).c_str());
}
```

### Kotlin and XML
In the Kotlin code, we declare the native function, pass `0` as the first vertex, then assign the returned value to the `TextView.text` property.

```kotlin
package <replace-with-your-package-name>

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import <replace-with-your-package-name>.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        //display
        binding.sampleText.text = checkShortestRoute(0)

    }

    /**
     * run the shortest time algo
     */
    external fun checkShortestRoute(x: Int): String

    companion object {
        // Used to load the 'native-lib' library on application startup.
        init {
            System.loadLibrary("native-lib")
        }
    }
}
```

For the layout XML, we add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">
    <TextView
            android:text="Where you are now"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/textBanner"
            android:layout_marginTop="100dp" android:textStyle="bold"
            android:textSize="16sp" android:layout_alignParentLeft="true" android:layout_marginLeft="30dp"
            android:layout_marginStart="30dp"/>
    <TextView
            android:text="Georgia Street"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/currentPlaceTextView"
            android:layout_marginTop="150dp"
            android:layout_alignParentRight="false" android:layout_marginLeft="50dp" android:layout_marginStart="50dp"/>
    <TextView
            android:id="@+id/sample_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World!"
            android:layout_centerInParent="true" android:paddingLeft="30dp" android:paddingRight="20dp"
            android:textSize="15sp"/>
    <TextView
            android:text="Destination"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/textDestination"
            android:layout_marginTop="100dp"
            android:layout_marginRight="70dp"
            android:layout_alignParentRight="true" android:layout_marginEnd="70dp" android:textStyle="bold"
            android:textSize="16sp"/>
    <TextView
            android:text="Apple Street"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/destinationTextView"
            android:layout_marginTop="150dp"
            android:layout_marginRight="70dp"
            android:layout_alignParentRight="true" android:layout_marginEnd="70dp"/>
    <TextView
            android:text="The shortest path:"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/destinationTextView"
            android:layout_marginTop="75dp" android:textStyle="bold"
            android:textSize="16sp" android:layout_alignParentLeft="false"
            android:layout_centerHorizontal="true"/>


</RelativeLayout>
```

Run the app.

### Accuracy
It is obvious that the path will be `0 -> 1 -> 3 -> 4 -> 6` i.e `Georgia -> Mitte St. -> Alexa St. -> Quincy St. -> Apple St.`. 

However, you will notice that our path printing function missed the fourth street. This is because of the conditional checks. 

As it checked the durations, it skipped `Quincy Street` to display `Georgia -> Mitte St. -> Alexa St. -> Apple St.`. This can be maneuvered by adding another nested `if` statement.

 But what if we use a more complex graph? What if the duration between adjacent vertices is equal? If we feed in a different position through the Kotlin file, the accuracy deteriorates even more.

All this leads us to a conclusion; this application needs a visual solution. Something animated, canvas-based, right? Let's have a look at the final graph again.

![full graph](/engineering-education/android-jni-cpluplus-dijkstra/full-graph.png)

It is more intuitive, appealing, and a good UX for the user to check the path. Just like in Google Maps, the path on the map is marked so that the person using it only follows the marked guide. 

Remember, the DSPF algorithm only compares the weights, marks the nodes, and updates the distances. It does cater to the path (This is an undirected graph). 

We cannot use a directed graph because the user may move in any direction. Also, note that we are not creating the app for many users.

### Conclusion
In this article, we looked at a brief overview of the JNI and NDK. We also installed the required components in our environment. 

Now that you have the algorithm, you can use the Android canvas to draw a graph or a simple map then simulate the algorithm by changing the colors of the nodes and edges to create a path. 

You can further enhance it by changing the values on runtime so that the path changes according to the simulated traffic situations.

### Further reading
- [GeeksForGeeks Greedy Algorithms](https://www.geeksforgeeks.org/greedy-algorithms/)
- [JNI Tips](https://developer.android.com/training/articles/perf-jni)
- [Guide to JNI(Baeldung blog)](https://www.baeldung.com/jni)

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

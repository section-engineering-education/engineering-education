Many times, one may be caught in traffic jams during rush hours. It may be in the morning when late for that office meeting, or in the evening when you have a longing to see your pet. Due to this, the person may want to know the shortest route to navigate through the jam, right?
We are going to see how to create a simple app to do that using Dijkstra's Shortest Path First(DSPF) algorithm. Think of the one found in Google Maps but a very simpler and basic version as shown in the image below:

[screenshot 1](/engineering-education/android-JNI-C++-dijkstra/shot-one.png)

To achieve high speed in updating the dynamic traffic changes, we will need to be as native as much as we can. That's why we are using the Native Development Kit. Note that such a feature may be integrated into a car dashboard too(no execution latencies will be needed here😃).

We will be using C++ for the path computation and then consume and display the results to the user using Kotlin.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [A brief overview of the Android NDK and the JNI](#a-brief-overview-of-the-android-ndk-and-the-jni)
3. [Installing the required components](#installing-the-required-components)
4. [Dijkstra's Shortest Path First algorithm](#dijkstra's-shortest-path-first-algorithm)
5. [The C++ code](#the-c++-code)
6. [Kotlin and XML](#kotlin-and-xml)
7. [Accuracy](#accuracy)
8. [Further practice](#further-practice)
9. [Further reading](#further-reading)
10. [Conclusion](#conclusion)

### Prerequisites

A piece of knowledge in the following is required to follow through this effortlessly.

1. **C++**
Being well-versed with it is required. Key areas to have a keen eye on is namespaces, string methods, and pointers. The latter is very important when using JNI because it helps in memory management and optimization for apps you want to come up with.

2. **Kotlin**
Basic knowledge of Kotlin is required. We will use data binding for a simple text display in only one instance.

3. **Java(not so necessary)**
It will be required to understand the working of the JNI.

Additionally, you need Android Studio or IntellijIDEA(configured for android development) in your machine.

### A brief overview of the Android NDK and the JNI
Think of JNI(Java Native Interface) as a tool used for communication between java bytecode and other native languages such as C. We can write programs in another language and make them communicate with languages that can run on the Java Virtual Machine(e.g, Kotlin, Clojure) thanks to JNI. This allows us to implement features that are not easily done using these JVM-based languages, such as communicating with the low-level components such as the memory, hardware, etc. Moreover, applications/products written using the native languages run faster.

NDK is a tool that facilitates the linking of the languages and JNI. Moreover, it allows us to debug and run our applications.

For more info on these, please follow the links listed below:

1. [MindOrks](https://blog.mindorks.com/getting-started-with-android-ndk-android-tutorial)
2. [ProAndroidDev](https://proandroiddev.com/android-ndk-interaction-of-kotlin-and-c-c-5e19e35bac74)
3. [JNI Official Documentation](https://docs.oracle.com/javase/7/docs/technotes/guides/jni/spec/jniTOC.html)

### Installing the required components
For us to write these native apps, we have to install the tools listed below:

1. **NDK**
2. **CMake** - It is a tool used to manage the compiling, builds, and everything needed for a successful software/application creation run. Find more about it [here](https://cmake.org/)

Installing them is very simple. In your IDE(Android Studio or INtellijIDEA), access the SDK Manager, then click the **SDK Tools** tab. Check the **NDK(Side by side)** and the **CMake** options, and click the OK button to start installing. Check the figure shown below.

[screen two](/engineering-education/android-JNI-C++-dijkstra/shot-two.png)

> To access the SDK Manager, click on the **Tools** tab -> **Android** -> **SDK Manager**.

After the installation finishes, modify your app's Gradle file's `defaultConfig` and add the NDK version you are using i.e

```kotlin
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

> Before running the app, do that, or else your IDE will start downloading another NDK version, thereby keeping you waiting(it's not always the case, though). If it does before you change, you can cancel the build process(or close and reopen the project), update your Gradle, then rerun the app.

> You can check the NDK version installed at `your-installation-path/Android/Sdk/ndk`. You will get a folder named using the version number.

We then start the process of creating a new native app.

#### Creating a sample app.

Start a new project creation process. On the **Phone and Tablet** option, choose Native C++. 

[screen three](/engineering-education/android-JNI-C++-dijkstra/shot-three.png)

Set your preferred app name on the next screen, choose Kotlin as the language option, and then click **Next**. 

[screen three](/engineering-education/android-JNI-C++-dijkstra/shot-four.png)

Finally, choose the C++ standard version, then finish. Let's stick with the **Toolchain Default** option for this article.

[screen five](/engineering-education/android-JNI-C++-dijkstra/shot-five.png)

#### Project structure

We see two folders(*cpp* and *java*) instead of the usual *java* folder only in the *src* folder. The *cpp* folder holds the native C++ source files and the **CMakeLists.txt** file. This file is a configuration file used by the CMake in managing the compilation process. The *java* folder is where the kotlin files are found.

[screen six](/engineering-education/android-JNI-C++-dijkstra/shot-six.png)

Open the *native-lib.cpp* file in the *cpp* folder. We see the following code:

```C++
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

We see this is a normal C++ file beginning with preprocessor directives. The first one includes the JNI library for processing our JNI code.

We have the line `extern "C" JNIEXPORT jstring JNICALL` that allows our function to be accessed by Kotlin/Java. The function is called `stringFromJNI()`. 

> Note the syntax of the function name. Any function that has to be called by the external JVM language(Java/Kotlin) has to have this syntax: `Java_packagename_ActivityName_functionName.`

It has two parameters:
1. JNIEnv* env - This is a pointer to the environment we will be using.
2. jobject - The object the function will be called from. In our case, **MainActivity**.

We then return the string to be displayed(`hello`) using the `NewStringUTF()` method accessed from the environment.

> The environment's attributes and methods are accessed using the arrow( -> ) operator.

The `NewStringUTF()` creates a string based on UTF-8 characters from a C++ string passed as an argument.

In the Kotlin file, we load the C++ file using this code.

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

This type of greedy algorithm finds the minimum weights between nodes in a graph data structure. For example, finding the shortest distance between points in a graph. A graph can be anything in real-life such as road networks, rail networks, internet routes, etc.

> A **greedy algorithm** is an algorithm that tries to find the most optimal solution at each stage before it moves on to the next stage. An example is finding the traffic route with the least time to maneuver at a certain area of a town. Find out more about greedy algorithms [here](https://brilliant.org/wiki/greedy-algorithm/).

Take this graph, for instance:

[graph](/engineering-education/android-JNI-C++-dijkstra/graph-one.png)

We want to calculate the shortest distance between points 0 and 6. It works by storing visited nodes and calculating the distances between them and 0. It only adds them to the shortest path list if their distance is the shortest compared to adjacent vertices. It is explained [here](https://www.section.io/engineering-education/dijkstra-python/) in this EngEd article. The article uses the same graph and same values we will use here. It also talks about graphs. If you want to have a clear working of algorithm, please check it out.

> NOTE: You will only need the theory part. The article implements it using Python at the end. If you would like to try the Python code, well and good. But the theory part is what is needed for this article.

In the end, we will get this graph:

[full graph](/engineering-education/android-JNI-C++-dijkstra/full-graph.png)

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

```C++
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
This is self-explanatory. It maps street names to respective indices.

#### 2. printPath()

```C++
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

It receives the `duration[]` array. It holds the shortest duration from the starting location to the location stored in the respective vertices. To display a location, we check if the duration of the next street is less than one of the current street. If the time of the next street is lower, we display the next street. Otherwise, we display the current street. In the `else` statement, we increase the index by 2 to skip the next street because of its larger distance. In the last part, we remove the trailing **->** to avoid such a display:

```bash
Georgia St. -> Mitte St. ->
```
We do this because when we increment the counter, we may have reached the end of the array and the display string will be concatenated with ->. We will discuss the shortcomings of this function towards the end.

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

The `min_time` variable holds the current least time, and it's updated in the code. The minimum time is updated only if we don't have the vertex in the shortest time array(`shortestTimeSet[]`) and the duration is less than the current minimum time. This array stores the streets(vertices) visited and have the shortest time relative to the adjacent streets(vertices).

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
        an edge exists where it is(it is not having a 0 value), its time is not INF and the duration from the starting street
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

After a bunch of array creation and initializations, we move to the `for-loop` which does the processing.

We first pick the street with the minimum time from the set of streets not yet processed, after passing it to the `minimumDistance()` function, and then assigning it to the `u` variable. We then mark it as visited by setting its value in the `shortestTimeSet[]` array to `true`. 

We only update the `duration[]` array with the vertex's information if these conditions are met:

* It is in the `shortestTimeSet[]`.
* An edge exists where it is(it is not having a 0 value).
* Its time is not INF(`INT_MAX`).
* The duration from the source vertex to where it is less than what is stored in `duration[v]`.

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

This will be called from the Kotlin file where we will pass in the index of the street where the user is at.

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
        an edge exists where it is(it is not 0), its time is not INF, and the duration from the starting street
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
For the Kotlin code, we declare the native function, pass a 0(first vertex), then assign the value returned to the TextView.text property.

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

For the layout XML, we add this:

```XML
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
Let's have a look at the final graph.

[]()

It is obvious that the path will be `0 -> 1 -> 3 -> 4 -> 6` i.e `Georgia -> Mitte St. -> Alexa St. -> Quincy St. -> Apple St.`. Oops! Our path printing function missed the fourth street. This is because of the conditional checks. As it checked the durations, it skipped Quincy Street to display `Georgia -> Mitte St. -> Alexa St. -> Apple St.`. Of course, this can be maneuvered by adding another nested `if` statements. But what if we fed in a more complex graph? What if the duration between adjacent vertices is equal? If we feed in a different position, through the Kotlin file, the accuracy deteriorates even more(you can try it).

All this leads us to a conclusion, this application needs a visual solution. Something animated, canvas-based, right? Let's have a look at the final graph again.

[full graph](/engineering-education/android-JNI-C++-dijkstra/full-graph.png)

It is more intuitive, appealing, and a good UX for the user to check the path. Again, like our `mentor', Google Maps, the path on the map is marked so that the person using it only follows the marked guide. Furthermore, it won't be a very nice UI/UX for a path with, let's say, 20 streets all bombarded on the screen.

Remember, the DSPF algorithm only compares the weights, marks the nodes, and updates the distances. It does cater to the path(This is an undirected graph). We cannot use a directed graph because the user may move in any direction. Also, note that we are not creating the app for one user alone, there are many. One may be coming from Apple St. to Georgia St. while another may be coming from Georgia St. to Apple St. This takes us to the next part, Further practice.

### Further practice
Now that you have the algorithm, you can use the android canvas to draw a graph or a simple map then simulate the algorithm by changing the colors of the nodes and edges to give a path. You can further enhance it by changing the values on runtime so that the path changes according to the simulated traffic situations.

### Further reading
Check out these links for more indepth knowledge.

1. [GeeksForGeeks Greedy Algorithms](https://www.geeksforgeeks.org/greedy-algorithms/)
2. [JNI Tips](https://developer.android.com/training/articles/perf-jni)
3. [Guide to JNI(Baeldung blog)](https://www.baeldung.com/jni)

### Conclusion
We looked at a brief overview of the JNI, the NDK definition, and installed the required components in our environment. We then looked at a guide on creating a sample native app, skimmed through the DSPF, and finally created our recommender app and dissected its code. I hope you had a great read.

Happy coding!
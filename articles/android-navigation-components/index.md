### Introduction
As we all know the jetpack navigation library was created to help us provide a better user experience with navigation. But most developers do not know how to harness the full power of the library. This article is here to help you get a deeper understanding of the library and what it offers.

### Destinations and actions
Basically, the navigation component has three basic parts, i.e, the navigation graph, the NavHost and the NavController. They are well discussed in [this article](/engineering-education/bottom-navigation-bar-in-android/). In the navigation graph, we have two very important units.

* **destinations**: this is a fragment or activity in your application. It is a component that contains data and an interface that the user can interact with.
* **actions**: this is a specific navigation route that a user can follow to a different destination. Their main purpose is to connect two or more destinations.

This article will go through how to implement a navigation graph manually and how to navigate to different destinations. It will also look on how to pass data between destinations using `safeArgs` and a bit of deep linking.

Now, let's get coding!

### Prerequisites
To follow through comfortably, you will need:
1. Basic understanding of Android application development using Android studio
2. Basic knowledge of Kotlin programming language
3. Basic understanding of the [Jetpack navigation](https://developer.android.com/guide/navigation) library

### Step 1 : Setting up the project
To get the starting code for this tutorial:
* open Android studio and get the project from version control. Use the url below
```bash
https://github.com/LinusMuema/kotlin.git
```

* once gradle build finishes, open the terminal in the IDE. Run the following commands:
```bash
git checkout navigation
git checkout 75f4822cce5c169f9f1c57807ec19e9dacc730d7
```

What these commands do is checkout to the `navigation` branch that has all the dependecies and UI set. Then since the branch has the final code for this tutorial, we rollback to a commit where the basic setup only was done.

### Step 2 : Setting up the navigation graph

### Step 3 : Passing data to a navigation

### Step 4 : Navigating to a destination

### Step 5 : Using implicit deep links

### Conclusion

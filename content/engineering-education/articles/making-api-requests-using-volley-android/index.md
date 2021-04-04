---
layout: engineering-education
status: publish
published: true
url: /engineering-education/making-api-requests-using-volley-android/
title: Making API Requests using Volley Android
description: In this article, we will create an application that shows the Corona Virus statistics of the world. We will be using Volley to make the network calls.
author: briana-nzivu
date: 2020-11-16T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/making-api-requests-using-volley-android/hero.jpg
    alt: example image bottom navigation bar in Android applications
---
Networking in mobile applications has been around since its inception. In the early days, applications made network calls on the [main thread](https://www.toptal.com/android/android-threading-all-you-need-to-know). Making network requests on the main thread stopped when [Google released the Honeycomb version](https://en.wikipedia.org/wiki/Android_Honeycomb).
<!--more-->
### Introduction
This is because network requests proved to be long tasks that required more processing power. Making network calls on the main thread afterwards led to the `NetworkOnMainThreadException` error in higher SDK levels.

Network requests also can't be done on the UI thread. This is because running a long task on the UI thread can “freeze” a user’s interface, making it not very user friendly.

Different classes and libraries such as `AsyncTask`, `Retrofit`, `Volley`, and others were introduced to carry out networking in mobile applications. **Volley** is an HTTP library that's used for caching and making a network request in Android applications.

Google developed this library in 2013 due to the absence of an Android SDK that can carry out networking without interfering with the user experience. An API is software that contains data used for communication between two applications. Most applications use APIs to send and receive information.

### Classes used in Volley
- **Request:** This class contains the necessary information to make API requests.
- **Request Queue:** A class used to dispatch network requests.

### Uses of Volley
Volley can perform the following tasks:
- It can manage the caching and processing of network requests.
- It helps cache and memory management.
- It manages request queuing and prioritization.
- It enables customization of the library to fit our needs.

### Advantages of Volley
- It saves time from writing the same network/cache code over and over.
- It can run many concurrent network connections.
- It provides tracing and debugging tools.
- It enables the automatic scheduling of network connections.
- It enables caching.
- It supports `OkHttp`.

### Disadvantages of Volley
- It's not suitable for streaming and large downloads.
- It does not have proper documentation yet.
- It's slower compared to [Retrofit](https://square.github.io/retrofit/).
- It's has a complex code structure.

### Useful Terminology
- [Volley](https://developer.android.com/training/volley) - an HTTP library that is used for caching and making a network request in Android applications.
- [API](https://en.wikipedia.org/wiki/API) -software that contains data used for communication between two applications.
- [JSON](https://medium.com/swlh/what-is-json-used-for-in-javascript-programming-9d71284359a9) - (JavaScript Object Notation) is a lightweight data-interchange format.
- [Permission](https://developer.android.com/guide/topics/permissions/overview) statements that allow an android application to access different properties that contain a user's sensitive information.

### Prerequisites
To follow the tutorial along it would be best to have:
- [Android Studio](https://developer.android.com/studio) installed.
- A basic knowledge about APIs and making Requests.
- A basic knowledge about REST APIs, JSON, and making Requests.
- A basic knowledge and understanding of XML and Java programming language.

#### Step 1 – Create a New Project
- Open Android Studio. Select Start new Android Studio Project -> Empty Activity. We'll name the project **CovidTrackerVolley**. Click Finish and wait for the project to build.

![Name the project](/engineering-education/making-api-requests-using-volley-android/name.jpg)

#### Step 2 – Design a Layout
In this step, we will design the UI for the layout of our application.
Our layout has six `TextViews`. Three are labels and the other three are empty text views that will display the information from the API.
Open activity_main.xml and add the following lines of code;

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:app="http://schemas.android.com/apk/res-auto"
 xmlns:tools="http://schemas.android.com/tools"
 android:layout_width="match_parent"
 android:layout_height="match_parent"
 tools:context=".MainActivity"
 android:background="@color/white">

 <TextView
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:text="Total Cases in the World"
 android:textSize="22dp"
 android:textStyle="bold"
 android:textColor="@color/black"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.494"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.225" />

 <TextView
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:text="Total Recovered in the World"
 android:textSize="22dp"
 android:textStyle="bold"
 android:textColor="@color/black"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.494"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.39" />

 <TextView
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:text="Total Deaths in the World"
 android:textSize="22dp"
 android:textStyle="bold"
 android:textColor="@color/black"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.518"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.559" />

 <TextView
 android:id="@+id/newCasesWorld"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:textColor="@color/teal_200"
 android:textSize="22dp"
 android:textStyle="bold"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.498"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.296" />

 <TextView
 android:id="@+id/newDeathsWorld"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:textColor="@color/teal_200"
 android:textSize="22dp"
 android:textStyle="bold"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.498"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.654" />

 <TextView
 android:id="@+id/newRecoveredWorld"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:textColor="@color/teal_200"
 android:textSize="22dp"
 android:textStyle="bold"
 app:layout_constraintBottom_toBottomOf="parent"
 app:layout_constraintEnd_toEndOf="parent"
 app:layout_constraintHorizontal_bias="0.498"
 app:layout_constraintLeft_toLeftOf="parent"
 app:layout_constraintRight_toRightOf="parent"
 app:layout_constraintStart_toStartOf="parent"
 app:layout_constraintTop_toTopOf="parent"
 app:layout_constraintVertical_bias="0.473" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**Note: Some of the text views do not contain any content. The information to be displayed on these text views will be obtained from the API. Thus it's important to leave it blank.**

### Step 3 – Adding Volley to our Application.
Add the following dependency to the app module-level `build.gradle` file:

```gradle
dependencies{
 implementation 'com.android.volley:volley:1.1.0'
}
```

In your AndroidManifest.xml add internet permission:

```manifest
<uses-permission android:name="android.permission.INTERNET />
```

This permission enables our application to access the internet.

#### Step 4 – Making the API Requests
In this step, we'll make the API request.
We'll be using the [NovelCOVID](https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest) API, that contains live Corona Virus statistics.

In our `MainActivity` class, create an object for the `TextViews` in our Resource file.

```java
private TextView totalCasesWorld, totalDeathsWorld, totalRecoveredWorld;
```

In our `onCreate` method initialize the TextViews and invoke the `getData` method.

```java
//Initialize the objects
totalCasesWorld = findViewById(R.id.newCasesWorld);
totalDeathsWorld = findViewById(R.id.newDeathsWorld);
totalRecoveredWorld = findViewById(R.id.newRecoveredWorld);

getData();
```

Now, let's create a `getData` method outside the `onCreate` method. The `getData` method is the most significant task because it contains the code that will fetch data from the API to be used in our app.

In the `getData` method, create a `StringRequest` and assign the NovelCOVID API URL (https://corona.lmao.ninja/v2/all) to a `String`. We are using the `StringRequest` because we want to return information in `String` form.

**Note: It's a good practice to test run test requests to ensure the API contains the information required. Platforms such as [Postman](https://www.postman.com/) can be used to do this.**

![Test Run on Postman](/engineering-education/making-api-requests-using-volley-android/postman.jpg)

Next, we will create a `ResponseListener`, that will contain an `onResponse` method. In the `onResponse` method, we'll create a `JSONObject` class. This class will pass the API data and then set the data from API to the respective views.

**Note: This should be done within a try block. The parameters inside the getString()should be the same as the name given in the JSON format.**

In the `onErrorResponse` method, we'll show a `Toast` message in case of an error.

```java
String myUrl = "https://corona.lmao.ninja/v2/all";
StringRequest myRequest = new StringRequest(Request.Method.GET, myUrl,
        response -> {
            try{
                //Create a JSON object containing information from the API.
                JSONObject myJsonObject = new JSONObject(response);
                totalCasesWorld.setText(myJsonObject.getString("cases"));
                totalRecoveredWorld.setText(myJsonObject.getString("recovered"));
                totalDeathsWorld.setText(myJsonObject.getString("deaths"));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        },
        volleyError -> Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show()
);
```

Lastly, outside the `getData` method initialize the `RequestQueue`,

```java
RequestQueue requestQueue = Volley.newRequestQueue(this);
requestQueue.add(myRequest);
```

We are Done! Let’s run the app.

![CovidTrackerVolley](/engineering-education/making-api-requests-using-volley-android/app.jpg)

### Conclusion
As you can see, Volley makes networking easier in Android development. It provides an easier way to make simple API requests.

**Did you know that Volley takes 560ms to carry out one discussion? That is pretty fast**.

Instead of making requests using slow and complicated classes such as Async Task, you can use Volley to carry out simple network requests. Go ahead and make different networking calls using Volley.

You can read more about Volley in their official [documentation](https://developer.android.com/training/volley).

Access the source code on [GitHub](https://github.com/BrianaNzivu/EngineeringEducation/tree/main/CovidTrackerVolley). Download the sample APK on Google [Drive](https://drive.google.com/file/d/1Gsn9P8KxrXcDXLR4DrUYu1o7i3VVMC52/view?usp=sharing).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

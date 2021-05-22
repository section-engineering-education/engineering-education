---
layout: engineering-education
status: publish
published: true
url: /android-navigation-components/
title: Basics of Android Navigation Components
description: This article goes through the basics of Android navigation components, we will look at how to implement a navigation graph manually and how to navigate to different destinations. It will also look on how to pass data between destinations using `safeArgs` and a bit of deep linking.
author: linus-muema
date: 2020-12-29T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-navigation-components/hero.jpg
    alt: Android navigation components image example
---
As we all know, the jetpack navigation library was created to provide a better user experience with navigation. However, most developers do not know how to harness the full power of the library. This article is here to help you get a deeper understanding of the library and what it offers.
<!--more-->
### Destinations and actions
Basically, the navigation component has three parts, i.e. the navigation graph, the `NavHost` and the `NavController`. They are well discussed in [this article](/bottom-navigation-bar-in-android/). 

In the navigation graph, we have two very important units.

1. **destinations**: This is a fragment or activity in your application. It is a component that contains data and an interface that the user can interact with.
2. **actions**: This is a specific navigation route that a user can follow to a get to a certain destination. Their main purpose is to connect two or more destinations.

This article will go through how to implement a navigation graph manually and how to navigate to different destinations. It will also look on how to pass data between destinations using `safeArgs` and a bit of deep linking.

Now, let's get coding!

### Prerequisites
To follow through comfortably, you will need:
- A basic understanding of Android application development using Android studio.
- A basic knowledge of Kotlin programming language.
- A basic understanding of the [Jetpack navigation](https://developer.android.com/guide/navigation) library.

### Step 1 — Setting up the project
To get the starting code for this tutorial:

- Open Android studio and get the project from version control. 

Use the url below.
```Bash
https://github.com/LinusMuema/kotlin.git
```

- Once the gradle build finishes, open the terminal in the IDE. 

Run the following commands:
```bash
git checkout navigation
git checkout 75f4822cce5c169f9f1c57807ec19e9dacc730d7
```

What these commands do is, checkout the `navigation` branch that has all the dependencies and UI set. Then since the branch has the final code for this tutorial, we rollback to a commit where only the basic setup was done.

### Step 2 — Setting up the navigation graph
The navigation graph hosts our destinations and actions. It's an Android resource file. It must be associated with a `NavHost`. In our application, the `navhost` is in the `activity_main.xml`. The `navhost` is a container that holds destinations and displays them to user.

Our navigation graph resides in the `navigation` resource folder. It has no destinations or actions at this point. We will be having two destinations in our application i.e. the `UsersFragment` and `ProfileFragment` which can be found in the `fragments` directory. In order to add them to our navigation graph, we use the `<fragment>` tag. 

Go ahead and add the following in your `nav_graph.xml` file.

```Xml
<fragment
    android:id="@+id/users_fragment"
    android:name="com.moose.androidkt.fragments.UsersFragment"
    android:label="Users"
    tools:layout="@layout/fragment_users"/>

<fragment
    android:id="@+id/profile_fragment"
    android:name="com.moose.androidkt.fragments.ProfileFragment"
    android:label="Profile"
    tools:layout="@layout/fragment_profile"/>
```

The attributes:
- `id`: Special identification for the destination.
- `name`: Denotes the name of destination which in our case is the fragment class.
- `label`: The name of the layout of the destination that is displayed on the top app bar (if present).
- `layout`: The actual layout file used to display content in our destination.

Our navigation graph needs a starting point. This is the first destination to be displayed when the user opens the application. 

Go ahead and add the following attribute to the `<navigation>` tag.

```Xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    ...
    app:startDestination="@id/users_fragment">

    ...

</navigation>
```

We set the `UsersFragment` as the starting point of our navigation graph.

In our application, when a user clicks on an item in the recyclerview, we want it to move to the `ProfileFragment`. So, we will use an action to move from `users_fragment` to `profile_fragment`. Go ahead and add the following to the `users_fragment` destination.

```xml
<fragment
    android:id="@+id/users_fragment"
    android:name="com.moose.androidkt.fragments.UsersFragment"
    android:label="fragment_users"
    tools:layout="@layout/fragment_users">

    <action
        android:id="@+id/action_users_fragment_to_profile_fragment"
        app:destination="@id/profile_fragment" />

</fragment>
```

An action takes in an identifier i.e. an `id`, and the destination which in our case is the `profile_fragment`. When a user clicks an item in the recyclerview, we will use this action to move to the next fragment.

Sometimes an action may be shared between several destinations. It is a good practice to define the action outside the destinations. This type of action is what is referred to as a **Global action**.

### Step 3 — Passing data to a navigation
In our `ProfileFragment`, we would like to receive the ID of the item clicked in the previous fragment. We will need to pass this ID from the `UsersFragment` to `ProfileFragment`. The navigation library helps us pass data between destinations. 

It has a plugin known as `safeArgs` that helps pass the data and ensuring type-safety. This means that we don't need to check for nullability in our data. The project is already set up for `safeArgs`. 

You can go through [this section](https://developer.android.com/guide/navigation/navigation-pass-data#Safe-args) of the documentation to learn how to set it up.

To pass data to a destination, we make use of the `<argument>` tag. Add the following to the `profile_fragment` destination.

```Xml
<fragment
    android:id="@+id/profile_fragment"
    android:name="com.moose.androidkt.fragments.ProfileFragment"
    android:label="fragment_profile"
    tools:layout="@layout/fragment_profile">

    <argument android:name="userId" android:defaultValue="1" app:argType="integer"/>

</fragment>
```

The attributes:
- `name`: This is the name of the data value you would like to pass into this destination.
- `argType`: This is the data type of the argument passed in. You can get the supported types from the [documentation](https://developer.android.com/guide/navigation/navigation-pass-data#supported_argument_types).
- `defaultValue`: This is the fallback value used when no data is passed.

### Step 4 — Navigating to a destination
When we set up `safeArgs`, it automatically generates classes for us to use in navigation.

- For every destination with an action or that uses an action, a class is generated based on the name. In our case, the `UsersFragment` has an action, hence the generated class is `UsersFragmentDirections`. It appends "Directions" to the name of the destination. This class has functions with the names of the actions in that destination.

- For every destination that receives an argument, an inner class is also generated. The name of the generated class is the name of the destination but with "Args" appended to it. In our application, the generated class will be `ProfileFragmentArgs`.

The recyclerview adapter has a click listener that executes the lambda expression. This lambda is where we will add the code to navigate to the `ProfileFragment`. This lambda receives the ID of the item clicked, and we will pass this ID as an argument. 

Go ahead and add the following code in the `UsersFragment`.

```Kotlin
val listAdapter = ListAdapter(Data.getUsers()){
val action = UsersFragmentDirections.actionUsersFragmentToProfileFragment(it)
findNavController().navigate(action)
}
```

We use `findNavController` to get access to the `NavController` and pass in the action with the ID as an argument in the navigate method. If you run the application at this point, you will end up with an empty `ProfileFragment` page.

To get the data in the profile fragment, add the following code.

```Kotlin
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)

    val args: ProfileFragmentArgs by navArgs()
    val user = Data.getUser(args.userId)

    Glide.with(requireContext()).load(user.image).into(image)
    name.text = resources.getString(R.string.name, user.name)
    number.text = resources.getString(R.string.number, user.number.toString())
}
```

We get an instance of `ProfileFragmentArgs` and use it to get the ID passed in during navigation. We then use it to get the corresponding data and display it accordingly. With that, you get a fully working navigation process.

### Step 5 — Using implicit deep links
The navigation library also comes with support for deep linking within the application. A deep link is used to move to a certain destination inside the application. In this article we will look at implicit deep links. 

These are URIs that lead to a specific point in the application. For instance, when a user enters `https://wwww.example.com/2` in a browser, we could take them directly to the profile page and display the user with the ID value of 2.

To add a deep link, we make use of the `<deeplink>` tag. In our `profile_fragment` destination, add the following code below the argument.

```Xml
<deepLink app:uri="www.example.com/{userId}"/>
```

Keep note of the values passed in as arguments in URIs. Their names should be the same as the argument names. You should also make sure you add the code below in the application's manifest file.

```Xml
<nav-graph android:value="@navigation/nav_graph"/>
```

It should be added in the activity hosting the `NavHost`. In our application, the `NavHost` is in `MainActivity`.

Run your application and open any browser of choice. 

Then enter the following URI.

```bash
https://wwww.example.com/2
```

You should receive a dialog asking you which application to proceed with. Select your application and proceed to view the results. The entire flow should be something similar to the one below.

![deep-linking](/engineering-education/android-navigation-components/deep-linking.gif)

The application back stack is preserved while using deeplinks. This means that when you use the back button, the previous activities/fragments will still be available.

***NOTE: The uri used should have a verified domain or else it won't work.***

### Conclusion
With that, you now know more about the navigation library and some of the extra perks it comes with. You can go ahead and try other options like using explicit deep links or making use of bundles to pass in data. 

Understanding the navigation library is important for any Android developer. It helps you create better applications and allows you to customize the navigation process in your application. Feel free to raise a PR or an issue on [GitHub](https://github.com/LinusMuema/kotlin).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)

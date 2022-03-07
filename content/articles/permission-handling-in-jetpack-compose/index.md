---
layout: engineering-education
status: publish
published: true
url: /permission-handling-in-jetpack-compose/
title: Handling Permission Appropriately in Jetpack Compose
description: This article will focus on handling permissions correctly and with ease in Jetpack Compose.
author: samantha-namenya
date: 2022-03-07T00:00:00-11:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/permission-handling-in-jetpack-compose/hero.png
    alt: Handling Permission Appropriately in Jetpack Compose Hero Image
---
In android, permission handling can be done with the help of `permissionsAPI`. With the help of the accompanist libraries by Google, things are made easier.
<!--more-->
This tutorial will cover how we can handle permissions in Jetpack compose.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [Terminologies](#terminologies)
- [What are permissions, and when are they used?](#what-are-permissions-and-when-are-they-used)
- [Creating a Compose project](#step-one-creating-a-new-compose-project)
- [Setting up dependency](#step-two-setup-the-dependency)
- [Enabling permissions on Manifest](#step-three-enable-permissions-on-manifest)
- [Implementing Single Permissions](#step-four-implementing-single-permissions)
- [Working with multiple Permissions](#working-with-multiple-permissions)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should have:
- [Android Studio Arctic Fox](https://developer.android.com/studio#downloads) installed and know how to create Compose projects.
- An understanding of [Kotlin](https://developer.android.com/kotlin) programming language.
- An understanding and experience of building apps with [Jetpack compose](https://developer.android.com/jetpack/compose).

### Goals
By the end of this tutorial, the reader will be able to:
- Have an understanding of what permissions are and when they are used.
- Use the most effective way to handle permissions in Jetpack compose.
- Implement single and multiple permissions in Jetpack compose.

### Terminologies
- `DisposableEffect` - A handler for side-effects when keys change or when a composable leaves composition.
- `Lifecycle` - This is an abstract class associated with the android lifespan, allowing an object to detect states and respond accordingly.
- `Rationale` - This refers to a set logical basis for a course resulting from an action. For this case, the action taken by the user by either granting or revoking the permissions.
- `States` - A state is a value or an element that changes with time. For example, a snack bar can show whenever the internet connection is interrupted.

Let us get started :)

### What are permissions, and when are they used?
In android, permissions define what an app can access in a user's phone. Due to security measures, an app cannot access some of the phone's data, which requires the app to request the user to allow or deny the app access.

Accepting the permissions will allow the app to access data like contacts, SMS, etc. They are used whenever the app needs user authorization to access hardware or data that is not accessible by default.

#### Step one: Creating a new compose project
To create a new compose project:
- Launch Android Studio and select New project -> Compose Activity.
- Name the project `PermissionsDemo` and click on finish to build the project.

![Create Project](/engineering-education/permission-handling-in-jetpack-compose/create-project.png)

#### Step two: Setup the dependency
In this step, we are going to add the accompanist-permissions dependency. Add this dependency in the app-level `build.gradle` file.

```gradle
implementation 'com.google.accompanist:accompanist-permissions:0.21.1-beta'
```

This tutorial will use the [Google Accompanist](https://google.github.io/accompanist/api/permissions/) library to handle permissions. There are other ways you can handle them, but they are much more complicated. Using the accompanist library will make it simpler.

#### Step three: Enable permissions on the manifest file
We will start by implementing single permission. Later on, see how you can do this for multiple permissions.

To enable permissions, add the following on the Manifest file:

```xml
<manifest ...>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

    <application ...>
        <activity ...>
        </activity>
    </application>
</manifest>
```

#### Step four: Implementing single permissions
Create a function and name it `SinglePermission()`.

We will only request permission to read the phone's external storage in this function. This function defines the permission you want to request the user to allow.

Creating a permission state will be as follows:

```kotlin
val permissionState =
        rememberPermissionState(permission = Manifest.permission.READ_EXTERNAL_STORAGE)
```

#### What do we mean by proper permission handling?
Proper permission handling means requesting app permission(s) correctly, which means, unlike most developers, we will put our logic on `onStart`.

Compose, however, does not have the `onStart()` method. Instead, we use a `LocalLifecycleOwner` and attach `LifeCycleObserver` to observe all activities and fragments lifecycle.

The code will be as follows:

```kotlin
val lifecycleOwner = LocalLifecycleOwner.current
DisposableEffect(key1 = lifecycleOwner, effect = {
    val eventObserver = LifecycleEventObserver { _, event ->
        when (event) {
            Lifecycle.Event.ON_START -> {
                permissionState.launchPermissionRequest()
            }
        }
    }
    lifecycleOwner.lifecycle.addObserver(eventObserver)

    onDispose {
        lifecycleOwner.lifecycle.removeObserver(eventObserver)
    }
})
```

`DisposableEffect` handler remedies side effects that needs fixing when the keys change and also when the composable leaves the composition. In this case, we register a call back that is cleaned after use. Whenever the key `lifecycleOwner` changes, the disposable effect will start again.

#### Checking for permissions
Let us now check for `permissionState`, whether it was accepted or denied by the user. We will then apply the logic.

The code is as follows:

```kotlin
when {
    permissionState.hasPermission -> {
        Text(text = "Reading external permission is granted")
    }
    permissionState.shouldShowRationale -> {
        Column {
            Text(text = "Reading external permission is required by this app")
        }
    }
    !permissionState.hasPermission && !permissionState.shouldShowRationale -> {
        Text(text = "Permission fully denied. Go to settings to enable")
    }
}
```

What happens here is that we are checking the state of the permission. The `hasPermission` indicates that permission is allowed.

The statement `permissionState.shouldShowRatonale`  checks when permission is denied twice. When denied for the second time, permission is considered entirely denied, triggering the last part of checking the permission state.

If the permission is not granted or is denied more than twice, the app tells the user to open settings and enable the denied permissions.

Now the `SinglePermission()` body will be as follows:

```kotlin
@SuppressLint("PermissionLaunchedDuringComposition")
@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun SinglePermission() {
    val permissionState =
        rememberPermissionState(permission = Manifest.permission.READ_EXTERNAL_STORAGE)
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(key1 = lifecycleOwner, effect = {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_START -> {
                    permissionState.launchPermissionRequest()
                }
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    })

    when {
        permissionState.hasPermission -> {
            Text(text = "Reading external permission is granted")
        }
        permissionState.shouldShowRationale -> {
            Column {
                Text(text = "Reading external permission is required by this app")
            }
        }
        !permissionState.hasPermission && !permissionState.shouldShowRationale -> {
            Text(text = "Permission fully denied. Go to settings to enable")
        }
    }
}
```

>Note: Remember to annotate these functions with `@ExperimentalPermissionsApi` to remove the highlighted error, which indicates that the permissions API is at the practical level and is subject to change.

### Working with multiple permissions
Handling multiple permissions is almost similar to handling single permissions. We only declare the permissions in a list for this case. This is done as follows:

```kotlin
val permissionStates = rememberMultiplePermissionsState(
    permissions = listOf(
        Manifest.permission.READ_EXTERNAL_STORAGE,
        Manifest.permission.ACCESS_FINE_LOCATION
    )
)
```

>Note the difference. We used `rememberMultiplePermissionsState()` instead of `rememberPermissionState()`.

Also, we check each permission state at a time by looping through each one of them. This can be done as follows:

```kotlin
permissionStates.permissions.forEach { it ->
    when (it.permission) {
        Manifest.permission.READ_EXTERNAL_STORAGE -> {
            when {
                it.hasPermission -> {
                    /* Permission has been granted by the user.
                       You can use this permission to now acquire the location of the device.
                       You can perform some other tasks here.
                    */
                    Text(text = "Read Ext Storage permission has been granted")
                }
                it.shouldShowRationale -> {
                    /*Happens if a user denies the permission two times

                     */
                    Text(text = "Read Ext Storage permission is needed")
                }
                !it.hasPermission && !it.shouldShowRationale -> {
                    /* If the permission is denied and the should not show rationale
                        You can only allow the permission manually through app settings
                     */
                    Text(text = "Navigate to settings and enable the Storage permission")

                }
            }
        }
        Manifest.permission.ACCESS_FINE_LOCATION -> {
            when {
                it.hasPermission -> {
                    /* Permission has been granted by the user.
                       You can use this permission to now acquire the location of the device.
                       You can perform some other tasks here.
                    */
                    Text(text = "Location permission has been granted")
                }
                it.shouldShowRationale -> {
                    /*Happens if a user denies the permission two times

                     */
                    Text(text = "Location permission is needed")

                }
                !it.hasPermission && !it.shouldShowRationale -> {
                    /* If the permission is denied and the should not show rationale
                        You can only allow the permission manually through app settings
                     */
                    Text(text = "Navigate to settings and enable the Location permission")

                }
            }
        }
    }
}
```

This is all wrapped in a function which is called in the `MainActivity`. The whole function body will be as follows:

```kotlin
@ExperimentalPermissionsApi
@Composable
fun MultiplePermissions() {
    val permissionStates = rememberMultiplePermissionsState(
        permissions = listOf(
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.ACCESS_FINE_LOCATION
        )
    )
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(key1 = lifecycleOwner, effect = {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_START -> {
                    permissionStates.launchMultiplePermissionRequest()
                }
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    })
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    )
    {
        permissionStates.permissions.forEach { it ->
            when (it.permission) {
                Manifest.permission.READ_EXTERNAL_STORAGE -> {
                    when {
                        it.hasPermission -> {
                            /* Permission has been granted by the user.
                               You can use this permission to now acquire the location of the device.
                               You can perform some other tasks here.
                            */
                            Text(text = "Read Ext Storage permission has been granted")
                        }
                        it.shouldShowRationale -> {
                            /*Happens if a user denies the permission two times

                             */
                            Text(text = "Read Ext Storage permission is needed")
                        }
                        !it.hasPermission && !it.shouldShowRationale -> {
                            /* If the permission is denied and the should not show rationale
                                You can only allow the permission manually through app settings
                             */
                            Text(text = "Navigate to settings and enable the Storage permission")

                        }
                    }
                }
                Manifest.permission.ACCESS_FINE_LOCATION -> {
                    when {
                        it.hasPermission -> {
                            /* Permission has been granted by the user.
                               You can use this permission to now acquire the location of the device.
                               You can perform some other tasks here.
                            */
                            Text(text = "Location permission has been granted")
                        }
                        it.shouldShowRationale -> {
                            /*Happens if a user denies the permission two times

                             */
                            Text(text = "Location permission is needed")

                        }
                        !it.hasPermission && !it.shouldShowRationale -> {
                            /* If the permission is denied and the should not show rationale
                                You can only allow the permission manually through app settings
                             */
                            Text(text = "Navigate to settings and enable the Location permission")

                        }
                    }
                }
            }
        }
    }
}
```

>Note: Make sure you annotate these functions with `@Composable`. Also, be sure you call each one of them in the main activity.

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PermissionHandlingComposeDEmoTheme {
                //SinglePermission()
                MultiplePermissions()
            }
        }
    }
}
```

You can find this project on [Github](https://github.com/tanscy-cassie/PermissionsHandlineDemo.git). Also, you can download the sample APK from [here](https://docs.google.com/uc?export=download&id=1dfgBw25jBmqoALN4o8aylZKue1xU2pGQ).

### Conclusion
Using the accompanist library to handle permission requests is way much more effortless. The accompanist is a collection of many libraries that provide Jetpack Compose with developers' features.

Permission handling is effective if we check the permissions state when the app starts. This will help avoid awkward situations where a user can minimize the app, disable the in-app permissions settings, and return to the app, which will lead to the app not correctly functioning.

Keep Composing :)

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)

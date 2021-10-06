---
layout: engineering-education
status: publish
published: true
url: /geofencing-in-android-with-kotlin/
title: Implementing Geofencing in Android using Kotlin
description: This tutorial takes the reader through the process of implementing geofencing in Android applications using Kotlin.
author: brandy-odhiambo
date: 2021-10-06T00:00:00-02:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/geofencing-in-android-with-kotlin/hero.png
    alt: Geofencing in Android with Kotlin hero image
---
Geofence is an imitated variable that describes a real geographical area of interest. Geofencing API allows you to define the outline or limit of a specific area. When users cross the Geofence, they are alerted by a notification.
<!--more-->
Geofencing API employs the use of device sensors to detect a user's location in a battery-efficient manner.

#### Geofence comprises of three transition types:
- **Enter** – This demonstrates that the user has entered the geofence.
- **Dwelling** – Indicates that the user exists within the geofence for a given period.
- **Exit** –  This shows that the user has moved out of the geofence.

#### Prerequisites
To follow along this tutorial, you should:
- Have the most recent version of [Android Studio](https://developer.android.com/studio) installed on your machine.
- Have basic knowledge on Google Maps.
- Have basic knowledge on the [Kotlin](https://developer.android.com/kotlin) programming language.
- Be able to use [ViewBinding](https://developer.android.com/topic/libraries/view-binding).

### Getting started
#### Step 1 – Creating an Android project
In this step, we'll create an Android Studio project with a Google Map activity.

> Make sure you have selected `Google Maps Activity` template.

![New Project](engineering-education/geofencing-in-android-with-kotlin/new_project.png)

#### Step 2 – Including the required dependencies
Include the following dependencies in your app-level `build.gradle` file.

```gradle
implementation 'com.google.android.gms:play-services-maps:17.0.1'
implementation 'com.google.android.gms:play-services-location:18.0.0'
```

#### Step 3 – Adding the required permissions
To start using Geofencing API, the user must first allow location permissions.

In the `Android manifest` file, add the following permissions:

```xml
<uses-permission  android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission  android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

#### Check permissions
Before declaring the function, ensure that the app has permission to run in the foreground and background. It's useful to look into the [Android API](https://source.android.com/setup/start/build-numbers) version of the device.

Add the following code in your `MainActivity` file:

```kotlin
private val gadgetQ = android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q
```

To determine whether permission has been granted or not, create the following function:

```kotlin
@TargetApi(29)
private fun approveForegroundAndBackgroundLocation(): Boolean {
    val foregroundLocationApproved = (
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION
            ))
    val backgroundPermissionApproved =
        if (gadgetQ) {
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_BACKGROUND_LOCATION
            )
        } else {
            true
        }
    return foregroundLocationApproved && backgroundPermissionApproved
}
```

If the device is running Android Q (API 29), ensure that the permissions `ACCESS_BACKGROUND_LOCATION` and `ACCESS_FINE_LOCATION` are enabled. 

If the device is running an older Android version, you don't need permission to access the user's location in the background.

```kotlin
private fun authorizedLocation(): Boolean {
    val formalizeForeground = (
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION
            ))
    val formalizeBackground =
        if (gadgetQ) {
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_BACKGROUND_LOCATION
            )
        } else {
            true
        }
    return formalizeForeground && formalizeBackground
}
```

#### Request background and fine location permissions
This is where you request permission from the user to access their location if it was not granted.

> Add the following variables in a `global scope` or a `companion object`.

```kotlin
private val REQUEST_FOREGROUND_AND_BACKGROUND_PERMISSION_RESULT_CODE = 3 // random unique value
private val REQUEST_FOREGROUND_ONLY_PERMISSIONS_REQUEST_CODE = 4
private val REQUEST_TURN_DEVICE_LOCATION_ON = 5
```

```kotlin
private fun askLocationPermission() {
    if (authorizedLocation())
        return
    var grantingPermission = arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)
    val customResult = when {
        gadgetQ -> {
            grantingPermission += Manifest.permission.ACCESS_BACKGROUND_LOCATION
            REQUEST_FOREGROUND_AND_BACKGROUND_PERMISSION_RESULT_CODE
        }
        else -> REQUEST_FOREGROUND_ONLY_PERMISSIONS_REQUEST_CODE
    }
    Log.d(TAG, "askLocationPermission")

    ActivityCompat.requestPermissions(
        this, grantingPermission, customResult
    )
}
```

Once the user responds to the permissions request, you should process their response in the `onRequestPermissionsResult()` method, as shown below.

```kotlin
override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)

    if (requestCode == REQUEST_FOREGROUND_AND_BACKGROUND_PERMISSION_RESULT_CODE || 
        requestCode == REQUEST_FOREGROUND_ONLY_PERMISSIONS_REQUEST_CODE) {
        if (grantResults.size > 0 && (grantResults[0] == PackageManager.PERMISSION_GRANTED)){
                validateGadgetAreaInitiateGeofence()
            }
    }
}
```

#### Step 4 - Examine the gadget's location.
Permissions granted will be worthless if the user's device location is deactivated. To verify that the device's location is enabled, add the following code.

**Check the device location settings and start the Geofence**

```kotlin
private fun validateGadgetAreaInitiateGeofence(resolve: Boolean = true) {

    // create a location request that request for the quality of service to update the location
    val locationRequest = LocationRequest.create().apply {
        priority = LocationRequest.PRIORITY_LOW_POWER
    }
    val builder = LocationSettingsRequest.Builder().addLocationRequest(locationRequest)

    // check if the client location settings are satisfied
    val client = LocationServices.getSettingsClient(this)
    
    // create a location response that acts as a listener for the device location if enabled
    val locationResponses = client.checkLocationSettings(builder.build())

    locationResponses.addOnFailureListener { exception ->
        if (exception is ResolvableApiException && resolve) {
            try {
                exception.startResolutionForResult(
                    this, REQUEST_TURN_DEVICE_LOCATION_ON
                )
            } catch (sendEx: IntentSender.SendIntentException) {
                Log.d(TAG, "Error getting location settings resolution: ${sendEx.message}")
            }
        } else {
            Toast.makeText(this, "Enable your location", Toast.LENGTH_SHORT).show()
        }
    }

    locationResponses.addOnCompleteListener {it ->
        if (it.isSuccessful) {
            addGeofence()
        }
    }
}
```

Check if the user has accepted or rejected the request in the `onActivityResult()` method. If they haven't, prompt them again.

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        validateGadgetAreaInitiateGeofence(false)
    }
```

#### Step 5 – Adding and removing a geofence

**Adding Geofence**
You'll need a method to inherit from the `PendingIntent` to manage Geofence transitions.

A `PendingIntent` describes both an `intent` and the `action` that should be done in response to it. 

We'll define a pending intent for a `BroadcastReceiver` to control the Geofence transitions.

```kotlin
 private val geofenceIntent: PendingIntent by lazy {
        val intent = Intent(this, GeofenceBroadcastReceiver::class.java)
        PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
    }
```

A `GeofencingClient` is the most basic way to interact with the Geofencing APIs. 

Therefore, create an instance of `GeofencingClient`: 

```kotlin
private lateinit var geoClient: GeofencingClient
```

In the `onCreate()` method, initialize the `geofencingClient`:

```kotlin
geoClient = LocationServices.getGeofencingClient(this)
```

Still, in the `onCreate` method, add a `geofenceList` that holds `geofences`. 

In this step, we will add one geofence but you can have as many as you wish. 

```kotlin
val latitude = 0.616016
val longitude = 34.521816
val radius = 100f

geofenceList.add(Geofence.Builder()
            .setRequestId("entry.key")
            .setCircularRegion(latitude,longitude,radius)
            .setExpirationDuration(Geofence.NEVER_EXPIRE)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER)
            .build())
```

Create a function that specifies the geofence, as highlighted below:

```kotlin
private fun seekGeofencing(): GeofencingRequest {
    return GeofencingRequest.Builder().apply {
        setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
        addGeofences(geofenceList)
    }.build()
}
```

To associate a geofence with a `pendingIntent`, create a geofence function and include the following implementation within it:

```kotlin
private fun addGeofence(){
    if (ActivityCompat.checkSelfPermission(
            this, Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED
    ) {
        return
    }
    geofencingClient?.addGeofences(getGeofencingRequest(), geofenceIntent)?.run {
        addOnSuccessListener {
            Toast.makeText(this@MapsActivity, "Geofence(s) added", Toast.LENGTH_SHORT).show()
        }
        addOnFailureListener {
            Toast.makeText(this@MapsActivity, "Failed to add geofence(s)", Toast.LENGTH_SHORT).show()
        }
    }
}
```

**Removing a geofence**

It is a good practice to remove any geofence associated with a `PendingIntent` when not in use. We do so, using the following method:

```kotlin
private fun removeGeofence(){
    geofencingClient?.removeGeofences(geofenceIntent)?.run {
        addOnSuccessListener {
            Toast.makeText(this@MapsActivity, "Geofences removed", Toast.LENGTH_SHORT).show()
        }
        addOnFailureListener {
            Toast.makeText(this@MapsActivity, "Failed to remove geofences", Toast.LENGTH_SHORT).show()
        }
    }
}
```

Within the `onDestroy` method, call the `removeGeofence()` function:

```kotlin
override fun onDestroy() {
    super.onDestroy()
    removeGeofence()
}
```

#### Step 6 – Creating a BroadcastReceiver class
Android applications can send and receive broadcast messages on devices.

The `BroadcastReceiver` listens for Geofence transitions and provides a notification when a device enters a particular geofence area.

The BroadcastReceiver is implemented as follows:

```kotlin
class GeofenceBroadcastReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        val geofencingEvent = GeofencingEvent.fromIntent(intent)
        if (geofencingEvent.hasError()) {
            val errorMessage = GeofenceStatusCodes.getStatusCodeString(geofencingEvent.errorCode)
            Log.e(TAG, errorMessage)
            return
        }

        val geofenceTransition = geofencingEvent.geofenceTransition
        if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
            val triggeringGeofences = geofencingEvent.triggeringGeofences

            // Creating and sending notification
            val notificationManager = ContextCompat.getSystemService(
                context!!, NotificationManager::class.java
            ) as NotificationManager

            notificationManager.sendGeofenceEnteredNotification(context)
        } else {
            Log.e(TAG, "Invalid type transition $geofenceTransition")
        }
    }
}
```

In your manifest, add the following code to register the BroadCastReceiver:

```xml
<application>
 ...
<receiver android:name=".GeofenceBroadcastReceiver"/>
</application>
```

#### Setting up a notification
We set up a notification using the following code:

```kotlin
private const val NOTIFICATION_ID = 33
private const val CHANNEL_ID = "GeofenceChannel"

fun createChannel(context: Context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val notificationChannel =
            NotificationChannel(CHANNEL_ID, "Channel1", NotificationManager.IMPORTANCE_HIGH)
        val notificationManager = context.getSystemService(NotificationManager::class.java)
        notificationManager.createNotificationChannel(notificationChannel)
    }
}
// extension function
fun NotificationManager.sendGeofenceEnteredNotification(context: Context) {

    // Opening the notification
    val contentIntent = Intent(context, MapsActivity::class.java)
    val contentPendingIntent = PendingIntent.getActivity(
        context,
        NOTIFICATION_ID,
        contentIntent,
        PendingIntent.FLAG_UPDATE_CURRENT
    )

    // Building the notification
    val builder = NotificationCompat.Builder(context, CHANNEL_ID)
        .setContentTitle(context.getString(R.string.app_name))
        .setContentText("You have entered a geofence area")
        .setSmallIcon(R.drawable.ic_baseline_notifications_24)
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setContentIntent(contentPendingIntent)
        .build()

    this.notify(NOTIFICATION_ID, builder)
}
```

### Conclusion
In this article, we have learned what geofencing is, how to add and remove a geofence, listening to geofence events using a broadcast receiver, and displaying a notification when someone enters a geofence. 

You can check the full implementation on [this repository](https://github.com/brandy-kay/GeofencingDemo) on GitHub.

Happy coding!

### Further reading
- [Android Documentation](https://developer.android.com/training/location/geofencing)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

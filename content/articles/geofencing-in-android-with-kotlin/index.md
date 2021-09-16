### Introduction
Geofence is an imitated variable that describes a real geographical area of interest. Geo-Fencing API lets you define the outline or limit of a specific area and feature that surrounds a point of interest.

 When users cross the Geofence, he will be alerted by a notificaton. This gives an advantageous point out when individual is around the facility. Geo-Fencing API employs the use of device sensors to detect user's location in a battery-efficient manner.
 #### Geofence comprises of three transition types:
- Enter – This demonstrates that people have entered the geofence.
- Dwelling – Indicates that the user exists within the geofence for a given period.
- Exit – This shows that the user has moved out of the geofence. 
#### Prerequisites
To follow this tutorial, you should:
- Have the most recent version of [Android Studio](https://developer.android.com/studio) installed.
- Have basic knowledge on Google Maps.
- Have basic knowledge on kotlin programming language.
- Be able to use ViewBinding.

### Getting started
#### Step 1 - Creating an Android project
In this step, we'll create an empty Android Studio project with a Google Map activity.

> Make sure you have selected Google Maps Activity template

![New Project](engineering-education/geofencing-in-android-with-kotlin/new_project.png)

#### Step 2 - Including the needed dependencies
Include the following dependencies in your app-level `build.gradle` file.

```gradle
implementation 'com.google.android.gms:play-services-maps:17.0.1'
implementation 'com.google.android.gms:play-services-location:18.0.0'
```

#### Step 3 - Adding the required permissions
To begin using geofencing, the user must first check and allow location permissions.

In the Manifest file, add the following permission

```xml
<uses-permission  android:name="android.permission.ACCESS_FINE_LOCATION"  />
<uses-permission  android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>
```

##### Check permissions
Before declaring the function, make sure the app has permission to run in the foreground and background. It's useful to look into the API used by the device.

Perform the following actions.

```kotlin
private val runningOrLater = android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q
```

To determine whether permission has been granted or not, create the following functions.

```kotlin
@TargetApi(29)
private fun approveForegroundAndBackgroundLocation(): Boolean {
    val foregroundLocationApproved = (
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION
            ))
    val backgroundPermissionApproved =
        if (runningOrLater) {
            PERMISSION_GRANTED == ActivityCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_BACKGROUND_LOCATION
            )
        } else {
            true
        }
    return foregroundLocationApproved && backgroundPermissionApproved
}
```

If the device is running Android Q (API 29), ensure that the permissions `ACCESS_BACKGROUND_LOCATION` and `ACCESS_FINE_LOCATION` are enabled. If the device is running an older version, you don't require permission to view the location in the background.

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
}
```

##### Request background and fine location permissions
This is where you request permission from the user to access their location if not granted.

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
        Log.d(TAG, "askLocationPermission: ")
        ActivityCompat.requestPermissions(
            this,
            grantingPermission,
            customResult
        )

    }
```

Once the user has answered the permissions request, you should process their response in `onRequestPermissionsResult()` as shown below.

```kotlin
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_LOCATION_PERMISSION) {
            if (grantResults.size > 0 && (grantResults[0] == PackageManager.PERMISSION_GRANTED))
                startLocation()
        }
    }
```

#### Step 4 - Examine the gadget's location.
Permissions granted will be worthless if the user's device location is deactivated. To verify that the device's location is enabled, add the following code.

##### To get started, check the device location settings and start the Geofence.

```kotlin 
private fun validateGadgetAreaInitiateGeofence(resolve: Boolean = true) {
        val locationRequest = LocationRequest.create().apply {
            priority = LocationRequest.PRIORITY_LOW_POWER
        }
        val builder = LocationSettingsRequest.Builder().addLocationRequest(locationRequest)

        val client = LocationServices.getSettingsClient(this)
        val locationResponses =
            client.checkLocationSettings(builder.build())

        locationResponses.addOnFailureListener { exception ->
            if (exception is ResolvableApiException && resolve) {
                try {
                    exception.startResolutionForResult(
                        this,
                        REQUEST_TURN_DEVICE_LOCATION_ON
                    )
                } catch (sendEx: IntentSender.SendIntentException) {
                    Log.d(TAG, "Error geting location settings resolution: " + sendEx.message)
                }
            } else {
                Toast.makeText(this, "Enable your location", Toast.LENGTH_SHORT).show()
            }
        }
        locationResponses.addOnCompleteListener {
            if (it.isSuccessful) {
                addGeofence()
            }
        }
    }
```

Check if the user has chosen to accept or reject the request in the `onActivityResult()` method. If they haven't, re-inquire them.

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        validateGadgetAreaInitiateGeofence(false)
    }
```

#### Step 5 - Adding and Removing Geofence

**Adding Geofence**
You'll need a method which `PendingIntent` provides to manage Geofence transitions.

A `PendingIntent` describes both an `intent` and the `action` that should be done in response to it. You'll define a pending intent for a BroadcastReceiver to control the Geofence transitions.

```kotlin
 private val geofenceIntent: PendingIntent by lazy {
        val intent = Intent(this, GeofenceBroadcastReceiver::class.java)
        PendingIntent.getBroadcast(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
    }
```

A GeofencingClient is the most basic way to interact with the geofencing APIs. Create an instance of GeofencingClient. 

```kotlin
private lateinit var geoClient: GeofencingClient
```

In the `onCreate()` method, initialize the `geofencingClient`

```kotlin
geoClient = LocationServices.getGeofencingClient(this)
```

Also within the onCreate method, add a geofenceList that holds geofences. In this step, we have added one geofence but you can have many geofences. 

```kotlin
geofenceList.add(Geofence.Builder()
            .setRequestId("entry.key")
            .setCircularRegion(latitude,longitude,radius)
            .setExpirationDuration(Geofence.NEVER_EXPIRE)
            .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER)
            .build())

```

Create function that specify the geofence to monitor and the initial trigger.

```kotlin
private fun seekGeofencing(): GeofencingRequest {
        return GeofencingRequest.Builder().apply {
            setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
            addGeofences(geofenceList)
        }.build()
    }
```

To get a geofence associated with a `pendingIntent`, create a geofence function and include the following implementation within it.

```kotlin
private fun addGeofence(){
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        geofencingClient?.addGeofences(getGeofencingRequest(), geofencePendingIntent)?.run {
            addOnSuccessListener {
                Toast.makeText(this@MapsActivity, "Geofences added", Toast.LENGTH_SHORT).show()
            }
            addOnFailureListener {
                Toast.makeText(this@MapsActivity, "Failed to add geofences", Toast.LENGTH_SHORT).show()

            }
        }
    }
```

##### Removing Geofence

It is a good practice to remove any geofences associated with a `PendingIntent` when not in use.

```kotlin
private fun removeGeofence(){
        geofencingClient?.removeGeofences(geofencePendingIntent)?.run {
            addOnSuccessListener {
                Toast.makeText(this@MapsActivity, "Geofences removed", Toast.LENGTH_SHORT).show()

            }
            addOnFailureListener {
                Toast.makeText(this@MapsActivity, "Failed to remove geofences", Toast.LENGTH_SHORT).show()
            }
        }
    }
```

Within the `onDestroy` method call the `removeGeofence()` function.

```kotlin
 override fun onDestroy() {
        super.onDestroy()
        removeGeofence()
    }
```

#### Step 6 - Creating a BroadcastReceiver class
Other Android  applications, as well as the system itself, can send and receive broadcast messages on Android systems. BroadcastReceiver listens for Geofence transitions and provides a notification when a device enters a geofence area.

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

            // Obtaining transition details as a String.
             /*val geofenceTransitionDetails = getGeofenceTransitionDetails(
                 context!!,
                 geofenceTransition,
                 triggeringGeofences
             )*/

            // Creating and sending Notification
            val notificationManager = ContextCompat.getSystemService(
                context!!,
                NotificationManager::class.java
            ) as NotificationManager

            notificationManager.sendGeofenceEnteredNotification(context)
        } else {
            Log.e(TAG, "Invalid type transition $geofenceTransition")
        }
    }
}
```

In your manifest, add the following code

```xml
<application>
 ...
<receiver android:name=".GeofenceBroadcastReceiver"/>
</application>
```

#### Setting up a notification

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

fun NotificationManager.sendGeofenceEnteredNotification(context: Context) {

    //Opening the Notification
    val contentIntent = Intent(context, MapsActivity::class.java)
    val contentPendingIntent = PendingIntent.getActivity(
        context,
        NOTIFICATION_ID,
        contentIntent,
        PendingIntent.FLAG_UPDATE_CURRENT
    )
    //Building the notification
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
In this article, we have learned what is geofencing, how to add and remove a geofence, listening to geofence events using a broadcast receiver, and displaying a notification when someone enters a geofence area. Keep exploring more on Google Maps geofencing.

You can check the full implementation in [this repository](https://github.com/brandy-kay/GeofencingDemo) on GitHub.
 
### References
[Android Documentation](https://developer.android.com/training/location/geofencing)

Happy coding!

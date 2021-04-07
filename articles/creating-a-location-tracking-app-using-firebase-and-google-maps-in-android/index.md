
### Introduction

In this tutorial, you will learn the steps in creating an application that uses Google Maps to give the precise location of another user's device. You shall primarily use Google Maps API to show the exact location. This will be achieved by writing the user's location on a Realtime Database using Firebase and read the location from another device.

Location services have had many applications, especially social apps such as fitness apps, Pokemon Go. And hey, you can also find the location of your stolen device.

By the end of this tutorial, you shall learn how to create two simple apps to aid with location tracking, how to work with Google Maps API and Firebase's Realtime Database.

Comments will be added to the code snippets for better understanding.

### Pre-requisites
- A good understanding of Kotlin in Android development

### Reccomendation
For this tutorial, we shall use real Android device(s) to test the application(s) because it is best for testing map application. If for some reason you need to test the application from an emulator, you can do so by mocking location data in the emulator. You can read more [here](https://medium.com/@msaudi/android-test-location-services-and-gps-with-fake-gps-data-mock-locations-in-emulators-or-real-df211de4d891)

### Getting started
### Step 1: Create a new project
Open Android Studio and create a new project. On the select, a Project template, choose the Google Maps Activity template
[project template](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/project-template.png)

Wait for Android studio to build your project.

At this point when you run the app, you have a blank screen. This is because you have not set up the API key for the map.

### A few things to note
Once you open the `AndroidManifest.xml`, you shall be able to note these auto-filled details:
- `ACCESS_FINE_LOCATION` permission. This accesses the user's precise location. it is often used when you want the most accurate location. Another type of location accuracy is the `ACCESS_COARSE_LOCATION`, which is less accurate. We shall be working with the `ACCESS_FINE_LOCATION` for accurate readings.
- The `com.google.android.geo.API_KEY` meta-data. This is used to specify the API key

The template also adds Google Play Services dependency to build.gradle which exposes the API to the application
``` kotlin
  implementation 'com.google.android.gms:play-services-maps:17.0.0'
  ```

### Google Maps API
### Step 2: Create an API key
You need to create an API key and enable it in the developer console before working with the Google Maps API. You will need your Google account for this.
Open `res/values/google_maps_api.xml`. This is what you will be able to see.
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/console-link.png)
This file will contain your API key. Click on the underlined link and press create a project and continue.
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/create-project.png)
The next screen will need to create an API key to call the API since it is already enabled.
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/create-api-key.png)

The API key is in purple.

[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/api-key.png)

Once you have your key copy it and replace it in the value of `google_maps_key` in the XML file.

### The MapsActivity
This is an overview of the default MapsActivity

```kotlin
class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
                .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    // This method is called when we need to initialise the map and as you can see, it creates a marker with coordinates near Sydney and adds it to the map.
    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Add a marker in Sydney and move the camera
        val sydney = LatLng(-34.0, 151.0)
        mMap.addMarker(MarkerOptions().position(sydney).title("Marker in Sydney"))
        //call moveCamera() on mMap to update the camera
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney))
    }
}
```

At this point, once you run the app, you will notice that the marker is in Sydney.

### Firebase
### Step 3: Creating a Firebase project
We shall be using firebase to store the user's location. You will need a Google account for this too.
Create a project using this [link](https://console.firebase.google.com)
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/firebaseintro.png)

### Step 4: Connect the project to the app
You now need to connect the project to your app
- Go to tools>firebase
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/fb-androidstudio.png)

make sure you also click on add Realtime Database to your app

### Step 5: Add permissions
- Add internet permission
Make sure you add internet permission because the app will require internet to send the devices location to the database.

```kotlin
<uses-permission android:name="android.permission.INTERNET"/>
```
- Add the  Google Maps location dependency;
```kotlin
 implementation 'com.google.android.gms:play-services-location:17.0.0'
```
##### Step 6: The MapsActivity
Navigate to MapsActivity.kt and add the following

```kotlin
class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var map: GoogleMap

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
                .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
        setupLocClient()

    }



    private lateinit var fusedLocClient: FusedLocationProviderClient
    // use it to request location updates and get the latest location

    override fun onMapReady(googleMap: GoogleMap) {
        map = googleMap //initialise map
        getCurrentLocation()
    }
    private fun setupLocClient() {
        fusedLocClient =
            LocationServices.getFusedLocationProviderClient(this)
    }

    // prompt the user to grant/deny access
    private fun requestLocPermissions() {
        ActivityCompat.requestPermissions(this,
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), //permission in the manifest
            REQUEST_LOCATION)
    }

    companion object {
        private const val REQUEST_LOCATION = 1 //request code to identify specific permission request
        private const val TAG = "MapsActivity" // for debugging
    }

    private fun getCurrentLocation() {
        // Check if the ACCESS_FINE_LOCATION permission was granted before requesting a location
        if (ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION) !=
            PackageManager.PERMISSION_GRANTED) {
            // If the permission has not been granted, then requestLocationPermissions() is called.
            requestLocPermissions()
        } else {

            fusedLocClient.lastLocation.addOnCompleteListener {
                // lastLocation is a task running in the background
                val location = it.result //obtain location
                //Get a reference to the database, so your app can perform read and write operations
                val database: FirebaseDatabase = FirebaseDatabase.getInstance()
                val ref: DatabaseReference = database.getReference("test")
                if (location != null) {

                    val latLng = LatLng(location.latitude, location.longitude)
                   // create a marker at the exact location
                    map.addMarker(MarkerOptions().position(latLng)
                        .title("You are currently here!"))
                    // create an object that will specify how the camera will be updated
                    val update = CameraUpdateFactory.newLatLngZoom(latLng, 16.0f)

                    map.moveCamera(update)
                    //Save the location data to the database
                    ref.setValue(location)
                } else {
                      // if location is null , log an error message
                    Log.e(TAG, "No location found")
                }



            }
        }
    }



    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray) {
        //check if the request code matches the REQUEST_LOCATION
        if (requestCode == REQUEST_LOCATION)
        {
            //check if grantResults contains PERMISSION_GRANTED.If it does, call getCurrentLocation()
            if (grantResults.size == 1 && grantResults[0] ==
                PackageManager.PERMISSION_GRANTED) {
                getCurrentLocation()
            } else {
                //if it doesn`t log an error message
                Log.e(TAG, "Location permission denied")
            }
        }
    }



}
```

### Step 7: Run the app
Run the app. This is what you will achieve(locations may differ). Allow the app to access location
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/locatrack-perm.png)
The user location will be seen as;
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/locatrack.png)
From the code above, you have been able to save the location in a database. Navigate to the firebase console and click on the project you had created. you should see something similar to this.
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/database-state.png)



### The LocationChecker App
After creating this first app which basically reads the location of the user and shows it, then writes it to a realtime database, we need another that will read from that database. This is where the second one comes in.

### Step 1: Creating a new project
Follow the exact same process as above in creating a new project. Make sure you select the Google Maps template then name it.

### Step 2: Add credentials to an existing key
Since we already have an API key, we do not need to create a new one. We can just add the credentials to the console.
Open your developers console and click on edit icon
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/add-item.png)
Navigate to `google_maps_api.xml` copy the package name and SHA-1 cetificate fingerprint, paste these details on the add item section.
save the changes.
### Step 3: Adding a button
We need to add  a button that will trigger the reading of the current location in the database.Here is the `activity_maps.xml` :
```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    xmlns:map="http://schemas.android.com/apk/res-auto"
    android:layout_height="match_parent"
    tools:context=".MapsActivity"
    xmlns:tools="http://schemas.android.com/tools">

<fragment
    android:id="@+id/map"
    android:name="com.google.android.gms.maps.SupportMapFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    map:layout_constraintLeft_toLeftOf="parent"
    map:layout_constraintRight_toRightOf="parent"
    map:layout_constraintTop_toTopOf="parent"
    map:layout_constraintBottom_toBottomOf="parent" />

    <Button
        android:layout_width="wrap_content"
        map:layout_constraintLeft_toLeftOf="parent"
        map:layout_constraintRight_toRightOf="parent"
        map:layout_constraintBottom_toBottomOf="parent"
        android:padding="20dp"
        android:id="@+id/btn_find_location"
        android:text="@string/find_user_s_location"
        android:layout_height="wrap_content" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Adding permission
By default, the GoogleMaps Activity template add the `ACCESS_FINE_LOCATION` permission in the manifest. Because we shall require the use of the internet to read from the database, add the internet permission:
```xml
 <uses-permission android:name="android.permission.INTERNET"/>
 ```

### Step 4: The model class
Since we are reading from the database, we need a class that shall add the attributes, latitude and longitude to handle data
```kotlin
import com.google.firebase.database.IgnoreExtraProperties

@IgnoreExtraProperties
data class LocationInfo(
    var latitude: Double? = 0.0,
    var longitude: Double? = 0.0
)
```

### Step 5: The MapsActivity
Add the following code;

```kotlin
class MapsActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var map: GoogleMap
    private var database: FirebaseDatabase = FirebaseDatabase.getInstance()
    private var dbReference: DatabaseReference = database.getReference("test")
    private lateinit var find_location_btn: Button


        override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)

            find_location_btn = findViewById(R.id.btn_find_location)
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        val mapFragment = supportFragmentManager
                .findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
        // Get a reference from the database so that the app can read and write operations
            dbReference = Firebase.database.reference
            dbReference.addValueEventListener(locListener)
    }

    val locListener = object : ValueEventListener {
        //     @SuppressLint("LongLogTag")
        override fun onDataChange(snapshot: DataSnapshot) {
            if(snapshot.exists()){
            //get the exact longitude and latitude from the database "test"
                val location = snapshot.child("test").getValue(LocationInfo::class.java)
                val locationLat = location?.latitude
                val locationLong = location?.longitude
                //trigger reading of location from database using the button
                find_location_btn.setOnClickListener {

                     // check if the latitude and longitude is not null
                    if (locationLat != null && locationLong!= null) {
                    // create a LatLng object from location
                        val latLng = LatLng(locationLat, locationLong)
                        //create a marker at the read location and display it on the map
                        map.addMarker(MarkerOptions().position(latLng)
                                .title("The user is currently here"))
                                //specify how the map camera is updated
                        val update = CameraUpdateFactory.newLatLngZoom(latLng, 16.0f)
                        //update the camera with the CameraUpdate object
                        map.moveCamera(update)
                    }
                    else {
                        // if location is null , log an error message
                        Log.e(TAG, "user location cannot be found")
                    }
                }

            }
        }
        // show this toast if there is an error while reading from the database
        override fun onCancelled(error: DatabaseError) {
                Toast.makeText(applicationContext, "Could not read from database", Toast.LENGTH_LONG).show()
        }

    }

    override fun onMapReady(googleMap: GoogleMap) {
        map = googleMap //initialize map when the map is ready

    }
    companion object {
        // TAG is passed into the Log.e methods used above to print information to the Logcat window
        private const val TAG = "MapsActivity" // for debugging
    }
}
```

When you run the app, you should be able to get a similar view(Locations will differ):
[project](/engineering-education/creating-a-location-tracking-app-using-firebase-and-google-maps-in-android/locatchecker.png)

### Testing the Apps
Install both apps on you phone. Or the LocationTracker one on your friend’s phone. Make sure the internet connection is good. Check the database for the location that has been written. On the second application, LocationChecker, check if that is the exact location.

You can find the apps [here](https://github.com/carolinemusyoka/MyLocationTracker) and [here](https://github.com/carolinemusyoka/MyLocationChecker)


### Conclusion
It all does not end there. You can play around with the API to create really awesome apps or add this functionality to existing ones.
You can also add other features such as a messaging service, ie sending a message to the user that he/she is being tracked.
Something to also think about would be authentication for individual entries in the database

Happy Coding!!






When developing an android application, you are probably going to consume data from external servers. Let's say your application is fetching some data from a database or an API. This will require a user to have an internet connection. Take a comparative example of a user login system. You need to authenticate that user. Thus this process has to hit the internet back and forth to ensure the credential submitted are valid to that specific user. This user will need to have wifi connectivity of mobile data to process all these server requests and responses.

This user may be in a position of not being aware that their phone has no internet connection. As a developer, you need to suit your application in such a scenario. This will alert a user that the internet is required for them to have access to application information.

However, as a developer, the ways you use to handle this case must prove its importance to the user. For example, you need to detect and monitor network connectivity. Then decide what to tell the user.

In this case, developing an application that just detects the internet connection might deceive a user. Your application will still work and show the user when connected to the internet. However, you cannot just rely on the detection of network connectivity. A user might be connected to the wifi, but the wifi has no active internet to connect and access data from a server. This means you have first to detect if the user has connected to the internet then monitor the user's network to know the internet capabilities. If this connection is active, does it have capabilities to access an online server/data?

Active internet connection is not a guarantee of network connection capabilities. Knowing these capabilities will help you return the right information to the user. You need to detect networks, detect when you've connected to a network, and then test whether or not if that network has internet connections. This means you need to monitor and check the internet connection in real-time, show the user the connection status, and know if there is internet available.

This article aims to explain this concept and implement it in android applications using Kotlin.

### Prerequisites
To follow along with this guide;
- Ensure that you're using the latest version of android studio.
- Have some basic knowledge on how to use android studio IDE.
- Understands how to write code syntaxes using Kotlin.

### Background
We are using `ConnectivityManager()` to listen for changes to the network connection. We will then save these changes to LiveData objects. LiveData object will act as a data holder that other components such as the UI observers to update other components. This makes it easy to keep what's showing on-screen in sync with the data saved in the LiveData objects. Let’s briefly discuss these concepts.

#### LiveData
Checking and monitoring network connectivity should be straightforward. That means this operation should be checked in real-time depending on how the user interacts with the internet connectivity and the application itself. You need to track different states and lifecycle of an android application to check different updates in your application components to show the user when connected and when the connection is lost. In this tutorial, we will use LiveData components to track down different application states. LiveData is a part of Android Architecture components. LiveData is an observable data holder class. It is lifecycle aware, meaning it respects the life cycle of other app components such as activities fragments or services. This awareness ensures LiveData only updates app component observers that are inactive lifecycle states.

This means live data can be observed by other components for such as UI controllers. Being a lifecycle-aware component, the LiveData object can send updates to the observer (activity/fragment). If an activity is paused or destroyed, a LiveData object will not send updates; instead, it will just wait until the activity is in an active state.

In simple terms, a UI observes this LiveData object and gets notified of updates. Therefore, when the LiveData changes, the UI will get notified, and then the UI can redraw itself with the new data. LiveData makes it easy to keep what's going on the screen in sync with the data.

Now you might be wondering where the concept of LiveData comes in in relation to internet connections. LiveData updates UI components in real-time depending on the values of a given android application component. In this case, we use internet connectivity, save the value of that connection, and update the UI components accordingly.

Here is a simple scenario that will help you understand the concept of LiveData and what it does to the UI components. Let’s use YouTube as a use case here. When you open your YouTube application, and suddenly the internet connection gets lost, the application immediately updates its UI components and shows that you don’t have internet connections.

![youtube-offline](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/youtube-offline.jpg)

And when your internet connection is restored, the UI is immediately updated with new components that show you the connection is now active.

![youtube-online](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/youtube-online.jpg)

The LiveData data works the same. The LiveData object act as a data holder class. It observes the application lifecycle and updates the UI, and syncs the screen with this data.

#### The Connectivity Manager
`ConnectivityManager()` is used to initially register a specific network request. It is an Android class that provides a list of all the current questions about the state of wireless connectivity. It does so by informing them when the network connection state gets changed. It does the following;

- It gets information about the networks you're connected to.
- Monitors the type of network connections such as wifi, cellular data, etc.
- Send broadcast intents when a network connection is lost or changes. This notifies applications when a network connection changes or fails.
- Attempt to "fail over" a network when connectivity is lost.
- Set up an API to allow applications to query the available networks. It uses this API to monitor and report network connections.

We're going to build a class that can output a LiveData class. This class will output a Boolean that denotes whether or not you have internet connectivity within your app depending on the information returned by the Connectivity Manager.

### Set up an android project
Head over to your android studio and create a new project and create with an Empty activity. While doing this, remember we are using Kotlin. So make sure Kotlin is selected when creating this new application, I.e.;

![create-a-kotlin-app](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/create-a-kotlin-app.png)

Once that is complete, head over to your app's manifest `AndroidManifest.xml` and add an internet perfection. We are accessing the internet connection properties, so we need to add permission to access the network states.

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

Finally, create a new Kotlin class that we will use to handle the LiveData and the Connectivity Manager.

![livedata-internet-connections-class](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/livedata-internet-connections-class.png)

Name this class `LiveDataInternetConnections`

### Set up LiveData and ConnectivityManager
The class we have created above will take in `ConnectivityManager()` and `LiveData`. LiveData will hold a Boolean value that we will use whenever `ConnectivityManager()` returns a new connection status.

```kt
class LiveDataInternetConnections(private val connectivityManager: ConnectivityManager):
LiveData<Boolean>(){

   constructor(appContext: Application) : this(
     appContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
   )
}
```

We are also getting a reference to the `ConnectivityManager()` that will be used to initially register a specific network request and the callbacks necessary to access the network statuses. This is the very first that will help us get the CONNECTIVITY SERVICES. You need to get a `ConnectivityManager()` object getting passing the `appContext.getSystemService()`. Then pass in the `Context` the constant `CONNECTIVITY_SERVICE` and cast it to the `ConnectivityManager`.

### Set up the NetworkCallback
When you want to monitor changes to the network, you need to create a callback and register a network callback on the `ConnectivityManager()`.

Here we will create a `NetworkCallback()`. This is a base class used to set up `NetworkRequest` callbacks.

This callback is created by creating an object that extends the `NetworkCallback()` class that comes from the `ConnectivityManager()` itself. This object will give us the possibility of getting a few useful information. For example, whenever the network becomes available, the `onAvailable()` method will be invoked. And as soon as we lose the connection to such a network, the `onLost()` method is called. Such methods come with default knob implementation. You might need to be warned when you are about to lose the handle to the network. In such a case, the `onLosing()` method will be invoked, informing you how much time is left to use this connection. You are free to implement what you need in our specific situation.

In this example, we will start by adding the `onAvailable()` and `onLost()` methods, as shown below.

```kt
override fun onAvailable(network: Network) {
   super.onAvailable(network)
   Log.d(ContentValues.TAG, "onAvailable: Network ${network} is Available")
   postValue(true)
}

override fun onLost(network: Network) {
   super.onLost(network)
   Log.d(ContentValues.TAG, "onLost: ${network} Network Lost") 
   postValue(false)
}
```

Since we are extending to the `LiveData`, we can then `postValue()` based on the method invoked. This takes a Boolean value. So when the connection is available, a `true` value will be added to the `LiveData`, which we explained acts as a data holder. When the connection is lost, a `false` value will be registered to the `LiveData`. So when this connection information is saved using the `LiveData`, we can attach them to an observer that will update the UI components based on the current value of the currently available connection.

### Register and unregister a NetworkCallback
In order to use `ConnectivityManager()` properties, you have to register a callback. After setting up `NetworkCallback()`, we need t set up when to register and unregister that callback based on the active observers.

This way, we only register a callback when needed and unregister a callback when it's no longer needed. Remove such callbacks from a request so that we don't waste any resources.

Here we will have two override functions, `onActive()` and `onInactive()` as shown below.

```kt
@RequiresApi(Build.VERSION_CODES.LOLLIPOP)
override fun onActive() {
   super.onActive()
   val builder = NetworkRequest.Builder()
   connectivityManager.registerNetworkCallback(builder.build(), networkCallback)
}

@RequiresApi(Build.VERSION_CODES.LOLLIPOP)
override fun onInactive() {
   super.onInactive()
   connectivityManager.unregisterNetworkCallback(networkCallback)
}
```

We first build the network request object using `Builder`. Then register our network callback inside of `onActive()` function. Finally, as soon as there are no more observers, `onInactive()` gets called, and we unregister the callback.

If the callback was registered with `registerNetworkCallback()` it will be called for each network which no longer satisfies the criteria of the callback.

### Setting up the observers
We now have a class that will inform the LiveData object holder when a mobile phone has an internet connection and when that connection is lost. Let's now set the observers/UI elements that will be updated accordingly, i.e., based on the current Boolean value returned by the requested `NetworkCallback()`.

Here we are going to use XML code to set up some UI components. As an option, if you are using the Jetpack Compose, Check how to use [Lifecycle observer in Compose](https://jsuch2362.medium.com/lifecycle-observer-in-compose-8189b8b07c11) to watch over UI components.

Add this TextViews inside your `activity_main.xml` file. We are adding two invisible text views that will be updated based on the Boolean value returned by the available connection.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   xmlns:app="http://schemas.android.com/apk/res-auto"
   android:background="#FAFAFA"
   android:layout_height="match_parent"
   tools:context=".MainActivity">

   <TextView
     android:id="@+id/connected"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:background="#0B0A0A"
     android:gravity="center"
     android:text="Connected"
     android:textColor="#ff669900"
     android:textSize="30dp"
     android:textStyle="bold"
     app:layout_constraintBottom_toBottomOf="parent"
     android:visibility="gone"
     tools:ignore="MissingConstraints"
     tools:layout_editor_absoluteX="0dp"
     tools:layout_editor_absoluteY="699dp" />

   <TextView
     android:id="@+id/not_connected"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:background="#0B0A0A"
     android:gravity="center"
     android:text="No Connection"
     android:textColor="#ffcc0000"
     android:textSize="30dp"
     app:layout_constraintBottom_toBottomOf="parent"
     android:textStyle="bold"
     android:visibility="gone"
     tools:ignore="MissingConstraints"
     tools:layout_editor_absoluteX="0dp"
     tools:layout_editor_absoluteY="699dp" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

Initialize these two TextViews just above your `onCreate()`

```kt
private lateinit var connected : TextView
private lateinit var not_connected : TextView
```

Let's now attach an observer to these elements.

```kt
TextView1 = findViewById(R.id.connected)
TextView2 = findViewById(R.id.not_connected)
cld = LiveDataInternetConnections(application)
cld.observe(this, { isConnected ->
   if (isConnected) {
     TextView1.visibility = View.VISIBLE
     TextView2.visibility = View.GONE
   }else{
     TextView1.visibility = View.GONE
     TextView2.visibility = View.VISIBLE
   }
})
```

From the above code, we initialized the class that we created to check and hold the network values. Here we are observing these values as either `true` or `false`. In that case, the observe will check the current saved value and then update the current UI elements. In this case, we are using TextView. Of course, you can choose any UI components that fit your application, such as Toast message, Alert Dialogs, Snack Bars, etc.

We have already attached `LiveDataInternetConnections` to this observer, i.e. `cld.observe(this, { isConnected -> })`. The value saved by the LiveData class will be returned and saved as `isConnected` whenever the `ConnectivityManager()` returns as `true` value. We are then watching the value of `isConnected`. And if `true`/`false`, we update the visibility of our TextView. When `true` `TextView1` should always be visible, and `TextView2` shouldn't be visible. When `true` `TextView2` should always be visible, and `TextView1` shouldn't be visible.

### Testing this use case
This application is now ready for teasing. Make sure you run it on a real device. This will give you the values of the available connection. When you run this application, and your phone is connected with wifi or cellular network. In this case, the UI will be updated, and you can see the app is connected to a network.

![connected](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/connected.jpg)

As soon as you switch off your wifi of cellular data, the application gets updated, and a not-connected TextView becomes visible.

![no-connections](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/no-connections.jpg)

However, if your cellular data or wifi is active but has no active network connection, this will still show that you are connected to a network. This creates a limitation since its shows are connected even to a network that has no internet. We are only detecting if there is an available network and if we are connected to that network.

However, you need to detect networks, detect when you've connected to a network, and then test whether or not if this network actually has internet. Let's now build on this application and check if the network is valid and has connection capability.

### Check network capabilities and capabilities
We going to add an extra check that’s validate the connection. So on top of the `onAvailable()` and `onLost()` methods, we will add `onCapabilitiesChanged()` method. Right below `onAvailable()` and the following `onCapabilitiesChanged()` check.

```kt
@RequiresApi(Build.VERSION_CODES.M)
override fun onCapabilitiesChanged(
   network: Network,
   networkCapabilities: NetworkCapabilities) {
   val isInternet = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
   Log.d(ContentValues.TAG, "networkCapabilities: ${network} $networkCapabilities")
   val isValidated = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED)
   if (isValidated){
     Log.d(ContentValues.TAG, "hasCapability: ${network} $networkCapabilities")
   } else{
     Log.d(ContentValues.TAG, "Network has No Connection Capability: ${network} $networkCapabilities")
   }
   postValue(isInternet && isValidated)
}
```

`onCapabilitiesChanged()` we are checking if the connected network. `networkCapabilities()` basically checks if this network is wifi enabled or cellular data. Technically there are two networks. They could both have internet. They could both be passed to the `onAvailable()` function. `networkCapabilities()` will check the kind of network we are connected to. This is done by extending it to `hasCapability()` and adding a constant `NET_CAPABILITY_INTERNET`.

Once we have checked if we are connected to wifi or cellular data, we need to verify of the available network has a valid connection. This is done by extending `networkCapabilities()` to `hasCapability()` and adding a constant `NET_CAPABILITY_VALIDATED`. Based on the returned values, we will save this data to the `postValue()`

>Note: Only starting from `version Build.VERSION_CODES.O` `onAvailable()` will always immediately be followed by a call to `onCapabilitiesChanged()`. On versions below, `Build.VERSION_CODES.O`, when the app is started with an internet connection, nothing apart from `onAvailable()` is being called. Thus we need to pass `postValue(true)` here (although in some cases, it could be `false` positive).

When building our network request object using `Builder`, we also need to add these capabilities. This is the network property that we are most interested in to check if the network connection has internet. There we need to add a constant `NET_CAPABILITY_INTERNET` to the `Builder` request. Head over to your onActive() method, and update it as follows.

```kt
@RequiresApi(Build.VERSION_CODES.LOLLIPOP)
override fun onActive() {
   super.onActive()
   val builder = NetworkRequest.Builder()
   connectivityManager.registerNetworkCallback(builder
     .addCapability(NET_CAPABILITY_INTERNET)
     .build(), networkCallback)
}
```

### Testing network capabilities
We will use LogCat to test these features. So run your application. If possible, try using a real device. Once you run the application, open your LogCat, select the running application and filter the debug logs.

![logcat](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/logcat.png)

Open your application and watch the log cat messages.

![network-with-capabilities](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/network-with-capabilities.png)

If you open your application while connected to active wifi, The `onAvailable()` will be called. The `networkCapabilities()` is checked. Here we are connected to wifi. So now we need to check if this wifi has network capabilities. Based on the above log cat messages, we can see that this wifi has the capability to connect.

Next, try to connect to wifi/cellular that you know has no internet connection.

![network-with-no-capabilities](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/network-with-no-capabilities.png)

Since we are connected to a network, `onAvailable()` will be successfully be executed, followed by `networkCapabilities()`, which shows we are connected to a wifi network. However, this connection is not valid, and it has `No Connection Capability`. Therefore, we cannot access any online data using this connection. And if you look at your application, the UI is updated accordingly with a `No Connection` TextView.

Finally, if you switch off the wifi completely, `onLost()` will be called.

![lost-connection](/engineering-education/handle-and-implement-no-internet-connections-and-capabilities-using-livedata/lost-connection.png)

Since we have no available connection, we have no `networkCapabilities()` checks. And the current LiveData value will be saved as `false`, updating the UI elements accordingly.

### Conclusion
This is a great use case to tell your users when there's no network connection. You can use this in your use cases to pass the connectivity Boolean values and change your UI components relative to whether or not there's a network connection. The concept of `ConnectivityManager()` is a bit wide, and there are more methods that you can use based on what you want your application to achieve. This article is just the basics of some `ConnectivityManager()` critical methods. Be sure to [check on the documentation](https://developer.android.com/reference/android/net/ConnectivityManager) and see what fits your application.

For further reference, check this project's code on [GitHub](https://github.com/kimkimani/Internet-Connections-and-Capabilities-Checks-using-LiveData).
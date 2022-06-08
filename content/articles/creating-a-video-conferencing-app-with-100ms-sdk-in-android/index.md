---
layout: engineering-education
status: publish
published: true
url: /creating-a-video-conferencing-app-with-100ms-sdk-in-android/
title: Creating a Video Conferencing App with 100ms SDK in Android
description: This tutorial will guide the reader on how to create a video conferencing app with 100ms SDK in Android using Jetpack Compose. 
author: tom-leposo
date: 2022-06-07T00:00:00-16:01
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/hero.png
    alt: Creating a Video Conferencing App with 100ms SDK in Android
---
Video conferencing has become part of our life as we all rely on it regularly. Video conferencing is used when holding meetings, on WhatsApp calls, and much more.
<!--more-->
In this tutorial, we will use the **100ms Android SDK** and **Jetpack compose** to create a video conferencing app.

### Table of content
- [Prerequisites](#prerequisites)
- [What is 100ms SDK?](#what-is-100ms-sdk)
- [Definitions](#definitions)
- [Pricing](#pricing)
- [Creating an account on the 100ms SDK](#step-1---creating-an-account-on-the-100ms-sdk)
- [Creating a compose project](#step-2---creating-a-compose-project)
- [Setting up the project](#step-3---setting-up-the-project)
- [Getting access token](#step-4---getting-access-token)
- [Adding functions to the repository](#step-5---adding-functions-to-the-repository)
- [Creating the ViewModel](#step-6---creating-the-viewmodel)
- [Dependency injection](#step-7---dependency-injection)
- [Designing the user interface](#step-8---designing-the-user-interface)
- [Setting up navigation](#step-9---setting-up-navigation)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, the reader should have knowledge on:
- Using the MVVM pattern.
- Dependency injection with Dagger-Hilt.
- Using Jetpack Compose in creating declarative UI.
- Kotlin Coroutines.
- Making network calls with Retrofit.

### What is 100ms SDK?
100ms offers a video conferencing infrastructure that provides web and mobile — native iOS and Android SDKs, to add live video & audio conferencing to your applications.

### Definitions
- Peer: this is an object that contain the details of a person in a room.
- Room: this is the object that holds peers who are in a call (audio or video).
- Track: represents either audio or video being published from a peer.
- Roles: represents permissions for peers.

### Pricing
The platform gives you 10,000 FREE minutes every month.

#### Video and audio
Conferencing - $8 (HD)/ $4 (SD), recording - $20 (HD)/ $10 (SD) and RTMP Out - $24 (HD)/ $12 (SD).

#### Audio only
Conferencing - $1, recording - $3 and RTMP Out - $4.

### Step 1 - Creating an account on the 100ms SDK
To use the 100ms SDK in our project, we first need to visit the official [100ms Dashboard](https://dashboard.100ms.live/login) and sign up.

We then need to set up the account by:
- Choosing a subdomain.

![subdomain](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/subdomain.png)

- Details about usage and location.

![details](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/details.png)

- And finally, choose a template, and in this case, we will use video conferencing.

![template](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/template.png)

Once you get to your dashboard, you will be able to see the different credentials that we are going to use. Click on the developer option and copy the "Token endpoint" as we will be using it for our project. You can securely add the URL in your `gradle.properties` file and then add it to `gitignore`.

![dashboard](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/dashboard.jpg)

### Step 2 - Creating a compose project
On your IDE, create an empty compose project and name it accordingly.

![new-project](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/new-project.png)

### Step 3 - Setting up the project
Add the following repository in the `settings.gradle` file:

```bash
repositories {
    ...

    maven { url 'https://jitpack.io' }
}
```

In the app-level `build.gradle`, add the following dependencies:

```bash
// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.0'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.6.0'

// Coroutine Lifecycle Scopes
implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.1"

//Dagger-Hilt
implementation "com.google.dagger:hilt-android:2.38.1"
kapt "com.google.dagger:hilt-android-compiler:2.37"
implementation "androidx.hilt:hilt-lifecycle-viewmodel:1.0.0-alpha03"
kapt "androidx.hilt:hilt-compiler:1.0.0"
implementation 'androidx.hilt:hilt-navigation-compose:1.0.0'

// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
implementation "com.squareup.okhttp3:okhttp:5.0.0-alpha.2"
implementation "com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.2"

// Timber
implementation 'com.jakewharton.timber:timber:5.0.1'

// Navigation
implementation 'io.github.raamcosta.compose-destinations:core:1.3.1-beta'
ksp 'io.github.raamcosta.compose-destinations:ksp:1.3.1-beta'

// Accompanist permissions
implementation "com.google.accompanist:accompanist-permissions:0.21.1-beta"
```

Don't forget to add the `Hilt` classpath and the plugin id:

```bash
dependencies {
    ...
    classpath('com.google.dagger:hilt-android-gradle-plugin:2.40.1')
}
```

```bash
plugins {
    ...
    id 'dagger.hilt.android.plugin'
}
```

Since the project will be using the MVVM pattern, it is good that you create packages as shown below:

![packages](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/packages.png)


### Step 4 - Getting access token
In the `model` package, create a data class to hold the token request:

```kotlin
data class TokenRequest(
    @SerializedName("room_id")
    val room_id: String,
    @SerializedName("user_id")
    val user_id: String,
    @SerializedName("role")
    val role: String = "guest",
)
```

Also, create another data class to hold the token response:

```kotlin
data class Token(
    @SerializedName("token")
    val token: String
)
```

Inside the `data` package, create a new `Interface` that contains the function to request the access token:

```kotlin
interface TokenApi {
    @POST("api/token")
    suspend fun requestAccessToken(@Body request: TokenRequest): Token
}
```

### Step 5 - Adding functions to the repository
In the `data` package, create a sub-directory and name it `repository`. Inside the package create `CallRepository`. We will inject the token API and 100ms HMS SDK with dagger hilt:

```kotlin
class CallRepository @Inject constructor(private val tokenApi: TokenApi, private val HmsSdk: HMSSDK) {
    val localMic: MutableState<Boolean> = mutableStateOf(true)
    ...
}
```

Inside the class, create a function to get the access token:

```kotlin
suspend fun getAccessToken(name: String, roomId: String = "622ff63144ae04b51cb01484") : Token {
    return tokenApi.requestAccessToken(
        TokenRequest(
            room_id = roomId,
            user_id = name,
            role = "guest"
        )
    )
}
```

Then let's define a function to join a video room where other peers are present and also a function to leave the room:

```kotlin
fun joinRoom(userName: String, authToken: String, updateListener: HMSUpdateListener) {
    val info = JsonObject().apply { addProperty("name", userName) }
    val config = HMSConfig(
        userName = userName,
        authtoken = authToken,
        metadata = info.toString()
    )
    HmsSdk.join(config, updateListener)
}

fun leaveRoom() {
    HmsSdk.leave()
}
```

For toggling the state of the microphone of the local peers, let's add the following functions:

```kotlin
fun setLocalAudioEnabled() {
    HmsSdk.getLocalPeer()?.audioTrack?.apply {
        setMute(!isLocalAudioEnabled())
    }
}

private fun isLocalAudioEnabled(): Boolean {
    val isAudioEnabled = HmsSdk.getLocalPeer()?.audioTrack?.isMute == true
    localMic.value = isAudioEnabled
    return isAudioEnabled
}
```

When it comes to toggling (turning on and off) the video of the local peer, define the following functions:

```kotlin
fun setLocalVideoEnabled() {
    HmsSdk.getLocalPeer()?.videoTrack?.apply {
        setMute(!isLocalVideoEnabled())
    }
}
   
private fun isLocalVideoEnabled(): Boolean {
    return HmsSdk.getLocalPeer()?.videoTrack?.isMute == true
}
```

Now we can create a function to help the user switch the camera (front and back):

```kotlin
fun switchCamera(){
    try {
        HmsSdk.getLocalPeer()?.videoTrack?.switchCamera()
    }catch (e: Exception){
        Timber.d("camera switch: ${e.message}")
    }
}
```

### Step 6 - Creating the ViewModel
In this step, we will create a `ViewModel` for calling the repository functions:

```kotlin
@HiltViewModel
class CallViewModel @Inject constructor(private val repository: CallRepository) : ViewModel() {

    private val _peers: MutableState<List<HMSPeer>> =
        mutableStateOf(emptyList(), neverEqualPolicy())
    val peers: State<List<HMSPeer>> = _peers

    val localMic: State<Boolean> = repository.localMic

    var loading = false

    fun leaveTheCall() {
        repository.leaveRoom()
    }

    fun switchCamera() {
        repository.switchCamera()
    }

    fun setLocalAudioEnabled() {
        repository.setLocalAudioEnabled()
    }

    fun setLocalVideoEnabled() {
        repository.setLocalVideoEnabled()
    }

    fun startMeeting(name: String) {
        loading = true
        viewModelScope.launch {
            val token = repository.getAccessToken(name).token

            repository.joinRoom(
                name, 
                token,
                object : HMSUpdateListener {
                    override fun onChangeTrackStateRequest(details: HMSChangeTrackStateRequest) {
                        Timber.d("onChangeTrackStateRequest")
                    }

                    override fun onError(error: HMSException) {
                        loading = false
                        Timber.d(error.message)
                    }

                    override fun onJoin(room: HMSRoom) {
                        loading = false
                        _peers.value = room.peerList.asList()
                    }

                    override fun onMessageReceived(message: HMSMessage) {
                        Timber.d(message.message)
                    }

                    override fun onPeerUpdate(type: HMSPeerUpdate, peer: HMSPeer) {
                        Timber.d("There was a peer update: $type")

                        // Handle peer updates
                        when (type) {
                            HMSPeerUpdate.PEER_JOINED -> _peers.value =
                                _peers.value.plus(peer)
                            HMSPeerUpdate.PEER_LEFT -> _peers.value =
                                _peers.value.filter { currentPeer -> currentPeer.peerID != peer.peerID }
                            HMSPeerUpdate.VIDEO_TOGGLED -> {
                                Timber.d("${peer.name} video toggled")
                            }
                        }
                    }

                    override fun onRoleChangeRequest(request: HMSRoleChangeRequest) {
                        Timber.d("Role change request")
                    }

                    override fun onRoomUpdate(type: HMSRoomUpdate, hmsRoom: HMSRoom) {
                        Timber.d("Room update")
                    }

                    override fun onTrackUpdate(
                        type: HMSTrackUpdate,
                        track: HMSTrack,
                        peer: HMSPeer
                    ) {
                        if (type == HMSTrackUpdate.TRACK_REMOVED) {
                            Timber.d("Checking, $type, $track")
                            if (track.type == HMSTrackType.VIDEO) {
                                _peers.value =
                                    _peers.value.filter { currentPeer -> currentPeer.peerID != peer.peerID }
                                        .plus(peer)
                            }
                        }
                    }
                })
        }
    }
}
```

### Step 7 - Dependency injection
We will be using Dagger Hilt for dependency injection. On your root package, create a new class that extends the `Application` class and add the `@HiltAndroidApp` annotation.

```kotlin
@HiltAndroidApp
class ConferencingApp : Application()
```

In your `AndroidManifest.xml` file, add the name of the class that you have created and add the following permissions:

```xml
<manifest
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>

    <application
        android:name=".ConferencingApp"
        ...

    </application>

</manifest>
```

In the `di` package, create an app module and provide the following dependencies:

```kotlin
@Provides
@Singleton
fun provideHMSSDK(context: Application) : HMSSDK{
    return HMSSDK.Builder(context).build()
}

@Provides
@Singleton
fun provideAPI() : TokenApi {
    return Retrofit.Builder()
        .baseUrl(TOKEN_ENDPOINT_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(TokenApi::class.java)
}

@Provides
@Singleton
fun provideCallRepository(hmsSdk: HMSSDK, api: TokenApi) : CallRepository{
    return CallRepository(
        tokenApi = api,
        HmsSdk = hmsSdk
    )
}
```

### Step 8 - Designing the user interface
Our `screens` package will contain all our user interfaces:

#### LoginScreen
Inside the package, create a new Kotlin file and name it `LoginScreen`. This screen will have a `TextField` where a user can enter their name that will be used in the call:

```kotlin
@Destination(start = true)
@Composable
fun LoginScreen(
    navigator: DestinationsNavigator
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(10.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Text(text = "Enter name in order to join the room")

        Spacer(modifier = Modifier.height(16.dp))

        var text by remember {
            mutableStateOf("")
        }
        TextField(
            modifier = Modifier.fillMaxWidth(),
            value = text,
            onValueChange = {
                text = it
            },
            label = {
                Text(text = "Enter name")
            },
            placeholder = {
                Text(text = "Doe John")
            }
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = {
                navigator.navigate(CallScreenDestination(text))
            },
            colors = ButtonDefaults.buttonColors(Purple200)
        ) {
            Text(
                modifier = Modifier
                    .padding(5.dp),
                text = "Join room",
                color = Color.White
            )
        }
    }
}
```

Still in the same package, create a new screen called `CallScreen`:

#### Person item composable
Inside the `CallScreen` file, create a `PersonItem` composable. This composable function will take in a `HMSPeer` and will display the video of the user.

```kotlin
@Composable
fun PersonItem(peer: HMSPeer) {
    var previousActivePeer by remember { mutableStateOf(peer) }
    var previousVideoTrack by remember { mutableStateOf<HMSVideoTrack?>(null) }

    Box {
        AndroidView(
            factory = { context ->
                SurfaceViewRenderer(context).apply {
                    setScalingType(RendererCommon.ScalingType.SCALE_ASPECT_FIT)
                    setEnableHardwareScaler(true)
                }
            },
            modifier = Modifier
                .size(Dp(160f), Dp(200f))
                .clip(RoundedCornerShape(8.dp)),
            update = {
                if (previousActivePeer.peerID != peer.peerID) {
                    if (previousVideoTrack != null) {
                        previousVideoTrack?.removeSink(it)
                        it.release()
                    }
                    previousActivePeer = peer
                }

                if (peer.videoTrack == null) {
                    Timber.d("Peer had no video")
                } else if (previousVideoTrack == null) {
                    it.init(SharedEglContext.context, null)
                    peer.videoTrack?.addSink(it)
                    previousVideoTrack = peer.videoTrack
                }
            }
        )
    }
}
```

#### Bottom buttons composable
Create another composable function that will have the switch camera, toggle video, toggle microphone, and the end call buttons:

```kotlin
@Composable
private fun CallBottomButtons(
    onSwitchCamera: () -> Unit = {},
    onTurnOffVideo: () -> Unit = {},
    onToggleMic: () -> Unit = {},
    onEndCall: () -> Unit = {},
    micOn: Boolean,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp),
        backgroundColor = Color.Transparent
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(5.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = {
                    onSwitchCamera()
                },
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(Color.LightGray.copy(alpha = 0.2f))
            ) {
                Icon(imageVector = Icons.Default.FlipCameraIos, contentDescription = null)
            }
            IconButton(
                onClick = {
                    onTurnOffVideo()
                },
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(Color.LightGray.copy(alpha = 0.2f))
            ) {
                Icon(imageVector = Icons.Default.VideocamOff, contentDescription = null)
            }
            IconButton(
                onClick = {
                    onToggleMic()
                    Timber.d("Mic state: Mic is $micOn")
                },
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(Color.LightGray.copy(alpha = 0.2f))
            ) {
                Icon(
                    imageVector = if (micOn) {
                        Icons.Default.Mic
                    } else {
                        Icons.Default.MicOff
                    },
                    contentDescription = null
                )
            }
            IconButton(
                onClick = {
                    onEndCall()
                },
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape)
                    .background(Color.Red)
            ) {
                Icon(
                    imageVector = Icons.Default.CallEnd,
                    tint = Color.White,
                    contentDescription = null
                )
            }
        }
    }
}
```

Finally, let's use these two composable functions that we have created inside the `CallScreen`:

```kotlin
@OptIn(ExperimentalFoundationApi::class)
@Destination
@Composable
fun CallScreen(
    name: String,
    navigator: DestinationsNavigator,
    viewModel: CallViewModel = hiltViewModel()
) {

    LaunchedEffect(Unit) {
        viewModel.startMeeting(name)
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {

        if (viewModel.loading) {
            CircularProgressIndicator(
                modifier = Modifier
                    .align(alignment = Alignment.Center)
                    .padding(12.dp)
            )
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .align(Alignment.TopStart),
        ) {
            val peers = viewModel.peers.value
            LazyVerticalGrid(
                cells = GridCells.Fixed(2),
                contentPadding = PaddingValues(7.dp)
            ) {
                items(peers) { peer ->
                    PersonItem(peer = peer)
                }
            }
        }

        CallBottomButtons(
            onSwitchCamera = {
                viewModel.switchCamera()
            },
            onTurnOffVideo = {
                viewModel.setLocalVideoEnabled()
            },
            onToggleMic = {
                viewModel.setLocalAudioEnabled()
            },
            onEndCall = {
                viewModel.leaveTheCall()
                navigator.navigate(LoginScreenDestination)
            },
            micOn = viewModel.localMic.value,
            modifier = Modifier
                .fillMaxWidth()
                .height(90.dp)
                .align(Alignment.BottomStart)
        )
    }
}
```

### Step 9 - Setting up navigation
Let us conclude by setting up navigation in `MainActivity`. Inside the `onCreate` function add the following code:

```kotlin
val navController = rememberNavController()
val navHostEngine = rememberNavHostEngine()

Scaffold(
    topBar = {
        TopAppBar(
            title = {
                Text(
                    "Video Conferencing App",
                    color = Color.White,
                )
            },
            backgroundColor = Purple700,
            elevation = 5.dp
        )
    }
) {
    DestinationsNavHost(
        navGraph = NavGraphs.root,
        navController = navController,
        engine = navHostEngine
    )
}
```

### Demo
When you run the app, your output should be as follows:

![demo1](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/demo1.png)

![demo2](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/demo2.png)

![demo3](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/demo3.png)

### Conclusion
In this tutorial, we have learned what is 100ms SDK and its pricing. We then went ahead and created a video conferencing app with the SDK. Please take a look at the final app in this Github repository - [Conferencing app demo](https://github.com/tomleposo/ConferencingAppDemo)

Happy coding!

### Further reading
- [100ms Android Docs](https://www.100ms.live/docs/android/v2/foundation/Basics)

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

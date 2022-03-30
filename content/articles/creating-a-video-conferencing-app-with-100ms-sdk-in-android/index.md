Video conferencing has become part of our daily lives as we all rely on it daily. Video conferencing is used in holding meetings, WhatsApp calls, and many more.

In this tutorial, we will use the 100ms Android SDK and Jetpack compose to create a video conferencing app.

### Table of content
- [Prerequisites](#prerequisites)
- [What is 100ms SDK?](#what-is-100ms-sdk?)
- [Definitions](#definitions)
- [Pricing](#pricing)
- [Creating an account on the 100ms SDK](#step-1---creating-an-account-on-the-100ms-sdk)
- [Creating a compose project](#step-2---creating-a-compose-project)
- [Setting up the project](#step-3---setting-up-the-project)
- [Getting access token](#step-4---getting-access-token)
- [Adding functions to the repository](#step-5---adding-functions-to-the-repository)
- [Viewmodel](#step-6---viewmodel)
- [Dependency injection](#step-7---dependency-injection)
- [Designing the user interfaces](#step-8---designing-the-user-interfaces)
- [Setting up navigation](#step-9---setting-up-navigation)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
To follow along with this tutorial, you should have:
- Using the MVVM pattern.
- Dependency injection with Dagger Hilt.
- Knowledge in using Jetpack compose in creating declarative UIs.
- Kotlin Coroutines.
- Making network calls with Retrofit.

### What is 100ms SDK?
100ms provides a video conferencing infrastructure that includes web and mobile SDKs for iOS and Android, allowing you to add live video and audio conferencing to your applications.

### Definitions
- Room - this is the object that holds peers who are in a call (audio or video).
- Peer - this is an object that contain the details of a person in a room.
- Track - audio or video content in the call.
- Roles - represents permissions for peers.

### Pricing
The platform gives you 10,000 FREE minutes every month.

#### Video and audio
Conferencing - $8 (HD)/ $4 (SD), recording -$20 (HD)/ $10 (SD) and RTMP Out -$24 (HD)/ $12 (SD)

#### Audio only
Conferencing - $1, recording -$3 and RTMP Out - $4

### Step 1 - Creating an account on the 100ms SDK
To use the 100ms SDK in our project, we first need to visit the offical[100ms Dashboard](https://dashboard.100ms.live/login) and sign up.

We then need to set up the account by:
- Choose a subdomain.

![subdomain](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/subdomain.png)

- Some details about usage and location.

![details](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/details.png)

- And finally, choose a template, and in this case, we will use video conferencing.

![template](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/template.png)

Once you get to your dashboard, you will be able to see the different credentials that we are going to use. Click on the developer option and copy the "Token endpoint" as we will be using it for our project. You can securely add the Url in your `gradle.properties` file and then add it to `gitignore`.

![dashboard](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/dashboard.png)

### Step 2 - Creating a compose project
Open your Android studio and create a new empty compose project.

![new-project](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/new-project.png)



As the project will be using the MVVM pattern, it is good that you create packages as shown below:

![packages](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/packages.png)

### Step 4 - Getting access token


Inside the 'data' package, create a new `Interface` which contains the function to request the access token.
```kotlin
interface TokenApi {
    @POST("api/token")
    suspend fun requestAccessToken(@Body request: TokenRequest): Token
}
```

### Step 5 - Adding functions to the repository
In the 'data' package, create a sub-directory and name it 'repository'. Inside the package create `CallRepository`. We will inject the token APi and 100ms HMSSDK with dagger hilt. 
```kotlin
class CallRepository @Inject constructor(private val tokenApi: TokenApi, private val HmsSdk: HMSSDK) {
    val localMic: MutableState<Boolean> = mutableStateOf(true)
    ...
}

Inside the class, create a function to get the access token
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


For toggling the state of the microphone of the local peers, let's add the following functions to the class.
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

Then when it comes to toggling (turning on and off) the video of the local peer, define the following functions
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

Finally, lets create a function to help the user switch the camera (front and back)
```kotlin
fun switchCamera(){
    try {
        HmsSdk.getLocalPeer()?.videoTrack?.switchCamera()
    }catch (e: Exception){
        Timber.d("camera switch: ${e.message}")
    }
}
```

### Step 6 - Viewmodel
In this step, we will create a `ViewModel` for calling the repository functions.

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


}
```

### Step 7 - Dependency injection
We will be using Dagger Hilt for dependency injection. On your root package, create a new class that extends the `Application` class and add the `@HiltAndroidApp` annotation.

```kotlin
@HiltAndroidApp
class ConferencingApp : Application()
```

In your `AndroidManifest.xml` file and the name of the class that you have created and also add the following permissions:

```manifest
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

In the 'di' package, create an app module and provide the following dependencies:

```kotlin
@Provides
@Singleton
fun provideHMSSDK(context: Application) : HMSSDK{
    return HMSSDK.Builder(context)
        .build()
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

### Step 8 - Designing the user interfaces
Our 'screens' package will contain all our user interfaces:

#### LoginScreen
Inside the package, create a new Kotlin file and name it `LoginScreen`. This screen will have a `TextField` that a user can enter their name that they will use the call.
```kotlin
@Destination(start = true)
@Composable
fun LoginScreen(
    navigator: DestinationsNavigator
) {
    Column(

    ) {

        Text(text = "Enter name in order to join the room")

        Spacer(modifier = Modifier.height(8.dp))

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
            modifier = Modifier
                .fillMaxWidth(),
            onClick = {
                navigator.navigate(CallScreenDestination(text))
            },
            colors = ButtonDefaults.buttonColors(Purple200)
        ) {
            Text(
                modifier = Modifier
                    .padding(5.dp),
                text = "Join room",
            )
        }
    }
}
```

Still in the same package, create a new screen called `CallScreen`. 

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



Finally, let's use these two composables functions that we have created inside the `CallScreen`.

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
Finally, let us conclude by setting up navigation in `MainActivity`. Inside the `onCreate` function add the following code. 

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

> Don't forget to include code to request the audio and camera permissions.

### Demo
When you finally run the app, your output should be as follows:

![demo1](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/demo1.png)

![demo1](/engineering-education/creating-a-video-conferencing-app-with-100ms-sdk-in-android/demo1.png)

### Conclusion
In this tutorial, we have learned what is 100ms SDK and its pricing. We then went ahead and created a video conferencing app with the SDK. Please take a look at the final app in this Github repository - [Conferencing app demo](https://github.com/tomleposo/ConferencingAppDemo)

### Further reading
- [100ms Android Docs](https://www.100ms.live/docs/android/v2/foundation/Basics)

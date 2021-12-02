### Creating a One-to-One Video Call Android App with Agora SDK with Kotlin  
When developing a social app that has a video calling feature, a developer may require coming up with a lot of boilerplate code to achieve this. But with Agora, they got you covered. Agora is a platform for video, audio, and live interactive streaming that enables developers to create rich in-app experiences such as embedded voice and video chat, real-time recording, interactive live streaming, and real-time messaging. 

### Table of Contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Agora Video Call SDK](#what-is-agora-video-call-sdk)
- [Creating a Project on the Agora Dashboard](#step-1---creating-a-project-on-the-agora-dashboard)
- [Creating an Android Prjoect](#step-2---create-an-android-project)
- [Setting Up the Project](#step-3---setting-up-the-project)
- [Designing the User Interface](#step-4---designing-the-user-interface)
- [Working on the MainActivity](#step-5---working-on-the-mainactivity)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, you should have:
- Installed [Android Studio](https://developer.android.com/studio/index.html) on your system.
- Solid understanding of designing and operating Android applications.
- Fundamental knowledge of the [Kotlin](https://kotlinlang.org/) programming language.
- Have an Agora account; if you don't already have one, [Sign Up](https://www.agora.io/en/) to get started.
- Experience with Android ViewBinding. 

### Goals
You should be able to grasp the following after this tutorial: 
- What is Agora Video Call SDK?
- How to Create and get Access Key for Agora SDK
- Implementing the SDK for a One-to-One Video call app.

### What is Agora Video Call SDK
The video SDK from Agora makes it simple to integrate real-time video conversations into web, mobile, and native apps.

Agora's Video Call APIs may enhance social apps with new features like AR facial masks and sound effects, while screen sharing, whiteboards, and other capabilities may benefit commercial and educational apps.

In this article, we will use the SDK to add video calling capabilities to an Android app. 

### Creating a Project on the Agora Dashboard
![New Agora App](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/new_agora_project.png)
Choose a use case that will suit you in your app i.e education, social, entertainment

Once you have created, on your console, you will be able to see the newly created project, click on the edit pen so that we can generate a temporary token that we will use in our demo app.

![Edit Agora App](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/welcome_edit.png)

Scroll to the bottom of the page and select generate temporary tokens for audio/video call

![Token Page](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/temp_token.png)

Enter the channel name and click on generate temp token

![Generate Token](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/generate_token.png)

Take note of the `APP ID`, `Channel Name`, and your `Temp Token`

![Generated Token](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/generated_token.png)

### Step 1 - Creating an Android Project
Open your Android Studio and create an empty project

![Android App](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/android_studio_project.png)

### Step 2 - Setting Up the Project
In your app-level `build.gradle` add the following dependency

```Gradle
dependecies{
    ...
    
    implementation 'io.agora.rtc:full-sdk:3.1.3'
}
```

In your `Manifest` file, add the following permissions
- INTERNET
- READ_PHONE_STATE
- RECORD_AUDIO
- MODIFY_AUDIO_SETTINGS
- CAMERA

> To prevent code obfuscation in your `proguard-rules.pro` add the following code: 
```
-keep class io.agora.**{*;}
```

In your `res` directory open `values` and then strings and then include your `APP_ID` and the `TEMP_TOKEN`

```Xml
<resources>
    ...
    
    <string name="app_id">APP_ID</string>
    <string name="agora_token">TEMP_TOKEN</string>
</resources>
```

### Step 3 - Designing the User Interface
In this step, we will create a simple layout that will have a `FrameLayout` to show the video of you and another `RelativeLayout` for the video of the other person, also well have some `ImageViews` for muting the microphone, ending a call or calling, and for switching the camera.

```Xml
<?xml version="1.0" encoding="UTF-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main_chat_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <RelativeLayout
        android:id="@+id/remoteVideoView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/remoteBackground">

        <ImageView
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:layout_centerInParent="true"
            android:scaleType="centerCrop"
            android:src="@drawable/icon_agora_largest"
            tools:ignore="ContentDescription" />
    </RelativeLayout>

    <FrameLayout
        android:id="@+id/localVideoView"
        android:layout_width="100dp"
        android:layout_height="150dp"
        android:layout_alignParentEnd="true"
        android:layout_marginTop="24dp"
        android:layout_marginEnd="24dp"
        android:background="@color/localBackground"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <ImageView
            android:layout_width="40dp"
            android:layout_height="40dp"
            android:layout_gravity="center"
            android:scaleType="centerCrop"
            android:src="@drawable/icon_agora_large"
            tools:ignore="ContentDescription" />
    </FrameLayout>

    <RelativeLayout
        android:id="@+id/controls"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="24dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent">

        <ImageView
            android:id="@+id/buttonCall"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_centerHorizontal="true"
            android:layout_centerVertical="true"
            android:scaleType="centerCrop"
            android:src="@drawable/btn_endcall"
            tools:ignore="ContentDescription" />

        <ImageView
            android:id="@+id/buttonMute"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_centerVertical="true"
            android:layout_marginEnd="30dp"
            android:layout_toStartOf="@id/buttonCall"
            android:scaleType="centerCrop"
            android:src="@drawable/btn_unmute"
            tools:ignore="ContentDescription" />

        <ImageView
            android:id="@+id/buttonSwitchCamera"
            android:layout_width="50dp"
            android:layout_height="50dp"
            android:layout_centerVertical="true"
            android:layout_marginStart="30dp"
            android:layout_toEndOf="@id/buttonCall"
            android:scaleType="centerCrop"
            android:src="@drawable/btn_switch_camera"
            tools:ignore="ContentDescription" />

    </RelativeLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

> Make sure you have the required icons

### Step 4 - Working on MainActivity

#### Declarations
```kotlin
private val PERMISSION_REQUEST_ID = 7

// Ask for Android device permissions at runtime.
private val ALL_REQUESTED_PERMISSIONS = arrayOf(
    Manifest.permission.RECORD_AUDIO,
    Manifest.permission.CAMERA,
    Manifest.permission.READ_PHONE_STATE
)

private var mEndCall = false
private var mMuted = false
private var remoteView: SurfaceView? = null
private var localView: SurfaceView? = null
private lateinit var rtcEngine: RtcEngine
```

#### Initialize the RtcEngine object.
Create this method which will initialize the Agora RtcEngine

```kotlin
private fun initRtcEngine() {
    try {
        rtcEngine = RtcEngine.create(baseContext, getString(R.string.app_id), mRtcEventHandler)
    } catch (e: Exception) {
        Log.d(TAG, "initRtcEngine: $e")
    }
}
```

#### Setup the Video Configurations
```kotlin
private fun setupVideoConfig() {

    rtcEngine.enableVideo()

    rtcEngine.setVideoEncoderConfiguration(
        VideoEncoderConfiguration(
            VideoEncoderConfiguration.VD_640x360,
            VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_15,
            VideoEncoderConfiguration.STANDARD_BITRATE,
            VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_FIXED_PORTRAIT
        )
    )
}
```

#### Setup Local Video and Remote Video
In this step, we will setup the local video and the remote video that the current user will be viewing.
```kotlin
private fun setupLocalVideoView() {
    localView = RtcEngine.CreateRendererView(baseContext)
    localView!!.setZOrderMediaOverlay(true)
    binding.localVideoView.addView(localView)
    rtcEngine.setupLocalVideo(VideoCanvas(localView, VideoCanvas.RENDER_MODE_HIDDEN, 0))
}


private fun setupRemoteVideoView(uid: Int) {
    if (binding.remoteVideoView.childCount > 1) {
        return
    }
    remoteView = RtcEngine.CreateRendererView(baseContext)
    binding.remoteVideoView.addView(remoteView)
    rtcEngine.setupRemoteVideo(VideoCanvas(remoteView, VideoCanvas.RENDER_MODE_FILL, uid))
}
```

#### Joining a Channel
After setting up the local video, the current user needs to join a channel
```kotlin
private fun joinChannel() {
    val token = getString(R.string.agora_token)
    // Join a channel with a token.
    rtcEngine.joinChannel(token, "ChannelOne", "Extra Optional Data", 0)
}
```

> Make sure, your `R.string.agora_token` points to the token that you obtained from the Agora Console

> Also make sure that the Channel name resembles the one that you input when creating the temporary token.

#### Leaving a Channel
```kotlin
private fun leaveChannel() {
    rtcEngine.leaveChannel()
}
```

#### Initializing the Agora Engine and Joining a Channel
Create this method that will combine the three method methods that we have just created. 

> These are our usual steps for joining a channel and starting a call.

```kotlin
private fun initAndJoinChannel() {
    initRtcEngine()
    setupVideoConfig()
    setupLocalVideoView()
    joinChannel()
}
```

#### Permissions
Declare this method, which will assist us in determining if permissions have been granted. 
```kotlin
private fun checkSelfPermission(permission: String, requestCode: Int): Boolean {
    if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {

        ActivityCompat.requestPermissions(this, ALL_REQUESTED_PERMISSIONS, requestCode)
        return false
    }
    return true
}
```

Check whether all permissions are given inside the `onCreate` procedure, then run the `initAgoraEngineAndJoinChannel` method. 

```kotlin
if (checkSelfPermission(ALL_REQUESTED_PERMISSIONS[0], PERMISSION_REQUEST_ID) &&
    checkSelfPermission(ALL_REQUESTED_PERMISSIONS[1], PERMISSION_REQUEST_ID
    ) && checkSelfPermission(ALL_REQUESTED_PERMISSIONS[2], PERMISSION_REQUEST_ID)) {
    initAgoraEngineAndJoinChannel()
}
```

Also, don't forget to override the `onRequestPermissionsResult` which checks if the requested permissions were granted.
```kotlin
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)

    if (requestCode == PERMISSION_REQUEST_ID) {
        if (
            grantResults[0] != PackageManager.PERMISSION_GRANTED ||
            grantResults[1] != PackageManager.PERMISSION_GRANTED ||
            grantResults[2] != PackageManager.PERMISSION_GRANTED
        ) {

            Toast.makeText(applicationContext, "Permissions needed", Toast.LENGTH_LONG).show()
            finish()
            return
        }
        // Here we continue only if all permissions are granted.

        initAgoraEngineAndJoinChannel()
    }
}
```

#### Removing Remote View and Local Video
```kotlin
private fun removeRemoteVideo() {
    if (remoteView != null) {
        binding.remoteVideoView.removeView(remoteView)
    }
    remoteView = null
}

private fun removeLocalVideo() {
    if (localView != null) {
        binding.localVideoView.removeView(localView)
    }
    localView = null
}
```

When a remote user leaves the channel, we need to remove the remote view by calling the `removeRemoteVideo` method

```kotlin
private fun onRemoteUserLeft() {
    removeRemoteVideo()
}
```

#### Handling Rtc Engine Events
Next, we need to handle some events of the `RtcEngine` such as when someone joins a channel successfully, when the first remote video is decoded and when the user is offline. Create a `RtcEventHandler` object and implement the necessary method.

```kotlin
private val mRtcEventHandler = object : IRtcEngineEventHandler() {
    override fun onJoinChannelSuccess(channel: String?, uid: Int, elapsed: Int) {
        runOnUiThread {
            Toast.makeText(applicationContext, "Joined Channel Successfully", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onFirstRemoteVideoDecoded(uid: Int, width: Int, height: Int, elapsed: Int) {
        runOnUiThread {
            setupRemoteVideo(uid)
        }
    }

    override fun onUserOffline(uid: Int, reason: Int) {
        runOnUiThread {
            onRemoteUserLeft()
        }
    }
}
```

#### Starting and Ending a Call
To start the call, we need to set up a local video view and join a channel

```kotlin
private fun startCall() {
    setupLocalVideo()
    joinChannel()
}

```

To end the call, we need to remove the local and remote video and also leave the channel.

```kotlin
private fun endCall() {
    removeLocalVideo()
    removeRemoteVideo()
    leaveChannel()
}

```


Inside the `onCreate` method, we need to implement clicks such as when the following `Views` are clicked
- Call Button
- Mute Button
- Switch Camera Button

Add the following implementation

```kotlin
binding.buttonCall.setOnClickListener {
    if (mEndCall) {
        startCall()
        mEndCall = false
        binding.buttonCall.setImageResource(R.drawable.btn_endcall)
        binding.buttonMute.visibility = VISIBLE
        binding.buttonSwitchCamera.visibility = VISIBLE
    } else {
        endCall()
        mEndCall = true
        binding.buttonCall.setImageResource(R.drawable.btn_startcall)
        binding.buttonMute.visibility = INVISIBLE
        binding.buttonSwitchCamera.visibility = INVISIBLE
    }
}

binding.buttonSwitchCamera.setOnClickListener {
    rtcEngine.switchCamera()
}

binding.buttonMute.setOnClickListener {
    mMuted = !mMuted
    rtcEngine.muteLocalAudioStream(mMuted)
    val res: Int = if (mMuted) {
        R.drawable.btn_mute
    } else {
        R.drawable.btn_unmute
    }

    binding.buttonMute.setImageResource(res)
}
```

#### Destroying Everything
We also need to release resources when the app is closed and is no longer being used. Override the `onDestroy` and the following code.

```kotlin
override fun onDestroy() {
    super.onDestroy()
    if (!mEndCall) {
        leaveChannel()
    }
    RtcEngine.destroy()
}
```

### Demo

![Demo1](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/demo1.png)

![Demo2](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/demo2.png)

![Demo3](engineering-education/creating-a-one-to-one-video-call-android-app-with-agora-sdk-with-kotlin/demo3.png)


### Conclusion
In this tutorial, we have gone through Agora Video SDK, how to create and obtain an access token from the Agora Console. We have finally created a simple one-to-one video call app. Go ahead and apply what you have learned and create more advanced apps with video call capabilities. To check the full implementation of the app, check out this Github repository [AgoraVideoCallDemo](https://github.com/sheecodes/AgoraVideoCallDemo).

### Reference
- [Agora SDK Documentation](https://docs.agora.io/en)
- [Agora Video Call](https://docs.agora.io/en/Video/API%20Reference/java/index.html)

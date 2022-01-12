---
layout: engineering-education
status: publish
published: true
url: /creating-a-video-call-app-with-agora-sdk/
title: Creating a One-to-One Video Call Android app with Agora SDK using Kotlin
description: This tutorial walks the reader through the process of creating a one-to-one video call app with Agora SDK.
author: joyce-wanjiru
date: 2021-12-03T00:00:00-09:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-video-call-app-with-agora-sdk/hero.png
    alt: Creating a Video Call app with Agora SDK Hero Image
---
When developing an Android app that incorporates video calling features, you may end up with a lot of boilerplate code.
<!--more-->
Agora SDK is a platform that allows developers to create rich in-app experiences such as embedded voice and video chat, real-time recording, live streaming, and real-time messaging with relatively less code.

### Table of contents
- [Prerequisites](#prerequisites)
- [Goals](#goals)
- [What is Agora Video Call SDK?](#what-is-agora-video-call-sdk)
- [Creating a Project on the Agora Dashboard](#creating-a-project-on-the-agora-dashboard)
- [Creating an Android Project](#creating-an-android-project)
- [Setting Up the Project](#setting-up-the-project)
- [Designing the User Interface](#designing-the-user-interface)
- [Creating the app logic](#creating-the-app-logic)
- [Demo](#app-demo)
- [Conclusion](#conclusion)
- [References](#reference)

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [Android Studio](https://developer.android.com/studio/index.html) installed on your machine.
- A solid understanding of developing and running Android applications.
- Fundamental knowledge of the [Kotlin](https://kotlinlang.org/) programming language.
- An Agora account. If you don't have one yet, [sign up](https://www.agora.io/en/) to get started.
- Experience with Android `ViewBinding`.

### Goals
By the end of this tutorial, you will be able to:
- Understand what Agora video call SDK is.
- Create and get the `access key` for Agora SDK.
- Implement the SDK in a one-to-one video call app.

### What is Agora Video Call SDK?
Agora video call SDK is a platform that allows developers to create rich in-app experiences such as embedded voice and video chat, real-time recording, live streaming, and real-time messaging.

Agora's video call APIs enhance social apps with new features like AR facial masks and sound effects when sharing your screen, whiteboards, and other capabilities that may benefit commercial and educational apps.

In this tutorial, we will use the SDK to add video calling capabilities in an Android app. 

### Creating a project on the Agora dashboard
Open the [Agora developer console](https://console.agora.io/) and create a new project as shown below:

![New Agora App](/engineering-education/creating-a-video-call-app-with-agora-sdk/new_agora_project.png)

Choose a use case that suits your app i.e education, social, entertainment, etc. Once you have created the project, you'll be able to see it in your console. Click on the edit button to generate a temporary token that you'll use in your app.

![Edit Agora App](/engineering-education/creating-a-video-call-app-with-agora-sdk/welcome_edit.png)

Scroll to the bottom of the page and select generate temporary tokens for audio/video calls.

![Token Page](/engineering-education/creating-a-video-call-app-with-agora-sdk/temp_token.png)

Enter the channel name and click on generate temp token.

![Generate Token](/engineering-education/creating-a-video-call-app-with-agora-sdk/generate_token.png)

> Take note of the `APP ID`, `Channel Name`, and your `Temp Token`. They will be required in the next steps.

![Generated Token](/engineering-education/creating-a-video-call-app-with-agora-sdk/generated_token.png)

### Creating an Android project
Open your Android Studio and create an empty project and give it a name of your choice.

![Android App](/engineering-education/creating-a-video-call-app-with-agora-sdk/android_studio_project.png)

### Setting up the project
In your app-level `build.gradle` file, add the following dependency:

```gradle
dependencies{
    ...
    
    implementation 'io.agora.rtc:full-sdk:3.1.3'
}
```

In your `Manifest` file, add the following permissions:
- INTERNET
- READ_PHONE_STATE
- RECORD_AUDIO
- MODIFY_AUDIO_SETTINGS and
- CAMERA

> To prevent code obfuscation in your `proguard-rules.pro`, add the following code:

```gradle
-keep class io.agora.**{*;}
```

In your `res` directory, open `values` >> `strings` and include your `APP_ID` and the `TEMP_TOKEN`.

```xml
<resources>
    ...
    
    <string name="app_id">APP_ID</string>
    <string name="agora_token">TEMP_TOKEN</string>
</resources>
```

> Make sure your `agora_token` points to the token that you obtained from the Agora console.

### Designing the user interface
In this step, we will create a simple layout that will have a `FrameLayout` to show the video of you and a `RelativeLayout` for the video of the other person. We'll also have some `ImageViews` (used as buttons) when muting the microphone, initiating or ending a call, and switching the camera.

```xml
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

> Remember to add the required icons from the resource manager.

### Creating the app logic
#### Declarations
In your `MainActivity.kt` file, add the following declarations:

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

#### Initialize the RtcEngine object
Create this method which will initialize the Agora RtcEngine. RtcEngine is the core class of the Agora SDK.

```kotlin
private fun initRtcEngine() {
    try {
        rtcEngine = RtcEngine.create(baseContext, getString(R.string.app_id), mRtcEventHandler)
    } catch (e: Exception) {
        Log.d(TAG, "initRtcEngine: $e")
    }
}
```

#### Setting up the video configurations

```kotlin
private fun setupVideoConfig() {

    rtcEngine.enableVideo()
    // Set the video encoding profile.
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

#### Setting up Local and Remote video
In this step, we will set up the local video and the remote video that the current user will be viewing.

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

#### Joining a channel
After setting up the local video, the current user needs to join a channel to start receiving remote video streams.

```kotlin
private fun joinChannel() {
    val token = getString(R.string.agora_token)
    // Join a channel with a token.
    rtcEngine.joinChannel(token, "ChannelOne", "Extra Optional Data", 0)
}
```

> Make sure that the channel name resembles the one you entered when creating the temporary token.

#### Leaving a channel
```kotlin
private fun leaveChannel() {
    rtcEngine.leaveChannel()
}
```

#### Initializing the Agora engine and joining a channel
Create this function that will combine the three functions that we have just created.

> These are the usual steps when joining a channel and starting a call.

```kotlin
private fun initAndJoinChannel() {
    initRtcEngine()
    setupVideoConfig()
    setupLocalVideoView()
    joinChannel()
}
```

#### Permissions
Declare this method, which will help us to determine whether or not the required permissions have been granted by the user.

```kotlin
private fun checkSelfPermission(permission: String, requestCode: Int): Boolean {
    if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {

        ActivityCompat.requestPermissions(this, ALL_REQUESTED_PERMISSIONS, requestCode)
        return false
    }
    return true
}
```

Check whether all permissions are granted in the `onCreate` method, then call the `initAgoraEngineAndJoinChannel` function.

```kotlin
if (checkSelfPermission(ALL_REQUESTED_PERMISSIONS[0], PERMISSION_REQUEST_ID) &&
    checkSelfPermission(ALL_REQUESTED_PERMISSIONS[1], PERMISSION_REQUEST_ID
    ) && checkSelfPermission(ALL_REQUESTED_PERMISSIONS[2], PERMISSION_REQUEST_ID)) {
    initAgoraEngineAndJoinChannel()
}
```

Also, don't forget to override the `onRequestPermissionsResult` which checks the result of the permission request.

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

#### Removing remote view and local video
In this step, we will remove the remote video and the local video that the current user is viewing.

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

When a remote user leaves the channel, we need to remove the remote view by calling the `removeRemoteVideo` method:

```kotlin
private fun onRemoteUserLeft() {
    removeRemoteVideo()
}
```

#### Handling RtcEngine events
Next, we need to handle some events of the `RtcEngine` such that when someone joins a channel successfully, when the first remote video is decoded and when the user is offline.

Create a `RtcEventHandler` object and implement the necessary methods as follows:

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

#### Starting and ending a call
To start the call, we need to set up a local video view and join a channel.

```kotlin
private fun startCall() {
    setupLocalVideo()
    joinChannel()
}
```

To end the call, we need to remove the local and remote video and leave the channel.

```kotlin
private fun endCall() {
    removeLocalVideo()
    removeRemoteVideo()
    leaveChannel()
}
```

Inside the `onCreate` method, we need to implement clicks such as when the following `Views` are clicked:
- Call Button
- Mute Button
- Switch Camera Button

Add the following implementation:

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

#### Destroying everything
We also need to release resources when the app is closed and is no longer being used. Override the `onDestroy` and the following code:

```kotlin
override fun onDestroy() {
    super.onDestroy()
    if (!mEndCall) {
        leaveChannel()
    }
    RtcEngine.destroy()
}
```

### App demo
Install and run the app on two different devices and make sure that they are connected to the internet. You should expect it to work as shown in the screenshots below:

![Screen 1](/engineering-education/creating-a-video-call-app-with-agora-sdk/demo1.png)

![Screen 2](/engineering-education/creating-a-video-call-app-with-agora-sdk/demo2.png)

![Screen 3](/engineering-education/creating-a-video-call-app-with-agora-sdk/demo3.png)

### Conclusion
In this tutorial, we have learned what Agora video SDK is, how to obtain an access token from the Agora console, and how to create a video call app with the Agora SDK.

Go ahead and apply these skills to create even more advanced apps.

To see the full implementation of the app, check out [this GitHub repository](https://github.com/sheecodes/AgoraVideoCallDemo).

### References
- [Agora SDK Documentation](https://docs.agora.io/en)
- [Agora Video Call](https://docs.agora.io/en/Video/API%20Reference/java/index.html)

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)

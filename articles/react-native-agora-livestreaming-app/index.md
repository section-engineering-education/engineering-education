---
layout: engineering-education
status: publish
published: true
url: /engineering-education/react-native-agora-livestreaming-app/
title: React Native Livestream Application using Agora
description: This tutorial will give readers a detailed guide on how they can build or join a live stream using Agora.
author: mohan-raj
date: 2020-11-19T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-agora-livestreaming-app/hero.jpg
    alt: Python example image PyPi
---
Want to learn how to build a cool and simple Livestreaming app using React Native? In this tutorial we will do so using [Agora](https://www.agora.io/en/about-us/) is a video, voice and live interactive streaming platform. It includes embedded voice and video chat, real-time recording, interactive live streaming, and real-time messaging.
<!--more-->
Keep reading to find out.

### Goals
By the end of this tutorial, you’ll understand

- How to create/join a live stream using Agora.

- How to share a room code for others to join the live stream.

- How to add event listeners on the live stream to listen to various state changes.

### Prerequisites
This article will not cover tutorial aspects of how React/ React Native works. If you don't know how to work with it, please refer to [some tutorials](https://daveceddia.com/react-getting-started-tutorial/) before beginning with this project.

### Agora
Agora provides the building blocks for a wide range of real-time engagement possibilities. Agora is a paid service, but don’t worry. The first 10,000 minutes are free every month. You can check their pricing [here](https://www.agora.io/en/pricing/).

Using Agora, we can develop a variety of applications that need real-time engagement.

Some examples include:
- Audio/Video calls

- Interactive Livestreaming (Audio/ Video)

- Interactive Gaming

- Real-Time Messaging (which is in BETA at the time of writing this article)

In this article, we will focus on building a Livestreaming App using Agora.

[Documentation for React Native Agora](https://docs.agora.io/en/Video/API%20Reference/react_native/index.html)

### Overview
We will be going through these steps in this article:

1. Creating an Agora account
2. Development environment
3. Clone the starter code
4. Installing dependencies
5. Pass channel ID while navigating
6. Setting up the live screen
7. Extra deatures
8. Recap

> If you want to take a look at the final code, check out the [GitHub Repo](https://github.com/zolomohan/react-native-agora-livestreaming-app). I've made a commit for every step in this tutorial.

### Creating an Agora account
Head to Agora and create an account. You can reach the signup page from [here](https://sso.agora.io/en/v2/signup).

Fill in the details and create an account or you can signup with Google, GitHub, or Cocos. Once you've signed up, you'll see the dashboard.

![Agora Dashboard](/engineering-education/react-native-agora-livestreaming-app/agora_dashboard.png)

Click on New Project.

You'll see this model. Fill out the Project Name and set the Authentication Mechanism to Testing, for now.

![Agora New Project Dashboard](/engineering-education/react-native-agora-livestreaming-app/agora_new_project.png)

Once you hit on submit, it'll create a new project and you should see it on the Project Management Console.

![Agora Project Management Console](/engineering-education/react-native-agora-livestreaming-app/agora_project_management_console.png)

Now, click on the closed eye icon near the App ID to reveal it and copy that App ID. We'll be needing this later while setting up Agora in our app.

### Development environment
> **IMPORTANT** - We will not be using Expo in our project. Agora's React Native SDK does NOT work with expo managed workflow. This is because video calling SDKs need native modules that are not supported by Expo.

You can follow [this](https://reactnative.dev/docs/environment-setup) documentation to set up the React Native CLI environment.

### Clone the starter code
To focus more on the Livestream, I've prepared a starter code. You can clone it [from this repository](https://github.com/zolomohan/react-native-agora-app-starter) on GitHub. Follow the Repository's README for instructions.

In the starter code, the Navigation is set up with the Home screen and a dummy Live Screen. You can find the documentation for the React Native Navigation [here](https://reactnavigation.org/docs/getting-started).

The Home Screen has 2 buttons, Start and Join. The Join button has a text input associated with it to provide the channel ID to join the stream.

This is the Home Screen you'll see when you open the app.

![Homescreen](/engineering-education/react-native-agora-livestreaming-app/homescreen.jpeg)

### Installing Dependencies
You can install these beforehand, or install them while going through the article.

```json
"react": "16.13.1",
"react-native": "0.63.3",
"react-native-agora": "^3.1.3",
"uuid": "^8.3.1"
"react-native-get-random-values": "^1.5.0",
"@react-navigation/native": "^5.8.6",
"@react-navigation/stack": "^5.12.3",
"react-native-screens": "^2.13.0",
"react-native-reanimated": "^1.13.1",
"react-native-gesture-handler": "^1.8.0",
"react-native-safe-area-context": "^3.1.8",
"@react-native-community/masked-view": "^0.1.10",
```

To install a dependency, run:

```bash
npm i --save <package-name>
```

After installing the packages, for iOS, go into your `ios/` directory, and run:

```bash
pod install
```

> **IMPORTANT FOR ANDROID**
>
> As you add more native dependencies to your project, it may bump you over the 64k method limit on the Android build system. Once you reach this limit, you will start to see the following error while attempting to build your Android application.
>
> `Execution failed for task ':app:mergeDexDebug'.`
>
> Use [this documentation](https://rnfirebase.io/enabling-multidex) to enable mulitdexing.
> To learn more about multidex, view the official [Android documentation](https://developer.android.com/studio/build/multidex#mdex-gradle).

### Pass channel ID while navigating
When we create or join a live stream, we need to give a channel ID to Agora.

For a new live stream, we'll generate a new channel ID. To join a live stream, we'll use the channel ID from the text input.

We need to pass the channel ID from the Home Screen to the Live Screen. We can pass it as a route prop to the Live Screen.

Let's install the UUID package to generate a UUID.

```bash
npm install uuid
```

In React Native, you will run into an error with the message `crypto.getRandomValues() is not supported` when you use `uuid`.

To fix this, you will need to install `react-native-get-random-values`.

Let's install the react-native-get-random-values package to fix the issue.

```bash
npm install react-native-get-random-values
```

In `screens/Home.js`, import both of those packages.

> We must import the `react-native-get-random-values` before the `uuid` import to avoid the error.

```javascript
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
```

In the `createLive` function, we'll generate a new UUID and pass it as a route prop for the Channel ID.

In the `joinLive` function, we'll pass the text input's value for the Channel ID.

```javascript
const createLive = () => navigation.navigate("Live", { type: "create", channel: uuid() });
const joinLive = () => navigation.navigate("Live", { type: "join", channel: joinChannel });
```

Notice that we are also passing a route prop called `type` along with the channel? We'll be using this to determine whether the user is a broadcaster or an audience on the Livestream page.

When you press these buttons, it should be the same as before. But, we can access the `channel` route prop in the Live Screen.

### Setting up the live screen
To use Agora, we need to install `react-native-agora` first.

Let's install it using the snippets below.

```bash
npm install react-native-agora
```

For iOS, Run

```bash
pod install
```

#### Creating the Agora engine instance
Let's open the `screens/Live.js`.

In here, we need to import the `RtcEngine` from `react-native-agora`.

```JavaScript
import RtcEngine from "react-native-agora";
```

RtcEngine has a function called `create` on it, that will create an Agora engine. We need to call that function when the component mounts. It returns an engine instance that has various functions on it that we will use later.

> Do not forget to destroy this instance on component unmount.

We can't create a normal variable in the function's scope and assign the engine's instance to it. This is because we will lose the instance on a component re-render. So, we need to create a ref using useRef() and assign the engine instance to it.

So let's import `useEffect` and `useRef` from `React`.

```JavaScript
import React, { useEffect, useRef } from "react";
```

`RtcEngine.create('Your App ID Here')` takes one argument, that is the App ID that we copied from the Agora Project Management Console.

It's an async function, and we need to assign the returned object to the ref created using useRef().

You can't pass an async function to an useEffect. So, let's create an async function called `init()` and then call it in the `useEffect()`.

```JavaScript
export default function Live(props) {
  const AgoraEngine = useRef();

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create("Your App ID Here");
  };

  useEffect(() => {
    init();
  }, []);

  // Rest of the Code
}
```

We need to destroy the Agora engine instance when the component unmounts. If you forget to do this, the App may still be transmitting and receiving video and audio in the background.

```JavaScript
useEffect(() => {
  init();
  return () => {
    AgoraEngine.current.destroy();
  };
}, []);
```

#### Enable video transmission
Next, we need to enable video in the engine to send and receive Video. The Agora engine instance has a method called `enableVideo` on it. But before we call that method, we need to get permissions from Android to access the camera and microphone.

Let's write a function to get these permissions.

```JavaScript
import { PermissionsAndroid } from "react-native";

async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the cameras & mic");
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
```

Now, we need to call this in our `useEffect()` before `init()`.

This step is only for `android`, not for `iOS`.

```JavaScript
import { Platform } from 'react-native';

useEffect(() => {
  if (Platform.OS === 'android') await requestCameraAndAudioPermission();
  init();
  return () => {
    AgoraEngine.current.destroy();
  }
}, []);
```

Once we have acquired the permissions, we can enable video in the Agora engine. The Agora engine enables audio by default.

```JavaScript
const init = async () => {
  AgoraEngine.current = await RtcEngine.create("Your App ID Here");
  AgoraEngine.current.enableVideo();
};
```

#### Configure the Agora Engine
Next, we need to set the Channel Profile to Livestreaming. `react-native-agora` provides enums for Channel Profiles.

Let's import it and set the Channel Profile to Live Broadcasting. To learn about `ChannelProfile`, refer [here](https://docs.agora.io/en/Video/API%20Reference/react_native/enums/channelprofile.html).

```JavaScript
import { ChannelProfile } from "react-native-agora";

const init = async () => {
  AgoraEngine.current = await RtcEngine.create("Your App ID Here");
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
};
```

Next, we need to set the current user's profile. The default profile is set to `Audience`. So, we need to set the Client Profile to `Broadcaster` if the user pressed Create on the Homescreen.

We can identify this by the `type` route prop that we pass when navigating to this screen. You can access the route prop like `props.route.params.propname`. In our case, it'll be `props.route.params.type`.

Let's import the enum `ClientRole` provided by `react-native-agora`. To Learn more about `ClientRole`, refer [here](https://docs.agora.io/en/Video/API%20Reference/react_native/enums/clientrole.html).

Remember, we don't need to set the ClientRole if the user is the audience. It's the default value.

```JavaScript
import { ClientRole } from "react-native-agora";

const isBroadcaster = props.route.params.type === "create";

const init = async () => {
  AgoraEngine.current = await RtcEngine.create("App ID");
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
  if (isBroadcaster) AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
};
```

#### Joining the Agora channel
Now that we have set all the config required for the Livestream, we need to join the channel. We need to join the Livestream only after all these configurations have been set up on the engine.

Since `init()` is an async function, we can add a `.then()` to it and join the channel inside it.

To join the channel, the Agora engine instance has a `joinChannel` function on it. It takes 4 arguments, *Authentication Token, Channel ID, Optional Info, and Optional UID*. To learn more about `joinChannel`, refer [here](https://docs.agora.io/en/Video/API%20Reference/react_native/classes/rtcengine.html#joinchannel).

Let's not worry about Authentication and Optional info now. We'll pass null for authentication and optional info.

For the Channel ID, we'll pass what we get from the route props.

For the Optional UID, we'll pass `1` if the user is a Broadcaster and `0` if the user is an audience.

This is because we can use the UID of the Broadcaster to listen to events and establish the remote feed on the audience's side.

If the Optional UID is set to `0`, the SDK assigns and returns the UID in the `JoinChannelSuccess` callback.

```JavaScript
useEffect(() => {
  const uid = isBroadcaster ? 1 : 0;
  init().then(() => AgoraEngine.current.joinChannel(null, props.route.params.channel, null, uid));
  return () => {
    AgoraEngine.current.destroy();
  };
}, []);
```

To ensure we have joined the channel, we can add a `JoinChannelSuccess` listener to the engine. Let's add that in the `init()` function.

```JavaScript
const init = async () => {
  AgoraEngine.current = await RtcEngine.create("You App ID Here");
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
  if (isBroadcaster) AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) =>
    console.log("JoinChannelSuccess", channel, uid, elapsed)
  );
};
```

Now, when we navigate to the Live screen page, we will see the `console.log` message from the `JoinChannelSuccess` callback.

This means, we have joined the live stream but we can't see it yet. Because we didn't write it yet. :grimacing:

#### Displaying the feed
The next step is to display the Remote Feed of the Host to the Audience and the Local Feed to the Broadcaster.

Let's import `RtcLocalView` and `RtcRemoteView` form `react-native-agora`.

```JavaScript
import { RtcLocalView, RtcRemoteView } from "react-native-agora";
```

On the Broadcaster's side, we'll use `RtcLocalView` to display the feed of the Local Camera.

On the audience's side, we'll use `RtcRemoteView` to display the feed of the Broadcaster.

We shouldn't be showing these until the user joins the channel. So, let's create a state for that and set the initial value to false.

```JavaScript
const [joined, setJoined] = useState(false);
```

Now, we can use the `JoinChannelSuccess` listener to update the state.

```JavaScript
AgoraEngine.current.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
  console.log("JoinChannelSuccess", channel, uid, elapsed);
  setJoined(true);
});
```

We can use this state to display a loading screen.

```JavaScript
return (
  <View style={styles.container}>
    {!joined ? (
      <>
        <ActivityIndicator
          size={60}
          color="#222"
          style={styles.activityIndicator}
        />
        <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
      </>
    ) : (
      // Live Feed
    )}
  </View>
);
```

Styles for a loading screen:

```JavaScript
loadingText: {
  fontSize: 18,
  color: '#222',
},
```

![Loading Screen](/engineering-education/react-native-agora-livestreaming-app/loading_screen.gif)

When the `joined` state is set to `true`, we need to show the feed.

The `RtcLocalView` requires only one prop which is the `channelId` prop. The rest are optional.
The `RtcRemoteView` requires 2 props. One is the `channelId` and the other is the `uid` prop.
The `uid` prop decides which user's feed in the live stream to display on this view.
Here, we will pass our host's UID, which is `1`.

Return Statement when joined === true.

```JavaScript
<>
  {isBroadcaster ? (
    <RtcLocalView.SurfaceView style={styles.fullscreen} channelId={props.route.params.channel} />
  ) : (
    <RtcRemoteView.SurfaceView uid={1} style={styles.fullscreen} channelId={props.route.params.channel} />
  )}
</>
```

We can also pass styles to the `RtcLocalView` and `RtcRemoteView`. Let's make it full screen.

```JavaScript
import { Dimensions } from "react-native";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

const styles = StyleSheet.create({
  // Rest of the Styles

  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
});
```

### Extra features
#### Share the channel ID
Let's add a Share button to share the channel ID with others. We need to import the `Share` component from `react-native`. To learn more about the `Share` component, refer [here](https://reactnative.dev/docs/share).

```JavaScript
import { Share } from "react-native";
```

Let's add a button in the Live screen page to share the channel when the user presses it.

Function to call when we press the share button:

```JavaScript
export default function Live(props) {
  const onShare = async () => {
    try {
      const result = await Share.share({ message: props.route.params.channel });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Rest of the Code
}
```

The Share button:

```javascript
<>
  {isBroadcaster ? (
    <RtcLocalView.SurfaceView style={styles.fullscreen} channelId={props.route.params.channel} />
  ) : (
    <RtcRemoteView.SurfaceView uid={1} style={styles.fullscreen} channelId={props.route.params.channel} />
  )}
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={onShare}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  </View>
</>
```

Button Styles

```javascript
buttonContainer: {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 0,
},
button: {
  width: 150,
  backgroundColor: '#fff',
  marginBottom: 50,
  paddingVertical: 13,
  borderRadius: 8,
  alignItems: 'center',
  marginHorizontal: 10,
},
buttonText: {
  fontSize: 17,
},
```

#### Switch camera
Let's add another button in the Live screen to switch the camera when the user presses it.

Function to Switch camera:

```JavaScript
const onSwitchCamera = () => AgoraEngine.current.switchCamera();
```

Switch Camera button:

```javascript
<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={onShare}>
    <Text style={styles.buttonText}>Share</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
    <Text style={styles.buttonText}>Switch Camera</Text>
  </TouchableOpacity>
</View>
```

#### Broadcaster Video Status
Agora provides a listener called `RemoteVideoStateChanged`. This listens for any state changes in the video of all the users in the live stream.

When a video state changes, it provides the `UID` and the `Video State` of that user. To learn more about the `RemoteVideoStateChanged` listener, refer [here](https://docs.agora.io/en/Video/API%20Reference/react_native/interfaces/rtcengineevents.html#remotevideostatechanged)

Let's add a state for the broadcaster's video state and set the initial value to Decoding. `react-native-agora` provides an enum for all the remote video states.

```JavaScript
import { VideoRemoteState } from "react-native-agora";
```

```JavaScript
const [broadcasterVideoState, setBroadcasterVideoState] = useState(VideoRemoteState.Decoding);
```

Let's add the listener in `init()` to listen to the Remote Video State Changes.

We only need to listen for the host's video state, and we know the Host's UID (is `1`).

```javascript
AgoraEngine.current.addListener("RemoteVideoStateChanged", (uid, state) => {
  if (uid === 1) setBroadcasterVideoState(state);
});
```

Let's add a function to provide a text message for each state.

```javascript
const videoStateMessage = (state) => {
  switch (state) {
    case VideoRemoteState.Stopped:
      return "Video turned off by Host";

    case VideoRemoteState.Frozen:
      return "Connection Issue, Please Wait";

    case VideoRemoteState.Failed:
      return "Network Error";
  }
};
```

We can display the remote feed or the state message based on the broadcaster's video state.

```JavaScript
broadcasterVideoState === VideoRemoteState.Decoding ? (
  <RtcRemoteView.SurfaceView uid={1} style={styles.fullscreen} channelId={props.route.params.channel} />
) : (
  <View style={styles.broadcasterVideoStateMessage}>
    <Text style={styles.broadcasterVideoStateMessageText}>{videoStateMessage(broadcasterVideoState)}</Text>
  </View>
);
```

Styles for the Video State message:

```JavaScript
broadcasterVideoStateMessage: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#222',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
},
broadcasterVideoStateMessageText: {
  color: '#fff',
  fontSize: 20,
},
```

### Let's Recap
1. We set up our Agora Account.

2. We created a project using the Project Management Dashboard and acquired the App ID.

3. We cloned the starter code.

4. We passed a UUID when we navigated to the Live screen which is the channel ID used for the Livestream.

5. We acquired Camera and Microphone permissions from Android to send Audio and Video.

6. We initiated the Agora Engine instance and setup all the necessary configurations.

7. We joined the channel using no authentication and the channel ID from the route prop.

8. We displayed the Local View and Remote View based on who is using the app, the broadcaster, or the audience.

9. We added a Share button to share the UUID with others from the Live screen.

10. We added a Switch Camera button to switch between the front camera and the back camera.

11. We added a Remote Video State Listener to listen to the broadcaster's video state.

Congratulations, :partying_face: You did it.

Thanks for reading!

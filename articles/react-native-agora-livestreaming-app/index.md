Want to build a cool and simple Livestreaming app using React Native?
Keep reading to find out.

### Goals
By the end of the tutorial, you’ll understand

- How to create/ join a live stream using Agora.
- How to share a room code for others to join the live stream.
- How to add event listeners on the live stream to listen to various state changes.
  
### Prerequisites
This article will not cover tutorial aspects of how React/ React Native. So if you do not know how to work with it, please refer to some tutorials before beginning with this project.

### Agora
Agora provides the building blocks for a wide range of real-time engagement possibilities. Agora is a paid service, but do not worry. The first 10,000 minutes for every month is free. You could check their pricing [here](https://www.agora.io/en/pricing/).

Using Agora, we can develop a wide variety of applications that requires real-time engagement. Some of the examples are Audio/Video Call, Interactive Livestreaming (Audio/ Video), Interactive Gaming, Real-Time Messaging (which is in BETA at the time of writing this article).

In this article, we will be focusing on how to build a Livestreaming App using the services provided by Agora.

[Documentation for React Native Agora](https://docs.agora.io/en/Video/API%20Reference/react_native/index.html)

### Overview
We will be going through these steps in this article,

1. Setting up the Development Environment
2. Creating an Agora Account
3. Installing Dependencies
4. Building the Livestream
5. Extra Features
6. Let's Recap

> If you want to take a look at the code step-by-step, check out the [Github Repo](https://github.com/zolomohan/react-native-agora-livestreaming-app). I've made commits for every step in this tutorial.

### Setting up the Development Environment

> **IMPORTANT** - We will **not** be using Expo to create our project. We will use the **React Native CLI Quickstart** to create the app.

You can follow the steps in the [Environment Setup](https://reactnative.dev/docs/environment-setup) documentation to set up the react native app using the react-native CLI.

Once you've set up the environment, run this command to create a react native app.

```
npx react-native init AgoraLivestreamingApp
```

Once you create the app, it's time to start it up and run it on a physical device or an emulator.

For Android,
```
npx react-native run-android
```

For iOS,
```
npx react-native run-android
```

### Creating an Agora Account
Head to Agora and Create an account. You can reach the signup page from [here](https://sso.agora.io/en/v2/signup).

Fill in the details and create an account or you can signup with either Google, Github, or Cocos. Once you've signed up, You'll see the dashboard.

![Agora Dashboard](agora_dashboard.png)

Click on New Project.

You'll see this modal. Fill out the Project Name and set the Authentication Mechanism to Testing, for now.

![Agora New Project Dashboard](agora_new_project.png)

Once you hit on submit, it'll create a new project and you should see it on the Project Management Console.

![Agora Project Management Console](agora_project_management_console.png)

Now, click on the closed eye icon near the App Id to reveal it and copy the App ID. We will be needing this later while setting up Agora in our app.

### Installing Dependencies
You can use either use ```npm``` or ```yarn``` to install these dependencies.
```npm``` ships with Node whereas you should install Yarn separately. You can download yarn from [here](https://classic.yarnpkg.com/en/docs/install/#windows-stable).

To install a dependency, either run (based on what package manager you use)

For npm
```
npm i --save <package-name>
``` 

For Yarn
```
yarn add <package-name>
```

After installing the packages, for ios, go into your ```LivestreamApp\ios\``` directory, and run 

```
pod install
```

> **IMPORTANT FOR ANDROID**
> 
> As more native dependencies are added to your project, it may bump you over the 64k method limit on the Android build system. Once this limit has been reached, you will start to see the following error whilst attempting to build your Android application:
> ```Execution failed for task ':app:mergeDexDebug'.```
> Use [this Documentation](https://rnfirebase.io/enabling-multidex) to resolve this issue.
> To learn more about multidex, view the official [Android documentation](https://developer.android.com/studio/build/multidex#mdex-gradle).

**List of Dependencies**

You can install these beforehand, or install them while going through the article.
```
"@react-native-community/masked-view": "^0.1.10",
"@react-navigation/native": "^5.8.6",
"@react-navigation/stack": "^5.12.3",
"react": "16.13.1",
"react-native": "0.63.3",
"react-native-agora": "^3.1.3",
"react-native-gesture-handler": "^1.8.0",
"react-native-get-random-values": "^1.5.0",
"react-native-reanimated": "^1.13.1",
"react-native-safe-area-context": "^3.1.8",
"react-native-screens": "^2.13.0",
"uuid": "^8.3.1"
```

### Building the Livestream
You can get the initial code from [here](https://github.com/zolomohan/react-native-agora-livestreaming-app/tree/7c9be640b75b5030f11b60d9d22378ef9c62c5cd). This code contains the home screen in the App.js.

These buttons are supposed to take you to the live screen. So let's set up React Navigation.

![Homescreen With Input](homescreen_with_input.jpeg)

#### Setting Up React Navigation
We need to use `@react-navigation/native` to set up navigation in our app. So let's install the packages required to get navigation up and running.
```
npm install @react-navigation/native
```
There are a couple of dependencies required for `@react-navigation/native` to work. Let's install those packages too.

```
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
`@react-navigation/native` offers different navigation systems like Stack Navigation, Top Tab Navigation, Drawer Navigation, etc.
We need to install these packages separately.

We will be using Stack Navigation, so let's install `@react-navigation/stack`
```
npm install @react-navigation/stack
```
Now that we've installed the dependencies for us to set up navigation, Let's build the screens.

Create a new directory called `screens` with 2 new files inside called `Home.js` and `Live.js`

![Screens Directory](screens_directory.png)

##### Set up Navigator
Let's move what we wrote in the `App.js` into `screens/Home.js`. Once you have moved everything, rename the function from App to Home in `screens/Home.js`.

Let's add a dummy live screen, for now, to visualize that we are navigating to the right screen.

*screens/Live.js*
```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Live() {
  return (
    <View style={styles.container}>
      <Text>Live</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```
Now, In our `App.js`, we need to set up the navigation.

Let's import the `NavigationContainer` from `@react-navigation\native`.
```
import { NavigationContainer } from '@react-navigation/native';
```
We need to wrap everything in our App with the `NavigationContainer` like this
```
export default function App() {
  return (
    <NavigationContainer>
      // Rest of the Code
    </NavigationContainer>
  );
}
```
Now, we need to create a Stack Navigator. To do that, we need to import createStackNavigator.
```
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
```
Now, inside the Navigation Container, Let's Add a Stack Navigator.
```
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        // Rest of the Code Here
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
Our App has 2 Screens, So let's import the screens into ```App.js``` and create 2 screens inside the Navigator.

The Stack.Screen accepts 2 props.
- component - The Screen Component
- name - The name of the screen. We will use this to navigate between screens.
```
import Home from './screens/Home';
import Live from './screens/Live';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Live" component={Live} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
You've set up the Navigation. When you open the app now, you'll see the home screen because it's the first screen in the stack.
You can't navigate to the Live screen yet. We still need to write the code to go from the Home Screen to the Live Screen.

![Homescreen with Header](home_with_header.jpeg)

We don't need the header, let's remove that.

The Stack.screen also accepts a prop called options. Let's pass an object with the option that'll remove the Header. For more options, you can refer [here](https://reactnavigation.org/docs/screen-options/)
```
const options = { headerShown: false };
return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={options} />
      <Stack.Screen name="Live" component={Live} options={options} />
    </Stack.Navigator>
  </NavigationContainer>
);
```
##### Navigate Between Screens
Let's add the code to navigate from the home screen to the live screen. In `screens/Home.js`, we need to import a hook provided by `@react-navigation/native`.
```
import { useNavigation } from '@react-navigation/native';
```
Inside the Home function, create a constant variable called navigation and assign the hook to it.
```
const navigation = useNavigation();
```
Now, `navigation` will have a function on it called `navigate` which will be used to navigate between screens using the screen name.
Like this,

```
navigation.navigate('<Screen Name>')
``` 
When we create or join a live event, we need to pass a channel id to the Live Screen. For a new event, we will create a random UUID and pass it to the Live screen. For joining an event, we will use the channel id from the input.

Let's install the UUID package to generate UUID.
```
npm install uuid
```
In React Native, you will run into an issue with the message `crypto.getRandomValues() is not supported`. To fix this, you will need to install `react-native-get-random-values` and import it before importing UUID.

Let's install the react-native-get-random-values package to fix the issue.
```
npm install react-native-get-random-values
```
Import both of those packages into the file in this order. We must import the `react-native-get-random-values` before the `uuid` import.
```
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
```
We need to Navigate to the Live Screen from both the buttons, so let's create two functions to navigate to the Live screen for Create and Join.

In the Navigate to Create Live function, we will generate a new UUID and pass it as a route prop for the Channel ID.
In the Navigate to Join Live function, we will use the text input's value for the Channel ID.
```
const createLive = () => navigation.navigate('Live', { type: 'create', channel: uuid() });
const joinLive = () => navigation.navigate('Live', { type: 'join', channel: joinChannel });
```
Notice that we are also passing a route prop called `type` along with channel? We will be using this to determine whether the user is a broadcaster or an audience on the Livestream page.

You can pass these functions to the `onPress` prop of the `TouchableOpacity` component.

When you press these buttons, you should be navigating to the Live screen now.

#### Setting up The Live Screen
Okay, We reached the interesting part. 

To use Agora, we need to install `react-native-agora` first. Let's install it.
```
npm install react-native-agora
```
For iOS, Run
```
pod install
```
##### Creating the Agora Engine Instance
Let's open the `screens/Live.js`.

In here, we need to import the `RtcEngine` from `react-native-agora`.
```
import RtcEngine from 'react-native-agora';
```
RtcEngine has a function called `create` on it, which will create an Agora Engine and allocate resources for it. We need to call that function when the component mounts. It returns an engine instance that has various functions on it which we will use later.

> Do not forget to destroy this instance on component unmount.

We can't create a normal variable in the function's scope and assign the engine's instance to it because we will lose it on a re-render. So, we need to create a ref using useRef() and assign the engine instance to it.

So let's import `useEffect` and `useRef` from `React`.
```
import React, { useEffect, useRef } from 'react';
```

`RtcEngine.create('Your App ID Here')` takes one argument, which is the App ID that we copied from the Agora Project Management Console while creating the project in the Agora Project Management Console.

It is an async function, and we need to assign the returned object to the ref created using useRef().

You can't pass an async function to an useEffect, so let's create an async function called `init()` and then call it in the `useEffect()`.
```
export default function Live(props) {
  const AgoraEngine = useRef();

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create('Your App ID Here');
  };

  useEffect(() => {
    init();
  }, []);

  // Rest of the Code
}
```
We need to destroy the Agora Engine instance when the component unmounts. If you forget to do this, the App may still be transmitting video and audio even after we go back from this screen and the resources allocated for the engine instance will not be unallocated.
```
useEffect(() => {
  init();
  return () => {
    AgoraEngine.current.destroy();
  }
}, []);
```
Next, we need to enable video in the engine to transmit and receive Video. The AgoraEngine has a method called enableVideo(). We need to call it to enable video. But before that, we need to acquire permission from Android to access the Camera and Microphone.

Let's Write a function to acquire these Permissions. 
```
import { PermissionsAndroid } from 'react-native'

async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
```
Now, we need to call this in our `useEffect()` before `init()`.

This step is only for `android`, not for `iOS`.
```
import { Platform } from 'react-native';

useEffect(() => {
  if (Platform.OS === 'android') requestCameraAndAudioPermission();
  init();
  return () => {
    AgoraEngine.current.destroy();
  }
}, []);
```
Once we have acquired the permissions, we can enable video in the agora engine. Audio is enabled by default, you don't have to enable that explicitly.
```
const init = async () => {
  AgoraEngine.current = await RtcEngine.create('Your App ID Here');
  AgoraEngine.current.enableVideo();
};
```
Next, we need to set the Channel Profile to Livestreaming. `react-native-agora` provides enums for Channel Profiles. Let's import it and set the Channel Profile to Live Broadcasting.
```
import { ChannelProfile } from 'react-native-agora';

const init = async () => {
  AgoraEngine.current = await RtcEngine.create('Your App ID Here');
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
};
```
Next, We need to set the current user's profile. The default profile is set to `Audience`. So, we need to set the Client Profile to `Broadcaster` if the user pressed Create on the Homescreen. We can identify this by the `type` route prop that we pass when navigating to this screen. You can access the route prop like `props.route.params.propname`. In our case, it'll be `props.route.params.type`.

Let's import the enum `ClientRole` provided by `react-native-agora`.

Remember, we don't need to set the ClientRole if the user is the audience. It's the default value.
```
import { ClientRole } from 'react-native-agora';

const isBroadcaster = props.route.params.type === 'create';

const init = async () => {
  AgoraEngine.current = await RtcEngine.create('App ID');
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
  if (isBroadcaster)
    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
  };
```
##### Joining the Agora Channel
Now that we have set all the config required for the Livestream, we need to join the channel. We need to join the Livestream only after all these configurations have been set up on the engine. Since `init()` is an async function, we can add a `.then()` to it and Join the channel inside it.

To join the channel, the AgoraEngine instance has a `joinChannel()` function on it. It takes 4 arguments. 

1. **Authentication Token**:
  - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#get-a-temporary-token).
  -  In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
  -  In situations that do not require security, You can pass `null`.
     
2. **Channel**: The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes.
   
3. **Optional Info**: Additional information about the channel. This parameter can be set as null or contain channel-related information. Other users in the channel do not receive this message.
   
4. **Optional UID** - User ID. A 32-bit unsigned integer with a value ranging from 1 to (2^32-1). `optionalUid` must be unique. If `optionalUid` is not assigned (or set to `0`), the SDK assigns and returns `uid` in the `JoinChannelSuccess` Callback.
Your app must record and maintain the returned UID since the SDK does not do so.

Let's not worry about Authentication and Optional Info now. We'll pass null for authentication and optional info. For the Channel ID, we'll pass what we get from the route props i.e., the channel UUID that we pass from the home screen to this screen. For the Optional UID, we'll pass `1` if the user is a Broadcaster and `0` if the user is an audience. This is because we can use the UID of the Broadcaster for listening to events later and establishing the remote feed on the audience's side.

> You can assign a random UID and store it elsewhere like a database and use that UID later in the code. For simplicity, we will use 1.
```
useEffect(() => {
  const uid = isBroadcaster ? 1 : 0;
  init().then(() => AgoraEngine.current.joinChannel(null, props.route.params.channel, null, uid));
  return () => {
    AgoraEngine.current.destroy();
  }
}, []);
```
To ensure we have joined the channel, we can add a `JoinChannelSuccess` listener to the AgoraEngine. Let's add that in the `init()` function.
```
const init = async () => {
  AgoraEngine.current = await RtcEngine.create('You App ID Here');
  AgoraEngine.current.enableVideo();
  AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
  if (isBroadcaster)
    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current.addListener(
    'JoinChannelSuccess',
    (channel, uid, elapsed) =>
      console.log('JoinChannelSuccess', channel, uid, elapsed),
  );
};
```
Now, when we navigate to the Live screen page, we must see the `console.log` message from the `JoinChannelSuccess` Callback.

This means, we have successfully joined the live stream, we just can't see it yet. Because we didn't write it yet. :grimacing:

##### Displaying the Feed
The next step is to display the Remote Feed of the Host to the Audience and the Local Feed to the Broadcaster.

Let's import `RtcLocalView` and `RtcRemoteView` form `react-native-agora`.
```
import { RtcLocalView, RtcRemoteView } from 'react-native-agora';
```

`RtcLocalView` will be used on the Broadcaster's side, to display the feed of the Local Camera and `RtcRemoteView` will be used on the audience's side, to display the feed of the Broadcaster.

We should not be showing these until the user joins the channel. So, let's create a state for that and set the initial value to false.
```
const [joined, setJoined] = useState(false);
```
Now, we can use the `JoinChannelSuccess` listener to update the state.
```
AgoraEngine.current.addListener(
  'JoinChannelSuccess',
  (channel, uid, elapsed) => {
    console.log('JoinChannelSuccess', channel, uid, elapsed);
    setJoined(true);
  },
);
```
We can use this state to display a loading screen.
```
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
*Styles for Loading Screen*
```
loadingText: {
  fontSize: 18,
  color: '#222',
},
```
![Loading Screen](loading_screen.gif)

When the `joined` state is set to `true`, we need to show the Local Feed or the Remote Feed (Livestream) depending upon the user type.

The `RtcLocalView` requires only one prop which is the `channelId` prop. The rest are optional.
The `RtcRemoteView` requires 2 props. One is the `channelId` and the other is the `uid` prop. The `uid` prop is the one deciding which user's feed in the live stream will be displayed on this view. Here, we will pass our host's UID, which is `1`. 

We can also pass styles to the `RtcLocalView` and `RtcRemoteView`, to make it fullscreen. To make it fullscreen, import Dimensions from react-native and use it to get the width and height of the screen.

Return Statement when joined === true.
```
<>
  {isBroadcaster ? (
    <RtcLocalView.SurfaceView
      style={styles.fullscreen}
      channelId={props.route.params.channel}
    />
  ) : (
    <RtcRemoteView.SurfaceView
      uid={1}
      style={styles.fullscreen}
      channelId={props.route.params.channel}
    />
  )}
</>
```
Fullscreen Styles,
```
import { Dimensions } from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({

  // Rest of the Styles

  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
});
```
One last thing, Let's add a Share button to share the channel ID to others. We need to import the `Share` component from `react-native`.

### Extra Features 
#### Share the Channel ID
```
import { Share } from 'react-native';
```
Let's add a button in the Live screen page and write the function to share the channel when the user presses the share button.

Function to call when the share button is pressed
```
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
  }

  // Rest of the Code
 };

```
The Share Button
```
<>
  {isBroadcaster ? (
    <RtcLocalView.SurfaceView
      style={styles.fullscreen}
      channelId={props.route.params.channel}
    />
  ) : (
    <RtcRemoteView.SurfaceView
      uid={1}
      style={styles.fullscreen}
      channelId={props.route.params.channel}
    />
  )}
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={onShare}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  </View>
</>
```
*Button Styles*
```
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
#### Switch Camera
Let's add another button in the Live screen page and write the function to switch the camera when the user presses the button.

Function to Switch Camera
```
const onSwitchCamera = () => AgoraEngine.current.switchCamera();
```
Switch Camera Button
```
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
Agora provides a listener called `RemoteVideoStateChanged`. This listens for any state changes in the video of all the users in the live stream. When a video state changes, it provides the `UID` and the `Video State` of that user.

Let's add a state for the broadcaster's video state and set the initial value to Decoding. `react-native-agora` provides an enum for all the remote video states.
```
import { VideoRemoteState } from 'react-native-agora`;
```
```
const [broadcasterVideoState, setBroadcasterVideoState] = useState(VideoRemoteState.Decoding);
```
Let's add the listener in `init()` to listen to the Remote Video State Changes.

We only need to listen for the host's video state, and we know the Host's UID (which is `1`).
```
AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
  if (uid === 1) setBroadcasterVideoState(state);
});
```

Let's add a utility function to provide a text message for each state.
```
const videoStateMessage = (state) => {
  switch (state) {
    case VideoRemoteState.Stopped:
      return 'Video turned off by Host';

    case VideoRemoteState.Frozen:
      return 'Connection Issue, Please Wait';

    case VideoRemoteState.Failed:
      return 'Network Error';
  }
};
```
Using the state, we can conditionally display the remote feed or the state message.
```
broadcasterVideoState === VideoRemoteState.Decoding ? (
  <RtcRemoteView.SurfaceView
    uid={1}
    style={styles.fullscreen}
    channelId={props.route.params.channel}
  />
) : (
  <View style={styles.broadcasterVideoStateMessage}>
    <Text style={styles.broadcasterVideoStateMessageText}>
      {videoStateMessage(broadcasterVideoState)}
    </Text>
  </View>
);
```
Styles for the Video State Message
```
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
1. We set up our Agora Account and created a project using the Project Management Dashboard and acquired the App Id which we later used in the app to initiate the Agora Engine Instance.
   
2. We created the home screen with two buttons and text input to create a live stream and join the live stream.
   
3. We setup React Navigation and we navigated between the two screens. We passed a UUID when we navigated to the Live screen which is the channel ID used for the Livestream.
   
4. We initiated the Agora Engine instance and setup all the necessary configuration for the engine like the Channel Profile and the Client Profile.
   
5. Then, we joined the channel using no authentication and the channel ID from the route prop.
   
6. We displayed the Local View and Remote View based on who is using the app, the Livestream host, or the audience.
   
7. We added a Share button to share the UUID to others from the Live screen.
   
8. We added a Switch Camera button to switch between the front camera and the back camera.
   
9.  We added a Remote Video State Listener to listen to the state changes of the Video Feed from the broadcaster and displayed the feed or the video state message.

Congratulations, :partying_face: You did it.

Thanks for Reading!
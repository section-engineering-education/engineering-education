In this tutorial, we will be building a React Native application to upload images and videos to Firebase's cloud storage.

### Firebase

Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.

### Prerequisites

The fundamentals of React and React Native will not be covered in this tutorial. If you are not comfortable with the fundamentals, this is a [helpful tutorial](https://reactnative.dev/docs/tutorial) that you can go through before beginning with this project.

### Overview

We'll be going through these steps in this article:

1. Development environment.
2. Set up Firebase Project.
3. Set up Firebase Storage.
4. Installing dependencies.
5. Build the UI.
6. Pick the Media.
7. Upload the Image.

> You can take a look at the final code in this [GitHub Repository](https://github.com/zolomohan/react-native-firebase-storage-non-expo).

### Development environment

> **IMPORTANT** - We will not be using Expo in our project.

You can follow [this](https://reactnative.dev/docs/environment-setup) documentation to set up the environment and create a new React app.

> Make sure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

### Set up Firebase Project

Head to [Firebase console](console.firebase.google.com/u/0/) and sign in to your account.

Create a new project.

![Create New Project](firebase_new.png)

Once you create a new project, you'll see the dashboard.

![New Dashboard](new_dashboard.png)

Now, click on the Android icon to add an android app to the Firebase project.

![register_app](register_app.png)

You will need the package name to register the application. You will find the package name in the `AndroidManifest` which is located in `android/app/src/main/AndroidManifest.xml`.

![Package Name](package_name.png)

Once you enter the package name and proceed to next step, you can download the `google-services.json` file. You should place this file in the `android/app` directory.

![Download Google Services JSON](download_services.json.png)

After adding the file, proceed to the next step. It will ask you to add some configurations to the `build.gradle` files.

First, add the `google-services` plugin as a dependency inside of your `android/build.gradle` file:

```gradle
buildscript {
  dependencies {
    // ... other dependencies

    classpath 'com.google.gms:google-services:4.3.3'
  }
}
```

Then, execute the plugin by adding the following to your `android/app/build.gradle` file:

```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

You need to perform some additional steps to configure `Firebase` for `iOS`. Follow [this documentation](https://rnfirebase.io/#3-ios-setup) to set it up.

### Set up Firebase Storage

Head over to the Storage section in the dashboard and click on `Get Started` button.

![Get Started Storage](enable_storage.png)

A modal will pop-up with information about the storage rules. By default, only authenticated users can read and write from the cloud storage. Since we are not going to cover authenctication in this tutorial, we will change the rules and set the cloud storage to open.

> Do not set your cloud storage open in a production application. This will allow anyone to read and write to your cloud storage, compromising all the data in your cloud storage.

![Default Rules](default_rules.png)

On the next step, it will ask you for the storage bucket location.

![Bucket Location](bucket_location.png)

Once this is done, you'll see this screen. You can upload files and delete files manually from this screen.

![Storage Setup Done](storage_setup_done.png)

Now, Let's alter the cloud storage rules and set it to open. Switch to the `Rules` tab.

![Storage Rules Tab](storage_default_rules.png)

Now, replace the existing rules with this.

```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

If you'd like to learn more about cloud storage rules, refer [here](https://firebase.google.com/docs/storage/security).

### Installing dependencies

You can install these in advance or while going through the article.

```json
"@react-native-firebase/app": "^10.4.0",
"@react-native-firebase/storage": "^10.4.0",
"react": "16.13.1",
"react-native": "0.63.4",
"react-native-image-picker": "^3.1.3",
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
> Use [this documentation](https://rnfirebase.io/enabling-multidex) to enable multidexing.
> To learn more about multidex, view the official [Android documentation](https://developer.android.com/studio/build/multidex#mdex-gradle).

### Build the UI

Let's add 4 buttons to the screen.

- Take Photo.
- Record Video.
- Pick a Photo.
- Pick a Video.

```JSX
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Firebase Storage</Text>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pick a Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

Styles:

```JSX
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
```

### Pick the Media

Now, the first 2 buttons should open the camera to take a photo and record a video respectively, and the next 2 buttons should open the gallery to pick an image and video respectively.

Let's install `react-native-image-picker` to add these functionalities.

```bash
npm install react-native-image-picker
```

After the package is installed, import the import `launchCamera` and `launchImageLibrary` funtions from the package.

```JSX
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
```

Both of these functions accept 2 arguments. The first argument is `options` for the camera or the gallery, and the second argument is a callback function. This callback function is called if the user picks a media or cancels the operation.

Check out the [API Reference](https://www.npmjs.com/package/react-native-image-picker#api-reference) for more details about these functions.

Now let's add 4 functions for each button.

```JSX
const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onMediaSelect);

const onTakeVideo = () => launchCamera({ mediaType: 'video' }, onMediaSelect);

const onSelectImagePress = () =>
  launchImageLibrary({ mediaType: 'image' }, onMediaSelect);

const onSelectVideoPress = () =>
  launchImageLibrary({ mediaType: 'video' }, onMediaSelect);
```

Now, pass these function to the `onPressed` prop of the `TouchableOpacity` for the respective buttons.

For example:

```JSX
<TouchableOpacity style={styles.button} onPress={onTakePhoto}>
  <Text style={styles.buttonText}>Take Photo</Text>
</TouchableOpacity>
```

### Upload Image

We need to upload the image from the callback function that we passed to the `launchCamera` and the `launchImageLibrary` functions.

Let's install the package for Firebase storage.

```bash
npm install @react-native-firebase/storage
```

Once the package is installed, let's import the package to our app.

```JSX
import storage from '@react-native-firebase/storage';
```

To upload a file to the cloud storage, we should create a reference object. 

A reference is a pointer to a file on your bucket. This file can either exist already, or it may not exist yet.

We need to use the `ref` method to create a refernce.

```JSX
const reference = storage().ref('<filename>');
```

You can also specify a file located in a deeply nested directory:

```JSX
const reference = storage().ref('/directory1/directory2/filename.png');
```

Now, we should use the `putFile` method to upload the image from the user's device to the cloud storage. The `putFile` method accepts a string to file on the users device.

The callback function that we passed to `launchCamera` and the `launchImageLibrary` functions will get the `uri` of the image in the response object. We need to pass that string to the `putFile` method.

You can learn more about the response object that we get from the `launchCamera` and the `launchImageLibrary` functions [here](https://www.npmjs.com/package/react-native-image-picker#the-response-object).

```JSX
const onMediaSelect = async (media) => {
  const reference = storage().ref(media.fileName);
  const task = reference.putFile(media.uri);
};
```

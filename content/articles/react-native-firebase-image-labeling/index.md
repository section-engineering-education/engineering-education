---
layout: engineering-education
status: publish
published: true
url: /react-native-firebase-image-labeling/
title: Image Labeling using Firebase ML in React Native
description: This tutorial will give readers a detailed guide on how to implement image labeling using Firebase's ML kit in a Non-Expo React Native appliaction.
author: mohan-raj
date: 2021-01-26T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-firebase-image-labeling/hero.jpg
    alt: React Native Image Labeling With Firebase Hero Image
---
Image labeling gives you insight into the content of images. In this tutorial, we will be building a Non-Expo React Native application to label the image provided using the machine learning kit from Firebase.
<!--more-->
### Firebase
Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their [flagship offering for app development](https://en.wikipedia.org/wiki/Firebase).

[Firebase's ML kit](https://firebase.google.com/docs/ml) is a mobile SDK that brings Google's machine learning expertise to Android and iOS apps. There's no need to have a deep knowledge of neural networks or model optimization to get started with the ML kit. 

On the other hand, if you are an experienced ML developer, it also provides APIs that help you use custom [TensorFlow Lite models](https://www.tensorflow.org/lite/models) in your mobile apps.

### Prerequisites
To proceed with this tutorial:

- You will need a basic knowledge of React & React Native.

- You will need a Firebase project with the [Blaze plan](https://firebase.google.com/pricing) enabled to access the Cloud Vision APIs.

### Overview
We'll be going through these steps in this article:

1. Development environment.
2. Installing dependencies.
3. Setting up the Firebase project.
4. Setting up Cloud Vision API.
5. Building the UI.
6. Adding media picker.
7. Labeling the image using Firebase ML.
8. Additional configurations.
9. Recap.

You can take a look at the final code in this [GitHub Repository](https://github.com/zolomohan/react-native-firebase-ml-image-labeling).

### Development environment
> **IMPORTANT** - We will not be using [Expo](https://expo.io/) in our project.

You can follow [this documentation](https://reactnative.dev/docs/environment-setup) to set up the environment and create a new React app.

Make sure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-firebase-image-labeling/env_setup.png)

### Installing dependencies
You can install these packages in advance or while going through the article.

```JSON
"@react-native-firebase/app": "^10.4.0",
"@react-native-firebase/ml": "^10.4.0",
"react": "16.13.1",
"react-native": "0.63.4",
"react-native-image-picker": "^3.1.3"
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


### Setting up the Firebase project
Head to the [Firebase console](console.firebase.google.com/u/0/) and sign in to your account.

Create a new project.

![Create New Project](/engineering-education/react-native-firebase-image-labeling/firebase_new.png)

Once you create a new project, you'll see the dashboard. Upgrade you project to the Blaze plan.

![New Dashboard](/engineering-education/react-native-firebase-image-labeling/new_dashboard.png)

Now, click on the Android icon to add an Android app to the Firebase project.

![register_app](/engineering-education/react-native-firebase-image-labeling/register_app.png)

You will need the package name of the application to register the application. You can find the package name in the `AndroidManifest.xml` that is located in `android/app/src/main/`.

![Package Name](/engineering-education/react-native-firebase-image-labeling/package_name.png)

Once you enter the package name and proceed to the next step, you can download the `google-services.json` file. You should place this file in the `android/app` directory.

![Download Google Services JSON](/engineering-education/react-native-firebase-image-labeling/download_services.json.png)

After adding the file, proceed to the next step. It will ask you to add some configurations to the `build.gradle` files.

First, add the `google-services` plugin as a dependency inside of your `android/build.gradle` file:

```bash
buildscript {
  dependencies {
    // ... other dependencies

    classpath 'com.google.gms:google-services:4.3.3'
  }
}
```

Then, execute the plugin by adding the following to your `android/app/build.gradle` file:

```bash
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

You need to perform some additional steps to configure `Firebase` for `iOS`. Follow [this documentation](https://rnfirebase.io/#3-ios-setup) to set it up.

We should install the `@react-native-firebase/app` package in our app to complete the set up for Firebase.

```bash
npm install @react-native-firebase/app
```

### Setting up Cloud Vision API
The [Cloud Vision API](https://cloud.google.com/vision/docs) allows developers to integrate vision detection features within applications like face and landmark detection, image labeling, optical character recognition (OCR), and tagging of explicit content.

The ML Kit uses the Cloud Vision API to label the images.

Head to [Google Cloud Console](https://console.cloud.google.com/) and select the Google project that you are working on. Go to the API & Services tab.

![Cloud Dashboard](/engineering-education/react-native-firebase-image-labeling/cloud_dashboard.png)

In the API & Service tab, head to the Libraries section.

![API & Services Tab](/engineering-education/react-native-firebase-image-labeling/api_services.png)

Search for Cloud Vision API.

![API Library Section](/engineering-education/react-native-firebase-image-labeling/search_libraries.png)

Once you open the API page, click on the Enable button.

![Enable Cloud Vision](/engineering-education/react-native-firebase-image-labeling/enable_cloud_vision.png)

Once you've enabled the API, you'll see the Cloud Vision API Overview page.

![Cloud Vision Metrics](/engineering-education/react-native-firebase-image-labeling/cloud_vision_dashboard.png)

With this, you have set up the Cloud Vision API for your Firebase project. This will enable us to use the ML Kit for labeling the images.

### Building the UI
We'll be writing all of our code in the App.js file.

Let's start by adding 2 buttons to the screen to `take a photo` and `pick a photo`.

```JSX
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Image Labeling</Text>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

![Buttons](/engineering-education/react-native-firebase-image-labeling/buttons_ui.jpg)

### Adding media picker
Let's install the `react-native-image-picker` to add these functionalities.

```bash
npm install react-native-image-picker
```

> The minimum target SDK for the React Native Image Picker is 21. If your project targets an SDK below 21, bump up the minSDK target in `android/build.gradle`.

After the package is installed, import the `launchCamera` and `launchImageLibrary` functions from the package.

```JSX
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
```

Both functions accept 2 arguments. The first argument is the `options` for the camera or the gallery, and the second argument is a callback function. This callback function is called when the user picks an image or cancels the operation.

Check out the [API Reference](https://www.npmjs.com/package/react-native-image-picker#api-reference) for more details about these functions.

Now let's add 2 functions, one for each button.

```JSX
const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);

const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);
```

Let's create a function called `onImageSelect`. This is the callback function that we are passing to the `launchCamera` and the `launchImageLibrary` functions. We will get the details of the image that the user picked in this callback function.

We should only start the image labeling when the user doesn't cancel the media picker. If the user cancels the operation, the picker will send a `didCancel` property in the response object.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    // Image Labeling Process
  }
};
```

You can learn more about the response object that we get from the `launchCamera` and the `launchImageLibrary` functions [here](https://www.npmjs.com/package/react-native-image-picker#the-response-object).

Now, pass these functions to the `onPress` prop of the `TouchableOpacity` for the respective buttons.

```JSX
<View>
  <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
    <Text style={styles.buttonText}>Take Photo</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
    <Text style={styles.buttonText}>Pick a Photo</Text>
  </TouchableOpacity>
<View>
```

Let's create a state to display the selected image on the UI.

```JSX
import { useState } from 'react';
```

```JSX
const [image, setImage] = useState();
```

Now, let's add an Image component below the buttons to display the selected image.

```JSX
<View>
  <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
    <Text style={styles.buttonText}>Take Photo</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
    <Text style={styles.buttonText}>Pick a Photo</Text>
  </TouchableOpacity>
  <Image source={{ uri: image }} style={styles.image} />
</View>
```

Styles for the Image:

```JSX
image: {
  height: 300,
  width: 300,
  marginTop: 20,
  borderRadius: 10,
},
```

If the user did not cancel the operation, we should set the image state with the URI of the selected image using the `onImageSelect` function.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
  }
};
```

![Image UI](/engineering-education/react-native-firebase-image-labeling/with_image.jpg)

### Label the image using Firebase ML

Let's install the package for Firebase ML.

```bash
npm install @react-native-firebase/ml
```

Once the package is installed, let's import the package.

```JSX
import ml from '@react-native-firebase/ml';
```

We should use the `cloudImageLabelerProcessImage` method in the `ml` package to process the image and label the image.

We will pass the URI of the selected image to this function.

```JSX
const labels = await ml().cloudImageLabelerProcessImage(media.uri);
```

The function will process the image and return the list of labels along with the confidence the Machine Learning service has in that label.

Let's set up a state to store the results and render them in the UI. Since the result will be an array of labels, let's set the initial state to an empty array.

```JSX
const [labels, setLabels] = useState([]);
```

Let's set the state to the response of the `cloudImageLabelerProcessImage` function.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
    const label = await ml().cloudImageLabelerProcessImage(media.uri);
    setLabels(label);
  }
};
```

We'll use this state to render the details in the UI.

```JSX
{labels.map((item, i) => (
  <View style={{ marginTop: 20, width: 300 }} key={i}>
    <Text>Label: {item.text}</Text>
    <Text>Confidence: {item.confidence}</Text>
  </View>
))}
```

![Final Result](/engineering-education/react-native-firebase-image-labeling/final_result.jpg)

### Additional configurations
The `cloudImageLabelerProcessImage` method accepts an optional configuration object.

- **confidenceThreshold**: Sets confidence threshold in the range of [0.0 - 1.0] of detected labels. Only labels detected with confidence higher than this threshold are returned.

- **apiKeyOverride**: This is the API key to use for the ML API. If not set, the default API key from `firebase.app()` will be used.

- **enforceCertFingerprintMatch**: Only allow registered application instances with matching certificate fingerprints to use ML API.

Example: 

```JSX
await ml().cloudImageLabelerProcessImage(imagePath, {
  confidenceThreshold: 0.8, // undefined | number
  apiKeyOverride: "<-- API KEY -->",  undefined | string,
  enforceCertFingerprintMatch: true, // undefined | false | true,
});
```

### Let's Recap
1. We set up our development environment and created a React Native app.

2. We created a Firebase project.

3. We set up the Cloud Vision API to use the image labeler in the Firebase ML Kit.

4. We built a simple UI for the app.

5. We added the `react-native-image-picker` package to pick images using the gallery or capture images using the camera.

6. We installed the Firebase ML package.

7. We used the `cloudImageLabelerProcessImage` method in the `ml` package to label the image.

8. We displayed the results in the UI.

9. We learned about  additional configurations that we can pass to the `cloudImageLabelerProcessImage` function.

Congratulations, :partying_face: You did it.

Thanks for Reading!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
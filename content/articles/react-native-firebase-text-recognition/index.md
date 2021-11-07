---
layout: engineering-education
status: publish
published: true
url: /react-native-firebase-text-recognition/
title: Text Recognition using Firebase ML in React Native
description: This tutorial will give readers a detailed guide on how to implment text recognition from an image using Firebase's ML kit in a Non-Expo React Native appliaction.
author: mohan-raj
date: 2021-01-20T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-firebase-text-recognition/hero.jpg
    alt: React Native Text Recognition With Firebase Hero Image
---
Firebase ML Kits text recognition APIs can recognize text in any Latin-based character set. They can also be used to automate data-entry tasks such as processing credit cards, receipts, and business cards. In this tutorial, we will be building a Non-Expo React Native application to recognize text from an image using Firebase's ML kit.
<!--more-->
Cloud Vision APIs allows developers to easily integrate vision detection features within applications, including image labeling, face and landmark detection, optical character recognition (OCR), and tagging of explicit content. [Cloud Vision Docs](https://cloud.google.com/vision/docs).

### Firebase
Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In [2014](https://en.wikipedia.org/wiki/Firebase), Google acquired the platform and it is now their flagship offering for app development. 

### Prerequisites
To proceed with this tutorial:

- You will need a basic understanding of React & React Native.

- You will need a Firebase project with the [Blaze plan](https://firebase.google.com/pricing) enabled to access the Cloud Vision APIs.

### Overview
We'll be going through these steps in this article:

1. Development environment.
2. Installing dependencies.
3. Setting up the Firebase project.
4. Setting up Cloud Vision API.
5. Building the UI.
6. Adding media picker.
7. Recognize text from the Image.
8. Additional configurations.
9. Recap.

You can take a look at the final code in this [GitHub Repository](https://github.com/zolomohan/react-native-firebase-ml-text-recognition).

### Development environment
> **IMPORTANT** - We will not be using [Expo](https://expo.io/) in our project.

You can follow [this documentation](https://reactnative.dev/docs/environment-setup) to set up the environment and create a new React app.

Make sure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-firebase-text-recognition/env_setup.png)

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
> As you add more native dependencies to your project, it may bump you over the 64K method limit on the Android build system. Once you reach this limit, you will start to see the following error while attempting to build your Android application.
>
> `Execution failed for task ':app:mergeDexDebug'.`
>
> Use [this documentation](https://rnfirebase.io/enabling-multidex) to enable multidexing.
> To learn more about multidex, view the official [Android documentation](https://developer.android.com/studio/build/multidex#mdex-gradle).

### Setting up the Firebase project
Head to the [Firebase console](console.firebase.google.com/u/0/) and sign in to your account.

Create a new project.

![Create New Project](/engineering-education/react-native-firebase-text-recognition/firebase_new.png)

Once you create a new project, you'll see the dashboard. Upgrade your project to the Blaze plan.

![New Dashboard](/engineering-education/react-native-firebase-text-recognition/new_dashboard.png)

Now, click on the Android icon to add an Android app to the Firebase project.

![register_app](/engineering-education/react-native-firebase-text-recognition/register_app.png)

You will need the package name of the application to register the application. You can find the package name in the `AndroidManifest.xml` which is located in `android/app/src/main/`.

![Package Name](/engineering-education/react-native-firebase-text-recognition/package_name.png)

Once you enter the package name and proceed to the next step, you can download the `google-services.json` file. You should place this file in the `android/app` directory.

![Download Google Services JSON](/engineering-education/react-native-firebase-text-recognition/download_services.json.png)

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

```Gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

You need to perform some additional steps to configure `Firebase` for `iOS`. Follow [this documentation](https://rnfirebase.io/#3-ios-setup) to set it up.

We should install the `@react-native-firebase/app` package in our app to complete the set up for Firebase.

```bash
npm install @react-native-firebase/app
```

### Setting up Cloud Vision API
Head to [Google Cloud Console](https://console.cloud.google.com/) and select the Google project that you are working on. Go to the API & Services tab.

![Cloud Dashboard](/engineering-education/react-native-firebase-text-recognition/cloud_dashboard.png)

In the API & Service tab, head to the Libraries section.

![API & Services Tab](/engineering-education/react-native-firebase-text-recognition/api_services.png)

Search for Cloud Vision API.

![API Library Section](/engineering-education/react-native-firebase-text-recognition/search_libraries.png)

Once you open the API page, click on the Enable button.

![Enable Cloud Vision](/engineering-education/react-native-firebase-text-recognition/enable_cloud_vision.png)

Once you've enabled the API, you'll see the Cloud Vision API Overview page.

![Cloud Vision Metrics](/engineering-education/react-native-firebase-text-recognition/cloud_vision_dashboard.png)

With this, you have set up the Cloud Vision API for your Firebase project. This will enable us to use the ML Kit to recognize text from images.

### Building the UI
We'll be writing all of our code in the `App.js` file.

Let's add 2 buttons to the screen to take a photo and pick a photo.

```JSX
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
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

![Buttons](/engineering-education/react-native-firebase-text-recognition/buttons_ui.jpg)

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

Both functions accept 2 arguments. The first argument is `options` for the camera or the gallery, and the second argument is a callback function. This callback function is called when the user picks an image or cancels the operation.

Check out this [API reference](https://www.npmjs.com/package/react-native-image-picker#api-reference) for more details about these functions.

Now let's add 2 functions, one for each button.

```JSX
const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);

const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);
```

Let's create a function called `onImageSelect`. This is the callback function that we are passing to the `launchCamera` and the `launchImageLibrary` functions. We will get the details of the image that the user picked in this callback function.

We should start the text recognition only when the user did not cancel the media picker. If the user canceled the operation, the picker will send a `didCancel` property in the response object.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    // Text Recognition Process
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

Now, let's add an image component below the buttons to display the selected image.

```JSX
<View>
  <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
    <Text style={styles.buttonText}>Take Photo</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
    <Text style={styles.buttonText}>Pick a Photo</Text>
  </TouchableOpacity>
  <Image source={{uri: image}} style={styles.image} resizeMode="contain" />
</View>
```

Styles for the image:

```JSX
image: {
  height: 300,
  width: 300,
  marginTop: 30,
  borderRadius: 10,
},
```

If the user did not cancel the operation, let's set the image state with the URI of the selected image in the `onImageSelect` function.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
  }
};
```

![Image UI](/engineering-education/react-native-firebase-text-recognition/with_image.jpg)

### Recognize the text from the image
Let's install the package for Firebase ML.

```bash
npm install @react-native-firebase/ml
```

Once the package is installed, let's import the package.

```JSX
import ml from '@react-native-firebase/ml';
```

We should use the `cloudDocumentTextRecognizerProcessImage` method in the `ml` package to process the image and recognize text from it.

We will pass the URI of the selected image to this function.

```JSX
const processingResult = await ml().cloudDocumentTextRecognizerProcessImage(media.uri);
```

The function will process the image and return the text recognized in the image along with an array of blocks of recognized text.

Each [block](https://rnfirebase.io/reference/ml/mldocumenttextblock) will contain details about:

- The bounding rectangle of the detected block of text in the image.

- The confidence the machine learning service has in the result.

- A list of recognized languages in that block.

- An array of [paragaraphs](https://rnfirebase.io/reference/ml/mldocumenttextparagraph) recognized in the block of text.

To learn more about the result object, refer to [the documentation](https://rnfirebase.io/reference/ml/mldocumenttext).

Let's set up a state to store the result and render it in the UI.

```JSX
const [result, setResult] = useState({});
```

Let's set the state to the response of the `cloudDocumentTextRecognizerProcessImage` function.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
    const processingResult = await ml().cloudDocumentTextRecognizerProcessImage(media.uri);
    console.log(processingResult);
    setResult(processingResult);
  }
};
```

We'll use this state to render the recognized text in the UI.

```JSX
<View style={{marginTop: 30}}>
  <Text style={{fontSize: 30}}>{result.text}</Text>
</View>
```

![Final Result](/engineering-education/react-native-firebase-text-recognition/final_result.jpg)

### Additional configurations
The `cloudDocumentTextRecognizerProcessImage` method accepts an optional [configuration object](https://rnfirebase.io/reference/ml/mlclouddocumenttextrecognizeroptions).

- **languageHints**: In most cases, not setting this yields the best results since it enables automatic language detection. For languages based on the Latin alphabet, setting language hints is not needed. In rare cases, when the language of the text in the image is known, setting a hint will help get [better results](https://rnfirebase.io/reference/ml/mlclouddocumenttextrecognizeroptions#languageHints) (although it will be a significant hindrance if the hint is wrong). 

- **apiKeyOverride**: API key to use for the ML API. If not set, the default API key from `firebase.app()` will be used.

- **enforceCertFingerprintMatch**: Only allow registered application instances with a matching certificate fingerprints to use ML API.

Example: 

```JSX
await ml().cloudDocumentTextRecognizerProcessImage(imagePath, {
  languageHints: ["en"], // string[]
  apiKeyOverride: "<-- API KEY -->",  // undefined | string,
  enforceCertFingerprintMatch: true, // undefined | false | true,
});
```

### Let's Recap
1. We set up our development environment and created a React Native app.

2. We created a Firebase project.

3. We set up the Cloud Vision API to use the image text recognizer in the Firebase ML Kit.

4. We built a simple UI for the app with 2 buttons.

5. We added the `react-native-image-picker` package to pick images using the gallery or capture images using the camera.

6. We installed the Firebase ML package.

7. We used the `cloudDocumentTextRecognizerProcessImage` method in the `ml` package to recognize the text from the image.

8. We displayed the result in the UI.

9. We learned about the additional configurations that we can pass to the `cloudDocumentTextRecognizerProcessImage` function.

Congratulations, :partying_face: You did it.

Thanks for Reading!

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)



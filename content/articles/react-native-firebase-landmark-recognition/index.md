---
layout: engineering-education
status: publish
published: true
url: /react-native-firebase-landmark-recognition/
title: Landmark Recognition Using Firebase ML in React Native
description: This tutorial gives readers a detailed guide on implementing landmark recognition using Firebase ML kit in a Non-Expo React Native application.
author: mohan-raj
date: 2021-02-01T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/react-native-firebase-landmark-recognition/hero.jpg
    alt: React Native Landmark Recognition With Firebase Hero Image
---
In this tutorial, we will build a React Native application **without** Expo to recognize landmarks from images using the machine learning kit from Firebase.
<!--more-->
### Firebase
Firebase is Google's mobile platform that helps you quickly develop high-quality apps and grow your business.

[Firebase's ML](https://firebase.google.com/docs/ml) Kit is a mobile SDK that brings Google's machine learning expertise to Android and iOS apps. There's no need to have deep knowledge of neural networks or model optimization to get started with the ML kit. On the other hand, if you are an experienced ML developer, this article will provide APIs that help you use custom [TensorFlow Lite models](https://www.tensorflow.org/lite/models) in your mobile apps. 

### Prerequisites
To proceed with this tutorial:

- You'll need a basic knowledge of React & React Native. 

- You'll need a Firebase project with the [Blaze plan](https://firebase.google.com/pricing) enabled to access the Cloud Vision APIs.

### Development environment
> **IMPORTANT** - We will not be using [Expo](https://expo.io/) in our project.

You can follow [this documentation](https://reactnative.dev/docs/environment-setup) to set up the environment and create a new React app.

Ensure you're following the React Native CLI Quickstart, not the Expo CLI Quickstart.

![Env Setup](/engineering-education/react-native-firebase-landmark-recognition/env_setup.png)

Head to [Firebase Console](https://console.firebase.google.com/u/0/) and create a new project.

Follow this [documentation](https://rnfirebase.io/) to set up Firebase in your React Native application.

Make sure you enable the [Cloud Vision API](https://console.cloud.google.com/apis/library/vision.googleapis.com?) for your Firebase Project.

### Clone the starter code
To focus more on the ML kit, I've prepared a starter code. You can clone it from this [GitHub repository](https://github.com/zolomohan/react-native-firebase-landmark-recognition-starter).

You can check out the final code in this [GitHub Repository](https://github.com/zolomohan/react-native-firebase-ml-landmark-recognition).

In the starter code, I've added 2 buttons: One to pick a photo from the gallery and one to take a photo using the `react-native-image-picker` library. When the user selects the image, use a state to store the image's URI and display it on the UI.

![With Image](/engineering-education/react-native-firebase-landmark-recognition/with_image.jpg)

If you'd like to learn how to build this starter code, refer to my previous article about [Image Labeling using Firebase ML in React Native](/react-native-firebase-image-labeling/).

### Recognize landmarks from images
Let's install the package for Firebase ML.

```bash
npm install @react-native-firebase/ml
```

In *App.js*, import the Firebase ML package.

```JSX
import ml from '@react-native-firebase/ml';
```

The `cloudLandmarkRecognizerProcessImage` method in the `ml` package is used to process the image and get the landmarks in the image.

We should pass the URI of the selected image to this function.

I've already set up a function called `onImageSelect` that will be called when a user selects an image.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
    // Recognize Landmarks Here
  }
};
```

We should call the `cloudLandmarkRecognizerProcessImage` in this function to recognize the landmarks in the selected image.

```JSX
const landmarks = await ml().cloudLandmarkRecognizerProcessImage(media.uri);
```

The function will process the image and return the list of landmarks that are identified in the image along with:

- The 4-point coordinates of the landmarks on the image.

- Latitude & Longitude of the landmarks.

- The confidence the Machine Learning service has in its results.

- An entity ID for use on Google's [Knowledge Graph Search API](https://developers.google.com/knowledge-graph/).

Let's set up a state to store the results. Since the result will be an array of landmarks, the initial state should be an empty array.

```JSX
const [landmarks, setLandmarks] = useState([]);
```

Let's set the state as the response of the `cloudLandmarkRecognizerProcessImage` function.

```JSX
const onImageSelect = async (media) => {
  if (!media.didCancel) {
    setImage(media.uri);
    const landmarks = await ml().cloudLandmarkRecognizerProcessImage(
      media.uri,
    );
    setLandmarks(landmarks);
  }
};
```

We'll render the UI using the state that we set up.

```JSX
{landmarks.map((item, i) => (
  <View style={{ marginTop: 20, width: 300 }} key={i}>
    <Text>LandMark: {item.landmark}</Text>
    <Text>BoundingBox: {JSON.stringify(item.boundingBox)}</Text>
    <Text>Coordinates: {JSON.stringify(item.locations)}</Text>
    <Text>Confidence: {item.confidence}</Text>
    <Text>Confidence: {item.entityId}</Text>
  </View>
))}
```

![Final Result](/engineering-education/react-native-firebase-landmark-recognition/final_result.jpg)

### Additional configurations
The `cloudLandmarkRecognizerProcessImage` method accepts an optional configuration object.

- **maxResults**: Sets the maximum number of results of this type.

- **modelType**: Sets the model type for detection. By default, the function will use the `STABLE_MODEL`. However, if you feel that the results are not up-to-date, you could also use the `LATEST_MODEL`.

- **apiKeyOverride**: API key to use for ML API. If not set, the default API key from `firebase.app()` will be used.

- **enforceCertFingerprintMatch**: Only allow registered application instances with matching certificate fingerprints to use ML API.

Example:

```JSX
import ml, { MLCloudLandmarkRecognizerModelType } from '@react-native-firebase/ml';

await ml().cloudImageLabelerProcessImage(imagePath, {
  maxResults: 2, // undefined | number
  modelType: MLCloudLandmarkRecognizerModelType.LATEST_MODEL, // LATEST_MODEL | STABLE_MODEL
  apiKeyOverride: "<-- API KEY -->",  // undefined | string,
  enforceCertFingerprintMatch: true, // undefined | false | true,
});
```

### Conclusion
We used the Firebase ML package to Recognize landmarks from an image selected by the user using the `cloudLandmarkRecognizerProcessImage` method. We also learned about the additional configurations that we can pass to the `cloudLandmarkRecognizerProcessImage` method.

Congratulations, :partying_face: You did it.

Thanks for Reading!

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)

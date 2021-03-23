---
layout: engineering-education
status: publish
published: true
url: /engineering-education/speech-command-recognition-with-tensorflow-and-react/
title: Speech Command Recognition With Tensorflow.js and React.js
description: In this tutorial, we will perform speech command recognition in real-time and demonstrate the result of predictions.
author: worawat-kaewsanmaung
date: 2021-03-15T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/speech-command-recognition-with-tensorflow-and-react/hero.png
    alt: Speech Command Recognition in a React Project with Tensorflow 
---
There are many AI-powered computer systems nowadays that can use speech-based communication to communicate with humans. The main logic that is used in these types of systems is the ability to recognize speech and perform tasks accordingly. In this tutorial, we are going to explore the basics of speech/command recognition using a speech-command recognizer model provided by TensorFlow in a React app ecosystem. The tutorial also demonstrates the use of a system microphone for speech audio input and listen to the audio to make probabilistic predictions.
<!--more-->
In this tutorial, we will learn how to perform speech command recognition in real-time and demonstrate the result of predictions. Then, we are going to load the speech-commands model provided by TensorFlow.org. Feeding the audio data to the model neural network, we are going to listen to the audio and make the predictions. Lastly, we are also going to improve the accuracy recognition by applying the argmax function to our model.

### What we will cover in this tutorial...

- To access the audio data stream from the browser microphone.
- To precise, the speech commands using the pre-trained speech-commands model from TensorFlow.
- To improve the overall prediction/recognition probability by using the argmax function.

*Let's get started!*

### Create React Project
First, we are going to create a new React App project. For that, we need to run the following command in the required local directory:

```jsx
npx create-react-app speech_command
```

Then, we need to open the project in our code editor IDE (VScode) as shown in the screenshot below:

![create new react app](/engineering-education/speech-command-recognition-with-tensorflow-and-react/1-create-new-react-app.png)

Now, we can execute the command  `yarn start` or `npm start` to run the project on the port 3000 of our [localhost](http://localhost):

![preview react app](/engineering-education/speech-command-recognition-with-tensorflow-and-react/2-preview-react-app.png)

### Installing Tensorflow.JS & Speech Command Recognition

Now, we are going to install the main TensorFlow.JS package along with the speech commands recognition package provided by TensorFlow.org. for installation package, we need to execute the following command in our project commmand line or terminal:

```bash
yarn add @tensorflow/tfjs @tensorflow-models/speech-commands
```

- @tensorflow/tfjs: It is the core Tensorflow package based on JavaScript.
- @tensorflow-models/speech-commands: It is a Tensorflow models that enables us to perform recognition of spoken commands.

### Importing Dependencies

After the successful installation of the required packages. we need to import them in the App.js file of our React project as shown in the code snippet below:

```jsx
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"
```

### Setting Up the Application States

Then, we need to define the state variable for model, action, and labels using the `useState` hook as shown in the code snippet below:

```jsx
export default () => {
const [model, setModel] = useState(null)
const [action, setAction] = useState(null)
const [labels, setLabels] = useState(null)
```

They are all initialized to null value at the start.

### Load the Speech Recognizer Model

Here, we are going to create a function called `loadModel` that loads the Speech Recognizer model into our app. First, a `recognizer` is initialized using the `create` method provided by the `speech` module. This loads the speech model in the app. Then, we ensure that the model is loaded using the `ensureModelLoaded` method from the `recognizer`. Then, we set the `recognizer` to `models` state and `wordLabels` in the recognizer to `labels` state. Then, we call the `loadModel` function inside the `useEffect` hook so that it is triggered when the app starts. The implementation is shown in the code snippet below:

```jsx
const loadModel = async () =>{
  const recognizer = await speech.create("BROWSER_FFT")
  console.log('Model Loaded')
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels())
  setModel(recognizer)
  setLabels(recognizer.wordLabels())
}

useEffect(()=>{loadModel()}, []);
```

Now, when we reload our app, we will see the model is loaded and the labels logged in the console as shown in the screenshot below:

![list of command](/engineering-education/speech-command-recognition-with-tensorflow-and-react/3-list-of-command.png)

### Activating Speech Recognizer

In this step, we are going to activate our speech recognizer i.e. start listening to audio speech. For that, we are going to implement a function called `recognizeCommands`. Inside the function, we are going to listen to audio using `listen` method from the `model` state then log the `spectrogram` result of the speech. The additional option of `probabilityThreshold` is applied to improve the recognition. Lastly, we apply the `setTimeout` callback to trigger the `stopListening` method in order to stop the speech recognizer. The overall implementation is provided in the code snippet below:

```jsx
const recognizeCommands = async () => {
    console.log("Listening for commands");
    model.listen(
      (result) => {
        console.log(result.spectrogram);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    );
    setTimeout(() => model.stopListening(), 10e3);
  };
```

Next, we add a button to activate the browser microphone whose `onClick` event will trigger the `recognizeCommands` function as shown in the code snippet below:

```jsx
<button onClick={recognizeCommands}>Press to Speak</button>
```

Now once we click on the button, the model in the app will start listening to speech as shown in the screenshot below:

![listening for command](/engineering-education/speech-command-recognition-with-tensorflow-and-react/4-listening-for-command.png)

This completes the speech recognition feature implementation in React app. We can now run the app and detect the speech audio.

But why not improve the speech detection result. To improve the detection result we are going to use the argmax function.

### Add argmax for Highest Probability Detection

Now, we are going to add the `argmax` function to our speech recognizer model to improve its detection to the highest possible result. The actual source code for this function can be found [here](https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28).

```jsx
function argMax(arr){
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}
```

The function uses `map` logic along with `reduce` method to improve the overall probability of detection. Hence, it is a Map-Reduce algorithm.

Now, we are going to apply the `argMax` function to our model and set the `labels` to `action` state as shown in the code snippet below:

```jsx
const recognizeCommands = async () =>{
  console.log('Listening for commands')
  model.listen(result=>{
    setAction(labels[argMax(Object.values(result.scores))])
  }, {includeSpectrogram:true, probabilityThreshold:0.7})
  setTimeout(()=>model.stopListening(), 10e3)
}
```

### Displaying Commands to the Screen

Lastly, we display the result of the action or commands to the screen using conditional rendering as shown in the code snippet below:

```jsx
{action ? <div>{action}</div>:<div>No Action Detected</div> }
```

Hence, we get the result as shown in the demo on [Codesandbox](https://codesandbox.io/s/lucid-http-u1r70?from-embed)

### Conclusion

In this tutorial, we learned how to use the speech-commands recognizer TensorFlow model to detect the speech in our React app. Due to the availability of a speech-commands recognizer COCO TensorFlow model, the overall implementation the speech recognition on a React app was simplified and made easy.
The main objective of this tutorial was to explore the use cases of the speech-commands recognizer model and use it to create a simple speech recognizer React app. Such a speech recognizer feature is highly useful for many audio-text-based applications. Such a command recognizer can be used to build a robot or any AI-based application that takes in audio input as a command to trigger actions.

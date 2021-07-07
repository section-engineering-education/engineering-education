---
layout: engineering-education
status: publish
published: true
url: /speech-command-recognition-with-tensorflow-and-react/
title: Speech Command Recognition with Tensorflow.js and React.js
description: In this tutorial, we will perform speech command recognition in real-time and demonstrate the result of predictions.
author: worawat-kaewsanmaung
date: 2021-03-26T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/speech-command-recognition-with-tensorflow-and-react/hero.png
    alt: Speech Command Recognition in a React Project with Tensorflow 
---
There are many AI-powered computer systems nowadays that can use speech-based communication to communicate with humans. The main logic that is used in these types of systems is the ability to recognize speech and perform tasks accordingly. 
<!--more-->
In this tutorial, we are going to explore the basics of speech/command recognition using a speech-command recognizer model provided by TensorFlow in a React app ecosystem. 

We will also demonstrate the use of a system microphone for speech audio input and listen to the audio to make probabilistic predictions. We will learn how to perform speech command recognition in real-time and demonstrate the result of predictions. 

Then, we are going to load the speech-commands model provided by TensorFlow.org. Feeding the audio data to the model neural network, we are going to listen to the audio and make the predictions. Finally, we will also improve the accuracy of recognition by applying the argmax function to our model.

### What we will cover in this tutorial
- How to access the audio data stream from the browser microphone.
- How to be precise with the speech commands using the pre-trained speech-commands model from TensorFlow.
- How to improve the overall prediction/recognition probability by using the argmax function.

*Let's get started!*

### Create a React project
First, we are going to create a new React App project. For that, we need to run the following command in the required local directory:

```bash
npx create-react-app speech_command
```

Then, we need to open the project in our code editor IDE (VSCode) as shown in the screenshot below:

![create new react app](/engineering-education/speech-command-recognition-with-tensorflow-and-react/1-create-new-react-app.png)

Now, we can execute the command  `yarn start` or `npm start` to run the project on the port 3000 of our [localhost](http://localhost:3000):

![preview react app](/engineering-education/speech-command-recognition-with-tensorflow-and-react/2-preview-react-app.png)

### Installing Tensorflow.js & Speech command recognition
Now, we are going to install the main TensorFlow.js package along with the speech commands recognition package provided by TensorFlow.org. 

To install the package, we need to execute the following command in our project command line or terminal:

```bash
yarn add @tensorflow/tfjs @tensorflow-models/speech-commands
```

- @tensorflow/tfjs: This is the core Tensorflow package based on JavaScript.
- @tensorflow-models/speech-commands: This is a Tensorflow model that enables us to perform recognition of spoken commands.

### Importing dependencies
After the successful installation of the required packages. We need to import them in the App.js file of our React project as shown in the code snippet below:

```jsx
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"
```

### Setting up the application states
Then, we need to define the state variable for model, action, and labels using the `useState` hook as shown in the code snippet below:

```jsx
export default () => {
const [model, setModel] = useState(null)
const [action, setAction] = useState(null)
const [labels, setLabels] = useState(null)
```

They are all initialized to null value at the start.

The `useState` hook enables us to define the state variable which is a way to preserve the values between the function calls. The hook method takes in a initialization parameter of any data type and returns two pair of values. 

One value is the current state which in the code snippet above are `model`, `action`, and `labels`. Another is the function that is used to update the state which in the above code are `setModel`, `setAction`, `setLabels`.  

Now as an example, you can simply use the update function to update state as shown in the code snippet below:

### Load the speech recognizer model
Here, we are going to create a function called `loadModel` that loads the Speech Recognizer model into our app. First, a `recognizer` is initialized using the `create` method provided by the `speech` module. 

This loads the speech model in the app. Then, we ensure that the model is loaded using the `ensureModelLoaded` method from the `recognizer`. 

We can then set the `recognizer` to `models` state and `wordLabels` in the recognizer to `labels` state. Next we will call the `loadModel` function inside the `useEffect` hook so that it is triggered when the app starts. 

The implementation is shown in the code snippet below:

```jsx
const loadModel = async () =>{
  // start loading model
  const recognizer = await speech.create("BROWSER_FFT") 
 // check if model is loaded
  await recognizer.ensureModelLoaded();
  // store model instance to state
  setModel(recognizer)
 // store command word list to state
  setLabels(recognizer.wordLabels())
}
useEffect(()=>{loadModel()}, []);
```

The useEffect hook enables us to perform operations in a React component. This hook runs when the component mounts to the DOM. So, any functional calls that need to be triggered automatically when the template mounts are to be kept inside the useEffect hook. 

The first parameter takes in a functional callback to which we can apply any code expressions. The second parameter allows us to track the changes in the state which in turn triggers the callback. 

In the code snippet above, we have called the loadModel method inside the useEffect hook with no tracking state in its second parameter. Hence, the loadModel method will be triggered once the component mounts.

Now, when we can reload our app, we will see the model is loaded and the labels logged in the console as shown in the screenshot below:

![list of command](/engineering-education/speech-command-recognition-with-tensorflow-and-react/3-list-of-command.png)

### Activating speech recognizer
In this step, we are going to activate our speech recognizer i.e. start listening to audio speech. For that, we are going to implement a function called `recognizeCommands`. Inside the function, we are going to listen to audio using the `listen` method from the `model` state then log the `spectrogram` result of the speech. 

The additional option of `probabilityThreshold` is applied to improve the recognition. Lastly, we apply the `setTimeout` callback to trigger the `stopListening` method in order to stop the speech recognizer. 

The overall implementation is provided in the code snippet below:

```jsx
const recognizeCommands = async () => {
    console.log("Listening for commands");
    // start model and listen for command
    model.listen(
      (result) => {
        // print result
        console.log(result.spectrogram);
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    );
    // set timeout after which the stops listening 
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

### Add argmax for the highest probability detection
Now, we are going to add the `argmax` function to our speech recognizer model to improve its detection to the highest possible result. 

The actual source code for this function can be found [here](https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28).

```jsx
function argMax(arr){
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}
```

The function uses `map` logic along with the `reduce` method to improve the overall probability of detection. Hence, it is a Map-Reduce algorithm.

The `map` function takes in the input, converts the input into a key-value pair, and sorts the data. The output of the map function is input to reduce function.

The `reduce` function takes in the sorted key-value data from the `map` function. Then, it searches and compares the matching pair of data and reduces them. It prevents redundancy and eliminates duplicate pairs.

Now, we are going to apply the `argMax` function to our model and set the `labels` to `action` state as shown in the code snippet below:

```jsx
const recognizeCommands = async () =>{
  console.log('Listening for commands')
   // start model to listening command
  model.listen(result=>{
    // add argMax function
    setAction(labels[argMax(Object.values(result.scores))])
  }, {includeSpectrogram:true, probabilityThreshold:0.7})
      // set timeout for stop working 
  setTimeout(()=>model.stopListening(), 10e3)
}
```

### Displaying commands to the screen
Finally, we will display the result of the action or commands to the screen using conditional rendering as shown in the code snippet below:

```jsx
{action ? <div>{action}</div>:<div>No Action Detected</div> }
```

Hence, we get the result as shown in this demo on [Codesandbox](https://codesandbox.io/s/lucid-http-u1r70?from-embed).

### Conclusion
In this tutorial, we have learned how to use the speech-commands recognizer TensorFlow model to detect the speech in our React app. 

Due to the availability of a speech-commands recognizer COCO TensorFlow model, the overall implementation the speech recognition on a React app was simplified and made easy.

The main objective of this tutorial was to explore the use cases of the speech-commands recognizer model and use it to create a simple speech recognizer React app. 

Such a speech recognizer feature is highly useful for many audio-text-based applications. Such a command recognizer can be used to build a robot or any AI-based application that takes in audio input as a command to trigger actions.

Happy coding.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
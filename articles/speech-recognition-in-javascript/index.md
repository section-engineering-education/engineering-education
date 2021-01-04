---
layout: engineering-education
status: publish
published: true
url: /engineering-education/speech-recognition-using-web-speech-api-in-javascript/
title: Speech Recognition Using the Web Speech API in JavaScript
description: This tutorial will give readers a detailed guide on how to implement speech recognition using the Web Speech API in JavaScript.
author: mohan-raj
date: 2020-12-31T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/speech-recognition-using-web-speech-api-in-javascript/hero.jpg
    alt: Speech Recognition in JavaScript Hero Image
---
The Web Speech API is used to incorporate voice data into web apps. In this tutorial, we will build a simple webpage that uses the Web Speech API to implement speech recognition.
<!--more-->

You can check the browser compatibility for the Web Speech API [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#Browser_compatibility.).

### Prerequisites
To follow along with this tutorial, you should have:

- A basic understanding of HTML and JavaScript.

- A code editor. I'll be using [Visual Studio Code](https://code.visualstudio.com/download).

- A browser to view the webpage, preferably [Google Chrome](https://www.google.com/intl/en_in/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/).

### Cloning the Starter Code
To focus more on speech recognition, I've prepared a starter code. You can clone it [from this repository](https://github.com/zolomohan/speech-recognition-in-javascript-starter) on GitHub. Follow the Repository's README for instructions.

You can take a look at the final code in this [GitHub Repository](https://github.com/zolomohan/speech-recognition-in-javascript).

In the starter code, I've set up a language and dialect select menu, two buttons to start/stop the speech recognition, and a box to display the transcript. I've used [Bootstrap](https://getbootstrap.com/) to style the webpage.

![Starter Code Screen](/engineering-education/speech-recognition-using-web-speech-api-in-javascript/start_screen.png)

### Let's code
Create a new JavaScript file and name it `speechRecognition.js`. Now add the script to the HTML file using the `script` tag after the `body` tag. 

> Adding the `script` tag after the `body` tag will make sure that the script file is loaded after all the elements have been loaded to the DOM.

```html
<script src="./speechRecognition.js"></script>
```

Now, inside the script file, let's check if the `webkitSpeechRecognition` class is available in the `window` object. If not, let's `console.log` that it's not available.

```JavaScript
if ("webkitSpeechRecognition" in window) {

  // Speech Recognition Stuff goes here

} else {
  console.log("Speech Recognition Not Available")
}
```

### Initialization
Everything we write from now on goes inside the `if` condition.

Let's create a `webkitSpeechRecognition` object.

```JavaScript
let speechRecognition = new webkitSpeechRecognition();
```

### Properties
Now, let's configure some properties on this `speechRecognition` object.

#### Continuous listening
The speech recognition object can either stop listening after the user stops speaking or it can keep listening until the user stops it. If you only want to recognize a phrase or a word, you can set this to `false`. For this tutorial, let's set it to `true`.

```JavaScript
speechRecognition.continuous = true;
```

#### Interim results
Interim results are results that are not yet final. If you enable this property, the `speechRecognition` object will also return the interim results along with the final results. Let's set it to `true`.

```JavaScript
speechRecognition.interimResults = true;
```

#### Language
This is the language that the user will speak in. You need to use locale codes to set this property. Please note that not all languages are available in this feature yet.

Let's set the language that the user has chosen from the select menu. You need to select the Dialect select menu and use its value for the language property.

```JavaScript
  speechRecognition.lang = document.querySelector("#select_dialect").value;
```

### Events & Callbacks
You can provide callbacks for events like `onStart`, `onEnd`, `onResult`, and `onError`.

#### onStart
This event is triggered when speech recognition is started by the user. Let's pass a callback function that will display that the speech recognition instance is listening on the webpage.

In the starter code, there is a `<p>` element with an ID called status that says `Listening...`. It's been hidden by setting the display property of the element to none using CSS.

Let's set it to `display: block` when the speech recognition starts.

```JavaScript
speechRecognition.onstart = () => {
  document.querySelector("#status").style.display = "block";
  console.log("Speech Recognition Started");
};
```

#### onEnd
This event is triggered when speech recognition is ended by the user. Let's pass a callback function that will hide the status `<p>` element in the webpage.

Let's set it to `display: none` when the speech recognition starts.

```JavaScript
speechRecognition.onend = () => {
  document.querySelector("#status").style.display = "none";
  console.log("Speech Recognition Ended");
};
```

#### onError
This event is triggered when there is some sort of error in speech recognition. Let's pass a callback function that will hide the status `<p>` element in the webpage.

Let's set it to `display: none` when the speech recognition starts.

```JavaScript
speechRecognition.onError = () => {
  document.querySelector("#status").style.display = "none";
  console.log("Speech Recognition Error");
};
```

#### onResult
This event is triggered when the `speechRecognition` object has some results from the recognition. It will contain the final results and interim results. Let's pass a callback function that will set the results to the respective `<span>` inside the transcript box.

This is the HTML code for the transcript box on the web page. The interim results span is colored in a different color to differentiate between the interim results and the final results.

```html
<div class="p-3" style="border: 1px solid gray; height: 300px; border-radius: 8px;">
  <span id="final" class="text-light"></span>
  <span id="interim" class="text-secondary"></span>
</div>
```

We need to set the interim results to the `span` with the ID interim and the final results to the `span` with the ID final.

The result event will pass an `event` object to the callback function. This object will contain the results in the form of an array. Each element in the array will have a property called `isFinal` denoting whether that item is an interim result or a final result.

Let's declare a variable for the final transcript outside the callback function and a variable for the interim transcript inside the callback function. 

```JavaScript
let final_transcript = "";

speechRecognition.onresult = (event) => {
  let interim_transcript = "";
};
``` 

Now let's build a string from the results array. We should run it through a loop and add the result item to the final transcript if the result item is final. If not, we should add it to the interim results string.

```JavaScript
for (let i = event.resultIndex; i < event.results.length; ++i) {
  if (event.results[i].isFinal) {
    final_transcript += event.results[i][0].transcript;
  } else {
    interim_transcript += event.results[i][0].transcript;
  }
}
``` 

Finally, let's update the DOM with the transcript values.

```JavaScript
document.querySelector("#final").innerHTML = final_transcript;
document.querySelector("#interim").innerHTML = interim_transcript;
```

This is the complete code snippet for the `onResult` event.

```JavaScript
let final_transcript = "";

speechRecognition.onresult = (event) => {
  let interim_transcript = "";

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  document.querySelector("#final").innerHTML = final_transcript;
  document.querySelector("#interim").innerHTML = interim_transcript;
};
``` 

### Start/Stop Recognition
Finally, Let's start and stop recognition.

We need to set the onClick property of the start and stop buttons to start and stop the speech recognition.

```JavaScript
document.querySelector("#start").onclick = () => {
  speechRecognition.start();
};
document.querySelector("#stop").onclick = () => {
  speechRecognition.stop();
};
```

Here is the final code for `speechRecognition.js`:

```JavaScript
if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };
} else {
  console.log("Speech Recognition Not Available");
}
```

### Result

![Final Result](/engineering-education/speech-recognition-using-web-speech-api-in-javascript/final.gif)

### Let's Recap

- We cloned the starter code from the GitHub repository.

- We created a new JavaScript file and linked it to the HTML file.

- We checked whether the `webkitSpeechRecognition` class was available on the `window` object.

- We created a new instance of the `webkitSpeechRecognition` class.

- We set some properties like `continuous`, `interimResults`, and `language` on that speech recognition instance.

- We added callback methods for different events like `onStart`, `onEnd`, `onError`, and `onResult`.

- We set the onClick property of the start and stop buttons to start and stop the speech recognition.

Congratulations, :partying_face: You did it.

Thanks for reading!
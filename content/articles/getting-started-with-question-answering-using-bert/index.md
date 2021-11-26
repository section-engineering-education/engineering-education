---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-question-answering-using-bert/
title: Getting Started with Question Answering (Q&A) using BERT
description: This tutorial will cover how to build a Question-Answering web application using Google's BERT model. We will learn how we can leverage the pre-trained BERT model to build a BERT-powered question-and-answer web application.
author: lilian-tonia
date: 2021-11-24T00:00:00-17:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-question-answering-using-bert/hero.png
    alt: Getting Started with Question Answering (Q&A) using BERT Hero Image
---
This tutorial will cover how to build a Question-Answering web application using Googles BERT model.
<!--more-->
### Prerequisites
To follow allow with this tutorial, the reader will need to be familiar with:
- [React](https://reactjs.org/docs/create-a-new-react-app.html)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Visual studio code](https://code.visualstudio.com/)

### Table of contents
- [What is BERT](#what-is-bert)
- [How to install the BERT model and import its dependencies](#how-to-install-the-bert-model-and-import-its-dependencies)
- [Loading the tensorflow model](#loading-the-tensorflow-model)
- [Creating an interface to capture the questions and answers](#creating-an-interface-to-capture-the-questions-and-answers)
- [Conclusion](#conclusion)

### What is BERT
Bidirectional Encoder Representations from Transformers (BERT) is a natural language processing model that uses transformers to accomplish a wide variety of NLP tasks. Some of the tasks where this model performs well include Question Answering, [Natural Language Inference](http://nlpprogress.com/english/natural_language_inference.html), and [Named Entity Recognition](https://en.wikipedia.org/wiki/Named-entity_recognition). 

Please refer to this [article](/engineering-education/introducing-gpt3/) to learn more about BERT and how it compares to other natural language processing models such as GPT-3. This model was originally presented by [Jacob Devlin and his research team at Google in 2018](https://en.wikipedia.org/wiki/BERT_(language_model)).

### How to install the BERT model and import its dependencies
We will be using the pre-built BERT model from TensorFlow.js for this build. Pre-trained models make it easy to get started with huge models without getting involved with much setup and training.

We will be installing three packages. `@tensorflow/tfjs` to install the tensorflow.js library, `@tensorflow-models/qna` to download the question-answering model, and `react-loader-spinner` to give us a nice loading interface as our BERT model is being downloaded. It is quite a large model. Thus, a nice loading interface would come in handy.

```js
npm i @tensorflow/tfjs @tensorflow-models/qna react-loader-spinner
```

After a successful installation, you can start up the react app to see if everything is okay. We start it using the `npm start` command as shown below:

```js
npm start
```
If you see a "Hello World!" on the screen, we are good to go. This means that the app is functioning well. You can stop the app on the terminal by pressing `CTRL+C` simultaneously. We can now go ahead and import the required dependencies.

```js
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Fragment } from 'react';
```

Our first import allows us to refer to the tensorflow.js library in our code as `tf`. The second import allows us to refer to the BERT model inside our code as `qna`. The third and fourth import imports the css style for our loader that we mentioned above. Lastly, we've imported `Fragment`, which allows us to return multiple elements without adding extra nodes to the DOM. 

The next step involves setting up our references and state hooks. Hooks tend to create a symbolic link to various elements. By default, the React library imports the following hooks; `useRef`, `useEffect`, and `useState`. 

You can see it at the top on the `App.js` file. `useState` allows us to work with states within our react app. It will be used to store our questions and passage. For a detailed explanation about hooks and references in React, please refer to this [documentation](https://reactjs.org/docs/hooks-intro.html).

```js
  const passageRef = useRef(null); 
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState(); 
  const [model, setModel] = useState(null); 
```

We've set up two references and state hooks.

### Loading the tensorflow model

```js
const loadModel = async ()=>{
    const loadedModel = await qna.load()
    setModel(loadedModel); 
    console.log('Model loaded successfully!')
  } 
```

The code above goes ahead and loads our `qna` model. We've written a new function, made it asynchronous, and named it `loadModel`. Inside that function, we've created a new variable known as `loadedModel`, and then we await our `qna` model to load. 

This is going to load the question-answering model into our app. Eventually, we should see `Model loaded successfully` to our console if our model loads successfully. 

To run that function, we can go ahead and write the following code:

```js
useEffect(()=>{loadModel()}, [])
```

The `[]` square brackets tell us how many times we want the model to load. In our case, only once. We don't want the model to load every time as it's too big. So the square brackets tell it to run only once using the `useEffect` hook. 

At this point, you can try and re-start your react app to see whether the app starts and loads the model successfully. Please give it some time to load. You'll see the `Model loaded successfully!` on the console log if everything is okay. You can now close the app.

Let's now define a function that allows us to ask questions to the model. After setting up this function, we'll hook it up to our user interface.

```js
const questionAnswer = async (e) =>{
    if (e.which === 13 && model !== null ){
      console.log('Successfully submitted a question')
      const passage = passageRef.current.value
      const question = questionRef.current.value

      const answers = await model.findAnswers(question, passage)
      setAnswer(answers); 
      console.log(answers)

    }  
  }
```

Now that our `questionAnswer` function is done. We've made the function asynchronous as we'll have to "await" our model to respond with our answers. The line of code `(e.which === 13 && model !== null )` checks whether a user has pressed the `Enter` button on our keyboard to submit a question. It also makes sure that our model is loaded before submitting the question. 

The variables `passage`, and `question` grab the passage and question values respectively to be able to go ahead and ask that question. Please remember that our passage and question are hooked up to `passageRef` and `questionRef` to our references. We then pass our passage and question to our model so that it can find answers. These answers are stored in a variable known as `answers`. We then push these answers into the `setAnswer` state. 

Let's now go ahead and create our user interface so that all these codes can make sense and see the entire flow of our application. 

### Creating an interface to capture the questions and answers
```js
 return (
    <div className="App">
      <header className="App-header">
        {model ==null ? 
          <div>
            <div>The model is loading</div>      
            <Loader
            type="TailSpin"
            color="#028A0F" 
            height={100}
            width={100}/>
          </div> 
          :  
          <React.Fragment>
            Passage
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            Ask a Question
            <input ref={questionRef} onKeyPress={questionAnswer} size="80"></input>
            <br /> 
            Answers
            {answer ? answer.map((ans, idx) =><div><b>Answer {idx+1} - </b> {ans.text} ({Math.floor(ans.score*100)/100})</div>) : ""}
            </React.Fragment>
        } 
      </header>
    </div>
  );
}
```

That's our user interface code written in full. Quite a lot of code there. Let me explain. 

First, we are checking if our model has loaded using `model ==null ?`. If the model is loading, we display a `div` with the string, `The model is loading`. We then use our `Loader` function which we imported earlier to display a beautiful loader interface. 

You can play around with the `type`, `color`, `height`, and `width`. Refer to this [article](https://www.npmjs.com/package/react-loader-spinner) to learn more. If our model was loaded, we use `React.Fragment` to go ahead and define our user interface. It allows us to render multiple elements. 

> By default, React only allows us to render one element.

Our user interface has three key parts. The `Passage`, `Ask a Question`, and `Answers` parts. The `Passage` is a text area where we put a passage that we want the model to read through. The `Ask a Question` area allows us to pass our input question. On key press (Enter).

This triggers the `questionAnswer` function which we defined earlier, runs our passage and question to the model, and returns an answer. If we've got no answer, then we are going to display nothing. Finally, the model performs evaluations and score readings from the model. 

### Conclusion
This tutorial has demonstrated how we can leverage the pre-trained BERT model to build a BERT-powered question-and-answer web application. We can pass through a passage, ask it a question, and by using that passage, the model can extrapolate and give you an answer back from that passage. 

You can try it out yourself. Grab any passage from Wikipedia and wait to see what answers it will give and their score values.

Happy coding!

### References
- [Question and Answer Pretrained Model](https://github.com/tensorflow/tfjs-models/tree/master/qna)
- [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

### Introduction
Everybody knows that Machine Learning is mathematically intensive. For most beginners, trying to get into Machine Learning is a challenge.However, Brain.js makes the task easier, as it completely hides the mathematical logic and complexity that comes with understanding neural networks. It is therefore easy for beginners to get started with machine learning.

### Understanding Neural Networks
You can think of a Neural network like the human brain, with several interconnected nodes grouped into layers. The layers are categorized as input, hidden, and output layers. Data in neural networks move in a single direction from the input towards the output. 

This concept allows us to feed a vast amount of labeled data into the neural network and use it to train the network to give us a desirable output given some input. Given the processing time and accuracy of neural networks, they are far much better than human the brain.

### Prerequisites
The tutorial is beginner-friendly, so if you have done machine learning with Python or any other language, this will be a piece of cake. The article will require you to have the following beside the will to learn a new concept. 
- A good understanding of [JavaScript.](https://www.javascript.com/)
- Have [Node.js](https://nodejs.org/) installed on your computer.
- Your suitable code editor. I prefer using [VS Code](https://code.visualstudio.com/download).

### What is Brain.js?
[Brain.js](https://brain.js.org/#/) is in an interesting way of building neural networks. It easily learns the patterns and relationships between inputs and outputs and uses the information to make intelligent guesses when dealing with related issues. 

Brain.js is a cool concept because most of the documentation found on the internet is Python-based, therefore,  the learning ladder for developers with a web-development background becomes hard to climb.

> From their official documentation, Brain.js is a GPU accelerated neural network library built with JavaScript for browser and Node.js  applications. Brain.js is easy to understand and simple to use especially for beginners.

### Project goal
The main goal of this article is to provide beginners, especially those who are coming from a web development background, to get in machine learning. In the process, we will build a neural network, give it a set of data to train on, then ensure that our model can make a prediction based on the learning set of data provided. 

The project will be based on the JavaScript machine learning library called [Brain.js](https://brain.js.org/#/).

### Project setup
Run `npm init -y` to create an empty `package.json` file. Next, execute the command `npm install brain.js` in your terminal to install the Brain.js package. 

In the application's root folder, we will have the `index.js` file, which contains the driver code for the application. Will also have a file that contains the training data for our neural network. The training data will be in the form of JSON, so we will create a `data.json` file. 
The final project structure should look like this:

```bash
brainjs
    ┣ node_modules
    ┣ data.json
    ┣ index.js
    ┣ package-lock.json
    ┗ package.json
```

### The training overview
Our training data will be an array of objects, where each object has a `text` and a `category`. Based on the words on the text, a given phrase can be categorized as `back-end` based or `front-end` based. We will supply this data to the neural network for training. Afterward, we will give it a phrase and let it determine whether the phrase falls into the `front-end` category or the `back-end`. In the `data.js` file, add the snippets below:

```json
[
    {
      "text": "the user interface component is fixed",
      "category": "frontend"
    },
    {
      "text": "the css file look inituitive",
      "category": "frontend"
    },
    {
      "text": "i need a few ui designs",
      "category": "frontend"
    },
    {
      "text": "the database has issues",
      "category": "backend"
    },
    {
      "text": "the button is centered",
      "category": "frontend"
    },
    {
      "text": "make it clickable",
      "category": "frontend"
    },
    {
      "text": "i did the api integration",
      "category": "backend"
    },
    {
      "text": "a driver code should have less memory usgae",
      "category": "backend"
    },
    {
      "text": "it needs more memory",
      "category": "backend"
    },
    {
      "text": "code with responsive design in users interface",
      "category": "frontend"
    },
    {
      "text": "navigate the website easily",
      "category": "frontend"
    },
    {
      "text": "user login and authentication",
      "category": "backend"
    },
    {
      "text": "forms and dropdowns lists",
      "category": "frontend"
    },
    {
      "text": "username password email are stored",
      "category": "backend"
    },
    {
      "text": "programming loading animation",
      "category": "frontend"
    },
    {
      "text": "mysql, mongo, firebase databases",
      "category": "backend"
    },
    {
      "text": "restful api is useful with backend",
      "category": "backend"
    },
    {
        "text": "data access layer is not presentation layer",
        "category": "backend"
    },
    {
        "text": "the web browser loads dynamic webpages slowly",
        "category": "frontend"
    }
  ]
```

### Creating the Neural Network
When building the Neural network, we first need to import the `Brain.js` library into the project. After importing the library, we need to have our data file from where we will access the data to train the model. The code snippets below show how we import both the library and the data file.

```js
/**
 * bring in the brain.js dependency
 */
const brain = require('brain.js')
/**
 * Import the data file
 */
const data = require('./data.json')
```

### Long Short Term Memory (LSTM)
If you have worked with machine learning before, you probably are familiar with the term  Long short-term memory(LSTM). LSTM is an advanced Recurrent Neural Network (RNN) that allows information to stay long before getting lost.  

RNN is a type of neural network that is used for persistent memory. Let's say you are discussing in class, and you remember a concept that the teacher taught in class, and you use the same concepts to solve a problem in your discussion group. The RNN works in the same way  as it remembers the previous information and uses that information to process the current given input. 

The problem with RNN and if that they cannot remember long-term information due to vanishing gradient and for this reason,  LSTM is designed to avoid long-term dependency problems. We are going to use  the inbuilt LSTM in our example to create our network as shown below:

```js
/**
 * Create the  neural network
 */
const network = new brain.recurrent.LSTM();
```

### Training the Model
To train the model, we will take the data from our data file, convert it into an array of values with input and output pairs. We will train our model by running several interactions through the data pair. 

This procedure will take time depending on the number of iteration you perform on the dataset. The more the number of iterations, the higher the accuracy and time it takes. The code snippets below choose how we are going to train the model.

```js
/**
 * Training the model and setting the number 
 * of iteration to make during the training
 */
network.train(trainingData, {
    iterations: 2000
})
```

### Testing the Model
In the last phase of our project, we will test the trained model for accuracy by giving it a sentence and letting it decide whether the sentence is a frontend or backend jargon. The snippets below will assist us to test the model.

- #### First Test

```js
/**
 * Supply the input to classify
 */
const output = network.run('navigate the website easily')

/**
 * Printing the output on the console
 */
console.log(`Category: ${output}`)
```

**Output:**

```bash
Category: frontend
```

- #### Second Test:

```js
/**
 * Supply the input to classify
 */
const output = network.run('the api did not work maybe the authentication integration is not well done')

/**
 * Printing the output on the console
 */
console.log(`Category: ${output}`)
```

**Output:**

```bash
Category: backend
```

### Conclusion
In this tutorial, we had an introduction to Brain.js Machine Library from a beginner's point of view. This project excited me when we built a machine learning model that used real-life training data to make a prediction. 

Testing the model and seeing that it could accurately predict whether a given phrase is a backend or frontend programmers' jargon, is where all the fun began. I am doing more research on this topic and I hope to do more projects on the same concept.

You can find the code snippets for the application in [this](https://github.com/jamila-laureen/machine-learning-with-brain.js) link. Kindly reach out to me for any issue that a Google lookup won't help you with.

### Further Reading
Brain.js may not be the only machine learning library made in and for JavaScript as there exist others like [TensorFlow](https://www.tensorflow.org/) and [MLjs](https://ml5js.org/), but it is one of the easiest to learn in my opinion. I would highly recommend you go through these articles to have more understanding of Machine Learning.

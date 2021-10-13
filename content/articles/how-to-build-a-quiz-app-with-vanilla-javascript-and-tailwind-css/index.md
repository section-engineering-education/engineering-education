#How to build a Quiz App with Vanilla JavaScript and Tailwind CSS

This tutorial will show you how to build a quiz app with HTML, CSS, JavaScript, and Tailwind CSS without using any JS frameworks. I will also style the app with CSS3 and Tailwind CSS.


###Prerequisites for this article
A good text editor.
Good knowledge of HTML, CSS, and JavaScript.
Node.js installed


###Getting Started with Tailwind CSS
Tailwind CSS is a utility-based CSS framework that helps in building a unique and responsive UI. Tailwind CSS provides utilities that you can use for designing unique UI for your applications, unlike the other CSS frameworks like Bootstrap, Material UI, or Materialize that are component-based.

###How to Setup Tailwind CSS in your Application
First, you have to set it up on the app’s directory. Open an empty folder in your text editor and name it `tailwindcss`, then create a `package.json` folder by running the command below in your terminal.

`npm init -y`

Next, you have to install the required dependencies for the project by running the command below in your terminal:

`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

After that, create a new folder in the directory and name it `postcss.config.js`. In there, copy and paste the code below:

```css
const cssnano = require('cssnano');
module.exports = {
  plugins: [
   require('tailwindcss'),
   cssnano({
     preset: 'default',
   }),
   require('autoprefixer'),
  ]
}
```

Then, you run the command below to create the tailwind configuration file.

`npx tailwindcss init`

Next, you have to create some folders. You can create a `tailwind.css` file in your `src/css` folder. Copy and paste the tailwind base packages below inside this file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, you have to customize your `package.json` file. You can replace the `scripts` configuration there with the code below:

```css
"scripts": {
 "tw:build": "tailwindcss build ./src/css/tailwind.css -o ./public/css/tailwind.css"
}
```
Your `package.json` file will now look like this:

```css
{
  "name": "quiz-app-2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "tw:build": "tailwindcss build ./src/css/tailwind.css -o ./public/css/tailwind.css"
   },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^10.3.7",
    "postcss": "^8.3.9",
    "tailwindcss": "^2.2.16"
  }
}
```

Lastly, you need to run the command below in your terminal, and then Tailwind CSS will be set up in your application.

`npm run tw:build`

You can create your `index.html` in your `public/css` folder. Your `style.css` will be in your `src/css` folder. Your app directories may look like this:



Now, you are ready to build your quiz app.

###Designing the Quiz App
The app will have a start button that will direct you to the questions along with four options. The correct answer button will turn green as the other wrong answer buttons turn red when choosing an alternative to style several app components. A next button will also pop up, which will direct the user to the next question and options page. You can call Tailwind CSS to your HTML with the code below:

`<link rel="stylesheet" href="./css/tailwind.css">`

 Here the HTML code for the application below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App with JavaScript</title>
    <link rel="stylesheet" href="../src/css/style.css">
    <link rel="stylesheet" href="./css/tailwind.css">
</head>
<body class="bg-gradient-to-r from-green-400 via-green-600 to-green-800 w-screen h-screen flex justify-center items-center">
    <div class="container">
        <div id="question-container" class="hide">
            <div id="question">Question</div>
            <div id="answer-buttons" class="grid gap-4 grid-cols-2 my-7">
                <button class="btn">Answer 1</button>
                <button class="btn">Answer 2</button>
                <button class="btn">Answer 3</button>
                <button class="btn">Answer 4</button>
            </div>
        </div>
        <div class="flex justify-center gap-4">
            <button id="start-btn" class="bg-pink-700 px-9 py-3 text-white text-2xl rounded-lg hover:bg-pink-400">Start</button>
            <button id="next-btn" class="bg-pink-700 px-9 py-3 text-white text-2xl rounded-lg hover:bg-pink-400">Next</button>
        </div>

        </div>

    </div>
    <script defer src="../src/script.js"></script>
</body>
</html>
```

In the code above, we imported several utilities from the [Tailwind CSS official website](https://tailwindcss.com/docs)  that we used in styling several components of our app. Also, the question and answer containers contain dummy code that we will later update with JavaScript. Copy and paste this CSS this code in your `style.css` file.

```css
*, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  :root {
    --hue-neutral: 200;
    --hue-wrong: 0;
    --hue-correct: 145;
  }


  .container {
    width: 800px;
    max-width: 80%;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 10px 2px;
  }


  .btn {
    --hue: var(--hue-neutral);
    border: 1px solid hsl(var(--hue), 100%, 30%);
    background-color: hsl(var(--hue), 100%, 50%);
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    outline: none;
  }

  .btn:hover {
    border-color: black;
  }

  .btn.correct {
    --hue: var(--hue-correct);
    color: black;
  }

  .btn.wrong {
    --hue: var(--hue-wrong);
  }

  .hide {
    display: none;
  }
```
The code above represents the styling for the answer buttons and their responsiveness to clicking when the user chooses an answer. Note that we also set a `hide` class to `display: none`, which we will use in JavaScript.

Here is what the root page of the app looks like at this point:

![quiz-app]/engineering-education/how-to-build-a-quiz-app-with-vanilla-javascript-and-tailwind-css/quiz-app.jpg)

###Now the JavaScript

First, create a `script.js` file in your app directory. In there, you have to call the HTML elements you will work on into your JavaScript with the code below:
```js
const startButton = document.querySelector('#start-btn')
const nextButton = document.querySelector('#next-btn')
const questionContainerElement = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answer-buttons')
```
Then, you have to create an array that will contain your quiz questions and their corresponding answer options. Here is the code below:

```js
const questions = [
    {
        question: 'what is 10 * 2?',
        answers: [
            { text: '102', correct: false },
            { text: '210', correct: false },
            { text: '12', correct: false },
            { text: '20', correct: true }
        ]
    },
    {
        question: 'where can you learn how to be a better technical writer?',
        answers: [
            { text: 'Zoo', correct: false  },
            { text: 'Section Eng-Ed', correct: true  },
            { text: 'At the park', correct: false  },
            { text: 'None of them', correct: false  }
        ]
    },
    {
        question: 'Who is the author of this article?',
        answers: [
            { text: 'Prince Philips', correct: false },
            { text: 'Barrack Obama', correct: false },
            { text: 'Doro Onome', correct: true },
            { text: 'John Cena', correct: false },
        ]
    },

    {
        question: 'Who is the greatest footballer of all time',
        answers: [
            { text: 'CR7', correct: true },
            { text: 'Zinedine Zidane', correct: false},
            { text: 'Ronaldinho', correct: false },
            { text: 'Lionel Messi', correct: false }
        ]
    }
]

```

### The `startQuiz` function
This function runs when you click the start button to begin your game. You will call the `hide` class on the start button to disappear immediately the user clicks on it so that the questions and options can now appear. You will use the `Math.Random()` in a `sort()` function to randomly display the questions from the questions array. Here is the code for the `startQuiz` function:

```js
let shuffledQuestions, currentQuestionIndex

const startQuiz = () => {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}
```

Now, you have to create an event listener on the start button, which will run the `startQuiz` function when users click the button. Here is the code below:

```js
startButton.addEventListener('click', startQuiz);

```

###The `setNextQuestion` function
This function will simply display the questions randomly by calling the `shuffledQuestions` function and passing the `currentQuestionIndex` in it. Here is the code below:

```js
const setNextQuestion = () => {
    resetState()
    displayQuestion(shuffledQuestions[currentQuestionIndex])

}

```
You also need to create an event listener for the next button so that when the user clicks it, the next question will display. We will do this by incrementing the `currentQuestionIndex` and calling the `setNextQuestion` function. Here is the code below:
```js
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

```

###The `displayQuestion` function
Now, we have to create a `displayQuestion` function to display the questions and answer options. You will replace that dummy text in the question and answers container with actual data from the questions array we created earlier. We will create a button for the answer options with `document.createElement(‘button’)`. This function will contain a conditional statement that will check if the answer is correct. If so, then it should call the `correct` class. You also have to create an event listener for the button and call the `chooseAnswer` function that we will create later. Here is the code for the `displayQuestion` function below:

```js
const displayQuestion = (question) => {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerButtonsElement.appendChild(button)
    })

}

```

###The `resetState` function
This function will reset everything related to your form, questions and body back to their default state everytime the user sets a new question. Here is the code for this function below:

```js
const resetState = () => {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

```
In the function above, we ensured the next button appears as soon as the user clicks an answer button and immediately disappears when clicked as a new question surfaces.

We need to create the function to select an answer when one of the option buttons receives a click event.

###The `chooseAnswer` function
First, you have to target the answer button the user clicks on by creating a variable like this: `const selectedButton = e.target`. Then, you can just get a variable `correct` which will be equal `selectedButton.dataset.correct`. Next, you need to loop through the other buttons and set the class for them. You are going to create an array from the `answerButtonsElement.children`. The `answerButtonsElement.children` is returning a live collection, and it updates on its own, so you have to convert it to an array to make it easier to loop through each button with the `forEach` function. You then call the `setStatusClass` function, which we will create in a bit and pass in `button.dataset.correct`, determining if the answer picked is the right one. You can also use a conditional statement to convert the next button to a restart button if the user gets to the last question. The test then restarts once the restart button is clicked.  Here is the code for the `chooseAnswer` function below:

```js
const chooseAnswer = (e) => {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

```

The `setStatusClass` function
First thing you need to do is to call the `ClearStatusClass` function which we will create after this and pass in `element`. Then you use a conditional statement to actually check if the answer picked is correct. If it is, just add the `correct` class else, add the `wrong` class. Here is the code below:

```js
const setStatusClass = (element, correct) => {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

```
Here is the code for the `clearStatusClass` function below:

```js
const clearStatusClass = (element) => {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
```

Below is a video of our quiz application in action:

<iframe width="727" height="409" src="https://www.youtube.com/embed/ENdP7aFVFpY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


##Conclusion
While building the quiz application, we used ES6 classes to organize our code. We used CSS3 and some [Tailwind CSS](https://tailwindcss.com/docs) utilities in styling the application. We also made use of Vanilla JavaScript.

With that, you have a fully functional quiz application. You can get the source code from my [Github](https://github.com/Nomzy-kush/Quiz-App-with-JavaScript-and-Tailwind-CSS) repo.

<!-- Building a custom stopwatch NPM library in Typescript -->

### Introduction
As a beginner in web development, there are numerous applications and projects you would want to build to enhance your skills and problem-solving abilities. A custom stopwatch Typescript package is one of those interesting projects that have numerous applications in web development and can widen your Typescript horizon.

In this tutorial, we will explore in detail the procedure and logic required to build and test your custom stopwatch NPM (Node Package Manager) library in Typescript. We will also look at how to make the package available for Typescript users around the world to install and implement in their various projects.

### Key takeaways
By the completion of this tutorial, the reader is expected to have the understanding of the following:

- Some of the basics of getting started with Typescript library development.
- Setting up a functional Typescript folder structure.
- Building a custom stopwatch Typescript library package.
- Deploying and making the Typescript package available to global users.
- Error handling when working Typescript libraries.

### Prerequisites
For this tutorial, some knowledge of Typescript or JavaScript is required to follow along. You also need a functional NPM account to publish the Typescript library. If you don’t have an account, please go to the official [NPM website](https://www.npmjs.com/signup/) to create one.

### Getting started with TypeScript and NPM
Before we dive into the library development, a quick overview of what Typescript and NPM are. As you may already be familiar, Typescript is simply a JavaScript superset. That is, it takes JavaScript and makes it better. Typescript has numerous advantages/benefits over vanilla JavaScript, which includes but are not limited to:

- Types definitions.
- Robust IntelliSense (code completion and suggestion).
- Supports code self-documentations.
- Helps in writing error-free and highly maintainable code.

NPM on the other hand is a comprehensive library or repository of reusable third party packages that developers around the world may install and utilize in their projects.

That being said, let us jump right into our library development.

### Project overview
For better understanding, I will breakdown the task into simple steps as follows:

### Step 1 – Installing Typescript globally on your local machine
To have access to Typescript and its functionalities, you must install the package globally on your computer. That way you can run the Typescript compiler and also use the code documentation, types definitions, and error capturing functionalities.

To install Typescript globally, open the command terminal and run the command below:

```bash
npm install -g typescript
```

That should get do the trick.

### Step 2 – Initializing and setting up the folder structure
A good Typescript package begins with a proper folder structure. To set up your library folder, you need to search and ensure that the package name of your Typescript library does not already exist on the NPM registry. Click on the [NPM registry](https://www.npmjs.com/) to search and select a unique package name.

Once you’ve found a unique package name, we are good to go. Run the command below to create a folder and initialize a `package.json`:

```bash
mkdir my-custom-stopwatch
cd my-custom-stopwatch

npm init -y
```

Replace `my-custom-stopwatch` with your unique package name. That should get your folder ready and a new `package.json` initialized.

### Step 3 – Setting up the package.json file
The `package.json` is more like the brain of our project, it contains and provides an array of commands, dependencies, etc. in our project. We will set up the `package.json` file by pushing the code snippet below:

```JSON
{
  "name": "my-custom-stopwatch",
  "version": "1.0.0",
  "description": "an NPM typescript package",
  "main": "dist/index.js",
  "files": ["/dist"],
  "types": "dist/index.d.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "react": "^17.0.2",
  },
  "keywords": [],
  "author": "Typescript developer",
  "license": "ISC"
}
```

### Step 4 – Installing and setting up the required dependencies
To build and publish our Typescript library, we need to install the Typescript package into our project so the development process can run smoothly. Open the command terminal and run the command below to install Typescript:

```bash
npm install require=dev typescript
```

We are installing Typescript as a dev dependency because we are using it for development-only purposes, meaning the user does not need to install Typescript to consume the package.

Once that is completed, it is time to create and set up the Typescript config file. To do that, run the command below:

```bash
npx tsc --init
```

That should create and initialize a `tsconfig.json` file. Now let’s set it up by clearing the default options and pasting the snippet shown below:

```JSON
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "declaration": true,
    "sourceMap": true,
    "module": "esnext",
    "outDir": "./dist",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react"
  },
  "include": ["/src/**/*"],
  "exclude": ["node_modules"]
}
```

This is one of the simplest forms of the `tsconfig.json` files. We added some options such as an exclusion list so Typescript will ignore the `node_modules` and an inclusion array of everything in the `src` folder which we will create shortly. We also set the target to `es6` so our Typescript snippets will be compiled to JavaScript ES6. You can check out the full list of Typescript config options [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### Step 5 – Building the stopwatch library
This is where the main work begins. We will create and set up the relevant files and logic the stopwatch library needs.

In the `src` folder we will create the `stopwatch.ts` file. Once that is done, let’s dive right into the stopwatch setup.

In the `stopwatch.ts` file, implement the code snippet below:

```typescript
export function startWatch(timerStop: boolean, watchCycle: any) {
  if (timerStop) {
    timerStop = false;
    watchCycle();
  }
}

export function stopWatch(timerStop: boolean) {
  if (timerStop == false) {
    timerStop = true;
  }
}

export function watchCycle(
  timerStop: boolean,
  milliseconds: number,
  seconds: number,
  minutes: number,
  hours: number,
  timer: HTMLElement
): number | string {
  if (timerStop == false) {
    milliseconds = milliseconds + 10;

    if (milliseconds == 1000) {
      milliseconds = 0;
      seconds = seconds + 1;
    }
    if (seconds == 60) {
      minutes = minutes + 1;
      seconds = 0;
    }
    if (minutes == 60) {
      hours = hours + 1;
      minutes = 0;
      seconds = 0;
    }

    let hr = hours < 10 ? "0" + hours : hours;
    let mins = minutes < 10 ? "0" + minutes : minutes;
    let secs = seconds < 10 ? "0" + seconds : seconds;
    let milsec =
      milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    setTimeout("watchCycle()", 10);
    return (timer.innerHTML = hr + ":" + mins + ":" + secs + ":" + milsec);
  }
}

export function resetWatch(
  milliseconds: number,
  seconds: number,
  minutes: number,
  hours: number,
  timer: HTMLElement
) {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  return (timer.innerHTML = "00:00:00");
}
```

As you are already familiar with Typescript, we are expressly assigning a value type to every parameter each function is accepting (i.e. number, string, HTMLElement, and any).

From the snippet above, we created and exported 4 functions as explained below:

- `startWatch`: This function is called when the `start` button is clicked. On execution, the function sets the `timerStop` to false and also starts the `watchCycle` function.
- `stopWatch`: This function runs when the user clicks the `stop` button. When executed, the `stopwatch` function sets the `timerstop` to true which halts the `watchCycle` function.
- `resetWatch`: The `resetWatch` function simply returns the stopwatch with the initial value (0) and it is executed when the user clicks the `reset` button.
- `watchCycle`: This is the brain behind our stopwatch, it increments the values of the milliseconds, seconds, minutes, and hours accordingly and then returns the values to the `timer` HTML element tag in the `index.html` when used.

That is all we need to set up the stopwatch logic. Finally, create an `index.ts` in `src` and export all the functions as shown below:

```typescript
export { startWatch, watchCycle, stopWatch, resetWatch } from "./stopwatch";
```

### Step 6 – Testing/consuming the stopwatch locally
Before we publish our stopwatch library to NPM, we need to test it locally on our browser. Testing helps us observe, interact with the package and possibly debug it before publishing to the world.
As Typescript developers, we know that browsers do not execute Typescript code snippets, as such we always have to compile our Typescript files into JavaScript. This step is very easy and involves running a single command on the terminal.
To compile our Typescript library into JavaScript, open up the command terminal and run the command below:

```bash
npx tsc
```

> Note: to have access to the Typescript compiler (tsc), you must have installed Typescript globally in your local machine or as a dependency in the project. If you haven’t, go ahead and run the command below to install Typescript globally:

```bash
npm install -g typescript
```

The command will compile The Typescript files to JavaScript thereby producing two new files (`index.js` and `stopwatch.js`) in the `dist` folder. let us go ahead and test/consume the stopwatch package locally.
To do that, we create a `test` folder in the package root directory (`my-custom-stopwatch`). In the `test` folder, create two files (`index.html` and `test.js`).
Once that is completed, open the `test.js` file and then import and use the exported stopwatch functions as shown below:

```JavaScript
import {
  startWatch,
  watchcycle,
  stopWatch,
  resetWatch,
} from "../dist/stopwatch";

const timer = document.getElementById("my_stopwatch");

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerStop = true;
watchcycle(timerStop, hours, minutes, seconds, milliseconds, timer);
startWatch(timerStop, watchcycle);
stopWatch(timerStop);
resetWatch(hours, minutes, seconds, milliseconds, timer);

 ```
From the snippet above, we:
  - imported the `startWatch`, `stopWatch`, `watchCycle`, and `resetWatch` from the newly compiled JavaScript files in the `dist` folder.
  - We then initialized the values of `hours`, `minutes`, `seconds`, and `milliseconds` to zero (0). 
  - Finally, we passed the initialized values to our imported function which is used to implement the stopwatch logic.

Let us go ahead and setup the `index.html` file to render the stopwatch. To do that, implement the snippet in the `index.html` file as shown below:

```HTML
<html>
  <head>
    <title>My amazing Stopwatch</title>
  </head>
  <body>
    <div id="my_stopwatch">00:00:00</div>

    <ul id="watch_buttons">
      <li><button onclick="stopWatch()">Stop</button></li>
      <li><button onclick="startWatch()">Start</button></li>

      <li><button onclick="resetWatch()">Reset</button></li>
    </ul>

    <script type="module" src="test.js"></script>
  </body>
</html>
```
We have created a basic stopwatch structure that includes 3 buttons with an `onclick` handler to execute the start, stop and reset operations. We also created a `div` tag with an `id="my_stopwatch"` as required in the `test.js` file.
Now open the `index.html` file in the browser to view and interact with the amazing stopwatch.
To do that, open your command terminal and run the command below:

```bash
cd test
start index.html
```
The command above will open the stopwatch in your default browser.

### Step 7 – publishing the custom Stopwatch library to NPM
Finally, the last step in this tutorial is to publish the custom stopwatch package to NPM. before we go ahead and do that, first ensure you created an account with NPM, if you do not have one, go to the [sign up page](https://www.npmjs.com/signup/) to create one. If you already have one, let's login in by running the command below:

```bash
npm login
```

You should be prompted to input your username and password.

Once you are successfully logged in, follow up with the command to publish the package by running the command below:

```bash
npm publish –access public
```

Once successful, you should see a notice on the command terminal showing the package name, size, integrity, shasum, and total files. We added the `--access public` flag to make the package globally available to the public.

To confirm that the package has been published successfully, go to your NPM account profile and check the packages. You should see a new package with the name you picked under the packages category.

Typically, you would want to have a `README.md` file in the package showing users how to consume the package. Writing and adding the file is outside the scope of this tutorial.

### Conclusion
In this tutorial, we took a deep dive into the entire process of building, publishing, and testing a custom stopwatch NPM package. We also talked about the benefits of using Typescript over vanilla JavaScript. You can make use of the concepts discussed in this tutorial in creating and publishing other NPM packages in Typescript.

I hope this tutorial was of great use to you. Always publish responsibly!

### References
- [NPM official website](https://www.npmjs.com/)
- [How to create a stopwatch in JavaScript](https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak)


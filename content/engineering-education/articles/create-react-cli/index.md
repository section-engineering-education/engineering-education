---
layout: engineering-education
status: publish
published: true
url: /engineering-education/create-react-cli/
title: Building CLI Applications using React.js
description: In this tutorial we will create a simple CLI application using React.js framework and the INK library.
author: daniel-katungi
date: 2020-11-22T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/create-react-cli/hero.jpg
    alt: example image React.js CLI
---
Command-line applications have become popular in the developer ecosystem for several reasons. The most common reasons would be due to the ease of use (of the CLI) and many essential developer tools are terminal applications or command line applications because so many developers are familiar with them.
<!--more-->
As the complexity and functionalities of these terminal applications grow, so does the need for them to be created simpler and easier.

In our [previous article](/engineering-education/create-a-nodejs-cli/), we covered how to make a CLI application using Node.js. One of the key takeaways from building a CLI using Node.js is that they are hard and tedious to make.

React makes it very easy to create powerful and very interactive CLI applications. In this article, we will create a CLI with React.js instead of Node.js and see the difference.

### Prerequisites
- Basic understanding of JavaScript.

- Basic knowledge of React.js.

- Basic knowledge of npm and or yarn.

### Why React.js and not Node.js
React takes away all the pains of parsing arguments and does them in the background. React also allows you to render components to the terminal like you would in a browser.

To make a CLI using React, we use a library called [INK](https://github.com/vadimdemedes/ink) to make our work easier. Ink also enables you to use flexbox, meaning no more using colored string outputs like you would in Node.js.

Some popular applications made with React and Ink include:
- Jest
- Gatsby
- Prisma
- Typescript
- Twilio SIGNAL

### Getting started with React INK
Ink is a React.js framework that take apart the tedious task of building CLI applications. Ink doesn't require any extra learning when compared to Node.js. If you are familiar with React, then you are good to go.

Let's get started by building a simple Hello World application. To do this, we need React and Ink from our npm. To make our work simpler, ink ships with a command to bootstrap a React CLI application.

In your terminal type:

```bash

mkdir section-example && cd section-example

npx create-ink-app
```

The last command creates a link executable for our application. It may take some time to complete this process. When you run `node cli` in the terminal, it should return this:

![Image](/engineering-education/create-react-cli/first-1.png "image")

There you have it, your first CLI using React. To achieve this in Node.js, it would have needed us to write a lot of code and it would have taken more time, not to mention more libraries.

### Simple project
Let's go ahead and work on a more complex project. The project will help you understand the elements and the project structure of React ink. We will work in the `ui.js` file. The entry file for the application is `cli.js.`.

The code should resemble the one below:
```JavaScript
"use strict";
const React = require("react");
const { Text } = require("ink");

const App = ({ name = "Stranger" }) => (
	<Text>
		Hello, <Text color="green">{name}</Text>
	</Text>
);

module.exports = App;
```

First, we import React from the `react` package. Then we import the Text element that ships with the `ink` package. We also have a function that takes in a name and renders it. Let's create a simple CLI application that takes a country as input. It then returns some information about that given country in a table.

To achieve this we need this npm package called [world-countries-capitals](https://www.npmjs.com/package/world-countries-capitals), which gives us country information.

Let's start by getting the user input. To achieve this, we need text input. Lucky for us, ink provides a package for this, just run:

```bash
npm install ink-text-input
```

In our `ui.js`,  we import and use the text input in the terminal. We will also use the `useState` React hook to store our country value and handle changes to the country name. In simple terms, think of `useState hooks` as a way to work with variables in React. To learn more about React hooks, I recommend reading the [React documentation](https://reactjs.org/docs/hooks-overview.html).

Our code now will look like this:

```JavaScript
"use strict";
const React = require("react");
const { Box } = require("ink");
const TextInput = require("ink-text-input").default;

const App = () => {
	const [country, setCountry] = React.useState("");

	return (
		<Box>
			<TextInput
				placeholder="Enter your country..."
				value={country}
				onChange={setCountry}
			/>
		</Box>
	);
};

module.exports = App;
```

On running `node cli` in the terminal, you should be able to enter a country name.

We will need to search for the country in real-time and display the results in a table. To do so, we will invoke the `world-countries-capitals` npm package. We will use another React hook called `useEffect` to fetch our data and update the component as it renders. Let’s implement this.

We first install and import the package.

In the terminal write:
```bash
    npm i world-countries-capitals
```

At the top of our file, we import the package:

```JavaScript
const wcc = require("world-countries-capitals");
```

We'll create some variables to hold the data we get from the useEffect hook, using the useState. They will come in handy when updating the table in real-time.

```JavaScript
const [capital, setCapital] = React.useState("");
const [currency, setCurrency] = React.useState("");
const [phone, setPhone] = React.useState("");
```

Finally, we update our variables with information from the npm package. Our complete `useEffect` hook, will look like this.

```JavaScript
React.useEffect(() => {
	const getCountry = wcc.getCountryDetailsByName(country);
	setCapital(getCountry[0].capital);
	setCurrency(getCountry[0].currency);
	setPhone(getCountry[0].phone_code);
});
```

Our code at this time, will look like this, inclusive of the useEffect hook:

```JavaScript
"use strict";
const React = require("react");
const { Box } = require("ink");
const TextInput = require("ink-text-input").default;
const wcc = require("world-countries-capitals");

const App = () => {
	const [country, setCountry] = React.useState("");
	const [capital, setCapital] = React.useState("");
	const [currency, setCurrency] = React.useState("");
	const [phone, setPhone] = React.useState("");

	React.useEffect(() => {
		const getCountry = wcc.getCountryDetailsByName(country);
		setCapital(getCountry[0].capital);
		setCurrency(getCountry[0].currency);
		setPhone(getCountry[0].phone_code);
	});
	return (
		<Box>
			<TextInput
				placeholder="Enter your country..."
				value={country}
				onChange={setCountry}
			/>
		</Box>
	);
};

module.exports = App;
```

Finally, let’s render the information in a table. We’ll need to nest a lot of boxes with some attributes. The most common attributes will be `flex-direction` and `borderStyle`. Since we're using React, we're still in the JSX realm, and we need a parent attribute.

Within the Box element, beneath the TextBox element, we will add our table.
```JavaScript
<Box flexDirection="column" width={80} borderStyle="single">
	<Box>
		<Box width="40%">
			<Text>Country Code</Text>
		</Box>

		<Box width="40%">
			<Text>Capital City</Text>
		</Box>

		<Box width="40%">
			<Text>Currency</Text>
		</Box>
	</Box>
	<Box>
		<Box width="40%">
			<Text>{phone}</Text>
		</Box>

		<Box width="40%">
			<Text>{capital}</Text>
		</Box>

		<Box width="40%">
			<Text>{currency}</Text>
		</Box>
	</Box>
</Box>
```

Let's add a banner to our application, just because we can. We'll add it within the root Box element on top of the text input.

```JavaScript
<Box borderStyle="round" borderColor="green">
	<Text>Welcome to Country CLI</Text>
</Box>
```

We are done.

Our full code now looks like this:
```JavaScript
"use strict";
const React = require("react");
const { Text, Box } = require("ink");
const TextInput = require("ink-text-input").default;
const wcc = require("world-countries-capitals");

const App = () => {
	const [country, setCountry] = React.useState("");
	const [capital, setCapital] = React.useState("");
	const [currency, setCurrency] = React.useState("");
	const [phone, setPhone] = React.useState("");

	React.useEffect(() => {
		const getCountry = wcc.getCountryDetailsByName(country);
		setCapital(getCountry[0].capital);
		setCurrency(getCountry[0].currency);
		setPhone(getCountry[0].phone_code);
	});

	return (
		<Box flexDirection="column">
			<Box borderStyle="round" borderColor="green">
				<Text>Welcome to Country CLI</Text>
			</Box>
			<TextInput
				placeholder="Enter your country..."
				value={country}
				onChange={setCountry}
			/>
			<Box flexDirection="column" width={80} borderStyle="single">
				<Box>
					<Box width="40%">
						<Text>Country Code</Text>
					</Box>

					<Box width="40%">
						<Text>Capital City</Text>
					</Box>

					<Box width="40%">
						<Text>Currency</Text>
					</Box>
				</Box>
				<Box>
					<Box width="40%">
						<Text>{phone}</Text>
					</Box>

					<Box width="40%">
						<Text>{capital}</Text>
					</Box>

					<Box width="40%">
						<Text>{currency}</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

module.exports = App;
```

To test our new creation, we run `node cli` in our terminal.

It should return this:

![final-result](/engineering-education/create-react-cli/section-final.png)

You can find a gif of the application in action  at this link [here](https://terminalizer.com/view/ad4a80d54380).

Note: Running the test command (`npm run test`) will not work because we haven't written any tests of our own. Ink uses ava for testing by default. You can read more about ava in its [documentation here](https://github.com/avajs/ava).

### Finishing up
We just built our first complex CLI using React and here are a few things to note. Ink comes with more elements that allow you to have more control over the user interface of the CLI. It also ships with custom hooks to manipulate the data acquired from the terminal. A good example is `useInput` which listens to the user input.

Creating CLI applications has never been easier using React ink. Have fun building more complex and beautiful CLI applications. To get the code used in the article, you can check it out [here](https://github.com/katungi/React-cli-section).

***Challenge: As of now, the application crashes when the user enters a non-existing country or in the event of a typo. To learn more about React Ink custom hooks and to practice on React hooks, try fixing that error to display an empty table or a error message. Submit the solution as a PR to the project repo.***

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

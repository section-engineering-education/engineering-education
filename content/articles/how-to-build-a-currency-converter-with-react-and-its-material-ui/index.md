---
layout: engineering-education
status: publish
published: true
url: /how-to-build-a-currency-converter-with-react-and-its-material-ui/
title: Building a currency converter using Fixer.io react and material-UI
description: In this article, we will demonstrate how to create a currency converter with a React and Material-UI with data fetched from Fixer.io API
author: doro-onome
date: 2021-12-17T00:00:00-04:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-a-currency-converter-with-react-and-its-material-ui/hero.jpg
    alt: Building a currency convereter using Fixer.io react and material-UI Image
--- 

A currency converter is an application that displays the equivalent value represented by the different currencies in the world. This article will give the reader a step-by-step guide on building a currency converting application with React and styling its components with Material UI. 
<!--more-->

### Prerequisites for this article
- A text editor, e.g., VSCode.
- A good understanding of HTML, CSS, and JavaScript programming language.
- A working installation of Node.js.

### Creating the React app
Head to the project folder and run the command below to create a new React application.

```bash
npx create-react-app project-name
```

After creating the new React application, open a text editor and clear the default code in `App.js` and `App.css` in readiness to integrate Material UI into your application.
To open the application locally in a browser, run:

```bash
npm start
```

### Getting started with Material UI
[Material UI](https://mui.com/) is a component-based CSS framework that helps developers build React applications by providing several relevant components for different parts of your project. 

MUI components work separately. They are self-supporting and will only display the styles they need to show. Therefore, they do not depend on worldwide style-sheets like [normalize.css](https://github.com/necolas/normalize.css/).

You require the `@material-ui/core`, which can easily be installed with `npm` or `yarn`. If you wish to use icons, you can also include the `@material-ui/icons` package. 

Here is the command to install these packages in your app as dependencies:

```bash
npm install @material-ui/core @material-ui/icons
```

Now, you can find the Material UI in your app’s `package.json` file like in the image below:

![package-json](/engineering-education/how-to-build-a-currency-converter-with-react-and-its-material-ui/package-json.png)

To use any of the Material UI components in your application, head to the [MUI official docs](https://mui.com/getting-started) components page. Then, you can utilize any of the components as illustrated in the documentation. 

It's ideal to refer to each component’s demo page to see how they should be imported. Below is a code sample that will show you all you need to use MUI in your application:

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

### Building the currency converter 
This app will have “dollar icons” from Material UI, a header, two `inputs` for the currencies you are comparing, and two `select` components that you will use to choose the currencies. 

This app will use `fixer.io` API to fetch the latest currency rates. So, if you change the values in one currency, the equivalent value for another set currency will be automatically displayed. 

To get started, create a new file and name it `CurrencyInput.js`. Create a `CurrencyInput` function and pass in `props` as an argument. Then, create two `input` and `select` elements. Pass in `props.amount` and `props.currency` as values in the `input` and `select` tags respectively. 

Next, set a `map` function that will iterate through the `option` tag in the `select` tag, which we will call `currency`, and set its value to `currency`. 

The next thing to do is to define the `propTypes`. `propTypes` in React are a mechanism that makes sure that components use the right data sort and pass the correct data, and that components use the right type of `props` and that receiving components get the correct type of `props`. To do that, first, run the command below in your terminal:

```bash
yarn add prop-types
```

Next, import and call the required `propsTypes` for this application, `amount` as `number`, `currency` as a `string`, and `currencies` as an array. Lastly, export the `CurrentInput` function. Here is the code for the procedure:

```js
import React from 'react'
import propTypes from "prop-types"

const CurrencyInput = (props) => {
    return (
        <div className="currency-input">
            <input type="text" value={props.amount} onChange={event => props.onAmountChange(event.target.value)}  />
            <select value={props.currency} onChange ={event => props.onCurrencyChange(event.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
                </select>   
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: propTypes.number.isRequired,
    currency: propTypes.string.isRequired,
    currencies: propTypes.array,
    onAmountChange: propTypes.func,
    onCurrencyChange: propTypes.func
}

export default CurrencyInput
``` 

### Creating states for the app components
Head to the `App.js` file and create a new `App` function. Next, create four states that will control the state of the two inputs and two currency components in the app using the hook  `useState`. 

Next, import the `CurrencyInput` component and call it twice in the `App` function to represent the `input` and `select` for two currencies and call the states you created in their relevant `input` tags. 

```js
import CurrencyInput from "./CurrencyInput";
import { useState } from "react";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');

  return (
<div>
  <CurrencyInput
        amount={amount1}
        currency={currency1} />
      <CurrencyInput
        amount={amount2}
        currency={currency2} />
</div>
  );
}
```

### Using fixer.io to get Real Currency Data
Head to the [Fixer official site](https://fixer.io/login) and click on “GET YOUR FREE API KEY” if you do not already have an account with them. Next, navigate to the free plan, which will direct you to a Signup page where you will be required to fill in your correct credentials. 

After signing in, you will be redirected to a page to see your API access keys and endpoints. Copy the endpoint data. Your application will need to get the latest currency rates with another react hook called `useEffect`. 

To do that, first, run `yarn add axios` in your app terminal to get access to the API queries. Import `axios` and use it in a `.get` function. 

It would be best to create another state function that will regulate the `rates` object in your endpoints data containing the credentials of all the latest currencies in the world. 

After that, store the state of `rates` in a `response` function inside the `get` function`. Lastly, call the `rates` object keys in the `CurrencyInput` JSX element.

```js
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
const [rates, setRates] = useState([]);

useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=106ab470d06b4c14d00c10f864ef62b6')
      .then(response => {
        setRates(response.data.rates);
      })
  }, []);

  return (
<div>
  <CurrencyInput 
  currencies={Object.keys(rates)} 
  />

  <CurrencyInput 
  currencies={Object.keys(rates)} 
  />
</div>
  );
}

```

The following functionality we will implement is the ability of the input values to update following the set currency automatically. So, head back to your `CurrentInput.js` and create an `onChange` function in the `input` and `select` tags. 

These two will control the value input by the user and the difference in the currency set by the user. 

You will also create two functions, `onAmountChanged` and `onCurrencyChanged`, that will carry out these tasks and pass them in your app as propTypes. For example, here is the code below:

```js
import React from 'react'
import propTypes from "prop-types"
const CurrencyInput = (props) => {
    return (
    <input type="text" value={props.amount} onChange={event => props.onAmountChange(event.target.value)}  />
            <select value={props.currency} onChange ={event => props.onCurrencyChange(event.target.value)}>
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
                </select>   
        </div>
    )
}

CurrencyInput.propTypes = {
    onAmountChange: propTypes.func,
    onCurrencyChange: propTypes.func
}
```

### The state management functions
#### The `handleAmount1Change` function
It would help if you used the `rates` from `fixer.io` to re-calculate the values according to the set currency. To do that, create a function in the `App.js`, call it `handleAmount1Change`, and pass in `amount1` as an `argument`. 

This function will help update the state of the first input element. So, when the values in the first input change, the values in the second input will also change for the currency the user sets. 

So, you will `setAmount2`  to be equal to be `amount1` multiplied by the rate of `currency2` divided by the rate of `currency1`. 

After that, call `onAmountChange` in the `CurrencyInput` component tag and pass in this `handleAmount1Change` function.

```js
function handleAmount1Change(amount1) {
  setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
  setAmount1(amount1);
}

return (
<div>
<CurrencyInput
        onAmountChange={handleAmount1Change}
        />
</div>
)
```

#### The `handleCurrency1Change` function 
Now, create another function called `handleCurrency1Change` that will handle the state change for the `select` elements that will handle the change in currencies. 

The same code works except that  `currency1` is passed  in the `setCurrency1` function this time. Then, call the `onCurrencyChange` function in the `CurrencyInput` JSX element and pass in this `handleCurrency1Change` function.

```js
function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  return (
  <div>
  <CurrencyInput
  onCurrencyChange={handleCurrency1Change}
  />
  </div>
  )
```

#### The `handleAmount2Change` function
This function will handle the change in the state of the second input in the app. 

Pass in `amount2` as an `argument`. Then, `setAmount1` to be equal to `amount2` times the rate of `currency1` divided by the rate of `currency2`. 

Next, pass in `amount2` in the `setAmount2` function. After that, call the `onAmountChange` function in the `CurrentInput` tag and pass in this `handleAmount2Change` function. 

```js
function handleAmount2Change(amount2) {
   setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
   setAmount2(amount2);
 }

 return (
 <div>
 <CurrencyInput
 onAmountChange={handleAmount2Change}
/>
 </div>
 )
```

#### The `handleCurrency2Change` function
This function will regulate the change in the state of the second `select` element, which controls whatever currency the user chooses. 

Again, the same code as the `handleAmount2Change` is used here, except that you will call the `setCurrency2` and pass in `currency2`. Now, you can call the `onCurrencyChange` method in the `CurrentInput` tag and pass it in `handleCurrency2Change`. 

```js
function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
  <div>
  <CurrencyInput
  onCurrencyChange={handleCurrency2Change}
  />
  </div>
  )
```

#### The `roundUp` function
At this point, if you input a value in one currency, the equivalent value in another currency might be a number with many decimals. So, this function will help round up all the `input` values to a maximum of four decimal places.


```js
function roundUp(number) {
   return number.toFixed(4);
 }
```

After that, call this `roundUp` method in the four-state management functions you just created.

One more thing you have to do is set the app’s default state when the user reloads the page. You can do that with another `useEffect`. 

Put a conditional statement inside the `useEffect` saying “if `rates` is not empty, then call the `handleAmount1Change` and set its default state to 1 else, call an `init` function.”

Here is the code below:

```js
import { useEffect } from "react";
function App() {
useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);
}
``` 

At this point, here is what the application looks like:

![currency-converter](/engineering-education/how-to-build-a-currency-converter-with-react-and-its-material-ui/currency-converter.jpg)

Here is a video of the app in action:


<iframe width="727" height="409" src="https://www.youtube.com/embed/wXfwsipIthE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 
### Conclusion
While building the currency converter, we used ReactJS and its hooks to implement its functionalities. We also styled the application with CSS3 and React’s Material UI components. With that, you have a completely functional currency converter. You can get the source code from my [Github](https://github.com/Nomzy-kush/currency-converter-react) Repo. 

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

#How to build a Currency Converter with React and Material UI

A Currency converter is an app or website that displays the equivalent value represented by the different currencies in the world. This article will give you a step-by-step guide on building a currency converting application with React and styling its components with Material UI. 

##Prerequisites for this article
A good text editor, e.g., VSCode.
A clear understanding of HTML, CSS, and JavaScript.
Node.js installed.

##Creating your React app
Head to your project folder and run the command below to create a new React app.

`npx create-react-app project-name`

After creating your new React application, open your text editor and clear the default code in App.js and App.css. Now, you are ready to integrate Material UI into your application.
To open your application locally in your browser, run:

`npm start`
##Getting started with Material UI
[Material UI](https://mui.com/) is a component-based CSS framework that helps you build your React application by providing several relevant components for different parts of your project. MUI components work separately. They are self-supporting and will only display the styles they need to show. They do not depend on any worldwide style-sheets such as [normalize.css](https://github.com/necolas/normalize.css/).
You simply require this one package, `@material-ui/core`, which you can easily install with `npm` or `yarn`. You can also include the `@material-ui/icons` package if you wish to use icons. Here is the command to install these in your app as dependencies:

`npm install @material-ui/core @material-ui/icons`

Now, you can find the Material UI in your app’s `package.json` file like in the image below:

![package-json](/engineering-education/how-to-build-a-currency-converter-with-react-and-its-material-ui/package-json.png)

To use any of Material UI in your application, head to the [MUI official docs](https://mui.com/getting-started) components page. You will be able to utilize any of the components as illustrated within the documentation. It is ideal to refer to each component’s demo page to see how they should be imported. Below is a code sample that will show you all you need to use MUI in your application:

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```


##Building the Currency Converter 
This app will have “dollar icons” from Material UI, a header, two `inputs` for the currencies you are comparing, and two `select` components that you will use to choose the currencies. This app will use `fixer.io` API to fetch the latest currency rates. So, if you change the values in one currency, the equivalent value for another set currency will automatically display. To get started, create a new file and name it `CurrencyInput.js`. Create a `CurrencyInput` function and pass in `props` as an argument. Then, create two `input` and `select` elements.Pass in `props.amount` and `props.currency` as values in the `input` and `select` tags respectively. Then, set a `map` function that will iterate through the `option` tag in the `select` tag, which we will call `currency`, and set its value to `currency`. The next thing to do is to define the `propTypes`. `propTypes` in React are a mechanism that makes sure that components use the right data sort and pass the correct data, and that components use the right type of `props` and that receiving components get the right type of `props`. To do that, first, run the command below in your terminal:
`yarn add prop-types`  

Then, import and call the required `propsTypes` for this application, `amount` as `number` , `currency` as a `string`, and `currencies` as an array. Lastly, export the `CurrentInput` function. 
Here is the code for it:

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

###Creating States for your App Components
Head to your `App.js` file and create a new `App` function. Create four states that will control the state of the two inputs and two currency components in the app using the hook  `useState`. Then, import the `CurrencyInput` component and call it twice in the `App` function to represent the `input` and `select` for two currencies and call the states you created in their relevant `input` tags. 
Here is the code below:

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

###Using `fixer.io` to get Real Currency Data
Head to the [Fixer official site](https://fixer.io/login?u=https%3A%2F%2Ffixer.io%2Fquickstart) and click on “GET YOUR FREE API KEY” if you do not already have an account with them. Navigate to the free plan, which will direct you to a Signup page where you will be required to fill in your correct credentials. After signing in, you will be redirected to a page to see your API access keys and endpoints. Copy the endpoint data. Your application will need it to get the latest currency rates with another react hook called `useEffect`. To do that, first, run `yarn add axios` in your app terminal to get access to the API queries. Import `axios` and use it in a `.get` function. You also need to create another state function that will regulate the `rates` object in your endpoints data that contain the credentials of all the latest currencies in the world. After that, store the state of `rates` in a `response` function inside the `get` function`. Lastly, call the `rates` object keys in the `CurrencyInput` JSX element.
Here is the code below:

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
The following functionality we will implement is the ability of the input values to update in accordance with the set currency automatically. Head back to your `CurrentInput.js` and create an `onChange` function in the `input` and `select` tags that will control the change in the value inputted by the user and the difference in the currency set by the user. You will also create two functions, `onAmountChanged` and `onCurrencyChanged`, that will carry out these tasks and pass them in your app as propTypes. Here is the code below:

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

##The State Management Functions
###The `handleAmount1Change` function
You need to use the `rates` from `fixer.io` to re-calculate the values according to the set currency. To do that, create a function in the `App.js`, call it `handleAmount1Change`, and pass in `amount1` as an `argument`. This function will help update the state of the first input element. So, when the values in the first input change, the values in the second input will also change with respect to the currency the user sets. So, you will `setAmount2`  to be equal to be `amount1` times the rate of `currency2` divided by the rate of `currency1`. After that, call `onAmountChange` in the `CurrencyInput` component tag and pass in this `handleAmount1Change` function.
Here is the code below:

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

###The `handleCurrency1Change` function 
Now, create another function called `handleCurrency1Change` that will handle the state change for the `select` elements that will handle the change in currencies. You run the same code for it except that you pass in `currency1` in the `setCurrency1` function this time. Then, you call the `onCurrencyChange` function in the `CurrencyInput` JSX element and pass in this `handleCurrency1Change` function.
Here is the code below:

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

###The `handleAmount2Change` function
This function will handle the change in the state of the second input in the app. Pass in `amount2` as an `argument`. Then, `setAmount1` to be equal to `amount2` times the rate of `currency1` divided by the rate of `currency2`. Then, pass in `amount2` in the `setAmount2` function. After that, call the `onAmountChange` function in the `CurrentInput` tag and pass in this `handleAmount2Change` function. 
Here is the code below:

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

###The `handleCurrency2Change` function
This function will regulate the change in the state of the second `select` element, which controls whatever currency the user chooses. Again, you run the same code as the `handleAmount2Change` except you will call the `setCurrency2` and pass in `currency2`. Now, you can call the `onCurrencyChange` method in the `CurrentInput` tag and pass it in `handleCurrency2Change`. 
Here is the code below:

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

###The `roundUp` function
At this point, if you input a value in one currency, the equivalent value in another currency might be a number with a lot of decimals. So, this function will help round up all the `input` values to a maximum of four decimal places.
Here is the code below:

```js
function roundUp(number) {
   return number.toFixed(4);
 }

```
After that, call this `roundUp` method in the four-state management functions you just created.

One more thing you have to do is set the app’s default state when the user reloads the page. You can do that with another `useEffect`. You then put a conditional statement inside the `useEffect` saying “if `rates` is not empty, then call the `handleAmount1Change` and set its default state to 1 else, call an `init` function.”
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
 

##Conclusion
While building the Currency Converter, we used ReactJS and some of its hooks to implement its functionalities. We also styled the application with CSS3 and some components from React’s Material UI.
With that, you have a completely functional Currency Converter. You can get the source code from my [Github](https://github.com/Nomzy-kush/currency-converter-react) Repo. 

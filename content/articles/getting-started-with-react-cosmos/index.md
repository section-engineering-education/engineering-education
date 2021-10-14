---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-react-cosmos/
title: Getting Started With React Cosmos
description: In this article, we will cover the basics of React Cosmos using a food ordering React application.
author: mary-njeri
date: 2021-09-29T00:00:00-10:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-react-cosmos/hero.jpg
    alt: React cosmos example image
---
The React library has quickly established itself as a popular JavaScript UI library. As a component library, developers can build reusable UI components. However, reusing and implementing tests within the components is a complex task.
<!--more-->
React Cosmos is a React library that provides an environment to reuse, test, and develop UI components in isolation. Using the React Cosmos sandbox, we can interactively change component props and get instant changes during development.

In this article, we will cover the basics of React Cosmos using a food ordering React application. Let us get started!

### Prerequisites
To follow along, you need to have:
- React version 16.8 and Node 10 or newer.
- A web browser. I will be using [Google Chrome](https://www.google.com/chrome/fast-and-secure/).
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/download/).
- Have a basic understanding of the [React](https://reactjs.org/) library and [JavaScript](https://www.w3schools.com/js/) programming language.

### The benefits of React Cosmos in React applications
React has revolutionized frontend development forever. As frontend developers, most of our tasks involve crafting clean and functional UIs.

However, ensuring that they will work flawlessly in large applications involves a lot of testing, compatibility support, and more.

To solve this, we need to ensure consistency in design across components.

The key benefits of using React Cosmos include:
- We can use its Real-time external API mocking for visual regression testing, or even snapshot testing.
- Debugging is much easier due to isolated components.
- Using a component-based library like React is essential in design systems. Building components using React Cosmos ensures reusability across multiple projects. This avoids duplication of effort in creating consistent branding across the product suite.

### Project setup
To get started with React Cosmos, we will clone an app from [this repository](https://github.com/marienjus/React-Cosmos.git). This is a simple food ordering application made using React and [tailwind CSS](https://tailwindcss.com/).

Using [git](https://git-scm.com/) on your system, clone our starter code in this repository with the following command:

```bash
git clone https://github.com/marienjus/React-Cosmos.git
```

Once you've cloned the repo, install dependencies by running `yarn install` or `npm install` in your terminal and open the application in your favorite IDE. Below is the structure of our components in this application.

Our `src/components` folder has:
- A simple reusable `Button` component.
- A `CartCard` component that shows details of a cart item.
- A `Checkout` component that summarizes the cart, such as total price, sub-total price, and delivery fee.
- A `FoodCard` component that displays the details about the food with a button to add the food.

In our `src/pages`, we have:
- The `cart` component page which displays our cart items and the checkout component.
- The `home` page component is our landing page. It renders a navbar and the `FoodCard` component.

Launch the development server with the command below:

```bash
yarn start
```

For npm use:

```bash
npm start
```

The React development server starts at `http://localhost:3000/`. The application in the browser should look like this:

![cosmos landing page](/engineering-education/getting-started-with-react-cosmos/cosmos-app.png)

![cosmos cart page](/engineering-education/getting-started-with-react-cosmos/cosmos-app-cart.png)

Let's install the React Cosmos package as a dev dependency. On your terminal, execute the command below:

```bash
yarn add -D react-cosmos
```

If you are using npm, run the command below:

```bash
 npm i -D react-cosmos
```

To make sure that React Cosmos works with create-react-app, add a `cosmos.config.json` file in your project root folder with the code below:

```json
{
	"staticPath": "public",
	"watchDirs": ["src"],
	"webpack": {
		"configPath": "react-scripts/config/webpack.config"
	},
	"globalImports": ["src/styles/main.css"]
}
```

Here, `watchDirs` and `staticPath` properties tell React Cosmos to watch our `src` directory for any static assets in the public folder.

Finally, We then need to point our webpack config file and use `globalImports` to enable our CSS global files.

Next, we need to install a `cross-env` package to resolve React Cosmos and hot reload issues. To install it, run the following command:

```bash
yarn add cross-env -D
```

Or use npm:

```bash
npm install cross-env -D
```

Finally, we need to add the React Cosmos to the scripts part of our `package.json` file:

```json
  "scripts": {
    "cosmos": "cross-env FAST_REFRESH=false cosmos",
    "cosmos:export": "cross-env FAST_REFRESH=false cosmos-export"
  }
```

Congratulations! You have now set up React Cosmos. In the following section, we will start using React Cosmos in our React application.

### Running React application using React Cosmos
To start the application using the React Cosmos server on your terminal, run the command below:

```bash
npm run cosmos
```

If you prefer yarn:

```bash
yarn cosmos
```

When the server is up and running, navigate to `http://localhost/5000` in your favorite browser, and you should see something like this.

![cosmos starter](/engineering-education/getting-started-with-react-cosmos/cosmos-starter.png)

### Creating a Component using Fixtures
In React Cosmos, we build components by creating fixtures. [Fixtures](https://github.com/react-cosmos/react-cosmos/tree/main/docs#fixtures) are files that contain a default export (as either a React Component or React Node).

React cosmos displays the fixtures in a sandbox explorer. Therefore, to enable React Cosmos to track our components, we need to append `.fixture` to the file names containing it.

To get started, create a file within your `src` folder and name it `Button.fixture.jsx`.

Inside the file, import the Button component as:

```jsx
import Button from "./components/Button/Button";
```

Then export it as default:

```jsx
export default (
	<div>
		<div className="w-50 mx-auto">
			<Button>Cosmos</Button>
		</div>
	</div>
);
```

In our Cosmos Explorer under **ALL FIXTURES**, we should see:

![cosmos button](/engineering-education/getting-started-with-react-cosmos/cosmos-btn.png)

On the right panel, we can edit any of the button component's properties. Let's add a secondary and primary Button variant to a variant prop.

Return to your `src/component` folder and update the `Button.jsx` component with the following code:

```js
export default function Button({ children, variant = "primary" }) => {
  return (
    <div>
    <button
      className={`w-full block h-12 ${
        variant === 'primary' ? "bg-black" : "bg-blue-500"
      } hover:opacity-60 rounded-sm mt-3`}
      style={{ color: 'white', border: "none", outline: "none" }}
      type="button"
    >
      {children}
    </button>
    </div>
  )
}
```

Next, import the fixture feature from `react-cosmos` and the `Button` component.

```jsx
// import useSelect to use enable the selection feature
import { useSelect } from "react-cosmos/fixture";

// Add the Button component to the fixture file
import Button from "./components/Button/Button";
```

Finally, export the Button component as default in our `Buttton.fixtures.js` file.

```jsx
export default () => {
	const [variant] = useSelect("variant", {
		options: ["primary", "secondary"],
	});

	return (
		<div className="w-60 mx-auto">
			<Button variant={variant}>Cosmos</Button>
		</div>
	);
};
```

Let's briefly dissect the above code:

Our Button fixture includes a variant prop with a Control panel hook `useSelect`. We import the `useSelect` hook to enable us to set options for the variant prop. Therefore, in our sandbox, we can manually select this rather than typing.

Let's run a demo in the sandbox:

![cosmos variants](/engineering-education/getting-started-with-react-cosmos/cosmos-variants.gif)

We can toggle between either of the two variant options. Try changing the variant prop to confirm that our background color changes accordingly.

### Creating a fixture for checkout component
Within your `src` folder, add another file as `Checkout.fixture.jsx`:

Import the Checkout component from the `components/Checkout/Checkout` file:

```jsx
import Checkout from "./components/Checkout/Checkout";
```

Next, add mock data inside the checkout fixture file and export it as default.

```jsx
const dummyData = {
	subTotalPrice: 150,
	deliveryFee: 15,
	totalPrice: 165,
};

export default (
	<div className="mx-auto w-50">
		<Checkout
			subTotal={dummyData.subTotalPrice}
			deliveryFee={dummyData.deliveryFee}
			total={dummyData.totalPrice}
		/>
	</div>
);
```

Click on the left panel under **ALL FIXTURE** option. Here, we perform any visual tests by passing different prop values to our `dummyData` object and playing around with it in the sandbox.

### Cards fixture
For this fixture, create a `Cards.fixture.jsx` file within the `src` folder. Our Cards Fixture exports multiple fixtures as objects with React's `export default` keywords.

First, import the CartCard and FoodCard components.

```jsx
import CartCard from "./components/CartCard/CartCard";
import FoodCard from "./components/FoodCard/FoodCard";
import foodImg from "./images/food1.jpg";
```

Next, include the food and order objects which will serve as data for the props.

```jsx
const order = {
	orderId: 1,
	name: "Chicken",
	price: "8.00",
	quantity: 1,
	updateList: () => {},
};

const food = {
	foodId: 2,
	name: "Hot Chicken",
	price: "8.00",
};
```

Finally, export the `FoodCard` and `CartCard` fixtures:

```jsx
export default {
	FoodCard: (
		<FoodCard
			id={food.foodId}
			name={food.name}
			price={food.price}
			imgSrc={foodImg}
		/>
	),
	CartCard: (
		<CartCard
			id={order.orderId}
			name={order.name}
			price={order.price}
			imgSrc={foodImg}
			quantity={order.quantity}
			updateList={order.updateList}
		/>
	),
};
```

Our sandbox has a `Cards` fixture, within it, export `CartCard` and `FoodCard` as components.

This makes everything much more organized, especially as the sandbox gets more fixtures.

### Static exports
When hosting our fixtures as a component library in any static hosting service like Netlify, React Cosmos allows us to export our fixtures.

Run the command below:

```bash
yarn cosmos: export
```

Or

```bash
npm run cosmos: export
```

The export we perform excludes some available development features to reduce dependencies. However, it will allow you to browse fixtures and play with component inputs as in the development sandbox.

### Conclusion
Failing to reuse your components is slowing your development.

React Cosmos improves the developer experience by making it possible to build UI components iteratively and in isolation.

In addition, having features such as snapshot and visual regression testing tailored to our needs makes developers even more productive.

At the time of writing, React Cosmos only supports [Creact React App](https://reactjs.org/docs/create-a-new-react-app.html) and [Nextjs](https://nextjs.org/).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)

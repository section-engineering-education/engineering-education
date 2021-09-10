The React library has quickly established itself as a popular JavaScript UI library. As a component library, developers can build reusable UI components. However, reusing and implementing tests within the components is a convoluted task. React Cosmos is a React library that provides an environment to reuse, test, and develop UI components in isolation. Using the React Cosmos sandbox, we can make changes to components props interactively and get instant changes during development.
In this tutorial, we will cover the basics of React Cosmos using a food odering React application. Let's get started!


### Prerequisites for React Cosmos

- Have versions of React 16.8 and Node 10 or newer.
  
- A web browser, I will be using [Google Chrome](https://www.google.com/chrome/fast-and-secure/).
  
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/download/).
  
- Have a basic understanding of the [React](https://reactjs.org/) library and [JavaScript](https://www.w3schools.com/js/) programming language.

### The Benefits of React Cosmos in React Applications

React has revolutionized frontend development forever. As frontend developers, most of our tasks involve crafting clean and functional UIs. However, ensuring that they will work flawlessly in large applications involves a lot of testing, compatibility support, and more. To solve this, we need to ensure consistency in design across components.

The key benefits of using React Cosmos include:
- We can use its Real-time external API mocking for visual regression testing or even snapshot testing.
  
- Debugging is much easier due to isolated components.
  
- Using a component-based library like React is essential in design systems. Building your components using React Cosmos ensures reusability across multiple projects. This avoids duplication of effort in creating a uniform branding across your product suite.


### Project Setup

To get started with React Cosmos, we will clone an app from this repository. This is a simple food ordering application made using React and [tailwind CSS](https://tailwindcss.com/). Using [git](https://git-scm.com/) on your system, clone our starter code in this repository with the command:

```bash
git clone https://github.com/marienjus/React-Cosmos.git
```

Once you've cloned the repo, install dependencies by running `yarn install` or `npm install` in your terminal and open the application in your favorite IDE. Below is the structure of our components in this application.

Our `src/components` folder has:

- A simple reusable `Button` component.

- A `CartCard` component that shows details of a cart item.
  
- `Checkout` component summarises the cart, such as total price, sub-total price, and delivery fee.
  
- `FoodCard`  component displays the details about the food with a button to add the food.

In our `src/pages`, we have:

- The `cart` component page which displays our cart items and the checkout component.

- The `home` page component is our landing page. It renders a navbar and the `FoodCard` component.
  
Launch the development server with the command:

```bash
yarn start
```

For npm use:

```bash
npm start
```

The React development server starts at `http://localhost:3000/`. The application in the browser should look like this:

![cosmos landing page](./cosmos-app.png)

![cosmos cart page](./cosmos-app-cart.png)


Let's install the React Cosmos package as a dev dependency. On your terminal, execute the command:

```bash
yarn add --dev react-cosmos
```

If you use npm, run the command:

```bash
 npm i -D react-cosmos
```

To make sure that React Cosmos works with create-react-app, add a `cosmos.config.json` file in our project root folder with the code below:

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
Here, `watchDirs` and `staticPath` properties tell React Cosmos to watch our `src` directory any static assets in the public folder. Finally, We then need to point our webpack config file and use `globalImports` to enable our CSS global files.

Next, we should first install a `cross-env` package to resolve the issue with React Cosmos and hot reload. To install it, run the following command:mand:

```bash 
yarn add cross-env -D
```

Or use npm:

``` 
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
To start the application using the React Cosmos server on your terminal, run the command:

`npm run cosmos`

If you prefer yarn:

`yarn cosmos`

When the server is up and running, navigate to http://localhost/5000 in your favourite browser and you should see something like this.

![img](src)

### Creating a Component using Fixtures

In React Cosmos, we build components by creating fixtures. [Fixtures](https://github.com/react-cosmos/react-cosmos/tree/main/docs#fixtures) are files that contain a default export (as either a React Components or React Node). React cosmos displays the fixtures in a sandboxed explorer. Therefore, to enable React Cosmos to track our components, we need to append `.fixture` to the file names containing it.
To get started, create a file within our `src` folder and name it `Button.fixture.jsx`. Inside the file, import the Button component as:

```jsx
import Button  from "./components/Button/Button"
```

Then export it as default:

```jsx
export default (
  <div className="w-60 mx-auto">
    <Button>Cosmos</Button>
  </div>
)
```
In our Cosmos Explorer under **ALL FIXTURES**, we should see:
![]()

Using the right panel, we can update any prop to the button component. Let’s add a variant prop that includes a primary and secondary Button variant.

Go back to our `src/components/Button/Button.jsx`  component and update it with the code below:

```js
const Button = ({ children, variant = "primary" }) => {
  return (
    <button
      className={`block w-full h-12 ${
        variant === 'primary' ? "bg-black" : "bg-blue-600"
      } hover:opacity-70 mt-3 text-sm rounded-sm`}
      style={{ color: '#fff', border: "none", outline: "none" }}
      type="button"
    >
      {children}
    </button>
  )
}

export default Button
```

Next, we need to update the `Button.fixtures.js` file to look like this:

```jsx
import { useSelect } from 'react-cosmos/fixture';
import Button  from "./components/Button/Button";

export default () => { 
  const [variant] = useSelect('variant', {
    options: ['primary', 'secondary'],
  });

return (
  <div className="w-60 mx-auto">
    <Button variant={variant}>Cosmos</Button>
  </div>
)}
```

Let's briefly dissect the above code:
- Our Button fixture includes a variant prop with a Control panel hook useSelect. The useSelect hook is what we use to set options of the variant prop. Therefore, in our sandbox, we can manually select this rather than typing.

Let's run a demo in the sandbox:

We can toggle between either of the two variant options. Try changing the variant prop to confirm that our background color changes accordingly.

### Creating a fixture for Checkout Component

Within your `src` folder, add another file as `Checkout.fixture.jsx`:

Import the Checkout component from the `components/Checkout/Checkout` file:

```jsx
import Checkout from "./components/Checkout/Checkout"
```
Next, add mock data inside the Checkout fixture file and export this as default.

```jsx
const data = {
  subTotal: 100,
  deliveryFee: 5,
  total: 105,
}

export default (
  <div className="w-60 mx-auto">
    <Checkout
      subTotal={data.subTotal}
      deliveryFee={data.deliveryFee}
      total={data.total}
    />
  </div>
)
```

Click on the left panel under **ALL FIXTURE** option to what it looks like in our React Cosmos sandbox.
We perform any visual tests by passing different prop values to our `data` object and playing around with it in the sandbox.

### Cards Fixture
For this fixture, create a `Cards.fixture.jsx` file within the `src` folder. Our Cards Fixture exports multiple fixtures as objects with React's `export default` keywords. 

First, import the CartCard and FoodCard components.

```jsx
import CartCard from "./components/CartCard/CartCard"
import FoodCard from "./components/FoodCard/FoodCard"
```
Next, include the food and order objects which will serve as our data for props.

```jsx
const food = {
  id: 1,
  name: "Peppered Chicken",
  imgURL: "https://sisijemimah.com/wp-content/uploads/2015/07/image70.jpg",
  price: "8.00",
}

const order = {
  id: 1,
  name: "Peppered Chicken",
  imgURL: "https://sisijemimah.com/wp-content/uploads/2015/07/image70.jpg",
  price: "8.00",
  qty: 1,
  updateList: () => {},
}
```

Finally, export the `FoodCard` and `CartCard` fixtures:

```jsx
export default {
  FoodCard: (
    <FoodCard
      id={food.id}
      name={food.name}
      price={food.price}
      imgURL={food.imgURL}
    />
  ),
  CartCard: (
    <CartCard
      id={order.id}
      name={order.name}
      price={order.price}
      imgURL={order.imgURL}
      qty={order.qty}
      updateList={order.updateList}
    />
  ),
}
```
Our sandbox has a `Cards` fixture and within it, export `CartCard` and `FoodCard` as components. This makes everything much more organized, especially as the sandbox gets more fixtures.

### Static Exports

When hosting our fixtures as a component library in any static hosting service like Netlify, React Cosmos allows us to export our fixtures. Run the command:

```bash
yarn cosmos: export
```
OR

```bash
npm run cosmos: export
```

The export we perform excludes some available development features to reduce dependencies but will allow you to browse fixtures and play with component inputs as in the development sandbox.

### Conclusion

Failing to reuse your components is slowing your development. 
React Cosmos improves the developer experience by making it possible to build UI components iteratively and in isolation. In addition, having features such as snapshot and visual regression testing tailored to our needs makes developers even more productive.
As of the time of writing, React Cosmos only supports [Creact React App](https://reactjs.org/docs/create-a-new-react-app.html) and [Nextjs](https://nextjs.org/).

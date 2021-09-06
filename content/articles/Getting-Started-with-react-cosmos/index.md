The React library has quickly established itself as a popular JavaScript UI library. As a component library, developers can build reusable UI components. Reusing and implementing tests within the components is a convoluted task. React Cosmos is a React library the that provides an environment so that developers can reuse, test, and develop UI components in isolation. Using the React Cosmos sandbox, we can make changes to components props interactively and get instant changes during development.


### Prerequisites for React Cosmos

- Have versions of React 16.8 and Node 10 or newer.
  
- A web browser, I will be using [Google Chrome](https://www.google.com/chrome/fast-and-secure/).
  
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/download/).
  
- Have a basic understanding of the [React](https://reactjs.org/) library and [JavaScript](https://www.w3schools.com/js/) programming language.

### Benefits of using React Cosmos

React has revolutionized frontend development forever. As frontend developers, most of our tasks involve crafting clean and functional UIs. Ensuring that they will work flawlessly in large applications involves a lot of testing, compatibility support, and more. To solve this, we need to ensure consistency in design across components.

The key benefits of using React Cosmos include:
- Its Real-time external API mocking can be used for visual regression testing or even snapshot testing.
  
- Debugging is much easier due to isolated components.
  
- Using a component-based library like React is essential in design systems. Building your components using React Cosmos ensures reusability across multiple projects. This avoids duplication of effort in creating a uniform branding across your product suite.


### Project Setup

To get started with React Cosmos, we will clone an app from this repository. This is a simple food ordering application made using React and [tailwind CSS](https://tailwindcss.com/). Make sure you have git installed on your system and clone the repository with the command:

```bash
git clone https://github.com/marienjus/React-Cosmos.git
```

Next, install the needed project dependencies by running `yarn install` or `npm install` in your terminal and open the application in your favorite IDE. Below is the structure of our components in this application.

Our `src/components` folder has:

- A simple reusable `Button` component.

- A `CartCard` component that shows details of a cart item.
  
- `Checkout` component has a summary of the cart such as total price, sub-total price, and delivery fee.
  
- `FoodCard`  component displays the details about the food with a button to add the food.

In our `src/pages`, we have:

- The `cart` component page will display the cart items and the checkout component.

- The `home` page is our app’s landing page. It renders a navbar and food items.
  
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

The next step is to solve an issue that arises with React Cosmos and create-react-app hot reload by adding the `cross-env` package. Install the `cross-env` package with the command:

```bash 
yarn add cross-env -D
```

Or use npm:

``` 
npm install cross-env -D
```

Finally, we need to update our `package.json` file to include the React Cosmos in the scripts section:

```json
  "scripts": {
    "start": "npm run watch:css && react-scripts start",
    "build": "npm run watch:css && react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "watch:css": "postcss src/styles/tailwind.css -o src/styles/main.css",
    "cosmos": "cross-env FAST_REFRESH=false cosmos",
    "cosmos:export": "cross-env FAST_REFRESH=false cosmos-export"
  }
```

In the next section, we will begin working with React Cosmos!

### Running React application using React Cosmos
To start the application using the React Cosmos server on your terminal, run the command:

`npm run cosmos`

If you prefer yarn:

`yarn cosmos`

After the server starts successfully, head over to `http://localhost/5000` in your favorite browser, you should see this.

![img](src)

### Creating a Component using Fixtures

In React Cosmos, we build components by creating fixtures. [Fixtures](https://github.com/react-cosmos/react-cosmos/tree/main/docs#fixtures) are files that contain a default export (as either a React Components or React Node). React cosmos displays the fixtures in a sandboxed explorer. We need to add `.fixture` to the file names containing our component so that React Cosmos can track it. 
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
In our sandbox, we have a `Cards` fixture. Within it, we have CartCard and FoodCard as components. This makes everything much more organized especially as the sandbox gets more fixtures.

### Static Exports

When hosting our fixtures as a component library in any static hosting service like Netlify, React Cosmos allows us to export our fixtures. Simply run the command:

```bash
yarn cosmos: export
```
OR

```bash
npm run cosmos: export
```

The export we perform excludes some development available features to reduce dependencies but will allow you to browse fixtures and play with component inputs as in the development sandbox. 

### Conclusion

Failing to reuse your components is slowing your development. 
React Cosmos improves the developer experience by making it possible to build UI components iteratively and in isolation. Having features such as snapshot and visual regression testing tailored to our needs makes developers even more productive.
As of the time of writing, React Cosmos only supports [Creact React App](https://reactjs.org/docs/create-a-new-react-app.html) and [Nextjs](https://nextjs.org/).

The React library has quickly established itself as a popular JavaScript UI library. One of its main selling points is that it allows developers to build reusable UI components. React Cosmos is a library that provides a playground environment for testing and developing isolated React UI components. Using the React Cosmos sandbox, we can make changes to props and have interactive and instant changes during development.

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


To do that you only need to write some fixtures for your components. A fixture is simply a snapshot of the component, a serialization of its state and props at a given moment. Then, point Cosmos at those fixtures and you’re ready to go.

### Project Setup

To get started with React Cosmos, we will clone an app from this repository. This is a simple food ordering application made using React and [tailwind CSS](https://tailwindcss.com/). To clone it, make sure you have git installed on your system then run the command:

```bash
git clone https://github.com/Origho-precious/cosmos-food.git
```

Next, install the needed project dependencies by running `yarn install` or `npm install` in your terminal and open the application in your favorite IDE.


Let’s quickly go over how our components are structures in this project.

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

`yarn add --dev react-cosmos`

If you use npm, run the command:

`npm i -D react-cosmos`

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

### Building Components using Fixtures

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
In our Cosmos Explorer, we should see:
![]()

### Conclusion

Failing to reuse your components is slowing your development. 
React Cosmos improves the developer experience by making it possible to build UI components iteratively and in isolation. Having features such as snapshot and visual regression testing tailored to our needs makes developers even more productive.
As of the time of writing, React Cosmos only supports [Creact React App](https://reactjs.org/docs/create-a-new-react-app.html) and [Nextjs](https://nextjs.org/).

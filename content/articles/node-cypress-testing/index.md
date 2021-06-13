Testing is a vital part of software development. It is the main focus when following the `Test Driven Development` principle. It ensures the behavior of our applications is as what we expect it to be. **End-to-end** testing, or e2e in short, is a testing approach used to check for user interactions with the application. We can use [`cypress`](https://www.cypress.io/) to carry out these e2e tests.

### Introduction

Cypress is an end-to-end testing framework that helps developers test their web applications easily and provides an interface for them to easily analyze their test progress and results.
This article aims to help readers understand how cypress works and how to write end-to-end tests.

In order for you to follow through the tutorial comfortably, you will need:

1. A basic understanding of NodeJs and have it installed in your machine
2. Knowledge in Javascript language and HTML
3. Understanding of testing in general

With that let's get started.

#### Step 1: The setup

Create a new folder and give it any name of your choice. I will name mine `cypress-testing`. Navigate to the directory in your terminal and run the following to initialize an empty node project.

```bash
npm init -y
```

Next up, let's install cypress in our project. Run the following command:

```bash
npm i cypress --save-dev
```

We save it as a dev dependency since we will be running the tests locally and the dependency is not needed in a production environment. The command might take a while to complete. This is because it also downloads the `Cypress binary`.

This is a better approach than installing the cypress desktop application since it is better in CI/CD operations. You can read more about it [here](https://docs.cypress.io/guides/getting-started/installing-cypress#npm-install).

Once the binary is done downloading, you can run the following command to view the simple GUI that comes with it.

```bash
node_modules/.bin/cypress open
```

You can remove the `example` folder since we will be writing our own tests from scratch.

Next up, we will configure cypress to work with out local server. Add a script to start our cypress binary in our package.json file.

```json
  "scripts": {
    "test": "cypress open"
  },
```

Then we set the base url of our server. This will tell cypress where the project is rendered. In the `cypress.json` file, add the following record

```json
{
  "baseUrl": "http://localhost:5000"
}
```

Port 5000 is the default port for the `serve` package which we shall use to render the application.

#### Step 2: The HTML form

We shall be writing tests for a HTML form. For this, we need a simple form with some fields and a submit button. Add the following code in an `index.html` file in the root directory of the project.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Cypress Testing</title>
  </head>
  <body>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <button type="submit">SEND</button>
      </div>
    </form>
  </body>
  <script>
    const form = document.forms[0];
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  </script>
</html>
```

This is a basic form with 2 fields and a submit button. We add a script below to prevent the form from submitting once we are done.

Now that we have the basics done, we can now get into the real testing and see what cypress can do.

To view the page, run `npx serve` to render the index file. The command also copies the url in your clipboard so you can directly paste it in your browser.

#### Step 3: Writing tests

In your `cypress/integrations` folder, create a new file named `forms.spec.js`. This is the naming convention followed in testing with cypress.

To write tests, we use the `describe` keyword.

```js
describe("Forms test", () => {
  // tests go here
});
```

_Fun fact: the same keyword is used in `mocha` testing framework._

All the tests involving our forms will go in here. It receives the name of the collection/suite of the tests and a callback that holds all the actual tests. To test a single action, we use the `it` keyword. First, let's test whether we can get to the form. Go ahead and add the following inside the describe function.

```javascript
it("can get to the form", () => {
  cy.visit("/");
  cy.get("form");
});
```

`cy` stands for cypress and this allows us to access the various actions that cypress offers.
`.visit` instructs cypress to navigate to the specified route while `.get` is used to select the elements in the page.

Run the `test` command we created a while ago. The binary should appear with a list of all the integrations test in your application. In our case, we should have only one test displayed.

![cypress-binary](/node-cypress-testing/cypress-binary.png)

Go ahead and click the `Run (n) integration spec` button. This will open a new tab in your default browser and run the test. The result should be similar to the one below.

![test-result](/node-cypress-testing/test-result.png)

Awesome stuff right? 😎

Another great thing about cypress is that the test GUI actively listens to the changes in the `spec` files. Once you add tests and save the file, the changes should reflect in the binary and browser.

The cypress GUI is interactive and you can explore by checking which elements are tested individually by clicking on the test name.

Let's test the form inputs. We can use the `.type` method to mimick a user typing action in a field and ensure the value returned by the input is still the same.

For that, add the following test still under the forms test suite.

```javascript
it("can fill the form", () => {
  cy.get('input[id="name"]').type("linus").should("have.value", "linus");
});
```

The test passes, obviously! You can try out different values and check for differenced. If you notice, we used the `id` attribute to get the input. We can also use the `name` attribute too.

We use the `.should` method with the `have.value` assertion to confirm the value. You can read more about assertions in [this section](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Assertions) of the docs.

To test submission, you can use the `.submit` function like so:

```javascript
it("can submit the form", () => {
  cy.get("form").submit();
});
```

The result of submitting the form is logged in the console so you can check the chrome devtools for the value.

### Conclusion

Those are just a few tests you can carry out using cypress. There are methods like `.on` and `.its`. You can go ahead and play around with the values as you learn more about testing. There are network request tests with cypress which can help mock the functionality after submitting your form.

Cypress makes testing easy for developers and ensure your follow a clean TDD approach when creating your applications. You can find the source code for this tutorial on [Github](https://github.conm/LinusMuema/cypress-testing).

Have fun coding!

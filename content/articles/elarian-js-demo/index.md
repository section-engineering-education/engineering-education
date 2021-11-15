Customer service is important to your business because it retains customers and extracts more value from them. By providing top-notch customer service, businesses recoup customer acquisition costs and cultivate a loyal following that refers customers, serves as case studies, and provides testimonials and reviews.
Elarian is a framework that helps you build a customer service strategy that is aligned with your business goals. It simplifies the process of building data-driven applications by engaging customers over channels such as SMS, UUSD, Telegram bots, WhatsApp, and more.
 
### Prerequisites

1. A Text Editor, I recommend [VS Code](https://nodejs.org/en/) for development
2. A [Node.js](https://code.visualstudio.com/) runtime installed in your machine
3. A basic understanding of the [JavaScript](https://www.w3schools.com/js/DEFAULT.asp) programming language, preferably ES6 and above.
4. You will need an Elarian account. To create a dashboard sign up to [elarian](https://account.elarian.com/auth/signup).

### Creating an account
Head over to [elarian](https://account.elarian.com/auth/signup) to create an account using GitHub account or else, Google account or even use your email and password.

A successful login will take you to your AstraDB dashboard. Then, on the left panel of the dashboard, click create database.

### Setup the Node.js project 
We will create a project folder and name it `elarian-app-demo`:

```bash
mkdir elarian-app-demo
```

Next, open the project folder on your IDE and initialize the Node.js app:

```bash
cd elarian-app-demo && npm init -y
code .
```

The `npm init -y` command will create a `package.json` file for application dependencies.


```js
const { Elarian } = require('elarian');

const dotenv = require('dotenv');

dotenv.config()
```

```js
const elarianClient = new Elarian({
    orgId: 'el_org_eu_LdW7eC',
    appId: 'el_app_jRFCDq',
    apiKey: 'el_k_test_3e8ae97fccf78ab4b5796fa45c3d2ccd0e257bab50753668d625808673243247'
});
```

```js
elarianClient
        .on("error", (error) => {
          console.log("connection error", error)
        })
        .on("connected", () => {
          console.log("Connection is successfully")
        })
        .connect()
```

### Elarian Customer Data

1. Metadata allows you to store data about your cutomer in a key-value map associated with a unique customer. The data can be in either string or binary format.
2. AppData allows you to store data that will track state of user in your application. For example, in our USSD application, we will need AppData to hold the state of user at different transitions. The data is stored in memory for quick access.

### Integrating Elarian USSD service

Working with Customer Data
Elarian provides several constructs to help you organize your customer data. The broad categories of all supported customer data are Identity Data, Metadata and App Data. In this section we are only going to interact with app data and metadata.


```js
const USSDHandler = async (notification, customer, appData, callback) => {
    try {
    const input = notification.input.text;
    let screen = "home";

    // appData 
    if (appData) {
      screen = appData.screen;
    }

    const customerData = await customer.getMetadata();

    let { email, name, age, password } = customerData;

    const menu = {
      text: "",
      isTerminal: false,
    };

    let nextScreen = screen;

    if (screen === "home" && input !== "") {
      if (input === "1") {
        nextScreen = "request-email";
      } else if (input === "2") {
        nextScreen = "request-password";
      } else if (input === "3") {
        nextScreen = "quit";
      }
    }

    if (screen === "home" && input === "") {
      if (name) {
        nextScreen = "request-password";
      }
    }
    }
}
```

```js

    switch (nextScreen) {
      case "quit":
        menu.text = "Great having you";
        menu.isTerminal = true;
        nextScreen = "home";
        callback(menu, {
          screen: nextScreen,
        });
        break;

      case "info":
        name = input;
        menu.text = `Hello ${name}`;
        menu.text = "Thank you for joining us,";
        menu.isTerminal = true;
        nextScreen = "home";
        callback(menu, {
          screen: nextScreen,
        });
        break;

      case "request-email":
        menu.text = "Please enter your email";
        nextScreen = "request-name";
        callback(menu, {
          screen: nextScreen,
        });
        break;

      case "request-name":
        menu.text = "Please enter First and Last names";
        nextScreen = "request-age";
        callback(menu, {
          screen: nextScreen,
        });
        const resp = await customer.updateMetadata({
          email: input,
        });
        console.log(resp);
        break;

      case "request-age":
        menu.text = "Please Enter your Age";
        nextScreen = "password";
        callback(menu, {
          screen: nextScreen,
        });
        await customer.updateMetadata({
          name: input,
        });
        break;

      case "request-password":
        menu.text = "Enter your password";
        (nextScreen = "info"),
          callback(menu, {
            screen: nextScreen,
          });
        break;

      case "password":
        menu.text = "Please set a password";
        nextScreen = "authorize-account";
        callback(menu, {
          screen: nextScreen,
        });
        await customer.updateMetadata({
          age: input,
        });
        break;

      case "authorize-account":
        menu.text = `Great! ${name}, you have joined Elarian!`;
        menu.isTerminal = true;
        nextScreen = "home";
        callback(menu, {
          screen: nextScreen,
        });
        await customer.updateMetadata({
          password: input,
        });
        break;

      case "home":
      default:
        menu.text = "Welcome to Elarian!\n1. Register\n2. Login\n3. Quit";
        menu.isTerminal = false;
        callback(menu, {
          screen: nextScreen,
        });
        break;
    }
  } 
```


### Conclusion

Elarian provides a customer service startegy that is time and cost effective. Having this in place can enable your brand to stand out from the competition maintain positive customer experience, and reputation. With the vast cloud services available, we can easily integrate payment solutions such as M-Pesa, provide WhatsApp and Telegram bots that integrate seamlessly with your applications, and more.

For further learning on how to integrate UUSD, SMS, and perform other communication functions, check out [Elarian docs](https://developers.elarian.com/introduction-to-elarian/what-is-elarian).


Engagement Automation

Elarian allows you to initiate requests to customers and handle notifications from customers through communication or payment providers. In line with the customer being the unit of abstraction, all data that a customer generates is stored in the customer's perspective, making it easy for your application to build a better profile of the customer's behavior.


Customer Data Management

Elarian provides several constructs to help you organize your customer data. The broad categories of supported customer data are Identity Data, Metadata, and App Data.

Identity Data

Identity Data refers to data that allows your application to identify one customer or groups of customers. At the moment, there are four primary pieces of identity data, and these are customerNumber, customerId, secondaryId, and tags.

Metadata

Metadata allows you to store arbitrary data about your customer in a key-value map associated with a unique customer. The data can be in either string or binary format, which allows you to serialize complex objects and associate them with the customer. Examples of metadata could be a user's address, language preference, or gender.

App Data

App Data allows you to store arbitrary data to help determine the state of a user for a specific application. Using the survey application as an example, you could use app data to store what question you're currently waiting for the user to answer. App data can also be in string or binary format.

A customer can have multiple instances of app data linked to them, e.g., the survey app data and the loyalty program app data. The appId passed while establishing a connection determines the instance of the customer's app data that will be made available. Another way to think about this is establishing connections to different databases, only that the database (app data) stores information for a single customer.

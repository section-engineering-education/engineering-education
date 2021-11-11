Customer service is important to your business because it retains customers and extracts more value from them. By providing top-notch customer service, businesses recoup customer acquisition costs and cultivate a loyal following that refers customers, serves as case studies, and provides testimonials and reviews.
Elarian is a framework that helps you build a customer service strategy that is aligned with your business goals. It simplifies the process of building data-driven applications by engaging customers over channels such as SMS, UUSD, Telegram bots, WhatsApp, and more.
 
 ### Prerequisites
1. A Text Editor 
2. A Node.js runtime installed in your machine
3. A basic understanding of JavaScript 
4. Elarian account for dashboard access

### Creating an account


### Setup the Node.js project 

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
### Integrating Elarian USSD service

Working with Customer Data
Elarian provides several constructs to help you organize your customer data. The broad categories of all supported customer data are Identity Data, Metadata and App Data. In this section we are only going to interact with app data and metadata.

App Data
App Data allows you to store arbitrary data to help determine the state of a user for a specific application. As you are going to see later in the example code below, we are going to store the state of the USSD app as it transitions from one state to another.

Metadata
Metadata allows you to store data about your cutomer in a key-value map associated with a unique customer. The data can be in either string or binary format.

```js
const USSDHandler = async (notification, customer, appData, callback) => {
    try {
    const input = notification.input.text;
    let screen = "home";

    // appData stores data in memory for fast as quick access
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

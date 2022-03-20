### Building a Time Scheduled Communication micro-service using Node.js

In this article, we will build a Node.js application that automatically sends messages to users at a specified time interval.

### Prerequisites

To follow along in this article, it is helpful to have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.

- Basic knowledge of working with JavaScript.

- A [twilio](https://www.twilio.com) developer account.

### Overview

- [Setting up the application](#setting-up-the-node.js-application)

- [Configuring Twilio on the application](#configuring-twilio-on-the-application)

- [Sending a message using Twilio API](#sending-a-message-using-twilio-api)

- [Automating process flow using node-cron](#automating-process-flow-using-node-cron)

- [Conclusion]

### Setting up the application

To set up the application, proceed to your preferred project folder and then initialize the project with the following command:

```bash
npm init -y
```
The above command will create a *package.json* file on the project directory with all the default configurations.

In the project, we will need the following dependencies:

- dotenv : For loading environmental variables.
- node-cron : For running our program on a timely basis.
- twilio : For sending messages.
- nodemon : For automatically restarting the development server.

Install the dependencies by running the following command:

```bash
npm i --save dotenv node-cron twilio
npm i --save-dev nodemon
```
On *package.json*, modify the *scripts* object to have the following:
```js
"scripts": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
}
```
Create an *index.js* file on the root project directory. The file will host all the functionalities we will implement in the later steps.

### Configuring Twilio on the application

To be able to send a message via Twilio API, you will need to have to get your credentials first. On the project folder, create a *.env* file. The file will host the credentials from Twilio.

On the file, add the following:

```js
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="your_twilio_phone_no"
```

To get the above credentials, from your [Twilio dashboard](https://console.twilio.com/), under *Project Info*, copy the value of *ACCOUNT SID* and paste it on the file.
Do the same for *AUTH TOKEN*  and *PHONE NUMBER*.

Once you have the credentials set, you are ready for the next step.

### Sending a message using Twilio

On the *index.js* file:

- Import the necessary modules:

    ```js
    const twilio = require('twilio');
    const dotenv = require('dotenv');
    ```

- Load the environmental variables by initializing the *config()* method from *dotenv*:

    ```js
    dotenv.config();
    ```

- Create a function to send a message:

    ```js
    async function send_message(message){

        // Get the variables
        let accountSid = process.env.TWILIO_ACCOUNT_SID;
        let authToken = process.env.TWILIO_AUTH_TOKEN;
        let senderPhone = process.env.TWILIO_PHONE_NUMBER;

        // Initialize the twilio client
        const client = new twilio(accountSid, authToken);

        // Send a message
        let response = await client.messages.create({
            body: message,
            from: senderPhone,
            to: 'your_phone_number'
        });

        console.log(response);
    }
    ```

    From the above function, we are:

    1. Getting the environmental variables.
    2. Initializing the Twilio client.
    3. Sending a message using the Twilio client.

    On a trial account, the phone number you put in must be verified by Twilio. You can access your verified phone number list from [here](https://console.twilio.com/us1/develop/phone-numbers/manage/verified). In case you want to send to a different number than the ones on the list, ensure you add it by clicking the *Add new caller ID* button on the top right.

    In case you want to send to more than one party, use an array and separate the phone numbers with a comma as follows:

    ```js
    ['phone_number_1','phone_number_2']
    ```

    Below the function, add the following to send a hello message:

    ```js
    send_message("Hello there");
    ```
    Run the function using the following command:

    ```bash
    npm run start:dev
    ```
    Once the function runs, You should receive a *hello there* message on the phone number that you set.

    In the next step, we will automate the process on a timely basis.

### Automating process flow using node-cron

Automating the process flow on a timely basis involves sending a message after a set time. For example: after every hour, minute, second, or even day.

To implement the above functionality, follow the following steps:

1. Import the *node_cron* module:

    ```js
    const node_cron = require('node-cron');
    ```

2. Write a scheduler to call the function after every five minutes:

    ```js
    node_cron.schedule('*/5 * * * *', () => {
        // Run the function after every five minutes.
        console.log("Running after every five minutes");
        send_message('Hello There!'); 
    });
    ```
Ensure that the function is still running. If it is not, start it with the same command we used in the prior step.

From there on, you will recei8ve a *Hello There!* message after every five minutes.

### Conclusion

In this article, we have implemented a time-scheduled micro-service for sending messages. To gain more insights on the tools we have used, consider the following resources:

- [Twilio message API](https://www.twilio.com/docs/sms/api)

- [node-cron package](https://www.npmjs.com/package/node-cron)

You can also find the finalized code from this [GitHub repository](https://github.com/mwangiKibui/sms_microservice).

Happy coding!
Paypal is an online payment platform that allows users to transfer funds worldwide. Paypal makes it easier for merchants to accept online payments through their websites. Paypal provides processing for both Visa and Mastercard payments.

### Project setup
Create a folder named `paywave`. Change the working directory to the `paywave` directory created above by executing the command below.

```bash
$ mkdir paywave
$ cd paywave
```
To create a Node.js application in the `paywave` folder we created above, execute the command below.

```bash
$ npm init
```
- `npm init` command adds `package.json` file to our `paywave` directory, making it a Node.js application.
```bash
$ npm i express
```

```bash
$ npm i nodemon
```

```bash
$ npm i paypal-rest-sdk
```


```javascript
const express = require('express');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': '####yourclientid######',
  'client_secret': '####yourclientsecret#####'
});

const app = express();

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));


app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
```

[Paypal developer portal](https://developer.paypal.com/)


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>PayPal Node App</title>
</head>
<body>
  <h1>Coding Shiksha App Store</h1>
  <h2>Buy For $25</h2>
  <form action="/pay" method="post">
    <input type="submit" value="Buy">
  </form>
</body>
</html>
```


Add to index.js

```javascript
app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Redhock Bar Soap",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Washing Bar soap"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});
```



```javascript
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});
```

```javascript
app.get('/cancel', (req, res) => res.send('Cancelled'));
```

### Conclusion
Now that you have learned how to integrate PayPal checkout into a Node.js application, add a success and error page to the application we created. The full source for the application can be downloaded [here]().

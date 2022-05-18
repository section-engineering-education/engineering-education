---
layout: engineering-education
status: publish
published: true
url: /ipay-mpesa-stk-push-api-using-python/
title:  IPay Mpesa STK Push API using Python
description: This tutorial will guide the reader on how to implement the IPay M-Pesa STK push API using Python. 
author: dianne-sandra
date: 2022-04-29T00:00:00-09:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ipay-mpesa-stk-push-api-using-python/hero.jpeg
    alt: IPay Mpesa STK push API using Python Image
---
IPay is an online payment gateway widely used in Africa. It has streamlined the payment process and allowed merchants to accept transactions from third-party platforms such as VISA, Mastercard, Kenswitch, M-Pesa, and Airtel Money. 
<!--more-->
IPay has the Customer to Business (C2B), Business to Business (B2B), Business to Customer (B2C) and STK push APIs, which work together to enhance the transaction experience. 

In this tutorial, we will be using the Ipay STK-Push endpoints using Python. IPay has made it possible for developers to send the prompt to M-Pesa and Airtel Money users using a single codebase.

STK push is a request that triggers a USSD prompt on a mobile phone. For example, the IPay STK push prompt contains the amount deductible, the merchant's account name, and the pin input field. By the end of this article, the reader should be able to integrate iPay API into a Python project.

### Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Initialization](#step-1-declare-variables)
- [Prepare request params](#step-2-prepare-the-request-parameters)
- [Transaction initiation](#step-3-create-transaction-initiator-function)
- [SIM Toolkit trigger](#step-4-create-stk-trigger)
- [Transaction Status](#step-5-create-transaction-status-checker)
- [Intergrating with Flask](#step-6-intergrating-with-a-python-web-framework)
- [Send SIM Toolkit endpoint](#step-7-api-initiate-stk-endpoint)
- [Verify Transaction](#step-8-api-check-transaction-status)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this article, the reader should:
- Be able to use different data types in Python.
- Be able to use Python's package managers.
- Be registered for the iPay Merchant account to get a production credential. In this tutorial, we will be using development credentials.

### Step 1 - Project initialization and variable declaration
Open your favourite IDE and create a Python file, `ipay.py`. We need to import some Python libraries to interact with the endpoints to get started with the code. 

We will install **requests** using pip. Pip is a package manager that can install modules and packages that do not come in Python's standard library. 

First, make sure that pip is part of your System variables (Windows) or environment variables (macOS and Linux). Then run the command below in the terminal.

```bash
pip install requests
```

Inside the `ipay.py` file, add the snippet below:

```Python
import requests
import hmac
import hashlib
import json

#Needed to initate the payment request
iPayTransact = "https://apis.ipayafrica.com/payments/v2/transact"

#Triggers the SIM ToolKit for authorization of payment on the user's handset.
iPayMpesa = "https://apis.ipayafrica.com/payments/v2/transact/push/mpesa"
iPayAirtel = "https://apis.ipayafrica.com/payments/v2/transact/push/airtel"

iPayKey = "SECretKey"  #use "demoCHANGED" for testing where vid is set to "demo"

#Vendor ID
iPayVid = "demo"  #Production Vendor ID will be provided once they have set up your Merchant account
iPaySecret = b"demoCHANGED"
```

We will be using the HTTP library to send requests to iPay servers. The  HTTP responses are processed with the `json` library. 

We have populated the variables `iPaySecret` and `iPayVid` with development values. 

>Only use the iPay provided production credentials after deploying your implementation to the development server for the funds to reflect in your merchant account.

### Step 2 - Prepare the request parameters
We will define a function that will format our data into a [dictonary](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) that the API can process. 

The amount specified should be at least 10KES. The phone parameter takes a 15 digit numeric string in the format 2547XXXXXXXX. The email parameter takes the customer's email, which can send iPay receipts. The notifications parameter is used to specify whether the customer should get a receipt or not. Set to 1 if you want a receipt to be sent.  

The dictionary contains the hash key, which authenticates to the iPay system. We will use [HMAC](https://en.wikipedia.org/wiki/HMAC) with SHA-256 encryption to create a digital signature using values from the dictionary.

```python
def prepare_stk_data(order_id, amount, phone, email, notifications=0):
    iPayData = {
        "live": 0,
        "oid": order_id,
        "inv": order_id,
        "amount": amount,
        "tel": customer_phone,
        "eml": customer_email,
        "vid": iPayVid,
        "curr": "KES",
        "p1": "YOUR-CUSTOM-PARAMETER",
        "p2": "YOUR-CUSTOM-PARAMETER",
        "p3": "YOUR-CUSTOM-PARAMETER",
        "p4": "YOUR-CUSTOM-PARAMETER",
        "cbk": "https://enktpf6b4e4rm.x.pipedream.net",
        "cst": customer_notifications,
        "crl": 0,
        "autopay": 1
    }
    # The hash digital signature hash of the data for verification.
    hashCode = f"{iPayData['live']}{iPayData['oid']}{iPayData['inv']}{iPayData['amount']}{iPayData['tel']}{iPayData['eml']}{iPayData['vid']}{iPayData['curr']}{iPayData['p1']}{iPayData['p2']}{iPayData['p3']}{iPayData['p4']}{iPayData['cst']}{iPayData['cbk']}"
    h = hmac.new(iPaySecret, bytes(hashCode, 'utf-8'), hashlib.sha256)
    hash = h.hexdigest()
    iPayData["hash"] = hash
    return iPayData
```

### Step 3 - Create transaction initiator function
Our second function will make a POST request to the initiator endpoint we had named `PayTransact`. We call the first function *prepare_stk_data/5()* with the necessary parameters, then change its result to a JSON string using the [dumps](https://docs.python.org/3/library/json.html#json.dump) function. 

We will utilize the post function and set the header to accept JSON data as the payload.

```python
def init_stk(order_id, customer_tel, customer_email, amount, send_receipt=0):
    data = prepare_stk_data(order_id, amount, customer_tel,
                            customer_email, customer_notifications=send_receipt)
    response = requests.post(iPayTransact, headers={
                             "Content-Type": "application/json; "}, data=json.dumps(data))
    response = response.json()
    # print(response)
    response['data']['vid'] = data["vid"]
    response['data']['tel'] = customer_tel
    response['data']['email'] = customer_email
    return response['data']
```

The following output contains the `order_id`, `account name`, `available payment channels` and the `sid`. 

The `sid` can be used with the other payment channels, for example, Airtel STK push. The `init_stk/5` function returns all this data so that it can be processed in our following function. 

IPay servers respond with a status of 0 if something went wrong and a status of 1 paired with header_status 200 if everything was fine.

```json
{
   "header_status":200,
   "status":1,
   "data":{
      "sid":"DSJDEM315DA1643707992229259444DEMO_invalid",
      "oid":"dsjknkjsdn",
      "amount":"10",
      "account":"FT231123314C",
      "payment_channels":[
         {
            "name":"MPESA",
            "paybill":"261144"
         },
         {
            "name":"AIRTEL",
            "paybill":"510800"
         },
         {
            "name":"EQUITEL",
            "paybill":"510800"
         }
      ],
      "hash":"8937a5706eef29167a10bda67ed01a4cb9840d72ddf7f0d7e5a531efbb7039c0"
   }
}
```

### Step 4 - Create STK trigger
Next, we need to add a function that sends the STK prompt to the user. We will be using the `hash` and `sid` from the previous function to make a payload for the POST request. 

We need to check whether the *init_stk/5* returned a successful result from the initiator endpoint. Then, we can create a new dictionary containing a new hash generated by concatenating the phone number, the sid from the previous function, and the Merchant ID.

```python
def send_stk(order_id, customer_telephone, customer_email, amount):
    stk_data = init_stk(order_id, customer_telephone, customer_email, amount)

    if stk_data['status'] == 1:
        vid = stk_data['vid']
        sid = stk_data['sid']
        
        hashCode = f"{customer_telephone}{vid}{sid}"
        h = hmac.new(iPaySecret, bytes(hashCode, 'utf-8'), hashlib.sha256)
        hash = h.hexdigest()
        data = {
            "phone": customer_telephone,
            "vid": vid,
            "sid": sid,
            "hash": hash
        }
        response = requests.post(iPayMpesa, headers={
                                "Content-Type": "application/json; "}, data=json.dumps(data))
        response = response.json()

        if response['status'] == 1:
            return (True, "Successfully sent to the client", order_id)
        else:
            return (False, "An error occurred ")
        
    else:
        return (False, "An error occured while initiating request")
```

The above snippet should return the following output:

```json
// Response for Safaricom M-Pesa
{
   "header_status":200,
   "status":1,
   "text": "A Payment request has been sent to the MPESA number 2547XXXXXXXXX."
}

```

![Mpesa STK prompt](/engineering-education/ipay-mpesa-stk-push-api-using-python/prompt.jpeg)

The prompt has a 10-second timeout, after which the request will be cancelled. If many requests are sent simultaneously, and the first prompt has not timed out or cancelled on the user's device, the `header_status` will change to 500 and `status` to 0.


### Step 5 - Create Transaction Status Checker
As of writing this, iPay Africa has no REST API callback endpoint where we can direct responses from their servers. 

Therefore we need to write a custom script that checks the transaction status. Depending on the implementation, we could wait for some minutes and then send a query for a particular `order_id`. 

```python
def check_transaction(order_id, vid):
    hashCode = f"{order_id}{vid}"
    h = hmac.new(iPaySecret, bytes(hashCode, 'utf-8'), hashlib.sha256)
    hash = h.hexdigest()
    data = {
        "oid": order_id,
        "vid": vid,
        "hash": hash
    }
    response = requests.post(iPayQueryTransaction, headers={
                             "Content-Type": "application/json; "}, data=json.dumps(data))
    response = response.json()
    print(response)
    if response['status'] == 1:
        return (True, response['data'])
    else:
        return (False, "Transaction not found or something went wrong")
```

Successful Response:

```json
// Transaction Search Responses
{
   "header_status":200,
   "status":1,
   "text":"payment record found",
   "data":{
      "vid":"demo",
      "sid":"NFBDEM315DB1646485374180066716DEMO",
      "oid":"XX-ORDER-ID-XX",
      "transaction_amount":"10.00",
      "transaction_code":"XX-MPESA-RECEIPT-CODE-XX",
      "telephone":"254712345678",
      "firstname":"John",
      "lastname":"Doe",
      "paid_at":"2022-03-05 16:03:12",
      "payment_mode":"MPESA"
   },
   "hash":"XXXXXXXXXXXXXXXXXXX-HASH VALUE-XXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

Failed  Response:

```json
{
   "header_status":404,
   "status":0,
   "text":"no payment record found"
}
```

### Step 6 -Integrating the API with Flask
We will be testing our module  `ipay.py` with Flask. [Flask](/engineering-education/search/?q=Flask) is a lightweight beginner-friendly Python weB framework. 

To get started, open your terminal/command prompt, then run `pip install Flask` after the command has ran successfully, create a new file called `flask.py.`

Import `Flask`, `jsonify` and `request`. `jsonify` will enable us to send JSON responses, while `requests` will help us process incoming requests. Then import the functions `check_transaction` and `send_stk` from the `ipay.py` file we had created earlier.

Next,  import `string`, `random` and `re`, which we will be using to create a random `order_id` to send to the iPay endpoints.

```Python
from flask import Flask, jsonify, request
from ipay import check_transaction, send_stk, iPayVid
import string
import random
import re

app = Flask(__name__)

############ NEXT FUNCTION SHOULD BE HERE ###########

if __name__ == '__main__':
    app.run(debug=True)
```

### Step 7 API: Initiate STK endpoint
We create a function called *initiate_payment*, which will process requests sent to the URL *send_stk*. The function will only handle POST requests with the content header set to *application/json*. The function will return JSON requests using the jsonify function we had imported.

We will add a [Flask function](https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.route) [decorator](https://www.python.org/dev/peps/pep-0318/) which takes the URL as the first argument and a Keyword argument of methods that explicitly specifies the Request type. 

Now we use the `get_json/0` function to convert the incoming JSON string to a python dictionary object, then extract the data using their respective keys.

We then generate a random ten character string which we will use as the order id. Next, we check whether the extracted phone number is valid using regex. 

We also check whether the amount to be paid is at least 10 KES. Now we can pass the extracted data to the `send_stk/4` function if everything is valid.

```python
@app.route('/send_stk', methods=['POST'])
def initiate_payment():

    content = request.get_json()
    phone = content['phone']
    email = content['email']
    amount = content['amount']

    letters = string.ascii_letters
    dummy_order_id = ''.join(random.choice(letters) for i in range(10))
    phone_number = re.match(
        r'2547[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]', phone)
    if phone_number:
        if int(amount) >= 10:
            result = send_stk(
                dummy_order_id, phone_number.string, email, amount)
            if result[0] == 1:
                print(phone_number.string, dummy_order_id, amount)
                return jsonify({"success": True, "message": f"{result[1]} with Order ID: {result[2]}"})
            else:
                return jsonify({"success": False, "message": result[1]})
        else:
            return jsonify({"success": False, "message": "The amount must be at least 10KES"})

```

### Step 8 - API: Check Transaction Status
We need to create an endpoint to check whether the transactions were successful. Below the `initate_payment/0` function create a function called `verify_payment`. Add the Flask function decorator to accept `check` as the URL and POST as the HTTP Request. 

After converting the JSON string to a Python Dictionary and extracting the order_id, we pass the vendor ID and the order ID to the `check_transaction/2` function. We then use `jsonify` to send the response.

```python
@app.route('/check', methods=['POST'])
def verify_payment():
    content = request.get_json()
    order_id = content['order_id']
    result = check_transaction(order_id, iPayVid)
    if result[0] == 1:
        return jsonify({"success": True, "message": result[1]})
    else:
        return jsonify({"success": False, "message": result[1]})
```

![Mpesa and iPay Messages](/engineering-education/ipay-mpesa-stk-push-api-using-python/mpesa-confirm.png)

### My thoughts
Although iPay's REST API implementation is easy to use, it cannot automatically send us payment processing results like Safaricom's Daraja API. Instead, we must query their servers to confirm whether a payment was successful. 

It would be better if their servers could send us some results to a specified endpoint on our server after the user has finished interacting with the STK toolkit prompt.

### Conclusion
In this tutorial, we learned how to consume IPay API endpoints. Our code successfully initiates a SIM toolkit dialogue for M-Pesa users. 

We also learned how to query transactions processed in IPay using order IDs. Our IPay implementation can be integrated with other Python projects; we tested our implementation with a simple Flask powered REST API server. 

Happy Coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)

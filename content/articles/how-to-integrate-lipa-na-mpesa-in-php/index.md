---
layout: engineering-education
status: publish
published: true
url: /how-to-integrate-lipa-na-mpesa-in-php/
title: How To Integrate Lipa na Mpesa in PHP
description: In this tutorial, we discuss the Safaricom's Daraja API that enables for online payments using mobile money.
author: hillary-kiprono
date: 2022-02-01T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-integrate-lipa-na-mpesa-in-php/hero.png
    alt: mpesa transactions stk push
---
Daraja API is an Application Programming Interface that creates a bridge for payment integration to web and mobile apps. In your web app, you can create a button that when a user clicks, they can initiate payment. 
<!--more-->
For example, there is a button that the user clicks to send a request to Safaricom Daraja; upon receiving the request, Daraja sends an STK push which contains the amount to be deducted from the Mpesa wallet. 

The user is prompted to input their PIN. Once the user inputs the PIN, the transaction will be processed. 

### Prerequisites
To follow this tutorial, the reader should:
- Have basic knowledge of PHP.
- Have basics of HTML and CSS.
- A local development environment setup.

#### Goals
- Understand how to create an account in the Safaricom  Daraja API  portal and obtain the credentials details like authentications keys.
- How to integrate Daraja API with PHP.

### Step 1 - Creating a Safaricom Daraja Account.
To create an account in Safaricom Daraja, open the Safaricom API portal via this link [Safaricom Developer Portal](https://developer.safaricom.co.ke/).

### Step 2 - Creating a new app in Safaricom Daraja.
After creating an account, log in and create a new app, and give it a name of your own choice. 

Take note of the `CONSUMER KEY`, `CONSUMER SECRET`, and `Lipa na Mpesa pass key` obtained through the newly created app simulation because we will use them later.

### Step 3 - We simulate our new app to obtain Lipa na mpesa pass key.
To simulate the app, click on APIS, which is on the menu bar and choose the simulation of the customer to business order. 

Then, we need to select the app that we created and start simulating to obtain the passkeys and business shortcode.

### Step 4 - Creating our Project.
Open your code editor, create a new folder (give it a name of your choice), and define a new PHP file and name it as `index.php.`

### Step 5 - Designing User Interface.
In this step, we design an interface that will prompt the user to enter the phone number of their own choice, which they will use to make payment. 

The phone number entered should be a Safaricom number which has the amount the user wants to pay.

>Note: If the user enters the number which does not have balance in mpesa, it will not display STK Push, and vice versa. Also, the phone number should start with a country code like `254727392XXXX.`

```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Form </title>
   </head>
   <style >
      body{
      background-color: skyblue;
      }
   </style>
   <body>
      <center>
         <form style="padding-top: 150px;" action="MpesaTest.php" method="POST">
            <fieldset style="width: 400px; height: 300px; background-color: white;">
               <label style="padding-top: 200px;color:red;">Lipa Online</label>
               <br>
               <input class="input2" type="number" name="amount" placeholder="Enter Amount" style="margin-top: 60px;"> 
               <br><br>
               <input type="number" type="number" name="phone_number" placeholder="enter Phone number">
               <br><br>
               <button class="button" style="color: white; background-color: blue;">
               Make Payment Now
               </button>
            </fieldset>
         </form>
      </center>
      </div>
   </body>
</html>
```

Your final output should be something similar to this:

![Demo1](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo1.png)

### Step 6 - Writing our M-Pesa logic.
Define a new file and name it `MpesaTest.php`. This is where we define our logic to implement the STK Push on the users' phones. 

This code will use the credentials we obtain from creating the Safaricom Daraja  App.

#### Variables declaration
Inside the file we previously created, declare and initialize the following variables using your credentials obtained from an app you created in Safaricom Daraja.
```php
<?php
// Initialize the variables
$consumer_key = 'Lms5EIf2gK16o1sptYPaA3HsfbGUd7fv';
$consumer_secret = 'dgfk1IefQx1SnG1A';
$Business_Code = '174379';
$Passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
$Type_of_Transaction = 'CustomerPayBillOnline';
$Token_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$phone_number = $_POST['phone_number'];
$OnlinePayment = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
$total_amount = $_POST['amount'];
$CallBackURL = 'https://2f50f430.ngrok.io/callback.php?key=your password';
$Time_Stamp = date("Ymdhis");
$password = base64_encode($Business_Code . $Passkey . $Time_Stamp);
?>

```

In the above script;
- `consumer_key` - This variable assists the developer to access Safaricom API.
- `consumer_secret` - Also, this variable assists the developer to access Safaricom API.
- `Business_Code` -Is a business code that receives payment when the customer enters their Mpesa PIN
- `Passkey` -After creating the Daraja App, you will get a passkey.
- `Type_of_Transaction` - Type of transaction to be transacted.
- `Token_URL`-  Authenticate and return the API token used for accessing Lipa Na Mpesa Services in Safaricom Daraja
- `phone_number` - Your Safaricom number you will use to make payment.
- `OnlinePayment`-For the test environment, pass the Safaricom STK processing request
- `total_amount` - The total amount to be deducted from your account after entering your Mpesa Pin.
- `CallBackURL`-URL used to receive notifications from Mpesa API.
- `Time_Stamp` -Time during which the transaction occurs. It is usually in the format(YYYY-MM-DD).
- `password` -Unique password, which is used for encrypting the request.

#### Generating Authentication Token
Next, get an authentication token that will enable us to access and interact with services provided by Safaricom Mpesa.
```php
//generate authentication token.
<?php
$curl_Tranfer = curl_init();
curl_setopt($curl_Tranfer, CURLOPT_URL, $Token_URL);
$credentials = base64_encode($consumer_key . ':' . $consumer_secret);
curl_setopt($curl_Tranfer, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . $credentials)); 
curl_setopt($curl_Tranfer, CURLOPT_HEADER, false);
curl_setopt($curl_Tranfer, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl_Tranfer, CURLOPT_SSL_VERIFYPEER, false);
$curl_Tranfer_response = curl_exec($curl_Tranfer);

$token = json_decode($curl_Tranfer_response)->access_token;
```

In the above script;
- `curl_init()`-The method creates a new session and returns a cURL handle. Which will be stored in the variable called `$curl_transfer`.
- `curl_setopt` — Create a cURL transfer option.
- `CURLOPT_RETURNTRANSFER`- We set it to be true(1) instead of immediately outputting the transfer, return it as a string of the curl exec() return value.
- `CURLOPT_HEADER`- set it to be false to prevent the inclusion of the header in the output.
- `curl_exec`- Obtain the URL and send it to the browser.
- `CURLOPT_SSL_VERIFYPEER`- We set the option false so that the peer certificate verification succeeds.
- `json_decode` is a function that converts a JSON string into an array form.

#### Initiating the STK push on the users' phone
Next, we will implement a code to initiate the STK push on the user's phone. 

We define a variable ` data2_string` to use json_encode on our request parameters. Then, we define a variable called `curl2_response` to execute our curl request.
```php
$curl_Tranfer2 = curl_init();
curl_setopt($curl_Tranfer2, CURLOPT_URL, $OnlinePayment);
curl_setopt($curl_Tranfer2, CURLOPT_HTTPHEADER, array('Content-Type:application/json', 'Authorization:Bearer ' . $token));

$curl_Tranfer2_post_data = [
    'BusinessShortCode' => $Business_Code,
    'Password' => $password,
    'Timestamp' =>$Time_Stamp,
    'TransactionType' =>$Type_of_Transaction,
    'Amount' => $total_amount,
    'PartyA' => $phone_number,
    'PartyB' => $Business_Code,
    'PhoneNumber' => $phone_number,
    'CallBackURL' => $CallBackURL,
    'AccountReference' => 'Hillary',
    'TransactionDesc' => 'Test',
];

$data2_string = json_encode($curl_Tranfer2_post_data);

curl_setopt($curl_Tranfer2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_Tranfer2, CURLOPT_POST, true);
curl_setopt($curl_Tranfer2, CURLOPT_POSTFIELDS, $data2_string);
curl_setopt($curl_Tranfer2, CURLOPT_HEADER, false);
curl_setopt($curl_Tranfer2, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl_Tranfer2, CURLOPT_SSL_VERIFYHOST, 0);
$curl_Tranfer2_response = json_decode(curl_exec($curl_Tranfer2));

echo json_encode($curl_Tranfer2_response, JSON_PRETTY_PRINT);
?>      
```

In the above script;
- `CURLOPT_SSL_VERIFYPEER`- This option determines whether the curl verifies the authenticity of the peer's certificate.
- `CURLOPT_SSL_VERIFYHOST` - Set to zero for connection to succeed regardless of the names in the certificate. To ensure that the SSL peer certificates `Common Name` or `Subject Alternate Name` field matches the given hostname
- `CURLOPT_POSTFIELDS` - Data to POST to server .If you pass a string, int, float, or bool as an input value, JSON encode() will generate JSON that is a basic value (not an object or an array).
- `json_decode`- a function that converts a JSON string into an  array
- `json_encode`-The JSON representation of the specified value is returned as a string.

![Demo2](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo2.png)

### Create a form that will contain a button to confirm payment.
```php
<form class="contact2-form validate-form" action="#" method="post">
   <input type="hidden" name="Check_request_ID" value="<?php echo $curl_Tranfer2_response->Check_request_ID ?>">
   </br></br>
   <button class="contact2-form-btn" style="margin-bottom: 30px;">Confirm Payment is Complete</button>
</form>
```

Output:

![Demo3](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo3.png)

### Conclusion
In this tutorial, we have learned how to create an account in Safaricom  Daraja API, create an  App and obtain the credentials details in the newly created app. 

Also, we have learned how to integrate Safaricom Mpesa STK push, where a user is prompted to enter their phone number and the amount they want to pay.

This then prompts them to receive an  STK  push in their phone number to enter their Mpesa Pin to make payment.

#### References
-[Safaricom Daraja Documentation](https://developer.safaricom.co.ke/).
-[PHP Documentation](https://www.php.net/docs.php).

Happy Coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

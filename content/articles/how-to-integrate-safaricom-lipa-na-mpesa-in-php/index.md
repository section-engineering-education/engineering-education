### How to Integrate Safaricom Lipa Na Mpesa (STK Push) in PHP
Daraja API is an Application Programming Interface that creates a bridge for payment integration to web apps and mobile apps. 

In your web app, you can create a button that when a user clicks, he/she can initiate payment. On clicking the button, a POST request is sent to Daraja with the respective payload. On recieving the request,Daraja sends an STK push which contains the amount that will be deducted from the Mpesa account. The user is prompted to input his/her PIN. Once the user inputs PIN, the transaction is processed. The amount is deducted from the Mpesa balance.

### Prerequisites
- Have some good knowledge of PHP
- Have some basics of HTML and CSS
- How to use XAMPP and VsCode

#### Goals 
- Understand Daraja API
- How to integrate Daraja API with PHP

### Step 1 - Creating a Safaricom Daraja Account.
-To create an account in Safaricom Daraja, click this link [Safaricom Developer Portal](https://developer.safaricom.co.ke/).

### Step 2 - Creating a new app in Safaricom daraja.
-  After creating an account, log in and create a new app, and give it a name of your own choice. Take note of the `CONSUMER KEY` and `CONSUMER SECRET` because we will use them later.

![Creating Saf App](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/create_app.png)

### Step 3 - Creating our Project.
- Open visual studio code editor, create a new folder (give it a name of your choice), open it and define a new PHP file and name  it as `index.php`

### Step 4 - Designing our User Interface.
 In this step, we will write code to prompt the user to enter his/her phone number and amount to pay and finally a button to confirm payment.

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Lipa na Mpesa Online</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>

    <div class="bg-contact2" style="background-image: url('images/bg-01.jpg');">
        <div class="container-contact2">
            <div class="wrap-contact2">
                <form class="contact2-form validate-form" action="lipaOnline.php" method="post">
                    <span class="contact2-form-title">
                        Make a Payment
                    </span>

                    <div class="wrap-input2 validate-input">
                        <input class="input2" type="number" name="amount">
                        <span class="focus-input2" placeholder="enter amount"></span>
                    </div>

                    <div class="wrap-input2 validate-input" data-validate = "Valid phone number is required">
                        <input class="input2" type="tel" name="phone">
                        <span class="focus-input2" data-placeholder="enter your phone number "></span>
                    </div>

                    <div class="container-contact2-form-btn">
                        <div class="wrap-contact2-form-btn">
                            <div class="contact2-form-bgbtn"></div>
                            <button class="contact2-form-btn">
                                Complete Payment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>

```
### Step 5 - Writing our Mpesa Logic.
Define a new file and name it `mpesa.php`. 

#### Variables Declaration
Inside the file declare and initialize the following variables using your credentials obtain from an app you created in  safaricom Daraja.
```php
 <?php
            // Initialize the variables
            $consumer_key = 'DcFYldKougZCBkJVkq4YfiTSYfiUWWYi';
            $consumer_secret = 'lMpyl1gGsismAgkx';
            $BusinessShortCode = '174379';
            $LipaNaMpesaPasskey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
            $transaction = 'CustomerPayBillOnline';
            $tokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
            $phone = $_POST['phone'];
            $lipaOnlineUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
            $amount = $_POST['amount'];
            $CallBackURL = 'https://2f50f430.ngrok.io/callback.php?key=Your$trongPssWard';
            $timestamp = date("Ymdhis");
            $password = base64_encode($BusinessShortCode . $LipaNaMpesaPasskey . $timestamp);
```
#### Generating Authentication Token
- After declaring the variables in the above steps, write this code that will generate authentication token.
```php
            // Generate the auth token
            $url = url_init();
            url_setopt($url, urlOPT_URL, $tokenUrl);
            $credentials = base64_encode($consumer_key . ':' . $consumer_secret);
            url_setopt($url, urlOPT_HTTPHEADER, array('Authorization: Basic ' . $credentials));
            url_setopt($url, urlOPT_HEADER, false);
            url_setopt($url, urlOPT_RETURNTRANSFER, 1);
            url_setopt($url, urlOPT_SSL_VERIFYPEER, false);
            $url_response = url_exec($url);

            $token = json_decode($url_response)->access_token;
``` 

#### Initiating the STK push on the Users Phone
Next we will implement code that will initiate the STK push in the user's phone. Write the following set of code will initiate the STKpush in customers phone which contain the line whose phone number has been enetered.
```php
            // Initiate the STK Push
            $url2 = url_init();
            url_setopt($url2, urlOPT_URL, $lipaOnlineUrl);
            url_setopt($url2, urlOPT_HTTPHEADER, array('Content-Type:application/json', 'Authorization:Bearer ' . $token));


            $url2_post_data = [
                'BusinessShortCode' => $BusinessShortCode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'transaction' => $transaction,
                'Amount' => $amount,
                'PartyA' => $phone,
                'PartyB' => $BusinessShortCode,
                'PhoneNumber' => $phone,
                'CallBackURL' => $CallBackURL,
                'account' => 'Test',
                'TransactionDesc' => 'Test',
            ];

            $data2 = json_encode($url2_post_data);

            url_setopt($url2, urlOPT_RETURNTRANSFER, true);
            url_setopt($url2, urlOPT_POST, true);
            url_setopt($url2, urlOPT_POSTFIELDS, $data2);
            url_setopt($url2, urlOPT_HEADER, false);
            url_setopt($url2, urlOPT_SSL_VERIFYPEER, 0);
            url_setopt($url2, urlOPT_SSL_VERIFYHOST, 0);
            $url2_response = json_decode(url_exec($url2));

            echo json_encode($url2_response, JSON_PRETTY_PRINT);
```

###  Creating a form that will contain a button for confirming payment.

```php
            <form class="contact2-form validate-form" action="queryStatus.php" method="post">
                <input type="hidden" name="checkoutRequestID" value="<?php echo $url2_response->CheckoutRequestID ?>">
                <div class="container-contact2-form-btn">
                    <div class="wrap-contact2-form-btn">
                        <div class="contact2-form-bgbtn"></div>
                        <button class="contact2-form-btn">
                            Confirm Payment is Complete
                        </button>
                    </div>
                </div>
            </form>
```

### Demo
![Demo1](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo1.png)

![Demo2](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo2.png)

![Demo3](/engineering-education/how-to-integrate-safaricom-lipa-na-mpesa-in-php/demo3.png)

#### References
- [Safaricom Daraja Documentation](https://developer.safaricom.co.ke/).

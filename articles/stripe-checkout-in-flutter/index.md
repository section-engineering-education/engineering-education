---
layout: engineering-education
status: publish
published: true
url: /engineering-education/stripe-checkout-in-flutter/
title: Getting started with Stripe integrations in Flutter application
description: This article explains a stepwise process of integrating Stripe payment API into a Flutter application.
author: jerim-kaura
date: 2021-05-20T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/stripe-checkout-in-flutter/hero.png
   alt: Getting started with Stripe integrations in Flutter application example image
---

Stripe is an online payment platform that allows merchants to receive payment for products and services they sell. The company, besides processing payments, provides application programming interfaces for integrating payment systems in third-party applications. 

In this tutorial, we will learn how to integrate stripe checkout into a flutter application.

### Prerequisites
1. A basic understanding of [Flutter](https://flutter.dev/).
2. [Flutter SDK](https://flutter.dev/docs/get-started/install) installed on your computer.
3. Code editor, [Android Studio](https://developer.android.com/studio), or [vscode](https://code.visualstudio.com/download) are most preferred.
4. An emulator or a mobile device to run the project.

### Basic Overview
The project will have two routes from the main homepage. The first route will direct the user to add a new card for payment, while the second route will direct the user to use existing cards for payment. 

When a user chooses a new card for payment, we will use the `flutter_credit_card` package to yield a good-looking card form where the user will enter the card number, expiry date, and the security code. Afterward, a payment request is sent to the server which processes the request and informs the user of the payment process status as a success or a failure.


### Creating a Stripe account
To obtain a `publishable key` and `secret key` needed to access the API, head over to the [Stripe website](https://stripe.com/register) and create an account for free. Navigate to the Developer's dashboard to obtain your `publishable key` and `secret key`

### Project Structure
Create a new flutter application. You can follow [this](https://flutter.dev/docs/get-started/test-drive#create-app) guide to create the new application.

In the `lib` folder of your project, create two folders `pages` to contain the screens rendered to the user and `services` to contain the driver code files for the project.

In the `pages` folder, add two files. `home.dart` for the landing page and `cards.dart` where the code for existing cards will go.

In the `services` folder, we will add a file `services.dart` that will handle most of the backend logic of the project. The final project structure should look like this:

```
lib
    ┣ Services
    ┃   ┗ services.dart
    ┣ Pages
    ┃   ┗ home.dart
    ┃   ┗ cards.dart
    ┗ main.dart
```

### Adding dependencies
We need the following dependencies for our project.
- `flutter_credit_card`. This dependency will yield a nice credit card form when the user wants to add a new card to the app.
- `stripe_payment`. This plugin will enable us to integrate stripe checkout easily.
- `HTTP`. We need this for consuming http resources that we will fetch from the stripe API.
- `progress_dialog`. We will use this to indicate progress as the user waits for a request to be processed.

Head to `pubspec.yml` and add the following block of code:
```dart
dependencies:
  flutter:
    sdk: flutter
  flutter_credit_card: ^0.1.3
  stripe_payment: ^1.0.7
  http: ^0.11.3+17
  progress_dialog: ^1.2.2
```

### Creating routes.
In the `main.dart`, we will create a route to the `homepage` and another to the `existing cards` page. 

Add the block of code below in the `main.dart` file to create the routes.

```dart
import 'package:flutter/material.dart';
import 'package:flutter_stripe_payments/pages/cards.dart';
import 'package:flutter_stripe_payments/pages/home.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'STRIPE CHECKOUT', //app title
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      //initial route
      initialRoute: '/home',
      routes: {
          //home and existing cards routes
        '/home': (context) => HomePage(),
        '/cards': (context) => ExistingCardsPage()},
    );
  }
}
```

### The select payment method UI
In the `home.dart` file, we will add the code below to enable the user to select whether to add a new card or use one of the existing cards for payment. 

```dart
Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    return Scaffold(
        appBar: AppBar(
            title: Text('Home'),
        ),
        body: Container(
            padding: EdgeInsets.all(20),
            child: ListView.separated(
            itemBuilder: (context, index) {
                Icon icon;
                Text text;
                switch (index) {
                    case 0:
                        icon = Icon(Icons.add_circle, color: theme.primaryColor);
                        text = Text('Pay via new card');
                        break;
                    case 1:
                        icon = Icon(Icons.credit_card, color: theme.primaryColor);
                        text = Text('Pay via existing card');
                        break;
                }

                return InkWell(
                    onTap: () {
                        onItemPress(context, index); //called to select the function to call depending on the method chosen
                    },
                    child: ListTile(
                        title: text,
                        leading: icon,
                    ),
                );
            },
            separatorBuilder: (context, index) => Divider(
                color: theme.primaryColor,
            ),
            itemCount: 2),
        ),
    );
  }
```
 ![Select payment method](/engineering-education/stripe-checkout-in-flutter/select-method.jpg) 

The `onItemPress()` method has a swith case  to select a function depending on the choice the user makes. The code below shows the implementation of the method:
```dart
onItemPress(BuildContext context, int index) async {
    switch (index) {
      case 0:
        payViaNewCard(context); // call payvia new card function
        break;
      case 1:
        Navigator.pushNamed(context, '/existing-cards'); //calls the list of cards screen
        break;
    }
```

### Existing cards page
The existing cards contain a list of cards that can be used for testing the app. The list of the cards can be obtained from the flutter dashboard. The code snippets below show the implementation of the existing cards page.
```dart
//list of existing cards
 List cards = [
    {
      'cardNumber': '4242424242424242',
      'expiryDate': '04/24',
      'cardHolderName': 'Kaura Jerim',
      'cvvCode': '424',
      'showBackView': false,
    },
    {
      'cardNumber': '5555555566554444',
      'expiryDate': '04/23',
      'cardHolderName': 'Jerim Kaura',
      'cvvCode': '123',
      'showBackView': false,
    }
  ];

Widget build(BuildContext context) {
return Scaffold(
    appBar: AppBar(
        title: Text('CHOSE CARD'),
    ),
    body: Container(
        padding: EdgeInsets.all(20),
        child: ListView.builder(
            itemCount: cards.length,
            itemBuilder: (BuildContext context, int index) {
            var card = cards[index];
            return InkWell(
                onTap: () {
                    payViaExistingCard(context, card);
                },
                child: CreditCardWidget(
                    cardNumber: card['cardNumber'],
                    expiryDate: card['expiryDate'],
                    cardHolderName: card['cardHolderName'],
                    cvvCode: card['cvvCode'],
                    showBackView: false,
                ),
            );
            },
        ),
    ),
);
```
 ![Select Card](/engineering-education/stripe-checkout-in-flutter/choose-card.jpg) 

### Creating the service handler
In the `service.dart` file, we will create a class that contains the API_URL, API_KEY, and the secret key as class members. These are the variables that we need to access the stripe payment API. The snippets below show the class:
```dart

class StripeService {
    static String apiBase = 'https://api.stripe.com/v1';
    static String paymentApiUrl = '${StripeService.apiBase}/payment_intents';
    static String secret =   'YOUR SECRET'; //your secret from stripe dashboard
    static Map<String, String> headers = {
        'Authorization': 'Bearer ${StripeService.secret}',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    static init() {
        StripePayment.setOptions(
            StripeOptions(
                publishableKey:"YOUR PUBLISHABLE KEY", // user your api key
                merchantId: "Test",
                androidPayMode: 'test'
            )
        );
    }
}
```
Next, we will create a class to contain the response given to the user after a payment request is processed. Add the snippets below in the `services.dart` file.
```dart

class StripeTransactionResponse {
    String message; // message
    bool success; //state of the processs

    //constructor
    StripeTransactionResponse({this.message, this.success});
}

```
### Card methods
We need two methods in the `StripeService` class to handle the payment depending on the payment method chosen by the user. Add the code snippets below in the `services.dart` file in the `StripeService` class.
1. Pay via existing card method
```dart
  static Future<StripeTransactionResponse> payViaExistingCard(
    {String amount, String currency, CreditCard card}) async {
    try {
        var paymentMethod = await StripePayment.createPaymentMethod(PaymentMethodRequest(card: card));
        var paymentIntent = await StripeService.createPaymentIntent(amount, currency);
        var response = await StripePayment.confirmPaymentIntent(
            PaymentIntent(
                clientSecret: paymentIntent['client_secret'],
                paymentMethodId: paymentMethod.id
            )
        );

        if (response.status == 'succeeded') {
            //if the payment process success
            return new StripeTransactionResponse(
                message: 'Transaction successful',
                success: true
            );
        }else {
            //payment process fail
            return new StripeTransactionResponse(
                message: 'Transaction failed', 
                success: false
            );
        }
    } on PlatformException catch (err) {
        return StripeService.getPlatformExceptionErrorResult(err);
    } catch (err) {
        return new StripeTransactionResponse(
             //convert the error to string and assign to message variable for json resposne
            message: 'Transaction failed: ${err.toString()}',
            success: false
        );
    }
}
```

2. Pay via a new card method.

```dart
  static Future<StripeTransactionResponse> payWithNewCard({String amount, String currency}) async {
    try {
        var paymentMethod = await StripePayment.paymentRequestWithCardForm(CardFormPaymentRequest());
        var paymentIntent = await StripeService.createPaymentIntent(amount, currency);
        var response = await StripePayment.confirmPaymentIntent(
            PaymentIntent(clientSecret: paymentIntent['client_secret'], paymentMethodId: paymentMethod.id));

        if (response.status == 'succeeded') { //if the payment process success
            return new StripeTransactionResponse(
                message: 'Transaction successful',
                success: true
            );
        }else { //payment process fail
            return new StripeTransactionResponse(
                message: 'Transaction failed',
                success: false
            );
        }
    } on PlatformException catch (err) {
        return StripeService.getPlatformExceptionErrorResult(err);
    } catch (err) {
        return new StripeTransactionResponse(
            //convert the error to string and assign to message variable
            message: 'Transaction failed: ${err.toString()}', 
            success: false
        );
    }
}
```
This method also brings the pre-built new card form as shown below.
![New Card](/engineering-education/stripe-checkout-in-flutter/new-card.jpg) 

### The payment intent
We need a payment intent to send a payment request to the API using the URL supplied in the `StripeService` class using a post request. The snippets below show how to create the payment intent. The payment intent is created in the `StripeService` class.
```dart
static Future<Map<String, dynamic>> createPaymentIntent(String amount, String currency) async {
    try {
        Map<String, dynamic> body = {
            'amount': amount, // amount charged will be specified when the method is called
            'currency': currency, // the currency
            'payment_method_types[]': 'card' //card
        };
        var response =
            await http.post(
                StripeService.paymentApiUrl,  //api url
                body: body,  //request body
                headers: StripeService.headers //headers of the request specified in the base class
            );
        return jsonDecode(response.body); //decode the response to json
    } catch (err) {
        print('Error occured : ${err.toString()}');
    }
    return null;
}
```
### Confirm payment status
Build and run the application to test it. To confirm payment, the API records every request made for a new card or a payment made. Head over to the Stripe dashboard and navigate to the developer section under logs. You should be able to see a list of requests made as shown below.
![Logs](/engineering-education/stripe-checkout-in-flutter/logs.png) 

To see the payments made, navigate to the payment link on the sidebar of the dashboard. It should direct you to a list of payments made as shown below.
![payments](/engineering-education/stripe-checkout-in-flutter/payments.png) 


### Conclusion
In this tutorial, we learned how to integrate stripe checkout in a flutter. The tutorial explained a stepwise implementation with a mini-project. 

You can find the project [here](https://github.com/jerimkaura/flutter-book/tree/main/stripe-checkout-flutter). Create an API key and secret in the stripe dashboard to use when running the project on your computer. Reach out to me in case of any questions.

### Further reading
- [Stripe payment flutter package](https://pub.dev/packages/stripe_payment).
- [Flutter credit card package](https://pub.dev/packages/flutter_credit_card).
- [Http Dart Package](https://pub.dev/packages/http).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul

---
layout: engineering-education
status: publish
published: true
url: /blockchain-on-android-using-the-solana-programs/
title: How to Implement the Solana Blockchain Concept in Android
description: This tutorial will guide the reader on how to build an Android Blockchain wallet using Solana.
author: moses-chege
date: 2022-05-20T00:00:00-11:30
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/blockchain-on-android-using-the-solana-programs/hero.png
    alt: How to Build an Android Blockchain Wallet using Solana Hero Image
---
Web 3.0 is an evolution of the internet that utilizes blockchain technology and decentralization tools. Solana is a fast, cheap, and monstrous blockchain tool. It is a high-performance, scalable blockchain that supports crypto applications.
<!--more-->
[Solana ($SOL)](https://coinmarketcap.com/currencies/solana/) is a decentralized blockchain network just like Bitcoin, Ethereum, and Litecoin. It also has programmable blockchains that allow you to use smart contracts and create your own token, or NFTs. 

Solana aims to be more scalable and a faster network, it can currently handle 50k transactions per second with an average 400ms block time. This extremely fast transaction speed makes Solana one of the most scalable layer one blockchain solutions.

This guide will implement the Solana blockchain concept in Android. We will consume a Solana API using the Android Retrofit library.

### Table of contents
- [Prerequisites](#prerequisites)
- [Setting up the application](setting-up-the-application)
- [Setting the Android Solana interface](setting-the-android-solana-interface)
- [Setting the android MainActivity class](setting-the-android-mainactivity-class)
- [Conclusion](conclusion)

### Prerequisites
To follow along with this guide, it is essential to have the following:
- A basic knowledge of how blockchain technology and it's architecture works.
- Some knowledge of running Android applications.

### Setting up the application
First, we need to set up an android application. Go to your Android Studio and create a new Java-powered android project with an empty activity.

Once the app is set and the gradle setting has been configured, add the retrofit library. 

Retrofit is an HTTP client library that helps us handle network operations. To set it up for your application, add the following libraries to the `app.gradle` file.

```java
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

Once you have added them, sync your project so that android can download Retrofit and use it in your android project.

Also, you need to ensure you have added internet permission to the manifest file. This will give the applications to process retrofit requests and responses.

```java
<uses-permission android:name="android.permission.INTERNET" />
```

Next, you need a Solana wallet that will provide you with the wallet address. This address helps you access the Solana wallet, get the balances and receive or Transfer Solana to another wallet. 

Check this guide and learn how to set up a [Solana wallet](https://solpadfinance.medium.com/how-to-create-a-solana-wallet-in-the-sollet-web-wallet-4e050587aca6#:~:text=Sollet%20%E2%80%94%20Solana%20SPL%20token%20wallet&text=Go%20to%20https%3A%2F%2Fwww,wallet%20seed%20using%20a%20password.) using the [Solana SPL token wallet](https://www.sollet.io/).

![solana-devnet](/engineering-education/blockchain-on-android-using-the-solana-programs/solana-devnet.png)

In this guide, we will get the address from this list of available and ready-made wallets.

### Setting the Android Solana interface
To start interacting with the Solana, you need to first create the request and response interfaces. This will help us access Solana and decide what to do based on the sent request and the received response.

To do that, go ahead and create a new Java class interface file and name it `SInterface.java` as shown below:

![java-interface-file](/engineering-education/blockchain-on-android-using-the-solana-programs/java-interface-file.png)

```java
class GetBalanceRequest {

    public GetBalanceRequest(String jsonrpc, Integer id, String method, String[] params) {
        this.jsonrpc = jsonrpc;
        this.id = id;
        this.method = method;
        this.params = params;
    }

    @SerializedName("jsonrpc")
    String jsonrpc;
    @SerializedName("id")
    Integer id;
    @SerializedName("method")
    String method;
    @SerializedName("params")
    String[] params;
}
```

The class `GetBalanceRequest` will set up the application request parameters. In this case, we are sending a request to the Solana server that will enable us to inform the server of what data we need for our application.

Next, add the `GetBalanceResponse` interface as shown below:

```java
class GetBalanceResponse {

    class Result {
        class Context {
            @SerializedName("slot")
            Integer slot;
            @Override
            public String toString() {
                return "Context{" +
                        "slot=" + slot +
                        '}';
            }
        }
        @SerializedName("context")
        SInterface.GetBalanceResponse.Result.Context context;
        @SerializedName("value")
        BigInteger value;

        @Override
        public String toString() {
            return "Result{" +
                    "context=" + context +
                    ", value=" + value +
                    '}';
        }
    }

    @SerializedName("jsonrpc")
    String jsonrpc;
    @SerializedName("id")
    Integer id;
    @SerializedName("result")
    SInterface.GetBalanceResponse.Result result;

    @Override
    public String toString() {
        return "GetBalanceResponse{" +
                "jsonrpc='" + jsonrpc + '\'' +
                ", id=" + id +
                ", result=" + result +
                '}';
    }
}
```

Here we want to get the results of the request we sent. We want a response back to our application. In this response, we want to get the JSON response and its requesting id. 

We will then get the results of context, this will give us the details that the Solana server has sent to the application. In this example, we want the application to return the Solana slot and its value.

Now add this `POST` retrofit method. This defines a relative or absolute path or full URL of the endpoint. This value is optional if the first parameter of the method is annotated with a URL. 

We will set the Base URL in the main activity later. In this case, the Base URLs should always end in `/`. So go ahead and add this as shown below:

```java
@POST("/")
Call<GetBalanceResponse> retreiveBalance(
        @Body GetBalanceRequest request
);
```

We will set the baseUrl endpoint. This endpoint will be called by the `retreiveBalance` which send the balance request and gets its response body so that we can have the `GetBalanceResponse`.

### Setting the Android MainActivity class
We want to display the JSON response and its data in an android view. In this case, we will just use the basic textView created when setting up the application.

Go ahead and access this view using the `findViewById` inside the `onCreate` method as shown below:

```java
TextView textView = findViewById(R.id.textView);
```

Then add a base URL as we explained above. In this case, we will the `Retrofit.Builder()`, set the `baseUrl` and set the `GsonConverterFactory` as shown below:

```java
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("http://api.testnet.solana.com")
        .addConverterFactory(GsonConverterFactory.create())
        .build();
```

In this case, we are using the Solana test URL as the `baseUrl`, i.e., `http://api.testnet.solana.com"`.

Let's now access the `SInterface` we created earlier using the `retrofit.create()`.

```java
SInterface solanaInterface = retrofit.create(SInterface.class);
```

To access the Solana, you now need to add your wallet address. We are using the address `8tfDNiaEyrV6Q1U4DEXrEigs9DoDtkugzFbybENEbCDz` from the list of available and ready-made wallets we explained earlier. 

Then call the `SInterface` together with its `GetBalanceResponse` and `GetBalanceRequest` classes.

```java
String[] walletAddress = {"8tfDNiaEyrV6Q1U4DEXrEigs9DoDtkugzFbybENEbCDz"};
Call<SInterface.GetBalanceResponse> responseCall = solanaInterface.retreiveBalance(
        new SInterface.GetBalanceRequest(
                "2.0",
                1,
                "getBalance",
                walletAddress
        )
);
```

Now we need to set up the application. This will be showcased based on the response status, either success or failure. To do so, add the `enqueue` Retrofit method to the `responseCall`. Then set the `GetBalanceResponse` as the callback.

```java
responseCall.enqueue(new Callback<SInterface.GetBalanceResponse>() {
});
```

This will asynchronously send the request and notify the callback of its response or if an error occurs when talking to the server, creating the request, or processing the response.

To notify the callback of its response, add the following `onResponse` method inside `responseCall.enqueue()`.

```java
@Override
public void onResponse(@NonNull Call<SInterface.GetBalanceResponse> call, Response<SInterface.GetBalanceResponse> response) {
    try {
        if(response.isSuccessful()){
            textView.setText("Success: " + response.body().toString());
        } else {
            textView.setText("Failed to access Solana wallet: " + response.errorBody().string());
        }
    } catch (IOException exception){
        textView.setText(exception.getMessage());
    }
}
```

This was also set to update the UI based on the received Solana response. If the response becomes successful, the textView will be updated with the Solana JSON response. Otherwise, the textView will be updated with the `errorBody()` or the exception message.

Likewise, if an error occurs talking to the server, add this `onFailure` method to keep track of such instances and update the view accordingly.

```java
@Override
public void onFailure(Call<SInterface.GetBalanceResponse> call, Throwable t) {
    t.printStackTrace();
    textView.setText("onFailure: "+t.getMessage());
}
```

The app is now ready. You can run it on your mobile device or an emulator device. The Solana API will return a response with the slot number and its value on your app screen.

### Conclusion
In this tutorial, we built a basic Android app integrated with the Solana blockchain wallet. This was a pretty basic setup and will help you have the basics of processing Solana into your android app. You can go ahead and try requesting different parameters from your Solana wallet.

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)

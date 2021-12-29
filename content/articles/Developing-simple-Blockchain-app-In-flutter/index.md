---
layout: engineering-education
status: publish
published: true
url: /Developing-simple-Blockchain-app-In-flutter/
title: Developing simple blockchain app in flutter
description: In this article, we will learn about creating a blockchain flutter application. We will be using the blockchain library to create a simple application that will allow users to create and manage their blockchain.
author: johnnie-mbugua
date: 2021-11-14T00:00:00-12:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/Developing-simple-Blockchain-app-In-flutter/hero.jpg
    alt: Developing simple blockchain app in flutter
---


### Introduction

 A flutter application is a  mobile app created using the flutter framework that runs on both iOS and Android.  Flutter uses Google's Skia library to draw widgets in UIs, which gives it high performance. Flutter is an advanced framework that allows for fast prototyping and amazing perfomance.

We will be using the blockchain library to create a simple application that will allow users to create and manage their blockchain.

### Prerequisites

- Have Visual studio code installed
- Be familiar with flutter and dart language

### Creating a Blockchain Flutter Application

To create a blockchain flutter application, we need to first install the Flutter SDK. You can find the installation instructions on the Flutter website.

Once you have installed the Flutter SDK, you can create a new project by running the following command in your terminal:

```cmd
flutter create my-blockchain-app
```

Now that our project is created, let's open it in your favorite editor.  I will be using Visual Studio Code for this tutorial.

```dart
import 'package:flutter/material.dart';  void main() { }
```

Running the application should give us a white screen. This is because we have not added any widgets to our UI or written any code for this app yet.

### Adding Widgets to Our UI

To add widgets to our UI, we need to first import the widget library. We can do this by adding the following line of code to our `main()` function:

```dart
import 'package:flutter/widgets.dart';
```

Now that we have imported the widget library, we can start adding widgets to our UI.  Let's start by adding the following widget to our main() function:

```dart
Text("Hello World");
```

Running the application should now give us a simple Hello World message in white text on top of the default flutter background color.

Next, let's change that Text widget into a Center widget so that it will be centered on the screen.  Doing this requires changing the following line of code:

```dart
Text("Hello World");
```

to this:

```dart
Center(child: Text("Hello World"),);
```

Running the application should give us a simple Hello World message that is now centered on our screen. Next, let's change the color of our text. To do this, we will use the Colors class which is part of `dart:html`.

```dart
import 'dart:html';
```

Don't forget to add the line above to your editor so that you can access the built-in `dart:html` library. We can change our text color by importing `dart:html` and creating a custom function to return a different color.

```dart
import 'dart:html';
TextStyle(color: Colors.red,),
```

Now when we run our application, we should see the default text in red on top of the white background.

### Managing Our Blockchain Database

To manage our blockchain database, let's create a class called `BlockchainDatabaseManager` . We will use this class as a wrapper for adding and getting transactions as well as creating and managing blocks.

We want to be able to create new blockchains by instantiating `BlockchainDatabaseManager` , so we can add the following code to our `main()` function:

```dart
final BlockchainDatabaseManager _blockchainDatabase = new BlockchainDatabaseManager();
```

Now if we run our application, we should see the following message:

No blockchains found. Please create one by running:

```dart
_blockchainDatabase.create()
```

This is because we have not created any blockchains yet. We can do this by running the following code in our main() function:

```dart
_blockchainDatabase.create();
```

We now have one blockchain, but what if we want to add transactions or blocks? To do this, let's first create an interface called IBlockchain that will allow our database manager class to interact with the blockchain.

```dart
interface IBlockchain {

}
```

By implementing this interface in our BlockchainDatabaseManager , we can use our blockchain database manager class to interact with any blockchain that implements this interface.

Now let's add some methods to our BlockchainDatabaseManager class. These methods will allow us to add transactions and blocks to our blockchain.

```dart
class BlockchainDatabaseManager implements IBlockchain {

void addTransaction(Transaction transaction) { }

void addBlock(List<Transaction> transactions, int blockHeight) { }
```

Now if we run our application, we should be able to add transactions and blocks by running the following lines of code in our main() function:

```dart
_blockchainDatabase.transactions.add(transaction);  _blockchainDatabase.blocks.add(block);
```

We can also get transactions and blocks from our blockchain by using the following methods:

```dart
List<Transaction> getTransactions();

int getBlockHeight();
```

We should also add some helper functions to make these calls easier.  Add the following code to your `BlockchainDatabaseManager class`:

```dart
Transaction getTransaction(int transactionHash);
void getTransaction(Transaction transaction) { }
int getBlockHeight(int blockHash);
void getBlockHeight(int blockHeight)  { }
```

Now we can easily get transactions and blocks from our blockchain database by running the following code in our main() function:

```dart
_blockchainDatabase.transactions.get(transactionHash);  _blockchainDatabase.getBlockHeight(blockHash);
```

We will now have a fully functional blockchain database manager with transactions and blocks.  However, we currently do not save this data anywhere so if we restart our application, all of the data would be lost. To solve this problem, let's create a class called Blockchain .  This class will be in charge of saving our blockchain database so that when the application restarts, it can come back to life.

```dart
class Blockchain {
int _blockchainHeight = 0;
final BlockchainDatabaseManager _blockchainDatabase = new BlockchainDatabaseManager();
addBlock(List<Transaction> transactions, int blockHeight) { }
addTransaction(Transaction transaction) { }
getBlockHeight() { }
getTransactions() {};
save() {}
   void save(String filename) {
        File _file = new File(_fileName);
          if (!_file.exists()) {
           try {
            _file.createNewFile();
             } catch (IOException e) {
             print('Error creating file: $e');
          return;
```

Now we can simply use the Blockchain class to save our blockchain database by running the following code in our main() function:

```dart
Blockchain blockchain = new Blockchain();
blockchain.addBlock(transaction);
 blockchain.save('filename');
```

We can now add new blocks and transactions to our blockchain and save them to a file. However, what we want is for this data to be synchronized across different devices so that we all see the same result when we run our application on different devices. To do this, we will need to use a blockchain network.

A blockchain network is a group of devices that are all connected to each other and share the same blockchain database. When a new block or transaction is added to the blockchain, it is synchronized across all devices in the network. This way, everyone sees the same result when they run the application on their devices. To connect multiple devices together to form a blockchain network, we will use the MqttClient class.

Let's add some functionality to our new Blockchain class by adding an instance of the MqttClient class.  We want this client to run on a different thread so let's make it an AsyncTask by adding the async keyword in front of the class declaration. Also, make it a private member variable so that other classes can't use it without going through this class.

```dart
class Blockchain {
    MqttClient _mqttClient = new MqttClient();

AsyncTask<Void, Void, String>
 asyncTask = new AsyncTask<Void, Void, String>() {

 @Override  protected String doInBackground(Void... params) {

return null;        }

};
```

Now we can run the `MqttClient` instance on a different thread. However, if we don't register it with something that can handle the messages, it will never receive any messages. Let's add an instance of the `MqttMessageHandler` class to our application and register our _mqttClient instance with it.

```dart
class Blockchain {

    MqttClient _mqttClient = new MqttClient();

AsyncTask<Void, Void, String> asyncTask = new AsyncTask<Void, Void, String>() {

          @Override  protected String doInBackground(Void... params) {

return null;         }

};

MqttMessageHandler messageHandler = new MqttMessageHandler();

_mqttClient.setHandler(messageHandler);
```

Now our _mqttClient instance will receive messages from the blockchain network. Finally, let's add some code to our save() function to save the blockchain data to a file.

```dart
class Blockchain {

    MqttClient _mqttClient = new MqttClient();

AsyncTask<Void, Void, String> asyncTask = new AsyncTask<Void, Void, String>() {

 @Override  protected String doInBackground(Void... params) {
return null;         }
@Override  protected void onPostExecute(String result) {
getBlockHeight();
Blockchain network = new Blockchain();
   _mqttClient.connect("myDevices");
```

Now we can build our blockchain network by adding devices to it one at a time after they have registered with the same MQTT broker. Fortunately, flutter provides us with an easy way to do this. All we have to do is add a button and call the addDevice() function when it is clicked.

```dart
void main() {
runApp(new MyApp());

}
class MyApp extends StatelessWidget {
Widget build(BuildContext context) {
return new MaterialApp(
 home: new Scaffold(
 appBar: new AppBar(
 title: new Text("My Blockchain"),
 ),
 body: new HomePage(), );
       Button(
          onClick: () {
           network.addDevice();
});
} }
```

Notice that we are connecting to my Devices, which is the name of my MQTT broker. You will need to change this to match the name of your broker. Now when you run the application on different devices, they will all be connected to the same blockchain network and will share the same blockchain data.
To see more and have a view of whats going on kindly check my github @ https://github.com/johnniembugua

### Conclusion

Congratulations! You have now created a flutter application that uses a dart blockchain.This is just but a simple blockchain application consisting of several devices and every transaction made is broadcasted to all the other devices
Happy Coding.

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)

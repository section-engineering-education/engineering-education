---
layout: engineering-education
status: publish
published: true
url: /developing-simple-blockchain-app-in-flutter/
title: How to Develop a Simple Blockchain App in Flutter
description: This article will help the reader understand how to create a simple blockchain application in Flutter.
author: johnnie-mbugua
date: 2022-01-07T00:00:00-12:48
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/developing-simple-blockchain-app-in-flutter/hero.jpg
    alt: Developing Simple Blockchain App in Flutter Hero Image
---
Flutter is used to create cross-platform applications that run on iOS, Android, and on the web. It is an advanced framework that supports fast prototyping and high perfomance.
<!--more--> 
Flutter utilizes Google's Skia library to draw UI widgets on the screen. In this tutorial, we will be using the `blockchain` library to create a simple Flutter application.

### Prerequisites
To follow along, you need to:
- Have Visual Studio Code installed
- Be familiar with the Flutter frameowrk and Dart language

### Creating a blockchain Flutter application
To get started, we need to first install the `Flutter SDK`. You can find the installation instructions [here](https://flutter.dev/).

Once you have installed the Flutter SDK, you can create a `new project` by running the following command in your terminal:

```bash
flutter create my-blockchain-app
```

Now that our project is created, let's open it in a code editor.  I will be using Visual Studio Code for this tutorial.

When you run the application, you should see a white screen. This is because we have not added any code or widgets to our UI.

### Adding widgets to our UI
To add widgets to our UI, we need to first import the `flutter-widget` library. We can do this by adding the following line to the `main()` function:

```dart
import 'package:flutter/widgets.dart';
```

Now that we have imported the widget library, we can start adding widgets to our UI.  Let's start by adding the following `Text` widget to the `main` function:

```dart
Text("Hello World");
```

Running the application should now give us a simple `Hello World` message on top of the default Flutter `background color`.

Next, let's center the `Text` widget on the screen.  We need to make the following changes:

```dart
Text("Hello World");
```

To this:

```dart
Center(child: Text("Hello World"),);
```

Running the application should give us a simple `Hello World` message that is now centered on our screen. 

Next, let's change the `color` of our `Text` widget. To do this, we will make use of the `Colors` class which is part of `dart:html`:

```dart
import 'dart:html';
```

Don't forget to add the above line in the `main` file to access the built-in functions. We can change our `text` color, as shown below:

```dart
import 'dart:html';

TextStyle(color: Colors.red,),
```

Now when we run our application, we should see the default text in red on top of the white background.

### Managing our blockchain database
Let's create a class called `BlockchainDatabaseManager`. We will use this class as a wrapper for managing transactions and blocks.

We want to create new blockchains by instantiating `BlockchainDatabaseManager`. We need to add the following code to our `main()` function:

```dart
final BlockchainDatabaseManager _blockchainDatabase = new BlockchainDatabaseManager();
```

Now if we run our application, we should see the following message:

This is because we have not created any blockchains yet. We can do this by running the following code in our `main()` function:

```dart
_blockchainDatabase.create();
```

We now have one blockchain. However, we want to add transactions or blocks. 

To do this, let's create an interface called `IBlockchain` that will allow our database manager class to interact with the blockchain.

```dart
interface IBlockchain {

}
```

By implementing this interface in our BlockchainDatabaseManager , we can use our blockchain database manager class to interact with any blockchain that implements this interface.

Now let's add some methods to our `BlockchainDatabaseManager` class. These methods will allow us to add `transactions` and `blocks` to our blockchain.

```dart
class BlockchainDatabaseManager implements IBlockchain {

void addTransaction(Transaction transaction) { }

void addBlock(List<Transaction> transactions, int blockHeight) { }
```

Now if we run our application, we should be able to add `transactions` and `blocks` by running the following lines of code in our `main()` function:

```dart
_blockchainDatabase.transactions.add(transaction);  _blockchainDatabase.blocks.add(block);
```

We can also get `transactions` and `blocks` from our blockchain using the following methods:

```dart
List<Transaction> getTransactions();

int getBlockHeight();
```

We should also add some helper functions to make these calls easier. Add the following code to your `BlockchainDatabaseManager` class:

```dart
Transaction getTransaction(int transactionHash);
void getTransaction(Transaction transaction) { }
int getBlockHeight(int blockHash);
void getBlockHeight(int blockHeight)  { }
```

We can now access transactions and blocks from our blockchain database by running the following code in our `main()` function:

```dart
_blockchainDatabase.transactions.get(transactionHash);  _blockchainDatabase.getBlockHeight(blockHash);
```

We now have a fully functional blockchain database manager with transactions and blocks. However, we currently do not save this data. We could, therefore, lose it when we restart our application. 

To solve this problem, let's create a class called `Blockchain`. This class will be in charge of saving our blockchain database.

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

Now we can simply use the `Blockchain` class to save our blockchain database by running the following code in our `main()` function:

```dart
Blockchain blockchain = new Blockchain();
blockchain.addBlock(transaction);
blockchain.save('filename');
```

We can now add new blocks and transactions to our blockchain and save them to a file. 

However, this data needs to be synchronized across different devices so that we all see the same results. To do this, we will need to use a blockchain network.

A blockchain network is a group of devices that are all connected to each other and share the same database. 

When a new block or transaction is added to the blockchain, it is synchronized across all devices in the network. 

This way, everyone sees the same result when they run the application on their devices. To connect multiple devices together to form a blockchain network, we will use the `MqttClient` class.

Let's add some functionality to our new `Blockchain`class by including an instance of the `MqttClient` class.  

We want this client to run on a different `thread` so let's make it an `AsyncTask` using the `async` keyword in front of the class declaration. 

It should be a private member variable so that other classes can't access it.

```dart
class Blockchain {
    MqttClient _mqttClient = new MqttClient();

AsyncTask<Void, Void, String>
 asyncTask = new AsyncTask<Void, Void, String>() {

 @Override  protected String doInBackground(Void... params) {

return null;        }

};
```

We can now run the `MqttClient` instance on a different thread. However, if we don't register it, we will not receive any messages. 

Let's add an instance of the `MqttMessageHandler` class to our application and register our `_mqttClient` instance.

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

Now our `_mqttClient` instance will receive messages from the blockchain network. Finally, let's add some code to save the blockchain data to a file:

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

Now we can build our blockchain network by adding devices to it one at a time after they have registered with the same `MQTT` broker. 

Fortunately, Flutter provides us with an easy way to do this. We only need to add a button and call the `addDevice()` function when it is clicked.

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
    } 
}
```

Notice that we are connecting to `my Devices`, which is the name of my` MQTT` broker. You will need to change this to match the name of your broker. 

When you run the application on different devices, they will all be connected to the same blockchain network and thus, share the blockchain data.

### Conclusion
Congratulations! You have now created a Flutter application that uses a Dart blockchain.

This is just a simple blockchain application consisting of several devices. Each transaction is broadcasted to all the other devices

You can access the full code from [this GitHub repository](https://github.com/johnniembugua/blockchain-app).

Happy coding!

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)

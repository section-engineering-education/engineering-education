---
layout: engineering-education
status: publish
published: true
url: /developing-simple-blockchain-app-in-flutter/
title: How to Develop a Simple Blockchain App in Flutter
description: This article will help the reader understand how to create a simple blockchain application in Flutter.
author: johnnie-mbugua
date: 2022-07-01T00:00:00-10:48
topics: [Blockchain, Languages]
excerpt_separator: <!--more-->
images:
 - url: /engineering-education/developing-simple-blockchain-app-in-flutter/hero.jpg
   alt: Developing Simple Blockchain App in Flutter Hero Image
---
Flutter is used to create cross-platform applications that run on iOS, Android, and on the web. It is an advanced framework that supports fast prototyping and high performance.
<!--more--> 
Flutter utilizes Google's Skia library to draw UI widgets on the screen. In this tutorial, we will learn how to create a Dart blockchain for a simple Flutter application.

### Prerequisites
To follow along, the reader will need to:
- Have Visual Studio Code installed.
- Be familiar with the Flutter framework and Dart language.
- Have some knowledge about blockchain technology.

### Step 1 - Creating a blockchain Flutter application
To get started, we need to first install the `Flutter SDK`. You can find the installation instructions [here](https://flutter.dev/).

Once you have installed the Flutter SDK. You can create a `new project` by running the following command in your terminal:

```bash
flutter create my-blockchain-app
```

Now that our project is created, let's open it in a code editor. I will be using Visual Studio Code for this tutorial.

### Creating blocks
Blocks are the main nodes of the blockchain. Create a new file in the `lib` folder or the folder of your choice according to your project setup. Then add the following code:

```dart
import 'dart:collection';
import 'transaction.dart';

class Block {
 final int index;
 final int timestamp;
 final List<Transaction> transactions;
 int proof;
 final String prevHash;

 Block(this.index, this.timestamp, this.transactions, this.proof, this.prevHash);
 Map<String, dynamic> toJson() {

   // keys must be ordered for consistent hashing
   var m = new LinkedHashMap<String, dynamic>();
   m['index'] = index;
   m['timestamp'] = timestamp;
   m['transactions'] = transactions.map((t) => t.toJson()).toList();
   m['proof'] = proof;
   m['prevHash'] = prevHash;
   return m;
 }

}
```

The above `block` class contains various data. `Index` tells the number of blocks on the blockchain. `Timestamp` is used to sign every block. A list of the transactions that took place between that time (timestamps). `Previous hash` that links the current block to the previous block and proves that it's valid.

### Creating Transaction class
Create a new file called `transaction.dart`. Optionally, you can create this class in the `block` class. The `Transaction class` is responsible for all the records. It contains data on all transfers and other related information. 

```dart
class Transaction {

 String sender;
 String recipient;
 double amount;
 int proof;
 String prevHash;

 Transaction(this.sender, this.recipient, this.amount);

 Map<String, dynamic> toJson() {
   return <String,dynamic>{
     "sender": sender,
     "recipient": recipient,
     "amount": amount,
     "proof": proof,
     "prevHash": prevHash,
   };
 }
}

```

This class contains various sets of data including the sender, the receiver, or the recipient of the assets. The amount specifies how much or how many assets are being sent. Proof of the transaction is valid, a previous hash of the previous block for reference. 

### Creating the blockchain
This is the main class of our logic. It holds the most important part of this application. It has various methods defined in it. Remember to first import the necessary files that we created above.

```dart
import 'dart: convert';
import 'transaction.dart';
import 'block.dart';
import 'package:crypto/crypto.dart' as crypto;
import "package:hex/hex.dart";

class Blockchain {

 final List<Block> _chain;
 final List<Transaction> _currentTransactions;

 Blockchain()

     : _chain = [],
       _currentTransactions = [] {

   // create genesis block
   newBlock(100, "1");

 }

 Block newBlock(int proof, String previousHash) {
   if (previousHash == null) {
     previousHash = hash(_chain.last);

   }

   var block = new Block(
     _chain.length,
     new DateTime.now().millisecondsSinceEpoch,
     _currentTransactions,
     proof,
     previousHash,);
   _currentTransactions.clear(); // = [] ?
   _chain.add(block);
   return block;
 }

 int newTransaction(String sender, String recipient, double amount) {
   _currentTransactions.add(new Transaction(sender, recipient, amount));
   return lastBlock.index + 1;
 }

 Block get lastBlock {
   return _chain.last;
 }

 String hash(Block block) {

   var blockStr = JSON.encode(block.toJson());
   var bytes = UTF8.encode(blockStr);
   var converted = crypto.sha256.convert(bytes).bytes;
   return HEX.encode(converted);

 }

 int proofOfWork(int lastProof) {

   var proof = 0;
   while (!validProof(lastProof, proof)) {
     proof++;
   }

   return proof;
 }

 bool validProof(int lastProof, int proof) {
   var guess = UTF8.encode("${lastProof}${proof}");
   var guessHash = crypto.sha256.convert(guess).bytes;
   return HEX.encode(guessHash).substring(0, 4) == "0000";
 }
}

```

We began by creating a `Blockchain` class that will hold all blocks linked together. The first block is the genesis block since it has no prev hash. 

Other blocks mined after the first one have a previous hash to connect the preceding blocks. A Hash is a combination of characters that is unique to every block. It's generated during mining for this case as proof of work. 

All nodes compete to generate the hash and the broadcasts to the other nodes in the network. Unfortunately, one device is generating the hash.

### Creating the blockchain miner
The `miner` class is the source of new assets or tokens. In most cases, miners get rewarded for validating the transactions. The rewards vary from time to time depending on the blockchain. 

Mining helps to generate new blocks. If mining stops, the blockchain reaches an end. For our case, the miner links the last block to the newly mined block using the hash:

```dart
import 'blockchain.dart';
import 'package:uuid/uuid.dart';

class Miner {
 final Blockchain blockchain;
 final String nodeId;
 Miner(this.blockchain) : nodeId = new Uuid().v4();

 MineResult mine() {
   var lastBlock = blockchain.lastBlock;
   var lastProof = lastBlock.proof;
   var proof = blockchain.proofOfWork(lastProof);
   // Proof found - receive award for finding the proof
   blockchain.newTransaction("0", nodeId, 1.0);
   // Forge the new Block by adding it to the chain
   var prevHash = blockchain.hash(lastBlock);
   var block = blockchain.newBlock(proof, prevHash);

   return new MineResult(
       "New Block Forged", block.index, block.transactions, proof, prevHash);
 }

}

class MineResult {

 final String message;
 final int blockIndex;
 final List transactions;
 final int proof;
 final String prevHash;

 MineResult(this.message, this.blockIndex, this.transactions, this.proof,
     this.prevHash);
}
```

The `MineResult` class stores data of any message linked to our transactions including the blockindex to identify the block number, and transactions.

### Conclusion
Congratulations! You have now created a Flutter application that uses a Dart blockchain. You can access the full code from [this GitHub repository](https://github.com/johnniembugua/blockchain-app).

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

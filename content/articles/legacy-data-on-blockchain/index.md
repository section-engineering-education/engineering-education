The emergence of Web 3.0 has led to the popularity of a technology known as the blockchain. The blockchain has spurred the interest of many and is continually being understood by the public each day. Blockchain has undoubtedly numerous benefits concerning the storage of data. Some of the benefits include ensuring transparency of the data, decentralization, and ensuring security. Every industry is finding new ways of integrating blockchain technologies into their mode of operation more, to take advantage of the benefits that come along with it.

In case you are wondering how you may take advantage of this change you are in the right place. As a take-off point, we will look from a developer's point of view, at the steps, you would take to store valuable data from your old PC into a blockchain whether public or private. Afterward, you are free to go out there and explore other ways that you make take advantage of blockchain technology.

### Introduction
As much as the idea of having your data stored in a blockchain sounds exciting, the real question is why would you want to store your data in a blockchain in the first place?. The task is quite challenging and involves sophisticated techniques for manipulating data. Just to mention but a few, blockchain is slow(except for some 2 or 3 edge cases), expensive, complex, and hard to work with. If you do not have an answer to the question "Why do you want to store your data in a blockchain?", then you simply don't need a blockchain for storage. Choosing to use blockchain as a means of storage because it is hyped and trendy is like going for a sports car race with a tanker. I mean you would be bulletproof but you would lose the race. The point here is that you should choose the right tool for a job.

 In this tutorial, we will solve this problem from a developer's point of view. This will be like a road map of the approach you would take to store your data in a blockchain. Having that said, we will note delve into code here. After reading this tutorial you will discover several methods of circumventing some of the problems that you face as you try to store your data on the blockchain. None of them is more preferred than the other, it all depends on your scenario.

### Why would you need a blockchain for storage
You should only consider using blockchain for storage if your reason relates to any of the following reasons listed below
1. Transparency 

In the sense that you would want your data readily accessible to anyone and at any time to establish trust

2. Decentralization

In the sense that you do not want to have a single central authority controlling the data since you don't trust the party involved. You would instead give authority over to the network of users.

3. Tamper proof

For example, you have medical records of the name of the parents of children born in a hospital. You would not want that tampered with as this would lead to issues in claiming the child. You would want to detect whether a change has been made to the data and thus take the necessary action.

### Transactions as a means of storage
Most blockchains employ what is called a `transaction model` since most of them are designed to hold a currency. A transaction model works in this way. Let's say John sends money to Mary. That is known as a transaction. The transaction contains 3 pieces of information. John's address(sender's address), Mary's address(receiver's address), and the amount of money transferred. I know that is simple to understand and you are probably wondering how is that relevant in your quest to store legacy data from your old pc into a blockchain. From this, it is inherent to see that we need to find a way how we can package the data into transactions to be able to store it.

Some blockchain protocols allow you to append some data after carrying out a transaction. In this case, we simply append onto the transaction, the data that we want to store. However, this is limited to a certain number of characters that can be appended, and also this feature is not available in all protocols. We thus need to get creative in cases where the protocol in use does not support appending of data.

In cases where the protocol does not allow appending of data to a transaction, we choose to use addresses as a means of storage. We take a tiny amount of data then use it as an address to send a transaction to a receiver address. By this means, we can store data on the blockchain. Instead of using a `payload` of a transaction, the data is encoded into the receiver's address. The disadvantage of this technique is that we can only store a tiny amount of information in the address since this is capped by the address size limit of a given protocol which is usually very small. In addition to that we would not only have to pay the transaction fee but also burn some amount of money since the address we are sending money to, does not belong to us.

### Issues arising with storage of legacy data onto a blockchain.

#### Cost of sharing data
You might be wondering, why does it cost so much to store data on the blockchain?. The answer to this is a little somehow complicated. First of all, the data has to be stored by every computer node on the planet. This is to mean that everyone who downloads the blockchain is downloading your data as well. Processing this data usually consumes a lot of energy which translates to high power bills and increased maintenance costs of equipment. The larger the data, the more energy is consumed since the processing of this data usually involves several complex techniques which as you have seen are energy-intensive. That is why it might cost you an arm and leg to store even a kilobyte of data on the blockchain. When storing on the blockchain, apart from the base price set by the creator, we also pay an additional charge which is dependent on the number of bytes that we want to store. When a smart contract is involved, we pay for the execution time, and as you can see this makes it quite expensive to store data on the blockchain.

#### What is the size of data that can be stored on the blockchain?
After discovering how we might store data on the blockchain, a question arises. "What is the amount of data that can be stored in a blockchain using the method discussed above?" i.e using transactions as a means of storage. Most protocols have a very tiny limit on the data that can be stored which is usually in the kilobyte range. Assuming the legacy data on your PC  is say 2gigabytes of data. How would you store that?. Probably you are thinking that you may divide the data into very many small chunks and then store them in the blockchain. As much as that would help us store the data, that would greatly increase our costs since you would have to pay the base price of each of those small chunks of data. After all, the data we can store on the blockchain is still very limited

#### Sensitive Information
Another issue arising, is what happens when we want to store personal or confidential information on the blockchain. There are two issues here:-

1. If you choose to store information on a public blockchain like ethereum, that data would be accessible by anyone. This is because everyone connected to the blockchain can get a copy of the entire chain. Even if you choose to create a private blockchain, still everyone who is on the blockchain can get a copy, the only difference here being that you have control as to who joins the blockchain or not.

2. Most personal or confidential data has to be deleted at some point especially when you consider the new regulations popping up each day by the data protection agencies. However, this is not feasible as the blockchain is designed in such a way that you are not able to delete data at all. I mean if it was possible to delete data, then that would breach one of the core reasons as to why we would want to store data on the blockchain.

To combat the second problem, we may choose to store hashes of the data as an alternative to the data itself. (This will be discussed later). Another approach would be to encrypt the data before storing it. However, this would lead to another issue where we have to deal with the encryption keys which have to be stored somewhere else, and also their distribution.

#### How do you query your data after storage?
Hurrah! let's assume you have overcome all the challenges discussed above and you have been able to store your data on the blockchain. How do you refer to it when you need it?. A blockchain is not like an SQL database where you can query your data using a query language. Most blockchains allow you to only download transactions by their ids (hashes). So how do we solve all these problems and come up with a means by which all our storage needs are catered for by the blockchain alone? Find out in the next section.

### How to store huge data on the blockchain
You are probably wondering, is it worth to even storing data on the blockchain in the first place given all the challenges it faces. The answer is yes. We will see this when we use a different approach. Apart from storing the raw data, we will discuss other approaches that you may take. 

#### Storing hashes of the data 
We can reduce the expense associated with storing data on the blockchain by storing only the hash of the data on the blockchain. A hash is a string that is generated using another piece of information as input. Intuitively, it is like taking your data, passing it through a 'hashing machine' and what you get at the output is a unique string that is usually small in size compared to the data you set at the input. The output of a hash remains the same provided that you do not change the input. Altering the input in any way even as little as removing a comma, results in a completely different hash. In this way, we can simply tell if our data was modified by checking the hash. Since the hash is small as compared to our input data, this saves us the cost of the transaction which would have been very high otherwise.

The raw data which we use at the input side of the 'hashing machine' can be stored in whatever way we want. For instance, we may choose a relational database or a file system. What follows is that we assign the id(hash) of the blockchain transaction to our raw data. Assuming you chose to store the raw data in a relational database, this would simply be done by adding a column to store the transaction id(hash). By this method, we take inherent advantage of traditional storage systems such as being able to query like in this case, while also getting the tamper-proof feature of the blockchain. If at any time you are in doubt about the raw data, we can hash it and compare it to the hash in the assigned transaction in the blockchain. In this method, however, benefits such as decentralization and transparency are lost depending on your storage mechanism. We get back those benefits using the second method.

#### Storing subsets of the data
We can get back those benefits to some extent by storing hashes of the data and parts of the data on the blockchain. This enhances transparency since the data can be seen by everyone as long as they are connected to the blockchain. By the same means we also achieve decentralization since the whole data is not stored in a single central database but rather is distributed

### Conclusion
In this tutorial we learned the importance of storing data on the blockchain, the approach on how to do that and we also discussed the challenges one may face while trying to store data on the blockchain. Before storing data on the blockchain make sure the functionality you need cannot be provided by other traditional means of storage as these means are always cheaper and less complex. This tutorial only gave you a road map on the approach you would take to store data on the blockchain. To learn more of the technicalities involved while developing apps in the blockchain, click [this](https://www.section.io/engineering-education/the-complete-roadmap-to-blockchain-development/) link to read my previous article on the complete roadmap to blockchain development.


# The Best Frameworks for Developing Decentralized Applications 
With the rise of blockchain technology, more decentralized applications (DApps) are being developed. Frameworks specifically created to simplify DApp development are becoming more and more common. DApp frameworks, like other frameworks, are pieces of code written to the software, making it easy to build blockchain applications. Frameworks can help you develop better and faster apps.

This guide will cover the best frameworks for developing DApps. Also, you will learn what DApps are, why they are the key to future technology, and the different kinds of DApps.

### Table of contents
+ [Decentralized Applications](#decentralized-applications)
+ [Why DApps are key to the future technology](#why-dapps-are-key-to-the-future-technology)
+ [Types of DApps](#types-of-dapps)
+ [DApps frameworks](#dapps-framework)

### Prerequisites
To follow this guide, you'll need to be familiar with blockchain, software development, and [Web 3.O](engineering-education/overview-of-web-3-0/).

### Decentralized Applications (DApps)
Applications such as Google, Twitter, Facebook, and PayPal run on systems created and operated by the company. These applications run on a centralized server. As a result, the organizations have complete control over the apps and their functionality. A Decentralized application (DApp) is very similar in how it works, except that instead of reporting back to Google or PayPal servers, this app reports to the blockchain. You interact with the blockchain through the application.

DApps are systems that run on peer-to-peer and blockchain networks instead of central servers. Because DApps are powered by blockchain, they are different from other applications and perhaps more superior.

These features make dApps essential in the current and future world.
+ All dApps operations are stored on a blockchain to stimulate productivity, trust, and transparency.
+ DApps are open source. The complete code base is usually open-source. Any developer in the community can utilize, improve, and build on top of them.  
+ The users of the dApps are free to run their affairs. Autonomy is the term for this concept. The goal is for anyone to publish or use these dApps. DApps have brought about decentralization as no central authority controls the users. 
+ DApps will give incentives. The blockchain network participants will be awarded cryptographic tokens for their contributions.
+ Using the blockchain to run dApps adds an extra layer of protection. Because the etherium blockchain distributes and encrypts the transactions. As a result, there is no central location where hackers may break in and acquire access.

### Why DApps are key to the future technology
DApp is a fascinating technology that has yet to be fully exploited. DApps are set to help the world due to their tone of benefits and features. Dapps have a lot of potentials to transform the way we work, communicate, do transactions, and much more.

Dapps will continue to grow tremendously in the future. They will become increasingly involved in our everyday life, lowering costs and removing intermediaries from many of our activities.

We expect that Dapps will keep increasing as the adoption of blockchain technology will bring a lot of benefits to various sectors. These sectors include finance, healthcare blockchain, Education, Gaming, and more.

DApps exciting benefits include:
+ Censorship resistant - Users can control their activities because dapps are more sovereign.
+ Security - DApps are cryptographically secure as attackers have no space for security breaches and unauthorized access. This is because dApps are powered by blockchain.
+ No downtime -  DApps relies on a peer-to-peer network. Therefore dApps continue to run even if an individual computer or network parts go down. 
+ Data integrity - Blockchain enables secure data storage because it's immutable. Malicious parties cannot forge transactions or other data already made public.

### Types of DApps
The various types of DApps in blockchain technology tackle different roles. We will go through DEFI and DAO dApps.

#### DEFI financial dApps
Decentralized finance (DEFI) is a financial obligation that uses blockchain to allow investors to perform operations with their money. Many decentralized applications provide a way for people to invest in DEFI.

Bitcoin and Ethereum are some forms of decentralized funds we have. Bitcoin is a decentralized digital currency not controlled by a central authority. It can be sent to anyone from anywhere globally without a financial intermediary.

Today, all our financial institutions and services are entirely centralized. The centralized financial system (CIFI) has its risks. It's prone to mismanagement, fraud, and corruption. What if, like Bitcoin decentralized money, we could decentralize the whole financial system? Well, that's what DeFi is all about. DeFi refers to financial services that are not governed by a central authority.

Decentralized money can be programmed to do automatic tasks. We can create exchanges, loan services, insurance businesses, and other organizations that are not centralized.

 DeFi's goal is to get rid of intermediaries and at the same time offer transparency and decentralization.

#### Decentralized autonomous organizations (DAOs)
A decentralized autonomous organization (DAO) is an organization that is run by a code written on a collection of [smart contracts](https://www.ibm.com/topics/smart-contracts) written on etherium. A DAO is like Google or Facebook, and the difference is that it's autonomous. It operates completely transparently, and it is independent without human intervention.

Smart contracts can do everything if you program them to do so. An example of DAO is a company that operates on a cluster of smart contracts employed on the blockchain. A smart contract will pay its employees, make the hiring, and conduct payments. It makes the whole organization self-sustainable or autonomous.
 
### DApps frameworks
Let's go through the common dApps frameworks for building dApps.

#### Truffle
Truffle is a popular framework for building Etherium-based decentralized applications (dApps). It is a development platform that makes it easy for blockchain developers to create smart contracts, compilation, design the front-end design of dApps, and testing.

Here are some features that make Truffle such an effective tool for creating Ethereum-based DApps:
+ There is built-in support to compile, deploy and create smart contracts.
+ Automated contract testing.
+ Truffle console communicates with smart contracts directly.
+ Seamless migration.
+ Truffle helps with network management for deploying to public and private networks.

##### Truffle installation
To get the development environment up and running. Make sure you have Node.js installed on your PC. Then type the following command into your terminal:
`$ npm install -g truffle`

Then run this command in your project to initialize Truffle:
`$ truffle init`

After that, you may compile your contracts with `truffle compile`, `truffle migrate`, and `truffle test`. Then deploy those contracts to the network and run their tests.

Go through the [Truffle documentation](https://trufflesuite.com/docs/truffle/overview).

#### Brownie
Brownie is a Python-based framework for building and testing smart contracts targeting the [Etherium Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/) applications. It's python-based, meaning it uses python libraries such as web3.py and pytest. Also, it uses python to write scripts. 
Brownie is a powerful and easy-to-use framework that handles deployment, debugging and testing of dApps.

Here is some feature of Brownie:
+ There is [Solidity](https://github.com/ethereum/solidity) and [Vyper](https://github.com/vyperlang/vyper) support.
+ For easy project engagement, there's a built-in console.
+ Contract testing using [pytest](https://github.com/pytest-dev/pytest).
+ [ethPM](https://www.ethpm.com/) packages support.
+ Property-based and [hypothesis-based](https://github.com/HypothesisWorks/hypothesis/tree/master/hypothesis-python) testing.

##### Brownie installation
We'll use the Python 3.6 version or greater to get started with Brownie installation. Brownie installation can be done with `pipx` or `pip`, but `pipx` is preferred.

To install `pipx`, run this command:
`python3 -m pip install --user pipx`
`python3 -m pipx ensurepath`

Then use `pipx` to install the framework.

`pipx install eth-brownie`

Go through the [Brownie documentation](https://eth-brownie.readthedocs.io/_/downloads/en/stable/pdf/).

#### Hardhat
Hardhat is a framework for creating and testing smart contracts. With Hardhat, you can compile, deploy, test, and debug your decentralized applications.

Here are some of the features that make Hardhat a fantastic framework for developing dApps:
+ Run solidity. It quickly deploys, runs tests, and debug the smart contracts solidity code.
+ Great debugging experience
+ It is very flexible. You can change anything you like.
+ It is fully extensible. Hardhat comes with an ecosystem of plugins and tools that you can install to extend its functionalities.

##### Hardhat installation
Ensure you have node.js V 12 or above installed on your computer to begin the installation. Run this command to install Hardhat:
`npm install -D hardhat`

Once it is installed, we are going to create our Hardhat project. We will use `npx`, which comes installed with Node.js. It allows you to execute dependencies installed locally for your project efficiently. Run  this command to execute Hardhat:

`$ npx hardhat`

![Hardhat](/engineering-education/best-frameworks-for-building-dapps/hardhat.jpg)

Go through the [Hardhat documentation](https://hardhat.org/getting-started/).

#### Embark
The Embark framework enables blockchain developers to efficiently build, test, and deploy serverless dApps. It makes alot of the difficulty in building this application super simple.

Some of Embark framework features include:
+ Enable Automatic smart contract deployment
+ Embark integrates with IPFS decentralized storage and helps you distribute your dApp to the network.
+ Enables peer-to-peer communication

##### Embark Installation
To begin the installation process, ensure these tools are installed on your computer:
+ [Node.js](https://framework.embarklabs.io/docs/installation.html#Node)
+ [Ethereum Client](https://framework.embarklabs.io/docs/installation.html#Ethereum-Client-Optional)
+ [IPFS](https://docs.ipfs.io/install/)

Note that it's optional to install Ethereum Client and IPFS. But it's recommended you
install them.

Run this command to install Embark:
`npm -g install embark`

Go through the [Embark documentation](https://framework.embarklabs.io/docs/overview.html).

### Conclusion
DApps are gaining popularity among developers because they offer more functionality and benefits than centralized applications. Frameworks are used to build dApps.

To pick the ideal framework for a project, you must first figure out what you want to build and what tools you'll need. Brownie, for example, is the ideal alternative if you want a python-based program.

To summarize, we learned:
+ What are dApps
+ Why DApps are key to the future technology
+ Various kinds of dApps
+ Top frameworks for building dApps
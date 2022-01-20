---
layout: engineering-education
status: publish
published: true
url: /best-frameworks-for-developing-dapps/
title: The Best Frameworks for Developing Decentralized Applications
description: In this article, we will look at the best frameworks for DApps development. We will also go through the different kinds of DApps and understand why they are key to future technology.
author: julie-ruguru
date: 2022-01-13T00:00:00-08:30
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/best-frameworks-for-developing-dapps/hero.jpg
    alt: DApps example image
---
Frameworks can help you develop better and faster applications. With the rise of blockchain technology, more decentralized applications (DApps) are being developed. Frameworks specifically created to simplify DApps development are becoming more and more common.
<!--more-->
DApps frameworks, like other frameworks, are pieces of code written to the software, making it easy to build blockchain applications.

This guide will cover the best frameworks for developing DApps. You will also learn what DApps are, why they are key to future technology, and the different kinds of DApps. To follow this guide, you'll need to be familiar with blockchain, software development, and [Web 3.O](engineering-education/overview-of-web-3-0/).

### Table of contents
- [Table of contents](#table-of-contents)
- [Overview of decentralized applications (DApps)](#overview-of-decentralized-applications-dapps)
- [Why DApps are key to future technology](#why-dapps-are-key-to-future-technology)
- [Types of DApps](#types-of-dapps)
  - [DEFI financial DApps](#defi-financial-dapps)
  - [Decentralized autonomous organizations (DAOs)](#decentralized-autonomous-organizations-daos)
- [DApps frameworks](#dapps-frameworks)
  - [Truffle](#truffle)
    - [Truffle installation](#truffle-installation)
  - [Brownie](#brownie)
    - [Brownie installation](#brownie-installation)
  - [Hardhat](#hardhat)
    - [Hardhat installation](#hardhat-installation)
  - [Embark](#embark)
    - [Embark Installation](#embark-installation)
- [Conclusion](#conclusion)

### Overview of decentralized applications (DApps)
Applications such as Google, Twitter, Facebook, and PayPal run on systems created and operated by the company. These applications run on a centralized server. As a result, the organizations have complete control over the apps and their functionality.

DApps are very similar in how they work, except that this app reports to the blockchain instead of reporting back to Google or PayPal servers. You interact with the blockchain through the application.

DApps are systems that run on peer-to-peer and blockchain networks instead of central servers. DApps are powered by blockchain, which explains why they are different from other applications and perhaps more superior.

The following features make DApps essential in the current and future world:

- **Storage:** DApps operations are stored on a blockchain. Blockchain does not depend on intermediaries. Therefore, it enhances productivity, trust, and transparency.
- **DApps are open source:** Any developer in the community can utilize, improve, and build on top of them. The complete code base is usually freely available.
- **Autonomy:** DApps users are free to run their affairs. The goal is for anyone to publish or use these DApps. DApps have brought about decentralization as no central authority controls the users.
- **DApps give incentives:** The blockchain network participants are awarded **cryptographic tokens** for their contributions. Cryptographic tokens are units of value in blockchain used for investment, storing value, and making purchases.
- **Security:** Using the blockchain to run DApps adds an extra layer of protection. This is because the ethereum blockchain distributes and encrypts the transactions. As a result, there is no central location where hackers may break in and acquire access.

### Why DApps are key to future technology
DApp is a fascinating technology that has yet to be fully exploited. DApps have a lot of potentials to transform the way we work, communicate, do transactions, and much more. DApps are set to help the world due to their tone of benefits and features.

DApps will continue to grow tremendously in the future. They will become increasingly involved in our everyday life, lowering costs and removing intermediaries from many of our activities.

We expect that DApps will keep increasing as the adoption of blockchain technology will benefit various sectors. These sectors include finance, healthcare blockchain, Education, Gaming, and more.

DApps' exciting benefits include:
- **Censorship resistant:** Users can control their activities because DApps are more sovereign.
- **Security:** DApps are cryptographically secure as attackers have no space for security breaches and unauthorized access. This is because DApps are powered by blockchain.
- **No downtime:** DApps relies on a peer-to-peer network. Therefore, they continue to run even if an individual computer or network parts go down.
- **Data integrity:** Blockchain enables secure data storage because it's immutable. Malicious parties cannot forge transactions or other data already made public.

### Types of DApps
The various types of DApps in blockchain technology tackle different roles. We will go through DEFI and DAO DApps.

#### DEFI financial DApps
Decentralized finance (DEFI) is a financial obligation that uses blockchain to allow investors to perform operations with their money. Many decentralized applications provide a way for people to invest in DEFI.

Bitcoin and Ethereum are some forms of decentralized funds we have. Bitcoin is a decentralized digital currency not controlled by a central authority. It can be sent to anyone from anywhere globally without a financial intermediary.

Today, all our financial institutions and services are entirely centralized. The centralized financial system (CIFI) has its risks. It's prone to mismanagement, fraud, and corruption.

What if, like Bitcoin decentralized money, we could decentralize the whole financial system? Well, that's what DeFi is all about. DeFi refers to financial services that are not governed by a central authority.

Decentralized money can be programmed to do automatic tasks. We can create exchanges, loan services, insurance businesses, and other organizations that are not centralized. DeFi's goal is to get rid of intermediaries and at the same time offer transparency and decentralization.

#### Decentralized autonomous organizations (DAOs)
A decentralized autonomous organization (DAO) is an organization that is run by a code written on a collection of [smart contracts](https://www.ibm.com/topics/smart-contracts) written on ethereum.

A DAO is like Google or Facebook, the difference is that it's autonomous. It operates completely transparently, and it is independent without human intervention.

Smart contracts can do everything if you program them to do so. An example of DAO is a company that operates on a cluster of smart contracts employed on the blockchain. A smart contract will pay its employees, hire, and conduct payments. It makes the whole organization self-sustainable or autonomous.

### DApps frameworks
Let's go through the common DApps frameworks for building DApps.

#### Truffle
Truffle is a popular framework for building Ethereum-based DApps. It is a development platform that makes it easy for blockchain developers to create smart contracts, compile, design the front-end design of DApps, and test.

Here are some features that make Truffle such an effective tool for creating Ethereum-based DApps:
- There is built-in support to compile, deploy and create smart contracts.
- There is automated contract testing.
- Truffle console communicates with smart contracts directly.
- There is seamless migration.
- Truffle helps with network management for deploying to public and private networks.

##### Truffle installation
To get the development environment up and running. Make sure you have Node.js installed on your PC. Then type the following command into your terminal:

```bash
$ npm install -g truffle
```

Then, in your project, run this command to initialize Truffle:

```bash
$ truffle init
```

After that, you may compile your contracts with `truffle compile`, `truffle migrate`, and `truffle test`. Deploy those contracts to the network and run their tests.

Go through the [Truffle documentation](https://trufflesuite.com/docs/truffle/overview) to get more information.

#### Brownie
Brownie is a Python-based framework for building and testing smart contracts targeting the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/) applications. It's python-based, meaning it uses python libraries such as web3.py and pytest. It also uses python to write scripts.

Brownie is a powerful and easy-to-use framework that handles deployment, debugging, and testing DApps.

Here are some features of Brownie:
- There is [Solidity](https://github.com/ethereum/solidity) and [Vyper](https://github.com/vyperlang/vyper) support. Solidity is a programming language for writing smart contracts on the blockchain that automate transactions. Vyper is an experimental programming language based on python designed to run on the EVM. You can use it to write smart contracts.
- For easy project engagement, there's a built-in console.
- It performs contract testing using [Pytest](https://github.com/pytest-dev/pytest). Pytest is a framework for writing tests code using python for applications and libraries.
- [EthPM](https://www.ethpm.com/) packages support. EthPM is a decentralized package manager that aims to package and distribute smart contracts in the ethereum ecosystem.
- It supports property-based and [hypothesis-based](https://github.com/HypothesisWorks/hypothesis/tree/master/hypothesis-python) testing. Brownie makes use of the hypothesis framework to enable property-based testing.

##### Brownie installation
We'll use the Python 3.6 version or higher to get started with Brownie installation. Brownie installation can be done with `pipx` or `pip`, however, `pipx` is preferred.

To install `pipx`, run this command:

```bash
python3 -m pip install --user pipx
```

```bash
python3 -m pipx ensurepath
```

Then use `pipx` to install the framework:

```bash
pipx install eth-brownie
```

Go through the [Brownie documentation](https://eth-brownie.readthedocs.io/_/downloads/en/stable/pdf/) to get more information.

#### Hardhat
Hardhat is a framework for creating and testing smart contracts. With Hardhat, you can compile, deploy, test, and debug your decentralized applications.

Here are some of the features that make Hardhat a fantastic framework for developing DApps:
- **Running solidity:** It quickly deploys, runs tests, and debug the smart contracts solidity code.
- **Debugging:** It provides a great debugging experience.
- **Flexibility:** It is very flexible. You can change anything you like.
- **It is fully extensible:** Hardhat comes with an ecosystem of plugins and tools that you can install to extend its functionalities.

##### Hardhat installation
Ensure you have node.js V 12 or higher installed on your computer to begin the installation. Run this command to install Hardhat:

```bash
npm install -D hardhat
```

Once it is installed, we are going to create our Hardhat project. We will use `npx`, which comes installed with Node.js. It allows you to execute dependencies installed locally for your project efficiently. Run this command to execute Hardhat:

```bash
$ npx hardhat
```

![Hardhat](/engineering-education/best-frameworks-for-developing-dapps/hardhat.jpg)

Go through the [Hardhat documentation](https://hardhat.org/getting-started/) to get more information.

#### Embark
The Embark framework enables blockchain developers to efficiently build, test, and deploy serverless DApps. It makes a lot of the difficulty in building this application super simple.

Some of Embark framework features include:
- It enables automatic smart contract deployment.
- Embark integrates with IPFS decentralized storage and helps you distribute your DApp to the network.
- It enables peer-to-peer communication.

##### Embark Installation
To begin the installation process, ensure these tools are installed on your computer:
- [Node.js](https://framework.embarklabs.io/docs/installation.html#Node).
- [Ethereum Client](https://framework.embarklabs.io/docs/installation.html#Ethereum-Client-Optional).
- [IPFS](https://docs.ipfs.io/install/).

Note that it's optional to install Ethereum Client and IPFS, but it's recommended you
install them.

Run this command to install Embark:

```bash
npm -g install embark
```

Go through the [Embark documentation](https://framework.embarklabs.io/docs/overview.html) to get more information.

### Conclusion
DApps are gaining popularity among developers because they offer more functionality and benefits than centralized applications. Frameworks are used to build DApps.

To pick the ideal framework for a project, you must first figure out what you want to build and the tools you'll need. Brownie, for example, is the ideal alternative if you want a python-based program.

To summarize, we have learned:
- What DApps are.
- Why DApps are key to future technology.
- The various kinds of DApps.
- Top frameworks for building DApps.
- The features of these frameworks.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)

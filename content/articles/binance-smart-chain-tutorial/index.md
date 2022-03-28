---
layout: engineering-education
status: publish
published: true
url: /binance-smart-chain-tutorial/
title: Getting Started With Solidity and Binance Smart Chain
description: This tutorial will show the readers how they can get started with developing a binance smart chain token using Ethereum compatible tools such as Remix and Metamask.
author: esther-wanjira
date: 2022-03-28T00:00:00-21:20
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/binance-smart-chain-tutorial/hero.png 
    alt: Getting Started With Solidity and Binance Smart Chain Hero Image
---
Blockchain networks that support smart contracts functionality are on the rise. Smart contracts are programs that live in a blockchain and are executed on demand. 
<!--more-->
In a platform like Binance, we can use the Smart chain protocol to build decentralized apps in a cross-chain network. 

### Table of contents
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Why Binance Smart Chain](#why-binance-smart-chain)
- [Set up Remix](#set-up-remix)
- [Tokens in Binance Smart Chain](#tokens-in-binance-smart-chain)
- [Defining contracts](#defining-contracts)
- [Add mapping and events](#add-mapping-and-events)
- [Create a smart contract constructor](#create-a-smart-contract-constructor)
- [Retrieve balances in smart contracts](#retrieve-balances-in-smart-contracts)
- [Transfering tokens ownership](#transfering-tokens-ownership)
- [Approve and transfer](#approve-and-transfer)
- [A final demo in MetaMask](#a-final-demo-in-metamask)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Goal
Tokens are the building blocks of any smart contract-based blockchain. We rely on them to build exchange platforms, Dapps, and Defi platforms. This tutorial provides context on how we can get started with developing a binance smart chain token using Ethereum compatible tools such as Remix and Metamask. In the process, we will learn the basics of smart contracts, solidity programming, tokens supply, management, and allocation.

### Prerequisites
- Basics of [Blockchain](https://www.oracle.com/ke/blockchain/what-is-blockchain/) technology.
- An IDE for smart contracts such as the in-browser [Remix IDE](https://remix.ethereum.org/).
- A Metamask wallet extension. Use this [link](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) to install on your Chrome browser.

### Why Binance Smart Chain
Over time the Ethereum platform has expanded causing network congestion to its infrastructure. This impacted gas fees and slowed transactions. As the plan to migrate to Proof-of-Stake has taken a longer time (than expected), and Ethereum currently uses the Proof-of-Work consensus. On the other hand, Binance uses the Proof-of-Authority mechanism.

Block producers are known as validators in the Proof-of-Authority consensus in the Binance Smart Chain. These validators are limited to 21 and need the approval of identities from Binance. Since we need pre-approval from Binance to become a validator, Binance gains complete control making it more of a private blockchain. The Binance Smart Chain is fully compatible with the Ethereum Virtual Machine.

### Set up Remix
Remix is an online tool for Ethereum and solidity development. It comes bundled with plugins for testing, debugging, and deploying smart contracts. Launch Remix IDE on your browser by navigating to https://remix.ethereum.org/. 

The editor looks like this:

![Remix IDE](/engineering-education/binance-smart-chain-tutorial/remix.png)

In your environment, select the solidity version to use. In our case, `version 0.8.2`. Under the `workspaces`, inside our `contracts` folder, add a new file and name it `Token.sol`. Every Solidity file requires that we add the license type and the solidity version compatible with the code and configurations. Inside your `Token.sol`, add the two lines of code as:

```js
//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.2; // compiler version
```

The above code is very straightforward:

- Solidity will use [SPDX](https://spdx.dev/) that has been specified on the first line as `SPDX-License-Identifier: MIT` to show that our code is compliant with the MIT license. 
- The line statement `pragma solidity ^0.8.2;` tells solidity that our code is compatible with version `0.8.2` or later. 

> Note: A pragma directive remains local to a source file ensuring that any modules we import on a file do not cause ambiguity.

### Tokens in Binance Smart Chain
In blockchains that support smart contracts, developers need to create crypto tokens based on a set of standards. These standards include building DApps, exchanges, wallets, etc. While Ethereum's popular standard is the ERC-20 token, BSC uses the BEP-20 standard and in many ways, it is similar to the ERC-20 in Ethereum. Examples of popular BEP-20 tokens include:

- BUSD Token: BUSD stands for [Binance USD](https://paxos.com/busd/). It is a stable coin created by [Paxos](https://paxos.com/), a tether to USD.  
- CAKE Token: This is a BEP-20 token that controls the [PancakeSwap](https://pancakeswap.finance/) platform.
- BUX Token was created as a utility token for the [BUX exchange](https://bux-c.com/) ecosystem.
- SAFEMOON Token: A Defi token for [safemoon](https://safemoon.net/) on the Binance Smart Chain.

### Defining contracts
By convention, each solidity file contains one smart contract. A contract in Solidity is similar to classes in OOP languages, in that it wraps a collection of our variables, functions, events, state of a blockchain, and modifiers. Start by defining a contract named `Token` with the following state variables:

```js
contract Token{
    uint public total_supply = 1500;
    string public token_name = "Tutorial Token"; // token name - human - readable 
    string public symbol = "TTK";
    uint public decimals = 18; // will set the divisibility of your token 
}
```

- State variables are defined outside the function(s) of the contract. These values govern the state of the smart contract and persist on the blockchain. 
- To define non-negative integers, we use the `uint` keyword (unsigned integer).
- Any publicly defined variable is accessible internally and externally by any smart contract. 
- The line `uint public total_supply = 1500;` is a state variable that defines our tokens' total supply. We will have 1500 fungible tokens in our smart contract.
- Since addresses are hard to read, we use a string data type `token_name` as a human-readable name for our token.
- A BEP-20 token includes a `symbol` string data type that is useful in exchange wallets when trading.
- Now, we have `decimals` to represent the smallest fraction of a transferrable token. By default, we use 18 decimals. That means when transferring 2.5 tokens of BEP-20 standard, a calculation to perform is `2.5 * decimals` giving us `2.5 * 10**18 = 2500000000000000000`. For more on this, check [here](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals).

### Add mapping and events
A mapping is a `key-value` store in Solidity. 

The syntax looks like this:

`mapping(key => value) mappingName`

Mapping is a Solidity keyword. Our key is mostly an address that references each record map to the balance (in integers). Our arrow simply points to the direction of the mapping. For example, `0x0000 => 500` is a mapping that shows the address `0x000` has a balance of 500 tokens. 

Define a mapping for the balances:

```js
    // mapping
    mapping(address => uint) public _balance; // bal will constantly update
```

Our final mapping named `allowance` keeps track of the unspent portion of tokens that a delegate third part has spent on our balance. More on this later.

```js 
    mapping(address => mapping(address => uint)) public allowance; //[allowance - how much spender is allowed to spend]
```

The Ethereum Virtual Machine supports events as a way to allow loggings and external software like wallets to listen to and perform actions on behalf of the user. These events inform the calling client about the state of the smart contract. Add an `Approval` and `Transfer` events as. 

```js
    // event transfer
    event Transfer(address indexed from, address indexed to, uint value);
    // event emitted during an approval
    event Approval(address indexed owner, address indexed spender, uint value);
```

### Create a smart contract constructor
Next, add a constructor that runs when the contract is executed. Unlike in object-oriented programming, where the constructor gets initialized every time, Solidity invokes it only once when the contract is deployed to `init` the smart contract state. 

```js
contract Token{
    uint public total_supply = 1500;
    string public token_name = "My Token";
    string public symbol = "MTK";
    uint public decimals = 18;
    constructor(){ 
        // send supply of tokens to the address that deployed smart contract
        balances[msg.sender] = total_supply;
    }
}
```

Here, we will add a constructor to assign all tokens in supply to the address that deployed the contract. From this address, `msg.sender`, the lifecycle of supplies will begin. The distribution of tokens can happen via [ICOs](https://www.investopedia.com/terms/i/initial-coin-offering-ico.asp), [Airdrops](https://taxbit.com/blog/what-are-crypto-airdrops-and-how-do-they-work/), and more. 

### Retrieve balances in smart contracts
To check the number of tokens within a user’s address, we will create a function that accepts an address argument and returns the balance in that address. Functions in smart contracts are invoked to perform actions on demand such as checking balances or updating the state of the blockchain.

```js
function balanceOf(address owner) public view returns(uint) {
    // return mapping balance of the owner
    return balances[owner]; 
}
```  

Using the `view` keyword in a function indicates that it is read-only and will not change the state of any variable. All functions we mark as `view` do not utilize gas fees when executing.

### Transfering tokens ownership
Our BSC smart contract needs a function to support `transfer` transactions. Within our function, we need to ensure that the calling party performing the transfer is the owner of the token.

```js
function transfer(address to, uint value) public returns(bool){
    // ensure sender has enough
    require(balanceOf(msg.sender)>= value, 'balance not enough');
    balances[to] += value;
    balances[msg.sender] -= value;
    // smart contracts emit event which external s/w e.g wallet
    emit Transfer(msg.sender, to , value);
    return true;
}
```   

- The `require()` function checks for the role of actions in a smart contract. Our `require` functions receives the balance of the `msg.sender` address and checks if the caller has enough value to transfer the requested tokens. If the balance is too low, we abort the transaction and throw an error.
- `balances[msg.sender]` references our mapping to perform a deduct `value` of tokens from the sender and instead increment the `balances[to] += value;` for the recipient. These actions will trigger an update to the mappings during transactions.
- Then our function emits a `Transfer` event to support transfer.

### Approve and transfer
To support delegate transactions, we need to approve the actions of the spender so that the owner of the account allows the delegate to transfer the requested amount of tokens. The `approve` function will limit the value of tokens that are deducted from the sender's balance. 

The code snippet for the `approve` function looks like this:

```js
// Delegate a Transfer Functionn
function approve(address spender, uint value) public returns(bool){
    allowance[msg.sender][spender] = value; // spender can spend *value* amount belonging to sender 
    emit Approval(msg.sender, spender, value); // emit approval event to allow spending
    return true;
}      
```  

To transfer tokens from an account, we need to call `Approve` on the address of the `spender` within the smart contract itself.

- The line `allowance[msg.sender][spender] = value;` is a mapping that we can translate as `allowance[owner][recipient] = value`. This triggers an exchange (as `value` in tokens) on behalf of the owner.
- `emit Approval(msg.sender, spender, value);` will emit an event from `msg.sender` to approve the `spender` to spend `value` amount of tokens to its address within the smart contract.

Now we can add a function to automate transfers of approved delegates. The `transferFrom` function will perform a deduction from an account wallet of the owner and emit a `Transfer` event. 

Check the code below: 

```js
// 
function transferFrom(address from, address to, uint value) public returns(bool){
    // check allowance mapping if spender is approved
    require(allowance[from][msg.sender] >=value, "allowance too low");  
    // check balance
    require(balanceOf(from) >= value, "balance is too low"); 
    // update mappings balances of sender & recipient 
    balances[to] += value;
    balances[from] -= value;
    // emit event
    emit Transfer(from, to, value);
    return true;
}
```  

- The first line `require(allowance[from][msg.sender] >=value, "allowance too low");` retrieves a mapping of how much (amount `value` in tokens) the owner allows another account (the delegate) to transfer on his behalf. 
- The `balanceOf` is a function that returns the amount in tokens the address has to confirm spending. Since we need to ensure they exist before allowing them to spend to restrict double spending.
- Now we update our mappings and emit the `Transfer` event to complete the transaction.

### A final demo in MetaMask
Using a metamask plugin, we can inject the web3.js namespace within our browser. If we configure and deploy our smart contract in a sandbox test environment, the final app should look like this:

The executable functions that we deploy to the smart contract to run transactions.

![executable functions](/engineering-education/binance-smart-chain-tutorial/execfuncs.png).

Interacting with transfer and balance functions.

![check-balance-of](/engineering-education/binance-smart-chain-tutorial/check-balance-of.png).

### Conclusion
Blockchain technology has given rise to a new disruptive wave of technological solutions in nearly every industry. It takes things to the next level by rethinking how untrusting parties agree, without relying on third parties to lower risks and manipulations. Ultimately, Web3 and blockchain are still in the early stages of adoption. Time will tell if this technology can become a solid industry standard.

Happy coding!

### Further reading
- [Binance smart Chain docs](https://www.binance.org/en/smartChain).
- [How to set up Metamask wallet](https://www.geeksforgeeks.org/how-to-use-metamask-to-deploy-a-smart-contract-in-solidity-blockchain/).

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

---
layout: engineering-education
status: publish
published: true
url: /generating-randomness-with-chainlink-vrf-using-brownie/
title: Generating Randomness using Chainlink VRF and Brownie 
description: This article will help the reader understand how to generate random numbers using Chainlink VRF. These numbers are secure due to the use of decentralized oracles.
author: raphael-ndonga
date: 2022-03-03T00:00:00-10:30
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/generating-randomness-with-chainlink-vrf-using-brownie/hero.jpg
    alt: Generating Randomness using Chainlink VRF and Brownie Hero Image
---
The Ethereum blockchain is a deterministic system. This means that given the same inputs, the outputs will always be the same. This system poses some challenges when it comes to generating random numbers. You don't want to generate random numbers in a deterministic way. 
<!--more-->
Hackers could manipulate inputs to generate their desired outputs. Chainlink VRF solves this problem by using *decentralized oracles*. 

Oracles link off-chain data (in our case, the random numbers) and connect it to the blockchain. Randomness has a variety of use cases. 

They may include:
- Creating and distributing NFTs.
- Decentralized finance.
- Marketing campaigns and loyalty rewards.
- Ordering processes.
- Blockchain gaming.
- Security and authentication.

### Goal
In this article, we will understand how the Chainlink VRF functions and how it can be deployed in smart contracts using brownie.

### Prerequisites
To follow along, the reader will need:
- A basic understanding of Python and Solidity programming languages.
- A basic understanding of Brownie API.
- Brownie Python Virtual Environment installed.
- Preferably Python3 installed.
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/) editor.

### Getting started
The first step is to initialize a `brownie` project in the terminal using the command below:

```bash
brownie init
```

In the *contracts* folder, create a new file called *RandomNumberGen.sol* and initialize the *contract*:

```java
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RandomNumberGen {}
```

Add the following import:

```java
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
```

> Note that the above import may show some errors. We will ignore these IDE errors for now.

`Brownie` cannot automatically understand where this import is coming from. Therefore, you should provide information on Chainlink's GitHub. `Brownie` will pull the Chainlink code from Github.

Create `brownie-config.yaml` file in the *main* folder and add the following dependency:

```yaml
dependencies:
  - "smartcontractkit/chainlink@1.1.0"
```

Now, we need to let `brownie` know that `@chainlink` actually refers to the dependency we just declared above. 

In the same `brownie-config.yaml` file, add the following:

```yaml
compiler:
  solc:
    remappings:
      - "@chainlink=smartcontractkit/chainlink@1.1.0"
```

Then run the command below:

```python
brownie compile
```

### Interacting with Chainlink VRF
With the dependencies present, you can now interact with the Chainlink VRF.

First, you need to inherit from the *VRFConsumerBase contract*. This is the contract with the Randomness that is required.

```java
contract RandomNumberGen is VRFConsumerBase{

}
```

There are three key attributes you need to declare:

```java
bytes32 internal keyHash;
uint256 internal fee;
uint256 public randomNumber;
```

- `keyHash` is the unique key that identifies what tasks are to be performed.
- `randomNumber` will hold the random number you intend to generate.
- `fee` is the amount of money (LINK) that is required to perform this transaction.

Chainlink charges `LINK` for one to use their oracles. However, for *test* environments, you can obtain `LINK` for free using [Chainlink Faucets](https://faucets.chain.link/).

You can also use this *faucet* to obtain free *ETH* for your *test* networks. In this case, ensure you have some *Rinkeby ETH*.

The constructor of your contract will be a *VRFConsumerBase* constructor and it takes two arguments:

- `_vrfCoordinator` - This is the address of the smart contract that checks whether the random number generated is truly random.
- `_link` - This is the address of the *link token*. It varies depending on your network.

`RandomNumberGen` also requires the following constructor:

```java
constructor(
    address _vrfCoordinator,
    address _link,
    bytes32 _keyHash,
    uint256 _fee
) VRFConsumerBase(_vrfCoordinator, _link) {
    keyHash = _keyHash;
    fee = _fee;
}
```

At this point, you need to obtain the respective addresses of the `vrfCoordinator`, `link token`, and `keyHash`. You can learn more about these addresses [here](https://docs.chain.link/docs/vrf-contracts/).

An effective way to store these addresses is in the `brownie-config.yaml` file that you created earlier:

```yaml
networks:
  rinkeby:
    vrf_coordinator: "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B"
    link: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    key_hash: "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
```

Since these addresses are on the *rinkeby* network, you need to attach your Ethereum address. 

Obtain the *private key*, and store it in a `.env` file. You also need to obtain an *Infura Project id*.

Refer to the following links:

- [How to get an Infura Id](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)
- [How to export a Metamask Private Key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

Create a `.env` file and place it in the *main* folder:

```env
export PRIVATE_KEY = your_private_key
export WEB3_INFURA_PROJECT_ID = your_infura_project_id
```

Next, we need to alert `brownie` as to where the private key is stored. In your `brownie-config.yaml` file, add the following setting:

```yaml
dotenv: .env
wallets:
    from_key: ${PRIVATE_KEY}
```

Create a `getRandomness()` function in `RandomNumberGen.sol`. It checks whether you have enough links to fund the transaction. 

It also requests for a verifiable random number using the keyhash:

```java
    function getRandomness() public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Inadequate Link to fund this transaction"
        );
        return requestRandomness(keyHash, fee);
    }
```

Now the *VRF* coordinator produces a verified random number. This is by overriding the `fulfillRandomness` function in `RandomNumberGen.sol`:

```java
function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomNumber = randomness;
    }
```

The `requestId` is the unique id that identifies your random number on the blockchain. 

Add a *rollDice* function that randomly selects a number between 1 and 6:

```java
function rollDice() public view returns (uint256) {
        require(randomNumber > 0, "Random number has not yet been obtained");
        return randomNumber % 6;
    }
```

The final contract should look like this:

```java
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RandomNumberGen is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomNumber;

    constructor(
        address _vrfCoordinator,
        address _link,
        bytes32 _keyHash,
        uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _link) {
        keyHash = _keyHash;
        fee = _fee;
    }

    function getRandomness() public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Inadequate Link to fund this transaction"
        );
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomNumber = randomness;
    }

    function rollDice() public view returns (uint256) {
        require(randomNumber >= 0, "Random number has not yet been obtained");
        return (randomNumber % 6) + 1;
    }
}
```

Run the command below to compile the program:

```bash
brownie compile
```

The final `brownie-config.yaml` file should look as shown below:

```yaml
dotenv: .env
dependencies:
  - "smartcontractkit/chainlink@1.1.0"
compiler:
  solc:
    remappings:
      - "@chainlink=smartcontractkit/chainlink@1.1.0"
networks:
  rinkeby:
    vrf_coordinator: "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B"
    link: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    key_hash: "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"

wallets:
  from_key: "${PRIVATE_KEY}"
```

### Deploying using Brownie
The first step is to ensure that your brownie virtual environment is running properly.

Next, you need to deploy the smart contract to the blockchain using brownie. Under the scripts folder, create a Python file called `helpful_scripts.py`.

In this file, create a helper function and name it `get_account()`. This function will help us obtain an account that deploys the smart contract:

```python
from brownie import accounts, config
def get_account():
    account = accounts.add(config["wallets"]["from_key"])
    return account
```

- `accounts` is the brownie library that provides accounts. It can create fake virtual accounts using `ganache`. It can also access your real account using your private key.
- `config` is the brownie library that accesses the `brownie-config.yaml` file you created earlier.

Create another `deploy_contract.py` file in the *scripts* folder. This file will deploy your smart contract to the blockchain:

```python
from scripts.helpful_scripts import get_account
from brownie import RandomNumberGen, network, config

def get_contract():
    account = get_account()
    fee = 0.1 * 10**18
    contract = RandomNumberGen.deploy(
        config["networks"][network.show_active()]["vrf_coordinator"],
        config["networks"][network.show_active()]["link"],
        config["networks"][network.show_active()]["key_hash"],
        fee,
        {"from": account},
    )

def main():
    get_contract()
```

*10**18* converts the fee from *Eth* to *Wei*. Wei is the smallest denomination of Ethereum transactions.

`RandomNumberGen` is the smart contract that you created in Solidity.

The function `network.show_active()` will return `rinkeby` when it's invoked:

```bash
brownie run deploy_contract --network rinkeby
```

The *RandomNumberGen* smart contract should now be successfully deployed on the *Rinkeby Ethereum* blockchain.

### Funding the contract with LINK
Since the smart contract has been deployed, we need to obtain a random number. To do this, you first need to fund the contract deployed with `Link`. 

`Link` is Chainlink's token. They use it to charge fees for using their oracles. In this case, you need to pay to get the random number.

You will have to transfer this `link` from your account to the smart contract. To do this, you will require the [Link Token](https://github.com/smartcontractkit/LinkToken/blob/master/contracts/v0.4/LinkToken.sol) contract from Chainlink.

Create a `LinkToken.sol` in the *contracts* folder. Next, copy and paste the entire code. The only part you will need to change is the *imports*.

```java
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.11;

import "@chainlink/contracts/src/v0.4/ERC677Token.sol";
import {StandardToken as linkStandardToken} from "@chainlink/contracts/src/v0.4/vendor/StandardToken.sol";

contract LinkToken is linkStandardToken, ERC677Token {
    ....
}
```

Run *brownie compile* to ensure that everything is working correctly:

```bash
brownie compile
```

Now create another helper function `fund_with_link(contract_address)` in `helpful_scripts.py`. This function will fund the `contract address` input in the parameter with link:

```python
from brownie import Contract, accounts, network, config, LinkToken

def fund_with_link(contract_address):
    account = get_account()
    link = Contract.from_abi(
        LinkToken._name,
        config["networks"][network.show_active()]["link"],
        LinkToken.abi,
    )
    fee = 0.1 * 10 ** 18
    tx = link.transfer(contract_address, fee, {"from": account})
    tx.wait(1)
    print("Contract funded with link successfully")
    return tx
```

The link token already exists in the blockchain. Therefore, you use `Contract.from_abi()` which receives the *contract name*, the *address of the contract* in the blockchain, and the *abi*.

`abi` stands for Application Binary Interface. This is the standardized way of interacting with smart contracts on the Ethereum blockchain.

`tx.wait(1)` waits for one transaction to complete before moving on.

We need to invoke this function in the `deploy_contract.py` file:

```python
from brownie import RandomNumberGen, accounts, config, network

from scripts.helpful_scripts import fund_with_link, get_account

def deploy_contract():
    ...
    fund_with_link(contract.address)
```

### Generating the Random Number
Since the contract is now funded with a link, it's ready to generate the random number.

```python
def deploy_contract():
    ...
    tx = contract.getRandomness({"from": account})
```

The final `deploy_contract.py` should look like this:

```python
import time
from brownie import RandomNumberGen, accounts, config, network
from scripts.helpful_scripts import fund_with_link, get_account

def main():
    deploy_contract()

def deploy_contract():
    account = get_account()
    fee = 0.1 * 10 ** 18
    contract = RandomNumberGen.deploy(
        config["networks"][network.show_active()]["vrf_coordinator"],
        config["networks"][network.show_active()]["link"],
        config["networks"][network.show_active()]["key_hash"],
        fee,
        {"from": account},
    )
    fund_with_link(contract.address)
    tx = contract.getRandomness({"from": account})
    tx.wait(1)
    time.sleep(200)
    print(f"The random number is {contract.randomNumber()}")
    print(f"The dice rolled is {contract.rollDice()}")
```

`time.sleep(200)` is essential because the random number takes some time to reflect on the smart contract. 

Run the following command to deploy the contract:

```bash
brownie run deploy_contract --network rinkeby
```

### Conclusion
Creating random numbers that are unpredictable poses a challenge to computer scientists. It's difficult to generate random numbers using computers. 

Chainlink however solves this problem using chainlink vrfs. Their random numbers are yet to be hacked or exploited by malicious individuals.

This tutorial hopefully shed a light on how to utilize chainlink oracles to obtain truly verifiable random numbers.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
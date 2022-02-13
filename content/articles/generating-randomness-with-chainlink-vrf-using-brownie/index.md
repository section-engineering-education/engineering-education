### Introduction
The Ethereum blockchain is a deterministic system. 'Deterministic' means that given the same inputs, the outputs always be the same. When it comes to generating random numbers, this is a problem. You don't want to generate random numbers in a way that is deterministic. Hackers could manipulate inputs to generate their desired outputs.

Chainlink VRF solves this problem by using decentralized 'oracles'. Oracles link offchain data (in our case, the random numbers) and connect it to the blockchain.
Randomness has a variety of usecases which are important. For example,
Selecting Fairly
Creating NFTs and distributing them.
Decentralized finance
Marketing Campaigns and Loyalty Rewards
Ordering Processes
Blockchain Gaming
Security and Authenticating

### Goal
In this article, you will understand how the Chainlink VRF functions and how to deploy it in your smart contracts using brownie.

### Prerequisites
1. A basic understanding of Python Programming Language.
2. A basic understanding of Solidity Programming Language.
3. A basic understanding of Brownie API.
4. Brownie Python Virtual Environment installed.
5. Preferrably Python3 installed.
6. Visual Studio Code editor.
7. Conclusion

### Table of Contents
1. Initialization
2. Interacting with Chainlink VRF
3. Deploying using Brownie
4. Funding the contract with LINK
5. Generating the Random number.

### Initialization
```python
brownie init

```
Initialize a `Brownie` project in the terminal

Under the contracts folder, create a new file called RandomNumberGen.sol
Initialize the contract:
```java
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RandomNumberGen {}
```

Add the following import:
```java
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
```
>**Note**: The solidity compile might yell at you for the above import. Ignore the IDE errors.

`Brownie` cannot automatically understand where this import is coming from. You need to provide information on chainlink's github. Github is where `Brownie` will pull the chainlink code from.

Create `brownie-config.yaml` file in the main folder. Add the following dependency.
```yaml
dependencies:
  - "smartcontractkit/chainlink@1.1.0"
```

Now let brownie know that `@chainlink` actually refers to the dependency you just declared. In the same `brownie-config.yaml` file:
```yaml
compiler:
  solc:
    remappings:
      - "@chainlink=smartcontractkit/chainlink@1.1.0"
```

Run:
```python
brownie compile
```

### Interacting with Chainlink VRF
With the dependencies present, you can now interact with the Chainlink VRF.
First of all you need to inherit from the VRFConsumerBase contract. It is the contract with the Randomness you need.

```java
contract RandomNumberGen is VRFConsumerBase{

}
```


There are 3 key attributes you need to declare:
```java
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomNumber;
```

`keyHash` is the unique key that identifies what tasks are to be performed.

`fee` is the amount of money (LINK) that is required to perform this transaction.
Chainlink charges `LINK` in order for you to use their oracles. Don't worry, for testnet environments, you can obtain `LINK` for free using faucets:
[Chainlink Faucets](https://faucets.chain.link/)

You can also use this faucet to obtain free ETH for your test networks. In this case, ensure you have some Rinkeby ETH.

`randomNumber` will hold the random number you intend to generate.

The constructor of your contract will be a VRFConsumerBase constructor. It takes two arguments:

`_vrfCoordinator` - this is the address of the smart contract that checks whether the random number generated is truly random.

`_link` - this is the address of the link token. It varies depending on the network you are on.

`RandomNumberGen` requires a constructor:

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

At this point, you need to obtain the respective addresses of the `vrfCoordinator`,`link` token and `keyHash`.
Refer to the link below:
[Chainlink VRF Contract Addresses](https://docs.chain.link/docs/vrf-contracts/)

Scroll to the Rinkeby section. You will get all the information necessary there.
An effective way to store these addresses is in the `brownie-config.yaml` file you created earlier.

```yaml
networks:
  rinkeby:
    vrf_coordinator: "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B"
    link: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
    key_hash: "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311"
```

Since these addresses are on the rinkeby network, you need to attach your Ethereum address. Obtain the private key, and store it in a `.env` file. You also need to obtain an Infura Project id.

Refer to the following links:

[How to get an Infura Id](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)

[How to export a Metamask Private Key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

Create a file `.env` and place it in the main folder.
```env
export PRIVATE_KEY=0xyour_private_key
export WEB3_INFURA_PROJECT_ID= 0your_infura_project_id
```

Now you need to alert brownie as to where your private key is. In your `brownie-config.yaml` file:
```yaml
dotenv: .env
wallets:
    from_key: ${PRIVATE_KEY}
```

Create a `getRandomness()` function in `RandomNumberGen.sol`. It checks whether you have enough link to fund the transaction. It also requests for a verifiable random number using the keyhash.
```java
    function getRandomness() public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Inadequate Link to fund this transaction"
        );
        return requestRandomness(keyHash, fee);
    }
```

Now the VRF coordinator produces a verified random number. This is by overriding the `fulfillRandomness` function in `RandomNumberGen.sol`:
```java
function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomNumber = randomness;
    }
```
The `requestId` is the unique id that identifies your random number on the blockchain. 

Add a rollDice function that randomly selects a number between 1 and 6:
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

Run:
```python
brownie compile
```

The final `brownie-config.yaml` file:
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
First and foremost, ensure your brownie virtual environment is running properly.

Now you need to deploy this smart contract to the blockchain using brownie. Under the scripts folder, create a python file `helpful_scripts.py`.

In this file, create a helper function `get_account()`. This function will help you to obtain your account that deploys the smart contract:
```python
from brownie import accounts, config
def get_account():
    account = accounts.add(config["wallets"]["from_key"])
    return account
```

`accounts` is the brownie library that provides accounts. It can create fake virtual accounts using `ganache`. It can also access your real account through giving it your private key, as you have done.

`config` is the brownie library that accesses the `brownie-config.yaml` file you created earlier.

Create another python file `deploy_contract.py` in the scripts folder. This file will do the job of actually deploying your smart contract to the blockchain:
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

10**18 converts the fee from Eth to Wei. Wei is the smallest denomination of Ethereum transactions.
`RandomNumberGen` is the smart contract you created in Solidity.
The function `network.show_active()` will return `rinkeby` in this case after you run:
```python
brownie run deploy_contract --network rinkeby
```

The RandomNumberGen smart contract should now be successfully deployed on the Rinkeby Ethereum Blockchain.

### Funding the Contract with LINK
So now you have your contract deployed. You now want to obtain the random number. To do this, you need first to fund the contract deployed with `Link`. 

`Link` is Chainlink's token. They use it to charge fees for using their oracles. In this case, you need to pay to get the random number.

You will have to transfer this `link` from your account to the smart contract. To do this, you will require the `LinkToken` contract from Chainlink.

[Link Token](https://github.com/smartcontractkit/LinkToken/blob/master/contracts/v0.4/LinkToken.sol)

Create a `LinkToken.sol` in the contracts folder. Copy and paste the entire code. The only part you will need to change are the imports.

```java
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.11;

import "@chainlink/contracts/src/v0.4/ERC677Token.sol";
import {StandardToken as linkStandardToken} from "@chainlink/contracts/src/v0.4/vendor/StandardToken.sol";

contract LinkToken is linkStandardToken, ERC677Token {
    ....
}
```

Run brownie compile to ensure that everything is working.
```python
brownie compile
```

Now create another helper function `fund_with_link(contract_address)` in `helpful_scripts.py`. This function will fund the contract address input in the parameter with link:
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

The link token already exists in the blockchain. Therefore, you use `Contract.from_abi()` which receives the contract name, the address of the contract in the blockchain and the abi.

`abi` stands for Application Binary Interface. This is the standardised way of interacting with Smart contracts on the Ethereum blockchain.

`tx.wait(1)` waits for one transaction to complete before moving on.

Now call this function back in `deploy_contract.py`:
```python
from brownie import RandomNumberGen, accounts, config, network

from scripts.helpful_scripts import fund_with_link, get_account

def deploy_contract():
    ...
    fund_with_link(contract.address)
```

### Generating the Random Number
Now the contract is funded with link. It is now ready to generate the random number.
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

`time.sleep(200)` is essential in that the random number takes a while to reflect on the smart contract. Therefore it is necessary to wait.

Run the code again:
```python
brownie run deploy_contract --network rinkeby
```

### Conclusion
Creating random numbers that are unpredictable has always been a problem to computer scientists. It will always be difficult to generate random numbers using computers. Chainlink however solved this problem elegantly using chainlink vrfs. Their random numbers are yet to be hacked and unlikely to be so.

This tutorial hopefully shed a light or so on how to utilize chainlink oracles to obtain truly verifiable random numbers.
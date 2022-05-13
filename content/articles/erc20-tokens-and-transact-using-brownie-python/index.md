---
layout: engineering-education
status: publish
published: true
url: /erc20-tokens-and-transact-using-brownie-python/
title: How to Create ERC20 Tokens and Transact using Brownie (Python)
description: This tutorial will guide the reader on how to create ERC20 Tokens and Transact using Brownie and python.
author: raphael-ndonga
date: 2022-04-11T00:00:00-13:00
topics: [Blockchain]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/erc20-tokens-and-transact-using-brownie-python/hero.jpg
    alt: Transact erc20 tokens using brownie Hero Image
---
ERC20 tokens are a representation of something on the Ethereum Blockchain. ERC20 tokens have become very useful and have found applications in a variety of areas.
<!--more-->
### Objectives
In this article, we will go over what you need to deploy and transact your own ERC20 token, by doing the following: 
- Create your own ERC20 token.
- Deploy your token to a local blockchain.
- Make transactions using your token.
- Create a smart contract that interacts with your token.

### Prerequisites
- Have Visual Studio Code (VS Code) installed.
- Have the Brownie Python environment installed.
- Some basic knowledge in Python Programming Language.
- Some prior knowledge in Solidity Programming Language.

### Table of contents
1. [Initialization](#initialization).
2. [Deploy the Token](#deploy-the-token).
3. [Transacting with the token](#transacting-with-the-token).
4. [Creating a Smart Contract that transacts the Token](#creating-a-smart-contract-that-transacts-the-token)


### Initialization
Create a new folder *ERC20*. Open it in VS Code. Open the terminal:

```python
brownie init
```

### Deploy the Token
Create a file in the `ERC20` directory called `brownie-config.yaml`. It will contain all your configurations.

The easiest way to implement the ERC20 contract is to use `OpenZeppelin`'s library. Their smart contracts are thoroughly tested and trusted by top-tier crypto companies.

The dependencies from `OpenZeppelin` will be contained in the `brownie-config.yaml` file:

```yaml
dependencies:
  - OpenZeppelin/openzeppelin-contracts@4.5.0

compiler:
  solc:
    remappings:
      - '@openzeppelin=OpenZeppelin/openzeppelin-contracts@4.5.0'
```

Now onto the main event. Create your own token *MyToken.sol*. Save the file under the *contracts* folder.

```java
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    //Instead of WILLIAM and BILL you can use your names to make this token your own!
    constructor (address _founder, uint256 _initialSupply) ERC20("WILLIAM","BILL"){
        _mint(_founder,_initialSupply);
    }
}
```

To make sure your contract is all set, run:
```python
brownie compile
```

Your Token takes 2 parameters. `_founder` and `_initialSupply`. The founder will receive all the tokens from the initial supply.

Your token inherits from OpenZeppelin's ERC20. It takes 2 parameters. `_name` and `_symbol`, which have been named `WILLIAM` AND `BILL`.

Upon initialization, this contract grants the `_initialSupply` tokens to the `_founder`, through the `_mint` function.

By default, this ERC20 token uses 18 decimals.

Create a Python file named *transact_token.py* under the *scripts* folder.

```python
from brownie import MyToken,accounts
from web3 import Web3

def deploy_token():
    initial_supply = Web3.toWei(21_000_000,"ether")
    my_token = MyToken.deploy(accounts[0],initial_supply,{"from":accounts[0]})
    return my_token
def main():
    deploy_token()

main()
```

> MyToken.deploy() takes 3 parameters: 
1. The founder who will have tokens minted for them.
2. The initial supply which is the number of tokens minted for the founder.
3. The account that deploys the Token Smart Contract ({"from":x}).

>It is important that the founder's account be the same account that deploys the smart contract. This is because the functions in the ERC20 contract will assume that the funds will come from the account that deployed the Token Smart Contract. 

The `initial_supply` has been set to 21 million tokens.

`Web3.toWei(x,"ether")` has been used to convert 21 million to the 18 decimal places required.

The account you will use to deploy this token will be `accounts[0]`. This is an address on a local blockchain network deployed using `ganache`. Brownie has `ganache` set up by default.

In the terminal, run:

```python
brownie run transact_token
```

### Transacting with the Token
You have your token deployed on the blockchain. Now you need to check the balance.
In *transact_token.py* create a new function:
```python
def get_token_balance(account_address):
    my_token = MyToken[-1]
    balance = my_token.balanceOf(account_address)
    print(f"The account {account_address} has balance {balance}")
```

`balanceOf(address)` is another function implemented by `OpenZeppelin` to check the balance of the token held by an address.

Check the token balance supplied to the `founder`, who was `accounts[0]`.
```python
def main():
  deploy_token()
  account_0 = accounts[0]
  get_token_balance(account_0)

```

Run:
```python
brownie run transact_token
```

Knowing that your `account_0` has enough tokens, now send it to other accounts. In *transact_token.py* create a new function:
```python
def send_token(receiver,amount):
    my_token = MyToken[-1]
    my_token.transfer(receiver,amount)
    get_token_balance(receiver)
```

`MyToken[-1]` obtains the most recently deployed `MyToken` smart contract.

The token is transferred from the account that deployed the Token Smart Contract. It is then sent to the receiver address specified.

In the `main()` function:
```python
def main():
  deploy_token()
  account_0 = accounts[0]
  account_1 = accounts[1]
  get_token_balance(account_0)
  send_token(account_1,Web3.toWei(7_000_000,"ether"))
  get_token_balance(account_0)
```

In the terminal, run:

```python
brownie run transact_token
```

### Creating a Smart Contract that Transacts the Token
Under the *contracts* folder, create a new file *QuizReward.sol*:

```java
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QuizReward {
    uint256 private correctAnswer;
    uint256 private reward;

    constructor(){
        correctAnswer = 11;
        reward = convertToWei(1000000);
    }

    function answerQuestion(uint256 _answer, address payable user,IERC20 token)  public{
        require(_answer == correctAnswer,"that is the wrong answer");
        token.transferFrom(msg.sender,user,reward);
    }
    function convertToWei(uint256 _eth) public pure returns(uint256){
        return _eth*(10**18);
    }
}
```

`correctAnswer` contains the number to be compared against. `reward` contains the number of tokens to be sent to whoever answers correctly.

The function `convertToWei` converts the input number to 18 decimal places.

The function `answerQuestion` has 3 parameters. The answer received, the address to be paid and the token to reward. The reward is transferred to the address only if the answer is correct.

In the terminal, run:
```python
brownie compile
```

Deploy this smart contract in *transact_token.py*:
```python
from brownie import MyToken,accounts,QuizReward
from web3 import Web3

def deploy_quiz_reward():
    quiz_reward = QuizReward.deploy({"from":accounts[0]})
    return quiz_reward
```

There are 2 ways in which this smart contract can reward users. 

The first way is to transfer the tokens from the founder (`accounts[0]`) to the smart contract. This kind of transfer has already been demonstrated.

The second way is for the founder to give the smart contract an allowance. An allowance to spend the founder's money. Think of it as the founder granting her debit card, but she can limit the amount the smart contract can spend. This is what we are going to do.

In *transact_token.py* create a function:
```python
def set_allowance(spender_address,amount):
    my_token = MyToken[-1]
    my_token.increaseAllowance(spender_address,amount)
```

The spender in this case will be the smart contract:
```python
def main():
    my_token = deploy_token()
    quiz_reward = deploy_quiz_reward()
    account_0 = accounts[0]
    account_1 = accounts[1]
    account_2 = accounts[2]
    get_token_balance(account_0.address)

    send_token(account_1,Web3.toWei(7_000_000,"ether"))
    get_token_balance(account_0.address)

    set_allowance(quiz_reward.address,Web3.toWei(6_000_000,"ether"))
```

The quiz reward smart contract has access to 6,000,000 tokens of the founder(`accounts[0]`). The Smart Contract doesn't necessarily own the 6,000,000 tokens. It is only allowed to spend it.

Continue in `main()`:
```python
def main():
    ...
    set_allowance(quiz_reward.address,Web3.toWei(6_000_000,"ether"))
    quiz_reward.answerQuestion(11,account_2,my_token)
    get_token_balance(account_0.address)
    get_token_balance(account_1.address)
    get_token_balance(account_2.address)
    get_token_balance(quiz_reward.address)

```

The final *transact_token.py* should look as follows:
```python
from brownie import MyToken,accounts,QuizReward
from web3 import Web3

def deploy_token():
    initial_supply = Web3.toWei(21_000_000,"ether")


    my_token = MyToken.deploy(accounts[0],initial_supply,{"from":accounts[0]})
    return my_token

def main():
    my_token = deploy_token()
    quiz_reward = deploy_quiz_reward()
    account_0 = accounts[0]
    account_1 = accounts[1]
    account_2 = accounts[2]
    get_token_balance(account_0.address)

    send_token(account_1,Web3.toWei(7_000_000,"ether"))
    get_token_balance(account_0.address)

    set_allowance(quiz_reward.address,Web3.toWei(6_000_000,"ether"))

    quiz_reward.answerQuestion(11,account_2,my_token)
    get_token_balance(account_0.address)
    get_token_balance(account_1.address)
    get_token_balance(account_2.address)
    get_token_balance(quiz_reward.address)

def get_token_balance(account_address):
    my_token = MyToken[-1]
    print(f"The account {account_address} has balance {my_token.balanceOf(account_address)}")

def send_token(receiver_address,amount):
    my_token = MyToken[-1]
    my_token.transfer(receiver_address,amount)
    get_token_balance(receiver_address)
    
def set_allowance(spender_address,amount):
    my_token = MyToken[-1]
    my_token.increaseAllowance(spender_address,amount)

def deploy_quiz_reward():
    quiz_reward = QuizReward.deploy({"from":accounts[0]})
    return quiz_reward

main()
```

Finally, run:
```python
brownie run transact_token
```

You will get this output:
```bash
...
Transaction sent: 0xb59238b8cda7af32dff1780e0e8c665a34da0df18b9994a362a161f8601ed723
  Gas price: 0.0 gwei   Gas limit: 12000000   Nonce: 9
  QuizReward.answerQuestion confirmed   Block: 10   Gas used: 62723 (0.52%)

The account 0x66aB6D9362d4F35596279692F0251Db635165871 has balance 13000000000000000000000000
The account 0x33A4622B82D4c04a53e170c638B944ce27cffce3 has balance 7000000000000000000000000
The account 0x0063046686E46Dc6F15918b61AE2B121458534a5 has balance 1000000000000000000000000
The account 0x9E4c14403d7d9A8A782044E86a93CAE09D7B2ac9 has balance 0
Terminating local RPC client...
```

Clearly, the smart contract was able to transfer 1000000 tokens to the account as requested. It can also be observed that the smart contract has no tokens it possesses. It is only allowed to use the tokens in the founder's account. 

### Further Readings
To view all the ERC20 functions inherited from the OpenZeppelin library, follow this link:[OpenZeppelin ERC20](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20)

There are a few functions which have not been covered here. 

For example:
`_burn`. This is the opposite of `_mint`. It destroys the tokens in an account and reduces the total supply circulating.

`decreaseAllowance`. This is the opposite of `increaseAllowance`. It reduces the tokens that an address is allowed to spend on an account.

With the basics in place, you can easily adapt these functions into your code without much of a hassle.

### Conclusion
In this tutorial, you have learned how to create these ERC20 tokens, and deploy them to a local blockchain using ganache, but you can challenge yourself by deploying it to a test net such as `Rinkeby` or even the `Mainnet`! You also learned all the various ways you can transact using your token, and also how to make a smart contract transact your token.

Congratulations on making it this far! Go forth and deploy your tokens!
Happy coding!

---
Peer Review Contributions by: [Mohamed alghadban](/engineering-education/authors/mohamed-alghadban/)

### Creating A Blockchain With Python
In my previous [article](https://www.section.io/engineering-education/an-introduction-to-blockchain-architecture/), I wrote explicitly on understanding blockchain technology and its components. While we’ve understood the theoretical aspect of blockchain technology, I deem it fit that we should have a look into creating a blockchain to visualize the components of the blockchain in action.

### Prerequisite
The prerequisites for this article includes an understanding of the following concepts:
- Knowledge of Object-Oriented Programming Language with Python
- Basic understanding of  Postman Desktop

Yes, not many requirements are needed to delve into this tutorial. Let’s proceed to the tools we will require to build a blockchain.

### Tools Requirements
- Pycharm or Visual Studio Code or Anaconda
- Postman Desktop
- Virtual Environment
- Flask

We make use of Flask to create a web application containing the blockchain. We also require Postman to make requests to interact with our blockchain, using the GET request to get the actual state of our blockchain or to mine a block.


### Table of Contents
- [Building The Architecture](#building-the-architecture)
- [Mining Our Blockchain](#mining-our-blockchain)
- [Running The Application](#running-the-application)
- [Conclusion](#conclusion)

### Building The Architecture
Let’s proceed to build our first blockchain.

We begin by launching our IDE and install Flask in our virtual environment.  After setting up our environment, we create a new file for our code, and name it `blockchain.py`.

#### Initializing packages
In our `blockchain.py` file, we start by importing the following packages as they are required in building our blockchain:

```python
import datetime
import json
import hashlib
from flask import Flask, jsonify
```
We use the `DateTime` library to attach a timestamp to each block that is created or mined. The `hahshlib` will be used to hash a block,  `JSON` will be used to encode the block before we hash them, and `jsonify` from the Flask library will be used to return messages to Postman.

#### The Genesis Block
To start building our blockchain, we create a `Blockchain` class, and the `__init__` method will consist of a variable called chain to store a list of all the blocks in the blockchain, and then a `create_blockchain()` method to create our Genesis block on instantiation of the class.

The `create_blockchain()` method will take two default arguments which are `proof` with a value of one(1), and the `previous_hash` with a value of zero(0). This aspect of the code shows the importance of having a foundational background on how blockchain works.

In a blockchain, there is always a first block called the *Genesis block*, and this block does not have any `previous_hash` to understand why then read my previous article [here](https://www.section.io/engineering-education/an-introduction-to-blockchain-architecture/#what-is-blockchain). Now, our `__init__` method should look like this:

```python
class Blockchain:
   def __init__(self):
       self.chain = []
       self.create_blockchain(proof=1, previous_hash='0')
```

#### The Create Blokchain Function
Next, we define a `create_blockchain` method that extends the genesis block, but the only difference here is that we will pass in three parameters which are:
- self
- proof
- previous_hash

All parameters are without a default value.

Within the block of this function, we create a block variable of type `dictionary` that will be used to define each block in a blockchain. The dictionary will take the following key-value pairs:
- Index: An index key will take a value of the length of the blockchain itself, which is represented by the chain variable in the `__init__` method with an added value of one(1), because we will use this to access each block in the chain.
- Timestamp: The timestamp key will take a value of the current Date and Time the block was created, and/or mined.
- Proof: The proof key will receive a value of proof that will be passed to the function when called. Note that this proof here refers to the proof of work, and we will get into this shortly.
- Previous hash: Lastly, the previous hash key takes a value of `previous_hash` from the function which is equivalent to the hash of the previous block.

By adding these key-value pairs, we then append this *block* to the *chain* and return the block itself. Your `create_blockchain()` function should be similar to mine below:
```python
def create_blockchain(self, proof, previous_hash):
   block = {
       'index': len(self.chain) + 1,
       'timestamp': str(datetime.datetime.now()),
       'proof': proof,
       'previous_hash': previous_hash
   }

   self.chain.append(block)
   return block
```

#### Get The Previous Block Function
This process is easy. All we have to do is create a method that gets the previous block in the chain.

We create a new variable and name it `last_block` and pass in a value of the last block in the list of the `chain` variable, then we return the `last_block`.

Your code for this step should look like this:
```python
def get_previous_block(self):
   last_block = self.chain[-1]
   return last_block
```

#### The Proof of Work Function
Recall that in the `create_blockchain()` function, we had a variable called proof. This variable represents the proof of work done to mine a block. As the programmer of the blockchain, we need to create an algorithm that the miners will solve to mine a block successfully.

If you have no prior knowledge of the process required to mining a block, then read through my previous [article](https://www.section.io/engineering-education/an-introduction-to-blockchain-architecture/#mining-and-proof-of-work).

We start by creating a new method called `proof_of_work()` and then we pass two parameters which are:
- self
- previous_proof.

In the body of our method, we create a variable to store the proof submitted by the miners, call it `new_proof` and set the value to one(1).

Next, we create a control statement to check the status of the proof of work, which by default will be False, hence, we create a new variable called `check_proof` and assign it a False value. At this stage, your code for this function should look like this:
```python
def proof_of_work(self, previous_proof):
   # miners proof submitted
   new_proof = 1
   # status of proof of work
   check_proof = False
```
Next, we proceed to the algorithm that needs to be solved by the miner. We encapsulate the algorithm in a while statement because we want this part of solving the problem to repeat until the proof is found.

We start by creating a while statement with a condition of `check_proof` is False, so, if our code hasn’t checked the proof of work, it has to run through the body of the while loop.

Next, in the body of the while loop, we define the problem/algorithm to be solved which will be based on the previous proof that was successful and the new proof submitted by the miner. In this aspect of the code, you can define how complex you want this problem to be, but for the first time usage make it simple to test if our code works.

Moving forward, we create a new variable called `hash_operation`, and we assign a value of `hashlib.sha256(str(the algorithm).encode()).hexdigest()`. This is how we encode the problem in a cryptographic hexadecimal digit with the use of the SHA256 hash library. Now, the only part of this code that needs replacing is the algorithm for mining a block.

Below is my algorithm that needs to be solved for mining a block:

```python
new_proof ** 2 - previous_proof ** 2
```
The algorithm takes the new proof submitted by the user and raises it to the power of 2, then subtracts it from the exponent of the previous proof raised to the power of 2.

#### Checking The Miner Solution To The Problem
Next, we check the miner solution to the problem by checking the `hash_operation` first leading 4 characters, for our code, we check if the first 4 characters are equal to zeros.

If the check returns True, then we’ve checked the proof and its valid, then we can assign it a value of true, else, we increment the new_proof by 1 which gives the miner another chance to try again and then we return the new proof.

Your codebase should look this:
```python
def proof_of_work(self, previous_proof):
   # miners proof submitted
   new_proof = 1
   # status of proof of work
   check_proof = False
   while check_proof is False:
       # problem and algorithm based off the previous proof and new proof
       hash_operation = hashlib.sha256(str(new_proof ** 2 - previous_proof ** 2).encode()).hexdigest()
       # check miners solution to problem, by using miners proof in cryptographic encryption
       # if miners proof results in 4 leading zero's in the hash operation, then:
       if hash_operation[:4] == '0000':
           check_proof = True
       else:
           # if miners solution is wrong, give mine another chance until correct
           new_proof += 1
   return new_proof

```
#### Why Four Leading Zeros For Hash Operation?
Now, why four(4) leading zeros? why not five(5) or six()6 or more, well the more leading zeros we require the more difficult it will be to mine a block, so, for the sake of the tutorial we have it at 4 to ensure we can mine a block faster.

Also, the `hash_operation` algorithm we pass in must be non-symmetrical such that if the order of operation were to be reversed it wouldn’t result in the same value, e.g. a + b is equal to b+a, but a-b is not equal to b-a.

Lastly, in our algorithm, we require both the new proof submitted and the previous proof from the existing block to effectively define an algorithm for miners to solve, that way the process is continuous and also linked to the existing blocks.

This step is quite confusing but, if you read through the code and my comments, you will find it easy to grasp. Let’s proceed to the next step.

#### Generating a Hash
In this step, we generate a hash for the entire block itself, so we create a `hash()` method that takes two parameters which are:
- self
- block.

In the body of this function, we use JSON dumps to encode the block, and we return a cryptographic hash of the entire block.

Your code should look like this:
```python
# generate a hash of an entire block
def hash(self, block):
   encoded_block = json.dumps(block, sort_keys=True).encode()
   return hashlib.sha256(encoded_block).hexdigest()
```

#### Checking The Validity of The Blockchain
In this step, we create a function that checks if the entire blockchain is valid. This step is crucial in maintaining the integrity of our blockchain to ensure that none of our block is corrupt because if the data in a block changes, the hash changes and the link between each block in the chain is broken. This process is well explained in my previous [article](https://www.section.io/engineering-education/an-introduction-to-blockchain-architecture/#mining-and-proof-of-work).

Without further ado, let’s get to it. We start by creating a `is_chain_valid` method that takes two parameters which are:
- self
- chain

We start by getting the first block in the chain, which serves as the previous block to the current block:
```python
previous_block = chain[0]
```
Next, we set an index value of 1 for the blocks in the chain for the sole purpose of iteration:

```python
block_index =1
```
Here comes the complex part of this process.

We start by creating a while loop that takes a conditional statement of True if the `block_index` is equal to the length of the chain and False if the `block_index` is less than the length of the chain.

Inside our while loop, we get the current block from the chain:
```python
while block_index < len(chain):
block = chain[block_index]
```

Next, we check if the current block previous hash field does not have the same value as the hash field of the previous block. If it doesn’t it returns False, and if it does, then it returns True:

```python
if block["previous_hash"] != self.hash(previous_block):
   return False
```
Next, we get the proof from the previous block, and we also get the proof from the current block, since both values are required for our hash operation in our algorithm:

```python
previous_proof = previous_block['proof']
current_proof = block['proof']
```
We proceed further by running the proof data through the algorithm, then we check if the first four leading characters are not equal to four zeros.

If the hash operation is invalid, then we return False, else, if valid, we set the `previous_block` value to the current block that just completed its check, and we increment the block index by 1, then return True as a positive validation check.

Your complete code should look like this:

```python
# check if the blockchain is valid
def is_chain_valid(self, chain):
   # get the first block in the chain and it serves as the previous block
   previous_block = chain[0]
   # an index of the blocks in the chain for iteration
   block_index = 1
   while block_index < len(chain):
       # get the current block
       block = chain[block_index]
       # check if the current block link to previous block has is the same as the hash of the previous block
       if block["previous_hash"] != self.hash(previous_block):
           return False

       # get the previous proof from the previous block
       previous_proof = previous_block['proof']

       # get the current proof from the current block
       current_proof = block['proof']

       # run the proof data through the algorithm
       hash_operation = hashlib.sha256(str(current_proof ** 2 - previous_proof ** 2).encode()).hexdigest()
       # check if hash operation is invalid
       if hash_operation[:4] != '0000':
           return False
       # set the previous block to the current block after running validation on current block
       previous_block = block
       block_index += 1
   return True

```
By following the above steps, we’ve built our Blockchain. However, we need to interact with it to mine our block and display some details using Flask and postman.

### Mining Our Blockchain
To mine our block, we create a web application entry point with Flask as follows:

```python
app = Flask(__name__)
```

Next, we create an instance of the Blockchain class
```python
blockchain = Blockchain()
```
Now, we can proceed to mine a block.

#### Mining A New Block
We start by creating a Flask route of `mine_block` with a `GET` method, then we define the view

```python
@app.route('/mine_block', methods=['GET'])
def mine_block():

```

Inside the `mine_block()` view, we fetch the data we need to create a block, and this includes the following:
- The previous block
- The previous block proof
- The proof of work
- The previous hash

The following data points have their methods defined in the Blockchain class all we need to do is plug and play as below:

```python
# get the data we need to create a block
previous_block = blockchain.get_previous_block()
previous_proof = previous_block['proof']
proof = blockchain.proof_of_work(previous_proof)
previous_hash = blockchain.hash(previous_block)

```
Next, we create the block and store it in the block variable:

```python
block = blockchain.create_blockchain(proof, previous_hash)

```
Then, we return a `jsonify` response that contains a message, the block index, the block timestamp, the block proof and the previous hash.
```python
response = {'message': 'Block mined!',
           'index': block['index'],
           'timestamp': block['timestamp'],
           'proof': block['proof'],
           'previous_hash': block['previous_hash']}
return jsonify(response), 200
```
Now, we have all the code to mine a block. Let’s go a step further to write the feature for getting all the blocks in the chain.

#### Fetching The Chain
We start by creating a new `get_chain` route with a GET method, then we return a response that contains the length of the blockchain and the blockchain within the chain.
```python
@app.route('/get_chain', methods=['GET'])
def get_chain():
   response = {'chain': blockchain.chain,
               'length': len(blockchain.chain)}
   return jsonify(response), 200
```

#### Setting The Application Port
Lastly, we need to run our app, so we add this line of code beneath our existing code.

```python
app.run(host='0.0.0.0', port=5000)
```

At this stage, you should have a complete blockchain code, and all your code should look similar to this below:

```python
import datetime
import json
import hashlib
from flask import Flask, jsonify


class Blockchain:
   def __init__(self):
       self.chain = []
       self.create_blockchain(proof=1, previous_hash='0')

   def create_blockchain(self, proof, previous_hash):
       block = {
           'index': len(self.chain) + 1,
           'timestamp': str(datetime.datetime.now()),
           'proof': proof,
           'previous_hash': previous_hash
       }

       self.chain.append(block)
       return block

   def get_previous_block(self):
       last_block = self.chain[-1]
       return last_block

   def proof_of_work(self, previous_proof):
       # miners proof submitted
       new_proof = 1
       # status of proof of work
       check_proof = False
       while check_proof is False:
           # problem and algorithm based off the previous proof and new proof
           hash_operation = hashlib.sha256(str(new_proof ** 2 - previous_proof ** 2).encode()).hexdigest()
           # check miners solution to problem, by using miners proof in cryptographic encryption
           # if miners proof results in 4 leading zero's in the hash operation, then:
           if hash_operation[:4] == '0000':
               check_proof = True
           else:
               # if miners solution is wrong, give mine another chance until correct
               new_proof += 1
       return new_proof

   # generate a hash of an entire block
   def hash(self, block):
       encoded_block = json.dumps(block, sort_keys=True).encode()
       return hashlib.sha256(encoded_block).hexdigest()

   # check if the blockchain is valid
   def is_chain_valid(self, chain):
       # get the first block in the chain and it serves as the previous block
       previous_block = chain[0]
       # an index of the blocks in the chain for iteration
       block_index = 1
       while block_index < len(chain):
           # get the current block
           block = chain[block_index]
           # check if the current block link to previous block has is the same as the hash of the previous block
           if block["previous_hash"] != self.hash(previous_block):
               return False

           # get the previous proof from the previous block
           previous_proof = previous_block['proof']

           # get the current proof from the current block
           current_proof = block['proof']

           # run the proof data through the algorithm
           hash_operation = hashlib.sha256(str(current_proof ** 2 - previous_proof ** 2).encode()).hexdigest()
           # check if hash operation is invalid
           if hash_operation[:4] != '0000':
               return False
           # set the previous block to the current block after running validation on current block
           previous_block = block
           block_index += 1
       return True


app = Flask(__name__)

blockchain = Blockchain()


@app.route('/mine_block', methods=['GET'])
def mine_block():
   # get the data we need to create a block
   previous_block = blockchain.get_previous_block()
   previous_proof = previous_block['proof']
   proof = blockchain.proof_of_work(previous_proof)
   previous_hash = blockchain.hash(previous_block)

   block = blockchain.create_blockchain(proof, previous_hash)
   response = {'message': 'Block mined!',
               'index': block['index'],
               'timestamp': block['timestamp'],
               'proof': block['proof'],
               'previous_hash': block['previous_hash']}
   return jsonify(response), 200


@app.route('/get_chain', methods=['GET'])
def get_chain():
   response = {'chain': blockchain.chain,
               'length': len(blockchain.chain)}
   return jsonify(response), 200



app.run(host='0.0.0.0', port=5000)

```
Next, we proceed to run our app.

### Running The Application
There are two ways to test-run our blockchain code. The first way is to use the Postman desktop app, while the other method is via the web browser.

#### Running Via The Web Browser
Let’s run our app through the web browser. When we run the application on Pycharm, we get a local address to run our app from the terminal:

![Terminal Image](/engineering-education/create-a-blockchain-in-python/block_terminal.png)


From my terminal, the URL address is 172.20.10.2:5000. Now, in our browser, we start by mining a block, and we do this by calling the `mine_block` route function we created:


![Mine Block Image](/engineering-education/create-a-blockchain-in-python/mine_block.png)


To call the `mine_block` function, we add the function name after the forward-slash, and it runs the code instruction under the block.

From the result, we can see the index of the block, a message showing that the block is mined, the previous hash of the block before the current block, the proof of work, and the timestamp.

Every time we refresh the page, it mines a new block. Now, let’s get the chain data by replacing `mine_block` with `get_chain` by doing this, you should have something similar to this below:


![Blockchain Image](/engineering-education/create-a-blockchain-in-python/get_chain.png)


 The above function call displays the blocks in the chain and their index as intended. Now, let’s repeat this process on the Postman desktop application.

#### Running Via Postman Desktop Application
To mine a block, we copy the `mine_block` URL, and paste it in the request URL bar, and make sure the request type is `GET`, then we send the request.

The image below has a number label for the step process as outlined above, and the result is as follows:


![Postman Mine Block Image](/engineering-education/create-a-blockchain-in-python/postman_mine.png)


Next, let’s get the chain data:

![Postman BlockChain Image](/engineering-education/create-a-blockchain-in-python/postman_chain.png)


### Conclusion
In this article, you’ve successfully built your first blockchain. You can mine a block and view the list of blocks in the chain. In future tutorials, we will lay on this foundation here to integrate cryptocurrency transactions.

The codebase for this article can be found [here](https://github.com/corpsgeek/blockchain/tree/main), and for practice purposes, your task is to build a new function to check if the blockchain is valid and return a response to the request.

If you have any questions or require the solution to the new function task, drop a comment below.


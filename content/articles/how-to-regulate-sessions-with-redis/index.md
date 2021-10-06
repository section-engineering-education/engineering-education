### How to Regulate Sessions with Redis

**Redis** is an Open source in-memory data structure store that can be used as a database and/or a cache and message broker. It is an in-memory database which makes it fast. Redis is used for short-lived data in our applications, it's often used with things like sessions or web page headcounts.

 In-memory means you don't need to have large data sets. You have small pieces of data, so tiny little pieces of data that allow us to keep it in memory that is the machine's memory and not disk.

 Redis is an open-source database that is often used to build high-performance scalable web applications. Redis is a key-value store and this key relationship is a little bit similar to how we handle objects in javascript. Several languages and frameworks works with Redis, they include Python, backend javascript frameworks like Node.js. In this tutorial we will be doing our session regulation using Redis with Node.js.   


### Prerequisites
To understand this lesson you should be familiar with the following.
* JavaScript.
* Creating servers using Nodejs and their dependencies.
* Database.

### Goal

At the end of this tutorial you should be able to:

* Understand What Redis Is
* Fundamentals of Redis
* Advantages of Redis
* Install Redis
* Redis-CLI
* Data Types - Strings, Lists, Sets, Sorted Sets, Hashes
* Regulate Sessions with Redis (Nodejs)

### Advantage of Redis
It's really fast cause it's an in-memory database and you do not need large data sets.
* It's very flexible in terms of storing data.
* No schemas & column names are required.
* Redis support rich data types such as List and Set.
* It's also used for both a Caching system and a database that can persist data to the disk.
### Getting Started with Redis
Now let install Redis onto our laptops or computers to use it and test some commands. Now keep in mind when it comes to databases most of the time you won't be running from your computer. In most cases, it's going to be on a server or another machine that is just dedicated to that database.
### Redis installation
Open your terminal and run the commands (On mac make sure you have brew installed)
1. `wget https://download.redis.io/releases/redis-6.2.6.tar.gz` (Note: So these first command is to get Redis installed on your computer)

2. `tar xzf redis-6.2.6.tar.gz` (Note: We have to open it up with the tar command)
3. `cd redis-6.2.6` (Note: This is the current version)
4. `make` (Note: The final command is to execute something called the Makefile)
5. `src/redis-server` (Note: This is to run the server)
6. `src/redis-cli` (Note: open another window for your terminal. With this we are going to run the CLI {With this we can run some Redis command in the next section})

#### Go ahead and install Redis onto your computer so you can follow along with the lesson.
Visit https://redis.io/topics/quickstart to get you instructions on installing Redis.
### For Window Users 
Visit: https://github.com/dmajkic/redis/download`

#### In case you encounter any errors while installing.
Click any of the links below. 

https://stackoverflow.com/questions/37103054/redis-installation-fails-when-running-make-command

https://stackoverflow.com/questions/8131008/issue-with-redis-install

### Redis CLI

Redis-CLI is the Redis command-line interface, It's a program that allows sending commands to Redis, and read the replies sent by the server, using the terminal. Redis-CLI has basic line editing capabilities to provide a good typing experience. These are few Redis-CLI commands. 


* SET & GET:- SET value of a key. 
#### Example
```bash
 SET name "John Snow"
 ok

 GET name
 "100"
 
```
* GET :- Get the value of key. nil will be returend if the key dose not eixt.
#### Example
```bash
 redis 127.0.0.1:6379> GET nonexisting
(nil)
redis 127.0.0.1:6379> SET key "secret"
"OK"
redis 127.0.0.1:6379> GET mykey
"secret"
redis 127.0.0.1:6379>
 
```
* ECHO :- Echo the given string
#### Example
```bash
redis 127.0.0.1:6379> ECHO "Welcome to redis"
redis 127.0.0.1:6379> "Welcome to redis"
redis 127.0.0.1:6379> 
```
* PING:- This test is to see if there is a connection alive and it's going to respond with PONG. It lets us know there's a connection with Redis.
#### Example
```bash
redis 127.0.0.1:6379> PING 
PONG 
 
```
* QUIT:- To close connection

#### [Click for more Redis-CLIi commands](https://redis.io/commands)
 
### Data Types - Hashes, Lists, Strings, Sets, Sorted Sets 
* ### Hashes
 Hashes are maps between string fields and string values. The best way to think about them is simply like objects in javascript.
#### Example
```bash
redis> HMSET user id 45 name "John"
redis> 
 
```
Above I have just created a hash with a key user and this key has both id of 45 and the name John. 

* ### List 
List is implemented using something called linked lists rather than arrays. Lists are useful if you have really long lists and you need to add elements quickly to that lists. We can add to a list by using LPUSH or RPUSH. LPUSH inserts all the specified values at the begging of the list stored at the key. RPUSH will push it to the end.
#### Example
```bash
redis 127.0.0.1:6379> LPUSH people "John"
(integer) 1
redis 127.0.0.1:6379> LPUSH people "Zanza"
(integer) 2
redis 127.0.0.1:6379>> LPUSH people "Walker"
(integer) 3
redis 127.0.0.1:6379> LRANGE people 0 3 
1) "Walker"
2) "Zanza"
3) "John"
```
The LRANGE command is used to output the list. 

* ### Strings
Strings in Redis are binary safe, meaning they have a known length not determined by any special terminating characters.
#### Example

```bash
redis 127.0.0.1:6379> SET name "Peter"
OK
redis 127.0.0.1:6379>> GET name
 "Peter"
```
The above example, SET and GET are REDIS-CLI name is the key used in Redis and Peter is the string value that is stored in Redis.

* ### Sets
Redis Sets are an unordered collection of strings. With sets it's possible to  remove, add, and test for the existence of members in a group. With sets with don't have any duplicates inour items.
#### Example
```bash
redis 127.0.0.1:6379> SADD countries "England" 
(integer) 1 
redis 127.0.0.1:6379> SADD countries "Poland"
(integer) 1 
redis 127.0.0.1:6379> SADD countries "Egypt" 
(integer) 1 
redis 127.0.0.1:6379> SADD countries "Egypt" 
(integer) 0 
redis 127.0.0.1:6379> SMEMBER countries  

1) "Egypt" 
2) "Poland" 
3) "England"
```
SADD adds the specified members to the set stored key.
SMEMBER returns all the members of the set value stored at key.

* ### Sorted Sets
Redis sorted sets just like sets do the no repeating collection of stings that we've already already demostrated but the difference is that every member of a sorted sets is associated with a score and this score allows it to be ordered from smmalest to greatest.
#### Example
```bash
redis 127.0.0.1:6379> ZADD names 0 Paul 
(integer) 1 
redis 127.0.0.1:6379> ZADD names 0 Greenwood 
(integer) 1 
redis 127.0.0.1:6379> ZADD names 0 Angel 
(integer) 1 
redis 127.0.0.1:6379> ZADD names 0 Angel 
(integer) 0 
redis 127.0.0.1:6379> ZRANGEBYSCORE names 0 1000  

1) "Paul" 
2) "Greenwood" 
3) "Angel"
```

There are plenty of other commands that you can learn with Redis and they are really easy to follow just with your documentation. Visit https://redis.io/topics/data-types-intro

### Redis Caching (Node.js )

Here we are going to make a request to a GitHub API to get the number of repos for users, and we are going to store that number in our Redis cache. So Redis is basically key-value peers, it allows us to make fewer requests so it will cache the data so we don't have to keep making requests and it will speed up our application. Here we are not going to build a real application am just going to show you how to implement it, but you are going to see the benefit of it and you are going to learn the foundation to use it in your node.js application.

#### Open any code editor of your choice and run npm init-y in the terminal to create a quick package.json
```bash
npm init-y

```
We are going to install a couple of dependencies
we are going to be making our request with the GitHub API using node-fet
also, install nodemon
```bash
npm i express node-fetch redis

```
npm i -D nodemon

```bash
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

// enviroment variables 
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`;
}

// Make request to Github for data
async function getRepos(req, res, next) {
  try {
    console.log('Fetching Data...');

    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    // Set data to Redis
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// Cache middleware
function cache(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
}

app.get('/repos/:username', cache, getRepos);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});
```

### Conclusion
In conclusion, we learned What Redis is, the fundamentals of Redis, Redis Caching in Node.js, the advantages of Redis, how to install Redis, Redis data Types,  and Redis-CLI.

You can find the entire code [here](https://github.com/abimbolataofeek/Regulate-Sessions-with-Redis-Nodejs-)

### Further reading
The Resdis Documentation `https://redis.io/`
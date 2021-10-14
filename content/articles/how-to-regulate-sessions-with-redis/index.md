### How to Regulate Sessions with Redis

**Redis** is an Open source in-memory data structure store that can be used as a database and/or a cache and message broker. It is an in-memory database which makes it fast. Redis is used for short-lived data in our applications, it's often used with things like sessions or web page headcounts.

 In-memory means you don't need to have large data sets. You have small pieces of data, so tiny little pieces of data that allow us to keep it in memory that is the machine's memory and not disk.

 Redis is an open-source database that is often used to build high-performance scalable web applications. Redis is a key-value store and this key relationship is a little bit similar to how we handle objects in javascript. Several languages and frameworks work with Redis, they include Python, backend javascript frameworks like Node.js. In this tutorial, we will be doing our session regulation using Redis with Node.js.   


### Prerequisites
To understand this lesson you should be familiar with the following.
- JavaScript.
- Creating servers using Nodejs and their dependencies.
- Database.

### Goal

At the end of this tutorial you should be able to:

- Understand What Redis Is
- Fundamentals of Redis
- Advantages of Redis
- Install Redis
- Redis-CLI
- Data Types - Strings, Lists, Sets, Sorted Sets, Hashes
- Regulate Sessions with Redis (Nodejs)

### Advantage of Redis
It's really fast cause it's an in-memory database and you do not need large data sets.
- It's very flexible in terms of storing data.
- No schemas & column names are required.
- Redis supports rich data types such as List and Set.
- It's also used for both a Caching system and a database that can persist data to the disk.

### When to use Redis Caching
Use Redis to cache data that is not frequently changing.

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

Redis-CLI is the command-line interface for Redis, It authorizes forwarding commands to Redis, also reads the replies sent by the server, using the terminal. These are few Redis-CLI commands. 

- SET & GET:- SET value of a key. 
#### Example 
```bash
 SET name "John Snow"
 ok

 GET name
 "100"
 
```
- GET :- Get the value of key. nil will be returend if the key dose not eixt.
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
- ECHO :- Echo the given string
#### Example
```bash
redis 127.0.0.1:6379> ECHO "Welcome to redis"
redis 127.0.0.1:6379> "Welcome to redis"
redis 127.0.0.1:6379> 
```
- PING:- This test is to see if there is a connection alive and it's going to respond with PONG. It lets us know there's a connection with Redis.
#### Example
```bash
redis 127.0.0.1:6379> PING 
PONG 
 
```
- QUIT:- To close connection

#### [Click for more Redis-CLIi commands](https://redis.io/commands)
 
### Data Types - Hashes, Lists, Strings, Sets, Sorted Sets 
- ### Hashes

 Hashes are a collection of filed valued pairs. The best way to think about them is simply like objects in javascript.
#### Example
```bash
redis> HMSET user id 45 name "John"
redis> 
 
```
Above I have just created a hash with a key user and this key has both id of 45 and the name John. 

- ### List 
List is implemented using something called linked lists rather than arrays. Lists are useful if you have really long lists and you need to add elements quickly to that lists. We can add to a list by using LPUSH or RPUSH. LPUSH means left push, which means from the left of where the head of the list is. RPUSH will push it to the end.
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

- ### Strings
Strings in Redis are binary-safe sequencing of bits, and they are just like any other string we use in our favorite programing language.
#### Example

```bash
redis 127.0.0.1:6379> SET name "Peter"
OK
redis 127.0.0.1:6379>> GET name
 "Peter"
```
The example above of SET and GET are Redis command, the name is the key used in Redis while Peter is the value stored in Redis.

- ### Sets
Redis Sets collection of strings that are not chracterized. With sets it's possible to  remove, add, and test for the existence of members in a group. With sets with don't have any duplicates in our items.
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

- ### Sorted Sets

Redis sorted sets just like sets do the no repeating collection of strings that we've already demostrated but the difference is that every member of a sorted sets is associated with a score and this score allows it to be ordered from smallest to greatest.
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

So like I mentioned Redis is a caching management system. So  Redis is used to cache the data. If there is a small amount of data we have to fetch every time from the server it takes too much time. So if the data is not dynamic if it is not changing every time we can install the data, cache the data, and return the data when requested. 
So  I  am going to set up the server and am going to make a request to the  API then we store the data we get from the server to the local application system in Redis and we will fetch data from Redis.

#### Open any code editor of your choice and run npm init-y in the terminal to create a quick package.json
```bash
npm init-y
```
### Packages to install
```bash
npm install express redis
```
```bash
npm install --save cross-fetch
```

```bash
npm install _D nodemon
```
### API
I will be making a request with this  API [http://universities.hipolabs.com/search?country=] and it will generate all the list of the universities in the country. The API can be used for any country.

```bash
const express = require('express');
const redis = require('redis');
const fetch = require('cross-fetch');

// environment variables
const app = express();
const client = redis.createClient(6379);

function forwardData(country, website) {
    return `${country} =>> ${website}`;
}

//middleware to check if the country exist in redis database
function checkForCache(req, res, next) {
    const { country } = req.params;
    client.get(country, (err, website) => {
        if (err) throw err;
        if (website != null) res.send(forwardData(country, website));
        else next();
    })
}

// Dynamics url Path
app.get('/:country', checkForCache, async (req, res) => {
    try {
        const { country } = req.params;
        const resp = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
        const data = await resp.json();
        const website = data[0].web_pages[0];
        client.setex(country, 3600, website[0]);
        res.send(forwardData(country, website));
    } catch (err) {
        console.log("Error:", err);
    }

})

```
### Result
 <img src="redis screenshot1 (1).jpg" alt="alt text" height="500" width="600"/>

 Above is the result of all the universities in Mexico using the API after inputting the country at the top. And at the bottom of the image, we can see it took 8.71s just to do that which is quite slow. So to reduce the time, I will be installing this data into our Redis server so when the user makes a request it will check if the data already exists.
In our Redis server if it already exists on our Redis database then it will fetch data from there. if not then it will make a request on the link. 


<img src="redis screenshot2.jpg" alt="alt text" height="500" width="600"/>

After installing the data into our Redis server and I searched for Mexico again it took just 850ms to load up the same data. We can see how fast it fetch the data which makes our application run faster.

### Conclusion
In conclusion, we learned What Redis is, the fundamentals of Redis, Redis Caching in Node.js, the advantages of Redis, how to install Redis, Redis data Types,  and Redis-CLI. Redis improve the response time of our application which make it super fast. 

You can find the entire code [here](https://github.com/abimbolataofeek/redis-cachiing-tutorial)

### Further reading
The Resdis Documentation `https://redis.io/`
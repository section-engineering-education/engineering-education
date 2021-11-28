---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-redis/
title: Getting Started With Redis
description: Redis is an open-source database that is often used to build high-performance scalable web applications. It uses an in-memory database which makes it faster than any other database.
author: abimbola-taofeek
date: 2021-10-28T00:00:00-11:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-redis/hero.png
    alt: Getting Started With Redis image
---
Redis is an open-source database that is often used to build high-performance scalable web applications. It uses an in-memory database which makes it faster than any other database.
<!--more-->
Redis is used for short-lived data in our applications. It is often used in sessions or web page headcounts.

By using an in-memory database, we don't need to have large data sets, instead, we use small pieces of data that allow us to store the data in the machine's memory, and not disk's memory.

Redis is a key-value store that is similar to how we handle objects in JavaScript. Several languages and frameworks use Redis; including Python, and backend JavaScript frameworks such as Node.js.

In this tutorial, we will be regulating sessions using Redis with Node.js.

### Prerequisites
To understand this lesson, you should be familiar with the following:
- JavaScript.
- Creating servers using Node.js and their dependencies.
- Database.

### Goal
At the end of this tutorial, you should be able to:

- Understand What Redis is.
- Understand fundamentals of Redis.
- Understand advantages of Redis.
- Install Redis.
- Install Redis-CLI.
- Understand Data Types - Strings, Lists, Sets, Sorted Sets, Hashes.
- Regulate Sessions with Redis (Nodejs).

### Advantages of Redis
- Redis database is fast since it uses an in-memory database.
- It is very flexible in terms of storing data.
- No schemas & column names are required.
- Redis supports rich data types such as lists and set.
- It is also used for both a caching system and a database that can persist data to the disk.

### When to use Redis caching
Use Redis to cache data that is not frequently changing.

### Getting started with Redis
Now, let install Redis.

In most cases, we would be running our databases on a server or another machine.

### Redis installation
Open your terminal and run the commands below:

```bash
wget https://download.redis.io/releases/redis-6.2.6.tar.gz
```

To get Redis installed on your computer.

```bash
tar xzf redis-6.2.6.tar.gz
```

To open up the downloaded file.

```bash
cd redis-6.2.6
```

To change directory.

```bash
make
```

To execute something called the Makefile.

```bash
src/redis-server
```

This is to run the server.

```bash
src/redis-cli
```

To open another terminal where we run the CLI.

Visit [this link](https://redis.io/topics/quickstart) for more instructions on installing Redis.

For Windows users, use [this](https://github.com/dmajkic/redis/download) link.

Incase you encounter any errors while installing, have a look at these Stackoverflow links:

- [Stackoverflow - Redis installation failing on running make command](https://stackoverflow.com/questions/37103054/redis-installation-fails-when-running-make-command)
- [Stackoverflow - Redis install issue](https://stackoverflow.com/questions/8131008/issue-with-redis-install)

### Redis CLI
Redis-CLI is the command-line interface for Redis. It authorizes forwarding commands to the Redis database and also reads the replies sent from the server, through the terminal.

These are few Redis-CLI commands:

- `SET` - sets the value of a key.

```bash
SET name "John Snow"
ok

GET name
"100"
```

- `GET` - Gets the value of the key. `nil` will be returned if the key does not exist.

```bash
redis 127.0.0.1:6379> GET nonexisting
(nil)
redis 127.0.0.1:6379> SET key "secret"
"OK"
redis 127.0.0.1:6379> GET mykey
"secret"
redis 127.0.0.1:6379>
```

- `ECHO` - Echoes the given string.

```bash
redis 127.0.0.1:6379> ECHO "Welcome to redis"
redis 127.0.0.1:6379> "Welcome to redis"
redis 127.0.0.1:6379>
```

- `PING` - test to see if the connection is alive. It is going to respond with `PONG`.

```bash
redis 127.0.0.1:6379> PING
PONG
```

- `QUIT` - closes the connection.

You can find more Redis-CLI commands [here](https://redis.io/commands)

### Data types
#### Hash
Hashes are a collection of field-value pairs. The best way to think about them is, they are similar to objects in javascript.

```bash
redis> HMSET user id 45 name "John"
redis>
```

Above, I have created a hash with a key user and this key has both an id of `45` and the name `John`.

#### List
Lists are implemented using linked lists, rather than arrays.

Lists are useful if you have really long lists and you need to add elements quickly to that lists. We can add to a list by using `LPUSH` or `RPUSH`. `LPUSH` means left push from the left to the current head. And, `RPUSH` will push it to the end.

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

The `LRANGE` command is used to output the list.

#### String
Strings in Redis are binary-safe sequencing of bits. They are just like any other string that we use in other programming languages.

```bash
redis 127.0.0.1:6379> SET name "Peter"
OK
redis 127.0.0.1:6379>> GET name
"Peter"
```

The example above of `SET` and `GET` are Redis command, the `name` is the key, while `Peter` is the value stored.

#### Set
Redis set is a collection of strings that are not characterized.

With sets, it's possible to remove, add, and test for the existence of duplicate members in a group.

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

`SADD` adds the specified members to the set stored key.

`SMEMBER` returns all the members of the set value stored for a key.

#### Sorted set
Redis sorted sets are just like sets, except that every member of a sorted set is associated with a score that allows it to be ordered from smallest to greatest.

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

There are plenty of other commands that you can learn with Redis.

Visit [this](https://redis.io/topics/data-types-intro) link to view Redis-CLI documentation.

### Redis caching (Node.js)
As we saw earlier, Redis is a caching management system.

If there is a small amount of data that we have to fetch every time from the server, it takes too much time. If the data is not dynamic, then we can cache it, and return the same when requested.

Now, we'll set up a server that requests to the API to store the data to the local application system in Redis. And, we fetch the data from Redis when required.

Open any code editor of your choice and run `npm init -y` in the terminal to create a `package.json`.

```bash
npm init-y
```

Then, install few other packages as shown below:

```bash
npm install express redis
npm install --save cross-fetch
npm install _D nodemon
```

### API
We will be making a request to [this API](http://universities.hipolabs.com/search?country=) that generates a list of all the universities in the country.

```js
const express = require("express");
const redis = require("redis");
const fetch = require("cross-fetch");

// environment variables
const app = express();
const client = redis.createClient(6379);

function forwardData(country, website) {
  return `${country} =>> ${website}`;
}

// middleware to check if the country exist in redis database
function checkForCache(req, res, next) {
  const { country } = req.params;
  client.get(country, (err, website) => {
    if (err) throw err;
    if (website != null) res.send(forwardData(country, website));
    else next();
  });
}

// Dynamics url Path
app.get("/:country", checkForCache, async (req, res) => {
  try {
    const { country } = req.params;
    const resp = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    const data = await resp.json();
    const website = data[0].web_pages[0];
    client.setex(country, 3600, website[0]);
    res.send(forwardData(country, website));
  } catch (err) {
    console.log("Error:", err);
  }
});
```

![Image 1](/engineering-education/getting-started-with-redis/redis-image1.jpg)

As we see, this is the result of all the universities in Mexico. At the bottom of the image, we can see it took `8.71s` to make an API request (which is quite slow).

To reduce the time, we will be storing this data into our Redis server. So, when the user makes a request, it will check if the data already exists.

If it already exists on the database, it will fetch data from there. If not, it will request the link.

![Image 2](/engineering-education/getting-started-with-redis/redis-image2.jpg)

After storing the data into our Redis server and making an API request for Mexico again, it took just `850ms` to load up the same data.

We can see how fast it is to fetch the data from the Redis database. This makes our application run faster.

### Conclusion
In conclusion, we learned What Redis is, the fundamentals of Redis, Redis Caching in Node.js, the advantages of Redis, how to install Redis, Redis data Types, and Redis-CLI.

Redis improves the response time of our application thus making it super fast.

You can find the entire code [here](https://github.com/abimbolataofeek/redis-cachiing-tutorial).

Read more about Redis [here](https://redis.io/).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

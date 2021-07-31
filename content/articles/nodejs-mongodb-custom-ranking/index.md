---
layout: engineering-education
status: publish
published: true
url: /nodejs-mongodb-custom-ranking/
title: How to Perform Custom Ranking for Records from a MongoDB Database in Node.js
description: This article will be an overview on custom ranking of data in MongoDB. We will learn how to create a database, collection, insert, and query the results.
author: terrence-aluda
date: 2021-04-17T00:00:00-17:30
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nodejs-mongodb-custom-ranking/hero.jpg
    alt: Custom ranking image
---
This article will give us a heads-up on how to rank the records from a MongoDB database. We are going to add a bit of sorting functionality to the `sort()` function to give the records positions.
<!--more-->
In the end, we will be able to:
- Install and configure MongoDB driver in a Node.js application using the Node Package Manager.
- Query and sort results from a MongoDb database.
- Use arrays to give custom ranking for records.

### Table of contents
1. [Prerequisite](#prerequisite)
2. [Introduction](#introduction)
3. [What we will be doing](#what-we-will-be-doing)
4. [Getting started](#getting-started)
5. [Creating our database](#creating-our-database)
6. [Creating our collection](#creating-our-collection)
7. [Inserting documents to our table](#inserting-documents-to-our-table)
8. [Querying and giving ranks to our documents](#querying-and-giving-ranks-to-our-documents)
9. [Conclusion](#conclusion)
10. [Further reading](#further-reading)

### Prerequisite
As a prerequisite, the reader must have:
1. A basic understanding of Node.js and MongoDB operations.
2. Node.js and MongoDB installed in your machine.

### Introduction
In our daily life problems, we would at one point need to sort our data to give us more insights on how to go about our operations.

For example in a school setup, we need to analyze the results of students and give them appropriate positions based on their performance. Due to this, we always have to bear in mind that two or more of them will score the same mark or points.

As developers, we have to program the system to give the students the same position and the next student that follows after them an appropriately incremented position.

For instance, for these five students and their points, we would proceed as follows:

| *Student Name* | *Points* | *Position* |
| - | - | - |
| Student 1 | 21 | `POS 1` |
| Student 2 | 38 | `POS 2` |
| Student 3 | 90 | `POS 3` |
| Student 4 | 90 | `POS 4` |
| Student 5 | 58 | `POS 5` |

After sorting:

| *Student Name* | *Points* | *Position* |
| - | - | - |
| Student 3 | 90 | `POS 1` |
| Student 4 | 90 | `POS 1` |
| Student 5 | 58 | `POS 3` |
| Student 2 | 38 | `POS 4` |
| Student 1 | 21 | `POS 5` |

As we can see, the first two students tie in position one (`POS 1`), and the next student starts from position 3 (`POS 3`).

One great way that will help us achieve this is, using the MongoDB `sort()` method. The only issue for us is taking care of the ties and giving them appropriate positions.

In this article, we will look at how to use arrays in Node.js to make us attain that from documents (records) from a MongoDB database.

### What we will be doing
We are going to establish a connection to a MongoDB database, insert some dummy data, and sort them using a custom ranking function.

### Getting started
We first need to install the MongoDB driver which will enables us to connect to the database.

Open your terminal and type this command:

```bash
npm install mongodb
```

### Creating our database
We will create a new database named `ourDB`, where we will store our records (called `documents` in MongoDB).

Create a new file called `database.js` then write the following code:

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ourDB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
```

Execute the code by running the command below in your terminal:

```bash
node database.js
```

To run the code, we use the command `node [FILENAME]`.

### Creating our collection
We then proceed to create a table(`collection` in MongoDB) called our `ourTable`, where our records(`documents`) will be inserted and queried from.

Create a new file called `collection.js`, then type the code that follows:

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ourDB");
  dbo.createCollection("ourTable", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});
```

The above code snippet creates a MongoDB connection, and creates a new collection called `ourTable`.

### Inserting documents to our table
For demonstration, we will insert some dummy data of 10 students into our collection.

Create a file called `insert.js` and then add the following code:

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ourDB");
  var myobj = [
    { name: 'John', mark: '71'},
    { name: 'Doe', mark: '44'},
    { name: 'Lorem', mark: '52'},
    { name: 'Ipsum', mark: '21'},
    { name: 'Tony', mark: '21'},
    { name: 'Stark', mark: '51'},
    { name: 'Steve', mark: '22'},
    { name: 'Mike', mark: '11'},
    { name: 'Holmes', mark: '88'},
    { name: 'Dave', mark: '71'}
  ];
  dbo.collection("ourTable").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
```

### Querying and giving ranks to our documents
This is where the core of this article is.

We will query and sort the students using their marks in descending order. Then, we will populate the total marks to an array, and perform conditional checks to check for ties and give ranks appropriately.

We create a new file called `rank.js`, then add the following code.

```js
// establishing a connection to the database
var MongoClient = require('mongodb').MongoClient;
// connection url
var url = "mongodb://localhost:27017/";
// declaring an array and a variable to be used for the database manipulation
let rankArray = [];
let dbo;

// connecting and calling the loadStudents() function
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("ourDB");
    loadStudents();
    db.close();
});
```

We got two functions `loadStudents()` and `giveRank()`.

The `loadStudents()` function loads the student details from the database and sorts them in descending order using the `sort()` method.

It contains a `for loop` that populates the marks loaded into the `rankArray()`, which we will use later.

The second function `giveRank()` is then called to perform the ranking using the `rankArray` and the `results`.

```js
function loadStudents(){
    // specifying a descending sort
    var mysort = { mark: -1 };
    // querying and loading into a resultSet array
    dbo.collection("ourTable").find().sort(mysort).toArray(function(err, result) {
      // check for any error and throw it
      if (err) throw err;
      // populating the rank array with the marks
      for (let i = 0; i < result.length; i++) {
          rankArray[i] = result[i]['mark'];
      }
      // passing the rank array and the resultset to the giveRank() function
      giveRank(rankArray,result);
    });
}
```

The `giveRank()` function takes two arguments: an array and a resultSet.

```js
// function for giving rank
function giveRank(arrayArg,resultArg){
  // declaring and initilising variables
    let rank = 1;
    prev_rank = rank;
    position = 0;
    // displaying the headers in the console
    console.log('\n-------OUR RESULTS------\n');
    console.log('Name | Mark | Position\n');
    // looping through the rank array
    for (i = 0; i < arrayArg.length ; i ++) {
            /*
            If it is the first index, then automatically the position becomes 1.
            */
            if(i == 0) {
                position = rank;
            console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            if the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`.
            The `prev_rank` is assigned the `rank` value.
            */
            } else if(arrayArg[i] != arrayArg[i-1]) {
            rank ++;
            position = rank;
            prev_rank = rank;
            console.log(resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            Otherwise, if the value contained in `[i]` is equal to `[i-1]`,
            assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.*/
            } else {
                position = prev_rank;
                rank ++;
                console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            }
    }
}
```

It has three variables:
1. `rank` - This controls the count of the loop used to display the appropriately incremented position e.g., `1,1,3` and not `1,1,2`.
> We initialize it to `1`, since we index the positions starting from `1`, not `0`.
2. `prev_rank` - The previous rank is used to display the rank position in case of a tie. It stores the current position `[i]` of a student, such that when the loop increments to the next position`[i+1]`, the current position `[i]` is temporarily stored.
Consequently, the current position is made `[i-1]` and the next one made `[i]`.
`[i]` is only assigned the previous rank and given to the next array index, if the value found at `[i]` is the same as `[i-1]`. It is assigned `1` for the first position.
3. `position` - This stores the rank to be displayed. We initialize it to `0` in which the initialized value doesn't matter since the position is assigned inside the `for loop`. You can initialize it to any digit.

The `for loop` contains an `if-else-if` structure for checking the values and assigning them appropriately.

If it is the first index, then the position automatically becomes `1`.

If the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`. The `prev_rank` is assigned the `rank` value again just as we discussed above.

Otherwise, if the value contained in `[i]` is equal to `[i-1]`, assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.

![Screenshot](/engineering-education/nodejs-mongodb-custom-ranking/screen.png)

*Screenshot of the output*

### Conclusion
We have gone over how to create a database, a collection, how to insert data into it, and query the results. Furthermore, we also looked at how to perform the ranking of records using an array in MongoDB.

Hope you got some useful insights.

Happy coding.

### Further reading
- [MongoDB npm](https://www.npmjs.com/package/mongodb)
- [W3Schools](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

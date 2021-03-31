### How to perform custom ranking for records from a MongoDB database in Node.js

![Hero image](/engineering-education/mongodb-nodejs-custom-ranking/hero.jpg)

#### Table of contents

1. <a href="#intro">Introduction</a>
2. <a href="#link2">Prerequisites</a>
3. <a href="#link3">What we will be doing</a>
4. <a href="#link4">Getting Started</a>
5. <a href="#link5">Creating our database</a>
6. <a href="#link6">Creating our collection</a>
7. <a href="#link7">Inserting documents to our table</a>
8. <a href="#link8">Querying and giving ranks to our documents</a>
9. <a href="#link9">Conclusion</a>
10. <a href="#link10">Further reading</a>

<a id="intro"></a>

#### Introduction

In our daily life problems, we would at one point need to sort our data to give us more insights on how to go about our operations. For example in a school setup, we need to analyze the results of students and give them appropriate positions based on their performance. Due to this, we always have to bear in mind that two or more of them will score the same mark or points. As developers, we have to program the system to give the students the same position and the next student that follows after them an appropriately incremented position. For instance, for these five students and their points, we would proceed as follows:

- Student 1: 21pts - **POS 1**
- Student 2: 38pts - **POS 2**
- Student 3: 90pts - **POS 3**
- Student 4: 90pts - **POS 4**
- Student 5: 58pts - **POS 5**

After sorting:

- Student 3: 90pts - **POS 1**
- Student 4: 90pts - **POS 1**
- Student 5: 58pts - **POS 3**
- Student 2: 38pts - **POS 4**
- Student 1: 21pts - **POS 5**

As we can see, the first two students tie in position one (`POS 1`) and the next student starts from position 3 (`POS 3`).

One great way that will help us achieve this is using the MongoDB `sort()` method. The only issue for us is taking care of the ties and giving them appropriate positions. In this article, we will look at how to use arrays in Node.js to make us attain that from documents(records) from a MongoDB database.

<a id="link2"></a>

#### What we will be doing

We are going to establish a connection to a MongoDB database, insert some dummy data which we will thereafter query, and sort them using a custom ranking function.

<a id="link3"></a>

#### Prerequisites

1. A basic understanding of Node.js and MongoDB operations.
2. Node.js and MongoDB installed in your machine.

<a id="link4"></a>

#### Getting Started

We first need to install the MongoDB driver which will enable us to connect to the database. Open your terminal and type this command :

```bash
npm install mongodb
```

<a id="link5"></a>

#### Creating our database

We will create a new database named **ourDB** where we will store our records (called `documents` in MongoDB).
Create a new file called *database.js* then write the following code.

```javascript
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

The same will be done for the other files `node filename`.

<a id="link6"></a>

#### *Creating our collection*

We then proceed to create a table(`collection` in MongoDB) called our **ourTable** where our records(`documents`) will be inserted and queried from.
Create a new file called *collection.js* then type the code that follows:

```javascript
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

<a id="link7"></a>

#### Inserting documents to our table

We will insert some dummy data of 10 students into our collection for demonstrating the topic of the article.
Create a file called *insert.js* and then add the following code.

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ourDB");
  var myobj = [
    { name: 'John', mark: '71'},
    { name: 'Peter', mark: '44'},
    { name: 'Amy', mark: '52'},
    { name: 'Hannah', mark: '21'},
    { name: 'Michael', mark: '21'},
    { name: 'Sandy', mark: '51'},
    { name: 'Betty', mark: '22'},
    { name: 'Richard', mark: '11'},
    { name: 'Susan', mark: '88'},
    { name: 'Viola', mark: '71'}
  ];
  dbo.collection("ourTable").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
```

<a id="link8"></a>

#### Querying and giving ranks to our documents

This is where the core of this article is. We will query and sort the students using their marks in descending order. We will then populate the total marks to an array then perform conditional checks to check for ties and give ranks appropriately.

We create a new file called *rank.js* then add the following code.

```javascript
//Establishing a connection to the database
var MongoClient = require('mongodb').MongoClient;
//The connection url
var url = "mongodb://localhost:27017/";
//declaring an array and a variable to be used for the database manipulation
let rankArray = [];
let dbo;

//Connecting and calling the loadStudents() function
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("ourDB");
    loadStudents();
    db.close();
});    

//The function for querying documents
function loadStudents(){
  //Specifyig a descending sort
        var mysort = { mark: -1 };
        //querying and loading into a resultSet array
        dbo.collection("ourTable").find().sort(mysort).toArray(function(err, result) {
          //Check for any error and throw it
          if (err) throw err;
          //populating the rank array with the marks
          for (let i = 0; i < result.length; i++) {
              rankArray[i] = result[i]['mark'];
          }
          //passing the rank array and the resultset to the giveRank() function
          giveRank(rankArray,result);
        });
}

//The function for giving rank
function giveRank(arrayArg,resultArg){
  //Declaring and initilising variables
    let rank=1;
    prev_rank=rank;
    position=0;
    //Displaying the headers in the console
    console.log('\n-------OUR RESULTS------\n');
    console.log('Name | Mark | Position\n');
    //looping through the rank array
    for (i=0; i < arrayArg.length ; i++) {
            /*
            If it is the first index, then automatically the position becomes 1.
            */
            if(i==0){
                position=rank;
            console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            If the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`. The `prev_rank` is assigned the `rank` value
            */
            }else if(arrayArg[i]!=arrayArg[i-1]){
            rank++;
            position=rank;
            prev_rank=rank;
            console.log(resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            Otherwise, if the value contained in `[i]` is equal to `[i-1]`, assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.*/
            }else{
                position=prev_rank;
                rank++;
                console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            }
    }
}
```

We got two functions `loadStudents()` and `giveRank()`.

The `loadStudents()` function loads the student details from the database and sorts them in descending order using the `sort()` method.
It contains a `for loop` which populates the marks loaded into the `rankArray()` which we will use later. The second function `giveRank()` is then called to perform the ranking using the `rankArray` and the `results`.

```javascript
function loadStudents(){
  //Specifyig a descending sort
        var mysort = { mark: -1 };
        //querying and loading into a resultSet array
        dbo.collection("ourTable").find().sort(mysort).toArray(function(err, result) {
          //Check for any error and throw it
          if (err) throw err;
          //populating the rank array with the marks
          for (let i = 0; i < result.length; i++) {
              rankArray[i] = result[i]['mark'];
          }
          //passing the rank array and the resultset to the giveRank() function
          giveRank(rankArray,result);
        });
}
```


The `giveRank()` function takes to arguments; an array and the resultSet.
It has three variables:
- `rank` - This one controls the count of the loop useful for displaying the appropriately incremented position e.g *1,1,3* and not *1,1,2*. We initialize it to 1 since we give positions from 1, not 0. 
- `prev_rank` - The previous rank is used for displaying the rank position in case of a tie. It stores the current position `[i]` of a student such that when the loop increments to the next position`[i+1]`, the current position `[i]`.
Consequently, the current position is made `[i-1]` and the next one made `[i]`.
`[i]` is only assigned the previous rank and given to the next array index if the value found at `[i]` is the same as `[i-1]`. We will see this in play in the next section. It is assigned 1 for the first position.
- `position` - This one stores the rank to be displayed. We initialize it to 0 in which the initialized value doesn't matter since the position is assigned inside the ``for loop`. You can initialize it to any digit.

The `for loop` contains an `if-else-if` structure for checking the values and assigning them appropriately. 
If it is the first index, then automatically the position becomes 1.
If the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`. The `prev_rank` is assigned the `rank` value again just as we discussed above.
Otherwise, if the value contained in `[i]` is equal to `[i-1]`, assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.

```javascript
function giveRank(arrayArg,resultArg){
  //Declaring and initilising variables
    let rank=1;
    prev_rank=rank;
    position=0;
    //Displaying the headers in the console
    console.log('\n-------OUR RESULTS------\n');
    console.log('Name | Mark | Position\n');
    //looping through the rank array
    for (i=0; i < arrayArg.length ; i++) {
            /*
            If it is the first index, then automatically the position becomes 1.
            */
            if(i==0){
                position=rank;
            console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            If the value contained in `[i]` is not equal to `[i-1]`, increment the `rank` value and assign it to `position`. The `prev_rank` is assigned the `rank` value
            */
            }else if(arrayArg[i]!=arrayArg[i-1]){
            rank++;
            position=rank;
            prev_rank=rank;
            console.log(resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            
            /*
            Otherwise, if the value contained in `[i]` is equal to `[i-1]`, assign the position the value stored in the `prev_rank` variable then increment the value stored in the `rank` variable.*/
            }else{
                position=prev_rank;
                rank++;
                console.log (resultArg[i]['name']+"\t"+arrayArg[i]+"\t"+position)+"\n";
            }
    }
}
```

![Screenshot](/engineering-education/mongodb-nodejs-custom-ranking/screen.png)

*Screenshot of the output*

<a id="link9"></a>

#### Conclusion

We have seen how to create a database, a collection, inserting data into it then querying the results. Furthermore, we also looked at how to perform the ranking of records using an array. Hope you got some insights.

Have a good one.

<a id="link10"></a>

#### Further reading

[MongoDB npm](https://www.npmjs.com/package/mongodb)

[W3Schools](https://www.w3schools.com/nodejs/nodejs_mongodb.asp)

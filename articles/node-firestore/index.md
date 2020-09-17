---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-firestore/
title: Node.js Firestore
description: This is a short article that shows developers how Cloud Firestore (a NoSQL database that applications can access) works and some of its basic operations.
author: linus-muema
date: 2020-09-17T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-firestore/hero.jpg
    alt: Node.js Firebase image computer
---
Firebase offers a cloud-hosted NoSQL database that applications can access. This is Cloud Firestore. NoSQL is a non-tabular database that stored data in objects and documents. They store unstructured data. Cloud Firestore also provides the ability to add realtime listeners to the database. This means that we can get any changes that happen in the database.
<!--more-->
### The Data Structure in Cloud Firestore
Data in Cloud Firestore is organized differently from the realtime database. It is organized in collections and documents. A collection contains documents and cannot contain other collections. A document on the other hand is different. It contains fields, maps and subcollections. Fields can hold data of different types e.g strings, numbers, arrays, etc. For more details on the data type,  you can check the [reference](https://firebase.google.com/docs/firestore/manage-data/data-types). Maps are basically nested data. e.g. `first` and `last` fields are maps.

```bsh
users
    |-user_id_one
        |-name :
        |    -first : "linus"
        |    -last : "muema"
        |-born : 2000

    |-user_id_two
        |-name :
        |    -first : "peter"
        |    -last : "kayere"
        |-born : 2003
```

Subcollections are basically collections associated with the document. But even with that relationship, when you delete a document, it does not delete the subcollection. You have to delete them too.

Now we can get into writing code! You can get the code for this tutorial from [Github](https://github.com/LinusMuema/node-firestore)

In the code, you will find the following packages.

* `express` - to manage routing in the application.

* `firebase` - we will use this to read and write data to Cloud Firestore.

* `nodemon` - to restart my server after saving changes.

* `random-words` - this will provide us with random words to save in the database.

First we initialise firebase in our application by using the config provided in the console. We also need to create a firestore database from the console. From the code, I have created a function to intialise firebase in the util file. Then we import the required packages. We use the `firebase.firestore()` method to get an instance of Cloud Firestore database.

```javascript
const firebase = require('firebase')
require("firebase/firestore");
const db = firebase.firestore()
```

The fist thing we will do is add data to the database. We get a reference to the document we want to add data to. We call the `.doc` method and pass in the path we want to write to. In my case, I want to get the `numbers` collection and write to the `random` document.

```javascript
const reference = db.doc('numbers/random')
```

Using the `random-words` and `Math.random` method in javascript, I will create the random data to be added to the database.

```javascript
const data = {name: string(), number: (Math.random() * 101)}
```

Then I create a route to add the random data to the database. We use the `reference.set()` method and pass in the data as an arguement. This, like the realtime database, returns a promise. We can then check for success or catch the errors accordingly.

```javascript
app.use('/add', (req, res) => {
    reference.set(data)
        .then(() => {res.status(200).json({message: 'Saved data to firestore'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

The change in the database does not automatically show. This is because it is not a realtime database.

Next up, we will try and read data from the same document. Here, we use the `reference.get()` method which also returns a promise. We check if document is not `undefined` and also if it exists. Sometimes you can pass the wrong path especially if the path is generated dynamically. If it all checks out, we use `document.data()` method to get the data. We then send it as a response.

```javascript
app.use('/get', (req, res) => {
    reference.get()
        .then(doc => {
            if (doc && doc.exists) res.status(200).json(doc.data())
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

Another operation is deleting. We can delete the data from the doc using `reference.delete()` method.

```javascript
app.use('/delete', (req, res) => {
    reference.delete()
        .then(() => {res.status(200).json({message: 'Deleted document successfully'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

Sometimes you may want to filter out data. This and other operations can be done using [queries](https://firebase.google.com/docs/firestore/query-data/queries). Suppose we have many documents in the `numbers` collection. And we want the numbers that exceed a particular value. We can use a simple query.

```javascript
app.use('/query', (req, res) => {
    const query = db.collection('numbers').where('number', '>=', 50)
    query.get()
        .then(snapshot => {
            snapshot.forEach(doc => {res.status(200).json(doc.data())})
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```
First, I create a query. With queries, we get the collection first then call the `where` method. This `where` method takes in three parameters. First, is the field we are checking. Second is the comparison operator. The operator takes the form of the normal javascript operators. `==` to mean `equals to`, `>=`to mean `equals or greater than`, etc. Some, however, are more advanced. For instance we have `array-contains` to check if the field (which is an array) contains the specified value. The third is the value we are using to compare.

In our code, we are getting the documents that have the field `number` greater than or equal to `50`. You can read more about queries [here](https://firebase.google.com/docs/firestore/query-data/queries).

But what if you want realtime changes. Cloud Firestore allows you to attach listeners.

```javascript
db.collection('numbers').doc('random').onSnapshot(doc => {
    console.log('Data received :')
    console.log(doc.data())
})
```

You get the collection first then the document. Then we call the `onSnapshot` method. This method will be called anytime there is an addition or update to the collection. It emits the document on every change.

Those are some of the basics of Cloud Firestore and how you can use it to store data. It is a good database that was created for faster queries and a better scalability than the realtime database. It is better organised than the realtime database hence easier to work with. But it does not mean that realtime database is out of use. Both databases have their unique functions. You can go ahead and take a short [survey](https://firebase.google.com/docs/firestore/rtdb-vs-firestore#key_considerations) to help you determine the type of database to use.

Feel free to raise a PR or issue in the code above with suggestions.

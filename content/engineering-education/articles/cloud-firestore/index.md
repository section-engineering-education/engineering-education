---
layout: engineering-education
status: publish
published: true
url: /engineering-education/cloud-firestore/
title: Getting Started with Cloud Firestore
description: This is a short article that shows developers how Cloud Firestore (a NoSQL database that applications can access) works and some of its basic operations.
author: linus-muema
date: 2020-10-01T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cloud-firestore/hero.jpg
    alt: Cloud Firebase image computer
---

In this article, we will be discussing Firestore, a cloud-hosted NoSQL database that applications can access and use to store or sync data with.  It is a good database that was created for faster queries and better scalability than the realtime database.
<!--more-->
NoSQL is a non-tabular database that stores data in objects and documents. NoSQL databases store unstructured data. Cloud Firestore provides developers the ability to add real-time listeners to the database. This means that we can get any changes that happen in the database.

In this article, we will look at:

- [Realtime vs Cloud Firestore](#cloud-firestore-vs-realtime-database)
- [Data structure in Cloud Firestore](#data-structure)
- [Basic Read and Write Operations](#basic-operations)
- [Adding Listeners](#realtime-listeners)
- [Conclusion](#conclusion)

### Cloud Firestore vs Realtime Database
The main question now is, "Why Cloud Firestore and not Realtime database?" These two databases are very different. Some developers may only see the data structure aspect but there are more.

1. **Data Structure** - with the Realtime database, data is stored in nodes or rather, a large json tree. This allows for flexibility but designing the data model can be difficult. With Cloud Firestore, data is strictly in documents and collections. This gives developers an easier time designing the data model.

2. **Platform Support** - realtime databases supports offline support for mobile platforms only i.e. Android and iOS clients. Cloud Firestore on the other hand, supports all mobile platforms and web clients. This means that a developer can have offline support for your website. This will greatly help clients with a bad network connection.

3. **Querying** - with Realtime databases, queries are limited to either `filtering` or `sorting`. These queries return an entire subtree. Cloud Firestore supports queries with both `filtering` and `sorting` which return entire documents. This means that there are no chances of getting incomplete data.

4. **Scalability** - this is a great factor to consider when creating a product. Cloud Firestore is undoubtedly the best at this. Realtime databases give developers around `200,000` connections at the same time i.e. `1000` operations per second. With Cloud Firestore, scaling is done automatically. Connections can increase as the client base grows. This is one of the major advantages of Cloud Firestore.

5. **Rules & Validation** - in a realtime database, the rules and validation are separate. This means that we can easily bypass some rules as some validations pass. This provides a less secure database unlike the Cloud Firestore which has both in the same place. The Cloud Firestore rules are also easier to read and understand.

6. **Realtime operations** - The realtime listeners in both databases differ in operation. For realtime databases, the listeners emit data once the operation is complete. Cloud Firestore listeners store the snapshot of data in the application's cache. The data is emitted almost immediately. The snapshot in the cache usually has metadata to show the state of the operation. First, the snapshot is generated and the data is emitted. Once the operation in the database is done, the metadata is updated to denote the operation's response. This gives the developer the freedom to work around these factors. One can decide to show the response on the first data emission or wait for the operation to complete.

### Data Structure
Data in Cloud Firestore is organized differently than the realtime database. It is organized in collections and documents. A collection contains documents and cannot contain other collections. A document on the other hand is different. It contains fields, maps, and subcollections. Fields can hold data of different types, for example strings, numbers, arrays, etc.

For more details on the data type, you can check this [reference](https://firebase.google.com/docs/firestore/manage-data/data-types). Maps are basically nested data. For example `first` and `last` fields are maps.

```bash
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

Subcollections are collections associated with the document. But even with that relationship, when you delete a document, it does not delete the subcollection. You have to delete the document as well.

### Basic Operations
Let's begin writing some code! You can access the full code for this tutorial on [Github](https://github.com/LinusMuema/node-firestore).

Within the code, you will find the following packages:

- `express` - to manage routing in the application.

- `firebase` - we will use this to read and write data to Cloud Firestore.

- `nodemon` - to restart the server after saving changes.

- `random-words` - this will provide us with random words to save in the database.

First we will start by initializing firebase in our application by using the config provided in the console. We will also need to create a firestore database from the console. To get more information on firebase click through to [this previous article](/engineering-education/node-firebase/).

From the code, we have created a function to initialize firebase in the util file. Then we will import the required packages. We use the `firebase.firestore()` method to get an instance of Cloud Firestore database.

```JavaScript
const firebase = require('firebase')
require("firebase/firestore");
const db = firebase.firestore()
```

The first thing we will do is add data to the database. We get a reference to the document we want to add data to. We call the `.doc` method and pass in the path we want to write to. In this case, we want to get the `numbers` collection and write to the `random` document.

```JavaScript
const reference = db.doc('numbers/random')
```

Using the `random-words` and `Math.random` method in JavaScript, we will create random data to be added to the database.

```JavaScript
const data = {name: string(), number: (Math.random() * 101)}
```

#### Adding data
Next, we create a route to add the random data to the database. We use the `reference.set()` method and pass in the data as an argument. This, like the realtime database, returns a promise. We can then check if it was a success or catch the errors accordingly.

```JavaScript
app.use('/add', (req, res) => {
    reference.set(data)
        .then(() => {res.status(200).json({message: 'Saved data to firestore'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

The change in the database does not automatically show. This is because it is not a realtime database.

#### Reading data
Next up, we will try and read data from the same document. Here, we use the `reference.get()` method which also returns a promise. We check if the document is not `undefined` and also if it exists. Sometimes you can pass the wrong path especially if the path is generated dynamically. If it all checks out, we use `document.data()` method to get the data. We then send it as a response.

```JavaScript
app.use('/get', (req, res) => {
    reference.get()
        .then(doc => {
            if (doc && doc.exists) res.status(200).json(doc.data())
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

Sometimes you may want to filter out data. This and other operations can be done using [queries](https://firebase.google.com/docs/firestore/query-data/queries). Suppose we have many documents in the `numbers` collection. And we want the numbers that exceed a particular value. We can do so using a simple query.

```JavaScript
app.use('/query', (req, res) => {
    const query = db.collection('numbers').where('number', '>=', 50)
    query.get()
        .then(snapshot => {
            snapshot.forEach(doc => {res.status(200).json(doc.data())})
        })
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

First, we create a query. With queries, we can get the collection first then call the `where` method. This `where` method takes in three parameters.

First, is the field we are checking. Second is the comparison operator. The operator takes the form of the normal JavaScript operators.

`==` means `equals to`, `>=` means `equals or greater than`, etc. Some, however, are more advanced. For instance we have `array-contains` to check if the field (which is an array) contains the specified value. The third parameter is the value we are using to compare.

In our code, we are getting the documents that have the field `number` greater than or equal to `50`. You can read more about queries [here](https://firebase.google.com/docs/firestore/query-data/queries).

#### Deleting data
Another operation worth noting is deleting. We can delete the data from the doc using the `reference.delete()` method.

```JavaScript
app.use('/delete', (req, res) => {
    reference.delete()
        .then(() => {res.status(200).json({message: 'Deleted document successfully'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

### Realtime Listeners
What if we wanted realtime changes. Cloud Firestore allows you to attach listeners.

```JavaScript
db.collection('numbers').doc('random').onSnapshot(doc => {
    console.log('Data received :')
    console.log(doc.data())
})
```

We get the collection first then the document. Then we call the `onSnapshot` method. This method will be called anytime there is an addition or update to the collection. It emits the document with every change.

### Conclusion
Those are some of the basics of Cloud Firestore and how we can use it to store data. It is a good database that was created for faster queries and better scalability than the realtime database. It is better organized than the realtime database hence easier to work with. But that does not mean that a realtime database is obsolete. Both databases have their unique functions. Before starting a project take this short [survey](https://firebase.google.com/docs/firestore/rtdb-vs-firestore#key_considerations) to help determine the best type of database to use.

Feel free to raise a PR or issue in the code above with suggestions.

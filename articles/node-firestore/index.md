Firebase offers a cloud-hosted NoSQL database that applications can access. This is Cloud Firestore. NoSQL is a non-tabular database that stored data in objects and documents. They store unstructured data. Cloud Firestore also provides the ability to add realtime listeners to the database. This means that we can get any changes that happen in the database. In this article, we will look at:

- [Data structure in Cloud Firestore](#Data-Structure)
- [Basic Read and Write Operations](#Basic-Operations)
- [Adding Listeners](#Realtime-Listeners)
- [Realtime vs Cloud Firestore](#Cloud-Firestore-vs-Realtime-Database)
- [Conclusion](#Conclusion)

### Data Structure
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

### Basic Operations
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

#### Adding data
Then I create a route to add the random data to the database. We use the `reference.set()` method and pass in the data as an arguement. This, like the realtime database, returns a promise. We can then check for success or catch the errors accordingly.

```javascript
app.use('/add', (req, res) => {
    reference.set(data)
        .then(() => {res.status(200).json({message: 'Saved data to firestore'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

The change in the database does not automatically show. This is because it is not a realtime database.

#### Reading data
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

#### Deleting data
Another operation is deleting. We can delete the data from the doc using `reference.delete()` method.

```javascript
app.use('/delete', (req, res) => {
    reference.delete()
        .then(() => {res.status(200).json({message: 'Deleted document successfully'})})
        .catch(error => {res.status(500).json({message: 'An error occurred', error})})
})
```

### Realtime Listeners
But what if you want realtime changes. Cloud Firestore allows you to attach listeners.

```javascript
db.collection('numbers').doc('random').onSnapshot(doc => {
    console.log('Data received :')
    console.log(doc.data())
})
```

You get the collection first then the document. Then we call the `onSnapshot` method. This method will be called anytime there is an addition or update to the collection. It emits the document on every change.

### Cloud Firestore vs Realtime Database
The main question now is, "Why Cloud Firestore and not Realtime database?" These two databases are very different. Some may only see the data structure only but there are more.
1. **Data Structure** - with Realtime database, data is stored in nodes or rather, a large json tree. This allows for flexibility but designing the data model can be hard. With Cloud Firestore, data is strictly in documents and collections. This gives developers an easy time designing the data model.

2. **Platform support** - Realtime database supports offline support for only mobile platforms i.e android and iOS clients. Cloud Firestore on the other hand, supports all mobile platforms and web clients. This means that you can have offline support for your website. This can greatly help clients with a bad network connection.

3. **Querying** - with Realtime database, your queries are limited to either `filtering` or `sorting`. These queries return an entire subtree. Cloud Firestore supports queries with both `filtering` and `sorting` which return entire documents. This means that there are no chances of getting incomplete data.

4. **Scalability** - this is a great factor to consider when creating product. Cloud Firestore is undoubtedly the best at this. Realtime database gives your around `200,000` connections at the same time i.e `1000` operations per second. Cloud Firestore, scaling is done automatically. Your connections can increase as the client base grows. This is one of the major advantages of Cloud Firestore.

5. **Rules & Validation** - in Realtime database, the rules and validation are separate. This means that you can easily bypass some rules as some validations pass. This provides a less secure database unlike the Cloud Firestore which has both at the same place. The Cloud Firestore rules are also easier to read and understand.

6. **Realtime operations** - The realtime listeners in both databases differ in operation. For Realtime database, the listeners emit data once the operation is complete. Cloud Firestore listeners store the snapshot of data in the application's cache.The data is emitted almost immediately. The snapshot in the cache usually has metadata to show  the state of the operation. First, the snapshot is generated and the data is emitted. Once the operation in the database is done, the metadata is updated to denote the operation's response. This gives the developer the freedom to work around these factors. One can decide to show the response on the first data emission or wait for the operation to complete.

### Conclusion
Those are some of the basics of Cloud Firestore and how you can use it to store data. It is a good database that was created for faster queries and a better scalability than the realtime database. It is better organised than the realtime database hence easier to work with. But it does not mean that realtime database is out of use. Both databases have their unique functions. You can go ahead and take a short [survey](https://firebase.google.com/docs/firestore/rtdb-vs-firestore#key_considerations) to help you determine the type of database to use.

Feel free to raise a PR or issue in the code above with suggestions.

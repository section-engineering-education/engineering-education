---
layout: engineering-education
status: publish
published: true
url: /group-operator-in-mongodb/
title: Group operator in MongoDB
description:  This article will cover the $group operator in MongoDB, which is a part of aggregation, along with some use cases or applications and examples.
author: harit-joshi
date: 2021-02-01T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/group-operator-in-mongodb/hero.jpg
    alt: Group operator in MongoDB Image
---
Group operator (also known as an accumulator operator) is a crucial operator in the MongoDB language, as it helps to perform various transformations of data. It is a part of aggregation in MongoDB. MongoDB is an open-source NoSQL database management program.
<!--more-->
NoSQL is an alternative to traditional relational databases. NoSQL databases are quite useful when working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store, or retrieve information.

In this article, we are going to learn about the $group operator with some examples. 

### Prerequisites
Before we start make sure you have the following:

- MongoDB installed in your system. To install MongoDB safely in your system visit the official documentation via this link
https://docs.mongodb.com/manual/installation/

- Must have some prior knowledge about MongoDB and its shell commands.

### Aggregation
Aggregation is an operation that processes data to give a computed result. Aggregation operations group values from multiple documents together and can perform a variety of operations on the grouped data to return a single result. It involves stages or pipelines through which data is processed to yield a combined result. 

Pipelines are stages through which data is processed, more technically transformed into by the provided criteria. Each pipeline is independent and receives the data of the previous stage. Always remember that the first pipeline will have direct contact with the data itself, not its transformed version, and it can take advantage of indexes.

### What is the $group operator?
As the name suggests, the `$group` operator groups similar data by some specified expression and combines it into a single result or document.

Suppose there are 15 people in a database and they all have a similar hobby. If we want to count all those people who have a hobby in common, then the `$group` operator is an elegant solution for such a task.

Let’s take a look at its syntax:

`{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }`

The `_id` field in the output documents contains the distinct group by key. The output documents can also contain computed fields that hold the values of some accumulator expression grouped by the $group‘s `_id` field.

The `_id` field here will take those fields by which you want to group the documents. It is mandatory to use `_id` here.

The $group operator does not remove the data from the database. It just aggregates multiple documents into a single document based on the field passed to the `_id` field.

### Important points to remember

- It can't be used with the `LogReduce` operator.

- When parsing and naming (aliasing) fields, avoid using the names of grouping functions or other operators as field names.

- When using count, or any grouping function, remember to include the underscore before the field name (sort by _count).

- Multiple aggregation functions can be on the same line but you can't include another functions, such as a math function, on the same line of a query.

### Example
Now, let’s look at an example. The code snippets should be run in the mongo shell.

Let's create a database:

```bash 
use review 
```

Now, let's create a collection named `person` and insert multiple documents in that collection using `insertMany()` function like:

```bash
db.person.insertMany([
    {
        "_id" : ObjectId("5ffb0dd58591ec5a52d2afbd"),
        "name" : "Harit Joshi",
        "age" : 18,
        "gender" : "Male",
        "hobbies" : [
                "sports",
                "cooking",
                "gaming"
        ]
    },
    {
        "_id" : ObjectId("5ffb0dd58591ec5a52d2afbe"),
        "name" : "Maria Swartz",
        "age" : 27,
        "gender" : "Female",
        "hobbies" : [
                "sports",
                "swimming",
                "gaming"
        ]
    },
    {
        "_id" : ObjectId("5ffb0dd58591ec5a52d2afbf"),
        "name" : "Billy Marton",
        "age" : 34,
        "gender" : "Male",
        "hobbies" : [
                "singing",
                "cooking",
                "jogging"
        ]
    }
])
```

Now that we have some documents in the collection, let's use the `$group` to find the number of males and females in the collection. 

To do that we have to use `aggregate()` function on the collection that takes an array of pipelines or stages through which the data in that collection will be transformed. Since we are interested in grouping the data, we have to use the `$group` operator along with an accumulator operator. 

You have to provide a key that'll hold the result of the accumulator operator. For this example, we are using `totalPerson` as a key and this will help us to aggregate the data. 

Synatx of `aggregate()` function:

```bash
db.<name of the collection>.aggregate([ 'array of pipelines' ])
```

> Note: The pipelines or the stages in the `aggregate()` function will always be in a document format.

Now applying the logic and the syntax that we learned above, the query will look like:

```bash
db.person.aggregate([ { $group: {_id: {gender: "$gender"}, totalPeople: {$sum: 1}} } ]).pretty()
```

Output:

```bash
{ "_id" : { "gender" : "Female" }, "totalPeople" : 1 }
{ "_id" : { "gender" : "Male" }, "totalPeople" : 2 }
```

As you can see, the `_id` field will hold the field or criteria by which you have grouped your data and `totalPeople` is the key that is holding the result of the accumalator operator i.e., the `$sum` operator. 

The `$sum` operator will return the collective sum of all the numeric values from applying a specified expression to each document in a group of documents that share the same group by key.

For the `$group` operator to work, you must use an accumulator operator like `$sum`, `$avg`, `$max`, or `$push`. Since the operator yields a combined result based on the grouping expression. 

To study more about the accumulator operators, please visit the [MongoDB official documentation](https://docs.mongodb.com/manual/reference/operator/aggregation/).

Let's take a look at another use case. Let's say we are interested in the number of people having a similar hobby. To achieve this, we should make every hobby a separate top-level field by using the `$unwind` operator.

The `$unwind` operator will pull out every value one by one from the array, that you are using this operator on and assign it to the key which is holding that array in a single key-value pair form. 

This allows more flexibility to query the arrays and data in the database. Then we have to do the same as we did in the first example because, hobbies is not an array but a top-level field in a key-value form, and applying the `$group` operator will make it easier.

```bash
db.person.aggregate([ {$unwind: "$hobbies"}, { $group: {_id: {hobby: "$hobbies"}, totalPeople: {$sum: 1}} } ]).pretty() 
```

Output:

```bash
{ "_id" : { "hobby" : "jogging" }, "totalPeople" : 1 }
{ "_id" : { "hobby" : "singing" }, "totalPeople" : 1 }
{ "_id" : { "hobby" : "cooking" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "gaming" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "sports" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "swimming" }, "totalPeople" : 1 }
```

To study more about the `$unwind` operator, please visit the [MongoDB official documentation](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/)

### Applications of $group operator:

1.  Whenever we need to find how many people fit in a group like we did in our examples, the `$group` operator can be very useful.

2.  It can also be useful in situations where we want to see documents based on some repeated occurrence of other data.

3.  If we wanted to create an array of similar entities related to data and include it in our final document then the $group operator can be used.

I hope you enjoyed reading this article as much as I enjoyed writing it.

Happy Coding!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)

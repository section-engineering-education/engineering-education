---
layout: engineering-education
status: publish
published: true
url: /engineering-education/group-operator-in-mongodb/
title: Group operator in MongoDB
description:  This article will cover the $group operator in MongoDB, which is a part of aggregation with its applications along with examples.
author: harit-joshi
date: 2021-01-30T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/group-operator-in-mongodb/hero.jpg
    alt: Group operator in MongoDB Image
---
Group operator (is also known as accumulator operator) is a crucial operator in MongoDB language as it helps to perform various transformations of data. It is a part of aggregation in MongoDB.
<!--more-->

MongoDB is an open-source NoSQL database management program. NoSQL is an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.

In this article, we are going to learn about the $group operator with some examples. 

### Prerequisites

- MongoDB must be installed in your system. To install the MongoDB safely in your system visit the official documentation via this link
https://docs.mongodb.com/manual/installation/

- Must have some prior knowledge about MongoDB and its shell commands.

### Aggregation

Aggregation is an operation that processes the data to give a computed result. Aggregation operations group values from multiple documents together and can perform a variety of operations on the grouped data to return a single result. It basically involves stages or pipelines through which data is processed to yield a combined result. 

Pipelines are stages through which data is processed, more technically transformed into by the provided criteria. Each pipeline is independent and receives the data of the previous stage. Always remember that the first pipeline will have direct contact with the data itself, not its transformed version, and it can take advantage of indexes.


### What is $group operator?

As the name suggests, the `$group` operator groups similar data by some specified expression and combines it into a single result or document.

Suppose there are 15 people in a database and they all have a similar hobby. if we want to count all those people who have a hobby in common, then the `$group` operator is an elegant solution for such a task.

Let’s take a look at its syntax:

`{ $group: { _id: <expression>, <field1>: { <accumulator1> : <expression1> }, ... } }`

The `_id` field in the output documents contains the distinct group by key. The output documents can also contain computed fields that hold the values of some accumulator expression grouped by the $group‘s `_id` field.

Basically, the `_id` field here will take those fields by which you want to group the documents. It is mandatory to use `_id` here.

The $group operator does not remove the data from the database. It just aggregates multiple documents into a single document based on the field passed to the `_id` field.

### Important points to remember

- It can't be used with the `LogReduce` operator.

- When parsing and naming (aliasing) fields, avoid using the names of grouping functions or other operators as field names.

- When using count, or any grouping function, remember to include the underscore before the field name (sort by _count).

- Multiple aggregation functions can be on the same line but you can't include another function, such as a math function, on the same line of a query.

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

Now that we have some documents in the collection, let's use the `$group` to find the number of males and females in the collection anf in order to do that we have to use `aggregate()` function on the collection which always takes an array of pipelines or stages through which the data in that collection will be transformed and since we are interested in grouping the data we have to use `$group` operator along with an accumalator operator and you have to provide a key which will hold the result of the accumalator operator for this example we are using 'totalPerson' as a key and this will help us to aggregate the data. 

Synatx of `aggregate()` function looks like :

```bash
db.<name of the collection>.aggregate([ 'array of pipelines' ])
```
> Note: The pipelines or the stages in the `aggregate()` function will always be in a document format !

Now applying the logic and the syntax  which we learn above the query will look like:

```bash
db.person.aggregate([ { $group: {_id: {gender: "$gender"}, totalPeople: {$sum: 1}} } ]).pretty()
```

Output:

```bash
{ "_id" : { "gender" : "Female" }, "totalPeople" : 1 }
{ "_id" : { "gender" : "Male" }, "totalPeople" : 2 }
```
So in the output as you can see the 'id' field will hold the field or criteria by which you have grouped your data and 'totalPeople' is the key which is holding the result of the  accumalator operator that is the `$sum` operator which will return the collective sum of all the numeric values that result from applying a specified expression to each document in a group of documents that share the same group by key.

For the `$group` operator to work, you must have to use an accumulator operator like `$sum`, `$avg`, `$max`, `$push` etc. since the operator yields a combined result based on the grouping expression. To study more about the accumalator operator you can visit to do MongoDB official docs via this link : https://docs.mongodb.com/manual/reference/operator/aggregation/

Let's take a look at another use case. Suppose, let's say we are interested in the number of people having a similar hobby, there can be many approaches to achieve this but the approach which we will use is clear, easy and elegant so to achieve the solution we should make every hobby a separate top-level field by using the `$unwind` operator. What I mean by top-level field is that the `$unwind` operator will pull out every value one by one from the array on which you are using this operator and assign it to the key which is holding that array in a single key-value pair form which will allow us even more flexibility to query the arrays and data in the database and then we have to do the same as we did in the first example as now hobbies is not an array but a top-level field in key-value form and applying `$group` operator will be very easy like this:

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
To study more about the `$unwind` operator you can visit to do MongoDB official docs via this link : https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/

### Applications of $group operator:

1.  Whenever we need to find how many people fit in a group as we did in our examples, the `$group` operator can be very useful.

2.  It can also be useful in the situations where we want to see documents based on some repeated occurrence of other data.

3.  If we want to create an array of similar entities related to data and include it in our final document then the $group operator can be used.

I hope you enjoyed reading this article as much as I enjoyed writing it.

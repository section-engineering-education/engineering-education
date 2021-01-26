---
layout: engineering-education
status: publish
published: true
url: /engineering-education/group-operator-in-mongodb/
title: Group operator in MongoDB
description:  Group operator is a very important operator in MongoDB language and it is a part of aggregation in MongoDB so this article will cover $group operator, its applications along with examples.
author: harit-joshi
date: 21:52:42 2021 +0530
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/group-operator/hero.jpg
    alt: Group operator in MongoDB Image
---
Group operator also known as accumalator operator is a very important operator in MongoDB language as it helps to perform varoious transformations on the data. It is a part of aggregation in MongoDB. 
<!--more-->

MongoDB is an open source NoSQL database management program. NoSQL is used as an alternative to traditional relational databases. NoSQL databases are quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information.

In this article we are going to learn:

1. What is the $group operator?

2. Examples for a better understanding of the operator.

3. Applications of $group operator.

### Aggregation

Aggregation is an operation that processes the data to give a computed result. Aggregation operations group values from multiple documents together and can perform a variety of operations on the grouped data to return a single result. It basically involves stages or pipelines through which data is processed to yield a combined result. 

Pipelines are stages through which data is processed, more technically transformed into by the provided criteria. Each pipeline is independent and receives the data of the previous stage. Always remember that the first pipeline will have direct contact with the data itself, not its transformed version, and it can take advantage of indexes.

### What is $group operator?

As the name suggests, the `$group` operator groups similar data by some specified expression and combines it into a single result or document.

Suppose there are 15 people in a database and they all have a similar hobby. if we want to count all those people who have a hobby in common, then `$group` operator is an elegant solution for such a task.

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

Now, let’s look at an example.

Suppose we have a collection of 3 people with their names, gender, age and hobbies:

```JavaScript
[
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
]
```

Let's say we want to find how many males and how many females are there in this document. In this short example, it is pretty clear that there are 2 males and 1 female.

```js
db.person.aggregate([ { $group: {_id: {gender: "$gender"}, totalPeople: {$sum: 1}} } ]).pretty()
```

Output:

```JavaScript
{ "_id" : { "gender" : "Female" }, "totalPeople" : 1 }
{ "_id" : { "gender" : "Male" }, "totalPeople" : 2 }
```

To make the $group operator work, you should use an accumulator operator like `$sum`, `$avg`, `$max`, etc since the operator yields a combined result based on the grouping expression.

Let's take a look at another use case. Suppose now we are interested in how many people have a similar hobby, We should make every hobby a separate top-level field by using the `$unwind` operator and then we have to do the same as we did in the first example:

```JavaScript
db.person.aggregate([ {$unwind: "$hobbies"}, { $group: {_id: {hobby: "$hobbies"}, totalPeople: {$sum: 1}} } ]).pretty() 
```

Output:

```JavaScript
{ "_id" : { "hobby" : "jogging" }, "totalPeople" : 1 }
{ "_id" : { "hobby" : "singing" }, "totalPeople" : 1 }
{ "_id" : { "hobby" : "cooking" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "gaming" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "sports" }, "totalPeople" : 2 }
{ "_id" : { "hobby" : "swimming" }, "totalPeople" : 1 }
```
### Applications of $group operator:

1.  Whenever we need to find how many people fit in a group as we did in our examples, the `$group` operator can be very useful.

2.  It can also be useful in the situations where we want to see documents based on some repeated occurrence of other data.

3.  If we want to create an array of similar entities related to data and include it in our final document then the $group operator can be used.

### Conclusion

In this article we have discussed what is $group operator, how can we use it some examples. $group operator can be very useful for similar data related to some other data.

I hope you enjoyed reading this article as much as I enjoyed writing it.


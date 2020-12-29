# **Projection in MongoDB**


MongoDB is a cross-platform document-oriented NoSQL database solution that uses JSON based schema. MongoDB is in demand amongst many developers because it provides a lot more flexibility to design and query databases as it uses internal memory for storing the (windowed) working set, enabling faster access to data.

This article will explain you the concept of projections in MongoDB but before starting there are 2 terms which must be clear as they seem to be similar but they are different:
1.  Collection :
A collection is a group of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema.


2. Document :
A document is a set of key-value pairs. Documents have a dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.

## **Prerequisites :**

For latest MongoDB version up and running :

1.  Install it from the official docs of MongoDB 
        https://docs.mongodb.com/manual/installation/
2. The basics of MongoDB must be clear.


## **What is projection**

Projection means selecting only the necessary data rather than selecting the whole of the data of a document. The basic syntax of projection is :

```js
db.collection_name.find({},{<field> : <value>})
```

Let’s take an example to make it more clear, so here we have a collection of only one person

```js
db.collection.find()
{"_id": ObjectId("507f191e810c19729de860e1"), "name": "Adams Payne", "age": 29, bloodGroup: "B+"}
```


Suppose you want to project or view this data in such a way that you only want to view the name and age of the person so the query will be :

```js
db.collection.find({}, {name: 1, age: 1}).pretty()

 {  

  "_id": ObjectId("507f191e810c19729de860e1"),
  "name": "Adams Payne",
  "age": 29
  
  }
```

So this is a projection and to do so, you have to pass another document after finding a filter 
separated by a comma (“,”) and then you have to specify the key of the field in your document with value 1 and only those keys with value 1 will be part of the final result meaning the rest of the keys will have value 0 and they won’t be the part of the final result but in the above example why the _id field is included?


This is because _id is a special field generated automatically by MongoDB so this field will be part of your final result even if you have not specified it in your projection query as you can see in the above example. 
So in order to exclude _id from your final result you have to explicitly specify _id to 0 like this :

```js
db.collection.find({}, {name: 1, age: 1, _id: 0})

{"name": "Adams Payne", "age": 2}
```


So as you can see _id field is not part of the result.
There are many more ways to transform or funnel the data. Now we will see a pretty complex example where arrays and nested documents will be there thus I will show you the power of projection which will clear your doubts. 

## **How MongoDB projection works**

MongoDB projection is a powerful tool that can be used to extract only the fields you need from a document—not all fields. It enables you to:

* Project concise and transparent data.
* Filter the data set without impacting the overall database performance.

Because MongoDB projection is built on top of the existing find() method, you can use any projection query without significant modifications to the existing functions. Plus, projection is a key factor when finding user-specific data from a given data set.

## **Operators in MongoDB Projection**

Using the MongoDB projection method to retrieve specific data from a document will positively impact database performance because it reduces the workload of the find query, minimizing resource usage. 

The operators are as follows :
* $
* $slice
* $elemMatch

## **$ Operator**

The $ operator is used to limit the contents of an array to project the first element that matches the query condition on the array field. Starting from MongoDB 4.4, if no query condition is present, the first element will be returned in the specified array.

Syntax :
```js
db.collection.find( { <array>: <condition> ... }, { "<array>.$": 1 } )
```
Limitations of the $ operator:

* Only a single $ operator can be used in a single query.
* The query must only consist of a single condition on the array field where it will be applied.
* The sort() function in the find() method will be applied before the $ operator. This function may cause the sort order not to be represented correctly.
* The $ operator can only be applied at the end of a field path. This restriction was introduced in MongoDB 4.4 to mitigate any formatting issues.
* The $slice projection expression cannot be used with the $ operator as a part of the same expression.


Let‘s take an example, so suppose we have a collection of movies
```js
db.collection.find().pretty()
  {
        "_id": ObjectId("107o191d010c19729de860e1"),
        "movieName": "Mission Impossible 4",
        "genre":
        [
            "horror",
            "drama",
            "action"
        ]
    
},
{
        "_id": ObjectId("a070191d010c19729du860e1"),
        "movieName": "The Species",
        "genre":
        [
            "horror",
            "sci-fi",
            "action"
        ] 
}
```

Now if you want to filter the document based on some condition and you want the projection to be based on that condition so here you can use the $ operator.
So if you want to find all movies against the condition like genre must be equal to drama and based on this filter you want to project only the genre drama ( _id will be included and in order to exclude it in your final result you have to do it explicitly ).

The query will be :
```js
db.collection.find({genre: "drama"}, {"genre.$": 1, _id: 0}).pretty()
 { "genre" : [ "drama" ] }
```
So this query will yield only one result because it can only find one document as only one document have a drama as an element in the genre array and the projection will be based on the filter condition so only drama will be project and the rest of the array elements in the genre will not be projected.


## **$slice Operator**

The $slice operator specifies the number of elements that should be returned as the output of a query.

Syntax :
```js
db.collection.find( <query>,  { <array Field>: { $slice: <number> } })
```

Limitations in $slice operator :
* With the introduction of MongoDB 4.4, the $slice operator will only return the sliced element. It will not return any other item in a nested array.
* The $slice operator does not support the find() operation done on MongoDB views.
* The $slice operator cannot be used in conjunction with the $ projection operator due to the MongoDB restriction, where top-level fields can’t consist of $ (dollar sign) as a part of the field name.


So here is an example of a document

```js
db.collection.find().pretty()

  {
        "_id": ObjectId("904f191m810c29729de86045"),
        "name": "Larry Sean",
        "age": 28,
        "hobbies":
        [
            {
                "title": "Sports",
                "frequency": 2
            },
            
            "Gaming",
            
            {
                "title": "Cooking",
                "frequency": 5
            }
        ]
},


{
        "_id": ObjectId("904f191m810c29729de86045"),
        "name": "Bill Swiss",
        "age": 40,
        "hobbies":
        [
            {
                "title": "Swimming",
                "frequency": 2
            },
            
            "Singing",
            
            {
                "title": "Dancing",
                "frequency": 3
            }
        ]
},


{
        "_id": ObjectId("904f191m810c29729de86045"),
        "name": "Edward Elric",
        "age": 17,
        "hobbies":
        [
            {
                "title": "Karate",
                "frequency": 7
            },
            
            "Gaming",
            
            {
                "title": "Painting",
                "frequency": 4
            }
	]
}
```

Suppose if you want to just see only the first document or item so to say in the hobbies array of the first document in the collection along with name and _id so how can we do that. Therefore in order to achieve this, we need to use the $slice operator and it just simply yields the elements of the array based on how many elements you want to see in your result and also remember that in MongoDB array indexing starts from 0.

So the query will look like this :

```js
db.collection.findOne({}, {hobbies: {$slice: 1}, name: 1})


  {
        "_id": ObjectId("904f191m810c29729de86045"),
        "name": "Larry Sean",
        "hobbies":
        [
            {
                "title": "Sports",
                "frequency": 2
            },
        ]
}
```

So in order to use the $slice operator, you have to nest it inside of the array just as shown in the above example so what we are mainly interested in to see the first element of the hobbies array along with the name and _id of the first document of the collection so we passed the value 1 to $slice which means to yield the first element of the hobbies array, suppose if we passed 2 as a value instead of one so it would have yield first 2 elements of the array. If you wish to see only the last element, you simply have to pass -1 as a value to $slice.


In the above example suppose you are now interested to see only the second field of the first element of the array along with name and _id. This is also not very difficult. The query will be :

```js
db.collection.findOne({}, {hobbies: {$slice: 1}, name: 1, "hobbies.frequency": 1})
```


## **$elemMatch Operator**

$elemMatch operator will limit the contents of an array to the first element that matches a given condition. This condition differs from the $ operator because the $elemMatch projection operator requires an explicit condition argument.

Let’s see the syntax of using the $elemMatch in the find() method.

Syntax :
```js
db.collection.find( { <array>: <condition> ... }, { "<array>.$elemMatch": ($elemMatch operator) } )
```
Limitations of the $elemMatch operator

* Regardless of the ordering of fields in the document, the field to which $elemMatch projection is applied will be returned as the last field of the document.
* find() operations done on MongoDB views do not support $elemMatch projection operator.
* $text query expressions are not supported with the $elemMatch operator.

We will again use the same collection which we have used in the slice operator section.
So now if you want to filter all people whose age is greater than 16 and you want to pull out only “Gaming” as the hobby and also want to see who has gaming as a hobby along with the name of the person. This is also not very difficult, just read carefully what do you want to query.

So here what we can do is first we will query our data against the condition that age must be greater than 16 using $gt operator and use $elemMatch operator in the projection which basically expects a condition and returns the first matching element from the array based on the condition and finally we will write name: 1.


The query will look like this :
```js
db.collection.find({age: {$gt: 16}, {hobbies: {$elemMatch: {$eq: "Gaming"}, name: 1, _id: 0}}}).pretty()
```

So this query yields all those documents in which the age of the person is greater than 16 along with name and hobby specified in the elemMatch filter and it will also show those documents too in which “Gaming” is not present but the age field will satisfy the find filter condition there but remember nothing else will be shown except gaming and name and if there is a document in which age is less than 16 but gaming is present in the array it will be excluded. Always remember projection has nothing to do with find filter conditions. Projection will only just transform or shape the data and nothing else. It will not remove any data!


## **Applications of projection**

1.  It is used when we only need to see a specific part of the data.
2.  It is used in aggregation when we need to funnel down the data from each pipeline stage as per our requirements.
3.  When you want to filter the data set without impacting the overall database performance projection can be used.


## **Conclusion**

In this article we have discussed what is projection, how can we use projection in different ways by using $, $slice & $elemMatch operators along with examples.


Projections can be very useful for user-specific data because MongoDB projection is built on top of the existing find() method, you can use any projection query without significant modifications to the existing functions.
Never confuse yourself that projection removes the data from the database. I hope you enjoyed reading this article as much as I enjoyed writing it.



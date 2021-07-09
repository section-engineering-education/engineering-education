### Introduction
MongoDB is a high-performance, document-oriented NoSQL database which came to light in the mid-2000s. Unlike SQL-based databases, MongoDB uses documents (records) and collections (tables) to store non-relational data. MongoDB has grown in its use due to the scalability and its ease of use.

JavaScript Object Notation (JSON) is a data exchange format solely based on JavaScript. JSON objects can easily get transferred from one system to another due to their compatibility with the majority of systems. JSON is simple and easy to use besides being independent of any language. For these reasons, JSON has a wide range of applications in programming and data representation.

JSON can store various data types like strings, arrays, objects, and Binary JSON (BSON). What makes it easy to access data is the ability of various tools to export and import JSON documents between systems. JSON makes use of key-value pair notation presumed to be the basic units of data.

### Table of Contents
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Structuring JSON data for use in MongoDB Database](#structuring-json-data-for-use-in-mongodb-database)
    - [Getting into JSON](#gettting-into-json)
    - [Modelling Embedded Data](#modelling-embeded-data)
- [Creating the JSON file](#creating-the-json-file)
- [Import JSON data to MongoDB Database](#import-json-data-to-mongodb-database)
- [Save JSON data to MongoDB Database](#save-json-data-to-mongodb-database)
- [Export JSON to MongoDB Database](#export-json-to-mongodb-database)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Goal
The sole aim of this article is to provide a clear understanding of how to handle JSON data in the MongoDB database. By the end of the article, the reader is supposed to have known how to structure JSON data to use in MongoDB database, import-export, and save JSON data to a MongoDB database.
Reading this article to the end should give the user a head start to using the MongoDB database with JSON efficiently for data handling, export, and import.

### Prerequisites
- General knowledge of working with MongoDB
- An basic understanding of JavaScript Object Notation
- MongoDB installed on your computer

### Structuring JSON data for use in MongoDB Database
Let us say you want to store data for a blog page in MongoDB. First, you will need to have an idea of what your data will look like and how different fields will relate to each other. For instance, let us say these are the records you what to capture:
| post ID | post title | post body         | post category                   | post author | post date    |
|---------|------------|-------------------|---------------------------------|-------------|--------------|
| 1       | Post one   | An awesome post 1 | Programming, Coding, States     | John Doe    | 24, 08, 2020 |
| 2       | Post two   | JSON data type    | Databases, Coding, Programming  | Jane Doe    | 01, 01, 2021 |
| 3       | Post three | REST API tutorial | APIs, Data transfer, JavaScript | Jim Doe     | 08, 06, 2021 |

#### Getting into JSON
Let us structure the table above in JSON format bearing in mind that JSON is formatted as name or key-pair values. The field names and values are separated by a colon, the filename-value pairs are separated by commas. and a set of records are enclosed in curly brackets. For instance
```json
{
    "post id": 1, "post title": " post one"
}
```

#### Modelling Embedded Data
Let us visit SQL for a moment, in this case of data, some data fields require multiple values that cannot be easy to display if modeled in a single column for example `post category`. In SQL, we would solve this problem by creating a relational table.

With MongoDB, this problem can easily be handled by embedded data using JSON as it supports embedded files, so it can embed related data and lists in the same document instead of creating a new table like below:
```json
{
    "post category": ["Programming", "Coding", "States"]
} 
```

For the case of post dates, each date has values for day, month, and year, below is how to go about it:
```json
{
    "post date": {
        "day": 24, "month": 08, "year": 2020        
    }
}
```
We just structured our JSON data for use in MongoDB. Let us get to the next step.

### Creating the JSON file
First, we need to have our JSON file which we will import to the MongoDB database. So we will create a new folder called `project`. In the folder, create a new file and call it `file.json` then paste the snippets below into that file.

```json
[
    {
        "student_number": 1,
        "name": "John Doe",
        "age": 17,
        "Course": "Computer Science"
    },
    {
        "student_number": 2,
        "name": "Joan Dee",
        "age": 23,
        "Course": "Computer Animation"
    },
    {
        "student_number": 3,
        "name": "Jim Doeh",
        "age": 19,
        "Course": "Industrial Science"
    },
    {
        "student_number": 4,
        "name": "John Dohn",
        "age": 37,
        "Course": "Political Science"
    }
]
```


### Import JSON to MongoDB
Next, you need to create a database to hold the JSON object that you will import. Execute the command below to create the database and import the JSON file as a `student` collection.
```shell
mongoimport --jsonArray --db studentinfo --collection students --file path-to-your-file\filename.json
```

If your import was a success, you should get the message below in the terminal
```shell
2021-06-29T22:35:18.454+0300    connected to: mongodb://localhost/
2021-06-29T22:35:18.500+0300    4 document(s) imported successfully. 0 document(s) failed to import.
```

Now to verify the import, run the command below to view the imported data:
```shell
db.students.find().pretty()
```

This command should fetch all objects that were in the JSON file that was imported as below:
```shell
db.students.find()
{ "_id" : ObjectId("60db758c4a433597bcae61c0"), "student_number" : 1, "name" : "John Doe", "age" : 17, "Course" : "Computer Science" }
{ "_id" : ObjectId("60db758c4a433597bcae61c1"), "student_number" : 4, "name" : "John Dohn", "age" : 37, "Course" : "Political Science" }
{ "_id" : ObjectId("60db758c4a433597bcae61c2"), "student_number" : 2, "name" : "Joan Dee", "age" : 23, "Course" : "Computer Animation" }
{ "_id" : ObjectId("60db758c4a433597bcae61c3"), "student_number" : 3, "name" : "Jim Doeh", "age" : 19, "Course" : "Industrial Science" }
```

### Save JSON data to MongoDB Database
Now that we have imported a JSON file into MongoDB, we will add two records to the database then export the data in the MongoDB database to a new JSON file.
Use the command below to add records to the database:
```shell
db.students.insert({"student_number":5, "name":"Last student added", "age":22, "Course":"Engineering"})
```

You should get the response below in the terminal:
```shell
WriteResult({ "nInserted" : 1 })
```

Now if we run the command, we find an extra record in the database:
```shell
db.students.find()
{ "_id" : ObjectId("60db758c4a433597bcae61c0"), "student_number" : 1, "name" : "John Doe", "age" : 17, "Course" : "Computer Science" }
{ "_id" : ObjectId("60db758c4a433597bcae61c1"), "student_number" : 4, "name" : "John Dohn", "age" : 37, "Course" : "Political Science" }
{ "_id" : ObjectId("60db758c4a433597bcae61c2"), "student_number" : 2, "name" : "Joan Dee", "age" : 23, "Course" : "Computer Animation" }
{ "_id" : ObjectId("60db758c4a433597bcae61c3"), "student_number" : 3, "name" : "Jim Doeh", "age" : 19, "Course" : "Industrial Science" }
{ "_id" : ObjectId("60db7a59ee65088f9b51677e"), "student_number" : 5, "name" : "Last student added", "age" : 22, "Course" : "Engineering" }
```

### Export JSON to MongoDB Database
Now let us export the new file to JSON using the command:
```shell
mongoexport --db studentinfo --collection student --out d:\out.json --pretty
```

You should have the response below in your terminal:
```shell
2021-06-29T23:02:50.046+0300    connected to: mongodb://localhost/
2021-06-29T23:02:50.071+0300    exported 4 records
```

Now if you navigate to your D drive, you should find your exported JSON file named `out.json`, and the records are as below:
```json
{
    "_id": {
        "$oid": "60db75f6f8992a3dd20bb089"
    },
    "student_number": 3,
    "name": "Jim Doeh",
    "age": 19,
    "Course": "Industrial Science"
}
{
    "_id": {
        "$oid": "60db75f6f8992a3dd20bb08a"
    },
    "student_number": 2,
    "name": "Joan Dee",
    "age": 23,
    "Course": "Computer Animation"
}
{
    "_id": {
        "$oid": "60db75f6f8992a3dd20bb08b"
    },
    "student_number": 1,
    "name": "John Doe",
    "age": 17,
    "Course": "Computer Science"
}
{
    "_id": {
        "$oid": "60db75f6f8992a3dd20bb08c"
    },
    "student_number": 4,
    "name": "John Dohn",
    "age": 37,
    "Course": "Political Science"
}
```

### Conclusion
In this article, we learned how to handle JSON data in the MongoDB database and the various operations that can be performed on JSON using MongoDB. Among the operations are structuring data for use in MongoDB, importing and exporting data from JSON to MongoDB, and vice versa.

You can find the link for the JSON files [here.](https://github.com/salvador02/jsonfile)

### Further Reading
Now that you have an understanding of how to use JSON in MongoDB, you should be sure to check out these links to find out more on the topic:
- JSON and BSON: https://www.mongodb.com/json-and-bson
- Mongoexport: https://docs.mongodb.com/manual/reference/program/mongoexport/
- Mongoimport: https://docs.mongodb.com/manual/reference/program/mongoimport/

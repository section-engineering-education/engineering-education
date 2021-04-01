---
layout: engineering-education
status: publish
published: true
url: /engineering-education/working-with-databases-part1/
title: Getting to Grips with Databases - Part 1
description: Using MongoDB, this article proves that all you need to work with a database is some basic knowledge about the command line and JSON.
author: louise-findlay
date: 2020-06-11T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-databases-part1/hero.jpg
    alt: database image example
---
For the uninitiated, databases can seem a complicated, mythical thing that only back-end developers, computer scientists, and programmers can work with. This article is here to dispel that myth and prove that all you need to work with a database is some basic knowledge about the command line and JSON.

<!--more-->

### MongoDB Installation
![mongodb.png](/engineering-education/working-with-databases-part1/mongodb.png)<br>
[MongoDB](https://www.mongodb.com/) is a popular NoSQL database that you can run both locally and in the cloud (called MongoDB Atlas.) NoSQL stands for not just SQL and means it is non-relational which makes it easier to adapt to different types of data.

To run MongoDB locally, first you'll have to install the Community Server from their [site](https://www.mongodb.com/download-center/community). To start, we'll be interacting with the database through the command line. Windows users will have to add mongo (the command used to run MongoDB) to their PATH so they can run the command successfully.

![system-environment-variables.png](/engineering-education/working-with-databases-part1/system-environment-variables.png)<br>
**Windows users only**: Type `env` into the search box and press Enter when the Edit the system environment variables result is selected. Click Environment Variables and click Path under System variables. Edit this and add a new entry containing `C:\Program Files\MongoDB\Server\4.2\bin`. You may need to update the 4.2 part when new versions of MongoDB Community Server are released.

Click OK to exit all the dialog boxes.

```console
$ mongo
Mongo Shell version v4.2.3
```

### Testing the Install
To test that the installation has worked correctly, open a terminal window, and type `mongo`. If a message starting with `MongoDB shell version` appears then the installation has been successful. Now you're ready to create your first database.

Enter `use firstdb`. Mongo will create a database called firstdb if there isn't one already, or switch to it if it exists.

### Books
To add some data, type `db.books.insert( { name: "Harry Potter and the Chamber of Secrets", genre: "Fantasy" } )`. The result should be `WriteResult({ "nInserted" : 1 })` which tells you the number of entries inserted.

This will create a collection called Books (because there isn't already one) and add an entry with the book's name and genre. You can check this by typing `db.books.find()`.

```json
db.books.find()
{ "_id" : ObjectId("5ed79cc24096aca107f150fc"), "name" : "Harry Potter and the Chamber of Secrets", "genre" : "Fantasy" }
```

Collections are groups of related data so one database can have multiple collections in it. Data is added through keys and values and stored in the database in JSON format. If you've worked with APIs before, chances are you've encountered JSON.

To show all collections in the database, type `show collections`. To delete the collection, type `db.books.drop()`.

### findOne
Once you've created a few more entries, you'll probably want to find a specific one. Using `findOne()` instead of find will let you search for a specific key-value pair.

Make sure the key-value is unique. For example, `db.books.findOne( { "name" : "Harry Potter and the Chamber of Secrets" } )` searches for an entry in the books collection with the name of Harry Potter and the Chamber of Secrets.

```json
db.books.findOne( { "name" : "Harry Potter and the Chamber of Secrets" } )
{
	"_id" : ObjectID("5ed79cc24096aca107f150fc"),
	"name" : "Harry Potter and the Chamber of Secrets",
	"genre" : "Fantasy"
}
```

If you're looking to delete entries instead, use the `deleteOne()` and `deleteMany()` commands. For example, `db.books.deleteMany( { "genre": "Sci-Fi" } )` deletes entries in the books collection that have the Sci-Fi genre.

### Database Complete
Congratulations, you've now created your first database and can add, delete, and find collections and entries in it. To learn how you can incorporate your newfound database knowledge on a website, check out [Getting to Grips with Databases Part 2: Develop Your First Data-Driven Website](/engineering-education/working-with-databases-part2/).

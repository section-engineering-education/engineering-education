# Getting to Grips with Databases Part 1: Creating Your First Database

For the uninitiated, databases can seem a complicated, mythical thing that only back-end developers, computer scientists and programmers can work with. This article is here to dispel that myth and prove that all you need to work with a database is some basic knowledge about the command line and JSON.

![mongodb.png](mongodb.png)

[MongoDB](https://www.mongodb.com/) is a popular NoSQL database that you can run both locally and in the cloud (called MongoDB Atlas.) NoSQL stands for not just SQL and means it is non-relational which makes it easier to adapt to different types of data.

To run MongoDB locally first, you'll have to install the Community Server from their [site](https://www.mongodb.com/download-center/community). To start with we'll be interacting with the database through the command line so Windows user will have to add mongo (the command used to run MongoDB) to their PATH so they can run the command successfully.

![system-environment-variables.png](system-environment-variables.png)

**Windows users only**: Type `env` into the search box and press Enter when the Edit the system environment variables result is selected. Click Environment Variables and click Path under System variables. Edit this and add a new entry containing `C:\Program Files\MongoDB\Server\4.2\bin`. You may need to update the 4.2 part when new versions of MongoDB Community Server are released. Click OK to exit all the dialog boxes.

![mongo-shell.png](mongo-shell.png)

To test the installation has worked correctly, open a terminal window and type `mongo`. If a message starting with `MongoDB shell version` appears then the installation has been successful.

Now you're ready to create your first ever database. Enter `use firstdb`. Mongo will create a database called firstdb if there isn't one already or switch to it if it exists. To add some data, type `db.books.insert( { name: "Harry Potter and the Chamber of Secrets", genre: "Fantasy" } )`. The result should be `WriteResult({ "nInserted" : 1 })` which tells you the number of entries inserted.

![firstdb-entry.png](firstdb-entry.png)

This will create a collection called Books (because there isn't already one) and add an entry with the book's name and genre. You can check this by typing `db.books.find()`. Collections are groups of related data so one database can have multiple collections in it. Data is added through keys and values and stored in the database in JSON format. If you've worked with APIs before, chances are you've encountered JSON. To show all collections in the database, type `show collections`. To delete the collection, type `db.books.drop()`.

![find-entry.png](find-entry.png)

Once you've created a few more entries, you'll probably want to find a specific one. Using findOne instead of find will let you search for a specific key-value pair. Make sure the key-value is unique. For example, `db.books.findOne( { "name" : "Harry Potter and the Chamber of Secrets" } )` searches for an entry in the books collection with the name of Harry Potter and the Chamber of Secrets.

If you're looking to delete entries instead, use the deleteOne and deleteMany commands. `db.books.deleteMany( { "genre": "Sci-Fi" } )` deletes entries in the books collection that have the Sci-Fi genre. 

Congratulations, you've now created your first databases and can add, delete and find collections and entries in it. To learn how you can incorporate your newfound database knowledge in a website, look out for Getting to Grips with Databases Part 2: Develop Your First Data-Driven Website.
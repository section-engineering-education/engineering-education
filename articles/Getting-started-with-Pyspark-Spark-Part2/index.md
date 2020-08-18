---
layout: engineering-education
status: publish
published: true
url: /engineering-education/getting-started-with-pyspark-spark-part2/
title: Getting started with PySpark (Spark core and RDDs) - Spark Part 2
description:  This article covers programming with Spark Core and RDD by applying them on a large dataset - Apache Spark is a distributed cluster computing engine that makes the computation of big data efficient.
author: keerthi-v
date: 2020-08-11T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-pyspark-spark-part2/hero.jpg
    alt: PySpark image example
---
Apache Spark is a distributed cluster computing engine that makes the computation of big data efficient. It provides a simple programming interface to program entire clusters with implicit data parallelism. This essentially results in fast computation of big data.  Spark does not require the users to have high end, expensive systems with great computing power. It splits the big data into multiple cores or systems available in the cluster and optimally utilizes these computing resources to the processes this data in a distributed manner. Therefore Spark is a great solution for processing large amounts of data and obtaining results to queries quickly and without overheating the system.
<!--more-->

In this tutorial, we will delve into the core programming concepts of Spark using an example. In this example, we will use a large dataset containing 278,858 users providing 1,149,780 ratings about 271,379 books to realize which book has the most number of ratings.

Python is the most widely used language on Spark, so we will implement Spark programs using their Python API - PySpark. To learn the concepts and implementation of programming with PySpark, install PySpark locally. While it is possible to use the terminal to write and run these programs, it is more convenient to use Jupyter Notebook.

### **Installing Spark (and running PySpark API on Jupyter notebook)**
Step 0: Make sure you have Python 3 and Java 8 or higher installed in the system.

```sh
$ python3 --version
Python 3.7.6
$ java -version
java version "13.0.1" 2019-10-15
Java(TM) SE Runtime Environment (build 13.0.1+9)
Java HotSpot(TM) 64-Bit Server VM (build 13.0.1+9, mixed mode, sharing)

```

Step 1: Download Spark 3 from the [official page](http://spark.apache.org/downloads.html).

Step 2: Extract it from the zip file and move it to any other folder if you want to (preferably home).

```sh
$tar -xzf spark-{version}-bin-hadoop{version}.tgz
```

Step 3: In ~/.bash_profile (for mac) or ~/.bashrc (for linux), add these lines indicating the path of Spark and its bin.

```sh
export SPARK_HOME={path-to-spark}/spark-3.0.0-preview2-bin-hadoop2.7
export PATH=$PATH:$PATH_HOME/bin
```

Step 4: Install jupyter notebook

```sh
$ pip install jupyter
```

Step 5: In ~/.bash_profile (for mac) or ~/.bashrc (for linux), add these lines indicating the configurations of PySpark.

```sh
export PYSPARK_PYTHON=python3
export PYSPARK_DRIVER_PYTHON=jupyter
export PYSPARK_DRIVER_PYTHON_OPTS='notebook'
```

Now restart your terminal and run ‘pyspark’ on it. It should open jupyter notebook and allow you to write and run PySpark programs!

We will be using the [Books](http://www2.informatik.uni-freiburg.de/~cziegler/BX/BX-CSV-Dump.zip) dataset in our example, so download it and place the dataset in the same folder where you will store your PySpark script.

### **Initializing Spark and RDD**

Open Jupyter notebook and let's begin programming!

Import these pyspark libraries into the program.

```python
from pyspark import SparkConf, SparkContext
```

**SparkContext** is the entry point to utilizing Spark functionalities, as it instructs the program to access the clusters. Therefore the SparkContext object should be created for every spark program.

**SparkConfig** object is used to define characteristics of the application we are coding, for example the name of the application, the memory allocated to Driver and Executor nodes etc. This object is then used to build the SparkContext object.

```python
conf = SparkConf().setMaster("local[*]").setAppName("Books")
conf.set("spark.executor.memory", "6G")
conf.set("spark.driver.memory", "2G")
conf.set("spark.executor.cores", "4")
conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
conf.set("spark.default.parallelism", "4")
spark_context =  SparkContext.getOrCreate(conf=conf)
```

Here, setMaster(local[`*`]) denotes that we are configuring the SparkContext to run worker node threads on all available local logical cores. Spark.serializer setting is used to select the kind of data serializer (the process of converting data into a different structure such that storage and transfer to different nodes in a distributed network is efficient while also allowing reconstruction of the original structure of data). We need to serialize our data so that we can store them as Resilient Distributed Datasets (RDDs). Kryo serializer is more efficient than the default Spark serializer - Java Serializer.

**Resilient Distributed Datasets** (RDD) forms the core of Spark programming, providing an abstraction to coding distributed transformations of large datasets by using the RDD object. They can run on a cluster of nodes that are either local or distributed and can handle failure of multiple executor nodes automatically.

### Loading the dataset as RDDs
The functions used to work with RDDs are categorized into 2 types - Transformers and Actions.

Transformers are the operations that can be performed on RDDs. These operations change the data in some way, i.e., they transform the RDD. Spark supports many [transformations](https://spark.apache.org/docs/latest/rdd-programming-guide.html#transformations). Now, we are using map(), along with a lambda function. map() is a transformation function that returns a new distributed RDD in which all the elements of the RDD have been passed through a function, which in this case is a lambda (inline) function that splits every line by ‘“;”’.

Action functions are used to retrieve information from the RDD that may or may not have been transformed. These [actions](https://spark.apache.org/docs/latest/rdd-programming-guide.html#actions) trigger the evaluation of all the transformations that have occurred in the program thus far. *Therefore trying to print a RDD without calling an action function will only print the location of the RDD and not the value.* This is because Spark follows **lazy evaluation.** It only triggers the creation of a DAG. A **DAG (Directed Acyclic Graph)** engine is used to optimize the computation workflows in Spark. This means that results are calculated through the shortest path of computation. So even if a program specifies a workflow involving a number of processes to get a result, the DAG engine only goes through the necessary steps and skips all the computations it deems unnecessary to obtain the same result. So a DAG skips over all unnecessary transformations that the RDD is subjected to. *Calling an action function brings data from the transformed RDD into the driver script, so it is necessary to make sure that the RDD is able to fit into memory!*

In this example, we load the ‘BX-Books.csv’ file into the program, and store it as a RDD. The first action we execute is count() - which returns the number of rows. Next we want to see what the data actually looks like. We *could* use the load() function, which returns the entire dataset as a list. However, since this dataset has over 200,000 rows and we only want to peek at the data, it would not be wise to bring that into memory. Hence we prefer to use take(n) - which returns a list of n rows.

Here, we have loaded the ‘BX-Books.csv’ file and converted it into a RDD, using the SparkContext object and did not perform any transformations on it.

![img](/engineering-education/getting-started-with-pyspark-spark-part2/import.png)

```python
books_file = spark_context.textFile("./BX-CSV-Dump/BX-Books.csv")
print("number of books = ",books_file.count())
print("First 3 rows are - \n",books_file.take(3))
```

Here we applied map() function to the same RDD and that resulted in each line splitting into its own row and parts of the row split into individual elements.

![img](/engineering-education/getting-started-with-pyspark-spark-part2/map.png)

```python
books_file = spark_context.textFile("./BX-CSV-Dump/BX-Books.csv").map(lambda l: l.split(‘;’))
print("number of books = ",books_file.count())
print("First 3 rows are - \n",books_file.take(3))
```

Next, let us count the number of ratings each book has gotten, and print the top 10 books with the most number of ratings. So we have to perform aggregate transformations on the BX-Book-Ratings.csv dataset- counting occurrences of each ISBN (International Standard Book Number), and then sort the dataset based on the count. To implement these special transforms on RDD, we need to convert the dataset into Key-Value (K,V) pairs. (Spark allows only K,V pairs to undergo special transforms.)
Here we pick only the 2nd column (second element of the array) and assign each book a value of 1, denoting that each Book (with ISBN) has occurred once. So (K,V) => (ISBN, 1). Note: If you have read the previous article in the series, this might look familiar. (Hint: MapReduce!)

```python
#import the BX-Book-Ratings.csv file and split it into rows with individual elements
ratings_file = spark_context.textFile("./BX-CSV-Dump/BX-Book-Ratings.csv").map(lambda l: l.split('";"'))
print("First 3 rows are - \n",ratings_file.take(10))
print(" \n K,V pairs are - \n", ratings_file.map(lambda x: (x[1],1)).take(10))
```

![img](/engineering-education/getting-started-with-pyspark-spark-part2/kv.png)

We use filter() to remove the row containing the column names (headers). filter() is a transformation function that picks rows based on whether it passes a specified condition. In this code snippet, we check whether ‘ISBN’ occurs in the 2nd column of the row, and filter that row if it does.

![img](/engineering-education/getting-started-with-pyspark-spark-part2/filter.png)

To count the number of occurrences of each ISBN, we use reduceByKey() transformation function. When reduceByKey is called on a (K,V) pair, it aggregates the value of each key according to the function passed to it. In this example, x represents the aggregated value for a key k, and y is the newly encountered value for the same key k. X and Y are added and assigned to X. This results in an RDD with (K,V) => (ISBN, Count of occurrences)

```python
ratings_kv = ratings_file.filter(lambda x: x[1] != 'ISBN' ).map(lambda x: (x[1],1))
#print(ratings_kv.take(10))
ratings_count = ratings_kv.reduceByKey(lambda x, y: x + y)
print(ratings_count.take(10))
```

![img](/engineering-education/getting-started-with-pyspark-spark-part2/reducebykey.png)

Now, we swap key and value, so that Count of occurrences becomes the key, and ISBN becomes the value. Then we apply sortByKey(), which does exactly what its name states. By default, it sorts in ascending order, so we pass False to retrieve descending order of the count. If we output 10 from the top of this sorted RDD, we get our top 10!

![img](/engineering-education/getting-started-with-pyspark-spark-part2/sort.png)

Right now, we only have the ISBN, and we still don’t know the title of the book. So let us combine both Book-Ratings and Books datasets and retrieve the Book Titles of our top 10.

We do a little preprocessing to make the ISBN strings match between the 2 datasets. Then we use filter() to pick only the rows that have the ISBN that are present in top_10 list from the books_file RDD. Then we use map to select only the Book Title and use collect() action to return all the resulting values in the RDD as a list.

```python
top_10 = []
for i in ratings_sorted.take(10):
    top_10.append('"'+i[1]+'"')
print(books_file.filter(lambda x: x[0] in top_10).map(lambda x: x[1]).collect())
```

![img](/engineering-education/getting-started-with-pyspark-spark-part2/top10.png)

And we’re done! We successfully installed Spark and used its core programming concepts such as actions and transformations on RDDs to quickly derive useful insights from a large dataset. This same example, if run iteratively without using Spark, would heat up your system and take so much more time!

In the next article, we will explore Spark libraries like Spark SQL and Dataframes along with MLLib and use it with the same example to answer more questions about this dataset and provide book recommendations.

### References:
- Taming big data with Apache Spark and Python- Frank Kane

- https://spark.apache.org/docs/latest/api/python/pyspark.html

- https://spark.apache.org/docs/

- http://www2.informatik.uni-freiburg.de/~cziegler/BX/ for dataset

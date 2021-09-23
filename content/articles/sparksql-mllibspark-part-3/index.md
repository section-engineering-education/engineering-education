---
layout: engineering-education
status: publish
published: true
url: /sparksql-mllibspark-part-3/
title: Book Recommendation System using SparkSQL and MLlib- Spark Part 3
description: We will dive into very useful Spark libraries namely SparkSQL and MLlib to build a book recommender using the same dataset from our previous PySpark article.
author: keerthi-v
date: 2020-09-17T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sparksql-mllibspark-part-3/hero.jpg
    alt: SparkSQL and MLlib example image
---
Apache Spark is a distributed cluster computing engine for handling big data. It provides a simple interface to program entire clusters with implicit data parallelism, splits the big data into multiple cores or systems and optimally utilizes these computing resources to process this data in a distributed manner. DAG (directed acyclic graph) manages workflows in Spark, which results in fast computation of big data.
<!--more-->
Spark does not require the users to have high end, expensive systems with great computing power. Therefore it is a great solution for processing big data quickly and without overheating the system.
In the [previous article](/getting-started-with-pyspark-spark-part2/), we installed PySpark and explored Spark Core programming concepts.

We used these concepts to gain useful insights from a large dataset containing 278,858 users providing 1,149,780 ratings for 271,379 books and found the book with the most number of ratings. In this article, we will delve into very useful Spark libraries namely SparkSQL and MLlib to build a book recommender using the same dataset.

### Dataframes
RDD (Resilient Distributed Datasets), which we explored in the previous article, are a great way to perform distributed transformations and store data, especially unstructured data. But for **structured data** which has a fixed number of columns and corresponding values (like the dataset we are using), Spark provides an abstraction that is easy to use - **Dataframes and Datasets**. This way, we can treat our RDDs as databases which support SQL style querying, allowing Spark to further increase the efficiency of each operation.

*Note*: In the recent release of Spark 3, the developers have deprecated RDD programming in their Machine Learning libraries.

[Dataframes and Datasets are part of Spark SQL](https://spark.apache.org/docs/latest/sql-programming-guide.html), which is a Spark module for structured data processing. A **Dataset** is a distributed collection of data. Dataset is an interface that adds the benefits such as increased efficiency provided by SparkSQL’s computation engine to RDDs usage of powerful lambda functions and strongly typed data. A **DataFrame** is a *Dataset* organized into named columns.

Let us see what a dataframe looks like by converting our books dataset (not to be confused with Spark dataset) into a dataframe, and begin coding a book recommender. *Make sure* [*Books Crossing*](https://www.kaggle.com/somnambwl/bookcrossing-dataset) *dataset is downloaded and placed in the same folder where you will store your PySpark script.*

```Python
# importing all the libraries we’ll require to build the book recommender
import sys
from pyspark import SparkConf, SparkContext
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.sql.functions  import *
from pyspark.sql.types import *

# define the configurations for this Spark program
conf = SparkConf().setMaster("local[*]").setAppName("Books")
conf.set("spark.executor.memory", "6G")
conf.set("spark.driver.memory", "2G")
conf.set("spark.executor.cores", "4")
conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
conf.set("spark.default.parallelism", "4")

# create a Spark Session instead of a Spark Context
spark = SparkSession.builder \
    .config(conf = conf) \
  .appName("spark session example") \
  .getOrCreate()
```

[Spark Session](https://medium.com/@achilleus/spark-session-10d0d66d1d24) is a combined entry point to Spark as well as Spark SQL functionalities. Now, we will use the Spark Session to read ‘BX-Books.csv’ into the Pyspark program as a dataframe.

```Python
books_df = spark.read.option("delimiter", ";").option("header", "true").csv('./Dataset/Books.csv')
books_df.show()
```

![img](/engineering-education/sparksql-mllibspark-part-3/books_df.png)


As you can see, a dataframe resembles a table, with each column having a specific type of data.

### SQL Queries using SparkSQL
Now let’s run some SQL style queries on it.

Example 1:  Selecting a certain column

```Python
books_df.select('Book-Title').show()
```

![img](/engineering-education/sparksql-mllibspark-part-3/select.png)

Example 2: Counting number of distinct values in column: 'Publisher', which gives us the total number of publishers in the dataset.

```Python
books_df.select('Publisher').distinct().count()
```

![img](/engineering-education/sparksql-mllibspark-part-3/distinct.png)

SQL queries can also be run as is like this:

```Python
books_df.createOrReplaceTempView('Table')df = spark.sql("SELECT Publisher from Table")df.show()
```

![img](/engineering-education/sparksql-mllibspark-part-3/sql.png)

But it is recommended to run SQL programmatically rather than running an SQL query directly, so we will be following that moving forward.

### Machine Learning using MLlib
To provide recommendations to the users, we need to use data which contains the ratings of different books provided by a lot of users, including the user we will give recommendations to. So we need to import the `Ratings.csv` file into the program, and perform some type conversions on certain columns to make it appropriate for further computations.

```Python
user_ratings_df = spark.read.option("delimiter", ";").option("header", "true").csv('./Dataset/Ratings.csv')
# Columns User-ID, ISBN and Book-Rating were in string format, which we convert to int
ratings_df = user_ratings_df.withColumn("User-ID",
                                        user_ratings_df['User-ID'].\
                                        cast(IntegerType())).\
										withColumn("ISBN", user_ratings_df['ISBN'].\
           								cast(IntegerType())).\
    									withColumn("Book-Rating",\
                                        user_ratings_df['Book-Rating'].\
                                  		cast(IntegerType())).\
        								na.drop()ratings_df.show()

```

![img](/engineering-education/sparksql-mllibspark-part-3/ratings.png)

To provide recommendations based on the ratings given by users, we can use a technique called [Collaborative Filtering](https://en.wikipedia.org/wiki/Collaborative_filtering). This is based on the concept that if person A and B have given similar ratings to the same objects, then they must have similar taste. Therefore, there is a higher probability that person A will like an object they haven’t come across but is rated highly by B.

To perform collaborative filtering, we will use an algorithm called [ALS](https://datasciencemadesimpler.wordpress.com/tag/alternating-least-squares/) (Alternating Least Squares), which will make predictions about how much each user would rate each book and ultimately provide recommendations for every user listed in the dataset. Spark’s machine learning library **MLlib** has the ALS function which we can directly plug into this program.

```Python
# define parameters
als = ALS(maxIter=5, regParam=0.01, userCol="User-ID", itemCol="ISBN", ratingCol="Book-Rating",coldStartStrategy="drop")
#fit the model to the ratings
dataframemodel = als.fit(ratings_df)
```


Now let’s pick a random user, User-ID = 17. This person has rated the following books as shown:

```Python
ratings = ratings_df.filter(col('User-ID')==17)books_df.\
					join(ratings,ratings.ISBN==books_df.ISBN).\
    				select(col('User-ID'),col('Book-Title'),col('Book-Author'),col('Year-Of-Publication'),col('Book-Rating')).\
        			show()
```

![img](/engineering-education/sparksql-mllibspark-part-3/user-rating.png)

Now we use the ALS model that we just trained, and use that to predict the Top 5 recommendations for this user.

```Python
user_id = [[17]]
# convert this into a dataframe so that it can be passed into the recommendForUserSubset
functiondf = sc.parallelize(user_id).toDF(['User-ID'])
num_rec = 5
recommendations = model.recommendForUserSubset(df , num_rec)
recommendations.collect()
# pick only the ISBN of the books, ignore other fields
recommended_ISBN = [recommendations.collect()[0]['recommendations'][x]['ISBN'] for x in range(0,num_rec)]
recommended_ISBN
```

This model predicted the following ISBNs to be the Top 5 recommendations.

![img](/engineering-education/sparksql-mllibspark-part-3/recommendisbn.png)

We would prefer to see the titles of the books, along with a few details rather than just the ISBN. So we look for these books in the ‘books_df’ dataframe and print out the book recommendations.

```Python
# convert the recommended_ISBN list into a dataframe so that it can be joined with books_df
rec_df = spark.createDataFrame(recommended_ISBN, IntegerType())
print('Top ',num_rec,' book recommendations for User-ID ',user_id[0][0], ' are:')
books_df.join(rec_df,rec_df.value==books_df.ISBN).select(col('Book-Title'),col('Book-Author'),col('Year-Of-Publication')).show()
```


![img](/engineering-education/sparksql-mllibspark-part-3/join.png)

### Conclusion
Spark is a fast and efficient framework meant for handling big data. We explored some of the amazing abstractions it provides for performing complex computations on structured data, namely SparkSQL, Dataframes, and MLlib. Using these libraries, we built our own book recommender, which recommends the Top 5 books for a user who has previously rated books in the books dataset.

Values of the User-ID and the num_rec variables can be changed based on requirements. A lot of different applications can be built with these libraries, and there are so many useful functions that they provide. I strongly recommend going through the official [Apache Spark (Pyspark) documentation](https://spark.apache.org/docs/latest/api/python/index.html) and further enhancing your learning and skills!

### References:
- Taming big data with Apache Spark and Python- Frank Kane
- https://spark.apache.org/docs/latest/api/python/pyspark.html
- https://spark.apache.org/docs/
- https://www.kaggle.com/somnambwl/bookcrossing-dataset for the dataset.

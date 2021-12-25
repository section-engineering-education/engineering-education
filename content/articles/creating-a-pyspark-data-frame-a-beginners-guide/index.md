### Introduction
Creating PySpark data frames is the subject of the next section. We will work on RDDs since they are tough to deal with.
### Prerequisite
1. A basic understanding of the Python programming language.
Have a python IDE installed on your system.
2. If you don't have a python IDE, click [here](https://www.python.org/) to install.
### Dataframe creation
You can create a DataFame using one of the following procedures:

1. From a Resilient Distributed Dataset.
2. Getting information from an outside source, like CSV.

Installing the PySpark library will be our first move.
```Python
!pip install pyspark
```
### Using an existing RDD to make a PySpark data frame
The `Parallelize()` method must be used to create an RDD. Then, convert it to a PySpark data frame using the spark session's `createDatFrame()` function.

To achieve this, let's look at the steps below:
#### 1. Import the libraries 
Importing libraries is as shown in the code below:
```Python
from pyspark import SparkContext
from pyspark.sql import SparkSession
```
#### 2. Create a spark context 
This is as shown in the code below:
```python
sparkContext = SparkContext.getOrCreate()
```
To get a spark context for our experiment, we used `getOrCreate()` method. Depending on whether we've previously built one, we may use the `getOrCreate()` function to build or get an instance of a spark context.
#### 3. Create a spark session
Passing a string as an input to `appName()` will allow us to give our application a name. Spark session will be instantiated using `getOrCreate()`, which is the next step. `GetOrCreate()` will utilize an existing spark session if one is available, or it will build a new one if there is no spark session available.
```python
sparkSession = SparkSession.builder.appName('Create PySpark DataFrame From an Existing RDD ').getOrCreate()
```
#### 4. Create the RDD
```python
resilientDistributedDataset = sparkContext.parallelize([('C',80,70,85,91), ('B',80,70,85,91), ("A", 80,78,96,92), ("A", 92,70,89,96)], 4)
```
The spark context's `parallelize()` method was utilized to parallelize the calculation.

The `resilientDistributedDataset` data type will determine RDD creation success or failure. We should get `pyspark.resilientDistributedDataset.RDD` as a result. This is seen in the code below:
```Python
print(type(resilientDistributedDataset))
```
Output:
```bash
<class 'pyspark.rdd.RDD'>
```
#### 5. Convert the RDD into PySpark DataFrame
```python
subjects = ['Division','Kiswahili','Biology','Agriculture','Mathematics']
ourMarks_df = sparkSession.createDataFrame(resilientDistributedDataset, schema=subjects)
```
In this case, the RDD is sent as data. The schema parameter of the `createDataFrame()` method will be filled with previously produced string topics.

We'll look at the data type of `ourMarks_df` below to see if everything is working correctly. 
```Python
print(type(ourMarks_df))
```
Output:
```bash
<class 'pyspark.sql.dataframe.DataFrame'>
```
Using the `printSchema()` method, we can analyze the schema, which is useful when we have many columns.
```Python
ourMarks_df.printSchema()
```
Output:
```bash
root
 |-- Division: string (nullable = true)
 |-- Kiswahili: long (nullable = true)
 |-- Biology: long (nullable = true)
 |-- Agriculture: long (nullable = true)
 |-- Mathematics: long (nullable = true)
```
#### 6. Displaying data frame contents 
It's possible to display the file's contents using the PySpark data frame object's `show()` function.
```Python
ourMarks_df.show()
```
Output:
```bash
+--------+---------+-------+-----------+-----------+
|Division|Kiswahili|Biology|Agriculture|Mathematics|
+--------+---------+-------+-----------+-----------+
|       C|       80|     70|         85|         91|
|       B|       80|     70|         85|         91|
|       A|       80|     78|         96|         92|
|       A|       92|     70|         89|         96|
+--------+---------+-------+-----------+-----------+
```
> To see the whole code for this [click here](https://colab.research.google.com/drive/1Ykwifphdj2mLQ9rhKuX309aXq-tGurTD?usp=sharing)
### Creating Python data frame from an external file using PySpark
The external files will be imported using the spark session's `read()` function. A data frame object will be created as a result of this action. The techniques to import these file formats are practically comparable, and one may import them with minimal effort.

In contrast to the previous method, this one is simple and requires a spark session to produce a PySpark data frame from a Resilient Distributed Dataset.

#### 1. Importing the libraries:
```Python
from pyspark.sql import SparkSession
```
#### 2. Creating the spark session
```python
sparkSession = SparkSession.builder.appName('Creating PySpark dataframe from an external file').getOrCreate()
```
Using `appName(),` we can retrieve the application's name by passing a string. It is possible to leverage an existing spark session or build a new one using the `getOrCreate()` method.
#### 3. Read the external files into the PySpark data frame
The external file format that we will use and import comprises a CSV file.

```python
ourCSV_file = sparkSession.read.csv('IncomeAndGender.csv', sep = ',', inferSchema = True, header = True)
```
Delimiters for the CSV file are given (as a comma). Afterward, the inferSchema property was set to True. CSV files will be automatically transformed into PySpark data frames with this command.
Let's have a look at the PySpark data frame's data kinds:
```python
print(type(ourCSV_file))
```
Output:
```bash
<class 'pyspark.sql.dataframe.DataFrame'>
```
We can also check the schema:
```python
ourCSV_file.printSchema()
```
Output:
```bash
root
 |-- Salary: double (nullable = true)
 |-- Gender: integer (nullable = true)
 |-- AgeNumber: double (nullable = true)
 |-- PhD: string (nullable = true)
```
> To see the complete code for this [click here](https://colab.research.google.com/drive/1u04j9muZ1FdDvr2oxeuSGST5Lva9es9j?usp=sharing). In addition, the CSV file that we used here was initially created in our notebook.

### Other methods 
#### 1. Converting PySpark data frame to a Pandas data frame
The PySpark data frame can be converted to a Pandas data frame, and Pandas techniques can be used on our data frame, which is incredibly convenient.
```python
csvToPandas = ourCSV_file.toPandas()
```
To ensure that everything works correctly, let's look at the data type of our new data frame.
```python
type(csvToPandas)
```
Output:
```bash
pandas.core.frame.DataFrame
```
#### 2. Reading multiple files
In the `read()` method, we can pass a list of file paths as a string type, creating and allocating a PySpark data frame in the variable `csvToPandas.` A shared data frame should not be deemed significant while reading several files at the same time.
### Reference
1. See full code for [creating PySpark data frame from an external file](https://colab.research.google.com/drive/1u04j9muZ1FdDvr2oxeuSGST5Lva9es9j?usp=sharing).
2. See whole code for [creating a PySpark data frame using an existing Resilient Distributed Dataset](https://colab.research.google.com/drive/1Ykwifphdj2mLQ9rhKuX309aXq-tGurTD?usp=sharing)
3. [pyspark.sql.DataFrame](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.sql.DataFrame.html)
### Conclusion
Compared to `read()` methods, `parallelize()` is better, but it necessitates more work. When we need to fast scan a CSV file, the `read()` methods are helpful. Many options are available when making changes to a PySpark data frame.

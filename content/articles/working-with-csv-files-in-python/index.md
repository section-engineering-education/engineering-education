---
layout: engineering-education
status: publish
published: true
url: /working-with-csv-files-in-python/
title: Working with CSV files in Python
description: This article will cover the basics of working with csv files in Python. The article will explain how to read,clean and analyze data from csv files.
author: kelvin-munene
date: 2021-10-21T00:00:00-07:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/working-with-csv-files-in-python/hero.png
    alt: Working with CSV files in Python
---

### Introduction
CSV (Comma Separated Values) is a basic file format for tabular data. Most programs create CSV files. They allow you to export and import data from spreadsheets and databases. For example, they can be exported to a CSV file and imported into a spreadsheet to analyze, graph, or publish data mining results.

These files are quite easy to use in programming. CSV files may be directly accessed and manipulated by text file input and string manipulation language.

### Prerequisite
- Have [python IDE](https://www.python.org/downloads/) installed.
- Have some background information in the python programming language.

### Table of contents

- [Introduction](#introduction)
- [Prerequisite](#prerequisite)
- [Table of contents](#table-of-contents)
- [Write a CSV file](#write-a-csv-file)
  - [Using csv.writer class](#using-csvwriter-class)
  - [Using csv.DictWriter class](#using-csvdictwriter-class)
- [Read a CSV file](#read-a-csv-file)
  - [reading from a specific row](#reading-from-a-specific-row)
  - [Read a precise Column](#read-a-precise-column)
  - [Manupulate csv files](#manupulate-csv-files)
- [Working with large CSV files in Python](#working-with-large-csv-files-in-python)
  - [Using pandas.read_csv](#using-pandasread_csv)
- [Convert multiple JSON files to CSV files](#convert-multiple-json-files-to-csv-files)
- [Creating a data frame using CSV files](#creating-a-data-frame-using-csv-files)
- [Conclusion](#conclusion)


### Write a CSV file
Python provides a built-in CSV module. This module contains two CSV-writing classes:
- Using `CSV.writer` class
- Using `CSV.DictWriter` class

#### Using csv.writer class
csv.writer writes data to a CSV file. By default, user data is transformed into a delimited string. The CSV file object will not be recognized if quoted fields do not include `\n`.

To write to a CSV file, use the writer class. There's also `writerows()`.

- `writerow()`: This technique writes one row. This technique may create a field row.
- `writerows()`: This technique writes numerous rows at once. This is for row lists.


To illustrate the use of the `writerow()` class, let's create a student_file.csv as shown below.

```python
import csv
with open('student_file.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["2021", "Student details"])
    writer.writerow([1, "carteblanche kin", "computer science"])
    writer.writerow([2, "Marion koech", "data science"])

```

The code above will output the following file-

```bash
2021, Student details
1, carteblanche kin, computer science
2, Marion koech, data science
```

To illustrate the use of the `writerows()` class lets create a student_file.csv as shown below:

```python
import csv
csv_rowlist = [["2021", "Student details"], [1, "carteblanche kin", "computer science"],
               [2, "Marion koech", "data science"]]
with open('protagonist.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerows(csv_rowlist)
```

The program's output is as in `writerow()` example above. 

#### Using csv.DictWriter class
This class builds a column-to-dictionary writer object. This class supports two CSV writing methods. They are:

- `writeheader()`: A simple CSV file with field names you choose publishes the first row.

- `writerows()`: writerows() writes all rows but just values.

### Read a CSV file
The CSV module or Panda's library can read CSV files. To be able to read CSV files, one can use one of the below methods:

- **USing csv.reader():** The CSV file is first opened using the `open()` function in `r` mode (specify read mode when opening a file) and then read using the `reader()` method of the CSV module.


> The `with` keyword simplifies exception handling and immediately ends the CSV file.

- **Using CSV.DictReader() class:** The CSV file is opened using `open()`, then read using the CSV module's `DictReader` class, which works like a reader but converts CSV data to a dictionary. The file's first line contains dictionary keys.

- **Using pandas.read_csv() method:** Using pandas library methods to read a CSV file is straightforward. Pandas read `csv()` reads data from CSV files.

Consider the `fonteds.csv` CSV file. This is the file used to illustrate one of the methods.

![Giant file](engineering-education/working-with-csv-files-in-python/image4.png
)

```python 
import pandas
csvFile = pandas.read_csv('fonteds.csv')
print(csvFile)
```

The output 

```bash 
SCHOOL            CEO         YEAR

0 KU    JACOB MUDAVAI         2010

1 MUST   GARETH JASON         2015

2 MMU   DICKSON NJOGU         2013
```

From the code above, `import pandas` is used to import the pandas module, `csvFile = pandas.read_csv('fonteds.csv')` is used to read the fonted.csv file and `print(csvFile)` is used to output the read csv file. 

#### reading from a specific row
Here we will create a CSV file with multiple rows and columns to illustrate how to read from a specific row.

Create a CSV file by entering the below data in your notepad and saving it as `student-data.csv`. The file will be used to show how to manipulate the CSV files.

```bash
RegNo   Name        Course  year-of-study   Department
001     James       BCS     2.1             Computing
002     John        BFF     1.2             IT
003     Christine   BSS     4.2             SPAS
004     Lilian      BCOM    3.1             Business
005     Beth        BIT     2.2             IT
```

To read a specific row in the CSV file we use the `read_cv` function from the panda's library. The example below illustrates how to read from a specific row.

```python
# Import Pandas 
import pandas as pd
# Specify the file location of our CSV file
data = pd.read_csv('File-location/student-data.csv')
# Extract top four data of the specified rows
print (data[0:4]['year-of-study'])
```

The above code will output the following information:

```bash
0   2.1
1   1.2
2   4.2
3   3.1
Name: Name, dtype: float64
```

#### Read a precise Column
The panda's library's `read_csv` method may additionally read specified columns. This is done using the `.loc()` multi-axes indexing function. First, let's look into an example program. This example will show the `Name` and `Course` columns for all rows.

> We will use the `student-data.csv` file from the previous example.

```python
# Import the Pandas module
import pandas as pd
# Specify the file location of our CSV file
data = pd.read_csv('File-location/student-data.csv')
print (data.loc[:,['Name','Course']])
```

The  output

```bash
    Name        Course  
0   James       BCS                  
1   John        BFF                
2   Christine   BSS                
3   Lilian      BCOM               
4   Beth        BIT    
```

#### Manupulate csv files
Since you can't edit a CSV file while reading from it, you must create a new one and write to it.

> We will use the `student-data.csv` file from the previous example.

From the `student-data.csv` file above, the data is written using uppercase. To demonstrate how to edit and save CSV files, we will change the uppercase letters in our file to lower case letters.

```python
with open('student-data.csv','r') as f:
    with open('lowwer-case.csv','w') as ff:
        ff.write(f.readline())
        ff.write(f.read().lower())
```

The above code creates a new CVS file with all letters in it changed to lower case.

### Working with large CSV files in Python
When dealing with CSV data, usually read it in using pandas before munging and analyzing it. However, reading huge files straight into pandas may be difficult (or impossible) on a consumer machine due to memory constraints.

While it is simple to load data from CSV files into a database, there may be situations when you don't have access to or don't want to set up a database server. However, if you need to look at data in these big files for a short time, here is one method to accomplish it using Python, and pandas.

Here is a method for handling large.csv files. The dataset we will be using is [gender_voice_dataset](/engineering-education/working-with-csv-files-in-python/voice.csv).

#### Using pandas.read_csv
Large files may be handled by reading them in manageable size pieces, processing them before reading the next part. The chunk size option determines the number of lines. This method returns an iterator. For processing, a section of the file is read at a time.

To read a dataset without chunks, use the code below:

```python

import pandas as pd # import pandas module
import numpy as np  # Import numpy module
import time         # import time module

s_time = time.time() # This initilizes time module
df = pd.read_csv("voice.csv") # This captures the time taken to read data from our file 
e_time = time.time()

print("Read without chunks: ", (e_time-s_time), "seconds") # print command is used to output the line specified while e_time-s_time outputs the time in seconds

df.sample(10) # This specifies the time taken, 10 seconds

```

![Output](/engineering-education/working-with-csv-files-in-python/image1.png)


### Convert multiple JSON files to CSV files
A JSON file contains basic data structures and objects in JavaScript Object Notation (JSON). The most common use case is sending data between an internet app and a server.

A CSV file is created by concatenating/merging/joining several JSON files (at least one column must be the same in each file) and saving the result as a flattened data frame. The following sample will help you understand the task's whole procedure:

**Example program:**

We'll input two JSON files and output a CSV. The used JSON files are:

`first.json file`

```JSON
{
    "NO":{ // Declaring the regestration number of the student
        "001":11,
        "002":12,
        "003":13,
        },
    "Name":{// Declaring the name of the student
        "001":"Kelvin",
        "002":"Dennis",
        "003":"John",
        },
    "Marks":{// Declaring the marks of the student
        "001":80,
        "002":84,
        "003":30,
        },
    "Grade":{// Declaring the grade of the student
        "0011":"A",
        "002":"A",
        "003":"D",
        }
}
```

`second.json file`

```JSON
{
     "NO":{ // Declaring the regestration number of the student
        "001":14,
        "002":15,
        "003":16,
        },
    "Name":{ // Declaring the name of the student
        "001":"Mark",
        "002":"James",
        "003":"Avatar",
        },
    "Marks":{ // Declaring the marks of the student
        "001":55,
        "002":90,
        "003":65,
        },
    "Grade":{ //  Declaring the grade of the student
        "0011":"C",
        "002":"A",
        "003":"B",
        }
}
```

Follow the steps below to be able to convert
- Load JSON files with a pandas data frame.
- Merge the data frames.
- Create a CSV file from the concatenated data.

The result is shown in the code

```python
import pandas as pd
df1 = pd.read_json('first.json')#
print(df1)
df2 = pd.read_json('second.json')
print(df2)
df = pd.concat([df1,df2])
print(df)
df.to_csv("CSV.csv",index=False)
result = pd.read_csv("CSV.csv")
print(result)
```

The output:

![Output](/engineering-education/working-with-csv-files-in-python/image2.png)

### Creating a data frame using CSV files
As with an excel file, CSV files include comma-separated values. Pandas is the core Python data science module. When evaluating data, we often deal with large datasets in CSV format. Creating a pandas data frame from CSV files is easy.

Download the example CSV file [here](https://www.kaggle.com/saurav9786/cardiogoodfitness).

A dataframe can be created by:

- read_csv() method
-  read_table() method
- csv module

Let's look at an example using the read_table() method.

```python
import pandas as pd
df = pd.read_table("dataframe.csv", delimiter =", ")
print(df.head())
```

![Output](/engineering-education/working-with-csv-files-in-python/image3.png)

### Conclusion 
Thank you for reading to the end. This tutorial taught us how to work with CSV files in Python. We have learned how to write and read CSV files, work with large CSV files, convert multiple JSON files to CSV files, and finally, create a data frame using CSV files. 

Happy cording!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)

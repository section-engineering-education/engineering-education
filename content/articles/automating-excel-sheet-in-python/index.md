---
layout: engineering-education
status: publish
published: true
url: /automating-excel-sheet-in-python/
title: Automating Excel Sheet in Python
description: This article will guide the reader on how to set up the automation of excel sheets in Python using Python libraries.
author: kennedy-ndutha
date: 2022-05-01T00:00:00-13:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automating-excel-sheet-in-python/hero.png
    alt: Automating Excel Sheet in Python Hero Image.
---
Python is full of rich libraries, useful packages, and ready-to-use functions for automation that greatly facilitate testing. Python allows you to choose what is best for your project.
<!--more-->
In this article, we are going to implement Python libraries and excel data to automate. It will help us gain a better understanding of Python and Excel.

### Table of contents
- [Prerequisites](#prerequisites)
- [Overview](#overview)
    - [Python overview](#python-overview)
    - [MS Excel overview](#ms-excel-overview)
- [Analyzing the Excel dataset](#analyzing-the-excel-dataset)
- [Scheming pivot tables using Pandas](#scheming-pivot-tables-using-pandas)
- [Generating the reports using Openpyxl library](#generating-the-reports-using-openpyxl-library)
- [Automating the report using Python](#automating-the-report-using-python)
- [Scheduling the Python scripts](#scheduling-the-python-scripts)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need to have;
- Basic knowledge of the  Python programming language.
- Knowledge of working with Python libraries.
- Knowledge of MS Excel.

### Overview
A brief understanding of Python and MS excel will help us navigate through the automation process. We will go into their history, how they came to be, and why we chose them for our project.

#### Python overview
Python is an intelligent, object-arranged programming language with many elements that utilize a mediator to handle code scraps. Since it works at the order brief, it very well may be utilized to play out a framework approach essentially to all working frameworks.

In case you have not installed Python [here](https://realpython.com/installing-python/) is a guide on how to install Python and test it in your operating system.

Why do we prefer Python over other programming languages:
- It is a free and open-source programming language - you can download Python and install it from this [website](https://realpython.com/installing-python/) freely.
- Python is an easy-to-use language - beginners with little knowledge in programming can easily learn Python syntax and understand it.
- It additionally upholds object - situated programming empowers the client to compose decipherable and reusable codes.

#### MS Excel overview
Microsoft Excel is a bookkeeping sheet device created by Microsoft in 1987 for Windows, MacOS, Android, and iOS. It has filled in ubiquity throughout the years due to its effortlessness in directing 'CRUD' activities at the beginning of information. 

It also supports many formulae while retrieving data from MS Excel files.

### Analyzing the Excel dataset
In this section, we will analyze the dataset that I have prepared in Excel. You can download the data from [here] (https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/exam-results-list-excel-table.xlsx). 

The dataset is already in the `.csv` extension, which we need to change to the ".xslx` format for us to be able to automate. We will use the data above to generate the data below:

![data](/engineering-education/automating-excel-sheet-in-python/data.png)

### Scheming pivot tables using Pandas
We will need to import the following Python libraries into our workspace to make the pivot table:

```python
import pandas as pd
import Openpyxl
from Openpyxl import load_workbook
from Openpyxl.sytles import Font
from openpyxl.chart import BarChart, Reference
import string
```

The 'Pandas' library is used to analyze Excel files and create pivot tables in Excel. Python's 'Openpyxl' module is intended to make Excel calculations and create graphs and spreadsheets.

In case you have not installed the `Openpyxl` library, run the command below in your command prompt to add it to your workspace:

```python
pip install pandas 
```

Our Excel sheet should be in the same location as our Python script. `Load_workbook` function, imported from the Openpyxl library, will be used to design our report. 

You can learn more about the Python library [here](https://docs.python.org/3/library/)

#### Viewing Excel data
To read our excel file, we will use `pd.read_excel()` function as demonstrated in the code snippet below:

```python
    # excel file
excel_file = pd.read_excel('student_results.xlsx')
    # columns names in the file
excel_file[['Student Name' , 'course' , 'Date' , 'points']]
```

The following results will be displayed after running the code above:

![Output](/engineering-education/automating-excel-sheet-in-python/output.png)

#### Pivot table
To create our pivot table, we are going to use the `.pivot_table()` function to showcase the student_results. To pivot the total points attained by students of different courses, we will run the code snippet below:

```python
report_table = excel_file..pivot_table(index='Student Number', columns='Course' , values='points' , aggfun='sum').round(0)
```

The report will be as shown below:

![Pivot table](/engineering-education/automating-excel-sheet-in-python/pivot.png)

The above `aggfun = 'sum'` pivot_table function is used to calculate the sum of points in the columns grouped by the course. The `.round (0)` function is for null return.

The function `_to_excel()` will be used to export our excel file. Inside the brackets, we will specify the name of the output Excel file (report_2021.xlsx). It is followed by the sheet name we are going to generate (report), and the pivot table cell (5).

The code below will send the report table to an Excel file:

```python
report_table.to_excel('report_2021.xlsx' , sheet_name='Report' , startrow=5)
```

### Generating the reports using Openpyxl library
In this section, we will use the `load_workbook` function that will be used to access the workbook and use its `.save()` function to save the workbook. The loading and saving of the workbook will be done every time we modify the workbook and it will be done once.

We are required to identify the maximum and minimum active columns and rows to ensure that even if we add more data to the Excel sheet, the code will keep working.

The code below illustrates the maximum and minimum rows and columns:

```python
Minimum Columns: 4
Maximum Columns: 15
Minimum Rows: 1
Maximum Rows: 5
```

This is verified by the original `report.xlsx` file that we exported shown below:

![Maximum and minimum rows and columns](/engineering-education/automating-excel-sheet-in-python/maxmin.png)

### Automating the report using Python
After designing our report, the next and most important part is to automate it. In this part, we will compose all the code utilizing one function to make it simple to automate our report.

Putting the code under the same function ensures that next time we are required to automate the report, we will only have to specify the file name and run the code. [Here](https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/index.md) is our complete code.

You can apply the function `automate_excel('student_results.xlsx')` if you are only dealing with single data points. In the case of multiple data, the criteria remains the same. 

We need to apply the functions one by one to get the required reports. For example, if we need to generate two reports, we use the code snippet below:

```python
automate_excel('student_results1.xlsx')
automate_excel('student_results2.xlsx')
```

### Scheduling Python scripts
At this point, we've finished up with all the code. Next, we need to use the task scheduler to `run` the Python script at various times based on the data needs. The data may need to be sent daily, weekly, or even monthly. 

With that, we have successfully automated our excel file simply and understandably.

### Conclusion
This article that give the reader a simple and direct guide on how to automate excel files in Python with clear and simple steps. You may share your experience of setting up the automation with excel in Python in the comment section below. 

Thank you! Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
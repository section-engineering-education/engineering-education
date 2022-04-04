### Introduction
Python has rich libraries useful packages and ready-to-use functions for automation that greatly facilitates testing. Python allows you to choose what's best for your project.
In this article we are going to implement python libraries and excel data to automate. Follow along.

### Table of content
- [Introduction](#introduction)
- [Table of content](#table_of_content)
- [Prerequisites](#prerequisites)
- [Overview](#overview)
- [Analyzing the Excel Dataset](#analyzing _the_excel_dataset)
- [Scheming a Pivot Tables using Pandas](#scheming_a_pivot_tables_using_pandas)
- [Generating the Reports using Openpyxl library](#generating_the_reports_using_openpyxl_library)
- [Automating the Report Using Python](#automating_the_report_using_python)
- [Scheduling the Python Script](#scheduling_the_python_script)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need to have;
- Basic knowledge of Python Python
- Knowledge of working with Python libraries
- Knowledge of MS Excel.

### Overview
A brief understanding of python and MS excel, will help us navigate through the automation process. We will go into their history, how they came to be, and why we chose them for our project.

#### Python Overview
Python is an intelligent, object-arranged programming language with many elements that utilize a mediator to handle code scraps. Since it works at the order brief, it very well may be utilized to play out a framework approach essentially all working frameworks.

In case you have not installed python [here](https://realpython.com/installing-python/) is a guide on how to install Python and test in your operating system.

Why do we prefer python over other programming language:
- It is free and open-source programming language that you can download and install it from their [website](https://realpython.com/installing-python/) freely.
- Python is an easy to use language:- Beginners with little knowledge in programming can easily learn python syntax and understand.
- It additionally upholds object-situated programming that empowers the client to compose decipherable and reusable codes.

#### MS Excel Overview
Microsoft Excel is a bookkeeping sheet device created by Microsoft in 1987 for Windows, macOS, Android, and iOS that has filled in ubiquity throughout the years due to its effortlessness in directing 'CRUD' activities at the beginning of information. It also supports multiple formulae while retrieving data from excel files.

### Analyzing the Excel dataset
In this section, we will analyze the dataset that I have prepared in Excel. You can download the data from [here] (https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/exam-results-list-excel-table.xlsx). The dataset is already in the `.csv` extension, which we are required to change to the ".xslx` format for us to be able to automate. we will use the above data in generating the below.

![data](/engineering-education/automating-excel-sheet-in-python/data.png)

### Scheming a Pivot Tables Utilizing Pandas
To create the pivot tablewe are will be required to import the following python libraries in our workspace.

```python
import pandas as pd
import Openpyxl
from Openpyxl import load_workbook
from Openpyxl.sytles import Font
from openpyxl.chart import BarChart, Reference
import string
```

`Pandas` library is utilized to read Excel files to develop pivot tables and move them to Excel. Python's `Openpyxl` module is designed to compose Excel algorithms and create charts and spreadsheets. In case you have not installed  `Openpyxl` library, run the command below in your command prompt to add it in your workspace.

```python
pip install pandas 
```

Keep in mind that our Excel sheet is in the same location with our python script. After that run the code below to read your excel file. `Load_workbook` function as imported from Openpyxl library will be used to design our report. You can learn more about the Python library [here](https://docs.python.org/3/library/)

#### Veiwing excel data
To read our excel file, we will use `pd.read_excel()` function as demonstrated in the snippet below. 

```python
    # excel file
excel_file = pd.read_excel('student_results.xlsx')
    # columns names in the file
excel_file[['Student Name' , 'course' , 'Date' , 'points']]
```
The following results will be displayed after renning the above code

![Output](/engineering-education/automating-excel-sheet-in-python/output.png)

#### Pivot Table
To create the pivot table, we are going to use the `.pivot_table()` function to showcase the student_results. If we want to pivot the total points attained by students of different courses, we will run the code snippet below.

```python
report_table = excel_file..pivot_table(index='Student Number', columns='Course' , values='points' , aggfun='sum').round(0)
```

The report will be as shown below

![Pivot Table](/engineering-education/automating-excel-sheet-in-python/pivot.png)



The above `aggfun = 'sum'` pivot_table function is used to calculate the sum of points in the columns grouped by the course. The `.round (0)` function is for null return.
The function function `_to_excel()` will be used to export our excel file. Inside the brackets, we will specify the name of the output Excel file (report_2021.xlsx), followed by the sheet name we are going to generate (report), and the pivot table cell (5).
The code will send the report table to an excel file.

```python
report_table.to_excel('report_2021.xlsx' , sheet_name='Report' , startrow=5)
```

### Generating the Reports using Openpyxl library
In this section, we will use `load_workbook` function that will be used to access the workbook and use its `.save()` function to save the workbook. The loading and saving of the workbook will be done every time we modify the workbook, and it will be done once.
We are required to identify the maximum and minimum active columns and rows to ensure that even if we add more data to the excel, the code will keep working.

We can try to illustrate the maximum and minimum rows and columns as shown below

```python
Minimum Columns: 4
Maximum Columns: 15
Minimum Rows: 1
Maximum Rows: 5
```
This is verified by the orignal `report.xlsx` file that we exported.

![Maximum and Minimum Rows and Columns](/engineering-education/automating-excel-sheet-in-python/maxmin.png)

### Automating the Report Using Python
After designing our report, the next and most important part is to automate it. In this part, we will write all the code using one function to make it easy to automate our report. Putting the code under the same function ensures that next time we are required to automate the report, we will only have to specify the file name and run the code. [Here](https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/index.md) is our complete code.
You can apply the function `automate_excel('student_results.xlsx') if you are only dealing with single data points. In the case
of multiple data, the criteria are the same. You need to apply the functions one by one to get the required reports. For example, if you need to generate two reports, you can use the code snippet below.

```python
automate_excel('student_results1.xlsx')
automate_excel('student_results2.xlsx')
```

### Scheduling Python Script
At this point, we've finished all of the code, and it's time to use the task scheduler to `run` the Python script at various times based on the data needs, which may be daily, weekly or even monthly. And with that, we have successfully automated our excel file in a simple and understandable way.

### Conclusion
This is one of the articles that give the learner a simple and direct guide on how to automate excel files in Python with clear, simple steps and easily explained steps.
It would be my pleasure if you could share the experience of setting up the automation of excel sheets in Python in the comment section below. Thank you!

Happy Coding!!
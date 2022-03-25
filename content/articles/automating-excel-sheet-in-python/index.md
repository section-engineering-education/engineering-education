### Introduction
Python has rich libraries useful packages and ready-to-use functions for automation that greatly facilitates testing. Python allows you to choose what's best for your project.

This article will help in data analysis where most organizations are trying innovative ways to simplify data. Most organizations execute data analysis by connecting their data source to a programming language and automating it, as we shall discuss in this article.

### Prerequisites
- Basic knowledge of MS Excel.
- Basic knowledge in Python.
- Basic Knowledge of Python libraries.

### Table of content
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of content](#table_of_content)
- [Overview](#overview)
- [Analyze the Excel Dataset](#analyze_the_excel_dataset)
- [Create a Pivot Tables using Pandas](#create_a_pivot_tables_using_pandas)
- [Design the Reports using Openpyxl](#design_the_reports_using_openpyxl)
- [Automate the Report with Python](#automate_the_report_with_python)
- [Schedule the Python Script](#schedule_the_python_script)
- [Conclusion](#conclusion)
### Overview
In this section, we will try and understand what we mean by the terms python and MS Excel. We will navigate from their history to their emergence and why we preferred them in our project.

 #### Python Overview
Python is an interactive object-oriented programming language that has incorporated multiple attributes and uses an interpreter to process blocks of codes. It can be used to make a system call on almost all the operating systems since it operated n the command prompt.

In case you have not installed python [here](https://realpython.com/installing-python/) is a guide on how to install Python and test in your operating system.
 There are key features that make python be chosen over so many other programming languages. Below are some of these features.
 - It is free and open-source:- you can download and install it from their [website](https://realpython.com/installing-python/).
 - Python is a user-friendly language:- Beginners with little knowledge in programming can easily learn python syntax and understand.
 - It also supports object-oriented programming that enables the user to write readable and reusable codes.

 #### MS Excel Overview
Microsoft Excel is a spreadsheet tool developed by Microsoft in 1987 for Windows, macOS, Android, and iOS that has grown in popularity over the years because of its simplicity of conducting 'CRUD' operations onset of data. It also supports multiple formulae while retrieving data in excel files.

### Analyze the Excel Dataset
In this section, we will analyze the dataset that I have prepared in excel. You can access the data [here](https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/exam-results-list-excel-table.xlsx) and download it in your workspace. The Dataset is already in the `.csv` extension which we are required to change in `.xslx` format for us to be able to automate. 

### Create a Pivot Tables using Pandas
In this part, we are required to design the pivot Tables But in order to achieve that we will be required to import the following libraries in our workspace
```python
import pandas as pd
import Openpyxl
from Openpyxl import load_workbook
from Openpyxl.sytles import Font
import string
```
`Pandas` is used to read Excel files, develop pivot tables, and transfer them to Excel. `Openpyxl` library in python is used to write excel formulas create charts and spreadsheets in python. 
In order to read and access the excel file that we are working with, ensure that your excel file is in the same location as your python scripts. After that run the code below to read your excel file. `Load_workbook` function as imported from Openpyxl library will be used to design our report. You can learn more about the Python library [here](https://docs.python.org/3/library/)

```python
    # excel file
excel_file = pd.read_excel('student_results.xlsx')
    # columns names in the file
excel_file[['Student Name' , 'Exam Name' , 'Date' , 'points']]
```
After reading the `excel_file` data next requirement is to create the pivot table. We are going to use `.pivot_table()` function to showcase the student_results. We will achieve that by running the code below.

```python
report_table = excel_file..pivot_table(index='Student Name', columns='Exam Name' , values='points' , aggfun='sum').round(0)
```
The above `aggfun = 'sum'` pivot_table function is used to calculate the sum of dataframe in multiple columns, `.round(0)` function is for null return.
After creating a pivot table next step is to export it in the same location as our python script using the line of code below.
```python
report_table.to_excel('report_2022.xlsx' , sheet_name='Report' , startrow=6)
```
The above code sends the report table to an excel file. Therefore, the folder is now in the same directory as our Python script.

### Design the Reports using Openpyxl
The next step in our automation is to design the report. We will use the `load_workbook` function that we imported in our libraries and save it using the .`save()` function. The code snippet below shows how this is achieved

```python
    # loading workbook and selecting sheet
wb = load_workbook('report_2022.xlsx')
    # accessing sheet named Report
sheet = wb ['Report']
    # referencing original active spreadsheet
min_column = wb.active.min_column
max_column = wb.active.max_column
min_row = wb.active.min_row 
max_row = wb.active.max_row 
```

### Automate the Report with Python
After Designing our Report next and most important part is to automate. In this part, we will write all the code using one function to make it easy to automate our report. [Here](https://github.com/taves-hub/Automating-excel-sheet-in-python/blob/main/Python/index.md) is our complete code.

### Scheduling Python Script
At this point, we've finished all of the code, and it's time to use the task scheduler to `run` the Python script at various times based on the data needs. And with that, we have successfully automated our excel file in a simple and understandable way.

### Conclusion
This is one of the articles that have given the learner a simple and direct guide on how to automate excel files in python with clear simple steps and easily explained steps. 

It would be my pleasure if you can share the experience of setting up the Automation of excel sheet in python in the comment section below. Thank you!

Happy Coding!!
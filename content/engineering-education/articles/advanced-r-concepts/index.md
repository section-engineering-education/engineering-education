---
layout: engineering-education
status: publish
published: true
url: /engineering-education/advanced-r-concepts/
title: Advanced Programming Concepts in R
description: In this article we will be going over some advanced aspects of the R programming language, such as data frames, typecasting, file handling, and loop statements.
author: lalithnarayan-c
date: 2020-10-29T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/advanced-r-concepts/hero.jpg
    alt: r programming language example image
---
In the first [article](/engineering-education/introduction-to-r/), we covered the R programming language basics. In this article, we will look at some of the advanced aspects of the R programming language. Going through this article will enhance a developer's ability to implement [Object-Oriented Programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming) concepts and write modular code. We will be covering the following topics in this article:
<!--more-->

- Data Frames
- Typecasting
- File Handling
- Working with Inbuilt Datasets
- Conditional Statements
- Loop Statements

### Data frames
R is a programming language built for statistical analysis of large datasets. Data frames help by storing large datasets in the local memory. They enable operations such as Create, Read, Update, and Delete (CRUD) to be performed efficiently. Formally, they are defined as: A table or a two-dimensional array-like structure in that each column contains values of one variable, and each row contains one set of values from each column".

Let's look at an example to define a data frame. We will describe several vectors storing different data types. The example considered below is a simplified version of a real dataset. Real datasets have much more variation with respect to the data.

For instance, we use the alphabet as dummy data. Real datasets have much more detailed information such as nouns, verbs, adjectives, etc. Real datasets contain columns of different data types. The data most often belong to the Boolean, character, or numeric data types.

```r
vector_1 <- c("a","b","c","d","e") # creating a vector of 5 characters
vector_2 <- c("A","B","C","D","E") # creating a vector of 5 different characters
vector_3 <- c(1,2,3,4,5) # creating a vector with numerical entries
vector_4 <- c(2,4,6,8,10)
vector_5 <- c(TRUE,TRUE,TRUE,FALSE,FALSE) # creating a vector with boolean values

# creating a data frame out of 5 vectors.
new_data_frame <- data.frame(vector_1, vector_2, vector_3, vector_4, vector_5)
new_data_frame
```

We have defined a new data frame called `new_data_frame.` Data frames are tightly coupled collections of variables that share many of the matrices and lists' properties. Therefore, defining data frames gives us access to most of the functions defined for matrices and lists. To define a new data frame, we use the `data.frame` method and pass the vectors as arguments.

The output of the above code is as follows:

```txt
    vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
4        d        D        4        8    FALSE
5        e        E        5       10    FALSE
```

It is important to create data frames out of vectors to perform preprocessing on the datasets. There are primarily two types of analysis: Continuous and Categorical.

Continuous analysis deals with all continuous values (numbers) in the dataset, whereas categorical analysis deals with categories. We looked at the definitions of categorical and continuous features in the previous article under the factors section. For more information, check out the [previous article](/engineering-education/introduction-to-r/).

Examples for the two are:
1. **Statistical values**: Prices of houses, oxygen levels in the blood, etc.
2. **Categorical values**: Names of places or objects, status (example: Sell, Rent, Buy)

R provides a few functions to help analyze data frames:
- **head()**: Prints out the first five rows of the data frame. This is used to preview the dataset and get information about the dimensionality (number of rows and columns) of the dataset.
- **str()**: Prints the structure of the data frame. The structure includes information about the data frame and the data types present in each vector. Notice that the data frame auto-assigns the data type to the vectors.
- **tail()**: Prints out the last six observations of the data frame.

The outputs for the functions `head` and `tail` are the same in this case. The two functions display the first five and last five observations, respectively. If we had more than five rows, the difference between the two functions could be observed.

```txt
    vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
4        d        D        4        8    FALSE
5        e        E        5       10    FALSE
```

These functions make sense when the data frame size is enormous.

`str` function provides the following preview, with the data type and dataset for 5 observations.

```r
data.frame':    5 obs. of  5 variables:
$ vector_1: Factor w/ 5 levels "a","b","c","d",..: 1 2 3 4 5
$ vector_2: Factor w/ 5 levels "A","B","C","D",..: 1 2 3 4 5
$ vector_3: num  1 2 3 4 5
$ vector_4: num  2 4 6 8 10
$ vector_5: logi  TRUE TRUE TRUE FALSE FALSE
```

Observe that `vector_1` is assigned to a factor data type. To brush up on factor data type, revisit the previous [article](/engineering-education/introduction-to-r/).

Data frames support indexing. The reasoning behind indexing is similar to that of the matrices. Let's consider a few examples:

- Select the third column
- Select the first three rows
- Select the first three rows from the fifth column

The subsequent outputs is given below:

```r
# Consider the same data_frame defined above: new_data_frame
new_data_frame[,3] # select third column
new_data_frame[1:3,] # select the first three rows
new_data_frame[1:3,5] # select the (1,5), (2,5) and (3,5)
```

The operations above output the following: The first output is the third column. The second part of the output is the first three rows. The last piece of the output denotes the three elements `(1,5)`, `(2,5)` and `(3,5)`.

We discussed the slicing and indexing operations in the previous article in depth. The example uses indexing and slicing operation. For a quick refresher on slicing, refer to the `selection of elements` subsection under the `matrices` section in the previous [article](/engineering-education/introduction-to-r/).

```txt
    1 2 3 4 5

vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE

    TRUE TRUE TRUE
```

A final function to consider is `subset.` The subset function is similar to [Python's filter](https://www.w3schools.com/python/ref_func_filter.asp) function. We can specify conditions using a subset and get a slice of the data frame, satisfying the condition.

Example: Let the condition be all those rows where `vector_5` is `not equal` to `FALSE.`

```r
subset(new_data_frame, subset= vector_5!=FALSE)
```

The output is given as follows. The subset function with parameter `vector_5!=FALSE` makes sure the condition is satisfied so that any row under `vector_5` that is `FALSE` will not be displayed.

```txt
vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
```

### Typecasting
Similar to other programming languages like C++, Python, etc., R provides us with an option to explicitly change or modify the data type of previously defined variables. R offers the keyword `as` to typecast previously defined variables.

We will use the `as` keyword in the following example below:

```r
x <- 0:6
class(x)
# output: integer
typecast_to_numeric <- as.numeric(x)
class(typecast_to_numeric) # integer -> numeric
# output: numeric
typecast_to_logical <- as.logical(x)
class(typecast_to_logical) # integer-> logical
# output: logical
typecast_to_char <- as.character(x)
class(typecast_to_char) # integer -> character
# output: character
```

Observe the change in the data types. An application of typecasting makes sense on user-defined data types. Consider the following applications:

- Consider a data frame with a column containing Boolean values. If one needs to convert these into integers to train a machine learning model, then typecasting is used. Typecasting converts the Boolean values into integer data.

- Suppose one is given a data frame with one column containing time in seconds. To convert each column of the provided data frame to [time in days format](https://www.rdocumentation.org/packages/PivotalR/versions/0.1.18.3.1/topics/Type%20Cast%20functions), explicit typecasting is used.

For more information on explicit typecasting, refer to this [link](https://study.com/academy/lesson/data-type-conversion-in-r-programming-purpose-functions.html).

### Reading and Writing Data
R provides many functions for reading and writing data. There are mainly three data formats used in R. They are `.txt,` `.csv,` and `.RData.`

The functions are defined for each of the file-types and are given as follows:
1. read.table: `read.table("test.txt")`
2. read.csv: `read.csv("test.csv")`
3. load: `load("file_name.RData")`

For writing into files, R provides the following functions:
1. write.table: `write.table(data, file='file_name.txt')`
2. write.csv: `write.csv(data, file='file_name.csv')`
3. save: `save(x,y,"file_name.Rdata")`

Whether reading from or writing to files, ensure that the file directory is correctly mentioned. This works when the file is in the same directory, otherwise, set up a relative link. Relative paths are used extensively in file handling.

Consider going through this [answer](https://stackoverflow.com/questions/36834767/how-to-use-rstudio-relative-paths) on StackOverflow for a glance on relative paths.

### Accessing Built-in Datasets
While learning various machine learning algorithms, the best place to start is the built-in datasets. These are small in size and are cleaned thoroughly. Clean datasets mean they have been pre-processed. The majority (80%) of a data scientist's time is spent on data collection and data cleaning. Therefore, as beginners, we can skip this time-consuming step and deal with a tried and tested dataset.  

These datasets were the benchmark datasets a decade ago. Today, beginners in data science use these as tools to learn and implement the various machine learning algorithms. In the description below, we have linked to a few sample projects using these datasets are given.

A few of the datasets that R provides are as follows:

- **Airquality** dataset: Dataset monitoring the air quality and the effect of air quality on weather and temperature. This dataset helps one understand the correlation between air quality and temperature. This [article](https://towardsdatascience.com/a-guide-to-data-visualisation-in-r-for-beginners-ef6d41a34174) goes through exploring this dataset in full detail.

```r
 head(airquality)
```

This dataset can be called through the variable `airquality`.

```txt
 Ozone Solar.R Wind Temp Month Day
 1    41     190  7.4   67     5   1
 2    36     118  8.0   72     5   2
 3    12     149 12.6   74     5   3
 4    18     313 11.5   62     5   4
 5    NA      NA 14.3   56     5   5
 6    28      NA 14.9   66     5   6
```

- **Iris Dataset**: The [iris dataset](https://en.wikipedia.org/wiki/Iris_flower_data_set) provides four features for three species of flowers: *Versonica, Setosa, and Virginica*. The features are the sepal length, sepal width, petal length, and the petal width.

 ```r
 head(iris)
 ```

 Outputs:

 ```txt
 Sepal.Length Sepal.Width Petal.Length Petal.Width Species
 1          5.1         3.5          1.4         0.2  setosa
 2          4.9         3.0          1.4         0.2  setosa
 3          4.7         3.2          1.3         0.2  setosa
 4          4.6         3.1          1.5         0.2  setosa
 5          5.0         3.6          1.4         0.2  setosa
 6          5.4         3.9          1.7         0.4  setosa
```

For a thorough list, refer to the link [mentioned here](https://www.rdocumentation.org/packages/datasets/versions/3.6.2).
Next, we will work with flow control and modularizing the code using conditionals and functions in R.

### Conditional and Loop Statements
1. **If-else statements**: If-else statements allows one to implement sequential logic. These are an important aspect of [OOP paradigm](https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_object_oriented_paradigm.htm).

Let's look at the example given below:

```r
    x <- runif(1,0,10)
    if(x>3){
        y<-10
    }
    else{
        y <-0
    }
```

The `runif` function randomly picks `n` number of samples in the specified range `[min, max).` `[` denotes closed interval, whereas `)` denotes open interval. In the example given above, the runif function picks 1 sample randomly in the range `[0,10)` and assigns it to variable `x`. `n` is 1, `min` is 0, and `max` is 10.

The arguments to the function `runif` are:

- n: Number of samples
- min: lower bound of the range
- max:  upper bound of the range

2. **For loops**: To demonstrate for loops, we will consider printing the elements of a list and a matrix. Since a matrix is a 2-D data structure, we will need two loops. Such usage of a loop within a loop is referred to as nested looping.

```r
    for(i in 1:10){
        print(i)
    }
    # double for loop
    x<- matrix[1:6, 2:3]
    x
    for(i in seq_len(nrow(x))){
        for(j in seq_len(ncol(x))){
            print(x[i,j])
        }
    }
```

Notice the new `seq_len` function. We have just learned a new function. This is similar to the `range` function in Python. `seq_len(x)` generates integers from 1 to x. Note that R is a 1-indexed language. All indices start with one. We look at nested loops in the above example. The code selects the `(i,j)th` element from the matrix and prints it on the console. Recall that indices in R begin with 1.

The output for the code above is as follows:

```txt
        > x
            [,1] [,2] [,3]
        [1,]    1    3    5
        [2,]    2    4    6

        <!-- for loop output -->

        [1] 1
        [1] 3
        [1] 5
        [1] 2
        [1] 4
        [1] 6
```

3. **While loops**: While loops are known for their conditional execution of loops. They lack the iterator variable that the for loop uses. Let's look at the syntax of while loops in R:

```txt
    while (condition_expression)
    {
    execute_code_while_condition_is_true
    }
```

Consider the following example:

```r
    iter <-10
    while (iter>3){
        print(iter)
        iter<iter-1
    }
```

The output of the above is as follows. The code inside the loop executes until the value of iterator is less than or equal to 3. Hence, it prints the values till 4. When `iter` equals 3, it exits the loop.

```txt
    10
    9
    8
    7
    6
    5
    4
```

When the variable `iter` equals three, the condition fails. Therefore, the print statement stops executing.

### Functions
Functions are important aspects of all programming languages. They help modularize the code. Modularization refers to the concept of breaking down a problem into the smallest pieces. This helps make debugging easier and provides better readability of code. Functions help by implementing various programming paradigms such as Don't Repeat Yourself - [DRY](/engineering-education/dry-manifesto) and modularity.  

Let's look at the following function definition in R:

```r
function_name <- function(parameter_1=10){
    hello <- "Hellooooo" # assigns string to hello variable
    for i in seq_len(parameter_1){
        print(hello)
    }
    return (parameter_1 + 10)
}
```

To call the function, we pass the parameter to the function name directly:

```r
function_name(10)
# output: prints hello 10 times in separate lines
```

In cases when multiple values need to be returned, we use lists. This way, a single entity with various outputs is being returned. I suggest you try this last point as a challenge.

### Conclusion
In this article, we have dealt with the advanced topics of the R programming language. At this point, you have the skills to code machine learning algorithms from scratch and perform various data science experiments.

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)

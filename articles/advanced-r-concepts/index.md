---
layout: engineering-education
status: publish
published: true
url: /engineering-education/advanced-r-concepts/
title: Advanced Programming Concepts in R
description:
author: lalithnarayan-c
date: 2020-10-15T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/advanced-r-concepts/hero.jpg
    alt:
---
In the first article, we have covered the basics of the R programming language. In this article, we will look at some of the advanced aspects of the R programming language. Going through this article will enhance one's ability to implement Object-Oriented Programming(OOP) concepts and write modular code. We will cover the following topics in this article:
<!--more-->

1. Dataframes
2. Typecasting
3. File handling
4. Working with inbuilt datasets
5. Conditional Statements
6. Loop Statements

### **Dataframes**:
R is a programming language built for statistical analysis of large datasets. Emphasis on handling large datasets is laid via dataframes. Dataframes facilitate the process of storing large datasets in a local variable.

Let us look at an example to define a dataframe. We will describe several vectors storing different data types. The example considered below is a simplified version of a real dataset. Datasets contain columns of different data types.

```r
vector_1 <- c("a","b","c","d","e")
vector_2 <- c("A","B","C","D","E")
vector_3 <- c(1,2,3,4,5)
vector_4 <- c(2,4,6,8,10)
vector_5 <- c(TRUE,TRUE,TRUE,FALSE,FALSE)

new_data_frame <- data.frame(vector_1, vector_2, vector_3, vector_4, vector_5)
new_data_frame
```

Hence, we have defined a new dataframe called `new_data_frame.` To define a new dataframe, we use the `data.frame` method and pass the vectors as arguments. The output of the above code is as follows:

```txt
    vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
4        d        D        4        8    FALSE
5        e        E        5       10    FALSE
```
R provides several functions to understand and analyze dataframes. Analysis of dataframes is necessary to perform pre-processing on the dataset. There are primarily two types of analysis: Statistical and Categorical.

The statistical analysis deals with all the continuous values(numbers) in the dataset, whereas categorical analysis deals with categories. Examples for the two are as follows:
1. Statistical values: Prices of houses, Oxygen levels in the blood, etc.
2. Categorical values: Names of places or objects, status(example: Sell, Rent, Buy)

R provides a few functions to help analyze dataframes:

1. head(): Prints out the first six observations of the dataframe
2. str(): Prints the structure of the dataframe. The structure includes information about the dataframe and the data-types present in each vector. Observe that the dataframe auto-assigns the data type to the vectors.
3. tail(): Prints out the last six observations of the dataframe.

The outputs for the functions `head` and `tail` are the same in this case, for lack of elements.
```txt
    vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
4        d        D        4        8    FALSE
5        e        E        5       10    FALSE
```
These functions make sense when the dataframe size is enormous. The output for the `str` function is given below:
```r
data.frame':    5 obs. of  5 variables:
$ vector_1: Factor w/ 5 levels "a","b","c","d",..: 1 2 3 4 5
$ vector_2: Factor w/ 5 levels "A","B","C","D",..: 1 2 3 4 5
$ vector_3: num  1 2 3 4 5
$ vector_4: num  2 4 6 8 10
$ vector_5: logi  TRUE TRUE TRUE FALSE FALSE
```
Observe that vector_1 is assigned to a factor data-type. To brush up on factor data-type, revisit the previous article.

Dataframes support indexing. The intuition behind indexing is similar to that of the matrices. Let us consider a few examples:

1. Select the third column
2. Select the first three rows
3. Select the first three rows from the fifth column

The subsequent outputs is given below:

```r
# Consider the same data_frame defined above: new_data_frame
new_data_frame[,3]
new_data_frame[1:3,]
new_data_frame[1:3,5]
```

The above operations output:
```txt
    1 2 3 4 5

vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE

    TRUE TRUE TRUE
```

The final function under dataframes is `subset.` Subset function is similar to Python's filter function. We can specify conditions using subset and therefore get a slice of the dataframe satisfying the condition. **Let the condition be all those rows where `vector_5` is `not equal` to `FALSE.`**

```r
subset(new_data_frame, subset= vector_5!=FALSE)
```
The output is given as follows:
```txt
vector_1 vector_2 vector_3 vector_4 vector_5
1        a        A        1        2     TRUE
2        b        B        2        4     TRUE
3        c        C        3        6     TRUE
```

### **Typecasting**

Similar to other programming languages like C++,Python,etc, R provides us with an option to explicitly change or modify the data-type of previosuly defined variables. R provides the keyword as.* keyword to implement the same. Let us consider the following example:
```r
x <- 0:6
class(x)
typecast_to_numeric <- as.numeric(x)
class(typecast_to_numeric).0
typecast_to_logical <- as.logical(x)
class(typecast_to_logical)
typecast_to_char <- as.character(x)
class(typecast_to_char)
```
The given code outputs the following:
```txt
> class(x)
[1] "integer"
> typecast_to_numeric <- as.numeric(x)
> class(typecast_to_numeric)
[1] "numeric"
> typecast_to_logical <- as.logical(x)
> class(typecast_to_logical)
[1] "logical"
> typecast_to_char <- as.character(x)
> class(typecast_to_char)
[1] "character"
```
Observe the change in the data types. An application of typecasting makes sense on user-defined data-types. Consider the following applications:

1. Consider a dataframe with a column containing boolean values. If one needs to convert these into integers to train a machine learning model, then typecasting is used. Typecasting converts the boolean into integer data.

2. Supposing one is given a dataframe with one column containing time in seconds. To convert each column of the given dataframe to [time in days format](https://www.rdocumentation.org/packages/PivotalR/versions/0.1.18.3.1/topics/Type%20Cast%20functions), explicit typecasting is used. For more information on explicit typecasting, refer to this [link](https://study.com/academy/lesson/data-type-conversion-in-r-programming-purpose-functions.html).

### **Reading and Writing Data**:

R provides many functions for reading and writing data. There are mainly three data formats used in R. They are `.txt,` `.csv,` and `.RData.` The functions are defined for each of the file-types and are given as follows:

1. read.table: `read.table("test.txt")`
2. read.csv: `read.csv("test.csv")`
3. load: `load("file_name.RData")`

For witing into files, R provides the following functions:

1. write.table: `write.table(data, file='file_name.txt')`
2. write.csv: `write.csv(data, file='file_name.csv')`
3. save: `save(x,y,"file_name.Rdata")`

While reading from or writing to files, ensure that the file directory is correctly mentioned. Relative paths are used extensively in file handling. Consider going through this [answer](https://stackoverflow.com/questions/36834767/how-to-use-rstudio-relative-paths) on StackOverflow for a glance on relative paths.

### **Accessing inbuilt Datasets**:

At this point, you are in a position to use R effectively. While learning various machine learning algorithms, the best place to start is the in-built datasets. These are small in size and are cleaned thoroughly. These datasets were the benchmark datasets around a decade ago. Today, budding data scientists use these as tools to learn the various machine learning algorithms. A few of the datasets that R provides are as follows:
1. **Airquality** dataset: Dataset monitoring the air quality and the effect of air quality on weather and temperature. This dataset helps one understand the correlation between air quality and temperature. This [article](https://towardsdatascience.com/a-guide-to-data-visualisation-in-r-for-beginners-ef6d41a34174) goes through exploring this dataset in detail. Go through it for more information.
```r
 head(airquality)
```
 The dataset can be called through the variable `airquality`.
```txt
 Ozone Solar.R Wind Temp Month Day
 1    41     190  7.4   67     5   1
 2    36     118  8.0   72     5   2
 3    12     149 12.6   74     5   3
 4    18     313 11.5   62     5   4
 5    NA      NA 14.3   56     5   5
 6    28      NA 14.9   66     5   6
```
2. **Iris Dataset**: The [iris dataset](https://en.wikipedia.org/wiki/Iris_flower_data_set) provides four features for three species of flowers: *Versonica, Setosa, and Virginica*. The features are the sepal length, sepal width, petal length, and the petal width.

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


For a thorough list, refer to the link [mentioned](https://www.rdocumentation.org/packages/datasets/versions/3.6.2).

Pat yourselves on the back for having made this far. From now on, we will work with flow control and modularizing the code written.

### **Conditional and Loop Statements**

1. **If-else statements**: If-else statements allows one to implement sequential logic. These are an important aspect of OOP paradigm. Look at the example given below:

    ```r
    x <- runif(1,0,10)
    if(x>3){
        y<-10
    }
    else{
        y <-0
    }
    ```
    The `runif` function randomly picks `n` number of samples in the specified range `[min, max).` `[` denotes closed interval, whereas `)` denotes open interval. The arguments to the function `runif` are:

        1. n: Number of samples
        2. min: lower bound of the range
        3. max:  upper bound of the range

2. **For loops**: For demonstrating for loops, we will consider printing the elements of a list and the matrix. Since a matrix is a 2-D data structure, we will need two loops. Such usage of a loop within a loop is referred to as nested looping.

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

    Notice the new `seq_len` function. We have just learnt a new function. This is similar to the `range` function in Python. `seq_len(x)` generates integers from 1 to x. Note that R is 1-indexed langugae. All indices start with one. The output for the above code output is as follows:

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
3. **While loops**: While loops are known for their conditional execution of loops. They lack the iterator variable that the for loop uses. Let us look at the syntax of while loops in R:

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
    The output of the above is as follows:

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



### **Functions**
Functions are important aspects of all programming languages. They help modularize the code. They help implement various programming paradigms such as Don't Repeat Yourself- [DRY](https://www.section.io/engineering-education/dry-manifesto) and modularity.  

Let us look at function definition as following in R:
```r
function_name <- function(parameter_1=10){
    hello <- "Hellooooo"
    for i in seq_len(parameter_1){
        print(hello)
    }
    return (parameter_1 + 10)
}
```
To call the function, we pass the parameter to the function name directly:
```r
function_name(10)
```
In cases when multiple values need to be returned, we use lists. This way, a single entity with various outputs is being returned. I suggest you try this last point out as a challenge.

### Conclusion

In this article, we have dealt with the advanced topics of the R programming language. At this point, you have the skills to master machine learning algorithms and perform various data science experiments. Adios.

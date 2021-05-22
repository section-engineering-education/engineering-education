---
layout: engineering-education
status: publish
published: true
url: /introduction-to-r/
title: Introduction to R Programming
description: This article will serve as an introduction to the R programming language which is a software environment developed for statistical and graphical computing.
author: lalithnarayan-c
date: 2020-10-28T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-r/hero.jpg
    alt: introduction to the R programming language
---
The data science community has been growing over the past decade. The tools used within the industry have been a driving force behind this unprecedented growth. Hence, learning a programming language like R empowers us to contribute to this awesome field. This article will clarify all the basic concepts of R and look at the various concepts. Going through the article should give you sufficient information to start coding in R.
<!--more-->
### What is R?
R is a software environment developed for statistical and graphical computing. Developed at Bell Labs, it's a modified implementation of the [S language](https://en.wikipedia.org/wiki/S_%28programming_language%29).

It provides many statistical techniques such as [linear modeling](https://techvidvan.com/tutorials/r-generalized-linear-models/), [non-linear modeling](https://analyticsindiamag.com/hands-on-guide-for-non-linear-regression-models-in-r/), [statistical tests](http://r-statistics.co/Statistical-Tests-in-R.html), [classification, and clustering](https://www.geeksforgeeks.org/introduction-to-machine-learning-in-r/) algorithms, etc.

One of the greatest strengths of the R language is the large community that uses it. Therefore, many optimized libraries are readily available to make the lives of early programmers simple.

### RStudio
Before we begin, we need to ensure that the R interpreter is installed on our local machine. In this article, we'll focus on programming concepts. You can use online editors like [Repl.it](https://repl.it/languages/rlang) for this tutorial.

For further information on installation, refer to this [article](https://techvidvan.com/tutorials/install-r/).

The RStudio interface has four components that we make use of the most. Below is a preview of what the RStudio interface looks like.

![rstuido](/engineering-education/introduction-to-r/rstudio.jpg)

The four components are as follows:

1. **Editor**: The editor is used to create R scripts. R scripts are executed using the **run** button or the console. The **run** button is present at the top of the RStudio window. To execute a file using the console, we need to go through the following steps:
   - Set the current working directory to the directory, including the R script. Use the command `setwd(dir)` to set the working directory to the directory of your choice. Use `getwd()` to get the current working directory
   - We use the `source` command to execute the script file of our choice. `source(file_name)` executes the entire file and gives the output in the console section. The `source(filename)` is typed and executed via the console, which we will cover in the next point.
   ![](/engineering-education/introduction-to-r/R-Script.jpg)
2. **Console and Terminal**: The **console** in R is similar to IDLE in Python. We can execute any command here. For this tutorial, you may use the **console**.
   ![](/engineering-education/introduction-to-r/console.jpg)
3. **Environment Variables**: The **environment variables window** list all the variables created during program execution and their corresponding values. It is used to understand the dimensionality and data-types of the data being used by a program.
   ![](/engineering-education/introduction-to-r/environment.jpg)
4. **Plots, Package manager, and Help Section**: The plots section generates any plots that have been specified in the R script. The **Package Manager** gives us a list of packages installed and lets us install packages if required. Finally, the help section is a go-to for developers of all levels. The ability to go through official docs through the RStudio empowers programmers and saves them much time.
   ![](/engineering-education/introduction-to-r/plot.jpg)

### R-Programming Basics
In this article, we will be covering the following concepts:

1. Variables, Data Types, and Operations.
2. Vectors.
3. Matrices.
4. Factors.
5. Lists.

#### Variables, Data Types, and Operations
R includes the following atomic data types: logical, numeric, integer, complex, raw, and character. Abstract data types such as lists, stacks, etc., are defined using these atomic data types.

Atomic data types are the most fundamental data structures. Abstract data types are building blocks used in complex scenarios. These abstract data types are created using atomic data types.

Variables are memory locations that store values during the execution of a computer program. To define a variable in R, we use the reverse-arrow(<-) operator.

Let's look at the code sample below to learn how to declare variables.

```R
variable_x <- 21 # Assign 21 to variable_x
variable_y <- 54 # Assign 54 to variable_y
variable_sum <- variable_x + variable_y # sum variable_x and variable_y and store it in variable_sum
variable_complex <- 5 + 6i # assign 5 + 6i to a complex variable, variable_complex
# Outputs 75
variable_character <- "Character" # assign "Character" to variable character
variable_logical <- TRUE # assign boolean value TRUE to variable_logical

# To check the type of a variable, use class function
class(variable_sum)
# Output: numeric
class(variable_character)
# Output: character
class(variable_logical)
# Output: logical
class(variable_complex)
# Output: complex
```

In the above example, we observe no explicit mentioning of the data type during the creation of variables. R does this automatically.  

R supports all the necessary operations such as addition, subtraction, multiplication, division, modulus, exponentiation. More complex operations are also possible using these basic operations. Examples of complex operations are dot products, cross products, matrix determinants, matrix inverses, etc.

#### Vectors
Vectors are data constructs that store many elements of a particular data type. Think of them when you want to store many elements belonging to a single data type. They are defined using the keyword `c.`

Let's look at a few examples to get started with vectors:

```R
vector_num <- c(2,4,6,8) # vector_num created with numerical elements
vector_char <- c('a','b','c','c')  # vector_char created with character elements
vecor_logic <- c(FALSE, TRUE) # vector_logic created with boolean elements
```

All operations such as addition, subtraction, multiplication, and division can be performed on vectors. Do give it a try. For your reference, I have attached the code below. Try it out on the console and observe the output.

```r
a <- c(1,2,3,4) # vector definition
b <- c(2,4,6,8)  # vector definition
a + b # addition
# output:  3  6  9 12
a - b # subtraction
# output:-1 -2 -3 -4
a * b # multiplication
# output:  2  8 18 32
a/ b # division
# output:  0.5 0.5 0.5 0.5
a %% b # modulus(returns the remainder after division)
# output:  1 2 3 4  
```

Arrays are data structures built over vectors. Vectors are one-dimensional in nature, whereas arrays extend to multi-dimensions. The input arguments to an array are the vector of vectors and the dimension of the array. The product of the dimensions should be equal to the number of elements in all the input vectors.

Let's consider the code example given below to declare multi-dimensional arrays. The number of elements is 11. We specify the dimension of the matrix to be 3x3. Therefore, 11 divided by 9 yields a remainder 2. Therefore, the last 2 elements are excluded from the final result.

```r
vector_1 <- c(1,2,3,4) # vector definition
vector_2 <- c(4,22,32,5,6,7,8) # vector definition

array_from_vectors_1_and_2 <- array(c(vector_1, vector_2), dim=c(3,3)) # array creation using array keyword
array_from_vectors_1_and_2 # print array defined in the previous step
```

The output consists of one matrix of dimension 3x3. The `dim` keyword in the array enables multi-dimensional arrays. Vectors are limited to one-dimensional data. Observe the 3x3 matrix in the output given below:

```txt
array_from_vectors_1_and_2

     [,1] [,2] [,3]
[1,]    1    4   32
[2,]    2    4    5
[3,]    3   22    6
```

##### Naming Indices
R lets us identify each index with a custom name. For example, let's define a vector `first_quarter` and initialize it with numbers 1,2, and 3. We represent another vector, `first_quarter_names,` with names of the first three months.

Using the `names` function, we can assign unique indexes to elements of `first_quarter.` This helps in customizing the index names, which is useful in cases dealing with large amounts of data.

```r
first_quarter <- c(1,2,3) # first_quarter vector definition
first_quarter_names <- c("Jan","Feb", "Mar") # first_quarter_names holds the names of the elements
names(first_quarter) <- first_quarter_names # assigning names to elements using names function
```

The `names` function helps us label and tabulate the data for better understanding in the future — an essential tool for all data analysts across the world. Using the new indices created, we can replace them in place of the default array indices.

Let's consider the example below, that illustrates this point.

```r
# declared in the previous example, where first_quarter is assigned c(1,2,3) and names vector c("Jan","Feb","Mar")
first_quarter["Jan"] # indexing elements using the assigned names
```

The above piece of code returns 1. Hence, we can use the above pair of lists and names as key-value pairs. Key-value pairs are beneficial in implementing [hash tables](https://www.section.io/engineering-education/bloom-filters-data-structure/), storing information, etc.

##### Slicing Lists
Lists can also be sliced. Slicing refers to the operation of obtaining a subset of serial elements from the list. For example, to get the first two months mentioned in the list `first_quarter,` we can use the following code.

```r
list_slice <- first_quarter[c(1:2)] # list_slice contains Jan and Feb as elements
```

If we observe, in the above code, we begin the slicing operation from index 1. R is a one-indexed programming language. Most of the programming languages like C, Java, and Python are zero-indexed programming languages. The index in R starts with 1; that is, the index assigned to the first element in a list is 1.

#### Matrices
Matrices are 2-dimensional (rectangular) structures used commonly in the field of computer science. One application of matrices is in the field of [computer vision](/computer-vision-straight-lines/). Each image is treated as a stack of three matrices, each representing a different color channel. R offers libraries highly optimized for matrix operations.

Let's look at defining matrices.

![three channels in an image](/engineering-education/introduction-to-r/image_channel.jpg)

*[Image Source](https://www.sketchpad.net/channels1.htm)*

##### Defining a Matrix
In R, we create new matrices using the `matrix()` function. The `matrix()` function takes a vector containing the elements, the orientation, and the number of rows. The orientation refers to the order of elements being stored. When the argument `byrow` is `TRUE,` the elements are stored row-wise. To store column-wise, we define `bycol` to be `TRUE.`

```r
matrix(c(1:16), bycol=TRUE, ncol=4) # the matrix's dimensions is 4*4, since 16/4 = 4, and num of columns = 4
matrix(c(1:16), byrow=TRUE, nrow=4) # num of rows = 4, therefore, num of cols = 16/4 = 4. Hence, matrix is 4x4
```

If the vector's length is not a multiple of the number of rows/columns mentioned in the function, then R displays a warning and fills up the remaining spaces with the first few elements of the list.

For example:

```r
matrix(c(1:16), byrow=TRUE, nrow=3) # outputs a matrix of dimension 3x6. Repeats data to fill in empty values
```

Since the number of elements is 16 and the number of rows specified is 3, each row should consist of 5.33 elements. The upper ceil of the value is taken, and therefore, each row should contain 6 elements. Observe the values 1 and 2 repeats in the last row.

The code above generates the following output.

```txt
Warning message: data length [16] is not a sub-multiple or multiple of the number of rows [3]
     [,1] [,2] [,3] [,4] [,5] [,6]
[1,]    1    2    3    4    5    6
[2,]    7    8    9   10   11   12
[3,]   13   14   15   16    1    2
```

##### Naming Matrices
Just like vectors, matrices also have the option to name the rows and columns. The functions available are `rownames()` and `colnames()` respectively. They take in a vector containing the names corresponding to the indices. Consider the following example:

While defining the matrix `new_matrix,` we can also specify the range of numbers that need to be stored in it. R automatically considers it as a vector and proceeds with the creation of the matrix. Therefore, `c(1:4)` is equivalent to `1:4` while defining matrices.

```r
new_matrix <- matrix(1:4, byrow=TRUE, ncol=2) # defning a new matrix of dimension 2x2
colnames(newm_matrix) <- c("column 1","column 2","column 3") # assigning names to column indices
rownames(newm_matrix) <- c("row 1","row 2","row 3") # assigning names to row indices
```

##### Summing Entries
Let's say you want to compute the average of the entries in your matrix. We begin by adding them up and then dividing by the total number of entries. R offers functions to add the entire rows or columns. They are `rowSums,` `colSums.` These functions take the matrix as their input and output a vector containing the sums.

Example:
```r
x <- matrix(1:9, byrow = TRUE, nrow=3) # 3x3 matrix defined
x # outputs the matrix x
row_sum <- rowSums(x) # sums computed rowwise
col_sum <- colSums(x) # sums computed column wise
row_sum # printing row_sum: computed as 1 + 2 + 3, 4 + 5 + 6, 7 + 8 + 9
col_sum # printing col_sum: computed as  1 + 4 + 7, 2 + 5 +8, 3 + 6 + 9
```

The output is given as follows:

```txt
x
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6
[3,]    7    8    9
row_sum
[1]  6 15 24
col_sum
[1] 12 15 18
```

##### Inserting new rows and columns to existing matrices
Let's consider the situation where we need to modify a matrix by adding extra rows or columns. R provides two functions called `cbind()` and `rbind()` to help us do this.

The input to the function is the matrix to be modified followed by the vector to be inserted.

Consider the example given below:

```r
x <- matrix(1:9, byrow = TRUE, nrow=3) # 3x3 matrix defined
new_matrix_with_additional_column <- cbind(x, c(1,2,3)) # 3*4 matrix defined with additional column (1,2,3)
# use the column binded matrix as input for row binding
new_matrix_with_additional_column # print on console 3x4 matrix
new_matrix_with_additional_row <- rbind(new_matrix_with_additional_column, c(4,5,6,4)) # 4 *4 matrix defined with additional row as (4,5,6,4)
new_matrix_with_additional_row # printing the new matrix on console 4x4 matrix
```

The output for the code above is given as follows:

```txt
new_matrix_with_additional_column
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    1
[2,]    4    5    6    2
[3,]    7    8    9    3

 new_matrix_with_additional_row
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    1
[2,]    4    5    6    2
[3,]    7    8    9    3
[4,]    4    5    6    4
```

Observe the notation [,1] vs. [1,] in the output matrices. These notations originate from the slicing operations in matrices. [1,] denotes the selection of the first row. [,1] denotes the selection of the first column. Therefore, R outputs these to denote the row and column numbers on the console.

##### Selecting Elements
The final concept to be covered under matrices is the selection of elements. Matrices in R work like 2-D arrays in other programming languages. Therefore all the slicing operations stand true in R. Let's assume we have a `4x4` dimensional matrix. The first quarter is a `2x2` matrix. To get the first quarter of the matrix, we'll use the following code:

```r
x <- matrix(1:16, byrow=TRUE, nrow=4) # matrix definition
x # output matrix on console. The numbers 1:16 denotes the list of numbers between
x[1:2,1:2] # selection operation
```

The output is given as follows:

```txt
x
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
[3,]    9   10   11   12
[4,]   13   14   15   16

 x[1:2,1:2]
     [,1] [,2]
[1,]    1    2
[2,]    5    6
```

With the solid knowledge of vectors, matrices, and various data types, let's shift gears and move towards factors and lists.

#### Factors
We use factors in cases when we deal with categorical features. Categorical features are defined as those features that are limited to a limited number of values it can take.

Continuous output variables, on the contrary, are limited to the entire real number space, that is infinite in length. Therefore, continuous variable lengths can take any value on the number line and are continuous in nature.

For example, [classification](https://www.section.io/engineering-education/supervised-learning-algorithms/) algorithms have discrete output variables, whereas regression algorithms have continuous output variables. We can use vectors and matrices to store continuous output variables. But in the case of categorical values, we use factors. Factors also allow us to assign priorities to the categorical features through the use of the `level` keyword.

R provides us with the function factor to deal with categorical values. Examples are the best way to understand the implementation. The example creates a vector and passes it to the `factor` keyword. The `factor` keyword creates the 3 categories with default levels.

```r
factor_vector <- c("Big","Small","Medium") # creating a new vector
factored_vector <- factor(factor_vector) # using the vector factor_vector to create a factor
factored_vector # output the created factor
```

The code above outputs the following:

```txt
[1] Big Small Medium  
Levels: Big Medium Small
```

You might be wondering about the levels parameter present in the output. The levels signify the relative ordering between the categorical values. In the given example, all are equal by default. Let's say we want to specify an order for the categories: Big to be 2, medium to be 1, and small to be 0.

Factor enables us to encode a vector of character values as integer values and therefore categorize them.

We update the code as follows:

```r
factor_vector <- c("Big", "Small","Medium") # create a character vector comprising of categories
factored_vector <- factor(factor_vector, order=TRUE, levels=c("Small","Medium","Big")) # assign levels to the categories using levels keyword, order is used to activate the levels. if order=FALSe, default order is considered
factored_vector
```

We obtain the desired output.

```txt
[1] Big Small Medium
Levels: Small < Medium < Big
```

The final function one must know under factors, that is used quite frequently, is `summary().` The summary function summarizes factors and gives the total number of occurrences of a particular category in the initial `factor_vector.`

```r
factor_vector <- c("Big", "Small","Medium")
factored_vector <- factor(factor_vector, order=TRUE, levels=c("Small","Medium","Big"))
factored_vector
summary(factored_vector)
```

The following code outputs:

```txt
Small Medium Big
    1     1     1
```

#### Lists
An R list is an object consisting of an [ordered collection of objects known as its components](https://cran.r-project.org/doc/manuals/r-release/R-intro.html#Lists). They can hold elements belonging to various data types. These data types can be numerical, complex, character, Boolean, vectors, factors, or a matrix. Lists are the data structure that completes the R-ecosystem by providing many features. Let's look at lists and the functions it offers.


Let's begin by declaring a list.

```r
vector_to_be_inserted_in_list <- c(1:5) # create a vector
text_to_be_inserted_in_list <- "Text Here!!! " # create a character string
matrix_to_be_inserted_in_list <- matrix(1:16, nrow=4, byrow=TRUE) # create a 4X4 matrix
# define the new list using list keyword with input arguments as the vectors defined earlier
# it has vectors, character and matrix as its input
new_list <- list(vector_to_be_inserted_in_list,text_to_be_inserted_in_list,matrix_to_be_inserted_in_list)
new_list
```

The list is displayed as given below. The entire output displayed below is the list `new_list` defined above.

The first part of the output is the numerical vector. The second part corresponds to the character, and the final part is the 4x4 matrix defined.

```txt
[[1]]
[1] 1 2 3 4 5

[[2]]
[1] "Text Here!!! "

[[3]]
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
[3,]    9   10   11   12
[4,]   13   14   15   16
```

We can get the elements of the list using indexes. To get the matrix, type in `new_list[3]` in the console. Note that R is a one-indexed language. All the indices begin with 1.

Lists also allow us to name the elements. The `names` function is used for the same. It gives a name to each element in the list, `new_list.`

```r
vector_to_be_inserted_in_list <- c(1:5) # vector definition
text_to_be_inserted_in_list <- "Text Here!!! " # string definition
matrix_to_be_inserted_in_list <- matrix(1:16, nrow=4, byrow=TRUE) # matrix definition

new_list <- list(vector_to_be_inserted_in_list,text_to_be_inserted_in_list,matrix_to_be_inserted_in_list)
names(new_list) <- c("vector", "text" ,"matrix") # names vector assigned to each element of new_list
new_list
```

The `new_list` is updated with names shown below:

```txt
$vector
[1] 1 2 3 4 5

$text
[1] "Text Here!!! "

$matrix
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    4
[2,]    5    6    7    8
[3,]    9   10   11   12
[4,]   13   14   15   16
```

Using the names, we can select the elements. To select the text using the name, we use the following command: `new_list$text.`

The general syntax is the name of the variable, followed by`$`, followed by the name assigned: `name_of_the_list_variable$name_assigned_to_element`.

### Conclusion
In this article, we have learned the basics of R programming. It's a potent tool used extensively in the data science community. Try out the code given to gain the maximum value from the tutorial. Also, try out [Repl.it](https://repl.it/languages/rlang) and use it often. It provides hassle-free access to faster experimentation and prototyping.

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)

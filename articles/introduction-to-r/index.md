# Introduction to R Programming

The data science community has been growing exponentially over the past decade. The tools used in the industry have been powerful enough to drive this unprecedented growth. Hence, learning a programming language like R empowers us to make a significant contribution to the field. In this article, we will understand all the basic concepts of R and look at the various concepts. Going through the article should give you sufficient information to start coding in R. 

### What is R?

R is a software environment developed for statistical and graphical computing. Developed at the Bell Labs, it is a modified implementation of S language. It provides many statistical techniques such as linear modeling, non-linear modeling, statistical tests, classification and clustering algorithms, etc. One of the greatest strengths of the R language is the large community that uses it. Therefore, a large number of optimized libraries are easily available to make the lives of early programmers very simple. 

### RStduio

We need to install various software to execute R programs successfully. In this article, we will focus on the basics of R. For further information on how to install the required software, refer to this [link](https://techvidvan.com/tutorials/install-r/).

The RStudio interface has 4 components that we make use of most commonly. The RStudio terminal is shown below.

![rstuido](rstudio.jpg)

The four components are as follows:

1. **Script Editor**: The editor is used to create R scripts and can be executed using the run button, or using the console. To execute a file using the console, we need to go through the following steps:
   1. set current working directory to the directory including the R script. use the command `setwd(dir)` to set the working directory to the directory of your choice. Use `getwd()` to get the current working directory
   2. We use the `source` command to execute the script file of our choice. `source(file_name)` executes the entire file and gives the output in the console section.
   ![](R-Script.jpg)
2. **Console and Terminal**: The console in R is similar to the IDLE in Python. We can execute any command here. For this tutorial, I suggest you use the console.
   ![](console.jpg)
3. **Environment Variables**: It gives us a list of all the variables stored and the corresponding variables stored in them.
   ![](environment.jpg)
4. **Plots, Package manager, and Help Section**: Plots section generates any plots that have been specified in the R script. The package manager gives us a list of packages installed and lets us install packages if required.  Finally, the help section is a go-to for developers of all caliber. The ability to go through official docs through the RStudio empowers programmers and saves them a lot of time. 
   ![](plot.jpg)


### R-Programming Basics

In this article, we will be covering the following concepts:

1. Variables, Data Types, and Operations
2. Vectors 
3. Matrices
4. Factors
5. Lists
   
#### Variables, Data Types and Operations

R supports various data-types. They are logical, numeric, integer, complex, and character. These are the atomic data types that other objects are built upon. To define a variable in R, we use the reverse-arrow operator. Let us look at the code to declare variables

```R
variable_x <- 21
variable_y <- 54
variable_sum <- variable_x + variable_y
variable_complex <- 5 + 6i
# Outputs 75
variable_character <- "Character"
variable_logical <- TRUE

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
R supports a wide range of operations such as addition, subtraction, multiplication, division, modulus, exponentiation. These form the set of basic operations. Complex operations are performed using these basic operations. Examples of complex operators are dot products, cross products, matrix determinants, etc.

#### Vectors
Vectors are data constructs in R which store elements of a particular data type. They are defined using the keyword `c`. Let us look at a few examples:
```R
vector_num <- c(2,4,6,8)
vector_char <- c('a','b','c','c')
vecor_logic <- c(FALSE, TRUE)
```
All operations such as addition, subtraction, multiplication, and division can be performed on vectors. Do give it a try. For your reference, I have attached the code below:

```r
a <- c(1,2,3,4)
b <- c(2,4,6,8)
a + b
a - b 
a * b
a/ b
a %% b
```

R lets us identify each index with a custom name. For example, let us define a vector first_quarter and initialize it with numbers 1,2, and 3. We define another array with names of the first three months. Using the `names` function, we can assign unique indexes to elements of `first_quarter`.

```r
first_quarter <- c(1,2,3)
first_quarter_names <- c("Jan","Feb", "Mar")
names(first_quarter) <- first_quarter_names
```
The `names` function helps us label and tabulate the data for better understanding in the future. A very important tool for all data analysts across the world. Using the new indices created, we can use these in place of the default array indices.

```r
first_quarter["Jan"]
```
The above piece of code returns 1. Hence, we can use the above pair of lists and names as dictionary equivalents of Python. 

Lists can also be sliced. Slicing refers to the operation of obtaining a subset of serial elements from the list. For example, to obtain the first two months mentioned in the list `first_quarter`, we can use the following code.
```r
list_slice <- first_quarter[c(1:2)]
```
#### Matrices

Matrices are 2-dimensional (rectangular) structures used commonly in the field of computer science. One application of matrices is in the field of computer vision. Each image is treated as three matrices, each representing a color channel. R offers libraries highly optimized for matrix operations. Let us look at defining matrices.

##### Defining a Matrix

In R, we create new matrices using the `matrix()` function. The `matrix()` function takes a vector containing the elements, the orientation, and the number of rows.

```r
matrix(1:16, bycol=TRUE, ncol=4)
matrix(1:16, byrow=TRUE, nrow=4)
```

If the length of the vector is not a multiple of the number of rows/columns mentioned in the function, then R displays a warning and fills up the remaining spaces with the first few elements of the list. 

For example 

```r
matrix(1:16, byrow=TRUE, nrow=3 )
```
The above code generates the following:
```txt
Warning message: data length [16] is not a sub-multiple or multiple of the number of rows [3]
     [,1] [,2] [,3] [,4] [,5] [,6]
[1,]    1    2    3    4    5    6
[2,]    7    8    9   10   11   12
[3,]   13   14   15   16    1    2
```
Just like vectors, matrices also have the option to name the rows and columns. The functions available are `rownames()` and `colnames()` respectively. 

```r
new_matrix <- matrix(1:4, byrow=TRUE, ncol=2)
colnames(newm_matrix) <- c("column 1","column 2","column 3")
rownames(newm_matrix) <- c("row 1","row 2","row 3")
```
There are many functions that matrices allow: They are `rowSums`, `colSums`. These functions take the matrix as their input and output a vector containing the sums. 

Example: 
```r
x <- matrix(1:9, byrow = TRUE, nrow=3)
row_sum <- rowSums(x)
col_sum <- colSums(x)
```

##### Inserting new rows and columns to existing matrices

Let us consider the situation where we need to modify a matrix by adding additional rows or columns. R provides two functions called `cbind()` and `rbind()` to accomplish the same.

```r
x <- matrix(1:9, byrow = TRUE, nrow=3)
new_matrix_with_additional_column <- cbind(x, c(1,2,3))
new_matrix_with_additional_row <- rbind(new_matrix_with_additional_column, c(4,5,6))
new_matrix_with_additional_row
```
The ouput for the above code is given as follows:
```txt
 new_matrix_with_additional_row
     [,1] [,2] [,3] [,4]
[1,]    1    2    3    1
[2,]    4    5    6    2
[3,]    7    8    9    3
[4,]    4    5    6    4
```

The final concept to be covered under matrices is the selection of elements. Matrices in R work similar to 2-D arrays in other programming languages. Therefore all the slicing operations stand true in the case of R. Let us assume we have a `4X4` dimensional matrix. If we want to get the first quarter of the matrix, we would use the following code:

```r
x <- matrix(1:!6, brow=TRUE, nrow=4)
x[1:2,1:2]
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

With the solid knowledge of vectors, matrices and various data types let's shift gears and move towards factors and lists.

#### Factors
Consider the case of supervised learning. There are two types of supervised learning: Classification and Regression. Classification algorithms have discrete output variables, whereas regression algorithms have continuous output variables. We can use vectors and matrices to store continuous output variables. But in the case of categorical values, we use factors.

R provides us with the function factor to deal with categorical values. Examples are the best way to understand the implementation. 

```r
factor_vector <- c("Black", "White","Grey")
factored_vector <- factor(factor_vector)
factored_vector
```
The above code outputs the following:
```txt
[1] Black White Grey  
Levels: Black Grey White
```
You might be wondering about the levels parameter present in the output. The levels signify the relative ordering between the categorical values. In the given example, by default all are equal. Let us says we want the black to be 0, grey to be 1, and white to be 2. We update the code as follows:

```r
factor_vector <- c("Black", "White","Grey")
factored_vector <- factor(factor_vector, order=TRUE, levels=c("Black","Grey","White"))
factored_vector
```
We obtain the desired output.
```txt
[1] Black White Grey 
Levels: Black < Grey < White
```
The final function one must know under factors, which is used quite frequently, is `summary()`. The summary function summarizes factors and gives the total number of occurrences of a particular category in the initial `factor_vector`

```r
factor_vector <- c("Black", "White","Grey")
factored_vector <- factor(factor_vector, order=TRUE, levels=c("Black","Grey","White"))
factored_vector
summary(factored_vector)
```
The following code outputs:
```txt
Black  Grey White 
    1     1     1
```

#### Lists

Lists are data structures similar to the structure data structure in C. They can hold elements belonging to various data types. Lists are the data structure that completes the R-ecosystem providing many features. Let us look at lists and the functions it provides.


Let us begin by declaring a list. 

```r
vector_to_be_inserted_in_list <- c(1:5)
text_to_be_inserted_in_list <- "Text Here!!! "
matrix_to_be_inserted_in_list <- matrix(1:16, nrow=4, byrow=TRUE)

new_list <- list(vector_to_be_inserted_in_list,text_to_be_inserted_in_list,matrix_to_be_inserted_in_list)
new_list
```

The list is displayed as given below

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

We can obtain the elements of the list using indexes. To obtain the matrix, just type in `new_list[3]` in the console. 

Lists also allow us to name the elements. The `names` function is used for the same.

```r
vector_to_be_inserted_in_list <- c(1:5)
text_to_be_inserted_in_list <- "Text Here!!! "
matrix_to_be_inserted_in_list <- matrix(1:16, nrow=4, byrow=TRUE)

new_list <- list(vector_to_be_inserted_in_list,text_to_be_inserted_in_list,matrix_to_be_inserted_in_list)
names(new_list) <- c("vector", "text" ,"matrix")
new_list
```

The `new_list` is updated with names as shown below:

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

Using the names, we can select the elements. To select the text using the name, we use the following command: `new_list$text`

The general syntax is `name_of_the_list_variable$name_assigned_to_element`. 

### Conclusion
With the concept of lists, we have learned the basics of R programming. It is a very powerful tool used extensively in the data science community. I suggest you try out the code given to gain maximum value from the tutorial. 
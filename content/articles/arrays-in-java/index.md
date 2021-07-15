---
layout: engineering-education
status: publish
published: true 
url: /engineering-education/arrays-in-java/
title: Arrays in Java
description: A collection of related data elements with a common name is referred to as an array. This article will explain the basics and how to use arrays in Java.
author: catherine-mugo
date: 2021-07-15T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/arrays-in-java/hero.png
    alt: Arrays in Java cover image 
---

### Introduction 
A collection of related data elements with a common name is referred to as an array. We can define an array as marks to represent a set of the total marks of a group of students. A particular value that is index number or the subscript is assigned to the array name and stored in square brackets [] after the array name and declares variables in an array. Arrays can be defined by any variable type.
marks[10]
The complete set of values is the array while the individual value is an element. An array is like an ordered list of variables that has a uniform mechanism of naming, the name of the array does not change but the variable can change.

### Prerequisite
Before learning this tutorial you need to have a basic understanding of java especially on how to run and compile java programs.
### Creating an array
Before being used, arrays are constructed and declared just like any other variable in the computer memory. The process of making  array is of three steps:
1. Declaring the array
2. Creating a memory location
3. Adding values into the memory location

### Declaration of arrays
The declaration of arrays in Java happens or can be done in two forms:
type arrayname[ ]; or
type [ ] arrayname;
example:
```Java
float mean[ ];
int[ ] marks;
```

### Creation of an array
After declaring an array it needs to be created in the memory.
```Java
arrayname= new type[size];
```
example
```Java
number= new int[5];
mean= new float[7];
```
The above line creates memory locations for the array number and mean and assigns them as int and float.
The length of an array is the number of indexed variables that is the number given in square brackets after the array type. The index variables can be of any type and be of the same base type in a single array.
An array can also be declared and created at the same time that is;

```Java
float mean[ ]=new float[7];
```

### Initialization of arrays
The final stage now is adding or assigning values to the array created this is the process of initialization this is done using array subscripts and assigning the values.
The subscript must be within the created memory locations they cannot exceed. The initialization process starts from zero as the first subscript and ends at (n-1) where n  is the memory allocated for that array.

```Java
arrayname[subscript]= value;
```
example

```Java
mean[0] =45;
mean[1] =64;
mean[2] =78;
mean[3] =92;
mean[4] =15;
mean[5] =16;
mean[6] =04;
```
We can also initialize arrays in the same way as to how ordinary variables are declared that is;

```Java
type arrayname[ ]= {list of values};
```
The array initializer consist a list of values that are separated by commas and enclosed by curly brackets. The array's size isn't really specified. The compiler will allocate enough memory for all elements stated on the list;

```Java
float mean [ ]= {45, 64, 78, 92, 15, 16, 04};
```

We can also use the for loop for array initialization.

```Java
for(x=0; x<10; x++)
average[x]= (float)x;
```

The loop will initialize the array average to the values 0 to 9.

The allocated size in the array is stored in a variable named length. The length of an array say a is obtained using a.length

```Java
int asize = a.length;
```
The instance variable length is set by default to the size of the array created in situations where the size of the array is not set. Once an array is created its length can not be changed but only through creating a new array by changing the set size of the array.

### One and two-dimensional array
The one-dimensional array is also referred to as the single dimensional array and it only uses one subscript []. The first element will be assigned to the 0th index and the last will be stored in the (length-1)index.
A single-dimensional array will only have one subscript of any datatype. The values of the array must be of the same datatype as initialized failure to which a compile-time error is displayed during storage.
Here is an example of a single-dimensional array;

```Java
 import java.util.*;
 public class OneDimensionalArray {
   public static void main(String[] args) {
     int[] marks = new int[] { 51, 27, 73, 94, 55, 60, 78, 48, 49, 19 };
     System.out.println(Arrays.toString(marks));
   }
 }
 ```

The output of the above code is; [51, 27, 73, 94, 55, 60, 78, 48, 49, 19].
The two-dimensional array uses more than one subscript of which they represent the rows and the columns. This enables us to store values in a table, the first subscript represents the number of rows while the second subscript represents the number of columns.
Creating a two-dimensional array;

```Java
public class MultiDimensionalArray{

     public static void main(String []args){
        int marks[][] = new int[3][4];
        
        marks[0][0]=20;
        marks[0][1]=90;
        marks[0][2]=56;
       marks[0][3]=34;
        
        marks[1][0]=47;
       marks[1][1]=78;
        marks[1][2]=12;
        marks[1][3]=34;
        
       marks[2][0]=74;
       marks[2][1]=98;
       marks[2][2]=32;
        marks[2][3]=25;
        
        System.out.println(marks[0][0] +"" +marks[0][1] +"" + marks[0][2] +"" +marks[0][3] +"");
        System.out.println(marks[1][0] +"" +marks[1][1] +"" + marks[1][2] +"" +marks[1][3] +"");
        System.out.println(marks[2][0] +"" +marks[2][1] +"" + marks[2][2] +"" +marks[2][3] +"");
     }
}

```

A table with 12 integer values is created. Each element in the multidimensional array should be of the same base type as declared.

Finding the length of a multidimensional array;

```Java
import java.util.*;
public class MultidimensionalArray {
    public static void main(String[] args) {

        
        int[][] a = {
            {90, 62, 4}, 
            {86, 45, 67, 56}, 
            {7}, 
        };
      
        
        System.out.println("Length of row 1: " + a[0].length);
        System.out.println("Length of row 2: " + a[1].length);
        System.out.println("Length of row 3: " + a[2].length);
    }
}
```

the output of this program will be;

Length of row 1: 3
Length of row 2: 4
Length of row 3: 1

The length of a row in the array is equivalent to the total value in the row.

### Sorting arrays
The sort method in the array is used to rearrange the elements in an array in either a descending or ascending order

```Java
import java.util.Arrays;
 
import java.util.Collections;
 public class Sorting_arrays {
 
    public static void main(String[] args) {
 
     Integer [] sorting_array = {34, 65, 75, 84, 76,45,120};
        System.out.println("Array before sorting: " + Arrays.toString(sorting_array)+"\n");
 
        Arrays.sort(sorting_array, Collections.reverseOrder());
        System.out.println("Sorted array in descending order: " + Arrays.toString(sorting_array)+"\n");
        Arrays.sort(sorting_array);
        System.out.println("Sorted Array in ascending order: " + Arrays.toString(sorting_array));
    }
 }
 ```

After sorting the array the output is as follows;
Output:

Array before sorting: [34, 65, 75, 84, 76, 45, 120]

Sorted array in descending order: [120, 84, 76, 75, 65, 45, 34]

Sorted Array in ascending order: [34, 45, 65, 75, 76, 84, 120]

To sort the array in descending order you use the reverseorder() method imported from the collection, therefore the reverse order has to involve the collection method.

### conclusion
We have been able to go through and understand arrays. We have also seen how to approach arrays through for loop. The sorting of arrays can be of great help to arrange data and sort out data in either ascending or descending orders.

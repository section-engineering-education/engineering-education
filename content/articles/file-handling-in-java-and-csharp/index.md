---
layout: engineering-education
status: publish
published: true
url: /file-handling-in-java-and-csharp/
title: File Handling Operations in Java and C#
description: This article will help readers understand how file management works in Java and C#. These operations allow one to develop high quality applications.
author: apondi-ashley
date: 2021-12-30T00:00:00-12:25
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/file-handling-in-java-and-csharp/hero.jpg
    alt: File Handing in Java and C# Hero Image
---
Java and C# are object-oriented programming languages that utilize different classes for creating, deleting, opening, and closing files. 
<!--more-->
A file is a unit of storage that stores data in the form of a sequence of bytes on a disk.

Therefore, file handling is a technique that involves storing data in a file using a computer for later retrieval.

### Table of contents
- [File handling operations](#file-handling-operations)
- [Classes and methods that manage files](#classes-and-methods-that-manage-files)
- [Importance of file handling](#importance-of-file-handling)
- [Conclusion](#conclusion)

### File handling operations 
- `Create` - It involves the creation of a new file.
- `Read`  - It entails reading the previously stored data in the file.
- `Write` - In this operation, a new value/content is stored in memory.
- `Append` - Appending data involves adding more information to an existing file.
- `Delete` - This operation entails removing an existing file from memory or disk. 

#### How to perform create, read, write and delete operations on text files

#### In Java
We use the `File` class from the `java.io` package, which allows us to work with files.

From your code, you will be prompted to import various packages depending on the file operation. 

For instance, whenever you want to create a file in Java, you need to import the `java.io.File` class.

```java
import java.io.File;
```

### Creating a File in Java
When creating a file in java, we use the `createNewFile()` method. This function returns a boolean (true or false result). It also relies on the `java.io.File` class. 

The following code shows how to create a file in Java:

```java
import java.io.File;
import java.io.IOException; //importing required packages

public class CreateNewFile {
    public static void main(String []args) throws IOException
     {
        File myFile= new File("New.txt"); //using the file class to create a text file

        if(myFile.createNewFile()){ //checking if a new file was created
            System.out.println("File is created successfully");
        }else{
            System.out.println("File creation Error"); //shows an error
        }
    }
}
```

In the above code snippet, the `File` class provides a `createNewFile()` function for generating an empty file. 

This method does not take any arguments and returns a boolean value indicating whether the file was created or not. 

A file is created when the condition in the `if` statement is satisfied; otherwise, an error will be displayed.

The following is the output of the above code snippet:

```bash
The file is created successfully
```

> Note: You need to list the exact path of the folder to which you are creating the new file regardless of how long it may be. In this case, the created file is located at `C:\Users\apond\IdeaProjects`.

### Writing a file in Java
To write a file successfully, one needs to specify the type of data. This operation uses the `FileWriter()` and `write()` methods. 

The following code shows how to write a file:

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriting {

    public static void main(String[] args) {
   
        String data = "My name is Ashley and I'm writing data into this file.";
        // we will write the above string to a file
        try{ // We wrap the write operation inside a try-catch block
            FileWriter output = new FileWriter("New1.txt");
            output.write(data); // Writing our data
            System.out.println("Data is entered successfully");
            output.close();
        }catch(IOException ioe){ // This block is invoked incase of an error
            System.out.println("Data entry Error");
        }
    }
}
```

In the above code, the `write()` function of the `FileWriter` class is used to add data to a file. 

This technique is used to write a single character or a string into a file. In our case, we used a variable named `data` of type `String` to store some content.

**Output:**

```bash
Data is written successfully
```

> Note: The `FileWriter()` class is used alongside the `write()` method.

If the program runs successfully, navigate to your folder and check if the newly inserted data is available.

### Reading data from a file
This operation relies on the `FileReader()` and `read()` methods.

The program below allows one to read data from a file:

```java
import java.io.FileReader; // Adding the required imports
import java.io.FileWriter;
import java.io.IOException;

public class FileReading {

    public static void main(String[] args) {

       char[] data= new char[100]; // Creating a list to store the file's contents

        try{
            FileReader input = new FileReader("New1.txt"); // Specifying file
            input.read(data); //Reading data
            System.out.println("Data received from a file");
            System.out.println(data); // Printing data
            input.close(); //Closing the read operation
        }catch(IOException ioe){ // Throws an exception
            System.out.println("Error in File Reading ");
        }
    }
}
```

To read the content of the new file that we created earlier, we use the `java.io` package.

It contains a class called `FileReader` that reads characters from a file. It also extends the `InputStreamReader` class.

The `FileReader` class has a `read()` method that either reads a single character or all characters and stores them in the `data` array. 

We used a `data` variable in the above code to store an array of characters. It can store up to `100` characters.

**Output:**

```bash
Data received from a file
My name is Ashley. I am writing data into this file.                                               
```

### Appending data
It uses the `append()` method and `FileWriter()` class.

The string representation of the `char` argument is appended to the file using a `StringBuffer`. The sequence's length also increases by one.

In the code snippet below, the details stored in the `data` variable are added at the end of the content inside the `New1.txt` file.

The following code shows how to append data:

```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileAppending {

    public static void main(String[] args) {
        String data="This is an appended data"; // Data that needs to be appended
        
        try{ //try-catch block
            FileWriter output= new FileWriter("New1.txt",true);
            output.write(data); //appending data
            System.out.println("Data is appended successfully");
            output.close();
        }catch(IOException ioe){ // Throws exception incase of error
            System.out.println("File append error");
        }
    }
}        
```

**Output:**

```bash
Data is appended successfully
```

### Deleting a file
This operation involves the use of the `delete()` method.

In this step, we will duplicate an existing file and then create a program to delete it.

The below code shows how to implement the delete operation:

```java
package com. ashley;

import java.io.File;

public class Main {

    public static void main(String[] args){
   
        File myFile= new File("New2.txt"); //specifying file that needs to be deleted

        if (myFile.delete()){ // Calling the delete function
            System.out.println("File Deleted Successfully");
        }else{ //This section is invoked when the delete operation was unsuccessful.
            System.out.println("File deletion Failed");
        }
    }

```

**Output:**

```bash
File Deleted Successfully
```

### Reading, writing, appending and deleting operations in C#
The `System.IO.File` class is utilized in read, write, delete and append operations.

```c#
using System.IO;
```

### Writing a file in C#
A `StreamWriter` is used when writing data into a text file. It is used alongside the `write()` method.

The following code illustrates how to write a file in C#:

```c#
using System;
using System.IO; // Imports

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Write();
            Console.ReadLine();
        }
        const string filename = "example1.txt";  //Specifying file name
        static void Write()
        {
            StreamWriter sw = new StreamWriter(filename);
            sw.WriteLine("Hey am Ashley and am writing a text");
            sw.Close(); // Closing the write operation
        }
    }
}
```

> To access the output, check in the `debug` folder located in `C:\Users\apond\source\repos\FileIO\FileIO\bin\Debug` directory.

### Reading a file in C#
The `StreamReader` class has a `read()` method that either reads a single character from the reader or retrieves all characters.

The code below shows how to write a file in C#:

```c#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Read(); // Invoking the read function
            Console.ReadLine();
        }
       
        static void Read(){
            StreamReader sr = new StreamReader(filename);
            string s=sr.ReadToEnd(); // Reading content
            Console.WriteLine(s); // Printing output
            sr.Close();
        }
    }
}

```

**Output:**

```bash
Hello I'm Ashley and I'm writing a text
```

### Appending a file
The `Append()` function is used to open an existing file and add new text.

Below is a sample code of how to append a file:

```c#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Append(); // Invoking the append function
            Console.ReadLine();
        }
        static void Append()
        {
            StreamWriter sw = new StreamWriter(filename, true);
            for (int i = 0; i < 4; i++){ // Using a for loop to iterate through the data.
                sw.WriteLine(i); // Adding data to file
            }
            sw.Close();
        }
    }
}

```

**Output:**

```bash
Hey am Ashley and am writing a text
0
1
2
3
```

The above output shows that the file is appended with a loop.

### Deleting a file
The following code shows how to append a file:

```c#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            const string filename = "example2.txt";
            Console.WriteLine("Deleting file!");
            File.Delete(filename); // Calling the delete function and passing in the file

        }
    }
}

```
In the above code, we have erased the 'example2.txt' file permanently using the 'delete()' method.

### Classes and methods that manage files

#### In Java 
- `FileWriter()` - This class is character-oriented which writes data to a file.
- `FileReader()` - This class allows one to read data from a file in byte format.
- `delete()` - This function returns a **boolean** value after deleting a file.
- `getName()` - This method is of a **string** type and gives out the file name.
- `read()` - This technique reads data from a file.
- `write()`- This function gives out the output of the file.
- `IOException` - This exception is for handling failures or errors in a program.

#### In C#
- `StreamWriter()` - This class is used for character output.
- `StreamReader()` - This class is used for character input.
- `Close()` - This method closes an open file.

#### Importance of file handling 
- Programs can process and use data.
- It enables data to be saved into computer memory.
- Information can also be stored in a file and retrieved later.

#### Conclusion
In this tutorial, we learned about different file handling techniques in Java and C#. We also discussed vital classes and methods used in file operations.

You can, therefore, use this knowledge to implement file handling operations in Java and C# programs.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
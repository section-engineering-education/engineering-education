### Goal
The purpose of this essay is to help the reader understand how file management works in Java and C#. They are both object-oriented programming languages but use different classes for creating, deleting, opening, and closing files.

### Introduction
A file is a unit of storage that stores data permanently in the form of a sequence of bytes in a disk.

### Table of contents

- [Introduction to File handling concepts](#introduction-to-file-handling-concepts)
- [File Handling Operations](#file-handling-operations)
- [Classes and Methods that Manage Files](#classes-and-methods-that-manage-files)
- [Importance of File Handling](#importance-of-file-handling)
- [Conclusion](#conclusion)
 
### Introduction to File Handling Concepts
 File handling is a preventive technique that involves storing data in a file using a computer for later retrieval.

### File Handling Operations 
- Create - This involves the creation of a non-existing file.
- Read  - This involves reading the previously stored data in the file.
- Write - Write operation involves storing a new value/content in the memory.
- Append - Appending data involves having additional data into an existing file.
- Delete - This is doing away with an existing file permanently. 

#### How to perform Create, Read, Write and Delete Operations on text files

#### In Java
We use the File class from the `java.io` package, which allows us to work with files.
From your code, you will be prompted to import various packages depending on the file operation. Whenever you want to create a file in java, you need to import the `java.io.File` class.

``` java
import java.io.File;
```

#### Steps when creating a New File in Java
 - Open your IDE, e.g., Intellij,Netbeans,Eclipse e.t.c.
 - Give it a name, select the file location and click finish.

### Creating a File in Java
When creating a file in java, we use the `createNewFile()` method. It is a boolean, gives out either a true or false result, and uses the `java.io.File` class. 

#### Below is a sample code for creating a file in Java :

``` java
import java.io.File;
import java.io.IOException;

public class CreateNewFile {
    public static void main(String []args) throws IOException
     {
        File myFile= new File("New.txt");

        if(myFile.createNewFile())
        {
            System.out.println("File is created successfully");
        }
        else
        {
            System.out.println("File creation Error");
        }

    }
}
```
#### Explanation
As shown in the above code snippet, the File class provides a createNewFile() function for creating an empty file. This method accepts no arguments and returns a boolean value indicating whether the file should be created or not. The file will be successfully created if the condition in the if statement is satisfied; otherwise, a file creation error will be displayed.
The following is the output of the above code snippet:

```
File creation is a success.

```
> Note: You need to list the exact path of the folder to which you are creating the new file regardless of how long it may be. In this case, the created file is located at `C:\Users\apond\IdeaProjects` then the project folder \\FileManagement and the name of the newly created file \\New1.txt.

### Writing a File in Java
For it to function effectively, It necessitates the proper specification of the data to be written. It uses the `FileWriter()`class and `write()`method. 

#### Below is a sample code that shows how to write a file:

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriting {

    public static void main(String[] args) {
    // write your code here
        String data = "My name is Ashley and I'm writing data into this file.";

        try
        {
            FileWriter output = new FileWriter("New1.txt");
            output.write(data);
            System.out.println("Data is entered successfully");
            output.close();
        }
        catch(IOException ioe)
        {
            System.out.println("Data entry Error");

        }
    }
}

```
#### Explanation
The write() function of the FileWriter class is used to write to the file we created earlier. This technique is used to write a single character or a string into a file, depending on the demands of the user. To store the string to be written into our new1 file, we used a variable named `data` of type `String`.

#### Output of the code :
```
Data is written successfully

```
> Note : The `FileWriter()` class is used together with the `write()` method.
If the program runs successfully, go back to your folder and check if the newly inserted file is available.

### Reading Data From a file
It uses the `FileReader()` class and `read()` method.

#### Below is a program that Reads data in a file:
#### Explanation
To read the content of the new file we created earlier, `java. io` package contains a class called `FileReader` that reads characters from a file. As you can see from the code, it extends the InputSreamReader class.

This class has a `read()` method that either reads a single character from the reader or reads all of the characters and stores them in an array. We used a data variable in the code below to store an array of characters read from the file. It can store up to 100 characters.
#### Code Snippet
```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileReading {

    public static void main(String[] args) {

       char[] data= new char[100];
        try{
            FileReader input = new FileReader("New1.txt");
            input.read(data);
            System.out.println("Data received from a file");
            System.out.println(data);
            input.close();
        }catch(IOException ioe)
        {
            System.out.println("Error in File Reading ");
        }
    }
}
```
#### Output to the code:
```
Data received from a file
My name is Ashley. I am writing data into this file.                                               
```

### Appending data
It uses the `append()` method and `FileWriter()` class.

The java.lang's append() method. The string representation of the char argument is appended to this sequence by StringBuffer. This sequence's contents are appended with the argument. This sequence's length increases by one.

In the snippet code below, the content of the variable data is added to the end of the content of the New1.txt file.

#### Below is a snippet code for Appending data:

```java

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileAppending {

    public static void main(String[] args) {
        String data="This is an appended data";
        
        try{
            FileWriter output= new FileWriter("New1.txt",true);
            output.write(data);
            System.out.println("Data is appended successfully");
            output.close();
        }catch(IOException ioe){
            System.out.println("File append error");
        }
    }
}        
```
#### Output to the code:
```
Data is appended successfully
```

### Deleting a File
Involves the use of the `delete()` method. On calling this method, it deletes the desired file.

#### The following needs to be done :
- Go to your project folder where other files are saved.
- For this demonstration, we will make a clone of an existing file and rename it. Our program will delete the file.

#### Below is a code to illustrate Delete() operation:
```java
package com. ashley;

import java.io.File;

public class Main {

    public static void main(String[] args)
    {
   
        File myFile= new File("New2.txt");

        if (myFile.delete()){
            System.out.println("File Deleted Successfully");
        }else{
            System.out.println("File deletion Failed");
        }
    }
}

```
#### Output to the code:
```
The file is deleted successfully
```

### In C#
The `System.IO.File` class is involved with the read, write, delete and append operations.

```c#
using System.IO;
```

#### Steps when creating a New File in C#
 - Open your IDE, e.g., Microsoft Visual Studio.
 - Name your project e.g., as FIleIO, select Console App(Net Framework) then click OK.

### Writing a File in C#
#### Explanation
A `StreamWriter` is used when writing data into a text file. It is used together with the `write()` method.

#### Code snippet of how to write a file:
```C#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Write();
            Console.ReadLine();
        }
        const string filename = "example1.txt"; 
        static void Write()
        {
            StreamWriter sw = new StreamWriter(filename);
            sw.WriteLine("Hey am Ashley and am writing a text");
            sw.Close();
        }
    }
}

```
> To get output, check-in the debug folder located in `C:\Users\apond\source\repos\FileIO\FileIO\bin\Debug` then inside the debug folder is the newly created `example1.txt` file.

### Reading a File
#### Explanation
This class `StreamReader` has a `read()` method that either reads a single character from the reader or reads all of the characters from the reader.

#### Code snippet of how to write a file:
```C#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Read();
            Console.ReadLine();
        }
       
        static void Read()
        {
            StreamReader sr = new StreamReader(filename);
            string s=sr.ReadToEnd();
            Console.WriteLine(s);
            sr.Close();
        }
    }
}

```
#### Output:
```
Hello I'm Ashley and I'm writing a text
```
### Appending a File
#### Explanation
The `Append()` method is used to open an existing file and add new text to the file.

#### Below is a sample code of how to append a file:
```C#
using System;
using System.IO;

namespace FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            Append();
            Console.ReadLine();
        }
        static void Append()
        {
            StreamWriter sw = new StreamWriter(filename, true);
            for (int i = 0; i < 4; i++)
            {
                sw.WriteLine(i);
            }
            sw.Close();
        }
    }
}

```
#### Output to the code is:
```
Hey am Ashley and am writing a text
0
1
2
3
```
The above output shows that the file is appended with a loop.

### Deleting a File
#### Below is a sample code of how to append a file:
```C#
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
            File.Delete(filename);

        }
    }
}

```
We create a copy of the original 'example1.txt' file and rename it to 'example2.txt'. We erase the file 'example2.txt' permanently with the 'delete()' method.

### Classes and Methods that Manage Files

#### In Java 
- `FileWriter()`- This class is character-oriented which writes data into a file.
- `FileReader()` - This class is a character-oriented class that reads data from a file in byte format.
- `delete()` - This is a **boolean** type that removes a file permanently.
- `getName()`- This method is of a **string** type and gives out the file name.
- `read()` - This technique reads data from a file.
- `write()`- This method gives out the output of the file.
- `IOException`- This exception is for handling failures in a program.

#### In C#
`StreamWriter()`- This class is used for character output.
`StreamReader()`- This class is used for character input.
`Close()` - This method closes the file that was opened.


#### Importance of File Handling 
- Programs can process and use data.
- It enables a program to be saved into computer memory.
- To avoid data loss, data can be saved in a file and retrieved later.
#### Conclusion
In this tutorial, we learned about exception handling mechanisms. We managed to look at the different types of operations. We also learned about the classes and methods used in the respective programs.
My advice to the learner is to practice how to create, delete, append, read and write files using Java and C# Programming Languages.
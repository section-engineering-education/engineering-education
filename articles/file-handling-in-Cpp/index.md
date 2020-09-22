---
layout: engineering-education
status: publish
published: true
url: /engineering-education/file-handling-in-Cpp/
title: File Handling in C++
description: In this article, we will walk through how to implement the File Handling function in C++, and we will cover the key working pointers of file handling.
author: parampreet-singh
date: 2020-09-21T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/file-handling-in-Cpp/hero.jpg
    alt: functions Function C++ cpp
---
If you are a Software Engineer, you may come across File handling or file input/output at some point in your career. It is the ability to store the output and perform various operations on it, such as updating the data or reading/writing text to a file. Files are always a vital way to store data.
<!--more-->
### Why do you need File Handling?
- **Reusability**: Generally, developers work with big data, and it's always not efficient to write everything out by storing data in files, one can use those files anytime.

- **Larger Storage Capacity**: Storing a large amount of data or test cases (to make sure that your code runs in every condition) is a tedious task, and by using files, a developer can store that data easily.

- **Portability**: With files, developers can transfer the data without worrying about data loss.

In this article, we will walk through how to implement a file handling function in C++, and we will cover the key properties and challenges when it comes to file handling.

- Opening a File
- Writing to a File
- Reading from a File
- Closing and Saving a file

To perform file handling functions, we need to add another library: fstream. This library holds all the functions related to handling files. Here's how to include it.

`#include<fstream>`

Let's dive straight into learning.

### Opening a File
One of the most common actions in File Handling is opening a file. Let's see how to do it:

```C
ifstream fin;
fin.open("index.txt")
```

That was simple as we just used the function **open** to open a file name "index.txt." Here we use the ` ifstream` object to open our file.

**ifstream** is the type we use to declare an object. Very similar to the datatypes that we use in other functions, such as: int, float, bool or string.

**fin** is the name of the variable. We could name it anything we want.

### Writing to a File
Writing to a file is easier than even opening a file. Instead of using **cout**, we just need to use the name of the variable that we recently selected. Here's how to do it:

```C
fin<<"Section.io is a great platform to learn about new technologies."<<endl;
```

### Reading from a File
We first need to declare a variable similar to the type of data in our file. Then we can run a while loop until the very end of the file and cout all the data. It sounds a bit complex, but it isn't. Here's how to do it:

```C
string data;
while(fin >> data) {
cout<<data;
}
```

### Close a File
Closing a file is the easiest of all the actions we've done so far. Here's how to do it:

```C
fin.close();
```

It's just that simple.

So far, we have covered everything that a beginner needs to know about file handling, or you could say everything that you will ever use. Now let's write a program to implement what we have just covered to get a clearer picture.

```C
#include<iostream>
#include<fstream>

using namespace std;

int main() {
ifstream file;
string file_data;

file.open("index.md"); //Opening a File
fin<<"Section.io is a great platform to learn about new technologies."; //Writing in a File

while(file >> file_data) { //Redaing from a File
cout<<data;
}
file.close(); //Closing a File

return 0;
}
```

In the above program , we implemented everything that we have covered so far. Let's break it down and see what's going on in the above program.

- **Opening a File**

To open a file, we used a function ```file.open("index.md")``` that opens a file named **index.md**. 

- **Writing to a File**

Writing in a file is same as the way we used to write in regular program with a minor change. In place of **cout** you just need to use the name of the varaible you choose for the file object. In the above program, we wrote it as ```fin<<"Section.io is a great platform to learn about new technologies."```, where **fin** is the name of the variable followed by what we want to write in the file.

- **Reading from a File**

To read from a file, we would run a loop until we read all of the data from the file and print it simultaneously. In the case of above program we print the data until the very end of the File. Here's how we implemented it:
```C
while(file >> file_data) { 
cout<<data;
}
```

- **Closing a File**

Closing a file is as simple as opening a file. You just need to use the name of the file object followed by the close function. In the above program, we wrote it as ```file.close();```, where file is the object name and **.close()** is the function. 

### Conclusion
With this, we've come to the end of this article. We got to cover the most important and used function/actions in file handling. What we have just covered is the extent to which a developer would need to know and what basic college classes teach.

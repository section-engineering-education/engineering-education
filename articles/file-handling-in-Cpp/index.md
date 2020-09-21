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
If you are a Software Engineer, you may come across File handling at some point in your career. It is the ability to store the output and perform various operations on it, such as updating the data or overwriting things in a file. Files are always a vital way to store data.
<!--more-->
### Why do you need File Handling?
- **Reusability**: Generally, developers work with big data, and it's always not efficient to write everything out. But by storing data in files, one can use it anytime.

- **Larger Storage Capacity**: Storing a large amount of data or test cases (to make sure that your code runs in every condition) is a tedious task, and by using files, a developer can store that data easily.

- **Portability**: With files, developers can transfer the data without worrying about data loss.

In this article, we will walk through how to implement the File Handling function in C++, and we will cover the key working pointers of File handling such as:

- Opening a File
- Writing to a File
- Reading from a File
- Closing a file

To perform File Handling functions, we need to add another library; fstream. The library holds all the functions related to File Handling. Here's how to include it.

`#include<fstream>`

Let's dive straight into learning.

### Opening a File
One of the most common actions in File Handling is opening a file. Let's see how to do it:

```C
ifstream fin;
fin.open("index.txt")
```

That was simple as we just used the function **open** to open a file name "index.txt." but you as the reader may be wondering what is ` ifstream`

**ifstream** is the type we use to declare an object. Very similar to the datatypes that we use in other functions. Such as: int.

**fin** is the name of the variable. A developer can name it anything they want.

### Writing in a File
Writing to a file is easier than even opening a file. Instead of using **cout**, we just need to use the name of the variable that we recently selected. Here's how to do it:

```C
fin<<"Section.io is a great platform to learn about new technologies."<<endl;
```

### Reading from a File
We first need to declare a variable similar to the type of data in our file. Then run a while loop until the very end of the file and cout all the data. It sounds a bit complex, but it isn't. Here's how to do it:

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
fin<<"Section.io is a great platform to learn about new technologies." //Writing in a File

while(file >> file_data) { //Redaing from a File
cout<<data;
}
file.close(); //Closing a File

return 0;
}
```

### Conclusion
With this, we've come to the end of this article. We got to cover the most important and used function/actions in file handling. The things we have just covered is the extent to which a developer would need to know and what basic colleges teach.

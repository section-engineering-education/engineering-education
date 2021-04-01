---
layout: engineering-education
status: publish
published: true
url: /engineering-education/file-handling-in-cpp/
title: File Handling in C++
description: This article, will walk through how to implement the file handling function in C++, and we will cover the key working pointers of file handling.
author: parampreet-singh
date: 2020-09-28T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/file-handling-in-cpp/hero.jpg
    alt: functions Function C++ cpp
---
If you are a software engineer, you may come across file handling or file input/output at some point in your career. It is the ability to store the output and perform various operations on it, such as updating the data or reading/writing text on a file. Files are always a vital way to store data.
<!--more-->

### Why do you need File Handling?
- **Reusability**: Generally, developers work with big data. It's not always efficient to write everything out, but by storing data in files but we can use those files anytime.

- **Larger Storage Capacity**: Storing a large amount of data or test cases (to make sure that your code runs in every condition) is a tedious task, and by using files, a developer can store that data easier.

- **Portability**: With files, developers can transfer the data without worrying about data loss.

In this article, we will walk through how to implement a file handling function in C++, and we will cover the key properties and challenges when it comes to file handling.

- Opening a File
- Writing to a File
- Reading from a File
- Closing and Saving a File

To perform file handling functions, we need to add another library: fstream. This library holds all the functions related to handling files. Here's how to include it.

`#include<fstream>`

Let's dive straight into learning.

### Opening a File
One of the most common actions in File Handling is opening a file. Let's see how to do it:

```C
ifstream fin;
fin.open("index.txt");
```

That was simple. We just used the function **open** to open a file name "index.txt." Here we use the ` ifstream` object to open our file.

**ifstream** is the type we use to declare an object. Very similar to the datatypes that we use in other functions, such as: int, float, bool or string.

**fin** is the name of the variable. We could name it anything we want.

*Note:* The one thing to keep in mind is that if the file we are trying to open doesn't exist on our computer, then this program automatically creates a new one with the same name or deletes everything in it. We can also opt to use this option whenever we need to create a file. You can also give a second argument to specify how you want to handle your file:

- ios::app   -- Append to the file
- ios::trunc -- Delete everything in the file

In case, you want to append the file. Here's how you would do it:

```C
ifstream fin;
fin.open("index.txt", ios::app);
```

You won't always know what file to open, so we can also opt-in for this option to ask the name of the file. Here's how we can do it:

```C
string filename;
cout<<"Enter the name of the File?";
cin>>filename
ifstream fin;
fin.open(filename.data());
```

Here in this code snippet, we just asked for the name of the file, and then proceed with the same steps we did above.

One of the most common errors we face while opening a file is: what if a file is already open before we are using it. We need to ensure that doesn't happen because otherwise we would not be able to open it, our file could get corrupted, and we may lose all of our existing data. Here's how we ensure that doesn't happen:

```C
while(!infile.Is_open()){
cout<<"File doesn't Found!"<<endl;
cout<<"Enter the File name again?"<<endl;
cin>>filename;
iafile.clear();
infile.open(filename.data());
}
```

In the function above, we checked to see if our file isn't already open and if it is, we would go into the loop and ask the user again for the correct name of the file. With that, we would use a function `iafile.open();` that remove all the error conditions that we may have faced while opening a file and ensuring that our file doesn't get corrupted.

### Writing to a File
Writing to a file is easier than opening one. Instead of using **cout**, we need to use the name of the variable that we recently selected. Here's how we do it:

```C
fin<<"Section.io is a great platform to learn about new technologies."<<endl;
```

### Reading from a File
We first need to declare a variable similar to the type of data in our file. Then we can run a while loop until the very end of the file and cout all the data. It sounds a bit complex, but it isn't. Here's how we do it:

```C
string data;
while(fin >> data) {
cout<<data;
}
```

### Close a File
Closing a file is the easiest of all the actions we've done so far. Here's an example on how we can do that:

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
string filename;
string file_data;

cout<<"Enter the name of the file?"<<endl; //Opening a File
cin>>filename;
file.open(filename.data());

while(!infile.Is_open()){ //If our file is already open
cout<<"File doesn't Found!"<<endl;
cout<<"Enter the File name again?"<<endl;
cin>>filename;
iafile.clear();
infile.open(filename.data());
}

fin<<"Section.io is a great platform to learn about new technologies."; //Writing in a File

while(file >> file_data) { //Reading from a File
cout<<data;
}
file.close(); //Closing a File

return 0;
}
```

In the program above, we implemented everything that we have covered in steps so far. Let's break it down and see what's going on in the example program above.

- **Opening a File**

To open a file, we asked the user for the name of the file. And if the file was already opened, we ensured that our file didn't get corrupted by using the while loop.

- **Writing to a File**

Writing in a file is the same way we used to write in regular program with a minor change. In place of **cout** you just need to use the name of the variable you choose for the file object. In the program above, we wrote it as `fin<<"Section.io is a great platform to learn about new technologies."`, where **fin** is the name of the variable followed by what we want to write in the file.

- **Reading from a File**

To read from a file, we would run a loop until we read all of the data from the file and print it simultaneously. In the case of program above we print the data until the very end of the file. Here's how we implemented it:

```C
while(file >> file_data) {
cout<<data;
}
```

- **Closing a File**

Closing a file is as simple as opening a file. You just need to use the name of the file object followed by the close function. In the above program, we wrote it as `file.close();`, where file is the object name and **.close()** is the function.

### Conclusion
With this, we've come to the end of this article. We got to cover the most important and used function/actions in file handling. What we have just covered is the extent to which a developer would need to know and what basic college classes teach when it comes to file handling. Hope you find it helpful! Happy coding!

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)

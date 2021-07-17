---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-structs-sorting-in-c++/
title: Getting Started with Structs Sorting in C++
description: In this article we will learn how to create the structs in C++ then we will learn how to sort structs using their members. Structs are user-defined data types found in both C and C++.
author: samuel-mwangi
date: 2021-05-10T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-structs-sorting-in-c++/hero.png
    alt: Getting started with structs sorting Image
---
Structs are user-defined data types found in both C and C++. They are capable of holding data items of different data types under a single name, which is different from arrays, that only hold data items of the same datatype.
<!--more-->
### Prerequisites
For this tutorial to be helpful, you should have the [Falcon IDE](https://sourceforge.net/projects/falconcpp/files/latest/download) or any other C++ IDE that you are comfortable with and also some basic knowledge in C++.

### Goal
In this tutorial, we will first polish the basics of Structs in case you are new to them, then we will go ahead and learn how we can sort structs using their members.

### Creating a Struct 
We use the Keyword  `struct` to create a struct. 

Here is what the general syntax of a struct should look like.
```c++
 struct struct_name
{
	//Members declaration
	type_1 member_1;
	type_2 member_2;
	.
	.
	.
	type_n member_n;
};
```

### Declaring struct variables
There are two ways of declaring struct variables:

#### 1. Declaring structure variables during structure declaration
Just after the end of the structure definition, before we place the semicolon (;), we can add optional object names of the struct that will be used to declare structure objects of that similar build.

Example:
```c++
using namespace std;

struct Person
{
	char name;
	int age;
}Employee,Student;
```

The keyword **typedef** is also used with structs to define a new object if we wish to use the object to declare struct variables directly as we shall see later in "working with arrays of a structure".

#### 2. Declaring structure variables like basic data types
In this case, the `struct_name` is used to create a new object.

Example:
```c++
#include <bits/stdc++.h>
using namespace std;

struct Person
{
	string name;
	int age;
};

int main()
{
	Person Employee;
	Person Student;
}
```

###  Initializing Struct members
Struct members are only initialized through the struct variables (objects) and not through declaration.

This is done using braces '{}'.  

Example:
```c++
#include <bits/stdc++.h>
using namespace std;

struct Person
{
	string name;
	int age;
};

int main()
{
	Person Employee = {"frank",63 };
	Person Student = {"Clare",53 };
}
```

Or by using a dot:
```c++
#include <bits/stdc++.h>
using namespace std;

struct Person
{
	string name;
	int age;
}Employee,Student;

int main()
{
	Employee.name = "Frank";
	Employee.age = 63;
	
	Student.name = "Clare";
	Student.age = 53;
}
```

### Accessing struct elements
The struct elements can also be easily accessed by using the dot (.) as the following:
```c++
#include <bits/stdc++.h>
using namespace std;

struct Person
{
	string name;
	int age;
}Employee,Student;

int main()
{
	Employee.name = "Frank";
	Employee.age = 63;
	
	Student.name = "Clare";
	Student.age = 53;
	
	// we access the elements here using the "." and print them 
	cout << Employee.name <<" "<< Employee.age << endl ;
	cout << Student.name << " "<< Student.age;
}
```

Output:
```bash
Frank 63
Clare 53
```

### Working with arrays of a structure
It is an array consisting of structs. It can be used to store many instances of a struct object. We are going to create an array of structs that shall use "for loops" for the collection of the user input and also displaying it.
```c++
#include <iostream>
using namespace std;

typedef struct Person
{
	string name;
	int age;
}Student;

int main()
{
	int i,n;
	cout<< "Enter number of students :";
	cin>> n;
	
	// we set the array to the number of students according to the users input
	Student s_array[n];
	
	// we prompt the user to enter input 
	cout<<"Enter Name of Student followed by age \n\n";
	// the for loop below collects the user input for the specified number of students
	for(i=0;i<n;i++){
		cout<<"________\n"; // just a line to enhance readability
		cin>>s_array[i].name;
		cin>>s_array[i].age;
	}
	
	cout<<"\nHere is the students list:\n";
	//the for loop below prints the user output in the order of entry
	for(i=0;i<n;i++){
		cout<<s_array[i].name <<"   "<<s_array[i].age <<endl;
	}
}
```

###  Sorting Structs
Now that we are familiar with how Structs work, let's get started with the sorting. We are going to add more attributes (members) of a person to the `Person` Struct to make it much more practical. 

In addition to that, we are also going to add a comparator function that will be used by the STL sort function for sorting in our Structs. In our comparator function we decide which member we want to use to sort the arrays of structs. 

In our case, we are going to sort them using their age, from the youngest to the oldest by using the less-than operator (<) .ie:
```c++
bool compare( Student a, Student b){
	if(a.age < b.age)
		return 1;
	else 
		return 0;
}
```

To sort them from the oldest to the youngest, you should just go ahead and replace the '<' with the '>' operator. If you also want to change the sorting member, you just need to replace it where `age` is mentioned in the comparator function. 

The fun fact is, you may also sort them alphabetically by modifying the comparator function to look like this:
```c++
bool compare( Student a, Student b){
	if(a.name < b.name)
		return 1;
	else 
		return 0;
}
```

The last thing left to do is to call the `sort` function that is found in the `<algorithm>` library. We shall give it three parameters. 

The first two are simply the range of elements to sort, which in this case are the range of structure arrays and the third one is the comparator function. 

Such as:
```c++
sort(s_array, s_array+n, compare);
```

Finally, our entire code should look like this.
```c++
#include <iostream>
#include <algorithm>
using namespace std;

typedef struct Person
{
	// this are the attributes 
	string name;
	int roll_no;
	int age;
        int weight;
	
}Student;  // declare the student variable

/* our Comperator function
 (<) sorts in ascending order, replace with (>) for descending order **/

bool compare( Student a, Student b){
	/** to use another attribute for sorting, just replace 'age' with it eg. (a.roll_no < b.roll_no)
	 the return value determines which student will go first in the sorted array **/
	if(a.age < b.age)
		return 1;
	else 
		return 0;
}

int main()
{
	int i,n;
	cout<< "Enter number of students :";    // to determine the size of array
	cin>> n;
	
	// we set the array to the number of students
	Student s_array[n];
	
	cout<<"Enter Name of Student, roll number, age, and weight \n\n";
	//for loop to collect input
	for(i=0;i<n;i++){
		cout<<"---------\n";   
		cin>>s_array[i].name;
		cin>>s_array[i].roll_no;
		cin>>s_array[i].age;
		cin>>s_array[i].weight;
	}
	
	sort(s_array, s_array+n, compare);
	 /** this is the sort function
	its first & second parameter tells it the range of the array we want sorted
	and the third one is our comparator function **/
	
	cout<<"\nHere is the sorted list of Students :\n";
	//for loop to print the output
	for(i=0;i<n;i++){
		cout<<s_array[i].name <<"   " ;
		cout<<s_array[i].roll_no << "  ";
		cout<<s_array[i].age << "  ";
		cout<<s_array[i].weight << endl;
	}
}
```

### Conclusion
This knowledge surely has a lot of applications in C++. Feel free to play around with the code and add some more features of your own or even apply them to your projects.

Happy coding! 

### Futher reading
For more on structs and structs sorting visit [cplusplus](https://www.cplusplus.com/forum/general/97555/).

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)

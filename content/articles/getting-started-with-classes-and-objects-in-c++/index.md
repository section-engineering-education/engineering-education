---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-classes-and-objects-in-c++/
title: Getting Started with Classes and Objects in C++ 
description: In this article, we will learn about Classes and Objects in C++. A class is a logical method of grouping data and functions in the same construct. It is declared using the class keyword, whose functionality is similar to that of the struct C keyword.
author: dawe-daniel
date: 2021-01-24T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-classes-and-objects-in-c++/hero.jpg
    alt: Getting started with classes and objects in C++ Hero Image
---
The C language limitations are evident when a software project is too large to manage. This problem was addressed by adding several extensions to the C language. The main incorporation was the concept of class. The most significant aspect of C++ classes is that it promotes object-oriented programming, which treats data as a critical element.  
<!--more-->
This article goes through the creation of classes, objects, and objects as function arguments.
### Prerequisites
To follow this article, you will need to have:
- A [codeblocks IDE](http://www.codeblocks.org/downloads) to run the code.
- A basic understanding of the [C++ language](/intro-to-c-part1/).
- A basic understanding of [functions](/functions-in-cpp/).

### What is a class?
A class is a logical method of grouping data and functions in the same construct. It is declared using the `class` keyword, whose functionality is similar to that of the `struct` C keyword. Only with the option of including functions as members rather than data. Classes are data types specified by users and behave like a programming language's built-in types. We can construct any number of objects, belonging to that class after the class has been defined.

### What is an object?
An object is a data structure that encapsulates data and functions in a single construct. In an object-oriented framework, they are the basic run-time entities. Objects can represent anything the program has to handle, such as a shape, a place, time, and many others.

Objects communicate by sending messages to each other when a program is being executed. Each object requires data and functions to modify the data. They can interact without having to know each other's data or function details.

Syntax of creating a class:

```c++
class className{
permission_label_1
member1;

permission_label_2
member2;
 }object_name;

```

Let's break down the syntax:

After writing the class's name, we open the class, using the curly bracket `{` and close the class using the curly bracket with a semicolon `};.`

- `class` - It is a user-defined data type.
- `className` - It is a name for the class.
- `permission_label` - It refers to the permission that the members acquire.
- `member1`- It is the data members of the class.
- `member2` - It is the function declarations.
- `object_name` - It is the name of the object defined by the user.

Members included in the declaration body can either be data or function declarations and permission labels/access specifiers. Permission labels refer to the permission that the members acquire. 

If the permission label is not specified or declared by default, it is set to `private.` 

They can be any of the following keywords:
`Private` - They can be accessed by members of the same class or their friend class.
`Public` -  Members can be accessed anywhere the class is visible.
`Protected` - Members can be accessed by members of their same class, friend class, and derived classes.

Let's get started and create our first class and object!

#### Step 1 – Creating a console wizard application
In the first step, we're going to create a console application. Open code blocks and click create a new project with console application wizard and select the language as C++. 

On the next page, give the project a title. In this case, we are going to name it after our class `person` example. Keep the default settings. 

![Console app](/engineering-education/getting-started-with-classes-and-objects-in-c++/console.png)

Click `Finish` to create the project.

#### Step 2 – Creating a class
On your project window, 
- Select `person -> sources -> main.cpp` - On the screen that will be displayed, we can go ahead and keep `#include<iostream>` and `using namespace std` library files. `#include<iostream>` is the header file containing definitions objects like cin, cout, which stands for input-output manipulators. 

- `namespace` is used to avoid conflicts in files having the same variable names and function names in the same scope. `using namespace std` means that we use the namespace called standard. It is because the compiler needs to know the definition of the code of the functionalities which is defined in the header file 

- `#include<iostream>`. `using namespace std` is required when functionalities like `cout`, `cin` and `endl` is used, but not defined in the current scope, the compiler needs to know where to check. If this namespace is not used, the compiler generates errors.

Go ahead and clear the default main function program example. Add the following code after `using namespace std` to create the class:

```c++
// class definition
class person
{
	int age;
	char name[30];
public:
void get_details(void);   	// function 
{
	cout<<”Enter your Name:”<<endl;
	cin>>name;
	cout<<”Enter your Age:”<<endl;
	cin>>age;
}
	
void display_details(void);		//function prototype
};
```

We can break down the code, as shown below:
- ` //` - It is used to show a comment in the program. 
- `person` - It is the name of our class.
- `int age` - We have declared our variable `age` of the type “int” in the private section (by default). We will be using it to store the age.
- `char name[30]` - We have declared another variable `name` of the type "char" that will accept characters not exceeding 30, which is the limit of user input. It is also in the private section (by default).
- `public` - It is the permission label. The functions declared can be accessed anywhere in our program.
- `cout` - (character output) is used to display a character's output to the output device. It is used to view a stream of characters along with the insertion operator` <<`. In this case, "Enter your name" and "Enter your age" characters will be output to the user. 
- `cin` - (character input) is used to collect user input. It is used to receive a stream of characters along with the extraction operator` >>`. In this case, the characters that will be input will be stored in the variable given after the extraction operator.  
- `void get_details(void)` - It is the function used to collect user input.
- `void display_details(void);` - It is the function prototype that we will use to display user input.

It's that simple to create a class. You need data and functions that manipulate the data. In the program above, we have created our class `person`, which is used to get and display the user's name and age details. 

#### Step 3 – Defining the functions
Now that we have the class, we can create objects from it, but before we create the object, let's first define our functions. We can define functions either within the class (inline member functions) or outside the class (non-inline member functions).

For example, in the class `person`, the function `void get_details(void)` is inline as the function has been defined within the class. 

The function prototype ` void display_details(void);` can be defined outside the class using the scope resolution operator`::,` that specifies the class to which the member being declared belongs:
```c++
void person::display_details(void);
{
	cout<<” NAME: “<<name<<endl;
	cout<<” AGE: “<<age<<endl;
}
```

The scope resolution operator specifies that the function `display_details` belongs to the class `person`.

#### Step 4 – Creating an object
In this step, we will create the object, that is simply a variable of the `type` class. After our class has been defined, we can declare any number of objects from it in the main function. To create the object, we specify our class's name, followed by the desired object name.

For example, from our class `person`, we can create an object as shown below:
```c++
int main()
{
	person p;    // P is an object of class person
	p.get_details();
	p.display_details();
    return 0;
}
```

- `person`- is our class.
- `P` - is the object.
- `p.get_details();` - is the function call that will call the function "get_details".
- `p.display_details();` - is the function call that will call the function "display_details".
- ` return 0;` - finishes executing and returns the values.

Using the dot membership operator `.`, public member functions can be accessed through the class object. Related to a data member of the class that is accessed. 

The dot operator specifies the data or function belonging to a particular object.

**NOTE:** The user is not limited to the number of objects he/she can create.

#### Step 5 - Compiling and running our program
Let's put the concepts above together to create a complete program that will take a user's name and age and display, as shown below:
```c++
#include <iostream>

using namespace std;
class person
{
    int age;
    char name[30];

    public:
    void get_details(void)
    {
    cout<< "Enter your Name:"<<endl;
    cin>>name;
    cout<< "Enter your Age:"<<endl;
    cin>>age;


    }
    void display_details(void);


};
void person::display_details(void)
{
    cout<< "NAME:"<<name<<endl;
    cout<< "AGE:"<<age<<endl;

}

int main()
{
    person p;
    p.get_details();
    p.display_details();
    return 0;
}
```

We will compile and run our program [here](https://repl.it/@Dawe7/class-person#main.cpp). Our program takes user input in the console window. 

Hence, we need to input the name and age details. Let's input the name David and age 30 as an example.

When the above code is compiled and executed, it produces the following result after entering the details we have stated above:
```bash
Enter your Name:
David
Enter your Age:
30
NAME: David
AGE:30
```

### Objects as function arguments
It can be done in two ways:
1. Pass by value.
2. Pass by reference.

In pass by value, a copy of the object is passed to the function, and the object used to call the function will not be affected by any changes made to the function. In pass by reference, only the object's address is passed, and changes made to the object that is inside the function will reflect in the actual object.

This is useful since we can transfer objects and allocate the supplied object's values to the current object when we want to initialize all the data members of an object with another object. We need to use objects for complex or large projects as an argument or parameter.

We write the object's name as the argument for passing an object as an argument, and call the function for other variables with the same process.

Syntax:  

`function_name(object_name);`

Consider the program below:

```c++
#include <iostream>
// Program to demonstrate
// objects as arguments
using namespace std;

class sample
{
		int c;

	public:
		void set(int x)
		{
			c = x;
		}

		void sum(sample ob1, sample ob2) //objects passed as arguments
		{
			c  = ob1.c + ob2.c;
		}

		void display_value()
		{
			cout<<"C value :  "<<c<<endl;
		}
};

int main()
{
	sample a1;
	a1.set(5);            //assigning values to the object
	sample a2;
	a2.set(15);
	sample a3;
	a3.sum(a1,a2);       //passing object d1 and d2
	a1.display_value();            //printing the values
	a2.display_value();
	a3.display_value();

	return 0;
}
```

Go ahead and run the program [here](https://repl.it/@Dawe7/Objects-as-function-arguements-1#main.cpp).
output:

```bash
C value:5
C value:15
C value:20
```

We are passing objects `a1` and `a2` as arguments to the member function `sum` and adding the value of `c` data members of both objects and allocating to the current objects (that will call the function, that is `a3`) data member `c`.

#### Conclusion
By creating a class, we can have more secure programs due to the emphasis on data. The class uses permission labels that control data access. We can declare many different objects to store data and functions that operate on the same data. They also contribute to the concept of inheritance, providing reusability, making it easier to create and maintain an application.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

---
layout: engineering-education
status: publish
published: true
url: /collections-in-c++/
title: Getting Started With Collections in C++
description: This article introduces the reader to collections in C++, discussing them in detail and giving various examples of how data can be manipulated during runtime.
author: haron-wambua
date: 2022-03-24T00:00:00-00:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/collections-in-c++/hero.png
    alt: Collections in C++ hero image
---
In C++, the collection is widely covered where it defines the framework under which data can be stored and manipulated. They can also be called containers.
<!--more-->
This article introduces you to these containers, discussing them in detail and giving various examples of how data can be manipulated during runtime.

Moreover, the article clearly explains the collection interface hierarchy and shows you sub-interfaces (classes) in it.

Sub-interfaces like list, set, queue, etc., will be explained further and show the relationship where it appears.

Furthermore, we will see how to implement these sub-interfaces since we cannot implement collection itself.

### Prerequisites
Basic knowledge in C & C++ programming languages is required for better understanding.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Collection interface hierarchy](#collection-interface-hierarchy)
  - [1. List](#1-list)
  - [2. Queue](#2-queue)
  - [3. Dequeue](#3-dequeue)
  - [4. Set](#4-set)
- [Relation of collection sub interface](#relation-of-collection-sub-interface)
  - [1. List](#1-list-1)
  - [Why do we use list (`std::list`)](#why-do-we-use-list-stdlist)
  - [ArrayList](#arraylist)
  - [LinkedList](#linkedlist)
- [2. Queue](#2-queue-1)
  - [Priorityqueue](#priorityqueue)
  - [3. Dequeue](#3-dequeue-1)
- [4. Set](#4-set-1)
- [Implementation of interface](#implementation-of-interface)
  - [1. List](#1-list-2)
  - [2. Queue](#2-queue-2)
  - [Set](#set)
- [Conclusion](#conclusion)

### Collection interface hierarchy
In the C++ programming language collections, interfaces are the basic foundation of the collection framework.

Here we get to know what is entailed in what collection (container). Therefore, the collection interface hierarchy consists of the following:- 

#### 1. List
In the list, we have sub-classes such as:
- ArrayList.
- LinkedList.

#### 2. Queue
It consists of the following:
- LinkedList.
- priorityqueue.

#### 3. Dequeue
Comprises of:
- Arraydequeue.

#### 4. Set
- HashSet.

### Relation of collection sub interface
#### 1. List
A list is a type of container that is built-in sequentially and allows allocation.

Since the list is doubly linked (data can be accessed bi-directionally and sequentially), it makes it possible for the insertion and deletion to be done faster.

**Syntax**

Importing list header file (`template<class Type, class allocator <(X)>>class list:`)

- Where `x` can be substituted data types.

For example:

```C++
#include<algorithm>
#include<iostream>
#include<list>
int main() {
    std::list<int>//we are creating list 'my_list'having values in it
    my_list={10,33,56,3};
    for(int y:my_list)
    //we give output of what is in the list
  {
       std::cout <<y<<'\n';//we are executing  integer values in  y.
  }
}
```

**Output**

```Bash
10
33
56
3
```

#### Why do we use list (`std::list`)
The following are some of the reasons why we use `std::list`:
- List makes insertion, moving, deletion, and extracting data from any position efficient.
- Its algorithms perform operations intensively.
- It is taken as one of the best containers to use contrasted with others like vector etc.

#### ArrayList
- They are containers that store different types of data.
- Data stored in it is flexible and can be changed anytime.

Below is an example of `Arraylist` when performing insertion:

```C++
#include <iostream>
#include <list>
using namespace std;
int   main() {
// we are creating the list 'mylist' having integer values in it
list<int>mylist={ 50, 56, 57, 60, 64 };// then we are trying push the elements at the starting end and  that in last
mylist.push_back(64);
mylist.push_front(0);
// there after we are going to output elements after now pushing
list <int> :: iterator it;cout<< "After insertion the elements will be as follows : " <<endl;
for
      (it= mylist.begin();it != mylist.end();it++)
      cout<< *it  <<'\n';
      }
```

**Output**

```Bash
0
50
56
57
60
64
```

#### LinkedList
Here data is stored successively like in arrays. A linked list is a container whereby we have nodes in which data is contained in them, and the nodes also have a pointer that points to the next memory locations.

Although data is stored sequentially, the memory location does not share a border (not contiguous).

The code below shows how we can create a node (structure) in linked list:

```C++
#include <iostream>
using namespace std;
//now we want to create the node
   struct node
{
    int data;//we are using int since the data that we will put in the list will be an integer.
     node *next;};//not that,in c++ spaces can't affect the code
     int main()
     {

     {
     cout<<"this is how we create a node";
    }
   }
```

The program above has taught us how to create a node.

Next, we will see how we can create a class of our choice that will contain member data and functions required for the list.

We should also know that the first node in the list is of much importance because when we access the first node of the list, the access is to the entire list.

So in our example below, our first node is named `head` and the last node `tail`:

```C++
#include <iostream>
using namespace std;
//now we are creating the node.
 struct node
{
int data;node *next;};
//the class is now being created.
class linked_list {
private: node *head,*tail;public: linked_list()
{//below we are saying null since no data entered.
head = NULL;tail= NULL;//the list does not have any data(empty).
};
int main()
{
linked_list t;
return 0;
}
};
```

In the example above, we have seen that constructor of the linked list has made the nodes empty.

That is why both `head` and `tail` nodes are null since there is no element that was added to the list.

Next we will see how to create a function that will enable us to add elements to the node in our linked list:

```C++
#include <iostream>
using namespace std;
//now we are creating the node.
  struct node{
int data;node *next;};
//A new class is being constructed right now.
class linked_list
{
private: node *head,*tail;public: linked_list()
{
head = NULL;tail= NULL;//the list does not have any data(empty).
}
};
void add_node(int j)
    {//we create a new node,then in that new node we put element j.
        node *ptr= new node;
        ptr->data=j;ptr->next = NULL;//we are putting data j in the node.
        if(head==NULL)//for program to run we must have conditions that define progress.
        {
            head= ptr;tail= ptr;
        }
        else
        {
            tail->next = ptr;exit = exit->next;
        }
    }
};
int main()
{
    linked_list t;
    t.add_node(2);
    t.add_node(4);
    return 0;
}
}
```

### 2. Queue
This is a data structure in which the first in, first out principle is used (FIFO).

Here, data can be inserted and deleted from the queue. Therefore, the end at which the data is inserted is called **rear**, and the end to which data is deleted is called **front**.

In the queue, `LinkedList` containers can also be used to store data (information). This becomes possible since data is stored successively in a linked list.

In this way, the queue is known to interact with `LinkedList`.

The following program shows the implementation:

```C++
#include<iostream>
using namespace std;
struct node//we are creating node
{
    int number;//we are using int since the data we will put in the list will be an integer.
    node *next;
};
bool isEmpty(node *head);
char Menu();// this will display list of options.
void insertAsFirstElement(node *&head, node *&last, int number);
void insert(node *&head, node *&last, int number);
void remove(node *&head, node *&last);
void showlist(node *current);



bool isEmpty(node *head)
{
    if(head ==NULL)
        return true;
    else
    return false;
}
char Menu()// it will display options
{
char choice;
cout <<"menu\n";
cout <<"1. add an item.\n";
cout <<"2. remove an item.\n";
cout <<"3. show the list.\n";
cout <<"4. exit\n";

cin >> choice;

return choice;
}
void insertAsFirstElement(node *&head, node *&last, int number)
{
    node *temp = new node;// this is a new node
    temp->number = number;// we are entering a number(int)
    temp->next =NULL; //pointer next node
    head = temp;
    last =temp;
}
void insert(node *&head, node *&last, int number)
{
if(isEmpty(head))
    insertAsFirstElement(head, last,number);
else
{
    node *temp = new node;
    temp->number = number;
    temp->next =NULL;
    last->next = temp;
    last =temp;

}
}
void remove(node *&head, node *&last)// this is for removing/ deleting elements
{
    if(isEmpty(head))
        cout << "The  list is already empty.\n";
    else if (head == last)
    {
        delete head;
        head == NULL;
        last == NULL;
    }
    else
    {
        node *temp = head;
        head = head->next;
        delete temp;
    }
}
void showlist(node *current)// now we show what is currently in the list.
{
    if(isEmpty(current))
        cout << "the list is empty\n";
    else
    {
        cout << "The list contains:\n";
        while(current !=NULL)
        {
            cout << current->number <<endl;
            current = current->next;
        }
    }
}
int main(int argc, char** argv)
{
    node *head = NULL;
    node *last = NULL;
    char choice;
    int number;
    do{
        choice = Menu();// below we are a going to set options which will be determined by  the choice, like for example the first one will prompt user to enter a number.

        switch(choice)
        {
            case '1':    cout << "please enter a number:";
                        cin>> number;
                        insert(head, last,number);
                        break;
            case '2' :  remove(head,last);
                        break;
            case '3': showlist(head);
                          break;
            default:     cout << "system exit\n";
        }
    }while(choice != '4');

    return 0;
}
```

**Output**

The output will display a menu that will guide you on what to do:

```bash
# menu
1. add an item
2. remove an item
3. show the list
4. exit
```

#### Priorityqueue
In C++, a priority queue is a container where we prioritize elements during processing. For instance, a scenario where you find the first elements starts with the maximum to the minimum in decreasing order.

The following are methods used:
- `add(Ee)` - Specific elements are inserted in the priority queue.
- `clear()` - It removes elements from the queue.

#### 3. Dequeue
This is also a kind of data structure where deletion and insertion can be done just like in the queue.

Operations done in dequeue include:
- `insert_at_beg()` - Inserts from front end of dequeue.
- `insert_at_end()` - Inserts at rear end.
- `delete_fr_beg()` - You delete from front end.
- `insert_fr_rear()` - Remove/delete from rear end.

### 4. Set
In C++, sets are used to store and retrieve data from containers.

It contains `HashSet` classes which are unordered collections with unique elements.

### Implementation of interface
Since the interfaces are the foundation of the collection, we will see the implementation of some of the interfaces.

#### 1. List
The following are some of the functions used in the listing.
- `Back()` - Here, we return the last element in the list.
- `Push_front(t)` - A new element `t` is added at the starting point of the list.
- `Push_back(t)` - A new element `t` is added at the end of the list.
- `Pop_front()` - Removes the first element, and the list size is reduced by 1.
- `Pop_back()` - The last element of the list is removed; hence the list reduces.

#### 2. Queue
Below is an implementation queue. It shows how to display elements in a queue:

```C++
void display()
{
int n;
if (front == - 1)
{
cout<<"Queue underflow\n";
}
else
{
cout<<"The elements of the queue are:\n";
for (n = front; n <= rear; n++)
cout<<queue[n];
}
}
```

#### Set
Below is an example of the HashSet program:

```C++
#include <iostream>
#include <unordered_set>
int main()
{
std::unordered_set<int> X { 2022, 2023, 2028 };
for (auto Y: X)
std::cout << Y << '\n';
return 0;
}
```

**Output**

```Bash
2023
2028
2022
```

### Conclusion
In this article, we have learned what collections in C++ are, interfaces found in these collections, and their hierarchy (showing classes found in each interface).

Furthermore, we have seen how some sub-interfaces relate and their implementation.

Hope you found this article helpful.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)

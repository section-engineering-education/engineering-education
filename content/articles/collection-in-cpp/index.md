### Introduction
In C++, the collection is widely covered where it defines the framework under which data can be stored and manipulated. They can also be called containers.

This article introduces you to these containers discussing them in detail and giving various examples of how data can be manipulated during runtime.

Moreover, the article clearly explains the collection interface hierarchy and shows you sub-interfaces (classes) in it. 

Sub-interfaces like list, set, queue, et cetera will be explained further and establish the relationship where it appears. Furthermore, we will see how to implement these sub-interfaces since we cannot implement collection itself. 

### Prerequisites
For a better understanding, you should have a basic knowledge of C++.

### Table of contents
- [Collection interface hierarchy](#collection-interface-hierachy)
- [Relation of collection sub-interface](#relation-of-collection-sub-interface)
- [Implementation of interface](#implementation-of-interface)
- [Classes collection](#classes-collection)

### Collection interface hierarchy
In the C++ programming language collections, interfaces are the basic foundation of the collection framework. 

Here we get to know what is entailed in what collection(container). Therefore, the collection interface hierarchy consists of the following:-
#### 1.**List**
In the list, we have  sub-classes  such as
- ArrayList
- LinkedList

#### 2.**Queue**
It consists of the following;
- LinkedList
- priorityqueue
  
#### 3.**Qequeue**
Comprises of :
- Arraydequeue

#### 4. **Set**
- HashSet

### Relation of collection sub interface

#### 1. List 
A list is a type of container that is built-in sequentially and allows allocation.

Since the list is doubly linked (data can be accessed bi-directionally and sequentially), it makes it possible for the insertion and deletion to be done faster. 

**Syntax**

Importing list header file(

template<class Type, class allocator
<(X)>>class list: )
- where x can be substituted data types.

Example
```c++
 #include<algorithm>
 #include<iostream>
 #include<list>
 int main() {
     std::list<int>//we are creating list 'my_list'having values in it
     my_list={10,33,56,3};
     for(int y:my_list)
     //we give output of what is in the list
   { 
        std::cout <<y<<'\n';
   }
 }
```

#### Why do we use list(`std::list`)
The following are some of the reasons why we use `std::list`.
- List makes insertion, moving, deletion, and extracting data from any position of the list efficient.
- Its algorithms perform operations intensively.
- It is taken as one of the best containers to use contrasted with others like vector et cetera.
  
#### **ArrayList**
- They are containers that store different types of data.
- Data stored in it is flexible and can be changed anytime.

Let's look at an example of how to use ArrayList.
```c++
#include <list>
using namespace std;
int   main() {
// we are creating the list 'ylist' having integer values in it
list<int>ylist={ 50, 56, 57, 60, 64 };
// then we are trying push the elements at the starting end and  that in last
ylist.push_back(64);
ylist.push_front(0);
// there after we are going to output elements after now pushing
list <int> :: iterator it;cout<< "After insertion the elements will be as follows : " <<endl;
for
      (it= ylist.begin();it != ylist.end();it++)cout<< *it  <<'\n';
}
```

In the above example, we create the list 'ylist' with integer values.

Then we are trying to push the elements at the starting end, and that in last.

#### LinkedList
Here data is stored successively like in arrays.

A linked list is a container whereby we have nodes in which data is contained in them, and the nodes also have a pointer that points to the next memory locations.

Although data is stored sequentially, the memory location does not share a border(not contiguous).

Let's look at an example of how to use LinkedList.
```c++
#include <iostream> using namespace std;
//now we want to create the node
   my node
{
    int data;//we are using int since the data that we will put in the list will be an integer.
     node *next;};//not that,in c++ spaces can't affect the code .
```

The above program has taught us how to create a node. Next, we will see how we can create a class of our choice that will contain member data and functions required for the list. 

We should also know that the first node in the list is of much importance because when we access the first node of the list, the access is to the entire list.

So, in our example below,let our first node be 'entry ' and the last node 'exit'.
```c++
#include <iostream> using namespace std;
//now we are creating the node.
 my node
{
int data;node *next;};
//the class is now being created.
class linked_list {
private: node *entry,*exit;

public: linked_list()
{//below we are saying null since no data entered.
entry = NULL;exit= NULL;//the list does not have any data(empty).
};
int main()
{
linked_list t;
return 0;
}
};
```

In the above example, we have seen that constructor of the linked list has made the nodes to be empty. 

That is why both entry and exit nodes are null since no element was added to the list. 

Therefore, below we will see how to create a function that will enable us to add elements to the node in our linked list.
```c++
#include <iostream> using namespace std;
//now we are creating the node.
  struct node{
int data;node *next;};
//the class is now being created.
class linked_list
{
private: node *entry,*exit;public: linked_list()
{
entry = NULL;exit= NULL;//the list does not have any data(empty).
}
};
void add_node(int j)
    {//we create a new node,then in that new node we put element j.
        node *ptr= new node;
        ptr->data=j;ptr->next = NULL;//we are putting data j in the node.
        if(entry==NULL)//for program to run we must have conditions that define progress.
        {
            entry= ptr;exit= ptr;
        }
        else
        {
            exit->next = ptr;exit = exit->next;
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

Node `tmp=new node`, here we allocate a space required for the node by the `new` operator so, (tmp) is used as a pointer that points to a node. 

`tmp->data=j` - Here we are adding a value "data" to the node.

### 2. Queue
This is a kind of data structure where we use First in First Out(FIFO).
Here data can be inserted and deleted from the queue. 

Therefore, the end at which the data is inserted is called `rear`, and the end to which data is deleted is called the `front` end.

In the queue, LinkedList containers can also be used to store data(information). This becomes possible since data is stored successively in a linked list. 

In this way, the queue is known to interact with LinkedList.

The following program shows the implementation.
```c++
#include <iostream> using namespace std;
//now we are creating the node
 my node
{//we  using int since the data that we will put in the list will be integer.
int data;node *next;};
my node* front = NULL; my node* rear = NULL;
my node* temp;
void Insert() {int var;
   //we are inserting elements in the queue.
   cout<<"Enter element of your choice in the queue: "<<\n;
   cin>>var;
 //condition
   if 
        (rear == NULL) {rear=(my node *)malloc(sizeof(my node));
      rear->next = NULL;rear->data = var;
      front = rear;
   } 
   else 
   {
      temp=(my node *)malloc(sizeof(my node));
      rear->next = temp;temp->data = var;
      temp->next = NULL;
      rear = temp;
   }
} 
void Delete() { temp = front;//we are trying to delete  the element entered above.
if (front == NULL) 
   { cout<<"Too small"<<endl;
      return 0;
   }
   else if   (temp->next != NULL) {temp = temp->next;
      cout<<"Elements you have removed from the queue are: "<<front->data<<endl;//here shows/outputs what has been deleted.
      free(front);front = temp;
   }
   
    else
   
     {
         cout<<" here is element  you removed from the queue: "<<front->data<<endl;
      free(front);front = NULL;
      rear = NULL;
   }
}
void Display() {
   temp = front;
   if ((front == NULL) && (rear == NULL)) {
      cout<<"my queue has nothing"<<endl;// this statement outputs nothing since as per the condition the ends are null.
      return;
   }
       cout<<"Queue elements are: ";
   while 
   (temp != NULL) {
      cout<<temp->data<<" ";temp = temp->next;
   }
   cout<<endl;
}
int main() {
   int char;
   cout<<"a) key in element to queue"<<endl;
   cout<<"b) Delete element from queue"<<endl;
   cout<<"c) Display all the elements of queue"<<endl;
   cout<<"d) Exit"<<endl;
   do {
      cout<<"Enter element of your choice : "<<endl;//here you will be able to know  elements in the queue,elements removed and also the valid option for the progress of the program.
      cin>>char;
      switch (char) {
         case a: Insert();
         break;
         case b: Delete();
         break;
         case c: Display();
         break;
         case d: cout<<"Escape"<<endl;//once you enter d you exit.
         default: cout<<"Try another choice"<<endl;
      }
   } while(char!=d);
   return 0;
}
```

#### **Priorityqueue**
In C++, a priority queue is a container that prioritizes elements during processing. 

For instance, a scenario where you find the first elements starts with the maximum to the minimum in decreasing order.

The following are methods used:
- `add(Ee)` - specific elements are inserted  in the priority queue.
- `clear()` - it removes elements from the queue.

####  **3.Dequeue**
This is also a kind of data structure where deletion and insertion can be done just like in the queue.

Operations done in dequeue includes:
 - `insert_at_beg()`-inserts from front  end of dequeue.
 - `insert_at_end()`-inserts at rear end.
 - `delete_fr_beg()`-you delete from front end.
 - `insert_fr_rear()`- romove/delete from rear end.


### **4. set**
In c++, sets are used to store and retrieve data from containers.
It contains HashSet classes which are unordered collections with unique elements.

### Implementation of interface
Since the interfaces are the foundation of the collection, we will see the implementation of some of the interfaces.

#### **1.List**
The following are some of the functions used in the listing.
- **Back()** - Here, we return the last element in the list.
- **Push front(t)** -A new element `t` is added at starting point of the list.
- **Push_back(t)** - A new element `t`  is added at the end of the list.
- **Pop_front()** - It removes the first element ant the list size by 1.
- **Pop_back()** - The last element of the list is removed; hence the list reduce.
  
#### **2.Queue**
Below is an implementation queue. It shows how to display elements in a queue. 
```c++
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

#### **Set**
Below shows an example of the HashSet program.
```c++
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
```bash
2028
2023
2022
```
**Conclusion**
This article has learned collections in c++, interfaces found in these collections, and their hierarchy(showing classes found in each interface).

Furthermore, we have seen how some sub-interfaces relate and their implementation.

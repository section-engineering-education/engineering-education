### Introduction
In c++, the collection is widely covered where it defines the framework under which data can be stored and manipulated. They can also be called containers.
This article introduces you to these containers discussing them in detail and giving various examples of how data can be manipulated during runtime.

Moreover, the article gives a clear explanation of the collection interface hierarchy as well as shows you sub-interfaces (classes) in it. Sub-interfaces like list, set, queue, etc will be explained further and show the relationship where it appears. Furthermore, we will see how to implement these sub-interfaces since w cannot implement collection itself. 

### Prerequisites
For better understanding ,
- A have basics of  c & c++ programming

### Table of content
- [collection interface hierarchy](#collection-interface-hierarchy)
- [relation of collection sub-interface](#relation-of-collection-sub-interface)
- [implementation of interface](#implementation-of-interface)
- [classes collection](#classes-collection)

### Collection interface hierarchy
In the c++ programming language collections, interfaces are the basic foundation of the collection framework. Here we get to know what is entailed in what collection(container). Therefore, the collection interface hierarchy consists of the following:-
1. #### **List**

In the list, we have  sub-classes  such as
- ArrayList
- LinkedList

#### 2.**Queue**
It consists of the following;
- LinkedList
- priorityque
#### 3.Qequeue
Comprises of :
- Arraydequeue


#### 4. **Set**
- HashSet

### Relation of collection sub interface

#### 1. List 
A list is a type of container which is built-in sequentially and allows allocation in it.
Since the list is doubly linked (data can be accessed bi-directionally and sequentially), it makes it possible for the insertion and deletion to be done faster. 

**Syntax**

 Importing list header file(

 template<class Type, class allocator
 <(X)>>class list: )
 - where x can be substituted data types

 example
 ```c++
 #include<algorithm>
 #include<iostream>
 #include<list>
 int main() {

     std::list<int>
     my_list={10,33,56,3};
     for(int y:my_list)
   { 
        std::cout <<y<<'\n';
   }
 }
 ```

#### Why do we use list(std::list)
The following are some of the reasons why we use std::list
- It provides better performance when doing things like inserting, moving, and extracting data from any position.
- Its algorithms perform operations intensively.
- When compared to other sequence containers like as array and vector, it performs significantly better.

#### **ArrayList**
- They are containers that store different types of data.
- Data stored in it is flexible and can be changed anytime.

**Below is an example of  arraylist for insertion**
```c++
#include <list>
using namespace std;
int main() {
// we are creating the list 'nlist' having integer values in it
list<int>nlist = { 50, 56, 57, 60, 64 };
// then we pushing the elements at the starting and  that in last
nlist.push_back(60);
nlist.push_front(0);
// there after we printing of the list elements after pushing
list <int> :: iterator it;
cout<< "After insertion the elements will b as follows : " <<endl;
for(it = nlist.begin(); it != nlist.end(); it++)cout<< *it <<'\n';

```
#### LinkedList
Here data is stored successively like in arrays.
 A linked list is a collection that has nodes that contain data parts and a pointer that contains a memory location of the next element in the list.
Although data is stored sequentially the memory location does not share a border(not contiguous).

**Below code shows how  we can create a node(structure) in linked list**
```c++
#include <iostream>
using namespace std;
//now we are creating the node
struct node
{
    int data;node *next;};
```

After now creating a node, we will create a class called "linked_list" which will now contain functions and member data required for the linked list. Therefore, we have to know that the begining node means a lot in list since access to it, means access to the entire list. So, in our example, let us call it 'head' and the last node 'tail'.
```c++
#include <iostream>
using namespace std;
//now we are creating the node
struct node
{
    int data;node *next;};
class linked_list
{
private: node *Head,*Tail;
public: linked_list()
    {
        Head = NULL;Tail = NULL;
    }
};

int main()

{
linked_list a;
    return 0;
}
``` 
The above example constructor of the linked list has made both head and tail null since no element was added to the list.As a result, we'll write a function to add a node to our linked list below.
```C++

#include <iostream>
using namespace std;
//now we are creating the node
struct node
{
    int data;node *next;};

class linked_list
{
private: node *Head,*Tail;
public: linked_list()
    {
        Head = NULL;Tail = NULL;
    }
}

   void add node(int x) (int x)
{\s node *
tmp = new node;\s tmp->data = x;\s tmp->next = NULL;

if(head == NULL)\s {\s head = tmp;\s tail = tmp;\s }\s else\s {\s tail->next = tmp;\s tail = tail->next;\s }\s }\s};

int main()\s{\s linked list a;\s a.add node(1);\s a.add node(2);\s return 0;\s}
```
Node 'tmp=new node' here we are allocating a space required for the node by the 'new' operator so,'tmp' points to a node. 
tmp->data=x -we are giving the value 'data' of tmp as passed to function.
### 2. Queue
The queue is a kind of data structure where it uses First in First Out(FIFO).
Here data can be inserted and deleted from the queue. Therefore the end at which the data is inserted is called **rear** and the end to which data is deleted is called **front** end.
In the queue, LinkedList can be used to store data. This becomes possible since in linked list data is stored successively. Therefore, this is where the queue and LinkedList come to interact.

The following program shows how queue can be implemented in linked list.
```C++
#include <iostream>
using namespace std;
//now we are creating the node
struct node
{
    int data;node *next;};
    //The list is null since no data that has been entered in the list.
struct node* front = NULL;
struct node* rear = NULL;
struct node* temp;
void Insert() {\s int val;\s cout<<"Insert the element in queue : "<<endl;\s cin>> val;\s
//Giving conditions
if (rear == NULL) {\s rear = (struct node *)malloc(sizeof(struct node));\s rear->next = NULL;\s rear->data = val;\s front = rear;\s } else {\s temp=(struct node *)malloc(sizeof(struct node));\s rear->next = temp;\s temp->data = val;\s temp->next = NULL;\s rear = temp;\s }\s}
void Delete() {
   temp = front;
   if (front == NULL) {
      cout<<"Underflow"<<endl;
      return;
   }
   else
   if (temp->next != NULL) {
      temp = temp->next;
      cout<<"deleted Element from queue is : "<<front->data<<endl;
      free(front);
      front = temp;
   } else {
      cout<<"Element deleted from queue is : "<<front->data<<endl;
      free(front);
      front = NULL;rear = NULL;
   }
}
void Display() {
   temp = front;
   if ((front == NULL) && (rear == NULL)) {
      cout<<"Queue is empty"<<endl;
      return;
   }
   cout<<"Queue elements are: ";
   while (temp != NULL) {
      cout<<temp->data<<" ";
      temp = temp->next;
   }
   cout<<endl;
}
int main() {
   int ch;
   cout<<"1) Insert element to queue"<<endl;
   cout<<"2) Delete element from queue"<<endl;
   cout<<"3) Display all the elements of queue"<<endl;
   cout<<"4) Exit"<<endl;
   do {
      cout<<"Enter your choice : "<<endl;
      cin>>ch;
      switch (ch) {
         case 1: Insert();
         break;
         case 2: Delete();
         break;
         case 3: Display();
         break;
         case 4: cout<<"Exit"<<endl;
         break;
         default: cout<<"Invalid choice"<<endl;
      }
   } while(ch!=4);
   return 0;
}
``` 
**Output**

```bash
1.Insert element to the queue
2. Delete an element from the queue
3. Output all the elements of the queue
4. Exit
Enter your choice: 1\sInsert the element in queue: 4
Enter your choice: 1\sInsert the element in queue : 3
Enter your choice: 1\sInsert the element in queue: 5\sEnter your choice: 2
Element deleted from the queue is: 4
Enter your choice : 3
Queue elements are : 3 5\sEnter your choice: 7
Invalid choice
Enter your choice
Exit
```
#### **Priorityqueue**

In c++, a priority queue is a type of container where we give priority to elements during processing. like for instance, a scenario where you find the first elements are starting with the maximum to the minimum in decreasing order.
The following are methods used:
- add(Ee) =   specific elements are inserted  in the priority queue.
- clear()= it removes elements from the queue.

**3. Dequeue**

This is also a kind of datastructure where  deletion and insertion can be done just like  in the queue.
 operations done in dequeue
 - insert_at_beg():inserts from front  end of dequeue
 - insert_at_end():inserts at rear end
 - delete_fr_beg():you delete from front end
 - nsert_fr_rear()romove/delete from rear end

### **4. set**
 
 In c++, sets are used to store and retrieve data from containers.
 It contains HashSet classes which are unordered collections with unique elements.

 ### Implementation of interface

Since the interfaces are the foundation of the collection, here we are going to see the implementation of some of the interfaces.

#### **1.List**

The following are some of the functions used in the listing.
- **Back()**-the value which is in the last element of the list is returned.

- **Push front(t)**-A new element "t" is added at starting point of the list.
- **Push_back(t)**- A new element ‘t’  is added at the end of the list.
- **Pop_front()** – It removes the first element ant the list size is reduced by 1.
- **Pop_back()** – The last element of the list is removed hence the list reduce.

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

In this article, we have learned what are collections in c++, interfaces found in these collections, and their hierarchy(showing classes found in each interface). Furthermore, we have seen how some of the sub-interface relate, and their implementation.

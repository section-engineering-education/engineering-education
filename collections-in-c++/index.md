# collections in c++
## introduction


In c++, the collection is widely covered where it defines the framework under which data can be stored and manipulated. They can also be called containers.
This article introduces you to these containers discussing them in detail and giving various examples of how data can be manipulated during runtime.

Moreover, the article gives a clear explanation of the collection interface hierarchy as well as showing you sub-interfaces (classes) in it. Sub-interfaces like list, set, queue, etc will be explained further and show the relationship where it appears. Furthermore, we will see how to implement these sub-interfaces since w cannot implement collection itself. 

### prerequisites
For better undrstanding ,
- A have basics of  c & c++ programming
### Table of content
- [collection interface hierarchy](#collection-interface-hierachy)
- [relation of collection sub-interface](#relation-of-collection-sub-interface)
- [implementation of interface](#implementation-of-interface)
- [classes collection](#classes-collection)

### collection interface hierarchy
In the c++ programming language collections, interfaces are the basic foundation of the collection framework. Here we get to know what is entailed in what collection(container). Therefore, the collection interface hierarchy consists of the following:-
1. **list**

In the list, we have  sub-classes  such as
- ArrayList
- LinkedList

2. **queue**

It consists of the following;
- LinkedList
- priorityque
 3. **dequeue**
  comprises of :
- arraydequeue

4. **set**
- HashSet

 
### relation of collection sub interface

### 1. list 
A list is a type of container which is built-in sequentially and allows allocation in it.
Since the list is doubly-linked, it makes it possible for the insertion and deletion to be done faster. 
 ### syntax
 Importing list headerfile(

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
**ArrayList**
- They are containers that store different types of data.
- Data stored in it is flexible and can be changed anytime.

**below is an example of  arraylist for insertion**
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
for(it = nlist.begin(); it != nlist.end(); it++)
cout<< *it  <<'\n';


```
### linkedlist
Here data is stored in a sequential manner like in arrays.
Although data is stored sequentially the memory location does not share a border(not contiguous).

### 2. queue
The queue is a kind of data structure where it uses First in First Out(FIFO).
Here data can be inserted and deleted from the queue. Therefore the end at which the data is inserted is called **rear** and the end to which data is deleted is called **front** end.
In the queue, LinkedList can be used to store data. This becomes possible since in linked list data is stored in a sequential manner. Therefore, this is where the queue and LinkedList come to interact.

**priorityqueue**

In c++, priorityqueue is a type of container where we give priority to elements during processing. like for instance, a scenario where you find the first elements are starting with the maximum to the minimum in decreasing order.
The following are methods used:
- add(Ee) =   specific elements are inserted  in the priorityqueue.
- clear()= it removes elements from the queue.

**3. dequeue**

This is also a kind of datastructure where  deletion and insertion can be done just like  in the queue.
 operations done in dequeue
 - insert_at_beg():inserts from front  end of dequeue
 - insert_at_end():inserts at rear end
 - delete_fr_beg():you delete from front end
 - nsert_fr_rear()romove/delete from rear end

 **4. set**
 
 In c++, sets are used to store and retrieve data from containers.
 It contains HashSet classes which are unordered collections with unique elements.

 ### implementation of interface

Since the interfaces are the foundation of the collection, here we are going to see the implementation of some of the interfaces.

**1.list**

The following are some of the functions used in the listing.
- **back()**

the value which is in the last element of the list is returned.

- **push front(t)**
A new elemnt "t" is added at starting point of the list.
- **push_back(t)**
 - A new element ‘t’  is added at the end of the list.
- **pop_front()** – 
 It removes the first element ant the list size is reduced by 1.
- **pop_back()** – 
The last element of the list is removed hence the list reduce.

**2.queue**

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

**set**

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

**conclusion**

In this article, we have learned what are collections in c++, interfaces found in these collections, and their hierarchy(showing classes found in each interface). Furthermore, we have seen how some of the sub-interface relate, and their implementation.
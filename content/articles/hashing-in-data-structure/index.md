---
layout: engineering-education
status: publish
published: true
url: /hashing-in-data-structure/
title: Hashing in data structure
description: In this article, we will explore how the hash function converts a given key to a smaller number and uses the small number as an index in a table called a hash table.
author: anubhav-bansal
date: 2021-06-04T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /hashing-in-data-structure/hero.jpg 
    alt: hero image example image
---
### Hashing in Data Structure

In hashing the idea is to use a hash function that converts a given key to a smaller number and uses the small number as an index in a table called a hash table.

We generate a hash for the input using the hash function and then store the element using the generated hash as the key in the hash table.

![HashTable](./HashIntro.PNG)

**Hash Table**: Hash table is a collection of Key-Value pairs. It used when the searching, insertion of an element is required to be fast.

Operation in hash function:

- **Insert** - T[ h(key) ] = value;
  - Calculate the hash, use it as the key and store the value in hash table.
- **Delete** - T[ h(key) ] = NULL;
  - Calculate the hash, reset the value stored in the hash table for that key.
- **Search** - return T[ h(key) ];
  - Calculate the hash, find and return the value stored in the hash table for that key.

**Hash Collision**: When two or more inputs are mapped to the same keys as used in the hash table.
Example: h("John") == h( "joe")

A collision can not be completely avoided but can be minimized using a 'good' hash function and a bigger table size.<br/>

The chances of hash collision are less if the table size is a prime number.

#### How to choose Hash Function:

- An efficient hash function should be built such that the index value of the added item is distributed equally across the table.
- An effective collision resolution technique should be created to generate an alternate index for a key whose hash index corresponds to a previously inserted position in a hash table.
- We must select a hash algorithm that is fast to calculate.

#### Characteristics of a Good Hash Function :

- **Uniform Distribution**: For distribution throughout the constructed table.
- **Fast**: The generation of hash should be very fast, and should not produce any considerable overhead.

#### Collision Hashing Techniques:

1. **Open Hashing (Separate Chaining)**: In this using Linked List, new nodes are added to the list, the key act as the head pointer, pointing to a number of nodes having different values.If there is any collision two elements having same hash value we store both of them in a same linked list.

   Lets cosnidser a example of a simple hash function<br/>
   `h(key) = key%table size`

   In a hash table with the size 7<br/>
   h(27) = 27%7 = 6<br/>
   h(130) = 130%7 = 4<br/>

   ![Example](./hashMap_1.PNG)

   If we insert a new element (18, "Saleema" ), that would also go to the 4th index.<br/>
   h(18) = 18%7 = 4<br/>

   ![Example](./hashMap_2.PNG);

   For separate chaining, the worst case scenario is when all of the key will get the same hash value and will be inserted in the same linked list.We can avoid that by using a good hash function.

2. **Closed Hashing (Open Addressing)**: In this, we find the "next" vacant bucket in Hash Table and store the value in that bucket.

   1. **Linear Probing**: We linearly go to every next bucket and see if it is vacant or not.<br/>
      `rehash(key) = (n+1)%tablesize`

   2. **Quadratic Probing**: We go to the 1st, 4th, 9th ... bucket and check if they are vacant or not.<br/>
      `rehash(key) = (n+ k<sup>2</sup> ) % tablesize

3. **Double Hashing**: Here we subject the generated key from the hash function to a second hash function.<br/>
   ` h2(key) != 0 and h2 != h1`

**Load Factor**: This is a measurement of how full a hash table may become before its capacity is increased. <br/>
A hash table's load factor T is defined as:

- N = number of elements in T - Current Size
- M = size of T - Table Size
- e = N/M - Load factor

Generally, if the load factor is greater than 0.5, we increase the size of the bucket array and rehash all the key-value pairs again.

#### How Hashing Gets O(1) Complexity?

Given the above examples, one would wonder how hashing may be O(1) if several items map to the same place...  </br> 
The solution to this problem is straightforward. We use the load factor to ensure that each block, (for example linked list in a separate chaining strategy), stores the maximum amount of elements fewer than the load factor on average. Also, in practice this load factor is constant ( generally 10 or 20 ). As a result, searching in 20 or 10 elements become constant.<br/>

If the average number of items in a block exceeds the load factor, the elements are rehash with a larger hash table size.

**Rehashing**: <br/>
When the load factor gets "too high" (specified by the threshold value), the process of raising the size of the hash table begins, expecting that collisions would become more common.

- Typically, double the size of the table (but still prime).
- All existing items must be reinserted into the hash table.

Now let's deep dive into the code I will implement everything in code that we have learned till now.

```C++
#include<iostream>
using namespace std;

class node{
    public:
    string name;
    int value;
    node* next;
    node(string key,int data){
        name=key;
        value=data;
        next=NULL;
    }
};

class hashmap{
    node** arr;
    int ts;
    int cs;

    int hashfn(string key){
        int ans=0;
        int mul=1;
        for(int i=0; key[i]!='\0';i++){
            ans =  (ans + ((key[i]/ts)*(mul%ts))%ts);
            mul *= 37;
            mul %=ts;
        }
        ans = ans %ts;
        return ans;
    }

    void reHash(){
        node** oldarr=arr;
        int oldts=ts;
        arr= new node*[2*ts];
        ts *= 2;
        cs=0;

        for(int i=0;i<ts;i++){
            arr[i]=NULL;
        }

        //insert in new table
        for(int i=0;i<oldts;i++){
            node* head = oldarr[i];
            while(head){
                insert(head->name,head->value);
                head=head->next;
            }
        }
        delete []oldarr;


    }

    public:
    hashmap(int s=7){
        arr = new node*[s];
        ts=s;
        cs=0;
        for(int i=0;i<s;i++){
            arr[i]=NULL;
        }

    }

    void insert(string key, int data){
        int i=hashfn(key);
        node* n=new node(key,data);
        n->next=arr[i];
        arr[i]=n;
        cs++;

        if(cs/(1.0*ts)  > 0.6){
            reHash();
        }

    }

    node* search(string key){
        int i=hashfn(key);
        node*head= arr[i];
        while(head){
            if(head->name==key){
               return head;
                break;
            }
            head=head->next;
        }
        if(head==NULL){
            cout<<"not exist";
        }
        return NULL;
    }

    void print(){
        for(int i=0;i<ts;i++){
            node* head= arr[i];
            while(head){
                cout<<head->name<<"-->"<<head->value;
                head=head->next;
                 cout<<endl;
            }

        }
    }

    int& operator[](string key){
        node* ans=search(key);
        if(ans){
            return ans->value;
        }
        else{
            int agrbagevalue;
            insert(key,agrbagevalue);
            ans= search(key);
            return ans->value;
        }

    }

    void Delete(string key){
        int i=hashfn(key);
        node* head= arr[i];
        node* trail=NULL;

            while(head){

                    //first
                    if(head->name==key && trail==NULL){
                        arr[i]=NULL;
                        delete head;
                    }
                    //in end
                    if(head->name==key && trail!=NULL && head->next==NULL){
                        trail->next=NULL;
                        delete head;
                    }
                    //mid
                    if(head->name==key && head->next!=NULL){
                        node*ptr =head;
                        head=head->next;
                        delete ptr;
                        arr[i]=head;

                    }
                    trail =head;
                    head=head->next;
            }
        return;
    }

};

int main(){
    hashmap h;
    h.insert("Alphonso_Mango",100);
    h.insert("Kiwi",150);
    h.insert("Banana",200);
    h.insert("WaterMelon",180);
    h.print();

    node* x=  h.search("Kiwi");
    cout<<"SEARCH RESULT"<<endl;
    cout<<x->name<<" "<<x->value;

}

```

#### Output

![output](./Capture.PNG)

<<<<<<< HEAD
The execution of the above code can be found here:-
[code implementation](https://replit.com/@Anubhavb11/HashMap#main.cpp)
=======
---
Peer Review Contributions by: [Willies Ogola](https://www.section.io/engineering-education/authors/willies-ogola/)
>>>>>>> d20e6e087a3810b7ceecfa7b1174e5e2d6fda8a4

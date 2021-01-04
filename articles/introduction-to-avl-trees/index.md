---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-avl-trees/
title: Introduction to AVL trees
description: This article will serve as an introduction to AVL trees or self-balancing trees which are an efficient data structures. They have efficient time and space complexities.
author: prashanth-saravanan
date: 2020-12-02T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-avl-trees/hero.jpg
    alt: AVL tree example image
---
Binary search trees (BSTs) are one of the most efficient data structures with their O(n) time complexity while performing operations. But in the realm of computers and processing, constant optimization has brought about the concept of AVL trees.
<!--more-->
The [AVL tree](https://en.wikipedia.org/wiki/AVL_tree), named after its two inventors, G.M. Abelson-Velvety and E.M. Landis, who published it in their 1962 paper "An Algorithm for the Organization of Information" has anchored its position as a need-to-understand data structure due to its performance increase from a regular BST.

### Prerequisites
To follow along with this tutorial, the reader is expected to have understood the workings of a [binary tree](/engineering-education/binary-tree-data-structure-python/) and [binary search trees](https://www.geeksforgeeks.org/binary-search-tree-data-structure/). A quick run-through the above mentioned topics would help with the understanding of the inner mechanics of AVL trees.

### Table of contents
1. [Introduction](#introduction)
2. [Reason for AVL Trees](#reason-for-avl-trees)
3. [Tri-Node Restructuring](#tri-node-restructuring)
4. [Insertion in AVL Trees in C++](#insertion-in-avl-trees-in-c)
5. [Deletion from AVL Trees in C++](#deletion-from-avl-trees-in-c)
6. [Conclusion](#conclusion)
7. [Further Reading](#further-reading)

### Introduction
AVL trees are nothing but height-balanced binary search trees. Height balancing is a condition where the difference of heights between the left and right nodes of a parent cannot be more than mod(1).

![AVL trees vs BST](/engineering-education/introduction-to-avl-trees/avlTree.jpg)

One can observe that in figure (a), the difference between the heights of all the left and right sub-trees is less than or equal to 1.
As an example, let us consider nodes (3) and (6) of the tree in figure(a).

Height of left sub-tree of node(3) = 1
Height of right sub-tree of node(3)= 0
Therefore, difference in heights = 1-0 = 1

Similarly,

Height of left sub-tree of node(6) = 1
Height of right sub-tree of node(6) = 1
Difference in heights = 1-1 = 0

This makes the data structure represented in figure (a) an AVL tree.

However, in the tree in figure (b),

Height of left sub-tree of node(4) = 2
Height of right sub-tree of node(4) = 0
Difference in heights of left and right sub-trees = 2-0 = 2, which is greater than 1.
This makes the tree in figure (b) an ordinary BST and not an AVL tree.

### Reason for AVL trees
Operations on BSTs like search, insertion, and deletion take O(h) time, where 'h' represents the height of the tree. In case of a skewed BST (as shown in the figure below), performing these operations take O(n) time, where 'n' denotes the number of nodes in the tree.

To tackle this inefficiency in the process, the tree can be reconstructed after every operation in such a way that it always maintains logarithmic height, thereby reducing the time complexity for all operations to O(log n).

![AVL trees vs BST](/engineering-education/introduction-to-avl-trees/skewedTree.jpg)

This means that the height of the tree must be maintained after every insertion and deletion such that the time complexity for every operation performed thereafter remains O(h).

How does one maintain the height of the tree after every such modification?

### Tri-Node restructuring          
When a node is either inserted or deleted in an AVL tree, it might create an imbalance in the tree which would increase the time complexity. But, if the tree is restructured every time there is a modification to the structure, it would ensure that the time complexity remains O(h).

Let's see how performing an operation on a tree would affect its structure.

Take the example of the following AVL Tree.

![Example AVL Tree](/engineering-education/introduction-to-avl-trees/avl_insertion_before.jpg)

On inserting nodes (1) and (2) in the tree, the structure would change to:

![AVL Tree After Insertion](/engineering-education/introduction-to-avl-trees/avl_after_insertion.jpg)

In tri-node restructuring, the three roots which are involved in the imbalanced structure are chosen and are rearranged such that the order is restored.

In this case, the roots of node (1), node (2), and node(3) are taken into account because the imbalance occurs at node (3). If the height at node (3) is balanced, the overall height of the tree would be in the order of log(n). For example, node (3) could be restructured similar to the figure below.

![AVL Tree After Tri Node Restructuring](/engineering-education/introduction-to-avl-trees/avl_after_structuring.jpg)

This ensures that the height of all the nodes is balanced and therefore is an AVL Tree.

#### Procedure for Tri-Node restructuring
The procedure for tri-node restructuring for an insertion/deletion operation is as follows:

1. Perform regular BST insertion/deletion.
2. Let the node being inserted/deleted be known as 'a'. Let 'd' be the first node going up from 'a' towards root that is unbalanced. Let 'c' be a child of 'd' that lies on the path between 'a' and 'd'. Let 'b' be a child of 'c' that is on the same path.
3. This would result in four possible cases:
    - **Left-left rotation**: Where 'c' is the left child of 'd' and 'b' is the left child of 'c'
    - **Right-right rotation**: Where 'c' is the right child of 'd' and 'b' is the right child of 'c'
    - **Left-right rotation**: Where 'c' is the left child of 'd' and 'b' is the right child of 'c'
    - **Right-left rotation**: Where 'c' is the right child of 'd' and 'b' is the left child of 'c'
4. After the appropriate rotations are performed, the node is successfully inserted/deleted and the tree is balanced.

**Left-left Rotation**

![Left-Left Rotation](/engineering-education/introduction-to-avl-trees/leftleft_rotation.jpg)

**Left-right Rotation**

![Left-Right Rotation](/engineering-education/introduction-to-avl-trees/leftright_rotation.jpg)

**Right-right Rotation**

![Right-Right Rotation](/engineering-education/introduction-to-avl-trees/rightright_rotation.jpg)

**Right-left Rotation**

![Right-Left Rotation](/engineering-education/introduction-to-avl-trees/rightleft_rotation.jpg)

### Insertion in AVL trees in C++
The algorithm for inserting a new node in an AVL tree is as follows:

1. Perform regular BST insertion.
2. Get the balance factor of the current node
   - Balance Factor = Height of left subtree - Height of right subtree
3. If the balance factor is greater than 1, it could be either left-left or left-right rotation. If the balance of the left tree is greater than 0, it's a left-left rotation, otherwise a left-right rotation.
4. If the balance factor is less than -1, it could be either right-right or right-left rotation. If the balance of the left tree is less than 0, it's a right-right rotation, otherwise a right-left rotation.

```cpp
#include<bits/stdc++.h>
using namespace std;

// New class called Node
class Node {
    public:
    int value;
    Node* leftChild;
    Node* rightChild;
};

// Creating a new node when the user enters a value.
Node* newNode(int value)
{
    Node* node = new Node();
    node->value = value;
    node->leftChild = NULL;
    node->rightChild = NULL;
    return(node);
}

// Finding the height of the tree recursively
int height (Node* node)
{
    int h=0;
    if (node!=NULL)
    {
        int l_height = height(node->leftChild);
        int r_height = height(node->rightChild);
        int max_height = max(l_height,r_height);
        h = max_height;
    }
    return h;
}

// Balance is the difference between the heights of the two children of an AVL tree.
int getBalance (Node* node)
{
    if(node==NULL)
        return 0;
    return(height(node->leftChild)- height(node->rightChild));
}

// Function performs left-left rotation
Node* ll_rotate (Node* node)
{
    Node* temp = new Node();
    temp = node->leftChild;
    //Performing rotation
    node->leftChild = temp->rightChild;
    temp->rightChild = node;
    return temp;
}

// Function performs right-right rotation
Node* rr_rotate (Node* node)
{
    Node* temp = new Node();
    temp = node->rightChild;
    // Performing rotation
    node->rightChild = temp->leftChild;
    temp->leftChild = node;
    return temp;
}

// Function performs left-right rotation
// Left-right rotation is nothing but left-left rotation performed before right-right rotation
Node* lr_rotate (Node* node)
{
    node= ll_rotate(node);
    return(rr_rotate(node));
}

// Function performs Right-Left rotation
// Similar to left-right rotation, right-left rotation is nothing but right-right rotation performed before left-left rotation
Node* rl_rotate (Node* node)
{
    node= rr_rotate(node);
    return(ll_rotate(node));
}

Node* balance(Node* node)
{
    int bal_factor = getBalance(node);
    // Occurs when the height of the left subtree is greater than that of the right subtree
    if (bal_factor > 1) {
      if (getBalance(node->leftChild) > 0)
         node = ll_rotate(node);
      else
         node = lr_rotate(node);
    }
    // Occurs when the height of the right subtree is greater than that of the left subtree
    else if (bal_factor < -1) {
      if (getBalance(node->rightChild) > 0)
         node = rl_rotate(node);
      else
         node = rr_rotate(node);
    }
    return node;

}

// BST insertion followed by tri-node restructuring to balance the tree.
Node* insert_AVL (Node* node, int val)
{
    // If the first element is being inserted, return it as a node
    if (node == NULL)
        return (newNode(val));

    // If the value to be inserted is less than the current node, traverse towards the left
    if (val < node->value)
       {
            node->leftChild = insert_AVL(node->leftChild, val);
            // Balance the nodes after insertion
            node=balance(node);
       }

    // If the value to be inserted is greater than the current node, traverse towards the right
    if (val > node->value)
        {
            node->rightChild = insert_AVL(node->rightChild, val);
            // Balance the nodes after insertion
            node= balance(node);
        }
    else
        return node;
}

void inOrder(Node *root)  
{  
    if(root != NULL)  
    {  
        inOrder(root->leftChild);
        cout << root->value << " ";  
        inOrder(root->rightChild);  
    }  
}

// Driver Code
int main(void)
{
    Node *root = NULL;  
    root = insert_AVL(root, 1);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    // Output - The inorder traversal of the AVL tree is: 1
    cout << endl;
    root = insert_AVL(root, 3);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // Output - The inorder traversal of the AVL tree is: 1 3
    root = insert_AVL(root, 4);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // Output - The inorder traversal of the AVL tree is: 1 3 4
    root = insert_AVL(root, 5);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // Output - The inorder traversal of the AVL tree is: 1 3 4 5
    root = insert_AVL(root, 6);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // Output - The inorder traversal of the AVL tree is: 1 3 4 5 6
    root = insert_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);  
    cout<<endl;
    // Output - The inorder traversal of the AVL tree is: 1 2 3 4 5 6       
}
```

Since the tree is 'automatically' balanced after every insertion, the complexity of insertion remains at O(logn), unlike a regular BST.

### Deletion from AVL trees in C++
Deletion follows a very similar algorithm compared to insertion. However, one must keep in mind that different nodes can be deleted i.e. nodes with one child, nodes with two children and nodes with no children. These cases have to be taken into account while balancing the tree.

1. Perform regular BST deletion.
2. Get the balance factor of the current node
   - Balance Factor = Height of left subtree - Height of right subtree
3. If the balance factor is greater than 1, it could be either left-left or left-right rotation. If the balance of the left tree is greater than 0, it would be a left-left rotation, otherwise a left-right rotation.
4. If the balance factor is less than -1, it could be either right-right or right-left rotation. If the balance of the right tree is less than or equal to 0, it is a right-right rotation, otherwise a right-left rotation.

```cpp
#include<bits/stdc++.h>
using namespace std;

//New Class called Node
class Node {
    public:
    int value;
    Node* leftChild;
    Node* rightChild;
};

//Creating a new node when the user enters a value.
Node* newNode(int value)
{
    Node* node = new Node();
    node->value = value;
    node->leftChild = NULL;
    node->rightChild = NULL;
    return(node);
}

//Finding the minimum node in the AVL Tree i.e. left-most node
Node* findMin(Node* node)
{
    if(node == NULL)
        return NULL;
    else if(node->leftChild == NULL)
        return node;
    else
        return findMin(node->leftChild);
}

//Finding the height of the tree recursively
int height (Node* node)
{
    int h=0;
    if (node!=NULL)
    {
        int l_height = height(node->leftChild);
        int r_height = height(node->rightChild);
        int max_height = max(l_height,r_height);
        h = max_height;
    }
    return h;
}

//Balance is the difference between the heights of the two children of an AVL tree.
int getBalance (Node* node)
{
    if(node==NULL)
        return 0;
    return(height(node->leftChild)- height(node->rightChild));
}

//Function performs Left-Left rotation
Node* ll_rotate (Node* node)
{
    Node* temp = new Node();
    temp = node->leftChild;
    //Performing rotation
    node->leftChild = temp->rightChild;
    temp->rightChild = node;
    return temp;
}

//Function performs Right-Right rotation
Node* rr_rotate (Node* node)
{
    Node* temp = new Node();
    temp = node->rightChild;
    //Performing rotation
    node->rightChild = temp->leftChild;
    temp->leftChild = node;
    return temp;
}

//Function performs Left-Right rotation
//Left-Right rotation is nothing but left-left rotation performed before right-right rotation
Node* lr_rotate (Node* node)
{
    node= ll_rotate(node);
    return(rr_rotate(node));
}

//Function performs Right-Left rotation
//Similar to left-right rotation, right-left rotation is nothing but right-right rotation performed before left-left rotation
Node* rl_rotate (Node* node)
{
    node= rr_rotate(node);
    return(ll_rotate(node));
}

Node* balance(Node* node)
{
    int bal_factor = getBalance(node);
    //Occurs when the height of the left subtree is greater than that of the right subtree
    if (bal_factor > 1) {
      if (getBalance(node->leftChild) > 0)
         node = ll_rotate(node);
      else
         node = lr_rotate(node);
    }
    //Occurs when the height of the right subtree is greater than that of the left subtree
    else if (bal_factor < -1) {
      if (getBalance(node->rightChild) > 0)
         node = rl_rotate(node);
      else
         node = rr_rotate(node);
    }
    return node;

}
//BST Insertion followed by Tri-Node restructuring to balance the tree.
Node* insert_AVL (Node* node, int val)
{
    //If it's the first element being inserted, return it as a node
    if (node == NULL)
        return (newNode(val));

    //If the value to be inserted is less than the current node, traverse towards the left
    if (val < node->value)
       {
            node->leftChild = insert_AVL(node->leftChild, val);
            //After inserting, balance the node.
            node=balance(node);
       }

    //If the value to be inserted is greater than the current node, traverse towards the right
    if (val > node->value)
        {
            node->rightChild = insert_AVL(node->rightChild, val);
            //After insertion, balance the node.
            node= balance(node);
        }
    else
        return node;
}

//Deletion in AVL Trees - BST Deletion followed by tri-node restructuring
Node* delete_AVL(Node* node, int val)
{
    Node* temp;
        //If there is no element present, nothing can be deleted.
        if(node == NULL)
            return NULL;

        //Searching for the element
        else if(val < node->value)
            node->leftChild = delete_AVL(node->leftChild, val);
        else if(val > node->value)
            node->rightChild = delete_AVL(node->rightChild, val);

        //Element found with two children
        else if(node->leftChild && node->rightChild)
        {
            temp = findMin(node->rightChild);
            node->value = temp->value;
            node->rightChild = delete_AVL(node->rightChild, node->value);
        }

        //Element with one or zero child
        else
        {
            temp = node;
            if(node->leftChild == NULL)
                node = node->rightChild;
            else if(node->rightChild == NULL)
                node = node->leftChild;
            delete temp;
        }

        node=balance(node);
        return node;
}

void inOrder(Node *root)  
{  
    if(root != NULL)  
    {  
        inOrder(root->leftChild);
        cout << root->value << " ";  
        inOrder(root->rightChild);  
    }  
}
//Driver Code
int main(void)
{
    Node *root = NULL;  
    root = insert_AVL(root, 1);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1
    root = insert_AVL(root, 3);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3
    root = insert_AVL(root, 4);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3 4
    root = insert_AVL(root, 5);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3 4 5
    root = insert_AVL(root, 6);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3 4 5 6
    root = insert_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);  
    cout<<endl;
    // The inorder traversal of the AVL tree is: 1 2 3 4 5 6
    root = delete_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3 4 5 6
    root = delete_AVL(root, 6);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    // The inorder traversal of the AVL tree is: 1 3 4 5     
}
```

The time complexity of deletion is O(log n) as well. This is due to the self-balancing feature of the tree.

### Conclusion
AVL trees or self-balancing trees have proven to be one of the most efficient data structures. They have efficient time and space complexities. As a programmer, it is key to understand the functioning and the implementation of an AVL tree such that it can be mapped to a real world scenario.

### Further readings
The reader is encouraged to take a look at the resources provided below to get a better grip over the concepts discussed.

1. [Code Academy](https://www.codecademy.com/learn/learn-c-plus-plus/modules/learn-cpp-functions/cheatsheet)

2. [AVL Trees](https://en.wikipedia.org/wiki/AVL_tree)

3. [WCUPA](https://www.cs.wcupa.edu/rkline/ds/avl-trees.html)

4. [USFCA](https://www.cs.usfca.edu/~galles/visualization/AVLtree.html)

5. [Link Springer](https://link.springer.com/article/10.1007/BF00996801)

6. [W3 Schools](https://www.w3schools.in/data-structures-tutorial/avl-trees/)

7. [Wiki Files](https://www.cs.bgu.ac.il/~ds122/wiki.files/ds122_ps6.pdf)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

### Introduction to AVL trees
Binary search trees are one of the most efficient data structures with their O(n) time complexity while performing operations. But in this fast paced world, especially in the realm of computers and processing, the one parameter that everything is scrutinized by is speed. The AVL tree, named after its two inventors, G.M. Abelson-Velvety and E.M. Landis, who published it in their 1962 paper "An Algorithm For The Organization Of Information" has anchored its position as a need-to-understand data structure owing to its performance increase from a regular BST.

### Table Of Contents
1. [Introduction](#introduction)
2. [Reason for AVL Trees](#reason-for-avl-trees)
3. [Tri-Node Restructuring](#tri-node-restructuring)
4. [Insertion in AVL Trees in C++](#insertion-in-avl-trees-in-c)
5. [Deletion from AVL Trees in C++](#deletion-from-avl-trees-in-c)
6. [Conclusion](#conclusion)

### Introduction

AVL trees are nothing but height-balanced binary search trees. As mentioned, AVL trees follow the property of height balancing, wherein the difference of heights between the left and right nodes of a parent cannot be more than mod(1). 

![AVL trees vs BST](/engineering-education/introduction-to-avl-trees/avlTree.jpg)

One can observe that in figure (a), the difference between the heights of all the left and right sub-trees is less than or equal to 1. This makes the data structure represented in figure (a) an AVL tree. However, in figure (b), the height difference between the left and right children of the tree rooted at node 4 is more than 1. This makes the tree a BST and not an AVL tree. 

### Reason for AVL Trees

Operations on BSTs like search, insertion and deletion take O(h) time, where 'h' represents the height of the tree. In case of a skewed BST (a binary search tree where all nodes have only one or no child node), performing these operations take O(n) time, where 'n' denotes the number of nodes in the tree. To tackle this inefficiency in the process, the tree can be constructed in such a way that it always maintains a logarithmic height, thereby reducing the time complexity for all operations to O(log h).

This means that the height of the tree must be maintained after every insertion and deletion such that the time complexity for every operation performed thereafter remains constant.

How does one maintain the height of the tree after every such modification?

### Tri-Node Restructuring
When a node is either inserted or deleted in an AVL tree, it might create an imbalance in the tree and would result in an increase in the time complexity. But, if the tree is restructured every time there is a modification to the structure, it would ensure that the time complexity still remains O(log h).

Let's see how the insertion of a node into the following tree would affect its structure.

Take the example of the following AVL Tree. 

<center> <img src="/engineering-education/introduction-to-avl-trees/avl_insertion_before.jpg" alt="Before insertion"> </center>

On inserting a node (4) in the tree, the structure would change to -

<center> <img src="/engineering-education/introduction-to-avl-trees/tree_after_insertion.jpg" alt="After Insertion"> </center>

In tri-node restructuring, the three roots which are involved in the imbalanced structure are chosen and are rearranged such that the order is restored.
In this case, the roots of node (3), node (4), and node(5) are taken into account because the imbalance occurs at node (4). If the height at node (4) is balanced, the overall height of the tree would remain logarithmic. For example, node (4) could be restructured similar to the figure below.

<center> <img src="/engineering-education/introduction-to-avl-trees/tree_after_structuring.jpg" alt="After Tri-Node Restructuring"> </center>

This ensures that the height of all the nodes is balanced and hence, an AVL Tree. 

#### Tri-Node Restructuring for Insertion

The procedure for tri-node restructuring for an insertion operation is as follows - 

    1. Perform regular BST insertion.
    2. Let the node being inserted be known as 'a'. Let 'd' be the first node going up from 'w' towards root that is unbalanced. Let 'c' be a child of 'd' that lies on the path between 'a' and 'd'. Let 'b' be a child of 'c' that comes on the same path. 
    3. This would result in four possible cases:
        - Left-left rotation: Where 'c' is the left child of 'd' and 'b' is the left child of 'c' 
        - Right-right rotation: Where 'c' is the right child of 'd' and 'b' is the right child of 'c' 
        - Left-right rotation: Where 'c' is the left child of 'd' and 'b' is the right child of 'c' 
        - Right-left rotation: Where 'c' is the right child of 'd' and 'b' is the left child of 'c' 
    4. After the rotations are performed according to the situation, the node is successfully inserted and the tree is balanced.
  
Left-left Rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/leftleft_rotation.jpg" alt="Left-Left Rotation"> </center>

Left-right rotation 

<center> <img src="/engineering-education/introduction-to-avl-trees/leftright_rotation.jpg" alt="Left-Right Rotation"> </center>

Right-right rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/rightright_rotation.jpg" alt="Right - Right Rotation"> </center>

Right-left rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/rightleft_rotation.jpg" alt="Right-Left Rotation"> </center>

#### Tri-Node Restructuring for Deletion 

The procedure for tri-node restructuring for an insertion operation is as follows -

    1. Perform regular BST deletion.
    2. Let the node being deleted be known as 'a'. Let 'd' be the first node going up from 'a' towards root that is unbalanced. Let 'c' be child of 'd' with higher height and is the ancestor of 'a'. Let 'b' be child of 'c' with higher height and is the ancestor of 'a'. 
    3. Now, there are four cases that can occur:
        - Left-left rotation: Where 'c' is the left child of 'd' and 'b' is the left child of 'c' 
        - Right-right rotation: Where 'c' is the right child of 'd' and 'b' is the right child of 'c' 
        - Left-right rotation: Where 'c' is the left child of 'd' and 'b' is the right child of 'c' 
        - Right-left rotation: Where 'c' is the right child of 'd' and 'b' is the left child of 'c'
    4. After the rotations are performed according to the situation, the node is successfully deleted and the tree is balanced. 

Left-left Rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/leftleft_rotation.jpg" alt="Left-Left Rotation"> </center>

Left-right rotation 

<center> <img src="/engineering-education/introduction-to-avl-trees/leftright_rotation.jpg" alt="Left-Right Rotation"> </center>

Right-right rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/rightright_rotation.jpg" alt="Right - Right Rotation"> </center>

Right-left rotation

<center> <img src="/engineering-education/introduction-to-avl-trees/rightleft_rotation.jpg" alt="Right-Left Rotation"> </center>

### Insertion in AVL Trees in C++

The algorithm for inserting a new node in an AVL tree is as follows:

    1. Perform regular BST insertion.
    2. Get the balance factor of the current node (height of left subtree - height of right subtree).
    3. If the balance factor is greater than 1, then the case could be either left-left or left-right rotation. If the balance of the left tree is greater than 0, then left-left rotation, else left-right rotation.
    4. If the balance factor is lesser than -1, then the case could be either right-right or right-left rotation. If the balance of the left tree is lesser than 0, then right-right rotation, else right-left rotation.

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

    //If the value to be inserted is lesser than the current node, traverse towards the left
    if (val < node->value)
       {
            node->leftChild = insert_AVL(node->leftChild, val);
            //After inserting, balance the node.
            node=balance(node);d
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
    //Output - The inorder traversal of the AVL tree is: 1
    cout << endl;
    root = insert_AVL(root, 3);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    //Output - The inorder traversal of the AVL tree is: 1 3
    root = insert_AVL(root, 4); 
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    //Output - The inorder traversal of the AVL tree is: 1 3 4
    root = insert_AVL(root, 5); 
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    //Output - The inorder traversal of the AVL tree is: 1 3 4 5
    root = insert_AVL(root, 6);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    //Output - The inorder traversal of the AVL tree is: 1 3 4 5 6
    root = insert_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);  
    cout<<endl;
    //Output - The inorder traversal of the AVL tree is: 1 2 3 4 5 6       
}
```

Since, the tree is 'automatically' balanced after every insertion, the complexity of insertion remains at O(logn) unlike a regular BST.

### Deletion from AVL Trees in C++

Deletion follows a very similar algorithm compared to insertion. However, one must keep in mind that different nodes can be deleted i.e. nodes with one child, nodes with two children and nodes with no children. These cases have to be taken into account while balancing the tree.
    1. Perform regular BST deletion.
    2. Get the balance factor of the current node (height of left subtree - height of right subtree).
    3. If the balance factor is equal to 2, then the case could be either right-right or right-left rotation. If the balance of the left tree is equal to 1, then right-right rotation, else right-left rotation.
    4. If the balance factor is equal to -2, then the case could be either left-left or left-right rotation. If the balance of the left tree is equal to 1, then left-left rotation, else left-right rotation.

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

    //If the value to be inserted is lesser than the current node, traverse towards the left
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

        //If the left node is deleted, right case
        if(getBalance(node) == 2)
        {
            //right-right case
            if(getBalance(node->leftChild) == 1)
                return rr_rotate(node);
            //right-left case
            else
                return rl_rotate(node);
        }
        //If right node is deleted, left case
        else if(getBalance(node) == -2)
        {
            //left-left case
            if(getBalance(node->rightChild)== 1)
                return ll_rotate(node);
            //left-right case
            else
                return lr_rotate(node);
        }
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
    root = insert_AVL(root, 3);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    root = insert_AVL(root, 4); 
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    root = insert_AVL(root, 5); 
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    root = insert_AVL(root, 6);
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    root = insert_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);  
    cout<<endl;
    root = delete_AVL(root, 2);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
    root = delete_AVL(root, 6);  
    cout << "The inorder traversal of the AVL tree is: "<<endl;  
    inOrder(root);
    cout << endl;
       
}
```

The time complexity of deletion is O(logn) as well. This is due to the self-balancing feature of the tree. 

### Conclusion
AVL trees or self-balancing trees have proven to be one of the most efficient data structures. They have efficient time and space complexities. As a programmer, it is key to have the knowledge on how to implement AVL trees in a language such that it finds its application in real world.
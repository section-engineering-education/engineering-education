A heap can be termed as a tree-based data structure that allows access to the minimum and maximum element in constant time. They reduce the normal run time with polynomial order. There are two different types of heaps, Min-heap and Max-heap. Min-heap is used for accessing the minimum element in the heap whereas the Max-heap is used for accessing the maximum element in the heap.

#### prerequisites
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Have some basic knowledge of JavaScript.

### What we will cover.
- [Min-heap](#min-heap).
- [Max-heap](#max-heap).
- [Why we need heaps](#why-we-need-heaps).
- [Applications of heaps](#applications-of-heaps).

### Min-heap.
In a min-heap, the parent or root node is usually less than the children nodes and hence used for accessing the minimum element in constant time. 

#### Pictorial representation
![min-heap](/engineering-education/understanding-min-heap-vs-max-heap/min-heap.jpg)

Based on the figure below, at every level, the smallest number is the root node.

#### Implementation.
When illustrating min-heap we use a tree-based structure. But when stored in memory, we use an array-based structure. Consider the figure below showing the tree-based and memory-based representation.

![min-heap-implementation](/engineering-education/understanding-min-heap-vs-max-heap/min-heap-implementation.jpg)

On the array, the values are entered by following the levels that occur in the tree-based structure. There is, the parent node, left node, and the right node. To identify the indexes of the nodes in the array the following formula is followed. If the start index is zero, we have the parent node as `i`, the left node as `i * 2 + 1`, and the right node as `i * 2 + 2`. Else if the start index is not zero, then we have the parent node as `i`, the left node as `i * 2`, and the right node as `i * 2 + 1 `. On a given node, we can be able to identify the parent of that node through, `i / 2`. `i` being the index of the element in the array.

We will implement three different operations on the min-heap, getting the minimum element, inserting an element, and removing an element from the heap. 

We will use the following class structure:

```javascript
class MinHeap {

    constructor(){
        this.heap = [null]; //initialize an array with null at 0th index.
    };

    //all the operations will go here.

}
```

#### Getting the minimum element.

```javascript
getMin(){

    return this.heap[1]; //the first element is the least, since we started with null.

};
```

#### Inserting an element in the min-heap.

```javascript
insert(node){
    //start by inserting the node at the end of the heap array.
    this.heap.push(node);

    
    if(this.heap.length > 2){

        //finding the correct position.

        let current = this.heap.length - 1;

        //Loop through checking if parent is greater.

        while(current > 1 && this.heap[Math.floor(current / 2)] > this.heap[current]){

            //swap the values
            [
                this.heap[Math.floor(current / 2)],this.heap[current]
            ] = [
                this.heap[current],this.heap[Math.floor(current / 2)]
            ];

            //change the index.
            current = Math.floor(current / 2);
        }

    }
}
```

The above implementation follows the below steps:
- Push the node to the end of the array.
- If we more than two elements in the array, find the correct position of the value.
- Get an index on the current position of the value.
- Loop through the array checking if there exists a parent node that is greater than the value.
- If there exists, swap the values.

#### Removing an element from the min-heap.

```javascript
remove(){
        if(this.heap.length > 2){

            //assign the last value to first index.
            this.heap[1] = this.heap[this.heap.length - 1];

            //remove the last item of the heap.
            this.heap.splice(this.heap.length - 1);

            if(this.heap.length === 3){
                if(this.heap[1] > this.heap[2]){

                    //swap them
                    [
                        this.heap[1],this.heap[2]
                    ] = [
                        this.heap[2],this.heap[1]
                    ]
                };
                return;
            };

            //get the indexes
            let current = 1;
            let leftChildIndex = current * 2;
            let rightChildIndex = current * 2 + 1;

            while(
                this.heap[leftChildIndex] &&
                this.heap[rightChildIndex] &&
                (this.heap[current] > this.heap[leftChildIndex] || 
                 this.heap[current] > this.heap[rightChildIndex]) 
                ) 

            {
                //left node value is less than parent
                if(this.heap[leftChildIndex] < this.heap[current]){

                    //swap the values

                    [
                        this.heap[current],this.heap[leftChildIndex]
                    ] = [
                        this.heap[leftChildIndex],this.heap[current]
                    ];

                    //change the parent node index

                    current = leftChildIndex;
                } else if(this.heap[rightChildIndex] < this.heap[current]) {

                    // swap
                    [
                        this.heap[current],this.heap[rightChildIndex]
                    ] = [
                        this.heap[rightChildIndex],this.heap[current]
                    ];

                    //change the parent node index.
                    current = rightChildIndex;
                };

                //update the left child index and right child index.
                leftChildIndex = current * 2;
                rightChildIndex = current * 2 + 1;

            };


            //incase right child index is undefined.
            if(this.heap[rightChildIndex] === undefined && this.heap[leftChildIndex] < this.heap[current]){

                //swapping.
                [
                    this.heap[current],this.heap[leftChildIndex]
                ] = [
                    this.heap[leftChildIndex],this.heap[current]
                ]
            };

        }

        // if there are only two elements in the array.
        else if(this.heap.length === 2){

            // remove the 1st index value
            this.heap.splice(1,1);

        } else {

            return null;

        };

        return;
    }

```

The above implementation follows the below steps:
- Check if the array got more than two elements. If it does not, just remove the element in the first index. If it does, continue with the below steps.
- Assign the last value to the first index.
- Remove the last value from the array.
- Check if only three elements are remaining. If true, check if the first element is greater than the second element and swap them if the condition is satisfied. If there are more than three elements, continue with the steps.
- Get the indexes of the current (parent), left node, and the right node.
- Loop through the array where we got the right index and the left index and also where the parent node value is greater than the left node value or right node value.
- If any of the condition is true, swap the values and update the parent node, left node, and right node.
- If there is no right node value but the parent node is greater than the left node value, swap the values.

### Max-heap.
In a max-heap, the parent or root node is usually greater than the children nodes and hence used for accessing the maximum element in constant time. 

#### Pictorial representation
![max-heap](/engineering-education/understanding-min-heap-vs-max-heap/max-heap.jpg)

Based on the figure below, at every level, the largest number is the root node.

#### Implementation.
Similarly, when illustrating a max-heap we use a tree-based structure but when representing in memory we use an array-based structure. Consider the figure below showing the tree-based and memory-based representation.

![max-heap-implementation](/engineering-education/understanding-min-heap-vs-max-heap/max-heap-implementation.jpg)

The following is our class structure:

```javascript
class MaxHeap {

    constructor(){
        this.heap = [null]; //initialize with null at the 0th index.
    };

    //the other operations will go here

}
```

#### Getting the maximum element.
```javascript
getMax(){
    return this.heap[1]; //the 1st index is the largest
}
```

#### Inserting an element.
```javascript
insert(node){
    //insert first at the end of the array.
    this.heap.push(node);

    //find the correct position
    if(this.heap.length > 2){

        let current = this.heap.length - 1;

        //Loop through checking if the parent is less.

        while(current > 1 && this.heap[Math.floor(current / 2)] < this.heap[current]){
            
            //swap
            [
                this.heap[Math.floor(current / 2)],this.heap[current]
            ] = [
                this.heap[current],this.heap[Math.floor(current / 2)]
            ];

            //change the index
            current = Math.floor(current / 2);
        }
    }
};
```

The above implementation follows the following steps:
- Start by pushing the element to the end of the array.
- Check if there are more than two elements in the array, if there are, continue with the following steps.
- Get the index of the current position of the element.
- Loop through the array checking if there is a parent node value less than the inserted element.
- If there is, swap the values and update the index of the element in the array.

#### Removing an element.
```javascript
remove(){

    //check if we got two elements in heap array.
    if(this.heap.length === 2){

        //remove the Ist index value
        this.heap.splice(1,1);

    } else if (this.heap.length > 2) {

        //assign last value to first index
        this.heap[1] = this.heap[this.heap.length - 1];

        //remove the last item
        this.heap.splice(this.heap.length - 1);

        //check if the length is 3.
        if(this.heap.length === 3){

            if(this.heap[2] > this.heap[1]){
                [
                    this.heap[1],this.heap[2]
                ] = [
                    this.heap[2],this.heap[1]
                ]
            }

        };

        //setup needed indexes.
        let current = 1;
        let leftChildIndex = current * 2;
        let rightChildIndex = current * 2 + 1;

        while(
            this.heap[leftChildIndex] &&
            this.heap[rightChildIndex] &&
            (
                this.heap[current] < this.heap[leftChildIndex] || 
                this.heap[current] < this.heap[rightChildIndex]
            )
        ) {

            //check if left node value is greater than parent.
            if(this.heap[leftChildIndex] > this.heap[current]){

                //swap
                [
                    this.heap[current],this.heap[leftChildIndex] 
                ] = [
                    this.heap[leftChildIndex],this.heap[current]
                ];

                //update the parent node index.
                current = leftChildIndex;
            } else if(this.heap[rightChildIndex] > this.heap[current]){

                //swap
                [
                    this.heap[current],this.heap[rightChildIndex]
                ] = [
                    this.heap[rightChildIndex], this.heap[current]
                ];

                //update the parent node index.
                current = rightChildIndex;
            };

            //update the rightChildIndex and leftChildIndex.
            leftChildIndex = current * 2;
            rightChildIndex = current * 2 + 1;
        };

        //incase the right child index is undefined, but the left child index value is greater than the parent node value.
        if(this.heap[rightChildIndex] === undefined && this.heap[leftChildIndex] > this.heap[current]){

            //swap
            [
                this.heap[current],this.heap[leftChildIndex]
            ] = [
                this.heap[leftChildIndex],this.heap[current]
            ]
        };

    } else {
        return null;
    };

    return;
}
```

The above implementation follows the below steps:
- Check if the array got more than two elements. If it does not, just remove the element in the first index. If it does, continue with the below steps.
- Assign the last value to the first index.
- Remove the last value from the array.
- Check if only three elements are remaining. If it is true, check if the first element is less than the second element, If this is true swap them. If there are more than three elements, continue with the steps.
- Get the indexes of the current (parent), left node, and the right node.
- Loop through the array where we got the right index and the left index and also where the parent node value is less than the left node value or right node value.
- If any of the condition is true, swap the values and update the parent node, left node, and right node.
- If there is no right node value but the parent node is less than the left node value, swap the values.

### Why we need heaps.

- **Reduced time complexity**: Linear data structures such as linked lists or arrays can access the minimum or maximum element present in [`Big O`](https://en.wikipedia.org/wiki/Big_O_notation) (n) whereas heaps can access the minimum or maximum element present in [`Big O`](https://en.wikipedia.org/wiki/Big_O_notation) (1). This is crucial while processing large data sets. n refers to the number of data sets.

### Applications of heaps.

- Used in [Operating systems](https://www.tutorialspoint.com/operating_system/os_overview.htm) for [job scheduling](https://www.techopedia.com/definition/7882/job-scheduling) on a priority basis.
- Used in [Heap sort algorithm](https://www.programiz.com/dsa/heap-sort) to implement priority queues.
- Used in [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) to find the shortest paths.

### Conclusion.

With a reduced time complexity, heaps are efficient in processing data sets. Each of the two types has a specific use case and implementation. In this article we have covered, the min-heap, the max-heap, why we need heaps, and applications of heaps. You can find the entire code from [here](https://github.com/mwangiKibui/understanding-min-heap-vs-max-heap).
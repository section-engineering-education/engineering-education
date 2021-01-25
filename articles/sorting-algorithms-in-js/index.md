Sorting can be referred to as an operation performed to arrange records in some particular order. The arrangement is performed based on the value of each record present. The order applied can either be ascending or descending. Sorting algorithms are instructions given to a computer to arrange elements in a particular order.

### Prerequisites

- You should have some basic knowledge of JavaScript.

- You should have [Node.js](#https://nodejs.org/en/) installed on your computer.

### Overview

- [Categories of sorting algorithms](#categories-of-sorting-algorithms)

- [Efficiency of sorting algorithms](#efficiency-of-sorting-algorithms)

- [Sorting algorithms](#sorting-algorithms)

### Categories of sorting algorithms

Sorting algorithms are categorized into:

- **Internal sorting algorithms**: They are sorting algorithms applied on a small amount of data. Only the main memory is used. Examples are bubble sort, insertion sort, and quicksort.

- **External sorting algorithms**: They are sorting algorithms applied to massive amounts of data. As a result, external storage devices such as hard drives, and flash disks are used. An example is merge sort.

### Efficiency of sorting algorithms

Some sorting algorithms are more efficient than others. The effectiveness of a sorting algorithm is usually defined by the following performance measures:

- **Time complexity**: It is the amount of time required by the computer  to perform the sorting based on an algorithm.

- **Memory complexity**: It is the amount of computer memory required by the computer to perform the sorting based on an algorithm.

Based on the above factors, an algorithm has three performance cases:

- **Worst case time complexity**: It is a function defined as a result of a maximum number of steps taken on any instance of size n. It is usually expressed in [Big O notation](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/).

- **Average case time complexity**: It is a function defined as a result of the average number of steps taken on any instance of size n. It is usually expressed in [Big theta notation](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/).

- **Best case time complexity**: It is a function defined as a result of the minimum number of steps taken on any instance of size n. It is usually expressed in [Big omega notation](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/).

- **Space complexity**: It is a function defined as a result of additional memory space needed to carry out the algorithm. It is usually expressed in [Big O notation](https://www.geeksforgeeks.org/analysis-of-algorithms-set-3asymptotic-notations/).

### Strategies applied during sorting

- **Recursion**: The algorithm performs a particular task over and over as long as a certain condition is being fulfilled.

- **Divide and conquer**: The algorithm accomplishes its task by dividing the problem into smaller subproblems and solving them to come up with the overall solution.

### Sorting algorithms

For each sorting algorithm discussed below, there is a step-by-step explanation of how the algorithm works, pictorial representation, and implementation of the algorithm using JavaScript. 

### Bubble sort.

Bubble sort follows the recursion technique.

**Step-by-step guide**:

- Start by comparing two elements in an array.

- Swap them if required.

- Continue till the end of the array. At this point, you have made a series of inner passes and completed an outer pass.

- Repeat the process until the entire array is sorted.

**Pictorial representation**:

![bubble_sort](/engineering-education/sorting-algorithms-in-js/bubble-sort.png)

**JavaScript implementation**.

```JavaScript
function bubbleSort(arr){

    //Outer pass
    for(let i = 0; i < arr.length; i++){

        //Inner pass
        for(let j = 0; j < arr.length - i - 1; j++){

            //Value comparison using ascending order
            
            if(arr[j + 1] < arr[j]){

                //Swapping
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
};

console.log(bubbleSort([5,3,8,4,6]));
```

Output

```bash
[3,4,5,6,8]
```

Bubble sort has the following performance cases:

- Worst-case time complexity of Big O n ^2. Requires n steps to sort an array of n elements.

- Average-case time complexity of Big theta n ^ 2. Requires n steps to sort an array of n elements.

- Best-case time complexity of Big omega n. Requires n steps to sort a sorted array of n elements.

- Space complexity: Big O 1. During swapping only one additional memory space is needed.

### Insertion sort

Insertion sort uses the recursion technique. There is a portion of the array that is sorted and the other which is unsorted. So you have to compare the elements from the unsorted portion one by one and insert them into the sorted portion in the correct order.

**Step-by-step guide**:

- Start by comparing the second element of the array with the first element assuming the first element is the sorted portion. Swap if necessary.

- Iterate through the unsorted portion of the array one by one and insert the element in the right place in the sorted portion.

- Continue until the entire array is sorted.

**Pictorial representation**

![insertion_sort](/engineering-education/sorting-algorithms-in-js/insertion-sort.png)

**JavaScript Implementation**

```javascript
function insertionSort(arr){
    //Start from the second element.
    for(let i = 1; i < arr.length;i++){

        //Go through the elements behind it.
        for(let j = i - 1; j > -1; j--){
            
            //value comparison using ascending order.
            if(arr[j + 1] < arr[j]){

                //swap
                [arr[j+1],arr[j]] = [arr[j],arr[j + 1]];

            }
        }
    };

    return arr;
};

console.log(insertionSort([23,1,10,5,2]))
```

Output:

```bash
[ 1, 2, 5, 10, 23 ]
```

Insertion sort has the following performance cases:

- Worst-case time complexity of Big O n^2. Requires n steps to sort an array of n elements.

- Average-case time complexity of Big theta n^2. Requires n steps to sort an array of n elements.

- Best-case time complexity of Big omega n. Requires n steps to sort a sorted array of n elements.

- Space complexity of Big O 1. The additional space for swapping.

### Selection sort

Selection sort uses recursion technique. In the below guide, we are using ascending order. For descending order, you do the reverse.

**Step-by-step guide**:

- Given an array, assume that the first element in the array is the smallest.

- From the other portion of the array, find the minimum value, and swap it with the first element. At this point, you have completed the first pass.

- Repeat the same procedure with the rest of the array comparing the elements to the right, not the left.

**Pictorial representation**:

![selection-sort-algorithm](/engineering-education/sorting-algorithms-in-js/selection-sort.png)

**JavaScript Implementation**

```javascript
function selectionSort(arr){

    let min;

    //start passes.
    for(let i = 0; i < arr.length; i++){

        //index of the smallest element to be the ith element.
        min = i;

        //Check through the rest of the array for a lesser element
        for(let j = i + 1; j < arr.length;j++){        
            if(arr[j] < arr[min]){
                min = j;
            }
        };

        //compare the indexes
        if(min !== i){
            [arr[i],arr[min]] = [arr[min],arr[i]];
        }

    };

    return arr;
};

console.log(selectionSort([29,72,98,13,87,66,52,51,36]));

```

Output

```bash
[13, 29, 36, 51, 52,66, 72, 87, 98]
```

Selection sort has the following performance cases:

- Worst-case time complexity of Big O n^2. Requires n steps to sort an array of n elements.

- Average-case time complexity of Big theta n^2. Requires n steps to sort an array of n elements.

- Best-case time complexity of Big omega n. Requires n steps to sort a sorted array of n elements.

- Space complexity of Big O 1. The additional space for swapping.

### Merge sort

Merge sort uses the divide and conquer technique. The main concept of merge sort is that an array of length 1 is sorted. The task, therefore, lies in splitting the array into subarrays of size 1 and then merge them appropriately so that to come up with the sorted array. 

**Step-by-step guide**:

- Split the array elements into individual elements.

- Compare the individual elements and arrange them in order. This results in subarrays of length 1 or 2.

- Make an empty array.

- Compare the elements of the subarrays and push the smaller of the values to the empty array.

- If you had extracted all the values from one of the arrays, push the remaining array to the new array.

- Continue until all subarrays have been covered and you have one sorted array.

**Pictorial representation**

![merge_sort](/engineering-education/sorting-algorithms-in-js/merge_sort.png)

**JavaScript implementation**

```javascript
//merging two arrays appropriately.
function merge(arr1,arr2){

    //make a new array and have two value pointers
    let res = [], i = 0, j = 0;

    //sorting the first array.
    if(arr1.length > 1){
        let min = 0;
        for(let i = 0; i < arr1.length; i++){
            if(i !== min){
                if(arr1[i] < arr1[min]){
                    //also swap the elements
                    [ arr1[i], arr1[min] ] = [ arr1[min], arr1[i]];
                    //change the minimum
                    min = i;
                }
            }
        }
    };

    //sorting the second array.
    if(arr2.length > 1){
        let min = 0;
        for(let i = 0; i < arr2.length; i++){
            if(i !== min){
                if(arr2[i] < arr2[min]){
                    //also swap the elements
                    [ arr2[i], arr2[min] ] = [ arr2[min], arr2[i]];
                    //change the minimum
                    min = i;
                }
            }
        }
    };

    //Value comparison.
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            res.push(arr1[i]);
            i++;
        }else {
            res.push(arr2[j]);
            j++;
        }
    };

    //pushing the rest of arr1.
    while(i < arr1.length){
        res.push(arr1[i]);
        i++;
    };

    //pushing the rest of arr2.
    while(j < arr2.length){
        res.push(arr2[j]);
        j++;
    }

    return res;
};

//merge sort
function mergeSort(arr){

    //Best case 
    if(arr.length <= 1) return arr;

    //splitting into halves
    let mid = Math.ceil(arr.length / 2);

    let arr1 = arr.slice(0,mid);

    let arr2 = arr.slice(mid);

    let arr1_subarrays = [],sorted_arr1_subarrays = [];

    let arr2_subarrays = [],sorted_arr2_subarrays = [];

    //loop through array 1 making subarrays of two elements
    for(let i = 0; i < arr1.length; i+=2){
        arr1_subarrays.push(arr1.slice(i,i + 2));
    };

    //loop through array 2 making subarrays of two elements.
    for(let i = 0; i < arr2.length; i+=2){
        arr2_subarrays.push(arr2.slice(i,i + 2));
    };

    // sorting each subarray of arr1.
    for(let i = 0; i < arr1_subarrays.length; i+=2){
        let result = merge(arr1_subarrays[i],arr1_subarrays[i + 1]);
        result.forEach((value) => sorted_arr1_subarrays.push(value));
    };

    // sorting each subarray of arr2.
    for(let i = 0; i < arr2_subarrays.length; i+=2){
        let result = merge(arr2_subarrays[i],arr2_subarrays[i + 1]);
        result.forEach((value) => sorted_arr2_subarrays.push(value));
    };


    let result = merge(sorted_arr1_subarrays,sorted_arr2_subarrays);

    return result;
};

console.log(mergeSort([70,50,30,10,20,40,60]));
```

Output

```bash
[
  10, 20, 30, 40,
  50, 60, 70
]
```

Merge sort has the following performance cases:

- Worst-case time complexity: Big O n * log n. It divides an array into two halves and takes linear time to merge the two halves.

- Average-case time complexity: Big theta n * log n. It divides an array into two halves and takes linear time to merge the two halves.

- Best-case time complexity: Big omega n * log n. It divides an array into two halves and takes linear time to merge the two halves. 

- Space complexity: Big O n. It requires additional space based on the elements of the array. 

### Quicksort

Quicksort applies the divide and conquer technique. It works by having a pivot element such that the elements to the left of it are less than it and those to the right are greater than it. The pivot element can be any element in the array.

**Step-by-step guide**:

- Select a pivot element.

- Recursively place the array elements in their correct positions as per the pivot element. Those less than the pivot element should be placed to the left whereas those greater than the pivot element should be placed to the right.

- Finally come up with a sorted array.

**Pictorial representation**

![quick-sort](/engineering-education/sorting-algorithms-in-js/quick-sort.png)

**JavaScript implementation**

```javascript
function partition(items,left,right){

    //rem that left and right are pointers.

    let pivot = items[Math.floor((right + left) / 2)],
    i = left, //left pointer
    j = right //right pointer


    while( i <= j){
        
        //increment left pointer if the value is less than the pivot
        while(items[i] < pivot){
            i++;
        };

        //decrement right pointer if the value is more than the pivot
        while(items[j] > pivot){
            j--;
        };

        //else we swap.
        if(i <= j){
            [ items[i],items[j] ] = [ items[j], items[i] ];
            i++;
            j--;
        }
    };

    //return the left pointer
    return i;
};

function quickSort(items,left,right){
    let index;
    

    if(items.length > 1){

        index = partition(items,left,right);//get the left pointer returned

        if(left < index - 1){ //more elements on the left side
            quickSort(items,left,index - 1);
        };

        if(index < right){ //more elements on the right side
            quickSort(items,index,right);
        };

    };

    return items; //return the sorted array

};

let items = [5,3,7,6,2,9]

console.log(quickSort(items,0,items.length - 1))
```

Output 

```bash
[ 2, 3, 5, 6, 7, 9 ]
```

The following steps are followed in implementing quicksort:

- Start with the left pointer pointing at index 0 and the right pointer pointing at index 0.

- Compare the element at the left pointer with the pivot element. If it is less than, increment the left pointer. Recursively do this until the value at a  pointer is not less than the pivot. At this point, stop the iteration.

- Compare the element at the right pointer with the pivot element. If it is greater than, decrement the right pointer. Recursively do this until the value at a pointer is not greater than the pivot. At this point, stop the iteration.

- When you have stopped the iteration of the left and the right pointer, swap the values being pointed by the right and left pointer. 

- Increment the right and the left pointer. At this point, a further increment shall cause the left pointer to be greater than the right pointer which shall break the loop returning the left pointer.

- Recursively do the above until the entire array is sorted.

Quicksort has the following performance cases:

- Worst-case time complexity: Big O n^2. In the case of unbalanced subarrays, it will take more time to finish.

- Average-case time complexity: Big theta n * log n. It divides an array into two and shall take linear time to merge sorted portions.

- Best-case time complexity: Big omega n * log n. Given a sorted array, it shall divide the array into two and shall take linear time to merge sorted portions.

- Space complexity: Big O n * log n. Requires small additional space to hold the subarrays.

### Key takeaways

- JavaScript by default uses insertion sort for the `sort()` method. This means that it is not appropriate when sorting large data sets. Therefore, when dealing with large data sets, you should consider other sorting algorithms such as  merge sort.

- Generally, a divide and conquer based sorting algorithm is faster than a recursion based sorting algorithm.

### Conclusion

With an understanding of sorting algorithms, software developers can be able to realize the appropriate sorting algorithm to use depending on the data set, the time required, and the space available.

In this article, we covered an introduction to sorting and sorting algorithms, categories of sorting algorithms, Efficiency of sorting algorithms, and discussed the main sorting algorithms used. For a more comprehensive description of sorting algorithms, you can reference [here](https://www.studytonight.com/data-structures/introduction-to-sorting). You can also access the entire code from [here](https://github.com/mwangiKibui/sorting-algorithms-in-js

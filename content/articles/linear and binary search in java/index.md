#### Introduction 
In the world of programming languages, data structures and algorithms are one of the problem-solving skills that all engineers must have. Linear and Binary Search are required when there is a problem with sorted arrays in Java or any other language. 

In this article, I will be sharing the ways of utilizing the methods in solving interview questions. 

#### Key Takeaways
In the end, readers would know the following concepts;

1. What are data structures and algorithms in Java.
2. When and how to use linear search algorithm.
3. Concepts of binary search in sorted java arrays problems.
4. Solutions to interview questions

### What are data structures and algorithms in Java.

In Computer Science specifically, data structures have to do with the way data are been structured, modes of flow, storing of data, and methods of referencing. There are many ways of structuring data in programming languages and one of them is an array or list which is the point of discussion. 

There are many methods of referencing the data stored through an array. Algorithms are the methods or stepwise rules laid down to solve the problem of data structures. 

For instance, stack and queue are algorithms that describe the flow of data through an array or list in real-world applications. 

Stack uses the algorithms of the last-in-first-out methodology which is called `LIFO`. This means that data are stacked on top of one another, while the last will be the first to come up when calling. 

However, Queue uses the analogy of first-in-first-out and is otherwise known as `FIFO`. Think of this as a public queue where the first person that came in will be the first one attended to. 

There are others data structures and algorithms like liked-in lists, hash maps, and many more. However, we will be looking at binary and linear search algorithms for sorted arrays data.

### Linear Search Algorithm

Linear Search can be used to traverse through array problems. Like searching for a particular element, finding a maximum or minimum element e.t.c.

Note that linear search algorithm is useful majorly when the array, in particular, is not sorted whether ascending or descending order. 

Using a linear search algorithm requires looping through the entire array in `N` times. This means that the program will run through all the elements of the array an unknown number of times. 

More so, the time complexity of this algorithm shall be `O(N)`. The time complexity is said to be the time it takes the loop to run in an exact length of the array.

Fundamentally, the space complexity of the linear search algorithms in most cases is always `O(1)`. That is constant of one because the loop will run one time and no other memory space is consumed.

Note that there is no other loop of array embedded in the given array for the linear search algorithms. 

Let us find the solution to the question below using a linear search algorithm.

`Write a program to find the maximum integer in any given array of unknown length`.

In this problem, we have to make a re-usable function that will accept an array as an argument. Here is the solution:

```Java
    
    public class MaxNum {
        public static void main(String[] args) {
            int[] arr = {33, -1, 0, 89, 9, 62, 8, 2, 97};
            int max = maxNum(arr);
            System.out.println(max);
        }

        static int maxNum(int[] arr){
            // returns -1 if length of array is zero
            if(arr.length == 0){
                return -1;
            }
            // making the first element constant for comparison
            int temp = arr[0]; 

            // loop running  through the entire array
            for (int i = 0; i < arr.length; i++) {

                // checking the specific element greater than constant
                if(arr[i] > temp) {
                    temp = arr[i]; // setting the max element to the constant
                }
            }
            // returning the max at the end
            return temp;

        }
    }

```

In the above program, we have a `maxNum` function with one argument which returns the maximum element of any given array. 

Calling the array above will print to the console `97` be the maximum integer of the array provided.


### Binary Search In Java

Binary Search is a searching algorithm used to solve problems of sorted arrays of integers. To utilize this algorithm, the order of the given array must be known whether ascending or descending.

To make use of a binary search algorithm, the best methodology is to divide the array at every point of time into two spaces. This is achieved with the `start`, `middle`, and `end` indexes of the array.

While the loop is running, the left, the middle itself and hand sides of the array are getting compared based on the intuition of the problem. 

Note that this algorithm runs through the given array by dividing it into two spaces until it remains just one element for comparison i.e when the start, middle and end indexes are pointing to one particular element.

Furthermore, the best case of this searching algorithm is said to be `O(1)`. This means that the problem gets resolved in the first division.

The time complexity of every binary search algorithm is used to be `O(logN)` which in turn corresponds to its worst case. How does this happen?

```
    First division is (N) = N / 2^0,
    Second division is (N / 2) = N / 2^1,
    Third division is (N / 4) = N / 2^2,
    .
    .
    .
    last division,  N / 2^k.

    Note that at the last division, only one element will remain. Therefore we can say N / 2^k = 1 where k is the unknown number of divisions to be made.
    
    From N / 2^k = 1, we have N = 2^k.

    Taking log of both sides of N = 2^k,
    we have k = logN / log2.

    Neglecting constant log2, then k = logN.
```
Let us now look at few problems to explain the concepts in detail.

### Solutions To Interview Questions 

1. Write the program to find the ceiling integer to a target integer in an array. Where ceiling number is the smallest number greater than or equal to the target given. Test your algorithms with ascending array-like `[2, 4, 6, 7, 9, 10, 16, 18, 21]` with the target of `11`.

Here is the solution: 

```java
    public class CeilingSolutions {
        public static void main(String[] args) {
            // given array for testing
            int[] arr = {2, 4, 6, 7, 9, 10, 16, 18, 21};

            int target = 12;

            int ans = ceiling(arr, target);
            
            System.out.println(ans); // prints 16
        }
    //    return smallest number >= target
        static int ceiling(int[] ar, int target){
            int start = 0;
            int end = ar.length - 1;

            // while start index is not greater than end index
            while(start <= end){
                int mid = start + (end - start) / 2;

                // if target is not found in ascending array, return -1
                if(target > ar[ar.length - 1] ) {
                    return -1;
                }
                
                // if target is greater than element at mid, shift end index to element before mid
                if(target < ar[mid]){
                    end = mid -1;
                }
                // else if target is less than element at mid, shift start index to element after mid
                else if(target > ar[mid]){
                    start = mid + 1;
                }
                // else mid element is the answer, return mid
                else {
                    return mid;
                }
            }
            // case when it remains only one element --> worst case where start > end
            return ar[start];

        }
    }
```

Explanations:

In the first division, the array given will be divided into two spaces where the mid element will be `9` at index 4 = `(0+8)/2`. 

While the start index is less than or equal to the end index, the following checks will be carried out.

In the first condition, if the target is not found it will return minus one.

Now the given target `11` is greater than the mid element, so it will shift the start index to index 5 i.e `4+1`. The search space is then from index 5 to 8 while the mid will be at index 6 = `(5+8)/2`.

Again, the target `11` is less than the mid element at index 6. Therefore the end index will shift to index 5 = `6-1`. 

Here the search space remains one element which is `10`.

However, the start, mid, and end index all pointing to the same element `10` at index 5. This is considered the worst case because the searching algorithm went through all spaces by dividing them at every iteration. 

But now the target `11` is greater than the index 5 element which remains the only element of the search. That will prompt the start index to move forward to index 6 and by doing so, has violated the condition of the while loop.

Then the loop will stop running and then the return statement returns the element at the start index been the smallest integer greater than `11`.

Finally,  when the function gets called it returns `16` as the ceiling integer for `11` in the array.


2. Another question says: Find the floor integer of the target `8` in the array  [40, 35, 15, 7, 6, 3, 1, 0, -3].

This question uses the concept of binary search simply because the array given is sorted in descending order. 

We shall use the same strategy as maintained in the above question solution. The only difference shall be the conditions that will determine both the start and end indexes.

Note that the floor integer refers to the greatest integer less than or equal to the target. Here is the solution to the problem:

```java
    public class FloorSolutions {
        public static void main(String[] args) {
            int[] givenArray = {40, 35, 15, 7, 6, 3, 1, 0, -3};
            
            int target  = 8;

            int ans = floor(givenArray, target);

            System.out.println(ans); // prints 7
        }


        static int floor(int[] arr, int target) {
            int start = 0;

            int end = arr.length - 1;

            while (start <= end) {

                int mid = start + (end - start) / 2;

                if (target > arr[mid]) {
                    end = mid - 1;
                } else if (target < arr[mid]) {
                    start = mid + 1;
                } else {
                    return mid;
                }
            }

            return arr[start];
        }
    }
```

### Conclusions 

Linear and Binary Search are searching algorithms that deal with both the unsorted and sorted arrays respectively. Always reference the above concept whenever there is a problem that requires any of these. Thank you for reading!!!













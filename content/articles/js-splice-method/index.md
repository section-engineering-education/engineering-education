### Introduction 
In this tutorial we are going to look at some of the JavaScript in-built functions, which are often confused because of their similar nomenclature. If you are a beginner and find them difficult you don't have to worry cause even experienced developers do confuse them sometimes. The functions are :
- slice() method
- splice() method
- split() method 
 Once we grasp how to use JavaScript's built-in methods, we can save a lot of time when developing.
### JavaScript Arrays
To begin, you must first comprehend how JavaScript arrays work. In JS, we utilize arrays to store numerous data, much like in other programming languages. The distinction is that JavaScript arrays can hold multiple types of data at the same time.

On occasion, we must perform operations on those arrays. After that, we use JS functions like slice (), splice () and split(). You can declare an array with JavaScript as follows:

```js
let array_name = []; 
```
Let's create a new array containing a variety of data kinds. I will use the same example through out the tutorial to help you learn the different uses of the slice(), spice() and split() methods.
The following is the example we will use:
```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
```
This is an acceptable JavaScript use. The above array contains many datatypes, such as string, integer and boolean.
### Slice ( )
The slice( ) method duplicates a portion of an array and gives it back as a new array without changing the initial one.
```js
array.slice(start, to);
```
Start: Slice the array from the specified element index
To: Slice the array to another element index that you specify.
To show you how the slice() method works let's us follow the example below. We will focus on slicing the first 3 items from the array. I hope you all know that indexing in an array starts from 0.
```js
array.slice(0, 3);
``` 
So the above code is going to remove the values from index 0 to index 2. This is where things maybe a bit difficult. I must set the to parameter to index 3 when slicing the first three elements. The last supplied element is not included in the slice() method.
Now let create a new code that will slice the array elements and also assign a newArray variable for the sliced Array.
```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
let newArray = array.slice(0,3); 
```
the result will be
```js
(3)[5,6,7]
```
>Note: Slice() method can be used in strings.

### Splice ( )
This function's name is extremely similar to slice ( ). Developers are frequently perplexed by this naming resemblance. An array is changed by the splice() method by addin. Let's look at how to use splice( ) to add and remove elements
g or removing items from the array.
### Removing Elements Using Splice() Method
We must provide the index parameter as well as the number of elements to be eliminated in order to remove elements:
```js
array.splice(from, upto);
```
**From** is the place to start when it comes to eliminating elements. Elements with a lower index number will not be deleted from the supplied index., what i mean is:
```js
array.splice(2);  // Starting at index 2, every item will be eliminated.
```
**Upto** specifie till where the elements will be removed.
If the second option is not specified, every element in the array beginning at the specified index will be eliminated.
As a second example, I set the second option to 1, which means that each time we execute the splice ( )function, elements starting at index 2 will be removed one by one:
```js
array.splice(2, 1);
```
Original array:
```js
let myArray = [5, 6, 7, "pizza", 3.32, true];
```
Results after:
After 1st call:
```js
array
(5) [5, 6, "pizza", 3.32, true]
```

After 2nd call:
```js
array
(4)[5, 6, 3.32, true]
```
Starting at index 2, every piece will be eliminated until there is no more index 2.
### Adding Elements Using Splice() Method
No matter how many items we are needed to add to an arrau we must always pass them through the splice() method.
Syntax for the splice method is:

```js
array.splice(index, number of items, item1, ..., itemN);//itemN means tou can enter any number of items.
```
I'm adding m and n to the very beginning of the array as an example, and I'm not removing anything:
```js
array.splice(0, 0, 'm', 'n');
```
Result after you learn the above code:
```js
array
(8)["m","n",5,6,7,"pizza",3.32,true]
```
### Split ( )
For arrays, the slice( ) and splice( ) functions are used but as for the strings the split () function is used to divide the strings and return subtrings after splitting the string.The substrings are returned in an array.
The split() method has some parameters which are not compusory to use.
THe split () method syntax is shown below.
```js
string.split(separator, limit);
```
Separator: This parameter shows how a string is separated, for example, by a comma or a character.
Limit: Sets a limit on the number of splits that can be made with a given number of divides. 
It is important to note that the split() function won't with arrays directly therefore we need to change the members of our array into a string.
Let's take a closer look at how it functions. Converting our array into a string requires the use of toString( ) method:
Using the toString() method let us convert our array into string:
```js
let ourString = array.toString();
```
Result:

```js
let ourString = array.toString();
```
Result:
```js
ourString
"5, 6, 7, "pizza", 3.32, true"
```
We will now divide ourString down into three substrings, keep them to three, and return the results as an array:

```js
let ourNewArray = ourString.split(",", 3);
```
Result:
```js
(3)["5","6","7"]
```
ourString is separated by commas, as we can see. Only the top three elements are returned because we limit split to three.


### Conclusion
Finally, we discovered the following:
#### Slice ( ) method
- Copies an array's contents.
- This function returns a new array of them.
- Nothing happens to the original array.
- array.slice begins slicing at... and continues until the supplied index is reached: (from, until)
- The “until” index argument is not included in Slice.
- Both arrays and strings can be used.
#### Splice ( ) method
- Use this function to add/remove entries from an array.
- Returns a list of elements that have been removed from the list.
- The array has been modified.
- array.splice is used to add elements (index, number of elements, element)
- array.splice is used to remove elements (index, number of elements)
- It's just good for arrays.
#### Split ( ) method
- Substrings are created by dividing a string into substrings.
- Returns an array of them.
- It accepts two parameters, both of which are optional: string. sever (separator, limit)
- The original string is unaffected.
- Strings are the only thing that it can be used for.

I'm hoping that the slice(), splice(), and split() methods will no longer cause problems.


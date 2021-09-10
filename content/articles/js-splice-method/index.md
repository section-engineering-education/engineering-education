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

Lets take an example, let slice the first three items from the above array above. We will begin slicing from index 0 since the initial element of an array is always indexed at 0.
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
To add elements, we must pass them to the splice ( ) method as the 3rd, 4th, or 5th parameter (depending on how many we want to add):

```js
array.splice(index, number of elements, element, element);
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
For arrays, the slice( ) and splice( ) functions are used. Strings are split using the split( ) function. It returns an array of substrings after dividing a string into substrings7. It has two optional parameters.
```js
string.split(separator, limit);
```
Separator: Defines how a string is separated, for example, by a comma or a character.
Limit: Sets a limit on the number of splits that can be made with a given number of divides. 
The split( ) method does not directly operate with arrays. However, after turning the members of our array to a string, we may use the split( ) method.
Let's take a closer look at how it functions. To convert our array to a string, we first use the toString( ) method:

The split( ) technique does not work with arrays directly. However, we can utilize the split( ) method after first converting the members of our array to a string.

Let's have a look at how it works.

First, we use the toString( ) method to convert our array to a string:
```js
let myString = array.toString();
```
Result:

```js
let myString = array.toString();
```
Result:
```js
myString
"5, 6, 7, "pizza", 3.32, true"
```
Let's break myString down into three substrings, limit them to three, and return the results as an array:

```js
let newArray = myString.split(",", 3);
```
Result:
```js
(3)["5","6","7"]
```
MyString is separated by commas, as we can see. Only the top three elements are returned because we limit split to three.


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


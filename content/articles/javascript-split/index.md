### Javascript split - How to split a string into an array in Javascript
### Introduction
The `split()` function returns a new array after splitting a text into an array of substrings. If the separator is an empty string `(" ")`, the text is divided between each character. The original string is unaffected by the split() function. A string in a programming language, therefore, represents a sequence of characters. 

For examples below show examples of strings made from a sequence of characters in Javascript which are created in various ways.

1. Using the `String` constructor as an object.
```js
const msg=new String("Good Morning");
```
2. Using the `String` literal as a primitive
```js
const msg ="Good Morning";
```
One intriguing feature of strings in JavaScript is that their index may be used to retrieve the characters within them. The initial character's index is 0, and it increases by one. 

Characters in a string can be retrieved by their index in Javascript.The first character is always index 0 and the index increments by one as the strings are written from the left to the right. The characters can be accessed in index form as follows.
```js
let str="Good Morning";
console.log(str[0]); //G
console.log(str[1]); //o
console.log(str[2]); //o
console.log(str[3]); //d
                 .
console.log(str[11]); //g
``` 
Aside from being able to access string characters by their indices, JavaScript has several utility functions for accessing characters, extracting a portion of a string, and manipulating it.

We are therefore going to learn deeply about the `split` method in Javascript.
### JavaScript split method
Depending on the divider, the JavaScript split() function separates a string into two or more substrings. A single letter, another string, or a regular expression can be used as the splitter.
The split() function stores the substrings in an array and returns it after dividing the text into several substrings. It doesn't change the original string in any way.

Let us understand how it works by first creating a string using the string literals.
```js
let msg="Hello world, welcome to the programming world";
```
The split() function saves the substrings in an array and returns it after dividing the text into several substrings. It doesn't affect the original string in any way.
```js
//Using the space character
let arr=message.split('  ');
//Your array
console.log(arr);/*"Hello world, welcome to the programming world"*/

console.log(arr[0]); // "Hello"
console.log(arr[1]); // "world"
console.log(arr[2]); // "welcome"
console.log(arr[3]); // "to"
console.log(arr[4]); // "the"
console.log(arr[5]); // "programming"
console.log(arr[6]); // "world"
```
The split() method's principal function is to extract the chunks you're interested in from a string so you may utilize them in other applications.
### Splitting a string by each character
The split() function saves the substrings in an array and returns it after dividing the text into several substrings. It doesn't affect the original string in any way.
```js
console.log(message.split(''));
```
NB

Using an empty string as the splitter yields an empty array when dividing an empty string(").
### Splitting a string into one array
Without a splitter/divider, you may use the split() function on a string. This simply implies that no parameters have been given to the split() function.

When you call split() on a string that doesn't have a splitter, it produces an array that contains the full string.
```js
let message='Good morning programmers';
console.log(message.split());//returns["Good morning programmers"]
```
NB

Using the split() method on an empty string(") without a splitter yields an array containing an empty string.
```js
// It will return an empty array
''.split(''); // returns []

//It will return an array with an empty string
''.split() // returns [""]
```
### Splitting a String Using a Non-matching Character
We usually employ a splitter that is a component of the string we're attempting to divide. It's conceivable you used a splitter that wasn't part of the string or didn't match any part of it. The split() function returns an array containing the whole string as an element in this example.

The message string in the example below does not contain a comma (,). Let's see whether we can separate the string using the comma splitter (,).
```js
let message='Good morning programmers';
console.log(message.split(','));//["Good morning programmers"]
```
### Splitting using regex
A regular expression (regex) can also be used as the splitter/divider in the split() method.
```js
let message='Javascript is a programming language! A programmer can use the language.';
```
Let's break up this string at the exclamation mark (! ), and the full stop(.) We can create a regex that detects these characters. The regex is then passed to the split() method, which is then used on the above string.
```js
let sentences=message.split(/[! , . ]/);
console.log(sentence);
```
### Splitting with a limit
Apart from all the other methods that we have seen, one can also `limit` as an additional parameter in the split() method.
```js
string.split(splitter,split);
```
The limit parameter restricts the number of splits. It indicates that the array will only include the number of entries provided by the limit argument.

We, therefore, divide a string using a space (' ') as a splitter as shown below. The number two is sometimes used as a limit. The split() function returns a two-element array that ignores the rest.
```js
let message='Good morning programmers';
console.log(message.split(' ' , 2)); // Good morning
```
### Replacing characters in a string using the split() method
One can use the split() function to replace all instances of a character in a string with another character.
```js
let subject = 'JavaScript Language';
let subs = subject.split(' ');
console.log(subs); // ["JavaScript","Language"]

let joined = subs.join('-');
console.log(joined); // ["JavaScript-Language"]
```
Consider the name has the first subject (JavaScript) and last name(Language) separated by a space. Here we first split the name using the space splitter. It returns an array containing the first and last names as elements, that is['JavaScript', 'Language'].

Then we use the array method called join() to join the elements of the array using the - character. The join() method returns a string by joining the element using a character passed as a parameter. Hence we get the final output as JavaScript-Language.
### Conclusion
In conclusion we have seen what is a split() method in JavaScript and how it is implemented in the various ways that we looked into. This helps in solving various problem of string in an array in JavaScript.
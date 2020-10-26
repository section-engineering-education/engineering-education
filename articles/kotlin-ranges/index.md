### Kotlin Range Operators
Kotlin provides a wide range of solutions. Most of these solutions aim to make development easier and faster. It provides easier ways to perform specific actions. Since it's compiled the same way as Java, its functions and methods ensure your code is more efficient. The boilerplate code present in Java is also greatly reduced. This article addresses one of the solutions it offers: iterations. In this article, let us take a look at Kotlin ranges.

### What are ranges
A range is a collection of values determined by a start and stop value. A simple example is, values between 1 and 5 form a range. That is, a range of 1 as the start value and 5 as the end value. Both the start and end values belong to the range too. In other words, a range is an interval from the start value to end value. We can use functions to create progressions and check for values in ranges. Let's look at how we could use ranges.  

Before we get to write code, you can use the following [repl.it](https://repl.it/@Linusmuema/Ranges) to run the functions. All you need to do is call the specific function in the `main` function. Then run the code and your output will be printed 🤓.
For instance, if we want to run the `printNumRange` function :

```Kotlin
  fun main(args: Array<String>) {
      printNumRange()
  }
```

### 1. To Create a Progression
We can use the range operator to create an iterable range. A loop is created that goes through each item from the start value to the end value. This helps us to be sure of the number of iterations in the loop. It gives the developer more control over the loop. In the repl, call the `printNumRange` function and run.

```kotlin
fun printNumRange(){
    for(i in 1..5) print("$i,")
}
```

The output should be

```bash
1,2,3,4,5,
```

This loop goes from 1 to 5. But that is not the only trick ranges have. We can also create ranges using characters. We can create a range that starts from a specific letter in the alphabet to another. This can be from `a` to `e`. You can go ahead and call the `printCharRange` function.

```kotlin
fun printCharRange(){
    for(char in 'a'..'e') print("$char,")
}
```
The expected output is
```bash
a,b,c,d,e,
```
It was not easy to do this in java. When implemented it led to lots of boilerplate and dirty code.

```Java
  String letters = "abcdefghijklmopqrstuvwxyz'";
  for (char c : letters.toCharArray()) {
      System.out.printf(c);
  }
```

First we create a string of the characters. The  we convert it to a CharArray where using `forEach`, we get each of the characters. With Kotlin ranges, this is reduced to only a few lines with fewer requirements.

### 2. To Create Reverse Loops
It was always a challenge to create a reverse loop as you would interchange values in the old way. This could lead to confusion and take time to debug. An example of a reverse loop in java would be:

```Java
for (int i = 5; i >= 0; i--) {}
```

Ranges have a function called `downTo` which can be used to create a reverse progression. We can use it to loop from the end value backwards to the start point.

```kotlin
fun reverseNumRange(){
    for(i in 5.downTo(1)) print("$i,")
}
```

Once you run the `reverseNumRange`, the output should be

```bash
5,4,3,2,1,
```

The same applies to the character range. It loops downwards to the start character. The function `reverseCharRange` does that.

```kotlin
fun reverseCharRange(){
    for(char in 'e'.downTo('a')) print("$char,")
}
```

The output is:
```bash
e,d,c,b,a,
```

### 3. To Generate Random Numbers
Sometimes you may want to generate random numbers within certain limits. This is virtually impossible in the old loop. A good option is to use `Math` class and call the `random` function. This however is limiting to the values it returns. It returns double values ranging from 0.0 to 1.0. In addition to that, you needed to add more calculations. It may be confusing to a developer who is not very experienced in Java. For example, to generate random numbers between 1 to 10:

```Java
int max = 10;
int min = 1;
int range = max - min + 1;
int random = (Math.random() * range) + min;
```

With ranges, it is as simple as creating the desired range and calling the `random` method. This makes it easy to get random numbers in any range.

```kotlin
fun getRandomInRange(){
    println("random value = ${(1..5).random()}")
}
```

In the `getRandomInRange` function, we are creating a range from 1 to 5 then getting a random number from it. we add the value to the output through Kotlin's [String interpolation](https://kotlincompact.com/string-interpolation.html). You can add expressions as well as variables in strings.

### 4. To Check For Values in Ranges
Sometimes you may need to check if a value lies inside a particular range. For instance, after picking an image via [`intents`](https://developer.android.com/training/camera/photobasics) in android, we can check the dimensions. Suppose, we need the image dimensions to lie in a specific range, we can use the range operator. An if statement is used instead. If the value is in range, the result is `true` and vice versa.

```kotlin
fun checkInRange(){
    val value = (1..10).random()
    if(value in 1..5) println("$value is in range")
    else println("$value is not in range")
}
```
In the `checkInRange` function, we are generating a random number between 1 and 10. Then we check if the value is between 1 and 5. We then print the result based on the comparison. A sample output is

```bash
5 is in range
7 is not in range
```

### 5. To Create Special Loops
With loops generated from ranges, we can define how the loop happens. We may want it to skip one value as it loops through. A good use case is when you need to print either even or odd numbers. For even case, you define the starting point as 1 until the last point. Then you add the `step` keyword with the value of 2. It will loop from 1, skipping one value in the loop. The `rangeWithStep` function is an example.

```kotlin
fun rangeWithStep(){
    for(i in 1..10 step 2) print("$i,")
}
```

The output is
```bash
1,3,5,7,9,
```

To print out the odd values, we set the starting point as 2 and step 2 also.

```bash
2,4,6,8,10
```

With step, you have to be careful as the end point is printed based on the step. If the value is the one to be skipped, it is not printed as we have seen in the case of even numbers. 10 was not printed as it lies in the `skipped` values.

### Conclusion
As you can see, Ranges can help us perform various tasks easily. It provides an easier and more efficient way to generate loops. **Fun fact** : In Kotlin, you cannot create a loop in the old way i.e `for(int i = 0, i <= maxValue, i++)`. Instead, you use ranges and knowing how they work would of great help. And the  `in` keyword is used in all loops too. Go ahead and try out different ways to use Kotlin ranges to perform different tasks. 😎

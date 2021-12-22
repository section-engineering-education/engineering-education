---
layout: engineering-education
status: publish
published: true
url: /kotlin-collections/
title: Kotlin Collections
description: This article goes through some of the most common collections in Kotlin and addresses the common methods among those collections.
author: linus-muema
date: 2020-10-23T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kotlin-collections/hero.png
    alt: kotlin collections image
---
Working with grouped data can be a challenging task. In most programming languages, we have `Arrays` and `Lists` to help us. They allow for better management of data and computer's resources. Imagine having to create a String or Integer for every value that you had in a program.
<!--more-->
### Kotlin collections
[Kotlin](https://kotlinlang.org/) has a vast set of collections. All of them are special in their own way. However, there are many with similar methods and characteristics. Due to this, beginners may find it difficult to follow along when going over the official documentation.

This article goes through some of the most common collections in Kotlin. It also addresses the common methods among those collections. We will look at each collection and how they differ from each other. By the end of this article, you should be able to know the characteristics and methods of each collection.

### Prerequisites
To get started, you will need to have a basic understanding of Kotlin. This will help guide you through each of the functions and the keywords. All the functions and code used can be found on [repl.it](https://repl.it/@Linusmuema/Collections). To execute the functions, just call them in the `main` function and pass in `arr` as an argument.

### Let's code!
The collections we will look at are:
- [Lists](#Lists)
- [Arrays](#Arrays)
- [Sets](#Sets)
- [Maps](#Maps)

#### Lists
This is an immutable collection that stores items in an ordered format. This means lists are read-only. Once you receive a list, you cannot change values but can only access them. This is done using indices. An `index` is the position of the value in the array.

As in most programming languages, Kotlin indices also begin from 0. To create a mutable list, you can make use of the [MutableList](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-list/index.html#kotlin.collections.MutableList) interface. The [ArrayList](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-array-list/) collection is another alternative.

There are a few ways to create a list:

  - **listOf()** - with this method, you pass in the values as parameters to create a list.
  - **mutableListOf()** - it works the same as `listOf()` but instead creates a mutable list.
  - **toList()** - call this on any collection to convert it to a list. For a mutable list, use `toMutableList()`.

#### Arrays
These are the direct opposite of `lists`. They are mutable, i.e. can be changed. They, however, have a fixed size. This means that you can't add more elements to them.

In `lists`, you can add and remove items from them, but with `arrays`, you cannot. To create an Array:

  - **arrayOf** - pass in the items to be included in the array
  - **toArray** - this method converts a collection to an Array

Go ahead and call the `arrays` function to convert our list to an array:

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      arrays(arr)
}
```

#### Sets
Sets are special collections that do not allow duplicates. They don't have repeating values. In our code, our list has the values `tea` and `burgers` repeating. When we create the set using the `toSet()` method, it creates a new set. It removes redundant values and creates a new collection. To convert our list to a set, call the `sets` function:

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      sets(arr)
}
```

#### Maps
A map stores values in key-value pairs. Each item in the collection has a key used to access the value. Instead of using indices, one gets an item with a key and calls the `value` method to get the data. Keys are special and have no duplicates and each key can hold only one value at a time.

Just like lists, maps are immutable but have an [interface](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-mutable-map/#kotlin.collections.MutableMap) to support mutability. To convert a list to a map, we set the indices of each item to be the key and the item to be the value.

We use the `mapIndexed()` method to transform the list into a map. With this method, we can access the index `i` and set it as the key to the value `l`.

Those are the four most common collections in Kotlin. They also have similar methods within their classes. We will go through each of them describing their functions and how they work. Call the `maps` function to check the methods used in maps

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      maps(arr)
}
```

#### 1. `.indices`
This method creates a range of indices from the collection. In maps, however, the equivalent of this method is `.keys`. But instead of a range, it creates a `set` of keys since there are no duplicates. When you call the `ranges` function, you get a random number from the range created. I have used string interpolation in most of the outputs for cleaner code.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      ranges(arr)
}
```

#### 2. `.maxBy`
Sometimes we might want to get the highest value in a collection. For this we used to use the `.max` function. This method has been deprecated because of null safety and now we use `.maxOrNull`. In our case, we might need to get the longest word from our collection of words. The `maxOrNull` will not work because our values are not numeric in any way.

We use the `.maxBy` or `.maxByOrNull` to add a selector to the function. We pass in the length as our selector and so we get the string that has the highest length. The expected value should be `croissant`.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      longest(arr)
}
```

In the map, we first have to get the value by calling the `.value` method and get the length. The same applies to every method on maps. You get the value before performing any further actions.

#### 3. `.any` & `.all`
It returns a Boolean value. It checks if any of the items in the collection meet the defined predicate. It is similar to the `.all` function but the `.all` function checks if all of the items match the given predicate. We are checking if any of the strings have a length which is of an even number. The functions `checkAll` and `checkAny` can carry out the above checks.

`checkAll` returns false because items like `tea` have lengths of 3 and it is an odd number.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      checkAll(arr)
}
```

 `checkAny` returns true as `coffee` has a length of 6 and it is an even number.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      checkAny(arr)
}
```

#### 4. `.map`
This is a really helpful method. It transforms a collection according to the conditions you provide. It comes in handy when you need to change a collection to a different format. Instead of creating new collections, it changes the current collection.

This ensures clean and readable code. In our case, we change the list of words to a list of their lengths. Go ahead and call the `changeList` function.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      changeList(arr)
}
```

 The result is a list of int values. The only downside to this method is that it returns a collection of type `list`. This is not a problem as we can convert collections easily using methods such as `toList` and `toSet`. But it can be used on all collections, mutable and immutable.

#### 5. `.filter`
It is a common practice to filter data based on some conditions. In Kotlin, we use this `.filter` method to do exactly that. You pass in the condition in the lambda and the result is a list of the values that meet the criteria. In our `filterEven` function, we filter out the strings whose length is not an even number. The result should be an array with `coffee` as the only item.

```kotlin
fun main(args: Array<String>) {
      val arr = listOf("pizza", "burgers", "tea", "coffee", "croissant", "bread", "tea", "burgers")
      filterEven(arr)
}
```

### Conclusion
With that, you now have a better understanding of some of the common collections and the shared methods. They are useful in managing a collection of data and resource management. You can find more collections and their methods in the Kotlin collections [documentation](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/). These will help you create better applications with cleaner code and offer alternatives to creating loops and nested `if` statements.

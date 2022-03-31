---
layout: engineering-education
status: publish
published: true
url: /using-lambdas-to-manipulate-a-collection-of-objects/
title: How to Manipulate Objects Using Lambdas in Java
description: This article will help the reader understand how to manipulate objects using Lambdas in Java.
author: kingsley-nwafor
date: 2021-11-23T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-lambdas-to-manipulate-a-collection-of-objects/hero.jpg
    alt: Manipulate Objects using Lambdas Hero Image
---
Java is an object-oriented programming language. Lambdas allow programmers to make their code shorter, efficient, and more functional.
<!--more-->
An object could be physical or imaginary, it just has to do with the way we see things in general.

For example, a wallet is an object that has a method to store money, make money, add cards, get cards; this is physical.

On the other hand, an account can also store money and check balance; but that's imaginary.

Example 2: A bucket is an object that has a method to store either solid, liquid, or gas.

Now it gets interesting when you have a collection of wallets with different items and you want to access the one with the red card that has more than $30,000.

This is when lambdas come in. They help one to iterate through a collection of objects and avoid numerous mistakes.

### Prerequisites
To follow along, you should have a basic understanding of the Java OOP (Object Oriented Programming) concept and lambdas.

### Objectives
This tutorial will help you understand:
- How lambdas work.
- How to sort objects using lambdas.
- How to calculate the value of an object.
- How to group a collection of objects.
- How to check for a unique object.

### Importance of Lambdas
Using lambdas is an effective way of writing your code. Some critics argue that lambdas are not clear, but in the real sense, they are efficient and minimize errors.

Let's use our wallet object as a case study.

You will create different wallets based on color and money. We will then manipulate these objects using these two variables (color or money).

> Note that this operation is time-consuming and may lead to high time complexity.

### Getting started
First, we are going to create the following classes or objects:
1. Card (AtM card)
2. Wallet
3. The Collection_Wallet as a driver class

Create a folder and name it `Lambda_Collection`. It will store our three classes (package).

Here is the code for the Card, Wallet, and Collection_Wallet classes:

Card:

```java
package Lambda_Collection;

public enum Card {
    Red, Black, Green, Blue //card colors
}
```

Wallet:

```java
package Lambda_Collection;

import java.util.LinkedList;
import java.util.List;

public class Wallet {

    private double money;
    private Card card;//card is a variable of Card object and this phenomenon is called Composition.
    int counter=0;

    public Wallet(double money,  Card card ) {
        this.money = money;
        addCards(card);

    }
    //creating methods that store money and Card
        public void storeMoney(double money){
            this.money+=money;
        }

        public double takeMoney(){
            return money;
        }

        public void addCards(Card card){
            this.card=card;
            counter++;
        }
        public Card getCards(){
            return card;
        }

    @Override
    public String toString() {
        return  String.format("%s%.2f %s ",
                 "#",takeMoney(), getCards());
         }
}
```

In the code above, we have created a folder or package for storing our code.

Next, we created an `object` of `card`, `wallet`, and then an `Enum` class that contains the color of the individual class.

The toString method allows us to make the object visible.

The following code shows how the `wallet` collection looks like before we use lambdas:

```java
package Lambda_Collection;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class Collection_Wallet {
    public static void main(String[] args) {
           Wallet[] walletsGroups={
                new Wallet(4000,Card.Blue),
                new Wallet(14000,Card.Black),
                new Wallet(34000,Card.Red),
                new Wallet(24000,Card.Red),
                new Wallet(44000,Card.Green),
                new Wallet(44000,Card.Black),
                new Wallet(44000,Card.Green),
                new Wallet(54000,Card.Black),
                new Wallet(34000,Card.Blue),
                new Wallet(74000,Card.Black),
                new Wallet(64000,Card.Black),
        };
      // The above is a collection of wallet objects, after this, we then save it as a list
        List<Wallet> list = Arrays.asList(walletsGroups);
        System.out.println("Completes Display Of Wallets");
        //this is use to   display the collections using lambdas
       list.stream().forEach(System.out::println);
    }
}
```

The `list.stream()` method creates a stream of Wallet. In other words, it helps us to identify a specific object in a collection.

#### Filtering wallets
To access specific fields, we use the `filter` method. This function takes in a predicate expression and returns a boolean value.

The two major interfaces that help in manipulating collections using lambdas are `Functions<T, R>` and `Predicate<T>`.

The `Predicate` takes in an argument and returns a `boolean` value (true or false).

The returned value is then used to check whether a particular parameter meets the defined condition.

`Function` takes in two arguments and returns the required datatype. The Customers<T> takes in an argument but returns nothing.

Finally, `Supplier<T>` takes in no argument and returns a value of T.

We use the `Predicate` interface to check if the pipeline meets a certain condition. It is used with the `filter` function which is associated with the `Predicate` method.

Add the following code in your `Collection_Wallet` class:

#### Example 1
Selecting an object based on `card color` and `amount`:

```java
Predicate<Wallet> takeMoneyAndBlackCard=
                e -> (e.takeMoney() >= 30000 && e.getCards().equals(Card.Black));
        System.out.printf("%n Display of your sorted list: %n");
        list.stream()
                .filter(takeMoneyAndBlackCard)
                .sorted(Comparator.comparing(Wallet::getCards))
                .forEach(System.out::println);
```

The `Comparator` interface compares two wallet objects based on the instance method and returns a negative value if the first element is less than than the second element.

A positive value is returned when the first component is greater. Zero is returned when the two elements are the same. The `forEach` function then terminates the entire pipeline.

Output:

```bash
Displaying the sorted list by Card:
'#44000.00 Black
#54000.00 Black
#74000.00 Black
#64000.00 Black'
```

#### Example 2

```java
Predicate<Wallet> takeMoneyAndBlackCard=

                e -> (e.takeMoney() >= 30000 && e.getCards().equals(Card.Black));
        System.out.printf("%n Display of your sorted list: %n");
        list.stream()
                .filter(takeMoneyAndBlackCard)
                .sorted(Comparator.comparing(Wallet::takeMoney))
                .forEach(System.out::println);
```

Output:

Display the sorted list according to the amount of money:

```bash
$44000.00 Black
$54000.00 Black
$64000.00 Black
$74000.00 Black
```

What if we want to find a single wallet with an amount of money higher than $30,000? In this case, we use the `findFirst()` intermediate method.

```java
 Predicate<Wallet> takeMoneyAndBlackCard=
                e -> (e.takeMoney() >= 30000 );
        System.out.printf("%n Display of your sorted list: %n");
        System.out.println( list.stream()
                .filter(takeMoneyAndBlackCard)
                .findFirst())
                .get();
```

Output:

```bash
$34000.00 Red
```

> Make sure to always use a different variable each time you invoke a `Predicate interface`.

Using the `Function<T, R>` method:

```java
        Function<Wallet, Double> byTakeMoney = Wallet::takeMoney;
        Function<Wallet, Card> byGetCard = Wallet::getCards;
        Comparator<Wallet> byMoneyThenByCard=Comparator.comparing(byTakeMoney).thenComparing(byGetCard);
        System.out.println("Display by money then by card");
        list.stream()
                .sorted(byMoneyThenByCard)
                .forEach(System.out::println);
```

Output:

```bash
$4000.00 Blue
$14000.00 Black
$24000.00 Red
$34000.00 Red
$34000.00 Blue
$44000.00 Black
$44000.00 Green
$44000.00 Green
$54000.00 Black
$64000.00 Black
$74000.00 Black
```

Let's see how to reverse elements based on values in the collection using lambdas:

```java
System.out.println("Display by money then by card in reserve order)
        list.stream()
                .sorted(byMoneyThenByCard.reversed())
                .forEach(System.out::println);`
```

Output:

Display by money then by card:

```bash
$74000.00 Black
$64000.00 Black
$54000.00 Black
$44000.00 Green
$44000.00 Green
$44000.00 Black
$34000.00 Blue
$34000.00 Red
$24000.00 Red
$14000.00 Black
$4000.00 Blue
```

### Grouping
We map a wallet to the unique color of a card using the code below:

```java
System.out.println("Printing out distinctive amount in the wallet");
      list.stream()
      .map(Wallet::takeMoney)
      .distinct()
      .sorted()
      .forEach(System.out::println);

System.out.println("Printing out distinctive card in the wallet");
      list.stream()
       .map(Wallet::getCards)
       .distinct()
       .sorted()
       .forEach(System.out::println);
```

Output:

Printing out distinctive amounts in the wallet collection:

```bash
4000.0
14000.0
24000.0
34000.0
44000.0
54000.0
64000.0
74000.0
```

Printing out distinctive cards in the wallet collection:

```bash
Red
Black
Green
Blue
```

We can use lambdas to group objects based on their instance methods. The `collect` argument specifies how to summarize data in a meaningful manner.

The map takes in two arguments that instruct the JVM (Java Virtual Machine) on how to group the `Card` objects.

```java
   Map<Card, Long> walletCountByCard =
                list.stream()
                        .collect(Collectors.groupingBy(Wallet::getCards,Collectors.counting()));
                        walletCountByCard.forEach(
                 (getCards, count) -> System.out.printf(
                "%s has %d wallet(s)%n", getCards, count));

    }
```

Output:

```bash
Blue has 2 wallet(s)
Red has 2 wallet(s)
Green has 2 wallet(s)
Black has 5 wallet(s)
```

Calculating the sum of all the amounts in the wallet:

```java
System.out.printf(
                 "%nSum of Wallet' salaries (via sum method): %.2f%n",
                 list.stream()
                 .mapToDouble(Wallet::takeMoney)
                 .sum());
```

Output:

```bash
Sum of Wallet' money (via sum method): 434000.00
Average of Wallet' money (via average method): 39454.55
```

Calculating the total amount for a specific color of cards:

```java
 Predicate<Wallet> takeMoneyAndBlackCard1=

                e -> (e.getCards().equals(Card.Black) );
        System.out.printf(
                "%nSum of Black Card wallet(via average method): %.2f%n",
                list.stream()
                        .filter(takeMoneyAndBlackCard1)
                        .mapToDouble(Wallet::takeMoney)
                        .sum());
```

> Note that I used the `Predicate` interface and also embedded it inside the `filter` method.

Output:

```bash
Sum of Black Card wallet via average method: 250000.00
```

### Conclusion
In this tutorial, we learned how to iterate through a collection of objects, and manipulate it with functional interfaces such as `Functions<T, R>`, and `Predicate<T>`.

We also grouped objects using map functional interface which takes in two arguments `Card` and `Long`.

### Further reading
- [TimeComplexity](https://www.mygreatlearning.com/blog/why-is-time-complexity-essential/)
- [Java Documentation](https://docs.oracle.com/javase/8/docs/api/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
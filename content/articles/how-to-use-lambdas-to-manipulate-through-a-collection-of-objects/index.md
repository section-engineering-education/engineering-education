
### Introduction
Java is majorly an object-oriented programming language. The importance of lambdas as a programmer is to
make your code appear shorter, efficient, and above all functional. Everything in Java is an object. An object could be physical or imaginary, it just has to do with the way we see the thing about things in general. For example, a wallet is an object that has a method to store money, make money, add cards, get cards, etc.

Example 2: a bucket is an object that has a method to store fluids either solid, liquid, or gas depending on what you want to store it with and get fluid. Now it gets interesting when you have a collection of wallets with different items in it and you want to access the one with the red card that has money more than #30,000 ('#' is naira in Nigeria currency), this is when lambdas come in because it hard you iterate through a collection without making mistakes and even if it works it's definitely not efficient.


### Prerequisite
- A basic understanding of the Java OOP (Object Oriented Programming) concept
- Basic understanding of lambdas

### Objectives

1. To enable individuals to understand  how lambdas work
2. To enable individuals to understand how to sort
3. To enable individuals to understand how to calculate the value of the different object
4. To enable individuals to understand how to Group a collection of object 
5. To enable individuals to understand how to check for a distinct object

### Importance Of Lambdas
Using lambdas is an effective way of writing your codes as some programmers argue that it might not be clear enough but the truth is, it is highly efficient and leaves room for no error in your code. 

It abstracts all the pipe-line you have to create to find what you are looking for, let use our wallet object as a case study, you will have to create different wallets based on color first before you create another group based on the outcome of the first group with money greater than '#30,000' and this could be time-consuming and also leads to a high time-complexity.

Let code>>>
First, we are going to create three(3)classes or objects.
1. Card
2. Wallet
3. The Collection_Wallet as a driver class
4. Input all of them inside into a folder call it Lambda_Collection

```
    ```
package Lambda_Collection;

public enum Card {
    Red,Black,Green,Blue
}
    ```
```

```
    ```
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
    ```
```

First, you create a general folder or package for writing all your codes, firstly we created an object of card because java is an object-oriented language.
Now we have seen how a wallet looks like on code, you can set the money and that is you adding money to your wallet. The toString method is to make your object
visible.


Below is the code base of how the wallet is going to look like when we use lambdas to display, manipulate through.

```
    ```
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
```


N/B that list. stream() creates a stream of Wallet just as we said early you spread your wallets all over the table and then you want to look for a specific
thing.

#### Filtering Wallets
When you are searching for a card that is green we place them in an array i.e have a collection of wallets and then we iterate through
 Two major interfaces that will help you to manipulate your collections using lambdas are the Functions<T, R> and the Predicate<T>.

The Predicate takes in an argument and returns true or false, this is used to check whether a particular  parameter meets the condition while Function takes
in parameter and also return required datatype
Customers<T> takes in argument and return void such as the forEach
Supplier<T>etc takes in no argument and returns a value of T.

Firstly we use the Predicate interface to check if the pipeline meets a certain condition

Predicate<T> this takes an argument and then returns true or false which validates, it is then used with the filter which is an intermediate method that 
takes in a predicate method

N/B please write these codes in your Collection_Wallet class;
Example1
Selection Base on Card and Amount and then sorting

```
    ```
Predicate<Wallet> takeMoneyAndBlackCard=
                e -> (e.takeMoney() >= 30000 && e.getCards().equals(Card.Black));
        System.out.printf("%n Display of your sorted list: %n");
        list.stream()
                .filter(takeMoneyAndBlackCard)
                .sorted(Comparator.comparing(Wallet::getCards))
                .forEach(System.out::println);
    ```
```
The Comparator interface with its static method comparing, compares two objects of wallet base on its instance method and returns negative if the first is less than than the second, positive if the first is greater, and zero if they are equal, then the forEach terminates the entire pipeline.

Result
Display of your sorted list by Card: 
'#44000.00 Black 
#54000.00 Black 
#74000.00 Black 
#64000.00 Black'


Example2
```
    ```
Predicate<Wallet> takeMoneyAndBlackCard=
                e -> (e.takeMoney() >= 30000 && e.getCards().equals(Card.Black));
        System.out.printf("%n Display of your sorted list: %n");
        list.stream()
                .filter(takeMoneyAndBlackCard)
                .sorted(Comparator.comparing(Wallet::takeMoney))
                .forEach(System.out::println);
    ```
```
#### Result
Display of your sorted list money: 
```
#44000.00 Black 
#54000.00 Black 
#64000.00 Black 
#74000.00 Black 
```

What if we want to find a wallet with money higher than '#30000'? We will use the find first intermediate method
```
    ```
 Predicate<Wallet> takeMoneyAndBlackCard=
                e -> (e.takeMoney() >= 30000 );
        System.out.printf("%n Display of your sorted list: %n");
        System.out.println( list.stream()
                .filter(takeMoneyAndBlackCard)
                .findFirst())
                .get();
    ```
```

 Result
 ```
`#34000.00 Red`
```


N/B if you are writing these codes make sure that every time you use a Predicate interface always use a different variable

Function<T,R>
```
    ```
        Function<Wallet, Double> byTakeMoney = Wallet::takeMoney;
        Function<Wallet, Card> byGetCard = Wallet::getCards;


        Comparator<Wallet> byMoneyThenByCard=Comparator.comparing(byTakeMoney).thenComparing(byGetCard);

        System.out.println("Display by money then by card");
        list.stream()
                .sorted(byMoneyThenByCard)
                .forEach(System.out::println);

    ```
```

#### Result
 Display of your sorted list: 
`#34000.00 Red `
#### Display by money then by card
```#4000.00 Blue 
#14000.00 Black 
#24000.00 Red 
#34000.00 Red 
#34000.00 Blue 
#44000.00 Black 
#44000.00 Green 
#44000.00 Green 
#54000.00 Black 
#64000.00 Black 
#74000.00 Black 

```

We will see how to reverse base on values in the collection using lambdas
```
    ```
System.out.println("Display by money then by card in reserve order)
        list.stream()
                .sorted(byMoneyThenByCard.reversed())
                .forEach(System.out::println);`

    ```
```
#### Result
#### Display by money then by card
```#74000.00 Black 
#64000.00 Black 
#54000.00 Black 
#44000.00 Green 
#44000.00 Green 
#44000.00 Black 
#34000.00 Blue 
#34000.00 Red 
#24000.00 Red 
#14000.00 Black 
#4000.00 Blue
 ```

### Grouping

Mapping Wallet to unique Color of a card on display
```
    ```
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
```
#### Result

Printing out distinctive amounts in the wallet collection
```
4000.0
14000.0
24000.0
34000.0
44000.0
54000.0
64000.0
74000.0
```
#Printing out distinctive cards in the wallet collection

```Red
Black
Green
Blue
```

Grouping Of Object based on the given instance methods and how they vary in categorizing, you will use lambda static methods collect, the collect argument
is a collector that specifies how to summarize the data in a meaningful manner.

The map takes in two arguments telling the JVM(java virtual machine) that
"I want to map a card object to a long object, the counting() static method of the collectors returns long(Long is an object or a type wrapper of long),
then we print the outcome by calling the variable in a chain method call to the forEach terminal method that displays the outcome.

```
    ```
   Map<Card, Long> walletCountByCard =
                list.stream()
                        .collect(Collectors.groupingBy(Wallet::getCards,Collectors.counting()));
                        walletCountByCard.forEach(
                 (getCards, count) -> System.out.printf(
                "%s has %d wallet(s)%n", getCards, count));

    }
    ```
```

#### Result
```Blue has 2 wallet(s)
Red has 2 wallet(s)
Green has 2 wallet(s)
Black has 5 wallet(s)
```
 
#### Calculation of the sum of all the amounts the all the wallet

```
    ```
System. out. print f(
                 "%nSum of Wallet' salaries (via sum method): %.2f%n",
                 list.stream()
                .mapToDouble(Wallet::takeMoney)
                .sum());
    ```
```

#### Result
```
Sum of Wallet' money (via sum method): 434000.00
Average of Wallet' money (via average method): 39454.55
```
#### Calculating for a specific color of cards
```
    ```
 Predicate<Wallet> takeMoneyAndBlackCard1=
                e -> (e.getCards().equals(Card.Black) );
        System.out.printf(
                "%nSum of Black Card wallet(via average method): %.2f%n",
                list.stream()
                        .filter(takeMoneyAndBlackCard1)
                        .mapToDouble(Wallet::takeMoney)
                        .sum());
    ```                    
```
#### Note that I used the Predicate interface and also embedded it inside the filter method

#### Result
``` 
Sum of Black Card wallet(via average method): 250000.00
```


### Conclusion
Here we analyzed how to iterate through a collection of objects, manipulate it with functional interfaces such as Functions<T, R> Predicate<T>, etc with other intermediate static methods from the Stream pipeline stream,
- sorted for arranging items,
- distinct for non-duplicate objects as it is even hard to remove duplicate values of the different object if you were to hard code it yourself,
- then we grouped using map functional interface which takes two arguments Card and Long which are objects and then we got the number of counts of different members of each group. I hope we have learned something new today.
#### Let's keep coding!

### Referrence
- [TimeComplexity](https://www.mygreatlearning.com/blog/why-is-time-complexity-essential/)
- Java How to Program, Early Objects (Deitel: How to Program) 11th Edition'
- [Java Documentation](https://docs.oracle.com/javase/8/docs/api/)


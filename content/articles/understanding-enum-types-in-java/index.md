---
layout: engineering-education
status: publish
published: true
url: /understanding-enum-types-in-java/
title: Understanding enum types in Java
description: This article explains the basic structure of an enum class and then takes it a step higher by exploring the relationship between enums and classes.
author: ehis-edemakhiota
date: 2021-11-12T00:00:00-03:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-enum-types-in-java/hero.jpg
    alt: Understanding enum types in Java Hero Image
---
Enum types are potent tools in Java. Enums can define a class of named constants and offer type safety and keys in a switch statement or expression.
<!--more-->
This article explains the basic structure of an enum class in Java and then takes it a step higher by exploring the relationship between enums and classes(enums implementing interfaces, enum having instance variables, methods, and constructors), exploring how to set custom enum properties. 

We will be demonstrating the application of enums in building a poker card game controller. This app determines the ranking category of a player's hand in a poker game.

### Goal
At the end of the tutorial, the reader should understand the following:
- The basic structure of an enum type.
- The relationship between enums and classes
- Defining custom properties for enum types and accessing ordinal values for enum constants.
- The applications of enums.

### Prerequisites
To fully understand this tutorial, you are required to have the following in place:
- A basic understanding of Java programming language.
- Java Development Kit (JDK) [installed](https://www.oracle.com/java/technologies/downloads/) on your computer.
- IntelliJ code editor [installed](https://www.jetbrains.com/idea/download/).

#### The basic structure of a Java Enum type
The declaration of a Java Enum starts with the keyword- **enum**, followed by the type name specified in `camelCase` (as is the naming convention for all Java classes). 

Following the type name is a pair of curly braces that form the enum class's context or scope. Within these curly braces are a set of unique identifiers which represent the enum constants. 

**Note: No two enum constants can use the same identifier.**

> It is also an excellent practice to capitalize enum constants, which aligns with the naming convention for Java constants and makes them stand out.

```java
enum Suit{
    HEARTS,
    DIAMONDS,
    CLUBS,
    SPADES,
}
```

At this point, it is essential to note that:
- Enum constants are implicitly static and final.
- An attempt to create an object of an enum class with the new keyword results in a compilation error.
- Since enum constants are static and final, an object of an enum class can be created by referencing the enum constant on the enum class name as in the following example: ```Suit suit = Suit.HEART```.

> Enum declarations can come within a class as follows:

```java
public class SuitTest {

    enum Suit {
        HEARTS,
        DIAMONDS,
        CLUBS,
        SPADES
    }
    public static void main(String[] args) {
    Suit suit = Suit.HEART;
    System.out.println(suit);
  }
}
```
This code gives the output - `HEART`.

> Enums can also be defined within the same Java file as follows:

```java
public class CardSuitTest{

    public static void main(String[] args) {
        CardSuit suit = CardSuit.HEART;
        System.out.println(suit);
    }
}

enum CardSuit{
    HEARTS,
    DIAMONDS,
    CLUBS,
    SPADES,
}
```

> Enums can also be defined in a separate Java file.

When enum classes are defined outside a class but within the same file, the JVM creates separate .class files (.class files are produced after the compiler as compiled written code) for the enum and the class. **An enum cannot bear the same name as a class within the same package**. Enums cannot be created within methods.

#### Using enum types in switch expressions

Enum types represent a set of unique constants, this means they can be used in a switch statement or the newer switch expression.
Consider the following example:

```java
public void printCardSuit(Suit suit){
    switch(suit){
        case HEARTS -> System.out.println("Its hearts!");
        case DIAMONDS -> System.out.println("Its diamonds!");
        case CLUBS -> System.out.println("Its clubs!");
        case SPADES -> System.out.println("Its spades!");
    }
}
```

We have called `printCardSuit(`) that takes in an enum of type Suit which we defined earlier in our tutorial. It then passes the value of that enum to an enclosed switch expression meaning that a call to the method as follows `printCardSuit(Suit.HEARTS)` will produce the output: Its hearts! and the call `printCardSuit(Suit.SPADES)` will produce the output: Its spades!

Enums types in Java extend from the class `java.lang.Enum` meaning that when we define an enum type, additional methods are added to our definition implicitly. One of these methods is the valueOf() which allows us to create an enum constant using the toString representation of the enum constant as follows:

`Suit cardSuit = Suit.valueOf(“HEARTS”)`

The `toString()` representation of a java object is a representation of the object as a string.

> An attempt to do the following:
```Suit cardSuit = Suit.valueOf(“Hearts”)``` results in a ```java.lang.IllegalArgumentException``` because there is no constant named _“Hearts”_ in the enum definition.

In switch expression, if more than one constant maps to the same action we can do a fall through as follows:

```java
 public void printSuit(Suit suit){
    switch(suit){
        case HEARTS, DIAMONDS -> System.out.println("Its hearts and diamonds!");
        case CLUBS -> System.out.println("Its clubs!");
        case SPADES -> System.out.println("Its spades!");
    }
}
```
#### Relationship between Enums and Classes
As earlier mentioned, enums are special classes. The JVM converts an enum definition into a class definition under the hood. Hence, the enum definition:

```java
enum Suit{
    HEARTS,
    DIAMONDS,
    CLUBS,
    SPADES,
}
```

is represented by the JVM as:

```java
class Suit{
    public static final Suit HEARTS = new Suit();
    public static final Suit DIAMONDS = new Suit();
    public static final Suit CLUBS = new  Suit();
    public static final Suit SPADES = new Suit();
}
```

Hence, every enum constant is a representation of an object of the enum class. Enums are closely related to classes in Java but not so related. 

One of the significant differences is that an enum cannot extend another class because an enum implicitly extends from the Java.lang.Enum, and since a method cannot inherit from more than the method in Java, the Enum class cannot inherit from another class. 

Extending from the Java.lang.Enum makes the following methods available implicitly in the enum class:

1. **The values() method**: This returns an array of all the constants defined in the enum class.
   For example:
   ```Suit.values()``` returns the following array:
   [HEARTS, DIAMONDS, CLUBS, SPADES]
   
2. **The ordinal() method**: Each enum constant can be identified by its position in the enum definition. This position corresponds to an array index. For example, in the Suit enum:
- HEARTS has an ordinal of 0
- DIAMOND has an ordinal of 1
- CLUBS has an ordinal of 2
- SPADES has an ordinal of 3

3. **The valueOf method**: As seen above, this method returns the `toString` representation of the specified constant if it exists in the enum definition.

Enum classes can also implement multiple interfaces like normal classes. Enum classes can also have constructors, instances variables and methods like normal Java classes.

```java
public enum Suit {
    HEARTS("Hearts"),
    DIAMONDS("Diamonds"),
    CLUBS("Clubs"),
    SPADES("Spades");

    private final String suitName;

    Suit(String suitName) {
        this.suitName = suitName;
    }

    public String getSuitName() {
        return suitName;
    }
}
```

As seen in the above example, the enum class Suit has a constructor that defines a string as a parameter it uses to initialize its instance variable, `suitName`. The enum also has an instance method `getSuitName()` that returns the appropriate `suitName` for the object.

#### Defining custom properties for enum types
As mentioned above, the `ordinal()` method returns the ordinal of an enum constant. We cannot set the ordinal method. The closest that we can do is to define a custom integer property for the enum class.

Consider our suit enum example above. Suppose we want each card suit constant to be represented by an integer property. Let us say one represents hearts, two represent diamonds, three represent clubs, and four represent spades. We can define a custom integer property that maps each integer to the appropriate card suit as follows:

```java
public enum CardSuit {
    HEARTS(1),
    DIAMONDS(2),
    CLUBS(3),
    SPADES(4);

    private int value;

    CardSuit(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
```

Hence, when we define an enum constant as follows: `Suit suit = Suit.HEARTS`

We can say `suit.getValue()` and this returns `1`.

Notice the structure of the enum definition. The constants are defined first, followed by the instance variable declaration, and then the constructor definition.

#### Building the poker card game controller.
This card dealing and shuffling app determines the hand ranking category of a player's hand in a poker game.

To solidify what we have learned so far, let us build a card dealing and shuffling application that determines the ranking of a player's hand in a poker game. This exercise was extracted from the [Java How to program, 10th Edition By Paul and Harvey Dietel](https://www.amazon.com/Java-Program-Early-Objects-10th/dp/0133807800).

To build our application, we need the following:
- A Card object - a card has a Face and belongs to a Suit. The card face and suit are represented as enums.
- A Player Class.
- A Deck of Cards - A deck is simulated as an aggregation of 52 cards.
- Simulations of a card shuffling algorithm (the Fisher-Yates Shuffling Algorithm) and card dealing.
- A game controller that determines:
  * a pair
  * two pairs
  * three of a kind (e.g., three jacks)
  * four of a kind (e.g., four aces)
  * a flush (i.e., all five cards of the same suit)
  * a straight (i.e., five cards of consecutive face values)
  * a full house (i.e., two cards of one face value and three cards of another face value)

Information about the different poker hands can be found [here]( https://en.wikipedia.org/wiki/List_of_poker_hands.):

Here is the class diagram: 

![Game Controller Class Diagram](/engineering-education/understanding-enum-types-in-java/class_diagram.jpg)

First, let us define the Player Class. A player has a name and a `playerHand`, which is an array of 5 Cards.

```java
public class Player {
    private final String playerName;
    private Card[] playerHand;

    public Player(String playerName) {
        this.playerName = playerName;
    }

    public Card[] getPlayerHand(){
        return playerHand;
    }
    public String getPlayerName() {
        return playerName;
    }
}
```

Next, let us define the Suit and Face enums:

```java
public enum Suit {
    HEARTS,
    DIAMONDS,
    CLUBS,
    SPADES
}
```

```java
public enum Face {
    ACE(1),
    DEUCE(2),
    THREE(3),
    FOUR(4),
    FIVE(5),
    SIX(6),
    SEVEN(7),
    EIGHT(8),
    NINE(9),
    TEN(10),
    JACK(11),
    QUEEN(12),
    KING(13);

    public int getFaceValue() {
            return this.faceValue;
    }

    private final int faceValue;

    Face(int faceValue){
            this.faceValue = faceValue;
    }
}
```

As defined above, each card face has an integer `faceValue` which we define as a custom property. The card face ACE has a `faceValue` of 1. DEUCE has a `faceValue` of 2 and many more.

We define the Card class as follows:

```java
public class Card {
    private final Face face;
    private final Suit suit;

    public Card(Face face, Suit suit){
            this.face = face;
            this.suit = suit;
    }

    public Face getFace(){
            return face;
    }

    public Suit getSuit(){
            return suit;
    }
}
```

We see here that a Card has a Face and belongs to a Suit. We have also defined generic methods for getting the card face and suit. The next thing to do is to define the DeckOfCards class. A `DeckOfCards` is an aggregation of 52 Cards

```java
public class DeckOfCards {

    private Suit[] suits = Suit.values();
    private Face[] faces = Face.values();
    private Card[] deckOfCards = new Card[52];

    public DeckOfCards(){
            int counter = 0;
            for (Suit suit : suits) {
                    for (Face face: faces) {
                        deckOfCards[counter] = new Card(face,suit);counter++;
                    }
            }
    }
}
```
We see the `values()` methods in action. This method returns an array of enum constants. Our constructor contains nested for loops that populate an array of Cards defined earlier.

Next, we define the shuffle method according to the **Fisher-Yates shuffling algorithm**. The following is the description of the Fisher-Yates algorithm:
1. Write down the numbers from 1 through N.
2. Pick a random number k between one and the number of unstruck numbers remaining (inclusive).
3. Counting from the low end, strike out the kth number not yet struck out, and write it down at the end of a separate list.
4. Repeat from step 2 until all the numbers have been struck out.
5. The sequence of numbers written down in step 3 is now a random permutation of the original numbers.

More details about the Fisher-Yates algorithm can be found [here](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

```java
public void shuffle(){
    Card[] copyOfDeck = new Card[deckOfCards.length];
    SecureRandom random = new SecureRandom();
    int randomIndex;
    for (int i = deckOfCards.length-1; i >=0 ; i--) {
        if (i == 0){
            randomIndex = 0;
        }
        else{
            randomIndex = random.nextInt(i);
        }
        copyOfDeck[deckOfCards.length - 1 - i] = deckOfCards[randomIndex];
        deckOfCards[randomIndex] = deckOfCards[i];
    }
    deckOfCards = copyOfDeck;
}
```

Next, we define the deal method. The `deal()` method takes an array of Players and the number of cards to deal as parameters.

In the deal method, we first shuffle the deck of cards with the shuffle method defined earlier. For each player, we assign the number of cards passed in as a parameter to the deal method.

```java
public void deal(Player[] players, int numberOfCardsToDeal){
    shuffle();
    for (Player player: players) {
        for (int j = 0; j < numberOfCardsToDeal; j++) {
            player.getPlayerHand()[j] = deckOfCards[j];
        }
    }
}
```

Our `DeckOfCards` class finally culminates to:

```java
public class DeckOfCards {

    private Suit[] suits = Suit.values();
    private Face[] faces = Face.values();
    private Card[] deckOfCards = new Card[52];

    public DeckOfCards(){
        int counter = 0;
        for (Suit suit : suits) {
            for (Face face: faces) {
                deckOfCards[counter] = new Card(face,suit);
                counter++;
            }
        }
    }

    public void shuffle(){
        Card[] copyOfDeck = new Card[deckOfCards.length];
        SecureRandom random = new SecureRandom();
        int randomIndex;
        for (int i = deckOfCards.length-1; i >=0 ; i--) {
            if (i == 0){
                randomIndex = 0;
}
            else{
                randomIndex = random.nextInt(i);
            }copyOfDeck[deckOfCards.length - 1 - i] = deckOfCards[randomIndex];deckOfCards[randomIndex] = deckOfCards[i];
        }
        deckOfCards = copyOfDeck;
}

public void deal(Player[] players, int numberOfCardsToDeal){
        shuffle();
        for (Player player: players) {
            for (int j = 0; j < numberOfCardsToDeal; j++) {
                player.getPlayerHand()[j] = deckOfCards[j];
            }
        }
    }
}
```

Finally, let us define the **GameController**. The GameController class contains methods that determine the rank of a player's hand. To do this, we would use the Java Streams and Lambda functions. 

Java 8 introduced the concept of streams and lambdas. Streams pass elements through a sequence of processing steps. These processing steps could be intermediate operations such as `map`, `filter`, `distinct`, `limit`, and `sorted`, or terminal operations like `forEach`, `collect`, `min`, `max`, `findFirst`, and `reduce`.

These Stream operations take functional interfaces commonly known as lambdas as parameters.

Let us now define the methods that determine the rank of a player's hands:

##### containsAPair() 
This is a hand containing two cards with the same Rank(Face) and three cards of three other ranks. To determine if a player's hand contains a pair of cards of the same rank and three other cards of other ranks, we do the following:
- First, we generate a stream of cards using the `Arrays.stream()` method.
- Next, we pass the generated stream through the map operation. The map operation generates a new stream in which each card in the original stream is mapped to its face by calling the `getFace()` method on the card.
- Finally, we terminate the stream operation by collecting the stream into a set using the `collect(Collectors.toSet()` methods. We collect a set so that we can eliminate duplicates. Thus, if there are two cards with the same `faceValue`, we should have only four elements in our set instead of 5. We check if the set contains only four elements, returning the boolean result to the caller.

```java
public static boolean containsAPair(Card[] playerHand){
Set<Face> cardFaces = Arrays.stream(playerHand).map(Card::getFace).collect(collectors.toSet());
return cardFaces.size() == 4;
```

The ```Card::getFace ``` called a method reference it is the short form of the lambda expression: ```card -> card.getFace()```

##### containsTwoPairs(): 
To determine if a player’s hand contains two pairs (two cards with the same face value and one card with a different face). To do this, we:
- First, create a stream of Cards.
- Then pass the stream through `collect()` terminal operation which collects the cards into a map grouping them by their face using the: `collect(Collectors.groupingBy(Card::getFace))` .
- Next, we check the number of groups on the map to see if the number of groups with only two cards equals 2.

```java
public static boolean containsTwoPairs(Card[] playerHand) {
   Map<Face, List<Card>> cardFaceListMap =
           Arrays.stream(playerHand).collect(Collectors.groupingBy(Card::getFace));
   final int[] countOfDuplicates = {0};
   cardFaceListMap.forEach((face, cardList) -> {
       if (cardFaceListMap.get(face).size() == 2){
           countOfDuplicates[0]++;
       }
   });
   return countOfDuplicates[0] == 2;
}
```

##### containsThreeOfAKind(): 
To determine if a player's hand contains three of a kind (three cards with the same face value and two other cards with different face values). To do this:
- First, we create a stream of cards.
- Next, we collect the resulting stream into a set.
- Finally, we check the size of the resulting set. If it is equal to 3, then the player's hand contains three of a kind.

```java
public static boolean containsThreeOfAKind(Card[] playerHand) {
   Set<Face> cardSet = Arrays.stream(playerHand).map(Card::getFace).collect(Collectors.toSet());
   return cardSet.size() == 3;
}
```

##### containsFourOfAKind(): 
To determine if a player’s hand contains three of a kind (four cards with the same face value and one card with a different face value). To do this,
- First, we generate a stream of cards as in the earlier defined methods.
- Next, we collect the generated stream into a set.
- Finally, we check if the size of the set is equal to 2.

```java
public static boolean containsFourOfAKind(Card[] playerHand) {
  Set<Face> cardFaces = Arrays.stream(playerHand).map(Card::getFace).collect(Collectors.toSet());
  return cardFaces.size() == 2;
}
```

##### containsAFlush():
To determine if a player’s hand contains a flush (all five cards in the player’s hand are all the same suit). To do this:
- First, we generate a stream of cards.
- Next, we collect the generated stream into a set.
- Finally, we check if the size of the set is equal to 1.

```java
public static boolean isAFlush(Card[] playerHand) {
  Set<Suit> cardSuits = Arrays.stream(playerHand)
          .map(Card::getSuit).collect(Collectors.toSet());
  return cardSuits.size() == 1;
}
```

##### isAStraight(): 
To determine if a player’s hand is straight (contains five cards of sequential rank, not the same suit). To do this:
- First, we generate a stream of cards.
- Next, we map each card to its `faceValue` - an integer using the `map` operation.
- We then pass the stream resulting from the `map` operation into the distinct operation (another intermediate stream operation). The distinct operation removes any duplicates from the stream.
- Next, we sort the resulting stream from the distinct operation by passing it through the `sorted` intermediate operation, which sorts the `faceValues` in the stream according to natural order ( in ascending order).
- We finally terminate the stream pipeline using the `collect` operation, which collects the stream elements into a list using `collect(Collectors.toList())`.
- To check the player's hand, we subtract the smallest card faceValue in the player's hand with the largest. If the difference is four and the number of different cards in the player's hand is five, then the player's hand is straight.
  
```java
public static boolean isAStraight(Card[] playerHand) {
  List<Integer> faceValues=
  Arrays.stream(playerHand).map(card -> card.getFace().getFaceValue()).distinct()
  .sorted(Comparator.naturalOrder()).collect(Collectors.toList());
  return (faceValues.get(faceValues.size() - 1) - faceValues.get(0) == 4)&&(faceValues.size()==5);
  }
```

##### isAFullHouse():
To determine if a player’s hand is a full house (contains three kinds of a particular rank and then two cards of another rank). To determine this:
- First, we create a stream of cards.
- Next, we map each card to its card face by passing the stream through the map operation.
- We collect the resulting stream into a set by passing the stream through the collect operation.
- Finally, we check if the resulting set has a size that is equal to 2.

```java
public static boolean isAFullHouse(Card[] playerHand) {
  Set<Face> cardSet = Arrays.stream(playerHand).map(Card::getFace).collect(Collectors.toSet());
  return cardSet.size() == 2;
  }
```

### Conclusion
We have successfully learned about Enum types in Java and applied our knowledge to implement a card poker game controller that determines the ranking of a player's hand.

In the process, we have also learned how to implement the Fisher-Yates Shuffling algorithm, using Lambdas and Streams in Java and relevant stream operations that enable us to carry out complex operations by declarative programming and without a hustle.

You can clone the project [from this repository](https://github.com/ehizman/cardPokerGameController.git).

Happy Coding!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)


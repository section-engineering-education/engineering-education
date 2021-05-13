---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-operator-overloading-in-c++/
title: Getting Started with Operator Overloading in C++
description:
author: dawe-daniel
date: 2020-12-04T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-operator-overloading-in-c++/hero.jpg
    alt: example image
---
Operator overloading is the process of making an operator exhibit different behaviors in different instances. By overloading operators in a specific class, you can change the users view of that class. This helps developers have a problem driven approach towards programming.
<!--more-->
### Introduction
In this article, we will go through the basics of operator overloading and dive into how to use it in C++.

#### Prerequisites
To follow through this article, you'll need:
- Basic understanding of C++ language.
- Basic understanding of Operators.
- [Codeblocks](http://www.codeblocks.org/downloads) IDE to run the code.

#### Rules of operator overloading
1. We can overload an operator as its type only i.e., a unary operator cannot be overloaded as a binary operator and vice versa.
2. We can't overload operators that are not a part of C++.
3. We can perform operator overloading only in user-defined classes.
4. We cannot change the operator's existing functionality.
5. We can't change the associativity and precedence of the operators.
6. When unary operators are overloaded through a member function, they do not take any explicit arguments. But when overloaded by a friend function, they take one argument.
7. When binary operators are overloaded through a member function they take one explicit argument. If overloaded through a friend function they instead take two explicit arguments.
8. We do not use friend functions to overload some specific operators. However, member functions can be used to overload them.

Some of the operators that cannot be overloaded are:
- `::` - scope resolution operator.
- `?:` - ternary or conditional operator.
- `.*` - pointer to member operator.
- `.` - class membership operator.

#### Some common examples of operator overloading
Here are a few of the many examples of operator overloading:
- *`oneString` + `anotherString`* might concatenate the two string objects.
- *`date++`* might increment a Date object.
- *`x*y`* might multiply two numbers.
- *`x[i]`* might access an element in an array.

#### How to perform operator overloading
Operator overloading functions are similar to normal functions with a slight difference in the syntax. The syntax for operator overloading in C++ is as shown below:

```c++
return_type class_name  : : operator symbol(args)  
{  
// function body
}   
```

What we have above is the `operator` function and we can breakdown the syntax as follows:

- `return_type` is the return type of the function.
- `operator` is a keyword to denote this as an operator function.
- `symbol` is the operator we want to overload e.g. `+, <, -, ++` etc.
- `args` are the arguments passed into the function.

Operator overloading makes it easy to develop new definitions for most of the operators in C++. Through the use of operator overloading, we can change the way operators work for user-defined types like objects.

 For instance, let's say we have created objects `a1`, `a2` and `result` from our class.

 Instead of having our code as:

 ```c++
 result = a1.addNumbers(a2);
 ```

We could have it as:

```c++
result = a1+a2;
```

Since operator overloading allows us to change how operators work, we can redefine how the `+` operator works and use it to add `a1` and `a2`. This makes our code intuitive and easier to understand.

#### Ways of operator overloading
1. Operator overloading of member functions.
2. Operator overloading of non-member or friend functions.

##### Operator overloading of member function
Member functions are operators and functions declared as members of a certain class. They don't include operators and functions declared with the friend keyword.

If you write an operator function as a member function, it gains access to all of the member variables and functions of that class.

When overloading an operator using a member function:
- The overloaded operator must be added as a member function of the left operand.
- The left operand becomes the implicit `*this` object
- All other operands become function parameters.

Example of operator overloading using the member function:

```C++
#include <iostream>

class Coins
{
private:
    int a_coins;

public:
    Coins(int coins) { a_coins = coins; }

    // Overload Coins + int
    Coins operator+(int value);

    int getCoins() const { return a_coins; }
};

// note: this function is a member function!
// the coins parameter in the friend version is now the implicit *this parameter
Coins Coins::operator+(int value)
{
    return Coins(a_coins + value);
}

int main()
{
	Coins coins1(6);
	Coins coins2 = coins1 + 3;
	std::cout << "We have " << coins2.getCoins() << " coins.\n";

	return 0;
}
```

The output of our program will be:

```bash
We have 9 coins.
```

The expression `coins1 + 2` becomes function call `coins1.operator+(2)`. Now there is only one explicit function parameter and `coins1` becomes an object prefix. The operator overloaded member function gets invoked on the first operand.

#### Operator overloading of non-member function or friend function
A non-member function does not have access to the private data of that class.

This means that an operator overloading function must be made a friend function if it requires access to the private members of the class.

Example of operator overloading using friend function:

```C++
#include <iostream>

class Coins
{
private:
	int a_coins;

public:
	Coins(int coins) { a_coins = coins; }

	// add Coins + Coins using a friend function
	friend Coins operator+(const Coins &c1, const Coins &c2);

	int getCoins() const { return a_coins; }
};

// note: this function is not a member function!
Coins operator+(const Coins &c1, const Coins &c2)
{
	// use the Coins constructor and operator+(int, int)
	// we can access a_coins directly because this is a friend function
	return Coins(c1.a_coins + c2.a_coins);
}

int main()
{
	Coins coins1{ 5 };
	Coins coins2{ 4 };
	Coins coinsSum{ coins1 + coins2 };
	std::cout << "We have " << coinsSum.getCoins() << " coins.\n";

	return 0;
}
```

The output of our program will be:

```bash
We have 9 coins
```

Because our overloaded `operator+()` function is a friend function, we have access the `a_coins` member of our parameters directly.

We can also use the built-in function of the plus operator to do the addition since `a_coins` is an integer.

***NOTE: Explicitly calling an operator functions is allowed and can be done in certain situations.***

### Conclusion
In this article, we got to explore what operator overloading is, where to use it and its significance. We also learnt that through the use of **operator overloading** we have a clean and maintainable code.

Go ahead and try out the operator overloading examples above on  [repl.it](https://repl.it/@Dawe7/operator-overloading-using-member-functions).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

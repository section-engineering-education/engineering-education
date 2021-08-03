---
layout: engineering-education
status: publish
published: true
url: /python-projects-for-beginners
title: Python Projects for Beginners
description: This article provides a guide on building simple Python projects and working with basic concepts in Python. 
author: anita-achu
date: 2021-02-13T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/python-projects-for-beginners/hero.jpg
    alt: python example image
---
When learning any programming language, the first step is learning the basic concepts of the language. While this is important, theoretical learning without working on real projects is not sufficient. The best way to have a good understanding of the language's basic concepts is by creating real-world projects with the learned concepts.
<!--more-->
This will help the programmer understand the language give a real insight into how the different tools are used and how they work. Working on projects makes learning a lot easier and helps you build your confidence, also choosing what to build is important. It is best to work with a project that involves using the concepts of the programming language.

Like any programming language, the best practice for learning Python is building simple projects, which we will be doing in this tutorial.

Remember that Python is a beginner-friendly language.

### Introduction
Python is a high-level, general-purpose programming language. Python is popularly known for its simple and straightforward syntax, which makes it easy to learn.

At this point, I believe you've learned the basic concept of Python theoretically? *Great*! Now we will be testing these new skills you have learned by building a simple project to aid your understanding of Python, and by this, you'll see how the concepts are implemented. 

It can be a bit difficult as a beginner to decide what project to build. This tutorial will build two simple Python games (a rock-paper-scissor game and a guessing game). 

These projects involve a good number of Python basic concepts and tools. Quite sure that you have played either one or both of these games at one point or the other. 

Now let's build 🙂

### Goal
- Understanding how fundamental concepts of Python work.
- Building a *rock, paper and scissors* game.
- Building a *guessing game*.

### Prerequisite
Basic knowledge of Python concepts.

Before we begin, let's install Python on your computer, open up your browser and go to python.org, click on downloads. At the time of this tutorial, the latest version of Python is ***version 3.9.1.***. When the downloading is complete, open up your file explorer on your machine and install Python on your local device.

#### Rock-paper-scissor game
If this is your first Python project, there are several editors you may use, [Visual Studio Code](https://code.visualstudio.com/download), [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows), [Sublime Text](https://www.sublimetext.com/3), etc. 

For this tutorial, I will be using Visual Studio Code as my code editor.

Before we begin, if you don't know how the game works, [read the rules here](https://en.wikipedia.org/wiki/Rock_paper_scissors).

Let's begin with your code text editor. Create a Python file. A Python file is created by adding '.py' at the end of your file name.

In your [game.py](http://game.py) file, import the random method and add the following:

```python
import random

player_name= input("Enter your name: ")
print(f"Welcome {player_name} to the rock, paper and scissor game\n")
choice = ["rock", "paper", "scissors"]
```

Your terminal should display,

![Input field](/engineering-education/python-projects-for-beginners/Input.PNG)

**Random** is a built-in module that generates random values within a particular specified range.

To get the details from a user, we use the Python **input** function.

Next, define a functioning game and set out the rules of the game.

```python
def game():
 computer = random.choice(choice)
 print("Rules of the game: \nrock vs scissors = scissor wins. \npaper vs scissors = scissors wins. \nrock vs paper = paper wins. \npaper vs rock = rock wins")
 player = input("Your choice: ").lower()
 print("Computer chose: " , computer)

 if player == computer:
    print("It is a draw, no winner!")
 elif player == "rock" and computer == "paper":
    print("Computer Wins!")
 elif player == "rock" and computer == "scissors":
    print("Computer wins!")
 elif player == "scissors" and computer == "paper":
    print("Computer wins!")
 elif player == "scissors" and computer == " rock":
    print("You win!")
 elif player == "paper" and computer == "rock":
    print("You win!")
 elif player == "paper" and computer == "scissors":
    print("You win!")
 else:
    print("Choose either paper, rock or scissor")

game()
```

You can run your code [here](https://repl.it/@Anitaachu/pythontest#main.py), and your terminal should display.

![Rock-paper-scissor](/engineering-education/python-projects-for-beginners/RPS.png)

Notice, we use the *if-else* method in Python. They are very important in programming. With these methods, we can build programs that make decisions based on certain conditions. 

These are conditional statements. The ***if*** statement implies that if this is true or if it happens, then this should happen. While the ***elif*** and ***else*** statement simply implies that if the previous conditions don't happen or if it is not true, then this should happen.

Notice, in this simple game, we have used a few methods in Python, such as *random, function, input, conditional statements.* I hope you properly understand how these concepts work in Python.

#### Guessing game
Now let's move to something a bit more complex, building a *guessing game* with different levels where users will be able to choose the desired level and given limited chances to guess.

To begin, create a Python file and add:

```python
import random

user = input("Enter name: ")
print(f"Welcome {user} to Guessing game101, have fun!")

keep_playing = True
while keep_playing:
      print("There are diferent levels: easy, medium and hard")
      print("For easy, you have 6 chances to guess a number between 1-10")
      print("For meduim, you have 4 chances to guess a number between 1-20")
      print("For hard, you have 4 chances to guess a number between 1-50")
      break
game_level = input("Select desired level: ").lower()
```

Run your code [here](https://repl.it/@Anitaachu/pythontest#main.py).

When you run this, the result in your terminal will be:

![Input field](/engineering-education/python-projects-for-beginners/Input2.JPG)

***While loop*** is used to run a set of commands multiple times as long as the condition is true, i.e., for a while loop to be executed, the condition must be set to *'True'*. The while loop also runs continuously. Therefore we use the ***break*** statement to stop the loop from running.

The user can choose a different desired level. With the ***lower()*** method, the user input will automatically return a lower case string so the program can run without error.

Next, creating the different stages with conditional statements.

```python
if game_level == "easy":
  secret_number = random.randint(1,10)
  guess_count = 0
  guess_limit = 6
  while guess_count < guess_limit:
        guess = int(input("Guess:  "))
        guess_limit -= 1
        if guess == secret_number:
            print("You got it right!")
            break
        else:
          print("That was wrong")
          print(f"You have {guess_limit} guesses left")

  else:
      print("Game Over!")

elif game_level == "medium":
    secret_number = random.randint(1,20)
    guess_count = 0
    guess_limit = 4
    while guess_count < guess_limit:
       guess = int(input("Guess:  "))
       guess_count += 0
       guess_limit -= 1
       if guess == secret_number:
          print("You got it right!")
          break
       else:
          print("That was wrong")
          print(f"You have {guess_limit} guesses left")
    else:
      print("Game Over!")

elif game_level == "hard":
    secret_number = random.randint(1,50)
    guess_count = 0
    guess_limit = 4
    while guess_count < guess_limit:
        guess = int(input("Guess:  "))
        guess_limit -= 1
        if guess == secret_number:
            print("You got it right!")
            break
        else:
          print("That was wrong")
          print(f"You have {guess_limit} guesses left")
    else:
      print("Game Over!")

else:
    print("Invalid, try easy, medium or hard")
```

You can run the code [here](https://repl.it/@Anitaachu/pythontest#main.py).

Let's see this in our terminal.

![guessing game](/engineering-education/python-projects-for-beginners/guessinggame.png)

The ***randint*** method returns an integer from a random range. Notice the indentations? In Python, indentation is very important, and improper indentation will cause an error, otherwise the codes may not run as intended.

Pretty easy, right? 

### Conclusion
Python syntax is quite easy to get started with. I hope you understand these concepts better now and how they work. In further tutorials, we'll work on a more complex project and use more Python methods and tools.  

Keep coding and building! 

Goodluck 🙂

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


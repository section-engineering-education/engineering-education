As a programmer, many programs that you'll write will solve an end user's problem. You will always want to get some data from the user. This article will teach us how to accept user input and how to use while loops. While loops enable your programs to remain executing when certain conditions remain true.

### Prerequisites
1. Python installed on your computer.
2. Basic Python knowledge.

### How the input() function works
The `input()` function halts the execution of a program and waits for the user to key in some data. When Python receives the user's input, store it in the variable that you choose to work with.

For example, let's create a program that accepts a user's name and prints back the name.

```python
name = input("Please enter your name: ")
print(name)
#output
#Please enter your name: John
#John
```

The `input()` function takes in one argument, that is, the instruction you want the user to see. In this example, Python executes the first line and requests the user to enter his name. The program will halt and wait for the user to enter his name and continue after he presses **ENTER**. The name of the user is then loaded in the variable `name`, then `print(name)` displays the user's name back.

### Using int() to accept numerical input
Any text the user input using the `input()` function Python interprets it as a string. If your work is to print the input, the `input()` function works very well. But if you use the input as a number, an error arises. Consider the example below:

```python
amount = input("Please enter your amount? ")
rate=0.056
interest= amount*rate
print("Your interest is : ")
print(interest)
```

This example gives an error because Python interprets the input `amount` as a string. Python can't multiply a string and a float ie rate.

To solve this problem we use the `int()` function which informs Python to use the input as a numeric value. The `int()` function converts the string form of a number to numerical form, shown below:

```python
amount = input("Please enter your amount? ")
amount=int(amount)
rate=0.056
interest= amount*rate
print("Your interest is : ")
print( interest)
```

Output:
```
Please enter your amount? 9000
Your interest is : 
504.0
```

When we input 9000 in this example,, Python interprets it as a string. The amount is then converted to an integer using the `int()` function. Now Python calculates the value of the interest.

### Introducing while loops
In python, a `while` loop executes provided certain condition remains true.

Syntax:
```python
while expression:
 statement(s)
```

The following `while` loop counts from 10 to 15:

```python
count = 10
while (count <=15):
 print ('The count is:', count)
 count = count + 1 #add 1 to count
#output
#The count is: 10
#The count is: 11
#The count is: 12
#The count is: 13
#The count is: 14
#The count is: 15
```

The `while` loop continues to execute if the value of `count` is equal to or less than 15.

### Using else statement with while loop
When you use the `else` statement in a while loop, it will only execute when the condition becomes false.

The example below involves both the `else` statement and the `while` statement.

```python
count = 10
while (count <=15):
 print ('The count is:', count)
 count = count + 1
else:
 print(count, " is not less than 5")
```

The above program prints a number less or equal to 15, otherwise the `else` block executes.

Results:
```
The count is: 11
The count is: 12
The count is: 13
The count is: 14
The count is: 15
16 is not less than 15
```

### Using break to exit a loop
Use the `break` statement to exit a `while` loop without executing any remaining code in the loop. With the `break` statement you can control which lines of your program will execute or not.

Syntax:
```python
while expression:
 #code for while loop
 if_expression:
 break
 #code for while loop
# code outside of while loop
```

Example:
```python
i = 1
while i < 11:
 if i == 6:
 break
 print(i)
 i = i + 1
print('Bye')
#output
#1
#2
#3
#4
#5
#Bye
```

### Removing all instances of specific values from a list using a while loop
The `remove()` method only removes a single value from a list. We remove all occasions of a value from a list using the `while` loop.

Say we have a list of employees and the name `John` appears more than once. We can remove all instances of the name `John` using the `while` loop. The `while` loop executes until `John` is no longer in the list as illustrated below:

```python
employees = ['Mary', 'John', 'Paul', 'John', 'Yusuf', 'John'] #list containing many instances of 'John'
print(employees) # ['Mary', 'John', 'Paul', 'John', 'Yusuf', 'John']
while 'John' in employees:
 employees.remove('John')
print(employees) #['Mary', 'Paul', 'Yusuf']
```

### Filling a dictionary with user input using a while loop
We use the `while` loop to prompt the users to enter as much input as we need. Let's create a program that accepts the username and the name of the mountain that each user likes to climb. Since we want to connect each response with a particular user, we will store data ie user input in a dictionary.

```python
responses = {} # define an empty dictionary
# Set a flag to show that polling is active.
polling_active = True
while polling_active:
# Prompt for the person's name and response.
 name = input("\nEnter your name? ")
 response = input("Enter the name of the mountain you would like to climb? ")
 responses[name] = response # Store the response in the dictionary:
 # Find out if anyone else is going to take the poll.
 repeat = input("Please refer another person? (yes/ no) ")
 if repeat == 'no':
 polling_active = False
print("\n....Poll Results...")
for name, response in responses.items():
 print(name + " wishes to climb " + response + ".") # print results of the poll
```

When you execute this program and enter some responses, the output should look like this:

```
Enter your name? Peter
Enter the name of the mountain you would like to climb? Everest
Please refer another person? (yes/ no) yes
Enter your name? John
Enter the name of the mountain you would like to climb? Turin
Please refer another person? (yes/ no) no
....Poll Results...
Peter wishes to climb Everest.
John wishes to climb Turin.
```

### Conclusion
In this article we have gone through:

- How the `input()` function works
- Using `int()` to accept numerical input
- Introduction to `while` loops
- Using the `while` loop with the `else` statement
- Exiting the `while` loop using break
- Removing all instances of specific values from a list using a `while` loop
- Filling a dictionary with user input using a `while` loop

Happy coding!

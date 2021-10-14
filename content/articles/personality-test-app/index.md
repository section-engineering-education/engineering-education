### Building a Personality Test App with Python
### Introduction
In this article, we will take a cursory look into how we can effectively use python list and functions to design a console app that makes use of python data structure in a more clearer and understandable manner. We are going to design a personality test app that makes use of test questions from [Myers Briggs website](https://pdfcoffee.com/the-myers-test-pdf-free.html).

### How the Myers Briggs Personality Test Works
There are several indices for testing people's identities, but we focus our test on  questions from Myers Briggs parameters which are;
- Introvert or Extrovert
- Sensing or Intuitive
- Judging or Perceiving
- Thinking or Feeling
At the end of each of the four sections, we pick the highest value from each of the sections above to compute a personality identity type. The identity types are divided into 16. You can learn more about the types here. 

### Prerequisite
- Python 3.0 and above
- A text editor
- [Personality test questions from Myers Briggs](https://pdfcoffee.com/the-myers-test-pdf-free.html) 

### Building the App
#### Create a Python file
The First Step towards building the test app is to create a python file. I will call mine personality.py

#### Import the python module sys
In this module, we would use the exit() function to terminate the first interactive option we want to give our users. 

```python
import sys
```
#### A function that displays the personality identity.
We will use the function declared here to display our user's personality identity after the test.

```python
def display_personality_type(personality_identity):
   print(f"Your personality type is -> {personality_identity}")
```
#### A function that computes the personality test
This function will implement all our logic. So we have to store our test questions into a list.

```python
def test():
    questions: list = [
       """
Question 1:
a.expend energy, enjoy groups or
b.conserve energy, enjoy one-on-one
""",
       """
Question 2:
a.more outgoing, think out loud or
b.more reserved, think to yourself
""",
       """
Question 3:
a.seek many tasks, public activities, interaction with others
b.seek private, solitary activities with quiet to concentrate
""",
       """
Question 4:
a.external, communicative, express yourself or
b.internal, reticent, keep to yourself
""",
       """
Question 5:
a.active, initiate or
b.reflective, deliberate
""",
       """
Question 6:
a.interpret literally or
b.look for meaning and possibilities
""",
       """
Question 7:
a.practical, realistic, experiential or
b.imaginative, innovative, theoretical
""",
       """
Question 8:
a.standard, usual, conventional or
b.different, novel, unique
""",
       """
Question 9:
a.focus on here-and-now or
b.look to the future, global perspective, “big picture”
""",
       """
Question 10:
a.facts, things, “what is” or
b.ideas, dreams, “what could be,” philosophical
""",
       """
Question 11:
a.logical, thinking, questioning or
b.empathetic, feeling, accommodating
""",
       """
Question 12:
a. candid, straight forward, frank or
b. tactful, kind, encouraging
""",
       """
Question 13:
a.firm, tend to criticize, hold the line or
b.gentle, tend to appreciate, conciliate
""",
       """
Question 14:
a.tough-minded, just or
b.tender-hearted, merciful
""",
       """
Question 15:
a.matter of fact, issue-oriented or
b.sensitive, people-oriented, compassionate
""",
       """
Question 16:
a. organized, orderly or
b. flexible, adaptable
""",
       """
Question 17:
a. plan, schedule or
b. unplanned, spontaneous
""",
       """
Question 18:
a.regulated, structured or
b.easygoing, “live” and “let live”
""",
       """
Question 19:
a.preparation, plan ahead or
b.go with the flow, adapt as you go
""",
       """
Question 20:
a.control, govern or
b.latitude, freedom
"""]
```

#### Keep track of the user's input.
Within the same function, we set variables to keep track of user’s options, which helps us compute the personality identities as they enter them. The variables are meant to count the occurrence of  A’s and B’s and then use that to compute the identity accordingly.

```python
  count_of_a: int = 0
   count_of_b: int = 0
   personality_dichotomy: str = ''
   count = 0
```

#### Set counters to zero if not letter A or B
This code snippet below is meant to keep the counters unchanged when wrong input is entered. 

```python
    for question in questions:
       answer = ''
       while not (answer == 'A' or answer == 'B'):
           count_of_a = 0
           count_of_b = 0
```

#### Exception handling
This code snippet in the function handles the problem of incorrect input from the user. We only want the user to enter A or B. If our expected letter is entered, we count its occurrence.

```python
           try:
                answer = input(question).upper()
               if not (answer == 'A' or answer == 'B'):
                   raise ValueError("Invalid input")
           except ValueError as error:
               print(error)
           else:
               if answer == 'A':
                   count_of_a = count_of_a + 1
               if answer == 'B':
                   count_of_b = count_of_b + 1
               count = count + 1
```

#### Compute the identities with if statement
We use our variable counters and if statements to compute the personality identity.
The sectioning of the questions is in four parts and five questions each, making a total of 20 questions. We compute the dominant personality identity at every section of the test.  

```python
                   if count == 5:
                       if count_of_a > count_of_b:
                           personality_dichotomy = personality_dichotomy + 'E '
                       else:
                           personality_dichotomy = personality_dichotomy + 'I '
                   else:
                       if count == 10:
                           if count_of_a > count_of_b:
                               personality_dichotomy = personality_dichotomy + 'S '
                           else:
                               personality_dichotomy = personality_dichotomy + 'N '
                   else:
                           if count == 15:
                               if count_of_a > count_of_b:
                                   personality_dichotomy = personality_dichotomy + 'T '
                               else:
                                   personality_dichotomy = personality_dichotomy + 'F '
                   else:
                       if count == 20:
                               if count_of_a > count_of_b:
                                   personality_dichotomy = personality_dichotomy + 'J '
                               else:
                                   personality_dichotomy = personality_dichotomy + 'P '
 ```

#### Call the display function. 

 ```python 
        display_personality_type (personality_dichotomy)        
```

#### Function for Exiting the Application
This is a separate function that checks the decision of the user.
The sys module here enables us to exit from the terminal if the user decides not to take the test.

```python
def exit_application():
   print("Exiting application...")
   sys.exit(0)
```
#### Homepage function
This function is designed to mimic a landing page on the web. We only accept two options (1 or 2). We also check for wrong inputs using python exception handling.

```python
def main():
   user_input = input("""
   Welcome to the Meyers Briggs Personality Test
   Press 1  to take test
   Press 2 to exit application -> """)
   try:
       if not (user_input == "1" or user_input == "2"):
           raise ValueError("Invalid input")
   except ValueError as error:
       print(error)
   else:
       switcher = {
           "1": run,
           "2": exit_application
       }
       return switcher.get(user_input)()
```

```python
if __name__ == "__main__":
   main()
```
### Conclusion
At the end of this article, we are able to implement the use of python list together with functions and exception handling to build a console app that computes a personality identity.

### References
[Myers briggs personality](https://www.verywellmind.com/the-myers-briggs-type-indicator-2795583)

[introduction to computer and python](https://deitel.com/wp-content/uploads/2019/11/intro-to-python-for-computer-science-and-data-science-table-of-contents.pdf)








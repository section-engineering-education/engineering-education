Analyzing data via visual images is known as data visualization. In this article, we'll create vector-based graphics files using the Python visualization tool [Pygal](https://www.pygal.org/). Since they resize automatically to fill the user's screen, they are valuable in visualizations that are shown on various screen sizes. We'll look at the consequences of rolling dice in this article. You have a fair chance of rolling any value from 1 to 6 if you roll a conventional six-sided die. If using two dice, though, you are more likely to roll certain values than others. We'll develop a data collection that simulates rolling dice to see which values are most probable to appear. Then we'll display the data from a large number of rolls to see which outcomes are more probable.

### Prerequisites
- Understand the [Python programming language](https://docs.microsoft.com/en-us/windows/python/beginners) at a basic level. 
- Make sure your PC has [Python](https://www.journaldev.com/30076/install-python-windows-10) installed. 
- Have a working knowledge of [Pygal](https://www.pygal.org/).


### Installing Pygal
Execute the script following to activate Pygal: 

```python
pip install pygal
```
For additional information on how to install Pygal, go to Pygal's official [website](https://www.pygal.org/).

### Creating the Die Class
To start with let's begin with creating a class for simulating a single die flip. Let's create a python file and named it `class_die.py`.
```python
from random import randint
class DieClass():
  
 def __init__(self, number_of_sides=6):
 
 self.number_of_sides = number_of_sides
 
 def rolldie(self):
 
 return randint(1, self.number_of_sides)
```

Single parameter is optional for the `__init__()` function. If no parameter is provided, the number of sides for an instance of our die produced using this class will always be six. The value of a parameter is used to determine the number of sides on the die when a parameter is provided. The `rolldie()` method returns a randomized value between 1 and the number of sides by using the `randint()` method. This function can return both the initial(1) and final values(`number_of_sides`), or any number between the two.

### Rolling the Die
Let's roll a six-sided die, display the outcomes, and make sure they appear okay before developing a visualization based on this class. We will create a file named `visual_die.py` and save it in the same folder we stored the `class_die.py` file. 
```Python
from class_die import DieClass
# make a six sided die.
 die = DieClass()
# Do some rolls, and keep outcomes in a list.
outcomes = []
 for roll_number in range(100):
 outcome = die.rolldie()
 outcomes.append(outcome)
 
print(outcomes)
```
First, we make a `DieClass` object with a default of six sides. Then we roll the die `100` times and record the outcomes in a list. Here's an example of the outcomes:
```bash
[4, 6, 5, 6, 1, 5, 6, 3, 5, 3, 5, 3, 2, 2, 1, 3, 1, 5, 3, 6, 3, 6, 5, 4,
 1, 1, 4, 2, 3, 6, 4, 2, 6, 4, 1, 3, 2, 5, 6, 3, 6, 2, 1, 1, 3, 4, 1, 4,
 3, 5, 1, 4, 5, 5, 2, 3, 3, 1, 2, 3, 5, 6, 2, 5, 6, 1, 3, 2, 1, 1, 1, 6,
 5, 5, 2, 2, 6, 4, 1, 4, 5, 1, 1, 1, 4, 5, 3, 3, 1, 3, 5, 4, 5, 6, 5, 4,
 1, 5, 1, 2]
```
 A glance at these findings reveals that the `DieClass` is active. Since we don't see 0 or 7, we assume all the outcomes are inside the acceptable range. We can see each value from 1 to 6, implying that all scenarios are represented

### Analyzing the Results
We count the amount of times we roll every number to assess the outcomes of rolling one six-sided die: 
```python
from class_die import DieClass
# make a six sided die.
 die = DieClass()
# Do some rolls, and keep outcomes in a list.
outcomes = []
 for roll_number in range(1000):
 outcome = die.rolldie()
 outcomes.append(outcome)
# Analyze the outcomes.
freqs = [] # list to store frequencies
 for v in range(1, die.number_of_sides+1):
 freq = outcomes.count(v)  # frequency
 freqs.append(freq)
 
print(freqs)

```
We can raise the number of generated rolls to `1000`  because we're using Pygal to evaluate the data rather than printing them. We build the empty list frequencies(`freqs`) to hold the amount of times every value is rolled to examine the rolls. 
We build the empty list frequencies to hold the amount of times every value is rolled to examine the rolls. We iterate through the available values (1 to 6 in this situation), record how many instances each number shows in the outcomes, and attach this amount to the frequencies list. Then, before creating a graphic, we publish this list:

```bash
[155, 167, 168, 170, 159, 181]
```

### Making a Histogram
We may construct a histogram of the outcomes using a frequencies(`freqs`) list. A histogram is a graph that shows how frequently various outcomes occur. The following is the program for making the histogram: 

```python
import pygal as pyg
from class_die import DieClass
# make a six sided die.
 die = DieClass()
# Do some rolls, and keep outcomes in a list.
outcomes = []
 for roll_number in range(1000):
 outcome = die.rolldie()
 outcomes.append(outcome)
# Analyze the outcomes.
freqs = [] # list to store frequencies
 for v in range(1, die.number_of_sides+1):
 freq = outcomes.count(v)  # frequency
 freqs.append(freq)
 
# Make a histogram for the outcomes.
histogram = pyg.Bar()
histogram.title = "outcomes of rolling a six sided die 1000 times."
histogram.x_labels = ['1', '2', '3', '4', '5', '6']
histogram.x_title = "outcomes"
histogram.y_title = "Frequency of outcomes"
histogram.add('six-sided die', freqs)
histogram.render_to_file('histogram.svg')
```
By creating a `pyg.Bar()` instance, we can construct a bar graph, which we then keep in `histogram`. After that, we specify the `title` property of `histogram`, name the x-axis with the potential outcomes of rolling a six-sided die, then add titles to each of the axes. To add a sequence of values to the graph, we utilize the `add()` function. Lastly, the histogram is saved as an `SVG` document. When you open the SVG file you should see a graph  like the one below:

![Histogram created with Pygal](/engineering-education/data-visualization-rolling-dice-with-pygal/singleD6.PNG)

### Rolling Two Dice
When you toss two dice, you get bigger numbers and a different pattern of outcomes. To imitate how we toss a pair of dice, let's change our program to make two six-sided dice.  We'll add the two values (one per die) and save the total in `outcomes` every moment we toss the duo.
```python
import pygal as pyg
from class_die import DieClass
# Make 2 six-sided dice.
die_one = DieClass()
die_two = DieClass()
# Do some rolls, and keep outcomes in a list.
outcomes = []
 for roll_number in range(1000):
 outcome = die_one.rolldie() + die_two.rolldie()
 outcomes.append(outcome)
 
# Analyze the outcomes.
freqs = []  # list to store frequencies
 maximum_outcome = die_one.number_of_sides + die_two.number_of_sides

 for v in range(2, maximum_outcome+1):
 freq = outcomes.count(v) # frequency
 freqs.append(freq)
 
# Make a histogram for the outcomes.
histogram = pyg.Bar()
histogram.title = "Outcome of rolling two six-sided dice 1000 times."
histogram.x_labels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
histogram.x_title = "Outcome"
histogram.y_title = "Frequency of Outcome"
histogram.add('Two six sided dice', freqs)
histogram.render_to_file('two_dice.svg')
```
We throw the dice and compute the value of two dice for every throw after we make two instances of `DieClass()`.The maximum possible outcome (12) is the total of the two dice's highest numbers, that we save in `maximum_outcome`. The least possible outcome (2) is the total of the two dice's lowest numbers. We keep track of outcomes for every value between `2` and `maximum_outcome` when analyzing the outcomes. After executing the above code we get the following results:

![Histogram for two D6](/engineering-education/data-visualization-rolling-dice-with-pygal/twoD6.PNG)

### Conclusion
We learned how to do the following in this tutorial: 
 - create the die class
 - roll the die
 - analyze the results of rolling a single six-sided die
 - make a histogram
 - roll two dice and make a visualization of the results

 ### Further reading
See the following sources for more details on data visualization in Python: 
- [Rolling dice with pygal](https://www.programmersought.net/article/335760346.html)
- [Python data visualization](https://blog.karatos.in/a?ID=01550-63efe4a7-a126-42f7-99af-bbd8a5f00f55)

Happy coding!

In this article, we'll use Python to collect data for a random walk and then use matplotlib to visualize the results. A random walk is a route with no predefined way that is determined by a sequence of random choices made totally at random. A random walk could be compared to the path a cockroach may follow if it lost its mind and takes each walk differently. 

### Prerequisites
 - Have some basic knowledge of [Python programming language](https://docs.microsoft.com/en-us/windows/python/beginners)
 - Have [Python](https://www.journaldev.com/30076/install-python-windows-10) and [matplotlib](https://www.tutorialspoint.com/how-to-install-matplotlib-in-python) installed in your machine.
 - Have some basic understanding of [matplotlib](https://www.simplilearn.com/tutorials/python-tutorial/matplotlib)

### Creating the RWalk() Class
To design a random walk, we'll construct an `RWalk` class that generates random choices on the basis the trek should go in. Three characteristics are required for the class: a single variable to record the amount of instances in the path, and two arrays to hold the x- and y- data of each step in the trek. The `RWalk` class will only have two functions:` __init__()` and `fil_walk()`, which will determine the steps in the trek. Let's construct a file named `rwalk.py` and begin with the ` __init__()` function as illustrated below:

```python
from random import choice
class RWalk():
 """RWalk class that generates random choices."""
 
 def __init__(self, number_of_points=500):
 """characteristics of the trek"""
 self.number_of_points = number_of_points
 
 # Each move begin at (0, 0).
 self.xvalues = [0]
 self.yvalues = [0]
```
Here we fix the default number of marks in the trek to `500`, which is sufficient to form some intriguing sequences but fairly small to build walks rapidly. Then we build two lists to keep track of the x- and y-estimates, and we begin each trek at `(0, 0)`.

### Choosing Directions
To supply our trek with locations and calculate the route of each move, we'll use the `fil walk()`function, as illustrated below. The code below should be added to the file we created initially that is `r_walk.py`.

```python
def fil_walk(self):
"""determine all the marks in the trek."""
 
 # Continue walking until you reach the required distance. 
 while len(self.xvalues) < self.number_of_points:
 
 # Choose a route and how far you want to go in that way.
 x_route = choice([1, -1])
 x_length = choice([0, 1, 2, 3, 4])
 x_move = x_route * x_length
 
 y_route = choice([1, -1])
 y_length = choice([0, 1, 2, 3, 4])
 y_move = y_route * y_length
 
 # discard walks that go nowhere.
 if x_move == 0 and y_move == 0:
   continue
 
 # determine the succeeding x and y co-ordinates.
  succeeding_x = self.xvalues[-1] + x_move
  succeeding_y = self.yvalues[-1] + y_move
 
 self.xvalues.append( succeeding_x)
 self.yvalues.append( succeeding_y)
```
We begin by creating a loop that will continue to execute until the path is supplied with the right set of points. This function's major component instructs Python on how to generate four random possibilities.
To select a result for `x_route`, use `choice([1, -1])`, which yields `1` for right movement and `1` for left movement. Then `choice([0, 1, 2, 3, 4])` instructs Python how far to advance in that way `(x_length)`
by generating a random integer among 0 and 4.
We compute the distance of each movement in the x and y route by multiplying  `x_route * x_length` and `y_route * y_length` respectively.
If the results for `x_move` are +ve, pushes walk to the right, if -ve push walk to the left, 0 indicates an upright step.
If the results for `y_move` are +ve indicates move upwards, while -ve implies move downwards, and 0 implies a horizontal move.
The path pauses when both `x_move` and `y_move` are `0`, but we keep the loop `continuing` to avoid this.  
We calculate the value in `y_move` to the last value supplied in `yvalues` to get the `succeeding_y` value for our trek, and we do the same for the xvalues. We attach these data to `xvalues` and `yvalues` soon we obtain them.

### Plotting the Random Walk
Here we will create a new file and name it `visual_rw.py` and save it in the same directory we saved `rwalk.py` and write the following code:

```python
import matplotlib.pyplot as pylt
from r_walk import RWalk
# create a random walk
 rwalk = RWalk()
rwalk.fil_walk()

pylt.scatter(rwalk.xvalues, rwalk.yvalues, s=14) # s is size of dots
pylt.show()
```

The first step here is to import `pyplot` and `RWalk`. Then we make a random trek and save it in `rwalk`, ensuring to call `fil_walk()` on it. Finally, we provide the x and yvalues from the walk to `scatter()` and select a suitable dot diameter.
When we execute the file `visual_rw.py` we should be able to see something like the figure below: 
![Random Walk](/engineering-education//Random Walk.PNG)

### Styling the Walk
#### Coloring the Points
We'll use a colormap to display the sequence of the spots along the walk, then eliminate the black frame of each dot to reveal the color of the dots. We send a list with the location of each point to the `c` parameter to color the spots as per their arrangement in the trek. The list only comprises the values 1 to 5000, as seen here, since the dots are plotted in sequence:

```python
import matplotlib.pyplot as pylt
from r_walk import RWalk
#create a random walk
 rwalk = RWalk()
rwalk.fil_walk()

p_numbers = list(range(rwalk.number_of_points)) #point numbers
 pylt.scatter(rwalk.xvalues, rwalk.yvalues, c=p_numbers, cmap=plt.cm.Blues,
 edgecolor='none', s=14)
pylt.show()
```
First, we build a list of values corresponding to the amount of points in the path using `range()` function. Then we put them in a list called `p_numbers`, which we'll use to color every spot on the trek. We use the `Blues` colormap, supply `p_numbers` to the `c` parameter, and then `edgecolor=none` to remove the black accent around every spot.
The result of the above program is shown below:
![Random Walk with Blue colormaps](/engineering-education//Blue_colormap.PNG)

#### Plotting the Starting and Ending Points
Once the main sequence has been mapped, we can map the initial and last spots separately. To ensure the terminal points stand out, we'll enlarge them broader and color them distinctively, as illustrated below.
Put this code just above the `pylt.show()` in the file `visual_rw.py`
```python
# map the initial and terminal points.
 pylt.scatter(0, 0, c='green', edgecolors='none', s=110)
 pylt.scatter(rwalk.xvalues[-1], rwalk.yvalues[-1], c='red', edgecolors='none',
 s=110)
```

We paint spot `(0, 0)` in `green` with a greater size `(s=110)` than the other points to identify the beginning. The last `x and yvalues` in the trek are plotted in `red` with a size of `110` to indicate the end destination.
When the above code is executed, you should be able to identify where the walk starts and terminates.

### Adding Plot Points
To offer us additional stuff to deal with, let's raise the number of dots. To achieve so, when creating an `RWalk` occurrence, we raise the number of `number_of_points` and alter the diameter of every dot when displaying the plot, as illustrated here:

```python
import matplotlib.pyplot as pylt
from r_walk import RWalk
#create a random walk
 rwalk = RWalk(50000)
rwalk.fil_walk()

p_numbers = list(range(rwalk.number_of_points)) #point numbers
 pylt.scatter(rwalk.xvalues, rwalk.yvalues, c=p_numbers, cmap=plt.cm.Blues,
 edgecolor='none', s=1)
pylt.show()
```
This sample generates a random walk with `50,000` spots and depicts every spot with a width of `s=1`. As demonstrated in the figure below, the consequent walk is feathery and cloud-like.

![50000 points walk](/engineering-education//feathery.PNG)

### Conclusion
In this tutorial we have learned how to:
 - Creating the RWalk() Class
 - Choosing Directions
 - Plotting the Random Walk
 - Coloring the Points
 - Plotting the Starting and Ending Points
 - Adding Plot Points


Happy coding!
---
layout: engineering-education
status: publish
published: true
url: /buffon-needle/
title: Simulation of Buffon's Needle problem in Python
description: In this article we will speak about Buffon's Needle problem in Python by running a simulation and exploring pi.
author: lalithnarayan-c
date: 2020-09-25T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/buffon-needle/hero.jpg
    alt: Simulation of Buffon's Needle image
---
Have you ever wondered about the significance of pi? The value 3.14 is a rough approximation used daily. Pi represents a fixed ratio between the circumference of a circle to its diameter. The nature of circles is defined by pi. With this article we will get to look at pi from a different perspective. What if I told you, we could estimate pi with a probability problem.
<!--more-->
A very famous problem called the [Buffon's needle](https://en.wikipedia.org/wiki/Buffon%27s_needle_problem) was posed by French naturalist, mathematician, and cosmologist, [Georges-Louis Leclerc](https://en.wikipedia.org/wiki/Georges-Louis_Leclerc,_Comte_de_Buffon), Conte de Buffon. He proposed the problem as follows:

> Lets suppose we have a floor made of parallel strips of wood, each the same width, and we drop a needle onto the floor. What is the probability that the needle will lie across a line between two strips?

What's fascinating is the relation between the problem proposed and the mathematical constant pi. This is all under the study of [geometric probability](https://en.wikipedia.org/wiki/Geometric_probability), which has dealt with various mind-boggling problems such as [Bertrand's paradox](http://orca.cf.ac.uk/3803/1/Shackel%20Bertrand%27s%20paradox%205.pdf).

Now to the problem at hand - the probability that the needle will touch either of the lines is given by the solution as follows:

$P = \frac{2}{\pi} \frac{l}{t}$

The value of $\pi$ can be estimated by re-arranging the equation as follows:

$\pi = \frac{2}{P} \frac{l}{t}$

The probability of intersection, P, is defined as the number of intersections by the total number of tosses of the needle.

![buffon needle](/engineering-education/buffon-needle/buffon_needle_descr.jpg)

**[Image Source](https://commons.wikimedia.org/w/index.php?curid=13210701)**

We have defined thickness `t` to be 1 and the length `l` to be 0.5.

### Code
Let's take a look at the code to simulate Buffon's Needle problem.
We will define two classes, one to define the blueprint for **Needle** and the second to define the blueprint for the **Simulation**. The two classes are named as `DefineNeedle` and  `BuffonSimulation` respectively.

Let us look at the first class, `DefineNeedle`:
1. We define the `__init__` method where we initialize the variables. We store the coordinates of the needle in the cartesian coordinate system and the complex system.
2. In the variable `end_points`, we store the extreme points of the needle using the coordinates of the needle in the complex system. It is calculated as follows
   1. Compute `$ (x- \frac{l}{2}*\cos(\theta), y-\frac{l}{2}*\sin(\theta)) $`
   2. Compute `$ (x+ \frac{l}{2}*\cos(\theta), y+\frac{l}{2}*\sin(\theta)) $`
   3. Hence, we store these two co-ordinates in an array called `end_points`. `end_points` is a `2X2` array consisting of two rows of the coordinates computed above.
3. We define a new method called `intersects_with_y` to check if a given needle intersects with the horizontal lines.

Now we shall look at the second class, `BuffonSimulation`:
1. We defined the `__init__` method. The variables declared are `floor`, `boards`, `list_of_needle_objects` and `number_of_intersections`. We will use the library `matplotlib` extensively in this project. We import the `pyplot` library from `matplotlib` in the first line of code. In the `__init__` method, we define the fig variable, which initializes the figure.
2. The next method we define is `plot_floor_boards`, which is used to set the 0 & 1 vertical lines in the plot.
3.  `toss_needles` method uses the object `needle_object` of the class `DefineNeedle`. Using the `endpoints` variable, we obtain the x and y coordinates respectively. Next, we check if the needle intersects with the two floor_boards defined in the earlier method. If it intersects, the needle is plotted in green. Otherwise, it is plotted in red.
4.  `estimate_pi` is the function that computes the value of pi using the formula given above. The length of the needle is 0.5, the width is 1. Therefore, the formula reduces to the inverse of the probability. Try it out using a piece of paper to see it for yourself.
5.  `plot_needles` is used for plotting the needles and the information that goes along with it. We update the plot once every 200 needles. The information is displayed below the plot.

We create an object of the `BuffonSimulation` and call the `plot` method in the `main` function. Finally, we call the `main` function to run the entire code. A repl.it link is provided at the end so that you can check the results.

```py
import matplotlib.pyplot as plt
import random
import math
import numpy as np

NUMBER_OF_NEEDLES = 5000


class DefineNeedle:
    def __init__(self, x=None, y=None, theta=None, length=0.5):
        if x is None:
            x = random.uniform(0, 1)
        if y is None:
            y = random.uniform(0, 1)
        if theta is None:
            theta = random.uniform(0, math.pi)

        self.needle_coordinates = np.array([x, y])
        self.complex_representation = np.array(
            [length/2 * math.cos(theta), length/2*math.sin(theta)])
        self.end_points = np.array([np.add(self.needle_coordinates, -1*np.array(
            self.complex_representation)), np.add(self.needle_coordinates, self.complex_representation)])

    def intersects_with_y(self, y):
        return self.end_points[0][1] < y and self.end_points[1][1] > y


class BuffonSimulation:
    def __init__(self):
        self.floor = []
        self.boards = 2
        self.list_of_needle_objects = []
        self.number_of_intersections = 0

        fig = plt.figure(figsize=(10, 10))
        self.buffon = plt.subplot()
        self.results_text = fig.text(
            0, 0, self.estimate_pi(), size=15)
        self.buffon.set_xlim(-0.1, 1.1)
        self.buffon.set_ylim(-0.1, 1.1)

    def plot_floor_boards(self):
        for j in range(self.boards):
            self.floor.append(0+j)
            self.buffon.hlines(
                y=self.floor[j], xmin=0, xmax=1, color='black', linestyle='--', linewidth=2.0)

    def toss_needles(self):
        needle_object = DefineNeedle()
        self.list_of_needle_objects.append(needle_object)
        x_coordinates = [needle_object.end_points[0]
                         [0], needle_object.end_points[1][0]]
        y_coordinates = [needle_object.end_points[0]
                         [1], needle_object.end_points[1][1]]

        for board in range(self.boards):
            if needle_object.intersects_with_y(self.floor[board]):
                self.number_of_intersections += 1
                self.buffon.plot(x_coordinates, y_coordinates,
                                 color='green', linewidth=1)
                return
        self.buffon.plot(x_coordinates, y_coordinates,
                         color='red', linewidth=1)

    def estimate_pi(self, needles_tossed=0):
        if self.number_of_intersections == 0:
            estimated_pi = 0
        else:
            estimated_pi = (needles_tossed) / \
                (1 * self.number_of_intersections)
        error = abs(((math.pi - estimated_pi)/math.pi)*100)
        return (" Intersections:" + str(self.number_of_intersections) +
                "\n Total Needles: " + str(needles_tossed) +
                "\n Approximation of Pi: " + str(estimated_pi) +
                "\n Error: " + str(error) + "%")

    def plot_needles(self):
        for needle in range(NUMBER_OF_NEEDLES):
            self.toss_needles()
            self.results_text.set_text(self.estimate_pi(needle+1))
            if (needle+1) % 200 == 0:
                plt.pause(1/200)
        plt.title("Estimation of Pi using Probability")

    def plot(self):
        self.plot_floor_boards()
        self.plot_needles()
        plt.show()


simulation = BuffonSimulation()
simulation.plot()

```

```py
import matplotlib.pyplot as plt
import random
import math
import numpy as np

NUMBER_OF_NEEDLES = 5000


class DefineNeedle:
    def __init__(self, x=None, y=None, theta=None, length=0.5):
        if x is None:
            x = random.uniform(0, 1)
        if y is None:
            y = random.uniform(0, 1)
        if theta is None:
            theta = random.uniform(0, math.pi)

        self.needle_coordinates = np.array([x, y])
        self.complex_representation = np.array(
            [length/2 * math.cos(theta), length/2*math.sin(theta)])
        self.end_points = np.array([np.add(self.needle_coordinates, -1*np.array(
            self.complex_representation)), np.add(self.needle_coordinates, self.complex_representation)])

    def intersects_with_y(self, y):
        return self.end_points[0][1] < y and self.end_points[1][1] > y


class BuffonSimulation:
    def __init__(self):
        self.floor = []
        self.boards = 2
        self.list_of_needle_objects = []
        self.number_of_intersections = 0

        fig = plt.figure(figsize=(10, 10))
        self.buffon = plt.subplot()
        self.results_text = fig.text(
            0, 0, self.estimate_pi(), size=15)
        self.buffon.set_xlim(-0.1, 1.1)
        self.buffon.set_ylim(-0.1, 1.1)

    def plot_floor_boards(self):
        for j in range(self.boards):
            self.floor.append(0+j)
            self.buffon.hlines(
                y=self.floor[j], xmin=0, xmax=1, color='black', linestyle='--', linewidth=2.0)

    def toss_needles(self):
        needle_object = DefineNeedle()
        self.list_of_needle_objects.append(needle_object)
        x_coordinates = [needle_object.end_points[0]
                         [0], needle_object.end_points[1][0]]
        y_coordinates = [needle_object.end_points[0]
                         [1], needle_object.end_points[1][1]]

        for board in range(self.boards):
            if needle_object.intersects_with_y(self.floor[board]):
                self.number_of_intersections += 1
                self.buffon.plot(x_coordinates, y_coordinates,
                                 color='green', linewidth=1)
                return
        self.buffon.plot(x_coordinates, y_coordinates,
                         color='red', linewidth=1)

    def estimate_pi(self, needles_tossed=0):
        if self.number_of_intersections == 0:
            estimated_pi = 0
        else:
            estimated_pi = (needles_tossed) / \
                (1 * self.number_of_intersections)
        error = abs(((math.pi - estimated_pi)/math.pi)*100)
        return (" Intersections:" + str(self.number_of_intersections) +
                "\n Total Needles: " + str(needles_tossed) +
                "\n Approximation of Pi: " + str(estimated_pi) +
                "\n Error: " + str(error) + "%")

    def plot_needles(self):
        for needle in range(NUMBER_OF_NEEDLES):
            self.toss_needles()
            self.results_text.set_text(self.estimate_pi(needle+1))
            if (needle+1) % 200 == 0:
                plt.pause(1/200)
        plt.title("Estimation of Pi using Probability")

    def plot(self):
        self.plot_floor_boards()
        self.plot_needles()
        plt.show()


simulation = BuffonSimulation()
simulation.plot()
```

### Conclusion
In this article, we estimated the value of $\pi$ using an elegant problem. What is truly exciting is the fact that $\pi$ is connected to a probability question. Think about the practicality of the value of $\pi$. Mathematics reveals secrets in simple and elegant problems such as this one. I hope you enjoyed reading this one as much as I enjoyed writing it.

Do connect with me on [LinkedIn](https://www.linkedin.com/in/lalithnarayan-c-27a89a1b/) and let me know what you think is the relation between $\pi$ and the given problem.

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });

    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>

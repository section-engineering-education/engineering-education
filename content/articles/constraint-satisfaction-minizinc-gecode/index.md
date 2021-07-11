---
layout: engineering-education
status: publish
published: true
url: /constraint-satisfaction-minizinc-gecode/
title: Constraint-Satisfaction Problems with MiniZinc + Gecode
description:  Constraint-Satisfaction Problems (CSPs) are a type of problem in computer science. In this tutorial, we will use MiniZinc and Gecode  to model and solve a simple graph-coloring problem. MiniZinc is a programming language built for CSPs. Gecode is a "solver" program for CSPs. 
author: nicholas-kross
date: 2021-01-23T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/constraint-satisfaction-minizinc-gecode/hero.jpg
    alt: united states map
---
Constraint-Satisfaction Problems (CSPs) are a type of problem in computer science. They are made of variables, possible values, and constraints on those values. Many problems, like graph theory, type inference, and puzzle-solving, work as CSPs.
 <!--more--> 
In this tutorial, we will use MiniZinc and Gecode to model and solve a simple graph-coloring problem. MiniZinc is a programming language built for CSPs. Gecode is a "solver" program for CSPs.

### Prerequisites
This tutorial does not assume existing knowledge about CSPs. We cover the basics of CSPs at the beginning. Yet it will help if you already know some programming basics (like types and constants). This makes some of the MiniZinc language easier to understand.

### Constraint-Satisfaction basics
A Constraint-Satisfaction Problem is composed of 3 **sets**, 3 groups of items with no repeats in a set. These groups are X, the variables; D, the domains, and C, the constraints.

#### Defining a CSP
The first set, *X*, is the set of **variables**, which are like programming variables. These can be *x*, *y*, *z*, *x<sub>1</sub>*, *x<sub>2</sub>*, or any other variables. Each variable can take on a value from its **domain**, which is found in the second set *D*.

A domain is, itself, a set of (a finite number of) possible values for a corresponding variable. 

So if *X={x<sub>1</sub>, x<sub>2</sub>, x<sub>2</sub>}* is your set of variables, then *D*={*d<sub>1</sub>*, *d<sub>2</sub>*, *d<sub>3</sub>*} is your set of domains. 

The *i*th variable in *X*, *x<sub>i</sub>*, can be a value from the set *d<sub>i</sub>*.

The final set, *C*, is the set of **constraints** on the values of the variables. 

A constraint is some rule placed on the value of one or more variables. 

If *C*={*x<sub>1</sub>* + *x<sub>2</sub>* = 3}, we can only pick values from *d<sub>1</sub>* and *d<sub>2</sub>* that make *x<sub>1</sub>* and *x<sub>2</sub>* add up to 3.

Putting this all together, we could define a simple CSP as follows:

*X*={*x*, *y*}

All domains are the same: *d<sub>x</sub>*=*d<sub>y</sub>*={2,3}. 

This means *x* can be either 2 or 3, and *y* can be either 2 or 3.

The only constraint: *x*+*y* \> 4

The "solutions" to these CSP are the possible values of *x* and *y* that make the constraint true, given the available domain values. 

One solution would be if *x*=2 and *y*=3. If we set the values as *x*=2 and *y*=2, this would *not* be a solution, since 2+2 = 4, which is not greater than 4. Those values violate the constraint, so they cannot be a solution.

For more theoretical details, you can check [Enric Rodríguez-Carbonell's notes](https://www.cs.upc.edu/~erodri/webpage/cps/theory/cp/intro/slides.pdf) on the subject.

#### CSP applications
You'll find that many problems lend themselves to CSP solutions. They have objects (variables) with possible values (domains) and rules about their interactions (constraints). 

One example is any problem involving a graph, or a network of nodes.

In the graph below, there are 5 nodes, and several connections between them. Each connection has a "cost", given by its number. In real life, each node could be a city (city 1, city 2, etc.), and each connection a road with a cost. So the road from city 1 to city 2 costs $2 toll (or takes 2 hours) to drive on.

![TSP](/engineering-education/constraint-satisfaction-minizinc-gecode/tsp.gif)


*Image source:[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Example_The_travelling_salesman_problem_(TSP).gif)*
 

You want to visit every city exactly once (no repeated nodes). You *also* want the lowest travel cost (smallest sum of connection-costs). How do you solve the problem?

You can convert the information about the graph into a Constraint-Satisfaction Problem. The variables could be the order in which you visit each city (where *x<sub>i</sub>* is the *i*th city visited). The domains can be the cities. 

The constraints would include:
- "Lower the cost of the path traveled on as much as possible."
- "You can't visit the same city twice."
- "You have to visit every city."

And so on. Constraints would be written with corresponding equations.

This is a version of the [traveling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem). Such problems crop up in GPS navigation; Google Maps wants to find the quickest route from your house to your workplace. 

Other problems break down to CSP components in a similar fashion, including "schedule these jobs to minimize wasted time", and "figure out if this data is a number or a letter".

### Our example problem: Map-coloring
Map-coloring is easy to convert into a Constraint-Satisfaction Problem. Here, you want to color countries or states on a map, *without* coloring two touching states with the same color. We will find such a coloring style for the map below of the United States. We only look at the continental 48 states only, so we will exclude Alaska, Hawaii, and the territories.

![us map](/engineering-education/constraint-satisfaction-minizinc-gecode/United_States_Public_Domain_Map.jpg)

*Image source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:United_States_Public_Domain_Map.svg)*

Our coloring can be rewritten as a CSP, where the constraint is that any states that touch each other cannot be the same color. Texas (TX) cannot be green if Louisiana (LA) is green. So we need at least two colors for a valid map-coloring. Doing this by trial-and-error is hard, while CSP modeling makes it easy.

### CSP tools for pros
Some basic CSP tools exist for common languages, like [Python](https://pypi.org/project/python-constraint/) and [JavaScript](http://prajitr.github.io/jusCSP/). But, the basic options don't work well to model and solve large, complex problems. Specialized tools can handle those, and also speed up CSP solving, as they're optimized for that purpose alone.

That is why we will use MiniZinc and Gecode in our Constraint-Satisfaction Problem. [MiniZinc](https://www.minizinc.org/) is a language designed for constraint-modeling. [Gecode](https://www.gecode.org/) is a solver, a separate module that finds values for the variables to satisfy the constraints.

#### Installing MiniZinc
To get started, we have to download and install MiniZinc. MiniZinc is best used with the (free, open-source) MiniZinc IDE, which comes with Gecode, other solvers, and a MiniZinc compiler.

Go to the [MiniZinc downloads page](https://www.minizinc.org/software.html) and click the recommended installer that matches your operating system. 

If you don't see your OS, or need a 32-bit version, look for an alternative release [here](https://www.minizinc.org/ide/) or [here](https://github.com/MiniZinc/MiniZincIDE/releases/). 

In this tutorial, we use MiniZinc 2.5.3 on Windows 10.

![IMG1](/engineering-education/constraint-satisfaction-minizinc-gecode/img1.png)

Once you've downloaded the installer (named something like `MiniZincIDE-2.5.3-bundled-setup-win64.exe` in your Downloads folder), click to run it. 

If you're on Windows, and got a "Windows protected your PC" popup, click "More info" and then "Run Anyway". Follow the installer's prompts (the defaults are fine, accept the agreement). Click "Install" and then "Finish".

A window will pop up asking for automatic-update checking. Click "No" unless you're okay with them sending anonymized statistics to Google Analytics. 

Finally, you will see an untitled MiniZinc project that looks something like this:

![IMG2](/engineering-education/constraint-satisfaction-minizinc-gecode/img2.png)

Note that the "Solver configuration" in the top right corner says "Gecode 6.3.0". That's exactly what we want, as we're using Gecode as our solver. 

If that box says something else, click it and select a "Gecode" option from the drop-down menu. MiniZinc *does* support custom solvers, which you can learn more about [here](https://www.minizinc.org/doc-2.5.3/en/command_line.html#adding-solvers).

### Setting up the problem
MiniZinc (the language) is used to model Constraint-Satisfaction Problems. It works like many languages you may have already encountered. We'll start with a integer, the parameter `num_colors`. 

It represents the number of colors we want to use on our problem. We can't change this number (it's a constant), since it will constrain how many colors we can use.

```bash
int: num_colors = 4;

% this is a comment
% the rest of the CSP will go here
```

The [four-color theorem](https://nrich.maths.org/6291) tells us we can color *any* map with no more than 4 different colors. We'll solve our map-coloring problem for 4 colors, and later see if we can do so with fewer colors.

Our code is partly based on a simpler map-coloring example in the [MiniZinc documentation](https://www.minizinc.org/doc-2.5.3/en/modelling.html). We also took inspiration from Listing 2.2.2 in [other MiniZinc documentation](https://www.minizinc.org/doc-2.4.3/en/modelling2.html#arrays-and-sets), and a basic traveling-salesman example from the [University of Glasgow](http://www.dcs.gla.ac.uk/~pat/cpM/miniZinc.html). Curious readers can investigate these further.

Now, we put a MiniZinc "solve" command at the end of our code, to make it look like this:

```bash
int: num_colors = 4;

% this is a comment
% the rest of the CSP will go here

solve satisfy;
```

The "satisfy" keyword tells MiniZinc that we need *some* kind of solution to the problem, not the "best" solution.

Press `Ctrl-S` or click File>Save to save the file. Call it `us_map.mzn`, as .mzn files are MiniZinc's code format.

#### Variables and domains
Now, we need our variables and domains. Each state is a variable, we color it with one of 4 colors. Each color is actually an integer (from 1-4 inclusive). It doesn't matter which color each integer represents, as long as they are different.

In MiniZinc, a variable is defined like `var domain: identifier;`. The domain is the range of values that the variable (named by the identifier) can take on. 

We can define Texas as `var 1..num_colors: TX;`.This says "TX is a variable that can have a value from 1 to num_colors, inclusive".

However, we don't want to type out this declaration for every variable. Instead of each state being a color variable, we will use an enum (constant list) of state names, and an array of their color values. This will make the final results more legible, and allows other states to be added easily.

Remove the commented lines (starting with `%`), since we'll insert the rest of our code there.

The enum will **enum**erate all the state abbreviations:

```bash
enum States = {AL, AK, AZ, AR, CA, CO, CT, DC, DE, FL, GA, 
          HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, 
          MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, 
          NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, 
          SD, TN, TX, UT, VT, VA, WA, WV, WI, WY};
```

Each of those state abbreviations will denote an integer in our `colors` array:

```bash
array[States] of var 1..num_colors: colors;
```

An array declaration in MiniZinc can be structured as `array[keys or size] of type: arrayname`. So our state-color array is named "colors". The "key" value (name of each item) is based on the variables in the States enum. 

Each color is typed like our previous single-variable, `var 1..num_colors`. The key can also be an index range of items (`0..2`).

#### Constraints
Now that we have our variables, let's set constraints.

If we had continued our earlier practice of using lone variables, the Texas constraints would be:

```bash
constraint TX != LA;
constraint TX != OK;
constraint TX != AR;
constraint TX != NM;
```

Texas (TX) touches Louisiana (LA), so we cannot color them the same color. This means the value (integer) for TX cannot be the same as the value of LA.

Because we use a `colors` array, we would write these constraints by accessing array items:

```bash
constraint colors[TX] != colors[LA];
constraint colors[TX] != colors[OK];
constraint colors[TX] != colors[AR];
constraint colors[TX] != colors[NM];
```

We've provided the full U.S. state [constraints file](https://github.com/nicholaskross/constraint-satisfaction-minizinc-example/blob/main/all_state_touching_constraints.mzn), `all_state_touching_constraints.mzn`.

It contains the full list of state-touching constraints. Download that file by clicking the link and pressing `Ctrl-S` (or clicking File>Save in your browser). 

Then, click and drag it into the folder you saved `us_map.mzn` in. Import this list of constraints into MiniZinc, to let the main file use the constraints. 

Your code should look like this:

```bash
int: num_colors = 4;

enum States = {AL, AZ, AR, CA, CO, CT, DC, DE, FL, GA, 
          ID, IL, IN, IA, KS, KY, LA, ME, MD, 
          MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, 
          NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, 
          SD, TN, TX, UT, VT, VA, WA, WV, WI, WY};

array[States] of var 1..num_colors: colors;

include "all_state_touching_constraints.mzn";

solve satisfy;
```

Finally, we want to see our solution in full. We'll use the "output" command, which can iterate through the States enum and print out the data. At the very end of your code, add this line:

```bash
output [ "\(s) = \(colors[s]);\n" | s in States ];
```

The `\(variable)` syntax lets you output strings of the variables. The `\(s)` is the state code, the `\(colors[s])` is the color number assigned, and `| s in States` means "for every state `s` in the States enum".

### Solving the model with Gecode
#### Satisfying the problem
Finally, we can solve the model with Gecode. Make sure the "Solver configuration" is set to "Gecode 6.3.0", and click on the "Run" button (or press `Ctrl-R`) to run our code.

You should get an output at the bottom of the IDE, looking like this:

```bash
AL = 3;
AZ = 1;
AR = 3;
CA = 2;
CO = 2;
CT = 3;
DC = 1;
DE = 1;
FL = 1;
GA = 2;
ID = 2;
IL = 1;
IN = 2;
IA = 3;
KS = 3;
KY = 3;
LA = 1;
ME = 2;
MD = 3;
MA = 2;
MI = 1;
MN = 4;
MS = 2;
MO = 2;
MT = 3;
NE = 4;
NV = 4;
NH = 1;
NJ = 3;
NM = 4;
NY = 1;
NC = 3;
ND = 1;
OH = 4;
OK = 1;
OR = 1;
PA = 2;
RI = 1;
SC = 1;
SD = 2;
TN = 1;
TX = 2;
UT = 3;
VT = 3;
VA = 2;
WA = 3;
WV = 1;
WI = 2;
WY = 1;
----------
Finished in 178msec
```

To read this output, we see the state's abbreviation on the left, and its color-number on the right. So WY (Wyoming) and TN (Tennessee) are the same color.

#### Optimizing the problem
Now, what if you not only wanted to solve this problem, but to solve it with the *minimum number* of colors? MiniZinc makes this easy, requiring only 4 minor changes:

1. Move and change`num_colors` to be a variable, representing the biggest color-number in the array. So we change its declaration to `var int: num_colors = max(colors);`, the biggest color-number in the colors array. We want to minimize this value, so it's not a constant parameter.
2. Change the `colors` array value type to be an `int` from 1 to 4. Because `num_colors` is unassigned, we cannot use it in ranges, but we know we'll use at least 1 color and no more than 4 colors (by the four-color theorem).
3. Change the "solve" statement to `solve minimize num_colors;`. This will tell Gecode to satisfy the problem in the way that makes `num_colors` as small as possible.
4. Add another "output" statement at the end of the file, to tell us how many colors we needed, printing out `num_colors`'s value.

Your final code should look like [this](https://github.com/nicholaskross/constraint-satisfaction-minizinc-example/blob/main/us_map.mzn):

```bash
enum States = {AL, AZ, AR, CA, CO, CT, DC, DE, FL, GA, 
          ID, IL, IN, IA, KS, KY, LA, ME, MD, 
          MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, 
          NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, 
          SD, TN, TX, UT, VT, VA, WA, WV, WI, WY};

array[States] of var 1..4: colors;

include "all_state_touching_constraints.mzn";

var int: num_colors = max(colors);

solve minimize num_colors;

output [ "\(s) = \(colors[s]);\n" | s in States ];
output [ "We only needed \(num_colors) colors for this problem." ];
```

Click "Run" or `Ctrl-R` again, and the output is...

```bash
Running us_map.mzn
AL = 3;
AZ = 1;
AR = 3;
CA = 2;
CO = 2;
CT = 3;
DC = 1;
DE = 1;
FL = 1;
GA = 2;
ID = 2;
IL = 1;
IN = 2;
IA = 3;
KS = 3;
KY = 3;
LA = 1;
ME = 2;
MD = 3;
MA = 2;
MI = 1;
MN = 4;
MS = 2;
MO = 2;
MT = 3;
NE = 4;
NV = 4;
NH = 1;
NJ = 3;
NM = 4;
NY = 1;
NC = 3;
ND = 1;
OH = 4;
OK = 1;
OR = 1;
PA = 2;
RI = 1;
SC = 1;
SD = 2;
TN = 1;
TX = 2;
UT = 3;
VT = 3;
VA = 2;
WA = 3;
WV = 1;
WI = 2;
WY = 1;
We only needed 4 colors for this problem.
----------
==========
Finished in 174msec
```

... identical! As it turns out, you still need 4 colors for the United States map.

### Conclusion
Congratulations! You've learned about and implemented a Constraint-Satisfaction Problem in MiniZinc, and solved it with Gecode. 

If you want to make more flexible or complex models (that you can run from the command line!), MiniZinc has several [tutorials](https://www.minizinc.org/doc-2.5.3/en/part_2_tutorial.html) for these advanced features.

---
Peer Review Contributions by: [Mike White](https://www.section.io/engineering-education/authors/mike-white/)

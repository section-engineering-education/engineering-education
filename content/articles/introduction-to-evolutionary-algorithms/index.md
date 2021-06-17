---
layout: engineering-education
status: publish
published: true
url: /introduction-to-evolutionary-algorithms/
title: Introduction to Evolutionary Algorithms
description: This article gives an introduction to Evolutionary Algorithms (EA). An evolutionary algorithm mimics one of nature's most fascinating processes, natural selection. Given a population, only fitter members will survive and produce new generations. 
author: adithi-narayan
date: 2021-06-07T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-evolutionary-algorithms/Hero.png 
    alt: Introduction to Evolutionary Algorithms Hero Image
---
A computer program is built to follow rigid and explicit rules. This prescriptive approach has aided us well. But, it requires that the programmers know the exact steps to solve the problem and run it in this lifetime. 
<!--more-->
### Introduction to Evolutionary Algorithms
If we swerve a bit from this strict method, we will stumble across the domain of heuristic algorithms. In that, we will find a powerful, population-based optimization algorithm, the Evolutionary algorithm (EA).

An evolutionary algorithm mimics one of nature's most fascinating processes, natural selection. Given a population, only fitter members will survive and produce new generations.

Inspired by the model of evolution by Darwin in 1859, an EA can be used to approximate solutions. This can be used even when the most optimized approach known is still not fast enough to meet real-world constraints (For example: [NP-Complete](https://www.ics.uci.edu/~eppstein/161/960312.html)).

### Prerequisites
The reader must have a good understanding of:
1. The Python programming language.
2. Design and analysis of algorithms.

You can start [here](/engineering-education/a-beginners-guide-to-python/) to learn more about Python.

### Table of contents
1. [Phases of EA](#phases-of-ea)
2. [The Infinite Monkey Theorem](#the-infinite-monkey-theorem)
3. [Why do we need Evolutionary Algorithms?](#why-do-we-need-evolutionary-algorithms)
4. [Coding an Evolutionary Algorithm](#coding-an-evolutionary-algorithm)
5. [Some fascinating outcomes of EA](#some-fascinating-outcomes-of-ea)

### Phases of EA
Let us start with a brief overview of the phases in an Evolutionary Algorithm. We will revisit these to better understand them in more detail with a sample problem.

An EA consists of four phases:
1. Initialization: A starting population of possible solutions. This is usually randomly populated.
2. Selection: This step simulates the process of natural selection. We need to evaluate the fitness of the members of the population. A fitness function takes in the characteristics of the member and gives out a numerical representation of the viability of the solution. A portion of top-scoring members is selected.
3. Genetic operators: To generate the next generation of the population.
  - Recombination/Crossover: Combining the information of parents to produce one or more children.
  - Mutation: Introducing new genetic material into the generation by slightly modifying the children.
4. Termination: The algorithm stops either on reaching some performance threshold or maximum runtime.

![Phases-of-ea](/engineering-education/introduction-to-evolutionary-algorithms/Phases.png)

To delve deeper into the aspects of EA, let us consider a problem with monkeys, our evolutionary ancestors.

### The infinite monkey theorem
>The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type any given text, such as the complete works of William Shakespeare.

The actual chance that a monkey types the entire Julius Caesar is very slim. It is so minuscule that if the monkey started at Big Bang, it would still be typing. This is going to set the premise for the problem we are going to look at.

Let's consider a monkey aiming to type a short phrase, let's say "Hello".

The probability that the monkey gets one letter right, say "H", would be 1/54 as there are 27 possible lowercase and 27 possible uppercase characters to choose from. 

So, the probability that the monkey gets the word 'Hello' right would be:
```bash
<sup>1</sup>/<sub>54<sup>5</sup></sub>

= 1 in 459165024
```

If our monkey were a powerful simulation that could type a million characters a second, this would take about 7.6 minutes.

7.6 minutes is not a great deal of time. 

If that's the case, why do we still need EA?

### Why do we need Evolutionary Algorithms?
We considered the word "Hello", now let us look at the phrase "HelloWorld"

The probability now becomes 1 in 54<sup>10</sup> which is:
```bash
 1 in 2,10,83,25,19,26,49,20,576
```

With a simulation that could type a million words in a second, this would take:
```bash
6685.455 years.
```

Can you begin to see the problem with the increasing time? With a mere increase of 5 more letters, that would take more than 100 lifetimes, then what about full sentences?

Let's see what happens when we plug the same target "HelloWorld" in an Evolutionary Algorithm. It gives the result in approximately **1 second** and 165 iterations.

![Output](/engineering-education/introduction-to-evolutionary-algorithms/HelloWorld.PNG)

Let us take a closer look at how an Evolutionary Algorithm manages to speed things up by such a massive amount.

### Coding an Evolutionary Algorithm
We are going to try to make our monkey type the word "Hello" to learn the finer workings of an EA.

#### Step 1: Initialization
Ideally, the initial set of solutions for our problem should have all the possible 5 letter words. But, this set is going to be of length 459165024. 

We do not need to keep every single value possible in our population. We will be creating new genetic material. Let us make our population size 50.

So, let's create an array with 50 random strings of upper and lower case alphabets of length 5 [equal to our target string]. We will be using the `random.choices()` method to get our random strings.

````python3
import string
import random
target = "Hello"
n = 50
population = [''.join(random.choices(string.ascii_letters, k=len(target))) for _ in range(n)]
````

#### Step 2: Selection
Fitness function is a way to find out how feasible a solution is. Choosing a proper fitness function to simulate your goal is one of the most important aspects of EA.

Our goal is to get the word "Hello". So, a neat and simple fitness score would give us the number of characters at their correct positions.

So, for a string "Hello": 
The fitness score would be 4 (for 'e', 'l', 'l', 'o').

````python3
def fitness(source, target):
    score = 0
    for i, char in enumerate(source):
        score += target[i] == char
    return score
````

Now that we have a way to find out which members make the cut, let us deal with selection. We could just select the top members. But, sometimes important genetic material can also be generated from the not-so-fit ones.

For example, let's say the top members are Hellx, Hellq, Hellw and one with a very small fitness score (Score of 2) is ablco. Combining one of the top 3 with ablco, taking only the last letter from this would give us Hello.

No matter how we combine the top 3 words, we are not going to get 'o' in the last position, hence we won't get our target 'Hello'.

Natural selection also doesn't entirely eliminate members with a low fitness score. They are less likely to survive. The probability of a member being selected to continue the generation must be based on the fitness score. 

A fitness score of 0 will perish, but the rest of them have a chance to survive. The best ones will have a much greater survival rate.

To simulate this, let us put all the members of the population into a box called a mating pool. The number of times the member is put in the box is based on the fitness function. 

Say, a member [Helxa] has a score of 3, it will be put in the mating pool (3/5) times 100 = 60 times. While a member [Haxvs] with a score of 1 will be put in the pool (1/5) times 100 = 20 times.

When we pick two parents for generating the next generation, it is similar to picking 2 balls from a jar of balls. Picking the ball with most frequency (highest fitness score) is more likely.

````python3
def selection(population):
    mating_pool = []
    f_scores = [fitness(val) for val in population]
    for i, val in enumerate(f_scores):
        for j in range(int(val/len(target) * 100)):
            mating_pool.append(population[i])
    return mating_pool
````

#### Step 3: Genetic operators
Now we need to generate the next generation. This is the part where we induce variation in the population to tweak our population into the desired one.

##### Recombination/Crossover
This stochastic operation takes two (or more) parents and combines them to generate an offspring. The selection of parents is random, but the probability of selecting a particular candidate is based on the fitness score.

The crossover operation for our problem could be:
1. Taking half of each string and combining.
2. Taking alternative characters from each of the strings.
3. Choosing a random mid-point and taking the first part till mid-point from one parent and the rest from the other.

We are going to go with the third option to include a bit more randomness.

````python3
def crossover(a, b):
    child = [''] * len(a)
    mid_point = random.randint(0, len(a) - 1)
    for i in range(len(a)):
        child[i] = b[i] if i > mid_point else a[i]
    return ''.join(child)
````

##### Mutation
This unary operator modifies the child we got from recombination slightly. This change is random and unbiased. For our problem, we can just choose a random position in the string and replace it with a random letter.

But, why do this?

Consider a case where our whole population doesn't have the letter 'e'. This is completely possible as our population is random. No matter how we combine two strings, we will never reach our target as we will never be able to generate 'e' at the second position.

So, if our mutation rate is zero, our output will be similar to this.

```bash
Generations:
Gen:  1 megFo 2
Gen:  2 melMo 3
Gen:  3 melMo 3
Gen:  4 FelMo 3
Gen:  5 melMo 3
Gen:  6 melMo 3
Gen:  7 melMo 3
Gen:  8 melMo 3
Gen:  9 lelMo 3
Gen:  10 delMo 3
Gen:  11 lelMo 3
Gen:  12 FelMo 3
Gen:  13 delMo 3
Gen:  14 lelMo 3
Gen:  15 melMo 3
Gen:  16 delMo 3
Gen:  17 lelMo 3
Gen:  18 melKo 3
Gen:  19 FelMo 3
Gen:  20 melKo 3
Gen:  21 lelMo 3
Gen:  22 lelMo 3

Gen:  28 melMo 3
Gen:  29 FelMo 3
Gen:  30 FelMo 3
Gen:  31 FelMo 3
Gen:  32 FelMo 3
Gen:  33 FelMo 3

Gen:  245 FelMo 3
Gen:  246 FelMo 3
Gen:  247 FelMo 3
Gen:  248 FelMo 3

Gen:  493 FelMo 3
Gen:  494 FelMo 3

Gen:  758 FelMo 3
Gen:  759 FelMo 3

Gen:  994 FelMo 3
Gen:  995 FelMo 3
Gen:  996 FelMo 3
Gen:  997 FelMo 3
Gen:  998 FelMo 3
Gen:  999 FelMo 3
Gen:  1000 FelMo 3
```

Okay, if this mutation is that important, why don't we just mutate everything?

Let's have a look at what happens if the mutation rate is 1.

```bash
Gen:  219 wNlkB 1
Gen:  220 bbTlq 1
Gen:  221 AGlLo 2
Gen:  222 Kefov 1
Gen:  223 JdlvU 1
Gen:  224 HiUPg 1
Gen:  225 HGMns 1
Gen:  226 Qiljq 1
Gen:  227 ZGdpi 0
```

Though this output is cropped, the effect of such randomness can be seen. Having a high mutation rate leads to loss of good solutions as even if we had gotten the string 'Aello', we could have altered it to some other string, say 'AGllo'.

So choosing a good mutation rate (between 0 and 1) is important.

After a few trials, we have chosen 0.1 to be our mutation rate.

````python3
def mutate(a):
   mutationRate = 0.1
    a = list(a)
    for i in range(len(a)):
        if random.random() < mutationRate:
            a[i] = random.choice(string.ascii_letters)
    return ''.join(a)
````

#### Replacement
We have now obtained a new modified offspring from two parent nodes. Now we have to put it back in the population.

This survivor selection mechanism can either be:
- Age-based: Replace the oldest member of the population with the child.
- Fitness score based: Replace the weakest member of the population with the child.

We have employed an age-based replacement.

````python3
def generation(mating_pool, number_of_gen):
    for i in range(len(population)):
        a = random.choice(mating_pool)
        b = random.choice(mating_pool)
        child = mutate(crossover(a, b))
        population[i] = child
    number_of_gen += 1
    return number_of_gen
````

#### Step 4: Termination
When and how do we stop our evolutionary algorithm? Should we go on till we get our exact target? 

In most real-life applications, we are contented with approximations of the target.

Some termination criteria are when:
1. The max allowed CPU time elapses.
2. The number of generations has exceeded a limit.
3. Optimal fitness score is reached.
4. The fitness improvements are under a threshold value for a given amount of time.
5. The population diversity drops under a given threshold.

For our case, we have set the algorithm to stop if either the best solution or 1000 generations is reached.

### Putting it all together
Let's now have a glance at the code combining all our phases and see it in action.

We will also see the time elapsed for running the same.
````python3
import string
import random
import time


def fitness(s, target):
    score = 0
    for i, char in enumerate(s):
        score += target[i] == char
    return score


def selection(population):
    mating_pool = []
    for i, val in enumerate(f_scores):
        for j in range(int(val/len(target) * 100)):
            mating_pool.append(population[i])
    return mating_pool


def crossover(a, b):
    child = [''] * len(a)
    mid_point = random.randint(0, len(a) - 1)
    for i in range(len(a)):
        child[i] = b[i] if i > mid_point else a[i]
    return ''.join(child)


def mutate(a):
    a = list(a)
    for i in range(len(a)):
        if random.random() < mutationRate:
            a[i] = random.choice(string.ascii_letters)
    return ''.join(a)


def generation(mating_pool, number_of_gen):
    for i in range(len(population)):
        a = random.choice(mating_pool)
        b = random.choice(mating_pool)
        child = mutate(crossover(a, b))
        population[i] = child
    number_of_gen += 1
    return number_of_gen


def evaluate():
    score = 0
    best = 0
    for i, val in enumerate(population):
        c = sum([i == j for i, j in zip(target, val)])
        if c > score:
            best = i
            score = c
    return best, score


target = "Hello"
mutationRate = 0.1
n = 50
population = [''.join(random.choices(string.ascii_letters, k=len(target))) for _ in range(n)]
print("The time now: ", time.asctime(time.localtime(time.time())))
initTime = time.time()
print("The population: ")
print(population)
print("\n Generations: ")
generations = 0
bestS, bestV = 0, ""
while generations < 1000:
    f_scores = [fitness(val, target) for val in population]
    pool = selection(population)
    generations = generation(pool, generations)
    bestVal, bestScore = evaluate()
    print("Gen: ", generations, population[bestVal], bestScore)
    if bestS < bestScore:
        bestV = population[bestVal]
        bestS = bestScore
    if bestScore == len(target):
        break
print("\n Best Match: ", bestV, bestS)
print("The time now: ", time.asctime(time.localtime(time.time())))
print("Total time taken: ", time.time() - initTime)

````

The output:
````bash
The time now:  Mon May 10 09:32:25 2021
The population:
['tlRWu', 'kBDkM', 'YxePb', 'TyYsM', 'UpmBu', 'yInSD', 'rOfLM', 'yLovB', 'vtMBA', 'LhVUL', 'TPFQv', 'xrBOZ', 'qHMdC', 'YSHlV', 'uyOLR', 'rTczE', 'aokjT', 'QvJvS', 'vffVO', 'eSnFy', 'IaBmO', 'zXkzL', 'IlYzI', 'DMEKO', 'sSFGW', 'aWlAm', 'QJFTH', 'ruKJl', 'SfGPJ', 'huOOi', 'OfNdu', 'UpqKP', 'JIYcg', 'UJorD', 'MJZro', 'NGGcU', 'MQQKs', 'twSRo', 'EueKl', 'umvDz', 'iDNrM', 'MjbON', 'Hzyht', 'Onrls', 'bUgSl', 'bhZPk', 'fnSXd', 'xvgmz', 'AvjNj', 'etFMZ']
 Generations:
Gen:  1 HzZro 2
Gen:  2 Hzylo 3
Gen:  3 Hzrlo 3
Gen:  4 HJrlo 3
Gen:  5 HAHlo 3
Gen:  6 Hzylo 3
Gen:  7 HeHlo 4
Gen:  8 HeHlo 4
Gen:  9 HeUlo 4
Gen:  10 HeDlo 4
Gen:  11 HeHlo 4
Gen:  12 HeUlo 4
Gen:  13 HeUlo 4
Gen:  14 HeHlo 4
Gen:  15 HeBlo 4
Gen:  16 HePlo 4
Gen:  17 Heplo 4
Gen:  18 Hemlo 4
Gen:  19 HeKlo 4
Gen:  20 HeHlo 4
Gen:  21 HeYlo 4
Gen:  22 HeRlo 4
Gen:  23 HeYlo 4
Gen:  24 Hello 5
 Best Match:  Hello 5
The time now:  Mon May 10 09:32:25 2021
Total time taken:  0.0304110050201416
````

You can see that the algorithm took only 0.03 s to compute the output.

We have successfully dissected and coded an EA. Our monkey finally learned to say 'Hello'.

Yay! 🥳

You can try running this code [here](https://replit.com/@tvashta/Evolutionary-Algorithms#main.py)

Oh, and just in case you were wondering the real life effects of this thought experiment. In 2002, the University of Plymouth MediaLab Arts course studied the literary output of real monkeys. 

Well, monkeys are monkeys after all. Not only did they produce 5 pages of the letter S, they started pounding the keyboard with a stone. The director of the university's Institute of Digital Arts and Technology (i-DAT), said that monkeys:

> "are not random generators. They're more complex than that. ... They were quite interested in the screen, and they saw that when they typed a letter, something happened. There was a level of intention there."

You can have look at the monkey's work [here](https://web.archive.org/web/20090318143423/http://www.vivaria.net/experiments/notes/publication/NOTES_EN.pdf).

### Some fascinating outcomes of EA
Evolutionary Algorithms are basically a means of asking the computer to think. Sometimes these have given rise to some totally out-of-the-box solutions. Have a look at some of these. 

These made me gape in awe!

![walk-without-legs](/engineering-education/introduction-to-evolutionary-algorithms/EA.gif)

Source: [Robots that can adapt like animals: Cully A, Clune J, Tarapore D, Mouret JB](https://goo.gl/9cwFtw)

Happy coding!

### References
- [Painting Mona Lisa using Translucent Polygons](https://rogerjohansson.blog/2008/12/07/genetic-programming-evolution-of-mona-lisa/)
- [Flexible muscle-based locomotion for bipedal creatures - Video](https://www.youtube.com/watch?v=pgaEE27nsQw) 
- [Flexible muscle-based locomotion for bipedal creatures - Research Paper](https://www.cs.ubc.ca/~van/papers/2013-TOG-MuscleBasedBipeds/2013-TOG-MuscleBasedBipeds.pdf)
- [Genetic Cars](https://rednuht.org/genetic_cars_2/)
- [Genetic Walkers](https://rednuht.org/genetic_walkers/)
- [Some Out-of-the-box solutions by AI and EA](https://arxiv.org/pdf/1803.03453.pdf)

---
Peer Review Contributions by: [Willies Ogola](/authors/willies-ogola/)

---
layout: engineering-education
status: publish
published: true
url: /implementation-of-fuzzy-logic-in-matlab/
title: Implementing Fuzzy Logic in Matlab
description: This tutorial will guide the reader on how to implement fuzzy logic using Matlab. Fuzzy logic is a way to model logic reasoning where a statement's truth value cannot be true or false, but a degree of truth ranges from zero to one, where zero is absolutely false, while one is true.
author: collince-odhiambo
date: 2021-10-06T00:00:00-03:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementation-of-fuzzy-logic-in-matlab/hero.jpg
    alt: Fuzzy Logic in Matlab Hero Image
---
Fuzzy logic is a way to model logic reasoning where a statement's truth value cannot be true or false, but a degree of truth ranges from zero to one, where zero is absolutely false, while one is true.
<!--more-->
This fuzzy logic is for modeling the fuzzy inference system that maps the input to a set of outputs using human-interpretable rules more than extract mathematics.

The primary use of these types of applications is in control systems; where you feed in the references and the inputs while producing actuating rule-based signals on fuzzy logic.

Generally, fuzzy logic is not a control system, but you can use it in any set of applications that requires decision-making.

For example, in the banking system, the risk of lending a loan is based on personal and financial information.

It can also be used to detect edges in images by calculating the degree of a pixel belonging to a region of uniform intensity versus edge region.

This article will look at how to apply this in Matlab using the fuzzy logic toolbox.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](/engineering-education/getting-started-with-matlab/) basics.
- [Overview](/engineering-education/an-overview-of-fuzzy-logic-system/) of fuzzy logic
- [Fuzzy logic operation](/engineering-education/fuzzy-logic-operations/)

### Overview of the fuzzy logic
Developing a fuzzy logic system does not require a complex model. It works well for a complex system whose underlying mechanisms are not fully known.

As long as you have some experience and intuition about the system, you can create the rules and implement them.

A fuzzy inference system is a form of artificial intelligence that allows a computer to mimic the way humans approach solving problems.

For example, a person might say "I am pretty hungry, but it is almost dinner time". In this statement, "pretty hungry" and "almost dinner time" are two vague concepts.

What does it mean by "pretty hungry" and "almost dinner"? How long does he have to dinner?

A person will not have a problem passing these statements and waiting for dinner. It's all about the decision based on the experience with such statements.

On the other hand, it will be challenging to use the computer to determine whether the person should eat or wait for dinner; based on the "pretty hungry" and "almost dinner time" statements.

Fuzzy logic and ultimately fuzzy inference systems give us a way to encode experience-based knowledge in a way that the computer understands.

To understand what we mean here, let us explore the decision process that a banker might make to assess the risk of a loan.

A banker might use the existing knowledge and experience found in the rules to solve the problem.

The values, for example, may be, if a person has good credit, then the applicant has deemed the low risk, and if they have a neutral credit, then they have a medium risk, and lastly, if the credit is bad, then they have a high risk.

In this way, you have developed the rules over time based on experience, and data encodes knowledge for predictions.

Suppose you want to come up with a function that can access risk automatically.

In that case, it will make sense to decide based on the existing knowledge rather than developing a mathematical model of something as complex as human finance.

But, there is difficulty with this. It is because of encoding of our experience in a vague language.

For example, what does it mean by a good credit score? Anything above `750` is good, while anything below `750` is bad.

We can set up an equation that compares the credit value to `750` as shown below:

```matlab
%This is not a real code but just to make you understand
if credit >= 750
return "credit is good"
else
return "credit is medium"
```

The statement above is a logical statement. It means that it is either entirely true or false.

The equation that we set up makes this problem easy to solve. However, the issue is the linguistic term that we describe the degree of something as fuzzy i.e. language is not precise.

Making this language precise, we lose some intent.

A score of `750` might be considered good, very good, or neutral to different bankers.

So, if we want to encode the knowledge to the banking industry, we need to consider the fuzziness, which is where the fuzzy logic comes in.

![fuzzy concept](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_one.png)

_Figure 1.0 Flow chart for the fuzzy logic_

As shown in the diagram above, you convert the input to a fuzzy output based on certain rules. This process is known as fuzzification.

You apply the fuzzy logic rules to the fuzzy variables to create a new fuzzy number.

Finally, you convert the fuzzy number back to a crisp. Specific output is called fuzzification.

### Fuzzy logic approach
Suppose we poll 100 bankers and ask them to assign the transition from bad to neutral credit, and change from neutral to good.

In this case, there is going to be a different value for this.

Let us assume that every banker thought `750` and above is good credit, but only half thought `700` was good, and none thought `650` was good. Opinions and thoughts differ!

It all traces out the particular membership function for good credit. We can do the same for neutral credit and bad credit.

Here, we will end up with three overlapping membership functions.

![fuzzy logic](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_two.png)

_Figure 2.0 The basic fuzzy concept_

We can see that the statement's truth does not belong to a single set, but can belong to multiple sets based on the degree of the truth.

### Implementing fuzzy logic in Matlab
Let's consider a very simple example.

We need to control the speed of a motor by changing the input voltage where a threshold (set point) is defined. If the motor runs fast for some reason, we need to slow it down by reducing the input voltage.

Conversely, if the motor slows below the threshold (set point), the input voltage must be increased so that the motor reaches the set point.

Below is the description for the inputs that define the rules:
- `Too slow` will be for the description of the first curve
- `Just right` for the second curve
- `Too fast` for the third input curve.

For these inputs, the output would be `Less voltage (slow down)` for the first curve, `no change` for the second curve, and `More voltage (speed up)` for the third curve.

We shall see how to combine the inputs and the output statements to form the rules.

The rules base are:
- If the motor is running too slow, then more voltage.
- If the motor speed is right, then no change.
- If the motor speed is too fast, then the voltage is less.

We will define all these in a fuzzy system and create a file for this. The first step is to open the fuzzy logic toolbox.

To do this, execute the `fuzzy` command to display a new window as shown:

![fuzzy toolbox](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_three.jpeg)

_Figure 3.0 This is the fuzzy toolbox_

Here, we have three blocks: input, Mamdani, and output that carries out various processes.

In the input, we accept data for the fuzzification process. The output section displays the output results; acts as a defuzzification.

The meaning of fuzzification and defuzzification is still the same as that explained in the overview section.

Finally, the Mamdani is for the rule-based block that helps you define rules in this box.

Double-click on the input to open up a window as shown below:

![input window](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_four.jpeg)

_Figure 4.0 This is the input section for inputting your variables_

Here, we have three inputs `mf1`, `mf2`, and `mf3`.

> NOTE: You can rename these variables by deleting the current name, replacing it with the proper name, and click `enter`.

For example, changing our `mf1` to `slow`, the output would be:

![renaming](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_five.jpeg)

_Figure 5.0 Renaming the variables to make sense_

You can do the same for other inputs and curves.

Let us now define our speed in the range box.

For example, let's say that our speed ranges from `0` to `100`. We will change the `[0 1]` vector to `[0 100]` as shown in `figure 1.0`.

We can have `n` number of rules for the `n` members of a function.

For simplicity, we will take this number of membership functions to be `3`.

> If we keep increasing the member's frequency, the number of rules will keep increasing.

So, let's say the slow ranges from `0` to `50`.

Click on that curve, and the `params` box to change the existing vector to `[0 0 50]`.

The same applies to all other inputs.

The second input is renamed to `right`, which means right speed. The range of the speed is between `50` and `100`. So the vector for `right` will be `[0 50 100]`.

The last input should be named `high` for high speed, and the range should be between `100` and above. The vector for this is `[50 100 100]`.

Having `[0 5]` as the range:
- `mf1` renamed as `down` ranges from `0` to `2.5` given as `[0 0 2.5]`
- `mf2` renamed as `no change` ranges from `2.5` to `5.0` given as `[0 2.5 5.0]`
- `mf3` renamed as `high` is `5` and above given as `[2.5 5 5]`.

It means that if the output voltage falls in `mf1`, the speed is low, and it should be increased.

When the volts are within the `mf2` range, the speed is right, and no action is required, but if it falls in `mf3`, the speed is high and must be slowed down.

Once again, select the input and rename it from `input1` to `speed` and `output1` to `voltage` to avoid any confusion.

Now, let's define our rule-based double-click on the `Mamdani`.

The good thing is that all the rules are already aligned, and all you need to do is choose the corresponding output.

![definning the rules](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_eight.jpeg)

_Figure 6.0 Defining the fuzzy rules for the motor_

You need to click on the input and the corresponding output to make the rules.

![defined rules](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_eleven.jpeg)

_Figure 7.0 The finally defined rules_

After defining the rules, close and save your file.

To save, click on the file in the toolbar and select `save`. This file is saved as `.fis` which stands for fuzzy inference system.

We want to call this file into Matlab to find the output voltage for any input speed.

For example, the `test` variable holds the value of the `readfis` function that read the data from the file. To do it, you execute the code shown below:

```matlab
test = readfis('filename')
```

After reading it, we can now evaluate it using the `evalfis` function. For instance, if we have 40 revolutions, what will be the output voltage? This evaluation is as shown below:

```matlab
evalfis(40, test)
```

This will give an equivalent output of `2.5526` as shown below:

![output from evaluation](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_ten.jpeg)

_Figure 8.0 The final output_

We can also see the variation of the voltage to speed. You do this using the `surfview` function, and the variation is as shown below:

![variation of voltage](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_nine.jpeg)

_Figure 9.0 Testing the functionality of our model_

### Conclusion
Fuzzy logic is basically for making models that can act like a human being. The good thing about fuzzy logic is that you don't need complex mathematics to create your model. You should base the rules on the existing ones.

As we have seen, the toolbox is not that complex because you are just required to put your input and expect the corresponding output.

You can read more about Fuzzy logic [here](https://www.mathworks.com/help/fuzzy/getting-started-with-fuzzy-logic-toolbox.html).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

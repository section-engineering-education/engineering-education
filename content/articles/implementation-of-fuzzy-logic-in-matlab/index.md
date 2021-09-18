### Implementation of fuzzy logic in Matlab
### Introduction
Fuzzy logic is a way to model logic reasoning where the statement's truth is not binary true or false, but a degree of truth ranges from zero to one. In this case, zero is referred to as absolutely false while one is true. This fuzzy logic is for modelling the fuzzy inference system, which is a function that maps the input to the set of output that uses the human-interpretable rules more than extract mathematics. The primary use of these types of applications is in control systems. You feed in the reference and the inputs, and it produces actuating signals using rules based on fuzzy logic.

Generally, fuzzy logic is not a control system, but you can use it in any set of applications that requires decisions. For example, applying it in a banking system decides the risk of lending a loan based on personal and financial information. Beyond that, you can also use it to answer questions useful for any number of applications. For example, you can use it to detect edges in images by answering the question to what degree a pixel belongs to a region of uniform intensity versus edge region. This article will look at how to apply this in Matlab using the fuzzy logic toolbox in Matlab.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Overview of the fuzzy logic
Developing a fuzzy logic system does not require a model. It means it works well for a complex system whose underlying mechanisms are not fully known. As long as you have some experience and intuition about the system, you can create the rules and implement them.

A fuzzy inference system is a form of artificial intelligence in that it allows the computer to mimic the way humans think about and approach solving problems. For example, a person might say, "I am hungry, but it is almost dinner time". In this statement, "pretty hungry" and "almost dinner time" are two vague concepts. What does it mean by "pretty hungry" and "almost dinner"? How long does he have to dinner?

A person will have no problem passing these statements and deciding to wait until dinner or not. You base the decision on the experience with such statements. Also, we know hunger and mealtime that we can use to help us. On the other hand, it will be challenging to use the computer to determine whether the person should eat or wait for dinner based on the "pretty hungry" and "almost dinner time" statements.

Fuzzy logic and, ultimately fuzzy inference systems give us a way to encode experience-based knowledge in a way that the computer can understand in the form of logical rules. To understand what we mean here, let us explore the decision process that a banker might make to assess the risk of a loan. A banker might use the existing knowledge and experience found in the rules to solve the problem.

The values, for example, maybe, if a person has good credit, then the applicant has deemed the low risk, and if they have a neutral credit, then they have a medium risk and lastly if the credit is bad, then they have a high risk. In this way, you have developed the rules over time based on experience, and data encodes knowledge for predictions. Suppose you want to come up with a function that can access risk automatically. In that case, it will make sense to base it on the existing knowledge rather than developing a mathematical model of something complex as human finance. But, there is difficulty with this. It is because of encoding of our experience in a vague language. For example, what does it mean by a good credit card? You can define it as 750 and above, and anything below this is a medium credit. After this, we can set up an equation that compares the credit value to 750. for example
```matlab
%This is not a real code but just to make you understand
if credit >= 750
return credit is good
else
credit is medium
```
The above is a logical statement. It means that it is either entirely true or not. The equation that we have set up makes this problem easy to solve, but the issue is the linguistic term that we use to describe the degree of something is fuzzy; that is, language is not precise. Making this language precise, we lose some intent. How?, Now a score of 750 might be considered good, very good or neutral to different bankers. So if we want to encode the knowledge to the banking industry, we need to consider the fuzziness, which is where the fuzzy logic comes in.

![fuzzy concept](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_one.png)
*Figure1.0 Flow chart for the fuzzy logic*

As shown in the diagram above, you convert the input with precise value with a particular rating to fuzzy variables with fuzzy logic. This process is known as fuzzification. Then, you apply the fuzzy logic rules to the fuzzy variables to create a new fuzzy number. Finally, you convert the fuzzy number back to a crisp, specific output in a process called fuzzification.

### Fuzzy logic approach
Suppose we poll 100 bankers and ask them to assign the transition from bad to neutral credit and change from neutral to good. More than likely, in this case, there are going to be a different value for this. Let us assume that every banker thought 750 and above is good credit, but only half thought 700 was good, and none thought 650 was good. It traces out the particular membership function for good credit. We can do the same for neutral credit and bad credit. Here, we will end up with three overlapping membership functions.

![fuzzy logic](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_two.png)
*Figure2.0 The basic fuzzy concept*

Now, we can see that the statement's truth does not belong to a single set but can belong to multiple sets based on the degree of the truth.

### Implementation of the fuzzy logic in Matlab
Consider a very simple example;
We need to control the speed of a motor by changing the input voltage when a set point is defined. If the motor runs fast for some reason, we need to slow it down by reducing the input voltage. Conversely, if the motor slows below the set point, the input voltage must be increased so that the motor reaches the set point.
Below are the description for the inputs. These will help in defining the rules.
`Too slow` 
Just right
Too fast
The statements are self-explanatory.
let the output action words be;
Less voltage(slow down)
No change
More voltage(speed up)
The words in the bracket explain the action that the output. We shall see how to combine the inputs and the output statements to form the rules.

The rules base are;
1. if the motor is running too slow, then more voltage.
2. If the motor speed is right, then no change.
3. If the motor speed is too fast, then the voltage is less.

We will define all these in a fuzzy system and create a file for this. The first step is to open the fuzzy logic toolbox. To do this, execute the `fuzzy` command in the command window. When you open the logic toolbox, a new window shown below will pop up.

![fuzzy toolbox](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_three.jpeg)
*Figure3.0 This is the fuzzy toolbox*

Here, we have three blocks, is, input, Mamdani and output. In the input, this is where we input our data and for the fuzzification process. The output section, which displays the output results, acts as a defuzzification. Finally, the Mamdani is for the rule-based block. What it means is that you define your rules in this box. Now double-click on the input to open it up. When you do so, a window shown below opens up.

![input window](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_four.jpeg)
*figure4.0 This is the input section for inputing your variables*

Here, we have three inputs `mf1`, `mf2` and `mf3`. We should now change these names according to our inputs so that they can make sense. Note that you do the renaming independently. To do it, click on the box with the current name, delete it, replace it with the name you want it to be, and click `enter`. For example, changing our `mf1` to `slow`, and the output is below.

![renaming](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_five.jpeg)
*figure5.0 Rename the variables to make sense*

Apply the same process for all the inputs. You just click on the curve and then rename it. Now back to our first input, `slow`. Let us now define our speed. It is done on the range box. Let's say that our speed ranges from 0 to 100, for example. So we will change the `[0 1]` vector to `[0 100]` as shown in `figure1.0`.
We can have `n` number of rules for the `n` numbers of members of function, but for the case of simplicity, we will take these number of membership functions to be three. If we keep increasing the member's frequency of corresponding, the number of rules will keep increasing. So we let's say our slow ranges from 0 to 50. Click on that curve, and the `params` box, change the existing vector to `[0 0 50]`. The same applies to all other inputs. The second input rename to `right`, which means right speed. The range of the speed is between 50 and 100. So the vector will be `[0 50 100]`. The last input should be named `high` for high speed, and the range should be between 100 and above. The vector for this is `[50 100 100]`.

Now, To make the changes on the output, click on the output and modify. You can rename the inputs to any name that make sense to you. Our output parameters are the voltages. Now for the range, we have `[0 5]` as the range. The `mf1` renamed as `down` range from 0 to 2.5 given as `[0 0 2.5]`, `mf2` renamed as `nochange` ranges from 2.5 to 5.0 given as `[0 2.5 5.0]` and lastly `mf3` renamed as `high` is 5volts and above given as `[2.5 5 5]`. It means that if the output voltage falls in `mf1`, the speed is low, and it should take action. And when the volts is within the `mf2` range, the speed is right, and no action is required, but if it falls in `mf3`, the speed is high, and action is required. Once you do this, click on the close. 

Once again, select the input and rename it from `input1` to `speed` and `output1` to `voltage` to avoid any confusion. Now, let us define our rule-based double-click on the `Mamdani`. The good thing is that all the rules are already aligned, and all you need to do is choose the corresponding output.

![definning the rules](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_eight.jpeg)
*figure6.0 Defining the fuzzy rules for the motor*

You need to click on the input and the corresponding output to make the rules.

![defined rules](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_eleven.jpeg)
*Figure7.0 The finally defined rules*

After defining the rules, close and save your file. To save, click on the file in the toolbar and select save. This file is saved as `.fis` which stands for fuzzy inference system.

We want to call this file into Matlab and find the output voltage for any input speed. We assign this file to a variable, for example, `test` and use the `readfis` function to read this file. To do it, you execute the code shown below;
```matlab
test = readfis('filename')
```
After reading it, we can now evaluate it using the `evalfis` function. For example, if we have 40 revolutions, what will be the output voltage? This evaluation is as shown below.
```matlab
evalfis(40, test)
```
This will give an equivalent output of 2.5526 as shown below;

![output from evaluation](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_ten.jpeg)
*figure8.0 The final output*

We can also see the variation of the voltage to speed. You do this using the `surfview` function, and the variation is as shown below.

![variation of voltage](/engineering-education/implementation-of-fuzzy-logic-in-matlab/fuzzy_nine.jpeg)
*figure9.0 Testing the functionality of our model*

For more information about the fuzzy logic, you can check [here](https://www.mathworks.com/help/fuzzy/getting-started-with-fuzzy-logic-toolbox.html). You can also get to understand more about this topic in the links below

https://www.section.io/engineering-education/an-overview-of-fuzzy-logic-system/
https://www.section.io/engineering-education/fuzzy-logic-operations/

### Conclusion
Fuzzy logic is basically for making models that can act like a human being. The good thing about fuzzy logic is that you don't need complex mathematics to create your model. You should base the rules on the existing ones. It makes it easy to use. As we have seen, the toolbox is not that complex cause you are just required to put your input and the expected corresponding output, and Matlab does the rest. The model can be used to evaluate more and more such problems, and that's an added advantage.

Happy coding!

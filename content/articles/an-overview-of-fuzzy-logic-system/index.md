---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-fuzzy-logic-system/
title: An Overview of Fuzzy Logic System
description: This article will provide an overview on fuzzy logic and how it is implemented. We will go over some real-life applications and explains why it is used.
author: onesmus-mbaabu
date: 2020-12-22T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-fuzzy-logic-system/hero.jpg
    alt: Fuzzy Logic example image
---
Decision-making is an integral aspect of our daily lives. It is hard to establish whether a certain statement (or state) is true or false in certain situations. In such situations, fuzzy logic can be used to offer flexibility in reasoning, given the uncertainty. 
<!--more-->
Fuzzy logic systems are used in automobile and domestic applications to control actions and processes. This article provides an overview of this logic and how it is implemented. It also highlights its real-life applications and explains why it is used.

### What is fuzzy logic?
Fuzzy means uncertain, indefinite, vague, or unclear. Fuzzy logic is a computing technique that is based on the degree of truth. A fuzzy logic system uses the input's degree of truth and [linguistic variables](https://www.igi-global.com/dictionary/granular-computing/17211) to produce a certain output. The state of this input determines the nature of the output.

This technique is different from [*boolean logic*](https://www.bbc.co.uk/bitesize/guides/zc4bb9q/revision/1), which uses only two categories (true or false). In *boolean logic*, two categories (0 and 1) are used to describe objects. For example, the temperature in water served in glass may be *High* (1) or *Low* (0). The water is described using more categories in fuzzy logic, but within the two categories mentioned earlier. In this case, the water may be *very cold*, *very warm*, or *warm*.

Let's take another simple example. Suppose we have a question that we need to answer. In *boolean logic*, the answer would be either *yes* or *no*. In fuzzy logic, the answer may be between these two categories. Some of the probable answers in this logic may include *possibly yes*, *possibly no*, or *certainly no*. 

We learn that fuzzy logic systems use degrees of possibilities rather than precise categories in the above two examples. These are used to generate an explicit output. 

### Why fuzzy logic is used
- It solves the problem of uncertainty in the engineering field.
- When accurate reasoning is not available, it provides an accurate level of reasoning.
- Fuzzy logic has a simple structure that is easy to understand.
- It is an effective way of controlling machines. 
- It provides solutions to various industrial problems (especially decision making).
- It requires little data to be executed.

### Fuzzy logic architecture
The following diagram shows a fuzzy logic architecture. 

![Architecture of Fuzzy Logic System](/engineering-education/an-overview-of-fuzzy-logic-system/architecture-of-fuzzy-logic-system.png)

[Image Source: Javat Point](https://static.javatpoint.com/tutorial/fuzzy-logic/images/architecture-of-fuzzy-logic-system.png)

The fuzzy logic architecture consists of the following components:

- **Rule Base:** This contains the rules and membership functions that regulate or control decision-making in the fuzzy logic system. It also contains the IF-THEN conditions used for conditional programming and controlling the system. 
- **Fuzzifier:** This component transforms raw inputs into fuzzy sets. The fuzzy sets proceed to the control system, where they undergo further processing. 
- **Inference Engine:** This is a tool that establishes the ideal rules for a specific input. It then applies these rules to the input data to generate a fuzzy output. 
- **Defuzzifier:** This component transforms the fuzzy sets into an explicit output (in the form of crisp inputs). Defuzzification is the final stage of a fuzzy logic system. 
  
### Fuzzy logic membership function
A membership function is a graphical representation of a fuzzy set. It shows how values ranging between 0 and 1 are mapped to inputs. Inputs are generally represented as Universe (U). The membership function for a given fuzzy set is in the form: $$\mu_{A}:X\rightarrow [0, 1]$$ Where A is a fuzzy set and X is the Universe. 

Any value within the range of 0 to 1 indicates a degree of membership. Each element of the Universe (X) is given a specific degree of membership.

In simple terms, the membership function is used to estimate or compute the degree of membership of a certain input element in a specific fuzzy set. The Universe is on the x-axis, while the degrees of membership are on the y-axis. 

The following diagram shows an example of a membership function.

![Membership Function](/engineering-education/an-overview-of-fuzzy-logic-system/membership-function.jpg)

[Image Source: Tutorials Point](https://www.tutorialspoint.com/artificial_intelligence/images/membership_function_ac.jpg)

### Implementation of fuzzy logic (algorithm)
The fuzzy logic technique can be implemented in various systems (hardware and software). A simple, practical example of a fuzzy logic system can help us understand how fuzzy logic is implemented. 

Suppose we want to design a fuzzy logic system for an air conditioner. The fuzzy logic system ensures that the air conditioner sets the desired temperature. If there is a disparity between the desired temperature and the room temperature, the air conditioner will employ the fuzzy logic to adjust the temperature to the desired value. 

The following are the main algorithmic steps for fuzzy logic.

**Step 1:** We should first define the linguistic terms (or variables). In Boolean logic, the temperature can be categorized into two main categories: hot and cold. 

In a fuzzy logic system, we can use linguistic terms to describe different categories of temperature. Some of the linguistic terms used in our case include *very cold*, *hot*, *very warm*, *warm*, *cold*, and *very hot*. Temperature can be termed as a fuzzy set `t` consisting of the aforementioned linguistic terms. 

**Step 2:** After defining the linguistic terms, we should create membership functions. This step involves providing a graphical representation of our fuzzy set (t). The input temperature is on the x-axis, while the degrees of membership are on the y-axis. 

The membership function computes the degrees of membership of various temperature elements. 
  
**Step 3:** In the third step, we will construct rules for controlling the air conditioner's temperature. Here, we can apply the IF-THEN logic to set effective rules. For example, the following IF-THEN conditions can be made.
- IF the room temperature is very cold, and the desired temperature is very warm, THEN *heat*. 
- IF the room temperature is very hot, and the required temperature is cold, THEN *cool*. 
- IF the room temperature is warm, and the required temperature is warm, THEN *no action* should be taken.

In the three IF-THEN conditions, *heat, cool*, and *no action* represent the actions that need to be taken after the IF-THEN conditions have been met.

**Step  4:** After setting the system's rules, the fuzzifier uses them to transform the raw input into fuzzy sets. This is done through fuzzy operations (e.g., Max and Min). These fuzzy sets are used to generate a membership function output. 
  
**Step 5:** Defuzzification: This is the last algorithm step. In this step, the defuzzifier uses the membership function to establish the output temperature. 
 
### Applications of fuzzy logic
#### Automobile industry
Automobile companies use fuzzy logic systems in cars to prevent a collision. Fuzzy logic regulates the braking system using input elements such as momentum, speed, and acceleration. 

Car manufacturers also use this system to regulate fuel injection. This is done using input elements such as load capacity, engine RPM, and temperature.

#### Aviation industry
Aircrafts use this technique to maintain a certain level of altitude. IF-THEN conditions are applied to ensure that the aircraft performs corrective measures if it is not within the desired altitude. For example, if the desired cruising altitude is 40,000 ft above the sea level, the fuzzy logic will enable the aircraft to return to this level if it goes above or below it. 

#### Domestic applications
Fuzzy logic is used in various domestic applications such as air conditioners, televisions, vacuum cleaners, and refrigerators. It's also used in washing machines to control water intake, washing, spin speed, and the time spent in washing. 

The input elements include the size of clothes, type of dirt, and dirt level (degree). If the clothes are large and greasy, the washing machine will allow a large amount of water from the tap. The machine will take a long time to wash these clothes because of the large size of the clothes and the nature of the dirt. 

### Limitations of fuzzy logic
- It does not recognize patterns relating to machine learning.
- It is hard to set concrete rules for a specific problem. 
- The validation of a fuzzy logic system requires thorough testing.
- It uses imprecise data, which may sometimes make it generate inaccurate results. 
  
### Conclusion
Fuzzy logic is an effective tool for solving various computing problems in the world. This technique has been applied in different machines and applications to control actions based on certain pre-defined conditions. In the future, fuzzy logic will be applied to diverse products and systems. The scope of fuzzy logic applications will increase due to technological advancement and digital transformation. 

### Resources
- [Math Works](https://www.mathworks.com/help/fuzzy/what-is-fuzzy-logic.html)

- [Science Direct](https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/fuzzy-logic)

- [IGI Global](https://www.igi-global.com/dictionary/granular-computing/17211)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

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
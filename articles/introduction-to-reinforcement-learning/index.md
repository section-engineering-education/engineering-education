---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-reinforcement-learning/
title: Understanding Reinforcement Learning
description:
author: srishilesh-p-s
date: 2020-10-07T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-reinforcement-learning/hero.png
    alt:
---
This article will serve as an introduction to Reinforcement Learning(RL). According to [Wikipedia](https://en.wikipedia.org/wiki/Reinforcement_learning), RL is a sub-field of Machine Learning (ML). That is concerned on how [agents](https://en.wikipedia.org/wiki/Software_agent) take actions in an environment to maximize a cumulative reward.
<!--more-->
### Table of Contents
1. Pre-requisites
2. Introduction
3. Key Concepts
4. Most used Reinforcement Learning Algorithms
5. Applications of Reinforcement Learning
6. Final Thoughts
7. References

### Pre-requisites
There are two main pre-requisites a reader would need before diving into this article:
- Basic Machine learning knowledge.
- Knowledge in Linear Algebra, Multivariable Calculus, and Probability and Statistics.

### Key Concepts
In RL we have key concepts or terms that we need to define. These include agents, state, action, rewards and the environment.

1.	**Agent**
The agent decides on what action to take given an observation from the environment.
2.	**State**
The state represents the decision-making factors under consideration observed by the agent.
3.	**Action**
The agent selects an action which may change or affect the state and reward.
4.	**Reward**
A reward represents the gains and losses in network performance.  The reward is for taking a particular action on a particular state in the previous time instance.
5.	**Environment**
The environment is where the agent acts. On how the environment reacts to certain actions defined by a model, we may or may not know.

### Introduction
In Reinforcement Learning (RL), agents train to maximize the total rewards. This is because an RL agent is given rewards for all the correct moves it makes and punished for the wrong moves. This results in the agent trying to maximize on the right moves while minimizing the wrong moves.

RL programs learn to map situations to action taken in order to maximize on those rewards. This guides the agent by finding the (best) actions leading to the most rewards.

Let's consider a simple problem of a child learning to walk. This example will allow us to better understand reinforcement learning and its key concepts.

In our scenario, the child is an agent. Our environment is the ground in which the child walks on. By taking an action in this case, walking, the child tries to move from one state to another step by step. The child gets a reward (let's say a muffin) after taking a defined number of steps (task). The reward isn't awarded (given) to the child when it's not able to walk or preform the task well.

This is an simple example of a reinforcement learning problem.

![rl-architecture](/engineering-education/introduction-to-reinforcement-learning/rl-architecture.png)<br>

*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

### Most used Reinforcement Learning Algorithm
There are a couple of popular RL algorithms used in solving problems today. They include Q-learning, [Policy Gradients (PG)](/https://papers.nips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf/), and [Actor-Critics](/https://papers.nips.cc/paper/1786-actor-critic-algorithms.pdf/).

We will be going through these algorithms in a bit more depth.

#### Q-learning
Q-learning is the most popular among the RL algorithms.

This algorithm finds an optimal action-selection policy by using a Q-function. By selecting the best of all possible actions, the algorithm is able to maximize the value function, Q.

![q-learning](/engineering-education/introduction-to-reinforcement-learning/q-learning.PNG)

*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

The Q-function takes in the state (s) and action (a) as its inputs.

The Q-table stores the resulting Q values obtained from the output of the Q-function.

The first action performed by the agent is completely randomized. This is because the Q-values are set to zero in the beginning.

Values in the Q-table are then updated for each state-action pair. The process continues until the function Q converges to Qnew.

**Discount factor**, usually denoted by the gamma parameter, this is a real value ranging from 0 to 1. It tells how important future rewards are to the current state.

If the discount factor is set to 0.1, the agent will only learn about actions that produce immediate rewards. But, setting it to 0.9 will prompt the agent to check each of its actions based on the sum total of all its future rewards.

**Learning rate (lr)** is also referred to as the step size. It determines how much new information it accepts over the old information.

There is a need to balance the agent's exploration and exploitation efforts. This is because the agent must take random actions which ought to bring greater returns in the long run.

Without this balance, the agent might opt for an immediate reward every time. The [epsilon-greedy algorithm](https://www.geeksforgeeks.org/epsilon-greedy-algorithm-in-reinforcement-learning/) achieves this balance. The agent will exploit the knowledge it has already gathered instead of exploring.

That's Q-learning in a nutshell.

#### Policy Gradients (PG)
Alongside Q-learning, the Policy Gradient method is another type of reinforcement learning technique.

Policy Gradients have a separate objective from Q-learning. 

* Q-learning predicts q-values rather than predict what actions to take. Policy Gradients deal directly with choosing actions. They learn policies directly from data thus no need of computing values for each state. The policy network returns a matrix of probabilities for taking each possible action.

Mathematically, this policy is represented by π (s|a).

* Q-learning does not work with large or continuous action spaces. We would need an infinitely large Q-table to keep track of all the Q-values. Thus are only suitable for estimating values on a finite number of states and actions space. Policy Gradients work well on large and continuous action spaces. This makes them ideal for handling high dimensional continuous action spaces where Q-learning cannot.

This technique works by:
1. A random policy (π) is first selected.
2. Some actions are then sampled from the environment.
3. Probability is increased for taking actions whose rewards are better.
4. Probability is reduced for taking actions whose rewards are worse.

It's as simple as that.

They are of two types:

**Stochastic Policy Gradients (SPG)**
They integrates over both the state and action spaces.

**Deterministic Policy Gradients (DPG)**
They integrates over only the state spaces.

Due to these differences, SPG may need more samples to compute in cases of high dimensions action spaces.

#### Actor-Critics (AC)
![actor-critic](/engineering-education/introduction-to-reinforcement-learning/actor-critic.png)

*[Image Source: Berkeley](http://rail.eecs.berkeley.edu/deeprlcourse-fa17/f17docs/lecture_5_actor_critic_pdf)*

Actor-Critics (AC) method consists of two separate models as shown above: 
1. An Actor
2. A Critic

**Actor**
The actor model takes in the current environment state, determines and outputs the desired action.

**Critic**
The critic takes plays the evaluation role. It takes in the environment state and the action (from the actor model) returning a score that tells us how good the action is for the state. This returned score is the Q-value.  

This is the idea behind Actor Critics models.

Let's consider an example that demonstrates the actor critic network.

Let's take the examples of a child playing in the backyard with the parent monitoring the child. The child is playing, running around exploring all options in this environment. The child can play in the durt, ride the swing, play with water etc. The role the parent plays is to monitor the child and either criticize or reward it's actions. Always taking the environment into account. 

AC are advantageous compared to PG methods. They tend to need much less training time compared to PG methods.

Some typical use cases of AC models are in the fields of biology and psychology.

### Applications of Reinforcement Learning
#### Games
The use of AI in computer games has been on the increase over the past couple of years.

In 2016, Deepmind Technologies built [AlphaGo](/https://deepmind.com/research/case-studies/alphago-the-story-so-far/). An RL controlled computer program that plays the board game, Go (an ancient Chinese board game). 
AlphaGo contains two networks:
1. A Policy Network which is trained on high level games to immitate the best players. 
2. A Value network which evaluates the current board position and establishes the probability of winning in that position.

The computer program was able to beat Lee Sedol, a human professional Go champion 4-1 in a 5 match game.

Later versions of AlphaGo such as AlphaGo Zero and MuZero became even more powerful. They were completely self-taught using RL. This was significant as they were learning to play games without being taught the game rules.

For a deeper understanding of the AlphaGo story, watch its [full documentary](/https://www.youtube.com/watch?v=WXuK6gekU1Y&t=788s/)

#### Robotics
In industries, RL-controlled robots are used to perform various tasks. 

For example, at Google's DeepMind, they developed an AI powered recommendation system. This system was meant to improve the energy efficiency of their data centre.
An AI robots was given control over their data center in order to manage part of its [cooling infrastructure](/https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/).

The AI robots exploits the RL technique, a similar approach to that used in AlphaGo, AlphaGo Zero and MuZero. This is by learning through trial and error.

The algorithm works by:
1. Taking snapshots of the data centre cooling system every five minutes.
2. Feeding the data collected into a neural network that predicts the future energy efficiency.
3. Actions that minimize energy are selected by the AI robot.
4. The optimal actions selected are implemented in the data centre.

The use of AI robots in their data center led to a decrease in energy spending by up to 40%.

#### Trading and Finance
RL agents are used to predict stock prices as well as predicting future sales. They can decide on whether to buy, hold or sell a particular stock.

Horizon's [Active AI Global ETF](/https://www.horizonsetfs.com/etf/mind/) & EquBot's [AI based ETF](/https://equbot.com/) are examples of RL softwares used in trade and finance.

Another great example is the IBM’s [financial trading platform](/https://www.ibm.com/blogs/research/2020/07/ibm-research-at-icml-2020/) which uses a RL agent for trading. It computes a reward based on the profit or losses made in every financial transaction.

### Final Thoughts
Reinforcement Learning is one of the most important subfield of Artificial Intelligence. Hopefully, this article has made you curious to dive deep into Reinforcement Learning.

If Machine Learning is still new to you, feel free to [download and read this e-book on Machine Learning](/https://books.google.co.ke/books?hl=en&lr=&id=u8OWDwAAQBAJ&oi=fnd&pg=PR6&dq=introduction+to+machine+learning&ots=huhHR1ZCOT&sig=9hlNXYWvRqWRJgY_6P_QurJn3ac&redir_esc=y#v=onepage&q=introduction%20to%20machine%20learning&f=false/).

### References
1.	Kaelbling, L. P., Littman, M. L., & Moore, A. W. (1996). Reinforcement learning: A survey. Journal of artificial intelligence research, 4, 237-285.
2.	Sutton, R. S., & Barto, A. G. (1998). Introduction to reinforcement learning (Vol. 135). Cambridge: MIT press.
3.	Szepesvári, C. (2010). Algorithms for reinforcement learning. Synthesis lectures on artificial intelligence and machine learning, 4(1), 1-103.
4.	Henderson, P., Islam, R., Bachman, P., Pineau, J., Precup, D., & Meger, D. (2017). Deep reinforcement learning that matters. arXiv preprint arXiv:1709.06560.
5.	François-Lavet, V., Henderson, P., Islam, R., Bellemare, M. G., & Pineau, J. (2018). An introduction to deep reinforcement learning. arXiv preprint arXiv:1811.12560.
6.	Arulkumaran, K., Deisenroth, M. P., Brundage, M., & Bharath, A. A. (2017). A brief survey of deep reinforcement learning. arXiv preprint arXiv:1708.05866.
7.	Arulkumaran, K., Deisenroth, M. P., Brundage, M., & Bharath, A. A. (2017). Deep reinforcement learning: A brief survey. IEEE Signal Processing Magazine, 34(6), 26-38.
8.	Watkins, C. J., & Dayan, P. (1992). Q-learning. Machine learning, 8(3-4), 279-292.
9. Dang, Q. V. (2019, December). Reinforcement Learning in Stock Trading. In International Conference on Computer Science, Applied Mathematics and Applications (pp. 311-322). Springer, Cham.

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

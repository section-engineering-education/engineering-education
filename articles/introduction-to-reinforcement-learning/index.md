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

It relies on optimizing policies in the long term cumulative reward.

They estimate their values on an infinite number of states and actions. This makes them suitable for handling high dimensional continuous action spaces.

They are of two types:

**Stochastic Policy Gradients (SPG)**
They integrates over both the state and action spaces.

**Deterministic Policy Gradients (DPG)**
They integrates over only the state spaces.

Due to these differences, SPG may need more samples to compute in cases of high dimensions action spaces.

#### Actor-Critics (AC)
![actor-critic](/engineering-education/introduction-to-reinforcement-learning/actor-critic.png)

*[Image Source: Berkeley](http://rail.eecs.berkeley.edu/deeprlcourse-fa17/f17docs/lecture_5_actor_critic_pdf)*

Actor-Critics (AC) method consists of two models: An Actor and A Critic.

The actor learns the policy function while the critic learns the value function. They tends to learn both the policy and the value function.  

The actor's role is to parameterize the selection of actions.
The critic's role is to criticize whether the actions performed by the actor are good or bad. The actor then updates its parameters based on the critic’s appraisal.

AC models tend to need much less training time compared to the PG methods.

We can typically see some of AC models being used in the fields of both biology and psychology.

### Applications of Reinforcement Learning
#### Games
The use of AI in building computer games has been increasing over the past couple of years.
This is because games (by their very nature) provide varying challenges. This allows RL algorithms to showcase their weaknesses and/or strengths by playing games.

In 2016, Deepmind Technologies built [AlphaGo](/https://deepmind.com/research/case-studies/alphago-the-story-so-far/). A RL controlled computer program that plays the board game, Go (an ancient Chinese board game). The computer program was able to beat Lee Sedol, a Korean Go world champion 4-1 in a 5 match game.

Later versions of AlphaGo such as AlphaGo Zero and MuZero became even more powerful. They were completely self-taught using RL. This was significant as they were learning to play games without being taught the game rules.


#### Robotics
RL robots control Google’s data center to manage part of its [cooling infrastructure.](/https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/)

The AI robots exploits a similar approach to that used in AlphaGo, AlphaGo Zero and MuZero. This is by learning through trial and error.

The algorithm worked by:
1. Feeding it information gathered from the cooling data centers.
2. Leaving it to determine which cooling configurations would reduce energy consumption.

Google’s data center energy spending reduced by up to 40%.

#### Trading and Finance
RL agents are used to predict stock prices as well as predicting future sales. They can decide on whether to buy, hold or sell a particular stock.

A great example would be the IBM’s financial trading platform which uses a RL agent for trading. It computes a reward based on the profit or losses made in every financial transaction.


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

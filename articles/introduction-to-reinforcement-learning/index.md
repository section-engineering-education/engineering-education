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
* Basic Machine Learning knowledge.
* Knowledge in Linear Algebra, Multivariable Calculus and Probability and Statistics.

### Introduction

Together with **Supervised Learning** and **Unsupervised learning**, **Reinforcement Learning** is also a sub-field of Machine Learning (ML). It is concerned with how agents take actions in an environment to maximize a cumulative reward.

In **Reinforcement Learning (RL)**, agents are trained to maximize the total rewards. To simply express this, an RL agent is given rewards for all the correct moves it makes and punished for the wrong moves. This results in the agent trying to maximize on the right moves while minimizing the wrong moves. 

According to [Richard S. Sutton and Andrew G. Barto,](/http://incompleteideas.net/book/RLbook2020.pdf/) they describe Reinforcement Learning as the process of "learning what to do". This is accomplished by mapping situations to action in order to fully maximize on rewards. They continue explaining by saying that since a learner (agent) is not guided on the specific action to take, finding the actions which are most rewarding should be its guiding factor.

Let's consider a simple problem of a child learning to walk to better understand reinforcement learning and its key concepts which we will explain in detail thereafter. 

In our scenario, the child is an **agent**. Our **environment** is the ground in which the child walks on. By taking an **action** in this case, walking, the child tries to move from one **state** to another step by step. The child gets a **reward** (let's say a muffin) after taking a defined couple of clearly defined number of steps (task). A **reward** isn't awarded to the child when it's not able to walk. 

This is an example of a simple reinforcement learning problem.

![rl-architecture](/engineering-education/introduction-to-reinforcement-learning/rl-architecture.png)<br>
*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

### Key Concepts
In RL we have key concepts that have to be defined. They include agents, state, action, rewards and the environment.
1.	**Agent** 
In Rl, the agent is the component which decides on what action to take given an observation or any clearly defined rules from the environment.
2.	**State**
The state represents the decision-making factors under consideration being observed by the agent.
3.	**Action**
An action represents an optimal action being selected by the agent, which may change or affect the state and reward.
4.	**Reward**
A reward in RL represents the gains and losses in network performance for taking a particular action on a particular state in the previous time instance.
5.	**Environment**
The environment is where the agent acts. As to how the environment reacts to certain actions is defined by a model which we may or may not know.

### Most used Reinforcement Learning Algorithm
There are a couple of RL algorithms used in solving problems today. They include Q-learning, [Policy Gradients (PG)](/https://papers.nips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf/) and [Actor-Critics](/https://papers.nips.cc/paper/1786-actor-critic-algorithms.pdf/). In this article, we will explain these three popular algorithms used to solve many RL problems. 

#### Q-learning (most popular).

Q-learning is the most popular among the RL algorithms. 

Q-learning is a value-based reinforcement learning algorithm used to find an optimal action-selection policy by using a Q-function. By selecting the best of all possible actions in the Q-table, the algorithm is able to maximize the value function, Q.

![q-learning](/engineering-education/introduction-to-reinforcement-learning/q-learning.PNG)
*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

The Q-function takes in the **state (s)** and **action (a)** as its inputs.

The resulting Q values which are obtained from the output of the Q-function are stored in a table known as a **Q-table** which is simply a table where the Q-values are stored.

As all the values in the Q-table are initially set to zero, this makes the first action the agent takes to be completely random. The values in the table are then updated iteratively for each state-action pair until the function Q eventually converges to Qnew.

**Discount factor**, usually denoted by the gamma parameter, is a real value ranging from 0 to 1. It tells how important future rewards are to the current state. 

For example, if the discount factor is set to 0.1, the agent will completely lack foresight and will only learn about actions that produce immediate rewards. On the other hand, setting it to 0.9 will prompt the agent to evaluate each of its actions based on the sum total of all its future rewards.

**Learning rate (lr)** can also be referred to as the step size. The learning rate determines how much information about the newly acquired value you accept over the old value. A step size of 1 will mean that new information has been gathered while that of 0 will mean that no new information has been gathered.
   
There is also a need to balance the agent's exploration and exploitation efforts as it must take random actions which ought to bring greater returns in the long run. Without this balance, the agent might just opt for an immediate reward every time. This is achieved by using the [epsilon-greedy algorithm](/https://jamesmccaffrey.wordpress.com/2017/11/30/the-epsilon-greedy-algorithm/).
The algorithm works in such a way that as the agent keeps progressing further and further into the particular task, it will lean more into exploiting the knowledge it has already gathered rather than investigating the environment. 

That's Q-learning in a nutshell. 

#### Policy Gradients (PG)

Value-based algorithms such as Q-learning have been applied to a wide range of task domains in solving many difficult problems. However, [as this paper suggests,](/https://www.researchgate.net/publication/228957531_Policy_Gradient_vs_Value_Function_Approximation_A_Reinforcement_Learning_Shootout/) drawbacks with value function approximation such as most implementations leading to deterministic policies even when the optimal policy is stochastic have led to probabilistic policies being ignored which would have led to superior performance in the model. 
An alternative reinforcement learning method that would bypass these limitations is a Policy Gradient method. 

Policy Gradient is a type of reinforcement learning technique which relies upon optimizing policies with respect to the long term cumulative reward by a process known as gradient descent. 

Compared to value-based functions which tend to be expensive computationally, policy gradients have an infinite number of states and actions to estimate values for hence suitable for continuous action spaces. 

#### Actor-Critics (AC)

![actor-critic](/engineering-education/introduction-to-reinforcement-learning/actor-critic.png)
*[Image Source: Berkeley](http://rail.eecs.berkeley.edu/deeprlcourse-fa17/f17docs/lecture_5_actor_critic_pdf)*

While Q-learning focuses on learning the value function, or learning of a policy directly as in Policy Gradients method, Actor-Critics (AC) method tends to learn both simultaneously  with the **Actor** learning the policy and the **Critic** the value function.

Actor-Critic methods consists of two models: An Actor and A Critic

The **actor's** role is to parameterize how actions are selected while the **critic's** role, just as its name suggests, is to criticize or rather, to evaluate the actions performed by the actor determining whether they are good or bad. The actor then updates its parameters based on the critic's appraisal.

AC models tend to require much less training time compared to the PG methods.

ACs methods has been used in the fields of both biology and psychology.

### Applications of Reinforcement Learning

#### Games
The use of AI for building computer games has been on the increase over the past couple of years. This is because games provide varying challenges producing situations where reinforcement learning algorithms are able to show their weaknesses and strengths.

In 2016, Deepmind Technologies, a UK based Artificial Intelligence and Research Company built [AlphaGo](/https://deepmind.com/research/case-studies/alphago-the-story-so-far/), an RL controlled computer program that plays the board game, Go (an ancient Chinese board game). The computer program was able to beat Lee Sedol, a Korean Go world champion 4-1 in a 5 match game.

Subsequent versions of AlphaGo such as AlphaGo Zero and MuZero became even more powerful as they were completely self-taught using RL without learning from human games and being taught the game rules respectively.

#### Robotics
At DeepMind Technologies, a London-based artificial-intelligence company Google acquired in 2014, gave AI robots, control over [Google’s data center to manage part of its cooling infrastructure.](/https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/) The AI robots exploits the reinforcement learning (RL) technique, a similar approach to that used in AlphaGo, AlphaGo Zero and MuZero which learns through trial and error. The algorithm was fed information gathered from the data centers and left to determine which cooling configurations would effectively reduce energy consumption. Google’s data center energy spending was found to have reduced by up to 40%.

#### Trading and Finance
[According to this paper,](/https://link.springer.com/chapter/10.1007%2F978-3-030-38364-0_28/) Reinforcement Learning has been used for predicting stock prices as well as predicting future sales. The RL agent can decide on whether to buy, hold or sell a particular stock. The RL model, usually a supervised time series model, is evaluated by using the current market bench mark standards in order to ensure that it’s operating optimally and to reduce the errors in the model. A great example would be the IBM’s financial trading platform which uses a RL agent for trading. The AI agent computes a reward function based on the profit or losses made in every financial transaction.


### Final Thoughts
This article’s aim was to provide a brief, concise yet comprehensive introduction to one of the most important subfield of AI, Reinforcement Learning. Hopefully, this article has triggered some curiosity that will drive you to dive in a little deeper into researching more on this subfield of AI.

If Machine Learning is still new to you, feel free to [download and read this e-book on the introduction to machine learning](/https://books.google.co.ke/books?hl=en&lr=&id=u8OWDwAAQBAJ&oi=fnd&pg=PR6&dq=introduction+to+machine+learning&ots=huhHR1ZCOT&sig=9hlNXYWvRqWRJgY_6P_QurJn3ac&redir_esc=y#v=onepage&q=introduction%20to%20machine%20learning&f=false/).

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


### Author Biography & Headshot image
Willies Ogola is pursuing his Master's in Computer Science in Hubei University of Technology, China. 
His research direction is on Artificial Intelligence (Reinforcement Learning & Generative Adversarial Networks) for use in Wireless Sensor Networks for intrusion detection. He also really likes researching reading alot during his free time and is passionate about technology.

![willies-ogola](/engineering-education/introduction-to-reinforcement-learning/willies-ogola.jpg)

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

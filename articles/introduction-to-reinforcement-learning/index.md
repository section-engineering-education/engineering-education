### Table of Contents

1. [Introduction](#introduction)
2. [Key Concepts](#key-concepts)
3. [Most Used Reinforcement Learning Algorithms](#most-used-reinforcement-learning-algorithms)
4. [Applications of Reinforcement Learning](#applications-of-reinforcement-learning)
5. [Final Thoughts](#final-thoughts)
6. [References](#references)

### Introduction

In **Reinforcement Learning (RL)**, agents are trained to maximize the total rewards. In a simpler term, the RL agent is rewarded for correct moves and punished for the wrong ones. In turn, the agent tries to maximize the right moves while minimizing the wrong moves.

In literature, RL is known as a semi-supervised learning model in machine learning, a technique which allows an agent to take actions and interact with an environment to maximize the total rewards for completing a task. 

When compared to other unsupervised learning methods, RL is different in terms of its goals. While the goal in unsupervised learning is to find similarities and differences between data points, reinforcement learning's goal is to find a suitable action model that would maximize the total cumulative reward of the agent.

Reinforcement Learning, as stated above employs a system of **rewards** and **penalties** to compel the computer to solve a problem on its own. Human involvement is limited to changing the environment and tweaking the system of rewards and penalties. As the computer maximizes its reward, it is prone to seek unexpected ways of doing it. Human involvement is focused on preventing it from exploiting the system and motivating the machine to perform the task in the way expected. 

RL is important especially when there is no sure way of performing a task. However, there are rules which the model has to follow to perform its duties correctly.

### Key Concepts

In RL we have key concepts that have to be defined. They include agents, state, action, rewards and the environment.

1.	**Agent**. An agent is an autonomous entity which observes and acts upon an environment. The agent learns which actions to take by a process of trial and error. This process of trial and error requires the agent to explore his available actions on the fly. Whenever an agent tries an action, it will receive a reward which indicates how good or bad the selected action was. In the long run, an agent will try to maximize selecting actions that resulted in high rewards while attempting to reduce the actions which may lead to low rewards.

2.	**State**. The state represents the decision-making factors under consideration being observed by the agent.

3.	**Action**. An action represents an optimal action being selected by the agent, which may change or affect the state and reward.

4.	**Reward**. A reward in RL represents the gains and losses in network performance for taking a particular action on a particular state in the previous time instance.

5.	**Environment**. The environment is where the agent acts. As to how the environment reacts to certain actions is defined by a model which we may or may not know.

![rl-architecture](/engineering-education/introduction-to-reinforcement-learning/rl-architecture.png)<br>
*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

### Most used Reinforcement Learning Algorithms

There are a couple of RL algorithms used in solving problems today. They include Q-learning, [Policy Gradients (PG)](https://papers.nips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf/) and [Actor-Critics](https://papers.nips.cc/paper/1786-actor-critic-algorithms.pdf/). Nonetheless, in this article, we tackle the popular Q-learning algorithm which has been used to solve many RL problems. 

#### Q-learning (most popular).

In the simplest form, Q-learning can be described as a value-based reinforcement learning algorithm used to find an optimal action-selection policy using a Q-function. The main goal is to maximize the value function Q by selecting the best of all possible actions.

![q-learning](/engineering-education/introduction-to-reinforcement-learning/q-learning.PNG)<br>
*[Image Source: Springer Link](https://link.springer.com/chapter/10.1007/978-981-15-4095-0_2)*

The Q-function uses the Bellman’s equation taking in two inputs: state (s) and action (a).

Using the above Q-function, we get the values of Q to be stored in the cells of the Q-table which is a look-up table where we store then calculate the maximum expected future rewards for actions at each state.

As all the values in the Q-table are initially set to zero, this makes the first action the agent takes to be completely random. The values in the table are then updated iteratively for each state-action pair until the function Q eventually converges to Qnew.

There is also a need to balance the agent's exploration and exploitation efforts as it must take random actions which ought to bring greater returns in the long run. Without this balance, the agent might just opt for an immediate reward every time. This is achieved by using the [epsilon-greedy algorithm](https://jamesmccaffrey.wordpress.com/2017/11/30/the-epsilon-greedy-algorithm/).

The algorithm works in such a way that as the agent keeps progressing further and further into the particular task, it will lean more into exploiting the knowledge it has already gathered rather than investigating the environment. 

That's Q-learning in a nutshell. 

### Applications of Reinforcement Learning

#### Games
Reinforcement Learning is quite widely used in building AI for playing computer games. In 2016, Deepmind Technologies, a UK based Artificial Intelligence and Research Company built AlphaGo, an RL controlled computer program that plays the board game, Go (an ancient Chinese board game). The computer program was able to beat Lee Sedol, a Korean Go world champion 4-1 in a 5 match game. Feel free to [read more on the AlphaGo case study](https://deepmind.com/research/case-studies/alphago-the-story-so-far/).

Subsequent versions of AlphaGo such as AlphaGo Zero and MuZero became even more powerful as they were completely self-taught using RL without learning from human games and being taught the game rules respectively.

#### Robotics

In industries, robots are used to perform various tasks. For example, at DeepMind, a London-based artificial-intelligence company Google acquired in 2014, gave AI robots, control over [Google’s data center to manage part of its cooling infrastructure.](https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/) The AI robots exploit the reinforcement learning (RL) technique, a similar approach to that used in AlphaGo, AlphaGo Zero and MuZero which learns through trial and error. The algorithm was fed information gathered from the data centers and left to determine which cooling configurations would effectively reduce energy consumption. Google’s data center energy spending was found to have reduced by up to 40%.

#### Trading and Finance

[According to this paper,](https://link.springer.com/chapter/10.1007%2F978-3-030-38364-0_28/) Reinforcement Learning has been used for predicting stock prices as well as predicting future sales. The RL agent can decide on whether to buy, hold or sell a particular stock. The RL model, usually a supervised time series model, is evaluated by using the current market benchmark standards in order to ensure that it’s operating optimally and to reduce the errors in the model. A great example would be IBM’s financial trading platform which uses an RL agent for trading. The AI agent computes a reward function based on the profit or losses made in every financial transaction.

### Final Thoughts

This article’s aim was to provide a brief, concise yet comprehensive introduction to one of the most important subfields of AI, Reinforcement Learning. Hopefully, this article has triggered some curiosity that will drive you to dive in a little deeper into researching more on this subfield of AI.

If Machine Learning is still new to you, feel free to [download and read this e-book on the introduction to machine learning](https://books.google.co.ke/books?hl=en&lr=&id=u8OWDwAAQBAJ&oi=fnd&pg=PR6&dq=introduction+to+machine+learning&ots=huhHR1ZCOT&sig=9hlNXYWvRqWRJgY_6P_QurJn3ac&redir_esc=y#v=onepage&q=introduction%20to%20machine%20learning&f=false/).

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

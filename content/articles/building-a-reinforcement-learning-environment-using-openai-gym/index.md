---
layout: engineering-education
status: publish
published: true
url: /building-a-reinforcement-learning-environment-using-openai-gym/
title: Building a Reinforcement Learning Environment using OpenAI Gym
description: This tutorial will show the reader how to build a custom Reinforcement Learning environment using OpenAI Gym.
author: lilian-tonia
date: 2022-02-02T00:00:00-07:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-reinforcement-learning-environment-using-openai-gym/hero.png 
    alt: Building a Reinforcement Learning Environment using OpenAI Gym Hero Image
---
If you have ever worked with Deep Learning (DL) or Machine Learning (ML), you know that supervised and unsupervised learning are the two crucial techniques used. 
<!--more-->
Reinforcement Learning (RL) stands out because it is used to train models in a live environment. 

Many standard OpenAI RL environments can enable you to build a project. They include [CartPole-v0](https://gym.openai.com/envs/CartPole-v0/) and [SpaceInvaders-v0](https://gym.openai.com/envs/SpaceInvaders-v0/). 

However, they can be limiting as some of these environments are built to solve specific tasks. 

This tutorial will show you how to build a custom RL environment using OpenAI Gym. Specifically, we will build an RL model to automatically regulate temperature and get it to an optimal range. 

We will accomplish this task using OpenAI Gym, a reinforcement learning toolkit that enables you to develop and compare RL algorithms. 

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- [Reinforcement Learning](/engineering-education/introduction-to-reinforcement-learning/) and its algorithms.
- Machine Learning modeling.
- [Google Colab](https://colab.research.google.com/) or [Jupyter Notebook](https://jupyter.org).

### Table of contents
- [Goals](#goals)
- [Installing and importing required dependencies](#installing-and-importing-required-dependencies)
- [Building the custom RL environment with OpenAI Gym](#building-the-custom-rl-environment-with-openai-gym)
- [Building the agent with Keras-RL](#building-the-agent-with-keras-rl)
- [Creating a Deep Learning model using Keras](#creating-a-deep-learning-model-using-keras)
- [Testing our custom RL environment](#testing-our-custom-rl-environment)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Goals
There are a couple of things we need to note before we begin:
- Firstly, we want our optimal temperature to be between 37 and 39 degrees Celcius. 

- The shower length will be 60 seconds. If you've worked with other standard RL environments, you know that they have an episode length. In this case, our episode length will be 60 seconds. This means that the model will try to get into that optimal temperature range within 60 seconds.

- Our model will perform three actions; turn up, leave, and turn down. We can turn our temperature up, turn it down, or leave it as it is. 

Let's begin by installing our dependencies.

### Installing and importing required dependencies
We will be installing four crucial dependencies:
- `TensorFlow` allows us to perform training and inference on deep learning models.
- `OpenAI Gym` allows us to build our environment.
- `Keras` is a high-level API that enables us to build deep learning models.
- `Keras-rl2` gives us several pre-defined agents to build RL models.

```bash
!pip install tensorflow==2.3.0
!pip install gym
!pip install keras
!pip install keras-rl2
```

The next step involves importing the dependencies into our notebook:

```python
import numpy as np
from gym import Env
from gym.spaces import Box, Discrete
import random
```

In the code above, we've imported:
- The `Env` class from OpenAI Gym. The placeholder class allows us to build our custom environment on top of it.
- The `Discrete` and `Box` spaces from `gym.spaces`. They allow us to define the actions and the current state we can take on our environment. 
- `numpy` to help us with the math.
- `random` to allow us to test out our random environment.

### Building the custom RL environment with OpenAI Gym
We begin by creating a `CustomEnv` class. When we pass `Env` to the `CustomEnv` class, we inherit the methods and properties from the OpenAI Gym environment class.

```python
class CustomEnv(Env):
```

We've gone ahead and implemented four different functions within the `CustomEnv` class. We created the `__init__` function to initialize the actions, observations, and episode length. 

`Discrete` spaces take in a fixed range of non-negative values. For our case, it takes three actions; `down (0)`, `stay(1)`, `up (2)`. 

The `observation_space` will hold an array of our current temperature. Next, we set our start temperature to `38` degrees plus a random integer. Finally, we've set the shower length to `60` seconds.

> Unlike `Discrete` spaces, `Box` spaces are much more flexible and allow us to pass through multiple values between `0` and `100`. In addition, you can use it to hold images, audio, and data frames.

```python
    def __init__(self):
        self.action_space = Discrete(3)
        self.observation_space = Box(low=np.array([0]), high=np.array([100]))
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60
```

The `step` function defines what we do after we take action. We've set our action value to `-1`. Ideally, this means that:

- If we apply action (0) together with `-1`, we get a `-1` value. This action will lower the temperature by `1`.
- If we apply action (1) together with `-1`, we get a `0` value. This action will maintain the current temperature.
- If we apply action (2) together with `-1`, we get a `1` value. This action will increase the temperature by `1`.

We are also reducing the shower length by `1`.

When calculating the reward, if the temperature is in its optimal range of `37`, and `39`, we give a reward of `1`. 

If the temperature is not in the optimal range, we give a reward of `-1`. Our model will always try to converge with this function so that the temperature is within the optimal range.

```python
    def step(self, action):
        self.state += action -1 
        self.shower_length -= 1 
        
        # Calculating the reward
        if self.state >=37 and self.state <=39: 
            reward =1 
        else: 
            reward = -1 
        
        # Checking if shower is done
        if self.shower_length <= 0: 
            done = True
        else:
            done = False
        
        # Setting the placeholder for info
        info = {}
        
        # Returning the step information
        return self.state, reward, done, info
```

We use the `render` function to visualize our results. However, we will not use it for this tutorial. But, this is where you write the visualization code:

```python
    def render(self):
        # This is where you would write the visualization code
```

We use the `reset` function to reset our environment or update each episode. It resets the shower temperature and time.

```python
    def reset(self):
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60 
        return self.state
```

Let's store our class inside a custom variable called `env`:

```python
env = CustomEnv()
```

Let's play around with our environment.
 
```python
episodes = 20 #20 shower episodes
for episode in range(1, episodes+1):
    state = env.reset()
    done = False
    score = 0 
    
    while not done:
        action = env.action_space.sample()
        n_state, reward, done, info = env.step(action)
        score+=reward
    print('Episode:{} Score:{}'.format(episode, score))
```
Output:

```python
Episode:1 Score:-44
Episode:2 Score:-58
Episode:3 Score:-26
Episode:4 Score:-56
Episode:5 Score:-28
Episode:6 Score:-60
Episode:7 Score:-38
Episode:8 Score:2
Episode:9 Score:-22
Episode:10 Score:-34
Episode:11 Score:-60
Episode:12 Score:-10
Episode:13 Score:-24
Episode:14 Score:-18
Episode:15 Score:22
Episode:16 Score:-12
Episode:17 Score:-28
Episode:18 Score:-40
Episode:19 Score:22
Episode:20 Score:-30
```
After running through `20` different showers, we get different reward values. Remember, if the shower is not within the optimal range of between `37` and `39` degrees, we get a reward of `-1`. 

Most of the rewards indicate that we were way outside our optimal temperature range. The best reward is `22`, which indicates that some of the steps that we took may have been within that optimal range. 

Let's go ahead and use *Keras* to build a Deep Learning model.

### Creating a Deep Learning model using Keras
We begin by importing all the necessary dependencies from TensorFlow.

```python
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam
```
The next step involves defining our `states` and `actions`:

```python
states = env.observation_space.shape
actions = env.action_space.n
```

When you run the code above, it gives you the shape of our states and the number of our actions. Let's now build our model.

```python
def build_model(states, actions):
    model = Sequential()    
    model.add(Dense(24, activation='relu', input_shape=states))
    model.add(Dense(24, activation='relu'))
    model.add(Dense(actions, activation='linear'))
    return model
```
In the model, we are passing in the temperature (`input_shape=states`) to the input of our deep learning model and then returning three different actions.

```python
model = build_model(states, actions)
```

When you run the code below, it will give us a summary of our model.

```python
model.summary()
```

We can then pass this model to the `Keras-RL` model.

### Building the agent with Keras-RL
We begin by importing the necessary dependencies from Keras-RL.  

```python
from rl.agents import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory
```

We then build a `DQNagent` using the model we created in the section above. We use the Boltzmann Q Policy. 

It builds a probability law on `q` values and returns an action selected randomly according to this law. 

The DQN agent uses the `Sequential memory` to store various states, actions, and rewards. 

```python
def build_agent(model, actions):
    policy = BoltzmannQPolicy()
    memory = SequentialMemory(limit=50000, window_length=1)
    dqn = DQNAgent(model=model, memory=memory, policy=policy, 
                  nb_actions=actions, nb_steps_warmup=10, target_model_update=1e-2)
    return dqn
```
```python
dqn = build_agent(model, actions)
dqn.compile(Adam(lr=1e-3), metrics=['mae'])
dqn.fit(env, nb_steps=60000, visualize=False, verbose=1)
```
In the code above, our custom RL environment can now train our `dqn` model to set the correct optimal temperature. 

We train the agent for 60000 steps, but you could train it for longer to produce better results. You can change it using the `nb_steps` parameter. 

If you happen to encounter this attribute error, the `Sequential` object has no attribute `_compile_time_distribution_strategy`, make sure to include the `del model` after the `build_model` function, then you can rerun the cells.

After `60000` steps, we get a reward of `-0.3908`. In the initial `10000` steps, we begin with a reward of `-0.6412`. This decreased to `-0.3908` at the end. 

The model is not perfect but when we increase the number of training steps, you will get better results (positive rewards). 

Positive values mean that the temperature is within its optimal temperature. You can try adding some random figures when creating the model and see how your agent will behave after training.  

### Testing our custom RL environment
After training our model, we can go ahead and test it out. Let's write the following code:

```python
results = dqn.test(env, nb_episodes=150, visualize=False)
print(np.mean(results.history['episode_reward']))
```

Upon testing, our average reward value is `59`. It is a high reward. Our model is performing well. However, this might not be the case when you add some noise to your model. 

This is an ideal example and might not represent a real-case scenario, i.e., where your friend randomly adjusts the shower temperature. Try experimenting and see what you get.

You can find the complete code for this tutorial in this [GitHub repository](https://colab.research.google.com/drive/1oBe07b28h9GCBy_bKtLJisC98mayDcwn?usp=sharing).

### Conclusion
In this tutorial, we built a custom RL environment using OpenAI Gym and Keras. 

You can play around with this environment, change some parameters, or add noise to replicate real-life scenarios.

### Further reading
- [OpenAI Gym](https://openai.com)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
If you've ever worked with Deep Learning (DL) or Machine Learning (ML), you know that the two crucial techniques used are supervised and unsupervised learning. Reinforcement Learning (RL) is a little different from these two techniques as you tend to train models in a live environment. There are many standard OpenAI RL environment that can enable you build a project, i.e., the [CartPole-v0](https://gym.openai.com/envs/CartPole-v0/) and [SpaceInvaders-v0](https://gym.openai.com/envs/SpaceInvaders-v0/) environment. However, they can be limiting as some of these environments have been built to solve specific tasks. 

This tutorial will show you how you can build your own custom RL environment using OpenAI Gym. Specifically, we will build an RL model to automatically regulate temperature and get it to an optimal range in our shower. We will accomplish this task by using OpenAI Gym which is a reinforcement learning toolkit that enable you develop and compare RL algorithms. 

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- [Reinforcement Learning](/engineering-education/introduction-to-reinforcement-learning/).
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
- We want our optimal temperature to be between 37 and 39 degrees celcius. 
- The shower length will be 60 seconds. If you've worked with other standard RL environment, you know that they have an episode length. In this case, our episode length will be 60 seconds. This means that the model will try to get into that optimal temperature range within 60 seconds.
- Our model will be performing three actions; Turn up, leave, and turn down. We can turn our temperature up, turn it down, or leave it as it is. 

Let's begins by installing our dependencies

### Installing and importing required dependencies
We will be installing four key dependencies:
- `TensorFlow` allows us to perform training and inferencing of deep learning models.
- `OpenAI Gym` to allow us build our environment.
- `Keras` is a high-level API that allows us to build deep learning models.
- `Keras-rl2` gives us a number of pre-defined agents to build RL models.

```bash
!pip install tensorflow==2.3.0
!pip install gym
!pip install keras
!pip install keras-rl2
```
The next step involves importing them into our notebook.

```python
from gym import Env
from gym.spaces import Discrete, Box
import numpy as np
import random
```
We've imported:
- The `Env` class from OpenAI Gym. It is the placeholder class that allows us to build our custom environment on top of it.
- The `Discrete` and `Box` spaces from `gym.spaces`. They allow us to define the actions and the current state we can take on our environment. 
- `numpy` to help us with the math.
- `random` to allow us to test out our random environment.

### Building the custom RL environment with OpenAI Gym
We begin by creating a `CustomEnv` class. By passing `Env` to the `CustomEnv` class, we are inheriting the methods and properties from the OpenAI Gym environment class.

```python
class CustomEnv(Env):
```
We've gone ahead and implemented four different functions within the `CustomEnv` class. We being by creating the `__init__` function to initialize the actions, observations, and episode length that we can take when creating your environment. 

`Discrete` spaces takes in a fixed range of non-negative values. For our case, it takes three actions; `down (0)`, `stay(1)`, `up (2)`. The `observation_space` will hold an array of our current temperature. Next, we set our start temperature to `38` degrees plus a random integer. Finally, we've set the shower length to `60` seconds.

> Unlike `Discrete` spaces, `Box` spaces is much more flexible and allows you to pass through multiple values between `0` and `100`. In addition, you can use it to hold images, audio, and dataframes.

```python
    def __init__(self):
        self.action_space = Discrete(3)
        self.observation_space = Box(low=np.array([0]), high=np.array([100]))
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60
```
The `step` function that defines what we do after we take an action. We've set our action value to `-1`. Ideally, this means that:
- If we apply action (0), and apply `-1`, we get a `-1` value. This action will lower the temperature by `1`.
- If we apply action (1), and apply `-1`, we get a `0` value. This action will make the temperature stay where it is.
- If we apply action (2), and apply `-1`, we get a `1` value. This action will increase the temperature by `1`.

We are also reducing the shower length by `1`.

When calculating the reward, if our temperature is in it's optimal range of between `37`, and `39`, we give a reward of `1`. If it isn't in this optimal range, give a reward of `-1`. With this function, our model will always try to converge so that the temperature is within the optimal range.

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
The `render` function is used when you want to visualize your results. However, we won't be using it for this tutorial. But, this is where you'd write the visualization code.

```python
    def render(self):
        # This is where you would write the visualization code
```
The `reset` function is used to reset our environment or update each episode. It resets the shower temperature and resets the shower time.

```python
    def reset(self):
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60 
        return self.state
```

```python
env = CustomEnv()
```
 
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
Episode:1 Score:-16
Episode:2 Score:12
Episode:3 Score:-60
Episode:4 Score:-28
Episode:5 Score:0
Episode:6 Score:-36
Episode:7 Score:-60
Episode:8 Score:-60
Episode:9 Score:-26
Episode:10 Score:-18
Episode:11 Score:-12
Episode:12 Score:-44
Episode:13 Score:-50
Episode:14 Score:-56
Episode:15 Score:-26
Episode:16 Score:-60
Episode:17 Score:-58
Episode:18 Score:-50
Episode:19 Score:-58
Episode:20 Score:-60
```
### Creating a Deep Learning model using Keras

```python
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam
```
```python
states = env.observation_space.shape
actions = env.action_space.n
```
```python
def build_model(states, actions):
    model = Sequential()    
    model.add(Dense(24, activation='relu', input_shape=states))
    model.add(Dense(24, activation='relu'))
    model.add(Dense(actions, activation='linear'))
    return model
```
We are passing in our temperature to the input of our deep learning model and returning three different actions.

```python
model = build_model(states, actions)
```
```python
model.summary()
```
We can then pass this model to the Keras-RL model.

### Building the agent with Keras-RL
We begin by importing the necessary dependencies from Keras-RL.

```python
from rl.agents import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory
```
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
In the code above, we've taken our custom environment and we are now able to train our `dqn` model. At this point, we have built a custom RL environment and we are now training our model to get it right in that optimal temperature. We are training it for 60000 steps, but you could train the agent for longer to produce better results. You can change it using the `nb_steps` parameter. 

>If you happen to encounter this attribute error, `'Sequential' object has no attribute '_compile_time_distribution_strategy'`, make sure to include the `del model` after the `build_model` function, then you can rerun the cells again.

### Testing our custom RL environment
After training our model, we can go ahead and test it out. To test it, let's write the following code:

```python
scores = dqn.test(env, nb_episodes=100, visualize=False)
print(np.mean(scores.history['episode_reward']))
```

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1oBe07b28h9GCBy_bKtLJisC98mayDcwn?usp=sharing).

### Wrapping up
That wraps it up on how to build a custon RL environment using OpenAI Gym. You could play around with this environment, you could tweak some parameters, or add noise to replicate real-life scenarios such as someone manually adjusting the temperature. Try it out and use it to build a custom RL environment for your project.  

### Further reading
- [OpenAI Gym](https://openai.com)
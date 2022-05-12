---
layout: engineering-education
status: publish
published: true
url: /leveraging-openai-gym-and-the-anytrading-environment-for-trading/
title: Leveraging OpenAI Gym and the Anytrading Environment for Trading
description: This tutorial will show how to leverage OpenAI Gym and the AnyTrading Environment for trading.
author: willies-ogola
date: 2022-02-08T00:00:00-01:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/leveraging-openai-gym-and-the-anytrading-environment-for-trading/hero.png
    alt: OpenAI Gym and the Anytrading Environment Hero Image
---
The open AI Gym Anytrading environment is a custom trading environment that you can use to trade a bunch of stocks, forex, cryptocurrencies, equities, and securities.
<!--more-->

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- [Reinforcement Learning](engineering-education/introduction-to-reinforcement-learning/) and its algorithms.
- Trading with cryptocurrencies, stocks, forex, equities, and securities.
- Google Colab or Jupyter Notebook.
> We will use Google Colab for this tutorial.

### Table of contents
- [Getting started with Gym Anytrading environment](#getting-started-with-gym-anytrading-environment)
- [Installing and importing the dependencies](#installing-and-importing-the-dependencies)
- [Loading historical data from MarketWatch](#loading-historical-data-from-marketwatch)
- [Building the test environment](#building-the-test-environment)
- [Training an RL agent to trade using the Gym environment](#training-an-rl-agent-to-trade-using-the-gym-environment)
- [Testing the RL agent](#testing-the-rl-agent)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Getting started with Gym Anytrading environment
Open AI's Gym Anytrading environment is a custom trading environment that you can use to trade a bunch of stocks, forex, cryptocurrencies, equities, and securities. We will leverage the environment to perform trading on Ethereum cryptocurrency data.

### Installing and importing the dependencies

```bash
!pip install tensorflow-gpu==1.15.0 tensorflow==1.15.0 gym-anytrading gym stable-baselines
```
If you run the command above, it'll go ahead and install five crucial dependencies:
- `tensorflow-gpu==1.15.0` gives us the GPU version of Tensorflow. We have selected Tensorflow version `1.15.0` as `stable-baselines` only works with versions `1.8.0 to 1.15.0`. It does not support Tensorflow version `2.0.0` and above.
- `tensorflow==1.15.0` gives us the non-GPU version of TensorFlow to ensure we've got both bases covered. 
- `gym-anytrading` gives us our trading environment. 
- `stable-baselines` give us the different reinforcement learning algorithms.
- `gym` gives us OpenAI's Gym which is the base framework that Gym Anytrading is built on.

Let's go ahead and import them into our notebook. We begin by importing the environments where our trading bot will learn how to trade.

```python
import gym_anytrading
import gym
```
Our next imports include the RL algorithm and helpers imported from stable baselines. The algorithm that we will use is `A2C`. You could try out other RL algorithms, i.e., `DQN` and `PPO2`. To learn more about them, please refer to this [link](https://stable-baselines.readthedocs.io/en/master/guide/algos.html). 

```python
from stable_baselines import A2C
from stable_baselines.common.vec_env import DummyVecEnv
```
Next, we import our three main processing libraries.

```python
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
```
- `Pandas` is used to read in our trading data.
- `Numpy` is used in the evaluation phase of the tutorial to perform math.
- `matplotlib` helps us to visualize our trades.

### Loading historical data from MarketWatch
We will work with the Ethereum data from [Market Watch](https://www.marketwatch.com/). This data contains Ethereum's `Open`, `High`, `Low`, and `Close` prices between the days `12/13/2021` and `01/12/2022`. If you want to use the same data for reproducibility, download it [here](https://www.marketwatch.com/investing/cryptocurrency/ethusd/download-data?mod=mw_quote_tab). After downloading, you can upload it into your notebook.
> Remember, the upload gets deleted after runtime is recycled.

To load our historical data, we will be relying on the `Pandas` library.

```python
df = pd.read_csv('ETHUSD.csv') 
```
This command will load in our data. To view it, we type in the following command:

```python
df.head()
```
Output:

```bash
     Date        Open         High       Low         Close
0   01/12/2022  3,231.84    3,412.64    3,208.15    3,370.80
1   01/11/2022  3,074.72    3,264.19    3,054.64    3,232.52
2   01/10/2022  3,188.77    3,199.13    2,933.19    3,073.50
3   01/09/2022  3,076.44    3,210.00    3,060.38    3,188.77
4   01/08/2022  3,216.12    3,245.65    2,999.08    3,080.64
```
Let's perform some preprocessing to set this data up for trading. If we take a look at the data types using the command, `df.dtypes`, we get:

```bash
Date     object
Open     object
High     object
Low      object
Close    object
dtype: object
```
To get our data to work with the Gym Anytrading environment, we need to convert our `Date` from an object to a date-type format. We'll use Pandas `to_datetime` function to perform the conversion.  

```python
df ['Date'] = pd.to_datetime(df ['Date'])
```
The command above should enable that conversion. To confirm, you need to type in `df.dtypes`. In addition, we need to set this column to be the index. This is a requirement when working with Gym Anytrading environment. To do that, we write the following command:

```python
df.set_index('Date', inplace=True)
```
Lastly, we need to convert the other columns from objects to floats. Failure to perform this conversion will give you a `TypeError`.

```python
df['Open'] = df['Open'].apply(lambda x: float(x.replace(",", "")))
df['High'] = df['High'].apply(lambda x: float(x.replace(",", "")))
df['Low'] = df['Low'].apply(lambda x: float(x.replace(",", "")))
df['Close'] = df['Close'].apply(lambda x: float(x.replace(",", "")))
```
When you type the code `df ['Open'].unique()` on the terminal, you'll find that the values are in a string and have commas. The code above removes these commas by replacing them with empty spaces and converts the values into float types. By typing `df.head()`, you can confirm that the commas have been replaced. Besides, the `df.dtypes` command will help you confirm the conversion of all the columns to `float64`.

That's all the preprocessing you need to do to pass this data to the Gym Anytrading environment. The environment also expects the `Open`, `High`, `Close`, and `Close` columns.

> Ideally, the data that you use should mimic the frequency that you want to trade. For example, if you want the RL agent to trade daily data, use the daily data to train the agent and not hourly data.

Let's create the environment and pass this data into the trading environment.

```python
env = gym.make('stocks-v0', df=df, frame_bound=(5,30), window_size=5)
```
The `window_size` specifies how many previous timesteps our trading bot has as reference points when it makes its next trade. The `frame_bound` specifies the start and end of our `df`. The first parameter on the `frame_bound` should always be equal to the `window_size` so that it has the five sets of previous data. For the second parameter, you can adjust it to any value of your choice depending on your data.

### Building the test environment
If we look at the actions we can take using `environment.action_space`, we'll notice that we only have two actions we can take. We can only `Short` or `Long`. In other algorithms, you can `Hold`. But, this algorithm is only limited to two actions. If you're not familiar with these crucial terminologies, read this [documentation](https://en.wikipedia.org/wiki/Position_(finance)).

```python
state = env.reset()
while True: 
    action = env.action_space.sample()
    n_state, reward, done, info = env.step(action)
    if done: 
        print("info", info)
        break
```
If you've worked with OpenAI Gym before, this first part of the code must be familiar to you. It is the typical code you write when building your test environment.
        
The code below visualizes this environment using `matplotlib`.

```python        
plt.figure(figsize=(20,10))
plt.cla()
env.render_all()
plt.show()
```

![Random step visualization](/engineering-education//leveraging-openai-gym-and-the-anytrading-environment-for-trading/random-step-visualization.png)

To summarize this section, we are taking a bunch of random steps in our environment and visualizing it.

Now, we can start building our RL agent to try and trade profitably in this environment. 

### Training an RL agent to trade using the Gym environment
We begin by wrapping our environment inside the dummy vectorized environment wrapper, `DummyVecEnv`.

```python
env_build = lambda: gym.make('stocks-v0', df=df, frame_bound=(5,30), window_size=5)
env = DummyVecEnv([env_build])
```
We are creating an `env_build` function. We are taking that function and putting it inside the `DummyVecEnv`. Finally, we save the result inside the `env` variable so that when we start building our training model.  We'll now use the `env` variable.

Next, let's set up our algorithm and kick off our training.

```python
model_train = A2C('MlpLstmPolicy', env, verbose=1) 
model_train.learn(total_timesteps=100000)
```
With these two lines of code, our model will start training.

`A2C` is the algorithm that we will use for this run. `A2C` is an acronym that stands for `Advantage Actor-Critic`. It is an RL algorithm that combines Policy-Based and Value-Based RL techniques. You can read more about it [here](https://towardsdatascience.com/advantage-actor-critic-tutorial-mina2c-7a3249962fc8).

We are using the `MlpLstmPolicy` which is a deep neural network policy with an LSTM layer. It is an important policy as it allows a neural network to keep context and learn about the previous history within its neurons.

The last line of code kicks off training with `100000` timesteps. Ideally, what you need to observe while training is the `explained_variance` value. You want it to be as high as possible. We are looking at values between `0` and `1`. A number close to `1` denotes a high value while that close to `0`, a low value. You should also make sure the `value_loss` is as low as possible.

You can stop the model training when the `explained_variance` is `0.966`. This should give us a model that performs reasonably well. However, finding a perfect solution is never a thing with algorithms. Keep experimenting until you find that sweet spot.

Let's test it out and see how it performs.

### Testing the RL-agent

```python
env = gym.make('stocks-v0', df=df, frame_bound=(25,35), window_size=5)
obs = env.reset()
while True: 
    obs = obs[np.newaxis, ...]
    action, _states = model_train.predict(obs)
    obs, rewards, done, info = env.step(action)
    if done:
        print("info", info)
        break
```
The code above is similar to the one we wrote above. The core difference is, instead of taking random actions, we are using our model to predict which action it should take, i.e., buy or sell.

Let's visualize the results:

```python
plt.figure(figsize=(15,6))
plt.cla()
env.render_all()
plt.show()
```
![Trade evaluation](/engineering-education/leveraging-openai-gym-and-the-anytrading-environment-for-trading/evaluation.png)

These are the results from training our agent operating from day 25 to 35. Our model has predicted new actions. We can note that it has made a few good trades and bad ones too. The green dots represent buying while the red dots represent selling cryptocurrencies.

For example, on its sixth trade, it was right to buy when the price was low. But, it should have sold on the eighth trade, but instead, it bought more, which was a mistake. Also, on the tenth trade, it sold Ethereum when it was at its lowest price making a loss. This is a wrong trade. 

We made a profit of `0.9861862828347474`, which is about 8.6%. It is not much. But, at least you get the idea of how the model is working.

The Google Colab link for this tutorial is available [here](https://colab.research.google.com/drive/1RQAvnSCXqsu3JIiZN4lKBNlgX9zU7cJ6?usp=sharing).

### Wrapping up
The model isn't perfect. It has made some long and short trades. Some good and bad trades. You can play around with the code and see how it performs. With a few tweaks, this model can be trained to trade with stocks, forex, equities, and securities. All the code in this tutorial is for educational purposes only. If you are going to deploy such a model, please do your thorough research. In addition, this isn't financial advice. It is only meant to show you what is possible with the technology.

### Further reading
- [Gym Anytrading](https://github.com/AminHP/gym-anytrading)
- [MarketWatch](https://www.marketwatch.com/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)

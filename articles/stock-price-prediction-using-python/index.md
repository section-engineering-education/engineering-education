# stocks-prices-predection-using-python
An artificial neural network is an interconnected group of nodes, inspired by the brain's simplification. Here, each circular node represents an artificial neuron, and an arrow represents a connection from the output of one artificial neuron to the input of another.

In this tutorial, we are going to build an AI neural network model to predict stock prices. Specifically **Tesla** stock, hope that we can make Elon Musk happy along the way.

### Prerequisites
- A good understanding of Python programming language.
- A good understanding of neural networks. 

If you are a beginner, check out [our tutorial](https://www.section.io/engineering-education/introduction-to-neural-networks/) about neural networks.

#### Development Environment
- Locally install Python and Tensorflow.
- [Google Colab](https://colab.research.google.com/github/ahmadmardeni1/Stock-price-predection-using-Python/blob/main/stock_price_predection.ipynb#scrollTo=QI4PhD_bi9dN) [Recommended].

### What is RNN?
When you read this tutorial, you will understand each word based on previous words in your brain. You wouldn't start thinking from scratch. The thoughts are cumulative. Recurrent Neural Networks implements that in the machine it has loops, and it allows information to persist where traditional neural networks can't do that.
 
 ![Recurrent Neural Networks with loops](/engineering-education/stock-price-prediction-using-python/first.jpg)
 
 When **A** take the input **Xt**, then the **Ht** will be the output.
 
 A recurrent neural network is like multiple copies of the same network which passes the message to a successor. Now let's think a little bit of what will happen if we unroll the previous loop:
 
 ![Unroll the loop in the recurrent neural network](/engineering-education/stock-price-prediction-using-python/second.jpg)
 
 And here comes the problem of the RNN, which is **vanishing gradient problem**, where it can not handle large sequences. LSTMs are designed to handle long-term dependencies.
 
### What is LSTM?
 Long short-term memory (LSTM) is an artificial recurrent neural network (RNN) architecture that you can use in the deep learning field. In LSTM, you can process an entire sequence of data. For example, handwriting generation, question answering or speech recognition, and a lot more.

Unlike the traditional feed-forward neural network, which passes the values sequentially through each layer of the network, LSTM has a feedback connection that helps it remember preceding information, making it the perfect model for our needs to do time series analysis.

### Choosing data 
In this tutorial, I will use a TESLA stock dataset from [Yahoo finance](https://finance.yahoo.com/), which contains the stock data for ten years. You can download it for free from [here](https://github.com/ahmadmardeni1/Stock-price-predection-using-Python).

Also, I'm going to use [Google Colab](https://colab.research.google.com/) because it is powerful, but you are free to use whatever you are comfortable with. 

#### Importing libraries
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense, Dropout
```
We are going to use `numpy` for scientific operations, `pandas` to modify our dataset, `matplotlib` to visualize the results, `sklearn` to scale our data, and `keras` works as a wrapper to low-level libraries like TensorFlow or Theano high-level neural networks library.

### Let's build our app!
First of all, if you take a look at the dataset, you need to know that the "open" column represents the opening price for the stock at that "date" column, and the "close" column is the closing price on that day. The "High" column represents the highest price reached that day, and the "Low" column represents the lowest price.

#### Loading data
Let's upload our dataset(please ignore the following code if you are not using Google Colab):
```python
from google.colab import files
dataset = files.upload()
```
Then press "choose files" and upload the dataset.

If you are not using Google Colab, you can put the data file in the same code folder.

#### Reading data
After uploading our data, we need to make a data frame by:
```python
pd.read_csv('TSLA.csv')
```

#### Feature Extraction
After that, let's get the number of trading days by:
```python
df.shape
```
The result will be `(2392, 7)`.

To make it as simple as possible we will just use one variable which is the "open" price.
```python
df = df['Open'].values
df = df.reshape(-1, 1)
```
The `reshape` allows you to add dimensions or change the number of elements in each dimension. We are using `reshape(-1, 1)` because we have just one dimension in our array, so `numby` will create the same number of our rows and add one more axis: 1 to be the second dimension.

Now let's split the data into training and testing sets:
```python
dataset_train = np.array(df[:int(df.shape[0]*0.8)])
dataset_test = np.array(df[int(df.shape[0]*0.8):])
```
We will use the `MinMaxScaler` to scale our data between zero and one. In simple words, scaling is converting the numerical data represented in a wide range into a smaller one.

```python
scaler = MinMaxScaler(feature_range=(0,1))
dataset_train = scaler.fit_transform(dataset_train)
dataset_test = scaler.transform(dataset_test)
```

Next, we will create the function which will help us to create the datasets:
```python
def create_dataset(df):
    x = []
    y = []
    for i in range(50, df.shape[0]):
        x.append(df[i-50:i, 0])
        y.append(df[i, 0])
    x = np.array(x)
    y = np.array(y)
    return x,y
 ```
For the features (x), we will always append the last 50 prices, and for the label (y), we will append the next price. Then we will use numpy to convert it into an array.
 
Now we are going to create our training and testing data by calling our function for each one:
```python
x_train, y_train = create_dataset(dataset_train)
x_test, y_test = create_dataset(dataset_test)
 ```
Next, we need to reshape our data to make it a 3D array in order to use it in LSTM Layer.
```python
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
```
#### Model building
```python
model = Sequential()
model.add(LSTM(units=96, return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(Dropout(0.2))
model.add(LSTM(units=96,return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(units=96,return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(units=96))
model.add(Dropout(0.2))
model.add(Dense(units=1))
```
First of all, we initialized our model as a sequential one with 96 units in the output's dimensionality. We used `return_sequences=True` to make the LSTM layer with three-dimensional input and `input_shape` to shape our dataset.

Making the dropout fraction 0.2 drops 20% of the layers. Finally, we added a dense layer with a value of 1 because we want to output one value.

After that, we want to reshape our feature for the LSTM layer, because it is sequential_3 which is expecting 3 dimensions, not 2:
```python
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
```

Now we want to compile our model:
```python
model.compile(loss='mean_squared_error', optimizer='adam')
```
We used `loss='mean_squared_error'` because it is a regression problem, and the adam optimizer to update network weights iterative based on training data.

We are ready! Let's save our model and start the training:
```python
model.fit(x_train, y_train, epochs=50, batch_size=32)
model.save('stock_prediction.h5')
```
Every `epoch` refers to one cycle through the full training dataset, and `batch size` refers to the number of training examples utilized in one iteration.

Let's load our model by:
```python
model = load_model('stock_prediction.h5')
```
### Results visualization
The last step is to visualize our data. If you are new to data visualization please consider going through our [Getting Started with Data Visualization using Pandas](https://www.section.io/engineering-education/getting-started-with-data-visualization-using-pandas/) tutorial first.
```python
predictions = model.predict(x_test)
predictions = scaler.inverse_transform(predictions)
y_test_scaled = scaler.inverse_transform(y_test.reshape(-1, 1))

fig, ax = plt.subplots(figsize=(16,8))
ax.set_facecolor('#000041')
ax.plot(y_test_scaled, color='red', label='Original price')
plt.plot(predictions, color='cyan', label='Predicted price')
plt.legend()
```
The result will be:

![Ploting results](/engineering-education/stock-price-prediction-using-python/third.jpg)

That's all. You can find the entire code [here](https://github.com/ahmadmardeni1/Stock-price-predection-using-Python), and you can run it by clicking on "open in colab."


### Wrapping up
We got a very good prediction result! Imagine if you are working with multiple variables, how much accurate the result will be?

Also, I recommend you to change layers numbers, epochs, and batch_size. Try it yourself and change whatever you think may make your prediction better.
---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

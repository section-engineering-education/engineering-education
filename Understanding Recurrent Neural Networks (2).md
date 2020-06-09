# Understanding Recurrent Neural Networks - Part 1
In this article we give a gentle introduction to Recurrent Neural Networks and where and how they are used. If you are new to neural networks head over to [this post](http://www.wildml.com/2015/09/implementing-a-neural-network-from-scratch/).

### What is an RNN ?
When you're reading this current sentence, you're reading and processing it word-by-word while keeping in mind what words came before; thus giving you an idea of what the sentence is trying to convey, RNNs have a similar approach. RNNs can be used to process sequential information they iterate over every element of the sequence and maintain a *state* which contains information about the data it has processed so far, hence the name recurrent neural networks. The ability to **_remember_** information about what has been calculated so far makes RNNs very powerful and are used for a variety of tasks.

### The Math
Lets talk about the math behind this. The variables used in the following are
    
    h - h is the hidden state vector. This allows the network to account for  information from previous inputs that are sequentially behind the current input.
    Wx, Wy, Wh - Matrices containing the weights, these are shared throughout the network.
    Xi - is the input to the hidden nodes.
    
**Equations for forward propagation**
$$a_{t}=W_{t}h_{t-1}+W_{X}X_{t} -(1)$$   
$$h_{t} = activation(a_{t}) -(2)$$       
$$y_{t}=softmax(W_{y}h_{t}) -(3)$$   

(1) The hidden nodes are a concatenation of weighted inputs (`x`) and weighted hidden state (`h`) from the previous state. 
(2) The output from the hidden nodes is the state for the current step, which is achieved  by applying the activation function (`tanh`).
(3) To make a prediction, we apply to `softmax` function to weighted current hidden state.

**Loss Function** the loss function $L$ of all time steps is defined based on the loss at every time step as follows
$$L(\hat y, y) = \Sigma_{t=1}^{Ty} L(\hat y^{<T>}, y^{<T>})$$
    
**Backpropagation through time** RNNs also follow backpropagation but are slightly tricky. Backpropagation is done at each point in time. At each timestep T the derivative of loss function $L$ wrt weight matrix $W$ is expressed as
$$\frac{\delta L^{(t)}}{\delta W} = \sum_{t=1}^{T} \frac{\delta L^{T}}{\delta W}|t$$

<img src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/RNN-rolled.png" alt="drawing" height="200" />  

The pseudocode for RNN is given below,  

	state_t = 0 
	for input_t in input_sequence:
	    output_t = f(input_t, state)
	    state_t = output_t
The above RNN takes an input of sequence of vectors of size `(timesteps, input_features)`. It loops over timesteps, and at each timestep, it "combines"	the current state and the input at `t` to obtain the output at `t`. Set the state for the next step to be this previous output.
<img src="http://colah.github.io/posts/2015-08-Understanding-LSTMs/img/RNN-unrolled.png" alt="drawing" height="200" />
A time step is a single occurrence of the cell - e.g. on the first time step you produce output1, h0, on the second time step you produce output2 and so on.

Python implementation of RNN.

```python
import numpy as np
timesteps = 100                 #number of timesteps in input sequence
input_features = 32             #input dimensionality
output_features = 64            #output dimensionality
inputs = np.random.random((timesteps, input_features))   #random input 
state_t = np.zeros((output_features,))         #initial state vector

W = np.random.random((output_features, input_features))
U = np.random.random((output_features, output_features)) #random weights
b = np.random.random((output_features,))
successive_outputs = []

for input_t in inputs:
    #combining input with current state by passing it through non linear actvation function
    output_t = np.tanh(np.dot(W, input_t), +np.dot(U, state_t) + b) 
    successive_outputs.append(output_t)
    state_t = output_t          #update state for next timestep
    
final_output_sequence = np.concatanate(successsive_outputs, 0)

```




### How RNNs are used in various scenarios
![img]( http://karpathy.github.io/assets/rnn/diags.jpeg) 
A "vanilla" feed-forward neural network which has fixed which receives a fixed size input  like an image or vector, that input is fed through several hidden layers and produces a single output like a classification score over a set of categories, this is represented in the first diagram of the above image.

When we come to RNN they offer a little flexibility in the input and the output size this is used for various applications, they are
1. **Image Captioning**, in one-to-many type of model our input can be an image of fixed size but, our output is a sequence of variable length such as a caption, where different captions can have a different number of words so, our output needs to be variable in length.
		![https://www.oreilly.com/library/view/deep-learning-for/9781788295628/assets/f5c8ceb8-5a77-4f81-8578-ff1458b4268c.png](https://www.oreilly.com/library/view/deep-learning-for/9781788295628/assets/f5c8ceb8-5a77-4f81-8578-ff1458b4268c.png)
2. **Sentiment Analysis**, we also have many-to-one models where our input is variably sized like a piece of text and we want to say what is the sentiment of the text.

3. **Machine Translation**, this is of the many-to-many type of example where our input and output need to be variable in length. The input may be a sentence in English which may be of some length and the output may be a sentence in French which may be of some length but importantly the length of sentence in English need not equal length of sentence in French. 
	![](https://cdn.analyticsvidhya.com/wp-content/uploads/2019/01/enc_dec_simple.png)

4. **Video Classification on frame level**, in this problem the video may be of variable length but the size of the input needs to equal to the size of the output.
	
5. Recurrent neural networks can be useful even for a fixed size input and fixed size output, like image classification.


After looking at all the cool things, RNNs can do let's talk about the vanishing gradient problem, LSTM, GRU, in the next post.





##### References and Image Credits
1. [The Unreasonable Effectiveness of Recurrent Neural Networks, Andrej Karpathy.](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)
2. [Understanding LSTM Networks, C. Olah](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
3. [Recurrent Neural Netowork Cheat Sheet,  Shervine Amidi](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks#overview)
4. [ The Basics of Recurrent Neural Networks (RNNs)](https://medium.com/towards-artificial-intelligence/whirlwind-tour-of-rnns-a11effb7808f)
5. [Recurrent Neural Networks Tutorial](http://www.wildml.com/2015/09/recurrent-neural-networks-tutorial-part-1-introduction-to-rnns/)
6. [Stanford Lecture Series, Recurrent Neural Networks](https://www.youtube.com/watch?v=6niqTuYFZLQ)
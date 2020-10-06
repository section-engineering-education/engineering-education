### Introduction

In this article, we will be discussing neural networks. A functional unit of deep learning inspired by how the brain works.

This article aims to make you understand what neural networks are. It will also give you a depth understanding of how neural networks function. This article will explain distinct kids of neural networks and their applications. And by the end of this article, you will have gained a deeper understanding of what neural network is.

### Neural Networks Overview

Neural Network is a functional unit of deep learning. Deep learning uses neural networks, which mimics human behaviour to solve problems. The neural network takes in data. Neurons recognize the patterns and predict the output.

A neural network is a technology that uses network functions to understand and convert input data into the [desired output](https://deepai.org/machine-learning-glossary-and-terms/neural-network). Neural networks inspiration is by how the human brain works.

The essential building block of a neural network is a perception. Perception accomplishes simple signal processing. Neural networks are being applied to many real-life problems to solve data problems in Speech recognition, image recognition, and pattern recognition, to name a few.

### How Neural Networks work

Neural Networks are complex structures made of artificial neurons. They take in many inputs to produce a [single output](https://www.upgrad.com/blog/neural-network-architecture-components-algorithms/#:~:text=Neural%20Networks%20are%20complex%20structures,input%20into%20a%20meaningful%20output).

Neural networks consist of layers of neurons. The layers consist of the:

- [Input layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Multiple hidden layers](https://deepai.org/machine-learning-glossary-and-terms/hidden-layer-machine-learning#:~:text=In%20neural%20networks%2C%20a%20hidden,inputs%20entered%20into%20the%20network.)
- [Output layer](https://www.scan2cad.com/user-manual/the-output-layer/)

The input layer receives data represented by a numeric value. Hidden layers perform most computations required by the network. Finally, the output layer predicts the output.

In a neural network, neurons influence each other. A neuron is a thing that holds a number between 0 and 1. Each layer is made of neurons. Once the input layer receives data, it is sent to the next layer, which is the hidden layer. At the hidden layer, computation takes place, and information is sent to the neurons of the output layer. Neurons in different layers are connected through channels. Each channel is assigned a number referred to as weight.

The inputs are multiplied by the weights and their sum sent to neurons in the hidden layer. Each neuron adds the inputs it receives to get the sum. This value later pass through the activation function.

The activation function outcome determines if a neuron is activated or not. An activated neuron transmits data in the next layer through the channels. In this manner, the data gets propagated on the network. In other words, this is [forward propagation](https://towardsdatascience.com/forward-propagation-in-neural-networks-simplified-math-and-code-version-bbcfef6f9250).

Feed-forward propagation takes place when the hidden layer accepts the input data. Process it as per the activation function and pass it to the output. In the output layer, the neuron that has a higher probability determines the result.

### Main Types of Neural Networks

Neural networks classification depends on their layers, structure, neurons, data flow, and [density](https://www.mygreatlearning.com/blog/types-of-neural-networks/).

For more types of neural networks [check this article out.](https://medium.com/towards-artificial-intelligence/main-types-of-neural-networks-and-its-applications-tutorial-734480d7ec8e)

#### Perceptron

[Minsky and Papert](https://www.researchgate.net/publication/3081582_Review_of_&#39;Perceptrons_An_Introduction_to_Computational_Geometry&#39;_Minsky_M_and_Papert_S_1969) proposed the Perceptron model (Single-layer neural network). They said it is modelled after the functioning of the human brain. It is one of the simplest models, that can learn and solve complex data problems in [neural networks](https://www.mygreatlearning.com/blog/types-of-neural-networks/).

Perceptron network comprises of two layers:

- [Input Layer](https://www.techopedia.com/definition/33262/input-layer-neural-networks)
- [Output Layer](https://www.techopedia.com/definition/33263/output-layer-neural-networks)

The input layer calculates the weighted input for each node. The activation function is applied to obtain the result as output.

![Perceptron](/engineering-education/introduction-to-neural-networks/perceptron.png)

[Image source](https://missinglink.ai/wp-content/uploads/2018/11/Frame-3.png)

#### Feed Forward Neural Network

A feed-forward network is a neural network where data moves in one direction. It enters via input nodes and leaves through [output nodes](https://analyticsindiamag.com/6-types-of-artificial-neural-networks-currently-being-used-in-todays-technology/). This is a front propagation wave. By data moving in one direction, there is no backpropagation.

This network may have hidden layers or not. The sum of input products and their weights are calculated. The data later is transferred to the output.

Feed-forward neural networks applications are:

- Speech Recognition
- Facial Recognition

![Feed forward Network](/engineering-education/introduction-to-neural-networks/fnn.png)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network)

#### Radial Basis Function Neural Network

[Radial Basis Function Neural Network (RBF](https://www.sciencedirect.com/topics/engineering/radial-base-function)) comprises of three layers:

- [Input Layer](https://stackoverflow.com/questions/32514502/neural-networks-what-does-the-input-layer-consist-of)
- [Hidden Layer](https://www.sciencedirect.com/topics/engineering/hidden-layer-neuron)
- [Output Layer](https://www.scan2cad.com/user-manual/the-output-layer/)

[RBF networks](https://www.sciencedirect.com/topics/chemical-engineering/radial-basis-function-networks) classify data based on the distance of any centred point and interpolation. Interpolation resizes images. Classification is performed by measuring the inputs data where each neuron stores data. RBF network looks for similar data points and groups them.

According to [Dr Saed Sayad](https://www.saedsayad.com/artificial_neural_network_rbf.htm), the sum and weights of hidden layer output sent to the output layer form a network of outputs. RBF network is mostly used in power restoration system. This type of neural network reduces the power shortage.

![Radial Basis Function Network](/engineering-education/introduction-to-neural-networks/rbn.png)

[Image source](https://miro.medium.com/max/500/0*Dezf_up8pNrdsl34.png)

#### Recurrent Neural Network

[A Recurrent Neural Network(RNN](https://www.sciencedirect.com/topics/engineering/recurrent-neural-network)) is a network whereby the hidden layers output is saved to be used as input. Saving the output helps with future predictions.

Its first layer formation is related to one in the feed-forward network. That is with the products of the sum of the weights and the features. Once computed, the [RNN process](https://analyticsindiamag.com/6-types-of-artificial-neural-networks-currently-being-used-in-todays-technology/) begins by each node, remembering some data in the previous step. While carrying out operations, neurons act as memory cells.

RNN goes with front propagation but recalls the data it needs to use later. If the prediction backfires, Back propagation is used. Whereby the system grasps and projects towards making the right propagation.

![Recurrent Neural Network](/engineering-education/introduction-to-neural-networks/rnn.jpeg)

[Image source](https://deepai.org/machine-learning-glossary-and-terms/recurrent-neural-network)

RNN solve problems in text data and audio data. In other words, it solves problems in text-to-speech conversion.

#### Convolution Neural Network

Convolutional Neural Network (CNN) is a special type of feed-forward neural network. CNN contains a three-dimensional neuron arrangement.

According to [great learning](https://www.mygreatlearning.com/blog/types-of-neural-networks/), the first stage is the convolutional layer. Neurons in a convolutional layer only process information from a small part of the visual field(image). Input features in convolution are taken in batches.

The second stage is pooling. It reduces the dimensions of the features and at the same time, maintaining important information. CNN enter the third stage (fully connected neural network) when the features get to the right level of granularity. At the final stage, the final probabilities are analyzed and give a decision of which class the image belongs.

This type of network understands the image in parts. It also computes the operations multiple times to complete processing the image. Image processing involves conversion from RGB to a grey-scale. After the image is processed, modifications in pixel value aid to identify the edges. The images also get grouped into different classes. CNN is mostly applied in signal and image processing.

![Convolutional Neural Network](/engineering-education/introduction-to-neural-networks/cnn.png)

[Image source](https://missinglink.ai/guides/neural-network-concepts/convolutional-neural-network-build-one-keras-pytorch/)

#### Modular Neural Network

A Modular Neural Network is composed of different networks working individually to get the output. The various neural networks do not interact with each other. Each network has a unique set of inputs compared to other networks.

MNN is advantageous because large and complex computational processes are done faster. Processes are broken down into independent components, thus increasing the computational speed.

![Modular Neural Network](/engineering-education/introduction-to-neural-networks/mnn.png)

[Image source](https://www.researchgate.net/publication/341628332/figure/fig4/AS:895309341274112@1590469789167/Modular-neural-network-structure.png)

### Applications of Neural Networks

Neural networks are effectively applied to several fields to resolve data issues.

- Facial Recognition

Neural networks are playing a significant role in facial recognition. Some smartphones can identify the age of a person. This is based on facial features and visual pattern recognition.

- Forecasting

Neural networks are trained to understand the patterns and detect the different types of weather. Forecasting, with the help of neural networks, not only predicts the weather. It also gives prediction to the market trends and mineral exploration sites.

- Music composition

Neural networks master patterns in sound and tune. Also, the network train itself adequately to create new music.

- Image processing and Character recognition

Neural networks can understand and learn patterns in an image. Image processing is a large and growing field. Image recognition is applied in:

- Facial recognition
- Cancer cells detection
- Satellite imagery processing for use in defence and agriculture.

Character recognition helps to detect fraud and national security assessments.

### Advantages of Neural Networks

- Fault tolerance

Some neurons, not working, does not prevent neural networks from generating outputs.

- Real-time Operations

Neural networks can learn in synchronous and easily adapt to changing surrounding.

- Adaptive Learning

Neural networks can learn how to work on tasks. This is based on the data given to produce the right output.

- Parallel processing capacity

Neural networks have the strength and ability to perform multiple jobs simultaneously.

### Disadvantages of Neural Networks

- Unexplained behaviour of the network

Neural networks provide a solution to a problem. The problem is it does not give reasons for why and how. However, network trust is reduced.

- Determination of appropriate network structure

There is no specific rule for determining a neural network process. A proper network structure is achieved by trying the best network.

- Hardware dependence

Neural network pieces of equipment are dependent on one another. Neural networks need processors with parallel processing power.

- Difficulty in showing a network problem

Neural networks work with numbers. Problems have to be translated into numerical values first before giving the output. This influences the network performance.

### Conclusion

The neural network is a field that is growing tremendously. Learning and understanding the concepts in this field is vital. This article gives you an understanding of what exactly is a Neural network and how it works. By exploring this field, you can apply neural networks in other areas to solve data problems. This article has also explained the different types of neural networks. The article gives you an understanding of how the networks operate and where applied.
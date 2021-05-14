---
layout: engineering-education
status: publish
published: true
url: /nlp-transfer-learning/
title: Introduction to Transfer Learning in NLP
description: In this article we will be discussing the advances in the field of transfer learning for natural language processing (NLP). We will explain the concepts of the transformer and the attention mechanism.
author: lalithnarayan-c
date: 2020-12-15T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nlp-transfer-learning/hero.jpg
    alt: transfer learning in NLP example image
---
Using pre-trained models, we can skip the time-consuming process of data collection, pre-processing, training, and testing. These models are trained on Petabytes of data and give us an edge over training neural networks from scratch. This is what we call Transfer learning, and it is a novel way to train machine learning models.
<!--more-->
In this article, we will be discussing the advances in the field of transfer learning for Natural Language Processing (NLP). We begin with the efforts made to solve the problems that are being solved today.

### Transfer learning in NLP
The field of NLP finally had its '[Imagenet](https://thegradient.pub/nlp-imagenet)' moment, when models such as Embeddings from Language Models, Transformer models, and Universal Language Model Fine-tuning models were introduced. Imagenet is the challenge that involves training networks to recognize images from a dataset of 1000 classes. One of the solutions proposed during this challenge was AlexNet. It paved the way for transfer learning and deep learning as we know it today. 

AlexNet used convolution operation to extract features from images. Convolution operation worked because the data was spatial. Natural language is sequential and not spatial. Therefore, Convolutional Neural Networks (CNNs) did not work well with language modeling tasks. 

One of the challenges in NLP is machine language translation (MLT). Getting the machine to translate sentences from one language to another was a challenging task for various aspects. Firstly the underlying grammar varies from language to language. The languages spoken in India are different from the ones spoken in the United States. 

This diversity in culture dictates vast variations in speech and text. Therefore, Recurrent Neural Networks (RNNs), Long Short Term Memory (LSTMs) were used for MLT. RNNs and LSTMs are sequential models. Consider the image given below.

![rnn structure](/engineering-education/nlp-transfer-learning/rnn.png)

[*Image Source*](https://colah.github.io/posts/2015-08-Understanding-LSTMs/img/RNN-unrolled.png)

Consider the architecture of the RNN. There are two inputs to each neuron in the neural network. The first neuron has the first word of the sentence as its input. The neuron's output is fed as input to the second neuron along with the second word of the sentence. This results in the neural network understanding the underlying patterns of languages. The network can predict the most likely word to occur in the given content. 

LSTMs worked better because they solved the problem of vanishing gradients. When large datasets are passed to deep neural networks using RNNs, the network won't learn effectively after a certain time. The RRN can degrade because the gradients tend to zero out. If the gradients zero out, then the weights won't get updated, and therefore no learning will occur. LSTMs structure solved the problem of vanishing gradients. 

But both these architectures would only take the previous input and the current word as its input. Logically, to understand the context in which the word is being spoken, we would look at the entire sentence. Then, another architecture called *transformers* was introduced, taking multiple previous step as inputs, better learning the underlying patterns. Transformers have paved the way for rapid advances in the field of NLP. 

### Transformers 
AAs seen earlier, the architectures with LSTMs and RNNs are called sequence transduction models. It would solve a problem such as MLT using an encoder-decoder architecture. Encoder-decoder models come under sequence transduction models comprising of CNNs, RNNs, and LSTMs. The architecture includes multiple attention layers and an encoder and decoder architecture. The architecture, as defined in the paper, is given in the image below. 

![Transformers](/engineering-education/nlp-transfer-learning/transformers.png)

[*Image Source*](https://arxiv.org/pdf/1706.03762.pdf)

#### What is attention?
Attention is a mechanism by which the decoder decides to attend to essential pieces of text during the encoding process. The advantage of incorporating encoder and decoder into one single architecture is that the decoder can determine what information is critical and what information is not. 

This leads to selecting information specific to the language at hand, and therefore language models specific to the language can be trained. MLT is also solved efficiently using this approach. I suggest you watch this [video](https://www.youtube.com/watch?v=iDulhoQ2pro) on attention. It explains the concept of using MLT as an application. 

#### Transformer explained 
Transformer makes use of the attention mechanism to create language representations. The paper calls the method the first of a kind, becuase it uses the attention mechanism entirely to model the language. 

There are three attention blocks in the architecture. 

They are as follows:
1. **Multi-head attention block**: The input sentence is vectorized using word embeddings and passed through a multi-head attention block. This block allows the language models to attend to information from various representation spaces. The various representations spaces refer to the variation in the word embeddings assigned to different words.   
2. **Masked multi-head attention block**: The masked multi-head attention block encodes the target sentence and sends values to the next attention. The difference between masked and multi-head attention is in their implementations. For more information on this, refer to this answer on [Stackoverflow](https://stackoverflow.com/questions/58127059/how-to-understand-masked-multi-head-attention-in-transformer).
3. **Multi-head attention**: The final attention block takes in the input and target sentences' representations from the previous two attention blocks. This attention block is the end of encoder architecture. The architecture following the final multi-head attention marks the beginning of the decoder architecture. 

![attention blocks in transformer model](/engineering-education/nlp-transfer-learning/transfomer_with_attention.png)

[*Image Source*](https://arxiv.org/pdf/1706.03762.pdf)

The input to the transformer is the entire sentence. Each transformer unit outputs a probability for the most likely word to appear after the current word. 

The advantage of using transformers is the parallelizable features that it provides. During the training of large models, significant speed ups were observed while training. In the paper, they also talk about an unexplored advantage, that is, explainability.

### Applications of Transformers
- Machine Language Translation: The current systems used at Google are transformer-based models. These models generalize well over all the different languages and perform the best in class. Google translation services have improved significantly over the past year. 
- Text Generation: Given a context, we can use a transformer to generate the most likely word to occur. Similarly, we can extend this concept to generate the most likely sentence to occur, given the context. The context can be textual or pictorial. If the context is textual, then the model is learning to generate text. If the context is an image, then the task is called image captioning. 
- Text Summarization: This problem can be posed as a machine translation task, where the input is the source sentence, and the output is a summarized piece of text. These architectures can easily perform abstractive summarization. Abstractive summarization refers to the task of generating summaries that have been interpreted and rewritten by the model.
 
### Conclusion
In this article, we have discussed the critical concept of the transformer and the attention mechanism. Such architectures have resulted in advancing the pace of research in transfer learning in NLP. I hope you enjoyed reading this article as much as I enjoyed writing it. 

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)

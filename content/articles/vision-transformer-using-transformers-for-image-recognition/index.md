---
layout: engineering-education
status: publish
published: true
url: /vision-transformer-using-transformers-for-image-recognition/
title: Vision Transformer (ViT) - Using Transformers for Image Recognition
description: This article will explore how transformers are directly applied to image recognition. This is a shift from previous architectures that proposed using attention with CNNs or changing modules in CNNs.
author: willies-ogola
date: 2021-02-16T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/vision-transformer-using-transformers-for-image-recognition/hero.jpg
    alt: Transformers for Image Recognition example image
---
How many words is an image worth? This [paper](https://arxiv.org/abs/2010.11929), recently published by Google's research team, tells us that an image is worth 16 x 16 words. Let me explain what they meant by this to help you better understand.
<!--more-->
### Prerequisites
To understand this article's content, a reader ought to have a basic understanding about Natural Language Processing (NLP) and Convolution Neural Networks (CNNs). 

### Introduction
Transformers were proposed in this [paper](https://papers.nips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf) for machine translation but have since become the main architecture in solving NLP tasks such as speech recognition and text summarization. They are behind the recent developments in NLP, including OpenAI's GPT-3 and Google's BERT.

Previously, there have been attempts to use transformers for image recognition tasks. These attempts either used transformers with convolutional networks or transformed convolutional networks by replacing certain modules. In this published [paper](https://arxiv.org/abs/2010.11929), they did not rely on CNNs at all. 

They relied purely on the standard transformer architecture, the dominant architecture in Natural Language Processing (NLP). The only trick they did is break down an input image into a sequence of image patches (16 x 16) fed in as the standard transformer input. But the rest of the transformer architecture remained the same.

These image patches are viewed in the same way as words (tokens) in the NLP context. Hence, the relation between viewing the 16 x 16 input images as 16 x 16 words.

Results show that this novel architecture outperformed state-of-the-art CNNs, known as the dominant network architecture for image recognition.  

### An overview of the model
![Vision Transformers model overview](/engineering-education/vision-transformer-using-transformers-for-image-recognition/vision-transformer-model-overview.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

The model's first step is to divide an input image into a sequence of image patches. The paper divided the images into 16 x 16 dimensions, hence the paper's title. 

These image patches are then passed through a trainable linear projection layer. This layer plays the role of an embedding layer and outputs fixed size vectors. 

Position embeddings are then linearly added to the sequence of image patches so that the images can retain their positional information. It injects key information about the relative or absolute position of the image patches in the sequence.

An important feature to note in the position embedding module is the 0th class. This idea of the 0th class is borrowed from [BERT's](https://arxiv.org/pdf/1810.04805.pdf) class token. Like the other classes, this class is also learned, but it doesn't come from its image. Instead, it is hardcoded in the model architecture.

The idea behind how position embedding works is demonstrated in the image below:

![The sequence of the images](/engineering-education/vision-transformer-using-transformers-for-image-recognition/image-sequence.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

If we do not provide the transformer with the positional information, it will have no idea of the images' sequence (which comes first and the images that follow it). This sequence of vector images is then fed into the transformer encoder. 

The Transformer encoder module comprises a Multi-Head Attention layer and a Multi-Layer Perceptron (MLP) layer. While we are familiar with the MLP layer, the Multi-Head Attention layer is a novelty in transformers. 

The Multi-Head Attention layer split inputs into several heads so that each head can learn different levels of self-attention. The outputs of all the heads are then concatenated and passed through the Multi-Layer Perceptron. 

It is also important to note that transformers apply normalization layers (Layer Norm) before every block and residual block right after.

Finally, an extra learnable classification module (the MLP Head) is added to the transformer encoder, giving the network's output classes.

### Results
#### 1. Accuracy
When the ViT model is pre-trained on the ImageNet-21k dataset and the JFT-300M dataset, the model trumps the best models on many image recognition benchmarks. 

For instance, ViT's best model attains the following accuracies:
- 88.55% on ImageNet
- 90.72% on ImageNet-ReaL
- 94.55% on CIFAR-100
- 77.63% on the VTAB suite of 19 tasks

![Results on the Image Classification Benchmarks](/engineering-education/vision-transformer-using-transformers-for-image-recognition/main-results.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

#### 2. Impact of dataset size
The size of the dataset seems to play a major role in the vision transformer model. Since transformers lack inherent biases present in CNNs, i.e., locality, equivariance, and translation, they tend to generalize poorly on mid-sized datasets such as ImageNet. 

But, when trained on the ImageNet-21 and JFT-300M (Google's in-house dataset), which are larger datasets with about 14M-300M images, it was found that inductive bias was outperformed. They also found the accuracy to increase with the larger datasets.

These results are shown below:

![Pre-trained dataset results](/engineering-education/vision-transformer-using-transformers-for-image-recognition/pre-trained-dataset-results.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

#### 3. Task Transfer
Task transfer states that knowledge should be transferrable between tasks. For example, if the first task is to classify cats and dogs, and the second task is to classify horses and cows, you should transfer knowledge between these two task groups. 

This is because they are all four-legged animals. Thus, the knowledge that classes the cats and dogs should also be similar to that which classes horses and cows.

![Visual Task Adaptation Benchmark's Accuracy Performance](/engineering-education/vision-transformer-using-transformers-for-image-recognition/vtab-accuracy-performance.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

When evaluated on the Visual Task Adaptation Benchmark (VTAB), the visual transformer model was found to outperform previous models on the natural, specialized, and structured task groups.

#### 4. Attention Maps
They used Attention Rollout proposed in this [paper](https://arxiv.org/pdf/2005.00928.pdf) to compute attention maps from output words to input spaces. 

The results from their experiments are shown below:

![Examples of Attention Maps](/engineering-education/vision-transformer-using-transformers-for-image-recognition/examples-of-attention-maps.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2010.11929.pdf)*

### Summary of the Model
- Vision Transformer (ViT) requires substantially less computing power to train. It takes 2.5k TPUv3-days to train it. It seems like a lot, but it's still less compared to the current state-of-the-art methods.
- Huge models (ViT-H) generally do better than large models (ViT-L) and wins against state-of-the-art methods.
- Attention Rollouts are used to compute the attention maps.
- Like the GPT-3 and BERT models, the Visual Transformer model also can scale.
- Large scale training outperforms inductive bias.

### Wrapping Up
In this article, we have explored how transformers are directly applied to image recognition. This is a shift from previous architectures that proposed using attention with CNNs or changing modules in CNNs. We have seen that no inductive biases, such as localization and equivariance, are introduced into the architecture. 

Instead, only a standard transformer encoder is used. The only trick they used was to transform an input image into a sequence of 16 x 16 image patches. It is a simple, scalable architecture, and outperforms state-of-the-art architectures, especially when trained on large datasets such as the JFT-300M dataset. It's also relatively cheap to pre-train the model.

Transformers completely replaced Long Short-Term Memory (LSTM) in NLP. Now, they aim to replace Convolutional Neural Networks (CNNs). It is a promising model that might make CNN's extinct in the future, but not yet. It is still challenging for the model to perform other computer vision tasks, such as image segmentation and detection.

### References
1. [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)
2. [Big Transfer (BiT): General Visual Representation Learning](https://arxiv.org/pdf/1912.11370.pdf)
3. [Attention Is All You Need](https://papers.nips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)
4. [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/pdf/1810.04805.pdf) 
5. [Quantifying Attention Flow in Transformers](https://arxiv.org/pdf/2005.00928.pdf)

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)

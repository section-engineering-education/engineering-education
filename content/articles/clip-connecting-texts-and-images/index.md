---
layout: engineering-education
status: publish
published: true
url: /clip-connecting-texts-and-images/
title: Connecting Textual and Image Data using Contrastive Language-Image Pre-Training (CLIP)
description: In this article, we will explore how the CLIP model connects images and texts. (CLIP) is a learning method developed by OpenAI that enables models to learn visual concepts from natural language supervision.
author: willies-ogola
date: 2021-05-11T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/clip-connecting-texts-and-images/hero.jpg
    alt: CLIP example image
---
Contrastive Language-Image Pre-Training (CLIP) is a learning method developed by OpenAI that enables models to learn visual concepts from natural language supervision. 
<!--more-->
This model's main objective is to take images and texts and connect them in a non-generative way.
### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Approach](#approach)
4. [Results](#results)
5. [Key takeaways](#key-takeaways)
6. [Wrapping Up](#wrapping-up)
7. [References](#references)

### Prerequisites
Before reading this article, the reader needs to be familiar with transformers in Natural Language Processing (NLP), Convolutional Neural Networks (CNN), and the working of the novel [self-supervised learning (SSL)](/what-is-self-supervised-learning/) algorithm. 

### Introduction
It isn't entirely a novel idea, but many image-text pair ideas in the past have inspired the CLIP model. There have been papers before predicting the caption of images, but most models don't work too well. A few examples of these models that inspired the CLIP model include the [ConVIRT](https://arxiv.org/pdf/2010.00747.pdf) model. 

This model learns visual representations of medical images by exploiting the naturally occurring pairing of images and textual data, and the [VirTex](https://arxiv.org/pdf/2006.06666.pdf) model, which jointly trained an image CNN and text transformer to predict the captions in visual representations.

So, how does the CLIP model connect images and texts?

### Approach

![The CLIP model](/engineering-education/clip-connecting-texts-and-images/clip-model.PNG)

*[Image Source: OpenAI](https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf)*

### Contrastive pre-training
Contrastive pre-training involves training an image encoder and a text encoder in the multi-modal embedding space to predict the correct pairings of a batch of (image, text) training examples.

#### The image encoder
Image augmentation is first performed on the images before being passed into the image encoder module. 

Two different architectures are used for the image encoder: the ResNet-50 and the Vision Transformer (ViT). The ResNet-50 model was one of the earliest convolutional neural network and has 50 layers in depth. Because of its deep framework, it is popularly used to train ultra deep neural networks. 

In the first architecture, the ResNet-50 model is used as the base image encoder architecture. The global average pooling layer present in the ResNet-50 was replaced with an attention pooling mechanism popularly used in NLP to compose representations.

In the second architecture, they used the Vision Transformer (ViT) recently introduced by Google. The only modification performed on this architecture is the addition of the layer normalization just before the transformer module. 

This layer is added to the combined patch and position embeddings layers. The outputs from the image decoder are fed into the multi-modal embedding space.

#### The text encoder
The text encoder is a Transformer with 12-layers, a 512-wide model with eight attention heads, and it is used as the base architecture for the text encoder. The text encoder uses the start-of-sequence (SOS) and end-of-sequence (EOS) token signals used in NLP as feature representations of the text inputs. These representations are layer normalized and linearly projected into the multi-modal embedding space.

In this module, it is essential to note that they only scale the model's width so that it can be proportional to the calculated increase in width of the ResNet-50 architecture in the image decoder. This is essential as both the image encoder and the text encoder are to be jointly trained in the multi-modal embedding space. Only the width is scaled; its depth is not scaled at all.

#### The multi-modal embedding space
In the multi-modal embedding space, the image encoder and text encoder are jointly trained to maximize the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) of the image and text embeddings of the real pairs in the batch. On the flip side, the cosine similarity of the embeddings with incorrect pairings was also minimized. 

For example, in a batch size of N (image, text) pairs, the model predicts which of the N X N possible (image, text) pairings across a batch are similar and incorrect pairs. This means that real pairs have a cosine similarity value closer to 1, while incorrect pairs had a value closer to 0.

### Create dataset classifier from label text
Here, they perform the pattern exploiting training which involves leveraging pre-trained language models to label data for downstream tasks. They embed object classes into captions such as "a photo of an {object}" or "a centered satellite photo of {object}." 

For example, "a photo of a dog" or "a centered satellite photo of pasture land." They encode these captions into the text encoder configured with pre-trained weights from the multi-modal embedding space training. This process produces batches of text embeddings.

This process allows for zero-shot classification. 

### Use for zero-shot prediction
Zero-shot learning is a new research area that predicts objects during test time whose classes were not seen during training. In the CLIP model, zero-shot learning is used in a broader sense to generalize any unseen datasets.

This prediction is accomplished by taking the input image that we want to classify and pass through the image encoder. This produces its embedding vector. They then performed the cosine similarity between the image's embedding vector and the textual embedding vectors. The value with the highest cosine similarity (closer to 1) is the predicted class. 

For example, if the input image were the photo of a horse, the output with the highest similarity would be "a photo of a horse."

That's how the method works in a nutshell. I hope it was clear enough. 

Now, let's take a look at their results.

### Results

![Results on different datasets](/engineering-education/clip-connecting-texts-and-images/results-on-different-datasets.PNG)

*[Image Source: OpenAI](https://openai.com/blog/clip/)*

It is evident that these classifiers perform well on a wide range of tasks, but not all the time. For example, it correctly classified the guacamole, television studio, and airplane result while misclassified the annual cropland as permanent cropland. 

We can also distinctly note that these results are all from a diverse set of tasks and different datasets, i.e., Food101, Sun397, YouTube-BB, and Eurosat dataset.

Interestingly, it is also important to note that the labels are not the typical type of labels that we would see in a classifier. For example, the model classifies the label guacamole correctly and attaches the tag "a photo of guacamole, a type of food." This is new.

The model performs these tasks purely through "zero-shot learning," which means that the model had not seen these images of different datasets before being tested on them. It's not trained on these tasks but seems to perform well enough.

### Key takeaways
1. The CLIP model is highly efficient. This is attributed to the contrastive learning approach, which is efficient at zero-shot ImageNet classification. Besides, its efficiency is also attributed to the use of the [Vision Transformer (ViT)](https://arxiv.org/pdf/2010.11929.pdf) developed by Google, which tries to replace CNNs by using Transformers for image classification. The adoption of ViT was able to improve the computational efficiency of the model.

2. The CLIP model is not initialized with pre-trained weights both on the image encoder and the text encoding. They argue that once you have enough compute and data, one doesn't need to initialize pre-trained weights in any way.

### Wrapping up
This article described the CLIP model developed by researchers at OpenAI. It is a fascinating novel approach to using contrastive pre-training to perform zero-shot prediction on input images. The model is highly efficient, flexible, and offers an exciting approach to the image classification problem. 

It is also interesting to see that they used the Vision Transformer (ViT) over the standard ResNet architecture. We are starting to notice a shift from Convolutional Neural Network's use to more modern architectures like the Transformers to solve image classification problems.

I hope you enjoyed reading this article. 

Happy learning!

### References
1. [Learning Transferable Visual Models From Natural Language Supervision](https://cdn.openai.com/papers/Learning_Transferable_Visual_Models_From_Natural_Language_Supervision.pdf)
2. [CLIP: Connecting Text and Images](https://openai.com/blog/clip/)
3. [Vision Transformer (ViT)](https://arxiv.org/pdf/2010.11929.pdf)
4. [ConVIRT](https://arxiv.org/pdf/2010.00747.pdf)
5. [VirTex](https://arxiv.org/pdf/2006.06666.pdf) 

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)

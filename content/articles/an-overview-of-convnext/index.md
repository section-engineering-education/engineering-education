---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-convnext/
title: An Overview of ConvNeXt
description: This article will discuss how ConvNets borrows ideas from modern training tricks that Transformers usually benefit from to build the ultimate ConvNext architecture.
author: sharon-kinyan
date: 2022-02-25T00:00:00-03:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-convnext/hero.png
    alt: An Overview of ConvNeXt Example Image
---
For many years, we have used ConvNets as the default model in image classification. But, this changed when Vision transformers, previously introduced to solve problems in Natural Language Processing (NLP), took over the state-of-the-art Convolutional Neural Network in solving image classification tasks. This research is discussed in this [paper](https://arxiv.org/pdf/2010.11929.pdf).
<!--more-->
A recent [research](https://arxiv.org/abs/2201.03545) claims that by borrowing ideas from the successes of the Vision transformer and CNNs, one can build a pure ConvNet whose performance match state-of-the-art-models like the Vision transformer.

This ConvNet takes a standard neural network, a ResNet-50, and morphs it such that the design approaches a vision transformer. Besides, it surpasses the Transformer in terms of performance.

This article will discuss how ConvNets borrows ideas from modern training tricks that Transformers usually benefit from to build the ultimate ConvNext architecture.

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- [Convolution Neural Networks](/engineering-education/basics-of-convolution-neural-networks/).
- [Natural Language Processing](/engineering-education/five-real-life-use-cases-of-natural-language-processing-nlp/).

### Relationship between ConvNets and Transformers
In 2012, the Deep learning renaissance was largely driven by ConvNets. The introduction of AlexNet established the "ImageNet moment" in computer vision.

This moment has rapidly evolved over the years to better and more efficient models such as VGGNet, Inception, ResNeXt, DenseNet, MobileNet, and EfficientNet.

The success of CNNs is based on their ability to share parameters within the image locations, induce translations, and equivariance.

Transformers were introduced for text processing in 2017. This model only had some applications in image generation and image-text understanding.

Due to this, Transformers went unnoticed in the computer vision world. But in the field of Natural Language processing, it was widely used and very successful.

It wasn't until early 2021 when the Google Research team released a [paper](https://arxiv.org/pdf/2010.11929.pdf) detailing how Transformers could outperform ConvNets in solving computer vision tasks.

This Transformer model introduced a patch layer that splits an image into a sequence of patches of 16 by 16 pixels. This Transformer model is called the Vision Transformer (ViT). You can read more about it in this [article](/engineering-education/vision-transformer-using-transformers-for-image-recognition/).

Yet, the ViT had to rely heavily on a lot of training tricks such as data augmentation to make it reach the performances of state-of-the-art models like ConvNets.

This model faced difficulties when it came to solving more general computer vision tasks. This led to the release of a new vision transformer model.

In mid-2021, a new transformer model called the Swin Transformer was released. It is discussed in this [paper](https://arxiv.org/abs/2103.14030).

It introduced sliding windows (used in CNNs), which make them resemble ConvNets pretty much. This model made the vision transformer more general-purpose and could be used for a wide variety of vision tasks.

So, what if we morphed ConvNets towards the Swin Transformer? Will modernizing ConvNets make them stylish enough for the 2020s? Since the style of the 2020s is given by the Transformers, the goal is to make ConvNets more transformer-like.

How do they do this?

### Transforming from ConvNet to ConvNeXts
#### Modernizing a standard ResNet
Taking a ResNet-50, they train it using similar techniques as the Vision Transformer.

They use the [AdamW](https://towardsdatascience.com/why-adamw-matters-736223f31b5d) optimizer, train it using more epochs, apply some heavy data augmentation technique, and regularization. These techniques applied together, increase the performance of ResNet-50 from 76.1% to 78.8% on the ImageNet Top1 accuracy.

#### Redesigning the Macro design of the ResNet
For the stage ratio, they adjusted the number of blocks in each stage which improves the model accuracy. They make the sliding windows in ResNet behave more similarly to the patches of the vision transformer.

So, with a large kernel size and a stride such that the sliding window does not overlap, this looks pretty much like the non-overlapping patches in the transformer. Though by only a bit, this redesigning increases the model's performance.

#### The idea of inception
It involves adopting the idea of inception that [ResNeXt](https://arxiv.org/pdf/1611.05431.pdf) had introduced before. It involves splitting, transforming, and merging information.

The main idea here is on depthwise convolution. It is a special case of grouped convolutions. Here, the number of groups equals the number of channels.

> These convolutions are like the weighted sum operation in self-attention. They operate on a per-channel basis by only mixing information in the spatial dimension. The adoption of this idea substantially improves performance.

#### The inverted bottleneck
In Swin Transformers, every transformer block creates an inverted bottleneck. The output of four blocks that get concatenated increases the size of the hidden dimensions by four times.

In ConvNeXts, they copy this idea by devising an inverted bottleneck with an expansion ratio of `4`. They find that it increases the performance of the model.

This idea was initially popularized by MobileNetV2. You can read more about it [here](https://paperswithcode.com/method/mobilenetv2).

#### Increasing the kernel size
Increasing the kernel sizes is essential as it tries to equal the power of vision transformer models with a global receptive field. The vision transformer tends to view the whole image at once through self-attention that spans the entire image.

Swin transformers tend to limit the self-attention window. If the ResNets window size increases, we reach the same compromise.

#### Micro design choices
- They replace the Rectified Linear Unit (ReLU) activation function with the Gaussian Error Linear Unit (GELU) used in the ViT, BERT, and GPT-2 models.
- They use fewer normalization layers because transformers use them less often.
- They replace Batch Normalization (BL) with Layer Normalization (LN).

All these micro redesign choices, combined with using separate downsampling layers, have a tremendous impact on performance. It increases the model's performance to 82.0% on the ImageNet Top1 Accuracy exceeding the Swin Transformer.

### Wrapping up
Techniques used in this research are not novel. These are techniques that have been used separately in previous research. This research combines these techniques and uses them collectively.

Not only are ConvNeXts competitive with Transformers in solving image classification tasks, but also in solving general-purpose computer vision tasks, i.e., image segmentation and object detection tasks.

This paper demonstrates that it is, rather, the many seemingly tiny architecture hyperparameters and not the architecture itself that can tweak the way to state-of-the-art.

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

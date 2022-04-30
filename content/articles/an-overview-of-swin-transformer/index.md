---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-swin-transformer/
title: An Overview of Swin Transformer
description: This article will give an overview of the Swin transformer model.
author: lilian-cheptoo
date: 2022-04-06T00:00:00-04:50
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-swin-transformer/hero.png
    alt: An Overview of Swin Transformer Hero image
---
In 2021, Transformers were introduced to replace the popular Convolutional Neural Networks (CNNs) in solving computer vision tasks. They referred to this model as the Vision Transformer (ViT).
<!--more-->
It produced state-of-the-art performance - overtaking CNNs. However, the model could only solve simple classification tasks well and could not generalize well in complex vision tasks such as semantic segmentation and object detection.

Researchers introduced the Swin Transformer model to solve this problem. It introduced sliding windows (used in CNNs) into Transformers, which made them resemble ConvNets. This article will give an overview of this model.

### Problems with the Vision Transformer (ViT)
In early 2020, the Vision Transformer model was released by the Google research team. It is discussed in this research [paper](https://arxiv.org/abs/2010.11929).

This research was hype in the research community as the model introduced the popular Transformers used in Natural Language Processing (NLP) to solve computer vision tasks.

Given an input image, i.e., 1920px by 1080px, the model breaks down an image into 16 by 16px patches before sending them into the input layer.

These patches are transformed into patch vectors by linear transformation. A positional embedding (to keep positional information) is added onto the generated linear projections and then fed into a standard Transformer Encoder.

This process is the same as how Transformers process word vectors in NLP. Thereafter, classification is done on the images.

ViT was a huge success, and it was able to outperform most of the state-of-the-art architectures such as CNN in solving computer vision tasks. But, this model is not perfect. There are a few problems with the ViT:

- Quadratic computation complexities. This complexity comes about as the ViT model computes self-attention globally. As you increase the image sizes, the computational time increases quadratically.
- ViTs first split up images into patches to keep the sequence length within computational bounds. Not many problems will arise when solving classification tasks. But this process is problematic for the task that requires detailed processing for every pixel such as in object detection and semantic segmentation. Due to its computation complexities, the model faced difficulties when it came to solving more general-purpose and dense computer vision tasks.

### What is the Swin Transformer
The Swin Transformer model is a model researched by the Microsoft research team in Asia. The word `Swin` (in Swin Transformer) is an acronym that stands for `Shifted window`. This `shifted window` concept is not new to the research community. It has been used in CNNs for many years. It is one of the CNN features that has made it excel in the computer vision realm as it brought about great efficiency. However, it had not been used in Transformers before.

The ViT model introduced Transformers to computer vision. But it is the Swin Transformer that added this feature to Transformers.

This model still uses patches as in the ViT model. However, instead of using one size as in ViT (16 by 16px), the Swin Transformer first starts with small patches in the first Transformer layer.

The model merges these layers into bigger ones in the deeper layers. It takes an image and splits it into 4px by 4px patches. Each patch is a colored image with three channels. Thus, a patch has a total of 48 feature dimensionality. That is, `4 x 4 x 3 = 48`. It is then linearly transformed into a dimensionality called `C`, of your choice.

So far, compared to ViTs, the image patches are smaller in size. The value, `C`, determines the size of your Transformer model. For example, we have different BERT model variants.

A BERT-Base variant with 748 dimensionalities, and a BERT-Large variant with 1024. In this case, the C is 748 and 1024. The value, `C` determines the number of hidden parameters in the fully connected layers. The Swin Transformer also has its variants. The Swin-Tiny with `C=96`, and Swin-Large with `C=192`.

Essentially, 4 x 4 px initial patches are fed as inputs. These patches are converted linearly into C-dimensional vectors. Unlike the ViT model, which processes these vector inputs quadratically, the Swin Transformer employs a clever approach (shifted window approach) when dealing with this issue, preventing the complexity issue from arising.

It adds a linear computation complexity to the image input size. It computes self-attention only within the local window and not globally as is with the ViT model. This feature enables the model to perform dense recognition tasks and allows it to be used for more general-purpose computer vision tasks.

The output then gets merged by a `merging layer`. It concatenates the vectors of groups of `2x2` neighboring patches in the image.

Each time the attention window shifts with respect to the previous layer. For example, if in the first layer, the attention was limited to the neighborhood of these regions, in the next layer, the regions are shifted (like in strided convolution).

Patches that landed in separate windows in the first layer and could not communicate, can now do so in layer two. These resulting patches are merged by the merging layer. This process is repeated depending on the number of layers chosen.

Here's a summarized architecture of the Swin Transformer.

![Architecture of the Swin Transformer](/engineering-education/an-overview-of-swin-transformer/swin-transformer.png)

_Image Source: [GitHub](https://github.com/microsoft/Swin-Transformer)_

The Swin Transformer outperforms ViT on image classification, semantic segmentation, and object detection tasks. In instances where every pixel must be labeled, such as in semantic segmentation, is where we see the Swin Transformer excel.

### Implementing an example using the Swin Transformer for Image Classification
The Hugging team pre-built the Swim Transformer model to demonstrate how to use the model using PyTorch.

We begin by installing Transformers:

```bash
!pip install transformers
```

Next, we need to import the libraries necessary for the model to work:

```python
from transformers import AutoFeatureExtractor, SwinForImageClassification
from PIL import Image
import requests
```

- We've imported the `AutoFeatureExtractor` to help in feature extraction, and the `SwinForImageClassification` imports the actual Swin Transformer model into our code.
- `PIL` is the Python Imaging Library which provides the python interpreter with image editing capabilities.
- `requests` allows you to send HTTP requests using Python.

```python
url = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
image = Image.open(requests.get(url, stream=True).raw)
```

The URL above gives us the link to the image of a beagle dog on [Unsplash](https://unsplash.com/). We use `requests` to send an HTTP request to open the image. The image is stored inside a variable called `img`.

Using the `AutoFeatureExtractor`, we'll extract features on the pre-trained model from HuggingFace. We are using the `swin-tiny-patch4-window7-224` variant mentioned earlier, with its C (number of hidden layers) being 96. We save these features inside the `feature_extractor variable`. Additionally, we load the pre-trained model and save it inside the variable, `model`:

```python
feature_extractor = AutoFeatureExtractor.from_pretrained("microsoft/swin-tiny-patch4-window7-224")
model = SwinForImageClassification.from_pretrained("microsoft/swin-tiny-patch4-window7-224")
```

Finally, we perform a prediction on the class of the image:

```python
predicted_class_idx = logits.argmax(-1).item()
print("Predicted class:", model.config.id2label[predicted_class_idx])
```

Output:

```bash
Predicted class: beagle
```

The model has correctly predicted the image fed into the model. You can find the complete code for this tutorial [here](https://colab.research.google.com/drive/1H27NOzxxaZ1NfjCI6dL1zOUrHbbYh2yt?usp=sharing).

### Wrapping Up
The Swin Transformer model is a new vision transformer model that produces a hierarchical feature representation and has linear computational complexity with respect to the input image size. It achieves state-of-the-art results on COCO object detection and semantic segmentation compared to the previous Vision Transformer (ViT) model.

These performances are attributed to the shifted-window-based self-attention method deployed in this model, which is the key to making it work. You can take the ideas presented in this paper and apply them to help solve a problem of your interest.

Additionally, you can read about [ConvNets](/engineering-education/an-overview-of-convnext/). It is a pure Convolution Neural Network that borrows ideas from Transformers. Vision Transformers tries to drop convolutions.

Swin Transformers is an improved ViT model with a hierarchical way of processing the image, making it more general purpose. ConvNets tries to borrow from Transformers and build a state-of-the-art model with pure convolutions. Please read on all three models as they all relate to solving computer vision tasks.

### Further reading
- [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030).
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929).
- [ConvNets](/engineering-education/an-overview-of-convnext/).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)

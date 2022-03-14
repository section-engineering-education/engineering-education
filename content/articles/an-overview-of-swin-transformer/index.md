In 2021, Transformers were introduced to replace the popular ConvNets in solving computer vision tasks. This Transformer model introduced a patch layer that splits an image into a sequence of patches of 16 by 16 pixels. This Transformer model is called the Vision Transformer (ViT). Yet, the ViT had to rely heavily on a lot of training tricks such as data augmentation to make it reach the performances of state-of-the-art models like ConvNets. This model faced difficulties when it came to solving more general computer vision tasks. This led to the release of a new vision transformer model called the Swin Transformer.

It introduced sliding windows (used in CNNs) into Transformers, which made them resemble ConvNets pretty much. This model made the vision transformer more general-purpose and could be used for a wide variety of vision tasks.

This article will give an overview of this model.

### Problems with the Vision Transformer (ViT)
In early 2020, the Vision Transformer model was released by the Google research team. It was discussed in this research [paper](https://arxiv.org/abs/2010.11929). This research was a hype in the research community as the model introduced the popular Transformers used in Natural Language Processing (NLP) to solve computer vision tasks. Given an input image, i.e., 1920px by 1080px, the model broke down the image into 16 by 16px patches before sending them into the input layer. It added positional embedding (to keep positional information) onto the generated linear projections and then fed into a standard Transformer Encoder. Thereafter, classification done on the images.

It was a huge success and it was able to outperform most of the state-of-the-art architectures such as CNN in solving computer vision tasks. But, this model is not perfect. There are a few problems with the ViT:

- Quadratic computation complexities. This complexity comes about as the ViT model computes self attention globally. As you increase the image sizes, the computational time increases quadratically. 
- Due to its computation complexities, the model faced difficulties when it came to solving more general purpose and dense computer vision tasks. Some of these dense computer vision task include semantic segmentation and object detection.

### What is the Swin Transformer
The word `Swin` in Swin Transformer is an acronym that stands for `Shifted window`. `This shifted window` concept is not new to the research community. It has been used in CNNs over many years. Infact, it is one of the CNN features that has made it excel in the computer vision task as it brought about great efficiency. But, it had not been used in Transformers before. 

Unlike the ViT model, the Swin Transformer employs a clever approach when dealing with the complexity issue. It adds a linear computation complexity to the image input size. It computes self attention only within the local window and not globally as is with the ViT model. This feature enables the model perform dense recognition tasks and allows it to be used for more general purpose computer vision tasks. 

### Architecture of the Swin Transformer

### Wrapping Up
You can also read about [ConvNets](/engineering-education/an-overview-of-convnext/). A pure Convolution Neural Network that borrows ideas from Transformers. Vision Transformers tried to drop convolutions, Swin Transformers improved the ViT model making it general purpose, and ConvNets tries to borrow from Transformers and build a state-of-the-art model with pure convolutions. Please read on all the three models as they all relate to solving computer vision tasks. 

### Further reading
- [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030).
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929).
- [ConvNets](/engineering-education/an-overview-of-convnext/).

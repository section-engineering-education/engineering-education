In 2021, Transformers were introduced to replace the popular ConvNets in solving computer vision tasks. This Transformer model introduced a patch layer that splits an image into a sequence of patches of 16 by 16 pixels. This Transformer model is called the Vision Transformer (ViT). Yet, the ViT had to rely heavily on a lot of training tricks such as data augmentation to make it reach the performances of state-of-the-art models like ConvNets. This model faced difficulties when it came to solving more general computer vision tasks. This led to the release of a new vision transformer model called the Swin Transformer.

It introduced sliding windows (used in CNNs) into Transformers, which made them resemble ConvNets pretty much. This model made the vision transformer more general-purpose and could be used for a wide variety of vision tasks.

This article will give an overview of this model.

### Problems with the Vision Transformer

### What is the Swin Transformer

### Architecture of the Swin Transformer

### Further reading
- [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030)
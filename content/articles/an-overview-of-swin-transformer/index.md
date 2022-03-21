In 2021, Transformers were introduced to replace the popular Convolutional Neural Networks (CNNs) in solving computer vision tasks. They referred to this model as the Vision Transformer (ViT). It produced state-of-the-art performance overtaking CNNs. But, the model could only solve simple classification tasks well and couldn't generalize well in complex vision tasks such as semantic segmentation and object detection. 

Researchers introduced the Swin Transformer model to solve this problem. It introduced sliding windows (used in CNNs) into Transformers, which made them resemble ConvNets pretty much. This article will give an overview of this model.

### Problems with the Vision Transformer (ViT)
In early 2020, the Vision Transformer model was released by the Google research team. It is discussed in this research [paper](https://arxiv.org/abs/2010.11929). This research was hype in the research community as the model introduced the popular Transformers used in Natural Language Processing (NLP) to solve computer vision tasks. Given an input image, i.e., 1920px by 1080px, the model breaks down an image into 16 by 16px patches before sending them into the input layer. 

These patches are transformed into patch vectors by a linear transformation. A positional embedding (to keep positional information) is added onto the generated linear projections and then fed into a standard Transformer Encoder. This process is the same as how Transformers process word vectors in NLP. Thereafter, classification is done on the images.

It was a huge success and it was able to outperform most of the state-of-the-art architectures such as CNN in solving computer vision tasks. But, this model is not perfect. There are a few problems with the ViT:

- Quadratic computation complexities. This complexity comes about as the ViT model computes self-attention globally. As you increase the image sizes, the computational time increases quadratically. 
- ViTs first split up images into patches to keep the sequence length within computational bounds. Not many problems will arise when solving classification tasks. But this process is problematic for the task that requires detailed processing for every pixel such as in object detection and semantic segmentation. Due to its computation complexities, the model face difficulties when it came to solving more general-purpose and dense computer vision tasks. 

### What is the Swin Transformer
The Swin Transformer model is a model researched by the Microsoft research team in Asia. The word `Swin` in Swin Transformer, is an acronym that stands for `Shifted window`. This `shifted window` concept is not new to the research community. It has been used in CNNs for many years. It is one of the CNN features that has made it excel in the computer vision realm as it brought about great efficiency. But, it had not been used in Transformers before. The ViT model introduced Transformers to computer vision, but it is the Swin Transformer that added this feature to Transformers.

This model still uses patches as in the ViT model. But, instead of using one size as in ViT (16 by 16px), the Swin Transformer first starts with small patches in the first Transformer layer. The model merges these layers into bigger ones in the deeper layers. It takes an image and splits it into 4px by 4px patches. Each patch is a colored image with three channels. Thus, a patch has a total of 48 feature dimensionality. That is, `4 x 4 x 3 = 48`. It is then linearly transformed into a dimensionality called, `C` of your choice. 

So far, compared to ViTs, the image patches are smaller in size. The value, `C`, determines the size of your Transformer model. For example, we have different BERT model variants. A BERT-Base variant with 748 dimensionalities, and a BERT-Large variant with 1024. In this case, the C is 748 and 1024. The value, `C` determines the number of hidden parameters in the fully connected layers. The Swin Transformer also has its variants. The Swin-Tiny with `C=96`, and Swin-Large with `C=192`.    

Essentially, 4 x 4 px initial patches are fed as inputs. These patches are converted linearly into C-dimensional vectors. Unlike the ViT model which processes these vector inputs quadratically, the Swin Transformer employs a clever approach (shifted window approach) when dealing with this issue preventing the complexity issue from arising. It adds a linear computation complexity to the image input size. It computes self-attention only within the local window and not globally as is with the ViT model. This feature enables the model to perform dense recognition tasks and allows it to be used for more general-purpose computer vision tasks. 

The output then gets merged by a `merging layer`. It concatenates the vectors of groups of `2x2` neighboring patches in the image.

Each time the attention window is shifted with respect to the previous layer. For example, if in the first layer, the attention was limited to the neighborhood of these regions, in the next layer, the regions are shifted (like in strided convolution). Patches that landed in separate windows in the first layer and could not communicate, can now communicate in layer two. These resulting patches are merged by the merging layer. This process is repeated depending on the number of layers chosen.  

Here's a summarized architecture of the Swin Transformer compared to the ViT.

![Architecture](/engineering-education/an-overview-of-swin-transformer/swin-transformer.png)

*Image Source: [Arxiv](https://arxiv.org/pdf/2103.14030.pdf)*

The Swin Transformer outperforms ViT on image classification, semantic segmentation, and object detection tasks. In instances where every pixel must be labeled such as in semantic segmentation, is where we see the Swin Transformer excel. 

### Wrapping Up
The Swin Transformer model is a new vision transformer model that produces a hierarchical feature representation and has linear computational complexity with respect to the input image size. It achieves state-of-the-art results on COCO object detection and semantic segmentation compared to the previous Vision Transformer (ViT) model. These performances are attributed to the use of shifted-window based self attention method deployed in this models which is the key to making it work. You can take the ideas presented in this paper and apply them to help solve a problem of your interest.

Additionally, you can read about [ConvNets](/engineering-education/an-overview-of-convnext/). It is a pure Convolution Neural Network that borrows ideas from Transformers. Vision Transformers tries to drop convolutions. Swin Transformers is an improved ViT model with a hierarchical way of processing the image, making it more general purpose. ConvNets tries to borrow from Transformers and build a state-of-the-art model with pure convolutions. Please read on all three models as they all relate to solving computer vision tasks.

### Further reading
- [Swin Transformer: Hierarchical Vision Transformer using Shifted Windows](https://arxiv.org/abs/2103.14030).
- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929).
- [ConvNets](/engineering-education/an-overview-of-convnext/).

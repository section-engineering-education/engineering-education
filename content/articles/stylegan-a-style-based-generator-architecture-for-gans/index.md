---
layout: engineering-education
status: publish
published: true
url: /stylegan-a-style-based-generator-architecture-for-gans/
title: StyleGAN - A Style-Based Generator Architecture for Generative Adversarial Networks 
description: Generative Adversarial Networks (GANs) are a great advancement in machine learning and have numerous applications. Perhaps one of the most used applications of GANs is in face generation. In this article, we will learn about the StyleGAN architecture in detail. 
author: willies-ogola
date: 2021-02-19T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/stylegan-a-style-based-generator-architecture-for-gans/hero.jpg
   alt: Hashtables implementation using CRC32 example image
---
Generative Adversarial Networks (GANs) are a great advancement in machine learning and have numerous applications. Perhaps one of the most used applications of GANs is in face generation. If you go to this [website](https://thispersondoesnotexist.com/), you'll find generated images of people who do not exist.
<!--more-->
### What is a Generative Adversarial Network (GAN)?
GANs are composed of a pair of neural networks that include a generator and a discriminator. Let's use an example to explain these two networks.

These two networks behave more like a counterfeiter and the police. The counterfeiter being the generator, while the police being the discriminator. The counterfeiter is constantly trying to print fake money while the police are trying to detect the counterfeiter's fake money. 

As the counterfeiter's fake money gets detected by the police, the counterfeiter tries to improve his craft by producing better notes that cannot be detected. This process continues until the counterfeiter's (generator) craft becomes so good that he produces notes that cannot be detected as fake, thus completely fooling the police (discriminator).

In the context of GANs, the generator uses Gaussian noise as inputs to generate fake images. These generated images are passed to the discriminator, that decides whether the images generated are fake or real. 

If detected as fake, the generator learns to generate better images until it finally generates good quality images. Thus, the discriminator cannot detect it as fake, eventually fooling the discriminator into classifying fake images as real images.

So, what are the main problems with GANs?

### Challenges with Generative Adversarial Networks
Despite improvements in image quality synthesis, the generator in Generative Adversarial Networks (GANs) still operates as black boxes. For example, the properties of the latent spaces and the understanding of various aspects of the image synthesis process still lack, e.g., the origin of stochastic features. 

In simple terms, we have no control over the style of the image that is being generated. We only feed in noise (latent noise vector) as the generator's input and wait for it to churn out images as its output.

### StyleGAN
The StyleGAN [paper](https://arxiv.org/pdf/1812.04948.pdf) proposed a model for the generator that is inspired by the [style transfer networks](https://arxiv.org/pdf/1703.06868.pdf). 

It re-designed GANs generator architecture in a way that proposed novel ways to control the image synthesis process. It easily separates the high-level attributes of an image, such as the pose and identity. 

The architecture can also separate stochastic variations in generated images such as the face color, frickles, hair, and beards. This enables the network to perform scale-specific mixing and interpolation operations.

It is important to note that all these changes happen on the generator network. The discriminator module is not modified in any way.

### An overview of the StyleGAN architecture
![Traditional architecture vs Style-based generator](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/traditional-vs-style-based-generator.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1812.04948.pdf)*

The main contributions of the StyleGAN architecture are:
1. The introduction of a mapping network.
2. The introduction of the Affine Transformation (A) and Adaptive Instance Normalization (AdaIN).
3. The addition of a noise vector (B).

#### The Mapping network 
The mapping network consists of a multi-layer perceptron (MLP) with eight layers. Its role is to encode the input latent vector z into an intermediate latent space W. This input latent vector z must have the probability density of the training data, thus having a strong effect on how the various factors have represented the network. 

Unlike traditional architecture, where the latent vector is provided to the generator through an input layer, with StyleGAN, we start from a learned constant. The input layer is omitted in this architecture.

The W vectors are then fed into the Affine Transformation module (A). The letter y represents the output styles of module (A). These outputs, y along with the features of the previous convolutions x, are passed as input to the Adaptive Instance Normalization layers.

Additionally, we have a constant tensor of size 4 x 4 x 512 feeding the synthesis network g, consisting of 18 layers.

#### The Affine Transformation (A) and Adaptive Instance Normalization (AdaIN)
Adaptive Instance Normalization (AdaIN) is a normalization technique that is derived from the Batch Normalization technique. Batch Normalization was first introduced to GANs to improve the discriminator training. 

They are also recently being used in generative image modeling. 

The batch normalization algorithm is shown below:

![The Batch Normalization algorithm](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/batch-normalization.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1703.06868.pdf)*

Batch normalization computes the mean and standard deviation of x. It also has two parameters, gamma, and beta which act as the scale and translation factors. 

Instance Normalization uses the batch normalization algorithm for every instance. The algorithm treats each instance in a batch separately rather than batch normalization, where you use an entire batch to compute the mean and standard deviation. This improved the network's ability to learn the style. 

As presented in this [paper](https://arxiv.org/pdf/1701.02096.pdf), the style transfer appears to be finer when instance normalization is used than batch normalization. 

The results are shown below:

![Batch Normalization vs Instance Normalization](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/batch-normalization-vs-instance-normalization.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1701.02096.pdf)*

Though the mathematical representation between batch normalization and instance normalization is the same, the computation of instance normalization is done for every instance in a batch.

Adaptive Instance Normalization (AdaIN) stems from the batch normalization algorithm and is an extension of Instance Normalization. 

This algorithm is shown below:

![The Adaptive Instance Normalization algorithm](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/adaptive-instance-normalization.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1703.06868.pdf)*

The algorithm receives two inputs: input x and style input y. The input x represents features from the previous layer convolutions, while y represents the Affine Transformation module (A). It is style input y that controls the style of the images that are being generated. 

It is important to note that AdaIN has no learnable parameters. This is unlike batch normalization and instance normalization, that both have learnable parameters. Rather, it adaptively computes the affine parameters from the style input.

#### The noise vector (B)
A noise vector is introduced into the synthesis network through the affine transformation layer (B). They are added throughout the network, not just in the beginning as it was with GANs. It consists of single-channel images of un-correlated gaussian noise. It is added to the output of each corresponding 3 x 3 convolution layer. 

The noise vector is introduced to induce stochastic details into images in the network. Thus, adding noise is ideal for controlling stochastic variations such as differently combed hair, skin pores, freckles, and beards. 

All these stochastic variations can be adjusted without affecting the overall perception of the image. It leaves the overall composition of the image and the high-level aspects such as identity intact.

### The FFHQ dataset
The [CELEBA-HQ dataset](https://github.com/switchablenorms/CelebAMask-HQ) has been widely used in the style transfer literature. But, in the paper, they came up with a dataset of human faces named the [Flickr-Faces-HQ dataset (FFHQ)](https://github.com/NVlabs/ffhq-dataset). 

The dataset consists of 70,000 images of very high resolution (1024×1024). These images are also of very high quality and offer a lot of variations in terms of age, image background, ethnicity, lighting, and different viewpoints, as shown below:

![The FFHQ dataset with different variations](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/the-ffhq-dataset-variation.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1812.04948.pdf)*

The images in this dataset were crawled from [Flickr](https://www.flickr.com/), thus inheriting all the website's bias, such as face images with eyeglasses, sunglasses, and hats. These images are also automatically aligned and cropped.

It is a publicly available dataset; thus, you can use it in your project. Do not worry about using the face images, as only images under permissive licenses were collected. For use cases, 60k images can be used in training, while 10k images can be used as the testing set. 

### Results
#### 1. Mixing regularization
The idea of mixing regularization is quite a new concept that this paper introduced. In mixing regularization, instead of passing just one latent vector, z, through the mapping network as input resulting in one vector, w, as output, they passed in two latent vectors, z1 and z2, through the mapping vector resulting in two vectors, w1 and w2 as outputs.

They completely randomized the use of w1 and w2 in a different iteration. 

This technique proved to prevent the network from assuming that styles adjacent to each other correlate.

These are the results they obtained after applying mixing regularization to their network.

![Mixing Regularization with different percentages of training examples](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/mixing-regularization.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1812.04948.pdf)*

#### 2. Effect of varying the noise vector
They experimented on how varying the noise image impacts the image. As the noise vector was changed, the researchers also noticed changes, i.e., in the hairstyle, while the overall appearance and the generated images' pose did not change.

This indicates that varying the noise vector has a huge impact on image generation compared to using GANs. The overall appearance remains almost the same, but there are small changes to individual features such as hair. In GANs, changing the noise vector changes the entire image completely.   

Below are the results obtained from varying the noise vector:

![Effect of varying the noise vector](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/effect-of-varying-noise-vector.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1812.04948.pdf)*

#### 3. Frechet inception distance (FID) score
![The FID score for various designs](/engineering-education/stylegan-a-style-based-generator-architecture-for-gans/fid-score.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1812.04948.pdf)*

These results clearly explain how this architecture evolved from the baseline architecture to when mixing regularization is used. The FID score is a score used to benchmark Generative Adversarial Networks. The lower the FID score, the better the model. This experiment compared the FID score of the CELEBA-HQ dataset and the Flickr-Faces-HQ dataset (FFHQ). 

They found that the more they added the novel designs to the baseline GAN architecture, the better the FID score. This experiment also demonstrated that the Flickr-Faces-HQ dataset achieved a better FID score than the CELEBA-HQ dataset. This experiment showed that the FFHQ dataset was better than CELEBA-HQ dataset.

### Wrapping Up
StyleGAN is one of the most interesting generative models that can produce high-quality images without any human supervision. The StyleGAN's generator automatically learns to separate different aspects of the images, such as the stochastic variations and high-level attributes, while still maintaining the image's overall identity. 

This has been a breakthrough as past models couldn't achieve this without completely changing the overall image's identity. This research has greatly helped improve the general understanding and controllability of the Generative Adversarial Networks' synthesis.

### References
1. [A Style-Based Generator Architecture for Generative Adversarial Networks](https://arxiv.org/pdf/1812.04948.pdf)
2. [Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization](https://arxiv.org/pdf/1703.06868.pdf)
3. [Analyzing and Improving the Image Quality of StyleGAN](https://arxiv.org/pdf/1912.04958.pdf)
4. [Improved Texture Networks: Maximizing Quality and Diversity inFeed-forward Stylization and Texture Synthesis](https://arxiv.org/pdf/1701.02096.pdf)
5. [This Person Does Not Exist](https://thispersondoesnotexist.com/)
6. [Flickr](https://www.flickr.com/)
7. [Flickr-Faces-HQ Dataset (FFHQ)](https://github.com/NVlabs/ffhq-dataset)
8. [CELEBA-HQ dataset](https://github.com/switchablenorms/CelebAMask-HQ)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

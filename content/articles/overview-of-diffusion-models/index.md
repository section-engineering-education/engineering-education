---
layout: engineering-education
status: publish
published: true
url: /overview-of-diffusion-models/
title: An Overview of Diffusion Models
description: This article will give the reader an overview of diffusion models. In diffusion models, we have a Markov chain where noise is added to the data.
author: esther-awuor
date: 2022-06-29T00:00:00-09:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/overview-of-diffusion-models/hero.png
    alt: An Overview of Diffusion Models Example Image
---
Generative Adversarial Networks (GANs) are currently state-of-the-art on most image generation tasks when measured by sample quality metrics such as FID, Inception Score, and Precision. However, they do have their drawbacks that make them difficult to scale and apply to new domains.
<!--more-->
Diffusion models have been around for a while. But, for the first time, this class of models has been pushed to the point where the images it produces are of high quality. They are a class of likelihood-based models that have recently been shown to produce high-quality images while offering desirable properties such as distribution coverage, a stationary training objective, and easy scalability. 

Recently, the Diffusion Models Beat GANs on Image Synthesis. This research is discussed in this [paper](ttps://arxiv.org/abs/2105.05233), which will be the basis of our article discussion.

### Prerequisites
To follow along with this article, the reader will need to be familiar with:
- Machine Learning modeling.
- Generative models.

### Introduction
Let's say we want to generate an image. We can identify four main types of generative models.

#### Generative Adversarial Network (GANs)
GANs generate images from noise, much like a diffusion model. The model consists of a generator neural network that starts from the noise of some informative conditioning variable, i.e., a class label or a text encoding. It then generates something that should look like a realistic image. 

The success of the generator is rated by the discriminator neural network that labels the image as being either a real image (from the training set) or a fake image (synthesized by the generator).

To learn more about GANs, please refer to this [article](/engineering-education/introduction-to-generative-adversarial-networks/).

#### Variational Autoencoders (VAEs)
VAEs take an input `x`, and encode it by reducing it to a latent space of lower dimensionality. The decoder portion of the model tries to reconstruct the input to minimize the distance between the input and its reproduction. VAEs structure these latent spaces, `z` however they see fit. As long as they can reconstruct the data seen during training. 

Not necessarily are these data points meaningful. Meaningful could mean that similar data points are closer to each other, and dissimilar points are further away from each other. VAEs have an extra regularization term on the latent space to make sure that the latent representations are not ordered anyhow, but according to a predefined distribution, usually Gaussian. 

For this reason, the space around the learned data points behaves better, and one can better sample from points in between training points. With this regularization, VAEs implicitly learn the data distribution.

#### Flow-based models
These are models that explicitly learn the data distribution. These models do not learn just any encoders and decoders, but specific ones. They apply a transformation, f, parameterized by a neural network onto the data. Much like the encoding step in Autoencoders. But then, the decoder is not a fresh neural network that has to learn the decoding process by itself. But simply the exact inverse of the function, f.

To achieve the invertibility of `f`, neural networks require a few tricks for it to work. You can learn more about them [here](https://lilianweng.github.io/posts/2018-10-13-flow-models/). 

Finally, on the fourth type of generative models, we can discuss the diffusion model.

#### Diffusion models
Let's begin by understanding why this model is called a diffusion model. `Diffusion` is a term used in a physics class about thermodynamics. If you have a system with a high concentration of a substance, such as perfume, in a certain place, then it is not in equilibrium. 

To transition into equilibrium, the diffusion process needs to happens. The perfume molecules move from a place of higher concentration to everywhere in the system such that the system becomes the same everywhere. Diffusion makes everything homogenous in the end.

This non-equilibrium thermodynamic state is the inspiration behind diffusion models. In diffusion models, we have a Markov chain (a sequence of variables whereby the state of one variable depends on the previous event) where noise is added to the data. We take an image, and during the forward diffusion process, we add a certain amount of noise to the image sequentially.

We store the now noisier image and go on to generate the new image in the sequence by adding more noise to it. This process is repeated several times. If we perform this process a couple of times, we get an image that is pure noise.

So, how can we generate an image from this noisy image?

We take a neural network and learn to reverse this diffusion process. The backward diffusion process involves the same networks, the same weights being applied at each step to generate the image from `t` to `t-1`. 

To simplify the problem even further, one could try to predict not the image, but the noise at each step, which needs to be subtracted from the image, instead of letting the network predict the image.

In any case, the choice of the neural network architecture must be such that it preserves the data dimensionality.

#### Why are GANs not used instead?
We use GANs to generate high fidelity and photorealistic image generations. As demonstrated in this [paper](ttps://arxiv.org/abs/2105.05233), diffusion models produce even better realistic images than GANs. Diffusion models are more faithful to the data in a sense. While a GAN gets random noise, or a class conditioning variable as input, and then produces a realistic sample, diffusion models tend to be much slower, iterative, and a much more guided process.  

When reverting from noise to the real image by going through iterations and iterations of denoising, there is little room for going very far astray. The generation step goes through each checkpoint, and at each step, more and more details can be added to the image. 

### Wrapping up
We learned that diffusion models gradually add Gaussian noise and reverses this process. They have been used to explore the problem of text-conditional image synthesis to produce photorealistic samples from images and captions. You can read about it in this [paper](https://arxiv.org/abs/2112.10741).

Happy learning!

### Further reading
- [Diffusion Models Beat GANs on Image Synthesis](https://arxiv.org/abs/2105.05233).
- [GLIDE: Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models](https://arxiv.org/abs/2112.10741).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)

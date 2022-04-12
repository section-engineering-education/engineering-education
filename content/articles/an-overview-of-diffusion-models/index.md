Generative Adversarial Networks (GANs) currently hold the state-of-the-art on most image generation tasks when measured by sample quality metrics such as FID, Inception Score, and Precision. However, they do have their drawbacks that make them difficult to scale and apply to new domains.
Diffusion models have been around for a while. But, for the first time, this class of models have been pushed to the point where the images they produce images of high-quality. They are a class of likelihood-based models which have recently been shown to produce high-quality images while offering desirable properties such as distribution coverage, a stationary training objective, and easy scalability. Recently, the Diffusion Models Beat GANs on Image Synthesis. This research is discussed in this [paper](ttps://arxiv.org/abs/2105.05233) which will be the basis of our article discussion.

### Prerequisites
To follow along with this article, you need to be familiar with:
- Machine Learning modeling.
- Generative models.

### Introduction
Let's say we want to generate an image. We can identify four main types of generative models.

#### Generative Adversarial Network (GANs)
GANs generate images from noise, much like a diffusion model. The model consist of a generator neural network that starts from noise of from some informative conditioning variable i.e., a class label or a text encoding. It then generates something that should look like a realistic image. 

The success of the generator is rated by the discriminator neural network which labels the image as being either real image (from training set) or fake image (synthesized by the generator).

To learn more about GANs, please refer to this [article](/engineering-education/introduction-to-generative-adversarial-networks/).

#### Variational Autoencoders (VAEs)
VAEs take an input `x`, encode it by reducing it to a latent space of lower dimentionality. The decoder portion of the model tries to reconstruct the input with the goal of minimizing the distance between the input and its reproduction. VAEs structure these latent spaces, `z` however they see fit. As long as they are able to reconstruct the data seen during training. 

Not necessarily are these data meaningful.Meaningful could mean that similar data points are closer to each other, and disimmilar points are further away from each other. VAEs have an extra regularization term on the latent space to make sure that the latent representations are not ordered anyhow, but according to a predefined distribution, usually Gaussian. 

For this reason, the space around the learned data points behave better and one can better sample from points in between training points. With this regularization, VAEs implicitly learn the data distribution.

#### Flow-based models
This are models that explicitly learn the data distribution. These models do not learn just any encoders and decoders, but specific ones. They apply a transformation, f, parameterized by a neural network onto the data. Much like the encoding step in Autoencoders. But then, the decoder is not a fresh neural network that has to learn the decoding process by itself. But simply the exact inverse of the function, f.

To achieve this invertibility of `f`, with neural networks require a few tricks for it to work. You can learn more about them [here](https://lilianweng.github.io/posts/2018-10-13-flow-models/). 

Finally, on the generative fourth type of generative model, we can discuss the diffusion models.

#### Diffusion models
Let's begin by understanding why this model is called like this.

Diffusion models gradually add Gaussian noise and then reverses this process. 

### Further reading
- [Diffusion Models Beat GANs on Image Synthesis](https://arxiv.org/abs/2105.05233)

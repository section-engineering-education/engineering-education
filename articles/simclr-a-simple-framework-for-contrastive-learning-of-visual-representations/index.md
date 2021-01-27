### Prerequisites

Before reading this article, the reader must understand Machine Learning (ML) and Deep Learning (DL). If you are still new to ML and DL, please read my previously published article on the [differences between Artificial Intelligence, Machine Learning, and Deep Learning](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) to learn more.

### What is Contrastive Learning?

Contrastive learning is a very active area in machine learning research. It is a self-supervised method used in machine learning to put together the task of finding similar and dissimilar things. By applying this method, one can train a machine learning model to contrast similar and dissimilar images. For example, given an image of a horse, one can find the matching animal in a gallery of other photos.

SimCLR is a framework developed by Google which demonstrated the implications of contrastive learning. It is a high-impact work that eliminates specialized architectures and memory banks, usually used in contrastive learning. It shows that strong augmentations of unlabeled training data, a standard ResNet-50 architecture, and a small neural network is all you need to achieve state-of-the-art results. For such a simple approach, the results are truly mindblowing.

Throughout this article, this [paper](https://arxiv.org/pdf/2002.05709.pdf) published by Google will be our referencing material for the article. Unlike other papers, this paper entails many tips like the network having a large batch size, more training epochs, and increasing the network's width to make the most out of contrastive learning.

Let's learn about the SimCLR framework's details and the results presented in the [paper](https://arxiv.org/pdf/2002.05709.pdf) published by Google.

### An Overview of the SimCLR Framework

![An illustration of the proposed SimCLR framework](/https://1.bp.blogspot.com/--vH4PKpE9Yo/Xo4a2BYervI/AAAAAAAAFpM/vaFDwPXOyAokAC8Xh852DzOgEs22NhbXwCLcBGAsYHQ/s1600/image4.gif)

*[Image Source: Google AI Blog](https://ai.googleblog.com/2020/04/advancing-self-supervised-and-semi.html)*

The major components of the SimCLR framework include:

1. Data Augmentation
2. A Base Encoder $f(x)$
3. A Projection Head $g(h)$
4. The Contrastive Loss Function

#### Data Augmentation

![The figure shows illustrations of the studied data augmentation operators](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/different-augmentation-techniques.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

The SimCLR framework starts by fetching examples of images from an original dataset. It transforms the given image example into two corresponding views of the same example image.

While previous methods to contrastive learning introduced architecture changes, SimCLR argues that a target image's random cropping sets up enough context for contrastive learning. The use of cropping enables the network to learn the global to local contrast and contrast the same image's adjacent views.

For example, consider this image of the dog below with its global and local contrast.

![The image of the dog with the global and local contrast](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/global-to-local.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

Having learned about the contrast between the global and local views, the network is now able to contrast between the adjacent views of the same image shown below.

![The image of the dog with adjacent views](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/adjacent-views.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

The paper also mentions a systematic study performed, which combined the different compositions of data augmentations—for example, combining cropping with other data augmentation techniques such as blur, color distortion, and noise. This is shown below. 

![Different compositions of data augmentations](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/different-compositions-of-data-augmentations.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

The results showed that combining cropping with color distortion and the gaussian blur stood out in terms of the result obtained's accuracy. Thus, they chose to use random crop (with flip and resize), color distortion, and gaussian blur in their augmentation policy and dropped the other augmentation techniques.

#### A Base Encoder $f(x)$

The base encoder $f(x)$ uses a Convolutional Neural Network (CNN) variant based on the ResNet architecture. It extracts image representation vectors from the augmented data images produced by the data augmentation module. This extraction produces the embeddings, $h$.

#### A Projection Head $g(h)$

The projection head $g(h)$ consists of two fully-connected layers, i.e., a multi-layer perceptron (MLP), which takes in the embeddings, $h$, as its inputs from the base encoder and produces an embedding $z$. 
This module's role is to map the image representations to a latent space where contrastive loss is applied.

#### The Contrastive Loss Function (Normalized temperature-scaled cross entropy (NT-Xent loss))

The contrastive loss function is a modified version of the cross-entropy loss function, which is the most widely used loss function for supervised learning of deep classification models. The function is shown below.

![The contrastive loss function](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/contrastive-loss-function.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

The contrastive loss function states that the similarity of $z_i$, and $z_j$ corresponding to, for example, an image of a cat and its augmentation should be closer together. In other words, they should attract. 

In contrast, the similarity of any $k$, which is not $i$, to be pushed further apart (repel). An example of this would be the representation of a dog, and a cat should repel.

That's a simplistic view of what the contrastive loss function does in a nutshell.

#### Results of SimCLR

1. One of the key findings of this paper is that self-supervised learning algorithms benefit more from scaling up than supervised learning algorithms.

![The accuracy results pretrained on the ImageNet dataset](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/self-supervised-vs-supervised.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

2. The experiment batch sizes range from 256 to 8,192. The experiment found that the accuracy kept increasing as the batch sizes and the number of epochs increased, as shown below. 

![Linear evaluation models (ResNet-50) trained with different batch size and epochs](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/training-with-different-batch-sizes-and-epochs.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

3. An experiment on the ResNet-50 architecture with three different widths showed a significant gain in accuracy with an increase in the model width. These results are shown below.

![Models with varied depths and widths](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/models-with-varied-depths-and-widths.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

4. The main results from the paper demonstrates that SimCLR wins against other state-of-the-art methods both with or without ResNet-50. From the results below, SimCLR can achieve a 76.5% top-1 accuracy. This is a 7% improvement over previous state-of-the-art models, which matches the performance of a ResNet-50, which has a much-advanced architecture. 

![ImageNet accuracies of linear classifiers trained on representations learned with different self-supervised methods](/engineering-education/simclr-a-simple-framework-for-contrastive-learning-of-visual-representations/simclr-accuracy-results.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/2002.05709.pdf)*

### Summary of the SimCLR Framework

1. Use random crop (with flip and resize), color distortion, and gaussian blur as they are the best data augmentation techniques in contrastive learning.
2. Use a large batch size when possible, especially if you have enough GPU compute power.
3. Train your model for longer epochs to achieve better results. In this paper, they trained them for 1,000 epochs.
4. The projection head g(x) is important to get good representations.
5. The framework learns representations by maximizing agreement between differently augmented views of the same data example via a contrastive loss in the latent space.
6. Increasing the model depth and width brings far much greater benefits to contrastive learning.
7. The non-linear projection head g(h) is used to increase the representative power of h.
8. The updating of the parameters in contrastive learning causes the representations with correlating views to attract each other, while representations with non-correlating views repel each other.

### References

1. [Advancing Self-Supervised and Semi-Supervised Learning with SimCLR](https://ai.googleblog.com/2020/04/advancing-self-supervised-and-semi.html)
2. [A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/pdf/2002.05709.pdf)
3. [Contrastive Representation Learning: A Framework and Review](https://arxiv.org/ftp/arxiv/papers/2010/2010.05113.pdf)
4. [Supervised Contrastive Learning](https://arxiv.org/abs/2004.11362)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)


<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>

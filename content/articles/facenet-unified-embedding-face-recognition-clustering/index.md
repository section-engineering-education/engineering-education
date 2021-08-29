---
layout: engineering-education
status: publish
published: true
url: /facenet-unified-embedding-face-recognition-clustering/
title: Unified Embedding for Face Recognition and Clustering using FaceNet
description: In this article, we will explore how the FaceNet face recognition system model improves upon traditional face recognition systems. 
author: wilkister-mumbi
date: 2021-08-17T00:00:00-16:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/facenet-unified-embedding-face-recognition-clustering/hero.png
    alt: Facenet Image
---
[FaceNet](https://arxiv.org/abs/1503.03832) is a face recognition project developed by three researchers at Google, Florian Schroff, Dmitry Kalenichenko, and James Philbin in 2015. The main goal of this research is to produce an embedding from the face of a person. 
<!--more-->
An embedding is a dense vector representation of any object. A good embedding is one where two faces that are the same, have the cosine distance and Euclidean distance between them being very low. In contrast, two embeddings with dissimilar faces should have a Euclidean distance and cosine similarity being far apart. 

Traditionally, you might have thought that using a classification architecture would be better. But in the classification architecture, you have a fixed number of classes. What happens when there is a new person that you want to classify? You will need to rebuild the model. Right? 

With embedding architectures such as FaceNet, you project people into an embedding space. You can then set a threshold to compute the distance between two people. You can then model it as a classification problem indirectly, or you can model it as a clustering problem. 

This article explores how a FaceNet face recognition system works, in contrast to traditional face recognition systems.

### Outline
- [Problem with traditional face recognition systems](#problem-with-traditional-face-recognition-systems)
- [Understanding the FaceNet face recognition system model](#understanding-the-facenet-face-recognition-system-model)
- [Wrapping up](#wrapping-up)

### Prerequisites
Before you read this article, you ought to be familiar with popular deep learning architectures used for face recognition such as Convolutional Neural Network (CNN).

### Problem with traditional face recognition systems
Before we dive deep into the FaceNet model, let's first use an example to demonstrate the problem the model is trying to solve. Let's take an example of a face recognition system in a small start-up that uses the faces of people to unlock the door to the business's premises. The business has 10 employees. 

So, the system would be trained to classify only the 10 employees' faces. So, when one of the ten employees shows their face on the system it would allow them entry. If a new employee is added, the model will have to be re-trained on the new employee to allow the new employee to gain access to the premises. This may be okay for a small business.

But what if our company isn't a start-up but rather a large organization with thousands of employees? Our classification would involve thousands of people. This approach is not scalable in such a scenario. The more classes you have, the more images you would require. A better system would be required to handle such a scale.

This is where the FaceNet model comes in. Instead of doing classification, the model trains a similarity function instead. How similar or dissimilar are the two faces? 

Let's now explore this model in depth. 

### Understanding the FaceNet face recognition system model
![FaceNet model architecture](/engineering-education/facenet-unified-embedding-face-recognition-clustering/facenet-model-architecture.png)

*[Image Source: arXiv](https://arxiv.org/pdf/1503.03832.pdf)*

The FaceNet model takes as input the image of a person's face, produces a vector embedding of 128 numbers, which are then projected in a high-dimensional Euclidean space. Here, the distance between points corresponds to a measure of face similarity. 

The idea here is once you've mapped your input set of images to their corresponding embedding spaces, that embedding space can be used for face verification and clustering. Similar faces tend to have distances closer to 0 while dissimilar faces have a larger distance. In this paper, that distance is closer to 4. 

This array of numbers/points in the Euclidean space are then stored and used for the classification and clustering of faces. This is quite impactful because once you have that small embedding or array, of a couple of faces, you can store it in the database and use it to classify other newer faces. This can be referred to as "one-shot training".

"One-shot training" means that we do not need to train the network with many photos. For example, you only need one photo of yourself to train the network. Or you could use only two or three to improve on the model's accuracy (not a must). Thus, if I'm captured again, even when in a different pose, FaceNet can still identify that it is me.

This model uses a deep convolution neural network that is trained to give an output of 128 nodes. Or we can say the model gives an output of 128 numbers. You may wonder, what's the use of these 128 numbers?

These 128 numbers contain the characters/features of the face. Therefore, if we give a different face as input, then we will have a different set of numbers. If we input an image of the face of the same person but in different poses, then these numbers will be similar. 

In training, this model employs this technique known as *Triplet*. Essentially, what happens here during training is that in every row of training examples, they have two sets of images that are matching (both positive & matching) and a second example which is a pair of both the positive and negative images (non-matching). The idea is to let images that are similar be closer together while those not similar be far apart.

![Triplet loss](/engineering-education/facenet-unified-embedding-face-recognition-clustering/triplet-loss.png)

*[Image Source: arXiv](https://arxiv.org/pdf/1503.03832.pdf)*

### Wrapping up
This article has taken you through the problem with the traditional face recognition system and introduced the FaceNet model which solves that problem. This model can be used in schools to automatically register attendance by recognizing the faces of students. 

I hope you now have a deeper understanding of how this model works. In a follow-up tutorial, I will take you on a journey of implementing the FaceNet model using Keras on a well-known public dataset. 

[DeepFace](https://research.fb.com/publications/deepface-closing-the-gap-to-human-level-performance-in-face-verification/) is also a face recognition system by Facebook that also uses a similar architecture. You can take a look at it and compare it with the FaceNet model. 

Happy learning!

### Further reading
- [FaceNet: A Unified Embedding for Face Recognition and Clustering](https://arxiv.org/abs/1503.03832)
- [DeepFace: Closing the Gap to Human-Level Performance in Face Verification](https://research.fb.com/publications/deepface-closing-the-gap-to-human-level-performance-in-face-verification/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)

---
layout: engineering-education
status: publish
published: true
url: /using-machine-learning-to-translate-brain-signals-to-text/
title: Using Machine Learning to Translate Brain Signals to Text
description: In this article, we will explore how machine learning is used to decode and translate brain neural signals into handwritten text.
author: willies-ogola
date: 2021-06-03T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /using-machine-learning-to-translate-brain-signals-to-text/hero.jpg
    alt: brain signals example image
---
Developing brain-computer interfaces (BCI) that can decode and translate brain signals will depend on us being able to decode more of these signals in a way that is useful for people such as those with paralysis.
<!--more-->

Can we use the brain's neural activities from people imagining handwriting to decode letters, words, and even sentences?

In this [paper](https://www.nature.com/articles/s41586-021-03506-2) published in the Nature journal by researchers from Stanford, they were interested in investigating whether complex gestures and motor functions such as handwriting can be decoded from our neural activities. Complex human movements such as handwriting have over the years been a hard task to solve. This is because pulling information from these complex neural brain data isn't easy. But, they were able to solve this problem using machine learning. It decoded these complex neural signals and converted them into texts and words.

### Table of contents

1. [Brief overview](#brief-overview)
2. [Neural representation of handwriting](#neural-representation-of-handwriting)
3. [Decoding handwritten sentences](#decoding-handwritten-sentences)
4. [Results](#results)
5. [Wrapping Up](#wrapping-up)
6. [References](#references)

Before we dive in, it is crucial to understand these three terminologies:

1. [Principal Component Analysis (PCA)](https://en.wikipedia.org/wiki/Principal_component_analysis) 

2. [t-distributed stochastic neighbor embedding (t-SNE)](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding) 

3. [Brain-computer interface (BCI)](https://en.wikipedia.org/wiki/Brain%E2%80%93computer_interface) 

Now that we understand these terminologies, let's get started!

### Brief overview

Recently, there has been a lot of interest in researching how our brains represent the things that we encounter in our lives. Developing brain-computer interfaces (BCI) that can decode and translate brain signals will depend on us being able to decode more of these signals in a way that is useful for people such as those with paralysis. If you'd like to see more of these researches, feel free to check out [Braingate](https://www.braingate.org/). It is a research company that focuses on developing BCI technologies to restore mobility and communication.

In this article, we will explore how machine learning is used to decode and translate brain neural signals into handwritten texts. Indeed, it is a first of its kind. Previous BCI research has focused on restoring motor skills such as reading and grasping. Not much focus has been put in researching the use of BCI to solve complex behavioral tasks. This article aims to tackle that. 

The researchers in this study worked with a paralysis patient with a spinal code injury. He was paralyzed from the neck downwards with his hand movements completely non-functional. The goal was to make the patient attempt to imagine writing with a pen on a piece of paper as if his hands weren't paralyzed. 

![Patient with electrode implants imagining handwriting](/engineering-education/using-machine-learning-to-translate-brain-signals-to-text/electrode-implants.PNG)

*[Image Source: HHMI](https://www.hhmi.org/news/brain-computer-interface-turns-mental-handwriting-into-text-on-screen)*

The figure shows two tiny arrays of implanted electrodes relaying information from the brain area of the patient. It controls the hands and arms to an algorithm. The algorithm then translates these signals into letters that appear on a screen. 

Let's try and understand how they do this.

### Neural representation of handwriting

To visualize the neural activities recorded during the attempted writing from the patient's brain, two machine learning techniques were used:

1. Principal Component Analysis (PCA) is one of the methods for dimensionality reduction. It takes your data and extracts the components that have the highest amount of variance. The goal of PCA in this experiment was to extract the top three neural signals (components) associated with handwriting. It also eliminated things such as background noise or things that might not be relevant to our task.

![PCA](/engineering-education/using-machine-learning-to-translate-brain-signals-to-text/pca.PNG)

*[Image Source: Nature](https://www.nature.com/articles/s41586-021-03506-2)*

The above example shows the neural activity in the top 3 principal components for three example letters (d, e, and m).

2. They used a non-linear dimensionality reduction technique called t-distributed stochastic neighbor embedding (t-SNE). The method showed that data can be clustered into different groups representing different letters of the alphabet (a-z). This showed that the data could indeed be separable. Thus, this method helped to distinguish neural activities in the brain associated with different letters i.e., the letter 'a' and the letter 'l'.

![t-SNE](/engineering-education/using-machine-learning-to-translate-brain-signals-to-text/t-sne.PNG)

*[Image Source: Nature](https://www.nature.com/articles/s41586-021-03506-2)*

The figure represents the 2D visualization of the neural activity made using t-SNE. 

### Decoding handwritten sentences

So, now that they were successful in representing neural activities in their respective letters, the researchers faced a new challenge. Could they replicate the same success in decoding entire handwritten sentences instead of only letters in real-time?

Let's see how they went about with this.

They achieved this by using the Recurrent Neural Network (RNN). You can read more about RNN's [here](https://en.wikipedia.org/wiki/Recurrent_neural_network).

The RNN is trained to convert the brain's neural activity data into probabilities. These probabilities describe the likelihood of each character being written within a certain window of time. It assigns the probability of that data being associated with any particular character or sign based on the embedding that we explained earlier. 

They used a set of 31 characters. These characters consisted of 26 lower-case letters from the alphabet, a question mark (?), comma (,), apostrophe('), full stop (-), and space (>)

They performed this in two different ways. Using an online and offline system.

![The online and offline system](/engineering-education/using-machine-learning-to-translate-brain-signals-to-text/online-offline-system.PNG)

*[Image Source: Nature](https://www.nature.com/articles/s41586-021-03506-2)*

In the online system, they used a threshold system. If the probability of a certain set of data with letters was high enough, then it would be assigned that letter. The assigned letters would then be used in the sentence.
In the offline system, they used a large-vocabulary language model to simulate an auto-correct feature. It fixed errors by predicting the probability that a letter came next in a sequence of letters. 

### Results

This research shows results for 5 days from one study participant who already had a system implanted in his brain.

To avoid bombarding you with a lot of jargon, I've summarized the results of the finding for you:

1. As the patient continued to do the task of imagining letters and allowing the computer to process these signals repeatedly, the patient was able to type 90 characters per minute for each trial day. This doubled the record compared to previous BCI records for typing. 

2. Since our brain's baseline neural signals change day after day, the handwriting decoder had to be retrained with new data every single day. This retraining had to be accounted for especially when working with models like this. You wouldn't want your training signals to look this way one day and a different way another day. This would make your model not work correctly.

3. The character and word error rates reduced by 0.89% and 3.4% respectively when the offline language model system was used. The result from the word error rate is comparable to state-of-the-art speech recognition systems which range between 4-5%. This is well within the accepted range of being usable.

4. As the participant imagined writing the letters and symbols, the sensors implanted in his brain picked up on patterns of electrical activity which the algorithm interpreted to trace the path of his imaginary. 

![Interpretation](/engineering-education/using-machine-learning-to-translate-brain-signals-to-text/interpretation.PNG)

*[Image Source: HHMI](https://www.hhmi.org/news/brain-computer-interface-turns-mental-handwriting-into-text-on-screen)*

Impressive, right?

5. Finally, this research proved that as much as someone is paralyzed, the brain signals for movement still remain. Tapping into this can help build BCI systems that can help solve a lot of tasks.

Please find on Github the full code for the paper [here](https://github.com/fwillett/handwritingBCI).

### Wrapping Up

As we wrap up, I'd like to point out that this isn't something that will be available to the general public. This is because such a procedure would need implanting electrodes into people's brains. This is something I'm sure many people would mind. It is still in its early experimental phase. Only one patient was used to get these results. More tests still need to be done on more patients to see how well this novel system generalizes. But, the findings obtained from this experiment hold huge promises and would solve a lot of real-world problems. Their biggest hope is that their invention would one day help people with complications such as paralysis. This would enable patients with the disease to able to communicate, both faster and better. 

Interesting research. What a time to be alive!

If you're interested to learn more about similar projects, [Braingate](https://www.braingate.org/) is a good place to start.

### References

1. [High-performance brain-to-text communication via handwriting](https://www.nature.com/articles/s41586-021-03506-2)

2. [Brain Computer Interface Turns Mental Handwriting into Text on Screen](https://www.hhmi.org/news/brain-computer-interface-turns-mental-handwriting-into-text-on-screen)

3. [Hero image](https://unsplash.com/photos/byp5TTxUbL0)

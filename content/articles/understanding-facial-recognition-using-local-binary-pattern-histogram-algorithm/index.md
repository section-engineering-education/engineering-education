---
layout: engineering-education
status: publish
published: true
url: /understanding-facial-recognition-using-local-binary-pattern-histogram-algorithm/
title: Understanding Facial Recognition Using Local Binary Pattern Histogram (LBPH) Algorithm
description: This article will explain what LBPH algorithm is, its applications and how is it applied in facial recognition. It will further detail the process of facial recognition using LBPH and gauge its efficiency in performing facial recognition. Finally, this article will cite some of the best application areas of LBPH.
author: ruth-mare
date: 2021-07-16T00:00:00-17:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-facial-recognition-using-local-binary-pattern-histogram-algorithm/hero.jpg
    alt: lbph facial recognition cover image 
---
The Local Binary Pattern Histogram (LBPH) algorithm is a face recognition algorithm based on a local binary operator, designed to recognize both the side and front face of a human. However, the recognition rate of the LBPH algorithm is limited, if the conditions, such as in the expression diversification, disorientation, and a change in the lighting performance manifest.

The reader should familiarize himself/herself with mathematical matrices and the concept of sliding window to help understand this article better.
<!--more-->
In this article, we are going to look at how the LBPH algorithm recognises faces.

### Overview
This article will cover:

- [An Introduction to Facial Recognition](#an-introduction-to-facial-recognition)
- [Working of the LBPH algorithm](#working-of-the-lbph-algorithm)
- [Two modes of operation of face recognition](#two-modes-of-operation-of-face-recognition)
- [The stages of face recognition using LBPH](#the-stages-of-face-recognition-using-lbph)
- [LBPH Application Areas](#lbph-application-areas)

### An Introduction to Facial Recognition
Facial recognition is the ability to identify faces in an image, and then link them to a particular person. The LBPH is a recognition algorithm, which can recognize human faces.

**NOTE:** Facial recognition is different from facial detection. Facial detection is the ability to identify human faces in an image. Facial recognition therefore, furthers on the ability of facial detection.

Face recognition can be achieved with the help of a learning concept of training and then testing the model with a given set of images.

Training rules are used to ensure the output decisions criteria and training algorithm can be used to get some input from the data to match the appropriate output type. So, the algorithm and rules are used to simplify the process of learning. The system uses the information gathered from the data to get results.

The precision and accuracy of the algorithm are verified by using a test set of images.

### Working of the LBPH algorithm
The LBPH algorithm typically makes use of 4 parameters:

- ***Radius:*** The distance of the circular local binary pattern from the center pixel to its circumference and usually takes a value of 1.
- ***Neighbors:*** The number of data points within a circular local binary pattern. Usually, the value of 8.
- ***Grid X:*** The number of cells in the horizontal plane, is usually a value of 8.
- ***Grid Y:*** The number of cells in the vertical plane, is usually a value of 8.

Given the above-mentioned parameters, LBPH works as follows;

A data set is created by taking images with a camera or taking images that are saved, and then provisioning a unique identifier or name of the person in the image and then adding the images to a database. It is recommended to take many samples from a single individual. A portion of the data set is used for the training of the algorithm, while the rest is used for testing.

Using a circular neighborhood concept (which takes non-integer pixel points around a selected area), the number of appearances of LBP codes in the image is put together to form a histogram. The classification is then carried out through the calculation of the basic similarities of the histograms under comparison.

This histogram contains a description of an individual at three different levels: at a pixel-level, labels are combined in a small area to create a regional level, the regional histograms in combination build a general description of the person.

### Two modes of operation of face recognition 
The face recognition algorithm generally operates in one of two modes:

1. *Authentication of a facial image:* This mode does facial recognition by a 1x1 comparison. The comparison is done between an input image and a specific image within the database. In many cases, this is the face that requires authentication at the time of this mode of facial recognition.

2. *Face recognition:* in this mode, it is a 1xN, a comparison of the input face image with all the pictures that have been saved in the database to output the images of the user which conforms to the input face image.

### The stages of face recognition using LBPH
For face recognition, the LBPH algorithm follows some steps. These steps can be carried out in two stages, as follows:

#### The learning of the algorithm
The first step is the learning of the algorithm. It makes use of a data-set of images of the people to be included in the recognition process. Each image is given a unique ID as either a number or the name of a person so that the algorithm can use this information to identify the image and export the output. The pictures of the same person are always placed under the same ID.

#### Computational steps
1.	**The application of the LBP operation:** is the first step of the computational steps. Here, an intermediate image has been created to better represent the original image through a [sliding window](https://www.techopedia.com/definition/869/sliding-window) concept, taking into account two parameters: the `neighbor` and the `radius`. New values are created in the form of binary by comparing the 8 `neighbor` values to the threshold value. 

     For each `neighbor` value greater than the threshold value, the value is set to 1 and 0 for every `neighbor` value less than the threshold value. This forms a matrix of binary numbers excluding the threshold. A central value of the matrix is created by the conversion of the binary number to a decimal value which corresponds to the pixels of the original image. For a better representation of the characteristics of the original image.

The following image illustrates the above conversions:

![Performing LBP operation on an image](/engineering-education/understanding-facial-recognition-using-local-binary-pattern-histogram-algorithm/lph_operation.png)

[Image source](https://i.stack.imgur.com/ZU3aC.png)

2. **To Extract Histograms:** The image obtained in step is divided into multiple grids, with the help of the Grid parameters `X` and `Y`. This image is in grayscale, each of the histograms of each of the grids is to represent the intensity of the occurrences of each pixel. Each histogram is then combined to create a new histogram that represents the attributes of the original image.

The following image illustrates the above exactraction:

![Histrograms' Extraction illustration](/engineering-education/understanding-facial-recognition-using-local-binary-pattern-histogram-algorithm/extracting_histograms.jpg)

[Image source](https://www.semanticscholar.org/paper/Face-Recognition-based-Attendance-System-using-Haar-Chinimilli-A./cd4429cac9a4d9c99796f990974dd9a9ff88f1f8/figure/4)

3. **Accurate face recognition:** Each one made a histogram for an image in the training data set. Two histograms are compared to output the image with the closest histogram matches to an input image. This output is the ID or name of the image. This algorithm also returns a **`confidence`**' measurement which is the calculated distance. The correctness of the algorithm in recognizing the image is estimated automatically by the `confidence` and the threshold. The correctness is indicated by a confidence value that is lower than the defined threshold.

     **NOTE:** A higher `confidence` value means that the histograms are far apart hereby affecting the correctness of the recognition. A smaller `confidence` value however, indicates that the histograms are closely packed together, hence likely accurate.

For each new image, this process is repeated to the face for recognition.

### LBPH Application Areas
Face recognition by the LBPH algorithm can be used in the following areas:

- *Texture analysis:* applicable in research and in applications such as medical imaging. This has made image processing easy due to texture segmentation of images which, has led to a significant progress in analysis.

- *Biometrics:* used in biometrics, such as palm-print recognition, fingerprint recognition, iris recognition, gait recognition, the order of placement of recognition, and in the face of an age rating.

- *Computer vision:* used in computer vision such as motion analysis. LPH enables computer systems to be able to understand information on images and make meaning of this information.

### To wrap up
Various alterations and changes of LBP have been proposed, such as the dominant local-binary patterns, which make use of the most common types of LBP to improve the recognition accuracy, correctness, that is, to determine the suitability of the LBPH, and to fill in some of the shortcomings of the LBP.

Happy learning!

### Relevant resources
1. [A real-time face recognition system based on the improved LBPH algorithm](https://ieeexplore.ieee.org/abstract/document/8124508)
2. [Face Recognition: Understanding LBPH Algorithm](https://towardsdatascience.com/face-recognition-how-lbph-works-90ec258c3d6b)
3. [Local Binary Patterns](http://www.scholarpedia.org/article/Local_Binary_Patterns)
4. [Face Detection using Viola-Jones Algorithm in Matlab](https://www.section.io/engineering-education/face-detection-matlab/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)

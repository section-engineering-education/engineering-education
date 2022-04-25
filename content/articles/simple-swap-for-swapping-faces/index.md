---
layout: engineering-education
status: publish
published: true
url: /simple-swap-for-swapping-faces/
title: Simple Swap: A Machine Learning Framework for Swapping Faces
description: This tutorial will give an overview of the SimSwap framework, how it can be applied in various use cases, and implement an example to demonstrate how it can be used.
author: wilkister-mumbi
date: 2022-04-08T00:00:00-21:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/simple-swap-for-swapping-faces/hero.png
    alt: Simple Swap Example Image
---
SimSwap is an acronymn for Simple Swap. It is an ML framework that aims for generalized and high fidelity face swapping. 
<!--more-->
This tutorial will give an overview of the framework, how it can be applied in various use cases, and implement an example to demonstrate how it can be used.

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- Machine learning modeling.
- [Google Colab](https://colab.research.google.com/) or [Jupyter Notebook](https://jupyter.org/).
> Google Colab is prefered for this build.

### Table of contents
- [High-level overview](#high-level-overview)
- [Cloning the GitHub repo](#cloning-the-github-repo)
- [Installing the required dependencies](#installing-the-required-dependencies)
- [Downloading additional models](#downloading-additional-models)
- [Learning how to face swap images](#learning-how-to-face-swap-images)
- [Wrapping up](#wrapping-up)
- [Further-reading](#further-reading)

### High-level overview
Face swapping can be achieved using a model called SimSwap. SimSwap uses a GAN architecture. You can think of it as having two competing neural networks; a Generator and a Discriminator. The generator tries to apply the identity of a person onto a target image. It does this by extracting the key features in a person's face i.e., eyes, nose, mouth and applying those to the target image. This is attributed to the `ID Injection Module (IIM)` which makes it perform so well.

The discriminators role is that of a critic. It tries to pick the images that look real. It uses a technique known as `Weak Feature Matching Loss` to compare the fake with the real target image. The technique helps us preserve the facial features attributes gotten earlier. By optimizing for that loss, it learns to create good face swaps. 

In the beginning, the model starts with a source and target image. The source is the one that we want to extract features from. The source and target images are passed through the encoder and decoder architecture of the SimSwap model. The resulting output will be the target image applied with features from the source image.

To fine-tune the model, they pass in the target and final resulting image into a discriminator. This process is similar to how other GANs work. The discrimitor then tells whether these are predictions close to real images.

That's a high-level overview of how the SimSwap model works. You can read more about the SimSwap model [here](https://arxiv.org/pdf/2106.06340v1.pdf).

### Cloning the GitHub repo 
The first thing that we are going to need to do is to clone the GitHub repository for the model.

```bash
!git clone https://github.com/neuralchen/SimSwap
```

The code above will clone the repository into our notebook. If you go to the folders tab on your Google Colab, you'll see all the files that you saw in their GitHub now available in your notebook.

> Make sure to add the exclamation mark `!` before the `git` command. Otherwise, you'll get a syntax error.

The next step involved is to install our dependencies.

### Installing the required dependencies
Our main dependency for this build is [PyTorch](https://pytorch.org/). To get your computer specific PyTorch installation, head over to the PyTorch's website, select your PyTorch build, your OS, package, language, and compute platform of choice. Once you do this, a user-specific installation command will be generated. Use the generated command to install PyTorch on your notebook.

The following command is generated for this build:

```bash
!pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu113
```
The next dependency we will install is based on what the SimSwap model documentation recommends [here](https://github.com/neuralchen/SimSwap/blob/main/docs/guidance/preparation.md). 

```bash
!pip install insightface==0.2.1 onnxruntime moviepy
```
If you have a GPU machine, use the `onnxruntime-gpu` coomand instead. Since we are using Google Colab notebook with a GPU enabled, use this command:

```bash
!pip install insightface==0.2.1 onnxruntime-gpu moviepy
```

- `insightface==0.2.1` is an open source 2D & 3D deep face analysis library that implements a rich variety of state of the art algorithms of face recognition, face detection and face alignment. You can read more about it [here](https://github.com/deepinsight/insightface).
- `onnxruntime-gpu` is an engine for Open Neural Network Exchange (ONNX). It allows for serialization in deep learning models improving their performance. 
- `moviepy` is a module used in python programming language for video editing, i.e., cuts, adding titles, concatenation etc.

### Downloading additional models
According to this [documentation](https://github.com/neuralchen/SimSwap/blob/main/docs/guidance/preparation.md), we need to download additional models and place them into the correct folder in the repository. These files include:

- [InsightFace](https://onedrive.live.com/?authkey=%21ADJ0aAOSsc90neY&cid=4A83B6B633B029CC&id=4A83B6B633B029CC%215837&parId=4A83B6B633B029CC%215834&action=locate) to help in image processing. It should be unzipped into the `./insightface_func/models/antelope` folder.

You can download and upload it manually or use the following code:

```bash
!wget --no-check-certificate "https://sh23tw.dm.files.1drv.com/y4mmGiIkNVigkSwOKDcV3nwMJulRGhbtHdkheehR5TArc52UjudUYNXAEvKCii2O5LAmzGCGK6IfleocxuDeoKxDZkNzDRSt4ZUlEt8GlSOpCXAFEkBwaZimtWGDRbpIGpb_pz9Nq5jATBQpezBS6G_UtspWTkgrXHHxhviV2nWy8APPx134zOZrUIbkSF6xnsqzs3uZ_SEX_m9Rey0ykpx9w" -O antelope.zip
!unzip ./antelope.zip -d ./insightface_func/models/antelope
```

- [Face parsing](https://drive.google.com/file/d/154JgKpzCPW82qINcVieuPH3fZ2e0P812/view) for image post-processing. It should be placed into the `./parsing_model/checkpoint` folder.

You can download it and upload it manually, or use the following code:

```bash
!wget -P ./parsing_model/checkpoint https://github.com/neuralchen/SimSwap/releases/download/1.0/79999_iter.pth
```

- Two [archives](https://drive.google.com/drive/folders/1jV6_0FIMPC53FZ2HzZNJZGMe55bbu17R) on the drive. `arcface_checkpoint.tar` to be placed in the `./arcface_model` folder and `checkpoints.zip`. unzipped into the `root ./` folder.

You can download it and upload it manually. Alternatively, use the following code:

```bash
!wget -P ./arcface_model https://github.com/neuralchen/SimSwap/releases/download/1.0/arcface_checkpoint.tar
!wget https://github.com/neuralchen/SimSwap/releases/download/1.0/checkpoints.zip
!unzip ./checkpoints.zip  -d ./checkpoints
```

Once you've downloaded these files, you'll need to upload them into the correct folder. If not, you'll get several errors. It is a little of pain to set it up but just be patient and ensure that you've followed every instruction to the letter.

We can now go ahead and test this model on images.

### Learning how to face swap images
To perform face swapping on images, we simply need to run the following command:

```python
cd SimSwap & python test_one_image.py --name people --Arc_path arcface_model/arcface_checkpoint.tar --pic_a_path crop_224/2.jpg --pic_b_path crop_224/ds.jpg --output_path output/
```

Since our cloned SimSwap repository is in another folder, we first need to enter into the folder using `cd SimSwap`. We then perform some python commands while inside the folder.

- The `test_one-image.py` is a python file that comes with the repository.
- `--name people` allows the SimSwap to use the `people` model.
- `--pic_a_path` indicates the path of image with the target face. The target face image is located inside the `crop_224` folder. You can change the target image to a different one inside the folder.
- `--pic_b_path` indicates the path of image with the source face to swap. The source face to swap image is located inside the `crop_224` folder too. You can change the target image to a different one inside the folder.
- `--output_path` indicates the path of directory to store the face swapping result

Image one:

![Target face image](/engineering-education/simple-swap-for-swapping-faces/6.jpg)

Image two:

![Source face to swap image](/engineering-education/simple-swap-for-swapping-faces/ds.jpg)

When you swap the target face image, `6.jpg` with the source face to swap image, `ds.jpg`, we get the following resulting image:

![Result](/engineering-education/simple-swap-for-swapping-faces/result.jpg)

Impressive, right?

We have successfully swapped facial features from a source image onto a target image. Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1Us2-0dVMBVVqUfyXnuL4YPfF6dG6Wr7F?usp=sharing).

> Make sure to only use this model for good purposes. Do not apply this model for illegal and unethical purposes. 

### Wrapping up
SimSwap is a model that has shown to perform well in face swapping tasks. This model can be extended to swap people's faces in videos. Please refer to their main documentation on GitHub to learn more. It is a technique widely used in the film industry to help generate non-existent twins. It is used to reconstruct an actor's face model. It also rebuilds a scenes attributes, i.e., lighting condition.

### Further reading
- [SimSwap: An Efficient Framework For High Fidelity Face Swapping](https://arxiv.org/pdf/2106.06340v1.pdf)
- [GitHub](https://github.com/neuralchen/SimSwap)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

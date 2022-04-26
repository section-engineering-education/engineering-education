---
layout: engineering-education
status: publish
published: true
url: /image-colorization-using-ai-and-python/
title: Image colorization using AI and Python
description: This article will discuss how to use the DeOldify model to convert some old black and white photos of a city by adding color to them.
author: sharon-kinyan
date: 2022-04-26T00:00:00-09:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-colorization-using-ai-and-python/hero.png
    alt: Image colorization using AI and Python Hero Image
---
[DeOldify](https://github.com/jantic/DeOldify) is a Deep Learning (DL) based project for colorizing and restoring old images and videos. It helps us add color to old black and white photos adding life to them. The DL model uses a unique NoGAN architecture to train the model.
<!--more-->
We will use this model to convert some old black and white photos of a city by adding color to them.

### Prerequisite
To follow along, you need to be familiar with:
- Machine Learning algorithms.
- Google Colab.

### Outline
- [The Deoldify model](#the-deoldify-model)
- [Cloning the GitHub Repository for the model](#cloning-the-github-repository-for-the-model)
- [Installing the necessary dependencies](#installing-the-necessary-dependencies)
- [Downloading the model](#downloading-the-model)
- [Performing colorization on old black and white photos](#performing-colorization-on-old-black-and-white-photos)
- [Wrapping up](#wrapping-up)
- [References](#references)

### The Deoldify model
Deoldify uses a Generative Adversarial Neural Network (GAN). It uses a special type of GAN called a self-attention GAN.

Aside from using self-attention GAN and some special transformations, this model also uses a technique known as No-GAN. It is a highly efficient way of training GANs.

Most GANs have two parts; a Generator and a Discriminator.

The Generator is the part that creates the image. The discriminator tries to pick out the real color images from fake recolored images. The No-GAN technique works by training the Generator and the Discriminator models present in GANs in isolation.

It's similar to how you would train a normal neural network but different from GANs as they are usually trained side by side. They are then fine-tuned together, typically how you would train a GAN.

The model works by taking a black and white image and passing it to the Deoldify model. The model will then output a colored image. The model is trained on several colored images, and does a great job in producing colored images.

That's a summary of the Deoldify model in a nutshell. Please visit this GitHub [documentation](https://github.com/jantic/DeOldify) to learn more.

### Cloning the GitHub Repository
We are going to use the GitHub repository that contains the actual model. Inside our Google Colab, let's type in the following code:

```bash
!git clone https://github.com/jantic/DeOldify.git DeOldify
```
The above code clones the DeOldify repository into the `DeOldify` folder. We will be working inside this folder. To get into this folder, we write the following code:

```bash
cd DeOldify
```
Once inside, we can now install the dependencies needed for the project.

### Installing the necessary dependencies
To use the model, we need to install a couple of dependencies.

```bash
!pip install -r colab_requirements.txt
```

By running the above command, all the dependencies available in the `requirement.txt` file inside the cloned folder gets installed. These dependencies include:

- fastai==1.0.51
- wandb
- tensorboardX==1.6
- ffmpeg-python
- youtube-dl>=2019.4.17
- jupyterlab
- pillow>=8.0.0

All these dependencies are necessary for the model to work. They all get installed automatically, and there's no need to install them manually. Once done, we can go ahead and download the model.

### Downloading the model
Next, we will need to download the pre-trained model.

```bash
!mkdir 'models'
!wget https://data.deepai.org/deoldify/ColorizeArtistic_gen.pth -O ./models/ColorizeArtistic_gen.pth
```
We have created a new folder called `models` inside the main `DeOldify` folder. Using `wget`, a software package for retrieving files using HTTP, HTTPS, FTP, and FTPS, we download the pre-trained model into that newly created folder.

Let's create a variable `colorizer` to store our model.

```python
colorizer = get_image_colorizer(artistic=False)
```

### Performing colorization on old black and white photos
Let's take black and white images and add some color to them. We will use old images of iconic buildings that still stand to date in the city of Nairobi, Kenya.

These are the images we will use:

Image of KICC:

![KICC](/engineering-education/image-colorization-using-ai-and-python/kicc.jpg)

*[Image Source: Pinterest](https://i.pinimg.com/originals/25/6f/0a/256f0af1b060922203ca5ac632f8314e.jpg)*

Image of Nairobi Railway Station:

![Nairobi Railway Station](/engineering-education/image-colorization-using-ai-and-python/nairobi-railway-station.jpg)

*[Image Source: African Digital Heritage ](https://africandigitalheritage.org/wp-content/uploads/2021/06/DSC_0086-1.jpg)*

Image of Stanley Hotel:

![New Stanley hotel](/engineering-education/image-colorization-using-ai-and-python/new-stanley-hotel.jpg)

*[Image Source: Pinterest](https://i.pinimg.com/originals/04/3f/98/043f98fec8e242fd5b04376c583fa144.jpg)*

Image of the Norfolk Hotel:

![Norfolk hotel](/engineering-education/image-colorization-using-ai-and-python/norfolk-hotel.jpg)

*[Image Source: Arxiv](https://i.pinimg.com/originals/31/41/05/314105d909000eed4cdf5c148a36a3bd.jpg)*

Inside the `test_images` folder located in the main DeOldify folder, upload all the images you want to colorize.

Using the `plot_transformed_image` method, we can pass in our images, and colored output images will be generated. These generated images are of the size 8px by 8px. You can change these values if you wish.

```python
colorizer.plot_transformed_image('test_images/image-name.jpg', render_factor=35, display_render_factor=True, figsize=(8,8))
```
The default value of 35 for the `render_factor` works well in most scenarios. The `render_factor` determines the resolution at which the color portion of the image is rendered. The lower `render_factor` is ideal for lower resolution images, while a higher `render_factor` for high-resolution images.

However, with the lower `render_factor` in low-resolution images, images tend to be vibrant, unlike high-resolution images where the colors seem to be washed away.

These are the generated colored images:

Colored image of KICC:

![New colored KICC](/engineering-education/image-colorization-using-ai-and-python/new-kicc.png)

Colored image of Nairobi Railway Station:

![Colored Nairobi Railway Station](/engineering-education/image-colorization-using-ai-and-python/colored-nairobi-railway-station.png)

Colored image of Stanley Hotel:

![New colored Stanley hotel](/engineering-education/image-colorization-using-ai-and-python/new-colored-stanley-hotel.png)

Colored image of the Norfolk Hotel:

![Colored Norfolk hotel](/engineering-education/image-colorization-using-ai-and-python/colored-norfolk-hotel.png)

We can see that the Deoldify model has added some color to our images. We achieved these results with only a few lines of code. Amazing, right?

Of course, it's not perfect. But, this technology shows you what is possible with amazing technologies such as the one used in this experiment.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1bh15liSGDkUMwez4xNH1kG6ETFxQVlZ6?usp=sharing).

### Wrapping up
The Deoldify model lets you recolor old images and videos of family members or even cities. The model is open-source and available through [GitHub](https://github.com/jantic/DeOldify). You can easily experiment with your old photos from your childhood and add color to them.

### References
- [DeOldify: A Deep Learning based project for colorizing and restoring old images](https://github.com/jantic/DeOldify)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)

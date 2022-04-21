---
layout: engineering-education
status: publish
published: true
url: /image-colorization-using-ai-and-python/
title: Image colorization using AI and Python
description: This article will discuss how to use the DeOldify model to convert some old black and white photos of a city adding color to them.
author: sharon-kinyan
date: 2022-04-10T00:00:00-21:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-colorization-using-ai-and-python/hero.png
    alt: Image colorization using AI and Python Example Image
---
[DeOldify](https://github.com/jantic/DeOldify) is a Deep Learning (DL) based project for colorizing and restoring old images and video. It helps us add color old black and white photos adding life into them. The DL model uses a unique NoGAN architecture to train the model. 
<!--more-->
We will use this model to convert some old black and white photos of a city adding color to them.

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
Deoldify uses a Generative Adversarial Neural Network (GAN). But it uses a special type of GAN called a self-attention GAN. Aside from using self-attention GAN and some special transformations, this model also uses a special technique known as No-GAN. It is a highly efficient way of training GANs.

Most GANs have two parts; a Generator and a Discriminator. The Generator is the part that creates the image. The discriminator tries to pick out real color images from fake recolored images. The No-GAN technique works by training the Generator and the Discriminator models present in GANs in isolation. This is similar to how you would train a normal neural network, but different with GANs are they are usually trained side by side. Then, they are fine-tuned together, typically how you would train a GAN.   

The model works by taking a black and white image, and pass it to the Deoldify model. The model will then output a colored image. The model is trained on a lot of colored images and does a good job in producing colored images.

That's a summary of the Deoldify model in a nutshell. Please visit this GitHub [documentation](https://github.com/jantic/DeOldify) to learn more. 

### Cloning the GitHub Repository for the model
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

```python
!pip install -r colab_requirements.txt
```

By running the `!pip install -r colab_requirements.txt` command, all the dependencies available in the `requirement.txt` file inside the cloned folder gets installed. These dependencies include:

- fastai==1.0.51
- wandb
- tensorboardX==1.6
- ffmpeg-python
- youtube-dl>=2019.4.17
- jupyterlab
- pillow>=8.0.0

All these dependencies are necessary for the model to work. They all get installed automatically. No need to install them manually. Once done, we can go ahead and download the model.

### Downloading the model
Next, we will need to download the pre-trained model.

```python
!mkdir 'models'
!wget https://data.deepai.org/deoldify/ColorizeArtistic_gen.pth -O ./models/ColorizeArtistic_gen.pth
```
We have created a new folder called `models` inside of the main `DeOldify` folder. Using `wget`, a software package for retrieving files using HTTP, HTTPS, FTP and FTPS, we download the pre-trained model into that newly created folder.

```python
colorizer = get_image_colorizer(artistic=False)
```
Inside the `test_images` folder, upload all the images that you want to colorize. 

```python
colorizer.plot_transformed_image('test_images/kicc.jpg', render_factor=35, display_render_factor=True, figsize=(8,8))
```
### Performing colorization on old black and white photos 
Let's now take black and white images and add some color to them. We will use old images of iconic buildings that still stand to date of the city of Nairobi, Kenya.

Image of KICC:

![KICC](/engineering-education/image-colorization-using-ai-and-python/kicc.jpg)

![New colored KICC](/engineering-education/image-colorization-using-ai-and-python/new-kicc.png)

Image of Nairobi:

![Nairobi Railway Station](/engineering-education/image-colorization-using-ai-and-python/nairobi-railway-station.jpg)

![Colored Nairobi Railway Station](/engineering-education/image-colorization-using-ai-and-python/colored-nairobi-railway-station.png)

Image of Stanley Hotel:

![New stanley hotel](/engineering-education/image-colorization-using-ai-and-python/new-stanley-hotel.jpg)

![New colored stanley hotel](/engineering-education/image-colorization-using-ai-and-python/new-colored-stanley-hotel.png)

Image of National Archives:

![Norfolk hotel](/engineering-education/image-colorization-using-ai-and-python/norfolk-hotel.jpg)

![Colored Norfolk hotel](/engineering-education/image-colorization-using-ai-and-python/colored-norfolk-hotel.png)

We can see that the Deoldify model has added some color onto our images. Of course, it's not perfect. But, this technology just goes on to show you what is possible with amazing technologies lies these.

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1bh15liSGDkUMwez4xNH1kG6ETFxQVlZ6?usp=sharing).

### Wrapping up
The Deoldify model let's you recolor old images and videos of family members or even cities. The model is open-source and it's available through [GitHub](https://github.com/jantic/DeOldify).

### References
- [DeOldify: A Deep Learning based project for colorizing and restoring old images](https://github.com/jantic/DeOldify)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
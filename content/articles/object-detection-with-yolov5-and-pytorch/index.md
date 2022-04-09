---
layout: engineering-education
status: publish
published: true
url: /object-detection-with-yolov5-and-pytorch/
title: Object Detection with YOLOv5 and PyTorch
description: In this tutorial, the reader will understand the basics of object detection with YOLO model. We will also be building a simple object detector.
author: adhinga-fredrick
date: 2021-12-16T00:00:00-06:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/object-detection-with-yolov5-and-pytorch/hero.jpg
    alt: Object Detection with YOLOv5 and PyTorch Hero Image
---
Object detection is usually one of the most interesting computer vision tasks that a beginner or an enthusiast can use to jump-start their career in computer vision and artificial Intelligence.
<!--more-->
In this article, we will learn some basics about object detection before proceeding to detect objects using [YOLOv5](https://github.com/ultralytics/yolov5) and the [COCO dataset](https://cocodataset.org/#home).

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Setting up the development environment](#setting-up-the-development-environment)
- [Installing project dependencies](#installing-project-dependencies)
- [Model inference using detect.py](#model-inference-using-detectpy)
- [Model inference with PyTorch Hub and YOLOv5](#model-inference-with-pytorch-hub-and-yolov5)
- [Model training](#model-training)
- [Model validation](#model-validation)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
As a prerequisite, you must have:
- Python installed on your machine.
- Basic knowledge of Python.

### Introduction
**Object detection** is a computer vision task that involves identifying instances of an object of a certain class within an image or a video.

Object detection is used in a very wide range of applications like self-driving cars, security, manufacturing, etc.

Object detection has two main state-of-art methods namely:
1. One-stage methods - these are mainly focused on the **inference speed**. Examples include: YOLO, RetinaNet, and SSD.
2. Two-stage methods - these are mainly focused on **detection accuracy**. Examples include: Mask R-CNN, Faster R-CNN, and Cascade R-CNN.

To check our model's accuracy, we will be using the popular object detector metric _Average Precision_.

In this tutorial, we will be using **YOLO** (_You Only Look Once_) specifically [YOLOv5](https://github.com/ultralytics/yolov5) which focuses on inference speed and accuracy.

YOLO is a fast and accurate approach to object detection. The algorithm only looks at an image once and detects all the objects that are present along with their location.

YOLO works by splitting images into a grid where each grid cell identifies an object by itself. The grid cells predict all the bounding boxes and give each of them a confidence score to determine the accuracy of each prediction.

When it comes to performance, YOLO outperforms other object detectors by far. In real-time, it can process images at a rate of around 155 frames per second (fps), achieving double the mAP(Mean Average Precision - _a popular evaluation metric for object detectors_) of other object detectors like R-CNN.

YOLOv5, the latest release of the YOLO family is a group of compound-scaled object detection models trained on the COCO dataset used for model ensembling (_combining multiple models in the prediction process_), Test Time Augmentation (_performing random modifications to the test images like flipping, rotating, etc._) and hyperparameter evolution (_optimizing hyperparameters using a genetic algorithm for optimization_).

### Setting up the development environment
To set up our development environment, we will start by creating our project's virtual environment as shown below:

Go to the terminal and create a new directory named **object-detection** as shown below:

```bash
mkdir object_detection
```

Then, create a virtual environment inside your projects directory:

```bash
cd object detection
py -m venv .env
```

We will then activate the environment using the following commands:

```bash
cd .env/Scripts
activate
cd ..
cd ..
```

Once our environment setup is done, we will then move on to install our project's dependencies.

### Installing project dependencies
We will start by first cloning the YOLOV5 repository on GitHub using the following command:

```bash
git clone https://github.com/ultralytics/yolov5.git
```

After successfully cloning the repository to our project's environment, we will install all the dependencies using the following command:

```bash
cd yolov5
pip install -r requirements.txt
```

The command above installs the following packages:

![requirements](/engineering-education/object-detection-with-yolov5-and-pytorch/requirements.png)

Once we're done with installing all the required dependencies, we will move on to training our model.

### Model inference using detect.py
Since YOLOv5 is a pre-trained model, we will test its performance by running the following command to see how accurately it detects objects through the web camera.

```bash
python detect.py --source 0
```

Here, `--source 0` signifies that the data location is from the live web camera.

![object1](/engineering-education/object-detection-with-yolov5-and-pytorch/object1.png)

To test its performance on other sources like an image file (let's say `img.jpg`), use the following command:

```bash
python detect.py --source img.jpg  # for a specific image file
```

Running the following command will detect objects on our images stored in the path `data/images`:

```bash
python detect.py --weights yolov5s.pt --img 640 --conf 0.25 --source data/images
```

Here, we are using yolov5 pre-trained weights to train images at a default resolution of `--img 640` (size 640 pixels) from source `data/images`.

![boda](/engineering-education/object-detection-with-yolov5-and-pytorch/boda1.jpg)

The image objects above will be detected as shown below:

![boda](/engineering-education/object-detection-with-yolov5-and-pytorch/boda.jpg)

The results of the detected image will be stored in the path `runs/detect/exp`.

For other visual objects, use the following commands:

```bash
python detect.py --source vid.mp4  # for a specific video
python detect.py --source path/  # for a specific directory
python detect.py --source path/*.jpg  # for a specific glob
python detect.py --source 'https://youtu.be/Zgi9g1ksQHc'  # for a specific YouTube video
python detect.py --source 'rtsp://example.com/media.mp4'  # for a specific RTSP, RTMP, or HTTP stream
```

> **NOTE**: Before running the commands above, make sure the objects that you want to detect are located under the `data/...` folder. For example, `data/videos`, `data/images`, etc.

### Model inference with PyTorch Hub and YOLOv5
To check the inference using PyTorch, we will load the pre-trained `YOLOv5s` model from PyTorch Hub and then pass an image for inference.

> **NOTE**: 'YOLOv5s' is the fastest and lightest YOLOv5 model.

```python
import torch

# Model - we will use yolov5s
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Image
img = 'https://ultralytics.com/images/zidane.jpg'

# Inference
results = model(img) # pass the image through our model

results.pandas().xyxy[0] # return the predictions as a pandas dataframe
```

The result of the code above will be something like this:

![inference](/engineering-education/object-detection-with-yolov5-and-pytorch/inference.JPG)

You can also access the results of the code above on [GitHub](https://github.com/FREDERICO23/object-detection).

### Model training
We will proceed to train our model on [COCO128](https://www.kaggle.com/ultralytics/coco128) that is downloaded along with YOLOv5 from [YOLOv5's latest releases](https://github.com/ultralytics/yolov5/releases).

We will use YOLOv5 pre-trained weights (`--weights yolov5s.pt`) when training our custom model as shown below:

```bash
python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights yolov5s.pt --cache
```

Or use randomly initialized weights (`--weights '' --cfg yolov5s.yaml`) as shown below:

```bash
python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights '' --cfg yolov5s.yaml --cache
```

Here, we fine-tuned `COCO128` for `3` epochs using pre-trained YOLOv5s.

Our **training results** will be saved under the directory `runs/train/exp` with incrementing run directories, i.e. `runs/train/exp1`, `runs/train/exp2`, and so on.

### Model validation
To evaluate our model's accuracy on the [COCO](https://cocodataset.org/#home) dataset, we will download the [COCO 2017](https://github.com/ultralytics/yolov5/blob/74b34872fdf41941cddcf243951cdb090fbac17b/data/coco.yaml#L14) validation dataset using the following command:

```bash
torch.hub.download_url_to_file('https://ultralytics.com/assets/coco2017val.zip', 'tmp.zip')
```

Unzip the file using:

```bash
unzip -q tmp.zip -d ../datasets && rm tmp.zip
```

Once done, we will run the following command to validate our model.

```bash
python val.py --weights yolov5x.pt --data coco.yaml --img 640 --iou 0.65 --half
```

Here, we test the `YOLOv5x` on [COCO val2017](https://cocodataset.org/) dataset at image size `640` pixels.

Below is an example of our output:

![evaluation](/engineering-education/object-detection-with-yolov5-and-pytorch/evaluation.JPG)

The model's evaluation results will be saved to directory `runs/val/exp`.

### Conclusion
To wrap up, we have learned what object detection is, its applications, and its implementation.

We have also tackled the YOLO object detection algorithm (YOLOv5 particularly) which we used to perform our own object detection by setting up the environment to detect images and videos.

> **NOTE**: The actual process of building the model from scratch goes beyond this tutorial.

Code for the object detector can be found [here](https://github.com/FREDERICO23/object-detection).

Happy coding!

### Further reading
- [YOLOv5 Documentation](https://docs.ultralytics.com/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)

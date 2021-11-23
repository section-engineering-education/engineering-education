
### Object Detection with YOLOV5 and Pytorch

Object detection is usually one of the most interesting computer vision tasks a beginner or an enthusiast can use to jump-start their career in computer vision and artificial Intelligence.

In this article, we will look at the basic knowledge on object detection before proceeding to perform object detection using [YOLOv5](https://github.com/ultralytics/yolov5) and the [COCO dataset](https://cocodataset.org/#home).

### Introduction

**Object detection** is a computer vision task that involves identifying instances of an object of a certain class within an image or a video. Object detection has two main state-of-art methods namely:

1.  One-stage methods - these are mainly focused on the inference speed. Examples include: YOLO, RetinaNet, and SSD
2.  Two-stage methods - these are mainly focused on detection accuracy. Examples include Mask R-CNN, Faster R-CNN, and Cascade R-CNN.

To check our model’s accuracy, we will be using the popular object detector metric _Average Precision_.

In this tutorial will be using  **YOLO** (_You Only Look Once_) specifically [YOLOv5](https://github.com/ultralytics/yolov5) which focuses on inference speed and accuracy.

Slowly becoming the industry’s standard for object detection, YOLO is a fast and accurate approach to object detection. The algorithm only looks at an image once and detects  what objects are present and their location.

YOLO works by splitting images into a grid where each grid cell identifies an object by itself. The grid cells predict all the bounding boxes and gives each of them a confidence scores to detemine the accuracy of each prediction.

When it comes to perfomance, YOLO outperforms other object detectors by far. In real-time, it is able to process images at a rate of around 155 frames per second, achieving double the mAP(Mean Average Precision) of other object detectors like R-CNN.

YOLOv5, the latest release of the YOLO family is a group of compound-scaled object detection models trained on the COCO dataset used for model ensembling, Test Time Augmentation (TTA) and hyperparameter evolution.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Setting up the development environment](#setting-up-the-development-environment)
- [Installing YOLOv5 and other project dependencies](#installing-yolov5-and-other-project-dependencies)
- [Model inference using `detect.py`](#model-inference-using-detect.py)
- [Model inference with PyTorch Hub and YOLOv5](#model-inference-with-pytorch-hub-and-yolov5)
- [Model training](#model-training )
- [Model validation](#model-validation)
- [Conclusion](#conclusion)

### Prerequisites

1.  Python installed on your machine
2.  Basic knowledge of Python

### Setting up the development environment

To set up our development environment, we will start by creating our project’s virtual environment as shown below:

Go to the terminal and create a new directory called **object-detection** as shown below:

```bash
mkdir object_detection
```
Then create a virtual environment inside your projects directory:
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
Once our environment setup is done, we will then move on to installing our projects dependencies

### Installing YOLOv5 and other project dependencies

We will start by first cloning the YOLOV5 repository on GitHub using the following command:
```bash
git clone https://github.com/ultralytics/yolov5
```
After successfully cloning the repo in our project's environment, we will install all the dependencies using the following command:
```bash
cd yolov5

pip install -r requirements.txt
```
The command above installs the following packages:

![requirements](/engineering-education/building-an-object-detection-model-with-yolov5-and-pytorch/requirements.png)

Once we're done with installing all the required dependencies, we will move on to training our model.


### Model inference using `detect.py`

Since YOLOv5 is a pre-trained model, we will test its performance by running the following command to see how accurately it detects objects through the webcam.

```bash
python detect.py --source 0
```
![object1](/engineering-education/building-an-object-detection-model-with-yolov5-and-pytorch/object1.png)

To test it on other sources, use the following commands:

```bash
python detect.py --source img.jpg  # for a specific image file
```
**Example**
Running the following command  will detect objects on our images stored in the path `data/images` :
```bash
python detect.py --weights yolov5s.pt --img 640 --conf 0.25 --source data/images
```
![boda](/engineering-education/building-an-object-detection-model-with-yolov5-and-pytorch/boda1.jpg)

The above image objects will be detected as shown below:

![boda](/engineering-education/building-an-object-detection-model-with-yolov5-and-pytorch/boda.jpg)

The detected image results are stored in the path `runs/detect/exp`.

```bash
python detect.py --source vid.mp4  # for a specific video
python detect.py --source path/  # for a specific directory
python detect.py --source path/*.jpg  # for a specific glob
python detect.py --source 'https://youtu.be/Zgi9g1ksQHc'  # for a specific YouTube video
python detect.py --source 'rtsp://example.com/media.mp4'  # for a specific RTSP, RTMP, or HTTP stream
```
### Model inference with PyTorch Hub and YOLOv5

To check the inference using PyTorch, we will load the pre-trained YOLOv5s model from PyTorch Hub and then pass an image for inference. 

>N|B: `'YOLOv5s'` is the fastest and lightest YOLOv5 model.

```python
import torch

# Model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Image
img = 'https://ultralytics.com/images/zidane.jpg'

# Inference
results = model(img)

results.pandas().xyxy[0]
```
### Model training 

Since the COCO dataset is automatically downloaded from [YOLOv5 latest releases](https://github.com/ultralytics/yolov5/releases), we will proceed to train our model.

We will use YOLOv5 pretrained weights (`--weights yolov5s.pt`) or randomly initialized weights (`--weights '' --cfg yolov5s.yaml`)  when training our model as shown below:
```bash
python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights yolov5s.pt --cache
```
or
```bash
python train.py --img 640 --batch 16 --epochs 3 --data coco128.yaml --weights '' --cfg yolov5s.yaml --cache
```
Our **training results** will be saved to the directory`runs/train/exp` with incrementing run directories, i.e. `runs/train/exp1`, `runs/train/exp2`.

### Model validation

To evaluate our model's accuracy on the [COCO](https://cocodataset.org/#home) dataset, we will download the [COCO 2017](https://github.com/ultralytics/yolov5/blob/74b34872fdf41941cddcf243951cdb090fbac17b/data/coco.yaml#L14) validation dataset using the following command:

```bash
torch.hub.download_url_to_file('https://ultralytics.com/assets/coco2017val.zip', 'tmp.zip')
```
and then unzip the file using:
```bash
unzip -q tmp.zip -d ../datasets && rm tmp.zip
```

Once done, we will then run the following  command to validate our model.
```bash
python val.py --weights yolov5x.pt --data coco.yaml --img 640 --iou 0.65 --half
```

The model's evaluation results will be saved to directory `runs/val/exp`.


### Conclusion

Like we have seen above, object detection is a very interesting computer vision task to get started with. Despite its numerous applications in fields like self-driving cars, security, manufacturing, etc. it can be also used as an onboarding project for computer vision and artificial intelligence enthusiasts. 

>N/B: The actual process of building of the model from scratch goes beyond this tutorial.

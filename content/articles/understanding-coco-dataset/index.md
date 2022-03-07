---
layout: engineering-education
status: publish
published: true
url: /understanding-coco-dataset/
title: Understanding COCO Dataset
description: This article will introduce the reader to COCO dataset. We will also implement a simple dataset validator using Python.
author: srishilesh-p-s
date: 2022-03-07T00:00:00-06:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-coco-dataset/hero.jpg
    alt: Understanding COCO Dataset Hero Image
---
In our [previous tutorial](/engineering-education/understanding-pascal-voc-dataset/), we learned what object detection is, how the datasets are structured to detect objects, and understood the history behind PASCAL VOC dataset representation.
<!--more-->
In this tutorial, we will learn how to represent the dataset in COCO format. We will understand how the COCO format is structured and how it became a standardized dataset format to detect objects.

We will build a dataset format validator using Python to verify if the dataset structure is a COCO format.

> It is highly recommended to read [this](/engineering-education/understanding-pascal-voc-dataset/) tutorial before proceeding further.

### Table of contents
- [Pre-requisites](#pre-requisites)
- [Introduction](#introduction)
- [COCO](#coco)
  - [History](#history-behind-coco)
  - [Taxonomy](#coco-taxonomy)
  - [Validator](#coco-validator)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Pre-requisites
To follow along, the reader must have the following:
- A decent understanding of what machine learning datasets are and how they are used to detect objects.
- The reader should have read [this](/engineering-education/understanding-pascal-voc-dataset/) tutorial on PASCAL VOC.
- Basic understanding of [Python](https://www.python.org).

### Introduction
As we learned in our [previous tutorial](/engineering-education/understanding-pascal-voc-dataset/), for any [supervised](https://en.wikipedia.org/wiki/Supervised_learning) or [semi-supervised](https://www.geeksforgeeks.org/ml-semi-supervised-learning/) machine learning model to detect objects, it must be trained with a [labeled](https://www.cloudfactory.com/data-annotation-tool-guide) (or annotated) [dataset](https://en.wikipedia.org/wiki/Data_set) that holds all information about the objects present in an image.

The objects in the dataset are labeled with rectangular box coordinates called ["Bounding boxes"](https://medium.com/analytics-vidhya/basics-of-bounding-boxes-94e583b5e16c).

### COCO
COCO dataset provides large-scale datasets for object detection, segmentation, keypoint detection, and captioning images.

> We will explore the above terminologies in the upcoming sections.

It contains over [80 object categories](https://cocodataset.org/#home) with over 1.5 million object instances for context recognition, object detection, and segmentation.

#### History behind COCO
[ImageNet and MS COCO visual recognition workshop](https://image-net.org/challenges/ilsvrc+mscoco2015) at [ICCV 2015](https://iccv2021.thecvf.com) organized [challenges for object detection from 2015 to 2020](https://cocodataset.org/#detection-2015) following a standardized dataset structure called Microsoft's [Common Objects in Context (COCO) dataset](https://arxiv.org/pdf/1405.0312.pdf).

The challenge was to improve object detection methods with a focus on speed and accuracy. They provided datasets containing more than 200,000 images with over 80 object categories.

The main objectives were to detect objects using:
- `Bounding box` - Detect the objects with coordinates.
- `Object segmentation` - Detect and differentiate the desired object from other objects.

The series of challenges continued every year focusing on different types of problems like:
- [Object detection in 2015](https://cocodataset.org/#detection-2015) - to detect objects of an image.
- [Captioning in 2015](https://cocodataset.org/#captions-2015) - to understand the context of the image and output the same textually.
- [Keypoint detection in 2018](https://cocodataset.org/#keypoints-2018) - to detect the location and structure of the object using minimal key points.
- [Stuff segmentation in 2019](https://cocodataset.org/#stuff-2019) - to differentiate objects of a certain type such that an object of a similar category contains the same color.
- [Panotopic segmentation in 2019](https://cocodataset.org/#panoptic-2019) - to uniquely differentiate each object with a separate color.
- [Densepose detection in 2020](https://cocodataset.org/#densepose-2020) - to estimate human poses by detecting and segmenting pixels.

To learn more about the COCO format and its working, you can read [this](https://arxiv.org/pdf/1405.0312.pdf) research paper.

#### COCO taxonomy
Here is a sample of what the structure of the COCO dataset looks like:

![COCO sample](/engineering-education/understanding-coco-dataset/coco-sample.png)

*Source: [Converted JSON version of Marmot dataset](https://www.icst.pku.edu.cn/cpdp/sjzy/) for table recognition*

> You can find the above sample dataset [here](https://gist.github.com/srishilesh/b3b5028ba9e1f3ec409806e93a407db4).

The object annotations in the above image are represented using the following fields:

##### images
This `images` is a list of objects that contains the meta-data information about the images like the location of the file, size of the annotation, and a unique identifier for each annotation.

We have a few required keys for each object like:
- `file_name` - that specifies the name of the file. Here, it is `10.1.1.1.2006_3.bmp`.
- `height` - specifies the image height. Here, the image is `1123` pixels tall.
- `width` - specifies the image width. Here, the image is `793` pixels wide.
- `id` - is a unique identifier that differentiates each image within a list. Here, it is the same as the file name.

Apart from these, we have a few optional keys like:
- `license` - specifies the copyright to use the image.
- `flickr_url` and `coco_url` - specify the URLs for the online hosted images.
- `date_captured` - specifies the date when the image was created.

##### categories
`categories` are classes (or labels) of objects that are present in an image.

In the COCO dataset, we have `supercategory` that tells about the generalized category of an object, whereas the `name` tells about a specific object.

For example, we can categorize `bicycle`, `car`, and `truck` under `name`. And, we can super categorize them as `vehicle` under `supercategory`.

> The field `supercategory` is optional and it is set as `None` by default.

In our case, we have classes `column` and `row` with each having its unique `id` (we refer to it as `category_id`).

##### annotations
`annotations` contain all meta-data about the labels related to an object. We have keys that specify the location, size, and category of the object.

Let's take a look at the child keys that we have under `annotations`:

- `iscrowd` - specifies if the annotation is for a single object or multiple objects that are close to it. It can be either `0` or `1`.
- `category_id` - is the mapping with the category that the object is related to.
- `image_id` - is the mapping with the image that the object is related to. Here, we have only 1 image, so the `image_id` would be `10.1.1.1.2006_3`.
- `id` - is a unique identifier that identifies each annotation.
- `area` - is a product of the width and height of the bounding box. It helps us determine the size of the bounding box.
- `bbox` - is a list of coordinates that determine the location of the object. Let's understand this in detail [here](#bbox).
- `segmentation` - is a flattened list of coordinates that helps us differentiate the object from the background. Let's understand this in detail [here](#segmentation).

##### bbox
These are coordinates that determine the location of the object.

These coordinates are represented as `[xmin, ymin, width, height]` where the `(xmin, ymin)` coordinates correspond to the top-left position of an object.

The `width` and `height` are `xmax - xmin` and `ymax - ymin` respectively.

> Whereas in the PASCAL VOC dataset, the format of the bounding box is different. It is represented as `[xmin, ymin, xmax, ymax]` which are the top-left and bottom-right coordinates respectively.

Here, in the above dataset, the bounding boxes are `[457, 709, 60, 76]`. It signifies that the top-left coordinates are `(457, 709)`, and the image is `60` pixels wide with a height of `76` pixels. Therefore, the `area` would be `4560`.

##### segmentation
This field signifies if the images contain annotations that are maskable. If the objective is to solve the problem of segmentation, then we specify the [Run-length encoded (RLE)](https://en.wikipedia.org/wiki/Run-length_encoding) values of the masks.

By default, the `segmentation` value is an empty list. Usually, we update the key with the value `[xmin, ymin, xmin, ymin + ymax, xmin + xmax, ymin + ymax, xmin + xmax, ymax]`. These values represents all the coordinates as shown:

- `(xmin, ymin)` - top-left coordinate
- `(xmin, ymin + ymax)` - top-right coordinate
- `(xmin + xmax, ymin + ymax)` - bottom-right coordinate
- `(xmin + xmax, ymax)` - bottom-left coordinate

#### COCO validator
We have understood how the COCO format is structured and what important parameters help us detect objects. Now, let's implement a simple dataset validator using Python.

##### Import libraries
We will use the `json` library to work with JSON files:

Import them as shown below:

```python
import json
```

##### Create object
Here, we will read the dataset file by parsing the JSON file as shown:

```python
coco_file = r'/content/sample.json' # Path to the JSON file

with open(coco_file) as json_file:
  coco_data = json.load(json_file) # Open the file and load them into coco_data
```

##### Assertions
To verify the correctness of any conditional statement, we will be using `assert()` assertion statements in Python.

In simple words, `assert()` helps debug the code by expecting the correctness of the statement that matches certain criteria. If it does not meet the criteria, it throws a default error.

> You can learn about `assert()` [here](https://www.geeksforgeeks.org/python-assert-keyword).

##### Validation
> It is highly recommended to keep the sample of the COCO dataset and this tutorial side-by-side.

You can find the sample dataset [here](https://gist.github.com/srishilesh/b3b5028ba9e1f3ec409806e93a407db4).

To start with, let's implement the `main()` method first:

```python
def main():
  required_keys = ['images', 'type', 'annotations', 'categories'] # Have a copy for the mandatory keys in a list
  for required_key in required_keys: # Loop through each required key
    assert required_key in coco_data.keys(), "Required key '{}' not found in the COCO dataset".format(required_key) # Check if the required key is present
    assert len(coco_data[required_key]) > 0, "Required key '{}' does not contain values".format(required_key) # Check if the required key contains value

  image_map = assertions('images', coco_data['images'], ["file_name", "height", "width", "id"], "file_name") # Verify the presence of keys present under 'images'
  category_map = assertions('categories', coco_data['categories'], ["id", "name", "supercategory"], "name") # Verify the presence of keys present under 'categories'
  annotation_assertions('annotations', coco_data['annotations'], image_map, category_map) # Verify the validity of keys under annotations
  print('The dataset format is COCO!') # If no error is thrown, the dataset is validated to be in COCO format

if __name__ == '__main__':
  main()
```

> NOTE: `assertions()` method will be explained in the subsequent code snippets.

The code above does the following:
- We specify all the mandatory keys as a list in `required_keys`.
- Then, we loop through each required key to check for the presence of values.
- `assertions(key, values, required_keys, unique_key)` method returns a dictionary that contains a mapping between `id` and the `unique_key`. We will explore more about this method in the next code snippet.
- Later, we perform a few other validations for the `annotations` key using `annotation_assertions()`.
- If no error is thrown, we declare the dataset format to be a COCO format.

Now, let's take a step back and look into the `assertions()` method. This reusable method can be used for asserting `images` and `categories` keys.

> Note that we have modularized the code so that the method can be reused to validate different objects based the arguments that we pass.

```python
def assertions(key, values, required_keys, unique_key=None):
  unique_key_id_mapper = {} # Mapping to keep track of the images
  for value in values: # Looping through each key to map the unique key with 'id'
    if unique_key is not None:
      unique_key_id_mapper[value['id']] = value[unique_key] # Map the 'unique_key' with 'id'
    for required_key in required_keys:
      assert required_key in value, "'{}' does not contain the required key '{}'".format(key, required_key) # Check if the required key is present in parent object
  return unique_key_id_mapper # Return the mapping
```

The code above does the following:
- We accept the name of the key to validate (`key`), the contents mapped with the key (`values`), the required keys under the parent key (`required_keys`), and an `unique_key` that can map with an `id`.
- We initialize `unique_key_id_mapper` to be an empty dictionary.
- Then, we loop through each `values` item and update the mappings in `unique_key_id_mapper`.
- Also, we check for the presence of the required key under the respective parent key.
- If no error is thrown, we return the mapping, which can later be used to validate the annotations.

Having validated all the meta-data about all the images and categories, let's now validate each object annotation.

> Under the `annotations` key, there may be more than one object. Therefore, we loop through all the objects in `annotations`.

```python
def annotation_assertions(key, annotations, image_map, category_map):
  required_keys = ['area', 'iscrowd', 'bbox', 'category_id', 'ignore', 'segmentation', 'image_id', 'id'] # Specify all the required keys under 'annotations'
  assertions('annotations', coco_data['annotations'], required_keys, None) # Assert the presence of all the required keys within the parent object
  for annotation in annotations:
    assert len(annotation['bbox']) == 4, "'{}' key in 'annotations' does not match the expected format".format('bbox') # Check if 'bbox' contains a list of 4 elements
    assert annotation['category_id'] in category_map, "'{}' is not present in the 'categories' mapping".format('category_id') # Check if the 'category_id' is present in the mapping that we created earlier
    assert annotation['image_id'] in image_map, "'{}' is not present in the 'images' mapping".format('image_id') # Check if the 'image_id' is present in the mapping that we created earlier
    assert annotation['area'] == (annotation['bbox'][2] * annotation['bbox'][3]), "Mismatch of values in '{}' and '{}'".format('area', 'bbox') # Check 'area' is a product of 'width' and 'height'
    assert len(annotation['segmentation'][0]) == 8 or len(annotation['segmentation']) == 0, "'{}' must either be an empty list or contain a list of 8 values".format('segmentation') # Check if the 'segmentation' values contains expected list
    assert annotation['iscrowd'] == 0 or annotation['iscrowd'] == 1, "'{}' must either be 0 or 1. {} is invalid".format('iscrowd', annotation['iscrowd']) # Check if 'iscrowd' contains either '0' or '1'
```

The above code does the following:
- We specify all the `required_keys` as a list.
- We assert for the presence of the `required_keys` under the parent object `annotations` using `assertions()` method.
- Then, we loop through each child object of `annotations`.
- We check if `bbox` contains a list of 4 elements i.e., `[x, y, width, height]`.
- We check if `category_id` and `image_id` are present in their respective mappings (`category_map` and `image_map` respectively).
- We check if `area` is a product of `width` and `height`.
- We check for the validity of the `segmentation` and `iscrowd` keys.

If no error is thrown, then we may say that the dataset is a COCO format.

The above code snippets help us validate and point out errors if we miss any required key.

### Conclusion
COCO dataset is not only used for object detection and segmentation but also keypoint detection, captioning, and so on. The problems that can be solved with the COCO dataset have improved over the years.

The dataset's representation as a JSON file helps us customize or modify datasets easily while using a standardized format for representing them.

To summarize, the reader learned:

- How ML models are trained with object annotations.
- How is COCO structured and understand the history behind it.
- The different meta-data parameters required for representation.
- Finally, the reader implemented a simple dataset validator to verify and check if the dataset is in COCO format.

You can find the source code [here](https://gist.github.com/srishilesh/6c953ff1d7ee006b412be7674d1542cb).

### Further reading
- [COCO dataset format](https://cocodataset.org/#format-data)
- [COCO research paper](https://paperswithcode.com/dataset/coco)
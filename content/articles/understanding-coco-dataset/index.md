---
layout: engineering-education
status: publish
published: true
url: /understanding-coco-dataset/
title: Understanding COCO Dataset
description: This article will introduce the reader to the COCO dataset. We will also implement a simple dataset validator using Python.
author: srishilesh-p-s
date: 2022-03-18T00:00:00-02:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-coco-dataset/hero.jpg
    alt: Understanding COCO Dataset Hero Image
---
In this tutorial, we will learn how to represent the dataset in COCO format. We will understand how the COCO format is structured and how it became a standardized dataset format to detect objects.
<!--more-->
In our [previous tutorial](/engineering-education/understanding-pascal-voc-dataset/), we learned what object detection is, how the datasets are structured to detect objects. We also discussed the history behind *PASCAL VOC* dataset representation.

In this article, we will build a dataset format validator using Python to verify if the dataset structure is a COCO format.

> It is highly recommended to read [this](/engineering-education/understanding-pascal-voc-dataset/) tutorial before proceeding further.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [COCO](#coco)
  - [History](#history-behind-coco)
  - [Taxonomy](#coco-taxonomy)
  - [Validator](#coco-validator)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along, the reader must have the following:
- A decent understanding of machine learning datasets and how they are used to detect objects.
- A basic understanding of [Python](https://www.python.org) and [PASCAL VOC](/engineering-education/understanding-pascal-voc-dataset/).

### Introduction
As we learned in our [previous tutorial](/engineering-education/understanding-pascal-voc-dataset/), for any [supervised](https://en.wikipedia.org/wiki/Supervised_learning) or [semi-supervised](https://www.geeksforgeeks.org/ml-semi-supervised-learning/) machine learning model to detect objects, it must be trained with a [labeled](https://www.cloudfactory.com/data-annotation-tool-guide) (or annotated) [dataset](https://en.wikipedia.org/wiki/Data_set) that holds all information about the objects present in an image.

The objects in the dataset are labeled with rectangular box coordinates called [`Bounding boxes`](https://medium.com/analytics-vidhya/basics-of-bounding-boxes-94e583b5e16c).

### COCO
COCO dataset provides large-scale datasets for object detection, segmentation, keypoint detection, and image captioning.

> We will explore the above terminologies in the upcoming sections.

It contains over [80 object categories](https://cocodataset.org/#home) with over 1.5 million object instances for context recognition, object detection, and segmentation.

#### History of COCO
[ImageNet and MS COCO](https://image-net.org/challenges/ilsvrc+mscoco2015) at [ICCV 2015](https://iccv2021.thecvf.com) organized a workshop on the [challenges of object detection](https://cocodataset.org/#detection-2015). 

This was due to Microsoft's standardized dataset structure called [Common Objects in Context (COCO) dataset](https://arxiv.org/pdf/1405.0312.pdf).

The challenge was to improve object detection methods with a focus on speed and accuracy. They provided datasets containing more than `200,000` images with over `80` object categories.

The main objectives were to detect objects using:

- `Bounding box` - Detect objects with coordinates.
- `Object segmentation` - Detect and differentiate the desired object from other objects.

The series of challenges continued each year and focused on different types of problems such as:

- [Object detection in 2015](https://cocodataset.org/#detection-2015) - To detect objects in an image.
- [Captioning in 2015](https://cocodataset.org/#captions-2015) - To understand an image context and output the same textually.
- [Keypoint detection in 2018](https://cocodataset.org/#keypoints-2018) - To detect an object's location and structure using minimal key points.
- [Stuff segmentation in 2019](https://cocodataset.org/#stuff-2019) - To differentiate objects of a certain type such that the object of a similar category contains the same color.
- [Panotopic segmentation in 2019](https://cocodataset.org/#panoptic-2019) - To uniquely differentiate each object with a separate color.
- [Densepose detection in 2020](https://cocodataset.org/#densepose-2020) - To estimate human poses by detecting and segmenting pixels.

To learn more about the COCO format, you can read this [research paper](https://arxiv.org/pdf/1405.0312.pdf).

#### COCO taxonomy
Here is a sample of what the structure of the COCO dataset looks like:

![COCO sample](/engineering-education/understanding-coco-dataset/coco-sample.png)

*Source: [Converted JSON version of Marmot dataset](https://www.icst.pku.edu.cn/cpdp/sjzy/) for table recognition*

> You can find the above sample dataset [here](https://gist.github.com/srishilesh/b3b5028ba9e1f3ec409806e93a407db4).

The object annotations in the above image are represented using the following fields:

##### images
`images` is a list of objects that contains the meta-data information about images. This includes the file location, size of the annotation, and a unique identifier for each annotation.

An object must have the following keys:
- `file_name` - It specifies the name of the file. In this case, it is `10.1.1.1.2006_3.bmp`.
- `height` - It shows the image height such as `1123` pixels.
- `width` - It specifies the image width like `793` pixels.
- `id` - This is a unique identifier that differentiates each image within a list. Here, it is the same as the file name.

We also have a few optional keys such as:
- `license` - It specifies the copyright to use the image.
- `flickr_url` and `coco_url` - They specify the URLs for the online hosted images.
- `date_captured` - It specifies the date when the image was created.

##### categories
`categories` are classes (or labels) of objects that are present in an image.

In the COCO dataset, we have a `supercategory` that stands for the generalized object category. On the other hand, the `name` key only points to a specific object.

For example, we can categorize `bicycle`, `car`, and `truck` under `name`. We can then super categorize them as `vehicles` under `supercategory`.

> The field `supercategory` is optional. It's set as `None` by default.

In our case, we have classes `column` and `row` with each having its unique `id` (we refer to it as `category_id`).

##### annotations
`annotations` contain all meta-data about the labels related to an object. We have keys that specify the location, size, and object category.

Below are the child keys that are under `annotations`:

- `iscrowd` - It specifies if the annotation is for a single object or multiple objects that are close to it. It can be either `0` or `1`.

- `category_id` - This maps the category that an object belongs to.

- `image_id` - This is the mapping with the image that the object is related to. Here, we have only 1 image, so the `image_id` would be `10.1.1.1.2006_3`.

- `id` - This is a unique identifier that identifies each annotation.

- `area` - This is a product of the width and height of the bounding box. It helps us determine the size of the bounding box.

- `bbox` - It's a list of coordinates that determine an object's location. Let's understand this in detail [here](#bbox).

- `segmentation` - This is a flattened list of coordinates that helps us differentiate the object from the background. Let's understand this in detail [here](#segmentation).

##### bbox
These are coordinates that determine an object's location.

These coordinates are represented as `[xmin, ymin, width, height]` where the `(xmin, ymin)` coordinates correspond to the top-left position of an object.

The `width` and `height` are `xmax - xmin` and `ymax - ymin` respectively.

> The format of the bounding box is different in the PASCAL VOC dataset. It is represented as `[xmin, ymin, xmax, ymax]` which are the `top-left` and `bottom-right` coordinates respectively.

In the above dataset, the bounding boxes are `[457, 709, 60, 76]`. This signifies that the `top-left` coordinates are `(457, 709)`, and the image is `60` pixels wide with a height of `76` pixels. Therefore, the `area` would be `4560`.

##### segmentation
This field determines if images contain annotations that are maskable. 

If the objective is to solve the segmentation problem, then we specify the [Run-length encoded (RLE)](https://en.wikipedia.org/wiki/Run-length_encoding) values of the masks.

By default, the `segmentation` value is an empty list. We normally update the key with the value `[xmin, ymin, xmin, ymin + ymax, xmin + xmax, ymin + ymax, xmin + xmax, ymax]`. 

These values represent all the coordinates as shown below:

- `(xmin, ymin)` - Top-left coordinate
- `(xmin, ymin + ymax)` - Top-right coordinate
- `(xmin + xmax, ymin + ymax)` - Bottom-right coordinate
- `(xmin + xmax, ymax)` - Bottom-left coordinate

#### COCO validator
We have now understood how the COCO format is structured and the important parameters that help us detect objects. 

Let's implement a simple dataset validator using Python.

##### Import libraries
We will use the `json` library to work with `JSON` files:

Import them, as shown below:

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
To verify the correctness of any conditional statement, we will be using the `assert()` statement in Python.

In simple words, `assert()` helps debug the code by expecting the correctness of the statement that matches certain criteria. If it does not meet the criteria, it throws a default error.

> You can learn more about `assert()` [here](https://www.geeksforgeeks.org/python-assert-keyword).

##### Validation
> It is highly recommended to keep the sample of the COCO dataset and this tutorial side-by-side.

You can find the sample dataset [here](https://gist.github.com/srishilesh/b3b5028ba9e1f3ec409806e93a407db4).

Let's first implement the `main()` method:

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

In the code above:
- We specify all the mandatory keys as a list in `required_keys`.
- Then, we loop through each required key to check for the presence of values.
- `assertions(key, values, required_keys, unique_key)` method returns a dictionary that contains a mapping between `id` and the `unique_key`. We will explore more about this method in the next code snippet.
- Later, we perform a few other validations for the `annotations` key using `annotation_assertions()`.
- If no error is thrown, we declare the dataset format to be a COCO format.

Now, let's take a step back and look into the `assertions()` method. This reusable method can be used for asserting `images` and `categories` keys.

> Note that we have modularized the code so that the method can be reused to validate different objects based on the arguments that we pass.

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

In the code above:
- We accept the name of the key to validate (`key`), the contents mapped with the key (`values`), the required keys under the parent key (`required_keys`), and an `unique_key` that can map with an `id`.
- We initialize `unique_key_id_mapper` to be an empty dictionary.
- Then, we loop through each `values` item and update the mappings in `unique_key_id_mapper`.
- Also, we check for the presence of the required key under the respective parent key.
- If no error is thrown, we return the mapping, which can later be used to validate the annotations.

Having validated all the meta-data about the images and categories, let's now validate each object annotation.

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

If no error is thrown, we may declare that the dataset is a COCO format.

The above code snippets help us validate and point out errors if we miss any required keys.

### Conclusion
COCO dataset is not only used for object detection and segmentation but also keypoint detection, and captioning. This means that the COCO dataset can help solve numerous problems.

The dataset's representation as a JSON file helps us customize or modify datasets easily while using a standardized format.

To summarize, the reader learned:

- How ML models are trained with object annotations.
- How COCO is structured, as well as its history.
- The different meta-data parameters required for representation.
- Finally, the reader implemented a simple dataset validator to verify and check if the dataset is in COCO format.

You can find the source code [here](https://gist.github.com/srishilesh/6c953ff1d7ee006b412be7674d1542cb).

### Further reading
- [COCO dataset format](https://cocodataset.org/#format-data)
- [COCO research paper](https://paperswithcode.com/dataset/coco)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
---
layout: engineering-education
status: publish
published: true
url: /understanding-pascal-voc-dataset/
title: Understanding PASCAL VOC Dataset
description: This article will introduce the reader to PASCAL VOC dataset. We will also implement a simple dataset validator using Python.
author: srishilesh-p-s
date: 2022-02-08T00:00:00-06:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-pascal-voc-dataset/hero.jpg
    alt: Understanding PASCAL VOC Dataset Hero Image
---
Object detection refers to the ability of computer systems to locate desired types of objects from an image/scene.
<!--more-->
For object detection, the train data is either represented using XML files or JSON files. Each representation has its pros and cons.

In this article, we will be understanding how one such dataset representation helps us with object detection.

We will discuss what the PASCAL VOC format is, the history behind it, and how we use it for object detection.

We will also build a simple dataset format validator using Python to verify if the dataset adheres to the rules of the PASCAL VOC format.

### Table of contents
- [Prerequisites](#pre-requisites)
- [Introduction](#introduction)
- [PASCAL VOC](#pascal-voc)
  - [History](#history-behind-pascal-voc)
  - [Taxonomy](#pascal-voc-taxonomy)
  - [Validator](#pascal-voc-validator)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along, the reader must have the following:
- A good understanding of how to work with machine learning datasets.
- A decent understanding of [object detection](https://en.wikipedia.org/wiki/Object_detection).
- Good knowledge of [Python](https://www.python.org).
- A code editor of your choice.

### Introduction
For a machine learning model to detect objects of an image, it must be trained with a [dataset](https://en.wikipedia.org/wiki/Data_set) that holds all information about the objects present in an image.

The dataset that contains information about all objects present in an image is built using a process called [Annotation](https://www.cloudfactory.com/data-annotation-tool-guide).

In the context of object detection, annotation helps us map an object to its respective label by drawing a rectangular box (called bounding box) over the object.

![An example of annotation](/engineering-education/understanding-pascal-voc-dataset/annotation-example.png)

*Source: An example of annotation by [becominghuman.ai](https://becominghuman.ai/why-data-annotation-is-important-for-machine-learning-2c50520bd2d8)*

As you can see in the above image, we map the objects with their respective labels like a `car`, `person`, `bicycle`, or `traffic light`.

Each object-label mapping is represented with a rectangular box called "[Bounding box](https://medium.com/analytics-vidhya/basics-of-bounding-boxes-94e583b5e16c)". Bounding boxes are a series of coordinates or values that represent the position of an object in an image.

> The representation of bounding boxes might vary according to the dataset.

Let's discuss more about bounding boxes in the upcoming sections.

### PASCAL VOC
This dataset provides standardized images for object detection and segmentation problems.

These datasets are built using tools that follow standardized procedures for the evaluation and comparison of different methods.

In 2008, PASCAL VOC datasets were declared as the benchmark for object detection.

#### History behind PASCAL VOC
[Pattern Analysis, Statistical Modelling, and Computational Learning (PASCAL)](https://www.researchgate.net/publication/280087130_Pattern_Analysis_Statistical_Modelling_and_Computational_Learning_2004-2008) ran a series of [challenges for object detection from 2005 to 2012](http://host.robots.ox.ac.uk/pascal/VOC/) following a standardized file structure for holding these image annotations.

The [PASCAL Visual Object Classes (VOC)](http://host.robots.ox.ac.uk/pascal/VOC/pubs/everingham10.pdf) challenge had two main components:
1. A publicly available dataset with standardized evaluation software.
2. An annual competition and a workshop.

The main objectives of this challenge were to find out the ability of models to perform:
- `Classification` - Check if an object is part of the image.
- `Detection` - Locate the position of the objects present in the image.

This series of challenges came to end in 2012 with major enhancements and improvements to the dataset.

Now, PASCAL VOC provides standardized image datasets for over 20 different classes that are commonly used for tasks like object detection, semantic segmentation, and other classification tasks.

To understand more about PASCAL VOC, it is highly recommended to read [this](http://host.robots.ox.ac.uk/pascal/VOC/pubs/everingham10.pdf) research paper.

#### PASCAL VOC taxonomy
Here is a sample of what the structure of the PASCAL VOC dataset looks like:

![PASCAL VOC sample](/engineering-education/understanding-pascal-voc-dataset/pascal-voc-sample.png)

*Source: [Marmot dataset](https://www.icst.pku.edu.cn/cpdp/sjzy/) for table recognition*

> You can find the above sample dataset [here](https://gist.github.com/srishilesh/e1b180b55576a6747cecc6e389e86a0b).

As you can see in the above image, these object annotations are represented using the following fields:

##### folder
The name of the parent folder that the dataset is present in. This field helps us locate the annotated images within a directory.

Here, as you can see, the image file is present within a folder named `MARMOT_ANNOTATION`.

##### filename
The image filename where the data is annotated on. This field specifies a relative path of the annotated image file.

Here, the file we are working on is `10.1.1.1.2006_3.bmp`.

##### path
The absolute path where the image file is present.

Here, we have all the image files present under the absolute path `MARMOT_ANNOTATION/10.1.1.1.2006_3.bmp`.

##### source
Specifies the original location of the file in a database.

Since we do not use a database, it is set to `Unknown` by default.

##### size
Specifies the `width`, `height`, `depth` of an image.

As you can see the image is `793` pixels wide, `1123` pixels tall, and `3` pixels deep.

> In images, usually, `depth` field represents the RGB color scale i.e. 3.

##### segmented
This field signifies if the images contain annotations that are non-linear (irregular) in shape - commonly referred to as polygons.

By default, the `segmented` value is set as `0` (linear shape).

##### object: name
This field specifies the name of the annotated label. Here, the label is a `column`.

##### object: pose
Specifies the skewness or orientation of the image. By default, it is specified as `Unspecified`, which means that the image is not skewed.

##### object: truncated
Tells if an object is fully or partially visible (can be either 0 or 1 respectively).

##### object: difficult
Tells if an object is difficult to recognize from an image (can be either 0 - easy or 1 - difficult).

##### object: bndbox
These are coordinates that determine the location of the object.

These coordinates are represented as `[xmin, ymin, xmax, ymax]` where they correspond to `(x, y)` coordinates of top-left and bottom-right positions of an object.

Here, the values of bounding boxes are `[458, 710, 517, 785]`.

#### PASCAL VOC validator
Having understood the overall structure of how the PASCAL VOC dataset looks like, let's now dive into implementing a simple dataset validator using Python.

##### Import libraries
We will use 2 libraries for handling XML files:
1. `xmltodict` - to work with XML files as we work with JSON files or dictionaries.
2. `xml.etree` - used for parsing and creating XML data.

Import them as shown below:

```python
import xmltodict
import xml.etree.ElementTree as ET
```

##### Create object
Here, we will be reading the dataset file by parsing it with an XML parser as shown:

```python
dataset_file = r'/sample.xml' # The path to the XML file

xml_tree = ET.parse(dataset_file) # Parse the XML file
root = xml_tree.getroot() # Find the root element
```

##### Assertions
To verify the validity of a PASCAL VOC dataset, we will be using `assert()` assertion statements in Python.

In simple words, `assert()` is used to debug code by testing for certain criteria. If it does not meet the criteria, it throws a default error. Although, we can customize the errors to be raised.

> To learn more about assertions in Python, it is recommended to read [this article](https://www.geeksforgeeks.org/python-assert-keyword).

##### Validation
> It is highly recommended to learn by keeping the sample of the PASCAL VOC dataset open in a new tab or window.

You can find the sample dataset [here](https://gist.github.com/srishilesh/e1b180b55576a6747cecc6e389e86a0b).

```python
assert root.tag == 'annotation' or root.attrib['verified'] == 'yes', "PASCAL VOC does not contain a root element" # Check if the root element is "annotation"
assert len(root.findtext('folder')) > 0, "XML file does not contain a 'folder' element"
assert len(root.findtext('filename')) > 0, "XML file does not contain a 'filename'"
assert len(root.findtext('path')) > 0, "XML file does not contain 'path' element"
assert len(root.find('source')) == 1 and len(root.find('source').findtext('database')) > 0, "XML file does not contain 'source' element with a 'database'"
assert len(root.find('size')) == 3, "XML file doesn not contain 'size' element"
assert root.find('size').find('width').text and root.find('size').find('height').text and root.find('size').find('depth').text, "XML file does not contain either 'width', 'height', or 'depth' element"
assert root.find('segmented').text == '0' or len(root.find('segmented')) > 0, "'segmented' element is neither 0 or a list"
assert len(root.findall('object')) > 0, "XML file contains no 'object' element" # Check if the root contains zero or more 'objects'
```

The code above does the following:
- Checks if the `root` is `annotation`. Having the `verified` attribute to be `yes`, is optional.
- Checks if the dataset contains a `folder`, `filename`, `path`, and `source` by verifying the length to be greater than `0`.
- Checks for the `size` object to contain `width`, `height`, and `depth`.
- Finally, it checks for the `segmented` parameter. It must either contain a value of `0` or an empty list.

> A `segmented` list denotes that the object is not in linear shape. Therefore, the mask values for the polygon (non-linear) shape must be present to identify such objects. You can read more about this [here](https://towardsdatascience.com/generating-image-segmentation-masks-the-easy-way-dd4d3656dbd1).

Having covered all the meta-data about the image, let's move into validating each object.

> Under the `annotation` key, there may be more than one object. Therefore, we loop through all the `object` keys.

```py
required_objects = ['name', 'pose', 'truncated', 'difficult', 'bndbox'] # All possible meta-data about an object

for obj in root.findall('object'):
  assert len(obj.findtext(required_objects[0])) > 0, "Object does not contain a parameter 'name'"
  assert len(obj.findtext(required_objects[1])) > 0, "Object does not contain a parameter 'pose'"
  assert int(obj.findtext(required_objects[2])) in [0, 1], "Object does not contain a parameter 'truncated'"
  assert int(obj.findtext(required_objects[3])) in [0, 1], "Object does not contain a parameter 'difficult'"
  assert len(obj.findall(required_objects[4])) > 0, "Object does not contain a parameter 'bndbox'"
  for bbox in obj.findall(required_objects[4]):
    assert int(bbox.findtext('xmin')) > 0, "'xmin' value for the bounding box is missing "
    assert int(bbox.findtext('ymin')) > 0, "'ymin' value for the bounding box is missing "
    assert int(bbox.findtext('xmax')) > 0, "'xmax' value for the bounding box is missing "
    assert int(bbox.findtext('ymax')) > 0, "'ymax' value for the bounding box is missing "

print('The dataset format is PASCAL VOC!')
```

The above code does the following:
- Declares a list `required_objects` containing all possible meta-data keys that are present within the `object`.
- Loops through each `object` to check for the presence of keys in `required_objects`.
- The possible values for `truncated` and `difficult` are binary. Therefore, we check if the extracted value is either `0` or `1`.

If all the assertions are passed successfully, we may call the dataset to be in PASCAL VOC format.

The above code snippets help us validate and point out errors if we have missed out on any required key.

### Conclusion
PASCAL VOC dataset is used for object detection and segmentation. Its representation as XML files helps us customize datasets easily while using a standardized format for representation.

To summarize, the reader learned:

- How objects are detected by training the annotations.
- What PASCAL VOC is and how it originated.
- The different meta-data parameters required for PASCAL VOC dataset representation.
- Finally, the reader implemented a simple Python validation script to verify the authenticity of the PASCAL VOC dataset.

You can find the source code [here](https://gist.github.com/srishilesh/a2c781a7c6376861844fb7234c5aea11).

### Further reading
- [PASCAL VOC homepage](http://host.robots.ox.ac.uk/pascal/VOC/)
- [PASCAL research paper](https://www.researchgate.net/publication/280087130_Pattern_Analysis_Statistical_Modelling_and_Computational_Learning_2004-2008)
- [Research paper on PASCAL VOC challenge](http://host.robots.ox.ac.uk/pascal/VOC/pubs/everingham10.pdf)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)

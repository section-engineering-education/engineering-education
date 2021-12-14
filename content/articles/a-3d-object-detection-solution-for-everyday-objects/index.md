In this tutorial, we will perform 3D object detection using the mediapipe library and python. We will be drawing a 3D bounding box around an object instead of the common 2D bounding boxes that we are used to.

### Prerequisites
To follow along with this tutorial, you need to:
- Be familiar with machine learning modelling.
- Be familiar with the python programming language.
- Install either Jupyter notebook or Google colab.
> To follow along with this tutorial, please use Jupyter Notebook.

### Table of contents
- [Why 3D detection is important](#why-3d-detection-is-important)
- [What is the Objectron](#what-is-the-objectron)
- [How they obtained real-world 3D training data](#how-they-obtained-real-world-3d-training-data)
- [Detect and track 3D objects using this model](#detect-and-track-3d-objects-using-this-model)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Why 3D detection is important
Over the years, object detection research has solely focused on performing 2D object detections. We've seen this with the likes of RCNN, Fast RCNN, SSD, and Masked RCNN. In the real-world, we have 3D objects. Because of this, it would be better if we had 3D bounding boxes to bound objects detected in the real world, rather than the commonly used 2D detections. 

3D object detection is important as it would enable us capture object’s sizes, orientation, and position in the world. As a result, we would be able to use these 3D detections in real-world applications such as Augmented Reality (AR), self-driving cars, and robotics which perceive the world the same way we do as humans.

Amazingly, Google has come up with a model that can view the world and detect objects in real world in 3-dimension. This model is known as the Objectron.

### What is the Objectron

The Objectron is a real-time 3D object detection solution that is able to detect objects in the real world. The model first detects cropped objects in 2D images. Afterwards, it estimates their poses through a machine learning (ML) model that is trained on the [Objectron dataset](https://github.com/google-research-datasets/Objectron). It is able to create 3D bounding box around an object with `x`, `y`, and `z` coordinates. Currently, it can detect only four objects, a shoe, camera, cup, and a chair.

The model is available of Google's [MediaPipe](https://google.github.io/mediapipe/solutions/objectron), an ML pipeline that contains open-source solutions to solve real-world problems. 

### How they obtained real-world 3D training data
To obtain 3D training data, they had to perform some annotation techniques on 2D data as there is no 3D data available today. Initially, they developed a single-stage objectron model to acquire these data using [mobile augmented reality](https://ai.googleblog.com/2020/03/real-time-3d-object-detection-on-mobile.html) session data. This allowed them to create this kind of datasets. However, this dataset never captured 3D objects from different angle. 

They later released a more robust [objectron model](https://ai.googleblog.com/2020/11/announcing-objectron-dataset.html) with a two-stage architecture. The first stage deployed the commonly used TensorFlow object detection model to estimate the 2D crop of an input image. Once this cropping had been performed, the second stage involved taking these cropped images and estimating their 3D bounding boxes.This was a great upgrade from their initial model which used a single-stage encoder-decoder architecture. It was able to capture a much larger set of common objects in different angles. Additionally, this dataset was collected from a geo-diverse sample consisting of data covering 10 countries across continents.

Please find the GitHub link to the Objectron dataset [here](https://github.com/google-research-datasets/Objectron).

### Detect and track 3D objects using this model

#### Installing and importing dependencies

```bash
!pip install opencv-python mediapipe
```
Next, we need to import them into our notebook.

```python
import cv2
import mediapipe as mp
```
That's done. Let's now set up mediapipe.

#### Setting up mediapipe

```python
mp_drawing = mp.solutions.drawing_utils
mp_objectron = mp.solutions.objectron
```

From mediapipe, we have imported two key solutions that will help us in this tutorial. We've imported the `drawing_utils` to help us draw the 3D bounding boxes (lines and points), and the `objectron` model itself. 
> Remember, mediapipe is a huge library with many models, we need to import the specific model from mediapipe that we want to use.

#### Accessing mobile phone camera

In this tutorial, we will use an input video stream from an android mobile camera.  

```python
cap = cv2.VideoCapture('https://192.168.229.122:8080/video')
video.open(cap)
```
#### Performing the detection and tracking

```python
with mp_objectron.Objectron(static_image_mode=False,
                            max_num_objects=5,
                            min_detection_confidence=0.5,
                            min_tracking_confidence=0.99,
                            model_name='Chair') as objectron:
```

- We set the `static_image_model` to false as we do not want to detect still images, but rather, video frames. If we want to detect static images, we set this value to `True`.
- The `max_num_objects` denotes the maximum number of objects inside a frame. The default value is set to `5`. If you need to increase the maximum number, you can change it here.
- The `min_detection_confidence` ranges between `0.0` and `1.0`. We've set our value to `0.5`. This means that if the score for the detection is below `0.5`, the model won't be confident about the detection and will consider the detection unsuccessful. Similarly, with the `min_tracking_confidence`, we've set the value to `0.99`.
- We've set the model name to detect a `Chair`. As at the time of writing this tutorial, the model only support the 3D bounding boxes of these four objectrons: {'Shoe', 'Chair', 'Cup', 'Camera'}. By default, it's set to detect a shoe. You can change the value to detect any of the four. 

#### Drawing the box landmarks on the image

```python
if results.detected_objects:
        for detected_object in results.detected_objects:
            mp_drawing.draw_landmarks(
              image, detected_object.landmarks_2d, mp_objectron.BOX_CONNECTIONS)
            mp_drawing.draw_axis(image, detected_object.rotation,
                                 detected_object.translation)
```
If `Chair` has been detected in the frame (`results.detected_objects`), draw landmarks on the image in a bounding box (`BOX_CONNECTIONS`) using the `mp_drawing` class. Besides, we know that a 3D dimensional image is in three axis, `x`, `y`, and `z`. We use the `draw_axis` method to draw our axis on the image.

Finally, we need to display these results to the user. We use OpenCV's `imshow()` method to perform this task. 

```python
cv2.imshow('Video', frame))
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()
```
If we're satisfied with the detections and want to stop the video stream, we use OpenCV's `waitKey()` method.

Please find the full code implementation this tutorial [here](https://colab.research.google.com/drive/1BClS6Uu5XaU940cfwo-cuCKmlsXyCGx5?usp=sharing).

### Wrapping up
We're living in very exciting times. Breakthroughs in artificial intelligence can only make our lives better and safer. It's interesting how we thought 2D object detection was cool. With 3D object detections, it's even way better. Let's wait and see what the future will surprise us with. For now, we're excited to be part of it, and to share this amazing knowledge with you.  

### Further reading
- [MediaPipe Objectron](https://google.github.io/mediapipe/solutions/objectron)
- [Objectron: A Large Scale Dataset of Object-Centric Videos in the Wild with Pose Annotations](https://arxiv.org/pdf/2012.09988.pdf)
- [Hero image](https://unsplash.com/@sebastiansvenson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

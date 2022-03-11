Image classification categorizes input images into pre-defined labels or categories. We train the image classification model using the image dataset. The model will learn from the images dataset. Eventually, it will make predictions.

Most image classifications models are for binary classification. Binary classification has two classes/labels such as the `man` and `woman` image classification.

We will focus on multi-class classification. Multiclass text classification is an image classification task that has more than two predefined classes/labels. We have more than two classes but each image can only be classified into one class.

For example, classifying images of birds into pre-defined birds classes. The predefined bird's classes can be `ostrich`, `flamingo`, `hawk`, `chicken`, and `owl`.

In this tutorial, we will build an image-based plant disease classification model using [MobileNet-V2](https://keras.io/api/applications/mobilenet/) and [TensorFlow](https://www.tensorflow.org/). We will perform image pre-processing, image segmentation, feature extraction, and finally classification. 

### Table of contents
- [Prerequisites](#prerequisites)
- [MobilenetV1 vs MobileNetV2](#mobilenetv1-vs-mobilenetv2)
- [Why use MobileNetV2?](#why-use-mobilenetv2)
- [Beans images dataset](#beans-images-dataset)
- [Showing the beans images](#showing-the-beans-images)
- [Image preprocessing](#image-preprocessing)
- [Libraries used](#libraries-used)
- [Pre-trained MobilenetV2](#pre-trained-mobilenetv2)
- [Adding custom layers using TensorFlow](#adding-custom-layers-using-tensorflow)
- [Deep neural network architecture](#deep-neural-network-architecture)
- [Compiling the deep neural network](#compiling-the-deep-neural-network)
- [Fitting the deep neural network](#fitting-the-deep-neural-network)
- [Using the trained deep neural network to make predictions](#using-the-trained-deep-neural-network-to-make-predictions)
- [Using Matplotlib](#using-matplotlib)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should:

- Understand the [convolutional neural network architecture](/engineering-education/basics-of-convolution-neural-networks/) and how it works.
- Know how to build a [neural network](/engineering-education/introduction-to-neural-networks/)
- Understand [deep learning](/engineering-education/building-a-deep-learning-app-using-python/)
- Know how to build a simple [image classification model](/engineering-education/image-classifier-keras/)
- Train the deep neural network in [Google Colab](https://research.google.com/colaboratory/)

### MobilenetV1 vs MobileNetV2
[MobileNet](https://medium.com/analytics-vidhya/image-classification-with-mobilenet-cc6fbb2cd470) uses a convolutional neural network (CNN) architecture model for image classification and computer vision. It was open-sourced by Google. It has two stable versions (MobilenetV1 vs MobileNetV2). 

MobileNet architecture is special because it uses very less computation power to run. This makes it a perfect fit for mobile devices, embedded systems, and computers without GPU. 

[MobilenetV1](https://ai.googleblog.com/2017/06/mobilenets-open-source-models-for.html) is the first version of the Mobilenet models. It has more complex convolution layers and parameters as compared to MobilenetV2.

[MobilenetV2](https://ai.googleblog.com/2018/04/mobilenetv2-next-generation-of-on.html) is the second version of the Mobilenet models. When compared to MobilenetV1, it significantly reduces the number of parameters in the deep neural network. This results in more lightweight deep neural networks. Being lightweight, it is best suited for embedded systems and mobile devices.  

MobilenetV2 is mostly a refinement of MobilenetV1. This makes it even more efficient and powerful. The MobileNetV2 models are much faster in comparison to MobileNetV1 due to the reduced model size and complexity.

MobilenetV2 is a pre-trained model for image classification and computer vision. Pre-trained models are deep neural networks that are trained using a large images dataset. We then apply the pre-trained models to solve specific image classification tasks. We just need to make small adjustments to the pre-trained model and fine-tune it to perform our task.  

Using the pre-trained model, developers don't need to build the whole neural network from scratch. It saves time since we can use the pre-trained model as a starting point. 

Some of the common pre-trained models for image classification and computer vision are [Inceptionv3](https://keras.io/api/applications/inceptionv3/), [ResNet50](https://keras.io/api/applications/resnet/), [VGG-16](https://github.com/1297rohit/VGG16-In-Keras), [EfficientNet](https://keras.io/api/applications/efficientnet/), [AlexNet](https://towardsdatascience.com/alexnet-the-architecture-that-challenged-cnns-e406d5297951), [LeNet](https://towardsdatascience.com/understanding-and-implementing-lenet-5-cnn-architecture-deep-learning-a2d531ebc342) and [MobileNet](https://keras.io/api/applications/mobilenet/). In this tutorial, we will focus on the second version of Mobilenet discussed above.

The image shows the architecture and the number of layers of a pre-trained MobileNetV2 model.

**MobileNetV2 convolutional neural network architecture**

![Convolutional neural network architecture](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/cnn-architecture.png)

*[Image source: Medium](https://miro.medium.com/max/1384/1*7R068tzqqK-1edu4hbAVZQ.png)*

To understand the convolutional neural network architecture and how it works, read this [article](/engineering-education/basics-of-convolution-neural-networks/).

**Number of layers**

![Number of layers](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/number-of-layers.png)

*[Image source: Medium](https://miro.medium.com/max/912/1*TJAjuueT9_pk2Nlv1zmb4A.png)*

### Why use MobileNetV2?
- It saves time building a neural network from scratch.
MobileNetV2 acts as a starting point when building a deep neural network.

- MobileNetV2 is trained using a large images dataset. 
It enables the model to effectively learn, therefore, it will be able to give accurate results.

- It simplifies the process of image preprocessing
Image preprocessing transforms the image dataset into a format that the model can understand. Image preprocessing in Python is usually a complex process that involves different stages.

MobileNetV2 makes the whole process simpler and easier. It ensures we have a clean dataset and images with the correct format. This enables us to achieve the desired and accurate results.

- It helps to avoid model errors that might occur due to human error.

- MobileNetV2 is lightweight making it have high execution speed.

- MobileNetV2 is smaller in size as compared to MobileNetV1.
It makes it best suited for embedded systems and mobile devices

- MobileNetV2 significantly reduces the number of parameters making it less complex.
When compared to MobileNetV1 it is less complex. This makes it better to use and apply in image classification.

- MobilenetV2 can also run on web browsers.
It is best suited for web browsers since is more lightweight as compared to MobilenetV1. Also, browsers have lower computation power, graphic processing, and storage.

- MobileNetV2 models are much faster in comparison to MobileNetV1 due to the reduced model size and complexity.

### Beans images dataset
We will use the beans images dataset to train the model. The dataset contains images of infected and healthy bean leaves. The dataset is collected from farmers taking photos of different infected and healthy bean leaves. The data was annotated by experts from the National Crops Resources Research Institute (NaCRRI) in Uganda and collected by the Makerere AI research lab. To access the GitHub repository for the beans images dataset, [click here](https://github.com/AI-Lab-Makerere/ibean/)

The image below shows a snip of the beans images dataset.

![Dataset snip](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/dataset-snip.png)

The multi-class image classification model will classify each bean image into two disease classes/labels. The model will also classify a bean image into a third class that indicates a healthy leaf. This model will help farmers to quickly identify infected leaves and reduce significant loss. 

We will download the dataset from [`tensorflow_datasets`](https://www.tensorflow.org/datasets). `tensorflow_datasets` is an open-source repository of datasets for object detection, object segmentation, image tasks, video tasks, and natural language processing.

Let's import `tensorflow_datasets`. 

```python
import tensorflow_datasets as tfds
```
We download the beans dataset as follows:

```python
beans_dataset, beans_info = tfds.load(name='beans', with_info=True, as_supervised=True, split=['train','test','validation'])
```
From the code snippet above:
- The `load` function will load the `beans` dataset. 
- `with_info=True` will show the beans dataset information and metadata. 
- `as_supervised=True` specifies the type of machine learning. We are dealing with supervised machine learning because the beans dataset is labeled.
- `split` will split the dataset into three sets. The sets are for model training, testing, and validation.

To check the beans dataset, use this code:

```bash
beans_info
```
The code produces this output:

![Beans dataset](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/beans-info.png)

The beans dataset contain images of bean leaves taken using mobile phones. It has 3 classes. 2 are beans disease classes and one healthy bean leaves. The beans disease classes are `Angular Leaf Spot` and `Bean Rust`.

The beans dataset has 1295 images. After splitting, the test images are 128, train 1034, and validation 133. 

### Showing the beans images
We will display some of the images using the following code:

```python
train, info_train = tfds.load(name='beans', with_info=True, split='test')
tfds.show_examples(info_train,train)
```
The code will display some of the train images as shown below:

![Train images](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/train-images.png)

From this output, `Angular Leaf Spot` leaves are labeled 0, `Bean Rust` 1, and `healthy` 2. 

### Image preprocessing
Image preprocessing will convert the beans image dataset into a format the neural network can use. It involves various stages. Lets create a function that will perform [image scaling](https://en.wikipedia.org/wiki/Image_scaling), [normalization](https://en.wikipedia.org/wiki/Normalization_(image_processing)) and [one hot encoding](https://en.wikipedia.org/wiki/One-hot).

#### Function for image preprocessing
We create this function using this code:

```python
def preprocessing(image, label):
  image /= 255.0

  return tf.image.resize(image,[224,224]), tf.one_hot(label, 3)
```
Image normalization converts the output pixel value between 0 by 1. The `preprocessing` function performs `normalization` by dividing the `image` by 255. The function uses ` tf.image.resize` to resize the image to `224,224`. It is the image size that MobileNetV2 expects.

The function also one hot encodes the classes using `tf.one_hot(label, 3)`. One hot encoding is the process of converting categories/classes in a dataset into integer/numeric values which the model understands. It will convert the classes (`Angular Leaf Spot`, `Bean Rust`, `healthy`), into numerical values (0, 1, 2)

To understand how one hot encoding works, read this [article](https://towardsdatascience.com/categorical-encoding-using-label-encoding-and-one-hot-encoder-911ef77fb5bd)

Let's now import libraries that we will use in image classification.

### Libraries used
Let's import the following:

```python
import tensorflow as tf
import tensorflow_hub as hub
import matplotlib.pylab as plt
import numpy as np
```

- TensorFlow
It is an open-source library for developing machine learning and deep learning models. It trains deep neural networks with input, hidden, and output layers. We will use TensorFlow to add custom layers to the pre-trained MobilenetV2. This will fine-tune the plant disease classification model and improve its performance.

- tensorflow_hub
It is an open-source repository that contains pre-trained models for natural language processing tasks and image classification. We will download the pre-trained MobilenetV2 model from here.

- matplotlib.pylab
We will the library to plot diagrams and visualization of our image dataset. It will show the model prediction results.

- NumPy
It will convert the image dataset into an array.

Let's now download the pre-trained MobilenetV2 model which we will fine-tune later.

### Pre-trained MobilenetV2
We download the pre-trained MobilenetV2 using this code:

```python
mobilenet_v2 = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"
```
As mentioned earlier, pre-trained MobilenetV2 is created based on the [convolutional neural network architecture](/engineering-education/basics-of-convolution-neural-networks/). This means it is made up of many convolution layers, pooling layers
and a fully connected layer. 

To use the pre-trained MobilenetV2 layers, use this code:

```python
mobile_net_layers = hub.KerasLayer(mobilenet_v2, input_shape=(224,224,3))
```
The code above will extract the pre-trained MobilenetV2 layers. It also specifies the size of the beans image we will feed the pre-trained MobilenetV2.

`mobile_net_layers` will extract the unique characteristics and features from the beans images. We will then add our custom layers to the pre-trained MobilenetV2 using TensorFlow. It will produce a fine-tuned model that will classify the images into three classes.

`mobile_net_layers` layers are already trained. We will simply add these layers to our deep neural network without training them. The only layers that we will train are the custom layers we will add on top of the `mobile_net_layers`. 

We add the custom layers to fine-tune the deep neural network so that it can understand and perform our task (plant disease classification). The final deep neural network will be made up of the `mobile_net_layers` and the created custom layers. 

To ensure that TensorFlow does not retrain the `mobile_net_layers`, use this code:

```python
mobile_net_layers.trainable = False
```
Let's now add our custom layers to the mobile_net_layers.

### Adding custom layers using TensorFlow
We will use TensorFlow to build the neural network and add our custom layers. It is done using the following code:

```python
neural_net = tf.keras.Sequential([
  mobile_net_layers,
  tf.keras.layers.Dropout(0.3),
  tf.keras.layers.Dense(3,activation='softmax')
])
])
```
We are creating a Keras Sequential model. The sequential model allows building the deep neural network layer by layer. We will be able to stack multiple hidden layers on top of each other and a final output layer.

From the code above, we have added the following layers to the deep neural network.

- mobile_net_layers
It contains the pre-trained MobilenetV2 layers.

- Dropout
This layer will handle [model overfitting](/engineering-education/dropout-regularization-to-handle-overfitting-in-deep-learning-models/). It ensures the model performs well using both the train and test images. 0.3% of the neurons will be dropped randomly in training to handle overfitting.

- Dense
It is the output layer. The `Dense` layer has 3 neurons because the dataset has three predefined classes. We have also set `softmax` as the activation function because the dataset has three pre-defined classes.

Let's check the deep neural network architecture.

### Deep neural network architecture
we check the model architecture using this code:

```python
neural_net.summary()
```
Model architecture:

![Model architecture](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/model-architecture.png)

From this output, the model is Keras's sequential model. It also shows all the added layers `mobile_net_layers`, `Dropout`, and `Dense`. The output also shows the following:

- Total params: 2,261,827
These are all the parameters in the deep neural network.

- Trainable params: 3,843
It shows the parameters that the deep neural network will train.

Non-trainable params: 2,257,984
- These are the parameters that the MobilenetV2 model has already trained. 

Let's now compile the deep neural network.

### Compiling the deep neural network
We compile the deep neural network using the following code:

```python
neural_net.compile(
  model_optimizer=tf.keras.optimizers.Adam(),
  model_loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True),
  model_metrics=['acc'])
```
We compile the model using the `compile` function. It has the following parameters:

- model_optimizer
It ensures the model performs well and reduces errors that `model_loss` generates in training. We set the `model_optimizer` to `Adam`.

- model_loss
It gets the errors in the model in training. We set the `model_loss` to `CategoricalCrossentropy` because the beans dataset has three pre-defined classes.

- model_metrics
It checks the deep neural network's performance. It also calculates the accuracy score. `acc` will get the accuracy score using the train and the test set.

Let's fit the deep neural network to the `train` and `validation` images.

### Fitting the deep neural network
The `train` set will train the deep neural network so that it can learn and understand plant disease classification. `validation` set will adjust and fine-tune the deep neural network parameters. This will produce an improved model with accurate results.

```python
model_fit = neural_net.fit(train, epochs=6, validation_data=validation)      
```
The deep neural network will use 6 epochs for training. The deep neural network loops through the `train` and `validation` images 6 times. When this code is executed, it will train the deep neural network and show the accuracy scores.

![Deep neural network training](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/neural-network-training.png)

From the training process above, the first accuracy score is 0.6141 (61.41%). The last accuracy score after the 6 epochs is 0.8878. This shows the accuracy score increases with time. 

The validation accuracy score also increases from 0.7368 (73.68%) to 0.8797 (87.97%). Moreover, the model loss reduces from 0.9329 (93.29%) to 0.6898 (68.98). We can see the performance of the model increased with time.

Let's get the test score using the test images.

### Test score
We use the following code:

```python
test_score=model.evaluate(test)
```
Test results:

![Test results](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/test-results.png)

The test score is 0.8750 (87.50). It produces a good score using both the `train` and `test` images. Let's use the trained deep neural network to make predictions.

### Using the trained deep neural network to make predictions
It will classify some of the `test` images into three classes. We select 10 `test` images using the following `for` loop:

```python
for test_sample in beans_dataset[1].take(10):  
  image, label = test_sample[0], test_sample[1]
```
Let's convert the images into an array.

#### Convert the images into an array
Use this code:

```python
img = tf.keras.preprocessing.image.img_to_array(image)
```
Let's now use the `predict` method.

#### `predict` method
It will make the predictions and classify the `test` images into three classes.

```python
make_predictions=model.predict(image)
```
Let's use the imported Matplotlib library to visualize the results of the prediction.

### Using Matplotlib
To print the results, run this code:

```python
print(make_predictions)
plt.figure()
plt.imshow(image)
plt.show()
print(": %s" % info.features["label"].names[label.numpy()])
print(": %s" % info.features["label"].names[np.argmax(make_predictions)])
```
The code snippet above prints the `predicted label` and the `actual label` side by side. The actual label is the real bean image class as labeled in the dataset. The `predicted label` is the deep neural network prediction results.

Some of the printed output:

![Printed output](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/printed-output.png)

From this output, the actual label` and the `predicted label` for both predictions are the same. This shows the deep neural network has made accurate predictions.

**Another Output**

![Another Output](/engineering-education/building-a-multiclass-image-classification-model-using-mobilenet-v2-and-tensorflow/another-prediction.png)

In this output, the deep neural network has also made accurate predictions. 

### Conclusion
We have learned how to build a multi-class image classification model. We developed the model using MobileNetV2 and the TensorFlow library. The tutorial also explains the pre-trained MobileNetV2 architecture and how to install it.

We also performed image preprocessing of the beans images dataset. After downloading the pre-trained MobileNetV2, we added custom layers using TensorFlow. Using the clean images dataset, we trained the deep neural network that classifies images into three classes.

To get the multi-class image classification model we have trained in this tutorial, click [here](https://colab.research.google.com/drive/1OruRUUTp5-MB-rHnxKQRkMvsnwhnMT1B?usp=sharing)

### References
- [Convolution Neural Networks](/engineering-education/basics-of-convolution-neural-networks/)
- [MobileNet architecture](https://medium.com/analytics-vidhya/image-classification-with-mobilenet-cc6fbb2cd470)
- [Image preprocessing in Python](https://www.section.io/engineering-education/image-preprocessing-in-python/)
- [Deep neural networks](/engineering-education/introduction-to-neural-networks/)
- [TensorFlow](https://www.tensorflow.org/)
- [Image Classifier with Keras](/engineering-education/image-classifier-keras/)

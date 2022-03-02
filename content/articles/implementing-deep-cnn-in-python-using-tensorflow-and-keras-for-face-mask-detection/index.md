### Implementing deep CNN in Python using TensorFlow and Keras for face mask detection
### Introduction
Deep CNN is implemented in Python using TensorFlow and Keras libraries. TensorFlow is an open-source platform that JetBrains create for machine learning. It has properties such as flexible libraries, community resources, and an ecosystem of tools. Due to these properties, researchers can develop state-of-the-art machine learning. Keras, a programming interface, is a Python program capable of running on TensorFlow and a machine learning platform. It is for training neural networks. The development of the program was to improve experiment speed.
This tutorial will see how to use TensorFlow(TF) and Keras(K) in Python to implement deep CNN. We also cover its working. We will know where you can get the dataset for your project. Also, we will see how to implement deep CNN in Python to classify images. This example will classify faces into two, i.e. 'withmask' and 'withoutmask'. The objective here is to detect face masks in offline mode.

### Prerequisites
To follow along with this tutorial, you need:
- To be familiar with the [Python](https://www.programiz.com/python-programming/first-program) programming language.
- To have **Python** installed on your computer. You can download it from [here](https://www.python.org/).
- To install [anaconda]( https://www.anaconda.com/products/individual#Downloads)
- To install Spyder Ide. We can execute `pip install spyder` in the terminal to install it.
  
### Proposed scheme for deep CNN

![Proposed scheme](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-one.png)
*Deep CNN scheme*

Above is the generalized scheme of the dee CNN. Here, the input image is first convolved on various filters, and the output goes to Rectified Linear Unit(ReLu). It is where the negative values are omitted. Next, the positive output values are passed through max-pooling to obtain the maximum value. This process is repeated for a similar layer combination. This process is known as feature detection.
The fully connected layer is the layer used for classification. In the end, we have the softmax layer to get the confidence category-wise as the output.

### How to implement deep CNN in Python
Deep CNN is implemented in Python TensorFlow and Keras libraries. Tensorflow can run on CPU, GPU, and TPU systems.
Keras provide the necessary libraries for developing machine learning. Also, it helps engineers to take advantage of the scaling ability of TensorFlow.
For Python code development, `spyder IDE` is used under anaconda package manager. TensorFlow does not come with an anaconda. It means we have to install it. To install TensorFlow(TF 2.3), open the anaconda prompt and execute the command below:
```Python
pip install tensorflow==2.3
```
Follow the instructions and wait for the installation to complete. This command also downloads all the dependencies. This version of TensorFlow works on `python 3.8`.

### Image dataset
The image dataset we are using here is available in [kaggle](https://www.kaggle.com/ashishjangra27/face-mask-12k-images-dataset).

![User interface](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-two.png)
*Kaggle website interface*

We download the dataset, but we only use the train folder. Then, we move this train folder to the current directory for use.
Train folder includes two sub-folders, `withmask` and `withoutmask`. These images are coloured images of the .png format. Also, they are of different sizes. The total images are 10,000. Therefore, each folder has 5,000 images.

### Python code for deep CNN
We first import some libraries and packages as shown below:
```Python
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import pathlib
from tensorflow import keras
import tensorflow.keras import layers
from tensorflow.keras.models import Sequential
import tkinter as tk
from tkinter import filedialog
```
`Matplotlib.pyplot` is a library that enables plotting. It means it contains the `plot()` function. The `numpy` package is for numerical computations. `Tensorflow` and `keras` are used to implement the deep CNN. `Tkinter` and `filedialog` are used to open the system dialogue. It enables you to select a single image from different folders for testing.
We need to define our database. This is done by definning its directory as shown below:
```python
data_dir = "/Documents/MATLAB/MATLAB/Articles/database/Train"
data_dir = pathlib.Path(data_dir)
```
With the help of the `path()` function, which is a property of `pathlib`, we read the data directory.
Since our dataset contains images of different sizes, we resize them to a uniform size. To do this, we specify the image height and width. For our case, we use a size of 64x64 pixels:
```Python
batch_size = 16
img_height = 64
img_width = 64
```
Now, we read the images in the database and resize them. Also, we split the images into two ie `training` and `validation`.
```python
# Reading Training images from the directory
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir, validation_split = 0.2, subset = "training", seed = 123,
    image_size = (img_height, img_width), batch_size = batch_size)
```
We are reading the `image_dataset_from_directory()` function. This function is a property of `keras`. The `validation_split` is used to show the splitting ratio. It means the image dataset is split into two. The ratio for training is 0.8, and that of testing and validation is 0.2. If you perform this calculation, a total of 8000 images is used for training, and the other 2000 is for testing validation.
All the images will be under `training`, and the `seed` is `123`. Seed is the reshuffling format. It is because the images are picked randomly. The image size remains to be the resized dimensions.
In this similar way, we read the validation images from the directory using the `image_dataset_from_directory()` function. All the images will be under the name validation. It is done using the code below:
```python
# Reading validation images from the directory
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    data_dir, validation_split = 0.2, subset = "validation", seed = 123,
    image_size = (img_height, img_width), batch_size = batch_size)
```
Define the classes since there are two folders, `withmask` and `withoutmask`. The commands above find the label for the folder names. The command below prints the folder names as class_labels.
```python
class_names = train_ds.class_names
print(class_names)
```
This is the automatic way of finding the name of the labels.
Let us add a code for memory optimization and speed up execution.
```python
#Memory optimization and speed up execution
AUTOTUNE = tf.data.experimental.AUTOTUNE
train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size = AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size = AUTOTUNE)
```
It is done because the dataset is extensive. Here, we are using two function i.e `cache()` and `prefetch()`. `Cache()` keeps the image in the RAM after reading from the disk. That helps for speedy execution. The `prefetch()` helps systems execute the model and fetches data from the library. It means it helps for the parallel execution.
Define the number of classes which is two, i.e. `withmask` and `withoutmask`.
```python
num_class = 2
```
Now, let us define the CNN and the number of epochs.
```python
#Definning CNN
model = Sequential([
    layers.experimental.preprocessing.Rescaling(1./255, input_shape = (img_height, img_width, 3)),
    layers.Conv2D(16, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Dropout(0.2),
    layers.Flatten(),
    layers.Dense(64, activation = 'relu'),
    layers.Dense(num_class)
])

noepochs = 7
```
Here, we define our CNN model, which is `sequential`. In this case, we use the `sequential()` function. This function rescales the image and defines the CNN layers. The images are rescaled in the range 0-1. It is because our datasets are RGB images. RGB images have a pixel value of the range 0-255. It is not settable for the deep CNN model. It is the reason for rescaling. Rescaling is done by dividing all the pixel values by 255.
The convolution layer defined is `conv2D`. It has 16 filters of the size 3x3, the `padding` used is `same`, and the `activation` is `relu`. The next layer we have defined is `maxPooling`. This layer only considers the maximum values and ignore others. Finally, we continue defining `conv2D` but with more filters.
To avoid overfitting, we use the `dropout()` function. We lastly define the fully connected layer(`layer.Dense`) and the number of epochs. The higher the number of epochs, the better the results.
Define the training parameters.
```python
model.compile(optimizer = 'adam', loss = tf.keras.SparseCategoricalCrossentropy(from_logits = True),
                  metrics = ['accuracy'])
mymodel = model.fit(train_ds, validation_data = val_ds, epochs = noepochs) #training the model
```
The training parameters that we define are the optimizer that our model should use. The `fit()` function, which is the model property, trains our model. The function takes the training dataset `train_ds`, `validation data ` and the `number of epochs` as the arguments.
After the training, we should obtain some data such as model accuracy, validation accuracy, training loss, and validation loss using the code below:
```python 
acc = mymodel.history['accuracy']
val_acc = mymodel.history['val_accuracy']
loss = mymodel.history['loss']
val_loss = mymodel.history['val_loss']
epochs_range = range(noepochs)
```
These values are used to plot the accuracy and loss curves. This gives idea for the training procedures.
Let us plot these values for visualization.
```python
plt.figure(figsize=(15, 15)) #creates figure for the plot
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label = 'Training Accuracy')
plt.plot(epochs_range, val_acc, label = 'Validation Accuracy')
plt.legend(loc = 'lower right')
plt.title('Training and validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label = 'Training loss')
plt.plot(epochs_range, val_loss, label = 'Validation loss')
plt.legend(loc = 'Upper right')
plt.title('Training and validation loss')
plt.show()
```
The first plot is for the training accuracy, and the second plot is for training losses. Therefore, if we run this training process, we get the training process and plots as shown below:

![Training process](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-three.png)
*Training process*

![Plots of the training](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-four.png)
*Plots for the output*

The last step is creating a function for testing single images. The function is:
```python
# Function to test single image
def recogout():
    root = tk.Tk()
    root.withdraw()
    img_path = filedialog.askopenfilename()
    img = keras.preprocessing.image.load_img(img_path, target_size = (img_height, img_width))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    
    print("This image most likely belongs to {} with a {:.2f} percent confidence."
          .format(class_names[np.argmax(score)], 100*np.max(score)))
```
The `tkinter` library `tk.Tk` and `root.withdraw()` opens a dialog. It allows you to select your input images from any folder. The path of this file is read using `filedialog()`. The image is then loaded with a predefined dimension, i.e., the image is resized using the `load_image()` function.
The image is further preprocessed using the Keras property `keras` to make it compatible. We then use the `predict()` function and the final image as the arguments to get the predictions. Finally, the softmax layer is applied to this prediction using the `softmax()` function and the confidence score stored in the score variable.
We then print the output using the `print()` function. It helps to tell whether the input image belongs to the first or second category.
Let us execute our function to see how it works.
We execute the `recogout()` function in the syder terminal for testing single images. First, open the spyder terminal and run `recogout()` in the command window. The system dialogue opens up when you run this command and select your input image. After the selection, the class and the confidence score is displayed in the terminal as shown below:

![Image selected](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-five.png)
*Image selected*

![Output](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-six.png)
*Prediction and the confidence score*

Let us now try by giving an image without a mask as the input for the test.

![Image selected](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-seven.png)
*Image selected*

![output](/engineering-education/implementing-deep-cnn-in-python-using-tensorflow-and-keras-for-face-mask-detection/deep-eight.png)
*Prediction and the confidence score*

### Conclusion
Implementation of CNN in Python is done by using TensorFlow and Keras. These are packages that contain all the functions for deep learning. While using CNN, you have to keep a soundtrack of all the process that is going on. It helps improve the output. Also, preprocessing of the dataset is required. It is for compatibility and taking control of the memory.

Happy coding!

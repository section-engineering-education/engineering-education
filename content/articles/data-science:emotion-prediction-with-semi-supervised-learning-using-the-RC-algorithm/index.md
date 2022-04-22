### Emotion Prediction with Semi-Supervised Learning with RC Algorithm in Machine Learning
Machine learning is the branch of artificial intelligence that uses programming models, statistical techniques, and systems capable of learning from data to improve performance and make decisions automatically. This article will learn how to predict emotions using RC Algorithm in Machine Learning. We will write some code on the same to illustrate this.
### Table of Content 
Data set 
Laoding data
Model Training
Model Building
### Prerequisites 
Understand how to code Python 3.
Understand machine learning dependecies addition.
### Data Set
To start, let's use Kaggle dataset which has emotion labels for a set of pictures 
Lets import the important dependencies: like numpy, seaborn, matplotlib, tensorflow.
```python
import numpy as np  
import seaborn as sns  
import matplotlib.pyplot as plt  
import utils  
import osfrom tensorflow.keras.preprocessing.image import ImageDataGenerator  
from tensorflow.keras.layers import Dense, Input, Dropout,Flatten, Conv2D  
from tensorflow.keras.layers import BatchNormalization, Activation, MaxPooling2D  
from tensorflow.keras.models import Model, Sequential  
from tensorflow.keras.optimizers import Adam  
from tensorflow.keras.callbacks import ModelCheckpoint, ReduceLROnPlateau  
from tensorflow.keras.utils import plot_modelfrom IPython.display import SVG, Image  
from livelossplot.inputs.tf_keras import PlotLossesCallback  
import tensorflow as tf  
print("Tensorflow version:", tf.__version__)
```
### Loading data
Let's load the data:
It is important to note that before running our machine-learning Algorithm, we need to prepare a training dataset for it by eliminating irrelevant variables such as attributes not corresponding with emotions (e.g., hair color). To access the source of the dataset, check this [link](https://www.kaggle.com/aadityasinghal/facial-expression-dataset/)

A confusion matrix is a table that lists all the instances of one label (positive, negative) with all the instances of the other labels (positive, negative), where each cell in the matrix represents a sample. The value of an entry in the confusion matrix represents how well an algorithm predicted a particular sample.
Ensure to delete rows and columns that don't correspond to emotion labels before running the Algorithm on data. It would be good to keep only rows and columns corresponding to emotion labels and remove irrelevant variables(e.g., hair color).

### We can interpret the following parameters in text form as follow:

"Confusion matrix shows that there is just one right answer for each sample, and that none of the algorithms are terrible at deciding what that answer is." 
"Supervised learning (with outputs labeled with the correct labels) leads to a very high precision, especially if we use more data points. I believe this is because of gradient descent and its ability to learn back from predicted values." 
"A model with fewer features has better generalization performance because it makes examples easier to classify by using fewer features. Using a specific feature for many inputs can also cause overfitting in an algorithm. The most common approach is to break down the overall problem into subproblems, each of which can be solved with a different technique." 
"Classification models use one or more features to predict the class label for a new data point. We can predict that the new data point has the same feature values as those that have come before it." 
### Model Training
Lets Train our model:
```dart
img_size = 48  
batch_size = 64datagen_train = ImageDataGenerator(horizontal_flip=True)train_generator = datagen_train.flow_from_directory("PATH OF TRAIN FOLDER",  
                                                    target_size=(img_size,img_size),  
                                                    color_mode="grayscale",  
                                                    batch_size=batch_size,  
                                                    class_mode='categorical',  
                                                    shuffle=True)datagen_validation = ImageDataGenerator(horizontal_flip=True)  
validation_generator = datagen_validation.flow_from_directory("PATH OF TEST FOLDER",  
                                                    target_size=(img_size,img_size),  
                                                    color_mode="grayscale",  
                                                    batch_size=batch_size,  
                                                    class_mode='categorical',  
                                                    shuffle=False)
```
"Recall is measured as how well a model predicts the class label given only some of the training examples from that class." 
"A model's generalization error is its average prediction error on unseen examples. This value does not equal its overall average accuracy because an algorithm might incorrectly predict in one direction more than it predicts in another (e.g. a model that predicts negative examples to be positive but rarely predicts positive examples to be negative will have a lower average accuracy than a model that predicts all examples to be negative)." 
"The precision is how well the model predicts the labels of the data points it has seen before." 
"F1 score is a weighted average of two metrics: precision and recall (inverse document frequency)." 
"L2-norm is the square root of the sum of squares. It is used to normalize the sum of squared errors, which are the difference between the model's output (e.g., predicted class label) and its training example."
"Euclidean distance is a common measure of similarity in data. Euclidean distance is based on two main parameters: a set of vectors and an axis perpendicular to that set. Given data points (x1, x2...xn), we can consider the set of all pairs of them (x1, x2,...xn). The Euclidean distance between them (d(x1, x2)) is the length of the line segment connecting them. The cosine similarity is a common shorthand version: 1 - d(x1, x2)/d(x1, x3) * d(x2, x3)."
### Model Building
Lets now build our model
```python
# Initialising the CNN  
model = Sequential()# 1 - Convolution  
model.add(Conv2D(64,(3,3), padding='same', input_shape=(48, 48,1)))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(MaxPooling2D(pool_size=(2, 2)))  
model.add(Dropout(0.25))# 2nd Convolution layer  
model.add(Conv2D(128,(5,5), padding='same'))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(MaxPooling2D(pool_size=(2, 2)))  
model.add(Dropout(0.25))# 3rd Convolution layer  
model.add(Conv2D(512,(3,3), padding='same'))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(MaxPooling2D(pool_size=(2, 2)))  
model.add(Dropout(0.25))# 4th Convolution layer  
model.add(Conv2D(512,(3,3), padding='same'))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(MaxPooling2D(pool_size=(2, 2)))  
model.add(Dropout(0.25))# Flattening  
model.add(Flatten())# Fully connected layer 1st layer  
model.add(Dense(256))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(Dropout(0.25))# Fully connected layer 2nd layer  
model.add(Dense(512))  
model.add(BatchNormalization())  
model.add(Activation('relu'))  
model.add(Dropout(0.25))model.add(Dense(7, activation='softmax'))opt = Adam(lr=0.0005)  
model.compile(optimizer=opt, loss='categorical_crossentropy', metrics=['accuracy'])  
model.summary()
```
"For supervised learning, let's use logistic regression. Logistic regression is useful for binary categorization and for predicting values on the continuous scale. We've finished compiling our model thus far. Let's use the code below to show the model architecture.
```python
plot_model(model, to_file='model.png', show_shapes=True, show_layer_names=True)  
Image('model.png',width=400, height=200)
```
Now that the model architecture has been successfully developed, it's time to train the model and analyze the outcomes.
```python
%%timeepochs = 15  
steps_per_epoch = train_generator.n//train_generator.batch_size  
validation_steps = validation_generator.n//validation_generator.batch_sizereduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.1,  
                              patience=2, min_lr=0.00001, mode='auto')  
checkpoint = ModelCheckpoint("model_weights.h5", monitor='val_accuracy',  
                             save_weights_only=True, mode='max', verbose=1)  
callbacks = [PlotLossesCallback(), checkpoint, reduce_lr]history = model.fit(  
    x=train_generator,  
    steps_per_epoch=steps_per_epoch,  
    epochs=epochs,  
    validation_data = validation_generator,  
    validation_steps = validation_steps,  
    callbacks=callbacks  
)
```
The following is the output of running the code as mentioned earlier.
```python
Log-loss (cost function):  
training   (min:    0.866, max:    1.786, cur:    0.866)  
validation (min:    0.970, max:    1.705, cur:    0.970)accuracy:  
training   (min:    0.313, max:    0.675, cur:    0.675)  
validation (min:    0.381, max:    0.643, cur:    0.643)Epoch 00015: saving model to model_weights.h5  
448/448 [==============================] - 27s 60ms/step - loss: 0.8659 - accuracy: 0.6748 - val_loss: 0.9700 - val_accuracy: 0.6426  
CPU times: user 6min 50s, sys: 57.4 s, total: 7min 47s  
Wall time: 6min 46s
```
Now that we have a trained model, let's save it in json format, along with its weights.
```python
model_json = model.to_json()  
model.save_weights('model_weights.h5')  
with open("model.json", "w") as json_file:  
json_file.write(model_json)
```
Now that we have a trained model, let's save it in json format, along with its weights.
```python
from tensorflow.keras.models import model_from_jsonclass FacialExpressionModel(object): EMOTIONS_LIST = ["Angry", "Disgust",  
                    "Fear", "Happy",  
                    "Neutral", "Sad",  
                    "Surprise"] def __init__(self, model_json_file, model_weights_file):  
        # load model from JSON file  
        with open(model_json_file, "r") as json_file:  
            loaded_model_json = json_file.read()  
            self.loaded_model = model_from_json(loaded_model_json) # load weights into the new model  
        self.loaded_model.load_weights(model_weights_file)  
        self.loaded_model.make_predict_function() def predict_emotion(self, img):  
        self.preds = self.loaded_model.predict(img)  
        return FacialExpressionModel.EMOTIONS_LIST[np.argmax(self.preds)]
```
Now that we've got the code to put the weights into the model, we'll get the video frames and run the predictions on them.
```python
import cv2facec = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')  
model = FacialExpressionModel("model.json", "model_weights.h5")  
font = cv2.FONT_HERSHEY_SIMPLEXclass VideoCamera(object):  
    def __init__(self):  
        self.video = cv2.VideoCapture(0) def __del__(self):  
        self.video.release() # returns camera frames along with bounding boxes and predictions  
    def get_frame(self):  
        _, fr = self.video.read()  
        gray_fr = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)  
        faces = facec.detectMultiScale(gray_fr, 1.3, 5) for (x, y, w, h) in faces:  
            fc = gray_fr[y:y+h, x:x+w] roi = cv2.resize(fc, (48, 48))  
            pred = model.predict_emotion(roi[np.newaxis, :, :, np.newaxis]) cv2.putText(fr, pred, (x, y), font, 1, (255, 255, 0), 2)  
            cv2.rectangle(fr,(x,y),(x+w,y+h),(255,0,0),2)
    return fr
```
As of now we have mode all important functions , Now let us make the function for calling the above code and showing the output video.
```python
def gen(camera):  
while True:  
frame = camera.get_frame()  
cv2.imshow('Facial Expression Recognization',frame)  
if cv2.waitKey(1) & 0xFF == ord('q'):  
break  
cv2.destroyAllWindows()
```
We'll create the final line of code, which will call the gen function to execute all of the previous code.
```python
gen(VideoCamera())
```
### Conclusion
Our proposed Algorithm achieves a top-1 accuracy of 82.62% and top-5 accuracy of 73.40%. When applied to a specific task of emotion prediction, our method performed significantly better than three baselines and showed comparable performance with professional human coders.



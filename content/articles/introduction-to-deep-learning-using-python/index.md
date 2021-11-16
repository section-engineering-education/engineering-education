### Introduction-to-Deep-Learning-with-Python

Deep learning is a part of Artificial intelligence that deals with neural networks to give an output. For one to achieve high-level features from data must use Deep learning. It copies the way we gain certain types of knowledge which then gives an output.

This article will get you started in the field of Deep Learning. You will be directed through every single step of Deep learning. What you thought was hard will be the simplest thing you have ever tried to understand. This is your first step into the journey of Deep learning.   

### You will be able to know the following by the end of this article;

a) What is deep learning and why python for deep learning?
b) How deep learning works?
c) Application Areas of deep learning.
d) The need for deep learning today.
e) Installation and tools to get you started with deep learning.



### What is Deep learning?

Deep learning is a part of Artificial intelligence. It deals with neural networks to give an output. In our definition, the below questions arise. 
 These questions are;
    1. What is machine learning?
    2. What is artificial intelligence?
    3. What is an artificial neural network?

Machine Learning is a part of artificial intelligence. It deals with making machines act intelligently through programs.
  For example, when playing a play station game. The machine that one is using uses algorithms to tell the next move, if you always play the same way each time you play. In this, we say that the computer has learned, but through its intelligence.

 Artificial intelligence is the ability of a machine to think intelligently.

    Branches of AI.(Artificial Intelligence)
                       
    1. Robotics.
    2. Expert systems.               
    3. Machine learning.
    4. Natural language processing
    5. Deep learning.
    4. Fuzzy logic

   Example of AI:

   A. Netflix recommendations
   B. Siri

### Why python for deep learning.

  1.Python is a high-level language that uses an English-like language. This makes it easy for any new programmer to familiarize with the language.
 2. Every day Python gets new users. Thus the language has a high growth rate among individuals and companies.
 3. Python has a great library ecosystem. It contains a lot of tools that will enable you to perform different functions in the language. For example, Keras used for deep learning.

### How deep learning works

We have already understood what deep learning is. We need now to take the next step of understanding how it works.

Deep learning uses many layers to extract a complete output. 
Imagine that you are a teacher in a middle-aged class. You then tell your class to write the numeric number 9. Every pupil will write this number differently. You as a teacher, you will be able to understand the number no matter how it looks. This is because your brain has been able to process and know different ways that the number 9 can appear. 

Deep learning acts also in this way. For the machine to be able to know a number, object, or alphabet no matter how it appears. Thus deep learning allows one to train or teach an AI machine. One teaches it to predict an output given a set of the same input represented differently. This to be possible deep learning uses neural network layers.

     Types of layers in deep learning

 1. Input layer.
 2. Hidden layer.
 3. Output layer.

 ![Neural Network](/engineering-education/content/articles/NeuralNework.jpg)
The input layer.- The machine takes in the same data represented in different ways. This includes all possible representations of a certain kind of data.

The hidden layer.- The computer performs a mathematical computation on the inputs. This is where deep learning occurs. Deep learning refers to having more than one hidden layer.

The output layer.- returns the results after it goes through the hidden layer.

The connection between neurons varies in weight. The weight dictates the importance of the input values. The neural network is a big and interesting topic. Do more research for better understanding. Below is a recommendation. [Neural Network and Deep Learning](https://www.amazon.com/Neural-Networks-Deep-Learning-Textbook-ebook/dp/B07FKF5HY7)  

Generally, that is how deep learning works. Read more on Convolution Neural networks and Recurrent Neural Networks.

### software and tools to get you started with deep learning using Python.  

This is the beginning of using Python in deep learning. After the installation, you will be able to develop deep learning projects in Python.
Keras is the software that provides a python interface for artificial neural networks. Keras makes the implementation of deep learning in Python easier. It represents the interface of the TensorFlow library.
So for you to use Keras it is also very important for you to install TensorFlow.
Depending on the IDE that you are using, Keras and TensorFlow will be available. You will be able to develop a deep learning project.

### Example of a deep learning code

After you have installed Tensorflow and keras, the below code should be able to run.Always make sure that your extensions are always updated. This will help you to always use the latest version.
Below is an example of code in deep learning. It is the same example given above on how deep learning works. We will be using a dataset that already exists called mnist. The dataset contains numbers from 0 to 9. These numbers have been handwritten by different people.

     ```python
  mnist=tf.keras.datasets.mnist
 (x_train, y_train),(x_test, y_test)=mnist.load_data()

 x_train=tf.keras.utils.normalize(x_train,axis=1)
 x_train=tf.keras.utils.normalize(x_train,axis=1)

 model=tf.keras.models.sequential()
 model.add(tf.keras.layers.flatten())
 model.add(tf.keras.layers.dense(128,activation=tf.nn.relu))
 model.add(tf.keras.layers.dense(128,activation=tf.nn.relu))
 model.add(tf.keras.layers.dense(10,activation=tf.nn.softmax))

 model.compile(optimizer='adam',
                    loss= "sparse_categorical_crossentropy'
                    matrics=[accuracy])

 model.fit (x_train,y_train,epochs=3) 

 val_loss, val_acc=model.evaliate(x_test.y_test)
print(val_loss,val_acc)

````
### Explanation of the code.

In line 1 mnist provides you with data that consist of numbers. The numbers are handwritten from 0 to 9. This is an existing dataset.

Line 2 containing train and test properties, unpacks the dataset. The dataset is broken down into more manageable segments.

In lines 3,4,5 helps in the normalization of the data. The data is given a certain number of scale that has been entered in the input layer.

Line 6,7,8 give us the architecture of our model. Line 6 is a feed-forward model that takes the inputs as it is. Line 7 is used to flatten connected layers.
Line 8 and 9 give the maximum number of datasets used with the help of .relu. Line 10 gives the number of output variables that will be displayed. That is from 0 to 9 which contains 10 digits.

Line 11 and 12 helps one to set parameters for the training of the model. Line 11 helps you to know the degree of an error made. Line 12 contains a set of inbuilt functions.  This you will be able to understand in the future.
It helps you to know the accuracy of the data.

The second last step is to train your model. This is done by passing the variable you would like to train.

In the last step, you need to calculate the validation loss. This is the loss made may the program. Line 13 helps you to evaluate the loss and the accuracy of your output. The last line lets you know how accurate your model is.

### Application of deep learning

Having understood how deep learning works. It is better to know the application areas for deep learning.

1. Automate driving. - The car uses cameras and sensors to be able to identify obstacles on the roads. We input the same data of different representations into the system. This enables the system to be ready for any kind of representation of obstacles on the road.
2.  Aerospace and defense. - Deep learning helps to identify objects from the satellites. It locates areas of interest to the government.
3. It is also used in medical research to identify cancer cells. Deep learning combines data to show a better output when it identifies cancer cells.
4.  Electronics. - Deep learning in electronics help sensors, speech recognition. Many companies are migrating to smart devices or electronics that need deep learning.

### The need for deep learning today

 In this generation, technology has improved due to emerging trends in Artificial Intelligence. This has brought about a high increase in deep learning resources and development. This tells us that deep learning is very important to use and learn today. Deep learning helps us in:
                      1. Use of unstructured data.
                      2. Generating high output and accuracy in every situation.
                      3. Delivering high-quality and trustworthy results.
                      4. Helping companies and institutions to be able to cut costs.


### Conclusion

Deep learning is very interesting. With Python, you might have a few challenges before you get started. I hope that this article has made it easier for you to get started with deep learning. You will need to do more research on the subject until you get familiar with these tools. At the right time and with the right attitude and effort, you will be a pro in deep learning.


---
layout: engineering-education
status: publish
published: true
url: //
title: 
description: 
author: 
date: 2022-03-18T00:00:00-02:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education//hero.jpg
  alt: Hero Image
---
A form builder provides an abstraction layer over Form operations in our applications. Just like the Room database, the library intends to provide a simple way of working with form fields and their data.
<!--more-->






As android developers interested in Machine Learning technologies, we may want to build a raw model. Building a custom raw model helps you get a better understanding of the model. Furthermore, it allows you to put everything almost under control. This piece mainly focuses on C++ because it’s faster than JVM-based languages. If you are familiar with Android build tools, then you know we are going to use the Native Development Kit(NDK).

### Prerequisites
- This tutorial assumes you are familiar with Machine learning concepts, Android development, Kotlin, and C++. Also, the general Object Oriented Programming(OOP) knowledge is a plus.

- It also requires you to have Android development IDEs installed on your machine.

- Familiarity with the NDK basics is also required. If you don't meet this requirement, check out [this blog](https://blog.mindorks.com/getting-started-with-android-ndk-android-tutorial).

### Overview
We are going to build on [this article](https://www.section.io/engineering-education/cpp-model-in-a-python-machine-learning-project/) and learn how to create a native machine learning model using the NDK. 

The linked article talks about using a C++ model in a Python project. We will use the same model but with a few modifications.

We will first download a dataset using Kotlin. Next, we will load the dataset using C++ and pass it to the model. 

So instead of using a simple 2D array, we will use data from a CSV file. 

We will finally make a prediction from the model. The code for this tutorial is found in [this GitHub repository](https://github.com/Agusioma/ndk-ml-model-training-demo).

### Downloading the dataset
We will use a download helper library called *PRDownloader*. This library is preferred due to its simplicity. 

We add the *PRDownloader* library using the code below:

```kotlin
implementation 'com.mindorks.android:prdownloader:0.6.0'
```

Ensure that you perform a *Gradle sync* after adding thge library.

Don't forget to add the required permissions in the manifest file.

```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

After the build process is done, in the *onCreate* method of the *MainActivity.kt* file, we set the read and connection timeouts using these lines and initialize the download helper:

```kotlin
        // Initializing the download helper with with appropriate timeouts
        val presets = PRDownloaderConfig.newBuilder()
            .setReadTimeout(30000)
            .setConnectTimeout(30000)
            .build()
        PRDownloader.initialize(applicationContext, presets)
```

We will also create the variables for the *download UR*L and the *filename*, as shown below:

```kotlin
        val url =
            "https://terrence-aluda.com/dataset/heart.csv"
        val fileName = "heart.csv"
```

After the initialization, we proceed to create a method containing the code for the download. Choose any name for the method. I called mine `download()`.

```kotlin
    private fun download(url: String, fileName: String) {
        PRDownloader.download(
            url,
            filesDir.absolutePath,/*the path*/
            fileName /*the name*/
        )
            .build()
            .start(object : OnDownloadListener {
                override fun onDownloadComplete() {
                    Toast.makeText(baseContext, "done", Toast.LENGTH_SHORT)
                        .show()
                }

                override fun onError(error: com.downloader.Error?) {
                    Toast.makeText(baseContext, "Failed to download the file", Toast.LENGTH_SHORT)
                        .show()
                }
            })
    }
```

- We pass in the URL and the filename. This will be passed to the download method of a class called `DownloadRequestBuilder`​. In addition to the two parameters, we also pass the directory for storing the file. Again, choose any directory. Here, I chose the app’s file directory.

- After building the request, we start the download using the `start()` method. In this method, we override two methods `onDownloadComplete()` and `onError()`. In these two methods, we can write the actions we want to be performed when the download is completed or when an error occurs. We override the methods from the `DownloadListener` interface. Find more about using [PRdownloader](https://www.geeksforgeeks.org/how-to-use-prdownloader-library-in-android-app/) here. 

You can fire the `download()` method using a click of a button or any other event. Here, it’s called in the `onCreate` method. Therefore, don't forget to uncomment this line when you want to download the CSV.

```kotlin
// download(url, fileName)
```

We will pass the download location to our C++ model using the `testPrediction(path)` method. C++ will load the file from this path and use it to fit the model. The full code is found [here](https://github.com/Agusioma/ndk-ml-model-training-demo/blob/main/app/src/main/java/com/terrence/heartndk/MainActivity.kt).

### The C++ model
> We have to hardcode the array sizes beforehand. JNI doesn’t allow us to pass the sizes from the methods as it is done in the linked tutorial. Therefore, for portability and scalability, consider using data structures such as vectors.

We will get rid of the two arrays in the `updateWeightsAndBias()` since we are using a real dataset. The method signature of the `updateWeightsAndBias()` will also change since we will only pass in the file path. The full code is found [here](https://github.com/Agusioma/ndk-ml-model-training-demo/blob/main/app/src/main/cpp/native-lib.cpp). Worry less about the modifications.

The CSV file will be loaded using these lines:

```C++
  vector<vector<string>> X_train;
  vector<string> row;
  string line, word;

  // opening and reading the csv file
  fstream file(fname, ios::in);
  if (file.is_open()) {
    while (getline(file, line)) {
      row.clear();

      stringstream str(line);

      while (getline(str, word, ','))
        row.push_back(word);
      X_train.push_back(row);
    }
  } else
    cout << "Could not open the file\n";
```

- To start, we create variables for the vectors and strings we need. We create a file stream where we pass in the file path and an input stream. We pass in an input stream for you may decide to do some imputing(or any other data cleaning activity) on the dataset. 
- Next, while the file is still open, we read words in a line and insert them into the row vector. We use a comma to separate the words. Remember CSV stands for Comma Separated Values. We stop reading a line once the commas are done and insert the row in the content vector. If there is another line, we clear the row vector, then repeat the same process until we finish reading the file. Find more about C++ file handling [here](https://www.edureka.co/blog/file-handling-in-cpp/) if you are interested in getting more information about it.

In the first `for` loop, we do the training as per the explanation in the linked article. Note how we convert the strings from the vector using the `stoi()` function.

```C++
stoi(X_train[i][j])
```

Another point to note, we access the prediction for a row using the last column(`X_train[i][13]`). 

```C++
X_train[i][13]
```

We start the loop counter from the second index to skip the header rows of the CSV file(age, sex, etc).

```C++
for (int i = 1; i < X_train.size(); i++)
```

For the prediction, we will only pass in the weights and bias vector which we will use to predict. An array of features(`X_train_test`) will be used for the test prediction. Any value that is equal to or above 0.5 will be predicted as 1.0, and a 0.0 prediction for the opposite.

```C++
double CPPLogisticRegression::predict(vector<double> vW) {

  static double predictions;
  double X_train_test[14] = {54, 1, 0, 110, 239, 0, 1, 126, 1, 2.8, 1, 1, 3};
  double Wx_test = 0.0;
  // computing σ(W.x)
  for (int j = 0; j < 13; j++) {
    Wx_test += (vW[j] * X_train_test[j]);
  }
  // adding the bias term
  predictions = 1 / (1 + exp(-(Wx_test + vW.back())));
  // making the prediction
  if (predictions >= 0.5) {
    predictions = 1.0;
  } else {
    predictions = 0.0;
  }
  return predictions;
}
```

We will talk about the accuracy and how to improve it in the next section. 

The external function(`testPrediction()`) is self-explanatory. The only tricky part that we should be careful about is how we get the characters from the path parameter. We do this so that we can easily convert it to a C++ string. The other code is for creating an object of the `CPPLogisticRegression()` class and then calling the appropriate methods for the training and prediction. 

```C++
extern "C" JNIEXPORT jstring JNICALL
Java_com_terrence_heartndk_MainActivity_testPrediction(JNIEnv *env,
                                                       jobject, /* this */
                                                       jstring path) {
  vector<double> vX;
  // getting the characters from the path parameter
  const char *name = env->GetStringUTFChars(path, 0);
  std::string str = name;
  pathString = str + "/heart.csv";

  CPPLogisticRegression *log_reg = new CPPLogisticRegression();
  vX = log_reg->updateWeightsAndBias(pathString);
  double prediction = log_reg->predict(vX);
  string pred_to_string = to_string(prediction);
  return env->NewStringUTF(pred_to_string.c_str());
}
```

The prediction will be displayed in a TextView as shown below:

![Screenshot](/engineering-education/android-ndk-model/shot-one.jpg)

### Accuracy and improvements
Our model is not so accurate. It displays 1.0 for almost all the instances. You can try to improve it by doing a train test split, cross-validation, doing some early stopping, adding more data, etc. 

### Conclusion
This was a guide for creating a native model in android. I hope you got some insights and use them to create a more robust intelligent app. 

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
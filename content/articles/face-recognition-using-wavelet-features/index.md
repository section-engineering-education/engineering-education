---
layout: engineering-education
status: publish
published: true
url: /face-recognition-using-wavelet-features/
title: Face Recognition using Wavelet Features
description: In this tutorial, a face detection scheme is implemented using the wavelet features. We use wavelet features to extract facial features and use principal component analysis to reduce the wavelet feature vectors.
author: simon-mwaniki
date: 2022-02-09T00:00:00-06:27
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/face-recognition-using-wavelet-features/hero.jpg
    alt: Face Recognition Using Wavelet Features Hero Image
---
Face recognition is a system that can match human faces from images to video frames against those in a database. Wavelets are oscillations, having amplitudes beginning from zero, increases or decreases, then back to zero.
<!--more-->
Wavelet coefficients are used to extract features from hyperspectral data. These extracted features are called wavelet features.

In this tutorial, a face detection scheme is implemented using the wavelet features. We use wavelet features to extract facial features and use principal component analysis to reduce the wavelet feature vectors.

The proposed scheme is very robust and capable of recognizing the faces even if some changes occur in the face, such as growing beards, mustache, etc ...

### Prerequisites
To follow along with this tutorial, you need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).
- An understanding of the [principal component analysis(PCA)](https://www.projectpro.io/data-science-in-python-tutorial/principal-component-analysis-tutorial).

### Face image database preparation for training and testing
In this tutorial, we use [faces94](https://cmp.felk.cvut.cz/~spacelib/faces/faces94.html). This database consists of 153 individuals with 20 face images of each individual. This database has three folders: male stuff, female, and male.

For training, 16 images for the 50 selected individuals are used. This totals to 800 images that are used for training.

The remaining 4 images per person of the 50 individuals are used for testing. All these images are kept in one folder. These images must be named as `1.jpg, 2.jpg, ...`. They are of the dimension 200x180.

> Note that all the MATLAB scripts for training and testing should be in the same folder.

### Finding the wavelet features
The image shown below is the basic algorithm for finding these features:

![Finding wavelet features](/engineering-education/face-recognition-using-wavelet-features/wavelet-one.png)

1. The input image is binarized to get the binary image.
2. Perform DWT of 1-level to get the approximated coefficients(cA), Horizontal detailed coefficients(cH), Vertical detailed coefficients(cV), and detailed diagonal coefficients(cD). The dimensions of this matrix are half that of the input image (100x90).
3. We get the row-wise and the column-wise standard deviation to get these features.
4. Combining the row-wise and column-wise standard deviation, we get the corresponding wavelet feature vector.

The wavelet feature vector will be of the size 380. Because this dimension is too big, we need to reduce it to conserve memory space. Therefore, we use the principal component analysis(PCA) to reduce this dimension.

### Principal component analysis for size reduction of the wavelet feature vector
Principal component analysis (PCA) is an unsupervised machine learning technique for dimension reduction. Look at the [principal component analysis](https://medium.com/apprentice-journal/pca-application-in-machine-learning-4827c07a61db) journal for more information.

The general algorithm is shown below:

![PCA algorithm](/engineering-education/face-recognition-using-wavelet-features/wavelet-two.png)

Our large size feature vector is projected in the PCA space, giving a small size PCA representation. This PCA representation is the eigenvalues. 

The general PCA formula is:

```matlab
fvpca = [fvstd-m]*Ppca
```

Where;

- `fvstd` - Is the input feature vector, which in our case is the vector of size 380.
- `M` - Is the mean of all the feature vectors.
- `Ppca` - Is the transformation matrix.
- `fvpca` - Is the reduced feature vector.

### Training
It involves getting the wavelet features and projecting them to the PCA space.

![Training process](/engineering-education/face-recognition-using-wavelet-features/wavelet-three.png)

The first step is reading all the images and getting their corresponding wavelet features (fvstd) of the size 380. It gives a matrix of 380x800 since there are 800 images. This matrix is passed through the PCA space to get a matrix of 70x800.

### Matlab code for training
#### Step 1 - Defining values
The first step is defining the number of training images, the number of dominant eigenvalues selected for the required dimensions, and initializing the dataset matrix.

```matlab
n = 800; %No. of training images
L = 70; %No. of dominant eigen values selected
M = 200; N = 180; %Required image dimensions
X = zeros(n, (M+N)); %Initialize data set matrix[X]
```

Next, we use a `for` loop to read the images one by one. First, the images are read using the `imread()` function. The read images are then converted to grayscale using the `rgb2gray()` function and then resized to the required dimensions using the `imresize()` function. 

Finally, we get the binary image by converting the resized image to binary type using the `imbinirize()` function. This function considers the threshold level.

```matlab
for count = 1:n
    I = imread(sprintf('%d.jpg', count)); %Reading images
    I = rgb2gray(I); %RGB to grayscale
    I = imresize(I, [M, N]); %Resize all images to specified MxN
    level = graythresh(I);
    Ibin = imbinarize(I, level); %Getting binary image.
```

The `graythresh()` function is the global thresholding method. `level` is a normalized intensity value.

#### Step 2 - Finding the discrete wavelet transform
We first set the image for the discrete wavelet transform mode `dwtmode` function. After this, we find the discrete wavelet transform using the `dwt()` function. 

This function gives four outputs i.e approximated coefficients(cA), horizontal detailed coefficients(cH), vertical detailed coefficients(cV) and diagonal detailed coefficients(cD). These coefficients are then arranged into a single matrix `wc`.

```matlab
%Finding discrete wavelet transform
dwtmode('per', 'nodisp');
[cA, cH, cV, cD] = dwt2(double(Ibin), 'db10');
wc = [cA, cH; cV cD]; %wavelet coefficients arranged
```

#### Step 3 - Finding the standard deviation of the wavelet coefficient
Here, we find the standard deviation column-wise and row-wise. It is done using the `std()` function. 

The column vector is stored in the `stdcol` variable. Those stored in the `stdrow` variable are the row vector. 

When combining these two matrices, `stdcol` and `stdrow`, we get the feature vector `fvstd`. Afterwards, we store these feature vectors in the `X` matrix we initialized earlier.

```matlab
%Finding standard deviation of wavelet coefficients
stdcol = std(wc); %Column wise
wcc = (wc');
stdrow = std(wcc); %row wise
fvstd = [stdcol stdrow]; %Feature vector using STD
X(count, :) = fvstd; %Saving all feature vector
end
```

#### Step 4 - Projecting all the feature vectors to the PCA space
This is done to reduce the size of our matrix. In projection in the PCA space, we find the mean of the `X` matrix using the `mean()` function. We modify the `X` matrix by subtracting the mean from each feature vector.

```matlab
% Projecting all the feature vectors to PCA space
m = mean(X); %Mean of all feature vectors
for i = 1:n
    X(i, :) = X(i, :)-m; % Subtracting mean from each feature vector.
end
```

Following that, we find the covariance matrix. A covariance matrix defines the relationship in the entire dimensions as the relationships between two random variables. 

Using the `eig()` function, we get the eigenvalues `Evalm` and the eigen matrix `Evecm`. Next, extract the eigenvalues using `diag(Evalm)` and the values stored in the `Eval` variable.

Finally, sort these eigenvalues in a descending order using the `sort()` function. The `sort()` function gives the sorted eigenvalues `Evalsorted` and their `index`. 

Using these indexes, we find their corresponding eigenvectors. Taking these sorted eigenvalues, `Evalsorted`, and considering the number of dominant selected eigenvalues `L`, we get the transformed matrix `pca`. 

Multiplying our matrix `X` and the `pca` matrix is the position of the feature vector projection to the PCA space.

```matlab
Q = (X'*X)/(n-1); %Finding covariance matrix
[Evecm, Evalm] = eig(Q); %Getting eigen values and eigen vectors of matrix Q
Eval = diag(Evalm); %Getting eigen values
[Evalsorted, Index] = sort(Eval, 'descend'); %Sorting eigen values
Evecsorted = Evecm(:, Index); %Getting corresponding eigen vectors
Ppca = Evecsorted(:, 1: L); % Reduced transformation matrix Ppca
T = X*Ppca; %Projecting each feature vector to a pca space
```

After the training process, we save `n`, `M`, `N`, `m`, `Ppca`, and `T`. We need them for the testing process. 

To save them, go to the workspace, select them, right-click, and select save. You should save them with any name. For our case, we saved it as `wpcadt.mat`.

### Matlab code for discrete testing
#### Step 1 - Load the wpcadt.mat file
We use the `load()` function to load this file. After loading this file, we need to select the image to which the loaded data will be implemented. 

To select images from different folders in our PC, we use the `uigetfile()` function. `strcat` takes the image path and the name and converts them into the string data type. 

These converted variables are used to read the image. We use the `imread()` function in reading the image and provide the converted variables as the arguments. 

The image matrix is stored in the `img` variable. Since we need this image matrix for display, we copy `imgo = img`.

```matlab
% Program for face recognition(Discrete testing)
load('wpcadb.mat', 'n', 'M', 'N', 'm', 'Ppca', 'T');
% Number of total training images[n], Image size [M, N], mean image[m]
%Reduced eigen vectors transformation matrix[Ppca]
%Transformed dataset matrix[T]

[filename, pathname] = uigetfile('*.*', 'Select the input face image');
filewithpath = strcat(pathname, filename);
img = imread(filewithpath);
imgo = img; %Copying image for display
```

#### Step 2 - Converting image to binary
We need to convert our image to binary (black and white). This is because these image processing functions work on binary images. 

We convert our input image `img` to a grayscale using `rgb2gray()` function. This image is resized to the MxN dimensions using `imresize` function. 

Next, we binarize the image while considering the threshold using the `imbinarize()` function as shown below:

```matlab
img = rgb2gray(img);
img = imresize(img, [M, N]);
level = graythresh(img);
Ibin = imbinarize(img, level);
```

#### Step 3 - Finding the discrete wavelet transform
This discrete wavelet transform (dwt) is found the same way we did when training the images.

```matlab
%Finding discrete wavelet transform
dwtmode('per', 'nodisp');
[cA, cH, cV, cD] = dwt2(double(Ibin), 'db10');
wc = [cA, cH; cV cD]; %wavelet coefficients arranged
```

#### Step 4 - Finding the standard deviation of wavelet coefficients
We also use the same code we used when training our image.

```matlab
%Finding standard deviation of wavelet coefficients
stdcol = std(wc); %Column wise
wcc = (wc');
stdrow = std(wcc); %row wise
```

Let us project the feature vector `fvstd` to the PCA space for reduction. It is done by subtracting the mean from the feature vector and the output multiplied by the `Ppca` matrix.

Also, we initialize the difference array.

```matlab
fvstd = [stdcol stdrow]; %feature vector using STD
fvpca = (fvstd-m)*Ppca; % Projecting fv to PCA space
disarray = zeros(n, 1); %Initialize difference array
```

The difference array is the eigen distance with each stored feature vector. Use a `for` loop to find this distance between all the images. This helps us to get the right image.

```matlab
for i = 1:n
    distarray(i) = sum(abs(T(i, :)-fvpca)); %finding L1 distance
end
```

#### Step 5 - Displaying first five matches
Before displaying those matches, we do the sorting using the `sort()` function. This distance is done in consideration with the difference array. 

The arrangement is made in ascending order. It means images close to the input image are sorted first.

```matlab
[result, indx] = sort(distarray);
```

This `sort()` function gives the result and the index `indx` of the image in the database. These images are then read from the database depending on its index. `imshow()` shows the output.

```matlab
%--------------Displaying first five matches---------%
resultimg1 = imread(sprintf('%d.jpg', indx(1)));
resultimg2 = imread(sprintf('%d.jpg', indx(2)));
resultimg3 = imread(sprintf('%d.jpg', indx(3)));
resultimg4 = imread(sprintf('%d.jpg', indx(4)));
resultimg5 = imread(sprintf('%d.jpg', indx(5)));

subplot(231); imshow(imgo); title('input test image')
subplot(232); imshow(resultimg1); title('First Matched image')
subplot(233); imshow(resultimg2); title('Second Matched image')
subplot(234); imshow(resultimg3); title('Third Matched image')
subplot(235); imshow(resultimg4); title('Fourth Matched image')
subplot(236); imshow(resultimg5); title('Fifth Matched image')
```

We need to use images that we did not use for training when we run this program. Therefore, the output is as follows:

![Image without distortion](/engineering-education/face-recognition-using-wavelet-features/wavelet-four.png)

When we use a distorted image to test the robustness of our image. We realize that the program is capable of making the recognition. 

For example, a sample with a distorted image is shown below:

![Distorted image](/engineering-education/face-recognition-using-wavelet-features/wavelet-five.png)

Distorting some image parts:

![Distored image](/engineering-education/face-recognition-using-wavelet-features/wavelet-six.png)

### Conclusion
In this tutorial, we have discussed how the wavelet feature is used to make a face recognition system. This method as we have seen is a very robust method. Even if the image is distorted, it is still possible to recognize the faces accurately using these features.

Also, the algorithm that this method uses is very effective. The PCA algorithm also effectively reduces the dimensions of multiple images easily.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

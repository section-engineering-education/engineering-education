---
layout: engineering-education
status: publish
published: true
url: /how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/
title: How to Obtain Blood Vessels Segmentation in Retinal Images Using Matlab
description: This article will look at how we can obtain the blood vessel segmentation in the retinal image. Retinal images are the digital images of the eyeball that show the retina, the optical nerves, and the blood vessels that send information to the brain.
author: queenter-bruce
date: 2021-09-24T00:00:00-02:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/hero.jpg
    alt: Blood Vessels Segmentation in Retinal Images Using Matlab Hero image.
---
Segmentation is the process of Retinal partitioning a digital image into multiple regions and extracting the significant ones. Retinal images are the digital images of the eyeball that show the retina, the optical nerves, and the blood vessels that send information to the brain.
<!--more-->
This practice helps the optometrist to find diseases and also give a health check on the eyes.

This segmentation process is essential in the field of medicine. When the vessels are segmented and viewed closely, the solution or cause of a given problem may be defined.

Therefore, it makes it a good application in this field. This article will look at how we can obtain the blood vessel segmentation in the retinal image.

### Prerequisites
To follow along with this tutorial, you will need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Basic understanding of [image processing](https://www.section.io/engineering-education/image-processing-using-matlab/) using Matlab.

### Matlab code for obtaining the segmentation
To make this whole process easier, download your image and store it in Matlab's current folder. The retinal images can be downloaded directly from the internet.

Thereafter, we will open Matlab and create a new script. The first step is reading the images.

This is made possible by the `imread` function:

```Matlab
test_image = imread('retinal_image.jpg');      %Reading the image
```

Our image looks big at this point. We should therefore resize it using the `imresize` function. This function uses the image name and the preferred dimensions in vector form as the arguments.

The dimensions are in pixels. This means that decimal dimensions are not accepted:

```Matlab
resized_image = imresize(test_image, [584 565]);     %resizing the image
```

Since we will be segmenting very tiny blood vessels, we will need to convert the resized image into double data time using the `im2double` function.

This function only uses the image name as the argument:

```Matlab
converted_image = im2double(resized_image);       %converting the image to double data time
```

At this point, the image is an `RGB` image. We need to convert the image to `CIE lab` colour space. CIE Lab colour space was defined by the international commission of illumination.

### Converting the image to CIE lab color space
According to this colour space, the `l` represents the `likeness` of the colour. The `likeliness` ranges from 0 to 100, where 0 is **black** and 100 is **white**.

The `a` represents green to red, ranging from negative to positive. The higher the negative value, the brighter the green color, while the higher the positive value, the brighter the red colour.

The `b` represents blue to yellow. It also ranges from negative to positive.

The image will be converted as shown below:

```matlab
lab_image = rgb2lab(converted_image);    %Converting the image from rgb color space to lab color space
```

Let us now use the `cat` function to concatenate 1, 0, and 0. Concatenation is the process of merging two or more variables together:

```matlab
fill = cat(3, 1, 0, 0);              %cancating the image
filled_image = bsxfun(@times, fill, lab_image);
```

From the code above, the `3` represents the dimensions of the concatenated areas. Our image is in the CIE Lab colour space, which has 3 channels.

Then, we used the `bsx` function to perform an element-wise binary operation between the `filled` and `lab` images.

### Reshaping the output image
Next, we will reshape the filled image. The dimension arguments will be blank since we do not need any here.

Instead, we will use `3` since it is the existing dimension of the `filled` image, as shown below:

```matlab
reshaped_lab_image = reshape(filled_image, [], 3);    %reshaping the image
```

Now we apply the principal component analysis (PCA) function. Also, we are using the `reshaped_lab_image` as the argument.

The function returns the coefficients and the score of the principal component. Variables `C` and `S` will store coefficients of the principal component.

You can then resize the scores based on the size of the `lab` image as shown:

```matlab
[C, S] = pca(reshaped_lab_image);    %finding the coefficients of the pca
S = reshape(S, size(lab_image));
```

We need all the rows and the columns of the first channel:

```Matlab
S = S(:, :, 1);
```

### Performing contrast enhancement and filter on the grayscale image.
Now, let us convert the `S` into a grayscale image. First, we subtract `S's` minimum value from `S` and then divide it by the maximum and minimum of value of `S`.

The division is going to be an element-wise division, and that is why we use the dot before the division sign as shown in the code below:

```Matlab
gray_image = (S-min(S(:)))./(max(S(:)));    %converting image S into a grayscale
```

We need the contrast enhancement of this gray image. This will be done using the adaptive histogram equalization function `adapthisteq`, as shown:

```matlab
enhanced_image = adapthisteq(gray_image, 'numTiles', [8 8], 'nBins', 128);     %enhancing the contrast
```

The `numTiles`, which stands for the number of tiles, means the enhancement is done block by block. The size of the block is going to be `8x8`.

`nBins` indicates the number of beams will be `128`.

The next step is to perform an average filter on the image. To do it, we define the filter using the `special` function. We then apply the `imfilter` function to compute the value of the output image in pixels as shown below:

```Matlab
avg_filter = special('average', [9 9]);    %filtering the image
filtered_image = imfilter(enhanced_image, avg_filter);
```

We will now view the `filtered image` and subtract it from the enhanced image using the `imsubtract` function. To view the image, we will use the `imshow` function as shown below:

```matlab
figure, imshow(filtered_image)             %showing the resulting image
title('filtered image')                    %adding the title
subtracted_image = imsubtract(filtered_image, enhanced_image);
```

### Calculating the threshold level
Now we need to calculate the threshold level to segment the blood vessels. Let's create a function script named `threshold_level.m` for this.

This function will take the image as the argument as shown below:

```Matlab
function level = Threshold_level(image)
```

We then convert the image into `uint8`. This is a data type of `8-bits`. This conversion is done using the `im2uint8` function.

We then use the `imhist` function and the converted image as the argument to get the histogram count and beam number as shown:

```matlab
image = im2uint8(image(:));     %converting the image to uint8
[Histogram_count, Bin_number] = imhist(image);    %calculating the histogram count and beam number
i = 1;     % Initializing the variable
```

Calculate the cumulative sum of histogram count using `cumsum` function as shown below:

```matlab
cumulative_sum = cumsum(Histogram_count);    %calculating the cumulative sum
```

Let's now find the mean below and above `T`. `T` is the ratio of the sum of the multiplication of bin number and the histogram count to the cumulative sum indexed at the end.

```matlab
T(i) = (sum(Bin_number.*Histogram_count))/cumulative_sum(end);  %calculating the ratio of the sum of the multiplication of bin number and the histogram count to the cumulative sum indexed at the end.

T(i) = round(T(i));    %Rounding the T(i)
```

We then need to find the cumulative sum of the histogram count from `1` to `T(i)`. We use this to find the mean above T(MAT) and MBT.

```matlab
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));         %finding the cumulative sum at the second index.
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end); %finding the MBT 
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));      %finding the cumulative sum at the second index.
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);    %finding the MBT 
```
### Finding the average of MAT, MBT and the obsolete value of T above one
We will now find the threshold. This is achieved by the code below:

```matlab
i = i+1;
T(i) = round((MAT+MBT)/2);      %Finding the average of MBT and MAT
```
### Making the obsolete value great than one
Let's now introduce a while loop to the conditions to make the absolute value of `T` to be greater than one:

```matlab
while abs(T(i)-T(i-1))>=1
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));    %finding the histogram count at the second index
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end);  %finding the histogram count at MBT
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));    %finding the histogram count at the third index
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);
i = i+1;                      %looping i
T(i) = round((MAT+MBT)/2);    %rounding off the average mat and mbt.
Threshold = T(i);             % making T(i) the threshold
end
```

Finally we normalize the threshold as follows:

```matlab
level = (Threshold-1)/(Bin_number(end)-1);
end
```

Going back to our initial script, we are going to call this function `threshold_level`. This function uses the `subtracted_image` we found before and returns its threshold level:

```Matlab
level = Threshold_level(subtracted_image);
```

Now we can convert this `subtracted_image` to binary image using the `im2bw` function.

```matlab
binary_image = im2bw(subtracted_image, level-0.008);    %converting to binary
```

We then use the `imshow` function to display this binary image in a figure as shown below:

```Matlab
figure, imshow(binary_image)
title('binary image')
```

### The resulting outputs and the further modifications
This is what we have when running the code at this point:

![Output image](/engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/retinal-one.png)

This is not the result required. We need to remove the noise from the `binary_image` we have displayed above. To do that, we use the `bwareaopen` function and the binary image as the argument as shown below:

```Matlab
clean_image = bwareaopen(binary_image, 100);
figure, imshow(clean_image)
title('clean_image')
```

We will then see this new image:

![Filtered image](/engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/retinal-two.png)

Since this is a binary image, we need to convert it into a colour image. We will take the complement of the binary image first, using the `incomplement` function, which returns the complemented image.

A complement image is an image in which the pixels are subtracted from the maximum pixel that the class can support. It is mainly used to improve the contrast.

To convert, add the following block of code:

```Matlab
complemented_image = imcomplement(clean_image);   %complemented image
figure, imshow(complemented_image)
title('complemented image')
```

This is how the complemented image will look like:

![Complemented image](/engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/retinal-three.png)

### Colorizing the image
We can now colorize this image. In order to do that, we will create a function named `colorized_image.m`.

The function will return the color image. To avoid any difficulty, we will use the default color defined by `DEFAULT COLOR`, as shown:

```matlab
function color_image = colorize_image(resized_image, complemented_image, colorspace_defination)
DEFAULT_COLOR = [1 1 1];     % default color is white.
```

Let's introduce the condition for the color channels. We will be using the `nargin` function; such that, if `nargin` is less than 3, we will use the default color.

`nargin` is a function that returns the number of the input argument of the function.

The code will be as follows:

```Matlab
if nargin<3
colorspace_defination = DEFAULT_COLOR;   %calling the default color function
end
```

We now make the complemented image to be a logical image, like this:

```matlab
complemented_image = (complemented_image~=0);      %colored image
```  

Then convert the resized image and the color space into `uint8`:

```matlab  
resized_uint8 = im2uint8(resized_image);       %converting the resized image and the color space into uint8.
color_uint8 = im2uint8(colorspace_defination);
```

If the dimensions of the `resized_uint8` is 2, then it is a grayscale. We use the `ndims` to return the dimension of the input array.

If this is the case, we have to initialize all our input channel with same values, as follows:

```matlab
if ndims(resized_uint8) == 2
red_channel = resized_uint8;            %initializing the colors
green_channel = resized_uint8;
blue_channel = resized_uint8;
```

However, in other cases, we have to define the channel, as shown below:

```matlab
%defining the colors
else
red_channel = resized_uint8(:, :, 1);
green_channel = resized_uint8(:, :, 2);
blue_channel = resized_uint8(:, :, 3);
end
```
From the code above:

- `1` represents red, `2` represents green and `3` represents blue.

Now apply the colors to the complemented image:

```matlab
%applying color to the images
red_channel(complemented_image) = color_uint8(1);
green_channel(complemented_image) = color_uint8(2);
blue_channel(complemented_image) = color_uint8(3);
```

Finally, we concatenate the red, green and the blue channel into a 3-D array with the following code which will give us the coloured image:

```Matlab
color_image = cat(3, red_channel, green_channel, blue_channel); %color image
end
```

We now go back to the script and call this `colorize_image` function, after which we will be able to view the final image:

```matlab
final_results = colorize_image(resized_image, complemented_image, [0 0 0]);
figure, imshow(final_results)
title('final_result')
```

Finally, this is how our final image will look like:

![Final output](/engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/retinal-four.png)

### Conclusion
Through this article we have seen that using Matlab for segmentation is simple. This is because it uses the in-built functions that you do not need to define.

These in-built functions make the work more accessible, and the code does not seem to be bulky.

Also, Matlab allows the use of functions, and this makes the code appear organized. The output given by Matlab is reliable. It makes it even more efficient for segmentation.

I hope you find this tutorial beneficial.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

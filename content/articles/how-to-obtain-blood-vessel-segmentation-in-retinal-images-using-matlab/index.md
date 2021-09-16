---
layout: engineering-education
status: publish
published: true
url: /how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/
title: How to Obtain Blood Vessels Segmentation in Retinal Images Using Matlab 
description: 
author: queenter-bruce
date: 2021-08-18T00:00:00-09:38
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-obtain-blood-vessels-segmentation-in-retinal-images-using-matlab/hero.jpg
    alt: Blood Vessels Segmentation in Retinal Images Using Matlab Hero image.
---

### Introduction
Segmentation is the process of Retinal partitioning a digital image into multiple regions and extracting the significant region.

Retinal images are the digital images of the eyeball that shows the retina, the optical nerves, and the blood vessels that send information to the brain.
<!--more-->

This practice helps the optometrist finding diseases and also give a health check on the eyes.

This segmentation process is essential in the field of medicine. When the vessels are segmented and viewed closely, the solution or cause of a given problem may be defined.

Therefore, it makes it a good application in this field. This article will look at how we can obtain the blood vessel segmentation in the retinal image.

### Prerequisites
To follow along with this tutorial, you'll need:

- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.
- Basic understanding of [image processing](https://www.section.io/engineering-education/image-processing-using-matlab/) using Matlab.

To make this whole process easier, download your image and store it in the current folder in Matlab. The retinal images can be downloaded from the internet.

Thereafter, we will open Matlab and create a new script. The first step is to read the images.
It is made possible by the `imread` function.

```Matlab
test_image = imread('retinal_image.jpg');
```

Our image looks bigger at this point. We should therefore resize it using the `imresize` function. This function uses the image name and the prefered dimensions in vector form as the arguments.

The dimensions are in pixels. This means that decimal dimensions are not accepted.

```Matlab
resized_image = imresize(test_image, [584 565]);
```

Since we will be segmenting very tiny blood vessels, we will need to convert the resized image into double data time using the `im2double` function. This function only uses the image name as the argument:

```Matlab
converted_image = im2double(resized_image);
```

At this point, the image is an `RGB` image. We need to convert the image to `CIE lab` colour space. The international commission of illumination defined the CIE Lab colour space.

According to this colour space, the `l` represents the `likeness` of the colour. The `likeliness` ranges from 0 to 100, where 0 is black and 100 is white.

The `a` represents green to red, starting from negative to positive as the range. The higher the negative value, the brighter the green color, while the higher the positive value, the brighter the red colour.

The `b` represents blue to yellow. It also ranges from negative to positive.

```matlab
lab_image = rgb2lab(converted_image);
```

Let us now use the `cat` function to concatenate 1, 0 and 0:

```matlab
fill = cat(3, 1, 0, 0);
filled_image = bsxfun(@times, fill, lab_image);
```

From the code above, the `3` represents the dimensions of the concatenated areas. Our image is in the CIE Lab colour space, which has 3 channels.

Then, we used the `bsx` function to perform an element-wise binary operation between the `filled` and `lab` images.

Next, we will reshape the filled image. The dimension arguments will be blank since we do not need any here. Instead, we will use `3` since it is the existing dimension of the `filled` image, as shown below:

```matlab
reshaped_lab_image = reshape(filled_image, [], 3);
```

Now we apply the principal component analysis(PCA) function. Also, we are using the `reshaped_lab_image` as the argument.

The function returns the coefficients and the score of the principal component. Variables `C` and `S` will store coefficients of the principal component.

You can then resize the scores based on the size of the `lab` image:

```matlab
[C, S] = pca(reshaped_lab_image);
S = reshape(S, size(lab_image));
```

We need all the rows and the columns of the first channel,

```Matlab
S = S(:, :, 1);
```

It is time to convert the `S` into a grayscale image. First, we subtract `S`'s minimum value from `S` and then divide it by the maximum and minimum of `S`.

The division is going to be an element-wise division, and that is why we use the dot before the division sign as shown in the code below:

```Matlab
gray_image = (S-min(S(:)))./(max(S(:)));
```

Now we need the contrast enhancement of this gray image. This will be done using the adaptive histogram equalization function `adapthisteq`, as shown:

```matlab
enhanced_image = adapthisteq(gray_image, 'numTiles', [8 8], 'nBins', 128);
```

The `numTiles`, which stands for the number of tiles, means the enhancement is done block by block. The size of the block is going to be `8x8`.

`nBins` indicates the number of beams will be `128`.

The next step is to perform an average filter on the image. To do it, we define the filter using the `special` function. We then apply the `imfilter` function to compute the value of the output image in pixel as shown below:

```Matlab
avg_filter = special('average', [9 9]);
filtered_image = imfilter(enhanced_image, avg_filter);
```

We will now view the `filtered image` and subtract the from the enhanced image. To view the image we will use the `imshow` function as seen below:

```matlab
figure, imshow(filtered_image)
title('filtered image')
subtracted_image = imsubtract(filtered_image, enhanced_image);
```

### Calculating the threshold level

Now we need to calculate the threshold level to segment the blood vessels. Let us create a function script named `threshold_level.m` for this. This function will take the image as the argument as seen below:

```Matlab
function level = Threshold_level(image)
```

Here, we first convert the image into `uint8`. This is a type of datatype of 8bits. This conversion is done using the `im2uint8` function.

We then use the `imhist` function and the converted image as the argument to get the histogram count and beam number.

```matlab
image = im2uint8(image(:));
[Histogram_count, Bin_number] = imhist(image);
i = 1;     % Initializing the variable
```

Calculate the cumulative sum of histogram count using `cumsum` function as shown below:

```matlab
cumulative_sum = cumsum(Histogram_count);
```

Let us now find the mean below and above `T`. `T` is the ratio of the sum of the multiplication of bin number and the histogram count to the cumulative sum indexed at the end.

```matlab
T(i) = (sum(Bin_number.*Histogram_count))/cumulative_sum(end);
T(i) = round(T(i));    %Rounding the T(i)
```

We now need to find the cumulative sum of the histogram count from `1` to `T(i)`. We use this to find the mean above T(MAT) and MBT.

```matlab
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end);
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);
```

We are now to find the threshold. This is done using the code below:

```matlab
i = i+1;
T(i) = round((MAT+MBT)/2);
```

Let us now introduce a while loop to give the conditions to make the absolete value of `T` to be greater than one:

````matlab
while abs(T(i)-T(i-1))>=1
cumulative_sum_2 = cumsum(Histogram_count(1:T(i)));
MBT = sum(Bin_number(T(i)).*Histogram_count(1:T(i)))/cumulative_sum_2(end);
cumulative_sum_3 = cumsum(Histogram_count(T(i):end));
MAT = sum(Bin_number(T(i):end).*Histogram_count(T(i):end))/cumulative_sum_3(end);
i = i+1;                      %looping i
T(i) = round((MAT+MBT)/2);    %rounding off the average mat and mbt.
Threshold = T(i);             % making T(i) the threshold
end

Finally we normalize the threshold as follows:

```matlab
level = (Threshold-1)/(Bin_number(end)-1);
end
````

Going back to our initial script, we are going to call this function `threshold_level`. This function uses the `subtracted_image` we found before and returns its threshold level:

```Matlab
level = Threshold_level(subtracted_image);
```

Now we can convert this `subtracted_image` to binary image uisng the `im2bw` function.

```matlab
binary_image = im2bw(subtracted_image, level-0.008);
```

We then display the output using the `imshow` to display this binary image in a figure with the following code:

```Matlab
figure, imshow(binary_image)
title('binary image')
```

This is what we have when running the code at this point:

![output image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_one.png)

Now, this is not the result required. We need to remove the noise from the `binary_image` we have displayed above. To do that, we use the `bwareaopen` function and the binary image as the argument as shown here:

```Matlab
clean_image = bwareaopen(binary_image, 100);
figure, imshow(clean_image)
title('clean_image')
```

We will then see this new image:

![filtered image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_two.png)

Since this is a binary image, we need to convert it into a colour image. We will take the complement of the binary image first, using the `incomplement` function, which returns the complemented image.

A complement image is an image in which the pixels are subtracted from the maximum pixel that the class can support. It is mainly used to improve the contrast.

```Matlab
complemented_image = imcomplement(clean_image);
figure, imshow(complemented_image)
title('complemented image')
```

![complemented image](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_three.png)

### Colorizing the image

Let us now colorize this image. In order to do that, we will create a function named `colorized_image.m`.

The function will return the color image. To avoid any difficulty we will use the default color defined by `DEFAULT COLOR` like this:

```matlab
function color_image = colorize_image(resized_image, complemented_image, colorspace_defination)
DEFAULT_COLOR = [1 1 1];     % default color is white.
```

We can now introduce the condition for the colour channels. We will be using the `nargin` function such that if `nargin` is less than 3, then we use the default colour.

`nargin` is a function that returns the number of the input argument of the function.

The code will be as follows:

```Matlab
if nargin<3
colorspace_defination = DEFAULT_COLOR;
end
```

We now make the complemented image to be a logical image, like this:

```matlab
complemented_image = (complemented_image~=0);
```

Then convert the resized image and the colorspace into `uint8`:

```matlab
resized_uint8 = im2uint8(resized_image);
color_uint8 = im2uint8(colorspace_defination);
```

If the dimensions of the `resized_uint8` is 2, then it is a grayscale. We use the `ndims` to return the dimension of the input array.

If this is the case, we have to initialize all our input channel with same values as follows:

```matlab
if ndims(resized_uint8) == 2
red_channel = resized_uint8;
green_channel = resized_uint8;
blue_channel = resized_uint8;
```

However, in other cases, we have to define the channel as shown below:
 
```matlab
else
red_channel = resized_uint8(:, :, 1);
green_channel = resized_uint8(:, :, 2);
blue_channel = resized_uint8(:, :, 3);
end
```
- `1` represents red, `2` represents the green and `3` represents the blue.

Now apply the colors to the complemented image:

```matlab
red_channel(complemented_image) = color_uint8(1);
green_channel(complemented_image) = color_uint8(2);
blue_channel(complemented_image) = color_uint8(3);
```

Finally, we concatenate the red, green and the blue channel into a 3-D array with the following code which will give us the coloured image:

```Matlab
color_image = cat(3, red_channel, green_channel, blue_channel);
end
```

We now go back to the script and call this `colorize_image` function, after which we will be able to view the final image:

```matlab
final_results = colorize_image(resized_image, complemented_image, [0 0 0]);
figure, imshow(final_results)
title('final_result')
```

Here is our final image:

![final output](/engineering-education/how-to-obtain-blood-vessel-segmentation-in-retinal-images-using-matlab/retinal_four.png)

### Conclusion
Through this article we have seen that using Matlab for segmentation is simple. This is because it uses the in-built functions that you do not need to define.

These in-built functions make the work more accessible, and the code does not seem to be bulky.

Also, Matlab allows the use of functions, and this makes the code appear organised. The output given by Matlab is reliable. It makes it even more efficient for segmentation.

I hope you find this tutorial beneficial.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

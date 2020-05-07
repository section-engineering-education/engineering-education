# CV and lines
Computer vision is how computers learn high-level information from images <!-- from digital media-->.
In this article, we will look into one of the more basic algorithms in computer vision.
That is finding straight lines in images.

While it is basic, it illustrates many techniques that are used in more complicated computer vision algorithms. 

## edges
We have an image and we want to extract information from it.
To do this, we need to determine what is important in the image.
What this is will depend heavily on what our end goal is.
We are trying to find lines in images, so it would be helpful to use the edges in the images. <!-- We don't care about color or texture -->

This is sort of step one of the line detecting process: making an edge image.

We will use a method called Canny edge detection. Without going into depth here's a quick summary of how it works
1. Apply a gaussian filter to smooth the image
2. Fing the norm of the gradient at each pixel (this will give us a rough edge image)
3. Lines/curves with gradient norm above a threshold are thinned to one pixel in width
4. Connect edges and remove unconnected edges (Hysteresis)

Let's see how this working in action.
Take the following image.

![alt text](cv_lines_images/section-logo.png "Section Logo")

The edge image would look like the following.

![alt text](cv_lines_images/section-logo-edge.png "Section logo edge image.")

It might look like we are done and that we have found the straight line, but that's because sections logo is just a bunch of straight lines.
So what if instead, we looked at a more complicated image. The edge images, in this case, can only take us so far. <!-- reword this part -->

<!-- I might just get rid of the image -->
<img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Valve_original_%281%29.PNG" alt="Without edges" width="400"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Valve_monochrome_canny_%286%29.PNG" alt="Classic edge image" width="400"/>

*Image source: [Wikipedia](https://en.wikipedia.org/wiki/Canny_edge_detector)*

## Lines
Before we start to find lines in images, we will need to understand what a line is.
The most common way to define a line is, of course, $y=mx+b$. 
We, however, will not be using this definition, instead, we will use what is called the Hesse normal form of a line.

![alt text](cv_lines_images/line_image.png "Hesse normal form of line")

Which would give us this equation to represent the line: $\rho = x \cos(\theta) - y \sin(\theta)$. <!-- i dont like this -->
This equation gives us a lot of benefits over the slope-intercept form, namely, we can represent verticle lines (we would set $\theta = 0$).
And a lot more of the benefits will become evident when we talk more about the hough transform.
When we need to have slope-intercept form we can calculate $m = \cot(\theta)$ and $b = -\rho \cdot \csc(\theta)$.

With the Hesse normal form of a line, we can now define a line as a point in $(\theta, \rho)$ space.


## Hough Space
let's look at the edge image, what is it? It's just a bunch of pixels that represent edges. <!-- no shit -->
Each pixel can only be a 1 or a 0 (is an edge or not an edge).
Because our image is of a discrete size we can represent it as a matrix of 1 and 0s.
We will call this the image space where each edge pixel is at a point in the image space. <!-- I can do better with the words -->
To determine what lines exist in this matrix, we will look at each edge pixel and essentially ask, what are all the possible lines this point could be in.
This, in essence, is what the Hough transform is.

We made it easy for our selves to figure out all the possible lines because we are using the Hesse normal form of a line.
We can just iterate over every possible $\theta$ (with a discrete step size) and then solve for the resulting $\rho_\theta$s.
This works because any line can be represented with some $0 \leq \theta < 180$ and $\rho \in \mathbb{R}$ (note $\rho$ can be negative in this case).
We can then plot these $(\theta, \rho)$ pairs in a sperate graph. 

The whole process will end up looking like the following.

![alt text](cv_lines_images/desmos_plot.gif "Desmos Plot")

*I made this as an interactable desmos plot [here](https://www.desmos.com/calculator/lvwhvdltth)*

<!-- talk more about the graphic-->
In this image, the plot on the right is the resulting hough transform. The plot shows the $\rho$ values (Y-axis) vs. the $\theta$ values (X-axis). 
The main plot (with the points) shows the image space of the edges where each point represents a single edge.
We can see that one point in image space is a line (really a curve) in hough space (look at the purple point and line). 
And it might make sense that there are intersections in hough space where <!-- or when --> the line hits multiple points.
Also, a point in Hough space is a line in image space (look at the red line and point). 
We can say that an intersection in hough space makes a line from two or more points in image space. <!-- reword -->

Solving for intersections can be costly and hard so instead of plotting things we will add points from the plot into "buckets".
We will define Hough space to be a matrix of buckets that represent chucks of the continuous hough space shown in the desmos plot. 
Each entry of this matrix will count the number of votes each line gets. 
Where each bucket represents all lines were the $\theta$ and $\rho$ lie within the range that the bucket resides in.
This will mean that the bucket that contains the intersection of the 4 lines in the desmos plot will have 4 votes.

This allows us to not just solve for intersections, but to also know how many points reside in the line.
This helps because any two points can form a line but it doesn't mean that they really are a line in the image.
That would only be the case if the number of votes a particular bucket has is above some threshold.

If we go back to our section logo edge image and apply the Hough transform to it them we get the following.
I normalized the vote counts and applied a heat map so that you can see more of the details.

![alt text](cv_lines_images/section-logo-heat.png "Section logo in Hough space shown as a heat map")
*I am not sure what causes the vertical lines. <!-- I assume it is some form aliasing -->*

Just like before the X-dimension represents the $\theta$ values in the range $0$ to $180$ degrees and the Y-dimension represents the $\rho$ values with 0 being halfway.

You will notice that this looks a lot like the desmos plot. Which should make sense.
The main difference is that it is flipped, this is because matrices/images store the $(0,0)$ entry at the top left corner and then going down and to the right givens higher entry.
So this image means the same thing as the desmos plot, but when we show it, it looks flipped.

Now, did we find all 16 lines of the section logo? 
Sort of, if you were to count the peaks you will count 16.
You have the 8 peaks at 0 degrees, the 4 just before 90 degrees, and the 4 just after 90 degrees. Try to figure out which line each peak represents.

Note that because 180 degrees and 0 degrees both represent a vertical line and 180 degrees is not an option the peaks at the right side aren't real peaks.
Instead, they lead up to the real peaks at 0 degrees.
They are sort of reflected over the image. <!-- needs work -->


## The Algorithm
So far we have our Hough space matrix that has peaks where the lines are.
All we need to do is to extract the lines from this matrix; easier said than done.

The most accurate way to do this would be to use gradient ascent.
However, for a demo, it is good enough to just pick the spots with the most votes and filter out similar lines.

<!-- the complexity is $O(n^2)$ -->

Ones we found a peak, which is just a $(\theta, \rho)$ point in hough space we can convert it into a line in images space, and then we are done. We have successfully found a line.

<!-- code: ??? -->


## Results
When we do all of this and finally have our line we can then plot the lines on the image.
If we use our section logo limited to 14 lines we get the following:

![alt text](cv_lines_images/section-logo_with_lines.png "Section Logo with lines")

<!-- why does it have a hard time getting the two other lines? -->

Now, the section logo is made up of straight lines so it is not as impressive to find them.
If we instead use a more complicated image, we will get a better understanding of how well this method works.

Take this image of cracks in ice.

![alt text](cv_lines_images/ice.jpg "Cracked ice")

None of the edges are 100% straight, but they are straight enough that we would expect them to be detected.
For the edges to be detected we will have to lower the strictness set for each type of line.
We can do this by making the hough space buckets larger in the $\rho$ dimension.
And with all that done, here is the resulting image with 10 lines.

![alt text](cv_lines_images/ice_with_lines.png "Cracked ice with lines")

I would say that worked pretty well.

If you want to, you can play around with the program I wrote in python [here](https://repl.it/@ZackJorquera/FindingLinesComputerVision) with these and more images. <!-- I should try to add the code to the article -->


## More Hough
In this article, we looked at the standard Hough transform which is specialized for lines.
However, the Hough transform has sense been generalized for more purposes.  
Some good examples of this are [finding circles/ellipses](https://en.wikipedia.org/wiki/Circle_Hough_Transform) in images, [finding any shape](https://en.wikipedia.org/wiki/Generalised_Hough_transform) in images, and [finding complex objects using image keywords](https://github.com/ZackJorquera/Keyword_Object_Detection).

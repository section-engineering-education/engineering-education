---
layout: engineering-education
status: publish
published: true
url: /how-to-perform-parallel-computing-using-matlab/
title: How to Perform Parallel Computing Using Matlab
description: This article explains the parallel computing toolbox in Matlab and how one can use it to perform parallel computing. It also discusses how one can use the low level functions to perform parallel computing.
author: florence-akinyi
date: 2021-10-22T00:00:00-09:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-perform-parallel-computing-using-matlab/hero.jpg
    alt: How to Perform Parallel Computing Using Matlab Hero Image
---
Parallel computing is a type of computing in which many calculations or execution processes are carried out simultaneously. If you have a huge and complex process, you can apply the parallel computing process.
<!--more-->
Parallel computing involves dividing the task into completely independent sub-tasks. These sub-tasks are executed independently in the central processing unit (CPU).

Sub-tasks being executed independently means that a block of code can be completed without knowing the output of another code.

Once you execute all these sub-processes, you obtain the final results by summing up the smaller tasks. This process reduces the execution time.

Parallel computing with Matlab accelerates workflow with minimal to no code changes to your original code. It also scales computations to clusters and clouds.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A clear understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Accelerating and parallelizing Matlab code
You can use different procedures in your code to improve its performance without taking into account parallelization.

One procedure is pre-allocation and vectorization - This involves pre-allocating the space without locating it dynamically. Particularly when a code contains `for` and `while` loop.

![Code analyzer](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-one.png)

In the image above, Matlab tells you how to make a little adjustment to accelerate the execution of the code.

### Running Matlab on multicore machines
There are two ways of running Matlab on multicore machines:
- Built-in-multithreading.
- Parallel computing using explicit techniques.

#### Built-in-multithreading
This method is used by everyone unknowingly. When you execute your code normally on a modern machine with multicores, Matlab automatically enables it.

Some of the functions are optimized for this multi-threading, and matlab uses multicore to accelerate computations. This method is implicit, you do not need to do anything to enable it.

#### Parallel computing using explicit techniques
In parallel computing using explicit techniques, the user specifies the number of workers they want on a specific task.

The user then decides to use a specific function to parallelize the work to obtain the results. This article will focus more on this.

This method uses `parfor` function.

Here, we need not to have any dependency between the different tasks.

For example:

![matlab client](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-two.png)

In the example above, we have a Matlab client. The rectangle is the task that we are to perform.

We can see that if we perform sequentially, we take a longer time, while splitting the task into three workers reduces the execution time.

It is also visible that the difference between the `for` and the `parfor` syntax is not so much.

Therefore, the only thing that you should ensure is that the function `myFun` is completely independent.

### Mechanics of parfor loops

```matlab
a = zeros(10,1);
parfor i = 1:10
a(i) = i;
end
a;
```

Matlab allocates its work dynamically to its workers during computation.

For example, in the code above, we have enabled the `parfor`, and when we run the program, we get the following output:

```matlab
Starting parallel pool (`parpool`) using the 'local' profile ...
connected to 2 workers.
```

**Explanation**

In this case, we have ten iterations.

Let us say you distribute this work to 2 workers. Workers are the PC's core.

At the starting point, Matlab divides iteration during execution into different groups based on the size, which for our case is 2. The iterations are then given to different groups based on the potential of the workers. Matlab then allocates iterations to a single worker:

![Allocation of the work](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-three.png)

### Optimization of for loops
Now we want to see the optimization of the `for` loop. Particularly, we will have the first one as the classic `for` loop with nothing optimized, and the second as the optimized one using the `parfor` function.

Let's look at the tool strip parallel.

In the home section, click on parallel to see the currently active parallelization, which in our case is `local` in the default section.

![locating the parallel](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-four.png)

![active pool](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-five.png)

To discover more, click on the discover cluster. You can also create or manage your cluster.

For example, you can find the properties of the local cluster by clicking on the `manage cluster`, and the window below with properties opens up:

![properties of the cluster](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-six.png)

You can also validate your cluster by checking if your computer can perform this type of operation.

It is done by clicking on `validation`, and then `validate` at the top of that window:

![validation](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-seven.png)

Once this is done, we can see the number of workers we have for different stages.

You can also monitor the job by clicking on `monitor jobs` tab. It gives you the current status of your parallel pool as shown below:

![monitor jobs](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-eight.png)

Let's now see the comparison between the optimized and non-optimized `for` loops:

```matlab
%Non-optimized for loop
n = 200;
A = 500;
a = zeros(1,n);
tic                %save the time for execution

for i = 1:n
a(i) = max(abs(eig(rand(A))));
end
toc                 % saves time for execution
```

When we execute this code normally, we see that it takes **31.186221 seconds** to complete execution.

Let's now see how long it will take for the optimized one:

```matlab
%% Optimized code
clear all;
tic
parpool             %initialization of the parallel pool
toc
n = 200;
A = 500;
a = zeros(1,n);
tic
parfor i = 1:n
    a(i) = max(abs(eig(rand(A))));
end
toc
```

`Parpool` is used to initialize the parallel pool. There are three ways of initializing the parallel pool.

The first is the explicit way which informs the PC and the code to start its allies, then parallelization of the `parpool`.

The second way is the implicit way. Here, you call the function `parpool` as shown in the code above.

The third is to go down in the left corner and click on the parallel pooling.

![starting parallel pooling](/engineering-education/how-to-perform-parallel-computing-using-matlab/parallel-nine.png)

When we run the code above, it takes 17.300710 seconds for complete execution using two workers as shown below:

```matlab
Starting parallel pool (parpool) using the 'local' profile ...
connected to 2 workers.

ans =

 Pool with properties:

            Connected: true
           NumWorkers: 2
              Cluster: local
        AttachedFiles: {}
    AutoAddClientPath: true
          IdleTimeout: 30 minutes (30 minutes remaining)
          SpmdEnabled: true

Elapsed time is 17.300710 seconds.
```

If you want to run `parpool` on your PC, you have to consider that it is quite hardware intensive. This means that the PC in use must have at least a multicore processor so that each core could become a worker.

The PC should also have some gigs of ram. Particularly, each worker requires at least two gigs, if you are using Matlab operations.

You will need at least 4gigs for a worker if you are using simulant paralyzation.

Lastly, you need some high performance to see the benefits of parallelization.

### Conclusion
Parallel computing is very important when running a huge program. It minimizes the execution time by distributing the work within the CPU. Thus, it helps make good and full use of the CPU.

Again, conducting parallel computing in Matlab is simple. It makes it even more important since it can be applied and used by beginners!

Hope you find this beneficial.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)

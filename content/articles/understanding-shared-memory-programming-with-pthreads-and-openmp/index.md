### Introduction
Shared memory is used to speed up data flow between programs. Depending on the circumstance, programs may operate on one or more processors. The process may have several threads. Threads are are referred to as `lightweight processes.` Parallelism is achieved by threading a process. Browser tabs, for example, are threads. MS Word uses threads to format text, handle input, and many other things. 

This article will demonstrate parallel programming using the Pthreads and OpenMP programming paradigms.

### Preliquisites
To follow along with this tutorial, have the following:
- Have a Linux operating system installed.
- Some beginner knowledge on using the terminal in Linux.
- Beginner knowledge of parallel programming.

### Table of content
- [The system architecture](#The-system-architecture)
- [An overview of shared memory process and threads](#an-overview-of-shared-memory-process-and-threads)
- [Pthreads and their use](#pthreads-and-their-use)
- [OpenMP and its use](#openmp-and-its-use)
- [Conclusion](#conclusion)

### The system architecture
To better understand shared-memory programming, let us first look at the system architecture.

![System architecture](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/system-architecture.png)

Single-core or multi-core processors are used in system architecture. A single-core processor operates one thread, while a multi-core processor runs several threads at a time. There must be a shared memory location for several threads to execute. The threads generate this memory location by allocating a free-access memory space. The threads are separate yet share memory. In the shared memory paradigm, data is not assigned. Changes made to one thread in the shared memory paradigm affect all threads.

### An overview of shared memory process and threads
Shared memory is a memory that many programs access at the same time. This allows processes to communicate with each other without sending requests to the kernel. Shared memory is present in all POSIX and Windows systems. It is necessary to communicate amongst processes to exchange resources. It is usually situated in the process's address space. The shared memory segment must be added to the address space of other applications before usage.

> It is typical for the operating system not to allow a process to access the memory of another process. When using shared memory, two processes must agree to lift this constraint.

A process is a unit of work in a system. The text files are used to develop computer programs, which run as processes. After loading, the program may be divided into stack, heap, text, and data portions.

A thread is a single instance of a sequential computer program. Threads may be implemented at the user or kernel level. The thread management kernel is unaware of user-level threads. Threads may be generated, killed, and their contexts saved and restored using the thread library. 

Threads are controlled and supported natively by the operating system in the kernel. There is no thread management code in the program.  Any application has the potential to be multithreaded. A single process may be responsible for managing the threads of an application.

### Pthreads and their use
Any programming language may utilize Pthreads, which stands for POSIX Threads. It enables a computer to do several tasks at once. Threads are created and managed using the POSIX Threads API. The POSIX Thread API allows for a new concurrent process flow. With many processors or cores, the process flow may be scheduled to run on another processor, enhancing speed.

To understand pthreads let us first know how to create threads.

#### Developing Threads
In developing threads, the following functions are used.

```c++
pthread_create (thread, attr, start_routine, arg) 
```

The `pthread create()` method creates a new thread that is invoking it. The new thread begins execution by calling `start routine()`; arg is passed as the sole argument of `start_routine().`

Let us learn how to kill a thread now that we know how to start one.

#### Closing Threads
In closing threads, the following functions are used.

```c++
pthread_exit (status) 
```

`Pthread_exit` terminates a thread. In most cases, a thread's duty is completed by using `pthread_exit().` Using pthread_exit allows threads to continue running after main(). If not, they will be stopped after the main() method.

Here is a C++ application to illustrate the two actions:

Save the below code as in a UNIX system as `first.c`.

```c++
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

void * WelcomeMessage(void * info)
{
    int information = (int)info;  

    printf("\n Hi and welcome to Section Engineering education - got %d !\n", information);
    pthread_exit(NULL);
}

int main()
{
    int xy;
    pthread_t thread_id;

    int b = 6;

    xy = pthread_create(&thread_id, NULL, WelcomeMessage, (void*)b);
    if(xy)
    {
      printf("\n ERROR: An error message from pthread_create is %d \n", xy);
      exit(1);
    }
    printf("\n A New thread developed (%u)... \n", thread_id);

    pthread_exit(NULL);
}
```
The output of the code will be:

```bash
New thread developed (3179116288)... 

Hi and welcome to Section Engineering education - got 11 !
```

To run the above code in the UNIX system, run the below command:

```bash
gcc first.c -lpthread -o output1
```  

GCC is the software used to run the C++ code in Linux systems. The `-lpthred` command tells the command that the file being compiled is a pthread program. The `-o' specifies the output of the compiled program.

After the code is compiled, an output file is created and saved in the terminal's same directory folder. For our case, the output file will be saved as `output1` as we specified in the command. To view the output, run the below code:

```bash 
./output1
```

The below screenshot shows all the processes involved.

![Process illustration](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/process.png)

#### Uses of pthreads
Pthreads are useful in the following ways:

1. `Build an adaptive user interface` - Threads are useful in user interfaces. Input from the user is processed and displayed in a loop. Processing might take longer in some instances, causing the user to wait. Using a separate thread for long-running tasks may improve software responsiveness. 

2. `Build a web server` - A web server must be capable of downloading huge files in a short period of time. It saves time to start a new thread for each new request. Multiple threads may execute on a large number of processors at the same time.

3. `Building a graphical user interface` - In graphical apps, a windowing system notification asking an app to redo a window portion is expected. Its window will be blank if it is preoccupied. In this scenario, having one thread handle windowing system messages and requests is prudent (as well as user input). If an operation takes more than 0.2 seconds, it is sent to another thread.

### OpenMP and its use
OpenMP is a library for SMP (symmetric multi-processors, or shared-memory processors) parallel programming. All threads in an OpenMP software share memory and data. C, C++, and Fortran are all supported by OpenMP. A header file named omp.h contains the OpenMP functionalities. Sections of an OpenMP application are sequential, while others are parallel. An OpenMP program often begins with a sequential selection that sets up the environment, initializes the variables, etc.

When an OpenMP application is launched, it will utilize one thread (in the sequential portions) and numerous threads (in the parallel sections).

The primary thread is the one that goes all the way from the beginning to the conclusion. Other threads will fork due to the parallel parts of the program. Secondary threads are what they're called.

A particular directive marks a block of code that will be performed in parallel (omp pragma). This directive will induce secondary threads to arise when the execution reaches a parallel portion (indicated by omp pragma). A similar component of the code is executed separately by each thread. When a thread is completed, it is joined to the master. When all threads have been terminated, the master resumes programming in the parallel part.

Each thread has an ID found using the `omp get thread num()` function in the runtime library. The primary thread has the number 0 as its ID.

Use OpenMP directives to:

- define a parallel zone.
- define whether parallel section variables are private or shared.
- define synchronization of threads.
- define loop parallelization.
- indicate the work's threading.
    
#### Creating a thread using OpenMP
Here's what you should do to create a thread using OpenMP:

```c++
#pragma omp parallel 
{

}
```

After this line, the main thread forks multiple instances to do the #pragma construct's task. All threads process the block in parallel. The primary thread will have a thread id of zero.

Let's look at the example code. Save it as `second.c`.

```c++
#include <stdio.h>
#include <stdio.h>

int main(void)
{
    #pragma omp parallel
    {
    printf("Hi and welcome to Section Engineering education.\n");
    }

  return 0;
}
```

To compile the code above, run the command `gcc -fopenmp second.c  -o  second` and view the output using `./second.`

The output is:

```bash
Hi and welcome to Section Engineering education.

Hi and welcome to Section Engineering education.
```

#### Parallelizing loops
How to parallelize loops using OpenMP? OpenMP takes care of the rest with only a few parameters and a loop definition. Isn't it simple?

The directive, Work-sharing concept, must be in a parallel section:

The #pragma omp for command distributes the loop across threads. It must be used with another piece of code:


Let's look at an example program that adds all elements in an array. Save the code as `third.c`.

```C++
#include <stdio.h> 

int main() {

  const int K=100; 
  int a[K]; 

  int x;
  for (x=0; x<K; x++)
    a[x] = x; 

 
  int local_addition, addition; 
#pragma omp parallel private(local_addition) shared(addition) 
  { 
    local_addition =0; 
    
#pragma omp for schedule(static,1)
    for (int x=0; x<K; x++) {
      local_addition += a[x]; 
    }
    
#pragma omp critical 
    addition += local_addition;
  } 


  printf("The addition is =%d should be %d\n", addition, K*(K-1)/2);
}
```

Run the command `cc -fopenmp third.c  -o  third` to compile the program and view the output using `./third.`

The output is:

```bash
The addition is =37714 should be 4950
```

### Conclusion
From the article above, we have learned multithreading and its implementation using the OpenMP and pthreads. Also, we know how to use the Linux terminal to run Cand C++ programs. Use the knowledge learned to understand more Linux systems.
 
 Happy coding!

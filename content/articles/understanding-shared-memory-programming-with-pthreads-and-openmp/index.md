### Introduction
Shared memory is used to speed up data flow between programs. Depending on the circumstances, programs may operate on one or more processors. This is a word used to define inter-thread communication.

The process may have several threads. Threads are `lightweight processes.` Parallelism is achieved by threading a process. Browser tabs, for example, are threads. MS Word uses threads to format text, handle input, and many other things. 

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
To better understand shared-memory programming, first look at the system architecture.

![System architecture](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/system-architecture.png)

Single-core or multi-core processors are used in the system architecture. A single-core processor operates one thread, while a multi-core processor runs several threads. There must be a shared memory location for several threads to execute. The threads generate this memory location by allocating a free-access memory space. The threads are separate yet share memory. In the shared memory paradigm, data is not assigned. Changes made to one thread in the shared memory paradigm affect all threads.

### An overview of shared memory process and threads
Shared memory is a memory that many programs at the same time may access. This allows processes to communicate. Shared memory is present in all POSIX and Windows systems.

It is necessary to communicate amongst processes to exchange memory. It's usually situated in the process's address space. The shared memory segment must be added to the address space of other applications before usage.

> It's normal for the operating system not to allow a process to access the memory of another process. When using shared memory, two processes must agree to lift this constraint.

A process is a unit of work in a system. Text files are used to develop computer programs, which run as processes to do tasks. After loading, the program may be divided into stack, heap, text, and data portions.

A thread is a single instance of a sequential computer program. Threads may be implemented at the user or kernel level.

The thread management kernel is unaware of user-level threads. Threads may be generated, killed, and their contexts saved and restored using the thread library. The kernel controls threads. The software lacks thread management code. The OS natively supports threads in the kernel. Any application may be multithreaded. A single process may manage an app's threads.

### Pthreads and their use
Hardware manufacturers have long used threads in different ways. The variety of implementations makes porting threaded apps challenging.
Threads needed a defined programming interface. This interface is defined by IEEE POSIX 1003.1c (1995). Pthreads are POSIX conforming implementations. Most hardware now supports Pthreads as well as proprietary threads.

To understand threads let's first know how to create threads.

#### Developing Threads
In developing threads, the following functions are used.

```c++
pthread_create (thread, attr, start_routine, arg) 
```

pthread create creates a new thread here. Use this method anywhere in your software. It specifies the C++ code to execute after creating a thread. The attr argument sets thread attributes. Use NULL to show default values. Start routine only accepts one. It must be a void pointer. If none is given, use NULL.

A process's thread count is implementation-dependent. Restarting threads may be peers. The active threads are not supposed to be hierarchical or interconnected.

Let's learn how to kill a thread now that we know how to start one.

#### Closing Threads
In closing threads, the following functions are used.

```c++
pthread_exit (status) 
```

pthread_exit terminates a thread. In most cases, a thread's duty is completed by using pthread_exit().

Using pthread_exit allows threads to continue running after main() (). If not, they'll be stopped after main().

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

"`bash
New thread developed (3179116288)... 

Hi and welcome to Section Engineering education - got 11 !
```

To run the above code in the UNIX system, run the below command:

"`bash
gcc first.c -lpthread -o output1
```  

Gcc is the software used to run the c++ codes in Linux systems. The `-lpthred` in the command tells the command that the file being compiled is a pthread program. The `-o' specifies the output of the compiled program.

After the code is compiled, an output file is created and saved in the terminal's same directory folder. For our case, the output file will be saved as `output1` as we specified in the command. To view the output, run the below code:

```bash 
./output1
```

The below screenshot shows all the processes involved.

![Process illustration](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/process.png)

#### Uses of pthreads
Pthreads are useful in the following ways:

1. `Build an adaptive user interface` - Threads are useful in user interfaces. Input from the user is processed and displayed in a loop. Processing might take longer in some instances, causing the user to wait. Using a separate thread for long-running tasks may improve software responsiveness. An operation may be halted.

2. `Build a web server` - A web server must be able to download large files rapidly. Opening a new thread for each request saves time. Multiple threads can run on many processors at once.

3. `Building a graphical user interface` - In graphical apps, a windowing system notification asking an app to redo a window portion is expected. Its window will be blank if it is preoccupied. In this scenario, having one thread handle windowing system messages and requests is prudent (as well as user input). If an operation takes more than 0.2 seconds, it is sent to another thread.

### OpenMP and its use
OpenMP is an SMP programming package (symmetric multi-processors). Threads in OpenMP exchange memory and data. This includes C++ and Fortran. OpenMP functions are in omp.h. There are sequential and parallel elements to an OpenMP program. It generally entails initializing variables and the environment.

While an OpenMP application may use several threads simultaneously, only one is used sequentially (in the parallel sections). Only the controller thread goes end to end. When software is dismantled, more threads arise. 

This specifies a parallel chunk of code (omp pragma). Whenever a parallel segment is reached, slave threads are established. The parallel code may run on another thread. Threads finish and join the master. Continue until all parallel threads are finished. An omp get thread num() method may get each thread's ID. The controller thread has ID 0. However, OpenMP masks the low-level issues and permits high-level parallel code definition.

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

It forks other threads to do the job in the block following the #pragma construct. Several threads join together to form a coalition. The "master" thread will be identified by thread-id 0. 

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

To compile the code above, run the command `gcc -fopenmp second.c  -o  second` and view the output using `./second`.

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

Run the command `cc -fopenmp third.c  -o  third` to compile the program and view the output using `./third`.

The output is:

```bash
The addition is =37714 should be 4950
```

### Conclusion
From the article above, we have learned multithreading and how it is implemented using the OpenMP and pthreads. Also, we have known how to use the Linux terminal to run Cand C++ programs. Use the knowledge learned to understand more Linux systems.
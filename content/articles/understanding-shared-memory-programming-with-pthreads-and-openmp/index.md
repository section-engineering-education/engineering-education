### Introduction
Shared memory is used to speed up data flow between programs. Depending on the circumstance, programs may operate on one or more processors. As a result, a process may have several threads. Threads are referred to as `lightweight processes.` 

Parallelism is achieved by threading a process. Browser tabs, for example, are threads. Likewise, MS Word uses threads to format text, handle input, and many other things. 

This article will demonstrate parallel programming using the Pthreads and OpenMP programming paradigms.

### Prerequisites
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

System architecture may use single-core or multicore processors. A single-core processor operates one thread, while a multicore processor runs several threads at a time. 

There must be a shared memory location for numerous threads to execute. The threads generate this memory location by allocating a free-access memory space. As much as the threads are separate, they share a memory space. 

In the shared memory paradigm, data is not assigned. Changes made to one thread in the shared memory paradigm affect all the other threads.

### An overview of shared memory process and threads
Shared memory is a memory that is accessed by multiple programs at the same time. It allows processes to communicate with each other without sending requests to the kernel. 

Shared memory is present in all POSIX and Windows systems. Shared memory is necessary for processes to communicate and exchange resources amongst themselves. It is usually situated in the process's address space. Therefore, the shared memory segment must be added to the address space of other applications before usage.

> It is typical for the operating system not to allow a process to access the memory of another process. Therefore, two processes must agree to lift this constraint when using shared memory.

A process is a unit of work in a system. For example, text files are used to develop computer programs, which run as processes. After loading, the program may be divided into stack, heap, text, and data portions.

A thread is a single instance of a sequential computer program that may be implemented at the user or kernel level. However, the thread management kernel is unaware of user-level threads. The thread library is responsible for generating threads, saving the thread contexts and restoring threads.

Threads are controlled and supported natively by the operating system in the kernel. There is no thread management code in the program. Any application has the potential to be multithreaded. A single process may be responsible for managing the threads of an application.

### Pthreads and their use
Any programming language may utilize Pthreads, which stands for POSIX Threads. It enables a computer to do several tasks at once. Threads are created and managed using the POSIX Threads API. The POSIX Thread API allows for a new concurrent process flow. With many processors or cores, the process flow may be scheduled to run on another processor, enhancing speed.

To understand pthreads, let us first know how to create threads.

#### Developing Threads
In developing threads, the following functions are used.

```c++
pthread_create (thread, attr, start_routine, arg) 
```

The `pthread create()` method invokes a new thread. The new thread begins execution by calling `start routine()`; `arg` is passed as the sole argument of `start_routine().`

#### Closing Threads
In closing threads, the following functions are used.

```c++
pthread_exit (status) 
```

`Pthread_exit()` terminates a thread. In most cases, a thread's duty is completed using `pthread_exit().` This method allows threads to continue running after the `main()` function. If not, they will be stopped after the main() method.

Here is a C++ application to illustrate the two actions.

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
   printf("\n A new thread was developed (%u)... \n", thread_id);

   pthread_exit(NULL);
}
```
The output of the code will be:

```bash
A new thread was developed (3179116288)... 

Hi and welcome to Section Engineering education - got 11 !
```

To run the above code in the UNIX system, run the below command:

```bash
gcc first.c -lpthread -o output1
```  

GCC is the software used to run the C++ code in Linux systems.
The `-lpthred` command tells the command that the compiled file is a pthread program. 
The `-o' specifies the output of the compiled program.

After the code is compiled, an output file is created and saved in the terminal's same directory. For our case, the output file will be saved as `output1` as we specified in the command. To view the output, run the below code:

```bash 
./output1
```

The below screenshot shows all the processes involved.

![Process illustration](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/process.png)

#### Uses of pthreads
Pthreads are useful in the following ways:
1. `Build an adaptive user interface` - Threads are useful in user interfaces. Input from the user is processed and displayed in a loop. Processing might take longer in some instances, causing the user to wait. Using a separate thread for long-running tasks may improve software responsiveness. 

2. `Build a web server` - A web server must be capable of downloading huge files in a short period. It saves time to start a new thread for each new request. Multiple threads may execute on many processors simultaneously.

3. `Building a graphical user interface` - Graphical user interface apps expect a request to do a window portion. If it is pre-occupied, the window will be blank. In this scenario, having one thread handle the windowing system messages and requests is prudent (as well as user input). If an operation takes more than 0.2 seconds, it is sent to another thread.

### OpenMP and its use
OpenMP is a library for SMP (symmetric multiprocessors, or shared-memory processors) parallel programming. 

All threads in an OpenMP software share memory and data. C, C++, and FORTRAN are all supported by OpenMP. A header file named omp.h contains the OpenMP functionalities. 

Some sections of an OpenMP application are sequential, while others are parallel. For example, an OpenMP program often begins with a sequential selection that sets up the environment and initializes the variables.

When an OpenMP application is launched, it will utilize one thread (in the sequential portions) and numerous threads (in the parallel sections).

The primary thread is the one that goes all the way from the beginning to the conclusion. On the other hand, the secondary threads will fork due to the parallel parts of the program. 

A particular directive marks a block of code executed in a parallel program. This directive will induce secondary threads to arise when the execution reaches a parallel portion (indicated by omp pragma). 

A similar component of the code is executed separately by each thread. When a thread is completed, it is joined to the master. When all threads have been terminated, the master resumes programming in the parallel part.

Each thread has an ID found in the runtime library using the `omp get thread num()` function. The primary thread has the 0 as its ID.

Use OpenMP directives to:
- Define a parallel zone.
- Define whether parallel section variables are private or shared.
- Define synchronization of threads.
- Define loop parallelization.
- Indicate the work's threading.
   
#### Creating a thread using OpenMP
Here is what you should do to create a thread using OpenMP:
```c++
#pragma omp parallel 
{

}
```

After this line, the main thread forks multiple instances to do the #pragma construct's task. All threads process the block in parallel. The primary thread will have a thread ID of zero.

Let us look at the example code. First, save it as `second.c`.

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

To compile the code above, run the command `gcc -fopenmp second.c -o second` and view the output using `./second.`

The output is:

```bash
Hi and welcome to Section Engineering education.

Hi and welcome to Section Engineering education.
```

#### Parallelizing loops
OpenMP takes care of parallelizing loops with only a few parameters and a loop definition. 

The directive, work-sharing concept, must be in a parallel section:

The `#pragma omp` command distributes the loop across threads. It must be used with another block of code:


Let us look at an example program that adds all elements in an array. Save the code as `third.c`.

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

Run the command `cc -fopenmp third.c -o third` to compile the program and view the output using `./third.`

The output is:

```bash
The addition is =37714 should be 4950
```

### Conclusion
From the article above, we have learned multithreading and its implementation using the OpenMP and pthreads. Also, we learned how to use the Linux terminal to run C and C++ programs. Use the knowledge learned to understand more Linux systems.
 
 Happy coding!

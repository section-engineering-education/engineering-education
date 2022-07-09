---
layout: engineering-education
status: publish
published: true
url: /understanding-shared-memory-programming-with-pthreads-and-openmp/
title: Understanding Shared Memory Programming With Pthreads and OpenMp
description: This article will discuss how to use Pthreads and OpenMP in parallel programming. Threads are referred to as lightweight processes.
author: kelvin-munene
date: 2022-05-04T00:00:00-13:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/hero.png
    alt: Understanding Shared Memory Programming With Pthreads and OpenMp Hero Image
---
Shared memory helps programs communicate faster. Programs may use one or more processors and as a result, a process may have several threads. 
<!--more-->
Threads are referred to as `lightweight processes.` They are referred to as shared lightweight processes because they are formed by dividing a single process into many processes called `threads`.

Threading is a process that achieves parallelism. Parallelism is the simultaneous execution of many processes. 

Browser tabs are threads. The same threading technology is used in Microsoft Word. This article will discuss how to use Pthreads and OpenMP in parallel programming.

### Prerequisites
To follow along with this tutorial, you will need to:
- Have Linux installed. For this article, I used the ubuntu 20.04 terminal to run the programs.
- Have a basic knowledge of C and C++.
- Have basic parallel programming expertise.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [The system architecture](#the-system-architecture)
- [An overview of shared memory process and threads](#an-overview-of-shared-memory-process-and-threads)
- [Managing and redistributing shared memory](#managing-and-redistributing-shared-memory)
- [Pthreads and their use](#pthreads-and-their-use)
  - [Developing threads](#developing-threads)
  - [Closing threads](#closing-threads)
  - [Cancelling a thread](#cancelling-a-thread)
  - [Uncancelable critical sections](#uncancelable-critical-sections)
  - [Uses of pthreads](#uses-of-pthreads)
- [OpenMP and its use](#openmp-and-its-use)
  - [Creating a thread using OpenMP](#creating-a-thread-using-openmp)
  - [Parallelizing loops](#parallelizing-loops)
- [Conclusion](#conclusion)

### The system architecture
System architecture is a conceptual model that specifies a system's structure, behavior, and other details about the sytem. Let us start with the system architecture to better grasp shared memory programming.

![System architecture](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/system-architecture.png)

Systems may have single-core or multi core CPUs. A multi-core CPU processes one thread per core, the memory area where several threads execute. They use free-access memory to build it. As much as the threads are separate, they share a memory space.

Shared memory does not allocate data. Also, changes to one thread affects all others in the shared memory. As an alternative, jobs in a memory passing paradigm share a single address space, which they read and write in separate threads.

### An overview of shared memory process and threads
Multiple applications may access shared memory at the same time. This is possible through the use of shared memory. This helps processes to interact without contacting the kernel.

Shared memory is cruCial in POSIX and Windows. Processes can't interact or share resources without shared memory. 

> often, An operating system does not enable one process to access another's memory. If two processes use shared memory, the constraint must be lifted. 

A process is a unit of work in a system. For example, text files are used to develop computer programs, which run as processes. After loading, the program may be divided into stack, heap, text, and data portions.

A thread is a single instance of a sequential computer program that may be implemented at the user or kernel level. However, the thread management kernel is unaware of user-level threads. 

The thread library handles generation of threads, saving the thread contexts, and restoring threads.

Threads are controlled and supported natively by the operating system in the kernel. There is no thread management code in the program. Any application has the potential to be multithreaded. A single process may be responsible for managing the threads of an application.

### Managing and redistributing shared memory
The `Shmctl` command is used in shared memory management and distribution. The command returns and modifies information about a shared memory area. 

To begin, we need to know the identity of the shared memory section. A struct `shmid_ds` and the second parameter, `IPC_STAT,` are required to get information about a shared memory segment. 

To delete a segment, we supply `IPC RMID` as the second parameter and NULL as the third parameter. Segment removal occurs after all processes that were previously connected have been deleted. 

To prevent exceeding the system-wide limit on the number of shared memory segments, you must manually deallocate each shared memory segment using `shmctl` after you are done with it. `Exit` and `exec` detach memory chunks but do not deallocate them at once when they are called.

The program below illustrates the management and redistribution of shared memory:

```c++
#include <stdio.h>
#include <sys/shm.h>
#include <sys/stat.h>
int main()
	{
		int seg_identifier;
		char *mem_shared;
		struct shmid_ds shmbuffer;
		int section - width;
		const int shared_section - width = 0x6400;
		seg_identifier = shmget(IPC_PRIVATE, shared_section - width,
			IPC_CREAT | IPC_EXCL | S_IRUSR | S_IWUSR);
		mem_shared = (char*) shmat(seg_identifier, 0, 0);
		printf("shared memory attached at address %p\n", mem_shared);
		shmctl(seg_identifier, IPC_STAT, &shmbuffer);
		section - width = shmbuffer.shm_segsz;
		printf("section width: %d\n", section - width);
		sprintf(mem_shared, "Hi, welcome.");
		shmdt(mem_shared);
		mem_shared = (char*) shmat(seg_identifier, (void*) 0x5000000, 0);
		printf("shared memory reattached at address %p\n", mem_shared);
		printf("%s\n", mem_shared);
		shmdt(mem_shared);
		shmctl(seg_identifier, IPC_RMID, 0);
		return 0;
```

The `ipcs` command offers information about shared segments and interprocess communication. We get shared memory info with the `ipcs -m` command. This code uses one shared memory segment (1627649).

The  output of the `ipcs -m` command will be:

```bash
------ Shared Memory Segments ------- 
key shmid owner perms bytes nattch status 
0x00000000 1627649 user 640 25600 0
```

If a program leaves this memory segment behind, you may delete it using the `ipcrm` command shown below. The integers in the code represent the memory segment to be removed.

```bash
ipcrm shm 1627649
```

### Pthreads and their use
Any programming language may utilize Pthreads, which stands for `POSIX Threads`. Pthreads enable a computer to do several tasks at once. 

The POSIX Threads API creates, manages threads, and introduces a new process flow. The process flow may be scheduled to operate on another CPU, increasing speed.

To understand pthreads, let us first know how to create threads.

#### Developing threads
To develop a thread, we use the following function:

```c++
pthread_create (thread, attr, start_routine, arg) 
```

`pthread_create` creates a new thread. The new thread starts by executing `start routine()` with `arg` as the only parameter.

#### Closing threads
To close a thread, we use the following function:

```c++
pthread_exit (status)
```

`Pthread_exit()` terminates a thread. In most cases, a thread's duty is completed using `pthread_exit().` This method allows threads to continue running after the `main()` function. If not, they will be stopped after the main() method.

Here is a C++ application that illustrates the two actions:

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

The output will be:

```bash
A new thread was developed (3179116288)... 

Hi and welcome to Section Engineering education - got 11 !
```

To run the code above in the UNIX system, run the command below:

```bash
gcc first.c -lpthread -o output1
``` 

GCC is the software used to run the C++ code in Linux systems. The `-lpthred` command tells the compiler that the compiled file is a pthread program. The `-o` specifies the output of the compiled program.

After the code is compiled, an output file is created and saved in the same terminal directory. For our case, the output file will be saved as `output1` as we specified in the command. 

To view the output, run the command below:

```bash 
./output1
```

The screenshot below shows all the processes involved:

![Process illustration](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/procedure.png)

#### Cancelling a thread
A thread terminates by using `pthread_exit` or returning from its thread function. However, a thread may seek the termination of another. This is called canceling a thread. 

You may cancel a thread by passing it its `ID`. A canceled thread may be restarted to free up resources.

A thread may be generated as a joinable (default) or detached (optional) thread. A joinable thread is not automatically cleaned away by GNU/Linux as a process. 

Instead, the thread's exit state is stored until another thread performs `pthread_join` to retrieve it. Afterward, its resources are freed. 

A detachable thread cleans up automatically. Detaching a thread prevents another thread from synchronizing or getting its return value through `pthread_join`.

In certain cases, a thread is all or nothing. An allocated thread may use and release resources. Resources may leak if the thread dies during this function. Allowing a thread to select when and if a task is canceled may help.

There are three methods to cancel a thread:
- Asynchronously cancel the thread - Thread cancellation is available at any moment during execution.
- An uncancelable thread may exist in the system at any one time - To cancel the thread, one must make a discreet request.
- The thread may be canceled synchronously - Although the thread may be terminated, it cannot be done at random. Cancellation requests queued for execution may only be canceled at specified stages.

Asynchronous thread cancellation is possible. The thread may be ended, but not at random.

Cancellation requests may only be canceled at certain stages. Threads that are asynchronously cancellable can be interrupted at any moment. 

Asynchronously cancellable threads, on the other hand, may be canceled only at specified times. The thread will wait for cancellation requests.

Asynchronous threads use `pthread_setcanceltype` to cancel a thread. However, the method's thread may have issues. The best option should be to use`PTHREAD_CANCEL_ASYNCHRONOUS` to cancel the thread asynchronously. This variable stores the thread's previous cancellation type. 

#### Uncancelable critical sections
The `pthread_setcancelstate` function prevents a thread from canceling. Like `pthread setcanceltype`, it affects the thread that invokes it. 

We use the `PTHREAD CANCEL DISABLE` or `PTHREAD CANCEL ENABLE` to enable or disable cancellation. If not null, the second parameter corresponds to a variable that stores the operation's previous cancellation status. 

The `pthread_setcancelstate` returns NULL. We use the `pthread_setcancelstate` for critical parts. To put it another way, a crucial section is a block of code that must be executed in full or not at all.

Let us look at an example program that protects an ATM transaction with a critical section:

```c++
#include <pthread.h>
#include <stdio.h>
#include <string.h>
float *atm_bal;
int process_transaction(int off_account, int in_account, float shillings)
{
	int initial_balance;
	if (atm_bal[off_account] << dollars)
		return 1;
	pthread_setcancelstate(PTHREAD_CANCEL_DISABLE, &initial_balance);
	atm_bal[in_account] += shillings;
	atm_bal[off_account] -= shillings;
	pthread_setcancelstate(initial_balance, NULL);
	return 0;
}
```

The program above restricts the ATM payment if the initial balance is less than `off_account` to be used.

> After the crucial section, the prior cancel status must be restored rather than being changed to `PTHREAD_CANCEL_ENABLE`. This approach allows you to securely call the process transaction function from another section. In such a case, your function will be canceled.

#### Uses of pthreads
Pthreads are useful in the following ways:
1. `Building an adaptive user interface` - Threads are useful in user interfaces. Input from the user is processed and displayed in a loop. Processing might take longer in some instances, causing the user to wait. Using a separate thread for long-running tasks may improve software responsiveness.
2. `Building a web server` - A web server must be capable of downloading huge files in a short period. It saves the time required to start a new thread for each new request. Multiple threads may execute on many processors simultaneously.
3. `Building a graphical user interface` - Graphical user interface apps expect a request to do a window portion. If it is pre-occupied, the window will be blank. In this scenario, having one thread handle the windowing system messages and requests is prudent (as well as user input). If an operation takes more than 0.2 seconds, it is sent to another thread.

### OpenMP and its use
OpenMP is an SMP programming package. OpenMP threads share memory and data. This includes C++ and FORTRAN. The OpenMP header file is `omp.h`.

An OpenMP application's parts might be sequential or parallel. For example, an OpenMP program often begins with a sequential selection that sets up the environment and initializes the variables.

When an OpenMP application is launched, it will use one thread (in the sequential portions) and numerous threads (in the parallel sections).

The primary thread is the thread that travels from the start to the end. On the other hand, the secondary threads will fork due to the parallel parts of the program.

A particular directive marks a block of code executed in a parallel program. This directive will induce secondary threads to arise when the execution reaches a parallel portion (indicated by omp pragma). 

Each thread runs a similar piece of code. It joins the master when finished. When all threads have been terminated, the master resumes programming in the parallel part.

The runtime library's `omp get thread num()` method finds each thread's ID. The main thread ID is 0.

We use OpenMP directives to:
- Define a parallel zone.
- Define whether parallel section variables are private or shared.
- Define synchronization of threads.
- Define loop parallelization.
- Indicate the work's threading.
   
#### Creating a thread using OpenMP
Here is the code to create a thread using OpenMP:

```c++
#pragma omp parallel 
{

}
```

After this line, the main thread forks multiple instances to do the #pragma construct's task. The main thread's ID will be 0.

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
OOpenMP takes care of parallelizing loops with only a few parameters and a loop definition. The directive, work-sharing concept, must be in a parallel section.

The `#pragma omp` command distributes the loop across threads. It must be used with another block of code.

Let us look at an example program that adds all elements in an array. Save the code as `third.c`:

```c++
#include <stdio.h> 

int main() 
{

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

The output will be:

```bash
The addition is =37714 should be 4950
```

### Conclusion
From the article above, we have learned multithreading and its implementation using the OpenMP and pthreads. We also learned how to use the Linux terminal to run C and C++ programs. 

Use the knowledge gained from this article to understand more about Linux systems.
 
Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
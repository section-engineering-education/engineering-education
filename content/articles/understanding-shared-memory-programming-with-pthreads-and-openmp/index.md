### Introduction
Shared memory helps programs communicate faster. Programs may employ one or more processors.As a result, a process may have several threads. Threads are referred to as `lightweight processes.` They are referred to as shared lightweight processes since they are formed by dividing a single process to many processes called threads.

Threading a process achieves parallelism. Parallelism is the simultaneous execution of many processes. Browser tabs are threads. The same threading technology is used in MS Word.

This article will show you how to use Pthreads and OpenMP in parallel programming. 

### Prerequisites
To follow this guide, you will need:
- Have Linux installed. For this article, I used ubuntu 20.04 terminal to run the programs.
- Basic C and C++ knowledge. 
- Basic parallel programming expertise.

### Table of content
- [The system architecture](#The-system-architecture)
- [An overview of shared memory process and threads](#an-overview-of-shared-memory-process-and-threads)
- [Managing and redistributing shared memory](#managing-and-redistributing-shared-memory)
- [Pthreads and their use](#pthreads-and-their-use)
- [OpenMP and its use](#openmp-and-its-use)
- [Conclusion](#conclusion)

### The system architecture
System architecture is a conceptual model that specifies a system's structure, behavior, and more about the sytem. Let's start with the system architecture to better grasp shared memory programming.

![System architecture](/engineering-education/understanding-shared-memory-programming-with-pthreads-and-openmp/system-architecture.png)

Systems may have single-core or multi core CPUs. A multi-core CPU processes one thread per core. The memory area where several threads execute. They use free-access memory to build it. As much as the threads are separate, they share a memory space. 

Shared memory does not allocate data. Changes to one thread effect all others in shared memory. As an alternative, jobs in a memory passing paradigm share a single address space, which they read and write in separate threads. 

### An overview of shared memory process and threads
Multiple applications may access shared memory at the same time. This is possible by use of shared memory. This helps processes to interact without contacting the kernel.

Shared memory is crutial in POSIX and Windows. Processes can't interact or share resources without shared memory.
Before using the shared memory segment, other apps must add it to their address space.

> An operating system often does not enable one process to access another's memory. If two processes use shared memory, the constraint must be lifted. 

A process is a unit of work in a system. For example, text files are used to develop computer programs, which run as processes. After loading, the program may be divided into stack, heap, text, and data portions.

A thread is a single instance of a sequential computer program that may be implemented at the user or kernel level. However, the thread management kernel is unaware of user-level threads. The thread library is responsible for generating threads, saving the thread contexts, and restoring threads.

Threads are controlled and supported natively by the operating system in the kernel. There is no thread management code in the program. Any application has the potential to be multithreaded. A single process may be responsible for managing the threads of an application.

### Managing and redistributing shared memory
The `Shmctl` command is used in shared memory management and distribution. The command returns and modifies information about a shared memory area. To begin, we need to know the identity of the shared memory section.

A struct `shmid_ds` and the second parameter, `IPC_STAT,` are required to acquire information about a shared memory segment. '
To delete a segment, supply `IPC RMID` as the second parameter and NULL as the third argument. Segment removal occurs after all processes that were previously connected have been deleted. To prevent exceeding the system-wide limit on the number of shared memory segments, you must manually deallocate each shared memory segment using `shmctl` after you're done with it. Exit and exec detach memory chunks but do not deallocate them once called.

The program below illustrates management and redistribution of shared memory.

```C++
#include <stdio.h> 
#include <sys/shm.h> 
#include <sys/stat.h> 
int main () 
{
 int seg_identifier; 
 char* mem_shared; 
 struct shmid_ds shmbuffer; 
 int section-width; 
 const int shared_section-width = 0x6400;
 seg_identifier = shmget (IPC_PRIVATE, shared_section-width, 
 IPC_CREAT | IPC_EXCL | S_IRUSR | S_IWUSR); 
 mem_shared = (char*) shmat (seg_identifier, 0, 0); 
 printf ("shared memory attached at address %p\n", mem_shared); 
 shmctl (seg_identifier, IPC_STAT, &shmbuffer); 
 section-width = shmbuffer.shm_segsz; 
 printf ("section width: %d\n", section-width); 
 sprintf (mem_shared, "Hi, welcome."); 
 shmdt (mem_shared); 
 mem_shared = (char*) shmat (seg_identifier, (void*) 0x5000000, 0); 
 printf ("shared memory reattached at address %p\n", mem_shared); 
 printf ("%s\n", mem_shared); 
 shmdt (mem_shared); 
 shmctl (seg_identifier, IPC_RMID, 0); 
 return 0; 
```

The `ipcs` command offers information about shared segments and interprocess communication. Get shared memory info with -m. This code uses one shared memory segment (1627649):

The `ipcs -m` command outputs: 

```bash
------ Shared Memory Segments ------- 
key shmid owner perms bytes nattch status 
0x00000000 1627649 user 640 25600 0
```

If a program leaves this memory segment behind, you may delete it using the `ipcrm` command below. The integers in the code represent the memory segment to be removed.

```bash
ipcrm shm 1627649
```

### Pthreads and their use
Any programming language may utilize Pthreads, which stands for POSIX Threads. It enables a computer to do several tasks at once. The POSIX Threads API creates and manages threads. The POSIX Thread API introduces a new process flow. The process flow may be scheduled to operate on another CPU, increasing speed.

To understand pthreads, let us first know how to create threads.

#### Developing Threads
In developing threads, the following functions are used.

```C++
pthread_create (thread, attr, start_routine, arg) 
```

Pthread create() creates a new thread. The new thread starts by executing `start routine()` with arg as the only parameter.

#### Closing Threads
In closing threads, the following functions are used.

```C++
pthread_exit (status) 
```

`Pthread_exit()` terminates a thread. In most cases, a thread's duty is completed using `pthread_exit().` This method allows threads to continue running after the `main()` function. If not, they will be stopped after the main() method.

Here is a C++ application to illustrate the two actions.

```C++
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

#### Cancelling a thread
A thread terminates by using `pthread_exit` or returning from its thread function. However, a thread may seek the termination of another. This is called cancelling a thread. You may cancel a thread by passing it its ID. A canceled thread may be re-started to free up resources.

A thread may be generated as a joinable (default) or detached (optional). A joinable thread is not automatically cleaned away by GNU/Linux as a process. Instead, the thread's exit state is stored until another thread performs pthread join to retrieve it. Then its resources are freed. A detachable thread cleans up automatically. Detaching a thread prevents another thread from synchronizing or getting its return value through pthread join.

In certain cases, a thread is all or nothing.
An allocated thread may use and release resources.
Resources may leak if the thread dies during this function.
Allowing a thread to select when and if a task is canceled may help.

There are three methods to cancel a thread. 
- Asynchronously cancel the thread Thread cancellation is available at any moment during execution.
- An uncancelable thread may exist in the system at any one time. To cancel the thread, one must make a discreet request.
- The thread may be canceled synchronously. Although the thread may be terminated, it cannot be done at random. Cancellation requests queued for execution may only be canceled at specified stages.

Asynchronous thread cancellation is possible. The thread may be ended, but not at random. Cancellation requests may only be canceled at certain stages. Threads that are asynchronously cancellable can be interrupted at any moment. Asynchronously cancelable threads, on the other hand, may be canceled only at specified times. The thread will wait for cancellation requests.

Asynchronous threads using `pthread_setcanceltype`. The method's thread has issues. The first option should be `PTHREAD_CANCEL_ASYNCHRONOUS` to cancel the thread asynchronously. This variable stores the thread's previous cancellation type. 

##### Uncancelable Critical Sections
The `pthread setcancelstate` function prevents a thread from canceling. Like `pthread setcanceltype`, it affects the thread that invokes it. Use `PTHREAD CANCEL DISABLE` or `PTHREAD CANCEL ENABLE` to disable or enable cancellation. If not null, the second parameter corresponds to a variable that stores the operation's previous cancellation status. The `pthread_setcancelstate` returns NULL. Use `pthread_setcancelstate` for critical parts.
To put it another way, a crucial section is a block of code that must be executed in full or not at all.
 
let us look at an example program that protects an ATM transaction with a critical section

```C++
#include <pthread.h> 
#include <stdio.h> 
#include <string.h> 
float* atm_bal; 
int process_transaction (int off_account, int in_account, float shillings) 
{ 
 int initial_balance;  
 if (atm_bal[off_account] << dollars) 
 return 1; 
 pthread_setcancelstate (PTHREAD_CANCEL_DISABLE, &initial_balance); 
 atm_bal[in_account] += shillings; 
 atm_bal[off_account] -= shillings;  
 pthread_setcancelstate (initial_balance, NULL); 
 return 0; 
} 
```

The program above restricts the ATM payment if the initial balance is less than `off_account` to be used.

> After the crucial section, the prior cancel status must be restored rather than being changed to `PTHREAD_CANCEL_ENABLE`. This approach allows you to securely call the process transaction function from another section. In such case, your function will be canceled.

#### Uses of pthreads
Pthreads are useful in the following ways:
1. `Build an adaptive user interface` - Threads are useful in user interfaces. Input from the user is processed and displayed in a loop. Processing might take longer in some instances, causing the user to wait. Using a separate thread for long-running tasks may improve software responsiveness. 

2. `Build a web server` - A web server must be capable of downloading huge files in a short period. It saves time to start a new thread for each new request. Multiple threads may execute on many processors simultaneously.

3. `Building a graphical user interface` - Graphical user interface apps expect a request to do a window portion. If it is pre-occupied, the window will be blank. In this scenario, having one thread handle the windowing system messages and requests is prudent (as well as user input). If an operation takes more than 0.2 seconds, it is sent to another thread.

### OpenMP and its use
OpenMP is an SMP programming package. OpenMP threads share memory and data. This includes C++ and FORTRAN. The OpenMP header file is omp.h.

An OpenMP application's parts might be sequential or parallel. For example, an OpenMP program often begins with a sequential selection that sets up the environment and initializes the variables.

When an OpenMP application is launched, it will utilize one thread (in the sequential portions) and numerous threads (in the parallel sections).

The primary thread is the one that goes all the way from the beginning to the conclusion. On the other hand, the secondary threads will fork due to the parallel parts of the program. 

A particular directive marks a block of code executed in a parallel program. This directive will induce secondary threads to arise when the execution reaches a parallel portion (indicated by omp pragma). 

Each thread runs a similar piece of code. It joins the master when finished. When all threads have been terminated, the master resumes programming in the parallel part.

The runtime library's `omp get thread num()` method finds each thread's ID. The main thread ID is 0.

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

---
layout: engineering-education
status: publish
published: true
url: /fork-in-c-programming-language/
title: Fork() in C Programming Language
description: This tutorial will serve as an introduction to the fork function, which is used to create a copy of processes. We will discuss its detailed implementation with examples.  
author: ahmad-mardeni
date: 2021-02-11T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fork-in-c-programming-language/hero.jpg
    alt: Fork function image
---
You may have seen a lot of processes in your task manager if you are using Windows. Or in your resource monitor if you are using Linux. Did you ever stop to think how these are created? 
<!--more-->
In this tutorial, we will talk about the `fork()` function and then implement some examples in the C programming language.

### Prerequisites
To follow along with this tutorial, you should have:
- A good understanding of the C programming language.
- Some familiarity with Unix-like operating systems.

### What is a process?
According to [Wikipedia](https://en.wikipedia.org/wiki/Process_(computing)#:~:text=In%20computing%2C%20a%20process%20is,execution%20that%20execute%20instructions%20concurrently.), a process is the instance of a computer program that is being executed by one or many threads. It contains the program code and its activity. Depending on the operating system (OS), a process may be made up of multiple threads of execution that execute instructions concurrently.

### What is a Fork()?
In the computing field, **`fork()`** is the primary method of process creation on Unix-like operating systems. This function creates a new copy called the *child* out of the original process, that is called the *parent*. When the parent process closes or crashes for some reason, it also kills the child process.

Let's start with the life-cycle of a process:

![Process life-cycle](/engineering-education/fork-in-c-programming-language/ProcessState.jpg)

[Image Source](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/3_Processes.html)

The operating system is using a unique id for every process to keep track of all processes. And for that, `fork()` doesn't take any parameter and return an int value as following:
- Zero: if it is the child process (the process created).
- Positive value: if it is the parent process.
- Negative value: if an error occurred.
 
*Note*: The following code only runs in Linux and UNIX based operating systems. If you are running Windows, then I recommend you to use [Cygwin](https://www.cygwin.com/). 

Let's jump into the practical section where we will create examples from the simple level to the advanced one.

### Hello world!
```c
#include <stdio.h> 
#include <sys/types.h> 
#include <unistd.h> 
int main() 
{ 
    /* fork a process */
    fork(); 
    /* the child and parent will execute every line of code after the fork (each separately)*/
    printf("Hello world!\n"); 
    return 0; 
} 
```

The output will be:
```bash
Hello world!
Hello world!
```

Where one of the output came from the parent process and the other one from the child process.

![Simple fork](/engineering-education/fork-in-c-programming-language/fork.png)

Simply, we can tell that the result is 2 power of n, where n is the number of fork() system calls. 

For example:
```c
#include <stdio.h> 
#include <sys/types.h> 
#include <unistd.h> 
#include <stdlib.h>
int main() 
{ 
    fork(); 
    fork(); 
    fork(); 
    printf("Hello world!\n");
    return 0; 
} 
```
The result is:
```bash
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
```

Another example is:
```c
int main() {
  if(fork() == 0)
    if(fork())
      printf("Hello world!!\n");
  exit(0);
}
```

I drew a brief sketch to help you understand the idea:

![Fork](/engineering-education/fork-in-c-programming-language/fork1.png)

Inside the first `if` condition a fork has occurred and it is checking if it is the child process, it then continues to execute its code. Otherwise (if its the parent process) it will not go through that `if`. Then, in the second `if`, it will only accept the parent process which holds the positive id. 

As a result, it will print only one "Hello world!".

Now try to execute the following code and compare your result with ours:
```c
int doWork(){
	fork();
	fork();
	printf("Hello world!\n");
}
int main() {
	doWork();
	printf("Hello world!\n");
	exit(0);
}
```

The result will be:
```bash
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
Hello world!
```

![Fork explaination](/engineering-education/fork-in-c-programming-language/fork2.png)

Because when the process that has been forked inside `dowork()` prints `Hello World!` it will continue the main code after the function call and print that `Hello World!` then exits.

### Advanced example 
When a process creates a new process, then there are two possibilities for the execution exit:
- The parent continues to execute concurrently with its child.
- The parent waits until some or all of its children have terminated.
 
 ```c
#include <sys/types.h>
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(int argc, char *argv[]) {
 
	/* fork a child process */
	pid_t pid = fork();

	if (pid < 0) { /* error occurred */
		fprintf(stderr, "Fork Failed");
		return 1;
	}

	else if (pid == 0) { /* child process */
		printf("I'm the child \n"); /* you can execute some commands here */
	}

	else { /* parent process */
		/* parent will wait for the child to complete */
		  wait(NULL);
		/* When the child is ended, then the parent will continue to execute its code */
		  printf("Child Complete \n");
	}
}
```

The wait call system `wait(NULL)` will make the parent process wait until the child process has executed all of its commands. 

The result will be:
```c
I'm the child 
Child Complete 

```

Another example:
 ```c
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>
int main(int argc, char *argv[])
{
	printf("I am: %d\n", (int) getpid());

	pid_t pid = fork();
	printf("fork returned: %d\n", (int) pid);

	if (pid < 0) { /* error occurred */
		perror("Fork failed");
	}
	if (pid == 0) { /* child process */
		printf("I am the child with pid %d\n", (int) getpid());
                printf("Child process is exiting\n");
                exit(0);
        }
	/* parent process */
	printf("I am the parent waiting for the child process to end\n");
        wait(NULL);
        printf("parent process is exiting\n");
        return(0);
} 
```

The result will be something like:
```c
I am: 2337
fork returned: 2338
I am the parent waiting for the child process to end
fork returned: 0
I am the child with pid 2338
Child process is exiting
parent process is exiting
```

That's all for today!🥳 

### Conclusion
We have learned what fork() can do, and how to implement it in the C programming language in unique examples. If you are interested more in the operating system abstractions, and how it is working, then I recommend you to start learning about pipes then semaphores.

Happy coding!

### Further reading
1. [More about fork](https://ops-class.org/slides/2017-02-10-forksynch/)

2. [Pipe with fork](http://www.cse.cuhk.edu.hk/~ericlo/teaching/os/lab/6-IPC1/pipe-fork.html)

3. [What is a semaphore](https://en.wikipedia.org/wiki/Semaphore_(programming)#:~:text=In%20computer%20science%2C%20a%20semaphore,as%20a%20multitasking%20operating%20system.&text=That%20system%20eventually%20became%20known%20as%20THE%20multiprogramming%20system.)

4. [Introduction to Semaphore](https://www3.physnet.uni-hamburg.de/physnet/Tru64-Unix/HTML/APS33DTE/DOCU_010.HTM)

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)

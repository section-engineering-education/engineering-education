---
layout: engineering-education
status: publish
published: true
url: /using-c-sharp-to-demonstrate-lock-in-thread/
title: Using C# to Demonstrate Lock in Thread
description: This article will discuss how to use the lock keyword to obtain a lock for a thread. Lock makes it possible to block a code section while working with another thread.
author: stanley-nganga
date: 2022-02-25T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-c-sharp-to-demonstrate-lock-in-thread/hero.jpg
    alt: Using C# to Demonstrate Lock in Thread Hero Image
---
A lock is a keyword shortcut for obtaining a lock for a thread. The lock keyword makes it possible to block a section of code while working with another thread.
<!--more-->
To enter a section of code where an existing thread already exists, the other thread must wait until the previous thread's execution completes. As soon as the current thread in the function completes, the lock is released.

Thread safety in C# is done via the monitor and lock approach. Execution of one code at a time will ease coding difficulties.

### Prerequisites
To follow along with this tutorial, you should have:
- Background information on the C# programming language.
- An understanding of multithreading in C#.
- [Visual Studio](https://visualstudio.microsoft.com/) installed.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [C# lock in thread](#c-lock-in-thread)
  - [Mutex vs Lock](#mutex-vs-lock)
  - [Lock syntax](#lock-syntax)
- [Working of lock keyword in C](#working-of-lock-keyword-in-c)
- [C# lock implementation](#c-lock-implementation)
- [Understanding monitor in C](#understanding-monitor-in-c)
- [Situations to avoid using the lock keyword](#situations-to-avoid-using-the-lock-keyword)
- [Conclusion](#conclusion)

### C# lock in thread
The lock keyword is used to get a lock for a single thread. A lock prevents several threads from accessing a resource simultaneously.

Typically, you want threads to run concurrently. Using the `lock` in C#, we can prevent one thread from changing our code while another does so. An attempt to use an unlocked code will stop the thread.

Common locking structures include:
- Mutex
- Lock

#### Mutex vs Lock
It is important to note that lock is a compiler keyword rather than a class name. This is a convenient wrapper if you want to use `Monitor` but don't know how to.

The `Monitor` and `Lock` keywords are `AppDomain-only`. We manage the lock and keep the monitor's identification using an instantiated object (a memory location reference).

The `Mutex`, however, is a `.Net` wrapper over an OS mechanism for system-wide synchronization. A mutex is a locking technique for synchronizing resource access. It's the same operating system mutex for two mutexes addressing the same data.

Less time and effort are required to build the lock. The mutex lock has a function of encompassing numerous computer processes.

#### Lock syntax

```C#
lock(object_name) statement_block
```

We will explain the syntax in situations where:
- `object_name` - This is an expression to which the object to be locked is specified. It must be a reference type expression.
- `statement_block` - This specifies the code block to run after a thread lock is gained.

### Working of lock keyword in C#
This section will look at the C# equivalent of a lock. This is to learn how locks operate in C#.

- Using a lock restricts concurrent access to a code block. This is to prevent other threads from interfering.
- To prevent other threads from interfering with the locked one, they must wait or halt until it is done.
- The use of a lock to manage threads is faster and more pleasant.
- The lock is released once the current thread ends, enabling fresh threads to execute.

### C# lock implementation
To understand lock implementation, let us create a C# thread without the lock first. The code sample below shows multi-threading in C# without a lock:

```c#
using System;
using System.Threading;

namespace Threading_without_lock
{
    class lookup
    {
        static void Main(string[] args)
        {
         Thread one = new Thread(PrntChar);
         Thread two = new Thread(PrntChar);
         one.Start();
         two.Start();

         Console.ReadLine();

        }
        public static void PrntChar()
        {
            string strArray = "Hi programmer";

            int y;
            y=0;

                for (y = y; y < strArray.Length; y++)
                {
                    Console.Write($"{strArray[y]}");
                    Thread.Sleep(TimeSpan.FromSeconds(0.1));
                }

            Console.Write(" ");
        }
    }
}
```

Output:

```bash
HHii  pprrooggrraammmmeerr
```

This example utilizes two threads of `PrntChar` function. Due to the lack of a lock statement, many threads will be allowed to use the `PrntChar` function concurrently.

**Let us now look at where there is a lock in the thread:**

To view the C# lock, execute the following code while another thread is running:

```C#
using System;
using System.Threading;

namespace Threading_with_lock
{
  class lookup
  {
// create a thread named identity
    static readonly object Identity = new object ();
    static void output ()
    {
// Enter the lock to the thread
      lock (Identity)
      {
// initialize the integer to be used in the for loop
	int y;
	  y = 4;
// compute the for loop
	for (y = y; y <= 6; y++)
	  {
// Output string and the value of the lock
	    Console.WriteLine ("The output will be: {0}", y);
	  }
      }
    }
    static void Main (string[]args)
    {
      Thread one = new Thread (output);
      Thread two = new Thread (output);
      one.Start ();
      two.Start ();
      Console.ReadLine ();
    }
  }
}
```

Output:

```bash
The output will be: 4
The output will be: 5
The output will be: 6
The output will be: 4
The output will be: 5
The output will be: 6
```

The preceding program declares a `Threading_with_lock` namespace. Afterward, a `lookup` class is generated and a lock-defining object is built.

A display method is created and executed with the lock to prevent other threads from interfering with the current thread's execution. After the object is created, the keyword `lock` encrypts it. Because we used the lock on display method, the results appear sequentially.

### Understanding monitor in C#
A monitor is a method for determining that only one thread at a time may be performing a given portion of code. A monitor has a lock and only one thread at a time may access it.

The monitor synchronizes object access. It's possible to achieve this by obtaining a significant lock.

A monitor is similar to a lock but the user may regulate how many threads sharing the same code lock are synchronized by using the monitor function. Other threads cannot view the owner's application code lock unless they use a separate locked object to execute it.

The monitor class provides the following methods for synchronizing code access through locks:
- Monitor.Enter
- Monitor.TryEnter
- Monitor.Exit

Objects rather than value types are locked. In both cases, the value type parameter is sent to both `Enter` and `Exit`, but it is packaged differently.

When alerted, `Wait` releases the lock. `Wait` returns to reclaim the lock once notified. The next thread in the wait queue requires `Pulse` and `PulseAll` signals:

```C#
using System;
using System.Diagnostics;
using System.Threading;
namespace Demo
{
    class Inspect
    {
        public static object locks = new object();

        public static void Values()
        {
            Monitor.Enter(locks);
            try
            {
                for (int z = 1; z <= 4; z++)
                {
                    Thread.Sleep(750);
                    Console.WriteLine(z + "");
                }

            }
            finally
            {
                Monitor.Exit(locks);
            }
        }

        private static void TrialLock()
        {

            lock (locks)
            {
                Thread.Sleep(750);
                Console.WriteLine(DateTime.Now);
            }
        }

        public static void Main(string[] args)
        {

           Thread[] mythread = new Thread[2];
            for (int Op = 0; Op < 2; Op++)
            {
                mythread[Op] = new Thread(new ThreadStart(Values));
                mythread[Op].Name = " " + Op;
            }
            foreach (Thread td in mythread)
                td.Start();

            Console.WriteLine(mythread);
        }
    }
}

```

Output:

```bash
System.Threading.Thread[]
1
2
3
4
1
2
3
4
```

The `Inspect` class is static and cannot be instantiated. The `Inspect` class utilizes the `Monitor.Enter`, `Monitor.TryEnter`, and `Monitor.Exit` methods.

The monitor can be used once a code area has been locked; you can use the `Monitor.Wait`, `Monitor.Pulse`, and `Monitor.PulseAll` methods. On-demand, it is linked to a specific object. The fact that it's unbound implies that it may be called from anywhere.

### Situations to avoid using the lock keyword
In the following circumstances, do not use the `lock` keyword:
1. Using lock on value types instead of reference types results in a compile-time error.
2. To avoid thread deadlocks, use private reference variables instead of this keyword.
3. On a string object - Interned strings are global and can be halted by other threads without your knowledge. Avoid locking string objects.

### Conclusion
A lock prevents several threads from accessing a resource simultaneously. It is released when the current thread ends, allowing other threads to run. Mutex and monitor are the fundamental locking constructs.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

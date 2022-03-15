---
layout: engineering-education
status: publish
published: true
url: /working-with-coroutine-in-python/
title: Working with Coroutines in Python
description: This article will explain how to use coroutines in Python. We will also differentiate between coroutines and subroutines.
author: stanley-nganga
date: 2021-12-01T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/working-with-coroutine-in-python/hero.jpg
    alt: Coroutines in Python
---
Expanded subroutines are referred to as coroutines. A process willingly relinquishes control on a periodic or idle basis to enable other programs to run at the same time. This is known as cooperative multitasking.
<!--more-->
In Python, generators are functions that construct iterators. When the generator wants to return a result, it uses the same syntax as a function, but instead of using `return`, we use `yield`.

With a few more methods and slight variations in yield statements, coroutines vary from Python's generators. 

To follow along, you should be familiar with Python's generators.

### Table of contents
- [What are coroutines in python](#what-are-coroutines-in-python)
- [Coroutines Vs Subroutines](#coroutines-vs-subroutines)
- [How different is coroutine from threads](#how-different-is-coroutine-from-threads)
- [Coroutines in a Python program](#coroutines-in-a-python-program)
- [Coroutines execution](#coroutines-execution)
- [How to close coroutines](#how-to-close-coroutines)
- [Constructing a pipeline using chained coroutines](#constructing-a-pipeline-using-chained-coroutines)

### What is a coroutine in Python?
A coroutine is a function that can pause and resume its execution.

A process that willingly relinquishes control of itself might benefit from using coroutines (periodically). You can run programs simultaneously while a coroutine is idle.

Generators differ from coroutines due to yield statements utilization.

### Coroutines vs subroutines
- Coroutines may be accessed from numerous locations while the main function is the sole point of entry for subroutines.

- Corporative coroutines build a pipeline structure while they are being executed. But while using subroutines, you may create an executable with a linear flow.

- Suspension and resumption are from a single point in subroutines while in coroutines they are from multiple points. In coroutines, we can still resume execution from where it was interrupted.

- Python coroutines do not have a primary function to arrange and coordinate their execution. Subroutines have the main function for controlling and coordinating subroutine execution in python.

### How different are coroutines from threads?
The operating system runs threads proactively as per its scheduler, which is an algorithm in the operating system kernel.

Activities are collaboratively multi-tasked by stopping and restarting functions at predetermined times. This is accomplished through the use of coroutines.

### Coroutines in a Python program
Coroutines will use the `send()` method to transmit names, and only those with the prefix "Student" will be displayed at the end.

```python
def print_cognomen (prfx):
    print("The coroutine object is looking for the prefix: {}".format(prfx))
    while True: 
    GivenCognomen = (yield) 
    if prfx in GivenCognomen:
      print(GivenCognomen) 

CorouteObject = print_cognomen("Student")

cognomen_a = input("Fill 1st cognomen : ") 
cognomen_b = input("Fill 2nd cognomen : ") 
cognomen_c = input("Fill 3rd cognomen : ") 

CorouteObject.__next__() 
CorouteObject.send(cognomen_a) 
CorouteObject.send(cognomen_b) 
CorouteObject.send(cognomen_c)
```

#### Output

```txt
Fill 1st cognomen : 
Johson 
Fill 2nd cognomen : 
Gitau
Fill 3rd cognomen : 
Ngure
The coroutine object is looking for the prefix.: Student
```

In the above code, the names were sent to the function's coroutine using the `send()` technique. 

The output shows only the names that march the prefix `Student`. In this context, `Student` has been used as a coroutine keyword.

### Coroutines execution
Python coroutines and Python generators have a lot in common. However, program execution only begins when a coroutine is called.

Execution begins when the `__next__()` method is invoked. 

The coroutine's execution then comes to a halt as it awaits the value to be sent to the object. 

Each time a new coroutine object receives a value, it first checks to determine whether the specified prefix is present before printing the output.

The `__next__()` expression is repeated until you see `name = (yield)`.

### How to close coroutines
The `close()` method must be called to stop a coroutine. 

The `GeneratorExit` exception is captured by halting the coroutine first. This is our usual method for collecting exceptions.

```python
def print_cognomen(prfx): 
    print("The coroutine object is looking for the prefix: {}".format(prfx)) 
    try: 
        while True: 
          GivenCognomen = (yield) 
          if prfx in GivenCognomen:
              print(GivenCognomen) 
    except GeneratorExit:
        print("The coroutine has been shut off.!!")

CorouteObject = print_cognomen("Student")

CorouteObject.__next__()

CorouteObject.send("Kelvin") 
CorouteObject.send("Student Johnson Murie") 
CorouteObject.send("Student Brian Mumo")

CorouteObject.close()
```

#### Output

```txt
The coroutine object is looking for the prefix: Student
Student Johnson Murie
Student Brian Mumo
The coroutine has been shut off.!!
```

> Note that if you try to send data to coroutine objects after the coroutine has been terminated, a `StopIteration exception` will be thrown.

### Constructing a pipeline using chained coroutines
Coroutines may be used to configure pipes. For example, we may use the `send()` function to connect coroutines and send data through the pipe.

The following are some of the pipe's requirements:
- The whole pipeline is descended from a single source (the producer). In most cases, the producer is a simple procedure rather than a coroutine.

- The final destination of the pipe is a sink. All data might be collected and shown in a sink.

The following is an example of a coroutine program with a pipeline structure.

```python
def creator(StatedPhrase, AdjacentCoroutine): 
  notes = StatedPhrase.split(" ") 
  for note in notes:
    AdjacentCoroutine.send(notes) 
  AdjacentCoroutine.close() 

def model_seep(SearchModel = "ing", AdjacentCoroutine = None): 
  print("We are looking for terms that conclude with{}".format(SearchModel))
  try: 

    while True: 
      note = (yield) 
      if SearchModel in note: 
        AdjacentCoroutine.send(notes) 
  except GeneratorExit:
    print("Done filtering filled sentences.!!")

def print_note(): 
  print("I'm a pipeline sink who prints the specified notes.") 
  try: 
    while True: 
      note = (yield) 
      print(note)
  except GeneratorExit: 
    print("Finished printing.!")

PrintNote = print_note()
PrintNote.__next__()

ModelSeep = model_seep(AdjacentCoroutine = PrintNote) 
ModelSeep.__next__()

StatedPhrase = "Dickson mutei is chasing a fast train." 
creator(StatedPhrase, ModelSeep)
```

#### Output

```txt
I'm a pipeline sink who prints the specified notes.
We are looking for terms that conclude withing
Done filtering filled sentences.!!
Finished printing.!
```

In the above code, a pipeline may take advantage of a variety of coroutines and data filtering methods. 

We may observe the filtered data in the pipeline's output.

### Conclusion
In this tutorial, we have discussed what coroutines are, as well as how to implement and manage them. 

Coroutines are different from threads and subroutines since they can be paused and restarted easily.

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)

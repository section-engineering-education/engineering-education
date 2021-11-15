### Introduction
Expanded subroutines are referred to as coroutines. A process willingly relinquishes control on a periodic or idle basis to enable other programs to run at the same time, which is known as cooperative multitasking.

With a few more methods and slight variations in yield statements, coroutines vary from Python's generators. Data may be consumed by coroutines in the same way that data is generated for iteration.

The reader should already be familiar with Python's generators.

### Table of contents
- [What are coroutines in python](#what-are-coroutines-in-python)
- [Coroutines Vs Subroutines](#coroutines-vs-subroutines)
- [How different is coroutine from threads](#how-different-is-coroutine-from-threads)
- [Coroutines in a program in python](#coroutines-in-a-program-in-python)
- [Coroutines execution](#coroutines-execution)
- [How to close coroutines](#how-to-close-coroutines)
- [Constructing a pipeline via the use of chained coroutines](#constructing-a-pipeline-via-the-use-of-chained-coroutines)

### What is a coroutine in Python?
A coroutine is a function that can pause and resume its execution.
Throughout a length of time, a process that is willingly relinquishing control of itself might benefit from using coroutines (periodically). You run programs simultaneously while a coroutine is idle.

Yield statements utilization and some extra methods make generators differ from coroutines.

### Coroutines Vs Subroutines
1. Coroutines may be accessed from numerous locations while the main function is the sole point of entry for subroutines.
2. Corporative coroutines build a pipeline structure while they are being executed but while using subroutines, you may create an executable with a linear flow.
3. Suspension and resumption are from a single point in subroutines while in coroutines is from multiple points. In coroutines, we can still resume execution from where we interrupted it.
4. The main function shows the results of data processing in subroutines unlike in coroutines where the output of a coroutine may be seen.
5. Python coroutines, do not have a primary function to arrange and coordinate their execution, unlike subroutines which have the main function for controlling and co-ordinating subroutine execution in python.

### How different are coroutines from threads?
- With threads, the operating system changes running threads proactively as per its scheduler, which is an algorithm in the operating system kernel.
- Activities are collaboratively multi-tasked by stopping and restarting functions at predetermined times, it can sometimes be within a single thread. This is accomplished through the use of coroutines.

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

#### Description
The names were sent to the function's coroutine using the `send()` technique. As the output shows only the names that march the prefix `Student` has been reported. `Student` has been used as a coroutine keyword.

### Coroutines execution
Python coroutines and Python generators have a lot in common, as do many other types of Python code. Unless and until the coroutine is called in a program, nothing else happens.

Execution begins when `_next_()` is invoked. The initial expression is performed when invoked.

The coroutine's execution comes to a halt as it awaits the value to be sent to the coroutine object. Each time a new coroutine object receives an initial value, it first checks to see whether the specified prefix is present before printing the name with that prefix. For as long as you're using this phrase, you'll keep seeing it until you run across the `name = (yield)` expression again.

### How to close coroutines
The program's `close()` method must be called to stop a coroutine. The `GeneratorExit` exception may be captured by halting the coroutine first, which is our usual method of collecting exceptions.

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

Bear in mind that if you try to send data to coroutine objects after the coroutine has been terminated a `StopIteration exception` will be thrown.

### Constructing a pipeline via the use of chained coroutines
Coroutines may be used to configure pipes. For example, we may use `Send()` to connect coroutines and send data through the pipe.

The following are some of the pipe's requirements:
- The whole pipeline is descended from a single source (the producer). In most cases, the producer is a simple procedure rather than a coroutine.
- The final destination of the pipe is a sink. All data might be collected and shown in a sink.

The following is an example of a program for coroutine with a pipeline structure.

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

#### Description
A pipeline may take advantage of a variety of coroutines and data filtering this way. We may observe the filtered or resulting data that has been displayed by looking at the output of the pipeline.

### Conclusion
In this tutorial, I have taken you through what coroutines are as well as how to execute and also close them. Coroutines are different from threads and subroutines and have been covered as well.
Happy learning!

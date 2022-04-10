---
layout: engineering-education
status: publish
published: true
url: /qiskit-for-quantum-computing/
title: Qiskit for Quantum Computing
description: This tutorial aims to introduce our readers to Quantum computing. It also introduces them to the Qiskit toolkit and lets them experiment using Jupyter Notebooks hosted in IBM Quantum Lab.  
author: monica-dalmas
date: 2022-04-06T00:00:00-01:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/qiskit-for-quantum-computing/hero.png 
    alt: Qiskit for Quantum Computing Hero image
---
For most of us, it is hard to wrap our heads around the world of quantum computing. Most people have heard of it, but a lot of information about it glosses over important details. 
<!--more-->
This tutorial aims to clear this up and introduce you to Quantum computing. With the help of an open-source toolkit such as Qiskit, we'll introduce our readers to the toolkit and let them experiment using Jupyter Notebooks hosted in IBM Quantum Lab. 

### Quntum computers
Quantum computers solve problems differently from the classic computers that we are familiar with. Quantum computers have several advantages over classical computers for solving certain problems. It is attributed to their ability to exist in several different states simultaneously. On the contrary, classical computers can only be in one state at a time.

To understand how quantum computers work, you need to understand three vital things:

- Superposition.
- Entanglement.
- Interference.

#### Superposition
The building blocks of classical computers are called `bits`. The building blocks of quantum computers are called quantum bits or `qubits`. The quantum bits work fundamentally in different ways. A classical bit acts like a switch which can be either a `0` or a `1`, popularly referred to as binary information. When we measure a bit, we get back the state that it's currently in. This isn't the case for qubits. 

You can think of qubits as arrows pointing in 3D space. If they point upwards, they are in the `0` state. If they point downwards, they are in the `1` state. This is the same with classical bits. But they also have an option to be in a superposition state. This is a state whereby an arrow points in any other direction. This superposition state is a combination of both `0` and `1`.

When you measure a qubit, the output it gives will still end up being either a `1` or a `0`. But, it depends on a probability that is set by the direction of the arrow. If the arrow is pointing more downwards, you are more likely to get a `1`, and if it points upwards, you are more likely to get a `0`. If the arrow is in the middle, you will get a 50% probability for each. That's superposition explained in a nutshell.

#### Entanglement
In a classical computer, the bits are independent of each other. The state of one bit is not influenced by the state of the other bit. In quantum computers, the qubits can be entangled with each other. This means that they become part of one large quantum state together. 

For example, we can take an example of two qubits that are each in different superposition states but are not entangled yet. Their probabilities are currently independent of each other. When we entangle them, we have to throw away those independent probabilities and calculate a probability distribution of all the possible states we can get out, i.e., `00, 01, 10, and 11`. 

Because the qubits are entangled, if you change the direction of the arrow on one qubit, it changes the probability distribution of the whole system. The qubits are no longer independent of each other. They are all part of the same large state. This case holds no matter how many qubits you have.
 
A quantum computer of `n` qubits can be in a combination of `2^n states`. For example, for one qubit, you have a probability distribution over two states. For two qubits, you have a probability distribution over four states, etc. This is the core difference between classical and quantum computers. Classical computers can be in any state you want, but, one at a time. Quantum computers can be in a superposition of all those states simultaneously.

How can being in all those states simultaneously help the computer? That is where the final component of interference comes in.

#### Interference
The state of a qubit is described by a quantum wave function. Wave functions are the fundamental mathematical description of everything in quantum mechanics. When you have many qubits entangled together, all of their wave functions are added together into an overall wave function describing the state of the quantum computer. Adding together these wave functions is what is referred to as interference. 

Like with ripples of water, when we add waves together, they can constructively interfere and add together to make a bigger wave. They can also destructively interfere to cancel each other out. The overall wave function of the quantum computer is what sets the different probabilities of the different states. By changing the states of different qubits, we can change the probabilities that different states will come out when we measure the quantum computer.

Even though the quantum computer can be in a superposition of many states simultaneously, we only get a single state out when we measure it. So, when using a quantum computer to solve a computation task, you need to use constructive interference to increase the probability of getting the correct answer, and destructive interference to decrease the probability of an incorrect answer. 

### What is Qiskit
Qiskit is a software framework funded by IBM to make it easier for people to get into the world of the quantum computer. Since it is not easy to get access to a quantum computer, you can get access to one through a cloud provider such as IBM with their Qiskit toolkit. It is free to access, and all of its code is open source. There is an online [textbook](https://qiskit.org/textbook-beta) that teaches you all the quantum basics, especially for people not familiar with quantum physics. Their [YouTube channel](https://www.youtube.com/c/qiskit) also has valuable resources full of excellent tutorials and lectures. Feel free to check it out.

Qiskit toolkit is written in Python. So, if you are proficient in the Python programming language, a lot of code will be familiar to you. The software framework is ideal for people who want to learn about quantum computing and get some actual hands-on experience. In terms of experimenting with quantum algorithms, you can run through examples of quantum circuits using their online tools.

### How to install Qiskit
To install qiskit, you have two options. You can install it locally on your local computer or the Jupyter Notebook hosted by IBM. To install locally on a Linux machine, write the following code:

```bash
pip install -U pip && pip install qiskit
```
> This installation is for Linux machines. For Windows and macOS users, head on to the main website and select the appropriate machine you're using. A different installation code will be generated. Python version 3.6 and above is preferred.

To get started online at IBM, we need to sign up [here](https://lab.quantum-computing.ibm.com) to get the API token that permits us to use their quantum devices. You can think of this are running Jupyter Notebook online with Qiskit installed.

> Remember your API token is your access code to IBM's quantum devices.

You can get it by going to your `Profile` option on the top-right corner of the webpage and clicking the `Account details` option. In the API token section, you'll get your API token hidden from view in `***`. Copy it and paste it inside the following code:

```python
from qiskit import IBMQ
IBMQ.save_account('YOUR API KEY')
```
Once you run this code, your API token is saved onto your computer, and now you can access IBM's quantum devices. To see if you have access to these devices, type in:

```python
IBMQ.load_account()
```
If the above code executes, you should be able to run code not just on your computer, but also by sending the quantum circuits that you build to IBM's quantum devices and getting results. 

So, we can get started building our first quantum algorithm from the circuits library. We begin by importing the necessary dependencies that we will use in our project from Qiskit.

```python
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, Aer, execute
from qiskit.visualization import plot_histogram
from qiskit import IBMQ

IBMQ.load_account()
```
Next, we build a two-qubit quantum register followed by a two-classical bit, classical register.

```python
qr = QuantumRegister(2)
cr = ClassicalRegister(2)
```
So, now we have built a Quantum register and a classical register. We can build a circuit using those two as shown below:

```python
circuit = QuantumCircuit(qr, cr)
```
Now we've created a Quantum circuit. If at any point that we modify the circuit, you want to draw what the quantum circuit looks like, you can do so by writing the following code:

```python
circuit.draw()
```
![Circuit](/engineering-education/qiskit-for-quantum-computing/circuit.png)

From the drawing, we can see that we have two quantum bits and two classical bits in the circuit.

As it is, this circuit is not interesting as we have no gates. Let's now build up the quantum gates into the circuit. Quantum gates are the building blocks of quantum circuits, like classical logic gates (AND, OR gates) are for conventional digital circuits. To create entanglement, the first step is to apply what is known as the [Hadamard gate](https://en.wikipedia.org/wiki/Quantum_logic_gate) onto the first qubit.

```python
circuit.h(qr[0])
```
We are going to now add a two-qubit, `controlled x` operation using the following code:

```python
circuit.cx(qr[0], qr[1])
```
- `0` is the control qubit, and `1` is the target qubit. At this point, our circuit is composed of a `Hadamard (h)` and the `Controlled Not (cx)` operators. With these two simple operations, we are now able to generate entanglement between `q50` and `q51`, as shown below:

![Entanglement](/engineering-education/qiskit-for-quantum-computing/entanglement.png)

Now that we've built our quantum circuit using these two operators, let's measure the quantum bits (qubits), take those measurements, and store them into the classical bits. Let's write the code to do that:

```python
circuit.measure(qr, cr)
```
The image below shows what our circuit looks like:

![Final](/engineering-education/qiskit-for-quantum-computing/final-circuit.png)

The next step is to execute the circuit on the classical computer simulator.

```python
backend = Aer.get_backend('qasm_simulator')
execute(circuit, backend)
```
We have executed the circuit. Let's check the results that came out of that execution.

```python
backend = Aer.get_backend('qasm_simulator')
result = execute(circuit, backend).result()
```
The `result` variable holds the information coming from executing that circuit. Using `plot_histogram`, let's visualize these results.

```python
plot_histogram(result.get_counts(circuit))
```
![Histogram](/engineering-education/qiskit-for-quantum-computing/histogram.png)

That's the result of executing our quantum circuit. We get about a 50% probability for `00` and a 50% probability for `11`. You've successfully built your first quantum computer circuit. Though not covered in this tutorial, you can send your quantum circuit out to a quantum device at IBM to see the results from running this circuit on a quantum device.

### Wrapping up
This tutorial sets you up to run code on a real quantum computer. We've successfully created our first quantum application. We recommend that you go through the tutorial on Qiskit's website as this tutorial only scratches the surface. Good luck coding quantum circuits on your own.

Happy coding!

### Further reading
- [Qiskit](https://qiskit.org/)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)

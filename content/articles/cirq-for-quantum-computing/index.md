---
layout: engineering-education
status: publish
published: true
url: /cirq-for-quantum-computing/
title: Cirq for Quantum Computing
description: This tutorial will give the reader an overview of the Cirq framework and demonstrate how one can use it to learn about Quantum computing.
author: lilian-tonia
date: 2022-05-20T00:00:00-10:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/cirq-for-quantum-computing/hero.png 
    alt: Cirq for Quantum Computing Hero Image
---
This tutorial will give an overview of the framework and demonstrate to readers how they can use this framework to learn about Quantum computing.
<!--more-->

### Prerequisite
To follow along with this tutorial, you need to have:
- Basic knowledge in Quantum Computing.
- Google Colab or Jupyter notebook.
> We will use Google Colab for this build.  

### Outline
- [An Brief History](#a-brief-history)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### A Brief History 
In 2019, Google announced that it had reached a quantum advantage. Quantum advantage is the threshold where a quantum computer can outperform a classical computer for a certain problem. This was a huge achievement in the world of quantum computers.

There is several Google Quantum Hardware that has been used by the Google Research team to date. [Foxtail](https://quantumai.google/cirq/google/devices#foxtail) is one of the hardware devices that was released in 2016, [Bristlecone](https://quantumai.google/cirq/google/devices#bristlecone) is a 72-qubit device and was released in 2018, and most recently, [Sycamore](https://quantumai.google/cirq/google/devices#sycamore) released in 2019. 

Sycamore is the 54-qubit quantum hardware device that was used to reach the quantum advantage mentioned above. These results are published in the, [Quantum supremacy using a programmable superconducting processor](https://www.nature.com/articles/s41586-019-1666-5) research paper in the Nature journal.  

Cirq is a quantum computing programming language. It is an open-source Python framework for writing, manipulating, and optimizing quantum circuits. It is used to run these programs on simulators and real quantum computers. 

### Implementing an example
To get Cirq installed in your notebook, we will perform a quick `pip` install.

```bash
!pip install cirq
```
The next step involves importing Cirq into our notebook. We import it by writing the following code:

```python
import cirq
```
Next, we need to define the two qubits that we need to use for this circuit.

```python
x = cirq.NamedQubit("x")
y = cirq.NamedQubit("y")
```

With classical computing, there is a set of commonly known gates; AND, OR, NAND, NOR, and XOR. These gates perform any form of computing in classical computers. But, they are irreversible because the information is lost.

What do we mean when we say it is irreversible?

For example, if we do an `AND` gate and we get an output of `0`. For this case, we don't know if the first gate was `1` and the second gate was `0`. Or that both of the two inputs were `0`. 

We tend to lose that information in this process. In addition, [fanout](https://en.wikipedia.org/wiki/Fan-out), a technique used in classical computing, requires the cloning of states. But, this technique is prohibited by the [no-cloning](https://en.wikipedia.org/wiki/No-cloning_theorem) theorem in quantum computing. 
 
Since we cannot use these sets of classical gates, we'll use Quantum gates. 

Quantum computing has its own set of special gates. You can learn about them [here](https://en.wikipedia.org/wiki/Quantum_logic_gate). But, two popular gates that enhance the power of quantum are superposition and quantum entanglement. 

Using a [Hadamard (H) gate](https://www.quantum-inspire.com/kbase/hadamard/), we can put a qubit into a superposition state. Additionally, using a [CNOT gate](https://www.quantum-inspire.com/kbase/cnot/) to entangle these two qubits.

Let's build the circuit by adding these two gates to our circuit.

```python
q_circuit = cirq.Circuit(
    cirq.H(x),
    cirq.CNOT(x, y),
    cirq.measure(x, y)
)
```
- `cirq.measure(x, y)`: We use the `measure()` method and pass the two qubits that we want to measure.
- `cirq.H(x)`: We apply the Hadamard gate onto the `x` qubit.
- `cirq.CNOT(x, y)`: Qubit `x` is the control qubit while qubit `y` is the target qubit.

We can now print the circuit and take a look. We use Python's `print()` method for this task.

```python
print(q_circuit)
```
Output:

![Circuit](/engineering-education/cirq-for-quantum-computing/circuit.jpg)

From the image, we can see the Hadamard gate on qubit `x`, and the `CNOT` gate on qubit `x` and `y`. The `M` on both qubits represents the measurements.

Now that we have built the circuit, let's run it on the simulator. We perform this step by writing the following code:

```python
simulator = cirq.Simulator()
output = simulator.run(q_circuit, repetitions = 20)
print(output)
```
We usually run circuits a lot of time to get the results. That is why we are running the simulator for `20` repetitions. 

The results of this run is shown below:

```bash
x,y=11011000000111111111, 11011000000111111111
```
The Hadamard gate puts the first qubit in equal superposition of `0` and `1`. This means that there is a 50% chance of a qubit being `0` upon measurement and a 50% chance of it being `1` upon measurement.

What would happen if we wanted to add an [X](https://qiskit.org/textbook/ch-states/single-qubit-gates.html#xgate) (a bit-flip) gate? 

Let's add an `X` gate to qubit `y`, and see whether our result will be different.

```python
q_circuit = cirq.Circuit(
    cirq.H(x),
    cirq.X(y),
    cirq.CNOT(x, y),
    cirq.measure(x, y)
)
```
Output:

![X-gate](/engineering-education/cirq-for-quantum-computing/x-gate.jpg)

After repeating the above simulator steps shown above, we get the results:

```bash
x,y=00111100001111101000, 11000011110000010111
```
We can see that if qubit `x` is in the `1` state, CNOT activates and the initial `1` state becomes a `0` state.

We have successfully implemented a circuit using Cirq and harnessed the power of superposition and entanglement. You can use this [link](https://colab.research.google.com/drive/1hi-dVmcLkE3NQZS_E407vKyizdpzLIF-?usp=sharing) to access the complete code for this tutorial.

### Wrapping up
Currently, Cirq does not give the public access to the real quantum computer that Google has. Unless you are among the approved partners. Even though you might not have access to their machines now, you can still use the Cirq programming language, build some quantum circuits, and pass them along to the quantum simulator. 

### Further reading
- [Cirq](https://quantumai.google/cirq).
- [GitHub](https://github.com/quantumlib/cirq).
- [Quantum supremacy using a programmable superconducting processor](https://www.nature.com/articles/s41586-019-1666-5).
- [Option Pricing using Quantum Computers](https://arxiv.org/pdf/1905.02666.pdf).

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)

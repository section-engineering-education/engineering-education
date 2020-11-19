## Forward and Backward Chaining in Artificial Intelligence

Backward and forward chaining are methods of reasoning that exist in the Expert System Domain of artificial intelligence. 

### Introduction to the Expert System
Backward and forward chaining originate from the expert system. The expert system has three main components: user interface, inference engine, and knowledge base. 

These three components play specific roles. High-quality and domain-specific knowledge is stored in the knowledge base. The user interface enables users of the system to interact with the expert system.

The inference engine is a component in which logical rules are applied to the knowledge base to get new information or make a decision. This component progresses in two modes: forward and backward chaining. These types of chaining are employed by the inference engine to deduce information. 

![Expert System](/engineering-education/forward-and-backward-chaining-in-ai/expert-system.jpg)
[Image Source: Tutorials Point](https://www.tutorialspoint.com/artificial_intelligence/images/expert_system.jpg)

### Forward Chaining
Forward chaining is a method of reasoning in artificial intelligence in which inference rules are applied to existing data to extract additional data until an endpoint (goal) is achieved. 

In this type of chaining, the inference engine starts by evaluating existing facts, derivations, and conditions before deducing new information. An endpoint (goal) is achieved through the manipulation of knowledge that exists in the knowledge base. 

![Forward Chaining](/engineering-education/forward-and-backward-chaining-in-ai/forward-chaining.jpg)

[Image Source: Tutorials Point](https://www.tutorialspoint.com/artificial_intelligence/images/forward_chaining.jpg)

Forward chaining can be used in planning, monitoring, control, and interpretation applications.

#### Properties of Forward Chaining
* The process uses a down-up approach (bottom to top).
* It starts from an initial state and uses facts to make a conclusion.
* This approach is data-driven.
* It is employed in expert systems and production rule system.

#### Example of Forward Chaining
A simple example of forward chaining can be explained in the following sequence.

A

A->B

B

A is the starting point. A->B represents a fact. This fact is used to achieve a decision B. 

A practical example will go as follows;

Tom is running (A)

If a person is running, he will sweat (A->B)

Therefore, Tom is sweating. (B)

#### Advantages
* It can be used to draw multiple conclusions.
* It provides a good basis for arriving at conclusions.
* It is more flexible than backward chaining because it does not have a limitation on the data derived from it.

#### Disadvantages
* The process of forward chaining may be time-consuming. It may take a lot of time to eliminate and synchronize available data.
* Unlike backward chaining, the hypothesis for this type of chaining is not very clear. The former uses a goal-driven method that arrives at conclusions efficiently. 

### Backward Chaining
Backward chaining is a concept in artificial intelligence that involves backtracking from the endpoint or goal to steps that led to the endpoint. This type of chaining starts from the goal and moves backward to comprehend the steps that were taken to attain this goal. 

The backtracking process can also enable a person to establish logical steps that can be used to find other important solutions.

![Backward Chaining](/engineering-education/forward-and-backward-chaining-in-ai/backward-chaining.jpg)

[Image Source: Quora](https://qph.fs.quoracdn.net/main-qimg-72fa83318b4bf6238b5a0da493a56277)

Backward chaining can be used in debugging, diagnostics, and prescription applications.

#### Properties of Backward Chaining
* The process uses an up-down approach (top to bottom).
* It is a goal-driven method of reasoning.
* The endpoint (goal) is subdivided into sub-goals to prove the truth of facts.
* Backward chaining algorithm is employed in inference engines, game theories, and complex database systems.
* The modus ponens inference rule is used as the basis for the backward chaining process. 

#### Example of Backward Chaining
The information provided in the previous example (forward chaining) can be used to explain how backward chaining works. Backward chaining can be explained in the following sequence.

B

A->B

A

B is the goal or endpoint, which is used as the starting point for backward tracking. A is the initial state. A->B is a fact that must be asserted to arrive at the endpoint B. 

A practical example of backward chaining will go as follows;

Tom is sweating (B)

If a person is running, he will sweat (A->B)

Tom is running (A)

#### Advantages
* The result is already known, which makes it easy to deduce inferences
* It is a quicker method of reasoning than forward chaining because the endpoint is available
* In this type of chaining, correct solutions can be derived effectively if pre-determined rules are met by the inference engine

#### Disadvantages
* The process of reasoning can only start if the endpoint is known.
* It does not deduce multiple solutions or answers
* It only derives data that is needed, which makes it less flexible than forward chaining

### Conclusion
Backward and forward chaining are important methods of reasoning in artificial intelligence. These concepts defer mainly in terms of approach, strategy, technique, speed, and operational direction. 

Forward chaining is important to developers that want to use data-driven algorithms to develop effective computer-based systems. Backward chaining is important to developers that are interested in using goal-driven algorithms to design effective solutions in complex database systems.

### Resources

[New Technology](https://www.ntirawen.com/2018/09/forward-chaining-and-backward-chaining.html#:~:text=%20Forward%20chaining%20and%20backward%20chaining%20in%20AI,fired%20and%20its%20THEN%20%28action%29%20part...%20More%20)

[Java Point](https://www.javatpoint.com/forward-chaining-and-backward-chaining-in-ai#:~:text=A.%20Forward%20Chaining.%20Forward%20chaining%20is%20also%20known,extract%20more%20data%20until%20a%20goal%20is%20reached.)




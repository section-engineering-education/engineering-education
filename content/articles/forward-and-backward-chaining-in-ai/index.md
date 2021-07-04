---
layout: engineering-education
status: publish
published: true
url: /forward-and-backward-chaining-in-ai/
title: Forward and Backward Chaining in Artificial Intelligence
description: This article will cover how backward and forward chaining are applied in artificial intelligence. These are method of reasonings used in artificial intelligence. 
author: onesmus-mbaabu
date: 2020-11-25T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/forward-and-backward-chaining-in-ai/hero.jpg
    alt:  forward and backward chaining example image
---
Backward and forward chaining are methods of reasoning that exist in the Expert System Domain of artificial intelligence. These techniques are used in expert systems such as [MYCIN](https://en.wikipedia.org/wiki/Mycin) and [DENDRAL](https://en.wikipedia.org/wiki/Dendral) to generate solutions to real life problems. 
<!--more-->
This article provides an overview of these techniques, and how they work. By the end of the article, readers will have learned real life examples of how backward and forward chaining are applied in artificial intelligence.

### Introduction to the Expert System
A brief overview of an expert system can help us gain more insights on the origin of backward and forward chaining in artificial intelligence. 

An expert system is a computer application that uses rules, approaches, and facts to provide solutions to complex problems. Examples of expert systems include MYCIN and DENDRAL. MYCIN uses the backward chaining technique to diagnose bacterial infections. DENDRAL employs forward chaining to establish the structure of chemicals.

There are three components in an expert system: user interface, inference engine, and knowledge base. The user interface enables users of the system to interact with the expert system. High-quality and domain-specific knowledge is stored in the knowledge base.

Backward and forward chaining stem from the inference engine component. This is a component in which logical rules are applied to the knowledge base to get new information or make a decision. The backward and forward chaining techniques are used by the inference engine as strategies for proposing solutions or deducing information in the expert system. 

![Expert System](/engineering-education/forward-and-backward-chaining-in-ai/expert-system.jpg)

[Image Source: Tutorials Point](https://www.tutorialspoint.com/artificial_intelligence/images/expert_system.jpg)

### Forward chaining
Forward chaining is a method of reasoning in artificial intelligence in which inference rules are applied to existing data to extract additional data until an endpoint (goal) is achieved. 

In this type of chaining, the inference engine starts by evaluating existing facts, derivations, and conditions before deducing new information. An endpoint (goal) is achieved through the manipulation of knowledge that exists in the knowledge base. 

![Forward Chaining](/engineering-education/forward-and-backward-chaining-in-ai/forward-chaining.jpg)

[Image Source: Tutorials Point](https://www.tutorialspoint.com/artificial_intelligence/images/forward_chaining.jpg)

Forward chaining can be used in planning, monitoring, controling, and interpreting applications.

#### Properties of forward chaining
- The process uses a down-up approach (bottom to top).
- It starts from an initial state and uses facts to make a conclusion.
- This approach is data-driven.
- It's employed in expert systems and production rule system.

#### Examples of forward chaining
A simple example of forward chaining can be explained in the following sequence.

A

A->B

B

A is the starting point. A->B represents a fact. This fact is used to achieve a decision B. 

A practical example will go as follows;

Tom is running (A)

If a person is running, he will sweat (A->B)

Therefore, Tom is sweating. (B)

A DENDRAL expert system is a good example of how forward chaining is used in artificial intelligence. DENDRAL is used in the prediction of the molecular structure of substances. 

Deducing the chemical structure starts by finding the number of atoms in every molecule. The mass spectrum of the sample is then used to establish the arrangement of the atoms. We can summarize these steps as follows.

The chemical formula is determined ( the number of atoms in every molecule).

The spectrum machine is used to form mass spectrums of the sample.

The isomer and structure of the chemical are identified.

In this example, the identification of the chemical structure is the endpoint. In the DENDRAL expert system, a generate and test technique is employed. 

There are two elements in the generator: a synthesiser and structural enumerator. The synthesiser plays the role of producing the mass spectrum. The structural enumerator identifies the structure of substances and prevents redundancy in the generator. 

#### Advantages
- It can be used to draw multiple conclusions.
- It provides a good basis for arriving at conclusions.
- It's more flexible than backward chaining because it does not have a limitation on the data derived from it.

#### Disadvantages
- The process of forward chaining may be time-consuming. It may take a lot of time to eliminate and synchronize available data.
- Unlike backward chaining, the explanation of facts or observations for this type of chaining is not very clear. The former uses a goal-driven method that arrives at conclusions efficiently. 

### Backward chaining
Backward chaining is a concept in artificial intelligence that involves backtracking from the endpoint or goal to steps that led to the endpoint. This type of chaining starts from the goal and moves backward to comprehend the steps that were taken to attain this goal. 

The backtracking process can also enable a person establish logical steps that can be used to find other important solutions.

![Backward Chaining](/engineering-education/forward-and-backward-chaining-in-ai/backward-chaining.jpg)

[Image Source: Quora](https://qph.fs.quoracdn.net/main-qimg-72fa83318b4bf6238b5a0da493a56277)

Backward chaining can be used in debugging, diagnostics, and prescription applications.

#### Properties of backward chaining
- The process uses an up-down approach (top to bottom).
- It's a goal-driven method of reasoning.
- The endpoint (goal) is subdivided into sub-goals to prove the truth of facts.
- A backward chaining algorithm is employed in inference engines, game theories, and complex database systems.
- The [modus ponens inference rule](https://en.wikipedia.org/wiki/Modus_ponens#) is used as the basis for the backward chaining process. This rule states that if both the conditional statement (p->q) and the antecedent (p) are true, then we can infer the subsequent (q). 

#### Example of backward chaining
The information provided in the previous example (forward chaining) can be used to provide a simple explanation of backward chaining. Backward chaining can be explained in the following sequence.

B

A->B

A

B is the goal or endpoint, that is used as the starting point for backward tracking. A is the initial state. A->B is a fact that must be asserted to arrive at the endpoint B. 

A practical example of backward chaining will go as follows:

Tom is sweating (B).

If a person is running, he will sweat (A->B).

Tom is running (A).

The MYCIN expert system is a real life example of how backward chaining works. This is a system that's used in the diagnosis of bacterial infections. It also recommends suitable treatments for this type of infections. 

The knowledge base of a MYCIN comprises many antecedent-consequent rules, that enable the system to recognize various causes of  (bacterial) infections. This system is suitable for patients who have a bacterial infection, but don't know the specific infection. The system will gather information relating to symptoms and history of the patient. It will then analyze this information to establish the bacterial infection. 

A suitable sequence can be as follows:

The patient has a bacterial infection.

The patient is vomiting.

He/she is also experiencing diarrhea and severe stomach upset.

Therefore, the patient has typhoid (salmonella bacterial infection).

The MYCIN expert system uses the information collected from the patient to recommend suitable treatment. 

The recommended treatment corresponds to the identified bacterial infection. In the case above, the system may recommend the use of ciprofloxacin.

#### Advantages
- The result is already known, which makes it easy to deduce inferences.
- It's a quicker method of reasoning than forward chaining because the endpoint is available.
- In this type of chaining, correct solutions can be derived effectively if pre-determined rules are met by the inference engine.

#### Disadvantages
- The process of reasoning can only start if the endpoint is known.
- It doesn't deduce multiple solutions or answers.
- It only derives data that is needed, which makes it less flexible than forward chaining.

### Conclusion
Backward and forward chaining are important methods of reasoning in artificial intelligence. These concepts differ mainly in terms of approach, strategy, technique, speed, and operational direction. 

Forward chaining is important to developers that want to use data-driven algorithms to develop effective computer-based systems. Backward chaining is important to developers that are interested in using goal-driven algorithms to design effective solutions in complex database systems.

### Resources
[New Technology](https://www.ntirawen.com/2018/09/forward-chaining-and-backward-chaining.html#:~:text=%20Forward%20chaining%20and%20backward%20chaining%20in%20AI,fired%20and%20its%20THEN%20%28action%29%20part...%20More%20)

[Java Point](https://www.javatpoint.com/forward-chaining-and-backward-chaining-in-ai#:~:text=A.%20Forward%20Chaining.%20Forward%20chaining%20is%20also%20known,extract%20more%20data%20until%20a%20goal%20is%20reached.)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

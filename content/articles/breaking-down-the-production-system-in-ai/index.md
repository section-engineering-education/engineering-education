---
layout: engineering-education
status: publish
published: true
url: /breaking-down-the-production-system-in-ai/
title: Breaking Down the Production System in AI
description: In this article, we will learn about the production system in artificial intelligence. We will look at the features, components, classification and the real-life applications of production systems. 
author: grace-karimi
date: 2021-11-18T00:00:00-02:01
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/breaking-down-the-production-system-in-ai/hero.png
    alt: Production System Image
---
Production systems are important in artificial intelligence (AI) because they enhance the creation of AI-based programs and the automation of machines. They also enhance the fast and accurate resolution of conflicts in automated processes through the use of **IF-THEN** conditions.
<!--more-->
This article provides a breakdown of the production system in AI. It will look at the features, components, types, and applications of production systems in AI.

### What is Production system in AI?
A production system is an artificial intelligence program that consists of some rules and the procedures or processes for following them. This set of rules can be termed as ‘production’. They enhance action selection and automated planning.

This system consists of a global database that contains all the information required to execute tasks, a set of rules that are applied to the data from the global database, and a control system that applies the rules. In production systems, knowledge is encoded in declarative statements. Knowledge representation creates a system that is used to run AI applications.

This partly explains why production systems are used in the creation of AI programs and the automation of machines. Some of the machines that can be automated using these systems include computers, manufacturing tools, and mobile applications. These systems execute search algorithms and exhibit problem-solving skills that can be displayed by humans.

### Features of a Production System in AI
The following are the main features of a production system in AI:
- **Simplicity:** The system utilizes **IF-THEN** statements that make problem-solving simple.
- **Modularity:** Knowledge can be coded in separate segments, which allows adjustments to be made in the system without challenges. It is possible to delete, modify or feature the knowledge without facing challenges.
- **Modifiability:** It is possible to modify or change the rules in this system as per the requirements. With this feature, the production system can undergo iterative improvement.
- **Knowledge-Intensive:** The production system relies on knowledge to a large extent. It employs a language that is spoken by humans, e.g. English. English sentences enable the system to draw productive conclusions based on production rules.
- **Adaptability:** The system can adapt to situations accordingly. It implements pattern-directed control, which enhances the hierarchical control of search in the event of complexities.

### Production system components
A production system consists of three main components: A global database, a set of rules, and a control system.

![Production System](/engineering-education/breaking-down-the-production-system-in-ai/production-system)

#### Global database
This contains the architecture of the production system and acts as a central data structure. All the information and data used in the execution of tasks is stored in this database. The production rules of the system operate here.

There are two types of global databases: temporary and permanent. The temporary global database consists of short-term actions that are based on circumstances. In a permanent global database, there are fixed actions that cannot be altered.

#### Production rules
The data gathered from the global database applies some rules within the production system. These rules are called the production rules. Some certain pre-conditions and post-conditions that bind these rules. The global database checks these conditions so that the rules can be applied.

If a particular pre-condition is accepted by the central data structure, the rule will be executed. In this case, the central data structure will adjust accordingly. If the global database does not accept the pre-condition, no action is taken. In this case, the database doesn’t change.

#### A control system
The application of rules in the system is examined by the control system. When a pre-condition is accepted by the global database, the control system decides the rule that needs to be applied. When the correct output is given, the control system terminates the production system.

This system helps to resolve conflicts in the production system. For example, if multiple conditions are occurring simultaneously, the control system will resolve the conflict by specifying the sequence.

### Classification of production systems in AI
Production systems can be classified into the following categories:
- **Monotonic system** This system allows the simultaneous application of rules. This means that the application of one rule does not prevent another rule from being applied at the same time.
- **Partially commutative system** Here, the order of operation is important. If a given set of rules is employed to convert a start state A into a different state B, then the same results can be attained using any permutation of these production rules.
- **Non-monotonic system** This system helps in solving problems that were ignored. It can be executed without backtracking to initial states when an incorrect path was taken. The Non-monotonic system provides an efficient way of solving problems.
- **Commutative system** This system is used when the order of operation is not an important issue of consideration. It is ideal for solving problems in a situation where changes can be reversed. This is unlike in a partially commutative system, where the order of operation is crucial and changes are irreversible.  
  
### Advantages and disadvantages of production systems
#### Advantages
1. They enhance the heuristic control of search, which promotes adaptability.
2. The production rules can be modified without causing adverse effects in the system.
3. They offer an efficient way of solving problems in real-life situations.
4. They consist of ‘IF-THEN’ conditions that enhance simplicity in problem-solving.
5. They have reliable troubleshooting methods. It takes little time to locate and resolve conflicts in the system.

#### Disadvantages
1. The production system does not store the output results for future reference, which may limit learning.
2. When various conflicting rules are employed, the control system establishes the best possible production rule to be applied. This may lead to reduced efficiency of the system.
3. Combination or merging of rules may lead to opaqueness, especially when there is little prioritization of production rules. This problem can be solved by predetermining the priority of rules.

### Real-life applications of production systems in AI
#### Automation of AI machines
Production systems are used to execute commands in automated machines. These systems consist of **IF-THEN** conditions that set conditions that need to be met before an action is taken. Some of the automated machines that apply the concept of production systems include washing machines, airplanes, and autonomous cars.  

In a washing machine, the condition-action rules enable the system to allow water and wash clothes based on the size and nature of clothes. If the size is large, the system will take the action of allowing large amounts of water. If the clothes are greasy, the machine will wash them for a long period.

When flying a plane at the cruising phase, the aim is to maintain the same level of attitude (cruising attitude). If the plane is flying at a different attitude, the IF-THEN conditions will be applied to bring the plane back to the desired level of attitude. These conditions are also used in planes to control various automated processes.

In autonomous cars, the production system uses the IF-THEN conditions to avoid collision with objects or other cars. The following shows examples of how these conditions are applied in autonomous cars.

1. **IF** there is an object or car in front, **THEN** apply brakes.

2. **IF** there is a traffic light **AND** the lights indicate red, **THEN** stop.

#### Conflict resolution
Automated processes or machines make work easy since they do what humans can do faster and accurately. However, automation may sometimes be faced with challenges of breakdown or conflicts in the system. A production system is programmed to resolve these conflicts using the **IF-THEN** conditions. In situations where the system cannot resolve the conflict, it provides the recommended action.

A good example is when a car or an automated machine is not working properly. The following are some of the **IF-THEN** conditions that can be applied.

1. **IF** the engine is not turning, **THEN** ask the driver to check the battery.

2. **IF** the engine is not turning **AND** the battery is working, **THEN** ask the driver to test the starter motor.

### Conclusion
This article aimed at providing an overview of production systems in artificial intelligence. The following is a summary of what we have learned.
1. A production system supports artificial intelligence through a set of rules and mechanisms for executing them.
2. The main features of production systems include simplicity, modularity, modifiability, knowledge-intensive, and adaptability.
3. Production systems consist of three coponents: a global database, production rules, and a control system.
4. These systems can be categorized into monotonic, partially commutative, non-monotonic, and commutative systems.
5. They are used to execute commands in automated machines such as washing machines, airplanes, and autonomous cars.
6. They are also used in automated processes to recommend the best course of action in case of conflicts.

Happy learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)

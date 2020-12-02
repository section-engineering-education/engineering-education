---
layout: engineering-education
status: publish
published: true
url: /engineering-education/intelligent-agents-in-ai/
title: Intelligent Agents in Artificial Intelligence
description: This article will cover intelligent agents in artificial intelligence (AI) and the 3 main components such as architecture, agent function, and agent program.
author: onesmus-mbaabu
date: 2020-12-01T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/intelligent-agents-in-ai/hero.jpg
    alt: Intelligent Agents in Artificial Intelligence example image
---
An intelligent agent (IA) is an entity that makes a decision, that enables artificial intelligence to be put into action. It can also be described as a software entity that conducts operations in the place of users or programs after sensing the environment. It uses actuators to initiate action in that environment.
<!--more-->
### What is an Intelligent Agent (IA)?
This agent has some level of autonomy that allows it to perform specific, predictable, and repetitive tasks for users or applications.

It's also termed as ‘intelligent’ because of its ability to learn during the process of performing tasks.

The two main functions of intelligent agents include perception and action. Perception is done through sensors while actions are initiated through actuators.

Intelligent agents consist of sub-agents that form a hierarchical structure. Lower-level tasks are performed by these sub-agents.

The higher-level agents and lower-level agents form a complete system that can solve difficult problems through intelligent behaviors or responses.    

### Characteristics of intelligent agents
Intelligent agents have the following distinguishing characteristics:
- They have some level of autonomy that allows them to perform certain tasks on their own.
- They have a learning ability that enables them to learn even as tasks are carried out.
- They can interact with other entities such as agents, humans, and systems.
- New rules can be accommodated by intelligent agents incrementally.
- They exhibit goal-oriented habits.
- They are knowledge-based. They use knowledge regarding communications, processes, and entities.

### The structure of intelligent agents
The IA structure consists of three main parts: architecture, agent function, and agent program.

1. **Architecture:** This refers to machinery or devices that consists of actuators and sensors. The intelligent agent executes on this machinery. Examples include a personal computer, a car, or a camera.

2. **Agent function:** This is a function in which actions are mapped from a certain percept sequence. Percept sequence refers to a history of what the intelligent agent has perceived.

3. **Agent program:** This is an implementation or execution of the agent function. The agent function is produced through the agent program’s execution on the physical architecture.

### Categories of intelligent agents
There are 5 main categories of intelligent agents. The grouping of these agents is based on their capabilities and level of perceived intelligence.  

#### Simple reflex agents
These agents perform actions using the current percept, rather than the percept history. The condition-action rule is used as the basis for the agent function. In this category, a fully observable environment is ideal for the success of the agent function.

#### Model-based reflex agents
Unlike simple reflex agents, model-based reflex agents consider the percept history in their actions. The agent function can still work well even in an environment that is not fully observable. These agents use an internal model that determines the percept history and effect of actions. They reflect on certain aspects of the present state that have been unobserved.

#### Goal-based agents
These agents have higher capabilities than model-based reflex agents. Goal-based agents use goal information to describe desirable capabilities. This allows them to choose among various possibilities. These agents select the best action that enhances the attainment of the goal.

#### Utility-based agents
These agents make choices based on utility. They are more advanced than goal-based agents because of an extra component of utility measurement. Using a utility function, a state is mapped against a certain measure of utility. A rational agent selects the action that optimizes the expected utility of the outcome.

#### Learning agents
These are agents that have the capability of learning from their previous experience.

Learning agents have the following elements.
- **The learning element:** This element enables learning agents to learn from previous experiences.
- **The critic:** It provides feedback on how the agent is doing.
- **The performance element:** This element decides on the external action that needs to be taken.
- **The problem generator:** This acts as a feedback agent that performs certain tasks such as making suggestions (new) and keeping history.

#### How intelligent agents work
Intelligent agents work through three main components: sensors, actuators, and effectors. Getting an overview of these components can improve our understanding of how intelligent agents work.

- **Sensors:** These are devices that detect any changes in the environment. This information is sent to other devices. In artificial intelligence, the environment of the system is observed by intelligent agents through sensors.

- **Actuators:** These are components through which energy is converted into motion. They perform the role of controlling and moving a system. Examples include rails, motors, and gears.

- **Effectors:** The environment is affected by effectors. Examples include legs, fingers, wheels, display screen, and arms.

The following diagram shows how these components are positioned in the AI system.

![AI Sytem](/engineering-education/intelligent-agents-in-ai/ai-system.png)

[Image Source: JavatPoint](https://static.javatpoint.com/tutorial/ai/images/agents-in-ai.png)

Inputs (percepts) from the environment are received by the intelligent agent through sensors. This agent uses artificial intelligence to make decisions using the acquired information/ observations. Actions are then triggered through actuators. Future decisions will be influenced by percept history and past actions.

![How an Intelligent Agent Works](/engineering-education/intelligent-agents-in-ai/how-an-intelligent-agent-works.png)

[Image Source: Geeks for Geeks](https://www.cdn.geeksforgeeks.org/wp-content/uploads/ai3-1.png)

### Applications of intelligent agents
Intelligent agents in artificial intelligence have been applied in many real-life situations.

#### Information search, retrieval, and navigation
Intelligent agents enhance the access and navigation of information. This is achieved through the search of information using search engines. The internet consists of many data objects that may take users a lot of time to search for a specific data object. Intelligent agents perform this task on behalf of users within a short time.

#### Repetitive office activities
Some companies have automated certain administrative tasks to reduce operating costs. Some of the functional areas that have been automated include customer support and sales. Intelligent agents have also been used to enhance office productivity.

#### Medical diagnosis
Intelligent agents have also been applied in healthcare services to improve the health of patients. In this case, the patient is considered as the environment. The computer keyboard is used as the sensor that receives data on the symptoms of the patient. The intelligent agent uses this information to decide the best course of action. Medical care is given through actuators such as tests and treatments.

#### Vacuum cleaning
AI agents are also used to enhance efficiency and cleanness in vacuum cleaning. In this case, the environment can be a room, table, or carpet. Some of the sensors employed in vacuum cleaning include cameras, bump sensors, and dirt detection sensors. Action is initiated by actuators such as brushes, wheels, and vacuum extractors.  

#### Autonomous driving
Intelligent agents enhance the operation of self-driving cars. In autonomous driving, various sensors are employed to collect information from the environment. These include cameras, GPS, and radar. In this application, the environment can be pedestrians, other vehicles, roads, or road signs. Various actuators are used to initiate actions. For example, brakes are used to bring the car to a stop.

### Conclusion
Intelligent agents make work easier by performing certain time-consuming and difficult tasks on behalf of systems or users. These agents are making the automation of certain tasks possible.

With increased technological advancement, there will be enhanced development of intelligent agents. This will further translate into complex AI-driven devices that will solve current global challenges. There seems to be no limit to this intriguing technology.

### Resources & further readings
[Max Brain Function](https://maxbrainfunction.com/intelligent-agent-work-purpose/)

[AI Objectives](http://www.aiobjectives.com/2019/11/01/analysis-of-intelligent-agents-in-artificial-intelligence/)

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)

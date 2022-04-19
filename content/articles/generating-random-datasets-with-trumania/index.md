---
layout: engineering-education
status: publish
published: true
url: /generating-random-datasets-with-trumania/
title: Generating Random Datasets With Trumania
description: This tutorial will discuss how to use the random module to generate random datasets and select random data from lists.
author: moris-wanyiri
date: 2022-04-19T00:00:00-10:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/generating-random-datasets-with-trumania/hero.jpg
    alt: Generating Random Datasets With Trumania Hero Image
---
In this article, we will look at how to use the random module to generate random datasets and select random data from lists. We will use Trumania which is a scenario-based random data generator.
<!--more-->
It will give us a step-by-step algorithm on how random datasets are generated. Random data initiates the creation of random datasets where the variables coincide with selected distributions.

This article will give a sense of why one may want to generate random datasets.

### Table of contents
- [Prerequisites](#prerequisites)
- [Why generate random datasets](#why-generate-random-datasets)
- [Schema-based random data generation](#schema-based-random-data-generation)
- [Generating inter-related data with Trumania](#generating-inter-related-data-with-trumania)
- [Creating a Trumania circus](#creating-a-trumania-circus)
- [The social networks](#the-social-network)
- [Conclusion](#conclusion)
-
### Prerequisites
To follow along with this tutorial, you will need to have;
- Basic knowledge of Python programming language.
- Knowledge of working with Python libraries.

### Why generate random datasets
There are various reasons as to why one may choose to generate random datasets. Some of the reasons are:
- `Cost`: the cost of generating random data is cheaper than collecting data in reality.
- `Privacy`: generating random data is more secure since the integrity and privacy of the owner of the data is maintained.
- `Efficiency`: when it comes to the generation of random data, it is more efficient and cost-effective as compared to the collection of the data in reality.
- `Time`: random data generation saves time since it's fast and efficient in comparison to the real data. It also allows data scientists to explore datasets, algorithms, and visualization of data in various techniques.

### Schema-based random data generation
Many tools can be used to generate random data but the most common way is the schema-based generation. It allows the definition of the blueprints, therefore, you can use it to generate some data entities.

Other tools that can be used for the generation of random data include `LogSynth` and `Khermes`. Below is a simple illustration:

```python
{
    {"field" :"Breed",
    "class" : BreedGenerator
     },
     {
        "field" :"Age",
        "class" : RandomInt(15,7)
     },
     {
         "field":"Name",
         "class"; Randomgenerator
     }

}
```

The above scenario shows the generation of some data about an animal. The entities are the breed, age, and name of the animal. The schema is simple and quick, but it has some limitations.

The main limitation is that there is the manipulation of relationships between the entities, e.g, generating names based on the breed of the animal.

#### Shortcomings addressed by Trumania
- Causal relationship between actions - For instance, many purchase actions at a retail shop may lead to an "out-of-stock" event.
- Different duration activity profiles - It defines what time actions are likely to occur.
- Collected algorithms in a data network - This means that the user interactions are discovered through the social groups
- Imbalanced datasets - This means that operations cannot aid in a grouping.

The execution of a scenario in Trumania results in the generation of datasets which are typically time-series.

### Generating inter-related data with Trumania
In this section, we will look at different scenarios that will lead to interrelated data. We can have a scenario where people may be communicating with each other through messages.

The outcome of the communication will lead to the emergence of datasets that will be the time series of the messages exchanged between the people.

#### Ways in which interrelated data can be generated
- By developing a trumania circus, in which the scenario will execute.
- Through addition of relationship to agents and assign them their favorite quotes - It will be used to make the content of the messages.
- By creating time parameters of the story results in a more realistic distribution of the messages throughout the given time.
- Through addition of other relationships to define a social network.

We will have a better understanding in the next section.

### Creating a Trumania circus
A circus is a data generator that is used to control and monitor processes and sockets. It can be driven in the web interface, python API, and command-line interface.

#### How to create a circus
A trumania circus is created using the code below:

```python
from trumania.core import circus

illustration_circus = circus.Circus(name="illustration7"),
                                    master_seed=987654,
                                    start=pd.Timestamp("4 June 2022 19:00"),
                                    step_duration=pd.Timedelta("3h"),
```

All the entities which are time-related are managed by a central clock. Emphasis is put on `step_duration=pd.Timedelta("3h")` which states that the time in the clock increases by 3 hours.

The next step is the addition of agents' quantity to the circus. The quantity in the circus is the set of persons having an identity and some attributes.

The values of the attributes may be identified manually, but we intend to generate them randomly. There are some generators that we will explain so that we can have a broad understanding.

The generators are as follows:

```python
from trumania.core.random_generarators import SequentialGenerator, FakerGenerator, NumpyRandomGenerator

idex_gen = SequentialGenerator(prefix"AGENT_")
age_gen = NumpyRandomGenerator(method="usual", loc=7 scale=10
                                seed=next(illustration_circus.seeder))
breed_gen = FakerGenerator(method="breed", seed=next(illustration_circus.seeder))
```

In the code snippet above, the trumania generator is responsible for the provision of data when the `generate()` function is called. The `breed_gen` will result in the generation of random breeds of animals.

`age_gen` generates the random age of the animals by repeatedly sampling data from a normal distribution and `idex_gen` will result in strings like `AGENT_0898`, `AGENT_4564`, `AGENT_1723` etc.

### The social network
A social network is a network with links between two or more characters or individuals where the links show the `relationship` between them. It will help send messages to specific individuals instead of a random agent.

This will result in datasets that will appear in the message log. It is achieved by the inclusion of relationships in the social network. It will help to predict or show which agents are likely to be picked.

Relationships will also lead to the emergence of social graphs which are basic, classic, and also rely on the Erdos-Renyi algorithm.

In Trumania, the Erdos-Renyi algorithm is built in its framework. You will need to include it in your scenario and create a relationship.

Below is an illustration:

```python
from trumaniaa.components.social_networks.erdos_renyi import WithErdosRenyi
#the circus in this scensrio is simple
simple.add_er_social_network_relationship(
  simple.populations["agent"],
  relationship_name="customers",
  mean_attendance=50)
```

We can also use several numbers of agents as follows:

```python
gracias.set_operations(
    self.clock.ops.timestamp(named_as="TIME"),

    self.populations["agent"].get_relationship("tips")
        .ops.select_one(from_field="AGENT_IDS",named_as="FEEDBACK"),

    self.populations["agent"]
        .get_relationship("customers")
        .ops.select_one(from_field="AGENT_IDS", named_as="OTHER_PERSON"),

    self.populations["agent"]
        .ops.lookup(id_field="AGENT_IDS", select={"IDENTITY": "SENDER_IDENTITY"}),

    self.populations["agent"]
        .ops.lookup(id_field="OTHER_AGENT", select={"IDENTITY": "RECEPIENT_IDENTITY"}),

    operations.FieldLogger(log_id="gracias_7")
)
```

We can note that the results of the generated dataset will have more structure than the previous one.

### Conclusion
As stated in the introduction, `trumania` is a scenario-based random data generator in Python. There are several ways in which the generated datasets can be used for `testing`, `benchmarking`, and `learning`.

In a trumania scenario, relationships may be included and configured using empirical distribution, theoretical random distributions, and production of real.

For more information about trumania visit [here](https://github.com/RealImpactAnalytics/trumania)

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)

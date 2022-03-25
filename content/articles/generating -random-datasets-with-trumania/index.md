### Introduction
In this article, we will look at how to use the random module to generate random datasets and select random data from lists. We will be using Trumania which is a scenario-based random data generator. It will give a step-by-step algorithm on how random datasets are generated.
Random data initiates the creation of random datasets whereby the variables coincide with selected distributions.
The article will give a sense as to why one may want to generate random datasets.

### Prerequisites
Basic python knowledge
Knowledge working with python libraries
### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Why generate random datasets:](#why-generete-random-datasets)
- [Schema-Based Random Data Generation](#schemabased-random-data-generation)
  - [Shortcomings addressed by Trumania](#shortcomings-addressed-by-trumania)
- [Generating Inter-related Data with Trumania](#generating-inter-related-data-with-trumania)
  - [Ways in which interrelated data can be generated](#ways-in-which-interrelated-data-can-be-generated)
- [Creating a Trumania Circus](#creating-a-trumania-circus)
- [The Social networks](#the-social-network)
- [Conclusion](#conclusion)

### Why generate random datasets
There are various reasons why one may choose to generate random datasets. The following are some of the reasons:

- `cost`: the cost of generating random data is cheaper than collecting data in reality.
- `privacy`: generating random data is more secure since the integrity and privacy of the owner of the data is maintained.
- `efficiency`: when it comes to the generation of random data it is more efficient and cost-effective as compared to the collection of the data in reality.
- `time`: random data generation saves on time since it's fast and efficient in comparison to the real data.
It also allows the data scientists to explore datasets, algorithms, and visualization of data in various techniques.

### Schema_Based Random Data Generation
Under this heading, I am going to illustrate how schema-based random data generation happens and show the outcomes of the same. There are many tools that may be used to generate random data but the common way is the schema-based generation. It allows the definition of the blueprints and henceforth be able to use it to generate some data entities. Other tools that may be used for the generation of random data include `LogSynth` and `Khermes`.
Below is a simple illustration;

```Python
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

The above scenario shows the generation of some data about an animal. The entities are the breed, age, and name. The schema is simple, quick, and has some limitations. The limitation is that there is the manipulation of relationships between the entities. An example is like, how to generate names based on the breed of the animal.

#### Shortcomings addressed by Trumania
- Resulting in relationships between actions.
- Different duration activity profiles. It defines what time actions are likely to occur.
- Collected algorithms in a data network. This means the user interactions are discoverer through the social groups
- Datasets that are imbalanced. which means operations cannot aid in a grouping.

The execution of a scenario in trumania basically results to generation of datasets which are typically time-series.

### Generating Inter-related Data with Trumania
In this section, we will look at different scenarios that will read to interrelated data. we can have a scenario whereby people may be communicating with each other through messages. The outcome of the communication will lead to the emergence of datasets that will be the time series of the messages exchanged between the people.

#### Ways in which interrelated data can be generated
- Developing a trumania circus, the word in which the scenario will execute.
- Addition of relationship to Agents and assigning them their favorite quotes. It will be used to make the content of the messages.
- Creating time parameters of the story resulting in a more realistic distribution of the messages throughout the given time.
- Addition of other relationships to provide the definition of a social network.

We will have a better understanding in the next section.

### Creating a Trumania Circus
A circus is a data generator that is used to control and monitor processes and sockets. It can be driven in web interface, python API, and command-line interface.

#### How to create a circus
A trumania circus is ct=reated using the simple steps as follows:

```python
from trumania.core import circus

illustration_circus = circus.Circus(name="illustration7"),
                                    master_seed=987654,
                                    start=pd.Timestamp("4 June 2022 19:00"),
                                    step_duration=pd.Timedelta("3h"),
```

All the entities which are time-related are managed by a central clock. Emphasis is put on `step_duration=pd.Timedelta("3h")` which states that the time in the clock increases by 3h hours.

The next step is the addition of agents' quantity to the circus. The quantity in the circus is basically the set of persons having an identity and some attributes. The values of the attributes may be identified manually but our intention is to generate them randomly. There are some generators that we will explain so that we will have a broad understanding. The generators are as follow;

```python
from trumania.core.random_generarators import SequentialGenerator, FakerGenerator, NumpyRandomGenerator

idex_gen = SequentialGenerator(prefix"AGENT_")
age_gen = NumpyRandomGenerator(method="usual", loc=7 scale=10
                                seed=next(illustration_circus.seeder))
breed_gen = FakerGenerator(method="breed", seed=next(illustration_circus.seeder))
```

In the code snippet above, the trumania generator is responsible  for the provision of data when the `generate()` is called. On the above illustration the `breed_gen` will result in the generation of random breeds of animals, `age_gen` generates random age of the animals by repeatedly sampling data from a normal distribution and `idex_gen` will result in strings like `AGENT_0898`, `AGENT_4564`, `AGENT_1723`...

### The social network
A social network is a network with links between two or more characters or individuals where the links show the `relationship` between them. It will help send messages to specific individuals instead of a random agent. Due to this, it will result in datasets that will appear in the message log.
This is achieved by the inclusion of relationships in the social network. It will help to predict or show which agents are likely to be picked. Relationships will also lead to the emergence of social graphs which are basic and classic and also rely on the Erdos-Renyi algorithm.
In Trumania the Erdos-Renyi algorithm is built in its framework. You will be needed to include it into your scenario and create a relationship. Below is an illustration;

```python
from trumaniaa.components.social_networks.erdos_renyi import WithErdosRenyi
#the circus in this scensrio is simple
simple.add_er_social_network_relationship(
  simple.populations["agent"],
  relationship_name="customers",
  mean_attendance=50)
```

We can also use several numbers of agents as follows;

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
As in the introduction we stated that `trumania` is a scenario-based random data generator in Python. There are several ways in which the generated datasets can be used that as `testing`, `benchmarking`, and `learning`.
In a trumania scenario, relationships may be included and configured using the following methods; empirical distribution, theoretical random distributions, and production of real. For more information about trumania visit [here](https://github.com/RealImpactAnalytics/trumania)

Happy coding!

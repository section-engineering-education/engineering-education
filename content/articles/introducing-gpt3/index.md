---
layout: engineering-education
status: publish
published: true
url: /introducing-gpt3/
title: Introduction to GPT3
description: This article serves as an introduction to GPT3, the third iteration of generative pretrained transformers, which produce human-like text.
author: collins-ayuya
date: 2020-10-10T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introducing-gpt3/hero.jpg
    alt: GPT3 generative pretrained transformers image  
---
Generative pre-trained transformers are language models that produce human-like text. These models make it easier to develop machine learning applications while also providing a way in for people with little tech background to develop applications. GPT-3 is the third iteration of generative pretrained transformers, which produce human-like text.
<!--more-->
GPT-2 was massive, with about 1.5 billion [parameters](https://bit.ly/2FlKJII). The magnitude of this new model blows its predecessor out of the water boasting of 175 billion parameters. For all the hype surrounding GPT-3, it is necessary to take a closer look.

### Table of Contents
1. Potential of GPT-3
2. Applications of the GPT-3
3. How GPT-3 compares to BERT
4. Limitations and dangers of GPT-3

### Prerequisites
You will only need a basic understanding of machine learning and natural language processing concepts.

### A few terms
**Natural Language Processing**- an arm of artificial intelligence dedicated to enable computers to understand human language and respond appropriately.

**Transformers** - [Wikipedia](https://bit.ly/36GaRsO) describes transformers as deep learning models designed to handle sequential data for natural language tasks. They are the building blocks of state-of-the-art NLP architectures.

**Language models** - given a set of words, these models have the ability to predict next words.

**BERT** - Google’s pre-trained language model which produces state-of-the-art performance in a range of NLP tasks.

**GPT** - generative pre-trained transformers which produce human-like text.

**GPU** - graphics processing unit.

### GPT-3
There’s a good chance I could have used GPT-3 to generate this article and you as the reader would never realize it. Whether impressive or scary, this embodies the strides that language models have made. In a previous [article](/automated-fake-news-detection/), I mentioned how BERT had revolutionized the field of NLP. The base BERT model has about [110 million parameters]( https://yashuseth.blog/2019/06/12/bert-explained-faqs-understand-bert-working/#:~:text=BERT%20is%20a%20multi-layer%20bidirectional%20Transformer%20encoder.%20There,layers%2C%2016%20attention%20heads%20and%2C%20340%20million%20parameters.).

The largest BERT architecture boasts of around 340 million parameters. Compared to GPT-3’s 175 billion parameters, the scale of this new language model becomes rather apparent. BERT is incredibly impressive in its NLP tasks. However, the difference in comparison with GPT-3 naturally brings about huge expectations on GPT-3.

As mentioned in the introduction, GPT-3 is the third iteration of generative pretrained transformers, which produce human-like text. It has been developed by [OpenAI]( https://openai.com/) and is arguably their most controversial product yet. We'll get more into that later.

GPT-3 is pre-trained with [499 billion words]( https://lambdalabs.com/blog/demystifying-gpt-3/) and cost at least $4.6 million to develop. It shows great capability in a vast range of tasks. They include generating articles, text summarization, question answering, and translation tasks. A particularly impressive task of GPT-3 is generation of code. We will discuss this a bit later on.

#### How it works
GPT-3 is a transformer-based language model that takes input and generates text from it.
Text is passed as input. This input influences the output. The model is pre-trained. This means that it generates output resulting from scanning through the vast training data. When it comes to performing specific tasks and without any special tuning(of the model), GPT-3 outperforms all other models. Credit to its humongous model size.

In comparison adapting models like BERT to a specific task requires some fine tuning, where you use a large dataset to train the models beforehand. This can be a tedious process.
You can give a GPT-3 model a language translation task, with very few examples and it will generate output.

You can instruct it to generate code and it does, again with few examples. This is a very exciting characteristic of this language model. Although you might be wondering how it manages to deliver with little to no examples.

The answer: Few shot learning(which we will explain below).

The generation of output can be performed through few shot learning. This [paper]( https://arxiv.org/pdf/2005.14165.pdf) describes language models as few shot learners.

##### Few shot learning
Few shot learning is often associated with the field of computer vision. It can be described as the process of feeding a learning model with very little training data. This is quite interesting since the norm involves the use of large amounts of training data. Few shot learning applies to GPT-3 since the model is given few examples (in terms of input text) then is required to make predictions. This process can be compared with how babies learn languages. They learn from language examples as opposed to grammatical rules.

Other applicable forms of learning include:

**One shot learning**. This describes feeding the learning model with a single example of the required task. No fine tuning of the model is done. An example of a task would be asking a model to translate a word from English to Swahili. The model is given a description and an example of the task.

**Zero shot learning**. We can say this is training a model to do tasks it wasn’t explicitly trained to do. The task is only described to the model, without examples. Considering the example above of asking a model to translate a word from English to Swahili. The description could be “translate from English to Swahili”. The model understands natural language. Without examples, it takes on the translation task. Once more, no fine tuning is required.

GPT-3 is a few-shot learner. It can be a one-shot learner or zero-shot learner as well(depending on the task). For a deeper understanding of how GPT-3 works, check out this [post]( https://jalammar.github.io/how-gpt3-works-visualizations-animations/)

#### Potential
The goal of GPT-3 is to reduce the complexity of machine learning. This is accomplished by training models through simple natural language instructions. It shows us that a language model can solve tasks it has never before encountered as long as it is pre-trained on enough data. This takes a huge step towards [artificial general intelligence](https://en.wikipedia.org/wiki/Artificial_general_intelligence).

GPT-3 has the potential to revolutionize communication with machines. The very nature of how we interact with machines could change courtesy of GPT-3. Envision a scenario where you are interacting with a chatbot atop of a GPT-3 model. You may not be able to tell whether it is a human being or a machine due to the freakishly natural conversations the model is capable of sustaining.

Imagine a situation where you happen to be chatting up a stranger online. You are enjoying deep and profound conversation, only to discover that you are in fact communicating with a machine.

In customer service, this would make customer experience more natural and intuitive when interacting with a machine. A chatbot would know more. It could more intuitively solve customers’ pain points.

It would have a greater range of responses to query. It could even crack jokes where appropriate. Recommendations to customers could be more detailed and of a higher quality. The list is endless. It could provide that almost-human touch to any interaction.

As mentioned before, GPT-3 outperforms all other models when it comes to performing of specific tasks without any fine tuning. Fine tuning involves the use of training data to train a model.

Considering that adapting other models like BERT to a specific task requires fine tuning, GPT3 is a very attractive prospect to machine learning practitioners. Fine tuning of models is often a complex and inefficient process. Taking that step away from the process and ensuring that the output will still fulfill the desired task is every engineer’s dream.

#### Uses

##### Writing and translation
We have looked at how GPT-3 manages to generate impressive text. It’s only natural to have a use case in writing. Thanks to its ability to produce believable text, the model can be used to write most if not all forms of literature. Check out the examples of [GPT-3 creative writing](https://www.gwern.net/GPT-3#william-shakespeare).

The model can write fiction, crack jokes, write poems, generate conversation manuscripts among much more. Provided with the correct prompt, it can write convincing and captivating articles. It is also capable of generating all sorts of documents, from business memos to legal documents. Besides writing, as we had mentioned before, the model is pretty good at language translation tasks as well.

##### Generating code
The model has the ability to generate code in different languages. In most examples I’ve seen, it just takes in an English description of the requirements and generates pages. Here’s an [example](https://twitter.com/sharifshameem/status/1282676454690451457).

GPT-3 can generate website mock-ups as well. I’ve seen examples like [this one](https://twitter.com/jsngr/status/1287026808429383680) where it takes a description of the desired website and a URL to create mock-ups. This is particularly useful to UI/UX designers.

Here is an example of GPT-3 going a step further and [explaining code](https://twitter.com/amasad/status/1285789362647478272) in English.

##### Building machine learning models/code
There are examples that show GPT-3 generating code for machine learning models. In one example, it only needs a description of the dataset and required output. Check it out [here](https://twitter.com/mattshumer_/status/1287125015528341506).

For more cool examples on the uses of GPT-3, check out [GPT Crush](https://gptcrush.com/) and [GPT-3 Examples](https://gpt3examples.com/).

### Three sectors that could be impacted
#### Software development
GPT-3 has demonstrated ability to generate code and build simple applications from description in English language. It has shown the capability of generating mock-ups as mentioned in the previous section.

Widespread adoption of the model would change the very nature of software development. It would be much faster to transition from idea to software product. There exists the fear that this would threaten the jobs of software developers. It could also mean that there would be a higher bar to get work as a software developer since there would be fewer jobs to contend for. Alternatively, it could mean increased efficiency for software developers as all the “dirty work” is handled by the model. It could end up complementing the software development process in the end.

#### Creatives
The model has proven to generate incredibly convincing content. Content may be of a creative or formal nature. GPT3 can write articles, stories, poems, and compose song lyrics among others. Since this content is difficult to distinguish from human writing, this may result in GPT-3 being able to overshadow creatives such as writers and musicians. A result may be a reduced demand for creative writers.

#### Journalism
We live in an age where AI replacing human staff is no longer shocking. The need for journalists may be reduced as a result of mainstream adoption of GPT-3. The model may scan through countless documents seeking news-worthy information. And since it produces text that’s almost indistinguishable from human writing, it may very well replace a human journalist.

However, I can argue that GPT-3 completely replacing humans in the above sectors is quite far out. At the moment, nothing can quite replace that human touch.

### Comparison with BERT
#### Autoregressive vs Bidirectional
GPT-3 is an [autoregressive model](https://365datascience.com/autoregressive-model/). This means that it is reliant on past period values in order to predict current values. This represents a very linear model. The autoregressive nature of GPT-3 means it gives output one token at a time. Tokens refer to subdivisions of text into smaller units. These could be words or characters.

BERT is a bidirectional model. These language models are able to be trained based on the set of words in a sentence. Models like GPT-3 are reliant on previous values to make predictions. Bidirectional models learn context of a word based on the words around it as opposed to just the word before or after the word in consideration.

#### Size
To showcase how massive GPT-3 is, the largest BERT architecture has 340 million parameters. Compared to the 175 billion parameters of GPT-3, BERT is about 500 times smaller.

#### Fine tuning
We described fine tuning as having to use a large dataset to train a model. BERT is a model that requires fine tuning. On the other hand, GPT-3 (as we mentioned) is a few-shot learner. The model can be given a few examples in the form of input and expected to make predictions. GPT-3 can go as far as being a zero-shot learner in some cases. This is a key difference between these two language models.

#### Availability
BERT has always been [open source](https://en.wikipedia.org/wiki/Open-source_software), meaning users can get their hands on the model and tinker with it to their liking. However, GPT-3 is commercially available through an API.

### Limitations and dangers
#### Model size
We mentioned that this model boasts of 175 billion parameters. Assuming each parameter requires around 4 bytes of memory, this amounts to around [700 GB](https://lambdalabs.com/blog/demystifying-gpt-3/). The average person will likely run out of memory attempting to run the model. The sheer size of the model makes it impractical to use for the average researcher, hobbyist, or practitioner.

#### Access and cost
OpenAI showed that we are in a time of commercial AI when they switched to a [for-profit](https://openai.com/blog/openai-lp/) company from a non-profit to fund the costs of their research. AI research is being commercialized. This may work well for the big companies since they can afford to purchase or subscribe to access such a model.

Just recently, Microsoft acquired an [exclusive license](https://www.theverge.com/2020/9/22/21451283/microsoft-openai-gpt-3-exclusive-license-ai-language-research) to GPT-3.

Aside from a free 3-month trial period, the [pricing tiers](https://www.reddit.com/r/GPT3/comments/ikorgs/oa_api_preliminary_beta_pricing_announced/) for the model range from a $100 a month, to a $400 a month package, and ultimately a custom pricing option. These tiers, aside from the custom pricing plan, offer a finite number of tokens. Meaning that if you exhaust your tokens, you have purchase more.

This may result in people developing products atop of GPT-3 having to charge more or be creative with their pricing. Especially considering that using other language models does not cost a thing since they are open source. The computational requirements of GPT-3 make it very expensive to run and maintain the model.

Access to the model is restricted. Access has currently been through a limited closed beta. The closed beta is set to continue until stated otherwise, even after releasing their pricing model.

#### Computational requirements
It is noted that the size of state-of-the-art language models is increasing annually by a factor of 10 at the very least. [BERT large](https://arxiv.org/abs/1810.04805) was released in 2018 and has 355 million parameters. [GPT-2](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf) was released in 2019 and has 1.5 billion parameters. GPT-3 has 175 billion parameters. Model sizes are therefore outpacing GPU memory and a competent GPU is costly.

Check out the prices of a few NVIDIA GPUs [here](https://www.nvidia.com/en-gb/shop/geforce/gpu/?page=1&limit=9&locale=en-gb&category=GPU&gpu=RTX%202080%20Ti). Even with such GPUs, you may struggle to run some of these language models. Taking the computational resources required for GPT3 into consideration, makes it impractical for the everyday researcher.

#### Silly errors, unexpected poor performance
GPT-3 can make silly mistakes while generating output. Especially considering input that requires use of common sense. Generated output samples may repeat themselves within the same document. This renders the output incoherent more so in lengthy passages. The model may also deviate from the themes of the generated text in lengthy passages. It basically loses the plot.

However impressive the output of GPT-3 is, it can also generate text of very poor quality. This means sometimes it offers completely average performance. Considering a model of its size and training, this becomes baffling.

#### Racial and gender bias
GPT-3 occasionally exhibits bias in its generated text. The model is trained on all kinds of raw data therefore negative responses and biases may not be filtered out. This results in the occasional sexist as well as racist output.

Check out this [Twitter thread]( https://twitter.com/AnimaAnandkumar/status/1271137176529416193) as an example of sexist and racial bias. Here’s a second [example](https://twitter.com/an_open_mind/status/1284487376312709120) where the model is prompted to write tweets from one word. The words included black, women, Jews, and holocaust.

#### Fake news generation
We have mentioned how the greatest strength of GPT-3 is text generation. The model is capable of generating articles, passages, transcripts, and other forms of writing that are incredibly convincing. It can mimic famous people. The model can also generate text around topics that may be sensitive in a cultural, societal, or economic sense and cause panic, outrage or tension.

The model has no moral stand or obligation to uphold. And since the generated text is often very well written, it becomes easy for people to believe the text to be fact. This is how fake news is generated and spread.

GPT-2 sparked all sorts of controversy when it was released due to the ability to deceive. GPT-3, being much larger than its predecessor, is judged on a similar scale. I wrote an article about [fake news detection](/automated-fake-news-detection/) in case you would want to read more on the topic.

### It’s a Wrap
GPT-3 is the most impressive stride in NLP in 2020. We have discussed its incredible potential and seen some mind-blowing examples of potential uses. It could revolutionize a number of professions. However, beyond the hype, it has a not-so-attractive side. It is plagued with bias, silly mistakes, mediocre performance, and an impressive yet dangerous ability to generate convincing text. The model needs a lot of improvements to live up to the hype it has generated. I do hope that someday it can be open sourced. But, as it stands, the model will continue to be commercialized for the foreseeable future.

### References
1. [Language models are few shot learners](https://arxiv.org/pdf/2005.14165.pdf)

2. [Why GPT-3 Matters](https://bmk.sh/2020/05/29/GPT-3-A-Brief-Summary/)

3. [GPT3 Examples](https://gpt3examples.com/)

4. [GPT Crush](https://gptcrush.com/)

5. [The GPT-3 Economy](https://bdtechtalks.com/2020/09/21/gpt-3-economy-business-model/)

6. [Tempering Expectations for GPT-3 and OpenAI’s API](https://minimaxir.com/2020/07/gpt3-expectations/)

7. [GPT-3 Vs BERT For NLP Tasks](https://analyticsindiamag.com/gpt-3-vs-bert-for-nlp-tasks/)

8. [21 OpenAI GPT-3 Demos and Examples to Convince You that AI Threat is Real, or is it ? Including Twitter Posts](https://machinelearningknowledge.ai/openai-gpt-3-demos-to-convince-you-that-ai-threat-is-real-or-is-it/)

9. [GPT-3 Technical Overview](https://lambdalabs.com/blog/demystifying-gpt-3/)

10. [How GPT3 Works - Visualizations and Animations](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)

11. [Few Shot Learning](https://www.kakaobrain.com/blog/106)

12. [Zero Shot Learning in Modern NLP](https://joeddav.github.io/blog/2020/05/29/ZSL.html)
[Understanding few-shot learning in machine learning](https://medium.com/quick-code/understanding-few-shot-learning-in-machine-learning-bede251a0f67)

13. [GPT-3 enabled applications]( https://www.infoq.com/articles/gpt3-enabled-applications/)
[Transformer: A Novel Neural Network Architecture for Language Understanding](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html)

14. [“Attention is all you need”](https://arxiv.org/pdf/1706.03762.pdf)

15. [What is GPT-3? Everything your business needs to know about OpenAI’s breakthrough AI language program](https://www.zdnet.com/article/what-is-gpt-3-everything-business-needs-to-know-about-openais-breakthrough-ai-language-program/)

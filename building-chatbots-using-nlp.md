---
layout: engineering-education
status: publish
published: true
title: How to Build a Chatbot Using NLP
description: Natural language processing is a subfield of linguistics, computer science, information engineering, and artificial intelligence concerned with the interactions between computers and human languages, particularly how to program computers to process and analyze large amounts of natural language information and data.
author: Gagan Bhatia
date: 2020-06-11T00:00:00-07:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/chat.jpg
    alt: chatbot example

---
Online [chatbots](https://en.wikipedia.org/wiki/Chatbot) save time and effort by automating customer support. Gartner forecasted that by 2020, over 85% of customer interactions will be handled without a human. However, the opportunities provided by chatbot systems go far beyond giving responses to customers’ inquiries. They are also used for other business tasks, like collecting information about users, helping to organize meetings, and in reducing overhead costs. Since there are a lot of possible use cases for chatbot systems we must be able to implement it independently using NLP.

<!--more-->

### Natural Language Processing
[Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing) or NLP is a field of Artificial Intelligence that gives machines the ability to read, understand, and derive meaning from human language. Today NLP is booming thanks to the huge improvements in the access to data and the increase in computational power, which are allowing practitioners to achieve meaningful results in areas like healthcare, media, finance, and human resources, among others. The most common usage of NLP is in building chatbots.

There are various types of chatbots and most of them have very specific use cases. But most chatbots are built on a very similar [backend NLP](https://towardsdatascience.com/how-to-build-a-chatbot-a-lesson-in-nlp-d0df588afa4b).

![Chatbot](/assets/images/education/chatbot-image.png)

To build a NLP chatbot there are few basic steps to take:

### Understand the business logic
This step is important because it helps the developer understand what the client is looking for. To analyze business logic, a team usually needs to conduct a discovery phase, study the competitive market, determine the core features of your future chatbot and, finally, create the business logic of your future product. During this step, it is recommended to note down all the client interactions and client replies that can make our system smarter.

### Technological Stack
Depending on the use case of chatbot we must decide the tech stack we would like to use. We need to decide how and where it will be implemented. Whether it will be a text-based one or a voice-based one. If you would like to create a voice chatbot, it is better to use the Twilio platform as a base channel. On the other hand, when creating text chatbots, Telegram, Messenger, or Webchat might be the right channels to work with.

The most common tech stacks used are:
1) [Python](https://www.python.org/) - a programming language that is used to build the architecture of the chatbot
2) [Pandas & NumPy](https://www.hackerearth.com/practice/machine-learning/data-manipulation-visualisation-r-python/tutorial-data-manipulation-numpy-pandas-python/tutorial/) - software libraries written for the Python programming language for data manipulation and analysis
3) [Tensorflow](https://www.tensorflow.org/tutorials) - a library that is often used for the machine learning and neural networks tasks
4) [spaCy](https://spacy.io/) - an open-source software library for advanced natural language processing
5) External Third party APIs - To connect the chatbot with other services to further enhance its functionality. The most commonly used API is [Twillo API](https://www.twilio.com/docs/autopilot/guides/how-to-build-a-chatbot)
6) Cloud Services - To deploy our model for production we will need the support of cloud services like [AWS](https://aws.amazon.com/console/), [Microsoft Azure](https://azure.microsoft.com/en-in/), [Google Cloud](https://azure.microsoft.com/en-in/) etc.


### Development of Model for chatbot
We need to define the intents and expressions and then break them down in our model which is built in SpaCy and Tensorflow. We then have to train the model we built on all available data and then determine the accuracy of the language predictions that are appropriate then finalize the model.


### Integration
We need to integrate the model of our chatbot into a usable UI that can be accessed by people for testing. There are multiple APIs that support this integration like Messenger, Telegram, and webchat. To integrate these APIs we often have to convert our model into a containerized AI service which can be done using cloud services like AWS and Microsoft Azure.

### Testing
Once the bot is ready, we can start asking the questions that we taught the chatbot to answer. Typically, there are not that many scenarios to be checked so we can use manual testing. Testing helps to determine whether your AI NLP chatbot is working properly.


In this article, we covered fields of Natural Language Processing, usage of chatbots in business, and key steps in developing your NLP chatbot.
In planning your first chatbot, you should go through these stages:
1) Study your competitors
2) Determine the core features of your chatbot
3) Choose the development tools
4) Build and export your model
5) Test and maintain your chatbot

### Addtional Resources
[A Comprehensive Guide To Improving Your Chatbot Using NLP](https://www.enterprisebotmanager.com/improving-your-chatbot-using-nlp/)

[ChatBots -Wikipedia](https://en.wikipedia.org/wiki/Chatbot)

[Basics of chatbots built using NLP](https://towardsdatascience.com/how-to-build-a-chatbot-a-lesson-in-nlp-d0df588afa4b)

[How does NLP work](https://en.wikipedia.org/wiki/Natural_language_processing)

[How to use Twillo API](https://www.twilio.com/docs/autopilot/guides/how-to-build-a-chatbot)

[Things to consider before building a Chatbot](https://chatbotsmagazine.com/to-build-a-successful-chatbot-ask-these-5-questions-b7fe3776c74c)

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/gagan-bhatia.jpg">Gagan Bhatia is a rising junior at UBC. He is a full-stack developer and a machine learning enthusiast. In his spare time he advocates for better mental health.

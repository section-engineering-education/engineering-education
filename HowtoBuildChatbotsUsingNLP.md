# How to Build a Chatbot Using NLP 

Online chatbots save time and efforts by automating customer support. Gartner forecasts that by 2020, over 85% of customer interactions will be handled without a human. However, the opportunities provided by chatbot systems go far beyond giving responses to customers’ inquiries. They are also used for other business tasks, like collecting information about users, helping to organize meetings and reducing overhead costs. Since there are a lot of uses of chatbot we must be able to implement it independently using NLP.

Natural Language Processing or NLP is a field of Artificial Intelligence that gives machines the ability to read, understand and derive meaning from human language. Today NLP is booming thanks to the huge improvements in the access to data and the increase in computational power, which are allowing practitioners to achieve meaningful results in areas like healthcare, media, finance and human resources, among others. The most common usage of NLP is in building chatbots. 

There are various types of chatbot and most of them have very specific use cases. But most chatbots are built on a very similar backend NLP. 

To build a NLP chatbot there are few basic steps to take before:

### Understand the business logic 
This step is important because it helps the developer understand what the client is looking for. To analyze business logic, a team usually needs to conduct a discovery phase, study the competitive market, determine the core features of your future chatbot and, finally, create the business logic of your future product. During this step it is recommended to note down all the client interactions and client replies that can make our system smarter. 
### Technological Stack
Depending on the use case of chatbot we must decide the tech stack to be used. We need to decide how and where it will be implemented. Whether it is a text-based one or a voice-based one. If you would like to create a voice chatbot, it is better to use the Twilio platform as a base channel. On the other hand, when creating text chatbots, Telegram, Messenger, or Webchat are the right channels to work with.
	
The most common tech stack used is:
1) Python - a programming language that is used to build the architecture of the chatbot 
2) Pandas & NumPy - software libraries written for the Python programming language for data manipulation and analysis 
3) Tensorflow - a library that is often used for the machine learning and neural networks tasks
4) SpaCy - an open-source software library for advanced natural language processing
5) External Third party APIs - To connect the chatbot with other services to further enhance its functionality 
6) Cloud Services- To deploy our model for production we will need the support of cloud services like AWS, Microsoft Azure, IBM watson etc. 

### Development of Model for chatbot:
We need to define the intents and expressions and then break them down in our model which is built in SpaCy and Tensorflow. We then train our built model on all available data and then determine the accuracy if the language predictions are appropriate then finalise the model.

### Integration 
We need to integrate the model for our chatbot into a usable UI which can be accessed by people for testing. There are multiple APIs which support this integration like Messenger, Telegram, and on webchat. To integrate these APIs we often have to convert our model into a containerized AI service which can be done using cloud services like AWS and Microsoft Azure. 
### Testing
Once the bot is ready, we start asking the questions that we taught chatbot to answer. As usual, there are not that many scenarios to be checked so we can use manual testing. Testing helps to determine whether your AI NLP chatbot works properly.


In this article, we covered fields of Natural Language Processing, usage of chatbots in business, and key steps for developing your NLP chatbot.
Planning your first chatbot, you should go through these stages: 
1) Study your competitors
2) Determine the core features of your chatbot 
3) Choose the development tools
4) Build and export your model
5) Test and maintain your chatbot 

### References
[A Comprehensive Guide To Improving Your Chatbot Using NLP](https://www.enterprisebotmanager.com/improving-your-chatbot-using-nlp/)
[ChatBots -Wikipedia](https://en.wikipedia.org/wiki/Chatbot)
[NLP Chatbots](https://towardsdatascience.com/how-to-build-a-chatbot-a-lesson-in-nlp-d0df588afa4b)
[NLP](https://en.wikipedia.org/wiki/Natural_language_processing)
[Twillo API](https://www.twilio.com/docs/autopilot/guides/how-to-build-a-chatbot)

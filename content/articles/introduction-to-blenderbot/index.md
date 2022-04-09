---
layout: engineering-education
status: publish
published: true
url: /introduction-to-blenderbot/
title: An Introduction to Blenderbot
description: In this tutorial, we will create a chatbot using PyTorch and the Blenderbot model. The model uses a standard seq2seq model transformer-based architecture to generate responses.
author: esther-awuor
date: 2021-11-16T00:00:00-16:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-blenderbot/hero.png
    alt: blenderbot example image 
---
The Blenderbot model is available through the Hugging Face transformers library. Hugging Face is an open-source library available in Python that allows you to leverage some of the state-of-the-art Natural Language Processing models.
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [The Blenderbot model](#the-blenderbot-model)
- [Building the chatbot using the blenderbot model](#building-the-chatbot-using-the-blenderbot-model)
    - [Installing and importing dependencies](#installing-and-importing-dependencies)
    - [Testing the blenderbot model](#testing-the-blenderbot-model)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
- Having a familiarity with Natural Language Processing (NLP) is key.
- You need to be familiar with [Machine Learning](/engineering-education/topic/machine-learning/) modeling.

### The Blenderbot model
The Blender chatbot model (BlenderBot 1.0) was first proposed in the paper, [Recipes for building an open-domain chatbot](https://arxiv.org/pdf/2004.13637.pdf) on 30th April 2020. This is a deep learning model that has been trained to interact and respond like a conversational agent. 

The latest release is the BlenderBot 2.0. The model uses a standard seq2seq model transformer-based architecture to generate responses. This architecture uses `Transformers` as its base, initially proposed in this [paper](https://arxiv.org/pdf/1706.03762.pdf) by Google's research team.

There are various use cases for this model. We can use it to build chatbots, virtual agents, and assistive agents. Chatbots and agents can be used in business to interact with customers.  

Why should you use Blenderbot as opposed to any other conversational AI model?

Conversational agents suffer from short term memory and are limited to only what they have been trained on. The BlenderBot model can build long term memory for continuous access. Moreover, it can do so while simultaneously searching the internet for up-to-date information and holding conversations on nearly any topic.

### Building the chatbot using the Blenderbot model
When you have a look at Blenderbot's [documentation](https://huggingface.co/transformers/model_doc/blenderbot.html), you'll notice that the model has three variants; 90M, 2.7B, and 9.4B parameter models. However, there is one model that has 400 million parameters. That's the one we'll be leveraging in this tutorial.

#### Installing and importing dependencies
The first dependency we need to install is PyTorch. Please head on to PyTorch's [website](https://pytorch.org/get-started/locally/) and select your preferences. This will generate an installation command depending on your selected preferences, i.e., Python, Pip, Linux, etc. Run the install command that is generated to install PyTorch.   

```bash
!pip3 install torch==1.8.2+cu111 torchvision==0.9.2+cu111 torchaudio==0.8.2 -f https://download.pytorch.org/whl/lts/1.8/torch_lts.html
```

The second dependency that we will install is the Hugging face transformers. An interesting thing to note is that the `transformers` dependency will automatically handle the downloading of the Blenderbot model. So, we don't need to download the model separately. 

```bash
!pip install transformers
```

All our dependencies are now installed. Let's import the model class and tokenizer into our Colab. A tokenizer converts natural text from a string to a sequence of identifiers that map to each word. We refer to these identifiers as tokens. These tokens are then passed into our machine learning model. 

```python
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
```

We have imported two classes, the `BlenderbotTokenizer`, and `BlenderbotForConditionalGeneration` classes. The `BlenderbotTokenizer` helps convert the natural language to tokens while the `BlenderbotForConditionalGeneration` holds the model itself, enabling response generation.

Now we need to download and set up the model and tokenizer.

```python
tokenizer = BlenderbotTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
model = BlenderbotForConditionalGeneration.from_pretrained("facebook/blenderbot-400M-distill")
```

It is quite a large model, and it might take some time to download. We've downloaded the pre-trained model, `facebook/blenderbot-400M-distill` with 400 million parameters. 

You can download different models here as well. For example, you could load the model with 90 million or 2 billion parameters. 

#### Testing the Blenderbot model
This last step involves passing some natural language to the model, converting it into tokens as we would typically do in natural language processing, and getting responses back from the chatbot. Whenever you're working with chatbots, they refer to input text as an `utterance`. Let's create a new variable called `utterance` and input our string.

```python
utterance = "My name is Jackson, and I'm studying Computer Science"
```

As mentioned earlier, machines don't understand natural language; they only understand numbers/tokens. So let's tokenize this `utterance`.

```python
inputs = tokenizer(utterance, return_tensors = "pt")
```

The tokenizer() takes in two arguments, the `utterance` variable with our input and `return_tensors` which returns PyTorch tensors (pt).

Running the `inputs` command in our terminal outputs the following results:

```bash
{'input_ids': tensor([[ 863, 1356,  315, 4798, 3087,   19,  298,  281,  476, 1616, 1471, 2713,
         2984,  276, 2236, 1142,    2]]), 'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])}
```

The results above show that it has generated a dictionary with `input_ids` and `attention_mask`. These are the two values that we need to pass into our model to generate a response. We need to pass this input into the Blenderbot model.

We do this using the following command:

```python
results = model.generate(**inputs)
```

Running the above command, an output is generated:

```bash
tensor([[   1, 3490,  287, 2273,  304,   19, 4798, 3087,   21,  714,  361,  304,
          538,  287,  361,  517,  304, 5055,  470,   38,    2]])
```

This is the response from the model. To us humans, this is just a bunch of numbers. Let's decode this result into natural language so that we can understand it.

```python
tokenizer.decode(results[0])
```

The reason we've used `[0]` is because, in our results above, you'll notice that the output is stored inside two arrays.
We need to extract it so that we have it in a single set of arrays.

Here's our output:

```bash
Nice to meet you, Jackson. What do you want to do when you graduate?
```

The model generated a response. And not just a response. It's a response that makes sense. Impressive, right?

This is the Blenderbot model working in real-time. All we did was pass our utterances and tokenize them. The model then takes these inputs and outputs a sequence back. We then decode this output so that it's human-readable. You could try passing in any input you like and see what output you'll get.

The model may output somewhat incorrect responses and might lose context sometimes. But remember, this model has only been trained on 400M parameters. As with other machine learning models, we know that the more you train, the more accurate your results will be. You could try the model with `2.7B` or `9B` parameters and see what you get. 

>Just one caveat, make sure your machine has enough computing power for those models with large parameters.

As is the case with most conversational agents, they tend to exhibit bias and toxicity. They tend to amplify the race, religion, and gender biases on data which they are trained on. However, these issues are being addressed. 

As with BlenderBot 2.0, "safety recipes" have been implemented to reduce some of these offensive responses. Read more about it [here](https://venturebeat.com/2021/07/16/facebooks-blenderbot-2-0-bot-surfs-the-web-for-knowledge/).

In addition, the main research [paper](https://arxiv.org/pdf/2004.13637.pdf) demonstrates that as much as increasing the number of parameters is important to improve accuracy in the model; the Blenderbot model displays knowledge, empathy, and personality appropriately while still maintaining a consistent persona. That's a point you could analyze while exploring your output results.  

Please find the complete code for this tutorial [here](https://colab.research.google.com/drive/1pyIhbbobNpQ-QC3Dm3n5IU2Un3RdsSaY?usp=sharing). 

### Wrapping up
This is a relatively straightforward tutorial. The code is simple and easy to understand. If you so wish, you could extend this build a bit further. The model could be integrated into virtual agents and chatbots and deployed to a website to allow client-side user conversations.

Happy coding!

### Further reading
- [Recipes for building an open-domain chatbot](https://arxiv.org/pdf/2004.13637.pdf)
- [A state-of-the-art open source chatbot](https://ai.facebook.com/blog/state-of-the-art-open-source-chatbot/)
- [Blenderbot](https://huggingface.co/transformers/model_doc/blenderbot.html)
- [Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)

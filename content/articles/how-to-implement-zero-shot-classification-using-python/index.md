Machine learning is an ever-evolving field. One area of machine learning that has evolved greatly over the span of a few years is Natural Language Processing (NLP). The [HuggingFace](https://huggingface.co/) organization has been on the forefront in making contributions in this field. This tutorial will leverage the zero-shot classification model from huggingface to extract model predictions and perform multi-class classification. 

### Zero-shot classification


### How to leverage the huggingface API to perform classification
Let's begin by installing the main dependency, Transformers.

```bash
!pip install transformers
```
We need to import `pipeline` into our code.

```python
from transformers import pipeline
```
This next step involves initializing our pipeline. We save the result inside a variable called `classifier_pipeline`. We are also using the `facebook/bart-large-mnli` model. There are other zero-shot models available. We are using this model because it is the most popular with over one million downloads. Please refer to this [link](https://huggingface.co/models?pipeline_tag=zero-shot-classification&sort=downloads) to access the other models.

```python
classifier_pipeline = pipeline ("zero-shot-classification", model = "facebook/bart-large-mnli")
```
BERT is an acronmym that stands for Bidirectional Encoder Representations from Transformers. It is a popular natural language processing model by Google.  

Next, we need a list of input text and candidate labels. We will store these results inside the `input_sequence` and `label_candidate` variables.

```python
input_sequence = "I love traveling"
label_candidate = ['travel', 'cooking', 'entertainment', 'dancing', 'technology']
classifier(input_sequence, label_candidate)
```
Result:

```bash
{'labels': ['travel', 'entertainment', 'technology', 'dancing', 'cooking'],
 'scores': [0.9624875783920288,
  0.030896618962287903,
  0.002539442852139473,
  0.0024957722052931786,
  0.0015806530136615038],
 'sequence': 'I love traveling'}
```
It is clear from the results that the model has correctly classified the sentence as being a `travel` category with an accuracy score of `0.9624875783920288`. This represents a 96% accuracy.

But, this is a simple example. Let's pick a paragraph text from Wikipedia and the model will tell us the category the paragraph is based one. We get the paragraph from this [link](https://en.wikipedia.org/wiki/Quantum_machine_learning).

```python
input_sequence = "To avoid plagiarism issues, please refer to the code on the Google Colab"
label_candidate = ['travel', 'cooking', 'entertainment', 'dancing', 'technology']
classifier_pipeline(input_sequence, label_candidate)
```
Result:

```bash
{'labels': ['technology', 'travel', 'entertainment', 'cooking', 'dancing'],
 'scores': [0.9226115942001343,
  0.023767797276377678,
  0.021649882197380066,
  0.01717376336455345,
  0.01479694340378046]
  '}
```
The model correctly classified the paragraph as an excerpt for technology with an accuracy score of `0.9226115942001343`. This represents a 92% accuracy. Interesting, right?

The model can as well output results with multiple classifications. An article, sentence, or paragraph can be of several classifications simultaneously. For example, it can be of travel and entertainment category. Let's see how we can achieve this process.

#### Multi-class classification
We need to introduce an argument known as `multi_class` and set it to `True` as shown below.

> Please note that the `multi_class` argument has been used extensively in other tutorials. This argument has been deprecated and renamed to `multi_label`. It still works and you can use it interchangeably. But, `multi_class` will be removed in a future version of Transformers.

```python
input_sequence = "To avoid plagiarism issues, please refer to the code on the Google Colab"
candidate_labels = ['travel', 'technology', 'algorithms' 'cooking', 'dancing', 'exploration']
classifier_pipeline(input_sequence, label_candidate, multi_label=True)
```
Results:

```bash
{'labels': ['dancing', 'entertainment', 'travel', 'technology', 'cooking'],
 'scores': [0.9758230447769165,
  0.8731157183647156,
  0.11541531980037689,
  0.00350499851629138,
  0.0004167791921645403],
 '}
```
The model has successfully performed a multi-class classification. It has classified the sentence to be of the category of `dancing (98%)` and `entertainment (87%)` as well.

Please refer to this [link](https://colab.research.google.com/drive/1L4IyAEQLeZR5D9nG_nD_klhNMst1_wHN?usp=sharing) to get the full code for this tutorial.

### Wrapping up

### Further reading
- [HuggingFace](https://huggingface.co/models?pipeline_tag=zero-shot-classification&sort=downloads)
- [Zero shot learning](https://en.wikipedia.org/wiki/Zero-shot_learning)
- [Benchmarking Zero-shot Text Classification: Datasets, Evaluation and Entailment Approach](https://arxiv.org/pdf/1909.00161.pdf)
